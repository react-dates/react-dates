Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = registerInterfaceWithDefaultTheme;

var _ThemedStyleSheet = require('react-with-styles/lib/ThemedStyleSheet');

var _ThemedStyleSheet2 = _interopRequireDefault(_ThemedStyleSheet);

var _DefaultTheme = require('../theme/DefaultTheme');

var _DefaultTheme2 = _interopRequireDefault(_DefaultTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function registerInterfaceWithDefaultTheme(reactWithStylesInterface) {
  _ThemedStyleSheet2['default'].registerInterface(reactWithStylesInterface);
  _ThemedStyleSheet2['default'].registerTheme(_DefaultTheme2['default']);
}