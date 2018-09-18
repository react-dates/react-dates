import React from 'react';
import PropTypes from 'prop-types';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';
import { Portal } from 'react-portal';
import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
import { addEventListener } from 'consolidated-events';
import isTouchDevice from 'is-touch-device';
import OutsideClickHandler from 'react-outside-click-handler';

import defaultPhrases from '../defaultPhrases';

import anchorDirectionShape from '../shapes/AnchorDirectionShape';
import openDirectionShape from '../shapes/OpenDirectionShape';
import orientationShape from '../shapes/OrientationShape';

import getResponsiveContainerStyles from '../utils/getResponsiveContainerStyles';
import getDetachedContainerStyles from '../utils/getDetachedContainerStyles';
import getInputHeight from '../utils/getInputHeight';
import disableScroll from '../utils/disableScroll';
import BaseClass, { pureComponentAvailable } from '../utils/baseClass';

import CloseButton from './CloseButton';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
  ANCHOR_LEFT,
  ANCHOR_RIGHT,
  OPEN_DOWN,
  OPEN_UP,
  DEFAULT_VERTICAL_SPACING,
} from '../constants';

const propTypes = forbidExtraProps({
  ...withStylesPropTypes,
  anchorDirection: anchorDirectionShape,
  appendToBody: PropTypes.bool,
  block: PropTypes.bool,
  closeDatePickerPhrase: PropTypes.string,
  customCloseIcon: PropTypes.node,
  disableScroll: PropTypes.bool,
  dropdown: PropTypes.node,
  focused: PropTypes.bool,
  input: PropTypes.node,
  isRTL: PropTypes.bool,
  keepFocusOnInput: PropTypes.bool,
  onFocusChange: PropTypes.func,
  openDirection: openDirectionShape,
  orientation: orientationShape,
  readOnly: PropTypes.bool,
  small: PropTypes.bool,
  verticalSpacing: nonNegativeInteger,
  withFullScreenPortal: PropTypes.bool,
  withPortal: PropTypes.bool,
});

const defaultProps = {
  anchorDirection: ANCHOR_LEFT,
  appendToBody: false,
  block: false,
  closeDatePickerPhrase: defaultPhrases.closeDatePicker,
  customCloseIcon: null,
  disableScroll: false,
  dropdown: null,
  focused: false,
  input: null,
  isRTL: false,
  keepFocusOnInput: false,
  onFocusChange() {},
  openDirection: OPEN_DOWN,
  orientation: HORIZONTAL_ORIENTATION,
  readOnly: false,
  small: false,
  verticalSpacing: DEFAULT_VERTICAL_SPACING,
  withFullScreenPortal: false,
  withPortal: false,
};

/** @extends React.Component */
class DropDownController extends BaseClass {
  constructor(props) {
    super(props);

    this.isTouchDevice = false;

    this.state = {
      dayPickerContainerStyles: {},
      isDayPickerFocused: false,
      isInputFocused: false,
      showKeyboardShortcuts: false,
    };

    this.onOutsideClick = this.onOutsideClick.bind(this);
    this.onInputFocus = this.onInputFocus.bind(this);
    this.onDayPickerFocus = this.onDayPickerFocus.bind(this);
    this.onDayPickerBlur = this.onDayPickerBlur.bind(this);
    this.showKeyboardShortcutsPanel = this.showKeyboardShortcutsPanel.bind(this);

    this.responsivizePickerPosition = this.responsivizePickerPosition.bind(this);
    this.disableScroll = this.disableScroll.bind(this);

    this.setDayPickerContainerRef = this.setDayPickerContainerRef.bind(this);
    this.setContainerRef = this.setContainerRef.bind(this);
  }

  /* istanbul ignore next */
  componentDidMount() {
    this.removeEventListener = addEventListener(
      window,
      'resize',
      this.responsivizePickerPosition,
      { passive: true },
    );
    this.responsivizePickerPosition();
    this.disableScroll();

    const { focused } = this.props;

    if (focused) {
      this.setState({
        isInputFocused: true,
      });
    }

    this.isTouchDevice = isTouchDevice();
  }

  componentDidUpdate(prevProps) {
    const { focused } = this.props;
    if (!prevProps.focused && focused) {
      this.responsivizePickerPosition();
      this.disableScroll();
    } else if (prevProps.focused && !focused) {
      if (this.enableScroll) this.enableScroll();
    }
  }

  /* istanbul ignore next */
  componentWillUnmount() {
    if (this.removeEventListener) this.removeEventListener();
    if (this.enableScroll) this.enableScroll();
  }

