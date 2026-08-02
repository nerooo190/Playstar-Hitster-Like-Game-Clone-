// Main Menu Component for Hitster - Variante B with Unified Lucide SVG Icons System & Dedicated Settings Modal

import { LANGUAGES, getTranslation, setLanguage, getCurrentLanguage } from '../data/i18n.js';
import { getIcon } from '../utils/icons.js';
import { renderRulesModal } from './RulesModal.js';
import { renderColorPickerModal } from './ColorPickerModal.js';
import { renderHighscoresModal } from './HighscoresModal.js';
import { renderOnlineLobbyModal } from './OnlineLobbyModal.js';
import { renderSettingsModal } from './SettingsModal.js';

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

        <button class="btn-icon" id="open-color-btn" title="${getTranslation('colorCustomizer')}">
          ${getIcon('palette', 18)}
        </button>

        <button class="btn-icon" id="open-stats-btn" title="${getTranslation('highscores')}">
          ${getIcon('trophy', 18)}
        </button>

        <button class="btn-icon" id="open-rules-btn" title="${getTranslation('rules')}">
          ${getIcon('helpCircle', 18)}
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

      <!-- VARIANTE B: ZWEI GROSSE HAUPTAKTIONEN -->
      <div class="main-primary-actions-grid">
        <div class="primary-hero-card" id="menu-local-play">
          <div class="primary-hero-icon">${getIcon('users', 44)}</div>
          <div class="primary-hero-title">${getTranslation('localMultiplayer')}</div>
          <div class="primary-hero-desc">1 – 8 Spieler auf 1 Gerät (Pass & Play)</div>
        </div>

        <div class="primary-hero-card online-card" id="menu-online-play">
          <div class="primary-hero-icon">${getIcon('globe', 44)}</div>
          <div class="primary-hero-title">${getTranslation('onlineMultiplayer')}</div>
          <div class="primary-hero-desc">Mit Raumcode & Freunden online spielen</div>
        </div>
      </div>

      <!-- KLEINERE NEBENAKTIONEN -->
      <div class="secondary-actions-grid">
        <div class="secondary-card-btn" id="menu-rules">
          <div class="secondary-card-icon">${getIcon('bookOpen', 22)}</div>
          <div class="secondary-card-text">
            <div class="secondary-card-title">Spielanleitung</div>
            <div class="secondary-card-desc">Regeln & Modi</div>
          </div>
        </div>

        <div class="secondary-card-btn" id="menu-customizer">
          <div class="secondary-card-icon">${getIcon('palette', 22)}</div>
          <div class="secondary-card-text">
            <div class="secondary-card-title">Designs</div>
            <div class="secondary-card-desc">180M Farben</div>
          </div>
        </div>

        <div class="secondary-card-btn" id="menu-stats">
          <div class="secondary-card-icon">${getIcon('barChart', 22)}</div>
          <div class="secondary-card-text">
            <div class="secondary-card-title">Statistiken</div>
            <div class="secondary-card-desc">Highscores</div>
          </div>
        </div>

        <div class="secondary-card-btn" id="menu-settings">
          <div class="secondary-card-icon">${getIcon('settings', 22)}</div>
          <div class="secondary-card-text">
            <div class="secondary-card-title">Einstellungen</div>
            <div class="secondary-card-desc">Optionen & Audio</div>
          </div>
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
  container.querySelector('#menu-stats').addEventListener('click', () => renderHighscoresModal());
  
  container.querySelector('#open-rules-btn').addEventListener('click', () => renderRulesModal());
  container.querySelector('#menu-rules').addEventListener('click', () => renderRulesModal());

  container.querySelector('#menu-settings').addEventListener('click', () => renderSettingsModal());

  container.querySelector('#menu-local-play').addEventListener('click', () => {
    if (onStartLocalGame) onStartLocalGame();
  });

  container.querySelector('#menu-online-play').addEventListener('click', () => {
    renderOnlineLobbyModal((players) => {
      if (onStartOnlineGame) onStartOnlineGame(players);
    });
  });
}
