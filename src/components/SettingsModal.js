// Dedicated Settings Modal Component with Categorized Tabs (Audio, Graphics, Gameplay & System)

import { getTranslation, LANGUAGES, getCurrentLanguage, setLanguage } from '../data/i18n.js';
import { getIcon } from '../utils/icons.js';
import { audioEngine } from '../utils/audioPlayer.js';

export function renderSettingsModal(onClose) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  let currentTab = 'audio'; // 'audio', 'graphics', 'gameplay', 'system'
  let masterVolume = Math.round(audioEngine.volume * 100);
  let isSoundFxEnabled = localStorage.getItem('hitster_sfx_enabled') !== 'false';
  let isAmbientBgEnabled = localStorage.getItem('hitster_ambient_bg') !== 'false';
  let isReducedAnim = document.body.classList.contains('reduce-animations');

  const renderContent = () => {
    overlay.innerHTML = `
      <div class="modal-content settings-modal-large" style="max-width:680px; width:92%;">
        <button class="modal-close-btn" id="close-settings-btn">✕</button>

        <!-- Modal Header -->
        <div style="text-align:center; padding-bottom:14px; border-bottom:1px solid var(--border-color); margin-bottom:16px;">
          <div style="display:inline-flex; align-items:center; justify-content:center; width:50px; height:50px; border-radius:50%; background:rgba(0,229,255,0.15); border:1px solid var(--accent-cyan); color:var(--accent-cyan); margin-bottom:8px;">
            ${getIcon('settings', 26)}
          </div>
          <h2 style="font-family:var(--font-heading); font-size:1.8rem; font-weight:900; background:linear-gradient(90deg, #fff, var(--accent-cyan)); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">
            Einstellungen & Optionen
          </h2>
          <p style="color:var(--text-muted); font-size:0.85rem; margin-top:2px;">
            Passe Audio, Effekte, Steuerung und Performance nach deinen Wünschen an
          </p>
        </div>

        <!-- Categorized Navigation Tabs -->
        <div class="settings-tabs-header" style="display:flex; gap:8px; background:rgba(0,0,0,0.3); padding:4px; border-radius:14px; border:1px solid var(--border-color); margin-bottom:20px; overflow-x:auto;">
          <button class="settings-tab-btn ${currentTab === 'audio' ? 'active' : ''}" data-tab="audio" style="flex:1; padding:10px 14px; border-radius:10px; border:none; background:${currentTab === 'audio' ? 'linear-gradient(135deg, var(--accent-red), #c026d3)' : 'transparent'}; color:#fff; font-family:var(--font-heading); font-weight:800; font-size:0.85rem; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px; white-space:nowrap;">
            ${getIcon('volume2', 16)} Audio & Sound
          </button>

          <button class="settings-tab-btn ${currentTab === 'graphics' ? 'active' : ''}" data-tab="graphics" style="flex:1; padding:10px 14px; border-radius:10px; border:none; background:${currentTab === 'graphics' ? 'linear-gradient(135deg, var(--accent-cyan), #2563eb)' : 'transparent'}; color:#fff; font-family:var(--font-heading); font-weight:800; font-size:0.85rem; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px; white-space:nowrap;">
            ${getIcon('palette', 16)} Grafik & Effekte
          </button>

          <button class="settings-tab-btn ${currentTab === 'gameplay' ? 'active' : ''}" data-tab="gameplay" style="flex:1; padding:10px 14px; border-radius:10px; border:none; background:${currentTab === 'gameplay' ? 'linear-gradient(135deg, var(--accent-gold), #b45309)' : 'transparent'}; color:${currentTab === 'gameplay' ? '#000' : '#fff'}; font-family:var(--font-heading); font-weight:800; font-size:0.85rem; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px; white-space:nowrap;">
            ${getIcon('trophy', 16)} Gameplay
          </button>
        </div>

        <!-- Tab Body Content -->
        <div class="settings-tab-content" style="display:flex; flex-direction:column; gap:16px;">
          ${currentTab === 'audio' ? `
            <!-- AUDIO SETTINGS -->
            <div class="settings-group-card" style="background:rgba(22,32,70,0.6); border:1px solid var(--border-color); padding:16px; border-radius:16px;">
              <div style="display:flex; justify-content:between; align-items:center; margin-bottom:10px;">
                <label class="form-label" style="margin:0; font-size:0.95rem; font-weight:800; color:#fff; display:flex; align-items:center; gap:8px;">
                  ${getIcon('volume2', 18)} Master-Lautstärke
                </label>
                <span style="font-family:var(--font-heading); font-weight:900; color:var(--accent-cyan); font-size:1.1rem;" id="volume-val-label">${masterVolume}%</span>
              </div>
              <input type="range" id="settings-volume-slider" class="volume-slider" min="0" max="100" value="${masterVolume}" style="width:100%; height:8px;" />
            </div>

            <div class="settings-group-card" style="background:rgba(22,32,70,0.6); border:1px solid var(--border-color); padding:16px; border-radius:16px; display:flex; align-items:center; justify-content:between;">
              <div>
                <div style="font-weight:800; color:#fff; font-size:0.95rem;">🔊 Sound-Effekte (Fanfaren & Beeps)</div>
                <div style="font-size:0.78rem; color:var(--text-muted); margin-top:2px;">Spiele Web Audio Töne bei Countdown & Gewinn ab</div>
              </div>
              <button class="btn-secondary" id="toggle-sfx-btn" style="padding:8px 16px; font-weight:800; border-color:${isSoundFxEnabled ? '#22c55e' : 'var(--border-color)'}; color:${isSoundFxEnabled ? '#22c55e' : 'var(--text-muted)'};">
                ${isSoundFxEnabled ? '🟢 AN' : '🔴 AUS'}
              </button>
            </div>
          ` : ''}

          ${currentTab === 'graphics' ? `
            <!-- GRAPHICS & EFFECTS SETTINGS -->
            <div class="settings-group-card" style="background:rgba(22,32,70,0.6); border:1px solid var(--border-color); padding:16px; border-radius:16px; display:flex; align-items:center; justify-content:between;">
              <div>
                <div style="font-weight:800; color:#fff; font-size:0.95rem;">🌊 Dynamischer Ambient-Hintergrund</div>
                <div style="font-size:0.78rem; color:var(--text-muted); margin-top:2px;">Langsam fließende Farbübergänge im Hintergrund</div>
              </div>
              <button class="btn-secondary" id="toggle-ambient-btn" style="padding:8px 16px; font-weight:800; border-color:${isAmbientBgEnabled ? '#22c55e' : 'var(--border-color)'}; color:${isAmbientBgEnabled ? '#22c55e' : 'var(--text-muted)'};">
                ${isAmbientBgEnabled ? '🟢 AN' : '🔴 AUS'}
              </button>
            </div>

            <div class="settings-group-card" style="background:rgba(22,32,70,0.6); border:1px solid var(--border-color); padding:16px; border-radius:16px; display:flex; align-items:center; justify-content:between;">
              <div>
                <div style="font-weight:800; color:#fff; font-size:0.95rem;">✨ Reduzierte Animationen (Performance-Modus)</div>
                <div style="font-size:0.78rem; color:var(--text-muted); margin-top:2px;">Schaltet rechenintensive Effekte für ältere Geräte aus</div>
              </div>
              <button class="btn-secondary" id="toggle-reduced-anim-btn" style="padding:8px 16px; font-weight:800; border-color:${isReducedAnim ? '#22c55e' : 'var(--border-color)'}; color:${isReducedAnim ? '#22c55e' : 'var(--text-muted)'};">
                ${isReducedAnim ? '🟢 AN' : '🔴 AUS'}
              </button>
            </div>
          ` : ''}

          ${currentTab === 'gameplay' ? `
            <!-- GAMEPLAY SETTINGS -->
            <div class="settings-group-card" style="background:rgba(22,32,70,0.6); border:1px solid var(--border-color); padding:16px; border-radius:16px;">
              <label class="form-label" style="font-size:0.95rem; font-weight:800; color:#fff; margin-bottom:8px;">
                🌐 Hauptsprache / Language
              </label>
              <select id="settings-lang-select" class="form-select">
                ${LANGUAGES.map(l => `
                  <option value="${l.code}" ${l.code === getCurrentLanguage() ? 'selected' : ''}>
                    ${l.flag} ${l.name}
                  </option>
                `).join('')}
              </select>
            </div>
          ` : ''}
        </div>

        <!-- Footer Action Bar -->
        <div style="margin-top:20px; padding-top:14px; border-top:1px solid var(--border-color); text-align:center;">
          <button class="btn-primary" id="save-settings-btn" style="min-width:200px; padding:12px 28px;">
            ✅ Speichern & Schließen
          </button>
        </div>
      </div>
    `;

    // Event Bindings
    overlay.querySelector('#close-settings-btn').addEventListener('click', close);
    overlay.querySelector('#save-settings-btn').addEventListener('click', close);

    overlay.querySelectorAll('.settings-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        currentTab = e.currentTarget.getAttribute('data-tab');
        renderContent();
      });
    });

    const volSlider = overlay.querySelector('#settings-volume-slider');
    if (volSlider) {
      volSlider.addEventListener('input', (e) => {
        masterVolume = parseInt(e.target.value);
        audioEngine.setVolume(masterVolume / 100);
        const label = overlay.querySelector('#volume-val-label');
        if (label) label.innerHTML = `${masterVolume}%`;
      });
    }

    const sfxBtn = overlay.querySelector('#toggle-sfx-btn');
    if (sfxBtn) {
      sfxBtn.addEventListener('click', () => {
        isSoundFxEnabled = !isSoundFxEnabled;
        localStorage.setItem('hitster_sfx_enabled', isSoundFxEnabled ? 'true' : 'false');
        renderContent();
      });
    }

    const ambientBtn = overlay.querySelector('#toggle-ambient-btn');
    if (ambientBtn) {
      ambientBtn.addEventListener('click', () => {
        isAmbientBgEnabled = !isAmbientBgEnabled;
        localStorage.setItem('hitster_ambient_bg', isAmbientBgEnabled ? 'true' : 'false');
        renderContent();
      });
    }

    const animBtn = overlay.querySelector('#toggle-reduced-anim-btn');
    if (animBtn) {
      animBtn.addEventListener('click', () => {
        isReducedAnim = !isReducedAnim;
        if (isReducedAnim) {
          document.body.classList.add('reduce-animations');
        } else {
          document.body.classList.remove('reduce-animations');
        }
        renderContent();
      });
    }

    const langSelect = overlay.querySelector('#settings-lang-select');
    if (langSelect) {
      langSelect.addEventListener('change', (e) => {
        setLanguage(e.target.value);
      });
    }
  };

  const close = () => {
    overlay.remove();
    if (onClose) onClose();
  };

  renderContent();
  document.body.appendChild(overlay);
}
