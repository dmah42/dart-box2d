//  ********** Library dart:core **************
//  ********** Natives dart:core **************
Object.defineProperty(Object.prototype, '$typeNameOf', { value: function() {
  if ((typeof(window) != 'undefined' && window.constructor.name == 'DOMWindow')
      || typeof(process) != 'undefined') { // fast-path for Chrome and Node
    return this.constructor.name;
  }
  var str = Object.prototype.toString.call(this);
  str = str.substring(8, str.length - 1);
  if (str == 'Window') {
    str = 'DOMWindow';
  } else if (str == 'Document') {
    str = 'HTMLDocument';
  }
  return str;
}, enumerable: false, writable: true, configurable: true});
function $throw(e) {
  // If e is not a value, we can use V8's captureStackTrace utility method.
  // TODO(jmesserly): capture the stack trace on other JS engines.
  if (e && (typeof e == 'object') && Error.captureStackTrace) {
    // TODO(jmesserly): this will clobber the e.stack property
    Error.captureStackTrace(e, $throw);
  }
  throw e;
}
Object.defineProperty(Object.prototype, '$index', { value: function(i) {
  var proto = Object.getPrototypeOf(this);
  if (proto !== Object) {
    proto.$index = function(i) { return this[i]; }
  }
  return this[i];
}, enumerable: false, writable: true, configurable: true});
Object.defineProperty(Array.prototype, '$index', { value: function(i) { 
  return this[i]; 
}, enumerable: false, writable: true, configurable: true});
Object.defineProperty(String.prototype, '$index', { value: function(i) { 
  return this[i]; 
}, enumerable: false, writable: true, configurable: true});
Object.defineProperty(Object.prototype, '$setindex', { value: function(i, value) {
  var proto = Object.getPrototypeOf(this);
  if (proto !== Object) {
    proto.$setindex = function(i, value) { return this[i] = value; }
  }
  return this[i] = value;
}, enumerable: false, writable: true, configurable: true});
Object.defineProperty(Array.prototype, '$setindex', { value: function(i, value) { 
  return this[i] = value; }, enumerable: false, writable: true, 
  configurable: true});
function $wrap_call$1(fn) { return fn; }
function $add(x, y) {
  return ((typeof(x) == 'number' && typeof(y) == 'number') ||
          (typeof(x) == 'string'))
    ? x + y : x.$add(y);
}
function $eq(x, y) {
  if (x == null) return y == null;
  return (typeof(x) == 'number' && typeof(y) == 'number') ||
         (typeof(x) == 'boolean' && typeof(y) == 'boolean') ||
         (typeof(x) == 'string' && typeof(y) == 'string')
    ? x == y : x.$eq(y);
}
// TODO(jimhug): Should this or should it not match equals?
Object.defineProperty(Object.prototype, '$eq', { value: function(other) { 
  return this === other;
}, enumerable: false, writable: true, configurable: true });
function $lt(x, y) {
  return (typeof(x) == 'number' && typeof(y) == 'number')
    ? x < y : x.$lt(y);
}
function $mod(x, y) {
  if (typeof(x) == 'number' && typeof(y) == 'number') {
    var result = x % y;
    if (result == 0) {
      return 0;  // Make sure we don't return -0.0.
    } else if (result < 0) {
      if (y < 0) {
        return result - y;
      } else {
        return result + y;
      }
    }
    return result;
  } else {
    return x.$mod(y);
  }
}
function $mul(x, y) {
  return (typeof(x) == 'number' && typeof(y) == 'number')
    ? x * y : x.$mul(y);
}
function $ne(x, y) {
  if (x == null) return y != null;
  return (typeof(x) == 'number' && typeof(y) == 'number') ||
         (typeof(x) == 'boolean' && typeof(y) == 'boolean') ||
         (typeof(x) == 'string' && typeof(y) == 'string')
    ? x != y : !x.$eq(y);
}
function $negate(x) {
  return (typeof(x) == 'number') ? -x : x.$negate();
}
function $sub(x, y) {
  return (typeof(x) == 'number' && typeof(y) == 'number')
    ? x - y : x.$sub(y);
}
function $truncdiv(x, y) {
  if (typeof(x) == 'number' && typeof(y) == 'number') {
    if (y == 0) $throw(new IntegerDivisionByZeroException());
    var tmp = x / y;
    return (tmp < 0) ? Math.ceil(tmp) : Math.floor(tmp);
  } else {
    return x.$truncdiv(y);
  }
}
Object.defineProperty(Object.prototype, "get$typeName", { value: Object.prototype.$typeNameOf, enumerable: false, writable: true, configurable: true});
// ********** Code for Object **************
Object.defineProperty(Object.prototype, "get$dynamic", { value: function() {
  "use strict"; return this;
}, enumerable: false, writable: true, configurable: true });
Object.defineProperty(Object.prototype, "noSuchMethod", { value: function(name, args) {
  $throw(new NoSuchMethodException(this, name, args));
}, enumerable: false, writable: true, configurable: true });
Object.defineProperty(Object.prototype, "add$1", { value: function($0) {
  return this.noSuchMethod("add", [$0]);
}, enumerable: false, writable: true, configurable: true });
Object.defineProperty(Object.prototype, "createFixtureFromShape$1", { value: function($0) {
  return this.noSuchMethod("createFixtureFromShape", [$0]);
}, enumerable: false, writable: true, configurable: true });
Object.defineProperty(Object.prototype, "fillText$3", { value: function($0, $1, $2) {
  return this.noSuchMethod("fillText", [$0, $1, $2]);
}, enumerable: false, writable: true, configurable: true });
Object.defineProperty(Object.prototype, "getContext$0", { value: function() {
  return this.noSuchMethod("getContext", []);
}, enumerable: false, writable: true, configurable: true });
Object.defineProperty(Object.prototype, "initialize$0", { value: function() {
  return this.noSuchMethod("initialize", []);
}, enumerable: false, writable: true, configurable: true });
Object.defineProperty(Object.prototype, "initialize$4", { value: function($0, $1, $2, $3) {
  return this.noSuchMethod("initialize", [$0, $1, $2, $3]);
}, enumerable: false, writable: true, configurable: true });
Object.defineProperty(Object.prototype, "moveTo$2", { value: function($0, $1) {
  return this.noSuchMethod("moveTo", [$0, $1]);
}, enumerable: false, writable: true, configurable: true });
Object.defineProperty(Object.prototype, "setCoords$2", { value: function($0, $1) {
  return this.noSuchMethod("setCoords", [$0, $1]);
}, enumerable: false, writable: true, configurable: true });
Object.defineProperty(Object.prototype, "setFillColor$1", { value: function($0) {
  return this.noSuchMethod("setFillColor", [$0]);
}, enumerable: false, writable: true, configurable: true });
Object.defineProperty(Object.prototype, "setFillColor$2", { value: function($0, $1) {
  return this.noSuchMethod("setFillColor", [$0, $1]);
}, enumerable: false, writable: true, configurable: true });
Object.defineProperty(Object.prototype, "setFillColor$4", { value: function($0, $1, $2, $3) {
  return this.noSuchMethod("setFillColor", [$0, $1, $2, $3]);
}, enumerable: false, writable: true, configurable: true });
Object.defineProperty(Object.prototype, "setFrom$1", { value: function($0) {
  return this.noSuchMethod("setFrom", [$0]);
}, enumerable: false, writable: true, configurable: true });
Object.defineProperty(Object.prototype, "setRange$3", { value: function($0, $1, $2) {
  return this.noSuchMethod("setRange", [$0, $1, $2]);
}, enumerable: false, writable: true, configurable: true });
Object.defineProperty(Object.prototype, "setStrokeColor$1", { value: function($0) {
  return this.noSuchMethod("setStrokeColor", [$0]);
}, enumerable: false, writable: true, configurable: true });
Object.defineProperty(Object.prototype, "setStrokeColor$2", { value: function($0, $1) {
  return this.noSuchMethod("setStrokeColor", [$0, $1]);
}, enumerable: false, writable: true, configurable: true });
Object.defineProperty(Object.prototype, "setStrokeColor$4", { value: function($0, $1, $2, $3) {
  return this.noSuchMethod("setStrokeColor", [$0, $1, $2, $3]);
}, enumerable: false, writable: true, configurable: true });
Object.defineProperty(Object.prototype, "solveVelocityConstraints$1", { value: function($0) {
  return this.noSuchMethod("solveVelocityConstraints", [$0]);
}, enumerable: false, writable: true, configurable: true });
Object.defineProperty(Object.prototype, "viewport$4", { value: function($0, $1, $2, $3) {
  return this.noSuchMethod("viewport", [$0, $1, $2, $3]);
}, enumerable: false, writable: true, configurable: true });
// ********** Code for IndexOutOfRangeException **************
function IndexOutOfRangeException(_index) {
  this._index = _index;
}
IndexOutOfRangeException.prototype.toString = function() {
  return ("IndexOutOfRangeException: " + this._index);
}
// ********** Code for NoSuchMethodException **************
function NoSuchMethodException(_receiver, _functionName, _arguments) {
  this._receiver = _receiver;
  this._functionName = _functionName;
  this._arguments = _arguments;
}
NoSuchMethodException.prototype.toString = function() {
  var sb = new StringBufferImpl("");
  for (var i = (0);
   i < this._arguments.get$length(); i++) {
    if (i > (0)) {
      sb.add(", ");
    }
    sb.add(this._arguments.$index(i));
  }
  sb.add("]");
  return $add(("NoSuchMethodException - receiver: '" + this._receiver + "' "), ("function name: '" + this._functionName + "' arguments: [" + sb + "]"));
}
// ********** Code for ClosureArgumentMismatchException **************
function ClosureArgumentMismatchException() {

}
ClosureArgumentMismatchException.prototype.toString = function() {
  return "Closure argument mismatch";
}
// ********** Code for IllegalArgumentException **************
function IllegalArgumentException(args) {
  this._args = args;
}
IllegalArgumentException.prototype.toString = function() {
  return ("Illegal argument(s): " + this._args);
}
// ********** Code for BadNumberFormatException **************
function BadNumberFormatException(_s) {
  this._s = _s;
}
BadNumberFormatException.prototype.toString = function() {
  return ("BadNumberFormatException: '" + this._s + "'");
}
// ********** Code for NoMoreElementsException **************
function NoMoreElementsException() {

}
NoMoreElementsException.prototype.toString = function() {
  return "NoMoreElementsException";
}
// ********** Code for EmptyQueueException **************
function EmptyQueueException() {

}
EmptyQueueException.prototype.toString = function() {
  return "EmptyQueueException";
}
// ********** Code for UnsupportedOperationException **************
function UnsupportedOperationException(_message) {
  this._message = _message;
}
UnsupportedOperationException.prototype.toString = function() {
  return ("UnsupportedOperationException: " + this._message);
}
// ********** Code for NotImplementedException **************
function NotImplementedException() {

}
NotImplementedException.prototype.toString = function() {
  return "NotImplementedException";
}
// ********** Code for Expect **************
function Expect() {}
Expect.equals = function(expected, actual, reason) {
  if ($eq(expected, actual)) return;
  var msg = Expect._getMessage(reason);
  Expect._fail(("Expect.equals(expected: <" + expected + ">, actual: <" + actual + ">" + msg + ") fails."));
}
Expect._getMessage = function(reason) {
  return (reason == null) ? "" : (", '" + reason + "'");
}
Expect._fail = function(message) {
  $throw(new ExpectException(message));
}
// ********** Code for ExpectException **************
function ExpectException(message) {
  this.message = message;
}
ExpectException.prototype.toString = function() {
  return this.message;
}
// ********** Code for dart_core_Function **************
Function.prototype.to$call$0 = function() {
  this.call$0 = this._genStub(0);
  this.to$call$0 = function() { return this.call$0; };
  return this.call$0;
};
Function.prototype.call$0 = function() {
  return this.to$call$0()();
};
function to$call$0(f) { return f && f.to$call$0(); }
Function.prototype.to$call$1 = function() {
  this.call$1 = this._genStub(1);
  this.to$call$1 = function() { return this.call$1; };
  return this.call$1;
};
Function.prototype.call$1 = function($0) {
  return this.to$call$1()($0);
};
function to$call$1(f) { return f && f.to$call$1(); }
// ********** Code for Math **************
Math.min = function(a, b) {
  if (a == b) return a;
    if (a < b) {
      if (isNaN(b)) return b;
      else return a;
    }
    if (isNaN(a)) return a;
    else return b;
}
Math.max = function(a, b) {
  return (a >= b) ? a : b;
}
// ********** Code for top level **************
//  ********** Library dart:coreimpl **************
// ********** Code for ListFactory **************
ListFactory = Array;
ListFactory.ListFactory$from$factory = function(other) {
  var list = [];
  for (var $$i = other.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    list.add$1(e);
  }
  return list;
}
Object.defineProperty(ListFactory.prototype, "get$length", { value: function() { return this.length; }, enumerable: false, writable: true, configurable: true });
Object.defineProperty(ListFactory.prototype, "set$length", { value: function(value) { return this.length = value; }, enumerable: false, writable: true, configurable: true });
Object.defineProperty(ListFactory.prototype, "add", { value: function(value) {
  this.push(value);
}, enumerable: false, writable: true, configurable: true });
Object.defineProperty(ListFactory.prototype, "clear", { value: function() {
  this.set$length((0));
}, enumerable: false, writable: true, configurable: true });
Object.defineProperty(ListFactory.prototype, "getRange", { value: function(start, length) {
  return this.slice(start, start + length);
}, enumerable: false, writable: true, configurable: true });
Object.defineProperty(ListFactory.prototype, "setRange", { value: function(start, length, from, startFrom) {
  if (length == (0)) return;
  if (length < (0)) $throw(new IllegalArgumentException("length is negative"));
  if (start < (0)) $throw(new IndexOutOfRangeException(start));
  var end = start + length;
  if (end > this.get$length()) $throw(new IndexOutOfRangeException(end));
  if (startFrom < (0)) $throw(new IndexOutOfRangeException(startFrom));
  var endFrom = startFrom + length;
  if (endFrom > from.get$length()) $throw(new IndexOutOfRangeException(endFrom));
  for (var i = (0);
   $lt(i, length); (i = $add(i, (1)))) this.$setindex($add(start, i), from.$index($add(startFrom, i)));
}, enumerable: false, writable: true, configurable: true });
Object.defineProperty(ListFactory.prototype, "isEmpty", { value: function() {
  return this.get$length() == (0);
}, enumerable: false, writable: true, configurable: true });
Object.defineProperty(ListFactory.prototype, "iterator", { value: function() {
  return new ListIterator(this);
}, enumerable: false, writable: true, configurable: true });
Object.defineProperty(ListFactory.prototype, "add$1", { value: ListFactory.prototype.add, enumerable: false, writable: true, configurable: true });
Object.defineProperty(ListFactory.prototype, "setRange$3", { value: function($0, $1, $2) {
  return this.setRange($0, $1, $2, (0));
}, enumerable: false, writable: true, configurable: true });
// ********** Code for ListIterator **************
function ListIterator(array) {
  this._array = array;
  this._pos = (0);
}
ListIterator.prototype.hasNext = function() {
  return this._array.get$length() > this._pos;
}
ListIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0002);
  }
  return this._array.$index(this._pos++);
}
// ********** Code for NumImplementation **************
NumImplementation = Number;
NumImplementation.prototype.$negate = function() {
  'use strict'; return -this;
}
NumImplementation.prototype.isNaN = function() {
  'use strict'; return isNaN(this);
}
NumImplementation.prototype.isNegative = function() {
  'use strict'; return this == 0 ? (1 / this) < 0 : this < 0;
}
NumImplementation.prototype.abs = function() {
  'use strict'; return Math.abs(this);
}
NumImplementation.prototype.round = function() {
  'use strict'; return Math.round(this);
}
NumImplementation.prototype.floor = function() {
  'use strict'; return Math.floor(this);
}
NumImplementation.prototype.hashCode = function() {
  'use strict'; return this & 0x1FFFFFFF;
}
NumImplementation.prototype.toInt = function() {
    'use strict';
    if (isNaN(this)) $throw(new BadNumberFormatException("NaN"));
    if ((this == Infinity) || (this == -Infinity)) {
      $throw(new BadNumberFormatException("Infinity"));
    }
    var truncated = (this < 0) ? Math.ceil(this) : Math.floor(this);
    if (truncated == -0.0) return 0;
    return truncated;
}
NumImplementation.prototype.toDouble = function() {
  'use strict'; return this + 0;
}
NumImplementation.prototype.toStringAsFixed = function(fractionDigits) {
  'use strict'; return this.toFixed(fractionDigits);
}
NumImplementation.prototype.toRadixString = function(radix) {
  'use strict'; return this.toString(radix)
}
NumImplementation.prototype.compareTo = function(other) {
  var thisValue = this.toDouble();
  if (thisValue < other) {
    return (-1);
  }
  else if (thisValue > other) {
    return (1);
  }
  else if (thisValue == other) {
    if (thisValue == (0)) {
      var thisIsNegative = this.isNegative();
      var otherIsNegative = other.isNegative();
      if ($eq(thisIsNegative, otherIsNegative)) return (0);
      if (thisIsNegative) return (-1);
      return (1);
    }
    return (0);
  }
  else if (this.isNaN()) {
    if (other.isNaN()) {
      return (0);
    }
    return (1);
  }
  else {
    return (-1);
  }
}
// ********** Code for HashMapImplementation **************
function HashMapImplementation() {}
HashMapImplementation._computeLoadLimit = function(capacity) {
  return $truncdiv((capacity * (3)), (4));
}
HashMapImplementation._firstProbe = function(hashCode, length) {
  return hashCode & (length - (1));
}
HashMapImplementation._nextProbe = function(currentProbe, numberOfProbes, length) {
  return (currentProbe + numberOfProbes) & (length - (1));
}
HashMapImplementation.prototype._probeForAdding = function(key) {
  var hash = HashMapImplementation._firstProbe(key.hashCode(), this._keys.get$length());
  var numberOfProbes = (1);
  var initialHash = hash;
  var insertionIndex = (-1);
  while (true) {
    var existingKey = this._keys.$index(hash);
    if (existingKey == null) {
      if (insertionIndex < (0)) return hash;
      return insertionIndex;
    }
    else if ($eq(existingKey, key)) {
      return hash;
    }
    else if ((insertionIndex < (0)) && (const$0001 == existingKey)) {
      insertionIndex = hash;
    }
    hash = HashMapImplementation._nextProbe(hash, numberOfProbes++, this._keys.get$length());
  }
}
HashMapImplementation.prototype._probeForLookup = function(key) {
  var hash = HashMapImplementation._firstProbe(key.hashCode(), this._keys.get$length());
  var numberOfProbes = (1);
  var initialHash = hash;
  while (true) {
    var existingKey = this._keys.$index(hash);
    if (existingKey == null) return (-1);
    if ($eq(existingKey, key)) return hash;
    hash = HashMapImplementation._nextProbe(hash, numberOfProbes++, this._keys.get$length());
  }
}
HashMapImplementation.prototype._ensureCapacity = function() {
  var newNumberOfEntries = this._numberOfEntries + (1);
  if (newNumberOfEntries >= this._loadLimit) {
    this._grow(this._keys.get$length() * (2));
    return;
  }
  var capacity = this._keys.get$length();
  var numberOfFreeOrDeleted = capacity - newNumberOfEntries;
  var numberOfFree = numberOfFreeOrDeleted - this._numberOfDeleted;
  if (this._numberOfDeleted > numberOfFree) {
    this._grow(this._keys.get$length());
  }
}
HashMapImplementation._isPowerOfTwo = function(x) {
  return ((x & (x - (1))) == (0));
}
HashMapImplementation.prototype._grow = function(newCapacity) {
  var capacity = this._keys.get$length();
  this._loadLimit = HashMapImplementation._computeLoadLimit(newCapacity);
  var oldKeys = this._keys;
  var oldValues = this._values;
  this._keys = new Array(newCapacity);
  this._values = new Array(newCapacity);
  for (var i = (0);
   i < capacity; i++) {
    var key = oldKeys.$index(i);
    if (key == null || key == const$0001) {
      continue;
    }
    var value = oldValues.$index(i);
    var newIndex = this._probeForAdding(key);
    this._keys.$setindex(newIndex, key);
    this._values.$setindex(newIndex, value);
  }
  this._numberOfDeleted = (0);
}
HashMapImplementation.prototype.$setindex = function(key, value) {
  this._ensureCapacity();
  var index = this._probeForAdding(key);
  if ((this._keys.$index(index) == null) || (this._keys.$index(index) == const$0001)) {
    this._numberOfEntries++;
  }
  this._keys.$setindex(index, key);
  this._values.$setindex(index, value);
}
HashMapImplementation.prototype.$index = function(key) {
  var index = this._probeForLookup(key);
  if (index < (0)) return null;
  return this._values.$index(index);
}
HashMapImplementation.prototype.isEmpty = function() {
  return this._numberOfEntries == (0);
}
HashMapImplementation.prototype.get$length = function() {
  return this._numberOfEntries;
}
// ********** Code for HashSetImplementation **************
function HashSetImplementation() {}
HashSetImplementation.prototype.add = function(value) {
  this._backingMap.$setindex(value, value);
}
HashSetImplementation.prototype.isEmpty = function() {
  return this._backingMap.isEmpty();
}
HashSetImplementation.prototype.get$length = function() {
  return this._backingMap.get$length();
}
HashSetImplementation.prototype.iterator = function() {
  return new HashSetIterator(this);
}
HashSetImplementation.prototype.add$1 = HashSetImplementation.prototype.add;
// ********** Code for HashSetIterator **************
function HashSetIterator(set_) {
  this._entries = set_._backingMap._keys;
  this._nextValidIndex = (-1);
  this._advance();
}
HashSetIterator.prototype.hasNext = function() {
  if (this._nextValidIndex >= this._entries.get$length()) return false;
  if (this._entries.$index(this._nextValidIndex) == const$0001) {
    this._advance();
  }
  return this._nextValidIndex < this._entries.get$length();
}
HashSetIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0002);
  }
  var res = this._entries.$index(this._nextValidIndex);
  this._advance();
  return res;
}
HashSetIterator.prototype._advance = function() {
  var length = this._entries.get$length();
  var entry;
  var deletedKey = const$0001;
  do {
    if (++this._nextValidIndex >= length) break;
    entry = this._entries.$index(this._nextValidIndex);
  }
  while ((entry == null) || (entry == deletedKey))
}
// ********** Code for _DeletedKeySentinel **************
function _DeletedKeySentinel() {

}
// ********** Code for DoubleLinkedQueueEntry **************
function DoubleLinkedQueueEntry(e) {
  this._element = e;
}
DoubleLinkedQueueEntry.prototype._link = function(p, n) {
  this._next = n;
  this._previous = p;
  p._next = this;
  n._previous = this;
}
DoubleLinkedQueueEntry.prototype.append = function(e) {
  new DoubleLinkedQueueEntry(e)._link(this, this._next);
}
DoubleLinkedQueueEntry.prototype.prepend = function(e) {
  new DoubleLinkedQueueEntry(e)._link(this._previous, this);
}
DoubleLinkedQueueEntry.prototype.remove = function() {
  this._previous._next = this._next;
  this._next._previous = this._previous;
  this._next = null;
  this._previous = null;
  return this._element;
}
DoubleLinkedQueueEntry.prototype.get$element = function() {
  return this._element;
}
// ********** Code for DoubleLinkedQueueEntry_CircleContact **************
/** Implements extends for Dart classes on JavaScript prototypes. */
function $inherits(child, parent) {
  if (child.prototype.__proto__) {
    child.prototype.__proto__ = parent.prototype;
  } else {
    function tmp() {};
    tmp.prototype = parent.prototype;
    child.prototype = new tmp();
    child.prototype.constructor = child;
  }
}
$inherits(DoubleLinkedQueueEntry_CircleContact, DoubleLinkedQueueEntry);
function DoubleLinkedQueueEntry_CircleContact(e) {
  this._element = e;
}
// ********** Code for DoubleLinkedQueueEntry_DynamicTreeNode **************
$inherits(DoubleLinkedQueueEntry_DynamicTreeNode, DoubleLinkedQueueEntry);
function DoubleLinkedQueueEntry_DynamicTreeNode(e) {
  this._element = e;
}
// ********** Code for DoubleLinkedQueueEntry_PolygonAndCircleContact **************
$inherits(DoubleLinkedQueueEntry_PolygonAndCircleContact, DoubleLinkedQueueEntry);
function DoubleLinkedQueueEntry_PolygonAndCircleContact(e) {
  this._element = e;
}
// ********** Code for DoubleLinkedQueueEntry_PolygonContact **************
$inherits(DoubleLinkedQueueEntry_PolygonContact, DoubleLinkedQueueEntry);
function DoubleLinkedQueueEntry_PolygonContact(e) {
  this._element = e;
}
// ********** Code for _DoubleLinkedQueueEntrySentinel **************
$inherits(_DoubleLinkedQueueEntrySentinel, DoubleLinkedQueueEntry);
function _DoubleLinkedQueueEntrySentinel() {}
_DoubleLinkedQueueEntrySentinel.prototype.remove = function() {
  $throw(const$0000);
}
_DoubleLinkedQueueEntrySentinel.prototype.get$element = function() {
  $throw(const$0000);
}
// ********** Code for _DoubleLinkedQueueEntrySentinel_CircleContact **************
$inherits(_DoubleLinkedQueueEntrySentinel_CircleContact, _DoubleLinkedQueueEntrySentinel);
function _DoubleLinkedQueueEntrySentinel_CircleContact() {
  DoubleLinkedQueueEntry_CircleContact.call(this, null);
  this._link(this, this);
}
// ********** Code for _DoubleLinkedQueueEntrySentinel_DynamicTreeNode **************
$inherits(_DoubleLinkedQueueEntrySentinel_DynamicTreeNode, _DoubleLinkedQueueEntrySentinel);
function _DoubleLinkedQueueEntrySentinel_DynamicTreeNode() {
  DoubleLinkedQueueEntry_DynamicTreeNode.call(this, null);
  this._link(this, this);
}
// ********** Code for _DoubleLinkedQueueEntrySentinel_PolygonAndCircleContact **************
$inherits(_DoubleLinkedQueueEntrySentinel_PolygonAndCircleContact, _DoubleLinkedQueueEntrySentinel);
function _DoubleLinkedQueueEntrySentinel_PolygonAndCircleContact() {
  DoubleLinkedQueueEntry_PolygonAndCircleContact.call(this, null);
  this._link(this, this);
}
// ********** Code for _DoubleLinkedQueueEntrySentinel_PolygonContact **************
$inherits(_DoubleLinkedQueueEntrySentinel_PolygonContact, _DoubleLinkedQueueEntrySentinel);
function _DoubleLinkedQueueEntrySentinel_PolygonContact() {
  DoubleLinkedQueueEntry_PolygonContact.call(this, null);
  this._link(this, this);
}
// ********** Code for DoubleLinkedQueue **************
function DoubleLinkedQueue() {}
DoubleLinkedQueue.prototype.addLast = function(value) {
  this._sentinel.prepend(value);
}
DoubleLinkedQueue.prototype.addFirst = function(value) {
  this._sentinel.append(value);
}
DoubleLinkedQueue.prototype.add = function(value) {
  this.addLast(value);
}
DoubleLinkedQueue.prototype.removeFirst = function() {
  return this._sentinel._next.remove();
}
DoubleLinkedQueue.prototype.get$length = function() {
  var counter = (0);
  this.forEach(function _(element) {
    counter++;
  }
  );
  return counter;
}
DoubleLinkedQueue.prototype.isEmpty = function() {
  return (this._sentinel._next == this._sentinel);
}
DoubleLinkedQueue.prototype.forEach = function(f) {
  var entry = this._sentinel._next;
  while (entry != this._sentinel) {
    var nextEntry = entry._next;
    f(entry._element);
    entry = nextEntry;
  }
}
DoubleLinkedQueue.prototype.iterator = function() {
  return new _DoubleLinkedQueueIterator(this._sentinel);
}
DoubleLinkedQueue.prototype.add$1 = DoubleLinkedQueue.prototype.add;
// ********** Code for DoubleLinkedQueue_CircleContact **************
$inherits(DoubleLinkedQueue_CircleContact, DoubleLinkedQueue);
function DoubleLinkedQueue_CircleContact() {
  this._sentinel = new _DoubleLinkedQueueEntrySentinel_CircleContact();
}
// ********** Code for DoubleLinkedQueue_DynamicTreeNode **************
$inherits(DoubleLinkedQueue_DynamicTreeNode, DoubleLinkedQueue);
function DoubleLinkedQueue_DynamicTreeNode() {
  this._sentinel = new _DoubleLinkedQueueEntrySentinel_DynamicTreeNode();
}
// ********** Code for DoubleLinkedQueue_PolygonAndCircleContact **************
$inherits(DoubleLinkedQueue_PolygonAndCircleContact, DoubleLinkedQueue);
function DoubleLinkedQueue_PolygonAndCircleContact() {
  this._sentinel = new _DoubleLinkedQueueEntrySentinel_PolygonAndCircleContact();
}
// ********** Code for DoubleLinkedQueue_PolygonContact **************
$inherits(DoubleLinkedQueue_PolygonContact, DoubleLinkedQueue);
function DoubleLinkedQueue_PolygonContact() {
  this._sentinel = new _DoubleLinkedQueueEntrySentinel_PolygonContact();
}
// ********** Code for _DoubleLinkedQueueIterator **************
function _DoubleLinkedQueueIterator(_sentinel) {
  this._sentinel = _sentinel;
  this._currentEntry = this._sentinel;
}
_DoubleLinkedQueueIterator.prototype.hasNext = function() {
  return this._currentEntry._next != this._sentinel;
}
_DoubleLinkedQueueIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0002);
  }
  this._currentEntry = this._currentEntry._next;
  return this._currentEntry.get$element();
}
// ********** Code for StringBufferImpl **************
function StringBufferImpl(content) {
  this.clear();
  this.add(content);
}
StringBufferImpl.prototype.get$length = function() {
  return this._length;
}
StringBufferImpl.prototype.add = function(obj) {
  var str = obj.toString();
  if (str == null || str.isEmpty()) return this;
  this._buffer.add(str);
  this._length = this._length + str.length;
  return this;
}
StringBufferImpl.prototype.clear = function() {
  this._buffer = new Array();
  this._length = (0);
  return this;
}
StringBufferImpl.prototype.toString = function() {
  if (this._buffer.get$length() == (0)) return "";
  if (this._buffer.get$length() == (1)) return this._buffer.$index((0));
  var result = StringBase.concatAll(this._buffer);
  this._buffer.clear();
  this._buffer.add(result);
  return result;
}
StringBufferImpl.prototype.add$1 = StringBufferImpl.prototype.add;
// ********** Code for StringBase **************
function StringBase() {}
StringBase.join = function(strings, separator) {
  if (strings.get$length() == (0)) return "";
  var s = strings.$index((0));
  for (var i = (1);
   i < strings.get$length(); i++) {
    s = $add($add(s, separator), strings.$index(i));
  }
  return s;
}
StringBase.concatAll = function(strings) {
  return StringBase.join(strings, "");
}
// ********** Code for StringImplementation **************
StringImplementation = String;
StringImplementation.prototype.get$length = function() { return this.length; };
StringImplementation.prototype.isEmpty = function() {
  return this.length == (0);
}
StringImplementation.prototype.hashCode = function() {
      'use strict';
      var hash = 0;
      for (var i = 0; i < this.length; i++) {
        hash = 0x1fffffff & (hash + this.charCodeAt(i));
        hash = 0x1fffffff & (hash + ((0x0007ffff & hash) << 10));
        hash ^= hash >> 6;
      }

      hash = 0x1fffffff & (hash + ((0x03ffffff & hash) << 3));
      hash ^= hash >> 11;
      return 0x1fffffff & (hash + ((0x00003fff & hash) << 15));
}
StringImplementation.prototype.compareTo = function(other) {
  'use strict'; return this == other ? 0 : this < other ? -1 : 1;
}
// ********** Code for _Worker **************
var _Worker = {};
// ********** Code for _ArgumentMismatchException **************
$inherits(_ArgumentMismatchException, ClosureArgumentMismatchException);
function _ArgumentMismatchException(_message) {
  this._dart_coreimpl_message = _message;
  ClosureArgumentMismatchException.call(this);
}
_ArgumentMismatchException.prototype.toString = function() {
  return ("Closure argument mismatch: " + this._dart_coreimpl_message);
}
// ********** Code for _FunctionImplementation **************
_FunctionImplementation = Function;
_FunctionImplementation.prototype._genStub = function(argsLength, names) {
      // Fast path #1: if no named arguments and arg count matches
      if (this.length == argsLength && !names) {
        return this;
      }

      var paramsNamed = this.$optional ? (this.$optional.length / 2) : 0;
      var paramsBare = this.length - paramsNamed;
      var argsNamed = names ? names.length : 0;
      var argsBare = argsLength - argsNamed;

      // Check we got the right number of arguments
      if (argsBare < paramsBare || argsLength > this.length ||
          argsNamed > paramsNamed) {
        return function() {
          $throw(new _ArgumentMismatchException(
            'Wrong number of arguments to function. Expected ' + paramsBare +
            ' positional arguments and at most ' + paramsNamed +
            ' named arguments, but got ' + argsBare +
            ' positional arguments and ' + argsNamed + ' named arguments.'));
        };
      }

      // First, fill in all of the default values
      var p = new Array(paramsBare);
      if (paramsNamed) {
        p = p.concat(this.$optional.slice(paramsNamed));
      }
      // Fill in positional args
      var a = new Array(argsLength);
      for (var i = 0; i < argsBare; i++) {
        p[i] = a[i] = '$' + i;
      }
      // Then overwrite with supplied values for optional args
      var lastParameterIndex;
      var namesInOrder = true;
      for (var i = 0; i < argsNamed; i++) {
        var name = names[i];
        a[i + argsBare] = name;
        var j = this.$optional.indexOf(name);
        if (j < 0 || j >= paramsNamed) {
          return function() {
            $throw(new _ArgumentMismatchException(
              'Named argument "' + name + '" was not expected by function.' +
              ' Did you forget to mark the function parameter [optional]?'));
          };
        } else if (lastParameterIndex && lastParameterIndex > j) {
          namesInOrder = false;
        }
        p[j + paramsBare] = name;
        lastParameterIndex = j;
      }

      if (this.length == argsLength && namesInOrder) {
        // Fast path #2: named arguments, but they're in order and all supplied.
        return this;
      }

      // Note: using Function instead of 'eval' to get a clean scope.
      // TODO(jmesserly): evaluate the performance of these stubs.
      var f = 'function(' + a.join(',') + '){return $f(' + p.join(',') + ');}';
      return new Function('$f', 'return ' + f + '').call(null, this);
    
}
// ********** Code for top level **************
//  ********** Library dom **************
// ********** Code for Window **************
// ********** Code for AbstractWorker **************
function $dynamic(name) {
  var f = Object.prototype[name];
  if (f && f.methods) return f.methods;

  var methods = {};
  if (f) methods.Object = f;
  function $dynamicBind() {
    // Find the target method
    var obj = this;
    var tag = obj.$typeNameOf();
    var method = methods[tag];
    if (!method) {
      var table = $dynamicMetadata;
      for (var i = 0; i < table.length; i++) {
        var entry = table[i];
        if (entry.map.hasOwnProperty(tag)) {
          method = methods[entry.tag];
          if (method) break;
        }
      }
    }
    method = method || methods.Object;
    var proto = Object.getPrototypeOf(obj);
    if (!proto.hasOwnProperty(name)) {
      Object.defineProperty(proto, name,
        { value: method, enumerable: false, writable: true, 
        configurable: true });
    }

    return method.apply(this, Array.prototype.slice.call(arguments));
  };
  $dynamicBind.methods = methods;
  Object.defineProperty(Object.prototype, name, { value: $dynamicBind,
      enumerable: false, writable: true, configurable: true});
  return methods;
}
if (typeof $dynamicMetadata == 'undefined') $dynamicMetadata = [];

function $dynamicSetMetadata(inputTable) {
  // TODO: Deal with light isolates.
  var table = [];
  for (var i = 0; i < inputTable.length; i++) {
    var tag = inputTable[i][0];
    var tags = inputTable[i][1];
    var map = {};
    var tagNames = tags.split('|');
    for (var j = 0; j < tagNames.length; j++) {
      map[tagNames[j]] = true;
    }
    table.push({tag: tag, tags: tags, map: map});
  }
  $dynamicMetadata = table;
}
$dynamic("get$dartObjectLocalStorage").AbstractWorker = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").AbstractWorker = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for ArrayBuffer **************
$dynamic("get$dartObjectLocalStorage").ArrayBuffer = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").ArrayBuffer = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for ArrayBufferView **************
$dynamic("get$dartObjectLocalStorage").ArrayBufferView = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").ArrayBufferView = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_Attr **************
var dom_Attr = {};
// ********** Code for AudioBuffer **************
$dynamic("get$length").AudioBuffer = function() {
  return this.length;
}
$dynamic("get$dartObjectLocalStorage").AudioBuffer = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").AudioBuffer = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for AudioBufferSourceNode **************
// ********** Code for AudioChannelMerger **************
// ********** Code for AudioChannelSplitter **************
// ********** Code for AudioContext **************
$dynamic("get$dartObjectLocalStorage").AudioContext = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").AudioContext = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for AudioDestinationNode **************
// ********** Code for AudioGain **************
// ********** Code for AudioGainNode **************
// ********** Code for AudioListener **************
$dynamic("get$dartObjectLocalStorage").AudioListener = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").AudioListener = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for AudioNode **************
$dynamic("get$dartObjectLocalStorage").AudioNode = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").AudioNode = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for AudioPannerNode **************
// ********** Code for AudioParam **************
$dynamic("get$dartObjectLocalStorage").AudioParam = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").AudioParam = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for AudioProcessingEvent **************
// ********** Code for AudioSourceNode **************
// ********** Code for BarInfo **************
$dynamic("get$dartObjectLocalStorage").BarInfo = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").BarInfo = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for BeforeLoadEvent **************
// ********** Code for BiquadFilterNode **************
$dynamic("get$type").BiquadFilterNode = function() {
  return this.type;
}
$dynamic("set$type").BiquadFilterNode = function(value) {
  this.type = value;
}
// ********** Code for Blob **************
$dynamic("get$type").Blob = function() {
  return this.type;
}
$dynamic("get$dartObjectLocalStorage").Blob = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Blob = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for CDATASection **************
// ********** Code for CSSCharsetRule **************
// ********** Code for CSSFontFaceRule **************
// ********** Code for CSSImportRule **************
// ********** Code for CSSMediaRule **************
// ********** Code for CSSPageRule **************
// ********** Code for CSSPrimitiveValue **************
// ********** Code for CSSRule **************
$dynamic("get$type").CSSRule = function() {
  return this.type;
}
$dynamic("get$dartObjectLocalStorage").CSSRule = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").CSSRule = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for CSSRuleList **************
$dynamic("get$length").CSSRuleList = function() {
  return this.length;
}
$dynamic("get$dartObjectLocalStorage").CSSRuleList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").CSSRuleList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for CSSStyleDeclaration **************
$dynamic("get$length").CSSStyleDeclaration = function() {
  return this.length;
}
$dynamic("get$dartObjectLocalStorage").CSSStyleDeclaration = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").CSSStyleDeclaration = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for CSSStyleRule **************
// ********** Code for CSSStyleSheet **************
// ********** Code for CSSUnknownRule **************
// ********** Code for CSSValue **************
$dynamic("get$dartObjectLocalStorage").CSSValue = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").CSSValue = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for CSSValueList **************
$dynamic("get$length").CSSValueList = function() {
  return this.length;
}
// ********** Code for CanvasGradient **************
$dynamic("get$dartObjectLocalStorage").CanvasGradient = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").CanvasGradient = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for CanvasPattern **************
$dynamic("get$dartObjectLocalStorage").CanvasPattern = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").CanvasPattern = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for CanvasPixelArray **************
$dynamic("get$length").CanvasPixelArray = function() {
  return this.length;
}
$dynamic("get$dartObjectLocalStorage").CanvasPixelArray = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").CanvasPixelArray = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for CanvasRenderingContext **************
$dynamic("get$dartObjectLocalStorage").CanvasRenderingContext = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").CanvasRenderingContext = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for CanvasRenderingContext2D **************
$dynamic("set$font").CanvasRenderingContext2D = function(value) {
  this.font = value;
}
$dynamic("fillText$3").CanvasRenderingContext2D = function($0, $1, $2) {
  return this.fillText($0, $1, $2);
};
$dynamic("moveTo$2").CanvasRenderingContext2D = function($0, $1) {
  return this.moveTo($0, $1);
};
$dynamic("setFillColor$1").CanvasRenderingContext2D = function($0) {
  return this.setFillColor($0);
};
$dynamic("setFillColor$2").CanvasRenderingContext2D = function($0, $1) {
  return this.setFillColor($0, $1);
};
$dynamic("setFillColor$4").CanvasRenderingContext2D = function($0, $1, $2, $3) {
  return this.setFillColor($0, $1, $2, $3);
};
$dynamic("setStrokeColor$1").CanvasRenderingContext2D = function($0) {
  return this.setStrokeColor($0);
};
$dynamic("setStrokeColor$2").CanvasRenderingContext2D = function($0, $1) {
  return this.setStrokeColor($0, $1);
};
$dynamic("setStrokeColor$4").CanvasRenderingContext2D = function($0, $1, $2, $3) {
  return this.setStrokeColor($0, $1, $2, $3);
};
// ********** Code for CharacterData **************
$dynamic("get$length").CharacterData = function() {
  return this.length;
}
// ********** Code for ClientRect **************
$dynamic("get$dartObjectLocalStorage").ClientRect = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").ClientRect = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for ClientRectList **************
$dynamic("get$length").ClientRectList = function() {
  return this.length;
}
$dynamic("get$dartObjectLocalStorage").ClientRectList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").ClientRectList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for Clipboard **************
$dynamic("get$dartObjectLocalStorage").Clipboard = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Clipboard = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for CloseEvent **************
// ********** Code for Comment **************
// ********** Code for CompositionEvent **************
// ********** Code for Console **************
Console = (typeof console == 'undefined' ? {} : console);
Console.get$dartObjectLocalStorage = function() { return this.dartObjectLocalStorage; };
Console.set$dartObjectLocalStorage = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for ConvolverNode **************
// ********** Code for Coordinates **************
$dynamic("get$dartObjectLocalStorage").Coordinates = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Coordinates = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for Counter **************
$dynamic("get$dartObjectLocalStorage").Counter = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Counter = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for Crypto **************
$dynamic("get$dartObjectLocalStorage").Crypto = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Crypto = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for CustomEvent **************
// ********** Code for DOMApplicationCache **************
$dynamic("get$dartObjectLocalStorage").DOMApplicationCache = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DOMApplicationCache = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for DOMException **************
$dynamic("get$dartObjectLocalStorage").DOMException = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DOMException = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for DOMFileSystem **************
$dynamic("get$dartObjectLocalStorage").DOMFileSystem = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DOMFileSystem = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for DOMFileSystemSync **************
$dynamic("get$dartObjectLocalStorage").DOMFileSystemSync = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DOMFileSystemSync = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for DOMFormData **************
$dynamic("get$dartObjectLocalStorage").DOMFormData = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DOMFormData = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_DOMImplementation **************
var dom_DOMImplementation = {};
$dynamic("get$dartObjectLocalStorage").DOMImplementation = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DOMImplementation = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for DOMMimeType **************
$dynamic("get$type").DOMMimeType = function() {
  return this.type;
}
$dynamic("get$dartObjectLocalStorage").DOMMimeType = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DOMMimeType = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for DOMMimeTypeArray **************
$dynamic("get$length").DOMMimeTypeArray = function() {
  return this.length;
}
$dynamic("get$dartObjectLocalStorage").DOMMimeTypeArray = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DOMMimeTypeArray = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for DOMParser **************
$dynamic("get$dartObjectLocalStorage").DOMParser = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DOMParser = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for DOMPlugin **************
$dynamic("get$length").DOMPlugin = function() {
  return this.length;
}
$dynamic("get$dartObjectLocalStorage").DOMPlugin = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DOMPlugin = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for DOMPluginArray **************
$dynamic("get$length").DOMPluginArray = function() {
  return this.length;
}
$dynamic("get$dartObjectLocalStorage").DOMPluginArray = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DOMPluginArray = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for DOMSelection **************
$dynamic("get$type").DOMSelection = function() {
  return this.type;
}
$dynamic("get$dartObjectLocalStorage").DOMSelection = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DOMSelection = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for DOMSettableTokenList **************
// ********** Code for DOMTokenList **************
$dynamic("get$length").DOMTokenList = function() {
  return this.length;
}
$dynamic("get$dartObjectLocalStorage").DOMTokenList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DOMTokenList = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("add$1").DOMTokenList = function($0) {
  return this.add($0);
};
// ********** Code for DOMURL **************
$dynamic("get$dartObjectLocalStorage").DOMURL = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DOMURL = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_DOMWindow **************
var dom_DOMWindow = {};
$dynamic("get$length").DOMWindow = function() {
  return this.length;
}
$dynamic("get$dartObjectLocalStorage").DOMWindow = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DOMWindow = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("moveTo$2").DOMWindow = function($0, $1) {
  return this.moveTo($0, $1);
};
// ********** Code for DataTransferItem **************
$dynamic("get$type").DataTransferItem = function() {
  return this.type;
}
$dynamic("get$dartObjectLocalStorage").DataTransferItem = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DataTransferItem = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for DataTransferItemList **************
$dynamic("get$length").DataTransferItemList = function() {
  return this.length;
}
$dynamic("get$dartObjectLocalStorage").DataTransferItemList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DataTransferItemList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for DataView **************
// ********** Code for dom_Database **************
var dom_Database = {};
$dynamic("get$dartObjectLocalStorage").Database = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Database = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_DatabaseSync **************
var dom_DatabaseSync = {};
$dynamic("get$dartObjectLocalStorage").DatabaseSync = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DatabaseSync = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_DedicatedWorkerContext **************
var dom_DedicatedWorkerContext = {};
// ********** Code for DelayNode **************
// ********** Code for DeviceMotionEvent **************
// ********** Code for DeviceOrientationEvent **************
// ********** Code for DirectoryEntry **************
// ********** Code for DirectoryEntrySync **************
// ********** Code for DirectoryReader **************
$dynamic("get$dartObjectLocalStorage").DirectoryReader = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DirectoryReader = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for DirectoryReaderSync **************
$dynamic("get$dartObjectLocalStorage").DirectoryReaderSync = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DirectoryReaderSync = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for Document **************
$dynamic("get$body").Document = function() {
  return this.body;
}
$dynamic("get$documentElement").Document = function() {
  return this.documentElement;
}
// ********** Code for DocumentFragment **************
// ********** Code for dom_DocumentType **************
var dom_DocumentType = {};
// ********** Code for DynamicsCompressorNode **************
// ********** Code for Element **************
// ********** Code for ElementTimeControl **************
$dynamic("get$dartObjectLocalStorage").ElementTimeControl = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").ElementTimeControl = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_ElementTraversal **************
var dom_ElementTraversal = {};
$dynamic("get$dartObjectLocalStorage").ElementTraversal = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").ElementTraversal = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for Entity **************
// ********** Code for EntityReference **************
// ********** Code for Entry **************
$dynamic("get$dartObjectLocalStorage").Entry = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Entry = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("moveTo$2").Entry = function($0, $1) {
  return this.moveTo($0, $1, $wrap_call$1(to$call$1(null)), $wrap_call$1(to$call$1(null)));
};
// ********** Code for EntryArray **************
$dynamic("get$length").EntryArray = function() {
  return this.length;
}
$dynamic("get$dartObjectLocalStorage").EntryArray = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").EntryArray = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for EntryArraySync **************
$dynamic("get$length").EntryArraySync = function() {
  return this.length;
}
$dynamic("get$dartObjectLocalStorage").EntryArraySync = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").EntryArraySync = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for EntrySync **************
$dynamic("get$dartObjectLocalStorage").EntrySync = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").EntrySync = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("moveTo$2").EntrySync = function($0, $1) {
  return this.moveTo($0, $1);
};
// ********** Code for ErrorEvent **************
// ********** Code for Event **************
$dynamic("get$type").Event = function() {
  return this.type;
}
$dynamic("get$dartObjectLocalStorage").Event = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Event = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for EventException **************
$dynamic("get$dartObjectLocalStorage").EventException = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").EventException = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for EventSource **************
$dynamic("get$dartObjectLocalStorage").EventSource = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").EventSource = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for EventTarget **************
$dynamic("get$dartObjectLocalStorage").EventTarget = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").EventTarget = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for File **************
// ********** Code for FileEntry **************
// ********** Code for FileEntrySync **************
// ********** Code for FileError **************
$dynamic("get$dartObjectLocalStorage").FileError = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").FileError = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for FileException **************
$dynamic("get$dartObjectLocalStorage").FileException = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").FileException = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for FileList **************
$dynamic("get$length").FileList = function() {
  return this.length;
}
$dynamic("get$dartObjectLocalStorage").FileList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").FileList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for FileReader **************
$dynamic("get$dartObjectLocalStorage").FileReader = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").FileReader = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for FileReaderSync **************
$dynamic("get$dartObjectLocalStorage").FileReaderSync = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").FileReaderSync = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for FileWriter **************
$dynamic("get$length").FileWriter = function() {
  return this.length;
}
$dynamic("get$position").FileWriter = function() {
  return this.position;
}
$dynamic("get$dartObjectLocalStorage").FileWriter = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").FileWriter = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for FileWriterSync **************
$dynamic("get$length").FileWriterSync = function() {
  return this.length;
}
$dynamic("get$position").FileWriterSync = function() {
  return this.position;
}
$dynamic("get$dartObjectLocalStorage").FileWriterSync = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").FileWriterSync = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for Float32Array **************
$dynamic("get$length").Float32Array = function() {
  return this.length;
}
// ********** Code for Float64Array **************
$dynamic("get$length").Float64Array = function() {
  return this.length;
}
// ********** Code for Geolocation **************
$dynamic("get$dartObjectLocalStorage").Geolocation = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Geolocation = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for Geoposition **************
$dynamic("get$dartObjectLocalStorage").Geoposition = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Geoposition = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for HTMLAllCollection **************
$dynamic("get$length").HTMLAllCollection = function() {
  return this.length;
}
$dynamic("get$dartObjectLocalStorage").HTMLAllCollection = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").HTMLAllCollection = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_HTMLAnchorElement **************
var dom_HTMLAnchorElement = {};
$dynamic("set$shape").HTMLAnchorElement = function(value) {
  this.shape = value;
}
$dynamic("get$type").HTMLAnchorElement = function() {
  return this.type;
}
$dynamic("set$type").HTMLAnchorElement = function(value) {
  this.type = value;
}
// ********** Code for dom_HTMLAppletElement **************
var dom_HTMLAppletElement = {};
$dynamic("set$height").HTMLAppletElement = function(value) {
  this.height = value;
}
$dynamic("set$width").HTMLAppletElement = function(value) {
  this.width = value;
}
// ********** Code for dom_HTMLAreaElement **************
var dom_HTMLAreaElement = {};
$dynamic("set$shape").HTMLAreaElement = function(value) {
  this.shape = value;
}
// ********** Code for dom_HTMLAudioElement **************
var dom_HTMLAudioElement = {};
// ********** Code for dom_HTMLBRElement **************
var dom_HTMLBRElement = {};
// ********** Code for dom_HTMLBaseElement **************
var dom_HTMLBaseElement = {};
// ********** Code for dom_HTMLBaseFontElement **************
var dom_HTMLBaseFontElement = {};
// ********** Code for dom_HTMLBodyElement **************
var dom_HTMLBodyElement = {};
// ********** Code for dom_HTMLButtonElement **************
var dom_HTMLButtonElement = {};
$dynamic("get$type").HTMLButtonElement = function() {
  return this.type;
}
// ********** Code for dom_HTMLCanvasElement **************
var dom_HTMLCanvasElement = {};
$dynamic("set$height").HTMLCanvasElement = function(value) {
  this.height = value;
}
$dynamic("set$width").HTMLCanvasElement = function(value) {
  this.width = value;
}
// ********** Code for dom_HTMLCollection **************
var dom_HTMLCollection = {};
$dynamic("get$length").HTMLCollection = function() {
  return this.length;
}
$dynamic("$setindex").HTMLCollection = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("get$dartObjectLocalStorage").HTMLCollection = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").HTMLCollection = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_HTMLDListElement **************
var dom_HTMLDListElement = {};
// ********** Code for dom_HTMLDataListElement **************
var dom_HTMLDataListElement = {};
// ********** Code for dom_HTMLDetailsElement **************
var dom_HTMLDetailsElement = {};
// ********** Code for dom_HTMLDirectoryElement **************
var dom_HTMLDirectoryElement = {};
// ********** Code for dom_HTMLDivElement **************
var dom_HTMLDivElement = {};
// ********** Code for dom_HTMLDocument **************
var dom_HTMLDocument = {};
// ********** Code for dom_HTMLElement **************
var dom_HTMLElement = {};
// ********** Code for dom_HTMLEmbedElement **************
var dom_HTMLEmbedElement = {};
$dynamic("set$height").HTMLEmbedElement = function(value) {
  this.height = value;
}
$dynamic("get$type").HTMLEmbedElement = function() {
  return this.type;
}
$dynamic("set$type").HTMLEmbedElement = function(value) {
  this.type = value;
}
$dynamic("set$width").HTMLEmbedElement = function(value) {
  this.width = value;
}
// ********** Code for dom_HTMLFieldSetElement **************
var dom_HTMLFieldSetElement = {};
// ********** Code for dom_HTMLFontElement **************
var dom_HTMLFontElement = {};
// ********** Code for dom_HTMLFormElement **************
var dom_HTMLFormElement = {};
$dynamic("get$length").HTMLFormElement = function() {
  return this.length;
}
// ********** Code for dom_HTMLFrameElement **************
var dom_HTMLFrameElement = {};
// ********** Code for dom_HTMLFrameSetElement **************
var dom_HTMLFrameSetElement = {};
// ********** Code for dom_HTMLHRElement **************
var dom_HTMLHRElement = {};
$dynamic("set$width").HTMLHRElement = function(value) {
  this.width = value;
}
// ********** Code for dom_HTMLHeadElement **************
var dom_HTMLHeadElement = {};
// ********** Code for dom_HTMLHeadingElement **************
var dom_HTMLHeadingElement = {};
// ********** Code for dom_HTMLHtmlElement **************
var dom_HTMLHtmlElement = {};
// ********** Code for dom_HTMLIFrameElement **************
var dom_HTMLIFrameElement = {};
$dynamic("set$height").HTMLIFrameElement = function(value) {
  this.height = value;
}
$dynamic("set$width").HTMLIFrameElement = function(value) {
  this.width = value;
}
// ********** Code for dom_HTMLImageElement **************
var dom_HTMLImageElement = {};
$dynamic("set$height").HTMLImageElement = function(value) {
  this.height = value;
}
$dynamic("set$width").HTMLImageElement = function(value) {
  this.width = value;
}
$dynamic("get$x").HTMLImageElement = function() {
  return this.x;
}
$dynamic("get$y").HTMLImageElement = function() {
  return this.y;
}
// ********** Code for dom_HTMLInputElement **************
var dom_HTMLInputElement = {};
$dynamic("get$type").HTMLInputElement = function() {
  return this.type;
}
$dynamic("set$type").HTMLInputElement = function(value) {
  this.type = value;
}
// ********** Code for dom_HTMLIsIndexElement **************
var dom_HTMLIsIndexElement = {};
// ********** Code for dom_HTMLKeygenElement **************
var dom_HTMLKeygenElement = {};
$dynamic("get$type").HTMLKeygenElement = function() {
  return this.type;
}
// ********** Code for dom_HTMLLIElement **************
var dom_HTMLLIElement = {};
$dynamic("get$type").HTMLLIElement = function() {
  return this.type;
}
$dynamic("set$type").HTMLLIElement = function(value) {
  this.type = value;
}
// ********** Code for dom_HTMLLabelElement **************
var dom_HTMLLabelElement = {};
// ********** Code for dom_HTMLLegendElement **************
var dom_HTMLLegendElement = {};
// ********** Code for dom_HTMLLinkElement **************
var dom_HTMLLinkElement = {};
$dynamic("get$type").HTMLLinkElement = function() {
  return this.type;
}
$dynamic("set$type").HTMLLinkElement = function(value) {
  this.type = value;
}
// ********** Code for dom_HTMLMapElement **************
var dom_HTMLMapElement = {};
// ********** Code for dom_HTMLMarqueeElement **************
var dom_HTMLMarqueeElement = {};
$dynamic("set$height").HTMLMarqueeElement = function(value) {
  this.height = value;
}
$dynamic("set$width").HTMLMarqueeElement = function(value) {
  this.width = value;
}
// ********** Code for dom_HTMLMediaElement **************
var dom_HTMLMediaElement = {};
// ********** Code for dom_HTMLMenuElement **************
var dom_HTMLMenuElement = {};
// ********** Code for dom_HTMLMetaElement **************
var dom_HTMLMetaElement = {};
// ********** Code for dom_HTMLMeterElement **************
var dom_HTMLMeterElement = {};
// ********** Code for dom_HTMLModElement **************
var dom_HTMLModElement = {};
// ********** Code for dom_HTMLOListElement **************
var dom_HTMLOListElement = {};
$dynamic("get$type").HTMLOListElement = function() {
  return this.type;
}
$dynamic("set$type").HTMLOListElement = function(value) {
  this.type = value;
}
// ********** Code for dom_HTMLObjectElement **************
var dom_HTMLObjectElement = {};
$dynamic("set$height").HTMLObjectElement = function(value) {
  this.height = value;
}
$dynamic("get$type").HTMLObjectElement = function() {
  return this.type;
}
$dynamic("set$type").HTMLObjectElement = function(value) {
  this.type = value;
}
$dynamic("set$width").HTMLObjectElement = function(value) {
  this.width = value;
}
// ********** Code for dom_HTMLOptGroupElement **************
var dom_HTMLOptGroupElement = {};
// ********** Code for dom_HTMLOptionElement **************
var dom_HTMLOptionElement = {};
// ********** Code for dom_HTMLOptionsCollection **************
var dom_HTMLOptionsCollection = {};
$dynamic("get$length").HTMLOptionsCollection = function() {
  return this.length;
}
// ********** Code for dom_HTMLOutputElement **************
var dom_HTMLOutputElement = {};
$dynamic("get$type").HTMLOutputElement = function() {
  return this.type;
}
// ********** Code for dom_HTMLParagraphElement **************
var dom_HTMLParagraphElement = {};
// ********** Code for dom_HTMLParamElement **************
var dom_HTMLParamElement = {};
$dynamic("get$type").HTMLParamElement = function() {
  return this.type;
}
$dynamic("set$type").HTMLParamElement = function(value) {
  this.type = value;
}
// ********** Code for dom_HTMLPreElement **************
var dom_HTMLPreElement = {};
$dynamic("set$width").HTMLPreElement = function(value) {
  this.width = value;
}
// ********** Code for dom_HTMLProgressElement **************
var dom_HTMLProgressElement = {};
$dynamic("get$position").HTMLProgressElement = function() {
  return this.position;
}
// ********** Code for dom_HTMLPropertiesCollection **************
var dom_HTMLPropertiesCollection = {};
$dynamic("get$length").HTMLPropertiesCollection = function() {
  return this.length;
}
// ********** Code for dom_HTMLQuoteElement **************
var dom_HTMLQuoteElement = {};
// ********** Code for dom_HTMLScriptElement **************
var dom_HTMLScriptElement = {};
$dynamic("get$type").HTMLScriptElement = function() {
  return this.type;
}
$dynamic("set$type").HTMLScriptElement = function(value) {
  this.type = value;
}
// ********** Code for dom_HTMLSelectElement **************
var dom_HTMLSelectElement = {};
$dynamic("get$length").HTMLSelectElement = function() {
  return this.length;
}
$dynamic("get$type").HTMLSelectElement = function() {
  return this.type;
}
// ********** Code for dom_HTMLSourceElement **************
var dom_HTMLSourceElement = {};
$dynamic("get$type").HTMLSourceElement = function() {
  return this.type;
}
$dynamic("set$type").HTMLSourceElement = function(value) {
  this.type = value;
}
// ********** Code for dom_HTMLSpanElement **************
var dom_HTMLSpanElement = {};
// ********** Code for dom_HTMLStyleElement **************
var dom_HTMLStyleElement = {};
$dynamic("get$type").HTMLStyleElement = function() {
  return this.type;
}
$dynamic("set$type").HTMLStyleElement = function(value) {
  this.type = value;
}
// ********** Code for dom_HTMLTableCaptionElement **************
var dom_HTMLTableCaptionElement = {};
// ********** Code for dom_HTMLTableCellElement **************
var dom_HTMLTableCellElement = {};
$dynamic("set$height").HTMLTableCellElement = function(value) {
  this.height = value;
}
$dynamic("set$width").HTMLTableCellElement = function(value) {
  this.width = value;
}
// ********** Code for dom_HTMLTableColElement **************
var dom_HTMLTableColElement = {};
$dynamic("set$width").HTMLTableColElement = function(value) {
  this.width = value;
}
// ********** Code for dom_HTMLTableElement **************
var dom_HTMLTableElement = {};
$dynamic("set$width").HTMLTableElement = function(value) {
  this.width = value;
}
// ********** Code for dom_HTMLTableRowElement **************
var dom_HTMLTableRowElement = {};
// ********** Code for dom_HTMLTableSectionElement **************
var dom_HTMLTableSectionElement = {};
// ********** Code for dom_HTMLTextAreaElement **************
var dom_HTMLTextAreaElement = {};
$dynamic("get$type").HTMLTextAreaElement = function() {
  return this.type;
}
// ********** Code for dom_HTMLTitleElement **************
var dom_HTMLTitleElement = {};
// ********** Code for dom_HTMLTrackElement **************
var dom_HTMLTrackElement = {};
// ********** Code for dom_HTMLUListElement **************
var dom_HTMLUListElement = {};
$dynamic("get$type").HTMLUListElement = function() {
  return this.type;
}
$dynamic("set$type").HTMLUListElement = function(value) {
  this.type = value;
}
// ********** Code for dom_HTMLUnknownElement **************
var dom_HTMLUnknownElement = {};
// ********** Code for dom_HTMLVideoElement **************
var dom_HTMLVideoElement = {};
$dynamic("set$height").HTMLVideoElement = function(value) {
  this.height = value;
}
$dynamic("set$width").HTMLVideoElement = function(value) {
  this.width = value;
}
// ********** Code for HashChangeEvent **************
// ********** Code for HighPass2FilterNode **************
// ********** Code for History **************
$dynamic("get$length").History = function() {
  return this.length;
}
$dynamic("get$dartObjectLocalStorage").History = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").History = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for IDBAny **************
$dynamic("get$dartObjectLocalStorage").IDBAny = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").IDBAny = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for IDBCursor **************
$dynamic("get$dartObjectLocalStorage").IDBCursor = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").IDBCursor = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for IDBCursorWithValue **************
// ********** Code for IDBDatabase **************
$dynamic("get$dartObjectLocalStorage").IDBDatabase = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").IDBDatabase = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for IDBDatabaseError **************
$dynamic("get$dartObjectLocalStorage").IDBDatabaseError = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").IDBDatabaseError = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for IDBDatabaseException **************
$dynamic("get$dartObjectLocalStorage").IDBDatabaseException = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").IDBDatabaseException = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for IDBFactory **************
$dynamic("get$dartObjectLocalStorage").IDBFactory = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").IDBFactory = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for IDBIndex **************
$dynamic("get$dartObjectLocalStorage").IDBIndex = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").IDBIndex = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for IDBKey **************
$dynamic("get$dartObjectLocalStorage").IDBKey = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").IDBKey = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for IDBKeyRange **************
$dynamic("get$dartObjectLocalStorage").IDBKeyRange = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").IDBKeyRange = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for IDBObjectStore **************
$dynamic("get$dartObjectLocalStorage").IDBObjectStore = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").IDBObjectStore = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("add$1").IDBObjectStore = function($0) {
  return this.add($0);
};
// ********** Code for IDBRequest **************
$dynamic("get$dartObjectLocalStorage").IDBRequest = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").IDBRequest = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for IDBTransaction **************
$dynamic("get$dartObjectLocalStorage").IDBTransaction = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").IDBTransaction = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for IDBVersionChangeEvent **************
// ********** Code for IDBVersionChangeRequest **************
// ********** Code for ImageData **************
$dynamic("get$dartObjectLocalStorage").ImageData = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").ImageData = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_InjectedScriptHost **************
var dom_InjectedScriptHost = {};
$dynamic("get$type").InjectedScriptHost = function() {
  return this.type.bind(this);
}
$dynamic("get$dartObjectLocalStorage").InjectedScriptHost = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").InjectedScriptHost = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_InspectorFrontendHost **************
var dom_InspectorFrontendHost = {};
$dynamic("get$dartObjectLocalStorage").InspectorFrontendHost = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").InspectorFrontendHost = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for Int16Array **************
$dynamic("get$length").Int16Array = function() {
  return this.length;
}
// ********** Code for Int32Array **************
$dynamic("get$length").Int32Array = function() {
  return this.length;
}
// ********** Code for Int8Array **************
$dynamic("get$length").Int8Array = function() {
  return this.length;
}
// ********** Code for JavaScriptAudioNode **************
// ********** Code for dom_JavaScriptCallFrame **************
var dom_JavaScriptCallFrame = {};
$dynamic("get$type").JavaScriptCallFrame = function() {
  return this.type;
}
$dynamic("get$dartObjectLocalStorage").JavaScriptCallFrame = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").JavaScriptCallFrame = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for KeyboardEvent **************
// ********** Code for Location **************
$dynamic("get$dartObjectLocalStorage").Location = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Location = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for LowPass2FilterNode **************
// ********** Code for dom_MediaController **************
var dom_MediaController = {};
$dynamic("get$dartObjectLocalStorage").MediaController = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").MediaController = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for MediaElementAudioSourceNode **************
// ********** Code for MediaError **************
$dynamic("get$dartObjectLocalStorage").MediaError = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").MediaError = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for MediaList **************
$dynamic("get$length").MediaList = function() {
  return this.length;
}
$dynamic("$setindex").MediaList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("get$dartObjectLocalStorage").MediaList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").MediaList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for MediaQueryList **************
$dynamic("get$dartObjectLocalStorage").MediaQueryList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").MediaQueryList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for MediaQueryListListener **************
$dynamic("get$dartObjectLocalStorage").MediaQueryListListener = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").MediaQueryListListener = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_MemoryInfo **************
var dom_MemoryInfo = {};
$dynamic("get$dartObjectLocalStorage").MemoryInfo = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").MemoryInfo = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for MessageChannel **************
$dynamic("get$dartObjectLocalStorage").MessageChannel = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").MessageChannel = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for MessageEvent **************
// ********** Code for MessagePort **************
$dynamic("get$dartObjectLocalStorage").MessagePort = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").MessagePort = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for Metadata **************
$dynamic("get$dartObjectLocalStorage").Metadata = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Metadata = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for MouseEvent **************
$dynamic("get$x").MouseEvent = function() {
  return this.x;
}
$dynamic("get$y").MouseEvent = function() {
  return this.y;
}
// ********** Code for MutationCallback **************
$dynamic("get$dartObjectLocalStorage").MutationCallback = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").MutationCallback = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for MutationEvent **************
// ********** Code for MutationRecord **************
$dynamic("get$type").MutationRecord = function() {
  return this.type;
}
$dynamic("get$dartObjectLocalStorage").MutationRecord = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").MutationRecord = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_NamedNodeMap **************
var dom_NamedNodeMap = {};
$dynamic("get$length").NamedNodeMap = function() {
  return this.length;
}
$dynamic("$setindex").NamedNodeMap = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("get$dartObjectLocalStorage").NamedNodeMap = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").NamedNodeMap = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for Navigator **************
$dynamic("get$dartObjectLocalStorage").Navigator = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Navigator = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for Node **************
$dynamic("get$childNodes").Node = function() {
  return this.childNodes;
}
$dynamic("get$parentNode").Node = function() {
  return this.parentNode;
}
$dynamic("get$dartObjectLocalStorage").Node = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Node = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_NodeFilter **************
var dom_NodeFilter = {};
$dynamic("get$dartObjectLocalStorage").NodeFilter = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").NodeFilter = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_NodeIterator **************
var dom_NodeIterator = {};
$dynamic("get$dartObjectLocalStorage").NodeIterator = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").NodeIterator = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for NodeList **************
$dynamic("get$length").NodeList = function() {
  return this.length;
}
$dynamic("$setindex").NodeList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("get$dartObjectLocalStorage").NodeList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").NodeList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_NodeSelector **************
var dom_NodeSelector = {};
$dynamic("get$dartObjectLocalStorage").NodeSelector = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").NodeSelector = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for Notation **************
// ********** Code for Notification **************
$dynamic("get$dartObjectLocalStorage").Notification = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Notification = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for NotificationCenter **************
$dynamic("get$dartObjectLocalStorage").NotificationCenter = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").NotificationCenter = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for OESStandardDerivatives **************
$dynamic("get$dartObjectLocalStorage").OESStandardDerivatives = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").OESStandardDerivatives = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for OESTextureFloat **************
$dynamic("get$dartObjectLocalStorage").OESTextureFloat = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").OESTextureFloat = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for OESVertexArrayObject **************
$dynamic("get$dartObjectLocalStorage").OESVertexArrayObject = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").OESVertexArrayObject = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for OfflineAudioCompletionEvent **************
// ********** Code for OperationNotAllowedException **************
$dynamic("get$dartObjectLocalStorage").OperationNotAllowedException = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").OperationNotAllowedException = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for OverflowEvent **************
// ********** Code for PageTransitionEvent **************
// ********** Code for dom_Performance **************
var dom_Performance = {};
$dynamic("get$dartObjectLocalStorage").Performance = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Performance = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_PerformanceNavigation **************
var dom_PerformanceNavigation = {};
$dynamic("get$type").PerformanceNavigation = function() {
  return this.type;
}
$dynamic("get$dartObjectLocalStorage").PerformanceNavigation = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").PerformanceNavigation = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_PerformanceTiming **************
var dom_PerformanceTiming = {};
$dynamic("get$dartObjectLocalStorage").PerformanceTiming = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").PerformanceTiming = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_PointerLock **************
var dom_PointerLock = {};
$dynamic("get$dartObjectLocalStorage").PointerLock = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").PointerLock = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for PopStateEvent **************
// ********** Code for PositionError **************
$dynamic("get$dartObjectLocalStorage").PositionError = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").PositionError = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for ProcessingInstruction **************
// ********** Code for ProgressEvent **************
// ********** Code for RGBColor **************
$dynamic("get$dartObjectLocalStorage").RGBColor = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").RGBColor = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for Range **************
$dynamic("get$dartObjectLocalStorage").Range = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Range = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for RangeException **************
$dynamic("get$dartObjectLocalStorage").RangeException = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").RangeException = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for RealtimeAnalyserNode **************
// ********** Code for Rect **************
$dynamic("get$dartObjectLocalStorage").Rect = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Rect = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SQLError **************
var dom_SQLError = {};
$dynamic("get$dartObjectLocalStorage").SQLError = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SQLError = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SQLException **************
var dom_SQLException = {};
$dynamic("get$dartObjectLocalStorage").SQLException = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SQLException = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SQLResultSet **************
var dom_SQLResultSet = {};
$dynamic("get$dartObjectLocalStorage").SQLResultSet = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SQLResultSet = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SQLResultSetRowList **************
var dom_SQLResultSetRowList = {};
$dynamic("get$length").SQLResultSetRowList = function() {
  return this.length;
}
$dynamic("get$dartObjectLocalStorage").SQLResultSetRowList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SQLResultSetRowList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SQLTransaction **************
var dom_SQLTransaction = {};
$dynamic("get$dartObjectLocalStorage").SQLTransaction = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SQLTransaction = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SQLTransactionSync **************
var dom_SQLTransactionSync = {};
$dynamic("get$dartObjectLocalStorage").SQLTransactionSync = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SQLTransactionSync = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGAElement **************
// ********** Code for SVGAltGlyphDefElement **************
// ********** Code for SVGAltGlyphElement **************
// ********** Code for SVGAltGlyphItemElement **************
// ********** Code for SVGAngle **************
$dynamic("get$dartObjectLocalStorage").SVGAngle = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGAngle = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGAnimateColorElement **************
// ********** Code for SVGAnimateElement **************
// ********** Code for SVGAnimateMotionElement **************
// ********** Code for SVGAnimateTransformElement **************
// ********** Code for SVGAnimatedAngle **************
$dynamic("get$dartObjectLocalStorage").SVGAnimatedAngle = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGAnimatedAngle = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGAnimatedBoolean **************
$dynamic("get$dartObjectLocalStorage").SVGAnimatedBoolean = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGAnimatedBoolean = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGAnimatedEnumeration **************
$dynamic("get$dartObjectLocalStorage").SVGAnimatedEnumeration = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGAnimatedEnumeration = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGAnimatedInteger **************
$dynamic("get$dartObjectLocalStorage").SVGAnimatedInteger = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGAnimatedInteger = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGAnimatedLength **************
$dynamic("get$dartObjectLocalStorage").SVGAnimatedLength = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGAnimatedLength = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGAnimatedLengthList **************
$dynamic("get$dartObjectLocalStorage").SVGAnimatedLengthList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGAnimatedLengthList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGAnimatedNumber **************
$dynamic("get$dartObjectLocalStorage").SVGAnimatedNumber = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGAnimatedNumber = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGAnimatedNumberList **************
$dynamic("get$dartObjectLocalStorage").SVGAnimatedNumberList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGAnimatedNumberList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGAnimatedPreserveAspectRatio **************
$dynamic("get$dartObjectLocalStorage").SVGAnimatedPreserveAspectRatio = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGAnimatedPreserveAspectRatio = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGAnimatedRect **************
$dynamic("get$dartObjectLocalStorage").SVGAnimatedRect = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGAnimatedRect = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGAnimatedString **************
$dynamic("get$dartObjectLocalStorage").SVGAnimatedString = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGAnimatedString = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGAnimatedTransformList **************
$dynamic("get$dartObjectLocalStorage").SVGAnimatedTransformList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGAnimatedTransformList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGAnimationElement **************
// ********** Code for SVGCircleElement **************
// ********** Code for SVGClipPathElement **************
// ********** Code for SVGColor **************
// ********** Code for SVGComponentTransferFunctionElement **************
$dynamic("get$type").SVGComponentTransferFunctionElement = function() {
  return this.type;
}
// ********** Code for SVGCursorElement **************
$dynamic("get$x").SVGCursorElement = function() {
  return this.x;
}
$dynamic("get$y").SVGCursorElement = function() {
  return this.y;
}
// ********** Code for SVGDefsElement **************
// ********** Code for SVGDescElement **************
// ********** Code for SVGDocument **************
$dynamic("get$rootElement").SVGDocument = function() {
  return this.rootElement;
}
// ********** Code for SVGElement **************
// ********** Code for SVGElementInstance **************
$dynamic("get$childNodes").SVGElementInstance = function() {
  return this.childNodes;
}
$dynamic("get$parentNode").SVGElementInstance = function() {
  return this.parentNode;
}
$dynamic("get$dartObjectLocalStorage").SVGElementInstance = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGElementInstance = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGElementInstanceList **************
$dynamic("get$length").SVGElementInstanceList = function() {
  return this.length;
}
$dynamic("get$dartObjectLocalStorage").SVGElementInstanceList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGElementInstanceList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGEllipseElement **************
// ********** Code for SVGException **************
$dynamic("get$dartObjectLocalStorage").SVGException = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGException = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGExternalResourcesRequired **************
$dynamic("get$dartObjectLocalStorage").SVGExternalResourcesRequired = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGExternalResourcesRequired = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGFEBlendElement **************
$dynamic("get$x").SVGFEBlendElement = function() {
  return this.x;
}
$dynamic("get$y").SVGFEBlendElement = function() {
  return this.y;
}
// ********** Code for SVGFEColorMatrixElement **************
$dynamic("get$type").SVGFEColorMatrixElement = function() {
  return this.type;
}
$dynamic("get$x").SVGFEColorMatrixElement = function() {
  return this.x;
}
$dynamic("get$y").SVGFEColorMatrixElement = function() {
  return this.y;
}
// ********** Code for SVGFEComponentTransferElement **************
$dynamic("get$x").SVGFEComponentTransferElement = function() {
  return this.x;
}
$dynamic("get$y").SVGFEComponentTransferElement = function() {
  return this.y;
}
// ********** Code for dom_SVGFECompositeElement **************
var dom_SVGFECompositeElement = {};
$dynamic("get$x").SVGFECompositeElement = function() {
  return this.x;
}
$dynamic("get$y").SVGFECompositeElement = function() {
  return this.y;
}
// ********** Code for SVGFEConvolveMatrixElement **************
$dynamic("get$x").SVGFEConvolveMatrixElement = function() {
  return this.x;
}
$dynamic("get$y").SVGFEConvolveMatrixElement = function() {
  return this.y;
}
// ********** Code for SVGFEDiffuseLightingElement **************
$dynamic("get$x").SVGFEDiffuseLightingElement = function() {
  return this.x;
}
$dynamic("get$y").SVGFEDiffuseLightingElement = function() {
  return this.y;
}
// ********** Code for SVGFEDisplacementMapElement **************
$dynamic("get$x").SVGFEDisplacementMapElement = function() {
  return this.x;
}
$dynamic("get$y").SVGFEDisplacementMapElement = function() {
  return this.y;
}
// ********** Code for SVGFEDistantLightElement **************
// ********** Code for SVGFEDropShadowElement **************
$dynamic("get$x").SVGFEDropShadowElement = function() {
  return this.x;
}
$dynamic("get$y").SVGFEDropShadowElement = function() {
  return this.y;
}
// ********** Code for SVGFEFloodElement **************
$dynamic("get$x").SVGFEFloodElement = function() {
  return this.x;
}
$dynamic("get$y").SVGFEFloodElement = function() {
  return this.y;
}
// ********** Code for SVGFEFuncAElement **************
// ********** Code for SVGFEFuncBElement **************
// ********** Code for SVGFEFuncGElement **************
// ********** Code for SVGFEFuncRElement **************
// ********** Code for SVGFEGaussianBlurElement **************
$dynamic("get$x").SVGFEGaussianBlurElement = function() {
  return this.x;
}
$dynamic("get$y").SVGFEGaussianBlurElement = function() {
  return this.y;
}
// ********** Code for SVGFEImageElement **************
$dynamic("get$x").SVGFEImageElement = function() {
  return this.x;
}
$dynamic("get$y").SVGFEImageElement = function() {
  return this.y;
}
// ********** Code for SVGFEMergeElement **************
$dynamic("get$x").SVGFEMergeElement = function() {
  return this.x;
}
$dynamic("get$y").SVGFEMergeElement = function() {
  return this.y;
}
// ********** Code for SVGFEMergeNodeElement **************
// ********** Code for dom_SVGFEMorphologyElement **************
var dom_SVGFEMorphologyElement = {};
$dynamic("get$x").SVGFEMorphologyElement = function() {
  return this.x;
}
$dynamic("get$y").SVGFEMorphologyElement = function() {
  return this.y;
}
// ********** Code for SVGFEOffsetElement **************
$dynamic("get$x").SVGFEOffsetElement = function() {
  return this.x;
}
$dynamic("get$y").SVGFEOffsetElement = function() {
  return this.y;
}
// ********** Code for SVGFEPointLightElement **************
$dynamic("get$x").SVGFEPointLightElement = function() {
  return this.x;
}
$dynamic("get$y").SVGFEPointLightElement = function() {
  return this.y;
}
$dynamic("get$z").SVGFEPointLightElement = function() {
  return this.z;
}
// ********** Code for SVGFESpecularLightingElement **************
$dynamic("get$x").SVGFESpecularLightingElement = function() {
  return this.x;
}
$dynamic("get$y").SVGFESpecularLightingElement = function() {
  return this.y;
}
// ********** Code for SVGFESpotLightElement **************
$dynamic("get$x").SVGFESpotLightElement = function() {
  return this.x;
}
$dynamic("get$y").SVGFESpotLightElement = function() {
  return this.y;
}
$dynamic("get$z").SVGFESpotLightElement = function() {
  return this.z;
}
// ********** Code for SVGFETileElement **************
$dynamic("get$x").SVGFETileElement = function() {
  return this.x;
}
$dynamic("get$y").SVGFETileElement = function() {
  return this.y;
}
// ********** Code for SVGFETurbulenceElement **************
$dynamic("get$type").SVGFETurbulenceElement = function() {
  return this.type;
}
$dynamic("get$x").SVGFETurbulenceElement = function() {
  return this.x;
}
$dynamic("get$y").SVGFETurbulenceElement = function() {
  return this.y;
}
// ********** Code for SVGFilterElement **************
$dynamic("get$x").SVGFilterElement = function() {
  return this.x;
}
$dynamic("get$y").SVGFilterElement = function() {
  return this.y;
}
// ********** Code for SVGFilterPrimitiveStandardAttributes **************
$dynamic("get$x").SVGFilterPrimitiveStandardAttributes = function() {
  return this.x;
}
$dynamic("get$y").SVGFilterPrimitiveStandardAttributes = function() {
  return this.y;
}
// ********** Code for SVGFitToViewBox **************
$dynamic("get$dartObjectLocalStorage").SVGFitToViewBox = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGFitToViewBox = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGFontElement **************
// ********** Code for SVGFontFaceElement **************
// ********** Code for SVGFontFaceFormatElement **************
// ********** Code for SVGFontFaceNameElement **************
// ********** Code for SVGFontFaceSrcElement **************
// ********** Code for SVGFontFaceUriElement **************
// ********** Code for SVGForeignObjectElement **************
$dynamic("get$x").SVGForeignObjectElement = function() {
  return this.x;
}
$dynamic("get$y").SVGForeignObjectElement = function() {
  return this.y;
}
// ********** Code for SVGGElement **************
// ********** Code for SVGGlyphElement **************
// ********** Code for SVGGlyphRefElement **************
$dynamic("get$x").SVGGlyphRefElement = function() {
  return this.x;
}
$dynamic("set$x").SVGGlyphRefElement = function(value) {
  this.x = value;
}
$dynamic("get$y").SVGGlyphRefElement = function() {
  return this.y;
}
$dynamic("set$y").SVGGlyphRefElement = function(value) {
  this.y = value;
}
// ********** Code for SVGGradientElement **************
// ********** Code for SVGHKernElement **************
// ********** Code for SVGImageElement **************
$dynamic("get$x").SVGImageElement = function() {
  return this.x;
}
$dynamic("get$y").SVGImageElement = function() {
  return this.y;
}
// ********** Code for SVGLangSpace **************
$dynamic("get$dartObjectLocalStorage").SVGLangSpace = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGLangSpace = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGLength **************
$dynamic("get$dartObjectLocalStorage").SVGLength = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGLength = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGLengthList **************
$dynamic("get$dartObjectLocalStorage").SVGLengthList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGLengthList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGLineElement **************
// ********** Code for SVGLinearGradientElement **************
// ********** Code for SVGLocatable **************
$dynamic("get$dartObjectLocalStorage").SVGLocatable = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGLocatable = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGMPathElement **************
// ********** Code for SVGMarkerElement **************
// ********** Code for SVGMaskElement **************
$dynamic("get$x").SVGMaskElement = function() {
  return this.x;
}
$dynamic("get$y").SVGMaskElement = function() {
  return this.y;
}
// ********** Code for SVGMatrix **************
$dynamic("get$dartObjectLocalStorage").SVGMatrix = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGMatrix = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGMetadataElement **************
// ********** Code for SVGMissingGlyphElement **************
// ********** Code for SVGNumber **************
$dynamic("get$dartObjectLocalStorage").SVGNumber = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGNumber = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGNumberList **************
$dynamic("get$dartObjectLocalStorage").SVGNumberList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGNumberList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGPaint **************
// ********** Code for SVGPathElement **************
// ********** Code for SVGPathSeg **************
$dynamic("get$dartObjectLocalStorage").SVGPathSeg = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGPathSeg = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGPathSegArcAbs **************
$dynamic("get$angle").SVGPathSegArcAbs = function() {
  return this.angle;
}
$dynamic("set$angle").SVGPathSegArcAbs = function(value) {
  this.angle = value;
}
$dynamic("get$x").SVGPathSegArcAbs = function() {
  return this.x;
}
$dynamic("set$x").SVGPathSegArcAbs = function(value) {
  this.x = value;
}
$dynamic("get$y").SVGPathSegArcAbs = function() {
  return this.y;
}
$dynamic("set$y").SVGPathSegArcAbs = function(value) {
  this.y = value;
}
// ********** Code for SVGPathSegArcRel **************
$dynamic("get$angle").SVGPathSegArcRel = function() {
  return this.angle;
}
$dynamic("set$angle").SVGPathSegArcRel = function(value) {
  this.angle = value;
}
$dynamic("get$x").SVGPathSegArcRel = function() {
  return this.x;
}
$dynamic("set$x").SVGPathSegArcRel = function(value) {
  this.x = value;
}
$dynamic("get$y").SVGPathSegArcRel = function() {
  return this.y;
}
$dynamic("set$y").SVGPathSegArcRel = function(value) {
  this.y = value;
}
// ********** Code for SVGPathSegClosePath **************
// ********** Code for SVGPathSegCurvetoCubicAbs **************
$dynamic("get$x").SVGPathSegCurvetoCubicAbs = function() {
  return this.x;
}
$dynamic("set$x").SVGPathSegCurvetoCubicAbs = function(value) {
  this.x = value;
}
$dynamic("get$y").SVGPathSegCurvetoCubicAbs = function() {
  return this.y;
}
$dynamic("set$y").SVGPathSegCurvetoCubicAbs = function(value) {
  this.y = value;
}
// ********** Code for SVGPathSegCurvetoCubicRel **************
$dynamic("get$x").SVGPathSegCurvetoCubicRel = function() {
  return this.x;
}
$dynamic("set$x").SVGPathSegCurvetoCubicRel = function(value) {
  this.x = value;
}
$dynamic("get$y").SVGPathSegCurvetoCubicRel = function() {
  return this.y;
}
$dynamic("set$y").SVGPathSegCurvetoCubicRel = function(value) {
  this.y = value;
}
// ********** Code for SVGPathSegCurvetoCubicSmoothAbs **************
$dynamic("get$x").SVGPathSegCurvetoCubicSmoothAbs = function() {
  return this.x;
}
$dynamic("set$x").SVGPathSegCurvetoCubicSmoothAbs = function(value) {
  this.x = value;
}
$dynamic("get$y").SVGPathSegCurvetoCubicSmoothAbs = function() {
  return this.y;
}
$dynamic("set$y").SVGPathSegCurvetoCubicSmoothAbs = function(value) {
  this.y = value;
}
// ********** Code for SVGPathSegCurvetoCubicSmoothRel **************
$dynamic("get$x").SVGPathSegCurvetoCubicSmoothRel = function() {
  return this.x;
}
$dynamic("set$x").SVGPathSegCurvetoCubicSmoothRel = function(value) {
  this.x = value;
}
$dynamic("get$y").SVGPathSegCurvetoCubicSmoothRel = function() {
  return this.y;
}
$dynamic("set$y").SVGPathSegCurvetoCubicSmoothRel = function(value) {
  this.y = value;
}
// ********** Code for SVGPathSegCurvetoQuadraticAbs **************
$dynamic("get$x").SVGPathSegCurvetoQuadraticAbs = function() {
  return this.x;
}
$dynamic("set$x").SVGPathSegCurvetoQuadraticAbs = function(value) {
  this.x = value;
}
$dynamic("get$y").SVGPathSegCurvetoQuadraticAbs = function() {
  return this.y;
}
$dynamic("set$y").SVGPathSegCurvetoQuadraticAbs = function(value) {
  this.y = value;
}
// ********** Code for SVGPathSegCurvetoQuadraticRel **************
$dynamic("get$x").SVGPathSegCurvetoQuadraticRel = function() {
  return this.x;
}
$dynamic("set$x").SVGPathSegCurvetoQuadraticRel = function(value) {
  this.x = value;
}
$dynamic("get$y").SVGPathSegCurvetoQuadraticRel = function() {
  return this.y;
}
$dynamic("set$y").SVGPathSegCurvetoQuadraticRel = function(value) {
  this.y = value;
}
// ********** Code for SVGPathSegCurvetoQuadraticSmoothAbs **************
$dynamic("get$x").SVGPathSegCurvetoQuadraticSmoothAbs = function() {
  return this.x;
}
$dynamic("set$x").SVGPathSegCurvetoQuadraticSmoothAbs = function(value) {
  this.x = value;
}
$dynamic("get$y").SVGPathSegCurvetoQuadraticSmoothAbs = function() {
  return this.y;
}
$dynamic("set$y").SVGPathSegCurvetoQuadraticSmoothAbs = function(value) {
  this.y = value;
}
// ********** Code for SVGPathSegCurvetoQuadraticSmoothRel **************
$dynamic("get$x").SVGPathSegCurvetoQuadraticSmoothRel = function() {
  return this.x;
}
$dynamic("set$x").SVGPathSegCurvetoQuadraticSmoothRel = function(value) {
  this.x = value;
}
$dynamic("get$y").SVGPathSegCurvetoQuadraticSmoothRel = function() {
  return this.y;
}
$dynamic("set$y").SVGPathSegCurvetoQuadraticSmoothRel = function(value) {
  this.y = value;
}
// ********** Code for SVGPathSegLinetoAbs **************
$dynamic("get$x").SVGPathSegLinetoAbs = function() {
  return this.x;
}
$dynamic("set$x").SVGPathSegLinetoAbs = function(value) {
  this.x = value;
}
$dynamic("get$y").SVGPathSegLinetoAbs = function() {
  return this.y;
}
$dynamic("set$y").SVGPathSegLinetoAbs = function(value) {
  this.y = value;
}
// ********** Code for SVGPathSegLinetoHorizontalAbs **************
$dynamic("get$x").SVGPathSegLinetoHorizontalAbs = function() {
  return this.x;
}
$dynamic("set$x").SVGPathSegLinetoHorizontalAbs = function(value) {
  this.x = value;
}
// ********** Code for SVGPathSegLinetoHorizontalRel **************
$dynamic("get$x").SVGPathSegLinetoHorizontalRel = function() {
  return this.x;
}
$dynamic("set$x").SVGPathSegLinetoHorizontalRel = function(value) {
  this.x = value;
}
// ********** Code for SVGPathSegLinetoRel **************
$dynamic("get$x").SVGPathSegLinetoRel = function() {
  return this.x;
}
$dynamic("set$x").SVGPathSegLinetoRel = function(value) {
  this.x = value;
}
$dynamic("get$y").SVGPathSegLinetoRel = function() {
  return this.y;
}
$dynamic("set$y").SVGPathSegLinetoRel = function(value) {
  this.y = value;
}
// ********** Code for SVGPathSegLinetoVerticalAbs **************
$dynamic("get$y").SVGPathSegLinetoVerticalAbs = function() {
  return this.y;
}
$dynamic("set$y").SVGPathSegLinetoVerticalAbs = function(value) {
  this.y = value;
}
// ********** Code for SVGPathSegLinetoVerticalRel **************
$dynamic("get$y").SVGPathSegLinetoVerticalRel = function() {
  return this.y;
}
$dynamic("set$y").SVGPathSegLinetoVerticalRel = function(value) {
  this.y = value;
}
// ********** Code for SVGPathSegList **************
$dynamic("get$dartObjectLocalStorage").SVGPathSegList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGPathSegList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGPathSegMovetoAbs **************
$dynamic("get$x").SVGPathSegMovetoAbs = function() {
  return this.x;
}
$dynamic("set$x").SVGPathSegMovetoAbs = function(value) {
  this.x = value;
}
$dynamic("get$y").SVGPathSegMovetoAbs = function() {
  return this.y;
}
$dynamic("set$y").SVGPathSegMovetoAbs = function(value) {
  this.y = value;
}
// ********** Code for SVGPathSegMovetoRel **************
$dynamic("get$x").SVGPathSegMovetoRel = function() {
  return this.x;
}
$dynamic("set$x").SVGPathSegMovetoRel = function(value) {
  this.x = value;
}
$dynamic("get$y").SVGPathSegMovetoRel = function() {
  return this.y;
}
$dynamic("set$y").SVGPathSegMovetoRel = function(value) {
  this.y = value;
}
// ********** Code for SVGPatternElement **************
$dynamic("get$x").SVGPatternElement = function() {
  return this.x;
}
$dynamic("get$y").SVGPatternElement = function() {
  return this.y;
}
// ********** Code for SVGPoint **************
$dynamic("get$x").SVGPoint = function() {
  return this.x;
}
$dynamic("set$x").SVGPoint = function(value) {
  this.x = value;
}
$dynamic("get$y").SVGPoint = function() {
  return this.y;
}
$dynamic("set$y").SVGPoint = function(value) {
  this.y = value;
}
$dynamic("get$dartObjectLocalStorage").SVGPoint = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGPoint = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGPointList **************
$dynamic("get$dartObjectLocalStorage").SVGPointList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGPointList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGPolygonElement **************
// ********** Code for SVGPolylineElement **************
// ********** Code for SVGPreserveAspectRatio **************
$dynamic("get$dartObjectLocalStorage").SVGPreserveAspectRatio = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGPreserveAspectRatio = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGRadialGradientElement **************
// ********** Code for SVGRect **************
$dynamic("set$height").SVGRect = function(value) {
  this.height = value;
}
$dynamic("set$width").SVGRect = function(value) {
  this.width = value;
}
$dynamic("get$x").SVGRect = function() {
  return this.x;
}
$dynamic("set$x").SVGRect = function(value) {
  this.x = value;
}
$dynamic("get$y").SVGRect = function() {
  return this.y;
}
$dynamic("set$y").SVGRect = function(value) {
  this.y = value;
}
$dynamic("get$dartObjectLocalStorage").SVGRect = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGRect = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGRectElement **************
$dynamic("get$x").SVGRectElement = function() {
  return this.x;
}
$dynamic("get$y").SVGRectElement = function() {
  return this.y;
}
// ********** Code for SVGRenderingIntent **************
$dynamic("get$dartObjectLocalStorage").SVGRenderingIntent = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGRenderingIntent = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGSVGElement **************
$dynamic("get$viewport").SVGSVGElement = function() {
  return this.viewport;
}
$dynamic("get$x").SVGSVGElement = function() {
  return this.x;
}
$dynamic("get$y").SVGSVGElement = function() {
  return this.y;
}
// ********** Code for SVGScriptElement **************
$dynamic("get$type").SVGScriptElement = function() {
  return this.type;
}
$dynamic("set$type").SVGScriptElement = function(value) {
  this.type = value;
}
// ********** Code for SVGSetElement **************
// ********** Code for SVGStopElement **************
// ********** Code for SVGStringList **************
$dynamic("get$dartObjectLocalStorage").SVGStringList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGStringList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGStylable **************
$dynamic("get$dartObjectLocalStorage").SVGStylable = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGStylable = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGStyleElement **************
$dynamic("get$type").SVGStyleElement = function() {
  return this.type;
}
$dynamic("set$type").SVGStyleElement = function(value) {
  this.type = value;
}
// ********** Code for SVGSwitchElement **************
// ********** Code for SVGSymbolElement **************
// ********** Code for SVGTRefElement **************
// ********** Code for SVGTSpanElement **************
// ********** Code for SVGTests **************
$dynamic("get$dartObjectLocalStorage").SVGTests = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGTests = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGTextContentElement **************
// ********** Code for SVGTextElement **************
// ********** Code for SVGTextPathElement **************
// ********** Code for SVGTextPositioningElement **************
$dynamic("get$x").SVGTextPositioningElement = function() {
  return this.x;
}
$dynamic("get$y").SVGTextPositioningElement = function() {
  return this.y;
}
// ********** Code for SVGTitleElement **************
// ********** Code for SVGTransform **************
$dynamic("get$angle").SVGTransform = function() {
  return this.angle;
}
$dynamic("get$type").SVGTransform = function() {
  return this.type;
}
$dynamic("get$dartObjectLocalStorage").SVGTransform = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGTransform = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGTransformList **************
$dynamic("get$dartObjectLocalStorage").SVGTransformList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGTransformList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGTransformable **************
// ********** Code for SVGURIReference **************
$dynamic("get$dartObjectLocalStorage").SVGURIReference = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGURIReference = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGUnitTypes **************
$dynamic("get$dartObjectLocalStorage").SVGUnitTypes = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGUnitTypes = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGUseElement **************
$dynamic("get$x").SVGUseElement = function() {
  return this.x;
}
$dynamic("get$y").SVGUseElement = function() {
  return this.y;
}
// ********** Code for SVGVKernElement **************
// ********** Code for SVGViewElement **************
// ********** Code for SVGViewSpec **************
// ********** Code for SVGZoomAndPan **************
$dynamic("get$dartObjectLocalStorage").SVGZoomAndPan = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGZoomAndPan = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGZoomEvent **************
// ********** Code for Screen **************
$dynamic("get$dartObjectLocalStorage").Screen = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Screen = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_ScriptProfile **************
var dom_ScriptProfile = {};
$dynamic("get$dartObjectLocalStorage").ScriptProfile = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").ScriptProfile = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_ScriptProfileNode **************
var dom_ScriptProfileNode = {};
$dynamic("get$dartObjectLocalStorage").ScriptProfileNode = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").ScriptProfileNode = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SharedWorker **************
// ********** Code for dom_SharedWorkerContext **************
var dom_SharedWorkerContext = {};
// ********** Code for SpeechInputEvent **************
// ********** Code for SpeechInputResult **************
$dynamic("get$dartObjectLocalStorage").SpeechInputResult = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SpeechInputResult = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SpeechInputResultList **************
$dynamic("get$length").SpeechInputResultList = function() {
  return this.length;
}
$dynamic("get$dartObjectLocalStorage").SpeechInputResultList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SpeechInputResultList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for Storage **************
$dynamic("get$length").Storage = function() {
  return this.length;
}
$dynamic("get$dartObjectLocalStorage").Storage = function() {
  
      if (this === window.localStorage)
        return window._dartLocalStorageLocalStorage;
      else if (this === window.sessionStorage)
        return window._dartSessionStorageLocalStorage;
      else
        throw new UnsupportedOperationException('Cannot dartObjectLocalStorage for unknown Storage object.');

}
$dynamic("set$dartObjectLocalStorage").Storage = function(value) {
  
      if (this === window.localStorage)
        window._dartLocalStorageLocalStorage = value;
      else if (this === window.sessionStorage)
        window._dartSessionStorageLocalStorage = value;
      else
        throw new UnsupportedOperationException('Cannot dartObjectLocalStorage for unknown Storage object.');

}
// ********** Code for StorageEvent **************
// ********** Code for StorageInfo **************
$dynamic("get$dartObjectLocalStorage").StorageInfo = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").StorageInfo = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for StyleMedia **************
$dynamic("get$type").StyleMedia = function() {
  return this.type;
}
$dynamic("get$dartObjectLocalStorage").StyleMedia = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").StyleMedia = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for StyleSheet **************
$dynamic("get$type").StyleSheet = function() {
  return this.type;
}
$dynamic("get$dartObjectLocalStorage").StyleSheet = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").StyleSheet = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for StyleSheetList **************
$dynamic("get$length").StyleSheetList = function() {
  return this.length;
}
$dynamic("$setindex").StyleSheetList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("get$dartObjectLocalStorage").StyleSheetList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").StyleSheetList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for Text **************
// ********** Code for TextEvent **************
// ********** Code for TextMetrics **************
$dynamic("get$dartObjectLocalStorage").TextMetrics = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").TextMetrics = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for TextTrack **************
$dynamic("get$dartObjectLocalStorage").TextTrack = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").TextTrack = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for TextTrackCue **************
$dynamic("get$dartObjectLocalStorage").TextTrackCue = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").TextTrackCue = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for TextTrackCueList **************
$dynamic("get$length").TextTrackCueList = function() {
  return this.length;
}
$dynamic("get$dartObjectLocalStorage").TextTrackCueList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").TextTrackCueList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_TextTrackList **************
var dom_TextTrackList = {};
$dynamic("get$length").TextTrackList = function() {
  return this.length;
}
$dynamic("get$dartObjectLocalStorage").TextTrackList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").TextTrackList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for TimeRanges **************
$dynamic("get$length").TimeRanges = function() {
  return this.length;
}
$dynamic("get$dartObjectLocalStorage").TimeRanges = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").TimeRanges = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for Touch **************
$dynamic("get$dartObjectLocalStorage").Touch = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Touch = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for TouchEvent **************
// ********** Code for TouchList **************
$dynamic("get$length").TouchList = function() {
  return this.length;
}
$dynamic("$setindex").TouchList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("get$dartObjectLocalStorage").TouchList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").TouchList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_TrackEvent **************
var dom_TrackEvent = {};
// ********** Code for dom_TreeWalker **************
var dom_TreeWalker = {};
$dynamic("get$parentNode").TreeWalker = function() {
  return this.parentNode.bind(this);
}
$dynamic("get$dartObjectLocalStorage").TreeWalker = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").TreeWalker = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for UIEvent **************
// ********** Code for Uint16Array **************
$dynamic("get$length").Uint16Array = function() {
  return this.length;
}
// ********** Code for Uint32Array **************
$dynamic("get$length").Uint32Array = function() {
  return this.length;
}
// ********** Code for Uint8Array **************
$dynamic("get$length").Uint8Array = function() {
  return this.length;
}
// ********** Code for ValidityState **************
$dynamic("get$dartObjectLocalStorage").ValidityState = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").ValidityState = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for WaveShaperNode **************
// ********** Code for WebGLActiveInfo **************
$dynamic("get$type").WebGLActiveInfo = function() {
  return this.type;
}
$dynamic("get$dartObjectLocalStorage").WebGLActiveInfo = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebGLActiveInfo = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for WebGLBuffer **************
$dynamic("get$dartObjectLocalStorage").WebGLBuffer = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebGLBuffer = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_WebGLCompressedTextures **************
var dom_WebGLCompressedTextures = {};
$dynamic("get$dartObjectLocalStorage").WebGLCompressedTextures = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebGLCompressedTextures = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for WebGLContextAttributes **************
$dynamic("get$dartObjectLocalStorage").WebGLContextAttributes = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebGLContextAttributes = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for WebGLContextEvent **************
// ********** Code for WebGLDebugRendererInfo **************
$dynamic("get$dartObjectLocalStorage").WebGLDebugRendererInfo = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebGLDebugRendererInfo = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for WebGLDebugShaders **************
$dynamic("get$dartObjectLocalStorage").WebGLDebugShaders = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebGLDebugShaders = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for WebGLFramebuffer **************
$dynamic("get$dartObjectLocalStorage").WebGLFramebuffer = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebGLFramebuffer = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_WebGLLoseContext **************
var dom_WebGLLoseContext = {};
$dynamic("get$dartObjectLocalStorage").WebGLLoseContext = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebGLLoseContext = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for WebGLProgram **************
$dynamic("get$dartObjectLocalStorage").WebGLProgram = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebGLProgram = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for WebGLRenderbuffer **************
$dynamic("get$dartObjectLocalStorage").WebGLRenderbuffer = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebGLRenderbuffer = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for WebGLRenderingContext **************
$dynamic("get$viewport").WebGLRenderingContext = function() {
  return this.viewport.bind(this);
}
$dynamic("viewport$4").WebGLRenderingContext = function($0, $1, $2, $3) {
  return this.viewport($0, $1, $2, $3);
};
// ********** Code for WebGLShader **************
$dynamic("get$dartObjectLocalStorage").WebGLShader = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebGLShader = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for WebGLTexture **************
$dynamic("get$dartObjectLocalStorage").WebGLTexture = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebGLTexture = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for WebGLUniformLocation **************
$dynamic("get$dartObjectLocalStorage").WebGLUniformLocation = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebGLUniformLocation = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for WebGLVertexArrayObjectOES **************
$dynamic("get$dartObjectLocalStorage").WebGLVertexArrayObjectOES = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebGLVertexArrayObjectOES = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_WebKitAnimation **************
var dom_WebKitAnimation = {};
$dynamic("get$dartObjectLocalStorage").WebKitAnimation = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebKitAnimation = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_WebKitAnimationEvent **************
var dom_WebKitAnimationEvent = {};
// ********** Code for dom_WebKitAnimationList **************
var dom_WebKitAnimationList = {};
$dynamic("get$length").WebKitAnimationList = function() {
  return this.length;
}
$dynamic("get$dartObjectLocalStorage").WebKitAnimationList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebKitAnimationList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_WebKitBlobBuilder **************
var dom_WebKitBlobBuilder = {};
$dynamic("get$dartObjectLocalStorage").WebKitBlobBuilder = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebKitBlobBuilder = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for WebKitCSSFilterValue **************
// ********** Code for dom_WebKitCSSKeyframeRule **************
var dom_WebKitCSSKeyframeRule = {};
// ********** Code for dom_WebKitCSSKeyframesRule **************
var dom_WebKitCSSKeyframesRule = {};
// ********** Code for dom_WebKitCSSMatrix **************
var dom_WebKitCSSMatrix = {};
$dynamic("get$dartObjectLocalStorage").WebKitCSSMatrix = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebKitCSSMatrix = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_WebKitCSSTransformValue **************
var dom_WebKitCSSTransformValue = {};
// ********** Code for WebKitMutationObserver **************
$dynamic("get$dartObjectLocalStorage").WebKitMutationObserver = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebKitMutationObserver = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_WebKitNamedFlow **************
var dom_WebKitNamedFlow = {};
$dynamic("get$dartObjectLocalStorage").WebKitNamedFlow = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebKitNamedFlow = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_WebKitPoint **************
var dom_WebKitPoint = {};
$dynamic("get$x").WebKitPoint = function() {
  return this.x;
}
$dynamic("set$x").WebKitPoint = function(value) {
  this.x = value;
}
$dynamic("get$y").WebKitPoint = function() {
  return this.y;
}
$dynamic("set$y").WebKitPoint = function(value) {
  this.y = value;
}
$dynamic("get$dartObjectLocalStorage").WebKitPoint = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebKitPoint = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_WebKitTransitionEvent **************
var dom_WebKitTransitionEvent = {};
// ********** Code for WebSocket **************
$dynamic("get$dartObjectLocalStorage").WebSocket = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebSocket = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for WheelEvent **************
$dynamic("get$x").WheelEvent = function() {
  return this.x;
}
$dynamic("get$y").WheelEvent = function() {
  return this.y;
}
// ********** Code for dom_Worker **************
var dom_Worker = {};
// ********** Code for dom_WorkerContext **************
var dom_WorkerContext = {};
$dynamic("get$dartObjectLocalStorage").WorkerContext = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WorkerContext = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_WorkerLocation **************
var dom_WorkerLocation = {};
$dynamic("get$dartObjectLocalStorage").WorkerLocation = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WorkerLocation = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_WorkerNavigator **************
var dom_WorkerNavigator = {};
$dynamic("get$dartObjectLocalStorage").WorkerNavigator = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WorkerNavigator = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for XMLHttpRequest **************
$dynamic("get$dartObjectLocalStorage").XMLHttpRequest = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").XMLHttpRequest = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for XMLHttpRequestException **************
$dynamic("get$dartObjectLocalStorage").XMLHttpRequestException = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").XMLHttpRequestException = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for XMLHttpRequestProgressEvent **************
$dynamic("get$position").XMLHttpRequestProgressEvent = function() {
  return this.position;
}
// ********** Code for XMLHttpRequestUpload **************
$dynamic("get$dartObjectLocalStorage").XMLHttpRequestUpload = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").XMLHttpRequestUpload = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_XMLSerializer **************
var dom_XMLSerializer = {};
$dynamic("get$dartObjectLocalStorage").XMLSerializer = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").XMLSerializer = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_XPathEvaluator **************
var dom_XPathEvaluator = {};
$dynamic("get$dartObjectLocalStorage").XPathEvaluator = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").XPathEvaluator = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_XPathException **************
var dom_XPathException = {};
$dynamic("get$dartObjectLocalStorage").XPathException = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").XPathException = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_XPathExpression **************
var dom_XPathExpression = {};
$dynamic("get$dartObjectLocalStorage").XPathExpression = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").XPathExpression = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_XPathNSResolver **************
var dom_XPathNSResolver = {};
$dynamic("get$dartObjectLocalStorage").XPathNSResolver = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").XPathNSResolver = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_XPathResult **************
var dom_XPathResult = {};
$dynamic("get$dartObjectLocalStorage").XPathResult = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").XPathResult = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_XSLTProcessor **************
var dom_XSLTProcessor = {};
$dynamic("get$dartObjectLocalStorage").XSLTProcessor = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").XSLTProcessor = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom__Collections **************
function dom__Collections() {}
// ********** Code for dom__VariableSizeListIterator **************
function dom__VariableSizeListIterator() {}
dom__VariableSizeListIterator.prototype.hasNext = function() {
  return this._dom_array.get$length() > this._dom_pos;
}
dom__VariableSizeListIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0002);
  }
  return this._dom_array.$index(this._dom_pos++);
}
// ********** Code for dom__FixedSizeListIterator **************
$inherits(dom__FixedSizeListIterator, dom__VariableSizeListIterator);
function dom__FixedSizeListIterator() {}
dom__FixedSizeListIterator.prototype.hasNext = function() {
  return this._dom_length > this._dom_pos;
}
// ********** Code for _Lists **************
function _Lists() {}
// ********** Code for top level **************
function get$window() {
  return window;
}
function get$document() {
  return window.document;
}
//  ********** Library htmlimpl **************
// ********** Code for DOMWrapperBase **************
DOMWrapperBase._wrap$ctor = function(_ptr) {
  this._ptr = _ptr;
  this._ptr.set$dartObjectLocalStorage(this);
}
DOMWrapperBase._wrap$ctor.prototype = DOMWrapperBase.prototype;
function DOMWrapperBase() {}
DOMWrapperBase.prototype.get$_ptr = function() { return this._ptr; };
// ********** Code for EventTargetWrappingImplementation **************
$inherits(EventTargetWrappingImplementation, DOMWrapperBase);
EventTargetWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
EventTargetWrappingImplementation._wrap$ctor.prototype = EventTargetWrappingImplementation.prototype;
function EventTargetWrappingImplementation() {}
// ********** Code for NodeWrappingImplementation **************
$inherits(NodeWrappingImplementation, EventTargetWrappingImplementation);
NodeWrappingImplementation._wrap$ctor = function(ptr) {
  EventTargetWrappingImplementation._wrap$ctor.call(this, ptr);
}
NodeWrappingImplementation._wrap$ctor.prototype = NodeWrappingImplementation.prototype;
function NodeWrappingImplementation() {}
NodeWrappingImplementation.prototype.get$nodes = function() {
  if (this._nodes == null) {
    this._nodes = new _ChildrenNodeList._wrap$ctor(this._ptr);
  }
  return this._nodes;
}
// ********** Code for ElementWrappingImplementation **************
$inherits(ElementWrappingImplementation, NodeWrappingImplementation);
ElementWrappingImplementation._wrap$ctor = function(ptr) {
  NodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
ElementWrappingImplementation._wrap$ctor.prototype = ElementWrappingImplementation.prototype;
function ElementWrappingImplementation() {}
ElementWrappingImplementation.ElementWrappingImplementation$tag$factory = function(tag) {
  return LevelDom.wrapElement(get$document().createElement(tag));
}
// ********** Code for AnchorElementWrappingImplementation **************
$inherits(AnchorElementWrappingImplementation, ElementWrappingImplementation);
AnchorElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
AnchorElementWrappingImplementation._wrap$ctor.prototype = AnchorElementWrappingImplementation.prototype;
function AnchorElementWrappingImplementation() {}
AnchorElementWrappingImplementation.prototype.set$shape = function(value) {
  this._ptr.set$shape(value);
}
AnchorElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
AnchorElementWrappingImplementation.prototype.set$type = function(value) {
  this._ptr.set$type(value);
}
AnchorElementWrappingImplementation.prototype.toString = function() {
  return this._ptr.toString();
}
// ********** Code for AreaElementWrappingImplementation **************
$inherits(AreaElementWrappingImplementation, ElementWrappingImplementation);
AreaElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
AreaElementWrappingImplementation._wrap$ctor.prototype = AreaElementWrappingImplementation.prototype;
function AreaElementWrappingImplementation() {}
AreaElementWrappingImplementation.prototype.set$shape = function(value) {
  this._ptr.set$shape(value);
}
// ********** Code for MediaElementWrappingImplementation **************
$inherits(MediaElementWrappingImplementation, ElementWrappingImplementation);
MediaElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
MediaElementWrappingImplementation._wrap$ctor.prototype = MediaElementWrappingImplementation.prototype;
function MediaElementWrappingImplementation() {}
// ********** Code for AudioElementWrappingImplementation **************
$inherits(AudioElementWrappingImplementation, MediaElementWrappingImplementation);
AudioElementWrappingImplementation._wrap$ctor = function(ptr) {
  MediaElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
AudioElementWrappingImplementation._wrap$ctor.prototype = AudioElementWrappingImplementation.prototype;
function AudioElementWrappingImplementation() {}
// ********** Code for BRElementWrappingImplementation **************
$inherits(BRElementWrappingImplementation, ElementWrappingImplementation);
BRElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
BRElementWrappingImplementation._wrap$ctor.prototype = BRElementWrappingImplementation.prototype;
function BRElementWrappingImplementation() {}
// ********** Code for BaseElementWrappingImplementation **************
$inherits(BaseElementWrappingImplementation, ElementWrappingImplementation);
BaseElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
BaseElementWrappingImplementation._wrap$ctor.prototype = BaseElementWrappingImplementation.prototype;
function BaseElementWrappingImplementation() {}
// ********** Code for ButtonElementWrappingImplementation **************
$inherits(ButtonElementWrappingImplementation, ElementWrappingImplementation);
ButtonElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ButtonElementWrappingImplementation._wrap$ctor.prototype = ButtonElementWrappingImplementation.prototype;
function ButtonElementWrappingImplementation() {}
ButtonElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for CharacterDataWrappingImplementation **************
$inherits(CharacterDataWrappingImplementation, NodeWrappingImplementation);
CharacterDataWrappingImplementation._wrap$ctor = function(ptr) {
  NodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
CharacterDataWrappingImplementation._wrap$ctor.prototype = CharacterDataWrappingImplementation.prototype;
function CharacterDataWrappingImplementation() {}
CharacterDataWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
// ********** Code for TextWrappingImplementation **************
$inherits(TextWrappingImplementation, CharacterDataWrappingImplementation);
TextWrappingImplementation._wrap$ctor = function(ptr) {
  CharacterDataWrappingImplementation._wrap$ctor.call(this, ptr);
}
TextWrappingImplementation._wrap$ctor.prototype = TextWrappingImplementation.prototype;
function TextWrappingImplementation() {}
// ********** Code for CDATASectionWrappingImplementation **************
$inherits(CDATASectionWrappingImplementation, TextWrappingImplementation);
CDATASectionWrappingImplementation._wrap$ctor = function(ptr) {
  TextWrappingImplementation._wrap$ctor.call(this, ptr);
}
CDATASectionWrappingImplementation._wrap$ctor.prototype = CDATASectionWrappingImplementation.prototype;
function CDATASectionWrappingImplementation() {}
// ********** Code for CanvasElementWrappingImplementation **************
$inherits(CanvasElementWrappingImplementation, ElementWrappingImplementation);
CanvasElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
CanvasElementWrappingImplementation._wrap$ctor.prototype = CanvasElementWrappingImplementation.prototype;
function CanvasElementWrappingImplementation() {}
CanvasElementWrappingImplementation.prototype.set$height = function(value) {
  this._ptr.set$height(value);
}
CanvasElementWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
}
CanvasElementWrappingImplementation.prototype.getContext = function(contextId) {
  if (contextId == null) {
    return LevelDom.wrapCanvasRenderingContext(this._ptr.getContext$0());
  }
  else {
    return LevelDom.wrapCanvasRenderingContext(this._ptr.getContext(contextId));
  }
}
CanvasElementWrappingImplementation.prototype.getContext$0 = CanvasElementWrappingImplementation.prototype.getContext;
// ********** Code for CanvasRenderingContextWrappingImplementation **************
$inherits(CanvasRenderingContextWrappingImplementation, DOMWrapperBase);
CanvasRenderingContextWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
CanvasRenderingContextWrappingImplementation._wrap$ctor.prototype = CanvasRenderingContextWrappingImplementation.prototype;
function CanvasRenderingContextWrappingImplementation() {}
// ********** Code for CanvasRenderingContext2DWrappingImplementation **************
$inherits(CanvasRenderingContext2DWrappingImplementation, CanvasRenderingContextWrappingImplementation);
CanvasRenderingContext2DWrappingImplementation._wrap$ctor = function(ptr) {
  CanvasRenderingContextWrappingImplementation._wrap$ctor.call(this, ptr);
}
CanvasRenderingContext2DWrappingImplementation._wrap$ctor.prototype = CanvasRenderingContext2DWrappingImplementation.prototype;
function CanvasRenderingContext2DWrappingImplementation() {}
CanvasRenderingContext2DWrappingImplementation.prototype.set$font = function(value) {
  this._ptr.set$font(value);
}
CanvasRenderingContext2DWrappingImplementation.prototype.arc = function(x, y, radius, startAngle, endAngle, anticlockwise) {
  this._ptr.arc(x, y, radius, startAngle, endAngle, anticlockwise);
  return;
}
CanvasRenderingContext2DWrappingImplementation.prototype.beginPath = function() {
  this._ptr.beginPath();
  return;
}
CanvasRenderingContext2DWrappingImplementation.prototype.clearRect = function(x, y, width, height) {
  this._ptr.clearRect(x, y, width, height);
  return;
}
CanvasRenderingContext2DWrappingImplementation.prototype.closePath = function() {
  this._ptr.closePath();
  return;
}
CanvasRenderingContext2DWrappingImplementation.prototype.fill = function() {
  this._ptr.fill();
  return;
}
CanvasRenderingContext2DWrappingImplementation.prototype.fillText = function(text, x, y, maxWidth) {
  if (maxWidth == null) {
    this._ptr.fillText$3(text, x, y);
    return;
  }
  else {
    this._ptr.fillText(text, x, y, maxWidth);
    return;
  }
}
CanvasRenderingContext2DWrappingImplementation.prototype.lineTo = function(x, y) {
  this._ptr.lineTo(x, y);
  return;
}
CanvasRenderingContext2DWrappingImplementation.prototype.moveTo = function(x, y) {
  this._ptr.moveTo$2(x, y);
  return;
}
CanvasRenderingContext2DWrappingImplementation.prototype.setFillColor = function(c_OR_color_OR_grayLevel_OR_r, alpha_OR_g_OR_m, b_OR_y, a_OR_k, a) {
  if ((typeof(c_OR_color_OR_grayLevel_OR_r) == 'string')) {
    if (alpha_OR_g_OR_m == null) {
      if (b_OR_y == null) {
        if (a_OR_k == null) {
          if (a == null) {
            this._ptr.setFillColor$1(LevelDom.unwrapMaybePrimitive(c_OR_color_OR_grayLevel_OR_r));
            return;
          }
        }
      }
    }
    else {
      if (b_OR_y == null) {
        if (a_OR_k == null) {
          if (a == null) {
            this._ptr.setFillColor$2(LevelDom.unwrapMaybePrimitive(c_OR_color_OR_grayLevel_OR_r), alpha_OR_g_OR_m);
            return;
          }
        }
      }
    }
  }
  else {
    if ((typeof(c_OR_color_OR_grayLevel_OR_r) == 'number')) {
      if (alpha_OR_g_OR_m == null) {
        if (b_OR_y == null) {
          if (a_OR_k == null) {
            if (a == null) {
              this._ptr.setFillColor$1(LevelDom.unwrapMaybePrimitive(c_OR_color_OR_grayLevel_OR_r));
              return;
            }
          }
        }
      }
      else {
        if (b_OR_y == null) {
          if (a_OR_k == null) {
            if (a == null) {
              this._ptr.setFillColor$2(LevelDom.unwrapMaybePrimitive(c_OR_color_OR_grayLevel_OR_r), alpha_OR_g_OR_m);
              return;
            }
          }
        }
        else {
          if (a == null) {
            this._ptr.setFillColor$4(LevelDom.unwrapMaybePrimitive(c_OR_color_OR_grayLevel_OR_r), alpha_OR_g_OR_m, b_OR_y, a_OR_k);
            return;
          }
          else {
            this._ptr.setFillColor(LevelDom.unwrapMaybePrimitive(c_OR_color_OR_grayLevel_OR_r), alpha_OR_g_OR_m, b_OR_y, a_OR_k, a);
            return;
          }
        }
      }
    }
  }
  $throw("Incorrect number or type of arguments");
}
CanvasRenderingContext2DWrappingImplementation.prototype.setStrokeColor = function(c_OR_color_OR_grayLevel_OR_r, alpha_OR_g_OR_m, b_OR_y, a_OR_k, a) {
  if ((typeof(c_OR_color_OR_grayLevel_OR_r) == 'string')) {
    if (alpha_OR_g_OR_m == null) {
      if (b_OR_y == null) {
        if (a_OR_k == null) {
          if (a == null) {
            this._ptr.setStrokeColor$1(LevelDom.unwrapMaybePrimitive(c_OR_color_OR_grayLevel_OR_r));
            return;
          }
        }
      }
    }
    else {
      if (b_OR_y == null) {
        if (a_OR_k == null) {
          if (a == null) {
            this._ptr.setStrokeColor$2(LevelDom.unwrapMaybePrimitive(c_OR_color_OR_grayLevel_OR_r), alpha_OR_g_OR_m);
            return;
          }
        }
      }
    }
  }
  else {
    if ((typeof(c_OR_color_OR_grayLevel_OR_r) == 'number')) {
      if (alpha_OR_g_OR_m == null) {
        if (b_OR_y == null) {
          if (a_OR_k == null) {
            if (a == null) {
              this._ptr.setStrokeColor$1(LevelDom.unwrapMaybePrimitive(c_OR_color_OR_grayLevel_OR_r));
              return;
            }
          }
        }
      }
      else {
        if (b_OR_y == null) {
          if (a_OR_k == null) {
            if (a == null) {
              this._ptr.setStrokeColor$2(LevelDom.unwrapMaybePrimitive(c_OR_color_OR_grayLevel_OR_r), alpha_OR_g_OR_m);
              return;
            }
          }
        }
        else {
          if (a == null) {
            this._ptr.setStrokeColor$4(LevelDom.unwrapMaybePrimitive(c_OR_color_OR_grayLevel_OR_r), alpha_OR_g_OR_m, b_OR_y, a_OR_k);
            return;
          }
          else {
            this._ptr.setStrokeColor(LevelDom.unwrapMaybePrimitive(c_OR_color_OR_grayLevel_OR_r), alpha_OR_g_OR_m, b_OR_y, a_OR_k, a);
            return;
          }
        }
      }
    }
  }
  $throw("Incorrect number or type of arguments");
}
CanvasRenderingContext2DWrappingImplementation.prototype.stroke = function() {
  this._ptr.stroke();
  return;
}
CanvasRenderingContext2DWrappingImplementation.prototype.fillText$3 = CanvasRenderingContext2DWrappingImplementation.prototype.fillText;
CanvasRenderingContext2DWrappingImplementation.prototype.moveTo$2 = CanvasRenderingContext2DWrappingImplementation.prototype.moveTo;
CanvasRenderingContext2DWrappingImplementation.prototype.setFillColor$1 = CanvasRenderingContext2DWrappingImplementation.prototype.setFillColor;
CanvasRenderingContext2DWrappingImplementation.prototype.setFillColor$2 = CanvasRenderingContext2DWrappingImplementation.prototype.setFillColor;
CanvasRenderingContext2DWrappingImplementation.prototype.setFillColor$4 = CanvasRenderingContext2DWrappingImplementation.prototype.setFillColor;
CanvasRenderingContext2DWrappingImplementation.prototype.setStrokeColor$1 = CanvasRenderingContext2DWrappingImplementation.prototype.setStrokeColor;
CanvasRenderingContext2DWrappingImplementation.prototype.setStrokeColor$2 = CanvasRenderingContext2DWrappingImplementation.prototype.setStrokeColor;
CanvasRenderingContext2DWrappingImplementation.prototype.setStrokeColor$4 = CanvasRenderingContext2DWrappingImplementation.prototype.setStrokeColor;
// ********** Code for CommentWrappingImplementation **************
$inherits(CommentWrappingImplementation, CharacterDataWrappingImplementation);
CommentWrappingImplementation._wrap$ctor = function(ptr) {
  CharacterDataWrappingImplementation._wrap$ctor.call(this, ptr);
}
CommentWrappingImplementation._wrap$ctor.prototype = CommentWrappingImplementation.prototype;
function CommentWrappingImplementation() {}
// ********** Code for DListElementWrappingImplementation **************
$inherits(DListElementWrappingImplementation, ElementWrappingImplementation);
DListElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
DListElementWrappingImplementation._wrap$ctor.prototype = DListElementWrappingImplementation.prototype;
function DListElementWrappingImplementation() {}
// ********** Code for DataListElementWrappingImplementation **************
$inherits(DataListElementWrappingImplementation, ElementWrappingImplementation);
DataListElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
DataListElementWrappingImplementation._wrap$ctor.prototype = DataListElementWrappingImplementation.prototype;
function DataListElementWrappingImplementation() {}
// ********** Code for DetailsElementWrappingImplementation **************
$inherits(DetailsElementWrappingImplementation, ElementWrappingImplementation);
DetailsElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
DetailsElementWrappingImplementation._wrap$ctor.prototype = DetailsElementWrappingImplementation.prototype;
function DetailsElementWrappingImplementation() {}
// ********** Code for DivElementWrappingImplementation **************
$inherits(DivElementWrappingImplementation, ElementWrappingImplementation);
DivElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
DivElementWrappingImplementation._wrap$ctor.prototype = DivElementWrappingImplementation.prototype;
function DivElementWrappingImplementation() {}
// ********** Code for EmbedElementWrappingImplementation **************
$inherits(EmbedElementWrappingImplementation, ElementWrappingImplementation);
EmbedElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
EmbedElementWrappingImplementation._wrap$ctor.prototype = EmbedElementWrappingImplementation.prototype;
function EmbedElementWrappingImplementation() {}
EmbedElementWrappingImplementation.prototype.set$height = function(value) {
  this._ptr.set$height(value);
}
EmbedElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
EmbedElementWrappingImplementation.prototype.set$type = function(value) {
  this._ptr.set$type(value);
}
EmbedElementWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
}
// ********** Code for EntityReferenceWrappingImplementation **************
$inherits(EntityReferenceWrappingImplementation, NodeWrappingImplementation);
EntityReferenceWrappingImplementation._wrap$ctor = function(ptr) {
  NodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
EntityReferenceWrappingImplementation._wrap$ctor.prototype = EntityReferenceWrappingImplementation.prototype;
function EntityReferenceWrappingImplementation() {}
// ********** Code for EntityWrappingImplementation **************
$inherits(EntityWrappingImplementation, NodeWrappingImplementation);
EntityWrappingImplementation._wrap$ctor = function(ptr) {
  NodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
EntityWrappingImplementation._wrap$ctor.prototype = EntityWrappingImplementation.prototype;
function EntityWrappingImplementation() {}
// ********** Code for FieldSetElementWrappingImplementation **************
$inherits(FieldSetElementWrappingImplementation, ElementWrappingImplementation);
FieldSetElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
FieldSetElementWrappingImplementation._wrap$ctor.prototype = FieldSetElementWrappingImplementation.prototype;
function FieldSetElementWrappingImplementation() {}
// ********** Code for FontElementWrappingImplementation **************
$inherits(FontElementWrappingImplementation, ElementWrappingImplementation);
FontElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
FontElementWrappingImplementation._wrap$ctor.prototype = FontElementWrappingImplementation.prototype;
function FontElementWrappingImplementation() {}
// ********** Code for FormElementWrappingImplementation **************
$inherits(FormElementWrappingImplementation, ElementWrappingImplementation);
FormElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
FormElementWrappingImplementation._wrap$ctor.prototype = FormElementWrappingImplementation.prototype;
function FormElementWrappingImplementation() {}
FormElementWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
// ********** Code for HRElementWrappingImplementation **************
$inherits(HRElementWrappingImplementation, ElementWrappingImplementation);
HRElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
HRElementWrappingImplementation._wrap$ctor.prototype = HRElementWrappingImplementation.prototype;
function HRElementWrappingImplementation() {}
HRElementWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
}
// ********** Code for HeadElementWrappingImplementation **************
$inherits(HeadElementWrappingImplementation, ElementWrappingImplementation);
HeadElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
HeadElementWrappingImplementation._wrap$ctor.prototype = HeadElementWrappingImplementation.prototype;
function HeadElementWrappingImplementation() {}
// ********** Code for HeadingElementWrappingImplementation **************
$inherits(HeadingElementWrappingImplementation, ElementWrappingImplementation);
HeadingElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
HeadingElementWrappingImplementation._wrap$ctor.prototype = HeadingElementWrappingImplementation.prototype;
function HeadingElementWrappingImplementation() {}
// ********** Code for IFrameElementWrappingImplementation **************
$inherits(IFrameElementWrappingImplementation, ElementWrappingImplementation);
IFrameElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
IFrameElementWrappingImplementation._wrap$ctor.prototype = IFrameElementWrappingImplementation.prototype;
function IFrameElementWrappingImplementation() {}
IFrameElementWrappingImplementation.prototype.set$height = function(value) {
  this._ptr.set$height(value);
}
IFrameElementWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
}
// ********** Code for ImageElementWrappingImplementation **************
$inherits(ImageElementWrappingImplementation, ElementWrappingImplementation);
ImageElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ImageElementWrappingImplementation._wrap$ctor.prototype = ImageElementWrappingImplementation.prototype;
function ImageElementWrappingImplementation() {}
ImageElementWrappingImplementation.prototype.set$height = function(value) {
  this._ptr.set$height(value);
}
ImageElementWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
}
ImageElementWrappingImplementation.prototype.get$x = function() {
  return this._ptr.get$x();
}
ImageElementWrappingImplementation.prototype.get$y = function() {
  return this._ptr.get$y();
}
// ********** Code for InputElementWrappingImplementation **************
$inherits(InputElementWrappingImplementation, ElementWrappingImplementation);
InputElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
InputElementWrappingImplementation._wrap$ctor.prototype = InputElementWrappingImplementation.prototype;
function InputElementWrappingImplementation() {}
InputElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
InputElementWrappingImplementation.prototype.set$type = function(value) {
  this._ptr.set$type(value);
}
// ********** Code for KeygenElementWrappingImplementation **************
$inherits(KeygenElementWrappingImplementation, ElementWrappingImplementation);
KeygenElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
KeygenElementWrappingImplementation._wrap$ctor.prototype = KeygenElementWrappingImplementation.prototype;
function KeygenElementWrappingImplementation() {}
KeygenElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for LIElementWrappingImplementation **************
$inherits(LIElementWrappingImplementation, ElementWrappingImplementation);
LIElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
LIElementWrappingImplementation._wrap$ctor.prototype = LIElementWrappingImplementation.prototype;
function LIElementWrappingImplementation() {}
LIElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
LIElementWrappingImplementation.prototype.set$type = function(value) {
  this._ptr.set$type(value);
}
// ********** Code for LabelElementWrappingImplementation **************
$inherits(LabelElementWrappingImplementation, ElementWrappingImplementation);
LabelElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
LabelElementWrappingImplementation._wrap$ctor.prototype = LabelElementWrappingImplementation.prototype;
function LabelElementWrappingImplementation() {}
// ********** Code for LegendElementWrappingImplementation **************
$inherits(LegendElementWrappingImplementation, ElementWrappingImplementation);
LegendElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
LegendElementWrappingImplementation._wrap$ctor.prototype = LegendElementWrappingImplementation.prototype;
function LegendElementWrappingImplementation() {}
// ********** Code for LinkElementWrappingImplementation **************
$inherits(LinkElementWrappingImplementation, ElementWrappingImplementation);
LinkElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
LinkElementWrappingImplementation._wrap$ctor.prototype = LinkElementWrappingImplementation.prototype;
function LinkElementWrappingImplementation() {}
LinkElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
LinkElementWrappingImplementation.prototype.set$type = function(value) {
  this._ptr.set$type(value);
}
// ********** Code for MapElementWrappingImplementation **************
$inherits(MapElementWrappingImplementation, ElementWrappingImplementation);
MapElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
MapElementWrappingImplementation._wrap$ctor.prototype = MapElementWrappingImplementation.prototype;
function MapElementWrappingImplementation() {}
// ********** Code for MarqueeElementWrappingImplementation **************
$inherits(MarqueeElementWrappingImplementation, ElementWrappingImplementation);
MarqueeElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
MarqueeElementWrappingImplementation._wrap$ctor.prototype = MarqueeElementWrappingImplementation.prototype;
function MarqueeElementWrappingImplementation() {}
MarqueeElementWrappingImplementation.prototype.set$height = function(value) {
  this._ptr.set$height(value);
}
MarqueeElementWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
}
// ********** Code for MenuElementWrappingImplementation **************
$inherits(MenuElementWrappingImplementation, ElementWrappingImplementation);
MenuElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
MenuElementWrappingImplementation._wrap$ctor.prototype = MenuElementWrappingImplementation.prototype;
function MenuElementWrappingImplementation() {}
// ********** Code for MetaElementWrappingImplementation **************
$inherits(MetaElementWrappingImplementation, ElementWrappingImplementation);
MetaElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
MetaElementWrappingImplementation._wrap$ctor.prototype = MetaElementWrappingImplementation.prototype;
function MetaElementWrappingImplementation() {}
// ********** Code for MeterElementWrappingImplementation **************
$inherits(MeterElementWrappingImplementation, ElementWrappingImplementation);
MeterElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
MeterElementWrappingImplementation._wrap$ctor.prototype = MeterElementWrappingImplementation.prototype;
function MeterElementWrappingImplementation() {}
// ********** Code for ModElementWrappingImplementation **************
$inherits(ModElementWrappingImplementation, ElementWrappingImplementation);
ModElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ModElementWrappingImplementation._wrap$ctor.prototype = ModElementWrappingImplementation.prototype;
function ModElementWrappingImplementation() {}
// ********** Code for NotationWrappingImplementation **************
$inherits(NotationWrappingImplementation, NodeWrappingImplementation);
NotationWrappingImplementation._wrap$ctor = function(ptr) {
  NodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
NotationWrappingImplementation._wrap$ctor.prototype = NotationWrappingImplementation.prototype;
function NotationWrappingImplementation() {}
// ********** Code for OListElementWrappingImplementation **************
$inherits(OListElementWrappingImplementation, ElementWrappingImplementation);
OListElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
OListElementWrappingImplementation._wrap$ctor.prototype = OListElementWrappingImplementation.prototype;
function OListElementWrappingImplementation() {}
OListElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
OListElementWrappingImplementation.prototype.set$type = function(value) {
  this._ptr.set$type(value);
}
// ********** Code for OptGroupElementWrappingImplementation **************
$inherits(OptGroupElementWrappingImplementation, ElementWrappingImplementation);
OptGroupElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
OptGroupElementWrappingImplementation._wrap$ctor.prototype = OptGroupElementWrappingImplementation.prototype;
function OptGroupElementWrappingImplementation() {}
// ********** Code for OptionElementWrappingImplementation **************
$inherits(OptionElementWrappingImplementation, ElementWrappingImplementation);
OptionElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
OptionElementWrappingImplementation._wrap$ctor.prototype = OptionElementWrappingImplementation.prototype;
function OptionElementWrappingImplementation() {}
// ********** Code for OutputElementWrappingImplementation **************
$inherits(OutputElementWrappingImplementation, ElementWrappingImplementation);
OutputElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
OutputElementWrappingImplementation._wrap$ctor.prototype = OutputElementWrappingImplementation.prototype;
function OutputElementWrappingImplementation() {}
OutputElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for ParagraphElementWrappingImplementation **************
$inherits(ParagraphElementWrappingImplementation, ElementWrappingImplementation);
ParagraphElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ParagraphElementWrappingImplementation._wrap$ctor.prototype = ParagraphElementWrappingImplementation.prototype;
function ParagraphElementWrappingImplementation() {}
// ********** Code for ParamElementWrappingImplementation **************
$inherits(ParamElementWrappingImplementation, ElementWrappingImplementation);
ParamElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ParamElementWrappingImplementation._wrap$ctor.prototype = ParamElementWrappingImplementation.prototype;
function ParamElementWrappingImplementation() {}
ParamElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
ParamElementWrappingImplementation.prototype.set$type = function(value) {
  this._ptr.set$type(value);
}
// ********** Code for PreElementWrappingImplementation **************
$inherits(PreElementWrappingImplementation, ElementWrappingImplementation);
PreElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
PreElementWrappingImplementation._wrap$ctor.prototype = PreElementWrappingImplementation.prototype;
function PreElementWrappingImplementation() {}
PreElementWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
}
// ********** Code for ProcessingInstructionWrappingImplementation **************
$inherits(ProcessingInstructionWrappingImplementation, NodeWrappingImplementation);
ProcessingInstructionWrappingImplementation._wrap$ctor = function(ptr) {
  NodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
ProcessingInstructionWrappingImplementation._wrap$ctor.prototype = ProcessingInstructionWrappingImplementation.prototype;
function ProcessingInstructionWrappingImplementation() {}
// ********** Code for ProgressElementWrappingImplementation **************
$inherits(ProgressElementWrappingImplementation, ElementWrappingImplementation);
ProgressElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ProgressElementWrappingImplementation._wrap$ctor.prototype = ProgressElementWrappingImplementation.prototype;
function ProgressElementWrappingImplementation() {}
ProgressElementWrappingImplementation.prototype.get$position = function() {
  return this._ptr.get$position();
}
// ********** Code for QuoteElementWrappingImplementation **************
$inherits(QuoteElementWrappingImplementation, ElementWrappingImplementation);
QuoteElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
QuoteElementWrappingImplementation._wrap$ctor.prototype = QuoteElementWrappingImplementation.prototype;
function QuoteElementWrappingImplementation() {}
// ********** Code for SVGElementWrappingImplementation **************
$inherits(SVGElementWrappingImplementation, ElementWrappingImplementation);
SVGElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGElementWrappingImplementation._wrap$ctor.prototype = SVGElementWrappingImplementation.prototype;
function SVGElementWrappingImplementation() {}
// ********** Code for SVGAElementWrappingImplementation **************
$inherits(SVGAElementWrappingImplementation, SVGElementWrappingImplementation);
SVGAElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAElementWrappingImplementation._wrap$ctor.prototype = SVGAElementWrappingImplementation.prototype;
function SVGAElementWrappingImplementation() {}
// ********** Code for SVGAltGlyphDefElementWrappingImplementation **************
$inherits(SVGAltGlyphDefElementWrappingImplementation, SVGElementWrappingImplementation);
SVGAltGlyphDefElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAltGlyphDefElementWrappingImplementation._wrap$ctor.prototype = SVGAltGlyphDefElementWrappingImplementation.prototype;
function SVGAltGlyphDefElementWrappingImplementation() {}
// ********** Code for SVGTextContentElementWrappingImplementation **************
$inherits(SVGTextContentElementWrappingImplementation, SVGElementWrappingImplementation);
SVGTextContentElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTextContentElementWrappingImplementation._wrap$ctor.prototype = SVGTextContentElementWrappingImplementation.prototype;
function SVGTextContentElementWrappingImplementation() {}
// ********** Code for SVGTextPositioningElementWrappingImplementation **************
$inherits(SVGTextPositioningElementWrappingImplementation, SVGTextContentElementWrappingImplementation);
SVGTextPositioningElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGTextContentElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTextPositioningElementWrappingImplementation._wrap$ctor.prototype = SVGTextPositioningElementWrappingImplementation.prototype;
function SVGTextPositioningElementWrappingImplementation() {}
SVGTextPositioningElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLengthList(this._ptr.get$x());
}
SVGTextPositioningElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLengthList(this._ptr.get$y());
}
// ********** Code for SVGAltGlyphElementWrappingImplementation **************
$inherits(SVGAltGlyphElementWrappingImplementation, SVGTextPositioningElementWrappingImplementation);
SVGAltGlyphElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGTextPositioningElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAltGlyphElementWrappingImplementation._wrap$ctor.prototype = SVGAltGlyphElementWrappingImplementation.prototype;
function SVGAltGlyphElementWrappingImplementation() {}
// ********** Code for SVGAltGlyphItemElementWrappingImplementation **************
$inherits(SVGAltGlyphItemElementWrappingImplementation, SVGElementWrappingImplementation);
SVGAltGlyphItemElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAltGlyphItemElementWrappingImplementation._wrap$ctor.prototype = SVGAltGlyphItemElementWrappingImplementation.prototype;
function SVGAltGlyphItemElementWrappingImplementation() {}
// ********** Code for SVGAnimationElementWrappingImplementation **************
$inherits(SVGAnimationElementWrappingImplementation, SVGElementWrappingImplementation);
SVGAnimationElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAnimationElementWrappingImplementation._wrap$ctor.prototype = SVGAnimationElementWrappingImplementation.prototype;
function SVGAnimationElementWrappingImplementation() {}
// ********** Code for SVGAnimateColorElementWrappingImplementation **************
$inherits(SVGAnimateColorElementWrappingImplementation, SVGAnimationElementWrappingImplementation);
SVGAnimateColorElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGAnimationElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAnimateColorElementWrappingImplementation._wrap$ctor.prototype = SVGAnimateColorElementWrappingImplementation.prototype;
function SVGAnimateColorElementWrappingImplementation() {}
// ********** Code for SVGAnimateElementWrappingImplementation **************
$inherits(SVGAnimateElementWrappingImplementation, SVGAnimationElementWrappingImplementation);
SVGAnimateElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGAnimationElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAnimateElementWrappingImplementation._wrap$ctor.prototype = SVGAnimateElementWrappingImplementation.prototype;
function SVGAnimateElementWrappingImplementation() {}
// ********** Code for SVGAnimateMotionElementWrappingImplementation **************
$inherits(SVGAnimateMotionElementWrappingImplementation, SVGAnimationElementWrappingImplementation);
SVGAnimateMotionElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGAnimationElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAnimateMotionElementWrappingImplementation._wrap$ctor.prototype = SVGAnimateMotionElementWrappingImplementation.prototype;
function SVGAnimateMotionElementWrappingImplementation() {}
// ********** Code for SVGAnimateTransformElementWrappingImplementation **************
$inherits(SVGAnimateTransformElementWrappingImplementation, SVGAnimationElementWrappingImplementation);
SVGAnimateTransformElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGAnimationElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAnimateTransformElementWrappingImplementation._wrap$ctor.prototype = SVGAnimateTransformElementWrappingImplementation.prototype;
function SVGAnimateTransformElementWrappingImplementation() {}
// ********** Code for SVGAnimatedEnumerationWrappingImplementation **************
$inherits(SVGAnimatedEnumerationWrappingImplementation, DOMWrapperBase);
SVGAnimatedEnumerationWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGAnimatedEnumerationWrappingImplementation._wrap$ctor.prototype = SVGAnimatedEnumerationWrappingImplementation.prototype;
function SVGAnimatedEnumerationWrappingImplementation() {}
// ********** Code for SVGAnimatedLengthListWrappingImplementation **************
$inherits(SVGAnimatedLengthListWrappingImplementation, DOMWrapperBase);
SVGAnimatedLengthListWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGAnimatedLengthListWrappingImplementation._wrap$ctor.prototype = SVGAnimatedLengthListWrappingImplementation.prototype;
function SVGAnimatedLengthListWrappingImplementation() {}
// ********** Code for SVGAnimatedLengthWrappingImplementation **************
$inherits(SVGAnimatedLengthWrappingImplementation, DOMWrapperBase);
SVGAnimatedLengthWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGAnimatedLengthWrappingImplementation._wrap$ctor.prototype = SVGAnimatedLengthWrappingImplementation.prototype;
function SVGAnimatedLengthWrappingImplementation() {}
// ********** Code for SVGAnimatedNumberWrappingImplementation **************
$inherits(SVGAnimatedNumberWrappingImplementation, DOMWrapperBase);
SVGAnimatedNumberWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGAnimatedNumberWrappingImplementation._wrap$ctor.prototype = SVGAnimatedNumberWrappingImplementation.prototype;
function SVGAnimatedNumberWrappingImplementation() {}
// ********** Code for SVGCircleElementWrappingImplementation **************
$inherits(SVGCircleElementWrappingImplementation, SVGElementWrappingImplementation);
SVGCircleElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGCircleElementWrappingImplementation._wrap$ctor.prototype = SVGCircleElementWrappingImplementation.prototype;
function SVGCircleElementWrappingImplementation() {}
// ********** Code for SVGClipPathElementWrappingImplementation **************
$inherits(SVGClipPathElementWrappingImplementation, SVGElementWrappingImplementation);
SVGClipPathElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGClipPathElementWrappingImplementation._wrap$ctor.prototype = SVGClipPathElementWrappingImplementation.prototype;
function SVGClipPathElementWrappingImplementation() {}
// ********** Code for SVGComponentTransferFunctionElementWrappingImplementation **************
$inherits(SVGComponentTransferFunctionElementWrappingImplementation, SVGElementWrappingImplementation);
SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor.prototype = SVGComponentTransferFunctionElementWrappingImplementation.prototype;
function SVGComponentTransferFunctionElementWrappingImplementation() {}
SVGComponentTransferFunctionElementWrappingImplementation.prototype.get$type = function() {
  return LevelDom.wrapSVGAnimatedEnumeration(this._ptr.get$type());
}
// ********** Code for SVGCursorElementWrappingImplementation **************
$inherits(SVGCursorElementWrappingImplementation, SVGElementWrappingImplementation);
SVGCursorElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGCursorElementWrappingImplementation._wrap$ctor.prototype = SVGCursorElementWrappingImplementation.prototype;
function SVGCursorElementWrappingImplementation() {}
SVGCursorElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGCursorElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
// ********** Code for SVGDefsElementWrappingImplementation **************
$inherits(SVGDefsElementWrappingImplementation, SVGElementWrappingImplementation);
SVGDefsElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGDefsElementWrappingImplementation._wrap$ctor.prototype = SVGDefsElementWrappingImplementation.prototype;
function SVGDefsElementWrappingImplementation() {}
// ********** Code for SVGDescElementWrappingImplementation **************
$inherits(SVGDescElementWrappingImplementation, SVGElementWrappingImplementation);
SVGDescElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGDescElementWrappingImplementation._wrap$ctor.prototype = SVGDescElementWrappingImplementation.prototype;
function SVGDescElementWrappingImplementation() {}
// ********** Code for SVGEllipseElementWrappingImplementation **************
$inherits(SVGEllipseElementWrappingImplementation, SVGElementWrappingImplementation);
SVGEllipseElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGEllipseElementWrappingImplementation._wrap$ctor.prototype = SVGEllipseElementWrappingImplementation.prototype;
function SVGEllipseElementWrappingImplementation() {}
// ********** Code for SVGFEBlendElementWrappingImplementation **************
$inherits(SVGFEBlendElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEBlendElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEBlendElementWrappingImplementation._wrap$ctor.prototype = SVGFEBlendElementWrappingImplementation.prototype;
function SVGFEBlendElementWrappingImplementation() {}
SVGFEBlendElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGFEBlendElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
// ********** Code for SVGFEColorMatrixElementWrappingImplementation **************
$inherits(SVGFEColorMatrixElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEColorMatrixElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEColorMatrixElementWrappingImplementation._wrap$ctor.prototype = SVGFEColorMatrixElementWrappingImplementation.prototype;
function SVGFEColorMatrixElementWrappingImplementation() {}
SVGFEColorMatrixElementWrappingImplementation.prototype.get$type = function() {
  return LevelDom.wrapSVGAnimatedEnumeration(this._ptr.get$type());
}
SVGFEColorMatrixElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGFEColorMatrixElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
// ********** Code for SVGFEComponentTransferElementWrappingImplementation **************
$inherits(SVGFEComponentTransferElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEComponentTransferElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEComponentTransferElementWrappingImplementation._wrap$ctor.prototype = SVGFEComponentTransferElementWrappingImplementation.prototype;
function SVGFEComponentTransferElementWrappingImplementation() {}
SVGFEComponentTransferElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGFEComponentTransferElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
// ********** Code for SVGFEConvolveMatrixElementWrappingImplementation **************
$inherits(SVGFEConvolveMatrixElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEConvolveMatrixElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEConvolveMatrixElementWrappingImplementation._wrap$ctor.prototype = SVGFEConvolveMatrixElementWrappingImplementation.prototype;
function SVGFEConvolveMatrixElementWrappingImplementation() {}
SVGFEConvolveMatrixElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGFEConvolveMatrixElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
// ********** Code for SVGFEDiffuseLightingElementWrappingImplementation **************
$inherits(SVGFEDiffuseLightingElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEDiffuseLightingElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEDiffuseLightingElementWrappingImplementation._wrap$ctor.prototype = SVGFEDiffuseLightingElementWrappingImplementation.prototype;
function SVGFEDiffuseLightingElementWrappingImplementation() {}
SVGFEDiffuseLightingElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGFEDiffuseLightingElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
// ********** Code for SVGFEDisplacementMapElementWrappingImplementation **************
$inherits(SVGFEDisplacementMapElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEDisplacementMapElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEDisplacementMapElementWrappingImplementation._wrap$ctor.prototype = SVGFEDisplacementMapElementWrappingImplementation.prototype;
function SVGFEDisplacementMapElementWrappingImplementation() {}
SVGFEDisplacementMapElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGFEDisplacementMapElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
// ********** Code for SVGFEDistantLightElementWrappingImplementation **************
$inherits(SVGFEDistantLightElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEDistantLightElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEDistantLightElementWrappingImplementation._wrap$ctor.prototype = SVGFEDistantLightElementWrappingImplementation.prototype;
function SVGFEDistantLightElementWrappingImplementation() {}
// ********** Code for SVGFEDropShadowElementWrappingImplementation **************
$inherits(SVGFEDropShadowElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEDropShadowElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEDropShadowElementWrappingImplementation._wrap$ctor.prototype = SVGFEDropShadowElementWrappingImplementation.prototype;
function SVGFEDropShadowElementWrappingImplementation() {}
SVGFEDropShadowElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGFEDropShadowElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
// ********** Code for SVGFEFloodElementWrappingImplementation **************
$inherits(SVGFEFloodElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEFloodElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEFloodElementWrappingImplementation._wrap$ctor.prototype = SVGFEFloodElementWrappingImplementation.prototype;
function SVGFEFloodElementWrappingImplementation() {}
SVGFEFloodElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGFEFloodElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
// ********** Code for SVGFEFuncAElementWrappingImplementation **************
$inherits(SVGFEFuncAElementWrappingImplementation, SVGComponentTransferFunctionElementWrappingImplementation);
SVGFEFuncAElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEFuncAElementWrappingImplementation._wrap$ctor.prototype = SVGFEFuncAElementWrappingImplementation.prototype;
function SVGFEFuncAElementWrappingImplementation() {}
// ********** Code for SVGFEFuncBElementWrappingImplementation **************
$inherits(SVGFEFuncBElementWrappingImplementation, SVGComponentTransferFunctionElementWrappingImplementation);
SVGFEFuncBElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEFuncBElementWrappingImplementation._wrap$ctor.prototype = SVGFEFuncBElementWrappingImplementation.prototype;
function SVGFEFuncBElementWrappingImplementation() {}
// ********** Code for SVGFEFuncGElementWrappingImplementation **************
$inherits(SVGFEFuncGElementWrappingImplementation, SVGComponentTransferFunctionElementWrappingImplementation);
SVGFEFuncGElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEFuncGElementWrappingImplementation._wrap$ctor.prototype = SVGFEFuncGElementWrappingImplementation.prototype;
function SVGFEFuncGElementWrappingImplementation() {}
// ********** Code for SVGFEFuncRElementWrappingImplementation **************
$inherits(SVGFEFuncRElementWrappingImplementation, SVGComponentTransferFunctionElementWrappingImplementation);
SVGFEFuncRElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEFuncRElementWrappingImplementation._wrap$ctor.prototype = SVGFEFuncRElementWrappingImplementation.prototype;
function SVGFEFuncRElementWrappingImplementation() {}
// ********** Code for SVGFEGaussianBlurElementWrappingImplementation **************
$inherits(SVGFEGaussianBlurElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEGaussianBlurElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEGaussianBlurElementWrappingImplementation._wrap$ctor.prototype = SVGFEGaussianBlurElementWrappingImplementation.prototype;
function SVGFEGaussianBlurElementWrappingImplementation() {}
SVGFEGaussianBlurElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGFEGaussianBlurElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
// ********** Code for SVGFEImageElementWrappingImplementation **************
$inherits(SVGFEImageElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEImageElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEImageElementWrappingImplementation._wrap$ctor.prototype = SVGFEImageElementWrappingImplementation.prototype;
function SVGFEImageElementWrappingImplementation() {}
SVGFEImageElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGFEImageElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
// ********** Code for SVGFEMergeElementWrappingImplementation **************
$inherits(SVGFEMergeElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEMergeElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEMergeElementWrappingImplementation._wrap$ctor.prototype = SVGFEMergeElementWrappingImplementation.prototype;
function SVGFEMergeElementWrappingImplementation() {}
SVGFEMergeElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGFEMergeElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
// ********** Code for SVGFEMergeNodeElementWrappingImplementation **************
$inherits(SVGFEMergeNodeElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEMergeNodeElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEMergeNodeElementWrappingImplementation._wrap$ctor.prototype = SVGFEMergeNodeElementWrappingImplementation.prototype;
function SVGFEMergeNodeElementWrappingImplementation() {}
// ********** Code for SVGFEOffsetElementWrappingImplementation **************
$inherits(SVGFEOffsetElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEOffsetElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEOffsetElementWrappingImplementation._wrap$ctor.prototype = SVGFEOffsetElementWrappingImplementation.prototype;
function SVGFEOffsetElementWrappingImplementation() {}
SVGFEOffsetElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGFEOffsetElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
// ********** Code for SVGFEPointLightElementWrappingImplementation **************
$inherits(SVGFEPointLightElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEPointLightElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEPointLightElementWrappingImplementation._wrap$ctor.prototype = SVGFEPointLightElementWrappingImplementation.prototype;
function SVGFEPointLightElementWrappingImplementation() {}
SVGFEPointLightElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedNumber(this._ptr.get$x());
}
SVGFEPointLightElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedNumber(this._ptr.get$y());
}
SVGFEPointLightElementWrappingImplementation.prototype.get$z = function() {
  return LevelDom.wrapSVGAnimatedNumber(this._ptr.get$z());
}
// ********** Code for SVGFESpecularLightingElementWrappingImplementation **************
$inherits(SVGFESpecularLightingElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFESpecularLightingElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFESpecularLightingElementWrappingImplementation._wrap$ctor.prototype = SVGFESpecularLightingElementWrappingImplementation.prototype;
function SVGFESpecularLightingElementWrappingImplementation() {}
SVGFESpecularLightingElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGFESpecularLightingElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
// ********** Code for SVGFESpotLightElementWrappingImplementation **************
$inherits(SVGFESpotLightElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFESpotLightElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFESpotLightElementWrappingImplementation._wrap$ctor.prototype = SVGFESpotLightElementWrappingImplementation.prototype;
function SVGFESpotLightElementWrappingImplementation() {}
SVGFESpotLightElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedNumber(this._ptr.get$x());
}
SVGFESpotLightElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedNumber(this._ptr.get$y());
}
SVGFESpotLightElementWrappingImplementation.prototype.get$z = function() {
  return LevelDom.wrapSVGAnimatedNumber(this._ptr.get$z());
}
// ********** Code for SVGFETileElementWrappingImplementation **************
$inherits(SVGFETileElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFETileElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFETileElementWrappingImplementation._wrap$ctor.prototype = SVGFETileElementWrappingImplementation.prototype;
function SVGFETileElementWrappingImplementation() {}
SVGFETileElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGFETileElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
// ********** Code for SVGFETurbulenceElementWrappingImplementation **************
$inherits(SVGFETurbulenceElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFETurbulenceElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFETurbulenceElementWrappingImplementation._wrap$ctor.prototype = SVGFETurbulenceElementWrappingImplementation.prototype;
function SVGFETurbulenceElementWrappingImplementation() {}
SVGFETurbulenceElementWrappingImplementation.prototype.get$type = function() {
  return LevelDom.wrapSVGAnimatedEnumeration(this._ptr.get$type());
}
SVGFETurbulenceElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGFETurbulenceElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
// ********** Code for SVGFilterElementWrappingImplementation **************
$inherits(SVGFilterElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFilterElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFilterElementWrappingImplementation._wrap$ctor.prototype = SVGFilterElementWrappingImplementation.prototype;
function SVGFilterElementWrappingImplementation() {}
SVGFilterElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGFilterElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
// ********** Code for SVGFontElementWrappingImplementation **************
$inherits(SVGFontElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFontElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFontElementWrappingImplementation._wrap$ctor.prototype = SVGFontElementWrappingImplementation.prototype;
function SVGFontElementWrappingImplementation() {}
// ********** Code for SVGFontFaceElementWrappingImplementation **************
$inherits(SVGFontFaceElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFontFaceElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFontFaceElementWrappingImplementation._wrap$ctor.prototype = SVGFontFaceElementWrappingImplementation.prototype;
function SVGFontFaceElementWrappingImplementation() {}
// ********** Code for SVGFontFaceFormatElementWrappingImplementation **************
$inherits(SVGFontFaceFormatElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFontFaceFormatElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFontFaceFormatElementWrappingImplementation._wrap$ctor.prototype = SVGFontFaceFormatElementWrappingImplementation.prototype;
function SVGFontFaceFormatElementWrappingImplementation() {}
// ********** Code for SVGFontFaceNameElementWrappingImplementation **************
$inherits(SVGFontFaceNameElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFontFaceNameElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFontFaceNameElementWrappingImplementation._wrap$ctor.prototype = SVGFontFaceNameElementWrappingImplementation.prototype;
function SVGFontFaceNameElementWrappingImplementation() {}
// ********** Code for SVGFontFaceSrcElementWrappingImplementation **************
$inherits(SVGFontFaceSrcElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFontFaceSrcElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFontFaceSrcElementWrappingImplementation._wrap$ctor.prototype = SVGFontFaceSrcElementWrappingImplementation.prototype;
function SVGFontFaceSrcElementWrappingImplementation() {}
// ********** Code for SVGFontFaceUriElementWrappingImplementation **************
$inherits(SVGFontFaceUriElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFontFaceUriElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFontFaceUriElementWrappingImplementation._wrap$ctor.prototype = SVGFontFaceUriElementWrappingImplementation.prototype;
function SVGFontFaceUriElementWrappingImplementation() {}
// ********** Code for SVGForeignObjectElementWrappingImplementation **************
$inherits(SVGForeignObjectElementWrappingImplementation, SVGElementWrappingImplementation);
SVGForeignObjectElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGForeignObjectElementWrappingImplementation._wrap$ctor.prototype = SVGForeignObjectElementWrappingImplementation.prototype;
function SVGForeignObjectElementWrappingImplementation() {}
SVGForeignObjectElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGForeignObjectElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
// ********** Code for SVGGElementWrappingImplementation **************
$inherits(SVGGElementWrappingImplementation, SVGElementWrappingImplementation);
SVGGElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGGElementWrappingImplementation._wrap$ctor.prototype = SVGGElementWrappingImplementation.prototype;
function SVGGElementWrappingImplementation() {}
// ********** Code for SVGGlyphElementWrappingImplementation **************
$inherits(SVGGlyphElementWrappingImplementation, SVGElementWrappingImplementation);
SVGGlyphElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGGlyphElementWrappingImplementation._wrap$ctor.prototype = SVGGlyphElementWrappingImplementation.prototype;
function SVGGlyphElementWrappingImplementation() {}
// ********** Code for SVGGlyphRefElementWrappingImplementation **************
$inherits(SVGGlyphRefElementWrappingImplementation, SVGElementWrappingImplementation);
SVGGlyphRefElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGGlyphRefElementWrappingImplementation._wrap$ctor.prototype = SVGGlyphRefElementWrappingImplementation.prototype;
function SVGGlyphRefElementWrappingImplementation() {}
SVGGlyphRefElementWrappingImplementation.prototype.get$x = function() {
  return this._ptr.get$x();
}
SVGGlyphRefElementWrappingImplementation.prototype.set$x = function(value) {
  this._ptr.set$x(value);
}
SVGGlyphRefElementWrappingImplementation.prototype.get$y = function() {
  return this._ptr.get$y();
}
SVGGlyphRefElementWrappingImplementation.prototype.set$y = function(value) {
  this._ptr.set$y(value);
}
// ********** Code for SVGGradientElementWrappingImplementation **************
$inherits(SVGGradientElementWrappingImplementation, SVGElementWrappingImplementation);
SVGGradientElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGGradientElementWrappingImplementation._wrap$ctor.prototype = SVGGradientElementWrappingImplementation.prototype;
function SVGGradientElementWrappingImplementation() {}
// ********** Code for SVGHKernElementWrappingImplementation **************
$inherits(SVGHKernElementWrappingImplementation, SVGElementWrappingImplementation);
SVGHKernElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGHKernElementWrappingImplementation._wrap$ctor.prototype = SVGHKernElementWrappingImplementation.prototype;
function SVGHKernElementWrappingImplementation() {}
// ********** Code for SVGImageElementWrappingImplementation **************
$inherits(SVGImageElementWrappingImplementation, SVGElementWrappingImplementation);
SVGImageElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGImageElementWrappingImplementation._wrap$ctor.prototype = SVGImageElementWrappingImplementation.prototype;
function SVGImageElementWrappingImplementation() {}
SVGImageElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGImageElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
// ********** Code for SVGLineElementWrappingImplementation **************
$inherits(SVGLineElementWrappingImplementation, SVGElementWrappingImplementation);
SVGLineElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGLineElementWrappingImplementation._wrap$ctor.prototype = SVGLineElementWrappingImplementation.prototype;
function SVGLineElementWrappingImplementation() {}
// ********** Code for SVGLinearGradientElementWrappingImplementation **************
$inherits(SVGLinearGradientElementWrappingImplementation, SVGGradientElementWrappingImplementation);
SVGLinearGradientElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGGradientElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGLinearGradientElementWrappingImplementation._wrap$ctor.prototype = SVGLinearGradientElementWrappingImplementation.prototype;
function SVGLinearGradientElementWrappingImplementation() {}
// ********** Code for SVGMPathElementWrappingImplementation **************
$inherits(SVGMPathElementWrappingImplementation, SVGElementWrappingImplementation);
SVGMPathElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGMPathElementWrappingImplementation._wrap$ctor.prototype = SVGMPathElementWrappingImplementation.prototype;
function SVGMPathElementWrappingImplementation() {}
// ********** Code for SVGMarkerElementWrappingImplementation **************
$inherits(SVGMarkerElementWrappingImplementation, SVGElementWrappingImplementation);
SVGMarkerElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGMarkerElementWrappingImplementation._wrap$ctor.prototype = SVGMarkerElementWrappingImplementation.prototype;
function SVGMarkerElementWrappingImplementation() {}
// ********** Code for SVGMaskElementWrappingImplementation **************
$inherits(SVGMaskElementWrappingImplementation, SVGElementWrappingImplementation);
SVGMaskElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGMaskElementWrappingImplementation._wrap$ctor.prototype = SVGMaskElementWrappingImplementation.prototype;
function SVGMaskElementWrappingImplementation() {}
SVGMaskElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGMaskElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
// ********** Code for SVGMetadataElementWrappingImplementation **************
$inherits(SVGMetadataElementWrappingImplementation, SVGElementWrappingImplementation);
SVGMetadataElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGMetadataElementWrappingImplementation._wrap$ctor.prototype = SVGMetadataElementWrappingImplementation.prototype;
function SVGMetadataElementWrappingImplementation() {}
// ********** Code for SVGMissingGlyphElementWrappingImplementation **************
$inherits(SVGMissingGlyphElementWrappingImplementation, SVGElementWrappingImplementation);
SVGMissingGlyphElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGMissingGlyphElementWrappingImplementation._wrap$ctor.prototype = SVGMissingGlyphElementWrappingImplementation.prototype;
function SVGMissingGlyphElementWrappingImplementation() {}
// ********** Code for SVGPathElementWrappingImplementation **************
$inherits(SVGPathElementWrappingImplementation, SVGElementWrappingImplementation);
SVGPathElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPathElementWrappingImplementation._wrap$ctor.prototype = SVGPathElementWrappingImplementation.prototype;
function SVGPathElementWrappingImplementation() {}
// ********** Code for SVGPatternElementWrappingImplementation **************
$inherits(SVGPatternElementWrappingImplementation, SVGElementWrappingImplementation);
SVGPatternElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPatternElementWrappingImplementation._wrap$ctor.prototype = SVGPatternElementWrappingImplementation.prototype;
function SVGPatternElementWrappingImplementation() {}
SVGPatternElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGPatternElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
// ********** Code for SVGPolygonElementWrappingImplementation **************
$inherits(SVGPolygonElementWrappingImplementation, SVGElementWrappingImplementation);
SVGPolygonElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPolygonElementWrappingImplementation._wrap$ctor.prototype = SVGPolygonElementWrappingImplementation.prototype;
function SVGPolygonElementWrappingImplementation() {}
// ********** Code for SVGPolylineElementWrappingImplementation **************
$inherits(SVGPolylineElementWrappingImplementation, SVGElementWrappingImplementation);
SVGPolylineElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPolylineElementWrappingImplementation._wrap$ctor.prototype = SVGPolylineElementWrappingImplementation.prototype;
function SVGPolylineElementWrappingImplementation() {}
// ********** Code for SVGRadialGradientElementWrappingImplementation **************
$inherits(SVGRadialGradientElementWrappingImplementation, SVGGradientElementWrappingImplementation);
SVGRadialGradientElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGGradientElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGRadialGradientElementWrappingImplementation._wrap$ctor.prototype = SVGRadialGradientElementWrappingImplementation.prototype;
function SVGRadialGradientElementWrappingImplementation() {}
// ********** Code for SVGRectElementWrappingImplementation **************
$inherits(SVGRectElementWrappingImplementation, SVGElementWrappingImplementation);
SVGRectElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGRectElementWrappingImplementation._wrap$ctor.prototype = SVGRectElementWrappingImplementation.prototype;
function SVGRectElementWrappingImplementation() {}
SVGRectElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGRectElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
// ********** Code for SVGRectWrappingImplementation **************
$inherits(SVGRectWrappingImplementation, DOMWrapperBase);
SVGRectWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGRectWrappingImplementation._wrap$ctor.prototype = SVGRectWrappingImplementation.prototype;
function SVGRectWrappingImplementation() {}
SVGRectWrappingImplementation.prototype.set$height = function(value) {
  this._ptr.set$height(value);
}
SVGRectWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
}
SVGRectWrappingImplementation.prototype.get$x = function() {
  return this._ptr.get$x();
}
SVGRectWrappingImplementation.prototype.set$x = function(value) {
  this._ptr.set$x(value);
}
SVGRectWrappingImplementation.prototype.get$y = function() {
  return this._ptr.get$y();
}
SVGRectWrappingImplementation.prototype.set$y = function(value) {
  this._ptr.set$y(value);
}
// ********** Code for SVGScriptElementWrappingImplementation **************
$inherits(SVGScriptElementWrappingImplementation, SVGElementWrappingImplementation);
SVGScriptElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGScriptElementWrappingImplementation._wrap$ctor.prototype = SVGScriptElementWrappingImplementation.prototype;
function SVGScriptElementWrappingImplementation() {}
SVGScriptElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
SVGScriptElementWrappingImplementation.prototype.set$type = function(value) {
  this._ptr.set$type(value);
}
// ********** Code for SVGSetElementWrappingImplementation **************
$inherits(SVGSetElementWrappingImplementation, SVGAnimationElementWrappingImplementation);
SVGSetElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGAnimationElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGSetElementWrappingImplementation._wrap$ctor.prototype = SVGSetElementWrappingImplementation.prototype;
function SVGSetElementWrappingImplementation() {}
// ********** Code for SVGStopElementWrappingImplementation **************
$inherits(SVGStopElementWrappingImplementation, SVGElementWrappingImplementation);
SVGStopElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGStopElementWrappingImplementation._wrap$ctor.prototype = SVGStopElementWrappingImplementation.prototype;
function SVGStopElementWrappingImplementation() {}
// ********** Code for SVGStyleElementWrappingImplementation **************
$inherits(SVGStyleElementWrappingImplementation, SVGElementWrappingImplementation);
SVGStyleElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGStyleElementWrappingImplementation._wrap$ctor.prototype = SVGStyleElementWrappingImplementation.prototype;
function SVGStyleElementWrappingImplementation() {}
SVGStyleElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
SVGStyleElementWrappingImplementation.prototype.set$type = function(value) {
  this._ptr.set$type(value);
}
// ********** Code for SVGSwitchElementWrappingImplementation **************
$inherits(SVGSwitchElementWrappingImplementation, SVGElementWrappingImplementation);
SVGSwitchElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGSwitchElementWrappingImplementation._wrap$ctor.prototype = SVGSwitchElementWrappingImplementation.prototype;
function SVGSwitchElementWrappingImplementation() {}
// ********** Code for SVGSymbolElementWrappingImplementation **************
$inherits(SVGSymbolElementWrappingImplementation, SVGElementWrappingImplementation);
SVGSymbolElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGSymbolElementWrappingImplementation._wrap$ctor.prototype = SVGSymbolElementWrappingImplementation.prototype;
function SVGSymbolElementWrappingImplementation() {}
// ********** Code for SVGTRefElementWrappingImplementation **************
$inherits(SVGTRefElementWrappingImplementation, SVGTextPositioningElementWrappingImplementation);
SVGTRefElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGTextPositioningElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTRefElementWrappingImplementation._wrap$ctor.prototype = SVGTRefElementWrappingImplementation.prototype;
function SVGTRefElementWrappingImplementation() {}
// ********** Code for SVGTSpanElementWrappingImplementation **************
$inherits(SVGTSpanElementWrappingImplementation, SVGTextPositioningElementWrappingImplementation);
SVGTSpanElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGTextPositioningElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTSpanElementWrappingImplementation._wrap$ctor.prototype = SVGTSpanElementWrappingImplementation.prototype;
function SVGTSpanElementWrappingImplementation() {}
// ********** Code for SVGTextElementWrappingImplementation **************
$inherits(SVGTextElementWrappingImplementation, SVGTextPositioningElementWrappingImplementation);
SVGTextElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGTextPositioningElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTextElementWrappingImplementation._wrap$ctor.prototype = SVGTextElementWrappingImplementation.prototype;
function SVGTextElementWrappingImplementation() {}
// ********** Code for SVGTextPathElementWrappingImplementation **************
$inherits(SVGTextPathElementWrappingImplementation, SVGTextContentElementWrappingImplementation);
SVGTextPathElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGTextContentElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTextPathElementWrappingImplementation._wrap$ctor.prototype = SVGTextPathElementWrappingImplementation.prototype;
function SVGTextPathElementWrappingImplementation() {}
// ********** Code for SVGTitleElementWrappingImplementation **************
$inherits(SVGTitleElementWrappingImplementation, SVGElementWrappingImplementation);
SVGTitleElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTitleElementWrappingImplementation._wrap$ctor.prototype = SVGTitleElementWrappingImplementation.prototype;
function SVGTitleElementWrappingImplementation() {}
// ********** Code for SVGUseElementWrappingImplementation **************
$inherits(SVGUseElementWrappingImplementation, SVGElementWrappingImplementation);
SVGUseElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGUseElementWrappingImplementation._wrap$ctor.prototype = SVGUseElementWrappingImplementation.prototype;
function SVGUseElementWrappingImplementation() {}
SVGUseElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGUseElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
// ********** Code for SVGVKernElementWrappingImplementation **************
$inherits(SVGVKernElementWrappingImplementation, SVGElementWrappingImplementation);
SVGVKernElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGVKernElementWrappingImplementation._wrap$ctor.prototype = SVGVKernElementWrappingImplementation.prototype;
function SVGVKernElementWrappingImplementation() {}
// ********** Code for SVGViewElementWrappingImplementation **************
$inherits(SVGViewElementWrappingImplementation, SVGElementWrappingImplementation);
SVGViewElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGViewElementWrappingImplementation._wrap$ctor.prototype = SVGViewElementWrappingImplementation.prototype;
function SVGViewElementWrappingImplementation() {}
// ********** Code for ScriptElementWrappingImplementation **************
$inherits(ScriptElementWrappingImplementation, ElementWrappingImplementation);
ScriptElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ScriptElementWrappingImplementation._wrap$ctor.prototype = ScriptElementWrappingImplementation.prototype;
function ScriptElementWrappingImplementation() {}
ScriptElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
ScriptElementWrappingImplementation.prototype.set$type = function(value) {
  this._ptr.set$type(value);
}
// ********** Code for SelectElementWrappingImplementation **************
$inherits(SelectElementWrappingImplementation, ElementWrappingImplementation);
SelectElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SelectElementWrappingImplementation._wrap$ctor.prototype = SelectElementWrappingImplementation.prototype;
function SelectElementWrappingImplementation() {}
SelectElementWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
SelectElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for SourceElementWrappingImplementation **************
$inherits(SourceElementWrappingImplementation, ElementWrappingImplementation);
SourceElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SourceElementWrappingImplementation._wrap$ctor.prototype = SourceElementWrappingImplementation.prototype;
function SourceElementWrappingImplementation() {}
SourceElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
SourceElementWrappingImplementation.prototype.set$type = function(value) {
  this._ptr.set$type(value);
}
// ********** Code for SpanElementWrappingImplementation **************
$inherits(SpanElementWrappingImplementation, ElementWrappingImplementation);
SpanElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SpanElementWrappingImplementation._wrap$ctor.prototype = SpanElementWrappingImplementation.prototype;
function SpanElementWrappingImplementation() {}
// ********** Code for StyleElementWrappingImplementation **************
$inherits(StyleElementWrappingImplementation, ElementWrappingImplementation);
StyleElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
StyleElementWrappingImplementation._wrap$ctor.prototype = StyleElementWrappingImplementation.prototype;
function StyleElementWrappingImplementation() {}
StyleElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
StyleElementWrappingImplementation.prototype.set$type = function(value) {
  this._ptr.set$type(value);
}
// ********** Code for TableCaptionElementWrappingImplementation **************
$inherits(TableCaptionElementWrappingImplementation, ElementWrappingImplementation);
TableCaptionElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TableCaptionElementWrappingImplementation._wrap$ctor.prototype = TableCaptionElementWrappingImplementation.prototype;
function TableCaptionElementWrappingImplementation() {}
// ********** Code for TableCellElementWrappingImplementation **************
$inherits(TableCellElementWrappingImplementation, ElementWrappingImplementation);
TableCellElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TableCellElementWrappingImplementation._wrap$ctor.prototype = TableCellElementWrappingImplementation.prototype;
function TableCellElementWrappingImplementation() {}
TableCellElementWrappingImplementation.prototype.set$height = function(value) {
  this._ptr.set$height(value);
}
TableCellElementWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
}
// ********** Code for TableColElementWrappingImplementation **************
$inherits(TableColElementWrappingImplementation, ElementWrappingImplementation);
TableColElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TableColElementWrappingImplementation._wrap$ctor.prototype = TableColElementWrappingImplementation.prototype;
function TableColElementWrappingImplementation() {}
TableColElementWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
}
// ********** Code for TableElementWrappingImplementation **************
$inherits(TableElementWrappingImplementation, ElementWrappingImplementation);
TableElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TableElementWrappingImplementation._wrap$ctor.prototype = TableElementWrappingImplementation.prototype;
function TableElementWrappingImplementation() {}
TableElementWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
}
// ********** Code for TableRowElementWrappingImplementation **************
$inherits(TableRowElementWrappingImplementation, ElementWrappingImplementation);
TableRowElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TableRowElementWrappingImplementation._wrap$ctor.prototype = TableRowElementWrappingImplementation.prototype;
function TableRowElementWrappingImplementation() {}
// ********** Code for TableSectionElementWrappingImplementation **************
$inherits(TableSectionElementWrappingImplementation, ElementWrappingImplementation);
TableSectionElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TableSectionElementWrappingImplementation._wrap$ctor.prototype = TableSectionElementWrappingImplementation.prototype;
function TableSectionElementWrappingImplementation() {}
// ********** Code for TextAreaElementWrappingImplementation **************
$inherits(TextAreaElementWrappingImplementation, ElementWrappingImplementation);
TextAreaElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TextAreaElementWrappingImplementation._wrap$ctor.prototype = TextAreaElementWrappingImplementation.prototype;
function TextAreaElementWrappingImplementation() {}
TextAreaElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for TitleElementWrappingImplementation **************
$inherits(TitleElementWrappingImplementation, ElementWrappingImplementation);
TitleElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TitleElementWrappingImplementation._wrap$ctor.prototype = TitleElementWrappingImplementation.prototype;
function TitleElementWrappingImplementation() {}
// ********** Code for TrackElementWrappingImplementation **************
$inherits(TrackElementWrappingImplementation, ElementWrappingImplementation);
TrackElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TrackElementWrappingImplementation._wrap$ctor.prototype = TrackElementWrappingImplementation.prototype;
function TrackElementWrappingImplementation() {}
// ********** Code for UListElementWrappingImplementation **************
$inherits(UListElementWrappingImplementation, ElementWrappingImplementation);
UListElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
UListElementWrappingImplementation._wrap$ctor.prototype = UListElementWrappingImplementation.prototype;
function UListElementWrappingImplementation() {}
UListElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
UListElementWrappingImplementation.prototype.set$type = function(value) {
  this._ptr.set$type(value);
}
// ********** Code for UnknownElementWrappingImplementation **************
$inherits(UnknownElementWrappingImplementation, ElementWrappingImplementation);
UnknownElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
UnknownElementWrappingImplementation._wrap$ctor.prototype = UnknownElementWrappingImplementation.prototype;
function UnknownElementWrappingImplementation() {}
// ********** Code for VideoElementWrappingImplementation **************
$inherits(VideoElementWrappingImplementation, MediaElementWrappingImplementation);
VideoElementWrappingImplementation._wrap$ctor = function(ptr) {
  MediaElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
VideoElementWrappingImplementation._wrap$ctor.prototype = VideoElementWrappingImplementation.prototype;
function VideoElementWrappingImplementation() {}
VideoElementWrappingImplementation.prototype.set$height = function(value) {
  this._ptr.set$height(value);
}
VideoElementWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
}
// ********** Code for WebGLRenderingContextWrappingImplementation **************
$inherits(WebGLRenderingContextWrappingImplementation, CanvasRenderingContextWrappingImplementation);
WebGLRenderingContextWrappingImplementation._wrap$ctor = function(ptr) {
  CanvasRenderingContextWrappingImplementation._wrap$ctor.call(this, ptr);
}
WebGLRenderingContextWrappingImplementation._wrap$ctor.prototype = WebGLRenderingContextWrappingImplementation.prototype;
function WebGLRenderingContextWrappingImplementation() {}
WebGLRenderingContextWrappingImplementation.prototype.viewport = function(x, y, width, height) {
  this._ptr.viewport$4(x, y, width, height);
  return;
}
WebGLRenderingContextWrappingImplementation.prototype.get$viewport = function() {
  return this.viewport.bind(this);
}
WebGLRenderingContextWrappingImplementation.prototype.viewport$4 = WebGLRenderingContextWrappingImplementation.prototype.viewport;
// ********** Code for LevelDom **************
function LevelDom() {}
LevelDom.wrapCanvasRenderingContext = function(raw) {
  if (raw == null) {
    return null;
  }
  if (raw.get$dartObjectLocalStorage() != null) {
    return raw.get$dartObjectLocalStorage();
  }
  switch (raw.get$typeName()) {
    case "CanvasRenderingContext":

      return new CanvasRenderingContextWrappingImplementation._wrap$ctor(raw);

    case "CanvasRenderingContext2D":

      return new CanvasRenderingContext2DWrappingImplementation._wrap$ctor(raw);

    case "WebGLRenderingContext":

      return new WebGLRenderingContextWrappingImplementation._wrap$ctor(raw);

    default:

      $throw(new UnsupportedOperationException($add("Unknown type:", raw.toString())));

  }
}
LevelDom.wrapDocument = function(raw) {
  if (raw == null) {
    return null;
  }
  if (raw.get$dartObjectLocalStorage() != null) {
    return raw.get$dartObjectLocalStorage();
  }
  switch (raw.get$typeName()) {
    case "HTMLDocument":

      return new DocumentWrappingImplementation._wrap$ctor(raw, raw.get$documentElement());

    case "SVGDocument":

      return new SVGDocumentWrappingImplementation._wrap$ctor(raw);

    default:

      $throw(new UnsupportedOperationException($add("Unknown type:", raw.toString())));

  }
}
LevelDom.wrapElement = function(raw) {
  if (raw == null) {
    return null;
  }
  if (raw.get$dartObjectLocalStorage() != null) {
    return raw.get$dartObjectLocalStorage();
  }
  switch (raw.get$typeName()) {
    case "HTMLAnchorElement":

      return new AnchorElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLAreaElement":

      return new AreaElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLAudioElement":

      return new AudioElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLBRElement":

      return new BRElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLBaseElement":

      return new BaseElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLBodyElement":

      return new BodyElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLButtonElement":

      return new ButtonElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLCanvasElement":

      return new CanvasElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDListElement":

      return new DListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDataListElement":

      return new DataListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDetailsElement":

      return new DetailsElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDivElement":

      return new DivElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLElement":

      return new ElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLEmbedElement":

      return new EmbedElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLFieldSetElement":

      return new FieldSetElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLFontElement":

      return new FontElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLFormElement":

      return new FormElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHRElement":

      return new HRElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHeadElement":

      return new HeadElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHeadingElement":

      return new HeadingElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHtmlElement":

      return new DocumentWrappingImplementation._wrap$ctor(raw.get$parentNode(), raw);

    case "HTMLIFrameElement":

      return new IFrameElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLImageElement":

      return new ImageElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLInputElement":

      return new InputElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLKeygenElement":

      return new KeygenElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLIElement":

      return new LIElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLabelElement":

      return new LabelElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLegendElement":

      return new LegendElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLinkElement":

      return new LinkElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMapElement":

      return new MapElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMarqueeElement":

      return new MarqueeElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMediaElement":

      return new MediaElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMenuElement":

      return new MenuElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMetaElement":

      return new MetaElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMeterElement":

      return new MeterElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLModElement":

      return new ModElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLOListElement":

      return new OListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLObjectElement":

      return new ObjectElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLOptGroupElement":

      return new OptGroupElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLOptionElement":

      return new OptionElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLOutputElement":

      return new OutputElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLParagraphElement":

      return new ParagraphElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLParamElement":

      return new ParamElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLPreElement":

      return new PreElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLProgressElement":

      return new ProgressElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLQuoteElement":

      return new QuoteElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAElement":

      return new SVGAElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAltGlyphDefElement":

      return new SVGAltGlyphDefElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAltGlyphElement":

      return new SVGAltGlyphElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAltGlyphItemElement":

      return new SVGAltGlyphItemElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateColorElement":

      return new SVGAnimateColorElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateElement":

      return new SVGAnimateElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateMotionElement":

      return new SVGAnimateMotionElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateTransformElement":

      return new SVGAnimateTransformElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimationElement":

      return new SVGAnimationElementWrappingImplementation._wrap$ctor(raw);

    case "SVGCircleElement":

      return new SVGCircleElementWrappingImplementation._wrap$ctor(raw);

    case "SVGClipPathElement":

      return new SVGClipPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGComponentTransferFunctionElement":

      return new SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor(raw);

    case "SVGCursorElement":

      return new SVGCursorElementWrappingImplementation._wrap$ctor(raw);

    case "SVGDefsElement":

      return new SVGDefsElementWrappingImplementation._wrap$ctor(raw);

    case "SVGDescElement":

      return new SVGDescElementWrappingImplementation._wrap$ctor(raw);

    case "SVGElement":

      return new SVGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGEllipseElement":

      return new SVGEllipseElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEBlendElement":

      return new SVGFEBlendElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEColorMatrixElement":

      return new SVGFEColorMatrixElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEComponentTransferElement":

      return new SVGFEComponentTransferElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEConvolveMatrixElement":

      return new SVGFEConvolveMatrixElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDiffuseLightingElement":

      return new SVGFEDiffuseLightingElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDisplacementMapElement":

      return new SVGFEDisplacementMapElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDistantLightElement":

      return new SVGFEDistantLightElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDropShadowElement":

      return new SVGFEDropShadowElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFloodElement":

      return new SVGFEFloodElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncAElement":

      return new SVGFEFuncAElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncBElement":

      return new SVGFEFuncBElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncGElement":

      return new SVGFEFuncGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncRElement":

      return new SVGFEFuncRElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEGaussianBlurElement":

      return new SVGFEGaussianBlurElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEImageElement":

      return new SVGFEImageElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEMergeElement":

      return new SVGFEMergeElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEMergeNodeElement":

      return new SVGFEMergeNodeElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEOffsetElement":

      return new SVGFEOffsetElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEPointLightElement":

      return new SVGFEPointLightElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFESpecularLightingElement":

      return new SVGFESpecularLightingElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFESpotLightElement":

      return new SVGFESpotLightElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFETileElement":

      return new SVGFETileElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFETurbulenceElement":

      return new SVGFETurbulenceElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFilterElement":

      return new SVGFilterElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontElement":

      return new SVGFontElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceElement":

      return new SVGFontFaceElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceFormatElement":

      return new SVGFontFaceFormatElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceNameElement":

      return new SVGFontFaceNameElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceSrcElement":

      return new SVGFontFaceSrcElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceUriElement":

      return new SVGFontFaceUriElementWrappingImplementation._wrap$ctor(raw);

    case "SVGForeignObjectElement":

      return new SVGForeignObjectElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGElement":

      return new SVGGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGlyphElement":

      return new SVGGlyphElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGlyphRefElement":

      return new SVGGlyphRefElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGradientElement":

      return new SVGGradientElementWrappingImplementation._wrap$ctor(raw);

    case "SVGHKernElement":

      return new SVGHKernElementWrappingImplementation._wrap$ctor(raw);

    case "SVGImageElement":

      return new SVGImageElementWrappingImplementation._wrap$ctor(raw);

    case "SVGLineElement":

      return new SVGLineElementWrappingImplementation._wrap$ctor(raw);

    case "SVGLinearGradientElement":

      return new SVGLinearGradientElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMPathElement":

      return new SVGMPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMarkerElement":

      return new SVGMarkerElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMaskElement":

      return new SVGMaskElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMetadataElement":

      return new SVGMetadataElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMissingGlyphElement":

      return new SVGMissingGlyphElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPathElement":

      return new SVGPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPatternElement":

      return new SVGPatternElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPolygonElement":

      return new SVGPolygonElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPolylineElement":

      return new SVGPolylineElementWrappingImplementation._wrap$ctor(raw);

    case "SVGRadialGradientElement":

      return new SVGRadialGradientElementWrappingImplementation._wrap$ctor(raw);

    case "SVGRectElement":

      return new SVGRectElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSVGElement":

      return new SVGSVGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGScriptElement":

      return new SVGScriptElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSetElement":

      return new SVGSetElementWrappingImplementation._wrap$ctor(raw);

    case "SVGStopElement":

      return new SVGStopElementWrappingImplementation._wrap$ctor(raw);

    case "SVGStyleElement":

      return new SVGStyleElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSwitchElement":

      return new SVGSwitchElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSymbolElement":

      return new SVGSymbolElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTRefElement":

      return new SVGTRefElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTSpanElement":

      return new SVGTSpanElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextContentElement":

      return new SVGTextContentElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextElement":

      return new SVGTextElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextPathElement":

      return new SVGTextPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextPositioningElement":

      return new SVGTextPositioningElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTitleElement":

      return new SVGTitleElementWrappingImplementation._wrap$ctor(raw);

    case "SVGUseElement":

      return new SVGUseElementWrappingImplementation._wrap$ctor(raw);

    case "SVGVKernElement":

      return new SVGVKernElementWrappingImplementation._wrap$ctor(raw);

    case "SVGViewElement":

      return new SVGViewElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLScriptElement":

      return new ScriptElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLSelectElement":

      return new SelectElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLSourceElement":

      return new SourceElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLSpanElement":

      return new SpanElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLStyleElement":

      return new StyleElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableCaptionElement":

      return new TableCaptionElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableCellElement":

      return new TableCellElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableColElement":

      return new TableColElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableElement":

      return new TableElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableRowElement":

      return new TableRowElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableSectionElement":

      return new TableSectionElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTextAreaElement":

      return new TextAreaElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTitleElement":

      return new TitleElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTrackElement":

      return new TrackElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLUListElement":

      return new UListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLUnknownElement":

      return new UnknownElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLVideoElement":

      return new VideoElementWrappingImplementation._wrap$ctor(raw);

    default:

      $throw(new UnsupportedOperationException($add("Unknown type:", raw.toString())));

  }
}
LevelDom.wrapNode = function(raw) {
  if (raw == null) {
    return null;
  }
  if (raw.get$dartObjectLocalStorage() != null) {
    return raw.get$dartObjectLocalStorage();
  }
  switch (raw.get$typeName()) {
    case "HTMLAnchorElement":

      return new AnchorElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLAreaElement":

      return new AreaElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLAudioElement":

      return new AudioElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLBRElement":

      return new BRElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLBaseElement":

      return new BaseElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLBodyElement":

      return new BodyElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLButtonElement":

      return new ButtonElementWrappingImplementation._wrap$ctor(raw);

    case "CDATASection":

      return new CDATASectionWrappingImplementation._wrap$ctor(raw);

    case "HTMLCanvasElement":

      return new CanvasElementWrappingImplementation._wrap$ctor(raw);

    case "CharacterData":

      return new CharacterDataWrappingImplementation._wrap$ctor(raw);

    case "Comment":

      return new CommentWrappingImplementation._wrap$ctor(raw);

    case "HTMLDListElement":

      return new DListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDataListElement":

      return new DataListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDetailsElement":

      return new DetailsElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDivElement":

      return new DivElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDocument":

      return new DocumentWrappingImplementation._wrap$ctor(raw, raw.get$documentElement());

    case "DocumentFragment":

      return new DocumentFragmentWrappingImplementation._wrap$ctor(raw);

    case "HTMLElement":

      return new ElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLEmbedElement":

      return new EmbedElementWrappingImplementation._wrap$ctor(raw);

    case "Entity":

      return new EntityWrappingImplementation._wrap$ctor(raw);

    case "EntityReference":

      return new EntityReferenceWrappingImplementation._wrap$ctor(raw);

    case "HTMLFieldSetElement":

      return new FieldSetElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLFontElement":

      return new FontElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLFormElement":

      return new FormElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHRElement":

      return new HRElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHeadElement":

      return new HeadElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHeadingElement":

      return new HeadingElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHtmlElement":

      return new DocumentWrappingImplementation._wrap$ctor(raw.get$parentNode(), raw);

    case "HTMLIFrameElement":

      return new IFrameElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLImageElement":

      return new ImageElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLInputElement":

      return new InputElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLKeygenElement":

      return new KeygenElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLIElement":

      return new LIElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLabelElement":

      return new LabelElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLegendElement":

      return new LegendElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLinkElement":

      return new LinkElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMapElement":

      return new MapElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMarqueeElement":

      return new MarqueeElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMediaElement":

      return new MediaElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMenuElement":

      return new MenuElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMetaElement":

      return new MetaElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMeterElement":

      return new MeterElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLModElement":

      return new ModElementWrappingImplementation._wrap$ctor(raw);

    case "Node":

      return new NodeWrappingImplementation._wrap$ctor(raw);

    case "Notation":

      return new NotationWrappingImplementation._wrap$ctor(raw);

    case "HTMLOListElement":

      return new OListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLObjectElement":

      return new ObjectElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLOptGroupElement":

      return new OptGroupElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLOptionElement":

      return new OptionElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLOutputElement":

      return new OutputElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLParagraphElement":

      return new ParagraphElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLParamElement":

      return new ParamElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLPreElement":

      return new PreElementWrappingImplementation._wrap$ctor(raw);

    case "ProcessingInstruction":

      return new ProcessingInstructionWrappingImplementation._wrap$ctor(raw);

    case "HTMLProgressElement":

      return new ProgressElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLQuoteElement":

      return new QuoteElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAElement":

      return new SVGAElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAltGlyphDefElement":

      return new SVGAltGlyphDefElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAltGlyphElement":

      return new SVGAltGlyphElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAltGlyphItemElement":

      return new SVGAltGlyphItemElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateColorElement":

      return new SVGAnimateColorElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateElement":

      return new SVGAnimateElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateMotionElement":

      return new SVGAnimateMotionElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateTransformElement":

      return new SVGAnimateTransformElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimationElement":

      return new SVGAnimationElementWrappingImplementation._wrap$ctor(raw);

    case "SVGCircleElement":

      return new SVGCircleElementWrappingImplementation._wrap$ctor(raw);

    case "SVGClipPathElement":

      return new SVGClipPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGComponentTransferFunctionElement":

      return new SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor(raw);

    case "SVGCursorElement":

      return new SVGCursorElementWrappingImplementation._wrap$ctor(raw);

    case "SVGDefsElement":

      return new SVGDefsElementWrappingImplementation._wrap$ctor(raw);

    case "SVGDescElement":

      return new SVGDescElementWrappingImplementation._wrap$ctor(raw);

    case "SVGDocument":

      return new SVGDocumentWrappingImplementation._wrap$ctor(raw);

    case "SVGElement":

      return new SVGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGEllipseElement":

      return new SVGEllipseElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEBlendElement":

      return new SVGFEBlendElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEColorMatrixElement":

      return new SVGFEColorMatrixElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEComponentTransferElement":

      return new SVGFEComponentTransferElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEConvolveMatrixElement":

      return new SVGFEConvolveMatrixElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDiffuseLightingElement":

      return new SVGFEDiffuseLightingElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDisplacementMapElement":

      return new SVGFEDisplacementMapElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDistantLightElement":

      return new SVGFEDistantLightElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDropShadowElement":

      return new SVGFEDropShadowElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFloodElement":

      return new SVGFEFloodElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncAElement":

      return new SVGFEFuncAElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncBElement":

      return new SVGFEFuncBElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncGElement":

      return new SVGFEFuncGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncRElement":

      return new SVGFEFuncRElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEGaussianBlurElement":

      return new SVGFEGaussianBlurElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEImageElement":

      return new SVGFEImageElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEMergeElement":

      return new SVGFEMergeElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEMergeNodeElement":

      return new SVGFEMergeNodeElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEOffsetElement":

      return new SVGFEOffsetElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEPointLightElement":

      return new SVGFEPointLightElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFESpecularLightingElement":

      return new SVGFESpecularLightingElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFESpotLightElement":

      return new SVGFESpotLightElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFETileElement":

      return new SVGFETileElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFETurbulenceElement":

      return new SVGFETurbulenceElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFilterElement":

      return new SVGFilterElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontElement":

      return new SVGFontElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceElement":

      return new SVGFontFaceElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceFormatElement":

      return new SVGFontFaceFormatElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceNameElement":

      return new SVGFontFaceNameElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceSrcElement":

      return new SVGFontFaceSrcElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceUriElement":

      return new SVGFontFaceUriElementWrappingImplementation._wrap$ctor(raw);

    case "SVGForeignObjectElement":

      return new SVGForeignObjectElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGElement":

      return new SVGGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGlyphElement":

      return new SVGGlyphElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGlyphRefElement":

      return new SVGGlyphRefElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGradientElement":

      return new SVGGradientElementWrappingImplementation._wrap$ctor(raw);

    case "SVGHKernElement":

      return new SVGHKernElementWrappingImplementation._wrap$ctor(raw);

    case "SVGImageElement":

      return new SVGImageElementWrappingImplementation._wrap$ctor(raw);

    case "SVGLineElement":

      return new SVGLineElementWrappingImplementation._wrap$ctor(raw);

    case "SVGLinearGradientElement":

      return new SVGLinearGradientElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMPathElement":

      return new SVGMPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMarkerElement":

      return new SVGMarkerElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMaskElement":

      return new SVGMaskElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMetadataElement":

      return new SVGMetadataElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMissingGlyphElement":

      return new SVGMissingGlyphElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPathElement":

      return new SVGPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPatternElement":

      return new SVGPatternElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPolygonElement":

      return new SVGPolygonElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPolylineElement":

      return new SVGPolylineElementWrappingImplementation._wrap$ctor(raw);

    case "SVGRadialGradientElement":

      return new SVGRadialGradientElementWrappingImplementation._wrap$ctor(raw);

    case "SVGRectElement":

      return new SVGRectElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSVGElement":

      return new SVGSVGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGScriptElement":

      return new SVGScriptElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSetElement":

      return new SVGSetElementWrappingImplementation._wrap$ctor(raw);

    case "SVGStopElement":

      return new SVGStopElementWrappingImplementation._wrap$ctor(raw);

    case "SVGStyleElement":

      return new SVGStyleElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSwitchElement":

      return new SVGSwitchElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSymbolElement":

      return new SVGSymbolElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTRefElement":

      return new SVGTRefElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTSpanElement":

      return new SVGTSpanElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextContentElement":

      return new SVGTextContentElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextElement":

      return new SVGTextElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextPathElement":

      return new SVGTextPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextPositioningElement":

      return new SVGTextPositioningElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTitleElement":

      return new SVGTitleElementWrappingImplementation._wrap$ctor(raw);

    case "SVGUseElement":

      return new SVGUseElementWrappingImplementation._wrap$ctor(raw);

    case "SVGVKernElement":

      return new SVGVKernElementWrappingImplementation._wrap$ctor(raw);

    case "SVGViewElement":

      return new SVGViewElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLScriptElement":

      return new ScriptElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLSelectElement":

      return new SelectElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLSourceElement":

      return new SourceElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLSpanElement":

      return new SpanElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLStyleElement":

      return new StyleElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableCaptionElement":

      return new TableCaptionElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableCellElement":

      return new TableCellElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableColElement":

      return new TableColElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableElement":

      return new TableElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableRowElement":

      return new TableRowElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableSectionElement":

      return new TableSectionElementWrappingImplementation._wrap$ctor(raw);

    case "Text":

      return new TextWrappingImplementation._wrap$ctor(raw);

    case "HTMLTextAreaElement":

      return new TextAreaElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTitleElement":

      return new TitleElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTrackElement":

      return new TrackElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLUListElement":

      return new UListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLUnknownElement":

      return new UnknownElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLVideoElement":

      return new VideoElementWrappingImplementation._wrap$ctor(raw);

    default:

      $throw(new UnsupportedOperationException($add("Unknown type:", raw.toString())));

  }
}
LevelDom.wrapSVGAnimatedEnumeration = function(raw) {
  return raw == null ? null : raw.get$dartObjectLocalStorage() != null ? raw.get$dartObjectLocalStorage() : new SVGAnimatedEnumerationWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapSVGAnimatedLength = function(raw) {
  return raw == null ? null : raw.get$dartObjectLocalStorage() != null ? raw.get$dartObjectLocalStorage() : new SVGAnimatedLengthWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapSVGAnimatedLengthList = function(raw) {
  return raw == null ? null : raw.get$dartObjectLocalStorage() != null ? raw.get$dartObjectLocalStorage() : new SVGAnimatedLengthListWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapSVGAnimatedNumber = function(raw) {
  return raw == null ? null : raw.get$dartObjectLocalStorage() != null ? raw.get$dartObjectLocalStorage() : new SVGAnimatedNumberWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapSVGRect = function(raw) {
  return raw == null ? null : raw.get$dartObjectLocalStorage() != null ? raw.get$dartObjectLocalStorage() : new SVGRectWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapWindow = function(raw) {
  return raw == null ? null : raw.get$dartObjectLocalStorage() != null ? raw.get$dartObjectLocalStorage() : new WindowWrappingImplementation._wrap$ctor(raw);
}
LevelDom.unwrapMaybePrimitive = function(raw) {
  return (raw == null || (typeof(raw) == 'string') || (typeof(raw) == 'number') || (typeof(raw) == 'boolean')) ? raw : raw.get$_ptr();
}
LevelDom.unwrap = function(raw) {
  return raw == null ? null : raw.get$_ptr();
}
LevelDom.initialize = function() {
  $globals.secretWindow = LevelDom.wrapWindow(get$window());
  $globals.secretDocument = LevelDom.wrapDocument(get$document());
}
// ********** Code for Lists **************
function Lists() {}
Lists.setRange = function(to, start, length, from, startFrom) {
  if (start < (0)) {
    $throw(new IndexOutOfRangeException(start));
  }
  else if (startFrom < (0)) {
    $throw(new IndexOutOfRangeException(startFrom));
  }
  else if (length < (0)) {
    $throw(new IllegalArgumentException(("negative length " + length)));
  }
  else if (start + length > to.get$length()) {
    $throw(new IndexOutOfRangeException(Math.min(to.get$length(), start)));
  }
  else if (startFrom + length > from.get$length()) {
    $throw(new IndexOutOfRangeException(Math.min(from.get$length(), startFrom)));
  }
  for (var i = (0);
   $lt(i, length); i = $add(i, (1))) {
    to.$setindex($add(start, i), from.$index($add(startFrom, i)));
  }
}
// ********** Code for BodyElementWrappingImplementation **************
$inherits(BodyElementWrappingImplementation, ElementWrappingImplementation);
BodyElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
BodyElementWrappingImplementation._wrap$ctor.prototype = BodyElementWrappingImplementation.prototype;
function BodyElementWrappingImplementation() {}
// ********** Code for DocumentFragmentWrappingImplementation **************
$inherits(DocumentFragmentWrappingImplementation, NodeWrappingImplementation);
DocumentFragmentWrappingImplementation._wrap$ctor = function(ptr) {
  NodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
DocumentFragmentWrappingImplementation._wrap$ctor.prototype = DocumentFragmentWrappingImplementation.prototype;
function DocumentFragmentWrappingImplementation() {}
// ********** Code for DocumentWrappingImplementation **************
$inherits(DocumentWrappingImplementation, ElementWrappingImplementation);
DocumentWrappingImplementation._wrap$ctor = function(_documentPtr, ptr) {
  this._documentPtr = _documentPtr;
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
  this._documentPtr.get$dynamic().set$dartObjectLocalStorage(this);
}
DocumentWrappingImplementation._wrap$ctor.prototype = DocumentWrappingImplementation.prototype;
function DocumentWrappingImplementation() {}
DocumentWrappingImplementation.prototype.get$body = function() {
  return LevelDom.wrapElement(this._documentPtr.get$body());
}
// ********** Code for _ChildrenNodeList **************
_ChildrenNodeList._wrap$ctor = function(node) {
  this._node = node;
  this._childNodes = node.get$childNodes();
}
_ChildrenNodeList._wrap$ctor.prototype = _ChildrenNodeList.prototype;
function _ChildrenNodeList() {}
_ChildrenNodeList.prototype._toList = function() {
  var output = new Array(this._childNodes.get$length());
  for (var i = (0), len = this._childNodes.get$length();
   i < len; i++) {
    output.$setindex(i, LevelDom.wrapNode(this._childNodes.$index(i)));
  }
  return output;
}
_ChildrenNodeList.prototype.isEmpty = function() {
  return !this._node.hasChildNodes();
}
_ChildrenNodeList.prototype.get$length = function() {
  return this._childNodes.get$length();
}
_ChildrenNodeList.prototype.$index = function(index) {
  return LevelDom.wrapNode(this._childNodes.$index(index));
}
_ChildrenNodeList.prototype.$setindex = function(index, value) {
  this._node.replaceChild(LevelDom.unwrap(value), this._childNodes.$index(index));
}
_ChildrenNodeList.prototype.add = function(value) {
  this._node.appendChild(LevelDom.unwrap(value));
  return value;
}
_ChildrenNodeList.prototype.iterator = function() {
  return this._toList().iterator();
}
_ChildrenNodeList.prototype.setRange = function(start, length, from, startFrom) {
  return Lists.setRange(this, start, length, from, startFrom);
}
_ChildrenNodeList.prototype.add$1 = _ChildrenNodeList.prototype.add;
_ChildrenNodeList.prototype.setRange$3 = function($0, $1, $2) {
  return this.setRange($0, $1, $2, (0));
};
// ********** Code for ObjectElementWrappingImplementation **************
$inherits(ObjectElementWrappingImplementation, ElementWrappingImplementation);
ObjectElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ObjectElementWrappingImplementation._wrap$ctor.prototype = ObjectElementWrappingImplementation.prototype;
function ObjectElementWrappingImplementation() {}
ObjectElementWrappingImplementation.prototype.set$height = function(value) {
  this._ptr.set$height(value);
}
ObjectElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
ObjectElementWrappingImplementation.prototype.set$type = function(value) {
  this._ptr.set$type(value);
}
ObjectElementWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
}
// ********** Code for SVGDocumentWrappingImplementation **************
$inherits(SVGDocumentWrappingImplementation, DocumentWrappingImplementation);
SVGDocumentWrappingImplementation._wrap$ctor = function(ptr) {
  DocumentWrappingImplementation._wrap$ctor.call(this, ptr, ptr.get$rootElement());
}
SVGDocumentWrappingImplementation._wrap$ctor.prototype = SVGDocumentWrappingImplementation.prototype;
function SVGDocumentWrappingImplementation() {}
// ********** Code for SVGSVGElementWrappingImplementation **************
$inherits(SVGSVGElementWrappingImplementation, SVGElementWrappingImplementation);
SVGSVGElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGSVGElementWrappingImplementation._wrap$ctor.prototype = SVGSVGElementWrappingImplementation.prototype;
function SVGSVGElementWrappingImplementation() {}
SVGSVGElementWrappingImplementation.prototype.get$viewport = function() {
  return LevelDom.wrapSVGRect(this._ptr.get$viewport());
}
SVGSVGElementWrappingImplementation.prototype.get$x = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$x());
}
SVGSVGElementWrappingImplementation.prototype.get$y = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$y());
}
// ********** Code for WindowWrappingImplementation **************
$inherits(WindowWrappingImplementation, EventTargetWrappingImplementation);
WindowWrappingImplementation._wrap$ctor = function(ptr) {
  EventTargetWrappingImplementation._wrap$ctor.call(this, ptr);
}
WindowWrappingImplementation._wrap$ctor.prototype = WindowWrappingImplementation.prototype;
function WindowWrappingImplementation() {}
WindowWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
WindowWrappingImplementation.prototype.moveTo = function(x, y) {
  this._ptr.moveTo$2(x, y);
}
WindowWrappingImplementation.prototype.setInterval = function(handler, timeout) {
  return this._ptr.setInterval(handler, timeout);
}
WindowWrappingImplementation.prototype.webkitRequestAnimationFrame = function(callback, element) {
  return this._ptr.webkitRequestAnimationFrame(callback, LevelDom.unwrap(element));
}
WindowWrappingImplementation.prototype.moveTo$2 = WindowWrappingImplementation.prototype.moveTo;
// ********** Code for top level **************
var _pendingRequests;
var _pendingMeasurementFrameCallbacks;
//  ********** Library html **************
// ********** Code for top level **************
var secretWindow;
var secretDocument;
function html_get$window() {
  if ($globals.secretWindow == null) {
    LevelDom.initialize();
  }
  return $globals.secretWindow;
}
function html_get$document() {
  if ($globals.secretWindow == null) {
    LevelDom.initialize();
  }
  return $globals.secretDocument;
}
//  ********** Library box2d **************
// ********** Code for AxisAlignedBox **************
function AxisAlignedBox(lowerBound, upperBound) {
  this.lowerBound = lowerBound;
  this.upperBound = upperBound;
  if (this.lowerBound == null) this.lowerBound = new Vector((0), (0));
  if (this.upperBound == null) this.upperBound = new Vector((0), (0));
}
AxisAlignedBox.prototype.setFromCombination = function(boxOne, boxTwo) {
  this.lowerBound.x = Math.min(boxOne.lowerBound.x, boxTwo.lowerBound.x);
  this.lowerBound.y = Math.min(boxOne.lowerBound.y, boxTwo.lowerBound.y);
  this.upperBound.x = Math.max(boxOne.upperBound.x, boxTwo.upperBound.x);
  this.upperBound.y = Math.max(boxOne.upperBound.y, boxTwo.upperBound.y);
}
AxisAlignedBox.testOverlap = function(a, b) {
  if (b.lowerBound.x > a.upperBound.x || b.lowerBound.y > a.upperBound.y) return false;
  if (a.lowerBound.x > b.upperBound.x || a.lowerBound.y > b.upperBound.y) return false;
  return true;
}
AxisAlignedBox.prototype.get$center = function() {
  var c = new Vector.copy$ctor(this.lowerBound);
  c.addLocal(this.upperBound);
  c.mulLocal((0.5));
  return c;
}
AxisAlignedBox.prototype.contains = function(aabb) {
  return this.lowerBound.x > aabb.lowerBound.x && this.lowerBound.y > aabb.lowerBound.y && this.upperBound.y < aabb.upperBound.y && this.upperBound.x < aabb.upperBound.x;
}
AxisAlignedBox.prototype.setFrom = function(other) {
  this.lowerBound.setFrom(other.lowerBound);
  this.upperBound.setFrom(other.upperBound);
}
AxisAlignedBox.prototype.toString = function() {
  return $add($add(this.lowerBound.toString(), ", "), this.upperBound.toString());
}
AxisAlignedBox.prototype.setFrom$1 = AxisAlignedBox.prototype.setFrom;
// ********** Code for Collision **************
Collision._construct$ctor = function(pool) {
  this.normal1 = new Vector((0), (0));
  this.localTangent = new Vector((0), (0));
  this.normal = new Vector((0), (0));
  this.results2 = new EdgeResults();
  this.incidentEdge = new Array((2));
  this.results1 = new EdgeResults();
  this.planePoint = new Vector((0), (0));
  this.localNormal = new Vector((0), (0));
  this._pool = pool;
  this.clipPoints1 = new Array((2));
  this.cache = new SimplexCache();
  this.v12 = new Vector((0), (0));
  this.clipPoints2 = new Array((2));
  this.v11 = new Vector((0), (0));
  this.input = new DistanceInput();
  this.tangent = new Vector((0), (0));
  this.output = new DistanceOutput();
  this.incidentEdge.$setindex((0), new ClipVertex());
  this.incidentEdge.$setindex((1), new ClipVertex());
  this.clipPoints1.$setindex((0), new ClipVertex());
  this.clipPoints1.$setindex((1), new ClipVertex());
  this.clipPoints2.$setindex((0), new ClipVertex());
  this.clipPoints2.$setindex((1), new ClipVertex());
}
Collision._construct$ctor.prototype = Collision.prototype;
function Collision() {}
Collision.prototype.get$incidentEdge = function() { return this.incidentEdge; };
Collision.prototype.testOverlap = function(shapeA, shapeB, transformA, transformB) {
  this.input.proxyA.setFromShape(shapeA);
  this.input.proxyB.setFromShape(shapeB);
  this.input.transformA.setFrom(transformA);
  this.input.transformB.setFrom(transformB);
  this.input.useRadii = true;
  this.cache.count = (0);
  this._pool.distance.distance(this.output, this.cache, this.input);
  return this.output.distance < (0.000001192);
}
Collision.clipSegmentToLine = function(vOut, vIn, norm, offset) {
  var numOut = (0);
  var distance0 = Vector.dot(norm, vIn[(0)].v) - offset;
  var distance1 = Vector.dot(norm, vIn[(1)].v) - offset;
  if (distance0 <= (0)) vOut[numOut++].setFrom(vIn[(0)]);
  if (distance1 <= (0)) vOut[numOut++].setFrom(vIn[(1)]);
  if (distance0 * distance1 < (0)) {
    var interp = distance0 / (distance0 - distance1);
    vOut[numOut].v.setFrom(vIn[(1)].v).subLocal(vIn[(0)].v).mulLocal(interp).addLocal(vIn[(0)].v);
    var vin = (distance0 > (0) ? vIn[(0)] : vIn[(1)]);
    vOut[numOut].id.setFrom(vin.id);
    ++numOut;
  }
  return numOut;
}
Collision.prototype.collideCircles = function(manifold, circle1, xfA, circle2, xfB) {
  manifold.pointCount = (0);
  var v = circle1.position;
  var pAy = xfA.position.y + xfA.rotation.col1.y * v.x + xfA.rotation.col2.y * v.y;
  var pAx = xfA.position.x + xfA.rotation.col1.x * v.x + xfA.rotation.col2.x * v.y;
  var v1 = circle2.position;
  var pBy = xfB.position.y + xfB.rotation.col1.y * v1.x + xfB.rotation.col2.y * v1.y;
  var pBx = xfB.position.x + xfB.rotation.col1.x * v1.x + xfB.rotation.col2.x * v1.y;
  var dx = pBx - pAx;
  var dy = pBy - pAy;
  var distSqr = dx * dx + dy * dy;
  var radius = circle1.radius + circle2.radius;
  if (distSqr > radius * radius) return;
  manifold.type = (0);
  manifold.localPoint.setFrom(circle1.position);
  manifold.localNormal.setZero();
  manifold.pointCount = (1);
  manifold.points[(0)].localPoint.setFrom(circle2.position);
  manifold.points[(0)].id.zero();
}
Collision.prototype.collidePolygonAndCircle = function(manifold, polygon, xfA, circle, xfB) {
  manifold.pointCount = (0);
  var v = circle.position;
  var cy = xfB.position.y + xfB.rotation.col1.y * v.x + xfB.rotation.col2.y * v.y;
  var cx = xfB.position.x + xfB.rotation.col1.x * v.x + xfB.rotation.col2.x * v.y;
  var v1x = cx - xfA.position.x;
  var v1y = cy - xfA.position.y;
  var b = xfA.rotation.col1;
  var b1 = xfA.rotation.col2;
  var cLocaly = v1x * b1.x + v1y * b1.y;
  var cLocalx = v1x * b.x + v1y * b.y;
  var normalIndex = (0);
  var separation = (1e-12);
  var radius = polygon.radius + circle.radius;
  var vertexCount = polygon.vertexCount;
  var vertices = polygon.vertices;
  var normals = polygon.normals;
  for (var i = (0);
   i < vertexCount; ++i) {
    var vertex = vertices[i];
    var tempx = cLocalx - vertex.x;
    var tempy = cLocaly - vertex.y;
    var norm = normals[i];
    var s = norm.x * tempx + norm.y * tempy;
    if (s > radius) return;
    if (s > separation) {
      separation = s;
      normalIndex = i;
    }
  }
  var vertIndex1 = normalIndex;
  var vertIndex2 = vertIndex1 + (1) < vertexCount ? vertIndex1 + (1) : (0);
  var v1 = vertices[vertIndex1];
  var v2 = vertices[vertIndex2];
  if (separation < (1.192e-7)) {
    manifold.pointCount = (1);
    manifold.type = (1);
    var norm = normals[normalIndex];
    manifold.localNormal.x = norm.x;
    manifold.localNormal.y = norm.y;
    manifold.localPoint.x = (v1.x + v2.x) * (0.5);
    manifold.localPoint.y = (v1.y + v2.y) * (0.5);
    var mpoint = manifold.points[(0)];
    mpoint.localPoint.x = circle.position.x;
    mpoint.localPoint.y = circle.position.y;
    mpoint.id.zero();
    return;
  }
  var tempX = cLocalx - v1.x;
  var tempY = cLocaly - v1.y;
  var temp2X = v2.x - v1.x;
  var temp2Y = v2.y - v1.y;
  var u1 = tempX * temp2X + tempY * temp2Y;
  var temp3X = cLocalx - v2.x;
  var temp3Y = cLocaly - v2.y;
  var temp4X = v1.x - v2.x;
  var temp4Y = v1.y - v2.y;
  var u2 = temp3X * temp4X + temp3Y * temp4Y;
  if (u1 <= (0)) {
    var dx = cLocalx - v1.x;
    var dy = cLocaly - v1.y;
    if (dx * dx + dy * dy > radius * radius) return;
    manifold.pointCount = (1);
    manifold.type = (1);
    manifold.localNormal.x = cLocalx - v1.x;
    manifold.localNormal.y = cLocaly - v1.y;
    manifold.localNormal.normalize();
    manifold.localPoint.setFrom(v1);
    manifold.points[(0)].localPoint.setFrom(circle.position);
    manifold.points[(0)].id.zero();
  }
  else if (u2 <= (0)) {
    var dx = cLocalx - v2.x;
    var dy = cLocaly - v2.y;
    if (dx * dx + dy * dy > radius * radius) return;
    manifold.pointCount = (1);
    manifold.type = (1);
    manifold.localNormal.x = cLocalx - v2.x;
    manifold.localNormal.y = cLocaly - v2.y;
    manifold.localNormal.normalize();
    manifold.localPoint.setFrom(v2);
    manifold.points[(0)].localPoint.setFrom(circle.position);
    manifold.points[(0)].id.zero();
  }
  else {
    var fcx = (v1.x + v2.x) * (0.5);
    var fcy = (v1.y + v2.y) * (0.5);
    var tx = cLocalx - fcx;
    var ty = cLocaly - fcy;
    var norm = normals[vertIndex1];
    separation = tx * norm.x + ty * norm.y;
    if (separation > radius) return;
    manifold.pointCount = (1);
    manifold.type = (1);
    manifold.localNormal.setFrom(normals[vertIndex1]);
    manifold.localPoint.x = fcx;
    manifold.localPoint.y = fcy;
    manifold.points[(0)].localPoint.setFrom(circle.position);
    manifold.points[(0)].id.zero();
  }
}
Collision.prototype.edgeSeparation = function(poly1, xf1, edge1, poly2, xf2) {
  var count1 = poly1.vertexCount;
  var vertices1 = poly1.vertices;
  var normals1 = poly1.normals;
  var count2 = poly2.vertexCount;
  var vertices2 = poly2.vertices;
  var R = xf1.rotation;
  var v = normals1[edge1];
  var normal1Worldy = R.col1.y * v.x + R.col2.y * v.y;
  var normal1Worldx = R.col1.x * v.x + R.col2.x * v.y;
  var R1 = xf2.rotation;
  var normal1x = normal1Worldx * R1.col1.x + normal1Worldy * R1.col1.y;
  var normal1y = normal1Worldx * R1.col2.x + normal1Worldy * R1.col2.y;
  var index = (0);
  var minDot = (99999999999999);
  for (var i = (0);
   i < count2; ++i) {
    var a = vertices2[i];
    var dot = a.x * normal1x + a.y * normal1y;
    if (dot < minDot) {
      minDot = dot;
      index = i;
    }
  }
  var v3 = vertices1[edge1];
  var v1y = xf1.position.y + R.col1.y * v3.x + R.col2.y * v3.y;
  var v1x = xf1.position.x + R.col1.x * v3.x + R.col2.x * v3.y;
  var v4 = vertices2[index];
  var v2y = xf2.position.y + R1.col1.y * v4.x + R1.col2.y * v4.y - v1y;
  var v2x = xf2.position.x + R1.col1.x * v4.x + R1.col2.x * v4.y - v1x;
  return v2x * normal1Worldx + v2y * normal1Worldy;
}
Collision.prototype.findMaxSeparation = function(results, poly1, xf1, poly2, xf2) {
  var count1 = poly1.vertexCount;
  var normals1 = poly1.normals;
  var v = poly2.centroid;
  var predy = xf2.position.y + xf2.rotation.col1.y * v.x + xf2.rotation.col2.y * v.y;
  var predx = xf2.position.x + xf2.rotation.col1.x * v.x + xf2.rotation.col2.x * v.y;
  var v1 = poly1.centroid;
  var tempy = xf1.position.y + xf1.rotation.col1.y * v1.x + xf1.rotation.col2.y * v1.y;
  var tempx = xf1.position.x + xf1.rotation.col1.x * v1.x + xf1.rotation.col2.x * v1.y;
  var dx = predx - tempx;
  var dy = predy - tempy;
  var R = xf1.rotation;
  var dLocal1x = dx * R.col1.x + dy * R.col1.y;
  var dLocal1y = dx * R.col2.x + dy * R.col2.y;
  var edge = (0);
  var dot;
  var maxDot = (1e-12);
  for (var i = (0);
   i < count1; i++) {
    var norm = normals1[i];
    dot = norm.x * dLocal1x + norm.y * dLocal1y;
    if (dot > maxDot) {
      maxDot = dot;
      edge = i;
    }
  }
  var s = this.edgeSeparation(poly1, xf1, edge, poly2, xf2);
  var prevEdge = edge - (1) >= (0) ? edge - (1) : count1 - (1);
  var sPrev = this.edgeSeparation(poly1, xf1, prevEdge, poly2, xf2);
  var nextEdge = edge + (1) < count1 ? edge + (1) : (0);
  var sNext = this.edgeSeparation(poly1, xf1, nextEdge, poly2, xf2);
  var bestEdge;
  var bestSeparation;
  var increment;
  if (sPrev > s && sPrev > sNext) {
    increment = (-1);
    bestEdge = prevEdge;
    bestSeparation = sPrev;
  }
  else if (sNext > s) {
    increment = (1);
    bestEdge = nextEdge;
    bestSeparation = sNext;
  }
  else {
    results.edgeIndex = edge;
    results.separation = s;
    return;
  }
  while (true) {
    if (increment == (-1)) edge = bestEdge - (1) >= (0) ? bestEdge - (1) : count1 - (1);
    else edge = bestEdge + (1) < count1 ? bestEdge + (1) : (0);
    s = this.edgeSeparation(poly1, xf1, edge, poly2, xf2);
    if (s > bestSeparation) {
      bestEdge = edge;
      bestSeparation = s;
    }
    else {
      break;
    }
  }
  results.edgeIndex = bestEdge;
  results.separation = bestSeparation;
}
Collision.prototype.findIncidentEdge = function(c, poly1, xf1, edge1, poly2, xf2) {
  var count1 = poly1.vertexCount;
  var normals1 = poly1.normals;
  var count2 = poly2.vertexCount;
  var vertices2 = poly2.vertices;
  var normals2 = poly2.normals;
  Matrix22.mulMatrixAndVectorToOut(xf1.rotation, normals1[edge1], this.normal1);
  Matrix22.mulTransMatrixAndVectorToOut(xf2.rotation, this.normal1, this.normal1);
  var index = (0);
  var minDot = (99999999999999);
  for (var i = (0);
   i < count2; ++i) {
    var dot = Vector.dot(this.normal1, normals2[i]);
    if (dot < minDot) {
      minDot = dot;
      index = i;
    }
  }
  var i1 = index;
  var i2 = i1 + (1) < count2 ? i1 + (1) : (0);
  Transform.mulToOut(xf2, vertices2[i1], c[(0)].v);
  c[(0)].id.features.referenceEdge = edge1;
  c[(0)].id.features.incidentEdge = i1;
  c[(0)].id.features.incidentVertex = (0);
  Transform.mulToOut(xf2, vertices2[i2], c[(1)].v);
  c[(1)].id.features.referenceEdge = edge1;
  c[(1)].id.features.incidentEdge = i2;
  c[(1)].id.features.incidentVertex = (1);
}
Collision.prototype.collidePolygons = function(manifold, polyA, xfA, polyB, xfB) {
  manifold.pointCount = (0);
  var totalRadius = polyA.radius + polyB.radius;
  this.findMaxSeparation(this.results1, polyA, xfA, polyB, xfB);
  if (this.results1.separation > totalRadius) return;
  this.findMaxSeparation(this.results2, polyB, xfB, polyA, xfA);
  if (this.results2.separation > totalRadius) return;
  var poly1;
  var poly2;
  var xf1, xf2;
  var edge1;
  var flip;
  var k_relativeTol = (0.98);
  var k_absoluteTol = (0.001);
  if (this.results2.separation > k_relativeTol * this.results1.separation + k_absoluteTol) {
    poly1 = polyB;
    poly2 = polyA;
    xf1 = xfB;
    xf2 = xfA;
    edge1 = this.results2.edgeIndex;
    manifold.type = (2);
    flip = (1);
  }
  else {
    poly1 = polyA;
    poly2 = polyB;
    xf1 = xfA;
    xf2 = xfB;
    edge1 = this.results1.edgeIndex;
    manifold.type = (1);
    flip = (0);
  }
  this.findIncidentEdge(this.incidentEdge, poly1, xf1, edge1, poly2, xf2);
  var count1 = poly1.vertexCount;
  var vertices1 = poly1.vertices;
  this.v11.setFrom(vertices1[edge1]);
  this.v12.setFrom(edge1 + (1) < count1 ? vertices1[edge1 + (1)] : vertices1[(0)]);
  this.localTangent.setFrom(this.v12).subLocal(this.v11);
  this.localTangent.normalize();
  Vector.crossVectorAndNumToOut(this.localTangent, (1), this.localNormal);
  this.planePoint.setFrom(this.v11).addLocal(this.v12).mulLocal((0.5));
  Matrix22.mulMatrixAndVectorToOut(xf1.rotation, this.localTangent, this.tangent);
  Vector.crossVectorAndNumToOut(this.tangent, (1), this.normal);
  Transform.mulToOut(xf1, this.v11, this.v11);
  Transform.mulToOut(xf1, this.v12, this.v12);
  var frontOffset = Vector.dot(this.normal, this.v11);
  var sideOffset1 = -Vector.dot(this.tangent, this.v11) + totalRadius;
  var sideOffset2 = Vector.dot(this.tangent, this.v12) + totalRadius;
  var np;
  this.tangent.negateLocal();
  np = Collision.clipSegmentToLine(this.clipPoints1, this.incidentEdge, this.tangent, sideOffset1);
  this.tangent.negateLocal();
  if (np < (2)) return;
  np = Collision.clipSegmentToLine(this.clipPoints2, this.clipPoints1, this.tangent, sideOffset2);
  if (np < (2)) return;
  manifold.localNormal.setFrom(this.localNormal);
  manifold.localPoint.setFrom(this.planePoint);
  var pointCount = (0);
  for (var i = (0);
   i < (2); ++i) {
    var separation = Vector.dot(this.normal, this.clipPoints2[i].v) - frontOffset;
    if (separation <= totalRadius) {
      var cp = manifold.points[pointCount];
      Transform.mulTransToOut(xf2, this.clipPoints2[i].v, cp.localPoint);
      cp.id.setFrom(this.clipPoints2[i].id);
      cp.id.features.flip = flip;
      ++pointCount;
    }
  }
  manifold.pointCount = pointCount;
}
// ********** Code for ClipVertex **************
function ClipVertex() {
  this.v = new Vector((0), (0));
  this.id = new ContactID();
}
ClipVertex.prototype.setFrom = function(cv) {
  this.v.setFrom(cv.v);
  this.id.setFrom(cv.id);
}
ClipVertex.prototype.setFrom$1 = ClipVertex.prototype.setFrom;
// ********** Code for EdgeResults **************
function EdgeResults() {
  this.separation = (0);
  this.edgeIndex = (0);
}
// ********** Code for ContactID **************
function ContactID() {
  this.features = new Features();
}
ContactID.prototype.get$features = function() { return this.features; };
ContactID.prototype.$eq = function(other) {
  return $eq(other.get$features(), this.features);
}
ContactID.prototype.setFrom = function(other) {
  this.features.setFrom(other.features);
}
ContactID.prototype.isEqual = function(other) {
  return $eq(other.features, this.features);
}
ContactID.prototype.zero = function() {
  this.features.zero();
}
ContactID.prototype.setFrom$1 = ContactID.prototype.setFrom;
// ********** Code for Distance **************
Distance._construct$ctor = function() {
  this.closestPoint = new Vector((0), (0));
  this.normal = new Vector((0), (0));
  this.iters = (0);
  this.maxIters = (20);
  this.simplex = new Simplex();
  this.searchDirection = new Vector((0), (0));
  this.temp = new Vector((0), (0));
  this.calls = (0);
  this.saveB = new Array((3));
  this.saveA = new Array((3));
}
Distance._construct$ctor.prototype = Distance.prototype;
function Distance() {}
Distance.prototype.distance = function(output, cache, input) {
  var $0, $1;
  this.calls++;
  var proxyA = input.proxyA;
  var proxyB = input.proxyB;
  var transformA = input.transformA;
  var transformB = input.transformB;
  this.simplex.readCache(cache, proxyA, transformA, proxyB, transformB);
  var vertices = this.simplex.vertices;
  var saveCount = (0);
  this.simplex.getClosestPoint(this.closestPoint);
  var distanceSqr1 = this.closestPoint.get$lengthSquared();
  var distanceSqr2 = distanceSqr1;
  var iter = (0);
  while (iter < this.maxIters) {
    saveCount = this.simplex.count;
    for (var i = (0);
     i < saveCount; i++) {
      this.saveA.$setindex(i, vertices[i].indexA);
      this.saveB.$setindex(i, vertices[i].indexB);
    }
    switch (this.simplex.count) {
      case (1):

        break;

      case (2):

        this.simplex.solve2();
        break;

      case (3):

        this.simplex.solve3();
        break;

      default:


    }
    if (this.simplex.count == (3)) break;
    this.simplex.getClosestPoint(this.closestPoint);
    distanceSqr2 = this.closestPoint.get$lengthSquared();
    distanceSqr1 = distanceSqr2;
    this.simplex.getSearchDirection(this.searchDirection);
    if (this.searchDirection.get$lengthSquared() < (1.4208639999999999e-14)) {
      break;
    }
    var vertex = vertices[this.simplex.count];
    Matrix22.mulTransMatrixAndVectorToOut(transformA.rotation, this.searchDirection.negateLocal(), this.temp);
    vertex.indexA = proxyA.getSupport(this.temp);
    Transform.mulToOut(transformA, proxyA.vertices[vertex.indexA], vertex.wA);
    Matrix22.mulTransMatrixAndVectorToOut(transformB.rotation, this.searchDirection.negateLocal(), this.temp);
    vertex.indexB = proxyB.getSupport(this.temp);
    Transform.mulToOut(transformB, proxyB.vertices[vertex.indexB], vertex.wB);
    vertex.w.setFrom(vertex.wB).subLocal(vertex.wA);
    ++iter;
    ++this.iters;
    var duplicate = false;
    for (var i = (0);
     i < saveCount; ++i) {
      if (vertex.indexA == this.saveA.$index(i) && vertex.indexB == this.saveB.$index(i)) {
        duplicate = true;
        break;
      }
    }
    if (duplicate) break;
    ((($0 = this.simplex).count = ($1 = $0.count + (1)), $1));
  }
  this.maxIters = Math.max(this.maxIters, iter);
  this.simplex.getWitnessPoints(output.pointA, output.pointB);
  output.distance = MathBox.distance(output.pointA, output.pointB);
  output.iterations = iter;
  this.simplex.writeCache(cache);
  if (input.useRadii) {
    var rA = proxyA.radius;
    var rB = proxyB.radius;
    if (output.distance > rA + rB && output.distance > (1.192e-7)) {
      output.distance = output.distance - (rA + rB);
      this.normal.setFrom(output.pointB).subLocal(output.pointA);
      this.normal.normalize();
      this.temp.setFrom(this.normal).mulLocal(rA);
      output.pointA.addLocal(this.temp);
      this.temp.setFrom(this.normal).mulLocal(rB);
      output.pointB.subLocal(this.temp);
    }
    else {
      output.pointA.addLocal(output.pointB).mulLocal((0.5));
      output.pointB.setFrom(output.pointA);
      output.distance = (0);
    }
  }
}
// ********** Code for DistanceInput **************
function DistanceInput() {
  this.transformB = new Transform();
  this.transformA = new Transform();
  this.proxyA = new DistanceProxy();
  this.proxyB = new DistanceProxy();
  this.useRadii = false;
}
// ********** Code for DistanceOutput **************
function DistanceOutput() {
  this.pointB = new Vector((0), (0));
  this.pointA = new Vector((0), (0));
}
// ********** Code for DistanceProxy **************
function DistanceProxy() {
  this.vertices = new Array((8));
  this.radius = (0);
  this.count = (0);
  for (var i = (0);
   i < this.vertices.get$length(); ++i) this.vertices.$setindex(i, new Vector((0), (0)));
}
DistanceProxy.prototype.get$vertices = function() { return this.vertices; };
DistanceProxy.prototype.get$radius = function() { return this.radius; };
DistanceProxy.prototype.set$radius = function(value) { return this.radius = value; };
DistanceProxy.prototype.setFromShape = function(shape) {
  if ($eq(shape.get$type(), (0))) {
    this.vertices[(0)].setFrom(shape.get$position());
    this.count = (1);
    this.radius = shape.get$radius();
  }
  else if ($eq(shape.get$type(), (1))) {
    this.count = shape.get$vertexCount();
    this.radius = shape.get$radius();
    for (var i = (0);
     i < this.count; i++) {
      this.vertices[i].setFrom(shape.get$vertices().$index(i));
    }
  }
  else {
  }
}
DistanceProxy.prototype.getSupport = function(direction) {
  var bestIndex = (0);
  var bestValue = Vector.dot(this.vertices[(0)], direction);
  for (var i = (1);
   i < this.count; ++i) {
    var value = Vector.dot(this.vertices[i], direction);
    if (value > bestValue) {
      bestIndex = i;
      bestValue = value;
    }
  }
  return bestIndex;
}
// ********** Code for Features **************
function Features() {
  this.referenceEdge = (0);
  this.incidentVertex = (0);
  this.incidentEdge = (0);
  this.flip = (0);
}
Features.prototype.get$referenceEdge = function() { return this.referenceEdge; };
Features.prototype.set$referenceEdge = function(value) { return this.referenceEdge = value; };
Features.prototype.get$incidentEdge = function() { return this.incidentEdge; };
Features.prototype.set$incidentEdge = function(value) { return this.incidentEdge = value; };
Features.prototype.get$incidentVertex = function() { return this.incidentVertex; };
Features.prototype.set$incidentVertex = function(value) { return this.incidentVertex = value; };
Features.prototype.get$flip = function() { return this.flip; };
Features.prototype.set$flip = function(value) { return this.flip = value; };
Features.prototype.setFrom = function(f) {
  this.referenceEdge = f.referenceEdge;
  this.incidentEdge = f.incidentEdge;
  this.incidentVertex = f.incidentVertex;
  this.flip = f.flip;
}
Features.prototype.$eq = function(other) {
  return this.referenceEdge == other.get$referenceEdge() && this.incidentEdge == other.get$incidentEdge() && this.incidentVertex == other.get$incidentVertex() && this.flip == other.get$flip();
}
Features.prototype.toString = function() {
  return $add($add($add($add("Features: (" + this.flip, " ,") + this.incidentEdge, " ,") + this.incidentVertex, " ,") + this.referenceEdge, ")");
}
Features.prototype.zero = function() {
  this.referenceEdge = (0);
  this.incidentEdge = (0);
  this.incidentVertex = (0);
  this.flip = (0);
}
Features.prototype.setFrom$1 = Features.prototype.setFrom;
// ********** Code for Manifold **************
function Manifold() {
  this.pointCount = (0);
  this.localPoint = new Vector((0), (0));
  this.points = new Array((2));
  this.localNormal = new Vector((0), (0));
  for (var i = (0);
   i < (2); ++i) this.points.$setindex(i, new ManifoldPoint());
}
Manifold.prototype.get$type = function() { return this.type; };
Manifold.prototype.set$type = function(value) { return this.type = value; };
Manifold.prototype.setFrom = function(other) {
  for (var i = (0);
   i < other.pointCount; ++i) this.points[i].setFrom(other.points[i]);
  this.type = other.type;
  this.localNormal.setFrom(other.localNormal);
  this.localPoint.setFrom(other.localPoint);
  this.pointCount = other.pointCount;
}
Manifold.prototype.setFrom$1 = Manifold.prototype.setFrom;
// ********** Code for ManifoldPoint **************
function ManifoldPoint() {
  this.tangentImpulse = (0);
  this.id = new ContactID();
  this.localPoint = new Vector((0), (0));
  this.normalImpulse = (0);
}
ManifoldPoint.prototype.setFrom = function(other) {
  this.localPoint.setFrom(other.localPoint);
  this.normalImpulse = other.normalImpulse;
  this.tangentImpulse = other.tangentImpulse;
  this.id.setFrom(other.id);
}
ManifoldPoint.prototype.setFrom$1 = ManifoldPoint.prototype.setFrom;
// ********** Code for ManifoldType **************
function ManifoldType() {}
// ********** Code for Simplex **************
function Simplex() {
  this.v3 = new SimplexVertex();
  this.v1 = new SimplexVertex();
  this.v2 = new SimplexVertex();
  this.e23 = new Vector((0), (0));
  this.case22 = new Vector((0), (0));
  this.vertices = new Array((3));
  this.e13 = new Vector((0), (0));
  this.case3 = new Vector((0), (0));
  this.case2 = new Vector((0), (0));
  this.e12 = new Vector((0), (0));
  this.case33 = new Vector((0), (0));
  this.count = (0);
  this.vertices.$setindex((0), this.v1);
  this.vertices.$setindex((1), this.v2);
  this.vertices.$setindex((2), this.v3);
}
Simplex.prototype.get$vertices = function() { return this.vertices; };
Simplex.prototype.readCache = function(cache, proxyA, transformA, proxyB, transformB) {
  this.count = cache.count;
  for (var i = (0);
   i < this.count; ++i) {
    var v = this.vertices[i];
    v.indexA = cache.indexA.$index(i);
    v.indexB = cache.indexB.$index(i);
    var wALocal = proxyA.vertices[v.indexA];
    var wBLocal = proxyB.vertices[v.indexB];
    Transform.mulToOut(transformA, wALocal, v.wA);
    Transform.mulToOut(transformB, wBLocal, v.wB);
    v.w.setFrom(v.wB).subLocal(v.wA);
    v.a = (0);
  }
  if (this.count > (1)) {
    var metric1 = cache.metric;
    var metric2 = this.getMetric();
    if (metric2 < (0.5) * metric1 || (2) * metric1 < metric2 || metric2 < (1.192e-7)) {
      this.count = (0);
    }
  }
  if (this.count == (0)) {
    var v = this.vertices[(0)];
    v.indexA = (0);
    v.indexB = (0);
    var wALocal = proxyA.vertices[(0)];
    var wBLocal = proxyB.vertices[(0)];
    Transform.mulToOut(transformA, wALocal, v.wA);
    Transform.mulToOut(transformB, wBLocal, v.wB);
    v.w.setFrom(v.wB).subLocal(v.wA);
    this.count = (1);
  }
}
Simplex.prototype.writeCache = function(cache) {
  cache.metric = this.getMetric();
  cache.count = this.count;
  for (var i = (0);
   i < this.count; ++i) {
    cache.indexA.$setindex(i, (this.vertices[i].indexA));
    cache.indexB.$setindex(i, (this.vertices[i].indexB));
  }
}
Simplex.prototype.getSearchDirection = function(out) {
  switch (this.count) {
    case (1):

      out.setFrom(this.v1.w).negateLocal();
      return;

    case (2):

      this.e12.setFrom(this.v2.w).subLocal(this.v1.w);
      out.setFrom(this.v1.w).negateLocal();
      var sgn = Vector.crossVectors(this.e12, out);
      if (sgn > (0)) {
        Vector.crossNumAndVectorToOut((1), this.e12, out);
        return;
      }
      else {
        Vector.crossVectorAndNumToOut(this.e12, (1), out);
        return;
      }

    default:

      out.setZero();
      return;

  }
}
Simplex.prototype.getClosestPoint = function(out) {
  switch (this.count) {
    case (0):

      out.setZero();
      return;

    case (1):

      out.setFrom(this.v1.w);
      return;

    case (2):

      this.case22.setFrom(this.v2.w).mulLocal(this.v2.a);
      this.case2.setFrom(this.v1.w).mulLocal(this.v1.a).addLocal(this.case22);
      out.setFrom(this.case2);
      return;

    case (3):

      out.setZero();
      return;

    default:

      out.setZero();
      return;

  }
}
Simplex.prototype.getWitnessPoints = function(pA, pB) {
  switch (this.count) {
    case (0):

      break;

    case (1):

      pA.setFrom(this.v1.wA);
      pB.setFrom(this.v1.wB);
      break;

    case (2):

      this.case2.setFrom(this.v1.wA).mulLocal(this.v1.a);
      pA.setFrom(this.v2.wA).mulLocal(this.v2.a).addLocal(this.case2);
      this.case2.setFrom(this.v1.wB).mulLocal(this.v1.a);
      pB.setFrom(this.v2.wB).mulLocal(this.v2.a).addLocal(this.case2);
      break;

    case (3):

      pA.setFrom(this.v1.wA).mulLocal(this.v1.a);
      this.case3.setFrom(this.v2.wA).mulLocal(this.v2.a);
      this.case33.setFrom(this.v3.wA).mulLocal(this.v3.a);
      pA.addLocal(this.case3).addLocal(this.case33);
      pB.setFrom(pA);
      break;

    default:

      break;

  }
}
Simplex.prototype.getMetric = function() {
  switch (this.count) {
    case (0):

      return (0);

    case (1):

      return (0);

    case (2):

      return MathBox.distance(this.v1.w, this.v2.w);

    case (3):

      this.case3.setFrom(this.v2.w).subLocal(this.v1.w);
      this.case33.setFrom(this.v3.w).subLocal(this.v1.w);
      return Vector.crossVectors(this.case3, this.case33);

    default:

      return (0);

  }
}
Simplex.prototype.solve2 = function() {
  var w1 = this.v1.w;
  var w2 = this.v2.w;
  this.e12.setFrom(w2).subLocal(w1);
  var d12_2 = -Vector.dot(w1, this.e12);
  if (d12_2 <= (0)) {
    this.v1.a = (1);
    this.count = (1);
    return;
  }
  var d12_1 = Vector.dot(w2, this.e12);
  if (d12_1 <= (0)) {
    this.v2.a = (1);
    this.count = (1);
    this.v1.setFrom(this.v2);
    return;
  }
  var inv_d12 = (1) / (d12_1 + d12_2);
  this.v1.a = d12_1 * inv_d12;
  this.v2.a = d12_2 * inv_d12;
  this.count = (2);
}
Simplex.prototype.solve3 = function() {
  var w1 = this.v1.w;
  var w2 = this.v2.w;
  var w3 = this.v3.w;
  this.e12.setFrom(w2).subLocal(w1);
  var w1e12 = Vector.dot(w1, this.e12);
  var w2e12 = Vector.dot(w2, this.e12);
  var d12_1 = w2e12;
  var d12_2 = -w1e12;
  this.e13.setFrom(w3).subLocal(w1);
  var w1e13 = Vector.dot(w1, this.e13);
  var w3e13 = Vector.dot(w3, this.e13);
  var d13_1 = w3e13;
  var d13_2 = -w1e13;
  this.e23.setFrom(w3).subLocal(w2);
  var w2e23 = Vector.dot(w2, this.e23);
  var w3e23 = Vector.dot(w3, this.e23);
  var d23_1 = w3e23;
  var d23_2 = -w2e23;
  var n123 = Vector.crossVectors(this.e12, this.e13);
  var d123_1 = n123 * Vector.crossVectors(w2, w3);
  var d123_2 = n123 * Vector.crossVectors(w3, w1);
  var d123_3 = n123 * Vector.crossVectors(w1, w2);
  if (d12_2 <= (0) && d13_2 <= (0)) {
    this.v1.a = (1);
    this.count = (1);
    return;
  }
  if (d12_1 > (0) && d12_2 > (0) && d123_3 <= (0)) {
    var inv_d12 = (1) / (d12_1 + d12_2);
    this.v1.a = d12_1 * inv_d12;
    this.v2.a = d12_2 * inv_d12;
    this.count = (2);
    return;
  }
  if (d13_1 > (0) && d13_2 > (0) && d123_2 <= (0)) {
    var inv_d13 = (1) / (d13_1 + d13_2);
    this.v1.a = d13_1 * inv_d13;
    this.v3.a = d13_2 * inv_d13;
    this.count = (2);
    this.v2.setFrom(this.v3);
    return;
  }
  if (d12_1 <= (0) && d23_2 <= (0)) {
    this.v2.a = (1);
    this.count = (1);
    this.v1.setFrom(this.v2);
    return;
  }
  if (d13_1 <= (0) && d23_1 <= (0)) {
    this.v3.a = (1);
    this.count = (1);
    this.v1.setFrom(this.v3);
    return;
  }
  if (d23_1 > (0) && d23_2 > (0) && d123_1 <= (0)) {
    var inv_d23 = (1) / (d23_1 + d23_2);
    this.v2.a = d23_1 * inv_d23;
    this.v3.a = d23_2 * inv_d23;
    this.count = (2);
    this.v1.setFrom(this.v3);
    return;
  }
  var inv_d123 = (1) / (d123_1 + d123_2 + d123_3);
  this.v1.a = d123_1 * inv_d123;
  this.v2.a = d123_2 * inv_d123;
  this.v3.a = d123_3 * inv_d123;
  this.count = (3);
}
// ********** Code for SimplexCache **************
function SimplexCache() {
  this.indexA = new Array((3));
  this.metric = (0);
  this.indexB = new Array((3));
  this.count = (0);
  for (var i = (0);
   i < (3); ++i) {
    this.indexA.$setindex(i, (2147483647));
    this.indexB.$setindex(i, (2147483647));
  }
}
SimplexCache.prototype.setFrom = function(sc) {
  this.indexA.setRange$3((0), this.indexA.get$length(), sc.indexA);
  this.indexB.setRange$3((0), this.indexB.get$length(), sc.indexB);
  this.metric = sc.metric;
  this.count = sc.count;
}
SimplexCache.prototype.setFrom$1 = SimplexCache.prototype.setFrom;
// ********** Code for SimplexVertex **************
function SimplexVertex() {
  this.w = new Vector((0), (0));
  this.a = (0);
  this.wB = new Vector((0), (0));
  this.indexB = (0);
  this.wA = new Vector((0), (0));
  this.indexA = (0);
}
SimplexVertex.prototype.setFrom = function(sv) {
  this.wA.setFrom(sv.wA);
  this.wB.setFrom(sv.wB);
  this.w.setFrom(sv.w);
  this.a = sv.a;
  this.indexA = sv.indexA;
  this.indexB = sv.indexB;
}
SimplexVertex.prototype.toString = function() {
  return $add($add($add($add($add("wA: ", this.wA.toString()), " wB: "), this.wB.toString()), " w: "), this.w.toString());
}
SimplexVertex.prototype.setFrom$1 = SimplexVertex.prototype.setFrom;
// ********** Code for TimeOfImpact **************
TimeOfImpact._construct$ctor = function(argPool) {
  this.fcn = new SeparationFunction();
  this.xfB = new Transform();
  this.indexes = new Array((2));
  this.xfA = new Transform();
  this.distanceInput = new DistanceInput();
  this.distanceOutput = new DistanceOutput();
  this.sweepA = new Sweep();
  this.cache = new SimplexCache();
  this.pool = argPool;
  this.sweepB = new Sweep();
  this.indexes.$setindex((0), (0));
  this.indexes.$setindex((1), (0));
  $globals.TimeOfImpact_toiCalls = (0);
  $globals.TimeOfImpact_toiIters = (0);
  $globals.TimeOfImpact_toiMaxIters = (0);
  $globals.TimeOfImpact_toiRootIters = (0);
  $globals.TimeOfImpact_toiMaxRootIters = (0);
}
TimeOfImpact._construct$ctor.prototype = TimeOfImpact.prototype;
function TimeOfImpact() {}
TimeOfImpact.prototype.timeOfImpact = function(output, input) {
  ++$globals.TimeOfImpact_toiCalls;
  output.state = (0);
  output.t = input.tMax;
  var proxyA = input.proxyA;
  var proxyB = input.proxyB;
  this.sweepA.setFrom(input.sweepA);
  this.sweepB.setFrom(input.sweepB);
  this.sweepA.normalize();
  this.sweepB.normalize();
  var tMax = input.tMax;
  var totalRadius = proxyA.radius + proxyB.radius;
  var target = Math.max((0.005), totalRadius - (0.015));
  var tolerance = (0.00125);
  var t1 = (0);
  var iter = (0);
  this.cache.count = (0);
  this.distanceInput.proxyA = input.proxyA;
  this.distanceInput.proxyB = input.proxyB;
  this.distanceInput.useRadii = false;
  while (true) {
    this.sweepA.getTransform(this.xfA, t1);
    this.sweepB.getTransform(this.xfB, t1);
    this.distanceInput.transformA = this.xfA;
    this.distanceInput.transformB = this.xfB;
    this.pool.distance.distance(this.distanceOutput, this.cache, this.distanceInput);
    if (this.distanceOutput.distance <= (0)) {
      output.state = (2);
      output.t = (0);
      break;
    }
    if (this.distanceOutput.distance < target + tolerance) {
      output.state = (3);
      output.t = t1;
      break;
    }
    this.fcn.initialize(this.cache, proxyA, this.sweepA, proxyB, this.sweepB, t1);
    var done = false;
    var t2 = tMax;
    var pushBackIter = (0);
    while (true) {
      var s2 = this.fcn.findMinSeparation(this.indexes, t2);
      if (s2 > target + tolerance) {
        output.state = (4);
        output.t = tMax;
        done = true;
        break;
      }
      if (s2 > target - tolerance) {
        t1 = t2;
        break;
      }
      var s1 = this.fcn.evaluate(this.indexes.$index((0)), this.indexes.$index((1)), t1);
      if (s1 < target - tolerance) {
        output.state = (1);
        output.t = t1;
        done = true;
        break;
      }
      if (s1 <= target + tolerance) {
        output.state = (3);
        output.t = t1;
        done = true;
        break;
      }
      var rootIterCount = (0);
      var a1 = t1, a2 = t2;
      while (true) {
        var t = null;
        if ((rootIterCount & (1)) == (1)) {
          t = a1 + (target - s1) * (a2 - a1) / (s2 - s1);
        }
        else {
          t = (0.5) * (a1 + a2);
        }
        var s = this.fcn.evaluate(this.indexes.$index((0)), this.indexes.$index((1)), t);
        if ((s - target).abs() < tolerance) {
          t2 = t;
          break;
        }
        if (s > target) {
          a1 = t;
          s1 = s;
        }
        else {
          a2 = t;
          s2 = s;
        }
        ++rootIterCount;
        ++$globals.TimeOfImpact_toiRootIters;
        if (rootIterCount == (50)) {
          break;
        }
      }
      $globals.TimeOfImpact_toiMaxRootIters = Math.max($globals.TimeOfImpact_toiMaxRootIters, rootIterCount);
      ++pushBackIter;
      if (pushBackIter == (8)) {
        break;
      }
    }
    ++iter;
    ++$globals.TimeOfImpact_toiIters;
    if (done) break;
    if (iter == (1000)) {
      output.state = (1);
      output.t = t1;
      break;
    }
  }
  $globals.TimeOfImpact_toiMaxIters = Math.max($globals.TimeOfImpact_toiMaxIters, iter);
}
// ********** Code for SeparationFunction **************
function SeparationFunction() {
  this.temp = new Vector((0), (0));
  this.normal = new Vector((0), (0));
  this.axis = new Vector((0), (0));
  this.localPointA1 = new Vector((0), (0));
  this.sweepB = new Sweep();
  this.proxyA = new DistanceProxy();
  this.proxyB = new DistanceProxy();
  this.sweepA = new Sweep();
  this.pointA = new Vector((0), (0));
  this.pointB = new Vector((0), (0));
  this.localPointA2 = new Vector((0), (0));
  this.localPointA = new Vector((0), (0));
  this.localPointB = new Vector((0), (0));
  this.xfb = new Transform();
  this.xfa = new Transform();
  this.localPoint = new Vector((0), (0));
  this.localPointB2 = new Vector((0), (0));
  this.localPointB1 = new Vector((0), (0));
  this.axisB = new Vector((0), (0));
  this.type = (0);
  this.axisA = new Vector((0), (0));
}
SeparationFunction.prototype.get$type = function() { return this.type; };
SeparationFunction.prototype.set$type = function(value) { return this.type = value; };
SeparationFunction.prototype.initialize = function(cache, argProxyA, argSweepA, argProxyB, argSweepB, t1) {
  this.proxyA = argProxyA;
  this.proxyB = argProxyB;
  var count = cache.count;
  this.sweepA = argSweepA;
  this.sweepB = argSweepB;
  this.sweepA.getTransform(this.xfa, t1);
  this.sweepB.getTransform(this.xfb, t1);
  if (count == (1)) {
    this.type = (0);
    this.localPointA.setFrom(this.proxyA.vertices[cache.indexA.$index((0))]);
    this.localPointB.setFrom(this.proxyB.vertices[cache.indexB.$index((0))]);
    Transform.mulToOut(this.xfa, this.localPointA, this.pointA);
    Transform.mulToOut(this.xfb, this.localPointB, this.pointB);
    this.axis.setFrom(this.pointB).subLocal(this.pointA);
    var s = this.axis.normalize();
    return s;
  }
  else if (cache.indexA.$index((0)) == cache.indexA.$index((1))) {
    this.type = (2);
    this.localPointB1.setFrom(this.proxyB.vertices[cache.indexB.$index((0))]);
    this.localPointB2.setFrom(this.proxyB.vertices[cache.indexB.$index((1))]);
    this.temp.setFrom(this.localPointB2).subLocal(this.localPointB1);
    Vector.crossVectorAndNumToOut(this.temp, (1), this.axis);
    this.axis.normalize();
    Matrix22.mulMatrixAndVectorToOut(this.xfb.rotation, this.axis, this.normal);
    this.localPoint.setFrom(this.localPointB1);
    this.localPoint.addLocal(this.localPointB2);
    this.localPoint.mulLocal((0.5));
    Transform.mulToOut(this.xfb, this.localPoint, this.pointB);
    this.localPointA.setFrom(this.proxyA.vertices[cache.indexA.$index((0))]);
    Transform.mulToOut(this.xfa, this.localPointA, this.pointA);
    this.temp.setFrom(this.pointA);
    this.temp.subLocal(this.pointB);
    var s = Vector.dot(this.temp, this.normal);
    if (s < (0)) {
      this.axis.negateLocal();
      s = -s;
    }
    return s;
  }
  else {
    this.type = (1);
    this.localPointA1.setFrom(this.proxyA.vertices[cache.indexA.$index((0))]);
    this.localPointA2.setFrom(this.proxyA.vertices[cache.indexA.$index((1))]);
    this.temp.setFrom(this.localPointA2);
    this.temp.subLocal(this.localPointA1);
    Vector.crossVectorAndNumToOut(this.temp, (1), this.axis);
    this.axis.normalize();
    Matrix22.mulMatrixAndVectorToOut(this.xfa.rotation, this.axis, this.normal);
    this.localPoint.setFrom(this.localPointA1);
    this.localPoint.addLocal(this.localPointA2);
    this.localPoint.mulLocal((0.5));
    Transform.mulToOut(this.xfa, this.localPoint, this.pointA);
    this.localPointB.setFrom(this.proxyB.vertices[cache.indexB.$index((0))]);
    Transform.mulToOut(this.xfb, this.localPointB, this.pointB);
    this.temp.setFrom(this.pointB);
    this.temp.subLocal(this.pointA);
    var s = Vector.dot(this.temp, this.normal);
    if (s < (0)) {
      this.axis.negateLocal();
      s = -s;
    }
    return s;
  }
}
SeparationFunction.prototype.findMinSeparation = function(indexes, t) {
  this.sweepA.getTransform(this.xfa, t);
  this.sweepB.getTransform(this.xfb, t);
  switch (this.type) {
    case (0):

      Matrix22.mulTransMatrixAndVectorToOut(this.xfa.rotation, this.axis, this.axisA);
      Matrix22.mulTransMatrixAndVectorToOut(this.xfb.rotation, this.axis.negateLocal(), this.axisB);
      this.axis.negateLocal();
      indexes.$setindex((0), this.proxyA.getSupport(this.axisA));
      indexes.$setindex((1), this.proxyB.getSupport(this.axisB));
      this.localPointA.setFrom(this.proxyA.vertices[indexes.$index((0))]);
      this.localPointB.setFrom(this.proxyB.vertices[indexes.$index((1))]);
      Transform.mulToOut(this.xfa, this.localPointA, this.pointA);
      Transform.mulToOut(this.xfb, this.localPointB, this.pointB);
      var separation = Vector.dot(this.pointB.subLocal(this.pointA), this.axis);
      return separation;

    case (1):

      Matrix22.mulMatrixAndVectorToOut(this.xfa.rotation, this.axis, this.normal);
      Transform.mulToOut(this.xfa, this.localPoint, this.pointA);
      this.normal.negateLocal();
      Matrix22.mulTransMatrixAndVectorToOut(this.xfb.rotation, this.normal, this.axisB);
      this.normal.negateLocal();
      indexes.$setindex((0), (-1));
      indexes.$setindex((1), this.proxyB.getSupport(this.axisB));
      this.localPointB.setFrom(this.proxyB.vertices[indexes.$index((1))]);
      Transform.mulToOut(this.xfb, this.localPointB, this.pointB);
      var separation = Vector.dot(this.pointB.subLocal(this.pointA), this.normal);
      return separation;

    case (2):

      Matrix22.mulMatrixAndVectorToOut(this.xfb.rotation, this.axis, this.normal);
      Transform.mulToOut(this.xfb, this.localPoint, this.pointB);
      Matrix22.mulTransMatrixAndVectorToOut(this.xfa.rotation, this.normal.negateLocal(), this.axisA);
      this.normal.negateLocal();
      indexes.$setindex((1), (-1));
      indexes.$setindex((0), this.proxyA.getSupport(this.axisA));
      this.localPointA.setFrom(this.proxyA.vertices[indexes.$index((0))]);
      Transform.mulToOut(this.xfa, this.localPointA, this.pointA);
      var separation = Vector.dot(this.pointA.subLocal(this.pointB), this.normal);
      return separation;

    default:

      indexes.$setindex((0), (-1));
      indexes.$setindex((1), (-1));
      return (0);

  }
}
SeparationFunction.prototype.evaluate = function(indexA, indexB, t) {
  this.sweepA.getTransform(this.xfa, t);
  this.sweepB.getTransform(this.xfb, t);
  switch (this.type) {
    case (0):

      Matrix22.mulTransMatrixAndVectorToOut(this.xfa.rotation, this.axis, this.axisA);
      Matrix22.mulTransMatrixAndVectorToOut(this.xfb.rotation, this.axis.negateLocal(), this.axisB);
      this.axis.negateLocal();
      this.localPointA.setFrom(this.proxyA.vertices[indexA]);
      this.localPointB.setFrom(this.proxyB.vertices[indexB]);
      Transform.mulToOut(this.xfa, this.localPointA, this.pointA);
      Transform.mulToOut(this.xfb, this.localPointB, this.pointB);
      var separation = Vector.dot(this.pointB.subLocal(this.pointA), this.axis);
      return separation;

    case (1):

      Matrix22.mulMatrixAndVectorToOut(this.xfa.rotation, this.axis, this.normal);
      Transform.mulToOut(this.xfa, this.localPoint, this.pointA);
      this.normal.negateLocal();
      Matrix22.mulTransMatrixAndVectorToOut(this.xfb.rotation, this.normal, this.axisB);
      this.normal.negateLocal();
      this.localPointB.setFrom(this.proxyB.vertices[indexB]);
      Transform.mulToOut(this.xfb, this.localPointB, this.pointB);
      var separation = Vector.dot(this.pointB.subLocal(this.pointA), this.normal);
      return separation;

    case (2):

      Matrix22.mulMatrixAndVectorToOut(this.xfb.rotation, this.axis, this.normal);
      Transform.mulToOut(this.xfb, this.localPoint, this.pointB);
      Matrix22.mulTransMatrixAndVectorToOut(this.xfa.rotation, this.normal.negateLocal(), this.axisA);
      this.normal.negateLocal();
      this.localPointA.setFrom(this.proxyA.vertices[indexA]);
      Transform.mulToOut(this.xfa, this.localPointA, this.pointA);
      var separation = Vector.dot(this.pointA.subLocal(this.pointB), this.normal);
      return separation;

    default:

      return (0);

  }
}
// ********** Code for TimeOfImpactInput **************
function TimeOfImpactInput() {
  this.tMax = (0);
  this.sweepB = new Sweep();
  this.proxyA = new DistanceProxy();
  this.proxyB = new DistanceProxy();
  this.sweepA = new Sweep();
}
// ********** Code for TimeOfImpactOutputState **************
function TimeOfImpactOutputState() {}
// ********** Code for TimeOfImpactOutput **************
function TimeOfImpactOutput() {
  this.state = (0);
  this.t = (0);
}
// ********** Code for Type **************
function Type() {}
// ********** Code for WorldManifold **************
function WorldManifold() {
  this.pool3 = new Vector((0), (0));
  this.normal = new Vector((0), (0));
  this.points = new Array((2));
  this.pool4 = new Vector((0), (0));
  for (var i = (0);
   i < (2); ++i) this.points.$setindex(i, new Vector((0), (0)));
}
WorldManifold.prototype.initialize = function(manifold, xfA, radiusA, xfB, radiusB) {
  switch (manifold.type) {
    case (0):

      var pointA = this.pool3;
      var pointB = this.pool4;
      this.normal.x = (1);
      this.normal.y = (0);
      pointA.x = xfA.position.x + xfA.rotation.col1.x * manifold.localPoint.x + xfA.rotation.col2.x * manifold.localPoint.y;
      pointA.y = xfA.position.y + xfA.rotation.col1.y * manifold.localPoint.x + xfA.rotation.col2.y * manifold.localPoint.y;
      pointB.x = xfB.position.x + xfB.rotation.col1.x * manifold.points[(0)].localPoint.x + xfB.rotation.col2.x * manifold.points[(0)].localPoint.y;
      pointB.y = xfB.position.y + xfB.rotation.col1.y * manifold.points[(0)].localPoint.x + xfB.rotation.col2.y * manifold.points[(0)].localPoint.y;
      if (MathBox.distanceSquared(pointA, pointB) > (1.4208639999999999e-14)) {
        this.normal.x = pointB.x - pointA.x;
        this.normal.y = pointB.y - pointA.y;
        this.normal.normalize();
      }
      var cAx = this.normal.x * radiusA + pointA.x;
      var cAy = this.normal.y * radiusA + pointA.y;
      var cBx = -this.normal.x * radiusB + pointB.x;
      var cBy = -this.normal.y * radiusB + pointB.y;
      this.points[(0)].x = (cAx + cBx) * (0.5);
      this.points[(0)].y = (cAy + cBy) * (0.5);
      return;

    case (1):

      var planePoint = this.pool3;
      this.normal.x = xfA.rotation.col1.x * manifold.localNormal.x + xfA.rotation.col2.x * manifold.localNormal.y;
      this.normal.y = xfA.rotation.col1.y * manifold.localNormal.x + xfA.rotation.col2.y * manifold.localNormal.y;
      planePoint.x = xfA.position.x + xfA.rotation.col1.x * manifold.localPoint.x + xfA.rotation.col2.x * manifold.localPoint.y;
      planePoint.y = xfA.position.y + xfA.rotation.col1.y * manifold.localPoint.x + xfA.rotation.col2.y * manifold.localPoint.y;
      var clipPoint = this.pool4;
      for (var i = (0);
       i < manifold.pointCount; ++i) {
        clipPoint.x = xfB.position.x + xfB.rotation.col1.x * manifold.points[i].localPoint.x + xfB.rotation.col2.x * manifold.points[i].localPoint.y;
        clipPoint.y = xfB.position.y + xfB.rotation.col1.y * manifold.points[i].localPoint.x + xfB.rotation.col2.y * manifold.points[i].localPoint.y;
        var scalar = radiusA - ((clipPoint.x - planePoint.x) * this.normal.x + (clipPoint.y - planePoint.y) * this.normal.y);
        var cAx = this.normal.x * scalar + clipPoint.x;
        var cAy = this.normal.y * scalar + clipPoint.y;
        var cBx = -this.normal.x * radiusB + clipPoint.x;
        var cBy = -this.normal.y * radiusB + clipPoint.y;
        this.points[i].x = (cAx + cBx) * (0.5);
        this.points[i].y = (cAy + cBy) * (0.5);
      }
      return;

    case (2):

      var planePoint = this.pool3;
      var R = xfB.rotation;
      this.normal.x = R.col1.x * manifold.localNormal.x + R.col2.x * manifold.localNormal.y;
      this.normal.y = R.col1.y * manifold.localNormal.x + R.col2.y * manifold.localNormal.y;
      var v = manifold.localPoint;
      planePoint.x = xfB.position.x + xfB.rotation.col1.x * v.x + xfB.rotation.col2.x * v.y;
      planePoint.y = xfB.position.y + xfB.rotation.col1.y * v.x + xfB.rotation.col2.y * v.y;
      var clipPoint = this.pool4;
      for (var i = (0);
       i < manifold.pointCount; ++i) {
        clipPoint.x = xfA.position.x + xfA.rotation.col1.x * manifold.points[i].localPoint.x + xfA.rotation.col2.x * manifold.points[i].localPoint.y;
        clipPoint.y = xfA.position.y + xfA.rotation.col1.y * manifold.points[i].localPoint.x + xfA.rotation.col2.y * manifold.points[i].localPoint.y;
        var scalar = radiusB - ((clipPoint.x - planePoint.x) * this.normal.x + (clipPoint.y - planePoint.y) * this.normal.y);
        var cBx = this.normal.x * scalar + clipPoint.x;
        var cBy = this.normal.y * scalar + clipPoint.y;
        var cAx = -this.normal.x * radiusA + clipPoint.x;
        var cAy = -this.normal.y * radiusA + clipPoint.y;
        this.points[i].x = (cAx + cBx) * (0.5);
        this.points[i].y = (cAy + cBy) * (0.5);
      }
      this.normal.x = -this.normal.x;
      this.normal.y = -this.normal.y;
      break;

  }
}
// ********** Code for BroadPhase **************
function BroadPhase() {
  this._pairCapacity = (16);
  this._pairCount = (0);
  this.proxyCount = (0);
  this._tree = new DynamicTree();
  this.queryProxy = null;
  this.moveBuffer = new Array((16));
  this._pairBuffer = new Array(this._pairCapacity);
  for (var i = (0);
   i < this._pairCapacity; ++i) this._pairBuffer.$setindex(i, new Pair());
}
BroadPhase.prototype.createProxy = function(box, userData) {
  var node = this._tree.createProxy(box, userData);
  ++this.proxyCount;
  this._bufferMove(node);
  return node;
}
BroadPhase.prototype.moveProxy = function(proxy, box, displacement) {
  if (this._tree.moveProxy(proxy, box, displacement)) this._bufferMove(proxy);
}
BroadPhase.prototype.testOverlap = function(proxyA, proxyB) {
  var a = proxyA.box;
  var b = proxyB.box;
  return AxisAlignedBox.testOverlap(a, b);
}
BroadPhase.prototype.updatePairs = function(callback) {
  this._pairCount = (0);
  for (var i = (0);
   i < this.moveBuffer.get$length(); ++i) {
    this.queryProxy = this.moveBuffer[i];
    if (this.queryProxy == null) continue;
    this._tree.query(this, this.queryProxy.box);
  }
  this.moveBuffer = new Array((16));
  var pairBuffer = ListFactory.ListFactory$from$factory(this._pairBuffer.getRange((0), this._pairCount));
  pairBuffer.sort((function (a, b) {
    return a.compareTo(b);
  })
  );
  this._pairBuffer.setRange$3((0), this._pairCount, pairBuffer);
  var i = (0);
  while (i < this._pairCount) {
    var primaryPair = this._pairBuffer[i];
    var userDataA = primaryPair.proxyA.userData;
    var userDataB = primaryPair.proxyB.userData;
    callback.addPair(userDataA, userDataB);
    ++i;
    while (i < this._pairCount) {
      var pair = this._pairBuffer[i];
      if (pair.proxyA != primaryPair.proxyA || pair.proxyB != primaryPair.proxyB) {
        break;
      }
      ++i;
    }
  }
  this._tree.rebalance((4));
}
BroadPhase.prototype.treeCallback = function(proxy) {
  if ($eq(proxy, this.queryProxy)) return true;
  if (this._pairCount == this._pairCapacity) {
    var oldBuffer = this._pairBuffer;
    this._pairCapacity = this._pairCapacity * (2);
    this._pairBuffer = new Array(this._pairCapacity);
    for (var i = (0);
     i < oldBuffer.get$length(); ++i) this._pairBuffer.$setindex(i, oldBuffer[i]);
    for (var i = oldBuffer.get$length();
     i < this._pairCapacity; ++i) this._pairBuffer.$setindex(i, new Pair());
  }
  if (proxy.key < this.queryProxy.key) {
    this._pairBuffer[this._pairCount].proxyA = proxy;
    this._pairBuffer[this._pairCount].proxyB = this.queryProxy;
  }
  else {
    this._pairBuffer[this._pairCount].proxyA = this.queryProxy;
    this._pairBuffer[this._pairCount].proxyB = proxy;
  }
  ++this._pairCount;
  return true;
}
BroadPhase.prototype._bufferMove = function(node) {
  this.moveBuffer.add(node);
}
// ********** Code for DynamicTree **************
function DynamicTree() {
  this._path = (0);
  this.deltaOne = new Vector((0), (0));
  this._nodeCount = (0);
  this._lastLeaf = null;
  this._drawVectors = new Array((4));
  this.center = new Vector((0), (0));
  this._tempVector = new Vector((0), (0));
  this._nodeStack = new DoubleLinkedQueue_DynamicTreeNode();
  this._root = null;
  this._insertionCount = (0);
  this._tempBox = new AxisAlignedBox();
  this.deltaTwo = new Vector((0), (0));
  this._nodeCounter = (0);
  for (var i = (0);
   i < this._drawVectors.get$length(); ++i) this._drawVectors.$setindex(i, new Vector((0), (0)));
}
DynamicTree.prototype.get$center = function() { return this.center; };
DynamicTree.prototype.createProxy = function(box, userData) {
  var proxy = this._allocateNode();
  proxy.box.lowerBound.x = box.lowerBound.x - (0.1);
  proxy.box.lowerBound.y = box.lowerBound.y - (0.1);
  proxy.box.upperBound.x = box.upperBound.x + (0.1);
  proxy.box.upperBound.y = box.upperBound.y + (0.1);
  proxy.userData = userData;
  this._insertLeaf(proxy);
  var iterationCount = this._nodeCount >> (4);
  var tryCount = (0);
  var height = this.computeHeightFromRoot();
  while (height > (64) && tryCount < (10)) {
    this.rebalance(iterationCount);
    height = this.computeHeightFromRoot();
    ++tryCount;
  }
  return proxy;
}
DynamicTree.prototype.moveProxy = function(argProxy, argBox, displacement) {
  var $0, $1, $2, $3, $4, $5, $6, $7;
  if (argProxy.box.contains(argBox)) return false;
  this._removeLeaf(argProxy);
  ($0 = argBox.lowerBound).x = $0.x - (0.1);
  ($1 = argBox.lowerBound).y = $1.y - (0.1);
  ($2 = argBox.upperBound).x = $2.x + (0.1);
  ($3 = argBox.upperBound).y = $3.y + (0.1);
  this._tempVector.setFrom(displacement);
  this._tempVector.mulLocal((2));
  if (this._tempVector.x < (0)) ($4 = argBox.lowerBound).x = $4.x + this._tempVector.x;
  else ($5 = argBox.upperBound).x = $5.x + this._tempVector.x;
  if (this._tempVector.y < (0)) ($6 = argBox.lowerBound).y = $6.y + this._tempVector.y;
  else ($7 = argBox.upperBound).y = $7.y + this._tempVector.y;
  argProxy.box.setFrom(argBox);
  this._insertLeaf(argProxy);
  return true;
}
DynamicTree.prototype._allocateNode = function() {
  if (this._nodeStack.isEmpty()) {
    for (var i = (0);
     i < (6); ++i) this._nodeStack.addFirst(new DynamicTreeNode._construct$ctor());
  }
  var node = this._nodeStack.removeFirst();
  node.parent = null;
  node.childOne = null;
  node.childTwo = null;
  node.userData = null;
  node.key = this._nodeCounter;
  ++this._nodeCounter;
  ++this._nodeCount;
  return node;
}
DynamicTree.prototype.query = function(callback, argBox) {
  this._query(callback, argBox, this._root, (1));
}
DynamicTree.prototype._query = function(callback, argBox, node, count) {
  if (node == null) return true;
  if (AxisAlignedBox.testOverlap(argBox, node.box)) {
    if (node.get$isLeaf()) {
      if (!callback.treeCallback(node)) return false;
    }
    else {
      if (count < (64)) {
        ++count;
        if (!this._query(callback, argBox, node.childOne, count)) return false;
      }
      if (count < (64)) {
        ++count;
        if (!this._query(callback, argBox, node.childTwo, count)) return false;
      }
    }
  }
  return true;
}
DynamicTree.prototype._insertLeaf = function(node) {
  ++this._insertionCount;
  if (this._root == null) {
    this._root = node;
    node.parent = null;
    return;
  }
  this.center.setFrom(node.box.get$center());
  var sibling = this._root;
  var childOne, childTwo;
  if (!sibling.get$isLeaf()) {
    do {
      childOne = sibling.childOne;
      childTwo = sibling.childTwo;
      this.deltaOne.setFrom(childOne.box.get$center());
      this.deltaTwo.setFrom(childTwo.box.get$center());
      this.deltaOne.subLocal(this.center).absLocal();
      this.deltaTwo.subLocal(this.center).absLocal();
      var normOne = this.deltaOne.x + this.deltaOne.y;
      var normTwo = this.deltaTwo.x + this.deltaTwo.y;
      sibling = (normOne < normTwo ? childOne : childTwo);
    }
    while ($eq(sibling.get$isLeaf(), false))
  }
  var node1 = sibling.parent;
  var node2 = this._allocateNode();
  node2.parent = node1;
  node2.userData = null;
  node2.box.setFromCombination(node.box, sibling.box);
  if (node1 != null) {
    if (sibling.parent.childOne == sibling) node1.childOne = node2;
    else node1.childTwo = node2;
    node2.childOne = sibling;
    node2.childTwo = node;
    sibling.parent = node2;
    node.parent = node2;
    do {
      if (node1.box.contains(node2.box)) break;
      node1.box.setFromCombination(node1.childOne.box, node1.childTwo.box);
      node2 = node1;
      node1 = node1.parent;
    }
    while (node1 != null)
  }
  else {
    node2.childOne = sibling;
    node2.childTwo = node;
    sibling.parent = node2;
    node.parent = node2;
    this._root = node2;
  }
}
DynamicTree.prototype._removeLeaf = function(argNode) {
  if (argNode == this._root) {
    this._root = null;
    if (this._lastLeaf == argNode) {
      this._lastLeaf = null;
    }
    return;
  }
  var node2 = argNode.parent;
  var node1 = node2.parent;
  var sibling;
  sibling = (node2.childOne == argNode ? node2.childTwo : node2.childOne);
  if (node1 != null) {
    if (node1.childOne == node2) node1.childOne = sibling;
    else node1.childTwo = sibling;
    sibling.parent = node1;
    this._freeNode(node2);
    while (node1 != null) {
      this._tempBox.setFrom(node1.box);
      node1.box.setFromCombination(node1.childOne.box, node1.childTwo.box);
      if (this._tempBox.contains(node1.box)) {
        break;
      }
      node1 = node1.parent;
    }
  }
  else {
    this._root = sibling;
    sibling.parent = null;
    this._freeNode(node2);
  }
  if (this._lastLeaf == argNode) {
    this._lastLeaf = this._root;
  }
}
DynamicTree.prototype.computeHeightFromRoot = function() {
  return this._computeHeight(this._root);
}
DynamicTree.prototype._computeHeight = function(node) {
  if (node == null) return (0);
  var heightOne = this._computeHeight(node.childOne);
  var heightTwo = this._computeHeight(node.childTwo);
  return (1) + Math.max(heightOne, heightTwo);
}
DynamicTree.prototype.rebalance = function(iterations) {
  if (this._root == null) return;
  var current;
  for (var i = (0);
   i < iterations; ++i) {
    current = this._root;
    var bit = (0);
    while (!current.get$isLeaf()) {
      var goLeft = (this._path >> bit) & (1);
      current = (goLeft == (0) ? current.childOne : current.childTwo);
      bit = (bit + (1)) & (31);
    }
    ++this._path;
    this._removeLeaf(current);
    this._insertLeaf(current);
  }
}
DynamicTree.prototype._freeNode = function(node) {
  this._nodeStack.addFirst(node);
  --this._nodeCount;
}
// ********** Code for DynamicTreeNode **************
DynamicTreeNode._construct$ctor = function() {
  this.childOne = null;
  this.next = null;
  this.parent = null;
  this.childTwo = null;
  this.box = new AxisAlignedBox();
}
DynamicTreeNode._construct$ctor.prototype = DynamicTreeNode.prototype;
function DynamicTreeNode() {}
DynamicTreeNode.prototype.get$isLeaf = function() {
  return this.childOne == null;
}
DynamicTreeNode.prototype.toString = function() {
  return this.box.toString();
}
// ********** Code for Pair **************
function Pair() {
  this.proxyA = null;
  this.proxyB = null;
}
Pair.prototype.compareTo = function(pair2) {
  if (this.proxyA.key < pair2.proxyA.key) return (-1);
  if (this.proxyA.key == pair2.proxyA.key) {
    return (this.proxyB.key < pair2.proxyB.key) ? (-1) : (this.proxyB.key == pair2.proxyB.key) ? (0) : (1);
  }
  return (1);
}
// ********** Code for Shape **************
function Shape(type, radius) {
  this.type = type;
  this.radius = radius;
}
Shape.prototype.get$type = function() { return this.type; };
Shape.prototype.set$type = function(value) { return this.type = value; };
Shape.prototype.get$radius = function() { return this.radius; };
Shape.prototype.set$radius = function(value) { return this.radius = value; };
// ********** Code for CircleShape **************
$inherits(CircleShape, Shape);
function CircleShape() {
  this.position = new Vector((0), (0));
  Shape.call(this, (0), (0));
}
CircleShape.copy$ctor = function(other) {
  this.position = new Vector.copy$ctor(other.position);
  Shape.call(this, other.type, other.radius);
}
CircleShape.copy$ctor.prototype = CircleShape.prototype;
CircleShape.prototype.get$position = function() { return this.position; };
CircleShape.prototype.computeAxisAlignedBox = function(argBox, argTransform) {
  var p = new Vector((0), (0));
  Matrix22.mulMatrixAndVectorToOut(argTransform.rotation, this.position, p);
  p.addLocal(argTransform.position);
  argBox.lowerBound.setCoords(p.x - this.radius, p.y - this.radius);
  argBox.upperBound.setCoords(p.x + this.radius, p.y + this.radius);
}
CircleShape.prototype.clone = function() {
  return new CircleShape.copy$ctor(this);
}
CircleShape.prototype.computeMass = function(massData, density) {
  massData.mass = density * (3.141592653589793) * this.radius * this.radius;
  massData.center.setFrom(this.position);
  massData.inertia = massData.mass * ((0.5) * this.radius * this.radius + Vector.dot(this.position, this.position));
}
// ********** Code for MassData **************
function MassData() {
  this.center = new Vector((0), (0));
  this.mass = (0);
  this.inertia = (0);
}
MassData.prototype.get$center = function() { return this.center; };
MassData.prototype.set$center = function(value) { return this.center = value; };
MassData.prototype.setFrom = function(md) {
  this.mass = md.mass;
  this.inertia = md.inertia;
  this.center.setFrom(md.center);
}
MassData.prototype.setFrom$1 = MassData.prototype.setFrom;
// ********** Code for PolygonShape **************
$inherits(PolygonShape, Shape);
function PolygonShape() {
  this.centroid = new Vector((0), (0));
  this.vertexCount = (0);
  this.vertices = new Array((8));
  this.normals = new Array((8));
  Shape.call(this, (1), (0.01));
  for (var i = (0);
   i < this.vertices.get$length(); ++i) this.vertices.$setindex(i, new Vector((0), (0)));
  for (var i = (0);
   i < this.normals.get$length(); ++i) this.normals.$setindex(i, new Vector((0), (0)));
}
PolygonShape.copy$ctor = function(other) {
  this.centroid = new Vector.copy$ctor(other.centroid);
  this.vertexCount = other.vertexCount;
  this.vertices = new Array((8));
  this.normals = new Array((8));
  Shape.call(this, (1), other.radius);
  for (var i = (0);
   i < other.vertices.get$length(); ++i) this.vertices.$setindex(i, new Vector.copy$ctor(other.vertices[i]));
  for (var i = (0);
   i < other.normals.get$length(); ++i) this.normals.$setindex(i, new Vector.copy$ctor(other.normals[i]));
}
PolygonShape.copy$ctor.prototype = PolygonShape.prototype;
PolygonShape.prototype.get$vertices = function() { return this.vertices; };
PolygonShape.prototype.get$vertexCount = function() { return this.vertexCount; };
PolygonShape.prototype.set$vertexCount = function(value) { return this.vertexCount = value; };
PolygonShape.prototype.clone = function() {
  return new PolygonShape.copy$ctor(this);
}
PolygonShape.prototype.setAsBox = function(hx, hy) {
  this.vertexCount = (4);
  this.vertices[(0)].setCoords(-hx, -hy);
  this.vertices[(1)].setCoords(hx, -hy);
  this.vertices[(2)].setCoords(hx, hy);
  this.vertices[(3)].setCoords(-hx, hy);
  this.normals[(0)].setCoords((0), (-1));
  this.normals[(1)].setCoords((1), (0));
  this.normals[(2)].setCoords((0), (1));
  this.normals[(3)].setCoords((-1), (0));
  this.centroid.setZero();
}
PolygonShape.prototype.setAsEdge = function(v1, v2) {
  this.vertexCount = (2);
  this.vertices[(0)].setFrom(v1);
  this.vertices[(1)].setFrom(v2);
  this.centroid.setFrom(v1).addLocal(v2).mulLocal((0.5));
  this.normals[(0)].setFrom(v2).subLocal(v1);
  Vector.crossVectorAndNumToOut(this.normals[(0)], (1), this.normals[(0)]);
  this.normals[(0)].normalize();
  this.normals[(1)].setFrom(this.normals[(0)]).negateLocal();
}
PolygonShape.prototype.computeAxisAlignedBox = function(argAabb, argXf) {
  var lower = new Vector((0), (0));
  var upper = new Vector((0), (0));
  var v = new Vector((0), (0));
  Transform.mulToOut(argXf, this.vertices[(0)], lower);
  upper.setFrom(lower);
  for (var i = (1);
   i < this.vertexCount; ++i) {
    Transform.mulToOut(argXf, this.vertices[i], v);
    Vector.minToOut(lower, v, lower);
    Vector.maxToOut(upper, v, upper);
  }
  argAabb.lowerBound.x = lower.x - this.radius;
  argAabb.lowerBound.y = lower.y - this.radius;
  argAabb.upperBound.x = upper.x + this.radius;
  argAabb.upperBound.y = upper.y + this.radius;
}
PolygonShape.prototype.computeMass = function(massData, density) {
  if (this.vertexCount == (2)) {
    massData.center.setFrom(this.vertices[(0)]).addLocal(this.vertices[(1)]).mulLocal((0.5));
    massData.mass = (0);
    massData.inertia = (0);
    return;
  }
  var center = new Vector((0), (0));
  center.setZero();
  var area = (0);
  var I = (0);
  var pRef = new Vector((0), (0));
  pRef.setZero();
  var k_inv3 = (0.3333333333333333);
  var e1 = new Vector((0), (0));
  var e2 = new Vector((0), (0));
  for (var i = (0);
   i < this.vertexCount; ++i) {
    var p1 = pRef;
    var p2 = this.vertices[i];
    var p3 = i + (1) < this.vertexCount ? this.vertices[i + (1)] : this.vertices[(0)];
    e1.setFrom(p2);
    e1.subLocal(p1);
    e2.setFrom(p3);
    e2.subLocal(p1);
    var D = Vector.crossVectors(e1, e2);
    var triangleArea = (0.5) * D;
    area += triangleArea;
    center.x = center.x + (triangleArea * k_inv3 * (p1.x + p2.x + p3.x));
    center.y = center.y + (triangleArea * k_inv3 * (p1.y + p2.y + p3.y));
    var px = p1.x;
    var py = p1.y;
    var ex1 = e1.x;
    var ey1 = e1.y;
    var ex2 = e2.x;
    var ey2 = e2.y;
    var intx2 = k_inv3 * ((0.25) * (ex1 * ex1 + ex2 * ex1 + ex2 * ex2) + (px * ex1 + px * ex2)) + (0.5) * px * px;
    var inty2 = k_inv3 * ((0.25) * (ey1 * ey1 + ey2 * ey1 + ey2 * ey2) + (py * ey1 + py * ey2)) + (0.5) * py * py;
    I += (D * (intx2 + inty2));
  }
  massData.mass = density * area;
  center.mulLocal((1) / area);
  massData.center.setFrom(center);
  massData.inertia = I * density;
}
// ********** Code for ShapeType **************
function ShapeType() {}
// ********** Code for DebugDraw **************
function DebugDraw(viewport) {
  this.viewportTransform = viewport;
  this.drawFlags = (1);
}
DebugDraw.prototype.drawPolygon = function(vertices, vertexCount, color) {
  if (vertexCount == (1)) {
    this.drawSegment(vertices[(0)], vertices[(0)], color);
    return;
  }
  for (var i = (0);
   i < vertexCount - (1); ++i) this.drawSegment(vertices[i], vertices[i + (1)], color);
  if (vertexCount > (2)) this.drawSegment(vertices[vertexCount - (1)], vertices[(0)], color);
}
DebugDraw.prototype.getWorldToScreenToOut = function(argWorld, argScreen) {
  this.viewportTransform.getWorldToScreen(argWorld, argScreen);
}
// ********** Code for CanvasDraw **************
$inherits(CanvasDraw, DebugDraw);
function CanvasDraw(viewport, ctx) {
  this.ctx = ctx;
  DebugDraw.call(this, viewport);
}
CanvasDraw.prototype.drawPolygon = function(vertices, vertexCount, color) {
  if (vertexCount == (1)) {
    this.drawSegment(vertices[(0)], vertices[(0)], color);
    return;
  }
  for (var i = (0);
   i < vertexCount - (1); ++i) this.drawSegment(vertices[i], vertices[i + (1)], color);
  if (vertexCount > (2)) this.drawSegment(vertices[vertexCount - (1)], vertices[(0)], color);
}
CanvasDraw.prototype.drawSolidPolygon = function(vertices, vertexCount, color) {
  this.set$_color(color);
  for (var i = (0);
   i < vertexCount; ++i) this.getWorldToScreenToOut(vertices[i], vertices[i]);
  this.ctx.beginPath();
  this.ctx.moveTo(vertices[(0)].x, vertices[(0)].y);
  for (var i = (1);
   i < vertexCount; ++i) this.ctx.lineTo(vertices[i].x, vertices[i].y);
  this.ctx.lineTo(vertices[(0)].x, vertices[(0)].y);
  this.ctx.closePath();
  this.ctx.fill();
}
CanvasDraw.prototype.drawSolidCircle = function(center, radius, axis, color) {
  this.set$_color(color);
  this.getWorldToScreenToOut(center, center);
  radius *= this.viewportTransform.scale;
  this.ctx.beginPath();
  this.ctx.arc(center.x, center.y, radius, (0), (6.283185307179586), true);
  this.ctx.closePath();
  this.ctx.fill();
}
CanvasDraw.prototype.drawSegment = function(p1, p2, color) {
  this.set$_color(color);
  this.getWorldToScreenToOut(p1, p1);
  this.getWorldToScreenToOut(p2, p2);
  this.ctx.beginPath();
  this.ctx.moveTo(p1.x, p1.y);
  this.ctx.lineTo(p2.x, p2.y);
  this.ctx.closePath();
  this.ctx.stroke();
}
CanvasDraw.prototype.drawTransform = function(xf) {
  $throw(new NotImplementedException());
}
CanvasDraw.prototype.set$_color = function(color) {
  var red = (color.x * (255)).round().toInt();
  var green = (color.y * (255)).round().toInt();
  var blue = (color.z * (255)).round().toInt();
  var colorString = new StringBufferImpl("#");
  var redString = red.toRadixString((16));
  var greenString = green.toRadixString((16));
  var blueString = blue.toRadixString((16));
  colorString.add$1(redString);
  colorString.add$1(greenString);
  colorString.add$1(blueString);
  this.ctx.setStrokeColor(colorString.toString());
  this.ctx.setFillColor(colorString.toString());
}
// ********** Code for ContactFilter **************
function ContactFilter() {

}
ContactFilter.prototype.shouldCollide = function(fixtureA, fixtureB) {
  var filterA = fixtureA.filter;
  var filterB = fixtureB.filter;
  if (filterA.groupIndex != (0) && filterA.groupIndex == filterB.groupIndex) return filterA.groupIndex > (0);
  return (filterA.maskBits & filterB.categoryBits) != (0) && (filterA.categoryBits & filterB.maskBits) != (0);
}
// ********** Code for ContactImpulse **************
function ContactImpulse() {
  this.tangentImpulses = new Array((2));
  this.normalImpulses = new Array((2));
}
// ********** Code for Body **************
function Body(bd, world) {
  this._angularVelocity = (0);
  this.prev = null;
  this._force = new Vector((0), (0));
  this._linearVelocity = new Vector.copy$ctor(bd.linearVelocity);
  this._torque = (0);
  this._inertia = (0);
  this.sweep = new Sweep();
  this.oldCenter = new Vector((0), (0));
  this.fixtureCount = (0);
  this._pmd = new MassData();
  this.originTransform = new Transform();
  this.invInertia = (0);
  this.flags = (0);
  this.userData = bd.userData;
  this.sleepTime = (0);
  this.world = world;
  this.fixtureList = null;
  this.jointList = null;
  this.tempCenter = new Vector((0), (0));
  this._fixDef = new FixtureDef();
  this.next = null;
  this._pxf = new Transform();
  this.contactList = null;
  this._type = bd.type;
  this.angularDamping = bd.angularDamping;
  this.linearDamping = bd.linearDamping;
  if (bd.bullet) {
    this.flags = this.flags | (8);
  }
  if (bd.fixedRotation) {
    this.flags = this.flags | (16);
  }
  if (bd.allowSleep) {
    this.flags = this.flags | (4);
  }
  if (bd.awake) {
    this.flags = this.flags | (2);
  }
  if (bd.active) {
    this.flags = this.flags | (32);
  }
  this.originTransform.position.setFrom(bd.position);
  this.originTransform.rotation.setAngle(bd.angle);
  this.sweep.localCenter.setZero();
  Transform.mulToOut(this.originTransform, this.sweep.localCenter, this.sweep.centerZero);
  this.sweep.center.setFrom(this.sweep.centerZero);
  this.sweep.angle = bd.angle;
  this.sweep.angleZero = bd.angle;
  if (this._type == (2)) {
    this.mass = (1);
    this.invMass = (1);
  }
  else {
    this.mass = (0);
    this.invMass = (0);
  }
}
Body.prototype.get$invMass = function() { return this.invMass; };
Body.prototype.set$invMass = function(value) { return this.invMass = value; };
Body.prototype.get$invInertia = function() { return this.invInertia; };
Body.prototype.set$invInertia = function(value) { return this.invInertia = value; };
Body.prototype.get$originTransform = function() { return this.originTransform; };
Body.prototype.get$sweep = function() { return this.sweep; };
Body.prototype.createFixture = function(def) {
  var $0;
  var fixture = new Fixture();
  fixture.create(this, def);
  if ((this.flags & (32)) == (32)) {
    var broadPhase = this.world._contactManager.broadPhase;
    fixture.createProxy(broadPhase, this.originTransform);
  }
  fixture.next = this.fixtureList;
  this.fixtureList = fixture;
  ++this.fixtureCount;
  fixture.body = this;
  if (fixture.density > (0)) {
    this.resetMassData();
  }
  ($0 = this.world)._flags = $0._flags | (1);
  return fixture;
}
Body.prototype.createFixtureFromShape = function(shape, density) {
  this._fixDef.shape = shape;
  this._fixDef.density = density;
  return this.createFixture(this._fixDef);
}
Body.prototype.get$position = function() {
  return this.originTransform.position;
}
Body.prototype.get$angle = function() {
  return this.sweep.angle;
}
Body.prototype.get$worldCenter = function() {
  return this.sweep.center;
}
Body.prototype.get$localCenter = function() {
  return this.sweep.localCenter;
}
Body.prototype.get$linearVelocity = function() {
  return this._linearVelocity;
}
Body.prototype.get$angularVelocity = function() {
  return this._angularVelocity;
}
Body.prototype.set$angularVelocity = function(w) {
  if (this._type != (0)) {
    if (w * w > (0)) {
      this.set$awake(true);
    }
    this._angularVelocity = w;
  }
}
Body.prototype.resetMassData = function() {
  this.mass = (0);
  this.invMass = (0);
  this._inertia = (0);
  this.invInertia = (0);
  this.sweep.localCenter.setZero();
  if (this._type == (0) || this._type == (1)) {
    this.sweep.center.setFrom(this.originTransform.position);
    this.sweep.centerZero.setFrom(this.originTransform.position);
    return;
  }
  this.tempCenter.setZero();
  var massData = this._pmd;
  for (var f = this.fixtureList;
   f != null; f = f.next) {
    if (f.density == (0)) {
      continue;
    }
    f.getMassData(massData);
    this.mass = this.mass + massData.mass;
    var temp = new Vector.copy$ctor(massData.center);
    temp.mulLocal(massData.mass);
    this.tempCenter.addLocal(temp);
    this._inertia = this._inertia + massData.inertia;
  }
  if (this.mass > (0)) {
    this.invMass = (1) / this.mass;
    this.tempCenter.mulLocal(this.invMass);
  }
  else {
    this.mass = (1);
    this.invMass = (1);
  }
  if (this._inertia > (0) && (this.flags & (16)) == (0)) {
    this._inertia = this._inertia - (this.mass * Vector.dot(this.tempCenter, this.tempCenter));
    this.invInertia = (1) / this._inertia;
  }
  else {
    this._inertia = (0);
    this.invInertia = (0);
  }
  this.oldCenter.setFrom(this.sweep.center);
  this.sweep.localCenter.setFrom(this.tempCenter);
  Transform.mulToOut(this.originTransform, this.sweep.localCenter, this.sweep.centerZero);
  this.sweep.center.setFrom(this.sweep.centerZero);
  var temp = new Vector.copy$ctor(this.sweep.center);
  temp.subLocal(this.oldCenter);
  Vector.crossNumAndVectorToOut(this._angularVelocity, temp, temp);
  this._linearVelocity.addLocal(temp);
}
Body.prototype.getWorldPoint = function(localPoint) {
  var v = new Vector((0), (0));
  this.getWorldPointToOut(localPoint, v);
  return v;
}
Body.prototype.getWorldPointToOut = function(localPoint, out) {
  Transform.mulToOut(this.originTransform, localPoint, out);
}
Body.prototype.getWorldVector = function(localVector) {
  var out = new Vector((0), (0));
  this.getWorldVectorToOut(localVector, out);
  return out;
}
Body.prototype.getWorldVectorToOut = function(localVector, out) {
  Matrix22.mulMatrixAndVectorToOut(this.originTransform.rotation, localVector, out);
}
Body.prototype.getLocalPointToOut = function(worldPoint, out) {
  Transform.mulTransToOut(this.originTransform, worldPoint, out);
}
Body.prototype.getLocalPoint = function(worldPoint) {
  var out = new Vector((0), (0));
  this.getLocalPointToOut(worldPoint, out);
  return out;
}
Body.prototype.get$type = function() {
  return this._type;
}
Body.prototype.set$type = function(otherType) {
  if (this._type == otherType) {
    return;
  }
  this._type = otherType;
  this.resetMassData();
  if (this._type == (0)) {
    this._linearVelocity.setZero();
    this._angularVelocity = (0);
  }
  this.set$awake(true);
  this._force.setZero();
  this._torque = (0);
  for (var ce = this.contactList;
   ce != null; ce = ce.next) {
    ce.contact.flagForFiltering();
  }
}
Body.prototype.get$bullet = function() {
  return (this.flags & (8)) == (8);
}
Body.prototype.set$bullet = function(flag) {
  if (flag) this.flags = this.flags | (8);
  else this.flags = this.flags & (-9);
}
Body.prototype.get$awake = function() {
  return (this.flags & (2)) == (2);
}
Body.prototype.set$awake = function(flag) {
  if (flag) {
    if ((this.flags & (2)) == (0)) {
      this.flags = this.flags | (2);
      this.sleepTime = (0);
    }
  }
  else {
    this.flags = this.flags & (-3);
    this.sleepTime = (0);
    this._linearVelocity.setZero();
    this._angularVelocity = (0);
    this._force.setZero();
    this._torque = (0);
  }
}
Body.prototype.get$active = function() {
  return (this.flags & (32)) == (32);
}
Body.prototype.synchronizeFixtures = function() {
  var xf1 = this._pxf;
  xf1.rotation.setAngle(this.sweep.angleZero);
  Matrix22.mulMatrixAndVectorToOut(xf1.rotation, this.sweep.localCenter, xf1.position);
  xf1.position.mulLocal((-1));
  xf1.position.addLocal(this.sweep.centerZero);
  var broadPhase = this.world._contactManager.broadPhase;
  for (var f = this.fixtureList;
   f != null; f = f.next) f.synchronize(broadPhase, xf1, this.originTransform);
}
Body.prototype.synchronizeTransform = function() {
  var c = Math.cos(this.sweep.angle);
  var s = Math.sin(this.sweep.angle);
  var t = this.originTransform;
  var r = t.rotation;
  var p = t.position;
  r.col1.x = c;
  r.col2.x = -s;
  r.col1.y = s;
  r.col2.y = c;
  p.x = (r.col1.x * this.sweep.localCenter.x + r.col2.x * this.sweep.localCenter.y) * (-1) + this.sweep.center.x;
  p.y = (r.col1.y * this.sweep.localCenter.x + r.col2.y * this.sweep.localCenter.y) * (-1) + this.sweep.center.y;
}
Body.prototype.shouldCollide = function(other) {
  return !(this._type != (2) && other._type != (2));
}
Body.prototype.advance = function(t) {
  this.sweep.advance(t);
  this.sweep.center.setFrom(this.sweep.centerZero);
  this.sweep.angle = this.sweep.angleZero;
  this.synchronizeTransform();
}
Body.prototype.createFixtureFromShape$1 = function($0) {
  return this.createFixtureFromShape($0, (0));
};
// ********** Code for BodyDef **************
function BodyDef() {
  this.linearVelocity = new Vector((0), (0));
  this.bullet = false;
  this.allowSleep = true;
  this.active = true;
  this.angularVelocity = (0);
  this.angularDamping = (0);
  this.linearDamping = (0);
  this.userData = null;
  this.awake = true;
  this.angle = (0);
  this.position = new Vector((0), (0));
  this.fixedRotation = false;
  this.type = (0);
}
BodyDef.prototype.get$type = function() { return this.type; };
BodyDef.prototype.set$type = function(value) { return this.type = value; };
BodyDef.prototype.get$angle = function() { return this.angle; };
BodyDef.prototype.set$angle = function(value) { return this.angle = value; };
BodyDef.prototype.get$position = function() { return this.position; };
BodyDef.prototype.set$position = function(value) { return this.position = value; };
BodyDef.prototype.get$bullet = function() { return this.bullet; };
BodyDef.prototype.set$bullet = function(value) { return this.bullet = value; };
// ********** Code for BodyType **************
function BodyType() {}
// ********** Code for ContactManager **************
function ContactManager(argPool) {
  this.contactCount = (0);
  this.contactList = null;
  this.pool = argPool;
  this.broadPhase = new BroadPhase();
  this.contactFilter = new ContactFilter();
  this.contactListener = null;
}
ContactManager.prototype.addPair = function(fixtureA, fixtureB) {
  var bodyA = fixtureA.body;
  var bodyB = fixtureB.body;
  if (bodyA == bodyB) {
    return;
  }
  var edge = bodyB.contactList;
  while (edge != null) {
    if ($eq(edge.other, bodyA)) {
      var fA = edge.contact.fixtureA;
      var fB = edge.contact.fixtureB;
      if ($eq(fA, fixtureA) && $eq(fB, fixtureB)) {
        return;
      }
      if ($eq(fA, fixtureB) && $eq(fB, fixtureA)) {
        return;
      }
    }
    edge = edge.next;
  }
  if ($eq(bodyB.shouldCollide(bodyA), false)) {
    return;
  }
  if (this.contactFilter != null && $eq(this.contactFilter.shouldCollide(fixtureA, fixtureB), false)) {
    return;
  }
  var c = this.pool.popContact(fixtureA, fixtureB);
  fixtureA = c.fixtureA;
  fixtureB = c.fixtureB;
  bodyA = fixtureA.body;
  bodyB = fixtureB.body;
  c.prev = null;
  c.next = this.contactList;
  if (this.contactList != null) {
    this.contactList.prev = c;
  }
  this.contactList = c;
  c.edge1.contact = c;
  c.edge1.other = bodyB;
  c.edge1.prev = null;
  c.edge1.next = bodyA.contactList;
  if (bodyA.contactList != null) {
    bodyA.contactList.prev = c.edge1;
  }
  bodyA.contactList = c.edge1;
  c.edge2.contact = c;
  c.edge2.other = bodyA;
  c.edge2.prev = null;
  c.edge2.next = bodyB.contactList;
  if (bodyB.contactList != null) bodyB.contactList.prev = c.edge2;
  bodyB.contactList = c.edge2;
  ++this.contactCount;
}
ContactManager.prototype.findNewContacts = function() {
  this.broadPhase.updatePairs(this);
}
ContactManager.prototype.destroy = function(c) {
  var fixtureA = c.fixtureA;
  var fixtureB = c.fixtureB;
  var bodyA = fixtureA.body;
  var bodyB = fixtureB.body;
  if (this.contactListener != null && c.get$touching()) {
    this.contactListener.noSuchMethod("endContact", [c]);
  }
  if (c.prev != null) c.prev.next = c.next;
  if (c.next != null) c.next.prev = c.prev;
  if ($eq(c, this.contactList)) this.contactList = c.next;
  if (c.edge1.prev != null) c.edge1.prev.next = c.edge1.next;
  if (c.edge1.next != null) c.edge1.next.prev = c.edge1.prev;
  if ($eq(c.edge1, bodyA.contactList)) bodyA.contactList = c.edge1.next;
  if (c.edge2.prev != null) c.edge2.prev.next = c.edge2.next;
  if (c.edge2.next != null) c.edge2.next.prev = c.edge2.prev;
  if ($eq(c.edge2, bodyB.contactList)) bodyB.contactList = c.edge2.next;
  this.pool.pushContact(c);
  --this.contactCount;
}
ContactManager.prototype.collide = function() {
  var c = this.contactList;
  while (c != null) {
    var fixtureA = c.fixtureA;
    var fixtureB = c.fixtureB;
    var bodyA = fixtureA.body;
    var bodyB = fixtureB.body;
    if ($eq(bodyA.get$awake(), false) && $eq(bodyB.get$awake(), false)) {
      c = c.next;
      continue;
    }
    if ((c.flags & (8)) == (8)) {
      if ($eq(bodyB.shouldCollide(bodyA), false)) {
        var cNuke = c;
        c = cNuke.next;
        this.destroy(cNuke);
        continue;
      }
      if (this.contactFilter != null && $eq(this.contactFilter.shouldCollide(fixtureA, fixtureB), false)) {
        var cNuke = c;
        c = cNuke.next;
        this.destroy(cNuke);
        continue;
      }
      c.flags = c.flags & (-9);
    }
    var proxyIdA = fixtureA.proxy;
    var proxyIdB = fixtureB.proxy;
    var overlap = this.broadPhase.testOverlap(proxyIdA, proxyIdB);
    if ($eq(overlap, false)) {
      var cNuke = c;
      c = cNuke.next;
      this.destroy(cNuke);
      continue;
    }
    c.update(this.contactListener);
    c = c.next;
  }
}
// ********** Code for Filter **************
function Filter() {
  this.maskBits = (0);
  this.groupIndex = (0);
  this.categoryBits = (0);
}
Filter.prototype.setFrom = function(other) {
  this.categoryBits = other.categoryBits;
  this.maskBits = other.maskBits;
  this.groupIndex = other.groupIndex;
}
Filter.prototype.setFrom$1 = Filter.prototype.setFrom;
// ********** Code for Fixture **************
function Fixture() {
  this.shape = null;
  this.filter = new Filter();
  this._poolTwo = new AxisAlignedBox();
  this.box = new AxisAlignedBox();
  this.next = null;
  this.proxy = null;
  this.body = null;
  this._poolOne = new AxisAlignedBox();
}
Fixture.prototype.get$density = function() { return this.density; };
Fixture.prototype.set$density = function(value) { return this.density = value; };
Fixture.prototype.get$body = function() { return this.body; };
Fixture.prototype.set$body = function(value) { return this.body = value; };
Fixture.prototype.get$shape = function() { return this.shape; };
Fixture.prototype.set$shape = function(value) { return this.shape = value; };
Fixture.prototype.get$friction = function() { return this.friction; };
Fixture.prototype.set$friction = function(value) { return this.friction = value; };
Fixture.prototype.get$restitution = function() { return this.restitution; };
Fixture.prototype.set$restitution = function(value) { return this.restitution = value; };
Fixture.prototype.create = function(b, def) {
  this.userData = def.userData;
  this.friction = def.friction;
  this.restitution = def.restitution;
  this.body = b;
  this.next = null;
  this.filter.setFrom(def.filter);
  this.isSensor = def.isSensor;
  this.shape = def.shape.clone();
  this.density = def.density;
}
Fixture.prototype.createProxy = function(broadPhase, xf) {
  this.shape.computeAxisAlignedBox(this.box, xf);
  this.proxy = broadPhase.createProxy(this.box, this);
}
Fixture.prototype.synchronize = function(broadPhase, transformOne, transformTwo) {
  if (this.proxy == null) {
    return;
  }
  this.shape.computeAxisAlignedBox(this._poolOne, transformOne);
  this.shape.computeAxisAlignedBox(this._poolTwo, transformTwo);
  this.box.lowerBound.x = this._poolOne.lowerBound.x < this._poolTwo.lowerBound.x ? this._poolOne.lowerBound.x : this._poolTwo.lowerBound.x;
  this.box.lowerBound.y = this._poolOne.lowerBound.y < this._poolTwo.lowerBound.y ? this._poolOne.lowerBound.y : this._poolTwo.lowerBound.y;
  this.box.upperBound.x = this._poolOne.upperBound.x > this._poolTwo.upperBound.x ? this._poolOne.upperBound.x : this._poolTwo.upperBound.x;
  this.box.upperBound.y = this._poolOne.upperBound.y > this._poolTwo.upperBound.y ? this._poolOne.upperBound.y : this._poolTwo.upperBound.y;
  var disp = this._poolOne.lowerBound;
  disp.x = transformTwo.position.x - transformOne.position.x;
  disp.y = transformTwo.position.y - transformOne.position.y;
  broadPhase.moveProxy(this.proxy, this.box, disp);
}
Fixture.prototype.getMassData = function(massData) {
  this.shape.computeMass(massData, this.density);
}
Fixture.prototype.get$type = function() {
  return this.shape.type;
}
// ********** Code for FixtureDef **************
function FixtureDef() {
  this.shape = null;
  this.friction = (0.2);
  this.restitution = (0);
  this.density = (0);
  this.isSensor = false;
  this.filter = new Filter();
  this.userData = null;
  this.filter.categoryBits = (1);
  this.filter.maskBits = (65535);
  this.filter.groupIndex = (0);
}
FixtureDef.prototype.get$shape = function() { return this.shape; };
FixtureDef.prototype.set$shape = function(value) { return this.shape = value; };
FixtureDef.prototype.get$friction = function() { return this.friction; };
FixtureDef.prototype.set$friction = function(value) { return this.friction = value; };
FixtureDef.prototype.get$restitution = function() { return this.restitution; };
FixtureDef.prototype.set$restitution = function(value) { return this.restitution = value; };
FixtureDef.prototype.get$density = function() { return this.density; };
FixtureDef.prototype.set$density = function(value) { return this.density = value; };
// ********** Code for Island **************
function Island() {
  this._translation = new Vector((0), (0));
  this.impulse = new ContactImpulse();
  this._contactSolver = new ContactSolver();
}
Island.prototype.init = function(argBodyCapacity, argContactCapacity, argJointCapacity, argListener) {
  this.bodyCapacity = argBodyCapacity;
  this.contactCapacity = argContactCapacity;
  this.jointCapacity = argJointCapacity;
  this.bodyCount = (0);
  this.contactCount = (0);
  this.listener = argListener;
  if (this.bodies == null || this.bodyCapacity > this.bodies.get$length()) {
    this.bodies = new Array(this.bodyCapacity);
  }
  if (this.contacts == null || this.contactCapacity > this.contacts.get$length()) {
    this.contacts = new Array(this.contactCapacity);
  }
  if (this.joints == null || this.jointCapacity > this.joints.get$length()) {
    this.joints = new Array(this.jointCapacity);
  }
  if (this.velocities == null || this.bodyCapacity > this.velocities.get$length()) {
    var old = this.velocities == null ? new Array((0)) : this.velocities;
    this.velocities = new Array(this.bodyCapacity);
    this.velocities.setRange$3((0), old.get$length(), old);
    for (var i = old.get$length();
     i < this.velocities.get$length(); i++) {
      this.velocities.$setindex(i, new Velocity());
    }
  }
  if (this.positions == null || this.bodyCapacity > this.positions.get$length()) {
    var old = this.positions == null ? new Array((0)) : this.positions;
    this.positions = new Array(this.bodyCapacity);
    this.positions.setRange$3((0), old.get$length(), old);
    for (var i = old.get$length();
     i < this.positions.get$length(); i++) {
      this.positions.$setindex(i, new Position());
    }
  }
}
Island.prototype.clear = function() {
  this.bodyCount = (0);
  this.contactCount = (0);
  this.jointCount = (0);
}
Island.prototype.solve = function(step, gravity, allowSleep) {
  var $0;
  for (var i = (0);
   i < this.bodyCount; ++i) {
    var b = this.bodies[i];
    if (b.get$type() != (2)) {
      continue;
    }
    var velocityDelta = new Vector((b._force.x * b.invMass + gravity.x) * step.dt, (b._force.y * b.invMass + gravity.y) * step.dt);
    b.get$linearVelocity().addLocal(velocityDelta);
    var newAngularVelocity = b.get$angularVelocity() + (step.dt * b.invInertia * b._torque);
    b.set$angularVelocity(newAngularVelocity);
    var a = ((1) - step.dt * b.linearDamping);
    var a1 = ((0) > (a < (1) ? a : (1)) ? (0) : (a < (1) ? a : (1)));
    b.get$linearVelocity().mulLocal(a1);
    var a2 = ((1) - step.dt * b.angularDamping);
    var b1 = (a2 < (1) ? a2 : (1));
    b.set$angularVelocity(b.get$angularVelocity() * ((0) > b1 ? (0) : b1));
  }
  var i1 = (-1);
  for (var i2 = (0);
   i2 < this.contactCount; ++i2) {
    var fixtureA = this.contacts[i2].fixtureA;
    var fixtureB = this.contacts[i2].fixtureB;
    var bodyA = fixtureA.body;
    var bodyB = fixtureB.body;
    var nonStatic = bodyA.get$type() != (0) && bodyB.get$type() != (0);
    if (nonStatic) {
      ++i1;
      var temp = this.contacts[i1];
      this.contacts.$setindex(i1, this.contacts[i2]);
      this.contacts.$setindex(i2, temp);
    }
  }
  this._contactSolver.init(this.contacts, this.contactCount, step.dtRatio);
  this._contactSolver.warmStart();
  for (var i = (0);
   i < this.jointCount; ++i) {
    this.joints.$index(i).initVelocityConstraints(step);
  }
  for (var i = (0);
   i < step.velocityIterations; ++i) {
    for (var j = (0);
     j < this.jointCount; ++j) {
      this.joints.$index(j).solveVelocityConstraints$1(step);
    }
    this._contactSolver.solveVelocityConstraints();
  }
  this._contactSolver.storeImpulses();
  var temp = new Vector((0), (0));
  for (var i = (0);
   i < this.bodyCount; ++i) {
    var b = this.bodies[i];
    if (b.get$type() == (0)) {
      continue;
    }
    this._translation.setFrom(b.get$linearVelocity());
    this._translation.mulLocal(step.dt);
    if (Vector.dot(this._translation, this._translation) > (4)) {
      var ratio = (2) / this._translation.get$length();
      b.get$linearVelocity().mulLocal(ratio);
    }
    var rotation = step.dt * b.get$angularVelocity();
    if (rotation * rotation > (2.4674011002723395)) {
      var ratio = (1.5707963267948966) / rotation.abs();
      b.set$angularVelocity(b.get$angularVelocity() * ratio);
    }
    b.sweep.centerZero.setFrom(b.sweep.center);
    b.sweep.angleZero = b.sweep.angle;
    temp.setFrom(b.get$linearVelocity());
    temp.mulLocal(step.dt);
    b.sweep.center.addLocal(temp);
    ($0 = b.sweep).angle = $0.angle + (step.dt * b.get$angularVelocity());
    b.synchronizeTransform();
  }
  for (var i = (0);
   i < step.positionIterations; ++i) {
    var contactsOkay = this._contactSolver.solvePositionConstraints((0.2));
    var jointsOkay = true;
    for (var j = (0);
     j < this.jointCount; ++j) {
      var jointOkay = this.joints.$index(j).solvePositionConstraints((0.2));
      jointsOkay = jointsOkay && jointOkay;
    }
    if (contactsOkay && jointsOkay) {
      break;
    }
  }
  this.report(this._contactSolver.constraints);
  if (allowSleep) {
    var minSleepTime = (99999999999999);
    var linTolSqr = (0.0001);
    var angTolSqr = (0.0012184696791468343);
    for (var i = (0);
     i < this.bodyCount; ++i) {
      var b = this.bodies[i];
      if (b.get$type() == (0)) {
        continue;
      }
      if ((b.flags & (4)) == (0)) {
        b.sleepTime = (0);
        minSleepTime = (0);
      }
      if ((b.flags & (4)) == (0) || b.get$angularVelocity() * b.get$angularVelocity() > angTolSqr || Vector.dot(b.get$linearVelocity(), b.get$linearVelocity()) > linTolSqr) {
        b.sleepTime = (0);
        minSleepTime = (0);
      }
      else {
        b.sleepTime = b.sleepTime + step.dt;
        minSleepTime = Math.min(minSleepTime, b.sleepTime);
      }
    }
    if (minSleepTime >= (0.5)) {
      for (var i = (0);
       i < this.bodyCount; ++i) {
        var b = this.bodies[i];
        b.set$awake(false);
      }
    }
  }
}
Island.prototype.addBody = function(body) {
  body.islandIndex = this.bodyCount;
  this.bodies.$setindex(this.bodyCount++, body);
}
Island.prototype.addContact = function(contact) {
  this.contacts.$setindex(this.contactCount++, contact);
}
Island.prototype.addJoint = function(joint) {
  this.joints.$setindex(this.jointCount++, joint);
}
Island.prototype.report = function(constraints) {
  if (this.listener == null) {
    return;
  }
  for (var i = (0);
   i < this.contactCount; ++i) {
    var c = this.contacts[i];
    var cc = constraints[i];
    for (var j = (0);
     j < cc.pointCount; ++j) {
      this.impulse.normalImpulses.$setindex(j, cc.points[j].normalImpulse);
      this.impulse.tangentImpulses.$setindex(j, cc.points[j].tangentImpulse);
    }
    this.listener.noSuchMethod("postSolve", [c, this.impulse]);
  }
}
// ********** Code for Position **************
function Position() {
  this.x = new Vector((0), (0));
  this.a = (0);
}
Position.prototype.get$x = function() { return this.x; };
Position.prototype.set$x = function(value) { return this.x = value; };
// ********** Code for Velocity **************
function Velocity() {
  this.v = new Vector((0), (0));
  this.a = (0);
}
// ********** Code for TimeStep **************
function TimeStep() {
  this.dtRatio = (0);
  this.dt = (0);
  this.velocityIterations = (0);
  this.inv_dt = (0);
  this.warmStarting = true;
  this.positionIterations = (0);
}
// ********** Code for World **************
function World(gravity, doSleep, argPool) {
  this._bodyList = null;
  this._bodyCount = (0);
  this.toiSolver = new TimeOfImpactSolver();
  this.toiOutput = new TimeOfImpactOutput();
  this._jointCount = (0);
  this._warmStarting = true;
  this._flags = (4);
  this.axis = new Vector((0), (0));
  this.backup = new Sweep();
  this.island = new Island();
  this.cB = new Vector((0), (0));
  this._fixtureDestructionListener = null;
  this.stack = new Array((10));
  this.center = new Vector((0), (0));
  this.timestep = new TimeStep();
  this._allowSleep = doSleep;
  this._gravity = gravity;
  this._continuousPhysics = true;
  this.wqwrapper = new WorldQueryWrapper();
  this.cA = new Vector((0), (0));
  this._jointDestructionListener = null;
  this._inverseTimestep = (0);
  this.toiInput = new TimeOfImpactInput();
  this._pool = argPool;
  this._contactStacks = new Array((2));
  this.contacts = new Array((32));
  this._jointList = null;
  this._debugDraw = null;
  this._contactManager = new ContactManager(this);
  for (var i = (0);
   i < this._contactStacks.get$length(); i++) {
    this._contactStacks.$setindex(i, new Array((2)));
  }
  this._initializeRegisters();
}
World.prototype.get$center = function() { return this.center; };
World.prototype._addType = function(creatorStack, type1, type2) {
  var register = new ContactRegister();
  register.creator = creatorStack;
  register.primary = true;
  this._contactStacks[type1].$setindex(type2, register);
  if (type1 != type2) {
    var register2 = new ContactRegister();
    register2.creator = creatorStack;
    register2.primary = false;
    this._contactStacks[type2].$setindex(type1, register2);
  }
}
World.prototype._initializeRegisters = function() {
  this._addType(this._pool.getCircleContactStack(), (0), (0));
  this._addType(this._pool.getPolyCircleContactStack(), (1), (0));
  this._addType(this._pool.getPolyContactStack(), (1), (1));
}
World.prototype.popContact = function(fixtureA, fixtureB) {
  var type1 = fixtureA.get$type();
  var type2 = fixtureB.get$type();
  var reg = this._contactStacks[type1][type2];
  var creator = reg.creator;
  if (creator != null) {
    if (creator.isEmpty()) {
      creator = this._getFreshContactStack(type1, type2);
    }
    if (reg.primary) {
      var c = creator.removeFirst();
      c.init(fixtureA, fixtureB);
      return c;
    }
    else {
      var c = creator.removeFirst();
      c.init(fixtureB, fixtureA);
      return c;
    }
  }
  else {
    return null;
  }
}
World.prototype._getFreshContactStack = function(type1, type2) {
  if (type1 == (0) && type2 == (0)) {
    return this._pool.getCircleContactStack();
  }
  else if (type1 == (1) && type2 == (1)) {
    return this._pool.getPolyContactStack();
  }
  else {
    return this._pool.getPolyCircleContactStack();
  }
}
World.prototype.pushContact = function(contact) {
  if (contact.manifold.pointCount > (0)) {
    contact.fixtureA.body.set$awake(true);
    contact.fixtureB.body.set$awake(true);
  }
  var type1 = contact.fixtureA.get$type();
  var type2 = contact.fixtureB.get$type();
  var creator = this._contactStacks[type1][type2].creator;
  creator.addFirst(contact);
}
World.prototype.createBody = function(def) {
  if (this.get$locked()) {
    return null;
  }
  var b = new Body(def, this);
  b.prev = null;
  b.next = this._bodyList;
  if (this._bodyList != null) {
    this._bodyList.prev = b;
  }
  this._bodyList = b;
  ++this._bodyCount;
  return b;
}
World.prototype.createJoint = function(def) {
  if (this.get$locked()) {
    return null;
  }
  var j = Joint.Joint$create$factory(this, def);
  j._prev = null;
  j._next = this._jointList;
  if (this._jointList != null) this._jointList._prev = j;
  this._jointList = j;
  ++this._jointCount;
  j.edgeA.joint = j;
  j.edgeA.other = j.bodyB;
  j.edgeA.prev = null;
  j.edgeA.next = j.bodyA.jointList;
  if (j.bodyA.jointList != null) {
    j.bodyA.jointList.prev = j.edgeA;
  }
  j.bodyA.jointList = j.edgeA;
  j.edgeB.joint = j;
  j.edgeB.other = j.bodyA;
  j.edgeB.prev = null;
  j.edgeB.next = j.bodyB.jointList;
  if (j.bodyB.jointList != null) {
    j.bodyB.jointList.prev = j.edgeB;
  }
  j.bodyB.jointList = j.edgeB;
  var bodyA = def.bodyA;
  var bodyB = def.bodyB;
  if ($eq(def.collideConnected, false)) {
    var edge = bodyB.contactList;
    while (edge != null) {
      if ($eq(edge.other, bodyA)) {
        edge.contact.flagForFiltering();
      }
      edge = edge.next;
    }
  }
  return j;
}
World.prototype.step = function(dt, velocityIterations, positionIterations) {
  if ((this._flags & (1)) == (1)) {
    this._contactManager.findNewContacts();
    this._flags = this._flags & (-2);
  }
  this._flags = this._flags | (2);
  this.timestep.dt = dt;
  this.timestep.velocityIterations = velocityIterations;
  this.timestep.positionIterations = positionIterations;
  if (dt > (0)) {
    this.timestep.inv_dt = (1) / dt;
  }
  else {
    this.timestep.inv_dt = (0);
  }
  this.timestep.dtRatio = this._inverseTimestep * dt;
  this.timestep.warmStarting = this._warmStarting;
  this._contactManager.collide();
  if (this.timestep.dt > (0)) {
    this.solve(this.timestep);
  }
  if (this._continuousPhysics && this.timestep.dt > (0)) {
    this.solveTimeOfImpact();
  }
  if (this.timestep.dt > (0)) {
    this._inverseTimestep = this.timestep.inv_dt;
  }
  if ((this._flags & (4)) == (4)) {
    this.clearForces();
  }
  this._flags = this._flags & (-3);
}
World.prototype.clearForces = function() {
  for (var body = this._bodyList;
   body != null; body = body.next) {
    body._force.setZero();
    body._torque = (0);
  }
}
World.prototype.drawDebugData = function() {
  if (this._debugDraw == null) {
    return;
  }
  var drawFlags = this._debugDraw.drawFlags;
  if ((drawFlags & (1)) == (1)) {
    var xf = new Transform();
    var color = new Color3();
    for (var b = this._bodyList;
     b != null; b = b.next) {
      xf.setFrom(b.originTransform);
      for (var f = b.fixtureList;
       f != null; f = f.next) {
        if ($eq(b.get$active(), false)) {
          color.setFromRGB((0.5), (0.5), (0.3));
          this.drawShape(f, xf, color);
        }
        else if (b.get$type() == (0)) {
          color.setFromRGB((0.5), (0.9), (0.3));
          this.drawShape(f, xf, color);
        }
        else if (b.get$type() == (1)) {
          color.setFromRGB((0.5), (0.5), (0.9));
          this.drawShape(f, xf, color);
        }
        else if ($eq(b.get$awake(), false)) {
          color.setFromRGB((0.9), (0.9), (0.9));
          this.drawShape(f, xf, color);
        }
        else {
          color.setFromRGB((0.9), (0.7), (0.7));
          this.drawShape(f, xf, color);
        }
      }
    }
  }
  if ((drawFlags & (2)) == (2)) {
    for (var j = this._jointList;
     j != null; j = j._next) this.drawJoint(j);
  }
  if ((drawFlags & (8)) == (8)) {
    var color = new Color3.fromRGB$ctor((0.3), (0.9), (0.9));
    for (var c = this._contactManager.contactList;
     c != null; c = c.next) {
      var fixtureA = c.fixtureA;
      var fixtureB = c.fixtureB;
      this.cA.setFrom(fixtureA.box.get$center());
      this.cB.setFrom(fixtureB.box.get$center());
      this._debugDraw.drawSegment(this.cA, this.cB, color);
    }
  }
  if ((drawFlags & (4)) == (4)) {
    var color = new Color3.fromRGB$ctor((0.9), (0.3), (0.9));
    for (var b = this._bodyList;
     b != null; b = b.next) {
      if ($eq(b.get$active(), false)) {
        continue;
      }
      for (var f = b.fixtureList;
       f != null; f = f.next) {
        var aabb = f.proxy.box;
        var vs = new Array((4));
        for (var i = (0);
         i < vs.get$length(); i++) {
          vs.$setindex(i, new Vector((0), (0)));
        }
        vs[(0)].setCoords(aabb.lowerBound.x, aabb.lowerBound.y);
        vs[(1)].setCoords(aabb.upperBound.x, aabb.lowerBound.y);
        vs[(2)].setCoords(aabb.upperBound.x, aabb.upperBound.y);
        vs[(3)].setCoords(aabb.lowerBound.x, aabb.upperBound.y);
        this._debugDraw.drawPolygon(vs, (4), color);
      }
    }
  }
  if ((drawFlags & (16)) == (16)) {
    var xf = new Transform();
    for (var b = this._bodyList;
     b != null; b = b.next) {
      xf.setFrom(b.originTransform);
      xf.position.setFrom(b.get$worldCenter());
      this._debugDraw.drawTransform(xf);
    }
  }
}
World.prototype.get$locked = function() {
  return (this._flags & (2)) == (2);
}
World.prototype.get$jointList = function() {
  return this._jointList;
}
World.prototype.solve = function(timeStep) {
  this.island.init(this._bodyCount, this._contactManager.contactCount, this._jointCount, this._contactManager.contactListener);
  for (var b = this._bodyList;
   b != null; b = b.next) {
    b.flags = b.flags & (-2);
  }
  for (var c = this._contactManager.contactList;
   c != null; c = c.next) {
    c.flags = c.flags & (-2);
  }
  for (var j = this.get$jointList();
   j != null; j = j._next) {
    j.islandFlag = false;
  }
  var stackSize = this._bodyCount;
  if (this.stack.get$length() < stackSize) {
    this.stack = new Array(stackSize);
  }
  for (var seed = this._bodyList;
   seed != null; seed = seed.next) {
    if ((seed.flags & (1)) == (1)) {
      continue;
    }
    if ($eq(seed.get$awake(), false) || $eq(seed.get$active(), false)) {
      continue;
    }
    if (seed.get$type() == (0)) {
      continue;
    }
    this.island.clear();
    var stackCount = (0);
    this.stack.$setindex(stackCount++, seed);
    seed.flags = seed.flags | (1);
    while (stackCount > (0)) {
      var b = this.stack[--stackCount];
      this.island.addBody(b);
      b.set$awake(true);
      if (b.get$type() == (0)) {
        continue;
      }
      for (var ce = b.contactList;
       ce != null; ce = ce.next) {
        var contact = ce.contact;
        if ((contact.flags & (1)) == (1)) {
          continue;
        }
        if ($eq(contact.get$enabled(), false) || $eq(contact.get$touching(), false)) {
          continue;
        }
        var sensorA = contact.fixtureA.isSensor;
        var sensorB = contact.fixtureB.isSensor;
        if (sensorA || sensorB) {
          continue;
        }
        this.island.addContact(contact);
        contact.flags = contact.flags | (1);
        var other = ce.other;
        if ((other.flags & (1)) == (1)) {
          continue;
        }
        this.stack.$setindex(stackCount++, other);
        other.flags = other.flags | (1);
      }
      for (var je = b.jointList;
       je != null; je = je.next) {
        if ($eq(je.joint.islandFlag, true)) {
          continue;
        }
        var other = je.other;
        if ($eq(other.get$active(), false)) {
          continue;
        }
        this.island.addJoint(je.joint);
        je.joint.islandFlag = true;
        if (((other.flags & (1)) == (1))) {
          continue;
        }
        this.stack.$setindex(stackCount++, other);
        other.flags = other.flags | (1);
      }
    }
    this.island.solve(timeStep, this._gravity, this._allowSleep);
    for (var i = (0);
     i < this.island.bodyCount; ++i) {
      var b = this.island.bodies[i];
      if (b.get$type() == (0)) {
        b.flags = b.flags & (-2);
      }
    }
  }
  for (var b = this._bodyList;
   b != null; b = b.next) {
    if ((b.flags & (1)) == (0)) {
      continue;
    }
    if (b.get$type() == (0)) {
      continue;
    }
    b.synchronizeFixtures();
  }
  this._contactManager.findNewContacts();
}
World.prototype.solveTimeOfImpact = function() {
  for (var c = this._contactManager.contactList;
   c != null; c = c.next) {
    c.flags = c.flags | (4);
    c.toiCount = (0);
  }
  for (var body = this._bodyList;
   body != null; body = body.next) {
    if ((body.flags & (1)) == (0) || body.get$type() == (1) || body.get$type() == (0)) {
      body.flags = body.flags | (64);
    }
    else {
      body.flags = body.flags & (-65);
    }
  }
  for (var body = this._bodyList;
   body != null; body = body.next) {
    if ((body.flags & (64)) == (64)) {
      continue;
    }
    if ($eq(body.get$bullet(), true)) {
      continue;
    }
    this.solveTimeOfImpactGivenBody(body);
    body.flags = body.flags | (64);
  }
  for (var body = this._bodyList;
   body != null; body = body.next) {
    if ((body.flags & (64)) == (64)) {
      continue;
    }
    if ($eq(body.get$bullet(), false)) {
      continue;
    }
    this.solveTimeOfImpactGivenBody(body);
    body.flags = body.flags | (64);
  }
}
World.prototype.solveTimeOfImpactGivenBody = function(body) {
  var $0;
  var toiContact = null;
  var toi = (1);
  var toiOther = null;
  var found;
  var count;
  var iter = (0);
  var bullet = body.get$bullet();
  do {
    count = (0);
    found = false;
    for (var ce = body.contactList;
     ce != null; ce = ce.next) {
      if ($eq(ce.contact, toiContact)) {
        continue;
      }
      var other = ce.other;
      var type = other.get$type();
      if ($eq(bullet, true)) {
        if ((other.flags & (64)) == (0)) {
          continue;
        }
        if (type != (0) && (ce.contact.flags & (16)) != (0)) {
          continue;
        }
      }
      else if (type == (2)) {
        continue;
      }
      var contact = ce.contact;
      if ($eq(contact.get$enabled(), false)) {
        continue;
      }
      if (contact.toiCount > (10)) {
        continue;
      }
      var fixtureA = contact.fixtureA;
      var fixtureB = contact.fixtureB;
      if (fixtureA.isSensor || fixtureB.isSensor) {
        continue;
      }
      var bodyA = fixtureA.body;
      var bodyB = fixtureB.body;
      this.toiInput.proxyA.setFromShape(fixtureA.shape);
      this.toiInput.proxyB.setFromShape(fixtureB.shape);
      this.toiInput.sweepA.setFrom(bodyA.sweep);
      this.toiInput.sweepB.setFrom(bodyB.sweep);
      this.toiInput.tMax = toi;
      this._pool.timeOfImpact.timeOfImpact(this.toiOutput, this.toiInput);
      if (this.toiOutput.state == (3) && this.toiOutput.t < toi) {
        toiContact = contact;
        toi = this.toiOutput.t;
        toiOther = other;
        found = true;
      }
      ++count;
    }
    ++iter;
  }
  while (found && count > (1) && iter < (50))
  if (toiContact == null) {
    body.advance((1));
    return;
  }
  this.backup.setFrom(body.sweep);
  body.advance(toi);
  toiContact.update(this._contactManager.contactListener);
  if ($eq(toiContact.get$enabled(), false)) {
    body.sweep.setFrom(this.backup);
    this.solveTimeOfImpactGivenBody(body);
  }
  ((toiContact.toiCount = ($0 = toiContact.toiCount + (1)), $0));
  if (this.contacts == null || this.contacts.get$length() < (32)) {
    this.contacts = new Array((32));
  }
  count = (0);
  for (var ce = body.contactList;
   ce != null && count < (32); ce = ce.next) {
    var other = ce.other;
    var type = other.get$type();
    if (type == (2)) {
      continue;
    }
    var contact = ce.contact;
    if ($eq(contact.get$enabled(), false)) {
      continue;
    }
    var fixtureA = contact.fixtureA;
    var fixtureB = contact.fixtureB;
    if (fixtureA.isSensor || fixtureB.isSensor) {
      continue;
    }
    if ($ne(contact, toiContact)) {
      contact.update(this._contactManager.contactListener);
    }
    if ($eq(contact.get$enabled(), false)) {
      continue;
    }
    if ($eq(contact.get$touching(), false)) {
      continue;
    }
    this.contacts.$setindex(count, contact);
    ++count;
  }
  this.toiSolver.initialize(this.contacts, count, body);
  var k_toiBaumgarte = (0.75);
  for (var i = (0);
   i < (20); ++i) {
    var contactsOkay = this.toiSolver.solve(k_toiBaumgarte);
    if (contactsOkay) {
      break;
    }
  }
  if (toiOther.get$type() != (0)) {
    toiContact.flags = toiContact.flags | (16);
  }
}
World.prototype.drawShape = function(fixture, xf, color) {
  switch (fixture.get$type()) {
    case (0):

      var circle = fixture.shape;
      Transform.mulToOut(xf, circle.get$position(), this.center);
      var radius = circle.get$radius();
      this.axis.setFrom(xf.rotation.col1);
      this._debugDraw.drawSolidCircle(this.center, radius, this.axis, color);
      break;

    case (1):

      var poly = fixture.shape;
      var vertexCount = poly.get$vertexCount();
      var vertices = new Array(vertexCount);
      for (var i = (0);
       i < vertexCount; i++) {
        vertices.$setindex(i, new Vector((0), (0)));
      }
      for (var i = (0);
       i < vertexCount; ++i) {
        Transform.mulToOut(xf, poly.get$vertices().$index(i), vertices[i]);
      }
      this._debugDraw.drawSolidPolygon(vertices, vertexCount, color);

  }
}
World.prototype.drawJoint = function(joint) {
  var bodyA = joint.bodyA;
  var bodyB = joint.bodyB;
  var xf1 = bodyA.originTransform;
  var xf2 = bodyB.originTransform;
  var x1 = xf1.position;
  var x2 = xf2.position;
  var p1 = new Vector((0), (0));
  var p2 = new Vector((0), (0));
  joint.getAnchorA(p1);
  joint.getAnchorB(p2);
  var color = new Color3.fromRGB$ctor((0.5), (0.8), (0.8));
  switch (joint.type) {
    case (3):

      this.noSuchMethod("get:debugDraw", []).drawSegment(p1, p2, color);
      break;

    case (4):

      $throw(new NotImplementedException());

    case (10):
    case (5):

      break;

    default:

      this.noSuchMethod("get:debugDraw", []).drawSegment(x1, p1, color);
      this.noSuchMethod("get:debugDraw", []).drawSegment(p1, p2, color);
      this.noSuchMethod("get:debugDraw", []).drawSegment(x2, p2, color);

  }
}
World.prototype.set$debugDraw = function(debugDraw) {
  this._debugDraw = debugDraw;
}
// ********** Code for WorldQueryWrapper **************
function WorldQueryWrapper() {

}
WorldQueryWrapper.prototype.treeCallback = function(node) {
  var fixture = node.userData;
  return this.callback.noSuchMethod("reportFixture", [fixture]);
}
// ********** Code for Contact **************
function Contact(pool) {
  this.manifold = new Manifold();
  this.edge1 = new ContactEdge();
  this._oldManifold = new Manifold();
  this.fixtureA = null;
  this.fixtureB = null;
  this.pool = pool;
  this.edge2 = new ContactEdge();
}
Contact.prototype.init = function(fixA, fixB) {
  this.flags = (0);
  this.fixtureA = fixA;
  this.fixtureB = fixB;
  this.manifold.pointCount = (0);
  this.prev = null;
  this.next = null;
  this.edge1.contact = null;
  this.edge1.prev = null;
  this.edge1.next = null;
  this.edge1.other = null;
  this.edge2.contact = null;
  this.edge2.prev = null;
  this.edge2.next = null;
  this.edge2.other = null;
  this.toiCount = (0);
}
Contact.prototype.get$touching = function() {
  return (this.flags & (2)) == (2);
}
Contact.prototype.get$enabled = function() {
  return (this.flags & (4)) == (4);
}
Contact.prototype.flagForFiltering = function() {
  this.flags = this.flags | (8);
}
Contact.prototype.update = function(listener) {
  this._oldManifold.setFrom(this.manifold);
  this.flags = this.flags | (4);
  var touching = false;
  var wasTouching = (this.flags & (2)) == (2);
  var sensorA = this.fixtureA.isSensor;
  var sensorB = this.fixtureB.isSensor;
  var sensor = sensorA || sensorB;
  var bodyA = this.fixtureA.body;
  var bodyB = this.fixtureB.body;
  var xfA = bodyA.originTransform;
  var xfB = bodyB.originTransform;
  if (sensor) {
    var shapeA = this.fixtureA.shape;
    var shapeB = this.fixtureB.shape;
    touching = this.pool.collision.testOverlap(shapeA, shapeB, xfA, xfB);
    this.manifold.pointCount = (0);
  }
  else {
    this.evaluate(this.manifold, xfA, xfB);
    touching = this.manifold.pointCount > (0);
    for (var i = (0);
     i < this.manifold.pointCount; ++i) {
      var mp2 = this.manifold.points[i];
      mp2.normalImpulse = (0);
      mp2.tangentImpulse = (0);
      var id2 = mp2.id;
      for (var j = (0);
       j < this._oldManifold.pointCount; ++j) {
        var mp1 = this._oldManifold.points[j];
        if (mp1.id.isEqual(id2)) {
          mp2.normalImpulse = mp1.normalImpulse;
          mp2.tangentImpulse = mp1.tangentImpulse;
          break;
        }
      }
    }
    if ($ne(touching, wasTouching)) {
      bodyA.set$awake(true);
      bodyB.set$awake(true);
    }
  }
  if (touching) {
    this.flags = this.flags | (2);
  }
  else {
    this.flags = this.flags & (-3);
  }
  if (listener == null) {
    return;
  }
  if ($eq(wasTouching, false) && $eq(touching, true)) {
    listener.noSuchMethod("beginContact", [this]);
  }
  if ($eq(wasTouching, true) && $eq(touching, false)) {
    listener.noSuchMethod("endContact", [this]);
  }
  if ($eq(sensor, false) && touching) {
    listener.noSuchMethod("preSolve", [this, this._oldManifold]);
  }
}
// ********** Code for ContactConstraint **************
function ContactConstraint() {
  this.localPoint = new Vector((0), (0));
  this.points = new Array((2));
  this.normalMass = new Matrix22();
  this.localNormal = new Vector((0), (0));
  this.manifold = null;
  this.normal = new Vector((0), (0));
  this.pointCount = (0);
  this.K = new Matrix22();
  for (var i = (0);
   i < (2); i++) {
    this.points.$setindex(i, new ContactConstraintPoint());
  }
}
ContactConstraint.prototype.get$type = function() { return this.type; };
ContactConstraint.prototype.set$type = function(value) { return this.type = value; };
ContactConstraint.prototype.get$radius = function() { return this.radius; };
ContactConstraint.prototype.set$radius = function(value) { return this.radius = value; };
ContactConstraint.prototype.get$friction = function() { return this.friction; };
ContactConstraint.prototype.set$friction = function(value) { return this.friction = value; };
ContactConstraint.prototype.get$restitution = function() { return this.restitution; };
ContactConstraint.prototype.set$restitution = function(value) { return this.restitution = value; };
ContactConstraint.prototype.setFrom = function(cp) {
  this.pointCount = cp.pointCount;
  this.localNormal.setFrom(cp.localNormal);
  this.localPoint.setFrom(cp.localPoint);
  this.normal.setFrom(cp.normal);
  this.normalMass.setFrom(cp.normalMass);
  this.K.setFrom(cp.K);
  this.bodyA = cp.bodyA;
  this.bodyB = cp.bodyB;
  this.type = cp.type;
  this.radius = cp.radius;
  this.friction = cp.friction;
  this.restitution = cp.restitution;
  this.manifold = cp.manifold;
  for (var i = (0);
   i < cp.pointCount; i++) {
    this.points[i].setFrom(cp.points[i]);
  }
}
ContactConstraint.prototype.toString = function() {
  var result = $add($add(("localNormal: \"" + this.localNormal + "\", localPoint: \"" + this.localPoint + "\" "), ("normal: \"" + this.normal + "\", radius: \"" + this.radius + "\" friction: \"" + this.friction + "\" ")), ("restitution: \"" + this.restitution + "\", pointCount: \"" + this.pointCount + "\""));
  return result;
}
ContactConstraint.prototype.setFrom$1 = ContactConstraint.prototype.setFrom;
// ********** Code for ContactConstraintPoint **************
function ContactConstraintPoint() {
  this.tangentMass = (0);
  this.rB = new Vector((0), (0));
  this.localPoint = new Vector((0), (0));
  this.velocityBias = (0);
  this.rA = new Vector((0), (0));
  this.tangentImpulse = (0);
  this.normalMass = (0);
  this.normalImpulse = (0);
}
ContactConstraintPoint.prototype.setFrom = function(cp) {
  this.localPoint.setFrom(cp.localPoint);
  this.rA.setFrom(cp.rA);
  this.rB.setFrom(cp.rB);
  this.normalImpulse = cp.normalImpulse;
  this.tangentImpulse = cp.tangentImpulse;
  this.normalMass = cp.normalMass;
  this.tangentMass = cp.tangentMass;
  this.velocityBias = cp.velocityBias;
}
ContactConstraintPoint.prototype.toString = function() {
  return $add($add($add($add($add($add($add($add($add($add("normal impulse: " + this.normalImpulse, ", tangentImpulse: ") + this.tangentImpulse, ", normalMass: ") + this.normalMass, ", tangentMass: ") + this.tangentMass, ", velocityBias: ") + this.velocityBias, ", localPoint "), this.localPoint), ", rA: "), this.rA), ", rB: "), this.rB);
}
ContactConstraintPoint.prototype.setFrom$1 = ContactConstraintPoint.prototype.setFrom;
// ********** Code for ContactEdge **************
function ContactEdge() {
  this.other = null;
  this.contact = null;
  this.prev = null;
  this.next = null;
}
// ********** Code for CircleContact **************
$inherits(CircleContact, Contact);
function CircleContact(argPool) {
  Contact.call(this, argPool);
}
CircleContact.prototype.init = function(fA, fB) {
  Expect.equals((0), fA.get$type());
  Expect.equals((0), fB.get$type());
  Contact.prototype.init.call(this, fA, fB);
}
CircleContact.prototype.evaluate = function(argManifold, xfA, xfB) {
  this.pool.collision.collideCircles(argManifold, this.fixtureA.shape, xfA, this.fixtureB.shape, xfB);
}
// ********** Code for ContactRegister **************
function ContactRegister() {
  this.primary = false;
  this.creator = null;
}
// ********** Code for ContactSolver **************
function ContactSolver() {
  this.P2 = new Vector((0), (0));
  this.x = new Vector((0), (0));
  this.d = new Vector((0), (0));
  this.P1 = new Vector((0), (0));
  this.rB = new Vector((0), (0));
  this.temp1 = new Vector((0), (0));
  this.dv1 = new Vector((0), (0));
  this.P = new Vector((0), (0));
  this.constraints = new Array((256));
  this.temp2 = new Vector((0), (0));
  this.dv = new Vector((0), (0));
  this.rA = new Vector((0), (0));
  this.psolver = new PositionSolverManifold();
  this.worldManifold = new WorldManifold();
  this.tangent = new Vector((0), (0));
  this.dv2 = new Vector((0), (0));
  for (var i = (0);
   i < this.constraints.get$length(); i++) {
    this.constraints.$setindex(i, new ContactConstraint());
  }
}
ContactSolver.prototype.get$x = function() { return this.x; };
ContactSolver.prototype.init = function(contacts, contactCount, impulseRatio) {
  this.constraintCount = contactCount;
  if (this.constraints.get$length() < contactCount) {
    var old = this.constraints;
    var newLen = Math.max(old.get$length() * (2), this.constraintCount);
    this.constraints = new Array(newLen);
    this.constraints.setRange$3((0), old.get$length(), old);
    for (var i = old.get$length();
     i < this.constraints.get$length(); i++) {
      this.constraints.$setindex(i, new ContactConstraint());
    }
  }
  for (var i = (0);
   i < this.constraintCount; ++i) {
    var contact = contacts[i];
    var fixtureA = contact.fixtureA;
    var fixtureB = contact.fixtureB;
    var shapeA = fixtureA.shape;
    var shapeB = fixtureB.shape;
    var radiusA = shapeA.radius;
    var radiusB = shapeB.radius;
    var bodyA = fixtureA.body;
    var bodyB = fixtureB.body;
    var manifold = contact.manifold;
    var friction = Settings.mixFriction(fixtureA.friction, fixtureB.friction);
    var restitution = Settings.mixRestitution(fixtureA.restitution, fixtureB.restitution);
    var vA = bodyA.get$linearVelocity();
    var vB = bodyB.get$linearVelocity();
    var wA = bodyA.get$angularVelocity();
    var wB = bodyB.get$angularVelocity();
    this.worldManifold.initialize(manifold, bodyA.originTransform, radiusA, bodyB.originTransform, radiusB);
    var cc = this.constraints[i];
    cc.bodyA = bodyA;
    cc.bodyB = bodyB;
    cc.manifold = manifold;
    cc.normal.x = this.worldManifold.normal.x;
    cc.normal.y = this.worldManifold.normal.y;
    cc.pointCount = manifold.pointCount;
    cc.friction = friction;
    cc.restitution = restitution;
    cc.localNormal.x = manifold.localNormal.x;
    cc.localNormal.y = manifold.localNormal.y;
    cc.localPoint.x = manifold.localPoint.x;
    cc.localPoint.y = manifold.localPoint.y;
    cc.radius = radiusA + radiusB;
    cc.type = manifold.type;
    for (var j = (0);
     j < cc.pointCount; ++j) {
      var cp = manifold.points[j];
      var ccp = cc.points[j];
      ccp.normalImpulse = impulseRatio * cp.normalImpulse;
      ccp.tangentImpulse = impulseRatio * cp.tangentImpulse;
      ccp.localPoint.x = cp.localPoint.x;
      ccp.localPoint.y = cp.localPoint.y;
      ccp.rA.x = this.worldManifold.points[j].x - bodyA.sweep.center.x;
      ccp.rA.y = this.worldManifold.points[j].y - bodyA.sweep.center.y;
      ccp.rB.x = this.worldManifold.points[j].x - bodyB.sweep.center.x;
      ccp.rB.y = this.worldManifold.points[j].y - bodyB.sweep.center.y;
      var rnA = ccp.rA.x * cc.normal.y - ccp.rA.y * cc.normal.x;
      var rnB = ccp.rB.x * cc.normal.y - ccp.rB.y * cc.normal.x;
      rnA *= rnA;
      rnB *= rnB;
      var kNormal = bodyA.invMass + bodyB.invMass + bodyA.invInertia * rnA + bodyB.invInertia * rnB;
      ccp.normalMass = (1) / kNormal;
      this.tangent.x = (1) * cc.normal.y;
      this.tangent.y = (-1) * cc.normal.x;
      var rtA = ccp.rA.x * this.tangent.y - ccp.rA.y * this.tangent.x;
      var rtB = ccp.rB.x * this.tangent.y - ccp.rB.y * this.tangent.x;
      rtA *= rtA;
      rtB *= rtB;
      var kTangent = bodyA.invMass + bodyB.invMass + bodyA.invInertia * rtA + bodyB.invInertia * rtB;
      ccp.tangentMass = (1) / kTangent;
      ccp.velocityBias = (0);
      this.temp2.x = -wA * ccp.rA.y;
      this.temp2.y = wA * ccp.rA.x;
      this.temp1.x = -wB * ccp.rB.y + vB.x - vA.x - this.temp2.x;
      this.temp1.y = wB * ccp.rB.x + vB.y - vA.y - this.temp2.y;
      var a = cc.normal;
      var vRel = a.x * this.temp1.x + a.y * this.temp1.y;
      if (vRel < (-1)) {
        ccp.velocityBias = -restitution * vRel;
      }
    }
    if (cc.pointCount == (2)) {
      var ccp1 = cc.points[(0)];
      var ccp2 = cc.points[(1)];
      var invMassA = bodyA.invMass;
      var invIA = bodyA.invInertia;
      var invMassB = bodyB.invMass;
      var invIB = bodyB.invInertia;
      var rn1A = Vector.crossVectors(ccp1.rA, cc.normal);
      var rn1B = Vector.crossVectors(ccp1.rB, cc.normal);
      var rn2A = Vector.crossVectors(ccp2.rA, cc.normal);
      var rn2B = Vector.crossVectors(ccp2.rB, cc.normal);
      var k11 = invMassA + invMassB + invIA * rn1A * rn1A + invIB * rn1B * rn1B;
      var k22 = invMassA + invMassB + invIA * rn2A * rn2A + invIB * rn2B * rn2B;
      var k12 = invMassA + invMassB + invIA * rn1A * rn2A + invIB * rn1B * rn2B;
      if (k11 * k11 < (100) * (k11 * k22 - k12 * k12)) {
        cc.K.col1.x = k11;
        cc.K.col1.y = k12;
        cc.K.col2.x = k12;
        cc.K.col2.y = k22;
        cc.normalMass.col1.x = cc.K.col1.x;
        cc.normalMass.col1.y = cc.K.col1.y;
        cc.normalMass.col2.x = cc.K.col2.x;
        cc.normalMass.col2.y = cc.K.col2.y;
        cc.normalMass.invertLocal();
      }
      else {
        cc.pointCount = (1);
      }
    }
  }
}
ContactSolver.prototype.warmStart = function() {
  var $0, $1, $2, $3;
  for (var i = (0);
   i < this.constraintCount; ++i) {
    var c = this.constraints[i];
    var bodyA = c.bodyA;
    var bodyB = c.bodyB;
    var invMassA = bodyA.invMass;
    var invIA = bodyA.invInertia;
    var invMassB = bodyB.invMass;
    var invIB = bodyB.invInertia;
    var normal = c.normal;
    Vector.crossVectorAndNumToOut(normal, (1), this.tangent);
    for (var j = (0);
     j < c.pointCount; ++j) {
      var ccp = c.points[j];
      var Px = ccp.normalImpulse * normal.x + ccp.tangentImpulse * this.tangent.x;
      var Py = ccp.normalImpulse * normal.y + ccp.tangentImpulse * this.tangent.y;
      bodyA.set$angularVelocity(bodyA.get$angularVelocity() - (invIA * (ccp.rA.x * Py - ccp.rA.y * Px)));
      ($0 = bodyA.get$linearVelocity()).x = $0.x - (Px * invMassA);
      ($1 = bodyA.get$linearVelocity()).y = $1.y - (Py * invMassA);
      bodyB.set$angularVelocity(bodyB.get$angularVelocity() + (invIB * (ccp.rB.x * Py - ccp.rB.y * Px)));
      ($2 = bodyB.get$linearVelocity()).x = $2.x + (Px * invMassB);
      ($3 = bodyB.get$linearVelocity()).y = $3.y + (Py * invMassB);
    }
  }
}
ContactSolver.prototype.solveVelocityConstraints = function() {
  for (var i = (0);
   i < this.constraintCount; ++i) {
    var c = this.constraints[i];
    var bodyA = c.bodyA;
    var bodyB = c.bodyB;
    var wA = bodyA.get$angularVelocity();
    var wB = bodyB.get$angularVelocity();
    var vA = bodyA.get$linearVelocity();
    var vB = bodyB.get$linearVelocity();
    var invMassA = bodyA.invMass;
    var invIA = bodyA.invInertia;
    var invMassB = bodyB.invMass;
    var invIB = bodyB.invInertia;
    this.tangent.x = (1) * c.normal.y;
    this.tangent.y = (-1) * c.normal.x;
    var friction = c.friction;
    for (var j = (0);
     j < c.pointCount; ++j) {
      var ccp = c.points[j];
      var a = ccp.rA;
      this.dv.x = -wB * ccp.rB.y + vB.x - vA.x + wA * a.y;
      this.dv.y = wB * ccp.rB.x + vB.y - vA.y - wA * a.x;
      var vt = this.dv.x * this.tangent.x + this.dv.y * this.tangent.y;
      var lambda = ccp.tangentMass * (-vt);
      var maxFriction = friction * ccp.normalImpulse;
      var newImpulse = MathBox.clamp(ccp.tangentImpulse + lambda, -maxFriction, maxFriction);
      lambda = newImpulse - ccp.tangentImpulse;
      var Px = this.tangent.x * lambda;
      var Py = this.tangent.y * lambda;
      vA.x = vA.x - (Px * invMassA);
      vA.y = vA.y - (Py * invMassA);
      wA -= (invIA * (ccp.rA.x * Py - ccp.rA.y * Px));
      vB.x = vB.x + (Px * invMassB);
      vB.y = vB.y + (Py * invMassB);
      wB += (invIB * (ccp.rB.x * Py - ccp.rB.y * Px));
      ccp.tangentImpulse = newImpulse;
    }
    if (c.pointCount == (1)) {
      var ccp = c.points[(0)];
      var a1 = ccp.rA;
      this.dv.x = -wB * ccp.rB.y + vB.x - vA.x + wA * a1.y;
      this.dv.y = wB * ccp.rB.x + vB.y - vA.y - wA * a1.x;
      var b = c.normal;
      var vn = this.dv.x * b.x + this.dv.y * b.y;
      var lambda = -ccp.normalMass * (vn - ccp.velocityBias);
      var a = ccp.normalImpulse + lambda;
      var newImpulse = (a > (0) ? a : (0));
      lambda = newImpulse - ccp.normalImpulse;
      var Px = c.normal.x * lambda;
      var Py = c.normal.y * lambda;
      vA.x = vA.x - (Px * invMassA);
      vA.y = vA.y - (Py * invMassA);
      wA -= (invIA * (ccp.rA.x * Py - ccp.rA.y * Px));
      vB.x = vB.x + (Px * invMassB);
      vB.y = vB.y + (Py * invMassB);
      wB += (invIB * (ccp.rB.x * Py - ccp.rB.y * Px));
      ccp.normalImpulse = newImpulse;
    }
    else {
      var cp1 = c.points[(0)];
      var cp2 = c.points[(1)];
      var a = new Vector(cp1.normalImpulse, cp2.normalImpulse);
      this.dv1.x = -wB * cp1.rB.y + vB.x - vA.x + wA * cp1.rA.y;
      this.dv1.y = wB * cp1.rB.x + vB.y - vA.y - wA * cp1.rA.x;
      this.dv2.x = -wB * cp2.rB.y + vB.x - vA.x + wA * cp2.rA.y;
      this.dv2.y = wB * cp2.rB.x + vB.y - vA.y - wA * cp2.rA.x;
      var vn1 = this.dv1.x * c.normal.x + this.dv1.y * c.normal.y;
      var vn2 = this.dv2.x * c.normal.x + this.dv2.y * c.normal.y;
      var b = new Vector(vn1 - cp1.velocityBias, vn2 - cp2.velocityBias);
      this.temp2.x = c.K.col1.x * a.x + c.K.col2.x * a.y;
      this.temp2.y = c.K.col1.y * a.x + c.K.col2.y * a.y;
      b.x = b.x - this.temp2.x;
      b.y = b.y - this.temp2.y;
      while (true) {
        Matrix22.mulMatrixAndVectorToOut(c.normalMass, b, this.x);
        this.x.mulLocal((-1));
        if (this.x.x >= (0) && this.x.y >= (0)) {
          this.d.setFrom(this.x).subLocal(a);
          this.P1.setFrom(c.normal).mulLocal(this.d.x);
          this.P2.setFrom(c.normal).mulLocal(this.d.y);
          this.temp1.setFrom(this.P1).addLocal(this.P2);
          this.temp2.setFrom(this.temp1).mulLocal(invMassA);
          vA.subLocal(this.temp2);
          this.temp2.setFrom(this.temp1).mulLocal(invMassB);
          vB.addLocal(this.temp2);
          wA -= (invIA * (Vector.crossVectors(cp1.rA, this.P1) + Vector.crossVectors(cp2.rA, this.P2)));
          wB += (invIB * (Vector.crossVectors(cp1.rB, this.P1) + Vector.crossVectors(cp2.rB, this.P2)));
          cp1.normalImpulse = this.x.x;
          cp2.normalImpulse = this.x.y;
          break;
        }
        this.x.x = -cp1.normalMass * b.x;
        this.x.y = (0);
        vn1 = (0);
        vn2 = c.K.col1.y * this.x.x + b.y;
        if (this.x.x >= (0) && vn2 >= (0)) {
          this.d.setFrom(this.x).subLocal(a);
          this.P1.setFrom(c.normal).mulLocal(this.d.x);
          this.P2.setFrom(c.normal).mulLocal(this.d.y);
          this.temp1.setFrom(this.P1).addLocal(this.P2);
          this.temp2.setFrom(this.temp1).mulLocal(invMassA);
          vA.subLocal(this.temp2);
          this.temp2.setFrom(this.temp1).mulLocal(invMassB);
          vB.addLocal(this.temp2);
          wA -= (invIA * (Vector.crossVectors(cp1.rA, this.P1) + Vector.crossVectors(cp2.rA, this.P2)));
          wB += (invIB * (Vector.crossVectors(cp1.rB, this.P1) + Vector.crossVectors(cp2.rB, this.P2)));
          cp1.normalImpulse = this.x.x;
          cp2.normalImpulse = this.x.y;
          break;
        }
        this.x.x = (0);
        this.x.y = -cp2.normalMass * b.y;
        vn1 = c.K.col2.x * this.x.y + b.x;
        vn2 = (0);
        if (this.x.y >= (0) && vn1 >= (0)) {
          this.d.setFrom(this.x).subLocal(a);
          this.P1.setFrom(c.normal).mulLocal(this.d.x);
          this.P2.setFrom(c.normal).mulLocal(this.d.y);
          this.temp1.setFrom(this.P1).addLocal(this.P2);
          this.temp2.setFrom(this.temp1).mulLocal(invMassA);
          vA.subLocal(this.temp2);
          this.temp2.setFrom(this.temp1).mulLocal(invMassB);
          vB.addLocal(this.temp2);
          wA -= (invIA * (Vector.crossVectors(cp1.rA, this.P1) + Vector.crossVectors(cp2.rA, this.P2)));
          wB += (invIB * (Vector.crossVectors(cp1.rB, this.P1) + Vector.crossVectors(cp2.rB, this.P2)));
          cp1.normalImpulse = this.x.x;
          cp2.normalImpulse = this.x.y;
          break;
        }
        this.x.x = (0);
        this.x.y = (0);
        vn1 = b.x;
        vn2 = b.y;
        if (vn1 >= (0) && vn2 >= (0)) {
          this.d.setFrom(this.x).subLocal(a);
          this.P1.setFrom(c.normal).mulLocal(this.d.x);
          this.P2.setFrom(c.normal).mulLocal(this.d.y);
          this.temp1.setFrom(this.P1).addLocal(this.P2);
          this.temp2.setFrom(this.temp1).mulLocal(invMassA);
          vA.subLocal(this.temp2);
          this.temp2.setFrom(this.temp1).mulLocal(invMassB);
          vB.addLocal(this.temp2);
          wA -= (invIA * (Vector.crossVectors(cp1.rA, this.P1) + Vector.crossVectors(cp2.rA, this.P2)));
          wB += (invIB * (Vector.crossVectors(cp1.rB, this.P1) + Vector.crossVectors(cp2.rB, this.P2)));
          cp1.normalImpulse = this.x.x;
          cp2.normalImpulse = this.x.y;
          break;
        }
        break;
      }
    }
    bodyA.get$linearVelocity().setFrom(vA);
    bodyA.set$angularVelocity(wA);
    bodyB.get$linearVelocity().setFrom(vB);
    bodyB.set$angularVelocity(wB);
  }
}
ContactSolver.prototype.storeImpulses = function() {
  for (var i = (0);
   i < this.constraintCount; i++) {
    var c = this.constraints[i];
    var m = c.manifold;
    for (var j = (0);
     j < c.pointCount; j++) {
      m.points[j].normalImpulse = c.points[j].normalImpulse;
      m.points[j].tangentImpulse = c.points[j].tangentImpulse;
    }
  }
}
ContactSolver.prototype.solvePositionConstraints = function(baumgarte) {
  var $0, $1;
  var minSeparation = (0);
  for (var i = (0);
   i < this.constraintCount; ++i) {
    var c = this.constraints[i];
    var bodyA = c.bodyA;
    var bodyB = c.bodyB;
    var invMassA = bodyA.mass * bodyA.invMass;
    var invIA = bodyA.mass * bodyA.invInertia;
    var invMassB = bodyB.mass * bodyB.invMass;
    var invIB = bodyB.mass * bodyB.invInertia;
    for (var j = (0);
     j < c.pointCount; ++j) {
      var psm = this.psolver;
      psm.initialize(c, j);
      var normal = psm.normal;
      var point = psm.point;
      var separation = psm.separation;
      this.rA.setFrom(point).subLocal(bodyA.sweep.center);
      this.rB.setFrom(point).subLocal(bodyB.sweep.center);
      minSeparation = Math.min(minSeparation, separation);
      var C = MathBox.clamp(baumgarte * (separation + (0.005)), (-0.2), (0));
      var rnA = Vector.crossVectors(this.rA, normal);
      var rnB = Vector.crossVectors(this.rB, normal);
      var K = invMassA + invMassB + invIA * rnA * rnA + invIB * rnB * rnB;
      var impulse = K > (0) ? -C / K : (0);
      this.P.setFrom(normal).mulLocal(impulse);
      this.temp1.setFrom(this.P).mulLocal(invMassA);
      bodyA.sweep.center.subLocal(this.temp1);
      ;
      ($0 = bodyA.sweep).angle = $0.angle - (invIA * Vector.crossVectors(this.rA, this.P));
      bodyA.synchronizeTransform();
      this.temp1.setFrom(this.P).mulLocal(invMassB);
      bodyB.sweep.center.addLocal(this.temp1);
      ($1 = bodyB.sweep).angle = $1.angle + (invIB * Vector.crossVectors(this.rB, this.P));
      bodyB.synchronizeTransform();
    }
  }
  return minSeparation >= (-0.0075);
}
// ********** Code for PositionSolverManifold **************
function PositionSolverManifold() {
  this.normal = new Vector((0), (0));
  this.point = new Vector((0), (0));
  this.planePoint = new Vector((0), (0));
  this.pointB = new Vector((0), (0));
  this.temp = new Vector((0), (0));
  this.separation = (0);
  this.clipPoint = new Vector((0), (0));
  this.pointA = new Vector((0), (0));
}
PositionSolverManifold.prototype.initialize = function(cc, index) {
  switch (cc.type) {
    case (0):

      cc.bodyA.getWorldPointToOut(cc.localPoint, this.pointA);
      cc.bodyB.getWorldPointToOut(cc.points[(0)].localPoint, this.pointB);
      if (MathBox.distanceSquared(this.pointA, this.pointB) > (1.4208639999999999e-14)) {
        this.normal.setFrom(this.pointB).subLocal(this.pointA);
        this.normal.normalize();
      }
      else {
        this.normal.setCoords((1), (0));
      }
      this.point.setFrom(this.pointA).addLocal(this.pointB).mulLocal((0.5));
      this.temp.setFrom(this.pointB).subLocal(this.pointA);
      this.separation = Vector.dot(this.temp, this.normal) - cc.radius;
      break;

    case (1):

      cc.bodyA.getWorldVectorToOut(cc.localNormal, this.normal);
      cc.bodyA.getWorldPointToOut(cc.localPoint, this.planePoint);
      cc.bodyB.getWorldPointToOut(cc.points[index].localPoint, this.clipPoint);
      this.temp.setFrom(this.clipPoint).subLocal(this.planePoint);
      this.separation = Vector.dot(this.temp, this.normal) - cc.radius;
      this.point.setFrom(this.clipPoint);
      break;

    case (2):

      cc.bodyB.getWorldVectorToOut(cc.localNormal, this.normal);
      cc.bodyB.getWorldPointToOut(cc.localPoint, this.planePoint);
      cc.bodyA.getWorldPointToOut(cc.points[index].localPoint, this.clipPoint);
      this.temp.setFrom(this.clipPoint).subLocal(this.planePoint);
      this.separation = Vector.dot(this.temp, this.normal) - cc.radius;
      this.point.setFrom(this.clipPoint);
      this.normal.negateLocal();

  }
}
// ********** Code for PolygonAndCircleContact **************
$inherits(PolygonAndCircleContact, Contact);
function PolygonAndCircleContact(argPool) {
  Contact.call(this, argPool);
}
PolygonAndCircleContact.prototype.init = function(fA, fB) {
  Expect.equals((1), fA.get$type());
  Expect.equals((0), fB.get$type());
  Contact.prototype.init.call(this, fA, fB);
}
PolygonAndCircleContact.prototype.evaluate = function(argManifold, xfA, xfB) {
  this.pool.collision.collidePolygonAndCircle(argManifold, this.fixtureA.shape, xfA, this.fixtureB.shape, xfB);
}
// ********** Code for PolygonContact **************
$inherits(PolygonContact, Contact);
function PolygonContact(argPool) {
  Contact.call(this, argPool);
}
PolygonContact.prototype.init = function(fA, fB) {
  Expect.equals((1), fA.get$type());
  Expect.equals((1), fB.get$type());
  Contact.prototype.init.call(this, fA, fB);
}
PolygonContact.prototype.evaluate = function(argManifold, xfA, xfB) {
  this.pool.collision.collidePolygons(argManifold, this.fixtureA.shape, xfA, this.fixtureB.shape, xfB);
}
// ********** Code for TimeOfImpactSolver **************
function TimeOfImpactSolver() {
  this.psm = new TimeOfImpactSolverManifold();
  this.constraints = new Array((4));
  this.rB = new Vector((0), (0));
  this.toiBody = null;
  this.P = new Vector((0), (0));
  this.rA = new Vector((0), (0));
  this.temp = new Vector((0), (0));
  this.count = (0);
  for (var i = (0);
   i < this.constraints.get$length(); i++) {
    this.constraints.$setindex(i, new TimeOfImpactConstraint());
  }
}
TimeOfImpactSolver.prototype.initialize = function(contacts, argCount, argToiBody) {
  this.count = argCount;
  this.toiBody = argToiBody;
  if (this.count >= this.constraints.get$length()) {
    var old = this.constraints;
    var newLen = Math.max(this.count, old.get$length() * (2));
    this.constraints = new Array(newLen);
    this.constraints.setRange$3((0), old.get$length(), old);
    for (var i = old.get$length();
     i < this.constraints.get$length(); i++) {
      this.constraints.$setindex(i, new TimeOfImpactConstraint());
    }
  }
  for (var i = (0);
   i < this.count; i++) {
    var contact = contacts[i];
    var fixtureA = contact.fixtureA;
    var fixtureB = contact.fixtureB;
    var shapeA = fixtureA.shape;
    var shapeB = fixtureB.shape;
    var radiusA = shapeA.radius;
    var radiusB = shapeB.radius;
    var bodyA = fixtureA.body;
    var bodyB = fixtureB.body;
    var manifold = contact.manifold;
    var constraint = this.constraints[i];
    constraint.bodyA = bodyA;
    constraint.bodyB = bodyB;
    constraint.localNormal.setFrom(manifold.localNormal);
    constraint.localPoint.setFrom(manifold.localPoint);
    constraint.type = manifold.type;
    constraint.pointCount = manifold.pointCount;
    constraint.radius = radiusA + radiusB;
    for (var j = (0);
     j < constraint.pointCount; ++j) {
      var cp = manifold.points[j];
      constraint.localPoints.$setindex(j, cp.localPoint);
    }
  }
}
TimeOfImpactSolver.prototype.solve = function(baumgarte) {
  var $0, $1;
  var minSeparation = (0);
  for (var i = (0);
   i < this.count; ++i) {
    var c = this.constraints[i];
    var bodyA = c.bodyA;
    var bodyB = c.bodyB;
    var massA = bodyA.mass;
    var massB = bodyB.mass;
    if ($eq(bodyA, this.toiBody)) {
      massB = (0);
    }
    else {
      massA = (0);
    }
    var invMassA = massA * bodyA.invMass;
    var invIA = massA * bodyA.invInertia;
    var invMassB = massB * bodyB.invMass;
    var invIB = massB * bodyB.invInertia;
    for (var j = (0);
     j < c.pointCount; ++j) {
      this.psm.initialize(c, j);
      var normal = this.psm.normal;
      var point = this.psm.point;
      var separation = this.psm.separation;
      this.rA.setFrom(point).subLocal(bodyA.sweep.center);
      this.rB.setFrom(point).subLocal(bodyB.sweep.center);
      minSeparation = Math.min(minSeparation, separation);
      var C = MathBox.clamp(baumgarte * (separation + (0.005)), (-0.2), (0));
      var rnA = Vector.crossVectors(this.rA, normal);
      var rnB = Vector.crossVectors(this.rB, normal);
      var K = invMassA + invMassB + invIA * rnA * rnA + invIB * rnB * rnB;
      var impulse = K > (0) ? -C / K : (0);
      this.P.setFrom(normal).mulLocal(impulse);
      this.temp.setFrom(this.P).mulLocal(invMassA);
      bodyA.sweep.center.subLocal(this.temp);
      ($0 = bodyA.sweep).angle = $0.angle - (invIA * Vector.crossVectors(this.rA, this.P));
      bodyA.synchronizeTransform();
      this.temp.setFrom(this.P).mulLocal(invMassB);
      bodyB.sweep.center.addLocal(this.temp);
      ($1 = bodyB.sweep).angle = $1.angle + (invIB * Vector.crossVectors(this.rB, this.P));
      bodyB.synchronizeTransform();
    }
  }
  return minSeparation >= (-0.0075);
}
// ********** Code for TimeOfImpactSolverManifold **************
function TimeOfImpactSolverManifold() {
  this.normal = new Vector((0), (0));
  this.point = new Vector((0), (0));
  this.planePoint = new Vector((0), (0));
  this.pointB = new Vector((0), (0));
  this.temp = new Vector((0), (0));
  this.separation = (0);
  this.clipPoint = new Vector((0), (0));
  this.pointA = new Vector((0), (0));
}
TimeOfImpactSolverManifold.prototype.initialize = function(cc, index) {
  switch (cc.type) {
    case (0):

      this.pointA.setFrom(cc.bodyA.getWorldPoint(cc.localPoint));
      this.pointB.setFrom(cc.bodyB.getWorldPoint(cc.localPoints[(0)]));
      if (MathBox.distanceSquared(this.pointA, this.pointB) > (1.4208639999999999e-14)) {
        this.normal.setFrom(this.pointB).subLocal(this.pointA);
        this.normal.normalize();
      }
      else {
        this.normal.setCoords((1), (0));
      }
      this.point.setFrom(this.pointA).addLocal(this.pointB).mulLocal((0.5));
      this.temp.setFrom(this.pointB).subLocal(this.pointA);
      this.separation = Vector.dot(this.temp, this.normal) - cc.radius;
      break;

    case (1):

      this.normal.setFrom(cc.bodyA.getWorldVector(cc.localNormal));
      this.planePoint.setFrom(cc.bodyA.getWorldPoint(cc.localPoint));
      this.clipPoint.setFrom(cc.bodyB.getWorldPoint(cc.localPoints[index]));
      this.temp.setFrom(this.clipPoint).subLocal(this.planePoint);
      this.separation = Vector.dot(this.temp, this.normal) - cc.radius;
      this.point.setFrom(this.clipPoint);
      break;

    case (2):

      this.normal.setFrom(cc.bodyB.getWorldVector(cc.localNormal));
      this.planePoint.setFrom(cc.bodyB.getWorldPoint(cc.localPoint));
      this.clipPoint.setFrom(cc.bodyA.getWorldPoint(cc.localPoints[index]));
      this.temp.setFrom(this.clipPoint).subLocal(this.planePoint);
      this.separation = Vector.dot(this.temp, this.normal) - cc.radius;
      this.point.setFrom(this.clipPoint);
      this.normal.negateLocal();
      break;

  }
}
// ********** Code for TimeOfImpactConstraint **************
function TimeOfImpactConstraint() {
  this.bodyB = null;
  this.pointCount = (0);
  this.localPoints = new Array((2));
  this.radius = (0);
  this.localPoint = new Vector((0), (0));
  this.bodyA = null;
  this.type = (0);
  this.localNormal = new Vector((0), (0));
  for (var i = (0);
   i < this.localPoints.get$length(); i++) {
    this.localPoints.$setindex(i, new Vector((0), (0)));
  }
}
TimeOfImpactConstraint.prototype.get$type = function() { return this.type; };
TimeOfImpactConstraint.prototype.set$type = function(value) { return this.type = value; };
TimeOfImpactConstraint.prototype.get$radius = function() { return this.radius; };
TimeOfImpactConstraint.prototype.set$radius = function(value) { return this.radius = value; };
TimeOfImpactConstraint.prototype.setFrom = function(argOther) {
  for (var i = (0);
   i < this.localPoints.get$length(); i++) {
    this.localPoints[i].setFrom(argOther.localPoints[i]);
  }
  this.localNormal.setFrom(argOther.localNormal);
  this.localPoint.setFrom(argOther.localPoint);
  this.type = argOther.type;
  this.radius = argOther.radius;
  this.pointCount = argOther.pointCount;
  this.bodyA = argOther.bodyA;
  this.bodyB = argOther.bodyB;
}
TimeOfImpactConstraint.prototype.setFrom$1 = TimeOfImpactConstraint.prototype.setFrom;
// ********** Code for Joint **************
function Joint(def) {
  this.collideConnected = def.collideConnected;
  this.edgeA = new JointEdge();
  this._next = null;
  this.localCenterB = new Vector((0), (0));
  this.type = def.type;
  this.bodyB = def.bodyB;
  this.localCenterA = new Vector((0), (0));
  this.bodyA = def.bodyA;
  this.edgeB = new JointEdge();
  this.islandFlag = false;
  this._prev = null;
  this.userData = def.userData;
}
Joint.Joint$create$factory = function(argWorld, def) {
  switch (def.type) {
    case (5):

      $throw(new NotImplementedException());

    case (3):

      return new DistanceJoint(def);

    case (2):

      $throw(new NotImplementedException());

    case (1):

      return new RevoluteJoint(def);

    case (8):

      $throw(new NotImplementedException());

    case (9):

      $throw(new NotImplementedException());

    case (7):

      $throw(new NotImplementedException());

    case (6):

      $throw(new NotImplementedException());

    case (4):

      $throw(new NotImplementedException());

    case (10):

      return new ConstantVolumeJoint(argWorld, def);

  }
  return null;
}
Joint.prototype.get$type = function() { return this.type; };
Joint.prototype.set$type = function(value) { return this.type = value; };
Joint.prototype.getAnchorA = function(argOut) {

}
Joint.prototype.getAnchorB = function(argOut) {

}
Joint.prototype.initVelocityConstraints = function(step) {

}
Joint.prototype.solveVelocityConstraints = function(step) {

}
Joint.prototype.solvePositionConstraints = function(baumgarte) {

}
Joint.prototype.solveVelocityConstraints$1 = Joint.prototype.solveVelocityConstraints;
// ********** Code for JointEdge **************
function JointEdge() {

}
// ********** Code for JointDef **************
function JointDef() {
  this.bodyB = null;
  this.collideConnected = false;
  this.bodyA = null;
  this.type = (0);
  this.userData = null;
}
JointDef.prototype.get$type = function() { return this.type; };
JointDef.prototype.set$type = function(value) { return this.type = value; };
// ********** Code for JointType **************
function JointType() {}
// ********** Code for LimitState **************
function LimitState() {}
// ********** Code for ConstantVolumeJoint **************
$inherits(ConstantVolumeJoint, Joint);
function ConstantVolumeJoint(_world, def) {
  this._impulse = (0);
  this._world = _world;
  Joint.call(this, def);
  if (def.bodies.get$length() <= (2)) {
    $throw(new IllegalArgumentException("You cannot create a constant volume joint with less than three bodies."));
  }
  this.bodies = ListFactory.ListFactory$from$factory(def.bodies);
  this.targetLengths = new Array(this.bodies.get$length());
  for (var i = (0);
   i < this.targetLengths.get$length(); ++i) {
    var next = (i == this.targetLengths.get$length() - (1)) ? (0) : i + (1);
    var temp = new Vector.copy$ctor(this.bodies[i].get$worldCenter());
    temp.subLocal(this.bodies[next].get$worldCenter());
    var dist = temp.get$length();
    this.targetLengths.$setindex(i, dist);
  }
  this.targetVolume = this.get$area();
  if (def.joints != null && def.joints.get$length() != def.bodies.get$length()) {
    $throw(new IllegalArgumentException("Incorrect joint definition.  Joints have to correspond to the bodies"));
  }
  if (def.joints == null) {
    var djd = new DistanceJointDef();
    this.distanceJoints = new Array(this.bodies.get$length());
    for (var i = (0);
     i < this.targetLengths.get$length(); ++i) {
      var next = (i == this.targetLengths.get$length() - (1)) ? (0) : i + (1);
      djd.set$frequencyHz(def.frequencyHz);
      djd.set$dampingRatio(def.dampingRatio);
      djd.initialize$4(this.bodies[i], this.bodies[next], this.bodies[i].get$worldCenter(), this.bodies[next].get$worldCenter());
      this.distanceJoints.$setindex(i, this._world.createJoint(djd));
    }
  }
  else {
    this.distanceJoints = new Array(def.joints.get$length());
    this.distanceJoints.setRange$3((0), def.joints.get$length(), def.joints);
  }
  this.frequencyHz = def.frequencyHz;
  this.dampingRatio = def.dampingRatio;
  this.normals = new Array(this.bodies.get$length());
  for (var i = (0);
   i < this.normals.get$length(); ++i) {
    this.normals.$setindex(i, new Vector((0), (0)));
  }
  this.bodyA = this.bodies[(0)];
  this.bodyB = this.bodies[(1)];
  this.collideConnected = false;
}
ConstantVolumeJoint.prototype.get$frequencyHz = function() { return this.frequencyHz; };
ConstantVolumeJoint.prototype.set$frequencyHz = function(value) { return this.frequencyHz = value; };
ConstantVolumeJoint.prototype.get$dampingRatio = function() { return this.dampingRatio; };
ConstantVolumeJoint.prototype.set$dampingRatio = function(value) { return this.dampingRatio = value; };
ConstantVolumeJoint.prototype.get$area = function() {
  var result = (0);
  result += (this.bodies[this.bodies.get$length() - (1)].get$worldCenter().x * this.bodies[(0)].get$worldCenter().y - this.bodies[(0)].get$worldCenter().x * this.bodies[this.bodies.get$length() - (1)].get$worldCenter().y);
  for (var i = (0);
   i < this.bodies.get$length() - (1); ++i) {
    result += (this.bodies[i].get$worldCenter().x * this.bodies[i + (1)].get$worldCenter().y - this.bodies[i + (1)].get$worldCenter().x * this.bodies[i].get$worldCenter().y);
  }
  result *= (0.5);
  return result;
}
ConstantVolumeJoint.prototype.constrainEdges = function(argStep) {
  var $0, $1;
  var perimeter = (0);
  for (var i = (0);
   i < this.bodies.get$length(); ++i) {
    var next = (i == this.bodies.get$length() - (1)) ? (0) : i + (1);
    var dx = this.bodies[next].get$worldCenter().x - this.bodies[i].get$worldCenter().x;
    var dy = this.bodies[next].get$worldCenter().y - this.bodies[i].get$worldCenter().y;
    var dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < (1.192e-7)) {
      dist = (1);
    }
    this.normals[i].x = dy / dist;
    this.normals[i].y = -dx / dist;
    perimeter += dist;
  }
  var delta = new Vector((0), (0));
  var deltaArea = this.targetVolume - this.get$area();
  var toExtrude = (0.5) * deltaArea / perimeter;
  var done = true;
  for (var i = (0);
   i < this.bodies.get$length(); ++i) {
    var next = (i == this.bodies.get$length() - (1)) ? (0) : i + (1);
    delta.setCoords$2(toExtrude * (this.normals[i].x + this.normals[next].x), toExtrude * (this.normals[i].y + this.normals[next].y));
    var norm = delta.get$length();
    if (norm > (0.2)) {
      delta.mulLocal((0.2) / norm);
    }
    if (norm > (0.005)) {
      done = false;
    }
    ($0 = this.bodies[next].sweep.center).x = $add($0.x, delta.get$x());
    ($1 = this.bodies[next].sweep.center).y = $add($1.y, delta.get$y());
    this.bodies[next].synchronizeTransform();
  }
  return done;
}
ConstantVolumeJoint.prototype.initVelocityConstraints = function(argStep) {
  var $0, $1;
  this.step = argStep;
  var d = new Array(this.bodies.get$length());
  for (var i = (0);
   i < this.bodies.get$length(); i++) {
    d.$setindex(i, new Vector((0), (0)));
  }
  for (var i = (0);
   i < this.bodies.get$length(); ++i) {
    var prev = (i == (0)) ? this.bodies.get$length() - (1) : i - (1);
    var next = (i == this.bodies.get$length() - (1)) ? (0) : i + (1);
    d.$index(i).setFrom$1(this.bodies[next].get$worldCenter());
    d.$index(i).subLocal(this.bodies[prev].get$worldCenter());
  }
  if (this.step.warmStarting) {
    this._impulse = this._impulse * this.step.dtRatio;
    for (var i = (0);
     i < this.bodies.get$length(); ++i) {
      ($0 = this.bodies[i].get$linearVelocity()).x = $0.x + ($mul(this.bodies[i].invMass, d.$index(i).get$y()) * (0.5) * this._impulse);
      ($1 = this.bodies[i].get$linearVelocity()).y = $1.y + (this.bodies[i].invMass * $negate(d.$index(i).get$x()) * (0.5) * this._impulse);
    }
  }
  else {
    this._impulse = (0);
  }
}
ConstantVolumeJoint.prototype.solvePositionConstraints = function(baumgarte) {
  return this.constrainEdges(this.step);
}
ConstantVolumeJoint.prototype.solveVelocityConstraints = function(argStep) {
  var $0, $1;
  var crossMassSum = (0);
  var dotMassSum = (0);
  var d = new Array(this.bodies.get$length());
  for (var i = (0);
   i < this.bodies.get$length(); i++) {
    d.$setindex(i, new Vector((0), (0)));
  }
  for (var i = (0);
   i < this.bodies.get$length(); ++i) {
    var prev = (i == (0)) ? this.bodies.get$length() - (1) : i - (1);
    var next = (i == this.bodies.get$length() - (1)) ? (0) : i + (1);
    d.$index(i).setFrom$1(this.bodies[next].get$worldCenter());
    d.$index(i).subLocal(this.bodies[prev].get$worldCenter());
    dotMassSum += ((d.$index(i).get$lengthSquared()) / this.bodies[i].mass);
    crossMassSum += Vector.crossVectors(this.bodies[i].get$linearVelocity(), d.$index(i));
  }
  var lambda = (-2) * crossMassSum / dotMassSum;
  this._impulse = this._impulse + lambda;
  for (var i = (0);
   i < this.bodies.get$length(); ++i) {
    ($0 = this.bodies[i].get$linearVelocity()).x = $0.x + ($mul(this.bodies[i].invMass, d.$index(i).get$y()) * (0.5) * lambda);
    ($1 = this.bodies[i].get$linearVelocity()).y = $1.y + (this.bodies[i].invMass * $negate(d.$index(i).get$x()) * (0.5) * lambda);
  }
}
ConstantVolumeJoint.prototype.getAnchorA = function(argOut) {
  $throw(new NotImplementedException());
}
ConstantVolumeJoint.prototype.getAnchorB = function(argOut) {
  $throw(new NotImplementedException());
}
ConstantVolumeJoint.prototype.solveVelocityConstraints$1 = ConstantVolumeJoint.prototype.solveVelocityConstraints;
// ********** Code for DistanceJoint **************
$inherits(DistanceJoint, Joint);
function DistanceJoint(def) {
  this.dampingRatio = def.dampingRatio;
  this.gamma = (0);
  this.localAnchor2 = new Vector.copy$ctor(def.localAnchorB);
  this.bias = (0);
  this.u = new Vector((0), (0));
  this.impulse = (0);
  this.frequencyHz = def.frequencyHz;
  this.localAnchor1 = new Vector.copy$ctor(def.localAnchorA);
  this.length = def.length;
  Joint.call(this, def);
}
DistanceJoint.prototype.get$length = function() { return this.length; };
DistanceJoint.prototype.set$length = function(value) { return this.length = value; };
DistanceJoint.prototype.get$frequencyHz = function() { return this.frequencyHz; };
DistanceJoint.prototype.set$frequencyHz = function(value) { return this.frequencyHz = value; };
DistanceJoint.prototype.get$dampingRatio = function() { return this.dampingRatio; };
DistanceJoint.prototype.set$dampingRatio = function(value) { return this.dampingRatio = value; };
DistanceJoint.prototype.getAnchorA = function(argOut) {
  this.bodyA.getWorldPointToOut(this.localAnchor1, argOut);
}
DistanceJoint.prototype.getAnchorB = function(argOut) {
  this.bodyB.getWorldPointToOut(this.localAnchor2, argOut);
}
DistanceJoint.prototype.initVelocityConstraints = function(step) {
  var $0, $1, $2, $3, $4, $5;
  var b1 = this.bodyA;
  var b2 = this.bodyB;
  var r1 = new Vector((0), (0));
  var r2 = new Vector((0), (0));
  r1.setFrom(this.localAnchor1).subLocal(b1.get$localCenter());
  r2.setFrom(this.localAnchor2).subLocal(b2.get$localCenter());
  Matrix22.mulMatrixAndVectorToOut(b1.originTransform.rotation, r1, r1);
  Matrix22.mulMatrixAndVectorToOut(b2.originTransform.rotation, r2, r2);
  this.u.x = b2.sweep.center.x + r2.x - b1.sweep.center.x - r1.x;
  this.u.y = b2.sweep.center.y + r2.y - b1.sweep.center.y - r1.y;
  var len = this.u.get$length();
  if (len > (0.005)) {
    ($0 = this.u).x = $0.x * ((1) / len);
    ($1 = this.u).y = $1.y * ((1) / len);
  }
  else {
    this.u.setCoords((0), (0));
  }
  var cr1u = Vector.crossVectors(r1, this.u);
  var cr2u = Vector.crossVectors(r2, this.u);
  var invMass = b1.invMass + b1.invInertia * cr1u * cr1u + b2.invMass + b2.invInertia * cr2u * cr2u;
  this.mass = (1) / invMass;
  if (this.frequencyHz > (0)) {
    var C = len - this.length;
    var omega = (6.283185307179586) * this.frequencyHz;
    var d = (2) * this.mass * this.dampingRatio * omega;
    var k = this.mass * omega * omega;
    this.gamma = step.dt * (d + step.dt * k);
    this.gamma = this.gamma != (0) ? (1) / this.gamma : (0);
    this.bias = C * step.dt * k * this.gamma;
    this.mass = invMass + this.gamma;
    this.mass = this.mass != (0) ? (1) / this.mass : (0);
  }
  if (step.warmStarting) {
    this.impulse = this.impulse * step.dtRatio;
    var P = new Vector((0), (0));
    P.setFrom(this.u).mulLocal(this.impulse);
    ($2 = b1.get$linearVelocity()).x = $2.x - (b1.invMass * P.x);
    ($3 = b1.get$linearVelocity()).y = $3.y - (b1.invMass * P.y);
    b1.set$angularVelocity(b1.get$angularVelocity() - (b1.invInertia * Vector.crossVectors(r1, P)));
    ($4 = b2.get$linearVelocity()).x = $4.x + (b2.invMass * P.x);
    ($5 = b2.get$linearVelocity()).y = $5.y + (b2.invMass * P.y);
    b2.set$angularVelocity(b2.get$angularVelocity() + (b2.invInertia * Vector.crossVectors(r2, P)));
  }
  else {
    this.impulse = (0);
  }
}
DistanceJoint.prototype.solveVelocityConstraints = function(step) {
  var $0, $1, $2, $3;
  var b1 = this.bodyA;
  var b2 = this.bodyB;
  var r1 = new Vector((0), (0));
  var r2 = new Vector((0), (0));
  r1.setFrom$1(this.localAnchor1).subLocal(b1.get$localCenter());
  r2.setFrom$1(this.localAnchor2).subLocal(b2.get$localCenter());
  Matrix22.mulMatrixAndVectorToOut(b1.originTransform.rotation, r1, r1);
  Matrix22.mulMatrixAndVectorToOut(b2.originTransform.rotation, r2, r2);
  var v1 = new Vector((0), (0));
  var v2 = new Vector((0), (0));
  Vector.crossNumAndVectorToOut(b1.get$angularVelocity(), r1, v1);
  Vector.crossNumAndVectorToOut(b2.get$angularVelocity(), r2, v2);
  v1.addLocal(b1.get$linearVelocity());
  v2.addLocal(b2.get$linearVelocity());
  var Cdot = Vector.dot(this.u, v2.subLocal(v1));
  var imp = -this.mass * (Cdot + this.bias + this.gamma * this.impulse);
  this.impulse = this.impulse + imp;
  var Px = imp * this.u.x;
  var Py = imp * this.u.y;
  ($0 = b1.get$linearVelocity()).x = $0.x - (b1.invMass * Px);
  ($1 = b1.get$linearVelocity()).y = $1.y - (b1.invMass * Py);
  b1.set$angularVelocity(b1.get$angularVelocity() - (b1.invInertia * ($mul(r1.get$x(), Py) - $mul(r1.get$y(), Px))));
  ($2 = b2.get$linearVelocity()).x = $2.x + (b2.invMass * Px);
  ($3 = b2.get$linearVelocity()).y = $3.y + (b2.invMass * Py);
  b2.set$angularVelocity(b2.get$angularVelocity() + (b2.invInertia * ($mul(r2.get$x(), Py) - $mul(r2.get$y(), Px))));
}
DistanceJoint.prototype.solvePositionConstraints = function(baumgarte) {
  var $0, $1, $2, $3, $4, $5;
  if (this.frequencyHz > (0)) {
    return true;
  }
  var b1 = this.bodyA;
  var b2 = this.bodyB;
  var r1 = new Vector((0), (0));
  var r2 = new Vector((0), (0));
  var d = new Vector((0), (0));
  r1.setFrom$1(this.localAnchor1).subLocal(b1.get$localCenter());
  r2.setFrom$1(this.localAnchor2).subLocal(b2.get$localCenter());
  Matrix22.mulMatrixAndVectorToOut(b1.get$originTransform().rotation, r1, r1);
  Matrix22.mulMatrixAndVectorToOut(b2.get$originTransform().rotation, r2, r2);
  d.set$x($sub($add(b2.get$sweep().center.x, r2.get$x()) - b1.get$sweep().center.x, r1.get$x()));
  d.set$y($sub($add(b2.get$sweep().center.y, r2.get$y()) - b1.get$sweep().center.y, r1.get$y()));
  var len = d.normalize();
  var C = len - this.length;
  C = MathBox.clamp(C, (-0.2), (0.2));
  var imp = -this.mass * C;
  this.u.setFrom(d);
  var Px = imp * this.u.x;
  var Py = imp * this.u.y;
  ($0 = b1.get$sweep().center).x = $0.x - (b1.get$invMass() * Px);
  ($1 = b1.get$sweep().center).y = $1.y - (b1.get$invMass() * Py);
  ($2 = b1.get$sweep()).angle = $2.angle - (b1.get$invInertia() * ($mul(r1.get$x(), Py) - $mul(r1.get$y(), Px)));
  ($3 = b2.get$sweep().center).x = $3.x + (b2.get$invMass() * Px);
  ($4 = b2.get$sweep().center).y = $4.y + (b2.get$invMass() * Py);
  ($5 = b2.get$sweep()).angle = $5.angle + (b2.get$invInertia() * ($mul(r2.get$x(), Py) - $mul(r2.get$y(), Px)));
  b1.synchronizeTransform();
  b2.synchronizeTransform();
  return C.abs() < (0.005);
}
DistanceJoint.prototype.solveVelocityConstraints$1 = DistanceJoint.prototype.solveVelocityConstraints;
// ********** Code for DistanceJointDef **************
$inherits(DistanceJointDef, JointDef);
function DistanceJointDef() {
  this.localAnchorA = new Vector((0), (0));
  this.dampingRatio = (0);
  this.localAnchorB = new Vector((0), (0));
  this.frequencyHz = (0);
  this.length = (1);
  JointDef.call(this);
  this.type = (3);
}
DistanceJointDef.prototype.get$length = function() { return this.length; };
DistanceJointDef.prototype.set$length = function(value) { return this.length = value; };
DistanceJointDef.prototype.get$frequencyHz = function() { return this.frequencyHz; };
DistanceJointDef.prototype.set$frequencyHz = function(value) { return this.frequencyHz = value; };
DistanceJointDef.prototype.get$dampingRatio = function() { return this.dampingRatio; };
DistanceJointDef.prototype.set$dampingRatio = function(value) { return this.dampingRatio = value; };
DistanceJointDef.prototype.initialize = function(b1, b2, anchor1, anchor2) {
  this.bodyA = b1;
  this.bodyB = b2;
  this.localAnchorA.setFrom(this.bodyA.getLocalPoint(anchor1));
  this.localAnchorB.setFrom(this.bodyB.getLocalPoint(anchor2));
  var d = new Vector.copy$ctor(anchor2);
  d.subLocal(anchor1);
  this.length = d.get$length();
}
DistanceJointDef.prototype.initialize$4 = DistanceJointDef.prototype.initialize;
// ********** Code for RevoluteJoint **************
$inherits(RevoluteJoint, Joint);
function RevoluteJoint(def) {
  this.localAnchor2 = new Vector((0), (0));
  this.impulse = new Vector3((0), (0), (0));
  this.localAnchor1 = new Vector((0), (0));
  this._motorImpulse = (0);
  this.mass = new Matrix33();
  Joint.call(this, def);
  this.localAnchor1.setFrom(def.localAnchorA);
  this.localAnchor2.setFrom(def.localAnchorB);
  this.referenceAngle = def.referenceAngle;
  this._motorImpulse = (0);
  this.lowerAngle = def.lowerAngle;
  this.upperAngle = def.upperAngle;
  this._maxMotorTorque = def.maxMotorTorque;
  this._motorSpeed = def.motorSpeed;
  this._enableLimit = def.enableLimit;
  this._enableMotor = def.enableMotor;
}
RevoluteJoint.prototype.initVelocityConstraints = function(step) {
  var b1 = this.bodyA;
  var b2 = this.bodyB;
  if (this._enableMotor || this._enableLimit) {
  }
  var r1 = new Vector((0), (0));
  var r2 = new Vector((0), (0));
  r1.setFrom(this.localAnchor1).subLocal(b1.get$localCenter());
  r2.setFrom(this.localAnchor2).subLocal(b2.get$localCenter());
  Matrix22.mulMatrixAndVectorToOut(b1.originTransform.rotation, r1, r1);
  Matrix22.mulMatrixAndVectorToOut(b2.originTransform.rotation, r2, r2);
  var m1 = b1.invMass, m2 = b2.invMass;
  var i1 = b1.invInertia, i2 = b2.invInertia;
  this.mass.col1.x = m1 + m2 + r1.y * r1.y * i1 + r2.y * r2.y * i2;
  this.mass.col2.x = -r1.y * r1.x * i1 - r2.y * r2.x * i2;
  this.mass.col3.x = -r1.y * i1 - r2.y * i2;
  this.mass.col1.y = this.mass.col2.x;
  this.mass.col2.y = m1 + m2 + r1.x * r1.x * i1 + r2.x * r2.x * i2;
  this.mass.col3.y = r1.x * i1 + r2.x * i2;
  this.mass.col1.z = this.mass.col3.x;
  this.mass.col2.z = this.mass.col3.y;
  this.mass.col3.z = i1 + i2;
  this.motorMass = i1 + i2;
  if (this.motorMass > (0)) {
    this.motorMass = (1) / this.motorMass;
  }
  if ($eq(this._enableMotor, false)) {
    this._motorImpulse = (0);
  }
  if (this._enableLimit) {
    var jointAngle = b2.sweep.angle - b1.sweep.angle - this.referenceAngle;
    if ((this.upperAngle - this.lowerAngle).abs() < (0.06981317007977318)) {
      this.limitState = (3);
    }
    else if (jointAngle <= this.lowerAngle) {
      if (this.limitState != (1)) {
        this.impulse.z = (0);
      }
      this.limitState = (1);
    }
    else if (jointAngle >= this.upperAngle) {
      if (this.limitState != (2)) {
        this.impulse.z = (0);
      }
      this.limitState = (2);
    }
    else {
      this.limitState = (0);
      this.impulse.z = (0);
    }
  }
  else {
    this.limitState = (0);
  }
  if (step.warmStarting) {
    this.impulse.mulLocal(step.dtRatio);
    this._motorImpulse = this._motorImpulse * step.dtRatio;
    var temp = new Vector((0), (0));
    var P = new Vector((0), (0));
    P.setCoords(this.impulse.x, this.impulse.y);
    temp.setFrom(P).mulLocal(m1);
    b1.get$linearVelocity().subLocal(temp);
    b1.set$angularVelocity(b1.get$angularVelocity() - (i1 * (Vector.crossVectors(r1, P) + this._motorImpulse + this.impulse.z)));
    temp.setFrom(P).mulLocal(m2);
    b2.get$linearVelocity().addLocal(temp);
    b2.set$angularVelocity(b2.get$angularVelocity() + (i2 * (Vector.crossVectors(r2, P) + this._motorImpulse + this.impulse.z)));
  }
  else {
    this.impulse.setZero();
    this._motorImpulse = (0);
  }
}
RevoluteJoint.prototype.solveVelocityConstraints = function(step) {
  var $0, $1, $2, $3, $4, $5;
  var b1 = this.bodyA;
  var b2 = this.bodyB;
  var v1 = b1.get$linearVelocity();
  var w1 = b1.get$angularVelocity();
  var v2 = b2.get$linearVelocity();
  var w2 = b2.get$angularVelocity();
  var m1 = b1.invMass, m2 = b2.invMass;
  var i1 = b1.invInertia, i2 = b2.invInertia;
  if (this._enableMotor && this.limitState != (3)) {
    var Cdot = w2 - w1 - this._motorSpeed;
    var imp = this.motorMass * (-Cdot);
    var oldImpulse = this._motorImpulse;
    var maxImpulse = step.dt * this._maxMotorTorque;
    this._motorImpulse = MathBox.clamp(this._motorImpulse + imp, -maxImpulse, maxImpulse);
    imp = this._motorImpulse - oldImpulse;
    w1 -= (i1 * imp);
    w2 += (i2 * imp);
  }
  var temp = new Vector((0), (0));
  var r1 = new Vector((0), (0));
  var r2 = new Vector((0), (0));
  if (this._enableLimit && this.limitState != (0)) {
    r1.setFrom(this.localAnchor1).subLocal(b1.get$localCenter());
    r2.setFrom(this.localAnchor2).subLocal(b2.get$localCenter());
    Matrix22.mulMatrixAndVectorToOut(b1.originTransform.rotation, r1, r1);
    Matrix22.mulMatrixAndVectorToOut(b2.originTransform.rotation, r2, r2);
    var Cdot1 = new Vector((0), (0));
    var Cdot = new Vector3((0), (0), (0));
    Vector.crossNumAndVectorToOut(w1, r1, temp);
    Vector.crossNumAndVectorToOut(w2, r2, Cdot1);
    Cdot1.addLocal(v2).subLocal(v1).subLocal(temp);
    var Cdot2 = w2 - w1;
    Cdot.setCoords(Cdot1.x, Cdot1.y, Cdot2);
    var imp = new Vector3((0), (0), (0));
    this.mass.solve33ToOut(Cdot.negateLocal(), imp);
    if (this.limitState == (3)) {
      this.impulse.addLocal(imp);
    }
    else if (this.limitState == (1)) {
      var newImpulse = this.impulse.z + imp.z;
      if (newImpulse < (0)) {
        this.mass.solve22ToOut(Cdot1.negateLocal(), temp);
        imp.x = temp.x;
        imp.y = temp.y;
        imp.z = -this.impulse.z;
        ($0 = this.impulse).x = $0.x + temp.x;
        ($1 = this.impulse).y = $1.y + temp.y;
        this.impulse.z = (0);
      }
    }
    else if (this.limitState == (2)) {
      var newImpulse = this.impulse.z + imp.z;
      if (newImpulse > (0)) {
        this.mass.solve22ToOut(Cdot1.negateLocal(), temp);
        imp.x = temp.x;
        imp.y = temp.y;
        imp.z = -this.impulse.z;
        ($2 = this.impulse).x = $2.x + temp.x;
        ($3 = this.impulse).y = $3.y + temp.y;
        this.impulse.z = (0);
      }
    }
    var P = new Vector((0), (0));
    P.setCoords(imp.x, imp.y);
    temp.setFrom(P).mulLocal(m1);
    v1.subLocal(temp);
    w1 -= (i1 * (Vector.crossVectors(r1, P) + imp.z));
    temp.setFrom(P).mulLocal(m2);
    v2.addLocal(temp);
    w2 += (i2 * (Vector.crossVectors(r2, P) + imp.z));
  }
  else {
    r1.setFrom(this.localAnchor1).subLocal(b1.get$localCenter());
    r2.setFrom(this.localAnchor2).subLocal(b2.get$localCenter());
    Matrix22.mulMatrixAndVectorToOut(b1.originTransform.rotation, r1, r1);
    Matrix22.mulMatrixAndVectorToOut(b2.originTransform.rotation, r2, r2);
    var Cdot = new Vector((0), (0));
    var imp = new Vector((0), (0));
    Vector.crossNumAndVectorToOut(w1, r1, temp);
    Vector.crossNumAndVectorToOut(w2, r2, Cdot);
    Cdot.addLocal(v2).subLocal(v1).subLocal(temp);
    this.mass.solve22ToOut(Cdot.negateLocal(), imp);
    ($4 = this.impulse).x = $4.x + imp.x;
    ($5 = this.impulse).y = $5.y + imp.y;
    temp.setFrom(imp).mulLocal(m1);
    v1.subLocal(temp);
    w1 -= (i1 * Vector.crossVectors(r1, imp));
    temp.setFrom(imp).mulLocal(m2);
    v2.addLocal(temp);
    w2 += (i2 * Vector.crossVectors(r2, imp));
  }
  b1.set$angularVelocity(w1);
  b2.set$angularVelocity(w2);
}
RevoluteJoint.prototype.solvePositionConstraints = function(baumgarte) {
  var $0, $1, $2, $3;
  var b1 = this.bodyA;
  var b2 = this.bodyB;
  var angularError = (0);
  var positionError = (0);
  if (this._enableLimit && this.limitState != (0)) {
    var angle = b2.sweep.angle - b1.sweep.angle - this.referenceAngle;
    var limitImpulse = (0);
    if (this.limitState == (3)) {
      var C = MathBox.clamp(angle - this.lowerAngle, (-0.13962634015954636), (0.13962634015954636));
      limitImpulse = -this.motorMass * C;
      angularError = C.abs();
    }
    else if (this.limitState == (1)) {
      var C = angle - this.lowerAngle;
      angularError = -C;
      C = MathBox.clamp(C + (0.03490658503988659), (-0.13962634015954636), (0));
      limitImpulse = -this.motorMass * C;
    }
    else if (this.limitState == (2)) {
      var C = angle - this.upperAngle;
      angularError = C;
      C = MathBox.clamp(C - (0.03490658503988659), (0), (0.13962634015954636));
      limitImpulse = -this.motorMass * C;
    }
    ($0 = b1.sweep).angle = $0.angle - (b1.invInertia * limitImpulse);
    ($1 = b2.sweep).angle = $1.angle + (b2.invInertia * limitImpulse);
    b1.synchronizeTransform();
    b2.synchronizeTransform();
  }
  {
    var imp = new Vector((0), (0));
    var r1 = new Vector((0), (0));
    var r2 = new Vector((0), (0));
    var C = new Vector((0), (0));
    r1.setFrom(this.localAnchor1).subLocal(b1.get$localCenter());
    r2.setFrom(this.localAnchor2).subLocal(b2.get$localCenter());
    Matrix22.mulMatrixAndVectorToOut(b1.originTransform.rotation, r1, r1);
    Matrix22.mulMatrixAndVectorToOut(b2.originTransform.rotation, r2, r2);
    C.setFrom(b2.sweep.center).addLocal(r2);
    C.subLocal(b1.sweep.center).subLocal(r1);
    positionError = C.get$length();
    var invMass1 = b1.invMass, invMass2 = b2.invMass;
    var invI1 = b1.invInertia, invI2 = b2.invInertia;
    var k_allowedStretch = (0.05);
    if (C.get$lengthSquared() > k_allowedStretch * k_allowedStretch) {
      var u = new Vector((0), (0));
      var m = invMass1 + invMass2;
      if (m > (0)) {
        m = (1) / m;
      }
      imp.setFrom(C).negateLocal().mulLocal(m);
      var k_beta = (0.5);
      u.setFrom(imp).mulLocal(k_beta * invMass1);
      b1.sweep.center.subLocal(u);
      u.setFrom(imp).mulLocal(k_beta * invMass2);
      b2.sweep.center.addLocal(u);
      C.setFrom(b2.sweep.center).addLocal(r2);
      C.subLocal(b1.sweep.center).subLocal(r1);
    }
    var K1 = new Matrix22();
    K1.col1.x = invMass1 + invMass2;
    K1.col2.x = (0);
    K1.col1.y = (0);
    K1.col2.y = invMass1 + invMass2;
    var K2 = new Matrix22();
    K2.col1.x = invI1 * r1.y * r1.y;
    K2.col2.x = -invI1 * r1.x * r1.y;
    K2.col1.y = -invI1 * r1.x * r1.y;
    K2.col2.y = invI1 * r1.x * r1.x;
    var K3 = new Matrix22();
    K3.col1.x = invI2 * r2.y * r2.y;
    K3.col2.x = -invI2 * r2.x * r2.y;
    K3.col1.y = -invI2 * r2.x * r2.y;
    K3.col2.y = invI2 * r2.x * r2.x;
    K1.addLocal(K2).addLocal(K3);
    K1.solveToOut(C.negateLocal(), imp);
    C.setFrom(imp).mulLocal(b1.invMass);
    b1.sweep.center.subLocal(C);
    ($2 = b1.sweep).angle = $2.angle - (b1.invInertia * Vector.crossVectors(r1, imp));
    C.setFrom(imp).mulLocal(b2.invMass);
    b2.sweep.center.addLocal(C);
    ($3 = b2.sweep).angle = $3.angle + (b2.invInertia * Vector.crossVectors(r2, imp));
    b1.synchronizeTransform();
    b2.synchronizeTransform();
  }
  return positionError <= (0.005) && angularError <= (0.03490658503988659);
}
RevoluteJoint.prototype.getAnchorA = function(argOut) {
  this.bodyA.getWorldPointToOut(this.localAnchor1, argOut);
}
RevoluteJoint.prototype.getAnchorB = function(argOut) {
  this.bodyB.getWorldPointToOut(this.localAnchor2, argOut);
}
RevoluteJoint.prototype.solveVelocityConstraints$1 = RevoluteJoint.prototype.solveVelocityConstraints;
// ********** Code for RevoluteJointDef **************
$inherits(RevoluteJointDef, JointDef);
function RevoluteJointDef() {
  this.upperAngle = (0);
  this.enableLimit = false;
  this.maxMotorTorque = (0);
  this.localAnchorA = new Vector((0), (0));
  this.motorSpeed = (0);
  this.lowerAngle = (0);
  this.localAnchorB = new Vector((0), (0));
  this.enableMotor = false;
  this.referenceAngle = (0);
  JointDef.call(this);
  this.type = (1);
}
RevoluteJointDef.prototype.initialize = function(b1, b2, anchor) {
  this.bodyA = b1;
  this.bodyB = b2;
  this.bodyA.getLocalPointToOut(anchor, this.localAnchorA);
  this.bodyB.getLocalPointToOut(anchor, this.localAnchorB);
  this.referenceAngle = this.bodyA.get$angle() - this.bodyB.get$angle();
}
// ********** Code for DefaultWorldPool **************
function DefaultWorldPool() {
  this.distance = new Distance._construct$ctor();
  this.collision = new Collision._construct$ctor(this);
  this.timeOfImpact = new TimeOfImpact._construct$ctor(this);
}
DefaultWorldPool.prototype.getCircleContactStack = function() {
  var queue = new DoubleLinkedQueue_CircleContact();
  for (var i = (0);
   i < (10); i++) {
    queue.addFirst(new CircleContact(this));
  }
  return queue;
}
DefaultWorldPool.prototype.getPolyCircleContactStack = function() {
  var queue = new DoubleLinkedQueue_PolygonAndCircleContact();
  for (var i = (0);
   i < (10); i++) {
    queue.addFirst(new PolygonAndCircleContact(this));
  }
  return queue;
}
DefaultWorldPool.prototype.getPolyContactStack = function() {
  var queue = new DoubleLinkedQueue_PolygonContact();
  for (var i = (0);
   i < (10); i++) {
    queue.addFirst(new PolygonContact(this));
  }
  return queue;
}
// ********** Code for Color3 **************
function Color3() {
  this.y = (0);
  this.x = (0);
  this.z = (0);
}
Color3.fromRGB$ctor = function(r, g, b) {
  this.y = g;
  this.x = r;
  this.z = b;
}
Color3.fromRGB$ctor.prototype = Color3.prototype;
Color3.prototype.get$x = function() { return this.x; };
Color3.prototype.set$x = function(value) { return this.x = value; };
Color3.prototype.get$y = function() { return this.y; };
Color3.prototype.set$y = function(value) { return this.y = value; };
Color3.prototype.get$z = function() { return this.z; };
Color3.prototype.set$z = function(value) { return this.z = value; };
Color3.prototype.setFromRGB = function(r, g, b) {
  this.x = r;
  this.y = g;
  this.z = b;
}
Color3.prototype.setFrom = function(argColor) {
  this.x = argColor.x;
  this.y = argColor.y;
  this.z = argColor.z;
}
Color3.prototype.setFrom$1 = Color3.prototype.setFrom;
// ********** Code for MathBox **************
function MathBox() {}
MathBox.distanceSquared = function(v1, v2) {
  var dx = (v1.x - v2.x);
  var dy = (v1.y - v2.y);
  return dx * dx + dy * dy;
}
MathBox.distance = function(v1, v2) {
  return Math.sqrt(MathBox.distanceSquared(v1, v2));
}
MathBox.clamp = function(a, low, high) {
  return Math.max(low, Math.min(a, high));
}
// ********** Code for CanvasViewportTransform **************
function CanvasViewportTransform(extents, center) {
  this.center = new Vector.copy$ctor(center);
  this.scale = (20);
  this.extents = new Vector.copy$ctor(extents);
}
CanvasViewportTransform.prototype.get$center = function() { return this.center; };
CanvasViewportTransform.prototype.set$center = function(value) { return this.center = value; };
CanvasViewportTransform.prototype.get$scale = function() { return this.scale; };
CanvasViewportTransform.prototype.set$scale = function(value) { return this.scale = value; };
CanvasViewportTransform.prototype.get$translation = function() {
  var result = new Vector.copy$ctor(this.extents);
  result.subLocal(this.center);
  return result;
}
CanvasViewportTransform.prototype.getWorldToScreen = function(argWorld, argScreen) {
  var gridCorrectedX = (argWorld.x * this.scale) + this.extents.x;
  var gridCorrectedY = this.extents.y - (argWorld.y * this.scale);
  argScreen.setCoords(gridCorrectedX + this.get$translation().x, gridCorrectedY + -this.get$translation().y);
}
// ********** Code for Matrix22 **************
function Matrix22(c1, c2) {
  if (c1 == null) {
    c1 = new Vector((0), (0));
  }
  if (c2 == null) {
    c2 = new Vector((0), (0));
  }
  this.col1 = c1;
  this.col2 = c2;
}
Matrix22.prototype.get$col1 = function() { return this.col1; };
Matrix22.prototype.set$col1 = function(value) { return this.col1 = value; };
Matrix22.prototype.get$col2 = function() { return this.col2; };
Matrix22.prototype.set$col2 = function(value) { return this.col2 = value; };
Matrix22.prototype.$eq = function(other) {
  if ($ne(other) && (other instanceof Matrix22)) {
    return $eq(this.col1, other.get$col1()) && $eq(this.col2, other.get$col2());
  }
  else {
    return false;
  }
}
Matrix22.prototype.setAngle = function(angle) {
  var cosin = Math.cos(angle);
  var sin = Math.sin(angle);
  this.col1.setCoords(cosin, sin);
  this.col2.setCoords(-sin, cosin);
}
Matrix22.prototype.setFrom = function(matrix) {
  this.col1.setFrom(matrix.col1);
  this.col2.setFrom(matrix.col2);
}
Matrix22.mulTransMatrixAndVectorToOut = function(matrix, vector, out) {
  var outx = vector.x * matrix.col1.x + vector.y * matrix.col1.y;
  out.y = vector.x * matrix.col2.x + vector.y * matrix.col2.y;
  out.x = outx;
}
Matrix22.mulMatrixAndVectorToOut = function(matrix, vector, out) {
  var tempy = matrix.col1.y * vector.x + matrix.col2.y * vector.y;
  out.x = matrix.col1.x * vector.x + matrix.col2.x * vector.y;
  out.y = tempy;
}
Matrix22.prototype.invertLocal = function() {
  var a = this.col1.x, b = this.col2.x, c = this.col1.y, d = this.col2.y;
  var det = a * d - b * c;
  if (det != (0)) {
    det = (1) / det;
  }
  this.col1.x = det * d;
  this.col2.x = -det * b;
  this.col1.y = -det * c;
  this.col2.y = det * a;
  return this;
}
Matrix22.prototype.addLocal = function(other) {
  var $0, $1, $2, $3;
  ($0 = this.col1).x = $0.x + other.col1.x;
  ($1 = this.col1).y = $1.y + other.col1.y;
  ($2 = this.col2).x = $2.x + other.col2.x;
  ($3 = this.col2).y = $3.y + other.col2.y;
  return this;
}
Matrix22.prototype.solveToOut = function(b, out) {
  var a11 = this.col1.x, a12 = this.col2.x, a21 = this.col1.y, a22 = this.col2.y;
  var det = a11 * a22 - a12 * a21;
  if (det != (0)) {
    det = (1) / det;
  }
  var tempy = det * (a11 * b.y - a21 * b.x);
  out.x = det * (a22 * b.x - a12 * b.y);
  out.y = tempy;
}
Matrix22.prototype.toString = function() {
  return $add($add(this.col1.toString(), ", "), this.col2.toString());
}
Matrix22.prototype.setFrom$1 = Matrix22.prototype.setFrom;
// ********** Code for Matrix33 **************
function Matrix33() {
  this.col3 = new Vector3((0), (0), (0));
  this.col1 = new Vector3((0), (0), (0));
  this.col2 = new Vector3((0), (0), (0));
}
Matrix33.prototype.get$col1 = function() { return this.col1; };
Matrix33.prototype.get$col2 = function() { return this.col2; };
Matrix33.prototype.solve22ToOut = function(b, out) {
  var a11 = this.col1.x, a12 = this.col2.x, a21 = this.col1.y, a22 = this.col2.y;
  var det = a11 * a22 - a12 * a21;
  if (det != (0)) {
    det = (1) / det;
  }
  out.x = det * (a22 * b.x - a12 * b.y);
  out.y = det * (a11 * b.y - a21 * b.x);
}
Matrix33.prototype.solve33ToOut = function(b, out) {
  Vector3.crossToOut(this.col2, this.col3, out);
  var det = Vector3.dot(this.col1, out);
  if (det != (0)) {
    det = (1) / det;
  }
  Vector3.crossToOut(this.col2, this.col3, out);
  var x = det * Vector3.dot(b, out);
  Vector3.crossToOut(b, this.col3, out);
  var y = det * Vector3.dot(this.col1, out);
  Vector3.crossToOut(this.col2, b, out);
  var z = det * Vector3.dot(this.col1, out);
  out.x = x;
  out.y = y;
  out.z = z;
}
// ********** Code for Settings **************
function Settings() {}
Settings.mixFriction = function(friction1, friction2) {
  return Math.sqrt(friction1 * friction2);
}
Settings.mixRestitution = function(restitution1, restitution2) {
  return restitution1 > restitution2 ? restitution1 : restitution2;
}
// ********** Code for Sweep **************
function Sweep() {
  this.angle = (0);
  this.angleZero = (0);
  this.centerZero = new Vector((0), (0));
  this.center = new Vector((0), (0));
  this.localCenter = new Vector((0), (0));
}
Sweep.prototype.get$localCenter = function() { return this.localCenter; };
Sweep.prototype.get$centerZero = function() { return this.centerZero; };
Sweep.prototype.get$center = function() { return this.center; };
Sweep.prototype.get$angleZero = function() { return this.angleZero; };
Sweep.prototype.set$angleZero = function(value) { return this.angleZero = value; };
Sweep.prototype.get$angle = function() { return this.angle; };
Sweep.prototype.set$angle = function(value) { return this.angle = value; };
Sweep.prototype.$eq = function(other) {
  return $eq(this.localCenter, other.get$localCenter()) && $eq(this.centerZero, other.get$centerZero()) && $eq(this.center, other.get$center()) && this.angleZero == other.get$angleZero() && this.angle == other.get$angle();
}
Sweep.prototype.setFrom = function(other) {
  this.localCenter.setFrom(other.localCenter);
  this.centerZero.setFrom(other.centerZero);
  this.center.setFrom(other.center);
  this.angleZero = other.angleZero;
  this.angle = other.angle;
}
Sweep.prototype.normalize = function() {
  var d = (6.283185307179586) * (this.angleZero / (6.283185307179586)).floor();
  this.angleZero = this.angleZero - d;
  this.angle = this.angle - d;
}
Sweep.prototype.getTransform = function(xf, alpha) {
  var $0, $1;
  xf.position.x = ((1) - alpha) * this.centerZero.x + alpha * this.center.x;
  xf.position.y = ((1) - alpha) * this.centerZero.y + alpha * this.center.y;
  xf.rotation.setAngle(((1) - alpha) * this.angleZero + alpha * this.angle);
  ($0 = xf.position).x = $0.x - (xf.rotation.col1.x * this.localCenter.x + xf.rotation.col2.x * this.localCenter.y);
  ($1 = xf.position).y = $1.y - (xf.rotation.col1.y * this.localCenter.x + xf.rotation.col2.y * this.localCenter.y);
}
Sweep.prototype.advance = function(time) {
  this.centerZero.x = ((1) - time) * this.centerZero.x + time * this.center.x;
  this.centerZero.y = ((1) - time) * this.centerZero.y + time * this.center.y;
  this.angleZero = ((1) - time) * this.angleZero + time * this.angle;
}
Sweep.prototype.setFrom$1 = Sweep.prototype.setFrom;
// ********** Code for Transform **************
function Transform() {
  this.position = new Vector((0), (0));
  this.rotation = new Matrix22();
}
Transform.prototype.get$position = function() { return this.position; };
Transform.prototype.get$rotation = function() { return this.rotation; };
Transform.prototype.$eq = function(other) {
  if ($eq(other)) {
    return false;
  }
  else {
    return $eq(this.position, other.get$position()) && $eq(this.rotation, other.get$rotation());
  }
}
Transform.prototype.setFrom = function(other) {
  this.position.setFrom(other.position);
  this.rotation.setFrom(other.rotation);
}
Transform.mulToOut = function(transform, vector, out) {
  var tempY = transform.position.y + transform.rotation.col1.y * vector.x + transform.rotation.col2.y * vector.y;
  out.x = transform.position.x + transform.rotation.col1.x * vector.x + transform.rotation.col2.x * vector.y;
  out.y = tempY;
}
Transform.mulTransToOut = function(T, v, out) {
  var v1x = v.x - T.position.x;
  var v1y = v.y - T.position.y;
  var b = T.rotation.col1;
  var b1 = T.rotation.col2;
  var tempy = v1x * b1.x + v1y * b1.y;
  out.x = v1x * b.x + v1y * b.y;
  out.y = tempy;
}
Transform.prototype.setFrom$1 = Transform.prototype.setFrom;
// ********** Code for Vector **************
function Vector(x, y) {
  this.y = y;
  this.x = x;
}
Vector.copy$ctor = function(other) {
  this.y = other.y;
  this.x = other.x;
}
Vector.copy$ctor.prototype = Vector.prototype;
Vector.prototype.get$x = function() { return this.x; };
Vector.prototype.set$x = function(value) { return this.x = value; };
Vector.prototype.get$y = function() { return this.y; };
Vector.prototype.set$y = function(value) { return this.y = value; };
Vector.prototype.$eq = function(other) {
  if ($eq(other)) {
    return false;
  }
  else {
    return this.x == other.get$x() && this.y == other.get$y();
  }
}
Vector.prototype.addLocal = function(v) {
  this.x = this.x + v.x;
  this.y = this.y + v.y;
  return this;
}
Vector.prototype.subLocal = function(other) {
  this.x = this.x - other.x;
  this.y = this.y - other.y;
  return this;
}
Vector.prototype.setCoords = function(xCoord, yCoord) {
  this.x = xCoord;
  this.y = yCoord;
  return this;
}
Vector.crossVectors = function(v1, v2) {
  return (v1.x * v2.y - v1.y * v2.x);
}
Vector.dot = function(one, two) {
  return one.x * two.x + one.y * two.y;
}
Vector.crossNumAndVectorToOut = function(s, a, out) {
  var tempY = s * a.x;
  out.x = -s * a.y;
  out.y = tempY;
}
Vector.crossVectorAndNumToOut = function(a, s, out) {
  var tempy = -s * a.x;
  out.x = s * a.y;
  out.y = tempy;
}
Vector.prototype.setFrom = function(v) {
  this.setCoords(v.x, v.y);
  return this;
}
Vector.prototype.mulLocal = function(d) {
  this.x = this.x * d;
  this.y = this.y * d;
  return this;
}
Vector.prototype.setZero = function() {
  this.setCoords((0), (0));
  return this;
}
Vector.prototype.get$length = function() {
  return Math.sqrt(this.get$lengthSquared());
}
Vector.minToOut = function(a, b, out) {
  out.x = a.x < b.x ? a.x : b.x;
  out.y = a.y < b.y ? a.y : b.y;
}
Vector.maxToOut = function(a, b, out) {
  out.x = a.x > b.x ? a.x : b.x;
  out.y = a.y > b.y ? a.y : b.y;
}
Vector.prototype.get$lengthSquared = function() {
  return this.x * this.x + this.y * this.y;
}
Vector.prototype.absLocal = function() {
  this.x = this.x.abs();
  this.y = this.y.abs();
}
Vector.prototype.normalize = function() {
  var len = this.get$length();
  if (len < (1.192e-7)) {
    return (0);
  }
  var invLength = (1) / len;
  this.x = this.x * invLength;
  this.y = this.y * invLength;
  return len;
}
Vector.prototype.negateLocal = function() {
  this.x = -this.x;
  this.y = -this.y;
  return this;
}
Vector.prototype.toString = function() {
  return $add($add("(" + this.x, ", ") + this.y, ")");
}
Vector.prototype.setCoords$2 = Vector.prototype.setCoords;
Vector.prototype.setFrom$1 = Vector.prototype.setFrom;
// ********** Code for Vector3 **************
function Vector3(x, y, z) {
  this.y = y;
  this.x = x;
  this.z = z;
}
Vector3.prototype.get$x = function() { return this.x; };
Vector3.prototype.set$x = function(value) { return this.x = value; };
Vector3.prototype.get$y = function() { return this.y; };
Vector3.prototype.set$y = function(value) { return this.y = value; };
Vector3.prototype.get$z = function() { return this.z; };
Vector3.prototype.set$z = function(value) { return this.z = value; };
Vector3.prototype.$eq = function(other) {
  if ($ne(other) && (other instanceof Vector3)) {
    return this.x == other.get$x() && this.y == other.get$y() && this.z == other.get$z();
  }
  else {
    return false;
  }
}
Vector3.prototype.setFrom = function(argVec) {
  this.x = argVec.x;
  this.y = argVec.y;
  this.z = argVec.z;
  return this;
}
Vector3.prototype.setCoords = function(argX, argY, argZ) {
  this.x = argX;
  this.y = argY;
  this.z = argZ;
  return this;
}
Vector3.prototype.addLocal = function(argVec) {
  this.x = this.x + argVec.x;
  this.y = this.y + argVec.y;
  this.z = this.z + argVec.z;
  return this;
}
Vector3.prototype.add = function(argVec) {
  return new Vector3(this.x + argVec.x, this.y + argVec.y, this.z + argVec.z);
}
Vector3.prototype.subLocal = function(argVec) {
  this.x = this.x - argVec.x;
  this.y = this.y - argVec.y;
  this.z = this.z - argVec.z;
  return this;
}
Vector3.prototype.mulLocal = function(argScalar) {
  this.x = this.x * argScalar;
  this.y = this.y * argScalar;
  this.z = this.z * argScalar;
  return this;
}
Vector3.prototype.negateLocal = function() {
  this.x = -this.x;
  this.y = -this.y;
  this.z = -this.z;
  return this;
}
Vector3.prototype.setZero = function() {
  this.x = (0);
  this.y = (0);
  this.z = (0);
}
Vector3.prototype.toString = function() {
  return $add($add($add("(" + this.x, ",") + this.y, ",") + this.z, ")");
}
Vector3.dot = function(a, b) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}
Vector3.crossToOut = function(a, b, out) {
  var tempy = a.z * b.x - a.x * b.z;
  var tempz = a.x * b.y - a.y * b.x;
  out.x = a.y * b.z - a.z * b.y;
  out.y = tempy;
  out.z = tempz;
}
Vector3.prototype.add$1 = Vector3.prototype.add;
Vector3.prototype.setFrom$1 = Vector3.prototype.setFrom;
// ********** Code for top level **************
//  ********** Library CircleStress **************
// ********** Code for Demo **************
function Demo() {
  this.bodies = new Array();
  var gravity = new Vector((0), (-10));
  var doSleep = true;
  this.world = new World(gravity, doSleep, new DefaultWorldPool());
}
Demo.prototype.get$viewport = function() { return this.viewport; };
Demo.prototype.set$viewport = function(value) { return this.viewport = value; };
Demo.prototype.step = function(timestamp) {
  var $this = this; // closure support
  this.world.step((0.016666666666666666), (10), (10));
  this.ctx.clearRect((0), (0), (900), (600));
  this.world.drawDebugData();
  this.ctx.setFillColor("black");
  this.ctx.set$font("18pt monospace");
  this.ctx.fillText(this.get$name(), (20), (20));
  if (this.fps != null) {
    this.ctx.setFillColor("red");
    this.ctx.set$font("12pt monospace");
    this.ctx.fillText(("FPS: " + this.fps.toStringAsFixed((2))), (20), (40));
  }
  ++this.frameCount;
  html_get$window().webkitRequestAnimationFrame((function (time) {
    $this.step(time);
  })
  , this.canvas);
}
Demo.prototype.initializeAnimation = function() {
  var $this = this; // closure support
  this.canvas = ElementWrappingImplementation.ElementWrappingImplementation$tag$factory("canvas");
  this.canvas.set$width((900));
  this.canvas.set$height((600));
  html_get$document().get$body().get$nodes().add(this.canvas);
  this.ctx = this.canvas.getContext("2d");
  var extents = new Vector((450), (300));
  this.viewport = new CanvasViewportTransform(extents, extents);
  this.viewport.scale = (10);
  this.debugDraw = new CanvasDraw(this.viewport, this.ctx);
  this.world.set$debugDraw(this.debugDraw);
  this.frameCount = (0);
  html_get$window().setInterval((function () {
    $this.fps = $this.frameCount;
    $this.frameCount = (0);
  })
  , (1000));
}
Demo.prototype.get$name = function() {
  return "No Demo Name";
}
Demo.prototype.runAnimation = function() {
  var $this = this; // closure support
  html_get$window().webkitRequestAnimationFrame((function (time) {
    $this.step(time);
  })
  , this.canvas);
}
Demo.prototype.initialize$0 = Demo.prototype.initialize;
// ********** Code for CircleStress **************
$inherits(CircleStress, Demo);
function CircleStress() {
  Demo.call(this);
}
CircleStress.main = function() {
  var stress = new CircleStress();
  stress.initialize$0();
  stress.initializeAnimation();
  stress.get$viewport().set$scale((4));
  stress.runAnimation();
}
CircleStress.prototype.get$name = function() {
  return "Circle Stress";
}
CircleStress.prototype.initialize = function() {
  {
    var bd = new BodyDef();
    var ground = this.world.createBody(bd);
    this.bodies.add(ground);
    var shape = new PolygonShape();
    shape.setAsEdge(new Vector((-40), (0)), new Vector((40), (0)));
    ground.createFixtureFromShape$1(shape);
  }
  var leftWall;
  var rightWall;
  {
    var sd = new PolygonShape();
    sd.setAsBox((50), (10));
    var bd = new BodyDef();
    bd.set$type((0));
    bd.set$position(new Vector((0), (-10)));
    var b = this.world.createBody(bd);
    this.bodies.add(b);
    var fd = new FixtureDef();
    fd.set$shape(sd);
    fd.set$friction((1));
    b.createFixture(fd);
    sd.setAsBox((3), (50));
    var wallDef = new BodyDef();
    wallDef.set$position(new Vector((45), (25)));
    rightWall = this.world.createBody(wallDef);
    this.bodies.add(rightWall);
    rightWall.createFixtureFromShape(sd, (0));
    wallDef.set$position(new Vector((-45), (25)));
    leftWall = this.world.createBody(wallDef);
    this.bodies.add(leftWall);
    leftWall.createFixtureFromShape(sd, (0));
    var cornerDef = new BodyDef();
    sd.setAsBox((20), (3));
    cornerDef.set$angle((-0.7853981633974483));
    cornerDef.set$position(new Vector((-35), (8)));
    var myBod = this.world.createBody(cornerDef);
    this.bodies.add(myBod);
    myBod.createFixtureFromShape(sd, (0));
    cornerDef.set$angle((0.7853981633974483));
    cornerDef.set$position(new Vector((35), (8)));
    myBod = this.world.createBody(cornerDef);
    this.bodies.add(myBod);
    myBod.createFixtureFromShape(sd, (0));
    sd.setAsBox((50), (10));
    var topDef = new BodyDef();
    topDef.set$type((0));
    topDef.set$angle((0));
    topDef.set$position(new Vector((0), (75)));
    var topBody = this.world.createBody(topDef);
    this.bodies.add(topBody);
    fd.set$shape(sd);
    fd.set$friction((1));
    topBody.createFixture(fd);
  }
  {
    var bd = new BodyDef();
    bd.set$type((2));
    var numPieces = (5);
    var radius = (6);
    bd.set$position(new Vector((0), (10)));
    var body = this.world.createBody(bd);
    this.bodies.add(body);
    for (var i = (0);
     i < numPieces; i++) {
      var fd = new FixtureDef();
      var cd = new CircleShape();
      cd.set$radius((1.2));
      fd.set$shape(cd);
      fd.set$density((25));
      fd.set$friction((0.1));
      fd.set$restitution((0.9));
      var xPos = radius * Math.cos((6.283185307179586) * (i / numPieces.toDouble()));
      var yPos = radius * Math.sin((6.283185307179586) * (i / numPieces.toDouble()));
      cd.get$position().setCoords$2(xPos, yPos);
      body.createFixture(fd);
    }
    body.set$bullet(false);
    var bodyDef = new BodyDef();
    var groundBody = this.world.createBody(bodyDef);
    var rjd = new RevoluteJointDef();
    rjd.initialize(body, groundBody, body.get$position());
    rjd.motorSpeed = (3.141592653589793);
    rjd.maxMotorTorque = (1000000);
    rjd.enableMotor = true;
    this._joint = this.world.createJoint(rjd);
    {
      for (var j = (0);
       j < (8); j++) {
        for (var i = (0);
         i < (20); i++) {
          var circ = new CircleShape();
          var bod = new BodyDef();
          bod.type = (2);
          circ.radius = (1) + ($mod(i, (2)) == (0) ? (1) : (-1)) * (0.5) * (0.75);
          var fd2 = new FixtureDef();
          fd2.shape = circ;
          fd2.density = circ.radius * (1.5);
          fd2.friction = (0.5);
          fd2.restitution = (0.7);
          var xPos = (-39) + (2) * i;
          var yPos = (50) + j;
          bod.position = new Vector(xPos, yPos);
          var myBody = this.world.createBody(bod);
          this.bodies.add(myBody);
          myBody.createFixture(fd2);
        }
      }
    }
  }
}
CircleStress.prototype.initialize$0 = CircleStress.prototype.initialize;
// ********** Code for top level **************
function main() {
  CircleStress.main();
}
// 321 dynamic types.
// 501 types
// 41 !leaf
(function(){
  var v0/*CSSValueList*/ = 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue';
  var v1/*CharacterData*/ = 'CharacterData|Comment|Text|CDATASection';
  var v2/*Document*/ = 'Document|HTMLDocument|SVGDocument';
  var v3/*HTMLInputElement*/ = 'HTMLInputElement|HTMLIsIndexElement';
  var v4/*SVGComponentTransferFunctionElement*/ = 'SVGComponentTransferFunctionElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement';
  var v5/*SVGTextPositioningElement*/ = 'SVGTextPositioningElement|SVGAltGlyphElement|SVGTRefElement|SVGTSpanElement|SVGTextElement';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['AbstractWorker', 'AbstractWorker|SharedWorker|Worker'],
    ['ArrayBufferView', 'ArrayBufferView|DataView|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array'],
    ['AudioNode', 'AudioNode|AudioChannelMerger|AudioChannelSplitter|AudioDestinationNode|AudioGainNode|AudioPannerNode|AudioSourceNode|AudioBufferSourceNode|MediaElementAudioSourceNode|BiquadFilterNode|ConvolverNode|DelayNode|DynamicsCompressorNode|HighPass2FilterNode|JavaScriptAudioNode|LowPass2FilterNode|RealtimeAnalyserNode|WaveShaperNode'],
    ['AudioParam', 'AudioParam|AudioGain'],
    ['Blob', 'Blob|File'],
    ['CSSRule', 'CSSRule|CSSCharsetRule|CSSFontFaceRule|CSSImportRule|CSSMediaRule|CSSPageRule|CSSStyleRule|CSSUnknownRule|WebKitCSSKeyframeRule|WebKitCSSKeyframesRule'],
    ['CSSValueList', v0/*CSSValueList*/],
    ['CSSValue', [v0/*CSSValueList*/,'CSSValue|CSSPrimitiveValue|SVGColor|SVGPaint'].join('|')],
    ['CanvasRenderingContext', 'CanvasRenderingContext|CanvasRenderingContext2D|WebGLRenderingContext'],
    ['CharacterData', v1/*CharacterData*/],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList'],
    ['DOMWindow', 'DOMWindow|Window'],
    ['Document', v2/*Document*/],
    ['Entry', 'Entry|DirectoryEntry|FileEntry'],
    ['EntrySync', 'EntrySync|DirectoryEntrySync|FileEntrySync'],
    ['Event', 'Event|AudioProcessingEvent|BeforeLoadEvent|CloseEvent|CustomEvent|DeviceMotionEvent|DeviceOrientationEvent|ErrorEvent|HashChangeEvent|IDBVersionChangeEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|ProgressEvent|XMLHttpRequestProgressEvent|SpeechInputEvent|StorageEvent|TrackEvent|UIEvent|CompositionEvent|KeyboardEvent|MouseEvent|SVGZoomEvent|TextEvent|TouchEvent|WheelEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent'],
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection|HTMLPropertiesCollection'],
    ['HTMLInputElement', v3/*HTMLInputElement*/],
    ['IDBCursor', 'IDBCursor|IDBCursorWithValue'],
    ['IDBRequest', 'IDBRequest|IDBVersionChangeRequest'],
    ['SVGComponentTransferFunctionElement', v4/*SVGComponentTransferFunctionElement*/],
    ['SVGTextPositioningElement', v5/*SVGTextPositioningElement*/],
    ['Node', [v1/*CharacterData*/,v2/*Document*/,v3/*HTMLInputElement*/,v4/*SVGComponentTransferFunctionElement*/,v5/*SVGTextPositioningElement*/,'Node|Attr|DocumentFragment|DocumentType|Element|HTMLElement|HTMLAnchorElement|HTMLAppletElement|HTMLAreaElement|HTMLBRElement|HTMLBaseElement|HTMLBaseFontElement|HTMLBodyElement|HTMLButtonElement|HTMLCanvasElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDirectoryElement|HTMLDivElement|HTMLEmbedElement|HTMLFieldSetElement|HTMLFontElement|HTMLFormElement|HTMLFrameElement|HTMLFrameSetElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLIFrameElement|HTMLImageElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMediaElement|HTMLAudioElement|HTMLVideoElement|HTMLMenuElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLObjectElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLSelectElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|SVGElement|SVGAElement|SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGAnimationElement|SVGAnimateColorElement|SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGSetElement|SVGCircleElement|SVGClipPathElement|SVGCursorElement|SVGDefsElement|SVGDescElement|SVGEllipseElement|SVGFEBlendElement|SVGFEColorMatrixElement|SVGFEComponentTransferElement|SVGFECompositeElement|SVGFEConvolveMatrixElement|SVGFEDiffuseLightingElement|SVGFEDisplacementMapElement|SVGFEDistantLightElement|SVGFEDropShadowElement|SVGFEFloodElement|SVGFEGaussianBlurElement|SVGFEImageElement|SVGFEMergeElement|SVGFEMergeNodeElement|SVGFEMorphologyElement|SVGFEOffsetElement|SVGFEPointLightElement|SVGFESpecularLightingElement|SVGFESpotLightElement|SVGFETileElement|SVGFETurbulenceElement|SVGFilterElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGForeignObjectElement|SVGGElement|SVGGlyphElement|SVGGlyphRefElement|SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGHKernElement|SVGImageElement|SVGLineElement|SVGMPathElement|SVGMarkerElement|SVGMaskElement|SVGMetadataElement|SVGMissingGlyphElement|SVGPathElement|SVGPatternElement|SVGPolygonElement|SVGPolylineElement|SVGRectElement|SVGSVGElement|SVGScriptElement|SVGStopElement|SVGStyleElement|SVGSwitchElement|SVGSymbolElement|SVGTextContentElement|SVGTextPathElement|SVGTitleElement|SVGUseElement|SVGVKernElement|SVGViewElement|Entity|EntityReference|Notation|ProcessingInstruction'].join('|')],
    ['SVGLocatable', 'SVGLocatable|SVGTransformable'],
    ['SVGPathSeg', 'SVGPathSeg|SVGPathSegArcAbs|SVGPathSegArcRel|SVGPathSegClosePath|SVGPathSegCurvetoCubicAbs|SVGPathSegCurvetoCubicRel|SVGPathSegCurvetoCubicSmoothAbs|SVGPathSegCurvetoCubicSmoothRel|SVGPathSegCurvetoQuadraticAbs|SVGPathSegCurvetoQuadraticRel|SVGPathSegCurvetoQuadraticSmoothAbs|SVGPathSegCurvetoQuadraticSmoothRel|SVGPathSegLinetoAbs|SVGPathSegLinetoHorizontalAbs|SVGPathSegLinetoHorizontalRel|SVGPathSegLinetoRel|SVGPathSegLinetoVerticalAbs|SVGPathSegLinetoVerticalRel|SVGPathSegMovetoAbs|SVGPathSegMovetoRel'],
    ['SVGStylable', 'SVGStylable|SVGFilterPrimitiveStandardAttributes'],
    ['SVGZoomAndPan', 'SVGZoomAndPan|SVGViewSpec'],
    ['StyleSheet', 'StyleSheet|CSSStyleSheet'],
    ['WorkerContext', 'WorkerContext|DedicatedWorkerContext|SharedWorkerContext'],
  ];
  $dynamicSetMetadata(table);
})();
//  ********** Globals **************
function $static_init(){
}
var const$0000 = Object.create(EmptyQueueException.prototype, {});
var const$0001 = Object.create(_DeletedKeySentinel.prototype, {});
var const$0002 = Object.create(NoMoreElementsException.prototype, {});
var $globals = {};
$static_init();
main();
