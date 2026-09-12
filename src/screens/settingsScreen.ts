import type { ScreenDeps } from './types';
import type { BoardSize, GameSettings, PlayerId, ThemeId } from '../game/types';
import { applyTheme, getTheme, THEMES } from '../game/themes';
import { columnsForSize } from '../game/gameState';
import {
  iconCards,
  iconExit,
  iconPalette,
  iconPawn,
  iconPlay,
} from '../components/icons';

interface RadioOption<T extends string | number> {
  value: T;
  label: string;
}

/**
 * Settings screen. Light background, two-column desktop layout: configuration
 * form on the left, live theme preview on the right, and a bottom navigation
 * strip with a yellow Start button.
 */
export function renderSettingsScreen(root: HTMLElement, deps: ScreenDeps): void {
  root.className = 'screen screen--settings';

  const settings: GameSettings = { ...deps.getSettings() };

  const main = document.createElement('main');
  main.className = 'settings';

  const header = document.createElement('header');
  header.className = 'settings__header';

  const heading = document.createElement('h2');
  heading.className = 'settings__heading';
  heading.textContent = 'Settings';

  const underline = document.createElement('div');
  underline.className = 'settings__underline';
  underline.setAttribute('aria-hidden', 'true');
  const diamond = document.createElement('span');
  diamond.className = 'settings__underline-diamond';
  underline.appendChild(diamond);

  header.append(heading, underline);

  const layout = document.createElement('div');
  layout.className = 'settings__layout';

  const form = document.createElement('form');
  form.className = 'settings__form';
  form.setAttribute('novalidate', '');

  const previewWrap = document.createElement('div');
  previewWrap.className = 'settings__preview-wrap';

  const preview = document.createElement('div');
  preview.className = 'settings__preview';
  preview.setAttribute('aria-hidden', 'true');

  const nav = document.createElement('div');
  nav.className = 'settings__nav';

  previewWrap.append(preview, nav);
  layout.append(form, previewWrap);
  main.append(header, layout);
  root.appendChild(main);

  const handleStart = (): void => {
    deps.setSettings(settings);
    deps.startGame();
  };

  const refreshNav = (animate = false): void => buildNav(nav, settings, handleStart, animate);

  // ---- A. Game themes ------------------------------------------------------
  const themeGroup = createRadioGroup<ThemeId>(
    'Game themes',
    iconPalette(20),
    'theme',
    'palette',
    THEMES.map((t) => ({
      value: t.id,
      label: t.name.endsWith('theme') ? t.name : `${t.name} theme`,
    })),
    settings.theme,
    (value) => {
      settings.theme = value;
      buildPreview(preview, settings, true);
      refreshNav(true);
    },
    { showAccent: true },
  );

  // ---- B. Choose player ----------------------------------------------------
  const playerGroup = createRadioGroup<PlayerId>(
    'Choose player',
    iconPawn(20),
    'player',
    'pawn',
    [
      { value: 'blue', label: 'Blue' },
      { value: 'orange', label: 'Orange' },
    ],
    settings.startingPlayer,
    (value) => {
      settings.startingPlayer = value;
      buildPreview(preview, settings, true);
      refreshNav(true);
    },
  );

  // ---- C. Board size -------------------------------------------------------
  const boardGroup = createRadioGroup<BoardSize>(
    'Board size',
    iconCards(20),
    'board',
    'cards',
    [
      { value: 16, label: '16 cards' },
      { value: 24, label: '24 cards' },
      { value: 36, label: '36 cards' },
    ],
    settings.boardSize,
    (value) => {
      settings.boardSize = value;
      refreshNav(true);
    },
  );

  form.append(themeGroup, playerGroup, boardGroup);

  buildPreview(preview, settings, false);
  refreshNav(false);
}

// ---------------------------------------------------------------------------
// Radio group builder
// ---------------------------------------------------------------------------

function createRadioGroup<T extends string | number>(
  legend: string,
  legendIcon: string,
  name: string,
  iconTone: 'palette' | 'pawn' | 'cards',
  options: RadioOption<T>[],
  selected: T,
  onChange: (value: T) => void,
  opts: { showAccent?: boolean } = {},
): HTMLElement {
  const fieldset = document.createElement('fieldset');
  fieldset.className = 'settings-group';

  const legendEl = document.createElement('legend');
  legendEl.className = 'settings-group__legend';

  const icon = document.createElement('span');
  icon.className = `settings-group__legend-icon settings-group__legend-icon--${iconTone}`;
  icon.innerHTML = legendIcon;
  legendEl.append(icon, document.createTextNode(legend));

  const list = document.createElement('div');
  list.className = 'radio-list';
  list.setAttribute('role', 'radiogroup');
  list.setAttribute('aria-label', legend);

  options.forEach((opt) => {
    const label = document.createElement('label');
    label.className = 'radio';

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = name;
    input.value = String(opt.value);
    input.className = 'radio__input';
    input.checked = opt.value === selected;

    const mark = document.createElement('span');
    mark.className = 'radio__mark';

    const text = document.createElement('span');
    text.className = 'radio__text';
    text.textContent = opt.label;

    label.append(input, mark, text);

    if (opts.showAccent) {
      const accent = document.createElement('span');
      accent.className = 'radio__accent';
      accent.setAttribute('aria-hidden', 'true');
      label.appendChild(accent);
    }

    if (input.checked) {
      label.classList.add('radio--selected');
    }

    input.addEventListener('change', () => {
      if (!input.checked) return;

      list.querySelectorAll('.radio--selected').forEach((el) => {
        el.classList.remove('radio--selected', 'radio--pulse');
      });
      label.classList.add('radio--selected', 'radio--pulse');
      window.setTimeout(() => label.classList.remove('radio--pulse'), 320);

      onChange(opt.value);
    });

    list.appendChild(label);
  });

  fieldset.append(legendEl, list);
  return fieldset;
}

