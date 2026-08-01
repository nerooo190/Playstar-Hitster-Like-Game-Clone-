// Highscores & Game Statistics Modal Component

import { getTranslation } from '../data/i18n.js';

export function renderHighscoresModal(onClose) {
  const stats = JSON.parse(localStorage.getItem('hitster_highscores') || '{"games":0, "wins":0, "streak":0, "leaderboard":[]}');

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  overlay.innerHTML = `
    <div class="modal-content">
      <button class="modal-close-btn" id="close-stats-btn">✕</button>

      <div style="text-align:center; margin-bottom:24px;">
        <span style="font-size:2.5rem;">🏆</span>
        <h2 style="font-family:var(--font-heading); font-size:2rem; font-weight:900; background:linear-gradient(90deg, #fff, var(--accent-gold)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; margin-top:8px;">
          ${getTranslation('highscores')}
        </h2>
      </div>

      <!-- Quick Stats Grid -->
      <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px; margin-bottom:24px;">
        <div style="background:rgba(255,255,255,0.05); padding:16px; border-radius:14px; text-align:center; border:1px solid var(--border-color);">
          <div style="font-family:var(--font-heading); font-size:1.8rem; font-weight:800; color:#fff;">${stats.games}</div>
          <div style="font-size:0.75rem; color:var(--text-muted);">Gespielte Runden</div>
        </div>

        <div style="background:rgba(255,215,0,0.1); padding:16px; border-radius:14px; text-align:center; border:1px solid var(--accent-gold);">
          <div style="font-family:var(--font-heading); font-size:1.8rem; font-weight:800; color:var(--accent-gold);">${stats.wins}</div>
          <div style="font-size:0.75rem; color:var(--text-muted);">Siege</div>
        </div>

        <div style="background:rgba(255,43,85,0.1); padding:16px; border-radius:14px; text-align:center; border:1px solid var(--accent-red);">
          <div style="font-family:var(--font-heading); font-size:1.8rem; font-weight:800; color:var(--accent-red);">${stats.streak} 🔥</div>
          <div style="font-size:0.75rem; color:var(--text-muted);">Beste Siegesserie</div>
        </div>
      </div>

      <!-- Leaderboard Table -->
      <h3 style="font-family:var(--font-heading); font-size:1.1rem; font-weight:700; color:#fff; margin-bottom:12px;">Top Spieler</h3>
      
      <div style="display:flex; flex-direction:column; gap:8px;">
        ${stats.leaderboard && stats.leaderboard.length > 0 ? stats.leaderboard.map((item, idx) => `
          <div style="display:flex; align-items:center; justify-space-between; background:rgba(255,255,255,0.05); padding:12px 16px; border-radius:12px;">
            <div style="display:flex; align-items:center; gap:12px;">
              <span style="font-weight:900; color:var(--accent-gold);">#${idx + 1}</span>
              <span style="font-weight:700; color:#fff;">${item.name}</span>
            </div>
            <span style="font-weight:800; color:var(--accent-cyan);">${item.score} Punkte</span>
          </div>
        `).join('') : `
          <div style="text-align:center; color:var(--text-muted); padding:20px; background:rgba(0,0,0,0.2); border-radius:12px;">
            Noch keine Highscores vorhanden. Spiele eine Runde!
          </div>
        `}
      </div>

      <div style="margin-top:24px;">
        <button class="btn-secondary" id="close-stats-action-btn" style="width:100%;">Schließen</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  const closeBtn = overlay.querySelector('#close-stats-btn');
  const closeActionBtn = overlay.querySelector('#close-stats-action-btn');

  const close = () => {
    overlay.remove();
    if (onClose) onClose();
  };

  closeBtn.addEventListener('click', close);
  closeActionBtn.addEventListener('click', close);
}

export function saveGameResult(winnerName, score) {
  const stats = JSON.parse(localStorage.getItem('hitster_highscores') || '{"games":0, "wins":0, "streak":0, "leaderboard":[]}');
  stats.games += 1;
  stats.wins += 1;
  stats.streak += 1;
  
  if (!stats.leaderboard) stats.leaderboard = [];
  stats.leaderboard.push({ name: winnerName, score: score, date: new Date().toLocaleDateString() });
  stats.leaderboard.sort((a, b) => b.score - a.score);
  stats.leaderboard = stats.leaderboard.slice(0, 10);

  localStorage.setItem('hitster_highscores', JSON.stringify(stats));
}
