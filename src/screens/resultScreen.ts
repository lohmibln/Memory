import type { GameState, PlayerId } from '../game/types';
import { iconPawn, iconScales } from '../components/icons';
import { renderConfetti } from '../components/confetti';
import type { ScreenDeps } from './types';

const RESULT_REVEAL_DELAY_MS = 1300;

/**
 * Result screen. Phase 1 shows "Game over" with the final score and an
 * entrance animation; after a short delay it reveals the winner (or draw)
 * view, with confetti for a winning player.
 */
export function renderResultScreen(
  root: HTMLElement,
  deps: ScreenDeps,
  winner: PlayerId | 'draw',
  state: GameState,
): void {
  root.className = 'screen screen--result';

  const main = document.createElement('main');
  main.className = 'result';
  root.appendChild(main);

  renderGameOver(main, state);

  window.setTimeout(() => {
    main.innerHTML = '';
    if (winner === 'draw') {
      renderDraw(main, deps);
    } else {
      renderWinner(main, deps, winner);
    }
  }, RESULT_REVEAL_DELAY_MS);
}

// ---- Phase 1: Game over ---------------------------------------------------

function renderGameOver(main: HTMLElement, state: GameState): void {
  const wrap = document.createElement('section');
  wrap.className = 'result__gameover';

  const title = document.createElement('h2');
  title.className = 'result__title';
  title.textContent = 'Game over';

  const subtitle = document.createElement('p');
  subtitle.className = 'result__subtitle';
  subtitle.textContent = 'Final score';

  const scores = document.createElement('div');
  scores.className = 'result__scores';

  (['blue', 'orange'] as PlayerId[]).forEach((pid) => {
    const item = document.createElement('div');
    item.className = `result__score result__score--${pid}`;

    const name = document.createElement('span');
    name.className = 'result__score-name';
    name.textContent = state.players[pid].name;

    const value = document.createElement('span');
    value.className = 'result__score-value';
    value.textContent = String(state.players[pid].score);

    item.append(name, value);
    scores.appendChild(item);
  });

  wrap.append(title, subtitle, scores);
  main.appendChild(wrap);
}

// ---- Phase 2: Winner ------------------------------------------------------

function renderWinner(main: HTMLElement, deps: ScreenDeps, winner: PlayerId): void {
  const confetti = renderConfetti();

  const wrap = document.createElement('section');
  wrap.className = `result__winner result__winner--${winner}`;

  const eyebrow = document.createElement('p');
  eyebrow.className = 'result__eyebrow';
  eyebrow.textContent = 'The winner is';

  const name = document.createElement('h2');
  name.className = 'result__winner-name';
  name.textContent = winner === 'blue' ? 'Blue player' : 'Orange player';

  const pawn = document.createElement('div');
  pawn.className = 'result__pawn';
  pawn.setAttribute('aria-hidden', 'true');
  pawn.innerHTML = iconPawn(160);

  const backButton = makeBackButton(deps);

  wrap.append(eyebrow, name, pawn, backButton);
  main.append(confetti, wrap);
}

// ---- Phase 2: Draw --------------------------------------------------------

function renderDraw(main: HTMLElement, deps: ScreenDeps): void {
  const wrap = document.createElement('section');
  wrap.className = 'result__draw';

  const eyebrow = document.createElement('p');
  eyebrow.className = 'result__eyebrow';
  eyebrow.textContent = "It's a";

  const title = document.createElement('h2');
  title.className = 'result__draw-title';
  title.textContent = 'Draw';

  const scales = document.createElement('div');
  scales.className = 'result__scales';
  scales.setAttribute('aria-hidden', 'true');
  scales.innerHTML = iconScales(120);

  const backButton = makeBackButton(deps);

  wrap.append(eyebrow, title, scales, backButton);
  main.appendChild(wrap);
}

// ---- Shared -----------------------------------------------------------------

function makeBackButton(deps: ScreenDeps): HTMLElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'btn btn--ghost result__back';
  button.textContent = 'Back to start';
  button.addEventListener('click', deps.goHome);
  return button;
}
