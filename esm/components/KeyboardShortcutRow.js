var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import _objectAssign from 'object.assign';
import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';

var propTypes = forbidExtraProps(_objectAssign({}, withStylesPropTypes, {
  unicode: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  block: PropTypes.bool
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

  return React.createElement(
    'li',
    css(styles.KeyboardShortcutRow, block && styles.KeyboardShortcutRow__block),
    React.createElement(
      'div',
      css(styles.KeyboardShortcutRow_keyContainer, block && styles.KeyboardShortcutRow_keyContainer__block),
      React.createElement(
        'span',
        _extends({}, css(styles.KeyboardShortcutRow_key), {
          role: 'img',
          'aria-label': String(label) + ',' // add comma so screen readers will pause before reading action
        }),
        unicode
      )
    ),
    React.createElement(
      'div',
      css(styles.KeyboardShortcutRow_action),
      action
    )
  );
}

KeyboardShortcutRow.propTypes = propTypes;
KeyboardShortcutRow.defaultProps = defaultProps;

export default withStyles(function (_ref2) {
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