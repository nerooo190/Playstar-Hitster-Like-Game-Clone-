// Pass & Play Local Game Setup Screen with Dynamic Game Mode Explanations, Segmented Mensch | KI Control, Difficulty & Custom Team Symbol/Color Picker

import { getTranslation } from '../data/i18n.js';

export const MODE_EXPLANATIONS = {
  classic: "💡 Klassisch: Ordne den Song nur relativ zu deiner Timeline ein.",
  pro: "⚡ Profi: Keine Hinweise auf Jahrzehnt oder Genre.",
  expert: "🎯 Experte: Nenne zusätzlich das genaue Erscheinungsjahr (+2 Bonus-Chips).",
  coop: "🤝 Kooperativ: Alle Spieler bauen gemeinsam eine Timeline gegen die Uhr.",
  solo: "⏱️ Solo-Challenge: Erreiche mit möglichst wenigen Fehlern zehn Karten."
};

export function renderSetupScreen(container, onConfirmSetup, onBack) {
  let playerCount = 2;
  let selectedMode = 'classic';
  let selectedCategory = 'all';

  const TEAM_COLORS = ['#ff2b55', '#00e5ff', '#ffd700', '#a855f7', '#22c55e', '#f97316', '#ec4899', '#3b82f6'];
  const TEAM_ICONS = ['🦁', '⚡', '👑', '🎸', '🚀', '🎧', '🏆', '💎', '🐉', '🤖'];

  let players = [
    { name: 'Spieler 1', isAI: false, aiDifficulty: 'medium', color: TEAM_COLORS[0], icon: '👤' },
    { name: 'Spieler 2 / KI-Bot', isAI: false, aiDifficulty: 'medium', color: TEAM_COLORS[1], icon: '🤖' }
  ];

  const categories = [
    { id: 'all', name: '🎲 Gemischt / Random (Alle Songs & Genres)' },
    { id: 'lionking', name: '🦁 König der Löwen (The Lion King Complete)' },
    { id: 'soundtracks', name: '🎬 Film-Soundtracks & Movie Themes' },
    { id: 'eminem', name: '🎙️ Eminem Complete (1996 - 2024)' },
    { id: 'queen', name: '👑 Queen & Freddie Mercury' },
    { id: 'oldies', name: '📻 Oldies & Classics (1900 - 1979)' },
    { id: 'modern', name: '⚡ Nur Modern (2010 - 2026)' },
    { id: 'pop', name: '🕺 Pop Hits' },
    { id: 'rap', name: '🎤 Rap & Hip-Hop' },
    { id: 'features', name: '🤝 Features & Duette' },
    { id: 'live', name: '🎤 Live Songs, Demos & B-Seiten' }
  ];

  const updateUI = () => {
    container.innerHTML = `
      <div class="setup-container">
        <button class="btn-secondary" id="back-to-menu-btn" style="margin-bottom:16px;">
          ← ${getTranslation('backToMenu')}
        </button>

        <h2 class="setup-title">${getTranslation('localMultiplayer')}</h2>

        <!-- Custom Hitster Category Theme Selector -->
        <div class="form-group">
          <label class="form-label" style="color:var(--accent-gold); font-weight:800;">
            🎵 Custom Hitster Kategorie / Theme
          </label>
          <select id="category-select" class="form-select" style="border:2px solid var(--accent-gold); font-weight:700;">
            ${categories.map(cat => `
              <option value="${cat.id}" ${cat.id === selectedCategory ? 'selected' : ''}>
                ${cat.name}
              </option>
            `).join('')}
          </select>
        </div>

        <!-- Game Mode Selector & Dynamic Explanation Box -->
        <div class="form-group">
          <label class="form-label">${getTranslation('gameModes')}</label>
          <select id="game-mode-select" class="form-select">
            <option value="classic" ${selectedMode === 'classic' ? 'selected' : ''}>${getTranslation('modeClassic')}</option>
            <option value="pro" ${selectedMode === 'pro' ? 'selected' : ''}>${getTranslation('modePro')}</option>
            <option value="expert" ${selectedMode === 'expert' ? 'selected' : ''}>${getTranslation('modeExpert')}</option>
            <option value="coop" ${selectedMode === 'coop' ? 'selected' : ''}>${getTranslation('modeCoop')}</option>
            <option value="solo" ${selectedMode === 'solo' ? 'selected' : ''}>${getTranslation('modeSolo')}</option>
          </select>
          
          <!-- DYNAMISCHE MODUS-ERKLÄRUNG -->
          <div id="mode-explanation-box" style="margin-top:8px; padding:10px 14px; background:rgba(0,229,255,0.08); border:1px solid var(--accent-cyan); border-radius:12px; font-size:0.85rem; color:var(--accent-cyan); font-weight:700; line-height:1.4;">
            ${MODE_EXPLANATIONS[selectedMode] || MODE_EXPLANATIONS['classic']}
          </div>
        </div>

        <!-- Player Count -->
        <div class="form-group">
          <label class="form-label">${getTranslation('playersCount')}</label>
          <select id="player-count-select" class="form-select">
            ${[1, 2, 3, 4, 5, 6, 7, 8].map(num => `
              <option value="${num}" ${num === playerCount ? 'selected' : ''}>
                ${num} ${num === 1 ? 'Spieler (Solo)' : 'Spieler / Teams / Bots'}
              </option>
            `).join('')}
          </select>
        </div>

        <!-- Player Setup List -->
        <div class="form-group">
          <label class="form-label">Spieler & KI-Gegner Konfiguration</label>
          <div class="player-input-list">
            ${Array.from({ length: playerCount }).map((_, idx) => {
              const p = players[idx] || { name: `Spieler ${idx + 1}`, isAI: false, aiDifficulty: 'medium', color: TEAM_COLORS[idx % TEAM_COLORS.length], icon: '👤' };
              return `
                <div class="player-row" style="background:rgba(0,0,0,0.25); border:1px solid var(--border-color); padding:14px; border-radius:16px; flex-direction:column; align-items:stretch; gap:10px;">
                  
                  <div style="display:flex; align-items:center; justify-content:between; flex-wrap:wrap; gap:10px;">
                    <!-- Avatar Preview with Color -->
                    <div style="display:flex; align-items:center; gap:10px;">
                      <div class="player-avatar-preview" style="background:${p.color || TEAM_COLORS[idx % TEAM_COLORS.length]}; width:44px; height:44px; font-size:1.3rem; box-shadow:0 0 10px ${p.color};">
                        ${p.icon || (p.isAI ? '🤖' : (idx + 1))}
                      </div>
                      <span style="font-family:var(--font-heading); font-weight:800; color:#fff; font-size:1.1rem;">
                        Spieler / Team ${idx + 1}
                      </span>
                    </div>

                    <!-- EINDEUTIGE SEGMENTED CONTROL AUSWAHL: MENSCH | KI -->
                    <div class="segmented-control">
                      <button class="segmented-btn select-human-btn ${!p.isAI ? 'active-human' : ''}" data-index="${idx}">
                        👤 Mensch
                      </button>
                      <button class="segmented-btn select-ai-btn ${p.isAI ? 'active-ai' : ''}" data-index="${idx}">
                        🤖 KI-Bot
                      </button>
                    </div>
                  </div>

                  <div style="display:flex; gap:10px; flex-wrap:wrap;">
                    <!-- Name Input -->
                    <input type="text" class="form-input player-name-field" data-index="${idx}" value="${p.name}" placeholder="Name / Teamname" style="flex:2; min-width:180px;" />

                    <!-- Symbol Selector -->
                    <select class="form-select icon-select" data-index="${idx}" style="flex:1; min-width:110px;">
                      ${TEAM_ICONS.map(ic => `
                        <option value="${ic}" ${p.icon === ic ? 'selected' : ''}>${ic} Symbol</option>
                      `).join('')}
                    </select>

                    <!-- Color Selector -->
                    <select class="form-select color-select" data-index="${idx}" style="flex:1; min-width:110px;">
                      ${TEAM_COLORS.map(c => `
                        <option value="${c}" ${p.color === c ? 'selected' : ''}>🎨 Farbe (${c})</option>
                      `).join('')}
                    </select>
                  </div>

                  <!-- KI Schwierigkeitsgrad -->
                  ${p.isAI ? `
                    <div style="background:rgba(0,229,255,0.08); border:1px solid var(--accent-cyan); padding:10px; border-radius:12px; display:flex; align-items:center; justify-content:between; gap:10px; margin-top:4px;">
                      <label style="font-size:0.85rem; font-weight:800; color:var(--accent-cyan);">🤖 KI-Schwierigkeitsgrad:</label>
                      <select class="form-select ai-diff-select" data-index="${idx}" style="width:auto; padding:6px 12px; font-size:0.85rem; border-color:var(--accent-cyan);">
                        <option value="easy" ${p.aiDifficulty === 'easy' ? 'selected' : ''}>Leicht (40% Genauigkeit)</option>
                        <option value="medium" ${p.aiDifficulty === 'medium' ? 'selected' : ''}>Normal (75% Genauigkeit)</option>
                        <option value="hard" ${p.aiDifficulty === 'hard' ? 'selected' : ''}>Schwer (92% Genauigkeit)</option>
                        <option value="impossible" ${p.aiDifficulty === 'impossible' ? 'selected' : ''}>Unmöglich (99% Maestro)</option>
                      </select>
                    </div>
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <button class="btn-primary" id="start-game-btn" style="width:100%; padding:16px; margin-top:12px;">
          🚀 Spiel starten
        </button>
      </div>
    `;

    // Handlers
    container.querySelector('#back-to-menu-btn').addEventListener('click', onBack);

    container.querySelector('#category-select').addEventListener('change', (e) => {
      selectedCategory = e.target.value;
    });

    const modeSelect = container.querySelector('#game-mode-select');
    const explanationBox = container.querySelector('#mode-explanation-box');

    modeSelect.addEventListener('change', (e) => {
      selectedMode = e.target.value;
      if (explanationBox) {
        explanationBox.innerHTML = MODE_EXPLANATIONS[selectedMode] || MODE_EXPLANATIONS['classic'];
      }
    });

    container.querySelector('#player-count-select').addEventListener('change', (e) => {
      playerCount = parseInt(e.target.value);
      while (players.length < playerCount) {
        players.push({
          name: `Spieler ${players.length + 1}`,
          isAI: false,
          aiDifficulty: 'medium',
          color: TEAM_COLORS[players.length % TEAM_COLORS.length],
          icon: '👤'
        });
      }
      updateUI();
    });

    container.querySelectorAll('.player-name-field').forEach(input => {
      input.addEventListener('input', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'));
        if (players[idx]) players[idx].name = e.target.value;
      });
    });

    container.querySelectorAll('.select-human-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-index'));
        if (players[idx]) {
          players[idx].isAI = false;
          if (players[idx].name.includes('KI-Bot')) {
            players[idx].name = `Spieler ${idx + 1}`;
          }
          updateUI();
        }
      });
    });

    container.querySelectorAll('.select-ai-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-index'));
        if (players[idx]) {
          players[idx].isAI = true;
          if (!players[idx].name.includes('KI')) {
            players[idx].name = `KI-Bot ${idx + 1}`;
          }
          updateUI();
        }
      });
    });

    container.querySelectorAll('.ai-diff-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'));
        if (players[idx]) players[idx].aiDifficulty = e.target.value;
      });
    });

    container.querySelectorAll('.icon-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'));
        if (players[idx]) {
          players[idx].icon = e.target.value;
          updateUI();
        }
      });
    });

    container.querySelectorAll('.color-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'));
        if (players[idx]) {
          players[idx].color = e.target.value;
          updateUI();
        }
      });
    });

    container.querySelector('#start-game-btn').addEventListener('click', () => {
      onConfirmSetup({
        mode: selectedMode,
        category: selectedCategory,
        players: players.slice(0, playerCount)
      });
    });
  };

  updateUI();
}
