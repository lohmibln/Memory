import type { MemoryCard } from '../game/types';

/**
 * Renders a single memory card as a <button>. The 3D flip is driven by the
 * `.is-flipped` class; matched cards get `.is-matched`. Colours and the
 * card-back artwork come from the theme via CSS custom properties set on the
 * screen root (`data-theme`).
 */
export function renderMemoryCard(
  card: MemoryCard,
  index: number,
  onClick: (id: string) => void,
): HTMLElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'memory-card';
  button.dataset.cardId = card.id;
  button.setAttribute('aria-label', card.isMatched || card.isFlipped ? card.symbol.label : 'Hidden card');
  button.style.setProperty('--card-index', String(index));

  if (card.isMatched) button.classList.add('is-matched');
  if (card.isFlipped) button.classList.add('is-flipped');

  const inner = document.createElement('div');
  inner.className = 'memory-card__inner';

  const back = document.createElement('div');
  back.className = 'memory-card__back';

  const front = document.createElement('div');
  front.className = 'memory-card__front';
  const symbol = document.createElement('span');
  symbol.className = 'memory-card__symbol';
  symbol.innerHTML = card.symbol.icon;
  const label = document.createElement('span');
  label.className = 'memory-card__label';
  label.textContent = card.symbol.label;
  front.append(symbol, label);

  inner.append(back, front);
  button.appendChild(inner);

  button.addEventListener('click', () => onClick(card.id));
  return button;
}
