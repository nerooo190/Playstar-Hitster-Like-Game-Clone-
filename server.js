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
      mode: 'classic',
      isPrivate: true,
      createdAt: Date.now()
    });

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ code: roomCode, players: [hostPlayer], player: hostPlayer, mode: 'classic' }));
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
    res.end(JSON.stringify({ code: room.code, players: room.players, player: joinerPlayer, mode: room.mode || 'classic' }));
    return;
  }

  if (pathname === '/api/rooms/update-mode' && req.method === 'POST') {
    const body = await getJsonBody();
    const code = (body.code || '').toUpperCase().trim();
    const room = activeRooms.get(code);

    if (room) {
      if (body.mode) room.mode = body.mode;
      if (body.isPrivate !== undefined) room.isPrivate = body.isPrivate;
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, mode: room.mode, isPrivate: room.isPrivate }));
      return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Raum nicht gefunden' }));
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
    res.end(JSON.stringify({ code: room.code, players: room.players, started: room.started, mode: room.mode || 'classic', isPrivate: room.isPrivate }));
    return;
  }

  if (pathname === '/api/rooms/start' && req.method === 'POST') {
    const body = await getJsonBody();
    const code = (body.code || '').toUpperCase().trim();
    const room = activeRooms.get(code);

    if (room) {
      room.started = true;
      if (body.mode) room.mode = body.mode;
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true }));
      return;
    }
    res.writeHead(404);
    res.end();
    return;
  }

  if (pathname === '/api/rooms/add-ai' && req.method === 'POST') {
    const body = await getJsonBody();
    const code = (body.code || '').toUpperCase().trim();
    const room = activeRooms.get(code);

    if (room) {
      const aiPlayer = {
        id: 'ai-' + Math.random().toString(36).substr(2, 6),
        name: body.name || 'Hitster Bot',
        isHost: false,
        isAI: true,
        aiDifficulty: body.difficulty || 'medium',
        aiIcon: '🤖'
      };
      room.players.push(aiPlayer);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ players: room.players }));
      return;
    }
    res.writeHead(404);
    res.end();
    return;
  }

  if (pathname === '/api/rooms/remove-ai' && req.method === 'POST') {
    const body = await getJsonBody();
    const code = (body.code || '').toUpperCase().trim();
    const room = activeRooms.get(code);

    if (room) {
      room.players = room.players.filter(p => p.id !== body.aiId);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ players: room.players }));
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
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'audio/mpeg',
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'audio/mpeg',
      };
      res.writeHead(200, head);
      fs.createReadStream(absolutePath).pipe(res);
    }
    return;
  }

  // -------------------------------------------------------------
  // STATIC FILE SERVER FOR PRODUCTION BUILD (dist/)
  // -------------------------------------------------------------
  let filePath = path.join(__dirname, 'dist', pathname === '/' ? 'index.html' : pathname);

  // Fallback to root index.html if dist doesn't exist yet
  if (!fs.existsSync(path.join(__dirname, 'dist'))) {
    filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // SPA Fallback for client-side routing
        const indexPath = fs.existsSync(path.join(__dirname, 'dist'))
          ? path.join(__dirname, 'dist', 'index.html')
          : path.join(__dirname, 'index.html');

        fs.readFile(indexPath, (err, indexContent) => {
          if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
            res.end(indexContent, 'utf-8');
          }
        });
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Hitster Server running at http://localhost:${PORT}`);
});
