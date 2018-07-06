Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UIIcon = function (_Component) {
  _inherits(UIIcon, _Component);

  function UIIcon(props) {
    _classCallCheck(this, UIIcon);

    var _this = _possibleConstructorReturn(this, (UIIcon.__proto__ || Object.getPrototypeOf(UIIcon)).call(this, props));

    _this.state = {
      isHover: false
    };
    _this.onMouseEnter = _this._onMouseEnter.bind(_this);
    _this.onMouseLeave = _this._onMouseLeave.bind(_this);
    return _this;
  }

  _createClass(UIIcon, [{
    key: '_onMouseEnter',
    value: function () {
      function _onMouseEnter() {
        var isHover = this.state.isHover;

        if (!isHover) {
          this.setState({
            isHover: true
          });
        }
      }

      return _onMouseEnter;
    }()
  }, {
    key: '_onMouseLeave',
    value: function () {
      function _onMouseLeave() {
        var isHover = this.state.isHover;

        if (isHover) {
          this.setState({
            isHover: false
          });
        }
      }

      return _onMouseLeave;
    }()
  }, {
    key: 'render',
    value: function () {
      function render() {
        var _props = this.props,
            icon = _props.icon,
            className = _props.className,
            color = _props.color,
            hoverColor = _props.hoverColor,
            style = _props.style;
        var isHover = this.state.isHover;


        var iconColor = isHover ? hoverColor ? hoverColor : color : color;

        var iconComponent = icon(iconColor);

        return _react2['default'].createElement(
          'span',
          {
            style: style,
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave
          },
          iconComponent
        );
      }

      return render;
    }()
  }]);

  return UIIcon;
}(_react.Component);

UIIcon.propTypes = {
  icon: _propTypes2['default'].func.isRequired,
  className: _propTypes2['default'].string,
  color: _propTypes2['default'].string,
  hoverColor: _propTypes2['default'].string,
  style: _propTypes2['default'].object
};
UIIcon.defaultProps = {
  className: '',
  color: 'black',
  hoverColor: '',
  style: {}
};

exports['default'] = UIIcon;