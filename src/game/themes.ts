import type { MemorySymbol, ThemeDefinition, ThemeId } from './types';

/**
 * Card-face artwork comes from the SVG packs in `public/cards/icons/`
 * (extracted per theme, 18 motifs each). Each motif is an <img> so the
 * artwork scales cleanly at any card size without clipping.
 */
const asset = (path: string): string => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

function art(theme: string, num: number, label: string): MemorySymbol {
  return {
    id: `${theme}-${num}`,
    label,
    icon: `<img class="card-icon" src="${asset(`cards/icons/${theme}-${num}.svg`)}" alt="" draggable="false" />`,
  };
}

// ---- Code vibes -----------------------------------------------------------

const codeSymbols: MemorySymbol[] = [
  art('code-vibes', 1, 'Git'),
  art('code-vibes', 2, 'TypeScript'),
  art('code-vibes', 3, 'JavaScript'),
  art('code-vibes', 4, 'HTML5'),
  art('code-vibes', 5, 'VS Code'),
  art('code-vibes', 6, 'Django'),
  art('code-vibes', 7, 'CSS3'),
  art('code-vibes', 8, 'Angular'),
  art('code-vibes', 9, 'Terminal'),
  art('code-vibes', 10, 'Python'),
  art('code-vibes', 11, 'GitHub'),
  art('code-vibes', 12, 'Node.js'),
  art('code-vibes', 13, 'Bootstrap'),
  art('code-vibes', 14, 'Vue.js'),
  art('code-vibes', 15, 'React'),
  art('code-vibes', 16, 'Sass'),
  art('code-vibes', 17, 'Database'),
  art('code-vibes', 18, 'Firebase'),
];

// ---- Gaming ---------------------------------------------------------------

const gamingSymbols: MemorySymbol[] = [
  art('game', 1, 'Pawn'),
  art('game', 2, 'Pawn piece'),
  art('game', 3, 'Game piece'),
  art('game', 4, 'Ring'),
  art('game', 5, 'Puzzle piece'),
  art('game', 6, 'Mushroom'),
  art('game', 7, 'Juggling balls'),
  art('game', 8, 'Banana'),
  art('game', 9, 'Controller'),
  art('game', 10, 'Ghost'),
  art('game', 11, 'Coin'),
  art('game', 12, 'Snake game'),
  art('game', 13, 'Medal'),
  art('game', 14, 'Pac-Man'),
  art('game', 15, 'Game console'),
  art('game', 16, 'Puzzle pieces'),
  art('game', 17, 'Playing card'),
  art('game', 18, 'Play button'),
];

// ---- DA Projects ----------------------------------------------------------

const daSymbols: MemorySymbol[] = [
  art('da-projects', 1, 'Ramen bowl'),
  art('da-projects', 2, 'Noodle bowl'),
  art('da-projects', 3, 'Fried egg'),
  art('da-projects', 4, 'Blossom'),
  art('da-projects', 5, 'jQuery'),
  art('da-projects', 6, 'Chef hat'),
  art('da-projects', 7, 'Leaf'),
  art('da-projects', 8, 'Pie'),
  art('da-projects', 9, 'Poké Ball'),
  art('da-projects', 10, 'Calculator'),
  art('da-projects', 11, 'Smiley'),
  art('da-projects', 12, 'Paper plane'),
  art('da-projects', 13, 'Chat bubbles'),
  art('da-projects', 14, 'Party hat'),
  art('da-projects', 15, 'Broccoli'),
  art('da-projects', 16, 'Team'),
  art('da-projects', 17, 'Wave'),
  art('da-projects', 18, 'Coins'),
];

// ---- Foods ----------------------------------------------------------------

const foodSymbols: MemorySymbol[] = [
  art('food', 1, 'Fries'),
  art('food', 2, 'Pizza'),
  art('food', 3, 'Sandwich'),
  art('food', 4, 'Donut'),
  art('food', 5, 'Sushi'),
  art('food', 6, 'Corn dog'),
  art('food', 7, 'Burger'),
  art('food', 8, 'Pretzel'),
  art('food', 9, 'Cupcake'),
  art('food', 10, 'Soft drink'),
  art('food', 11, 'Pudding'),
  art('food', 12, 'Chocolate bar'),
  art('food', 13, 'Chicken bucket'),
  art('food', 14, 'Wrap'),
  art('food', 15, 'Taco'),
  art('food', 16, 'Ice cream'),
  art('food', 17, 'Salad'),
  art('food', 18, 'Macarons'),
];

export const THEMES: ThemeDefinition[] = [
  {
    id: 'code',
    name: 'Code vibes',
    background: '#30302f',
    primary: '#4fd0bd',
    secondary: '#2da9f3',
    blue: '#2da9f3',
    orange: '#ff8b36',
    offWhite: '#f4f4f1',
    cardBackGradient: 'linear-gradient(145deg, #55d8c5, #43c8b7 55%, #36aa9e)',
    cardBackIcon: '#eafffb',
    cardBackImage: asset('cards/backs/code-vibes.svg'),
    symbols: codeSymbols,
    enabled: true,
  },
  {
    id: 'gaming',
    name: 'Gaming theme',
    background: '#191722',
    primary: '#9b5cf6',
    secondary: '#f472b6',
    blue: '#38bdf8',
    orange: '#fb7185',
    offWhite: '#f3eefc',
    cardBackGradient: 'linear-gradient(145deg, #8b5cf6, #6d3bd0 55%, #4c2a9e)',
    cardBackIcon: '#f5eeff',
    cardBackImage: asset('cards/backs/game.svg'),
    symbols: gamingSymbols,
    enabled: true,
  },
  {
    id: 'da-projects',
    name: 'DA Projects theme',
    background: '#1f2430',
    primary: '#f59e0b',
    secondary: '#14b8a6',
    blue: '#3b82f6',
    orange: '#f97316',
    offWhite: '#f8f5ee',
    cardBackGradient: 'linear-gradient(145deg, #f59e0b, #d97706 55%, #b45309)',
    cardBackIcon: '#fff7e6',
    cardBackImage: asset('cards/backs/da-projects.svg'),
    symbols: daSymbols,
    enabled: true,
  },
  {
    id: 'foods',
    name: 'Foods theme',
    background: '#2b2018',
    primary: '#f97316',
    secondary: '#fbbf24',
    blue: '#60a5fa',
    orange: '#fb923c',
    offWhite: '#fdf6ec',
    cardBackGradient: 'linear-gradient(145deg, #fb923c, #f97316 55%, #ea580c)',
    cardBackIcon: '#fff3e8',
    cardBackImage: asset('cards/backs/food.svg'),
    symbols: foodSymbols,
    enabled: true,
  },
];

export function getTheme(id: ThemeId): ThemeDefinition {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}

/** Applies theme id + card-back image CSS var (works with relative `base`). */
export function applyTheme(el: HTMLElement, id: ThemeId): void {
  const theme = getTheme(id);
  el.dataset.theme = theme.id;
  // Custom-property urls are resolved against the CSS file (in /assets/),
  // so use an absolute page URL instead of a relative path.
  const absoluteBack = new URL(theme.cardBackImage, window.location.href).href;
  el.style.setProperty('--theme-card-back-img', `url("${absoluteBack}")`);
}
