// Online Multiplayer Lobby Component with Game Modes & AI Opponents

import { getTranslation } from '../data/i18n.js';

export const AI_ICONS = ['🤖', '👾', '🕹️', '👽', '⚡', '🦾', '🛰️', '🎧', '👾', '🤖‍💥'];
export const AI_DIFFICULTIES = [
  { id: 'easy', name: 'Einfach (40% Genauigkeit)', rate: 0.40 },
  { id: 'medium', name: 'Mittel (75% Genauigkeit)', rate: 0.75 },
  { id: 'hard', name: 'Schwer (92% Genauigkeit)', rate: 0.92 },
  { id: 'impossible', name: 'Unmöglich (99% Maestro)', rate: 0.99 }
];

export function renderOnlineLobbyModal(onStartGame, onClose) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  let currentStep = 'choose'; // 'choose', 'host', 'join'
  let roomCode = '';
  let selectedMode = 'classic';
  let localPlayer = null;
  let playersList = [];
  let pollInterval = null;

  const PLAYER_COLORS = ['#ff2b55', '#00e5ff', '#ffd700', '#a855f7', '#22c55e', '#f97316'];

  const formatPlayersForGame = (rawList) => {
    return rawList.map((p, idx) => ({
      id: p.id || `online-p-${idx}`,
      name: p.name || `Spieler ${idx + 1}`,
      color: PLAYER_COLORS[idx % PLAYER_COLORS.length],
      timeline: [],
      tokens: 3,
      isHost: p.isHost || false,
      isAI: p.isAI || false,
      aiDifficulty: p.aiDifficulty || 'medium',
      aiIcon: p.aiIcon || '🤖'
    }));
  };

  const stopPolling = () => {
    if (pollInterval) {
      clearInterval(pollInterval);
      pollInterval = null;
    }
  };

  const startPolling = () => {
    stopPolling();
    pollInterval = setInterval(async () => {
      if (!roomCode) return;
      try {
        const res = await fetch(`/api/rooms/poll?code=${encodeURIComponent(roomCode)}`);
        if (res.ok) {
          const data = await res.json();
          playersList = data.players || [];
          if (data.mode) selectedMode = data.mode;
          renderContent();

          // If game started by host, automatically trigger start for joiners
          if (data.started && localPlayer && !localPlayer.isHost) {
            stopPolling();
            close();
            if (onStartGame) onStartGame(formatPlayersForGame(playersList), roomCode, selectedMode);
          }
        }
      } catch (e) {
        console.warn("Polling error", e);
      }
    }, 1500);
  };

  const renderContent = () => {
    if (currentStep === 'choose') {
      overlay.innerHTML = `
        <div class="modal-content">
          <button class="modal-close-btn" id="close-lobby-btn">✕</button>

          <div style="text-align:center; margin-bottom:24px;">
            <span style="font-size:2.5rem;">🌐</span>
            <h2 style="font-family:var(--font-heading); font-size:2rem; font-weight:900; background:linear-gradient(90deg, #fff, var(--accent-cyan)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; margin-top:8px;">
              ${getTranslation('onlineMultiplayer')}
            </h2>
            <p style="color:var(--text-muted); font-size:0.9rem;">Spiele online mit Freunden oder KI-Gegnern über einen Raumcode!</p>
          </div>

          <div class="form-group" style="margin-bottom:16px;">
            <input type="text" id="lobby-name-input" class="form-input" placeholder="Dein Spielername" value="Spieler 1" />
          </div>

          <div style="display:flex; flex-direction:column; gap:16px;">
            <button class="btn-primary" id="host-game-btn" style="padding:18px;">
              <span>👑</span>
              <span>Raum Erstellen (Host)</span>
            </button>

            <button class="btn-secondary" id="join-game-btn" style="padding:18px;">
              <span>🔑</span>
              <span>Lobby Beitreten (Mit Code)</span>
            </button>
          </div>
        </div>
      `;

      overlay.querySelector('#close-lobby-btn').addEventListener('click', close);
      
      overlay.querySelector('#host-game-btn').addEventListener('click', async () => {
        const inputName = overlay.querySelector('#lobby-name-input').value.trim() || 'Host';
        try {
          const res = await fetch('/api/rooms/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: inputName })
          });
          if (res.ok) {
            const data = await res.json();
            roomCode = data.code;
            localPlayer = data.player;
            playersList = data.players;
            currentStep = 'lobby';
            startPolling();
            renderContent();
          }
        } catch (e) {
          console.error("Failed to create room", e);
        }
      });

      overlay.querySelector('#join-game-btn').addEventListener('click', () => {
        currentStep = 'join';
        renderContent();
      });

    } else if (currentStep === 'join') {
      overlay.innerHTML = `
        <div class="modal-content">
          <button class="modal-close-btn" id="close-lobby-btn">✕</button>

          <div style="text-align:center; margin-bottom:20px;">
            <h2 style="font-family:var(--font-heading); font-size:1.8rem; font-weight:900; color:#fff;">
              Lobby Beitreten
            </h2>
            <p style="color:var(--text-muted); font-size:0.85rem;">Gib den 6-stelligen Raumcode ein</p>
          </div>

          <div class="form-group">
            <input type="text" id="join-code-input" class="form-input" placeholder="z.B. HIT-9428" style="text-align:center; font-size:1.4rem; letter-spacing:2px; font-weight:800;" />
          </div>

          <div class="form-group">
            <input type="text" id="join-name-input" class="form-input" placeholder="Dein Spielername" value="Spieler 2" />
          </div>

          <div style="display:flex; gap:12px;">
            <button class="btn-primary" id="confirm-join-btn" style="flex:1;">Beitreten</button>
          </div>
        </div>
      `;

      overlay.querySelector('#close-lobby-btn').addEventListener('click', close);
      overlay.querySelector('#confirm-join-btn').addEventListener('click', async () => {
        const inputCode = overlay.querySelector('#join-code-input').value.trim().toUpperCase();
        const inputName = overlay.querySelector('#join-name-input').value.trim() || 'Spieler 2';

        if (inputCode) {
          try {
            const res = await fetch('/api/rooms/join', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ code: inputCode, name: inputName })
            });

            if (res.ok) {
              const data = await res.json();
              roomCode = data.code;
              localPlayer = data.player;
              playersList = data.players;
              currentStep = 'lobby';
              startPolling();
              renderContent();
            } else {
              alert("Lobby Code nicht gefunden! Bitte überprüfe den Code.");
            }
          } catch (e) {
            console.error("Join error", e);
          }
        }
      });

    } else if (currentStep === 'lobby') {
      const isHost = localPlayer && localPlayer.isHost;

      overlay.innerHTML = `
        <div class="modal-content">
          <button class="modal-close-btn" id="close-lobby-btn">✕</button>

          <div style="text-align:center; margin-bottom:16px;">
            <span style="font-size:0.85rem; color:var(--accent-cyan); font-weight:700; text-transform:uppercase;">
              ${isHost ? '👑 DU BIST HOST' : '🔑 MITGLIED BEIGETRETEN'}
            </span>
            <h2 style="font-family:var(--font-heading); font-size:2.4rem; font-weight:900; color:var(--accent-gold); letter-spacing:2px; margin-top:2px;">
              ${roomCode}
            </h2>
            <p style="color:var(--text-muted); font-size:0.85rem;">Teile diesen Raumcode für Mitspieler!</p>
          </div>

          <!-- Spielmodus Auswahl für Host -->
          <div style="background:rgba(255,255,255,0.05); padding:14px; border-radius:14px; border:1px solid var(--border-color); margin-bottom:16px;">
            <label class="form-label">${getTranslation('gameModes')}</label>
            <select id="online-mode-select" class="form-select" ${!isHost ? 'disabled' : ''}>
              <option value="classic" ${selectedMode === 'classic' ? 'selected' : ''}>Classic (Original Hitster)</option>
              <option value="pro" ${selectedMode === 'pro' ? 'selected' : ''}>Pro Mode (Keine Tipps)</option>
              <option value="expert" ${selectedMode === 'expert' ? 'selected' : ''}>Expert Mode (Exaktes Jahr)</option>
              <option value="coop" ${selectedMode === 'coop' ? 'selected' : ''}>Kooperativ (Teamwork)</option>
              <option value="solo" ${selectedMode === 'solo' ? 'selected' : ''}>Solo Challenge</option>
            </select>
          </div>

          <!-- Players List -->
          <div style="background:rgba(255,255,255,0.05); padding:16px; border-radius:14px; border:1px solid var(--border-color); margin-bottom:20px;">
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px;">
              <h3 style="font-family:var(--font-heading); font-size:1rem; font-weight:700; color:#fff;">Verbundene Spieler:</h3>
              ${isHost ? `
                <button class="btn-secondary" id="add-ai-bot-btn" style="padding:4px 10px; font-size:0.75rem; border-color:var(--accent-cyan);">
                  🤖 + KI-Gegner Hinzufügen
                </button>
              ` : ''}
            </div>

            <div style="display:flex; flex-direction:column; gap:8px;">
              ${playersList.map((p, idx) => `
                <div style="display:flex; align-items:center; justify-content:space-between; background:rgba(0,0,0,0.3); padding:10px 14px; border-radius:10px;">
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span>${p.isAI ? p.aiIcon || '🤖' : '👤'}</span>
                    <span style="font-weight:700; color:#fff;">${p.name} ${p.id === localPlayer.id ? '(Du)' : ''}</span>
                  </div>
                  <div>
                    ${p.isHost ? '<span style="font-size:0.75rem; background:var(--accent-gold); color:#000; font-weight:900; padding:2px 8px; border-radius:10px;">HOST</span>' : ''}
                    ${p.isAI ? `<span style="font-size:0.75rem; background:var(--accent-cyan); color:#000; font-weight:800; padding:2px 8px; border-radius:10px;">KI (${p.aiDifficulty.toUpperCase()})</span>` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div style="display:flex; gap:12px;">
            ${isHost ? `
              <button class="btn-primary" id="start-online-game-btn" style="flex:1;">Online Runde Starten 🚀</button>
            ` : `
              <div style="text-align:center; width:100%; color:var(--accent-cyan); font-weight:700; font-size:0.95rem;">
                ⏳ Warten auf Host zum Starten der Runde...
              </div>
            `}
          </div>
        </div>
      `;

      overlay.querySelector('#close-lobby-btn').addEventListener('click', close);

      if (isHost) {
        const modeSelect = overlay.querySelector('#online-mode-select');
        if (modeSelect) {
          modeSelect.addEventListener('change', (e) => {
            selectedMode = e.target.value;
          });
        }

        const addAiBtn = overlay.querySelector('#add-ai-bot-btn');
        if (addAiBtn) {
          addAiBtn.addEventListener('click', () => {
            const aiIcon = AI_ICONS[Math.floor(Math.random() * AI_ICONS.length)];
            const diffs = ['easy', 'medium', 'hard', 'impossible'];
            const aiDiff = diffs[Math.floor(Math.random() * diffs.length)];
            const botCount = playersList.filter(p => p.isAI).length + 1;

            const newBot = {
              id: `bot-${Date.now()}`,
              name: `KI Bot ${botCount}`,
              isHost: false,
              isAI: true,
              aiDifficulty: aiDiff,
              aiIcon: aiIcon
            };
            playersList.push(newBot);
            renderContent();
          });
        }
      }

      const startBtn = overlay.querySelector('#start-online-game-btn');
      if (startBtn) {
        startBtn.addEventListener('click', async () => {
          try {
            await fetch('/api/rooms/start', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ code: roomCode, mode: selectedMode })
            });
          } catch (e) {
            console.error("Start room error", e);
          }
          stopPolling();
          close();
          if (onStartGame) onStartGame(formatPlayersForGame(playersList), roomCode, selectedMode);
        });
      }
    }
  };

  const close = () => {
    stopPolling();
    overlay.remove();
    if (onClose) onClose();
  };

  document.body.appendChild(overlay);
  renderContent();
}