  onOutsideClick(event) {
    const {
      focused,
      onFocusChange,
      appendToBody,
    } = this.props;
    if (!focused) return;
    if (appendToBody && this.dayPickerContainer.contains(event.target)) return;

    this.setState({
      isInputFocused: false,
      isDayPickerFocused: false,
      showKeyboardShortcuts: false,
    });

    onFocusChange({ focused: false });
  }

  onInputFocus({ focused }) {
    const {
      onFocusChange,
      readOnly,
      withPortal,
      withFullScreenPortal,
      keepFocusOnInput,
    } = this.props;

    if (focused) {
      const withAnyPortal = withPortal || withFullScreenPortal;
      const moveFocusToDayPicker = withAnyPortal
        || (readOnly && !keepFocusOnInput)
        || (this.isTouchDevice && !keepFocusOnInput);

      if (moveFocusToDayPicker) {
        this.onDayPickerFocus();
      } else {
        this.onDayPickerBlur();
      }
    }

    onFocusChange({ focused });
  }

  onDayPickerFocus() {
    this.setState({
      isInputFocused: false,
      isDayPickerFocused: true,
      showKeyboardShortcuts: false,
    });
  }

  onDayPickerBlur() {
    this.setState({
      isInputFocused: true,
      isDayPickerFocused: false,
      showKeyboardShortcuts: false,
    });
  }

  setDayPickerContainerRef(ref) {
    this.dayPickerContainer = ref;
  }

  setContainerRef(ref) {
    this.container = ref;
  }

  disableScroll() {
    const { appendToBody, disableScroll: propDisableScroll, focused } = this.props;
    if (!appendToBody && !propDisableScroll) return;
    if (!focused) return;

    // Disable scroll for every ancestor of this <DropDownController> up to the
    // document level. This ensures the input and the picker never move. Other
    // sibling elements or the picker itself can scroll.
    this.enableScroll = disableScroll(this.container);
  }

  /* istanbul ignore next */
  responsivizePickerPosition() {
    // It's possible the portal props have been changed in response to window resizes
    // So let's ensure we reset this back to the base state each time
    this.setState({ dayPickerContainerStyles: {} });

    const {
      openDirection,
      anchorDirection,
      horizontalMargin,
      withPortal,
      withFullScreenPortal,
      appendToBody,
      focused,
    } = this.props;
    const { dayPickerContainerStyles } = this.state;

    if (!focused) {
      return;
    }

    const isAnchoredLeft = anchorDirection === ANCHOR_LEFT;

    if (!withPortal && !withFullScreenPortal) {
      const containerRect = this.dayPickerContainer.getBoundingClientRect();
      const currentOffset = dayPickerContainerStyles[anchorDirection] || 0;
      const containerEdge = isAnchoredLeft
        ? containerRect[ANCHOR_RIGHT]
        : containerRect[ANCHOR_LEFT];

      this.setState({
        dayPickerContainerStyles: {
          ...getResponsiveContainerStyles(
            anchorDirection,
            currentOffset,
            containerEdge,
            horizontalMargin,
          ),
          ...(appendToBody && getDetachedContainerStyles(
            openDirection,
            anchorDirection,
            this.container,
          )),
        },
      });
    }
  }

  showKeyboardShortcutsPanel() {
    this.setState({
      isInputFocused: false,
      isDayPickerFocused: true,
      showKeyboardShortcuts: true,
    });
  }

  maybeRenderDayPickerWithPortal() {
    const {
      focused,
      withPortal,
      withFullScreenPortal,
      appendToBody,
    } = this.props;

    if (!focused) {
      return null;
    }

    if (withPortal || withFullScreenPortal || appendToBody) {
      return (
        <Portal>
          {this.renderDayPicker()}
        </Portal>
      );
    }

    return this.renderDayPicker();
  }

