Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = isInclusivelyAfterDay;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _isBeforeDay = require('./isBeforeDay');

var _isBeforeDay2 = _interopRequireDefault(_isBeforeDay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function isInclusivelyAfterDay(a, b) {
  if (!_moment2['default'].isMoment(a) || !_moment2['default'].isMoment(b)) return false;
  return !(0, _isBeforeDay2['default'])(a, b);
}