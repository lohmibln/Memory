import type { ScreenDeps } from './types';
import { iconArrowRight, iconController } from '../components/icons';

/**
 * Home / landing screen. Dark charcoal background with an editorial headline,
 * a yellow Play call-to-action and a large floating controller outline.
 */
export function renderHomeScreen(root: HTMLElement, deps: ScreenDeps): void {
  root.className = 'screen screen--home';

  const main = document.createElement('main');
  main.className = 'home';

  const content = document.createElement('section');
  content.className = 'home__content';

  const eyebrow = document.createElement('p');
  eyebrow.className = 'home__eyebrow';
  eyebrow.textContent = "It's play time.";

  const headline = document.createElement('h1');
  headline.className = 'home__headline';
  headline.textContent = 'Ready to play?';

  const playButton = document.createElement('button');
  playButton.type = 'button';
  playButton.className = 'btn btn--primary home__play';
  playButton.setAttribute('aria-label', 'Play game');

  const playIcon = document.createElement('span');
  playIcon.className = 'btn__icon';
  playIcon.innerHTML = iconController(20);

  const playText = document.createElement('span');
  playText.className = 'btn__label';
  playText.textContent = 'Play';

  const arrow = document.createElement('span');
  arrow.className = 'btn__icon btn__icon--end';
  arrow.innerHTML = iconArrowRight(20);

  playButton.append(playIcon, playText, arrow);
  playButton.addEventListener('click', deps.goToSettings);

  content.append(eyebrow, headline, playButton);

  const controller = document.createElement('div');
  controller.className = 'home__controller';
  controller.setAttribute('aria-hidden', 'true');
  // Pass no fixed px size — CSS scales the glyph via font-size: inherit.
  controller.innerHTML =
    '<span class="material-symbols-outlined home__controller-icon" aria-hidden="true">sports_esports</span>';

  main.append(content, controller);
  root.appendChild(main);
}
