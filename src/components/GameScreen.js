// Core Game Screen Component for Hitster
// Implements distinct gameplay mechanics for Classic, Pro, Expert, Coop, and Solo modes + Room Code Display!

import { SONGS_DATABASE } from '../data/songsDatabase.js';
import { audioEngine } from '../utils/audioPlayer.js';
import { generateSpotifyQRCode } from '../utils/qrGenerator.js';
import { getTranslation } from '../data/i18n.js';
import { saveGameResult } from './HighscoresModal.js';

export function renderGameScreen(container, gameSetup, onExitGame) {
  let { mode = 'classic', players = [], roomCode = '' } = gameSetup;
  let activePlayerIndex = 0;
  let currentCard = null;
  let songDeck = [...SONGS_DATABASE].sort(() => Math.random() - 0.5);
  let isPlayingAudio = false;

  // Defensive initialization for all players
  const PLAYER_COLORS = ['#ff2b55', '#00e5ff', '#ffd700', '#a855f7', '#22c55e', '#f97316'];
  players.forEach((p, idx) => {
    if (!p.timeline) p.timeline = [];
    if (typeof p.tokens !== 'number') p.tokens = 3;
    if (!p.color) p.color = PLAYER_COLORS[idx % PLAYER_COLORS.length];
    if (!p.name) p.name = `Spieler ${idx + 1}`;
  });

  // Mode Specific State
  let teamLives = 3; // For Coop Mode
  let soloTimerSeconds = 30; // For Solo Mode
  let soloTimerInterval = null;
  let exactYearInput = ''; // For Expert Mode

  // Initialize each player with 1 starting card in their timeline
  if (mode === 'coop') {
    if (players[0].timeline.length === 0 && songDeck.length > 0) {
      players[0].timeline.push(songDeck.pop());
    }
  } else {
    players.forEach(p => {
      if (p.timeline.length === 0 && songDeck.length > 0) {
        p.timeline.push(songDeck.pop());
      }
    });
  }

  const drawNextCard = () => {
    if (songDeck.length === 0) {
      songDeck = [...SONGS_DATABASE].sort(() => Math.random() - 0.5);
    }
    currentCard = songDeck.pop();
    exactYearInput = '';
    audioEngine.stop();

    if (mode === 'solo') {
      resetSoloTimer();
    }
  };

  const resetSoloTimer = () => {
    if (soloTimerInterval) clearInterval(soloTimerInterval);
    soloTimerSeconds = 30;
    soloTimerInterval = setInterval(() => {
      soloTimerSeconds -= 1;
      const timerEl = container.querySelector('#solo-timer-display');
      if (timerEl) {
        timerEl.innerHTML = `⏱️ ${soloTimerSeconds}s`;
        if (soloTimerSeconds <= 10) {
          timerEl.style.color = 'var(--accent-red)';
        }
      }
      if (soloTimerSeconds <= 0) {
        clearInterval(soloTimerInterval);
        validateAndRevealPlacement(-1); // Time out = wrong guess
      }
    }, 1000);
  };

  drawNextCard();

  const activePlayer = () => mode === 'coop' ? players[0] : players[activePlayerIndex];

  const updateUI = () => {
    const p = activePlayer();
    const isCoop = mode === 'coop';
    const isExpert = mode === 'expert';
    const isPro = mode === 'pro';
    const isSolo = mode === 'solo';

    container.innerHTML = `
      <div class="game-screen">
        <!-- Header Bar -->
        <header class="game-header">
          <div class="active-player-badge">
            <div class="player-avatar-preview" style="background:${p.color};">
              ${isCoop ? '🤝' : activePlayerIndex + 1}
            </div>
            <div>
              <div style="font-size:0.75rem; color:var(--text-muted);">
                ${isCoop ? 'TEAM KOOPERATIV' : `${getTranslation('currentTurn')} (${mode.toUpperCase()} MODE)`}
              </div>
              <div class="active-player-name">${isCoop ? 'Gemeinsames Team' : p.name}</div>
            </div>
          </div>

          <div style="display:flex; align-items:center; gap:16px;">
            <!-- Room Code Header Display -->
            ${roomCode ? `
              <div class="score-pill" style="border:1px solid var(--accent-gold); color:var(--accent-gold); font-weight:800; font-family:var(--font-heading);">
                🌐 RAUM: ${roomCode}
              </div>
            ` : ''}

            <!-- Mode Badges -->
            ${isCoop ? `
              <div class="score-pill" style="border:1px solid var(--accent-red);">
                Leben: ${'❤️'.repeat(teamLives)}
              </div>
            ` : ''}

            ${isSolo ? `
              <div class="score-pill" id="solo-timer-display" style="border:1px solid var(--accent-cyan); font-weight:800; font-size:1.1rem;">
                ⏱️ ${soloTimerSeconds}s
              </div>
            ` : ''}

            <div class="score-pill">
              Score: <span style="color:var(--accent-gold); font-size:1.2rem;">${p.timeline.length}</span> / 10
            </div>

            ${!isCoop ? `
              <div class="tokens-container" title="${getTranslation('hitsterTokens')}">
                ${Array.from({ length: p.tokens }).map(() => `
                  <div class="hitster-token">H</div>
                `).join('')}
              </div>
            ` : ''}

            <button class="btn-secondary" id="exit-game-btn">✕</button>
          </div>
        </header>

        <!-- Active Music Card (Face Down during turn) -->
        <div class="music-card-area">
          <div class="music-card">
            <div class="music-card-secret-cover">
              <span class="music-note-icon" id="card-note-icon">🎵</span>
            </div>

            <div style="text-align:center;">
              <h3 style="font-family:var(--font-heading); font-size:1.2rem; font-weight:800; color:#fff;">
                ${isExpert ? 'Exaktes Jahr & Platz Raten!' : 'Welches Jahr?'}
              </h3>
              <p style="font-size:0.85rem; color:var(--accent-cyan); font-weight:700;">
                MODE: ${mode.toUpperCase()}
              </p>
            </div>

            <!-- Audio Player Controls -->
            <div class="music-player-controls">
              <button class="play-audio-btn" id="toggle-audio-btn">
                ${isPlayingAudio ? '⏸' : '▶'}
              </button>

              <div class="playing-waveform" id="waveform-container" style="display:${isPlayingAudio ? 'flex' : 'none'};">
                <div class="wave-bar"></div>
                <div class="wave-bar"></div>
                <div class="wave-bar"></div>
                <div class="wave-bar"></div>
                <div class="wave-bar"></div>
              </div>
            </div>
          </div>

          <!-- EXPERT MODE: Exact Year Input Field -->
          ${isExpert ? `
            <div style="background:rgba(255,215,0,0.1); border:1px solid var(--accent-gold); padding:12px 18px; border-radius:14px; display:flex; align-items:center; gap:12px;">
              <span style="font-size:1.2rem;">🎯</span>
              <label style="font-size:0.85rem; font-weight:700; color:var(--accent-gold);">Exaktes Jahr Tippen (Bonus +2):</label>
              <input type="number" id="expert-year-input" class="form-input" placeholder="z.B. 1985" style="width:100px; text-align:center; font-weight:800;" value="${exactYearInput}" />
            </div>
          ` : ''}

          <!-- Token Action Buttons -->
          <div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center;">
            ${p.tokens > 0 && !isCoop ? `
              <button class="btn-secondary" id="skip-song-btn" style="font-size:0.85rem;">
                ⏭ ${getTranslation('useTokenSkip')} (1 Token)
              </button>
            ` : ''}
            ${p.tokens >= 3 && !isCoop ? `
              <button class="btn-secondary" id="buy-card-btn" style="font-size:0.85rem; border-color:var(--accent-gold);">
                🎁 ${getTranslation('useTokenBuy')} (3 Tokens)
              </button>
            ` : ''}
          </div>
        </div>

        <!-- Interactive Timeline Board -->
        <div style="margin-top:10px;">
          <h3 style="font-family:var(--font-heading); font-size:1rem; font-weight:700; color:var(--text-muted); margin-bottom:10px; text-align:center;">
            Wähle den passenden Platz im Zeitstrahl:
          </h3>

          <div class="timeline-container">
            <div class="timeline-track">
              <!-- First slot before first card -->
              <button class="timeline-slot-btn" data-slot="0">
                <span>➕</span>
                <span>Hier</span>
              </button>

              ${p.timeline.map((card, idx) => `
                <div class="timeline-card">
                  <!-- Pro mode conceals release year on timeline until hovering/revealed -->
                  <div class="card-year">${isPro ? '????' : card.year}</div>
                  <div class="card-artist">${card.artist}</div>
                  <div class="card-title">${card.title}</div>
                </div>

                <!-- Slot after card -->
                <button class="timeline-slot-btn" data-slot="${idx + 1}">
                  <span>➕</span>
                  <span>Hier</span>
                </button>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    // Event Bindings
    container.querySelector('#exit-game-btn').addEventListener('click', () => {
      if (soloTimerInterval) clearInterval(soloTimerInterval);
      audioEngine.stop();
      onExitGame();
    });

    const playBtn = container.querySelector('#toggle-audio-btn');
    const noteIcon = container.querySelector('#card-note-icon');
    const waveform = container.querySelector('#waveform-container');

    playBtn.addEventListener('click', async () => {
      if (audioEngine.isPlaying) {
        audioEngine.pause();
      } else {
        playBtn.innerHTML = '⏳';
        noteIcon.innerHTML = '⏳';
        await audioEngine.playTrack(currentCard);
      }
    });

    if (isExpert) {
      const yearInput = container.querySelector('#expert-year-input');
      if (yearInput) {
        yearInput.addEventListener('input', (e) => {
          exactYearInput = e.target.value;
        });
      }
    }

    const skipBtn = container.querySelector('#skip-song-btn');
    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        if (p.tokens > 0) {
          p.tokens -= 1;
          drawNextCard();
          updateUI();
        }
      });
    }

    const buyBtn = container.querySelector('#buy-card-btn');
    if (buyBtn) {
      buyBtn.addEventListener('click', () => {
        if (p.tokens >= 3) {
          p.tokens -= 3;
          p.timeline.push(currentCard);
          p.timeline.sort((a, b) => a.year - b.year);
          checkWinCondition();
          drawNextCard();
          updateUI();
        }
      });
    }

    // Timeline Placement Slot Clicked!
    container.querySelectorAll('.timeline-slot-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const slotIdx = parseInt(e.currentTarget.getAttribute('data-slot'));
        validateAndRevealPlacement(slotIdx);
      });
    });
  };

  const validateAndRevealPlacement = (slotIdx) => {
    if (soloTimerInterval) clearInterval(soloTimerInterval);
    audioEngine.pause();
    isPlayingAudio = false;

    const p = activePlayer();
    const timeline = p.timeline;

    if (slotIdx === -1) {
      // Timeout wrong placement
      showRevealModal(false, false, "Zeit abgelaufen!");
      return;
    }

    // Check chronological order
    const prevYear = slotIdx > 0 ? timeline[slotIdx - 1].year : -Infinity;
    const nextYear = slotIdx < timeline.length ? timeline[slotIdx].year : Infinity;

    const isCorrectPlacement = currentCard.year >= prevYear && currentCard.year <= nextYear;
    let exactYearHit = false;

    if (mode === 'expert' && exactYearInput) {
      exactYearHit = parseInt(exactYearInput) === currentCard.year;
    }

    if (isCorrectPlacement) {
      timeline.splice(slotIdx, 0, currentCard);

      if (exactYearHit) {
        p.tokens = Math.min(p.tokens + 2, 5);
      } else {
        p.tokens = Math.min(p.tokens + 1, 5);
      }

      if (window.confetti) {
        window.confetti({ particleCount: exactYearHit ? 200 : 100, spread: 80, origin: { y: 0.6 } });
      }
    } else {
      if (mode === 'coop') {
        teamLives -= 1;
      } else if (mode === 'pro') {
        p.tokens = Math.max(p.tokens - 1, 0); // Pro mode penalizes tokens on fail
      }
    }

    showRevealModal(isCorrectPlacement, exactYearHit);
  };

  const showRevealModal = (isCorrect, exactYearHit = false, customMsg = null) => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    let headerTitle = isCorrect ? getTranslation('correctGuess') : getTranslation('wrongGuess');
    if (exactYearHit) {
      headerTitle = "🎯 PERFEKT! Exaktes Jahr erraten (+2 Bonus)!";
    } else if (customMsg) {
      headerTitle = customMsg;
    }

    overlay.innerHTML = `
      <div class="modal-content">
        <div class="revealed-card-view">
          <div style="font-size:3rem; margin-bottom:-10px;">
            ${exactYearHit ? '⭐' : (isCorrect ? '🎉' : '❌')}
          </div>

          <h2 style="font-family:var(--font-heading); font-size:1.6rem; font-weight:900; color:${isCorrect ? '#22c55e' : 'var(--accent-red)'};">
            ${headerTitle}
          </h2>

          <!-- Revealed Card Year & Details -->
          <div class="revealed-year">${currentCard.year}</div>
          <div class="revealed-artist">${currentCard.artist}</div>
          <div class="revealed-title">"${currentCard.title}"</div>

          <!-- Spotify QR Code -->
          ${generateSpotifyQRCode(currentCard.spotifyUrl, currentCard.title)}

          <a href="${currentCard.spotifyUrl}" target="_blank" class="btn-secondary" style="margin-top:10px; font-size:0.85rem;">
            🟢 ${getTranslation('openInSpotify')}
          </a>

          <button class="btn-primary" id="next-turn-btn" style="width:100%; margin-top:20px; padding:16px;">
            Nächster Zug →
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector('#next-turn-btn').addEventListener('click', () => {
      overlay.remove();

      if (checkWinOrLossCondition()) return;

      // Rotate turn to next player unless Coop
      if (mode !== 'coop') {
        activePlayerIndex = (activePlayerIndex + 1) % players.length;
      }
      drawNextCard();
      updateUI();
    });
  };

  const checkWinOrLossCondition = () => {
    // Coop Loss Condition
    if (mode === 'coop' && teamLives <= 0) {
      showGameOverModal("Keine Leben mehr! Team-Spiel verloren.");
      return true;
    }

    // Win condition check
    const winner = players.find(p => p.timeline.length >= 10);
    if (winner) {
      saveGameResult(winner.name, winner.timeline.length);
      showWinModal(winner);
      return true;
    }
    return false;
  };

  const showGameOverModal = (msg) => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    overlay.innerHTML = `
      <div class="modal-content" style="text-align:center;">
        <span style="font-size:4rem;">💔</span>
        <h1 style="font-family:var(--font-heading); font-size:2.4rem; font-weight:900; color:var(--accent-red); margin-top:10px;">
          GAME OVER
        </h1>
        <p style="color:var(--text-muted); font-size:1.1rem; margin:10px 0 20px;">
          ${msg}
        </p>

        <button class="btn-primary" id="finish-game-btn" style="width:100%; padding:16px;">
          Zurück zum Hauptmenü
        </button>
      </div>
    `;

    document.body.appendChild(overlay);
    overlay.querySelector('#finish-game-btn').addEventListener('click', () => {
      overlay.remove();
      audioEngine.stop();
      onExitGame();
    });
  };

  const showWinModal = (winner) => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    if (window.confetti) {
      window.confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 } });
    }

    overlay.innerHTML = `
      <div class="modal-content" style="text-align:center;">
        <span style="font-size:4rem;">🏆</span>
        <h1 style="font-family:var(--font-heading); font-size:2.8rem; font-weight:900; color:var(--accent-gold); margin-top:10px;">
          ${mode === 'coop' ? 'TEAM GEWINNT!' : `${winner.name} GEWINNT!`}
        </h1>
        <p style="color:var(--text-muted); font-size:1.1rem; margin:10px 0 20px;">
          10 Karten erfolgreich im Zeitstrahl platziert! (${mode.toUpperCase()} MODE)
        </p>

        <button class="btn-primary" id="finish-game-btn" style="width:100%; padding:16px;">
          Zurück zum Hauptmenü
        </button>
      </div>
    `;

    document.body.appendChild(overlay);
    overlay.querySelector('#finish-game-btn').addEventListener('click', () => {
      overlay.remove();
      audioEngine.stop();
      onExitGame();
    });
  };

  // Subscribe to audio player status updates
  audioEngine.subscribe(({ isPlaying }) => {
    isPlayingAudio = isPlaying;
    const playBtn = container.querySelector('#toggle-audio-btn');
    const noteIcon = container.querySelector('#card-note-icon');
    const waveform = container.querySelector('#waveform-container');

    if (playBtn) playBtn.innerHTML = isPlaying ? '⏸' : '▶';
    if (noteIcon) noteIcon.innerHTML = '🎵';
    if (waveform) waveform.style.display = isPlaying ? 'flex' : 'none';
  });

  updateUI();
}
