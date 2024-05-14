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

var framework = {
  Networking: Networking,
  EventDispatcher: EventDispatcher
};

export { framework as default };
