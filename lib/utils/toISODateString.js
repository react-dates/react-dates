Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = toISODateString;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _toMomentObject = require('./toMomentObject');

var _toMomentObject2 = _interopRequireDefault(_toMomentObject);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function toISODateString(date, currentFormat) {
  var dateObj = _moment2['default'].isMoment(date) ? date : (0, _toMomentObject2['default'])(date, currentFormat);
  if (!dateObj) return null;

  return dateObj.format(_constants.ISO_FORMAT);
}