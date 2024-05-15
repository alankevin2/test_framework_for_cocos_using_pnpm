function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var EventDispatcher = /*#__PURE__*/function () {
  function EventDispatcher() {
    _classCallCheck(this, EventDispatcher);
  }
  return _createClass(EventDispatcher, null, [{
    key: "addListener",
    value: function addListener(event, callback) {
      var arr = this.listeners.get(event);
      if (!arr) {
        this.listeners.set(event, [callback]);
      } else {
        arr.push(callback);
      }
    }
  }, {
    key: "remove",
    value: function remove(event, callback) {
      var arr = this.listeners.get(event);
      if (callback) {
        var index = arr.indexOf(callback);
        if (index != -1) {
          arr = arr.splice(0, index).concat(arr.splice(index, arr.length));
          this.listeners.set(event, arr);
        }
      } else {
        this.listeners.set(event, []);
      }
    }
  }, {
    key: "removeAllListeners",
    value: function removeAllListeners() {
      this.listeners.clear();
    }
  }, {
    key: "emit",
    value: function emit(event, data) {
      var arr = this.listeners.get(event);
      arr && arr.forEach(function (cb) {
        cb(data);
      });
    }
  }]);
}();
_defineProperty(EventDispatcher, "listeners", new Map());

var Networking = /*#__PURE__*/function () {
  function Networking() {
    _classCallCheck(this, Networking);
  }
  return _createClass(Networking, [{
    key: "start",
    value: function start() {
      setTimeout(function () {
        EventDispatcher.emit(NetworkingEvents.DATA1, {
          name: 'This is data1',
          value: 0
        });
      }, 5000);
      setTimeout(function () {
        EventDispatcher.emit(NetworkingEvents.DATA1, {
          name: 'This is data1 updated',
          value: 123
        });
      }, 15000);
      setTimeout(function () {
        EventDispatcher.emit(NetworkingEvents.DATA2, {
          name: 'This is data2',
          value: 'first time111111'
        });
      }, 10000);
      setTimeout(function () {
        EventDispatcher.emit(NetworkingEvents.DATA2, {
          name: 'This is data2',
          value: 'first time222222'
        });
      }, 15000);
    }
  }]);
}();
var NetworkingEvents;
(function (NetworkingEvents) {
  NetworkingEvents["DATA1"] = "DATA1";
  NetworkingEvents["DATA2"] = "DATA2";
})(NetworkingEvents || (NetworkingEvents = {}));

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function bind(binder) {
  return function (target, key) {
    target[MakeBindKey(key)] = null;
    target[MakeBinderKey(key)] = binder;
  };
}
function bindable(target, key) {
  target[MakeBindableKey(key)] = null;
}
var MakeBindKey = function MakeBindKey(key) {
  return '_bind_' + key + '_bind_';
};
var MakeBinderKey = function MakeBinderKey(key) {
  return '_binder_' + key + '_binder_';
};
var MakeBindableKey = function MakeBindableKey(key) {
  return '_bindable_' + key + '_bindable_';
};
var BindRegExp = /^_bind_([a-zA-Z][a-zA-Z0-9]*)_bind_$/;
var BindableRegExp = /^_bindable_([a-zA-Z][a-zA-Z0-9]*)_bindable_$/;
function UseViewModel(VMClass) {
  return function (target) {
    if (Object.getPrototypeOf(target) != View) {
      throw new Error('UseViewModel can only apply on those who inherits View');
    }
    var vmInstance = new VMClass(target);
    vmInstance.startBinding();
    target['__comp__vm__'] = vmInstance;
  };
}

var Decorator = /*#__PURE__*/Object.freeze({
  __proto__: null,
  BindRegExp: BindRegExp,
  BindableRegExp: BindableRegExp,
  MakeBindKey: MakeBindKey,
  MakeBindableKey: MakeBindableKey,
  MakeBinderKey: MakeBinderKey,
  UseViewModel: UseViewModel,
  bind: bind,
  bindable: bindable
});

