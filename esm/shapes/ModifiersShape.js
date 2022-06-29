import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import PropTypes from 'prop-types';
import { and } from 'airbnb-prop-types';
export default and([PropTypes.instanceOf(Set), function modifiers(props, propName) {
  for (var _len = arguments.length, rest = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    rest[_key - 2] = arguments[_key];
  }

  var propValue = props[propName];
  var firstError;

  _toConsumableArray(propValue).some(function (v, i) {
    var _PropTypes$string;

    var fakePropName = "".concat(propName, ": index ").concat(i);
    firstError = (_PropTypes$string = PropTypes.string).isRequired.apply(_PropTypes$string, [_defineProperty({}, fakePropName, v), fakePropName].concat(rest));
    return firstError != null;
  });

  return firstError == null ? null : firstError;
}], 'Modifiers (Set of Strings)');