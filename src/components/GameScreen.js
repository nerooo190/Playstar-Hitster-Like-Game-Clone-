// Core Game Screen Component for Hitster
// Party Atmosphere Features: Moving Backgrounds, Decade Themes, Streak Counter, Micro Reactions, Podium Victory Screen & Animation Opt-Out Toggle

import { SONGS_DATABASE } from '../data/songsDatabase.js';
import { audioEngine } from '../utils/audioPlayer.js';
import { generateSpotifyQRCode } from '../utils/qrGenerator.js';
import { getTranslation } from '../data/i18n.js';
import { saveGameResult } from './HighscoresModal.js';
import { getIcon } from '../utils/icons.js';

// WEB AUDIO SYNTHESIZER (CINEMATIC REVEAL & COUNTDOWN SOUND EFFECTS)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playBeepSound(freq = 440, durationMs = 150) {
  try {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + (durationMs / 1000));

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + (durationMs / 1000));
  } catch (err) {}
}

function playVictorySound() {
  try {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
      }, idx * 100);
    });
  } catch (err) {}
}

function playErrorSound() {
  try {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, audioCtx.currentTime);
    osc.frequency.linearRampToValueAtTime(110, audioCtx.currentTime + 0.35);

    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.35);
  } catch (err) {}
}

const MICRO_REACTIONS = [
  "🔥 FEUER & FLAMME!",
  "🎶 MAESTRO!",
  "🤯 WAHNSINN!",
  "👏 SPITZE!",
  "⭐ GEMINI BEAT!",
  "💎 PERFEKT!"
];

