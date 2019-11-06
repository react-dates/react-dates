import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';

const propTypes = forbidExtraProps({
  children: PropTypes.node.isRequired,
});

export default function CalendarWeek({ children }) {
  return (
    <tr>
      {children}
    </tr>
  );
}

CalendarWeek.propTypes = propTypes;
