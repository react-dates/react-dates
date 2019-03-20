const validIdListRegex = /(([A-Za-z]+[\w\-\:\.]*)\s*)*/;

// A more complex regex is used here so that
// all id's in an array must work. Even one incorrect
// id in the list will cause this to return false.
function isIdList(idList = '') {
  const matches = idList.match(validIdListRegex);
  return matches && matches.includes(idList);
}

// validates a list of IDs for use in aria-labelledby attributes
export default function (props, propName, componentName) {
  if (!isIdList(props[propName])) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed.`,
    );
  }
  return true;
}
