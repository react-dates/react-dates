Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = isNextMonth;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _isSameMonth = require('./isSameMonth');

var _isSameMonth2 = _interopRequireDefault(_isSameMonth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function isNextMonth(a, b) {
  if (!_moment2['default'].isMoment(a) || !_moment2['default'].isMoment(b)) return false;
  return (0, _isSameMonth2['default'])(a.clone().add(1, 'month'), b);
}