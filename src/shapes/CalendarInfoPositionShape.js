import PropTypes from 'prop-types';

import {
  INFO_POSITION_TOP,
  INFO_POSITION_BOTTOM,
  INFO_POSITION_LEFT,
  INFO_POSITION_RIGHT,
} from '../constants';

export default PropTypes.oneOf([INFO_POSITION_TOP, INFO_POSITION_BOTTOM, INFO_POSITION_LEFT, INFO_POSITION_RIGHT]);
