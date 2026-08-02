// Extended Online Multiplayer Lobby Component with QR-Code, Copy Button, Ready States, Host Kick, Private/Public Toggle, AI Difficulties, Rejoin Support & Dynamic Mode Explanations

import { getTranslation } from '../data/i18n.js';
import { getIcon } from '../utils/icons.js';
import { MODE_EXPLANATIONS } from './SetupScreen.js';

export const AI_ICONS = ['🤖', '👾', '🕹️', '👽', '⚡', '🦾', '🛰️', '🎧', '👾', '🤖‍💥'];
export const AI_DIFFICULTIES = [
  { id: 'easy', name: 'Leicht (40% Genauigkeit)', rate: 0.40 },
  { id: 'medium', name: 'Normal (75% Genauigkeit)', rate: 0.75 },
  { id: 'hard', name: 'Schwer (92% Genauigkeit)', rate: 0.92 },
  { id: 'impossible', name: 'Unmöglich (99% Maestro)', rate: 0.99 }
];

export function renderOnlineLobbyModal(onStartGame, onClose) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  let currentStep = 'choose'; // 'choose', 'join', 'lobby'
  let roomCode = localStorage.getItem('hitster_active_room') || '';
  let localPlayerId = localStorage.getItem('hitster_local_player_id') || '';
  let selectedMode = 'classic';
  let isPrivateRoom = true;
  let maxPlayers = 8;
  let localPlayer = null;
  let playersList = [];
  let pollInterval = null;
  let isConnectionLost = false;

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
      aiIcon: p.aiIcon || '🤖',
      isReady: p.isReady || false
    }));
  };

  const syncRoomModeToServer = async (newMode, newIsPrivate) => {
    if (!roomCode) return;
    try {
      await fetch('/api/rooms/update-mode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: roomCode, mode: newMode, isPrivate: newIsPrivate })
      });
    } catch (e) {}
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
          isConnectionLost = false;
          const data = await res.json();
          playersList = data.players || [];
          if (data.mode) selectedMode = data.mode;
          if (data.isPrivate !== undefined) isPrivateRoom = data.isPrivate;
          if (data.maxPlayers) maxPlayers = data.maxPlayers;
          
          if (localPlayerId) {
            const found = playersList.find(p => p.id === localPlayerId);
            if (found) localPlayer = found;
          }

          const activeEl = document.activeElement;
          const isUserInteractingWithSelect = activeEl && (activeEl.tagName === 'SELECT' || activeEl.tagName === 'INPUT') && overlay.contains(activeEl);

          if (!isUserInteractingWithSelect) {
            renderContent();
          }

          if (data.started && localPlayer && !localPlayer.isHost) {
            stopPolling();
            localStorage.removeItem('hitster_active_room');
            close();
            if (onStartGame) onStartGame(formatPlayersForGame(playersList), roomCode, selectedMode);
          }
        } else {
          isConnectionLost = true;
          renderContent();
        }
      } catch (e) {
        isConnectionLost = true;
        renderContent();
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

          ${roomCode && localPlayerId ? `
            <div style="background:rgba(255,215,0,0.12); border:1.5px solid var(--accent-gold); padding:14px; border-radius:16px; margin-bottom:20px; text-align:center;">
              <div style="font-weight:800; color:var(--accent-gold); font-size:0.95rem; margin-bottom:6px;">
                🔄 Letzte Sitzung gefunden (${roomCode})
              </div>
              <button class="btn-primary" id="rejoin-active-room-btn" style="width:100%; font-size:0.88rem; padding:10px; background:linear-gradient(135deg, var(--accent-gold), #b45309); color:#000;">
                Wiederbeitritt zu Raum ${roomCode}
              </button>
            </div>
          ` : ''}

          <div class="form-group" style="margin-bottom:16px;">
            <input type="text" id="lobby-name-input" class="form-input" placeholder="Dein Spielername" value="Spieler 1" />
          </div>

          <div style="display:flex; flex-direction:column; gap:14px;">
            <button class="btn-primary" id="host-game-btn" style="padding:16px;">
              <span>👑</span>
              <span>Raum erstellen (Host)</span>
            </button>

            <button class="btn-secondary" id="join-game-btn" style="padding:16px;">
              <span>🔑</span>
              <span>Raum beitreten (Mit Code)</span>
            </button>
          </div>
        </div>
      `;

      overlay.querySelector('#close-lobby-btn').addEventListener('click', close);
      
      const rejoinBtn = overlay.querySelector('#rejoin-active-room-btn');
      if (rejoinBtn) {
        rejoinBtn.addEventListener('click', () => {
          currentStep = 'lobby';
          startPolling();
          renderContent();
        });
      }

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
            localPlayerId = data.player.id;
            playersList = data.players;
            
            localStorage.setItem('hitster_active_room', roomCode);
            localStorage.setItem('hitster_local_player_id', localPlayerId);

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
              Raum beitreten
            </h2>
            <p style="color:var(--text-muted); font-size:0.85rem;">Gib den 6-stelligen Raumcode ein</p>
          </div>

          <div class="form-group">
            <input type="text" id="join-code-input" class="form-input" placeholder="z.B. HIT-9428" style="text-align:center; font-size:1.4rem; letter-spacing:2px; font-weight:800;" />
          </div>

          <div class="form-group">
            <input type="text" id="join-name-input" class="form-input" placeholder="Dein Spielername" value="Spieler 2" />
          </div>

          <div style="display:flex; gap:12px; margin-top:16px;">
            <button class="btn-secondary" id="back-step-btn" style="flex:1;">Zurück</button>
            <button class="btn-primary" id="confirm-join-btn" style="flex:2;">Beitreten</button>
          </div>
        </div>
      `;

      overlay.querySelector('#close-lobby-btn').addEventListener('click', close);
      overlay.querySelector('#back-step-btn').addEventListener('click', () => {
        currentStep = 'choose';
        renderContent();
      });

      overlay.querySelector('#confirm-join-btn').addEventListener('click', async () => {
        const codeInput = overlay.querySelector('#join-code-input').value.trim().toUpperCase();
        const nameInput = overlay.querySelector('#join-name-input').value.trim() || 'Mitspieler';

        if (!codeInput) return;

        try {
          const res = await fetch('/api/rooms/join', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: codeInput, name: nameInput })
          });

          if (res.ok) {
            const data = await res.json();
            roomCode = data.code;
            localPlayer = data.player;
            localPlayerId = data.player.id;
            playersList = data.players;

            localStorage.setItem('hitster_active_room', roomCode);
            localStorage.setItem('hitster_local_player_id', localPlayerId);

            currentStep = 'lobby';
            startPolling();
            renderContent();
          } else {
            alert("Raumcode nicht gefunden!");
          }
        } catch (e) {
          alert("Fehler beim Beitreten!");
        }
      });

    } else if (currentStep === 'lobby') {
      const isHost = localPlayer && localPlayer.isHost;
      const canStart = playersList.length >= 2;
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=${encodeURIComponent(window.location.origin + '?room=' + roomCode)}`;

      overlay.innerHTML = `
        <div class="modal-content" style="max-width:580px;">
          <button class="modal-close-btn" id="close-lobby-btn">✕</button>

          ${isConnectionLost ? `
            <div style="background:rgba(255,43,85,0.2); border:1px solid var(--accent-red); color:var(--accent-red); padding:8px; border-radius:12px; text-align:center; font-weight:800; font-size:0.85rem; margin-bottom:12px; animation:pulse-glow 1.5s infinite alternate;">
              ⚠️ Verbindung getrennt... Versuch erneut zu verbinden.
            </div>
          ` : ''}

          <div style="background:rgba(0,0,0,0.3); border:1px solid var(--border-color); border-radius:18px; padding:16px; text-align:center; margin-bottom:16px;">
            <div style="display:flex; align-items:center; justify-content:center; gap:16px; flex-wrap:wrap;">
              <div>
                <span style="font-size:0.75rem; color:var(--text-muted); font-weight:800; text-transform:uppercase;">Online Raumcode</span>
                <div style="display:flex; align-items:center; gap:10px; margin-top:4px;">
                  <div style="font-family:var(--font-heading); font-size:2.2rem; font-weight:900; color:var(--accent-gold); letter-spacing:3px; text-shadow:0 0 20px var(--accent-gold-glow);">
                    ${roomCode}
                  </div>
                  <button class="btn-secondary" id="copy-room-code-btn" style="padding:6px 12px; font-size:0.8rem; border-color:var(--accent-gold); color:var(--accent-gold);">
                    📋 Kopieren
                  </button>
                </div>
              </div>

              <div style="text-align:center; background:#fff; padding:6px; border-radius:12px; box-shadow:0 4px 15px rgba(0,0,0,0.4);">
                <img src="${qrCodeUrl}" alt="QR Code" style="width:75px; height:75px; display:block;" />
                <span style="font-size:0.65rem; color:#000; font-weight:800;">📱 QR-Scan</span>
              </div>
            </div>

            <div id="copy-toast-msg" style="font-size:0.8rem; color:#22c55e; font-weight:800; margin-top:6px; display:none;">
              ✅ Raumcode in Zwischenablage kopiert!
            </div>
          </div>

          ${isHost ? `
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:8px;">
              <div class="form-group" style="margin:0;">
                <label class="form-label" style="font-size:0.8rem;">Modus:</label>
                <select id="lobby-mode-select" class="form-select" style="padding:8px; font-size:0.85rem;">
                  <option value="classic" ${selectedMode === 'classic' ? 'selected' : ''}>${getTranslation('modeClassic')}</option>
                  <option value="pro" ${selectedMode === 'pro' ? 'selected' : ''}>${getTranslation('modePro')}</option>
                  <option value="expert" ${selectedMode === 'expert' ? 'selected' : ''}>${getTranslation('modeExpert')}</option>
                  <option value="coop" ${selectedMode === 'coop' ? 'selected' : ''}>${getTranslation('modeCoop')}</option>
                </select>
              </div>

              <div class="form-group" style="margin:0;">
                <label class="form-label" style="font-size:0.8rem;">Sichtbarkeit:</label>
                <button class="btn-secondary" id="toggle-privacy-btn" style="width:100%; padding:8px; font-size:0.85rem; justify-content:center;">
                  ${isPrivateRoom ? '🔒 Privater Raum' : '🌐 Öffentlicher Raum'}
                </button>
              </div>
            </div>

            <!-- DYNAMISCHE MODUS-ERKLÄRUNG IN DER ONLINE LOBBY -->
            <div id="lobby-mode-explanation" style="margin-bottom:14px; padding:8px 12px; background:rgba(0,229,255,0.08); border:1px solid var(--accent-cyan); border-radius:12px; font-size:0.82rem; color:var(--accent-cyan); font-weight:700;">
              ${MODE_EXPLANATIONS[selectedMode] || MODE_EXPLANATIONS['classic']}
            </div>
          ` : `
            <div style="background:rgba(255,255,255,0.06); padding:8px 14px; border-radius:12px; margin-bottom:6px; font-size:0.85rem; display:flex; justify-content:between;">
              <span><strong>Modus:</strong> ${selectedMode.toUpperCase()}</span>
              <span><strong>Raum:</strong> ${isPrivateRoom ? '🔒 Privat' : '🌐 Öffentlich'}</span>
            </div>
            <div style="margin-bottom:14px; padding:8px 12px; background:rgba(0,229,255,0.08); border:1px solid var(--accent-cyan); border-radius:12px; font-size:0.82rem; color:var(--accent-cyan); font-weight:700;">
              ${MODE_EXPLANATIONS[selectedMode] || MODE_EXPLANATIONS['classic']}
            </div>
          `}

          <div class="form-group">
            <div style="display:flex; align-items:center; justify-content:between; margin-bottom:8px;">
              <label class="form-label" style="margin:0;">Teilnehmer (${playersList.length}/${maxPlayers})</label>
              ${isHost ? `
                <button class="btn-secondary" id="add-ai-btn" style="padding:4px 10px; font-size:0.75rem; border-color:var(--accent-cyan); color:var(--accent-cyan);">
                  + KI-Gegner hinzufügen
                </button>
              ` : ''}
            </div>

            <div style="display:flex; flex-direction:column; gap:8px; max-height:190px; overflow-y:auto; padding-right:4px;">
              ${playersList.map((p, idx) => `
                <div style="display:flex; align-items:center; justify-content:between; background:rgba(0,0,0,0.3); padding:8px 12px; border-radius:12px; border:1px solid ${p.id === (localPlayer ? localPlayer.id : '') ? 'var(--accent-cyan)' : 'var(--border-color)'};">
                  <div style="display:flex; align-items:center; gap:10px;">
                    <div style="width:32px; height:32px; border-radius:50%; background:${PLAYER_COLORS[idx % PLAYER_COLORS.length]}; display:flex; align-items:center; justify-content:center; font-weight:800; color:#fff; font-size:0.9rem;">
                      ${p.isAI ? p.aiIcon || '🤖' : (p.isHost ? '👑' : idx + 1)}
                    </div>
                    <div>
                      <div style="font-weight:700; color:#fff; font-size:0.9rem; display:flex; align-items:center; gap:6px;">
                        ${p.name} ${p.id === (localPlayer ? localPlayer.id : '') ? '(Du)' : ''}
                        ${p.isHost ? `<span style="background:rgba(255,215,0,0.2); border:1px solid var(--accent-gold); color:var(--accent-gold); padding:1px 6px; border-radius:10px; font-size:0.65rem; font-weight:900;">👑 HOST</span>` : ''}
                      </div>

                      ${p.isAI && isHost ? `
                        <select class="form-select inline-ai-diff" data-id="${p.id}" style="width:auto; padding:2px 6px; font-size:0.72rem; margin-top:2px;">
                          ${AI_DIFFICULTIES.map(d => `<option value="${d.id}" ${p.aiDifficulty === d.id ? 'selected' : ''}>${d.name}</option>`).join('')}
                        </select>
                      ` : `
                        <div style="font-size:0.75rem; color:${p.isReady ? '#22c55e' : 'var(--text-muted)'}; font-weight:700;">
                          ${p.isReady ? '🟢 Bereit' : '🔴 Nicht bereit'}
                        </div>
                      `}
                    </div>
                  </div>

                  <div style="display:flex; align-items:center; gap:8px;">
                    ${p.id === (localPlayer ? localPlayer.id : '') && !p.isHost ? `
                      <button class="btn-secondary toggle-ready-btn" style="padding:4px 10px; font-size:0.75rem; ${p.isReady ? 'background:#22c55e; color:#fff; border-color:#22c55e;' : ''}">
                        ${p.isReady ? '🟢 Bereit' : '🔴 Bereit melden'}
                      </button>
                    ` : ''}

                    ${isHost && !p.isHost ? `
                      <button class="kick-player-btn" data-id="${p.id}" style="background:rgba(255,43,85,0.15); border:1px solid var(--accent-red); color:var(--accent-red); padding:4px 8px; border-radius:8px; font-size:0.75rem; font-weight:800; cursor:pointer;" title="Spieler entfernen">
                        ✕ Kick
                      </button>
                    ` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div style="margin-top:16px;">
            ${isHost ? `
              <button class="btn-primary" id="start-online-game-btn" ${!canStart ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''} style="width:100%; padding:14px; font-size:1.05rem;">
                ${canStart ? '🚀 Online-Runde starten' : '⏳ Warten auf mindestens 2 Teilnehmer...'}
              </button>
            ` : `
              <div style="text-align:center; color:var(--accent-cyan); font-weight:700; padding:10px; background:rgba(0,229,255,0.1); border-radius:12px;">
                Warten auf Host zum Starten der Runde...
              </div>
            `}
          </div>
        </div>
      `;

      overlay.querySelector('#close-lobby-btn').addEventListener('click', () => {
        stopPolling();
        localStorage.removeItem('hitster_active_room');
        close();
      });

      overlay.querySelector('#copy-room-code-btn').addEventListener('click', () => {
        try {
          navigator.clipboard.writeText(roomCode);
          const toast = overlay.querySelector('#copy-toast-msg');
          if (toast) {
            toast.style.display = 'block';
            setTimeout(() => { toast.style.display = 'none'; }, 2500);
          }
        } catch (e) {}
      });

      const readyBtn = overlay.querySelector('.toggle-ready-btn');
      if (readyBtn && localPlayer) {
        readyBtn.addEventListener('click', async () => {
          localPlayer.isReady = !localPlayer.isReady;
          renderContent();
        });
      }

      if (isHost) {
        const modeSelect = overlay.querySelector('#lobby-mode-select');
        const expBox = overlay.querySelector('#lobby-mode-explanation');
        if (modeSelect) {
          modeSelect.addEventListener('change', async (e) => {
            selectedMode = e.target.value;
            if (expBox) {
              expBox.innerHTML = MODE_EXPLANATIONS[selectedMode] || MODE_EXPLANATIONS['classic'];
            }
            await syncRoomModeToServer(selectedMode, isPrivateRoom);
          });
        }

        const privacyBtn = overlay.querySelector('#toggle-privacy-btn');
        if (privacyBtn) {
          privacyBtn.addEventListener('click', async () => {
            isPrivateRoom = !isPrivateRoom;
            await syncRoomModeToServer(selectedMode, isPrivateRoom);
            renderContent();
          });
        }

        const addAiBtn = overlay.querySelector('#add-ai-btn');
        if (addAiBtn) {
          addAiBtn.addEventListener('click', async () => {
            if (playersList.length >= maxPlayers) return;
            const aiNames = ['Hitster Bot', 'Beat Master', 'Retro Bot', 'Disco KI', 'Synth Bot'];
            const aiName = `${aiNames[Math.floor(Math.random() * aiNames.length)]} ${playersList.length + 1}`;
            
            try {
              const res = await fetch('/api/rooms/add-ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: roomCode, name: aiName, difficulty: 'medium' })
              });
              if (res.ok) {
                const data = await res.json();
                playersList = data.players;
                renderContent();
              }
            } catch (e) {}
          });
        }

        overlay.querySelectorAll('.kick-player-btn').forEach(btn => {
          btn.addEventListener('click', async (e) => {
            const targetId = e.currentTarget.getAttribute('data-id');
            playersList = playersList.filter(p => p.id !== targetId);
            renderContent();
          });
        });

        overlay.querySelectorAll('.inline-ai-diff').forEach(select => {
          select.addEventListener('change', (e) => {
            const targetId = e.target.getAttribute('data-id');
            const found = playersList.find(p => p.id === targetId);
            if (found) found.aiDifficulty = e.target.value;
          });
        });

        const startBtn = overlay.querySelector('#start-online-game-btn');
        if (startBtn && canStart) {
          startBtn.addEventListener('click', async () => {
            try {
              await fetch('/api/rooms/start', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: roomCode, mode: selectedMode })
              });
              stopPolling();
              localStorage.removeItem('hitster_active_room');
              close();
              if (onStartGame) onStartGame(formatPlayersForGame(playersList), roomCode, selectedMode);
            } catch (e) {
              stopPolling();
              localStorage.removeItem('hitster_active_room');
              close();
              if (onStartGame) onStartGame(formatPlayersForGame(playersList), roomCode, selectedMode);
            }
          });
        }
      }
    }
  };

  const close = () => {
    stopPolling();
    overlay.remove();
    if (onClose) onClose();
  };

  renderContent();
  document.body.appendChild(overlay);
}
