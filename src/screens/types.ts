import type { GameSettings, GameState, PlayerId } from '../game/types';

export interface ScreenDeps {
  getSettings(): GameSettings;
  setSettings(settings: GameSettings): void;
  goToSettings(): void;
  goHome(): void;
  startGame(): void;
  showResult(winner: PlayerId | 'draw', state: GameState): void;
}
