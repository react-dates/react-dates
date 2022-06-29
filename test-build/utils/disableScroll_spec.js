"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _chai = require("chai");

var _disableScroll = _interopRequireWildcard(require("../../lib/utils/disableScroll"));

var _describeIfWindow = _interopRequireDefault(require("../_helpers/describeIfWindow"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var createScrollContainer = function createScrollContainer() {
  var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var el = document.createElement('div');
  el.style.width = '300px';
  el.style.height = "".concat(level * 100, "px");
  el.style.overflow = 'auto';
  return el;
};

var createScrollContent = function createScrollContent() {
  var el = document.createElement('div');
  el.style.width = '100%';
  el.style.height = '99999px';
  return el;
};

var createTargetElement = function createTargetElement() {
  var el = document.createElement('div');
  return el;
};

(0, _describeIfWindow["default"])('#disableScroll', function () {
  var grandParentScrollContainer;
  var parentScrollContainer;
  var scrollContent;
  var targetElement;
  before(function () {
    grandParentScrollContainer = createScrollContainer(1);
    parentScrollContainer = createScrollContainer(2);
    scrollContent = createScrollContent();
    targetElement = createTargetElement();
    scrollContent.appendChild(targetElement);
  });
  describe('#getScrollParent', function () {
    describe('with no parent', function () {
      before(function () {
        document.body.appendChild(scrollContent);
      });
      after(function () {
        document.body.removeChild(scrollContent);
      });
      it('returns scrolling root if no scroll parent', function () {
        var scrollParent = (0, _disableScroll.getScrollParent)(targetElement);
        (0, _chai.expect)(scrollParent).to.equal(document.documentElement);
      });
    });
    describe('with a single scroll container', function () {
      before(function () {
        parentScrollContainer.appendChild(scrollContent);
        document.body.appendChild(parentScrollContainer);
      });
      after(function () {
        parentScrollContainer.appendChild(scrollContent);
        document.body.removeChild(parentScrollContainer);
      });
      it('returns the scroll container', function () {
        var scrollParent = (0, _disableScroll.getScrollParent)(targetElement);
        (0, _chai.expect)(scrollParent).to.equal(parentScrollContainer);
      });
    });
    describe('with multiple scroll containers', function () {
      before(function () {
        parentScrollContainer.appendChild(scrollContent);
        grandParentScrollContainer.appendChild(parentScrollContainer);
        document.body.appendChild(grandParentScrollContainer);
      });
      after(function () {
        parentScrollContainer.removeChild(scrollContent);
        grandParentScrollContainer.removeChild(parentScrollContainer);
        document.body.removeChild(grandParentScrollContainer);
      });
      it('returns the closest scroll container', function () {
        var scrollParent = (0, _disableScroll.getScrollParent)(targetElement);
        (0, _chai.expect)(scrollParent).to.equal(parentScrollContainer);
      });
    });
  });
  describe('#getScrollAncestorsOverflowY', function () {
    before(function () {
      parentScrollContainer.appendChild(scrollContent);
      grandParentScrollContainer.appendChild(parentScrollContainer);
      document.body.appendChild(grandParentScrollContainer);
    });
    after(function () {
      parentScrollContainer.removeChild(scrollContent);
      grandParentScrollContainer.removeChild(parentScrollContainer);
      document.body.removeChild(grandParentScrollContainer);
    });
    it('returns a map with the overflowY of all scrollable ancestors', function () {
      var scrollAncestorsOverflowY = (0, _disableScroll.getScrollAncestorsOverflowY)(targetElement);
      (0, _chai.expect)(scrollAncestorsOverflowY.size).to.equal(3); // both scroll containers + root

      (0, _chai.expect)(scrollAncestorsOverflowY.has(parentScrollContainer)).to.equal(true);
      (0, _chai.expect)(scrollAncestorsOverflowY.has(grandParentScrollContainer)).to.equal(true);
      (0, _chai.expect)(scrollAncestorsOverflowY.has(document.documentElement)).to.equal(true);
      (0, _chai.expect)(scrollAncestorsOverflowY.get(parentScrollContainer)).to.equal('auto');
      (0, _chai.expect)(scrollAncestorsOverflowY.get(grandParentScrollContainer)).to.equal('auto');
      (0, _chai.expect)(scrollAncestorsOverflowY.get(document.documentElement)).to.be.a('string');
    });
  });
  describe('#disableScroll', function () {
    before(function () {
      parentScrollContainer.appendChild(scrollContent);
      grandParentScrollContainer.appendChild(parentScrollContainer);
      document.body.appendChild(grandParentScrollContainer);
    });
    after(function () {
      parentScrollContainer.removeChild(scrollContent);
      grandParentScrollContainer.removeChild(parentScrollContainer);
      document.body.removeChild(grandParentScrollContainer);
    });
    describe('disable', function () {
      it('should set all scroll ancestors overflow to hidden', function () {
        var enableScroll = (0, _disableScroll["default"])(targetElement);
        var scrollAncestorsOverflowY = (0, _disableScroll.getScrollAncestorsOverflowY)(targetElement); // eslint-disable-next-line no-restricted-syntax

        var _iterator = _createForOfIteratorHelper(scrollAncestorsOverflowY),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _step$value = (0, _slicedToArray2["default"])(_step.value, 2),
                overflowY = _step$value[1];

            (0, _chai.expect)(overflowY).to.equal('hidden');
          } // reset to initial state

        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        enableScroll();
      });
    });
    describe('enable', function () {
      it('should set all scroll ancestors overflow to their previous value', function () {
        var scrollAncestorsOverflowYBefore = (0, _disableScroll.getScrollAncestorsOverflowY)(targetElement);
        var enableScroll = (0, _disableScroll["default"])(targetElement);
        enableScroll();
        var scrollAncestorsOverflowY = (0, _disableScroll.getScrollAncestorsOverflowY)(targetElement); // eslint-disable-next-line no-restricted-syntax

        var _iterator2 = _createForOfIteratorHelper(scrollAncestorsOverflowY),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _step2$value = (0, _slicedToArray2["default"])(_step2.value, 2),
                element = _step2$value[0],
                overflowY = _step2$value[1];

            (0, _chai.expect)(scrollAncestorsOverflowYBefore.get(element)).to.equal(overflowY);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      });
    });
  });
});