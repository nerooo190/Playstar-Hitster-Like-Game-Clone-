// Hitster Rules & How-To-Play Guide Modal Component

import { getTranslation } from '../data/i18n.js';

export function renderRulesModal(onClose) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  overlay.innerHTML = `
    <div class="modal-content">
      <button class="modal-close-btn" id="close-rules-btn">✕</button>
      
      <div style="text-align:center; margin-bottom:20px;">
        <span style="font-size:2.5rem;">🎵</span>
        <h2 style="font-family:var(--font-heading); font-size:2rem; font-weight:900; background:linear-gradient(90deg, #fff, var(--accent-red)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; margin-top:8px;">
          ${getTranslation('rules')}
        </h2>
        <p style="color:var(--text-muted); font-size:0.9rem;">Das ultimative Party-Musikspiel von 1900 bis 2026</p>
      </div>

      <div style="display:flex; flex-direction:column; gap:18px; color:#cbd5e1; font-size:0.95rem; line-height:1.6;">
        <div style="background:rgba(255,255,255,0.05); padding:16px; border-radius:14px; border:1px solid var(--border-color);">
          <h3 style="color:#fff; font-family:var(--font-heading); font-size:1.1rem; font-weight:700; margin-bottom:6px;">🎯 Ziel des Spiels</h3>
          <p>Sei der erste Spieler oder das erste Team, das <strong>10 Musikkarten</strong> in der korrekten chronologischen Reihenfolge (von 1900 bis 2026) auf dem eigenen Zeitstrahl platziert!</p>
        </div>

        <div style="background:rgba(255,255,255,0.05); padding:16px; border-radius:14px; border:1px solid var(--border-color);">
          <h3 style="color:#fff; font-family:var(--font-heading); font-size:1.1rem; font-weight:700; margin-bottom:6px;">🎧 Spielablauf</h3>
          <ol style="margin-left:20px; display:flex; flex-direction:column; gap:6px;">
            <li>Spiele die Musikkarte ab (ohne den Titel oder das Jahr zu sehen).</li>
            <li>Rate, wo der Song in deine bisherige Timeline passt (vor, zwischen oder nach deinen bereits gelegten Karten).</li>
            <li>Klicke auf den gewünschten Slot im Zeitstrahl.</li>
            <li>Decke die Karte auf: Liegt sie richtig, gehört sie dir! Liegt sie falsch, kommt sie auf den Ablagestapel.</li>
          </ol>
        </div>

        <div style="background:rgba(255,43,85,0.1); padding:16px; border-radius:14px; border:1px solid var(--accent-red);">
          <h3 style="color:var(--accent-red); font-family:var(--font-heading); font-size:1.1rem; font-weight:800; margin-bottom:6px;">🪙 Hitster-Chips (Tokens)</h3>
          <ul style="margin-left:20px; display:flex; flex-direction:column; gap:6px;">
            <li><strong>STEAL / STEHLEN:</strong> Setze deinen Chip auf den Zeitstrahl deines Mitspielers, wenn du glaubst, dass seine Karte falsch liegt. Liegt sie falsch und du richtig, stiehlst du die Karte!</li>
            <li><strong>SKIP / ÜBERSPRINGEN:</strong> Tausche 1 Chip ein, um einen Song zu überspringen.</li>
            <li><strong>BUY / KAUFEN:</strong> Löse 3 Hitster-Chips ein, um sofort 1 Karte ohne Raten zu deiner Timeline hinzuzufügen.</li>
          </ul>
        </div>

        <div style="background:rgba(255,215,0,0.1); padding:16px; border-radius:14px; border:1px solid var(--accent-gold);">
          <h3 style="color:var(--accent-gold); font-family:var(--font-heading); font-size:1.1rem; font-weight:800; margin-bottom:6px;">⚡ Spielmodi</h3>
          <p><strong>Classic:</strong> Erhalte Chips für richtige Antworten.<br>
          <strong>Pro:</strong> Kein Raten mit Vergleichen – Karten müssen exakt platziert werden.<br>
          <strong>Expert:</strong> Errate zusätzlich den exakten Künstlernamen & das Jahr für Bonuspunkte!</p>
        </div>
      </div>

      <div style="margin-top:24px; text-align:center;">
        <button class="btn-primary" id="start-rules-btn" style="width:100%;">Alles Klar, Los Geht's!</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  const closeBtn = overlay.querySelector('#close-rules-btn');
  const startBtn = overlay.querySelector('#start-rules-btn');

  const close = () => {
    overlay.remove();
    if (onClose) onClose();
  };

  closeBtn.addEventListener('click', close);
  startBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
}
