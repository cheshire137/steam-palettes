require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  var _this = this;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  __webpack_require__(1);
  
  var _path = __webpack_require__(2);
  
  var _path2 = _interopRequireDefault(_path);
  
  var _express = __webpack_require__(3);
  
  var _express2 = _interopRequireDefault(_express);
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactDomServer = __webpack_require__(5);
  
  var _reactDomServer2 = _interopRequireDefault(_reactDomServer);
  
  var _routes = __webpack_require__(6);
  
  var _routes2 = _interopRequireDefault(_routes);
  
  var _componentsHtml = __webpack_require__(79);
  
  var _componentsHtml2 = _interopRequireDefault(_componentsHtml);
  
  var _assets = __webpack_require__(80);
  
  var _assets2 = _interopRequireDefault(_assets);
  
  var _config = __webpack_require__(35);
  
  var _configJson = __webpack_require__(36);
  
  var _configJson2 = _interopRequireDefault(_configJson);
  
  var _coreFetch = __webpack_require__(33);
  
  var _coreFetch2 = _interopRequireDefault(_coreFetch);
  
  var _actionsScreenshotsScraper = __webpack_require__(81);
  
  var _actionsScreenshotsScraper2 = _interopRequireDefault(_actionsScreenshotsScraper);
  
  var _actionsScreenshotScraper = __webpack_require__(84);
  
  var _actionsScreenshotScraper2 = _interopRequireDefault(_actionsScreenshotScraper);
  
  var _actionsImageAnalyzer = __webpack_require__(85);
  
  var _actionsImageAnalyzer2 = _interopRequireDefault(_actionsImageAnalyzer);
  
  var server = global.server = (0, _express2['default'])();
  
  //
  // Register Node.js middleware
  // -----------------------------------------------------------------------------
  server.use(_express2['default']['static'](_path2['default'].join(__dirname, 'public')));
  
  server.all('*', function (req, res, next) {
    var config = _configJson2['default'][("production")];
    var origin = req.protocol + '://' + config.clientHost;
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    next();
  });
  
  server.get('/api/steam', function callee$0$0(req, res) {
    var url, isXml, key, joiner, response, data;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          url = req.query.path;
          isXml = false;
  
          for (key in req.query) {
            if (key !== 'path') {
              joiner = url.indexOf('?') > -1 ? '&' : '?';
  
              url = url + joiner + key + '=' + encodeURIComponent(req.query[key]);
            }
            if (key === 'xml') {
              isXml = true;
            }
          }
          if (isXml) {
            url = 'http://steamcommunity.com' + url;
          } else {
            url = 'http://api.steampowered.com' + url + (url.indexOf('?') > -1 ? '&' : '?') + 'key=' + process.env.STEAM_API_KEY;
          }
          context$1$0.next = 6;
          return regeneratorRuntime.awrap((0, _coreFetch2['default'])(url));
  
        case 6:
          response = context$1$0.sent;
  
          if (!isXml) {
            context$1$0.next = 13;
            break;
          }
  
          context$1$0.next = 10;
          return regeneratorRuntime.awrap(response.text());
  
        case 10:
          context$1$0.t0 = context$1$0.sent;
          context$1$0.next = 16;
          break;
  
        case 13:
          context$1$0.next = 15;
          return regeneratorRuntime.awrap(response.json());
  
        case 15:
          context$1$0.t0 = context$1$0.sent;
  
        case 16:
          data = context$1$0.t0;
  
          if (isXml) {
            res.set('Content-Type', 'text/xml');
            res.send(data);
          } else {
            res.json(data);
          }
  
        case 18:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  
  server.get('/api/screenshot', function callee$0$0(req, res) {
    var screenshotID, scraper, html;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          screenshotID = req.query.id;
  
          if (!(typeof screenshotID !== 'string' || screenshotID.length < 1)) {
            context$1$0.next = 4;
            break;
          }
  
          res.status(400).json({ error: 'Must provide Steam screenshot ID in id param' });
          return context$1$0.abrupt('return');
  
        case 4:
          scraper = new _actionsScreenshotScraper2['default'](screenshotID);
          context$1$0.next = 7;
          return regeneratorRuntime.awrap(scraper.getPage());
  
        case 7:
          html = context$1$0.sent;
  
          scraper.getScreenshot(html).then(function (screenshot) {
            res.json(screenshot);
          }).fail(function (error) {
            res.status(400).json({ error: error });
          });
  
        case 9:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  
  server.get('/api/screenshots', function callee$0$0(req, res) {
    var username, scraper, html;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          username = req.query.user;
  
          if (!(typeof username !== 'string' || username.length < 1)) {
            context$1$0.next = 4;
            break;
          }
  
          res.status(400).json({ error: 'Must provide Steam user name in user param' });
          return context$1$0.abrupt('return');
  
        case 4:
          scraper = new _actionsScreenshotsScraper2['default'](username);
          context$1$0.next = 7;
          return regeneratorRuntime.awrap(scraper.getPage());
  
        case 7:
          html = context$1$0.sent;
  
          scraper.getScreenshots(html).then(function (screenshots) {
            res.json(screenshots);
          }).fail(function (error) {
            res.status(400).json({ error: error });
          });
  
        case 9:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  
  server.get('/api/colors', function callee$0$0(req, res) {
    var imageUrl, analyzer;
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          imageUrl = req.query.url;
  
          if (!(typeof imageUrl !== 'string' || imageUrl.length < 1)) {
            context$1$0.next = 4;
            break;
          }
  
          res.status(400).json({ error: 'Must provide image URL in url param' });
          return context$1$0.abrupt('return');
  
        case 4:
          analyzer = new _actionsImageAnalyzer2['default']();
  
          analyzer.getColors(imageUrl).then(function (colors) {
            res.json(colors);
          }).fail(function (error) {
            res.status(400).json({ error: error });
          });
  
        case 6:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this);
  });
  
  //
  // Register server-side rendering middleware
  // -----------------------------------------------------------------------------
  server.get('*', function callee$0$0(req, res, next) {
    return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
      var _this2 = this;
  
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          context$1$0.prev = 0;
          context$1$0.next = 3;
          return regeneratorRuntime.awrap((function callee$1$0() {
            var statusCode, data, css, context, html;
            return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
              while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                  statusCode = 200;
                  data = { title: '', description: '', css: '', body: '', entry: _assets2['default'].main.js };
                  css = [];
                  context = {
                    insertCss: function insertCss(styles) {
                      return css.push(styles._getCss());
                    },
                    onSetTitle: function onSetTitle(value) {
                      return data.title = value;
                    },
                    onSetMeta: function onSetMeta(key, value) {
                      return data[key] = value;
                    },
                    onPageNotFound: function onPageNotFound() {
                      return statusCode = 404;
                    }
                  };
                  context$2$0.next = 6;
                  return regeneratorRuntime.awrap(_routes2['default'].dispatch({ path: req.path, query: req.query, context: context }, function (state, component) {
                    data.body = _reactDomServer2['default'].renderToString(component);
                    data.css = css.join('');
                  }));
  
                case 6:
                  html = _reactDomServer2['default'].renderToStaticMarkup(_react2['default'].createElement(_componentsHtml2['default'], data));
  
                  res.status(statusCode).send('<!doctype html>\n' + html);
  
                case 8:
                case 'end':
                  return context$2$0.stop();
              }
            }, null, _this2);
          })());
  
        case 3:
          context$1$0.next = 8;
          break;
  
        case 5:
          context$1$0.prev = 5;
          context$1$0.t0 = context$1$0['catch'](0);
  
          next(context$1$0.t0);
  
        case 8:
        case 'end':
          return context$1$0.stop();
      }
    }, null, _this, [[0, 5]]);
  });
  
  //
  // Launch the server
  // -----------------------------------------------------------------------------
  server.listen(_config.port, function () {
    /* eslint-disable no-console */
    console.log('The server is running at http://localhost:' + _config.port + '/');
  });

