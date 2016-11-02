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

  handlePrevMonthClick: PropTypes.func,
  handleNextMonthClick: PropTypes.func,
};
const defaultProps = {
  navPrev: null,
  navNext: null,
  isVertical: false,

  handleNextMonthClick() {},
  handlePrevMonthClick() {},
};

export default function DayPickerNavigation(props) {
  const {
    navPrev,
    navNext,
    isVertical,
    handlePrevMonthClick,
    handleNextMonthClick,
  } = props;

  let navPrevIcon = navPrev;
  let navNextIcon = navNext;
  let isDefaualtNavPrev = false;
  let isDefaultNavNext = false;
  if (!navPrevIcon) {
    isDefaualtNavPrev = true;
    navPrevIcon = isVertical ? <ChevronUp /> : <LeftArrow />;
  }
  if (!navNextIcon) {
    isDefaultNavNext = true;
    navNextIcon = isVertical ? <ChevronDown /> : <RightArrow />;
  }

  const prevClassNames = cx('DayPicker__nav--prev', {
    'DayPicker__nav-prev-default': isDefaualtNavPrev,
  });
  const nextClassNames = cx('DayPicker__nav--next', {
    'DayPicker__nav-next-default': isDefaultNavNext,
  });

  return (
    <div className="DayPicker__nav">
      <span
        className={prevClassNames}
        onClick={handlePrevMonthClick}
      >
        {navPrevIcon}
      </span>

      <span
        className={nextClassNames}
        onClick={handleNextMonthClick}
      >
        {navNextIcon}
      </span>
    </div>
  );
}

DayPickerNavigation.propTypes = propTypes;
DayPickerNavigation.defaultProps = defaultProps;
