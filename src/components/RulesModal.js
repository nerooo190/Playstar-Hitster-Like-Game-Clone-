// Hitster Rules & How-To-Play Guide Modal Component
// Desktop 2-Column Sidebar Layout (700px-850px) with Interactive Table of Contents & Mobile Full-Width Support

import { getTranslation } from '../data/i18n.js';

export function renderRulesModal(onClose) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  overlay.innerHTML = `
    <div class="modal-content rules-modal-large">
      <button class="modal-close-btn" id="close-rules-btn">✕</button>

      <!-- Modal Header -->
      <div style="text-align:center; padding-bottom:12px; border-bottom:1px solid var(--border-color);">
        <h2 style="font-family:var(--font-heading); font-size:1.8rem; font-weight:900; background:linear-gradient(90deg, #fff, var(--accent-red)); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">
          📖 Spielanleitung & Regelwerk
        </h2>
        <p style="color:var(--text-muted); font-size:0.88rem; margin-top:2px;">
          Das ultimative Party-Musikspiel von 1900 bis 2026
        </p>
      </div>

      <!-- 2-Column Body: Left Sidebar (TOC) + Right Main Content -->
      <div class="rules-body-grid">
        <!-- Left Sidebar: Inhaltsverzeichnis -->
        <nav class="rules-toc-sidebar">
          <div class="rules-toc-title">Inhaltsverzeichnis</div>
          <button class="rules-toc-item active" data-target="ch-1">🎯 1. Spielziel</button>
          <button class="rules-toc-item" data-target="ch-2">🎧 2. Spielablauf</button>
          <button class="rules-toc-item" data-target="ch-3">🪙 3. Hitster-Chips</button>
          <button class="rules-toc-item" data-target="ch-4">⚡ 4. Spielmodi</button>
          <button class="rules-toc-item" data-target="ch-5">🤖 5. KI & Multiplayer</button>
        </nav>

        <!-- Right Content Area -->
        <div class="rules-content-scroll" id="rules-scroll-area">
          <!-- Chapter 1: Ziel des Spiels -->
          <section class="rules-chapter-card" id="ch-1">
            <div class="rules-chapter-header">
              <span class="rules-chapter-icon">🎯</span>
              <h3 class="rules-chapter-title">1. Ziel des Spiels</h3>
            </div>
            <p style="color:#cbd5e1; font-size:0.92rem; line-height:1.6;">
              Sei der erste Spieler oder das erste Team, das <strong>10 Musikkarten</strong> in der korrekten chronologischen Reihenfolge (von 1900 bis 2026) auf dem eigenen Zeitstrahl platziert!
            </p>
            <div style="background:rgba(255,215,0,0.1); border:1px solid var(--accent-gold); padding:10px 14px; border-radius:12px; font-size:0.85rem; color:var(--accent-gold); font-weight:700;">
              💡 Tipp: Es zählt nur das originale Erscheinungsjahr des Songs, nicht spätere Covers oder Remaster!
            </div>
          </section>

          <!-- Chapter 2: Spielablauf -->
          <section class="rules-chapter-card" id="ch-2">
            <div class="rules-chapter-header">
              <span class="rules-chapter-icon">🎧</span>
              <h3 class="rules-chapter-title">2. Spielablauf & Kartenlegen</h3>
            </div>
            <ol style="margin-left:20px; color:#cbd5e1; font-size:0.9rem; line-height:1.7; display:flex; flex-direction:column; gap:6px;">
              <li><strong>Probe abspielen:</strong> Klicke auf den Play-Button, um eine 30-Sekunden Musikprobe zu hören.</li>
              <li><strong>Position wählen:</strong> Ziehe die Karte per <strong>Drag & Drop</strong> nach unten ODER klicke auf einen freien Slot (<code>➕ Hier</code>) in deiner Timeline.</li>
              <li><strong>Auflösung:</strong> Nach dem Einrasten dreht sich die Karte um: Liegt sie richtig, wächst deine Timeline! Liegt sie falsch, wandert sie auf den Ablagestapel.</li>
            </ol>
          </section>

          <!-- Chapter 3: Hitster-Chips (Tokens) -->
          <section class="rules-chapter-card" id="ch-3" style="border-color:var(--accent-red);">
            <div class="rules-chapter-header">
              <span class="rules-chapter-icon">🪙</span>
              <h3 class="rules-chapter-title" style="color:var(--accent-red);">3. Hitster-Chips (Tokens) & Power-Ups</h3>
            </div>
            <ul style="margin-left:20px; color:#cbd5e1; font-size:0.9rem; line-height:1.7; display:flex; flex-direction:column; gap:6px;">
              <li><strong>⏭ SKIP / ÜBERSPRINGEN (1 Token):</strong> Passt dir der aktuelle Song nicht? Tausche 1 Token ein, um sofort eine neue Karte zu ziehen.</li>
              <li><strong>🎁 BUY / KAUFEN (3 Tokens):</strong> Löse 3 Hitster-Chips ein, um sofort 1 Karte ohne Raten direkt auf deine Timeline geschenkt zu bekommen!</li>
              <li><strong>🎯 EXAKTES JAHR BONUS (+2 Tokens):</strong> Errätst du im Expert-Modus das exakte Erscheinungsjahr, erhältst du 2 Extra-Tokens als Belohnung.</li>
            </ul>
          </section>

          <!-- Chapter 4: Spielmodi -->
          <section class="rules-chapter-card" id="ch-4">
            <div class="rules-chapter-header">
              <span class="rules-chapter-icon">⚡</span>
              <h3 class="rules-chapter-title">4. Die 4 Spielmodi</h3>
            </div>
            <div style="display:flex; flex-direction:column; gap:8px; color:#cbd5e1; font-size:0.88rem;">
              <div><strong style="color:var(--accent-gold);">Classic:</strong> Standard Hitster-Erlebnis. Wer zuerst 10 Karten hat, gewinnt.</div>
              <div><strong style="color:var(--accent-cyan);">Pro:</strong> Erhöhte Herausforderung – Fehlplatzierungen kosten Hitster-Tokens!</div>
              <div><strong style="color:var(--accent-red);">Expert:</strong> Für echte Musik-Gurus! Gebe zusätzlich das exakte Erscheinungsjahr ein für Bonuspunkte.</div>
              <div><strong style="color:#22c55e;">Coop:</strong> Team-Modus! Alle spielen gemeinsam gegen die Uhr mit 3 gemeinsamen Leben.</div>
            </div>
          </section>

          <!-- Chapter 5: KI & Multiplayer -->
          <section class="rules-chapter-card" id="ch-5">
            <div class="rules-chapter-header">
              <span class="rules-chapter-icon">🤖</span>
              <h3 class="rules-chapter-title">5. KI-Bots & Online Multiplayer</h3>
            </div>
            <p style="color:#cbd5e1; font-size:0.9rem; line-height:1.6;">
              <strong>KI-Bots:</strong> Du kannst alleine gegen intelligene Bots (Easy, Medium, Hard, Unbeatable) spielen.<br>
              <strong>Online Multiplayer:</strong> Erstelle eine Online-Lobby, teile den 6-stelligen Raumcode mit Freunden und spielt gemeinsam über verschiedene Geräte!
            </p>
          </section>
        </div>
      </div>

      <!-- Fixed Bottom Action Bar -->
      <div class="rules-footer-bar">
        <button class="btn-primary" id="start-rules-btn" style="min-width:240px; padding:14px 32px; font-size:1.05rem;">
          ✅ Verstanden
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  const closeBtn = overlay.querySelector('#close-rules-btn');
  const startBtn = overlay.querySelector('#start-rules-btn');
  const tocItems = overlay.querySelectorAll('.rules-toc-item');
  const scrollArea = overlay.querySelector('#rules-scroll-area');

  // Sidebar navigation smooth scroll
  tocItems.forEach(item => {
    item.addEventListener('click', () => {
      tocItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const targetId = item.getAttribute('data-target');
      const targetEl = overlay.querySelector(`#${targetId}`);
      if (targetEl && scrollArea) {
        scrollArea.scrollTo({
          top: targetEl.offsetTop - scrollArea.offsetTop - 10,
          behavior: 'smooth'
        });
      }
    });
  });

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
