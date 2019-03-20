const validIdListRegex = /(([A-Za-z]+[\w\-\:\.]*)\s*)*/;

// A more complex regex is used here so that
// all IDs in an array must work. Even one incorrect
// id in the list will cause this to return false.
function isValidIdList(idList = '') {
  const matches = idList.match(validIdListRegex);
  return matches && matches.includes(idList);
}

// validates a list of IDs for use in aria-labelledby attributes
// valid ID format is listed here:
// https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id
export default function (props, propName, componentName) {
  if (!isValidIdList(props[propName])) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed.`,
    );
  }
  return true;
}
