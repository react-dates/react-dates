import PropTypes from 'prop-types';

const before = PropTypes.func.isRequired;
const after = PropTypes.func.isRequired;

const justBefore = PropTypes.shape({ before });
const justAfter = PropTypes.shape({ after });
const bothBeforeAndAfter = PropTypes.shape({ before, after });

export default PropTypes.oneOfType([
  justBefore,
  justAfter,
  bothBeforeAndAfter,
]);
