// Spotify Barcode / QR Code SVG Generator for Hitster Cards

export function generateSpotifyQRCode(spotifyUrlOrUri, title = "Hitster Song") {
  // Generates an SVG string representing a high-res Spotify style QR code & waveform bar
  const encodedUrl = encodeURIComponent(spotifyUrlOrUri || "https://spotify.com");
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedUrl}&color=1a1a1a&bgcolor=ffffff`;

  return `
    <div class="spotify-qr-wrapper" style="display:flex; flex-direction:column; align-items:center; gap:8px;">
      <img src="${qrApiUrl}" alt="Spotify QR Code - ${title}" class="spotify-qr-code" style="width:160px; height:160px; border-radius:12px;" />
      <div class="spotify-logo-badge" style="display:flex; align-items:center; gap:6px; background:#1db954; color:#000; font-family:var(--font-heading); font-weight:800; font-size:0.75rem; padding:4px 12px; border-radius:20px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.48-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.281 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.3z"/>
        </svg>
        SPOTIFY SCAN
      </div>
    </div>
  `;
}
