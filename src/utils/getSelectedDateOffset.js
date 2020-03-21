const defaultModifier = (day) => day;

export default function getSelectedDateOffset(fn, day, modifier = defaultModifier) {
  if (!fn) return day;

  let cloned = day;
  if (typeof day.clone === 'function') {
    cloned = day.clone();
  }

  return modifier(fn(cloned));
}
