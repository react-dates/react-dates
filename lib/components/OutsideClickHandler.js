Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _consolidatedEvents = require('consolidated-events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import { forbidExtraProps } from 'airbnb-prop-types'; // TODO: add to propTypes; semver-major


var propTypes = {
  children: _propTypes2['default'].node,
  onOutsideClick: _propTypes2['default'].func
};

var defaultProps = {
  children: _react2['default'].createElement('span', null),
  onOutsideClick: function () {
    function onOutsideClick() {}

    return onOutsideClick;
  }()
};

var OutsideClickHandler = function (_React$Component) {
  _inherits(OutsideClickHandler, _React$Component);

  function OutsideClickHandler() {
    var _ref;

    _classCallCheck(this, OutsideClickHandler);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = OutsideClickHandler.__proto__ || Object.getPrototypeOf(OutsideClickHandler)).call.apply(_ref, [this].concat(args)));

    _this.onOutsideClick = _this.onOutsideClick.bind(_this);
    _this.setChildNodeRef = _this.setChildNodeRef.bind(_this);
    return _this;
  }

  _createClass(OutsideClickHandler, [{
    key: 'componentDidMount',
    value: function () {
      function componentDidMount() {
        // `capture` flag is set to true so that a `stopPropagation` in the children
        // will not prevent all outside click handlers from firing - maja
        this.removeEventListener = (0, _consolidatedEvents.addEventListener)(document, 'click', this.onOutsideClick, { capture: true });
      }

      return componentDidMount;
    }()
  }, {
    key: 'componentWillUnmount',
    value: function () {
      function componentWillUnmount() {
        if (this.removeEventListener) {
          this.removeEventListener();
        }
      }

      return componentWillUnmount;
    }()
  }, {
    key: 'onOutsideClick',
    value: function () {
      function onOutsideClick(e) {
        var onOutsideClick = this.props.onOutsideClick;
        var childNode = this.childNode;

        var isDescendantOfRoot = childNode && childNode.contains(e.target);
        if (!isDescendantOfRoot) {
          onOutsideClick(e);
        }
      }

      return onOutsideClick;
    }()
  }, {
    key: 'setChildNodeRef',
    value: function () {
      function setChildNodeRef(ref) {
        this.childNode = ref;
      }

      return setChildNodeRef;
    }()
  }, {
    key: 'render',
    value: function () {
      function render() {
        return _react2['default'].createElement(
          'div',
          { ref: this.setChildNodeRef },
          this.props.children
        );
      }

      return render;
    }()
  }]);

  return OutsideClickHandler;
}(_react2['default'].Component);

exports['default'] = OutsideClickHandler;


OutsideClickHandler.propTypes = propTypes;
OutsideClickHandler.defaultProps = defaultProps;