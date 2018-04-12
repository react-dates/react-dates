Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _object = require('object.assign');

var _object2 = _interopRequireDefault(_object);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _airbnbPropTypes = require('airbnb-prop-types');

var _reactWithStyles = require('react-with-styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var propTypes = (0, _airbnbPropTypes.forbidExtraProps)((0, _object2['default'])({}, _reactWithStyles.withStylesPropTypes, {
  unicode: _propTypes2['default'].string.isRequired,
  label: _propTypes2['default'].string.isRequired,
  action: _propTypes2['default'].string.isRequired,
  block: _propTypes2['default'].bool
}));

var defaultProps = {
  block: false
};

function KeyboardShortcutRow(_ref) {
  var unicode = _ref.unicode,
      label = _ref.label,
      action = _ref.action,
      block = _ref.block,
      styles = _ref.styles;

  return _react2['default'].createElement(
    'li',
    (0, _reactWithStyles.css)(styles.KeyboardShortcutRow, block && styles.KeyboardShortcutRow__block),
    _react2['default'].createElement(
      'div',
      (0, _reactWithStyles.css)(styles.KeyboardShortcutRow_keyContainer, block && styles.KeyboardShortcutRow_keyContainer__block),
      _react2['default'].createElement(
        'span',
        _extends({}, (0, _reactWithStyles.css)(styles.KeyboardShortcutRow_key), {
          role: 'img',
          'aria-label': String(label) + ',' // add comma so screen readers will pause before reading action
        }),
        unicode
      )
    ),
    _react2['default'].createElement(
      'div',
      (0, _reactWithStyles.css)(styles.KeyboardShortcutRow_action),
      action
    )
  );
}

KeyboardShortcutRow.propTypes = propTypes;
KeyboardShortcutRow.defaultProps = defaultProps;

exports['default'] = (0, _reactWithStyles.withStyles)(function (_ref2) {
  var color = _ref2.reactDates.color;
  return {
    KeyboardShortcutRow: {
      listStyle: 'none',
      margin: '6px 0'
    },

    KeyboardShortcutRow__block: {
      marginBottom: 16
    },

    KeyboardShortcutRow_keyContainer: {
      display: 'inline-block',
      whiteSpace: 'nowrap',
      textAlign: 'right',
      marginRight: 6
    },

    KeyboardShortcutRow_keyContainer__block: {
      textAlign: 'left',
      display: 'inline'
    },

    KeyboardShortcutRow_key: {
      fontFamily: 'monospace',
      fontSize: 12,
      textTransform: 'uppercase',
      background: color.core.grayLightest,
      padding: '2px 6px'
    },

    KeyboardShortcutRow_action: {
      display: 'inline',
      wordBreak: 'break-word',
      marginLeft: 8
    }
  };
})(KeyboardShortcutRow);