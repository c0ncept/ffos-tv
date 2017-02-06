webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	__webpack_require__(2);

	__webpack_require__(9);

/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "index.html";

/***/ },

/***/ 2:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 9:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _cakejs2Spatial = __webpack_require__(10);

	var _hyper = __webpack_require__(26);

	var _hyper2 = _interopRequireDefault(_hyper);

	__webpack_require__(28);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.h = _hyper2.default;

	(0, _cakejs2Spatial.create)({
	  element: document.body,
	  createRoot: false
	}).route('/', 'pages.home').route('*', 'pages.home');

/***/ },

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.options = undefined;

	var _cakejs2Spatial = __webpack_require__(10);

	var _keys = __webpack_require__(27);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var options = exports.options = { evtNamePostfix: 'x', autofocus: true, keys: _keys2.default, preventKeys: true };
	exports.default = (0, _cakejs2Spatial.spatial)(options);

/***/ },

/***/ 27:
/***/ function(module, exports) {

	"use strict";

	module.exports = {
	  LEFT: 37,
	  RIGHT: 39,
	  UP: 38,
	  DOWN: 40,
	  ENTER: 13,
	  RETURN: 461,
	  ZERO: 48,
	  ONE: 49,
	  TWO: 50,
	  THREE: 51,
	  FOUR: 52,
	  FIVE: 53,
	  SIX: 54,
	  SEVEN: 55,
	  EIGHT: 56,
	  NINE: 57,
	  NUMERIC_ZERO: 96, // keyCode of numeric keys on External USB keyboard
	  NUMERIC_ONE: 97,
	  NUMERIC_TWO: 98,
	  NUMERIC_THREE: 99,
	  NUMERIC_FOUR: 100,
	  NUMERIC_FIVE: 101,
	  NUMERIC_SIX: 102,
	  NUMERIC_SEVEN: 103,
	  NUMERIC_EIGHT: 104,
	  NUMERIC_NINE: 105,
	  RED: 403,
	  GREEN: 404,
	  YELLOW: 405,
	  BLUE: 406,
	  PLAY: 415,
	  PAUSE: 19,
	  STOP: 413,
	  REC: 416,
	  FF: 417,
	  RW: 412,
	  TOOLS: -1,
	  PUP: 33,
	  PDOWN: 34,
	  CHLIST: -1,
	  PRECH: -1,
	  TXTMIX: -1,
	  FAVCH: -1,
	  EXIT: -1,
	  INFO: 457
	};

/***/ },

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _cakejs2Spatial = __webpack_require__(10);

	var _Scrollabl = __webpack_require__(29);

	var _Scrollabl2 = _interopRequireDefault(_Scrollabl);

	var _Reset = __webpack_require__(34);

	var _Reset2 = _interopRequireDefault(_Reset);

	var _Weather = __webpack_require__(35);

	var _Weather2 = _interopRequireDefault(_Weather);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_cakejs2Spatial.Cream.extend({
	  _namespace: 'pages.home',
	  isDialogShown: false,
	  weatherComponent: (0, _cakejs2Spatial.inject)('components.weather'),

	  toggleDialog: function toggleDialog() {
	    this.set('isDialogShown', !this.isDialogShown);
	  },
	  didMount: function didMount(dom) {
	    if (this.isDialogShown) {
	      dom.sn.focus(this.btnEl);
	    }
	    setTimeout(this.get('weatherComponent').updateTime, 1000);
	  },
	  render: function render() {
	    var _this = this;

	    (0, _Reset2.default)();
	    var f = !this.get('isDialogShown');
	    return h(
	      'div',
	      { className: 'application' },
	      this.isDialogShown === true && h(
	        'div',
	        { className: 'dialog' },
	        h(
	          'div',
	          { className: 'window' },
	          'Not implemented yet.',
	          h(
	            'div',
	            { focusable: true, ref: function ref(_ref) {
	                _this.btnEl = _ref;
	              },
	              onEnterx: this.toggleDialog, className: 'button' },
	            'Ok'
	          )
	        )
	      ),
	      h(
	        'div',
	        { className: 'home-screen' },
	        h('div', { className: 'home-screen--background' }),
	        h(
	          'div',
	          { className: 'toolbar' },
	          h(
	            'div',
	            { className: 'settings', focusable: f, onEnterx: this.toggleDialog },
	            h('div', { className: 'icons sprite-15' })
	          ),
	          h(_Weather2.default, null)
	        ),
	        h(
	          _Scrollabl2.default,
	          { className: 'home-screen--launcher', animate: true },
	          h('div', null),
	          h(
	            'div',
	            { focusable: f },
	            h('div', { className: 'icons sprite-0' })
	          ),
	          h(
	            'div',
	            { focusable: f },
	            h('div', { className: 'icons sprite-1' })
	          ),
	          h(
	            'div',
	            { focusable: f },
	            h('div', { className: 'icons sprite-2' })
	          ),
	          h(
	            'div',
	            { focusable: f },
	            h('div', { className: 'icons sprite-3' })
	          ),
	          h(
	            'div',
	            { focusable: f },
	            h('div', { className: 'icons sprite-4' })
	          ),
	          h(
	            'div',
	            { focusable: f },
	            h('div', { className: 'icons sprite-5' })
	          ),
	          h(
	            'div',
	            { focusable: f },
	            h('div', { className: 'icons sprite-6' })
	          ),
	          h(
	            'div',
	            { focusable: f },
	            h('div', { className: 'icons sprite-8' })
	          ),
	          h('div', null)
	        )
	      )
	    );
	  }
	});