// ---------------------------------------------------------------------------
// Preview — mini game screen matching the design mock
// ---------------------------------------------------------------------------

function buildPreview(
  container: HTMLElement,
  settings: GameSettings,
  animate: boolean,
): void {
  container.innerHTML = '';
  applyTheme(container, settings.theme);

  const theme = getTheme(settings.theme);

  const hud = document.createElement('div');
  hud.className = 'settings__preview-hud';

  const scores = document.createElement('div');
  scores.className = 'preview-scores';

  (['blue', 'orange'] as PlayerId[]).forEach((pid) => {
    const row = document.createElement('span');
    row.className = `preview-scores__player preview-scores__player--${pid}`;

    const pawn = document.createElement('span');
    pawn.className = 'preview-scores__pawn';
    pawn.innerHTML = iconPawn(14);

    const name = document.createElement('span');
    name.className = 'preview-scores__name';
    name.textContent = pid === 'blue' ? 'Blue' : 'Orange';

    const score = document.createElement('span');
    score.className = 'preview-scores__score';
    score.textContent = '0';

    row.append(pawn, name, score);
    scores.appendChild(row);
  });

  const current = document.createElement('div');
  current.className = 'preview-current';

  const currentLabel = document.createElement('span');
  currentLabel.className = 'preview-current__label';
  currentLabel.textContent = 'Current player:';

  const currentBadge = document.createElement('span');
  currentBadge.className = `preview-current__badge preview-current__badge--${settings.startingPlayer}`;
  currentBadge.innerHTML = iconPawn(16);

  current.append(currentLabel, currentBadge);

  const exit = document.createElement('div');
  exit.className = 'preview-exit';
  const exitIcon = document.createElement('span');
  exitIcon.className = 'preview-exit__icon';
  exitIcon.innerHTML = iconExit(16);
  const exitText = document.createElement('span');
  exitText.className = 'preview-exit__text';
  exitText.textContent = 'Exit game';
  exit.append(exitIcon, exitText);

  hud.append(scores, current, exit);

  const cards = document.createElement('div');
  cards.className = 'settings__preview-cards';

  const front = document.createElement('div');
  front.className = 'preview-card preview-card--front';

  const back = document.createElement('div');
  back.className = 'preview-card preview-card--back';
  const backIcon = document.createElement('span');
  backIcon.className = 'preview-card__icon';
  backIcon.innerHTML = theme.symbols[0]?.icon ?? '';
  back.appendChild(backIcon);

  cards.append(front, back);
  container.append(hud, cards);

  if (animate) {
    container.classList.remove('settings__preview--pulse');
    void container.offsetWidth;
    container.classList.add('settings__preview--pulse');
  }
}

// ---------------------------------------------------------------------------
// Bottom navigation
// ---------------------------------------------------------------------------

function buildNav(
  container: HTMLElement,
  settings: GameSettings,
  onStart: () => void,
  animate: boolean,
): void {
  container.innerHTML = '';

  const theme = getTheme(settings.theme);
  const columns = columnsForSize(settings.boardSize);
  const rows = settings.boardSize / columns;
  const themeLabel = theme.name.endsWith('theme') ? theme.name : `${theme.name} theme`;

  const steps: Array<{ label: string; value: string }> = [
    { label: 'Game theme', value: themeLabel },
    { label: 'Player', value: settings.startingPlayer === 'blue' ? 'Blue' : 'Orange' },
    { label: 'Board size', value: `${settings.boardSize} cards · ${columns}×${rows}` },
  ];

  const stepsWrap = document.createElement('div');
  stepsWrap.className = 'settings__nav-steps';
  if (animate) {
    stepsWrap.classList.add('settings__nav-steps--pulse');
  }

  steps.forEach((step, i) => {
    const item = document.createElement('div');
    item.className = 'settings__nav-step';

    const label = document.createElement('span');
    label.className = 'settings__nav-step-label';
    label.textContent = step.label;

    const value = document.createElement('span');
    value.className = 'settings__nav-step-value';
    value.textContent = step.value;

    item.append(label, value);
    stepsWrap.appendChild(item);

    if (i < steps.length - 1) {
      const sep = document.createElement('span');
      sep.className = 'settings__nav-sep';
      sep.setAttribute('aria-hidden', 'true');
      sep.textContent = '/';
      stepsWrap.appendChild(sep);
    }
  });

  const start = document.createElement('button');
  start.type = 'button';
  start.className = 'btn btn--primary settings__start';

  const startIcon = document.createElement('span');
  startIcon.className = 'btn__icon';
  startIcon.innerHTML = iconPlay(18);

  const startText = document.createElement('span');
  startText.className = 'btn__label';
  startText.textContent = 'Start';

  start.append(startIcon, startText);
  start.addEventListener('click', onStart);

  container.append(stepsWrap, start);
}
