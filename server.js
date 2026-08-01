// Node.js Audio Streaming Server, Static Web Host & Realtime Room Engine for Hitster
// Integrates YouTube Music API (ytmusicapi backend), Local Audio Streamer & Room Lobbies

import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 3050;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg',
  '.m4a': 'audio/mp4',
  '.webm': 'audio/webm'
};

// In-Memory Room Lobby Store
const activeRooms = new Map();

const server = http.createServer(async (req, res) => {
  // Enable CORS headers for all requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Range');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const reqUrl = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = reqUrl.pathname;

  // Helper to read JSON request body
  const getJsonBody = async () => {
    return new Promise((resolve) => {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          resolve(JSON.parse(body || '{}'));
        } catch (e) {
          resolve({});
        }
      });
    });
  };

  // -------------------------------------------------------------
  // REALTIME ONLINE MULTIPLAYER ROOM LOBBY APIS
  // -------------------------------------------------------------
  if (pathname === '/api/rooms/create' && req.method === 'POST') {
    const body = await getJsonBody();
    const hostName = body.name || 'Host';
    const roomCode = 'HIT-' + Math.floor(1000 + Math.random() * 9000);
    const hostPlayer = { id: 'p-' + Math.random().toString(36).substr(2, 6), name: hostName, isHost: true };

    activeRooms.set(roomCode, {
      code: roomCode,
      players: [hostPlayer],
      started: false,
      createdAt: Date.now()
    });

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ code: roomCode, players: [hostPlayer], player: hostPlayer }));
    return;
  }

  if (pathname === '/api/rooms/join' && req.method === 'POST') {
    const body = await getJsonBody();
    const code = (body.code || '').toUpperCase().trim();
    const name = body.name || 'Spieler 2';

    const room = activeRooms.get(code);
    if (!room) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Lobby Code nicht gefunden!' }));
      return;
    }

    const joinerPlayer = { id: 'p-' + Math.random().toString(36).substr(2, 6), name: name, isHost: false };
    room.players.push(joinerPlayer);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ code: room.code, players: room.players, player: joinerPlayer }));
    return;
  }

  if (pathname === '/api/rooms/poll' && req.method === 'GET') {
    const code = (reqUrl.searchParams.get('code') || '').toUpperCase().trim();
    const room = activeRooms.get(code);

    if (!room) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Lobby nicht vorhanden' }));
      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ code: room.code, players: room.players, started: room.started }));
    return;
  }

  if (pathname === '/api/rooms/start' && req.method === 'POST') {
    const body = await getJsonBody();
    const code = (body.code || '').toUpperCase().trim();
    const room = activeRooms.get(code);

    if (room) {
      room.started = true;
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true }));
      return;
    }
    res.writeHead(404);
    res.end();
    return;
  }

  // -------------------------------------------------------------
  // LOCAL SONG STREAMER API
  // -------------------------------------------------------------
  if (pathname === '/api/local-song') {
    const relPath = reqUrl.searchParams.get('path');
    if (!relPath) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Missing path parameter');
      return;
    }

    const safePath = path.normalize(decodeURIComponent(relPath)).replace(/^(\.\.[\/\\])+/, '');
    const absolutePath = path.join(__dirname, safePath);

    if (!fs.existsSync(absolutePath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Local song file not found');
      return;
    }

    const stat = fs.statSync(absolutePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(absolutePath, { start, end });

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'audio/mpeg',
      });
      file.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': 'audio/mpeg',
        'Accept-Ranges': 'bytes'
      });
      fs.createReadStream(absolutePath).pipe(res);
    }
    return;
  }

  // -------------------------------------------------------------
  // YTMUSIC AUDIO STREAM PROXY
  // -------------------------------------------------------------
  if (pathname === '/api/ytmusic/stream') {
    const query = reqUrl.searchParams.get('q');
    if (!query) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Missing query parameter');
      return;
    }

    try {
      const streamUrl = await resolveYTMusicAudioUrl(query);
      if (streamUrl) {
        proxyAudioStream(streamUrl, req, res);
        return;
      }
    } catch (err) {
      console.error("ytmusic stream resolution error:", err);
    }

    try {
      const fallbackUrl = await resolveITunesAudioUrl(query);
      if (fallbackUrl) {
        proxyAudioStream(fallbackUrl, req, res);
        return;
      }
    } catch (e) {
      console.error("iTunes fallback error:", e);
    }

    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Failed to resolve audio stream');
    return;
  }

  // -------------------------------------------------------------
  // STATIC FILE SERVER
  // -------------------------------------------------------------
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : decodeURIComponent(pathname));
  
  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end(`Server Error: ${err.code}`);
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Stream proxy supporting HTTP & HTTPS redirects
function proxyAudioStream(streamUrl, clientReq, clientRes) {
  const lib = streamUrl.startsWith('https') ? https : http;
  
  const req = lib.get(streamUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': '*/*'
    }
  }, (targetRes) => {
    if (targetRes.statusCode >= 300 && targetRes.statusCode < 400 && targetRes.headers.location) {
      proxyAudioStream(targetRes.headers.location, clientReq, clientRes);
      return;
    }

    clientRes.writeHead(targetRes.statusCode || 200, {
      'Content-Type': targetRes.headers['content-type'] || 'audio/mpeg',
      'Content-Length': targetRes.headers['content-length'] || '',
      'Accept-Ranges': 'bytes'
    });

    targetRes.pipe(clientRes);
  });

  req.on('error', (err) => {
    console.error("Proxy request error:", err);
    if (!clientRes.headersSent) {
      clientRes.writeHead(502);
      clientRes.end("Stream Proxy Error");
    }
  });
}

// Helper: YouTube Music audio stream resolver
async function resolveYTMusicAudioUrl(query) {
  const mirrors = [
    'https://pipedapi.kavin.rocks',
    'https://api.piped.video',
    'https://pipedapi.privacy.com.de',
    'https://inv.tux.pizza',
    'https://invidious.nerdvpn.de'
  ];

  for (const mirror of mirrors) {
    try {
      const searchRes = await fetch(`${mirror}/search?q=${encodeURIComponent(query)}&filter=music_songs`, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        signal: AbortSignal.timeout(3500)
      });
      if (searchRes.ok) {
        const searchData = await searchRes.json();
        const items = searchData.items || searchData;
        if (items && items.length > 0) {
          const videoId = items[0].url ? items[0].url.replace('/watch?v=', '') : (items[0].videoId || items[0].id);
          if (videoId) {
            const streamRes = await fetch(`${mirror}/streams/${videoId}`, {
              headers: { 'User-Agent': 'Mozilla/5.0' },
              signal: AbortSignal.timeout(3500)
            });
            if (streamRes.ok) {
              const streamData = await streamRes.json();
              const audioStreams = streamData.audioStreams;
              if (audioStreams && audioStreams.length > 0) {
                audioStreams.sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0));
                return audioStreams[0].url;
              }
            }
          }
        }
      }
    } catch (e) {
      // try next mirror
    }
  }
  return null;
}

// Helper: iTunes search fallback
async function resolveITunesAudioUrl(query) {
  try {
    const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&limit=1`, {
      signal: AbortSignal.timeout(3500)
    });
    if (res.ok) {
      const data = await res.json();
      if (data.results && data.results.length > 0 && data.results[0].previewUrl) {
        return data.results[0].previewUrl;
      }
    }
  } catch (e) {
    console.warn("iTunes search error", e);
  }
  return null;
}

server.listen(PORT, () => {
  console.log(`Hitster YTMusic & Room Server running at http://localhost:${PORT}`);
});
