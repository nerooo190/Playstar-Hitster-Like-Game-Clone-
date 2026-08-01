// Main Menu Component for Hitster

import { LANGUAGES, getTranslation, setLanguage, getCurrentLanguage } from '../data/i18n.js';
import { renderRulesModal } from './RulesModal.js';
import { renderColorPickerModal } from './ColorPickerModal.js';
import { renderHighscoresModal } from './HighscoresModal.js';
import { renderOnlineLobbyModal } from './OnlineLobbyModal.js';

export function renderMainMenu(container, onStartLocalGame, onStartOnlineGame) {
  container.innerHTML = `
    <!-- Top Navbar -->
    <header class="navbar">
      <div class="logo-brand">
        <div class="logo-icon">H</div>
        <div class="logo-text">${getTranslation('appTitle')}</div>
      </div>

      <div class="nav-actions">
        <!-- Language Switcher -->
        <select id="lang-select" class="form-select" style="width:auto; padding:6px 12px; font-size:0.85rem;">
          ${LANGUAGES.map(l => `
            <option value="${l.code}" ${l.code === getCurrentLanguage() ? 'selected' : ''}>
              ${l.flag} ${l.name}
            </option>
          `).join('')}
        </select>

        <!-- Color Customizer -->
        <button class="btn-icon" id="open-color-btn" title="${getTranslation('colorCustomizer')}">
          🎨
        </button>

        <!-- Highscores -->
        <button class="btn-icon" id="open-stats-btn" title="${getTranslation('highscores')}">
          🏆
        </button>

        <!-- Rules -->
        <button class="btn-icon" id="open-rules-btn" title="${getTranslation('rules')}">
          ❓
        </button>
      </div>
    </header>

    <!-- Main Hero Screen -->
    <main class="main-menu">
      <div class="hero-title-container">
        <div class="hero-badge">1900 – 2026 EDITION</div>
        <h1 class="hero-title">${getTranslation('appTitle')}</h1>
        <p class="hero-subtitle">${getTranslation('appSubtitle')}</p>
      </div>

      <!-- Spinning Vinyl Disc Graphic -->
      <div class="vinyl-disc"></div>

      <!-- Action Grid -->
      <div class="menu-options-grid">
        <div class="menu-card-btn" id="menu-local-play">
          <span class="menu-card-icon">👥</span>
          <div class="menu-card-title">${getTranslation('localMultiplayer')}</div>
          <div class="menu-card-desc">1 – 8 Spieler auf 1 Gerät (Pass & Play)</div>
        </div>

        <div class="menu-card-btn" id="menu-online-play">
          <span class="menu-card-icon">🌐</span>
          <div class="menu-card-title">${getTranslation('onlineMultiplayer')}</div>
          <div class="menu-card-desc">Mit Raumcode zusammen online spielen</div>
        </div>

        <div class="menu-card-btn" id="menu-rules">
          <span class="menu-card-icon">📖</span>
          <div class="menu-card-title">${getTranslation('rules')}</div>
          <div class="menu-card-desc">Anleitung, Hitster Chips & Spielmodi</div>
        </div>

        <div class="menu-card-btn" id="menu-customizer">
          <span class="menu-card-icon">🎨</span>
          <div class="menu-card-title">${getTranslation('colorCustomizer')}</div>
          <div class="menu-card-desc">180 Millionen Farben anpassen</div>
        </div>
      </div>
    </main>
  `;

  // Event Listeners
  const langSelect = container.querySelector('#lang-select');
  langSelect.addEventListener('change', (e) => {
    setLanguage(e.target.value);
    renderMainMenu(container, onStartLocalGame, onStartOnlineGame);
  });

  container.querySelector('#open-color-btn').addEventListener('click', () => renderColorPickerModal());
  container.querySelector('#menu-customizer').addEventListener('click', () => renderColorPickerModal());
  
  container.querySelector('#open-stats-btn').addEventListener('click', () => renderHighscoresModal());
  
  container.querySelector('#open-rules-btn').addEventListener('click', () => renderRulesModal());
  container.querySelector('#menu-rules').addEventListener('click', () => renderRulesModal());

  container.querySelector('#menu-local-play').addEventListener('click', () => {
    if (onStartLocalGame) onStartLocalGame();
  });

  container.querySelector('#menu-online-play').addEventListener('click', () => {
    renderOnlineLobbyModal((players) => {
      if (onStartOnlineGame) onStartOnlineGame(players);
    });
  });
}
