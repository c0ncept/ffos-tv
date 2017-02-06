/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		1:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + ".bundle.js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(10);
	module.exports = __webpack_require__(30);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(11);


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var Container = __webpack_require__(12);
	var Cream = __webpack_require__(14);
	var Cake = __webpack_require__(16);

	module.exports = {
	  _container : Container._container,
	  _mixer : __webpack_require__(18),
	  h : __webpack_require__(20).h,
	  spatial : __webpack_require__(20).spatial,
	  next : __webpack_require__(18).next,
	  register : Container.register,
	  unregister : Container.unregister,
	  inject : Container.inject,
	  Cream : Cream,
	  create : Cake.create,
	  destroy : Cake.destroy
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Container of the different ingredients to make a cake
	 *
	 */
	var Caramel = __webpack_require__(13),
	  caramel = new Caramel(),
	  container = {},
	  observers = [];

	/**
	 * Resolve property change observers
	 */
	caramel.on('setProp', function(name) {
	  for (var i = 0; i < observers.length; i++) {
	    var observer = observers[i];

	    for (var j = 0; j < observer.prop.length; j++) {
	      var prop = observer.prop[j];
	      var longName = observer.cream._namespace + '.' + prop;

	      if (longName === name || prop === name ||
	        (prop instanceof RegExp && prop.test(name))) {
	        observer.fn();
	      }
	    }
	  }
	});

	/**
	 * Newly created Cream initializer inside of the container
	 */
	var createCream = function(name, obj) {
	  obj._namespace = name;
	  observers = observers.concat(obj._observers);
	  obj._emitter = caramel;
	};

	/**
	 * Deinitializer
	 */
	var removeCream = function(name, obj) {
	  if (obj._observers.length > 0) {
	    observers = observers.filter(function(o) {
	      return obj._observers.indexOf(o) === -1;
	    });
	  }
	  obj._destroy();
	};

	/**
	 * DI register method
	 *
	 * @name register
	 * @function
	 * @access public
	 * @param {String} name namespace register object into
	 * @param {Cream} obj
	 * @param {String} after namespace register object after
	 */
	var register = function(name, obj, after) {
	  if (typeof after === 'string' && !inject(after)()) {
	    caramel.once('register:' + after, function() {
	      register(name, obj);
	    });
	    return;
	  }

	  var path = name.split('.');
	  var ref = container;

	  for (var i = 0; i < path.length - 1; i++) {
	    if (!ref[path[i]]) {
	      ref = ref[path[i]] = {};
	    } else {
	      ref = ref[path[i]];
	    }
	  }

	  if (!ref[path[path.length - 1]]) {
	    ref[path[path.length - 1]] = { cream : obj };
	  } else {
	    ref[path[path.length - 1]].cream = obj;
	  }

	  createCream(name, obj);
	  caramel.emit('register:' + name);
	};

	/**
	 * DI remove method
	 *
	 * @name unregister
	 * @function
	 * @access public
	 * @param {String} name namespace remove from
	 */
	var unregister = function(name) {
	  var path = name.split('.');
	  var ref = container;

	  for (var i = 0; i < path.length - 1; i++) {
	    if (!(ref = ref[path[i]])) {
	      return;
	    }
	  }

	  if (typeof ref[path[path.length - 1]] === 'object') {
	    /**
	     * Destroy registered Cream
	     */
	    if (ref[path[path.length - 1]]._type === 'Cream') {
	      removeCream(name, ref[path[path.length - 1]].cream);

	    } else if (ref[path[path.length - 1]].cream &&
	      ref[path[path.length - 1]].cream._type === 'Cream') {

	      removeCream(name, ref[path[path.length - 1]].cream);

	      delete ref[path[path.length - 1]].cream;
	    }

	    delete ref[path[path.length - 1]];
	  }
	};

	/**
	 * DI inject
	 *
	 * @name inject
	 * @function
	 * @access public
	 * @param {String} name namespace inject object from
	 * @returns {function} injection resolver function
	 */
	var inject = function(name) {

	  var injection = function() {
	    var path = name.split('.');
	    var ref = container;

	    for (var i = 0; i < path.length; i++) {

	      if (!ref[path[i]]) {
	        if (ref.cream) {
	          ref = ref.cream;
	          i--;
	          continue;
	        }

	        return;
	      } else {
	        ref = ref[path[i]];
	      }
	    }

	    return ref.cream || ref;
	  };

	  injection.isInjection = true;
	  injection.namespace = name;

	//  if (!skipCache) {
	//    caramel.once('register:' + name, function() {
	//      injection();
	//    });
	//  }

	  return injection;
	};

	module.exports = {
	  _container : container,
	  register   : register,
	  unregister : unregister,
	  inject     : inject
	};


/***/ },
/* 13 */
/***/ function(module, exports) {

	/**
	 * Caramel (eventemitter) with support of
	 * state listeners and regular expressions.
	 *
	 * Following features are supported:
	 *
	 * on
	 * once
	 * off
	 * emit
	 * has
	 *
	 * @name caramel
	 * @function
	 * @access public
	 */
	var caramel = function() {
	  this.listeners = [];
	};

	caramel.prototype.on = function(eventName, listener) {
	  this._subscribe(eventName, TYPE_MANY, listener);
	};

	caramel.prototype.once = function(eventName, listener) {
	  this._subscribe(eventName, TYPE_ONCE, listener);
	};

	caramel.prototype.emit = function(eventName, data) {
	  this._fireEvent(eventName, data);
	};

	caramel.prototype.has = function(eventName, listener) {
	  return this._listenerFor(eventName, listener) ? true : false;
	};

	caramel.prototype.off = function(eventName, listener) {
	  this._unsubscribe(eventName, listener);
	};

	caramel.prototype._fireEvent = function(eventName, data) {
	  if ((typeof eventName !== 'string' || eventName.length < 1) &&
	  !(eventName instanceof RegExp)) {
	    throw new Error('Wrong arguments ' + eventName);
	  }

	  for (var i = 0; i < this.listeners.length; i++) {
	    var event = this.listeners[i];

	    if (event.eventType === TYPE_REGEXP && event.eventName.test(eventName) ||
	      event.eventType === TYPE_STRING && event.eventName === eventName ||
	      event.eventType === TYPE_STRING && (eventName instanceof RegExp) &&
	      eventName.test(event.eventName)
	    ) {

	      event.listener(data);

	      if (event.runType === TYPE_ONCE) {
	        this._unsubscribe(event.eventName, event.listener);
	      }
	    }
	  }
	};

	caramel.prototype._unsubscribe = function(eventName, listener) {
	  var toRemove = [], i;

	  for (i = 0; i < this.listeners.length; i++) {
	    var l = this.listeners[i], remove = false;

	    if (l.eventName === eventName) {
	      remove = true;
	    } else if (eventName instanceof RegExp && eventName.test(l.eventName)) {
	      remove = true;
	    }

	    if (remove === true) {
	      if (typeof listener === 'undefined') {
	        toRemove.push(i);
	      } else if (this.listeners[i].listener === listener) {
	        toRemove.push(i);
	      }
	    }
	  }

	  for (i = toRemove.length -1; i >= 0; i--) {
	    this.listeners.splice(toRemove[i], 1);
	  }
	};

	caramel.prototype._subscribe = function(eventName, type, listener) {
	  if (!isValidProps(eventName, listener)) {
	    throw new Error('Wrong arguments ' + eventName + ' ' + listener);
	  }

	  if (this.has(eventName, listener)) {
	    throw new Error('Such listener already exists');
	  }

	  if (this.listeners.length >= MAX_LISTENERS) {
	    throw new Error('Limit of the listeners exceed MAX_LISTENERS = ' + MAX_LISTENERS);
	  }

	  var event = {
	    eventName : eventName,
	    listener : listener,
	    runType : type,
	    eventType : (eventName instanceof RegExp) ? TYPE_REGEXP : TYPE_STRING
	  };

	  this.listeners.push(event);
	};

	caramel.prototype._listenerFor = function(eventName, listener) {
	  for (var i = 0; i < this.listeners.length; i++) {
	    if (this.listeners[i].eventName === eventName &&
	      this.listeners[i].listener === listener) {
	      return this.listeners[i];
	    }
	  }
	};

	var isValidEventName = function(eventName) {
	  return (eventName &&
	    (typeof eventName === 'string' ||
	    (eventName instanceof RegExp)));
	};

	var isValidProps = function(eventName, listener) {
	  return (isValidEventName(eventName) && typeof listener === 'function');
	};

	var TYPE_ONCE   = 0;
	var TYPE_MANY   = 1;
	var TYPE_REGEXP = 2;
	var TYPE_STRING = 3;
	var MAX_LISTENERS = 256;

	module.exports = caramel;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 *
	 * Cream is a base ingredient
	 */

	/**
	 * Sugar function prototypes (observes, property)
	 */
	__webpack_require__(15);
	var Container = __webpack_require__(12);

	/**
	 * Base ingredient of any cake
	 *
	 * @name Cream
	 * @function
	 * @access public
	 */
	var Cream = function() {
	  this._type = 'Cream';
	  this._observers = [];
	  this._namespace = null;
	  this._emitter;
	};

	Cream.prototype.get = function(name) {
	  var ref = this;
	  var path = name.split('.');
	  for (var i = 0; i < path.length; i++) {
	    /**
	     * Nor propery injected
	     */
	    if (typeof ref[path[i]] === 'function' && ref[path[i]].isInjection) {
	      ref = ref[path[i]]();
	      continue;
	    }

	    if ((ref = ref[path[i]]) === undefined) {
	      return;
	    }
	  }

	  /**
	   * It is property function
	   */
	  if (ref && typeof ref === 'object' && ref.isProperty === true) {
	    return ref.fn.call(this);
	  }

	  return ref;
	};

	Cream.prototype.set = function(name, value) {
	  return this._setProp(name, 'set', value);
	};

	Cream.prototype.push = function(name) {
	  return this._setProp(name, 'push', [].slice.call(arguments, 1));
	};

	Cream.prototype.unshift = function(name) {
	  return this._setProp(name, 'unshift', [].slice.call(arguments, 1));
	};

	Cream.prototype.splice = function(name) {
	  return this._setProp(name, 'splice', [].slice.call(arguments, 1));
	};

	Cream.prototype.pop = function(name) {
	  return this._setProp(name, 'pop', [].slice.call(arguments, 1));
	};

	Cream.prototype.shift = function(name) {
	  return this._setProp(name, 'shift', [].slice.call(arguments, 1));
	};

	Cream.prototype._setProp = function(name, fnName, args) {

	  var result;

	  if (this._isValidLocalProp(name)) {
	    /**
	     * Setup local property
	     */
	    if (fnName === 'set') {
	      this._getPropParent(name)[this._getPropName(name)] = args;
	      result = true;
	    } else {
	      result = this.get(name)[fnName].apply(this.get(name), args);
	    }
	    this.notifyPropertyChange(name);
	  } else {
	    /**
	     * Setup injected reference
	     */
	    var nsRef = this._getPropertyRef(name);

	    if (nsRef) {
	      result = nsRef.ref._setProp(nsRef.name , fnName, args);
	    }
	  }

	  return result;
	};

	Cream.prototype._init = function() {
	  ('init' in this) && this.init();
	};

	Cream.prototype._destroy = function() {
	  ('destroy' in this) && this.destroy();
	};

	Cream.prototype._didTransition = function() {
	  ('didTransition' in this) && this.didTransition();
	};

	Cream.prototype._willTransition = function() {
	  ('willTransition' in this) && this.willTransition();
	};

	Cream.prototype._didMount = function(h) {
	  ('didMount' in this) && this.didMount(h);
	};

	Cream.prototype.notifyPropertyChange = function(name) {
	  this._emitter.emit('setProp', this._namespace + '.' + name);
	};

	Cream.prototype._isValidLocalProp = function(name) {
	  if (!this._namespace) {
	    throw new Error('Cream should be registered before you set something');
	  }

	  if (typeof name !== 'string' || name.length < 1) {
	    throw new Error('Tying to set value with wrong name');
	  }

	  var prns = this._propNamespace(name);

	  if (prns === undefined || prns === this._namespace) {
	    return true;
	  }
	};

	/*
	 * Reference of the namespace (injectable props)
	 */
	Cream.prototype._getPropertyRef = function(name) {
	  var path = this._propAbsolutePath(name).split('.');
	  var nsRef;
	  for (var i = path.length; i >= 0; i--) {
	    nsRef = Container.inject(path.slice(0, i).join('.'))();

	    /*
	     * Resolve parent of the namespace
	     */
	    if (nsRef instanceof Cream) {
	      return {
	        ref  : nsRef,
	        name : path.slice(i).join('.')
	      };
	    }
	  }
	};

	Cream.prototype._propAbsolutePath = function(name) {
	  var ns = this._propNamespace(name);

	  if (ns) {
	    if (ns !== this._namespace) {
	      var nsName = name.split('.').slice(1).join('.');
	      /**
	       * Directly injected props (aka alias)
	       */
	      if (nsName) {
	        return ns + '.' + name.split('.').slice(1).join('.');
	      } else {
	        return ns;
	      }
	    }
	    return ns + '.' + name;
	  }

	  return name;
	};

	Cream.prototype._getPropName = function(name) {
	  return name.split('.').pop();
	};

	Cream.prototype._getPropParent = function(name) {
	  var ref = this;
	  var path = name.split('.');

	  for (var i = 0; i < path.length - 1; i++) {
	    if ((ref = ref[path[i]]) === undefined) {
	      return;
	    }
	  }

	  return ref;
	};

	Cream.prototype._propNamespace = function(name) {
	  var ref = this, i;
	  var path = name.split('.');

	  for (i = 0; i < path.length; i++) {
	    if ((ref = ref[path[i]]) === undefined) {
	      return;
	    }

	    if (typeof ref === 'function' && ref.isInjection) {
	      return ref.namespace;
	    }
	  }

	  return this._namespace;
	};

	Cream.prototype._addObserver = function(observer) {
	  if (observer.prop.length < 1) { return; }

	  var self = this;

	  this._observers.push({
	    cream : this,
	    prop : observer.prop.map(function(p) {
	      if (typeof p === 'string') {
	        return self._propAbsolutePath(p);
	      }
	      return p;
	    }),
	    fn : observer.fn.bind(this)
	  });
	};

	Cream.prototype.extend = function(obj) {
	  var newCream = Cream.extend(obj);

	  for (var i in this) {
	    if (!newCream[i]) {
	      newCream[i] = this[i];
	    }
	  }

	  return newCream;
	};

	Cream.extend = function(obj) {
	  var F = function() {};
	  F.prototype = new Cream();
	  F = new F();

	  for (var i in obj) {
	    var descr = Object.getOwnPropertyDescriptor(obj, i);

	    if (descr !== undefined) {
	      F[i] = typeof obj[i] === 'function' &&
	        !obj[i].isInjection ? obj[i].bind(F) : obj[i];

	      if (F[i] && typeof F[i] === 'object' && F[i].isObserver === true) {
	        F._addObserver(F[i]);
	      }
	    }
	  }

	  if ('_namespace' in obj) {
	    if ('_after' in obj) {
	      Container.register(obj._namespace, F, obj._after);
	    } else {
	      Container.register(obj._namespace, F);
	    }
	  }

	  return F;
	};

	module.exports = Cream;


/***/ },
/* 15 */
/***/ function(module, exports) {

	/*
	 * Function sugar
	 */

	Function.prototype.property = function() {
	  return {
	    isProperty : true,
	    fn : this
	  };
	};

	Function.prototype.observes = function() {
	  return {
	    isProperty : true,
	    isObserver : true,
	    prop : [].slice.call(arguments),
	    fn : this
	  };
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 *
	 * Cake is an application constructor.
	 */

	__webpack_require__(17);
	var Cream = __webpack_require__(14);
	var Container = __webpack_require__(12);
	var Mixer = __webpack_require__(18);

	var bvd = __webpack_require__(20);

	var Cake = Cream.extend({
	  _namespace : 'cake',

	  zefir : Container.inject('zefir'),

	  tree : null,

	  /**
	   * Routes shortcut
	   *
	   * @name route
	   * @function
	   * @access public
	   * @param {String} path url pattern
	   * @param {String} cream Cream namsespace
	   */
	  route : function(path, cream) {
	    this.get('zefir').route(path, cream);
	    return this;
	  },

	  /**
	   * Cake initializetion function
	   *
	   * @name create
	   * @function
	   * @access public
	   * @param {Object} opts Application options
	   */
	  create : function(opts) {
	    opts = opts || {};
	    this.set('opts', opts);
	    this._createElement(opts.element);

	    Mixer.run();
	    this._namespaceWatcher();
	    this._updateWatcher();
	    this.get('zefir').deviceWatcher();
	    return this;
	  },

	  /**
	   * Application destroyer
	   *
	   * @name destroy
	   * @function
	   * @access public
	   */
	  destroy : function() {
	    Mixer.stop();
	    this.set('zefir.current', null);
	    this.set('zefir.routes', []);
	    this._removeTree();
	  },

	  render : function() {
	    var cream = this.get('loaded');

	    if (cream && typeof cream.render === 'function') {
	      if (!this.tree && this.opts.createRoot === false) {
	        this.set('tree', cream.render());
	        this.element.appendChild(this.tree.render());
	      } else if (this.tree && this.opts.createRoot !== false) {
	        bvd.patch(this.tree, bvd.diff(this.tree, this._createRoot(cream.render())));
	      } else {
	        bvd.patch(this.tree, bvd.diff(this.tree, cream.render()));
	      }
	      cream._didMount(this.tree);
	      this._emitter.emit('didMount');
	    }
	  },

	  _updateWatcher : function() {
	    if (this.loaded && this.loaded._updated === true) {
	      this.render();
	      this.set('loaded._updated', false);
	    }

	    Mixer.next(this._updateWatcher);
	  },

	  _namespaceWatcher : function() {
	    var self = this;
	    var zefirRe = new RegExp(/^zefir.*/), cakeRe = new RegExp(/^cake.*/);

	    this._emitter.on('setProp', function(name) {
	      if (self.loaded && self.loaded._updated !== true) {
	        if (name.match(zefirRe) || name.match(cakeRe)) {
	          return;
	        }
	        self.set('loaded._updated', true);
	      }
	    });

	    /**
	     * Post load initializer
	     */
	    this._emitter.on(/^register/, function() {
	      if (self.get('zefir')) {
	        self.get('zefir').deviceWatcher();
	        self.get('zefir').locationWatcher(self.get('zefir.location'));
	      }
	    });
	  },

	  _createElement : function(element) {
	    if (!element) {
	      element = document.getElementById('cake');

	      if (element) {
	        document.body.removeChild(element);
	      }

	      element = document.body;
	    }

	    if (this.get('opts.createRoot') !== false) {
	      this.set('tree', this._createRoot(''));
	      element.appendChild(this.tree.render());
	    }

	    this.set('element', element);
	  },

	  _createRoot : function(children) {
	    return bvd.h('div', {
	      className : this.opts.elementClass || 'cake',
	      id : this.opts.elementId || 'cake'}, children);
	  },

	  _removeTree : function() {
	    if (this.tree) {
	      this.tree.el.parentNode.removeChild(this.tree.el);
	      this.set('tree', null);
	    }
	  },

	  _unloadComponent : function() {
	    if (this.get('loaded')) {
	      var cream = this.get('loaded');
	      cream._didTransition();

	      delete cream.props;
	      delete cream.params;

	      this.set('loaded', null);
	    }
	  },

	  _loadComponent : function() {
	    var route = this.get('zefir.current');

	    if (!route) {
	      this._unloadComponent();
	      return;
	    }

	    var cream = Container.inject(route.cream)();

	    /**
	     * No cream were registered, maybe later
	     */
	    if (!cream) {
	      this._unloadComponent();
	      return;
	    }

	    if (this.loaded === cream &&
	      route.props === this.get('loaded.props') &&
	      route.params === this.get('loaded.params')) {

	      this.get('loaded')._didTransition();
	      this.set('loaded._updated', true);
	      return;
	    }

	    this._unloadComponent();

	    this.set('loaded', cream);

	    cream.props = Container.inject('zefir.current.props');
	    cream.params = Container.inject('zefir.current.params');
	    cream._init();
	    cream._willTransition();

	    this.set('loaded._updated', true);

	  }.observes('zefir.current')
	});

	module.exports = Cake;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 *
	 * A little bit of zefir to make cake nicer
	 */

	var Cream = __webpack_require__(14);
	var next = __webpack_require__(18).next;

	var Zefir = Cream.extend({
	  /**
	   * Yeah, zefir is a most top thing on the cake
	   */
	  _namespace : 'zefir',

	  /**
	   *
	   * Routes container.
	   *
	   *  Format:
	   * {
	   *   filter : /path/:id/name
	   *   cream  : path.cream.location
	   * }
	   *
	   */
	  routes : [],


	  /**
	   * Default location
	   */
	  location : '/',

	  _createOrigin : function(url) {
	    var origin;

	    if (url.match(/\#/)) {
	      url = '-//-/#' + url.split('#')[1];
	    }

	    origin = url
	      .replace(/^.+?\/\/+[^\/]+/, '')
	      .split(/[/#]/).join('/').replace('//', '')
	      .split(/[?]/);

	    return {
	      path   : origin[0].replace(/\/$/g, '') || '/',
	      params : decodeURIComponent(origin[1] || '')
	    };
	  },

	  _pathProps : function(filter, path) {
	    if (path.match(new RegExp('^' + filter + '$'))) {
	      return {};
	    }

	    var f = new RegExp('^' +
	      filter.replace(/:\w+/g, '\(\\w+\)')
	      .replace(/\//gi, '\\/') + '$');

	    var props = path.match(f);

	    if (!props) {
	      return;
	    }

	    var propNames = {};

	    filter.match(/:\w+/gi).slice().map(function(p, i) {
	      p = p.replace(':', '');
	      propNames[p] = props[i + 1];
	    });

	    return propNames;
	  },

	  _queryProps : function(origin) {
	    var params = {};
	    var tmp = origin.split(/[=&]/);

	    for (var i = 0; i < tmp.length; i++) {
	      params[tmp[i]] = tmp[++i];
	    }

	    return params;
	  },

	  /**
	   * Insert routes
	   *
	   * @name addRoute
	   * @function
	   * @access public
	   * @param {String} filter route filter string
	   * @param {String} cream registered cream namespace
	   */

	  route : function(filter, cream) {
	    var r = {
	      filter : filter,
	      cream  : cream
	    };

	    if (filter === '*') {
	      this.push('routes', r);
	    } else {
	      this.unshift('routes', r);
	    }

	    this.locationWatcher(this.location);
	  },

	  locationWatcher : function(location) {
	    var self = this;
	    var origin = this._createOrigin(location);

	    var route = this.get('routes').map(function(r) {
	      if (r.filter === '*') {
	        return {
	          cream : r.cream,
	          props : {},
	          params : {}
	        };
	      }

	      var props = self._pathProps(r.filter, origin.path);

	      if (!props) return false;

	      return {
	        cream : r.cream,
	        props : props,
	        params : {}
	      };
	    }).filter(function(r) { return r; }).shift();

	    if (route) {
	      if (origin.params) {
	        route.params = this._queryProps(origin.params);
	      }
	    }

	    this.set('current', route);
	  },

	  deviceWatcher : function() {
	    if (window && window.location) {
	      if (this.location !== window.location.href) {
	        this.location = String(window.location.href);
	        this.locationWatcher(this.location);
	      }
	    }

	    next(this.deviceWatcher.bind(this));
	  }
	});

	module.exports = Zefir;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * Mixer
	 */

	var raf = __webpack_require__(19).raf,
	  caf = __webpack_require__(19).caf;

	var frame = null;
	var nextQueue = [];
	var isRunning = false;

	/**
	 * next tick queue handler
	 */
	var nextTick = function() {
	  var queue = nextQueue.splice(0);

	  for (var i = 0; i < queue.length; i++) {
	    var task = queue[i];

	    if (task && typeof task === 'function') {
	      task();
	    }
	  }
	};

	/**
	 * Mixer loop runner
	 *
	 * @name run
	 * @function
	 * @access public
	 */
	var run = function() {
	  if (isRunning === true) {
	    throw new Error('Mixer already running');
	  }

	  isRunning = true;

	  var loop = function() {
	    nextTick();
	    frame = raf(loop);
	  };

	  loop();
	};

	/**
	 * Stop mixer
	 *
	 * @name stop
	 * @function
	 * @access public
	 */
	var stop = function() {
	  caf(frame);
	  nextTick();
	  isRunning = false;
	};

	/**
	 * Next tick runner
	 *
	 * @name next
	 * @function
	 * @access public
	 * @param {Function} fn function to run
	 */
	var next = function(fn) {
	  nextQueue.push(fn);
	};

	module.exports = {
	  run  : run,
	  stop : stop,
	  next : next
	};


/***/ },
/* 19 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/* eslint no-undef : 0 */
	var win;

	try {
	  win = global.window || window;
	} catch (e) {
	  win = {};
	}

	var request =
	  win.requestAnimationFrame ||
	  win.webkitRequestAnimationFrame ||
	  win.mozRequestAnimationFrame ||
	  win.oRequestAnimationFrame ||
	  win.msRequestAnimationFrame ||
	  function(callback){
	    return setTimeout(function(){
	      callback();
	    }, 1e3 / 60);
	  };

	var cancel =
	  win.cancelAnimationFrame ||
	  win.webkitCancelAnimationFrame ||
	  win.webkitCancelRequestAnimationFrame ||
	  win.mozCancelAnimationFrame ||
	  win.oCancelAnimationFrame ||
	  win.msCancelAnimationFrame ||
	  function(timeout){
	    clearTimeout(timeout);
	  };

	var raf = function(){
	  return request.apply(win, arguments);
	};

	var caf = function(){
	  return cancel.apply(win, arguments);
	};

	module.exports = {
	  raf : raf,
	  caf : caf
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var dom = __webpack_require__(21);

	module.exports = dom;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	exports.h = __webpack_require__(22).h;
	exports.diff = __webpack_require__(24).diff;
	exports.patch = __webpack_require__(25).patch;
	exports.spatial = __webpack_require__(22).spatial;

	exports.PATCH_CREATE = __webpack_require__(24).PATCH_CREATE;
	exports.PATCH_REMOVE = __webpack_require__(24).PATCH_REMOVE;
	exports.PATCH_REPLACE = __webpack_require__(24).PATCH_REPLACE;
	exports.PATCH_REORDER = __webpack_require__(24).PATCH_REORDER;
	exports.PATCH_PROPS = __webpack_require__(24).PATCH_PROPS;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Element
	 */

	var sNavigator;

	var spatial = function (config, force) {
	  var SpatialNavigator = __webpack_require__(23);

	  config = config || {};

	  if (sNavigator && !force) {
	    sNavigator.setCollection(null);
	  } else {
	    sNavigator = new SpatialNavigator(null, config);
	  }

	  sNavigator.cfg = config;

	  return H;
	};

	/**
	 * General tree
	 *
	 * /** @jsx h * /
	 *
	 * @name h
	 * @function
	 * @access public
	 */
	var H = function (argv) {
	  if (!(this instanceof H)) {
	    if (typeof argv === 'function') {
	      return argv.apply(argv, [].slice.call(arguments, 1, arguments.length));
	    }
	    return new H(arguments);
	  }

	  if (argv[0] instanceof H) {
	    return argv[0];
	  }

	  this.tag = argv[0].toLowerCase();
	  this.props = argv[1] || {};

	  if ('focusable' in this.props && this.props.focusable && !('tabindex' in this.props)) {
	    this.props.tabindex = 0;
	  }

	  if (argv[2] === null || argv[2] === undefined) {
	    return;
	  }

	  if (argv.length > 2) {
	    if (typeof argv[2] !== 'object' && argv.length === 3) {
	      this.children = [_createTextNode(argv[2])];
	    } else if (Array.isArray(argv[2])) {
	      this.children = argv[2];
	    } else {
	      this.children = [].concat.apply([], [].slice.call(argv, 2, argv.length))
	        .filter(function (n) {
	          return n !== null && n !== undefined && n !== false;
	        })
	        .map(function (n) {
	          if (!(n instanceof H)) {
	            return _createTextNode(n);
	          } else {
	            return n;
	          }
	        });
	    }
	  }
	};

	/**
	 * Spatial renderer
	 *
	 * @name render
	 * @function
	 * @access public
	 * @returns {Element} root element
	 */
	H.prototype.render = function () {
	  var DOM = this.DOMrender.apply(this, arguments);

	  if (sNavigator) {
	    this.sn = sNavigator;
	  }

	  return DOM;
	};

	/**
	 * Patch spatial removal
	 *
	 * @name removeSpatial
	 * @function
	 * @access public
	 */
	H.prototype.removeSpatial = function () {
	  sNavigator.remove(this.el);
	};

	/**
	 * Tree renderer
	 *
	 * @name render
	 * @function
	 * @access public
	 * @param {Boolean} fasle - do not save DOM into tree
	 */
	H.prototype.DOMrender = function (node, parent) {
	  node = node || this;

	  node.el = createElement(node.tag ? node : this, parent);

	  var children = node.children;

	  if (typeof children === 'object') {
	    for (var i = 0; i < children.length; i++) {
	      node.el.appendChild(this.DOMrender(children[i], node.el));
	    }
	  }

	  return node.el;
	};

	H.prototype.setProp = function (name, value) {
	  if (typeof this.el !== 'undefined') {
	    if (name === 'className') {
	      this.el.setAttribute('class', value);
	    } else if (name === 'style' && typeof value !== 'string') {
	      this.el.setAttribute('style', _stylePropToString(value));
	    } else if (name.match(/^on/)) {
	      this.addEvent(name, value);
	    } else if (name === 'ref') {
	      if (typeof value === 'function') {
	        value(this.el);
	      }
	    } else if (sNavigator && name === 'focusable') {
	      if (value === true) {
	        sNavigator.add(this.el);
	      } else {
	        sNavigator.remove(this.el);
	      }
	      this.el[name] = Boolean(value);
	    } else if (typeof value === 'boolean' || value === 'true') {
	      this.el.setAttribute(name, value);
	      this.el[name] = Boolean(value);
	    } else {
	      this.el.setAttribute(name, value);
	    }
	  }

	  this.props[name] = value;
	};

	H.prototype.setProps = function (props) {
	  var propNames = Object.keys(props);

	  for (var i = 0; i < propNames.length; i++) {
	    var prop = propNames[i];
	    this.setProp(prop, props[prop]);
	  }
	};

	H.prototype.rmProp = function (name) {
	  if (typeof this.el !== 'undefined') {
	    if (name === 'className') {
	      this.el.removeAttribute('class');
	    } else if (name.match(/^on/)) {
	      this.removeEvent(name);
	    } else if (name === 'ref') {
	      /* Nothing to do */
	    } else if (sNavigator && name === 'focusable') {
	      sNavigator.remove(this.el);
	      delete this.el[name];
	    } else if (typeof value === 'boolean') {
	      this.el.removeAttribute(name);
	      delete this.el[name];
	    } else {
	      this.el.removeAttribute(name);
	    }
	  }

	  delete this.props[name];
	};

	H.prototype.addEvent = function (name, listener) {
	  name = name.slice(2).toLowerCase();

	  this.listeners = this.listeners || {};

	  if (name in this.listeners) {
	    this.removeEvent(name);
	  }

	  this.listeners[name] = listener;
	  this.el.addEventListener(name, listener);
	};

	H.prototype.removeEvent = function (name) {
	  name = name.replace(/^on/, '').toLowerCase();
	  if (name in this.listeners) {
	    this.el.removeEventListener(name, this.listeners[name]);
	    delete this.listeners[name];
	  }
	};

	H.prototype.clone = function () {
	  var node = {
	    tag: String(this.tag),
	    props: _cloneProps(this.props)
	  };

	  if (typeof this.children !== 'undefined') {
	    node.children = this.tag === 'text'
	      ? String(this.children)
	      : this.children.map(function (child) {
	        return child.tag === 'text' ? _createTextNode(child.children) : child.clone();
	      });
	  }

	  return H(node.tag, node.props, node.children);
	};

	var _cloneProps = function (props, keepRefs) {
	  if (typeof keepRefs === 'undefined') {
	    keepRefs = true;
	  }

	  var attrs = Object.keys(props);
	  var i;
	  var name;
	  var cloned = {};

	  for (i = 0; i < attrs.length; i++) {
	    name = attrs[i];

	    if (typeof props[name] === 'string') {
	      cloned[name] = String(props[name]);
	    } else if (typeof props[name] === 'function' && keepRefs === true) {
	      cloned[name] = props[name];
	    } else if (typeof props[name] === 'boolean') {
	      cloned[name] = Boolean(props[name]);
	    } else if (typeof props[name] === 'object') {
	      cloned[name] = _cloneProps(props[name]);
	    }
	  }

	  return cloned;
	};

	var _stylePropToString = function (props) {
	  var out = '';
	  var attrs = Object.keys(props);

	  for (var i = 0; i < attrs.length; i++) {
	    out += attrs[i].replace(/([A-Z])/g, '-$1').toLowerCase();
	    out += ':';
	    out += props[attrs[i]];
	    out += ';';
	  }

	  return out;
	};

	var _createTextNode = function (text) {
	  return {
	    tag: 'text',
	    children: String(text)
	  };
	};

	var createElement = function (node, parent) {
	  node.el = node.tag === 'text'
	    ? document.createTextNode(node.children)
	    : document.createElement(node.tag);

	  if (typeof node.props !== 'undefined') {
	    node.setProps(node.props);
	  }

	  if (typeof parent !== 'undefined') {
	    parent.appendChild(node.el);
	  }

	  return node.el;
	};

	exports.h = H;
	exports.spatial = spatial;
	exports.createElement = createElement;


/***/ },
/* 23 */
/***/ function(module, exports) {

	/**
	 * Polyfill
	 *
	 * You can polyfill the CustomEvent() constructor
	 * functionality in Internet Explorer 9 and higher with the following code:
	 */

	  (function () {
	    if (typeof window.CustomEvent === 'function') return false;

	    function CustomEvent (event, params) {
	      params = params || { bubbles: false, cancelable: false, detail: undefined };
	      var evt = document.createEvent('CustomEvent');
	      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);

	      return evt;
	    }

	    CustomEvent.prototype = window.Event.prototype;

	    window.CustomEvent = CustomEvent;
	  })();

	/**
	 * SpatialNavigator simulates four-direction navigation in Javascript level.
	 *
	 * Navigation is the ability to navigate between focusable elements
	 * within a structured document or user interface according to the spatial
	 * location. Users are assumed navigating among elements on a 2D plane by
	 * arrow keys (up/down/left/right).
	 *
	 * SpatialNavigator keeps a 'focused' element by itself. When navigating,
	 * focus/unfocus events are triggered automatically. Notice the focus is just
	 * an internal state rather than actual focus of DOM Element. User should
	 * add event listeners of those events, and design required behaviors.
	 *
	 * @class SpatialNavigator
	 * @param {Array.<SpatialNavigatorElement>} [collection=[]]
	 *        An initial set of traversable elements.
	 * @param {Object} [config]
	 *        An initial set of configurations.
	 */
	/**
	 * SpatialNavigatorElement is a navigable element which can be traversed
	 * by {@link SpatialNavigator}. Valid types are as follows:
	 *
	 *  1. a standard HTMLElement.
	 *  2. an Object contains at least 4 properties: left, top, width, and height.
	 *  3. an Object implementing getBoundingRect() which returns an object of 2.
	 *
	 * @typedef {Object} SpatialNavigatorElement
	 */
	/**
	 * Fired when an element is focused.
	 * @event SpatialNavigator#focus
	 * @property {SpatialNavigatorElement} elem    The element which got focus.
	 */
	/**
	 * Fired when an element is unfocused.
	 * @event SpatialNavigator#unfocus
	 * @property {SpatialNavigatorElement} elem    The element which lost focus.
	 */
	  function SpatialNavigator (collection, config) {
	    this._focus = null;
	    this._previous = null;
	    config = config || {};

	    this.setCollection(collection);

	    for (var key in config) {
	      this[key] = config[key];
	    }

	    window.addEventListener('click', this.evClick.bind(this), true);
	    window.addEventListener('keydown', this.evKey.bind(this), true);

	    if (this.autofocus && this.autofocus === true) {
	      window.addEventListener('click', function () { this.focus(); }.bind(this));
	    }
	  }

	  SpatialNavigator.prototype = {
	    cfg: {},
	    /**
	     * Limit the navigating direction to vertical and horizontal only. Targets
	     * in oblique (left-top, right-top, left-bottom, and right-bottom)
	     * directions are always ignored.
	     * @type {Boolean}
	     * @default false
	     * @memberof SpatialNavigator.prototype
	     */
	    straightOnly: false,

	      /**
	       * This threshold is used to determine whether an element is considered in
	       * straight (vertical or horizontal) directions. Valid number is between 0
	       * to 1.0. Setting it to 0.3 means an element is counted in the straight
	       * directions if it overlaps the straight area at least 0.3x of width of the
	       * area.
	       * @type {Number}
	       * @default 0.5
	       * @memberof SpatialNavigator.prototype
	       */
	    straightOverlapThreshold: 0.5,

	      /**
	       * Ignore elements with "display: none", "visibility: hidden" or
	       * "aria-hidden=true".
	       * @type {Boolean}
	       * @default false
	       * @memberof SpatialNavigator.prototype
	       */
	    ignoreHiddenElement: false,

	      /**
	       * The previous focused element has high priority to be chosen as the next
	       * candidate.
	       * @type {Boolean}
	       * @default false
	       * @memberof SpatialNavigator.prototype
	       */
	    rememberSource: false,

	    /**
	     * Postfix of the custom event name
	     *
	     */
	    evtNamePostfix: 'sn',

	      /**
	       * A callback function that accepcts an element as the first argument will
	       * be triggered everytime when SpatialNavigator tries to traverse every
	       * single candidate. You can ignore arbitrary elements by returning "false"
	       * in this function.
	       * @type {Function}
	       * @default null
	       * @memberof SpatialNavigator.prototype
	       */
	    navigableFilter: null,

	      /**
	       * setting this property true prevents spatialNavigator from emitting any
	       * events.
	       * @type {Boolean}
	       */
	    silent: false,

	    evKey: function snKey (evt) {
	      var code = evt.charCode || evt.keyCode;
	      var prevent = this.cfg.preventKeys;

	      function preventKeyPress () {
	        if (prevent === true) {
	          evt.preventDefault();
	        }
	      }

	      switch (code) {
	        case this.cfg.keys.DOWN:
	          this.move('down');
	          preventKeyPress();
	          break;
	        case this.cfg.keys.UP:
	          this.move('up');
	          preventKeyPress();
	          break;
	        case this.cfg.keys.LEFT:
	          this.move('left');
	          preventKeyPress();
	          break;
	        case this.cfg.keys.RIGHT:
	          this.move('right');
	          preventKeyPress();
	          break;
	        case this.cfg.keys.ENTER:
	          if (this._collection.indexOf(evt.target) !== -1) {
	            this.fire('enter', evt.target);
	          }
	          break;
	      }

	      return true;
	    },

	    evClick: function snClick (evt) {
	      this.fire('enter', evt.target);
	      return this.focus(evt.target);
	    },

	    fire: function snFire (evtName, elem) {
	      var evt = new window.CustomEvent(evtName + this.evtNamePostfix,
	        {
	          detail: { name: evtName, element: elem },
	          cancelable: true
	        });

	      var cancelled = !elem.dispatchEvent(evt);

	      if (!cancelled && evtName === 'unfocus') {
	        elem.blur();
	      }

	      if (!cancelled && evtName === 'focus') {
	        elem.focus();
	      }
	      return cancelled;
	    },

	      /**
	       * Rect represents position and dimension of a 2D object.
	       * @typedef {Object} Rect
	       * @property {Integer} left     Left position
	       * @property {Integer} top      Top position
	       * @property {Integer} right    Right position
	       * @property {Integer} bottom   Bottom position
	       * @property {Integer} width    Width dimension
	       * @property {Integer} height   Height dimension
	       * @property {Rect}    [center] Center position
	       * @property {Integer} [x]      same as left
	       * @property {Integer} [y]      same as top
	       * @access private
	       * @memberof SpatialNavigator.prototype
	       */
	      /**
	       * Get {@link Rect} of a {@link SpatialNavigatorElement}.
	       *
	       * @param {SpatialNavigatorElement} elem
	       *
	       * @return {Rect} dimension of elem.
	       *
	       * @access private
	       * @memberof SpatialNavigator.prototype
	       */
	    _getRect: function snGetRect (elem) {
	      var rect = null;

	      if (!this._isNavigable(elem)) {
	        return null;
	      }

	      if (elem.getBoundingClientRect) {
	        var cr = elem.getBoundingClientRect();
	        rect = {
	          left: cr.left,
	          top: cr.top,
	          width: cr.width,
	          height: cr.height
	        };
	      } else if (elem.left !== undefined) {
	        rect = {
	          left: parseInt(elem.left || 0, 10),
	          top: parseInt(elem.top || 0, 10),
	          width: parseInt(elem.width || 0, 10),
	          height: parseInt(elem.height || 0, 10)
	        };
	      } else {
	        return null;
	      }

	      rect.element = elem;
	      rect.right = rect.left + rect.width;
	      rect.bottom = rect.top + rect.height;
	      rect.center = {
	        x: rect.left + Math.floor(rect.width / 2),
	        y: rect.top + Math.floor(rect.height / 2)
	      };
	      rect.center.left = rect.center.right = rect.center.x;
	      rect.center.top = rect.center.bottom = rect.center.y;

	      return rect;
	    },

	      /**
	       * Get all {@link Rect} objects from the collection.
	       *
	       * @param {SpatialNavigatorElement} [excludedElem]
	       *        You can pass excludedElem here to ignore it from calculating.
	       *        (most likely, the currently focused element is passed).
	       *
	       * @return {Array.<Rect>} {@link Rect} objects of all traversable elements.
	       *
	       * @access private
	       * @memberof SpatialNavigator.prototype
	       */
	    _getAllRects: function snGetAllRects (excludedElem) {
	      var rects = [];

	      this._collection.forEach(function (elem) {
	        if (!excludedElem || excludedElem !== elem) {
	          var rect = this._getRect(elem);
	          if (rect) {
	            rects.push(rect);
	          }
	        }
	      }, this);

	      return rects;
	    },

	      /**
	       * Check whether a {@link SpatialNavigatorElement} is navigable.
	       *
	       * @param {SpatialNavigatorElement} elem
	       *
	       * @return {Boolean} true if it's navigable.
	       *
	       * @access private
	       * @memberof SpatialNavigator.prototype
	       */
	    _isNavigable: function snIsNavigable (elem) {
	      if (this.ignoreHiddenElement && elem instanceof window.HTMLElement) {
	        var computedStyle = window.getComputedStyle(elem);
	        if ((elem.offsetWidth <= 0 && elem.offsetHeight <= 0) ||
	            computedStyle.getPropertyValue('visibility') === 'hidden' ||
	            computedStyle.getPropertyValue('display') === 'none' ||
	            elem.hasAttribute('aria-hidden')) {
	          return false;
	        }
	      }
	      if (this.navigableFilter && !this.navigableFilter(elem)) {
	        return false;
	      }
	      return true;
	    },

	      /**
	       * Given a set of {@link Rect} array, divide them into 9 groups with
	       * respect to the position of targetRect. Rects centered inside targetRect
	       * are grouped as 4th group; straight left as 3rd group; straight right as
	       * 5th group; ..... and so on. See below for the corresponding group number:
	       *
	       * <pre>
	       *  |---+---+---|
	       *  | 0 | 1 | 2 |
	       *  |---+---+---|
	       *  | 3 | 4 | 5 |
	       *  |---+---+---|
	       *  | 6 | 7 | 8 |
	       *  |---+---+---|
	       * </pre>
	       *
	       * @param {Array.<Rect>} rects
	       *        {@link RectS} to be divided.
	       * @param {Rect} targetRect
	       *         Reference position for groups.
	       *
	       * @return {Array.Array.<SpatialNavigatorElement>}
	       *         A 9-elements array of array, where rects are categorized into
	       *         these 9 arrays by their group number.
	       *
	       * @access private
	       * @memberof SpatialNavigator.prototype
	       *
	       */
	    _partition: function snDemarcate (rects, targetRect) {
	      var groups = [[], [], [], [], [], [], [], [], []];

	      var threshold = this.straightOverlapThreshold;
	      if (threshold > 1 || threshold < 0) {
	          // Fallback to default value
	        threshold = 0.5;
	      }

	      rects.forEach(function (rect) {
	        var center = rect.center;
	        var x, y, groupId;

	        if (center.x < targetRect.left) {
	          x = 0;
	        } else if (center.x <= targetRect.right) {
	          x = 1;
	        } else {
	          x = 2;
	        }

	        if (center.y < targetRect.top) {
	          y = 0;
	        } else if (center.y <= targetRect.bottom) {
	          y = 1;
	        } else {
	          y = 2;
	        }

	        groupId = y * 3 + x;
	        groups[groupId].push(rect);

	          // Although a rect is in the oblique directions, we categorize it in
	          // the straight area as well if it overlaps the straight directions more
	          // than a specified threshold (0.5 by default).
	        if ([0, 2, 6, 8].indexOf(groupId) !== -1) {
	          if (rect.left <= targetRect.right - targetRect.width * threshold) {
	            if (groupId === 2) {
	              groups[1].push(rect);
	            } else if (groupId === 8) {
	              groups[7].push(rect);
	            }
	          }

	          if (rect.right >= targetRect.left + targetRect.width * threshold) {
	            if (groupId === 0) {
	              groups[1].push(rect);
	            } else if (groupId === 6) {
	              groups[7].push(rect);
	            }
	          }

	          if (rect.top <= targetRect.bottom - targetRect.height * threshold) {
	            if (groupId === 6) {
	              groups[3].push(rect);
	            } else if (groupId === 8) {
	              groups[5].push(rect);
	            }
	          }

	          if (rect.bottom >= targetRect.top + targetRect.height * threshold) {
	            if (groupId === 0) {
	              groups[3].push(rect);
	            } else if (groupId === 2) {
	              groups[5].push(rect);
	            }
	          }
	        }
	      });

	      return groups;
	    },

	      /**
	       * Bind targetRect to a set of distance functions for ranking. These
	       * functions work with another {@link Rect} object passed to get a ranking
	       * value relative to targetRect.
	       *
	       * @param {Rect} targetRect
	       *
	       * @return {Object.<function>}
	       *         An object containing a bunch of functions bound with targetRect.
	       *
	       * @access private
	       * @memberof SpatialNavigator.prototype
	       */
	    _getDistanceFunction: function snGetDistanceFunction (targetRect) {
	      return {
	          /* Plumb Line: a vertical line through the center of the
	           targetRect. */
	        nearPlumbLineIsBetter: function (rect) {
	          var d;
	          if (rect.center.x < targetRect.center.x) {
	            d = targetRect.center.x - rect.right;
	          } else {
	            d = rect.left - targetRect.center.x;
	          }
	          return d < 0 ? 0 : d;
	        },

	          /* Horizon: a horizontal line through the center of the
	           "targetRect". */
	        nearHorizonIsBetter: function (rect) {
	          var d;
	          if (rect.center.y < targetRect.center.y) {
	            d = targetRect.center.y - rect.bottom;
	          } else {
	            d = rect.top - targetRect.center.y;
	          }
	          return d < 0 ? 0 : d;
	        },

	          /* Target Left: a coincident line of the left edge of the
	           "targetRect". */
	        nearTargetLeftIsBetter: function (rect) {
	          var d;
	          if (rect.center.x < targetRect.center.x) {
	            d = targetRect.left - rect.right;
	          } else {
	            d = rect.left - targetRect.left;
	          }
	          return d < 0 ? 0 : d;
	        },

	          /* Target Top: a coincident line of the top edge of the
	           "targetRect". */
	        nearTargetTopIsBetter: function (rect) {
	          var d;
	          if (rect.center.y < targetRect.center.y) {
	            d = targetRect.top - rect.bottom;
	          } else {
	            d = rect.top - targetRect.top;
	          }
	          return d < 0 ? 0 : d;
	        },

	          /* top, bottom, left, and right: Just ranking by absolute coordinate
	           without respect to targetRect. Usually they are used as fallback
	           rules when ranks above are draw. */
	        topIsBetter: function (rect) {
	          return rect.top;
	        },
	        bottomIsBetter: function (rect) {
	          return -1 * rect.bottom;
	        },
	        leftIsBetter: function (rect) {
	          return rect.left;
	        },
	        rightIsBetter: function (rect) {
	          return -1 * rect.right;
	        }
	      };
	    },

	      /**
	       * PrioritySet contains a set of elements with distance functions that
	       * should be used to rank them (obtained from {@link
	       * SpatialNavigator#_getDistanceFunction}).
	       *
	       * @typedef PrioritySet
	       * @property {Array.<Rects>} group
	       *           {@link Rects} of elements that need to be prioritized.
	       * @property {Array.<function>} distance
	       *           Distance functions. Primary ranking rule should be put in index
	       *           0; secondary in index 1 (fallback rule when primary rule draws
	       *           ); and so on.
	       * @access private
	       * @memberof SpatialNavigator.prototype
	       */
	      /**
	       * Pick a {@link Rect} with highest priority.
	       *
	       * @param {Array.<PrioritySet>} priorities
	       *        An array of {@link PrioritySet} that need to be prioritized. The
	       *        set with lowest index containing non-empty {PrioritySet.group}
	       *        would be prioritized.
	       * @param {SpatialNavigatorElement} target
	       *        The origin of coordinates for traversal.
	       * @param {String} direction
	       *        It should be "left", "right", "up" or "down".
	       *
	       * @return {Rect} the {@link Rect} of highest priority.
	       *
	       * @access private
	       * @memberof SpatialNavigator.prototype
	       */
	    _prioritize: function snPrioritize (priorities, target, direction) {
	      var destPriority = null;
	      for (var i = 0; i < priorities.length; i++) {
	        if (priorities[i].group.length) {
	          destPriority = priorities[i];
	          break;
	        }
	      }

	      if (!destPriority) {
	        return null;
	      }

	      if (this.rememberSource &&
	          this._previous &&
	          target === this._previous.destination &&
	          direction === this._previous.reverse) {
	        var source = this._previous.source;
	        var found = destPriority.group.find(function (dest) {
	          return dest.element === source;
	        });
	        if (found) {
	          return found;
	        }
	      }

	      destPriority.group.sort(function (a, b) {
	        return destPriority.distance.reduce(function (answer, distance) {
	          return answer || (distance(a) - distance(b));
	        }, 0);
	      });

	      return destPriority.group[0];
	    },

	      /**
	       * Replace the set of traversable elements.
	       *
	       * @param  {Array.<SpatialNavigatorElement>} [collection=[]]
	               elements to be replaced. The array is deep-copied and never
	               be changed directly by SpatialNavigator.
	       *
	       * @fires SpatialNavigator#unfocus
	       * @memberof SpatialNavigator.prototype
	       */
	    setCollection: function snSetCollection (collection) {
	      this.unfocus();
	      this._collection = [];
	      if (collection) {
	        this.multiAdd(collection);
	      }
	    },

	      /**
	       * Add an element to traversable set.
	       *
	       * @param  {SpatialNavigatorElement} elem
	       * @return {Boolean} true if succeed.
	       *
	       * @memberof SpatialNavigator.prototype
	       */
	    add: function snAdd (elem) {
	      var index = this._collection.indexOf(elem);
	      if (index >= 0) {
	        return false;
	      }
	      this._collection.push(elem);
	      return true;
	    },

	      /**
	       * Add a bunch of elements to traversable set.
	       *
	       * @param  {Array.<SpatialNavigatorElement>} elements
	       * @return {Boolean} true if all elements are added successfully.
	       *
	       * @memberof SpatialNavigator.prototype
	       */
	    multiAdd: function snMultiAdd (elements) {
	      return elements.every(this.add, this);
	    },

	      /**
	       * Remove an element from traversable set.
	       *
	       * @param {SpatialNavigatorElement} elem
	       * @return {Boolean} true if succeed. false if elem does not exist.
	       *
	       * @fires SpatialNavigator#unfocus
	       * @memberof SpatialNavigator.prototype
	       */
	    remove: function snRemove (elem) {
	      var index = this._collection.indexOf(elem);
	      if (index < 0) {
	        return false;
	      }

	      if (this._focus === elem) {
	        this.unfocus();
	      }

	      this._collection.splice(index, 1);
	      return true;
	    },

	      /**
	       * Remove a bunch of elements to traversable set.
	       *
	       * @param  {Array.<SpatialNavigatorElement>} elements
	       * @return {Boolean} true if all elements are removed successfully.
	       *
	       * @memberof SpatialNavigator.prototype
	       */
	    multiRemove: function snMultiRemove (elements) {
	      return Array.from(elements).every(this.remove, this);
	    },

	      /**
	       * Move focus to an existing element.
	       *
	       * @param  {SpatialNavigatorElement} [elem]
	       *         when omitted, it focuses the last focused element or the first
	       *         navigable element if no previously-focused element is found.
	       *
	       * @return {Boolean} true if succeed. false if element doesn't exist.
	       *
	       * @fires SpatialNavigator#focus
	       * @fires SpatialNavigator#unfocus
	       * @memberof SpatialNavigator.prototype
	       */
	    focus: function snFocus (elem) {
	        // If no arguments are received, let current focused element be the
	        // default.
	      if (!elem && this._focus && this._isNavigable(this._focus)) {
	        elem = this._focus;
	      }

	      if (!this._collection) {
	        return false;
	      }

	      if (!elem) {
	        var navigableElems = this._collection.filter(this._isNavigable, this);
	        if (!navigableElems.length) {
	          return false;
	        }
	        elem = navigableElems[0];
	      } else if (this._collection.indexOf(elem) < 0 ||
	          !this._isNavigable(elem)) {
	        return false;
	      }

	      this.unfocus();
	      this._focus = elem;

	      if (!this.silent) {
	        this.fire('focus', this._focus);
	      }
	      return true;
	    },

	      /**
	       * Remove focus if any.
	       *
	       * It will trigger "unfocus" event.
	       *
	       * @return {Boolean} succeed or not.
	       *
	       * @fires SpatialNavigator#unfocus
	       * @memberof SpatialNavigator.prototype
	       */
	    unfocus: function snUnfocus () {
	      if (this._focus) {
	        var elem = this._focus;
	        this._focus = null;
	        if (!this.silent) {
	          this.fire('unfocus', elem);
	        }
	      }
	      return true;
	    },

	      /**
	       * Get the currently focused element.
	       *
	       * @return {SpatialNavigatorElement} or null if nothing focused.
	       *
	       * @memberof SpatialNavigator.prototype
	       */
	    getFocusedElement: function snGetFocusedElement () {
	      return this._focus;
	    },

	      /**
	       * Given a direction, find the element nearest to the focus element in that
	       * direction. This is equivalent to {@link SpatialNavigator#navigate} with
	       * focused element passed as target.
	       *
	       * @param {String} direction
	       *        It should be "left", "right", "up" or "down".
	       *
	       * @return {Boolean} true if succeed, false if nothing can be focused.
	       *
	       * @memberof SpatialNavigator.prototype
	       */
	    move: function snMove (direction) {
	      var reverse = {
	        'left': 'right',
	        'up': 'down',
	        'right': 'left',
	        'down': 'up'
	      };

	      if (!this._focus) {
	        this._previous = null;
	        this.focus();
	      } else {
	        var elem = this.navigate(this._focus, direction);
	        if (!elem) {
	          return false;
	        }
	        if (this.rememberSource) {
	          this._previous = {
	            source: this._focus,
	            destination: elem,
	            reverse: reverse[direction.toLowerCase()]
	          };
	        }
	        this.unfocus();
	        this.focus(elem);
	      }
	      return true;
	    },

	      /**
	       * Given a direction, find an element nearest to the target element in that
	       * direction.
	       *
	       * @param {SpatialNavigatorElement} target
	       *        The origin of coordinates for traversal.
	       * @param {String} direction
	       *        It should be "left", "right", "up" or "down".
	       *
	       * @return {SpatialNavigatorElement}
	       *         The destination of the element which has the highest priority.
	       *
	       * @memberof SpatialNavigator.prototype
	       */
	    navigate: function snNavigate (target, direction) {
	      if (!target || !direction || !this._collection) {
	        return null;
	      }

	      direction = direction.toLowerCase();

	      var rects = this._getAllRects(target);
	      var targetRect = this._getRect(target);
	      if (!targetRect || !rects.length) {
	        return null;
	      }

	        /* Get distance functions for ranking priorities relative to targetRect */
	      var distanceFunction = this._getDistanceFunction(targetRect);

	        /* Candidate {@link Rect}s are divided into nine regions based on its
	         position with respect to targetRect. */
	      var groups = this._partition(rects, targetRect);

	        /* {@link Rect}s in group 4 overlaps with targetRect. We distribute them
	         further into 9 regions based on its position with respect to the
	         center point of targetRect. */
	      var internalGroups = this._partition(groups[4], targetRect.center);

	        /* priorities: This big array carrys candidate elements with related
	         * distance functions by appropriate priority we want. Depenging on the
	         * direction, 3 kinds of elements are added separately in the following
	         * order:
	         *
	         *   - 1st: candidates centered inside targetRect (group 4)
	         *          (so we pick up corresponding internalGroups).
	         *   - 2nd: in groups of straight direction (group 1, 3, 5, 7).
	         *   - 3rd: in groups of oblique direction (group 0, 2, 6, 8).
	         *
	         * For each kind of element above, ranking is performed by the following
	         * rules (distance functions) in order:
	         *
	         *   - 1st: distance between candidate and target.
	         *   - 2nd: absolute coordinate of candidates.
	         *   - 3rd: distance of left or top coordinate between candidate and
	         *          target (for oblique direction only)
	         *
	         * The switch...case block below is just to construct this array.
	         * We just pick the required order into array here, then call
	         * {SpatialNavigator#_prioritize} to do the trick.
	         */
	      var priorities;

	      switch (direction) {
	        case 'left':
	          priorities = [
	            {
	              group: internalGroups[0].concat(internalGroups[3])
	                .concat(internalGroups[6]),
	              distance: [
	                distanceFunction.nearPlumbLineIsBetter,
	                distanceFunction.topIsBetter
	              ]
	            },
	            {
	              group: groups[3],
	              distance: [
	                distanceFunction.nearPlumbLineIsBetter,
	                distanceFunction.topIsBetter
	              ]
	            },
	            {
	              group: groups[0].concat(groups[6]),
	              distance: [
	                distanceFunction.nearHorizonIsBetter,
	                distanceFunction.rightIsBetter,
	                distanceFunction.nearTargetTopIsBetter
	              ]
	            }
	          ];
	          break;
	        case 'right':
	          priorities = [
	            {
	              group: internalGroups[2].concat(internalGroups[5])
	                .concat(internalGroups[8]),
	              distance: [
	                distanceFunction.nearPlumbLineIsBetter,
	                distanceFunction.topIsBetter
	              ]
	            },
	            {
	              group: groups[5],
	              distance: [
	                distanceFunction.nearPlumbLineIsBetter,
	                distanceFunction.topIsBetter
	              ]
	            },
	            {
	              group: groups[2].concat(groups[8]),
	              distance: [
	                distanceFunction.nearHorizonIsBetter,
	                distanceFunction.leftIsBetter,
	                distanceFunction.nearTargetTopIsBetter
	              ]
	            }
	          ];
	          break;
	        case 'up':
	          priorities = [
	            {
	              group: internalGroups[0].concat(internalGroups[1])
	                .concat(internalGroups[2]),
	              distance: [
	                distanceFunction.nearHorizonIsBetter,
	                distanceFunction.leftIsBetter
	              ]
	            },
	            {
	              group: groups[1],
	              distance: [
	                distanceFunction.nearHorizonIsBetter,
	                distanceFunction.leftIsBetter
	              ]
	            },
	            {
	              group: groups[0].concat(groups[2]),
	              distance: [
	                distanceFunction.nearPlumbLineIsBetter,
	                distanceFunction.bottomIsBetter,
	                distanceFunction.nearTargetLeftIsBetter
	              ]
	            }
	          ];
	          break;
	        case 'down':
	          priorities = [
	            {
	              group: internalGroups[6].concat(internalGroups[7])
	                .concat(internalGroups[8]),
	              distance: [
	                distanceFunction.nearHorizonIsBetter,
	                distanceFunction.leftIsBetter
	              ]
	            },
	            {
	              group: groups[7],
	              distance: [
	                distanceFunction.nearHorizonIsBetter,
	                distanceFunction.leftIsBetter
	              ]
	            },
	            {
	              group: groups[6].concat(groups[8]),
	              distance: [
	                distanceFunction.nearPlumbLineIsBetter,
	                distanceFunction.topIsBetter,
	                distanceFunction.nearTargetLeftIsBetter
	              ]
	            }
	          ];
	          break;
	        default:
	          return null;
	      }

	      if (this.straightOnly) {
	          // Ignore candidates in oblique direction.
	        priorities.pop();
	      }

	      var dest = this._prioritize(priorities, target, direction);
	      if (!dest) {
	        return null;
	      }

	      return dest.element;
	    }
	  };

	  module.exports = SpatialNavigator;



/***/ },
/* 24 */
/***/ function(module, exports) {

	/*
	 * Diff
	 */

	var PATCH_CREATE = 0;
	var PATCH_REMOVE = 1;
	var PATCH_REPLACE = 2;
	var PATCH_REORDER = 3;
	var PATCH_PROPS = 4;

	/**
	 * Diff two virtual dom trees
	 *
	 * @name diff
	 * @function
	 * @access public
	 * @param {Object} oldNode virtual tree to compare
	 * @param {Object} newNode virtual tree to compare with
	 */
	var diff = function (oldNode, newNode) {
	  if (typeof oldNode === 'undefined' || typeof newNode === 'undefined') {
	    throw new Error('cannot diff undefined nodes');
	  }

	  if (!_isNodeSame(oldNode, newNode)) {
	    throw new Error('unable create diff replace for root node');
	  }

	  return _diffTree(oldNode, newNode, []);
	};

	/**
	 * Tree walker function
	 *
	 * @name _diffTree
	 * @function
	 * @access private
	 * @param {} a
	 * @param {} b
	 * @param {} patches
	 */
	var _diffTree = function (a, b, patches) {
	  _diffProps(a, b, patches);

	  if (b.tag === 'text') {
	    if (b.children !== a.children) {
	      patches.push({ t: PATCH_REPLACE, node: a, with: b });
	    }
	    return;
	  }

	  if (Array.isArray(b.children)) {
	    _diffChild(a.children, b.children, a, patches);
	  } else if (Array.isArray(a.children)) {
	    for (var i = 0; i < a.children.length; i++) {
	      patches.push({ t: PATCH_REMOVE, from: i, node: _nodeId(a), item: _nodeId(a.children[i]) });
	    }
	  }

	  return patches;
	};

	/**
	 * Tree children diffings
	 *
	 * @name _diffChild
	 * @function
	 * @access private
	 * @param {} a
	 * @param {} b
	 * @param {} pn
	 * @param {} patches
	 */
	var _diffChild = function (a, b, pn, patches) {
	  var reorderMap = [];
	  var i;
	  var j;
	  var found;

	  for (i = 0; i < b.length; i++) {
	    found = false;

	    if (!a) {
	      if (!pn.children) {
	        pn.children = [];
	      }

	      if (b[i].tag === 'text') {
	        patches.push({ t: PATCH_CREATE, to: i, node: _nodeId(pn), item: _nodeId(b[i]) });
	      } else {
	        patches.push({ t: PATCH_CREATE, to: i, node: _nodeId(pn), item: _nodeId(b[i].clone()) });
	      }
	      continue;
	    }

	    for (j = 0; j < a.length; j++) {
	      if (_isNodeSame(a[j], b[i]) && reorderMap.indexOf(a[j]) === -1) {
	        if (j !== i) {
	          patches.push({ t: PATCH_REORDER, from: j, to: i, node: _nodeId(pn), item: _nodeId(a[j]) });
	        }
	        reorderMap.push(a[j]);

	        _diffTree(a[j], b[i], patches);
	        found = true;
	        break;
	      }
	    }

	    if (found === false) {
	      reorderMap.push(null);
	      patches.push({ t: PATCH_CREATE, to: i, node: _nodeId(pn), item: b[i].tag === 'text' ? _nodeId(b[i]) : _nodeId(b[i].clone()) });
	    }
	  }

	  if (!a) return;

	  for (i = 0; i < a.length; i++) {
	    if (reorderMap.indexOf(a[i]) === -1) {
	      patches.push({ t: PATCH_REMOVE, from: i, node: _nodeId(pn), item: _nodeId(a[i]) });
	    }
	  }
	};

	/**
	 * Props diffings
	 *
	 * @name _diffProps
	 * @function
	 * @access private
	 * @param {} a
	 * @param {} b
	 * @param {} patches
	 * @param {} type
	 */
	var _diffProps = function (a, b, patches) {
	  if (!a || !b || !a.props && !b.props) {
	    return;
	  }

	  var toChange = [];
	  var toRemove = [];
	  var battrs = Object.keys(b.props);
	  var aattrs = Object.keys(a.props);
	  var aattrsLen = aattrs.filter(function (attr) {
	    return (attr !== 'ref' && !(attr.match(/^on/)) && attr !== 'focusable');
	  }).length;
	  var i;

	  if (a.el && a.el.attributes.length !== aattrsLen) {
	    for (i = 0; i < a.el.attributes.length; i++) {
	      var attr = a.el.attributes[i];
	      var name = attr.name;

	      if (name === 'class') {
	        name = 'className';
	      }

	      if (!(name in aattrs)) {
	        a.props[name] = attr.value;
	      }

	      if (attr.value !== a.props[name]) {
	        a.props[name] = attr.value;
	      }
	    }
	    aattrs = Object.keys(a.props);
	  }

	  for (i = 0; i < battrs.length || i < aattrs.length; i++) {
	    if (i < battrs.length) {
	      if (!(battrs[i] in a.props) || b.props[battrs[i]] !== a.props[battrs[i]]) {
	        toChange.push({ name: battrs[i], value: b.props[battrs[i]] });
	      }
	    }

	    if (i < aattrs.length) {
	      if (!(aattrs[i] in b.props)) {
	        toRemove.push({ name: aattrs[i] });
	      }
	    }
	  }

	  if (toRemove.length > 0) {
	    patches.push({ t: PATCH_PROPS, remove: toRemove, node: _nodeId(a) });
	  }

	  if (toChange.length > 0) {
	    patches.push({ t: PATCH_PROPS, change: toChange, node: _nodeId(a) });
	  }
	};

	/**
	 * Node identifier
	 *
	 * @name _nodeId
	 * @function
	 * @access private
	 * @param {} node
	 */
	var _nodeId = function (node) {
	  return node;
	};

	/**
	 * Nodes comparison
	 *
	 * @name _isNodeSame
	 * @function
	 * @access private
	 * @param {} a
	 * @param {} b
	 */
	var _isNodeSame = function (a, b) {
	  return a.tag === b.tag;
	};

	exports.PATCH_CREATE = PATCH_CREATE;
	exports.PATCH_REMOVE = PATCH_REMOVE;
	exports.PATCH_REPLACE = PATCH_REPLACE;
	exports.PATCH_REORDER = PATCH_REORDER;
	exports.PATCH_PROPS = PATCH_PROPS;
	exports.diff = diff;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Patch
	 */

	var PATCH_CREATE = __webpack_require__(24).PATCH_CREATE;
	var PATCH_REMOVE = __webpack_require__(24).PATCH_REMOVE;
	var PATCH_REPLACE = __webpack_require__(24).PATCH_REPLACE;
	var PATCH_REORDER = __webpack_require__(24).PATCH_REORDER;
	var PATCH_PROPS = __webpack_require__(24).PATCH_PROPS;

	var createElement = __webpack_require__(22).createElement;

	/**
	 * Patch DOM and virtual tree
	 *
	 * @name patch
	 * @function
	 * @access public
	 * @param {Object} tree Tree to patch
	 * @param {Array} patches Array of patches
	 */
	var patch = function (tree, patches) {
	  var render = true;

	  if (typeof tree.el === 'undefined') {
	    render = false;
	  }

	  for (var i = 0; i < patches.length; i++) {
	    var p = patches[i];

	    switch (p.t) {
	      case PATCH_REORDER:
	        _patchReorder(p, render);
	        break;
	      case PATCH_CREATE:
	        _patchCreate(p, render);
	        break;
	      case PATCH_REMOVE:
	        _patchRemove(p, render);
	        break;
	      case PATCH_REPLACE:
	        _patchReplace(p, render);
	        break;
	      case PATCH_PROPS:
	        _patchProps(p, render);
	        break;
	    }
	  }
	};

	/**
	 * Replace existen node content
	 *
	 * @name patchReplace
	 * @function
	 * @access private
	 */
	var _patchReplace = function (p, render) {
	  p.node.children = String(p.with.children);

	  if (render === true) {
	    p.node.el.nodeValue = String(p.with.children);
	  }
	};

	/**
	 * Reorder existen node
	 *
	 * @name patchReorder
	 * @function
	 * @access private
	 */
	var _patchReorder = function (p, render) {
	  if (render === true) {
	    p.node.el.insertBefore(p.item.el, p.node.el.childNodes[p.to]);
	  }

	  p.node.children.splice(p.to, 0,
	    p.node.children.splice(p.node.children.indexOf(p.item), 1)[0]);
	};

	/**
	 * Create new tree node
	 *
	 * @name patchCreate
	 * @function
	 * @access private
	 */
	var _patchCreate = function (p, render) {
	  var element;

	  if (render === true) {
	    element = p.item.tag === 'text'
	      ? createElement(p.item) : p.item.render();
	  }

	  if (p.node.children.length - 1 < p.to) {
	    p.node.children.push(p.item);

	    if (render === true) {
	      p.node.el.appendChild(element);
	    }
	  } else {
	    p.node.children.splice(p.to, 0, p.item);

	    if (render === true) {
	      p.node.el.insertBefore(element, p.node.el.childNodes[p.to]);
	    }
	  }
	};

	/**
	 * Remove tree node
	 *
	 * @name patchRemove
	 * @function
	 * @access private
	 */
	var _patchRemove = function (p, render) {
	  if (render === true) {
	    if (p.item.props && 'focusable' in p.item.props) {
	      p.item.removeSpatial();
	    }
	    p.node.el.removeChild(p.item.el);
	  }

	  for (var i = 0; i < p.node.children.length; i++) {
	    if (p.node.children[i] === p.item) {
	      p.node.children.splice(i, 1);
	    }
	  }
	};

	/**
	 * Replace props
	 *
	 * @name _patchProps
	 * @function
	 * @access private
	 */
	var _patchProps = function (p) {
	  var i;

	  if ('remove' in p) {
	    for (i = 0; i < p.remove.length; i++) {
	      p.node.rmProp(p.remove[i].name);
	    }
	    return;
	  }

	  if ('change' in p) {
	    for (i = 0; i < p.change.length; i++) {
	      p.node.setProp(p.change[i].name, p.change[i].value);
	    }
	    return;
	  }
	};

	exports.patch = patch;


/***/ },
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var raf = __webpack_require__(31),
	    COMPLETE = 'complete',
	    CANCELED = 'canceled';

	function setElementScroll(element, x, y){
	    if(element === window){
	        element.scrollTo(x, y);
	    }else{
	        element.scrollLeft = x;
	        element.scrollTop = y;
	    }
	}

	function getTargetScrollLocation(target, parent, align){
	    var targetPosition = target.getBoundingClientRect(),
	        parentPosition,
	        x,
	        y,
	        differenceX,
	        differenceY,
	        leftAlign = align && align.left != null ? align.left : 0.5,
	        topAlign = align && align.top != null ? align.top : 0.5,
	        leftScalar = leftAlign,
	        topScalar = topAlign;

	    if(parent === window){
	        x = targetPosition.left + window.scrollX - window.innerWidth * leftScalar + Math.min(targetPosition.width, window.innerWidth) * leftScalar;
	        y = targetPosition.top + window.scrollY - window.innerHeight * topScalar + Math.min(targetPosition.height, window.innerHeight) * topScalar;
	        x = Math.max(Math.min(x, document.body.scrollWidth - window.innerWidth * leftScalar), 0);
	        y = Math.max(Math.min(y, document.body.scrollHeight- window.innerHeight * topScalar), 0);
	        differenceX = x - window.scrollX;
	        differenceY = y - window.scrollY;
	    }else{
	        parentPosition = parent.getBoundingClientRect();
	        var offsetTop = targetPosition.top - (parentPosition.top - parent.scrollTop);
	        var offsetLeft = targetPosition.left - (parentPosition.left - parent.scrollLeft);
	        x = offsetLeft + (targetPosition.width * leftScalar) - parent.clientWidth * leftScalar;
	        y = offsetTop + (targetPosition.height * topScalar) - parent.clientHeight * topScalar;
	        x = Math.max(Math.min(x, parent.scrollWidth - parent.clientWidth), 0);
	        y = Math.max(Math.min(y, parent.scrollHeight - parent.clientHeight), 0);
	        differenceX = x - parent.scrollLeft;
	        differenceY = y - parent.scrollTop;
	    }

	    return {
	        x: x,
	        y: y,
	        differenceX: differenceX,
	        differenceY: differenceY
	    };
	}

	function animate(parent){
	    raf(function(){
	        var scrollSettings = parent._scrollSettings;
	        if(!scrollSettings){
	            return;
	        }

	        var location = getTargetScrollLocation(scrollSettings.target, parent, scrollSettings.align),
	            time = Date.now() - scrollSettings.startTime,
	            timeValue = Math.min(1 / scrollSettings.time * time, 1);

	        if(
	            time > scrollSettings.time + 20 ||
	            (Math.abs(location.differenceY) <= 1 && Math.abs(location.differenceX) <= 1)
	        ){
	            setElementScroll(parent, location.x, location.y);
	            parent._scrollSettings = null;
	            return scrollSettings.end(COMPLETE);
	        }

	        var easeValue = 1 - scrollSettings.ease(timeValue);

	        setElementScroll(parent,
	            location.x - location.differenceX * easeValue,
	            location.y - location.differenceY * easeValue
	        );

	        animate(parent);
	    });
	}

	function transitionScrollTo(target, parent, settings, callback){
	    var idle = !parent._scrollSettings,
	        lastSettings = parent._scrollSettings,
	        now = Date.now();

	    if(lastSettings){
	        lastSettings.end(CANCELED);
	    }

	    function end(endType){
	        parent._scrollSettings = null;
	        callback(endType);
	        settings.cancelOnTouch === true && parent.removeEventListener('touchstart', end);
	    }

	    parent._scrollSettings = {
	        startTime: lastSettings ? lastSettings.startTime : Date.now(),
	        target: target,
	        time: settings.time + (lastSettings ? now - lastSettings.startTime : 0),
	        ease: settings.ease,
	        align: settings.align,
	        end: end
	    };

	    settings.cancelOnTouch === true && parent.addEventListener('touchstart', end.bind(null, CANCELED));

	    if(idle){
	        animate(parent);
	    }
	}

	module.exports = function(target, settings, callback){
	    if(!target){
	        return;
	    }

	    if(typeof settings === 'function'){
	        callback = settings;
	        settings = null;
	    }

	    if(!settings){
	        settings = {};
	    }

	    settings.time = isNaN(settings.time) ? 1000 : settings.time;
	    settings.ease = settings.ease || function(v){return 1 - Math.pow(1 - v, v / 2);};

	    var parent = target.parentElement,
	        parents = 0;

	    function done(endType){
	        parents--;
	        if(!parents){
	            callback && callback(endType);
	        }
	    }

	    while(parent){
	        if(
	            // If there is a validTarget function, check it.
	            (settings.validTarget ? settings.validTarget(parent, parents) : true) &&

	            // Else if window
	            parent === window ||

	            // Else...
	            (
	                /// check if scrollable
	                (
	                    parent.scrollHeight !== parent.clientHeight ||
	                    parent.scrollWidth !== parent.clientWidth
	                ) &&

	                // And not hidden.
	                getComputedStyle(parent).overflow !== 'hidden'
	            )
	        ){
	            parents++;
	            transitionScrollTo(target, parent, settings, done);
	        }

	        parent = parent.parentElement;

	        if(!parent){
	            return;
	        }

	        if(parent.tagName === 'BODY'){
	            parent = window;
	        }
	    }
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var now = __webpack_require__(32)
	  , root = typeof window === 'undefined' ? global : window
	  , vendors = ['moz', 'webkit']
	  , suffix = 'AnimationFrame'
	  , raf = root['request' + suffix]
	  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]

	for(var i = 0; !raf && i < vendors.length; i++) {
	  raf = root[vendors[i] + 'Request' + suffix]
	  caf = root[vendors[i] + 'Cancel' + suffix]
	      || root[vendors[i] + 'CancelRequest' + suffix]
	}

	// Some versions of FF have rAF but not cAF
	if(!raf || !caf) {
	  var last = 0
	    , id = 0
	    , queue = []
	    , frameDuration = 1000 / 60

	  raf = function(callback) {
	    if(queue.length === 0) {
	      var _now = now()
	        , next = Math.max(0, frameDuration - (_now - last))
	      last = next + _now
	      setTimeout(function() {
	        var cp = queue.slice(0)
	        // Clear queue here to prevent
	        // callbacks from appending listeners
	        // to the current frame's queue
	        queue.length = 0
	        for(var i = 0; i < cp.length; i++) {
	          if(!cp[i].cancelled) {
	            try{
	              cp[i].callback(last)
	            } catch(e) {
	              setTimeout(function() { throw e }, 0)
	            }
	          }
	        }
	      }, Math.round(next))
	    }
	    queue.push({
	      handle: ++id,
	      callback: callback,
	      cancelled: false
	    })
	    return id
	  }

	  caf = function(handle) {
	    for(var i = 0; i < queue.length; i++) {
	      if(queue[i].handle === handle) {
	        queue[i].cancelled = true
	      }
	    }
	  }
	}

	module.exports = function(fn) {
	  // Wrap in a new function to prevent
	  // `cancel` potentially being assigned
	  // to the native rAF function
	  return raf.call(root, fn)
	}
	module.exports.cancel = function() {
	  caf.apply(root, arguments)
	}
	module.exports.polyfill = function() {
	  root.requestAnimationFrame = raf
	  root.cancelAnimationFrame = caf
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.7.1
	(function() {
	  var getNanoSeconds, hrtime, loadTime;

	  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
	    module.exports = function() {
	      return performance.now();
	    };
	  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
	    module.exports = function() {
	      return (getNanoSeconds() - loadTime) / 1e6;
	    };
	    hrtime = process.hrtime;
	    getNanoSeconds = function() {
	      var hr;
	      hr = hrtime();
	      return hr[0] * 1e9 + hr[1];
	    };
	    loadTime = getNanoSeconds();
	  } else if (Date.now) {
	    module.exports = function() {
	      return Date.now() - loadTime;
	    };
	    loadTime = Date.now();
	  } else {
	    module.exports = function() {
	      return new Date().getTime() - loadTime;
	    };
	    loadTime = new Date().getTime();
	  }

	}).call(this);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(33)))

/***/ },
/* 33 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }
/******/ ]);