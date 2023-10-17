import { h, nextTick, createVNode, version as version$1, unref, inject, computed, ref, defineComponent, watch, onUpdated, shallowRef, getCurrentInstance, provide, Fragment, onUnmounted, watchEffect, withDirectives, vShow, Transition, hasInjectionContext, isVNode, Comment, Text, reactive, cloneVNode, toRef, Teleport, useSSRContext, createApp, resolveDirective, withModifiers, toRaw, markRaw, withCtx, isRef, createTextVNode, toDisplayString, openBlock, createBlock, renderList, resolveDynamicComponent, createCommentVNode, onErrorCaptured, onServerPrefetch, isReadonly, mergeProps, defineAsyncComponent, isShallow, isReactive } from 'vue';
import { f as useRuntimeConfig$1, m as withQuery, n as hasProtocol, p as parseURL, o as isScriptProtocol, j as joinURL, i as createError$1, $ as $fetch, q as sanitizeStatusCode, r as createHooks, t as isEqual, v as stringifyParsedURL, x as stringifyQuery, y as parseQuery } from '../nitro/node-server.mjs';
import { getActiveHead } from 'unhead';
import { defineHeadPlugin } from '@unhead/shared';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrRenderVNode, ssrRenderSuspense, ssrRenderAttrs } from 'vue/server-renderer';
import { UserOutlined, SoundFilled } from '@ant-design/icons-vue';
import _objectSpread$9 from '@babel/runtime/helpers/esm/objectSpread2';
import _extends from '@babel/runtime/helpers/esm/extends';
import { createTypes } from 'vue-types';
import { generate as generate$1 } from '@ant-design/colors';
import { TinyColor } from '@ctrl/tinycolor';
import { serialize, compile, stringify } from 'stylis';
import uniq from 'lodash-es/uniq.js';
import ResizeObserver$1 from 'resize-observer-polyfill';
import { alignElement, alignPoint } from 'dom-align';
import isEqual$1 from 'lodash-es/isEqual.js';
import pick from 'lodash-es/pick.js';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import 'fs';
import 'path';

function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als && currentInstance === void 0) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey$1 = "__unctx__";
const defaultNamespace = _globalThis[globalKey$1] || (_globalThis[globalKey$1] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());

// This icon file is generated automatically.
var RightOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" } }] }, "name": "right", "theme": "outlined" };
const RightOutlinedSvg = RightOutlined$2;

function _objectSpread$8(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$8(target, key, source[key]); }); } return target; }

function _defineProperty$8(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function warning$3(valid, message) {
} // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

function isIconDefinition(target) {
  return typeof target === 'object' && typeof target.name === 'string' && typeof target.theme === 'string' && (typeof target.icon === 'object' || typeof target.icon === 'function');
}
function generate(node, key, rootProps) {
  if (!rootProps) {
    return h(node.tag, _objectSpread$8({
      key: key
    }, node.attrs), (node.children || []).map(function (child, index) {
      return generate(child, "".concat(key, "-").concat(node.tag, "-").concat(index));
    }));
  }

  return h(node.tag, _objectSpread$8({
    key: key
  }, rootProps, node.attrs), (node.children || []).map(function (child, index) {
    return generate(child, "".concat(key, "-").concat(node.tag, "-").concat(index));
  }));
}
function getSecondaryColor(primaryColor) {
  // choose the second color
  return generate$1(primaryColor)[0];
}
function normalizeTwoToneColors(twoToneColor) {
  if (!twoToneColor) {
    return [];
  }

  return Array.isArray(twoToneColor) ? twoToneColor : [twoToneColor];
} // These props make sure that the SVG behaviours like general text.
var useInsertStyles = function useInsertStyles() {
  nextTick(function () {
  });
};

var _excluded$1 = ["icon", "primaryColor", "secondaryColor"];

function _objectWithoutProperties$1(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$1(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose$1(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$7(target, key, source[key]); }); } return target; }

function _defineProperty$7(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var twoToneColorPalette = {
  primaryColor: '#333',
  secondaryColor: '#E6E6E6',
  calculated: false
};

function setTwoToneColors(_ref) {
  var primaryColor = _ref.primaryColor,
      secondaryColor = _ref.secondaryColor;
  twoToneColorPalette.primaryColor = primaryColor;
  twoToneColorPalette.secondaryColor = secondaryColor || getSecondaryColor(primaryColor);
  twoToneColorPalette.calculated = !!secondaryColor;
}

function getTwoToneColors() {
  return _objectSpread$7({}, twoToneColorPalette);
}

var IconBase = function IconBase(props, context) {
  var _props$context$attrs = _objectSpread$7({}, props, context.attrs),
      icon = _props$context$attrs.icon,
      primaryColor = _props$context$attrs.primaryColor,
      secondaryColor = _props$context$attrs.secondaryColor,
      restProps = _objectWithoutProperties$1(_props$context$attrs, _excluded$1);

  var colors = twoToneColorPalette;

  if (primaryColor) {
    colors = {
      primaryColor: primaryColor,
      secondaryColor: secondaryColor || getSecondaryColor(primaryColor)
    };
  }

  useInsertStyles();
  warning$3(isIconDefinition(icon));

  if (!isIconDefinition(icon)) {
    return null;
  }

  var target = icon;

  if (target && typeof target.icon === 'function') {
    target = _objectSpread$7({}, target, {
      icon: target.icon(colors.primaryColor, colors.secondaryColor)
    });
  }

  return generate(target.icon, "svg-".concat(target.name), _objectSpread$7({}, restProps, {
    'data-icon': target.name,
    width: '1em',
    height: '1em',
    fill: 'currentColor',
    'aria-hidden': 'true'
  })); // },
};

IconBase.props = {
  icon: Object,
  primaryColor: String,
  secondaryColor: String,
  focusable: String
};
IconBase.inheritAttrs = false;
IconBase.displayName = 'IconBase';
IconBase.getTwoToneColors = getTwoToneColors;
IconBase.setTwoToneColors = setTwoToneColors;
const VueIcon = IconBase;

function _slicedToArray$1(arr, i) { return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1(); }

function _nonIterableRest$1() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit$1(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles$1(arr) { if (Array.isArray(arr)) return arr; }
function setTwoToneColor(twoToneColor) {
  var _normalizeTwoToneColo = normalizeTwoToneColors(twoToneColor),
      _normalizeTwoToneColo2 = _slicedToArray$1(_normalizeTwoToneColo, 2),
      primaryColor = _normalizeTwoToneColo2[0],
      secondaryColor = _normalizeTwoToneColo2[1];

  return VueIcon.setTwoToneColors({
    primaryColor: primaryColor,
    secondaryColor: secondaryColor
  });
}
function getTwoToneColor() {
  var colors = VueIcon.getTwoToneColors();

  if (!colors.calculated) {
    return colors.primaryColor;
  }

  return [colors.primaryColor, colors.secondaryColor];
}

var _excluded = ["class", "icon", "spin", "rotate", "tabindex", "twoToneColor", "onClick"];

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$6(target, key, source[key]); }); } return target; }

function _defineProperty$6(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

setTwoToneColor('#1890ff');

var Icon = function Icon(props, context) {
  var _classObj;

  var _props$context$attrs = _objectSpread$6({}, props, context.attrs),
      cls = _props$context$attrs["class"],
      icon = _props$context$attrs.icon,
      spin = _props$context$attrs.spin,
      rotate = _props$context$attrs.rotate,
      tabindex = _props$context$attrs.tabindex,
      twoToneColor = _props$context$attrs.twoToneColor,
      onClick = _props$context$attrs.onClick,
      restProps = _objectWithoutProperties(_props$context$attrs, _excluded);

  var classObj = (_classObj = {
    anticon: true
  }, _defineProperty$6(_classObj, "anticon-".concat(icon.name), Boolean(icon.name)), _defineProperty$6(_classObj, cls, cls), _classObj);
  var svgClassString = spin === '' || !!spin || icon.name === 'loading' ? 'anticon-spin' : '';
  var iconTabIndex = tabindex;

  if (iconTabIndex === undefined && onClick) {
    iconTabIndex = -1;
    restProps.tabindex = iconTabIndex;
  }

  var svgStyle = rotate ? {
    msTransform: "rotate(".concat(rotate, "deg)"),
    transform: "rotate(".concat(rotate, "deg)")
  } : undefined;

  var _normalizeTwoToneColo = normalizeTwoToneColors(twoToneColor),
      _normalizeTwoToneColo2 = _slicedToArray(_normalizeTwoToneColo, 2),
      primaryColor = _normalizeTwoToneColo2[0],
      secondaryColor = _normalizeTwoToneColo2[1];

  return createVNode("span", _objectSpread$6({
    "role": "img",
    "aria-label": icon.name
  }, restProps, {
    "onClick": onClick,
    "class": classObj
  }), [createVNode(VueIcon, {
    "class": svgClassString,
    "icon": icon,
    "primaryColor": primaryColor,
    "secondaryColor": secondaryColor,
    "style": svgStyle
  }, null)]);
};

Icon.props = {
  spin: Boolean,
  rotate: Number,
  icon: Object,
  twoToneColor: String
};
Icon.displayName = 'AntdIcon';
Icon.inheritAttrs = false;
Icon.getTwoToneColor = getTwoToneColor;
Icon.setTwoToneColor = setTwoToneColor;
const AntdIcon = Icon;

function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$5(target, key, source[key]); }); } return target; }

function _defineProperty$5(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RightOutlined = function RightOutlined(props, context) {
  var p = _objectSpread$5({}, props, context.attrs);

  return createVNode(AntdIcon, _objectSpread$5({}, p, {
    "icon": RightOutlinedSvg
  }), null);
};

RightOutlined.displayName = 'RightOutlined';
RightOutlined.inheritAttrs = false;
const RightOutlined$1 = RightOutlined;

/* eslint-disable */
// Inspired by https://github.com/garycourt/murmurhash-js
// Ported from https://github.com/aappleby/smhasher/blob/61a0530f28277f2e850bfc39600ce61d02b518de/src/MurmurHash2.cpp#L37-L86
function murmur2(str) {
  // 'm' and 'r' are mixing constants generated offline.
  // They're not really 'magic', they just happen to work well.
  // const m = 0x5bd1e995;
  // const r = 24;
  // Initialize the hash
  var h = 0; // Mix 4 bytes at a time into the hash

  var k,
      i = 0,
      len = str.length;

  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16);
    k ^=
    /* k >>> r: */
    k >>> 24;
    h =
    /* Math.imul(k, m): */
    (k & 0xffff) * 0x5bd1e995 + ((k >>> 16) * 0xe995 << 16) ^
    /* Math.imul(h, m): */
    (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Handle the last few bytes of the input array


  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h =
      /* Math.imul(h, m): */
      (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  } // Do a few final mixes of the hash to ensure the last few
  // bytes are well-incorporated.


  h ^= h >>> 13;
  h =
  /* Math.imul(h, m): */
  (h & 0xffff) * 0x5bd1e995 + ((h >>> 16) * 0xe995 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}

var unitlessKeys = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

// This icon file is generated automatically.
var BarsOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "0 0 1024 1024", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0z" } }] }, "name": "bars", "theme": "outlined" };
const BarsOutlinedSvg = BarsOutlined$2;

function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$4(target, key, source[key]); }); } return target; }

function _defineProperty$4(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BarsOutlined = function BarsOutlined(props, context) {
  var p = _objectSpread$4({}, props, context.attrs);

  return createVNode(AntdIcon, _objectSpread$4({}, p, {
    "icon": BarsOutlinedSvg
  }), null);
};

BarsOutlined.displayName = 'BarsOutlined';
BarsOutlined.inheritAttrs = false;
const BarsOutlined$1 = BarsOutlined;

// This icon file is generated automatically.
var LeftOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" } }] }, "name": "left", "theme": "outlined" };
const LeftOutlinedSvg = LeftOutlined$2;

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$3(target, key, source[key]); }); } return target; }

function _defineProperty$3(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LeftOutlined = function LeftOutlined(props, context) {
  var p = _objectSpread$3({}, props, context.attrs);

  return createVNode(AntdIcon, _objectSpread$3({}, p, {
    "icon": LeftOutlinedSvg
  }), null);
};

LeftOutlined.displayName = 'LeftOutlined';
LeftOutlined.inheritAttrs = false;
const LeftOutlined$1 = LeftOutlined;

// This icon file is generated automatically.
var EllipsisOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M176 511a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0z" } }] }, "name": "ellipsis", "theme": "outlined" };
const EllipsisOutlinedSvg = EllipsisOutlined$2;

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$2(target, key, source[key]); }); } return target; }

function _defineProperty$2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EllipsisOutlined = function EllipsisOutlined(props, context) {
  var p = _objectSpread$2({}, props, context.attrs);

  return createVNode(AntdIcon, _objectSpread$2({}, p, {
    "icon": EllipsisOutlinedSvg
  }), null);
};

EllipsisOutlined.displayName = 'EllipsisOutlined';
EllipsisOutlined.inheritAttrs = false;
const EllipsisOutlined$1 = EllipsisOutlined;

// This icon file is generated automatically.
var CloseOutlined$2 = { "icon": { "tag": "svg", "attrs": { "fill-rule": "evenodd", "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z" } }] }, "name": "close", "theme": "outlined" };
const CloseOutlinedSvg = CloseOutlined$2;

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } return target; }

function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CloseOutlined = function CloseOutlined(props, context) {
  var p = _objectSpread$1({}, props, context.attrs);

  return createVNode(AntdIcon, _objectSpread$1({}, p, {
    "icon": CloseOutlinedSvg
  }), null);
};

CloseOutlined.displayName = 'CloseOutlined';
CloseOutlined.inheritAttrs = false;
const CloseOutlined$1 = CloseOutlined;

// This icon file is generated automatically.
var PlusOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" } }, { "tag": "path", "attrs": { "d": "M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8z" } }] }, "name": "plus", "theme": "outlined" };
const PlusOutlinedSvg = PlusOutlined$2;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PlusOutlined = function PlusOutlined(props, context) {
  var p = _objectSpread({}, props, context.attrs);

  return createVNode(AntdIcon, _objectSpread({}, p, {
    "icon": PlusOutlinedSvg
  }), null);
};

PlusOutlined.displayName = 'PlusOutlined';
PlusOutlined.inheritAttrs = false;
const PlusOutlined$1 = PlusOutlined;

const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
const nuxtAppCtx = /* @__PURE__ */ getContext("nuxt-app", {
  asyncContext: false
});
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.7.4";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: reactive({
      data: {},
      state: {},
      _errors: {},
      ...{ serverRendered: true }
    }),
    static: {
      data: {}
    },
    runWithContext: (fn) => callWithNuxt(nuxtApp, fn),
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    _payloadRevivers: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    async function contextCaller(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    }
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
      nuxtApp.ssrContext._payloadReducers = {};
      nuxtApp.payload.path = nuxtApp.ssrContext.url;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin) {
  if (plugin.hooks) {
    nuxtApp.hooks.addHooks(plugin.hooks);
  }
  if (typeof plugin === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  var _a, _b;
  const parallels = [];
  const errors = [];
  for (const plugin of plugins2) {
    if (((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext) && ((_b = plugin.env) == null ? void 0 : _b.islands) === false) {
      continue;
    }
    const promise = applyPlugin(nuxtApp, plugin);
    if (plugin.parallel) {
      parallels.push(promise.catch((e) => errors.push(e)));
    } else {
      await promise;
    }
  }
  await Promise.all(parallels);
  if (errors.length) {
    throw errors[0];
  }
}
/*! @__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin) {
  if (typeof plugin === "function") {
    return plugin;
  }
  delete plugin.name;
  return Object.assign(plugin.setup || (() => {
  }), plugin, { [NuxtPluginIndicator]: true });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
/*! @__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function useNuxtApp() {
  var _a;
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.app.$nuxt;
  }
  nuxtAppInstance = nuxtAppInstance || nuxtAppCtx.tryUse();
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
/*! @__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig() {
  return (/* @__PURE__ */ useNuxtApp()).$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
version$1.startsWith("3");
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2, lastKey = "") {
  if (ref2 instanceof Promise)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r, lastKey));
  if (typeof root === "object") {
    return Object.fromEntries(
      Object.entries(root).map(([k, v]) => {
        if (k === "titleTemplate" || k.startsWith("on"))
          return [k, unref(v)];
        return [k, resolveUnrefHeadInput(v, k)];
      })
    );
  }
  return root;
}
defineHeadPlugin({
  hooks: {
    "entries:resolve": function(ctx) {
      for (const entry2 of ctx.entries)
        entry2.resolvedInput = resolveUnrefHeadInput(entry2.input);
    }
  }
});
const headSymbol = "usehead";
const _global = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey = "__unhead_injection_handler__";
function setHeadInjectionHandler(handler) {
  _global[globalKey] = handler;
}
function injectHead() {
  if (globalKey in _global) {
    return _global[globalKey]();
  }
  const head = inject(headSymbol);
  if (!head && "production" !== "production")
    console.warn("Unhead is missing Vue context, falling back to shared context. This may have unexpected results.");
  return head || getActiveHead();
}
const PageRouteSymbol = Symbol("route");
const useRouter = () => {
  var _a;
  return (_a = /* @__PURE__ */ useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, (/* @__PURE__ */ useNuxtApp())._route);
  }
  return (/* @__PURE__ */ useNuxtApp())._route;
};
const isProcessingMiddleware = () => {
  try {
    if ((/* @__PURE__ */ useNuxtApp())._processingMiddleware) {
      return true;
    }
  } catch {
    return true;
  }
  return false;
};
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : withQuery(to.path || "/", to.query || {}) + (to.hash || "");
  if (options == null ? void 0 : options.open) {
    return Promise.resolve();
  }
  const isExternal = (options == null ? void 0 : options.external) || hasProtocol(toPath, { acceptRelative: true });
  if (isExternal) {
    if (!(options == null ? void 0 : options.external)) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const protocol = parseURL(toPath).protocol;
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = /* @__PURE__ */ useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      async function redirect(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(/"/g, "%22");
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode((options == null ? void 0 : options.redirectCode) || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: location2 }
        };
        return response;
      }
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    if (options == null ? void 0 : options.replace) {
      location.replace(toPath);
    } else {
      location.href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
const useError = () => toRef((/* @__PURE__ */ useNuxtApp()).payload, "error");
const showError = (_err) => {
  const err = createError(_err);
  try {
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    const error = useError();
    if (false)
      ;
    error.value = error.value || err;
  } catch {
    throw err;
  }
  return err;
};
const isNuxtError = (err) => !!(err && typeof err === "object" && "__nuxt_error" in err);
const createError = (err) => {
  const _err = createError$1(err);
  _err.__nuxt_error = true;
  return _err;
};
function definePayloadReducer(name, reduce) {
  {
    (/* @__PURE__ */ useNuxtApp()).ssrContext._payloadReducers[name] = reduce;
  }
}
const unhead_PvzMMInHUd = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    setHeadInjectionHandler(
      // need a fresh instance of the nuxt app to avoid parallel requests interfering with each other
      () => (/* @__PURE__ */ useNuxtApp()).vueApp._context.provides.usehead
    );
    nuxtApp.vueApp.use(head);
  }
});
const globalMiddleware = [];
function getRouteFromPath(fullPath) {
  if (typeof fullPath === "object") {
    fullPath = stringifyParsedURL({
      pathname: fullPath.path || "",
      search: stringifyQuery(fullPath.query || {}),
      hash: fullPath.hash || ""
    });
  }
  const url = parseURL(fullPath.toString());
  return {
    path: url.pathname,
    fullPath,
    query: parseQuery(url.search),
    hash: url.hash,
    // stub properties for compat with vue-router
    params: {},
    name: void 0,
    matched: [],
    redirectedFrom: void 0,
    meta: {},
    href: fullPath
  };
}
const router_wzflvOArNB = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  setup(nuxtApp) {
    const initialURL = nuxtApp.ssrContext.url;
    const routes = [];
    const hooks = {
      "navigate:before": [],
      "resolve:before": [],
      "navigate:after": [],
      error: []
    };
    const registerHook = (hook, guard) => {
      hooks[hook].push(guard);
      return () => hooks[hook].splice(hooks[hook].indexOf(guard), 1);
    };
    (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    const route = reactive(getRouteFromPath(initialURL));
    async function handleNavigation(url, replace) {
      try {
        const to = getRouteFromPath(url);
        for (const middleware of hooks["navigate:before"]) {
          const result = await middleware(to, route);
          if (result === false || result instanceof Error) {
            return;
          }
          if (typeof result === "string" && result.length) {
            return handleNavigation(result, true);
          }
        }
        for (const handler of hooks["resolve:before"]) {
          await handler(to, route);
        }
        Object.assign(route, to);
        if (false)
          ;
        for (const middleware of hooks["navigate:after"]) {
          await middleware(to, route);
        }
      } catch (err) {
        for (const handler of hooks.error) {
          await handler(err);
        }
      }
    }
    const router = {
      currentRoute: route,
      isReady: () => Promise.resolve(),
      // These options provide a similar API to vue-router but have no effect
      options: {},
      install: () => Promise.resolve(),
      // Navigation
      push: (url) => handleNavigation(url),
      replace: (url) => handleNavigation(url),
      back: () => window.history.go(-1),
      go: (delta) => window.history.go(delta),
      forward: () => window.history.go(1),
      // Guards
      beforeResolve: (guard) => registerHook("resolve:before", guard),
      beforeEach: (guard) => registerHook("navigate:before", guard),
      afterEach: (guard) => registerHook("navigate:after", guard),
      onError: (handler) => registerHook("error", handler),
      // Routes
      resolve: getRouteFromPath,
      addRoute: (parentName, route2) => {
        routes.push(route2);
      },
      getRoutes: () => routes,
      hasRoute: (name) => routes.some((route2) => route2.name === name),
      removeRoute: (name) => {
        const index = routes.findIndex((route2) => route2.name === name);
        if (index !== -1) {
          routes.splice(index, 1);
        }
      }
    };
    nuxtApp.vueApp.component("RouterLink", {
      functional: true,
      props: {
        to: String,
        custom: Boolean,
        replace: Boolean,
        // Not implemented
        activeClass: String,
        exactActiveClass: String,
        ariaCurrentValue: String
      },
      setup: (props, { slots }) => {
        const navigate = () => handleNavigation(props.to, props.replace);
        return () => {
          var _a;
          const route2 = router.resolve(props.to);
          return props.custom ? (_a = slots.default) == null ? void 0 : _a.call(slots, { href: props.to, navigate, route: route2 }) : h("a", { href: props.to, onClick: (e) => {
            e.preventDefault();
            return navigate();
          } }, slots);
        };
      }
    });
    nuxtApp._route = route;
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    const initialLayout = nuxtApp.payload.state._layout;
    nuxtApp.hooks.hookOnce("app:created", async () => {
      router.beforeEach(async (to, from) => {
        var _a;
        to.meta = reactive(to.meta || {});
        if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
          to.meta.layout = initialLayout;
        }
        nuxtApp._processingMiddleware = true;
        if (!((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext)) {
          const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
          for (const middleware of middlewareEntries) {
            const result = await nuxtApp.runWithContext(() => middleware(to, from));
            {
              if (result === false || result instanceof Error) {
                const error = result || createError$1({
                  statusCode: 404,
                  statusMessage: `Page Not Found: ${initialURL}`
                });
                delete nuxtApp._processingMiddleware;
                return nuxtApp.runWithContext(() => showError(error));
              }
            }
            if (result === true) {
              continue;
            }
            if (result || result === false) {
              return result;
            }
          }
        }
      });
      router.afterEach(() => {
        delete nuxtApp._processingMiddleware;
      });
      await router.replace(initialURL);
      if (!isEqual(route.fullPath, initialURL)) {
        await nuxtApp.runWithContext(() => navigateTo(route.fullPath));
      }
    });
    return {
      provide: {
        route,
        router
      }
    };
  }
});
const reducers = {
  NuxtError: (data2) => isNuxtError(data2) && data2.toJSON(),
  EmptyShallowRef: (data2) => isRef(data2) && isShallow(data2) && !data2.value && (typeof data2.value === "bigint" ? "0n" : JSON.stringify(data2.value) || "_"),
  EmptyRef: (data2) => isRef(data2) && !data2.value && (typeof data2.value === "bigint" ? "0n" : JSON.stringify(data2.value) || "_"),
  ShallowRef: (data2) => isRef(data2) && isShallow(data2) && data2.value,
  ShallowReactive: (data2) => isReactive(data2) && isShallow(data2) && toRaw(data2),
  Ref: (data2) => isRef(data2) && data2.value,
  Reactive: (data2) => isReactive(data2) && toRaw(data2)
};
const revive_payload_server_fi2VUAmgAN = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const reducer in reducers) {
      definePayloadReducer(reducer, reducers[reducer]);
    }
  }
});
const components_plugin_KR1HBZs4kY = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
const plugins = [
  unhead_PvzMMInHUd,
  router_wzflvOArNB,
  revive_payload_server_fi2VUAmgAN,
  components_plugin_KR1HBZs4kY
];
const isFunction = (val) => typeof val === "function";
const isArray = Array.isArray;
const isString = (val) => typeof val === "string";
const isObject = (val) => val !== null && typeof val === "object";
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => {
  return str.replace(hyphenateRE, "-$1").toLowerCase();
});
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
function resolvePropValue(options, props, key, value) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      value = opt.type !== Function && isFunction(defaultValue) ? defaultValue() : defaultValue;
    }
    if (opt.type === Boolean) {
      if (!hasOwn(props, key) && !hasDefault) {
        value = false;
      } else if (value === "") {
        value = true;
      }
    }
  }
  return value;
}
function getDataAndAriaProps(props) {
  return Object.keys(props).reduce((memo, key) => {
    if (key.startsWith("data-") || key.startsWith("aria-")) {
      memo[key] = props[key];
    }
    return memo;
  }, {});
}
function toPx(val) {
  if (typeof val === "number")
    return `${val}px`;
  return val;
}
function classNames() {
  const classes = [];
  for (let i = 0; i < arguments.length; i++) {
    const value = i < 0 || arguments.length <= i ? void 0 : arguments[i];
    if (!value)
      continue;
    if (isString(value)) {
      classes.push(value);
    } else if (isArray(value)) {
      for (let i2 = 0; i2 < value.length; i2++) {
        const inner = classNames(value[i2]);
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (isObject(value)) {
      for (const name in value) {
        if (value[name]) {
          classes.push(name);
        }
      }
    }
  }
  return classes.join(" ");
}
const isValid = (value) => {
  return value !== void 0 && value !== null && value !== "";
};
const isValid$1 = isValid;
const initDefaultProps = (types, defaultProps) => {
  const propTypes = _extends({}, types);
  Object.keys(defaultProps).forEach((k) => {
    const prop = propTypes[k];
    if (prop) {
      if (prop.type || prop.default) {
        prop.default = defaultProps[k];
      } else if (prop.def) {
        prop.def(defaultProps[k]);
      } else {
        propTypes[k] = {
          type: prop,
          default: defaultProps[k]
        };
      }
    } else {
      throw new Error(`not have ${k} prop`);
    }
  });
  return propTypes;
};
const initDefaultProps$1 = initDefaultProps;
const splitAttrs = (attrs) => {
  const allAttrs = Object.keys(attrs);
  const eventAttrs = {};
  const onEvents = {};
  const extraAttrs = {};
  for (let i = 0, l = allAttrs.length; i < l; i++) {
    const key = allAttrs[i];
    if (isOn(key)) {
      eventAttrs[key[2].toLowerCase() + key.slice(3)] = attrs[key];
      onEvents[key] = attrs[key];
    } else {
      extraAttrs[key] = attrs[key];
    }
  }
  return {
    onEvents,
    events: eventAttrs,
    extraAttrs
  };
};
const parseStyleText = function() {
  let cssText = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  let camel = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  const res = {};
  const listDelimiter = /;(?![^(]*\))/g;
  const propertyDelimiter = /:(.+)/;
  if (typeof cssText === "object")
    return cssText;
  cssText.split(listDelimiter).forEach(function(item) {
    if (item) {
      const tmp = item.split(propertyDelimiter);
      if (tmp.length > 1) {
        const k = camel ? camelize(tmp[0].trim()) : tmp[0].trim();
        res[k] = tmp[1].trim();
      }
    }
  });
  return res;
};
const hasProp = (instance, prop) => {
  return instance[prop] !== void 0;
};
const skipFlattenKey = Symbol("skipFlatten");
const flattenChildren = function() {
  let children = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  let filterEmpty2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  const temp = Array.isArray(children) ? children : [children];
  const res = [];
  temp.forEach((child) => {
    if (Array.isArray(child)) {
      res.push(...flattenChildren(child, filterEmpty2));
    } else if (child && child.type === Fragment) {
      if (child.key === skipFlattenKey) {
        res.push(child);
      } else {
        res.push(...flattenChildren(child.children, filterEmpty2));
      }
    } else if (child && isVNode(child)) {
      if (filterEmpty2 && !isEmptyElement(child)) {
        res.push(child);
      } else if (!filterEmpty2) {
        res.push(child);
      }
    } else if (isValid$1(child)) {
      res.push(child);
    }
  });
  return res;
};
const getSlot = function(self2) {
  let name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "default";
  let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  if (isVNode(self2)) {
    if (self2.type === Fragment) {
      return name === "default" ? flattenChildren(self2.children) : [];
    } else if (self2.children && self2.children[name]) {
      return flattenChildren(self2.children[name](options));
    } else {
      return [];
    }
  } else {
    const res = self2.$slots[name] && self2.$slots[name](options);
    return flattenChildren(res);
  }
};
const findDOMNode = (instance) => {
  var _a;
  let node = ((_a = instance === null || instance === void 0 ? void 0 : instance.vnode) === null || _a === void 0 ? void 0 : _a.el) || instance && (instance.$el || instance);
  while (node && !node.tagName) {
    node = node.nextSibling;
  }
  return node;
};
const getOptionProps = (instance) => {
  const res = {};
  if (instance.$ && instance.$.vnode) {
    const props = instance.$.vnode.props || {};
    Object.keys(instance.$props).forEach((k) => {
      const v = instance.$props[k];
      const hyphenateKey = hyphenate(k);
      if (v !== void 0 || hyphenateKey in props) {
        res[k] = v;
      }
    });
  } else if (isVNode(instance) && typeof instance.type === "object") {
    const originProps = instance.props || {};
    const props = {};
    Object.keys(originProps).forEach((key) => {
      props[camelize(key)] = originProps[key];
    });
    const options = instance.type.props || {};
    Object.keys(options).forEach((k) => {
      const v = resolvePropValue(options, props, k, props[k]);
      if (v !== void 0 || k in props) {
        res[k] = v;
      }
    });
  }
  return res;
};
const getComponent = function(instance) {
  let prop = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "default";
  let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : instance;
  let execute = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
  let com = void 0;
  if (instance.$) {
    const temp = instance[prop];
    if (temp !== void 0) {
      return typeof temp === "function" && execute ? temp(options) : temp;
    } else {
      com = instance.$slots[prop];
      com = execute && com ? com(options) : com;
    }
  } else if (isVNode(instance)) {
    const temp = instance.props && instance.props[prop];
    if (temp !== void 0 && instance.props !== null) {
      return typeof temp === "function" && execute ? temp(options) : temp;
    } else if (instance.type === Fragment) {
      com = instance.children;
    } else if (instance.children && instance.children[prop]) {
      com = instance.children[prop];
      com = execute && com ? com(options) : com;
    }
  }
  if (Array.isArray(com)) {
    com = flattenChildren(com);
    com = com.length === 1 ? com[0] : com;
    com = com.length === 0 ? void 0 : com;
  }
  return com;
};
function getEvents() {
  let ele = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  let on = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  let props = {};
  if (ele.$) {
    props = _extends(_extends({}, props), ele.$attrs);
  } else {
    props = _extends(_extends({}, props), ele.props);
  }
  return splitAttrs(props)[on ? "onEvents" : "events"];
}
function getStyle(ele, camel) {
  const props = (isVNode(ele) ? ele.props : ele.$attrs) || {};
  let style = props.style || {};
  if (typeof style === "string") {
    style = parseStyleText(style, camel);
  } else if (camel && style) {
    const res = {};
    Object.keys(style).forEach((k) => res[camelize(k)] = style[k]);
    return res;
  }
  return style;
}
function isFragment(c) {
  return c.length === 1 && c[0].type === Fragment;
}
function isEmptyElement(c) {
  return c && (c.type === Comment || c.type === Fragment && c.children.length === 0 || c.type === Text && c.children.trim() === "");
}
function filterEmpty() {
  let children = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  const res = [];
  children.forEach((child) => {
    if (Array.isArray(child)) {
      res.push(...child);
    } else if ((child === null || child === void 0 ? void 0 : child.type) === Fragment) {
      res.push(...filterEmpty(child.children));
    } else {
      res.push(child);
    }
  });
  return res.filter((c) => !isEmptyElement(c));
}
function isValidElement(element) {
  if (Array.isArray(element) && element.length === 1) {
    element = element[0];
  }
  return element && element.__v_isVNode && typeof element.type !== "symbol";
}
function getPropsSlot(slots, props) {
  let prop = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "default";
  var _a, _b;
  return (_a = props[prop]) !== null && _a !== void 0 ? _a : (_b = slots[prop]) === null || _b === void 0 ? void 0 : _b.call(slots);
}
const ResizeObserver = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ResizeObserver",
  props: {
    disabled: Boolean,
    onResize: Function
  },
  emits: ["resize"],
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const state = reactive({
      width: 0,
      height: 0,
      offsetHeight: 0,
      offsetWidth: 0
    });
    let currentElement = null;
    let resizeObserver = null;
    const destroyObserver = () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
      }
    };
    const onResize = (entries) => {
      const {
        onResize: onResize2
      } = props;
      const target = entries[0].target;
      const {
        width,
        height
      } = target.getBoundingClientRect();
      const {
        offsetWidth,
        offsetHeight
      } = target;
      const fixedWidth = Math.floor(width);
      const fixedHeight = Math.floor(height);
      if (state.width !== fixedWidth || state.height !== fixedHeight || state.offsetWidth !== offsetWidth || state.offsetHeight !== offsetHeight) {
        const size = {
          width: fixedWidth,
          height: fixedHeight,
          offsetWidth,
          offsetHeight
        };
        _extends(state, size);
        if (onResize2) {
          Promise.resolve().then(() => {
            onResize2(_extends(_extends({}, size), {
              offsetWidth,
              offsetHeight
            }), target);
          });
        }
      }
    };
    const instance = getCurrentInstance();
    const registerObserver = () => {
      const {
        disabled
      } = props;
      if (disabled) {
        destroyObserver();
        return;
      }
      const element = findDOMNode(instance);
      const elementChanged = element !== currentElement;
      if (elementChanged) {
        destroyObserver();
        currentElement = element;
      }
      if (!resizeObserver && element) {
        resizeObserver = new ResizeObserver$1(onResize);
        resizeObserver.observe(element);
      }
    };
    onUpdated(() => {
      registerObserver();
    });
    onUnmounted(() => {
      destroyObserver();
    });
    watch(() => props.disabled, () => {
      registerObserver();
    }, {
      flush: "post"
    });
    return () => {
      var _a;
      return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)[0];
    };
  }
});
let raf = (callback) => setTimeout(callback, 16);
let caf = (num) => clearTimeout(num);
let rafUUID = 0;
const rafIds = /* @__PURE__ */ new Map();
function cleanup(id) {
  rafIds.delete(id);
}
function wrapperRaf(callback) {
  let times = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  rafUUID += 1;
  const id = rafUUID;
  function callRef(leftTimes) {
    if (leftTimes === 0) {
      cleanup(id);
      callback();
    } else {
      const realId = raf(() => {
        callRef(leftTimes - 1);
      });
      rafIds.set(id, realId);
    }
  }
  callRef(times);
  return id;
}
wrapperRaf.cancel = (id) => {
  const realId = rafIds.get(id);
  cleanup(realId);
  return caf(realId);
};
const tuple = function() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return args;
};
const withInstall = (comp) => {
  const c = comp;
  c.install = function(app) {
    app.component(c.displayName || c.name, comp);
  };
  return comp;
};
function objectType(defaultVal) {
  return {
    type: Object,
    default: defaultVal
  };
}
function booleanType(defaultVal) {
  return {
    type: Boolean,
    default: defaultVal
  };
}
function functionType(defaultVal) {
  return {
    type: Function,
    default: defaultVal
  };
}
function anyType(defaultVal, required) {
  const type = {
    validator: () => true,
    default: defaultVal
  };
  return required ? type : type;
}
function arrayType(defaultVal) {
  return {
    type: Array,
    default: defaultVal
  };
}
function stringType(defaultVal) {
  return {
    type: String,
    default: defaultVal
  };
}
function someType(types, defaultVal) {
  return types ? {
    type: types,
    default: defaultVal
  } : anyType(defaultVal);
}
let supportsPassive = false;
try {
  const opts = Object.defineProperty({}, "passive", {
    get() {
      supportsPassive = true;
    }
  });
  window.addEventListener("testPassive", null, opts);
  window.removeEventListener("testPassive", null, opts);
} catch (e) {
}
const supportsPassive$1 = supportsPassive;
function addEventListenerWrap(target, eventType, cb, option) {
  if (target && target.addEventListener) {
    let opt = option;
    if (opt === void 0 && supportsPassive$1 && (eventType === "touchstart" || eventType === "touchmove" || eventType === "wheel")) {
      opt = {
        passive: false
      };
    }
    target.addEventListener(eventType, cb, opt);
  }
  return {
    remove: () => {
      if (target && target.removeEventListener) {
        target.removeEventListener(eventType, cb);
      }
    }
  };
}
const defaultIconPrefixCls = "anticon";
const configProviderKey = Symbol("configProvider");
const defaultConfigProvider = {
  getPrefixCls: (suffixCls, customizePrefixCls) => {
    if (customizePrefixCls)
      return customizePrefixCls;
    return suffixCls ? `ant-${suffixCls}` : "ant";
  },
  iconPrefixCls: computed(() => defaultIconPrefixCls),
  getPopupContainer: computed(() => () => document.body),
  direction: computed(() => "ltr")
};
const useConfigContextInject = () => {
  return inject(configProviderKey, defaultConfigProvider);
};
const DisabledContextKey = Symbol("DisabledContextKey");
const useInjectDisabled = () => {
  return inject(DisabledContextKey, ref(void 0));
};
const enUS$1 = {
  // Options.jsx
  items_per_page: "/ page",
  jump_to: "Go to",
  jump_to_confirm: "confirm",
  page: "",
  // Pagination.jsx
  prev_page: "Previous Page",
  next_page: "Next Page",
  prev_5: "Previous 5 Pages",
  next_5: "Next 5 Pages",
  prev_3: "Previous 3 Pages",
  next_3: "Next 3 Pages"
};
const locale$2 = {
  locale: "en_US",
  today: "Today",
  now: "Now",
  backToToday: "Back to today",
  ok: "Ok",
  clear: "Clear",
  month: "Month",
  year: "Year",
  timeSelect: "select time",
  dateSelect: "select date",
  weekSelect: "Choose a week",
  monthSelect: "Choose a month",
  yearSelect: "Choose a year",
  decadeSelect: "Choose a decade",
  yearFormat: "YYYY",
  dateFormat: "M/D/YYYY",
  dayFormat: "D",
  dateTimeFormat: "M/D/YYYY HH:mm:ss",
  monthBeforeYear: true,
  previousMonth: "Previous month (PageUp)",
  nextMonth: "Next month (PageDown)",
  previousYear: "Last year (Control + left)",
  nextYear: "Next year (Control + right)",
  previousDecade: "Last decade",
  nextDecade: "Next decade",
  previousCentury: "Last century",
  nextCentury: "Next century"
};
const CalendarLocale = locale$2;
const locale$1 = {
  placeholder: "Select time",
  rangePlaceholder: ["Start time", "End time"]
};
const TimePicker = locale$1;
const locale = {
  lang: _extends({
    placeholder: "Select date",
    yearPlaceholder: "Select year",
    quarterPlaceholder: "Select quarter",
    monthPlaceholder: "Select month",
    weekPlaceholder: "Select week",
    rangePlaceholder: ["Start date", "End date"],
    rangeYearPlaceholder: ["Start year", "End year"],
    rangeQuarterPlaceholder: ["Start quarter", "End quarter"],
    rangeMonthPlaceholder: ["Start month", "End month"],
    rangeWeekPlaceholder: ["Start week", "End week"]
  }, CalendarLocale),
  timePickerLocale: _extends({}, TimePicker)
};
const enUS = locale;
const typeTemplate = "${label} is not a valid ${type}";
const localeValues = {
  locale: "en",
  Pagination: enUS$1,
  DatePicker: enUS,
  TimePicker,
  Calendar: enUS,
  global: {
    placeholder: "Please select"
  },
  Table: {
    filterTitle: "Filter menu",
    filterConfirm: "OK",
    filterReset: "Reset",
    filterEmptyText: "No filters",
    filterCheckall: "Select all items",
    filterSearchPlaceholder: "Search in filters",
    emptyText: "No data",
    selectAll: "Select current page",
    selectInvert: "Invert current page",
    selectNone: "Clear all data",
    selectionAll: "Select all data",
    sortTitle: "Sort",
    expand: "Expand row",
    collapse: "Collapse row",
    triggerDesc: "Click to sort descending",
    triggerAsc: "Click to sort ascending",
    cancelSort: "Click to cancel sorting"
  },
  Tour: {
    Next: "Next",
    Previous: "Previous",
    Finish: "Finish"
  },
  Modal: {
    okText: "OK",
    cancelText: "Cancel",
    justOkText: "OK"
  },
  Popconfirm: {
    okText: "OK",
    cancelText: "Cancel"
  },
  Transfer: {
    titles: ["", ""],
    searchPlaceholder: "Search here",
    itemUnit: "item",
    itemsUnit: "items",
    remove: "Remove",
    selectCurrent: "Select current page",
    removeCurrent: "Remove current page",
    selectAll: "Select all data",
    removeAll: "Remove all data",
    selectInvert: "Invert current page"
  },
  Upload: {
    uploading: "Uploading...",
    removeFile: "Remove file",
    uploadError: "Upload error",
    previewFile: "Preview file",
    downloadFile: "Download file"
  },
  Empty: {
    description: "No data"
  },
  Icon: {
    icon: "icon"
  },
  Text: {
    edit: "Edit",
    copy: "Copy",
    copied: "Copied",
    expand: "Expand"
  },
  PageHeader: {
    back: "Back"
  },
  Form: {
    optional: "(optional)",
    defaultValidateMessages: {
      default: "Field validation error for ${label}",
      required: "Please enter ${label}",
      enum: "${label} must be one of [${enum}]",
      whitespace: "${label} cannot be a blank character",
      date: {
        format: "${label} date format is invalid",
        parse: "${label} cannot be converted to a date",
        invalid: "${label} is an invalid date"
      },
      types: {
        string: typeTemplate,
        method: typeTemplate,
        array: typeTemplate,
        object: typeTemplate,
        number: typeTemplate,
        date: typeTemplate,
        boolean: typeTemplate,
        integer: typeTemplate,
        float: typeTemplate,
        regexp: typeTemplate,
        email: typeTemplate,
        url: typeTemplate,
        hex: typeTemplate
      },
      string: {
        len: "${label} must be ${len} characters",
        min: "${label} must be at least ${min} characters",
        max: "${label} must be up to ${max} characters",
        range: "${label} must be between ${min}-${max} characters"
      },
      number: {
        len: "${label} must be equal to ${len}",
        min: "${label} must be minimum ${min}",
        max: "${label} must be maximum ${max}",
        range: "${label} must be between ${min}-${max}"
      },
      array: {
        len: "Must be ${len} ${label}",
        min: "At least ${min} ${label}",
        max: "At most ${max} ${label}",
        range: "The amount of ${label} must be between ${min}-${max}"
      },
      pattern: {
        mismatch: "${label} does not match the pattern ${pattern}"
      }
    }
  },
  Image: {
    preview: "Preview"
  },
  QRCode: {
    expired: "QR code expired",
    refresh: "Refresh"
  }
};
const defaultLocale = localeValues;
const LocaleReceiver = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "LocaleReceiver",
  props: {
    componentName: String,
    defaultLocale: {
      type: [Object, Function]
    },
    children: {
      type: Function
    }
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const localeData = inject("localeData", {});
    const locale2 = computed(() => {
      const {
        componentName = "global",
        defaultLocale: defaultLocale$1
      } = props;
      const locale3 = defaultLocale$1 || defaultLocale[componentName || "global"];
      const {
        antLocale
      } = localeData;
      const localeFromContext = componentName && antLocale ? antLocale[componentName] : {};
      return _extends(_extends({}, typeof locale3 === "function" ? locale3() : locale3), localeFromContext || {});
    });
    const localeCode = computed(() => {
      const {
        antLocale
      } = localeData;
      const localeCode2 = antLocale && antLocale.locale;
      if (antLocale && antLocale.exist && !localeCode2) {
        return defaultLocale.locale;
      }
      return localeCode2;
    });
    return () => {
      const children = props.children || slots.default;
      const {
        antLocale
      } = localeData;
      return children === null || children === void 0 ? void 0 : children(locale2.value, localeCode.value, antLocale);
    };
  }
});
const SPLIT = "%";
class Entity {
  constructor(instanceId) {
    this.cache = /* @__PURE__ */ new Map();
    this.instanceId = instanceId;
  }
  get(keys) {
    return this.cache.get(Array.isArray(keys) ? keys.join(SPLIT) : keys) || null;
  }
  update(keys, valueFn) {
    const path = Array.isArray(keys) ? keys.join(SPLIT) : keys;
    const prevValue = this.cache.get(path);
    const nextValue = valueFn(prevValue);
    if (nextValue === null) {
      this.cache.delete(path);
    } else {
      this.cache.set(path, nextValue);
    }
  }
}
const CacheEntity = Entity;
const ATTR_MARK = "data-css-hash";
function createCache() {
  const cssinjsInstanceId = Math.random().toString(12).slice(2);
  return new CacheEntity(cssinjsInstanceId);
}
const StyleContextKey = Symbol("StyleContextKey");
const defaultStyleContext = {
  cache: createCache(),
  defaultCache: true,
  hashPriority: "low"
};
const useStyleInject = () => {
  return inject(StyleContextKey, shallowRef(_extends(_extends({}, defaultStyleContext), {
    cache: createCache()
  })));
};
const useStyleProvider = (props) => {
  const parentContext = useStyleInject();
  const context = shallowRef(_extends(_extends({}, defaultStyleContext), {
    cache: createCache()
  }));
  watch([() => unref(props), parentContext], () => {
    const mergedContext = _extends({}, parentContext.value);
    const propsValue = unref(props);
    Object.keys(propsValue).forEach((key) => {
      const value = propsValue[key];
      if (propsValue[key] !== void 0) {
        mergedContext[key] = value;
      }
    });
    const {
      cache
    } = propsValue;
    mergedContext.cache = mergedContext.cache || createCache();
    mergedContext.defaultCache = !cache && parentContext.value.defaultCache;
    context.value = mergedContext;
  }, {
    immediate: true
  });
  provide(StyleContextKey, context);
  return context;
};
const styleProviderProps = () => ({
  autoClear: booleanType(),
  /** @private Test only. Not work in production. */
  mock: stringType(),
  /**
   * Only set when you need ssr to extract style on you own.
   * If not provided, it will auto create <style /> on the end of Provider in server side.
   */
  cache: objectType(),
  /** Tell children that this context is default generated context */
  defaultCache: booleanType(),
  /** Use `:where` selector to reduce hashId css selector priority */
  hashPriority: stringType(),
  /** Tell cssinjs where to inject style in */
  container: someType(),
  /** Component wil render inline  `<style />` for fallback in SSR. Not recommend. */
  ssrInline: booleanType(),
  /** Transform css before inject in document. Please note that `transformers` do not support dynamic update */
  transformers: arrayType(),
  /**
   * Linters to lint css before inject in document.
   * Styles will be linted after transforming.
   * Please note that `linters` do not support dynamic update.
   */
  linters: arrayType()
});
withInstall(/* @__PURE__ */ defineComponent({
  name: "AStyleProvider",
  inheritAttrs: false,
  props: styleProviderProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useStyleProvider(props);
    return () => {
      var _a;
      return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots);
    };
  }
}));
function useClientCache(prefix, keyPath, cacheFn, onCacheRemove) {
  const styleContext = useStyleInject();
  const fullPathStr = shallowRef("");
  const res = shallowRef();
  watchEffect(() => {
    fullPathStr.value = [prefix, ...keyPath.value].join("%");
  });
  const clearCache = (pathStr) => {
    styleContext.value.cache.update(pathStr, (prevCache) => {
      const [times = 0, cache] = prevCache || [];
      const nextCount = times - 1;
      if (nextCount === 0) {
        onCacheRemove === null || onCacheRemove === void 0 ? void 0 : onCacheRemove(cache, false);
        return null;
      }
      return [times - 1, cache];
    });
  };
  watch(fullPathStr, (newStr, oldStr) => {
    if (oldStr)
      clearCache(oldStr);
    styleContext.value.cache.update(newStr, (prevCache) => {
      const [times = 0, cache] = prevCache || [];
      let tmpCache = cache;
      const mergedCache = tmpCache || cacheFn();
      return [times + 1, mergedCache];
    });
    res.value = styleContext.value.cache.get(fullPathStr.value)[1];
  }, {
    immediate: true
  });
  return res;
}
function canUseDom() {
  return false;
}
function contains(root, n) {
  if (!root) {
    return false;
  }
  if (root.contains) {
    return root.contains(n);
  }
  return false;
}
const MARK_KEY = `vc-util-key`;
const containerCache = /* @__PURE__ */ new Map();
function getMark() {
  let {
    mark
  } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  if (mark) {
    return mark.startsWith("data-") ? mark : `data-${mark}`;
  }
  return MARK_KEY;
}
function getContainer(option) {
  if (option.attachTo) {
    return option.attachTo;
  }
  const head = document.querySelector("head");
  return head || document.body;
}
function findStyles(container) {
  return Array.from((containerCache.get(container) || container).children).filter((node) => node.tagName === "STYLE");
}
function findExistNode(key) {
  let option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const container = getContainer(option);
  return findStyles(container).find((node) => node.getAttribute(getMark(option)) === key);
}
function removeCSS(key) {
  let option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const existNode = findExistNode(key, option);
  if (existNode) {
    const container = getContainer(option);
    container.removeChild(existNode);
  }
}
function sameDerivativeOption(left, right) {
  if (left.length !== right.length) {
    return false;
  }
  for (let i = 0; i < left.length; i++) {
    if (left[i] !== right[i]) {
      return false;
    }
  }
  return true;
}
class ThemeCache {
  constructor() {
    this.cache = /* @__PURE__ */ new Map();
    this.keys = [];
    this.cacheCallTimes = 0;
  }
  size() {
    return this.keys.length;
  }
  internalGet(derivativeOption) {
    let updateCallTimes = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    let cache = {
      map: this.cache
    };
    derivativeOption.forEach((derivative2) => {
      var _a;
      if (!cache) {
        cache = void 0;
      } else {
        cache = (_a = cache === null || cache === void 0 ? void 0 : cache.map) === null || _a === void 0 ? void 0 : _a.get(derivative2);
      }
    });
    if ((cache === null || cache === void 0 ? void 0 : cache.value) && updateCallTimes) {
      cache.value[1] = this.cacheCallTimes++;
    }
    return cache === null || cache === void 0 ? void 0 : cache.value;
  }
  get(derivativeOption) {
    var _a;
    return (_a = this.internalGet(derivativeOption, true)) === null || _a === void 0 ? void 0 : _a[0];
  }
  has(derivativeOption) {
    return !!this.internalGet(derivativeOption);
  }
  set(derivativeOption, value) {
    if (!this.has(derivativeOption)) {
      if (this.size() + 1 > ThemeCache.MAX_CACHE_SIZE + ThemeCache.MAX_CACHE_OFFSET) {
        const [targetKey] = this.keys.reduce((result, key) => {
          const [, callTimes] = result;
          if (this.internalGet(key)[1] < callTimes) {
            return [key, this.internalGet(key)[1]];
          }
          return result;
        }, [this.keys[0], this.cacheCallTimes]);
        this.delete(targetKey);
      }
      this.keys.push(derivativeOption);
    }
    let cache = this.cache;
    derivativeOption.forEach((derivative2, index) => {
      if (index === derivativeOption.length - 1) {
        cache.set(derivative2, {
          value: [value, this.cacheCallTimes++]
        });
      } else {
        const cacheValue = cache.get(derivative2);
        if (!cacheValue) {
          cache.set(derivative2, {
            map: /* @__PURE__ */ new Map()
          });
        } else if (!cacheValue.map) {
          cacheValue.map = /* @__PURE__ */ new Map();
        }
        cache = cache.get(derivative2).map;
      }
    });
  }
  deleteByPath(currentCache, derivatives) {
    var _a;
    const cache = currentCache.get(derivatives[0]);
    if (derivatives.length === 1) {
      if (!cache.map) {
        currentCache.delete(derivatives[0]);
      } else {
        currentCache.set(derivatives[0], {
          map: cache.map
        });
      }
      return (_a = cache.value) === null || _a === void 0 ? void 0 : _a[0];
    }
    const result = this.deleteByPath(cache.map, derivatives.slice(1));
    if ((!cache.map || cache.map.size === 0) && !cache.value) {
      currentCache.delete(derivatives[0]);
    }
    return result;
  }
  delete(derivativeOption) {
    if (this.has(derivativeOption)) {
      this.keys = this.keys.filter((item) => !sameDerivativeOption(item, derivativeOption));
      return this.deleteByPath(this.cache, derivativeOption);
    }
    return void 0;
  }
}
ThemeCache.MAX_CACHE_SIZE = 20;
ThemeCache.MAX_CACHE_OFFSET = 5;
let warned = {};
function warning$2(valid, message) {
}
function call(method, valid, message) {
  if (!valid && !warned[message]) {
    method(false, message);
    warned[message] = true;
  }
}
function warningOnce(valid, message) {
  call(warning$2, valid, message);
}
function noop$3() {
}
let warning = noop$3;
const warning$1 = warning;
let uuid$1 = 0;
class Theme {
  constructor(derivatives) {
    this.derivatives = Array.isArray(derivatives) ? derivatives : [derivatives];
    this.id = uuid$1;
    if (derivatives.length === 0) {
      warning$1(derivatives.length > 0);
    }
    uuid$1 += 1;
  }
  getDerivativeToken(token) {
    return this.derivatives.reduce((result, derivative2) => derivative2(token, result), void 0);
  }
}
const cacheThemes = new ThemeCache();
function createTheme(derivatives) {
  const derivativeArr = Array.isArray(derivatives) ? derivatives : [derivatives];
  if (!cacheThemes.has(derivativeArr)) {
    cacheThemes.set(derivativeArr, new Theme(derivativeArr));
  }
  return cacheThemes.get(derivativeArr);
}
const flattenTokenCache = /* @__PURE__ */ new WeakMap();
function flattenToken(token) {
  let str = flattenTokenCache.get(token) || "";
  if (!str) {
    Object.keys(token).forEach((key) => {
      const value = token[key];
      str += key;
      if (value instanceof Theme) {
        str += value.id;
      } else if (value && typeof value === "object") {
        str += flattenToken(value);
      } else {
        str += value;
      }
    });
    flattenTokenCache.set(token, str);
  }
  return str;
}
function token2key(token, salt) {
  return murmur2(`${salt}_${flattenToken(token)}`);
}
function supportSelector(styleStr, handleElement, supportCheck) {
  return false;
}
let canLayer = void 0;
function supportLayer() {
  if (canLayer === void 0) {
    canLayer = supportSelector();
  }
  return canLayer;
}
const EMPTY_OVERRIDE = {};
const hashPrefix = "css";
const tokenKeys = /* @__PURE__ */ new Map();
function recordCleanToken(tokenKey) {
  tokenKeys.set(tokenKey, (tokenKeys.get(tokenKey) || 0) + 1);
}
const TOKEN_THRESHOLD = 0;
function cleanTokenStyle(tokenKey, instanceId) {
  tokenKeys.set(tokenKey, (tokenKeys.get(tokenKey) || 0) - 1);
  const tokenKeyList = Array.from(tokenKeys.keys());
  const cleanableKeyList = tokenKeyList.filter((key) => {
    const count = tokenKeys.get(key) || 0;
    return count <= 0;
  });
  if (tokenKeyList.length - cleanableKeyList.length > TOKEN_THRESHOLD) {
    cleanableKeyList.forEach((key) => {
      tokenKeys.delete(key);
    });
  }
}
const getComputedToken = (originToken, overrideToken, theme, format) => {
  const derivativeToken = theme.getDerivativeToken(originToken);
  let mergedDerivativeToken = _extends(_extends({}, derivativeToken), overrideToken);
  if (format) {
    mergedDerivativeToken = format(mergedDerivativeToken);
  }
  return mergedDerivativeToken;
};
function useCacheToken(theme, tokens) {
  let option = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ref({});
  const style = useStyleInject();
  const mergedToken = computed(() => _extends({}, ...tokens.value));
  const tokenStr = computed(() => flattenToken(mergedToken.value));
  const overrideTokenStr = computed(() => flattenToken(option.value.override || EMPTY_OVERRIDE));
  const cachedToken = useClientCache("token", computed(() => [option.value.salt || "", theme.value.id, tokenStr.value, overrideTokenStr.value]), () => {
    const {
      salt = "",
      override = EMPTY_OVERRIDE,
      formatToken: formatToken2,
      getComputedToken: compute
    } = option.value;
    const mergedDerivativeToken = compute ? compute(mergedToken.value, override, theme.value) : getComputedToken(mergedToken.value, override, theme.value, formatToken2);
    const tokenKey = token2key(mergedDerivativeToken, salt);
    mergedDerivativeToken._tokenKey = tokenKey;
    recordCleanToken(tokenKey);
    const hashId = `${hashPrefix}-${murmur2(tokenKey)}`;
    mergedDerivativeToken._hashId = hashId;
    return [mergedDerivativeToken, hashId];
  }, (cache) => {
    var _a;
    cleanTokenStyle(cache[0]._tokenKey, (_a = style.value) === null || _a === void 0 ? void 0 : _a.cache.instanceId);
  });
  return cachedToken;
}
const CSS_FILE_STYLE = "_FILE_STYLE__";
let cachePathMap;
function prepare() {
  if (!cachePathMap) {
    cachePathMap = {};
  }
}
function existPath(path) {
  prepare();
  return !!cachePathMap[path];
}
function getStyleAndHash(path) {
  const hash2 = cachePathMap[path];
  let styleStr = null;
  if (hash2 && canUseDom()) {
    {
      styleStr = CSS_FILE_STYLE;
    }
  }
  return [styleStr, hash2];
}
const isClientSide = canUseDom();
const SKIP_CHECK = "_skip_check_";
const MULTI_VALUE = "_multi_value_";
function normalizeStyle(styleStr) {
  const serialized = serialize(compile(styleStr), stringify);
  return serialized.replace(/\{%%%\:[^;];}/g, ";");
}
function isCompoundCSSProperty(value) {
  return typeof value === "object" && value && (SKIP_CHECK in value || MULTI_VALUE in value);
}
function injectSelectorHash(key, hashId, hashPriority) {
  if (!hashId) {
    return key;
  }
  const hashClassName = `.${hashId}`;
  const hashSelector = hashPriority === "low" ? `:where(${hashClassName})` : hashClassName;
  const keys = key.split(",").map((k) => {
    var _a;
    const fullPath = k.trim().split(/\s+/);
    let firstPath = fullPath[0] || "";
    const htmlElement = ((_a = firstPath.match(/^\w+/)) === null || _a === void 0 ? void 0 : _a[0]) || "";
    firstPath = `${htmlElement}${hashSelector}${firstPath.slice(htmlElement.length)}`;
    return [firstPath, ...fullPath.slice(1)].join(" ");
  });
  return keys.join(",");
}
const parseStyle = function(interpolation) {
  let config = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  let {
    root,
    injectHash,
    parentSelectors
  } = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    root: true,
    parentSelectors: []
  };
  const {
    hashId,
    layer,
    path,
    hashPriority,
    transformers = [],
    linters = []
  } = config;
  let styleStr = "";
  let effectStyle = {};
  function parseKeyframes(keyframes) {
    const animationName = keyframes.getName(hashId);
    if (!effectStyle[animationName]) {
      const [parsedStr] = parseStyle(keyframes.style, config, {
        root: false,
        parentSelectors
      });
      effectStyle[animationName] = `@keyframes ${keyframes.getName(hashId)}${parsedStr}`;
    }
  }
  function flattenList(list) {
    let fullList = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    list.forEach((item) => {
      if (Array.isArray(item)) {
        flattenList(item, fullList);
      } else if (item) {
        fullList.push(item);
      }
    });
    return fullList;
  }
  const flattenStyleList = flattenList(Array.isArray(interpolation) ? interpolation : [interpolation]);
  flattenStyleList.forEach((originStyle) => {
    const style = typeof originStyle === "string" && !root ? {} : originStyle;
    if (typeof style === "string") {
      styleStr += `${style}
`;
    } else if (style._keyframe) {
      parseKeyframes(style);
    } else {
      const mergedStyle = transformers.reduce((prev, trans) => {
        var _a;
        return ((_a = trans === null || trans === void 0 ? void 0 : trans.visit) === null || _a === void 0 ? void 0 : _a.call(trans, prev)) || prev;
      }, style);
      Object.keys(mergedStyle).forEach((key) => {
        var _a;
        const value = mergedStyle[key];
        if (typeof value === "object" && value && (key !== "animationName" || !value._keyframe) && !isCompoundCSSProperty(value)) {
          let subInjectHash = false;
          let mergedKey = key.trim();
          let nextRoot = false;
          if ((root || injectHash) && hashId) {
            if (mergedKey.startsWith("@")) {
              subInjectHash = true;
            } else {
              mergedKey = injectSelectorHash(key, hashId, hashPriority);
            }
          } else if (root && !hashId && (mergedKey === "&" || mergedKey === "")) {
            mergedKey = "";
            nextRoot = true;
          }
          const [parsedStr, childEffectStyle] = parseStyle(value, config, {
            root: nextRoot,
            injectHash: subInjectHash,
            parentSelectors: [...parentSelectors, mergedKey]
          });
          effectStyle = _extends(_extends({}, effectStyle), childEffectStyle);
          styleStr += `${mergedKey}${parsedStr}`;
        } else {
          let appendStyle = function(cssKey, cssValue) {
            const styleName = cssKey.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
            let formatValue = cssValue;
            if (!unitlessKeys[cssKey] && typeof formatValue === "number" && formatValue !== 0) {
              formatValue = `${formatValue}px`;
            }
            if (cssKey === "animationName" && (cssValue === null || cssValue === void 0 ? void 0 : cssValue._keyframe)) {
              parseKeyframes(cssValue);
              formatValue = cssValue.getName(hashId);
            }
            styleStr += `${styleName}:${formatValue};`;
          };
          const actualValue = (_a = value === null || value === void 0 ? void 0 : value.value) !== null && _a !== void 0 ? _a : value;
          if (typeof value === "object" && (value === null || value === void 0 ? void 0 : value[MULTI_VALUE]) && Array.isArray(actualValue)) {
            actualValue.forEach((item) => {
              appendStyle(key, item);
            });
          } else {
            appendStyle(key, actualValue);
          }
        }
      });
    }
  });
  if (!root) {
    styleStr = `{${styleStr}}`;
  } else if (layer && supportLayer()) {
    const layerCells = layer.split(",");
    const layerName = layerCells[layerCells.length - 1].trim();
    styleStr = `@layer ${layerName} {${styleStr}}`;
    if (layerCells.length > 1) {
      styleStr = `@layer ${layer}{%%%:%}${styleStr}`;
    }
  }
  return [styleStr, effectStyle];
};
function uniqueHash(path, styleStr) {
  return murmur2(`${path.join("%")}${styleStr}`);
}
function useStyleRegister(info, styleFn) {
  const styleContext = useStyleInject();
  const tokenKey = computed(() => info.value.token._tokenKey);
  const fullPath = computed(() => [tokenKey.value, ...info.value.path]);
  useClientCache(
    "style",
    fullPath,
    // Create cache if needed
    () => {
      const {
        path,
        hashId,
        layer,
        nonce,
        clientOnly,
        order = 0
      } = info.value;
      const cachePath = fullPath.value.join("|");
      if (existPath(cachePath)) {
        const [inlineCacheStyleStr, styleHash] = getStyleAndHash(cachePath);
        if (inlineCacheStyleStr) {
          return [inlineCacheStyleStr, tokenKey.value, styleHash, {}, clientOnly, order];
        }
      }
      const styleObj = styleFn();
      const {
        hashPriority,
        container,
        transformers,
        linters,
        cache
      } = styleContext.value;
      const [parsedStyle, effectStyle] = parseStyle(styleObj, {
        hashId,
        hashPriority,
        layer,
        path: path.join("-"),
        transformers,
        linters
      });
      const styleStr = normalizeStyle(parsedStyle);
      const styleId = uniqueHash(fullPath.value, styleStr);
      return [styleStr, tokenKey.value, styleId, effectStyle, clientOnly, order];
    },
    // Remove cache if no need
    (_ref, fromHMR) => {
      let [, , styleId] = _ref;
      if ((fromHMR || styleContext.value.autoClear) && isClientSide) {
        removeCSS(styleId, {
          mark: ATTR_MARK
        });
      }
    }
  );
  return (node) => {
    return node;
  };
}
class Keyframe {
  constructor(name, style) {
    this._keyframe = true;
    this.name = name;
    this.style = style;
  }
  getName() {
    let hashId = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    return hashId ? `${hashId}-${this.name}` : this.name;
  }
}
const Keyframes = Keyframe;
const version = "4.0.3";
const PresetColors = ["blue", "purple", "cyan", "green", "magenta", "pink", "red", "orange", "yellow", "volcano", "geekblue", "lime", "gold"];
const genControlHeight = (token) => {
  const {
    controlHeight
  } = token;
  return {
    controlHeightSM: controlHeight * 0.75,
    controlHeightXS: controlHeight * 0.5,
    controlHeightLG: controlHeight * 1.25
  };
};
const genControlHeight$1 = genControlHeight;
function genSizeMapToken(token) {
  const {
    sizeUnit,
    sizeStep
  } = token;
  return {
    sizeXXL: sizeUnit * (sizeStep + 8),
    sizeXL: sizeUnit * (sizeStep + 4),
    sizeLG: sizeUnit * (sizeStep + 2),
    sizeMD: sizeUnit * (sizeStep + 1),
    sizeMS: sizeUnit * sizeStep,
    size: sizeUnit * sizeStep,
    sizeSM: sizeUnit * (sizeStep - 1),
    sizeXS: sizeUnit * (sizeStep - 2),
    sizeXXS: sizeUnit * (sizeStep - 3)
    // 4
  };
}
const defaultPresetColors = {
  blue: "#1677ff",
  purple: "#722ED1",
  cyan: "#13C2C2",
  green: "#52C41A",
  magenta: "#EB2F96",
  pink: "#eb2f96",
  red: "#F5222D",
  orange: "#FA8C16",
  yellow: "#FADB14",
  volcano: "#FA541C",
  geekblue: "#2F54EB",
  gold: "#FAAD14",
  lime: "#A0D911"
};
const seedToken = _extends(_extends({}, defaultPresetColors), {
  // Color
  colorPrimary: "#1677ff",
  colorSuccess: "#52c41a",
  colorWarning: "#faad14",
  colorError: "#ff4d4f",
  colorInfo: "#1677ff",
  colorTextBase: "",
  colorBgBase: "",
  // Font
  fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
'Noto Color Emoji'`,
  fontSize: 14,
  // Line
  lineWidth: 1,
  lineType: "solid",
  // Motion
  motionUnit: 0.1,
  motionBase: 0,
  motionEaseOutCirc: "cubic-bezier(0.08, 0.82, 0.17, 1)",
  motionEaseInOutCirc: "cubic-bezier(0.78, 0.14, 0.15, 0.86)",
  motionEaseOut: "cubic-bezier(0.215, 0.61, 0.355, 1)",
  motionEaseInOut: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  motionEaseOutBack: "cubic-bezier(0.12, 0.4, 0.29, 1.46)",
  motionEaseInBack: "cubic-bezier(0.71, -0.46, 0.88, 0.6)",
  motionEaseInQuint: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
  motionEaseOutQuint: "cubic-bezier(0.23, 1, 0.32, 1)",
  // Radius
  borderRadius: 6,
  // Size
  sizeUnit: 4,
  sizeStep: 4,
  sizePopupArrow: 16,
  // Control Base
  controlHeight: 32,
  // zIndex
  zIndexBase: 0,
  zIndexPopupBase: 1e3,
  // Image
  opacityImage: 1,
  // Wireframe
  wireframe: false
});
const defaultSeedToken = seedToken;
function genColorMapToken(seed, _ref) {
  let {
    generateColorPalettes: generateColorPalettes2,
    generateNeutralColorPalettes: generateNeutralColorPalettes2
  } = _ref;
  const {
    colorSuccess: colorSuccessBase,
    colorWarning: colorWarningBase,
    colorError: colorErrorBase,
    colorInfo: colorInfoBase,
    colorPrimary: colorPrimaryBase,
    colorBgBase,
    colorTextBase
  } = seed;
  const primaryColors = generateColorPalettes2(colorPrimaryBase);
  const successColors = generateColorPalettes2(colorSuccessBase);
  const warningColors = generateColorPalettes2(colorWarningBase);
  const errorColors = generateColorPalettes2(colorErrorBase);
  const infoColors = generateColorPalettes2(colorInfoBase);
  const neutralColors = generateNeutralColorPalettes2(colorBgBase, colorTextBase);
  return _extends(_extends({}, neutralColors), {
    colorPrimaryBg: primaryColors[1],
    colorPrimaryBgHover: primaryColors[2],
    colorPrimaryBorder: primaryColors[3],
    colorPrimaryBorderHover: primaryColors[4],
    colorPrimaryHover: primaryColors[5],
    colorPrimary: primaryColors[6],
    colorPrimaryActive: primaryColors[7],
    colorPrimaryTextHover: primaryColors[8],
    colorPrimaryText: primaryColors[9],
    colorPrimaryTextActive: primaryColors[10],
    colorSuccessBg: successColors[1],
    colorSuccessBgHover: successColors[2],
    colorSuccessBorder: successColors[3],
    colorSuccessBorderHover: successColors[4],
    colorSuccessHover: successColors[4],
    colorSuccess: successColors[6],
    colorSuccessActive: successColors[7],
    colorSuccessTextHover: successColors[8],
    colorSuccessText: successColors[9],
    colorSuccessTextActive: successColors[10],
    colorErrorBg: errorColors[1],
    colorErrorBgHover: errorColors[2],
    colorErrorBorder: errorColors[3],
    colorErrorBorderHover: errorColors[4],
    colorErrorHover: errorColors[5],
    colorError: errorColors[6],
    colorErrorActive: errorColors[7],
    colorErrorTextHover: errorColors[8],
    colorErrorText: errorColors[9],
    colorErrorTextActive: errorColors[10],
    colorWarningBg: warningColors[1],
    colorWarningBgHover: warningColors[2],
    colorWarningBorder: warningColors[3],
    colorWarningBorderHover: warningColors[4],
    colorWarningHover: warningColors[4],
    colorWarning: warningColors[6],
    colorWarningActive: warningColors[7],
    colorWarningTextHover: warningColors[8],
    colorWarningText: warningColors[9],
    colorWarningTextActive: warningColors[10],
    colorInfoBg: infoColors[1],
    colorInfoBgHover: infoColors[2],
    colorInfoBorder: infoColors[3],
    colorInfoBorderHover: infoColors[4],
    colorInfoHover: infoColors[4],
    colorInfo: infoColors[6],
    colorInfoActive: infoColors[7],
    colorInfoTextHover: infoColors[8],
    colorInfoText: infoColors[9],
    colorInfoTextActive: infoColors[10],
    colorBgMask: new TinyColor("#000").setAlpha(0.45).toRgbString(),
    colorWhite: "#fff"
  });
}
const genRadius = (radiusBase) => {
  let radiusLG = radiusBase;
  let radiusSM = radiusBase;
  let radiusXS = radiusBase;
  let radiusOuter = radiusBase;
  if (radiusBase < 6 && radiusBase >= 5) {
    radiusLG = radiusBase + 1;
  } else if (radiusBase < 16 && radiusBase >= 6) {
    radiusLG = radiusBase + 2;
  } else if (radiusBase >= 16) {
    radiusLG = 16;
  }
  if (radiusBase < 7 && radiusBase >= 5) {
    radiusSM = 4;
  } else if (radiusBase < 8 && radiusBase >= 7) {
    radiusSM = 5;
  } else if (radiusBase < 14 && radiusBase >= 8) {
    radiusSM = 6;
  } else if (radiusBase < 16 && radiusBase >= 14) {
    radiusSM = 7;
  } else if (radiusBase >= 16) {
    radiusSM = 8;
  }
  if (radiusBase < 6 && radiusBase >= 2) {
    radiusXS = 1;
  } else if (radiusBase >= 6) {
    radiusXS = 2;
  }
  if (radiusBase > 4 && radiusBase < 8) {
    radiusOuter = 4;
  } else if (radiusBase >= 8) {
    radiusOuter = 6;
  }
  return {
    borderRadius: radiusBase > 16 ? 16 : radiusBase,
    borderRadiusXS: radiusXS,
    borderRadiusSM: radiusSM,
    borderRadiusLG: radiusLG,
    borderRadiusOuter: radiusOuter
  };
};
const genRadius$1 = genRadius;
function genCommonMapToken(token) {
  const {
    motionUnit,
    motionBase,
    borderRadius,
    lineWidth
  } = token;
  return _extends({
    // motion
    motionDurationFast: `${(motionBase + motionUnit).toFixed(1)}s`,
    motionDurationMid: `${(motionBase + motionUnit * 2).toFixed(1)}s`,
    motionDurationSlow: `${(motionBase + motionUnit * 3).toFixed(1)}s`,
    // line
    lineWidthBold: lineWidth + 1
  }, genRadius$1(borderRadius));
}
const getAlphaColor$1 = (baseColor, alpha) => new TinyColor(baseColor).setAlpha(alpha).toRgbString();
const getSolidColor = (baseColor, brightness) => {
  const instance = new TinyColor(baseColor);
  return instance.darken(brightness).toHexString();
};
const generateColorPalettes = (baseColor) => {
  const colors = generate$1(baseColor);
  return {
    1: colors[0],
    2: colors[1],
    3: colors[2],
    4: colors[3],
    5: colors[4],
    6: colors[5],
    7: colors[6],
    8: colors[4],
    9: colors[5],
    10: colors[6]
    // 8: colors[7],
    // 9: colors[8],
    // 10: colors[9],
  };
};
const generateNeutralColorPalettes = (bgBaseColor, textBaseColor) => {
  const colorBgBase = bgBaseColor || "#fff";
  const colorTextBase = textBaseColor || "#000";
  return {
    colorBgBase,
    colorTextBase,
    colorText: getAlphaColor$1(colorTextBase, 0.88),
    colorTextSecondary: getAlphaColor$1(colorTextBase, 0.65),
    colorTextTertiary: getAlphaColor$1(colorTextBase, 0.45),
    colorTextQuaternary: getAlphaColor$1(colorTextBase, 0.25),
    colorFill: getAlphaColor$1(colorTextBase, 0.15),
    colorFillSecondary: getAlphaColor$1(colorTextBase, 0.06),
    colorFillTertiary: getAlphaColor$1(colorTextBase, 0.04),
    colorFillQuaternary: getAlphaColor$1(colorTextBase, 0.02),
    colorBgLayout: getSolidColor(colorBgBase, 4),
    colorBgContainer: getSolidColor(colorBgBase, 0),
    colorBgElevated: getSolidColor(colorBgBase, 0),
    colorBgSpotlight: getAlphaColor$1(colorTextBase, 0.85),
    colorBorder: getSolidColor(colorBgBase, 15),
    colorBorderSecondary: getSolidColor(colorBgBase, 6)
  };
};
function getFontSizes(base) {
  const fontSizes = new Array(10).fill(null).map((_, index) => {
    const i = index - 1;
    const baseSize = base * Math.pow(2.71828, i / 5);
    const intSize = index > 1 ? Math.floor(baseSize) : Math.ceil(baseSize);
    return Math.floor(intSize / 2) * 2;
  });
  fontSizes[1] = base;
  return fontSizes.map((size) => {
    const height = size + 8;
    return {
      size,
      lineHeight: height / size
    };
  });
}
const genFontMapToken = (fontSize) => {
  const fontSizePairs = getFontSizes(fontSize);
  const fontSizes = fontSizePairs.map((pair) => pair.size);
  const lineHeights = fontSizePairs.map((pair) => pair.lineHeight);
  return {
    fontSizeSM: fontSizes[0],
    fontSize: fontSizes[1],
    fontSizeLG: fontSizes[2],
    fontSizeXL: fontSizes[3],
    fontSizeHeading1: fontSizes[6],
    fontSizeHeading2: fontSizes[5],
    fontSizeHeading3: fontSizes[4],
    fontSizeHeading4: fontSizes[3],
    fontSizeHeading5: fontSizes[2],
    lineHeight: lineHeights[1],
    lineHeightLG: lineHeights[2],
    lineHeightSM: lineHeights[0],
    lineHeightHeading1: lineHeights[6],
    lineHeightHeading2: lineHeights[5],
    lineHeightHeading3: lineHeights[4],
    lineHeightHeading4: lineHeights[3],
    lineHeightHeading5: lineHeights[2]
  };
};
const genFontMapToken$1 = genFontMapToken;
function derivative(token) {
  const colorPalettes = Object.keys(defaultPresetColors).map((colorKey) => {
    const colors = generate$1(token[colorKey]);
    return new Array(10).fill(1).reduce((prev, _, i) => {
      prev[`${colorKey}-${i + 1}`] = colors[i];
      return prev;
    }, {});
  }).reduce((prev, cur) => {
    prev = _extends(_extends({}, prev), cur);
    return prev;
  }, {});
  return _extends(_extends(_extends(_extends(_extends(_extends(_extends({}, token), colorPalettes), genColorMapToken(token, {
    generateColorPalettes,
    generateNeutralColorPalettes
  })), genFontMapToken$1(token.fontSize)), genSizeMapToken(token)), genControlHeight$1(token)), genCommonMapToken(token));
}
function isStableColor(color) {
  return color >= 0 && color <= 255;
}
function getAlphaColor(frontColor, backgroundColor) {
  const {
    r: fR,
    g: fG,
    b: fB,
    a: originAlpha
  } = new TinyColor(frontColor).toRgb();
  if (originAlpha < 1) {
    return frontColor;
  }
  const {
    r: bR,
    g: bG,
    b: bB
  } = new TinyColor(backgroundColor).toRgb();
  for (let fA = 0.01; fA <= 1; fA += 0.01) {
    const r = Math.round((fR - bR * (1 - fA)) / fA);
    const g = Math.round((fG - bG * (1 - fA)) / fA);
    const b = Math.round((fB - bB * (1 - fA)) / fA);
    if (isStableColor(r) && isStableColor(g) && isStableColor(b)) {
      return new TinyColor({
        r,
        g,
        b,
        a: Math.round(fA * 100) / 100
      }).toRgbString();
    }
  }
  return new TinyColor({
    r: fR,
    g: fG,
    b: fB,
    a: 1
  }).toRgbString();
}
var __rest$7 = globalThis && globalThis.__rest || function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
function formatToken(derivativeToken) {
  const {
    override
  } = derivativeToken, restToken = __rest$7(derivativeToken, ["override"]);
  const overrideTokens = _extends({}, override);
  Object.keys(defaultSeedToken).forEach((token) => {
    delete overrideTokens[token];
  });
  const mergedToken = _extends(_extends({}, restToken), overrideTokens);
  const screenXS = 480;
  const screenSM = 576;
  const screenMD = 768;
  const screenLG = 992;
  const screenXL = 1200;
  const screenXXL = 1600;
  const screenXXXL = 2e3;
  const aliasToken = _extends(_extends(_extends({}, mergedToken), {
    colorLink: mergedToken.colorInfoText,
    colorLinkHover: mergedToken.colorInfoHover,
    colorLinkActive: mergedToken.colorInfoActive,
    // ============== Background ============== //
    colorFillContent: mergedToken.colorFillSecondary,
    colorFillContentHover: mergedToken.colorFill,
    colorFillAlter: mergedToken.colorFillQuaternary,
    colorBgContainerDisabled: mergedToken.colorFillTertiary,
    // ============== Split ============== //
    colorBorderBg: mergedToken.colorBgContainer,
    colorSplit: getAlphaColor(mergedToken.colorBorderSecondary, mergedToken.colorBgContainer),
    // ============== Text ============== //
    colorTextPlaceholder: mergedToken.colorTextQuaternary,
    colorTextDisabled: mergedToken.colorTextQuaternary,
    colorTextHeading: mergedToken.colorText,
    colorTextLabel: mergedToken.colorTextSecondary,
    colorTextDescription: mergedToken.colorTextTertiary,
    colorTextLightSolid: mergedToken.colorWhite,
    colorHighlight: mergedToken.colorError,
    colorBgTextHover: mergedToken.colorFillSecondary,
    colorBgTextActive: mergedToken.colorFill,
    colorIcon: mergedToken.colorTextTertiary,
    colorIconHover: mergedToken.colorText,
    colorErrorOutline: getAlphaColor(mergedToken.colorErrorBg, mergedToken.colorBgContainer),
    colorWarningOutline: getAlphaColor(mergedToken.colorWarningBg, mergedToken.colorBgContainer),
    // Font
    fontSizeIcon: mergedToken.fontSizeSM,
    // Control
    lineWidth: mergedToken.lineWidth,
    controlOutlineWidth: mergedToken.lineWidth * 2,
    // Checkbox size and expand icon size
    controlInteractiveSize: mergedToken.controlHeight / 2,
    controlItemBgHover: mergedToken.colorFillTertiary,
    controlItemBgActive: mergedToken.colorPrimaryBg,
    controlItemBgActiveHover: mergedToken.colorPrimaryBgHover,
    controlItemBgActiveDisabled: mergedToken.colorFill,
    controlTmpOutline: mergedToken.colorFillQuaternary,
    controlOutline: getAlphaColor(mergedToken.colorPrimaryBg, mergedToken.colorBgContainer),
    lineType: mergedToken.lineType,
    borderRadius: mergedToken.borderRadius,
    borderRadiusXS: mergedToken.borderRadiusXS,
    borderRadiusSM: mergedToken.borderRadiusSM,
    borderRadiusLG: mergedToken.borderRadiusLG,
    fontWeightStrong: 600,
    opacityLoading: 0.65,
    linkDecoration: "none",
    linkHoverDecoration: "none",
    linkFocusDecoration: "none",
    controlPaddingHorizontal: 12,
    controlPaddingHorizontalSM: 8,
    paddingXXS: mergedToken.sizeXXS,
    paddingXS: mergedToken.sizeXS,
    paddingSM: mergedToken.sizeSM,
    padding: mergedToken.size,
    paddingMD: mergedToken.sizeMD,
    paddingLG: mergedToken.sizeLG,
    paddingXL: mergedToken.sizeXL,
    paddingContentHorizontalLG: mergedToken.sizeLG,
    paddingContentVerticalLG: mergedToken.sizeMS,
    paddingContentHorizontal: mergedToken.sizeMS,
    paddingContentVertical: mergedToken.sizeSM,
    paddingContentHorizontalSM: mergedToken.size,
    paddingContentVerticalSM: mergedToken.sizeXS,
    marginXXS: mergedToken.sizeXXS,
    marginXS: mergedToken.sizeXS,
    marginSM: mergedToken.sizeSM,
    margin: mergedToken.size,
    marginMD: mergedToken.sizeMD,
    marginLG: mergedToken.sizeLG,
    marginXL: mergedToken.sizeXL,
    marginXXL: mergedToken.sizeXXL,
    boxShadow: `
      0 1px 2px 0 rgba(0, 0, 0, 0.03),
      0 1px 6px -1px rgba(0, 0, 0, 0.02),
      0 2px 4px 0 rgba(0, 0, 0, 0.02)
    `,
    boxShadowSecondary: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowTertiary: `
      0 1px 2px 0 rgba(0, 0, 0, 0.03),
      0 1px 6px -1px rgba(0, 0, 0, 0.02),
      0 2px 4px 0 rgba(0, 0, 0, 0.02)
    `,
    screenXS,
    screenXSMin: screenXS,
    screenXSMax: screenSM - 1,
    screenSM,
    screenSMMin: screenSM,
    screenSMMax: screenMD - 1,
    screenMD,
    screenMDMin: screenMD,
    screenMDMax: screenLG - 1,
    screenLG,
    screenLGMin: screenLG,
    screenLGMax: screenXL - 1,
    screenXL,
    screenXLMin: screenXL,
    screenXLMax: screenXXL - 1,
    screenXXL,
    screenXXLMin: screenXXL,
    screenXXLMax: screenXXXL - 1,
    screenXXXL,
    screenXXXLMin: screenXXXL,
    // FIXME: component box-shadow, should be removed
    boxShadowPopoverArrow: "3px 3px 7px rgba(0, 0, 0, 0.1)",
    boxShadowCard: `
      0 1px 2px -2px ${new TinyColor("rgba(0, 0, 0, 0.16)").toRgbString()},
      0 3px 6px 0 ${new TinyColor("rgba(0, 0, 0, 0.12)").toRgbString()},
      0 5px 12px 4px ${new TinyColor("rgba(0, 0, 0, 0.09)").toRgbString()}
    `,
    boxShadowDrawerRight: `
      -6px 0 16px 0 rgba(0, 0, 0, 0.08),
      -3px 0 6px -4px rgba(0, 0, 0, 0.12),
      -9px 0 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowDrawerLeft: `
      6px 0 16px 0 rgba(0, 0, 0, 0.08),
      3px 0 6px -4px rgba(0, 0, 0, 0.12),
      9px 0 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowDrawerUp: `
      0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12),
      0 9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowDrawerDown: `
      0 -6px 16px 0 rgba(0, 0, 0, 0.08),
      0 -3px 6px -4px rgba(0, 0, 0, 0.12),
      0 -9px 28px 8px rgba(0, 0, 0, 0.05)
    `,
    boxShadowTabsOverflowLeft: "inset 10px 0 8px -8px rgba(0, 0, 0, 0.08)",
    boxShadowTabsOverflowRight: "inset -10px 0 8px -8px rgba(0, 0, 0, 0.08)",
    boxShadowTabsOverflowTop: "inset 0 10px 8px -8px rgba(0, 0, 0, 0.08)",
    boxShadowTabsOverflowBottom: "inset 0 -10px 8px -8px rgba(0, 0, 0, 0.08)"
  }), overrideTokens);
  return aliasToken;
}
const roundedArrow = (width, innerRadius, outerRadius, bgColor, boxShadow) => {
  const unitWidth = width / 2;
  const ax = 0;
  const ay = unitWidth;
  const bx = outerRadius * 1 / Math.sqrt(2);
  const by = unitWidth - outerRadius * (1 - 1 / Math.sqrt(2));
  const cx = unitWidth - innerRadius * (1 / Math.sqrt(2));
  const cy = outerRadius * (Math.sqrt(2) - 1) + innerRadius * (1 / Math.sqrt(2));
  const dx = 2 * unitWidth - cx;
  const dy = cy;
  const ex = 2 * unitWidth - bx;
  const ey = by;
  const fx = 2 * unitWidth - ax;
  const fy = ay;
  const shadowWidth = unitWidth * Math.sqrt(2) + outerRadius * (Math.sqrt(2) - 2);
  const polygonOffset = outerRadius * (Math.sqrt(2) - 1);
  return {
    pointerEvents: "none",
    width,
    height: width,
    overflow: "hidden",
    "&::after": {
      content: '""',
      position: "absolute",
      width: shadowWidth,
      height: shadowWidth,
      bottom: 0,
      insetInline: 0,
      margin: "auto",
      borderRadius: {
        _skip_check_: true,
        value: `0 0 ${innerRadius}px 0`
      },
      transform: "translateY(50%) rotate(-135deg)",
      boxShadow,
      zIndex: 0,
      background: "transparent"
    },
    "&::before": {
      position: "absolute",
      bottom: 0,
      insetInlineStart: 0,
      width,
      height: width / 2,
      background: bgColor,
      clipPath: {
        _multi_value_: true,
        value: [`polygon(${polygonOffset}px 100%, 50% ${polygonOffset}px, ${2 * unitWidth - polygonOffset}px 100%, ${polygonOffset}px 100%)`, `path('M ${ax} ${ay} A ${outerRadius} ${outerRadius} 0 0 0 ${bx} ${by} L ${cx} ${cy} A ${innerRadius} ${innerRadius} 0 0 1 ${dx} ${dy} L ${ex} ${ey} A ${outerRadius} ${outerRadius} 0 0 0 ${fx} ${fy} Z')`]
      },
      content: '""'
    }
  };
};
function genPresetColor(token, genCss) {
  return PresetColors.reduce((prev, colorKey) => {
    const lightColor = token[`${colorKey}-1`];
    const lightBorderColor = token[`${colorKey}-3`];
    const darkColor = token[`${colorKey}-6`];
    const textColor = token[`${colorKey}-7`];
    return _extends(_extends({}, prev), genCss(colorKey, {
      lightColor,
      lightBorderColor,
      darkColor,
      textColor
    }));
  }, {});
}
const textEllipsis = {
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis"
};
const resetComponent = (token) => ({
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
  color: token.colorText,
  fontSize: token.fontSize,
  // font-variant: @font-variant-base;
  lineHeight: token.lineHeight,
  listStyle: "none",
  // font-feature-settings: @font-feature-settings-base;
  fontFamily: token.fontFamily
});
const resetIcon = () => ({
  display: "inline-flex",
  alignItems: "center",
  color: "inherit",
  fontStyle: "normal",
  lineHeight: 0,
  textAlign: "center",
  textTransform: "none",
  // for SVG icon, see https://blog.prototypr.io/align-svg-icons-to-text-and-say-goodbye-to-font-icons-d44b3d7b26b4
  verticalAlign: "-0.125em",
  textRendering: "optimizeLegibility",
  "-webkit-font-smoothing": "antialiased",
  "-moz-osx-font-smoothing": "grayscale",
  "> *": {
    lineHeight: 1
  },
  svg: {
    display: "inline-block"
  }
});
const clearFix = () => ({
  // https://github.com/ant-design/ant-design/issues/21301#issuecomment-583955229
  "&::before": {
    display: "table",
    content: '""'
  },
  "&::after": {
    // https://github.com/ant-design/ant-design/issues/21864
    display: "table",
    clear: "both",
    content: '""'
  }
});
const genLinkStyle = (token) => ({
  a: {
    color: token.colorLink,
    textDecoration: token.linkDecoration,
    backgroundColor: "transparent",
    outline: "none",
    cursor: "pointer",
    transition: `color ${token.motionDurationSlow}`,
    "-webkit-text-decoration-skip": "objects",
    "&:hover": {
      color: token.colorLinkHover
    },
    "&:active": {
      color: token.colorLinkActive
    },
    [`&:active,
  &:hover`]: {
      textDecoration: token.linkHoverDecoration,
      outline: 0
    },
    // https://github.com/ant-design/ant-design/issues/22503
    "&:focus": {
      textDecoration: token.linkFocusDecoration,
      outline: 0
    },
    "&[disabled]": {
      color: token.colorTextDisabled,
      cursor: "not-allowed"
    }
  }
});
const genCommonStyle = (token, componentPrefixCls) => {
  const {
    fontFamily,
    fontSize
  } = token;
  const rootPrefixSelector = `[class^="${componentPrefixCls}"], [class*=" ${componentPrefixCls}"]`;
  return {
    [rootPrefixSelector]: {
      fontFamily,
      fontSize,
      boxSizing: "border-box",
      "&::before, &::after": {
        boxSizing: "border-box"
      },
      [rootPrefixSelector]: {
        boxSizing: "border-box",
        "&::before, &::after": {
          boxSizing: "border-box"
        }
      }
    }
  };
};
const genFocusOutline = (token) => ({
  outline: `${token.lineWidthBold}px solid ${token.colorPrimaryBorder}`,
  outlineOffset: 1,
  transition: "outline-offset 0s, outline 0s"
});
const genFocusStyle = (token) => ({
  "&:focus-visible": _extends({}, genFocusOutline(token))
});
function genComponentStyleHook(component, styleFn, getDefaultToken) {
  return (_prefixCls) => {
    const prefixCls = computed(() => _prefixCls === null || _prefixCls === void 0 ? void 0 : _prefixCls.value);
    const [theme, token, hashId] = useToken();
    const {
      getPrefixCls,
      iconPrefixCls
    } = useConfigContextInject();
    const rootPrefixCls = computed(() => getPrefixCls());
    const sharedInfo = computed(() => {
      return {
        theme: theme.value,
        token: token.value,
        hashId: hashId.value,
        path: ["Shared", rootPrefixCls.value]
      };
    });
    useStyleRegister(sharedInfo, () => [{
      // Link
      "&": genLinkStyle(token.value)
    }]);
    const componentInfo = computed(() => {
      return {
        theme: theme.value,
        token: token.value,
        hashId: hashId.value,
        path: [component, prefixCls.value, iconPrefixCls.value]
      };
    });
    return [useStyleRegister(componentInfo, () => {
      const {
        token: proxyToken,
        flush
      } = statisticToken(token.value);
      const defaultComponentToken = typeof getDefaultToken === "function" ? getDefaultToken(proxyToken) : getDefaultToken;
      const mergedComponentToken = _extends(_extends({}, defaultComponentToken), token.value[component]);
      const componentCls = `.${prefixCls.value}`;
      const mergedToken = merge(proxyToken, {
        componentCls,
        prefixCls: prefixCls.value,
        iconCls: `.${iconPrefixCls.value}`,
        antCls: `.${rootPrefixCls.value}`
      }, mergedComponentToken);
      const styleInterpolation = styleFn(mergedToken, {
        hashId: hashId.value,
        prefixCls: prefixCls.value,
        rootPrefixCls: rootPrefixCls.value,
        iconPrefixCls: iconPrefixCls.value,
        overrideComponentToken: token.value[component]
      });
      flush(component, mergedComponentToken);
      return [genCommonStyle(token.value, prefixCls.value), styleInterpolation];
    }), hashId];
  };
}
const enableStatistic = typeof CSSINJS_STATISTIC !== "undefined";
let recording = true;
function merge() {
  for (var _len = arguments.length, objs = new Array(_len), _key = 0; _key < _len; _key++) {
    objs[_key] = arguments[_key];
  }
  if (!enableStatistic) {
    return _extends({}, ...objs);
  }
  recording = false;
  const ret = {};
  objs.forEach((obj) => {
    const keys = Object.keys(obj);
    keys.forEach((key) => {
      Object.defineProperty(ret, key, {
        configurable: true,
        enumerable: true,
        get: () => obj[key]
      });
    });
  });
  recording = true;
  return ret;
}
function noop$2() {
}
function statisticToken(token) {
  let tokenKeys2;
  let proxy = token;
  let flush = noop$2;
  if (enableStatistic) {
    tokenKeys2 = /* @__PURE__ */ new Set();
    proxy = new Proxy(token, {
      get(obj, prop) {
        if (recording) {
          tokenKeys2.add(prop);
        }
        return obj[prop];
      }
    });
    flush = (componentName, componentToken) => {
      ({
        global: Array.from(tokenKeys2),
        component: componentToken
      });
    };
  }
  return {
    token: proxy,
    keys: tokenKeys2,
    flush
  };
}
const defaultTheme = createTheme(derivative);
const defaultConfig = {
  token: defaultSeedToken,
  hashed: true
};
const DesignTokenContextKey = Symbol("DesignTokenContext");
const globalDesignTokenApi = ref();
function useToken() {
  const designTokenContext = inject(DesignTokenContextKey, globalDesignTokenApi.value || defaultConfig);
  const salt = computed(() => `${version}-${designTokenContext.hashed || ""}`);
  const mergedTheme = computed(() => designTokenContext.theme || defaultTheme);
  const cacheToken = useCacheToken(mergedTheme, computed(() => [defaultSeedToken, designTokenContext.token]), computed(() => ({
    salt: salt.value,
    override: _extends({
      override: designTokenContext.token
    }, designTokenContext.components),
    formatToken
  })));
  return [mergedTheme, computed(() => cacheToken.value[0]), computed(() => designTokenContext.hashed ? cacheToken.value[1] : "")];
}
const Empty$1 = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  setup() {
    const [, token] = useToken();
    const themeStyle = computed(() => {
      const bgColor = new TinyColor(token.value.colorBgBase);
      if (bgColor.toHsl().l < 0.5) {
        return {
          opacity: 0.65
        };
      }
      return {};
    });
    return () => createVNode("svg", {
      "style": themeStyle.value,
      "width": "184",
      "height": "152",
      "viewBox": "0 0 184 152",
      "xmlns": "http://www.w3.org/2000/svg"
    }, [createVNode("g", {
      "fill": "none",
      "fill-rule": "evenodd"
    }, [createVNode("g", {
      "transform": "translate(24 31.67)"
    }, [createVNode("ellipse", {
      "fill-opacity": ".8",
      "fill": "#F5F5F7",
      "cx": "67.797",
      "cy": "106.89",
      "rx": "67.797",
      "ry": "12.668"
    }, null), createVNode("path", {
      "d": "M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z",
      "fill": "#AEB8C2"
    }, null), createVNode("path", {
      "d": "M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z",
      "fill": "url(#linearGradient-1)",
      "transform": "translate(13.56)"
    }, null), createVNode("path", {
      "d": "M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z",
      "fill": "#F5F5F7"
    }, null), createVNode("path", {
      "d": "M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z",
      "fill": "#DCE0E6"
    }, null)]), createVNode("path", {
      "d": "M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z",
      "fill": "#DCE0E6"
    }, null), createVNode("g", {
      "transform": "translate(149.65 15.383)",
      "fill": "#FFF"
    }, [createVNode("ellipse", {
      "cx": "20.654",
      "cy": "3.167",
      "rx": "2.849",
      "ry": "2.815"
    }, null), createVNode("path", {
      "d": "M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"
    }, null)])])]);
  }
});
Empty$1.PRESENTED_IMAGE_DEFAULT = true;
const DefaultEmptyImg = Empty$1;
const Simple = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  setup() {
    const [, token] = useToken();
    const color = computed(() => {
      const {
        colorFill,
        colorFillTertiary,
        colorFillQuaternary,
        colorBgContainer
      } = token.value;
      return {
        borderColor: new TinyColor(colorFill).onBackground(colorBgContainer).toHexString(),
        shadowColor: new TinyColor(colorFillTertiary).onBackground(colorBgContainer).toHexString(),
        contentColor: new TinyColor(colorFillQuaternary).onBackground(colorBgContainer).toHexString()
      };
    });
    return () => createVNode("svg", {
      "width": "64",
      "height": "41",
      "viewBox": "0 0 64 41",
      "xmlns": "http://www.w3.org/2000/svg"
    }, [createVNode("g", {
      "transform": "translate(0 1)",
      "fill": "none",
      "fill-rule": "evenodd"
    }, [createVNode("ellipse", {
      "fill": color.value.shadowColor,
      "cx": "32",
      "cy": "33",
      "rx": "32",
      "ry": "7"
    }, null), createVNode("g", {
      "fill-rule": "nonzero",
      "stroke": color.value.borderColor
    }, [createVNode("path", {
      "d": "M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
    }, null), createVNode("path", {
      "d": "M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z",
      "fill": color.value.contentColor
    }, null)])])]);
  }
});
Simple.PRESENTED_IMAGE_SIMPLE = true;
const SimpleEmptyImg = Simple;
const genSharedEmptyStyle = (token) => {
  const {
    componentCls,
    margin,
    marginXS,
    marginXL,
    fontSize,
    lineHeight
  } = token;
  return {
    [componentCls]: {
      marginInline: marginXS,
      fontSize,
      lineHeight,
      textAlign: "center",
      // 原来 &-image 没有父子结构，现在为了外层承担我们的hashId，改成父子结果
      [`${componentCls}-image`]: {
        height: token.emptyImgHeight,
        marginBottom: marginXS,
        opacity: token.opacityImage,
        img: {
          height: "100%"
        },
        svg: {
          height: "100%",
          margin: "auto"
        }
      },
      // 原来 &-footer 没有父子结构，现在为了外层承担我们的hashId，改成父子结果
      [`${componentCls}-footer`]: {
        marginTop: margin
      },
      "&-normal": {
        marginBlock: marginXL,
        color: token.colorTextDisabled,
        [`${componentCls}-image`]: {
          height: token.emptyImgHeightMD
        }
      },
      "&-small": {
        marginBlock: marginXS,
        color: token.colorTextDisabled,
        [`${componentCls}-image`]: {
          height: token.emptyImgHeightSM
        }
      }
    }
  };
};
const useStyle$5 = genComponentStyleHook("Empty", (token) => {
  const {
    componentCls,
    controlHeightLG
  } = token;
  const emptyToken = merge(token, {
    emptyImgCls: `${componentCls}-img`,
    emptyImgHeight: controlHeightLG * 2.5,
    emptyImgHeightMD: controlHeightLG,
    emptyImgHeightSM: controlHeightLG * 0.875
  });
  return [genSharedEmptyStyle(emptyToken)];
});
var __rest$6 = globalThis && globalThis.__rest || function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
const defaultEmptyImg = createVNode(DefaultEmptyImg, null, null);
const simpleEmptyImg = createVNode(SimpleEmptyImg, null, null);
const emptyProps = () => ({
  prefixCls: String,
  imageStyle: objectType(),
  image: anyType(),
  description: anyType()
});
const Empty = /* @__PURE__ */ defineComponent({
  name: "AEmpty",
  compatConfig: {
    MODE: 3
  },
  inheritAttrs: false,
  props: emptyProps(),
  setup(props, _ref) {
    let {
      slots = {},
      attrs
    } = _ref;
    const {
      direction,
      prefixCls: prefixClsRef
    } = useConfigInject("empty", props);
    const [wrapSSR, hashId] = useStyle$5(prefixClsRef);
    return () => {
      var _a, _b;
      const prefixCls = prefixClsRef.value;
      const _c = _extends(_extends({}, props), attrs), {
        image = ((_a = slots.image) === null || _a === void 0 ? void 0 : _a.call(slots)) || defaultEmptyImg,
        description = ((_b = slots.description) === null || _b === void 0 ? void 0 : _b.call(slots)) || void 0,
        imageStyle,
        class: className = ""
      } = _c, restProps = __rest$6(_c, ["image", "description", "imageStyle", "class"]);
      return wrapSSR(createVNode(LocaleReceiver, {
        "componentName": "Empty",
        "children": (locale2) => {
          const des = typeof description !== "undefined" ? description : locale2.description;
          const alt = typeof des === "string" ? des : "empty";
          let imageNode = null;
          if (typeof image === "string") {
            imageNode = createVNode("img", {
              "alt": alt,
              "src": image
            }, null);
          } else {
            imageNode = image;
          }
          return createVNode("div", _objectSpread$9({
            "class": classNames(prefixCls, className, hashId.value, {
              [`${prefixCls}-normal`]: image === simpleEmptyImg,
              [`${prefixCls}-rtl`]: direction.value === "rtl"
            })
          }, restProps), [createVNode("div", {
            "class": `${prefixCls}-image`,
            "style": imageStyle
          }, [imageNode]), des && createVNode("p", {
            "class": `${prefixCls}-description`
          }, [des]), slots.default && createVNode("div", {
            "class": `${prefixCls}-footer`
          }, [filterEmpty(slots.default())])]);
        }
      }, null));
    };
  }
});
Empty.PRESENTED_IMAGE_DEFAULT = defaultEmptyImg;
Empty.PRESENTED_IMAGE_SIMPLE = simpleEmptyImg;
const __nuxt_component_7 = withInstall(Empty);
const DefaultRenderEmpty = (props) => {
  const {
    prefixCls
  } = useConfigInject("empty", props);
  const renderHtml = (componentName) => {
    switch (componentName) {
      case "Table":
      case "List":
        return createVNode(__nuxt_component_7, {
          "image": __nuxt_component_7.PRESENTED_IMAGE_SIMPLE
        }, null);
      case "Select":
      case "TreeSelect":
      case "Cascader":
      case "Transfer":
      case "Mentions":
        return createVNode(__nuxt_component_7, {
          "image": __nuxt_component_7.PRESENTED_IMAGE_SIMPLE,
          "class": `${prefixCls.value}-small`
        }, null);
      default:
        return createVNode(__nuxt_component_7, null, null);
    }
  };
  return renderHtml(props.componentName);
};
const SizeContextKey = Symbol("SizeContextKey");
const useInjectSize = () => {
  return inject(SizeContextKey, ref(void 0));
};
const useConfigInject = (name, props) => {
  const sizeContext = useInjectSize();
  const disabledContext = useInjectDisabled();
  const configProvider = inject(configProviderKey, _extends(_extends({}, defaultConfigProvider), {
    renderEmpty: (name2) => h(DefaultRenderEmpty, {
      componentName: name2
    })
  }));
  const prefixCls = computed(() => configProvider.getPrefixCls(name, props.prefixCls));
  const direction = computed(() => {
    var _a, _b;
    return (_a = props.direction) !== null && _a !== void 0 ? _a : (_b = configProvider.direction) === null || _b === void 0 ? void 0 : _b.value;
  });
  const iconPrefixCls = computed(() => {
    var _a;
    return (_a = props.iconPrefixCls) !== null && _a !== void 0 ? _a : configProvider.iconPrefixCls.value;
  });
  const rootPrefixCls = computed(() => configProvider.getPrefixCls());
  const autoInsertSpaceInButton = computed(() => {
    var _a;
    return (_a = configProvider.autoInsertSpaceInButton) === null || _a === void 0 ? void 0 : _a.value;
  });
  const renderEmpty = configProvider.renderEmpty;
  const space = configProvider.space;
  const pageHeader = configProvider.pageHeader;
  const form = configProvider.form;
  const getTargetContainer = computed(() => {
    var _a, _b;
    return (_a = props.getTargetContainer) !== null && _a !== void 0 ? _a : (_b = configProvider.getTargetContainer) === null || _b === void 0 ? void 0 : _b.value;
  });
  const getPopupContainer = computed(() => {
    var _a, _b;
    return (_a = props.getPopupContainer) !== null && _a !== void 0 ? _a : (_b = configProvider.getPopupContainer) === null || _b === void 0 ? void 0 : _b.value;
  });
  const dropdownMatchSelectWidth = computed(() => {
    var _a, _b;
    return (_a = props.dropdownMatchSelectWidth) !== null && _a !== void 0 ? _a : (_b = configProvider.dropdownMatchSelectWidth) === null || _b === void 0 ? void 0 : _b.value;
  });
  const virtual = computed(() => {
    var _a;
    return (props.virtual === void 0 ? ((_a = configProvider.virtual) === null || _a === void 0 ? void 0 : _a.value) !== false : props.virtual !== false) && dropdownMatchSelectWidth.value !== false;
  });
  const size = computed(() => props.size || sizeContext.value);
  const autocomplete = computed(() => {
    var _a, _b, _c;
    return (_a = props.autocomplete) !== null && _a !== void 0 ? _a : (_c = (_b = configProvider.input) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.autocomplete;
  });
  const disabled = computed(() => {
    var _a;
    return (_a = props.disabled) !== null && _a !== void 0 ? _a : disabledContext.value;
  });
  const csp = computed(() => {
    var _a;
    return (_a = props.csp) !== null && _a !== void 0 ? _a : configProvider.csp;
  });
  return {
    configProvider,
    prefixCls,
    direction,
    size,
    getTargetContainer,
    getPopupContainer,
    space,
    pageHeader,
    form,
    autoInsertSpaceInButton,
    renderEmpty,
    virtual,
    dropdownMatchSelectWidth,
    rootPrefixCls,
    getPrefixCls: configProvider.getPrefixCls,
    autocomplete,
    csp,
    iconPrefixCls,
    disabled,
    select: configProvider.select
  };
};
function omit(obj, fields) {
  const shallowCopy = _extends({}, obj);
  for (let i = 0; i < fields.length; i += 1) {
    const key = fields[i];
    delete shallowCopy[key];
  }
  return shallowCopy;
}
const PropTypes = createTypes({
  func: void 0,
  bool: void 0,
  string: void 0,
  number: void 0,
  array: void 0,
  object: void 0,
  integer: void 0
});
PropTypes.extend([{
  name: "looseBool",
  getter: true,
  type: Boolean,
  default: void 0
}, {
  name: "style",
  getter: true,
  type: [String, Object],
  default: void 0
}, {
  name: "VueNode",
  getter: true,
  type: null
}]);
const PropTypes$1 = PropTypes;
const devWarning = (valid, component, message) => {
  warningOnce(valid, `[ant-design-vue: ${component}] ${message}`);
};
function returnEmptyString() {
  return "";
}
function returnDocument(element) {
  if (element) {
    return element.ownerDocument;
  }
  return window.document;
}
function noop$1() {
}
const triggerProps = () => ({
  action: PropTypes$1.oneOfType([PropTypes$1.string, PropTypes$1.arrayOf(PropTypes$1.string)]).def([]),
  showAction: PropTypes$1.any.def([]),
  hideAction: PropTypes$1.any.def([]),
  getPopupClassNameFromAlign: PropTypes$1.any.def(returnEmptyString),
  onPopupVisibleChange: Function,
  afterPopupVisibleChange: PropTypes$1.func.def(noop$1),
  popup: PropTypes$1.any,
  popupStyle: {
    type: Object,
    default: void 0
  },
  prefixCls: PropTypes$1.string.def("rc-trigger-popup"),
  popupClassName: PropTypes$1.string.def(""),
  popupPlacement: String,
  builtinPlacements: PropTypes$1.object,
  popupTransitionName: String,
  popupAnimation: PropTypes$1.any,
  mouseEnterDelay: PropTypes$1.number.def(0),
  mouseLeaveDelay: PropTypes$1.number.def(0.1),
  zIndex: Number,
  focusDelay: PropTypes$1.number.def(0),
  blurDelay: PropTypes$1.number.def(0.15),
  getPopupContainer: Function,
  getDocument: PropTypes$1.func.def(returnDocument),
  forceRender: {
    type: Boolean,
    default: void 0
  },
  destroyPopupOnHide: {
    type: Boolean,
    default: false
  },
  mask: {
    type: Boolean,
    default: false
  },
  maskClosable: {
    type: Boolean,
    default: true
  },
  // onPopupAlign: PropTypes.func.def(noop),
  popupAlign: PropTypes$1.object.def(() => ({})),
  popupVisible: {
    type: Boolean,
    default: void 0
  },
  defaultPopupVisible: {
    type: Boolean,
    default: false
  },
  maskTransitionName: String,
  maskAnimation: String,
  stretch: String,
  alignPoint: {
    type: Boolean,
    default: void 0
  },
  autoDestroy: {
    type: Boolean,
    default: false
  },
  mobile: Object,
  getTriggerDOMNode: Function
});
const innerProps = {
  visible: Boolean,
  prefixCls: String,
  zIndex: Number,
  destroyPopupOnHide: Boolean,
  forceRender: Boolean,
  // Legacy Motion
  animation: [String, Object],
  transitionName: String,
  // Measure
  stretch: {
    type: String
  },
  // Align
  align: {
    type: Object
  },
  point: {
    type: Object
  },
  getRootDomNode: {
    type: Function
  },
  getClassNameFromAlign: {
    type: Function
  },
  onMouseenter: {
    type: Function
  },
  onMouseleave: {
    type: Function
  },
  onMousedown: {
    type: Function
  },
  onTouchstart: {
    type: Function
  }
};
const mobileProps = _extends(_extends({}, innerProps), {
  mobile: {
    type: Object
  }
});
const popupProps = _extends(_extends({}, innerProps), {
  mask: Boolean,
  mobile: {
    type: Object
  },
  maskAnimation: String,
  maskTransitionName: String
});
function getMotion(_ref) {
  let {
    prefixCls,
    animation,
    transitionName
  } = _ref;
  if (animation) {
    return {
      name: `${prefixCls}-${animation}`
    };
  }
  if (transitionName) {
    return {
      name: transitionName
    };
  }
  return {};
}
function Mask(props) {
  const {
    prefixCls,
    visible,
    zIndex,
    mask,
    maskAnimation,
    maskTransitionName
  } = props;
  if (!mask) {
    return null;
  }
  let motion = {};
  if (maskTransitionName || maskAnimation) {
    motion = getMotion({
      prefixCls,
      transitionName: maskTransitionName,
      animation: maskAnimation
    });
  }
  return createVNode(Transition, _objectSpread$9({
    "appear": true
  }, motion), {
    default: () => [withDirectives(createVNode("div", {
      "style": {
        zIndex
      },
      "class": `${prefixCls}-mask`
    }, null), [[resolveDirective("if"), visible]])]
  });
}
Mask.displayName = "Mask";
const MobilePopupInner = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "MobilePopupInner",
  inheritAttrs: false,
  props: mobileProps,
  emits: ["mouseenter", "mouseleave", "mousedown", "touchstart", "align"],
  setup(props, _ref) {
    let {
      expose,
      slots
    } = _ref;
    const elementRef = ref();
    expose({
      forceAlign: () => {
      },
      getElement: () => elementRef.value
    });
    return () => {
      var _a;
      const {
        zIndex,
        visible,
        prefixCls,
        mobile: {
          popupClassName,
          popupStyle,
          popupMotion = {},
          popupRender
        } = {}
      } = props;
      const mergedStyle = _extends({
        zIndex
      }, popupStyle);
      let childNode = flattenChildren((_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots));
      if (childNode.length > 1) {
        childNode = createVNode("div", {
          "class": `${prefixCls}-content`
        }, [childNode]);
      }
      if (popupRender) {
        childNode = popupRender(childNode);
      }
      const mergedClassName = classNames(prefixCls, popupClassName);
      return createVNode(Transition, _objectSpread$9({
        "ref": elementRef
      }, popupMotion), {
        default: () => [visible ? createVNode("div", {
          "class": mergedClassName,
          "style": mergedStyle
        }, [childNode]) : null]
      });
    };
  }
});
const useVisibleStatus = (visible, doMeasure) => {
  const status = shallowRef(null);
  const rafRef = shallowRef();
  const destroyRef = shallowRef(false);
  function setStatus(nextStatus) {
    if (!destroyRef.value) {
      status.value = nextStatus;
    }
  }
  function cancelRaf() {
    wrapperRaf.cancel(rafRef.value);
  }
  function goNextStatus(callback) {
    cancelRaf();
    rafRef.value = wrapperRaf(() => {
      let newStatus = status.value;
      switch (status.value) {
        case "align":
          newStatus = "motion";
          break;
        case "motion":
          newStatus = "stable";
          break;
      }
      setStatus(newStatus);
      callback === null || callback === void 0 ? void 0 : callback();
    });
  }
  watch(visible, () => {
    setStatus("measure");
  }, {
    immediate: true,
    flush: "post"
  });
  return [status, goNextStatus];
};
const useStretchStyle = (stretch) => {
  const targetSize = shallowRef({
    width: 0,
    height: 0
  });
  function measureStretch(element) {
    targetSize.value = {
      width: element.offsetWidth,
      height: element.offsetHeight
    };
  }
  const style = computed(() => {
    const sizeStyle = {};
    if (stretch.value) {
      const {
        width,
        height
      } = targetSize.value;
      if (stretch.value.indexOf("height") !== -1 && height) {
        sizeStyle.height = `${height}px`;
      } else if (stretch.value.indexOf("minHeight") !== -1 && height) {
        sizeStyle.minHeight = `${height}px`;
      }
      if (stretch.value.indexOf("width") !== -1 && width) {
        sizeStyle.width = `${width}px`;
      } else if (stretch.value.indexOf("minWidth") !== -1 && width) {
        sizeStyle.minWidth = `${width}px`;
      }
    }
    return sizeStyle;
  });
  return [style, measureStretch];
};
function cloneElement(vnode) {
  let nodeProps = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  let override = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
  let mergeRef = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  let ele = vnode;
  if (Array.isArray(vnode)) {
    ele = filterEmpty(vnode)[0];
  }
  if (!ele) {
    return null;
  }
  const node = cloneVNode(ele, nodeProps, mergeRef);
  node.props = override ? _extends(_extends({}, node.props), nodeProps) : node.props;
  warning$1(typeof node.props.class !== "object");
  return node;
}
const isVisible = (element) => {
  if (!element) {
    return false;
  }
  if (element.offsetParent) {
    return true;
  }
  if (element.getBBox) {
    const box = element.getBBox();
    if (box.width || box.height) {
      return true;
    }
  }
  if (element.getBoundingClientRect) {
    const box = element.getBoundingClientRect();
    if (box.width || box.height) {
      return true;
    }
  }
  return false;
};
function isSamePoint(prev, next) {
  if (prev === next)
    return true;
  if (!prev || !next)
    return false;
  if ("pageX" in next && "pageY" in next) {
    return prev.pageX === next.pageX && prev.pageY === next.pageY;
  }
  if ("clientX" in next && "clientY" in next) {
    return prev.clientX === next.clientX && prev.clientY === next.clientY;
  }
  return false;
}
function restoreFocus(activeElement, container) {
  if (activeElement !== document.activeElement && contains(container, activeElement) && typeof activeElement.focus === "function") {
    activeElement.focus();
  }
}
function monitorResize(element, callback) {
  let prevWidth = null;
  let prevHeight = null;
  function onResize(_ref) {
    let [{
      target
    }] = _ref;
    if (!document.documentElement.contains(target))
      return;
    const {
      width,
      height
    } = target.getBoundingClientRect();
    const fixedWidth = Math.floor(width);
    const fixedHeight = Math.floor(height);
    if (prevWidth !== fixedWidth || prevHeight !== fixedHeight) {
      Promise.resolve().then(() => {
        callback({
          width: fixedWidth,
          height: fixedHeight
        });
      });
    }
    prevWidth = fixedWidth;
    prevHeight = fixedHeight;
  }
  const resizeObserver = new ResizeObserver$1(onResize);
  if (element) {
    resizeObserver.observe(element);
  }
  return () => {
    resizeObserver.disconnect();
  };
}
const useBuffer = (callback, buffer) => {
  let called = false;
  let timeout = null;
  function cancelTrigger() {
    clearTimeout(timeout);
  }
  function trigger(force) {
    if (!called || force === true) {
      if (callback() === false) {
        return;
      }
      called = true;
      cancelTrigger();
      timeout = setTimeout(() => {
        called = false;
      }, buffer.value);
    } else {
      cancelTrigger();
      timeout = setTimeout(() => {
        called = false;
        trigger();
      }, buffer.value);
    }
  }
  return [trigger, () => {
    called = false;
    cancelTrigger();
  }];
};
const alignProps = {
  align: Object,
  target: [Object, Function],
  onAlign: Function,
  monitorBufferTime: Number,
  monitorWindowResize: Boolean,
  disabled: Boolean
};
function getElement(func) {
  if (typeof func !== "function")
    return null;
  return func();
}
function getPoint(point) {
  if (typeof point !== "object" || !point)
    return null;
  return point;
}
const Align = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "Align",
  props: alignProps,
  emits: ["align"],
  setup(props, _ref) {
    let {
      expose,
      slots
    } = _ref;
    const cacheRef = ref({});
    const nodeRef = ref();
    const [forceAlign, cancelForceAlign] = useBuffer(() => {
      const {
        disabled: latestDisabled,
        target: latestTarget,
        align: latestAlign,
        onAlign: latestOnAlign
      } = props;
      if (!latestDisabled && latestTarget && nodeRef.value) {
        const source = nodeRef.value;
        let result;
        const element = getElement(latestTarget);
        const point = getPoint(latestTarget);
        cacheRef.value.element = element;
        cacheRef.value.point = point;
        cacheRef.value.align = latestAlign;
        const {
          activeElement
        } = document;
        if (element && isVisible(element)) {
          result = alignElement(source, element, latestAlign);
        } else if (point) {
          result = alignPoint(source, point, latestAlign);
        }
        restoreFocus(activeElement, source);
        if (latestOnAlign && result) {
          latestOnAlign(source, result);
        }
        return true;
      }
      return false;
    }, computed(() => props.monitorBufferTime));
    const resizeMonitor = ref({
      cancel: () => {
      }
    });
    const sourceResizeMonitor = ref({
      cancel: () => {
      }
    });
    const goAlign = () => {
      const target = props.target;
      const element = getElement(target);
      const point = getPoint(target);
      if (nodeRef.value !== sourceResizeMonitor.value.element) {
        sourceResizeMonitor.value.cancel();
        sourceResizeMonitor.value.element = nodeRef.value;
        sourceResizeMonitor.value.cancel = monitorResize(nodeRef.value, forceAlign);
      }
      if (cacheRef.value.element !== element || !isSamePoint(cacheRef.value.point, point) || !isEqual$1(cacheRef.value.align, props.align)) {
        forceAlign();
        if (resizeMonitor.value.element !== element) {
          resizeMonitor.value.cancel();
          resizeMonitor.value.element = element;
          resizeMonitor.value.cancel = monitorResize(element, forceAlign);
        }
      }
    };
    onUpdated(() => {
      nextTick(() => {
        goAlign();
      });
    });
    watch(() => props.disabled, (disabled) => {
      if (!disabled) {
        forceAlign();
      } else {
        cancelForceAlign();
      }
    }, {
      immediate: true,
      flush: "post"
    });
    const winResizeRef = ref(null);
    watch(() => props.monitorWindowResize, (monitorWindowResize) => {
      if (monitorWindowResize) {
        if (!winResizeRef.value) {
          winResizeRef.value = addEventListenerWrap(window, "resize", forceAlign);
        }
      } else if (winResizeRef.value) {
        winResizeRef.value.remove();
        winResizeRef.value = null;
      }
    }, {
      flush: "post"
    });
    onUnmounted(() => {
      resizeMonitor.value.cancel();
      sourceResizeMonitor.value.cancel();
      if (winResizeRef.value)
        winResizeRef.value.remove();
      cancelForceAlign();
    });
    expose({
      forceAlign: () => forceAlign(true)
    });
    return () => {
      const child = slots === null || slots === void 0 ? void 0 : slots.default();
      if (child) {
        return cloneElement(child[0], {
          ref: nodeRef
        }, true, true);
      }
      return null;
    };
  }
});
tuple("bottomLeft", "bottomRight", "topLeft", "topRight");
const getTransitionProps = function(transitionName) {
  let opt = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const transitionProps = transitionName ? _extends({
    name: transitionName,
    appear: true,
    // type: 'animation',
    // appearFromClass: `${transitionName}-appear ${transitionName}-appear-prepare`,
    // appearActiveClass: `antdv-base-transtion`,
    // appearToClass: `${transitionName}-appear ${transitionName}-appear-active`,
    enterFromClass: `${transitionName}-enter ${transitionName}-enter-prepare ${transitionName}-enter-start`,
    enterActiveClass: `${transitionName}-enter ${transitionName}-enter-prepare`,
    enterToClass: `${transitionName}-enter ${transitionName}-enter-active`,
    leaveFromClass: ` ${transitionName}-leave`,
    leaveActiveClass: `${transitionName}-leave ${transitionName}-leave-active`,
    leaveToClass: `${transitionName}-leave ${transitionName}-leave-active`
  }, opt) : _extends({
    css: false
  }, opt);
  return transitionProps;
};
const getTransitionName = (rootPrefixCls, motion, transitionName) => {
  if (transitionName !== void 0) {
    return transitionName;
  }
  return `${rootPrefixCls}-${motion}`;
};
const PopupInner = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "PopupInner",
  inheritAttrs: false,
  props: innerProps,
  emits: ["mouseenter", "mouseleave", "mousedown", "touchstart", "align"],
  setup(props, _ref) {
    let {
      expose,
      attrs,
      slots
    } = _ref;
    const alignRef = shallowRef();
    const elementRef = shallowRef();
    const alignedClassName = shallowRef();
    const [stretchStyle, measureStretchStyle] = useStretchStyle(toRef(props, "stretch"));
    const visible = shallowRef(false);
    let timeoutId;
    watch(() => props.visible, (val) => {
      clearTimeout(timeoutId);
      if (val) {
        timeoutId = setTimeout(() => {
          visible.value = props.visible;
        });
      } else {
        visible.value = false;
      }
    }, {
      immediate: true
    });
    const [status, goNextStatus] = useVisibleStatus(visible);
    const prepareResolveRef = shallowRef();
    const getAlignTarget = () => {
      if (props.point) {
        return props.point;
      }
      return props.getRootDomNode;
    };
    const forceAlign = () => {
      var _a;
      (_a = alignRef.value) === null || _a === void 0 ? void 0 : _a.forceAlign();
    };
    const onInternalAlign = (popupDomNode, matchAlign) => {
      var _a;
      const nextAlignedClassName = props.getClassNameFromAlign(matchAlign);
      const preAlignedClassName = alignedClassName.value;
      if (alignedClassName.value !== nextAlignedClassName) {
        alignedClassName.value = nextAlignedClassName;
      }
      if (status.value === "align") {
        if (preAlignedClassName !== nextAlignedClassName) {
          Promise.resolve().then(() => {
            forceAlign();
          });
        } else {
          goNextStatus(() => {
            var _a2;
            (_a2 = prepareResolveRef.value) === null || _a2 === void 0 ? void 0 : _a2.call(prepareResolveRef);
          });
        }
        (_a = props.onAlign) === null || _a === void 0 ? void 0 : _a.call(props, popupDomNode, matchAlign);
      }
    };
    const motion = computed(() => {
      const m = typeof props.animation === "object" ? props.animation : getMotion(props);
      ["onAfterEnter", "onAfterLeave"].forEach((eventName) => {
        const originFn = m[eventName];
        m[eventName] = (node) => {
          goNextStatus();
          status.value = "stable";
          originFn === null || originFn === void 0 ? void 0 : originFn(node);
        };
      });
      return m;
    });
    const onShowPrepare = () => {
      return new Promise((resolve) => {
        prepareResolveRef.value = resolve;
      });
    };
    watch([motion, status], () => {
      if (!motion.value && status.value === "motion") {
        goNextStatus();
      }
    }, {
      immediate: true
    });
    expose({
      forceAlign,
      getElement: () => {
        return elementRef.value.$el || elementRef.value;
      }
    });
    const alignDisabled = computed(() => {
      var _a;
      if (((_a = props.align) === null || _a === void 0 ? void 0 : _a.points) && (status.value === "align" || status.value === "stable")) {
        return false;
      }
      return true;
    });
    return () => {
      var _a;
      const {
        zIndex,
        align,
        prefixCls,
        destroyPopupOnHide,
        onMouseenter,
        onMouseleave,
        onTouchstart = () => {
        },
        onMousedown
      } = props;
      const statusValue = status.value;
      const mergedStyle = [_extends(_extends({}, stretchStyle.value), {
        zIndex,
        opacity: statusValue === "motion" || statusValue === "stable" || !visible.value ? null : 0,
        // pointerEvents: statusValue === 'stable' ? null : 'none',
        pointerEvents: !visible.value && statusValue !== "stable" ? "none" : null
      }), attrs.style];
      let childNode = flattenChildren((_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots, {
        visible: props.visible
      }));
      if (childNode.length > 1) {
        childNode = createVNode("div", {
          "class": `${prefixCls}-content`
        }, [childNode]);
      }
      const mergedClassName = classNames(prefixCls, attrs.class, alignedClassName.value);
      const hasAnimate = visible.value || !props.visible;
      const transitionProps = hasAnimate ? getTransitionProps(motion.value.name, motion.value) : {};
      return createVNode(Transition, _objectSpread$9(_objectSpread$9({
        "ref": elementRef
      }, transitionProps), {}, {
        "onBeforeEnter": onShowPrepare
      }), {
        default: () => {
          return !destroyPopupOnHide || props.visible ? withDirectives(createVNode(Align, {
            "target": getAlignTarget(),
            "key": "popup",
            "ref": alignRef,
            "monitorWindowResize": true,
            "disabled": alignDisabled.value,
            "align": align,
            "onAlign": onInternalAlign
          }, {
            default: () => createVNode("div", {
              "class": mergedClassName,
              "onMouseenter": onMouseenter,
              "onMouseleave": onMouseleave,
              "onMousedown": withModifiers(onMousedown, ["capture"]),
              [supportsPassive$1 ? "onTouchstartPassive" : "onTouchstart"]: withModifiers(onTouchstart, ["capture"]),
              "style": mergedStyle
            }, [childNode])
          }), [[vShow, visible.value]]) : null;
        }
      });
    };
  }
});
const Popup = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "Popup",
  inheritAttrs: false,
  props: popupProps,
  setup(props, _ref) {
    let {
      attrs,
      slots,
      expose
    } = _ref;
    const innerVisible = shallowRef(false);
    const inMobile = shallowRef(false);
    const popupRef = shallowRef();
    const rootRef = shallowRef();
    watch([() => props.visible, () => props.mobile], () => {
      innerVisible.value = props.visible;
      if (props.visible && props.mobile) {
        inMobile.value = true;
      }
    }, {
      immediate: true,
      flush: "post"
    });
    expose({
      forceAlign: () => {
        var _a;
        (_a = popupRef.value) === null || _a === void 0 ? void 0 : _a.forceAlign();
      },
      getElement: () => {
        var _a;
        return (_a = popupRef.value) === null || _a === void 0 ? void 0 : _a.getElement();
      }
    });
    return () => {
      const cloneProps = _extends(_extends(_extends({}, props), attrs), {
        visible: innerVisible.value
      });
      const popupNode = inMobile.value ? createVNode(MobilePopupInner, _objectSpread$9(_objectSpread$9({}, cloneProps), {}, {
        "mobile": props.mobile,
        "ref": popupRef
      }), {
        default: slots.default
      }) : createVNode(PopupInner, _objectSpread$9(_objectSpread$9({}, cloneProps), {}, {
        "ref": popupRef
      }), {
        default: slots.default
      });
      return createVNode("div", {
        "ref": rootRef
      }, [createVNode(Mask, cloneProps, null), popupNode]);
    };
  }
});
function isPointsEq(a1, a2, isAlignPoint) {
  if (isAlignPoint) {
    return a1[0] === a2[0];
  }
  return a1[0] === a2[0] && a1[1] === a2[1];
}
function getAlignFromPlacement(builtinPlacements, placementStr, align) {
  const baseAlign = builtinPlacements[placementStr] || {};
  return _extends(_extends({}, baseAlign), align);
}
function getAlignPopupClassName(builtinPlacements, prefixCls, align, isAlignPoint) {
  const {
    points
  } = align;
  const placements2 = Object.keys(builtinPlacements);
  for (let i = 0; i < placements2.length; i += 1) {
    const placement = placements2[i];
    if (isPointsEq(builtinPlacements[placement].points, points, isAlignPoint)) {
      return `${prefixCls}-placement-${placement}`;
    }
  }
  return "";
}
const BaseMixin = {
  methods: {
    setState() {
      let state = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      let callback = arguments.length > 1 ? arguments[1] : void 0;
      let newState = typeof state === "function" ? state(this.$data, this.$props) : state;
      if (this.getDerivedStateFromProps) {
        const s = this.getDerivedStateFromProps(getOptionProps(this), _extends(_extends({}, this.$data), newState));
        if (s === null) {
          return;
        } else {
          newState = _extends(_extends({}, newState), s || {});
        }
      }
      _extends(this.$data, newState);
      if (this._.isMounted) {
        this.$forceUpdate();
      }
      nextTick(() => {
        callback && callback();
      });
    },
    __emit() {
      const args = [].slice.call(arguments, 0);
      let eventName = args[0];
      eventName = `on${eventName[0].toUpperCase()}${eventName.substring(1)}`;
      const event = this.$props[eventName] || this.$attrs[eventName];
      if (args.length && event) {
        if (Array.isArray(event)) {
          for (let i = 0, l = event.length; i < l; i++) {
            event[i](...args.slice(1));
          }
        } else {
          event(...args.slice(1));
        }
      }
    }
  }
};
const PortalContextKey = Symbol("PortalContextKey");
const useProvidePortal = function(instance) {
  let config = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    inTriggerContext: true
  };
  provide(PortalContextKey, {
    inTriggerContext: config.inTriggerContext,
    shouldRender: computed(() => {
      const {
        sPopupVisible,
        popupRef,
        forceRender,
        autoDestroy
      } = instance || {};
      let shouldRender = false;
      if (sPopupVisible || popupRef || forceRender) {
        shouldRender = true;
      }
      if (!sPopupVisible && autoDestroy) {
        shouldRender = false;
      }
      return shouldRender;
    })
  });
};
const useInjectPortal = () => {
  useProvidePortal({}, {
    inTriggerContext: false
  });
  const portalContext = inject(PortalContextKey, {
    shouldRender: computed(() => false),
    inTriggerContext: false
  });
  return {
    shouldRender: computed(() => portalContext.shouldRender.value || portalContext.inTriggerContext === false)
  };
};
const Portal$1 = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "Portal",
  inheritAttrs: false,
  props: {
    getContainer: PropTypes$1.func.isRequired,
    didUpdate: Function
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    let container;
    const {
      shouldRender
    } = useInjectPortal();
    const stopWatch = watch(shouldRender, () => {
      if (shouldRender.value && !container) {
        container = props.getContainer();
      }
      if (container) {
        stopWatch();
      }
    });
    onUpdated(() => {
      nextTick(() => {
        var _a;
        if (shouldRender.value) {
          (_a = props.didUpdate) === null || _a === void 0 ? void 0 : _a.call(props, props);
        }
      });
    });
    return () => {
      var _a;
      if (!shouldRender.value)
        return null;
      {
        return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots);
      }
    };
  }
});
function useScrollLocker(lock) {
  computed(() => !!lock && !!lock.value);
  watchEffect((onClear) => {
    {
      return;
    }
  }, {
    flush: "post"
  });
}
let openCount = 0;
const getParent = (getContainer2) => {
  {
    return null;
  }
};
const Portal = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "PortalWrapper",
  inheritAttrs: false,
  props: {
    wrapperClassName: String,
    forceRender: {
      type: Boolean,
      default: void 0
    },
    getContainer: PropTypes$1.any,
    visible: {
      type: Boolean,
      default: void 0
    },
    autoLock: booleanType(),
    didUpdate: Function
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const container = shallowRef();
    const componentRef = shallowRef();
    shallowRef();
    const defaultContainer = canUseDom();
    let parent = null;
    const attachToParent = function() {
      let force = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
      if (force || container.value && !container.value.parentNode) {
        parent = getParent(props.getContainer);
        if (parent) {
          parent.appendChild(container.value);
          return true;
        }
        return false;
      }
      return true;
    };
    const getContainer2 = () => {
      {
        return null;
      }
    };
    const setWrapperClassName = () => {
      const {
        wrapperClassName
      } = props;
      if (container.value && wrapperClassName && wrapperClassName !== container.value.className) {
        container.value.className = wrapperClassName;
      }
    };
    onUpdated(() => {
      setWrapperClassName();
      attachToParent();
    });
    getCurrentInstance();
    useScrollLocker(computed(() => {
      return props.autoLock && props.visible && canUseDom() && (container.value === document.body || container.value === defaultContainer);
    }));
    return () => {
      const {
        forceRender,
        visible
      } = props;
      let portal = null;
      const childProps = {
        getOpenCount: () => openCount,
        getContainer: getContainer2
      };
      if (forceRender || visible || componentRef.value) {
        portal = createVNode(Portal$1, {
          "getContainer": getContainer2,
          "ref": componentRef,
          "didUpdate": props.didUpdate
        }, {
          default: () => {
            var _a;
            return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots, childProps);
          }
        });
      }
      return portal;
    };
  }
});
const ALL_HANDLERS = ["onClick", "onMousedown", "onTouchstart", "onMouseenter", "onMouseleave", "onFocus", "onBlur", "onContextmenu"];
const Trigger = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "Trigger",
  mixins: [BaseMixin],
  inheritAttrs: false,
  props: triggerProps(),
  setup(props) {
    const align = computed(() => {
      const {
        popupPlacement,
        popupAlign,
        builtinPlacements
      } = props;
      if (popupPlacement && builtinPlacements) {
        return getAlignFromPlacement(builtinPlacements, popupPlacement, popupAlign);
      }
      return popupAlign;
    });
    const popupRef = shallowRef(null);
    const setPopupRef = (val) => {
      popupRef.value = val;
    };
    return {
      vcTriggerContext: inject("vcTriggerContext", {}),
      popupRef,
      setPopupRef,
      triggerRef: shallowRef(null),
      align,
      focusTime: null,
      clickOutsideHandler: null,
      contextmenuOutsideHandler1: null,
      contextmenuOutsideHandler2: null,
      touchOutsideHandler: null,
      attachId: null,
      delayTimer: null,
      hasPopupMouseDown: false,
      preClickTime: null,
      preTouchTime: null,
      mouseDownTimeout: null,
      childOriginEvents: {}
    };
  },
  data() {
    const props = this.$props;
    let popupVisible;
    if (this.popupVisible !== void 0) {
      popupVisible = !!props.popupVisible;
    } else {
      popupVisible = !!props.defaultPopupVisible;
    }
    ALL_HANDLERS.forEach((h2) => {
      this[`fire${h2}`] = (e) => {
        this.fireEvents(h2, e);
      };
    });
    return {
      prevPopupVisible: popupVisible,
      sPopupVisible: popupVisible,
      point: null
    };
  },
  watch: {
    popupVisible(val) {
      if (val !== void 0) {
        this.prevPopupVisible = this.sPopupVisible;
        this.sPopupVisible = val;
      }
    }
  },
  created() {
    provide("vcTriggerContext", {
      onPopupMouseDown: this.onPopupMouseDown,
      onPopupMouseenter: this.onPopupMouseenter,
      onPopupMouseleave: this.onPopupMouseleave
    });
    useProvidePortal(this);
  },
  deactivated() {
    this.setPopupVisible(false);
  },
  mounted() {
    this.$nextTick(() => {
      this.updatedCal();
    });
  },
  updated() {
    this.$nextTick(() => {
      this.updatedCal();
    });
  },
  beforeUnmount() {
    this.clearDelayTimer();
    this.clearOutsideHandler();
    clearTimeout(this.mouseDownTimeout);
    wrapperRaf.cancel(this.attachId);
  },
  methods: {
    updatedCal() {
      const props = this.$props;
      const state = this.$data;
      if (state.sPopupVisible) {
        let currentDocument;
        if (!this.clickOutsideHandler && (this.isClickToHide() || this.isContextmenuToShow())) {
          currentDocument = props.getDocument(this.getRootDomNode());
          this.clickOutsideHandler = addEventListenerWrap(currentDocument, "mousedown", this.onDocumentClick);
        }
        if (!this.touchOutsideHandler) {
          currentDocument = currentDocument || props.getDocument(this.getRootDomNode());
          this.touchOutsideHandler = addEventListenerWrap(currentDocument, "touchstart", this.onDocumentClick, supportsPassive$1 ? {
            passive: false
          } : false);
        }
        if (!this.contextmenuOutsideHandler1 && this.isContextmenuToShow()) {
          currentDocument = currentDocument || props.getDocument(this.getRootDomNode());
          this.contextmenuOutsideHandler1 = addEventListenerWrap(currentDocument, "scroll", this.onContextmenuClose);
        }
        if (!this.contextmenuOutsideHandler2 && this.isContextmenuToShow()) {
          this.contextmenuOutsideHandler2 = addEventListenerWrap(window, "blur", this.onContextmenuClose);
        }
      } else {
        this.clearOutsideHandler();
      }
    },
    onMouseenter(e) {
      const {
        mouseEnterDelay
      } = this.$props;
      this.fireEvents("onMouseenter", e);
      this.delaySetPopupVisible(true, mouseEnterDelay, mouseEnterDelay ? null : e);
    },
    onMouseMove(e) {
      this.fireEvents("onMousemove", e);
      this.setPoint(e);
    },
    onMouseleave(e) {
      this.fireEvents("onMouseleave", e);
      this.delaySetPopupVisible(false, this.$props.mouseLeaveDelay);
    },
    onPopupMouseenter() {
      const {
        vcTriggerContext = {}
      } = this;
      if (vcTriggerContext.onPopupMouseenter) {
        vcTriggerContext.onPopupMouseenter();
      }
      this.clearDelayTimer();
    },
    onPopupMouseleave(e) {
      var _a;
      if (e && e.relatedTarget && !e.relatedTarget.setTimeout && contains((_a = this.popupRef) === null || _a === void 0 ? void 0 : _a.getElement(), e.relatedTarget)) {
        return;
      }
      this.delaySetPopupVisible(false, this.$props.mouseLeaveDelay);
      const {
        vcTriggerContext = {}
      } = this;
      if (vcTriggerContext.onPopupMouseleave) {
        vcTriggerContext.onPopupMouseleave(e);
      }
    },
    onFocus(e) {
      this.fireEvents("onFocus", e);
      this.clearDelayTimer();
      if (this.isFocusToShow()) {
        this.focusTime = Date.now();
        this.delaySetPopupVisible(true, this.$props.focusDelay);
      }
    },
    onMousedown(e) {
      this.fireEvents("onMousedown", e);
      this.preClickTime = Date.now();
    },
    onTouchstart(e) {
      this.fireEvents("onTouchstart", e);
      this.preTouchTime = Date.now();
    },
    onBlur(e) {
      if (!contains(e.target, e.relatedTarget || document.activeElement)) {
        this.fireEvents("onBlur", e);
        this.clearDelayTimer();
        if (this.isBlurToHide()) {
          this.delaySetPopupVisible(false, this.$props.blurDelay);
        }
      }
    },
    onContextmenu(e) {
      e.preventDefault();
      this.fireEvents("onContextmenu", e);
      this.setPopupVisible(true, e);
    },
    onContextmenuClose() {
      if (this.isContextmenuToShow()) {
        this.close();
      }
    },
    onClick(event) {
      this.fireEvents("onClick", event);
      if (this.focusTime) {
        let preTime;
        if (this.preClickTime && this.preTouchTime) {
          preTime = Math.min(this.preClickTime, this.preTouchTime);
        } else if (this.preClickTime) {
          preTime = this.preClickTime;
        } else if (this.preTouchTime) {
          preTime = this.preTouchTime;
        }
        if (Math.abs(preTime - this.focusTime) < 20) {
          return;
        }
        this.focusTime = 0;
      }
      this.preClickTime = 0;
      this.preTouchTime = 0;
      if (this.isClickToShow() && (this.isClickToHide() || this.isBlurToHide()) && event && event.preventDefault) {
        event.preventDefault();
      }
      if (event && event.domEvent) {
        event.domEvent.preventDefault();
      }
      const nextVisible = !this.$data.sPopupVisible;
      if (this.isClickToHide() && !nextVisible || nextVisible && this.isClickToShow()) {
        this.setPopupVisible(!this.$data.sPopupVisible, event);
      }
    },
    onPopupMouseDown() {
      const {
        vcTriggerContext = {}
      } = this;
      this.hasPopupMouseDown = true;
      clearTimeout(this.mouseDownTimeout);
      this.mouseDownTimeout = setTimeout(() => {
        this.hasPopupMouseDown = false;
      }, 0);
      if (vcTriggerContext.onPopupMouseDown) {
        vcTriggerContext.onPopupMouseDown(...arguments);
      }
    },
    onDocumentClick(event) {
      if (this.$props.mask && !this.$props.maskClosable) {
        return;
      }
      const target = event.target;
      const root = this.getRootDomNode();
      const popupNode = this.getPopupDomNode();
      if (
        // mousedown on the target should also close popup when action is contextMenu.
        // https://github.com/ant-design/ant-design/issues/29853
        (!contains(root, target) || this.isContextMenuOnly()) && !contains(popupNode, target) && !this.hasPopupMouseDown
      ) {
        this.delaySetPopupVisible(false, 0.1);
      }
    },
    getPopupDomNode() {
      var _a;
      return ((_a = this.popupRef) === null || _a === void 0 ? void 0 : _a.getElement()) || null;
    },
    getRootDomNode() {
      var _a, _b, _c, _d;
      const {
        getTriggerDOMNode
      } = this.$props;
      if (getTriggerDOMNode) {
        const domNode = ((_b = (_a = this.triggerRef) === null || _a === void 0 ? void 0 : _a.$el) === null || _b === void 0 ? void 0 : _b.nodeName) === "#comment" ? null : findDOMNode(this.triggerRef);
        return findDOMNode(getTriggerDOMNode(domNode));
      }
      try {
        const domNode = ((_d = (_c = this.triggerRef) === null || _c === void 0 ? void 0 : _c.$el) === null || _d === void 0 ? void 0 : _d.nodeName) === "#comment" ? null : findDOMNode(this.triggerRef);
        if (domNode) {
          return domNode;
        }
      } catch (err) {
      }
      return findDOMNode(this);
    },
    handleGetPopupClassFromAlign(align) {
      const className = [];
      const props = this.$props;
      const {
        popupPlacement,
        builtinPlacements,
        prefixCls,
        alignPoint: alignPoint2,
        getPopupClassNameFromAlign
      } = props;
      if (popupPlacement && builtinPlacements) {
        className.push(getAlignPopupClassName(builtinPlacements, prefixCls, align, alignPoint2));
      }
      if (getPopupClassNameFromAlign) {
        className.push(getPopupClassNameFromAlign(align));
      }
      return className.join(" ");
    },
    getPopupAlign() {
      const props = this.$props;
      const {
        popupPlacement,
        popupAlign,
        builtinPlacements
      } = props;
      if (popupPlacement && builtinPlacements) {
        return getAlignFromPlacement(builtinPlacements, popupPlacement, popupAlign);
      }
      return popupAlign;
    },
    getComponent() {
      const mouseProps = {};
      if (this.isMouseEnterToShow()) {
        mouseProps.onMouseenter = this.onPopupMouseenter;
      }
      if (this.isMouseLeaveToHide()) {
        mouseProps.onMouseleave = this.onPopupMouseleave;
      }
      mouseProps.onMousedown = this.onPopupMouseDown;
      mouseProps[supportsPassive$1 ? "onTouchstartPassive" : "onTouchstart"] = this.onPopupMouseDown;
      const {
        handleGetPopupClassFromAlign,
        getRootDomNode,
        $attrs
      } = this;
      const {
        prefixCls,
        destroyPopupOnHide,
        popupClassName,
        popupAnimation,
        popupTransitionName,
        popupStyle,
        mask,
        maskAnimation,
        maskTransitionName,
        zIndex,
        stretch,
        alignPoint: alignPoint2,
        mobile,
        forceRender
      } = this.$props;
      const {
        sPopupVisible,
        point
      } = this.$data;
      const popupProps2 = _extends(_extends({
        prefixCls,
        destroyPopupOnHide,
        visible: sPopupVisible,
        point: alignPoint2 ? point : null,
        align: this.align,
        animation: popupAnimation,
        getClassNameFromAlign: handleGetPopupClassFromAlign,
        stretch,
        getRootDomNode,
        mask,
        zIndex,
        transitionName: popupTransitionName,
        maskAnimation,
        maskTransitionName,
        class: popupClassName,
        style: popupStyle,
        onAlign: $attrs.onPopupAlign || noop$1
      }, mouseProps), {
        ref: this.setPopupRef,
        mobile,
        forceRender
      });
      return createVNode(Popup, popupProps2, {
        default: this.$slots.popup || (() => getComponent(this, "popup"))
      });
    },
    attachParent(popupContainer) {
      wrapperRaf.cancel(this.attachId);
      const {
        getPopupContainer,
        getDocument
      } = this.$props;
      const domNode = this.getRootDomNode();
      let mountNode;
      if (!getPopupContainer) {
        mountNode = getDocument(this.getRootDomNode()).body;
      } else if (domNode || getPopupContainer.length === 0) {
        mountNode = getPopupContainer(domNode);
      }
      if (mountNode) {
        mountNode.appendChild(popupContainer);
      } else {
        this.attachId = wrapperRaf(() => {
          this.attachParent(popupContainer);
        });
      }
    },
    getContainer() {
      const {
        $props: props
      } = this;
      const {
        getDocument
      } = props;
      const popupContainer = getDocument(this.getRootDomNode()).createElement("div");
      popupContainer.style.position = "absolute";
      popupContainer.style.top = "0";
      popupContainer.style.left = "0";
      popupContainer.style.width = "100%";
      this.attachParent(popupContainer);
      return popupContainer;
    },
    setPopupVisible(sPopupVisible, event) {
      const {
        alignPoint: alignPoint2,
        sPopupVisible: prevPopupVisible,
        onPopupVisibleChange
      } = this;
      this.clearDelayTimer();
      if (prevPopupVisible !== sPopupVisible) {
        if (!hasProp(this, "popupVisible")) {
          this.setState({
            sPopupVisible,
            prevPopupVisible
          });
        }
        onPopupVisibleChange && onPopupVisibleChange(sPopupVisible);
      }
      if (alignPoint2 && event && sPopupVisible) {
        this.setPoint(event);
      }
    },
    setPoint(point) {
      const {
        alignPoint: alignPoint2
      } = this.$props;
      if (!alignPoint2 || !point)
        return;
      this.setState({
        point: {
          pageX: point.pageX,
          pageY: point.pageY
        }
      });
    },
    handlePortalUpdate() {
      if (this.prevPopupVisible !== this.sPopupVisible) {
        this.afterPopupVisibleChange(this.sPopupVisible);
      }
    },
    delaySetPopupVisible(visible, delayS, event) {
      const delay = delayS * 1e3;
      this.clearDelayTimer();
      if (delay) {
        const point = event ? {
          pageX: event.pageX,
          pageY: event.pageY
        } : null;
        this.delayTimer = setTimeout(() => {
          this.setPopupVisible(visible, point);
          this.clearDelayTimer();
        }, delay);
      } else {
        this.setPopupVisible(visible, event);
      }
    },
    clearDelayTimer() {
      if (this.delayTimer) {
        clearTimeout(this.delayTimer);
        this.delayTimer = null;
      }
    },
    clearOutsideHandler() {
      if (this.clickOutsideHandler) {
        this.clickOutsideHandler.remove();
        this.clickOutsideHandler = null;
      }
      if (this.contextmenuOutsideHandler1) {
        this.contextmenuOutsideHandler1.remove();
        this.contextmenuOutsideHandler1 = null;
      }
      if (this.contextmenuOutsideHandler2) {
        this.contextmenuOutsideHandler2.remove();
        this.contextmenuOutsideHandler2 = null;
      }
      if (this.touchOutsideHandler) {
        this.touchOutsideHandler.remove();
        this.touchOutsideHandler = null;
      }
    },
    createTwoChains(event) {
      let fn = () => {
      };
      const events = getEvents(this);
      if (this.childOriginEvents[event] && events[event]) {
        return this[`fire${event}`];
      }
      fn = this.childOriginEvents[event] || events[event] || fn;
      return fn;
    },
    isClickToShow() {
      const {
        action,
        showAction
      } = this.$props;
      return action.indexOf("click") !== -1 || showAction.indexOf("click") !== -1;
    },
    isContextMenuOnly() {
      const {
        action
      } = this.$props;
      return action === "contextmenu" || action.length === 1 && action[0] === "contextmenu";
    },
    isContextmenuToShow() {
      const {
        action,
        showAction
      } = this.$props;
      return action.indexOf("contextmenu") !== -1 || showAction.indexOf("contextmenu") !== -1;
    },
    isClickToHide() {
      const {
        action,
        hideAction
      } = this.$props;
      return action.indexOf("click") !== -1 || hideAction.indexOf("click") !== -1;
    },
    isMouseEnterToShow() {
      const {
        action,
        showAction
      } = this.$props;
      return action.indexOf("hover") !== -1 || showAction.indexOf("mouseenter") !== -1;
    },
    isMouseLeaveToHide() {
      const {
        action,
        hideAction
      } = this.$props;
      return action.indexOf("hover") !== -1 || hideAction.indexOf("mouseleave") !== -1;
    },
    isFocusToShow() {
      const {
        action,
        showAction
      } = this.$props;
      return action.indexOf("focus") !== -1 || showAction.indexOf("focus") !== -1;
    },
    isBlurToHide() {
      const {
        action,
        hideAction
      } = this.$props;
      return action.indexOf("focus") !== -1 || hideAction.indexOf("blur") !== -1;
    },
    forcePopupAlign() {
      var _a;
      if (this.$data.sPopupVisible) {
        (_a = this.popupRef) === null || _a === void 0 ? void 0 : _a.forceAlign();
      }
    },
    fireEvents(type, e) {
      if (this.childOriginEvents[type]) {
        this.childOriginEvents[type](e);
      }
      const event = this.$props[type] || this.$attrs[type];
      if (event) {
        event(e);
      }
    },
    close() {
      this.setPopupVisible(false);
    }
  },
  render() {
    const {
      $attrs
    } = this;
    const children = filterEmpty(getSlot(this));
    const {
      alignPoint: alignPoint2,
      getPopupContainer
    } = this.$props;
    const child = children[0];
    this.childOriginEvents = getEvents(child);
    const newChildProps = {
      key: "trigger"
    };
    if (this.isContextmenuToShow()) {
      newChildProps.onContextmenu = this.onContextmenu;
    } else {
      newChildProps.onContextmenu = this.createTwoChains("onContextmenu");
    }
    if (this.isClickToHide() || this.isClickToShow()) {
      newChildProps.onClick = this.onClick;
      newChildProps.onMousedown = this.onMousedown;
      newChildProps[supportsPassive$1 ? "onTouchstartPassive" : "onTouchstart"] = this.onTouchstart;
    } else {
      newChildProps.onClick = this.createTwoChains("onClick");
      newChildProps.onMousedown = this.createTwoChains("onMousedown");
      newChildProps[supportsPassive$1 ? "onTouchstartPassive" : "onTouchstart"] = this.createTwoChains("onTouchstart");
    }
    if (this.isMouseEnterToShow()) {
      newChildProps.onMouseenter = this.onMouseenter;
      if (alignPoint2) {
        newChildProps.onMousemove = this.onMouseMove;
      }
    } else {
      newChildProps.onMouseenter = this.createTwoChains("onMouseenter");
    }
    if (this.isMouseLeaveToHide()) {
      newChildProps.onMouseleave = this.onMouseleave;
    } else {
      newChildProps.onMouseleave = this.createTwoChains("onMouseleave");
    }
    if (this.isFocusToShow() || this.isBlurToHide()) {
      newChildProps.onFocus = this.onFocus;
      newChildProps.onBlur = this.onBlur;
    } else {
      newChildProps.onFocus = this.createTwoChains("onFocus");
      newChildProps.onBlur = (e) => {
        if (e && (!e.relatedTarget || !contains(e.target, e.relatedTarget))) {
          this.createTwoChains("onBlur")(e);
        }
      };
    }
    const childrenClassName = classNames(child && child.props && child.props.class, $attrs.class);
    if (childrenClassName) {
      newChildProps.class = childrenClassName;
    }
    const trigger = cloneElement(child, _extends(_extends({}, newChildProps), {
      ref: "triggerRef"
    }), true, true);
    const portal = createVNode(Portal, {
      "key": "portal",
      "getContainer": getPopupContainer && (() => getPopupContainer(this.getRootDomNode())),
      "didUpdate": this.handlePortalUpdate,
      "visible": this.$data.sPopupVisible
    }, {
      default: this.getComponent
    });
    return createVNode(Fragment, null, [trigger, portal]);
  }
});
const KeyCode = {
  /**
   * MAC_ENTER
   */
  MAC_ENTER: 3,
  /**
   * BACKSPACE
   */
  BACKSPACE: 8,
  /**
   * TAB
   */
  TAB: 9,
  /**
   * NUMLOCK on FF/Safari Mac
   */
  NUM_CENTER: 12,
  /**
   * ENTER
   */
  ENTER: 13,
  /**
   * SHIFT
   */
  SHIFT: 16,
  /**
   * CTRL
   */
  CTRL: 17,
  /**
   * ALT
   */
  ALT: 18,
  /**
   * PAUSE
   */
  PAUSE: 19,
  /**
   * CAPS_LOCK
   */
  CAPS_LOCK: 20,
  /**
   * ESC
   */
  ESC: 27,
  /**
   * SPACE
   */
  SPACE: 32,
  /**
   * PAGE_UP
   */
  PAGE_UP: 33,
  /**
   * PAGE_DOWN
   */
  PAGE_DOWN: 34,
  /**
   * END
   */
  END: 35,
  /**
   * HOME
   */
  HOME: 36,
  /**
   * LEFT
   */
  LEFT: 37,
  /**
   * UP
   */
  UP: 38,
  /**
   * RIGHT
   */
  RIGHT: 39,
  /**
   * DOWN
   */
  DOWN: 40,
  /**
   * PRINT_SCREEN
   */
  PRINT_SCREEN: 44,
  /**
   * INSERT
   */
  INSERT: 45,
  /**
   * DELETE
   */
  DELETE: 46,
  /**
   * ZERO
   */
  ZERO: 48,
  /**
   * ONE
   */
  ONE: 49,
  /**
   * TWO
   */
  TWO: 50,
  /**
   * THREE
   */
  THREE: 51,
  /**
   * FOUR
   */
  FOUR: 52,
  /**
   * FIVE
   */
  FIVE: 53,
  /**
   * SIX
   */
  SIX: 54,
  /**
   * SEVEN
   */
  SEVEN: 55,
  /**
   * EIGHT
   */
  EIGHT: 56,
  /**
   * NINE
   */
  NINE: 57,
  /**
   * QUESTION_MARK
   */
  QUESTION_MARK: 63,
  /**
   * A
   */
  A: 65,
  /**
   * B
   */
  B: 66,
  /**
   * C
   */
  C: 67,
  /**
   * D
   */
  D: 68,
  /**
   * E
   */
  E: 69,
  /**
   * F
   */
  F: 70,
  /**
   * G
   */
  G: 71,
  /**
   * H
   */
  H: 72,
  /**
   * I
   */
  I: 73,
  /**
   * J
   */
  J: 74,
  /**
   * K
   */
  K: 75,
  /**
   * L
   */
  L: 76,
  /**
   * M
   */
  M: 77,
  /**
   * N
   */
  N: 78,
  /**
   * O
   */
  O: 79,
  /**
   * P
   */
  P: 80,
  /**
   * Q
   */
  Q: 81,
  /**
   * R
   */
  R: 82,
  /**
   * S
   */
  S: 83,
  /**
   * T
   */
  T: 84,
  /**
   * U
   */
  U: 85,
  /**
   * V
   */
  V: 86,
  /**
   * W
   */
  W: 87,
  /**
   * X
   */
  X: 88,
  /**
   * Y
   */
  Y: 89,
  /**
   * Z
   */
  Z: 90,
  /**
   * META
   */
  META: 91,
  /**
   * WIN_KEY_RIGHT
   */
  WIN_KEY_RIGHT: 92,
  /**
   * CONTEXT_MENU
   */
  CONTEXT_MENU: 93,
  /**
   * NUM_ZERO
   */
  NUM_ZERO: 96,
  /**
   * NUM_ONE
   */
  NUM_ONE: 97,
  /**
   * NUM_TWO
   */
  NUM_TWO: 98,
  /**
   * NUM_THREE
   */
  NUM_THREE: 99,
  /**
   * NUM_FOUR
   */
  NUM_FOUR: 100,
  /**
   * NUM_FIVE
   */
  NUM_FIVE: 101,
  /**
   * NUM_SIX
   */
  NUM_SIX: 102,
  /**
   * NUM_SEVEN
   */
  NUM_SEVEN: 103,
  /**
   * NUM_EIGHT
   */
  NUM_EIGHT: 104,
  /**
   * NUM_NINE
   */
  NUM_NINE: 105,
  /**
   * NUM_MULTIPLY
   */
  NUM_MULTIPLY: 106,
  /**
   * NUM_PLUS
   */
  NUM_PLUS: 107,
  /**
   * NUM_MINUS
   */
  NUM_MINUS: 109,
  /**
   * NUM_PERIOD
   */
  NUM_PERIOD: 110,
  /**
   * NUM_DIVISION
   */
  NUM_DIVISION: 111,
  /**
   * F1
   */
  F1: 112,
  /**
   * F2
   */
  F2: 113,
  /**
   * F3
   */
  F3: 114,
  /**
   * F4
   */
  F4: 115,
  /**
   * F5
   */
  F5: 116,
  /**
   * F6
   */
  F6: 117,
  /**
   * F7
   */
  F7: 118,
  /**
   * F8
   */
  F8: 119,
  /**
   * F9
   */
  F9: 120,
  /**
   * F10
   */
  F10: 121,
  /**
   * F11
   */
  F11: 122,
  /**
   * F12
   */
  F12: 123,
  /**
   * NUMLOCK
   */
  NUMLOCK: 144,
  /**
   * SEMICOLON
   */
  SEMICOLON: 186,
  /**
   * DASH
   */
  DASH: 189,
  /**
   * EQUALS
   */
  EQUALS: 187,
  /**
   * COMMA
   */
  COMMA: 188,
  /**
   * PERIOD
   */
  PERIOD: 190,
  /**
   * SLASH
   */
  SLASH: 191,
  /**
   * APOSTROPHE
   */
  APOSTROPHE: 192,
  /**
   * SINGLE_QUOTE
   */
  SINGLE_QUOTE: 222,
  /**
   * OPEN_SQUARE_BRACKET
   */
  OPEN_SQUARE_BRACKET: 219,
  /**
   * BACKSLASH
   */
  BACKSLASH: 220,
  /**
   * CLOSE_SQUARE_BRACKET
   */
  CLOSE_SQUARE_BRACKET: 221,
  /**
   * WIN_KEY
   */
  WIN_KEY: 224,
  /**
   * MAC_FF_META
   */
  MAC_FF_META: 224,
  /**
   * WIN_IME
   */
  WIN_IME: 229,
  // ======================== Function ========================
  /**
   * whether text and modified key is entered at the same time.
   */
  isTextModifyingKeyEvent: function isTextModifyingKeyEvent(e) {
    const {
      keyCode
    } = e;
    if (e.altKey && !e.ctrlKey || e.metaKey || // Function keys don't generate text
    keyCode >= KeyCode.F1 && keyCode <= KeyCode.F12) {
      return false;
    }
    switch (keyCode) {
      case KeyCode.ALT:
      case KeyCode.CAPS_LOCK:
      case KeyCode.CONTEXT_MENU:
      case KeyCode.CTRL:
      case KeyCode.DOWN:
      case KeyCode.END:
      case KeyCode.ESC:
      case KeyCode.HOME:
      case KeyCode.INSERT:
      case KeyCode.LEFT:
      case KeyCode.MAC_FF_META:
      case KeyCode.META:
      case KeyCode.NUMLOCK:
      case KeyCode.NUM_CENTER:
      case KeyCode.PAGE_DOWN:
      case KeyCode.PAGE_UP:
      case KeyCode.PAUSE:
      case KeyCode.PRINT_SCREEN:
      case KeyCode.RIGHT:
      case KeyCode.SHIFT:
      case KeyCode.UP:
      case KeyCode.WIN_KEY:
      case KeyCode.WIN_KEY_RIGHT:
        return false;
      default:
        return true;
    }
  },
  /**
   * whether character is entered.
   */
  isCharacterKey: function isCharacterKey(keyCode) {
    if (keyCode >= KeyCode.ZERO && keyCode <= KeyCode.NINE) {
      return true;
    }
    if (keyCode >= KeyCode.NUM_ZERO && keyCode <= KeyCode.NUM_MULTIPLY) {
      return true;
    }
    if (keyCode >= KeyCode.A && keyCode <= KeyCode.Z) {
      return true;
    }
    if (window.navigator.userAgent.indexOf("WebKit") !== -1 && keyCode === 0) {
      return true;
    }
    switch (keyCode) {
      case KeyCode.SPACE:
      case KeyCode.QUESTION_MARK:
      case KeyCode.NUM_PLUS:
      case KeyCode.NUM_MINUS:
      case KeyCode.NUM_PERIOD:
      case KeyCode.NUM_DIVISION:
      case KeyCode.SEMICOLON:
      case KeyCode.DASH:
      case KeyCode.EQUALS:
      case KeyCode.COMMA:
      case KeyCode.PERIOD:
      case KeyCode.SLASH:
      case KeyCode.APOSTROPHE:
      case KeyCode.SINGLE_QUOTE:
      case KeyCode.OPEN_SQUARE_BRACKET:
      case KeyCode.BACKSLASH:
      case KeyCode.CLOSE_SQUARE_BRACKET:
        return true;
      default:
        return false;
    }
  }
};
const KeyCode$1 = KeyCode;
const OverflowContextProviderKey = Symbol("OverflowContextProviderKey");
const OverflowContextProvider = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "OverflowContextProvider",
  inheritAttrs: false,
  props: {
    value: {
      type: Object
    }
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    provide(OverflowContextProviderKey, computed(() => props.value));
    return () => {
      var _a;
      return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots);
    };
  }
});
const useInjectOverflowContext = () => {
  return inject(OverflowContextProviderKey, computed(() => null));
};
var __rest$5 = globalThis && globalThis.__rest || function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
const UNDEFINED = void 0;
const Item = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "Item",
  props: {
    prefixCls: String,
    item: PropTypes$1.any,
    renderItem: Function,
    responsive: Boolean,
    itemKey: {
      type: [String, Number]
    },
    registerSize: Function,
    display: Boolean,
    order: Number,
    component: PropTypes$1.any,
    invalidate: Boolean
  },
  setup(props, _ref) {
    let {
      slots,
      expose
    } = _ref;
    const mergedHidden = computed(() => props.responsive && !props.display);
    const itemNodeRef = ref();
    expose({
      itemNodeRef
    });
    function internalRegisterSize(width) {
      props.registerSize(props.itemKey, width);
    }
    onUnmounted(() => {
      internalRegisterSize(null);
    });
    return () => {
      var _a;
      const {
        prefixCls,
        invalidate,
        item,
        renderItem,
        responsive,
        registerSize,
        itemKey,
        display,
        order,
        component: Component = "div"
      } = props, restProps = __rest$5(props, ["prefixCls", "invalidate", "item", "renderItem", "responsive", "registerSize", "itemKey", "display", "order", "component"]);
      const children = (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots);
      const childNode = renderItem && item !== UNDEFINED ? renderItem(item) : children;
      let overflowStyle;
      if (!invalidate) {
        overflowStyle = {
          opacity: mergedHidden.value ? 0 : 1,
          height: mergedHidden.value ? 0 : UNDEFINED,
          overflowY: mergedHidden.value ? "hidden" : UNDEFINED,
          order: responsive ? order : UNDEFINED,
          pointerEvents: mergedHidden.value ? "none" : UNDEFINED,
          position: mergedHidden.value ? "absolute" : UNDEFINED
        };
      }
      const overflowProps2 = {};
      if (mergedHidden.value) {
        overflowProps2["aria-hidden"] = true;
      }
      return createVNode(ResizeObserver, {
        "disabled": !responsive,
        "onResize": (_ref2) => {
          let {
            offsetWidth
          } = _ref2;
          internalRegisterSize(offsetWidth);
        }
      }, {
        default: () => createVNode(Component, _objectSpread$9(_objectSpread$9(_objectSpread$9({
          "class": classNames(!invalidate && prefixCls),
          "style": overflowStyle
        }, overflowProps2), restProps), {}, {
          "ref": itemNodeRef
        }), {
          default: () => [childNode]
        })
      });
    };
  }
});
var __rest$4 = globalThis && globalThis.__rest || function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
const RawItem = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "RawItem",
  inheritAttrs: false,
  props: {
    component: PropTypes$1.any,
    title: PropTypes$1.any,
    id: String,
    onMouseenter: {
      type: Function
    },
    onMouseleave: {
      type: Function
    },
    onClick: {
      type: Function
    },
    onKeydown: {
      type: Function
    },
    onFocus: {
      type: Function
    },
    role: String,
    tabindex: Number
  },
  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const context = useInjectOverflowContext();
    return () => {
      var _a;
      if (!context.value) {
        const {
          component: Component = "div"
        } = props, restProps2 = __rest$4(props, ["component"]);
        return createVNode(Component, _objectSpread$9(_objectSpread$9({}, restProps2), attrs), {
          default: () => [(_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)]
        });
      }
      const _b = context.value, {
        className: contextClassName
      } = _b, restContext = __rest$4(_b, ["className"]);
      const {
        class: className
      } = attrs, restProps = __rest$4(attrs, ["class"]);
      return createVNode(OverflowContextProvider, {
        "value": null
      }, {
        default: () => [createVNode(Item, _objectSpread$9(_objectSpread$9(_objectSpread$9({
          "class": classNames(contextClassName, className)
        }, restContext), restProps), props), slots)]
      });
    };
  }
});
var __rest$3 = globalThis && globalThis.__rest || function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
const RESPONSIVE = "responsive";
const INVALIDATE = "invalidate";
function defaultRenderRest(omittedItems) {
  return `+ ${omittedItems.length} ...`;
}
const overflowProps = () => {
  return {
    id: String,
    prefixCls: String,
    data: Array,
    itemKey: [String, Number, Function],
    /** Used for `responsive`. It will limit render node to avoid perf issue */
    itemWidth: {
      type: Number,
      default: 10
    },
    renderItem: Function,
    /** @private Do not use in your production. Render raw node that need wrap Item by developer self */
    renderRawItem: Function,
    maxCount: [Number, String],
    renderRest: Function,
    /** @private Do not use in your production. Render raw node that need wrap Item by developer self */
    renderRawRest: Function,
    suffix: PropTypes$1.any,
    component: String,
    itemComponent: PropTypes$1.any,
    /** @private This API may be refactor since not well design */
    onVisibleChange: Function,
    /** When set to `full`, ssr will render full items by default and remove at client side */
    ssr: String,
    onMousedown: Function
  };
};
const Overflow = /* @__PURE__ */ defineComponent({
  name: "Overflow",
  inheritAttrs: false,
  props: overflowProps(),
  emits: ["visibleChange"],
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const fullySSR = computed(() => props.ssr === "full");
    const containerWidth = shallowRef(null);
    const mergedContainerWidth = computed(() => containerWidth.value || 0);
    const itemWidths = shallowRef(/* @__PURE__ */ new Map());
    const prevRestWidth = shallowRef(0);
    const restWidth = shallowRef(0);
    const suffixWidth = shallowRef(0);
    const suffixFixedStart = shallowRef(null);
    const displayCount = shallowRef(null);
    const mergedDisplayCount = computed(() => {
      if (displayCount.value === null && fullySSR.value) {
        return Number.MAX_SAFE_INTEGER;
      }
      return displayCount.value || 0;
    });
    const restReady = shallowRef(false);
    const itemPrefixCls = computed(() => `${props.prefixCls}-item`);
    const mergedRestWidth = computed(() => Math.max(prevRestWidth.value, restWidth.value));
    const isResponsive = computed(() => !!(props.data.length && props.maxCount === RESPONSIVE));
    const invalidate = computed(() => props.maxCount === INVALIDATE);
    const showRest = computed(() => isResponsive.value || typeof props.maxCount === "number" && props.data.length > props.maxCount);
    const mergedData = computed(() => {
      let items = props.data;
      if (isResponsive.value) {
        if (containerWidth.value === null && fullySSR.value) {
          items = props.data;
        } else {
          items = props.data.slice(0, Math.min(props.data.length, mergedContainerWidth.value / props.itemWidth));
        }
      } else if (typeof props.maxCount === "number") {
        items = props.data.slice(0, props.maxCount);
      }
      return items;
    });
    const omittedItems = computed(() => {
      if (isResponsive.value) {
        return props.data.slice(mergedDisplayCount.value + 1);
      }
      return props.data.slice(mergedData.value.length);
    });
    const getKey = (item, index) => {
      var _a;
      if (typeof props.itemKey === "function") {
        return props.itemKey(item);
      }
      return (_a = props.itemKey && (item === null || item === void 0 ? void 0 : item[props.itemKey])) !== null && _a !== void 0 ? _a : index;
    };
    const mergedRenderItem = computed(() => props.renderItem || ((item) => item));
    const updateDisplayCount = (count, notReady) => {
      displayCount.value = count;
      if (!notReady) {
        restReady.value = count < props.data.length - 1;
        emit("visibleChange", count);
      }
    };
    const onOverflowResize = (_, element) => {
      containerWidth.value = element.clientWidth;
    };
    const registerSize = (key, width) => {
      const clone = new Map(itemWidths.value);
      if (width === null) {
        clone.delete(key);
      } else {
        clone.set(key, width);
      }
      itemWidths.value = clone;
    };
    const registerOverflowSize = (_, width) => {
      prevRestWidth.value = restWidth.value;
      restWidth.value = width;
    };
    const registerSuffixSize = (_, width) => {
      suffixWidth.value = width;
    };
    const getItemWidth = (index) => {
      return itemWidths.value.get(getKey(mergedData.value[index], index));
    };
    watch([mergedContainerWidth, itemWidths, restWidth, suffixWidth, () => props.itemKey, mergedData], () => {
      if (mergedContainerWidth.value && mergedRestWidth.value && mergedData.value) {
        let totalWidth = suffixWidth.value;
        const len = mergedData.value.length;
        const lastIndex = len - 1;
        if (!len) {
          updateDisplayCount(0);
          suffixFixedStart.value = null;
          return;
        }
        for (let i = 0; i < len; i += 1) {
          const currentItemWidth = getItemWidth(i);
          if (currentItemWidth === void 0) {
            updateDisplayCount(i - 1, true);
            break;
          }
          totalWidth += currentItemWidth;
          if (
            // Only one means `totalWidth` is the final width
            lastIndex === 0 && totalWidth <= mergedContainerWidth.value || // Last two width will be the final width
            i === lastIndex - 1 && totalWidth + getItemWidth(lastIndex) <= mergedContainerWidth.value
          ) {
            updateDisplayCount(lastIndex);
            suffixFixedStart.value = null;
            break;
          } else if (totalWidth + mergedRestWidth.value > mergedContainerWidth.value) {
            updateDisplayCount(i - 1);
            suffixFixedStart.value = totalWidth - currentItemWidth - suffixWidth.value + restWidth.value;
            break;
          }
        }
        if (props.suffix && getItemWidth(0) + suffixWidth.value > mergedContainerWidth.value) {
          suffixFixedStart.value = null;
        }
      }
    });
    return () => {
      const displayRest = restReady.value && !!omittedItems.value.length;
      const {
        itemComponent,
        renderRawItem,
        renderRawRest,
        renderRest,
        prefixCls = "rc-overflow",
        suffix,
        component: Component = "div",
        id,
        onMousedown
      } = props;
      const {
        class: className,
        style
      } = attrs, restAttrs = __rest$3(attrs, ["class", "style"]);
      let suffixStyle = {};
      if (suffixFixedStart.value !== null && isResponsive.value) {
        suffixStyle = {
          position: "absolute",
          left: `${suffixFixedStart.value}px`,
          top: 0
        };
      }
      const itemSharedProps = {
        prefixCls: itemPrefixCls.value,
        responsive: isResponsive.value,
        component: itemComponent,
        invalidate: invalidate.value
      };
      const internalRenderItemNode = renderRawItem ? (item, index) => {
        const key = getKey(item, index);
        return createVNode(OverflowContextProvider, {
          "key": key,
          "value": _extends(_extends({}, itemSharedProps), {
            order: index,
            item,
            itemKey: key,
            registerSize,
            display: index <= mergedDisplayCount.value
          })
        }, {
          default: () => [renderRawItem(item, index)]
        });
      } : (item, index) => {
        const key = getKey(item, index);
        return createVNode(Item, _objectSpread$9(_objectSpread$9({}, itemSharedProps), {}, {
          "order": index,
          "key": key,
          "item": item,
          "renderItem": mergedRenderItem.value,
          "itemKey": key,
          "registerSize": registerSize,
          "display": index <= mergedDisplayCount.value
        }), null);
      };
      let restNode = () => null;
      const restContextProps = {
        order: displayRest ? mergedDisplayCount.value : Number.MAX_SAFE_INTEGER,
        className: `${itemPrefixCls.value} ${itemPrefixCls.value}-rest`,
        registerSize: registerOverflowSize,
        display: displayRest
      };
      if (!renderRawRest) {
        const mergedRenderRest = renderRest || defaultRenderRest;
        restNode = () => createVNode(Item, _objectSpread$9(_objectSpread$9({}, itemSharedProps), restContextProps), {
          default: () => typeof mergedRenderRest === "function" ? mergedRenderRest(omittedItems.value) : mergedRenderRest
        });
      } else if (renderRawRest) {
        restNode = () => createVNode(OverflowContextProvider, {
          "value": _extends(_extends({}, itemSharedProps), restContextProps)
        }, {
          default: () => [renderRawRest(omittedItems.value)]
        });
      }
      const overflowNode = () => {
        var _a;
        return createVNode(Component, _objectSpread$9({
          "id": id,
          "class": classNames(!invalidate.value && prefixCls, className),
          "style": style,
          "onMousedown": onMousedown
        }, restAttrs), {
          default: () => [mergedData.value.map(internalRenderItemNode), showRest.value ? restNode() : null, suffix && createVNode(Item, _objectSpread$9(_objectSpread$9({}, itemSharedProps), {}, {
            "order": mergedDisplayCount.value,
            "class": `${itemPrefixCls.value}-suffix`,
            "registerSize": registerSuffixSize,
            "display": true,
            "style": suffixStyle
          }), {
            default: () => suffix
          }), (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)]
        });
      };
      return createVNode(ResizeObserver, {
        "disabled": !isResponsive.value,
        "onResize": onOverflowResize
      }, {
        default: overflowNode
      });
    };
  }
});
Overflow.Item = RawItem;
Overflow.RESPONSIVE = RESPONSIVE;
Overflow.INVALIDATE = INVALIDATE;
const Overflow$1 = Overflow;
function useMergedState(defaultStateValue, option) {
  const {
    defaultValue,
    value = ref()
  } = option || {};
  let initValue = typeof defaultStateValue === "function" ? defaultStateValue() : defaultStateValue;
  if (value.value !== void 0) {
    initValue = unref(value);
  }
  if (defaultValue !== void 0) {
    initValue = typeof defaultValue === "function" ? defaultValue() : defaultValue;
  }
  const innerValue = ref(initValue);
  const mergedValue = ref(initValue);
  watchEffect(() => {
    let val = value.value !== void 0 ? value.value : innerValue.value;
    if (option.postState) {
      val = option.postState(val);
    }
    mergedValue.value = val;
  });
  function triggerChange(newValue) {
    const preVal = mergedValue.value;
    innerValue.value = newValue;
    if (toRaw(mergedValue.value) !== newValue && option.onChange) {
      option.onChange(newValue, preVal);
    }
  }
  watch(value, () => {
    innerValue.value = value.value;
  });
  return [mergedValue, triggerChange];
}
function useState(defaultStateValue) {
  const initValue = typeof defaultStateValue === "function" ? defaultStateValue() : defaultStateValue;
  const innerValue = ref(initValue);
  function triggerChange(newValue) {
    innerValue.value = newValue;
  }
  return [innerValue, triggerChange];
}
const initMotionCommon = (duration) => ({
  animationDuration: duration,
  animationFillMode: "both"
});
const initMotionCommonLeave = (duration) => ({
  animationDuration: duration,
  animationFillMode: "both"
});
const initMotion = function(motionCls, inKeyframes, outKeyframes, duration) {
  let sameLevel = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false;
  const sameLevelPrefix = sameLevel ? "&" : "";
  return {
    [`
      ${sameLevelPrefix}${motionCls}-enter,
      ${sameLevelPrefix}${motionCls}-appear
    `]: _extends(_extends({}, initMotionCommon(duration)), {
      animationPlayState: "paused"
    }),
    [`${sameLevelPrefix}${motionCls}-leave`]: _extends(_extends({}, initMotionCommonLeave(duration)), {
      animationPlayState: "paused"
    }),
    [`
      ${sameLevelPrefix}${motionCls}-enter${motionCls}-enter-active,
      ${sameLevelPrefix}${motionCls}-appear${motionCls}-appear-active
    `]: {
      animationName: inKeyframes,
      animationPlayState: "running"
    },
    [`${sameLevelPrefix}${motionCls}-leave${motionCls}-leave-active`]: {
      animationName: outKeyframes,
      animationPlayState: "running",
      pointerEvents: "none"
    }
  };
};
const slideUpIn = new Keyframes("antSlideUpIn", {
  "0%": {
    transform: "scaleY(0.8)",
    transformOrigin: "0% 0%",
    opacity: 0
  },
  "100%": {
    transform: "scaleY(1)",
    transformOrigin: "0% 0%",
    opacity: 1
  }
});
const slideUpOut = new Keyframes("antSlideUpOut", {
  "0%": {
    transform: "scaleY(1)",
    transformOrigin: "0% 0%",
    opacity: 1
  },
  "100%": {
    transform: "scaleY(0.8)",
    transformOrigin: "0% 0%",
    opacity: 0
  }
});
const slideDownIn = new Keyframes("antSlideDownIn", {
  "0%": {
    transform: "scaleY(0.8)",
    transformOrigin: "100% 100%",
    opacity: 0
  },
  "100%": {
    transform: "scaleY(1)",
    transformOrigin: "100% 100%",
    opacity: 1
  }
});
const slideDownOut = new Keyframes("antSlideDownOut", {
  "0%": {
    transform: "scaleY(1)",
    transformOrigin: "100% 100%",
    opacity: 1
  },
  "100%": {
    transform: "scaleY(0.8)",
    transformOrigin: "100% 100%",
    opacity: 0
  }
});
const slideLeftIn = new Keyframes("antSlideLeftIn", {
  "0%": {
    transform: "scaleX(0.8)",
    transformOrigin: "0% 0%",
    opacity: 0
  },
  "100%": {
    transform: "scaleX(1)",
    transformOrigin: "0% 0%",
    opacity: 1
  }
});
const slideLeftOut = new Keyframes("antSlideLeftOut", {
  "0%": {
    transform: "scaleX(1)",
    transformOrigin: "0% 0%",
    opacity: 1
  },
  "100%": {
    transform: "scaleX(0.8)",
    transformOrigin: "0% 0%",
    opacity: 0
  }
});
const slideRightIn = new Keyframes("antSlideRightIn", {
  "0%": {
    transform: "scaleX(0.8)",
    transformOrigin: "100% 0%",
    opacity: 0
  },
  "100%": {
    transform: "scaleX(1)",
    transformOrigin: "100% 0%",
    opacity: 1
  }
});
const slideRightOut = new Keyframes("antSlideRightOut", {
  "0%": {
    transform: "scaleX(1)",
    transformOrigin: "100% 0%",
    opacity: 1
  },
  "100%": {
    transform: "scaleX(0.8)",
    transformOrigin: "100% 0%",
    opacity: 0
  }
});
const slideMotion = {
  "slide-up": {
    inKeyframes: slideUpIn,
    outKeyframes: slideUpOut
  },
  "slide-down": {
    inKeyframes: slideDownIn,
    outKeyframes: slideDownOut
  },
  "slide-left": {
    inKeyframes: slideLeftIn,
    outKeyframes: slideLeftOut
  },
  "slide-right": {
    inKeyframes: slideRightIn,
    outKeyframes: slideRightOut
  }
};
const initSlideMotion = (token, motionName) => {
  const {
    antCls
  } = token;
  const motionCls = `${antCls}-${motionName}`;
  const {
    inKeyframes,
    outKeyframes
  } = slideMotion[motionName];
  return [initMotion(motionCls, inKeyframes, outKeyframes, token.motionDurationMid), {
    [`
      ${motionCls}-enter,
      ${motionCls}-appear
    `]: {
      transform: "scale(0)",
      transformOrigin: "0% 0%",
      opacity: 0,
      animationTimingFunction: token.motionEaseOutQuint
    },
    [`${motionCls}-leave`]: {
      animationTimingFunction: token.motionEaseInQuint
    }
  }];
};
const zoomIn = new Keyframes("antZoomIn", {
  "0%": {
    transform: "scale(0.2)",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    opacity: 1
  }
});
const zoomOut = new Keyframes("antZoomOut", {
  "0%": {
    transform: "scale(1)"
  },
  "100%": {
    transform: "scale(0.2)",
    opacity: 0
  }
});
const zoomBigIn = new Keyframes("antZoomBigIn", {
  "0%": {
    transform: "scale(0.8)",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    opacity: 1
  }
});
const zoomBigOut = new Keyframes("antZoomBigOut", {
  "0%": {
    transform: "scale(1)"
  },
  "100%": {
    transform: "scale(0.8)",
    opacity: 0
  }
});
const zoomUpIn = new Keyframes("antZoomUpIn", {
  "0%": {
    transform: "scale(0.8)",
    transformOrigin: "50% 0%",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    transformOrigin: "50% 0%"
  }
});
const zoomUpOut = new Keyframes("antZoomUpOut", {
  "0%": {
    transform: "scale(1)",
    transformOrigin: "50% 0%"
  },
  "100%": {
    transform: "scale(0.8)",
    transformOrigin: "50% 0%",
    opacity: 0
  }
});
const zoomLeftIn = new Keyframes("antZoomLeftIn", {
  "0%": {
    transform: "scale(0.8)",
    transformOrigin: "0% 50%",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    transformOrigin: "0% 50%"
  }
});
const zoomLeftOut = new Keyframes("antZoomLeftOut", {
  "0%": {
    transform: "scale(1)",
    transformOrigin: "0% 50%"
  },
  "100%": {
    transform: "scale(0.8)",
    transformOrigin: "0% 50%",
    opacity: 0
  }
});
const zoomRightIn = new Keyframes("antZoomRightIn", {
  "0%": {
    transform: "scale(0.8)",
    transformOrigin: "100% 50%",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    transformOrigin: "100% 50%"
  }
});
const zoomRightOut = new Keyframes("antZoomRightOut", {
  "0%": {
    transform: "scale(1)",
    transformOrigin: "100% 50%"
  },
  "100%": {
    transform: "scale(0.8)",
    transformOrigin: "100% 50%",
    opacity: 0
  }
});
const zoomDownIn = new Keyframes("antZoomDownIn", {
  "0%": {
    transform: "scale(0.8)",
    transformOrigin: "50% 100%",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)",
    transformOrigin: "50% 100%"
  }
});
const zoomDownOut = new Keyframes("antZoomDownOut", {
  "0%": {
    transform: "scale(1)",
    transformOrigin: "50% 100%"
  },
  "100%": {
    transform: "scale(0.8)",
    transformOrigin: "50% 100%",
    opacity: 0
  }
});
const zoomMotion = {
  zoom: {
    inKeyframes: zoomIn,
    outKeyframes: zoomOut
  },
  "zoom-big": {
    inKeyframes: zoomBigIn,
    outKeyframes: zoomBigOut
  },
  "zoom-big-fast": {
    inKeyframes: zoomBigIn,
    outKeyframes: zoomBigOut
  },
  "zoom-left": {
    inKeyframes: zoomLeftIn,
    outKeyframes: zoomLeftOut
  },
  "zoom-right": {
    inKeyframes: zoomRightIn,
    outKeyframes: zoomRightOut
  },
  "zoom-up": {
    inKeyframes: zoomUpIn,
    outKeyframes: zoomUpOut
  },
  "zoom-down": {
    inKeyframes: zoomDownIn,
    outKeyframes: zoomDownOut
  }
};
const initZoomMotion = (token, motionName) => {
  const {
    antCls
  } = token;
  const motionCls = `${antCls}-${motionName}`;
  const {
    inKeyframes,
    outKeyframes
  } = zoomMotion[motionName];
  return [initMotion(motionCls, inKeyframes, outKeyframes, motionName === "zoom-big-fast" ? token.motionDurationFast : token.motionDurationMid), {
    [`
        ${motionCls}-enter,
        ${motionCls}-appear
      `]: {
      transform: "scale(0)",
      opacity: 0,
      animationTimingFunction: token.motionEaseOutCirc,
      "&-prepare": {
        transform: "none"
      }
    },
    [`${motionCls}-leave`]: {
      animationTimingFunction: token.motionEaseInOutCirc
    }
  }];
};
const genCollapseMotion = (token) => ({
  [token.componentCls]: {
    // For common/openAnimation
    [`${token.antCls}-motion-collapse-legacy`]: {
      overflow: "hidden",
      "&-active": {
        transition: `height ${token.motionDurationMid} ${token.motionEaseInOut},
        opacity ${token.motionDurationMid} ${token.motionEaseInOut} !important`
      }
    },
    [`${token.antCls}-motion-collapse`]: {
      overflow: "hidden",
      transition: `height ${token.motionDurationMid} ${token.motionEaseInOut},
        opacity ${token.motionDurationMid} ${token.motionEaseInOut} !important`
    }
  }
});
const genCollapseMotion$1 = genCollapseMotion;
const autoAdjustOverflow$2 = {
  adjustX: 1,
  adjustY: 1
};
const targetOffset$2 = [0, 0];
const placements$3 = {
  left: {
    points: ["cr", "cl"],
    overflow: autoAdjustOverflow$2,
    offset: [-4, 0],
    targetOffset: targetOffset$2
  },
  right: {
    points: ["cl", "cr"],
    overflow: autoAdjustOverflow$2,
    offset: [4, 0],
    targetOffset: targetOffset$2
  },
  top: {
    points: ["bc", "tc"],
    overflow: autoAdjustOverflow$2,
    offset: [0, -4],
    targetOffset: targetOffset$2
  },
  bottom: {
    points: ["tc", "bc"],
    overflow: autoAdjustOverflow$2,
    offset: [0, 4],
    targetOffset: targetOffset$2
  },
  topLeft: {
    points: ["bl", "tl"],
    overflow: autoAdjustOverflow$2,
    offset: [0, -4],
    targetOffset: targetOffset$2
  },
  leftTop: {
    points: ["tr", "tl"],
    overflow: autoAdjustOverflow$2,
    offset: [-4, 0],
    targetOffset: targetOffset$2
  },
  topRight: {
    points: ["br", "tr"],
    overflow: autoAdjustOverflow$2,
    offset: [0, -4],
    targetOffset: targetOffset$2
  },
  rightTop: {
    points: ["tl", "tr"],
    overflow: autoAdjustOverflow$2,
    offset: [4, 0],
    targetOffset: targetOffset$2
  },
  bottomRight: {
    points: ["tr", "br"],
    overflow: autoAdjustOverflow$2,
    offset: [0, 4],
    targetOffset: targetOffset$2
  },
  rightBottom: {
    points: ["bl", "br"],
    overflow: autoAdjustOverflow$2,
    offset: [4, 0],
    targetOffset: targetOffset$2
  },
  bottomLeft: {
    points: ["tl", "bl"],
    overflow: autoAdjustOverflow$2,
    offset: [0, 4],
    targetOffset: targetOffset$2
  },
  leftBottom: {
    points: ["br", "bl"],
    overflow: autoAdjustOverflow$2,
    offset: [-4, 0],
    targetOffset: targetOffset$2
  }
};
const tooltipContentProps = {
  prefixCls: String,
  id: String,
  overlayInnerStyle: PropTypes$1.any
};
const Content$1 = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "TooltipContent",
  props: tooltipContentProps,
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    return () => {
      var _a;
      return createVNode("div", {
        "class": `${props.prefixCls}-inner`,
        "id": props.id,
        "role": "tooltip",
        "style": props.overlayInnerStyle
      }, [(_a = slots.overlay) === null || _a === void 0 ? void 0 : _a.call(slots)]);
    };
  }
});
var __rest$2 = globalThis && globalThis.__rest || function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
function noop() {
}
const Tooltip$1 = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "Tooltip",
  inheritAttrs: false,
  props: {
    trigger: PropTypes$1.any.def(["hover"]),
    defaultVisible: {
      type: Boolean,
      default: void 0
    },
    visible: {
      type: Boolean,
      default: void 0
    },
    placement: PropTypes$1.string.def("right"),
    transitionName: String,
    animation: PropTypes$1.any,
    afterVisibleChange: PropTypes$1.func.def(() => {
    }),
    overlayStyle: {
      type: Object,
      default: void 0
    },
    overlayClassName: String,
    prefixCls: PropTypes$1.string.def("rc-tooltip"),
    mouseEnterDelay: PropTypes$1.number.def(0.1),
    mouseLeaveDelay: PropTypes$1.number.def(0.1),
    getPopupContainer: Function,
    destroyTooltipOnHide: {
      type: Boolean,
      default: false
    },
    align: PropTypes$1.object.def(() => ({})),
    arrowContent: PropTypes$1.any.def(null),
    tipId: String,
    builtinPlacements: PropTypes$1.object,
    overlayInnerStyle: {
      type: Object,
      default: void 0
    },
    popupVisible: {
      type: Boolean,
      default: void 0
    },
    onVisibleChange: Function,
    onPopupAlign: Function
  },
  setup(props, _ref) {
    let {
      slots,
      attrs,
      expose
    } = _ref;
    const triggerDOM = shallowRef();
    const getPopupElement = () => {
      const {
        prefixCls,
        tipId,
        overlayInnerStyle
      } = props;
      return [createVNode("div", {
        "class": `${prefixCls}-arrow`,
        "key": "arrow"
      }, [getPropsSlot(slots, props, "arrowContent")]), createVNode(Content$1, {
        "key": "content",
        "prefixCls": prefixCls,
        "id": tipId,
        "overlayInnerStyle": overlayInnerStyle
      }, {
        overlay: slots.overlay
      })];
    };
    const getPopupDomNode = () => {
      return triggerDOM.value.getPopupDomNode();
    };
    expose({
      getPopupDomNode,
      triggerDOM,
      forcePopupAlign: () => {
        var _a;
        return (_a = triggerDOM.value) === null || _a === void 0 ? void 0 : _a.forcePopupAlign();
      }
    });
    const destroyTooltip = shallowRef(false);
    const autoDestroy = shallowRef(false);
    watchEffect(() => {
      const {
        destroyTooltipOnHide
      } = props;
      if (typeof destroyTooltipOnHide === "boolean") {
        destroyTooltip.value = destroyTooltipOnHide;
      } else if (destroyTooltipOnHide && typeof destroyTooltipOnHide === "object") {
        const {
          keepParent
        } = destroyTooltipOnHide;
        destroyTooltip.value = keepParent === true;
        autoDestroy.value = keepParent === false;
      }
    });
    return () => {
      const {
        overlayClassName,
        trigger,
        mouseEnterDelay,
        mouseLeaveDelay,
        overlayStyle,
        prefixCls,
        afterVisibleChange,
        transitionName,
        animation,
        placement,
        align,
        destroyTooltipOnHide,
        defaultVisible
      } = props, restProps = __rest$2(props, ["overlayClassName", "trigger", "mouseEnterDelay", "mouseLeaveDelay", "overlayStyle", "prefixCls", "afterVisibleChange", "transitionName", "animation", "placement", "align", "destroyTooltipOnHide", "defaultVisible"]);
      const extraProps = _extends({}, restProps);
      if (props.visible !== void 0) {
        extraProps.popupVisible = props.visible;
      }
      const triggerProps2 = _extends(_extends(_extends({
        popupClassName: overlayClassName,
        prefixCls,
        action: trigger,
        builtinPlacements: placements$3,
        popupPlacement: placement,
        popupAlign: align,
        afterPopupVisibleChange: afterVisibleChange,
        popupTransitionName: transitionName,
        popupAnimation: animation,
        defaultPopupVisible: defaultVisible,
        destroyPopupOnHide: destroyTooltip.value,
        autoDestroy: autoDestroy.value,
        mouseLeaveDelay,
        popupStyle: overlayStyle,
        mouseEnterDelay
      }, extraProps), attrs), {
        onPopupVisibleChange: props.onVisibleChange || noop,
        onPopupAlign: props.onPopupAlign || noop,
        ref: triggerDOM,
        popup: getPopupElement()
      });
      return createVNode(Trigger, triggerProps2, {
        default: slots.default
      });
    };
  }
});
const abstractTooltipProps = () => ({
  trigger: [String, Array],
  open: {
    type: Boolean,
    default: void 0
  },
  /** @deprecated Please use `open` instead. */
  visible: {
    type: Boolean,
    default: void 0
  },
  placement: String,
  color: String,
  transitionName: String,
  overlayStyle: objectType(),
  overlayInnerStyle: objectType(),
  overlayClassName: String,
  openClassName: String,
  prefixCls: String,
  mouseEnterDelay: Number,
  mouseLeaveDelay: Number,
  getPopupContainer: Function,
  arrowPointAtCenter: {
    type: Boolean,
    default: void 0
  },
  autoAdjustOverflow: {
    type: [Boolean, Object],
    default: void 0
  },
  destroyTooltipOnHide: {
    type: Boolean,
    default: void 0
  },
  align: objectType(),
  builtinPlacements: objectType(),
  children: Array,
  /** @deprecated Please use `onOpenChange` instead. */
  onVisibleChange: Function,
  /** @deprecated Please use `onUpdate:open` instead. */
  "onUpdate:visible": Function,
  onOpenChange: Function,
  "onUpdate:open": Function
});
const autoAdjustOverflowEnabled = {
  adjustX: 1,
  adjustY: 1
};
const autoAdjustOverflowDisabled = {
  adjustX: 0,
  adjustY: 0
};
const targetOffset$1 = [0, 0];
function getOverflowOptions(autoAdjustOverflow2) {
  if (typeof autoAdjustOverflow2 === "boolean") {
    return autoAdjustOverflow2 ? autoAdjustOverflowEnabled : autoAdjustOverflowDisabled;
  }
  return _extends(_extends({}, autoAdjustOverflowDisabled), autoAdjustOverflow2);
}
function getPlacements(config) {
  const {
    arrowWidth = 4,
    horizontalArrowShift = 16,
    verticalArrowShift = 8,
    autoAdjustOverflow: autoAdjustOverflow2,
    arrowPointAtCenter
  } = config;
  const placementMap = {
    left: {
      points: ["cr", "cl"],
      offset: [-4, 0]
    },
    right: {
      points: ["cl", "cr"],
      offset: [4, 0]
    },
    top: {
      points: ["bc", "tc"],
      offset: [0, -4]
    },
    bottom: {
      points: ["tc", "bc"],
      offset: [0, 4]
    },
    topLeft: {
      points: ["bl", "tc"],
      offset: [-(horizontalArrowShift + arrowWidth), -4]
    },
    leftTop: {
      points: ["tr", "cl"],
      offset: [-4, -(verticalArrowShift + arrowWidth)]
    },
    topRight: {
      points: ["br", "tc"],
      offset: [horizontalArrowShift + arrowWidth, -4]
    },
    rightTop: {
      points: ["tl", "cr"],
      offset: [4, -(verticalArrowShift + arrowWidth)]
    },
    bottomRight: {
      points: ["tr", "bc"],
      offset: [horizontalArrowShift + arrowWidth, 4]
    },
    rightBottom: {
      points: ["bl", "cr"],
      offset: [4, verticalArrowShift + arrowWidth]
    },
    bottomLeft: {
      points: ["tl", "bc"],
      offset: [-(horizontalArrowShift + arrowWidth), 4]
    },
    leftBottom: {
      points: ["br", "cl"],
      offset: [-4, verticalArrowShift + arrowWidth]
    }
  };
  Object.keys(placementMap).forEach((key) => {
    placementMap[key] = arrowPointAtCenter ? _extends(_extends({}, placementMap[key]), {
      overflow: getOverflowOptions(autoAdjustOverflow2),
      targetOffset: targetOffset$1
    }) : _extends(_extends({}, placements$3[key]), {
      overflow: getOverflowOptions(autoAdjustOverflow2)
    });
    placementMap[key].ignoreShake = true;
  });
  return placementMap;
}
function firstNotUndefined() {
  let arr = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i] !== void 0) {
      return arr[i];
    }
  }
  return void 0;
}
const inverseColors = PresetColors.map((color) => `${color}-inverse`);
function isPresetColor(color) {
  let includeInverse = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  if (includeInverse) {
    return [...inverseColors, ...PresetColors].includes(color);
  }
  return PresetColors.includes(color);
}
function parseColor(prefixCls, color) {
  const isInternalColor = isPresetColor(color);
  const className = classNames({
    [`${prefixCls}-${color}`]: color && isInternalColor
  });
  const overlayStyle = {};
  const arrowStyle = {};
  if (color && !isInternalColor) {
    overlayStyle.background = color;
    arrowStyle["--antd-arrow-background-color"] = color;
  }
  return {
    className,
    overlayStyle,
    arrowStyle
  };
}
function connectArrowCls(classList) {
  let showArrowCls = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  return classList.map((cls) => `${showArrowCls}${cls}`).join(",");
}
const MAX_VERTICAL_CONTENT_RADIUS = 8;
function getArrowOffset(options) {
  const maxVerticalContentRadius = MAX_VERTICAL_CONTENT_RADIUS;
  const {
    sizePopupArrow,
    contentRadius,
    borderRadiusOuter,
    limitVerticalRadius
  } = options;
  const arrowInnerOffset = sizePopupArrow / 2 - Math.ceil(borderRadiusOuter * (Math.sqrt(2) - 1));
  const dropdownArrowOffset = (contentRadius > 12 ? contentRadius + 2 : 12) - arrowInnerOffset;
  const dropdownArrowOffsetVertical = limitVerticalRadius ? maxVerticalContentRadius - arrowInnerOffset : dropdownArrowOffset;
  return {
    dropdownArrowOffset,
    dropdownArrowOffsetVertical
  };
}
function getArrowStyle(token, options) {
  const {
    componentCls,
    sizePopupArrow,
    marginXXS,
    borderRadiusXS,
    borderRadiusOuter,
    boxShadowPopoverArrow
  } = token;
  const {
    colorBg,
    showArrowCls,
    contentRadius = token.borderRadiusLG,
    limitVerticalRadius
  } = options;
  const {
    dropdownArrowOffsetVertical,
    dropdownArrowOffset
  } = getArrowOffset({
    sizePopupArrow,
    contentRadius,
    borderRadiusOuter,
    limitVerticalRadius
  });
  const dropdownArrowDistance = sizePopupArrow / 2 + marginXXS;
  return {
    [componentCls]: {
      // ============================ Basic ============================
      [`${componentCls}-arrow`]: [_extends(_extends({
        position: "absolute",
        zIndex: 1,
        display: "block"
      }, roundedArrow(sizePopupArrow, borderRadiusXS, borderRadiusOuter, colorBg, boxShadowPopoverArrow)), {
        "&:before": {
          background: colorBg
        }
      })],
      // ========================== Placement ==========================
      // Here handle the arrow position and rotate stuff
      // >>>>> Top
      [[`&-placement-top ${componentCls}-arrow`, `&-placement-topLeft ${componentCls}-arrow`, `&-placement-topRight ${componentCls}-arrow`].join(",")]: {
        bottom: 0,
        transform: "translateY(100%) rotate(180deg)"
      },
      [`&-placement-top ${componentCls}-arrow`]: {
        left: {
          _skip_check_: true,
          value: "50%"
        },
        transform: "translateX(-50%) translateY(100%) rotate(180deg)"
      },
      [`&-placement-topLeft ${componentCls}-arrow`]: {
        left: {
          _skip_check_: true,
          value: dropdownArrowOffset
        }
      },
      [`&-placement-topRight ${componentCls}-arrow`]: {
        right: {
          _skip_check_: true,
          value: dropdownArrowOffset
        }
      },
      // >>>>> Bottom
      [[`&-placement-bottom ${componentCls}-arrow`, `&-placement-bottomLeft ${componentCls}-arrow`, `&-placement-bottomRight ${componentCls}-arrow`].join(",")]: {
        top: 0,
        transform: `translateY(-100%)`
      },
      [`&-placement-bottom ${componentCls}-arrow`]: {
        left: {
          _skip_check_: true,
          value: "50%"
        },
        transform: `translateX(-50%) translateY(-100%)`
      },
      [`&-placement-bottomLeft ${componentCls}-arrow`]: {
        left: {
          _skip_check_: true,
          value: dropdownArrowOffset
        }
      },
      [`&-placement-bottomRight ${componentCls}-arrow`]: {
        right: {
          _skip_check_: true,
          value: dropdownArrowOffset
        }
      },
      // >>>>> Left
      [[`&-placement-left ${componentCls}-arrow`, `&-placement-leftTop ${componentCls}-arrow`, `&-placement-leftBottom ${componentCls}-arrow`].join(",")]: {
        right: {
          _skip_check_: true,
          value: 0
        },
        transform: "translateX(100%) rotate(90deg)"
      },
      [`&-placement-left ${componentCls}-arrow`]: {
        top: {
          _skip_check_: true,
          value: "50%"
        },
        transform: "translateY(-50%) translateX(100%) rotate(90deg)"
      },
      [`&-placement-leftTop ${componentCls}-arrow`]: {
        top: dropdownArrowOffsetVertical
      },
      [`&-placement-leftBottom ${componentCls}-arrow`]: {
        bottom: dropdownArrowOffsetVertical
      },
      // >>>>> Right
      [[`&-placement-right ${componentCls}-arrow`, `&-placement-rightTop ${componentCls}-arrow`, `&-placement-rightBottom ${componentCls}-arrow`].join(",")]: {
        left: {
          _skip_check_: true,
          value: 0
        },
        transform: "translateX(-100%) rotate(-90deg)"
      },
      [`&-placement-right ${componentCls}-arrow`]: {
        top: {
          _skip_check_: true,
          value: "50%"
        },
        transform: "translateY(-50%) translateX(-100%) rotate(-90deg)"
      },
      [`&-placement-rightTop ${componentCls}-arrow`]: {
        top: dropdownArrowOffsetVertical
      },
      [`&-placement-rightBottom ${componentCls}-arrow`]: {
        bottom: dropdownArrowOffsetVertical
      },
      // =========================== Offset ============================
      // Offset the popover to account for the dropdown arrow
      // >>>>> Top
      [connectArrowCls([`&-placement-topLeft`, `&-placement-top`, `&-placement-topRight`], showArrowCls)]: {
        paddingBottom: dropdownArrowDistance
      },
      // >>>>> Bottom
      [connectArrowCls([`&-placement-bottomLeft`, `&-placement-bottom`, `&-placement-bottomRight`], showArrowCls)]: {
        paddingTop: dropdownArrowDistance
      },
      // >>>>> Left
      [connectArrowCls([`&-placement-leftTop`, `&-placement-left`, `&-placement-leftBottom`], showArrowCls)]: {
        paddingRight: {
          _skip_check_: true,
          value: dropdownArrowDistance
        }
      },
      // >>>>> Right
      [connectArrowCls([`&-placement-rightTop`, `&-placement-right`, `&-placement-rightBottom`], showArrowCls)]: {
        paddingLeft: {
          _skip_check_: true,
          value: dropdownArrowDistance
        }
      }
    }
  };
}
const genTooltipStyle = (token) => {
  const {
    componentCls,
    // ant-tooltip
    tooltipMaxWidth,
    tooltipColor,
    tooltipBg,
    tooltipBorderRadius,
    zIndexPopup,
    controlHeight,
    boxShadowSecondary,
    paddingSM,
    paddingXS,
    tooltipRadiusOuter
  } = token;
  return [
    {
      [componentCls]: _extends(_extends(_extends(_extends({}, resetComponent(token)), {
        position: "absolute",
        zIndex: zIndexPopup,
        display: "block",
        "&": [{
          width: "max-content"
        }, {
          width: "intrinsic"
        }],
        maxWidth: tooltipMaxWidth,
        visibility: "visible",
        "&-hidden": {
          display: "none"
        },
        "--antd-arrow-background-color": tooltipBg,
        // Wrapper for the tooltip content
        [`${componentCls}-inner`]: {
          minWidth: controlHeight,
          minHeight: controlHeight,
          padding: `${paddingSM / 2}px ${paddingXS}px`,
          color: tooltipColor,
          textAlign: "start",
          textDecoration: "none",
          wordWrap: "break-word",
          backgroundColor: tooltipBg,
          borderRadius: tooltipBorderRadius,
          boxShadow: boxShadowSecondary
        },
        // Limit left and right placement radius
        [[`&-placement-left`, `&-placement-leftTop`, `&-placement-leftBottom`, `&-placement-right`, `&-placement-rightTop`, `&-placement-rightBottom`].join(",")]: {
          [`${componentCls}-inner`]: {
            borderRadius: Math.min(tooltipBorderRadius, MAX_VERTICAL_CONTENT_RADIUS)
          }
        },
        [`${componentCls}-content`]: {
          position: "relative"
        }
      }), genPresetColor(token, (colorKey, _ref) => {
        let {
          darkColor
        } = _ref;
        return {
          [`&${componentCls}-${colorKey}`]: {
            [`${componentCls}-inner`]: {
              backgroundColor: darkColor
            },
            [`${componentCls}-arrow`]: {
              "--antd-arrow-background-color": darkColor
            }
          }
        };
      })), {
        // RTL
        "&-rtl": {
          direction: "rtl"
        }
      })
    },
    // Arrow Style
    getArrowStyle(merge(token, {
      borderRadiusOuter: tooltipRadiusOuter
    }), {
      colorBg: "var(--antd-arrow-background-color)",
      showArrowCls: "",
      contentRadius: tooltipBorderRadius,
      limitVerticalRadius: true
    }),
    // Pure Render
    {
      [`${componentCls}-pure`]: {
        position: "relative",
        maxWidth: "none"
      }
    }
  ];
};
const useStyle$4 = (prefixCls, injectStyle) => {
  const useOriginHook = genComponentStyleHook("Tooltip", (token) => {
    if ((injectStyle === null || injectStyle === void 0 ? void 0 : injectStyle.value) === false) {
      return [];
    }
    const {
      borderRadius,
      colorTextLightSolid,
      colorBgDefault,
      borderRadiusOuter
    } = token;
    const TooltipToken = merge(token, {
      // default variables
      tooltipMaxWidth: 250,
      tooltipColor: colorTextLightSolid,
      tooltipBorderRadius: borderRadius,
      tooltipBg: colorBgDefault,
      tooltipRadiusOuter: borderRadiusOuter > 4 ? 4 : borderRadiusOuter
    });
    return [genTooltipStyle(TooltipToken), initZoomMotion(token, "zoom-big-fast")];
  }, (_ref2) => {
    let {
      zIndexPopupBase,
      colorBgSpotlight
    } = _ref2;
    return {
      zIndexPopup: zIndexPopupBase + 70,
      colorBgDefault: colorBgSpotlight
    };
  });
  return useOriginHook(prefixCls);
};
const splitObject = (obj, keys) => {
  const picked = {};
  const omitted = _extends({}, obj);
  keys.forEach((key) => {
    if (obj && key in obj) {
      picked[key] = obj[key];
      delete omitted[key];
    }
  });
  return {
    picked,
    omitted
  };
};
const tooltipProps = () => _extends(_extends({}, abstractTooltipProps()), {
  title: PropTypes$1.any
});
const ToolTip = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ATooltip",
  inheritAttrs: false,
  props: initDefaultProps$1(tooltipProps(), {
    trigger: "hover",
    align: {},
    placement: "top",
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1,
    arrowPointAtCenter: false,
    autoAdjustOverflow: true
  }),
  slots: Object,
  // emits: ['update:visible', 'visibleChange'],
  setup(props, _ref) {
    let {
      slots,
      emit,
      attrs,
      expose
    } = _ref;
    const {
      prefixCls,
      getPopupContainer,
      direction,
      rootPrefixCls
    } = useConfigInject("tooltip", props);
    const mergedOpen = computed(() => {
      var _a;
      return (_a = props.open) !== null && _a !== void 0 ? _a : props.visible;
    });
    const innerOpen = ref(firstNotUndefined([props.open, props.visible]));
    const tooltip = ref();
    let rafId;
    watch(mergedOpen, (val) => {
      wrapperRaf.cancel(rafId);
      rafId = wrapperRaf(() => {
        innerOpen.value = !!val;
      });
    });
    const isNoTitle = () => {
      var _a;
      const title = (_a = props.title) !== null && _a !== void 0 ? _a : slots.title;
      return !title && title !== 0;
    };
    const handleVisibleChange = (val) => {
      const noTitle = isNoTitle();
      if (mergedOpen.value === void 0) {
        innerOpen.value = noTitle ? false : val;
      }
      if (!noTitle) {
        emit("update:visible", val);
        emit("visibleChange", val);
        emit("update:open", val);
        emit("openChange", val);
      }
    };
    const getPopupDomNode = () => {
      return tooltip.value.getPopupDomNode();
    };
    expose({
      getPopupDomNode,
      open: innerOpen,
      forcePopupAlign: () => {
        var _a;
        return (_a = tooltip.value) === null || _a === void 0 ? void 0 : _a.forcePopupAlign();
      }
    });
    const tooltipPlacements = computed(() => {
      const {
        builtinPlacements,
        arrowPointAtCenter,
        autoAdjustOverflow: autoAdjustOverflow2
      } = props;
      return builtinPlacements || getPlacements({
        arrowPointAtCenter,
        autoAdjustOverflow: autoAdjustOverflow2
      });
    });
    const isTrueProps = (val) => {
      return val || val === "";
    };
    const getDisabledCompatibleChildren = (ele) => {
      const elementType = ele.type;
      if (typeof elementType === "object" && ele.props) {
        if ((elementType.__ANT_BUTTON === true || elementType === "button") && isTrueProps(ele.props.disabled) || elementType.__ANT_SWITCH === true && (isTrueProps(ele.props.disabled) || isTrueProps(ele.props.loading)) || elementType.__ANT_RADIO === true && isTrueProps(ele.props.disabled)) {
          const {
            picked,
            omitted
          } = splitObject(getStyle(ele), ["position", "left", "right", "top", "bottom", "float", "display", "zIndex"]);
          const spanStyle = _extends(_extends({
            display: "inline-block"
          }, picked), {
            cursor: "not-allowed",
            lineHeight: 1,
            width: ele.props && ele.props.block ? "100%" : void 0
          });
          const buttonStyle = _extends(_extends({}, omitted), {
            pointerEvents: "none"
          });
          const child = cloneElement(ele, {
            style: buttonStyle
          }, true);
          return createVNode("span", {
            "style": spanStyle,
            "class": `${prefixCls.value}-disabled-compatible-wrapper`
          }, [child]);
        }
      }
      return ele;
    };
    const getOverlay = () => {
      var _a, _b;
      return (_a = props.title) !== null && _a !== void 0 ? _a : (_b = slots.title) === null || _b === void 0 ? void 0 : _b.call(slots);
    };
    const onPopupAlign = (domNode, align) => {
      const placements2 = tooltipPlacements.value;
      const placement = Object.keys(placements2).find((key) => {
        var _a, _b;
        return placements2[key].points[0] === ((_a = align.points) === null || _a === void 0 ? void 0 : _a[0]) && placements2[key].points[1] === ((_b = align.points) === null || _b === void 0 ? void 0 : _b[1]);
      });
      if (placement) {
        const rect = domNode.getBoundingClientRect();
        const transformOrigin = {
          top: "50%",
          left: "50%"
        };
        if (placement.indexOf("top") >= 0 || placement.indexOf("Bottom") >= 0) {
          transformOrigin.top = `${rect.height - align.offset[1]}px`;
        } else if (placement.indexOf("Top") >= 0 || placement.indexOf("bottom") >= 0) {
          transformOrigin.top = `${-align.offset[1]}px`;
        }
        if (placement.indexOf("left") >= 0 || placement.indexOf("Right") >= 0) {
          transformOrigin.left = `${rect.width - align.offset[0]}px`;
        } else if (placement.indexOf("right") >= 0 || placement.indexOf("Left") >= 0) {
          transformOrigin.left = `${-align.offset[0]}px`;
        }
        domNode.style.transformOrigin = `${transformOrigin.left} ${transformOrigin.top}`;
      }
    };
    const colorInfo = computed(() => parseColor(prefixCls.value, props.color));
    const injectFromPopover = computed(() => attrs["data-popover-inject"]);
    const [wrapSSR, hashId] = useStyle$4(prefixCls, computed(() => !injectFromPopover.value));
    return () => {
      var _a, _b;
      const {
        openClassName,
        overlayClassName,
        overlayStyle,
        overlayInnerStyle
      } = props;
      let children = (_b = filterEmpty((_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots))) !== null && _b !== void 0 ? _b : null;
      children = children.length === 1 ? children[0] : children;
      let tempVisible = innerOpen.value;
      if (mergedOpen.value === void 0 && isNoTitle()) {
        tempVisible = false;
      }
      if (!children) {
        return null;
      }
      const child = getDisabledCompatibleChildren(isValidElement(children) && !isFragment(children) ? children : createVNode("span", null, [children]));
      const childCls = classNames({
        [openClassName || `${prefixCls.value}-open`]: true,
        [child.props && child.props.class]: child.props && child.props.class
      });
      const customOverlayClassName = classNames(overlayClassName, {
        [`${prefixCls.value}-rtl`]: direction.value === "rtl"
      }, colorInfo.value.className, hashId.value);
      const formattedOverlayInnerStyle = _extends(_extends({}, colorInfo.value.overlayStyle), overlayInnerStyle);
      const arrowContentStyle = colorInfo.value.arrowStyle;
      const vcTooltipProps = _extends(_extends(_extends({}, attrs), props), {
        prefixCls: prefixCls.value,
        getPopupContainer: getPopupContainer === null || getPopupContainer === void 0 ? void 0 : getPopupContainer.value,
        builtinPlacements: tooltipPlacements.value,
        visible: tempVisible,
        ref: tooltip,
        overlayClassName: customOverlayClassName,
        overlayStyle: _extends(_extends({}, arrowContentStyle), overlayStyle),
        overlayInnerStyle: formattedOverlayInnerStyle,
        onVisibleChange: handleVisibleChange,
        onPopupAlign,
        transitionName: getTransitionName(rootPrefixCls.value, "zoom-big-fast", props.transitionName)
      });
      return wrapSSR(createVNode(Tooltip$1, vcTooltipProps, {
        default: () => [innerOpen.value ? cloneElement(child, {
          class: childCls
        }) : child],
        arrowContent: () => createVNode("span", {
          "class": `${prefixCls.value}-arrow-content`
        }, null),
        overlay: getOverlay
      }));
    };
  }
});
const Tooltip = withInstall(ToolTip);
const isNumeric = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};
const isNumeric$1 = isNumeric;
const autoAdjustOverflow$1 = {
  adjustX: 1,
  adjustY: 1
};
const targetOffset = [0, 0];
const placements$1 = {
  topLeft: {
    points: ["bl", "tl"],
    overflow: autoAdjustOverflow$1,
    offset: [0, -4],
    targetOffset
  },
  topCenter: {
    points: ["bc", "tc"],
    overflow: autoAdjustOverflow$1,
    offset: [0, -4],
    targetOffset
  },
  topRight: {
    points: ["br", "tr"],
    overflow: autoAdjustOverflow$1,
    offset: [0, -4],
    targetOffset
  },
  bottomLeft: {
    points: ["tl", "bl"],
    overflow: autoAdjustOverflow$1,
    offset: [0, 4],
    targetOffset
  },
  bottomCenter: {
    points: ["tc", "bc"],
    overflow: autoAdjustOverflow$1,
    offset: [0, 4],
    targetOffset
  },
  bottomRight: {
    points: ["tr", "br"],
    overflow: autoAdjustOverflow$1,
    offset: [0, 4],
    targetOffset
  }
};
const placements$2 = placements$1;
var __rest$1 = globalThis && globalThis.__rest || function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
const Dropdown = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  props: {
    minOverlayWidthMatchTrigger: {
      type: Boolean,
      default: void 0
    },
    arrow: {
      type: Boolean,
      default: false
    },
    prefixCls: PropTypes$1.string.def("rc-dropdown"),
    transitionName: String,
    overlayClassName: PropTypes$1.string.def(""),
    openClassName: String,
    animation: PropTypes$1.any,
    align: PropTypes$1.object,
    overlayStyle: {
      type: Object,
      default: void 0
    },
    placement: PropTypes$1.string.def("bottomLeft"),
    overlay: PropTypes$1.any,
    trigger: PropTypes$1.oneOfType([PropTypes$1.string, PropTypes$1.arrayOf(PropTypes$1.string)]).def("hover"),
    alignPoint: {
      type: Boolean,
      default: void 0
    },
    showAction: PropTypes$1.array,
    hideAction: PropTypes$1.array,
    getPopupContainer: Function,
    visible: {
      type: Boolean,
      default: void 0
    },
    defaultVisible: {
      type: Boolean,
      default: false
    },
    mouseEnterDelay: PropTypes$1.number.def(0.15),
    mouseLeaveDelay: PropTypes$1.number.def(0.1)
  },
  emits: ["visibleChange", "overlayClick"],
  setup(props, _ref) {
    let {
      slots,
      emit,
      expose
    } = _ref;
    const triggerVisible = ref(!!props.visible);
    watch(() => props.visible, (val) => {
      if (val !== void 0) {
        triggerVisible.value = val;
      }
    });
    const triggerRef = ref();
    expose({
      triggerRef
    });
    const onClick = (e) => {
      if (props.visible === void 0) {
        triggerVisible.value = false;
      }
      emit("overlayClick", e);
    };
    const onVisibleChange = (visible) => {
      if (props.visible === void 0) {
        triggerVisible.value = visible;
      }
      emit("visibleChange", visible);
    };
    const getMenuElement = () => {
      var _a;
      const overlayElement = (_a = slots.overlay) === null || _a === void 0 ? void 0 : _a.call(slots);
      const extraOverlayProps = {
        prefixCls: `${props.prefixCls}-menu`,
        onClick
      };
      return createVNode(Fragment, {
        "key": skipFlattenKey
      }, [props.arrow && createVNode("div", {
        "class": `${props.prefixCls}-arrow`
      }, null), cloneElement(overlayElement, extraOverlayProps, false)]);
    };
    const minOverlayWidthMatchTrigger = computed(() => {
      const {
        minOverlayWidthMatchTrigger: matchTrigger = !props.alignPoint
      } = props;
      return matchTrigger;
    });
    const renderChildren = () => {
      var _a;
      const children = (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots);
      return triggerVisible.value && children ? cloneElement(children[0], {
        class: props.openClassName || `${props.prefixCls}-open`
      }, false) : children;
    };
    const triggerHideAction = computed(() => {
      if (!props.hideAction && props.trigger.indexOf("contextmenu") !== -1) {
        return ["click"];
      }
      return props.hideAction;
    });
    return () => {
      const {
        prefixCls,
        arrow,
        showAction,
        overlayStyle,
        trigger,
        placement,
        align,
        getPopupContainer,
        transitionName,
        animation,
        overlayClassName
      } = props, otherProps = __rest$1(props, ["prefixCls", "arrow", "showAction", "overlayStyle", "trigger", "placement", "align", "getPopupContainer", "transitionName", "animation", "overlayClassName"]);
      return createVNode(Trigger, _objectSpread$9(_objectSpread$9({}, otherProps), {}, {
        "prefixCls": prefixCls,
        "ref": triggerRef,
        "popupClassName": classNames(overlayClassName, {
          [`${prefixCls}-show-arrow`]: arrow
        }),
        "popupStyle": overlayStyle,
        "builtinPlacements": placements$2,
        "action": trigger,
        "showAction": showAction,
        "hideAction": triggerHideAction.value || [],
        "popupPlacement": placement,
        "popupAlign": align,
        "popupTransitionName": transitionName,
        "popupAnimation": animation,
        "popupVisible": triggerVisible.value,
        "stretch": minOverlayWidthMatchTrigger.value ? "minWidth" : "",
        "onPopupVisibleChange": onVisibleChange,
        "getPopupContainer": getPopupContainer
      }), {
        popup: getMenuElement,
        default: renderChildren
      });
    };
  }
});
const OverrideContextKey = Symbol("OverrideContextKey");
const useInjectOverride = () => {
  return inject(OverrideContextKey, void 0);
};
const useProvideOverride = (props) => {
  var _a, _b, _c;
  const {
    prefixCls,
    mode,
    selectable,
    validator,
    onClick,
    expandIcon
  } = useInjectOverride() || {};
  provide(OverrideContextKey, {
    prefixCls: computed(() => {
      var _a2, _b2;
      return (_b2 = (_a2 = props.prefixCls) === null || _a2 === void 0 ? void 0 : _a2.value) !== null && _b2 !== void 0 ? _b2 : prefixCls === null || prefixCls === void 0 ? void 0 : prefixCls.value;
    }),
    mode: computed(() => {
      var _a2, _b2;
      return (_b2 = (_a2 = props.mode) === null || _a2 === void 0 ? void 0 : _a2.value) !== null && _b2 !== void 0 ? _b2 : mode === null || mode === void 0 ? void 0 : mode.value;
    }),
    selectable: computed(() => {
      var _a2, _b2;
      return (_b2 = (_a2 = props.selectable) === null || _a2 === void 0 ? void 0 : _a2.value) !== null && _b2 !== void 0 ? _b2 : selectable === null || selectable === void 0 ? void 0 : selectable.value;
    }),
    validator: (_a = props.validator) !== null && _a !== void 0 ? _a : validator,
    onClick: (_b = props.onClick) !== null && _b !== void 0 ? _b : onClick,
    expandIcon: (_c = props.expandIcon) !== null && _c !== void 0 ? _c : expandIcon === null || expandIcon === void 0 ? void 0 : expandIcon.value
  });
};
function shallowEqual(objA, objB, compare, compareContext) {
  let ret = compare ? compare.call(compareContext, objA, objB) : void 0;
  if (ret !== void 0) {
    return !!ret;
  }
  if (objA === objB) {
    return true;
  }
  if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
    return false;
  }
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) {
    return false;
  }
  const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
  for (let idx = 0; idx < keysA.length; idx++) {
    const key = keysA[idx];
    if (!bHasOwnProperty(key)) {
      return false;
    }
    const valueA = objA[key];
    const valueB = objB[key];
    ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;
    if (ret === false || ret === void 0 && valueA !== valueB) {
      return false;
    }
  }
  return true;
}
function shallowequal(value, other) {
  return shallowEqual(toRaw(value), toRaw(other));
}
const MenuContextKey = Symbol("menuContextKey");
const useProvideMenu = (props) => {
  provide(MenuContextKey, props);
};
const useInjectMenu = () => {
  return inject(MenuContextKey);
};
const ForceRenderKey = Symbol("ForceRenderKey");
const useProvideForceRender = (forceRender) => {
  provide(ForceRenderKey, forceRender);
};
const useInjectForceRender = () => {
  return inject(ForceRenderKey, false);
};
const MenuFirstLevelContextKey = Symbol("menuFirstLevelContextKey");
const useProvideFirstLevel = (firstLevel) => {
  provide(MenuFirstLevelContextKey, firstLevel);
};
const useInjectFirstLevel = () => {
  return inject(MenuFirstLevelContextKey, true);
};
const MenuContextProvider = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "MenuContextProvider",
  inheritAttrs: false,
  props: {
    mode: {
      type: String,
      default: void 0
    },
    overflowDisabled: {
      type: Boolean,
      default: void 0
    }
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const menuContext = useInjectMenu();
    const newContext = _extends({}, menuContext);
    if (props.mode !== void 0) {
      newContext.mode = toRef(props, "mode");
    }
    if (props.overflowDisabled !== void 0) {
      newContext.overflowDisabled = toRef(props, "overflowDisabled");
    }
    useProvideMenu(newContext);
    return () => {
      var _a;
      return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots);
    };
  }
});
const useProvideMenu$1 = useProvideMenu;
const SiderCollapsedKey = Symbol("siderCollapsed");
const SiderHookProviderKey = Symbol("siderHookProvider");
const OVERFLOW_KEY = "$$__vc-menu-more__key";
const KeyPathContext = Symbol("KeyPathContext");
const useInjectKeyPath = () => {
  return inject(KeyPathContext, {
    parentEventKeys: computed(() => []),
    parentKeys: computed(() => []),
    parentInfo: {}
  });
};
const useProvideKeyPath = (eventKey, key, menuInfo) => {
  const {
    parentEventKeys,
    parentKeys
  } = useInjectKeyPath();
  const eventKeys = computed(() => [...parentEventKeys.value, eventKey]);
  const keys = computed(() => [...parentKeys.value, key]);
  provide(KeyPathContext, {
    parentEventKeys: eventKeys,
    parentKeys: keys,
    parentInfo: menuInfo
  });
  return keys;
};
const measure = Symbol("measure");
const PathContext = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  setup(_props, _ref) {
    let {
      slots
    } = _ref;
    provide(measure, true);
    return () => {
      var _a;
      return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots);
    };
  }
});
const useMeasure = () => {
  return inject(measure, false);
};
const useProvideKeyPath$1 = useProvideKeyPath;
function useDirectionStyle(level) {
  const {
    mode,
    rtl,
    inlineIndent
  } = useInjectMenu();
  return computed(() => mode.value !== "inline" ? null : rtl.value ? {
    paddingRight: `${level.value * inlineIndent.value}px`
  } : {
    paddingLeft: `${level.value * inlineIndent.value}px`
  });
}
let indexGuid$1 = 0;
const menuItemProps = () => ({
  id: String,
  role: String,
  disabled: Boolean,
  danger: Boolean,
  title: {
    type: [String, Boolean],
    default: void 0
  },
  icon: PropTypes$1.any,
  onMouseenter: Function,
  onMouseleave: Function,
  onClick: Function,
  onKeydown: Function,
  onFocus: Function,
  // Internal user prop
  originItemValue: objectType()
});
const __nuxt_component_5 = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "AMenuItem",
  inheritAttrs: false,
  props: menuItemProps(),
  slots: Object,
  setup(props, _ref) {
    let {
      slots,
      emit,
      attrs
    } = _ref;
    const instance = getCurrentInstance();
    const isMeasure = useMeasure();
    const key = typeof instance.vnode.key === "symbol" ? String(instance.vnode.key) : instance.vnode.key;
    devWarning(typeof instance.vnode.key !== "symbol", "MenuItem", `MenuItem \`:key="${String(key)}"\` not support Symbol type`);
    const eventKey = `menu_item_${++indexGuid$1}_$$_${key}`;
    const {
      parentEventKeys,
      parentKeys
    } = useInjectKeyPath();
    const {
      prefixCls,
      activeKeys,
      disabled,
      changeActiveKeys,
      rtl,
      inlineCollapsed,
      siderCollapsed,
      onItemClick,
      selectedKeys,
      registerMenuInfo,
      unRegisterMenuInfo
    } = useInjectMenu();
    const firstLevel = useInjectFirstLevel();
    const isActive = shallowRef(false);
    const keysPath = computed(() => {
      return [...parentKeys.value, key];
    });
    const menuInfo = {
      eventKey,
      key,
      parentEventKeys,
      parentKeys,
      isLeaf: true
    };
    registerMenuInfo(eventKey, menuInfo);
    watch(activeKeys, () => {
      isActive.value = !!activeKeys.value.find((val) => val === key);
    }, {
      immediate: true
    });
    const mergedDisabled = computed(() => disabled.value || props.disabled);
    const selected = computed(() => selectedKeys.value.includes(key));
    const classNames2 = computed(() => {
      const itemCls = `${prefixCls.value}-item`;
      return {
        [`${itemCls}`]: true,
        [`${itemCls}-danger`]: props.danger,
        [`${itemCls}-active`]: isActive.value,
        [`${itemCls}-selected`]: selected.value,
        [`${itemCls}-disabled`]: mergedDisabled.value
      };
    });
    const getEventInfo = (e) => {
      return {
        key,
        eventKey,
        keyPath: keysPath.value,
        eventKeyPath: [...parentEventKeys.value, eventKey],
        domEvent: e,
        item: _extends(_extends({}, props), attrs)
      };
    };
    const onInternalClick = (e) => {
      if (mergedDisabled.value) {
        return;
      }
      const info = getEventInfo(e);
      emit("click", e);
      onItemClick(info);
    };
    const onMouseEnter = (event) => {
      if (!mergedDisabled.value) {
        changeActiveKeys(keysPath.value);
        emit("mouseenter", event);
      }
    };
    const onMouseLeave = (event) => {
      if (!mergedDisabled.value) {
        changeActiveKeys([]);
        emit("mouseleave", event);
      }
    };
    const onInternalKeyDown = (e) => {
      emit("keydown", e);
      if (e.which === KeyCode$1.ENTER) {
        const info = getEventInfo(e);
        emit("click", e);
        onItemClick(info);
      }
    };
    const onInternalFocus = (e) => {
      changeActiveKeys(keysPath.value);
      emit("focus", e);
    };
    const renderItemChildren = (icon, children) => {
      const wrapNode = createVNode("span", {
        "class": `${prefixCls.value}-title-content`
      }, [children]);
      if (!icon || isValidElement(children) && children.type === "span") {
        if (children && inlineCollapsed.value && firstLevel && typeof children === "string") {
          return createVNode("div", {
            "class": `${prefixCls.value}-inline-collapsed-noicon`
          }, [children.charAt(0)]);
        }
      }
      return wrapNode;
    };
    const directionStyle = useDirectionStyle(computed(() => keysPath.value.length));
    return () => {
      var _a, _b, _c, _d, _e;
      if (isMeasure)
        return null;
      const title = (_a = props.title) !== null && _a !== void 0 ? _a : (_b = slots.title) === null || _b === void 0 ? void 0 : _b.call(slots);
      const children = flattenChildren((_c = slots.default) === null || _c === void 0 ? void 0 : _c.call(slots));
      const childrenLength = children.length;
      let tooltipTitle = title;
      if (typeof title === "undefined") {
        tooltipTitle = firstLevel && childrenLength ? children : "";
      } else if (title === false) {
        tooltipTitle = "";
      }
      const tooltipProps2 = {
        title: tooltipTitle
      };
      if (!siderCollapsed.value && !inlineCollapsed.value) {
        tooltipProps2.title = null;
        tooltipProps2.open = false;
      }
      const optionRoleProps = {};
      if (props.role === "option") {
        optionRoleProps["aria-selected"] = selected.value;
      }
      const icon = (_d = props.icon) !== null && _d !== void 0 ? _d : (_e = slots.icon) === null || _e === void 0 ? void 0 : _e.call(slots, props);
      return createVNode(Tooltip, _objectSpread$9(_objectSpread$9({}, tooltipProps2), {}, {
        "placement": rtl.value ? "left" : "right",
        "overlayClassName": `${prefixCls.value}-inline-collapsed-tooltip`
      }), {
        default: () => [createVNode(Overflow$1.Item, _objectSpread$9(_objectSpread$9(_objectSpread$9({
          "component": "li"
        }, attrs), {}, {
          "id": props.id,
          "style": _extends(_extends({}, attrs.style || {}), directionStyle.value),
          "class": [classNames2.value, {
            [`${attrs.class}`]: !!attrs.class,
            [`${prefixCls.value}-item-only-child`]: (icon ? childrenLength + 1 : childrenLength) === 1
          }],
          "role": props.role || "menuitem",
          "tabindex": props.disabled ? null : -1,
          "data-menu-id": key,
          "aria-disabled": props.disabled
        }, optionRoleProps), {}, {
          "onMouseenter": onMouseEnter,
          "onMouseleave": onMouseLeave,
          "onClick": onInternalClick,
          "onKeydown": onInternalKeyDown,
          "onFocus": onInternalFocus,
          "title": typeof title === "string" ? title : void 0
        }), {
          default: () => [cloneElement(typeof icon === "function" ? icon(props.originItemValue) : icon, {
            class: `${prefixCls.value}-item-icon`
          }, false), renderItemChildren(icon, children)]
        })]
      });
    };
  }
});
const autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1
};
const placements = {
  topLeft: {
    points: ["bl", "tl"],
    overflow: autoAdjustOverflow,
    offset: [0, -7]
  },
  bottomLeft: {
    points: ["tl", "bl"],
    overflow: autoAdjustOverflow,
    offset: [0, 7]
  },
  leftTop: {
    points: ["tr", "tl"],
    overflow: autoAdjustOverflow,
    offset: [-4, 0]
  },
  rightTop: {
    points: ["tl", "tr"],
    overflow: autoAdjustOverflow,
    offset: [4, 0]
  }
};
const placementsRtl = {
  topLeft: {
    points: ["bl", "tl"],
    overflow: autoAdjustOverflow,
    offset: [0, -7]
  },
  bottomLeft: {
    points: ["tl", "bl"],
    overflow: autoAdjustOverflow,
    offset: [0, 7]
  },
  rightTop: {
    points: ["tr", "tl"],
    overflow: autoAdjustOverflow,
    offset: [-4, 0]
  },
  leftTop: {
    points: ["tl", "tr"],
    overflow: autoAdjustOverflow,
    offset: [4, 0]
  }
};
const popupPlacementMap = {
  horizontal: "bottomLeft",
  vertical: "rightTop",
  "vertical-left": "rightTop",
  "vertical-right": "leftTop"
};
const PopupTrigger = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "PopupTrigger",
  inheritAttrs: false,
  props: {
    prefixCls: String,
    mode: String,
    visible: Boolean,
    // popup: React.ReactNode;
    popupClassName: String,
    popupOffset: Array,
    disabled: Boolean,
    onVisibleChange: Function
  },
  slots: Object,
  emits: ["visibleChange"],
  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const innerVisible = shallowRef(false);
    const {
      getPopupContainer,
      rtl,
      subMenuOpenDelay,
      subMenuCloseDelay,
      builtinPlacements,
      triggerSubMenuAction,
      forceSubMenuRender,
      motion,
      defaultMotions,
      rootClassName
    } = useInjectMenu();
    const forceRender = useInjectForceRender();
    const placement = computed(() => rtl.value ? _extends(_extends({}, placementsRtl), builtinPlacements.value) : _extends(_extends({}, placements), builtinPlacements.value));
    const popupPlacement = computed(() => popupPlacementMap[props.mode]);
    const visibleRef = shallowRef();
    watch(() => props.visible, (visible) => {
      wrapperRaf.cancel(visibleRef.value);
      visibleRef.value = wrapperRaf(() => {
        innerVisible.value = visible;
      });
    }, {
      immediate: true
    });
    const onVisibleChange = (visible) => {
      emit("visibleChange", visible);
    };
    const mergedMotion = computed(() => {
      var _a, _b;
      const m = motion.value || ((_a = defaultMotions.value) === null || _a === void 0 ? void 0 : _a[props.mode]) || ((_b = defaultMotions.value) === null || _b === void 0 ? void 0 : _b.other);
      const res = typeof m === "function" ? m() : m;
      return res ? getTransitionProps(res.name, {
        css: true
      }) : void 0;
    });
    return () => {
      const {
        prefixCls,
        popupClassName,
        mode,
        popupOffset,
        disabled
      } = props;
      return createVNode(Trigger, {
        "prefixCls": prefixCls,
        "popupClassName": classNames(`${prefixCls}-popup`, {
          [`${prefixCls}-rtl`]: rtl.value
        }, popupClassName, rootClassName.value),
        "stretch": mode === "horizontal" ? "minWidth" : null,
        "getPopupContainer": getPopupContainer.value,
        "builtinPlacements": placement.value,
        "popupPlacement": popupPlacement.value,
        "popupVisible": innerVisible.value,
        "popupAlign": popupOffset && {
          offset: popupOffset
        },
        "action": disabled ? [] : [triggerSubMenuAction.value],
        "mouseEnterDelay": subMenuOpenDelay.value,
        "mouseLeaveDelay": subMenuCloseDelay.value,
        "onPopupVisibleChange": onVisibleChange,
        "forceRender": forceRender || forceSubMenuRender.value,
        "popupAnimation": mergedMotion.value
      }, {
        popup: slots.popup,
        default: slots.default
      });
    };
  }
});
const InternalSubMenuList = (_props, _ref) => {
  let {
    slots,
    attrs
  } = _ref;
  var _a;
  const {
    prefixCls,
    mode
  } = useInjectMenu();
  return createVNode("ul", _objectSpread$9(_objectSpread$9({}, attrs), {}, {
    "class": classNames(prefixCls.value, `${prefixCls.value}-sub`, `${prefixCls.value}-${mode.value === "inline" ? "inline" : "vertical"}`),
    "data-menu-list": true
  }), [(_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)]);
};
InternalSubMenuList.displayName = "SubMenuList";
const SubMenuList = InternalSubMenuList;
const InlineSubMenuList = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "InlineSubMenuList",
  inheritAttrs: false,
  props: {
    id: String,
    open: Boolean,
    keyPath: Array
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const fixedMode = computed(() => "inline");
    const {
      motion,
      mode,
      defaultMotions
    } = useInjectMenu();
    const sameModeRef = computed(() => mode.value === fixedMode.value);
    const destroy = ref(!sameModeRef.value);
    const mergedOpen = computed(() => sameModeRef.value ? props.open : false);
    watch(mode, () => {
      if (sameModeRef.value) {
        destroy.value = false;
      }
    }, {
      flush: "post"
    });
    const mergedMotion = computed(() => {
      var _a, _b;
      const m = motion.value || ((_a = defaultMotions.value) === null || _a === void 0 ? void 0 : _a[fixedMode.value]) || ((_b = defaultMotions.value) === null || _b === void 0 ? void 0 : _b.other);
      const res = typeof m === "function" ? m() : m;
      return _extends(_extends({}, res), {
        appear: props.keyPath.length <= 1
      });
    });
    return () => {
      var _a;
      if (destroy.value) {
        return null;
      }
      return createVNode(MenuContextProvider, {
        "mode": fixedMode.value
      }, {
        default: () => [createVNode(Transition, mergedMotion.value, {
          default: () => [withDirectives(createVNode(SubMenuList, {
            "id": props.id
          }, {
            default: () => [(_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)]
          }), [[vShow, mergedOpen.value]])]
        })]
      });
    };
  }
});
let indexGuid = 0;
const subMenuProps = () => ({
  icon: PropTypes$1.any,
  title: PropTypes$1.any,
  disabled: Boolean,
  level: Number,
  popupClassName: String,
  popupOffset: Array,
  internalPopupClose: Boolean,
  eventKey: String,
  expandIcon: Function,
  theme: String,
  onMouseenter: Function,
  onMouseleave: Function,
  onTitleClick: Function,
  // Internal user prop
  originItemValue: objectType()
});
const __nuxt_component_3 = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ASubMenu",
  inheritAttrs: false,
  props: subMenuProps(),
  slots: Object,
  setup(props, _ref) {
    let {
      slots,
      attrs,
      emit
    } = _ref;
    var _a, _b;
    useProvideFirstLevel(false);
    const isMeasure = useMeasure();
    const instance = getCurrentInstance();
    const vnodeKey = typeof instance.vnode.key === "symbol" ? String(instance.vnode.key) : instance.vnode.key;
    devWarning(typeof instance.vnode.key !== "symbol", "SubMenu", `SubMenu \`:key="${String(vnodeKey)}"\` not support Symbol type`);
    const key = isValid$1(vnodeKey) ? vnodeKey : `sub_menu_${++indexGuid}_$$_not_set_key`;
    const eventKey = (_a = props.eventKey) !== null && _a !== void 0 ? _a : isValid$1(vnodeKey) ? `sub_menu_${++indexGuid}_$$_${vnodeKey}` : key;
    const {
      parentEventKeys,
      parentInfo,
      parentKeys
    } = useInjectKeyPath();
    const keysPath = computed(() => [...parentKeys.value, key]);
    const childrenEventKeys = shallowRef([]);
    const menuInfo = {
      eventKey,
      key,
      parentEventKeys,
      childrenEventKeys,
      parentKeys
    };
    (_b = parentInfo.childrenEventKeys) === null || _b === void 0 ? void 0 : _b.value.push(eventKey);
    useProvideKeyPath$1(eventKey, key, menuInfo);
    const {
      prefixCls,
      activeKeys,
      disabled: contextDisabled,
      changeActiveKeys,
      mode,
      inlineCollapsed,
      openKeys,
      overflowDisabled,
      onOpenChange,
      registerMenuInfo,
      unRegisterMenuInfo,
      selectedSubMenuKeys,
      expandIcon: menuExpandIcon,
      theme
    } = useInjectMenu();
    const hasKey = vnodeKey !== void 0 && vnodeKey !== null;
    const forceRender = !isMeasure && (useInjectForceRender() || !hasKey);
    useProvideForceRender(forceRender);
    if (isMeasure && hasKey || !isMeasure && !hasKey || forceRender) {
      registerMenuInfo(eventKey, menuInfo);
    }
    const subMenuPrefixCls = computed(() => `${prefixCls.value}-submenu`);
    const mergedDisabled = computed(() => contextDisabled.value || props.disabled);
    const elementRef = shallowRef();
    const popupRef = shallowRef();
    const originOpen = computed(() => openKeys.value.includes(key));
    const open = computed(() => !overflowDisabled.value && originOpen.value);
    const childrenSelected = computed(() => {
      return selectedSubMenuKeys.value.includes(key);
    });
    const isActive = shallowRef(false);
    watch(activeKeys, () => {
      isActive.value = !!activeKeys.value.find((val) => val === key);
    }, {
      immediate: true
    });
    const onInternalTitleClick = (e) => {
      if (mergedDisabled.value) {
        return;
      }
      emit("titleClick", e, key);
      if (mode.value === "inline") {
        onOpenChange(key, !originOpen.value);
      }
    };
    const onMouseEnter = (event) => {
      if (!mergedDisabled.value) {
        changeActiveKeys(keysPath.value);
        emit("mouseenter", event);
      }
    };
    const onMouseLeave = (event) => {
      if (!mergedDisabled.value) {
        changeActiveKeys([]);
        emit("mouseleave", event);
      }
    };
    const directionStyle = useDirectionStyle(computed(() => keysPath.value.length));
    const onPopupVisibleChange = (newVisible) => {
      if (mode.value !== "inline") {
        onOpenChange(key, newVisible);
      }
    };
    const onInternalFocus = () => {
      changeActiveKeys(keysPath.value);
    };
    const popupId = eventKey && `${eventKey}-popup`;
    const popupClassName = computed(() => classNames(prefixCls.value, `${prefixCls.value}-${props.theme || theme.value}`, props.popupClassName));
    const renderTitle = (title, icon) => {
      if (!icon) {
        return inlineCollapsed.value && !parentKeys.value.length && title && typeof title === "string" ? createVNode("div", {
          "class": `${prefixCls.value}-inline-collapsed-noicon`
        }, [title.charAt(0)]) : createVNode("span", {
          "class": `${prefixCls.value}-title-content`
        }, [title]);
      }
      const titleIsSpan = isValidElement(title) && title.type === "span";
      return createVNode(Fragment, null, [cloneElement(typeof icon === "function" ? icon(props.originItemValue) : icon, {
        class: `${prefixCls.value}-item-icon`
      }, false), titleIsSpan ? title : createVNode("span", {
        "class": `${prefixCls.value}-title-content`
      }, [title])]);
    };
    const triggerModeRef = computed(() => {
      return mode.value !== "inline" && keysPath.value.length > 1 ? "vertical" : mode.value;
    });
    const renderMode = computed(() => mode.value === "horizontal" ? "vertical" : mode.value);
    const subMenuTriggerModeRef = computed(() => triggerModeRef.value === "horizontal" ? "vertical" : triggerModeRef.value);
    const baseTitleNode = () => {
      var _a2, _b2;
      const subMenuPrefixClsValue = subMenuPrefixCls.value;
      const icon = (_a2 = props.icon) !== null && _a2 !== void 0 ? _a2 : (_b2 = slots.icon) === null || _b2 === void 0 ? void 0 : _b2.call(slots, props);
      const expandIcon = props.expandIcon || slots.expandIcon || menuExpandIcon.value;
      const title = renderTitle(getPropsSlot(slots, props, "title"), icon);
      return createVNode("div", {
        "style": directionStyle.value,
        "class": `${subMenuPrefixClsValue}-title`,
        "tabindex": mergedDisabled.value ? null : -1,
        "ref": elementRef,
        "title": typeof title === "string" ? title : null,
        "data-menu-id": key,
        "aria-expanded": open.value,
        "aria-haspopup": true,
        "aria-controls": popupId,
        "aria-disabled": mergedDisabled.value,
        "onClick": onInternalTitleClick,
        "onFocus": onInternalFocus
      }, [title, mode.value !== "horizontal" && expandIcon ? expandIcon(_extends(_extends({}, props), {
        isOpen: open.value
      })) : createVNode("i", {
        "class": `${subMenuPrefixClsValue}-arrow`
      }, null)]);
    };
    return () => {
      var _a2;
      if (isMeasure) {
        if (!hasKey) {
          return null;
        }
        return (_a2 = slots.default) === null || _a2 === void 0 ? void 0 : _a2.call(slots);
      }
      const subMenuPrefixClsValue = subMenuPrefixCls.value;
      let titleNode = () => null;
      if (!overflowDisabled.value && mode.value !== "inline") {
        const popupOffset = mode.value === "horizontal" ? [0, 8] : [10, 0];
        titleNode = () => createVNode(PopupTrigger, {
          "mode": triggerModeRef.value,
          "prefixCls": subMenuPrefixClsValue,
          "visible": !props.internalPopupClose && open.value,
          "popupClassName": popupClassName.value,
          "popupOffset": props.popupOffset || popupOffset,
          "disabled": mergedDisabled.value,
          "onVisibleChange": onPopupVisibleChange
        }, {
          default: () => [baseTitleNode()],
          popup: () => createVNode(MenuContextProvider, {
            "mode": subMenuTriggerModeRef.value
          }, {
            default: () => [createVNode(SubMenuList, {
              "id": popupId,
              "ref": popupRef
            }, {
              default: slots.default
            })]
          })
        });
      } else {
        titleNode = () => createVNode(PopupTrigger, null, {
          default: baseTitleNode
        });
      }
      return createVNode(MenuContextProvider, {
        "mode": renderMode.value
      }, {
        default: () => [createVNode(Overflow$1.Item, _objectSpread$9(_objectSpread$9({
          "component": "li"
        }, attrs), {}, {
          "role": "none",
          "class": classNames(subMenuPrefixClsValue, `${subMenuPrefixClsValue}-${mode.value}`, attrs.class, {
            [`${subMenuPrefixClsValue}-open`]: open.value,
            [`${subMenuPrefixClsValue}-active`]: isActive.value,
            [`${subMenuPrefixClsValue}-selected`]: childrenSelected.value,
            [`${subMenuPrefixClsValue}-disabled`]: mergedDisabled.value
          }),
          "onMouseenter": onMouseEnter,
          "onMouseleave": onMouseLeave,
          "data-submenu-id": key
        }), {
          default: () => {
            return createVNode(Fragment, null, [titleNode(), !overflowDisabled.value && createVNode(InlineSubMenuList, {
              "id": popupId,
              "open": open.value,
              "keyPath": keysPath.value
            }, {
              default: slots.default
            })]);
          }
        })]
      });
    };
  }
});
function hasClass(node, className) {
  if (node.classList) {
    return node.classList.contains(className);
  }
  const originClass = node.className;
  return ` ${originClass} `.indexOf(` ${className} `) > -1;
}
function addClass(node, className) {
  if (node.classList) {
    node.classList.add(className);
  } else {
    if (!hasClass(node, className)) {
      node.className = `${node.className} ${className}`;
    }
  }
}
function removeClass(node, className) {
  if (node.classList) {
    node.classList.remove(className);
  } else {
    if (hasClass(node, className)) {
      const originClass = node.className;
      node.className = ` ${originClass} `.replace(` ${className} `, " ");
    }
  }
}
const collapseMotion = function() {
  let name = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "ant-motion-collapse";
  let appear = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  return {
    name,
    appear,
    css: true,
    onBeforeEnter: (node) => {
      node.style.height = "0px";
      node.style.opacity = "0";
      addClass(node, name);
    },
    onEnter: (node) => {
      nextTick(() => {
        node.style.height = `${node.scrollHeight}px`;
        node.style.opacity = "1";
      });
    },
    onAfterEnter: (node) => {
      if (node) {
        removeClass(node, name);
        node.style.height = null;
        node.style.opacity = null;
      }
    },
    onBeforeLeave: (node) => {
      addClass(node, name);
      node.style.height = `${node.offsetHeight}px`;
      node.style.opacity = null;
    },
    onLeave: (node) => {
      setTimeout(() => {
        node.style.height = "0px";
        node.style.opacity = "0";
      });
    },
    onAfterLeave: (node) => {
      if (node) {
        removeClass(node, name);
        if (node.style) {
          node.style.height = null;
          node.style.opacity = null;
        }
      }
    }
  };
};
const collapseMotion$1 = collapseMotion;
const menuItemGroupProps = () => ({
  title: PropTypes$1.any,
  // Internal user prop
  originItemValue: objectType()
});
const ItemGroup = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "AMenuItemGroup",
  inheritAttrs: false,
  props: menuItemGroupProps(),
  slots: Object,
  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const {
      prefixCls
    } = useInjectMenu();
    const groupPrefixCls = computed(() => `${prefixCls.value}-item-group`);
    const isMeasure = useMeasure();
    return () => {
      var _a, _b;
      if (isMeasure)
        return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots);
      return createVNode("li", _objectSpread$9(_objectSpread$9({}, attrs), {}, {
        "onClick": (e) => e.stopPropagation(),
        "class": groupPrefixCls.value
      }), [createVNode("div", {
        "title": typeof props.title === "string" ? props.title : void 0,
        "class": `${groupPrefixCls.value}-title`
      }, [getPropsSlot(slots, props, "title")]), createVNode("ul", {
        "class": `${groupPrefixCls.value}-list`
      }, [(_b = slots.default) === null || _b === void 0 ? void 0 : _b.call(slots)])]);
    };
  }
});
const menuDividerProps = () => ({
  prefixCls: String,
  dashed: Boolean
});
const Divider = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "AMenuDivider",
  props: menuDividerProps(),
  setup(props) {
    const {
      prefixCls
    } = useInjectMenu();
    const cls = computed(() => {
      return {
        [`${prefixCls.value}-item-divider`]: true,
        [`${prefixCls.value}-item-divider-dashed`]: !!props.dashed
      };
    });
    return () => {
      return createVNode("li", {
        "class": cls.value
      }, null);
    };
  }
});
var __rest = globalThis && globalThis.__rest || function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
function convertItemsToNodes(list, store, parentMenuInfo) {
  return (list || []).map((opt, index) => {
    if (opt && typeof opt === "object") {
      const _a = opt, {
        label,
        children,
        key,
        type
      } = _a, restProps = __rest(_a, ["label", "children", "key", "type"]);
      const mergedKey = key !== null && key !== void 0 ? key : `tmp-${index}`;
      const parentKeys = parentMenuInfo ? parentMenuInfo.parentKeys.slice() : [];
      const childrenEventKeys = [];
      const menuInfo = {
        eventKey: mergedKey,
        key: mergedKey,
        parentEventKeys: ref(parentKeys),
        parentKeys: ref(parentKeys),
        childrenEventKeys: ref(childrenEventKeys),
        isLeaf: false
      };
      if (children || type === "group") {
        if (type === "group") {
          const childrenNodes2 = convertItemsToNodes(children, store, parentMenuInfo);
          return createVNode(ItemGroup, _objectSpread$9(_objectSpread$9({
            "key": mergedKey
          }, restProps), {}, {
            "title": label,
            "originItemValue": opt
          }), {
            default: () => [childrenNodes2]
          });
        }
        store.set(mergedKey, menuInfo);
        if (parentMenuInfo) {
          parentMenuInfo.childrenEventKeys.push(mergedKey);
        }
        const childrenNodes = convertItemsToNodes(children, store, {
          childrenEventKeys,
          parentKeys: [].concat(parentKeys, mergedKey)
        });
        return createVNode(__nuxt_component_3, _objectSpread$9(_objectSpread$9({
          "key": mergedKey
        }, restProps), {}, {
          "title": label,
          "originItemValue": opt
        }), {
          default: () => [childrenNodes]
        });
      }
      if (type === "divider") {
        return createVNode(Divider, _objectSpread$9({
          "key": mergedKey
        }, restProps), null);
      }
      menuInfo.isLeaf = true;
      store.set(mergedKey, menuInfo);
      return createVNode(__nuxt_component_5, _objectSpread$9(_objectSpread$9({
        "key": mergedKey
      }, restProps), {}, {
        "originItemValue": opt
      }), {
        default: () => [label]
      });
    }
    return null;
  }).filter((opt) => opt);
}
function useItems(props) {
  const itemsNodes = shallowRef([]);
  const hasItmes = shallowRef(false);
  const store = shallowRef(/* @__PURE__ */ new Map());
  watch(() => props.items, () => {
    const newStore = /* @__PURE__ */ new Map();
    hasItmes.value = false;
    if (props.items) {
      hasItmes.value = true;
      itemsNodes.value = convertItemsToNodes(props.items, newStore);
    } else {
      itemsNodes.value = void 0;
    }
    store.value = newStore;
  }, {
    immediate: true,
    deep: true
  });
  return {
    itemsNodes,
    store,
    hasItmes
  };
}
const getHorizontalStyle = (token) => {
  const {
    componentCls,
    motionDurationSlow,
    menuHorizontalHeight,
    colorSplit,
    lineWidth,
    lineType,
    menuItemPaddingInline
  } = token;
  return {
    [`${componentCls}-horizontal`]: {
      lineHeight: `${menuHorizontalHeight}px`,
      border: 0,
      borderBottom: `${lineWidth}px ${lineType} ${colorSplit}`,
      boxShadow: "none",
      "&::after": {
        display: "block",
        clear: "both",
        height: 0,
        content: '"\\20"'
      },
      // ======================= Item =======================
      [`${componentCls}-item, ${componentCls}-submenu`]: {
        position: "relative",
        display: "inline-block",
        verticalAlign: "bottom",
        paddingInline: menuItemPaddingInline
      },
      [`> ${componentCls}-item:hover,
        > ${componentCls}-item-active,
        > ${componentCls}-submenu ${componentCls}-submenu-title:hover`]: {
        backgroundColor: "transparent"
      },
      [`${componentCls}-item, ${componentCls}-submenu-title`]: {
        transition: [`border-color ${motionDurationSlow}`, `background ${motionDurationSlow}`].join(",")
      },
      // ===================== Sub Menu =====================
      [`${componentCls}-submenu-arrow`]: {
        display: "none"
      }
    }
  };
};
const getHorizontalStyle$1 = getHorizontalStyle;
const getRTLStyle = (_ref) => {
  let {
    componentCls,
    menuArrowOffset
  } = _ref;
  return {
    [`${componentCls}-rtl`]: {
      direction: "rtl"
    },
    [`${componentCls}-submenu-rtl`]: {
      transformOrigin: "100% 0"
    },
    // Vertical Arrow
    [`${componentCls}-rtl${componentCls}-vertical,
    ${componentCls}-submenu-rtl ${componentCls}-vertical`]: {
      [`${componentCls}-submenu-arrow`]: {
        "&::before": {
          transform: `rotate(-45deg) translateY(-${menuArrowOffset})`
        },
        "&::after": {
          transform: `rotate(45deg) translateY(${menuArrowOffset})`
        }
      }
    }
  };
};
const getRTLStyle$1 = getRTLStyle;
const accessibilityFocus = (token) => _extends({}, genFocusOutline(token));
const getThemeStyle = (token, themeSuffix) => {
  const {
    componentCls,
    colorItemText,
    colorItemTextSelected,
    colorGroupTitle,
    colorItemBg,
    colorSubItemBg,
    colorItemBgSelected,
    colorActiveBarHeight,
    colorActiveBarWidth,
    colorActiveBarBorderSize,
    motionDurationSlow,
    motionEaseInOut,
    motionEaseOut,
    menuItemPaddingInline,
    motionDurationMid,
    colorItemTextHover,
    lineType,
    colorSplit,
    // Disabled
    colorItemTextDisabled,
    // Danger
    colorDangerItemText,
    colorDangerItemTextHover,
    colorDangerItemTextSelected,
    colorDangerItemBgActive,
    colorDangerItemBgSelected,
    colorItemBgHover,
    menuSubMenuBg,
    // Horizontal
    colorItemTextSelectedHorizontal,
    colorItemBgSelectedHorizontal
  } = token;
  return {
    [`${componentCls}-${themeSuffix}`]: {
      color: colorItemText,
      background: colorItemBg,
      [`&${componentCls}-root:focus-visible`]: _extends({}, accessibilityFocus(token)),
      // ======================== Item ========================
      [`${componentCls}-item-group-title`]: {
        color: colorGroupTitle
      },
      [`${componentCls}-submenu-selected`]: {
        [`> ${componentCls}-submenu-title`]: {
          color: colorItemTextSelected
        }
      },
      // Disabled
      [`${componentCls}-item-disabled, ${componentCls}-submenu-disabled`]: {
        color: `${colorItemTextDisabled} !important`
      },
      // Hover
      [`${componentCls}-item:hover, ${componentCls}-submenu-title:hover`]: {
        [`&:not(${componentCls}-item-selected):not(${componentCls}-submenu-selected)`]: {
          color: colorItemTextHover
        }
      },
      [`&:not(${componentCls}-horizontal)`]: {
        [`${componentCls}-item:not(${componentCls}-item-selected)`]: {
          "&:hover": {
            backgroundColor: colorItemBgHover
          },
          "&:active": {
            backgroundColor: colorItemBgSelected
          }
        },
        [`${componentCls}-submenu-title`]: {
          "&:hover": {
            backgroundColor: colorItemBgHover
          },
          "&:active": {
            backgroundColor: colorItemBgSelected
          }
        }
      },
      // Danger - only Item has
      [`${componentCls}-item-danger`]: {
        color: colorDangerItemText,
        [`&${componentCls}-item:hover`]: {
          [`&:not(${componentCls}-item-selected):not(${componentCls}-submenu-selected)`]: {
            color: colorDangerItemTextHover
          }
        },
        [`&${componentCls}-item:active`]: {
          background: colorDangerItemBgActive
        }
      },
      [`${componentCls}-item a`]: {
        "&, &:hover": {
          color: "inherit"
        }
      },
      [`${componentCls}-item-selected`]: {
        color: colorItemTextSelected,
        // Danger
        [`&${componentCls}-item-danger`]: {
          color: colorDangerItemTextSelected
        },
        [`a, a:hover`]: {
          color: "inherit"
        }
      },
      [`& ${componentCls}-item-selected`]: {
        backgroundColor: colorItemBgSelected,
        // Danger
        [`&${componentCls}-item-danger`]: {
          backgroundColor: colorDangerItemBgSelected
        }
      },
      [`${componentCls}-item, ${componentCls}-submenu-title`]: {
        [`&:not(${componentCls}-item-disabled):focus-visible`]: _extends({}, accessibilityFocus(token))
      },
      [`&${componentCls}-submenu > ${componentCls}`]: {
        backgroundColor: menuSubMenuBg
      },
      [`&${componentCls}-popup > ${componentCls}`]: {
        backgroundColor: colorItemBg
      },
      // ====================== Horizontal ======================
      [`&${componentCls}-horizontal`]: _extends(_extends({}, themeSuffix === "dark" ? {
        borderBottom: 0
      } : {}), {
        [`> ${componentCls}-item, > ${componentCls}-submenu`]: {
          top: colorActiveBarBorderSize,
          marginTop: -colorActiveBarBorderSize,
          marginBottom: 0,
          borderRadius: 0,
          "&::after": {
            position: "absolute",
            insetInline: menuItemPaddingInline,
            bottom: 0,
            borderBottom: `${colorActiveBarHeight}px solid transparent`,
            transition: `border-color ${motionDurationSlow} ${motionEaseInOut}`,
            content: '""'
          },
          [`&:hover, &-active, &-open`]: {
            "&::after": {
              borderBottomWidth: colorActiveBarHeight,
              borderBottomColor: colorItemTextSelectedHorizontal
            }
          },
          [`&-selected`]: {
            color: colorItemTextSelectedHorizontal,
            backgroundColor: colorItemBgSelectedHorizontal,
            "&::after": {
              borderBottomWidth: colorActiveBarHeight,
              borderBottomColor: colorItemTextSelectedHorizontal
            }
          }
        }
      }),
      // ================== Inline & Vertical ===================
      //
      [`&${componentCls}-root`]: {
        [`&${componentCls}-inline, &${componentCls}-vertical`]: {
          borderInlineEnd: `${colorActiveBarBorderSize}px ${lineType} ${colorSplit}`
        }
      },
      // ======================== Inline ========================
      [`&${componentCls}-inline`]: {
        // Sub
        [`${componentCls}-sub${componentCls}-inline`]: {
          background: colorSubItemBg
        },
        // Item
        [`${componentCls}-item, ${componentCls}-submenu-title`]: colorActiveBarBorderSize && colorActiveBarWidth ? {
          width: `calc(100% + ${colorActiveBarBorderSize}px)`
        } : {},
        [`${componentCls}-item`]: {
          position: "relative",
          "&::after": {
            position: "absolute",
            insetBlock: 0,
            insetInlineEnd: 0,
            borderInlineEnd: `${colorActiveBarWidth}px solid ${colorItemTextSelected}`,
            transform: "scaleY(0.0001)",
            opacity: 0,
            transition: [`transform ${motionDurationMid} ${motionEaseOut}`, `opacity ${motionDurationMid} ${motionEaseOut}`].join(","),
            content: '""'
          },
          // Danger
          [`&${componentCls}-item-danger`]: {
            "&::after": {
              borderInlineEndColor: colorDangerItemTextSelected
            }
          }
        },
        [`${componentCls}-selected, ${componentCls}-item-selected`]: {
          "&::after": {
            transform: "scaleY(1)",
            opacity: 1,
            transition: [`transform ${motionDurationMid} ${motionEaseInOut}`, `opacity ${motionDurationMid} ${motionEaseInOut}`].join(",")
          }
        }
      }
    }
  };
};
const getThemeStyle$1 = getThemeStyle;
const getVerticalInlineStyle = (token) => {
  const {
    componentCls,
    menuItemHeight,
    itemMarginInline,
    padding,
    menuArrowSize,
    marginXS,
    marginXXS
  } = token;
  const paddingWithArrow = padding + menuArrowSize + marginXS;
  return {
    [`${componentCls}-item`]: {
      position: "relative"
    },
    [`${componentCls}-item, ${componentCls}-submenu-title`]: {
      height: menuItemHeight,
      lineHeight: `${menuItemHeight}px`,
      paddingInline: padding,
      overflow: "hidden",
      textOverflow: "ellipsis",
      marginInline: itemMarginInline,
      marginBlock: marginXXS,
      width: `calc(100% - ${itemMarginInline * 2}px)`
    },
    // disable margin collapsed
    [`${componentCls}-submenu`]: {
      paddingBottom: 0.02
    },
    [`> ${componentCls}-item,
            > ${componentCls}-submenu > ${componentCls}-submenu-title`]: {
      height: menuItemHeight,
      lineHeight: `${menuItemHeight}px`
    },
    [`${componentCls}-item-group-list ${componentCls}-submenu-title,
            ${componentCls}-submenu-title`]: {
      paddingInlineEnd: paddingWithArrow
    }
  };
};
const getVerticalStyle = (token) => {
  const {
    componentCls,
    iconCls,
    menuItemHeight,
    colorTextLightSolid,
    dropdownWidth,
    controlHeightLG,
    motionDurationMid,
    motionEaseOut,
    paddingXL,
    fontSizeSM,
    fontSizeLG,
    motionDurationSlow,
    paddingXS,
    boxShadowSecondary
  } = token;
  const inlineItemStyle = {
    height: menuItemHeight,
    lineHeight: `${menuItemHeight}px`,
    listStylePosition: "inside",
    listStyleType: "disc"
  };
  return [
    {
      [componentCls]: {
        [`&-inline, &-vertical`]: _extends({
          [`&${componentCls}-root`]: {
            boxShadow: "none"
          }
        }, getVerticalInlineStyle(token))
      },
      [`${componentCls}-submenu-popup`]: {
        [`${componentCls}-vertical`]: _extends(_extends({}, getVerticalInlineStyle(token)), {
          boxShadow: boxShadowSecondary
        })
      }
    },
    // Vertical only
    {
      [`${componentCls}-submenu-popup ${componentCls}-vertical${componentCls}-sub`]: {
        minWidth: dropdownWidth,
        maxHeight: `calc(100vh - ${controlHeightLG * 2.5}px)`,
        padding: "0",
        overflow: "hidden",
        borderInlineEnd: 0,
        // https://github.com/ant-design/ant-design/issues/22244
        // https://github.com/ant-design/ant-design/issues/26812
        "&:not([class*='-active'])": {
          overflowX: "hidden",
          overflowY: "auto"
        }
      }
    },
    // Inline Only
    {
      [`${componentCls}-inline`]: {
        width: "100%",
        // Motion enhance for first level
        [`&${componentCls}-root`]: {
          [`${componentCls}-item, ${componentCls}-submenu-title`]: {
            display: "flex",
            alignItems: "center",
            transition: [`border-color ${motionDurationSlow}`, `background ${motionDurationSlow}`, `padding ${motionDurationMid} ${motionEaseOut}`].join(","),
            [`> ${componentCls}-title-content`]: {
              flex: "auto",
              minWidth: 0,
              overflow: "hidden",
              textOverflow: "ellipsis"
            },
            "> *": {
              flex: "none"
            }
          }
        },
        // >>>>> Sub
        [`${componentCls}-sub${componentCls}-inline`]: {
          padding: 0,
          border: 0,
          borderRadius: 0,
          boxShadow: "none",
          [`& > ${componentCls}-submenu > ${componentCls}-submenu-title`]: inlineItemStyle,
          [`& ${componentCls}-item-group-title`]: {
            paddingInlineStart: paddingXL
          }
        },
        // >>>>> Item
        [`${componentCls}-item`]: inlineItemStyle
      }
    },
    // Inline Collapse Only
    {
      [`${componentCls}-inline-collapsed`]: {
        width: menuItemHeight * 2,
        [`&${componentCls}-root`]: {
          [`${componentCls}-item, ${componentCls}-submenu ${componentCls}-submenu-title`]: {
            [`> ${componentCls}-inline-collapsed-noicon`]: {
              fontSize: fontSizeLG,
              textAlign: "center"
            }
          }
        },
        [`> ${componentCls}-item,
          > ${componentCls}-item-group > ${componentCls}-item-group-list > ${componentCls}-item,
          > ${componentCls}-item-group > ${componentCls}-item-group-list > ${componentCls}-submenu > ${componentCls}-submenu-title,
          > ${componentCls}-submenu > ${componentCls}-submenu-title`]: {
          insetInlineStart: 0,
          paddingInline: `calc(50% - ${fontSizeSM}px)`,
          textOverflow: "clip",
          [`
            ${componentCls}-submenu-arrow,
            ${componentCls}-submenu-expand-icon
          `]: {
            opacity: 0
          },
          [`${componentCls}-item-icon, ${iconCls}`]: {
            margin: 0,
            fontSize: fontSizeLG,
            lineHeight: `${menuItemHeight}px`,
            "+ span": {
              display: "inline-block",
              opacity: 0
            }
          }
        },
        [`${componentCls}-item-icon, ${iconCls}`]: {
          display: "inline-block"
        },
        "&-tooltip": {
          pointerEvents: "none",
          [`${componentCls}-item-icon, ${iconCls}`]: {
            display: "none"
          },
          "a, a:hover": {
            color: colorTextLightSolid
          }
        },
        [`${componentCls}-item-group-title`]: _extends(_extends({}, textEllipsis), {
          paddingInline: paddingXS
        })
      }
    }
  ];
};
const getVerticalStyle$1 = getVerticalStyle;
const genMenuItemStyle = (token) => {
  const {
    componentCls,
    fontSize,
    motionDurationSlow,
    motionDurationMid,
    motionEaseInOut,
    motionEaseOut,
    iconCls,
    controlHeightSM
  } = token;
  return {
    // >>>>> Item
    [`${componentCls}-item, ${componentCls}-submenu-title`]: {
      position: "relative",
      display: "block",
      margin: 0,
      whiteSpace: "nowrap",
      cursor: "pointer",
      transition: [`border-color ${motionDurationSlow}`, `background ${motionDurationSlow}`, `padding ${motionDurationSlow} ${motionEaseInOut}`].join(","),
      [`${componentCls}-item-icon, ${iconCls}`]: {
        minWidth: fontSize,
        fontSize,
        transition: [`font-size ${motionDurationMid} ${motionEaseOut}`, `margin ${motionDurationSlow} ${motionEaseInOut}`, `color ${motionDurationSlow}`].join(","),
        "+ span": {
          marginInlineStart: controlHeightSM - fontSize,
          opacity: 1,
          transition: [`opacity ${motionDurationSlow} ${motionEaseInOut}`, `margin ${motionDurationSlow}`, `color ${motionDurationSlow}`].join(",")
        }
      },
      [`${componentCls}-item-icon`]: _extends({}, resetIcon()),
      [`&${componentCls}-item-only-child`]: {
        [`> ${iconCls}, > ${componentCls}-item-icon`]: {
          marginInlineEnd: 0
        }
      }
    },
    // Disabled state sets text to gray and nukes hover/tab effects
    [`${componentCls}-item-disabled, ${componentCls}-submenu-disabled`]: {
      background: "none !important",
      cursor: "not-allowed",
      "&::after": {
        borderColor: "transparent !important"
      },
      a: {
        color: "inherit !important"
      },
      [`> ${componentCls}-submenu-title`]: {
        color: "inherit !important",
        cursor: "not-allowed"
      }
    }
  };
};
const genSubMenuArrowStyle = (token) => {
  const {
    componentCls,
    motionDurationSlow,
    motionEaseInOut,
    borderRadius,
    menuArrowSize,
    menuArrowOffset
  } = token;
  return {
    [`${componentCls}-submenu`]: {
      [`&-expand-icon, &-arrow`]: {
        position: "absolute",
        top: "50%",
        insetInlineEnd: token.margin,
        width: menuArrowSize,
        color: "currentcolor",
        transform: "translateY(-50%)",
        transition: `transform ${motionDurationSlow} ${motionEaseInOut}, opacity ${motionDurationSlow}`
      },
      "&-arrow": {
        // →
        "&::before, &::after": {
          position: "absolute",
          width: menuArrowSize * 0.6,
          height: menuArrowSize * 0.15,
          backgroundColor: "currentcolor",
          borderRadius,
          transition: [`background ${motionDurationSlow} ${motionEaseInOut}`, `transform ${motionDurationSlow} ${motionEaseInOut}`, `top ${motionDurationSlow} ${motionEaseInOut}`, `color ${motionDurationSlow} ${motionEaseInOut}`].join(","),
          content: '""'
        },
        "&::before": {
          transform: `rotate(45deg) translateY(-${menuArrowOffset})`
        },
        "&::after": {
          transform: `rotate(-45deg) translateY(${menuArrowOffset})`
        }
      }
    }
  };
};
const getBaseStyle = (token) => {
  const {
    antCls,
    componentCls,
    fontSize,
    motionDurationSlow,
    motionDurationMid,
    motionEaseInOut,
    lineHeight,
    paddingXS,
    padding,
    colorSplit,
    lineWidth,
    zIndexPopup,
    borderRadiusLG,
    radiusSubMenuItem,
    menuArrowSize,
    menuArrowOffset,
    lineType,
    menuPanelMaskInset
  } = token;
  return [
    // Misc
    {
      "": {
        [`${componentCls}`]: _extends(_extends({}, clearFix()), {
          // Hidden
          [`&-hidden`]: {
            display: "none"
          }
        })
      },
      [`${componentCls}-submenu-hidden`]: {
        display: "none"
      }
    },
    {
      [componentCls]: _extends(_extends(_extends(_extends(_extends(_extends(_extends({}, resetComponent(token)), clearFix()), {
        marginBottom: 0,
        paddingInlineStart: 0,
        // Override default ul/ol
        fontSize,
        lineHeight: 0,
        listStyle: "none",
        outline: "none",
        transition: `width ${motionDurationSlow} cubic-bezier(0.2, 0, 0, 1) 0s`,
        [`ul, ol`]: {
          margin: 0,
          padding: 0,
          listStyle: "none"
        },
        // Overflow ellipsis
        [`&-overflow`]: {
          display: "flex",
          [`${componentCls}-item`]: {
            flex: "none"
          }
        },
        [`${componentCls}-item, ${componentCls}-submenu, ${componentCls}-submenu-title`]: {
          borderRadius: token.radiusItem
        },
        [`${componentCls}-item-group-title`]: {
          padding: `${paddingXS}px ${padding}px`,
          fontSize,
          lineHeight,
          transition: `all ${motionDurationSlow}`
        },
        [`&-horizontal ${componentCls}-submenu`]: {
          transition: [`border-color ${motionDurationSlow} ${motionEaseInOut}`, `background ${motionDurationSlow} ${motionEaseInOut}`].join(",")
        },
        [`${componentCls}-submenu, ${componentCls}-submenu-inline`]: {
          transition: [`border-color ${motionDurationSlow} ${motionEaseInOut}`, `background ${motionDurationSlow} ${motionEaseInOut}`, `padding ${motionDurationMid} ${motionEaseInOut}`].join(",")
        },
        [`${componentCls}-submenu ${componentCls}-sub`]: {
          cursor: "initial",
          transition: [`background ${motionDurationSlow} ${motionEaseInOut}`, `padding ${motionDurationSlow} ${motionEaseInOut}`].join(",")
        },
        [`${componentCls}-title-content`]: {
          transition: `color ${motionDurationSlow}`
        },
        [`${componentCls}-item a`]: {
          "&::before": {
            position: "absolute",
            inset: 0,
            backgroundColor: "transparent",
            content: '""'
          }
        },
        // Removed a Badge related style seems it's safe
        // https://github.com/ant-design/ant-design/issues/19809
        // >>>>> Divider
        [`${componentCls}-item-divider`]: {
          overflow: "hidden",
          lineHeight: 0,
          borderColor: colorSplit,
          borderStyle: lineType,
          borderWidth: 0,
          borderTopWidth: lineWidth,
          marginBlock: lineWidth,
          padding: 0,
          "&-dashed": {
            borderStyle: "dashed"
          }
        }
      }), genMenuItemStyle(token)), {
        [`${componentCls}-item-group`]: {
          [`${componentCls}-item-group-list`]: {
            margin: 0,
            padding: 0,
            [`${componentCls}-item, ${componentCls}-submenu-title`]: {
              paddingInline: `${fontSize * 2}px ${padding}px`
            }
          }
        },
        // ======================= Sub Menu =======================
        "&-submenu": {
          "&-popup": {
            position: "absolute",
            zIndex: zIndexPopup,
            background: "transparent",
            borderRadius: borderRadiusLG,
            boxShadow: "none",
            transformOrigin: "0 0",
            // https://github.com/ant-design/ant-design/issues/13955
            "&::before": {
              position: "absolute",
              inset: `${menuPanelMaskInset}px 0 0`,
              zIndex: -1,
              width: "100%",
              height: "100%",
              opacity: 0,
              content: '""'
            }
          },
          // https://github.com/ant-design/ant-design/issues/13955
          "&-placement-rightTop::before": {
            top: 0,
            insetInlineStart: menuPanelMaskInset
          },
          [`> ${componentCls}`]: _extends(_extends(_extends({
            borderRadius: borderRadiusLG
          }, genMenuItemStyle(token)), genSubMenuArrowStyle(token)), {
            [`${componentCls}-item, ${componentCls}-submenu > ${componentCls}-submenu-title`]: {
              borderRadius: radiusSubMenuItem
            },
            [`${componentCls}-submenu-title::after`]: {
              transition: `transform ${motionDurationSlow} ${motionEaseInOut}`
            }
          })
        }
      }), genSubMenuArrowStyle(token)), {
        [`&-inline-collapsed ${componentCls}-submenu-arrow,
        &-inline ${componentCls}-submenu-arrow`]: {
          // ↓
          "&::before": {
            transform: `rotate(-45deg) translateX(${menuArrowOffset})`
          },
          "&::after": {
            transform: `rotate(45deg) translateX(-${menuArrowOffset})`
          }
        },
        [`${componentCls}-submenu-open${componentCls}-submenu-inline > ${componentCls}-submenu-title > ${componentCls}-submenu-arrow`]: {
          // ↑
          transform: `translateY(-${menuArrowSize * 0.2}px)`,
          "&::after": {
            transform: `rotate(-45deg) translateX(-${menuArrowOffset})`
          },
          "&::before": {
            transform: `rotate(45deg) translateX(${menuArrowOffset})`
          }
        }
      })
    },
    // Integration with header element so menu items have the same height
    {
      [`${antCls}-layout-header`]: {
        [componentCls]: {
          lineHeight: "inherit"
        }
      }
    }
  ];
};
const useStyle$3 = (prefixCls, injectStyle) => {
  const useOriginHook = genComponentStyleHook("Menu", (token, _ref) => {
    let {
      overrideComponentToken
    } = _ref;
    if ((injectStyle === null || injectStyle === void 0 ? void 0 : injectStyle.value) === false) {
      return [];
    }
    const {
      colorBgElevated,
      colorPrimary,
      colorError,
      colorErrorHover,
      colorTextLightSolid
    } = token;
    const {
      controlHeightLG,
      fontSize
    } = token;
    const menuArrowSize = fontSize / 7 * 5;
    const menuToken = merge(token, {
      menuItemHeight: controlHeightLG,
      menuItemPaddingInline: token.margin,
      menuArrowSize,
      menuHorizontalHeight: controlHeightLG * 1.15,
      menuArrowOffset: `${menuArrowSize * 0.25}px`,
      menuPanelMaskInset: -7,
      menuSubMenuBg: colorBgElevated
    });
    const colorTextDark = new TinyColor(colorTextLightSolid).setAlpha(0.65).toRgbString();
    const menuDarkToken = merge(menuToken, {
      colorItemText: colorTextDark,
      colorItemTextHover: colorTextLightSolid,
      colorGroupTitle: colorTextDark,
      colorItemTextSelected: colorTextLightSolid,
      colorItemBg: "#001529",
      colorSubItemBg: "#000c17",
      colorItemBgActive: "transparent",
      colorItemBgSelected: colorPrimary,
      colorActiveBarWidth: 0,
      colorActiveBarHeight: 0,
      colorActiveBarBorderSize: 0,
      // Disabled
      colorItemTextDisabled: new TinyColor(colorTextLightSolid).setAlpha(0.25).toRgbString(),
      // Danger
      colorDangerItemText: colorError,
      colorDangerItemTextHover: colorErrorHover,
      colorDangerItemTextSelected: colorTextLightSolid,
      colorDangerItemBgActive: colorError,
      colorDangerItemBgSelected: colorError,
      menuSubMenuBg: "#001529",
      // Horizontal
      colorItemTextSelectedHorizontal: colorTextLightSolid,
      colorItemBgSelectedHorizontal: colorPrimary
    }, _extends({}, overrideComponentToken));
    return [
      // Basic
      getBaseStyle(menuToken),
      // Horizontal
      getHorizontalStyle$1(menuToken),
      // Vertical
      getVerticalStyle$1(menuToken),
      // Theme
      getThemeStyle$1(menuToken, "light"),
      getThemeStyle$1(menuDarkToken, "dark"),
      // RTL
      getRTLStyle$1(menuToken),
      // Motion
      genCollapseMotion$1(menuToken),
      initSlideMotion(menuToken, "slide-up"),
      initSlideMotion(menuToken, "slide-down"),
      initZoomMotion(menuToken, "zoom-big")
    ];
  }, (token) => {
    const {
      colorPrimary,
      colorError,
      colorTextDisabled,
      colorErrorBg,
      colorText,
      colorTextDescription,
      colorBgContainer,
      colorFillAlter,
      colorFillContent,
      lineWidth,
      lineWidthBold,
      controlItemBgActive,
      colorBgTextHover
    } = token;
    return {
      dropdownWidth: 160,
      zIndexPopup: token.zIndexPopupBase + 50,
      radiusItem: token.borderRadiusLG,
      radiusSubMenuItem: token.borderRadiusSM,
      colorItemText: colorText,
      colorItemTextHover: colorText,
      colorItemTextHoverHorizontal: colorPrimary,
      colorGroupTitle: colorTextDescription,
      colorItemTextSelected: colorPrimary,
      colorItemTextSelectedHorizontal: colorPrimary,
      colorItemBg: colorBgContainer,
      colorItemBgHover: colorBgTextHover,
      colorItemBgActive: colorFillContent,
      colorSubItemBg: colorFillAlter,
      colorItemBgSelected: controlItemBgActive,
      colorItemBgSelectedHorizontal: "transparent",
      colorActiveBarWidth: 0,
      colorActiveBarHeight: lineWidthBold,
      colorActiveBarBorderSize: lineWidth,
      // Disabled
      colorItemTextDisabled: colorTextDisabled,
      // Danger
      colorDangerItemText: colorError,
      colorDangerItemTextHover: colorError,
      colorDangerItemTextSelected: colorError,
      colorDangerItemBgActive: colorErrorBg,
      colorDangerItemBgSelected: colorErrorBg,
      itemMarginInline: token.marginXXS
    };
  });
  return useOriginHook(prefixCls);
};
const menuProps = () => ({
  id: String,
  prefixCls: String,
  // donot use items, now only support inner use
  items: Array,
  disabled: Boolean,
  inlineCollapsed: Boolean,
  disabledOverflow: Boolean,
  forceSubMenuRender: Boolean,
  openKeys: Array,
  selectedKeys: Array,
  activeKey: String,
  selectable: {
    type: Boolean,
    default: true
  },
  multiple: {
    type: Boolean,
    default: false
  },
  tabindex: {
    type: [Number, String]
  },
  motion: Object,
  role: String,
  theme: {
    type: String,
    default: "light"
  },
  mode: {
    type: String,
    default: "vertical"
  },
  inlineIndent: {
    type: Number,
    default: 24
  },
  subMenuOpenDelay: {
    type: Number,
    default: 0
  },
  subMenuCloseDelay: {
    type: Number,
    default: 0.1
  },
  builtinPlacements: {
    type: Object
  },
  triggerSubMenuAction: {
    type: String,
    default: "hover"
  },
  getPopupContainer: Function,
  expandIcon: Function,
  onOpenChange: Function,
  onSelect: Function,
  onDeselect: Function,
  onClick: [Function, Array],
  onFocus: Function,
  onBlur: Function,
  onMousedown: Function,
  "onUpdate:openKeys": Function,
  "onUpdate:selectedKeys": Function,
  "onUpdate:activeKey": Function
});
const EMPTY_LIST = [];
const Menu = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "AMenu",
  inheritAttrs: false,
  props: menuProps(),
  slots: Object,
  setup(props, _ref) {
    let {
      slots,
      emit,
      attrs
    } = _ref;
    const {
      direction,
      getPrefixCls
    } = useConfigInject("menu", props);
    const override = useInjectOverride();
    const prefixCls = computed(() => {
      var _a;
      return getPrefixCls("menu", props.prefixCls || ((_a = override === null || override === void 0 ? void 0 : override.prefixCls) === null || _a === void 0 ? void 0 : _a.value));
    });
    const [wrapSSR, hashId] = useStyle$3(prefixCls, computed(() => {
      return !override;
    }));
    const store = shallowRef(/* @__PURE__ */ new Map());
    const siderCollapsed = inject(SiderCollapsedKey, ref(void 0));
    const inlineCollapsed = computed(() => {
      if (siderCollapsed.value !== void 0) {
        return siderCollapsed.value;
      }
      return props.inlineCollapsed;
    });
    const {
      itemsNodes
    } = useItems(props);
    const isMounted = shallowRef(false);
    watchEffect(() => {
      devWarning(!(props.inlineCollapsed === true && props.mode !== "inline"), "Menu", "`inlineCollapsed` should only be used when `mode` is inline.");
      devWarning(!(siderCollapsed.value !== void 0 && props.inlineCollapsed === true), "Menu", "`inlineCollapsed` not control Menu under Sider. Should set `collapsed` on Sider instead.");
    });
    const activeKeys = ref([]);
    const mergedSelectedKeys = ref([]);
    const keyMapStore = ref({});
    watch(store, () => {
      const newKeyMapStore = {};
      for (const menuInfo of store.value.values()) {
        newKeyMapStore[menuInfo.key] = menuInfo;
      }
      keyMapStore.value = newKeyMapStore;
    }, {
      flush: "post"
    });
    watchEffect(() => {
      if (props.activeKey !== void 0) {
        let keys = [];
        const menuInfo = props.activeKey ? keyMapStore.value[props.activeKey] : void 0;
        if (menuInfo && props.activeKey !== void 0) {
          keys = uniq([].concat(unref(menuInfo.parentKeys), props.activeKey));
        } else {
          keys = [];
        }
        if (!shallowequal(activeKeys.value, keys)) {
          activeKeys.value = keys;
        }
      }
    });
    watch(() => props.selectedKeys, (selectedKeys) => {
      if (selectedKeys) {
        mergedSelectedKeys.value = selectedKeys.slice();
      }
    }, {
      immediate: true,
      deep: true
    });
    const selectedSubMenuKeys = ref([]);
    watch([keyMapStore, mergedSelectedKeys], () => {
      let subMenuParentKeys = [];
      mergedSelectedKeys.value.forEach((key) => {
        const menuInfo = keyMapStore.value[key];
        if (menuInfo) {
          subMenuParentKeys = subMenuParentKeys.concat(unref(menuInfo.parentKeys));
        }
      });
      subMenuParentKeys = uniq(subMenuParentKeys);
      if (!shallowequal(selectedSubMenuKeys.value, subMenuParentKeys)) {
        selectedSubMenuKeys.value = subMenuParentKeys;
      }
    }, {
      immediate: true
    });
    const triggerSelection = (info) => {
      if (props.selectable) {
        const {
          key: targetKey
        } = info;
        const exist = mergedSelectedKeys.value.includes(targetKey);
        let newSelectedKeys;
        if (props.multiple) {
          if (exist) {
            newSelectedKeys = mergedSelectedKeys.value.filter((key) => key !== targetKey);
          } else {
            newSelectedKeys = [...mergedSelectedKeys.value, targetKey];
          }
        } else {
          newSelectedKeys = [targetKey];
        }
        const selectInfo = _extends(_extends({}, info), {
          selectedKeys: newSelectedKeys
        });
        if (!shallowequal(newSelectedKeys, mergedSelectedKeys.value)) {
          if (props.selectedKeys === void 0) {
            mergedSelectedKeys.value = newSelectedKeys;
          }
          emit("update:selectedKeys", newSelectedKeys);
          if (exist && props.multiple) {
            emit("deselect", selectInfo);
          } else {
            emit("select", selectInfo);
          }
        }
      }
      if (mergedMode.value !== "inline" && !props.multiple && mergedOpenKeys.value.length) {
        triggerOpenKeys(EMPTY_LIST);
      }
    };
    const mergedOpenKeys = ref([]);
    watch(() => props.openKeys, function() {
      let openKeys = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : mergedOpenKeys.value;
      if (!shallowequal(mergedOpenKeys.value, openKeys)) {
        mergedOpenKeys.value = openKeys.slice();
      }
    }, {
      immediate: true,
      deep: true
    });
    let timeout;
    const changeActiveKeys = (keys) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (props.activeKey === void 0) {
          activeKeys.value = keys;
        }
        emit("update:activeKey", keys[keys.length - 1]);
      });
    };
    const disabled = computed(() => !!props.disabled);
    const isRtl = computed(() => direction.value === "rtl");
    const mergedMode = ref("vertical");
    const mergedInlineCollapsed = shallowRef(false);
    watchEffect(() => {
      var _a;
      if ((props.mode === "inline" || props.mode === "vertical") && inlineCollapsed.value) {
        mergedMode.value = "vertical";
        mergedInlineCollapsed.value = inlineCollapsed.value;
      } else {
        mergedMode.value = props.mode;
        mergedInlineCollapsed.value = false;
      }
      if ((_a = override === null || override === void 0 ? void 0 : override.mode) === null || _a === void 0 ? void 0 : _a.value) {
        mergedMode.value = override.mode.value;
      }
    });
    const isInlineMode = computed(() => mergedMode.value === "inline");
    const triggerOpenKeys = (keys) => {
      mergedOpenKeys.value = keys;
      emit("update:openKeys", keys);
      emit("openChange", keys);
    };
    const inlineCacheOpenKeys = ref(mergedOpenKeys.value);
    const mountRef = shallowRef(false);
    watch(mergedOpenKeys, () => {
      if (isInlineMode.value) {
        inlineCacheOpenKeys.value = mergedOpenKeys.value;
      }
    }, {
      immediate: true
    });
    watch(isInlineMode, () => {
      if (!mountRef.value) {
        mountRef.value = true;
        return;
      }
      if (isInlineMode.value) {
        mergedOpenKeys.value = inlineCacheOpenKeys.value;
      } else {
        triggerOpenKeys(EMPTY_LIST);
      }
    }, {
      immediate: true
    });
    const className = computed(() => {
      return {
        [`${prefixCls.value}`]: true,
        [`${prefixCls.value}-root`]: true,
        [`${prefixCls.value}-${mergedMode.value}`]: true,
        [`${prefixCls.value}-inline-collapsed`]: mergedInlineCollapsed.value,
        [`${prefixCls.value}-rtl`]: isRtl.value,
        [`${prefixCls.value}-${props.theme}`]: true
      };
    });
    const rootPrefixCls = computed(() => getPrefixCls());
    const defaultMotions = computed(() => ({
      horizontal: {
        name: `${rootPrefixCls.value}-slide-up`
      },
      inline: collapseMotion$1,
      other: {
        name: `${rootPrefixCls.value}-zoom-big`
      }
    }));
    useProvideFirstLevel(true);
    const getChildrenKeys = function() {
      let eventKeys = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
      const keys = [];
      const storeValue = store.value;
      eventKeys.forEach((eventKey) => {
        const {
          key,
          childrenEventKeys
        } = storeValue.get(eventKey);
        keys.push(key, ...getChildrenKeys(unref(childrenEventKeys)));
      });
      return keys;
    };
    const onInternalClick = (info) => {
      var _a;
      emit("click", info);
      triggerSelection(info);
      (_a = override === null || override === void 0 ? void 0 : override.onClick) === null || _a === void 0 ? void 0 : _a.call(override);
    };
    const onInternalOpenChange = (key, open) => {
      var _a;
      const childrenEventKeys = ((_a = keyMapStore.value[key]) === null || _a === void 0 ? void 0 : _a.childrenEventKeys) || [];
      let newOpenKeys = mergedOpenKeys.value.filter((k) => k !== key);
      if (open) {
        newOpenKeys.push(key);
      } else if (mergedMode.value !== "inline") {
        const subPathKeys = getChildrenKeys(unref(childrenEventKeys));
        newOpenKeys = uniq(newOpenKeys.filter((k) => !subPathKeys.includes(k)));
      }
      if (!shallowequal(mergedOpenKeys, newOpenKeys)) {
        triggerOpenKeys(newOpenKeys);
      }
    };
    const registerMenuInfo = (key, info) => {
      store.value.set(key, info);
      store.value = new Map(store.value);
    };
    const unRegisterMenuInfo = (key) => {
      store.value.delete(key);
      store.value = new Map(store.value);
    };
    const lastVisibleIndex = ref(0);
    const expandIcon = computed(() => {
      var _a;
      return props.expandIcon || slots.expandIcon || ((_a = override === null || override === void 0 ? void 0 : override.expandIcon) === null || _a === void 0 ? void 0 : _a.value) ? (opt) => {
        let icon = props.expandIcon || slots.expandIcon;
        icon = typeof icon === "function" ? icon(opt) : icon;
        return cloneElement(icon, {
          class: `${prefixCls.value}-submenu-expand-icon`
        }, false);
      } : null;
    });
    useProvideMenu$1({
      prefixCls,
      activeKeys,
      openKeys: mergedOpenKeys,
      selectedKeys: mergedSelectedKeys,
      changeActiveKeys,
      disabled,
      rtl: isRtl,
      mode: mergedMode,
      inlineIndent: computed(() => props.inlineIndent),
      subMenuCloseDelay: computed(() => props.subMenuCloseDelay),
      subMenuOpenDelay: computed(() => props.subMenuOpenDelay),
      builtinPlacements: computed(() => props.builtinPlacements),
      triggerSubMenuAction: computed(() => props.triggerSubMenuAction),
      getPopupContainer: computed(() => props.getPopupContainer),
      inlineCollapsed: mergedInlineCollapsed,
      theme: computed(() => props.theme),
      siderCollapsed,
      defaultMotions: computed(() => isMounted.value ? defaultMotions.value : null),
      motion: computed(() => isMounted.value ? props.motion : null),
      overflowDisabled: shallowRef(void 0),
      onOpenChange: onInternalOpenChange,
      onItemClick: onInternalClick,
      registerMenuInfo,
      unRegisterMenuInfo,
      selectedSubMenuKeys,
      expandIcon,
      forceSubMenuRender: computed(() => props.forceSubMenuRender),
      rootClassName: hashId
    });
    return () => {
      var _a, _b;
      const childList = itemsNodes.value || flattenChildren((_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots));
      const allVisible = lastVisibleIndex.value >= childList.length - 1 || mergedMode.value !== "horizontal" || props.disabledOverflow;
      const wrappedChildList = mergedMode.value !== "horizontal" || props.disabledOverflow ? childList : (
        // Need wrap for overflow dropdown that do not response for open
        childList.map((child, index) => (
          // Always wrap provider to avoid sub node re-mount
          createVNode(MenuContextProvider, {
            "key": child.key,
            "overflowDisabled": index > lastVisibleIndex.value
          }, {
            default: () => child
          })
        ))
      );
      const overflowedIndicator = ((_b = slots.overflowedIndicator) === null || _b === void 0 ? void 0 : _b.call(slots)) || createVNode(EllipsisOutlined$1, null, null);
      return wrapSSR(createVNode(Overflow$1, _objectSpread$9(_objectSpread$9({}, attrs), {}, {
        "onMousedown": props.onMousedown,
        "prefixCls": `${prefixCls.value}-overflow`,
        "component": "ul",
        "itemComponent": __nuxt_component_5,
        "class": [className.value, attrs.class, hashId.value],
        "role": "menu",
        "id": props.id,
        "data": wrappedChildList,
        "renderRawItem": (node) => node,
        "renderRawRest": (omitItems) => {
          const len = omitItems.length;
          const originOmitItems = len ? childList.slice(-len) : null;
          return createVNode(Fragment, null, [createVNode(__nuxt_component_3, {
            "eventKey": OVERFLOW_KEY,
            "key": OVERFLOW_KEY,
            "title": overflowedIndicator,
            "disabled": allVisible,
            "internalPopupClose": len === 0
          }, {
            default: () => originOmitItems
          }), createVNode(PathContext, null, {
            default: () => [createVNode(__nuxt_component_3, {
              "eventKey": OVERFLOW_KEY,
              "key": OVERFLOW_KEY,
              "title": overflowedIndicator,
              "disabled": allVisible,
              "internalPopupClose": len === 0
            }, {
              default: () => originOmitItems
            })]
          })]);
        },
        "maxCount": mergedMode.value !== "horizontal" || props.disabledOverflow ? Overflow$1.INVALIDATE : Overflow$1.RESPONSIVE,
        "ssr": "full",
        "data-menu-list": true,
        "onVisibleChange": (newLastIndex) => {
          lastVisibleIndex.value = newLastIndex;
        }
      }), {
        default: () => [createVNode(Teleport, {
          "to": "body"
        }, {
          default: () => [createVNode("div", {
            "style": {
              display: "none"
            },
            "aria-hidden": true
          }, [createVNode(PathContext, null, {
            default: () => [wrappedChildList]
          })])]
        })]
      }));
    };
  }
});
Menu.install = function(app) {
  app.component(Menu.name, Menu);
  app.component(__nuxt_component_5.name, __nuxt_component_5);
  app.component(__nuxt_component_3.name, __nuxt_component_3);
  app.component(Divider.name, Divider);
  app.component(ItemGroup.name, ItemGroup);
  return app;
};
Menu.Item = __nuxt_component_5;
Menu.Divider = Divider;
Menu.SubMenu = __nuxt_component_3;
Menu.ItemGroup = ItemGroup;
function useRaf(callback) {
  const rafRef = shallowRef();
  const removedRef = shallowRef(false);
  function trigger() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (!removedRef.value) {
      wrapperRaf.cancel(rafRef.value);
      rafRef.value = wrapperRaf(() => {
        callback(...args);
      });
    }
  }
  return trigger;
}
function useRafState(defaultState) {
  const batchRef = shallowRef([]);
  const state = shallowRef(typeof defaultState === "function" ? defaultState() : defaultState);
  const flushUpdate = useRaf(() => {
    let value = state.value;
    batchRef.value.forEach((callback) => {
      value = callback(value);
    });
    batchRef.value = [];
    state.value = value;
  });
  function updater(callback) {
    batchRef.value.push(callback);
    flushUpdate();
  }
  return [state, updater];
}
const TabNode = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "TabNode",
  props: {
    id: {
      type: String
    },
    prefixCls: {
      type: String
    },
    tab: {
      type: Object
    },
    active: {
      type: Boolean
    },
    closable: {
      type: Boolean
    },
    editable: {
      type: Object
    },
    onClick: {
      type: Function
    },
    onResize: {
      type: Function
    },
    renderWrapper: {
      type: Function
    },
    removeAriaLabel: {
      type: String
    },
    // onRemove: { type: Function as PropType<() => void> },
    onFocus: {
      type: Function
    }
  },
  emits: ["click", "resize", "remove", "focus"],
  setup(props, _ref) {
    let {
      expose,
      attrs
    } = _ref;
    const domRef = ref();
    function onInternalClick(e) {
      var _a;
      if ((_a = props.tab) === null || _a === void 0 ? void 0 : _a.disabled) {
        return;
      }
      props.onClick(e);
    }
    expose({
      domRef
    });
    function onRemoveTab(event) {
      var _a;
      event.preventDefault();
      event.stopPropagation();
      props.editable.onEdit("remove", {
        key: (_a = props.tab) === null || _a === void 0 ? void 0 : _a.key,
        event
      });
    }
    const removable = computed(() => {
      var _a;
      return props.editable && props.closable !== false && !((_a = props.tab) === null || _a === void 0 ? void 0 : _a.disabled);
    });
    return () => {
      var _a;
      const {
        prefixCls,
        id,
        active,
        tab: {
          key,
          tab,
          disabled,
          closeIcon
        },
        renderWrapper,
        removeAriaLabel,
        editable,
        onFocus
      } = props;
      const tabPrefix = `${prefixCls}-tab`;
      const node = createVNode("div", {
        "key": key,
        "ref": domRef,
        "class": classNames(tabPrefix, {
          [`${tabPrefix}-with-remove`]: removable.value,
          [`${tabPrefix}-active`]: active,
          [`${tabPrefix}-disabled`]: disabled
        }),
        "style": attrs.style,
        "onClick": onInternalClick
      }, [createVNode("div", {
        "role": "tab",
        "aria-selected": active,
        "id": id && `${id}-tab-${key}`,
        "class": `${tabPrefix}-btn`,
        "aria-controls": id && `${id}-panel-${key}`,
        "aria-disabled": disabled,
        "tabindex": disabled ? null : 0,
        "onClick": (e) => {
          e.stopPropagation();
          onInternalClick(e);
        },
        "onKeydown": (e) => {
          if ([KeyCode$1.SPACE, KeyCode$1.ENTER].includes(e.which)) {
            e.preventDefault();
            onInternalClick(e);
          }
        },
        "onFocus": onFocus
      }, [typeof tab === "function" ? tab() : tab]), removable.value && createVNode("button", {
        "type": "button",
        "aria-label": removeAriaLabel || "remove",
        "tabindex": 0,
        "class": `${tabPrefix}-remove`,
        "onClick": (e) => {
          e.stopPropagation();
          onRemoveTab(e);
        }
      }, [(closeIcon === null || closeIcon === void 0 ? void 0 : closeIcon()) || ((_a = editable.removeIcon) === null || _a === void 0 ? void 0 : _a.call(editable)) || "×"])]);
      return renderWrapper ? renderWrapper(node) : node;
    };
  }
});
const DEFAULT_SIZE$1 = {
  width: 0,
  height: 0,
  left: 0,
  top: 0
};
function useOffsets(tabs, tabSizes) {
  const offsetMap = ref(/* @__PURE__ */ new Map());
  watchEffect(() => {
    var _a, _b;
    const map = /* @__PURE__ */ new Map();
    const tabsValue = tabs.value;
    const lastOffset = tabSizes.value.get((_a = tabsValue[0]) === null || _a === void 0 ? void 0 : _a.key) || DEFAULT_SIZE$1;
    const rightOffset = lastOffset.left + lastOffset.width;
    for (let i = 0; i < tabsValue.length; i += 1) {
      const {
        key
      } = tabsValue[i];
      let data2 = tabSizes.value.get(key);
      if (!data2) {
        data2 = tabSizes.value.get((_b = tabsValue[i - 1]) === null || _b === void 0 ? void 0 : _b.key) || DEFAULT_SIZE$1;
      }
      const entity = map.get(key) || _extends({}, data2);
      entity.right = rightOffset - entity.left - entity.width;
      map.set(key, entity);
    }
    offsetMap.value = new Map(map);
  });
  return offsetMap;
}
const AddButton = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "AddButton",
  inheritAttrs: false,
  props: {
    prefixCls: String,
    editable: {
      type: Object
    },
    locale: {
      type: Object,
      default: void 0
    }
  },
  setup(props, _ref) {
    let {
      expose,
      attrs
    } = _ref;
    const domRef = ref();
    expose({
      domRef
    });
    return () => {
      const {
        prefixCls,
        editable,
        locale: locale2
      } = props;
      if (!editable || editable.showAdd === false) {
        return null;
      }
      return createVNode("button", {
        "ref": domRef,
        "type": "button",
        "class": `${prefixCls}-nav-add`,
        "style": attrs.style,
        "aria-label": (locale2 === null || locale2 === void 0 ? void 0 : locale2.addAriaLabel) || "Add tab",
        "onClick": (event) => {
          editable.onEdit("add", {
            event
          });
        }
      }, [editable.addIcon ? editable.addIcon() : "+"]);
    };
  }
});
const operationNodeProps = {
  prefixCls: {
    type: String
  },
  id: {
    type: String
  },
  tabs: {
    type: Object
  },
  rtl: {
    type: Boolean
  },
  tabBarGutter: {
    type: Number
  },
  activeKey: {
    type: [String, Number]
  },
  mobile: {
    type: Boolean
  },
  moreIcon: PropTypes$1.any,
  moreTransitionName: {
    type: String
  },
  editable: {
    type: Object
  },
  locale: {
    type: Object,
    default: void 0
  },
  removeAriaLabel: String,
  onTabClick: {
    type: Function
  },
  popupClassName: String,
  getPopupContainer: functionType()
};
const OperationNode = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "OperationNode",
  inheritAttrs: false,
  props: operationNodeProps,
  emits: ["tabClick"],
  slots: Object,
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const [open, setOpen] = useState(false);
    const [selectedKey, setSelectedKey] = useState(null);
    const selectOffset = (offset) => {
      const enabledTabs = props.tabs.filter((tab) => !tab.disabled);
      let selectedIndex = enabledTabs.findIndex((tab) => tab.key === selectedKey.value) || 0;
      const len = enabledTabs.length;
      for (let i = 0; i < len; i += 1) {
        selectedIndex = (selectedIndex + offset + len) % len;
        const tab = enabledTabs[selectedIndex];
        if (!tab.disabled) {
          setSelectedKey(tab.key);
          return;
        }
      }
    };
    const onKeyDown = (e) => {
      const {
        which
      } = e;
      if (!open.value) {
        if ([KeyCode$1.DOWN, KeyCode$1.SPACE, KeyCode$1.ENTER].includes(which)) {
          setOpen(true);
          e.preventDefault();
        }
        return;
      }
      switch (which) {
        case KeyCode$1.UP:
          selectOffset(-1);
          e.preventDefault();
          break;
        case KeyCode$1.DOWN:
          selectOffset(1);
          e.preventDefault();
          break;
        case KeyCode$1.ESC:
          setOpen(false);
          break;
        case KeyCode$1.SPACE:
        case KeyCode$1.ENTER:
          if (selectedKey.value !== null)
            props.onTabClick(selectedKey.value, e);
          break;
      }
    };
    const popupId = computed(() => `${props.id}-more-popup`);
    const selectedItemId = computed(() => selectedKey.value !== null ? `${popupId.value}-${selectedKey.value}` : null);
    const onRemoveTab = (event, key) => {
      event.preventDefault();
      event.stopPropagation();
      props.editable.onEdit("remove", {
        key,
        event
      });
    };
    watch(open, () => {
      if (!open.value) {
        setSelectedKey(null);
      }
    });
    useProvideOverride({});
    return () => {
      var _a;
      const {
        prefixCls,
        id,
        tabs,
        locale: locale2,
        mobile,
        moreIcon = ((_a = slots.moreIcon) === null || _a === void 0 ? void 0 : _a.call(slots)) || createVNode(EllipsisOutlined$1, null, null),
        moreTransitionName,
        editable,
        tabBarGutter,
        rtl,
        onTabClick,
        popupClassName
      } = props;
      if (!tabs.length)
        return null;
      const dropdownPrefix = `${prefixCls}-dropdown`;
      const dropdownAriaLabel = locale2 === null || locale2 === void 0 ? void 0 : locale2.dropdownAriaLabel;
      const moreStyle = {
        [rtl ? "marginRight" : "marginLeft"]: tabBarGutter
      };
      if (!tabs.length) {
        moreStyle.visibility = "hidden";
        moreStyle.order = 1;
      }
      const overlayClassName = classNames({
        [`${dropdownPrefix}-rtl`]: rtl,
        [`${popupClassName}`]: true
      });
      const moreNode = mobile ? null : createVNode(Dropdown, {
        "prefixCls": dropdownPrefix,
        "trigger": ["hover"],
        "visible": open.value,
        "transitionName": moreTransitionName,
        "onVisibleChange": setOpen,
        "overlayClassName": overlayClassName,
        "mouseEnterDelay": 0.1,
        "mouseLeaveDelay": 0.1,
        "getPopupContainer": props.getPopupContainer
      }, {
        overlay: () => createVNode(Menu, {
          "onClick": (_ref2) => {
            let {
              key,
              domEvent
            } = _ref2;
            onTabClick(key, domEvent);
            setOpen(false);
          },
          "id": popupId.value,
          "tabindex": -1,
          "role": "listbox",
          "aria-activedescendant": selectedItemId.value,
          "selectedKeys": [selectedKey.value],
          "aria-label": dropdownAriaLabel !== void 0 ? dropdownAriaLabel : "expanded dropdown"
        }, {
          default: () => [tabs.map((tab) => {
            var _a2, _b;
            const removable = editable && tab.closable !== false && !tab.disabled;
            return createVNode(__nuxt_component_5, {
              "key": tab.key,
              "id": `${popupId.value}-${tab.key}`,
              "role": "option",
              "aria-controls": id && `${id}-panel-${tab.key}`,
              "disabled": tab.disabled
            }, {
              default: () => [createVNode("span", null, [typeof tab.tab === "function" ? tab.tab() : tab.tab]), removable && createVNode("button", {
                "type": "button",
                "aria-label": props.removeAriaLabel || "remove",
                "tabindex": 0,
                "class": `${dropdownPrefix}-menu-item-remove`,
                "onClick": (e) => {
                  e.stopPropagation();
                  onRemoveTab(e, tab.key);
                }
              }, [((_a2 = tab.closeIcon) === null || _a2 === void 0 ? void 0 : _a2.call(tab)) || ((_b = editable.removeIcon) === null || _b === void 0 ? void 0 : _b.call(editable)) || "×"])]
            });
          })]
        }),
        default: () => createVNode("button", {
          "type": "button",
          "class": `${prefixCls}-nav-more`,
          "style": moreStyle,
          "tabindex": -1,
          "aria-hidden": "true",
          "aria-haspopup": "listbox",
          "aria-controls": popupId.value,
          "id": `${id}-more`,
          "aria-expanded": open.value,
          "onKeydown": onKeyDown
        }, [moreIcon])
      });
      return createVNode("div", {
        "class": classNames(`${prefixCls}-nav-operations`, attrs.class),
        "style": attrs.style
      }, [moreNode, createVNode(AddButton, {
        "prefixCls": prefixCls,
        "locale": locale2,
        "editable": editable
      }, null)]);
    };
  }
});
const TabsContextKey = Symbol("tabsContextKey");
const useProvideTabs = (props) => {
  provide(TabsContextKey, props);
};
const useInjectTabs = () => {
  return inject(TabsContextKey, {
    tabs: ref([]),
    prefixCls: ref()
  });
};
const MIN_SWIPE_DISTANCE = 0.1;
const STOP_SWIPE_DISTANCE = 0.01;
const REFRESH_INTERVAL = 20;
const SPEED_OFF_MULTIPLE = Math.pow(0.995, REFRESH_INTERVAL);
function useTouchMove(domRef, onOffset) {
  const [touchPosition, setTouchPosition] = useState();
  const [lastTimestamp, setLastTimestamp] = useState(0);
  const [lastTimeDiff, setLastTimeDiff] = useState(0);
  const [lastOffset, setLastOffset] = useState();
  const motionInterval = ref();
  function onTouchStart(e) {
    const {
      screenX,
      screenY
    } = e.touches[0];
    setTouchPosition({
      x: screenX,
      y: screenY
    });
    clearInterval(motionInterval.value);
  }
  function onTouchMove(e) {
    if (!touchPosition.value)
      return;
    e.preventDefault();
    const {
      screenX,
      screenY
    } = e.touches[0];
    const offsetX = screenX - touchPosition.value.x;
    const offsetY = screenY - touchPosition.value.y;
    onOffset(offsetX, offsetY);
    setTouchPosition({
      x: screenX,
      y: screenY
    });
    const now = Date.now();
    setLastTimeDiff(now - lastTimestamp.value);
    setLastTimestamp(now);
    setLastOffset({
      x: offsetX,
      y: offsetY
    });
  }
  function onTouchEnd() {
    if (!touchPosition.value)
      return;
    const lastOffsetValue = lastOffset.value;
    setTouchPosition(null);
    setLastOffset(null);
    if (lastOffsetValue) {
      const distanceX = lastOffsetValue.x / lastTimeDiff.value;
      const distanceY = lastOffsetValue.y / lastTimeDiff.value;
      const absX = Math.abs(distanceX);
      const absY = Math.abs(distanceY);
      if (Math.max(absX, absY) < MIN_SWIPE_DISTANCE)
        return;
      let currentX = distanceX;
      let currentY = distanceY;
      motionInterval.value = setInterval(() => {
        if (Math.abs(currentX) < STOP_SWIPE_DISTANCE && Math.abs(currentY) < STOP_SWIPE_DISTANCE) {
          clearInterval(motionInterval.value);
          return;
        }
        currentX *= SPEED_OFF_MULTIPLE;
        currentY *= SPEED_OFF_MULTIPLE;
        onOffset(currentX * REFRESH_INTERVAL, currentY * REFRESH_INTERVAL);
      }, REFRESH_INTERVAL);
    }
  }
  const lastWheelDirectionRef = ref();
  function onWheel(e) {
    const {
      deltaX,
      deltaY
    } = e;
    let mixed = 0;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    if (absX === absY) {
      mixed = lastWheelDirectionRef.value === "x" ? deltaX : deltaY;
    } else if (absX > absY) {
      mixed = deltaX;
      lastWheelDirectionRef.value = "x";
    } else {
      mixed = deltaY;
      lastWheelDirectionRef.value = "y";
    }
    if (onOffset(-mixed, -mixed)) {
      e.preventDefault();
    }
  }
  ref({
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onWheel
  });
}
function useSyncState(defaultState, onChange) {
  const stateRef = ref(defaultState);
  function setState(updater) {
    const newValue = typeof updater === "function" ? updater(stateRef.value) : updater;
    if (newValue !== stateRef.value) {
      onChange(newValue, stateRef.value);
    }
    stateRef.value = newValue;
  }
  return [stateRef, setState];
}
const useRefs = () => {
  const refs = ref(/* @__PURE__ */ new Map());
  const setRef = (key) => (el) => {
    refs.value.set(key, el);
  };
  return [setRef, refs];
};
const useRefs$1 = useRefs;
const DEFAULT_SIZE = {
  width: 0,
  height: 0,
  left: 0,
  top: 0,
  right: 0
};
const tabNavListProps = () => {
  return {
    id: {
      type: String
    },
    tabPosition: {
      type: String
    },
    activeKey: {
      type: [String, Number]
    },
    rtl: {
      type: Boolean
    },
    animated: objectType(),
    editable: objectType(),
    moreIcon: PropTypes$1.any,
    moreTransitionName: {
      type: String
    },
    mobile: {
      type: Boolean
    },
    tabBarGutter: {
      type: Number
    },
    renderTabBar: {
      type: Function
    },
    locale: objectType(),
    popupClassName: String,
    getPopupContainer: functionType(),
    onTabClick: {
      type: Function
    },
    onTabScroll: {
      type: Function
    }
  };
};
const TabNavList = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "TabNavList",
  inheritAttrs: false,
  props: tabNavListProps(),
  slots: Object,
  emits: ["tabClick", "tabScroll"],
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      tabs,
      prefixCls
    } = useInjectTabs();
    const tabsWrapperRef = shallowRef();
    const tabListRef = shallowRef();
    const operationsRef = shallowRef();
    const innerAddButtonRef = shallowRef();
    const [setRef, btnRefs] = useRefs$1();
    const tabPositionTopOrBottom = computed(() => props.tabPosition === "top" || props.tabPosition === "bottom");
    const [transformLeft, setTransformLeft] = useSyncState(0, (next, prev) => {
      if (tabPositionTopOrBottom.value && props.onTabScroll) {
        props.onTabScroll({
          direction: next > prev ? "left" : "right"
        });
      }
    });
    const [transformTop, setTransformTop] = useSyncState(0, (next, prev) => {
      if (!tabPositionTopOrBottom.value && props.onTabScroll) {
        props.onTabScroll({
          direction: next > prev ? "top" : "bottom"
        });
      }
    });
    const [wrapperScrollWidth, setWrapperScrollWidth] = useState(0);
    const [wrapperScrollHeight, setWrapperScrollHeight] = useState(0);
    const [wrapperWidth, setWrapperWidth] = useState(null);
    const [wrapperHeight, setWrapperHeight] = useState(null);
    const [addWidth, setAddWidth] = useState(0);
    const [addHeight, setAddHeight] = useState(0);
    const [tabSizes, setTabSizes] = useRafState(/* @__PURE__ */ new Map());
    const tabOffsets = useOffsets(tabs, tabSizes);
    const operationsHiddenClassName = computed(() => `${prefixCls.value}-nav-operations-hidden`);
    const transformMin = shallowRef(0);
    const transformMax = shallowRef(0);
    watchEffect(() => {
      if (!tabPositionTopOrBottom.value) {
        transformMin.value = Math.min(0, wrapperHeight.value - wrapperScrollHeight.value);
        transformMax.value = 0;
      } else if (props.rtl) {
        transformMin.value = 0;
        transformMax.value = Math.max(0, wrapperScrollWidth.value - wrapperWidth.value);
      } else {
        transformMin.value = Math.min(0, wrapperWidth.value - wrapperScrollWidth.value);
        transformMax.value = 0;
      }
    });
    const alignInRange = (value) => {
      if (value < transformMin.value) {
        return transformMin.value;
      }
      if (value > transformMax.value) {
        return transformMax.value;
      }
      return value;
    };
    const touchMovingRef = shallowRef();
    const [lockAnimation, setLockAnimation] = useState();
    const doLockAnimation = () => {
      setLockAnimation(Date.now());
    };
    const clearTouchMoving = () => {
      clearTimeout(touchMovingRef.value);
    };
    const doMove = (setState, offset) => {
      setState((value) => {
        const newValue = alignInRange(value + offset);
        return newValue;
      });
    };
    useTouchMove(tabsWrapperRef, (offsetX, offsetY) => {
      if (tabPositionTopOrBottom.value) {
        if (wrapperWidth.value >= wrapperScrollWidth.value) {
          return false;
        }
        doMove(setTransformLeft, offsetX);
      } else {
        if (wrapperHeight.value >= wrapperScrollHeight.value) {
          return false;
        }
        doMove(setTransformTop, offsetY);
      }
      clearTouchMoving();
      doLockAnimation();
      return true;
    });
    watch(lockAnimation, () => {
      clearTouchMoving();
      if (lockAnimation.value) {
        touchMovingRef.value = setTimeout(() => {
          setLockAnimation(0);
        }, 100);
      }
    });
    const scrollToTab = function() {
      let key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : props.activeKey;
      const tabOffset = tabOffsets.value.get(key) || {
        width: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0
      };
      if (tabPositionTopOrBottom.value) {
        let newTransform = transformLeft.value;
        if (props.rtl) {
          if (tabOffset.right < transformLeft.value) {
            newTransform = tabOffset.right;
          } else if (tabOffset.right + tabOffset.width > transformLeft.value + wrapperWidth.value) {
            newTransform = tabOffset.right + tabOffset.width - wrapperWidth.value;
          }
        } else if (tabOffset.left < -transformLeft.value) {
          newTransform = -tabOffset.left;
        } else if (tabOffset.left + tabOffset.width > -transformLeft.value + wrapperWidth.value) {
          newTransform = -(tabOffset.left + tabOffset.width - wrapperWidth.value);
        }
        setTransformTop(0);
        setTransformLeft(alignInRange(newTransform));
      } else {
        let newTransform = transformTop.value;
        if (tabOffset.top < -transformTop.value) {
          newTransform = -tabOffset.top;
        } else if (tabOffset.top + tabOffset.height > -transformTop.value + wrapperHeight.value) {
          newTransform = -(tabOffset.top + tabOffset.height - wrapperHeight.value);
        }
        setTransformLeft(0);
        setTransformTop(alignInRange(newTransform));
      }
    };
    const visibleStart = shallowRef(0);
    const visibleEnd = shallowRef(0);
    watchEffect(() => {
      let unit;
      let position;
      let transformSize;
      let basicSize;
      let tabContentSize;
      let addSize;
      const tabOffsetsValue = tabOffsets.value;
      if (["top", "bottom"].includes(props.tabPosition)) {
        unit = "width";
        basicSize = wrapperWidth.value;
        tabContentSize = wrapperScrollWidth.value;
        addSize = addWidth.value;
        position = props.rtl ? "right" : "left";
        transformSize = Math.abs(transformLeft.value);
      } else {
        unit = "height";
        basicSize = wrapperHeight.value;
        tabContentSize = wrapperScrollWidth.value;
        addSize = addHeight.value;
        position = "top";
        transformSize = -transformTop.value;
      }
      let mergedBasicSize = basicSize;
      if (tabContentSize + addSize > basicSize && tabContentSize < basicSize) {
        mergedBasicSize = basicSize - addSize;
      }
      const tabsVal = tabs.value;
      if (!tabsVal.length) {
        return [visibleStart.value, visibleEnd.value] = [0, 0];
      }
      const len = tabsVal.length;
      let endIndex = len;
      for (let i = 0; i < len; i += 1) {
        const offset = tabOffsetsValue.get(tabsVal[i].key) || DEFAULT_SIZE;
        if (offset[position] + offset[unit] > transformSize + mergedBasicSize) {
          endIndex = i - 1;
          break;
        }
      }
      let startIndex = 0;
      for (let i = len - 1; i >= 0; i -= 1) {
        const offset = tabOffsetsValue.get(tabsVal[i].key) || DEFAULT_SIZE;
        if (offset[position] < transformSize) {
          startIndex = i + 1;
          break;
        }
      }
      return [visibleStart.value, visibleEnd.value] = [startIndex, endIndex];
    });
    const onListHolderResize = () => {
      var _a, _b, _c, _d, _e;
      const offsetWidth = ((_a = tabsWrapperRef.value) === null || _a === void 0 ? void 0 : _a.offsetWidth) || 0;
      const offsetHeight = ((_b = tabsWrapperRef.value) === null || _b === void 0 ? void 0 : _b.offsetHeight) || 0;
      const addDom = ((_c = innerAddButtonRef.value) === null || _c === void 0 ? void 0 : _c.$el) || {};
      const newAddWidth = addDom.offsetWidth || 0;
      const newAddHeight = addDom.offsetHeight || 0;
      setWrapperWidth(offsetWidth);
      setWrapperHeight(offsetHeight);
      setAddWidth(newAddWidth);
      setAddHeight(newAddHeight);
      const newWrapperScrollWidth = (((_d = tabListRef.value) === null || _d === void 0 ? void 0 : _d.offsetWidth) || 0) - newAddWidth;
      const newWrapperScrollHeight = (((_e = tabListRef.value) === null || _e === void 0 ? void 0 : _e.offsetHeight) || 0) - newAddHeight;
      setWrapperScrollWidth(newWrapperScrollWidth);
      setWrapperScrollHeight(newWrapperScrollHeight);
      setTabSizes(() => {
        const newSizes = /* @__PURE__ */ new Map();
        tabs.value.forEach((_ref2) => {
          let {
            key
          } = _ref2;
          const btnRef = btnRefs.value.get(key);
          const btnNode = (btnRef === null || btnRef === void 0 ? void 0 : btnRef.$el) || btnRef;
          if (btnNode) {
            newSizes.set(key, {
              width: btnNode.offsetWidth,
              height: btnNode.offsetHeight,
              left: btnNode.offsetLeft,
              top: btnNode.offsetTop
            });
          }
        });
        return newSizes;
      });
    };
    const hiddenTabs = computed(() => [...tabs.value.slice(0, visibleStart.value), ...tabs.value.slice(visibleEnd.value + 1)]);
    const [inkStyle, setInkStyle] = useState();
    const activeTabOffset = computed(() => tabOffsets.value.get(props.activeKey));
    const inkBarRafRef = shallowRef();
    const cleanInkBarRaf = () => {
      wrapperRaf.cancel(inkBarRafRef.value);
    };
    watch([activeTabOffset, tabPositionTopOrBottom, () => props.rtl], () => {
      const newInkStyle = {};
      if (activeTabOffset.value) {
        if (tabPositionTopOrBottom.value) {
          if (props.rtl) {
            newInkStyle.right = toPx(activeTabOffset.value.right);
          } else {
            newInkStyle.left = toPx(activeTabOffset.value.left);
          }
          newInkStyle.width = toPx(activeTabOffset.value.width);
        } else {
          newInkStyle.top = toPx(activeTabOffset.value.top);
          newInkStyle.height = toPx(activeTabOffset.value.height);
        }
      }
      cleanInkBarRaf();
      inkBarRafRef.value = wrapperRaf(() => {
        setInkStyle(newInkStyle);
      });
    });
    watch([() => props.activeKey, activeTabOffset, tabOffsets, tabPositionTopOrBottom], () => {
      scrollToTab();
    }, {
      flush: "post"
    });
    watch([() => props.rtl, () => props.tabBarGutter, () => props.activeKey, () => tabs.value], () => {
      onListHolderResize();
    }, {
      flush: "post"
    });
    const ExtraContent = (_ref3) => {
      let {
        position,
        prefixCls: prefixCls2,
        extra
      } = _ref3;
      if (!extra)
        return null;
      const content = extra === null || extra === void 0 ? void 0 : extra({
        position
      });
      return content ? createVNode("div", {
        "class": `${prefixCls2}-extra-content`
      }, [content]) : null;
    };
    return () => {
      const {
        id,
        animated,
        activeKey,
        rtl,
        editable,
        locale: locale2,
        tabPosition,
        tabBarGutter,
        onTabClick
      } = props;
      const {
        class: className,
        style
      } = attrs;
      const pre = prefixCls.value;
      const hasDropdown = !!hiddenTabs.value.length;
      const wrapPrefix = `${pre}-nav-wrap`;
      let pingLeft;
      let pingRight;
      let pingTop;
      let pingBottom;
      if (tabPositionTopOrBottom.value) {
        if (rtl) {
          pingRight = transformLeft.value > 0;
          pingLeft = transformLeft.value + wrapperWidth.value < wrapperScrollWidth.value;
        } else {
          pingLeft = transformLeft.value < 0;
          pingRight = -transformLeft.value + wrapperWidth.value < wrapperScrollWidth.value;
        }
      } else {
        pingTop = transformTop.value < 0;
        pingBottom = -transformTop.value + wrapperHeight.value < wrapperScrollHeight.value;
      }
      const tabNodeStyle = {};
      if (tabPosition === "top" || tabPosition === "bottom") {
        tabNodeStyle[rtl ? "marginRight" : "marginLeft"] = typeof tabBarGutter === "number" ? `${tabBarGutter}px` : tabBarGutter;
      } else {
        tabNodeStyle.marginTop = typeof tabBarGutter === "number" ? `${tabBarGutter}px` : tabBarGutter;
      }
      const tabNodes = tabs.value.map((tab, i) => {
        const {
          key
        } = tab;
        return createVNode(TabNode, {
          "id": id,
          "prefixCls": pre,
          "key": key,
          "tab": tab,
          "style": i === 0 ? void 0 : tabNodeStyle,
          "closable": tab.closable,
          "editable": editable,
          "active": key === activeKey,
          "removeAriaLabel": locale2 === null || locale2 === void 0 ? void 0 : locale2.removeAriaLabel,
          "ref": setRef(key),
          "onClick": (e) => {
            onTabClick(key, e);
          },
          "onFocus": () => {
            scrollToTab(key);
            doLockAnimation();
            if (!tabsWrapperRef.value) {
              return;
            }
            if (!rtl) {
              tabsWrapperRef.value.scrollLeft = 0;
            }
            tabsWrapperRef.value.scrollTop = 0;
          }
        }, slots);
      });
      return createVNode("div", {
        "role": "tablist",
        "class": classNames(`${pre}-nav`, className),
        "style": style,
        "onKeydown": () => {
          doLockAnimation();
        }
      }, [createVNode(ExtraContent, {
        "position": "left",
        "prefixCls": pre,
        "extra": slots.leftExtra
      }, null), createVNode(ResizeObserver, {
        "onResize": onListHolderResize
      }, {
        default: () => [createVNode("div", {
          "class": classNames(wrapPrefix, {
            [`${wrapPrefix}-ping-left`]: pingLeft,
            [`${wrapPrefix}-ping-right`]: pingRight,
            [`${wrapPrefix}-ping-top`]: pingTop,
            [`${wrapPrefix}-ping-bottom`]: pingBottom
          }),
          "ref": tabsWrapperRef
        }, [createVNode(ResizeObserver, {
          "onResize": onListHolderResize
        }, {
          default: () => [createVNode("div", {
            "ref": tabListRef,
            "class": `${pre}-nav-list`,
            "style": {
              transform: `translate(${transformLeft.value}px, ${transformTop.value}px)`,
              transition: lockAnimation.value ? "none" : void 0
            }
          }, [tabNodes, createVNode(AddButton, {
            "ref": innerAddButtonRef,
            "prefixCls": pre,
            "locale": locale2,
            "editable": editable,
            "style": _extends(_extends({}, tabNodes.length === 0 ? void 0 : tabNodeStyle), {
              visibility: hasDropdown ? "hidden" : null
            })
          }, null), createVNode("div", {
            "class": classNames(`${pre}-ink-bar`, {
              [`${pre}-ink-bar-animated`]: animated.inkBar
            }),
            "style": inkStyle.value
          }, null)])]
        })])]
      }), createVNode(OperationNode, _objectSpread$9(_objectSpread$9({}, props), {}, {
        "removeAriaLabel": locale2 === null || locale2 === void 0 ? void 0 : locale2.removeAriaLabel,
        "ref": operationsRef,
        "prefixCls": pre,
        "tabs": hiddenTabs.value,
        "class": !hasDropdown && operationsHiddenClassName.value
      }), pick(slots, ["moreIcon"])), createVNode(ExtraContent, {
        "position": "right",
        "prefixCls": pre,
        "extra": slots.rightExtra
      }, null), createVNode(ExtraContent, {
        "position": "right",
        "prefixCls": pre,
        "extra": slots.tabBarExtraContent
      }, null)]);
    };
  }
});
const TabPanelList = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "TabPanelList",
  inheritAttrs: false,
  props: {
    activeKey: {
      type: [String, Number]
    },
    id: {
      type: String
    },
    rtl: {
      type: Boolean
    },
    animated: {
      type: Object,
      default: void 0
    },
    tabPosition: {
      type: String
    },
    destroyInactiveTabPane: {
      type: Boolean
    }
  },
  setup(props) {
    const {
      tabs,
      prefixCls
    } = useInjectTabs();
    return () => {
      const {
        id,
        activeKey,
        animated,
        tabPosition,
        rtl,
        destroyInactiveTabPane
      } = props;
      const tabPaneAnimated = animated.tabPane;
      const pre = prefixCls.value;
      const activeIndex = tabs.value.findIndex((tab) => tab.key === activeKey);
      return createVNode("div", {
        "class": `${pre}-content-holder`
      }, [createVNode("div", {
        "class": [`${pre}-content`, `${pre}-content-${tabPosition}`, {
          [`${pre}-content-animated`]: tabPaneAnimated
        }],
        "style": activeIndex && tabPaneAnimated ? {
          [rtl ? "marginRight" : "marginLeft"]: `-${activeIndex}00%`
        } : null
      }, [tabs.value.map((tab) => {
        return cloneElement(tab.node, {
          key: tab.key,
          prefixCls: pre,
          tabKey: tab.key,
          id,
          animated: tabPaneAnimated,
          active: tab.key === activeKey,
          destroyInactiveTabPane
        });
      })])]);
    };
  }
});
const genMotionStyle = (token) => {
  const {
    componentCls,
    motionDurationSlow
  } = token;
  return [
    {
      [componentCls]: {
        [`${componentCls}-switch`]: {
          "&-appear, &-enter": {
            transition: "none",
            "&-start": {
              opacity: 0
            },
            "&-active": {
              opacity: 1,
              transition: `opacity ${motionDurationSlow}`
            }
          },
          "&-leave": {
            position: "absolute",
            transition: "none",
            inset: 0,
            "&-start": {
              opacity: 1
            },
            "&-active": {
              opacity: 0,
              transition: `opacity ${motionDurationSlow}`
            }
          }
        }
      }
    },
    // Follow code may reuse in other components
    [initSlideMotion(token, "slide-up"), initSlideMotion(token, "slide-down")]
  ];
};
const genMotionStyle$1 = genMotionStyle;
const genCardStyle = (token) => {
  const {
    componentCls,
    tabsCardHorizontalPadding,
    tabsCardHeadBackground,
    tabsCardGutter,
    colorSplit
  } = token;
  return {
    [`${componentCls}-card`]: {
      [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
        [`${componentCls}-tab`]: {
          margin: 0,
          padding: tabsCardHorizontalPadding,
          background: tabsCardHeadBackground,
          border: `${token.lineWidth}px ${token.lineType} ${colorSplit}`,
          transition: `all ${token.motionDurationSlow} ${token.motionEaseInOut}`
        },
        [`${componentCls}-tab-active`]: {
          color: token.colorPrimary,
          background: token.colorBgContainer
        },
        [`${componentCls}-ink-bar`]: {
          visibility: "hidden"
        }
      },
      // ========================== Top & Bottom ==========================
      [`&${componentCls}-top, &${componentCls}-bottom`]: {
        [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
          [`${componentCls}-tab + ${componentCls}-tab`]: {
            marginLeft: {
              _skip_check_: true,
              value: `${tabsCardGutter}px`
            }
          }
        }
      },
      [`&${componentCls}-top`]: {
        [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
          [`${componentCls}-tab`]: {
            borderRadius: `${token.borderRadiusLG}px ${token.borderRadiusLG}px 0 0`
          },
          [`${componentCls}-tab-active`]: {
            borderBottomColor: token.colorBgContainer
          }
        }
      },
      [`&${componentCls}-bottom`]: {
        [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
          [`${componentCls}-tab`]: {
            borderRadius: `0 0 ${token.borderRadiusLG}px ${token.borderRadiusLG}px`
          },
          [`${componentCls}-tab-active`]: {
            borderTopColor: token.colorBgContainer
          }
        }
      },
      // ========================== Left & Right ==========================
      [`&${componentCls}-left, &${componentCls}-right`]: {
        [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
          [`${componentCls}-tab + ${componentCls}-tab`]: {
            marginTop: `${tabsCardGutter}px`
          }
        }
      },
      [`&${componentCls}-left`]: {
        [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
          [`${componentCls}-tab`]: {
            borderRadius: {
              _skip_check_: true,
              value: `${token.borderRadiusLG}px 0 0 ${token.borderRadiusLG}px`
            }
          },
          [`${componentCls}-tab-active`]: {
            borderRightColor: {
              _skip_check_: true,
              value: token.colorBgContainer
            }
          }
        }
      },
      [`&${componentCls}-right`]: {
        [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
          [`${componentCls}-tab`]: {
            borderRadius: {
              _skip_check_: true,
              value: `0 ${token.borderRadiusLG}px ${token.borderRadiusLG}px 0`
            }
          },
          [`${componentCls}-tab-active`]: {
            borderLeftColor: {
              _skip_check_: true,
              value: token.colorBgContainer
            }
          }
        }
      }
    }
  };
};
const genDropdownStyle = (token) => {
  const {
    componentCls,
    tabsHoverColor,
    dropdownEdgeChildVerticalPadding
  } = token;
  return {
    [`${componentCls}-dropdown`]: _extends(_extends({}, resetComponent(token)), {
      position: "absolute",
      top: -9999,
      left: {
        _skip_check_: true,
        value: -9999
      },
      zIndex: token.zIndexPopup,
      display: "block",
      "&-hidden": {
        display: "none"
      },
      [`${componentCls}-dropdown-menu`]: {
        maxHeight: token.tabsDropdownHeight,
        margin: 0,
        padding: `${dropdownEdgeChildVerticalPadding}px 0`,
        overflowX: "hidden",
        overflowY: "auto",
        textAlign: {
          _skip_check_: true,
          value: "left"
        },
        listStyleType: "none",
        backgroundColor: token.colorBgContainer,
        backgroundClip: "padding-box",
        borderRadius: token.borderRadiusLG,
        outline: "none",
        boxShadow: token.boxShadowSecondary,
        "&-item": _extends(_extends({}, textEllipsis), {
          display: "flex",
          alignItems: "center",
          minWidth: token.tabsDropdownWidth,
          margin: 0,
          padding: `${token.paddingXXS}px ${token.paddingSM}px`,
          color: token.colorText,
          fontWeight: "normal",
          fontSize: token.fontSize,
          lineHeight: token.lineHeight,
          cursor: "pointer",
          transition: `all ${token.motionDurationSlow}`,
          "> span": {
            flex: 1,
            whiteSpace: "nowrap"
          },
          "&-remove": {
            flex: "none",
            marginLeft: {
              _skip_check_: true,
              value: token.marginSM
            },
            color: token.colorTextDescription,
            fontSize: token.fontSizeSM,
            background: "transparent",
            border: 0,
            cursor: "pointer",
            "&:hover": {
              color: tabsHoverColor
            }
          },
          "&:hover": {
            background: token.controlItemBgHover
          },
          "&-disabled": {
            "&, &:hover": {
              color: token.colorTextDisabled,
              background: "transparent",
              cursor: "not-allowed"
            }
          }
        })
      }
    })
  };
};
const genPositionStyle = (token) => {
  const {
    componentCls,
    margin,
    colorSplit
  } = token;
  return {
    // ========================== Top & Bottom ==========================
    [`${componentCls}-top, ${componentCls}-bottom`]: {
      flexDirection: "column",
      [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
        margin: `0 0 ${margin}px 0`,
        "&::before": {
          position: "absolute",
          right: {
            _skip_check_: true,
            value: 0
          },
          left: {
            _skip_check_: true,
            value: 0
          },
          borderBottom: `${token.lineWidth}px ${token.lineType} ${colorSplit}`,
          content: "''"
        },
        [`${componentCls}-ink-bar`]: {
          height: token.lineWidthBold,
          "&-animated": {
            transition: `width ${token.motionDurationSlow}, left ${token.motionDurationSlow},
            right ${token.motionDurationSlow}`
          }
        },
        [`${componentCls}-nav-wrap`]: {
          "&::before, &::after": {
            top: 0,
            bottom: 0,
            width: token.controlHeight
          },
          "&::before": {
            left: {
              _skip_check_: true,
              value: 0
            },
            boxShadow: token.boxShadowTabsOverflowLeft
          },
          "&::after": {
            right: {
              _skip_check_: true,
              value: 0
            },
            boxShadow: token.boxShadowTabsOverflowRight
          },
          [`&${componentCls}-nav-wrap-ping-left::before`]: {
            opacity: 1
          },
          [`&${componentCls}-nav-wrap-ping-right::after`]: {
            opacity: 1
          }
        }
      }
    },
    [`${componentCls}-top`]: {
      [`> ${componentCls}-nav,
        > div > ${componentCls}-nav`]: {
        "&::before": {
          bottom: 0
        },
        [`${componentCls}-ink-bar`]: {
          bottom: 0
        }
      }
    },
    [`${componentCls}-bottom`]: {
      [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
        order: 1,
        marginTop: `${margin}px`,
        marginBottom: 0,
        "&::before": {
          top: 0
        },
        [`${componentCls}-ink-bar`]: {
          top: 0
        }
      },
      [`> ${componentCls}-content-holder, > div > ${componentCls}-content-holder`]: {
        order: 0
      }
    },
    // ========================== Left & Right ==========================
    [`${componentCls}-left, ${componentCls}-right`]: {
      [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
        flexDirection: "column",
        minWidth: token.controlHeight * 1.25,
        // >>>>>>>>>>> Tab
        [`${componentCls}-tab`]: {
          padding: `${token.paddingXS}px ${token.paddingLG}px`,
          textAlign: "center"
        },
        [`${componentCls}-tab + ${componentCls}-tab`]: {
          margin: `${token.margin}px 0 0 0`
        },
        // >>>>>>>>>>> Nav
        [`${componentCls}-nav-wrap`]: {
          flexDirection: "column",
          "&::before, &::after": {
            right: {
              _skip_check_: true,
              value: 0
            },
            left: {
              _skip_check_: true,
              value: 0
            },
            height: token.controlHeight
          },
          "&::before": {
            top: 0,
            boxShadow: token.boxShadowTabsOverflowTop
          },
          "&::after": {
            bottom: 0,
            boxShadow: token.boxShadowTabsOverflowBottom
          },
          [`&${componentCls}-nav-wrap-ping-top::before`]: {
            opacity: 1
          },
          [`&${componentCls}-nav-wrap-ping-bottom::after`]: {
            opacity: 1
          }
        },
        // >>>>>>>>>>> Ink Bar
        [`${componentCls}-ink-bar`]: {
          width: token.lineWidthBold,
          "&-animated": {
            transition: `height ${token.motionDurationSlow}, top ${token.motionDurationSlow}`
          }
        },
        [`${componentCls}-nav-list, ${componentCls}-nav-operations`]: {
          flex: "1 0 auto",
          flexDirection: "column"
        }
      }
    },
    [`${componentCls}-left`]: {
      [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
        [`${componentCls}-ink-bar`]: {
          right: {
            _skip_check_: true,
            value: 0
          }
        }
      },
      [`> ${componentCls}-content-holder, > div > ${componentCls}-content-holder`]: {
        marginLeft: {
          _skip_check_: true,
          value: `-${token.lineWidth}px`
        },
        borderLeft: {
          _skip_check_: true,
          value: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`
        },
        [`> ${componentCls}-content > ${componentCls}-tabpane`]: {
          paddingLeft: {
            _skip_check_: true,
            value: token.paddingLG
          }
        }
      }
    },
    [`${componentCls}-right`]: {
      [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
        order: 1,
        [`${componentCls}-ink-bar`]: {
          left: {
            _skip_check_: true,
            value: 0
          }
        }
      },
      [`> ${componentCls}-content-holder, > div > ${componentCls}-content-holder`]: {
        order: 0,
        marginRight: {
          _skip_check_: true,
          value: -token.lineWidth
        },
        borderRight: {
          _skip_check_: true,
          value: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`
        },
        [`> ${componentCls}-content > ${componentCls}-tabpane`]: {
          paddingRight: {
            _skip_check_: true,
            value: token.paddingLG
          }
        }
      }
    }
  };
};
const genSizeStyle = (token) => {
  const {
    componentCls,
    padding
  } = token;
  return {
    [componentCls]: {
      "&-small": {
        [`> ${componentCls}-nav`]: {
          [`${componentCls}-tab`]: {
            padding: `${token.paddingXS}px 0`,
            fontSize: token.fontSize
          }
        }
      },
      "&-large": {
        [`> ${componentCls}-nav`]: {
          [`${componentCls}-tab`]: {
            padding: `${padding}px 0`,
            fontSize: token.fontSizeLG
          }
        }
      }
    },
    [`${componentCls}-card`]: {
      [`&${componentCls}-small`]: {
        [`> ${componentCls}-nav`]: {
          [`${componentCls}-tab`]: {
            padding: `${token.paddingXXS * 1.5}px ${padding}px`
          }
        },
        [`&${componentCls}-bottom`]: {
          [`> ${componentCls}-nav ${componentCls}-tab`]: {
            borderRadius: `0 0 ${token.borderRadius}px ${token.borderRadius}px`
          }
        },
        [`&${componentCls}-top`]: {
          [`> ${componentCls}-nav ${componentCls}-tab`]: {
            borderRadius: `${token.borderRadius}px ${token.borderRadius}px 0 0`
          }
        },
        [`&${componentCls}-right`]: {
          [`> ${componentCls}-nav ${componentCls}-tab`]: {
            borderRadius: {
              _skip_check_: true,
              value: `0 ${token.borderRadius}px ${token.borderRadius}px 0`
            }
          }
        },
        [`&${componentCls}-left`]: {
          [`> ${componentCls}-nav ${componentCls}-tab`]: {
            borderRadius: {
              _skip_check_: true,
              value: `${token.borderRadius}px 0 0 ${token.borderRadius}px`
            }
          }
        }
      },
      [`&${componentCls}-large`]: {
        [`> ${componentCls}-nav`]: {
          [`${componentCls}-tab`]: {
            padding: `${token.paddingXS}px ${padding}px ${token.paddingXXS * 1.5}px`
          }
        }
      }
    }
  };
};
const genTabStyle = (token) => {
  const {
    componentCls,
    tabsActiveColor,
    tabsHoverColor,
    iconCls,
    tabsHorizontalGutter
  } = token;
  const tabCls = `${componentCls}-tab`;
  return {
    [tabCls]: {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      padding: `${token.paddingSM}px 0`,
      fontSize: `${token.fontSize}px`,
      background: "transparent",
      border: 0,
      outline: "none",
      cursor: "pointer",
      "&-btn, &-remove": _extends({
        "&:focus:not(:focus-visible), &:active": {
          color: tabsActiveColor
        }
      }, genFocusStyle(token)),
      "&-btn": {
        outline: "none",
        transition: "all 0.3s"
      },
      "&-remove": {
        flex: "none",
        marginRight: {
          _skip_check_: true,
          value: -token.marginXXS
        },
        marginLeft: {
          _skip_check_: true,
          value: token.marginXS
        },
        color: token.colorTextDescription,
        fontSize: token.fontSizeSM,
        background: "transparent",
        border: "none",
        outline: "none",
        cursor: "pointer",
        transition: `all ${token.motionDurationSlow}`,
        "&:hover": {
          color: token.colorTextHeading
        }
      },
      "&:hover": {
        color: tabsHoverColor
      },
      [`&${tabCls}-active ${tabCls}-btn`]: {
        color: token.colorPrimary,
        textShadow: token.tabsActiveTextShadow
      },
      [`&${tabCls}-disabled`]: {
        color: token.colorTextDisabled,
        cursor: "not-allowed"
      },
      [`&${tabCls}-disabled ${tabCls}-btn, &${tabCls}-disabled ${componentCls}-remove`]: {
        "&:focus, &:active": {
          color: token.colorTextDisabled
        }
      },
      [`& ${tabCls}-remove ${iconCls}`]: {
        margin: 0
      },
      [iconCls]: {
        marginRight: {
          _skip_check_: true,
          value: token.marginSM
        }
      }
    },
    [`${tabCls} + ${tabCls}`]: {
      margin: {
        _skip_check_: true,
        value: `0 0 0 ${tabsHorizontalGutter}px`
      }
    }
  };
};
const genRtlStyle = (token) => {
  const {
    componentCls,
    tabsHorizontalGutter,
    iconCls,
    tabsCardGutter
  } = token;
  const rtlCls = `${componentCls}-rtl`;
  return {
    [rtlCls]: {
      direction: "rtl",
      [`${componentCls}-nav`]: {
        [`${componentCls}-tab`]: {
          margin: {
            _skip_check_: true,
            value: `0 0 0 ${tabsHorizontalGutter}px`
          },
          [`${componentCls}-tab:last-of-type`]: {
            marginLeft: {
              _skip_check_: true,
              value: 0
            }
          },
          [iconCls]: {
            marginRight: {
              _skip_check_: true,
              value: 0
            },
            marginLeft: {
              _skip_check_: true,
              value: `${token.marginSM}px`
            }
          },
          [`${componentCls}-tab-remove`]: {
            marginRight: {
              _skip_check_: true,
              value: `${token.marginXS}px`
            },
            marginLeft: {
              _skip_check_: true,
              value: `-${token.marginXXS}px`
            },
            [iconCls]: {
              margin: 0
            }
          }
        }
      },
      [`&${componentCls}-left`]: {
        [`> ${componentCls}-nav`]: {
          order: 1
        },
        [`> ${componentCls}-content-holder`]: {
          order: 0
        }
      },
      [`&${componentCls}-right`]: {
        [`> ${componentCls}-nav`]: {
          order: 0
        },
        [`> ${componentCls}-content-holder`]: {
          order: 1
        }
      },
      // ====================== Card ======================
      [`&${componentCls}-card${componentCls}-top, &${componentCls}-card${componentCls}-bottom`]: {
        [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
          [`${componentCls}-tab + ${componentCls}-tab`]: {
            marginRight: {
              _skip_check_: true,
              value: `${tabsCardGutter}px`
            },
            marginLeft: {
              _skip_check_: true,
              value: 0
            }
          }
        }
      }
    },
    [`${componentCls}-dropdown-rtl`]: {
      direction: "rtl"
    },
    [`${componentCls}-menu-item`]: {
      [`${componentCls}-dropdown-rtl`]: {
        textAlign: {
          _skip_check_: true,
          value: "right"
        }
      }
    }
  };
};
const genTabsStyle = (token) => {
  const {
    componentCls,
    tabsCardHorizontalPadding,
    tabsCardHeight,
    tabsCardGutter,
    tabsHoverColor,
    tabsActiveColor,
    colorSplit
  } = token;
  return {
    [componentCls]: _extends(_extends(_extends(_extends({}, resetComponent(token)), {
      display: "flex",
      // ========================== Navigation ==========================
      [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
        position: "relative",
        display: "flex",
        flex: "none",
        alignItems: "center",
        [`${componentCls}-nav-wrap`]: {
          position: "relative",
          display: "flex",
          flex: "auto",
          alignSelf: "stretch",
          overflow: "hidden",
          whiteSpace: "nowrap",
          transform: "translate(0)",
          // >>>>> Ping shadow
          "&::before, &::after": {
            position: "absolute",
            zIndex: 1,
            opacity: 0,
            transition: `opacity ${token.motionDurationSlow}`,
            content: "''",
            pointerEvents: "none"
          }
        },
        [`${componentCls}-nav-list`]: {
          position: "relative",
          display: "flex",
          transition: `opacity ${token.motionDurationSlow}`
        },
        // >>>>>>>> Operations
        [`${componentCls}-nav-operations`]: {
          display: "flex",
          alignSelf: "stretch"
        },
        [`${componentCls}-nav-operations-hidden`]: {
          position: "absolute",
          visibility: "hidden",
          pointerEvents: "none"
        },
        [`${componentCls}-nav-more`]: {
          position: "relative",
          padding: tabsCardHorizontalPadding,
          background: "transparent",
          border: 0,
          "&::after": {
            position: "absolute",
            right: {
              _skip_check_: true,
              value: 0
            },
            bottom: 0,
            left: {
              _skip_check_: true,
              value: 0
            },
            height: token.controlHeightLG / 8,
            transform: "translateY(100%)",
            content: "''"
          }
        },
        [`${componentCls}-nav-add`]: _extends({
          minWidth: `${tabsCardHeight}px`,
          marginLeft: {
            _skip_check_: true,
            value: `${tabsCardGutter}px`
          },
          padding: `0 ${token.paddingXS}px`,
          background: "transparent",
          border: `${token.lineWidth}px ${token.lineType} ${colorSplit}`,
          borderRadius: `${token.borderRadiusLG}px ${token.borderRadiusLG}px 0 0`,
          outline: "none",
          cursor: "pointer",
          color: token.colorText,
          transition: `all ${token.motionDurationSlow} ${token.motionEaseInOut}`,
          "&:hover": {
            color: tabsHoverColor
          },
          "&:active, &:focus:not(:focus-visible)": {
            color: tabsActiveColor
          }
        }, genFocusStyle(token))
      },
      [`${componentCls}-extra-content`]: {
        flex: "none"
      },
      // ============================ InkBar ============================
      [`${componentCls}-ink-bar`]: {
        position: "absolute",
        background: token.colorPrimary,
        pointerEvents: "none"
      }
    }), genTabStyle(token)), {
      // =========================== TabPanes ===========================
      [`${componentCls}-content`]: {
        position: "relative",
        display: "flex",
        width: "100%",
        ["&-animated"]: {
          transition: "margin 0.3s"
        }
      },
      [`${componentCls}-content-holder`]: {
        flex: "auto",
        minWidth: 0,
        minHeight: 0
      },
      [`${componentCls}-tabpane`]: {
        outline: "none",
        flex: "none",
        width: "100%"
      }
    }),
    [`${componentCls}-centered`]: {
      [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
        [`${componentCls}-nav-wrap`]: {
          [`&:not([class*='${componentCls}-nav-wrap-ping'])`]: {
            justifyContent: "center"
          }
        }
      }
    }
  };
};
const useStyle$2 = genComponentStyleHook("Tabs", (token) => {
  const tabsCardHeight = token.controlHeightLG;
  const tabsToken = merge(token, {
    tabsHoverColor: token.colorPrimaryHover,
    tabsActiveColor: token.colorPrimaryActive,
    tabsCardHorizontalPadding: `${(tabsCardHeight - Math.round(token.fontSize * token.lineHeight)) / 2 - token.lineWidth}px ${token.padding}px`,
    tabsCardHeight,
    tabsCardGutter: token.marginXXS / 2,
    tabsHorizontalGutter: 32,
    tabsCardHeadBackground: token.colorFillAlter,
    dropdownEdgeChildVerticalPadding: token.paddingXXS,
    tabsActiveTextShadow: "0 0 0.25px currentcolor",
    tabsDropdownHeight: 200,
    tabsDropdownWidth: 120
  });
  return [genSizeStyle(tabsToken), genRtlStyle(tabsToken), genPositionStyle(tabsToken), genDropdownStyle(tabsToken), genCardStyle(tabsToken), genTabsStyle(tabsToken), genMotionStyle$1(tabsToken)];
}, (token) => ({
  zIndexPopup: token.zIndexPopupBase + 50
}));
const tabsProps = () => {
  return {
    prefixCls: {
      type: String
    },
    id: {
      type: String
    },
    popupClassName: String,
    getPopupContainer: functionType(),
    activeKey: {
      type: [String, Number]
    },
    defaultActiveKey: {
      type: [String, Number]
    },
    direction: stringType(),
    animated: someType([Boolean, Object]),
    renderTabBar: functionType(),
    tabBarGutter: {
      type: Number
    },
    tabBarStyle: objectType(),
    tabPosition: stringType(),
    destroyInactiveTabPane: booleanType(),
    hideAdd: Boolean,
    type: stringType(),
    size: stringType(),
    centered: Boolean,
    onEdit: functionType(),
    onChange: functionType(),
    onTabClick: functionType(),
    onTabScroll: functionType(),
    "onUpdate:activeKey": functionType(),
    // Accessibility
    locale: objectType(),
    onPrevClick: functionType(),
    onNextClick: functionType(),
    tabBarExtraContent: PropTypes$1.any
  };
};
function parseTabList(children) {
  return children.map((node) => {
    if (isValidElement(node)) {
      const props = _extends({}, node.props || {});
      for (const [k, v] of Object.entries(props)) {
        delete props[k];
        props[camelize(k)] = v;
      }
      const slots = node.children || {};
      const key = node.key !== void 0 ? node.key : void 0;
      const {
        tab = slots.tab,
        disabled,
        forceRender,
        closable,
        animated,
        active,
        destroyInactiveTabPane
      } = props;
      return _extends(_extends({
        key
      }, props), {
        node,
        closeIcon: slots.closeIcon,
        tab,
        disabled: disabled === "" || disabled,
        forceRender: forceRender === "" || forceRender,
        closable: closable === "" || closable,
        animated: animated === "" || animated,
        active: active === "" || active,
        destroyInactiveTabPane: destroyInactiveTabPane === "" || destroyInactiveTabPane
      });
    }
    return null;
  }).filter((tab) => tab);
}
const InternalTabs = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "InternalTabs",
  inheritAttrs: false,
  props: _extends(_extends({}, initDefaultProps$1(tabsProps(), {
    tabPosition: "top",
    animated: {
      inkBar: true,
      tabPane: false
    }
  })), {
    tabs: arrayType()
  }),
  slots: Object,
  // emits: ['tabClick', 'tabScroll', 'change', 'update:activeKey'],
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    devWarning(!(props.onPrevClick !== void 0) && !(props.onNextClick !== void 0), "Tabs", "`onPrevClick / @prevClick` and `onNextClick / @nextClick` has been removed. Please use `onTabScroll / @tabScroll` instead.");
    devWarning(!(props.tabBarExtraContent !== void 0), "Tabs", "`tabBarExtraContent` prop has been removed. Please use `rightExtra` slot instead.");
    devWarning(!(slots.tabBarExtraContent !== void 0), "Tabs", "`tabBarExtraContent` slot is deprecated. Please use `rightExtra` slot instead.");
    const {
      prefixCls,
      direction,
      size,
      rootPrefixCls,
      getPopupContainer
    } = useConfigInject("tabs", props);
    const [wrapSSR, hashId] = useStyle$2(prefixCls);
    const rtl = computed(() => direction.value === "rtl");
    const mergedAnimated = computed(() => {
      const {
        animated,
        tabPosition
      } = props;
      if (animated === false || ["left", "right"].includes(tabPosition)) {
        return {
          inkBar: false,
          tabPane: false
        };
      } else if (animated === true) {
        return {
          inkBar: true,
          tabPane: true
        };
      } else {
        return _extends({
          inkBar: true,
          tabPane: false
        }, typeof animated === "object" ? animated : {});
      }
    });
    const [mobile, setMobile] = useState(false);
    const [mergedActiveKey, setMergedActiveKey] = useMergedState(() => {
      var _a;
      return (_a = props.tabs[0]) === null || _a === void 0 ? void 0 : _a.key;
    }, {
      value: computed(() => props.activeKey),
      defaultValue: props.defaultActiveKey
    });
    const [activeIndex, setActiveIndex] = useState(() => props.tabs.findIndex((tab) => tab.key === mergedActiveKey.value));
    watchEffect(() => {
      var _a;
      let newActiveIndex = props.tabs.findIndex((tab) => tab.key === mergedActiveKey.value);
      if (newActiveIndex === -1) {
        newActiveIndex = Math.max(0, Math.min(activeIndex.value, props.tabs.length - 1));
        setMergedActiveKey((_a = props.tabs[newActiveIndex]) === null || _a === void 0 ? void 0 : _a.key);
      }
      setActiveIndex(newActiveIndex);
    });
    const [mergedId, setMergedId] = useMergedState(null, {
      value: computed(() => props.id)
    });
    const mergedTabPosition = computed(() => {
      if (mobile.value && !["left", "right"].includes(props.tabPosition)) {
        return "top";
      } else {
        return props.tabPosition;
      }
    });
    const onInternalTabClick = (key, e) => {
      var _a, _b;
      (_a = props.onTabClick) === null || _a === void 0 ? void 0 : _a.call(props, key, e);
      const isActiveChanged = key !== mergedActiveKey.value;
      setMergedActiveKey(key);
      if (isActiveChanged) {
        (_b = props.onChange) === null || _b === void 0 ? void 0 : _b.call(props, key);
      }
    };
    useProvideTabs({
      tabs: computed(() => props.tabs),
      prefixCls
    });
    return () => {
      const {
        id,
        type,
        tabBarGutter,
        tabBarStyle,
        locale: locale2,
        destroyInactiveTabPane,
        renderTabBar = slots.renderTabBar,
        onTabScroll,
        hideAdd,
        centered
      } = props;
      const sharedProps = {
        id: mergedId.value,
        activeKey: mergedActiveKey.value,
        animated: mergedAnimated.value,
        tabPosition: mergedTabPosition.value,
        rtl: rtl.value,
        mobile: mobile.value
      };
      let editable;
      if (type === "editable-card") {
        editable = {
          onEdit: (editType, _ref2) => {
            let {
              key,
              event
            } = _ref2;
            var _a;
            (_a = props.onEdit) === null || _a === void 0 ? void 0 : _a.call(props, editType === "add" ? event : key, editType);
          },
          removeIcon: () => createVNode(CloseOutlined$1, null, null),
          addIcon: slots.addIcon ? slots.addIcon : () => createVNode(PlusOutlined$1, null, null),
          showAdd: hideAdd !== true
        };
      }
      let tabNavBar;
      const tabNavBarProps = _extends(_extends({}, sharedProps), {
        moreTransitionName: `${rootPrefixCls.value}-slide-up`,
        editable,
        locale: locale2,
        tabBarGutter,
        onTabClick: onInternalTabClick,
        onTabScroll,
        style: tabBarStyle,
        getPopupContainer: getPopupContainer.value,
        popupClassName: classNames(props.popupClassName, hashId.value)
      });
      if (renderTabBar) {
        tabNavBar = renderTabBar(_extends(_extends({}, tabNavBarProps), {
          DefaultTabBar: TabNavList
        }));
      } else {
        tabNavBar = createVNode(TabNavList, tabNavBarProps, pick(slots, ["moreIcon", "leftExtra", "rightExtra", "tabBarExtraContent"]));
      }
      const pre = prefixCls.value;
      return wrapSSR(createVNode("div", _objectSpread$9(_objectSpread$9({}, attrs), {}, {
        "id": id,
        "class": classNames(pre, `${pre}-${mergedTabPosition.value}`, {
          [hashId.value]: true,
          [`${pre}-${size.value}`]: size.value,
          [`${pre}-card`]: ["card", "editable-card"].includes(type),
          [`${pre}-editable-card`]: type === "editable-card",
          [`${pre}-centered`]: centered,
          [`${pre}-mobile`]: mobile.value,
          [`${pre}-editable`]: type === "editable-card",
          [`${pre}-rtl`]: rtl.value
        }, attrs.class)
      }), [tabNavBar, createVNode(TabPanelList, _objectSpread$9(_objectSpread$9({
        "destroyInactiveTabPane": destroyInactiveTabPane
      }, sharedProps), {}, {
        "animated": mergedAnimated.value
      }), null)]));
    };
  }
});
const Tabs = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ATabs",
  inheritAttrs: false,
  props: initDefaultProps$1(tabsProps(), {
    tabPosition: "top",
    animated: {
      inkBar: true,
      tabPane: false
    }
  }),
  slots: Object,
  // emits: ['tabClick', 'tabScroll', 'change', 'update:activeKey'],
  setup(props, _ref3) {
    let {
      attrs,
      slots,
      emit
    } = _ref3;
    const handleChange = (key) => {
      emit("update:activeKey", key);
      emit("change", key);
    };
    return () => {
      var _a;
      const tabs = parseTabList(flattenChildren((_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)));
      return createVNode(InternalTabs, _objectSpread$9(_objectSpread$9(_objectSpread$9({}, omit(props, ["onUpdate:activeKey"])), attrs), {}, {
        "onChange": handleChange,
        "tabs": tabs
      }), slots);
    };
  }
});
const tabPaneProps = () => ({
  tab: PropTypes$1.any,
  disabled: {
    type: Boolean
  },
  forceRender: {
    type: Boolean
  },
  closable: {
    type: Boolean
  },
  animated: {
    type: Boolean
  },
  active: {
    type: Boolean
  },
  destroyInactiveTabPane: {
    type: Boolean
  },
  // Pass by TabPaneList
  prefixCls: {
    type: String
  },
  tabKey: {
    type: [String, Number]
  },
  id: {
    type: String
  }
  // closeIcon: PropTypes.any,
});
const __nuxt_component_9 = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ATabPane",
  inheritAttrs: false,
  __ANT_TAB_PANE: true,
  props: tabPaneProps(),
  slots: Object,
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const visited = ref(props.forceRender);
    watch([() => props.active, () => props.destroyInactiveTabPane], () => {
      if (props.active) {
        visited.value = true;
      } else if (props.destroyInactiveTabPane) {
        visited.value = false;
      }
    }, {
      immediate: true
    });
    const mergedStyle = computed(() => {
      if (!props.active) {
        if (props.animated) {
          return {
            visibility: "hidden",
            height: 0,
            overflowY: "hidden"
          };
        } else {
          return {
            display: "none"
          };
        }
      }
      return {};
    });
    return () => {
      var _a;
      const {
        prefixCls,
        forceRender,
        id,
        active,
        tabKey
      } = props;
      return createVNode("div", {
        "id": id && `${id}-panel-${tabKey}`,
        "role": "tabpanel",
        "tabindex": active ? 0 : -1,
        "aria-labelledby": id && `${id}-tab-${tabKey}`,
        "aria-hidden": !active,
        "style": [mergedStyle.value, attrs.style],
        "class": [`${prefixCls}-tabpane`, active && `${prefixCls}-tabpane-active`, attrs.class]
      }, [(active || visited.value || forceRender) && ((_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots))]);
    };
  }
});
Tabs.TabPane = __nuxt_component_9;
Tabs.install = function(app) {
  app.component(Tabs.name, Tabs);
  app.component(__nuxt_component_9.name, __nuxt_component_9);
  return app;
};
const collapseProps = () => ({
  prefixCls: String,
  activeKey: someType([Array, Number, String]),
  defaultActiveKey: someType([Array, Number, String]),
  accordion: booleanType(),
  destroyInactivePanel: booleanType(),
  bordered: booleanType(),
  expandIcon: functionType(),
  openAnimation: PropTypes$1.object,
  expandIconPosition: stringType(),
  collapsible: stringType(),
  ghost: booleanType(),
  onChange: functionType(),
  "onUpdate:activeKey": functionType()
});
const collapsePanelProps = () => ({
  openAnimation: PropTypes$1.object,
  prefixCls: String,
  header: PropTypes$1.any,
  headerClass: String,
  showArrow: booleanType(),
  isActive: booleanType(),
  destroyInactivePanel: booleanType(),
  /** @deprecated Use `collapsible="disabled"` instead */
  disabled: booleanType(),
  accordion: booleanType(),
  forceRender: booleanType(),
  expandIcon: functionType(),
  extra: PropTypes$1.any,
  panelKey: someType(),
  collapsible: stringType(),
  role: String,
  onItemClick: functionType()
});
const genBaseStyle = (token) => {
  const {
    componentCls,
    collapseContentBg,
    padding,
    collapseContentPaddingHorizontal,
    collapseHeaderBg,
    collapseHeaderPadding,
    collapsePanelBorderRadius,
    lineWidth,
    lineType,
    colorBorder,
    colorText,
    colorTextHeading,
    colorTextDisabled,
    fontSize,
    lineHeight,
    marginSM,
    paddingSM,
    motionDurationSlow,
    fontSizeIcon
  } = token;
  const borderBase = `${lineWidth}px ${lineType} ${colorBorder}`;
  return {
    [componentCls]: _extends(_extends({}, resetComponent(token)), {
      backgroundColor: collapseHeaderBg,
      border: borderBase,
      borderBottom: 0,
      borderRadius: `${collapsePanelBorderRadius}px`,
      [`&-rtl`]: {
        direction: "rtl"
      },
      [`& > ${componentCls}-item`]: {
        borderBottom: borderBase,
        [`&:last-child`]: {
          [`
            &,
            & > ${componentCls}-header`]: {
            borderRadius: `0 0 ${collapsePanelBorderRadius}px ${collapsePanelBorderRadius}px`
          }
        },
        [`> ${componentCls}-header`]: {
          position: "relative",
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "flex-start",
          padding: collapseHeaderPadding,
          color: colorTextHeading,
          lineHeight,
          cursor: "pointer",
          transition: `all ${motionDurationSlow}, visibility 0s`,
          [`> ${componentCls}-header-text`]: {
            flex: "auto"
          },
          "&:focus": {
            outline: "none"
          },
          // >>>>> Arrow
          [`${componentCls}-expand-icon`]: {
            height: fontSize * lineHeight,
            display: "flex",
            alignItems: "center",
            paddingInlineEnd: marginSM
          },
          [`${componentCls}-arrow`]: _extends(_extends({}, resetIcon()), {
            fontSize: fontSizeIcon,
            svg: {
              transition: `transform ${motionDurationSlow}`
            }
          }),
          // >>>>> Text
          [`${componentCls}-header-text`]: {
            marginInlineEnd: "auto"
          }
        },
        [`${componentCls}-header-collapsible-only`]: {
          cursor: "default",
          [`${componentCls}-header-text`]: {
            flex: "none",
            cursor: "pointer"
          },
          [`${componentCls}-expand-icon`]: {
            cursor: "pointer"
          }
        },
        [`${componentCls}-icon-collapsible-only`]: {
          cursor: "default",
          [`${componentCls}-expand-icon`]: {
            cursor: "pointer"
          }
        },
        [`&${componentCls}-no-arrow`]: {
          [`> ${componentCls}-header`]: {
            paddingInlineStart: paddingSM
          }
        }
      },
      [`${componentCls}-content`]: {
        color: colorText,
        backgroundColor: collapseContentBg,
        borderTop: borderBase,
        [`& > ${componentCls}-content-box`]: {
          padding: `${padding}px ${collapseContentPaddingHorizontal}px`
        },
        [`&-hidden`]: {
          display: "none"
        }
      },
      [`${componentCls}-item:last-child`]: {
        [`> ${componentCls}-content`]: {
          borderRadius: `0 0 ${collapsePanelBorderRadius}px ${collapsePanelBorderRadius}px`
        }
      },
      [`& ${componentCls}-item-disabled > ${componentCls}-header`]: {
        [`
          &,
          & > .arrow
        `]: {
          color: colorTextDisabled,
          cursor: "not-allowed"
        }
      },
      // ========================== Icon Position ==========================
      [`&${componentCls}-icon-position-end`]: {
        [`& > ${componentCls}-item`]: {
          [`> ${componentCls}-header`]: {
            [`${componentCls}-expand-icon`]: {
              order: 1,
              paddingInlineEnd: 0,
              paddingInlineStart: marginSM
            }
          }
        }
      }
    })
  };
};
const genArrowStyle = (token) => {
  const {
    componentCls
  } = token;
  const fixedSelector = `> ${componentCls}-item > ${componentCls}-header ${componentCls}-arrow svg`;
  return {
    [`${componentCls}-rtl`]: {
      [fixedSelector]: {
        transform: `rotate(180deg)`
      }
    }
  };
};
const genBorderlessStyle = (token) => {
  const {
    componentCls,
    collapseHeaderBg,
    paddingXXS,
    colorBorder
  } = token;
  return {
    [`${componentCls}-borderless`]: {
      backgroundColor: collapseHeaderBg,
      border: 0,
      [`> ${componentCls}-item`]: {
        borderBottom: `1px solid ${colorBorder}`
      },
      [`
        > ${componentCls}-item:last-child,
        > ${componentCls}-item:last-child ${componentCls}-header
      `]: {
        borderRadius: 0
      },
      [`> ${componentCls}-item:last-child`]: {
        borderBottom: 0
      },
      [`> ${componentCls}-item > ${componentCls}-content`]: {
        backgroundColor: "transparent",
        borderTop: 0
      },
      [`> ${componentCls}-item > ${componentCls}-content > ${componentCls}-content-box`]: {
        paddingTop: paddingXXS
      }
    }
  };
};
const genGhostStyle = (token) => {
  const {
    componentCls,
    paddingSM
  } = token;
  return {
    [`${componentCls}-ghost`]: {
      backgroundColor: "transparent",
      border: 0,
      [`> ${componentCls}-item`]: {
        borderBottom: 0,
        [`> ${componentCls}-content`]: {
          backgroundColor: "transparent",
          border: 0,
          [`> ${componentCls}-content-box`]: {
            paddingBlock: paddingSM
          }
        }
      }
    }
  };
};
const useStyle$1 = genComponentStyleHook("Collapse", (token) => {
  const collapseToken = merge(token, {
    collapseContentBg: token.colorBgContainer,
    collapseHeaderBg: token.colorFillAlter,
    collapseHeaderPadding: `${token.paddingSM}px ${token.padding}px`,
    collapsePanelBorderRadius: token.borderRadiusLG,
    collapseContentPaddingHorizontal: 16
    // Fixed value
  });
  return [genBaseStyle(collapseToken), genBorderlessStyle(collapseToken), genGhostStyle(collapseToken), genArrowStyle(collapseToken), genCollapseMotion$1(collapseToken)];
});
function getActiveKeysArray(activeKey) {
  let currentActiveKey = activeKey;
  if (!Array.isArray(currentActiveKey)) {
    const activeKeyType = typeof currentActiveKey;
    currentActiveKey = activeKeyType === "number" || activeKeyType === "string" ? [currentActiveKey] : [];
  }
  return currentActiveKey.map((key) => String(key));
}
const Collapse = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ACollapse",
  inheritAttrs: false,
  props: initDefaultProps$1(collapseProps(), {
    accordion: false,
    destroyInactivePanel: false,
    bordered: true,
    openAnimation: collapseMotion$1("ant-motion-collapse", false),
    expandIconPosition: "start"
  }),
  slots: Object,
  setup(props, _ref) {
    let {
      attrs,
      slots,
      emit
    } = _ref;
    const stateActiveKey = ref(getActiveKeysArray(firstNotUndefined([props.activeKey, props.defaultActiveKey])));
    watch(() => props.activeKey, () => {
      stateActiveKey.value = getActiveKeysArray(props.activeKey);
    }, {
      deep: true
    });
    const {
      prefixCls,
      direction
    } = useConfigInject("collapse", props);
    const [wrapSSR, hashId] = useStyle$1(prefixCls);
    const iconPosition = computed(() => {
      const {
        expandIconPosition
      } = props;
      if (expandIconPosition !== void 0) {
        return expandIconPosition;
      }
      return direction.value === "rtl" ? "end" : "start";
    });
    const renderExpandIcon = (panelProps) => {
      const {
        expandIcon = slots.expandIcon
      } = props;
      const icon = expandIcon ? expandIcon(panelProps) : createVNode(RightOutlined$1, {
        "rotate": panelProps.isActive ? 90 : void 0
      }, null);
      return createVNode("div", {
        "class": [`${prefixCls.value}-expand-icon`, hashId.value],
        "onClick": () => ["header", "icon"].includes(props.collapsible) && onClickItem(panelProps.panelKey)
      }, [isValidElement(Array.isArray(expandIcon) ? icon[0] : icon) ? cloneElement(icon, {
        class: `${prefixCls.value}-arrow`
      }, false) : icon]);
    };
    const setActiveKey = (activeKey) => {
      if (props.activeKey === void 0) {
        stateActiveKey.value = activeKey;
      }
      const newKey = props.accordion ? activeKey[0] : activeKey;
      emit("update:activeKey", newKey);
      emit("change", newKey);
    };
    const onClickItem = (key) => {
      let activeKey = stateActiveKey.value;
      if (props.accordion) {
        activeKey = activeKey[0] === key ? [] : [key];
      } else {
        activeKey = [...activeKey];
        const index = activeKey.indexOf(key);
        const isActive = index > -1;
        if (isActive) {
          activeKey.splice(index, 1);
        } else {
          activeKey.push(key);
        }
      }
      setActiveKey(activeKey);
    };
    const getNewChild = (child, index) => {
      var _a, _b, _c;
      if (isEmptyElement(child))
        return;
      const activeKey = stateActiveKey.value;
      const {
        accordion,
        destroyInactivePanel,
        collapsible,
        openAnimation
      } = props;
      const key = String((_a = child.key) !== null && _a !== void 0 ? _a : index);
      const {
        header = (_c = (_b = child.children) === null || _b === void 0 ? void 0 : _b.header) === null || _c === void 0 ? void 0 : _c.call(_b),
        headerClass,
        collapsible: childCollapsible,
        disabled
      } = child.props || {};
      let isActive = false;
      if (accordion) {
        isActive = activeKey[0] === key;
      } else {
        isActive = activeKey.indexOf(key) > -1;
      }
      let mergeCollapsible = childCollapsible !== null && childCollapsible !== void 0 ? childCollapsible : collapsible;
      if (disabled || disabled === "") {
        mergeCollapsible = "disabled";
      }
      const newProps = {
        key,
        panelKey: key,
        header,
        headerClass,
        isActive,
        prefixCls: prefixCls.value,
        destroyInactivePanel,
        openAnimation,
        accordion,
        onItemClick: mergeCollapsible === "disabled" ? null : onClickItem,
        expandIcon: renderExpandIcon,
        collapsible: mergeCollapsible
      };
      return cloneElement(child, newProps);
    };
    const getItems = () => {
      var _a;
      return flattenChildren((_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)).map(getNewChild);
    };
    return () => {
      const {
        accordion,
        bordered,
        ghost
      } = props;
      const collapseClassName = classNames(prefixCls.value, {
        [`${prefixCls.value}-borderless`]: !bordered,
        [`${prefixCls.value}-icon-position-${iconPosition.value}`]: true,
        [`${prefixCls.value}-rtl`]: direction.value === "rtl",
        [`${prefixCls.value}-ghost`]: !!ghost,
        [attrs.class]: !!attrs.class
      }, hashId.value);
      return wrapSSR(createVNode("div", _objectSpread$9(_objectSpread$9({
        "class": collapseClassName
      }, getDataAndAriaProps(attrs)), {}, {
        "style": attrs.style,
        "role": accordion ? "tablist" : null
      }), [getItems()]));
    };
  }
});
const PanelContent = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "PanelContent",
  props: collapsePanelProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const rendered = shallowRef(false);
    watchEffect(() => {
      if (props.isActive || props.forceRender) {
        rendered.value = true;
      }
    });
    return () => {
      var _a;
      if (!rendered.value)
        return null;
      const {
        prefixCls,
        isActive,
        role
      } = props;
      return createVNode("div", {
        "class": classNames(`${prefixCls}-content`, {
          [`${prefixCls}-content-active`]: isActive,
          [`${prefixCls}-content-inactive`]: !isActive
        }),
        "role": role
      }, [createVNode("div", {
        "class": `${prefixCls}-content-box`
      }, [(_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)])]);
    };
  }
});
const __nuxt_component_11 = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ACollapsePanel",
  inheritAttrs: false,
  props: initDefaultProps$1(collapsePanelProps(), {
    showArrow: true,
    isActive: false,
    onItemClick() {
    },
    headerClass: "",
    forceRender: false
  }),
  slots: Object,
  // emits: ['itemClick'],
  setup(props, _ref) {
    let {
      slots,
      emit,
      attrs
    } = _ref;
    devWarning(props.disabled === void 0, "Collapse.Panel", '`disabled` is deprecated. Please use `collapsible="disabled"` instead.');
    const {
      prefixCls
    } = useConfigInject("collapse", props);
    const handleItemClick = () => {
      emit("itemClick", props.panelKey);
    };
    const handleKeyPress = (e) => {
      if (e.key === "Enter" || e.keyCode === 13 || e.which === 13) {
        handleItemClick();
      }
    };
    return () => {
      var _a, _b;
      const {
        header = (_a = slots.header) === null || _a === void 0 ? void 0 : _a.call(slots),
        headerClass,
        isActive,
        showArrow,
        destroyInactivePanel,
        accordion,
        forceRender,
        openAnimation,
        expandIcon = slots.expandIcon,
        extra = (_b = slots.extra) === null || _b === void 0 ? void 0 : _b.call(slots),
        collapsible
      } = props;
      const disabled = collapsible === "disabled";
      const prefixClsValue = prefixCls.value;
      const headerCls = classNames(`${prefixClsValue}-header`, {
        [headerClass]: headerClass,
        [`${prefixClsValue}-header-collapsible-only`]: collapsible === "header",
        [`${prefixClsValue}-icon-collapsible-only`]: collapsible === "icon"
      });
      const itemCls = classNames({
        [`${prefixClsValue}-item`]: true,
        [`${prefixClsValue}-item-active`]: isActive,
        [`${prefixClsValue}-item-disabled`]: disabled,
        [`${prefixClsValue}-no-arrow`]: !showArrow,
        [`${attrs.class}`]: !!attrs.class
      });
      let icon = createVNode("i", {
        "class": "arrow"
      }, null);
      if (showArrow && typeof expandIcon === "function") {
        icon = expandIcon(props);
      }
      const panelContent = withDirectives(createVNode(PanelContent, {
        "prefixCls": prefixClsValue,
        "isActive": isActive,
        "forceRender": forceRender,
        "role": accordion ? "tabpanel" : null
      }, {
        default: slots.default
      }), [[vShow, isActive]]);
      const transitionProps = _extends({
        appear: false,
        css: false
      }, openAnimation);
      return createVNode("div", _objectSpread$9(_objectSpread$9({}, attrs), {}, {
        "class": itemCls
      }), [createVNode("div", {
        "class": headerCls,
        "onClick": () => !["header", "icon"].includes(collapsible) && handleItemClick(),
        "role": accordion ? "tab" : "button",
        "tabindex": disabled ? -1 : 0,
        "aria-expanded": isActive,
        "onKeypress": handleKeyPress
      }, [showArrow && icon, createVNode("span", {
        "onClick": () => collapsible === "header" && handleItemClick(),
        "class": `${prefixClsValue}-header-text`
      }, [header]), extra && createVNode("div", {
        "class": `${prefixClsValue}-extra`
      }, [extra])]), createVNode(Transition, transitionProps, {
        default: () => [!destroyInactivePanel || isActive ? panelContent : null]
      })]);
    };
  }
});
Collapse.Panel = __nuxt_component_11;
Collapse.install = function(app) {
  app.component(Collapse.name, Collapse);
  app.component(__nuxt_component_11.name, __nuxt_component_11);
  return app;
};
const genLayoutLightStyle = (token) => {
  const {
    componentCls,
    colorBgContainer,
    colorBgBody,
    colorText
  } = token;
  return {
    [`${componentCls}-sider-light`]: {
      background: colorBgContainer,
      [`${componentCls}-sider-trigger`]: {
        color: colorText,
        background: colorBgContainer
      },
      [`${componentCls}-sider-zero-width-trigger`]: {
        color: colorText,
        background: colorBgContainer,
        border: `1px solid ${colorBgBody}`,
        borderInlineStart: 0
      }
    }
  };
};
const genLayoutLightStyle$1 = genLayoutLightStyle;
const genLayoutStyle = (token) => {
  const {
    antCls,
    // .ant
    componentCls,
    // .ant-layout
    colorText,
    colorTextLightSolid,
    colorBgHeader,
    colorBgBody,
    colorBgTrigger,
    layoutHeaderHeight,
    layoutHeaderPaddingInline,
    layoutHeaderColor,
    layoutFooterPadding,
    layoutTriggerHeight,
    layoutZeroTriggerSize,
    motionDurationMid,
    motionDurationSlow,
    fontSize,
    borderRadius
  } = token;
  return {
    [componentCls]: _extends(_extends({
      display: "flex",
      flex: "auto",
      flexDirection: "column",
      /* fix firefox can't set height smaller than content on flex item */
      minHeight: 0,
      background: colorBgBody,
      "&, *": {
        boxSizing: "border-box"
      },
      [`&${componentCls}-has-sider`]: {
        flexDirection: "row",
        [`> ${componentCls}, > ${componentCls}-content`]: {
          // https://segmentfault.com/a/1190000019498300
          width: 0
        }
      },
      [`${componentCls}-header, &${componentCls}-footer`]: {
        flex: "0 0 auto"
      },
      [`${componentCls}-header`]: {
        height: layoutHeaderHeight,
        paddingInline: layoutHeaderPaddingInline,
        color: layoutHeaderColor,
        lineHeight: `${layoutHeaderHeight}px`,
        background: colorBgHeader,
        // Other components/menu/style/index.less line:686
        // Integration with header element so menu items have the same height
        [`${antCls}-menu`]: {
          lineHeight: "inherit"
        }
      },
      [`${componentCls}-footer`]: {
        padding: layoutFooterPadding,
        color: colorText,
        fontSize,
        background: colorBgBody
      },
      [`${componentCls}-content`]: {
        flex: "auto",
        // fix firefox can't set height smaller than content on flex item
        minHeight: 0
      },
      [`${componentCls}-sider`]: {
        position: "relative",
        // fix firefox can't set width smaller than content on flex item
        minWidth: 0,
        background: colorBgHeader,
        transition: `all ${motionDurationMid}, background 0s`,
        "&-children": {
          height: "100%",
          // Hack for fixing margin collapse bug
          // https://github.com/ant-design/ant-design/issues/7967
          // solution from https://stackoverflow.com/a/33132624/3040605
          marginTop: -0.1,
          paddingTop: 0.1,
          [`${antCls}-menu${antCls}-menu-inline-collapsed`]: {
            width: "auto"
          }
        },
        "&-has-trigger": {
          paddingBottom: layoutTriggerHeight
        },
        "&-right": {
          order: 1
        },
        "&-trigger": {
          position: "fixed",
          bottom: 0,
          zIndex: 1,
          height: layoutTriggerHeight,
          color: colorTextLightSolid,
          lineHeight: `${layoutTriggerHeight}px`,
          textAlign: "center",
          background: colorBgTrigger,
          cursor: "pointer",
          transition: `all ${motionDurationMid}`
        },
        "&-zero-width": {
          "> *": {
            overflow: "hidden"
          },
          "&-trigger": {
            position: "absolute",
            top: layoutHeaderHeight,
            insetInlineEnd: -layoutZeroTriggerSize,
            zIndex: 1,
            width: layoutZeroTriggerSize,
            height: layoutZeroTriggerSize,
            color: colorTextLightSolid,
            fontSize: token.fontSizeXL,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: colorBgHeader,
            borderStartStartRadius: 0,
            borderStartEndRadius: borderRadius,
            borderEndEndRadius: borderRadius,
            borderEndStartRadius: 0,
            cursor: "pointer",
            transition: `background ${motionDurationSlow} ease`,
            "&::after": {
              position: "absolute",
              inset: 0,
              background: "transparent",
              transition: `all ${motionDurationSlow}`,
              content: '""'
            },
            "&:hover::after": {
              // FIXME: Hardcode, but seems no need to create a token for this
              background: `rgba(255, 255, 255, 0.2)`
            },
            "&-right": {
              insetInlineStart: -layoutZeroTriggerSize,
              borderStartStartRadius: borderRadius,
              borderStartEndRadius: 0,
              borderEndEndRadius: 0,
              borderEndStartRadius: borderRadius
            }
          }
        }
      }
    }, genLayoutLightStyle$1(token)), {
      // RTL
      "&-rtl": {
        direction: "rtl"
      }
    })
  };
};
const useStyle = genComponentStyleHook("Layout", (token) => {
  const {
    colorText,
    controlHeightSM,
    controlHeight,
    controlHeightLG,
    marginXXS
  } = token;
  const layoutHeaderPaddingInline = controlHeightLG * 1.25;
  const layoutToken = merge(token, {
    // Layout
    layoutHeaderHeight: controlHeight * 2,
    layoutHeaderPaddingInline,
    layoutHeaderColor: colorText,
    layoutFooterPadding: `${controlHeightSM}px ${layoutHeaderPaddingInline}px`,
    layoutTriggerHeight: controlHeightLG + marginXXS * 2,
    layoutZeroTriggerSize: controlHeightLG
  });
  return [genLayoutStyle(layoutToken)];
}, (token) => {
  const {
    colorBgLayout
  } = token;
  return {
    colorBgHeader: "#001529",
    colorBgBody: colorBgLayout,
    colorBgTrigger: "#002140"
  };
});
const basicProps = () => ({
  prefixCls: String,
  hasSider: {
    type: Boolean,
    default: void 0
  },
  tagName: String
});
function generator(_ref) {
  let {
    suffixCls,
    tagName,
    name
  } = _ref;
  return (BasicComponent) => {
    const Adapter = /* @__PURE__ */ defineComponent({
      compatConfig: {
        MODE: 3
      },
      name,
      props: basicProps(),
      setup(props, _ref2) {
        let {
          slots
        } = _ref2;
        const {
          prefixCls
        } = useConfigInject(suffixCls, props);
        return () => {
          const basicComponentProps = _extends(_extends({}, props), {
            prefixCls: prefixCls.value,
            tagName
          });
          return createVNode(BasicComponent, basicComponentProps, slots);
        };
      }
    });
    return Adapter;
  };
}
const Basic = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  props: basicProps(),
  setup(props, _ref3) {
    let {
      slots
    } = _ref3;
    return () => createVNode(props.tagName, {
      class: props.prefixCls
    }, slots);
  }
});
const BasicLayout = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  inheritAttrs: false,
  props: basicProps(),
  setup(props, _ref4) {
    let {
      slots,
      attrs
    } = _ref4;
    const {
      prefixCls,
      direction
    } = useConfigInject("", props);
    const [wrapSSR, hashId] = useStyle(prefixCls);
    const siders = ref([]);
    const siderHookProvider = {
      addSider: (id) => {
        siders.value = [...siders.value, id];
      },
      removeSider: (id) => {
        siders.value = siders.value.filter((currentId) => currentId !== id);
      }
    };
    provide(SiderHookProviderKey, siderHookProvider);
    const divCls = computed(() => {
      const {
        prefixCls: prefixCls2,
        hasSider
      } = props;
      return {
        [hashId.value]: true,
        [`${prefixCls2}`]: true,
        [`${prefixCls2}-has-sider`]: typeof hasSider === "boolean" ? hasSider : siders.value.length > 0,
        [`${prefixCls2}-rtl`]: direction.value === "rtl"
      };
    });
    return () => {
      const {
        tagName
      } = props;
      return wrapSSR(createVNode(tagName, _extends(_extends({}, attrs), {
        class: [divCls.value, attrs.class]
      }), slots));
    };
  }
});
const Layout = generator({
  suffixCls: "layout",
  tagName: "section",
  name: "ALayout"
})(BasicLayout);
const Header = generator({
  suffixCls: "layout-header",
  tagName: "header",
  name: "ALayoutHeader"
})(Basic);
const Footer = generator({
  suffixCls: "layout-footer",
  tagName: "footer",
  name: "ALayoutFooter"
})(Basic);
const Content = generator({
  suffixCls: "layout-content",
  tagName: "main",
  name: "ALayoutContent"
})(Basic);
const Layout$1 = Layout;
const siderProps = () => ({
  prefixCls: String,
  collapsible: {
    type: Boolean,
    default: void 0
  },
  collapsed: {
    type: Boolean,
    default: void 0
  },
  defaultCollapsed: {
    type: Boolean,
    default: void 0
  },
  reverseArrow: {
    type: Boolean,
    default: void 0
  },
  zeroWidthTriggerStyle: {
    type: Object,
    default: void 0
  },
  trigger: PropTypes$1.any,
  width: PropTypes$1.oneOfType([PropTypes$1.number, PropTypes$1.string]),
  collapsedWidth: PropTypes$1.oneOfType([PropTypes$1.number, PropTypes$1.string]),
  breakpoint: PropTypes$1.oneOf(tuple("xs", "sm", "md", "lg", "xl", "xxl", "xxxl")),
  theme: PropTypes$1.oneOf(tuple("light", "dark")).def("dark"),
  onBreakpoint: Function,
  onCollapse: Function
});
const generateId = (() => {
  let i = 0;
  return function() {
    let prefix = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    i += 1;
    return `${prefix}${i}`;
  };
})();
const Sider = /* @__PURE__ */ defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ALayoutSider",
  inheritAttrs: false,
  props: initDefaultProps$1(siderProps(), {
    collapsible: false,
    defaultCollapsed: false,
    reverseArrow: false,
    width: 200,
    collapsedWidth: 80
  }),
  emits: ["breakpoint", "update:collapsed", "collapse"],
  setup(props, _ref) {
    let {
      emit,
      attrs,
      slots
    } = _ref;
    const {
      prefixCls
    } = useConfigInject("layout-sider", props);
    const siderHook = inject(SiderHookProviderKey, void 0);
    const collapsed = shallowRef(!!(props.collapsed !== void 0 ? props.collapsed : props.defaultCollapsed));
    const below = shallowRef(false);
    watch(() => props.collapsed, () => {
      collapsed.value = !!props.collapsed;
    });
    provide(SiderCollapsedKey, collapsed);
    const handleSetCollapsed = (value, type) => {
      if (props.collapsed === void 0) {
        collapsed.value = value;
      }
      emit("update:collapsed", value);
      emit("collapse", value, type);
    };
    shallowRef((mql) => {
      below.value = mql.matches;
      emit("breakpoint", mql.matches);
      if (collapsed.value !== mql.matches) {
        handleSetCollapsed(mql.matches, "responsive");
      }
    });
    const uniqueId = generateId("ant-sider-");
    siderHook && siderHook.addSider(uniqueId);
    const toggle = () => {
      handleSetCollapsed(!collapsed.value, "clickTrigger");
    };
    return () => {
      var _a, _b;
      const pre = prefixCls.value;
      const {
        collapsedWidth,
        width,
        reverseArrow,
        zeroWidthTriggerStyle,
        trigger = (_a = slots.trigger) === null || _a === void 0 ? void 0 : _a.call(slots),
        collapsible,
        theme
      } = props;
      const rawWidth = collapsed.value ? collapsedWidth : width;
      const siderWidth = isNumeric$1(rawWidth) ? `${rawWidth}px` : String(rawWidth);
      const zeroWidthTrigger = parseFloat(String(collapsedWidth || 0)) === 0 ? createVNode("span", {
        "onClick": toggle,
        "class": classNames(`${pre}-zero-width-trigger`, `${pre}-zero-width-trigger-${reverseArrow ? "right" : "left"}`),
        "style": zeroWidthTriggerStyle
      }, [trigger || createVNode(BarsOutlined$1, null, null)]) : null;
      const iconObj = {
        expanded: reverseArrow ? createVNode(RightOutlined$1, null, null) : createVNode(LeftOutlined$1, null, null),
        collapsed: reverseArrow ? createVNode(LeftOutlined$1, null, null) : createVNode(RightOutlined$1, null, null)
      };
      const status = collapsed.value ? "collapsed" : "expanded";
      const defaultTrigger = iconObj[status];
      const triggerDom = trigger !== null ? zeroWidthTrigger || createVNode("div", {
        "class": `${pre}-trigger`,
        "onClick": toggle,
        "style": {
          width: siderWidth
        }
      }, [trigger || defaultTrigger]) : null;
      const divStyle = [attrs.style, {
        flex: `0 0 ${siderWidth}`,
        maxWidth: siderWidth,
        minWidth: siderWidth,
        width: siderWidth
      }];
      const siderCls = classNames(pre, `${pre}-${theme}`, {
        [`${pre}-collapsed`]: !!collapsed.value,
        [`${pre}-has-trigger`]: collapsible && trigger !== null && !zeroWidthTrigger,
        [`${pre}-below`]: !!below.value,
        [`${pre}-zero-width`]: parseFloat(siderWidth) === 0
      }, attrs.class);
      return createVNode("aside", _objectSpread$9(_objectSpread$9({}, attrs), {}, {
        "class": siderCls,
        "style": divStyle
      }), [createVNode("div", {
        "class": `${pre}-children`
      }, [(_b = slots.default) === null || _b === void 0 ? void 0 : _b.call(slots)]), collapsible || below.value && zeroWidthTrigger ? triggerDom : null]);
    };
  }
});
const LayoutSider = Sider;
const LayoutContent = Content;
const __nuxt_component_0$1 = _extends(Layout$1, {
  Header,
  Footer,
  Content,
  Sider,
  install: (app) => {
    app.component(Layout$1.name, Layout$1);
    app.component(Header.name, Header);
    app.component(Footer.name, Footer);
    app.component(Sider.name, Sider);
    app.component(Content.name, Content);
    return app;
  }
});
const simpleImage = "" + __buildAssetsURL("资料库.ae98f4d0.png");
const data = [
  {
    title: "古诗词",
    data: [
      {
        author: "李白",
        article: [
          {
            name: "侠客行·李白",
            content: "赵客缦胡缨，吴钩霜雪明。银鞍照白马，飒沓如流星。十步杀一人，千里不留行。事了拂衣去，深藏身与名。闲过信陵饮，脱剑膝前横。将炙啖朱亥，持觞劝侯嬴。三杯吐然诺，五岳倒为轻。眼花耳热后，意气素霓生。救赵挥金槌，邯郸先震惊。千秋二壮士，烜赫大梁城。纵死侠骨香，不惭世上英。谁能书阁下，白首太玄经。"
          },
          {
            name: "赠从兄襄阳少府皓·李白",
            content: "结发未识事，所交尽豪雄。却秦不受赏，击晋宁为功。托身白刃里，杀人红尘中。当朝揖高义，举世称英雄。小节岂足言，退耕舂陵东。归来无产业，生事如转蓬。一朝乌裘敝，百镒黄金空。弹剑徒激昂，出门悲路穷。吾兄青云士，然诺闻诸公。所以陈片言，片言贵情通。棣华倘不接，甘与秋草同。"
          },
          {
            name: "经乱离后天恩流夜郎忆旧游书怀赠江夏韦太守良宰·李白",
            content: "天上白玉京，十二楼五城。仙人抚我顶，结发受长生。误逐世间乐，颇穷理乱情。九十六圣君，浮云挂空名。天地赌一掷，未能忘战争。试涉霸王略，将期轩冕荣。时命乃大谬，弃之海上行。学剑翻自哂，为文竟何成。剑非万人敌，文窃四海声。儿戏不足道，五噫出西京。临当欲去时，慷慨泪沾缨。叹君倜傥才，标举冠群英。开筵引祖帐，慰此远徂征。鞍马若浮云，送余骠骑亭。歌钟不尽意，白日落昆明。十月到幽州，戈鋋若罗星。君王弃北海，扫地借长鲸。呼吸走百川，燕然可摧倾。心知不得语，却欲栖蓬瀛。弯弧惧天狼，挟矢不敢张。揽涕黄金台，呼天哭昭王。无人贵骏骨，騄耳空腾骧。乐毅倘再生，于今亦奔亡。蹉跎不得意，驱马还贵乡。逢君听弦歌，肃穆坐华堂。百里独太古，陶然卧羲皇。征乐昌乐馆，开筵列壶觞。贤豪间青娥，对烛俨成行。醉舞纷绮席，清歌绕飞梁。欢娱未终朝，秩满归咸阳。祖道拥万人，供帐遥相望。一别隔千里，荣枯异炎凉。炎凉几度改，九土中横溃。汉甲连胡兵，沙尘暗云海。草木摇杀气，星辰无光彩。白骨成丘山，苍生竟何罪。函关壮帝居，国命悬哥舒。长戟三十万，开门纳凶渠。公卿如犬羊，忠谠醢与菹。二圣出游豫，两京遂丘墟。帝子许专征，秉旄控强楚。节制非桓文，军师拥熊虎。人心失去就，贼势腾风雨。惟君固房陵，诚节冠终古。仆卧香炉顶，餐霞漱瑶泉。门开九江转，枕下五湖连。半夜水军来，浔阳满旌旃。空名适自误，迫胁上楼船。徒赐五百金，弃之若浮烟。辞官不受赏，翻谪夜郎天。夜郎万里道，西上令人老。扫荡六合清，仍为负霜草。日月无偏照，何由诉苍昊。良牧称神明，深仁恤交道。一忝青云客，三登黄鹤楼。顾惭祢处士，虚对鹦鹉洲。樊山霸气尽，寥落天地秋。江带峨眉雪，川横三峡流。万舸此中来，连帆过扬州。送此万里目，旷然散我愁。纱窗倚天开，水树绿如发。窥日畏衔山，促酒喜得月。吴娃与越艳，窈窕夸铅红。呼来上云梯，含笑出帘栊。对客小垂手，罗衣舞春风。宾跪请休息，主人情未极。览君荆山作，江鲍堪动色。清水出芙蓉，天然去雕饰。逸兴横素襟，无时不招寻。朱门拥虎士，列戟何森森。剪凿竹石开，萦流涨清深。登台坐水阁，吐论多英音。片辞贵白璧，一诺轻黄金。谓我不愧君，青鸟明丹心。五色云间鹊，飞鸣天上来。传闻赦书至，却放夜郎回。暖气变寒谷，炎烟生死灰。君登凤池去，忽弃贾生才。桀犬尚吠尧，匈奴笑千秋。中夜四五叹，常为大国忧。旌旆夹两山，黄河当中流。连鸡不得进，饮马空夷犹。安得羿善射，一箭落旄头。"
          },
          {
            name: "行路难·其一·李白",
            content: "金樽清酒斗十千，玉盘珍羞直万钱。停杯投箸不能食，拔剑四顾心茫然。欲渡黄河冰塞川，将登太行雪满山。闲来垂钓碧溪上，忽复乘舟梦日边。行路难，行路难，多歧路，今安在？长风破浪会有时，直挂云帆济沧海。"
          },
          {
            name: "行路难·其二·李白",
            content: "大道如青天，我独不得出。羞逐长安社中儿，赤鸡白雉赌梨栗。弹剑作歌奏苦声，曳裾王门不称情。淮阴市井笑韩信，汉朝公卿忌贾生。君不见昔时燕家重郭隗，拥篲折节无嫌猜。剧辛乐毅感恩分，输肝剖胆效英才。昭王白骨萦蔓草，谁人更扫黄金台？行路难，归去来！"
          },
          {
            name: "行路难·其三·李白",
            content: "有耳莫洗颍川水，有口莫食首阳蕨。含光混世贵无名，何用孤高比云月？吾观自古贤达人，功成不退皆殒身。子胥既弃吴江上，屈原终投湘水滨。陆机雄才岂自保？李斯税驾苦不早。华亭鹤唳讵可闻？上蔡苍鹰何足道？君不见吴中张翰称达生，秋风忽忆江东行。且乐生前一杯酒，何须身后千载名？"
          },
          {
            name: "将进酒·李白",
            content: "君不见黄河之水天上来，奔流到海不复回。君不见高堂明镜悲白发，朝如青丝暮成雪。人生得意须尽欢，莫使金樽空对月。天生我材必有用，千金散尽还复来。烹羊宰牛且为乐，会须一饮三百杯。岑夫子，丹丘生，将进酒，杯莫停。与君歌一曲，请君为我倾耳听。钟鼓馔玉不足贵，但愿长醉不愿醒。古来圣贤皆寂寞，惟有饮者留其名。陈王昔时宴平乐，斗酒十千恣欢谑。主人何为言少钱，径须沽取对君酌。五花马、千金裘，呼儿将出换美酒，与尔同销万古愁。"
          },
          {
            name: "上李邕·李白",
            content: "大鹏一日同风起，扶摇直上九万里。假令风歇时下来，犹能簸却沧溟水。世人见我恒殊调，闻余大言皆冷笑。宣父犹能畏后生，丈夫未可轻年少。"
          },
          {
            name: "短歌行·李白",
            content: "白日何短短，百年苦易满。苍穹浩茫茫，万劫太极长。麻姑垂两鬓，一半已成霜。天公见玉女，大笑亿千场。吾欲揽六龙，回车挂扶桑。北斗酌美酒，劝龙各一觞。富贵非所愿，与人驻颜光。"
          },
          {
            name: "梦游天姥吟留别·李白",
            content: "海客谈瀛洲，烟涛微茫信难求；越人语天姥，云霞明灭或可睹。天姥连天向天横，势拔五岳掩赤城。天台四万八千丈，对此欲倒东南倾。我欲因之梦吴越，一夜飞度镜湖月。湖月照我影，送我至剡溪。谢公宿处今尚在，渌水荡漾清猿啼。脚著谢公屐，身登青云梯。半壁见海日，空中闻天鸡。千岩万转路不定，迷花倚石忽已暝。熊咆龙吟殷岩泉，栗深林兮惊层巅。云青青兮欲雨，水澹澹兮生烟。列缺霹雳，丘峦崩摧。洞天石扉，訇然中开。青冥浩荡不见底，日月照耀金银台。霓为衣兮风为马，云之君兮纷纷而来下。虎鼓瑟兮鸾回车，仙之人兮列如麻。忽魂悸以魄动，恍惊起而长嗟。惟觉时之枕席，失向来之烟霞。世间行乐亦如此，古来万事东流水。别君去兮何时还？且放白鹿青崖间，须行即骑访名山。安能摧眉折腰事权贵，使我不得开心颜！"
          },
          {
            name: "清平调·其一·李白",
            content: "云想衣裳花想容，春风拂槛露华浓。若非群玉山头见，会向瑶台月下逢。"
          },
          {
            name: "清平调·其二·李白",
            content: "一枝秾艳露凝香，云雨巫山枉断肠。借问汉宫谁得似，可怜飞燕倚新妆。"
          },
          {
            name: "清平调·其三·李白",
            content: "名花倾国两相欢，长得君王带笑看。解释春风无限恨，沉香亭北倚阑干。"
          },
          {
            name: "蜀道难·李白",
            content: "噫吁嚱，危乎高哉！蜀道之难，难于上青天！蚕丛及鱼凫，开国何茫然！尔来四万八千岁，不与秦塞通人烟。西当太白有鸟道，可以横绝峨眉巅。地崩山摧壮士死，然后天梯石栈相钩连。上有六龙回日之高标，下有冲波逆折之回川。黄鹤之飞尚不得过，猿猱欲度愁攀援。青泥何盘盘，百步九折萦岩峦。扪参历井仰胁息，以手抚膺坐长叹。问君西游何时还？畏途巉岩不可攀。但见悲鸟号古木，雄飞雌从绕林间。又闻子规啼夜月，愁空山。蜀道之难，难于上青天，使人听此凋朱颜！连峰去天不盈尺，枯松倒挂倚绝壁。飞湍瀑流争喧豗，砯崖转石万壑雷。其险也如此，嗟尔远道之人胡为乎来哉！剑阁峥嵘而崔嵬，一夫当关，万夫莫开。所守或匪亲，化为狼与豺。朝避猛虎，夕避长蛇，磨牙吮血，杀人如麻。锦城虽云乐，不如早还家。蜀道之难，难于上青天，侧身西望长咨嗟！"
          },
          {
            name: "三五七言·李白",
            content: "秋风清，秋月明，落叶聚还散，寒鸦栖复惊。相思相见知何日？此时此夜难为情！"
          },
          {
            name: "宣州谢朓楼饯别校书叔云·李白",
            content: "弃我去者，昨日之日不可留；乱我心者，今日之日多烦忧。长风万里送秋雁，对此可以酣高楼。蓬莱文章建安骨，中间小谢又清发。俱怀逸兴壮思飞，欲上青天揽明月。抽刀断水水更流，举杯消愁愁更愁。人生在世不称意，明朝散发弄扁舟。"
          },
          {
            name: "月下独酌·其一·李白",
            content: "花间一壶酒，独酌无相亲。举杯邀明月，对影成三人。月既不解饮，影徒随我身。暂伴月将影，行乐须及春。我歌月徘徊，我舞影零乱。醒时同交欢，醉后各分散。永结无情游，相期邈云汉。"
          },
          {
            name: "月下独酌·其二·李白",
            content: "天若不爱酒，酒星不在天。地若不爱酒，地应无酒泉。天地既爱酒，爱酒不愧天。已闻清比圣，复道浊如贤。贤圣既已饮，何必求神仙。三杯通大道，一斗合自然。但得酒中趣，勿为醒者传。"
          },
          {
            name: "月下独酌·其三·李白",
            content: "三月咸阳城，千花昼如锦。谁能春独愁，对此径须饮。穷通与修短，造化夙所禀。一樽齐死生，万事固难审。醉後失天地，兀然就孤枕。不知有吾身，此乐最为甚。"
          },
          {
            name: "月下独酌·其四·李白",
            content: "穷愁千万端，美酒三百杯。愁多酒虽少，酒倾愁不来。所以知酒圣，酒酣心自开。辞粟卧首阳，屡空饥颜回。当代不乐饮，虚名安用哉。蟹螯即金液，糟丘是蓬莱。且须饮美酒，乘月醉高台。"
          },
          {
            name: "临江王节士歌·李白",
            content: "洞庭白波木叶稀，燕鸿始入吴云飞。吴云寒，燕鸿苦。风号沙宿潇湘浦，节士悲秋泪如雨。白日当天心，照之可以事明主。壮士愤，雄风生。安得倚天剑，跨海斩长鲸。"
          },
          {
            name: "司马将军歌·李白",
            content: "狂风吹古月，窃弄章华台。北落明星动光彩，南征猛将如云雷。手中电曳倚天剑，直斩长鲸海水开。我见楼船壮心目，颇似龙骧下三蜀。扬兵习战张虎旗，江中白浪如银屋。身居玉帐临河魁，紫髯若戟冠崔嵬，细柳开营揖天子，始知灞上为婴孩。羌笛横吹阿亸回，向月楼中吹落梅。将军自起舞长剑，壮士呼声动九垓。功成献凯见明主，丹青画像麒麟台。"
          },
          {
            name: "早发白帝城·李白",
            content: "朝辞白帝彩云间，千里江陵一日还。两岸猿声啼不住，轻舟已过万重山。"
          },
          {
            name: "夜宿山寺·李白",
            content: "危楼高百尺，手可摘星辰。不敢高声语，恐惊天上人。"
          },
          {
            name: "把酒问月·故人贾淳令予问之·李白",
            content: "青天有月来几时？我今停杯一问之。人攀明月不可得，月行却与人相随。皎如飞镜临丹阙，绿烟灭尽清辉发。但见宵从海上来，宁知晓向云间没。白兔捣药秋复春，嫦娥孤栖与谁邻？今人不见古时月，今月曾经照古人。古人今人若流水，共看明月皆如此。唯愿当歌对酒时，月光长照金樽里。"
          },
          {
            name: "登金陵凤凰台·李白",
            content: "凤凰台上凤凰游，凤去台空江自流。吴宫花草埋幽径，晋代衣冠成古丘。三山半落青天外，二水中分白鹭洲。总为浮云能蔽日，长安不见使人愁"
          },
          {
            name: "峨眉山月歌·李白",
            content: "峨眉山月半轮秋，影入平羌江水流。夜发清溪向三峡，思君不见下渝州。"
          },
          {
            name: "南陵别儿童入京·李白",
            content: "白酒新熟山中归，黄鸡啄黍秋正肥。呼童烹鸡酌白酒，儿女嬉笑牵人衣。高歌取醉欲自慰，起舞落日争光辉。游说万乘苦不早，著鞭跨马涉远道。会稽愚妇轻买臣，余亦辞家西入秦。仰天大笑出门去，我辈岂是蓬蒿人。"
          },
          {
            name: "庐山谣寄卢侍御虚舟·李白",
            content: "我本楚狂人，凤歌笑孔丘。手持绿玉杖，朝别黄鹤楼。五岳寻仙不辞远，一生好入名山游。庐山秀出南斗傍，屏风九叠云锦张，影落明湖青黛光。金阙前开二峰长，银河倒挂三石梁，香炉瀑布遥相望，回崖沓嶂凌苍苍。翠影红霞映朝日，鸟飞不到吴天长。登高壮观天地间，大江茫茫去不还。黄云万里动风色，白波九道流雪山。好为庐山谣，兴因庐山发。闲窥石镜清我心，谢公行处苍苔没。早服还丹无世情，琴心三叠道初成。遥见仙人彩云里，手把芙蓉朝玉京。先期汗漫九垓上，愿接卢敖游太清。"
          },
          {
            name: "塞下曲六首·其一·李白",
            content: "五月天山雪，无花只有寒。笛中闻折柳，春色未曾看。晓战随金鼓，宵眠抱玉鞍。愿将腰下剑，直为斩楼兰。"
          },
          {
            name: "关山月·李白",
            content: "明月出天山，苍茫云海间。长风几万里，吹度玉门关。汉下白登道，胡窥青海湾。由来征战地，不见有人还。戍客望边邑，思归多苦颜。高楼当此夜，叹息未应闲。"
          },
          {
            name: "山中与幽人对酌·李白",
            content: "两人对酌山花开，一杯一杯复一杯。我醉欲眠卿且去，明朝有意抱琴来。"
          },
          {
            name: "春夜宴从弟桃花园序·李白",
            content: "夫天地者万物之逆旅也；光阴者百代之过客也。而浮生若梦，为欢几何？古人秉烛夜游，良有以也。况阳春召我以烟景，大块假我以文章。会桃花之芳园，序天伦之乐事。群季俊秀，皆为惠连；吾人咏歌，独惭康乐。幽赏未已，高谈转清。开琼筵以坐花，飞羽觞而醉月。不有佳咏，何伸雅怀？如诗不成，罚依金谷酒数。"
          },
          {
            name: "妾薄命·李白",
            content: "汉帝重阿娇，贮之黄金屋。咳唾落九天，随风生珠玉。宠极爱还歇，妒深情却疏。长门一步地，不肯暂回车。雨落不上天，水覆难再收。君情与妾意，各自东西流。昔日芙蓉花，今成断根草。以色事他人，能得几时好。"
          },
          {
            name: "黄鹤楼送孟浩然之广陵·李白",
            content: "故人西辞黄鹤楼，烟花三月下扬州。孤帆远影碧空尽，唯见长江天际流。"
          },
          {
            name: "春夜洛城闻笛·李白",
            content: "谁家玉笛暗飞声，散入春风满洛城。此夜曲中闻折柳，何人不起故园情。"
          },
          {
            name: "江夏别宋之悌·李白",
            content: "楚水清若空，遥将碧海通。人分千里外，兴在一杯中。谷鸟吟晴日，江猿啸晚风。平生不下泪，于此泣无穷。"
          },
          {
            name: "访戴天山道士不遇·李白",
            content: "犬吠水声中，桃花带露浓。树深时见鹿，溪午不闻钟。野竹分青霭，飞泉挂碧峰。无人知所去，愁倚两三松。"
          },
          {
            name: "怨情·李白",
            content: "美人卷珠帘，深坐蹙蛾眉。但见泪痕湿，不知心恨谁。"
          },
          {
            name: "长相思·其一·李白",
            content: "长相思，在长安。络纬秋啼金井阑，微霜凄凄簟色寒。孤灯不明思欲绝，卷帷望月空长叹。美人如花隔云端！上有青冥之长天，下有渌水之波澜。天长路远魂飞苦，梦魂不到关山难。长相思，摧心肝！"
          },
          {
            name: "长相思·其二·李白",
            content: "日色欲尽花含烟，月明如素愁不眠。赵瑟初停凤凰柱，蜀琴欲奏鸳鸯弦。此曲有意无人传，愿随春风寄燕然。忆君迢迢隔青天。昔日横波目，今作流泪泉。不信妾断肠，归来看取明镜前。"
          },
          {
            name: "送友人·李白",
            content: "青山横北郭，白水绕东城。此地一为别，孤蓬万里征。浮云游子意，落日故人情。挥手自兹去，萧萧班马鸣。"
          },
          {
            name: "金陵酒肆留别·李白",
            content: "风吹柳花满店香，吴姬压酒劝客尝。金陵子弟来相送，欲行不行各尽觞。请君试问东流水，别意与之谁短长？"
          },
          {
            name: "白马篇·李白",
            content: "龙马花雪毛，金鞍五陵豪。秋霜切玉剑，落日明珠袍。斗鸡事万乘，轩盖一何高。弓摧南山虎，手接太行猱。酒后竞风采，三杯弄宝刀。杀人如剪草，剧孟同游遨。发愤去函谷，从军向临洮。叱咤经百战，匈奴尽奔逃。归来使酒气，未肯拜萧曹。羞入原宪室，荒径隐蓬蒿。"
          }
        ]
      },
      {
        author: "苏轼",
        article: [
          {
            name: "赤壁赋·苏轼",
            content: "壬戌之秋，七月既望，苏子与客泛舟游于赤壁之下。清风徐来，水波不兴。举酒属客，诵明月之诗，歌窈窕之章。少焉，月出于东山之上，徘徊于斗牛之间。白露横江，水光接天。纵一苇之所如，凌万顷之茫然。浩浩乎如冯虚御风，而不知其所止；飘飘乎如遗世独立，羽化而登仙。于是饮酒乐甚，扣舷而歌之。歌曰：“桂棹兮兰桨，击空明兮溯流光。渺渺兮予怀，望美人兮天一方。”客有吹洞箫者，倚歌而和之。其声呜呜然，如怨如慕，如泣如诉；余音袅袅，不绝如缕。舞幽壑之潜蛟，泣孤舟之嫠妇。苏子愀然，正襟危坐而问客曰：“何为其然也？”客曰：“‘月明星稀，乌鹊南飞。’此非曹孟德之诗乎？西望夏口，东望武昌，山川相缪，郁乎苍苍，此非孟德之困于周郎者乎？方其破荆州，下江陵，顺流而东也，舳舻千里，旌旗蔽空，酾酒临江，横槊赋诗，固一世之雄也，而今安在哉？况吾与子渔樵于江渚之上，侣鱼虾而友麋鹿，驾一叶之扁舟，举匏樽以相属。寄蜉蝣于天地，渺沧海之一粟。哀吾生之须臾，羡长江之无穷。挟飞仙以遨游，抱明月而长终。知不可乎骤得，托遗响于悲风。”苏子曰：“客亦知夫水与月乎？逝者如斯，而未尝往也；盈虚者如彼，而卒莫消长也。盖将自其变者而观之，则天地曾不能以一瞬；自其不变者而观之，则物与我皆无尽也，而又何羡乎！且夫天地之间，物各有主，苟非吾之所有，虽一毫而莫取。惟江上之清风，与山间之明月，耳得之而为声，目遇之而成色，取之无禁，用之不竭。是造物者之无尽藏也，而吾与子之所共适。”客喜而笑，洗盏更酌。肴核既尽，杯盘狼籍。相与枕藉乎舟中，不知东方之既白。"
          },
          {
            name: "念奴娇·赤壁怀古·苏轼",
            content: "大江东去，浪淘尽，千古风流人物。故垒西边，人道是，三国周郎赤壁。乱石穿空，惊涛拍岸，卷起千堆雪。江山如画，一时多少豪杰。遥想公瑾当年，小乔初嫁了，雄姿英发。羽扇纶巾，谈笑间，樯橹灰飞烟灭。故国神游，多情应笑我，早生华发。人生如梦，一尊还酹江月。"
          },
          {
            name: "江城子·密州出猎·苏轼",
            content: "老夫聊发少年狂，左牵黄，右擎苍，锦帽貂裘，千骑卷平冈。为报倾城随太守，亲射虎，看孙郎。酒酣胸胆尚开张。鬓微霜，又何妨！持节云中，何日遣冯唐？会挽雕弓如满月，西北望，射天狼。"
          },
          {
            name: "江城子·乙卯正月二十日夜记梦·苏轼",
            content: "十年生死两茫茫，不思量，自难忘。千里孤坟，无处话凄凉。纵使相逢应不识，尘满面，鬓如霜。夜来幽梦忽还乡，小轩窗，正梳妆。相顾无言，惟有泪千行。料得年年肠断处，明月夜，短松冈。"
          },
          {
            name: "定风波·莫听穿林打叶声·苏轼",
            content: "三月七日，沙湖道中遇雨，雨具先去，同行皆狼狈，余独不觉。已而遂晴，莫听穿林打叶声，何妨吟啸且徐行。竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。料峭春风吹酒醒，微冷，山头斜照却相迎。回首向来萧瑟处，归去，也无风雨也无晴。"
          },
          {
            name: "定风波·南海归赠王定国侍人寓娘·苏轼",
            content: "王定国歌儿曰柔奴，姓宇文氏，眉目娟丽，善应对，家世住京师。定国南迁归，余问柔：“广南风土， 应是不好？”柔对曰：“此心安处，便是吾乡。”因为缀词云。常羡人间琢玉郎，天应乞与点酥娘。尽道清歌传皓齿，风起，雪飞炎海变清凉。万里归来颜愈少。微笑，笑时犹带岭梅香。试问岭南应不好，却道：此心安处是吾乡。"
          },
          {
            name: "望江南·超然台作·苏轼",
            content: "春未老，风细柳斜斜。试上超然台上看，半壕春水一城花。烟雨暗千家。寒食后，酒醒却咨嗟。休对故人思故国，且将新火试新茶。诗酒趁年华。"
          },
          {
            name: "水调歌头·明月几时有·苏轼",
            content: "丙辰中秋，欢饮达旦，大醉，作此篇，兼怀子由。明月几时有？把酒问青天。不知天上宫阙，今夕是何年。我欲乘风归去，又恐琼楼玉宇，高处不胜寒。起舞弄清影，何似在人间。转朱阁，低绮户，照无眠。不应有恨，何事长向别时圆？人有悲欢离合，月有阴晴圆缺，此事古难全。但愿人长久，千里共婵娟。"
          },
          {
            name: "水调歌头·黄州快哉亭赠张偓佺·苏轼",
            content: "落日绣帘卷，亭下水连空。知君为我新作，窗户湿青红。长记平山堂上，欹枕江南烟雨，杳杳没孤鸿。认得醉翁语，山色有无中。一千顷，都镜净，倒碧峰。忽然浪起，掀舞一叶白头翁。堪笑兰台公子，未解庄生天籁，刚道有雌雄。一点浩然气，千里快哉风。"
          },
          {
            name: "临江仙·送钱穆父·苏轼",
            content: "一别都门三改火，天涯踏尽红尘。依然一笑作春温。无波真古井，有节是秋筠。惆怅孤帆连夜发，送行淡月微云。尊前不用翠眉颦。人生如逆旅，我亦是行人。"
          },
          {
            name: "临江仙·夜归临皋·苏轼",
            content: "夜饮东坡醒复醉，归来仿佛三更。家童鼻息已雷鸣。敲门都不应，倚杖听江声。长恨此身非我有，何时忘却营营。夜阑风静縠纹平。小舟从此逝，江海寄余生。"
          },
          {
            name: "蝶恋花·春景·苏轼",
            content: "花褪残红青杏小，燕子飞时，绿水人家绕。枝上柳绵吹又少，天涯何处无芳草。墙里秋千墙外道，墙外行人，墙里佳人笑。笑渐不闻声渐悄，多情却被无情恼。"
          },
          {
            name: "饮湖上初晴后雨·其一·苏轼",
            content: "朝曦迎客艳重冈，晚雨留人入醉乡。此意自佳君不会，一杯当属水仙王。"
          },
          {
            name: "饮湖上初晴后雨·其二·苏轼",
            content: "水光潋滟晴方好，山色空蒙雨亦奇。欲把西湖比西子，淡妆浓抹总相宜。"
          },
          {
            name: "浣溪沙·游蕲水清泉寺·苏轼",
            content: "游蕲水清泉寺，寺临兰溪，溪水西流。山下兰芽短浸溪，松间沙路净无泥，萧萧暮雨子规啼。谁道人生无再少？门前流水尚能西！休将白发唱黄鸡。"
          },
          {
            name: "浣溪沙·渔父·苏轼",
            content: "西塞山边白鹭飞，散花洲外片帆微。桃花流水鳜鱼肥。自庇一身青箬笠，相随到处绿蓑衣。斜风细雨不须归。"
          },
          {
            name: "卜算子·黄州定慧院寓居作·苏轼",
            content: "缺月挂疏桐，漏断人初静。谁见幽人独往来，缥缈孤鸿影。惊起却回头，有恨无人省。拣尽寒枝不肯栖，寂寞沙洲冷。"
          },
          {
            name: "西江月·世事一场大梦·苏轼",
            content: "世事一场大梦，人生几度秋凉？夜来风叶已鸣廊。看取眉头鬓上。酒贱常愁客少，月明多被云妨。中秋谁与共孤光。把盏凄然北望。"
          },
          {
            name: "惠崇春江晚景·其一·苏轼",
            content: "竹外桃花三两枝，春江水暖鸭先知。蒌蒿满地芦芽短，正是河豚欲上时。"
          },
          {
            name: "惠崇春江晚景·其二·苏轼",
            content: "两两归鸿欲破群，依依还似北归人。遥知朔漠多风雪，更待江南半月春。"
          },
          {
            name: "春宵·苏轼",
            content: "春宵一刻值千金，花有清香月有阴。歌管楼台声细细，秋千院落夜沉沉。"
          },
          {
            name: "和子由渑池怀旧·苏轼",
            content: "人生到处知何似，应似飞鸿踏雪泥。泥上偶然留指爪，鸿飞那复计东西。老僧已死成新塔，坏壁无由见旧题。往日崎岖还记否，路长人困蹇驴嘶。"
          },
          {
            name: "和董传留别·苏轼",
            content: "粗缯大布裹生涯，腹有诗书气自华。厌伴老儒烹瓠叶，强随举子踏槐花。囊空不办寻春马，眼乱行看择婿车。得意犹堪夸世俗，诏黄新湿字如鸦。"
          }
        ]
      },
      {
        author: "杜甫",
        article: [
          {
            name: "茅屋为秋风所破歌·杜甫",
            content: "八月秋高风怒号，卷我屋上三重茅。茅飞渡江洒江郊，高者挂罥长林梢，下者飘转沉塘坳。南村群童欺我老无力，忍能对面为盗贼。公然抱茅入竹去，唇焦口燥呼不得，归来倚杖自叹息。俄顷风定云墨色，秋天漠漠向昏黑。布衾多年冷似铁，娇儿恶卧踏里裂。床头屋漏无干处，雨脚如麻未断绝。自经丧乱少睡眠，长夜沾湿何由彻！安得广厦千万间，大庇天下寒士俱欢颜！风雨不动安如山。呜呼！何时眼前突兀见此屋，吾庐独破受冻死亦足！"
          },
          {
            name: "春望·杜甫",
            content: "国破山河在，城春草木深。感时花溅泪，恨别鸟惊心。烽火连三月，家书抵万金。白头搔更短，浑欲不胜簪。"
          },
          {
            name: "蜀相·杜甫",
            content: "丞相祠堂何处寻？锦官城外柏森森。映阶碧草自春色，隔叶黄鹂空好音。三顾频烦天下计，两朝开济老臣心。出师未捷身先死，长使英雄泪满襟。"
          },
          {
            name: "石壕吏·杜甫",
            content: "暮投石壕村，有吏夜捉人。老翁逾墙走，老妇出门看。吏呼一何怒！妇啼一何苦！听妇前致词：三男邺城戍。一男附书至，二男新战死。存者且偷生，死者长已矣！室中更无人，惟有乳下孙。有孙母未去，出入无完裙。老妪力虽衰，请从吏夜归。急应河阳役，犹得备晨炊。夜久语声绝，如闻泣幽咽。天明登前途，独与老翁别。"
          },
          {
            name: "赠卫八处士·杜甫",
            content: "人生不相见，动如参与商。今夕复何夕，共此灯烛光。少壮能几时，鬓发各已苍。访旧半为鬼，惊呼热中肠。焉知二十载，重上君子堂。昔别君未婚，儿女忽成行。怡然敬父执，问我来何方。问答乃未已，驱儿罗酒浆。夜雨剪春韭，新炊间黄粱。主称会面难，一举累十觞。十觞亦不醉，感子故意长。明日隔山岳，世事两茫茫。"
          },
          {
            name: "登高·杜甫",
            content: "风急天高猿啸哀，渚清沙白鸟飞回。无边落木萧萧下，不尽长江滚滚来。万里悲秋常作客，百年多病独登台。艰难苦恨繁霜鬓，潦倒新停浊酒杯。"
          },
          {
            name: "春夜喜雨·杜甫",
            content: "好雨知时节，当春乃发生。随风潜入夜，润物细无声。野径云俱黑，江船火独明。晓看红湿处，花重锦官城。"
          },
          {
            name: "望岳·杜甫",
            content: "岱宗夫如何？齐鲁青未了。造化钟神秀，阴阳割昏晓。荡胸生曾云，决眦入归鸟。会当凌绝顶，一览众山小。"
          },
          {
            name: "闻官军收河南河北·杜甫",
            content: "剑外忽传收蓟北，初闻涕泪满衣裳。却看妻子愁何在，漫卷诗书喜欲狂。白日放歌须纵酒，青春作伴好还乡。即从巴峡穿巫峡，便下襄阳向洛阳。"
          },
          {
            name: "春日忆李白·杜甫",
            content: "白也诗无敌，飘然思不群。清新庾开府，俊逸鲍参军。渭北春天树，江东日暮云。何时一樽酒，重与细论文。"
          },
          {
            name: "梦李白二首·其一·杜甫",
            content: "死别已吞声，生别常恻恻。江南瘴疠地，逐客无消息。故人入我梦，明我长相忆。君今在罗网，何以有羽翼？恐非平生魂，路远不可测。魂来枫林青，魂返关塞黑。落月满屋梁，犹疑照颜色。水深波浪阔，无使蛟龙得。"
          },
          {
            name: "梦李白二首·其二·杜甫",
            content: "浮云终日行，游子久不至。三夜频梦君，情亲见君意。告归常局促，苦道来不易。江湖多风波，舟楫恐失坠。出门搔白首，若负平生志。冠盖满京华，斯人独憔悴。孰云网恢恢，将老身反累。千秋万岁名，寂寞身后事。"
          },
          {
            name: "江南逢李龟年·杜甫",
            content: "岐王宅里寻常见，崔九堂前几度闻。正是江南好风景，落花时节又逢君。"
          },
          {
            name: "八阵图·杜甫",
            content: "功盖三分国，名成八阵图。江流石不转，遗恨失吞吴。"
          },
          {
            name: "饮中八仙歌·杜甫",
            content: "知章骑马似乘船，眼花落井水底眠。汝阳三斗始朝天，道逢麴车口流涎，恨不移封向酒泉。左相日兴费万钱，饮如长鲸吸百川，衔杯乐圣称避贤。宗之潇洒美少年，举觞白眼望青天，皎如玉树临风前。苏晋长斋绣佛前，醉中往往爱逃禅。李白斗酒诗百篇，长安市上酒家眠，天子呼来不上船，自称臣是酒中仙。张旭三杯草圣传，脱帽露顶王公前，挥毫落纸如云烟。焦遂五斗方卓然，高谈雄辩惊四筵。"
          },
          {
            name: "前出塞九首·其六·杜甫",
            content: "挽弓当挽强，用箭当用长。射人先射马，擒贼先擒王。杀人亦有限，列国自有疆。苟能制侵陵，岂在多杀伤。"
          },
          {
            name: "奉赠韦左丞丈二十二韵·杜甫",
            content: "纨绔不饿死，儒冠多误身。丈人试静听，贱子请具陈。甫昔少年日，早充观国宾。读书破万卷，下笔如有神。赋料扬雄敌，诗看子建亲。李邕求识面，王翰愿卜邻。自谓颇挺出，立登要路津。致君尧舜上，再使风俗淳。此意竟萧条，行歌非隐沦。骑驴十三载，旅食京华春。朝扣富儿门，暮随肥马尘。残杯与冷炙，到处潜悲辛。主上顷见征，欻然欲求伸。青冥却垂翅，蹭蹬无纵鳞。甚愧丈人厚，甚知丈人真。每于百僚上，猥诵佳句新。窃效贡公喜，难甘原宪贫。焉能心怏怏，只是走踆踆。今欲东入海，即将西去秦。尚怜终南山，回首清渭滨。常拟报一饭，况怀辞大臣。白鸥没浩荡，万里谁能驯？"
          },
          {
            name: "狂夫·杜甫",
            content: "万里桥西一草堂，百花潭水即沧浪。风含翠篠娟娟净，雨裛红蕖冉冉香。厚禄故人书断绝，恒饥稚子色凄凉。欲填沟壑唯疏放，自笑狂夫老更狂。"
          },
          {
            name: "江畔独步寻花七绝句·杜甫",
            content: "江上被花恼不彻，无处告诉只颠狂。走觅南邻爱酒伴，经旬出饮独空床。稠花乱蕊畏江滨，行步欹危实怕春。诗酒尚堪驱使在，未须料理白头人。江深竹静两三家，多事红花映白花。报答春光知有处，应须美酒送生涯。东望少城花满烟，百花高楼更可怜。谁能载酒开金盏，唤取佳人舞绣筵。黄师塔前江水东，春光懒困倚微风。桃花一簇开无主，可爱深红爱浅红？黄四娘家花满蹊，千朵万朵压枝低。留连戏蝶时时舞，自在娇莺恰恰啼。不是爱花即欲死，只恐花尽老相催。繁枝容易纷纷落，嫩蕊商量细细开。"
          },
          {
            name: "佳人·杜甫",
            content: "绝代有佳人，幽居在空谷。自云良家子，零落依草木。关中昔丧乱，兄弟遭杀戮。官高何足论，不得收骨肉。世情恶衰歇，万事随转烛。夫婿轻薄儿，新人美如玉。合昏尚知时，鸳鸯不独宿。但见新人笑，那闻旧人哭。在山泉水清，出山泉水浊。侍婢卖珠回，牵萝补茅屋。摘花不插发，采柏动盈掬。天寒翠袖薄，日暮倚修竹。"
          },
          {
            name: "绝句·其一·杜甫",
            content: "迟日江山丽，春风花草香。泥融飞燕子，沙暖睡鸳鸯。"
          },
          {
            name: "绝句·其二·杜甫",
            content: "江碧鸟逾白，山青花欲燃。今春看又过，何日是归年。"
          },
          {
            name: "月夜忆舍弟·杜甫",
            content: "戍鼓断人行，边秋一雁声。露从今夜白，月是故乡明。有弟皆分散，无家问死生。寄书长不达，况乃未休兵。"
          },
          {
            name: "自京赴奉先县咏怀五百字·杜甫",
            content: "杜陵有布衣，老大意转拙。许身一何愚，窃比稷与契。居然成濩落，白首甘契阔。盖棺事则已，此志常觊豁。穷年忧黎元，叹息肠内热。取笑同学翁，浩歌弥激烈。非无江海志，潇洒送日月。生逢尧舜君，不忍便永诀。当今廊庙具，构厦岂云缺。葵藿倾太阳，物性固难夺。顾惟蝼蚁辈，但自求其穴。胡为慕大鲸，辄拟偃溟渤。以兹误生理，独耻事干谒。兀兀遂至今，忍为尘埃没。终愧巢与由，未能易其节。沉饮聊自遣，放歌破愁绝。岁暮百草零，疾风高冈裂。天衢阴峥嵘，客子中夜发。霜严衣带断，指直不得结。凌晨过骊山，御榻在嵽嵲。蚩尤塞寒空，蹴蹋崖谷滑。瑶池气郁律，羽林相摩戛。君臣留欢娱，乐动殷胶葛。赐浴皆长缨，与宴非短褐。彤庭所分帛，本自寒女出。鞭挞其夫家，聚敛贡城阙。圣人筐篚恩，实欲邦国活。臣如忽至理，君岂弃此物。多士盈朝廷，仁者宜战栗。况闻内金盘，尽在卫霍室。中堂舞神仙，烟雾散玉质。煖客貂鼠裘，悲管逐清瑟。劝客驼蹄羹，霜橙压香橘。朱门酒肉臭，路有冻死骨。荣枯咫尺异，惆怅难再述。北辕就泾渭，官渡又改辙。群冰从西下，极目高崒兀。疑是崆峒来，恐触天柱折。河梁幸未坼，枝撑声窸窣。行旅相攀援，川广不可越。老妻寄异县，十口隔风雪。谁能久不顾，庶往共饥渴。入门闻号啕，幼子饥已卒。吾宁舍一哀，里巷亦呜咽。所愧为人父，无食致夭折。岂知秋禾登，贫窭有仓卒。生常免租税，名不隶征伐。抚迹犹酸辛，平人固骚屑。默思失业徒，因念远戍卒。忧端齐终南，澒洞不可掇。"
          }
        ]
      },
      {
        author: "辛弃疾",
        article: [
          {
            name: "破阵子·为陈同甫赋壮词以寄之·辛弃疾",
            content: "醉里挑灯看剑，梦回吹角连营。八百里分麾下炙，五十弦翻塞外声，沙场秋点兵。马作的卢飞快，弓如霹雳弦惊。了却君王天下事，赢得生前身后名。可怜白发生！"
          },
          {
            name: "破阵子·掷地刘郎玉斗·辛弃疾",
            content: "为范南伯寿。时南伯为张南轩辟宰泸溪，南伯迟迟未行。因作此词以勉之。掷地刘郎玉斗，挂帆西子扁舟。千古风流今在此，万里功名莫放休。君王三百州。燕雀岂知鸿鹄，貂蝉元出兜鍪。却笑泸溪如斗大，肯把牛刀试手不？寿君双玉瓯。"
          },
          {
            name: "青玉案·元夕·辛弃疾",
            content: "东风夜放花千树，更吹落、星如雨。宝马雕车香满路。凤箫声动，玉壶光转，一夜鱼龙舞。蛾儿雪柳黄金缕，笑语盈盈暗香去。众里寻他千百度，蓦然回首，那人却在，灯火阑珊处。"
          },
          {
            name: "丑奴儿·书博山道中壁·辛弃疾",
            content: "少年不识愁滋味，爱上层楼。爱上层楼，为赋新词强说愁。而今识尽愁滋味，欲说还休。欲说还休，却道“天凉好个秋”！"
          },
          {
            name: "永遇乐·京口北固亭怀古·辛弃疾",
            content: "千古江山，英雄无觅孙仲谋处。舞榭歌台，风流总被雨打风吹去。斜阳草树，寻常巷陌，人道寄奴曾住。想当年，金戈铁马，气吞万里如虎。元嘉草草，封狼居胥，赢得仓皇北顾。四十三年，望中犹记，烽火扬州路。可堪回首，佛狸祠下，一片神鸦社鼓。凭谁问：廉颇老矣，尚能饭否？"
          },
          {
            name: "南乡子·登京口北固亭有怀·辛弃疾",
            content: "何处望神州？满眼风光北固楼。千古兴亡多少事？悠悠。不尽长江滚滚流。年少万兜鍪，坐断东南战未休。天下英雄谁敌手？曹刘。生子当如孙仲谋。"
          },
          {
            name: "西江月·夜行黄沙道中·辛弃疾",
            content: "明月别枝惊鹊，清风半夜鸣蝉。稻花香里说丰年，听取蛙声一片。七八个星天外，两三点雨山前。旧时茅店社林边，路转溪桥忽见。"
          },
          {
            name: "鹧鸪天·送人·辛弃疾",
            content: "唱彻《阳关》泪未干，功名馀事且加餐。浮天水送无穷树，带雨云埋一半山。今古恨，几千般，只应离合是悲欢？江头未是风波恶，别有人间行路难！"
          },
          {
            name: "鹧鸪天·代人赋·辛弃疾",
            content: "晚日寒鸦一片愁。柳塘新绿却温柔。若教眼底无离恨，不信人间有白头。肠已断，泪难收。相思重上小红楼。情知已被山遮断，频倚阑干不自由。"
          },
          {
            name: "鹧鸪天·送廓之秋试·辛弃疾",
            content: "白苎新袍入嫩凉。春蚕食叶响回廊。禹门已准桃花浪，月殿先收桂子香。鹏北海，凤朝阳。又携书剑路茫茫。明年此日青云上，却笑人间举子忙。"
          },
          {
            name: "一剪梅·中秋无月·辛弃疾",
            content: "忆对中秋丹桂丛，花在杯中，月在杯中。今宵楼上一尊同，云湿纱窗，雨湿纱窗。浑欲乘风问化工，路也难通，信也难通。满堂唯有烛花红，杯且从容，歌且从容。"
          },
          {
            name: "贺新郎·同父见和再用韵答之·辛弃疾",
            content: "老大那堪说。似而今、元龙臭味，孟公瓜葛。我病君来高歌饮，惊散楼头飞雪。笑富贵千钧如发。硬语盘空谁来听？记当时、只有西窗月。重进酒，换鸣瑟。事无两样人心别。问渠侬：神州毕竟，几番离合？汗血盐车无人顾，千里空收骏骨。正目断关河路绝。我最怜君中宵舞，道“男儿到死心如铁”。看试手，补天裂。"
          },
          {
            name: "贺新郎·甚矣吾衰矣·辛弃疾",
            content: "邑中园亭，仆皆为赋此词。一日，独坐停云，水声山色，竞来相娱。意溪山欲援例者，遂作数语，庶几仿佛渊明思亲友之意云。甚矣吾衰矣。怅平生、交游零落，只今余几！白发空垂三千丈，一笑人间万事。问何物、能令公喜？我见青山多妩媚，料青山见我应如是。情与貌，略相似。一尊搔首东窗里。想渊明、停云诗就，此时风味。江左沉酣求名者，岂识浊醪妙理。回首叫、云飞风起。不恨古人吾不见，恨古人不见吾狂耳。知我者，二三子。"
          },
          {
            name: "贺新郎·别茂嘉十二弟·辛弃疾",
            content: "别茂嘉十二弟。鹈鴂、杜鹃实两种，见《离骚补注》绿树听鹈鴂。更那堪、鹧鸪声住，杜鹃声切。啼到春归无寻处，苦恨芳菲都歇。算未抵、人间离别。马上琵琶关塞黑，更长门、翠辇辞金阙。看燕燕，送归妾。将军百战身名裂。向河梁、回头万里，故人长绝。易水萧萧西风冷，满座衣冠似雪。正壮士、悲歌未彻。啼鸟还知如许恨，料不啼清泪长啼血。谁共我，醉明月。"
          },
          {
            name: "水调歌头·和马叔度游月波楼·辛弃疾",
            content: "客子久不到，好景为君留。西楼着意吟赏，何必问更筹？唤起一天明月，照我满怀冰雪，浩荡百川流。鲸饮未吞海，剑气已横秋。野光浮，天宇迥，物华幽。中州遗恨，不知今夜几人愁？谁念英雄老矣？不道功名蕞尔，决策尚悠悠。此事费分说，来日且扶头！"
          },
          {
            name: "水调歌头·我饮不须劝·辛弃疾",
            content: "淳熙丁酉，自江陵移帅隆兴，到官之三月被召，司马监、赵卿、王漕饯别。司马赋《水调歌头》，席间次韵。时王公明枢密薨，坐客终夕为兴门户之叹，故前章及之。我饮不须劝，正怕酒樽空。别离亦复何恨？此别恨匆匆。头上貂蝉贵客，苑外麒麟高冢，人世竟谁雄？一笑出门去，千里落花风。孙刘辈，能使我，不为公。余发种种如是，此事付渠侬。但觉平生湖海，除了醉吟风月，此外百无功。毫发皆帝力，更乞鉴湖东。"
          },
          {
            name: "摸鱼儿·更能消几番风雨·辛弃疾",
            content: "淳熙己亥，自湖北漕移湖南，同官王正之置酒小山亭，为赋。更能消、几番风雨，匆匆春又归去。惜春长怕花开早，何况落红无数。春且住，见说道、天涯芳草无归路。怨春不语。算只有殷勤，画檐蛛网，尽日惹飞絮。长门事，准拟佳期又误。蛾眉曾有人妒。千金纵买相如赋，脉脉此情谁诉？君莫舞，君不见、玉环飞燕皆尘土！闲愁最苦！休去倚危栏，斜阳正在，烟柳断肠处。"
          },
          {
            name: "玉楼春·风前欲劝春光住·辛弃疾",
            content: "风前欲劝春光住。春在城南芳草路。未随流落水边花，且作飘零泥上絮。镜中已觉星星误。人不负春春自负。梦回人远许多愁，只在梨花风雨处。"
          },
          {
            name: "菩萨蛮·书江西造口壁·辛弃疾",
            content: "郁孤台下清江水，中间多少行人泪。西北望长安，可怜无数山。青山遮不住，毕竟东流去。江晚正愁予，山深闻鹧鸪。"
          },
          {
            name: "太常引·建康中秋夜为吕叔潜赋·辛弃疾",
            content: "一轮秋影转金波，飞镜又重磨。把酒问姮娥：被白发，欺人奈何？乘风好去，长空万里，直下看山河。斫去桂婆娑，人道是，清光更多。"
          },
          {
            name: "清平乐·村居·辛弃疾",
            content: "茅檐低小，溪上青青草。醉里吴音相媚好，白发谁家翁媪？大儿锄豆溪东，中儿正织鸡笼。最喜小儿亡赖，溪头卧剥莲蓬。"
          },
          {
            name: "虞美人·赋虞美人草·辛弃疾",
            content: "当年得意如芳草。日日春风好。拔山力尽忽悲歌。饮罢虞兮从此、奈君何。人间不识精诚苦。贪看青青舞。蓦然敛袂却亭亭。怕是曲中犹带、楚歌声。"
          },
          {
            name: "沁园春·和吴尉子似·辛弃疾",
            content: "我见君来，顿觉吾庐，溪山美哉。怅平生肝胆，都成楚越，只今胶漆，谁是陈雷。搔首踟蹰，爱而不见，要得诗来渴望梅。还知否，快清风入手，日看千回。直须抖擞尘埃。人怪我柴门今始开。向松间乍可，从他喝道：庭中且莫，踏破苍苔。岂有文章，谩劳车马，待唤青刍白饭来。君非我，任功名意气，莫恁徘徊。"
          }
        ]
      },
      {
        author: "王勃",
        article: [
          {
            name: "滕王阁序·王勃",
            content: "豫章故郡，洪都新府。星分翼轸，地接衡庐。襟三江而带五湖，控蛮荆而引瓯越。物华天宝，龙光射牛斗之墟；人杰地灵，徐孺下陈蕃之榻。雄州雾列，俊采星驰。台隍枕夷夏之交，宾主尽东南之美。都督阎公之雅望，棨戟遥临；宇文新州之懿范，襜帷暂驻。十旬休假，胜友如云；千里逢迎，高朋满座。腾蛟起凤，孟学士之词宗；紫电青霜，王将军之武库。家君作宰，路出名区；童子何知，躬逢胜饯。时维九月，序属三秋。潦水尽而寒潭清，烟光凝而暮山紫。俨骖騑于上路，访风景于崇阿。临帝子之长洲，得天人之旧馆。层峦耸翠，上出重霄；飞阁流丹，下临无地。鹤汀凫渚，穷岛屿之萦回；桂殿兰宫，即冈峦之体势。披绣闼，俯雕甍，山原旷其盈视，川泽纡其骇瞩。闾阎扑地，钟鸣鼎食之家；舸舰弥津，青雀黄龙之舳。云销雨霁，彩彻区明。落霞与孤鹜齐飞，秋水共长天一色。渔舟唱晚，响穷彭蠡之滨，雁阵惊寒，声断衡阳之浦。遥襟甫畅，逸兴遄飞。爽籁发而清风生，纤歌凝而白云遏。睢园绿竹，气凌彭泽之樽；邺水朱华，光照临川之笔。四美具，二难并。穷睇眄于中天，极娱游于暇日。天高地迥，觉宇宙之无穷；兴尽悲来，识盈虚之有数。望长安于日下，目吴会于云间。地势极而南溟深，天柱高而北辰远。关山难越，谁悲失路之人；萍水相逢，尽是他乡之客。怀帝阍而不见，奉宣室以何年？嗟乎！时运不齐，命途多舛。冯唐易老，李广难封。屈贾谊于长沙，非无圣主；窜梁鸿于海曲，岂乏明时？所赖君子见机，达人知命。老当益壮，宁移白首之心？穷且益坚，不坠青云之志。酌贪泉而觉爽，处涸辙以犹欢。北海虽赊，扶摇可接；东隅已逝，桑榆非晚。孟尝高洁，空余报国之情；阮籍猖狂，岂效穷途之哭！勃，三尺微命，一介书生。无路请缨，等终军之弱冠；有怀投笔，慕宗悫之长风。舍簪笏于百龄，奉晨昏于万里。非谢家之宝树，接孟氏之芳邻。他日趋庭，叨陪鲤对；今兹捧袂，喜托龙门。杨意不逢，抚凌云而自惜；钟期既遇，奏流水以何惭？呜呼！胜地不常，盛筵难再；兰亭已矣，梓泽丘墟。临别赠言，幸承恩于伟饯；登高作赋，是所望于群公。敢竭鄙怀，恭疏短引；一言均赋，四韵俱成。请洒潘江，各倾陆海云尔。滕王高阁临江渚，佩玉鸣鸾罢歌舞。画栋朝飞南浦云，珠帘暮卷西山雨。闲云潭影日悠悠，物换星移几度秋。阁中帝子今何在？槛外长江空自流。"
          },
          {
            name: "送杜少府之任蜀州·王勃",
            content: "城阙辅三秦，风烟望五津。与君离别意，同是宦游人。海内存知己，天涯若比邻。无为在歧路，儿女共沾巾。"
          },
          {
            name: "别薛华·王勃",
            content: "送送多穷路，遑遑独问津。悲凉千里道，凄断百年身。心事同漂泊，生涯共苦辛。无论去与住，俱是梦中人。"
          },
          {
            name: "秋夜长·王勃",
            content: "秋夜长，殊未央，月明白露澄清光，层城绮阁遥相望。遥相望，川无梁，北风受节南雁翔，崇兰委质时菊芳。鸣环曳履出长廊，为君秋夜捣衣裳。纤罗对凤凰，丹绮双鸳鸯，调砧乱杵思自伤。思自伤，征夫万里戍他乡。鹤关音信断，龙门道路长。君在天一方，寒衣徒自香。"
          }
        ]
      },
      {
        author: "陆游",
        article: [
          {
            name: "卜算子·咏梅·陆游",
            content: "驿外断桥边，寂寞开无主。已是黄昏独自愁，更着风和雨。无意苦争春，一任群芳妒。零落成泥碾作尘，只有香如故。"
          },
          {
            name: "游山西村·陆游",
            content: "莫笑农家腊酒浑，丰年留客足鸡豚。山重水复疑无路，柳暗花明又一村。箫鼓追随春社近，衣冠简朴古风存。从今若许闲乘月，拄杖无时夜叩门。"
          },
          {
            name: "钗头凤·红酥手·陆游",
            content: "红酥手，黄縢酒，满城春色宫墙柳。东风恶，欢情薄。一怀愁绪，几年离索。错、错、错。春如旧，人空瘦，泪痕红浥鲛绡透。桃花落，闲池阁。山盟虽在，锦书难托。莫、莫、莫！"
          },
          {
            name: "冬夜读书示子聿·陆游",
            content: "古人学问无遗力，少壮工夫老始成。纸上得来终觉浅，绝知此事要躬行。"
          },
          {
            name: "十一月四日风雨大作·其二·陆游",
            content: "僵卧孤村不自哀，尚思为国戍轮台。夜阑卧听风吹雨，铁马冰河入梦来。"
          },
          {
            name: "书愤·陆游",
            content: "早岁那知世事艰，中原北望气如山。楼船夜雪瓜洲渡，铁马秋风大散关。塞上长城空自许，镜中衰鬓已先斑。出师一表真名世，千载谁堪伯仲间！"
          },
          {
            name: "病起书怀·陆游",
            content: "病骨支离纱帽宽，孤臣万里客江干。位卑未敢忘忧国，事定犹须待阖棺。天地神灵扶庙社，京华父老望和銮。出师一表通今古，夜半挑灯更细看。"
          },
          {
            name: "剑门道中遇微雨·陆游",
            content: "衣上征尘杂酒痕，远游无处不消魂。此身合是诗人未？细雨骑驴入剑门。"
          },
          {
            name: "沈园二首·其一·陆游",
            content: "城上斜阳画角哀，沈园非复旧池台。伤心桥下春波绿，曾是惊鸿照影来。"
          },
          {
            name: "除夜雪·陆游",
            content: "北风吹雪四更初，嘉瑞天教及岁除。半盏屠苏犹未举，灯前小草写桃符。"
          },
          {
            name: "临安春雨初霁·陆游",
            content: "世味年来薄似纱，谁令骑马客京华。小楼一夜听春雨，深巷明朝卖杏花。矮纸斜行闲作草，晴窗细乳戏分茶。素衣莫起风尘叹，犹及清明可到家。"
          },
          {
            name: "诉衷情·当年万里觅封侯·陆游",
            content: "当年万里觅封侯，匹马戍梁州。关河梦断何处？尘暗旧貂裘。胡未灭，鬓先秋，泪空流。此生谁料，心在天山，身老沧洲。"
          }
        ]
      },
      {
        author: "白居易",
        article: [
          {
            name: "长恨歌·白居易",
            content: "汉皇重色思倾国，御宇多年求不得。杨家有女初长成，养在深闺人未识。天生丽质难自弃，一朝选在君王侧。回眸一笑百媚生，六宫粉黛无颜色。春寒赐浴华清池，温泉水滑洗凝脂。侍儿扶起娇无力，始是新承恩泽时。云鬓花颜金步摇，芙蓉帐暖度春宵。春宵苦短日高起，从此君王不早朝。承欢侍宴无闲暇，春从春游夜专夜。后宫佳丽三千人，三千宠爱在一身。金屋妆成娇侍夜，玉楼宴罢醉和春。姊妹弟兄皆列土，可怜光彩生门户。遂令天下父母心，不重生男重生女。骊宫高处入青云，仙乐风飘处处闻。缓歌慢舞凝丝竹，尽日君王看不足。渔阳鼙鼓动地来，惊破霓裳羽衣曲。九重城阙烟尘生，千乘万骑西南行。翠华摇摇行复止，西出都门百余里。六军不发无奈何，宛转蛾眉马前死。花钿委地无人收，翠翘金雀玉搔头。君王掩面救不得，回看血泪相和流。黄埃散漫风萧索，云栈萦纡登剑阁。峨嵋山下少人行，旌旗无光日色薄。蜀江水碧蜀山青，圣主朝朝暮暮情。行宫见月伤心色，夜雨闻铃肠断声。天旋地转回龙驭，到此踌躇不能去。马嵬坡下泥土中，不见玉颜空死处。君臣相顾尽沾衣，东望都门信马归。归来池苑皆依旧，太液芙蓉未央柳。芙蓉如面柳如眉，对此如何不泪垂？春风桃李花开日，秋雨梧桐叶落时。西宫南内多秋草，落叶满阶红不扫。梨园弟子白发新，椒房阿监青娥老。夕殿萤飞思悄然，孤灯挑尽未成眠。迟迟钟鼓初长夜，耿耿星河欲曙天。鸳鸯瓦冷霜华重，翡翠衾寒谁与共？悠悠生死别经年，魂魄不曾来入梦临邛道士鸿都客，能以精诚致魂魄为感君王辗转思，遂教方士殷勤觅排空驭气奔如电，升天入地求之遍上穷碧落下黄泉，两处茫茫皆不见忽闻海上有仙山，山在虚无缥缈间楼阁玲珑五云起，其中绰约多仙子中有一人字太真，雪肤花貌参差是金阙西厢叩玉扃，转教小玉报双成闻道汉家天子使，九华帐里梦魂惊揽衣推枕起徘徊，珠箔银屏迤逦开云鬓半偏新睡觉，花冠不整下堂来。风吹仙袂飘飖举，犹似霓裳羽衣舞。玉容寂寞泪阑干，梨花一枝春带雨。含情凝睇谢君王，一别音容两渺茫。昭阳殿里恩爱绝，蓬莱宫中日月长。回头下望人寰处，不见长安见尘雾。惟将旧物表深情，钿合金钗寄将去。钗留一股合一扇，钗擘黄金合分钿。但令心似金钿坚，天上人间会相见。临别殷勤重寄词，词中有誓两心知。七月七日长生殿，夜半无人私语时。在天愿作比翼鸟，在地愿为连理枝。天长地久有时尽，此恨绵绵无绝期。"
          },
          {
            name: "琵琶行·白居易",
            content: "元和十年，予左迁九江郡司马。明年秋，送客湓浦口，闻舟中夜弹琵琶者，听其音，铮铮然有京都声。问其人，本长安倡女，尝学琵琶于穆、曹二善才，年长色衰，委身为贾人妇。遂命酒，使快弹数曲。曲罢悯然，自叙少小时欢乐事，今漂沦憔悴，转徙于江湖间。予出官二年，恬然自安，感斯人言，是夕始觉有迁谪意。因为长句，歌以赠之，凡六百一十六言，命曰《琵琶行》。浔阳江头夜送客，枫叶荻花秋瑟瑟。主人下马客在船，举酒欲饮无管弦。醉不成欢惨将别，别时茫茫江浸月。忽闻水上琵琶声，主人忘归客不发。寻声暗问弹者谁，琵琶声停欲语迟。移船相近邀相见，添酒回灯重开宴。千呼万唤始出来，犹抱琵琶半遮面。转轴拨弦三两声，未成曲调先有情。弦弦掩抑声声思，似诉平生不得志。低眉信手续续弹，说尽心中无限事。轻拢慢捻抹复挑，初为《霓裳》后《六幺》。大弦嘈嘈如急雨，小弦切切如私语。嘈嘈切切错杂弹，大珠小珠落玉盘。间关莺语花底滑，幽咽泉流冰下难。冰泉冷涩弦凝绝，凝绝不通声暂歇。别有幽愁暗恨生，此时无声胜有声。银瓶乍破水浆迸，铁骑突出刀枪鸣。曲终收拨当心画，四弦一声如裂帛。东船西舫悄无言，唯见江心秋月白。沉吟放拨插弦中，整顿衣裳起敛容。自言本是京城女，家在虾蟆陵下住。十三学得琵琶成，名属教坊第一部。曲罢曾教善才服，妆成每被秋娘妒。五陵年少争缠头，一曲红绡不知数。钿头银篦击节碎，血色罗裙翻酒污。今年欢笑复明年，秋月春风等闲度。弟走从军阿姨死，暮去朝来颜色故。门前冷落鞍马稀，老大嫁作商人妇。商人重利轻别离，前月浮梁买茶去。去来江口守空船，绕船月明江水寒。夜深忽梦少年事，梦啼妆泪红阑干。我闻琵琶已叹息，又闻此语重唧唧。同是天涯沦落人，相逢何必曾相识！我从去年辞帝京，谪居卧病浔阳城。浔阳地僻无音乐，终岁不闻丝竹声。住近湓江地低湿，黄芦苦竹绕宅生。其间旦暮闻何物？杜鹃啼血猿哀鸣。春江花朝秋月夜，往往取酒还独倾。岂无山歌与村笛，呕哑嘲哳难为听。今夜闻君琵琶语，如听仙乐耳暂明。莫辞更坐弹一曲，为君翻作《琵琶行》。感我此言良久立，却坐促弦弦转急。凄凄不似向前声，满座重闻皆掩泣。座中泣下谁最多？江州司马青衫湿。"
          },
          {
            name: "梦微之·白居易",
            content: "夜来携手梦同游，晨起盈巾泪莫收。漳浦老身三度病，咸阳宿草八回秋。君埋泉下泥销骨，我寄人间雪满头。阿卫韩郎相次去，夜台茫昧得知不？"
          },
          {
            name: "忆江南·其一·白居易",
            content: "江南好，风景旧曾谙。日出江花红胜火，春来江水绿如蓝。能不忆江南？"
          },
          {
            name: "忆江南·其二·白居易",
            content: "江南忆，最忆是杭州。山寺月中寻桂子，郡亭枕上看潮头。何日更重游？"
          },
          {
            name: "忆江南·其三·白居易",
            content: "江南忆，其次忆吴宫。吴酒一杯春竹叶，吴娃双舞醉芙蓉。早晚复相逢？"
          },
          {
            name: "问刘十九·白居易",
            content: "绿蚁新醅酒，红泥小火炉。晚来天欲雪，能饮一杯无？"
          },
          {
            name: "观刈麦·白居易",
            content: "田家少闲月，五月人倍忙。夜来南风起，小麦覆陇黄。妇姑荷箪食，童稚携壶浆，相随饷田去，丁壮在南冈。足蒸暑土气，背灼炎天光，力尽不知热，但惜夏日长。复有贫妇人，抱子在其旁，右手秉遗穗，左臂悬敝筐。听其相顾言，闻者为悲伤。家田输税尽，拾此充饥肠。今我何功德？曾不事农桑。吏禄三百石，岁晏有余粮，念此私自愧，尽日不能忘。"
          },
          {
            name: "钱塘湖春行·白居易",
            content: "孤山寺北贾亭西，水面初平云脚低。几处早莺争暖树，谁家新燕啄春泥。乱花渐欲迷人眼，浅草才能没马蹄。最爱湖东行不足，绿杨阴里白沙堤。"
          },
          {
            name: "长相思·汴水流·白居易",
            content: "汴水流，泗水流，流到瓜州古渡头。吴山点点愁。思悠悠，恨悠悠，恨到归时方始休。月明人倚楼。"
          },
          {
            name: "夜雨·白居易",
            content: "我有所念人，隔在远远乡。我有所感事，结在深深肠。乡远去不得，无日不瞻望。肠深解不得，无夕不思量。况此残灯夜，独宿在空堂。秋天殊未晓，风雨正苍苍。不学头陀法，前心安可忘。"
          },
          {
            name: "暮江吟·白居易",
            content: "一道残阳铺水中，半江瑟瑟半江红。可怜九月初三夜，露似真珠"
          },
          {
            name: "浪淘沙·借问江潮与海水·白居易",
            content: "借问江潮与海水，何似君情与妾心？相恨不如潮有信，相思始觉海非深。"
          },
          {
            name: "赋得古原草送别·白居易",
            content: "离离原上草，一岁一枯荣。野火烧不尽，春风吹又生。远芳侵古道，晴翠接荒城。又送王孙去，萋萋满别情。"
          },
          {
            name: "望月有感·白居易",
            content: "自河南经乱，关内阻饥，兄弟离散，各在一处。因望月有感，聊书所怀，寄上浮梁大兄、於潜七兄、乌江十五兄，兼示符离及下邽弟妹。时难年荒世业空，弟兄羁旅各西东。田园寥落干戈后，骨肉流离道路中。吊影分为千里雁，辞根散作九秋蓬。共看明月应垂泪，一夜乡心五处同。"
          },
          {
            name: "太行路·白居易",
            content: "太行之路能摧车，若比人心是坦途。巫峡之水能覆舟，若比人心是安流。人心好恶苦不常，好生毛羽恶生疮。与君结发未五载，岂期牛女为参商。古称色衰相弃背，当时美人犹怨悔。何况如今鸾镜中，妾颜未改君心改。为君熏衣裳，君闻兰麝不馨香。为君盛容饰，君看金翠无颜色。行路难，难重陈。人生莫作妇人身，百年苦乐由他人。行路难，难于山，险于水。不独人间夫与妻，近代君臣亦如此。君不见左纳言，右纳史，朝承恩，暮赐死。行路难，不在水，不在山，只在人情反覆间。"
          }
        ]
      },
      {
        author: "杜牧",
        article: [
          {
            name: "阿房宫赋·杜牧",
            content: "六王毕，四海一，蜀山兀，阿房出。覆压三百余里，隔离天日。骊山北构而西折，直走咸阳。二川溶溶，流入宫墙。五步一楼，十步一阁；廊腰缦回，檐牙高啄；各抱地势，钩心斗角。盘盘焉，囷囷焉，蜂房水涡，矗不知其几千万落。长桥卧波，未云何龙？复道行空，不霁何虹？高低冥迷，不知西东。歌台暖响，春光融融；舞殿冷袖，风雨凄凄。一日之内，一宫之间，而气候不齐。妃嫔媵嫱，王子皇孙，辞楼下殿，辇来于秦。朝歌夜弦，为秦宫人。明星荧荧，开妆镜也；绿云扰扰，梳晓鬟也；渭流涨腻，弃脂水也；烟斜雾横，焚椒兰也。雷霆乍惊，宫车过也；辘辘远听，杳不知其所之也。一肌一容，尽态极妍，缦立远视，而望幸焉。有不见者三十六年。燕赵之收藏，韩魏之经营，齐楚之精英，几世几年，剽掠其人，倚叠如山。一旦不能有，输来其间。鼎铛玉石，金块珠砾，弃掷逦迤，秦人视之，亦不甚惜。嗟乎！一人之心，千万人之心也。秦爱纷奢，人亦念其家。奈何取之尽锱铢，用之如泥沙？使负栋之柱，多于南亩之农夫；架梁之椽，多于机上之工女；钉头磷磷，多于在庾之粟粒；瓦缝参差，多于周身之帛缕；直栏横槛，多于九土之城郭；管弦呕哑，多于市人之言语。使天下之人，不敢言而敢怒。独夫之心，日益骄固。戍卒叫，函谷举，楚人一炬，可怜焦土！呜呼！灭六国者六国也，非秦也；族秦者秦也，非天下也。嗟乎！使六国各爱其人，则足以拒秦；使秦复爱六国之人，则递三世可至万世而为君，谁得而族灭也？秦人不暇自哀，而后人哀之；后人哀之而不鉴之，亦使后人而复哀后人也。"
          },
          {
            name: "寄扬州韩绰判官·杜牧",
            content: "青山隐隐水迢迢，秋尽江南草未凋。二十四桥明月夜，玉人何处教吹箫。"
          },
          {
            name: "旅宿·杜牧",
            content: "旅馆无良伴，凝情自悄然。寒灯思旧事，断雁警愁眠。远梦归侵晓，家书到隔年。沧江好烟月，门系钓鱼船。"
          },
          {
            name: "过华清宫绝句·其一·杜牧",
            content: "长安回望绣成堆，山顶千门次第开。一骑红尘妃子笑，无人知是荔枝来。"
          },
          {
            name: "过华清宫绝句·其二·杜牧",
            content: "长安回望绣成堆，山顶千门次第开。一骑红尘妃子笑，无人知是荔枝来。"
          },
          {
            name: "过华清宫绝句·其三·杜牧",
            content: "万国笙歌醉太平，倚天楼殿月分明。云中乱拍禄山舞，风过重峦下笑声。"
          },
          {
            name: "泊秦淮·杜牧",
            content: "烟笼寒水月笼沙，夜泊秦淮近酒家。商女不知亡国恨，隔江犹唱后庭花。"
          },
          {
            name: "遣怀·杜牧",
            content: "落魄江湖载酒行，楚腰纤细掌中轻。十年一觉扬州梦，赢得青楼薄幸名。"
          },
          {
            name: "山行·杜牧",
            content: "远上寒山石径斜，白云生处有人家。停车坐爱枫林晚，霜叶红于二月花。"
          },
          {
            name: "秋夕·杜牧",
            content: "银烛秋光冷画屏，轻罗小扇扑流萤。天阶夜色凉如水，卧看牵牛织女星。"
          },
          {
            name: "题乌江亭·杜牧",
            content: "胜败兵家事不期，包羞忍耻是男儿。江东子弟多才俊，卷土重来未可知。"
          },
          {
            name: "赤壁·杜牧",
            content: "折戟沉沙铁未销，自将磨洗认前朝。东风不与周郎便，铜雀春深锁二乔。"
          },
          {
            name: "清明·杜牧",
            content: "清明时节雨纷纷，路上行人欲断魂。借问酒家何处有？牧童遥指杏花村。"
          },
          {
            name: "九日齐山登高·杜牧",
            content: "江涵秋影雁初飞，与客携壶上翠微。尘世难逢开口笑，菊花须插满头归。但将酩酊酬佳节，不用登临恨落晖。古往今来只如此，牛山何必独霑衣。"
          },
          {
            name: "赠别·其一·杜牧",
            content: "娉娉袅袅十三余，豆蔻梢头二月初。春风十里扬州路，卷上珠帘总不如。"
          },
          {
            name: "赠别·其二·杜牧",
            content: "多情却似总无情，唯觉尊前笑不成。蜡烛有心还惜别，替人垂泪到天明。"
          },
          {
            name: "题宣州开元寺水阁阁下宛溪夹溪居人·杜牧",
            content: "六朝文物草连空，天淡云闲今古同。鸟去鸟来山色里，人歌人哭水声中。深秋帘幕千家雨，落日楼台一笛风。惆怅无因见范蠡，参差烟树五湖东。"
          },
          {
            name: "金谷园·杜牧",
            content: "繁华事散逐香尘，流水无情草自春。日暮东风怨啼鸟，落花犹似坠楼人。"
          },
          {
            name: "鹭鸶·杜牧",
            content: "雪衣雪发青玉嘴，群捕鱼儿溪影中。惊飞远映碧山去，一树梨花落晚风。"
          },
          {
            name: "长安秋望·杜牧",
            content: "楼倚霜树外，镜天无一毫。南山与秋色，气势两相高。"
          },
          {
            name: "送隐者一绝·杜牧",
            content: "无媒径路草萧萧，自古云林远市朝。公道世间唯白发，贵人头上不曾饶。"
          },
          {
            name: "题木兰庙·杜牧",
            content: "弯弓征战作男儿，梦里曾经与画眉。几度思归还把酒，拂云堆上祝明妃。"
          },
          {
            name: "初冬夜饮·杜牧",
            content: "淮阳多病偶求欢，客袖侵霜与烛盘。砌下梨花一堆雪，明年谁此凭阑干。"
          },
          {
            name: "西江怀古·杜牧",
            content: "上吞巴汉控潇湘，怒似连山静镜光。魏帝缝囊真戏剧，苻坚投棰更荒唐。千秋钓舸歌明月，万里沙鸥弄夕阳。范蠡清尘何寂寞，好风唯属往来商。"
          },
          {
            name: "紫薇花·杜牧",
            content: "晓迎秋露一枝新，不占园中最上春。桃李无言又何在，向风偏笑艳阳人。"
          }
        ]
      },
      {
        author: "王维",
        article: [
          {
            name: "终南别业·王维",
            content: "中岁颇好道，晚家南山陲。兴来每独往，胜事空自知。行到水穷处，坐看云起时。偶然值林叟，谈笑无还期。"
          },
          {
            name: "相思·王维",
            content: "红豆生南国，春来发几枝。愿君多采撷，此物最相思。"
          },
          {
            name: "山居秋暝·王维",
            content: "空山新雨后，天气晚来秋。明月松间照，清泉石上流。竹喧归浣女，莲动下渔舟。随意春芳歇，王孙自可留。"
          },
          {
            name: "送元二使安西·王维",
            content: "渭城朝雨浥轻尘，客舍青青柳色新。劝君更尽一杯酒，西出阳关无故人。"
          },
          {
            name: "使至塞上·王维",
            content: "单车欲问边，属国过居延。征蓬出汉塞，归雁入胡天。大漠孤烟直，长河落日圆。萧关逢候骑，都护在燕然。"
          },
          {
            name: "画·王维",
            content: "远看山有色，近听水无声。春去花还在，人来鸟不惊。"
          },
          {
            name: "老将行·王维",
            content: "少年十五二十时，步行夺得胡马骑。射杀山中白额虎，肯数邺下黄须儿！一身转战三千里，一剑曾当百万师。汉兵奋迅如霹雳，虏骑崩腾畏蒺藜。卫青不败由天幸，李广无功缘数奇。自从弃置便衰朽，世事蹉跎成白首。昔时飞箭无全目，今日垂杨生左肘。路旁时卖故侯瓜，门前学种先生柳。苍茫古木连穷巷，寥落寒山对虚牖。誓令疏勒出飞泉，不似颍川空使酒。贺兰山下阵如云，羽檄交驰日夕闻。节使三河募年少，诏书五道出将军。试拂铁衣如雪色，聊持宝剑动星文。愿得燕弓射大将，耻令越甲鸣吾君。莫嫌旧日云中守，犹堪一战取功勋。"
          },
          {
            name: "送沈子归江东·王维",
            content: "杨柳渡头行客稀，罟师荡桨向临圻。惟有相思似春色，江南江北送君归。"
          },
          {
            name: "竹里馆·王维",
            content: "独坐幽篁里，弹琴复长啸。深林人不知，明月来相照。"
          },
          {
            name: "酌酒与裴迪·王维",
            content: "酌酒与君君自宽，人情翻覆似波澜。白首相知犹按剑，朱门先达笑弹冠。草色全经细雨湿，花枝欲动春风寒。世事浮云何足问，不如高卧且加餐。"
          },
          {
            name: "山中·王维",
            content: "荆溪白石出，天寒红叶稀。山路元无雨，空翠湿人衣。"
          },
          {
            name: "九月九日忆山东兄弟·王维",
            content: "独在异乡为异客，每逢佳节倍思亲。遥知兄弟登高处，遍插茱萸少一人。"
          },
          {
            name: "送别·王维",
            content: "下马饮君酒，问君何所之？君言不得意，归卧南山陲。但去莫复问，白云无尽时。"
          },
          {
            name: "陇头吟·王维",
            content: "长安少年游侠客，夜上戍楼看太白。陇头明月迥临关，陇上行人夜吹笛。关西老将不胜愁，驻马听之双泪流。身经大小百余战，麾下偏裨万户侯。苏武才为典属国，节旄落尽海西头。"
          },
          {
            name: "和贾舍人早朝大明宫之作·王维",
            content: "绛帻鸡人报晓筹，尚衣方进翠云裘。九天阊阖开宫殿，万国衣冠拜冕旒。日色才临仙掌动，香烟欲傍衮龙浮。朝罢须裁五色诏，佩声归向凤池头。"
          },
          {
            name: "终南山·王维",
            content: "太乙近天都，连山接海隅。白云回望合，青霭入看无。分野中峰变，阴晴众壑殊。欲投人处宿，隔水问樵夫。"
          },
          {
            name: "积雨辋川庄作·王维",
            content: "积雨空林烟火迟，蒸藜炊黍饷东菑。漠漠水田飞白鹭，阴阴夏木啭黄鹂。山中习静观朝槿，松下清斋折露葵。野老与人争席罢，海鸥何事更相疑。"
          },
          {
            name: "伊州歌·王维",
            content: "清风明月苦相思，荡子从戎十载馀。征人去日殷勤嘱，归雁来时数附书。"
          },
          {
            name: "送梓州李使君·王维",
            content: "万壑树参天，千山响杜鹃。山中一夜雨，树杪百重泉。汉女输橦布，巴人讼芋田。文翁翻教授，不敢倚先贤。"
          }
        ]
      },
      {
        author: "王昌龄",
        article: [
          {
            name: "出塞·其一·王昌龄",
            content: "秦时明月汉时关，万里长征人未还。但使龙城飞将在，不教胡马度阴山。"
          },
          {
            name: "出塞·其二·王昌龄",
            content: "骝马新跨白玉鞍，战罢沙场月色寒。城头铁鼓声犹震，匣里金刀血未干。"
          },
          {
            name: "从军行七首·其四·王昌龄",
            content: "青海长云暗雪山，孤城遥望玉门关。黄沙百战穿金甲，不破楼兰终不还。"
          },
          {
            name: "从军行七首·其六·王昌龄",
            content: "胡瓶落膊紫薄汗，碎叶城西秋月团。明敕星驰封宝剑，辞君一夜取楼兰。"
          },
          {
            name: "长歌行·王昌龄",
            content: "旷野饶悲风，飕飕黄蒿草。系马倚白杨，谁知我怀抱。所是同袍者，相逢尽衰老。北登汉家陵，南望长安道。下有枯树根，上有鼯鼠窠。高皇子孙尽，千载无人过。宝玉频发掘，精灵其奈何。人生须达命，有酒且长歌。"
          },
          {
            name: "芙蓉楼送辛渐·王昌龄",
            content: "寒雨连江夜入吴，平明送客楚山孤。洛阳亲友如相问，一片冰心在玉壶。"
          },
          {
            name: "送狄宗亨·王昌龄",
            content: "秋在水清山暮蝉，洛阳树色鸣皋烟。送君归去愁不尽，又惜空度凉风天。"
          },
          {
            name: "长信怨·王昌龄",
            content: "金井梧桐秋叶黄，珠帘不卷夜来霜。熏笼玉枕无颜色，卧听南宫清漏长。高殿秋砧响夜阑，霜深犹忆御衣寒。银灯青琐裁缝歇，还向金城明主看。奉帚平明金殿开，暂将团扇共徘徊。玉颜不及寒鸦色，犹带昭阳日影来。真成薄命久寻思，梦见君王觉后疑。火照西宫知夜饮，分明复道奉恩时。长信宫中秋月明，昭阳殿下捣衣声。白露堂中细草迹，红罗帐里不胜情。"
          },
          {
            name: "答武陵太守·王昌龄",
            content: "仗剑行千里，微躯敢一言。曾为大梁客，不负信陵恩。"
          },
          {
            name: "春宫曲·王昌龄",
            content: "昨夜风开露井桃，未央前殿月轮高。平阳歌舞新承宠，帘外春寒赐锦袍。"
          },
          {
            name: "重别李评事·王昌龄",
            content: "莫道秋江离别难，舟船明日是长安。吴姬缓舞留君醉，随意青枫白露寒。"
          },
          {
            name: "浣纱女·王昌龄",
            content: "钱塘江畔是谁家，江上女儿全胜花。吴王在时不得出，今日公然来浣纱。"
          },
          {
            name: "旅望·王昌龄",
            content: "白花原头望京师，黄河水流无尽时。穷秋旷野行人绝，马首东来知是谁。"
          },
          {
            name: "代扶风主人答·王昌龄",
            content: "杀气凝不流，风悲日彩寒。浮埃起四远，游子弥不欢。依然宿扶风，沽酒聊自宽。寸心亦未理，长铗谁能弹。主人就我饮，对我还慨叹。便泣数行泪，因歌行路难。十五役边地，三四讨楼兰。连年不解甲，积日无所餐。将军降匈奴，国使没桑乾。去时三十万，独自还长安。不信沙场苦，君看刀箭瘢。乡亲悉零落，冢墓亦摧残。仰攀青松枝，恸绝伤心肝。禽兽悲不去，路旁谁忍看。幸逢休明代，寰宇静波澜。老马思伏枥，长鸣力已殚。少年兴运会，何事发悲端。天子初封禅，贤良刷羽翰。三边悉如此，否泰亦须观。"
          },
          {
            name: "卢溪别人·王昌龄",
            content: "武陵溪口驻扁舟，溪水随君向北流。行到荆门上三峡，莫将孤月对猿愁。"
          }
        ]
      },
      {
        author: "李商隐",
        article: [
          {
            name: "无题·李商隐",
            content: "昨夜星辰昨夜风，画楼西畔桂堂东。身无彩凤双飞翼，心有灵犀一点通。隔座送钩春酒暖，分曹射覆蜡灯红。嗟余听鼓应官去，走马兰台类转蓬。"
          },
          {
            name: "无题·相见时难别亦难·李商隐",
            content: "相见时难别亦难，东风无力百花残。春蚕到死丝方尽，蜡炬成灰泪始干。晓镜但愁云鬓改，夜吟应觉月光寒。蓬山此去无多路，青鸟殷勤为探看。"
          },
          {
            name: "无题·重帏深下莫愁堂·李商隐",
            content: "重帏深下莫愁堂，卧后清宵细细长。神女生涯原是梦，小姑居处本无郎。风波不信菱枝弱，月露谁教桂叶香。直道相思了无益，未妨惆怅是清狂。"
          },
          {
            name: "锦瑟·李商隐",
            content: "锦瑟无端五十弦，一弦一柱思华年。庄生晓梦迷蝴蝶，望帝春心托杜鹃。沧海月明珠有泪，蓝田日暖玉生烟。此情可待成追忆，只是当时已惘然。"
          },
          {
            name: "登乐游原·李商隐",
            content: "向晚意不适，驱车登古原。夕阳无限好，只是近黄昏。"
          },
          {
            name: "宿骆氏亭寄怀崔雍崔衮·李商隐",
            content: "竹坞无尘水槛清，相思迢递隔重城。秋阴不散霜飞晚，留得枯荷听雨声。"
          },
          {
            name: "嫦娥·李商隐",
            content: "云母屏风烛影深，长河渐落晓星沉。嫦娥应悔偷灵药，碧海青天夜夜心。"
          },
          {
            name: "瑶池·李商隐",
            content: "瑶池阿母绮窗开，黄竹歌声动地哀。八骏日行三万里，穆王何事不重来。"
          },
          {
            name: "北青萝·李商隐",
            content: "残阳西入崦，茅屋访孤僧。落叶人何在，寒云路几层。独敲初夜磬，闲倚一枝藤。世界微尘里，吾宁爱与憎。"
          },
          {
            name: "贾生·李商隐",
            content: "宣室求贤访逐臣，贾生才调更无伦。可怜夜半虚前席，不问苍生问鬼神。"
          },
          {
            name: "暮秋独游曲江·李商隐",
            content: "荷叶生时春恨生，荷叶枯时秋恨成。深知身在情长在，怅望江头江水声。"
          },
          {
            name: "安定城楼·李商隐",
            content: "迢递高城百尺楼，绿杨枝外尽汀洲。贾生年少虚垂泪，王粲春来更远游。永忆江湖归白发，欲回天地入扁舟。不知腐鼠成滋味，猜意鹓雏竟未休。"
          },
          {
            name: "霜月·李商隐",
            content: "初闻征雁已无蝉，百尺楼高水接天。青女素娥俱耐冷，月中霜里斗婵娟。"
          },
          {
            name: "端居·李商隐",
            content: "远书归梦两悠悠，只有空床敌素秋。阶下青苔与红树，雨中寥落月中愁。"
          },
          {
            name: "春雨·李商隐",
            content: "怅卧新春白袷衣，白门寥落意多违。红楼隔雨相望冷，珠箔飘灯独自归。远路应悲春晼晚，残宵犹得梦依稀。玉珰缄札何由达，万里云罗一雁飞。"
          },
          {
            name: "春日寄怀·李商隐",
            content: "世间荣落重逡巡，我独丘园坐四春。纵使有花兼有月，可堪无酒又无人。青袍似草年年定，白发如丝日日新。欲逐风波千万里，未知何路到龙津。"
          },
          {
            name: "牡丹·李商隐",
            content: "锦帏初卷卫夫人，绣被犹堆越鄂君。垂手乱翻雕玉佩，折腰争舞郁金裙。石家蜡烛何曾剪，荀令香炉可待熏。我是梦中传彩笔，欲书花叶寄朝云。"
          },
          {
            name: "菊花·李商隐",
            content: "暗暗淡淡紫，融融冶冶黄。陶令篱边色，罗含宅里香。几时禁重露，实是怯残阳。愿泛金鹦鹉，升君白玉堂。"
          },
          {
            name: "赠荷花·李商隐",
            content: "世间花叶不相伦，花入金盆叶作尘。惟有绿荷红菡萏，卷舒开合任天真。此花此叶常相映，翠减红衰愁杀人。"
          }
        ]
      },
      {
        author: "李清照",
        article: [
          {
            name: "武陵春·春晚·李清照",
            content: "风住尘香花已尽，日晚倦梳头。物是人非事事休，欲语泪先流。闻说双溪春尚好，也拟泛轻舟。只恐双溪舴艋舟，载不动许多愁。"
          },
          {
            name: "一剪梅·红藕香残玉簟秋·李清照",
            content: "红藕香残玉簟秋。轻解罗裳，独上兰舟。云中谁寄锦书来？雁字回时，月满西楼。花自飘零水自流。一种相思，两处闲愁。此情无计可消除，才下眉头，却上心头。"
          },
          {
            name: "如梦令·昨夜雨疏风骤·李清照",
            content: "昨夜雨疏风骤，浓睡不消残酒。试问卷帘人，却道海棠依旧。知否，知否？应是绿肥红瘦。"
          },
          {
            name: "摊破浣溪沙·病起萧萧两鬓华·李清照",
            content: "病起萧萧两鬓华，卧看残月上窗纱。豆蔻连梢煎熟水，莫分茶。枕上诗书闲处好，门前风景雨来佳。终日向人多酝藉，木犀花。"
          },
          {
            name: "声声慢·寻寻觅觅·李清照",
            content: "寻寻觅觅，冷冷清清，凄凄惨惨戚戚。乍暖还寒时候，最难将息。三杯两盏淡酒，怎敌他、晚来风急！雁过也，正伤心，却是旧时相识。满地黄花堆积，憔悴损，如今有谁堪摘？守着窗儿，独自怎生得黑！梧桐更兼细雨，到黄昏、点点滴滴。这次第，怎一个愁字了得！"
          },
          {
            name: "鹧鸪天·桂花·李清照",
            content: "暗淡轻黄体性柔，情疏迹远只香留。何须浅碧深红色，自是花中第一流。梅定妒，菊应羞，画阑开处冠中秋。骚人可煞无情思，何事当年不见收。"
          },
          {
            name: "醉花阴·薄雾浓云愁永昼·李清照",
            content: "薄雾浓云愁永昼，瑞脑销金兽。佳节又重阳，玉枕纱厨，半夜凉初透。(厨 通：橱；销金兽 一作：消金兽)东篱把酒黄昏后，有暗香盈袖。莫道不销魂，帘卷西风，人比黄花瘦。"
          },
          {
            name: "夏日绝句·李清照",
            content: "生当作人杰，死亦为鬼雄。至今思项羽，不肯过江东。"
          },
          {
            name: "渔家傲·天接云涛连晓雾·李清照",
            content: "天接云涛连晓雾，星河欲转千帆舞。仿佛梦魂归帝所。闻天语，殷勤问我归何处。我报路长嗟日暮，学诗谩有惊人句。九万里风鹏正举。风休住，蓬舟吹取三山去！"
          },
          {
            name: "南歌子·天上星河转·李清照",
            content: "天上星河转，人间帘幕垂。凉生枕簟泪痕滋。起解罗衣聊问、夜何其。翠贴莲蓬小，金销藕叶稀。旧时天气旧时衣。只有情怀不似、旧家时。"
          },
          {
            name: "蝶恋花·暖雨晴风初破冻·李清照",
            content: "暖雨晴风初破冻，柳眼梅腮，已觉春心动。酒意诗情谁与共？泪融残粉花钿重。乍试夹衫金缕缝，山枕斜欹，枕损钗头凤。独抱浓愁无好梦，夜阑犹剪灯花弄。"
          },
          {
            name: "蝶恋花·晚止昌乐馆寄姊妹·李清照",
            content: "泪湿罗衣脂粉满，四叠阳关，唱到千千遍。人道山长山又断，萧萧微雨闻孤馆。惜别伤离方寸乱，忘了临行，酒盏深和浅。好把音书凭过雁，东莱不似蓬莱远。"
          },
          {
            name: "临江仙·梅·李清照",
            content: "庭院深深深几许，云窗雾阁春迟。为谁憔悴损芳姿。夜来清梦好，应是发南枝。玉瘦檀轻无限恨，南楼羌管休吹。浓香吹尽有谁知。暖风迟日也，别到杏花肥。"
          },
          {
            name: "浣溪沙·闺情·李清照",
            content: "绣面芙蓉一笑开，斜飞宝鸭衬香腮。眼波才动被人猜。一面风情深有韵，半笺娇恨寄幽怀。月移花影约重来。"
          }
        ]
      },
      {
        author: "刘禹锡",
        article: [
          {
            name: "陋室铭·刘禹锡",
            content: "山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨。苔痕上阶绿，草色入帘青。谈笑有鸿儒，往来无白丁。可以调素琴，阅金经。无丝竹之乱耳，无案牍之劳形。南阳诸葛庐，西蜀子云亭。孔子云：何陋之有？"
          },
          {
            name: "酬乐天扬州初逢席上见赠·刘禹锡",
            content: "巴山楚水凄凉地，二十三年弃置身。怀旧空吟闻笛赋，到乡翻似烂柯人。沉舟侧畔千帆过，病树前头万木春。今日听君歌一曲，暂凭杯酒长精神。"
          },
          {
            name: "竹枝词·其一·刘禹锡",
            content: "杨柳青青江水平，闻郎江上唱歌声。东边日出西边雨，道是无晴却有晴。"
          },
          {
            name: "竹枝词·其二·刘禹锡",
            content: "楚水巴山江雨多，巴人能唱本乡歌。今朝北客思归去，回入纥那披绿罗。"
          },
          {
            name: "竹枝词·山桃红花满上头·刘禹锡",
            content: "山桃红花满上头，蜀江春水拍山流。花红易衰似郎意，水流无限似侬愁。"
          },
          {
            name: "乌衣巷·刘禹锡",
            content: "朱雀桥边野草花，乌衣巷口夕阳斜。旧时王谢堂前燕，飞入寻常百姓家。"
          },
          {
            name: "酬乐天咏老见示·刘禹锡",
            content: "人谁不顾老，老去有谁怜。身瘦带频减，发稀冠自偏。废书缘惜眼，多灸为随年。经事还谙事，阅人如阅川。细思皆幸矣，下此便翛然。莫道桑榆晚，为霞尚满天。"
          },
          {
            name: "杨柳枝·刘禹锡",
            content: "清江一曲柳千条，二十年前旧板桥。曾与美人桥上别，恨无消息到今朝。"
          },
          {
            name: "西塞山怀古·刘禹锡",
            content: "王濬楼船下益州，金陵王气黯然收。千寻铁锁沉江底，一片降幡出石头。人世几回伤往事，山形依旧枕寒流。今逢四海为家日，故垒萧萧芦荻秋。"
          },
          {
            name: "蜀先主庙·刘禹锡",
            content: "天地英雄气，千秋尚凛然。势分三足鼎，业复五铢钱。得相能开国，生儿不象贤。凄凉蜀故妓，来舞魏宫前。"
          },
          {
            name: "望洞庭·刘禹锡",
            content: "湖光秋月两相和，潭面无风镜未磨。遥望洞庭山水翠，白银盘里一青螺。"
          },
          {
            name: "潇湘神·斑竹枝·刘禹锡",
            content: "斑竹枝，斑竹枝，泪痕点点寄相思。楚客欲听瑶瑟怨，潇湘深夜月明时。"
          }
        ]
      },
      {
        author: "李煜",
        article: [
          {
            name: "虞美人·春花秋月何时了·李煜",
            content: "春花秋月何时了？往事知多少。小楼昨夜又东风，故国不堪回首月明中。雕栏玉砌应犹在，只是朱颜改。问君能有几多愁？恰似一江春水向东流。"
          },
          {
            name: "乌夜啼·昨夜风兼雨·李煜",
            content: "昨夜风兼雨，帘帏飒飒秋声。烛残漏断频欹枕，起坐不能平。　世事漫随流水，算来一梦浮生。醉乡路稳宜频到，此外不堪行。"
          },
          {
            name: "相见欢·无言独上西楼·李煜",
            content: "无言独上西楼，月如钩。寂寞梧桐深院锁清秋。剪不断，理还乱，是离愁。别是一般滋味在心头。"
          },
          {
            name: "相见欢·林花谢了春红·李煜",
            content: "林花谢了春红，太匆匆。无奈朝来寒雨晚来风。胭脂泪，相留醉，几时重。自是人生长恨水长东。"
          },
          {
            name: "浪淘沙令·帘外雨潺潺·李煜",
            content: "帘外雨潺潺，春意阑珊。罗衾不耐五更寒。梦里不知身是客，一晌贪欢。独自莫凭栏，无限江山。别时容易见时难。流水落花春去也，天上人间。"
          },
          {
            name: "渔父·浪花有意千里雪·李煜",
            content: "浪花有意千里雪，桃花无言一队春。一壶酒，一竿身，快活如侬有几人。"
          },
          {
            name: "渔父·一棹春风一叶舟·李煜",
            content: "一棹春风一叶舟，一纶茧缕一轻钩。花满渚，酒满瓯，万顷波中得自由。"
          },
          {
            name: "长相思·一重山·李煜",
            content: "一重山，两重山。山远天高烟水寒，相思枫叶丹。菊花开，菊花残。塞雁高飞人未还，一帘风月闲。"
          },
          {
            name: "破阵子·四十年来家国·李煜",
            content: "四十年来家国，三千里地山河。凤阁龙楼连霄汉，玉树琼枝作烟萝，几曾识干戈？一旦归为臣虏，沈腰潘鬓消磨。最是仓皇辞庙日，教坊犹奏别离歌，垂泪对宫娥。"
          },
          {
            name: "清平乐·别来春半·李煜",
            content: "别来春半，触目柔肠断。砌下落梅如雪乱，拂了一身还满。雁来音信无凭，路遥归梦难成。离恨恰如春草，更行更远还生。"
          },
          {
            name: "望江南·多少恨·李煜",
            content: "多少恨，昨夜梦魂中。还似旧时游上苑，车如流水马如龙。花月正春风。"
          },
          {
            name: "望江南·闲梦远·李煜",
            content: "闲梦远，南国正芳春。船上管弦江面绿，满城飞絮辊轻尘。忙杀看花人！闲梦远，南国正清秋。千里江山寒色暮，芦花深处泊孤舟，笛在月明楼。"
          },
          {
            name: "子夜歌·人生愁恨何能免·李煜",
            content: "人生愁恨何能免，销魂独我情何限！故国梦重归，觉来双泪垂。高楼谁与上？长记秋晴望。往事已成空，还如一梦中。"
          },
          {
            name: "菩萨蛮·花明月暗笼轻雾·李煜",
            content: "花明月暗笼轻雾，今宵好向郎边去。刬袜步香阶，手提金缕鞋。画堂南畔见，一向偎人颤。奴为出来难，教君恣意怜。"
          },
          {
            name: "捣练子令·深院静·李煜",
            content: "深院静，小庭空，断续寒砧断续风。无奈夜长人不寐，数声和月到帘栊。"
          },
          {
            name: "玉楼春·晚妆初了明肌雪·李煜",
            content: "晚妆初了明肌雪，春殿嫔娥鱼贯列。凤箫吹断水云间，重按霓裳歌遍彻。临春谁更飘香屑？醉拍阑干情味切。归时休放烛光红，待踏马蹄清夜月。"
          }
        ]
      },
      {
        author: "孟浩然",
        article: [
          {
            name: "望洞庭湖赠张丞相·孟浩然",
            content: "八月湖水平，涵虚混太清。气蒸云梦泽，波撼岳阳城。欲济无舟楫，端居耻圣明。坐观垂钓者，徒有羡鱼情。"
          },
          {
            name: "夏日南亭怀辛大·孟浩然",
            content: "山光忽西落，池月渐东上。散发乘夕凉，开轩卧闲敞。荷风送香气，竹露滴清响。欲取鸣琴弹，恨无知音赏。感此怀故人，中宵劳梦想。"
          },
          {
            name: "过故人庄·孟浩然",
            content: "故人具鸡黍，邀我至田家。绿树村边合，青山郭外斜。开轩面场圃，把酒话桑麻。待到重阳日，还来就菊花。"
          },
          {
            name: "与诸子登岘山·孟浩然",
            content: "人事有代谢，往来成古今。江山留胜迹，我辈复登临。水落鱼梁浅，天寒梦泽深。羊公碑尚在，读罢泪沾襟。"
          },
          {
            name: "宿建德江·孟浩然",
            content: "移舟泊烟渚，日暮客愁新。野旷天低树，江清月近人。"
          },
          {
            name: "题大禹寺义公禅房·孟浩然",
            content: "义公习禅寂，结宇依空林。户外一峰秀，阶前众壑深。夕阳连雨足，空翠落庭阴。看取莲花净，应知不染心。"
          },
          {
            name: "宿业师山房期丁大不至·孟浩然",
            content: "夕阳度西岭，群壑倏已暝。松月生夜凉，风泉满清听。樵人归欲尽，烟鸟栖初定。之子期宿来，孤琴候萝径。"
          },
          {
            name: "早寒江上有怀·孟浩然",
            content: "木落雁南度，北风江上寒。我家襄水曲，遥隔楚云端。乡泪客中尽，孤帆天际看。迷津欲有问，平海夕漫漫。"
          },
          {
            name: "自洛之越·孟浩然",
            content: "遑遑三十载，书剑两无成。山水寻吴越，风尘厌洛京。扁舟泛湖海，长揖谢公卿。且乐杯中物，谁论世上名。"
          },
          {
            name: "送朱大入秦·孟浩然",
            content: "游人五陵去，宝剑值千金。分手脱相赠，平生一片心。"
          },
          {
            name: "初秋·孟浩然",
            content: "不觉初秋夜渐长，清风习习重凄凉。炎炎暑退茅斋静，阶下丛莎有露光。"
          },
          {
            name: "春中喜王九相寻·孟浩然",
            content: "二月湖水清，家家春鸟鸣。林花扫更落，径草踏还生。酒伴来相命，开尊共解酲。当杯已入手，歌妓莫停声。"
          },
          {
            name: "送杜十四之江南·孟浩然",
            content: "荆吴相接水为乡，君去春江正淼茫。日暮征帆何处泊，天涯一望断人肠。"
          }
        ]
      },
      {
        author: "纳兰性德",
        article: [
          {
            name: "木兰花·拟古决绝词柬友·纳兰性德",
            content: "人生若只如初见，何事秋风悲画扇。等闲变却故人心，却道故人心易变。骊山语罢清宵半，泪雨霖铃终不怨。何如薄幸锦衣郎，比翼连枝当日愿。"
          },
          {
            name: "蝶恋花·出塞·纳兰性德",
            content: "今古河山无定据。画角声中，牧马频来去。满目荒凉谁可语？西风吹老丹枫树。从前幽怨应无数。铁马金戈，青冢黄昏路。一往情深深几许？深山夕照深秋雨。"
          },
          {
            name: "蝶恋花·辛苦最怜天上月·纳兰性德",
            content: "辛苦最怜天上月，一昔如环，昔昔都成玦。若似月轮终皎洁，不辞冰雪为卿热。无那尘缘容易绝，燕子依然，软踏帘钩说。唱罢秋坟愁未歇，春丛认取双栖蝶。"
          },
          {
            name: "采桑子·谁翻乐府凄凉曲·纳兰性德",
            content: "谁翻乐府凄凉曲？风也萧萧，雨也萧萧，瘦尽灯花又一宵。不知何事萦怀抱，醒也无聊，醉也无聊，梦也何曾到谢桥。"
          },
          {
            name: "采桑子·而今才道当时错·纳兰性德",
            content: "而今才道当时错，心绪凄迷。红泪偷垂，满眼春风百事非。情知此后来无计，强说欢期。一别如斯，落尽梨花月又西。"
          },
          {
            name: "浣溪沙·谁念西风独自凉·纳兰性德",
            content: "谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳。被酒莫惊春睡重，赌书消得泼茶香，当时只道是寻常。"
          },
          {
            name: "浣溪沙·残雪凝辉冷画屏·纳兰性德",
            content: "残雪凝辉冷画屏，落梅横笛已三更，更无人处月胧明。我是人间惆怅客，知君何事泪纵横，断肠声里忆平生。"
          },
          {
            name: "长相思·山一程·纳兰性德",
            content: "山一程，水一程，身向榆关那畔行，夜深千帐灯。风一更，雪一更，聒碎乡心梦不成，故园无此声。"
          },
          {
            name: "山花子·风絮飘残已化萍·纳兰性德",
            content: "风絮飘残已化萍，泥莲刚倩藕丝萦。珍重别拈香一瓣，记前生。人到情多情转薄，而今真个不多情。又到断肠回首处，泪偷零。"
          },
          {
            name: "画堂春·一生一代一双人·纳兰性德",
            content: "一生一代一双人，争教两处销魂。相思相望不相亲，天为谁春？浆向蓝桥易乞，药成碧海难奔。若容相访饮牛津，相对忘贫。"
          },
          {
            name: "虞美人·银床淅沥青梧老·纳兰性德",
            content: "银床淅沥青梧老，屧粉秋蛩扫。采香行处蹙连钱，拾得翠翘何恨不能言。回廊一寸相思地，落月成孤倚。背灯和月就花阴，已是十年踪迹十年心。"
          },
          {
            name: "赤枣子·风淅淅·纳兰性德",
            content: "风淅淅，雨纤纤。难怪春愁细细添。记不分明疑是梦，梦来还隔一重帘。"
          },
          {
            name: "临江仙·寒柳·纳兰性德",
            content: "飞絮飞花何处是，层冰积雪摧残，疏疏一树五更寒。爱他明月好，憔悴也相关。最是繁丝摇落后，转教人忆春山。湔裙梦断续应难。西风多少恨，吹不散眉弯。"
          },
          {
            name: "琵琶仙·中秋·纳兰性德",
            content: "碧海年年，试问取、冰轮为谁圆缺？吹到一片秋香，清辉了如雪。愁中看、好天良夜，知道尽成悲咽。只影而今，那堪重对，旧时明月。花径里、戏捉迷藏，曾惹下萧萧井梧叶。记否轻纨小扇，又几番凉热。只落得，填膺百感，总茫茫、不关离别。一任紫玉无情，夜寒吹裂。"
          },
          {
            name: "鬓云松令·枕函香·纳兰性德",
            content: "枕函香，花径漏。依约相逢，絮语黄昏后。时节薄寒人病酒，刬地梨花，彻夜东风瘦。掩银屏，垂翠袖。何处吹箫，脉脉情微逗。肠断月明红豆蔻，月似当时，人似当时否？"
          },
          {
            name: "于中好·握手西风泪不干·纳兰性德",
            content: "握手西风泪不干，年来多在别离间。遥知独听灯前雨，转忆同看雪后山。凭寄语，劝加餐。桂花时节约重还。分明小像沉香缕，一片伤心欲画难。"
          },
          {
            name: "菩萨蛮·萧萧几叶风兼雨·纳兰性德",
            content: "萧萧几叶风兼雨，离人偏识长更苦。欹枕数秋天，蟾蜍下早弦。夜寒惊被薄，泪与灯花落。无处不伤心，轻尘在玉琴。"
          },
          {
            name: "山花子·林下荒苔道韫家·纳兰性德",
            content: "林下荒苔道韫家，生怜玉骨委尘沙。愁向风前无处说，数归鸦。半世浮萍随逝水，一宵冷雨葬名花。魂是柳绵吹欲碎，绕天涯。"
          }
        ]
      },
      {
        author: "柳宗元",
        article: [
          {
            name: "江雪·柳宗元",
            content: "千山鸟飞绝，万径人踪灭。孤舟蓑笠翁，独钓寒江雪。"
          },
          {
            name: "登柳州城楼寄漳汀封连四州·柳宗元",
            content: "城上高楼接大荒，海天愁思正茫茫。惊风乱飐芙蓉水，密雨斜侵薜荔墙。岭树重遮千里目，江流曲似九回肠。共来百越文身地，犹自音书滞一乡。"
          },
          {
            name: "渔翁·柳宗元",
            content: "渔翁夜傍西岩宿，晓汲清湘燃楚竹。烟销日出不见人，欸乃一声山水绿。回看天际下中流，岩上无心"
          },
          {
            name: "与浩初上人同看山寄京华亲故·柳宗元",
            content: "海畔尖山似剑铓，秋来处处割愁肠。若为化得身千亿，散上峰头望故乡。"
          },
          {
            name: "酬曹侍御过象县见寄·柳宗元",
            content: "破额山前碧玉流，骚人遥驻木兰舟。春风无限潇湘意，欲采蘋花不自由。"
          },
          {
            name: "酬王二十舍人雪中见寄·柳宗元",
            content: "三日柴门拥不开，阶平庭满白皑皑。今朝蹈作琼瑶迹，为有诗从凤沼来。"
          },
          {
            name: "重别梦得·柳宗元",
            content: "二十年来万事同，今朝岐路忽西东。皇恩若许归田去，晚岁当为邻舍翁。"
          },
          {
            name: "别舍弟宗一·柳宗元",
            content: "零落残魂倍黯然，双垂别泪越江边。一身去国六千里，万死投荒十二年。桂岭瘴来云似墨，洞庭春尽水如天。欲知此后相思梦，长在荆门郢树烟。"
          },
          {
            name: "柳州二月榕叶落尽偶题·柳宗元",
            content: "宦情羁思共凄凄，春半如秋意转迷。山城过雨百花尽，榕叶满庭莺乱啼。"
          },
          {
            name: "早梅·柳宗元",
            content: "早梅发高树，迥映楚天碧。朔吹飘夜香，繁霜滋晓白。欲为万里赠，杳杳山水隔。寒英坐销落，何用慰远客。"
          },
          {
            name: "衡阳与梦得分路赠别·柳宗元",
            content: "十年憔悴到秦京，谁料翻为岭外行。伏波故道风烟在，翁仲遗墟草树平。直以慵疏招物议，休将文字占时名。今朝不用临河别，垂泪千行便濯缨。"
          },
          {
            name: "夏昼偶作·柳宗元",
            content: "南州溽暑醉如酒，隐几熟眠开北牖。日午独觉无馀声，山童隔竹敲茶臼。"
          },
          {
            name: "晨诣超师院读禅经·柳宗元",
            content: "汲井漱寒齿，清心拂尘服。闲持贝叶书，步出东斋读。真源了无取，妄迹世所逐。遗言冀可冥，缮性何由熟。道人庭宇静，苔色连深竹。日出雾露馀，青松如膏沐。澹然离言说，悟悦心自足。"
          },
          {
            name: "秋晓行南谷经荒村·柳宗元",
            content: "杪秋霜露重，晨起行幽谷。黄叶覆溪桥，荒村唯古木。寒花疏寂历，幽泉微断续。机心久已忘，何事"
          }
        ]
      },
      {
        author: "陶渊明",
        article: [
          {
            name: "桃花源记·陶渊明",
            content: "晋太元中，武陵人捕鱼为业。缘溪行，忘路之远近。忽逢桃花林，夹岸数百步，中无杂树，芳草鲜美，落英缤纷。渔人甚异之，复前行，欲林尽水源，便得一山，山有小口，仿佛若有光。便舍船，从口入。初极狭，才通人。复行数十步，豁然开朗。土地平旷，屋舍俨然，有良田、美池、桑竹之属。阡陌交通，鸡犬相闻。其中往来种作，男女衣着，悉如外人。黄发垂髫，并怡然自乐。            见渔人，乃大惊，问所从来。具答之。便要还家，设酒杀鸡作食。村中闻有此人，咸来问讯。自云先世避秦时乱，率妻子邑人来此绝境，不复出焉，遂与外人间隔。问今是何世，乃不知有汉，无论魏晋。此人一一为具言所闻，皆叹惋。余人各复延至其家，皆出酒食。停数日，辞去。此中人语云：“不足为外人道也。”既出，得其船，便扶向路，处处志之。及郡下，诣太守，说如此。太守即遣人随其往，寻向所志，遂迷，不复得路。南阳刘子骥，高尚士也，闻之，欣然规往。未果，寻病终。后遂无问津者。"
          },
          {
            name: "归去来兮辞·陶渊明",
            content: "余家贫，耕植不足以自给。幼稚盈室，瓶无储粟，生生所资，未见其术。亲故多劝余为长吏，脱然有怀，求之靡途。会有四方之事，诸侯以惠爱为德，家叔以余贫苦，遂见用于小邑。于时风波未静，心惮远役，彭泽去家百里，公田之利，足以为酒。故便求之。及少日，眷然有归欤之情。何则？质性自然，非矫厉所得。饥冻虽切，违己交病。尝从人事，皆口腹自役。于是怅然慷慨，深愧平生之志。犹望一稔，当敛裳宵逝。寻程氏妹丧于武昌，情在骏奔，自免去职。仲秋至冬，在官八十余日。因事顺心，命篇曰《归去来兮》。乙巳岁十一月也。归去来兮，田园将芜胡不归？既自以心为形役，奚惆怅而独悲？悟已往之不谏，知来者之可追。实迷途其未远，觉今是而昨非。舟遥遥以轻飏，风飘飘而吹衣。问征夫以前路，恨晨光之熹微。乃瞻衡宇，载欣载奔。僮仆欢迎，稚子候门。三径就荒，松菊犹存。携幼入室，有酒盈樽。引壶觞以自酌，眄庭柯以怡颜。倚南窗以寄傲，审容膝之易安。园日涉以成趣，门虽设而常关。策扶老以流憩，时矫首而遐观。云无心以出岫，鸟倦飞而知还。景翳翳以将入，抚孤松而盘桓。                归去来兮，请息交以绝游。世与我而相违，复驾言兮焉求？悦亲戚之情话，乐琴书以消忧。农人告余以春及，将有事于西畴。或命巾车，或棹孤舟。既窈窕以寻壑，亦崎岖而经丘。木欣欣以向荣，泉涓涓而始流。善万物之得时，感吾生之行休。已矣乎！寓形宇内复几时？曷不委心任去留？胡为乎遑遑欲何之？富贵非吾愿，帝乡不可期。怀良辰以孤往，或植杖而耘耔。登东皋以舒啸，临清流而赋诗。聊乘化以归尽，乐夫天命复奚疑！"
          },
          {
            name: "饮酒·其五·陶渊明",
            content: "结庐在人境，而无车马喧。问君何能尔？心远地自偏。采菊东篱下，悠然见南山。山气日夕佳，飞鸟相与还。此中有真意，欲辨已忘言。"
          },
          {
            name: "归园田居·其一·陶渊明",
            content: "少无适俗韵，性本爱丘山。误落尘网中，一去三十年。羁鸟恋旧林，池鱼思故渊。开荒南野际，守拙归园田。方宅十余亩，草屋八九间。榆柳荫后檐，桃李罗堂前。暧暧远人村，依依墟里烟。狗吠深巷中，鸡鸣桑树颠。户庭无尘杂，虚室有余闲。久在樊笼里，复得返自然。"
          },
          {
            name: "归园田居·其三·陶渊明",
            content: "种豆南山下，草盛豆苗稀。晨兴理荒秽，带月荷锄归。道狭草木长，夕露沾我衣。衣沾不足惜，但使愿无违。"
          },
          {
            name: "杂诗十二首·其一·陶渊明",
            content: "人生无根蒂，飘如陌上尘。分散逐风转，此已非常身。落地为兄弟，何必骨肉亲！得欢当作乐，斗酒聚比邻。盛年不重来，一日难再晨。及时当勉励，岁月不待人。"
          },
          {
            name: "五柳先生传·陶渊明",
            content: "先生不知何许人也，亦不详其姓字，宅边有五柳树，因以为号焉。闲静少言，不慕荣利。好读书，不求甚解；每有会意，便欣然忘食。性嗜酒，家贫不能常得。亲旧知其如此，或置酒而招之；造饮辄尽，期在必醉。既醉而退，曾不吝情去留。环堵萧然，不蔽风日；短褐穿结，箪瓢屡空，晏如也。常著文章自娱，颇示己志。忘怀得失，以此自终。赞曰：黔娄之妻有言：“不戚戚于贫贱，不汲汲于富贵。”其言兹若人之俦乎？衔觞赋诗，以乐其志，无怀氏之民欤？葛天氏之民欤？"
          },
          {
            name: "咏荆轲·陶渊明",
            content: "燕丹善养士，志在报强嬴。招集百夫良，岁暮得荆卿。君子死知己，提剑出燕京；素骥鸣广陌，慷慨送我行。雄发指危冠，猛气冲长缨。饮饯易水上，四座列群英。渐离击悲筑，宋意唱高声。萧萧哀风逝，淡淡寒波生。商音更流涕，羽奏壮士惊。心知去不归，且有后世名。登车何时顾，飞盖入秦庭。凌厉越万里，逶迤过千城。图穷事自至，豪主正怔营。惜哉剑术疏，奇功遂不成。其人虽已没，千载有馀情。"
          }
        ]
      },
      {
        author: "范仲淹 朱熹 韩愈 岑参",
        article: [
          {
            name: "岳阳楼记·范仲淹",
            content: "庆历四年春，滕子京谪守巴陵郡。越明年，政通人和，百废具兴，乃重修岳阳楼，增其旧制，刻唐贤今人诗赋于其上，属予作文以记之。予观夫巴陵胜状，在洞庭一湖。衔远山，吞长江，浩浩汤汤，横无际涯，朝晖夕阴，气象万千，此则岳阳楼之大观也，前人之述备矣。然则北通巫峡，南极潇湘，迁客骚人，多会于此，览物之情，得无异乎？若夫淫雨霏霏，连月不开，阴风怒号，浊浪排空，日星隐曜，山岳潜形，商旅不行，樯倾楫摧，薄暮冥冥，虎啸猿啼。登斯楼也，则有去国怀乡，忧谗畏讥，满目萧然，感极而悲者矣。(隐曜 一作：隐耀；淫雨 通：霪雨)至若春和景明，波澜不惊，上下天光，一碧万顷，沙鸥翔集，锦鳞游泳，岸芷汀兰，郁郁青青。而或长烟一空，皓月千里，浮光跃金，静影沉璧，渔歌互答，此乐何极！登斯楼也，则有心旷神怡，宠辱偕忘，把酒临风，其喜洋洋者矣。嗟夫！予尝求古仁人之心，或异二者之为，何哉？不以物喜，不以己悲，居庙堂之高则忧其民，处江湖之远则忧其君。是进亦忧，退亦忧。然则何时而乐耶？其必曰“先天下之忧而忧，后天下之乐而乐”乎！噫！微斯人，吾谁与归？时六年九月十五日。"
          },
          {
            name: "渔家傲·秋思·范仲淹",
            content: "塞下秋来风景异，衡阳雁去无留意。四面边声连角起，千嶂里，长烟落日孤城闭。浊酒一杯家万里，燕然未勒归无计。羌管悠悠霜满地，人不寐，将军白发征夫泪。"
          },
          {
            name: "苏幕遮·怀旧·范仲淹",
            content: "碧云天，黄叶地，秋色连波，波上寒烟翠。山映斜阳天接水，芳草无情，更在斜阳外。黯乡魂，追旅思，夜夜除非，好梦留人睡。明月楼高休独倚，酒入愁肠，化作相思泪。"
          },
          {
            name: "马说·韩愈",
            content: "世有伯乐，然后有千里马。千里马常有，而伯乐不常有。故虽有名马，祗辱于奴隶人之手，骈死于槽枥之间，不以千里称也。马之千里者，一食或尽粟一石。食马者不知其能千里而食也。是马也，虽有千里之能，食不饱，力不足，才美不外见，且欲与常马等不可得，安求其能千里也？策之不以其道，食之不能尽其材，鸣之而不能通其意，执策而临之，曰：“天下无马！”呜呼！其真无马邪？其真不知马也！"
          },
          {
            name: "师说·韩愈",
            content: "古之学者必有师。师者，所以传道受业解惑也。人非生而知之者，孰能无惑？惑而不从师，其为惑也，终不解矣。生乎吾前，其闻道也固先乎吾，吾从而师之；生乎吾后，其闻道也亦先乎吾，吾从而师之。吾师道也，夫庸知其年之先后生于吾乎？是故无贵无贱，无长无少，道之所存，师之所存也。嗟乎！师道之不传也久矣！欲人之无惑也难矣！古之圣人，其出人也远矣，犹且从师而问焉；今之众人，其下圣人也亦远矣，而耻学于师。是故圣益圣，愚益愚。圣人之所以为圣，愚人之所以为愚，其皆出于此乎？爱其子，择师而教之；于其身也，则耻师焉，惑矣。彼童子之师，授之书而习其句读者，非吾所谓传其道解其惑者也。句读之不知，惑之不解，或师焉，或不焉，小学而大遗，吾未见其明也。巫医乐师百工之人，不耻相师。士大夫之族，曰师曰弟子云者，则群聚而笑之。问之，则曰：“彼与彼年相若也，道相似也，位卑则足羞，官盛则近谀。”呜呼！师道之不复，可知矣。巫医乐师百工之人，君子不齿，今其智乃反不能及，其可怪也欤！圣人无常师。孔子师郯子、苌弘、师襄、老聃。郯子之徒，其贤不及孔子。孔子曰：三人行，则必有我师。是故弟子不必不如师，师不必贤于弟子，闻道有先后，术业有专攻，如是而已。李氏子蟠，年十七，好古文，六艺经传皆通习之，不拘于时，学于余。余嘉其能行古道，作《师说》以贻之。"
          },
          {
            name: "早春呈水部张十八员外·韩愈",
            content: "天街小雨润如酥，草色遥看近却无。最是一年春好处，绝胜烟柳满皇都。"
          },
          {
            name: "春雪·韩愈",
            content: "新年都未有芳华，二月初惊见草芽。白雪却嫌春色晚，故穿庭树作飞花。"
          },
          {
            name: "左迁至蓝关示侄孙湘·韩愈",
            content: "一封朝奏九重天，夕贬潮州路八千。欲为圣明除弊事，肯将衰朽惜残年！云横秦岭家何在？雪拥蓝关马不前。知汝远来应有意，好收吾骨瘴江边。"
          },
          {
            name: "调张籍·韩愈",
            content: "李杜文章在，光焰万丈长。不知群儿愚，那用故谤伤。蚍蜉撼大树，可笑不自量！伊我生其后，举颈遥相望。夜梦多见之，昼思反微茫。徒观斧凿痕，不瞩治水航。想当施手时，巨刃磨天扬。垠崖划崩豁，乾坤摆雷硠。唯此两夫子，家居率荒凉。帝欲长吟哦，故遣起且僵。翦翎送笼中，使看百鸟翔。平生千万篇，金薤垂琳琅。仙官敕六丁，雷电下取将。流落人间者，太山一毫芒。我愿生两翅，捕逐出八荒。精诚忽交通，百怪入我肠。刺手拔鲸牙，举瓢酌天浆。腾身跨汗漫，不著织女襄。顾语地上友，经营无太忙。乞君飞霞佩，与我高颉颃。"
          },
          {
            name: "春日·朱熹",
            content: "胜日寻芳泗水滨，无边光景一时新。等闲识得东风面，万紫千红总是春。"
          },
          {
            name: "观书有感·其一·朱熹",
            content: "半亩方塘一鉴开，天光云影共徘徊。问渠那得清如许？为有源头活水来。"
          },
          {
            name: "偶成·朱熹",
            content: "少年易老学难成，一寸光阴不可轻。未觉池塘春草梦，阶前梧叶已秋声。"
          },
          {
            name: "水调歌头·隐括杜牧之齐山诗·朱熹",
            content: "江水浸云影，鸿雁欲南飞。携壶结客何处？空翠渺烟霏。尘世难逢一笑，况有紫萸黄菊，堪插满头归。风景今朝是，身世昔人非。酬佳节，须酩酊，莫相违。人生如寄，何事辛苦怨斜晖。无尽今来古往，多少春花秋月，那更有危机。与问牛山客，何必独沾衣。"
          },
          {
            name: "奉酬九日东峰道人溥公见赠之作·朱熹",
            content: "几年回首梦云关，此日重来两鬓斑。点检梁间新岁月，招呼台上旧溪山。三生漫说终无据，万法由来本自闲。一笑支郎又相恼，新诗不落语言间。"
          },
          {
            name: "白雪歌送武判官归京·岑参",
            content: "北风卷地白草折，胡天八月即飞雪。忽如一夜春风来，千树万树梨花开。散入珠帘湿罗幕，狐裘不暖锦衾薄。将军角弓不得控，都护铁衣冷难着。瀚海阑干百丈冰，愁云惨淡万里凝。中军置酒饮归客，胡琴琵琶与羌笛。纷纷暮雪下辕门，风掣红旗冻不翻。轮台东门送君去，去时雪满天山路。山回路转不见君，雪上空留马行处。"
          },
          {
            name: "凉州馆中与诸判官夜集·岑参",
            content: "弯弯月出挂城头，城头月出照凉州。凉州七里十万家，胡人半解弹琵琶。琵琶一曲肠堪断，风萧萧兮夜漫漫。河西幕中多故人，故人别来三五春。花门楼前见秋草，岂能贫贱相看老。一生大笑能几回，斗酒相逢须醉倒。"
          },
          {
            name: "逢入京使·岑参",
            content: "故园东望路漫漫，双袖龙钟泪不干。马上相逢无纸笔，凭君传语报平安。"
          },
          {
            name: "奉和中书舍人贾至早朝大明宫·岑参",
            content: "鸡鸣紫陌曙光寒，莺啭皇州春色阑。金阙晓钟开万户，玉阶仙仗拥千官。花迎剑佩星初落，柳拂旌旗露未干。独有凤凰池上客，阳春一曲和皆难。"
          },
          {
            name: "蜀葵花歌·岑参",
            content: "昨日一花开，今日一花开。今日花正好，昨日花已老。始知人老不如花，可惜落花君莫扫。人生不得长少年，莫惜床头沽酒钱。请君有钱向酒家，君不见，蜀葵花。"
          }
        ]
      },
      {
        author: "名诗词集",
        article: [
          {
            name: "春江花月夜·张若虚",
            content: "春江潮水连海平，海上明月共潮生。滟滟随波千万里，何处春江无月明！江流宛转绕芳甸，月照花林皆似霰。空里流霜不觉飞，汀上白沙看不见。江天一色无纤尘，皎皎空中孤月轮。江畔何人初见月？江月何年初照人？人生代代无穷已，江月年年望相似。不知江月待何人，但见长江送流水。白云一片去悠悠，青枫浦上不胜愁。谁家今夜扁舟子？何处相思明月楼？可怜楼上月裴回，应照离人妆镜台。玉户帘中卷不去，捣衣砧上拂还来。此时相望不相闻，愿逐月华流照君。鸿雁长飞光不度，鱼龙潜跃水成文。昨夜闲潭梦落花，可怜春半不还家。江水流春去欲尽，江潭落月复西斜。斜月沉沉藏海雾，碣石潇湘无限路。不知乘月几人归，落月摇情满江树。"
          },
          {
            name: "唐多令·芦叶满汀洲·刘过",
            content: "安远楼小集，侑觞歌板之姬黄其姓者，乞词于龙洲道人，为赋此《唐多令》。同柳阜之、刘去非、石民瞻、周嘉仲、陈孟参、孟容。时八月五日也。芦叶满汀洲，寒沙带浅流。二十年重过南楼。柳下系船犹未稳，能几日，又中秋。黄鹤断矶头，故人今在否？旧江山浑是新愁。欲买桂花同载酒，终不似，少年游。"
          },
          {
            name: "代悲白头翁·刘希夷",
            content: "洛阳城东桃李花，飞来飞去落谁家？洛阳女儿惜颜色，坐见落花长叹息。今年花落颜色改，明年花开复谁在？已见松柏摧为薪，更闻桑田变成海。古人无复洛城东，今人还对落花风。年年岁岁花相似，岁岁年年人不同。寄言全盛红颜子，应怜半死白头翁。此翁白头真可怜，伊昔红颜美少年。公子王孙芳树下，清歌妙舞落花前。光禄池台文锦绣，将军楼阁画神仙。一朝卧病无相识，三春行乐在谁边？宛转蛾眉能几时？须臾鹤发乱如丝。但看古来歌舞地，惟有黄昏鸟雀悲。"
          },
          {
            name: "满江红·写怀·岳飞",
            content: "怒发冲冠，凭栏处、潇潇雨歇。抬望眼，仰天长啸，壮怀激烈。三十功名尘与土，八千里路云和月。莫等闲，白了少年头，空悲切！靖康耻，犹未雪。臣子恨，何时灭！驾长车，踏破贺兰山缺。壮志饥餐胡虏肉，笑谈渴饮匈奴血。待从头、收拾旧山河，朝天阙。"
          },
          {
            name: "过零丁洋·文天祥",
            content: "辛苦遭逢起一经，干戈寥落四周星。山河破碎风飘絮，身世浮沉雨打萍。惶恐滩头说惶恐，零丁洋里叹零丁。人生自古谁无死？留取丹心照汗青。"
          },
          {
            name: "正气歌·文天祥",
            content: "予囚北庭，坐一土室。室广八尺，深可四寻。单扉低小，白间短窄，污下而幽暗。当此夏日，诸气萃然：雨潦四集，浮动床几，时则为水气；涂泥半朝，蒸沤历澜，时则为土气；乍晴暴热，风道四塞，时则为日气；檐阴薪爨，助长炎虐，时则为火气；仓腐寄顿，陈陈逼人，时则为米气；骈肩杂遝，腥臊汗垢，时则为人气；或圊溷、或毁尸、或腐鼠，恶气杂出，时则为秽气。叠是数气，当侵沴，鲜不为厉。而予以孱弱，俯仰其间，於兹二年矣，幸而无恙，是殆有养致然尔。然亦安知所养何哉？孟子曰：“吾善养吾浩然之气。”彼气有七，吾气有一，以一敌七，吾何患焉！况浩然者，乃天地之正气也，作正气歌一首。天地有正气，杂然赋流形。下则为河岳，上则为日星。于人曰浩然，沛乎塞苍冥。皇路当清夷，含和吐明庭。时穷节乃见，一一垂丹青。在齐太史简，在晋董狐笔。在秦张良椎，在汉苏武节。为严将军头，为嵇侍中血。为张睢阳齿，为颜常山舌。或为辽东帽，清操厉冰雪。或为出师表，鬼神泣壮烈。或为渡江楫，慷慨吞胡羯。或为击贼笏，逆竖头破裂。是气所磅礴，凛烈万古存。当其贯日月，生死安足论。地维赖以立，天柱赖以尊。三纲实系命，道义为之根。嗟予遘阳九，隶也实不力。楚囚缨其冠，传车送穷北。鼎镬甘如饴，求之不可得。阴房阗鬼火，春院閟天黑。牛骥同一皂，鸡栖凤凰食。一朝蒙雾露，分作沟中瘠。如此再寒暑，百沴自辟易。嗟哉沮洳场，为我安乐国。岂有他缪巧，阴阳不能贼。顾此耿耿在，仰视浮云白。悠悠我心悲，苍天曷有极。哲人日已远，典刑在夙昔。风檐展书读，古道照颜色。"
          },
          {
            name: "白马篇·曹植",
            content: "白马饰金羁，连翩西北驰。借问谁家子，幽并游侠儿。少小去乡邑，扬声沙漠垂。宿昔秉良弓，楛矢何参差。控弦破左的，右发摧月支。仰手接飞猱，俯身散马蹄。狡捷过猴猿，勇剽若豹螭。边城多警急，虏骑数迁移。羽檄从北来，厉马登高堤。长驱蹈匈奴，左顾凌鲜卑。弃身锋刃端，性命安可怀？父母且不顾，何言子与妻！名编壮士籍，不得中顾私。捐躯赴国难，视死忽如归！"
          },
          {
            name: "洛神赋·曹植",
            content: "黄初三年，余朝京师，还济洛川。古人有言：斯水之神，名曰宓妃。感宋玉对楚王神女之事，遂作斯赋。其辞曰：余从京域，言归东藩，背伊阙，越轘辕，经通谷，陵景山。日既西倾，车殆马烦。尔乃税驾乎蘅皋，秣驷乎芝田，容与乎阳林，流眄乎洛川。于是精移神骇，忽焉思散。俯则未察，仰以殊观。睹一丽人，于岩之畔。乃援御者而告之曰：“尔有觌于彼者乎？彼何人斯，若此之艳也！”御者对曰：“臣闻河洛之神，名曰宓妃。然则君王之所见也，无乃是乎！其状若何？臣愿闻之。”余告之曰：其形也，翩若惊鸿，婉若游龙。荣曜秋菊，华茂春松。髣髴兮若轻云之蔽月，飘飖兮若流风之回雪。远而望之，皎若太阳升朝霞；迫而察之，灼若芙蕖出渌波。秾纤得衷，修短合度。肩若削成，腰如约素。延颈秀项，皓质呈露。芳泽无加，铅华弗御。云髻峨峨，修眉联娟。丹唇外朗，皓齿内鲜。明眸善睐，靥辅承权。瓌姿艳逸，仪静体闲。柔情绰态，媚于语言。奇服旷世，骨像应图。披罗衣之璀粲兮，珥瑶碧之华琚。戴金翠之首饰，缀明珠以耀躯。践远游之文履，曳雾绡之轻裾。微幽兰之芳蔼兮，步踟蹰于山隅。于是忽焉纵体，以遨以嬉。左倚采旄，右荫桂旗。攘皓腕于神浒兮，采湍濑之玄芝。余情悦其淑美兮，心振荡而不怡。无良媒以接欢兮，托微波而通辞。愿诚素之先达兮，解玉佩以要之。嗟佳人之信修兮，羌习礼而明诗。抗琼珶以和予兮，指潜渊而为期。执眷眷之款实兮，惧斯灵之我欺。感交甫之弃言兮，怅犹豫而狐疑。收和颜而静志兮，申礼防以自持。于是洛灵感焉，徙倚彷徨。神光离合，乍阴乍阳。竦轻躯以鹤立，若将飞而未翔。践椒涂之郁烈，步蘅薄而流芳。超长吟以永慕兮，声哀厉而弥长。尔乃众灵杂沓，命俦啸侣。或戏清流，或翔神渚，或采明珠，或拾翠羽。从南湘之二妃，携汉滨之游女。叹匏瓜之无匹兮，咏牵牛之独处。扬轻袿之猗靡兮，翳修袖以延伫。体迅飞凫，飘忽若神。凌波微步，罗袜生尘。动无常则，若危若安；进止难期，若往若还。转眄流精，光润玉颜。含辞未吐，气若幽兰。华容婀娜，令我忘餐。于是屏翳收风，川后静波。冯夷鸣鼓，女娲清歌。腾文鱼以警乘，鸣玉銮以偕逝。六龙俨其齐首，载云车之容裔。鲸鲵踊而夹毂，水禽翔而为卫。于是越北沚，过南冈，纡素领，回清扬。动朱唇以徐言，陈交接之大纲。恨人神之道殊兮，怨盛年之莫当。抗罗袂以掩涕兮，泪流襟之浪浪。悼良会之永绝兮，哀一逝而异乡。无微情以效爱兮，献江南之明珰。虽潜处于太阴，长寄心于君王。忽不悟其所舍，怅神宵而蔽光。于是背下陵高，足往神留。遗情想像，顾望怀愁。冀灵体之复形，御轻舟而上溯。浮长川而忘反，思绵绵而增慕。夜耿耿而不寐，沾繁霜而至曙。命仆夫而就驾，吾将归乎东路。揽騑辔以抗策，怅盘桓而不能去。"
          },
          {
            name: "江陵愁望寄子安·鱼玄机",
            content: "枫叶千枝复万枝，江桥掩映暮帆迟。忆君心似西江水，日夜东流无歇时。"
          },
          {
            name: "赠邻女鱼玄机",
            content: "羞日遮罗袖，愁春懒起妆。易求无价宝，难得有心郎。枕上潜垂泪，花间暗断肠。自能窥宋玉，何必恨王昌？"
          },
          {
            name: "临江仙·梦后楼台高锁·晏几道",
            content: "梦后楼台高锁，酒醒帘幕低垂。去年春恨却来时。落花人独立，微雨燕双飞。记得小蘋初见，两重心字罗衣。琵琶弦上说相思。当时明月在，曾照彩云归。"
          },
          {
            name: "清平乐·留人不住·晏几道",
            content: "留人不住，醉解兰舟去。一棹碧涛春水路，过尽晓莺啼处。渡头杨柳青青，枝枝叶叶离情。此后锦书休寄，画楼云雨无凭。"
          },
          {
            name: "新添声杨柳枝词二首·温庭筠",
            content: "一尺深红胜曲尘，天生旧物不如新。合欢桃核终堪恨，里许元来别有人。井底点灯深烛伊，共郎长行莫围棋。玲珑骰子安红豆，入骨相思知不知。"
          },
          {
            name: "望江南·梳洗罢·温庭筠",
            content: "梳洗罢，独倚望江楼。过尽千帆皆不是，斜晖脉脉水悠悠。肠断白蘋洲。"
          },
          {
            name: "梦江南·千万恨·温庭筠",
            content: "千万恨，恨极在天涯。山月不知心里事，水风空落眼前花，摇曳碧云斜。"
          },
          {
            name: "商山早行·温庭筠",
            content: "晨起动征铎，客行悲故乡。鸡声茅店月，人迹板桥霜。槲叶落山路，枳花明驿墙。因思杜陵梦，凫雁满回塘。"
          },
          {
            name: "和友人伤歌姬·温庭筠",
            content: "月缺花残莫怆然，花须终发月终圆。更能何事销芳念，亦有浓华委逝川。一曲艳歌留婉转，九原春草妒婵娟。王孙莫学多情客，自古多情损少年。"
          },
          {
            name: "登幽州台歌·陈子昂",
            content: "前不见古人，后不见来者。念天地之悠悠，独怆然而涕下！"
          },
          {
            name: "己亥岁感事·曹松",
            content: "泽国江山入战图，生民何计乐樵苏。凭君莫话封侯事，一将功成万骨枯。"
          },
          {
            name: "山坡羊·潼关怀古·张养浩",
            content: "峰峦如聚，波涛如怒，山河表里潼关路。望西都，意踌躇。伤心秦汉经行处，宫阙万间都做了土。兴，百姓苦；亡，百姓苦。"
          },
          {
            name: "山坡羊·骊山怀古·张养浩",
            content: "骊山四顾，阿房一炬，当时奢侈今何处？只见草萧疏，水萦纡。至今遗恨迷烟树。列国周齐秦汉楚。赢，都变做了土；输，都变做了土。"
          },
          {
            name: "殿前欢·对菊自叹·张养浩",
            content: "可怜秋，一帘疏雨暗西楼，黄花零落重阳后，减尽风流。对黄花人自羞，花依旧，人比黄花瘦。问花不语，花替人愁。"
          },
          {
            name: "题龙阳县青草湖·唐珙",
            content: "西风吹老洞庭波，一夜湘君白发多。醉后不知天在水，满船清梦压星河。"
          },
          {
            name: "观沧海·曹操",
            content: "东临碣石，以观沧海。水何澹澹，山岛竦峙。树木丛生，百草丰茂。秋风萧瑟，洪波涌起。日月之行，若出其中；星汉灿烂，若出其里。幸甚至哉，歌以咏志。"
          },
          {
            name: "短歌行·曹操",
            content: "对酒当歌，人生几何！譬如朝露，去日苦多。慨当以慷，忧思难忘。何以解忧？唯有杜康。青青子衿，悠悠我心。但为君故，沉吟至今。呦呦鹿鸣，食野之苹。我有嘉宾，鼓瑟吹笙。明明如月，何时可掇？忧从中来，不可断绝。越陌度阡，枉用相存。契阔谈讌，心念旧恩。月明星稀，乌鹊南飞。绕树三匝，何枝可依？山不厌高，海不厌深。周公吐哺，天下归心。"
          },
          {
            name: "龟虽寿·曹操",
            content: "神龟虽寿，犹有竟时。腾蛇乘雾，终为土灰。老骥伏枥，志在千里。烈士暮年，壮心不已。盈缩之期，不但在天；养怡之福，可得永年。幸甚至哉，歌以咏志。"
          },
          {
            name: "不第后赋菊·黄巢",
            content: "待到秋来九月八，我花开后百花杀。冲天香阵透长安，满城尽带黄金甲。"
          },
          {
            name: "垓下歌·项羽",
            content: "力拔山兮气盖世。时不利兮骓不逝。骓不逝兮可奈何！虞兮虞兮奈若何！"
          },
          {
            name: "大风歌·刘邦",
            content: "大风起兮云飞扬，威加海内兮归故乡，安得猛士兮守四方！"
          },
          {
            name: "赐萧瑀·李世民",
            content: "疾风知劲草，板荡识诚臣。勇夫安识义，智者必怀仁。"
          },
          {
            name: "剑客",
            content: "十年磨一剑，霜刃未曾试。今日把示君，谁有不平事？"
          },
          {
            name: "献钱尚父",
            content: "贵逼人来不自由，龙骧凤翥势难收。满堂花醉三千客，一剑霜寒十四州。鼓角揭天嘉气冷，风涛动地海山秋。东南永作金天柱，谁羡当时万户侯。"
          },
          {
            name: "夜坐·其二",
            content: "沉沉心事北南东，一睨人材海内空。壮岁始参周史席，髫年惜堕晋贤风。功高拜将成仙外，才尽回肠荡气中。万一禅关砉然破，美人如玉剑如虹。"
          },
          {
            name: "采薇·佚名",
            content: "采薇采薇，薇亦作止。曰归曰归，岁亦莫止。 靡室靡家，猃狁之故。不遑启居，猃狁之故。采薇采薇，薇亦柔止。曰归曰归，心亦忧止。 忧心烈烈，载饥载渴。我戍未定，靡使归聘。采薇采薇，薇亦刚止。曰归曰归，岁亦阳止。 王事靡盬，不遑启处。忧心孔疚，我行不来！彼尔维何？维常之华。彼路斯何？君子之车。 戎车既驾，四牡业业。岂敢定居？一月三捷。驾彼四牡，四牡骙骙。君子所依，小人所腓。 四牡翼翼，象弭鱼服。岂不日戒？猃狁孔棘！昔我往矣，杨柳依依。今我来思，雨雪霏霏。 行道迟迟，载渴载饥。我心伤悲，莫知我哀！"
          },
          {
            name: "筹笔驿·罗隐",
            content: "抛掷南阳为主忧，北征东讨尽良筹。时来天地皆同力，运去英雄不自由。千里山河轻孺子，两朝冠剑恨谯周。唯余岩下多情水，犹解年年傍驿流。"
          },
          {
            name: "送东阳马生序·宋濂",
            content: "余幼时即嗜学。家贫，无从致书以观，每假借于藏书之家，手自笔录，计日以还。天大寒，砚冰坚，手指不可屈伸，弗之怠。录毕，走送之，不敢稍逾约。以是人多以书假余，余因得遍观群书。既加冠，益慕圣贤之道 。又患无硕师名人与游，尝趋百里外，从乡之先达执经叩问。先达德隆望尊，门人弟子填其室，未尝稍降辞色。余立侍左右，援疑质理，俯身倾耳以请；或遇其叱咄，色愈恭，礼愈至，不敢出一言以复；俟其欣悦，则又请焉。故余虽愚，卒获有所闻。当余之从师也，负箧曳屣行深山巨谷中。穷冬烈风，大雪深数尺，足肤皲裂而不知。至舍，四支僵劲不能动，媵人持汤沃灌，以衾拥覆，久而乃和。寓逆旅，主人日再食，无鲜肥滋味之享。同舍生皆被绮绣，戴朱缨宝饰之帽，腰白玉之环，左佩刀，右备容臭，烨然若神人；余则缊袍敝衣处其间，略无慕艳意，以中有足乐者，不知口体之奉不若人也。盖余之勤且艰若此。今虽耄老，未有所成，犹幸预君子之列，而承天子之宠光，缀公卿之后，日侍坐备顾问，四海亦谬称其氏名，况才之过于余者乎？今诸生学于太学，县官日有廪稍之供，父母岁有裘葛之遗，无冻馁之患矣；坐大厦之下而诵诗书，无奔走之劳矣；有司业、博士为之师，未有问而不告、求而不得者也；凡所宜有之书，皆集于此，不必若余之手录，假诸人而后见也。其业有不精、德有不成者，非天质之卑，则心不若余之专耳，岂他人之过哉！东阳马生君则，在太学已二年，流辈甚称其贤。余朝京师，生以乡人子谒余，撰长书以为贽，辞甚畅达。与之论辨，言和而色夷。自谓少时用心于学甚劳，是可谓善学者矣。其将归见其亲也，余故道为学之难以告之。谓余勉乡人以学者，余之志也；诋我夸际遇之盛而骄乡人者，岂知予者哉！"
          },
          {
            name: "凤求凰·司马相如·其一",
            content: "有一美人兮，见之不忘。一日不见兮，思之如狂。凤飞翱翔兮，四海求凰。无奈佳人兮，不在东墙。将琴代语兮，聊写衷肠。何时见许兮，慰我彷徨。愿言配德兮，携手相将。不得於飞兮，使我沦亡。"
          },
          {
            name: "凤求凰·司马相如·其二",
            content: "凤兮凤兮归故乡，遨游四海求其凰。时未遇兮无所将，何悟今兮升斯堂！有艳淑女在闺房，室迩人遐毒我肠。何缘交颈为鸳鸯，胡颉颃兮共翱翔！凰兮凰兮从我栖，得托孳尾永为妃。交情通意心和谐，中夜相从知者谁？双翼俱起翻高飞，无感我思使余悲。"
          },
          {
            name: "白头吟·卓文君",
            content: "皑如山上雪，皎若云间月。闻君有两意，故来相决绝。今日斗酒会，明旦沟水头。躞蹀御沟上，沟水东西流。凄凄复凄凄，嫁娶不须啼。愿得一心人，白头不相离。竹竿何袅袅，鱼尾何簁簁！男儿重意气，何用钱刀为！"
          },
          {
            name: "诀别书·卓文君",
            content: "春华竞芳，五色凌素，琴尚在御，而新声代故！锦水有鸳，汉宫有木，彼物而新，嗟世之人兮，瞀于淫而不悟！朱弦断，明镜缺，朝露晞，芳时歇，白头吟，伤离别，努力加餐勿念妾，锦水汤汤，与君长诀！"
          },
          {
            name: "蝶恋花·阅尽天涯离别苦·王国维",
            content: "阅尽天涯离别苦，不道归来，零落花如许。花底相看无一语，绿窗春与天俱莫。待把相思灯下诉，一缕新欢，旧恨千千缕。最是人间留不住，朱颜辞镜花辞树。"
          },
          {
            name: "蝶恋花·伫倚危楼风细细·柳永",
            content: "伫倚危楼风细细，望极春愁，黯黯生天际。草色烟光残照里，无言谁会凭阑意。拟把疏狂图一醉，对酒当歌，强乐还无味。衣带渐宽终不悔，为伊消得人憔悴。"
          },
          {
            name: "雨霖铃·寒蝉凄切·柳永",
            content: "寒蝉凄切，对长亭晚，骤雨初歇。都门帐饮无绪，留恋处，兰舟催发。执手相看泪眼，竟无语凝噎。念去去，千里烟波，暮霭沉沉楚天阔。多情自古伤离别，更那堪，冷落清秋节！今宵酒醒何处？杨柳岸，晓风残月。此去经年，应是良辰好景虚设。便纵有千种风情，更与何人说？"
          },
          {
            name: "鹤冲天·黄金榜上·柳永",
            content: "黄金榜上，偶失龙头望。明代暂遗贤，如何向。未遂风云便，争不恣狂荡。何须论得丧？才子词人，自是白衣卿相。烟花巷陌，依约丹青屏障。幸有意中人，堪寻访。且恁偎红倚翠，风流事、平生畅。青春都一饷。忍把浮名，换了浅斟低唱！"
          },
          {
            name: "昼夜乐·洞房记得初相遇·柳永",
            content: "洞房记得初相遇。便只合、长相聚。何期小会幽欢，变作离情别绪。况值阑珊春色暮，对满目、乱花狂絮。直恐好风光，尽随伊归去。一场寂寞凭谁诉。算前言、总轻负。早知恁地难拚，悔不当时留住。其奈风流端正外，更别有，系人心处。一日不思量，也攒眉千度。"
          },
          {
            name: "寄黄几复·黄庭坚",
            content: "我居北海君南海，寄雁传书谢不能。桃李春风一杯酒，江湖夜雨十年灯。持家但有四立壁，治病不蕲三折肱。想见读书头已白，隔溪猿哭瘴溪藤。"
          }
        ]
      }
    ]
  },
  {
    title: "百家名言",
    data: [
      {
        author: "儒家",
        article: [
          {
            name: "论语·学而篇",
            content: "子曰：“学而时习之，不亦说乎？有朋自远方来，不亦乐乎？人不知而不愠，不亦君子乎？”有子曰：“其为人也孝弟，而好犯上者，鲜矣；不好犯上而好作乱者，未之有也。君子务本，本立而道生。孝弟也者，其为仁之本与！”子曰：“巧言令色，鲜矣仁！”曾子曰：“吾日三省吾身：为人谋而不忠乎？与朋友交而不信乎？传不习乎？”子曰：“道千乘之国，敬事而信，节用而爱人，使民以时。”子曰：“弟子入则孝，出则弟，谨而信，泛爱众，而亲仁，行有余力，则以学文。”子夏曰：“贤贤易色；事父母，能竭其力；事君，能致其身；与朋友交，言而有信。虽曰未学，吾必谓之学矣。”子曰：“君子不重则不威，学则不固。主忠信，无友不如己者，过，则勿惮改。”曾子曰：“慎终追远，民德归厚矣。”子禽问于子贡曰：“夫子至于是邦也，必闻其政，求之与，抑与之与？”子贡曰：“夫子温、良、恭、俭、让以得之。夫子之求之也，其诸异乎人之求之与？”子曰：“父在，观其志；父没，观其行；三年无改于父之道，可谓孝矣。”有子曰：“礼之用，和为贵。先王之道，斯为美。小大由之，有所不行。知和而和，不以礼节之，亦不可行也。”有子曰：“信近于义，言可复也。恭近于礼，远耻辱也。因不失其亲，亦可宗也。”子曰：“君子食无求饱，居无求安，敏于事而慎于言，就有道而正焉，可谓好学也已。”子贡曰：“贫而无谄，富而无骄，何如？”子曰：“可也。未若贫而乐，富而好礼者也。”子贡曰：“《诗》云：‘如切如磋，如琢如磨’，其斯之谓与？”子曰：“赐也，始可与言《诗》已矣，告诸往而知来者。”子曰：“不患人之不己知，患不知人也。”"
          },
          {
            name: "论语·为政篇",
            content: "子曰：“为政以德，譬如北辰，居其所而众星共之。”子曰：“《诗》三百，一言以蔽之，曰：‘思无邪’。子曰：“道之以政，齐之以刑，民免而无耻。道之以德，齐之以礼，有耻且格。子曰：“吾十有五而志于学，三十而立，四十而不惑，五十而知天命，六十而耳顺，七十而从心所欲，不逾矩。孟懿子问孝，子曰：“无违。”樊迟御，子告之曰：“孟孙问孝于我，我对曰‘无违’。”樊迟曰：“何谓也？”子曰：“生，事之以礼；死，葬之以礼，祭之以礼。孟武伯问孝。子曰：“父母唯其疾之忧。子游问孝。子曰：“今之孝者，是谓能养。至于犬马，皆能有养；不敬，何以别乎？子夏问孝。子曰：“色难。有事，弟子服其劳；有酒食，先生馔，曾是以为孝乎？子曰：“吾与回言终日，不违，如愚。退而省其私，亦足以发，回也不愚。子曰：“视其所以，观其所由，察其所安，人焉廋哉？人焉廋哉？子曰：“温故而知新，可以为师矣。子曰：“君子不器。子贡问君子。子曰：“先行其言而后从之。子曰：“君子周而不比，小人比而不周。子曰：“学而不思则罔，思而不学则殆。子曰：“攻乎异端，斯害也已！子曰：“由，诲女知之乎！知之为知之，不知为不知，是知也。子张学干禄。子曰：“多闻阙疑，慎言其余，则寡尤；多见阙殆，慎行其余，则寡悔。言寡尤，行寡悔，禄在其中矣。哀公问曰：“何为则民服？”孔子对曰：“举直错诸枉，则民服；举枉错诸直，则民不服。季康子问：“使民敬、忠以劝，如之何？”子曰：“临之以庄，则敬；孝慈，则忠；举善而教不能，则劝。或谓孔子曰：“子奚不为政？”子曰：“《书》云：‘孝乎惟孝，友于兄弟。’施于有政，是亦为政，奚其为为政？子曰：“人而无信，不知其可也。大车无輗，小车无軏，其何以行之哉？子张问：“十世可知也？”子曰：“殷因于夏礼，所损益，可知也；周因于殷礼，所损益，可知也。其或继周者，虽百世，可知也。子曰：“非其鬼而祭之，谄也；见义不为，无勇也。”"
          },
          {
            name: "论语·八佾篇",
            content: "孔子谓季氏：“八佾舞于庭，是可忍也，孰不可忍也？”三家者以《雍》彻，子曰：“‘相维辟公，天子穆穆’，奚取于三家之堂？”子曰：“人而不仁，如礼何？人而不仁，如乐何？”林放问礼之本，子曰：“大哉问！礼，与其奢也，宁俭；丧，与其易也，宁戚。”子曰：“夷狄之有君，不如诸夏之亡也。”季氏旅于泰山。子谓冉有曰：“女弗能救与？”对曰：“不能。”子曰：“呜呼！曾谓泰山不如林放乎？”子曰：“君子无所争，必也射乎！揖让而升，下而饮。其争也君子。”子夏问曰：“‘巧笑倩兮，美目盼兮，素以为绚兮’何谓也？”子曰：“绘事后素。”曰：“礼后乎？”子曰：“起予者商也，始可与言《诗》已矣。”子曰：“夏礼吾能言之，杞不足征也；殷礼吾能言之，宋不足征也。文献不足故也，足则吾能征之矣。”子曰：“禘自既灌而往者，吾不欲观之矣。”或问禘之说。子曰：“不知也。知其说者之于天下也，其如示诸斯乎！”指其掌。祭如在，祭神如神在。子曰：“吾不与祭，如不祭。”王孙贾问曰：“‘与其媚于奥，宁媚于灶’，何谓也？”子曰：“不然，获罪于天，无所祷也。”子曰：“周监于二代，郁郁乎文哉！吾从周。”子入太庙，每事问。或曰：“孰谓鄹人之子知礼乎？入太庙，每事问。”子闻之，曰：“是礼也。”子曰：“射不主皮，为力不同科，古之道也。”子贡欲去告朔之饩羊，子曰：“赐也！尔爱其羊，我爱其礼。”子曰：“事君尽礼，人以为谄也。”定公问：“君使臣，臣事君，如之何？”孔子对曰：“君使臣以礼，臣事君以忠。”子曰：“《关雎》，乐而不淫，哀而不伤。”哀公问社于宰我，宰我对曰：“夏后氏以松，殷人以柏，周人以栗，曰使民战栗。”子闻之，曰：“成事不说，遂事不谏，既往不咎。”子曰：“管仲之器小哉！”或曰：“管仲俭乎？”曰：“管氏有三归，官事不摄，焉得俭？”“然则管仲知礼乎？”曰：“邦君树塞门，管氏亦树塞门；邦君为两君之好，有反坫。管氏亦有反坫，管氏而知礼，孰不知礼？”子语鲁大师乐，曰：“乐其可知也。始作，翕如也；从之，纯如也，皦如也，绎如也，以成。”仪封人请见，曰：“君子之至于斯也，吾未尝不得见也。”从者见之。出曰：“二三子何患于丧乎？天下之无道也久矣，天将以夫子为木铎。”子谓《韶》：“尽美矣，又尽善也。”谓《武》：“尽美矣，未尽善也。”子曰：“居上不宽，为礼不敬，临丧不哀，吾何以观之哉？”"
          },
          {
            name: "论语·里仁篇",
            content: "子曰：“里仁为美，择不处仁，焉得知？”子曰：“不仁者不可以久处约，不可以长处乐。仁者安仁，知者利仁。子曰：“唯仁者能好人，能恶人。子曰：“苟志于仁矣，无恶也。子曰：“富与贵，是人之所欲也；不以其道得之，不处也。贫与贱，是人之所恶也；不以其道得之，不去也。君子去仁，恶乎成名？君子无终食之间违仁，造次必于是，颠沛必于是。子曰：“我未见好仁者，恶不仁者。好仁者，无以尚之；恶不仁者，其为仁矣，不使不仁者加乎其身，有能一日用其力于仁矣乎？我未见力不足者。盖有之矣，我未之见也。子曰：“人之过也，各于其党。观过，斯知仁矣。子曰：“朝闻道，夕死可矣。子曰：“士志于道，而耻恶衣恶食者，未足与议也。子曰：“君子之于天下也，无适也，无莫也，义之与比。子曰：“君子怀德，小人怀土；君子怀刑，小人怀惠。子曰：“放于利而行，多怨。子曰：“能以礼让为国乎？何有？不能以礼让为国，如礼何？子曰：“不患无位，患所以立；不患莫己知，求为可知也。子曰：“参乎！吾道一以贯之。”曾子曰：“唯。”子出，门人问曰：“何谓也？”曾子曰：“夫子之道，忠恕而已矣。子曰：“君子喻于义，小人喻于利。子曰：“见贤思齐焉，见不贤而内自省也。子曰：“事父母几谏，见志不从，又敬不违，劳而不怨。子曰：“父母在，不远游，游必有方。子曰：“三年无改于父之道，可谓孝矣。子曰：“父母之年，不可不知也。一则以喜，一则以惧。子曰：“古者言之不出，耻躬之不逮也。子曰：“以约失之者鲜矣。子曰：“君子欲讷于言而敏于行。子曰：“德不孤，必有邻。子游曰：“事君数，斯辱矣；朋友数，斯疏矣。”"
          },
          {
            name: "论语·公冶长篇",
            content: "子谓公冶长：“可妻也，虽在缧绁之中，非其罪也！”以其子妻之。子谓南容：“邦有道不废；邦无道免于刑戮。”以其兄之子妻之。子谓子贱：“君子哉若人！鲁无君子者，斯焉取斯？”子贡问曰：“赐也何如？”子曰：“女器也。”曰：“何器也？”曰：“瑚琏也。”或曰：“雍也仁而不佞。”子曰：“焉用佞？御人以口给，屡憎于人。不知其仁，焉用佞？”子使漆雕开仕，对曰：“吾斯之未能信。”子说。子曰：“道不行，乘桴浮于海，从我者其由与？”子路闻之喜，子曰：“由也好勇过我，无所取材。”孟武伯问：“子路仁乎？”子曰：“不知也。”又问，子曰：“由也，千乘之国，可使治其赋也，不知其仁也。”“求也何如？”子曰：“求也，千室之邑、百乘之家，可使为之宰也，不知其仁也。”“赤也何如？”子曰：“赤也，束带立于朝，可使与宾客言也，不知其仁也。”子谓子贡曰：“女与回也孰愈？”对曰：“赐也何敢望回？回也闻一以知十，赐也闻一以知二。”子曰：“弗如也，吾与女弗如也！”宰予昼寝，子曰：“朽木不可雕也，粪土之墙不可圬也，于予与何诛？”子曰：“始吾于人也，听其言而信其行；今吾于人也，听其言而观其行。于予与改是。”子曰：“吾未见刚者。”或对曰：“申枨。”子曰：“枨也欲，焉得刚？”子贡曰：“我不欲人之加诸我也，吾亦欲无加诸人。”子曰：“赐也，非尔所及也。”子贡曰：“夫子之文章，可得而闻也；夫子之言性与天道，不可得而闻也。”子路有闻，未之能行，唯恐有闻。子贡问曰：“孔文子何以谓之文也？”子曰：“敏而好学，不耻下问，是以谓之文也。”子谓子产：“有君子之道四焉：其行己也恭，其事上也敬，其养民也惠，其使民也义。”子曰：“晏平仲善与人交，久而敬之。”子曰：“臧文仲居蔡，山节藻棁，何如其知也？”子张问曰：“令尹子文三仕为令尹，无喜色，三已之无愠色，旧令尹之政必以告新令尹，何如？”子曰：“忠矣。”曰：“仁矣乎？”曰：“未知，焉得仁？”“崔子弑齐君，陈文子有马十乘，弃而违之。至于他邦，则曰：‘犹吾大夫崔子也。’违之。之一邦，则又曰：‘犹吾大夫崔子也。’违之，何如？”子曰：“清矣。”曰：“仁矣乎？”曰：“未知，焉得仁？”季文子三思而后行，子闻之曰：“再斯可矣。”子曰：“宁武子，邦有道则知，邦无道则愚。其知可及也，其愚不可及也。”子在陈，曰：“归与！归与！吾党之小子狂简，斐然成章，不知所以裁之。”子曰：“伯夷、叔齐不念旧恶，怨是用希。”子曰：“孰谓微生高直？或乞醯焉，乞诸其邻而与之。”子曰：“巧言、令色、足恭，左丘明耻之，丘亦耻之。匿怨而友其人，左丘明耻之，丘亦耻之。”颜渊、季路侍，子曰：“盍各言尔志？”子路曰：“愿车马衣轻裘，与朋友共，敝之而无憾。”颜渊曰：“愿无伐善，无施劳。”子路曰：“愿闻子之志。”子曰：“老者安之，朋友信之，少者怀之。”子曰：“已矣乎！吾未见能见其过而内自讼者也。”子曰：“十室之邑，必有忠信如丘者焉，不如丘之好学也。”"
          },
          {
            name: "论语·雍也篇",
            content: "子曰：“雍也可使南面。”仲弓问子桑伯子，子曰：“可也，简。”仲弓曰：“居敬而行简，以临其民，不亦可乎？居简而行简，无乃大简乎？”子曰：“雍之言然。”哀公问：“弟子孰为好学？”孔子对曰：“有颜回者好学，不迁怒，不贰过，不幸短命死矣，今也则亡，未闻好学者也。”子华使于齐，冉子为其母请粟，子曰：“与之釜。”请益，曰：“与之庾。”冉子与之粟五秉。子曰：“赤之适齐也，乘肥马，衣轻裘。吾闻之也，君子周急不继富。”原思为之宰，与之粟九百，辞。子曰：“毋，以与尔邻里乡党乎！”子谓仲弓曰：“犁牛之子骍且角，虽欲勿用，山川其舍诸？”子曰：“回也，其心三月不违仁，其余则日月至焉而已矣。”季康子问：“仲由可使从政也与？”子曰：“由也果，于从政乎何有？”曰：“赐也可使从政也与？”曰：“赐也达，于从政乎何有？”曰：“求也可使从政也与？”曰：“求也艺，于从政乎何有？”季氏使闵子骞为费宰，闵子骞曰：“善为我辞焉。如有复我者，则吾必在汶上矣。”伯牛有疾，子问之，自牖执其手，曰：“亡之，命矣夫！斯人也而有斯疾也！斯人也而有斯疾也！”子曰：“贤哉回也！一箪食，一瓢饮，在陋巷，人不堪其忧，回也不改其乐。贤哉，回也！”冉求曰：“非不说子之道，力不足也。”子曰：“力不足者，中道而废，今女画。”子谓子夏曰：“女为君子儒，无为小人儒。”子游为武城宰，子曰：“女得人焉尔乎？”曰：“有澹台灭明者，行不由径，非公事，未尝至于偃之室也。”子曰：“孟之反不伐，奔而殿，将入门，策其马曰：‘非敢后也，马不进也。’”子曰：“不有祝鮀之佞，而有宋朝之美，难乎免于今之世矣。”子曰：“谁能出不由户？何莫由斯道也？”子曰：“质胜文则野，文胜质则史。文质彬彬，然后君子。”子曰：“人之生也直，罔之生也幸而免。”子曰：“知之者不如好之者，好之者不如乐之者。”子曰：“中人以上，可以语上也；中人以下，不可以语上也。”樊迟问知，子曰：“务民之义，敬鬼神而远之，可谓知矣。”问仁，曰：“仁者先难而后获，可谓仁矣。”子曰：“知者乐水，仁者乐山。知者动，仁者静。知者乐，仁者寿。”子曰：“齐一变至于鲁，鲁一变至于道。”子曰：“觚不觚，觚哉！觚哉！”宰我问曰：“仁者，虽告之曰：‘井有仁焉。’其从之也？”子曰：“何为其然也？君子可逝也，不可陷也；可欺也，不可罔也。”子曰：“君子博学于文，约之以礼，亦可以弗畔矣夫。”子见南子，子路不说，夫子矢之曰：“予所否者，天厌之！天厌之！”子曰：“中庸之为德也，其至矣乎！民鲜久矣。”子贡曰：“如有博施于民而能济众，何如？可谓仁乎？”子曰：“何事于仁，必也圣乎！尧、舜其犹病诸！夫仁者，己欲立而立人，己欲达而达人。能近取譬，可谓仁之方也已。”"
          },
          {
            name: "论语·述而篇",
            content: "子曰：“述而不作，信而好古，窃比于我老彭。”子曰：“默而识之，学而不厌，诲人不倦，何有于我哉？”子曰：“德之不修，学之不讲，闻义不能徙，不善不能改，是吾忧也。”子之燕居，申申如也，夭夭如也。子曰：“甚矣吾衰也！久矣吾不复梦见周公。”子曰：“志于道，据于德，依于仁，游于艺。”子曰：“自行束脩以上，吾未尝无诲焉。”子曰：“不愤不启，不悱不发，举一隅不以三隅反，则不复也。”子食于有丧者之侧，未尝饱也。子于是日哭，则不歌。子谓颜渊曰：“用之则行，舍之则藏，惟我与尔有是夫！”子路曰：“子行三军，则谁与？”子曰：“暴虎冯河，死而无悔者，吾不与也。必也临事而惧，好谋而成者也。”子曰：“富而可求也，虽执鞭之士，吾亦为之。如不可求，从吾所好。”子之所慎：斋，战，疾。子在齐闻《韶》，三月不知肉味，曰：“不图为乐之至於斯也。”冉有曰：“夫子为卫君乎？”子贡曰：“诺，吾将问之。”入，曰：“伯夷、叔齐何人也？”曰：“古之贤人也。”曰：“怨乎？”曰：“求仁而得仁，又何怨？”出，曰：“夫子不为也。”子曰：“饭疏食饮水，曲肱而枕之，乐亦在其中矣。不义而富且贵，于我如浮云。”子曰：“加我数年，五十以学《易》，可以无大过矣。”子所雅言，《诗》、《书》、执礼，皆雅言也。叶公问孔子于子路，子路不对。子曰：“女奚不曰：其为人也，发愤忘食，乐以忘忧，不知老之将至云尔。”子曰：“我非生而知之者，好古，敏以求之者也。”子不语怪、力、乱、神。子曰：“三人行，必有我师焉。择其善者而从之，其不善者而改之。”子曰：“天生德于予，桓魋其如予何？”子曰：“二三子以我为隐乎？吾无隐乎尔！吾无行而不与二三子者，是丘也。”子以四教：文，行，忠，信。子曰：“圣人，吾不得而见之矣；得见君子者斯可矣。”子曰：“善人，吾不得而见之矣，得见有恒者斯可矣。亡而为有，虚而为盈，约而为泰，难乎有恒矣。”子钓而不纲，弋不射宿。子曰：“盖有不知而作之者，我无是也。多闻，择其善者而从之；多见而识之，知之次也。”互乡难与言，童子见，门人惑。子曰：“与其进也，不与其退也，唯何甚？人洁己以进，与其洁也，不保其往也。”子曰：“仁远乎哉？我欲仁，斯仁至矣。”陈司败问：“昭公知礼乎？”孔子曰：“知礼。”孔子退，揖巫马期而进之，曰：“吾闻君子不党，君子亦党乎？君取于吴，为同姓，谓之吴孟子。君而知礼，孰不知礼？”巫马期以告，子曰：“丘也幸，苟有过，人必知之。”子与人歌而善，必使反之，而后和之。子曰：“文，莫吾犹人也。躬行君子，则吾未之有得。”子曰：“若圣与仁，则吾岂敢？抑为之不厌，诲人不倦，则可谓云尔已矣。”公西华曰：“正唯弟子不能学也。”子疾病，子路请祷。子曰：“有诸？”子路对曰：“有之。《诔》曰：‘祷尔于上下神祇。’”子曰：“丘之祷久矣。”子曰：“奢则不孙，俭则固。与其不孙也，宁固。”子曰：“君子坦荡荡，小人长戚戚。”子温而厉，威而不猛，恭而安。"
          },
          {
            name: "论语·泰伯篇",
            content: "子曰：“泰伯，其可谓至德也已矣。三以天下让，民无得而称焉。”子曰：“恭而无礼则劳；慎而无礼则葸；勇而无礼则乱；直而无礼则绞。君子笃于亲，则民兴于仁；故旧不遗，则民不偷。”曾子有疾，召门弟子曰：“启予足，启予手。《诗》云：‘战战兢兢，如临深渊，如履薄冰。’而今而后，吾知免夫，小子！”曾子有疾，孟敬子问之。曾子言曰：“鸟之将死，其鸣也哀；人之将死，其言也善。君子所贵乎道者三：动容貌，斯远暴慢矣；正颜色，斯近信矣；出辞气，斯远鄙倍矣。笾豆之事，则有司存。”曾子曰：“以能问于不能；以多问于寡；有若无，实若虚，犯而不校。昔者吾友尝从事于斯矣。”曾子曰：“可以托六尺之孤，可以寄百里之命，临大节而不可夺也。君子人与？君子人也。”曾子曰：“士不可以不弘毅，任重而道远。仁以为己任，不亦重乎？死而后已，不亦远乎？”子曰：“兴于《诗》，立于礼，成于乐。”子曰：“民可，使由之；不可，使知之。”子曰：“好勇疾贫，乱也。人而不仁，疾之已甚，乱也。”子曰：“如有周公之才之美，使骄且吝，其余不足观也已。”子曰：“三年学，不至于谷，不易得也。”子曰：“笃信好学，守死善道。危邦不入，乱邦不居。天下有道则见，无道则隐。邦有道，贫且贱焉，耻也；邦无道，富且贵焉，耻也。”子曰：“不在其位，不谋其政。”子曰：“师挚之始，《关雎》之乱，洋洋乎盈耳哉！”子曰：“狂而不直，侗而不愿，悾悾而不信，吾不知之矣。”子曰：“学如不及，犹恐失之。”子曰：“巍巍乎！舜、禹之有天下也而不与焉。”子曰：“大哉尧之为君也！巍巍乎，唯天为大，唯尧则之。荡荡乎，民无能名焉。巍巍乎其有成功也，焕乎其有文章！”舜有臣五人而天下治。武王曰：“予有乱臣十人。”孔子曰：“才难，不其然乎？唐虞之际，于斯为盛；有妇人焉，九人而已。三分天下有其二，以服事殷。周之德，其可谓至德也已矣。”子曰：“禹，吾无间然矣。菲饮食而致孝乎鬼神，恶衣服而致美乎黼冕，卑宫室而尽力乎沟洫。禹，吾无间然矣。”"
          },
          {
            name: "论语·子罕篇",
            content: "子罕言利，与命与仁。达巷党人曰：“大哉孔子！博学而无所成名。”子闻之，谓门弟子曰：“吾何执？执御乎，执射乎？吾执御矣。”子曰：“麻冕，礼也；今也纯，俭，吾从众。拜下，礼也；今拜乎上，泰也；虽违众，吾从下。”子绝四：毋意、毋必、毋固、毋我。子畏于匡，曰：“文王既没，文不在兹乎？天之将丧斯文也，后死者不得与于斯文也；天之未丧斯文也，匡人其如予何？”太宰问于子贡曰：“夫子圣者与，何其多能也？”子贡曰：“固天纵之将圣，又多能也。”子闻之，曰：“太宰知我乎？吾少也贱，故多能鄙事。君子多乎哉？不多也。”牢曰：“子云：‘吾不试，故艺。’”子曰：“吾有知乎哉？无知也。有鄙夫问于我，空空如也。我叩其两端而竭焉。”子曰：“凤鸟不至，河不出图，吾已矣夫！”子见齐衰者、冕衣裳者与瞽者，见之，虽少，必作，过之必趋。颜渊喟然叹曰：“仰之弥高，钻之弥坚。瞻之在前，忽焉在后。夫子循循然善诱人，博我以文，约我以礼，欲罢不能。既竭吾才，如有所立卓尔，虽欲从之，末由也已。”子疾病，子路使门人为臣。病间，曰：“久矣哉，由之行诈也！无臣而为有臣，吾谁欺？欺天乎？且予与其死于臣之手也，无宁死于二三子之手乎！且予纵不得大葬，予死于道路乎？”子贡曰：“有美玉于斯，韫椟而藏诸？求善贾而沽诸？”子曰：“沽之哉，沽之哉！我待贾者也。”子欲居九夷。或曰：“陋，如之何？”子曰：“君子居之，何陋之有！”子曰：“吾自卫反鲁，然后乐正，《雅》《颂》各得其所。”子曰：“出则事公卿，入则事父兄，丧事不敢不勉，不为酒困，何有于我哉？”子在川上曰：“逝者如斯夫！不舍昼夜。”子曰：“吾未见好德如好色者也。”子曰：“譬如为山，未成一篑，止，吾止也；譬如平地，虽覆一篑，进，吾往也。”子曰：“语之而不惰者，其回也与！”子谓颜渊，曰：“惜乎！吾见其进也，未见其止也。”子曰：“苗而不秀者有矣夫，秀而不实者有矣夫。”子曰：“后生可畏，焉知来者之不如今也？四十、五十而无闻焉，斯亦不足畏也已。”子曰：“法语之言，能无从乎？改之为贵。巽与之言，能无说乎？绎之为贵。说而不绎，从而不改，吾末如之何也已矣。”子曰：“主忠信。毋友不如己者，过，则勿惮改。”子曰：“三军可夺帅也，匹夫不可夺志也。”子曰：“衣敝缊袍，与衣狐貉者立而不耻者，其由也与！‘不忮不求，何用不臧？’”子路终身诵之，子曰：“是道也，何足以臧？”子曰：“岁寒，然后知松柏之后凋也。”子曰：“知者不惑，仁者不忧，勇者不惧。”子曰：“可与共学，未可与适道；可与适道，未可与立；可与立，未可与权。”“唐棣之华，偏其反而。岂不尔思？室是远尔。”子曰：“未之思也，夫何远之有。”"
          },
          {
            name: "论语·乡党篇",
            content: "孔子于乡党，恂恂如也，似不能言者；其在宗庙朝庭，便便言，唯谨尔。朝，与下大夫言，侃侃如也；与上大夫言，訚訚如也。君在，踧踖如也，与与如也。君召使摈，色勃如也，足躩如也。揖所与立，左右手，衣前后襜如也。趋进，翼如也。宾退，必复命曰：“宾不顾矣。”入公门，鞠躬如也，如不容。立不中门，行不履阈。过位，色勃如也，足躩如也，其言似不足者。摄齐升堂，鞠躬如也，屏气似不息者。出，降一等，逞颜色，怡怡如也；没阶，趋进，翼如也；复其位，踧踖如也。执圭，鞠躬如也，如不胜。上如揖，下如授。勃如战色，足蹜蹜如有循。享礼，有容色。私觌，愉愉如也。君子不以绀緅饰，红紫不以为亵服。当暑袗絺绤，必表而出之。缁衣羔裘，素衣麑裘，黄衣狐裘。亵裘长，短右袂。必有寝衣，长一身有半。狐貉之厚以居。去丧，无所不佩。非帷裳，必杀之。羔裘玄冠不以吊。吉月，必朝服而朝。齐，必有明衣，布。齐必变食，居必迁坐。食不厌精，脍不厌细。食饐而餲，鱼馁而肉败，不食；色恶，不食；臭恶，不食；失饪，不食；不时，不食；割不正，不食；不得其酱，不食。肉虽多，不使胜食气。唯酒无量，不及乱。沽酒市脯，不食。不撤姜食，不多食。祭于公，不宿肉。祭肉不出三日，出三日不食之矣。食不语，寝不言。虽疏食菜羹，瓜祭，必齐如也。席不正，不坐。乡人饮酒，杖者出，斯出矣。乡人傩，朝服而立于阼阶。问人于他邦，再拜而送之。康子馈药，拜而受之。曰：“丘未达，不敢尝。”厩焚，子退朝，曰：“伤人乎？”不问马。君赐食，必正席先尝之；君赐腥，必熟而荐之；君赐生，必畜之。侍食于君，君祭，先饭。疾，君视之，东首，加朝服，拖绅。君命召，不俟驾行矣。入太庙，每事问。朋友死，无所归，曰：“于我殡。”朋友之馈，虽车马，非祭肉，不拜。寝不尸，居不容。见齐衰者，虽狎，必变。见冕者与瞽者，虽亵，必以貌。凶服者式之，式负版者。有盛馔，必变色而作。迅雷风烈，必变。升车，必正立，执绥。车中不内顾，不疾言，不亲指。色斯举矣，翔而后集。曰：“山梁雌雉，时哉时哉！”子路共之，三嗅而作。"
          },
          {
            name: "论语·先进篇",
            content: "子曰：“先进于礼乐，野人也；后进于礼乐，君子也。如用之，则吾从先进。”子曰：“从我于陈、蔡者，皆不及门也。”德行：颜渊，闵子骞，冉伯牛，仲弓。言语：宰我，子贡。政事：冉有，季路。文学：子游，子夏。子曰：“回也非助我者也，于吾言无所不说。”子曰：“孝哉闵子骞！人不间于其父母昆弟之言。”南容三复白圭，孔子以其兄之子妻之。季康子问：“弟子孰为好学？”孔子对曰：“有颜回者好学，不幸短命死矣，今也则亡。”颜渊死，颜路请子之车以为之椁。子曰：“才不才，亦各言其子也。鲤也死，有棺而无椁，吾不徒行以为之椁。以吾从大夫之后，不可徒行也。”颜渊死。子曰：“噫！天丧予！天丧予！”颜渊死，子哭之恸，从者曰：“子恸矣！”曰：“有恸乎？非夫人之为恸而谁为？”颜渊死，门人欲厚葬之，子曰：“不可。”门人厚葬之，子曰：“回也视予犹父也，予不得视犹子也。非我也，夫二三子也！”季路问事鬼神，子曰：“未能事人，焉能事鬼？”曰：“敢问死。”曰：“未知生，焉知死？”闵子侍侧，訚訚如也；子路，行行如也；冉有、子贡，侃侃如也。子乐。“若由也，不得其死然。”鲁人为长府，闵子骞曰：“仍旧贯如之何？何必改作？”子曰：“夫人不言，言必有中。”子曰：“由之瑟奚为于丘之门？”门人不敬子路，子曰：“由也升堂矣，未入于室也。”子贡问：“师与商也孰贤？”子曰：“师也过，商也不及。”曰：“然则师愈与？”子曰：“过犹不及。”季氏富于周公，而求也为之聚敛而附益之。子曰：“非吾徒也，小子鸣鼓而攻之可也。”柴也愚，参也鲁，师也辟，由也喭。子曰：“回也其庶乎，屡空。赐不受命而货殖焉，亿则屡中。”子张问善人之道，子曰：“不践迹，亦不入于室。”子曰：“论笃是与，君子者乎，色庄者乎？”子路问：“闻斯行诸？”子曰：“有父兄在，如之何其闻斯行之？”冉有问：“闻斯行诸？”子曰：“闻斯行之。公西华曰：“由也问闻斯行诸，子曰‘有父兄在’；求也问闻斯行诸，子曰‘闻斯行之’赤也惑，敢问。”子曰：“求也退，故进之；由也兼人，故退之。”子畏于匡，颜渊后。子曰：“吾以女为死矣！”曰：“子在，回何敢死！”季子然问：“仲由、冉求可谓大臣与？”子曰：“吾以子为异之问，曾由与求之问。所谓大臣者，以道事君，不可则止。今由与求也，可谓具臣矣。”曰：“然则从之者与？”子曰：“弑父与君，亦不从也。”子路使子羔为费宰，子曰：“贼夫人之子。”子路曰：“有民人焉，有社稷焉，何必读书然后为学。”子曰：“是故恶夫佞者。”子路、曾皙、冉有、公西华侍坐，子曰：“以吾一日长乎尔，毋吾以也。居则曰‘不吾知也’如或知尔，则何以哉？”子路率尔而对曰：“千乘之国，摄乎大国之间，加之以师旅，因之以饥馑，由也为之，比及三年，可使有勇，且知方也。”夫子哂之。“求，尔何如？”对曰：“方六七十，如五六十，求也为之，比及三年，可使足民。如其礼乐，以俟君子。”“赤！尔何如？”对曰：“非曰能之，愿学焉。宗庙之事，如会同，端章甫，愿为小相焉。”“点，尔何如？”鼓瑟希，铿尔，舍瑟而作，对曰：“异乎三子者之撰。”子曰：“何伤乎？亦各言其志也。”曰：“暮春者，春服既成，冠者五六人，童子六七人，浴乎沂，风乎舞雩，咏而归。”夫子喟然叹曰：“吾与点也！”三子者出，曾皙后。曾皙曰：“夫三子者之言何如？”子曰：“亦各言其志也已矣。”曰：“夫子何哂由也？”曰：“为国以礼，其言不让，是故哂之。”“唯求则非邦也与？”“安见方六七十、如五六十而非邦也者？”“唯赤则非邦也与？”“宗庙会同，非诸侯而何？赤也为之小，孰能为之大？”"
          },
          {
            name: "论语·颜渊篇",
            content: "颜渊问仁，子曰：“克己复礼为仁。一日克己复礼，天下归仁焉。为仁由己，而由人乎哉？”颜渊曰：“请问其目？”子曰：“非礼勿视，非礼勿听，非礼勿言，非礼勿动。”颜渊曰：“回虽不敏，请事斯语矣。”仲弓问仁，子曰：“出门如见大宾，使民如承大祭。己所不欲，勿施于人。在邦无怨，在家无怨。”仲弓曰：“雍虽不敏，请事斯语矣。”司马牛问仁，子曰：“仁者，其言也讱。”曰：“其言也讱，斯谓之仁已乎？”子曰：“为之难，言之得无讱乎？”司马牛问君子，子曰：“君子不忧不惧。”曰：“不忧不惧，斯谓之君子已乎？”子曰：“内省不疚，夫何忧何惧？”司马牛忧曰：“人皆有兄弟，我独亡。”子夏曰：“商闻之矣：死生有命，富贵在天。君子敬而无失，与人恭而有礼，四海之内皆兄弟也。君子何患乎无兄弟也？”子张问明，子曰：“浸润之谮，肤受之愬，不行焉，可谓明也已矣；浸润之谮、肤受之愬不行焉，可谓远也已矣。”子贡问政，子曰：“足食，足兵，民信之矣。”子贡曰：“必不得已而去，于斯三者何先？”曰：“去兵。”子贡曰：“必不得已而去，于斯二者何先？”曰：“去食。自古皆有死，民无信不立。”棘子成曰：“君子质而已矣，何以文为？”子贡曰：“惜乎，夫子之说君子也！驷不及舌。文犹质也，质犹文也。虎豹之鞟犹犬羊之鞟。”哀公问于有若曰：“年饥，用不足，如之何？”有若对曰：“盍彻乎？”曰：“二，吾犹不足，如之何其彻也？”对曰：“百姓足，君孰与不足？百姓不足，君孰与足？”子张问崇德辨惑，子曰：“主忠信，徙义，崇德也。爱之欲其生，恶之欲其死；既欲其生又欲其死，是惑也。‘诚不以富，亦只以异。’”齐景公问政于孔子，孔子对曰：“君君，臣臣，父父，子子。”公曰：“善哉！信如君不君、臣不臣、父不父、子不子，虽有粟，吾得而食诸？”子曰：“片言可以折狱者，其由也与？”子路无宿诺。子曰：“听讼，吾犹人也。必也使无讼乎。”子张问政，子曰：“居之无倦，行之以忠。”子曰：“博学于文，约之以礼，亦可以弗畔矣夫。”子曰：“君子成人之美，不成人之恶；小人反是。”季康子问政于孔子，孔子对曰：“政者，正也。子帅以正，孰敢不正？”季康子患盗，问于孔子。孔子对曰：“苟子之不欲，虽赏之不窃。”季康子问政于孔子曰：“如杀无道以就有道，何如？”孔子对曰：“子为政，焉用杀？子欲善而民善矣。君子之德风，小人之德草，草上之风必偃。”子张问：“士何如斯可谓之达矣？”子曰：“何哉尔所谓达者？”子张对曰：“在邦必闻，在家必闻。”子曰：“是闻也，非达也。夫达也者，质直而好义，察言而观色，虑以下人。在邦必达，在家必达。夫闻也者，色取仁而行违，居之不疑。在邦必闻，在家必闻。”樊迟从游于舞雩之下，曰：“敢问崇德、修慝、辨惑。”子曰：“善哉问！先事后得，非崇德与？攻其恶，无攻人之恶，非修慝与？一朝之忿，忘其身，以及其亲，非惑与？”樊迟问仁，子曰：“爱人。”问知，子曰：“知人。”樊迟未达，子曰：“举直错诸枉，能使枉者直。”樊迟退，见子夏，曰：“乡也吾见于夫子而问知，子曰：‘举直错诸枉，能使枉者直’，何谓也？”子夏曰：“富哉言乎！舜有天下，选于众，举皋陶，不仁者远矣。汤有天下，选于众，举伊尹，不仁者远矣。”子贡问友，子曰：“忠告而善道之，不可则止，毋自辱焉。”曾子曰：“君子以文会友，以友辅仁。”"
          },
          {
            name: "论语·子路篇",
            content: "子路问政，子曰：“先之，劳之。”请益，曰：“无倦。”仲弓为季氏宰，问政，子曰：“先有司，赦小过，举贤才。”曰：“焉知贤才而举之？”曰：“举尔所知。尔所不知，人其舍诸？”子路曰：“卫君待子而为政，子将奚先？”子曰：“必也正名乎！”子路曰：“有是哉，子之迂也！奚其正？”子曰：“野哉由也！君子于其所不知，盖阙如也。名不正，则言不顺；言不顺，则事不成；事不成，则礼乐不兴；礼乐不兴，则刑罚不中；刑罚不中，则民无所措手足。故君子名之必可言也，言之必可行也。君子于其言，无所苟而已矣。”樊迟请学稼，子曰：“吾不如老农。”请学为圃，曰：“吾不如老圃。”樊迟出，子曰：“小人哉樊须也！上好礼，则民莫敢不敬；上好义，则民莫敢不服；上好信，则民莫敢不用情。夫如是，则四方之民襁负其子而至矣，焉用稼？”子曰：“诵《诗》三百，授之以政，不达；使于四方，不能专对；虽多，亦奚以为？”子曰：“其身正，不令而行；其身不正，虽令不从。”子曰：“鲁卫之政，兄弟也。”子谓卫公子荆，“善居室。始有，曰：‘苟合矣。’少有，曰：‘苟完矣。’富有，曰：‘苟美矣。’”子适卫，冉有仆，子曰：“庶矣哉！”冉有曰：“既庶矣，又何加焉？”曰：“富之。”曰：“既富矣，又何加焉？”曰：“教之。”子曰：“苟有用我者，期月而已可也，三年有成。”子曰：“‘善人为邦百年，亦可以胜残去杀矣。’诚哉是言也！”子曰：“如有王者，必世而后仁。”子曰：“苟正其身矣，于从政乎何有？不能正其身，如正人何？”冉子退朝，子曰：“何晏也？”对曰：“有政。”子曰：“其事也。如有政，虽不吾以，吾其与闻之。”定公问：“一言而可以兴邦，有诸？”孔子对曰：“言不可以若是，其几也。人之言曰：‘为君难，为臣不易。’如知为君之难也，不几乎一言而兴邦乎？”曰：“一言而丧邦，有诸？”孔子对曰：“言不可以若是其几也。人之言曰：‘予无乐乎为君，唯其言而莫予违也。’如其善而莫之违也，不亦善乎？如不善而莫之违也，不几乎一言而丧邦乎？”叶公问政，子曰：“近者说，远者来。”子夏为莒父宰，问政，子曰：“无欲速，无见小利。欲速则不达，见小利则大事不成。”叶公语孔子曰：“吾党有直躬者，其父攘羊，而子证之。”孔子曰：“吾党之直者异于是。父为子隐，子为父隐，直在其中矣。”樊迟问仁，子曰：“居处恭，执事敬，与人忠。虽之夷狄，不可弃也。”子贡问曰：“何如斯可谓之士矣？”子曰：“行己有耻，使于四方不辱君命，可谓士矣。”曰：“敢问其次。”曰：“宗族称孝焉，乡党称弟焉。”曰：“敢问其次。”曰：“言必信，行必果，硁硁然小人哉！抑亦可以为次矣。”曰：“今之从政者何如？”子曰：“噫！斗筲之人，何足算也！”子曰：“不得中行而与之，必也狂狷乎！狂者进取，狷者有所不为也。”子曰：“南人有言曰：‘人而无恒，不可以作巫医。’善夫！”“不恒其德，或承之羞。”子曰：“不占而已矣。”子曰：“君子和而不同，小人同而不和。”子贡问曰：“乡人皆好之，何如？”子曰：“未可也。”“乡人皆恶之，何如？”子曰：“未可也。不如乡人之善者好之，其不善者恶之。”子曰：“君子易事而难说也，说之不以道不说也，及其使人也器之；小人难事而易说也，说之虽不以道说也，及其使人也求备焉。”子曰：“君子泰而不骄，小人骄而不泰。”子曰：“刚、毅、木、讷近仁。”子路问曰：“何如斯可谓之士矣？”子曰：“切切偲偲，怡怡如也，可谓士矣。朋友切切偲偲，兄弟怡怡。”子曰：“善人教民七年，亦可以即戎矣。”子曰：“以不教民战，是谓弃之。”"
          },
          {
            name: "论语·宪问篇",
            content: "宪问耻，子曰：“邦有道，谷；邦无道，谷，耻也。”“克、伐、怨、欲不行焉，可以为仁矣？”子曰：“可以为难矣，仁则吾不知也。”子曰：“士而怀居，不足以为士矣。”子曰：“邦有道，危言危行；邦无道，危行言孙。”子曰：“有德者必有言，有言者不必有德。仁者必有勇，勇者不必有仁。”南宫适问于孔子曰：“羿善射，奡荡舟，俱不得其死然；禹、稷躬稼而有天下。”夫子不答。南宫适出，子曰：“君子哉若人！尚德哉若人！”子曰：“君子而不仁者有矣夫，未有小人而仁者也。”子曰：“爱之，能勿劳乎？忠焉，能勿诲乎？”子曰：“为命，裨谌草创之，世叔讨论之，行人子羽修饰之，东里子产润色之。”或问子产，子曰：“惠人也。”问子西，曰：“彼哉，彼哉！”问管仲，曰：“人也。夺伯氏骈邑三百，饭疏食，没齿无怨言。”子曰：“贫而无怨难，富而无骄易。”子曰：“孟公绰为赵、魏老则优，不可以为滕、薛大夫。”子路问成人，子曰：“若臧武仲之知、公绰之不欲、卞庄子之勇、冉求之艺，文之以礼乐，亦可以为成人矣。”曰：“今之成人者何必然？见利思义，见危授命，久要不忘平生之言，亦可以为成人矣。”子问公叔文子于公明贾曰：“信乎，夫子不言，不笑，不取乎？”公明贾对曰：“以告者过也。夫子时然后言，人不厌其言；乐然后笑，人不厌其笑；义然后取，人不厌其取。”子曰：“其然？岂其然乎？”子曰：“臧武仲以防求为后于鲁，虽曰不要君，吾不信也。”子曰：“晋文公谲而不正，齐桓公正而不谲。”子路曰：“桓公杀公子纠，召忽死之，管仲不死，曰未仁乎？”子曰：“桓公九合诸侯不以兵车，管仲之力也。如其仁，如其仁！”子贡曰：“管仲非仁者与？桓公杀公子纠，不能死，又相之。”子曰：“管仲相桓公霸诸侯，一匡天下，民到于今受其赐。微管仲，吾其被发左衽矣。岂若匹夫匹妇之为谅也，自经于沟渎而莫之知也。”公叔文子之臣大夫僎与文子同升诸公，子闻之,曰：“可以为‘文’矣。”子言卫灵公之无道也，康子曰：“夫如是，奚而不丧？”孔子曰：“仲叔圉治宾客，祝鮀治宗庙，王孙贾治军旅，夫如是，奚其丧？”子曰：“其言之不怍，则为之也难。”陈成子弑简公，孔子沐浴而朝，告于哀公曰：“陈恒弑其君，请讨之。”公曰：“告夫三子。”,孔子曰：“以吾从大夫之后，不敢不告也，君曰‘告夫三子’者！”之三子告，不可。孔子曰：“以吾从大夫之后，不敢不告也。”子路问事君，子曰：“勿欺也，而犯之。”子曰：“君子上达，小人下达。”子曰：“古之学者为己，今之学者为人。”蘧伯玉使人于孔子，孔子与之坐而问焉，曰：“夫子何为？”对曰：“夫子欲寡其过而未能也。”使者出，子曰：“使乎！使乎！”子曰：“不在其位，不谋其政。”曾子曰：“君子思不出其位。”子曰：“君子耻其言而过其行。”子曰：“君子道者三，我无能焉：仁者不忧，知者不惑，勇者不惧。”子贡曰：“夫子自道也。”子贡方人，子曰：“赐也贤乎哉？夫我则不暇。”子曰：“不患人之不己知，患其不能也。”子曰：“不逆诈，不亿不信，抑亦先觉者，是贤乎！”微生亩谓孔子曰：“丘何为是栖栖者与？无乃为佞乎？”孔子曰：“非敢为佞也，疾固也。”子曰：“骥不称其力，称其德也。”或曰：“以德报怨，何如？”子曰：“何以报德？以直报怨，以德报德。”子曰：“莫我知也夫！”子贡曰：“何为其莫知子也？”子曰：“不怨天，不尤人，下学而上达。知我者其天乎！”公伯寮愬子路于季孙。子服景伯以告，曰：“夫子固有惑志于公伯寮，吾力犹能肆诸市朝。”子曰：“道之将行也与，命也；道之将废也与，命也。公伯寮其如命何？”子曰：“贤者辟世，其次辟地，其次辟色，其次辟言。”子曰：“作者七人矣。”子路宿于石门，晨门曰：“奚自？”子路曰：“自孔氏。”曰：“是知其不可而为之者与？”子击磬于卫，有荷蒉而过孔氏之门者，曰：“有心哉，击磬乎！”既而曰：“鄙哉，硁硁乎！莫己知也，斯已而已矣。深则厉，浅则揭。”子曰：“果哉！末之难矣。”子张曰：“《书》云，‘高宗谅阴，三年不言。’何谓也？”子曰：“何必高宗，古之人皆然。君薨，百官总己以听于冢宰三年。”子曰：“上好礼，则民易使也。”子路问君子，子曰：“修己以敬。”曰：“如斯而已乎？”曰：“修己以安人。”曰：“如斯而已乎？”曰：“修己以安百姓。修己以安百姓，尧、舜其犹病诸！”原壤夷俟，子曰：“幼而不孙弟，长而无述焉，老而不死，是为贼！”以杖叩其胫。阙党童子将命，或问之曰：“益者与？”子曰：“吾见其居于位也，见其与先生并行也。非求益者也，欲速成者也。”"
          },
          {
            name: "论语·卫灵公篇",
            content: "卫灵公问陈于孔子，孔子对曰：“俎豆之事，则尝闻之矣；军旅之事，未之学也。”明日遂行。在陈绝粮，从者病莫能兴。子路愠见曰：“君子亦有穷乎？”子曰：“君子固穷，小人穷斯滥矣。”子曰：“赐也，女以予为多学而识之者与？”对曰：“然，非与？”曰：“非也，予一以贯之。”子曰：“由，知德者鲜矣。”子曰：“无为而治者其舜也与！夫何为哉？恭己正南面而已矣。”子张问行，子曰：“言忠信，行笃敬，虽蛮貊之邦行矣；言不忠信，行不笃敬，虽州里行乎哉？立则见其参于前也；在舆则见其倚于衡也，夫然后行。”子张书诸绅。子曰：“直哉史鱼！邦有道如矢，邦无道如矢。君子哉蘧伯玉！邦有道则仕，邦无道则可卷而怀之。”子曰：“可与言而不与之言，失人；不可与言而与之言，失言。知者不失人亦不失言。”子曰：“志士仁人无求生以害仁，有杀身以成仁。”子贡问为仁，子曰：“工欲善其事，必先利其器。居是邦也，事其大夫之贤者，友其士之仁者。”颜渊问为邦，子曰：“行夏之时，乘殷之辂，服周之冕，乐则《韶》《舞》；放郑声，远佞人。郑声淫，佞人殆。”子曰：“人无远虑，必有近忧。”子曰：“已矣乎！吾未见好德如好色者也。”子曰：“臧文仲其窃位者与！知柳下惠之贤而不与立也。”子曰：“躬自厚而薄责于人，则远怨矣。”子曰：“不曰‘如之何、如之何’者，吾末如之何也已矣。”子曰：“群居终日，言不及义，好行小慧，难矣哉！”子曰：“君子义以为质，礼以行之，孙以出之，信以成之。君子哉！”子曰：“君子病无能焉，不病人之不己知也。”子曰：“君子疾没世而名不称焉。”子曰：“君子求诸己，小人求诸人。”子曰：“君子矜而不争，群而不党。”子曰：“君子不以言举人，不以人废言。”子贡问曰：“有一言而可以终身行之者乎？”子曰：“其恕乎！己所不欲，勿施于人。”子曰：“吾之于人也，谁毁谁誉？如有所誉者，其有所试矣。斯民也，三代之所以直道而行也。”子曰：“吾犹及史之阙文也，有马者借人乘之，今亡矣夫！”子曰：“巧言乱德，小不忍，则乱大谋。”子曰：“众恶之，必察焉；众好之，必察焉。”子曰：“人能弘道，非道弘人。”子曰：“过而不改，是谓过矣。”子曰：“吾尝终日不食、终夜不寝以思，无益，不如学也。”子曰：“君子谋道不谋食。耕也馁在其中矣，学也禄在其中矣。君子忧道不忧贫。”子曰：“知及之，仁不能守之，虽得之，必失之；知及之，仁能守之，不庄以莅之，则民不敬；知及之，仁能守之，庄以莅之，动之不以礼，未善也。”子曰：“君子不可小知而可大受也，小人不可大受而可小知也。”子曰：“民之于仁也，甚于水火。水火，吾见蹈而死者矣，未见蹈仁而死者也。”子曰：“当仁不让于师。”子曰：“君子贞而不谅。”子曰：“事君，敬其事而后其食。”子曰：“有教无类。”子曰：“道不同，不相为谋。”子曰：“辞达而已矣。”师冕见，及阶，子曰：“阶也。”及席，子曰：“席也。”皆坐，子告之曰：“某在斯，某在斯。”师冕出。子张问曰：“与师言之道与？”子曰：“然，固相师之道也。”"
          },
          {
            name: "论语·季氏篇",
            content: "季氏将伐颛臾，冉有、季路见于孔子，曰：“季氏将有事于颛臾。”孔子曰：“求，无乃尔是过与？夫颛臾，昔者先王以为东蒙主，且在邦域之中矣，是社稷之臣也。何以伐为？”冉有曰：“夫子欲之，吾二臣者皆不欲也。”孔子曰：“求，周任有言曰：‘陈力就列，不能者止。’危而不持，颠而不扶，则将焉用彼相矣？且尔言过矣，虎兕出于柙，龟玉毁于椟中，是谁之过与？”冉有曰：“今夫颛臾固而近于费，今不取，后世必为子孙忧。”孔子曰：“求，君子疾夫舍曰欲之而必为之辞。丘也闻，有国有家者，不患寡而患不均，不患贫而患不安。盖均无贫，和无寡，安无倾。夫如是，故远人不服则修文德以来之，既来之，则安之。今由与求也相夫子，远人不服而不能来也，邦分崩离析而不能守也，而谋动干戈于邦内。吾恐季孙之忧不在颛臾，而在萧墙之内也。”孔子曰：“天下有道，则礼乐征伐自天子出；天下无道，则礼乐征伐自诸侯出。自诸侯出，盖十世希不失矣；自大夫出，五世希不失矣；陪臣执国命，三世希不失矣。天下有道，则政不在大夫；天下有道，则庶人不议。”孔子曰：“禄之去公室五世矣，政逮于大夫四世矣，故夫三桓之子孙微矣。”孔子曰：“益者三友，损者三友。友直、友谅、友多闻，益矣；友便辟、友善柔、友便佞，损矣。”孔子曰：“益者三乐，损者三乐。乐节礼乐、乐道人之善、乐多贤友，益矣；乐骄乐、乐佚游、乐宴乐，损矣。”孔子曰：“侍于君子有三愆：言未及之而言谓之躁，言及之而不言谓之隐，未见颜色而言谓之瞽。”孔子曰：“君子有三戒：少之时，血气未定，戒之在色；及其壮也，血气方刚，戒之在斗；及其老也，血气既衰，戒之在得。”孔子曰：“君子有三畏：畏天命，畏大人，畏圣人之言。小人不知天命而不畏也，狎大人，侮圣人之言。”孔子曰：“生而知之者上也，学而知之者次也；困而学之又其次也。困而不学，民斯为下矣。”孔子曰：“君子有九思：视思明，听思聪，色思温，貌思恭，言思忠，事思敬，疑思问，忿思难，见得思义。”孔子曰：“见善如不及，见不善如探汤；吾见其人矣。吾闻其语矣。隐居以求其志，行义以达其道；吾闻其语矣，未见其人也。”齐景公有马千驷，死之日，民无德而称焉；伯夷、叔齐饿于首阳之下，民到于今称之。其斯之谓与？”陈亢问于伯鱼曰：“子亦有异闻乎？”对曰：“未也。尝独立，鲤趋而过庭，曰：‘学《诗》乎？’对曰：‘未也。’‘不学《诗》，无以言。’鲤退而学《诗》。他日，又独立，鲤趋而过庭，曰：‘学《礼》乎？’对曰：‘未也。’‘不学《礼》，无以立。’鲤退而学《礼》。闻斯二者。”陈亢退而喜曰：“问一得三，闻《诗》，闻《礼》，又闻君子之远其子也。”邦君之妻，君称之曰夫人，夫人自称曰小童；邦人称之曰君夫人，称诸异邦曰寡小君；异邦人称之亦曰君夫人。"
          },
          {
            name: "论语·子张篇",
            content: "子张曰：“士见危致命，见得思义，祭思敬，丧思哀，其可已矣。”子张曰：“执德不弘，信道不笃，焉能为有？焉能为亡？”子夏之门人问交于子张，子张曰：“子夏云何？”对曰：“子夏曰：‘可者与之，其不可者拒之。’”子张曰：“异乎吾所闻。君子尊贤而容众，嘉善而矜不能。我之大贤与，于人何所不容？我之不贤与，人将拒我，如之何其拒人也？”子夏曰：“虽小道必有可观者焉，致远恐泥，是以君子不为也。”子夏曰：“日知其所亡，月无忘其所能，可谓好学也已矣。”子夏曰：“博学而笃志，切问而近思，仁在其中矣。”子夏曰：“百工居肆以成其事，君子学以致其道。”子夏曰：“小人之过也必文。”子夏曰：“君子有三变：望之俨然，即之也温，听其言也厉。”子夏曰：“君子信而后劳其民，未信，则以为厉己也；信而后谏，未信，则以为谤己也。”子夏曰：“大德不逾闲，小德出入可也。”子游曰：“子夏之门人小子，当洒扫应对进退则可矣。抑末也，本之则无，如之何？”子夏闻之，曰：“噫，言游过矣！君子之道，孰先传焉？孰后倦焉？譬诸草木，区以别矣。君子之道焉可诬也？有始有卒者，其惟圣人乎！”子夏曰：“仕而优则学，学而优则仕。”子游曰：“丧致乎哀而止。”子游曰：“吾友张也为难能也，然而未仁。”曾子曰：“堂堂乎张也，难与并为仁矣。”曾子曰：“吾闻诸夫子，人未有自致者也，必也亲丧乎！”曾子曰：“吾闻诸夫子，孟庄子之孝也，其他可能也；其不改父之臣与父之政，是难能也。”孟氏使阳肤为士师，问于曾子。曾子曰：“上失其道，民散久矣。如得其情，则哀矜而勿喜！”子贡曰：“纣之不善，不如是之甚也。是以君子恶居下流，天下之恶皆归焉。”子贡曰：“君子之过也，如日月之食焉。过也，人皆见之；更也，人皆仰之。”卫公孙朝问于子贡曰：“仲尼焉学？”子贡曰：“文武之道未坠于地，在人。贤者识其大者，不贤者识其小者，莫不有文武之道焉，夫子焉不学？而亦何常师之有？”叔孙武叔语大夫于朝曰：“子贡贤于仲尼。”子服景伯以告子贡，子贡曰：“譬之宫墙，赐之墙也及肩，窥见室家之好；夫子之墙数仞，不得其门而入，不见宗庙之美、百官之富。得其门者或寡矣，夫子之云不亦宜乎！”叔孙武叔毁仲尼，子贡曰：“无以为也，仲尼不可毁也。他人之贤者，丘陵也，犹可逾也；仲尼，日月也，无得而逾焉。人虽欲自绝，其何伤于日月乎？多见其不知量也。”陈子禽谓子贡曰：“子为恭也，仲尼岂贤于子乎？”子贡曰：“君子一言以为知，一言以为不知，言不可不慎也。夫子之不可及也，犹天之不可阶而升也。夫子之得邦家者，所谓立之斯立，道之斯行，绥之斯来，动之斯和。其生也荣，其死也哀，如之何其可及也？”"
          },
          {
            name: "中庸·第一章",
            content: "天命之谓性；率性之谓道；修道之谓教。道也者，不可须臾离也；可离，非道也。是故君子戒慎乎其所不睹，恐惧乎其所不闻。莫见乎隐，莫显乎微。故君子慎其独也。喜、怒、哀、乐之未发，谓之中。发而皆中节，谓之和。中也者，天下之大本也。和也者，天下之达道也。致中和，天地位焉，万物育焉。"
          },
          {
            name: "中庸·第二章",
            content: "仲尼曰：“君子中庸；小人反中庸。”“君子之中庸也，君子而时中。小人之反中庸也，小人而无忌惮也。”"
          },
          {
            name: "中庸·第三章",
            content: "子曰：“中庸其至矣乎！民鲜能久矣。”"
          },
          {
            name: "中庸·第四章",
            content: "子曰：“道之不行也，我知之矣：知者过之；愚者不及也。道之不明也，我知之矣：贤者过之；不肖者不及也。”“人莫不饮食也。鲜能知味也。”"
          },
          {
            name: "中庸·第五章",
            content: "子曰：“道其不行矣夫。”"
          },
          {
            name: "孟子·梁惠王章句上·第一节",
            content: "孟子见梁惠王。王曰：“叟！不远千里而来，亦将有以利吾国乎？”孟子对曰：“王何必曰利？亦有仁义而已矣。王曰：‘何以利吾国？’大夫曰：‘何以利吾家？’士庶人曰：‘何以利吾身？’上下交征利而国危矣。万乘之国，弑其君者，必千乘之家；千乘之国，弑其君者，必百乘之家。万取千焉，千取百焉，不为不多矣。苟为后义而先利，不夺不餍。未有仁而遗其亲者也，未有义而后其君者也。王亦曰仁义而已矣，何必曰利？”"
          },
          {
            name: "孟子·公孙丑章句上·第一节",
            content: "公孙丑问曰：“夫子当路于齐，管仲、晏子之功，可复许乎？”孟子曰：“子诚齐人也，知管仲、晏子而已矣。或问乎曾西曰；‘吾子与子路孰贤？’曾西蹙然曰：‘吾先子之所畏也。’曰：‘然则吾子与管仲孰贤？’曾西艴然不悦，曰：‘尔何曾比予于管仲？管仲得君，如彼其专也；行乎国政，如彼其久也；功烈，如彼其卑也。尔何曾比予于是？’曰：“管仲，曾西之所不为也，而子为我愿之乎？曰：“管仲以其君霸，晏子以其君显。管仲、晏子犹不足为与？曰：“以齐王，由反手也。曰：“若是，则弟子之惑滋甚。且以文王之德，百年而后崩，犹未洽于天下；武王、周公继之，然后大行。今言王若易然，则文王不足法与？曰：“文王何可当也？由汤至于武丁，贤圣之君六七作。天下归殷久矣，久则难变也。武丁朝诸侯有天下，犹运之掌也。纣之去武丁未久也，其故家遗俗，流风善政，犹有存者；又有微子、微仲、王子比干、箕子、胶鬲皆贤人也，相与辅相之，故久而后失之也。尺地莫非其有也，一民莫非其臣也，然而文王犹方百里起，是以难也。齐人有言曰：‘虽有智慧，不如乘势；虽有镃基，不如待时。’今时则易然也。夏后、殷、周之盛，地未有过千里者也，而齐有其地矣；鸡鸣狗吠相闻，而达乎四境，而齐有其民矣。地不改辟矣，民不改聚矣，行仁政而王，莫之能御也。且王者之不作，未有疏于此时者也；民之憔悴于虐政，未有甚于此时者也。饥者易为食，渴者易为饮。孔子曰：‘德之流行，速于置邮而传命。’当今之时，万乘之国行仁政，民之悦之，犹解倒悬也。故事半古之人，功必倍之，惟此时为然。”"
          },
          {
            name: "孟子·滕文公章句上·第一节",
            content: "滕文公为世子，将之楚，过宋而见孟子。孟子道性善，言必称尧舜。世子自楚反，复见孟子。孟子曰：“世子疑吾言乎？夫道一而已矣。成覸谓齐景公曰：‘彼丈夫也，我丈夫也，吾何畏彼哉？’颜渊曰：‘舜何人也？予何人也？有为者亦若是。’公明仪曰：‘文王我师也，周公岂欺我哉？’今滕，绝长补短，将五十里也，犹可以为善国。书曰：‘若药不瞑眩，厥疾不瘳。’”"
          },
          {
            name: "孟子·离娄章句上·第一节",
            content: "孟子曰：“离娄之明，公输子之巧，不以规矩，不能成方圆；师旷之聪，不以六律，不能正五音；尧舜之道，不以仁政，不能平治天下。今有仁心仁闻而民不被其泽，不可法于后世者，不行先王之道也。故曰，徒善不足以为政，徒法不能以自行。诗云：‘不愆不忘，率由旧章。’遵先王之法而过者，未之有也圣人既竭目力焉，继之以规矩准绳，以为方员平直，不可胜用也；既竭耳力焉，继之以六律，正五音，不可胜用也；既竭心思焉，继之以不忍人之政，而仁覆天下矣。故曰，为高必因丘陵，为下必因川泽。为政不因先王之道，可谓智乎？是以惟仁者宜在高位。不仁而在高位，是播其恶于众也上无道揆也，下无法守也。朝不信道，工不信度。君子犯义，小人犯刑，国之所存者幸也。故曰：城郭不完，兵甲不多，非国之灾也；田野不辟，货财不聚，非国之害也。上无礼，下无学，贼民兴，丧无日矣诗曰：‘天之方蹶，无然泄泄。’泄泄，犹沓沓也。事君无义，进退无礼，言则非先王之道者，犹沓沓也。故曰：责难于君谓之恭，陈善闭邪谓之敬，吾君不能谓之贼。”"
          },
          {
            name: "孟子·万章章句上·第一节",
            content: "万章问曰：“舜往于田，号泣于旻天，何为其号泣也？”孟子曰：“怨慕也。”万章曰：“父母爱之，喜而不忘；父母恶之，劳而不怨。然则舜怨乎？曰：“长息问于公明高曰：‘舜往于田，则吾既得闻命矣；号泣于旻天，于父母，则吾不知也。’公明高曰：‘是非尔所知也。’夫公明高以孝子之心，为不若是恝，我竭力耕田，共为子职而已矣，父母之不我爱，于我何哉？帝使其子九男二女，百官牛羊仓廪备，以事舜于畎亩之中。天下之士多就之者，帝将胥天下而迁之焉。为不顺于父母，如穷人无所归。天下之士悦之，人之所欲也，而不足以解忧；好色，人之所欲，妻帝之二女，而不足以解忧；富，人之所欲，富有天下，而不足以解忧；贵，人之所欲，贵为天子，而不足以解忧。人悦之、好色、富贵，无足以解忧者，惟顺于父母，可以解忧。人少，则慕父母；知好色，则慕少艾；有妻子，则慕妻子；仕则慕君，不得于君则热中。大孝终身慕父母。五十而慕者，予于大舜见之矣。”"
          },
          {
            name: "孟子·告子章句上·第四节",
            content: "告子曰：“食色，性也。仁，内也，非外也；义，外也，非内也。”孟子曰：“何以谓仁内义外也？曰：“彼长而我长之，非有长于我也；犹彼白而我白之，从其白于外也，故谓之外也。曰：“异于白马之白也，无以异于白人之白也；不识长马之长也，无以异于长人之长与？且谓长者义乎？长之者义乎？曰：“吾弟则爱之，秦人之弟则不爱也，是以我为悦者也，故谓之内。长楚人之长，亦长吾之长，是以长为悦者也，故谓之外也。曰：“耆秦人之炙，无以异于耆吾炙。夫物则亦有然者也，然则耆炙亦有外与？”"
          },
          {
            name: "大学·第一章",
            content: "大学之道，在明明德，在亲民，在止于至善。知止而后有定，定而后能静，静而后能安，安而后能虑，虑而后能得。物有本末，事有终始。知所先后，则近道矣。古之欲明明德于天下者，先治其国；欲治其国者，先齐其家；欲齐其家者，先修其身；欲修其身者，先正其心；欲正其心者，先诚其意；欲诚其意者，先致其知。致知在格物。物格而后知至，知至而后意诚，意诚而后心正，心正而后身修，身修而后家齐，家齐而后国治，国治而后天下平。自天子以至于庶人，壹是皆以修身为本。其本乱而末治者，否矣。其所厚者薄，而其所薄者厚，未之有也。此谓知本，此谓知之至也。"
          },
          {
            name: "大学·第二章",
            content: "《康诰》曰：“克明德。”《大甲》曰：“顾諟天之明命。”《帝典》曰：“克明峻德。”皆自明也。"
          },
          {
            name: "大学·第三章",
            content: "汤之《盘铭》曰：“苟日新，日日新，又日新。”《康诰》曰：“作新民。”《诗》曰：“周虽旧邦，其命维新。”是故君子无所不用其极。"
          },
          {
            name: "大学·第四章",
            content: "《诗》云：“邦畿千里，维民所止。”《诗》云：“缗蛮黄鸟，止于丘隅。” 子曰：“于止，知其所止，可以人而不如鸟乎？”《诗》云：“穆穆文王，於缉熙敬止！”为人君，止于仁；为人臣，止于敬；为人子，止于孝；为人父，止于慈；与国人交，止于信。《诗》云：“瞻彼淇澳，菉竹猗猗。有匪君子，如切如磋，如琢如磨。瑟兮僴兮，赫兮喧兮。有匪君子，终不可谖兮！”“如切如磋”者，道学也。“如琢如磨”者，自修也。“瑟兮僴兮”者，恂栗也。“赫兮喧兮”者，威仪也。“有匪君子，终不可谖兮”者，道盛德至善，民之不能忘也。《诗》云：“於戏，前王不忘！”君子贤其贤而亲其亲，小人乐其乐而利其利，此以没世不忘也。"
          },
          {
            name: "大学·第五章",
            content: "子曰：“听讼，吾犹人也。必也使无讼乎！”无情者不得尽其辞。大畏民志，此谓知本。此谓知本，此谓知之至也。"
          },
          {
            name: "周易·系辞传上·第八章-二人同心，其利断金。同心之言，其臭如兰",
            content: "圣人有以见天下之赜，而拟诸其形容，像其物宜，是故谓之象。圣人有以见天下之动，而观其会通，以行其典礼，系辞焉以断其吉凶，是故谓之爻。言天下之至赜而不可恶也。言天下之至动而不可乱也。拟之而后言，议之而后动，拟议以成其变化。“鸣鹤在阴，其子和之。我有好爵，吾与尔靡之。”子曰：“君子居其室，出其言善，则千里之外应之，况其迩者乎？居其室，出其言不善，则千里之外违之，况其迩者乎？言出乎身，加乎民；行发乎迩，见乎远。言行，君子之枢机。枢机之发，荣辱之主也。言行，君子之所以动天地也，可不慎乎！”《同人》：先号啕而后笑。子曰：“君子之道，或出或处，或默或语。二人同心，其利断金。同心之言，其臭如兰。”初六，藉用白茅，无咎。子曰：“苟错诸地而可矣，藉之用茅，何咎之有？慎之至也。夫茅之为物薄，而用可重也。慎斯术也以往，其无所失矣。”劳谦，君子有终，吉。子曰：“劳而不伐，有功而不德，厚之至也。语以其功下人者也。德言盛，礼言恭；谦也者，致恭以存其位者也。”亢龙有悔。子曰：“贵而无位，高而无民，贤人在下位而无辅，是以动而有悔也。”不出户庭，无咎。子曰：“乱之所生也，则言语以为阶。君不密则失臣，臣不密则失身，几事不密则害成。是以君子慎密而不出也。”子曰：“作《易》者，其知盗乎？《易》曰‘负且乘，致寇至。’负也者，小人之事也。乘也者，君子之器也。小人而乘君子之器，盗思夺之矣。上慢下暴，盗思伐之矣。慢藏诲盗，冶容诲淫。《易》曰：‘负且乘，致寇至。’盗之招也。”"
          },
          {
            name: "周易·系辞传下·第二章-穷则变，变则通，通则久",
            content: "古者包羲氏之王天下也，仰则观象于天，俯则观法于地，观鸟兽之文与地之宜，近取诸身，远取诸物，于是始作八卦，以通神明之德，以类万物之情。作结绳而为网罟，以佃以渔，盖取诸离。包羲氏没，神农氏作，斫木为耜，揉木为耒，耒耨之利，以教天下，盖取诸《益》。日中为市，致天下之民，聚天下之货，交易而退，各得其所，盖取诸《噬嗑》。神农氏没，黄帝、尧、舜氏作，通其变，使民不倦，神而化之，使民宜之。《易》穷则变，变则通，通则久。是以“自天佑之，吉无不利”。黄帝、尧、舜垂衣裳而天下治，盖取诸乾、坤。刳木为舟，剡木为楫，舟楫之利，以济不通，致远以利天下，盖取诸涣。服牛乘马，引重致远，以利天下，盖取诸随。重门击柝，以待暴客，盖取诸豫。断木为杵，掘地为臼，杵臼之利，万民以济，盖取诸小过。弦木为弧，剡木为矢，弧矢之利，以威天下，盖取诸睽。上古穴居而野处，后世圣人易之以宫室，上栋下宇，以待风雨，盖取诸大壮。古之葬者，厚衣之以薪，葬之中野，不封不树，丧期无数。后世圣人易之以棺椁，盖取诸大过。上古结绳而治，后世圣人易之以书契，百官以治，万民以察，盖取诸夬。"
          },
          {
            name: "周易·系辞传下·第五章-君子藏器于身，待时而动",
            content: "《易》曰“憧憧往来，朋从尔思。”子曰：“天下何思何虑？天下同归而殊途，一致而百虑。天下何思何虑？日往则月来，月往则日来，日月相推而明生焉。寒往则暑来，暑往则寒来，寒暑相推而岁成焉。往者屈也，来者信也，屈信相感而利生焉。尺蠖之屈，以求信也；龙蛇之蛰，以存身也。精义入神，以致用也；利用安身，以崇德也。过此以往，未之或知也；穷神知化，德之盛也。”《易》曰：“困于石，据于蒺藜，入于其宫，不见其妻，凶。”子曰：“非所困而困焉，名必辱。非所据而据焉，身必危。既辱且危，死期将至，妻其可得见耶！”《易》曰：“公用射隼于高墉之上，获之，无不利。”子曰：“隼者，禽也；弓矢者，器也；射之者，人也。君子藏器于身，待时而动，何不利之有？动而不括，是以出而有获，语成器而动者也。”子曰：“小人不耻不仁，不畏不义，不见利不劝，不威不惩。小惩而大诫，此小人之福也。《易》曰：‘履校灭趾，无咎。’此之谓也。”“善不积不足以成名，恶不积不足以灭身。小人以小善为无益而弗为也，以小恶为无伤而弗去也，故恶积而不可掩，罪大而不可解。《易》曰：‘何校灭耳，凶。’”子曰：“危者，安其位者也；亡者，保其存者也；乱者，有其治者也。是故君子安而不忘危，存而不忘亡，治而不忘乱，是以身安而国家可保也。《易》曰：‘其亡其亡，系于苞桑。’”子曰：“德薄而位尊，知小而谋大，力少而任重，鲜不及矣。《易》曰：‘鼎折足，覆公餗，其形渥，凶。’言不胜其任也。”子曰：“知几其神乎！君子上交不谄，下交不渎，其知几乎？几者，动之微，吉之先见者也。君子见几而作，不俟终日。《易》曰：‘介于石，不终日，贞吉。’介如石焉，宁用终日？断可识矣。君子知微知彰，知柔知刚，万夫之望。” 子曰：“颜氏之子，其殆庶几乎？有不善未尝不知，知之未尝复行也。《易》曰：‘不远复，无祗悔，元吉。’”天地氤氲，万物化醇。男女构精，万物化生。《易》曰：‘三人行则损一人，一人行则得其友。’言致一也。子曰：“君子安其身而后动，易其心而后语，定其交而后求。君子修此三者，故全也。危以动，则民不与也；惧以语，则民不应也；无交而求，则民不与也；莫之与，则伤之者至矣。《易》曰：‘莫益之，或击之，立心勿恒，凶。’”"
          },
          {
            name: "周易·象传上·乾-天行健；君子以自强不息",
            content: "天行健；君子以自强不息。潜龙勿用，阳在下也。见龙在田，德施普也。终日乾乾，反复道也。或跃在渊，进无咎也。飞龙在天，大人造也。亢龙有悔，盈不可久也。用九，天德不可为首也。"
          },
          {
            name: "周易·象传上·坤-地势，坤；君子以厚德载物",
            content: "地势，坤；君子以厚德载物。履霜坚冰，阴始凝也。驯致其道，至坚冰也。六二之动，直以方也。不习无不利，地道光也。含章可贞，以时发也。或从王事，知光大也。括囊无咎，慎不害也。黄裳元吉，文在中也。龙战于野，其道穷也。用六永贞，以大终也。"
          },
          {
            name: "周易·象传上·谦-谦谦君子，卑以自牧",
            content: "地中有山，谦；君子以裒多益寡，称物平施。谦谦君子，卑以自牧也。鸣谦贞吉，中心得也。劳谦君子，万民服也。无不利撝谦，不违则也。利用侵伐，征不服也。鸣谦，志未得也。可用行师，征邑国也。"
          },
          {
            name: "周易·象传上·益-君子以见善则迁，有过则改。",
            content: "风雷，益；君子以见善则迁，有过则改。元吉无咎，下不厚事也。或益之，自外来也。益用凶事，固有之也。告公从，以益志也。有孚惠心，勿问之矣。惠我德，大得志也。莫益之，偏辞也。或击之，自外来也。"
          },
          {
            name: "周易·象传下·家人-君子以言有物而行有恒",
            content: "风自火出，家人；君子以言有物而行有恒。闲有家，志未变也。六二之吉，顺以巽也。家人嗃嗃，未失也。妇子嘻嘻，失家节也。富家大吉，顺在位也。王假有家，交相爱也。威如之吉，反身之谓也。"
          },
          {
            name: "孟子·生于忧患，死于安乐",
            content: "舜发于畎亩之中，傅说举于版筑之间，胶鬲举于鱼盐之中，管夷吾举于士，孙叔敖举于海，百里奚举于市。故天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为，所以动心忍性，曾益其所不能。人恒过，然后能改；困于心，衡于虑，而后作；征于色，发于声，而后喻。入则无法家拂士，出则无敌国外患者，国恒亡。然后知生于忧患而死于安乐也。"
          },
          {
            name: "孟子·鱼我所欲也",
            content: "鱼，我所欲也；熊掌，亦我所欲也。二者不可得兼，舍鱼而取熊掌者也。生，亦我所欲也；义，亦我所欲也。二者不可得兼，舍生而取义者也。生亦我所欲，所欲有甚于生者，故不为苟得也；死亦我所恶，所恶有甚于死者，故患有所不辟也。如使人之所欲莫甚于生，则凡可以得生者何不用也？使人之所恶莫甚于死者，则凡可以辟患者何不为也？由是则生而有不用也，由是则可以辟患而有不为也。是故所欲有甚于生者，所恶有甚于死者。非独贤者有是心也，人皆有之，贤者能勿丧耳。一箪食，一豆羹，得之则生，弗得则死。呼尔而与之，行道之人弗受；蹴尔而与之，乞人不屑也。万钟则不辩礼义而受之，万钟于我何加焉！为宫室之美、妻妾之奉、所识穷乏者得我与？乡为身死而不受，今为宫室之美为之；乡为身死而不受，今为妻妾之奉为之；乡为身死而不受，今为所识穷乏者得我而为之：是亦不可以已乎？此之谓失其本心。"
          },
          {
            name: "孟子·得道多助，失道寡助",
            content: "天时不如地利，地利不如人和。三里之城，七里之郭，环而攻之而不胜。夫环而攻之，必有得天时者矣，然而不胜者，是天时不如地利也。城非不高也，池非不深也，兵革非不坚利也，米粟非不多也，委而去之，是地利不如人和也。故曰：域民不以封疆之界，固国不以山溪之险，威天下不以兵革之利。得道者多助，失道者寡助。寡助之至，亲戚畔之；多助之至，天下顺之。以天下之所顺，攻亲戚之所畔，故君子有不战，战必胜矣。"
          },
          {
            name: "孟子·孟子一则",
            content: "“敢问夫子恶乎长？”曰：“我知言，我善养吾浩然之气。”“敢问何谓浩然之气？”曰：“难言也。其为气也，至大至刚，以直养而无害，则塞于天地之间。其为气也，配义与道；无是，馁也。是集义所生者，非义袭而取之也。行有不慊于心，则馁矣。我故曰，告子未尝知义，以其外之也。必有事焉，而勿正，心勿忘，勿助长也。无若宋人然：宋人有闵其苗之不长而揠之者，芒芒然归，谓其人曰：‘今日病矣！予助苗长矣！’其子趋而往视之，苗则槁矣。天下之不助苗长者寡矣。以为无益而舍之者，不耘苗者也；助之长者，揠苗者也，非徒无益，而又害之。”“何谓知言？”曰：“诐辞知其所蔽，淫辞知其所陷，邪辞知其所离，遁辞知其所穷。——生于其心，害于其政；发于其政，害于其事。圣人复起，必从吾言矣。”"
          },
          {
            name: "孟子·富贵不能淫",
            content: "景春曰：“公孙衍、张仪岂不诚大丈夫哉？一怒而诸侯惧，安居而天下熄。”孟子曰：“是焉得为大丈夫乎？子未学礼乎？丈夫之冠也，父命之；女子之嫁也，母命之，往送之门，戒之曰：‘往之女家，必敬必戒，无违夫子！’以顺为正者，妾妇之道也。居天下之广居，立天下之正位，行天下之大道。得志，与民由之；不得志，独行其道。富贵不能淫，贫贱不能移，威武不能屈，此之谓大丈夫。”"
          },
          {
            name: "孟子·人皆有不忍人之心",
            content: "孟子曰：“人皆有不忍人之心。先王有不忍人之心，斯有不忍人之政矣；以不忍人之心，行不忍人之政，治天下可运之掌上。所以谓人皆有不忍人之心者：今人乍见孺子将入于井，皆有怵惕恻隐之心；非所以内交于孺子之父母也，非所以要誉于乡党朋友也，非恶其声而然也。由是观之，无恻隐之心，非人也；无羞恶之心，非人也；无辞让之心，非人也；无是非之心，非人也。恻隐之心，仁之端也；羞恶之心，义之端也；辞让之心，礼之端也；是非之心，智之端也。人之有是四端也，犹其有四体也。有是四端而自谓不能者，自贼者也；谓其君不能者，贼其君者也。凡有四端于我者，知皆扩而充之矣，若火之始然，泉之始达。苟能充之，足以保四海；苟不充之，不足以事父母。”"
          },
          {
            name: "荀子·劝学",
            content: "君子曰：学不可以已。青，取之于蓝，而青于蓝；冰，水为之，而寒于水。木直中绳，輮以为轮，其曲中规。虽有槁暴，不复挺者，輮使之然也。故木受绳则直，金就砺则利，君子博学而日参省乎己，则知明而行无过矣。故不登高山，不知天之高也；不临深溪，不知地之厚也；不闻先王之遗言，不知学问之大也。干、越、夷、貉之子，生而同声，长而异俗，教使之然也。诗曰：“嗟尔君子，无恒安息。靖共尔位，好是正直。神之听之，介尔景福。”神莫大于化道，福莫长于无祸。吾尝终日而思矣，不如须臾之所学也；吾尝跂而望矣，不如登高之博见也。登高而招，臂非加长也，而见者远；顺风而呼，声非加疾也，而闻者彰。假舆马者，非利足也，而致千里；假舟楫者，非能水也，而绝江河。君子生非异也，善假于物也。(君子生 通：性)南方有鸟焉，名曰蒙鸠，以羽为巢，而编之以发，系之苇苕，风至苕折，卵破子死。巢非不完也，所系者然也。西方有木焉，名曰射干，茎长四寸，生于高山之上，而临百仞之渊，木茎非能长也，所立者然也。蓬生麻中，不扶而直；白沙在涅，与之俱黑。兰槐之根是为芷，其渐之滫，君子不近，庶人不服。其质非不美也，所渐者然也。故君子居必择乡，游必就士，所以防邪辟而近中正也。物类之起，必有所始。荣辱之来，必象其德。肉腐出虫，鱼枯生蠹。怠慢忘身，祸灾乃作。强自取柱，柔自取束。邪秽在身，怨之所构。施薪若一，火就燥也，平地若一，水就湿也。草木畴生，禽兽群焉，物各从其类也。是故质的张，而弓矢至焉；林木茂，而斧斤至焉；树成荫，而众鸟息焉。醯酸，而蜹聚焉。故言有招祸也，行有招辱也，君子慎其所立乎！积土成山，风雨兴焉；积水成渊，蛟龙生焉；积善成德，而神明自得，圣心备焉。故不积跬步，无以至千里；不积小流，无以成江海。骐骥一跃，不能十步；驽马十驾，功在不舍。锲而舍之，朽木不折；锲而不舍，金石可镂。蚓无爪牙之利，筋骨之强，上食埃土，下饮黄泉，用心一也。蟹六跪而二螯，非蛇鳝之穴无可寄托者，用心躁也。(江海 一作：江河)是故无冥冥之志者，无昭昭之明；无惛惛之事者，无赫赫之功。行衢道者不至，事两君者不容。目不能两视而明，耳不能两听而聪。螣蛇无足而飞，鼫鼠五技而穷。《诗》曰：“尸鸠在桑，其子七兮。淑人君子，其仪一兮。其仪一兮，心如结兮！”故君子结于一也。昔者瓠巴鼓瑟，而流鱼出听；伯牙鼓琴，而六马仰秣。故声无小而不闻，行无隐而不形 。玉在山而草木润，渊生珠而崖不枯。为善不积邪？安有不闻者乎？学恶乎始？恶乎终？曰：其数则始乎诵经，终乎读礼；其义则始乎为士，终乎为圣人， 真积力久则入，学至乎没而后止也。故学数有终，若其义则不可须臾舍也。为之，人也；舍 之，禽兽也。故书者，政事之纪也；诗者，中声之所止也；礼者，法之大分，类之纲纪也。 故学至乎礼而止矣。夫是之谓道德之极。礼之敬文也，乐之中和也，诗书之博也，春秋之微 也，在天地之间者毕矣。君子之学也，入乎耳，箸乎心，布乎四体，形乎动静。端而言，蝡而动，一可以为法则。小人之学也，入乎耳，出乎口；口耳之间，则四寸耳，曷足以美七尺之躯哉！古之学者为己，今之学者为人。君子之学也，以美其身；小人之学也，以为禽犊。故不问而告谓之傲，问一而告二谓之囋。傲、非也，囋、非也；君子如向矣。学莫便乎近其人。礼乐法而不说，诗书故而不切，春秋约而不速。方其人之习君子之说，则尊以遍矣，周于世矣。故曰：学莫便乎近其人。学之经莫速乎好其人，隆礼次之。上不能好其人，下不能隆礼，安特将学杂识志，顺诗书而已耳。则末世穷年，不免为陋儒而已。将原先王，本仁义，则礼正其经纬蹊径也。若挈裘领，诎五指而顿之，顺者不可胜数也。不道礼宪，以诗书为之，譬之犹以指测河也，以戈舂黍也，以锥餐壶也，不可以得之矣。故隆礼，虽未明，法士也；不隆礼，虽察辩，散儒也。问楛者，勿告也；告楛者，勿问也；说楛者，勿听也。有争气者，勿与辩也。故必由其道至，然后接之；非其道则避之。故礼恭，而后可与言道之方；辞顺，而后可与言道之理；色从而后可与言道之致。故未可与言而言，谓之傲；可与言而不言，谓之隐；不观气色而言，谓瞽。故君子不傲、不隐、不瞽，谨顺其身。诗曰：“匪交匪舒，天子所予。”此之谓也。百发失一，不足谓善射；千里蹞步不至，不足谓善御；伦类不通，仁义不一，不足谓善学。学也者，固学一之也。一出焉，一入焉，涂巷之人也；其善者少，不善者多，桀纣盗跖也；全之尽之，然后学者也。君子知夫不全不粹之不足以为美也，故诵数以贯之，思索以通之，为其人以处之，除其害者以持养之。使目非是无欲见也，使耳非是无欲闻也，使口非是无欲言也，使心非是无欲虑也。及至其致好之也，目好之五色，耳好之五声，口好之五味，心利之有天下。是故权利不能倾也，群众不能移也，天下不能荡也。生乎由是，死乎由是，夫是之谓德操。德操然后能定，能定然后能应。能定能应，夫是之谓成人。天见其明，地见其光，君子贵其全也。"
          },
          {
            name: "荀子·修身",
            content: "见善，修然必以自存也；见不善，愀然必以自省也；善在身，介然必以自好也；不善在身，菑然必以自恶也。故非我而当者，吾师也；是我而当者，吾友也；谄谀我者，吾贼也。故君子隆师而亲友，以致恶其贼；好善无厌，受谏而能诫，虽欲无进，得乎哉？小人反是，致乱，而恶人之非己也；致不肖，而欲人之贤己也；心如虎狼，行如禽兽，而又恶人之贼己也；谄谀者亲，谏诤者疏，修正为笑，至忠为贼，虽欲无灭亡，得乎哉？以善先人者谓之教，以善和人者谓之顺；以不善先人者谓之谄，以不善和人者谓之谀。是是、非非谓之知，非是、是非谓之愚。伤良曰谗，害良曰贼。是谓是、非谓非曰直。趣舍无定谓之无常，保利弃义谓之至贼。志意修则骄富贵，道义重则轻王公；内省而外物轻矣。传曰：“君子役物，小人役于物。”此之谓矣。身劳而心安，为之；利少而义多，为之；事乱君而通，不如事穷君而顺焉。故良农不为水旱不耕，良贾不为折阅不市，士君子不为贫穷怠乎道。夫骥一日而千里，驽马十驾则亦及之矣。故跬步而不休，跛鳖千里；累土而不辍，丘山崇成；厌其源，开其渎，江河可竭；一进一退，一左一右，六骥不致。彼人之才性之相县也，岂若跛鳖之与六骥足哉？然而跛鳖致之，六骥不致，是无他故焉，或为之、或不为尔！道虽迩，不行不至；事虽小，不为不成。其为人也多暇日者，其出人不远矣。"
          },
          {
            name: "荀子·荣辱",
            content: "憍泄者，人之殃也；恭俭者，偋五兵也。虽有戈矛之刺，不如恭俭之利也。故与人善言，暖于布帛；伤人之言，深于矛戟。故薄薄之地，不得履之，非地不安也。危足无所履者，凡在言也。巨涂则让，小涂则殆，虽欲不谨，若云不使。快快而亡者，怒也；察察而残者，忮也；博而穷者，訾也；清之而俞浊者，口也；豢之而俞瘠者，交也；辩而不说者，争也；直立而不见知者，胜也；廉而不见贵者，刿也；勇而不见惮者，贪也；信而不见敬者，好剸行也。此小人之所务而君子之所不为也。斗者，忘其身者也，忘其亲者也，忘其君者也。行其少顷之怒而丧终身之躯，然且为之，是忘其身也；家室立残，亲戚不免乎刑戮，然且为之，是忘其亲也；君上之所恶也，刑法之所大禁也，然且为之，是忘其君也。忧忘其身，内忘其亲，上忘其君，是刑法之所不舍也，圣王之所不畜也。乳彘不触虎，乳狗不远游，不忘其亲也。人也，忧忘其身，内忘其亲，上忘其君，则是人也而曾狗彘之不若也。凡斗者，必自以为是而以人为非也。己诚是也，人诚非也，则是己君子而人小人也；以君子与小人相贼害也。忧以忘其身，内以忘其亲，上以忘其君，岂不过甚矣哉！是人也，所谓“以狐父之戈钅属牛矢”也。将以为智邪？则愚莫大焉；将以为利邪？则害莫大焉；将以为荣邪？则辱莫大焉；将以为安邪？则危莫大焉。人之有斗，何哉？我欲属之狂惑疾病邪？则不可，圣王又诛之。我欲属之鸟鼠禽兽邪？则不可，其形体又人，而好恶多同。人之有斗，何哉？我甚丑之！有狗彘之勇者，有贾盗之勇者，有小人之勇者，有士君子之勇者：争饮食，无廉耻，不知是非，不辟死伤，不畏众强，恈恈然唯利饮食之见，是狗彘之勇也。为事利，争货财，无辞让，果敢而振，猛贪而戾，恈恈然唯利之见，是贾盗之勇也。轻死而暴，是小人之勇也。义之所在，不倾于权，不顾其利，举国而与之不为改视，重死持义而不桡，是士君子之勇也。鲦䱁者，浮阳之鱼也，胠于沙而思水，则无逮矣。寡于患而欲谨，则无益矣。自知者不怨人，知命者不怨天；怨人者穷，怨天者无志。失之己，反之人，岂不迂乎哉！荣辱之大分，安危利害之常体：先义而后利者荣，先利而后义者辱；荣者常通，辱者常穷；通者常制人，穷者常制于人：是荣辱之大分也。材悫者常安利，荡悍者常危害；安利者常乐易，危害者常忧险；乐易者常寿长，忧险者常夭折：是安危利害之常体也。夫天生蒸民，有所以取之：志意致修，德行致厚，智虑致明，是天子之所以取天下也。政令法，举措时，听断公，上则能顺天子之命，下则能保百姓，是诸侯之所以取国家也。志行修，临官治，上则能顺上，下则能保其职，是士大夫之所以取田邑也。循法则、度量、刑辟、图籍，不知其义，谨守其数，慎不敢损益也；父子相传，以持王公，是故三代虽亡，治法犹存，是官人百吏之所以取禄秩也。孝弟原悫，軥录疾力，以敦比其事业而不敢怠傲，是庶人之所以取暖衣饱食，长生久视，以免于刑戮也。饰邪说，文奸言，为倚事，陶诞、突盗，惕、悍、憍、暴，以偷生反侧于乱世之间，是奸人之所以取危辱死刑也。其虑之不深，其择之不谨，其定取舍楛僈，是其所以危也。材性知能，君子小人一也；好荣恶辱，好利恶害，是君子小人之所同也。若其所以求之之道则异矣。小人也者，疾为诞而欲人之信己也，疾为诈而欲人之亲己也，禽兽之行而欲人之善己也；虑之难知也，行之难安也，持之难立也，成则必不得其所好，必遇其所恶焉。故君子者，信矣，而亦欲人之信己也；忠矣，而亦欲人之亲己也；修正治辨矣，而亦欲人之善己也。虑之易知也，行之易安也，持之易立也，成则必得其所好，必不遇其所恶焉。是故穷则不隐，通则大明，身死而名弥白。小人莫不延颈举踵而愿曰：“知虑材性，固有以贤人矣！”夫不知其与己无以异也。则君子注错之当，而小人注错之过也。故孰察小人之知能，足以知其有余，可以为君子之所为也。譬之越人安越，楚人安楚，君子安雅。是非知能材性然也，是注错习俗之节异也。仁义德行，常安之术也，然而未必不危也；污僈、突盗，常危之术也，然而未必不安也。故君子道其常而小人道其怪。凡人有所一同：饥而欲食，寒而欲暖，劳而欲息，好利而恶害，是人之所生而有也，是无待而然者也，是禹、桀之所同也。目辨白黑美恶，耳辨声音清浊，口辨酸咸甘苦，鼻辨芬芳腥臊，骨体肤理辨寒暑疾养，是又人之所常生而有也，是无待而然者也，是禹、桀之所同也。可以为尧、禹，可以为桀、跖，可以为工匠，可以为农贾，在势注错习俗之所积耳。是又人之所生而有也，是无待而然者也，是禹、桀之所同也。为尧、禹则常安荣，为桀、跖则常危辱；为尧、禹则常愉佚，为工匠、农贾则常烦劳；然而人力为此而寡为彼，何也？曰：陋也。尧、禹者，非生而具者也，夫起于变故，成乎修为，待尽而后备者也。人之生固小人，无师无法则唯利之见耳。人之生固小人，又以遇乱世，得乱俗，是以小重小也，以乱得乱也。君子非得势以临之，则无由得开内焉。今是人之口腹，安知礼义？安知辞让？安知廉耻隅积？亦呥呥而噍，乡乡而饱已矣。人无师无法，则其心正其口腹也。今使人生而未尝睹刍豢稻粱也，惟菽藿糟糠之为睹，则以至足为在此也，俄而粲然有秉刍豢稻粱而至者，则瞲然视之曰：“此何怪也？”彼臭之而嗛于鼻，尝之而甘于口，食之而安于体，则莫不弃此而取彼矣。今以夫先王之道，仁义之统，以相群居，以相持养，以相藩饰，以相安固邪？以夫桀、跖之道，是其为相县也，几直夫刍豢稻粱之县糟糠尔哉！然而人力为此而寡为彼，何也？曰：陋也。陋也者，天下之公患也，人之大殃大害也。故曰：仁者好告示人。告之示之，靡之儇之，鈆之重之，则夫塞者俄且通也，陋者俄且僩也，愚者俄且知也。是若不行，则汤、武在上曷益？桀、纣在上曷损？汤、武存，则天下从而治，桀、纣存，则天下从而乱。如是者，岂非人之情固可与如此，可与如彼也哉！人之情，食欲有刍豢，衣欲有文绣，行欲有舆马，又欲夫余财蓄积之富也；然而穷年累世不知不足，是人之情也。今人之生也，方知畜鸡狗猪彘，又蓄牛羊，然而食不敢有酒肉；余刀布，有囷窌，然而衣不敢有丝帛；约者有筐箧之藏，然而行不敢有舆马。是何也？非不欲也，几不长虑顾后，而恐无以继之故也。于是又节用御欲，收敛蓄藏以继之也。是于己长虑顾后，几不甚善矣哉！今夫偷生浅知之属，曾此而不知也，粮食大侈，不顾其后，俄则屈安穷矣，是其所以不免于冻饿，操瓢囊为沟壑中瘠者也。况夫先王之道，仁义之统，《诗》《书》《礼》《乐》之分乎！彼固为天下之大虑也，将为天下生民之属长虑顾后而保万世也，其氵不长矣，其温厚矣，其功盛姚远矣，非顺孰修为之君子莫之能知也。故曰：短绠不可以汲深井之泉，知不几者不可与及圣人之言。夫《诗》《书》《礼》《乐》之分，固非庸人之所知也。故曰：一之而可再也，有之而可久也，广之而可通也，虑之而可安也，反鈆察之而俞可好也。以治情则利，以为名则荣，以群则和，以独则足，乐意者其是邪？夫贵为天子，富有天下，是人情之所同欲也。然则从人之欲则势不能容，物不能赡也。故先王案为之制礼义以分之，使有贵贱之等，长幼之差，知愚、能不能之分，皆使人载其事，而各得其宜。然后使悫禄多少厚薄之称，是夫群居和一之道也。故仁人在上，则农以力尽田，贾以察尽财，百工以巧尽械器，士大夫以上至于公侯，莫不以仁厚知能尽官职，夫是之谓至平。故或禄天下而不自以为多，或监门、御旅、抱关、击柝而不自以为寡。故曰：“斩而齐，枉而顺，不同而一。”夫是之谓人伦。诗曰：“受小共大共，为下国骏蒙。”此之谓也。"
          },
          {
            name: "曾子·修身齐家治国平天下",
            content: "古之欲明明德于天下者，先治其国；欲治其国者，先齐其家；欲齐其家者，先修其身；欲修其身者，先正其心；欲正其心者，先诚其意；欲诚其意者，先致其知，致知在格物。物格而后知至，知至而后意诚，意诚而后心正，心正而后身修，身修而后家齐，家齐而后国治，国治而后天下平。自天子以至于庶人，壹是皆以修身为本。"
          },
          {
            name: "王阳明·知行合一",
            content: "知为行之始，行为知之成。知行合一，致良知"
          },
          {
            name: "王阳明·圣人之道",
            content: "圣人之道，吾性自足，向之求理于事物者误也。"
          },
          {
            name: "王阳明·心即理",
            content: "心外无物、心外无事、心外无理。"
          },
          {
            name: "王阳明·四诀",
            content: "无善无恶心之体，有善有恶意之动，知善知恶是良知，为善去恶是格物。"
          }
        ]
      },
      {
        author: "道家",
        article: [
          {
            name: "道德·道经·第一章-道可道，非常道；名可名，非常名",
            content: "道可道，非常道；名可名，非常名。无名天地之始，有名万物之母。故常无，欲以观其妙；常有，欲以观其徼。此两者同出而异名，同谓之玄，玄之又玄，众妙之门。"
          },
          {
            name: "道德经·道经·第四章-和其光，同其尘",
            content: "道冲，而用之或不盈。渊兮，似万物之宗。挫其锐，解其纷，和其光，同其尘。湛兮，似或存。吾不知谁之子，象帝之先。"
          },
          {
            name: "道德经·道经·第五章-天地不仁，以万物为刍狗",
            content: "天地不仁，以万物为刍狗；圣人不仁，以百姓为刍狗。天地之间，其犹橐籥乎？虚而不屈，动而愈出。多言数穷，不如守中。"
          },
          {
            name: "道德经·道经·第八章-上善若水，水善利万物而不争",
            content: "上善若水，水善利万物而不争。处众人之所恶，故几于道。居善地，心善渊，与善仁，言善信，政善治，事善能，动善时。夫唯不争，故无尤。"
          },
          {
            name: "道德经·道经·第二十五章-人法地，地法天，天法道，道法自然",
            content: "有物混成，先天地生，寂兮寥兮，独立而不改，周行而不殆，可以为天地母。吾不知其名，字之曰道，强为之名曰大。大曰逝，逝曰远，远曰反。故道大，天大，地大，人亦大。域中有四大，而人居其一焉。人法地，地法天，天法道，道法自然。"
          },
          {
            name: "道德经·德经·第四十一章-大器晚成",
            content: "上士闻道，勤而行之；中士闻道，若存若亡；下士闻道，大笑之。不笑不足以为道。故建言有之：明道若昧，进道若退，夷道若颣。上德若谷，大白若辱，广德若不足，建德若偷，质真若渝；大方无隅；大器免成；大音希声；大象无形；道隐无名。夫唯道，善始且善成。"
          },
          {
            name: "道德经·德经·第四十二章-道生一，一生二，二生三，三生万物",
            content: "道生一，一生二，二生三，三生万物。万物负阴而抱阳，冲气以为和。人之所恶，唯孤、寡、不穀，而王公以为称。故物或损之而益，或益之而损。人之所教，我亦教之。强梁者不得其死，吾将以为教父。"
          },
          {
            name: "道德经·德经·第四十五章-大成若缺，其用不弊",
            content: "大成若缺，其用不弊。大盈若冲，其用不穷。大直若屈，大巧若拙，大辩若讷。躁胜寒，静胜热。清静为天下正。"
          },
          {
            name: "道德经·德经·第六十四章-千里之行，始于足下",
            content: "其安易持，其未兆易谋；其脆易泮，其微易散。为之于未有，治之于未乱。合抱之木，生于毫末；九层之台，起于累土；千里之行，始于足下。为者败之，执者失之。是以圣人无为，故无败，无执故无失。民之从事，常于几成而败之。慎终如始，则无败事。是以圣人欲不欲，不贵难得之货，学不学，复众人之所过，以辅万物之自然而不敢为。"
          },
          {
            name: "道德经·德经·第六十七章-我有三宝，持而保之。一曰慈，二曰俭，三曰不敢为天下先",
            content: "天下皆谓我道大，似不肖。夫唯大，故似不肖。若肖，久矣其细也夫！我有三宝，持而保之。一曰慈，二曰俭，三曰不敢为天下先。慈故能勇；俭故能广；不敢为天下先，故能成器长。今舍慈且勇；舍俭且广；舍后且先；死矣！夫慈以战则胜，以守则固。天将救之，以慈卫之。"
          },
          {
            name: "道德经·德经·第七十七章-天之道，损有余而补不足",
            content: "天之道，其犹张弓欤？高者抑之，下者举之；有余者损之，不足者补之。天之道，损有余而补不足。人之道，则不然，损不足以奉有余。孰能有余以奉天下，唯有道者。是以圣人为而不恃，功成而不处，其不欲见贤邪。"
          },
          {
            name: "庄子·内篇·逍遥游-若夫乘天地之正，而御六气之辩，以游无穷者，彼且恶乎待哉！故曰：至人无己，神人无功，圣人无名",
            content: "北冥有鱼，其名为鲲。鲲之大，不知其几千里也。化而为鸟，其名为鹏。鹏之背，不知其几千里也。怒而飞，其翼若垂天之云。是鸟也，海运则将徙于南冥。南冥者，天池也。《齐谐》者，志怪者也。《谐》之言曰：“鹏之徙于南冥也，水击三千里，抟扶摇而上者九万里，去以六月息者也。”野马也，尘埃也，生物之以息相吹也。天之苍苍，其正色邪？其远而无所至极邪？其视下也，亦若是则已矣。且夫水之积也不厚，则其负大舟也无力。覆杯水于坳堂之上，则芥为之舟。置杯焉则胶，水浅而舟大也。风之积也不厚，则其负大翼也无力。故九万里则风斯在下矣，而后乃今培风；背负青天而莫之夭阏者，而后乃今将图南。蜩与学鸠笑之曰：“我决起而飞，抢榆枋而止，时则不至，而控于地而已矣，奚以之九万里而南为？”适莽苍者，三餐而反，腹犹果然；适百里者，宿舂粮；适千里者，三月聚粮。之二虫又何知！小知不及大知，小年不及大年。奚以知其然也？朝菌不知晦朔，蟪蛄不知春秋，此小年也。楚之南有冥灵者，以五百岁为春，五百岁为秋；上古有大椿者，以八千岁为春，八千岁为秋，此大年也。而彭祖乃今以久特闻，众人匹之，不亦悲乎！汤之问棘也是已：穷发之北，有冥海者，天池也。有鱼焉，其广数千里，未有知其修者，其名为鲲。有鸟焉，其名为鹏，背若泰山，翼若垂天之云，抟扶摇羊角而上者九万里，绝云气，负青天，然后图南，且适南冥也。斥鴳笑之曰：“彼且奚适也？我腾跃而上，不过数仞而下，翱翔蓬蒿之间，此亦飞之至也，而彼且奚适也？”此小大之辩也。故夫知效一官，行比一乡，德合一君，而征一国者，其自视也，亦若此矣。而宋荣子犹然笑之。且举世誉之而不加劝，举世非之而不加沮，定乎内外之分，辩乎荣辱之境，斯已矣。彼其于世，未数数然也。虽然，犹有未树也。夫列子御风而行，泠然善也，旬有五日而后反。彼于致福者，未数数然也。此虽免乎行，犹有所待者也。若夫乘天地之正，而御六气之辩，以游无穷者，彼且恶乎待哉！故曰：至人无己，神人无功，圣人无名。尧让天下于许由，曰：“日月出矣，而爝火不息，其于光也，不亦难乎！时雨降矣，而犹浸灌，其于泽也，不亦劳乎！夫子立而天下治，而我犹尸之，吾自视缺然。请致天下。”许由曰：“子治天下，天下既已治也，而我犹代子，吾将为名乎？名者，实之宾也，吾将为宾乎？鹪鹩巢于深林，不过一枝；偃鼠饮河，不过满腹。归休乎君，予无所用天下为！庖人虽不治庖，尸祝不越樽俎而代之矣。”肩吾问于连叔曰：“吾闻言于接舆，大而无当，往而不反。吾惊怖其言犹河汉而无极也，大有径庭，不近人情焉。”连叔曰：“其言谓何哉？”“曰‘藐姑射之山，有神人居焉。肌肤若冰雪，绰约若处子；不食五谷，吸风饮露；乘云气，御飞龙，而游乎四海之外；其神凝，使物不疵疠而年谷熟。’吾以是狂而不信也。”连叔曰：“然，瞽者无以与乎文章之观，聋者无以与乎钟鼓之声。岂唯形骸有聋盲哉？夫知亦有之。是其言也，犹时女也。之人也，之德也，将旁礴万物以为一，世蕲乎乱，孰弊弊焉以天下为事！之人也，物莫之伤，大浸稽天而不溺，大旱金石流、土山焦而不热。是其尘垢粃糠，将犹陶铸尧舜者也，孰肯以物为事！”宋人资章甫而适诸越，越人断发文身，无所用之。尧治天下之民，平海内之政。往见四子藐姑射之山，汾水之阳，窅然丧其天下焉。惠子谓庄子曰：“魏王贻我大瓠之种，我树之成而实五石。以盛水浆，其坚不能自举也。剖之以为瓢，则瓠落无所容。非不呺然大也，吾为其无用而掊之。”庄子曰：“夫子固拙于用大矣。宋人有善为不龟手之药者，世世以洴澼絖为事。客闻之，请买其方百金。聚族而谋之曰：‘我世世为洴澼絖，不过数金。今一朝而鬻技百金，请与之。’客得之，以说吴王。越有难，吴王使之将。冬，与越人水战，大败越人，裂地而封之。能不龟手一也，或以封，或不免于洴澼絖，则所用之异也。今子有五石之瓠，何不虑以为大樽而浮乎江湖，而忧其瓠落无所容？则夫子犹有蓬之心也夫！”惠子谓庄子曰：“吾有大树，人谓之樗。其大本臃肿而不中绳墨，其小枝卷曲而不中规矩。立之涂，匠者不顾。今子之言，大而无用，众所同去也。”庄子曰：“子独不见狸狌乎？卑身而伏，以候敖者；东西跳梁，不避高下；中于机辟，死于罔罟。今夫斄牛，其大若垂天之云。此能为大矣，而不能执鼠。今子有大树，患其无用，何不树之于无何有之乡，广莫之野，彷徨乎无为其侧，逍遥乎寝卧其下。不夭斤斧，物无害者，无所可用，安所困苦哉！”"
          },
          {
            name: "庄子·内篇·齐物论-天地与我并生，而万物与我为一",
            content: "南郭子綦隐机而坐，仰天而嘘，嗒焉似丧其耦。颜成子游立侍乎前，曰：“何居乎？形固可使如槁木，而心固可使如死灰乎？今之隐机者，非昔之隐机者也？”子綦曰：“偃，不亦善乎，而问之也！今者吾丧我，汝知之乎？汝闻人籁而未闻地籁，汝闻地籁而不闻天籁夫！”子游曰：“敢问其方。”子綦曰：“夫大块噫气，其名为风。是唯无作，作则万窍怒呺。而独不闻之翏翏乎？山林之畏隹，大木百围之窍穴，似鼻，似口，似耳，似枅，似圈，似臼，似洼者，似污者。激者、謞者、叱者、吸者、叫者、譹者、宎者，咬者，前者唱于而随者唱喁，泠风则小和，飘风则大和，厉风济则众窍为虚。而独不见之调调之刁刁乎？”子游曰：“地籁则众窍是已，人籁则比竹是已，敢问天籁。”子綦曰：“夫吹万不同，为而使其自己也。咸其自取，怒者其谁邪？”大知闲闲，小知閒閒。大言炎炎，小言詹詹。其寐也魂交，其觉也形开。与接为构，日以心斗。缦者、窖者、密者。小恐惴惴，大恐缦缦。其发若机栝，其司是非之谓也；其留如诅盟，其守胜之谓也；其杀如秋冬，以言其日消也；其溺之所为之，不可使复之也；其厌也如缄，以言其老洫也；近死之心，莫使复阳也。喜怒哀乐，虑叹变慹，姚佚启态。乐出虚，蒸成菌。日夜相代乎前而莫知其所萌。已乎，已乎！旦暮得此，其所由以生乎！非彼无我，非我无所取。是亦近矣，而不知其所为使。若有真宰，而特不得其眹。可行己信，而不见其形，有情而无形。百骸、九窍、六藏、赅而存焉，吾谁与为亲？汝皆说之乎？其有私焉？如是皆有为臣妾乎？其臣妾不足以相治乎？其递相为君臣乎？其有真君存焉！如求得其情与不得，无益损乎其真。一受其成形，不亡以待尽。与物相刃相靡，其行尽如驰而莫之能止，不亦悲乎！终身役役而不见其成功，苶然疲役而不知其所归，可不哀邪！人谓之不死，奚益！其形化，其心与之然，可不谓大哀乎？人之生也，固若是芒乎？其我独芒，而人亦有不芒者乎？夫随其成心而师之，谁独且无师乎？奚必知代而心自取者有之？愚者与有焉！未成乎心而有是非，是今日适越而昔至也。是以无有为有。无有为有，虽有神禹且不能知，吾独且奈何哉！夫言非吹也，言者有言。其所言者特未定也。果有言邪？其未尝有言邪？其以为异于鷇音，亦有辩乎？其无辩乎？道恶乎隐而有真伪？言恶乎隐而有是非？道恶乎往而不存？言恶乎存而不可？道隐于小成，言隐于荣华。故有儒墨之是非，以是其所非而非其所是。欲是其所非而非其所是，则莫若以明。物无非彼，物无非是。自彼则不见，自知则知之。故曰：彼出于是，是亦因彼。彼是方生之说也。虽然，方生方死，方死方生；方可方不可，方不可方可；因是因非，因非因是。是以圣人不由而照之于天，亦因是也。是亦彼也，彼亦是也。彼亦一是非，此亦一是非，果且有彼是乎哉？果且无彼是乎哉？彼是莫得其偶，谓之道枢。枢始得其环中，以应无穷。是亦一无穷，非亦一无穷也。故曰：莫若以明。以指喻指之非指，不若以非指喻指之非指也；以马喻马之非马，不若以非马喻马之非马也。天地一指也，万物一马也。可乎可，不可乎不可。道行之而成，物谓之而然。恶乎然？然于然。恶乎可？可于可。恶乎不可？不可于不可。恶乎不然？不然于不然。物固有所然，物固有所可。无物不然，无物不可。故为是举莛与楹，厉与西施，恢诡谲怪，道通为一。其分也，成也；其成也，毁也。凡物无成与毁，复通为一。唯达者知通为一，为是不用而寓诸庸。庸也者，用也；用也者，通也；通也者，得也；适得而几矣。因是已。已而不知其然，谓之道。劳神明为一而不知其同也，谓之“朝三”。何谓“朝三”？狙公赋芧，曰：“朝三而暮四。”众狙皆怒。曰：“然则朝四而暮三。”众狙皆悦。名实未亏而喜怒为用，亦因是也。是以圣人和之以是非而休乎天钧，是之谓两行。古之人，其知有所至矣。恶乎至？有以为未始有物者，至矣，尽矣，不可以加矣！其次以为有物矣，而未始有封也。其次以为有封焉，而未始有是非也。是非之彰也，道之所以亏也。道之所以亏，爱之所以成。果且有成与亏乎哉？果且无成与亏乎哉？有成与亏，故昭氏之鼓琴也；无成与亏，故昭氏之不鼓琴也。昭文之鼓琴也，师旷之枝策也，惠子之据梧也，三者之知几乎！皆其盛者也，故载之末年。唯其好之也，以异于彼，其好之也，欲以明之。彼非所明而明之，故以坚白之昧终。而其子又以文之纶终，终身无成。若是而可谓成乎，虽我亦成也；若是而不可谓成乎，物与我无成也。是故滑疑之耀，圣人之所图也。为是不用而寓诸庸，此之谓“以明”。今且有言于此，不知其与是类乎？其与是不类乎？类与不类，相与为类，则与彼无以异矣。虽然，请尝言之：有始也者，有未始有始也者，有未始有夫未始有始也者；有有也者，有无也者，有未始有无也者，有未始有夫未始有无也者。俄而有无矣，而未知有无之果孰有孰无也。今我则已有有谓矣，而未知吾所谓之其果有谓乎？其果无谓乎？夫天下莫大于秋毫之末，而太山为小；莫寿乎殇子，而彭祖为夭。天地与我并生，而万物与我为一。既已为一矣，且得有言乎？既已谓之一矣，且得无言乎？一与言为二，二与一为三。自此以往，巧历不能得，而况其凡乎！故自无适有，以至于三，而况自有适有乎！无适焉，因是已！夫道未始有封，言未始有常，为是而有畛也。请言其畛：有左有右，有伦有义，有分有辩，有竞有争，此之谓八德。六合之外，圣人存而不论；六合之内，圣人论而不议；春秋经世先王之志，圣人议而不辩。故分也者，有不分也；辩也者，有不辩也。曰：“何也？”“圣人怀之，众人辩之以相示也。故曰：辩也者，有不见也。”夫大道不称，大辩不言，大仁不仁，大廉不嗛，大勇不忮。道昭而不道，言辩而不及，仁常而不成，廉清而不信，勇忮而不成。五者圆而几向方矣！故知止其所不知，至矣。孰知不言之辩，不道之道？若有能知，此之谓天府。注焉而不满，酌焉而不竭，而不知其所由来，此之谓葆光。故昔者尧问于舜曰：“吾欲伐宗脍、胥、敖，南面而不释然。其故何也？”舜曰：“夫三子者，犹存乎蓬艾之间。若不释然何哉！昔者十日并出，万物皆照，而况德之进乎日者乎！”啮缺问乎王倪曰：“子知物之所同是乎？”曰：“吾恶乎知之！”“子知子之所不知邪？”曰：“吾恶乎知之！”“然则物无知邪？”曰：“吾恶乎知之！虽然，尝试言之：庸讵知吾所谓知之非不知邪？庸讵知吾所谓不知之非知邪？且吾尝试问乎女：民湿寝则腰疾偏死，鳅然乎哉？木处则惴栗恂惧，猨猴然乎哉？三者孰知正处？民食刍豢，麋鹿食荐，蝍蛆甘带，鸱鸦耆鼠，四者孰知正味？猨猵狙以为雌，麋与鹿交，鳅与鱼游。毛嫱丽姬，人之所美也；鱼见之深入，鸟见之高飞，麋鹿见之决骤，四者孰知天下之正色哉？自我观之，仁义之端，是非之涂，樊然淆乱，吾恶能知其辩！”啮缺曰：“子不知利害，则至人固不知利害乎？”王倪曰：“至人神矣！大泽焚而不能热，河汉冱而不能寒，疾雷破山、飘风振海而不能惊。若然者，乘云气，骑日月，而游乎四海之外，死生无变于己，而况利害之端乎！”瞿鹊子问乎长梧子曰：“吾闻诸夫子：圣人不从事于务，不就利，不违害，不喜求，不缘道，无谓有谓，有谓无谓，而游乎尘垢之外。夫子以为孟浪之言，而我以为妙道之行也。吾子以为奚若？”长梧子曰：“是黄帝之所听荧也，而丘也何足以知之！且女亦大早计，见卵而求时夜，见弹而求鸮炙。予尝为女妄言之，女以妄听之。奚旁日月，挟宇宙，为其脗合，置其滑涽，以隶相尊？众人役役，圣人愚芚，参万岁而一成纯。万物尽然，而以是相蕴。予恶乎知说生之非惑邪！予恶乎知恶死之非弱丧而不知归者邪！丽之姬，艾封人之子也。晋国之始得之也，涕泣沾襟。及其至于王所，与王同匡床，食刍豢，而后悔其泣也。予恶乎知夫死者不悔其始之蕲生乎？梦饮酒者，旦而哭泣；梦哭泣者，旦而田猎。方其梦也，不知其梦也。梦之中又占其梦焉，觉而后知其梦也。且有大觉而后知此其大梦也，而愚者自以为觉，窃窃然知之。“君乎！牧乎！”固哉！丘也与女皆梦也，予谓女梦亦梦也。是其言也，其名为吊诡。万世之后而一遇大圣知其解者，是旦暮遇之也。既使我与若辩矣，若胜我，我不若胜，若果是也？我果非也邪？我胜若，若不吾胜，我果是也？而果非也邪？其或是也？其或非也邪？其俱是也？其俱非也邪？我与若不能相知也。则人固受其黮暗，吾谁使正之？使同乎若者正之，既与若同矣，恶能正之？使同乎我者正之，既同乎我矣，恶能正之？使异乎我与若者正之，既异乎我与若矣，恶能正之？使同乎我与若者正之，既同乎我与若矣，恶能正之？然则我与若与人俱不能相知也，而待彼也邪？”化声之相待，若其不相待。和之以天倪，因之以曼衍，所以穷年也。“何谓和之以天倪？”曰：“是不是，然不然。是若果是也，则是之异乎不是也亦无辩；然若果然也，则然之异乎不然也亦无辩。忘年忘义，振于无竟，故寓诸无竟。”罔两问景曰：“曩子行，今子止；曩子坐，今子起。何其无特操与？”景曰：“吾有待而然者邪？吾所待又有待而然者邪？吾待蛇蚹蜩翼邪？恶识所以然？恶识所以不然？”昔者庄周梦为胡蝶，栩栩然胡蝶也。自喻适志与！不知周也。俄然觉，则蘧蘧然周也。不知周之梦为胡蝶与？胡蝶之梦为周与？周与胡蝶则必有分矣。此之谓物化。"
          },
          {
            name: "庄子·内篇·养生主-吾生也有涯，而知也无涯。以有涯随无涯，殆已",
            content: "吾生也有涯，而知也无涯。以有涯随无涯，殆已！已而为知者，殆而已矣！为善无近名，为恶无近刑，缘督以为经，可以保身，可以全生，可以养亲，可以尽年。庖丁为文惠君解牛，手之所触，肩之所倚，足之所履，膝之所踦，砉然响然，奏刀騞然，莫不中音。合于《桑林》之舞，乃中《经首》之会。文惠君曰：“嘻，善哉！技盍至此乎？”庖丁释刀对曰：“臣之所好者道也，进乎技矣。始臣之解牛之时，所见无非全牛者；三年之后，未尝见全牛也；方今之时，臣以神遇而不以目视，官知止而神欲行。依乎天理，批大郤，导大窾，因其固然。技经肯綮之未尝，而况大軱乎！良庖岁更刀，割也；族庖月更刀，折也；今臣之刀十九年矣，所解数千牛矣，而刀刃若新发于硎。彼节者有间而刀刃者无厚，以无厚入有间，恢恢乎其于游刃必有余地矣。是以十九年而刀刃若新发于硎。虽然，每至于族，吾见其难为，怵然为戒，视为止，行为迟，动刀甚微，謋然已解，如土委地。提刀而立，为之而四顾，为之踌躇满志，善刀而藏之。”文惠君曰：“善哉！吾闻庖丁之言，得养生焉。”公文轩见右师而惊曰：“是何人也？恶乎介也？天与？其人与？”曰：“天也，非人也。天之生是使独也，人之貌有与也。以是知其天也，非人也。”泽雉十步一啄，百步一饮，不蕲畜乎樊中。神虽王，不善也。老聃死，秦佚吊之，三号而出。弟子曰：“非夫子之友邪？”曰：“然。”“然则吊焉若此可乎？”曰：“然。始也吾以为其人也，而今非也。向吾入而吊焉，有老者哭之，如哭其子；少者哭之，如哭其母。彼其所以会之，必有不蕲言而言，不蕲哭而哭者。是遁天倍情，忘其所受，古者谓之遁天之刑。适来，夫子时也；适去，夫子顺也。安时而处顺，哀乐不能入也，古者谓是帝之县解。”指穷于为薪，火传也，不知其尽也。"
          },
          {
            name: "庄子·内篇·人间世-知其不可奈何而安之若命",
            content: "颜回见仲尼，请行。曰：“奚之？”曰：“将之卫。”曰：“奚为焉？”曰：“回闻卫君，其年壮，其行独。轻用其国而不见其过。轻用民死，死者以国量，乎泽若蕉，民其无如矣！回尝闻之夫子曰：‘治国去之，乱国就之。医门多疾。’愿以所闻思其则，庶几其国有瘳乎！”仲尼曰：“嘻，若殆往而刑耳！夫道不欲杂，杂则多，多则扰，扰则忧，忧而不救。古之至人，先存诸己而后存诸人。所存于己者未定，何暇至于暴人之所行！且若亦知夫德之所荡而知之所为出乎哉？德荡乎名，知出乎争。名也者，相轧也；知也者争之器也。二者凶器，非所以尽行也。且德厚信矼，未达人气；名闻不争，未达人心。而强以仁义绳墨之言術暴人之前者，是以人恶有其美也，命之曰灾人。灾人者，人必反灾之。若殆为人灾夫。且苟为人悦贤而恶不肖，恶用而求有以异？若唯无诏，王公必将乘人而斗其捷。而目将荧之，而色将平之，口将营之，容将形之，心且成之。是以火救火，以水救水，名之曰益多。顺始无穷，若殆以不信厚言，必死于暴人之前矣！且昔者桀杀关龙逄，纣杀王子比干，是皆修其身以下伛拊人之民，以下拂其上者也，故其君因其修以挤之。是好名者也。昔者尧攻丛枝、胥、敖，禹攻有扈。国为虚厉，身为刑戮。其用兵不止，其求实无已，是皆求名实者也，而独不闻之乎？名实者，圣人之所不能胜也，而况若乎！虽然，若必有以也，尝以语我来。”颜回曰：“端而虚，勉而一，则可乎？”曰：“恶！恶可！夫以阳为充孔扬，采色不定，常人之所不违，因案人之所感，以求容与其心，名之曰日渐之德不成，而况大德乎！将执而不化，外合而内不訾，其庸讵可乎！”“然则我内直而外曲，成而上比。内直者，与天为徒。与天为徒者，知天子之与己，皆天之所子，而独以己言蕲乎而人善之，蕲乎而人不善之邪？若然者，人谓之童子，是之谓与天为徒。外曲者，与人之为徒也。擎跽曲拳，人臣之礼也。人皆为之，吾敢不为邪？为人之所为者，人亦无疵焉，是之谓与人为徒。成而上比者，与古为徒。其言虽教，谪之实也，古之有也，非吾有也。若然者，虽直而不病，是之谓与古为徒。若是则可乎？”仲尼曰：“恶！恶可！大多政法而不谍。虽固，亦无罪。虽然，止是耳矣，夫胡可以及化！犹师心者也。”颜回曰：“吾无以进矣，敢问其方。”仲尼曰：“斋，吾将语若。有心而为之，其易邪？易之者，皞天不宜。”颜回曰：“回之家贫，唯不饮酒不茹荤者数月矣。如此则可以为斋乎？”曰：“是祭祀之斋，非心斋也。”回曰：“敢问心斋。”仲尼曰：“若一志，无听之以耳而听之以心；无听之以心而听之以气。听止于耳，心止于符。气也者，虚而待物者也。唯道集虚。虚者，心斋也”颜回曰：“回之未始得使，实自回也；得使之也，未始有回也，可谓虚乎？”夫子曰：“尽矣！吾语若：若能入游其樊而无感其名，入则鸣，不入则止。无门无毒，一宅而寓于不得已则几矣。绝迹易，无行地难。为人使易以伪，为天使难以伪。闻以有翼飞者矣，未闻以无翼飞者也；闻以有知知者矣，未闻以无知知者也。瞻彼阕者，虚室生白，吉祥止止。夫且不止，是之谓坐驰。夫徇耳目内通而外于心知，鬼神将来舍，而况人乎！是万物之化也，禹、舜之所纽也，伏戏、几蘧之所行终，而况散焉者乎！”叶公子高将使于齐，问于仲尼曰：“王使诸梁也甚重。齐之待使者，盖将甚敬而不急。匹夫犹未可动也，而况诸侯乎！吾甚栗之。子常语诸梁也曰：‘凡事若小若大，寡不道以欢成。事若不成，则必有人道之患；事若成，则必有阴阳之患。若成若不成而后无患者，唯有德者能之。’吾食也执粗而不臧，爨无欲清之人。今吾朝受命而夕饮冰，我其内热与！吾未至乎事之情而既有阴阳之患矣！事若不成，必有人道之患，是两也。为人臣者不足以任之，子其有以语我来！”仲尼曰：“天下有大戒二：其一命也，其一义也。子之爱亲，命也，不可解于心；臣之事君，义也，无适而非君也，无所逃于天地之间。是之谓大戒。是以夫事其亲者，不择地而安之，孝之至也；夫事其君者，不择事而安之，忠之盛也；自事其心者，哀乐不易施乎前，知其不可奈何而安之若命，德之至也。为人臣子者，固有所不得已。行事之情而忘其身，何暇至于悦生而恶死！夫子其行可矣！丘请复以所闻：凡交近则必相靡以信，远则必忠之以言。言必或传之。夫传两喜两怒之言，天下之难者也。夫两喜必多溢美之言，两怒必多溢恶之言。凡溢之类妄，妄则其信之也莫，莫则传言者殃。故法言曰：‘传其常情，无传其溢言，则几乎全。’且以巧斗力者，始乎阳，常卒乎阴，泰至则多奇巧；以礼饮酒者，始乎治，常卒乎乱，泰至则多奇乐。凡事亦然，始乎谅，常卒乎鄙；其作始也简，其将毕也必巨。言者，风波也；行者，实丧也。夫风波易以动，实丧易以危。故忿设无由，巧言偏辞。兽死不择音，气息勃然于是并生心厉。剋核太至，则必有不肖之心应之而不知其然也。苟为不知其然也，孰知其所终！故法言曰：‘无迁令，无劝成。过度益也。’迁令劝成殆事。美成在久，恶成不及改，可不慎与！且夫乘物以游心，托不得已以养中，至矣。何作为报也！莫若为致命，此其难者？”颜阖将傅卫灵公大子，而问于蘧伯玉曰；“有人于此，其德天杀。与之为无方则危吾国，与之为有方则危吾身。其知适足以知人之过，而不知其所以过。若然者，吾奈之何？”蘧伯玉曰：“善哉问乎！戒之，慎之，正女身哉！形莫若就，心莫若和。虽然，之二者有患。就不欲入，和不欲出。形就而入，且为颠为灭，为崩为蹶；心和而出，且为声为名，为妖为孽。彼且为婴儿，亦与之为婴儿；彼且为无町畦，亦与之为无町畦；彼且为无崖，亦与之为无崖；达之，入于无疵。汝不知夫螳螂乎？怒其臂以当车辙，不知其不胜任也，是其才之美者也。戒之，慎之，积伐而美者以犯之，几矣！汝不知夫养虎者乎？不敢以生物与之，为其杀之之怒也；不敢以全物与之，为其决之之怒也。时其饥饱，达其怒心。虎之与人异类，而媚养己者，顺也；故其杀者，逆也。夫爱马者，以筐盛矢，以蜃盛溺。适有蚊虻仆缘，而拊之不时，则缺衔毁首碎胸。意有所至而爱有所亡。可不慎邪？”匠石之齐，至于曲辕，见栎社树。其大蔽牛，絜之百围，其高临山十仞而后有枝，其可以舟者旁十数。观者如市，匠伯不顾，遂行不辍。弟子厌观之，走及匠石，曰：‘自吾执斧斤以随夫子，未尝见材如此其美也。先生不肯视，行不辍，何邪？”曰：“已矣，勿言之矣！散木也。以为舟则沉，以为棺椁则速腐，以为器则速毁，以为门户则液瞒，以为柱则蠹，是不材之木也。无所可用，故能若是之寿。”匠石归，栎社见梦曰：“女将恶乎比予哉？若将比予于文木邪？夫楂梨橘柚果蓏之属，实熟则剥，剥则辱。大枝折，小枝泄。此以其能苦其生者也。故不终其天年而中道夭，自掊击于世俗者也。物莫不若是。且予求无所可用久矣！几死，乃今得之，为予大用。使予也而有用，且得有此大也邪？且也若与予也皆物也，奈何哉其相物也？而几死之散人，又恶知散木！”匠石觉而诊其梦。弟子曰：“趣取无用，则为社何邪？”曰：“密！若无言！彼亦直寄焉！以为不知己者诟厉也。不为社者，且几有翦乎！且也彼其所保与众异，而以义喻之，不亦远乎！”南伯子綦游乎商之丘，见大木焉，有异：结驷千乘，隐将芘其所藾。子綦曰：“此何木也哉！此必有异材夫！”仰而视其细枝，则拳曲而不可以为栋梁；俯而视其大根，则轴解而不可以为棺椁；舐其叶，则口烂而为伤；嗅之则使人狂酲三日而不已。子綦曰“此果不材之木也，以至于此其大也。嗟乎神人，以此不材。”宋有荆氏者，宜楸柏桑。其拱把而上者，求狙猴之杙斩之；三围四围，求高名之丽者斩之；七围八围，贵人富商之家求禅傍者斩之。故未终其天年而中道之夭于斧斤，此材之患也。故解之以牛之白颡者，与豚之亢鼻者，与人有痔病者，不可以适河。此皆巫祝以知之矣，所以为不祥也。此乃神人之所以为大祥也。支离疏者，颐隐于齐，肩高于顶，会撮指天，五管在上，两髀为胁。挫针治繲，足以餬口；鼓荚播精，足以食十人。上征武士，则支离攘臂于其间；上有大役，则支离以有常疾不受功；上与病者粟，则受三锺与十束薪。夫支离者其形者，犹足以养其身，终其天年，又况支离其德者乎！孔子适楚，楚狂接舆游其门曰：“凤兮凤兮，何如德之衰也。来世不可待，往世不可追也。天下有道，圣人成焉；天下无道，圣人生焉。方今之时，仅免刑焉！福轻乎羽，莫之知载；祸重乎地，莫之知避。已乎，已乎！临人以德。殆乎，殆乎！画地而趋。迷阳迷阳，无伤吾行。吾行郤曲，无伤吾足。”山木，自寇也；膏火，自煎也。桂可食，故伐之；漆可用，故割之。人皆知有用之用，而莫知无用之用也。"
          },
          {
            name: "庄子·内篇·大宗师-知天之所为，知人之所为者，至矣！知天之所为者，天而生也；知 人之所为者，以其知之所知以养其知之所不知，终其天年而不中道夭 者，是知之盛也",
            content: "知天之所为，知人之所为者，至矣！知天之所为者，天而生也；知 人之所为者，以其知之所知以养其知之所不知，终其天年而不中道夭 者，是知之盛也。虽然，有患：夫知有所待而后当，其所待者特未定 也。庸讵知吾所谓天之非人乎？所谓人之非天乎？且有真人而后有真 知。何谓真人？古之真人，不逆寡，不雄成，不谟士。若然者，过而弗 悔，当而不自得也。若然者，登高不栗，入水不濡，入火不热，是知 之能登假于道者也若此。古之真人，其寝不梦，其觉无忧，其食不甘，其息深深。真人之息 以踵，众人之息以喉。屈服者，其嗌言若哇。其耆欲深者，其天机浅 。古之真人，不知说生，不知恶死。其出不欣，其入不距。翛然而往， 翛然而来而已矣。不忘其所始，不求其所终。受而喜之，忘而复之。 是之谓不以心捐道，不以人助天，是之谓真人。若然者，其心志，其 容寂，其颡頯。凄然似秋，暖然似春，喜怒通四时，与物有宜而莫知 其极。故圣人之用兵也，亡国而不失人心。利泽施乎万世，不为爱人。 故乐通物，非圣人也；有亲，非仁也；天时，非贤也；利害不通，非 君子也；行名失己，非士也；亡身不真，非役人也。若狐不偕、务光、 伯夷、叔齐、箕子、胥余、纪他、申徒狄，是役人之役，适人之适， 而不自适其适者也。古之真人，其状义而不朋，若不足而不承；与乎其觚而不坚也，张 乎其虚而不华也；邴邴乎其似喜也，崔崔乎其不得已也，滀乎进我色 也，与乎止我德也，广乎其似世也，謷乎其未 可制也，连乎其似好闭也，悗乎忘其言也。以刑为体，以礼为翼，以 知为时，以德为循。以刑为体者，绰乎其杀也；以礼为翼者，所以行 于世也；以知为时者，不得已于事也；以德为循者，言其与有足者至 于丘也，而人真以为勤行者也。故其好之也一，其弗好之也一。其一 也一，其不一也一。其一与天为徒，其不一与人为徒，天与人不相胜 也，是之谓真人。死生，命也；其有夜旦之常，天也。人之有所不得与，皆物之情也 。彼特以天为父，而身犹爱之，而况其卓乎！人特以有君为愈乎己， 而身犹死之，而况其真乎！泉涸，鱼相与处于陆，相呴以湿，相濡以沫，不如相忘于江湖。与 其誉尧而非桀也，不如两忘而化其道。夫大块载我以形，劳我以生，佚我以老，息我以死。故善吾生者， 乃所以善吾死也。夫藏舟于壑，藏山于泽，谓之固矣！然而夜半有力 者负之而走，昧者不知也。藏小大有宜，犹有所循。若夫藏天下于天 下而不得所循，是恒物之大情也。特犯人之形而犹喜之。若人之形者 ，万化而未始有极也，其为乐可胜计邪？故圣人将游于物之所不得循 而皆存。善妖善老，善始善终，人犹效之，而况万物之所系而一化之 所待乎！夫道有情有信，无为无形；可传而不可受，可得而不可见；自本自 根，未有天地，自古以固存；神鬼神帝，生天生地；在太极之先而不 为高，在六极之下而不为深，先天地生而不为久，长于上古而不为老 。豨韦氏得之，以挈天地；伏戏氏得之，以袭气母；维斗得之，终古 不忒；日月得之，终古不息；勘坏得之，以袭昆仑；冯夷得之，以游 大川；肩吾得之，以处大山；黄帝得之，以登云天；颛顼得之，以处 玄宫；禺强得之，立乎北极；西王母得之，坐乎少广，莫知其始，莫 知其终；彭祖得之，上及有虞，下及及五伯；傅说得之，以相武丁， 奄有天下，乘东维、骑箕尾而比于列星。南伯子葵问乎女偊曰：“子之年长矣，而色若孺子，何也？”曰： “吾闻道矣。”南伯子葵曰：“道可得学邪？”曰：“恶！恶可！子 非其人也。夫卜梁倚有圣人之才而无圣人之道，我有圣人之道而无圣 人之才。吾欲以教之，庶几其果为圣人乎？不然，以圣人之道告圣人 之才，亦易矣。吾犹守而告之，参日而后能外天下；已外天下矣，吾 又守之，七日而后能外物；已外物矣，吾又守之，九日而后能外生； 已外生矣，而后能朝彻；朝彻而后能见独；见独而后能无古今；无古 今而后能入于不死不生。杀生者不死，生生者不生。其为物无不将也， 无不迎也，无不毁也，无不成也。其名为撄宁。撄宁也者，撄而后成 者也。”南伯子葵曰：“子独恶乎闻之？”曰：“闻诸副墨之子，副墨之子 闻诸洛诵之孙，洛诵之孙闻之瞻明，瞻明闻之聂许，聂许闻之需役， 需役闻之于讴，于讴闻之玄冥，玄冥闻之参寥，参寥闻之疑始。”子祀、子舆、子犁、子来四人相与语曰：“孰能以无为首，以生为 脊，以死为尻；孰知死生存亡之一体者，吾与之友矣！”四人相视而 笑，莫逆于心，遂相与为友。俄而子舆有病，子祀往问之。曰：“伟 哉，夫造物者将以予为此拘拘也。”曲偻发背，上有五管，颐隐于齐 ，肩高于顶，句赘指天，阴阳之气有沴，其心闲而无事，胼（左“足”右“鲜”）而鉴于井，曰：“嗟乎！夫造物者又将 以予为此拘拘也。”子祀曰：“女恶之乎？”曰：“亡，予何恶！浸假而化予之左臂以 为鸡，予因以求时夜；浸假而化予之右臂以为弹，予因以求鸮炙；浸 假而化予之尻以为轮，以神为马，予因以乘之，岂更驾哉！且夫得者， 时也；失者，顺也。安时而处顺，哀乐不能入也，此古之所谓县解也， 而不能自解者，物有结之。且夫物不胜天久矣，吾又何恶焉！”俄而子来有病，喘喘然将死。其妻子环而泣之。子犁往问之，曰： “叱！避！无怛化！”倚其户与之语曰：“伟哉造化！又将奚以汝为 ？将奚以汝适？以汝为鼠肝乎？以汝为虫臂乎？”子来曰：“父母于 子，东西南北，唯命之从。阴阳于人，不翅于父母。彼近吾死而我不 听，我则悍矣，彼何罪焉？夫大块以载我以形，劳我以生，佚我以老 ，息我以死。故善吾生者，乃所以善吾死也。今大冶铸金，金踊跃曰 ：‘我且必为镆铘！’大冶必以为不祥之金。今一犯人之形而曰：‘ 人耳！人耳！’夫造化者必以为不祥之人。今一以天地为大炉，以造 化为大冶，恶乎往而不可哉！”成然寐，蘧然觉。子桑户、孟子反、子琴张三人相与友曰：“孰能相与于无相与，相 为于无相为；孰能登天游雾，挠挑无极，相忘以生，无所穷终！”三 人相视而笑，莫逆于心，遂相与友。莫然有间，而子桑户死，未葬。孔子闻之，使子贡往侍事焉。或编 曲，或鼓琴，相和而歌曰：“嗟来桑户乎！嗟来桑户乎！而已反其真 ，而我犹为人猗！”子贡趋而进曰：“敢问临尸而歌，礼乎？”二人 相视而笑曰：“是恶知礼意！”子贡反，以告孔子曰：“彼何人者邪 ？修行无有而外其形骸，临尸而歌，颜色不变，无以命之。彼何人者 邪？”孔子曰：“彼游方之外者也，而丘游方之内者也。外内不相及 ，而丘使女往吊之，丘则陋矣！彼方且与造物者为人，而游乎天地之 一气。彼以生为附赘县疣，以死为决（疒丸）溃痈。夫若然者，又恶知死生先后之所在！假于异物 ，托于同体；忘其肝胆，遗其耳目；反复终始，不知端倪；芒然彷徨乎尘垢之外，逍遥乎无为之业。彼又恶能愦愦然为世俗之礼，以观众 人之耳目哉！”子贡曰：“然则夫子何方之依？”孔子曰：“丘，天之戮民也。虽 然，吾与汝共之。”子贡曰：“敢问其方？”孔子曰：“鱼相造乎水 ，人相造乎道。相造乎水者，穿池而养给；相造乎道者，无事而生定 。故曰：鱼相忘乎江湖，人相忘乎道术。”子贡曰：“敢问畸人？” 曰：“畸人者，畸于人而侔于天。故曰：天之小人，人之君子；人之 君子，天之小人也。”颜回问仲尼曰：“孟孙才，其母死，哭泣无涕，中心不戚，居丧不 哀。无是三者，以善处丧盖鲁国，固有无其实而得其名者乎？回壹怪 之。”仲尼曰：“夫孟孙氏尽之矣，进于知矣，唯简之而不得，夫已 有所简矣。孟孙氏不知所以生，不知所以死。不知就先，不知就后。 若化为物，以待其所不知之化已乎。且方将化，恶知不化哉？方将不 化，恶知已化哉？吾特与汝，其梦未始觉者邪！且彼有骇形而无损心 ，有旦宅而无情死。孟孙氏特觉，人哭亦哭，是自其所以乃。且也相 与‘吾之’耳矣，庸讵知吾所谓‘吾之’乎？且汝梦为鸟而厉乎天， 梦为鱼而没于渊。不识今之言者，其觉者乎？其梦者乎？造适不及笑 ，献笑不及排，安排而去化，乃入于寥天一。”意而子见许由，许由曰：“尧何以资汝？”意而子曰：“尧谓我： 汝必躬服仁义而明言是非。”许由曰：“而奚来为轵？夫尧既已黥汝 以仁义，而劓汝以是非矣。汝将何以游夫遥荡恣睢转徙之涂乎？”意而子曰：“虽然，吾愿游于其藩。”许由曰：“不然。夫盲者无 以与乎眉目颜色之好，瞽者无以与乎青黄黼黻之观。”意而子曰：“ 夫无庄之失其美，据梁之失其力，黄帝之亡其知，皆在炉捶之间耳。 庸讵知夫造物者之不息我黥而补我劓，使我乘成以随先生邪？”许由 曰：“噫！未可知也。我为汝言其大略：吾师乎！吾师乎！赍万物而 不为义，泽及万世而不为仁，长于上古而不为老，覆载天地、刻雕众 形而不为巧。此所游已！颜回曰：“回益矣。”仲尼曰：“何谓也？”曰：“回忘仁义矣。”曰：“可矣，犹未也。”他日，复见，曰：“回益矣。”曰：“何谓也？”曰：“回忘礼乐矣。”曰：“可矣，犹未也。”他日，复见，曰：“回益矣。”曰：“何谓也？”曰：“回坐忘矣。”仲尼蹴然曰：“何谓坐忘？”颜回曰：“堕肢体，黜聪明，离形去智，同于大通，此谓坐忘。”仲尼曰：“同则无好也，化则无常也。而果其贤乎！丘也请从而后也。”子舆与子桑友。而霖雨十日，子舆曰：“子桑殆病矣！”裹饭而往 食之。至子桑之门，则若歌若哭，鼓琴曰：“父邪！母邪！天乎！人 乎！”有不任其声而趋举其诗焉。子舆入，曰：“子之歌诗，何故若 是？”曰：“吾思夫使我至此极者而弗得也。父母岂欲吾贫哉？天无 私覆，地无私载，天地岂私贫我哉？求其为之者而不得也！然而至此极者，命也夫！”"
          },
          {
            name: "庄子·外篇·知北游-人生天地之间，若白驹之过隙，忽然而已",
            content: "知北游于玄水之上，登隐弅之丘，而适遭无为谓焉。知谓无为谓曰：“予欲有问乎若：何思何虑则知道？何处何服则安道？何从何道则得道？”三问而无为谓不答也。非不答，不知答也。知不得问，反于白水之南，登狐阕之上，而睹狂屈焉。知以之言也问乎狂屈。狂屈曰：“唉！予知之，将语若，中欲言而忘其所欲言。”知不得问，反于帝宫，见黄帝而问焉。黄帝曰：“无思无虑始知道，无处无服始安道，无从无道始得道。”知问黄帝曰：“我与若知之，彼与彼不知也，其孰是邪？”黄帝曰：“彼无为谓真是也，狂屈似之，我与汝终不近也。夫知者不言，言者不知，故圣人行不言之教。道不可致，德不可至。仁可为也，义可亏也，礼相伪也。故曰：‘失道而后德，失德而后仁，失仁而后义，失义而后礼。’礼者，道之华而乱之首也。故曰：‘为道者日损，损之又损之，以至于无为。无为而无不为也。’今已为物也，欲复归根，不亦难乎！其易也其唯大人乎！生也死之徒，死也生之始，孰知其纪！人之生，气之聚也。聚则为生，散则为死。若死生为徒，吾又何患！故万物一也。是其所美者为神奇，其所恶者为臭腐。臭腐复化为神奇，神奇复化为臭腐。故曰：‘通天下一气耳。’圣人故贵一。”知谓黄帝曰：“吾问无为谓，无为谓不应我，非不我应，不知应我也；吾问狂屈，狂屈中欲告我而不我告，非不我告，中欲告而忘之也；今予问乎若，若知之，奚故不近？”黄帝曰：“彼其真是也，以其不知也；此其似之也，以其忘之也；予与若终不近也，以其知之也。”狂屈闻之，以黄帝为知言。天地有大美而不言，四时有明法而不议，万物有成理而不说。圣人者，原天地之美而达万物之理。是故至人无为，大圣不作，观于天地之谓也。今彼神明至精，与彼百化。物已死生方圆，莫知其根也。扁然而万物，自古以固存。六合为巨，未离其内；秋豪为小，待之成体；天下莫不沉浮，终身不故；阴阳四时运行，各得其序；惛然若亡而存；油然不形而神；万物畜而不知：此之谓本根，可以观于天矣！啮缺问道乎被衣，被衣曰：“若正汝形，一汝视，天和将至；摄汝知，一汝度，神将来舍。德将为汝美，道将为汝居。汝瞳焉如新生之犊而无求其故。”言未卒，啮缺睡寐。被衣大说，行歌而去之，曰：“形若槁骸，心若死灰，真其实知，不以故自持。媒媒晦晦，无心而不可与谋。彼何人哉！”舜问乎丞：“道可得而有乎？”曰：“汝身非汝有也，汝何得有夫道！”舜曰：“吾身非吾有也，孰有之哉？”曰：“是天地之委形也；生非汝有，是天地之委和也；性命非汝有，是天地之委顺也；子孙非汝有，是天地之委蜕也。故行不知所往，处不知所持，食不知所味。天地之强阳气也，又胡可得而有邪！”孔子问于老聃曰：“今日晏闲，敢问至道。”老聃曰：“汝齐戒，疏瀹而心，澡雪而精神，掊击而知。夫道，窨然难言哉！将为汝言其崖略：夫昭昭生于冥冥，有伦生于无形，精神生于道，形本生于精，而万物以形相生。故九窍者胎生，八窍者卵生。其来无迹，其往无崖，无门无房，四达之皇皇也。邀于此者，四肢强，思虑恂达，耳目聪明。其用心不劳，其应物无方，天不得不高，地不得不广，日月不得不行，万物不得不昌，此其道与！且夫博之不必知，辩之不必慧，圣人以断之矣！若夫益之而不加益，损之而不加损者，圣人之所保也。渊渊乎其若海，魏魏乎其终则复始也。运量万物而不匮。则君子之道，彼其外与！万物皆往资焉而不匮。此其道与！“中国有人焉，非阴非阳，处于天地之间，直且为人，将反于宗。自本观之，生者，喑噫物也。虽有寿夭，相去几何？须臾之说也，奚足以为尧、桀之是非！果蓏有理，人伦虽难，所以相齿。圣人遭之而不违，过之而不守。调而应之，德也；偶而应之，道也。帝之所兴，王之所起也。“人生天地之间，若白驹之过隙，忽然而已。注然勃然，莫不出焉；油然寥然，莫不入焉。已化而生，又化而死。生物哀之，人类悲之。解其天韬，堕其天帙。纷乎宛乎，魂魄将往，乃身从之。乃大归乎！不形之形，形之不形，是人之所同知也，非将至之所务也，此众人之所同论也。彼至则不论，论则不至；明见无值，辩不若默；道不可闻，闻不若塞：此之谓大得。”东郭子问于庄子曰：“所谓道，恶乎在？”庄子曰：“无所不在。”东郭子曰：“期而后可。”庄子曰：“在蝼蚁。”曰：“何其下邪？”曰：“在稊稗。”曰：“何其愈下邪？”曰：“在瓦甓。”曰：“何其愈甚邪？”曰：“在屎溺。”东郭子不应。庄子曰：“夫子之问也，固不及质。正、获之问于监市履狶也，‘每下愈况’。汝唯莫必，无乎逃物。至道若是，大言亦然。周遍咸三者，异名同实，其指一也。尝相与游乎无有之宫，同合而论，无所终穷乎！尝相与无为乎！澹澹而静乎！漠而清乎！调而闲乎！寥已吾志，无往焉而不知其所至，去而来不知其所止。吾往来焉而不知其所终，彷徨乎冯闳，大知入焉而不知其所穷。物物者与物无际，而物有际者，所谓物际者也。不际之际，际之不际者也。谓盈虚衰杀，彼为盈虚非盈虚，彼为衰杀非衰杀，彼为本末非本末，彼为积散非积散也。”妸荷甘与神农同学于老龙吉。神农隐几，阖户昼瞑。妸荷甘日中奓户而入，曰：“老龙死矣！”神农隐几拥杖而起，嚗然放杖而笑，曰：“天知予僻陋谩诞，故弃予而死。已矣，夫子无所发予之狂言而死矣夫！”弇堈吊闻之，曰：“夫体道者，天下之君子所系焉。今于道，秋豪之端万分未得处一焉，而犹知藏其狂言而死，又况夫体道者乎！视之无形，听之无声，于人之论者，谓之冥冥，所以论道而非道也。”于是泰清问乎无穷，曰：“子知道乎？”无穷曰：“吾不知。”又问乎无为，无为曰：“吾知道。”曰：“子之知道，亦有数乎？”曰：“有。”曰：“其数若何？”无为曰：“吾知道之可以贵、可以贱、可以约、可以散，此吾所以知道之数也。”泰清以之言也问乎无始，曰：“若是，则无穷之弗知与无为之知，孰是而孰非乎？”无始曰：“不知深矣，知之浅矣；弗知内矣，知之外矣。”于是泰清仰而叹曰：“弗知乃知乎，知乃不知乎！孰知不知之知？”无始曰：“道不可闻，闻而非也；道不可见，见而非也；道不可言，言而非也！知形形之不形乎！道不当名。”无始曰：“有问道而应之者，不知道也；虽问道者，亦未闻道。道无问，问无应。无问问之，是问穷也；无应应之，是无内也。以无内待问穷，若是者，外不观乎宇宙，内不知乎大初。是以不过乎昆仑，不游乎太虚。”光曜问乎无有曰：“夫子有乎？其无有乎？”光曜不得问而孰视其状貌：窨然空然。终日视之而不见，听之而不闻，搏之而不得也。光曜曰：“至矣，其孰能至此乎！予能有无矣，而未能无无也。及为无有矣，何从至此哉！”大马之捶钩者，年八十矣，而不失豪芒。大马曰：“子巧与！有道与？”曰：“臣有守也。臣之年二十而好捶钩，于物无视也，非钩无察也。”是用之者假不用者也，以长得其用，而况乎无不用者乎！物孰不资焉！冉求问于仲尼曰：“未有天地可知邪？”仲尼曰：“可。古犹今也。”冉求失问而退。明日复见，曰：“昔者吾问‘未有天地可知乎？’夫子曰：‘可。古犹今也。’昔日吾昭然，今日吾昧然。敢问何谓也？”仲尼曰：“昔之昭然也，神者先受之；今之昧然也，且又为不神者求邪！无古无今，无始无终。未有子孙而有孙子可乎？”冉求未对。仲尼曰：“已矣，末应矣！不以生生死，不以死死生。死生有待邪？皆有所一体。有先天地生者物邪？物物者非物，物出不得先物也，犹其有物也。犹其有物也无已！圣人之爱人也终无已者，亦乃取于是者也。”颜渊问乎仲尼曰：“回尝闻诸夫子曰：‘无有所将，无有所迎。’回敢问其游。”仲尼曰：“古之人外化而内不化，今之人内化而外不化。与物化者，一不化者也。安化安不化？安与之相靡？必与之莫多。狶韦氏之囿，黄帝之圃，有虞氏之宫，汤武之室。君子之人，若儒墨者师，故以是非相赍也，而况今之人乎！圣人处物不伤物。不伤物者，物亦不能伤也。唯无所伤者，为能与人相将迎。山林与，皋壤与，使我欣欣然而乐与！乐未毕也，哀又继之。哀乐之来，吾不能御，其去弗能止。悲夫，世人直为物逆旅耳！夫知遇而不知所不遇，知能能而不能所不能。无知无能者，固人之所不免也。夫务免乎人之所不免者，岂不亦悲哉！至言去言，至为去为。齐知之，所知则浅矣！”"
          },
          {
            name: "庄子·外篇·徐无鬼-农夫无草莱之事则不比；商贾无市井之事则不比",
            content: "徐无鬼因女商见魏武侯，武侯劳之曰：“先生病矣，苦于山林之劳，故乃肯见于寡人。”徐无鬼曰：“我则劳于君，君有何劳于我！君将盈耆欲，长好恶，则性命之情病矣；君将黜耆欲，牵好恶，则耳目病矣。我将劳君，君有何劳于我！”武侯超然不对。少焉，徐无鬼曰：“尝语君吾相狗也：下之质，执饱而止，是狸德也；中之质，若视日；上之质，若亡其一。吾相狗又不若吾相马也。吾相马：直者中绳，曲者中钩，方者中矩，圆者中规。是国马也，而未若天下马也。天下马有成材，若卹若失，若丧其一。若是者，超轶绝尘，不知其所。”武侯大悦而笑。徐无鬼出，女商曰：“先生独何以说吾君乎？吾所以说吾君者，横说之则以《诗》、《书》、《礼》、《乐》，从说则以《金板》、《六韬》，奉事而大有功者不可为数，而吾君未尝启齿。今先生何以说吾君？使吾君说若此乎？”徐无鬼曰：“吾直告之吾相狗马耳。”女商曰：“若是乎？”曰：“子不闻夫越之流人乎？去国数日，见其所知而喜；去国旬月，见所尝见于国中者喜；及期年也，见似人者而喜矣。不亦去人滋久，思人滋深乎？夫逃虚空者，藜藋柱乎鼪鼬之径，良位其空，闻人足音跫然而喜矣，又况乎昆弟亲戚之謦欬其侧者乎！久矣夫，莫以真人之言謦欬吾君之侧乎！”徐无鬼见武侯，武侯曰：“先生居山林，食芧栗，厌葱韭，以宾寡人，久矣夫！今老邪？其欲干酒肉之味邪？其寡人亦有社稷之福邪？”徐无鬼曰：“无鬼生于贫贱，未尝敢饮食君之酒肉，将来劳君也。”君曰：“何哉！奚劳寡人？”曰：“劳君之神与形。”武侯曰：“何谓邪？”徐无鬼曰：“天地之养也一，登高不可以为长，居下不可以为短。君独为万乘之主，以苦一国之民，以养耳目鼻口，夫神者不自许也。夫神者，好和而恶奸。夫奸，病也，故劳之。唯君所病之何也？”武侯曰：“欲见先生久矣！吾欲爱民而为义偃兵，其可乎？”徐无鬼曰：“不可。爱民，害民之始也；为义偃兵，造兵之本也。君自此为之，则殆不成。凡成美，恶器也。君虽为仁义，几且伪哉！形固造形，成固有伐，变固外战。君亦必无盛鹤列于丽谯之间，无徒骥于锱坛之宫，无藏逆于得，无以巧胜人，无以谋胜人，无以战胜人。夫杀人之士民，兼人之土地，以养吾私与吾神者，其战不知孰善？胜之恶乎在？君若勿已矣！修胸中之诚以应天地之情而勿撄。夫民死已脱矣，君将恶乎用夫偃兵哉！黄帝将见大隗乎具茨之山，方明为御，昌寓骖乘，张若、谐朋前马，昆阍、滑稽后车。至于襄城之野，七圣皆迷，无所问涂。适遇牧马童子，问涂焉，曰：“若知具茨之山乎？”曰：“然。”“若知大隗之所存乎？”曰：“然。”黄帝曰：“异哉小童！非徒知具茨之山，又知大隗之所存。请问为天下。”小童曰：“夫为天下者，亦若此而已矣，又奚事焉！予少而自游于六合之内，予适有瞀病，有长者教予曰：‘若乘日之车而游于襄城之野。’今予病少痊，予又且复游于六合之外。夫为天下亦若此而已。予又奚事焉！”黄帝曰：“夫为天下者，则诚非吾子之事，虽然，请问为天下。”小童辞。黄帝又问。小童曰：“夫为天下者，亦奚以异乎牧马者哉！亦去其害马者而已矣！”黄帝再拜稽首，称天师而退。知士无思虑之变则不乐；辩士无谈说之序则不乐；察士无凌谇之事则不乐：皆囿于物者也。招世之士兴朝；中民之士荣官；筋力之士矜難；勇敢之士奋患；兵革之士乐战；枯槁之士宿名；法律之士广治；禮教之士敬容；仁义之士贵际。农夫无草莱之事则不比；商贾无市井之事则不比；庶人有旦暮之业则劝；百工有器械之巧则壮。钱财不积则贪者忧，权势不尤则夸者悲，势物之徒乐变。遭时有所用，不能无为也，此皆顺比于岁，不物于易者也。驰其形性，潜之万物，终身不反，悲夫！庄子曰：“射者非前期而中谓之善射，天下皆羿也，可乎？”惠子曰：“可。”庄子曰：“天下非有公是也，而各是其所是，天下皆尧也，可乎？”惠子曰：“可。”庄子曰：“然则儒墨杨秉四，与夫子为五，果孰是邪？或者若鲁遽者邪？其弟子曰：‘我得夫子之道矣！吾能冬爨鼎而夏造冰矣！’鲁遽曰：‘是直以阳召阳，以阴召阴，非吾所谓道也。吾示子乎吾道。’于是乎为之调瑟，废一于堂，废一于室，鼓宫宫动，鼓角角动，音律同矣！夫或改调一弦，于五音无当也，鼓之，二十五弦皆动，未始异于声而音之君已！且若是者邪！”惠子曰∶“今乎儒墨杨秉，且方与我以辩，相拂以辞，相镇以声，而未始吾非也，则奚若矣？”庄子曰：“齐人蹢子于宋者，其命阍也不以完；其求钘钟也以束缚；其求唐子也而未始出域：有遗类矣！夫楚人寄而蹢阍者；夜半于无人之时而与舟人斗，未始离于岑而足以造于怨也。”庄子送葬，过惠子之墓，顾谓从者曰：“郢人垩慢其鼻端若蝇翼，使匠人斫之。匠石运斤成风，听而斫之，尽垩而鼻不伤，郢人立不失容。宋元君闻之，召匠石曰：‘尝试为寡人为之。’匠石曰：‘臣则尝能斫之。虽然，臣之质死久矣！’自夫子之死也，吾无以为质矣，吾无与言之矣！”管仲有病，桓公问之曰：“仲父之病病矣，可不讳云，至于大病，则寡人恶乎属国而可？”管仲曰：“公谁欲与？”公曰：“鲍叔牙。”曰：“不可。其为人洁廉，善士也；其于不己若者不比之；又一闻人之过，终身不忘。使之治国，上且钩乎君，下且逆乎民。其得罪于君也将弗久矣！”公曰：“然则孰可？”对曰：“勿已则隰朋可。其为人也，上忘而下畔，愧不若黄帝，而哀不己若者。以德分人谓之圣；以财分人谓之贤。以贤临人，未有得人者也；以贤下人，未有不得人者也。其于国有不闻也，其于家有不见也。勿已则隰朋可。”吴王浮于江，登乎狙之山，众狙见之，恂然弃而走，逃于深蓁。有一狙焉，委蛇攫囗（“搔”字以“爪”代“虫”音ｚａｏ３），见巧乎王。王射之，敏给搏捷矢。王命相者趋射之，狙执死。王顾谓其友颜不疑曰：“之狙也，伐其巧、恃其便以敖予，以至此殛也。戒之哉！嗟乎！无以汝色骄人哉？”颜不疑归而师董梧，以锄其色，去乐辞显，三年而国人称之。南伯子綦隐几而坐，仰天而嘘。颜成子入见曰：“夫子，物之尤也。形固可使若槁骸，心固可使若死灰乎？”曰：“吾尝居山穴之中矣。当是时也，田禾一睹我而齐国之众三贺之。我必先之，彼故知之；我必卖之，彼故鬻之。若我而不有之，彼恶得而知之？若我而不卖之，彼恶得而鬻之？嗟乎！我悲人之自丧者；吾又悲夫悲人者；吾又悲夫悲人之悲者；其后而日远矣！”仲尼之楚，楚王觞之。孙叔敖执爵而立。市南宜僚受酒而祭，曰：“古之人乎！于此言已。”曰：“丘也闻不言之言矣，未之尝言，于此乎言之：市南宜僚弄丸而两家之难解；孙叔敖甘寝秉羽而郢人投兵；丘愿有喙三尺。”彼之谓不道之道，此之谓不言之辩。故德总乎道之所一，而言休乎知之所不知，至矣。道之所一者，德不能同也。知之所不能知者，辩不能举也。名若儒墨而凶矣。故海不辞东流，大之至也。圣人并包天地，泽及天下，而不知其谁氏。是故生无爵，死无谥，实不聚，名不立，此之谓大人。狗不以善吠为良，人不以善言为贤，而况为大乎！夫为大不足以为大，而况为德乎！夫大备矣，莫若天地。然奚求焉，而大备矣！知大备者，无求，无失，无弃，不以物易己也。反己而不穷，循古而不摩，大人之诚！子綦有八子，陈诸前，召九方歅曰：“为我相吾子，孰为祥。”九方囗曰：“梱也为祥。”子綦瞿然喜曰：“奚若？”曰：“梱也，将与国君同食以终其身。”子綦索然出涕曰：“吾子何为以至于是极也？”九方囗曰：“夫与国君同食，泽及三族，而况父母乎！今夫子闻之而泣，是御福也。子则祥矣，父则不祥。”子綦曰：“歅，汝何足以识之。而梱祥邪？尽于酒肉，入于鼻口矣，而何足以知其所自来！吾未尝为牧而牂生于奥，未尝好田而鹑生于宎，若勿怪，何邪？吾所与吾子游者，游于天地，吾与之邀乐于天，吾与之邀食于地。吾不与之为事，不与之为谋，不与之为怪。吾与之乘天地之诚而不以物与之相撄，吾与之一委蛇而不与之为事所宜。今也然有世俗之偿焉？凡有怪征者必有怪行。殆乎！非我与吾子之罪，几天与之也！吾是以泣也。”无几何而使梱之于燕，盗得之于道，全而鬻之则难，不若刖之则易。于是乎刖而鬻之于齐，适当渠公之街，然身食肉而终。啮缺遇许由曰：“子将奚之？”曰：“将逃尧。”曰：“奚谓邪？”曰：“夫尧畜畜然仁，吾恐其为天下笑。后世其人与人相食与！夫民不难聚也，爱之则亲，利之则至，誉之则劝，致其所恶则散。爱利出乎仁义，捐仁义者寡，利仁义者众。夫仁义之行，唯且无诚，且假乎禽贪者器。是以一人之断制天下，譬之犹一覕也。夫尧知贤人之利天下也，而不知其贼天下也。夫唯外乎贤者知之矣。”有暖姝者，有濡需者，有卷娄者。所谓暖姝者，学一先生之言，则暖暖姝姝而私自说也，自以为足矣，而未知未始有物也。是以谓暖姝者也。濡需者，豕虱是也，择疏鬣长毛，自以为广宫大囿。奎蹄曲隈，乳间股脚，自以为安室利处。不知屠者之一旦鼓臂布草操烟火，而己与豕俱焦也。此以域进，此以域退，此其所谓濡需者也。卷娄者，舜也。羊肉不慕蚁，蚁慕羊肉，羊肉羶也。舜有羶行，百姓悦之，故三徙成都，至邓之虚而十有万家。尧闻舜之贤，举之童土之地，曰：“冀得其来之泽。”舜举乎童土之地，年齿长矣，聪明衰矣，而不得休归，所谓卷娄者也。是以神人恶众至，众至则不比，不比则不利也。故无所甚亲，无所甚疏，抱德炀和，以顺天下，此谓真人。于蚁弃知，于鱼得计，于羊弃意。以目视目，以耳听耳，以心复心。若然者，其平也绳，其变也循。古之真人！以天待之，不以人入天，古之真人！得之也生，失之也死；得之也死，失之也生：药也。其实堇也，桔梗也，鸡雍也，豕零也，是时为帝者也，何可胜言！句践也以甲楯三千栖于会稽，唯种也能知亡之所以存，唯种也不知其身之所以愁。故曰：鸱目有所适，鹤胫有所节，解之也悲。故曰：风之过，河也有损焉；日之过，河也有损焉；请只风与日相与守河，而河以为未始其撄也，恃源而往者也。故水之守土也审，影之守人也审，物之守物也审。故目之于明也殆，耳之于聪也殆，心之于殉也殆，凡能其于府也殆，殆之成也不给改。祸之长也兹萃，其反也缘功，其果也待久。而人以为己宝，不亦悲乎！故有亡国戮民无已，不知问是也。故足之于地也践，虽践，恃其所不蹍而后善博也；人之知也少，虽少，恃其所不知而后知天之所谓也。知大一，知大阴，知大目，知大均，知大方，知大信，知大定，至矣！大一通之，大阴解之，大目视之，大均缘之，大方体之，大信稽之，大定持之。尽有天，循有照，冥有枢，始有彼。则其解之也似不解之者，其知之也似不知之也，不知而后知之。其问之也，不可以有崖，而不可以无崖。颉滑有实，古今不代，而不可以亏，则可不谓有大扬搉乎！阖不亦问是已，奚惑然为！以不惑解惑，复于不惑，是尚大不惑。"
          }
        ]
      },
      {
        author: "墨家",
        article: [
          {
            name: "墨子·第十四章·兼爱上",
            content: "圣人以治天下为事者也，必知乱之所自起，焉能治之；不知乱之所自起，则不能治。譬之如医之攻人之疾者然：必知疾之所自起，焉能攻之；不知疾之所自起，则弗能攻。治乱者何独不然？必知乱之所自起，焉能治之；不知乱之斯自起，则弗能治。圣人以治天下为事者也，不可不察乱之所自起。当察乱何自起？起不相爱。臣子之不孝君父，所谓乱也。子自爱，不爱父，故亏父而自利；弟自爱，不爱兄，故亏兄而自利；臣自爱，不爱君，故亏君而自利，此所谓乱也。虽父之不慈子，兄之不慈弟，君之不慈臣，此亦天下之所谓乱也。父自爱也，不爱子，故亏子而自利；兄自爱也，不爱弟，故亏弟而自利；君自爱也，不爱臣，故亏臣而自利。是何也？皆起不相爱。虽至天下之为盗贼者亦然：盗爱其室，不爱其异室，故窃异室以利其室。贼爱其身，不爱人，故贼人以利其身。此何也？皆起不相爱。虽至大夫之相乱家，诸侯之相攻国者亦然：大夫各爱其家，不爱异家，故乱异家以利其家。诸侯各爱其国，不爱异国，故攻异国以利其国，天下之乱物，具此而已矣。察此何自起？皆起不相爱。若使天下兼相爱，爱人若爱其身，犹有不孝者乎？视父兄与君若其身，恶施不孝？犹有不慈者乎？视弟子与臣若其身，恶施不慈？故不孝不慈亡有。犹有盗贼乎？故视人之室若其室，谁窃？视人身若其身，谁贼？故盗贼亡有。犹有大夫之相乱家、诸侯之相攻国者乎？视人家若其家，谁乱？视人国若其国，谁攻？故大夫之相乱家、诸侯之相攻国者亡有。若使天下兼相爱，国与国不相攻，家与家不相乱，盗贼无有，君臣父子皆能孝慈，若此，则天下治。故圣人以治天下为事者，恶得不禁恶而劝爱？故天下兼相爱则治，交相恶则乱。故子墨子曰：“不可以不劝爱人者，此也。”"
          },
          {
            name: "墨子·第十五章·兼爱中",
            content: "子墨子言曰：“仁人之所以为事者，必兴天下之利，除去天下之害，以此为事者也。”然则天下之利何也？天下之害何也？子墨子言曰：“今若国之与国之相攻，家之与家之相篡，人之与人之相贼，君臣不惠忠，父子不慈孝，兄弟不和调，此则天下之害也。”然则崇此害亦何用生哉？以不相爱生邪？子墨子言：“以不相爱生。”今诸侯独知爱其国，不爱人之国，是以不惮举其国，以攻人之国。今家主独知爱其家，而不爱人之家，是以不惮举其家，以篡人之家。今人独知爱其身，不爱人之身，是以不惮举其身，以贼人之身。是故诸侯不相爱，则必野战；家主不相爱，则必相篡；人与人不相爱，则必相贼；君臣不相爱，则不惠忠；父子不相爱，则不慈孝；兄弟不相爱，则不和调。天下之人皆不相爱，强必执弱，富必侮贫，贵必敖贱，诈必欺愚。凡天下祸篡怨恨，其所以起者，以不相爱生也，是以仁者非之。既以非之，何以易之？子墨子言曰：“以兼相爱、交相利之法易之。”然则兼相爱、交相利之法，将奈何哉？子墨子言：“视人之国，若视其国；视人之家，若视其家；视人之身，若视其身。是故诸侯相爱，则不野战；家主相爱，则不相篡；人与人相爱，则不相贼；君臣相爱，则惠忠；父子相爱，则慈孝；兄弟相爱，则和调。天下之人皆相爱，强不执弱，众不劫寡，富不侮贫，贵不敖贱，诈不欺愚。凡天下祸篡怨恨，可使毋起者，以相爱生也，是以仁者誉之。”然而今天下之士君子曰：“然！乃若兼则善矣；虽然，天下之难物于故也。”子墨子言曰：“天下之士君子，特不识其利、辩其故也。今若夫攻城野战，杀身为名，此天下百姓之所皆难也。苟君说之，则士众能为之。况于兼相爱、交相利，则与此异！夫爱人者，人必从而爱之；利人者，人必从而利之；恶人者，人必从而恶之；害人者，人必从而害之。此何难之有？特上弗以为政，士不以为行故也。”昔者晋文公好士之恶衣，故文公之臣，皆牂羊之裘，韦以带剑，练帛之冠，入以见于君，出以践于朝。是其故何也？君说之，故臣为之也。昔者楚灵王好士细要，故灵王之臣，皆以一饭为节，胁息然后带，扶墙然后起。比期年，朝有黧黑之色。是其故何也?君说之，故臣能之也。昔越王勾践好士之勇，教驯其臣和合之，焚舟失火，试其士曰：“越国之宝尽在此！”越王亲自鼓其士而进之。士闻鼓音，破碎乱行，蹈火而死者，左右百人有余，越王击金而退之。是故子墨子言曰：“乃若夫少食、恶衣、杀身而为名，此天下百姓之所皆难也，若苟君说之，则众能为之；况兼相爱、交相利，与此异矣！夫爱人者，人亦从而爱之；利人者，人亦从而利之；恶人者，人亦从而恶之；害人者，人亦从而害之。此何难之有焉？特君不以为政，而士不以为行故也。然而今天下之士君子曰：“然！乃若兼则善矣；虽然，不可行之物也。譬若挈太山越河、济也。”子墨子言：“是非其譬也。夫挈太山而越河、济，可谓毕劫有力矣。自古及今，未有能行之者也；况乎兼相爱、交相利，则与此异，古者圣王行之。”何以知其然？古者禹治天下，西为西河渔窦，以泄渠、孙、皇之水。北为防、原、派、注后之邸，噱池之窦洒为底柱，凿为龙门，以利燕代胡貉与西河之民。东为漏大陆，防孟诸之泽，洒为九浍，以楗东土之水，以利冀州之民。南为江、汉、淮、汝，东流之注五湖之处，以利荆楚、干、越与南夷之民。此言禹之事，吾今行兼矣。昔者文王之治西土，若日若月，乍光于四方，于西土。不为大国侮小国，不为众庶侮鳏寡，不为暴势夺穑人黍稷狗彘。天屑临文王慈，是以老而无子者，有所得终其寿；连独无兄弟者，有所杂于生人之闲间，少失其父母者，有所放依而长。此文王之事，则吾今行兼矣。昔者武王将事太山，隧传曰：“泰山，有道曾孙周王有事。大事既获，仁人尚作，以祗商、夏、蛮夷丑貉。虽有周亲，不若仁人，万方有罪，维予一人。”此言武王之事，吾今行兼矣。是故子墨子言曰：“今天下之士君子，忠实欲天下之富，而恶其贫；欲天下之治，而恶其乱，当兼相爱、交相利。此圣王之法，天下之治道也，不可不务为也。”"
          },
          {
            name: "墨子·第十六章·兼爱下",
            content: "子墨子言曰：“仁人之事者，必务求兴天下之利，除天下之害。”然当今之时，天下之害孰为大？曰：若大国之攻小国也，大家之乱小家也，强之劫弱，众之暴寡，诈之谋愚，贵之敖贱，此天下之害也。又与为人君者之不惠也，臣者之不忠也，父者之不慈也，子者之不孝也，此又天下之害也。又与今人之贱人，执其兵刃毒药水火，以交相亏贼，此又天下之害也。姑尝本原若众害之所自生。此胡自生？此自爱人、利人生与？即必曰：“非然也。”必曰：“从恶人、贼人生。”分名乎天下，恶人而贼人者，兼与？别与？即必曰：“别也。”然即之交别者，果生天下之大害者与？是故别非也。子墨子曰：“非人者必有以易之，若非人而无以易之，譬之犹以水救水也，其说将必无可矣。”是故子墨子曰：“兼以易别。”然即兼之可以易别之故何也？曰：藉为人之国，若为其国，夫谁独举其国，以攻人之国者哉？为彼者，由为己也。为人之都，若为其都，夫谁独举其都以伐人之都者哉？为彼者犹为己也。为人之家，若为其家，夫谁独举其家以乱人之家者哉？为彼者犹为己也。然即国都不相攻伐，人家不相乱贼，此天下之害与？天下之利与？即必曰天下之利也。姑尝本原若众利之所自生，此胡自生？此自恶人贼人生与？即必曰：“非然也。”必曰：“从爱人利人生。”分名乎天下爱人而利人者，别与？兼与？即必曰：“兼也。”然即之交兼者，果生天下之大利与？是故子墨子曰:“兼是也。”且乡吾本言曰：“仁人之是者，必务求兴天下之利，除天下之害。今吾本原兼之所生，天下之大利者也；今吾本原别之所生，天下之大害者也。是故子墨子曰：“别非而兼是者。”出乎若方也。今吾将正求与天下之利而取之，以兼为正，是以聪耳明目相与视听乎？是以股肱毕强相为动宰乎？而有道肆相教诲，是以老而无妻子者，有所侍养以终其寿；幼弱孤童之无父母者，有所放依以长其身。今唯毋以兼为正，即若其利也。不识天下之士，所以皆闻兼而非者，其故何也？然而天下之士，非兼者之言，犹未止也。曰：“即善矣!虽然，岂可用哉？”子墨子曰:“用而不可，虽我亦将非之；且焉有善而不可用者。”姑尝两而进之。谁以为二士，使其一士者执别，使其一士者执兼。是故别士之言曰：“吾岂能为吾友之身，若为吾身？为吾友之亲，若为吾亲？”是故退睹其友，饥即不食，寒即不衣，疾病不侍养，死丧不葬埋。别士之言若此，行若此。兼士之言不然，行亦不然。曰：“吾闻高士于天下者，必为其友之身，若为其身；为其友之亲，若为其亲。然后可以为高士于天下。”是故退睹其友，饥则食之，寒则衣之，疾病侍养之，死丧葬埋之，兼士之言若此，行若此。若之二士者，言相非而行相反与？当使若二士者，言必信，行必果，使言行之合，犹合符节也，无言而不行也。然即敢问：今有平原广野于此，被甲婴胄，将往战，死生之权未可识也；又有君大夫之远使于巴、越、齐、荆，往来及否，未可识也。然即敢问：不识将恶也，家室，奉承亲戚、提挈妻子而寄托之，不识于兼之有是乎？于别之有是乎？我以为当其于此也，天下无愚夫愚妇，虽非兼之人，必寄托之于兼之有是也。此言而非兼，择即取兼，即此言行费也。不识天下之士，所以皆闻兼而非之者，其故何也？然而天下之士，非兼者之言，犹未止也。曰：“意可以择士，而不可以择君乎？”姑尝两而进之，谁以为二君，使其一君者执兼，使其一君者执别。是故别君之言曰：“吾恶能为吾万民之身，若为吾身？此泰非天下之情也。人之生乎地上之无几何也，譬之犹驰驷而过隙也。”是故退睹其万民，饥即不食，寒即不衣，疲病不侍养，死丧不葬埋。别君之言若此，行若此。兼君之言不然，行亦不然，曰：“吾闻为明君于天下者，必先万民之身，后为其身，然后可以为明君于天下。”是故退睹其万民，饥即食之，寒即衣之，疾病侍养之，死丧葬埋之。兼君之言若此，行若此。然即交若之二君者，言相非而行相反与？常使若二君者，言必信，行必果，使言行之合，犹合符节也，无言而不行也。然即敢问：今岁有疠疫，万民多有勤苦冻馁，转死沟壑中者，既已众矣。不识将择之二君者，将何从也？我以为当其于此也，天下无愚夫愚妇，虽非兼者，必从兼君是也。言而非兼，择即取兼，此言行拂也。不识天下所以皆闻兼而非之者，其故何也？然而天下之士非兼者之言，犹未止也。曰:“兼即仁矣，义矣；虽然，岂可为哉？吾譬兼之不可为也，犹挈泰山以超江、河也。故兼者，直愿之也，夫岂可为之物哉？”子墨子曰：“夫挈泰山以超江、河，自古之及今，生民而来，未尝有也。今若夫兼相爱、交相利，此自先圣六王者亲行之。”何知先圣六王之亲行之也？子墨子曰：“吾非与之并世同时，亲闻其声，见其色也；以其所书于竹帛、镂于金石、琢于盘盂，传遗后世子孙者知之。”泰誓曰：“文王若日若月乍照，光于四方，于西土。”即此言文王之兼爱天下之博大也；譬之日月，兼照天下之无有私也。即此文王兼也；虽子墨子之所谓兼者，于文王取法焉！且不唯《泰誓》为然，虽《禹誓》即亦犹是也。禹曰：“济济有众，咸听朕言！非惟小子，敢行称乱。蠢此有苗，用天之罚。若予既率而群对诸群，以征有苗。”禹之征有苗也，非以求以重富贵，干福禄，乐耳目也；以求兴天下之利，除天下之害。即此禹兼也；虽子墨子之所谓兼者，于禹求焉。且不唯《禹誓》为然，虽《汤说》即亦犹是也。汤曰：“惟予小子履，敢用玄牡。告于上天后曰：今天大旱，即当朕身屦，未知得罪于上下。有善不敢蔽，有罪不敢赦，简在帝心，万方有罪，即当朕身；朕身有罪，无及万方。”即此言汤贵为天子，富有天下，然且不惮以身为牺牲，以词说于上帝鬼神。即此汤兼也；虽子墨子之所谓兼者，于汤取法焉。且不惟誓命与汤说为然，《周诗》即亦犹是也。《周诗》曰：“王道荡荡，不偏不党；王道平平，不党不偏。其直若矢，其易若底。君子之所履，小人之所视。”若吾言非语道之谓也，古者文、武为正均分，赏贤罚暴，勿有亲戚弟兄之所阿。即此文、武兼也，虽子墨子之所谓兼者，于文、武取法焉。不识天下之人，所以皆闻兼而非之者，其故何也？然而天下之非兼者之言，犹未止。曰：“意不忠亲之利，而害为孝乎？”子墨子曰：“姑尝本原之孝子之为亲度者。吾不识孝子之为亲度者，亦欲人爱、利其亲与？意欲人之恶、贼其亲与？以说观之，即欲人之爱、利其亲也。然即吾恶先从事即得此？若我先从事乎爱利人之亲，然后人报我以爱利吾亲乎？意我先从事乎恶人之亲，然后人报我以爱利吾亲乎？即必吾先从事乎爱利人之亲，然后人报我以爱利吾亲也。然即之交孝子者，果不得已乎？毋先从事爱利人之亲与？意以天下之孝子为遇，而不足以为正乎？姑尝本原之。先王之所书，《大雅》之所道曰：“无言而不雠，无德而不报，投我以桃，报之以李。”即此言爱人者必见爱也，而恶人者必见恶也。不识天下之士，所以皆闻兼而非之者，其故何也？意以为难而不可为邪？尝有难此而可为者，昔荆灵王好小要，当灵王之身，荆国之士饭不逾乎一，固据而后兴，扶垣而后行。故约食为其难为也，然后为而灵王说之；未逾于世而民可移也，即求以乡其上也。昔者越王句践好勇，教其士臣三年，以其知为未足以知之也，焚舟失火，鼓而进之，其士偃前列，伏水火而死有不可胜数也。当此之时，不鼓而退也，越国之士，可谓颤矣。故焚身为其难为也，然后为之，越王说之，未逾于世，而民可移也，即求以乡其上也。昔者晋文公好粗服。当文公之时，晋国之士，大布之衣，牂羊之裘，练帛之冠，且粗之屦，入见文公，出以践之朝。故粗服为其难为也，然后为，而文公说之，未逾于世，而民可移也，即求以乡其上也。是故约食焚舟粗服，此天下之至难为也，然后为而上说之，未逾于世，而民可移也。何故也？即求以乡其上也。今若夫兼相爱、交相利，此其有利，且易为也，不可胜计也，我以为则无有上说之者而已矣。苟有上说之者，劝之以赏誉，威之以刑罚，我以为人之于就兼相爱、交相利也，譬之犹火之就上、水之就下也，不可防止于天下。故兼者，圣王之道也，王公大人之所以安也，万民衣食之所以足也，故君子莫若审兼而务行之。为人君必惠，为人臣必忠；为人父必慈，为人子必孝，为人兄必友，为人弟必悌。故君子莫若欲为惠君、忠臣、慈父、孝子、友兄、悌弟，当若兼之，不可不行也，此圣王之道，而万民之大利也。"
          },
          {
            name: "墨子·第十七章·非攻上",
            content: "今有一人，入人园圃，窃其桃李，众闻则非之，上为政者，得则罚之，此何也？以亏人自利也。至攘人犬豕鸡豚，其不义又甚入人园圃窃桃李。是何故也？以亏人愈多，其不仁兹甚，罪益厚。至入人栏厩，取人马牛者，其不仁又甚攘人犬豕鸡豚，此何故也？以其亏人愈多。苟亏人愈多，其不仁兹甚，罪益厚。至杀不辜人也，拖其衣裘，取戈剑者，其不义，又甚入人栏厩取人马牛。此何故也？以其亏人愈多。苟亏人愈多，其不仁兹甚矣，罪益厚。当此，天下之君子皆知而非之，谓之不义。今至大为攻国，则弗知非，从而誉之，谓之义。此可谓知义与不义之别乎？杀一人，谓之不义，必有一死罪矣。若以此说往，杀十人，十重不义，必有十死罪矣；杀百人，百重不义，必有百死罪矣。当此，天下之君子皆知而非之，谓之不义。今至大为不义攻国，则弗知非，从而誉之，谓之义，情不知其不义也，故书其言以遗后世。若知其不义也，夫奚说书其不义以遗后世哉？ 今有人于此，少见黑曰黑，多见黑曰白，则以此人为不知白黑之辩矣；少尝苦曰苦，多尝苦曰甘，则必以此人为不知甘苦之辩矣。今小为非，则知而非之；大为非攻国，则不知非，从而誉之，谓之义。此可谓知义与不义之辩乎？是以知天下之君子也，辩义与不义之乱也。"
          },
          {
            name: "墨子·第十八章·非攻中",
            content: "子墨子言曰：“古者王公大人为政于国家者，情欲誉之审，赏罚之当，刑政之不过失……。”是故子墨子曰：“古者有语：谋而不得，则以往知来，以见知隐。谋若此可得而知矣。”今师徒唯毋兴起，冬行恐寒，夏行恐暑，此不可以冬夏为者也。春则废民耕稼树艺，秋则废民获敛。今唯毋废一时，则百姓饥寒冻馁而死者，不可胜数。今尝计军上：竹箭、羽旄、幄幕、甲盾、拨劫，往而靡弊腑冷不反者，不可胜数。又与矛、戟、戈、剑、乘车，其列住碎拆靡弊而不反者，不可胜数。与其牛马，肥而往，瘠而反，往死亡而不反者，不可胜数。与其涂道之修远，粮食辍绝而不继，百姓死者，不可胜数也。与其居处之不安，食饭之不时，肌饱之不节，百姓之道疾病而死者，不可胜数。丧师多不可胜数，丧师尽不可胜计，则是鬼神之丧其主后，亦不可胜数。国家发政，夺民之用，废民之利，若此甚众，然而何为为之？曰：“我贪伐胜之名，及得之利，故为之。”子墨子言曰：“计其所自胜，无所可用也；计其所得，反不如所丧者之多。”今攻三里之城，七里之郭，攻此不用锐，且无杀，而徒得此然也？杀人多必数于万，寡必数于千，然后三里之城，七里之郭且可得也。今万乘之国，虚数于千，不胜而入；广衍数于万，不胜而辟。然则土地者，所有余也；王民者，所不足也。今尽王民之死，严下上之患，以争虚城，则是弃所不足，而重所有余也。为政若此，非国之务者也。饰攻战者言曰：“南则荆、吴之王，北则齐、晋之君，始封于天下之时，其土地之方，未至有数百里也；人徒之众，未至有数十万人也。以攻战之故，土地之博，至有数千里也；人徒之众，至有数百万人。故当攻战而不可为也。”子墨子言曰：“虽四五国则得利焉，犹谓之非行道也。譬若医之药人之有病者然，今有医于此，和合其祝药之于天下之有病者而药之。万人食此，若医四五人得利焉，犹谓之非行药也。故孝子不以食其亲，忠臣不以食其君。古者封国于天下，尚者以耳之所闻，近者以目之所见，以攻战亡者，不可胜数。”何以知其然也？东方有莒之国者，其为国甚小，闲于大国之闲，不敬事于大，大国亦弗之从而爱利，是以东者越人夹削其壤地，西者齐人兼而有之。计莒之所以亡于齐、越之间者，以是攻战也。虽南者陈、蔡，其所以亡于吴、越之间者，亦以攻战。虽北者且不一著何，其所以亡于燕代、胡貊之闲者，亦以攻战也。是故子墨子言曰：“古者王公大人，情欲得而恶失，欲安而恶危，故当攻战，而不可不非。”饰攻战者之言曰：“彼不能收用彼众，是故亡；我能收用我众，以此攻战于天下，谁敢不宾服哉！”子墨子言曰：“子虽能收用子之众，子岂若古者吴阖闾哉？”古者吴阖闾教七年，奉甲执兵，奔三百里而舍焉。次注林，出于冥隘之径，战于柏举，中楚国而朝宋与及鲁。至夫差之身，北而攻齐，舍于汶上，战于艾陵，大败齐人，而葆之大山；东而攻越，济三江五湖，而葆之会稽。九夷之国莫不宾服。于是退不能赏孤，施舍群萌，自恃其力，伐其功，誉其志，怠于教遂。筑姑苏之台，七年不成。及若此，则吴有离罢之心。越王勾践视吴上下不相得，收其众以复其雠，入北郭，徙大内，围王宫，而吴国以亡。昔者晋有六将军，而智伯莫为强焉。计其土地之博，人徒之众，欲以抗诸侯，以为英名，攻战之速，故差论其爪牙之士，皆列其舟车之众，以攻中行氏而有之。以其谋为既已足矣，又攻兹范氏而大败之，并三家以为一家而不止，又围赵襄子于晋阳。及若此，则韩、魏亦相从而谋曰：“古者有语：唇亡则齿寒。赵氏朝亡，我夕从之，赵氏夕亡，我朝从之。诗曰：鱼水不务，陆将何及乎！是以三主之君，一心戳力，辟门除道，奉甲兴士，韩、魏自外，赵氏自内，击智伯大败之。”是故子墨子言曰：“古者有语曰：君子不镜于水，而镜于人。镜于水，见面之容；镜于人，则知吉与凶。今以攻战为利，则盖尝鉴之于智伯之事乎？此其为不吉而凶，既可得而知矣。”"
          },
          {
            name: "墨子·第十九章·非攻下",
            content: "子墨子言曰：今天下之所誉善者，其说将何哉？为其上中天之利，而中中鬼之利，而下中人之利，故誉之与？意亡非为其上中天之利，而中中鬼之利，而下中人之利，故誉之与？虽使下愚之人，必曰：“将为其上中天之利，而中中鬼之利，而下中人之利，故誉之。”今天下之同意者，圣王之法也，今天下之诸侯，将犹多皆免攻伐并兼，则是有誉义之名，而不察其实也。此譬犹盲者之与人，同命白黑之名，而不能分其物也，则岂谓有别哉！是故古之知者之为天下度也，必顺虑其义而后为之行。是以动，则不疑速通。成得其所欲，而顺天、鬼、百姓之利，则知者之道也。是故古之仁人有天下者，必反大国之说，一天下之和，总四海之内。焉率天下之百姓，以农、臣事上帝、山川、鬼神。利人多，功故又大，是以天赏之，鬼富之，人誉之，使贵为天子，富有天下，名参乎天地，至今不废，此则知者之道也，先王之所以有天下者也。今王公大人、天下之诸侯则不然。将必皆差论其爪牙之士，皆列其舟车之卒伍，于此为坚甲利兵，以往攻伐无罪之国。入其国家边境，芟刈其禾稼，斩其树木，堕其城郭，以湮其沟池，攘杀其牲口，燔溃其祖庙，劲杀其万民，覆其老弱，迁其重器，卒进而柱乎斗，曰：“死命为上，多杀次之，身伤者为下；又况失列北桡乎哉？罪死无赦！”以惮其众。夫无兼国覆军，贼虐万民，以乱圣人之绪。意将以为利天乎？夫取天之人，以攻天之邑，此刺杀天民，剥振神之位，倾覆社稷，攘杀其牲□，则此上不中天之利矣。意将以为利鬼乎？夫杀之人，灭鬼神之主，废灭先王，贼虐万民，百姓离散，则此中不中鬼之利矣。意将以为利人乎？夫杀之人为利人也博矣！又计其费此－－为周生之本，竭天下百姓之财用，不可胜数也，则此下不中人之利矣。今夫师者之相为不利者也，曰：“将不勇，士不分，兵不利，教不习，师不众，率不利和，威不圉，害之不久，争之不疾，孙之不强。植心不坚，与国诸侯疑。与国诸侯疑，则敌生虑而意羸矣。偏具此物，而致从事焉，则是国家失卒，而百姓易务也。今不尝观其说好攻伐之国，若使中兴师，君子，庶人也，必且数千，徒倍十万，然后足以师而动矣。久者数岁，速者数月。是上不暇听治，士不暇治其官府，农夫不暇稼穑，妇人不暇纺绩织纴，则是国家失卒，而百姓易务也。然而又与其车马之罢毙也，幔幕帷盖，三军之用，甲兵之备，五分而得其一，则犹为序疏矣。然而又与其散亡道路，道路辽远，粮食不继，傺食饮之时，厕役以此饥寒冻馁疾病而转死沟壑中者，不可胜计也。此其为不利于人也，天下之害厚矣。而王公大人，乐而行之。则此乐贼灭天下之万民也，岂不悖哉？今天下好战之国，齐、晋、楚、越，若使此四国者得意于天下，此皆十倍其国之众，而未能食其地也，是人不足而地有余也。今又以争地之故，而反相贼也，然则是亏不足，而重有余也。今逮夫好攻伐之君，又饰其说，以非子墨子曰：“以攻伐之为不义，非利物与？昔者禹征有苗，汤伐桀，武王伐纣，此皆立为圣王，是何故也？”子墨子曰：“子未察吾言之类，未明其故者也。彼非所谓“攻”，谓“诛”也。昔者三苗大乱，天命殛之，日妖宵出，雨血三朝，龙生于庙，犬哭乎市，夏冰，地坼及泉，五谷变化，民乃大振。高阳乃命玄宫，禹亲把天之瑞令，以征有苗。四电诱祗，有神人面鸟身，若瑾以侍，搤矢有苗之祥。苗师大乱，后乃遂几。禹既巳克有三苗，焉磨为山川，别物上下，卿制大极，而神民不违，天下乃静，则此禹之所以征有苗也。逮至乎夏王桀，天有（车告）命，日月不时，寒暑杂至，五谷焦死，鬼呼国，鹤鸣十夕余。天乃命汤于镳宫：“用受夏之大命。夏德大乱，予既卒其命于天矣，往而诛之，必使汝堪之。”汤焉敢奉率其众，是以乡有夏之境，帝乃使阴暴毁有夏之城，少少有神来告曰：“夏德大乱，往攻之，予必使汝大堪之。予既受命于天，天命融隆火，于夏之城闲西北之隅。”汤奉桀众以克有，属诸侯于薄，荐章天命，通于四方，而天下诸侯莫敢不宾服，则此汤之所以诛桀也。逮至乎商王纣，天不序其德，祀用失时，兼夜中十日，雨土于薄，九鼎迁止，妇妖宵出，有鬼宵吟，有女为男，天雨肉，棘生乎国道，王兄自纵也。赤鸟衔珪，降周之岐社，曰：“天命周文王，伐殷有国。”泰颠来宾，河出绿图，地出乘黄。武王践功，梦见三神曰：“予既沈渍殷纣于酒德矣，往攻之，予必使汝大堪之”武王乃攻狂夫，反商之周，天赐武王黄鸟之旗。王既巳克殷，成帝之来，分主诸神，祀纣先王，通维四夷，而天下莫不宾。焉袭汤之绪，此即武王之所以诛纣也。若以此三圣王者观之，则非所谓“攻”也，所谓“诛”也”则夫好攻伐之君又饰其说，以非子墨子曰：“子以攻伐为不义，非利物与？昔者楚熊丽，始讨此睢山之间，越王繄亏，出自有遽，始邦于越；唐叔与吕尚邦齐、晋。此皆地方数百里，今以并国之故，四分天下而有之，是故何也？子墨子曰：“子未察吾言之类，未明其故者也。古者天子之始封诸侯也，万有余；今以并国之故，万国有余皆灭，而四国独立。此譬犹医之药万有余人，而四人愈也，则不可谓良医矣。”则夫好攻伐之君又饰其说，曰：“我非以金玉、子女、壤地为不足也，我欲以义名立于天下，以德求诸侯也。”子墨子曰：“今若有能以义名立于天下，以德求诸侯者，天下之服，可立而待也。夫天下处攻伐久矣，譬若傅子之为马然。今若有能信效先利天下诸侯者，大国之不义也，则同忧之；大国之攻小国也，则同救之，小国城郭之不全也，必使修之，布粟之绝则委之，币帛不足则共之。以此效大国，则小国之君说。人劳我逸，则我甲兵强。宽以惠，缓易急，民必移。易攻伐以治我国，攻必倍。量我师举之费，以争诸侯之毙，则必可得而序利焉。督以正，义其名，必务宽吾众，信吾师，以此授诸侯之师，则天下无敌矣，其为下不可胜数也。此天下之利，而王公大人不知而用，则此可谓不知利天下之臣务矣。是故子墨子曰：“今且天下之王公大人士君子，中情将欲求兴天下之利，除天下之害，当若繁为攻伐，此实天下之巨害也。今欲为仁义，求为上士，尚欲中圣王之道，下欲中国家百姓之利，故当若“非攻”之为说，而将不可不察者此也！”"
          }
        ]
      }
    ]
  }
];
const customStyle$1 = "text-align: left;";
const _sfc_main$5 = {
  __name: "ancientPoetry",
  __ssrInlineRender: true,
  props: {
    num: {
      type: Number
    },
    menuKey: Number
  },
  setup(__props) {
    const props = __props;
    const activeKey = ref(["0"]);
    const ancient2 = reactive({
      data: data.map((item) => item.data)[props.menuKey].map((item) => item.article)
    });
    const sayText = (text) => {
      const say = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(say);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_a_collapse = Collapse;
      const _component_a_collapse_panel = __nuxt_component_11;
      const _component_SoundFilled = SoundFilled;
      _push(ssrRenderComponent(_component_a_collapse, mergeProps({
        activeKey: unref(activeKey),
        "onUpdate:activeKey": ($event) => isRef(activeKey) ? activeKey.value = $event : null
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(ancient2).data[props.num], (data2, index) => {
              _push2(ssrRenderComponent(_component_a_collapse_panel, {
                key: index,
                header: data2.name,
                style: customStyle$1
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p${_scopeId2}>       ${ssrInterpolate(data2.content)} `);
                    _push3(ssrRenderComponent(_component_SoundFilled, {
                      onClick: ($event) => sayText(data2.content),
                      style: { "color": "rgb(67, 204, 238)" }
                    }, null, _parent3, _scopeId2));
                    _push3(`</p>`);
                  } else {
                    return [
                      createVNode("p", null, [
                        createTextVNode("       " + toDisplayString(data2.content) + " ", 1),
                        createVNode(_component_SoundFilled, {
                          onClick: ($event) => sayText(data2.content),
                          style: { "color": "rgb(67, 204, 238)" }
                        }, null, 8, ["onClick"])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(ancient2).data[props.num], (data2, index) => {
                return openBlock(), createBlock(_component_a_collapse_panel, {
                  key: index,
                  header: data2.name,
                  style: customStyle$1
                }, {
                  default: withCtx(() => [
                    createVNode("p", null, [
                      createTextVNode("       " + toDisplayString(data2.content) + " ", 1),
                      createVNode(_component_SoundFilled, {
                        onClick: ($event) => sayText(data2.content),
                        style: { "color": "rgb(67, 204, 238)" }
                      }, null, 8, ["onClick"])
                    ])
                  ]),
                  _: 2
                }, 1032, ["header"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ancientPoetry.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const ancient = _sfc_main$5;
const customStyle = "text-align: left;";
const _sfc_main$4 = {
  __name: "confucian",
  __ssrInlineRender: true,
  props: {
    num: Number,
    menuKey: Number
  },
  setup(__props) {
    const props = __props;
    const activeKey = ref(["0"]);
    const ancient2 = reactive({
      data: data.map((item) => item.data)[props.menuKey].map((item) => item.article)
    });
    const sayText = (text) => {
      const say = new SpeechSynthesisUtterance(text);
      say.rate = 1.3;
      window.speechSynthesis.speak(say);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_a_collapse = Collapse;
      const _component_a_collapse_panel = __nuxt_component_11;
      const _component_SoundFilled = SoundFilled;
      _push(ssrRenderComponent(_component_a_collapse, mergeProps({
        activeKey: unref(activeKey),
        "onUpdate:activeKey": ($event) => isRef(activeKey) ? activeKey.value = $event : null
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(ancient2).data[props.num], (data2, index) => {
              _push2(ssrRenderComponent(_component_a_collapse_panel, {
                key: index,
                header: data2.name,
                style: customStyle
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p${_scopeId2}>       ${ssrInterpolate(data2.content)} `);
                    _push3(ssrRenderComponent(_component_SoundFilled, {
                      onClick: ($event) => sayText(data2.content),
                      style: { "color": "rgb(67, 204, 238)" }
                    }, null, _parent3, _scopeId2));
                    _push3(`</p>`);
                  } else {
                    return [
                      createVNode("p", null, [
                        createTextVNode("       " + toDisplayString(data2.content) + " ", 1),
                        createVNode(_component_SoundFilled, {
                          onClick: ($event) => sayText(data2.content),
                          style: { "color": "rgb(67, 204, 238)" }
                        }, null, 8, ["onClick"])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(ancient2).data[props.num], (data2, index) => {
                return openBlock(), createBlock(_component_a_collapse_panel, {
                  key: index,
                  header: data2.name,
                  style: customStyle
                }, {
                  default: withCtx(() => [
                    createVNode("p", null, [
                      createTextVNode("       " + toDisplayString(data2.content) + " ", 1),
                      createVNode(_component_SoundFilled, {
                        onClick: ($event) => sayText(data2.content),
                        style: { "color": "rgb(67, 204, 238)" }
                      }, null, 8, ["onClick"])
                    ])
                  ]),
                  _: 2
                }, 1032, ["header"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/confucian.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const confucian = _sfc_main$4;
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$3 = {
  __name: "home",
  __ssrInlineRender: true,
  setup(__props) {
    const activeKey = ref("0");
    const collapseKey = ref(["0"]);
    const onchange = (keys) => {
      currComponent.value = tabs[keys].com;
      menuKey.value = keys;
      num.value = 0;
    };
    const onchange2 = (key) => {
      num.value = Number(key[key.length - 1]);
    };
    const screenSizeShow = ref(false);
    const selectedKeys = ref([]);
    const openKeys = ref([]);
    const emptyShow = ref(true);
    const categoryContent = reactive(data.map((item) => ({
      title: item.title,
      project: item.data.map((item2) => item2.author)
    })));
    let currComponent = shallowRef(ancient);
    const menuKey = ref(0);
    const num = ref(0);
    const tabs = reactive([
      { com: markRaw(ancient) },
      { com: markRaw(confucian) }
    ]);
    const onSelect = ({ key }) => {
      emptyShow.value = false;
      num.value = key;
    };
    const openChange = (keys) => {
      menuKey.value = keys[keys.length - 1];
      if (keys.length) {
        num.value = 0;
        openKeys.value = [keys[keys.length - 1]];
        selectedKeys.value = [];
        currComponent.value = tabs[keys[keys.length - 1]].com;
      } else {
        emptyShow.value = true;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_a_layout = __nuxt_component_0$1;
      const _component_a_layout_sider = LayoutSider;
      const _component_a_menu = Menu;
      const _component_a_sub_menu = __nuxt_component_3;
      const _component_user_outlined = UserOutlined;
      const _component_a_menu_item = __nuxt_component_5;
      const _component_a_layout_content = LayoutContent;
      const _component_a_empty = __nuxt_component_7;
      const _component_a_tabs = Tabs;
      const _component_a_tab_pane = __nuxt_component_9;
      const _component_a_collapse = Collapse;
      const _component_a_collapse_panel = __nuxt_component_11;
      _push(`<!--[-->`);
      if (!unref(screenSizeShow)) {
        _push(ssrRenderComponent(_component_a_layout, { style: { "min-height": "100vh" } }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_a_layout_sider, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="logo" data-v-e1bdffca${_scopeId2}></div>`);
                    _push3(ssrRenderComponent(_component_a_menu, {
                      onSelect,
                      onOpenChange: openChange,
                      theme: "dark",
                      mode: "inline",
                      "open-keys": unref(openKeys),
                      selectedKeys: unref(selectedKeys),
                      "onUpdate:selectedKeys": ($event) => isRef(selectedKeys) ? selectedKeys.value = $event : null
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<!--[-->`);
                          ssrRenderList(unref(categoryContent), (cate, index) => {
                            _push4(ssrRenderComponent(_component_a_sub_menu, { key: index }, {
                              title: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(_component_user_outlined, null, null, _parent5, _scopeId4));
                                  _push5(`${ssrInterpolate(cate.title)}`);
                                } else {
                                  return [
                                    createVNode(_component_user_outlined),
                                    createTextVNode(toDisplayString(cate.title), 1)
                                  ];
                                }
                              }),
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<!--[-->`);
                                  ssrRenderList(cate.project, (p, index2) => {
                                    _push5(ssrRenderComponent(_component_a_menu_item, { key: index2 }, {
                                      default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(`<span class="nav-text" data-v-e1bdffca${_scopeId5}>${ssrInterpolate(p)}</span>`);
                                        } else {
                                          return [
                                            createVNode("span", { class: "nav-text" }, toDisplayString(p), 1)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  });
                                  _push5(`<!--]-->`);
                                } else {
                                  return [
                                    (openBlock(true), createBlock(Fragment, null, renderList(cate.project, (p, index2) => {
                                      return openBlock(), createBlock(_component_a_menu_item, { key: index2 }, {
                                        default: withCtx(() => [
                                          createVNode("span", { class: "nav-text" }, toDisplayString(p), 1)
                                        ]),
                                        _: 2
                                      }, 1024);
                                    }), 128))
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]-->`);
                        } else {
                          return [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(categoryContent), (cate, index) => {
                              return openBlock(), createBlock(_component_a_sub_menu, { key: index }, {
                                title: withCtx(() => [
                                  createVNode(_component_user_outlined),
                                  createTextVNode(toDisplayString(cate.title), 1)
                                ]),
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(cate.project, (p, index2) => {
                                    return openBlock(), createBlock(_component_a_menu_item, { key: index2 }, {
                                      default: withCtx(() => [
                                        createVNode("span", { class: "nav-text" }, toDisplayString(p), 1)
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 128))
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode("div", { class: "logo" }),
                      createVNode(_component_a_menu, {
                        onSelect,
                        onOpenChange: openChange,
                        theme: "dark",
                        mode: "inline",
                        "open-keys": unref(openKeys),
                        selectedKeys: unref(selectedKeys),
                        "onUpdate:selectedKeys": ($event) => isRef(selectedKeys) ? selectedKeys.value = $event : null
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(categoryContent), (cate, index) => {
                            return openBlock(), createBlock(_component_a_sub_menu, { key: index }, {
                              title: withCtx(() => [
                                createVNode(_component_user_outlined),
                                createTextVNode(toDisplayString(cate.title), 1)
                              ]),
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(cate.project, (p, index2) => {
                                  return openBlock(), createBlock(_component_a_menu_item, { key: index2 }, {
                                    default: withCtx(() => [
                                      createVNode("span", { class: "nav-text" }, toDisplayString(p), 1)
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        _: 1
                      }, 8, ["open-keys", "selectedKeys", "onUpdate:selectedKeys"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_a_layout, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_a_layout_content, { style: { margin: "24px 16px 0", overflow: "initial" } }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div style="${ssrRenderStyle({ padding: "24px", background: "#fff", textAlign: "center" })}" data-v-e1bdffca${_scopeId3}>`);
                          if (unref(emptyShow)) {
                            _push4(ssrRenderComponent(_component_a_empty, {
                              image: unref(simpleImage),
                              description: "暂未选择诗集"
                            }, null, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                          if (!unref(emptyShow)) {
                            ssrRenderVNode(_push4, createVNode(resolveDynamicComponent(unref(currComponent)), {
                              menuKey: unref(menuKey),
                              num: unref(num)
                            }, null), _parent4, _scopeId3);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", { style: { padding: "24px", background: "#fff", textAlign: "center" } }, [
                              unref(emptyShow) ? (openBlock(), createBlock(_component_a_empty, {
                                key: 0,
                                image: unref(simpleImage),
                                description: "暂未选择诗集"
                              }, null, 8, ["image"])) : createCommentVNode("", true),
                              !unref(emptyShow) ? (openBlock(), createBlock(resolveDynamicComponent(unref(currComponent)), {
                                key: 1,
                                menuKey: unref(menuKey),
                                num: unref(num)
                              }, null, 8, ["menuKey", "num"])) : createCommentVNode("", true)
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_a_layout_content, { style: { margin: "24px 16px 0", overflow: "initial" } }, {
                        default: withCtx(() => [
                          createVNode("div", { style: { padding: "24px", background: "#fff", textAlign: "center" } }, [
                            unref(emptyShow) ? (openBlock(), createBlock(_component_a_empty, {
                              key: 0,
                              image: unref(simpleImage),
                              description: "暂未选择诗集"
                            }, null, 8, ["image"])) : createCommentVNode("", true),
                            !unref(emptyShow) ? (openBlock(), createBlock(resolveDynamicComponent(unref(currComponent)), {
                              key: 1,
                              menuKey: unref(menuKey),
                              num: unref(num)
                            }, null, 8, ["menuKey", "num"])) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_a_layout_sider, null, {
                  default: withCtx(() => [
                    createVNode("div", { class: "logo" }),
                    createVNode(_component_a_menu, {
                      onSelect,
                      onOpenChange: openChange,
                      theme: "dark",
                      mode: "inline",
                      "open-keys": unref(openKeys),
                      selectedKeys: unref(selectedKeys),
                      "onUpdate:selectedKeys": ($event) => isRef(selectedKeys) ? selectedKeys.value = $event : null
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(categoryContent), (cate, index) => {
                          return openBlock(), createBlock(_component_a_sub_menu, { key: index }, {
                            title: withCtx(() => [
                              createVNode(_component_user_outlined),
                              createTextVNode(toDisplayString(cate.title), 1)
                            ]),
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(cate.project, (p, index2) => {
                                return openBlock(), createBlock(_component_a_menu_item, { key: index2 }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "nav-text" }, toDisplayString(p), 1)
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 128))
                            ]),
                            _: 2
                          }, 1024);
                        }), 128))
                      ]),
                      _: 1
                    }, 8, ["open-keys", "selectedKeys", "onUpdate:selectedKeys"])
                  ]),
                  _: 1
                }),
                createVNode(_component_a_layout, null, {
                  default: withCtx(() => [
                    createVNode(_component_a_layout_content, { style: { margin: "24px 16px 0", overflow: "initial" } }, {
                      default: withCtx(() => [
                        createVNode("div", { style: { padding: "24px", background: "#fff", textAlign: "center" } }, [
                          unref(emptyShow) ? (openBlock(), createBlock(_component_a_empty, {
                            key: 0,
                            image: unref(simpleImage),
                            description: "暂未选择诗集"
                          }, null, 8, ["image"])) : createCommentVNode("", true),
                          !unref(emptyShow) ? (openBlock(), createBlock(resolveDynamicComponent(unref(currComponent)), {
                            key: 1,
                            menuKey: unref(menuKey),
                            num: unref(num)
                          }, null, 8, ["menuKey", "num"])) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(screenSizeShow)) {
        _push(ssrRenderComponent(_component_a_tabs, {
          activeKey: unref(activeKey),
          "onUpdate:activeKey": ($event) => isRef(activeKey) ? activeKey.value = $event : null,
          size: "large",
          tabBarGutter: 50,
          centered: "",
          onChange: onchange
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(unref(categoryContent), (category, index) => {
                _push2(ssrRenderComponent(_component_a_tab_pane, {
                  key: index,
                  tab: category.title
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_a_collapse, {
                        activeKey: unref(collapseKey),
                        "onUpdate:activeKey": ($event) => isRef(collapseKey) ? collapseKey.value = $event : null,
                        onChange: onchange2
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<!--[-->`);
                            ssrRenderList(category.project, (c, index2) => {
                              _push4(ssrRenderComponent(_component_a_collapse_panel, {
                                key: index2,
                                header: c
                              }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    ssrRenderVNode(_push5, createVNode(resolveDynamicComponent(unref(currComponent)), {
                                      menuKey: unref(menuKey),
                                      num: unref(num)
                                    }, null), _parent5, _scopeId4);
                                  } else {
                                    return [
                                      (openBlock(), createBlock(resolveDynamicComponent(unref(currComponent)), {
                                        menuKey: unref(menuKey),
                                        num: unref(num)
                                      }, null, 8, ["menuKey", "num"]))
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            });
                            _push4(`<!--]-->`);
                          } else {
                            return [
                              (openBlock(true), createBlock(Fragment, null, renderList(category.project, (c, index2) => {
                                return openBlock(), createBlock(_component_a_collapse_panel, {
                                  key: index2,
                                  header: c
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock(resolveDynamicComponent(unref(currComponent)), {
                                      menuKey: unref(menuKey),
                                      num: unref(num)
                                    }, null, 8, ["menuKey", "num"]))
                                  ]),
                                  _: 2
                                }, 1032, ["header"]);
                              }), 128))
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_a_collapse, {
                          activeKey: unref(collapseKey),
                          "onUpdate:activeKey": ($event) => isRef(collapseKey) ? collapseKey.value = $event : null,
                          onChange: onchange2
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(category.project, (c, index2) => {
                              return openBlock(), createBlock(_component_a_collapse_panel, {
                                key: index2,
                                header: c
                              }, {
                                default: withCtx(() => [
                                  (openBlock(), createBlock(resolveDynamicComponent(unref(currComponent)), {
                                    menuKey: unref(menuKey),
                                    num: unref(num)
                                  }, null, 8, ["menuKey", "num"]))
                                ]),
                                _: 2
                              }, 1032, ["header"]);
                            }), 128))
                          ]),
                          _: 2
                        }, 1032, ["activeKey", "onUpdate:activeKey"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(categoryContent), (category, index) => {
                  return openBlock(), createBlock(_component_a_tab_pane, {
                    key: index,
                    tab: category.title
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_a_collapse, {
                        activeKey: unref(collapseKey),
                        "onUpdate:activeKey": ($event) => isRef(collapseKey) ? collapseKey.value = $event : null,
                        onChange: onchange2
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(category.project, (c, index2) => {
                            return openBlock(), createBlock(_component_a_collapse_panel, {
                              key: index2,
                              header: c
                            }, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(resolveDynamicComponent(unref(currComponent)), {
                                  menuKey: unref(menuKey),
                                  num: unref(num)
                                }, null, 8, ["menuKey", "num"]))
                              ]),
                              _: 2
                            }, 1032, ["header"]);
                          }), 128))
                        ]),
                        _: 2
                      }, 1032, ["activeKey", "onUpdate:activeKey"])
                    ]),
                    _: 2
                  }, 1032, ["tab"]);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-e1bdffca"]]);
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Home = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_Home, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AppComponent = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    (_error.stack || "").split("\n").splice(1).map((line) => {
      const text = line.replace("webpack:/", "").replace(".vue", ".js").trim();
      return {
        text,
        internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
      };
    }).map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n");
    const statusCode = Number(_error.statusCode || 500);
    const is404 = statusCode === 404;
    const statusMessage = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = /* @__PURE__ */ defineAsyncComponent(() => import('./_nuxt/error-404-694aeb7d.mjs').then((r) => r.default || r));
    const _Error = /* @__PURE__ */ defineAsyncComponent(() => import('./_nuxt/error-500-3dabe827.mjs').then((r) => r.default || r));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ statusCode: unref(statusCode), statusMessage: unref(statusMessage), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/nuxt@3.7.4/node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ErrorComponent = _sfc_main$1;
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = /* @__PURE__ */ defineAsyncComponent(() => import('./_nuxt/island-renderer-821de9cc.mjs').then((r) => r.default || r));
    const nuxtApp = /* @__PURE__ */ useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(ErrorComponent), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(AppComponent), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/nuxt@3.7.4/node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const RootComponent = _sfc_main;
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(RootComponent);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.hooks.callHook("app:error", err);
      nuxt.payload.error = nuxt.payload.error || err;
    }
    if (ssrContext == null ? void 0 : ssrContext._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ctx) => entry(ctx);

export { _export_sfc as _, createError as c, entry$1 as default, injectHead as i, navigateTo as n, resolveUnrefHeadInput as r, useRouter as u };
//# sourceMappingURL=server.mjs.map
