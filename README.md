# Memory

A two-player browser memory game. Flip cards, find matching pairs, and race your opponent to the highest score.

## Features

- **Two players** — Blue and Orange take turns; pick who starts
- **Four themes** — Code vibes, Gaming, DA Projects, and Foods
- **Board sizes** — 16, 24, or 36 cards
- **Live settings preview** — See theme and layout before you start
- **Responsive** — Playable from desktop down to ~320px-wide phones

## Getting started

Requirements: [Node.js](https://nodejs.org/) (v18+ recommended)

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

### Other scripts

```bash
npm run build    # Type-check and build for production
npm run preview  # Serve the production build locally
```

## How to play

1. Open the app and click **Play**
2. Choose a theme, starting player, and board size
3. Click **Start**
4. On your turn, flip two cards
   - **Match** → you score a point and play again
   - **No match** → cards flip back and it’s the other player’s turn
5. When all pairs are found, the player with more matches wins (or it’s a draw)

You can leave a game via **Exit game** — you’ll be asked to confirm first.

## Tech stack

- TypeScript
- Vite
- Sass

## Project structure

```
src/
  components/   # Cards, scores, dialogs, icons
  game/         # Rules, deck, themes, state
  screens/      # Home, settings, game, results
  styles/       # Global and screen styles
public/cards/   # Theme card backs and face icons
```

## License

Private project — all rights reserved unless otherwise noted.
