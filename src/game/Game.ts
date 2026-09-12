import type { GameState, MemoryCard, PlayerId } from './types';
import { otherPlayer, POINTS_PER_MATCH } from './gameState';

const MISMATCH_DELAY_MS = 750;
const GAME_OVER_DELAY_MS = 650;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface GameEvents {
  /** Fired after every state mutation so the view can re-render. */
  update?: (state: GameState) => void;
  /** Fired when a pair is successfully matched. */
  match?: (cards: MemoryCard[], player: PlayerId) => void;
  /** Fired when a pair is a mismatch (before they flip back). */
  mismatch?: (cards: MemoryCard[]) => void;
  /** Fired when the active player switches. */
  playerChanged?: (player: PlayerId) => void;
  /** Fired when the game is finished. */
  gameOver?: (winner: PlayerId | 'draw') => void;
}

/**
 * Owns the mutable game state and implements all turn logic. It exposes a
 * tiny event interface so the screen layer stays purely presentational.
 */
export class Game {
  state: GameState;
  private listeners: GameEvents;

  constructor(state: GameState, listeners: GameEvents = {}) {
    this.state = state;
    this.listeners = listeners;
  }

  on(listeners: GameEvents): void {
    this.listeners = { ...this.listeners, ...listeners };
  }

  private emit<K extends keyof GameEvents>(event: K, ...args: Parameters<NonNullable<GameEvents[K]>>): void {
    const handler = this.listeners[event] as (...a: unknown[]) => void | undefined;
    handler?.(...args);
  }

  private notifyUpdate(): void {
    this.emit('update', this.state);
  }

  /**
   * Handles a click on a card. Idempotent and safe against rapid clicks:
   * any invalid selection is ignored without mutating state.
   */
  async flip(cardId: string): Promise<void> {
    if (this.state.isResolvingTurn) return;

    const card = this.state.cards.find((c) => c.id === cardId);
    if (!card || card.isMatched || card.isFlipped) return;
    if (this.state.selectedCardIds.length >= 2) return;

    card.isFlipped = true;
    this.state.selectedCardIds.push(cardId);
    this.notifyUpdate();

    if (this.state.selectedCardIds.length === 1) return;

    // Two cards are now selected — lock the board and resolve the turn.
    this.state.isResolvingTurn = true;
    this.notifyUpdate();

    const [firstId, secondId] = this.state.selectedCardIds;
    const first = this.state.cards.find((c) => c.id === firstId)!;
    const second = this.state.cards.find((c) => c.id === secondId)!;
    const matchedCards = [first, second];

    if (first.pairId === second.pairId) {
      first.isMatched = true;
      second.isMatched = true;
      first.isFlipped = true;
      second.isFlipped = true;

      const scorer = this.state.players[this.state.currentPlayer];
      scorer.score += POINTS_PER_MATCH;
      this.state.matchedPairs += 1;
      this.state.selectedCardIds = [];
      this.state.isResolvingTurn = false;

      this.emit('match', matchedCards, this.state.currentPlayer);
      this.notifyUpdate();

      if (this.state.matchedPairs >= this.state.totalPairs) {
        await sleep(GAME_OVER_DELAY_MS);
        this.state.winner = this.computeWinner();
        this.emit('gameOver', this.state.winner);
      }
      return;
    }

    // Mismatch: briefly show both cards, then flip back and switch player.
    this.emit('mismatch', matchedCards);
    await sleep(MISMATCH_DELAY_MS);

    first.isFlipped = false;
    second.isFlipped = false;
    this.state.selectedCardIds = [];
    this.state.isResolvingTurn = false;
    this.state.currentPlayer = otherPlayer(this.state.currentPlayer);

    this.emit('playerChanged', this.state.currentPlayer);
    this.notifyUpdate();
  }

  private computeWinner(): PlayerId | 'draw' {
    const blue = this.state.players.blue.score;
    const orange = this.state.players.orange.score;
    if (blue === orange) return 'draw';
    return blue > orange ? 'blue' : 'orange';
  }
}
