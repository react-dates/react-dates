Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = isDayVisible;

var _isBeforeDay = require('./isBeforeDay');

var _isBeforeDay2 = _interopRequireDefault(_isBeforeDay);

var _isAfterDay = require('./isAfterDay');

var _isAfterDay2 = _interopRequireDefault(_isAfterDay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function isDayVisible(day, month, numberOfMonths, enableOutsideDays) {
  var firstDayOfFirstMonth = month.clone().startOf('month');
  if (enableOutsideDays) firstDayOfFirstMonth = firstDayOfFirstMonth.startOf('week');
  if ((0, _isBeforeDay2['default'])(day, firstDayOfFirstMonth)) return false;

  var lastDayOfLastMonth = month.clone().add(numberOfMonths - 1, 'months').endOf('month');
  if (enableOutsideDays) lastDayOfLastMonth = lastDayOfLastMonth.endOf('week');
  return !(0, _isAfterDay2['default'])(day, lastDayOfLastMonth);
}