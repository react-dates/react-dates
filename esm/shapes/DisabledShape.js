import PropTypes from 'prop-types';
import { START_DATE, END_DATE } from '../constants';
export default PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf([START_DATE, END_DATE])]);