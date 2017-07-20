import PropTypes from 'prop-types';

import {
  BEFORE_POSITION,
  AFTER_POSITION,
} from '../../constants';

export default PropTypes.oneOf([BEFORE_POSITION, AFTER_POSITION]);
