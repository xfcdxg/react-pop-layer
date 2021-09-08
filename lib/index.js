"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./index.css");

var _react = _interopRequireDefault(require("react"));

var _reactPageMask = _interopRequireDefault(require("react-page-mask"));

var _excluded = ["mask", "maskConfig"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var slidePageList = [];
var location = window.location;
var history = window.history;

var PopPage = function PopPage(content) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _ref = options || {},
      _ref$mask = _ref.mask,
      mask = _ref$mask === void 0 ? false : _ref$mask,
      maskConfig = _ref.maskConfig,
      props = _objectWithoutProperties(_ref, _excluded);

  (0, _reactPageMask.default)( /*#__PURE__*/_react.default.createElement(SlidePage, props, content), _objectSpread({
    mask: mask
  }, maskConfig));
};

var closeSlidePage = function closeSlidePage(slidePages) {
  if (slidePages.length > 0) {
    slidePages.shift().onclose();
    closeSlidePage(slidePages);
  }
};

var matchHashWithSlidePage = function matchHashWithSlidePage() {
  closeSlidePage(slidePageList.filter(function (o) {
    return location.hash.indexOf(o.hash) < 0;
  }));
  refreshSlidePageList();
};

var refreshSlidePageList = function refreshSlidePageList() {
  slidePageList = slidePageList.filter(function (o) {
    return location.hash.indexOf(o.hash) >= 0;
  });
};

var SlidePage = function SlidePage(_ref2) {
  var children = _ref2.children,
      _ref2$bgColor = _ref2.bgColor,
      bgColor = _ref2$bgColor === void 0 ? '#fff' : _ref2$bgColor,
      _ref2$target = _ref2.target,
      target = _ref2$target === void 0 ? 'right' : _ref2$target,
      _ref2$enableHash = _ref2.enableHash,
      enableHash = _ref2$enableHash === void 0 ? true : _ref2$enableHash,
      _ref2$enableClose = _ref2.enableClose,
      enableClose = _ref2$enableClose === void 0 ? true : _ref2$enableClose,
      _ref2$closePosition = _ref2.closePosition,
      closePosition = _ref2$closePosition === void 0 ? 'right' : _ref2$closePosition,
      _ref2$closeContainerS = _ref2.closeContainerStyle,
      closeContainerStyle = _ref2$closeContainerS === void 0 ? {} : _ref2$closeContainerS,
      closeComponent = _ref2.closeComponent,
      _ref2$style = _ref2.style,
      style = _ref2$style === void 0 ? {} : _ref2$style,
      _ref2$handleClose = _ref2.handleClose,
      handleClose = _ref2$handleClose === void 0 ? function () {} : _ref2$handleClose,
      handleContainerClose = _ref2.handleContainerClose;
  var hash = Date.now();
  var node;

  var onclose = function onclose() {
    if (enableHash) {
      var _hash = node.getAttribute('data-id');

      if (location.hash.indexOf(_hash) >= 0) history.go(-1);
    }

    node.className += ' hide';
    node.addEventListener("transitionend", function () {
      handleContainerClose();
      setTimeout(refreshSlidePageList, 0);
    });
  };

  var onload = function onload(_node) {
    if (_node) {
      node = _node;

      if (enableHash) {
        node.setAttribute('data-id', hash);
        location.hash += hash;
        slidePageList.push({
          node: node,
          hash: hash,
          onclose: onclose
        });
      }

      setTimeout(function () {
        node.className = node.className.replace(' hide', '');
      }, 50);
    }
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "slide-page-container ".concat(target, " hide"),
    ref: onload,
    style: _objectSpread({
      backgroundColor: bgColor
    }, style)
  }, children && /*#__PURE__*/_react.default.cloneElement(children, {
    handleContainerClose: onclose
  }), enableClose && /*#__PURE__*/_react.default.createElement("div", {
    className: "close-container ".concat(closePosition),
    style: closeContainerStyle,
    onClick: function onClick() {
      onclose();
      typeof handleClose === 'function' && handleClose();
    }
  }, closeComponent ? closeComponent : /*#__PURE__*/_react.default.createElement("span", {
    className: "slide-page-close"
  }, "+")));
};

window.addEventListener('hashchange', function () {
  matchHashWithSlidePage();
}, false);
var _default = PopPage;
exports.default = _default;