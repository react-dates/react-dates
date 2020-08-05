import PropTypes from 'prop-types';

export default PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['grammar', 'spelling'])]);