/***/ },
/* 1 */
/***/ function(module, exports) {

  module.exports = require("babel-core/polyfill");

/***/ },
/* 2 */
/***/ function(module, exports) {

  module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports) {

  module.exports = require("express");

/***/ },
/* 4 */
/***/ function(module, exports) {

  module.exports = require("react");

/***/ },
/* 5 */
/***/ function(module, exports) {

  module.exports = require("react-dom/server");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _this = this;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactRoutingSrcRouter = __webpack_require__(7);
  
  var _reactRoutingSrcRouter2 = _interopRequireDefault(_reactRoutingSrcRouter);
  
  var _componentsApp = __webpack_require__(12);
  
  var _componentsApp2 = _interopRequireDefault(_componentsApp);
  
  var _componentsNotFoundPage = __webpack_require__(22);
  
  var _componentsNotFoundPage2 = _interopRequireDefault(_componentsNotFoundPage);
  
  var _componentsErrorPage = __webpack_require__(25);
  
  var _componentsErrorPage2 = _interopRequireDefault(_componentsErrorPage);
  
  var _componentsPlayerLookupPage = __webpack_require__(28);
  
  var _componentsPlayerLookupPage2 = _interopRequireDefault(_componentsPlayerLookupPage);
  
  var _componentsPlayerPage = __webpack_require__(50);
  
  var _componentsPlayerPage2 = _interopRequireDefault(_componentsPlayerPage);
  
  var _componentsScreenshotPage = __webpack_require__(68);
  
  var _componentsScreenshotPage2 = _interopRequireDefault(_componentsScreenshotPage);
  
  var router = new _reactRoutingSrcRouter2['default'](function (on) {
    on('*', function callee$1$0(state, next) {
      var component;
      return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap(next());
  
          case 2:
            component = context$2$0.sent;
            return context$2$0.abrupt('return', component && _react2['default'].createElement(
              _componentsApp2['default'],
              { context: state.context },
              component
            ));
  
          case 4:
          case 'end':
            return context$2$0.stop();
        }
      }, null, _this);
    });
  
    on('/player/:username/:steamID/:screenshotID', function callee$1$0(req) {
      var username, steamID, screenshotID, key;
      return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            username = req.params.username;
            steamID = req.params.steamID;
            screenshotID = req.params.screenshotID;
            key = username + '-' + steamID + '-' + screenshotID;
            return context$2$0.abrupt('return', _react2['default'].createElement(_componentsScreenshotPage2['default'], { username: username, steamID: steamID,
              screenshotID: screenshotID, key: key
            }));
  
          case 5:
          case 'end':
            return context$2$0.stop();
        }
      }, null, _this);
    });
  
    on('/player/:username/:steamID', function callee$1$0(req) {
      var username, steamID, key;
      return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            username = req.params.username;
            steamID = req.params.steamID;
            key = username + '-' + steamID;
            return context$2$0.abrupt('return', _react2['default'].createElement(_componentsPlayerPage2['default'], { username: username, steamID: steamID, key: key }));
  
          case 4:
          case 'end':
            return context$2$0.stop();
        }
      }, null, _this);
    });
  
    on('/', function callee$1$0() {
      return regeneratorRuntime.async(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.abrupt('return', _react2['default'].createElement(_componentsPlayerLookupPage2['default'], null));
  
          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, null, _this);
    });
  
    on('error', function (state, error) {
      return state.statusCode === 404 ? _react2['default'].createElement(
        _componentsApp2['default'],
        { context: state.context, error: error },
        _react2['default'].createElement(_componentsNotFoundPage2['default'], null)
      ) : _react2['default'].createElement(
        _componentsApp2['default'],
        { context: state.context, error: error },
        _react2['default'].createElement(_componentsErrorPage2['default'], null)
      );
    });
  });
  
  exports['default'] = router;
  module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Routing | http://www.kriasoft.com/react-routing
   * Copyright (c) Konstantin Tarkus <hello@tarkus.me> | The MIT License
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _Route = __webpack_require__(8);
  
  var _Route2 = _interopRequireDefault(_Route);
  
  var emptyFunction = function emptyFunction() {};
  
  var Router = (function () {
  
    /**
     * Creates a new instance of the `Router` class.
     */
  
    function Router(initialize) {
      _classCallCheck(this, Router);
  
      this.routes = [];
      this.events = Object.create(null);
  
      if (typeof initialize === 'function') {
        initialize(this.on.bind(this));
      }
    }
  
    /**
     * Adds a new route to the routing table or registers an event listener.
     *
     * @param {String} path A string in the Express format, an array of strings, or a regular expression.
     * @param {Function|Array} handlers Asynchronous route handler function(s).
     */
  
    _createClass(Router, [{
      key: 'on',
      value: function on(path) {
        for (var _len = arguments.length, handlers = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          handlers[_key - 1] = arguments[_key];
        }
  
        if (path === 'error') {
          this.events[path] = handlers[0];
        } else {
          this.routes.push(new _Route2['default'](path, handlers));
        }
      }
    }, {
      key: 'dispatch',
      value: function dispatch(state, cb) {
        var routes, handlers, value, result, done, next;
        return regeneratorRuntime.async(function dispatch$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              next = function next() {
                var _handlers$next;
  
                var _value, _value2, match, handler;
  
                return regeneratorRuntime.async(function next$(context$3$0) {
                  while (1) switch (context$3$0.prev = context$3$0.next) {
                    case 0:
                      if (!((_handlers$next = handlers.next(), value = _handlers$next.value, done = _handlers$next.done, _handlers$next) && !done)) {
                        context$3$0.next = 16;
                        break;
                      }
  
                      _value = value;
                      _value2 = _slicedToArray(_value, 2);
                      match = _value2[0];
                      handler = _value2[1];
  
                      state.params = match.params;
  
                      if (!(handler.length > 1)) {
                        context$3$0.next = 12;
                        break;
                      }
  
                      context$3$0.next = 9;
                      return regeneratorRuntime.awrap(handler(state, next));
  
                    case 9:
                      context$3$0.t0 = context$3$0.sent;
                      context$3$0.next = 15;
                      break;
  
                    case 12:
                      context$3$0.next = 14;
                      return regeneratorRuntime.awrap(handler(state));
  
                    case 14:
                      context$3$0.t0 = context$3$0.sent;
  
                    case 15:
                      return context$3$0.abrupt('return', context$3$0.t0);
  
                    case 16:
                    case 'end':
                      return context$3$0.stop();
                  }
                }, null, this);
              };
  
              if (typeof state === 'string' || state instanceof String) {
                state = { path: state };
              }
              cb = cb || emptyFunction;
              routes = this.routes;
              handlers = regeneratorRuntime.mark(function callee$2$0() {
                var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, route, match, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, handler;
  
                return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                  while (1) switch (context$3$0.prev = context$3$0.next) {
                    case 0:
                      _iteratorNormalCompletion = true;
                      _didIteratorError = false;
                      _iteratorError = undefined;
                      context$3$0.prev = 3;
                      _iterator = routes[Symbol.iterator]();
  
                    case 5:
                      if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                        context$3$0.next = 38;
                        break;
                      }
  
                      route = _step.value;
                      match = route.match(state.path);
  
                      if (!match) {
                        context$3$0.next = 35;
                        break;
                      }
  
                      _iteratorNormalCompletion2 = true;
                      _didIteratorError2 = false;
                      _iteratorError2 = undefined;
                      context$3$0.prev = 12;
                      _iterator2 = match.route.handlers[Symbol.iterator]();
  
                    case 14:
                      if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                        context$3$0.next = 21;
                        break;
                      }
  
                      handler = _step2.value;
                      context$3$0.next = 18;
                      return [match, handler];
  
                    case 18:
                      _iteratorNormalCompletion2 = true;
                      context$3$0.next = 14;
                      break;
  
                    case 21:
                      context$3$0.next = 27;
                      break;
  
                    case 23:
                      context$3$0.prev = 23;
                      context$3$0.t0 = context$3$0['catch'](12);
                      _didIteratorError2 = true;
                      _iteratorError2 = context$3$0.t0;
  
                    case 27:
                      context$3$0.prev = 27;
                      context$3$0.prev = 28;
  
                      if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                        _iterator2['return']();
                      }
  
                    case 30:
                      context$3$0.prev = 30;
  
                      if (!_didIteratorError2) {
                        context$3$0.next = 33;
                        break;
                      }
  
                      throw _iteratorError2;
  
                    case 33:
                      return context$3$0.finish(30);
  
                    case 34:
                      return context$3$0.finish(27);
  
                    case 35:
                      _iteratorNormalCompletion = true;
                      context$3$0.next = 5;
                      break;
  
                    case 38:
                      context$3$0.next = 44;
                      break;
  
                    case 40:
                      context$3$0.prev = 40;
                      context$3$0.t1 = context$3$0['catch'](3);
                      _didIteratorError = true;
                      _iteratorError = context$3$0.t1;
  
                    case 44:
                      context$3$0.prev = 44;
                      context$3$0.prev = 45;
  
                      if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                      }
  
                    case 47:
                      context$3$0.prev = 47;
  
                      if (!_didIteratorError) {
                        context$3$0.next = 50;
                        break;
                      }
  
                      throw _iteratorError;
  
                    case 50:
                      return context$3$0.finish(47);
  
                    case 51:
                      return context$3$0.finish(44);
  
                    case 52:
                    case 'end':
                      return context$3$0.stop();
                  }
                }, callee$2$0, this, [[3, 40, 44, 52], [12, 23, 27, 35], [28,, 30, 34], [45,, 47, 51]]);
              })();
              value = undefined, result = undefined, done = false;
  
            case 6:
              if (done) {
                context$2$0.next = 16;
                break;
              }
  
              context$2$0.next = 9;
              return regeneratorRuntime.awrap(next());
  
            case 9:
              result = context$2$0.sent;
  
              if (!result) {
                context$2$0.next = 14;
                break;
              }
  
              state.statusCode = 200;
              cb(state, result);
              return context$2$0.abrupt('return');
  
            case 14:
              context$2$0.next = 6;
              break;
  
            case 16:
              if (!this.events.error) {
                context$2$0.next = 32;
                break;
              }
  
              context$2$0.prev = 17;
  
              state.statusCode = 404;
              context$2$0.next = 21;
              return regeneratorRuntime.awrap(this.events.error(state, new Error('Cannot found a route matching \'' + state.path + '\'.')));
  
            case 21:
              result = context$2$0.sent;
  
              cb(state, result);
              context$2$0.next = 32;
              break;
  
            case 25:
              context$2$0.prev = 25;
              context$2$0.t0 = context$2$0['catch'](17);
  
              state.statusCode = 500;
              context$2$0.next = 30;
              return regeneratorRuntime.awrap(this.events.error(state, context$2$0.t0));
  
            case 30:
              result = context$2$0.sent;
  
              cb(state, result);
  
            case 32:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this, [[17, 25]]);
      }
    }]);
  
    return Router;
  })();
  
  exports['default'] = Router;
  module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Routing | http://www.kriasoft.com/react-routing
   * Copyright (c) Konstantin Tarkus <hello@tarkus.me> | The MIT License
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _pathToRegexp = __webpack_require__(9);
  
  var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);
  
  var _Match = __webpack_require__(11);
  
  var _Match2 = _interopRequireDefault(_Match);
  
  var Route = (function () {
    function Route(path, handlers) {
      _classCallCheck(this, Route);
  
      this.path = path;
      this.handlers = handlers;
      this.regExp = (0, _pathToRegexp2['default'])(path, this.keys = []);
    }
  
    _createClass(Route, [{
      key: 'match',
      value: function match(path) {
        var m = this.regExp.exec(path);
        return m ? new _Match2['default'](this, path, this.keys, m) : null;
      }
    }]);
  
    return Route;
  })();
  
  exports['default'] = Route;
  module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

  var isarray = __webpack_require__(10)
  
  /**
   * Expose `pathToRegexp`.
   */
  module.exports = pathToRegexp
  module.exports.parse = parse
  module.exports.compile = compile
  module.exports.tokensToFunction = tokensToFunction
  module.exports.tokensToRegExp = tokensToRegExp
  
  /**
   * The main path matching regexp utility.
   *
   * @type {RegExp}
   */
  var PATH_REGEXP = new RegExp([
    // Match escaped characters that would otherwise appear in future matches.
    // This allows the user to escape special characters that won't transform.
    '(\\\\.)',
    // Match Express-style parameters and un-named parameters with a prefix
    // and optional suffixes. Matches appear as:
    //
    // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
    // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
    // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
    '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))'
  ].join('|'), 'g')
  
  /**
   * Parse a string for the raw tokens.
   *
   * @param  {String} str
   * @return {Array}
   */
  function parse (str) {
    var tokens = []
    var key = 0
    var index = 0
    var path = ''
    var res
  
    while ((res = PATH_REGEXP.exec(str)) != null) {
      var m = res[0]
      var escaped = res[1]
      var offset = res.index
      path += str.slice(index, offset)
      index = offset + m.length
  
      // Ignore already escaped sequences.
      if (escaped) {
        path += escaped[1]
        continue
      }
  
      // Push the current path onto the tokens.
      if (path) {
        tokens.push(path)
        path = ''
      }
  
      var prefix = res[2]
      var name = res[3]
      var capture = res[4]
      var group = res[5]
      var suffix = res[6]
      var asterisk = res[7]
  
      var repeat = suffix === '+' || suffix === '*'
      var optional = suffix === '?' || suffix === '*'
      var delimiter = prefix || '/'
      var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?')
  
      tokens.push({
        name: name || key++,
        prefix: prefix || '',
        delimiter: delimiter,
        optional: optional,
        repeat: repeat,
        pattern: escapeGroup(pattern)
      })
    }
  
    // Match any characters still remaining.
    if (index < str.length) {
      path += str.substr(index)
    }
  
    // If the path exists, push it onto the end.
    if (path) {
      tokens.push(path)
    }
  
    return tokens
  }
  
  /**
   * Compile a string to a template function for the path.
   *
   * @param  {String}   str
   * @return {Function}
   */
  function compile (str) {
    return tokensToFunction(parse(str))
  }
  
  /**
   * Expose a method for transforming tokens into the path function.
   */
  function tokensToFunction (tokens) {
    // Compile all the tokens into regexps.
    var matches = new Array(tokens.length)
  
    // Compile all the patterns before compilation.
    for (var i = 0; i < tokens.length; i++) {
      if (typeof tokens[i] === 'object') {
        matches[i] = new RegExp('^' + tokens[i].pattern + '$')
      }
    }
  
    return function (obj) {
      var path = ''
      var data = obj || {}
  
      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i]
  
        if (typeof token === 'string') {
          path += token
  
          continue
        }
  
        var value = data[token.name]
        var segment
  
        if (value == null) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to be defined')
          }
        }
  
        if (isarray(value)) {
          if (!token.repeat) {
            throw new TypeError('Expected "' + token.name + '" to not repeat, but received "' + value + '"')
          }
  
          if (value.length === 0) {
            if (token.optional) {
              continue
            } else {
              throw new TypeError('Expected "' + token.name + '" to not be empty')
            }
          }
  
          for (var j = 0; j < value.length; j++) {
            segment = encodeURIComponent(value[j])
  
            if (!matches[i].test(segment)) {
              throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
            }
  
            path += (j === 0 ? token.prefix : token.delimiter) + segment
          }
  
          continue
        }
  
        segment = encodeURIComponent(value)
  
        if (!matches[i].test(segment)) {
          throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
        }
  
        path += token.prefix + segment
      }
  
      return path
    }
  }
  
  /**
   * Escape a regular expression string.
   *
   * @param  {String} str
   * @return {String}
   */
  function escapeString (str) {
    return str.replace(/([.+*?=^!:${}()[\]|\/])/g, '\\$1')
  }
  
  /**
   * Escape the capturing group by escaping special characters and meaning.
   *
   * @param  {String} group
   * @return {String}
   */
  function escapeGroup (group) {
    return group.replace(/([=!:$\/()])/g, '\\$1')
  }
  
  /**
   * Attach the keys as a property of the regexp.
   *
   * @param  {RegExp} re
   * @param  {Array}  keys
   * @return {RegExp}
   */
  function attachKeys (re, keys) {
    re.keys = keys
    return re
  }
  
  /**
   * Get the flags for a regexp from the options.
   *
   * @param  {Object} options
   * @return {String}
   */
  function flags (options) {
    return options.sensitive ? '' : 'i'
  }
  
  /**
   * Pull out keys from a regexp.
   *
   * @param  {RegExp} path
   * @param  {Array}  keys
   * @return {RegExp}
   */
  function regexpToRegexp (path, keys) {
    // Use a negative lookahead to match only capturing groups.
    var groups = path.source.match(/\((?!\?)/g)
  
    if (groups) {
      for (var i = 0; i < groups.length; i++) {
        keys.push({
          name: i,
          prefix: null,
          delimiter: null,
          optional: false,
          repeat: false,
          pattern: null
        })
      }
    }
  
    return attachKeys(path, keys)
  }
  
  /**
   * Transform an array into a regexp.
   *
   * @param  {Array}  path
   * @param  {Array}  keys
   * @param  {Object} options
   * @return {RegExp}
   */
  function arrayToRegexp (path, keys, options) {
    var parts = []
  
    for (var i = 0; i < path.length; i++) {
      parts.push(pathToRegexp(path[i], keys, options).source)
    }
  
    var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))
  
    return attachKeys(regexp, keys)
  }
  
  /**
   * Create a path regexp from string input.
   *
   * @param  {String} path
   * @param  {Array}  keys
   * @param  {Object} options
   * @return {RegExp}
   */
  function stringToRegexp (path, keys, options) {
    var tokens = parse(path)
    var re = tokensToRegExp(tokens, options)
  
    // Attach keys back to the regexp.
    for (var i = 0; i < tokens.length; i++) {
      if (typeof tokens[i] !== 'string') {
        keys.push(tokens[i])
      }
    }
  
    return attachKeys(re, keys)
  }
  
  /**
   * Expose a function for taking tokens and returning a RegExp.
   *
   * @param  {Array}  tokens
   * @param  {Array}  keys
   * @param  {Object} options
   * @return {RegExp}
   */
  function tokensToRegExp (tokens, options) {
    options = options || {}
  
    var strict = options.strict
    var end = options.end !== false
    var route = ''
    var lastToken = tokens[tokens.length - 1]
    var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken)
  
    // Iterate over the tokens and create our regexp string.
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]
  
      if (typeof token === 'string') {
        route += escapeString(token)
      } else {
        var prefix = escapeString(token.prefix)
        var capture = token.pattern
  
        if (token.repeat) {
          capture += '(?:' + prefix + capture + ')*'
        }
  
        if (token.optional) {
          if (prefix) {
            capture = '(?:' + prefix + '(' + capture + '))?'
          } else {
            capture = '(' + capture + ')?'
          }
        } else {
          capture = prefix + '(' + capture + ')'
        }
  
        route += capture
      }
    }
  
    // In non-strict mode we allow a slash at the end of match. If the path to
    // match already ends with a slash, we remove it for consistency. The slash
    // is valid at the end of a path match, not in the middle. This is important
    // in non-ending mode, where "/test/" shouldn't match "/test//route".
    if (!strict) {
      route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?'
    }
  
    if (end) {
      route += '$'
    } else {
      // In non-ending mode, we need the capturing groups to match as much as
      // possible by using a positive lookahead to the end or next path segment.
      route += strict && endsWithSlash ? '' : '(?=\\/|$)'
    }
  
    return new RegExp('^' + route, flags(options))
  }
  
  /**
   * Normalize the given path string, returning a regular expression.
   *
   * An empty array can be passed in for the keys, which will hold the
   * placeholder key descriptions. For example, using `/user/:id`, `keys` will
   * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
   *
   * @param  {(String|RegExp|Array)} path
   * @param  {Array}                 [keys]
   * @param  {Object}                [options]
   * @return {RegExp}
   */
  function pathToRegexp (path, keys, options) {
    keys = keys || []
  
    if (!isarray(keys)) {
      options = keys
      keys = []
    } else if (!options) {
      options = {}
    }
  
    if (path instanceof RegExp) {
      return regexpToRegexp(path, keys, options)
    }
  
    if (isarray(path)) {
      return arrayToRegexp(path, keys, options)
    }
  
    return stringToRegexp(path, keys, options)
  }


/***/ },
/* 10 */
/***/ function(module, exports) {

  module.exports = Array.isArray || function (arr) {
    return Object.prototype.toString.call(arr) == '[object Array]';
  };


/***/ },
/* 11 */
/***/ function(module, exports) {

  /**
   * React Routing | http://www.kriasoft.com/react-routing
   * Copyright (c) Konstantin Tarkus <hello@tarkus.me> | The MIT License
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var Match = function Match(route, path, keys, match) {
    _classCallCheck(this, Match);
  
    this.route = route;
    this.path = path;
    this.params = Object.create(null);
    for (var i = 1; i < match.length; i++) {
      this.params[keys[i - 1].name] = decodeParam(match[i]);
    }
  };
  
  function decodeParam(val) {
    if (!(typeof val === 'string' || val instanceof String)) {
      return val;
    }
  
    try {
      return decodeURIComponent(val);
    } catch (e) {
      var err = new TypeError('Failed to decode param \'' + val + '\'');
      err.status = 400;
      throw err;
    }
  }
  
  exports['default'] = Match;
  module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _fbjsLibEmptyFunction = __webpack_require__(13);
  
  var _fbjsLibEmptyFunction2 = _interopRequireDefault(_fbjsLibEmptyFunction);
  
  var _AppScss = __webpack_require__(14);
  
  var _AppScss2 = _interopRequireDefault(_AppScss);
  
  var _Footer = __webpack_require__(18);
  
  var _Footer2 = _interopRequireDefault(_Footer);
  
  var App = (function (_Component) {
    _inherits(App, _Component);
  
    function App() {
      _classCallCheck(this, App);
  
      _get(Object.getPrototypeOf(App.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(App, [{
      key: 'getChildContext',
      value: function getChildContext() {
        var context = this.props.context;
        return {
          insertCss: context.insertCss || _fbjsLibEmptyFunction2['default'],
          onSetTitle: context.onSetTitle || _fbjsLibEmptyFunction2['default'],
          onSetMeta: context.onSetMeta || _fbjsLibEmptyFunction2['default'],
          onPageNotFound: context.onPageNotFound || _fbjsLibEmptyFunction2['default']
        };
      }
    }, {
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.removeCss = this.props.context.insertCss(_AppScss2['default']);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.removeCss();
      }
    }, {
      key: 'render',
      value: function render() {
        return !this.props.error ? _react2['default'].createElement(
          'div',
          { className: _AppScss2['default'].container },
          _react2['default'].createElement(
            'main',
            { className: _AppScss2['default'].main },
            this.props.children
          ),
          _react2['default'].createElement(_Footer2['default'], null)
        ) : this.props.children;
      }
    }], [{
      key: 'propTypes',
      value: {
        context: _react.PropTypes.shape({
          insertCss: _react.PropTypes.func,
          onSetTitle: _react.PropTypes.func,
          onSetMeta: _react.PropTypes.func,
          onPageNotFound: _react.PropTypes.func
        }),
        children: _react.PropTypes.element.isRequired,
        error: _react.PropTypes.object
      },
      enumerable: true
    }, {
      key: 'childContextTypes',
      value: {
        insertCss: _react.PropTypes.func.isRequired,
        onSetTitle: _react.PropTypes.func.isRequired,
        onSetMeta: _react.PropTypes.func.isRequired,
        onPageNotFound: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    return App;
  })(_react.Component);
  
  exports['default'] = App;
  module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports) {

  module.exports = require("fbjs/lib/emptyFunction");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(15);
      var insertCss = __webpack_require__(17);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(16)();
  // imports
  
  
  // module
  exports.push([module.id, "/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}audio:not([controls]){display:none;height:0}[hidden],template{display:none}a{background-color:transparent}a:active,a:hover{outline:0}abbr[title]{border-bottom:1px dotted}b,strong{font-weight:700}dfn{font-style:italic}h1{font-size:2em;margin:.67em 0}mark{background:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}img{border:0}svg:not(:root){overflow:hidden}figure{margin:1em 40px}hr{box-sizing:content-box;height:0}pre{overflow:auto}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}button,input,optgroup,select,textarea{color:inherit;font:inherit;margin:0}button{overflow:visible}button,select{text-transform:none}button,html input[type=button],input[type=reset],input[type=submit]{-webkit-appearance:button;cursor:pointer}button[disabled],html input[disabled]{cursor:default}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}input{line-height:normal}input[type=checkbox],input[type=radio]{box-sizing:border-box;padding:0}input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{height:auto}input[type=search]{-webkit-appearance:textfield;box-sizing:content-box}input[type=search]::-webkit-search-cancel-button,input[type=search]::-webkit-search-decoration{-webkit-appearance:none}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{border:0;padding:0}textarea{overflow:auto}optgroup{font-weight:700}table{border-collapse:collapse;border-spacing:0}td,th{padding:0}*{box-sizing:border-box}a,a:active,a:link,a:visited{color:#fff;text-decoration:none;-webkit-transition:color ease-in-out .15s;transition:color ease-in-out .15s}a:focus,a:hover{color:#8b8086}h1,h2,h3,h4,h5,h6{color:#9e969b;font-weight:400}html{font-weight:400;font-size:1em;font-family:Arimo,Segoe UI,HelveticaNeue-Light,sans-serif;line-height:1.375}body{background-color:#222314;color:#8b8086}.App_container_3x2,body{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;min-height:100vh;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.App_main_11s{margin-left:auto;margin-right:auto;max-width:1000px;-webkit-box-flex:1;-webkit-flex:1 0 auto;-ms-flex:1 0 auto;flex:1 0 auto}::-moz-selection{background:#b3d4fc;text-shadow:none}::selection{background:#b3d4fc;text-shadow:none}hr{display:block;height:1px;border:0;border-top:1px solid #ccc;margin:1em 0;padding:0}audio,canvas,iframe,img,svg,video{vertical-align:middle}fieldset{border:0;margin:0;padding:0}textarea{resize:vertical}.App_browserupgrade_1t4{margin:.2em 0;background:#ccc;color:#000;padding:.2em 0}@media print{*,:after,:before{background:transparent!important;color:#000!important;box-shadow:none!important;text-shadow:none!important}a,a:visited{text-decoration:underline}a[href]:after{content:\" (\" attr(href) \")\"}abbr[title]:after{content:\" (\" attr(title) \")\"}a[href^=\"#\"]:after,a[href^=\"javascript:\"]:after{content:\"\"}blockquote,pre{border:1px solid #999;page-break-inside:avoid}thead{display:table-header-group}img,tr{page-break-inside:avoid}img{max-width:100%!important}h2,h3,p{orphans:3;widows:3}h2,h3{page-break-after:avoid}}button,input[type=search],input[type=text]{background-color:#8b8086;color:#fff}input[type=search],input[type=text],select{box-sizing:border-box;display:block;width:100%;padding:6px;font-size:14px;line-height:1.42857143;background-image:none;border:1px solid #574e4f;border-radius:2px;box-shadow:inset 0 1px 1px rgba(0,0,0,.075);-webkit-transition:border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s}input[type=search]:disabled,input[type=text]:disabled,select:disabled{color:#ccc;background-color:#7c7177}input[type=search]:focus,input[type=text]:focus,select:focus{border-color:#f5efef;outline:0;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px hsla(0,23%,95%,.6)}select{height:34px}input[type=search]::-webkit-search-cancel-button{-webkit-appearance:searchfield-cancel-button}button,input,select,textarea{font:inherit}button{display:inline-block;padding:6px 12px;margin-bottom:0;font-size:14px;font-weight:700;line-height:1.42857143;text-align:center;white-space:nowrap;vertical-align:baseline;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-image:none;border:1px solid #574e4f;border-radius:2px;-webkit-transition:background-color ease-in-out .15s;transition:background-color ease-in-out .15s}button:focus,button:hover{background-color:#7c7177}button:disabled,button:disabled:focus,button:disabled:hover{color:#ccc;background-color:#7c7177}", ""]);
  
  // exports
  exports.locals = {
  	"container": "App_container_3x2",
  	"main": "App_main_11s",
  	"browserupgrade": "App_browserupgrade_1t4"
  };

/***/ },
/* 16 */
/***/ function(module, exports) {

  /*
  	MIT License http://www.opensource.org/licenses/mit-license.php
  	Author Tobias Koppers @sokra
  */
  // css base code, injected by the css-loader
  module.exports = function() {
  	var list = [];
  
  	// return the list of modules as css string
  	list.toString = function toString() {
  		var result = [];
  		for(var i = 0; i < this.length; i++) {
  			var item = this[i];
  			if(item[2]) {
  				result.push("@media " + item[2] + "{" + item[1] + "}");
  			} else {
  				result.push(item[1]);
  			}
  		}
  		return result.join("");
  	};
  
  	// import a list of modules into the list
  	list.i = function(modules, mediaQuery) {
  		if(typeof modules === "string")
  			modules = [[null, modules, ""]];
  		var alreadyImportedModules = {};
  		for(var i = 0; i < this.length; i++) {
  			var id = this[i][0];
  			if(typeof id === "number")
  				alreadyImportedModules[id] = true;
  		}
  		for(i = 0; i < modules.length; i++) {
  			var item = modules[i];
  			// skip already imported module
  			// this implementation is not 100% perfect for weird media query combinations
  			//  when a module is imported multiple times with different media queries.
  			//  I hope this will never occur (Hey this way we have smaller bundles)
  			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
  				if(mediaQuery && !item[2]) {
  					item[2] = mediaQuery;
  				} else if(mediaQuery) {
  					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
  				}
  				list.push(item);
  			}
  		}
  	};
  	return list;
  };


