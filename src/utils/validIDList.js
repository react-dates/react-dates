const validIDListRegex = /^(([A-Za-z]+[\w\-:.]*)\s*)+$/;

// Falsy values should return valid to allow
// undeclared props through
function isValidIDList(list) {
  if (!list) return true;
  return validIDListRegex.test(list || '');
}

// validates a list of IDs for use in aria-labelledby attributes
// valid ID format is listed here:
// https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id
export default function validIDList(properties, propName, componentName) {
  if (!isValidIDList(properties[propName])) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed.`,
    );
  }
  return null;
}
