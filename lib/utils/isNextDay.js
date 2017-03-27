Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = isNextDay;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _isSameDay = require('./isSameDay');

var _isSameDay2 = _interopRequireDefault(_isSameDay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function isNextDay(a, b) {
  if (!_moment2['default'].isMoment(a) || !_moment2['default'].isMoment(b)) return false;
  var nextDay = (0, _moment2['default'])(a).add(1, 'day');
  return (0, _isSameDay2['default'])(nextDay, b);
}