/***/ },
/* 17 */
/***/ function(module, exports) {

  'use strict';
  
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();
  
  /**
   * Isomorphic CSS style loader for Webpack
   *
   * Copyright © 2015 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var prefix = 's';
  var inserted = {};
  var canUseURL = typeof URL === 'function' && typeof URL.createObjectURL === 'function' && typeof URL.revokeObjectURL === 'function' && typeof Blob === 'function' && typeof btoa === 'function';
  
  /**
   * Remove style/link elements for specified Module IDs
   * if they are no longer referenced by UI components.
   */
  function removeCss(ids) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;
  
    try {
      for (var _iterator = ids[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var id = _step.value;
  
        if (--inserted[id] === 0) {
          var elem = document.getElementById(prefix + id);
          if (elem) {
            elem.parentNode.removeChild(elem);
            if (canUseURL && elem.tagName === 'STYLE' && elem.href) {
              URL.revokeObjectURL(elem.href);
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  
  /**
   * Example:
   *   // Insert CSS styles object generated by `css-loader` into DOM
   *   var removeCss = insertCss([[1, 'body { color: red; }']]);
   *
   *   // Remove it from the DOM
   *   removeCss();
   */
  function insertCss(styles) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  
    var _Object$assign = Object.assign({
      replace: false,
      prepend: false
    }, options);
  
    var replace = _Object$assign.replace;
    var prepend = _Object$assign.prepend;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;
  
    try {
  
      for (var _iterator2 = styles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _step2$value = _slicedToArray(_step2.value, 4);
  
        var id = _step2$value[0];
        var css = _step2$value[1];
        var media = _step2$value[2];
        var sourceMap = _step2$value[3];
  
        if (inserted[id]) {
          if (!replace) {
            inserted[id]++;
            continue;
          }
        }
  
        inserted[id] = 1;
  
        var elem = document.getElementById(prefix + id);
        var create = false;
  
        if (!elem) {
          create = true;
  
          if (sourceMap && canUseURL) {
            elem = document.createElement('link');
            elem.setAttribute('rel', 'stylesheet');
          } else {
            elem = document.createElement('style');
            elem.setAttribute('type', 'text/css');
          }
  
          elem.id = prefix + id;
  
          if (media) {
            elem.setAttribute('media', media);
          }
        }
  
        if (elem.tagName === 'STYLE') {
          if ('textContent' in elem) {
            elem.textContent = css;
          } else {
            elem.styleSheet.cssText = css;
          }
        } else {
          var blob = new Blob([css + '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'], { type: 'text/css' });
  
          var href = elem.href;
          elem.href = URL.createObjectURL(blob);
  
          if (href) {
            URL.revokeObjectURL(href);
          }
        }
  
        if (create) {
          if (prepend) {
            document.head.insertBefore(elem, document.head.childNodes[0]);
          } else {
            document.head.appendChild(elem);
          }
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  
    return removeCss.bind(null, styles.map(function (x) {
      return x[0];
    }));
  }
  
  module.exports = insertCss;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _FooterScss = __webpack_require__(19);
  
  var _FooterScss2 = _interopRequireDefault(_FooterScss);
  
  var _decoratorsWithStyles = __webpack_require__(21);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var Footer = (function (_Component) {
    _inherits(Footer, _Component);
  
    function Footer() {
      _classCallCheck(this, _Footer);
  
      _get(Object.getPrototypeOf(_Footer.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(Footer, [{
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'footer',
          { className: _FooterScss2['default'].footer },
          _react2['default'].createElement(
            'div',
            { className: _FooterScss2['default'].innerContainer },
            '© 2016 Sarah Vessels',
            _react2['default'].createElement('span', { className: _FooterScss2['default'].separator }),
            _react2['default'].createElement(
              'a',
              { href: 'https://github.com/cheshire137/steam-palettes',
                target: '_blank',
                className: _FooterScss2['default'].link
              },
              'View source'
            )
          )
        );
      }
    }]);
  
    var _Footer = Footer;
    Footer = (0, _decoratorsWithStyles2['default'])(_FooterScss2['default'])(Footer) || Footer;
    return Footer;
  })(_react.Component);
  
  exports['default'] = Footer;
  module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(20);
      var insertCss = __webpack_require__(17);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(16)();
  // imports
  
  
  // module
  exports.push([module.id, ".Footer_footer_2nh,.Footer_link_NoJ:active,.Footer_link_NoJ:link,.Footer_link_NoJ:visited,a.Footer_link_NoJ{color:#8b8086}.Footer_footer_2nh{display:block;margin-top:40px;text-align:center;font-size:12px;background-color:#0d0c0b}.Footer_innerContainer_3fW{max-width:1000px;margin:0 auto;padding:40px 0}a.Footer_link_NoJ{text-decoration:underline}a.Footer_link_NoJ:focus,a.Footer_link_NoJ:hover{text-decoration:none;color:#fff}.Footer_separator_3a2:before{content:\"\\A0\\B7\\A0\"}", ""]);
  
  // exports
  exports.locals = {
  	"footer": "Footer_footer_2nh",
  	"link": "Footer_link_NoJ",
  	"innerContainer": "Footer_innerContainer_3fW",
  	"separator": "Footer_separator_3a2"
  };

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  function withStyles() {
    for (var _len = arguments.length, styles = Array(_len), _key = 0; _key < _len; _key++) {
      styles[_key] = arguments[_key];
    }
  
    return function (BaseComponent) {
      return (function (_Component) {
        _inherits(StyledComponent, _Component);
  
        function StyledComponent() {
          _classCallCheck(this, StyledComponent);
  
          _get(Object.getPrototypeOf(StyledComponent.prototype), 'constructor', this).apply(this, arguments);
        }
  
        _createClass(StyledComponent, [{
          key: 'componentWillMount',
          value: function componentWillMount() {
            this.removeCss = this.context.insertCss.apply(undefined, styles);
          }
        }, {
          key: 'componentWillUnmount',
          value: function componentWillUnmount() {
            this.removeCss();
          }
        }, {
          key: 'render',
          value: function render() {
            return _react2['default'].createElement(BaseComponent, this.props);
          }
        }], [{
          key: 'contextTypes',
          value: {
            insertCss: _react.PropTypes.func.isRequired
          },
          enumerable: true
        }]);
  
        return StyledComponent;
      })(_react.Component);
    };
  }
  
  exports['default'] = withStyles;
  module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _NotFoundPageScss = __webpack_require__(23);
  
  var _NotFoundPageScss2 = _interopRequireDefault(_NotFoundPageScss);
  
  var _decoratorsWithStyles = __webpack_require__(21);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var title = 'Page Not Found';
  
  var NotFoundPage = (function (_Component) {
    _inherits(NotFoundPage, _Component);
  
    function NotFoundPage() {
      _classCallCheck(this, _NotFoundPage);
  
      _get(Object.getPrototypeOf(_NotFoundPage.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(NotFoundPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
        this.context.onPageNotFound();
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            'h1',
            null,
            title
          ),
          _react2['default'].createElement(
            'p',
            null,
            'Sorry, but the page you were trying to view does not exist.'
          )
        );
      }
    }], [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired,
        onPageNotFound: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    var _NotFoundPage = NotFoundPage;
    NotFoundPage = (0, _decoratorsWithStyles2['default'])(_NotFoundPageScss2['default'])(NotFoundPage) || NotFoundPage;
    return NotFoundPage;
  })(_react.Component);
  
  exports['default'] = NotFoundPage;
  module.exports = exports['default'];

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(24);
      var insertCss = __webpack_require__(17);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(16)();
  // imports
  
  
  // module
  exports.push([module.id, "*{margin:0;line-height:1.2}html{display:table;width:100%;height:100%;color:#888;text-align:center;font-family:sans-serif}body{display:table-cell;margin:2em auto;vertical-align:middle}h1{color:#555;font-weight:400;font-size:2em}p{margin:0 auto;width:280px}@media only screen and (max-width:280px){body,p{width:95%}h1{font-size:1.5em;margin:0 0 .3em}}", ""]);
  
  // exports


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ErrorPageScss = __webpack_require__(26);
  
  var _ErrorPageScss2 = _interopRequireDefault(_ErrorPageScss);
  
  var _decoratorsWithStyles = __webpack_require__(21);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var title = 'Error';
  
  var ErrorPage = (function (_Component) {
    _inherits(ErrorPage, _Component);
  
    function ErrorPage() {
      _classCallCheck(this, _ErrorPage);
  
      _get(Object.getPrototypeOf(_ErrorPage.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(ErrorPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            'h1',
            null,
            title
          ),
          _react2['default'].createElement(
            'p',
            null,
            'Sorry, an critical error occurred on this page.'
          )
        );
      }
    }], [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired,
        onPageNotFound: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    var _ErrorPage = ErrorPage;
    ErrorPage = (0, _decoratorsWithStyles2['default'])(_ErrorPageScss2['default'])(ErrorPage) || ErrorPage;
    return ErrorPage;
  })(_react.Component);
  
  exports['default'] = ErrorPage;
  module.exports = exports['default'];

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(27);
      var insertCss = __webpack_require__(17);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(16)();
  // imports
  
  
  // module
  exports.push([module.id, "*{margin:0;line-height:1.2}html{display:table;width:100%;height:100%;color:#888;text-align:center;font-family:sans-serif}body{display:table-cell;margin:2em auto;vertical-align:middle}h1{color:#555;font-weight:400;font-size:2em}p{margin:0 auto;width:280px}@media only screen and (max-width:280px){body,p{width:95%}h1{font-size:1.5em;margin:0 0 .3em}}", ""]);
  
  // exports


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _PlayerLookupPageScss = __webpack_require__(29);
  
  var _PlayerLookupPageScss2 = _interopRequireDefault(_PlayerLookupPageScss);
  
  var _decoratorsWithStyles = __webpack_require__(21);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _apiSteam = __webpack_require__(31);
  
  var _apiSteam2 = _interopRequireDefault(_apiSteam);
  
  var _classnames = __webpack_require__(37);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _coreLocation = __webpack_require__(38);
  
  var _coreLocation2 = _interopRequireDefault(_coreLocation);
  
  var _historyLibParsePath = __webpack_require__(43);
  
  var _historyLibParsePath2 = _interopRequireDefault(_historyLibParsePath);
  
  var _Header = __webpack_require__(44);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var title = 'Find a Steam User';
  
  var PlayerLookupPage = (function (_Component) {
    _inherits(PlayerLookupPage, _Component);
  
    _createClass(PlayerLookupPage, null, [{
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    function PlayerLookupPage(props, context) {
      _classCallCheck(this, _PlayerLookupPage);
  
      _get(Object.getPrototypeOf(_PlayerLookupPage.prototype), 'constructor', this).call(this, props, context);
      this.state = {
        name: undefined,
        disabled: false,
        error: false,
        message: 'The Steam profile must be public.',
        noMatch: false
      };
    }
  
    _createClass(PlayerLookupPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
      }
    }, {
      key: 'onNameChange',
      value: function onNameChange(event) {
        this.setState({ name: event.target.value });
      }
    }, {
      key: 'onSteamIDLoaded',
      value: function onSteamIDLoaded(steamID) {
        this.setState({
          disabled: false,
          error: false,
          message: undefined
        });
        _coreLocation2['default'].push(_extends({}, (0, _historyLibParsePath2['default'])('/player/' + encodeURIComponent(this.state.name) + '/' + steamID)));
      }
    }, {
      key: 'onSteamIDLoadError',
      value: function onSteamIDLoadError(response) {
        console.error('failed to load Steam ID', response);
        this.setState({
          disabled: false,
          error: true,
          message: 'There was an error looking up your Steam ID. :(',
          noMatch: response.message === 'No match'
        });
      }
    }, {
      key: 'handleSubmit',
      value: function handleSubmit(event) {
        event.preventDefault();
        this.setState({
          disabled: true,
          message: 'Looking up Steam ID...',
          error: false
        });
        _apiSteam2['default'].getSteamId(this.state.name).then(this.onSteamIDLoaded.bind(this))['catch'](this.onSteamIDLoadError.bind(this));
      }
    }, {
      key: 'render',
      value: function render() {
        var messageStyle = {};
        if (typeof this.state.message !== 'string') {
          messageStyle.display = 'none';
        }
        var messageClass = this.state.error ? _PlayerLookupPageScss2['default'].error : _PlayerLookupPageScss2['default'].success;
        return _react2['default'].createElement(
          'div',
          { className: _PlayerLookupPageScss2['default'].container },
          _react2['default'].createElement(_Header2['default'], null),
          _react2['default'].createElement(
            'form',
            { className: _PlayerLookupPageScss2['default'].form, onSubmit: this.handleSubmit.bind(this) },
            _react2['default'].createElement(
              'h1',
              { className: _PlayerLookupPageScss2['default'].title },
              title
            ),
            _react2['default'].createElement(
              'label',
              { className: _PlayerLookupPageScss2['default'].label,
                htmlFor: 'user-name'
              },
              'Steam user name:'
            ),
            _react2['default'].createElement('input', { type: 'text', autoFocus: 'autofocus', className: _PlayerLookupPageScss2['default'].textField,
              id: 'user-name',
              placeholder: 'e.g., cheshire137',
              onChange: this.onNameChange.bind(this),
              value: this.state.name,
              disabled: this.state.disabled
            }),
            _react2['default'].createElement(
              'button',
              { type: 'submit', disabled: this.state.disabled,
                className: _PlayerLookupPageScss2['default'].button
              },
              'Search'
            ),
            _react2['default'].createElement(
              'p',
              { className: (0, _classnames2['default'])(_PlayerLookupPageScss2['default'].message, messageClass), style: messageStyle },
              this.state.message
            ),
            this.state.error && this.state.noMatch ? _react2['default'].createElement(
              'div',
              { className: _PlayerLookupPageScss2['default'].steamInstructions },
              _react2['default'].createElement(
                'p',
                { className: _PlayerLookupPageScss2['default'].instruction },
                'Try setting your custom URL in Steam:'
              ),
              _react2['default'].createElement('img', { src: __webpack_require__(49), width: '640',
                height: '321', alt: 'Edit Steam profile',
                className: _PlayerLookupPageScss2['default'].instructionImage
              }),
              _react2['default'].createElement(
                'p',
                { className: _PlayerLookupPageScss2['default'].instruction },
                'Then, search here for the name you set in that custom URL.'
              )
            ) : ''
          )
        );
      }
    }]);
  
    var _PlayerLookupPage = PlayerLookupPage;
    PlayerLookupPage = (0, _decoratorsWithStyles2['default'])(_PlayerLookupPageScss2['default'])(PlayerLookupPage) || PlayerLookupPage;
    return PlayerLookupPage;
  })(_react.Component);
  
  exports['default'] = PlayerLookupPage;
  module.exports = exports['default'];

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(30);
      var insertCss = __webpack_require__(17);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(16)();
  // imports
  
  
  // module
  exports.push([module.id, ".PlayerLookupPage_label_R4M{display:inline-block;font-weight:700;font-size:18px;margin-bottom:5px}input[type=text].PlayerLookupPage_textField_3sr{width:20em;display:inline-block;margin:0 10px}.PlayerLookupPage_button_la3,input[type=text].PlayerLookupPage_textField_3sr{font-size:18px}.PlayerLookupPage_title_1LY{margin:0 0 10px}.PlayerLookupPage_form_1Od{margin:0 auto;text-align:center}.PlayerLookupPage_message_2jv.PlayerLookupPage_success_1hv{color:#a5a781}.PlayerLookupPage_message_2jv.PlayerLookupPage_error_1P-{color:#a78e81}", ""]);
  
  // exports
  exports.locals = {
  	"label": "PlayerLookupPage_label_R4M",
  	"textField": "PlayerLookupPage_textField_3sr",
  	"button": "PlayerLookupPage_button_la3",
  	"title": "PlayerLookupPage_title_1LY",
  	"form": "PlayerLookupPage_form_1Od",
  	"message": "PlayerLookupPage_message_2jv",
  	"success": "PlayerLookupPage_success_1hv",
  	"error": "PlayerLookupPage_error_1P-",
  	"container": "PlayerLookupPage_container_zPm",
  	"steamInstructions": "PlayerLookupPage_steamInstructions_149",
  	"instruction": "PlayerLookupPage_instruction_1h3",
  	"instructionImage": "PlayerLookupPage_instructionImage_2Kk"
  };

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _api = __webpack_require__(32);
  
  var _api2 = _interopRequireDefault(_api);
  
  var Steam = (function (_Api) {
    _inherits(Steam, _Api);
  
    function Steam() {
      _classCallCheck(this, Steam);
  
      _get(Object.getPrototypeOf(Steam.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(Steam, null, [{
      key: 'getScreenshots',
      value: function getScreenshots(username) {
        var data;
        return regeneratorRuntime.async(function getScreenshots$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              context$2$0.next = 2;
              return regeneratorRuntime.awrap(this.get('/api/screenshots?user=' + encodeURIComponent(username) + '&format=json'));
  
            case 2:
              data = context$2$0.sent;
              return context$2$0.abrupt('return', data);
  
            case 4:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }, {
      key: 'getScreenshot',
      value: function getScreenshot(screenshotID) {
        var screenshot;
        return regeneratorRuntime.async(function getScreenshot$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              context$2$0.next = 2;
              return regeneratorRuntime.awrap(this.get('/api/screenshot?id=' + screenshotID + '&format=json'));
  
            case 2:
              screenshot = context$2$0.sent;
  
              if (screenshot.date) {
                screenshot.date = new Date(screenshot.date);
              }
              return context$2$0.abrupt('return', screenshot);
  
            case 5:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
  
      // https://wiki.teamfortress.com/wiki/WebAPI/ResolveVanityURL
    }, {
      key: 'getSteamId',
      value: function getSteamId(username) {
        var data, message;
        return regeneratorRuntime.async(function getSteamId$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              context$2$0.next = 2;
              return regeneratorRuntime.awrap(this.get('/api/steam?format=json' + '&path=/ISteamUser/ResolveVanityURL/v0001/' + '&vanityurl=' + encodeURIComponent(username)));
  
            case 2:
              data = context$2$0.sent;
  
              if (!data.response.steamid) {
                context$2$0.next = 5;
                break;
              }
  
              return context$2$0.abrupt('return', data.response.steamid);
  
            case 5:
              message = undefined;
  
              if (data.response.message) {
                message = data.response.message;
              } else {
                message = 'Failed to get Steam ID.';
              }
              throw new Error(message);
  
            case 8:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
  
      // communityvisibilitystate 3 means the profile is public.
    }, {
      key: 'getPlayerSummary',
      value: function getPlayerSummary(steamID) {
        var summaries;
        return regeneratorRuntime.async(function getPlayerSummary$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              context$2$0.next = 2;
              return regeneratorRuntime.awrap(this.getPlayerSummaries([steamID]));
  
            case 2:
              summaries = context$2$0.sent;
  
              if (!(summaries.length < 1)) {
                context$2$0.next = 5;
                break;
              }
  
              throw new Error('Could not find Steam user ' + steamID);
  
            case 5:
              return context$2$0.abrupt('return', summaries[0]);
  
            case 6:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }, {
      key: 'getPlayerSummaries',
      value: function getPlayerSummaries(steamIDs) {
        var batches, batchSize, index, batch, summaries, i, result;
        return regeneratorRuntime.async(function getPlayerSummaries$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              batches = [];
              batchSize = 100;
              index = 0;
  
              while (index < steamIDs.length) {
                batch = [];
  
                while (batch.length < batchSize && index < steamIDs.length) {
                  batch.push(steamIDs[index]);
                  index++;
                }
                batches.push(batch);
              }
              summaries = [];
              i = 0;
  
            case 6:
              if (!(i < batches.length)) {
                context$2$0.next = 14;
                break;
              }
  
              context$2$0.next = 9;
              return regeneratorRuntime.awrap(this.get('/api/steam?format=json' + '&path=/ISteamUser/GetPlayerSummaries/v0002/' + '&steamids=' + batches[i].join(',')));
  
            case 9:
              result = context$2$0.sent;
  
              if (result.response) {
                summaries = summaries.concat(result.response.players || []);
              }
  
            case 11:
              i++;
              context$2$0.next = 6;
              break;
  
            case 14:
              summaries.sort(function (a, b) {
                var aName = a.personaname.toLowerCase();
                var bName = b.personaname.toLowerCase();
                return aName.localeCompare(bName);
              });
              return context$2$0.abrupt('return', summaries);
  
            case 16:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }, {
      key: 'getFriends',
      value: function getFriends(steamId) {
        var data, friendIDs, friends;
        return regeneratorRuntime.async(function getFriends$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              context$2$0.next = 2;
              return regeneratorRuntime.awrap(this.get('/api/steam?format=json' + '&path=/ISteamUser/GetFriendList/v0001/' + '&steamid=' + steamId + '&relationship=friend'));
  
            case 2:
              data = context$2$0.sent;
  
              if (!data.friendslist) {
                context$2$0.next = 9;
                break;
              }
  
              friendIDs = data.friendslist.friends.map(function (f) {
                return f.steamid;
              });
              context$2$0.next = 7;
              return regeneratorRuntime.awrap(this.getPlayerSummaries(friendIDs));
  
            case 7:
              friends = context$2$0.sent;
              return context$2$0.abrupt('return', friends);
  
            case 9:
              throw new Error('Failed to get friends for ' + steamId + '; may not be a public profile.');
  
            case 10:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }]);
  
    return Steam;
  })(_api2['default']);
  
  exports['default'] = Steam;
  module.exports = exports['default'];

  // see https://developer.valvesoftware.com/wiki/Steam_Web_API#GetPlayerSummaries_.28v0002.29

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _coreFetch = __webpack_require__(33);
  
  var _coreFetch2 = _interopRequireDefault(_coreFetch);
  
  var _configJson = __webpack_require__(36);
  
  var _configJson2 = _interopRequireDefault(_configJson);
  
  var Api = (function () {
    function Api() {
      _classCallCheck(this, Api);
    }
  
    _createClass(Api, null, [{
      key: 'get',
      value: function get(path, opts) {
        var options, response;
        return regeneratorRuntime.async(function get$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              options = opts || {};
  
              options.method = 'GET';
              context$2$0.next = 4;
              return regeneratorRuntime.awrap(this.makeRequest(path, options));
  
            case 4:
              response = context$2$0.sent;
              return context$2$0.abrupt('return', response);
  
            case 6:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }, {
      key: 'makeRequest',
      value: function makeRequest(path, options) {
        var config, url, response, isJSON, json, text;
        return regeneratorRuntime.async(function makeRequest$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              config = _configJson2['default'][("production")];
              url = config.preferredScheme + '://' + config.serverHost + path;
              context$2$0.next = 4;
              return regeneratorRuntime.awrap((0, _coreFetch2['default'])(url, options || {}));
  
            case 4:
              response = context$2$0.sent;
              isJSON = path.indexOf('format=json') > -1;
  
              if (!isJSON) {
                context$2$0.next = 20;
                break;
              }
  
              context$2$0.next = 9;
              return regeneratorRuntime.awrap(response.json());
  
            case 9:
              json = context$2$0.sent;
  
              if (!response.ok) {
                context$2$0.next = 12;
                break;
              }
  
              return context$2$0.abrupt('return', json);
  
            case 12:
              if (!json.hasOwnProperty('error')) {
                context$2$0.next = 18;
                break;
              }
  
              if (!(typeof json.error === 'string')) {
                context$2$0.next = 17;
                break;
              }
  
              throw new Error(json.error);
  
            case 17:
              throw new Error(JSON.stringify(json.error));
  
            case 18:
              context$2$0.next = 25;
              break;
  
            case 20:
              context$2$0.next = 22;
              return regeneratorRuntime.awrap(response.text());
  
            case 22:
              text = context$2$0.sent;
  
              if (!response.ok) {
                context$2$0.next = 25;
                break;
              }
  
              return context$2$0.abrupt('return', text);
  
            case 25:
              throw new Error(response.statusText);
  
            case 26:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }]);
  
    return Api;
  })();
  
  exports['default'] = Api;
  module.exports = exports['default'];

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _nodeFetch = __webpack_require__(34);
  
  var _nodeFetch2 = _interopRequireDefault(_nodeFetch);
  
  var _config = __webpack_require__(35);
  
  function localUrl(url) {
    if (url.startsWith('//')) {
      return 'https:' + url;
    }
  
    if (url.startsWith('http')) {
      return url;
    }
  
    return 'http://' + _config.host + url;
  }
  
  function localFetch(url, options) {
    return (0, _nodeFetch2['default'])(localUrl(url), options);
  }
  
  exports['default'] = localFetch;
  exports.Request = _nodeFetch.Request;
  exports.Headers = _nodeFetch.Headers;
  exports.Response = _nodeFetch.Response;

/***/ },
/* 34 */
/***/ function(module, exports) {

  module.exports = require("node-fetch");

/***/ },
/* 35 */
/***/ function(module, exports) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  var port = process.env.PORT || 5000;
  exports.port = port;
  var host = process.env.WEBSITE_HOSTNAME || 'localhost:' + port;
  exports.host = host;
  var googleAnalyticsId = 'UA-77717806-1';
  exports.googleAnalyticsId = googleAnalyticsId;

/***/ },
/* 36 */
/***/ function(module, exports) {

  module.exports = {
  	"development": {
  		"preferredScheme": "http",
  		"serverHost": "localhost:5000",
  		"clientHost": "localhost:3000"
  	},
  	"production": {
  		"preferredScheme": "https",
  		"serverHost": "steam-palettes.herokuapp.com",
  		"clientHost": "steam-palettes.herokuapp.com"
  	}
  };

/***/ },
/* 37 */
/***/ function(module, exports) {

  module.exports = require("classnames");

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _fbjsLibExecutionEnvironment = __webpack_require__(39);
  
  var _historyLibCreateBrowserHistory = __webpack_require__(40);
  
  var _historyLibCreateBrowserHistory2 = _interopRequireDefault(_historyLibCreateBrowserHistory);
  
  var _historyLibCreateMemoryHistory = __webpack_require__(41);
  
  var _historyLibCreateMemoryHistory2 = _interopRequireDefault(_historyLibCreateMemoryHistory);
  
  var _historyLibUseQueries = __webpack_require__(42);
  
  var _historyLibUseQueries2 = _interopRequireDefault(_historyLibUseQueries);
  
  var location = (0, _historyLibUseQueries2['default'])(_fbjsLibExecutionEnvironment.canUseDOM ? _historyLibCreateBrowserHistory2['default'] : _historyLibCreateMemoryHistory2['default'])();
  
  exports['default'] = location;
  module.exports = exports['default'];

/***/ },
/* 39 */
/***/ function(module, exports) {

  module.exports = require("fbjs/lib/ExecutionEnvironment");

/***/ },
/* 40 */
/***/ function(module, exports) {

  module.exports = require("history/lib/createBrowserHistory");

/***/ },
/* 41 */
/***/ function(module, exports) {

  module.exports = require("history/lib/createMemoryHistory");

/***/ },
/* 42 */
/***/ function(module, exports) {

  module.exports = require("history/lib/useQueries");

/***/ },
/* 43 */
/***/ function(module, exports) {

  module.exports = require("history/lib/parsePath");

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _HeaderScss = __webpack_require__(45);
  
  var _HeaderScss2 = _interopRequireDefault(_HeaderScss);
  
  var _decoratorsWithStyles = __webpack_require__(21);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _Link = __webpack_require__(47);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _reactFontawesome = __webpack_require__(48);
  
  var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);
  
  var Header = (function (_Component) {
    _inherits(Header, _Component);
  
    function Header() {
      _classCallCheck(this, _Header);
  
      _get(Object.getPrototypeOf(_Header.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(Header, [{
      key: 'render',
      value: function render() {
        var hasBackLink = typeof this.props.previousUrl === 'string';
        var hasNamedBackLink = typeof this.props.previousTitle === 'string';
        var hasTitle = typeof this.props.title === 'string';
        return _react2['default'].createElement(
          'header',
          { className: _HeaderScss2['default'].header },
          _react2['default'].createElement(
            'h1',
            { className: _HeaderScss2['default'].title },
            hasBackLink && !hasNamedBackLink ? _react2['default'].createElement(
              'a',
              { href: this.props.previousUrl, className: _HeaderScss2['default'].backLink,
                onClick: _Link2['default'].handleClick
              },
              '←'
            ) : '',
            _react2['default'].createElement(
              'a',
              { className: _HeaderScss2['default'].brand, href: '/', onClick: _Link2['default'].handleClick },
              'Steam Palettes'
            ),
            hasBackLink && hasNamedBackLink ? _react2['default'].createElement(
              'span',
              { className: _HeaderScss2['default'].backLinkWrapper },
              _react2['default'].createElement(
                'span',
                { className: _HeaderScss2['default'].separator },
                '/'
              ),
              _react2['default'].createElement(
                'a',
                { href: this.props.previousUrl, className: _HeaderScss2['default'].backLink,
                  onClick: _Link2['default'].handleClick
                },
                typeof this.props.previousIcon === 'string' ? _react2['default'].createElement(_reactFontawesome2['default'], { name: this.props.previousIcon,
                  className: _HeaderScss2['default'].icon
                }) : '',
                this.props.previousTitle
              )
            ) : '',
            hasTitle ? _react2['default'].createElement(
              'span',
              { className: _HeaderScss2['default'].subtitleWrapper },
              _react2['default'].createElement(
                'span',
                { className: _HeaderScss2['default'].separator },
                '/'
              ),
              _react2['default'].createElement(
                'span',
                { className: _HeaderScss2['default'].subtitle },
                typeof this.props.titleIcon === 'string' ? _react2['default'].createElement(_reactFontawesome2['default'], { name: this.props.titleIcon,
                  className: _HeaderScss2['default'].icon
                }) : '',
                this.props.title
              )
            ) : ''
          )
        );
      }
    }], [{
      key: 'propTypes',
      value: {
        title: _react.PropTypes.string,
        previousUrl: _react.PropTypes.string,
        previousTitle: _react.PropTypes.string,
        previousIcon: _react.PropTypes.string,
        titleIcon: _react.PropTypes.string
      },
      enumerable: true
    }]);
  
    var _Header = Header;
    Header = (0, _decoratorsWithStyles2['default'])(_HeaderScss2['default'])(Header) || Header;
    return Header;
  })(_react.Component);
  
  exports['default'] = Header;
  module.exports = exports['default'];

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(46);
      var insertCss = __webpack_require__(17);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(16)();
  // imports
  
  
  // module
  exports.push([module.id, ".Header_header_3bM{padding-top:40px;margin-bottom:40px}.Header_title_YtT{margin:0 auto;max-width:1000px}.Header_brand_1-T{text-decoration:none}.Header_separator_1Qr:after,.Header_separator_1Qr:before{content:\"\\A0\"}.Header_icon_3H0{margin-right:.3em;font-size:1.75rem}", ""]);
  
  // exports
  exports.locals = {
  	"header": "Header_header_3bM",
  	"title": "Header_title_YtT",
  	"brand": "Header_brand_1-T",
  	"separator": "Header_separator_1Qr",
  	"icon": "Header_icon_3H0"
  };

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _this = this;
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _historyLibParsePath = __webpack_require__(43);
  
  var _historyLibParsePath2 = _interopRequireDefault(_historyLibParsePath);
  
  var _coreLocation = __webpack_require__(38);
  
  var _coreLocation2 = _interopRequireDefault(_coreLocation);
  
  function isLeftClickEvent(event) {
    return event.button === 0;
  }
  
  function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
  }
  
  var Link = (function (_Component) {
    _inherits(Link, _Component);
  
    function Link() {
      _classCallCheck(this, Link);
  
      _get(Object.getPrototypeOf(Link.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(Link, [{
      key: 'render',
      value: function render() {
        var _props = this.props;
        var to = _props.to;
        var query = _props.query;
  
        var props = _objectWithoutProperties(_props, ['to', 'query']);
  
        return _react2['default'].createElement('a', _extends({ href: _coreLocation2['default'].createHref(to, query), onClick: Link.handleClick.bind(this) }, props));
      }
    }], [{
      key: 'propTypes',
      value: {
        to: _react.PropTypes.string.isRequired,
        query: _react.PropTypes.object,
        state: _react.PropTypes.object,
        onClick: _react.PropTypes.func
      },
      enumerable: true
    }, {
      key: 'handleClick',
      value: function value(event) {
        var allowTransition = true;
        var clickResult = undefined;
  
        if (_this.props && _this.props.onClick) {
          clickResult = _this.props.onClick(event);
        }
  
        if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
          return;
        }
  
        if (clickResult === false || event.defaultPrevented === true) {
          allowTransition = false;
        }
  
        event.preventDefault();
  
        if (allowTransition) {
          var link = event.currentTarget;
          if (_this.props && _this.props.to) {
            _coreLocation2['default'].push(_extends({}, (0, _historyLibParsePath2['default'])(_this.props.to), {
              state: _this.props && _this.props.state || null
            }));
          } else {
            _coreLocation2['default'].push({
              pathname: link.pathname,
              search: link.search,
              state: _this.props && _this.props.state || null
            });
          }
        }
      },
      enumerable: true
    }]);
  
    return Link;
  })(_react.Component);
  
  exports['default'] = Link;
  module.exports = exports['default'];

/***/ },
/* 48 */
/***/ function(module, exports) {

  module.exports = require("react-fontawesome");

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__.p + "e9c530170ced5eaa9717f3e2ec7c4eab.jpg";

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _PlayerPageScss = __webpack_require__(51);
  
  var _PlayerPageScss2 = _interopRequireDefault(_PlayerPageScss);
  
  var _decoratorsWithStyles = __webpack_require__(21);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _PlayerSummaryPlayerSummary = __webpack_require__(53);
  
  var _PlayerSummaryPlayerSummary2 = _interopRequireDefault(_PlayerSummaryPlayerSummary);
  
  var _FriendsListFriendsList = __webpack_require__(56);
  
  var _FriendsListFriendsList2 = _interopRequireDefault(_FriendsListFriendsList);
  
  var _apiSteam = __webpack_require__(31);
  
  var _apiSteam2 = _interopRequireDefault(_apiSteam);
  
  var _ScreenshotsListScreenshotsList = __webpack_require__(62);
  
  var _ScreenshotsListScreenshotsList2 = _interopRequireDefault(_ScreenshotsListScreenshotsList);
  
  var _Header = __webpack_require__(44);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var PlayerPage = (function (_Component) {
    _inherits(PlayerPage, _Component);
  
    _createClass(PlayerPage, null, [{
      key: 'propTypes',
      value: {
        steamID: _react.PropTypes.string.isRequired,
        username: _react.PropTypes.string.isRequired
      },
      enumerable: true
    }, {
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    function PlayerPage(props, context) {
      _classCallCheck(this, _PlayerPage);
  
      _get(Object.getPrototypeOf(_PlayerPage.prototype), 'constructor', this).call(this, props, context);
      this.state = { screenshots: undefined, title: props.username };
    }
  
    _createClass(PlayerPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(this.state.title);
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        _apiSteam2['default'].getScreenshots(this.props.username).then(this.onScreenshotsLoaded.bind(this))['catch'](this.onScreenshotsLoadError.bind(this));
      }
    }, {
      key: 'onScreenshotsLoaded',
      value: function onScreenshotsLoaded(screenshots) {
        this.setState({ screenshots: screenshots });
      }
    }, {
      key: 'onScreenshotsLoadError',
      value: function onScreenshotsLoadError(response) {
        console.error('failed to load Steam screenshots', response);
      }
    }, {
      key: 'render',
      value: function render() {
        var screenshotsLoaded = typeof this.state.screenshots === 'object';
        return _react2['default'].createElement(
          'div',
          { className: _PlayerPageScss2['default'].container },
          _react2['default'].createElement(_Header2['default'], { title: this.state.title, titleIcon: 'user' }),
          _react2['default'].createElement(
            'div',
            { className: _PlayerPageScss2['default'].row },
            _react2['default'].createElement(
              'div',
              { className: _PlayerPageScss2['default'].left },
              _react2['default'].createElement(_PlayerSummaryPlayerSummary2['default'], { key: this.props.steamID,
                steamID: this.props.steamID
              }),
              screenshotsLoaded ? _react2['default'].createElement(_ScreenshotsListScreenshotsList2['default'], { screenshots: this.state.screenshots,
                steamID: this.props.steamID,
                username: this.props.username
              }) : _react2['default'].createElement(
                'p',
                { className: _PlayerPageScss2['default'].message },
                'Loading screenshots...'
              )
            ),
            _react2['default'].createElement(
              'div',
              { className: _PlayerPageScss2['default'].right },
              _react2['default'].createElement(_FriendsListFriendsList2['default'], { steamID: this.props.steamID })
            )
          )
        );
      }
    }]);
  
    var _PlayerPage = PlayerPage;
    PlayerPage = (0, _decoratorsWithStyles2['default'])(_PlayerPageScss2['default'])(PlayerPage) || PlayerPage;
    return PlayerPage;
  })(_react.Component);
  
  exports['default'] = PlayerPage;
  module.exports = exports['default'];

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(52);
      var insertCss = __webpack_require__(17);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(16)();
  // imports
  
  
  // module
  exports.push([module.id, ".PlayerPage_row_wss{display:table;width:100%}.PlayerPage_left_13w,.PlayerPage_right_twR{display:table-cell;vertical-align:top}.PlayerPage_left_13w{min-width:500px}.PlayerPage_right_twR{min-width:250px}", ""]);
  
  // exports
  exports.locals = {
  	"container": "PlayerPage_container_3D2",
  	"row": "PlayerPage_row_wss",
  	"left": "PlayerPage_left_13w",
  	"right": "PlayerPage_right_twR"
  };

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _PlayerSummaryScss = __webpack_require__(54);
  
  var _PlayerSummaryScss2 = _interopRequireDefault(_PlayerSummaryScss);
  
  var _decoratorsWithStyles = __webpack_require__(21);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _apiSteam = __webpack_require__(31);
  
  var _apiSteam2 = _interopRequireDefault(_apiSteam);
  
  var PlayerSummary = (function (_Component) {
    _inherits(PlayerSummary, _Component);
  
    _createClass(PlayerSummary, null, [{
      key: 'propTypes',
      value: {
        steamID: _react.PropTypes.string.isRequired
      },
      enumerable: true
    }]);
  
    function PlayerSummary(props, context) {
      _classCallCheck(this, _PlayerSummary);
  
      _get(Object.getPrototypeOf(_PlayerSummary.prototype), 'constructor', this).call(this, props, context);
      this.state = { player: undefined };
    }
  
    _createClass(PlayerSummary, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        _apiSteam2['default'].getPlayerSummary(this.props.steamID).then(this.onPlayerSummaryLoaded.bind(this))['catch'](this.onPlayerSummaryLoadError.bind(this));
      }
    }, {
      key: 'onPlayerSummaryLoaded',
      value: function onPlayerSummaryLoaded(player) {
        this.setState({ player: player });
      }
    }, {
      key: 'onPlayerSummaryLoadError',
      value: function onPlayerSummaryLoadError(response) {
        console.error('failed to load player summary', response);
      }
    }, {
      key: 'prettyTime',
      value: function prettyTime(unixTime) {
        var date = new Date(unixTime * 1000);
        return date.toLocaleDateString();
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'div',
          { className: _PlayerSummaryScss2['default'].container },
          typeof this.state.player === 'undefined' ? _react2['default'].createElement(
            'p',
            { className: _PlayerSummaryScss2['default'].message },
            'Loading Steam profile...'
          ) : _react2['default'].createElement(
            'div',
            { className: _PlayerSummaryScss2['default'].card },
            _react2['default'].createElement(
              'div',
              { className: _PlayerSummaryScss2['default'].avatarContainer },
              _react2['default'].createElement(
                'a',
                { href: this.state.player.profileurl, target: '_blank' },
                _react2['default'].createElement('img', { src: this.state.player.avatarmedium,
                  alt: this.state.player.personaname,
                  className: _PlayerSummaryScss2['default'].avatar
                })
              )
            ),
            _react2['default'].createElement(
              'div',
              { className: _PlayerSummaryScss2['default'].main },
              _react2['default'].createElement(
                'h3',
                { className: _PlayerSummaryScss2['default'].name },
                typeof this.state.player.realname === 'string' ? _react2['default'].createElement(
                  'span',
                  null,
                  _react2['default'].createElement(
                    'span',
                    { className: _PlayerSummaryScss2['default'].realName },
                    this.state.player.realname
                  ),
                  _react2['default'].createElement(
                    'span',
                    { className: _PlayerSummaryScss2['default'].screenName },
                    this.state.player.personaname
                  )
                ) : _react2['default'].createElement(
                  'span',
                  null,
                  this.state.player.personaname
                )
              ),
              typeof this.state.player.timecreated === 'number' ? _react2['default'].createElement(
                'span',
                { className: _PlayerSummaryScss2['default'].createdWrapper },
                'Member since',
                _react2['default'].createElement(
                  'time',
                  { className: _PlayerSummaryScss2['default'].created },
                  this.prettyTime(this.state.player.timecreated)
                )
              ) : '',
              typeof this.state.player.lastlogoff === 'number' ? _react2['default'].createElement(
                'span',
                { className: _PlayerSummaryScss2['default'].logoffWrapper },
                'Last logoff',
                _react2['default'].createElement(
                  'time',
                  { className: _PlayerSummaryScss2['default'].logoff },
                  this.prettyTime(this.state.player.lastlogoff)
                )
              ) : ''
            )
          )
        );
      }
    }]);
  
    var _PlayerSummary = PlayerSummary;
    PlayerSummary = (0, _decoratorsWithStyles2['default'])(_PlayerSummaryScss2['default'])(PlayerSummary) || PlayerSummary;
    return PlayerSummary;
  })(_react.Component);
  
  exports['default'] = PlayerSummary;
  module.exports = exports['default'];

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(55);
      var insertCss = __webpack_require__(17);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(16)();
  // imports
  
  
  // module
  exports.push([module.id, ".PlayerSummary_container_5SQ{margin-top:20px}.PlayerSummary_card_2HH{min-width:350px;border:1px solid #0d0c0b;padding:15px;border-radius:2px;display:table;max-width:100%;margin-left:auto;margin-right:auto;background-color:#574e4f}.PlayerSummary_avatarContainer_2bw,.PlayerSummary_main_3sg{display:table-cell;vertical-align:middle}.PlayerSummary_avatarContainer_2bw{width:64px;padding-right:15px}.PlayerSummary_avatar_2ei{width:64px;border:1px solid #0d0c0b;border-radius:2px}.PlayerSummary_name_1bM{color:#ccc3c8;margin:0}.PlayerSummary_screenName_1Sz{opacity:.75;font-size:14px}.PlayerSummary_screenName_1Sz:before{content:\"\\A0(\"}.PlayerSummary_screenName_1Sz:after{content:\")\"}.PlayerSummary_createdWrapper_go2,.PlayerSummary_logoffWrapper_3fO{font-size:13px;color:#ccc3c8}.PlayerSummary_created_36z:before,.PlayerSummary_logoff_1zP:before{content:\"\\A0\"}.PlayerSummary_createdWrapper_go2+.PlayerSummary_logoffWrapper_3fO:before{content:\"\\A0\\B7\\A0\"}", ""]);
  
  // exports
  exports.locals = {
  	"container": "PlayerSummary_container_5SQ",
  	"card": "PlayerSummary_card_2HH",
  	"avatarContainer": "PlayerSummary_avatarContainer_2bw",
  	"main": "PlayerSummary_main_3sg",
  	"avatar": "PlayerSummary_avatar_2ei",
  	"name": "PlayerSummary_name_1bM",
  	"screenName": "PlayerSummary_screenName_1Sz",
  	"createdWrapper": "PlayerSummary_createdWrapper_go2",
  	"logoffWrapper": "PlayerSummary_logoffWrapper_3fO",
  	"created": "PlayerSummary_created_36z",
  	"logoff": "PlayerSummary_logoff_1zP"
  };

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _FriendsListScss = __webpack_require__(57);
  
  var _FriendsListScss2 = _interopRequireDefault(_FriendsListScss);
  
  var _decoratorsWithStyles = __webpack_require__(21);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _apiSteam = __webpack_require__(31);
  
  var _apiSteam2 = _interopRequireDefault(_apiSteam);
  
  var _FriendListItemFriendListItem = __webpack_require__(59);
  
  var _FriendListItemFriendListItem2 = _interopRequireDefault(_FriendListItemFriendListItem);
  
  var FriendsList = (function (_Component) {
    _inherits(FriendsList, _Component);
  
    _createClass(FriendsList, null, [{
      key: 'propTypes',
      value: {
        steamID: _react.PropTypes.string.isRequired
      },
      enumerable: true
    }]);
  
    function FriendsList(props, context) {
      _classCallCheck(this, _FriendsList);
  
      _get(Object.getPrototypeOf(_FriendsList.prototype), 'constructor', this).call(this, props, context);
      this.state = { friends: undefined };
    }
  
    _createClass(FriendsList, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        _apiSteam2['default'].getFriends(this.props.steamID).then(this.onFriendsLoaded.bind(this))['catch'](this.onFriendsLoadError.bind(this));
      }
    }, {
      key: 'onFriendsLoaded',
      value: function onFriendsLoaded(friends) {
        this.setState({ friends: friends });
      }
    }, {
      key: 'onFriendsLoadError',
      value: function onFriendsLoadError(response) {
        console.error('failed to load friends list', response);
      }
    }, {
      key: 'render',
      value: function render() {
        var _this = this;
  
        var friendsLoaded = typeof this.state.friends === 'object';
        var publicFriends = [];
        if (friendsLoaded) {
          publicFriends = this.state.friends.filter(function (friend) {
            return friend.communityvisibilitystate === 3;
          });
        }
        return _react2['default'].createElement(
          'div',
          { className: _FriendsListScss2['default'].container },
          friendsLoaded ? _react2['default'].createElement(
            'ul',
            { className: _FriendsListScss2['default'].friends },
            _react2['default'].createElement(
              'li',
              { className: _FriendsListScss2['default'].header },
              'Friends'
            ),
            publicFriends.map(function (friend) {
              var key = _this.props.steamID + '-' + friend.steamid;
              return _react2['default'].createElement(_FriendListItemFriendListItem2['default'], _extends({ key: key }, friend));
            })
          ) : _react2['default'].createElement(
            'p',
            { className: _FriendsListScss2['default'].message },
            'Loading friends...'
          )
        );
      }
    }]);
  
    var _FriendsList = FriendsList;
    FriendsList = (0, _decoratorsWithStyles2['default'])(_FriendsListScss2['default'])(FriendsList) || FriendsList;
    return FriendsList;
  })(_react.Component);
  
  exports['default'] = FriendsList;
  module.exports = exports['default'];

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(58);
      var insertCss = __webpack_require__(17);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(16)();
  // imports
  
  
  // module
  exports.push([module.id, ".FriendsList_friends_9Ov{padding-left:0;list-style-type:none}.FriendsList_header_2m2{font-weight:700;margin-bottom:10px;color:#9e969b}", ""]);
  
  // exports
  exports.locals = {
  	"friends": "FriendsList_friends_9Ov",
  	"header": "FriendsList_header_2m2"
  };

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _FriendListItemScss = __webpack_require__(60);
  
  var _FriendListItemScss2 = _interopRequireDefault(_FriendListItemScss);
  
  var _decoratorsWithStyles = __webpack_require__(21);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _Link = __webpack_require__(47);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var FriendListItem = (function (_Component) {
    _inherits(FriendListItem, _Component);
  
    _createClass(FriendListItem, null, [{
      key: 'propTypes',
      value: {
        avatar: _react.PropTypes.string,
        avatarfull: _react.PropTypes.string,
        avatarmedium: _react.PropTypes.string.isRequired,
        lastlogoff: _react.PropTypes.number,
        loccityid: _react.PropTypes.number,
        loccountrycode: _react.PropTypes.string,
        locstatecode: _react.PropTypes.string,
        personaname: _react.PropTypes.string,
        personastate: _react.PropTypes.number,
        personastateflags: _react.PropTypes.number,
        primaryclanid: _react.PropTypes.string,
        profilestate: _react.PropTypes.number,
        profileurl: _react.PropTypes.string.isRequired,
        realname: _react.PropTypes.string,
        steamid: _react.PropTypes.string.isRequired,
        timecreated: _react.PropTypes.number
      },
      enumerable: true
    }]);
  
    function FriendListItem(props, context) {
      _classCallCheck(this, _FriendListItem);
  
      _get(Object.getPrototypeOf(_FriendListItem.prototype), 'constructor', this).call(this, props, context);
      this.state = {};
    }
  
    _createClass(FriendListItem, [{
      key: 'render',
      value: function render() {
        var url = '/player/' + this.props.personaname + '/' + this.props.steamid;
        return _react2['default'].createElement(
          'li',
          { className: _FriendListItemScss2['default'].friend },
          _react2['default'].createElement(
            'a',
            { href: url, className: _FriendListItemScss2['default'].link, onClick: _Link2['default'].handleClick },
            _react2['default'].createElement('img', { src: this.props.avatar, className: _FriendListItemScss2['default'].avatar,
              alt: this.props.steamid
            }),
            _react2['default'].createElement(
              'span',
              { className: _FriendListItemScss2['default'].name },
              this.props.personaname
            )
          )
        );
      }
    }]);
  
    var _FriendListItem = FriendListItem;
    FriendListItem = (0, _decoratorsWithStyles2['default'])(_FriendListItemScss2['default'])(FriendListItem) || FriendListItem;
    return FriendListItem;
  })(_react.Component);
  
  exports['default'] = FriendListItem;
  module.exports = exports['default'];

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(61);
      var insertCss = __webpack_require__(17);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(16)();
  // imports
  
  
  // module
  exports.push([module.id, ".FriendListItem_friend_2Y7+.FriendListItem_friend_2Y7{margin-top:5px}.FriendListItem_avatar_3B5{display:inline-block;width:24px;margin-right:5px}.FriendListItem_link_3AZ{display:block}.FriendListItem_name_3KN{line-height:24px;display:inline-block}", ""]);
  
  // exports
  exports.locals = {
  	"friend": "FriendListItem_friend_2Y7",
  	"avatar": "FriendListItem_avatar_3B5",
  	"link": "FriendListItem_link_3AZ",
  	"name": "FriendListItem_name_3KN"
  };

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ScreenshotsListScss = __webpack_require__(63);
  
  var _ScreenshotsListScss2 = _interopRequireDefault(_ScreenshotsListScss);
  
  var _decoratorsWithStyles = __webpack_require__(21);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _ScreenshotListItemScreenshotListItem = __webpack_require__(65);
  
  var _ScreenshotListItemScreenshotListItem2 = _interopRequireDefault(_ScreenshotListItemScreenshotListItem);
  
  var ScreenshotsList = (function (_Component) {
    _inherits(ScreenshotsList, _Component);
  
    _createClass(ScreenshotsList, null, [{
      key: 'propTypes',
      value: {
        screenshots: _react.PropTypes.array.isRequired,
        steamID: _react.PropTypes.string.isRequired,
        username: _react.PropTypes.string.isRequired
      },
      enumerable: true
    }]);
  
    function ScreenshotsList(props, context) {
      _classCallCheck(this, _ScreenshotsList);
  
      _get(Object.getPrototypeOf(_ScreenshotsList.prototype), 'constructor', this).call(this, props, context);
      this.state = {};
    }
  
    _createClass(ScreenshotsList, [{
      key: 'render',
      value: function render() {
        var _this = this;
  
        var message = 'Choose a screenshot:';
        if (this.props.screenshots.length < 1) {
          message = 'This user does not have any screenshots.';
        }
        return _react2['default'].createElement(
          'ul',
          { className: _ScreenshotsListScss2['default'].screenshots },
          _react2['default'].createElement(
            'li',
            null,
            _react2['default'].createElement(
              'h3',
              { className: _ScreenshotsListScss2['default'].intro },
              message
            )
          ),
          this.props.screenshots.map(function (screenshot) {
            return _react2['default'].createElement(_ScreenshotListItemScreenshotListItem2['default'], _extends({ key: screenshot.url }, screenshot, {
              steamID: _this.props.steamID,
              username: _this.props.username
            }));
          })
        );
      }
    }]);
  
    var _ScreenshotsList = ScreenshotsList;
    ScreenshotsList = (0, _decoratorsWithStyles2['default'])(_ScreenshotsListScss2['default'])(ScreenshotsList) || ScreenshotsList;
    return ScreenshotsList;
  })(_react.Component);
  
  exports['default'] = ScreenshotsList;
  module.exports = exports['default'];

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(64);
      var insertCss = __webpack_require__(17);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(16)();
  // imports
  
  
  // module
  exports.push([module.id, ".ScreenshotsList_screenshots_7e4{list-style:none;margin-left:0}.ScreenshotsList_intro_3mD{margin-bottom:10px;font-weight:700;color:#9e969b}", ""]);
  
  // exports
  exports.locals = {
  	"screenshots": "ScreenshotsList_screenshots_7e4",
  	"intro": "ScreenshotsList_intro_3mD"
  };

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ScreenshotListItemScss = __webpack_require__(66);
  
  var _ScreenshotListItemScss2 = _interopRequireDefault(_ScreenshotListItemScss);
  
  var _decoratorsWithStyles = __webpack_require__(21);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _Link = __webpack_require__(47);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var ScreenshotListItem = (function (_Component) {
    _inherits(ScreenshotListItem, _Component);
  
    _createClass(ScreenshotListItem, null, [{
      key: 'propTypes',
      value: {
        url: _react.PropTypes.string.isRequired,
        title: _react.PropTypes.string,
        steamID: _react.PropTypes.string.isRequired,
        username: _react.PropTypes.string.isRequired
      },
      enumerable: true
    }]);
  
    function ScreenshotListItem(props, context) {
      _classCallCheck(this, _ScreenshotListItem);
  
      _get(Object.getPrototypeOf(_ScreenshotListItem.prototype), 'constructor', this).call(this, props, context);
      this.state = {};
    }
  
    _createClass(ScreenshotListItem, [{
      key: 'getIDFromUrl',
      value: function getIDFromUrl() {
        var prefix = 'id=';
        var index = this.props.url.indexOf(prefix);
        return this.props.url.slice(index + prefix.length);
      }
    }, {
      key: 'render',
      value: function render() {
        var id = this.getIDFromUrl();
        var href = '/player/' + this.props.username + '/' + this.props.steamID + '/' + id;
        return _react2['default'].createElement(
          'li',
          { className: _ScreenshotListItemScss2['default'].screenshot },
          _react2['default'].createElement(
            'a',
            { href: href, onClick: _Link2['default'].handleClick },
            typeof this.props.title === 'string' ? _react2['default'].createElement(
              'span',
              { className: _ScreenshotListItemScss2['default'].title },
              '“',
              this.props.title,
              '”'
            ) : _react2['default'].createElement(
              'span',
              null,
              'Untitled ',
              id
            )
          )
        );
      }
    }]);
  
    var _ScreenshotListItem = ScreenshotListItem;
    ScreenshotListItem = (0, _decoratorsWithStyles2['default'])(_ScreenshotListItemScss2['default'])(ScreenshotListItem) || ScreenshotListItem;
    return ScreenshotListItem;
  })(_react.Component);
  
  exports['default'] = ScreenshotListItem;
  module.exports = exports['default'];

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(67);
      var insertCss = __webpack_require__(17);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(16)();
  // imports
  
  
  // module
  exports.push([module.id, "", ""]);
  
  // exports
  exports.locals = {
  	"screenshot": "ScreenshotListItem_screenshot_3nm"
  };

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ScreenshotPageScss = __webpack_require__(69);
  
  var _ScreenshotPageScss2 = _interopRequireDefault(_ScreenshotPageScss);
  
  var _decoratorsWithStyles = __webpack_require__(21);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _classnames = __webpack_require__(37);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _apiSteam = __webpack_require__(31);
  
  var _apiSteam2 = _interopRequireDefault(_apiSteam);
  
  var _Header = __webpack_require__(44);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var _apiColors = __webpack_require__(71);
  
  var _apiColors2 = _interopRequireDefault(_apiColors);
  
  var _Palette = __webpack_require__(72);
  
  var _Palette2 = _interopRequireDefault(_Palette);
  
  var _reactFontawesome = __webpack_require__(48);
  
  var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);
  
  var ScreenshotPage = (function (_Component) {
    _inherits(ScreenshotPage, _Component);
  
    _createClass(ScreenshotPage, null, [{
      key: 'propTypes',
      value: {
        steamID: _react.PropTypes.string.isRequired,
        username: _react.PropTypes.string.isRequired,
        screenshotID: _react.PropTypes.string.isRequired
      },
      enumerable: true
    }, {
      key: 'contextTypes',
      value: {
        onSetTitle: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);
  
    function ScreenshotPage(props, context) {
      _classCallCheck(this, _ScreenshotPage);
  
      _get(Object.getPrototypeOf(_ScreenshotPage.prototype), 'constructor', this).call(this, props, context);
      this.state = {
        screenshot: undefined,
        title: 'Screenshot ' + props.screenshotID,
        colors: undefined
      };
    }
  
    _createClass(ScreenshotPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(this.state.title);
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        _apiSteam2['default'].getScreenshot(this.props.screenshotID).then(this.onScreenshotLoaded.bind(this))['catch'](this.onScreenshotLoadError.bind(this));
      }
    }, {
      key: 'onScreenshotLoaded',
      value: function onScreenshotLoaded(screenshot) {
        var _this = this;
  
        this.setState({ screenshot: screenshot }, function () {
          _this.updateTitle();
        });
        _apiColors2['default'].getColors(screenshot.mediumUrl).then(this.onColorsLoaded.bind(this))['catch'](this.onColorsLoadError.bind(this));
      }
    }, {
      key: 'onScreenshotLoadError',
      value: function onScreenshotLoadError(response) {
        console.error('failed to load Steam screenshot', response);
      }
    }, {
      key: 'onColorsLoaded',
      value: function onColorsLoaded(colors) {
        this.setState({ colors: colors });
      }
    }, {
      key: 'onColorsLoadError',
      value: function onColorsLoadError(response) {
        console.error('failed to load colors from image', response);
      }
    }, {
      key: 'updateTitle',
      value: function updateTitle() {
        var description = this.state.screenshot.description;
        if (typeof description === 'string' && description.length > 0) {
          this.setState({ title: description });
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var alt = 'Screenshot ' + this.props.screenshotID;
        var isScreenshotLoaded = typeof this.state.screenshot === 'object';
        var date = '';
        if (isScreenshotLoaded && this.state.screenshot.date) {
          date = this.state.screenshot.date.toLocaleDateString();
        }
        var backTitle = this.props.username;
        var backUrl = '/player/' + this.props.username + '/' + this.props.steamID;
        var areColorsLoaded = typeof this.state.colors === 'object';
        return _react2['default'].createElement(
          'div',
          { className: _ScreenshotPageScss2['default'].container },
          _react2['default'].createElement(_Header2['default'], { title: this.state.title, previousUrl: backUrl,
            previousTitle: backTitle,
            previousIcon: 'user'
          }),
          isScreenshotLoaded ? _react2['default'].createElement(
            'div',
            { className: _ScreenshotPageScss2['default'].details },
            _react2['default'].createElement(
              'div',
              { className: _ScreenshotPageScss2['default'].left },
              _react2['default'].createElement(
                'a',
                { href: this.state.screenshot.fullSizeUrl, target: '_blank',
                  className: _ScreenshotPageScss2['default'].screenshotLink
                },
                _react2['default'].createElement('img', { src: this.state.screenshot.mediumUrl,
                  alt: alt,
                  className: _ScreenshotPageScss2['default'].screenshot
                })
              ),
              _react2['default'].createElement(
                'a',
                { href: this.state.screenshot.url, target: '_blank',
                  className: _ScreenshotPageScss2['default'].detailsUrl
                },
                _react2['default'].createElement(_reactFontawesome2['default'], { name: 'info',
                  className: (0, _classnames2['default'])(_ScreenshotPageScss2['default'].icon, _ScreenshotPageScss2['default'].detailsIcon)
                }),
                'View details'
              ),
              _react2['default'].createElement(
                'a',
                { href: this.state.screenshot.fullSizeUrl, target: '_blank',
                  className: _ScreenshotPageScss2['default'].fullSizeLink
                },
                _react2['default'].createElement(_reactFontawesome2['default'], { name: 'search-plus',
                  className: (0, _classnames2['default'])(_ScreenshotPageScss2['default'].icon, _ScreenshotPageScss2['default'].fullSizeIcon)
                }),
                'View full size'
              ),
              _react2['default'].createElement(
                'a',
                { className: _ScreenshotPageScss2['default'].authorLink, href: this.state.screenshot.userUrl,
                  target: '_blank'
                },
                _react2['default'].createElement(_reactFontawesome2['default'], { name: 'steam',
                  className: (0, _classnames2['default'])(_ScreenshotPageScss2['default'].icon, _ScreenshotPageScss2['default'].profileIcon)
                }),
                'View ',
                this.props.username,
                '\'s profile'
              ),
              _react2['default'].createElement(
                'ul',
                { className: _ScreenshotPageScss2['default'].metadata },
                _react2['default'].createElement(
                  'li',
                  null,
                  date
                ),
                _react2['default'].createElement(
                  'li',
                  null,
                  this.state.screenshot.width,
                  ' × ',
                  this.state.screenshot.height
                ),
                _react2['default'].createElement(
                  'li',
                  null,
                  this.state.screenshot.fileSize
                )
              )
            ),
            _react2['default'].createElement(
              'div',
              { className: _ScreenshotPageScss2['default'].right },
              areColorsLoaded ? _react2['default'].createElement(_Palette2['default'], { colors: this.state.colors }) : _react2['default'].createElement(
                'p',
                { className: _ScreenshotPageScss2['default'].colorsMessage },
                'Loading colors...'
              )
            )
          ) : _react2['default'].createElement(
            'p',
            { className: _ScreenshotPageScss2['default'].message },
            'Loading screenshot...'
          )
        );
      }
    }]);
  
    var _ScreenshotPage = ScreenshotPage;
    ScreenshotPage = (0, _decoratorsWithStyles2['default'])(_ScreenshotPageScss2['default'])(ScreenshotPage) || ScreenshotPage;
    return ScreenshotPage;
  })(_react.Component);
  
  exports['default'] = ScreenshotPage;
  module.exports = exports['default'];

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(70);
      var insertCss = __webpack_require__(17);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(16)();
  // imports
  
  
  // module
  exports.push([module.id, ".ScreenshotPage_details_2bS{display:table;width:100%}.ScreenshotPage_left_2eX,.ScreenshotPage_right_21z{display:table-cell;vertical-align:top}.ScreenshotPage_left_2eX{text-align:center}.ScreenshotPage_screenshotLink_3rs{margin:0 0 20px}.ScreenshotPage_screenshot_1Ek{max-width:100%;display:block;border:1px solid #000}.ScreenshotPage_description_3-p{margin:0 0 20px}.ScreenshotPage_right_21z{padding-left:40px;max-width:600px}.ScreenshotPage_colorsMessage_2MN{margin-bottom:20px}.ScreenshotPage_metadata_1CM{margin:5px 0 0;white-space:nowrap;padding-left:0;list-style:none}.ScreenshotPage_metadata_1CM li{display:inline-block}.ScreenshotPage_metadata_1CM li+li:before{content:\"\\A0\\B7\\A0\"}.ScreenshotPage_authorLink_2ME,.ScreenshotPage_detailsUrl_3O_,.ScreenshotPage_fullSizeLink_26o{margin-top:20px;display:inline-block}.ScreenshotPage_detailsUrl_3O_:after,.ScreenshotPage_fullSizeLink_26o:after{color:#8b8086;content:\"\\B7\";margin-left:.75em;margin-right:.75em}@media (min-width:768px){.ScreenshotPage_right_21z{min-width:370px}}.ScreenshotPage_icon_3uB{margin-right:.5em;font-size:14px}", ""]);
  
  // exports
  exports.locals = {
  	"container": "ScreenshotPage_container_1ix",
  	"details": "ScreenshotPage_details_2bS",
  	"left": "ScreenshotPage_left_2eX",
  	"right": "ScreenshotPage_right_21z",
  	"screenshotLink": "ScreenshotPage_screenshotLink_3rs",
  	"screenshot": "ScreenshotPage_screenshot_1Ek",
  	"description": "ScreenshotPage_description_3-p",
  	"colorsMessage": "ScreenshotPage_colorsMessage_2MN",
  	"metadata": "ScreenshotPage_metadata_1CM",
  	"authorLink": "ScreenshotPage_authorLink_2ME",
  	"fullSizeLink": "ScreenshotPage_fullSizeLink_26o",
  	"detailsUrl": "ScreenshotPage_detailsUrl_3O_",
  	"message": "ScreenshotPage_message_1kw",
  	"icon": "ScreenshotPage_icon_3uB",
  	"profileIcon": "ScreenshotPage_profileIcon_5Dv",
  	"detailsIcon": "ScreenshotPage_detailsIcon_Bml",
  	"fullSizeIcon": "ScreenshotPage_fullSizeIcon_2Di"
  };

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _api = __webpack_require__(32);
  
  var _api2 = _interopRequireDefault(_api);
  
  var Colors = (function (_Api) {
    _inherits(Colors, _Api);
  
    function Colors() {
      _classCallCheck(this, Colors);
  
      _get(Object.getPrototypeOf(Colors.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(Colors, null, [{
      key: 'getColors',
      value: function getColors(imageUrl) {
        var data;
        return regeneratorRuntime.async(function getColors$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              context$2$0.next = 2;
              return regeneratorRuntime.awrap(this.makeRequest('/api/colors?url=' + encodeURIComponent(imageUrl) + '&format=json'));
  
            case 2:
              data = context$2$0.sent;
              return context$2$0.abrupt('return', data);
  
            case 4:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }]);
  
    return Colors;
  })(_api2['default']);
  
  exports['default'] = Colors;
  module.exports = exports['default'];

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _PaletteScss = __webpack_require__(73);
  
  var _PaletteScss2 = _interopRequireDefault(_PaletteScss);
  
  var _decoratorsWithStyles = __webpack_require__(21);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _Swatch = __webpack_require__(75);
  
  var _Swatch2 = _interopRequireDefault(_Swatch);
  
  var _tinycolor2 = __webpack_require__(78);
  
  var _tinycolor22 = _interopRequireDefault(_tinycolor2);
  
  var _reactFontawesome = __webpack_require__(48);
  
  var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);
  
  var Palette = (function (_Component) {
    _inherits(Palette, _Component);
  
    _createClass(Palette, null, [{
      key: 'propTypes',
      value: {
        colors: _react.PropTypes.array.isRequired
      },
      enumerable: true
    }]);
  
    function Palette(props, context) {
      _classCallCheck(this, _Palette);
  
      _get(Object.getPrototypeOf(_Palette.prototype), 'constructor', this).call(this, props, context);
      this.state = { selectedColors: [] };
    }
  
    _createClass(Palette, [{
      key: 'onColorSelected',
      value: function onColorSelected(color) {
        var colors = this.state.selectedColors.slice();
        if (colors.indexOf(color) < 0) {
          colors.push(color);
        }
        this.setState({ selectedColors: colors });
      }
    }, {
      key: 'onColorDeselected',
      value: function onColorDeselected(color) {
        var index = this.state.selectedColors.indexOf(color);
        var head = this.state.selectedColors.slice(0, index);
        var tail = this.state.selectedColors.slice(index + 1, this.state.selectedColors.length);
        var colors = head.concat(tail);
        this.setState({ selectedColors: colors });
      }
    }, {
      key: 'getAllColors',
      value: function getAllColors() {
        var hexColors = [];
        for (var i = 0; i < this.props.colors.length; i++) {
          hexColors.push(this.props.colors[i]);
          var color = (0, _tinycolor22['default'])(this.props.colors[i]);
          this.addVariation(hexColors, color, 'analogous');
          this.addVariation(hexColors, color, 'monochromatic');
        }
        var uniqueColors = this.uniq(hexColors);
        uniqueColors.sort(this.colorSorter.bind(this));
        return uniqueColors;
      }
  
      // See 'Step sorting' on http://www.alanzucconi.com/2015/09/30/colour-sorting/
    }, {
      key: 'colorSorter',
      value: function colorSorter(aStr, bStr) {
        var colorA = (0, _tinycolor22['default'])(aStr);
        var colorB = (0, _tinycolor22['default'])(bStr);
        var lumA = colorA.getLuminance();
        var lumB = colorB.getLuminance();
        var hsvA = colorA.toHsv();
        var hsvB = colorB.toHsv();
        var repetitions = 8;
        var h2A = Math.round(hsvA.h * repetitions);
        var h2B = Math.round(hsvB.h * repetitions);
        var lum2A = Math.round(lumA * repetitions);
        var lum2B = Math.round(lumB * repetitions);
        var v2A = Math.round(hsvA.v * repetitions);
        var v2B = Math.round(hsvB.v * repetitions);
        if (h2A % 2 === 1) {
          v2A = repetitions - v2A;
          lum2A = repetitions - lum2A;
        }
        if (h2B % 2 === 1) {
          v2B = repetitions - v2B;
          lum2B = repetitions - lum2B;
        }
        if (h2A < h2B) {
          return -1;
        }
        if (h2A > h2B) {
          return 1;
        }
        if (lum2A < lum2B) {
          return -1;
        }
        if (lum2A > lum2B) {
          return 1;
        }
        if (v2A < v2B) {
          return -1;
        }
        if (v2A > v2B) {
          return 1;
        }
        return 0;
      }
    }, {
      key: 'addVariation',
      value: function addVariation(list, color, funcName) {
        var variations = color[funcName]();
        for (var j = 0; j < variations.length; j++) {
          list.push(variations[j].toHexString());
        }
      }
    }, {
      key: 'uniq',
      value: function uniq(arr) {
        var set = new Set(arr);
        return Array.from(set);
      }
    }, {
      key: 'sample',
      value: function sample(list, total) {
        var results = [];
        while (results.length < total) {
          results.push(list[Math.floor(Math.random() * list.length)]);
        }
        return results;
      }
    }, {
      key: 'hashStripper',
      value: function hashStripper(c) {
        return c.replace(/^#/, '');
      }
    }, {
      key: 'setLinkToNewPaletteLink',
      value: function setLinkToNewPaletteLink(event, colors) {
        var link = event.target;
        if (link.nodeName !== 'A') {
          link = link.closest('a');
        }
        link.href = 'http://www.colourlovers.com/palettes/add?colors=' + colors.map(this.hashStripper).join(',');
        link.blur();
      }
    }, {
      key: 'createPalette',
      value: function createPalette(event) {
        this.setLinkToNewPaletteLink(event, this.state.selectedColors.slice());
      }
    }, {
      key: 'createRandomPalette',
      value: function createRandomPalette(allColors, event) {
        this.setLinkToNewPaletteLink(event, this.sample(allColors, 5));
      }
    }, {
      key: 'render',
      value: function render() {
        var _this = this;
  
        var hexColors = this.getAllColors();
        return _react2['default'].createElement(
          'div',
          { className: _PaletteScss2['default'].container },
          this.state.selectedColors.length > 0 ? _react2['default'].createElement(
            'div',
            { className: _PaletteScss2['default'].selectedColorsWrapper },
            _react2['default'].createElement(
              'a',
              { href: '#', onClick: this.createPalette.bind(this),
                target: '_blank'
              },
              _react2['default'].createElement(_reactFontawesome2['default'], { name: 'external-link', className: _PaletteScss2['default'].linkIcon }),
              'Create palette'
            ),
            _react2['default'].createElement(
              'ul',
              { className: _PaletteScss2['default'].selectedColors },
              this.state.selectedColors.map(function (hex) {
                var key = 'selected-' + hex;
                return _react2['default'].createElement(
                  'li',
                  { key: key, className: _PaletteScss2['default'].listItem },
                  _react2['default'].createElement(_Swatch2['default'], { hexColor: hex,
                    allowSelection: false,
                    onDeselected: _this.onColorDeselected.bind(_this),
                    initiallySelected: true
                  })
                );
              })
            )
          ) : '',
          _react2['default'].createElement(
            'a',
            { href: '#', onClick: this.createRandomPalette.bind(this, hexColors),
              target: '_blank'
            },
            _react2['default'].createElement(_reactFontawesome2['default'], { name: 'external-link', className: _PaletteScss2['default'].linkIcon }),
            'Create random palette'
          ),
          _react2['default'].createElement(
            'ul',
            { className: _PaletteScss2['default'].colors },
            hexColors.map(function (hex) {
              var allowSelection = _this.state.selectedColors.length < 5;
              var initiallySelected = _this.state.selectedColors.indexOf(hex) > -1;
              var key = hex + '-' + allowSelection + '-' + initiallySelected;
              return _react2['default'].createElement(
                'li',
                { key: key, className: _PaletteScss2['default'].listItem },
                _react2['default'].createElement(_Swatch2['default'], { hexColor: hex,
                  onSelected: _this.onColorSelected.bind(_this),
                  onDeselected: _this.onColorDeselected.bind(_this),
                  allowSelection: allowSelection,
                  initiallySelected: initiallySelected
                })
              );
            })
          )
        );
      }
    }]);
  
    var _Palette = Palette;
    Palette = (0, _decoratorsWithStyles2['default'])(_PaletteScss2['default'])(Palette) || Palette;
    return Palette;
  })(_react.Component);
  
  exports['default'] = Palette;
  module.exports = exports['default'];

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(74);
      var insertCss = __webpack_require__(17);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(16)();
  // imports
  
  
  // module
  exports.push([module.id, ".Palette_container_1Ha{margin-bottom:20px}.Palette_colors_jGR,.Palette_selectedColors_1qk{list-style:none;padding-left:0}.Palette_colors_jGR li,.Palette_selectedColors_1qk li{display:inline-block;line-height:1}.Palette_selectedColors_1qk{margin-bottom:20px}.Palette_title_2zJ{margin:0 0 5px;font-weight:700;text-align:center;letter-spacing:.05em}.Palette_linkIcon_2U5{margin-right:.5em;font-size:14px}", ""]);
  
  // exports
  exports.locals = {
  	"container": "Palette_container_1Ha",
  	"colors": "Palette_colors_jGR",
  	"selectedColors": "Palette_selectedColors_1qk",
  	"title": "Palette_title_2zJ",
  	"linkIcon": "Palette_linkIcon_2U5"
  };

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _SwatchScss = __webpack_require__(76);
  
  var _SwatchScss2 = _interopRequireDefault(_SwatchScss);
  
  var _classnames = __webpack_require__(37);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _decoratorsWithStyles = __webpack_require__(21);
  
  var _decoratorsWithStyles2 = _interopRequireDefault(_decoratorsWithStyles);
  
  var _tinycolor2 = __webpack_require__(78);
  
  var _tinycolor22 = _interopRequireDefault(_tinycolor2);
  
  var Swatch = (function (_Component) {
    _inherits(Swatch, _Component);
  
    _createClass(Swatch, null, [{
      key: 'propTypes',
      value: {
        hexColor: _react.PropTypes.string.isRequired,
        onSelected: _react.PropTypes.func,
        onDeselected: _react.PropTypes.func,
        allowSelection: _react.PropTypes.bool.isRequired,
        initiallySelected: _react.PropTypes.bool.isRequired
      },
      enumerable: true
    }]);
  
    function Swatch(props, context) {
      _classCallCheck(this, _Swatch);
  
      _get(Object.getPrototypeOf(_Swatch.prototype), 'constructor', this).call(this, props, context);
      this.state = { selected: props.initiallySelected };
    }
  
    _createClass(Swatch, [{
      key: 'propagateSelected',
      value: function propagateSelected() {
        if (this.state.selected) {
          this.props.onSelected(this.props.hexColor);
        } else {
          this.props.onDeselected(this.props.hexColor);
        }
      }
    }, {
      key: 'toggleSelected',
      value: function toggleSelected(event) {
        event.preventDefault();
        this.setState({ selected: !this.state.selected }, this.propagateSelected.bind(this));
      }
    }, {
      key: 'deselect',
      value: function deselect(event) {
        event.preventDefault();
        this.setState({ selected: false }, this.propagateSelected.bind(this));
      }
    }, {
      key: 'render',
      value: function render() {
        var swatchStyle = { backgroundColor: this.props.hexColor };
        var selectedClass = this.state.selected ? _SwatchScss2['default'].selected : _SwatchScss2['default'].unselected;
        var isDark = (0, _tinycolor22['default'])(this.props.hexColor).isDark();
        var darknessClass = isDark ? _SwatchScss2['default'].dark : _SwatchScss2['default'].light;
        return _react2['default'].createElement(
          'span',
          { className: _SwatchScss2['default'].container },
          this.props.allowSelection ? _react2['default'].createElement('a', { href: '#',
            className: (0, _classnames2['default'])(_SwatchScss2['default'].swatch, _SwatchScss2['default'].link, selectedClass, darknessClass),
            style: swatchStyle,
            title: this.props.hexColor,
            onClick: this.toggleSelected.bind(this)
          }) : _react2['default'].createElement(
            'span',
            { className: _SwatchScss2['default'].disallowSelection },
            this.state.selected ? _react2['default'].createElement('a', { href: '#',
              className: (0, _classnames2['default'])(_SwatchScss2['default'].swatch, _SwatchScss2['default'].link, selectedClass, darknessClass),
              style: swatchStyle,
              title: this.props.hexColor,
              onClick: this.deselect.bind(this)
            }) : _react2['default'].createElement('span', {
              className: (0, _classnames2['default'])(_SwatchScss2['default'].swatch, selectedClass, darknessClass),
              style: swatchStyle,
              title: this.props.hexColor
            })
          )
        );
      }
    }]);
  
    var _Swatch = Swatch;
    Swatch = (0, _decoratorsWithStyles2['default'])(_SwatchScss2['default'])(Swatch) || Swatch;
    return Swatch;
  })(_react.Component);
  
  exports['default'] = Swatch;
  module.exports = exports['default'];

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(77);
      var insertCss = __webpack_require__(17);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(16)();
  // imports
  
  
  // module
  exports.push([module.id, ".Swatch_swatch_3nj{display:inline-block;padding:2px 4px;border-radius:2px;width:20px;height:20px;text-align:center;margin:2px 5px;position:relative;border-width:1px;border-style:solid;box-shadow:1px 1px 3px 0 #000}.Swatch_swatch_3nj.Swatch_link_3Ji:focus,.Swatch_swatch_3nj.Swatch_link_3Ji:hover,.Swatch_swatch_3nj.Swatch_selected_kJg{border-color:hsla(0,0%,100%,.7)}.Swatch_swatch_3nj.Swatch_link_3Ji:focus:after,.Swatch_swatch_3nj.Swatch_link_3Ji:hover:after,.Swatch_swatch_3nj.Swatch_selected_kJg:after{content:\"x\";position:absolute;left:5px;top:1px}.Swatch_swatch_3nj.Swatch_unselected_1Wl{border-color:hsla(0,0%,100%,.3)}.Swatch_swatch_3nj.Swatch_dark_1H7:after{color:#fff}.Swatch_swatch_3nj.Swatch_light_2i7:after{color:#000}", ""]);
  
  // exports
  exports.locals = {
  	"swatch": "Swatch_swatch_3nj",
  	"selected": "Swatch_selected_kJg",
  	"link": "Swatch_link_3Ji",
  	"unselected": "Swatch_unselected_1Wl",
  	"dark": "Swatch_dark_1H7",
  	"light": "Swatch_light_2i7",
  	"container": "Swatch_container_2L5"
  };

/***/ },
/* 78 */
/***/ function(module, exports) {

  module.exports = require("tinycolor2");

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = __webpack_require__(4);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _config = __webpack_require__(35);
  
  var Html = (function (_Component) {
    _inherits(Html, _Component);
  
    function Html() {
      _classCallCheck(this, Html);
  
      _get(Object.getPrototypeOf(Html.prototype), 'constructor', this).apply(this, arguments);
    }
  
    _createClass(Html, [{
      key: 'trackingCode',
      value: function trackingCode() {
        return { __html: '(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=' + 'function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;' + 'e=o.createElement(i);r=o.getElementsByTagName(i)[0];' + 'e.src=\'https://www.google-analytics.com/analytics.js\';' + 'r.parentNode.insertBefore(e,r)}(window,document,\'script\',\'ga\'));' + ('ga(\'create\',\'' + _config.googleAnalyticsId + '\',\'auto\');ga(\'send\',\'pageview\');')
        };
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          'html',
          { className: 'no-js', lang: '' },
          _react2['default'].createElement(
            'head',
            null,
            _react2['default'].createElement('meta', { charSet: 'utf-8' }),
            _react2['default'].createElement('meta', { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' }),
            _react2['default'].createElement(
              'title',
              null,
              this.props.title
            ),
            _react2['default'].createElement('meta', { name: 'description', content: this.props.description }),
            _react2['default'].createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
            _react2['default'].createElement('link', { rel: 'apple-touch-icon', href: 'apple-touch-icon.png' }),
            _react2['default'].createElement('link', { href: 'https://fonts.googleapis.com/css?family=Arimo:400,700', rel: 'stylesheet', type: 'text/css' }),
            _react2['default'].createElement('link', { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css' }),
            _react2['default'].createElement('style', { id: 'css', dangerouslySetInnerHTML: { __html: this.props.css } })
          ),
          _react2['default'].createElement(
            'body',
            null,
            _react2['default'].createElement('div', { id: 'app', dangerouslySetInnerHTML: { __html: this.props.body } }),
            _react2['default'].createElement('script', { src: this.props.entry }),
            _react2['default'].createElement('script', { dangerouslySetInnerHTML: this.trackingCode() })
          )
        );
      }
    }], [{
      key: 'propTypes',
      value: {
        title: _react.PropTypes.string,
        description: _react.PropTypes.string,
        css: _react.PropTypes.string,
        body: _react.PropTypes.string.isRequired,
        entry: _react.PropTypes.string.isRequired
      },
      enumerable: true
    }, {
      key: 'defaultProps',
      value: {
        title: '',
        description: ''
      },
      enumerable: true
    }]);
  
    return Html;
  })(_react.Component);
  
  exports['default'] = Html;
  module.exports = exports['default'];

/***/ },
/* 80 */
/***/ function(module, exports) {

  module.exports = require("./assets");

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _coreFetch = __webpack_require__(33);
  
  var _coreFetch2 = _interopRequireDefault(_coreFetch);
  
  var _jsdom = __webpack_require__(82);
  
  var _jsdom2 = _interopRequireDefault(_jsdom);
  
  var _bluebird = __webpack_require__(83);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var ScreenshotsScraper = (function () {
    function ScreenshotsScraper(username) {
      _classCallCheck(this, ScreenshotsScraper);
  
      this.username = username;
    }
  
    _createClass(ScreenshotsScraper, [{
      key: 'getPage',
      value: function getPage() {
        var url, response, data;
        return regeneratorRuntime.async(function getPage$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              url = 'http://steamcommunity.com/id/' + this.username + '/screenshots/?appid=0&sort=newestfirst&' + 'browsefilter=myfiles&view=grid';
              context$2$0.next = 3;
              return regeneratorRuntime.awrap((0, _coreFetch2['default'])(url));
  
            case 3:
              response = context$2$0.sent;
              context$2$0.next = 6;
              return regeneratorRuntime.awrap(response.text());
  
            case 6:
              data = context$2$0.sent;
              return context$2$0.abrupt('return', data);
  
            case 8:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }, {
      key: 'getScreenshots',
      value: function getScreenshots(html) {
        var _this = this;
  
        return new _bluebird2['default'](function (resolve, reject) {
          _jsdom2['default'].env({
            html: html,
            done: _this.scrapeDom.bind(_this, resolve, reject)
          });
        });
      }
    }, {
      key: 'scrapeDom',
      value: function scrapeDom(resolve, reject, err, window) {
        var selector = '#image_wall .imageWallRow .profile_media_item';
        var links = window.document.querySelectorAll(selector);
        var screenshots = [];
        for (var i = 0; i < links.length; i++) {
          screenshots.push(this.getScreenshotFromLink(links[i]));
        }
        resolve(screenshots);
      }
    }, {
      key: 'getScreenshotFromLink',
      value: function getScreenshotFromLink(link) {
        var href = link.getAttribute('href');
        var descEl = link.querySelector('.imgWallHoverDescription');
        var title = undefined;
        if (descEl) {
          var ellipsis = descEl.querySelector('.ellipsis');
          if (ellipsis) {
            title = ellipsis.innerHTML;
          }
        }
        return {
          url: href,
          title: title
        };
      }
    }]);
  
    return ScreenshotsScraper;
  })();
  
  exports['default'] = ScreenshotsScraper;
  module.exports = exports['default'];

/***/ },
/* 82 */
/***/ function(module, exports) {

  module.exports = require("jsdom");

/***/ },
/* 83 */
/***/ function(module, exports) {

  module.exports = require("bluebird");

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _coreFetch = __webpack_require__(33);
  
  var _coreFetch2 = _interopRequireDefault(_coreFetch);
  
  var _jsdom = __webpack_require__(82);
  
  var _jsdom2 = _interopRequireDefault(_jsdom);
  
  var _bluebird = __webpack_require__(83);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var ScreenshotScraper = (function () {
    function ScreenshotScraper(id) {
      _classCallCheck(this, ScreenshotScraper);
  
      this.id = id;
      this.url = 'http://steamcommunity.com/sharedfiles/filedetails/?id=' + this.id;
    }
  
    _createClass(ScreenshotScraper, [{
      key: 'getPage',
      value: function getPage() {
        var response, data;
        return regeneratorRuntime.async(function getPage$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              context$2$0.next = 2;
              return regeneratorRuntime.awrap((0, _coreFetch2['default'])(this.url));
  
            case 2:
              response = context$2$0.sent;
              context$2$0.next = 5;
              return regeneratorRuntime.awrap(response.text());
  
            case 5:
              data = context$2$0.sent;
              return context$2$0.abrupt('return', data);
  
            case 7:
            case 'end':
              return context$2$0.stop();
          }
        }, null, this);
      }
    }, {
      key: 'getScreenshot',
      value: function getScreenshot(html) {
        var _this = this;
  
        return new _bluebird2['default'](function (resolve, reject) {
          _jsdom2['default'].env({
            html: html,
            done: _this.scrapeDom.bind(_this, resolve, reject)
          });
        });
      }
    }, {
      key: 'scrapeDom',
      value: function scrapeDom(resolve, reject, err, window) {
        var link = window.document.querySelector('.actualmediactn a');
        var screenshot = { url: this.url };
        if (link) {
          screenshot.fullSizeUrl = link.getAttribute('href');
          var image = link.querySelector('img');
          if (image) {
            screenshot.mediumUrl = image.getAttribute('src');
          }
        }
        var desc = window.document.querySelector('.screenshotDescription');
        if (desc) {
          screenshot.description = desc.innerHTML.trim().replace(/^"|"$/g, '');
        }
        var author = window.document.querySelector('.creatorsBlock');
        if (author) {
          var authorLink = author.querySelector('.friendBlockLinkOverlay');
          if (authorLink) {
            screenshot.userUrl = authorLink.getAttribute('href');
          }
        }
        // metadata like:
        // 0.302 MB
        // May 8 @ 10:01pm
        // 1920 x 1080
        var metadata = window.document.querySelectorAll('.detailsStatsContainerRight .detailsStatRight');
        var date = this.getDate(metadata);
        if (date) {
          screenshot.date = date;
        }
        var dimensions = this.getDimensions(metadata);
        if (dimensions) {
          screenshot.width = dimensions[0];
          screenshot.height = dimensions[1];
        }
        var fileSize = this.getFileSize(metadata);
        if (fileSize) {
          screenshot.fileSize = fileSize;
        }
        resolve(screenshot);
      }
    }, {
      key: 'getFileSize',
      value: function getFileSize(metadata) {
        for (var i = 0; i < metadata.length; i++) {
          var text = metadata[i].innerHTML;
          if (text.indexOf('@') < 0 && text.indexOf(' x ') < 0) {
            return text;
          }
        }
      }
    }, {
      key: 'getDimensions',
      value: function getDimensions(metadata) {
        var divider = ' x ';
        for (var i = 0; i < metadata.length; i++) {
          var text = metadata[i].innerHTML;
          if (text.indexOf(divider) > -1) {
            var dimensions = text.split(divider);
            var width = parseInt(dimensions[0], 10);
            var height = parseInt(dimensions[1], 10);
            return [width, height];
          }
        }
      }
    }, {
      key: 'getDate',
      value: function getDate(metadata) {
        for (var i = 0; i < metadata.length; i++) {
          var text = metadata[i].innerHTML;
          if (text.indexOf('@') > -1) {
            return this.parseDate(text);
          }
        }
      }
  
      // e.g., Mar 2, 2014 @ 12:55pm
      // e.g., Jul 4 @ 1:17pm
    }, {
      key: 'parseDate',
      value: function parseDate(rawDateStr) {
        var dateStr = rawDateStr.trim().toLowerCase();
        var dateAndTime = dateStr.split(/\s+@\s+/);
        var hourAndMinute = dateAndTime[1].split(':'); // 1, 17pm
        var hour = parseInt(hourAndMinute[0], 10);
        var isPM = hourAndMinute[1].indexOf('pm') > -1;
        if (isPM) {
          hour += 12;
        }
        var minute = parseInt(hourAndMinute[1].replace(/[ap]m$/, ''), 10);
        var monthDayYear = dateStr.split(/,\s+/);
        var year = new Date().getFullYear();
        if (monthDayYear.length > 1 && monthDayYear[1].length > 0) {
          year = parseInt(monthDayYear[1], 10);
        }
        var monthDay = monthDayYear[0].split(/\s+/);
        var month = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'].indexOf(monthDay[0]);
        var day = parseInt(monthDay[1], 10);
        return new Date(year, month, day, hour, minute);
      }
    }]);
  
    return ScreenshotScraper;
  })();
  
  exports['default'] = ScreenshotScraper;
  module.exports = exports['default'];

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  var _bluebird = __webpack_require__(83);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _http = __webpack_require__(86);
  
  var _http2 = _interopRequireDefault(_http);
  
  var _canvas = __webpack_require__(87);
  
  var _canvas2 = _interopRequireDefault(_canvas);
  
  var _tinycolor2 = __webpack_require__(78);
  
  var _tinycolor22 = _interopRequireDefault(_tinycolor2);
  
  var _colorThief = __webpack_require__(88);
  
  var _colorThief2 = _interopRequireDefault(_colorThief);
  
  // Converted from
  // https://github.com/lukasklein/itunes-colors/blob/master/js/app.js
  
  var ImageAnalyzer = (function () {
    function ImageAnalyzer() {
      _classCallCheck(this, ImageAnalyzer);
  
      this.bgcolor = null;
      this.primaryColor = null;
      this.secondaryColor = null;
      this.detailColor = null;
      this.thiefPalette = [];
    }
  
    _createClass(ImageAnalyzer, [{
      key: 'getColors',
      value: function getColors(imageUrl) {
        var _this = this;
  
        return new _bluebird2['default'](function (resolve) {
          _http2['default'].get(imageUrl, _this.handleGet.bind(_this, resolve));
        });
      }
    }, {
      key: 'handleGet',
      value: function handleGet(resolve, res) {
        var data = new Buffer(parseInt(res.headers['content-length'], 10));
        var pos = 0;
        res.on('data', function (chunk) {
          chunk.copy(data, pos);
          pos += chunk.length;
        });
        res.on('end', this.onImageLoaded.bind(this, resolve, data));
      }
    }, {
      key: 'onImageLoaded',
      value: function onImageLoaded(resolve, data) {
        var img = new _canvas2['default'].Image();
        img.src = data;
        var cvs = new _canvas2['default'](img.width, img.height);
        var ctx = cvs.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);
        this.bgcolor = this.findEdgeColor(cvs, ctx);
        var thief = new _colorThief2['default']();
        this.thiefPalette = thief.getPalette(data, 8).map(function (rgb) {
          return (0, _tinycolor22['default'])({ r: rgb[0], g: rgb[1], b: rgb[2] }).toHexString();
        });
        this.findTextColors(cvs, ctx, resolve);
      }
    }, {
      key: 'getAboveThreshold',
      value: function getAboveThreshold(hash, valueThreshold) {
        var results = [];
        for (var key in hash) {
          if (hash.hasOwnProperty(key)) {
            var value = hash[key];
            if (value > valueThreshold) {
              results.push([key, value]);
            }
          }
        }
        return results;
      }
    }, {
      key: 'findEdgeColor',
      value: function findEdgeColor(cvs, ctx) {
        var leftEdgeColors = ctx.getImageData(0, 0, 1, cvs.height);
        var colorCount = {};
        for (var pixel = 0, _i = 0, _ref = cvs.height; _ref > 0 ? _i < _ref : _i > _ref; pixel = _ref > 0 ? ++_i : --_i) {
          var red = leftEdgeColors.data[pixel * 4];
          var green = leftEdgeColors.data[pixel * 4 + 1];
          var blue = leftEdgeColors.data[pixel * 4 + 2];
          var index = red + ',' + green + ',' + blue;
          if (!colorCount[index]) {
            colorCount[index] = 0;
          }
          colorCount[index]++;
        }
        var sortedColorCount = this.getAboveThreshold(colorCount, 2);
        if (sortedColorCount.length < 1) {
          sortedColorCount = this.getAboveThreshold(colorCount, 1);
        }
        sortedColorCount.sort(function (a, b) {
          return b[1] - a[1];
        });
        var proposedEdgeColor = sortedColorCount[0];
        if (this.isBlackOrWhite(proposedEdgeColor[0])) {
          for (var _j = 0, _len = sortedColorCount.length; _j < _len; _j++) {
            var nextProposedEdgeColor = sortedColorCount[_j];
            if (nextProposedEdgeColor[1] / proposedEdgeColor[1] > 0.3) {
              if (!this.isBlackOrWhite(nextProposedEdgeColor[0])) {
                proposedEdgeColor = nextProposedEdgeColor;
                break;
              }
            }
          }
        }
        return proposedEdgeColor[0];
      }
    }, {
      key: 'findTextColors',
      value: function findTextColors(cvs, ctx, resolve) {
        var colors = ctx.getImageData(0, 0, cvs.width, cvs.height);
        var findDarkTextColor = !this.isDarkColor(this.bgcolor);
        var colorCount = {};
        for (var row = 0, _i = 0, _ref = cvs.height; _ref > 0 ? _i < _ref : _i > _ref; row = _ref > 0 ? ++_i : --_i) {
          for (var column = 0, _j = 0, _ref1 = cvs.width; _ref1 > 0 ? _j < _ref1 : _j > _ref1; column = _ref1 > 0 ? ++_j : --_j) {
            var red = colors.data[row * (cvs.width * 4) + column * 4];
            var green = colors.data[row * (cvs.width * 4) + column * 4 + 1];
            var blue = colors.data[row * (cvs.width * 4) + column * 4 + 2];
            var index = red + ',' + green + ',' + blue;
            if (!colorCount[index]) {
              colorCount[index] = 0;
            }
            colorCount[index]++;
          }
        }
        var possibleColorsSorted = [];
        for (var color in colorCount) {
          if (colorCount.hasOwnProperty(color)) {
            var count = colorCount[color];
            var curDark = this.isDarkColor(color);
            if (curDark === findDarkTextColor) {
              possibleColorsSorted.push([color, count]);
            }
          }
        }
        possibleColorsSorted.sort(function (a, b) {
          return b[1] - a[1];
        });
        for (var _k = 0, _len = possibleColorsSorted.length; _k < _len; _k++) {
          var color = possibleColorsSorted[_k];
          if (!this.primaryColor) {
            if (this.isContrastingColor(color[0], this.bgcolor)) {
              this.primaryColor = color[0];
            }
          } else if (!this.secondaryColor) {
            if (!this.isDistinct(this.primaryColor, color[0]) || !this.isContrastingColor(color[0], this.bgcolor)) {
              continue;
            }
            this.secondaryColor = color[0];
          } else if (!this.detailColor) {
            if (!this.isDistinct(this.secondaryColor, color[0]) || !this.isDistinct(this.primaryColor, color[0]) || !this.isContrastingColor(color[0], this.bgcolor)) {
              continue;
            }
            this.detailColor = color[0];
            break;
          }
        }
        var defaultColor = findDarkTextColor ? '0,0,0' : '255,255,255';
        if (!this.primaryColor) {
          this.primaryColor = defaultColor;
        }
        if (!this.secondaryColor) {
          this.secondaryColor = defaultColor;
        }
        if (!this.detailColor) {
          this.detailColor = defaultColor;
        }
        var allColors = this.thiefPalette.concat([this.rgbSnippetToHex(this.bgcolor), this.rgbSnippetToHex(this.primaryColor), this.rgbSnippetToHex(this.secondaryColor), this.rgbSnippetToHex(this.detailColor)]);
        resolve(Array.from(new Set(allColors)));
      }
    }, {
      key: 'rgbSnippetToHex',
      value: function rgbSnippetToHex(rgbSnippet) {
        return (0, _tinycolor22['default'])('rgb(' + rgbSnippet + ')').toHexString();
      }
    }, {
      key: 'isBlackOrWhite',
      value: function isBlackOrWhite(color) {
        var splitted = color.split(',');
        var red = splitted[0];
        var green = splitted[1];
        var blue = splitted[2];
        var thresholdWhite = 255 * 0.91;
        var thresholdBlack = 255 * 0.09;
        if (red > thresholdWhite && green > thresholdWhite && blue > thresholdWhite) {
          return true;
        }
        if (red < thresholdBlack && green < thresholdBlack && blue < thresholdBlack) {
          return true;
        }
        return false;
      }
    }, {
      key: 'isDarkColor',
      value: function isDarkColor(color) {
        if (color) {
          var splitted = color.split(',');
          var red = splitted[0] / 255;
          var green = splitted[1] / 255;
          var blue = splitted[2] / 255;
          var lum = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
          return lum < 0.5;
        }
        return false;
      }
    }, {
      key: 'isContrastingColor',
      value: function isContrastingColor(color1, color2) {
        var splitted1 = color1.split(',');
        var red1 = splitted1[0] / 255;
        var green1 = splitted1[1] / 255;
        var blue1 = splitted1[2] / 255;
        var lum1 = 0.2126 * red1 + 0.7152 * green1 + 0.0722 * blue1;
        var splitted2 = color2.split(',');
        var red2 = splitted2[0] / 255;
        var green2 = splitted2[1] / 255;
        var blue2 = splitted2[2] / 255;
        var lum2 = 0.2126 * red2 + 0.7152 * green2 + 0.0722 * blue2;
        var contrast = 0;
        if (lum1 > lum2) {
          contrast = (lum1 + 0.05) / (lum2 + 0.05);
        } else {
          contrast = (lum2 + 0.05) / (lum1 + 0.05);
        }
        return contrast > 1.6;
      }
    }, {
      key: 'isDistinct',
      value: function isDistinct(color1, color2) {
        var splitted1 = color1.split(',');
        var red1 = splitted1[0] / 255;
        var green1 = splitted1[1] / 255;
        var blue1 = splitted1[2] / 255;
        var splitted2 = color2.split(',');
        var red2 = splitted2[0] / 255;
        var green2 = splitted2[1] / 255;
        var blue2 = splitted2[2] / 255;
        var threshold = 0.25;
        if (Math.abs(red1 - red2) > threshold || Math.abs(green1 - green2) > threshold || Math.abs(blue1 - blue2) > threshold) {
          if (Math.abs(red1 - green1) < 0.03 && Math.abs(red1 - blue1) < 0.03) {
            if (Math.abs(red2 - green2) < 0.03 && Math.abs(red2 - blue2) < 0.03) {
              return false;
            }
          }
          return true;
        }
        return false;
      }
    }]);
  
    return ImageAnalyzer;
  })();
  
  exports['default'] = ImageAnalyzer;
  module.exports = exports['default'];

/***/ },
/* 86 */
/***/ function(module, exports) {

  module.exports = require("http");

/***/ },
/* 87 */
/***/ function(module, exports) {

  module.exports = require("canvas");

/***/ },
/* 88 */
/***/ function(module, exports) {

  module.exports = require("color-thief");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map