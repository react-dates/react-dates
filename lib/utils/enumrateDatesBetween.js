"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = enumrateDatesBetween;

function enumrateDatesBetween(startDate, endDate) {
  var now = startDate.clone(),
      dates = [];

  while (now.isSameOrBefore(endDate)) {
    dates.push(now.format('M/D/YYYY'));
    now.add(1, 'days');
  }

  return dates;
}