// NewPipe Extractor Engine (JavaScript Web Port)
// Fetches high quality audio stream URLs from YouTube / YouTube Music APIs (same backend as NewPipeExtractor)

const PIPED_APIS = [
  'https://pipedapi.kavin.rocks',
  'https://api.piped.video',
  'https://pipedapi.privacy.com.de',
  'https://piped-api.garudalinux.org'
];

const INVIDIOUS_APIS = [
  'https://invidious.nerdvpn.de',
  'https://inv.tux.pizza',
  'https://invidious.drgns.space'
];

// Cache extracted audio stream URLs in memory
const streamCache = new Map();

export async function fetchAudioStream(artist, title, fallbackUrl = '') {
  const queryKey = `${artist} - ${title}`.toLowerCase();
  
  if (streamCache.has(queryKey)) {
    return streamCache.get(queryKey);
  }

  // 1. Try Piped API (NewPipe Extractor Backend)
  for (const baseUrl of PIPED_APIS) {
    try {
      const searchRes = await fetch(`${baseUrl}/search?q=${encodeURIComponent(artist + ' ' + title)}&filter=music_songs`, {
        signal: AbortSignal.timeout(3000)
      });
      if (searchRes.ok) {
        const searchData = await searchRes.json();
        if (searchData.items && searchData.items.length > 0) {
          const videoId = searchData.items[0].url.replace('/watch?v=', '');
          const streamRes = await fetch(`${baseUrl}/streams/${videoId}`, { signal: AbortSignal.timeout(3000) });
          if (streamRes.ok) {
            const streamData = await streamRes.json();
            const audioStreams = streamData.audioStreams;
            if (audioStreams && audioStreams.length > 0) {
              // Pick highest bitrate audio stream
              audioStreams.sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0));
              const streamUrl = audioStreams[0].url;
              streamCache.set(queryKey, streamUrl);
              return streamUrl;
            }
          }
        }
      }
    } catch (e) {
      console.warn(`Piped API (${baseUrl}) failed, trying next mirror...`, e);
    }
  }

  // 2. Fallback to Invidious API
  for (const baseUrl of INVIDIOUS_APIS) {
    try {
      const searchRes = await fetch(`${baseUrl}/api/v1/search?q=${encodeURIComponent(artist + ' ' + title)}&type=video`, {
        signal: AbortSignal.timeout(3000)
      });
      if (searchRes.ok) {
        const items = await searchRes.json();
        if (items && items.length > 0) {
          const videoId = items[0].videoId;
          const videoRes = await fetch(`${baseUrl}/api/v1/videos/${videoId}`, { signal: AbortSignal.timeout(3000) });
          if (videoRes.ok) {
            const videoData = await videoRes.json();
            const adaptiveFormats = videoData.adaptiveFormats;
            if (adaptiveFormats) {
              const audioFormats = adaptiveFormats.filter(f => f.type && f.type.startsWith('audio/'));
              if (audioFormats.length > 0) {
                audioFormats.sort((a, b) => parseInt(b.bitrate || 0) - parseInt(a.bitrate || 0));
                const streamUrl = audioFormats[0].url;
                streamCache.set(queryKey, streamUrl);
                return streamUrl;
              }
            }
          }
        }
      }
    } catch (e) {
      console.warn(`Invidious API (${baseUrl}) failed...`, e);
    }
  }

  // 3. Ultimate Fallback to provided iTunes preview stream URL
  return fallbackUrl;
}
