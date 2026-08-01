// Color Customizer Modal (180M Custom Colors Engine)

import { THEME_PRESETS, applyCustomColors, loadSavedTheme } from '../utils/colorCustomizer.js';
import { getTranslation } from '../data/i18n.js';

export function renderColorPickerModal(onClose) {
  const currentTheme = loadSavedTheme();
  
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  overlay.innerHTML = `
    <div class="modal-content">
      <button class="modal-close-btn" id="close-color-btn">✕</button>

      <div style="text-align:center; margin-bottom:20px;">
        <span style="font-size:2.5rem;">🎨</span>
        <h2 style="font-family:var(--font-heading); font-size:2rem; font-weight:900; background:linear-gradient(90deg, #fff, var(--accent-cyan)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; margin-top:8px;">
          ${getTranslation('colorCustomizer')}
        </h2>
        <p style="color:var(--text-muted); font-size:0.85rem;">Gestalte deine eigene Farbwelt aus über 180.000.000 Farben!</p>
      </div>

      <!-- Presets -->
      <div style="margin-bottom:20px;">
        <label class="form-label">${getTranslation('themePresets')}</label>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <button class="btn-secondary" id="preset-original">${THEME_PRESETS.original.name}</button>
          <button class="btn-secondary" id="preset-cyberpunk">${THEME_PRESETS.cyberpunk.name}</button>
          <button class="btn-secondary" id="preset-midnight">${THEME_PRESETS.midnight.name}</button>
          <button class="btn-secondary" id="preset-emerald">${THEME_PRESETS.emerald.name}</button>
        </div>
      </div>

      <!-- Live Custom Color Pickers -->
      <div class="color-picker-grid">
        <div class="color-picker-item">
          <label class="form-label">${getTranslation('bgPrimary')}</label>
          <input type="color" id="picker-bg" class="color-input-swatch" value="${currentTheme.bgPrimary || '#0a0f24'}" />
        </div>

        <div class="color-picker-item">
          <label class="form-label">${getTranslation('accentColor')}</label>
          <input type="color" id="picker-red" class="color-input-swatch" value="${currentTheme.accentRed || '#ff2b55'}" />
        </div>

        <div class="color-picker-item">
          <label class="form-label">${getTranslation('cyanColor')}</label>
          <input type="color" id="picker-cyan" class="color-input-swatch" value="${currentTheme.accentCyan || '#00e5ff'}" />
        </div>

        <div class="color-picker-item">
          <label class="form-label">${getTranslation('goldColor')}</label>
          <input type="color" id="picker-gold" class="color-input-swatch" value="${currentTheme.accentGold || '#ffd700'}" />
        </div>
      </div>

      <!-- Live Card Preview -->
      <div style="margin:20px 0; padding:16px; border-radius:16px; background:var(--bg-card); border:2px solid var(--accent-red); text-align:center; box-shadow:0 10px 25px var(--accent-red-glow);">
        <span style="font-family:var(--font-heading); font-weight:800; font-size:1.2rem; color:var(--accent-gold);">1985</span>
        <div style="font-weight:700; color:#fff; margin:4px 0;">Live Design Preview</div>
        <div style="font-size:0.8rem; color:var(--text-muted);">Dein gewähltes HITSTER Theme</div>
      </div>

      <div style="display:flex; gap:12px;">
        <button class="btn-primary" id="save-colors-btn" style="flex:1;">${getTranslation('saveColors')}</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  const bgPicker = overlay.querySelector('#picker-bg');
  const redPicker = overlay.querySelector('#picker-red');
  const cyanPicker = overlay.querySelector('#picker-cyan');
  const goldPicker = overlay.querySelector('#picker-gold');

  const updateColors = () => {
    applyCustomColors({
      bgPrimary: bgPicker.value,
      accentRed: redPicker.value,
      accentCyan: cyanPicker.value,
      accentGold: goldPicker.value
    });
  };

  bgPicker.addEventListener('input', updateColors);
  redPicker.addEventListener('input', updateColors);
  cyanPicker.addEventListener('input', updateColors);
  goldPicker.addEventListener('input', updateColors);

  // Preset Handlers
  const applyPreset = (preset) => {
    bgPicker.value = preset.bgPrimary;
    redPicker.value = preset.accentRed;
    cyanPicker.value = preset.accentCyan;
    goldPicker.value = preset.accentGold;
    applyCustomColors(preset);
  };

  overlay.querySelector('#preset-original').addEventListener('click', () => applyPreset(THEME_PRESETS.original));
  overlay.querySelector('#preset-cyberpunk').addEventListener('click', () => applyPreset(THEME_PRESETS.cyberpunk));
  overlay.querySelector('#preset-midnight').addEventListener('click', () => applyPreset(THEME_PRESETS.midnight));
  overlay.querySelector('#preset-emerald').addEventListener('click', () => applyPreset(THEME_PRESETS.emerald));

  const closeBtn = overlay.querySelector('#close-color-btn');
  const saveBtn = overlay.querySelector('#save-colors-btn');

  const close = () => {
    overlay.remove();
    if (onClose) onClose();
  };

  closeBtn.addEventListener('click', close);
  saveBtn.addEventListener('click', close);
}