  renderDayPicker() {
    const {
      closeDatePickerPhrase,
      dropdown,
      anchorDirection,
      openDirection,
      orientation,
      verticalSpacing,
      isRTL,
      withFullScreenPortal,
      withPortal,
      customCloseIcon,
      small,
      styles,
      theme: { reactDates },
    } = this.props;
    const { dayPickerContainerStyles, isDayPickerFocused, showKeyboardShortcuts } = this.state;

    const onOutsideClick = (!withFullScreenPortal && withPortal) ? this.onOutsideClick : undefined;
    const closeIcon = customCloseIcon || (<CloseButton />);

    const inputHeight = getInputHeight(reactDates, small);

    const withAnyPortal = withPortal || withFullScreenPortal;

    return (
      <div // eslint-disable-line jsx-a11y/no-static-element-interactions
        ref={this.setDayPickerContainerRef}
        {...css(
          styles.DropDownController_picker,
          anchorDirection === ANCHOR_LEFT && styles.DropDownController_picker__directionLeft,
          anchorDirection === ANCHOR_RIGHT && styles.DropDownController_picker__directionRight,
          openDirection === OPEN_DOWN && styles.DropDownController_picker__openDown,
          openDirection === OPEN_UP && styles.DropDownController_picker__openUp,
          !withAnyPortal && openDirection === OPEN_DOWN && {
            top: inputHeight + verticalSpacing,
          },
          !withAnyPortal && openDirection === OPEN_UP && {
            bottom: inputHeight + verticalSpacing,
          },
          orientation === HORIZONTAL_ORIENTATION && styles.DropDownController_picker__horizontal,
          orientation === VERTICAL_ORIENTATION && styles.DropDownController_picker__vertical,
          withAnyPortal && styles.DropDownController_picker__portal,
          withFullScreenPortal && styles.DropDownController_picker__fullScreenPortal,
          isRTL && styles.DropDownController_picker__rtl,
          dayPickerContainerStyles,
        )}
        onClick={onOutsideClick}
      >
        {dropdown && React.cloneElement(dropdown, {
          isFocused: isDayPickerFocused,
          showKeyboardShortcuts,
          onBlur: this.onDayPickerBlur,
        })}

        {withFullScreenPortal && (
          <button
            {...css(styles.DropDownController_closeButton)}
            aria-label={closeDatePickerPhrase}
            type="button"
            onClick={this.onOutsideClick}
          >
            <div {...css(styles.DropDownController_closeButton_svg)}>
              {closeIcon}
            </div>
          </button>
        )}
      </div>
    );
  }

  render() {
    const {
      withFullScreenPortal,
      withPortal,
      block,
      input,
      styles,
    } = this.props;

    const { isInputFocused } = this.state;

    const enableOutsideClick = (!withPortal && !withFullScreenPortal);

    const inputEl = input && React.cloneElement(input, {
      isFocused: isInputFocused,
      onFocusChange: this.onInputFocus,
      onKeyDownArrowDown: this.onDayPickerFocus,
      onKeyDownQuestionMark: this.showKeyboardShortcutsPanel,
    });

    return (
      <div
        ref={this.setContainerRef}
        {...css(
          styles.DropDownController,
          block && styles.DropDownController__block,
        )}
      >
        {enableOutsideClick && (
          <OutsideClickHandler onOutsideClick={this.onOutsideClick}>
            {inputEl}
            {this.maybeRenderDayPickerWithPortal()}
          </OutsideClickHandler>
        )}
        {!enableOutsideClick && inputEl}
        {!enableOutsideClick && this.maybeRenderDayPickerWithPortal()}
      </div>
    );
  }
}

DropDownController.propTypes = propTypes;
DropDownController.defaultProps = defaultProps;

export { DropDownController as PureDropDownController };
export default withStyles(({ reactDates: { color, zIndex } }) => ({
  DropDownController: {
    position: 'relative',
    display: 'inline-block',
  },

  DropDownController__block: {
    display: 'block',
  },

  DropDownController_picker: {
    zIndex: zIndex + 1,
    backgroundColor: color.background,
    position: 'absolute',
  },

  DropDownController_picker__rtl: {
    direction: 'rtl',
  },

  DropDownController_picker__directionLeft: {
    left: 0,
  },

  DropDownController_picker__directionRight: {
    right: 0,
  },

  DropDownController_picker__portal: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },

  DropDownController_picker__fullScreenPortal: {
    backgroundColor: color.background,
  },

  DropDownController_closeButton: {
    background: 'none',
    border: 0,
    color: 'inherit',
    font: 'inherit',
    lineHeight: 'normal',
    overflow: 'visible',
    cursor: 'pointer',

    position: 'absolute',
    top: 0,
    right: 0,
    padding: 15,
    zIndex: zIndex + 2,

    ':hover': {
      color: `darken(${color.core.grayLighter}, 10%)`,
      textDecoration: 'none',
    },

    ':focus': {
      color: `darken(${color.core.grayLighter}, 10%)`,
      textDecoration: 'none',
    },
  },

  DropDownController_closeButton_svg: {
    height: 15,
    width: 15,
    fill: color.core.grayLighter,
  },
}), { pureComponent: pureComponentAvailable })(DropDownController);
