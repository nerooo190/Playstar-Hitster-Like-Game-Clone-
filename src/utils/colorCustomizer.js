// 180M Color Customization Engine for Hitster

export const THEME_PRESETS = {
  original: {
    name: "Hitster Original (Rot & Blau)",
    bgPrimary: "#0a0f24",
    accentRed: "#ff2b55",
    accentCyan: "#00e5ff",
    accentGold: "#ffd700",
    bgCard: "rgba(22, 32, 70, 0.75)"
  },
  cyberpunk: {
    name: "Cyberpunk Synthwave",
    bgPrimary: "#0d0221",
    accentRed: "#ff007f",
    accentCyan: "#00f0ff",
    accentGold: "#ffb703",
    bgCard: "rgba(38, 12, 66, 0.75)"
  },
  midnight: {
    name: "Midnight Gold",
    bgPrimary: "#0b0f19",
    accentRed: "#e11d48",
    accentCyan: "#38bdf8",
    accentGold: "#f59e0b",
    bgCard: "rgba(30, 41, 59, 0.75)"
  },
  emerald: {
    name: "Emerald Disco",
    bgPrimary: "#022c22",
    accentRed: "#f43f5e",
    accentCyan: "#10b981",
    accentGold: "#facc15",
    bgCard: "rgba(6, 78, 59, 0.75)"
  }
};

export function applyCustomColors(colors) {
  const root = document.documentElement;

  if (colors.bgPrimary) root.style.setProperty('--bg-primary', colors.bgPrimary);
  if (colors.accentRed) {
    root.style.setProperty('--accent-red', colors.accentRed);
    root.style.setProperty('--accent-red-glow', hexToRgba(colors.accentRed, 0.4));
  }
  if (colors.accentCyan) {
    root.style.setProperty('--accent-cyan', colors.accentCyan);
    root.style.setProperty('--accent-cyan-glow', hexToRgba(colors.accentCyan, 0.4));
  }
  if (colors.accentGold) {
    root.style.setProperty('--accent-gold', colors.accentGold);
    root.style.setProperty('--accent-gold-glow', hexToRgba(colors.accentGold, 0.4));
  }
  if (colors.bgCard) root.style.setProperty('--bg-card', colors.bgCard);

  localStorage.setItem('hitster_theme_colors', JSON.stringify(colors));
}

export function loadSavedTheme() {
  const saved = localStorage.getItem('hitster_theme_colors');
  if (saved) {
    try {
      const colors = JSON.parse(saved);
      applyCustomColors(colors);
      return colors;
    } catch (e) {
      console.error("Failed to load saved theme colors", e);
    }
  }
  applyCustomColors(THEME_PRESETS.original);
  return THEME_PRESETS.original;
}

function hexToRgba(hex, alpha = 0.4) {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')},${alpha})`;
  }
  return `rgba(255, 43, 85, ${alpha})`;
}
