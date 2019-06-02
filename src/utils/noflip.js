const NOFLIP = '/* @noflip */';

// Appends a noflip comment to a style rule in order to prevent it from being automatically
// flipped in RTL contexts. This should be used only in situations where the style must remain
// unflipped regardless of direction context. See: https://github.com/kentcdodds/rtl-css-js#usage
export default function noflip(value) {
  if (typeof value === 'number') return `${value}px ${NOFLIP}`;
  if (typeof value === 'string') return `${value} ${NOFLIP}`;

  throw new TypeError('noflip expects a string or a number');
}
