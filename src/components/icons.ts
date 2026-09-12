/**
 * Icons via Google's Material Symbols icon font (loaded in index.html).
 * Glyphs scale to any size and recolor with `color` — no fixed viewBox that
 * can clip on small screens. When `size` is omitted the icon inherits its
 * size from CSS, so responsive styles control it.
 */

export type IconSize = number;

function glyph(name: string, size?: IconSize): string {
  const style = size !== undefined ? ` style="font-size:${size}px"` : '';
  return `<span class="material-symbols-outlined"${style} aria-hidden="true">${name}</span>`;
}

// ---- Navigation / actions -------------------------------------------------

export const iconArrowRight = (size?: IconSize): string => glyph('arrow_forward', size);

export const iconPlay = (size?: IconSize): string => glyph('play_arrow', size);

export const iconExit = (size?: IconSize): string => glyph('logout', size);

// ---- Home / decorative ----------------------------------------------------

export const iconController = (size?: IconSize): string => glyph('sports_esports', size);

// ---- Settings icons -------------------------------------------------------

export const iconPalette = (size?: IconSize): string => glyph('palette', size);

export const iconPawn = (size?: IconSize): string => glyph('person', size);

export const iconCards = (size?: IconSize): string => glyph('style', size);

// ---- Code theme card motifs ----------------------------------------------

export const iconCodeBrackets = (size?: IconSize): string => glyph('code', size);

export const iconBraces = (size?: IconSize): string => glyph('data_object', size);

export const iconTerminal = (size?: IconSize): string => glyph('terminal', size);

export const iconDatabase = (size?: IconSize): string => glyph('database', size);

export const iconBug = (size?: IconSize): string => glyph('bug_report', size);

export const iconFolder = (size?: IconSize): string => glyph('folder', size);

export const iconGitBranch = (size?: IconSize): string => glyph('account_tree', size);

export const iconCloud = (size?: IconSize): string => glyph('cloud', size);

export const iconServer = (size?: IconSize): string => glyph('dns', size);

export const iconHtml = (size?: IconSize): string => glyph('html', size);

export const iconPackage = (size?: IconSize): string => glyph('deployed_code', size);

export const iconApi = (size?: IconSize): string => glyph('api', size);

export const iconKeyboard = (size?: IconSize): string => glyph('keyboard', size);

// ---- Gaming theme card motifs --------------------------------------------

export const iconHeart = (size?: IconSize): string => glyph('favorite', size);

export const iconSword = (size?: IconSize): string => glyph('swords', size);

export const iconShield = (size?: IconSize): string => glyph('shield', size);

export const iconPotion = (size?: IconSize): string => glyph('science', size);

export const iconTrophy = (size?: IconSize): string => glyph('emoji_events', size);

export const iconGhost = (size?: IconSize): string => glyph('smart_toy', size);

export const iconStar = (size?: IconSize): string => glyph('star', size);

export const iconCartridge = (size?: IconSize): string => glyph('sd_card', size);

export const iconDice = (size?: IconSize): string => glyph('casino', size);

export const iconHeadset = (size?: IconSize): string => glyph('headset_mic', size);

export const iconJoystick = (size?: IconSize): string => glyph('stadia_controller', size);

// ---- DA Projects theme card motifs ---------------------------------------

export const iconPenTool = (size?: IconSize): string => glyph('edit', size);

export const iconRuler = (size?: IconSize): string => glyph('square_foot', size);

export const iconLayers = (size?: IconSize): string => glyph('layers', size);

export const iconImage = (size?: IconSize): string => glyph('image', size);

export const iconType = (size?: IconSize): string => glyph('title', size);

export const iconCursor = (size?: IconSize): string => glyph('near_me', size);

export const iconFrame = (size?: IconSize): string => glyph('filter_frames', size);

export const iconGrid = (size?: IconSize): string => glyph('grid_on', size);

export const iconComponent = (size?: IconSize): string => glyph('widgets', size);

export const iconPrototype = (size?: IconSize): string => glyph('touch_app', size);

export const iconDesign = (size?: IconSize): string => glyph('token', size);

// ---- Foods theme card motifs ---------------------------------------------

export const iconPizza = (size?: IconSize): string => glyph('local_pizza', size);

export const iconBurger = (size?: IconSize): string => glyph('lunch_dining', size);

export const iconSushi = (size?: IconSize): string => glyph('set_meal', size);

export const iconTaco = (size?: IconSize): string => glyph('kebab_dining', size);

export const iconFries = (size?: IconSize): string => glyph('fastfood', size);

export const iconDonut = (size?: IconSize): string => glyph('cookie', size);

export const iconApple = (size?: IconSize): string => glyph('nutrition', size);

export const iconCoffee = (size?: IconSize): string => glyph('local_cafe', size);

export const iconRamen = (size?: IconSize): string => glyph('ramen_dining', size);

export const iconCroissant = (size?: IconSize): string => glyph('bakery_dining', size);

export const iconCake = (size?: IconSize): string => glyph('cake', size);

export const iconWatermelon = (size?: IconSize): string => glyph('local_drink', size);

// ---- Extra code motifs ----------------------------------------------------

export const iconCodeFile = (size?: IconSize): string =>
  glyph('integration_instructions', size);

export const iconCommand = (size?: IconSize): string => glyph('keyboard_command_key', size);

export const iconGitCommit = (size?: IconSize): string => glyph('commit', size);

export const iconSquareCode = (size?: IconSize): string => glyph('css', size);

// ---- Extra gaming motifs --------------------------------------------------

export const iconCoin = (size?: IconSize): string => glyph('monetization_on', size);

export const iconBomb = (size?: IconSize): string => glyph('bomb', size);

export const iconCrown = (size?: IconSize): string => glyph('crown', size);

export const iconFlag = (size?: IconSize): string => glyph('flag', size);

// ---- Extra design/project motifs ------------------------------------------

export const iconBrush = (size?: IconSize): string => glyph('brush', size);

export const iconScissors = (size?: IconSize): string => glyph('content_cut', size);

export const iconEye = (size?: IconSize): string => glyph('visibility', size);

export const iconSliders = (size?: IconSize): string => glyph('tune', size);

// ---- Extra food motifs ----------------------------------------------------

export const iconIceCream = (size?: IconSize): string => glyph('icecream', size);

export const iconEgg = (size?: IconSize): string => glyph('egg', size);

export const iconBread = (size?: IconSize): string => glyph('breakfast_dining', size);

export const iconBrunch = (size?: IconSize): string => glyph('brunch_dining', size);

export const iconDinner = (size?: IconSize): string => glyph('dinner_dining', size);

export const iconCookie = (size?: IconSize): string => glyph('cookie', size);

// ---- Result / misc --------------------------------------------------------

export const iconScales = (size?: IconSize): string => glyph('balance', size);

export const iconMonitorCode = (size?: IconSize): string => glyph('code_blocks', size);
