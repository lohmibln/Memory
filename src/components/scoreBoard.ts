import type { GameState, PlayerId } from '../game/types';
import { iconPawn } from './icons';

/**
 * Renders the two-player score panel. Each player row shows a coloured pawn
 * and their numeric score. Call `update` to refresh the numbers in place.
 */
export function renderScoreBoard(state: GameState): HTMLElement {
  const panel = document.createElement('div');
  panel.className = 'score-board';

  (['blue', 'orange'] as PlayerId[]).forEach((pid) => {
    const row = document.createElement('div');
    row.className = `score-board__player score-board__player--${pid}`;
    row.dataset.player = pid;

    const pawn = document.createElement('span');
    pawn.className = 'score-board__pawn';
    pawn.innerHTML = iconPawn(18);

    const name = document.createElement('span');
    name.className = 'score-board__name';
    name.textContent = state.players[pid].name;

    const score = document.createElement('span');
    score.className = 'score-board__score';
    score.textContent = String(state.players[pid].score);

    row.append(pawn, name, score);
    panel.appendChild(row);
  });

  return panel;
}

/** Updates the displayed scores and applies a pop animation to a scorer. */
export function updateScoreBoard(
  panel: HTMLElement,
  state: GameState,
  scoredPlayer?: PlayerId,
): void {
  (['blue', 'orange'] as PlayerId[]).forEach((pid) => {
    const row = panel.querySelector<HTMLElement>(`.score-board__player--${pid}`);
    const score = row?.querySelector<HTMLElement>('.score-board__score');
    if (score) {
      score.textContent = String(state.players[pid].score);
    }
    if (pid === scoredPlayer && row) {
      row.classList.remove('score-board__player--pop');
      // Force reflow so the animation can restart.
      void row.offsetWidth;
      row.classList.add('score-board__player--pop');
    }
  });
}
