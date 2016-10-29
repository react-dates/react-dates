import React, { PropTypes } from 'react';
import cx from 'classnames';

import LeftArrow from '../svg/arrow-left.svg';
import RightArrow from '../svg/arrow-right.svg';
import ChevronUp from '../svg/chevron-up.svg';
import ChevronDown from '../svg/chevron-down.svg';

const propTypes = {
  navPrev: PropTypes.node,
  navNext: PropTypes.node,
  isVertical: PropTypes.bool,

  onPrevMonthClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,
};
const defaultProps = {
  navPrev: null,
  navNext: null,
  isVertical: false,

  onPrevMonthClick() {},
  onNextMonthClick() {},
};

export default function DayPickerNavigation(props) {
  const {
    navPrev,
    navNext,
    isVertical,
    onPrevMonthClick,
    onNextMonthClick,
  } = props;

  let navPrevIcon = navPrev;
  let navNextIcon = navNext;
  let isDefaultNavPrev = false;
  let isDefaultNavNext = false;
  if (!navPrevIcon) {
    isDefaultNavPrev = true;
    navPrevIcon = isVertical ? <ChevronUp /> : <LeftArrow />;
  }
  if (!navNextIcon) {
    isDefaultNavNext = true;
    navNextIcon = isVertical ? <ChevronDown /> : <RightArrow />;
  }

  const navClassNames = cx('DayPickerNavigation', {
    'DayPickerNavigation--horizontal': !isVertical,
    'DayPickerNavigation--vertical': isVertical,
  });
  const prevClassNames = cx('DayPickerNavigation__prev', {
    'DayPickerNavigation__prev--default': isDefaultNavPrev,
  });
  const nextClassNames = cx('DayPickerNavigation__next', {
    'DayPickerNavigation__next--default': isDefaultNavNext,
  });

  return (
    <div className={navClassNames}>
      <span
        className={prevClassNames}
        onClick={onPrevMonthClick}
      >
        {navPrevIcon}
      </span>

      <span
        className={nextClassNames}
        onClick={onNextMonthClick}
      >
        {navNextIcon}
      </span>
    </div>
  );
}

DayPickerNavigation.propTypes = propTypes;
DayPickerNavigation.defaultProps = defaultProps;