/***/ },

/***/ 29:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _hyper = __webpack_require__(26);

	var _hyper2 = _interopRequireDefault(_hyper);

	var _scrollIntoView = __webpack_require__(30);

	var _scrollIntoView2 = _interopRequireDefault(_scrollIntoView);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Scrollabl(props) {
	  if (!props) return this;

	  var childs = [].concat.apply([], [].slice.call(arguments, 1, arguments.length));

	  function onFocus(evt) {
	    if (props.animate) {
	      evt.stopPropagation();
	      evt.preventDefault();
	      setTimeout(function () {
	        evt.target && evt.target.focus();
	      }, 100);
	    }

	    activateEl(evt.target);
	    (0, _scrollIntoView2.default)(evt.target, {
	      time: 300,
	      align: {
	        top: 0.5,
	        left: 0.5
	      }
	    });
	  }

	  function activateEl(target) {
	    if ('activate' in props) {
	      [].slice.call(target.parentNode.childNodes).forEach(function (n) {
	        return n.classList.remove(props.activate);
	      });
	      target.classList.add(props.activate);
	    }
	  }

	  function onUnfocus(evt) {}

	  childs.forEach(function (child) {
	    if ('focusable' in child.props && child.props.focusable) {
	      child.props.onFocusx = onFocus;
	    }
	    if ('activate' in props) {
	      child.props.onUnfocusx = onUnfocus;
	    }
	  });

	  return _hyper2.default.apply(null, ['div', props].concat(childs));
	};

	exports.default = Scrollabl;

/***/ },

/***/ 34:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function () {
	  return window.scrollTo(0, 0);
	};

/***/ },

/***/ 35:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Weather;

	var _cakejs2Spatial = __webpack_require__(10);

	function resolve(desc) {
	  var icon = '';
	  switch (desc) {
	    case 'Clear':
	      icon = 'wi-day-sunny';
	      break;
	    case 'Clouds':
	      icon = 'wi-day-cloudy';
	      break;
	    case 'Additional':
	      icon = 'wi-cloud';
	      break;
	    case 'Mist':
	      icon = 'wi-sprinkle';
	      break;
	    case 'Extreme':
	      icon = 'wi-cloudy';
	      break;
	    case 'Drizzle':
	      icon = 'wi-night-rain';
	      break;
	    case 'Rain':
	      icon = 'wi-rain';
	      break;
	    case 'Thunderstorm':
	      icon = 'wi-thunderstorm';
	      break;
	    case 'Snow':
	      icon = 'wi-snow';
	      break;
	    case 'Atmosphere':
	      icon = 'wi-windy';
	      break;
	    default:
	      break;
	  }
	  return icon;
	}

	function getTime() {
	  var today = new Date();
	  var h = today.getHours();
	  var m = today.getMinutes();
	  var s = today.getSeconds();
	  h = pad(h);
	  m = pad(m);
	  s = pad(s);

	  return { h: h, m: m, s: s };
	}

	function pad(i) {
	  if (i < 10) {
	    i = '0' + i;
	  }; // add zero in front of numbers < 10
	  return i;
	}

	var WeatherComponent = _cakejs2Spatial.Cream.extend({
	  _namespace: 'components.weather',

	  init: function init() {
	    var _this = this;

	    /* global fetch */
	    fetch('https://freegeoip.net/json/').then(function (resp) {
	      return resp.json();
	    }).then(function (ipdata) {
	      fetch('http://api.openweathermap.org/data/2.5/weather?q=' + ipdata.country_code.toLowerCase() + ',' + ipdata.city + '&units=imperial' + '&appid=558bdce4b8d202bebd12734ff3582c27').then(function (resp) {
	        return resp.json();
	      }).then(function (weather) {
	        _this.set('ipdata', ipdata);
	        _this.set('weather', weather);
	      });
	    });
	  },
	  updateTime: function updateTime() {
	    this.set('time', getTime());
	  }
	});

	WeatherComponent.init();

	function Weather() {
	  WeatherComponent.updateTime();

	  var weather = WeatherComponent.get('weather');
	  var ipdata = WeatherComponent.get('ipdata');
	  var time = WeatherComponent.get('time');

	  var iconCls = 'wi';

	  if (weather) {
	    iconCls += ' ' + resolve(weather.weather.length > 1 ? weather.weather[1].main : weather.weather[0].main);
	  }

	  return h(
	    'div',
	    { className: 'weather-widget' },
	    h(
	      'div',
	      { className: 'clock' },
	      time.h,
	      ' : ',
	      time.m,
	      ' ',
	      h(
	        'span',
	        null,
	        time.s
	      )
	    ),
	    h('div', { className: iconCls }),
	    ipdata && h(
	      'div',
	      { className: 'info' },
	      h(
	        'div',
	        null,
	        Math.floor((weather.main.temp - 32) * 5 / 9),
	        ' C'
	      ),
	      h(
	        'strong',
	        null,
	        ipdata.country_name,
	        ', ',
	        ipdata.city
	      )
	    )
	  );
	};

/***/ }

});