var ViewModel = /*#__PURE__*/function () {
  function ViewModel(comp) {
    _classCallCheck(this, ViewModel);
    _defineProperty(this, "dependent", void 0);
    _defineProperty(this, "dependentClass", void 0);
    this.dependentClass = comp;
  }
  return _createClass(ViewModel, [{
    key: "startBinding",
    value: function startBinding() {
      var _this = this;
      var keys = Object.keys(Object.getPrototypeOf(this));
      keys.forEach(function (k) {
        if (BindableRegExp.test(k)) {
          var retrieveKey = BindableRegExp.exec(k)[1];
          _this[k] = _this[retrieveKey];
          Object.defineProperty(_this, retrieveKey, {
            set: function set(newVal) {
              var prev = this[k];
              if (prev == newVal) {
                return;
              }
              this[k] = newVal;
              this.dependent && this.dependent.isValid && this.dependent.modelDidChange(retrieveKey, newVal, prev);
            },
            get: function get() {
              return this[k];
            },
            configurable: true,
            enumerable: true
          });
        }
      });
    }
  }, {
    key: "componentLoaded",
    value: function componentLoaded(comp) {
      this.dependent = comp;
      if (this.dependent.constructor.name != this.dependentClass.name) {
        throw new Error("Component is loaded into ViewModel but did not match Class name which was originally set. \n                ".concat(this.dependent.constructor.name, " and ").concat(this.dependentClass.name, " not match."));
      }
    }
  }]);
}();

function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var View = /*#__PURE__*/function (_cc$Component) {
  function View() {
    var _this;
    _classCallCheck(this, View);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, View, [].concat(args));
    _defineProperty(_this, "dependentDestroyed", void 0);
    _defineProperty(_this, "viewModel", void 0);
    _defineProperty(_this, "keysWithBinder", void 0);
    return _this;
  }
  _inherits(View, _cc$Component);
  return _createClass(View, [{
    key: "onLoad",
    value: function onLoad() {
      var _this2 = this;
      this.viewModel = this.constructor['__comp__vm__'];
      this.viewModel.componentLoaded(this);
      this.keysWithBinder = new Map();
      var checkIfOneVm;
      var toBeBounded = [];
      var keys = Object.keys(this);
      keys.forEach(function (k) {
        if (_this2[k] instanceof ViewModel) {
          if (!checkIfOneVm) {
            checkIfOneVm = _this2[k];
          } else {
            throw new Error("No more than one ViewModel for a component! \n ViewModel key=".concat(k, " is prohibited!"));
          }
        }
      });
      var keysOfPrototype = Object.keys(Object.getPrototypeOf(this));
      keysOfPrototype.forEach(function (k) {
        if (BindRegExp.test(k)) {
          toBeBounded.push(k);
        }
      });
      this.viewModel && this.startBinding(this.viewModel, toBeBounded);
    }
  }, {
    key: "onDestroy",
    value: function onDestroy() {
      this.dependentDestroyed = true;
    }
  }, {
    key: "startBinding",
    value: function startBinding(vm, properties) {
      var _this3 = this;
      var prototype = Object.getPrototypeOf(this);
      properties.forEach(function (k) {
        var originKey = BindRegExp.exec(k) ? BindRegExp.exec(k)[1] : '';
        var vmKey = MakeBindableKey(originKey);
        if (!("".concat(vmKey) in vm)) {
          throw new Error("Did not find key=".concat(vmKey, " in the ViewModel!"));
        }
        Object.defineProperty(_this3, originKey, {
          get: function get() {
            return vm[originKey];
          },
          configurable: false,
          enumerable: false
        });
        var binder = prototype[MakeBinderKey(originKey)];
        _this3.keysWithBinder.set(originKey, binder);
        if (binder && vm[originKey]) {
          _this3.executeBinding(binder, k, vm[originKey]);
        }
      });
    }
  }, {
    key: "executeBinding",
    value: function executeBinding(binder, key, value) {
      var isSetter = !binder.includes('()');
      if (isSetter) {
        try {
          switch (_typeof(value)) {
            case 'undefined':
            case 'boolean':
            case 'number':
              eval("".concat(binder, "=").concat(value));
              break;
            case 'string':
              eval("".concat(binder, "='").concat(value, "'"));
              break;
            case 'object':
              eval("".concat(binder, "=value"));
              break;
            default:
              throw new Error("@bind did not support this type: ".concat(_typeof(value)));
          }
        } catch (e) {
          console.error("modelDidChange error occurred while executing ".concat(binder, " for key:").concat(key, " and value:").concat(value), e);
        }
      } else {
        try {
          eval(binder.replace('()', '(value)'));
        } catch (e) {
          console.error("modelDidChange error occurred while executing ".concat(binder, " for key:").concat(key, " and value:").concat(value), e);
        }
      }
    }
  }, {
    key: "modelDidChange",
    value: function modelDidChange(key, value, previousValue) {
      if (!this.keysWithBinder) {
        return;
      }
      var binder = this.keysWithBinder.get(key);
      if (binder) {
        this.executeBinding(binder, key, value);
      }
    }
  }]);
}(cc.Component);

var framework = {
  Networking: Networking,
  NetworkingEvents: NetworkingEvents,
  EventDispatcher: EventDispatcher,
  MVVM: {
    View: View,
    ViewModel: ViewModel,
    Decorator: Decorator
  }
};

export { framework as default };
