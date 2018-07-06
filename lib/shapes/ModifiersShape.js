Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _airbnbPropTypes = require('airbnb-prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports['default'] = (0, _airbnbPropTypes.and)([_propTypes2['default'].instanceOf(Set), function () {
  function modifiers(props, propName) {
    for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      rest[_key - 2] = arguments[_key];
    }

    var propValue = props[propName];

    var firstError = void 0;
    [].concat(_toConsumableArray(propValue)).some(function (v, i) {
      var _PropTypes$string;

      var fakePropName = String(propName) + ': index ' + String(i);
      firstError = (_PropTypes$string = _propTypes2['default'].string).isRequired.apply(_PropTypes$string, [_defineProperty({}, fakePropName, v), fakePropName].concat(rest));
      return firstError != null;
    });
    return firstError == null ? null : firstError;
  }

  return modifiers;
}()], 'Modifiers (Set of Strings)');