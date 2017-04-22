var moment = require('moment');

moment.createFromInputFallback = function(config) {
  config._d = new Date(config._i);
};

var ANONYMOUS = '<<anonymous>>';

function createInvalidRequiredErrorMessage(propName, componentName, value) {
  return new Error(
    'The prop `' + propName + '` is marked as required in `' + componentName + '`, but its value is `' + value + '`.'
  );
}

function createMomentChecker(type, typeValidator, validator, momentType) {

  function propValidator(
    isRequired, // Bound parameter to indicate with the propType is required
    predicate, // Bound parameter to allow user to add dynamic validation
    props,
    propName,
    componentName,
    location,
    propFullName
  ) {
    var propValue = props[ propName ];
    var propType = typeof propValue;

    var isPropValueUndefined = typeof propValue === 'undefined';
    var isPropValueNull = propValue === null;

    if (isRequired) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;
      if (isPropValueUndefined) {
        return createInvalidRequiredErrorMessage(propFullName, componentName, 'undefined');
      } else if (isPropValueNull) {
        return createInvalidRequiredErrorMessage(propFullName, componentName, 'null');
      }
    }

    if (isPropValueUndefined || isPropValueNull) {
      return null;
    }

    if (typeValidator && !typeValidator(propValue)) {
      return new Error(
        'Invalid input type: `' + propName + '` of type `' + propType + '` ' +
        'supplied to `' + componentName + '`, expected `' + type + '`.'
      );
    }

    if (! validator(propValue)) {
      return new Error(
        'Invalid ' + location + ' `' + propName + '` of type `' + propType + '` ' +
        'supplied to `' + componentName + '`, expected `' + momentType + '`.'
      );
    }

    if (predicate && ! predicate(propValue)) {
      var predicateName = predicate.name || ANONYMOUS;
      return new Error(
        'Invalid ' + location + ' `' + propName + '` of type `' + propType + '` ' +
        'supplied to `' + componentName + '`. Failed to succeed with predicate `' +
        predicateName + '`.'
      );
    }

    return null;

  }

  var requiredPropValidator = propValidator.bind(null, false, null);
  requiredPropValidator.isRequired = propValidator.bind(null, true, null);
  requiredPropValidator.withPredicate = function predicateApplication(predicate) {
    if (typeof predicate !== 'function') {
      throw new Error('`predicate` must be a function');
    }
    var basePropValidator = propValidator.bind(null, false, predicate);
    basePropValidator.isRequired = propValidator.bind(null, true, predicate);
    return basePropValidator;
  };

  return requiredPropValidator;

}

module.exports = {

  momentObj : createMomentChecker(
    'object',
    function(obj) {
      return typeof obj === 'object';
    },
    function isValid(value) {
      return isValidMoment(value);
    },
    'Moment'
  ),

  momentString : createMomentChecker(
    'string',
    function(str) {
      return typeof str === 'string';
    },
    function isValid(value) {
      return isValidMoment(moment(value));
    },
    'Moment'
  ),

  momentDurationObj : createMomentChecker(
    'object',
    function(obj) {
      return typeof obj === 'object';
    },
    function isValid(value) {
      return moment.isDuration(value);
    },
    'Duration'
  ),

};


function isValidMoment(testMoment) {
  if (typeof testMoment.isValid === 'function') {
    // moment 1.7.0+
    return testMoment.isValid();
  }

  return ! isNaN(testMoment);
}