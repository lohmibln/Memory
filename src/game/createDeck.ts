import type { BoardSize, MemoryCard, ThemeDefinition } from './types';
import { shuffle } from './shuffle';

let cardCounter = 0;

/**
 * Build a shuffled deck for the given board size and theme.
 *
 * For board size N we need N/2 pairs. We take the first `pairsNeeded`
 * symbols from the theme, duplicate each one, give every card a unique id
 * and shuffle with Fisher–Yates.
 */
export function createDeck(boardSize: BoardSize, theme: ThemeDefinition): MemoryCard[] {
  const pairsNeeded = boardSize / 2;
  const chosen = theme.symbols.slice(0, pairsNeeded);

  const cards: MemoryCard[] = [];
  chosen.forEach((symbol, pairIndex) => {
    const pairId = `${symbol.id}-${pairIndex}`;
    for (let copy = 0; copy < 2; copy++) {
      cardCounter += 1;
      cards.push({
        id: `card-${cardCounter}`,
        pairId,
        symbol,
        isFlipped: false,
        isMatched: false,
      });
    }
  });

  return shuffle(cards);
}
