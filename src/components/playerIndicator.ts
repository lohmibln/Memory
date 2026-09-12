import type { GameState, PlayerId } from '../game/types';
import { iconPawn } from './icons';

/**
 * Renders the "Current player" indicator. Includes a coloured pawn plus the
 * player's name as text so the active player is never conveyed by colour
 * alone.
 */
export function renderPlayerIndicator(state: GameState): HTMLElement {
  const container = document.createElement('div');
  container.className = 'player-indicator';

  const label = document.createElement('span');
  label.className = 'player-indicator__label';
  label.textContent = 'Current player';

  const badge = document.createElement('div');
  badge.className = `player-indicator__badge player-indicator__badge--${state.currentPlayer}`;
  badge.setAttribute('role', 'status');
  badge.setAttribute('aria-live', 'polite');

  const pawn = document.createElement('span');
  pawn.className = 'player-indicator__pawn';
  pawn.innerHTML = iconPawn(20);

  const name = document.createElement('span');
  name.className = 'player-indicator__name';
  name.textContent = state.players[state.currentPlayer].name;

  badge.append(pawn, name);
  container.append(label, badge);
  return container;
}

/** Switches the badge to a new player and pops the pawn to announce it. */
export function updatePlayerIndicator(
  indicator: HTMLElement,
  state: GameState,
  player: PlayerId,
): void {
  const badge = indicator.querySelector<HTMLElement>('.player-indicator__badge');
  const name = indicator.querySelector<HTMLElement>('.player-indicator__name');
  if (badge) {
    badge.className = `player-indicator__badge player-indicator__badge--${player}`;
  }
  if (name) {
    name.textContent = state.players[player].name;
  }
  const pawn = indicator.querySelector<HTMLElement>('.player-indicator__pawn');
  if (pawn) {
    pawn.classList.remove('player-indicator__pawn--pop');
    void pawn.offsetWidth;
    pawn.classList.add('player-indicator__pawn--pop');
  }
}
