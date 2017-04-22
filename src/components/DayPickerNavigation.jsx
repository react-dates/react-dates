import PropTypes from 'prop-types';
import { forbidExtraProps } from '../airbnb-prop-types-inferno';
import cx from 'classnames';

import { DayPickerNavigationPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import LeftArrow from '../svg/arrow-left.jsx';
import RightArrow from '../svg/arrow-right.jsx';
import ChevronUp from '../svg/chevron-up.jsx';
import ChevronDown from '../svg/chevron-down.jsx';
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
});

const defaultProps = {
  navPrev: null,
  navNext: null,
  orientation: HORIZONTAL_ORIENTATION,

  onPrevMonthClick() {},
  onNextMonthClick() {},

  // internationalization
  phrases: DayPickerNavigationPhrases,
};

export default function DayPickerNavigation(props) {
  const {
    navPrev,
    navNext,
    onPrevMonthClick,
    onNextMonthClick,
    orientation,
    phrases,
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
  }
  if (!navNextIcon) {
    isDefaultNavNext = true;
    navNextIcon = isVertical ? <ChevronDown /> : <RightArrow />;
  }

  const navClassNames = cx('DayPickerNavigation', {
    'DayPickerNavigation--horizontal': !isVertical,
    'DayPickerNavigation--vertical': isVertical,
    'DayPickerNavigation--vertical-scrollable': isVerticalScrollable,
  });
  const prevClassNames = cx('DayPickerNavigation__prev', {
    'DayPickerNavigation__prev--default': isDefaultNavPrev,
  });
  const nextClassNames = cx('DayPickerNavigation__next', {
    'DayPickerNavigation__next--default': isDefaultNavNext,
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
