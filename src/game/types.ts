export type PlayerId = 'blue' | 'orange';

export type ThemeId = 'code' | 'gaming' | 'da-projects' | 'foods';

export type BoardSize = 16 | 24 | 36;

export interface Player {
  id: PlayerId;
  name: string;
  score: number;
}

export interface MemorySymbol {
  id: string;
  label: string;
  /** HTML markup for the card face motif (an <img> of the theme artwork). */
  icon: string;
}

export interface MemoryCard {
  id: string;
  pairId: string;
  symbol: MemorySymbol;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameSettings {
  theme: ThemeId;
  startingPlayer: PlayerId;
  boardSize: BoardSize;
}

export interface GameState {
  settings: GameSettings;
  players: Record<PlayerId, Player>;
  currentPlayer: PlayerId;
  cards: MemoryCard[];
  selectedCardIds: string[];
  isResolvingTurn: boolean;
  matchedPairs: number;
  totalPairs: number;
  winner: PlayerId | 'draw' | null;
}

export interface ThemeDefinition {
  id: ThemeId;
  name: string;
  /** Background of the game screen / preview. */
  background: string;
  /** Primary accent (used for highlights, borders). */
  primary: string;
  /** Secondary accent. */
  secondary: string;
  /** Blue player colour. */
  blue: string;
  /** Orange player colour. */
  orange: string;
  /** Off-white / light surface colour. */
  offWhite: string;
  /** Card-back gradient (CSS value). */
  cardBackGradient: string;
  /** Card-back monitor icon colour. */
  cardBackIcon: string;
  /** Card-back artwork (extracted from the theme's SVG pack). */
  cardBackImage: string;
  /** Symbols available for card faces. */
  symbols: MemorySymbol[];
  /** Whether this theme is functional (all four are). */
  enabled: boolean;
}

export type ScreenId = 'home' | 'settings' | 'game' | 'result';
