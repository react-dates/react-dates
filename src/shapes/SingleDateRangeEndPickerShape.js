import momentPropTypes from 'react-moment-proptypes';
import omit from 'lodash/omit';

import SingleDatePickerShape from './SingleDatePickerShape';

export default {
  ...omit(SingleDatePickerShape, ['date']),

  startDate: momentPropTypes.momentObj,
  endDate: momentPropTypes.momentObj,
};
