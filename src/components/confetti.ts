const CONFETTI_COLORS = ['#e0524d', '#f5ed68', '#5aa24a', '#2da9f3'];
const CONFETTI_COUNT = 40;

/**
 * Creates a decorative confetti banner (30–50 pieces) concentrated near the
 * top of the winner screen. Positions, rotation, delay and duration are
 * randomized in TypeScript; the fall animation is pure SCSS.
 */
export function renderConfetti(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'confetti';
  container.setAttribute('aria-hidden', 'true');

  for (let i = 0; i < CONFETTI_COUNT; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti__piece';

    const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    const left = Math.random() * 100;
    const rotation = Math.random() * 360;
    const delay = Math.random() * 2.5;
    const duration = 2.4 + Math.random() * 2.2;
    const width = 6 + Math.random() * 6;
    const height = 9 + Math.random() * 7;
    const curved = Math.random() > 0.5;

    piece.style.background = color;
    piece.style.left = `${left}%`;
    piece.style.width = `${width}px`;
    piece.style.height = `${height}px`;
    piece.style.setProperty('--confetti-rotate', `${rotation}deg`);
    piece.style.animationDelay = `${delay}s`;
    piece.style.animationDuration = `${duration}s`;
    if (curved) piece.style.borderRadius = '2px';
    else piece.style.borderRadius = '0';

    container.appendChild(piece);
  }

  return container;
}
