// Pass & Play Local Game Setup Screen with KI-Gegner (AI Bots)

import { getTranslation } from '../data/i18n.js';

export function renderSetupScreen(container, onConfirmSetup, onBack) {
  let playerCount = 2;
  let selectedMode = 'classic';
  const colors = ['#ff2b55', '#00e5ff', '#ffd700', '#a855f7', '#22c55e', '#f97316', '#ec4899', '#3b82f6'];

  let players = [
    { name: 'Spieler 1', isAI: false, aiDifficulty: 'medium', aiIcon: '👤' },
    { name: 'Spieler 2 / KI Bot', isAI: false, aiDifficulty: 'medium', aiIcon: '🤖' }
  ];

  const updateUI = () => {
    container.innerHTML = `
      <div class="setup-container">
        <button class="btn-secondary" id="back-to-menu-btn" style="margin-bottom:16px;">
          ← ${getTranslation('backToMenu')}
        </button>

        <h2 class="setup-title">${getTranslation('localMultiplayer')}</h2>

        <!-- Game Mode Selector -->
        <div class="form-group">
          <label class="form-label">${getTranslation('gameModes')}</label>
          <select id="game-mode-select" class="form-select">
            <option value="classic" ${selectedMode === 'classic' ? 'selected' : ''}>${getTranslation('modeClassic')}</option>
            <option value="pro" ${selectedMode === 'pro' ? 'selected' : ''}>${getTranslation('modePro')}</option>
            <option value="expert" ${selectedMode === 'expert' ? 'selected' : ''}>${getTranslation('modeExpert')}</option>
            <option value="coop" ${selectedMode === 'coop' ? 'selected' : ''}>${getTranslation('modeCoop')}</option>
            <option value="solo" ${selectedMode === 'solo' ? 'selected' : ''}>${getTranslation('modeSolo')}</option>
          </select>
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
              const p = players[idx] || { name: `Spieler ${idx + 1}`, isAI: false, aiDifficulty: 'medium', aiIcon: '🤖' };
              return `
                <div class="player-row" style="background:rgba(0,0,0,0.2); padding:10px; border-radius:12px; flex-wrap:wrap; gap:8px;">
                  <div class="player-avatar-preview" style="background:${colors[idx % colors.length]}; font-size:1.1rem;">
                    ${p.isAI ? '🤖' : (idx + 1)}
                  </div>
                  
                  <input type="text" class="form-input player-name-field" data-index="${idx}" value="${p.name}" style="flex:1; min-width:140px;" />

                  <!-- KI Toggle Button -->
                  <button class="btn-secondary toggle-ai-btn" data-index="${idx}" style="padding:6px 12px; font-size:0.8rem; ${p.isAI ? 'border-color:var(--accent-cyan); color:var(--accent-cyan);' : ''}">
                    ${p.isAI ? '🤖 KI-Gegner' : '👤 Mensch'}
                  </button>

                  ${p.isAI ? `
                    <select class="form-select ai-diff-select" data-index="${idx}" style="width:auto; padding:6px; font-size:0.8rem;">
                      <option value="easy" ${p.aiDifficulty === 'easy' ? 'selected' : ''}>Einfach (40%)</option>
                      <option value="medium" ${p.aiDifficulty === 'medium' ? 'selected' : ''}>Mittel (75%)</option>
                      <option value="hard" ${p.aiDifficulty === 'hard' ? 'selected' : ''}>Schwer (92%)</option>
                      <option value="impossible" ${p.aiDifficulty === 'impossible' ? 'selected' : ''}>Unmöglich (99%)</option>
                    </select>
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <button class="btn-primary" id="start-game-btn" style="width:100%; padding:16px; margin-top:12px;">
          🚀 ${getTranslation('startRound')}
        </button>
      </div>
    `;

    // Handlers
    container.querySelector('#back-to-menu-btn').addEventListener('click', onBack);

    const modeSelect = container.querySelector('#game-mode-select');
    modeSelect.addEventListener('change', (e) => {
      selectedMode = e.target.value;
    });

    container.querySelector('#player-count-select').addEventListener('change', (e) => {
      playerCount = parseInt(e.target.value);
      while (players.length < playerCount) {
        players.push({ name: `Spieler ${players.length + 1}`, isAI: false, aiDifficulty: 'medium', aiIcon: '🤖' });
      }
      updateUI();
    });

    container.querySelectorAll('.player-name-field').forEach(input => {
      input.addEventListener('input', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'));
        if (players[idx]) players[idx].name = e.target.value;
      });
    });

    container.querySelectorAll('.toggle-ai-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-index'));
        if (players[idx]) {
          players[idx].isAI = !players[idx].isAI;
          if (players[idx].isAI && !players[idx].name.includes('KI')) {
            players[idx].name = `KI Bot ${idx + 1}`;
          }
          updateUI();
        }
      });
    });

    container.querySelectorAll('.ai-diff-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-index'));
        if (players[idx]) {
          players[idx].aiDifficulty = e.target.value;
        }
      });
    });

    container.querySelector('#start-game-btn').addEventListener('click', () => {
      const finalPlayers = Array.from({ length: playerCount }).map((_, idx) => {
        const p = players[idx] || {};
        return {
          id: `p-${idx}`,
          name: p.name || `Spieler ${idx + 1}`,
          color: colors[idx % colors.length],
          timeline: [],
          tokens: 3,
          isAI: p.isAI || false,
          aiDifficulty: p.aiDifficulty || 'medium',
          aiIcon: p.aiIcon || '🤖'
        };
      });

      onConfirmSetup({ mode: selectedMode, players: finalPlayers });
    });
  };

  updateUI();
}
