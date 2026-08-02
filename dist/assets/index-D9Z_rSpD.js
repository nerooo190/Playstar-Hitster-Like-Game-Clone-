(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={original:{name:`Hitster Original (Rot & Blau)`,bgPrimary:`#0a0f24`,accentRed:`#ff2b55`,accentCyan:`#00e5ff`,accentGold:`#ffd700`,bgCard:`rgba(22, 32, 70, 0.75)`},cyberpunk:{name:`Cyberpunk Synthwave`,bgPrimary:`#0d0221`,accentRed:`#ff007f`,accentCyan:`#00f0ff`,accentGold:`#ffb703`,bgCard:`rgba(38, 12, 66, 0.75)`},midnight:{name:`Midnight Gold`,bgPrimary:`#0b0f19`,accentRed:`#e11d48`,accentCyan:`#38bdf8`,accentGold:`#f59e0b`,bgCard:`rgba(30, 41, 59, 0.75)`},emerald:{name:`Emerald Disco`,bgPrimary:`#022c22`,accentRed:`#f43f5e`,accentCyan:`#10b981`,accentGold:`#facc15`,bgCard:`rgba(6, 78, 59, 0.75)`}};function t(e){let t=document.documentElement;e.bgPrimary&&t.style.setProperty(`--bg-primary`,e.bgPrimary),e.accentRed&&(t.style.setProperty(`--accent-red`,e.accentRed),t.style.setProperty(`--accent-red-glow`,r(e.accentRed,.4))),e.accentCyan&&(t.style.setProperty(`--accent-cyan`,e.accentCyan),t.style.setProperty(`--accent-cyan-glow`,r(e.accentCyan,.4))),e.accentGold&&(t.style.setProperty(`--accent-gold`,e.accentGold),t.style.setProperty(`--accent-gold-glow`,r(e.accentGold,.4))),e.bgCard&&t.style.setProperty(`--bg-card`,e.bgCard),localStorage.setItem(`hitster_theme_colors`,JSON.stringify(e))}function n(){let n=localStorage.getItem(`hitster_theme_colors`);if(n)try{let e=JSON.parse(n);return t(e),e}catch(e){console.error(`Failed to load saved theme colors`,e)}return t(e.original),e.original}function r(e,t=.4){let n;return/^#([A-Fa-f0-9]{3}){1,2}$/.test(e)?(n=e.substring(1).split(``),n.length===3&&(n=[n[0],n[0],n[1],n[1],n[2],n[2]]),n=`0x`+n.join(``),`rgba(${[n>>16&255,n>>8&255,n&255].join(`,`)},${t})`):`rgba(255, 43, 85, ${t})`}var i=[{code:`de`,name:`Deutsch`,flag:`🇩🇪`},{code:`en`,name:`English`,flag:`🇬🇧`},{code:`es`,name:`Español`,flag:`🇪🇸`},{code:`fr`,name:`Français`,flag:`🇫🇷`},{code:`it`,name:`Italiano`,flag:`🇮🇹`},{code:`nl`,name:`Nederlands`,flag:`🇳🇱`},{code:`pt`,name:`Português`,flag:`🇵🇹`},{code:`pl`,name:`Polski`,flag:`🇵🇱`},{code:`ru`,name:`Русский`,flag:`🇷🇺`},{code:`tr`,name:`Türkçe`,flag:`🇹🇷`},{code:`ja`,name:`日本語`,flag:`🇯🇵`},{code:`zh`,name:`中文`,flag:`🇨🇳`},{code:`sv`,name:`Svenska`,flag:`🇸🇪`},{code:`no`,name:`Norsk`,flag:`🇳🇴`},{code:`da`,name:`Dansk`,flag:`🇩🇰`},{code:`fi`,name:`Suomi`,flag:`🇫🇮`},{code:`el`,name:`Ελληνικά`,flag:`🇬🇷`},{code:`cs`,name:`Čeština`,flag:`🇨🇿`},{code:`hu`,name:`Magyar`,flag:`🇭🇺`},{code:`ro`,name:`Română`,flag:`🇷🇴`},{code:`uk`,name:`Українська`,flag:`🇺🇦`},{code:`ar`,name:`العربية`,flag:`🇸🇦`},{code:`hi`,name:`हिन्दी`,flag:`🇮🇳`},{code:`ko`,name:`한국어`,flag:`🇰🇷`},{code:`vi`,name:`Tiếng Việt`,flag:`🇻🇳`},{code:`th`,name:`ไทย`,flag:`🇹🇭`},{code:`id`,name:`Bahasa Indonesia`,flag:`🇮🇩`},{code:`ca`,name:`Català`,flag:`🇪🇸`},{code:`hr`,name:`Hrvatski`,flag:`🇭🇷`},{code:`sk`,name:`Slovenčina`,flag:`🇸🇰`},{code:`bg`,name:`Български`,flag:`🇧🇬`},{code:`sr`,name:`Srpski`,flag:`🇷🇸`},{code:`lt`,name:`Lietuvių`,flag:`🇱🇹`},{code:`lv`,name:`Latviešu`,flag:`🇱🇻`},{code:`et`,name:`Eesti`,flag:`🇪🇪`},{code:`sl`,name:`Slovenščina`,flag:`🇸🇮`},{code:`mt`,name:`Malti`,flag:`🇲🇹`},{code:`ga`,name:`Gaeilge`,flag:`🇮🇪`},{code:`cy`,name:`Cymraeg`,flag:`🏴󠁧󠁢󠁷󠁬󠁳󠁿`},{code:`is`,name:`Íslenska`,flag:`🇮🇸`}],a={de:{appTitle:`HITSTER`,appSubtitle:`Das Musik-Kartenspiel (1900 – 2026)`,playNow:`Jetzt spielen`,gameModes:`Spielmodi`,rules:`Spielregeln & Anleitung`,colorCustomizer:`Design anpassen (180M Farben)`,highscores:`Highscores & Statistiken`,localMultiplayer:`Lokal spielen (Pass & Play)`,onlineMultiplayer:`Online spielen (Raum erstellen / beitreten)`,selectLanguage:`Sprache wählen`,modeClassic:`Klassischer Modus (Original Hitster)`,modePro:`Profi-Modus (Keine Tipps)`,modeExpert:`Experten-Modus (Genaue Jahreszahl)`,modeCoop:`Kooperativ (Teamwork)`,modeSolo:`Einzelspieler-Herausforderung`,playersCount:`Anzahl Spieler / Teams`,startRound:`Spiel starten`,currentTurn:`Am Zug:`,playSong:`Song abspielen`,pauseSong:`Pause`,placeInTimeline:`Auf dem Zeitstrahl platzieren`,revealCard:`Karte aufdecken`,correctGuess:`Richtig! Die Karte ist am korrekten Platz!`,wrongGuess:`Falsch! Die Karte passt hier nicht hin.`,hitsterTokens:`Hitster-Chips:`,useTokenSteal:`Chip setzen: Stehlen`,useTokenSkip:`Song überspringen`,useTokenBuy:`Karte kaufen (3 Chips)`,openInSpotify:`In Spotify öffnen`,backToMenu:`Hauptmenü`,themePresets:`Theme-Vorlagen`,presetOriginal:`Hitster Original (Rot & Blau)`,presetCyberpunk:`Cyberpunk Synthwave`,presetMidnight:`Mitternachts-Gold`,presetEmerald:`Smaragd-Disko`,primaryColor:`Hauptfarbe`,accentColor:`Akzentfarbe (Rot)`,cyanColor:`Neon-Cyan`,goldColor:`Gold-Akzent`,bgPrimary:`Hintergrund dunkel`,saveColors:`Farben speichern`},en:{appTitle:`HITSTER`,appSubtitle:`The Music Card Game (1900 – 2026)`,playNow:`Play Now`,gameModes:`Game Modes`,rules:`Game Rules & Tutorial`,colorCustomizer:`Color Customizer (180M Colors)`,highscores:`Highscores & Stats`,localMultiplayer:`Local Pass & Play`,onlineMultiplayer:`Online Lobby (Host / Join)`,selectLanguage:`Select Language`,modeClassic:`Classic (Original Hitster)`,modePro:`Pro Mode (No Hints)`,modeExpert:`Expert Mode (Exact Year)`,modeCoop:`Cooperative (Teamwork)`,modeSolo:`Solo Challenge`,playersCount:`Number of Players / Teams`,startRound:`Start Game`,currentTurn:`Current Turn:`,playSong:`Play Song`,pauseSong:`Pause`,placeInTimeline:`Place in Timeline`,revealCard:`Reveal Card`,correctGuess:`Correct! Placed in the exact spot!`,wrongGuess:`Wrong! Incorrect timeline position.`,hitsterTokens:`Hitster Tokens:`,useTokenSteal:`Use Token: Steal Card`,useTokenSkip:`Skip Song`,useTokenBuy:`Buy Card (3 Tokens)`,openInSpotify:`Open in Spotify`,backToMenu:`Main Menu`,themePresets:`Theme Presets`,presetOriginal:`Hitster Original (Red & Blue)`,presetCyberpunk:`Cyberpunk Synthwave`,presetMidnight:`Midnight Gold`,presetEmerald:`Emerald Disco`,primaryColor:`Primary Color`,accentColor:`Accent Red`,cyanColor:`Neon Cyan`,goldColor:`Gold Accent`,bgPrimary:`Dark Background`,saveColors:`Save Custom Colors`}},o=`de`;function s(){return o}function c(e){(a[e]||i.find(t=>t.code===e))&&(o=e)}function l(e){return(a[o]||a.de)[e]||a.de[e]||a.en[e]||e}function u(e,t=20,n=``){return{play:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`,pause:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`,users:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,globe:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,palette:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.7-.63 1.95-1.51.15-.53.44-.99.85-1.33.68-.56 1.4-1.22 1.4-2.16 0-.83-.67-1.5-1.5-1.5H13c-1.1 0-2-.9-2-2 0-.39.11-.75.31-1.06.45-.7.89-1.46.89-2.44 0-2.21-1.79-4-4.2-4z"></path></svg>`,bookOpen:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`,barChart:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>`,settings:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,plus:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,volume2:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`,volumeX:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`,trophy:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path></svg>`,helpCircle:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,crown:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><path d="M2 4l3 12h14l3-12-6 7-4-5-4 5-6-7z"></path></svg>`,key:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.778-7.778zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>`,user:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,cpu:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>`,disc:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>`,music:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>`}[e]||``}function d(e){let t=document.createElement(`div`);t.className=`modal-overlay`,t.innerHTML=`
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
  `,document.body.appendChild(t);let n=t.querySelector(`#close-rules-btn`),r=t.querySelector(`#start-rules-btn`),i=t.querySelectorAll(`.rules-toc-item`),a=t.querySelector(`#rules-scroll-area`);i.forEach(e=>{e.addEventListener(`click`,()=>{i.forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`);let n=e.getAttribute(`data-target`),r=t.querySelector(`#${n}`);r&&a&&a.scrollTo({top:r.offsetTop-a.offsetTop-10,behavior:`smooth`})})});let o=()=>{t.remove(),e&&e()};n.addEventListener(`click`,o),r.addEventListener(`click`,o),t.addEventListener(`click`,e=>{e.target===t&&o()})}function f(r){let i=n(),a=document.createElement(`div`);a.className=`modal-overlay`,a.innerHTML=`
    <div class="modal-content">
      <button class="modal-close-btn" id="close-color-btn">✕</button>

      <div style="text-align:center; margin-bottom:20px;">
        <span style="font-size:2.5rem;">🎨</span>
        <h2 style="font-family:var(--font-heading); font-size:2rem; font-weight:900; background:linear-gradient(90deg, #fff, var(--accent-cyan)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; margin-top:8px;">
          ${l(`colorCustomizer`)}
        </h2>
        <p style="color:var(--text-muted); font-size:0.85rem;">Gestalte deine eigene Farbwelt aus über 180.000.000 Farben!</p>
      </div>

      <!-- Presets -->
      <div style="margin-bottom:20px;">
        <label class="form-label">${l(`themePresets`)}</label>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <button class="btn-secondary" id="preset-original">${e.original.name}</button>
          <button class="btn-secondary" id="preset-cyberpunk">${e.cyberpunk.name}</button>
          <button class="btn-secondary" id="preset-midnight">${e.midnight.name}</button>
          <button class="btn-secondary" id="preset-emerald">${e.emerald.name}</button>
        </div>
      </div>

      <!-- Live Custom Color Pickers -->
      <div class="color-picker-grid">
        <div class="color-picker-item">
          <label class="form-label">${l(`bgPrimary`)}</label>
          <input type="color" id="picker-bg" class="color-input-swatch" value="${i.bgPrimary||`#0a0f24`}" />
        </div>

        <div class="color-picker-item">
          <label class="form-label">${l(`accentColor`)}</label>
          <input type="color" id="picker-red" class="color-input-swatch" value="${i.accentRed||`#ff2b55`}" />
        </div>

        <div class="color-picker-item">
          <label class="form-label">${l(`cyanColor`)}</label>
          <input type="color" id="picker-cyan" class="color-input-swatch" value="${i.accentCyan||`#00e5ff`}" />
        </div>

        <div class="color-picker-item">
          <label class="form-label">${l(`goldColor`)}</label>
          <input type="color" id="picker-gold" class="color-input-swatch" value="${i.accentGold||`#ffd700`}" />
        </div>
      </div>

      <!-- Live Card Preview -->
      <div style="margin:20px 0; padding:16px; border-radius:16px; background:var(--bg-card); border:2px solid var(--accent-red); text-align:center; box-shadow:0 10px 25px var(--accent-red-glow);">
        <span style="font-family:var(--font-heading); font-weight:800; font-size:1.2rem; color:var(--accent-gold);">1985</span>
        <div style="font-weight:700; color:#fff; margin:4px 0;">Live Design Preview</div>
        <div style="font-size:0.8rem; color:var(--text-muted);">Dein gewähltes HITSTER Theme</div>
      </div>

      <div style="display:flex; gap:12px;">
        <button class="btn-primary" id="save-colors-btn" style="flex:1;">${l(`saveColors`)}</button>
      </div>
    </div>
  `,document.body.appendChild(a);let o=a.querySelector(`#picker-bg`),s=a.querySelector(`#picker-red`),c=a.querySelector(`#picker-cyan`),u=a.querySelector(`#picker-gold`),d=()=>{t({bgPrimary:o.value,accentRed:s.value,accentCyan:c.value,accentGold:u.value})};o.addEventListener(`input`,d),s.addEventListener(`input`,d),c.addEventListener(`input`,d),u.addEventListener(`input`,d);let f=e=>{o.value=e.bgPrimary,s.value=e.accentRed,c.value=e.accentCyan,u.value=e.accentGold,t(e)};a.querySelector(`#preset-original`).addEventListener(`click`,()=>f(e.original)),a.querySelector(`#preset-cyberpunk`).addEventListener(`click`,()=>f(e.cyberpunk)),a.querySelector(`#preset-midnight`).addEventListener(`click`,()=>f(e.midnight)),a.querySelector(`#preset-emerald`).addEventListener(`click`,()=>f(e.emerald));let p=a.querySelector(`#close-color-btn`),m=a.querySelector(`#save-colors-btn`),h=()=>{a.remove(),r&&r()};p.addEventListener(`click`,h),m.addEventListener(`click`,h)}function p(e){let t=JSON.parse(localStorage.getItem(`hitster_highscores`)||`{"games":0, "wins":0, "streak":0, "leaderboard":[]}`),n=document.createElement(`div`);n.className=`modal-overlay`,n.innerHTML=`
    <div class="modal-content">
      <button class="modal-close-btn" id="close-stats-btn">✕</button>

      <div style="text-align:center; margin-bottom:24px;">
        <span style="font-size:2.5rem;">🏆</span>
        <h2 style="font-family:var(--font-heading); font-size:2rem; font-weight:900; background:linear-gradient(90deg, #fff, var(--accent-gold)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; margin-top:8px;">
          ${l(`highscores`)}
        </h2>
      </div>

      <!-- Quick Stats Grid -->
      <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px; margin-bottom:24px;">
        <div style="background:rgba(255,255,255,0.05); padding:16px; border-radius:14px; text-align:center; border:1px solid var(--border-color);">
          <div style="font-family:var(--font-heading); font-size:1.8rem; font-weight:800; color:#fff;">${t.games}</div>
          <div style="font-size:0.75rem; color:var(--text-muted);">Gespielte Runden</div>
        </div>

        <div style="background:rgba(255,215,0,0.1); padding:16px; border-radius:14px; text-align:center; border:1px solid var(--accent-gold);">
          <div style="font-family:var(--font-heading); font-size:1.8rem; font-weight:800; color:var(--accent-gold);">${t.wins}</div>
          <div style="font-size:0.75rem; color:var(--text-muted);">Siege</div>
        </div>

        <div style="background:rgba(255,43,85,0.1); padding:16px; border-radius:14px; text-align:center; border:1px solid var(--accent-red);">
          <div style="font-family:var(--font-heading); font-size:1.8rem; font-weight:800; color:var(--accent-red);">${t.streak} 🔥</div>
          <div style="font-size:0.75rem; color:var(--text-muted);">Beste Siegesserie</div>
        </div>
      </div>

      <!-- Leaderboard Table -->
      <h3 style="font-family:var(--font-heading); font-size:1.1rem; font-weight:700; color:#fff; margin-bottom:12px;">Top Spieler</h3>
      
      <div style="display:flex; flex-direction:column; gap:8px;">
        ${t.leaderboard&&t.leaderboard.length>0?t.leaderboard.map((e,t)=>`
          <div style="display:flex; align-items:center; justify-space-between; background:rgba(255,255,255,0.05); padding:12px 16px; border-radius:12px;">
            <div style="display:flex; align-items:center; gap:12px;">
              <span style="font-weight:900; color:var(--accent-gold);">#${t+1}</span>
              <span style="font-weight:700; color:#fff;">${e.name}</span>
            </div>
            <span style="font-weight:800; color:var(--accent-cyan);">${e.score} Punkte</span>
          </div>
        `).join(``):`
          <div style="text-align:center; color:var(--text-muted); padding:20px; background:rgba(0,0,0,0.2); border-radius:12px;">
            Noch keine Highscores vorhanden. Spiele eine Runde!
          </div>
        `}
      </div>

      <div style="margin-top:24px;">
        <button class="btn-secondary" id="close-stats-action-btn" style="width:100%;">Schließen</button>
      </div>
    </div>
  `,document.body.appendChild(n);let r=n.querySelector(`#close-stats-btn`),i=n.querySelector(`#close-stats-action-btn`),a=()=>{n.remove(),e&&e()};r.addEventListener(`click`,a),i.addEventListener(`click`,a)}function m(e,t){let n=JSON.parse(localStorage.getItem(`hitster_highscores`)||`{"games":0, "wins":0, "streak":0, "leaderboard":[]}`);n.games+=1,n.wins+=1,n.streak+=1,n.leaderboard||=[],n.leaderboard.push({name:e,score:t,date:new Date().toLocaleDateString()}),n.leaderboard.sort((e,t)=>t.score-e.score),n.leaderboard=n.leaderboard.slice(0,10),localStorage.setItem(`hitster_highscores`,JSON.stringify(n))}var h={classic:`💡 Klassisch: Ordne den Song nur relativ zu deiner Timeline ein.`,pro:`⚡ Profi: Keine Hinweise auf Jahrzehnt oder Genre.`,expert:`🎯 Experte: Nenne zusätzlich das genaue Erscheinungsjahr (+2 Bonus-Chips).`,coop:`🤝 Kooperativ: Alle Spieler bauen gemeinsam eine Timeline gegen die Uhr.`,solo:`⏱️ Solo-Challenge: Erreiche mit möglichst wenigen Fehlern zehn Karten.`};function g(e,t,n){let r=2,i=`classic`,a=`all`,o=[`#ff2b55`,`#00e5ff`,`#ffd700`,`#a855f7`,`#22c55e`,`#f97316`,`#ec4899`,`#3b82f6`],s=[`🦁`,`⚡`,`👑`,`🎸`,`🚀`,`🎧`,`🏆`,`💎`,`🐉`,`🤖`],c=[{name:`Spieler 1`,isAI:!1,aiDifficulty:`medium`,color:o[0],icon:`👤`},{name:`Spieler 2 / KI-Bot`,isAI:!1,aiDifficulty:`medium`,color:o[1],icon:`🤖`}],u=[{id:`all`,name:`🎲 Gemischt / Random (Alle Songs & Genres)`},{id:`lionking`,name:`🦁 König der Löwen (The Lion King Complete)`},{id:`soundtracks`,name:`🎬 Film-Soundtracks & Movie Themes`},{id:`eminem`,name:`🎙️ Eminem Complete (1996 - 2024)`},{id:`queen`,name:`👑 Queen & Freddie Mercury`},{id:`oldies`,name:`📻 Oldies & Classics (1900 - 1979)`},{id:`modern`,name:`⚡ Nur Modern (2010 - 2026)`},{id:`pop`,name:`🕺 Pop Hits`},{id:`rap`,name:`🎤 Rap & Hip-Hop`},{id:`features`,name:`🤝 Features & Duette`},{id:`live`,name:`🎤 Live Songs, Demos & B-Seiten`}],d=()=>{e.innerHTML=`
      <div class="setup-container">
        <button class="btn-secondary" id="back-to-menu-btn" style="margin-bottom:16px;">
          ← ${l(`backToMenu`)}
        </button>

        <h2 class="setup-title">${l(`localMultiplayer`)}</h2>

        <!-- Custom Hitster Category Theme Selector -->
        <div class="form-group">
          <label class="form-label" style="color:var(--accent-gold); font-weight:800;">
            🎵 Custom Hitster Kategorie / Theme
          </label>
          <select id="category-select" class="form-select" style="border:2px solid var(--accent-gold); font-weight:700;">
            ${u.map(e=>`
              <option value="${e.id}" ${e.id===a?`selected`:``}>
                ${e.name}
              </option>
            `).join(``)}
          </select>
        </div>

        <!-- Game Mode Selector & Dynamic Explanation Box -->
        <div class="form-group">
          <label class="form-label">${l(`gameModes`)}</label>
          <select id="game-mode-select" class="form-select">
            <option value="classic" ${i===`classic`?`selected`:``}>${l(`modeClassic`)}</option>
            <option value="pro" ${i===`pro`?`selected`:``}>${l(`modePro`)}</option>
            <option value="expert" ${i===`expert`?`selected`:``}>${l(`modeExpert`)}</option>
            <option value="coop" ${i===`coop`?`selected`:``}>${l(`modeCoop`)}</option>
            <option value="solo" ${i===`solo`?`selected`:``}>${l(`modeSolo`)}</option>
          </select>
          
          <!-- DYNAMISCHE MODUS-ERKLÄRUNG -->
          <div id="mode-explanation-box" style="margin-top:8px; padding:10px 14px; background:rgba(0,229,255,0.08); border:1px solid var(--accent-cyan); border-radius:12px; font-size:0.85rem; color:var(--accent-cyan); font-weight:700; line-height:1.4;">
            ${h[i]||h.classic}
          </div>
        </div>

        <!-- Player Count -->
        <div class="form-group">
          <label class="form-label">${l(`playersCount`)}</label>
          <select id="player-count-select" class="form-select">
            ${[1,2,3,4,5,6,7,8].map(e=>`
              <option value="${e}" ${e===r?`selected`:``}>
                ${e} ${e===1?`Spieler (Solo)`:`Spieler / Teams / Bots`}
              </option>
            `).join(``)}
          </select>
        </div>

        <!-- Player Setup List -->
        <div class="form-group">
          <label class="form-label">Spieler & KI-Gegner Konfiguration</label>
          <div class="player-input-list">
            ${Array.from({length:r}).map((e,t)=>{let n=c[t]||{name:`Spieler ${t+1}`,isAI:!1,aiDifficulty:`medium`,color:o[t%o.length],icon:`👤`};return`
                <div class="player-row" style="background:rgba(0,0,0,0.25); border:1px solid var(--border-color); padding:14px; border-radius:16px; flex-direction:column; align-items:stretch; gap:10px;">
                  
                  <div style="display:flex; align-items:center; justify-content:between; flex-wrap:wrap; gap:10px;">
                    <!-- Avatar Preview with Color -->
                    <div style="display:flex; align-items:center; gap:10px;">
                      <div class="player-avatar-preview" style="background:${n.color||o[t%o.length]}; width:44px; height:44px; font-size:1.3rem; box-shadow:0 0 10px ${n.color};">
                        ${n.icon||(n.isAI?`🤖`:t+1)}
                      </div>
                      <span style="font-family:var(--font-heading); font-weight:800; color:#fff; font-size:1.1rem;">
                        Spieler / Team ${t+1}
                      </span>
                    </div>

                    <!-- EINDEUTIGE SEGMENTED CONTROL AUSWAHL: MENSCH | KI -->
                    <div class="segmented-control">
                      <button class="segmented-btn select-human-btn ${n.isAI?``:`active-human`}" data-index="${t}">
                        👤 Mensch
                      </button>
                      <button class="segmented-btn select-ai-btn ${n.isAI?`active-ai`:``}" data-index="${t}">
                        🤖 KI-Bot
                      </button>
                    </div>
                  </div>

                  <div style="display:flex; gap:10px; flex-wrap:wrap;">
                    <!-- Name Input -->
                    <input type="text" class="form-input player-name-field" data-index="${t}" value="${n.name}" placeholder="Name / Teamname" style="flex:2; min-width:180px;" />

                    <!-- Symbol Selector -->
                    <select class="form-select icon-select" data-index="${t}" style="flex:1; min-width:110px;">
                      ${s.map(e=>`
                        <option value="${e}" ${n.icon===e?`selected`:``}>${e} Symbol</option>
                      `).join(``)}
                    </select>

                    <!-- Color Selector -->
                    <select class="form-select color-select" data-index="${t}" style="flex:1; min-width:110px;">
                      ${o.map(e=>`
                        <option value="${e}" ${n.color===e?`selected`:``}>🎨 Farbe (${e})</option>
                      `).join(``)}
                    </select>
                  </div>

                  <!-- KI Schwierigkeitsgrad -->
                  ${n.isAI?`
                    <div style="background:rgba(0,229,255,0.08); border:1px solid var(--accent-cyan); padding:10px; border-radius:12px; display:flex; align-items:center; justify-content:between; gap:10px; margin-top:4px;">
                      <label style="font-size:0.85rem; font-weight:800; color:var(--accent-cyan);">🤖 KI-Schwierigkeitsgrad:</label>
                      <select class="form-select ai-diff-select" data-index="${t}" style="width:auto; padding:6px 12px; font-size:0.85rem; border-color:var(--accent-cyan);">
                        <option value="easy" ${n.aiDifficulty===`easy`?`selected`:``}>Leicht (40% Genauigkeit)</option>
                        <option value="medium" ${n.aiDifficulty===`medium`?`selected`:``}>Normal (75% Genauigkeit)</option>
                        <option value="hard" ${n.aiDifficulty===`hard`?`selected`:``}>Schwer (92% Genauigkeit)</option>
                        <option value="impossible" ${n.aiDifficulty===`impossible`?`selected`:``}>Unmöglich (99% Maestro)</option>
                      </select>
                    </div>
                  `:``}
                </div>
              `}).join(``)}
          </div>
        </div>

        <button class="btn-primary" id="start-game-btn" style="width:100%; padding:16px; margin-top:12px;">
          🚀 Spiel starten
        </button>
      </div>
    `,e.querySelector(`#back-to-menu-btn`).addEventListener(`click`,n),e.querySelector(`#category-select`).addEventListener(`change`,e=>{a=e.target.value});let f=e.querySelector(`#game-mode-select`),p=e.querySelector(`#mode-explanation-box`);f.addEventListener(`change`,e=>{i=e.target.value,p&&(p.innerHTML=h[i]||h.classic)}),e.querySelector(`#player-count-select`).addEventListener(`change`,e=>{for(r=parseInt(e.target.value);c.length<r;)c.push({name:`Spieler ${c.length+1}`,isAI:!1,aiDifficulty:`medium`,color:o[c.length%o.length],icon:`👤`});d()}),e.querySelectorAll(`.player-name-field`).forEach(e=>{e.addEventListener(`input`,e=>{let t=parseInt(e.target.getAttribute(`data-index`));c[t]&&(c[t].name=e.target.value)})}),e.querySelectorAll(`.select-human-btn`).forEach(e=>{e.addEventListener(`click`,e=>{let t=parseInt(e.currentTarget.getAttribute(`data-index`));c[t]&&(c[t].isAI=!1,c[t].name.includes(`KI-Bot`)&&(c[t].name=`Spieler ${t+1}`),d())})}),e.querySelectorAll(`.select-ai-btn`).forEach(e=>{e.addEventListener(`click`,e=>{let t=parseInt(e.currentTarget.getAttribute(`data-index`));c[t]&&(c[t].isAI=!0,c[t].name.includes(`KI`)||(c[t].name=`KI-Bot ${t+1}`),d())})}),e.querySelectorAll(`.ai-diff-select`).forEach(e=>{e.addEventListener(`change`,e=>{let t=parseInt(e.target.getAttribute(`data-index`));c[t]&&(c[t].aiDifficulty=e.target.value)})}),e.querySelectorAll(`.icon-select`).forEach(e=>{e.addEventListener(`change`,e=>{let t=parseInt(e.target.getAttribute(`data-index`));c[t]&&(c[t].icon=e.target.value,d())})}),e.querySelectorAll(`.color-select`).forEach(e=>{e.addEventListener(`change`,e=>{let t=parseInt(e.target.getAttribute(`data-index`));c[t]&&(c[t].color=e.target.value,d())})}),e.querySelector(`#start-game-btn`).addEventListener(`click`,()=>{t({mode:i,category:a,players:c.slice(0,r)})})};d()}var _=[{id:`easy`,name:`Leicht (40% Genauigkeit)`,rate:.4},{id:`medium`,name:`Normal (75% Genauigkeit)`,rate:.75},{id:`hard`,name:`Schwer (92% Genauigkeit)`,rate:.92},{id:`impossible`,name:`Unmöglich (99% Maestro)`,rate:.99}];function v(e,t){let n=document.createElement(`div`);n.className=`modal-overlay`;let r=`choose`,i=localStorage.getItem(`hitster_active_room`)||``,a=localStorage.getItem(`hitster_local_player_id`)||``,o=`classic`,s=!0,c=8,u=null,d=[],f=null,p=!1,m=[`#ff2b55`,`#00e5ff`,`#ffd700`,`#a855f7`,`#22c55e`,`#f97316`],g=e=>e.map((e,t)=>({id:e.id||`online-p-${t}`,name:e.name||`Spieler ${t+1}`,color:m[t%m.length],timeline:[],tokens:3,isHost:e.isHost||!1,isAI:e.isAI||!1,aiDifficulty:e.aiDifficulty||`medium`,aiIcon:e.aiIcon||`🤖`,isReady:e.isReady||!1})),v=async(e,t)=>{if(i)try{await fetch(`/api/rooms/update-mode`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({code:i,mode:e,isPrivate:t})})}catch{}},y=()=>{f&&=(clearInterval(f),null)},b=()=>{y(),f=setInterval(async()=>{if(i)try{let t=await fetch(`/api/rooms/poll?code=${encodeURIComponent(i)}`);if(t.ok){p=!1;let r=await t.json();if(d=r.players||[],r.mode&&(o=r.mode),r.isPrivate!==void 0&&(s=r.isPrivate),r.maxPlayers&&(c=r.maxPlayers),a){let e=d.find(e=>e.id===a);e&&(u=e)}let l=document.activeElement;l&&(l.tagName===`SELECT`||l.tagName===`INPUT`)&&n.contains(l)||x(),r.started&&u&&!u.isHost&&(y(),localStorage.removeItem(`hitster_active_room`),S(),e&&e(g(d),i,o))}else p=!0,x()}catch{p=!0,x()}},1500)},x=()=>{if(r===`choose`){n.innerHTML=`
        <div class="modal-content">
          <button class="modal-close-btn" id="close-lobby-btn">✕</button>

          <div style="text-align:center; margin-bottom:24px;">
            <span style="font-size:2.5rem;">🌐</span>
            <h2 style="font-family:var(--font-heading); font-size:2rem; font-weight:900; background:linear-gradient(90deg, #fff, var(--accent-cyan)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; margin-top:8px;">
              ${l(`onlineMultiplayer`)}
            </h2>
            <p style="color:var(--text-muted); font-size:0.9rem;">Spiele online mit Freunden oder KI-Gegnern über einen Raumcode!</p>
          </div>

          ${i&&a?`
            <div style="background:rgba(255,215,0,0.12); border:1.5px solid var(--accent-gold); padding:14px; border-radius:16px; margin-bottom:20px; text-align:center;">
              <div style="font-weight:800; color:var(--accent-gold); font-size:0.95rem; margin-bottom:6px;">
                🔄 Letzte Sitzung gefunden (${i})
              </div>
              <button class="btn-primary" id="rejoin-active-room-btn" style="width:100%; font-size:0.88rem; padding:10px; background:linear-gradient(135deg, var(--accent-gold), #b45309); color:#000;">
                Wiederbeitritt zu Raum ${i}
              </button>
            </div>
          `:``}

          <div class="form-group" style="margin-bottom:16px;">
            <input type="text" id="lobby-name-input" class="form-input" placeholder="Dein Spielername" value="Spieler 1" />
          </div>

          <div style="display:flex; flex-direction:column; gap:14px;">
            <button class="btn-primary" id="host-game-btn" style="padding:16px;">
              <span>👑</span>
              <span>Raum erstellen (Host)</span>
            </button>

            <button class="btn-secondary" id="join-game-btn" style="padding:16px;">
              <span>🔑</span>
              <span>Raum beitreten (Mit Code)</span>
            </button>
          </div>
        </div>
      `,n.querySelector(`#close-lobby-btn`).addEventListener(`click`,S);let e=n.querySelector(`#rejoin-active-room-btn`);e&&e.addEventListener(`click`,()=>{r=`lobby`,b(),x()}),n.querySelector(`#host-game-btn`).addEventListener(`click`,async()=>{let e=n.querySelector(`#lobby-name-input`).value.trim()||`Host`;try{let t=await fetch(`/api/rooms/create`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({name:e})});if(t.ok){let e=await t.json();i=e.code,u=e.player,a=e.player.id,d=e.players,localStorage.setItem(`hitster_active_room`,i),localStorage.setItem(`hitster_local_player_id`,a),r=`lobby`,b(),x()}}catch(e){console.error(`Failed to create room`,e)}}),n.querySelector(`#join-game-btn`).addEventListener(`click`,()=>{r=`join`,x()})}else if(r===`join`)n.innerHTML=`
        <div class="modal-content">
          <button class="modal-close-btn" id="close-lobby-btn">✕</button>

          <div style="text-align:center; margin-bottom:20px;">
            <h2 style="font-family:var(--font-heading); font-size:1.8rem; font-weight:900; color:#fff;">
              Raum beitreten
            </h2>
            <p style="color:var(--text-muted); font-size:0.85rem;">Gib den 6-stelligen Raumcode ein</p>
          </div>

          <div class="form-group">
            <input type="text" id="join-code-input" class="form-input" placeholder="z.B. HIT-9428" style="text-align:center; font-size:1.4rem; letter-spacing:2px; font-weight:800;" />
          </div>

          <div class="form-group">
            <input type="text" id="join-name-input" class="form-input" placeholder="Dein Spielername" value="Spieler 2" />
          </div>

          <div style="display:flex; gap:12px; margin-top:16px;">
            <button class="btn-secondary" id="back-step-btn" style="flex:1;">Zurück</button>
            <button class="btn-primary" id="confirm-join-btn" style="flex:2;">Beitreten</button>
          </div>
        </div>
      `,n.querySelector(`#close-lobby-btn`).addEventListener(`click`,S),n.querySelector(`#back-step-btn`).addEventListener(`click`,()=>{r=`choose`,x()}),n.querySelector(`#confirm-join-btn`).addEventListener(`click`,async()=>{let e=n.querySelector(`#join-code-input`).value.trim().toUpperCase(),t=n.querySelector(`#join-name-input`).value.trim()||`Mitspieler`;if(e)try{let n=await fetch(`/api/rooms/join`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({code:e,name:t})});if(n.ok){let e=await n.json();i=e.code,u=e.player,a=e.player.id,d=e.players,localStorage.setItem(`hitster_active_room`,i),localStorage.setItem(`hitster_local_player_id`,a),r=`lobby`,b(),x()}else alert(`Raumcode nicht gefunden!`)}catch{alert(`Fehler beim Beitreten!`)}});else if(r===`lobby`){let t=u&&u.isHost,r=d.length>=2,a=`https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=${encodeURIComponent(window.location.origin+`?room=`+i)}`;n.innerHTML=`
        <div class="modal-content" style="max-width:580px;">
          <button class="modal-close-btn" id="close-lobby-btn">✕</button>

          ${p?`
            <div style="background:rgba(255,43,85,0.2); border:1px solid var(--accent-red); color:var(--accent-red); padding:8px; border-radius:12px; text-align:center; font-weight:800; font-size:0.85rem; margin-bottom:12px; animation:pulse-glow 1.5s infinite alternate;">
              ⚠️ Verbindung getrennt... Versuch erneut zu verbinden.
            </div>
          `:``}

          <div style="background:rgba(0,0,0,0.3); border:1px solid var(--border-color); border-radius:18px; padding:16px; text-align:center; margin-bottom:16px;">
            <div style="display:flex; align-items:center; justify-content:center; gap:16px; flex-wrap:wrap;">
              <div>
                <span style="font-size:0.75rem; color:var(--text-muted); font-weight:800; text-transform:uppercase;">Online Raumcode</span>
                <div style="display:flex; align-items:center; gap:10px; margin-top:4px;">
                  <div style="font-family:var(--font-heading); font-size:2.2rem; font-weight:900; color:var(--accent-gold); letter-spacing:3px; text-shadow:0 0 20px var(--accent-gold-glow);">
                    ${i}
                  </div>
                  <button class="btn-secondary" id="copy-room-code-btn" style="padding:6px 12px; font-size:0.8rem; border-color:var(--accent-gold); color:var(--accent-gold);">
                    📋 Kopieren
                  </button>
                </div>
              </div>

              <div style="text-align:center; background:#fff; padding:6px; border-radius:12px; box-shadow:0 4px 15px rgba(0,0,0,0.4);">
                <img src="${a}" alt="QR Code" style="width:75px; height:75px; display:block;" />
                <span style="font-size:0.65rem; color:#000; font-weight:800;">📱 QR-Scan</span>
              </div>
            </div>

            <div id="copy-toast-msg" style="font-size:0.8rem; color:#22c55e; font-weight:800; margin-top:6px; display:none;">
              ✅ Raumcode in Zwischenablage kopiert!
            </div>
          </div>

          ${t?`
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:8px;">
              <div class="form-group" style="margin:0;">
                <label class="form-label" style="font-size:0.8rem;">Modus:</label>
                <select id="lobby-mode-select" class="form-select" style="padding:8px; font-size:0.85rem;">
                  <option value="classic" ${o===`classic`?`selected`:``}>${l(`modeClassic`)}</option>
                  <option value="pro" ${o===`pro`?`selected`:``}>${l(`modePro`)}</option>
                  <option value="expert" ${o===`expert`?`selected`:``}>${l(`modeExpert`)}</option>
                  <option value="coop" ${o===`coop`?`selected`:``}>${l(`modeCoop`)}</option>
                </select>
              </div>

              <div class="form-group" style="margin:0;">
                <label class="form-label" style="font-size:0.8rem;">Sichtbarkeit:</label>
                <button class="btn-secondary" id="toggle-privacy-btn" style="width:100%; padding:8px; font-size:0.85rem; justify-content:center;">
                  ${s?`🔒 Privater Raum`:`🌐 Öffentlicher Raum`}
                </button>
              </div>
            </div>

            <!-- DYNAMISCHE MODUS-ERKLÄRUNG IN DER ONLINE LOBBY -->
            <div id="lobby-mode-explanation" style="margin-bottom:14px; padding:8px 12px; background:rgba(0,229,255,0.08); border:1px solid var(--accent-cyan); border-radius:12px; font-size:0.82rem; color:var(--accent-cyan); font-weight:700;">
              ${h[o]||h.classic}
            </div>
          `:`
            <div style="background:rgba(255,255,255,0.06); padding:8px 14px; border-radius:12px; margin-bottom:6px; font-size:0.85rem; display:flex; justify-content:between;">
              <span><strong>Modus:</strong> ${o.toUpperCase()}</span>
              <span><strong>Raum:</strong> ${s?`🔒 Privat`:`🌐 Öffentlich`}</span>
            </div>
            <div style="margin-bottom:14px; padding:8px 12px; background:rgba(0,229,255,0.08); border:1px solid var(--accent-cyan); border-radius:12px; font-size:0.82rem; color:var(--accent-cyan); font-weight:700;">
              ${h[o]||h.classic}
            </div>
          `}

          <div class="form-group">
            <div style="display:flex; align-items:center; justify-content:between; margin-bottom:8px;">
              <label class="form-label" style="margin:0;">Teilnehmer (${d.length}/${c})</label>
              ${t?`
                <button class="btn-secondary" id="add-ai-btn" style="padding:4px 10px; font-size:0.75rem; border-color:var(--accent-cyan); color:var(--accent-cyan);">
                  + KI-Gegner hinzufügen
                </button>
              `:``}
            </div>

            <div style="display:flex; flex-direction:column; gap:8px; max-height:190px; overflow-y:auto; padding-right:4px;">
              ${d.map((e,n)=>`
                <div style="display:flex; align-items:center; justify-content:between; background:rgba(0,0,0,0.3); padding:8px 12px; border-radius:12px; border:1px solid ${e.id===(u?u.id:``)?`var(--accent-cyan)`:`var(--border-color)`};">
                  <div style="display:flex; align-items:center; gap:10px;">
                    <div style="width:32px; height:32px; border-radius:50%; background:${m[n%m.length]}; display:flex; align-items:center; justify-content:center; font-weight:800; color:#fff; font-size:0.9rem;">
                      ${e.isAI?e.aiIcon||`🤖`:e.isHost?`👑`:n+1}
                    </div>
                    <div>
                      <div style="font-weight:700; color:#fff; font-size:0.9rem; display:flex; align-items:center; gap:6px;">
                        ${e.name} ${e.id===(u?u.id:``)?`(Du)`:``}
                        ${e.isHost?`<span style="background:rgba(255,215,0,0.2); border:1px solid var(--accent-gold); color:var(--accent-gold); padding:1px 6px; border-radius:10px; font-size:0.65rem; font-weight:900;">👑 HOST</span>`:``}
                      </div>

                      ${e.isAI&&t?`
                        <select class="form-select inline-ai-diff" data-id="${e.id}" style="width:auto; padding:2px 6px; font-size:0.72rem; margin-top:2px;">
                          ${_.map(t=>`<option value="${t.id}" ${e.aiDifficulty===t.id?`selected`:``}>${t.name}</option>`).join(``)}
                        </select>
                      `:`
                        <div style="font-size:0.75rem; color:${e.isReady?`#22c55e`:`var(--text-muted)`}; font-weight:700;">
                          ${e.isReady?`🟢 Bereit`:`🔴 Nicht bereit`}
                        </div>
                      `}
                    </div>
                  </div>

                  <div style="display:flex; align-items:center; gap:8px;">
                    ${e.id===(u?u.id:``)&&!e.isHost?`
                      <button class="btn-secondary toggle-ready-btn" style="padding:4px 10px; font-size:0.75rem; ${e.isReady?`background:#22c55e; color:#fff; border-color:#22c55e;`:``}">
                        ${e.isReady?`🟢 Bereit`:`🔴 Bereit melden`}
                      </button>
                    `:``}

                    ${t&&!e.isHost?`
                      <button class="kick-player-btn" data-id="${e.id}" style="background:rgba(255,43,85,0.15); border:1px solid var(--accent-red); color:var(--accent-red); padding:4px 8px; border-radius:8px; font-size:0.75rem; font-weight:800; cursor:pointer;" title="Spieler entfernen">
                        ✕ Kick
                      </button>
                    `:``}
                  </div>
                </div>
              `).join(``)}
            </div>
          </div>

          <div style="margin-top:16px;">
            ${t?`
              <button class="btn-primary" id="start-online-game-btn" ${r?``:`disabled style="opacity:0.5; cursor:not-allowed;"`} style="width:100%; padding:14px; font-size:1.05rem;">
                ${r?`🚀 Online-Runde starten`:`⏳ Warten auf mindestens 2 Teilnehmer...`}
              </button>
            `:`
              <div style="text-align:center; color:var(--accent-cyan); font-weight:700; padding:10px; background:rgba(0,229,255,0.1); border-radius:12px;">
                Warten auf Host zum Starten der Runde...
              </div>
            `}
          </div>
        </div>
      `,n.querySelector(`#close-lobby-btn`).addEventListener(`click`,()=>{y(),localStorage.removeItem(`hitster_active_room`),S()}),n.querySelector(`#copy-room-code-btn`).addEventListener(`click`,()=>{try{navigator.clipboard.writeText(i);let e=n.querySelector(`#copy-toast-msg`);e&&(e.style.display=`block`,setTimeout(()=>{e.style.display=`none`},2500))}catch{}});let f=n.querySelector(`.toggle-ready-btn`);if(f&&u&&f.addEventListener(`click`,async()=>{u.isReady=!u.isReady,x()}),t){let t=n.querySelector(`#lobby-mode-select`),a=n.querySelector(`#lobby-mode-explanation`);t&&t.addEventListener(`change`,async e=>{o=e.target.value,a&&(a.innerHTML=h[o]||h.classic),await v(o,s)});let l=n.querySelector(`#toggle-privacy-btn`);l&&l.addEventListener(`click`,async()=>{s=!s,await v(o,s),x()});let u=n.querySelector(`#add-ai-btn`);u&&u.addEventListener(`click`,async()=>{if(d.length>=c)return;let e=[`Hitster Bot`,`Beat Master`,`Retro Bot`,`Disco KI`,`Synth Bot`],t=`${e[Math.floor(Math.random()*e.length)]} ${d.length+1}`;try{let e=await fetch(`/api/rooms/add-ai`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({code:i,name:t,difficulty:`medium`})});e.ok&&(d=(await e.json()).players,x())}catch{}}),n.querySelectorAll(`.kick-player-btn`).forEach(e=>{e.addEventListener(`click`,async e=>{let t=e.currentTarget.getAttribute(`data-id`);d=d.filter(e=>e.id!==t),x()})}),n.querySelectorAll(`.inline-ai-diff`).forEach(e=>{e.addEventListener(`change`,e=>{let t=e.target.getAttribute(`data-id`),n=d.find(e=>e.id===t);n&&(n.aiDifficulty=e.target.value)})});let f=n.querySelector(`#start-online-game-btn`);f&&r&&f.addEventListener(`click`,async()=>{try{await fetch(`/api/rooms/start`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({code:i,mode:o})}),y(),localStorage.removeItem(`hitster_active_room`),S(),e&&e(g(d),i,o)}catch{y(),localStorage.removeItem(`hitster_active_room`),S(),e&&e(g(d),i,o)}})}}},S=()=>{y(),n.remove(),t&&t()};x(),document.body.appendChild(n)}var y=new Map;async function b(e,t,n=``){let r=`${e} - ${t}`.toLowerCase();if(y.has(r))return y.get(r);try{let n=await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(e+` `+t)}&media=music&limit=1`,{signal:AbortSignal.timeout(3500)});if(n.ok){let e=await n.json();if(e.results&&e.results.length>0&&e.results[0].previewUrl){let t=e.results[0].previewUrl;return y.set(r,t),t}}}catch(e){console.warn(`iTunes API query skipped`,e)}for(let n of[`https://pipedapi.kavin.rocks`,`https://api.piped.video`,`https://invidious.nerdvpn.de`])try{let i=await fetch(`${n}/search?q=${encodeURIComponent(e+` `+t)}&filter=music_songs`,{signal:AbortSignal.timeout(3e3)});if(i.ok){let e=await i.json(),t=e.items||e;if(t&&t.length>0){let e=t[0].url?t[0].url.replace(`/watch?v=`,``):t[0].videoId||t[0].id;if(e){let t=await fetch(`${n}/streams/${e}`,{signal:AbortSignal.timeout(3e3)});if(t.ok){let e=(await t.json()).audioStreams;if(e&&e.length>0){e.sort((e,t)=>(t.bitrate||0)-(e.bitrate||0));let t=e[0].url;return y.set(r,t),t}}}}}}catch{}return n}var x=new class{constructor(){this.audioElement=document.getElementById(`global-audio-player`),this.isPlaying=!1,this.currentTrack=null,this.volume=.8,this.currentTime=0,this.duration=30,this.listeners=[],this.pendingPlayPromise=null,this.audioElement&&(this.audioElement.volume=this.volume,this.audioElement.addEventListener(`ended`,()=>{this.isPlaying=!1,this.notify()}),this.audioElement.addEventListener(`pause`,()=>{this.isPlaying=!1,this.notify()}),this.audioElement.addEventListener(`play`,()=>{this.isPlaying=!0,this.notify()}),this.audioElement.addEventListener(`timeupdate`,()=>{this.currentTime=this.audioElement.currentTime||0,this.duration=this.audioElement.duration||30,this.notify()}),this.audioElement.addEventListener(`error`,async e=>{if(console.warn(`Audio load error on current URL, attempting live stream resolution...`,e),this.currentTrack&&!this.currentTrack.fallbackTried){this.currentTrack.fallbackTried=!0;try{let e=await b(this.currentTrack.artist,this.currentTrack.title,this.currentTrack.audioUrl);e&&e!==this.audioElement.src&&(this.audioElement.src=e,this.audioElement.play().catch(e=>console.warn(`Live stream fallback play error`,e)))}catch(e){console.error(`Live stream resolution failed`,e)}}}))}async playTrack(e){if(!this.audioElement)return;if(this.currentTrack&&this.currentTrack.id===e.id){if(this.isPlaying)this.audioElement.pause(),this.isPlaying=!1;else try{this.pendingPlayPromise=this.audioElement.play(),await this.pendingPlayPromise,this.isPlaying=!0}catch(e){e.name!==`AbortError`&&console.warn(`Play error`,e)}this.notify();return}this.currentTrack=e,this.currentTrack.fallbackTried=!1;let t=e.audioUrl;if(e.audioUrl&&e.audioUrl.startsWith(`/api/`))try{let n=await b(e.artist,e.title,e.audioUrl);n&&(t=n)}catch(e){console.warn(`API stream resolution fallback`,e)}this.audioElement.src=t,this.audioElement.onloadedmetadata=()=>{this.audioElement.duration>30?this.audioElement.currentTime=Math.floor(Math.random()*15)+10:this.audioElement.currentTime=0,this.duration=this.audioElement.duration||30,this.notify()};try{this.pendingPlayPromise=this.audioElement.play(),await this.pendingPlayPromise,this.isPlaying=!0}catch(t){if(t.name!==`AbortError`&&(console.warn(`Audio initial play deferred`,t),!this.currentTrack.fallbackTried)){this.currentTrack.fallbackTried=!0;let t=await b(e.artist,e.title,e.audioUrl);t&&(this.audioElement.src=t,this.audioElement.play().catch(e=>console.warn(`Retry play error`,e)))}}this.notify()}pause(){this.audioElement&&(this.audioElement.pause(),this.isPlaying=!1,this.notify())}stop(){this.audioElement&&(this.audioElement.pause(),this.audioElement.currentTime=0,this.isPlaying=!1,this.currentTrack=null,this.notify())}setVolume(e){this.volume=Math.max(0,Math.min(1,e)),this.audioElement&&(this.audioElement.volume=this.volume),this.notify()}seek(e){this.audioElement&&!isNaN(e)&&(this.audioElement.currentTime=e,this.currentTime=e,this.notify())}subscribe(e){this.listeners.push(e)}notify(){this.listeners.forEach(e=>e({isPlaying:this.isPlaying,currentTrack:this.currentTrack,volume:this.volume,currentTime:this.currentTime,duration:this.duration}))}};function S(e){let t=document.createElement(`div`);t.className=`modal-overlay`;let n=`audio`,r=Math.round(x.volume*100),a=localStorage.getItem(`hitster_sfx_enabled`)!==`false`,o=localStorage.getItem(`hitster_ambient_bg`)!==`false`,l=document.body.classList.contains(`reduce-animations`),d=()=>{t.innerHTML=`
      <div class="modal-content settings-modal-large" style="max-width:680px; width:92%;">
        <button class="modal-close-btn" id="close-settings-btn">✕</button>

        <!-- Modal Header -->
        <div style="text-align:center; padding-bottom:14px; border-bottom:1px solid var(--border-color); margin-bottom:16px;">
          <div style="display:inline-flex; align-items:center; justify-content:center; width:50px; height:50px; border-radius:50%; background:rgba(0,229,255,0.15); border:1px solid var(--accent-cyan); color:var(--accent-cyan); margin-bottom:8px;">
            ${u(`settings`,26)}
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
          <button class="settings-tab-btn ${n===`audio`?`active`:``}" data-tab="audio" style="flex:1; padding:10px 14px; border-radius:10px; border:none; background:${n===`audio`?`linear-gradient(135deg, var(--accent-red), #c026d3)`:`transparent`}; color:#fff; font-family:var(--font-heading); font-weight:800; font-size:0.85rem; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px; white-space:nowrap;">
            ${u(`volume2`,16)} Audio & Sound
          </button>

          <button class="settings-tab-btn ${n===`graphics`?`active`:``}" data-tab="graphics" style="flex:1; padding:10px 14px; border-radius:10px; border:none; background:${n===`graphics`?`linear-gradient(135deg, var(--accent-cyan), #2563eb)`:`transparent`}; color:#fff; font-family:var(--font-heading); font-weight:800; font-size:0.85rem; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px; white-space:nowrap;">
            ${u(`palette`,16)} Grafik & Effekte
          </button>

          <button class="settings-tab-btn ${n===`gameplay`?`active`:``}" data-tab="gameplay" style="flex:1; padding:10px 14px; border-radius:10px; border:none; background:${n===`gameplay`?`linear-gradient(135deg, var(--accent-gold), #b45309)`:`transparent`}; color:${n===`gameplay`?`#000`:`#fff`}; font-family:var(--font-heading); font-weight:800; font-size:0.85rem; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px; white-space:nowrap;">
            ${u(`trophy`,16)} Gameplay
          </button>
        </div>

        <!-- Tab Body Content -->
        <div class="settings-tab-content" style="display:flex; flex-direction:column; gap:16px;">
          ${n===`audio`?`
            <!-- AUDIO SETTINGS -->
            <div class="settings-group-card" style="background:rgba(22,32,70,0.6); border:1px solid var(--border-color); padding:16px; border-radius:16px;">
              <div style="display:flex; justify-content:between; align-items:center; margin-bottom:10px;">
                <label class="form-label" style="margin:0; font-size:0.95rem; font-weight:800; color:#fff; display:flex; align-items:center; gap:8px;">
                  ${u(`volume2`,18)} Master-Lautstärke
                </label>
                <span style="font-family:var(--font-heading); font-weight:900; color:var(--accent-cyan); font-size:1.1rem;" id="volume-val-label">${r}%</span>
              </div>
              <input type="range" id="settings-volume-slider" class="volume-slider" min="0" max="100" value="${r}" style="width:100%; height:8px;" />
            </div>

            <div class="settings-group-card" style="background:rgba(22,32,70,0.6); border:1px solid var(--border-color); padding:16px; border-radius:16px; display:flex; align-items:center; justify-content:between;">
              <div>
                <div style="font-weight:800; color:#fff; font-size:0.95rem;">🔊 Sound-Effekte (Fanfaren & Beeps)</div>
                <div style="font-size:0.78rem; color:var(--text-muted); margin-top:2px;">Spiele Web Audio Töne bei Countdown & Gewinn ab</div>
              </div>
              <button class="btn-secondary" id="toggle-sfx-btn" style="padding:8px 16px; font-weight:800; border-color:${a?`#22c55e`:`var(--border-color)`}; color:${a?`#22c55e`:`var(--text-muted)`};">
                ${a?`🟢 AN`:`🔴 AUS`}
              </button>
            </div>
          `:``}

          ${n===`graphics`?`
            <!-- GRAPHICS & EFFECTS SETTINGS -->
            <div class="settings-group-card" style="background:rgba(22,32,70,0.6); border:1px solid var(--border-color); padding:16px; border-radius:16px; display:flex; align-items:center; justify-content:between;">
              <div>
                <div style="font-weight:800; color:#fff; font-size:0.95rem;">🌊 Dynamischer Ambient-Hintergrund</div>
                <div style="font-size:0.78rem; color:var(--text-muted); margin-top:2px;">Langsam fließende Farbübergänge im Hintergrund</div>
              </div>
              <button class="btn-secondary" id="toggle-ambient-btn" style="padding:8px 16px; font-weight:800; border-color:${o?`#22c55e`:`var(--border-color)`}; color:${o?`#22c55e`:`var(--text-muted)`};">
                ${o?`🟢 AN`:`🔴 AUS`}
              </button>
            </div>

            <div class="settings-group-card" style="background:rgba(22,32,70,0.6); border:1px solid var(--border-color); padding:16px; border-radius:16px; display:flex; align-items:center; justify-content:between;">
              <div>
                <div style="font-weight:800; color:#fff; font-size:0.95rem;">✨ Reduzierte Animationen (Performance-Modus)</div>
                <div style="font-size:0.78rem; color:var(--text-muted); margin-top:2px;">Schaltet rechenintensive Effekte für ältere Geräte aus</div>
              </div>
              <button class="btn-secondary" id="toggle-reduced-anim-btn" style="padding:8px 16px; font-weight:800; border-color:${l?`#22c55e`:`var(--border-color)`}; color:${l?`#22c55e`:`var(--text-muted)`};">
                ${l?`🟢 AN`:`🔴 AUS`}
              </button>
            </div>
          `:``}

          ${n===`gameplay`?`
            <!-- GAMEPLAY SETTINGS -->
            <div class="settings-group-card" style="background:rgba(22,32,70,0.6); border:1px solid var(--border-color); padding:16px; border-radius:16px;">
              <label class="form-label" style="font-size:0.95rem; font-weight:800; color:#fff; margin-bottom:8px;">
                🌐 Hauptsprache / Language
              </label>
              <select id="settings-lang-select" class="form-select">
                ${i.map(e=>`
                  <option value="${e.code}" ${e.code===s()?`selected`:``}>
                    ${e.flag} ${e.name}
                  </option>
                `).join(``)}
              </select>
            </div>
          `:``}
        </div>

        <!-- Footer Action Bar -->
        <div style="margin-top:20px; padding-top:14px; border-top:1px solid var(--border-color); text-align:center;">
          <button class="btn-primary" id="save-settings-btn" style="min-width:200px; padding:12px 28px;">
            ✅ Speichern & Schließen
          </button>
        </div>
      </div>
    `,t.querySelector(`#close-settings-btn`).addEventListener(`click`,f),t.querySelector(`#save-settings-btn`).addEventListener(`click`,f),t.querySelectorAll(`.settings-tab-btn`).forEach(e=>{e.addEventListener(`click`,e=>{n=e.currentTarget.getAttribute(`data-tab`),d()})});let e=t.querySelector(`#settings-volume-slider`);e&&e.addEventListener(`input`,e=>{r=parseInt(e.target.value),x.setVolume(r/100);let n=t.querySelector(`#volume-val-label`);n&&(n.innerHTML=`${r}%`)});let p=t.querySelector(`#toggle-sfx-btn`);p&&p.addEventListener(`click`,()=>{a=!a,localStorage.setItem(`hitster_sfx_enabled`,a?`true`:`false`),d()});let m=t.querySelector(`#toggle-ambient-btn`);m&&m.addEventListener(`click`,()=>{o=!o,localStorage.setItem(`hitster_ambient_bg`,o?`true`:`false`),d()});let h=t.querySelector(`#toggle-reduced-anim-btn`);h&&h.addEventListener(`click`,()=>{l=!l,l?document.body.classList.add(`reduce-animations`):document.body.classList.remove(`reduce-animations`),d()});let g=t.querySelector(`#settings-lang-select`);g&&g.addEventListener(`change`,e=>{c(e.target.value)})},f=()=>{t.remove(),e&&e()};d(),document.body.appendChild(t)}function C(e,t,n){e.innerHTML=`
    <!-- Top Navbar -->
    <header class="navbar">
      <div class="logo-brand">
        <div class="logo-icon">H</div>
        <div class="logo-text">${l(`appTitle`)}</div>
      </div>

      <div class="nav-actions">
        <!-- Language Switcher -->
        <select id="lang-select" class="form-select" style="width:auto; padding:6px 12px; font-size:0.85rem;">
          ${i.map(e=>`
            <option value="${e.code}" ${e.code===s()?`selected`:``}>
              ${e.flag} ${e.name}
            </option>
          `).join(``)}
        </select>

        <button class="btn-icon" id="open-color-btn" title="${l(`colorCustomizer`)}">
          ${u(`palette`,18)}
        </button>

        <button class="btn-icon" id="open-stats-btn" title="${l(`highscores`)}">
          ${u(`trophy`,18)}
        </button>

        <button class="btn-icon" id="open-rules-btn" title="${l(`rules`)}">
          ${u(`helpCircle`,18)}
        </button>
      </div>
    </header>

    <!-- Main Hero Screen -->
    <main class="main-menu">
      <div class="hero-title-container">
        <div class="hero-badge">1900 – 2026 EDITION</div>
        <h1 class="hero-title">${l(`appTitle`)}</h1>
        <p class="hero-subtitle">${l(`appSubtitle`)}</p>
      </div>

      <!-- Spinning Vinyl Disc Graphic -->
      <div class="vinyl-disc"></div>

      <!-- VARIANTE B: ZWEI GROSSE HAUPTAKTIONEN -->
      <div class="main-primary-actions-grid">
        <div class="primary-hero-card" id="menu-local-play">
          <div class="primary-hero-icon">${u(`users`,44)}</div>
          <div class="primary-hero-title">${l(`localMultiplayer`)}</div>
          <div class="primary-hero-desc">1 – 8 Spieler auf 1 Gerät (Pass & Play)</div>
        </div>

        <div class="primary-hero-card online-card" id="menu-online-play">
          <div class="primary-hero-icon">${u(`globe`,44)}</div>
          <div class="primary-hero-title">${l(`onlineMultiplayer`)}</div>
          <div class="primary-hero-desc">Mit Raumcode & Freunden online spielen</div>
        </div>
      </div>

      <!-- KLEINERE NEBENAKTIONEN -->
      <div class="secondary-actions-grid">
        <div class="secondary-card-btn" id="menu-rules">
          <div class="secondary-card-icon">${u(`bookOpen`,22)}</div>
          <div class="secondary-card-text">
            <div class="secondary-card-title">Spielanleitung</div>
            <div class="secondary-card-desc">Regeln & Modi</div>
          </div>
        </div>

        <div class="secondary-card-btn" id="menu-customizer">
          <div class="secondary-card-icon">${u(`palette`,22)}</div>
          <div class="secondary-card-text">
            <div class="secondary-card-title">Designs</div>
            <div class="secondary-card-desc">180M Farben</div>
          </div>
        </div>

        <div class="secondary-card-btn" id="menu-stats">
          <div class="secondary-card-icon">${u(`barChart`,22)}</div>
          <div class="secondary-card-text">
            <div class="secondary-card-title">Statistiken</div>
            <div class="secondary-card-desc">Highscores</div>
          </div>
        </div>

        <div class="secondary-card-btn" id="menu-settings">
          <div class="secondary-card-icon">${u(`settings`,22)}</div>
          <div class="secondary-card-text">
            <div class="secondary-card-title">Einstellungen</div>
            <div class="secondary-card-desc">Optionen & Audio</div>
          </div>
        </div>
      </div>
    </main>
  `,e.querySelector(`#lang-select`).addEventListener(`change`,r=>{c(r.target.value),C(e,t,n)}),e.querySelector(`#open-color-btn`).addEventListener(`click`,()=>f()),e.querySelector(`#menu-customizer`).addEventListener(`click`,()=>f()),e.querySelector(`#open-stats-btn`).addEventListener(`click`,()=>p()),e.querySelector(`#menu-stats`).addEventListener(`click`,()=>p()),e.querySelector(`#open-rules-btn`).addEventListener(`click`,()=>d()),e.querySelector(`#menu-rules`).addEventListener(`click`,()=>d()),e.querySelector(`#menu-settings`).addEventListener(`click`,()=>S()),e.querySelector(`#menu-local-play`).addEventListener(`click`,()=>{t&&t()}),e.querySelector(`#menu-online-play`).addEventListener(`click`,()=>{v(e=>{n&&n(e)})})}var w=[{id:`local-2016-1`,year:2016,artist:`Bon Jovi`,title:`This House Is Not For Sale`,isLocal:!0,audioUrl:`./Songs%20(Zum%20Erraten%20und%20Abspielen)/2016/Bon%20Jovi%20-%20This%20House%20Is%20Not%20For%20Sale.mp3`,spotifyUri:`spotify:track:59aW5uE8X8zW1hI5E4M9`,spotifyUrl:`https://open.spotify.com/track/59aW5uE8X8zW1hI5E4M9`,genre:`Rock`},{id:`local-2016-2`,year:2016,artist:`Charlie Puth ft. Selena Gomez`,title:`We Don't Talk Anymore`,isLocal:!0,audioUrl:`./Songs%20(Zum%20Erraten%20und%20Abspielen)/2016/Charlie%20Puth%20-%20We%20Don't%20Talk%20Anymore%20(feat.%20Selena%20Gomez).mp3`,spotifyUri:`spotify:track:37F02C6viTC92fM0cKG1aP`,spotifyUrl:`https://open.spotify.com/track/37F02C6viTC92fM0cKG1aP`,genre:`Pop`},{id:`local-2016-3`,year:2016,artist:`Drake ft. WizKid & Kyla`,title:`One Dance`,isLocal:!0,audioUrl:`./Songs%20(Zum%20Erraten%20und%20Abspielen)/2016/One%20Dance%20(feat.%20WizKid%20&%20Kyla)%20-%20Drake.mp3`,spotifyUri:`spotify:track:1xwhpI2fC1nB5Zz3x608x1`,spotifyUrl:`https://open.spotify.com/track/1xwhpI2fC1nB5Zz3x608x1`,genre:`Hip-Hop / Dancehall`},{id:`local-2016-4`,year:2016,artist:`Rihanna ft. Drake`,title:`Work`,isLocal:!0,audioUrl:`./Songs%20(Zum%20Erraten%20und%20Abspielen)/2016/Rihanna%20-%20Work%20ft.%20Drake.mp3`,spotifyUri:`spotify:track:722x2wGvP4gebNLX3uStmR`,spotifyUrl:`https://open.spotify.com/track/722x2wGvP4gebNLX3uStmR`,genre:`Pop / R&B`},{id:`ab-2003-1`,year:2003,artist:`Andreas Bourani`,title:`König für eine Nacht`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/a4/cf/c9/a4cfc968-3e4e-0a56-2580-0a86db9d7b42/mzaf_13508713028308890940.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/Konig%20fur%20eine%20Nacht%20Bourani`,genre:`Deutschpop Early Single`},{id:`ab-2011-1`,year:2011,artist:`Andreas Bourani`,title:`Nur in meinem Kopf`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/f4/04/b3/f404b322-6b9f-07ef-f8a1-5f252dfa7c7c/mzaf_10574044567223000627.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/Nur%20in%20meinem%20Kopf`,genre:`Deutschpop Single`},{id:`ab-2011-2`,year:2011,artist:`Andreas Bourani`,title:`Eisberg`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/23/e8/cf/23e8cf43-5757-cfb5-6807-6bb9f644b931/mzaf_6560410427958197779.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/Eisberg%20Andreas%20Bourani`,genre:`Deutschpop Single`},{id:`ab-2011-3`,year:2011,artist:`Andreas Bourani`,title:`Du lässt dich gehen`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/64/7b/72/647b72db-5c74-2790-2525-24c65a44ef62/mzaf_6753177677461821808.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/Du%20lasst%20dich%20gehen`,genre:`Deutschpop`},{id:`ab-2011-4`,year:2011,artist:`Andreas Bourani`,title:`Du und ich und sie`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/80/f3/9d/80f39d1b-aa45-2882-e25f-2c0695029e84/mzaf_10793616616422329712.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/Du%20und%20ich%20und%20sie`,genre:`Deutschpop`},{id:`ab-2011-5`,year:2011,artist:`Andreas Bourani`,title:`Eden für dich`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/d5/07/ee/d507ee83-7c85-2e5b-38d5-39d67efcb4f9/mzaf_10522197607738202534.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/Eden%20fur%20dich`,genre:`Deutschpop`},{id:`ab-2011-6`,year:2011,artist:`Andreas Bourani`,title:`Fremder Planet`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/d6/37/ef/d637eff2-0b73-0599-4d6d-d128df626c9d/mzaf_17208976472251025547.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/Fremder%20Planet%20Bourani`,genre:`Deutschpop`},{id:`ab-2011-7`,year:2011,artist:`Andreas Bourani`,title:`Frieden`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/21/2e/0f/212e0f2f-10bc-9e12-4c28-986c0cf29bcf/mzaf_1350175510696950294.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/Frieden%20Andreas%20Bourani`,genre:`Deutschpop`},{id:`ab-2011-8`,year:2011,artist:`Andreas Bourani`,title:`Glück`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/31/53/ee/3153ee04-9549-3db1-e1ef-b924b4550ef8/mzaf_6455325851410196885.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/Gluck%20Andreas%20Bourani`,genre:`Deutschpop`},{id:`ab-2011-9`,year:2011,artist:`Andreas Bourani`,title:`Mit der Zeit`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/8e/5e/54/8e5e5461-84aa-fa0e-4050-8b4ef26871c8/mzaf_8435133614210639912.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/Mit%20der%20Zeit%20Bourani`,genre:`Deutschpop`},{id:`ab-2011-10`,year:2011,artist:`Andreas Bourani`,title:`Sicher`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/a4/cf/c9/a4cfc968-3e4e-0a56-2580-0a86db9d7b42/mzaf_13508713028308890940.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/Sicher%20Andreas%20Bourani`,genre:`Deutschpop`},{id:`ab-2011-11`,year:2011,artist:`Andreas Bourani`,title:`So leicht so schwer`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/80/7e/e7/807ee72f-5136-1e66-be8d-7fbef715696d/mzaf_8576402446757106093.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/So%20leicht%20so%20schwer`,genre:`Deutschpop`},{id:`ab-2011-12`,year:2011,artist:`Andreas Bourani`,title:`Wunder`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/21/df/b8/21dfb858-6938-1ee4-c7b9-b883bd937d2f/mzaf_16489370005740924976.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/Wunder%20Andreas%20Bourani`,genre:`Deutschpop`},{id:`ab-2012-1`,year:2012,artist:`Unheilig feat. Andreas Bourani`,title:`Wie wir waren`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/f4/04/b3/f404b322-6b9f-07ef-f8a1-5f252dfa7c7c/mzaf_10574044567223000627.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/Wie%20wir%20waren%20Unheilig`,genre:`Deutschpop Collaboration`},{id:`ab-2013-1`,year:2013,artist:`Tom Hengelbrock feat. Andreas Bourani`,title:`Bei Dir`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/23/e8/cf/23e8cf43-5757-cfb5-6807-6bb9f644b931/mzaf_6560410427958197779.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/Bei%20Dir%20Tom%20Hengelbrock`,genre:`Dein Song Sampler`},{id:`ab-2014-1`,year:2014,artist:`Andreas Bourani`,title:`Auf uns`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/64/7b/72/647b72db-5c74-2790-2525-24c65a44ef62/mzaf_6753177677461821808.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/Auf%20uns%20Andreas%20Bourani`,genre:`World Cup Anthem 2014`},{id:`ab-2014-2`,year:2014,artist:`Andreas Bourani`,title:`Auf anderen Wegen`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/80/f3/9d/80f39d1b-aa45-2882-e25f-2c0695029e84/mzaf_10793616616422329712.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/Auf%20anderen%20Wegen`,genre:`Deutschpop Single`},{id:`ab-2014-3`,year:2014,artist:`Andreas Bourani`,title:`Alles beim Alten`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/d5/07/ee/d507ee83-7c85-2e5b-38d5-39d67efcb4f9/mzaf_10522197607738202534.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/Alles%20beim%20Alten%20Bourani`,genre:`Deutschpop`},{id:`ab-2014-4`,year:2014,artist:`Andreas Bourani`,title:`Delirium`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/d6/37/ef/d637eff2-0b73-0599-4d6d-d128df626c9d/mzaf_17208976472251025547.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/Delirium%20Andreas%20Bourani`,genre:`Deutschpop`},{id:`ab-2014-5`,year:2014,artist:`Andreas Bourani`,title:`Ein Ende nach dem Andern`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/21/2e/0f/212e0f2f-10bc-9e12-4c28-986c0cf29bcf/mzaf_1350175510696950294.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/Ein%20Ende%20nach%20dem%20Andern`,genre:`Deutschpop`},{id:`ab-2014-6`,year:2014,artist:`Andreas Bourani`,title:`Füreinander gemacht`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/31/53/ee/3153ee04-9549-3db1-e1ef-b924b4550ef8/mzaf_6455325851410196885.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/Fureinander%20gemacht`,genre:`Deutschpop`},{id:`ab-2014-7`,year:2014,artist:`Andreas Bourani`,title:`Hey`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/8e/5e/54/8e5e5461-84aa-fa0e-4050-8b4ef26871c8/mzaf_8435133614210639912.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/Hey%20Andreas%20Bourani`,genre:`Deutschpop Title Track`},{id:`ab-2014-8`,year:2014,artist:`Andreas Bourani`,title:`Nimm meine Hand`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/a4/cf/c9/a4cfc968-3e4e-0a56-2580-0a86db9d7b42/mzaf_13508713028308890940.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/Nimm%20meine%20Hand%20Bourani`,genre:`Deutschpop`},{id:`ab-2014-9`,year:2014,artist:`Andreas Bourani`,title:`Refugium`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/80/7e/e7/807ee72f-5136-1e66-be8d-7fbef715696d/mzaf_8576402446757106093.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/Refugium%20Andreas%20Bourani`,genre:`Deutschpop`},{id:`ab-2014-10`,year:2014,artist:`Andreas Bourani`,title:`Sein`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/21/df/b8/21dfb858-6938-1ee4-c7b9-b883bd937d2f/mzaf_16489370005740924976.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/Sein%20Andreas%20Bourani`,genre:`Deutschpop`},{id:`ab-2014-11`,year:2014,artist:`Andreas Bourani`,title:`Ultraleicht`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/f4/04/b3/f404b322-6b9f-07ef-f8a1-5f252dfa7c7c/mzaf_10574044567223000627.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/Ultraleicht%20Andreas%20Bourani`,genre:`Deutschpop Single`},{id:`ab-2014-12`,year:2014,artist:`Andreas Bourani`,title:`Was tut Dir gut`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/23/e8/cf/23e8cf43-5757-cfb5-6807-6bb9f644b931/mzaf_6560410427958197779.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/Was%20tut%20Dir%20gut`,genre:`Deutschpop`},{id:`ab-2014-13`,year:2014,artist:`Andreas Bourani`,title:`Wieder am Leben`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/64/7b/72/647b72db-5c74-2790-2525-24c65a44ef62/mzaf_6753177677461821808.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/Wieder%20am%20Leben%20Bourani`,genre:`Deutschpop`},{id:`ab-2014-14`,year:2014,artist:`Andreas Bourani`,title:`Zusammen untergegangen`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/80/f3/9d/80f39d1b-aa45-2882-e25f-2c0695029e84/mzaf_10793616616422329712.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/Zusammen%20untergegangen`,genre:`Deutschpop`},{id:`ab-2015-1`,year:2015,artist:`Sido feat. Andreas Bourani`,title:`Astronaut`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/d6/37/ef/d637eff2-0b73-0599-4d6d-d128df626c9d/mzaf_17208976472251025547.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/Astronaut%20Sido`,genre:`Deutschrap Legend Single`},{id:`ab-2015-2`,year:2015,artist:`Andreas Bourani`,title:`Für dich (Sing meinen Song)`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/21/2e/0f/212e0f2f-10bc-9e12-4c28-986c0cf29bcf/mzaf_1350175510696950294.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/Fur%20dich%20Andreas%20Bourani`,genre:`Sing meinen Song Cover`},{id:`ab-2015-3`,year:2015,artist:`Andreas Bourani`,title:`Funkelperlenaugen (Sing meinen Song)`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/31/53/ee/3153ee04-9549-3db1-e1ef-b924b4550ef8/mzaf_6455325851410196885.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/Funkelperlenaugen%20Bourani`,genre:`Sing meinen Song Cover`},{id:`ab-2015-4`,year:2015,artist:`Andreas Bourani`,title:`Schlaflied (Sing meinen Song)`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/8e/5e/54/8e5e5461-84aa-fa0e-4050-8b4ef26871c8/mzaf_8435133614210639912.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/Schlaflied%20Andreas%20Bourani`,genre:`Sing meinen Song Cover`},{id:`ab-2021-1`,year:2021,artist:`Clueso feat. Andreas Bourani`,title:`Willkommen zurück`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/a4/cf/c9/a4cfc968-3e4e-0a56-2580-0a86db9d7b42/mzaf_13508713028308890940.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/Willkommen%20zuruck%20Clueso`,genre:`Deutschpop Feature Single`},{id:`lk-1994-1`,year:1994,artist:`Carmen Twillie & Lebo M`,title:`Circle of Life (Der Ewige Kreis)`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/a4/cf/c9/a4cfc968-3e4e-0a56-2580-0a86db9d7b42/mzaf_13508713028308890940.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/Circle%20of%20Life`,genre:`Lion King OST`},{id:`lk-1994-4`,year:1994,artist:`Nathan Lane, Ernie Sabella`,title:`Hakuna Matata`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/f4/04/b3/f404b322-6b9f-07ef-f8a1-5f252dfa7c7c/mzaf_10574044567223000627.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/Hakuna%20Matata`,genre:`Lion King OST`},{id:`q-1975-1`,year:1975,artist:`Queen`,title:`Bohemian Rhapsody`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/a4/08/94/a4089456-f489-ebae-bfa4-bb86a8aefecb/mzaf_15015243644485501865.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/track/7tFiyTwD0S5Vo81uC1uJH5`,genre:`Rock`},{id:`em-2002-1`,year:2002,artist:`Eminem`,title:`Without Me`,isLocal:!1,audioUrl:`https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/bf/16/be/bf16be02-b258-2917-fa16-e578fa9e5306/mzaf_10344445887201738725.plus.aac.p.m4a`,spotifyUrl:`https://open.spotify.com/search/Eminem%20Without%20Me`,genre:`Hip-Hop`}];function T(e,t=`Hitster Song`){return`
    <div class="spotify-qr-wrapper" style="display:flex; flex-direction:column; align-items:center; gap:8px;">
      <img src="${`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(e||`https://spotify.com`)}&color=1a1a1a&bgcolor=ffffff`}" alt="Spotify QR Code - ${t}" class="spotify-qr-code" style="width:160px; height:160px; border-radius:12px;" />
      <div class="spotify-logo-badge" style="display:flex; align-items:center; gap:6px; background:#1db954; color:#000; font-family:var(--font-heading); font-weight:800; font-size:0.75rem; padding:4px 12px; border-radius:20px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.48-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.281 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.3z"/>
        </svg>
        SPOTIFY SCAN
      </div>
    </div>
  `}var E=new(window.AudioContext||window.webkitAudioContext);function D(e=440,t=150){try{E.state===`suspended`&&E.resume();let n=E.createOscillator(),r=E.createGain();n.type=`sine`,n.frequency.setValueAtTime(e,E.currentTime),r.gain.setValueAtTime(.2,E.currentTime),r.gain.exponentialRampToValueAtTime(.001,E.currentTime+t/1e3),n.connect(r),r.connect(E.destination),n.start(),n.stop(E.currentTime+t/1e3)}catch{}}function O(){try{E.state===`suspended`&&E.resume(),[523.25,659.25,783.99,1046.5].forEach((e,t)=>{setTimeout(()=>{let t=E.createOscillator(),n=E.createGain();t.type=`triangle`,t.frequency.setValueAtTime(e,E.currentTime),n.gain.setValueAtTime(.3,E.currentTime),n.gain.exponentialRampToValueAtTime(.001,E.currentTime+.4),t.connect(n),n.connect(E.destination),t.start(),t.stop(E.currentTime+.4)},t*100)})}catch{}}function k(){try{E.state===`suspended`&&E.resume();let e=E.createOscillator(),t=E.createGain();e.type=`sawtooth`,e.frequency.setValueAtTime(180,E.currentTime),e.frequency.linearRampToValueAtTime(110,E.currentTime+.35),t.gain.setValueAtTime(.3,E.currentTime),t.gain.exponentialRampToValueAtTime(.001,E.currentTime+.35),e.connect(t),t.connect(E.destination),e.start(),e.stop(E.currentTime+.35)}catch{}}var A=[`🔥 FEUER & FLAMME!`,`🎶 MAESTRO!`,`🤯 WAHNSINN!`,`👏 SPITZE!`,`⭐ GEMINI BEAT!`,`💎 PERFEKT!`];function j(e,t,n){let{mode:r=`classic`,category:i=`all`,players:a=[],roomCode:o=``}=t,s=0,c=null,d=!1,f=!1,p=.8,h=0,g=30,_=!0,v=[...w];i&&i!==`all`&&(i===`lionking`?v=w.filter(e=>e.genre&&e.genre.toLowerCase().includes(`lion king`)||e.title&&e.title.toLowerCase().includes(`lion king`)):i===`soundtracks`?v=w.filter(e=>e.genre&&(e.genre.toLowerCase().includes(`ost`)||e.genre.toLowerCase().includes(`soundtrack`)||e.genre.toLowerCase().includes(`score`))):i===`eminem`?v=w.filter(e=>e.artist&&e.artist.toLowerCase().includes(`eminem`)):i===`queen`?v=w.filter(e=>e.artist&&e.artist.toLowerCase().includes(`queen`)||e.artist&&e.artist.toLowerCase().includes(`mercury`)):i===`oldies`?v=w.filter(e=>e.year<1980):i===`modern`?v=w.filter(e=>e.year>=2010):i===`pop`?v=w.filter(e=>e.genre&&e.genre.toLowerCase().includes(`pop`)):i===`rap`?v=w.filter(e=>e.genre&&(e.genre.toLowerCase().includes(`rap`)||e.genre.toLowerCase().includes(`hip-hop`))):i===`features`?v=w.filter(e=>e.artist&&(e.artist.toLowerCase().includes(`ft.`)||e.artist.includes(`&`))):i===`live`&&(v=w.filter(e=>e.title&&(e.title.toLowerCase().includes(`live`)||e.title.toLowerCase().includes(`demo`)||e.title.toLowerCase().includes(`b-side`))))),(!v||v.length===0)&&(v=[...w]);let y=[...v].sort(()=>Math.random()-.5),b=[`#ff2b55`,`#00e5ff`,`#ffd700`,`#a855f7`,`#22c55e`,`#f97316`];a.forEach((e,t)=>{e.timeline||=[],typeof e.tokens!=`number`&&(e.tokens=3),typeof e.streak!=`number`&&(e.streak=0),e.color||=b[t%b.length],e.name||=`Spieler ${t+1}`,e.isAI===void 0&&(e.isAI=!1)});let S=3,C=30,E=null,j=``;r===`coop`?a[0].timeline.length===0&&y.length>0&&a[0].timeline.push(y.pop()):a.forEach(e=>{e.timeline.length===0&&y.length>0&&e.timeline.push(y.pop())});let M=e=>e?e<1970?`decade-1960s`:e<1980?`decade-1970s`:e<1990?`decade-1980s`:e<2e3?`decade-1990s`:e<2010?`decade-2000s`:e<2020?`decade-2010s`:`decade-2020s`:`decade-1990s`,N=()=>{y.length===0&&(y=[...v].sort(()=>Math.random()-.5)),c=y.pop(),j=``,f=!1,x.stop(),r===`solo`&&P()},P=()=>{E&&clearInterval(E),C=30,E=setInterval(()=>{--C;let t=e.querySelector(`#solo-timer-display`);t&&(t.innerHTML=`⏱️ ${C}s`,C<=10&&(t.style.color=`var(--accent-red)`)),C<=0&&(clearInterval(E),z(-1))},1e3)};N();let F=()=>r===`coop`?a[0]:a[s],I=e=>{if(isNaN(e)||e<=0)return`0:00`;let t=Math.floor(e/60),n=Math.floor(e%60);return`${t}:${n<10?`0`:``}${n}`},L=()=>{let e=F();e.isAI&&!f&&(f=!0,x.playTrack(c),setTimeout(()=>{let t=.75;e.aiDifficulty===`easy`&&(t=.4),e.aiDifficulty===`medium`&&(t=.75),e.aiDifficulty===`hard`&&(t=.92),e.aiDifficulty===`impossible`&&(t=.99);let n=Math.random()<t,i=e.timeline,a=0;for(let e=0;e<=i.length;e++){let t=e>0?i[e-1].year:-1/0,n=e<i.length?i[e].year:1/0;if(c.year>=t&&c.year<=n){a=e;break}}let o=a;!n&&i.length>0&&(o=(a+(Math.random()<.5?1:-1)+(i.length+1))%(i.length+1)),r===`expert`&&(j=n?c.year.toString():(c.year+Math.floor(Math.random()*5)-2).toString()),z(o)},2400))},R=()=>{let t=F(),a=r===`coop`,o=r===`expert`,f=r===`pro`,m=t.timeline.length,v=Math.min(100,Math.round(m/10*100));e.innerHTML=`
      <div class="game-screen ${M(c.year)}">
        <!-- SECTION 1: OBEN (STICKY HEADER WITH STREAK & ANIMATIONS TOGGLE) -->
        <header class="game-header">
          <div class="active-player-badge">
            <div class="player-avatar-preview" style="background:${t.color}; width:40px; height:40px; font-size:1.2rem; box-shadow:0 0 12px ${t.color};">
              ${t.icon||(t.isAI?`🤖`:a?`🤝`:s+1)}
            </div>
            <div>
              <div style="font-size:0.7rem; color:var(--text-muted); text-transform:uppercase; font-weight:800;">
                ${a?`TEAM KOOPERATIV`:`${l(`currentTurn`)} • ${r.toUpperCase()}`}
              </div>
              <div class="active-player-name">${a?`Gemeinsames Team`:t.name}</div>
            </div>
          </div>

          <!-- PROMINENT GOLDEN SCORE PILL -->
          <div class="score-pill score-pill-gold">
            ${u(`trophy`,18)} SCORE: <span style="font-size:1.1rem; margin-left:4px;">${m} / 10</span>
          </div>

          <!-- STREAK COUNTER PILL -->
          ${t.streak>1?`
            <div class="score-pill" style="background:linear-gradient(135deg, rgba(239,68,68,0.3), rgba(249,115,22,0.3)); border:1.5px solid #f97316; color:#fff; font-weight:900; animation:pulse-glow 1.5s infinite alternate;">
              🔥 STREAK: ${t.streak}x!
            </div>
          `:``}

          <div class="progress-bar-container">
            <div class="progress-track">
              <div class="progress-fill" style="width:${v}%;"></div>
            </div>
          </div>

          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
            <div class="score-pill" style="border:1px solid var(--accent-cyan); color:var(--accent-cyan); font-weight:700; font-size:0.8rem;">
              🏷️ ${i.toUpperCase()}
            </div>

            <!-- EFFEKTE ABSCHALTEN TOGGLE -->
            <button class="btn-secondary" id="toggle-animations-btn" title="Party-Effekte An/Aus" style="padding:6px 12px; font-size:0.8rem; ${_?``:`opacity:0.6;`}">
              ✨ Effekte: ${_?`AN`:`AUS`}
            </button>

            <button class="btn-secondary" id="exit-game-btn" title="Beenden" style="padding:6px 12px; font-size:0.8rem;">
              ${u(`settings`,14)} Beenden
            </button>
          </div>
        </header>

        ${t.isAI?`
          <div style="max-width:600px; margin:0 auto; width:100%; background:rgba(0,229,255,0.15); border:1px solid var(--accent-cyan); color:var(--accent-cyan); text-align:center; padding:8px; border-radius:12px; font-weight:800; font-size:0.9rem;">
            🤖 ${t.name} (${(t.aiDifficulty||`Medium`).toUpperCase()}) hört den Song...
          </div>
        `:``}

        <!-- SECTION 2: MITTE (MUSIC CARD WITH ANIMATED EQUALIZER & PULSING PLAY BUTTON) -->
        <div class="music-card-area">
          <div class="music-card-large draggable-card" id="draggable-music-card">
            ${t.isAI?``:`
              <div style="background:rgba(255,215,0,0.12); border:1px dashed var(--accent-gold); color:var(--accent-gold); padding:4px 12px; border-radius:12px; font-size:0.75rem; font-weight:800;">
                🖐️ Karte nach unten in die Timeline ziehen ODER Platz anklicken
              </div>
            `}

            <div style="display:flex; align-items:center; gap:14px;">
              <div class="vinyl-disc ${d?`spinning`:``}">
                <div class="vinyl-center">
                  ${u(d?`music`:`play`,16)}
                </div>
              </div>

              <div style="text-align:left;">
                <h3 style="font-family:var(--font-heading); font-size:1.1rem; font-weight:900; color:#fff;">
                  ${o?`Exaktes Jahr & Platz Raten!`:`Wohin im Zeitstrahl?`}
                </h3>
                <p style="font-size:0.75rem; color:var(--accent-cyan); font-weight:700;">
                  Höre die Musikprobe & platziere die Karte
                </p>
              </div>
            </div>

            <!-- Audio Controls with Equalizer Waveform -->
            <div style="width:100%; display:flex; flex-direction:column; align-items:center; gap:10px;">
              <div style="display:flex; align-items:center; justify-content:center; gap:14px; width:100%;">
                <button class="play-audio-btn-large" id="toggle-audio-btn">
                  ${u(d?`pause`:`play`,28)}
                </button>

                <!-- DEZENTE EQUALIZER-ANIMATION -->
                <div class="playing-waveform" style="visibility:${d?`visible`:`hidden`};">
                  <div class="wave-bar"></div>
                  <div class="wave-bar"></div>
                  <div class="wave-bar"></div>
                  <div class="wave-bar"></div>
                  <div class="wave-bar"></div>
                </div>

                <div class="volume-control-bar">
                  <button id="mute-toggle-btn" style="background:none; border:none; color:var(--accent-gold); font-size:0.95rem; cursor:pointer; display:flex; align-items:center;">
                    ${u(p>0?`volume2`:`volumeX`,18)}
                  </button>
                  <input type="range" id="volume-slider" class="volume-slider" min="0" max="1" step="0.05" value="${p}" />
                </div>
              </div>

              <div class="audio-progress-bar-container">
                <span class="audio-time-label" id="time-current-display">${I(h)}</span>
                <input type="range" id="audio-seek-slider" class="audio-slider" min="0" max="${g||30}" step="0.1" value="${h}" />
                <span class="audio-time-label" id="time-duration-display">${I(g)}</span>
              </div>
            </div>
          </div>

          ${o&&!t.isAI?`
            <div style="background:rgba(255,215,0,0.1); border:1px solid var(--accent-gold); padding:8px 16px; border-radius:12px; display:flex; align-items:center; gap:10px;">
              <span style="font-size:1.1rem;">🎯</span>
              <label style="font-size:0.8rem; font-weight:800; color:var(--accent-gold);">Exaktes Jahr (+2 Tokens):</label>
              <input type="number" id="expert-year-input" class="form-input" placeholder="z.B. 1985" style="width:90px; text-align:center; font-weight:900; font-size:0.95rem; padding:6px;" value="${j}" />
            </div>
          `:``}

          <div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center;">
            ${t.tokens>0&&!a&&!t.isAI?`
              <button class="btn-secondary" id="skip-song-btn" style="font-size:0.8rem; padding:6px 14px;">
                ⏭ ${l(`useTokenSkip`)} (1 Token)
              </button>
            `:``}
            ${t.tokens>=3&&!a&&!t.isAI?`
              <button class="btn-secondary" id="buy-card-btn" style="font-size:0.8rem; border-color:var(--accent-gold); color:var(--accent-gold); padding:6px 14px;">
                🎁 ${l(`useTokenBuy`)} (3 Tokens)
              </button>
            `:``}
          </div>
        </div>

        <!-- SECTION 3: UNTEN (TIMELINE BOARD) -->
        <div class="timeline-section-container">
          <div style="display:flex; align-items:center; justify-content:between; margin-bottom:6px; padding:0 6px;">
            <h3 style="font-family:var(--font-heading); font-size:0.95rem; font-weight:800; color:var(--accent-cyan); display:flex; align-items:center; gap:6px;">
              ⏱️ Euer Zeitstrahl (${t.timeline.length} Karten)
            </h3>
            <span style="font-size:0.75rem; color:var(--text-muted); margin-left:auto;">
              🖐️ Drag & Drop ODER Klicke auf <strong style="color:var(--accent-cyan);">➕ Hier</strong>
            </span>
          </div>

          <div class="timeline-container" id="timeline-container-el">
            <div class="timeline-track">
              <!-- First slot -->
              <button class="timeline-slot-btn" data-slot="0">
                ${u(`plus`,22)}
                <span>Hier</span>
              </button>

              ${t.timeline.map((e,t)=>`
                <div class="timeline-card" id="timeline-card-${t}">
                  <div class="card-year">${f?`????`:e.year}</div>
                  <div class="card-artist">${e.artist}</div>
                  <div class="card-title">"${e.title}"</div>
                </div>

                <button class="timeline-slot-btn" data-slot="${t+1}">
                  ${u(`plus`,22)}
                  <span>Hier</span>
                </button>
              `).join(``)}
            </div>
          </div>
        </div>
      </div>
    `,e.querySelector(`#exit-game-btn`).addEventListener(`click`,()=>{E&&clearInterval(E),x.stop(),n()});let y=e.querySelector(`#toggle-animations-btn`);y&&y.addEventListener(`click`,()=>{_=!_,_?document.body.classList.remove(`reduce-animations`):document.body.classList.add(`reduce-animations`),R()}),e.querySelector(`#toggle-audio-btn`).addEventListener(`click`,async()=>{x.isPlaying?x.pause():await x.playTrack(c)});let b=e.querySelector(`#audio-seek-slider`);b&&b.addEventListener(`input`,e=>{let t=parseFloat(e.target.value);x.seek(t)});let S=e.querySelector(`#volume-slider`);S&&S.addEventListener(`input`,e=>{p=parseFloat(e.target.value),x.setVolume(p)});let C=e.querySelector(`#mute-toggle-btn`);if(C&&C.addEventListener(`click`,()=>{p=p>0?0:.8,x.setVolume(p)}),o&&!t.isAI){let t=e.querySelector(`#expert-year-input`);t&&t.addEventListener(`input`,e=>{j=e.target.value})}let w=e.querySelector(`#skip-song-btn`);w&&w.addEventListener(`click`,()=>{t.tokens>0&&(--t.tokens,N(),R())});let T=e.querySelector(`#buy-card-btn`);T&&T.addEventListener(`click`,()=>{t.tokens>=3&&(t.tokens-=3,t.timeline.push(c),t.timeline.sort((e,t)=>e.year-t.year),W(),N(),R())});let D=e.querySelector(`#draggable-music-card`),O=e.querySelectorAll(`.timeline-slot-btn`);if(D&&!t.isAI){let e=!1,t=0,n=0,r=null,i=r=>{if(!(r.target.closest(`button`)||r.target.closest(`input`))){e=!0,t=r.clientX,n=r.clientY,D.classList.add(`pointer-dragging`),D.style.transition=`none`,O.forEach(e=>e.classList.add(`drag-target-highlight`));try{D.setPointerCapture(r.pointerId)}catch{}}},a=i=>{if(!e)return;let a=i.clientX-t,o=i.clientY-n;D.style.transform=`translate3d(${a}px, ${o}px, 0) scale(0.92) rotate(${a*.03}deg)`;let s=document.elementFromPoint(i.clientX,i.clientY),c=s?s.closest(`.timeline-slot-btn`):null;r&&r!==c&&r.classList.remove(`drag-over`),c?(c.classList.add(`drag-over`),r=c):r=null},o=t=>{if(e){e=!1;try{D.releasePointerCapture(t.pointerId)}catch{}if(D.classList.remove(`pointer-dragging`),O.forEach(e=>{e.classList.remove(`drag-target-highlight`),e.classList.remove(`drag-over`)}),r){let e=parseInt(r.getAttribute(`data-slot`));r=null,z(e)}else D.style.transition=`transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)`,D.style.transform=`translate3d(0, 0, 0) scale(1) rotate(0deg)`}};D.addEventListener(`pointerdown`,i),D.addEventListener(`pointermove`,a),D.addEventListener(`pointerup`,o),D.addEventListener(`pointercancel`,o)}O.forEach(e=>{e.addEventListener(`click`,()=>{let t=parseInt(e.getAttribute(`data-slot`));z(t)})}),L()},z=e=>{E&&clearInterval(E),x.pause(),d=!1;let t=F(),n=t.timeline;if(e===-1){t.streak=0,B(!1,!1,`Zeit abgelaufen!`);return}let i=e>0?n[e-1].year:-1/0,a=e<n.length?n[e].year:1/0,o=c.year>=i&&c.year<=a,s=!1;r===`expert`&&j&&(s=parseInt(j)===c.year),o?(t.streak+=1,n.splice(e,0,c),t.tokens=Math.min(s?t.tokens+2:t.tokens+1,5)):(t.streak=0,r===`coop`?--S:r===`pro`&&(t.tokens=Math.max(t.tokens-1,0))),B(o,s)},B=(e,t=!1,n=null)=>{F();let r=document.createElement(`div`);r.className=`modal-overlay`,r.innerHTML=`
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;">
        <div style="font-family:var(--font-heading); font-size:1.4rem; font-weight:800; color:var(--text-muted); text-transform:uppercase; letter-spacing:2px; margin-bottom:10px;">
          Enthüllung...
        </div>
        <div class="reveal-countdown-number" id="countdown-num-el">3</div>
      </div>
    `,document.body.appendChild(r),D(440,150);let i=3,a=setInterval(()=>{--i;let o=r.querySelector(`#countdown-num-el`);i>0?(o&&(o.innerHTML=i.toString(),o.style.animation=`none`,o.offsetWidth,o.style.animation=`countdown-bounce-scale 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)`),D(440+(3-i)*100,150)):(clearInterval(a),D(880,250),V(r,e,t,n))},650)},V=(e,t,n,r)=>{let i=F(),a=A[Math.floor(Math.random()*A.length)],o=t?`${a} Deine Timeline wächst.`:`FALSCH! 💔 Die Karte wandert ab.`;n?o=`🎯 PERFEKT! Exaktes Jahr erraten (+2 Tokens)!`:r&&(o=r),e.innerHTML=`
      <div class="modal-content" style="background:none; border:none; box-shadow:none; max-width:440px;">
        <div class="flip-card-container">
          <div class="flip-card-inner" id="flip-card-inner-el">
            <!-- Front of Card -->
            <div class="flip-card-front">
              <span style="font-size:3.5rem; animation:pulse-glow 2s infinite alternate;">🎵</span>
              <h2 style="font-family:var(--font-heading); font-size:1.6rem; font-weight:900; color:#fff; margin-top:12px;">
                Hitster Musik-Karte
              </h2>
              <p style="font-size:0.85rem; color:var(--accent-cyan); font-weight:700;">
                Auflösung...
              </p>
            </div>

            <!-- Back of Card (Flipped Result) -->
            <div class="flip-card-back ${t?`correct-glow-pulse`:``}" id="flip-card-back-el">
              <div style="font-size:2.5rem; margin-bottom:-4px;">
                ${n?`⭐`:t?`🎉`:`❌`}
              </div>

              <h3 style="font-family:var(--font-heading); font-size:1.2rem; font-weight:900; color:${t?`#22c55e`:`var(--accent-red)`};">
                ${o}
              </h3>

              <div class="revealed-year">${c.year}</div>
              <div class="revealed-artist">${c.artist}</div>
              <div class="revealed-title">"${c.title}"</div>

              ${T(c.spotifyUrl,c.title)}

              <a href="${c.spotifyUrl}" target="_blank" class="btn-secondary" style="margin-top:8px; font-size:0.8rem; padding:6px 14px;">
                🟢 ${l(`openInSpotify`)}
              </a>

              <button class="btn-primary" id="next-turn-btn" style="width:100%; margin-top:12px; padding:12px;">
                ${i.isAI?`KI-Zug beendet (Weiter →)`:`Nächster Zug →`}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;let s=e.querySelector(`#flip-card-inner-el`);setTimeout(()=>{s&&s.classList.add(`flipped`),t?(O(),window.confetti&&_&&window.confetti({particleCount:n?220:120,spread:90,origin:{y:.55}})):(k(),s&&s.classList.add(`shake-error`))},150);let u=null;i.isAI&&(u=setTimeout(()=>{H(e,t)},2800)),e.querySelector(`#next-turn-btn`).addEventListener(`click`,()=>{u&&clearTimeout(u),H(e,t)})},H=(e,t)=>{let n=e.querySelector(`#flip-card-inner-el`);!t&&n&&_?(n.classList.add(`discard-fly-out`),setTimeout(()=>{e.remove(),U()},700)):(e.remove(),U())},U=()=>{W()||(r!==`coop`&&(s=(s+1)%a.length),N(),R())},W=()=>{if(r===`coop`&&S<=0)return G(`Keine Leben mehr! Team-Spiel verloren.`),!0;let e=a.find(e=>e.timeline.length>=10);return e?(m(e.name,e.timeline.length),K(e),!0):!1},G=e=>{let t=document.createElement(`div`);t.className=`modal-overlay`,t.innerHTML=`
      <div class="modal-content" style="text-align:center;">
        <span style="font-size:4rem;">💔</span>
        <h1 style="font-family:var(--font-heading); font-size:2.4rem; font-weight:900; color:var(--accent-red); margin-top:10px;">
          GAME OVER
        </h1>
        <p style="color:var(--text-muted); font-size:1.1rem; margin:10px 0 20px;">
          ${e}
        </p>

        <button class="btn-primary" id="finish-game-btn" style="width:100%; padding:16px;">
          Zurück zum Hauptmenü
        </button>
      </div>
    `,document.body.appendChild(t),t.querySelector(`#finish-game-btn`).addEventListener(`click`,()=>{t.remove(),x.stop(),n()})},K=e=>{let t=document.createElement(`div`);t.className=`modal-overlay`,window.confetti&&_&&window.confetti({particleCount:250,spread:110,origin:{y:.5}});let i=[...a].sort((e,t)=>t.timeline.length-e.timeline.length);t.innerHTML=`
      <div class="modal-content" style="text-align:center; max-width:540px;">
        <span style="font-size:3.5rem;">🏆</span>
        <h1 style="font-family:var(--font-heading); font-size:2.4rem; font-weight:900; color:var(--accent-gold); margin-top:4px;">
          ${e.isAI?`${e.aiIcon||`🤖`} ${e.name} GEWINNT!`:r===`coop`?`TEAM GEWINNT!`:`${e.name} GEWINNT!`}
        </h1>
        <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:16px;">
          10 Karten erfolgreich im Zeitstrahl platziert! (${r.toUpperCase()} MODE)
        </p>

        <!-- PLATZIERUNGEN PODIUM -->
        <div style="background:rgba(0,0,0,0.3); border:1px solid var(--border-color); border-radius:18px; padding:16px; margin-bottom:20px;">
          <h3 style="font-family:var(--font-heading); font-size:1.1rem; font-weight:800; color:var(--accent-cyan); margin-bottom:12px;">
            🥇 Endergebnis & Platzierungen
          </h3>

          <div style="display:flex; flex-direction:column; gap:10px;">
            ${i.map((e,t)=>`
              <div style="display:flex; align-items:center; justify-content:between; background:${t===0?`rgba(255,215,0,0.15)`:`rgba(255,255,255,0.05)`}; border:1px solid ${t===0?`var(--accent-gold)`:`var(--border-color)`}; padding:10px 14px; border-radius:14px;">
                <div style="display:flex; align-items:center; gap:10px;">
                  <div style="font-family:var(--font-heading); font-size:1.4rem; font-weight:900; color:${t===0?`var(--accent-gold)`:t===1?`#cbd5e1`:`#b45309`};">
                    ${t===0?`🥇 1.`:t===1?`🥈 2.`:t===2?`🥉 3.`:`${t+1}.`}
                  </div>
                  <div style="text-align:left;">
                    <div style="font-weight:800; color:#fff; font-size:0.95rem;">${e.name}</div>
                    <div style="font-size:0.75rem; color:var(--text-muted);">Max Streak: ${e.streak||0}x</div>
                  </div>
                </div>

                <div style="font-family:var(--font-heading); font-weight:900; font-size:1.1rem; color:var(--accent-gold);">
                  ${e.timeline.length} Karten
                </div>
              </div>
            `).join(``)}
          </div>
        </div>

        <button class="btn-primary" id="finish-game-btn" style="width:100%; padding:16px;">
          Zurück zum Hauptmenü
        </button>
      </div>
    `,document.body.appendChild(t),t.querySelector(`#finish-game-btn`).addEventListener(`click`,()=>{t.remove(),x.stop(),n()})};x.subscribe(({isPlaying:t,volume:n,currentTime:r,duration:i})=>{d=t,h=r,g=i,p=n;let a=e.querySelector(`#toggle-audio-btn`),o=e.querySelector(`.vinyl-disc`),s=e.querySelector(`.playing-waveform`),c=e.querySelector(`#time-current-display`),l=e.querySelector(`#time-duration-display`),f=e.querySelector(`#audio-seek-slider`);a&&(a.innerHTML=u(t?`pause`:`play`,28)),o&&(t?o.classList.add(`spinning`):o.classList.remove(`spinning`)),s&&(s.style.visibility=t?`visible`:`hidden`),c&&(c.innerHTML=I(r)),l&&(l.innerHTML=I(i)),f&&!f.matches(`:active`)&&(f.value=r,f.max=i||30)}),R()}var M={MAIN_MENU:`MAIN_MENU`,SETUP:`SETUP`,GAME:`GAME`},N=class{constructor(){this.appContainer=document.getElementById(`app`),this.currentScreen=M.MAIN_MENU,this.gameSetup=null,n(),this.render()}render(){this.appContainer&&(this.currentScreen===M.MAIN_MENU?C(this.appContainer,()=>this.navigate(M.SETUP),(e,t)=>{this.gameSetup={mode:`classic`,players:e,roomCode:t},this.navigate(M.GAME)}):this.currentScreen===M.SETUP?g(this.appContainer,e=>{this.gameSetup=e,this.navigate(M.GAME)},()=>this.navigate(M.MAIN_MENU)):this.currentScreen===M.GAME&&j(this.appContainer,this.gameSetup,()=>this.navigate(M.MAIN_MENU)))}navigate(e){this.currentScreen=e,this.render()}};document.addEventListener(`DOMContentLoaded`,()=>{new N});