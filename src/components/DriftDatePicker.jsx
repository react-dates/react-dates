import React from 'react';
import DateRangePicker from '../components/DateRangePicker'
import PropTypes from 'prop-types';
import { START_DATE, END_DATE, ANCHOR_LEFT, ANCHOR_RIGHT } from '../../src/constants';
import momentPropTypes from 'react-moment-proptypes';
import FocusedInputShape from '../shapes/FocusedInputShape';

const propTypes = {
  // required props for a functional interactive DateRangePicker
  startDate: momentPropTypes.momentObj,
  endDate: momentPropTypes.momentObj,
  onDatesChange: PropTypes.func.isRequired,
  focusedInput: FocusedInputShape,
  onFocusChange: PropTypes.func.isRequired,

  //optional props for special styling
  playbookVersionRanges: PropTypes.array,
};

const defaultProps = {
  // input related props
  startDateId: START_DATE,
  endDateId: END_DATE,
  small: true,

  // calendar presentation and interaction related props
  anchorDirection: ANCHOR_LEFT, //TODO: change to ANCHOR_RIGHT
  numberOfMonths: 2,
  keepOpenOnDateSelect: true,
  hideKeyboardShortcutsPanel: true,
};

class DriftDatePicker extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <DateRangePicker {...this.props}/>
    )
  }
}

DriftDatePicker.propTypes = propTypes;
DriftDatePicker.defaultProps = defaultProps;

export default DriftDatePicker