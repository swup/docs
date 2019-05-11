(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SwupDebugPlugin"] = factory();
	else
		root["SwupDebugPlugin"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Plugin = function () {
    function Plugin() {
        _classCallCheck(this, Plugin);

        this.isSwupPlugin = true;
    }

    _createClass(Plugin, [{
        key: "mount",
        value: function mount() {
            // this is mount method rewritten by class extending
            // and is executed when swup is enabled with plugin
        }
    }, {
        key: "unmount",
        value: function unmount() {}
        // this is unmount method rewritten by class extending
        // and is executed when swup with plugin is disabled


        // this is here so we can tell if plugin was created by extending this class

    }]);

    return Plugin;
}();

exports.default = Plugin;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _plugin = __webpack_require__(0);

var _plugin2 = _interopRequireDefault(_plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DebugPlugin = function (_Plugin) {
    _inherits(DebugPlugin, _Plugin);

    function DebugPlugin() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, DebugPlugin);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DebugPlugin.__proto__ || Object.getPrototypeOf(DebugPlugin)).call.apply(_ref, [this].concat(args))), _this), _this.name = "SwupDebugPlugin", _this.triggerEvent = function (eventName, originalEvent) {
            if (originalEvent) {
                console.groupCollapsed('%cswup:' + '%c' + eventName, 'color: #343434', 'color: #009ACD');
                console.log(originalEvent);
                console.groupEnd();
            } else {
                console.log('%cswup:' + '%c' + eventName, 'color: #343434', 'color: #009ACD');
            }

            _this.swup._triggerEvent(eventName, originalEvent);
        }, _this.log = function (str, object) {
            if (object) {
                console.groupCollapsed(str);
                for (var key in object) {
                    console.log(object[key]);
                }
                console.groupEnd();
            } else {
                console.log(str + '%c', 'color: #009ACD');
            }
        }, _this.debugLog = function (log, type) {
            if (type === 'error') {
                console.error('DEBUG PLUGIN: ' + log);
            } else {
                console.warn('DEBUG PLUGIN: ' + log);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(DebugPlugin, [{
        key: 'mount',
        value: function mount() {
            var swup = this.swup;

            // set non-empty log method of swup
            swup.log = this.log;

            // set swup instance as a global variable swup
            window.swup = swup;

            // make events appear in console
            swup._triggerEvent = swup.triggerEvent;
            swup.triggerEvent = this.triggerEvent;

            // detect relative links not starting with / or #
            var potentiallyWrongLinksSelector = 'a[href]:not([href^="' + window.location.origin + '"]):not([href^="/"]):not([href^="http"]):not([href^="/"]):not([href^="?"]):not([href^="#"])';

            swup.on('pageView', function () {
                if (document.querySelectorAll(potentiallyWrongLinksSelector).length) {
                    var error = 'It seems there are some links with a href attribute not starting with "#", "/" or current domain, which is potentially a problem.';
                    console.warn('DEBUG PLUGIN: ' + error, document.querySelectorAll(potentiallyWrongLinksSelector));
                }
                if (document.querySelectorAll(potentiallyWrongLinksSelector).length) {
                    var _error = 'It seems there are some links with a href attribute not starting with "#", "/" or current domain, which is potentially a problem.';
                    console.warn('DEBUG PLUGIN: ' + _error, document.querySelectorAll(potentiallyWrongLinksSelector));
                }
            });
        }
    }, {
        key: 'unmount',
        value: function unmount() {
            this.swup.log = function () {};
            this.swup.triggerEvent = this.swup._triggerEvent;
        }
    }]);

    return DebugPlugin;
}(_plugin2.default);

exports.default = DebugPlugin;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(1);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _index2.default; // this is here for webpack to expose SwupPlugin as window.SwupPlugin

/***/ })
/******/ ]);
});