var defaultModifier = function defaultModifier(day) {
  return day;
};

export default function getSelectedDateOffset(fn, day) {
  var modifier = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultModifier;

  if (!fn) return day;
  return modifier(fn(day.clone()));
}