export function renderGameScreen(container, gameSetup, onExitGame) {
  let { mode = 'classic', category = 'all', players = [], roomCode = '' } = gameSetup;
  let activePlayerIndex = 0;
  let currentCard = null;
  let isPlayingAudio = false;
  let isAiTurnExecuting = false;
  let audioVolume = 0.8;
  let currentTime = 0;
  let duration = 30;
  let areAnimationsEnabled = true;

  let filteredSongs = [...SONGS_DATABASE];
  if (category && category !== 'all') {
    if (category === 'lionking') {
      filteredSongs = SONGS_DATABASE.filter(s => (s.genre && s.genre.toLowerCase().includes('lion king')) || (s.title && s.title.toLowerCase().includes('lion king')));
    } else if (category === 'soundtracks') {
      filteredSongs = SONGS_DATABASE.filter(s => (s.genre && (s.genre.toLowerCase().includes('ost') || s.genre.toLowerCase().includes('soundtrack') || s.genre.toLowerCase().includes('score'))));
    } else if (category === 'eminem') {
      filteredSongs = SONGS_DATABASE.filter(s => s.artist && s.artist.toLowerCase().includes('eminem'));
    } else if (category === 'queen') {
      filteredSongs = SONGS_DATABASE.filter(s => (s.artist && s.artist.toLowerCase().includes('queen')) || (s.artist && s.artist.toLowerCase().includes('mercury')));
    } else if (category === 'oldies') {
      filteredSongs = SONGS_DATABASE.filter(s => s.year < 1980);
    } else if (category === 'modern') {
      filteredSongs = SONGS_DATABASE.filter(s => s.year >= 2010);
    } else if (category === 'pop') {
      filteredSongs = SONGS_DATABASE.filter(s => s.genre && s.genre.toLowerCase().includes('pop'));
    } else if (category === 'rap') {
      filteredSongs = SONGS_DATABASE.filter(s => s.genre && (s.genre.toLowerCase().includes('rap') || s.genre.toLowerCase().includes('hip-hop')));
    } else if (category === 'features') {
      filteredSongs = SONGS_DATABASE.filter(s => (s.artist && (s.artist.toLowerCase().includes('ft.') || s.artist.includes('&'))));
    } else if (category === 'live') {
      filteredSongs = SONGS_DATABASE.filter(s => (s.title && (s.title.toLowerCase().includes('live') || s.title.toLowerCase().includes('demo') || s.title.toLowerCase().includes('b-side'))));
    }
  }

  if (!filteredSongs || filteredSongs.length === 0) {
    filteredSongs = [...SONGS_DATABASE];
  }

  let songDeck = [...filteredSongs].sort(() => Math.random() - 0.5);

  const PLAYER_COLORS = ['#ff2b55', '#00e5ff', '#ffd700', '#a855f7', '#22c55e', '#f97316'];
  players.forEach((p, idx) => {
    if (!p.timeline) p.timeline = [];
    if (typeof p.tokens !== 'number') p.tokens = 3;
    if (typeof p.streak !== 'number') p.streak = 0;
    if (!p.color) p.color = PLAYER_COLORS[idx % PLAYER_COLORS.length];
    if (!p.name) p.name = `Spieler ${idx + 1}`;
    if (typeof p.isAI === 'undefined') p.isAI = false;
  });

  let teamLives = 3;
  let soloTimerSeconds = 30;
  let soloTimerInterval = null;
  let exactYearInput = '';

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

  const getDecadeClass = (year) => {
    if (!year) return 'decade-1990s';
    if (year < 1970) return 'decade-1960s';
    if (year < 1980) return 'decade-1970s';
    if (year < 1990) return 'decade-1980s';
    if (year < 2000) return 'decade-1990s';
    if (year < 2010) return 'decade-2000s';
    if (year < 2020) return 'decade-2010s';
    return 'decade-2020s';
  };

  const drawNextCard = () => {
    if (songDeck.length === 0) {
      songDeck = [...filteredSongs].sort(() => Math.random() - 0.5);
    }
    currentCard = songDeck.pop();
    exactYearInput = '';
    isAiTurnExecuting = false;
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
        confirmAndRevealPlacement(-1);
      }
    }, 1000);
  };

  drawNextCard();

  const activePlayer = () => mode === 'coop' ? players[0] : players[activePlayerIndex];

  const formatTime = (secs) => {
    if (isNaN(secs) || secs <= 0) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleAiTurnIfNecessary = () => {
    const p = activePlayer();
    if (p.isAI && !isAiTurnExecuting) {
      isAiTurnExecuting = true;
      audioEngine.playTrack(currentCard);

      setTimeout(() => {
        let accuracy = 0.75;
        if (p.aiDifficulty === 'easy') accuracy = 0.40;
        if (p.aiDifficulty === 'medium') accuracy = 0.75;
        if (p.aiDifficulty === 'hard') accuracy = 0.92;
        if (p.aiDifficulty === 'impossible') accuracy = 0.99;

        const isCorrectChoice = Math.random() < accuracy;
        const timeline = p.timeline;
        let correctSlot = 0;

        for (let i = 0; i <= timeline.length; i++) {
          const prevYear = i > 0 ? timeline[i - 1].year : -Infinity;
          const nextYear = i < timeline.length ? timeline[i].year : Infinity;
          if (currentCard.year >= prevYear && currentCard.year <= nextYear) {
            correctSlot = i;
            break;
          }
        }

        let chosenSlot = correctSlot;
        if (!isCorrectChoice && timeline.length > 0) {
          chosenSlot = (correctSlot + (Math.random() < 0.5 ? 1 : -1) + (timeline.length + 1)) % (timeline.length + 1);
        }

        if (mode === 'expert') {
          if (isCorrectChoice) {
            exactYearInput = currentCard.year.toString();
          } else {
            exactYearInput = (currentCard.year + Math.floor(Math.random() * 5) - 2).toString();
          }
        }

        confirmAndRevealPlacement(chosenSlot);
      }, 2400);
    }
  };

  const updateUI = () => {
    const p = activePlayer();
    const isCoop = mode === 'coop';
    const isExpert = mode === 'expert';
    const isPro = mode === 'pro';
    const isSolo = mode === 'solo';

    const currentScore = p.timeline.length;
    const progressPercent = Math.min(100, Math.round((currentScore / 10) * 100));
    const decadeClass = getDecadeClass(currentCard.year);

    container.innerHTML = `
      <div class="game-screen ${decadeClass}">
        <!-- SECTION 1: OBEN (STICKY HEADER WITH STREAK & ANIMATIONS TOGGLE) -->
        <header class="game-header">
          <div class="active-player-badge">
            <div class="player-avatar-preview" style="background:${p.color}; width:40px; height:40px; font-size:1.2rem; box-shadow:0 0 12px ${p.color};">
              ${p.icon || (p.isAI ? '🤖' : (isCoop ? '🤝' : activePlayerIndex + 1))}
            </div>
            <div>
              <div style="font-size:0.7rem; color:var(--text-muted); text-transform:uppercase; font-weight:800;">
                ${isCoop ? 'TEAM KOOPERATIV' : `${getTranslation('currentTurn')} • ${mode.toUpperCase()}`}
              </div>
              <div class="active-player-name">${isCoop ? 'Gemeinsames Team' : p.name}</div>
            </div>
          </div>

          <!-- PROMINENT GOLDEN SCORE PILL -->
          <div class="score-pill score-pill-gold">
            ${getIcon('trophy', 18)} SCORE: <span style="font-size:1.1rem; margin-left:4px;">${currentScore} / 10</span>
          </div>

          <!-- STREAK COUNTER PILL -->
          ${p.streak > 1 ? `
            <div class="score-pill" style="background:linear-gradient(135deg, rgba(239,68,68,0.3), rgba(249,115,22,0.3)); border:1.5px solid #f97316; color:#fff; font-weight:900; animation:pulse-glow 1.5s infinite alternate;">
              🔥 STREAK: ${p.streak}x!
            </div>
          ` : ''}

          <div class="progress-bar-container">
            <div class="progress-track">
              <div class="progress-fill" style="width:${progressPercent}%;"></div>
            </div>
          </div>

          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
            <div class="score-pill" style="border:1px solid var(--accent-cyan); color:var(--accent-cyan); font-weight:700; font-size:0.8rem;">
              🏷️ ${category.toUpperCase()}
            </div>

            <!-- EFFEKTE ABSCHALTEN TOGGLE -->
            <button class="btn-secondary" id="toggle-animations-btn" title="Party-Effekte An/Aus" style="padding:6px 12px; font-size:0.8rem; ${!areAnimationsEnabled ? 'opacity:0.6;' : ''}">
              ✨ Effekte: ${areAnimationsEnabled ? 'AN' : 'AUS'}
            </button>

            <button class="btn-secondary" id="exit-game-btn" title="Beenden" style="padding:6px 12px; font-size:0.8rem;">
              ${getIcon('settings', 14)} Beenden
            </button>
          </div>
        </header>

        ${p.isAI ? `
          <div style="max-width:600px; margin:0 auto; width:100%; background:rgba(0,229,255,0.15); border:1px solid var(--accent-cyan); color:var(--accent-cyan); text-align:center; padding:8px; border-radius:12px; font-weight:800; font-size:0.9rem;">
            🤖 ${p.name} (${(p.aiDifficulty || 'Medium').toUpperCase()}) hört den Song...
          </div>
        ` : ''}

        <!-- SECTION 2: MITTE (MUSIC CARD WITH ANIMATED EQUALIZER & PULSING PLAY BUTTON) -->
        <div class="music-card-area">
          <div class="music-card-large draggable-card" id="draggable-music-card">
            ${!p.isAI ? `
              <div style="background:rgba(255,215,0,0.12); border:1px dashed var(--accent-gold); color:var(--accent-gold); padding:4px 12px; border-radius:12px; font-size:0.75rem; font-weight:800;">
                🖐️ Karte nach unten in die Timeline ziehen ODER Platz anklicken
              </div>
            ` : ''}

            <div style="display:flex; align-items:center; gap:14px;">
              <div class="vinyl-disc ${isPlayingAudio ? 'spinning' : ''}">
                <div class="vinyl-center">
                  ${isPlayingAudio ? getIcon('music', 16) : getIcon('play', 16)}
                </div>
              </div>

              <div style="text-align:left;">
                <h3 style="font-family:var(--font-heading); font-size:1.1rem; font-weight:900; color:#fff;">
                  ${isExpert ? 'Exaktes Jahr & Platz Raten!' : 'Wohin im Zeitstrahl?'}
                </h3>
                <p style="font-size:0.75rem; color:var(--accent-cyan); font-weight:700;">
                  Höre die Musikprobe & platziere die Karte
                </p>
              </div>
            </div>

            <!-- Audio Controls with Equalizer Waveform -->
            <div style="width:100%; display:flex; flex-direction:column; align-items:center; gap:10px;">
              <div style="display:flex; align-items:center; justify-content:center; gap:14px; width:100%;">
                <button class="play-audio-btn-large" id="toggle-audio-btn">
                  ${isPlayingAudio ? getIcon('pause', 28) : getIcon('play', 28)}
                </button>

                <!-- DEZENTE EQUALIZER-ANIMATION -->
                <div class="playing-waveform" style="visibility:${isPlayingAudio ? 'visible' : 'hidden'};">
                  <div class="wave-bar"></div>
                  <div class="wave-bar"></div>
                  <div class="wave-bar"></div>
                  <div class="wave-bar"></div>
                  <div class="wave-bar"></div>
                </div>

                <div class="volume-control-bar">
                  <button id="mute-toggle-btn" style="background:none; border:none; color:var(--accent-gold); font-size:0.95rem; cursor:pointer; display:flex; align-items:center;">
                    ${audioVolume > 0 ? getIcon('volume2', 18) : getIcon('volumeX', 18)}
                  </button>
                  <input type="range" id="volume-slider" class="volume-slider" min="0" max="1" step="0.05" value="${audioVolume}" />
                </div>
              </div>

              <div class="audio-progress-bar-container">
                <span class="audio-time-label" id="time-current-display">${formatTime(currentTime)}</span>
                <input type="range" id="audio-seek-slider" class="audio-slider" min="0" max="${duration || 30}" step="0.1" value="${currentTime}" />
                <span class="audio-time-label" id="time-duration-display">${formatTime(duration)}</span>
              </div>
            </div>
          </div>

          ${isExpert && !p.isAI ? `
            <div style="background:rgba(255,215,0,0.1); border:1px solid var(--accent-gold); padding:8px 16px; border-radius:12px; display:flex; align-items:center; gap:10px;">
              <span style="font-size:1.1rem;">🎯</span>
              <label style="font-size:0.8rem; font-weight:800; color:var(--accent-gold);">Exaktes Jahr (+2 Tokens):</label>
              <input type="number" id="expert-year-input" class="form-input" placeholder="z.B. 1985" style="width:90px; text-align:center; font-weight:900; font-size:0.95rem; padding:6px;" value="${exactYearInput}" />
            </div>
          ` : ''}

          <div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center;">
            ${p.tokens > 0 && !isCoop && !p.isAI ? `
              <button class="btn-secondary" id="skip-song-btn" style="font-size:0.8rem; padding:6px 14px;">
                ⏭ ${getTranslation('useTokenSkip')} (1 Token)
              </button>
            ` : ''}
            ${p.tokens >= 3 && !isCoop && !p.isAI ? `
              <button class="btn-secondary" id="buy-card-btn" style="font-size:0.8rem; border-color:var(--accent-gold); color:var(--accent-gold); padding:6px 14px;">
                🎁 ${getTranslation('useTokenBuy')} (3 Tokens)
              </button>
            ` : ''}
          </div>
        </div>

        <!-- SECTION 3: UNTEN (TIMELINE BOARD) -->
        <div class="timeline-section-container">
          <div style="display:flex; align-items:center; justify-content:between; margin-bottom:6px; padding:0 6px;">
            <h3 style="font-family:var(--font-heading); font-size:0.95rem; font-weight:800; color:var(--accent-cyan); display:flex; align-items:center; gap:6px;">
              ⏱️ Euer Zeitstrahl (${p.timeline.length} Karten)
            </h3>
            <span style="font-size:0.75rem; color:var(--text-muted); margin-left:auto;">
              🖐️ Drag & Drop ODER Klicke auf <strong style="color:var(--accent-cyan);">➕ Hier</strong>
            </span>
          </div>

          <div class="timeline-container" id="timeline-container-el">
            <div class="timeline-track">
              <!-- First slot -->
              <button class="timeline-slot-btn" data-slot="0">
                ${getIcon('plus', 22)}
                <span>Hier</span>
              </button>

              ${p.timeline.map((card, idx) => `
                <div class="timeline-card" id="timeline-card-${idx}">
                  <div class="card-year">${isPro ? '????' : card.year}</div>
                  <div class="card-artist">${card.artist}</div>
                  <div class="card-title">"${card.title}"</div>
                </div>

                <button class="timeline-slot-btn" data-slot="${idx + 1}">
                  ${getIcon('plus', 22)}
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

    const toggleAnimBtn = container.querySelector('#toggle-animations-btn');
    if (toggleAnimBtn) {
      toggleAnimBtn.addEventListener('click', () => {
        areAnimationsEnabled = !areAnimationsEnabled;
        if (areAnimationsEnabled) {
          document.body.classList.remove('reduce-animations');
        } else {
          document.body.classList.add('reduce-animations');
        }
        updateUI();
      });
    }

    const playBtn = container.querySelector('#toggle-audio-btn');
    playBtn.addEventListener('click', async () => {
      if (audioEngine.isPlaying) {
        audioEngine.pause();
      } else {
        await audioEngine.playTrack(currentCard);
      }
    });

    const seekSlider = container.querySelector('#audio-seek-slider');
    if (seekSlider) {
      seekSlider.addEventListener('input', (e) => {
        const targetSecs = parseFloat(e.target.value);
        audioEngine.seek(targetSecs);
      });
    }

    const volumeSlider = container.querySelector('#volume-slider');
    if (volumeSlider) {
      volumeSlider.addEventListener('input', (e) => {
        audioVolume = parseFloat(e.target.value);
        audioEngine.setVolume(audioVolume);
      });
    }

    const muteBtn = container.querySelector('#mute-toggle-btn');
    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        if (audioVolume > 0) {
          audioVolume = 0;
        } else {
          audioVolume = 0.8;
        }
        audioEngine.setVolume(audioVolume);
      });
    }

    if (isExpert && !p.isAI) {
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
          checkWinOrLossCondition();
          drawNextCard();
          updateUI();
        }
      });
    }

    // POINTER EVENTS & TOUCH DRAG ENGINE
    const dragCard = container.querySelector('#draggable-music-card');
    const slotBtns = container.querySelectorAll('.timeline-slot-btn');

    if (dragCard && !p.isAI) {
      let isPointerDragging = false;
      let startX = 0;
      let startY = 0;
      let hoveredSlot = null;

      const onPointerDown = (e) => {
        if (e.target.closest('button') || e.target.closest('input')) return;

        isPointerDragging = true;
        startX = e.clientX;
        startY = e.clientY;

        dragCard.classList.add('pointer-dragging');
        dragCard.style.transition = 'none';
        slotBtns.forEach(slot => slot.classList.add('drag-target-highlight'));

        try {
          dragCard.setPointerCapture(e.pointerId);
        } catch (err) {}
      };

      const onPointerMove = (e) => {
        if (!isPointerDragging) return;

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        dragCard.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(0.92) rotate(${deltaX * 0.03}deg)`;

        const elemBelow = document.elementFromPoint(e.clientX, e.clientY);
        const slotBelow = elemBelow ? elemBelow.closest('.timeline-slot-btn') : null;

        if (hoveredSlot && hoveredSlot !== slotBelow) {
          hoveredSlot.classList.remove('drag-over');
        }

        if (slotBelow) {
          slotBelow.classList.add('drag-over');
          hoveredSlot = slotBelow;
        } else {
          hoveredSlot = null;
        }
      };

      const onPointerUp = (e) => {
        if (!isPointerDragging) return;
        isPointerDragging = false;

        try {
          dragCard.releasePointerCapture(e.pointerId);
        } catch (err) {}

        dragCard.classList.remove('pointer-dragging');
        slotBtns.forEach(slot => {
          slot.classList.remove('drag-target-highlight');
          slot.classList.remove('drag-over');
        });

        if (hoveredSlot) {
          const slotIdx = parseInt(hoveredSlot.getAttribute('data-slot'));
          hoveredSlot = null;
          confirmAndRevealPlacement(slotIdx);
        } else {
          dragCard.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
          dragCard.style.transform = 'translate3d(0, 0, 0) scale(1) rotate(0deg)';
        }
      };

      dragCard.addEventListener('pointerdown', onPointerDown);
      dragCard.addEventListener('pointermove', onPointerMove);
      dragCard.addEventListener('pointerup', onPointerUp);
      dragCard.addEventListener('pointercancel', onPointerUp);
    }

    slotBtns.forEach(slot => {
      slot.addEventListener('click', () => {
        const slotIdx = parseInt(slot.getAttribute('data-slot'));
        confirmAndRevealPlacement(slotIdx);
      });
    });

    handleAiTurnIfNecessary();
  };

  const confirmAndRevealPlacement = (slotIdx) => {
    if (soloTimerInterval) clearInterval(soloTimerInterval);
    audioEngine.pause();
    isPlayingAudio = false;

    const p = activePlayer();
    const timeline = p.timeline;

    if (slotIdx === -1) {
      p.streak = 0;
      triggerCinematicRevealSequence(false, false, "Zeit abgelaufen!");
      return;
    }

    const prevYear = slotIdx > 0 ? timeline[slotIdx - 1].year : -Infinity;
    const nextYear = slotIdx < timeline.length ? timeline[slotIdx].year : Infinity;

    const isCorrectPlacement = currentCard.year >= prevYear && currentCard.year <= nextYear;
    let exactYearHit = false;

    if (mode === 'expert' && exactYearInput) {
      exactYearHit = parseInt(exactYearInput) === currentCard.year;
    }

    if (isCorrectPlacement) {
      p.streak += 1;
      timeline.splice(slotIdx, 0, currentCard);
      if (exactYearHit) {
        p.tokens = Math.min(p.tokens + 2, 5);
      } else {
        p.tokens = Math.min(p.tokens + 1, 5);
      }
    } else {
      p.streak = 0;
      if (mode === 'coop') {
        teamLives -= 1;
      } else if (mode === 'pro') {
        p.tokens = Math.max(p.tokens - 1, 0);
      }
    }

    triggerCinematicRevealSequence(isCorrectPlacement, exactYearHit);
  };

  const triggerCinematicRevealSequence = (isCorrect, exactYearHit = false, customMsg = null) => {
    const p = activePlayer();
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    overlay.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;">
        <div style="font-family:var(--font-heading); font-size:1.4rem; font-weight:800; color:var(--text-muted); text-transform:uppercase; letter-spacing:2px; margin-bottom:10px;">
          Enthüllung...
        </div>
        <div class="reveal-countdown-number" id="countdown-num-el">3</div>
      </div>
    `;

    document.body.appendChild(overlay);
    playBeepSound(440, 150);

    let count = 3;
    const countdownInterval = setInterval(() => {
      count -= 1;
      const numEl = overlay.querySelector('#countdown-num-el');
      if (count > 0) {
        if (numEl) {
          numEl.innerHTML = count.toString();
          numEl.style.animation = 'none';
          void numEl.offsetWidth;
          numEl.style.animation = 'countdown-bounce-scale 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        }
        playBeepSound(440 + (3 - count) * 100, 150);
      } else {
        clearInterval(countdownInterval);
        playBeepSound(880, 250);
        showFlippedCardModal(overlay, isCorrect, exactYearHit, customMsg);
      }
    }, 650);
  };

  const showFlippedCardModal = (overlay, isCorrect, exactYearHit, customMsg) => {
    const p = activePlayer();
    const randomReaction = MICRO_REACTIONS[Math.floor(Math.random() * MICRO_REACTIONS.length)];

    let headerTitle = isCorrect ? `${randomReaction} Deine Timeline wächst.` : 'FALSCH! 💔 Die Karte wandert ab.';
    if (exactYearHit) {
      headerTitle = "🎯 PERFEKT! Exaktes Jahr erraten (+2 Tokens)!";
    } else if (customMsg) {
      headerTitle = customMsg;
    }

    overlay.innerHTML = `
      <div class="modal-content" style="background:none; border:none; box-shadow:none; max-width:440px;">
        <div class="flip-card-container">
          <div class="flip-card-inner" id="flip-card-inner-el">
            <!-- Front of Card -->
            <div class="flip-card-front">
              <span style="font-size:3.5rem; animation:pulse-glow 2s infinite alternate;">🎵</span>
              <h2 style="font-family:var(--font-heading); font-size:1.6rem; font-weight:900; color:#fff; margin-top:12px;">
                Hitster Musik-Karte
              </h2>
              <p style="font-size:0.85rem; color:var(--accent-cyan); font-weight:700;">
                Auflösung...
              </p>
            </div>

            <!-- Back of Card (Flipped Result) -->
            <div class="flip-card-back ${isCorrect ? 'correct-glow-pulse' : ''}" id="flip-card-back-el">
              <div style="font-size:2.5rem; margin-bottom:-4px;">
                ${exactYearHit ? '⭐' : (isCorrect ? '🎉' : '❌')}
              </div>

              <h3 style="font-family:var(--font-heading); font-size:1.2rem; font-weight:900; color:${isCorrect ? '#22c55e' : 'var(--accent-red)'};">
                ${headerTitle}
              </h3>

              <div class="revealed-year">${currentCard.year}</div>
              <div class="revealed-artist">${currentCard.artist}</div>
              <div class="revealed-title">"${currentCard.title}"</div>

              ${generateSpotifyQRCode(currentCard.spotifyUrl, currentCard.title)}

              <a href="${currentCard.spotifyUrl}" target="_blank" class="btn-secondary" style="margin-top:8px; font-size:0.8rem; padding:6px 14px;">
                🟢 ${getTranslation('openInSpotify')}
              </a>

              <button class="btn-primary" id="next-turn-btn" style="width:100%; margin-top:12px; padding:12px;">
                ${p.isAI ? 'KI-Zug beendet (Weiter →)' : 'Nächster Zug →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    const flipInner = overlay.querySelector('#flip-card-inner-el');

    setTimeout(() => {
      if (flipInner) flipInner.classList.add('flipped');

      if (isCorrect) {
        playVictorySound();
        if (window.confetti && areAnimationsEnabled) {
          window.confetti({ particleCount: exactYearHit ? 220 : 120, spread: 90, origin: { y: 0.55 } });
        }
      } else {
        playErrorSound();
        if (flipInner) {
          flipInner.classList.add('shake-error');
        }
      }
    }, 150);

    let autoNextTimeout = null;
    if (p.isAI) {
      autoNextTimeout = setTimeout(() => {
        proceedToNextTurnWithAnimation(overlay, isCorrect);
      }, 2800);
    }

    overlay.querySelector('#next-turn-btn').addEventListener('click', () => {
      if (autoNextTimeout) clearTimeout(autoNextTimeout);
      proceedToNextTurnWithAnimation(overlay, isCorrect);
    });
  };

  const proceedToNextTurnWithAnimation = (overlay, isCorrect) => {
    const flipInner = overlay.querySelector('#flip-card-inner-el');

    if (!isCorrect && flipInner && areAnimationsEnabled) {
      flipInner.classList.add('discard-fly-out');
      setTimeout(() => {
        overlay.remove();
        finishTurn();
      }, 700);
    } else {
      overlay.remove();
      finishTurn();
    }
  };

  const finishTurn = () => {
    if (checkWinOrLossCondition()) return;

    if (mode !== 'coop') {
      activePlayerIndex = (activePlayerIndex + 1) % players.length;
    }
    drawNextCard();
    updateUI();
  };

  const checkWinOrLossCondition = () => {
    if (mode === 'coop' && teamLives <= 0) {
      showGameOverModal("Keine Leben mehr! Team-Spiel verloren.");
      return true;
    }

    const winner = players.find(p => p.timeline.length >= 10);
    if (winner) {
      saveGameResult(winner.name, winner.timeline.length);
      showPodiumVictoryModal(winner);
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

  // SIEGESBILDSCHIRM MIT PLATZIERUNGEN (PODIUM RANKINGS)
  const showPodiumVictoryModal = (winner) => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    if (window.confetti && areAnimationsEnabled) {
      window.confetti({ particleCount: 250, spread: 110, origin: { y: 0.5 } });
    }

    const sortedPlayers = [...players].sort((a, b) => b.timeline.length - a.timeline.length);

    overlay.innerHTML = `
      <div class="modal-content" style="text-align:center; max-width:540px;">
        <span style="font-size:3.5rem;">🏆</span>
        <h1 style="font-family:var(--font-heading); font-size:2.4rem; font-weight:900; color:var(--accent-gold); margin-top:4px;">
          ${winner.isAI ? `${winner.aiIcon || '🤖'} ${winner.name} GEWINNT!` : (mode === 'coop' ? 'TEAM GEWINNT!' : `${winner.name} GEWINNT!`)}
        </h1>
        <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:16px;">
          10 Karten erfolgreich im Zeitstrahl platziert! (${mode.toUpperCase()} MODE)
        </p>

        <!-- PLATZIERUNGEN PODIUM -->
        <div style="background:rgba(0,0,0,0.3); border:1px solid var(--border-color); border-radius:18px; padding:16px; margin-bottom:20px;">
          <h3 style="font-family:var(--font-heading); font-size:1.1rem; font-weight:800; color:var(--accent-cyan); margin-bottom:12px;">
            🥇 Endergebnis & Platzierungen
          </h3>

          <div style="display:flex; flex-direction:column; gap:10px;">
            ${sortedPlayers.map((p, idx) => `
              <div style="display:flex; align-items:center; justify-content:between; background:${idx === 0 ? 'rgba(255,215,0,0.15)' : 'rgba(255,255,255,0.05)'}; border:1px solid ${idx === 0 ? 'var(--accent-gold)' : 'var(--border-color)'}; padding:10px 14px; border-radius:14px;">
                <div style="display:flex; align-items:center; gap:10px;">
                  <div style="font-family:var(--font-heading); font-size:1.4rem; font-weight:900; color:${idx === 0 ? 'var(--accent-gold)' : idx === 1 ? '#cbd5e1' : '#b45309'};">
                    ${idx === 0 ? '🥇 1.' : idx === 1 ? '🥈 2.' : idx === 2 ? '🥉 3.' : `${idx + 1}.`}
                  </div>
                  <div style="text-align:left;">
                    <div style="font-weight:800; color:#fff; font-size:0.95rem;">${p.name}</div>
                    <div style="font-size:0.75rem; color:var(--text-muted);">Max Streak: ${p.streak || 0}x</div>
                  </div>
                </div>

                <div style="font-family:var(--font-heading); font-weight:900; font-size:1.1rem; color:var(--accent-gold);">
                  ${p.timeline.length} Karten
                </div>
              </div>
            `).join('')}
          </div>
        </div>

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

  audioEngine.subscribe(({ isPlaying, volume, currentTime: curT, duration: durT }) => {
    isPlayingAudio = isPlaying;
    currentTime = curT;
    duration = durT;
    audioVolume = volume;

    const playBtn = container.querySelector('#toggle-audio-btn');
    const vinyl = container.querySelector('.vinyl-disc');
    const waveform = container.querySelector('.playing-waveform');
    const timeCurDisplay = container.querySelector('#time-current-display');
    const timeDurDisplay = container.querySelector('#time-duration-display');
    const seekSlider = container.querySelector('#audio-seek-slider');

    if (playBtn) playBtn.innerHTML = isPlaying ? getIcon('pause', 28) : getIcon('play', 28);
    if (vinyl) {
      if (isPlaying) vinyl.classList.add('spinning');
      else vinyl.classList.remove('spinning');
    }
    if (waveform) {
      waveform.style.visibility = isPlaying ? 'visible' : 'hidden';
    }
    if (timeCurDisplay) timeCurDisplay.innerHTML = formatTime(curT);
    if (timeDurDisplay) timeDurDisplay.innerHTML = formatTime(durT);
    if (seekSlider && !seekSlider.matches(':active')) {
      seekSlider.value = curT;
      seekSlider.max = durT || 30;
    }
  });

  updateUI();
}
