Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = isSameDay;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function isSameDay(a, b) {
  if (!_moment2['default'].isMoment(a) || !_moment2['default'].isMoment(b)) return false;
  // Compare least significant, most likely to change units first
  // Moment's isSame clones moment inputs and is a tad slow
  return a.date() === b.date() && a.month() === b.month() && a.year() === b.year();
}