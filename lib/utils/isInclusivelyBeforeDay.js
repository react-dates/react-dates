Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = isInclusivelyBeforeDay;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _isSameDay = require('./isSameDay');

var _isSameDay2 = _interopRequireDefault(_isSameDay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function isInclusivelyBeforeDay(a, b) {
  if (!_moment2['default'].isMoment(a) || !_moment2['default'].isMoment(b)) return false;
  return a.isBefore(b) || (0, _isSameDay2['default'])(a, b);
}