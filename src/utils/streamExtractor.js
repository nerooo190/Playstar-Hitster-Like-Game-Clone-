// Hybrid Audio Stream Extractor for Vercel.com Static Hosting & Local Server
// Resolves high-quality audio streams using CORS-friendly iTunes API & mirror endpoints

const streamCache = new Map();

export async function fetchAudioStream(artist, title, defaultUrl = '') {
  const queryKey = `${artist} - ${title}`.toLowerCase();
  
  if (streamCache.has(queryKey)) {
    return streamCache.get(queryKey);
  }

  // 1. Primary: iTunes Public Search API (100% CORS-friendly on Vercel & All Browsers)
  try {
    const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(artist + ' ' + title)}&media=music&limit=1`, {
      signal: AbortSignal.timeout(3500)
    });
    if (res.ok) {
      const data = await res.json();
      if (data.results && data.results.length > 0 && data.results[0].previewUrl) {
        const streamUrl = data.results[0].previewUrl;
        streamCache.set(queryKey, streamUrl);
        return streamUrl;
      }
    }
  } catch (e) {
    console.warn("iTunes API query skipped", e);
  }

  // 2. Secondary: Piped / Invidious Extractor Mirrors
  const mirrors = [
    'https://pipedapi.kavin.rocks',
    'https://api.piped.video',
    'https://invidious.nerdvpn.de'
  ];

  for (const baseUrl of mirrors) {
    try {
      const searchRes = await fetch(`${baseUrl}/search?q=${encodeURIComponent(artist + ' ' + title)}&filter=music_songs`, {
        signal: AbortSignal.timeout(3000)
      });
      if (searchRes.ok) {
        const searchData = await searchRes.json();
        const items = searchData.items || searchData;
        if (items && items.length > 0) {
          const videoId = items[0].url ? items[0].url.replace('/watch?v=', '') : (items[0].videoId || items[0].id);
          if (videoId) {
            const streamRes = await fetch(`${baseUrl}/streams/${videoId}`, { signal: AbortSignal.timeout(3000) });
            if (streamRes.ok) {
              const streamData = await streamRes.json();
              const audioStreams = streamData.audioStreams;
              if (audioStreams && audioStreams.length > 0) {
                audioStreams.sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0));
                const streamUrl = audioStreams[0].url;
                streamCache.set(queryKey, streamUrl);
                return streamUrl;
              }
            }
          }
        }
      }
    } catch (e) {
      // try next mirror
    }
  }

  return defaultUrl;
}
