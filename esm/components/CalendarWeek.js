import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
var propTypes = process.env.NODE_ENV !== "production" ? forbidExtraProps({
  children: PropTypes.node.isRequired
}) : {};
export default function CalendarWeek(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React.createElement("tr", null, children);
}
CalendarWeek.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};