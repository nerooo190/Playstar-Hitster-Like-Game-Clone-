// Main Application Entry Point & Router for Hitster Game Clone

import { loadSavedTheme } from './utils/colorCustomizer.js';
import { renderMainMenu } from './components/MainMenu.js';
import { renderSetupScreen } from './components/SetupScreen.js';
import { renderGameScreen } from './components/GameScreen.js';

// Application State Enum
const SCREEN_STATE = {
  MAIN_MENU: 'MAIN_MENU',
  SETUP: 'SETUP',
  GAME: 'GAME'
};

class AppRouter {
  constructor() {
    this.appContainer = document.getElementById('app');
    this.currentScreen = SCREEN_STATE.MAIN_MENU;
    this.gameSetup = null;

    // Load saved 180M custom color theme on app launch
    loadSavedTheme();

    this.render();
  }

  render() {
    if (!this.appContainer) return;

    if (this.currentScreen === SCREEN_STATE.MAIN_MENU) {
      renderMainMenu(
        this.appContainer,
        () => this.navigate(SCREEN_STATE.SETUP),
        (players, roomCode) => {
          this.gameSetup = { mode: 'classic', players, roomCode };
          this.navigate(SCREEN_STATE.GAME);
        }
      );
    } else if (this.currentScreen === SCREEN_STATE.SETUP) {
      renderSetupScreen(
        this.appContainer,
        (setup) => {
          this.gameSetup = setup;
          this.navigate(SCREEN_STATE.GAME);
        },
        () => this.navigate(SCREEN_STATE.MAIN_MENU)
      );
    } else if (this.currentScreen === SCREEN_STATE.GAME) {
      renderGameScreen(
        this.appContainer,
        this.gameSetup,
        () => this.navigate(SCREEN_STATE.MAIN_MENU)
      );
    }
  }

  navigate(screenState) {
    this.currentScreen = screenState;
    this.render();
  }
}

// Bootstrap App
document.addEventListener('DOMContentLoaded', () => {
  new AppRouter();
});
