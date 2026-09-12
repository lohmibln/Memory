import './styles/main.scss';
import type { GameSettings, GameState, PlayerId } from './game/types';
import { DEFAULT_SETTINGS } from './game/gameState';
import { renderHomeScreen } from './screens/homeScreen';
import { renderSettingsScreen } from './screens/settingsScreen';
import { renderGameScreen } from './screens/gameScreen';
import { renderResultScreen } from './screens/resultScreen';
import type { ScreenDeps } from './screens/types';

const rootElement = document.getElementById('app');

if (rootElement === null) {
  throw new Error('Missing #app mount element');
}

const root: HTMLElement = rootElement;

let settings: GameSettings = { ...DEFAULT_SETTINGS };
let lastGameState: GameState | null = null;
let lastWinner: PlayerId | 'draw' | null = null;

function clear(): void {
  root.innerHTML = '';
  root.className = '';
}

function render(fn: (el: HTMLElement, deps: ScreenDeps) => void): void {
  clear();
  fn(root, deps);
}

const deps: ScreenDeps = {
  getSettings: () => settings,
  setSettings: (next) => {
    settings = { ...next };
  },
  goToSettings: () => render(renderSettingsScreen),
  goHome: () => {
    lastGameState = null;
    lastWinner = null;
    render(renderHomeScreen);
  },
  startGame: () => render(renderGameScreen),
  showResult: (winner, state) => {
    lastWinner = winner;
    lastGameState = state;
    clear();
    renderResultScreen(root, deps, winner, state);
  },
};

render(renderHomeScreen);

// Exported only to aid debugging in the browser console; not required at
// runtime. Kept minimal and safe.
declare global {
  interface Window {
    __memory?: {
      getSettings: () => GameSettings;
      lastGameState: () => GameState | null;
      lastWinner: () => PlayerId | 'draw' | null;
    };
  }
}

window.__memory = {
  getSettings: () => settings,
  lastGameState: () => lastGameState,
  lastWinner: () => lastWinner,
};
