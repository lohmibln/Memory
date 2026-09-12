import type { BoardSize, GameSettings, GameState, Player, PlayerId } from './types';
import { createDeck } from './createDeck';
import { getTheme } from './themes';

export const POINTS_PER_MATCH = 2;

export const DEFAULT_SETTINGS: GameSettings = {
  theme: 'code',
  startingPlayer: 'blue',
  boardSize: 16,
};

export function createPlayer(id: PlayerId, name: string): Player {
  return { id, name, score: 0 };
}

export function createInitialState(settings: GameSettings): GameState {
  const theme = getTheme(settings.theme);
  const cards = createDeck(settings.boardSize, theme);

  return {
    settings: { ...settings },
    players: {
      blue: createPlayer('blue', 'Blue'),
      orange: createPlayer('orange', 'Orange'),
    },
    currentPlayer: settings.startingPlayer,
    cards,
    selectedCardIds: [],
    isResolvingTurn: false,
    matchedPairs: 0,
    totalPairs: cards.length / 2,
    winner: null,
  };
}

export function otherPlayer(player: PlayerId): PlayerId {
  return player === 'blue' ? 'orange' : 'blue';
}

export function columnsForSize(size: BoardSize): number {
  switch (size) {
    case 16:
      return 4;
    case 24:
      return 6;
    case 36:
      return 6;
  }
}
