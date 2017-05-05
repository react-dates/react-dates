import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import cx from 'classnames';

import { DayPickerNavigationPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import LeftArrow from '../svg/arrow-left.svg';
import RightArrow from '../svg/arrow-right.svg';
import ChevronUp from '../svg/chevron-up.svg';
import ChevronDown from '../svg/chevron-down.svg';
import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
} from '../../constants';

const propTypes = forbidExtraProps({
  navPrev: PropTypes.node,
  navNext: PropTypes.node,
  orientation: ScrollableOrientationShape,

  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,

  // internationalization
  phrases: PropTypes.shape(getPhrasePropTypes(DayPickerNavigationPhrases)),

  isRTL: PropTypes.bool,
});

const defaultProps = {
  navPrev: null,
  navNext: null,
  orientation: HORIZONTAL_ORIENTATION,

  onPrevMonthClick() {},
  onNextMonthClick() {},

  // internationalization
  phrases: DayPickerNavigationPhrases,
  isRTL: false,
};

export default function DayPickerNavigation(props) {
  const {
    navPrev,
    navNext,
    onPrevMonthClick,
    onNextMonthClick,
    orientation,
    phrases,
    isRTL,
  } = props;

  const isVertical = orientation !== HORIZONTAL_ORIENTATION;
  const isVerticalScrollable = orientation === VERTICAL_SCROLLABLE;

  let navPrevIcon = navPrev;
  let navNextIcon = navNext;
  let isDefaultNavPrev = false;
  let isDefaultNavNext = false;
  if (!navPrevIcon) {
    isDefaultNavPrev = true;
    navPrevIcon = isVertical ? <ChevronUp /> : <LeftArrow />;
    if (isRTL && !isVertical) {
      navPrevIcon = <RightArrow />;
    }
  }
  if (!navNextIcon) {
    isDefaultNavNext = true;
    navNextIcon = isVertical ? <ChevronDown /> : <RightArrow />;
    if (isRTL && !isVertical) {
      navNextIcon = <LeftArrow />;
    }
  }

  const navClassNames = cx('DayPickerNavigation', {
    'DayPickerNavigation--horizontal': !isVertical,
    'DayPickerNavigation--vertical': isVertical,
    'DayPickerNavigation--vertical-scrollable': isVerticalScrollable,
  });
  const prevClassNames = cx('DayPickerNavigation__prev', {
    'DayPickerNavigation__prev--default': isDefaultNavPrev,
    'DayPickerNavigation__prev--rtl': isRTL,
  });
  const nextClassNames = cx('DayPickerNavigation__next', {
    'DayPickerNavigation__next--default': isDefaultNavNext,
    'DayPickerNavigation__next--rtl': isRTL,
  });

  return (
    <div className={navClassNames}>
      {!isVerticalScrollable && (
        <button
          type="button"
          aria-label={phrases.jumpToPrevMonth}
          className={prevClassNames}
          onClick={onPrevMonthClick}
          onMouseUp={(e) => {
            e.currentTarget.blur();
          }}
        >
          {navPrevIcon}
        </button>
      )}

      <button
        type="button"
        aria-label={phrases.jumpToNextMonth}
        className={nextClassNames}
        onClick={onNextMonthClick}
        onMouseUp={(e) => {
          e.currentTarget.blur();
        }}
      >
        {navNextIcon}
      </button>
    </div>
  );
}

DayPickerNavigation.propTypes = propTypes;
DayPickerNavigation.defaultProps = defaultProps;
