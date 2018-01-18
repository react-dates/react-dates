const defaultModifier = day => day;

export default function getSelectedDateOffset(fn, day, modifier = defaultModifier) {
  if (!fn) return day;
  return modifier(fn(day.clone()));
}
