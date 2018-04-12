Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = isBeforeDay;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function isBeforeDay(a, b) {
  if (!_moment2['default'].isMoment(a) || !_moment2['default'].isMoment(b)) return false;

  var aYear = a.year();
  var aMonth = a.month();

  var bYear = b.year();
  var bMonth = b.month();

  var isSameYear = aYear === bYear;
  var isSameMonth = aMonth === bMonth;

  if (isSameYear && isSameMonth) return a.date() < b.date();
  if (isSameYear) return aMonth < bMonth;
  return aYear < bYear;
}