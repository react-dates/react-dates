import PropTypes from 'prop-types';
import { APPEND_TO_BODY_FIXED } from '../constants';

export default PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf([APPEND_TO_BODY_FIXED])]);
