import PropTypes from 'prop-types';

import {
  ANCHOR_LEFT,
  ANCHOR_CENTER,
  ANCHOR_RIGHT,
} from '../constants';

export default PropTypes.oneOf([ANCHOR_LEFT, ANCHOR_CENTER, ANCHOR_RIGHT]);
