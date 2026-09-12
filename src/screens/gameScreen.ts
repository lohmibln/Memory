import type { GameState } from '../game/types';
import { columnsForSize, createInitialState } from '../game/gameState';
import { Game } from '../game/Game';
import { renderMemoryCard } from '../components/memoryCard';
import { renderScoreBoard, updateScoreBoard } from '../components/scoreBoard';
import { renderPlayerIndicator, updatePlayerIndicator } from '../components/playerIndicator';
import { iconExit } from '../components/icons';
import { showConfirmDialog } from '../components/confirmDialog';
import type { ScreenDeps } from './types';

const MATCH_PULSE_MS = 700;
const SHAKE_MS = 500;

/**
 * Game screen. Renders the HUD (score board, current player, exit) and the
 * card grid, then drives a Game instance. All DOM updates happen in place so
 * card flip transitions run smoothly.
 */
export function renderGameScreen(root: HTMLElement, deps: ScreenDeps): void {
  const settings = deps.getSettings();
  const state = createInitialState(settings);
  const game = new Game(state);

  let disposed = false;
  let exitOpen = false;

  root.className = 'screen screen--game';
  root.dataset.theme = settings.theme;

  const main = document.createElement('main');
  main.className = 'game';

  // ---- HUD ----------------------------------------------------------------
  const hud = document.createElement('header');
  hud.className = 'game__hud';

  const scoreBoard = renderScoreBoard(state);

  const indicator = renderPlayerIndicator(state);

  const exitButton = document.createElement('button');
  exitButton.type = 'button';
  exitButton.className = 'btn btn--ghost game__exit';
  exitButton.setAttribute('aria-label', 'Exit game');
  const exitIcon = document.createElement('span');
  exitIcon.className = 'btn__icon';
  exitIcon.innerHTML = iconExit(18);
  const exitText = document.createElement('span');
  exitText.className = 'btn__label';
  exitText.textContent = 'Exit game';
  exitButton.append(exitIcon, exitText);
  exitButton.addEventListener('click', () => {
    void openExitConfirm();
  });

  const openExitConfirm = async (): Promise<void> => {
    if (disposed || exitOpen) return;
    exitOpen = true;
    const shouldExit = await showConfirmDialog({
      title: 'Do you really want to exit?',
      confirmLabel: 'Yes',
      cancelLabel: 'No',
    });
    exitOpen = false;
    if (!shouldExit) return;
    disposed = true;
    deps.goHome();
  };

  hud.append(scoreBoard, indicator, exitButton);

  // ---- Board --------------------------------------------------------------
  const board = document.createElement('section');
  board.className = 'game__board';
  board.setAttribute('aria-label', 'Memory game board');

  const columns = columnsForSize(settings.boardSize);
  const rows = settings.boardSize / columns;
  board.style.setProperty('--board-columns', String(columns));
  board.style.setProperty('--board-rows', String(rows));

  const cardEls = new Map<string, HTMLElement>();

  state.cards.forEach((card, index) => {
    const el = renderMemoryCard(card, index, (id) => {
      void game.flip(id);
    });
    cardEls.set(card.id, el);
    board.appendChild(el);
  });

  main.append(hud, board);
  root.appendChild(main);

  // ---- Game event wiring --------------------------------------------------
  game.on({
    update: (next) => syncBoard(next, cardEls),
    match: (cards, player) => {
      for (const card of cards) {
        const el = cardEls.get(card.id);
        if (!el) continue;
        el.classList.add('memory-card--match-pulse');
        window.setTimeout(() => el.classList.remove('memory-card--match-pulse'), MATCH_PULSE_MS);
      }
      updateScoreBoard(scoreBoard, game.state, player);
    },
    mismatch: (cards) => {
      for (const card of cards) {
        const el = cardEls.get(card.id);
        if (!el) continue;
        el.classList.add('memory-card--shake');
        window.setTimeout(() => el.classList.remove('memory-card--shake'), SHAKE_MS);
      }
    },
    playerChanged: (player) => updatePlayerIndicator(indicator, game.state, player),
    gameOver: (winner) => {
      if (!disposed) deps.showResult(winner, game.state);
    },
  });
}

/**
 * Applies the current card state to existing DOM nodes (flip + matched
 * classes) without rebuilding, preserving CSS transitions.
 */
function syncBoard(state: GameState, cardEls: Map<string, HTMLElement>): void {
  for (const card of state.cards) {
    const el = cardEls.get(card.id);
    if (!el) continue;
    el.classList.toggle('is-flipped', card.isFlipped);
    el.classList.toggle('is-matched', card.isMatched);
    el.setAttribute(
      'aria-label',
      card.isMatched || card.isFlipped ? card.symbol.label : 'Hidden card',
    );
    if (card.isMatched) {
      el.setAttribute('aria-disabled', 'true');
      el.tabIndex = -1;
    } else {
      el.removeAttribute('aria-disabled');
      el.removeAttribute('tabindex');
    }
  }
}
