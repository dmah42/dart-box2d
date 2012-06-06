function Isolate() {}
init();

var $ = Isolate.$isolateProperties;
Isolate.$defineClass("ExceptionImplementation", "Object", ["_msg"], {
 toString$0: function() {
  if (this._msg === (void 0)) {
    var t0 = 'Exception';
  } else {
    t0 = 'Exception: ' + $.stringToString(this._msg);
  }
  return t0;
 }
});

Isolate.$defineClass("HashMapImplementation", "Object", ["_numberOfDeleted", "_numberOfEntries", "_loadLimit", "_values", "_keys?"], {
 toString$0: function() {
  return $.mapToString(this);
 },
 containsKey$1: function(key) {
  return !$.eqB(this._probeForLookup$1(key), -1);
 },
 forEach$1: function(f) {
  var length$ = $.get$length(this._keys);
  for (var i = 0; $.ltB(i, length$); i = i + 1) {
    var key = $.index(this._keys, i);
    if (!(key === (void 0)) && !(key === $.CTC5)) {
      f.$call$2(key, $.index(this._values, i));
    }
  }
 },
 get$length: function() {
  return this._numberOfEntries;
 },
 isEmpty$0: function() {
  return $.eq(this._numberOfEntries, 0);
 },
 operator$index$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.ltB(index, 0)) {
    return;
  }
  return $.index(this._values, index);
 },
 operator$indexSet$2: function(key, value) {
  this._ensureCapacity$0();
  var index = this._probeForAdding$1(key);
  if ($.index(this._keys, index) === (void 0) || $.index(this._keys, index) === $.CTC5) {
    this._numberOfEntries = $.add(this._numberOfEntries, 1);
  }
  $.indexSet(this._keys, index, key);
  $.indexSet(this._values, index, value);
 },
 clear$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  var length$ = $.get$length(this._keys);
  for (var i = 0; $.ltB(i, length$); i = i + 1) {
    $.indexSet(this._keys, i, (void 0));
    $.indexSet(this._values, i, (void 0));
  }
 },
 _grow$1: function(newCapacity) {
  $.assert($._isPowerOfTwo(newCapacity));
  var capacity = $.get$length(this._keys);
  this._loadLimit = $._computeLoadLimit(newCapacity);
  var oldKeys = this._keys;
  if (typeof oldKeys !== 'string' && (typeof oldKeys !== 'object'||oldKeys.constructor !== Array)) return this._grow$1$bailout(newCapacity, 1, capacity, oldKeys);
  var oldValues = this._values;
  if (typeof oldValues !== 'string' && (typeof oldValues !== 'object'||oldValues.constructor !== Array)) return this._grow$1$bailout(newCapacity, 2, capacity, oldKeys, oldValues);
  this._keys = $.List(newCapacity);
  var t0 = $.List(newCapacity);
  $.setRuntimeTypeInfo(t0, ({E: 'V'}));
  this._values = t0;
  for (var i = 0; $.ltB(i, capacity); i = i + 1) {
    var t1 = oldKeys.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = oldKeys[i];
    if (t2 === (void 0) || t2 === $.CTC5) {
      continue;
    }
    var t3 = oldValues.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    var t4 = oldValues[i];
    var newIndex = this._probeForAdding$1(t2);
    $.indexSet(this._keys, newIndex, t2);
    $.indexSet(this._values, newIndex, t4);
  }
  this._numberOfDeleted = 0;
 },
 _grow$1$bailout: function(newCapacity, state, env0, env1, env2) {
  switch (state) {
    case 1:
      capacity = env0;
      oldKeys = env1;
      break;
    case 2:
      capacity = env0;
      oldKeys = env1;
      oldValues = env2;
      break;
  }
  switch (state) {
    case 0:
      $.assert($._isPowerOfTwo(newCapacity));
      var capacity = $.get$length(this._keys);
      this._loadLimit = $._computeLoadLimit(newCapacity);
      var oldKeys = this._keys;
    case 1:
      state = 0;
      var oldValues = this._values;
    case 2:
      state = 0;
      this._keys = $.List(newCapacity);
      var t0 = $.List(newCapacity);
      $.setRuntimeTypeInfo(t0, ({E: 'V'}));
      this._values = t0;
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, capacity)) break L0;
        c$0:{
          var key = $.index(oldKeys, i);
          if (key === (void 0) || key === $.CTC5) {
            break c$0;
          }
          var value = $.index(oldValues, i);
          var newIndex = this._probeForAdding$1(key);
          $.indexSet(this._keys, newIndex, key);
          $.indexSet(this._values, newIndex, value);
        }
        i = i + 1;
      }
      this._numberOfDeleted = 0;
  }
 },
 _ensureCapacity$0: function() {
  var newNumberOfEntries = $.add(this._numberOfEntries, 1);
  if ($.geB(newNumberOfEntries, this._loadLimit)) {
    this._grow$1($.mul($.get$length(this._keys), 2));
    return;
  }
  var numberOfFree = $.sub($.sub($.get$length(this._keys), newNumberOfEntries), this._numberOfDeleted);
  if ($.gtB(this._numberOfDeleted, numberOfFree)) {
    this._grow$1($.get$length(this._keys));
  }
 },
 _probeForLookup$1: function(key) {
  for (var hash = $._firstProbe($.hashCode(key), $.get$length(this._keys)), numberOfProbes = 1; true; hash = hash0, numberOfProbes = numberOfProbes0) {
    var numberOfProbes0 = numberOfProbes;
    var hash0 = hash;
    var existingKey = $.index(this._keys, hash);
    if (existingKey === (void 0)) {
      return -1;
    }
    if ($.eqB(existingKey, key)) {
      return hash;
    }
    var numberOfProbes1 = numberOfProbes + 1;
    var hash1 = $._nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    numberOfProbes0 = numberOfProbes1;
    hash0 = hash1;
  }
 },
 _probeForAdding$1: function(key) {
  var hash = $._firstProbe($.hashCode(key), $.get$length(this._keys));
  if (hash !== (hash | 0)) return this._probeForAdding$1$bailout(key, 1, hash);
  for (var numberOfProbes = 1, hash0 = hash, insertionIndex = -1; true; numberOfProbes = numberOfProbes0, hash0 = hash1, insertionIndex = insertionIndex0) {
    var numberOfProbes0 = numberOfProbes;
    var hash1 = hash0;
    var insertionIndex0 = insertionIndex;
    var existingKey = $.index(this._keys, hash0);
    if (existingKey === (void 0)) {
      if ($.ltB(insertionIndex, 0)) {
        return hash0;
      }
      return insertionIndex;
    } else {
      if ($.eqB(existingKey, key)) {
        return hash0;
      } else {
        insertionIndex0 = insertionIndex;
        if ($.ltB(insertionIndex, 0) && $.CTC5 === existingKey) {
          insertionIndex0 = hash0;
        }
        var numberOfProbes1 = numberOfProbes + 1;
      }
    }
    var hash2 = $._nextProbe(hash0, numberOfProbes, $.get$length(this._keys));
    numberOfProbes0 = numberOfProbes1;
    hash1 = hash2;
  }
 },
 _probeForAdding$1$bailout: function(key, state, env0) {
  switch (state) {
    case 1:
      hash = env0;
      break;
  }
  switch (state) {
    case 0:
      var hash = $._firstProbe($.hashCode(key), $.get$length(this._keys));
    case 1:
      state = 0;
      var numberOfProbes = 1;
      var hash0 = hash;
      var insertionIndex = -1;
      L0: while (true) {
        if (!true) break L0;
        var numberOfProbes0 = numberOfProbes;
        var hash1 = hash0;
        var insertionIndex0 = insertionIndex;
        var existingKey = $.index(this._keys, hash0);
        if (existingKey === (void 0)) {
          if ($.ltB(insertionIndex, 0)) {
            return hash0;
          }
          return insertionIndex;
        } else {
          if ($.eqB(existingKey, key)) {
            return hash0;
          } else {
            insertionIndex0 = insertionIndex;
            if ($.ltB(insertionIndex, 0) && $.CTC5 === existingKey) {
              insertionIndex0 = hash0;
            }
            var numberOfProbes1 = numberOfProbes + 1;
          }
        }
        var hash2 = $._nextProbe(hash0, numberOfProbes, $.get$length(this._keys));
        numberOfProbes0 = numberOfProbes1;
        hash1 = hash2;
        numberOfProbes = numberOfProbes0;
        hash0 = hash1;
        insertionIndex = insertionIndex0;
      }
  }
 },
 HashMapImplementation$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  this._loadLimit = $._computeLoadLimit(8);
  this._keys = $.List(8);
  var t0 = $.List(8);
  $.setRuntimeTypeInfo(t0, ({E: 'V'}));
  this._values = t0;
 },
 is$Map: function() { return true; }
});

Isolate.$defineClass("HashSetImplementation", "Object", ["_backingMap?"], {
 toString$0: function() {
  return $.collectionToString(this);
 },
 iterator$0: function() {
  var t0 = $.HashSetIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({E: 'E'}));
  return t0;
 },
 get$length: function() {
  return $.get$length(this._backingMap);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._backingMap);
 },
 filter$1: function(f) {
  var t0 = ({});
  t0.f_1 = f;
  var result = $.HashSetImplementation$0();
  $.setRuntimeTypeInfo(result, ({E: 'E'}));
  t0.result_2 = result;
  $.forEach(this._backingMap, new $.Closure11(t0));
  return t0.result_2;
 },
 get$filter: function() { return new $.Closure12(this); },
 forEach$1: function(f) {
  var t0 = ({});
  t0.f_1 = f;
  $.forEach(this._backingMap, new $.Closure10(t0));
 },
 contains$1: function(value) {
  return this._backingMap.containsKey$1(value);
 },
 add$1: function(value) {
  $.indexSet(this._backingMap, value, value);
 },
 clear$0: function() {
  $.clear(this._backingMap);
 },
 HashSetImplementation$0: function() {
  this._backingMap = $.HashMapImplementation$0();
 },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("HashSetIterator", "Object", ["_nextValidIndex", "_entries"], {
 _advance$0: function() {
  var length$ = $.get$length(this._entries);
  var entry = (void 0);
  do {
    var t0 = $.add(this._nextValidIndex, 1);
    this._nextValidIndex = t0;
    if ($.geB(t0, length$)) {
      break;
    }
    entry = $.index(this._entries, this._nextValidIndex);
  } while (entry === (void 0) || entry === $.CTC5);
 },
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC2);
  }
  var res = $.index(this._entries, this._nextValidIndex);
  this._advance$0();
  return res;
 },
 get$next: function() { return new $.Closure14(this); },
 hasNext$0: function() {
  if ($.geB(this._nextValidIndex, $.get$length(this._entries))) {
    return false;
  }
  if ($.index(this._entries, this._nextValidIndex) === $.CTC5) {
    this._advance$0();
  }
  return $.lt(this._nextValidIndex, $.get$length(this._entries));
 },
 HashSetIterator$1: function(set_) {
  this._advance$0();
 }
});

Isolate.$defineClass("_DeletedKeySentinel", "Object", [], {
});

Isolate.$defineClass("DoubleLinkedQueueEntry", "Object", ["_element?", "_next=", "_previous="], {
 get$element: function() {
  return this._element;
 },
 remove$0: function() {
  var t0 = this._next;
  this._previous.set$_next(t0);
  var t1 = this._previous;
  this._next.set$_previous(t1);
  this._next = (void 0);
  this._previous = (void 0);
  return this._element;
 },
 prepend$1: function(e) {
  var t0 = $.DoubleLinkedQueueEntry$1(e);
  $.setRuntimeTypeInfo(t0, ({E: 'E'}));
  t0._link$2(this._previous, this);
 },
 append$1: function(e) {
  var t0 = $.DoubleLinkedQueueEntry$1(e);
  $.setRuntimeTypeInfo(t0, ({E: 'E'}));
  t0._link$2(this, this._next);
 },
 _link$2: function(p, n) {
  this._next = n;
  this._previous = p;
  p.set$_next(this);
  n.set$_previous(this);
 },
 DoubleLinkedQueueEntry$1: function(e) {
  this._element = e;
 }
});

Isolate.$defineClass("_DoubleLinkedQueueEntrySentinel", "DoubleLinkedQueueEntry", ["_element", "_next", "_previous"], {
 get$element: function() {
  throw $.captureStackTrace($.CTC3);
 },
 remove$0: function() {
  throw $.captureStackTrace($.CTC3);
 },
 _DoubleLinkedQueueEntrySentinel$0: function() {
  this._link$2(this, this);
 }
});

Isolate.$defineClass("DoubleLinkedQueue", "Object", ["_sentinel"], {
 toString$0: function() {
  return $.collectionToString(this);
 },
 iterator$0: function() {
  var t0 = $._DoubleLinkedQueueIterator$1(this._sentinel);
  $.setRuntimeTypeInfo(t0, ({E: 'E'}));
  return t0;
 },
 filter$1: function(f) {
  var other = $.DoubleLinkedQueue$0();
  $.setRuntimeTypeInfo(other, ({E: 'E'}));
  for (var entry = this._sentinel.get$_next(); !(entry === this._sentinel); entry = entry0) {
    var entry0 = entry;
    var nextEntry = entry.get$_next();
    if (f.$call$1(entry.get$_element()) === true) {
      other.addLast$1(entry.get$_element());
    }
    entry0 = nextEntry;
  }
  return other;
 },
 get$filter: function() { return new $.Closure15(this); },
 forEach$1: function(f) {
  for (var entry = this._sentinel.get$_next(); !(entry === this._sentinel); entry = entry0) {
    var entry0 = entry;
    var nextEntry = entry.get$_next();
    f.$call$1(entry.get$_element());
    entry0 = nextEntry;
  }
 },
 clear$0: function() {
  var t0 = this._sentinel;
  this._sentinel.set$_next(t0);
  var t1 = this._sentinel;
  this._sentinel.set$_previous(t1);
 },
 isEmpty$0: function() {
  return this._sentinel.get$_next() === this._sentinel;
 },
 get$length: function() {
  var t0 = ({});
  t0.counter_1 = 0;
  this.forEach$1(new $.Closure8(t0));
  return t0.counter_1;
 },
 removeFirst$0: function() {
  return this._sentinel.get$_next().remove$0();
 },
 removeLast$0: function() {
  return this._sentinel.get$_previous().remove$0();
 },
 add$1: function(value) {
  this.addLast$1(value);
 },
 addFirst$1: function(value) {
  this._sentinel.append$1(value);
 },
 addLast$1: function(value) {
  this._sentinel.prepend$1(value);
 },
 DoubleLinkedQueue$0: function() {
  var t0 = $._DoubleLinkedQueueEntrySentinel$0();
  $.setRuntimeTypeInfo(t0, ({E: 'E'}));
  this._sentinel = t0;
 },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_DoubleLinkedQueueIterator", "Object", ["_currentEntry", "_sentinel"], {
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC2);
  }
  this._currentEntry = this._currentEntry.get$_next();
  return this._currentEntry.get$element();
 },
 get$next: function() { return new $.Closure16(this); },
 hasNext$0: function() {
  return !(this._currentEntry.get$_next() === this._sentinel);
 },
 _DoubleLinkedQueueIterator$1: function(_sentinel) {
  this._currentEntry = this._sentinel;
 }
});

Isolate.$defineClass("StringBufferImpl", "Object", ["_length", "_buffer"], {
 toString$0: function() {
  if ($.get$length(this._buffer) === 0) {
    return '';
  }
  if ($.get$length(this._buffer) === 1) {
    return $.index(this._buffer, 0);
  }
  var result = $.concatAll(this._buffer);
  $.clear(this._buffer);
  $.add$1(this._buffer, result);
  return result;
 },
 clear$0: function() {
  var t0 = $.List((void 0));
  $.setRuntimeTypeInfo(t0, ({E: 'String'}));
  this._buffer = t0;
  this._length = 0;
  return this;
 },
 add$1: function(obj) {
  var str = $.toString(obj);
  if (str === (void 0) || $.isEmpty(str) === true) {
    return this;
  }
  $.add$1(this._buffer, str);
  this._length = $.add(this._length, $.get$length(str));
  return this;
 },
 isEmpty$0: function() {
  return this._length === 0;
 },
 get$length: function() {
  return this._length;
 },
 StringBufferImpl$1: function(content$) {
  this.clear$0();
  this.add$1(content$);
 }
});

Isolate.$defineClass("JSSyntaxRegExp", "Object", ["ignoreCase?", "multiLine?", "pattern?"], {
 allMatches$1: function(str) {
  $.checkString(str);
  return $._AllMatchesIterable$2(this, str);
 },
 hasMatch$1: function(str) {
  return $.regExpTest(this, $.checkString(str));
 },
 firstMatch$1: function(str) {
  var m = $.regExpExec(this, $.checkString(str));
  if (m === (void 0)) {
    return;
  }
  var matchStart = $.regExpMatchStart(m);
  var matchEnd = $.add(matchStart, $.get$length($.index(m, 0)));
  return $.MatchImplementation$5(this.pattern, str, matchStart, matchEnd, m);
 },
 JSSyntaxRegExp$_globalVersionOf$1: function(other) {
  $.regExpAttachGlobalNative(this);
 },
 is$JSSyntaxRegExp: true
});

Isolate.$defineClass("MatchImplementation", "Object", ["_groups", "_end", "_start", "str", "pattern?"], {
 operator$index$1: function(index) {
  return this.group$1(index);
 },
 group$1: function(index) {
  return $.index(this._groups, index);
 }
});

Isolate.$defineClass("_AllMatchesIterable", "Object", ["_str", "_re"], {
 iterator$0: function() {
  return $._AllMatchesIterator$2(this._re, this._str);
 }
});

Isolate.$defineClass("_AllMatchesIterator", "Object", ["_done", "_next=", "_str", "_re"], {
 hasNext$0: function() {
  if (this._done === true) {
    return false;
  } else {
    if (!$.eqNullB(this._next)) {
      return true;
    }
  }
  this._next = this._re.firstMatch$1(this._str);
  if ($.eqNullB(this._next)) {
    this._done = true;
    return false;
  } else {
    return true;
  }
 },
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC2);
  }
  var next = this._next;
  this._next = (void 0);
  return next;
 },
 get$next: function() { return new $.Closure17(this); }
});

Isolate.$defineClass("ListIterator", "Object", ["list", "i"], {
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.NoMoreElementsException$0());
  }
  var value = (this.list[this.i]);
  this.i = $.add(this.i, 1);
  return value;
 },
 get$next: function() { return new $.Closure18(this); },
 hasNext$0: function() {
  return $.lt(this.i, (this.list.length));
 }
});

Isolate.$defineClass("Closure13", "Object", [], {
 toString$0: function() {
  return 'Closure';
 }
});

Isolate.$defineClass("MetaInfo", "Object", ["set?", "tags", "tag?"], {
});

Isolate.$defineClass("StringMatch", "Object", ["pattern?", "str", "_lib3_start"], {
 group$1: function(group_) {
  if (!$.eqB(group_, 0)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(group_));
  }
  return this.pattern;
 },
 operator$index$1: function(g) {
  return this.group$1(g);
 }
});

Isolate.$defineClass("Object", "", [], {
 toString$0: function() {
  return $.objectToString(this);
 }
});

Isolate.$defineClass("IndexOutOfRangeException", "Object", ["_index"], {
 toString$0: function() {
  return 'IndexOutOfRangeException: ' + $.stringToString(this._index);
 }
});

Isolate.$defineClass("NoSuchMethodException", "Object", ["_existingArgumentNames", "_arguments", "_functionName", "_receiver"], {
 toString$0: function() {
  var sb = $.StringBufferImpl$1('');
  for (var i = 0; $.ltB(i, $.get$length(this._arguments)); i = i + 1) {
    if (i > 0) {
      sb.add$1(', ');
    }
    sb.add$1($.index(this._arguments, i));
  }
  if (this._existingArgumentNames === (void 0)) {
    return 'NoSuchMethodException : method not found: \'' + $.stringToString(this._functionName) + '\'\nReceiver: ' + $.stringToString(this._receiver) + '\nArguments: [' + $.stringToString(sb) + ']';
  } else {
    var actualParameters = sb.toString$0();
    var sb0 = $.StringBufferImpl$1('');
    for (var i0 = 0; $.ltB(i0, $.get$length(this._existingArgumentNames)); i0 = i0 + 1) {
      if (i0 > 0) {
        sb0.add$1(', ');
      }
      sb0.add$1($.index(this._existingArgumentNames, i0));
    }
    var formalParameters = sb0.toString$0();
    return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.stringToString(this._functionName) + '\'\nReceiver: ' + $.stringToString(this._receiver) + '\nTried calling: ' + $.stringToString(this._functionName) + '(' + $.stringToString(actualParameters) + ')\nFound: ' + $.stringToString(this._functionName) + '(' + $.stringToString(formalParameters) + ')';
  }
 }
});

Isolate.$defineClass("ObjectNotClosureException", "Object", [], {
 toString$0: function() {
  return 'Object is not closure';
 }
});

Isolate.$defineClass("IllegalArgumentException", "Object", ["_arg"], {
 toString$0: function() {
  return 'Illegal argument(s): ' + $.stringToString(this._arg);
 }
});

Isolate.$defineClass("StackOverflowException", "Object", [], {
 toString$0: function() {
  return 'Stack Overflow';
 }
});

Isolate.$defineClass("NullPointerException", "Object", ["arguments", "functionName"], {
 get$exceptionName: function() {
  return 'NullPointerException';
 },
 toString$0: function() {
  if ($.eqNullB(this.functionName)) {
    return this.get$exceptionName();
  } else {
    return '' + $.stringToString(this.get$exceptionName()) + ' : method: \'' + $.stringToString(this.functionName) + '\'\nReceiver: null\nArguments: ' + $.stringToString(this.arguments);
  }
 }
});

Isolate.$defineClass("NoMoreElementsException", "Object", [], {
 toString$0: function() {
  return 'NoMoreElementsException';
 }
});

Isolate.$defineClass("EmptyQueueException", "Object", [], {
 toString$0: function() {
  return 'EmptyQueueException';
 }
});

Isolate.$defineClass("UnsupportedOperationException", "Object", ["_message"], {
 toString$0: function() {
  return 'UnsupportedOperationException: ' + $.stringToString(this._message);
 }
});

Isolate.$defineClass("NotImplementedException", "Object", [], {
 toString$0: function() {
  return 'NotImplementedException';
 }
});

Isolate.$defineClass("IllegalJSRegExpException", "Object", ["_errmsg", "_pattern"], {
 toString$0: function() {
  return 'IllegalJSRegExpException: \'' + $.stringToString(this._pattern) + '\' \'' + $.stringToString(this._errmsg) + '\'';
 }
});

Isolate.$defineClass("ExpectException", "Object", ["message"], {
 toString$0: function() {
  return this.message;
 }
});

Isolate.$defineClass("DominoTest", "Demo", ["fps", "frameCount", "world", "debugDraw", "viewport", "ctx", "canvas", "bodies"], {
 initialize$0: function() {
  var fd = $.FixtureDef$0();
  var sd = $.PolygonShape$0();
  sd.setAsBox$2(50.0, 10.0);
  fd.shape = sd;
  var bd = $.BodyDef$0();
  bd.position = $.Vector$2(0.0, -10.0);
  var body = this.world.createBody$1(bd);
  body.createFixture$1(fd);
  $.add$1(this.bodies, body);
  for (var i = 0; i < 4; i = i + 1) {
    var fd0 = $.FixtureDef$0();
    var sd0 = $.PolygonShape$0();
    sd0.setAsBox$2(15.0, 0.125);
    fd0.shape = sd0;
    var bd0 = $.BodyDef$0();
    bd0.position = $.Vector$2(0.0, 5 + 5 * i);
    var body0 = this.world.createBody$1(bd0);
    body0.createFixture$1(fd0);
    $.add$1(this.bodies, body0);
  }
  var fd1 = $.FixtureDef$0();
  var sd1 = $.PolygonShape$0();
  sd1.setAsBox$2(0.125, 2);
  fd1.shape = sd1;
  fd1.density = 25.0;
  var bd1 = $.BodyDef$0();
  bd1.type = 2;
  for (var t0 = 25 - 1, t1 = 29.5 / t0, i0 = 0; i0 < 4; i0 = i0 + 1) {
    for (var t2 = 7.3 + 5 * i0, j = 0; j < 25; j = j + 1) {
      fd1.friction = 0.5;
      bd1.position = $.Vector$2(-14.75 + j * t1, t2);
      if (i0 === 2 && j === 0) {
        bd1.angle = -0.1;
        var t3 = bd1.position;
        t3.set$x($.add(t3.get$x(), 0.1));
      } else {
        if (i0 === 3 && j === t0) {
          bd1.angle = 0.1;
          var t4 = bd1.position;
          t4.set$x($.sub(t4.get$x(), 0.1));
        } else {
          bd1.angle = 0;
        }
      }
      var myBody = this.world.createBody$1(bd1);
      myBody.createFixture$1(fd1);
      $.add$1(this.bodies, myBody);
    }
  }
 },
 get$name: function() {
  return 'Domino Platforms';
 }
});

Isolate.$defineClass("Demo", "Object", ["fps!", "frameCount=", "debugDraw!", "bodies?"], {
 runAnimation$0: function() {
  $.window().requestAnimationFrame$1(new $.Closure(this));
 },
 get$name: function() {
  return 'No Demo Name';
 },
 initializeAnimation$0: function() {
  this.canvas = $.Element$tag('canvas');
  this.canvas.set$width(900);
  this.canvas.set$height(600);
  $.add$1($.document().get$body().get$nodes(), this.canvas);
  this.ctx = this.canvas.getContext$1('2d');
  var extents = $.Vector$2(450.0, 300.0);
  this.viewport = $.CanvasViewportTransform$2(extents, extents);
  this.viewport.set$scale(10);
  this.debugDraw = $.CanvasDraw$2(this.viewport, this.ctx);
  var t0 = this.debugDraw;
  this.world.set$debugDraw(t0);
  this.frameCount = 0;
  $.window().setInterval$2(new $.Closure7(this), 1000);
 },
 step$1: function(timestamp) {
  this.world.step$3(0.016666666666666666, 10, 10);
  this.ctx.clearRect$4(0, 0, 900, 600);
  this.world.drawDebugData$0();
  this.ctx.setFillColor$1('black');
  this.ctx.set$font('18pt monospace');
  this.ctx.fillText$3(this.get$name(), 20, 20);
  if (!$.eqNullB(this.fps)) {
    this.ctx.setFillColor$1('red');
    this.ctx.set$font('12pt monospace');
    this.ctx.fillText$3('FPS: ' + $.stringToString($.toStringAsFixed(this.fps, 2)), 20, 40);
  }
  this.frameCount = $.add(this.frameCount, 1);
  $.window().requestAnimationFrame$1(new $.Closure6(this));
 },
 Demo$0: function() {
  this.world = $.World$3($.Vector$2(0, -10), true, $.DefaultWorldPool$0());
 }
});

Isolate.$defineClass("_ChildNodeListLazy", "Object", ["_this"], {
 operator$index$1: function(index) {
  return $.index(this._this.get$$$dom_childNodes(), index);
 },
 get$length: function() {
  return $.get$length(this._this.get$$$dom_childNodes());
 },
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$1($.getRange2(this, start, rangeLength, []));
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,(void 0))
},
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._NodeListWrapper$1($.filter(this, [], f));
 },
 get$filter: function() { return new $.Closure34(this); },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 iterator$0: function() {
  return $.iterator(this._this.get$$$dom_childNodes());
 },
 operator$indexSet$2: function(index, value) {
  this._this.$dom_replaceChild$2(value, this.operator$index$1(index));
 },
 clear$0: function() {
  this._this.set$text('');
 },
 removeLast$0: function() {
  var result = this.last$0();
  if (!$.eqNullB(result)) {
    this._this.$dom_removeChild$1(result);
  }
  return result;
 },
 add$1: function(value) {
  this._this.$dom_appendChild$1(value);
 },
 last$0: function() {
  return this._this.lastChild;;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_ListWrapper", "Object", [], {
 setRange$4: function(start, rangeLength, from, startFrom) {
  return $.setRange$4(this._list, start, rangeLength, from, startFrom);
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,0)
},
 getRange$2: function(start, rangeLength) {
  return $.getRange(this._list, start, rangeLength);
 },
 removeLast$0: function() {
  return $.removeLast(this._list);
 },
 clear$0: function() {
  return $.clear(this._list);
 },
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._list, element, start);
 },
 sort$1: function(compare) {
  return $.sort(this._list, compare);
 },
 add$1: function(value) {
  return $.add$1(this._list, value);
 },
 set$length: function(newLength) {
  $.set$length(this._list, newLength);
 },
 operator$indexSet$2: function(index, value) {
  $.indexSet(this._list, index, value);
 },
 operator$index$1: function(index) {
  return $.index(this._list, index);
 },
 get$length: function() {
  return $.get$length(this._list);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._list);
 },
 filter$1: function(f) {
  return $.filter2(this._list, f);
 },
 get$filter: function() { return new $.Closure35(this); },
 forEach$1: function(f) {
  return $.forEach(this._list, f);
 },
 iterator$0: function() {
  return $.iterator(this._list);
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_NodeListWrapper", "_ListWrapper", ["_list"], {
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$1($.getRange(this._list, start, rangeLength));
 },
 filter$1: function(f) {
  return $._NodeListWrapper$1($.filter2(this._list, f));
 },
 get$filter: function() { return new $.Closure36(this); },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_FixedSizeListIterator", "_VariableSizeListIterator", ["_lib_length", "_pos", "_array"], {
 hasNext$0: function() {
  return $.gt(this._lib_length, this._pos);
 }
});

Isolate.$defineClass("_VariableSizeListIterator", "Object", [], {
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC2);
  }
  var t0 = this._array;
  var t1 = this._pos;
  this._pos = $.add(t1, 1);
  return $.index(t0, t1);
 },
 get$next: function() { return new $.Closure44(this); },
 hasNext$0: function() {
  return $.gt($.get$length(this._array), this._pos);
 }
});

Isolate.$defineClass("AxisAlignedBox", "Object", ["upperBound?", "lowerBound?"], {
 toString$0: function() {
  return $.add($.add($.toString(this.lowerBound), ', '), $.toString(this.upperBound));
 },
 setFrom$1: function(other) {
  this.lowerBound.setFrom$1(other.get$lowerBound());
  this.upperBound.setFrom$1(other.get$upperBound());
 },
 contains$1: function(aabb) {
  return $.gtB(this.lowerBound.get$x(), aabb.get$lowerBound().get$x()) && $.gtB(this.lowerBound.get$y(), aabb.get$lowerBound().get$y()) && $.ltB(this.upperBound.get$y(), aabb.get$upperBound().get$y()) && $.ltB(this.upperBound.get$x(), aabb.get$upperBound().get$x());
 },
 get$center: function() {
  var c = $.Vector$copy$1(this.lowerBound);
  c.addLocal$1(this.upperBound);
  c.mulLocal$1(0.5);
  return c;
 },
 setFromCombination$2: function(boxOne, boxTwo) {
  var t0 = $.min(boxOne.get$lowerBound().get$x(), boxTwo.get$lowerBound().get$x());
  this.lowerBound.set$x(t0);
  var t1 = $.min(boxOne.get$lowerBound().get$y(), boxTwo.get$lowerBound().get$y());
  this.lowerBound.set$y(t1);
  var t2 = $.max(boxOne.get$upperBound().get$x(), boxTwo.get$upperBound().get$x());
  this.upperBound.set$x(t2);
  var t3 = $.max(boxOne.get$upperBound().get$y(), boxTwo.get$upperBound().get$y());
  this.upperBound.set$y(t3);
 },
 AxisAlignedBox$2: function(lowerBound, upperBound) {
  if (this.lowerBound === (void 0)) {
    this.lowerBound = $.Vector$2(0, 0);
  }
  if (this.upperBound === (void 0)) {
    this.upperBound = $.Vector$2(0, 0);
  }
 }
});

Isolate.$defineClass("Collision", "Object", ["clipPoints2", "clipPoints1", "v12", "v11", "normal1", "normal?", "tangent", "planePoint", "localNormal?", "localTangent", "incidentEdge?", "results2", "results1", "output", "input", "cache", "_pool"], {
 collidePolygons$5: function(manifold, polyA, xfA, polyB, xfB) {
  manifold.set$pointCount(0);
  var totalRadius = $.add(polyA.get$radius(), polyB.get$radius());
  if (typeof totalRadius !== 'number') return this.collidePolygons$5$bailout(manifold, polyA, xfA, polyB, xfB, 1, totalRadius);
  this.findMaxSeparation$5(this.results1, polyA, xfA, polyB, xfB);
  if ($.gtB(this.results1.get$separation(), totalRadius)) {
    return;
  }
  this.findMaxSeparation$5(this.results2, polyB, xfB, polyA, xfA);
  if ($.gtB(this.results2.get$separation(), totalRadius)) {
    return;
  }
  if ($.gtB(this.results2.get$separation(), $.mul(0.98, this.results1.get$separation()) + 0.001)) {
    var edge1 = this.results2.get$edgeIndex();
    manifold.set$type(2);
    var edge10 = edge1;
    var poly1 = polyB;
    var xf2 = xfA;
    var xf1 = xfB;
    var flip = 1;
    var poly2 = polyA;
  } else {
    var edge11 = this.results1.get$edgeIndex();
    manifold.set$type(1);
    edge10 = edge11;
    poly1 = polyA;
    xf2 = xfB;
    xf1 = xfA;
    flip = 0;
    poly2 = polyB;
  }
  this.findIncidentEdge$6(this.incidentEdge, poly1, xf1, edge10, poly2, xf2);
  var count1 = poly1.get$vertexCount();
  var vertices1 = poly1.get$vertices();
  this.v11.setFrom$1($.index(vertices1, edge10));
  var t0 = this.v12;
  if ($.ltB($.add(edge10, 1), count1)) {
    var t1 = $.index(vertices1, $.add(edge10, 1));
  } else {
    t1 = $.index(vertices1, 0);
  }
  t0.setFrom$1(t1);
  this.localTangent.setFrom$1(this.v12).subLocal$1(this.v11);
  this.localTangent.normalize$0();
  $.crossVectorAndNumToOut(this.localTangent, 1, this.localNormal);
  this.planePoint.setFrom$1(this.v11).addLocal$1(this.v12).mulLocal$1(0.5);
  $.mulMatrixAndVectorToOut(xf1.get$rotation(), this.localTangent, this.tangent);
  $.crossVectorAndNumToOut(this.tangent, 1, this.normal);
  $.mulToOut(xf1, this.v11, this.v11);
  $.mulToOut(xf1, this.v12, this.v12);
  var frontOffset = $.dot(this.normal, this.v11);
  if (typeof frontOffset !== 'number') return this.collidePolygons$5$bailout(manifold, polyA, xfA, polyB, xfB, 2, xf2, totalRadius, flip, frontOffset);
  var sideOffset1 = $.add($.neg($.dot(this.tangent, this.v11)), totalRadius);
  var sideOffset2 = $.add($.dot(this.tangent, this.v12), totalRadius);
  this.tangent.negateLocal$0();
  var np = $.clipSegmentToLine(this.clipPoints1, this.incidentEdge, this.tangent, sideOffset1);
  this.tangent.negateLocal$0();
  if ($.ltB(np, 2)) {
    return;
  }
  if ($.ltB($.clipSegmentToLine(this.clipPoints2, this.clipPoints1, this.tangent, sideOffset2), 2)) {
    return;
  }
  manifold.get$localNormal().setFrom$1(this.localNormal);
  manifold.get$localPoint().setFrom$1(this.planePoint);
  for (var pointCount = 0, i = 0; i < 2; pointCount = pointCount0, i = i0) {
    var pointCount0 = pointCount;
    pointCount0 = pointCount;
    if ($.leB($.sub($.dot(this.normal, $.index(this.clipPoints2, i).get$v()), frontOffset), totalRadius)) {
      var cp = $.index(manifold.get$points(), pointCount);
      $.mulTransToOut(xf2, $.index(this.clipPoints2, i).get$v(), cp.get$localPoint());
      cp.get$id().setFrom$1($.index(this.clipPoints2, i).get$id());
      cp.get$id().get$features().set$flip(flip);
      pointCount0 = pointCount + 1;
    }
    var i0 = i + 1;
  }
  manifold.set$pointCount(pointCount);
 },
 collidePolygons$5$bailout: function(manifold, polyA, xfA, polyB, xfB, state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      totalRadius = env0;
      break;
    case 2:
      xf2 = env0;
      totalRadius = env1;
      flip = env2;
      frontOffset = env3;
      break;
  }
  switch (state) {
    case 0:
      manifold.set$pointCount(0);
      var totalRadius = $.add(polyA.get$radius(), polyB.get$radius());
    case 1:
      state = 0;
      this.findMaxSeparation$5(this.results1, polyA, xfA, polyB, xfB);
      if ($.gtB(this.results1.get$separation(), totalRadius)) {
        return;
      }
      this.findMaxSeparation$5(this.results2, polyB, xfB, polyA, xfA);
      if ($.gtB(this.results2.get$separation(), totalRadius)) {
        return;
      }
      if ($.gtB(this.results2.get$separation(), $.mul(0.98, this.results1.get$separation()) + 0.001)) {
        var edge1 = this.results2.get$edgeIndex();
        manifold.set$type(2);
        var edge10 = edge1;
        var poly1 = polyB;
        var xf2 = xfA;
        var xf1 = xfB;
        var flip = 1;
        var poly2 = polyA;
      } else {
        var edge11 = this.results1.get$edgeIndex();
        manifold.set$type(1);
        edge10 = edge11;
        poly1 = polyA;
        xf2 = xfB;
        xf1 = xfA;
        flip = 0;
        poly2 = polyB;
      }
      this.findIncidentEdge$6(this.incidentEdge, poly1, xf1, edge10, poly2, xf2);
      var count1 = poly1.get$vertexCount();
      var vertices1 = poly1.get$vertices();
      this.v11.setFrom$1($.index(vertices1, edge10));
      var t0 = this.v12;
      if ($.ltB($.add(edge10, 1), count1)) {
        var t1 = $.index(vertices1, $.add(edge10, 1));
      } else {
        t1 = $.index(vertices1, 0);
      }
      t0.setFrom$1(t1);
      this.localTangent.setFrom$1(this.v12).subLocal$1(this.v11);
      this.localTangent.normalize$0();
      $.crossVectorAndNumToOut(this.localTangent, 1, this.localNormal);
      this.planePoint.setFrom$1(this.v11).addLocal$1(this.v12).mulLocal$1(0.5);
      $.mulMatrixAndVectorToOut(xf1.get$rotation(), this.localTangent, this.tangent);
      $.crossVectorAndNumToOut(this.tangent, 1, this.normal);
      $.mulToOut(xf1, this.v11, this.v11);
      $.mulToOut(xf1, this.v12, this.v12);
      var frontOffset = $.dot(this.normal, this.v11);
    case 2:
      state = 0;
      var sideOffset1 = $.add($.neg($.dot(this.tangent, this.v11)), totalRadius);
      var sideOffset2 = $.add($.dot(this.tangent, this.v12), totalRadius);
      this.tangent.negateLocal$0();
      var np = $.clipSegmentToLine(this.clipPoints1, this.incidentEdge, this.tangent, sideOffset1);
      this.tangent.negateLocal$0();
      if ($.ltB(np, 2)) {
        return;
      }
      if ($.ltB($.clipSegmentToLine(this.clipPoints2, this.clipPoints1, this.tangent, sideOffset2), 2)) {
        return;
      }
      manifold.get$localNormal().setFrom$1(this.localNormal);
      manifold.get$localPoint().setFrom$1(this.planePoint);
      var pointCount = 0;
      var i = 0;
      L0: while (true) {
        if (!(i < 2)) break L0;
        var pointCount0 = pointCount;
        pointCount0 = pointCount;
        if ($.leB($.sub($.dot(this.normal, $.index(this.clipPoints2, i).get$v()), frontOffset), totalRadius)) {
          var cp = $.index(manifold.get$points(), pointCount);
          $.mulTransToOut(xf2, $.index(this.clipPoints2, i).get$v(), cp.get$localPoint());
          cp.get$id().setFrom$1($.index(this.clipPoints2, i).get$id());
          cp.get$id().get$features().set$flip(flip);
          pointCount0 = pointCount + 1;
        }
        var i0 = i + 1;
        pointCount = pointCount0;
        i = i0;
      }
      manifold.set$pointCount(pointCount);
  }
 },
 findIncidentEdge$6: function(c, poly1, xf1, edge1, poly2, xf2) {
  var count1 = poly1.get$vertexCount();
  var normals1 = poly1.get$normals();
  var count2 = poly2.get$vertexCount();
  var vertices2 = poly2.get$vertices();
  var normals2 = poly2.get$normals();
  if (typeof normals2 !== 'string' && (typeof normals2 !== 'object'||normals2.constructor !== Array)) return this.findIncidentEdge$6$bailout(c, poly1, xf1, edge1, poly2, xf2, 1, count1, normals1, count2, vertices2, normals2);
  $.assert($.leB(0, edge1) && $.ltB(edge1, count1));
  $.mulMatrixAndVectorToOut(xf1.get$rotation(), $.index(normals1, edge1), this.normal1);
  $.mulTransMatrixAndVectorToOut(xf2.get$rotation(), this.normal1, this.normal1);
  for (var minDot = 99999999999999.0, index = 0, i = 0; $.ltB(i, count2); minDot = minDot0, index = index0, i = i0) {
    var minDot0 = minDot;
    var index0 = index;
    var t0 = this.normal1;
    var t1 = normals2.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var dot = $.dot(t0, normals2[i]);
    minDot0 = minDot;
    index0 = index;
    if ($.ltB(dot, minDot)) {
      minDot0 = dot;
      index0 = i;
    }
    var i0 = i + 1;
  }
  var t2 = index + 1;
  if ($.ltB(t2, count2)) {
    var i2 = t2;
  } else {
    i2 = 0;
  }
  $.mulToOut(xf2, $.index(vertices2, index), $.index(c, 0).get$v());
  $.index(c, 0).get$id().get$features().set$referenceEdge(edge1);
  $.index(c, 0).get$id().get$features().set$incidentEdge(index);
  $.index(c, 0).get$id().get$features().set$incidentVertex(0);
  $.mulToOut(xf2, $.index(vertices2, i2), $.index(c, 1).get$v());
  $.index(c, 1).get$id().get$features().set$referenceEdge(edge1);
  $.index(c, 1).get$id().get$features().set$incidentEdge(i2);
  $.index(c, 1).get$id().get$features().set$incidentVertex(1);
 },
 findIncidentEdge$6$bailout: function(c, poly1, xf1, edge1, poly2, xf2, state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      count1 = env0;
      normals1 = env1;
      count2 = env2;
      vertices2 = env3;
      normals2 = env4;
      break;
  }
  switch (state) {
    case 0:
      var count1 = poly1.get$vertexCount();
      var normals1 = poly1.get$normals();
      var count2 = poly2.get$vertexCount();
      var vertices2 = poly2.get$vertices();
      var normals2 = poly2.get$normals();
    case 1:
      state = 0;
      $.assert($.leB(0, edge1) && $.ltB(edge1, count1));
      $.mulMatrixAndVectorToOut(xf1.get$rotation(), $.index(normals1, edge1), this.normal1);
      $.mulTransMatrixAndVectorToOut(xf2.get$rotation(), this.normal1, this.normal1);
      var minDot = 99999999999999.0;
      var index = 0;
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, count2)) break L0;
        var minDot0 = minDot;
        var index0 = index;
        var dot = $.dot(this.normal1, $.index(normals2, i));
        minDot0 = minDot;
        index0 = index;
        if ($.ltB(dot, minDot)) {
          minDot0 = dot;
          index0 = i;
        }
        var i0 = i + 1;
        minDot = minDot0;
        index = index0;
        i = i0;
      }
      var t0 = index + 1;
      if ($.ltB(t0, count2)) {
        var i2 = t0;
      } else {
        i2 = 0;
      }
      $.mulToOut(xf2, $.index(vertices2, index), $.index(c, 0).get$v());
      $.index(c, 0).get$id().get$features().set$referenceEdge(edge1);
      $.index(c, 0).get$id().get$features().set$incidentEdge(index);
      $.index(c, 0).get$id().get$features().set$incidentVertex(0);
      $.mulToOut(xf2, $.index(vertices2, i2), $.index(c, 1).get$v());
      $.index(c, 1).get$id().get$features().set$referenceEdge(edge1);
      $.index(c, 1).get$id().get$features().set$incidentEdge(i2);
      $.index(c, 1).get$id().get$features().set$incidentVertex(1);
  }
 },
 findMaxSeparation$5: function(results, poly1, xf1, poly2, xf2) {
  var count1 = poly1.get$vertexCount();
  if (count1 !== (count1 | 0)) return this.findMaxSeparation$5$bailout(results, poly1, xf1, poly2, xf2, 1, count1);
  var normals1 = poly1.get$normals();
  if (typeof normals1 !== 'string' && (typeof normals1 !== 'object'||normals1.constructor !== Array)) return this.findMaxSeparation$5$bailout(results, poly1, xf1, poly2, xf2, 2, count1, normals1);
  var v = poly2.get$centroid();
  var predy = $.add($.add(xf2.get$position().get$y(), $.mul(xf2.get$rotation().get$col1().get$y(), v.get$x())), $.mul(xf2.get$rotation().get$col2().get$y(), v.get$y()));
  var predx = $.add($.add(xf2.get$position().get$x(), $.mul(xf2.get$rotation().get$col1().get$x(), v.get$x())), $.mul(xf2.get$rotation().get$col2().get$x(), v.get$y()));
  var v1 = poly1.get$centroid();
  var tempy = $.add($.add(xf1.get$position().get$y(), $.mul(xf1.get$rotation().get$col1().get$y(), v1.get$x())), $.mul(xf1.get$rotation().get$col2().get$y(), v1.get$y()));
  var dx = $.sub(predx, $.add($.add(xf1.get$position().get$x(), $.mul(xf1.get$rotation().get$col1().get$x(), v1.get$x())), $.mul(xf1.get$rotation().get$col2().get$x(), v1.get$y())));
  var dy = $.sub(predy, tempy);
  var R = xf1.get$rotation();
  var dLocal1x = $.add($.mul(dx, R.get$col1().get$x()), $.mul(dy, R.get$col1().get$y()));
  if (typeof dLocal1x !== 'number') return this.findMaxSeparation$5$bailout(results, poly1, xf1, poly2, xf2, 3, dx, dy, R, count1, normals1, dLocal1x);
  var dLocal1y = $.add($.mul(dx, R.get$col2().get$x()), $.mul(dy, R.get$col2().get$y()));
  if (typeof dLocal1y !== 'number') return this.findMaxSeparation$5$bailout(results, poly1, xf1, poly2, xf2, 4, count1, normals1, dLocal1x, dLocal1y);
  for (var dot = (void 0), edge = 0, i = 0, maxDot = 1e-12; i < count1; edge = edge0, i = i0, maxDot = maxDot0) {
    var maxDot0 = maxDot;
    var edge0 = edge;
    var t0 = normals1.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    var t1 = normals1[i];
    var dot0 = $.add($.mul(t1.get$x(), dLocal1x), $.mul(t1.get$y(), dLocal1y));
    maxDot0 = maxDot;
    edge0 = edge;
    if ($.gtB(dot0, maxDot)) {
      maxDot0 = dot0;
      edge0 = i;
    }
    dot = dot0;
    var i0 = i + 1;
  }
  var s = this.edgeSeparation$5(poly1, xf1, edge, poly2, xf2);
  if (typeof s !== 'number') return this.findMaxSeparation$5$bailout(results, poly1, xf1, poly2, xf2, 5, count1, edge, s);
  var t2 = edge - 1;
  if (t2 >= 0) {
    var prevEdge = t2;
  } else {
    prevEdge = count1 - 1;
  }
  var sPrev = this.edgeSeparation$5(poly1, xf1, prevEdge, poly2, xf2);
  var t3 = edge + 1;
  if (t3 < count1) {
    var nextEdge = t3;
  } else {
    nextEdge = 0;
  }
  var sNext = this.edgeSeparation$5(poly1, xf1, nextEdge, poly2, xf2);
  if ($.gtB(sPrev, s) && $.gtB(sPrev, sNext)) {
    var bestEdge = prevEdge;
    var increment = -1;
    var bestSeparation = sPrev;
  } else {
    if ($.gtB(sNext, s)) {
    } else {
      results.set$edgeIndex(edge);
      results.set$separation(s);
      return;
    }
    bestEdge = nextEdge;
    increment = 1;
    bestSeparation = sNext;
  }
  if (typeof bestSeparation !== 'number') return this.findMaxSeparation$5$bailout(results, poly1, xf1, poly2, xf2, 6, s, bestEdge, increment, count1, edge, bestSeparation);
  var t4 = increment === -1;
  var t5 = count1 - 1;
  for (var s0 = s, bestEdge0 = bestEdge, edge1 = edge, bestSeparation0 = bestSeparation; true; bestSeparation0 = bestSeparation1, bestEdge0 = bestEdge1) {
    var bestSeparation1 = bestSeparation0;
    var bestEdge1 = bestEdge0;
    if (t4) {
      var t6 = bestEdge0 - 1;
      if (t6 >= 0) {
        var edge2 = t6;
      } else {
        edge2 = t5;
      }
    } else {
      var t7 = bestEdge0 + 1;
      if (t7 < count1) {
        edge2 = t7;
      } else {
        edge2 = 0;
      }
    }
    var s1 = this.edgeSeparation$5(poly1, xf1, edge2, poly2, xf2);
    if ($.gtB(s1, bestSeparation0)) {
    } else {
      break;
    }
    s0 = s1;
    bestSeparation1 = s1;
    edge1 = edge2;
    bestEdge1 = edge2;
  }
  results.set$edgeIndex(bestEdge0);
  results.set$separation(bestSeparation0);
 },
 findMaxSeparation$5$bailout: function(results, poly1, xf1, poly2, xf2, state, env0, env1, env2, env3, env4, env5) {
  switch (state) {
    case 1:
      count1 = env0;
      break;
    case 2:
      count1 = env0;
      normals1 = env1;
      break;
    case 3:
      dx = env0;
      dy = env1;
      R = env2;
      count1 = env3;
      normals1 = env4;
      dLocal1x = env5;
      break;
    case 4:
      count1 = env0;
      normals1 = env1;
      dLocal1x = env2;
      dLocal1y = env3;
      break;
    case 5:
      count1 = env0;
      edge = env1;
      s = env2;
      break;
    case 6:
      s = env0;
      bestEdge = env1;
      increment = env2;
      count1 = env3;
      edge = env4;
      bestSeparation = env5;
      break;
  }
  switch (state) {
    case 0:
      var count1 = poly1.get$vertexCount();
    case 1:
      state = 0;
      var normals1 = poly1.get$normals();
    case 2:
      state = 0;
      var v = poly2.get$centroid();
      var predy = $.add($.add(xf2.get$position().get$y(), $.mul(xf2.get$rotation().get$col1().get$y(), v.get$x())), $.mul(xf2.get$rotation().get$col2().get$y(), v.get$y()));
      var predx = $.add($.add(xf2.get$position().get$x(), $.mul(xf2.get$rotation().get$col1().get$x(), v.get$x())), $.mul(xf2.get$rotation().get$col2().get$x(), v.get$y()));
      var v1 = poly1.get$centroid();
      var tempy = $.add($.add(xf1.get$position().get$y(), $.mul(xf1.get$rotation().get$col1().get$y(), v1.get$x())), $.mul(xf1.get$rotation().get$col2().get$y(), v1.get$y()));
      var dx = $.sub(predx, $.add($.add(xf1.get$position().get$x(), $.mul(xf1.get$rotation().get$col1().get$x(), v1.get$x())), $.mul(xf1.get$rotation().get$col2().get$x(), v1.get$y())));
      var dy = $.sub(predy, tempy);
      var R = xf1.get$rotation();
      var dLocal1x = $.add($.mul(dx, R.get$col1().get$x()), $.mul(dy, R.get$col1().get$y()));
    case 3:
      state = 0;
      var dLocal1y = $.add($.mul(dx, R.get$col2().get$x()), $.mul(dy, R.get$col2().get$y()));
    case 4:
      state = 0;
      var dot = (void 0);
      var edge = 0;
      var i = 0;
      var maxDot = 1e-12;
      L0: while (true) {
        if (!$.ltB(i, count1)) break L0;
        var maxDot0 = maxDot;
        var edge0 = edge;
        var norm = $.index(normals1, i);
        var dot0 = $.add($.mul(norm.get$x(), dLocal1x), $.mul(norm.get$y(), dLocal1y));
        maxDot0 = maxDot;
        edge0 = edge;
        if ($.gtB(dot0, maxDot)) {
          maxDot0 = dot0;
          edge0 = i;
        }
        dot = dot0;
        var i0 = i + 1;
        edge = edge0;
        i = i0;
        maxDot = maxDot0;
      }
      var s = this.edgeSeparation$5(poly1, xf1, edge, poly2, xf2);
    case 5:
      state = 0;
      var t0 = edge - 1;
      if (t0 >= 0) {
        var prevEdge = t0;
      } else {
        prevEdge = $.sub(count1, 1);
      }
      var sPrev = this.edgeSeparation$5(poly1, xf1, prevEdge, poly2, xf2);
      var t1 = edge + 1;
      if ($.ltB(t1, count1)) {
        var nextEdge = t1;
      } else {
        nextEdge = 0;
      }
      var sNext = this.edgeSeparation$5(poly1, xf1, nextEdge, poly2, xf2);
      if ($.gtB(sPrev, s) && $.gtB(sPrev, sNext)) {
        var bestEdge = prevEdge;
        var increment = -1;
        var bestSeparation = sPrev;
      } else {
        if ($.gtB(sNext, s)) {
        } else {
          results.set$edgeIndex(edge);
          results.set$separation(s);
          return;
        }
        bestEdge = nextEdge;
        increment = 1;
        bestSeparation = sNext;
      }
    case 6:
      state = 0;
      var t2 = increment === -1;
      var s0 = s;
      var bestEdge0 = bestEdge;
      var edge1 = edge;
      var bestSeparation0 = bestSeparation;
      L1: while (true) {
        if (!true) break L1;
        var bestSeparation1 = bestSeparation0;
        var bestEdge1 = bestEdge0;
        if (t2) {
          if ($.geB($.sub(bestEdge0, 1), 0)) {
            var edge2 = $.sub(bestEdge0, 1);
          } else {
            edge2 = $.sub(count1, 1);
          }
        } else {
          if ($.ltB($.add(bestEdge0, 1), count1)) {
            edge2 = $.add(bestEdge0, 1);
          } else {
            edge2 = 0;
          }
        }
        var s1 = this.edgeSeparation$5(poly1, xf1, edge2, poly2, xf2);
        if ($.gtB(s1, bestSeparation0)) {
        } else {
          break;
        }
        s0 = s1;
        bestSeparation1 = s1;
        edge1 = edge2;
        bestEdge1 = edge2;
        bestSeparation0 = bestSeparation1;
        bestEdge0 = bestEdge1;
      }
      results.set$edgeIndex(bestEdge0);
      results.set$separation(bestSeparation0);
  }
 },
 edgeSeparation$5: function(poly1, xf1, edge1, poly2, xf2) {
  var count1 = poly1.get$vertexCount();
  var vertices1 = poly1.get$vertices();
  var normals1 = poly1.get$normals();
  var count2 = poly2.get$vertexCount();
  var vertices2 = poly2.get$vertices();
  if (typeof vertices2 !== 'string' && (typeof vertices2 !== 'object'||vertices2.constructor !== Array)) return this.edgeSeparation$5$bailout(poly1, xf1, edge1, poly2, xf2, 1, vertices1, normals1, count2, count1, vertices2);
  $.assert($.leB(0, edge1) && $.ltB(edge1, count1));
  var R = xf1.get$rotation();
  var v = $.index(normals1, edge1);
  var normal1Worldy = $.add($.mul(R.get$col1().get$y(), v.get$x()), $.mul(R.get$col2().get$y(), v.get$y()));
  var normal1Worldx = $.add($.mul(R.get$col1().get$x(), v.get$x()), $.mul(R.get$col2().get$x(), v.get$y()));
  var R1 = xf2.get$rotation();
  var normal1x = $.add($.mul(normal1Worldx, R1.get$col1().get$x()), $.mul(normal1Worldy, R1.get$col1().get$y()));
  if (typeof normal1x !== 'number') return this.edgeSeparation$5$bailout(poly1, xf1, edge1, poly2, xf2, 2, normal1Worldx, R1, vertices2, normal1Worldy, vertices1, R, count2, normal1x);
  var normal1y = $.add($.mul(normal1Worldx, R1.get$col2().get$x()), $.mul(normal1Worldy, R1.get$col2().get$y()));
  if (typeof normal1y !== 'number') return this.edgeSeparation$5$bailout(poly1, xf1, edge1, poly2, xf2, 3, normal1Worldx, R1, vertices2, normal1Worldy, vertices1, count2, R, normal1x, normal1y);
  for (var minDot = 99999999999999.0, index = 0, i = 0; $.ltB(i, count2); minDot = minDot0, index = index0, i = i0) {
    var minDot0 = minDot;
    var index0 = index;
    var t0 = vertices2.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    var t1 = vertices2[i];
    var dot = $.add($.mul(t1.get$x(), normal1x), $.mul(t1.get$y(), normal1y));
    minDot0 = minDot;
    index0 = index;
    if ($.ltB(dot, minDot)) {
      minDot0 = dot;
      index0 = i;
    }
    var i0 = i + 1;
  }
  var v3 = $.index(vertices1, edge1);
  var v1y = $.add($.add(xf1.get$position().get$y(), $.mul(R.get$col1().get$y(), v3.get$x())), $.mul(R.get$col2().get$y(), v3.get$y()));
  var v1x = $.add($.add(xf1.get$position().get$x(), $.mul(R.get$col1().get$x(), v3.get$x())), $.mul(R.get$col2().get$x(), v3.get$y()));
  var t2 = vertices2.length;
  if (index < 0 || index >= t2) throw $.ioore(index);
  var t3 = vertices2[index];
  var v2y = $.sub($.add($.add(xf2.get$position().get$y(), $.mul(R1.get$col1().get$y(), t3.get$x())), $.mul(R1.get$col2().get$y(), t3.get$y())), v1y);
  return $.add($.mul($.sub($.add($.add(xf2.get$position().get$x(), $.mul(R1.get$col1().get$x(), t3.get$x())), $.mul(R1.get$col2().get$x(), t3.get$y())), v1x), normal1Worldx), $.mul(v2y, normal1Worldy));
 },
 edgeSeparation$5$bailout: function(poly1, xf1, edge1, poly2, xf2, state, env0, env1, env2, env3, env4, env5, env6, env7, env8) {
  switch (state) {
    case 1:
      vertices1 = env0;
      normals1 = env1;
      count2 = env2;
      count1 = env3;
      vertices2 = env4;
      break;
    case 2:
      normal1Worldx = env0;
      R1 = env1;
      vertices2 = env2;
      normal1Worldy = env3;
      vertices1 = env4;
      R = env5;
      count2 = env6;
      normal1x = env7;
      break;
    case 3:
      normal1Worldx = env0;
      R1 = env1;
      vertices2 = env2;
      normal1Worldy = env3;
      vertices1 = env4;
      count2 = env5;
      R = env6;
      normal1x = env7;
      normal1y = env8;
      break;
  }
  switch (state) {
    case 0:
      var count1 = poly1.get$vertexCount();
      var vertices1 = poly1.get$vertices();
      var normals1 = poly1.get$normals();
      var count2 = poly2.get$vertexCount();
      var vertices2 = poly2.get$vertices();
    case 1:
      state = 0;
      $.assert($.leB(0, edge1) && $.ltB(edge1, count1));
      var R = xf1.get$rotation();
      var v = $.index(normals1, edge1);
      var normal1Worldy = $.add($.mul(R.get$col1().get$y(), v.get$x()), $.mul(R.get$col2().get$y(), v.get$y()));
      var normal1Worldx = $.add($.mul(R.get$col1().get$x(), v.get$x()), $.mul(R.get$col2().get$x(), v.get$y()));
      var R1 = xf2.get$rotation();
      var normal1x = $.add($.mul(normal1Worldx, R1.get$col1().get$x()), $.mul(normal1Worldy, R1.get$col1().get$y()));
    case 2:
      state = 0;
      var normal1y = $.add($.mul(normal1Worldx, R1.get$col2().get$x()), $.mul(normal1Worldy, R1.get$col2().get$y()));
    case 3:
      state = 0;
      var minDot = 99999999999999.0;
      var index = 0;
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, count2)) break L0;
        var minDot0 = minDot;
        var index0 = index;
        var a = $.index(vertices2, i);
        var dot = $.add($.mul(a.get$x(), normal1x), $.mul(a.get$y(), normal1y));
        minDot0 = minDot;
        index0 = index;
        if ($.ltB(dot, minDot)) {
          minDot0 = dot;
          index0 = i;
        }
        var i0 = i + 1;
        minDot = minDot0;
        index = index0;
        i = i0;
      }
      var v3 = $.index(vertices1, edge1);
      var v1y = $.add($.add(xf1.get$position().get$y(), $.mul(R.get$col1().get$y(), v3.get$x())), $.mul(R.get$col2().get$y(), v3.get$y()));
      var v1x = $.add($.add(xf1.get$position().get$x(), $.mul(R.get$col1().get$x(), v3.get$x())), $.mul(R.get$col2().get$x(), v3.get$y()));
      var v4 = $.index(vertices2, index);
      var v2y = $.sub($.add($.add(xf2.get$position().get$y(), $.mul(R1.get$col1().get$y(), v4.get$x())), $.mul(R1.get$col2().get$y(), v4.get$y())), v1y);
      return $.add($.mul($.sub($.add($.add(xf2.get$position().get$x(), $.mul(R1.get$col1().get$x(), v4.get$x())), $.mul(R1.get$col2().get$x(), v4.get$y())), v1x), normal1Worldx), $.mul(v2y, normal1Worldy));
  }
 },
 collidePolygonAndCircle$5: function(manifold, polygon, xfA, circle, xfB) {
  manifold.set$pointCount(0);
  var v = circle.get$position();
  var cy = $.add($.add(xfB.get$position().get$y(), $.mul(xfB.get$rotation().get$col1().get$y(), v.get$x())), $.mul(xfB.get$rotation().get$col2().get$y(), v.get$y()));
  var v1x = $.sub($.add($.add(xfB.get$position().get$x(), $.mul(xfB.get$rotation().get$col1().get$x(), v.get$x())), $.mul(xfB.get$rotation().get$col2().get$x(), v.get$y())), xfA.get$position().get$x());
  var v1y = $.sub(cy, xfA.get$position().get$y());
  var b = xfA.get$rotation().get$col1();
  var b1 = xfA.get$rotation().get$col2();
  var cLocaly = $.add($.mul(v1x, b1.get$x()), $.mul(v1y, b1.get$y()));
  if (typeof cLocaly !== 'number') return this.collidePolygonAndCircle$5$bailout(manifold, polygon, xfA, circle, xfB, 1, v1x, v1y, b, cLocaly);
  var cLocalx = $.add($.mul(v1x, b.get$x()), $.mul(v1y, b.get$y()));
  if (typeof cLocalx !== 'number') return this.collidePolygonAndCircle$5$bailout(manifold, polygon, xfA, circle, xfB, 2, cLocaly, cLocalx);
  var radius = $.add(polygon.get$radius(), circle.get$radius());
  if (typeof radius !== 'number') return this.collidePolygonAndCircle$5$bailout(manifold, polygon, xfA, circle, xfB, 3, cLocaly, cLocalx, radius);
  var vertexCount = polygon.get$vertexCount();
  var vertices = polygon.get$vertices();
  if (typeof vertices !== 'string' && (typeof vertices !== 'object'||vertices.constructor !== Array)) return this.collidePolygonAndCircle$5$bailout(manifold, polygon, xfA, circle, xfB, 4, cLocaly, cLocalx, radius, vertexCount, vertices);
  var normals = polygon.get$normals();
  if (typeof normals !== 'string' && (typeof normals !== 'object'||normals.constructor !== Array)) return this.collidePolygonAndCircle$5$bailout(manifold, polygon, xfA, circle, xfB, 5, cLocaly, cLocalx, radius, vertices, vertexCount, normals);
  for (var normalIndex = 0, separation = 1e-12, i = 0; $.ltB(i, vertexCount); normalIndex = normalIndex0, separation = separation0, i = i0) {
    var normalIndex0 = normalIndex;
    var separation0 = separation;
    var t0 = vertices.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    var t1 = vertices[i];
    var tempx = $.sub(cLocalx, t1.get$x());
    var tempy = $.sub(cLocaly, t1.get$y());
    var t2 = normals.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    var t3 = normals[i];
    var s = $.add($.mul(t3.get$x(), tempx), $.mul(t3.get$y(), tempy));
    if ($.gtB(s, radius)) {
      return;
    }
    normalIndex0 = normalIndex;
    separation0 = separation;
    if ($.gtB(s, separation)) {
      normalIndex0 = i;
      separation0 = s;
    }
    var i0 = i + 1;
  }
  var t4 = normalIndex + 1;
  if ($.ltB(t4, vertexCount)) {
    var vertIndex2 = t4;
  } else {
    vertIndex2 = 0;
  }
  var t5 = vertices.length;
  if (normalIndex < 0 || normalIndex >= t5) throw $.ioore(normalIndex);
  var t6 = vertices[normalIndex];
  var t7 = vertices.length;
  if (vertIndex2 < 0 || vertIndex2 >= t7) throw $.ioore(vertIndex2);
  var t8 = vertices[vertIndex2];
  if ($.ltB(separation, 1.192e-7)) {
    manifold.set$pointCount(1);
    manifold.set$type(1);
    var t9 = normals.length;
    if (normalIndex < 0 || normalIndex >= t9) throw $.ioore(normalIndex);
    var t10 = normals[normalIndex];
    var t11 = t10.get$x();
    manifold.get$localNormal().set$x(t11);
    var t12 = t10.get$y();
    manifold.get$localNormal().set$y(t12);
    var t13 = $.mul($.add(t6.get$x(), t8.get$x()), 0.5);
    manifold.get$localPoint().set$x(t13);
    var t14 = $.mul($.add(t6.get$y(), t8.get$y()), 0.5);
    manifold.get$localPoint().set$y(t14);
    var mpoint = $.index(manifold.get$points(), 0);
    var t15 = circle.get$position().get$x();
    mpoint.get$localPoint().set$x(t15);
    var t16 = circle.get$position().get$y();
    mpoint.get$localPoint().set$y(t16);
    mpoint.get$id().zero$0();
    return;
  }
  var tempX = $.sub(cLocalx, t6.get$x());
  var tempY = $.sub(cLocaly, t6.get$y());
  var temp2X = $.sub(t8.get$x(), t6.get$x());
  var temp2Y = $.sub(t8.get$y(), t6.get$y());
  var u1 = $.mul(tempX, temp2X) + $.mul(tempY, temp2Y);
  var temp3X = $.sub(cLocalx, t8.get$x());
  var temp3Y = $.sub(cLocaly, t8.get$y());
  var temp4X = $.sub(t6.get$x(), t8.get$x());
  var temp4Y = $.sub(t6.get$y(), t8.get$y());
  var u2 = $.mul(temp3X, temp4X) + $.mul(temp3Y, temp4Y);
  if (u1 <= 0) {
    var dx = $.sub(cLocalx, t6.get$x());
    var dy = $.sub(cLocaly, t6.get$y());
    var t17 = dy * dy;
    var t18 = radius * radius;
    if (dx * dx + t17 > t18) {
      return;
    }
    manifold.set$pointCount(1);
    manifold.set$type(1);
    var t19 = $.sub(cLocalx, t6.get$x());
    manifold.get$localNormal().set$x(t19);
    var t20 = $.sub(cLocaly, t6.get$y());
    manifold.get$localNormal().set$y(t20);
    manifold.get$localNormal().normalize$0();
    manifold.get$localPoint().setFrom$1(t6);
    $.index(manifold.get$points(), 0).get$localPoint().setFrom$1(circle.get$position());
    $.index(manifold.get$points(), 0).get$id().zero$0();
  } else {
    if (u2 <= 0.0) {
      var dx0 = $.sub(cLocalx, t8.get$x());
      var dy0 = $.sub(cLocaly, t8.get$y());
      var t21 = dx0 * dx0;
      var t22 = radius * radius;
      if (t21 + dy0 * dy0 > t22) {
        return;
      }
      manifold.set$pointCount(1);
      manifold.set$type(1);
      var t23 = $.sub(cLocalx, t8.get$x());
      manifold.get$localNormal().set$x(t23);
      var t24 = $.sub(cLocaly, t8.get$y());
      manifold.get$localNormal().set$y(t24);
      manifold.get$localNormal().normalize$0();
      manifold.get$localPoint().setFrom$1(t8);
      $.index(manifold.get$points(), 0).get$localPoint().setFrom$1(circle.get$position());
      $.index(manifold.get$points(), 0).get$id().zero$0();
    } else {
      var fcx = $.mul($.add(t6.get$x(), t8.get$x()), 0.5);
      var fcy = $.mul($.add(t6.get$y(), t8.get$y()), 0.5);
      var tx = $.sub(cLocalx, fcx);
      var ty = $.sub(cLocaly, fcy);
      var t25 = normals.length;
      if (normalIndex < 0 || normalIndex >= t25) throw $.ioore(normalIndex);
      var t26 = normals[normalIndex];
      if ($.mul(tx, t26.get$x()) + $.mul(ty, t26.get$y()) > radius) {
        return;
      }
      manifold.set$pointCount(1);
      manifold.set$type(1);
      var t27 = manifold.get$localNormal();
      var t28 = normals.length;
      if (normalIndex < 0 || normalIndex >= t28) throw $.ioore(normalIndex);
      t27.setFrom$1(normals[normalIndex]);
      manifold.get$localPoint().set$x(fcx);
      manifold.get$localPoint().set$y(fcy);
      $.index(manifold.get$points(), 0).get$localPoint().setFrom$1(circle.get$position());
      $.index(manifold.get$points(), 0).get$id().zero$0();
    }
  }
 },
 collidePolygonAndCircle$5$bailout: function(manifold, polygon, xfA, circle, xfB, state, env0, env1, env2, env3, env4, env5) {
  switch (state) {
    case 1:
      v1x = env0;
      v1y = env1;
      b = env2;
      cLocaly = env3;
      break;
    case 2:
      cLocaly = env0;
      cLocalx = env1;
      break;
    case 3:
      cLocaly = env0;
      cLocalx = env1;
      radius = env2;
      break;
    case 4:
      cLocaly = env0;
      cLocalx = env1;
      radius = env2;
      vertexCount = env3;
      vertices = env4;
      break;
    case 5:
      cLocaly = env0;
      cLocalx = env1;
      radius = env2;
      vertices = env3;
      vertexCount = env4;
      normals = env5;
      break;
  }
  switch (state) {
    case 0:
      manifold.set$pointCount(0);
      var v = circle.get$position();
      var cy = $.add($.add(xfB.get$position().get$y(), $.mul(xfB.get$rotation().get$col1().get$y(), v.get$x())), $.mul(xfB.get$rotation().get$col2().get$y(), v.get$y()));
      var v1x = $.sub($.add($.add(xfB.get$position().get$x(), $.mul(xfB.get$rotation().get$col1().get$x(), v.get$x())), $.mul(xfB.get$rotation().get$col2().get$x(), v.get$y())), xfA.get$position().get$x());
      var v1y = $.sub(cy, xfA.get$position().get$y());
      var b = xfA.get$rotation().get$col1();
      var b1 = xfA.get$rotation().get$col2();
      var cLocaly = $.add($.mul(v1x, b1.get$x()), $.mul(v1y, b1.get$y()));
    case 1:
      state = 0;
      var cLocalx = $.add($.mul(v1x, b.get$x()), $.mul(v1y, b.get$y()));
    case 2:
      state = 0;
      var radius = $.add(polygon.get$radius(), circle.get$radius());
    case 3:
      state = 0;
      var vertexCount = polygon.get$vertexCount();
      var vertices = polygon.get$vertices();
    case 4:
      state = 0;
      var normals = polygon.get$normals();
    case 5:
      state = 0;
      var normalIndex = 0;
      var separation = 1e-12;
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, vertexCount)) break L0;
        var normalIndex0 = normalIndex;
        var separation0 = separation;
        var vertex = $.index(vertices, i);
        var tempx = $.sub(cLocalx, vertex.get$x());
        var tempy = $.sub(cLocaly, vertex.get$y());
        var norm = $.index(normals, i);
        var s = $.add($.mul(norm.get$x(), tempx), $.mul(norm.get$y(), tempy));
        if ($.gtB(s, radius)) {
          return;
        }
        normalIndex0 = normalIndex;
        separation0 = separation;
        if ($.gtB(s, separation)) {
          normalIndex0 = i;
          separation0 = s;
        }
        var i0 = i + 1;
        normalIndex = normalIndex0;
        separation = separation0;
        i = i0;
      }
      var t0 = normalIndex + 1;
      if ($.ltB(t0, vertexCount)) {
        var vertIndex2 = t0;
      } else {
        vertIndex2 = 0;
      }
      var v1 = $.index(vertices, normalIndex);
      var v2 = $.index(vertices, vertIndex2);
      if ($.ltB(separation, 1.192e-7)) {
        manifold.set$pointCount(1);
        manifold.set$type(1);
        var norm0 = $.index(normals, normalIndex);
        var t1 = norm0.get$x();
        manifold.get$localNormal().set$x(t1);
        var t2 = norm0.get$y();
        manifold.get$localNormal().set$y(t2);
        var t3 = $.mul($.add(v1.get$x(), v2.get$x()), 0.5);
        manifold.get$localPoint().set$x(t3);
        var t4 = $.mul($.add(v1.get$y(), v2.get$y()), 0.5);
        manifold.get$localPoint().set$y(t4);
        var mpoint = $.index(manifold.get$points(), 0);
        var t5 = circle.get$position().get$x();
        mpoint.get$localPoint().set$x(t5);
        var t6 = circle.get$position().get$y();
        mpoint.get$localPoint().set$y(t6);
        mpoint.get$id().zero$0();
        return;
      }
      var tempX = $.sub(cLocalx, v1.get$x());
      var tempY = $.sub(cLocaly, v1.get$y());
      var temp2X = $.sub(v2.get$x(), v1.get$x());
      var temp2Y = $.sub(v2.get$y(), v1.get$y());
      var u1 = $.add($.mul(tempX, temp2X), $.mul(tempY, temp2Y));
      var temp3X = $.sub(cLocalx, v2.get$x());
      var temp3Y = $.sub(cLocaly, v2.get$y());
      var temp4X = $.sub(v1.get$x(), v2.get$x());
      var temp4Y = $.sub(v1.get$y(), v2.get$y());
      var u2 = $.add($.mul(temp3X, temp4X), $.mul(temp3Y, temp4Y));
      if ($.leB(u1, 0)) {
        var dx = $.sub(cLocalx, v1.get$x());
        var dy = $.sub(cLocaly, v1.get$y());
        if ($.gtB($.add($.mul(dx, dx), $.mul(dy, dy)), $.mul(radius, radius))) {
          return;
        }
        manifold.set$pointCount(1);
        manifold.set$type(1);
        var t7 = $.sub(cLocalx, v1.get$x());
        manifold.get$localNormal().set$x(t7);
        var t8 = $.sub(cLocaly, v1.get$y());
        manifold.get$localNormal().set$y(t8);
        manifold.get$localNormal().normalize$0();
        manifold.get$localPoint().setFrom$1(v1);
        $.index(manifold.get$points(), 0).get$localPoint().setFrom$1(circle.get$position());
        $.index(manifold.get$points(), 0).get$id().zero$0();
      } else {
        if ($.leB(u2, 0.0)) {
          var dx0 = $.sub(cLocalx, v2.get$x());
          var dy0 = $.sub(cLocaly, v2.get$y());
          if ($.gtB($.add($.mul(dx0, dx0), $.mul(dy0, dy0)), $.mul(radius, radius))) {
            return;
          }
          manifold.set$pointCount(1);
          manifold.set$type(1);
          var t9 = $.sub(cLocalx, v2.get$x());
          manifold.get$localNormal().set$x(t9);
          var t10 = $.sub(cLocaly, v2.get$y());
          manifold.get$localNormal().set$y(t10);
          manifold.get$localNormal().normalize$0();
          manifold.get$localPoint().setFrom$1(v2);
          $.index(manifold.get$points(), 0).get$localPoint().setFrom$1(circle.get$position());
          $.index(manifold.get$points(), 0).get$id().zero$0();
        } else {
          var fcx = $.mul($.add(v1.get$x(), v2.get$x()), 0.5);
          var fcy = $.mul($.add(v1.get$y(), v2.get$y()), 0.5);
          var tx = $.sub(cLocalx, fcx);
          var ty = $.sub(cLocaly, fcy);
          var norm1 = $.index(normals, normalIndex);
          if ($.gtB($.add($.mul(tx, norm1.get$x()), $.mul(ty, norm1.get$y())), radius)) {
            return;
          }
          manifold.set$pointCount(1);
          manifold.set$type(1);
          manifold.get$localNormal().setFrom$1($.index(normals, normalIndex));
          manifold.get$localPoint().set$x(fcx);
          manifold.get$localPoint().set$y(fcy);
          $.index(manifold.get$points(), 0).get$localPoint().setFrom$1(circle.get$position());
          $.index(manifold.get$points(), 0).get$id().zero$0();
        }
      }
  }
 },
 collideCircles$5: function(manifold, circle1, xfA, circle2, xfB) {
  manifold.set$pointCount(0);
  var v = circle1.get$position();
  var pAy = $.add($.add(xfA.get$position().get$y(), $.mul(xfA.get$rotation().get$col1().get$y(), v.get$x())), $.mul(xfA.get$rotation().get$col2().get$y(), v.get$y()));
  var pAx = $.add($.add(xfA.get$position().get$x(), $.mul(xfA.get$rotation().get$col1().get$x(), v.get$x())), $.mul(xfA.get$rotation().get$col2().get$x(), v.get$y()));
  var v1 = circle2.get$position();
  var pBy = $.add($.add(xfB.get$position().get$y(), $.mul(xfB.get$rotation().get$col1().get$y(), v1.get$x())), $.mul(xfB.get$rotation().get$col2().get$y(), v1.get$y()));
  var dx = $.sub($.add($.add(xfB.get$position().get$x(), $.mul(xfB.get$rotation().get$col1().get$x(), v1.get$x())), $.mul(xfB.get$rotation().get$col2().get$x(), v1.get$y())), pAx);
  var dy = $.sub(pBy, pAy);
  var distSqr = $.add($.mul(dx, dx), $.mul(dy, dy));
  var radius = $.add(circle1.get$radius(), circle2.get$radius());
  if ($.gtB(distSqr, $.mul(radius, radius))) {
    return;
  }
  manifold.set$type(0);
  manifold.get$localPoint().setFrom$1(circle1.get$position());
  manifold.get$localNormal().setZero$0();
  manifold.set$pointCount(1);
  $.index(manifold.get$points(), 0).get$localPoint().setFrom$1(circle2.get$position());
  $.index(manifold.get$points(), 0).get$id().zero$0();
 },
 testOverlap$4: function(shapeA, shapeB, transformA, transformB) {
  this.input.get$proxyA().setFromShape$1(shapeA);
  this.input.get$proxyB().setFromShape$1(shapeB);
  this.input.get$transformA().setFrom$1(transformA);
  this.input.get$transformB().setFrom$1(transformB);
  this.input.set$useRadii(true);
  this.cache.set$count(0);
  this._pool.get$distance().distance$3(this.output, this.cache, this.input);
  return $.lt(this.output.get$distance(), 0.000001192);
 },
 Collision$_construct$1: function(pool) {
  $.indexSet(this.incidentEdge, 0, $.ClipVertex$0());
  $.indexSet(this.incidentEdge, 1, $.ClipVertex$0());
  $.indexSet(this.clipPoints1, 0, $.ClipVertex$0());
  $.indexSet(this.clipPoints1, 1, $.ClipVertex$0());
  $.indexSet(this.clipPoints2, 0, $.ClipVertex$0());
  $.indexSet(this.clipPoints2, 1, $.ClipVertex$0());
 }
});

Isolate.$defineClass("ClipVertex", "Object", ["id?", "v?"], {
 setFrom$1: function(cv) {
  this.v.setFrom$1(cv.get$v());
  this.id.setFrom$1(cv.get$id());
 }
});

Isolate.$defineClass("EdgeResults", "Object", ["edgeIndex=", "separation="], {
});

Isolate.$defineClass("ContactID", "Object", ["features?"], {
 zero$0: function() {
  this.features.zero$0();
 },
 isEqual$1: function(other) {
  return $.eq(other.get$features(), this.features);
 },
 setFrom$1: function(other) {
  this.features.setFrom$1(other.get$features());
 },
 operator$eq$1: function(other) {
  return $.eq(other.get$features(), this.features);
 }
});

Isolate.$defineClass("Distance", "Object", ["normal?", "temp", "searchDirection", "closestPoint", "saveB", "saveA", "simplex", "maxIters", "iters", "calls"], {
 distance$3: function(output, cache, input) {
  this.calls = $.add(this.calls, 1);
  var proxyA = input.get$proxyA();
  var proxyB = input.get$proxyB();
  var transformA = input.get$transformA();
  var transformB = input.get$transformB();
  this.simplex.readCache$5(cache, proxyA, transformA, proxyB, transformB);
  var vertices = this.simplex.get$vertices();
  if (typeof vertices !== 'string' && (typeof vertices !== 'object'||vertices.constructor !== Array)) return this.distance$3$bailout(output, cache, input, 1, proxyA, proxyB, transformA, transformB, vertices);
  this.simplex.getClosestPoint$1(this.closestPoint);
  var distanceSqr1 = this.closestPoint.get$lengthSquared();
  for (var distanceSqr2 = distanceSqr1, iter = 0, distanceSqr10 = distanceSqr1, saveCount = 0; iter0 = iter, $.ltB(iter, this.maxIters); iter = iter1) {
    var iter1 = iter;
    var saveCount0 = this.simplex.get$count();
    if (saveCount0 !== (saveCount0 | 0)) return this.distance$3$bailout(output, cache, input, 2, iter, vertices, proxyA, proxyB, transformA, transformB, saveCount0);
    for (var i = 0; i < saveCount0; i = i + 1) {
      var t0 = this.saveA;
      var t1 = vertices.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      $.indexSet(t0, i, vertices[i].get$indexA());
      var t2 = this.saveB;
      var t3 = vertices.length;
      if (i < 0 || i >= t3) throw $.ioore(i);
      $.indexSet(t2, i, vertices[i].get$indexB());
    }
    $1:{
      var t4 = this.simplex.get$count();
      if (1 === t4) {
        break $1;
      } else {
        if (2 === t4) {
          this.simplex.solve2$0();
          break $1;
        } else {
          if (3 === t4) {
            this.simplex.solve3$0();
            break $1;
          } else {
            $.assert(false);
          }
        }
      }
    }
    if ($.eqB(this.simplex.get$count(), 3)) {
      iter0 = iter;
      break;
    }
    this.simplex.getClosestPoint$1(this.closestPoint);
    var distanceSqr20 = this.closestPoint.get$lengthSquared();
    this.simplex.getSearchDirection$1(this.searchDirection);
    if ($.ltB(this.searchDirection.get$lengthSquared(), 1.4208639999999999e-14)) {
      iter0 = iter;
      break;
    }
    var t5 = this.simplex.get$count();
    if (t5 !== (t5 | 0)) throw $.iae(t5);
    var t6 = vertices.length;
    if (t5 < 0 || t5 >= t6) throw $.ioore(t5);
    var t7 = vertices[t5];
    $.mulTransMatrixAndVectorToOut(transformA.get$rotation(), this.searchDirection.negateLocal$0(), this.temp);
    t7.set$indexA(proxyA.getSupport$1(this.temp));
    $.mulToOut(transformA, $.index(proxyA.get$vertices(), t7.get$indexA()), t7.get$wA());
    $.mulTransMatrixAndVectorToOut(transformB.get$rotation(), this.searchDirection.negateLocal$0(), this.temp);
    t7.set$indexB(proxyB.getSupport$1(this.temp));
    $.mulToOut(transformB, $.index(proxyB.get$vertices(), t7.get$indexB()), t7.get$wB());
    t7.get$w().setFrom$1(t7.get$wB()).subLocal$1(t7.get$wA());
    var iter2 = iter + 1;
    this.iters = $.add(this.iters, 1);
    for (var i0 = 0; duplicate = false, i0 < saveCount0; i0 = i0 + 1) {
      if ($.eqB(t7.get$indexA(), $.index(this.saveA, i0)) && $.eqB(t7.get$indexB(), $.index(this.saveB, i0))) {
        duplicate = true;
        break;
      }
    }
    if (duplicate) {
      iter0 = iter2;
      break;
    }
    var t8 = this.simplex;
    t8.set$count($.add(t8.get$count(), 1));
    distanceSqr2 = distanceSqr20;
    saveCount = saveCount0;
    distanceSqr10 = distanceSqr20;
    iter1 = iter2;
  }
  this.maxIters = $.max(this.maxIters, iter0);
  this.simplex.getWitnessPoints$2(output.get$pointA(), output.get$pointB());
  output.set$distance($.distance(output.get$pointA(), output.get$pointB()));
  output.set$iterations(iter0);
  this.simplex.writeCache$1(cache);
  if (input.get$useRadii() === true) {
    var rA = proxyA.get$radius();
    var rB = proxyB.get$radius();
    if ($.gtB(output.get$distance(), $.add(rA, rB)) && $.gtB(output.get$distance(), 1.192e-7)) {
      output.set$distance($.sub(output.get$distance(), $.add(rA, rB)));
      this.normal.setFrom$1(output.get$pointB()).subLocal$1(output.get$pointA());
      this.normal.normalize$0();
      this.temp.setFrom$1(this.normal).mulLocal$1(rA);
      output.get$pointA().addLocal$1(this.temp);
      this.temp.setFrom$1(this.normal).mulLocal$1(rB);
      output.get$pointB().subLocal$1(this.temp);
    } else {
      output.get$pointA().addLocal$1(output.get$pointB()).mulLocal$1(0.5);
      output.get$pointB().setFrom$1(output.get$pointA());
      output.set$distance(0.0);
    }
  }
  var duplicate, iter0;
 },
 distance$3$bailout: function(output, cache, input, state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      proxyA = env0;
      proxyB = env1;
      transformA = env2;
      transformB = env3;
      vertices = env4;
      break;
    case 2:
      iter = env0;
      vertices = env1;
      proxyA = env2;
      proxyB = env3;
      transformA = env4;
      transformB = env5;
      saveCount0 = env6;
      break;
  }
  switch (state) {
    case 0:
      this.calls = $.add(this.calls, 1);
      var proxyA = input.get$proxyA();
      var proxyB = input.get$proxyB();
      var transformA = input.get$transformA();
      var transformB = input.get$transformB();
      this.simplex.readCache$5(cache, proxyA, transformA, proxyB, transformB);
      var vertices = this.simplex.get$vertices();
    case 1:
      state = 0;
      this.simplex.getClosestPoint$1(this.closestPoint);
      var distanceSqr1 = this.closestPoint.get$lengthSquared();
      var distanceSqr2 = distanceSqr1;
      var iter = 0;
      var distanceSqr10 = distanceSqr1;
      var saveCount = 0;
    case 2:
      L0: while (true) {
        switch (state) {
          case 0:
            var iter0 = iter;
            if (!$.ltB(iter, this.maxIters)) break L0;
            var iter1 = iter;
            var saveCount0 = this.simplex.get$count();
          case 2:
            state = 0;
            var i = 0;
            L1: while (true) {
              if (!$.ltB(i, saveCount0)) break L1;
              $.indexSet(this.saveA, i, $.index(vertices, i).get$indexA());
              $.indexSet(this.saveB, i, $.index(vertices, i).get$indexB());
              i = i + 1;
            }
            $1:{
              var t0 = this.simplex.get$count();
              if (1 === t0) {
                break $1;
              } else {
                if (2 === t0) {
                  this.simplex.solve2$0();
                  break $1;
                } else {
                  if (3 === t0) {
                    this.simplex.solve3$0();
                    break $1;
                  } else {
                    $.assert(false);
                  }
                }
              }
            }
            if ($.eqB(this.simplex.get$count(), 3)) {
              iter0 = iter;
              break L0;
            }
            this.simplex.getClosestPoint$1(this.closestPoint);
            var distanceSqr20 = this.closestPoint.get$lengthSquared();
            this.simplex.getSearchDirection$1(this.searchDirection);
            if ($.ltB(this.searchDirection.get$lengthSquared(), 1.4208639999999999e-14)) {
              iter0 = iter;
              break L0;
            }
            var vertex = $.index(vertices, this.simplex.get$count());
            $.mulTransMatrixAndVectorToOut(transformA.get$rotation(), this.searchDirection.negateLocal$0(), this.temp);
            vertex.set$indexA(proxyA.getSupport$1(this.temp));
            $.mulToOut(transformA, $.index(proxyA.get$vertices(), vertex.get$indexA()), vertex.get$wA());
            $.mulTransMatrixAndVectorToOut(transformB.get$rotation(), this.searchDirection.negateLocal$0(), this.temp);
            vertex.set$indexB(proxyB.getSupport$1(this.temp));
            $.mulToOut(transformB, $.index(proxyB.get$vertices(), vertex.get$indexB()), vertex.get$wB());
            vertex.get$w().setFrom$1(vertex.get$wB()).subLocal$1(vertex.get$wA());
            var iter2 = iter + 1;
            this.iters = $.add(this.iters, 1);
            var i0 = 0;
            L2: while (true) {
              var duplicate = false;
              if (!$.ltB(i0, saveCount0)) break L2;
              if ($.eqB(vertex.get$indexA(), $.index(this.saveA, i0)) && $.eqB(vertex.get$indexB(), $.index(this.saveB, i0))) {
                duplicate = true;
                break;
              }
              i0 = i0 + 1;
            }
            if (duplicate) {
              iter0 = iter2;
              break L0;
            }
            var t1 = this.simplex;
            t1.set$count($.add(t1.get$count(), 1));
            distanceSqr2 = distanceSqr20;
            saveCount = saveCount0;
            distanceSqr10 = distanceSqr20;
            iter1 = iter2;
            iter = iter1;
        }
      }
      this.maxIters = $.max(this.maxIters, iter0);
      this.simplex.getWitnessPoints$2(output.get$pointA(), output.get$pointB());
      output.set$distance($.distance(output.get$pointA(), output.get$pointB()));
      output.set$iterations(iter0);
      this.simplex.writeCache$1(cache);
      if (input.get$useRadii() === true) {
        var rA = proxyA.get$radius();
        var rB = proxyB.get$radius();
        if ($.gtB(output.get$distance(), $.add(rA, rB)) && $.gtB(output.get$distance(), 1.192e-7)) {
          output.set$distance($.sub(output.get$distance(), $.add(rA, rB)));
          this.normal.setFrom$1(output.get$pointB()).subLocal$1(output.get$pointA());
          this.normal.normalize$0();
          this.temp.setFrom$1(this.normal).mulLocal$1(rA);
          output.get$pointA().addLocal$1(this.temp);
          this.temp.setFrom$1(this.normal).mulLocal$1(rB);
          output.get$pointB().subLocal$1(this.temp);
        } else {
          output.get$pointA().addLocal$1(output.get$pointB()).mulLocal$1(0.5);
          output.get$pointB().setFrom$1(output.get$pointA());
          output.set$distance(0.0);
        }
      }
  }
 },
 get$distance: function() { return new $.Closure45(this); }
});

Isolate.$defineClass("DistanceInput", "Object", ["useRadii=", "transformB=", "transformA=", "proxyB=", "proxyA="], {
});

Isolate.$defineClass("DistanceOutput", "Object", ["iterations!", "distance=", "pointB?", "pointA?"], {
 distance$3: function(arg0, arg1, arg2) { return this.distance.$call$3(arg0, arg1, arg2); }
});

Isolate.$defineClass("DistanceProxy", "Object", ["radius=", "count=", "vertices?"], {
 getSupport$1: function(direction) {
  var bestValue = $.dot($.index(this.vertices, 0), direction);
  if (typeof bestValue !== 'number') return this.getSupport$1$bailout(direction, 1, bestValue);
  for (var bestIndex = 0, i = 1, bestValue0 = bestValue; $.ltB(i, this.count); bestIndex = bestIndex0, i = i0, bestValue0 = bestValue1) {
    var bestIndex0 = bestIndex;
    var bestValue1 = bestValue0;
    var value = $.dot($.index(this.vertices, i), direction);
    bestIndex0 = bestIndex;
    bestValue1 = bestValue0;
    if ($.gtB(value, bestValue0)) {
      bestIndex0 = i;
      bestValue1 = value;
    }
    var i0 = i + 1;
  }
  return bestIndex;
 },
 getSupport$1$bailout: function(direction, state, env0) {
  switch (state) {
    case 1:
      bestValue = env0;
      break;
  }
  switch (state) {
    case 0:
      var bestValue = $.dot($.index(this.vertices, 0), direction);
    case 1:
      state = 0;
      var bestIndex = 0;
      var i = 1;
      var bestValue0 = bestValue;
      L0: while (true) {
        if (!$.ltB(i, this.count)) break L0;
        var bestIndex0 = bestIndex;
        var bestValue1 = bestValue0;
        var value = $.dot($.index(this.vertices, i), direction);
        bestIndex0 = bestIndex;
        bestValue1 = bestValue0;
        if ($.gtB(value, bestValue0)) {
          bestIndex0 = i;
          bestValue1 = value;
        }
        var i0 = i + 1;
        bestIndex = bestIndex0;
        i = i0;
        bestValue0 = bestValue1;
      }
      return bestIndex;
  }
 },
 setFromShape$1: function(shape) {
  if ($.eqB(shape.get$type(), 0)) {
    $.index(this.vertices, 0).setFrom$1(shape.get$position());
    this.count = 1;
    this.radius = shape.get$radius();
  } else {
    if ($.eqB(shape.get$type(), 1)) {
      this.count = shape.get$vertexCount();
      this.radius = shape.get$radius();
      for (var i = 0; $.ltB(i, this.count); i = i + 1) {
        $.index(this.vertices, i).setFrom$1($.index(shape.get$vertices(), i));
      }
    } else {
      $.assert(false);
    }
  }
 },
 DistanceProxy$0: function() {
  for (var i = 0; $.ltB(i, $.get$length(this.vertices)); i = i + 1) {
    $.indexSet(this.vertices, i, $.Vector$2(0, 0));
  }
 }
});

Isolate.$defineClass("Features", "Object", ["flip=", "incidentVertex=", "incidentEdge=", "referenceEdge="], {
 zero$0: function() {
  this.referenceEdge = 0;
  this.incidentEdge = 0;
  this.incidentVertex = 0;
  this.flip = 0;
 },
 toString$0: function() {
  return $.add($.add($.add($.add('Features: (', this.flip) + ' ,', this.incidentEdge) + ' ,', this.incidentVertex) + ' ,', this.referenceEdge) + ')';
 },
 operator$eq$1: function(other) {
  return $.eqB(this.referenceEdge, other.get$referenceEdge()) && $.eqB(this.incidentEdge, other.get$incidentEdge()) && $.eqB(this.incidentVertex, other.get$incidentVertex()) && $.eqB(this.flip, other.get$flip());
 },
 setFrom$1: function(f) {
  this.referenceEdge = f.get$referenceEdge();
  this.incidentEdge = f.get$incidentEdge();
  this.incidentVertex = f.get$incidentVertex();
  this.flip = f.get$flip();
 }
});

Isolate.$defineClass("Manifold", "Object", ["pointCount=", "type=", "localPoint?", "localNormal?", "points?"], {
 setFrom$1: function(other) {
  for (var i = 0; $.ltB(i, other.get$pointCount()); i = i + 1) {
    $.index(this.points, i).setFrom$1($.index(other.get$points(), i));
  }
  this.type = other.get$type();
  this.localNormal.setFrom$1(other.get$localNormal());
  this.localPoint.setFrom$1(other.get$localPoint());
  this.pointCount = other.get$pointCount();
 },
 Manifold$0: function() {
  for (var i = 0; i < 2; i = i + 1) {
    $.indexSet(this.points, i, $.ManifoldPoint$0());
  }
 }
});

Isolate.$defineClass("ManifoldPoint", "Object", ["id?", "tangentImpulse=", "normalImpulse=", "localPoint?"], {
 setFrom$1: function(other) {
  this.localPoint.setFrom$1(other.get$localPoint());
  this.normalImpulse = other.get$normalImpulse();
  this.tangentImpulse = other.get$tangentImpulse();
  this.id.setFrom$1(other.get$id());
 }
});

Isolate.$defineClass("Simplex", "Object", ["case33", "case3", "case22", "case2", "e12", "e23", "e13", "count=", "vertices?", "v3", "v2", "v1"], {
 solve3$0: function() {
  var w1 = this.v1.get$w();
  var w2 = this.v2.get$w();
  var w3 = this.v3.get$w();
  this.e12.setFrom$1(w2).subLocal$1(w1);
  var w1e12 = $.dot(w1, this.e12);
  var w2e12 = $.dot(w2, this.e12);
  var d12_2 = $.neg(w1e12);
  this.e13.setFrom$1(w3).subLocal$1(w1);
  var w1e13 = $.dot(w1, this.e13);
  var w3e13 = $.dot(w3, this.e13);
  var d13_2 = $.neg(w1e13);
  this.e23.setFrom$1(w3).subLocal$1(w2);
  var w2e23 = $.dot(w2, this.e23);
  var w3e23 = $.dot(w3, this.e23);
  var d23_2 = $.neg(w2e23);
  var n123 = $.crossVectors(this.e12, this.e13);
  var d123_1 = $.mul(n123, $.crossVectors(w2, w3));
  var d123_2 = $.mul(n123, $.crossVectors(w3, w1));
  var d123_3 = $.mul(n123, $.crossVectors(w1, w2));
  if ($.leB(d12_2, 0.0) && $.leB(d13_2, 0.0)) {
    this.v1.set$a(1.0);
    this.count = 1;
    return;
  }
  if ($.gtB(w2e12, 0.0) && $.gtB(d12_2, 0.0) && $.leB(d123_3, 0.0)) {
    var inv_d12 = $.div(1.0, $.add(w2e12, d12_2));
    var t0 = $.mul(w2e12, inv_d12);
    this.v1.set$a(t0);
    var t1 = $.mul(d12_2, inv_d12);
    this.v2.set$a(t1);
    this.count = 2;
    return;
  }
  if ($.gtB(w3e13, 0.0) && $.gtB(d13_2, 0.0) && $.leB(d123_2, 0.0)) {
    var inv_d13 = $.div(1.0, $.add(w3e13, d13_2));
    var t2 = $.mul(w3e13, inv_d13);
    this.v1.set$a(t2);
    var t3 = $.mul(d13_2, inv_d13);
    this.v3.set$a(t3);
    this.count = 2;
    this.v2.setFrom$1(this.v3);
    return;
  }
  if ($.leB(w2e12, 0.0) && $.leB(d23_2, 0.0)) {
    this.v2.set$a(1.0);
    this.count = 1;
    this.v1.setFrom$1(this.v2);
    return;
  }
  if ($.leB(w3e13, 0.0) && $.leB(w3e23, 0.0)) {
    this.v3.set$a(1.0);
    this.count = 1;
    this.v1.setFrom$1(this.v3);
    return;
  }
  if ($.gtB(w3e23, 0.0) && $.gtB(d23_2, 0.0) && $.leB(d123_1, 0.0)) {
    var inv_d23 = $.div(1.0, $.add(w3e23, d23_2));
    var t4 = $.mul(w3e23, inv_d23);
    this.v2.set$a(t4);
    var t5 = $.mul(d23_2, inv_d23);
    this.v3.set$a(t5);
    this.count = 2;
    this.v1.setFrom$1(this.v3);
    return;
  }
  var inv_d123 = $.div(1.0, $.add($.add(d123_1, d123_2), d123_3));
  var t6 = $.mul(d123_1, inv_d123);
  this.v1.set$a(t6);
  var t7 = $.mul(d123_2, inv_d123);
  this.v2.set$a(t7);
  var t8 = $.mul(d123_3, inv_d123);
  this.v3.set$a(t8);
  this.count = 3;
 },
 solve2$0: function() {
  var w1 = this.v1.get$w();
  var w2 = this.v2.get$w();
  this.e12.setFrom$1(w2).subLocal$1(w1);
  var d12_2 = $.neg($.dot(w1, this.e12));
  if ($.leB(d12_2, 0.0)) {
    this.v1.set$a(1.0);
    this.count = 1;
    return;
  }
  var d12_1 = $.dot(w2, this.e12);
  if ($.leB(d12_1, 0.0)) {
    this.v2.set$a(1.0);
    this.count = 1;
    this.v1.setFrom$1(this.v2);
    return;
  }
  var inv_d12 = $.div(1.0, $.add(d12_1, d12_2));
  var t0 = $.mul(d12_1, inv_d12);
  this.v1.set$a(t0);
  var t1 = $.mul(d12_2, inv_d12);
  this.v2.set$a(t1);
  this.count = 2;
 },
 getMetric$0: function() {
  $0:{
    var t0 = this.count;
    if (0 === t0) {
      $.assert(false);
      return 0.0;
    } else {
      if (1 === t0) {
        return 0.0;
      } else {
        if (2 === t0) {
          return $.distance(this.v1.get$w(), this.v2.get$w());
        } else {
          if (3 === t0) {
            this.case3.setFrom$1(this.v2.get$w()).subLocal$1(this.v1.get$w());
            this.case33.setFrom$1(this.v3.get$w()).subLocal$1(this.v1.get$w());
            return $.crossVectors(this.case3, this.case33);
          } else {
            $.assert(false);
            return 0.0;
          }
        }
      }
    }
  }
 },
 getWitnessPoints$2: function(pA, pB) {
  $0:{
    var t0 = this.count;
    if (0 === t0) {
      $.assert(false);
      break $0;
    } else {
      if (1 === t0) {
        pA.setFrom$1(this.v1.get$wA());
        pB.setFrom$1(this.v1.get$wB());
        break $0;
      } else {
        if (2 === t0) {
          this.case2.setFrom$1(this.v1.get$wA()).mulLocal$1(this.v1.get$a());
          pA.setFrom$1(this.v2.get$wA()).mulLocal$1(this.v2.get$a()).addLocal$1(this.case2);
          this.case2.setFrom$1(this.v1.get$wB()).mulLocal$1(this.v1.get$a());
          pB.setFrom$1(this.v2.get$wB()).mulLocal$1(this.v2.get$a()).addLocal$1(this.case2);
          break $0;
        } else {
          if (3 === t0) {
            pA.setFrom$1(this.v1.get$wA()).mulLocal$1(this.v1.get$a());
            this.case3.setFrom$1(this.v2.get$wA()).mulLocal$1(this.v2.get$a());
            this.case33.setFrom$1(this.v3.get$wA()).mulLocal$1(this.v3.get$a());
            pA.addLocal$1(this.case3).addLocal$1(this.case33);
            pB.setFrom$1(pA);
            break $0;
          } else {
            $.assert(false);
            break $0;
          }
        }
      }
    }
  }
 },
 getClosestPoint$1: function(out) {
  $0:{
    var t0 = this.count;
    if (0 === t0) {
      $.assert(false);
      out.setZero$0();
      return;
    } else {
      if (1 === t0) {
        out.setFrom$1(this.v1.get$w());
        return;
      } else {
        if (2 === t0) {
          this.case22.setFrom$1(this.v2.get$w()).mulLocal$1(this.v2.get$a());
          this.case2.setFrom$1(this.v1.get$w()).mulLocal$1(this.v1.get$a()).addLocal$1(this.case22);
          out.setFrom$1(this.case2);
          return;
        } else {
          if (3 === t0) {
            out.setZero$0();
            return;
          } else {
            $.assert(false);
            out.setZero$0();
            return;
          }
        }
      }
    }
  }
 },
 getSearchDirection$1: function(out) {
  $0:{
    var t0 = this.count;
    if (1 === t0) {
      out.setFrom$1(this.v1.get$w()).negateLocal$0();
      return;
    } else {
      if (2 === t0) {
        this.e12.setFrom$1(this.v2.get$w()).subLocal$1(this.v1.get$w());
        out.setFrom$1(this.v1.get$w()).negateLocal$0();
        if ($.gtB($.crossVectors(this.e12, out), 0)) {
          $.crossNumAndVectorToOut(1, this.e12, out);
          return;
        } else {
          $.crossVectorAndNumToOut(this.e12, 1, out);
          return;
        }
      } else {
        $.assert(false);
        out.setZero$0();
        return;
      }
    }
  }
 },
 writeCache$1: function(cache) {
  cache.set$metric(this.getMetric$0());
  cache.set$count(this.count);
  for (var i = 0; $.ltB(i, this.count); i = i + 1) {
    $.indexSet(cache.get$indexA(), i, $.index(this.vertices, i).get$indexA());
    $.indexSet(cache.get$indexB(), i, $.index(this.vertices, i).get$indexB());
  }
 },
 readCache$5: function(cache, proxyA, transformA, proxyB, transformB) {
  $.assert($.le(cache.get$count(), 3));
  this.count = cache.get$count();
  for (var i = 0; $.ltB(i, this.count); i = i + 1) {
    var v = $.index(this.vertices, i);
    v.set$indexA($.index(cache.get$indexA(), i));
    v.set$indexB($.index(cache.get$indexB(), i));
    var wALocal = $.index(proxyA.get$vertices(), v.get$indexA());
    var wBLocal = $.index(proxyB.get$vertices(), v.get$indexB());
    $.mulToOut(transformA, wALocal, v.get$wA());
    $.mulToOut(transformB, wBLocal, v.get$wB());
    v.get$w().setFrom$1(v.get$wB()).subLocal$1(v.get$wA());
    v.set$a(0.0);
  }
  if ($.gtB(this.count, 1)) {
    var metric1 = cache.get$metric();
    var metric2 = this.getMetric$0();
    if ($.ltB(metric2, $.mul(0.5, metric1)) || $.ltB($.mul(2.0, metric1), metric2) || $.ltB(metric2, 1.192e-7)) {
      this.count = 0;
    }
  }
  if ($.eqB(this.count, 0)) {
    var v0 = $.index(this.vertices, 0);
    v0.set$indexA(0);
    v0.set$indexB(0);
    var wALocal0 = $.index(proxyA.get$vertices(), 0);
    var wBLocal0 = $.index(proxyB.get$vertices(), 0);
    $.mulToOut(transformA, wALocal0, v0.get$wA());
    $.mulToOut(transformB, wBLocal0, v0.get$wB());
    v0.get$w().setFrom$1(v0.get$wB()).subLocal$1(v0.get$wA());
    this.count = 1;
  }
 },
 Simplex$0: function() {
  $.indexSet(this.vertices, 0, this.v1);
  $.indexSet(this.vertices, 1, this.v2);
  $.indexSet(this.vertices, 2, this.v3);
 }
});

Isolate.$defineClass("SimplexCache", "Object", ["indexB?", "indexA?", "count=", "metric="], {
 setFrom$1: function(sc) {
  $.setRange$3(this.indexA, 0, $.get$length(this.indexA), sc.get$indexA());
  $.setRange$3(this.indexB, 0, $.get$length(this.indexB), sc.get$indexB());
  this.metric = sc.get$metric();
  this.count = sc.get$count();
 },
 SimplexCache$0: function() {
  for (var i = 0; i < 3; i = i + 1) {
    $.indexSet(this.indexA, i, 2147483647);
    $.indexSet(this.indexB, i, 2147483647);
  }
 }
});

Isolate.$defineClass("SimplexVertex", "Object", ["indexB=", "indexA=", "a=", "w?", "wB?", "wA?"], {
 toString$0: function() {
  return $.add($.add($.add('wA: ', $.toString(this.wA)) + ' wB: ', $.toString(this.wB)) + ' w: ', $.toString(this.w));
 },
 setFrom$1: function(sv) {
  this.wA.setFrom$1(sv.get$wA());
  this.wB.setFrom$1(sv.get$wB());
  this.w.setFrom$1(sv.get$w());
  this.a = sv.get$a();
  this.indexA = sv.get$indexA();
  this.indexB = sv.get$indexB();
 }
});

Isolate.$defineClass("TimeOfImpact", "Object", ["pool", "sweepB?", "sweepA?", "indexes", "fcn", "distanceOutput", "xfB", "xfA", "distanceInput", "cache"], {
 timeOfImpact$2: function(output, input) {
  $.toiCalls = $.add($.toiCalls, 1);
  output.set$state(0);
  output.set$t(input.get$tMax());
  var proxyA = input.get$proxyA();
  var proxyB = input.get$proxyB();
  this.sweepA.setFrom$1(input.get$sweepA());
  this.sweepB.setFrom$1(input.get$sweepB());
  this.sweepA.normalize$0();
  this.sweepB.normalize$0();
  var tMax = input.get$tMax();
  if (tMax !== (tMax | 0)) return this.timeOfImpact$2$bailout(output, input, 1, proxyA, proxyB, tMax);
  var target = $.max(0.005, $.sub($.add(proxyA.get$radius(), proxyB.get$radius()), 0.015));
  if (typeof target !== 'number') return this.timeOfImpact$2$bailout(output, input, 2, tMax, proxyA, proxyB, target);
  $.assert(target > 0.00125);
  this.cache.set$count(0);
  var t0 = input.get$proxyA();
  this.distanceInput.set$proxyA(t0);
  var t1 = input.get$proxyB();
  this.distanceInput.set$proxyB(t1);
  this.distanceInput.set$useRadii(false);
  var t2 = target + 0.00125;
  var t3 = target - 0.00125;
  for (var iter = 0, t1_ = 0; iter0 = iter, true; iter = iter1, t1_ = t1__) {
    var t1__ = t1_;
    var iter1 = iter;
    this.sweepA.getTransform$2(this.xfA, t1_);
    this.sweepB.getTransform$2(this.xfB, t1_);
    var t4 = this.xfA;
    this.distanceInput.set$transformA(t4);
    var t5 = this.xfB;
    this.distanceInput.set$transformB(t5);
    this.pool.get$distance().distance$3(this.distanceOutput, this.cache, this.distanceInput);
    if ($.leB(this.distanceOutput.get$distance(), 0)) {
      output.set$state(2);
      output.set$t(0);
      iter0 = iter;
      break;
    }
    if ($.ltB(this.distanceOutput.get$distance(), t2)) {
      output.set$state(3);
      output.set$t(t1_);
      iter0 = iter;
      break;
    }
    this.fcn.initialize$6(this.cache, proxyA, this.sweepA, proxyB, this.sweepB, t1_);
    for (var t2_ = tMax, pushBackIter = 0; t1___ = t1_, done = false, true; t2_ = t2__, pushBackIter = pushBackIter0) {
      var pushBackIter0 = pushBackIter;
      var t2__ = t2_;
      var s2 = this.fcn.findMinSeparation$2(this.indexes, t2_);
      if (typeof s2 !== 'number') return this.timeOfImpact$2$bailout(output, input, 3, t2_, t1_, pushBackIter, tMax, iter, target, proxyA, proxyB, s2);
      if (s2 > t2) {
        output.set$state(4);
        output.set$t(tMax);
        t1___ = t1_;
        done = true;
        break;
      }
      if (s2 > t3) {
        t1___ = t2_;
        done = false;
        break;
      }
      var s1 = this.fcn.evaluate$3($.index(this.indexes, 0), $.index(this.indexes, 1), t1_);
      if (typeof s1 !== 'number') return this.timeOfImpact$2$bailout(output, input, 4, t2_, proxyB, tMax, pushBackIter, iter, target, s2, proxyA, t1_, s1);
      if (s1 < t3) {
        output.set$state(1);
        output.set$t(t1_);
        t1___ = t1_;
        done = true;
        break;
      }
      if (s1 <= t2) {
        output.set$state(3);
        output.set$t(t1_);
        t1___ = t1_;
        done = true;
        break;
      }
      for (var a2 = t2_, a1 = t1_, rootIterCount = 0, s10 = s1, s20 = s2; rootIterCount0 = rootIterCount, t2__ = t2_, true; a2 = a20, a1 = a10, rootIterCount = rootIterCount1, s10 = s11, s20 = s21) {
        var s21 = s20;
        var a20 = a2;
        var a10 = a1;
        var s11 = s10;
        var rootIterCount1 = rootIterCount;
        if ((rootIterCount & 1) >>> 0 === 1) {
          var t = a1 + $.div($.sub(target, s10) * (a2 - a1), $.sub(s20, s10));
        } else {
          t = 0.5 * (a1 + a2);
        }
        var s = this.fcn.evaluate$3($.index(this.indexes, 0), $.index(this.indexes, 1), t);
        if ($.ltB($.abs($.sub(s, target)), 0.00125)) {
          rootIterCount0 = rootIterCount;
          t2__ = t;
          break;
        }
        if ($.gtB(s, target)) {
          s21 = s20;
          a20 = a2;
          a10 = t;
          s11 = s;
        } else {
          s21 = s;
          a20 = t;
          a10 = a1;
          s11 = s10;
        }
        var rootIterCount2 = rootIterCount + 1;
        $.toiRootIters = $.add($.toiRootIters, 1);
        if (rootIterCount2 === 50) {
          rootIterCount0 = rootIterCount2;
          t2__ = t2_;
          break;
        }
        rootIterCount1 = rootIterCount2;
      }
      $.toiMaxRootIters = $.max($.toiMaxRootIters, rootIterCount0);
      var pushBackIter1 = pushBackIter + 1;
      if (pushBackIter1 === 8) {
        t1___ = t1_;
        done = false;
        break;
      }
      pushBackIter0 = pushBackIter1;
    }
    var iter2 = iter + 1;
    $.toiIters = $.add($.toiIters, 1);
    if (done) {
      iter0 = iter2;
      break;
    }
    if (iter2 === 1000) {
      output.set$state(1);
      output.set$t(t1___);
      iter0 = iter2;
      break;
    }
    t1__ = t1___;
    iter1 = iter2;
  }
  $.toiMaxIters = $.max($.toiMaxIters, iter0);
  var rootIterCount0, done, t1___, iter0;
 },
 timeOfImpact$2$bailout: function(output, input, state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9) {
  switch (state) {
    case 1:
      proxyA = env0;
      proxyB = env1;
      tMax = env2;
      break;
    case 2:
      tMax = env0;
      proxyA = env1;
      proxyB = env2;
      target = env3;
      break;
    case 3:
      t2_ = env0;
      t1_ = env1;
      pushBackIter = env2;
      tMax = env3;
      iter = env4;
      target = env5;
      proxyA = env6;
      proxyB = env7;
      s2 = env8;
      break;
    case 4:
      t2_ = env0;
      proxyB = env1;
      tMax = env2;
      pushBackIter = env3;
      iter = env4;
      target = env5;
      s2 = env6;
      proxyA = env7;
      t1_ = env8;
      s1 = env9;
      break;
  }
  switch (state) {
    case 0:
      $.toiCalls = $.add($.toiCalls, 1);
      output.set$state(0);
      output.set$t(input.get$tMax());
      var proxyA = input.get$proxyA();
      var proxyB = input.get$proxyB();
      this.sweepA.setFrom$1(input.get$sweepA());
      this.sweepB.setFrom$1(input.get$sweepB());
      this.sweepA.normalize$0();
      this.sweepB.normalize$0();
      var tMax = input.get$tMax();
    case 1:
      state = 0;
      var target = $.max(0.005, $.sub($.add(proxyA.get$radius(), proxyB.get$radius()), 0.015));
    case 2:
      state = 0;
      $.assert($.gt(target, 0.00125));
      this.cache.set$count(0);
      var t0 = input.get$proxyA();
      this.distanceInput.set$proxyA(t0);
      var t1 = input.get$proxyB();
      this.distanceInput.set$proxyB(t1);
      this.distanceInput.set$useRadii(false);
      var iter = 0;
      var t1_ = 0;
    case 3:
    case 4:
      L0: while (true) {
        switch (state) {
          case 0:
            var iter0 = iter;
            if (!true) break L0;
            var t1__ = t1_;
            var iter1 = iter;
            this.sweepA.getTransform$2(this.xfA, t1_);
            this.sweepB.getTransform$2(this.xfB, t1_);
            var t2 = this.xfA;
            this.distanceInput.set$transformA(t2);
            var t3 = this.xfB;
            this.distanceInput.set$transformB(t3);
            this.pool.get$distance().distance$3(this.distanceOutput, this.cache, this.distanceInput);
            if ($.leB(this.distanceOutput.get$distance(), 0)) {
              output.set$state(2);
              output.set$t(0);
              iter0 = iter;
              break L0;
            }
            if ($.ltB(this.distanceOutput.get$distance(), $.add(target, 0.00125))) {
              output.set$state(3);
              output.set$t(t1_);
              iter0 = iter;
              break L0;
            }
            this.fcn.initialize$6(this.cache, proxyA, this.sweepA, proxyB, this.sweepB, t1_);
            var t2_ = tMax;
            var pushBackIter = 0;
          case 3:
          case 4:
            L1: while (true) {
              switch (state) {
                case 0:
                  var t1___ = t1_;
                  var done = false;
                  if (!true) break L1;
                  var pushBackIter0 = pushBackIter;
                  var t2__ = t2_;
                  var s2 = this.fcn.findMinSeparation$2(this.indexes, t2_);
                case 3:
                  state = 0;
                  if ($.gtB(s2, $.add(target, 0.00125))) {
                    output.set$state(4);
                    output.set$t(tMax);
                    t1___ = t1_;
                    done = true;
                    break L1;
                  }
                  if ($.gtB(s2, $.sub(target, 0.00125))) {
                    t1___ = t2_;
                    done = false;
                    break L1;
                  }
                  var s1 = this.fcn.evaluate$3($.index(this.indexes, 0), $.index(this.indexes, 1), t1_);
                case 4:
                  state = 0;
                  if ($.ltB(s1, $.sub(target, 0.00125))) {
                    output.set$state(1);
                    output.set$t(t1_);
                    t1___ = t1_;
                    done = true;
                    break L1;
                  }
                  if ($.leB(s1, $.add(target, 0.00125))) {
                    output.set$state(3);
                    output.set$t(t1_);
                    t1___ = t1_;
                    done = true;
                    break L1;
                  }
                  var a2 = t2_;
                  var a1 = t1_;
                  var rootIterCount = 0;
                  var s10 = s1;
                  var s20 = s2;
                  L2: while (true) {
                    var rootIterCount0 = rootIterCount;
                    t2__ = t2_;
                    if (!true) break L2;
                    var s21 = s20;
                    var a20 = a2;
                    var a10 = a1;
                    var s11 = s10;
                    var rootIterCount1 = rootIterCount;
                    if ((rootIterCount & 1) >>> 0 === 1) {
                      var t = $.add(a1, $.div($.mul($.sub(target, s10), $.sub(a2, a1)), $.sub(s20, s10)));
                    } else {
                      t = $.mul(0.5, $.add(a1, a2));
                    }
                    var s = this.fcn.evaluate$3($.index(this.indexes, 0), $.index(this.indexes, 1), t);
                    if ($.ltB($.abs($.sub(s, target)), 0.00125)) {
                      rootIterCount0 = rootIterCount;
                      t2__ = t;
                      break;
                    }
                    if ($.gtB(s, target)) {
                      s21 = s20;
                      a20 = a2;
                      a10 = t;
                      s11 = s;
                    } else {
                      s21 = s;
                      a20 = t;
                      a10 = a1;
                      s11 = s10;
                    }
                    var rootIterCount2 = rootIterCount + 1;
                    $.toiRootIters = $.add($.toiRootIters, 1);
                    if (rootIterCount2 === 50) {
                      rootIterCount0 = rootIterCount2;
                      t2__ = t2_;
                      break;
                    }
                    rootIterCount1 = rootIterCount2;
                    a2 = a20;
                    a1 = a10;
                    rootIterCount = rootIterCount1;
                    s10 = s11;
                    s20 = s21;
                  }
                  $.toiMaxRootIters = $.max($.toiMaxRootIters, rootIterCount0);
                  var pushBackIter1 = pushBackIter + 1;
                  if (pushBackIter1 === 8) {
                    t1___ = t1_;
                    done = false;
                    break L1;
                  }
                  pushBackIter0 = pushBackIter1;
                  t2_ = t2__;
                  pushBackIter = pushBackIter0;
              }
            }
            var iter2 = iter + 1;
            $.toiIters = $.add($.toiIters, 1);
            if (done) {
              iter0 = iter2;
              break L0;
            }
            if (iter2 === 1000) {
              output.set$state(1);
              output.set$t(t1___);
              iter0 = iter2;
              break L0;
            }
            t1__ = t1___;
            iter1 = iter2;
            iter = iter1;
            t1_ = t1__;
        }
      }
      $.toiMaxIters = $.max($.toiMaxIters, iter0);
  }
 },
 get$timeOfImpact: function() { return new $.Closure46(this); },
 TimeOfImpact$_construct$1: function(argPool) {
  $.indexSet(this.indexes, 0, 0);
  $.indexSet(this.indexes, 1, 0);
  $.toiCalls = 0;
  $.toiIters = 0;
  $.toiMaxIters = 0;
  $.toiRootIters = 0;
  $.toiMaxRootIters = 0;
 }
});

Isolate.$defineClass("SeparationFunction", "Object", ["xfb", "xfa", "temp", "axisB", "axisA", "localPointB2", "localPointB1", "normal?", "localPointA2", "localPointA1", "pointB?", "pointA?", "localPointB", "localPointA", "sweepB?", "sweepA?", "axis", "localPoint?", "type=", "proxyB=", "proxyA="], {
 evaluate$3: function(indexA, indexB, t) {
  this.sweepA.getTransform$2(this.xfa, t);
  this.sweepB.getTransform$2(this.xfb, t);
  $0:{
    var t0 = this.type;
    if (0 === t0) {
      $.mulTransMatrixAndVectorToOut(this.xfa.get$rotation(), this.axis, this.axisA);
      $.mulTransMatrixAndVectorToOut(this.xfb.get$rotation(), this.axis.negateLocal$0(), this.axisB);
      this.axis.negateLocal$0();
      this.localPointA.setFrom$1($.index(this.proxyA.get$vertices(), indexA));
      this.localPointB.setFrom$1($.index(this.proxyB.get$vertices(), indexB));
      $.mulToOut(this.xfa, this.localPointA, this.pointA);
      $.mulToOut(this.xfb, this.localPointB, this.pointB);
      return $.dot(this.pointB.subLocal$1(this.pointA), this.axis);
    } else {
      if (1 === t0) {
        $.mulMatrixAndVectorToOut(this.xfa.get$rotation(), this.axis, this.normal);
        $.mulToOut(this.xfa, this.localPoint, this.pointA);
        this.normal.negateLocal$0();
        $.mulTransMatrixAndVectorToOut(this.xfb.get$rotation(), this.normal, this.axisB);
        this.normal.negateLocal$0();
        this.localPointB.setFrom$1($.index(this.proxyB.get$vertices(), indexB));
        $.mulToOut(this.xfb, this.localPointB, this.pointB);
        return $.dot(this.pointB.subLocal$1(this.pointA), this.normal);
      } else {
        if (2 === t0) {
          $.mulMatrixAndVectorToOut(this.xfb.get$rotation(), this.axis, this.normal);
          $.mulToOut(this.xfb, this.localPoint, this.pointB);
          $.mulTransMatrixAndVectorToOut(this.xfa.get$rotation(), this.normal.negateLocal$0(), this.axisA);
          this.normal.negateLocal$0();
          this.localPointA.setFrom$1($.index(this.proxyA.get$vertices(), indexA));
          $.mulToOut(this.xfa, this.localPointA, this.pointA);
          return $.dot(this.pointA.subLocal$1(this.pointB), this.normal);
        } else {
          $.assert(false);
          return 0;
        }
      }
    }
  }
 },
 findMinSeparation$2: function(indexes, t) {
  this.sweepA.getTransform$2(this.xfa, t);
  this.sweepB.getTransform$2(this.xfb, t);
  $0:{
    var t0 = this.type;
    if (0 === t0) {
      $.mulTransMatrixAndVectorToOut(this.xfa.get$rotation(), this.axis, this.axisA);
      $.mulTransMatrixAndVectorToOut(this.xfb.get$rotation(), this.axis.negateLocal$0(), this.axisB);
      this.axis.negateLocal$0();
      $.indexSet(indexes, 0, this.proxyA.getSupport$1(this.axisA));
      $.indexSet(indexes, 1, this.proxyB.getSupport$1(this.axisB));
      this.localPointA.setFrom$1($.index(this.proxyA.get$vertices(), $.index(indexes, 0)));
      this.localPointB.setFrom$1($.index(this.proxyB.get$vertices(), $.index(indexes, 1)));
      $.mulToOut(this.xfa, this.localPointA, this.pointA);
      $.mulToOut(this.xfb, this.localPointB, this.pointB);
      return $.dot(this.pointB.subLocal$1(this.pointA), this.axis);
    } else {
      if (1 === t0) {
        $.mulMatrixAndVectorToOut(this.xfa.get$rotation(), this.axis, this.normal);
        $.mulToOut(this.xfa, this.localPoint, this.pointA);
        this.normal.negateLocal$0();
        $.mulTransMatrixAndVectorToOut(this.xfb.get$rotation(), this.normal, this.axisB);
        this.normal.negateLocal$0();
        $.indexSet(indexes, 0, -1);
        $.indexSet(indexes, 1, this.proxyB.getSupport$1(this.axisB));
        this.localPointB.setFrom$1($.index(this.proxyB.get$vertices(), $.index(indexes, 1)));
        $.mulToOut(this.xfb, this.localPointB, this.pointB);
        return $.dot(this.pointB.subLocal$1(this.pointA), this.normal);
      } else {
        if (2 === t0) {
          $.mulMatrixAndVectorToOut(this.xfb.get$rotation(), this.axis, this.normal);
          $.mulToOut(this.xfb, this.localPoint, this.pointB);
          $.mulTransMatrixAndVectorToOut(this.xfa.get$rotation(), this.normal.negateLocal$0(), this.axisA);
          this.normal.negateLocal$0();
          $.indexSet(indexes, 1, -1);
          $.indexSet(indexes, 0, this.proxyA.getSupport$1(this.axisA));
          this.localPointA.setFrom$1($.index(this.proxyA.get$vertices(), $.index(indexes, 0)));
          $.mulToOut(this.xfa, this.localPointA, this.pointA);
          return $.dot(this.pointA.subLocal$1(this.pointB), this.normal);
        } else {
          $.assert(false);
          $.indexSet(indexes, 0, -1);
          $.indexSet(indexes, 1, -1);
          return 0;
        }
      }
    }
  }
 },
 initialize$6: function(cache, argProxyA, argSweepA, argProxyB, argSweepB, t1) {
  this.proxyA = argProxyA;
  this.proxyB = argProxyB;
  var count = cache.get$count();
  $.assert($.ltB(0, count) && $.ltB(count, 3));
  this.sweepA = argSweepA;
  this.sweepB = argSweepB;
  this.sweepA.getTransform$2(this.xfa, t1);
  this.sweepB.getTransform$2(this.xfb, t1);
  if ($.eqB(count, 1)) {
    this.type = 0;
    this.localPointA.setFrom$1($.index(this.proxyA.get$vertices(), $.index(cache.get$indexA(), 0)));
    this.localPointB.setFrom$1($.index(this.proxyB.get$vertices(), $.index(cache.get$indexB(), 0)));
    $.mulToOut(this.xfa, this.localPointA, this.pointA);
    $.mulToOut(this.xfb, this.localPointB, this.pointB);
    this.axis.setFrom$1(this.pointB).subLocal$1(this.pointA);
    return this.axis.normalize$0();
  } else {
    if ($.eqB($.index(cache.get$indexA(), 0), $.index(cache.get$indexA(), 1))) {
      this.type = 2;
      this.localPointB1.setFrom$1($.index(this.proxyB.get$vertices(), $.index(cache.get$indexB(), 0)));
      this.localPointB2.setFrom$1($.index(this.proxyB.get$vertices(), $.index(cache.get$indexB(), 1)));
      this.temp.setFrom$1(this.localPointB2).subLocal$1(this.localPointB1);
      $.crossVectorAndNumToOut(this.temp, 1, this.axis);
      this.axis.normalize$0();
      $.mulMatrixAndVectorToOut(this.xfb.get$rotation(), this.axis, this.normal);
      this.localPoint.setFrom$1(this.localPointB1);
      this.localPoint.addLocal$1(this.localPointB2);
      this.localPoint.mulLocal$1(0.5);
      $.mulToOut(this.xfb, this.localPoint, this.pointB);
      this.localPointA.setFrom$1($.index(this.proxyA.get$vertices(), $.index(cache.get$indexA(), 0)));
      $.mulToOut(this.xfa, this.localPointA, this.pointA);
      this.temp.setFrom$1(this.pointA);
      this.temp.subLocal$1(this.pointB);
      var s = $.dot(this.temp, this.normal);
      var s0 = s;
      if ($.ltB(s, 0.0)) {
        this.axis.negateLocal$0();
        s0 = $.neg(s);
      }
      return s0;
    } else {
      this.type = 1;
      this.localPointA1.setFrom$1($.index(this.proxyA.get$vertices(), $.index(cache.get$indexA(), 0)));
      this.localPointA2.setFrom$1($.index(this.proxyA.get$vertices(), $.index(cache.get$indexA(), 1)));
      this.temp.setFrom$1(this.localPointA2);
      this.temp.subLocal$1(this.localPointA1);
      $.crossVectorAndNumToOut(this.temp, 1.0, this.axis);
      this.axis.normalize$0();
      $.mulMatrixAndVectorToOut(this.xfa.get$rotation(), this.axis, this.normal);
      this.localPoint.setFrom$1(this.localPointA1);
      this.localPoint.addLocal$1(this.localPointA2);
      this.localPoint.mulLocal$1(0.5);
      $.mulToOut(this.xfa, this.localPoint, this.pointA);
      this.localPointB.setFrom$1($.index(this.proxyB.get$vertices(), $.index(cache.get$indexB(), 0)));
      $.mulToOut(this.xfb, this.localPointB, this.pointB);
      this.temp.setFrom$1(this.pointB);
      this.temp.subLocal$1(this.pointA);
      var s1 = $.dot(this.temp, this.normal);
      var s2 = s1;
      if ($.ltB(s1, 0.0)) {
        this.axis.negateLocal$0();
        s2 = $.neg(s1);
      }
      return s2;
    }
  }
 }
});

Isolate.$defineClass("TimeOfImpactInput", "Object", ["tMax=", "sweepB?", "sweepA?", "proxyB?", "proxyA?"], {
});

Isolate.$defineClass("TimeOfImpactOutput", "Object", ["t=", "state="], {
});

Isolate.$defineClass("WorldManifold", "Object", ["pool4", "pool3", "points?", "normal?"], {
 initialize$5: function(manifold, xfA, radiusA, xfB, radiusB) {
  if (typeof radiusA !== 'number') return this.initialize$5$bailout(manifold, xfA, radiusA, xfB, radiusB,  0);
  if (typeof radiusB !== 'number') return this.initialize$5$bailout(manifold, xfA, radiusA, xfB, radiusB,  0);
  $0:{
    var t0 = manifold.get$type();
    if (0 === t0) {
      var pointA = this.pool3;
      var pointB = this.pool4;
      this.normal.set$x(1);
      this.normal.set$y(0);
      pointA.set$x($.add($.add(xfA.get$position().get$x(), $.mul(xfA.get$rotation().get$col1().get$x(), manifold.get$localPoint().get$x())), $.mul(xfA.get$rotation().get$col2().get$x(), manifold.get$localPoint().get$y())));
      pointA.set$y($.add($.add(xfA.get$position().get$y(), $.mul(xfA.get$rotation().get$col1().get$y(), manifold.get$localPoint().get$x())), $.mul(xfA.get$rotation().get$col2().get$y(), manifold.get$localPoint().get$y())));
      pointB.set$x($.add($.add(xfB.get$position().get$x(), $.mul(xfB.get$rotation().get$col1().get$x(), $.index(manifold.get$points(), 0).get$localPoint().get$x())), $.mul(xfB.get$rotation().get$col2().get$x(), $.index(manifold.get$points(), 0).get$localPoint().get$y())));
      pointB.set$y($.add($.add(xfB.get$position().get$y(), $.mul(xfB.get$rotation().get$col1().get$y(), $.index(manifold.get$points(), 0).get$localPoint().get$x())), $.mul(xfB.get$rotation().get$col2().get$y(), $.index(manifold.get$points(), 0).get$localPoint().get$y())));
      if ($.gtB($.distanceSquared(pointA, pointB), 1.4208639999999999e-14)) {
        var t1 = $.sub(pointB.get$x(), pointA.get$x());
        this.normal.set$x(t1);
        var t2 = $.sub(pointB.get$y(), pointA.get$y());
        this.normal.set$y(t2);
        this.normal.normalize$0();
      }
      var cAx = $.add($.mul(this.normal.get$x(), radiusA), pointA.get$x());
      var cAy = $.add($.mul(this.normal.get$y(), radiusA), pointA.get$y());
      var cBx = $.add($.mul($.neg(this.normal.get$x()), radiusB), pointB.get$x());
      var cBy = $.add($.mul($.neg(this.normal.get$y()), radiusB), pointB.get$y());
      var t3 = $.mul($.add(cAx, cBx), 0.5);
      $.index(this.points, 0).set$x(t3);
      var t4 = $.mul($.add(cAy, cBy), 0.5);
      $.index(this.points, 0).set$y(t4);
      return;
    } else {
      if (1 === t0) {
        var planePoint = this.pool3;
        var t5 = $.add($.mul(xfA.get$rotation().get$col1().get$x(), manifold.get$localNormal().get$x()), $.mul(xfA.get$rotation().get$col2().get$x(), manifold.get$localNormal().get$y()));
        this.normal.set$x(t5);
        var t6 = $.add($.mul(xfA.get$rotation().get$col1().get$y(), manifold.get$localNormal().get$x()), $.mul(xfA.get$rotation().get$col2().get$y(), manifold.get$localNormal().get$y()));
        this.normal.set$y(t6);
        planePoint.set$x($.add($.add(xfA.get$position().get$x(), $.mul(xfA.get$rotation().get$col1().get$x(), manifold.get$localPoint().get$x())), $.mul(xfA.get$rotation().get$col2().get$x(), manifold.get$localPoint().get$y())));
        planePoint.set$y($.add($.add(xfA.get$position().get$y(), $.mul(xfA.get$rotation().get$col1().get$y(), manifold.get$localPoint().get$x())), $.mul(xfA.get$rotation().get$col2().get$y(), manifold.get$localPoint().get$y())));
        var clipPoint = this.pool4;
        for (var i = 0; $.ltB(i, manifold.get$pointCount()); i = i + 1) {
          clipPoint.set$x($.add($.add(xfB.get$position().get$x(), $.mul(xfB.get$rotation().get$col1().get$x(), $.index(manifold.get$points(), i).get$localPoint().get$x())), $.mul(xfB.get$rotation().get$col2().get$x(), $.index(manifold.get$points(), i).get$localPoint().get$y())));
          clipPoint.set$y($.add($.add(xfB.get$position().get$y(), $.mul(xfB.get$rotation().get$col1().get$y(), $.index(manifold.get$points(), i).get$localPoint().get$x())), $.mul(xfB.get$rotation().get$col2().get$y(), $.index(manifold.get$points(), i).get$localPoint().get$y())));
          var scalar = $.sub(radiusA, $.add($.mul($.sub(clipPoint.get$x(), planePoint.get$x()), this.normal.get$x()), $.mul($.sub(clipPoint.get$y(), planePoint.get$y()), this.normal.get$y())));
          var cAx0 = $.add($.mul(this.normal.get$x(), scalar), clipPoint.get$x());
          var cAy0 = $.add($.mul(this.normal.get$y(), scalar), clipPoint.get$y());
          var cBx0 = $.add($.mul($.neg(this.normal.get$x()), radiusB), clipPoint.get$x());
          var cBy0 = $.add($.mul($.neg(this.normal.get$y()), radiusB), clipPoint.get$y());
          var t7 = $.mul($.add(cAx0, cBx0), 0.5);
          $.index(this.points, i).set$x(t7);
          var t8 = $.mul($.add(cAy0, cBy0), 0.5);
          $.index(this.points, i).set$y(t8);
        }
        return;
      } else {
        if (2 === t0) {
          var planePoint0 = this.pool3;
          var R = xfB.get$rotation();
          var t9 = $.add($.mul(R.get$col1().get$x(), manifold.get$localNormal().get$x()), $.mul(R.get$col2().get$x(), manifold.get$localNormal().get$y()));
          this.normal.set$x(t9);
          var t10 = $.add($.mul(R.get$col1().get$y(), manifold.get$localNormal().get$x()), $.mul(R.get$col2().get$y(), manifold.get$localNormal().get$y()));
          this.normal.set$y(t10);
          var v = manifold.get$localPoint();
          planePoint0.set$x($.add($.add(xfB.get$position().get$x(), $.mul(xfB.get$rotation().get$col1().get$x(), v.get$x())), $.mul(xfB.get$rotation().get$col2().get$x(), v.get$y())));
          planePoint0.set$y($.add($.add(xfB.get$position().get$y(), $.mul(xfB.get$rotation().get$col1().get$y(), v.get$x())), $.mul(xfB.get$rotation().get$col2().get$y(), v.get$y())));
          var clipPoint0 = this.pool4;
          for (var i0 = 0; $.ltB(i0, manifold.get$pointCount()); i0 = i0 + 1) {
            clipPoint0.set$x($.add($.add(xfA.get$position().get$x(), $.mul(xfA.get$rotation().get$col1().get$x(), $.index(manifold.get$points(), i0).get$localPoint().get$x())), $.mul(xfA.get$rotation().get$col2().get$x(), $.index(manifold.get$points(), i0).get$localPoint().get$y())));
            clipPoint0.set$y($.add($.add(xfA.get$position().get$y(), $.mul(xfA.get$rotation().get$col1().get$y(), $.index(manifold.get$points(), i0).get$localPoint().get$x())), $.mul(xfA.get$rotation().get$col2().get$y(), $.index(manifold.get$points(), i0).get$localPoint().get$y())));
            var scalar0 = $.sub(radiusB, $.add($.mul($.sub(clipPoint0.get$x(), planePoint0.get$x()), this.normal.get$x()), $.mul($.sub(clipPoint0.get$y(), planePoint0.get$y()), this.normal.get$y())));
            var cBx1 = $.add($.mul(this.normal.get$x(), scalar0), clipPoint0.get$x());
            var cBy1 = $.add($.mul(this.normal.get$y(), scalar0), clipPoint0.get$y());
            var cAx1 = $.add($.mul($.neg(this.normal.get$x()), radiusA), clipPoint0.get$x());
            var cAy1 = $.add($.mul($.neg(this.normal.get$y()), radiusA), clipPoint0.get$y());
            var t11 = $.mul($.add(cAx1, cBx1), 0.5);
            $.index(this.points, i0).set$x(t11);
            var t12 = $.mul($.add(cAy1, cBy1), 0.5);
            $.index(this.points, i0).set$y(t12);
          }
          var t13 = $.neg(this.normal.get$x());
          this.normal.set$x(t13);
          var t14 = $.neg(this.normal.get$y());
          this.normal.set$y(t14);
          break $0;
        }
      }
    }
  }
 },
 initialize$5$bailout: function(manifold, xfA, radiusA, xfB, radiusB, state, env0, env1) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
      $0:{
        var t2 = manifold.get$type();
        if (0 === t2) {
          var pointA = this.pool3;
          var pointB = this.pool4;
          this.normal.set$x(1);
          this.normal.set$y(0);
          pointA.set$x($.add($.add(xfA.get$position().get$x(), $.mul(xfA.get$rotation().get$col1().get$x(), manifold.get$localPoint().get$x())), $.mul(xfA.get$rotation().get$col2().get$x(), manifold.get$localPoint().get$y())));
          pointA.set$y($.add($.add(xfA.get$position().get$y(), $.mul(xfA.get$rotation().get$col1().get$y(), manifold.get$localPoint().get$x())), $.mul(xfA.get$rotation().get$col2().get$y(), manifold.get$localPoint().get$y())));
          pointB.set$x($.add($.add(xfB.get$position().get$x(), $.mul(xfB.get$rotation().get$col1().get$x(), $.index(manifold.get$points(), 0).get$localPoint().get$x())), $.mul(xfB.get$rotation().get$col2().get$x(), $.index(manifold.get$points(), 0).get$localPoint().get$y())));
          pointB.set$y($.add($.add(xfB.get$position().get$y(), $.mul(xfB.get$rotation().get$col1().get$y(), $.index(manifold.get$points(), 0).get$localPoint().get$x())), $.mul(xfB.get$rotation().get$col2().get$y(), $.index(manifold.get$points(), 0).get$localPoint().get$y())));
          if ($.gtB($.distanceSquared(pointA, pointB), 1.4208639999999999e-14)) {
            var t3 = $.sub(pointB.get$x(), pointA.get$x());
            this.normal.set$x(t3);
            var t4 = $.sub(pointB.get$y(), pointA.get$y());
            this.normal.set$y(t4);
            this.normal.normalize$0();
          }
          var cAx = $.add($.mul(this.normal.get$x(), radiusA), pointA.get$x());
          var cAy = $.add($.mul(this.normal.get$y(), radiusA), pointA.get$y());
          var cBx = $.add($.mul($.neg(this.normal.get$x()), radiusB), pointB.get$x());
          var cBy = $.add($.mul($.neg(this.normal.get$y()), radiusB), pointB.get$y());
          var t5 = $.mul($.add(cAx, cBx), 0.5);
          $.index(this.points, 0).set$x(t5);
          var t6 = $.mul($.add(cAy, cBy), 0.5);
          $.index(this.points, 0).set$y(t6);
          return;
        } else {
          if (1 === t2) {
            var planePoint = this.pool3;
            var t7 = $.add($.mul(xfA.get$rotation().get$col1().get$x(), manifold.get$localNormal().get$x()), $.mul(xfA.get$rotation().get$col2().get$x(), manifold.get$localNormal().get$y()));
            this.normal.set$x(t7);
            var t8 = $.add($.mul(xfA.get$rotation().get$col1().get$y(), manifold.get$localNormal().get$x()), $.mul(xfA.get$rotation().get$col2().get$y(), manifold.get$localNormal().get$y()));
            this.normal.set$y(t8);
            planePoint.set$x($.add($.add(xfA.get$position().get$x(), $.mul(xfA.get$rotation().get$col1().get$x(), manifold.get$localPoint().get$x())), $.mul(xfA.get$rotation().get$col2().get$x(), manifold.get$localPoint().get$y())));
            planePoint.set$y($.add($.add(xfA.get$position().get$y(), $.mul(xfA.get$rotation().get$col1().get$y(), manifold.get$localPoint().get$x())), $.mul(xfA.get$rotation().get$col2().get$y(), manifold.get$localPoint().get$y())));
            var clipPoint = this.pool4;
            var i = 0;
            L0: while (true) {
              if (!$.ltB(i, manifold.get$pointCount())) break L0;
              clipPoint.set$x($.add($.add(xfB.get$position().get$x(), $.mul(xfB.get$rotation().get$col1().get$x(), $.index(manifold.get$points(), i).get$localPoint().get$x())), $.mul(xfB.get$rotation().get$col2().get$x(), $.index(manifold.get$points(), i).get$localPoint().get$y())));
              clipPoint.set$y($.add($.add(xfB.get$position().get$y(), $.mul(xfB.get$rotation().get$col1().get$y(), $.index(manifold.get$points(), i).get$localPoint().get$x())), $.mul(xfB.get$rotation().get$col2().get$y(), $.index(manifold.get$points(), i).get$localPoint().get$y())));
              var scalar = $.sub(radiusA, $.add($.mul($.sub(clipPoint.get$x(), planePoint.get$x()), this.normal.get$x()), $.mul($.sub(clipPoint.get$y(), planePoint.get$y()), this.normal.get$y())));
              var cAx0 = $.add($.mul(this.normal.get$x(), scalar), clipPoint.get$x());
              var cAy0 = $.add($.mul(this.normal.get$y(), scalar), clipPoint.get$y());
              var cBx0 = $.add($.mul($.neg(this.normal.get$x()), radiusB), clipPoint.get$x());
              var cBy0 = $.add($.mul($.neg(this.normal.get$y()), radiusB), clipPoint.get$y());
              var t9 = $.mul($.add(cAx0, cBx0), 0.5);
              $.index(this.points, i).set$x(t9);
              var t10 = $.mul($.add(cAy0, cBy0), 0.5);
              $.index(this.points, i).set$y(t10);
              i = i + 1;
            }
            return;
          } else {
            if (2 === t2) {
              var planePoint0 = this.pool3;
              var R = xfB.get$rotation();
              var t11 = $.add($.mul(R.get$col1().get$x(), manifold.get$localNormal().get$x()), $.mul(R.get$col2().get$x(), manifold.get$localNormal().get$y()));
              this.normal.set$x(t11);
              var t12 = $.add($.mul(R.get$col1().get$y(), manifold.get$localNormal().get$x()), $.mul(R.get$col2().get$y(), manifold.get$localNormal().get$y()));
              this.normal.set$y(t12);
              var v = manifold.get$localPoint();
              planePoint0.set$x($.add($.add(xfB.get$position().get$x(), $.mul(xfB.get$rotation().get$col1().get$x(), v.get$x())), $.mul(xfB.get$rotation().get$col2().get$x(), v.get$y())));
              planePoint0.set$y($.add($.add(xfB.get$position().get$y(), $.mul(xfB.get$rotation().get$col1().get$y(), v.get$x())), $.mul(xfB.get$rotation().get$col2().get$y(), v.get$y())));
              var clipPoint0 = this.pool4;
              var i0 = 0;
              L1: while (true) {
                if (!$.ltB(i0, manifold.get$pointCount())) break L1;
                clipPoint0.set$x($.add($.add(xfA.get$position().get$x(), $.mul(xfA.get$rotation().get$col1().get$x(), $.index(manifold.get$points(), i0).get$localPoint().get$x())), $.mul(xfA.get$rotation().get$col2().get$x(), $.index(manifold.get$points(), i0).get$localPoint().get$y())));
                clipPoint0.set$y($.add($.add(xfA.get$position().get$y(), $.mul(xfA.get$rotation().get$col1().get$y(), $.index(manifold.get$points(), i0).get$localPoint().get$x())), $.mul(xfA.get$rotation().get$col2().get$y(), $.index(manifold.get$points(), i0).get$localPoint().get$y())));
                var scalar0 = $.sub(radiusB, $.add($.mul($.sub(clipPoint0.get$x(), planePoint0.get$x()), this.normal.get$x()), $.mul($.sub(clipPoint0.get$y(), planePoint0.get$y()), this.normal.get$y())));
                var cBx1 = $.add($.mul(this.normal.get$x(), scalar0), clipPoint0.get$x());
                var cBy1 = $.add($.mul(this.normal.get$y(), scalar0), clipPoint0.get$y());
                var cAx1 = $.add($.mul($.neg(this.normal.get$x()), radiusA), clipPoint0.get$x());
                var cAy1 = $.add($.mul($.neg(this.normal.get$y()), radiusA), clipPoint0.get$y());
                var t13 = $.mul($.add(cAx1, cBx1), 0.5);
                $.index(this.points, i0).set$x(t13);
                var t14 = $.mul($.add(cAy1, cBy1), 0.5);
                $.index(this.points, i0).set$y(t14);
                i0 = i0 + 1;
              }
              var t15 = $.neg(this.normal.get$x());
              this.normal.set$x(t15);
              var t16 = $.neg(this.normal.get$y());
              this.normal.set$y(t16);
              break $0;
            }
          }
        }
      }
  }
 },
 WorldManifold$0: function() {
  for (var i = 0; i < 2; i = i + 1) {
    $.indexSet(this.points, i, $.Vector$2(0, 0));
  }
 }
});

Isolate.$defineClass("BroadPhase", "Object", ["queryProxy", "_pairCount", "_pairCapacity", "_pairBuffer", "moveBuffer", "proxyCount", "_tree"], {
 _bufferMove$1: function(node) {
  $.add$1(this.moveBuffer, node);
 },
 query$2: function(callback, box) {
  this._tree.query$2(callback, box);
 },
 treeCallback$1: function(proxy) {
  if ($.eqB(proxy, this.queryProxy)) {
    return true;
  }
  if ($.eqB(this._pairCount, this._pairCapacity)) {
    var oldBuffer = this._pairBuffer;
    if (typeof oldBuffer !== 'string' && (typeof oldBuffer !== 'object'||oldBuffer.constructor !== Array)) return this.treeCallback$1$bailout(proxy, 1, oldBuffer);
    this._pairCapacity = $.mul(this._pairCapacity, 2);
    var t0 = $.List(this._pairCapacity);
    $.setRuntimeTypeInfo(t0, ({E: 'Pair'}));
    this._pairBuffer = t0;
    for (var i = 0; i < oldBuffer.length; i = i + 1) {
      var t1 = this._pairBuffer;
      var t2 = oldBuffer.length;
      if (i < 0 || i >= t2) throw $.ioore(i);
      $.indexSet(t1, i, oldBuffer[i]);
    }
    for (var i0 = oldBuffer.length; $.ltB(i0, this._pairCapacity); i0 = i0 + 1) {
      $.indexSet(this._pairBuffer, i0, $.Pair$0());
    }
  }
  if ($.ltB(proxy.get$key(), this.queryProxy.get$key())) {
    $.index(this._pairBuffer, this._pairCount).set$proxyA(proxy);
    var t3 = this.queryProxy;
    $.index(this._pairBuffer, this._pairCount).set$proxyB(t3);
  } else {
    var t4 = this.queryProxy;
    $.index(this._pairBuffer, this._pairCount).set$proxyA(t4);
    $.index(this._pairBuffer, this._pairCount).set$proxyB(proxy);
  }
  this._pairCount = $.add(this._pairCount, 1);
  return true;
 },
 treeCallback$1$bailout: function(proxy, state, env0) {
  switch (state) {
    case 1:
      oldBuffer = env0;
      break;
  }
  switch (state) {
    case 0:
      if ($.eqB(proxy, this.queryProxy)) {
        return true;
      }
    case 1:
      if (state == 1 || (state == 0 && $.eqB(this._pairCount, this._pairCapacity))) {
        switch (state) {
          case 0:
            var oldBuffer = this._pairBuffer;
          case 1:
            state = 0;
            this._pairCapacity = $.mul(this._pairCapacity, 2);
            var t0 = $.List(this._pairCapacity);
            $.setRuntimeTypeInfo(t0, ({E: 'Pair'}));
            this._pairBuffer = t0;
            var i = 0;
            L0: while (true) {
              if (!$.ltB(i, $.get$length(oldBuffer))) break L0;
              $.indexSet(this._pairBuffer, i, $.index(oldBuffer, i));
              i = i + 1;
            }
            var i0 = $.get$length(oldBuffer);
            L1: while (true) {
              if (!$.ltB(i0, this._pairCapacity)) break L1;
              $.indexSet(this._pairBuffer, i0, $.Pair$0());
              i0 = $.add(i0, 1);
            }
        }
      }
      if ($.ltB(proxy.get$key(), this.queryProxy.get$key())) {
        $.index(this._pairBuffer, this._pairCount).set$proxyA(proxy);
        var t1 = this.queryProxy;
        $.index(this._pairBuffer, this._pairCount).set$proxyB(t1);
      } else {
        var t2 = this.queryProxy;
        $.index(this._pairBuffer, this._pairCount).set$proxyA(t2);
        $.index(this._pairBuffer, this._pairCount).set$proxyB(proxy);
      }
      this._pairCount = $.add(this._pairCount, 1);
      return true;
  }
 },
 updatePairs$1: function(callback) {
  this._pairCount = 0;
  for (var i = 0; $.ltB(i, $.get$length(this.moveBuffer)); i = i + 1) {
    this.queryProxy = $.index(this.moveBuffer, i);
    if ($.eqNullB(this.queryProxy)) {
      continue;
    }
    this._tree.query$2(this, this.queryProxy.get$box());
  }
  var t0 = $.List((void 0));
  $.setRuntimeTypeInfo(t0, ({E: 'DynamicTreeNode'}));
  this.moveBuffer = t0;
  var pairBuffer = $.List$from($.getRange(this._pairBuffer, 0, this._pairCount));
  $.sort(pairBuffer, new $.Closure9());
  $.setRange$3(this._pairBuffer, 0, this._pairCount, pairBuffer);
  for (var i0 = 0; $.ltB(i0, this._pairCount); i0 = i1) {
    var i1 = i0;
    var primaryPair = $.index(this._pairBuffer, i0);
    $.assert(!$.eqNullB(primaryPair));
    $.assert(!$.eqNullB(primaryPair.get$proxyA()));
    $.assert(!$.eqNullB(primaryPair.get$proxyB()));
    callback.addPair$2(primaryPair.get$proxyA().get$userData(), primaryPair.get$proxyB().get$userData());
    for (var i2 = i0 + 1; $.ltB(i2, this._pairCount); i2 = i3) {
      var i3 = i2;
      var pair = $.index(this._pairBuffer, i2);
      var t1 = pair.get$proxyA() === primaryPair.get$proxyA();
      var t2 = !t1;
      if (t1) {
        t2 = !(pair.get$proxyB() === primaryPair.get$proxyB());
      }
      if (t2) {
        break;
      }
      i3 = i2 + 1;
    }
    i1 = i2;
  }
  this._tree.rebalance$1(4);
 },
 testOverlap$2: function(proxyA, proxyB) {
  return $.testOverlap(proxyA.get$box(), proxyB.get$box());
 },
 moveProxy$3: function(proxy, box, displacement) {
  if (this._tree.moveProxy$3(proxy, box, displacement) === true) {
    this._bufferMove$1(proxy);
  }
 },
 createProxy$2: function(box, userData) {
  var node = this._tree.createProxy$2(box, userData);
  this.proxyCount = $.add(this.proxyCount, 1);
  this._bufferMove$1(node);
  return node;
 },
 BroadPhase$0: function() {
  var t0 = $.List((void 0));
  $.setRuntimeTypeInfo(t0, ({E: 'DynamicTreeNode'}));
  this.moveBuffer = t0;
  var t1 = $.List(this._pairCapacity);
  $.setRuntimeTypeInfo(t1, ({E: 'Pair'}));
  this._pairBuffer = t1;
  for (var i = 0; $.ltB(i, this._pairCapacity); i = i + 1) {
    $.indexSet(this._pairBuffer, i, $.Pair$0());
  }
 }
});

Isolate.$defineClass("DynamicTree", "Object", ["deltaTwo", "deltaOne", "center?", "_tempBox", "_tempVector", "_nodeCounter", "_drawVectors", "_nodeStack", "_path", "_insertionCount", "_lastLeaf", "_nodeCount", "_root"], {
 _freeNode$1: function(node) {
  $.assert(!$.eqNullB(node));
  $.assert($.gt(this._nodeCount, 0));
  this._nodeStack.addFirst$1(node);
  this._nodeCount = $.sub(this._nodeCount, 1);
 },
 rebalance$1: function(iterations) {
  if (typeof iterations !== 'number') return this.rebalance$1$bailout(iterations,  0);
  if ($.eqNullB(this._root)) {
    return;
  }
  for (var i = 0, current = (void 0); i < iterations; i = i0) {
    for (var current0 = this._root, bit = 0; current0.get$isLeaf() !== true; current0 = current1, bit = bit0) {
      var current1 = current0;
      var bit0 = bit;
      if ($.eqB($.and($.shr(this._path, bit), 1), 0)) {
        current1 = current0.get$childOne();
      } else {
        current1 = current0.get$childTwo();
      }
      var bit1 = (bit + 1 & 31) >>> 0;
      bit0 = bit1;
    }
    this._path = $.add(this._path, 1);
    this._removeLeaf$1(current0);
    this._insertLeaf$1(current0);
    current = current0;
    var i0 = i + 1;
  }
 },
 rebalance$1$bailout: function(iterations, state, env0) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if ($.eqNullB(this._root)) {
        return;
      }
      var i = 0;
      var current = (void 0);
      L0: while (true) {
        if (!$.ltB(i, iterations)) break L0;
        var current0 = this._root;
        var bit = 0;
        L1: while (true) {
          if (!(current0.get$isLeaf() !== true)) break L1;
          var current1 = current0;
          var bit0 = bit;
          if ($.eqB($.and($.shr(this._path, bit), 1), 0)) {
            current1 = current0.get$childOne();
          } else {
            current1 = current0.get$childTwo();
          }
          var bit1 = (bit + 1 & 31) >>> 0;
          bit0 = bit1;
          current0 = current1;
          bit = bit0;
        }
        this._path = $.add(this._path, 1);
        this._removeLeaf$1(current0);
        this._insertLeaf$1(current0);
        current = current0;
        var i0 = i + 1;
        i = i0;
      }
  }
 },
 _computeHeight$1: function(node) {
  if ($.eqNullB(node)) {
    return 0;
  }
  return $.add(1, $.max(this._computeHeight$1(node.get$childOne()), this._computeHeight$1(node.get$childTwo())));
 },
 computeHeightFromRoot$0: function() {
  return this._computeHeight$1(this._root);
 },
 _removeLeaf$1: function(argNode) {
  if (argNode === this._root) {
    this._root = (void 0);
    if (this._lastLeaf === argNode) {
      this._lastLeaf = (void 0);
    }
    return;
  }
  var node2 = argNode.get$parent();
  var node1 = node2.get$parent();
  if (node2.get$childOne() === argNode) {
    var sibling = node2.get$childTwo();
  } else {
    sibling = node2.get$childOne();
  }
  if (!$.eqNullB(node1)) {
    if (node1.get$childOne() === node2) {
      node1.set$childOne(sibling);
    } else {
      node1.set$childTwo(sibling);
    }
    sibling.set$parent(node1);
    this._freeNode$1(node2);
    for (var node10 = node1; !$.eqNullB(node10); node10 = node11) {
      var node11 = node10;
      this._tempBox.setFrom$1(node10.get$box());
      node10.get$box().setFromCombination$2(node10.get$childOne().get$box(), node10.get$childTwo().get$box());
      if ($.contains$1(this._tempBox, node10.get$box()) === true) {
        break;
      }
      node11 = node10.get$parent();
    }
  } else {
    this._root = sibling;
    sibling.set$parent((void 0));
    this._freeNode$1(node2);
  }
  if (this._lastLeaf === argNode) {
    this._lastLeaf = this._root;
  }
 },
 _insertLeaf$1: function(node) {
  this._insertionCount = $.add(this._insertionCount, 1);
  if ($.eqNullB(this._root)) {
    this._root = node;
    node.set$parent((void 0));
    return;
  }
  this.center.setFrom$1(node.get$box().get$center());
  var sibling = this._root;
  var sibling0 = sibling;
  if (sibling.get$isLeaf() !== true) {
    var sibling1 = sibling;
    var childOne = (void 0);
    var childTwo = (void 0);
    do {
      var sibling2 = sibling1;
      var childOne0 = sibling1.get$childOne();
      var childTwo0 = sibling1.get$childTwo();
      this.deltaOne.setFrom$1(childOne0.get$box().get$center());
      this.deltaTwo.setFrom$1(childTwo0.get$box().get$center());
      this.deltaOne.subLocal$1(this.center).absLocal$0();
      this.deltaTwo.subLocal$1(this.center).absLocal$0();
      if ($.ltB($.add(this.deltaOne.get$x(), this.deltaOne.get$y()), $.add(this.deltaTwo.get$x(), this.deltaTwo.get$y()))) {
        sibling2 = childOne0;
      } else {
        sibling2 = childTwo0;
      }
      childOne = childOne0;
      childTwo = childTwo0;
    } while (sibling1 = sibling2, $.eqB(sibling2.get$isLeaf(), false));
    sibling0 = sibling2;
  }
  var node1 = sibling0.get$parent();
  var node2 = this._allocateNode$0();
  node2.set$parent(node1);
  node2.set$userData((void 0));
  node2.get$box().setFromCombination$2(node.get$box(), sibling0.get$box());
  if (!$.eqNullB(node1)) {
    if (sibling0.get$parent().get$childOne() === sibling0) {
      node1.set$childOne(node2);
    } else {
      node1.set$childTwo(node2);
    }
    node2.set$childOne(sibling0);
    node2.set$childTwo(node);
    sibling0.set$parent(node2);
    node.set$parent(node2);
    var node10 = node1;
    var node20 = node2;
    do {
      var node21 = node20;
      var node11 = node10;
      if ($.contains$1(node10.get$box(), node20.get$box()) === true) {
        break;
      }
      node10.get$box().setFromCombination$2(node10.get$childOne().get$box(), node10.get$childTwo().get$box());
      var node12 = node10.get$parent();
      node21 = node10;
      node11 = node12;
    } while (node10 = node11, node20 = node21, !$.eqNullB(node11));
  } else {
    node2.set$childOne(sibling0);
    node2.set$childTwo(node);
    sibling0.set$parent(node2);
    node.set$parent(node2);
    this._root = node2;
  }
 },
 _query$4: function(callback, argBox, node, count) {
  if ($.eqNullB(node)) {
    return true;
  }
  if ($.testOverlap(argBox, node.get$box()) === true) {
    if (node.get$isLeaf() === true) {
      if (callback.treeCallback$1(node) !== true) {
        return false;
      }
    } else {
      var count0 = count;
      if ($.ltB(count, 64)) {
        var count1 = $.add(count, 1);
        if (this._query$4(callback, argBox, node.get$childOne(), count1) !== true) {
          return false;
        }
        count0 = count1;
      }
      if ($.ltB(count0, 64)) {
        var count2 = $.add(count0, 1);
        if (this._query$4(callback, argBox, node.get$childTwo(), count2) !== true) {
          return false;
        }
      }
    }
  }
  return true;
 },
 query$2: function(callback, argBox) {
  this._query$4(callback, argBox, this._root, 1);
 },
 _allocateNode$0: function() {
  if ($.isEmpty(this._nodeStack) === true) {
    for (var i = 0; i < 6; i = i + 1) {
      this._nodeStack.addFirst$1($.DynamicTreeNode$_construct$0());
    }
  }
  var node = this._nodeStack.removeFirst$0();
  node.set$parent((void 0));
  node.set$childOne((void 0));
  node.set$childTwo((void 0));
  node.set$userData((void 0));
  node.set$key(this._nodeCounter);
  this._nodeCounter = $.add(this._nodeCounter, 1);
  this._nodeCount = $.add(this._nodeCount, 1);
  return node;
 },
 moveProxy$3: function(argProxy, argBox, displacement) {
  $.assert(!$.eqNullB(argProxy));
  $.assert(argProxy.get$isLeaf());
  if ($.contains$1(argProxy.get$box(), argBox) === true) {
    return false;
  }
  this._removeLeaf$1(argProxy);
  var t0 = argBox.get$lowerBound();
  t0.set$x($.sub(t0.get$x(), 0.1));
  var t1 = argBox.get$lowerBound();
  t1.set$y($.sub(t1.get$y(), 0.1));
  var t2 = argBox.get$upperBound();
  t2.set$x($.add(t2.get$x(), 0.1));
  var t3 = argBox.get$upperBound();
  t3.set$y($.add(t3.get$y(), 0.1));
  this._tempVector.setFrom$1(displacement);
  this._tempVector.mulLocal$1(2);
  if ($.ltB(this._tempVector.get$x(), 0)) {
    var t4 = argBox.get$lowerBound();
    t4.set$x($.add(t4.get$x(), this._tempVector.get$x()));
  } else {
    var t5 = argBox.get$upperBound();
    t5.set$x($.add(t5.get$x(), this._tempVector.get$x()));
  }
  if ($.ltB(this._tempVector.get$y(), 0)) {
    var t6 = argBox.get$lowerBound();
    t6.set$y($.add(t6.get$y(), this._tempVector.get$y()));
  } else {
    var t7 = argBox.get$upperBound();
    t7.set$y($.add(t7.get$y(), this._tempVector.get$y()));
  }
  argProxy.get$box().setFrom$1(argBox);
  this._insertLeaf$1(argProxy);
  return true;
 },
 createProxy$2: function(box, userData) {
  var proxy = this._allocateNode$0();
  var t0 = $.sub(box.get$lowerBound().get$x(), 0.1);
  proxy.get$box().get$lowerBound().set$x(t0);
  var t1 = $.sub(box.get$lowerBound().get$y(), 0.1);
  proxy.get$box().get$lowerBound().set$y(t1);
  var t2 = $.add(box.get$upperBound().get$x(), 0.1);
  proxy.get$box().get$upperBound().set$x(t2);
  var t3 = $.add(box.get$upperBound().get$y(), 0.1);
  proxy.get$box().get$upperBound().set$y(t3);
  proxy.set$userData(userData);
  this._insertLeaf$1(proxy);
  var iterationCount = $.shr(this._nodeCount, 4);
  if (iterationCount !== (iterationCount | 0)) return this.createProxy$2$bailout(box, userData, 1, proxy, iterationCount);
  var height = this.computeHeightFromRoot$0();
  for (var height0 = height, tryCount = 0; $.gtB(height0, 64) && tryCount < 10; height0 = height1, tryCount = tryCount0) {
    var tryCount0 = tryCount;
    var height1 = height0;
    this.rebalance$1(iterationCount);
    var height2 = this.computeHeightFromRoot$0();
    tryCount0 = tryCount + 1;
    height1 = height2;
  }
  return proxy;
 },
 createProxy$2$bailout: function(box, userData, state, env0, env1) {
  switch (state) {
    case 1:
      proxy = env0;
      iterationCount = env1;
      break;
  }
  switch (state) {
    case 0:
      var proxy = this._allocateNode$0();
      var t0 = $.sub(box.get$lowerBound().get$x(), 0.1);
      proxy.get$box().get$lowerBound().set$x(t0);
      var t1 = $.sub(box.get$lowerBound().get$y(), 0.1);
      proxy.get$box().get$lowerBound().set$y(t1);
      var t2 = $.add(box.get$upperBound().get$x(), 0.1);
      proxy.get$box().get$upperBound().set$x(t2);
      var t3 = $.add(box.get$upperBound().get$y(), 0.1);
      proxy.get$box().get$upperBound().set$y(t3);
      proxy.set$userData(userData);
      this._insertLeaf$1(proxy);
      var iterationCount = $.shr(this._nodeCount, 4);
    case 1:
      state = 0;
      var height = this.computeHeightFromRoot$0();
      var height0 = height;
      var tryCount = 0;
      L0: while (true) {
        if (!($.gtB(height0, 64) && tryCount < 10)) break L0;
        var tryCount0 = tryCount;
        var height1 = height0;
        this.rebalance$1(iterationCount);
        var height2 = this.computeHeightFromRoot$0();
        tryCount0 = tryCount + 1;
        height1 = height2;
        height0 = height1;
        tryCount = tryCount0;
      }
      return proxy;
  }
 },
 DynamicTree$0: function() {
  for (var i = 0; $.ltB(i, $.get$length(this._drawVectors)); i = i + 1) {
    $.indexSet(this._drawVectors, i, $.Vector$2(0, 0));
  }
 }
});

Isolate.$defineClass("DynamicTreeNode", "Object", ["key=", "userData=", "childTwo=", "childOne=", "next=", "parent=", "box?"], {
 toString$0: function() {
  return $.toString(this.box);
 },
 get$isLeaf: function() {
  return $.eqNull(this.childOne);
 },
 next$0: function() { return this.next.$call$0(); }
});

Isolate.$defineClass("Pair", "Object", ["proxyB=", "proxyA="], {
 compareTo$1: function(pair2) {
  $.assert(!$.eqNullB(this.proxyA) && !$.eqNullB(pair2.get$proxyA()));
  if ($.ltB(this.proxyA.get$key(), pair2.get$proxyA().get$key())) {
    return -1;
  }
  if ($.eqB(this.proxyA.get$key(), pair2.get$proxyA().get$key())) {
    if ($.ltB(this.proxyB.get$key(), pair2.get$proxyB().get$key())) {
      var t0 = -1;
    } else {
      if ($.eqB(this.proxyB.get$key(), pair2.get$proxyB().get$key())) {
        t0 = 0;
      } else {
        t0 = 1;
      }
    }
    return t0;
  }
  return 1;
 }
});

Isolate.$defineClass("MassData", "Object", ["inertia=", "center?", "mass="], {
 setFrom$1: function(md) {
  this.mass = md.get$mass();
  this.inertia = md.get$inertia();
  this.center.setFrom$1(md.get$center());
 }
});

Isolate.$defineClass("PolygonShape", "Shape", ["vertexCount?", "normals?", "vertices?", "centroid?", "radius", "type"], {
 computeMass$2: function(massData, density) {
  $.assert($.ge(this.vertexCount, 2));
  if ($.eqB(this.vertexCount, 2)) {
    massData.get$center().setFrom$1($.index(this.vertices, 0)).addLocal$1($.index(this.vertices, 1)).mulLocal$1(0.5);
    massData.set$mass(0.0);
    massData.set$inertia(0.0);
    return;
  }
  var center = $.Vector$2(0, 0);
  center.setZero$0();
  var pRef = $.Vector$2(0, 0);
  pRef.setZero$0();
  var e1 = $.Vector$2(0, 0);
  var e2 = $.Vector$2(0, 0);
  for (var I = 0.0, i = 0, area = 0.0; $.ltB(i, this.vertexCount); I = I0, i = i0, area = area0) {
    var I0 = I;
    var area0 = area;
    var p2 = $.index(this.vertices, i);
    var t0 = i + 1;
    if ($.ltB(t0, this.vertexCount)) {
      var p3 = $.index(this.vertices, t0);
    } else {
      p3 = $.index(this.vertices, 0);
    }
    e1.setFrom$1(p2);
    e1.subLocal$1(pRef);
    e2.setFrom$1(p3);
    e2.subLocal$1(pRef);
    var D = $.crossVectors(e1, e2);
    var triangleArea = $.mul(0.5, D);
    var area1 = area + triangleArea;
    var t1 = center.x;
    var t2 = triangleArea * 0.3333333333333333;
    center.x = $.add(t1, $.mul(t2, $.add($.add(pRef.x, p2.get$x()), p3.get$x())));
    center.y = $.add(center.y, $.mul(t2, $.add($.add(pRef.y, p2.get$y()), p3.get$y())));
    var px = pRef.x;
    var py = pRef.y;
    var ex1 = e1.x;
    var ey1 = e1.y;
    var ex2 = e2.x;
    var ey2 = e2.y;
    I0 = $.add(I, $.mul(D, 0.3333333333333333 * $.add($.mul(0.25, $.add($.add($.mul(ex1, ex1), $.mul(ex2, ex1)), $.mul(ex2, ex2))), $.add($.mul(px, ex1), $.mul(px, ex2))) + $.mul($.mul(0.5, px), px) + (0.3333333333333333 * $.add($.mul(0.25, $.add($.add($.mul(ey1, ey1), $.mul(ey2, ey1)), $.mul(ey2, ey2))), $.add($.mul(py, ey1), $.mul(py, ey2))) + $.mul($.mul(0.5, py), py))));
    area0 = area1;
    var i0 = i + 1;
  }
  massData.set$mass($.mul(density, area));
  $.assert(area > 1.192e-7);
  center.mulLocal$1(1.0 / area);
  massData.get$center().setFrom$1(center);
  massData.set$inertia($.mul(I, density));
 },
 computeAxisAlignedBox$2: function(argAabb, argXf) {
  var lower = $.Vector$2(0, 0);
  var upper = $.Vector$2(0, 0);
  var v = $.Vector$2(0, 0);
  $.mulToOut(argXf, $.index(this.vertices, 0), lower);
  upper.setFrom$1(lower);
  for (var i = 1; $.ltB(i, this.vertexCount); i = i + 1) {
    $.mulToOut(argXf, $.index(this.vertices, i), v);
    $.minToOut(lower, v, lower);
    $.maxToOut(upper, v, upper);
  }
  var t0 = $.sub(lower.x, this.radius);
  argAabb.get$lowerBound().set$x(t0);
  var t1 = $.sub(lower.y, this.radius);
  argAabb.get$lowerBound().set$y(t1);
  var t2 = $.add(upper.x, this.radius);
  argAabb.get$upperBound().set$x(t2);
  var t3 = $.add(upper.y, this.radius);
  argAabb.get$upperBound().set$y(t3);
 },
 setAsBox$2: function(hx, hy) {
  this.vertexCount = 4;
  $.index(this.vertices, 0).setCoords$2($.neg(hx), $.neg(hy));
  $.index(this.vertices, 1).setCoords$2(hx, $.neg(hy));
  $.index(this.vertices, 2).setCoords$2(hx, hy);
  $.index(this.vertices, 3).setCoords$2($.neg(hx), hy);
  $.index(this.normals, 0).setCoords$2(0.0, -1.0);
  $.index(this.normals, 1).setCoords$2(1.0, 0.0);
  $.index(this.normals, 2).setCoords$2(0.0, 1.0);
  $.index(this.normals, 3).setCoords$2(-1.0, 0.0);
  this.centroid.setZero$0();
 },
 clone$0: function() {
  return $.PolygonShape$copy$1(this);
 },
 getSupport$1: function(d) {
  var bestValue = $.dot($.index(this.vertices, 0), d);
  if (typeof bestValue !== 'number') return this.getSupport$1$bailout(d, 1, bestValue);
  for (var i = 1, bestValue0 = bestValue, bestIndex = 0; $.ltB(i, this.vertexCount); i = i + 1, bestValue0 = bestValue1, bestIndex = bestIndex0) {
    var bestIndex0 = bestIndex;
    var bestValue1 = bestValue0;
    var value = $.dot($.index(this.vertices, i), d);
    bestIndex0 = bestIndex;
    bestValue1 = bestValue0;
    if ($.gtB(value, bestValue0)) {
      bestIndex0 = i;
      bestValue1 = value;
    }
  }
  return bestIndex;
 },
 getSupport$1$bailout: function(d, state, env0) {
  switch (state) {
    case 1:
      bestValue = env0;
      break;
  }
  switch (state) {
    case 0:
      var bestValue = $.dot($.index(this.vertices, 0), d);
    case 1:
      state = 0;
      var i = 1;
      var bestValue0 = bestValue;
      var bestIndex = 0;
      L0: while (true) {
        if (!$.ltB(i, this.vertexCount)) break L0;
        var bestIndex0 = bestIndex;
        var bestValue1 = bestValue0;
        var value = $.dot($.index(this.vertices, i), d);
        bestIndex0 = bestIndex;
        bestValue1 = bestValue0;
        if ($.gtB(value, bestValue0)) {
          bestIndex0 = i;
          bestValue1 = value;
        }
        i = i + 1;
        bestValue0 = bestValue1;
        bestIndex = bestIndex0;
      }
      return bestIndex;
  }
 },
 PolygonShape$copy$1: function(other) {
  for (var i = 0; $.ltB(i, $.get$length(other.get$vertices())); i = i + 1) {
    $.indexSet(this.vertices, i, $.Vector$copy$1($.index(other.get$vertices(), i)));
  }
  for (var i0 = 0; $.ltB(i0, $.get$length(other.get$normals())); i0 = i0 + 1) {
    $.indexSet(this.normals, i0, $.Vector$copy$1($.index(other.get$normals(), i0)));
  }
 },
 PolygonShape$0: function() {
  for (var i = 0; $.ltB(i, $.get$length(this.vertices)); i = i + 1) {
    $.indexSet(this.vertices, i, $.Vector$2(0, 0));
  }
  for (var i0 = 0; $.ltB(i0, $.get$length(this.normals)); i0 = i0 + 1) {
    $.indexSet(this.normals, i0, $.Vector$2(0, 0));
  }
 }
});

Isolate.$defineClass("Shape", "Object", ["radius=", "type="], {
});

Isolate.$defineClass("CanvasDraw", "DebugDraw", ["ctx", "viewportTransform", "drawFlags"], {
 set$_color: function(color) {
  this.ctx.setStrokeColor$4(color.get$x(), color.get$y(), color.get$z(), 1.0);
  this.ctx.setFillColor$4(color.get$x(), color.get$y(), color.get$z(), 0.8);
 },
 drawTransform$1: function(xf) {
  throw $.captureStackTrace($.NotImplementedException$0());
 },
 drawSegment$3: function(p1, p2, color) {
  this.set$_color(color);
  this.getWorldToScreenToOut$2(p1, p1);
  this.getWorldToScreenToOut$2(p2, p2);
  this.ctx.beginPath$0();
  this.ctx.moveTo$2(p1.get$x(), p1.get$y());
  this.ctx.lineTo$2(p2.get$x(), p2.get$y());
  this.ctx.closePath$0();
  this.ctx.stroke$0();
 },
 drawSolidCircle$4: function(center, radius, axis, color) {
  this.set$_color(color);
  this.getWorldToScreenToOut$2(center, center);
  var radius0 = $.mul(radius, this.viewportTransform.get$scale());
  this.ctx.beginPath$0();
  this.ctx.arc$6(center.get$x(), center.get$y(), radius0, 0, 6.283185307179586, true);
  this.ctx.closePath$0();
  this.ctx.fill$0();
 },
 drawSolidPolygon$3: function(vertices, vertexCount, color) {
  if (typeof vertices !== 'string' && (typeof vertices !== 'object'||vertices.constructor !== Array)) return this.drawSolidPolygon$3$bailout(vertices, vertexCount, color,  0);
  if (typeof vertexCount !== 'number') return this.drawSolidPolygon$3$bailout(vertices, vertexCount, color,  0);
  this.set$_color(color);
  for (var i = 0; i < vertexCount; i = i + 1) {
    var t0 = vertices.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    var t1 = vertices[i];
    var t2 = vertices.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    this.getWorldToScreenToOut$2(t1, vertices[i]);
  }
  this.ctx.beginPath$0();
  var t3 = this.ctx;
  var t4 = vertices.length;
  if (0 >= t4) throw $.ioore(0);
  var t5 = vertices[0].get$x();
  var t6 = vertices.length;
  if (0 >= t6) throw $.ioore(0);
  t3.moveTo$2(t5, vertices[0].get$y());
  for (var i0 = 1; i0 < vertexCount; i0 = i0 + 1) {
    var t7 = this.ctx;
    var t8 = vertices.length;
    if (i0 < 0 || i0 >= t8) throw $.ioore(i0);
    var t9 = vertices[i0].get$x();
    var t10 = vertices.length;
    if (i0 < 0 || i0 >= t10) throw $.ioore(i0);
    t7.lineTo$2(t9, vertices[i0].get$y());
  }
  var t11 = this.ctx;
  var t12 = vertices.length;
  if (0 >= t12) throw $.ioore(0);
  var t13 = vertices[0].get$x();
  var t14 = vertices.length;
  if (0 >= t14) throw $.ioore(0);
  t11.lineTo$2(t13, vertices[0].get$y());
  this.ctx.closePath$0();
  this.ctx.fill$0();
 },
 drawSolidPolygon$3$bailout: function(vertices, vertexCount, color, state, env0, env1) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
      this.set$_color(color);
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, vertexCount)) break L0;
        this.getWorldToScreenToOut$2($.index(vertices, i), $.index(vertices, i));
        i = i + 1;
      }
      this.ctx.beginPath$0();
      this.ctx.moveTo$2($.index(vertices, 0).get$x(), $.index(vertices, 0).get$y());
      var i0 = 1;
      L1: while (true) {
        if (!$.ltB(i0, vertexCount)) break L1;
        this.ctx.lineTo$2($.index(vertices, i0).get$x(), $.index(vertices, i0).get$y());
        i0 = i0 + 1;
      }
      this.ctx.lineTo$2($.index(vertices, 0).get$x(), $.index(vertices, 0).get$y());
      this.ctx.closePath$0();
      this.ctx.fill$0();
  }
 },
 drawPolygon$3: function(vertices, vertexCount, color) {
  if (typeof vertices !== 'string' && (typeof vertices !== 'object'||vertices.constructor !== Array)) return this.drawPolygon$3$bailout(vertices, vertexCount, color,  0);
  if (typeof vertexCount !== 'number') return this.drawPolygon$3$bailout(vertices, vertexCount, color,  0);
  if (vertexCount === 1) {
    var t0 = vertices.length;
    if (0 >= t0) throw $.ioore(0);
    var t1 = vertices[0];
    var t2 = vertices.length;
    if (0 >= t2) throw $.ioore(0);
    this.drawSegment$3(t1, vertices[0], color);
    return;
  }
  var t3 = vertexCount - 1;
  for (var i = 0; i < t3; i = i + 1) {
    var t4 = vertices.length;
    if (i < 0 || i >= t4) throw $.ioore(i);
    var t5 = vertices[i];
    var t6 = i + 1;
    var t7 = vertices.length;
    if (t6 < 0 || t6 >= t7) throw $.ioore(t6);
    this.drawSegment$3(t5, vertices[t6], color);
  }
  if (vertexCount > 2) {
    if (t3 !== (t3 | 0)) throw $.iae(t3);
    var t8 = vertices.length;
    if (t3 < 0 || t3 >= t8) throw $.ioore(t3);
    var t9 = vertices[t3];
    var t10 = vertices.length;
    if (0 >= t10) throw $.ioore(0);
    this.drawSegment$3(t9, vertices[0], color);
  }
 },
 drawPolygon$3$bailout: function(vertices, vertexCount, color, state, env0, env1) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
      if ($.eqB(vertexCount, 1)) {
        this.drawSegment$3($.index(vertices, 0), $.index(vertices, 0), color);
        return;
      }
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, $.sub(vertexCount, 1))) break L0;
        this.drawSegment$3($.index(vertices, i), $.index(vertices, i + 1), color);
        i = i + 1;
      }
      if ($.gtB(vertexCount, 2)) {
        this.drawSegment$3($.index(vertices, $.sub(vertexCount, 1)), $.index(vertices, 0), color);
      }
  }
 }
});

Isolate.$defineClass("ContactFilter", "Object", [], {
 shouldCollide$2: function(fixtureA, fixtureB) {
  var filterA = fixtureA.get$filter();
  var filterB = fixtureB.get$filter();
  if (!$.eqB(filterA.get$groupIndex(), 0) && $.eqB(filterA.get$groupIndex(), filterB.get$groupIndex())) {
    return $.gt(filterA.get$groupIndex(), 0);
  }
  return !$.eqB($.and(filterA.get$maskBits(), filterB.get$categoryBits()), 0) && !$.eqB($.and(filterA.get$categoryBits(), filterB.get$maskBits()), 0);
 }
});

Isolate.$defineClass("ContactImpulse", "Object", ["tangentImpulses?", "normalImpulses?"], {
});

Isolate.$defineClass("DebugDraw", "Object", ["drawFlags?"], {
 getWorldToScreenToOut$2: function(argWorld, argScreen) {
  this.viewportTransform.getWorldToScreen$2(argWorld, argScreen);
 },
 drawPolygon$3: function(vertices, vertexCount, color) {
  if (typeof vertices !== 'string' && (typeof vertices !== 'object'||vertices.constructor !== Array)) return this.drawPolygon$3$bailout(vertices, vertexCount, color,  0);
  if (typeof vertexCount !== 'number') return this.drawPolygon$3$bailout(vertices, vertexCount, color,  0);
  if (vertexCount === 1) {
    var t0 = vertices.length;
    if (0 >= t0) throw $.ioore(0);
    var t1 = vertices[0];
    var t2 = vertices.length;
    if (0 >= t2) throw $.ioore(0);
    this.drawSegment$3(t1, vertices[0], color);
    return;
  }
  var t3 = vertexCount - 1;
  for (var i = 0; i < t3; i = i + 1) {
    var t4 = vertices.length;
    if (i < 0 || i >= t4) throw $.ioore(i);
    var t5 = vertices[i];
    var t6 = i + 1;
    var t7 = vertices.length;
    if (t6 < 0 || t6 >= t7) throw $.ioore(t6);
    this.drawSegment$3(t5, vertices[t6], color);
  }
  if (vertexCount > 2) {
    if (t3 !== (t3 | 0)) throw $.iae(t3);
    var t8 = vertices.length;
    if (t3 < 0 || t3 >= t8) throw $.ioore(t3);
    var t9 = vertices[t3];
    var t10 = vertices.length;
    if (0 >= t10) throw $.ioore(0);
    this.drawSegment$3(t9, vertices[0], color);
  }
 },
 drawPolygon$3$bailout: function(vertices, vertexCount, color, state, env0, env1) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
      if ($.eqB(vertexCount, 1)) {
        this.drawSegment$3($.index(vertices, 0), $.index(vertices, 0), color);
        return;
      }
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, $.sub(vertexCount, 1))) break L0;
        this.drawSegment$3($.index(vertices, i), $.index(vertices, i + 1), color);
        i = i + 1;
      }
      if ($.gtB(vertexCount, 2)) {
        this.drawSegment$3($.index(vertices, $.sub(vertexCount, 1)), $.index(vertices, 0), color);
      }
  }
 },
 get$flags: function() {
  return this.drawFlags;
 },
 set$flags: function(flags) {
  this.drawFlags = flags;
 }
});

Isolate.$defineClass("Body", "Object", ["tempCenter", "oldCenter", "_pxf", "_pmd", "_fixDef", "sweep?", "originTransform?", "islandIndex!", "_type?", "angularDamping?", "linearDamping?", "invInertia?", "_inertia", "_torque=", "_force?", "jointList?", "fixtureCount", "fixtureList?", "prev=", "next=", "invMass?", "mass=", "_angularVelocity", "_linearVelocity", "userData=", "sleepTime=", "contactList=", "flags=", "world"], {
 advance$1: function(t) {
  this.sweep.advance$1(t);
  this.sweep.get$center().setFrom$1(this.sweep.get$centerZero());
  var t0 = this.sweep.get$angleZero();
  this.sweep.set$angle(t0);
  this.synchronizeTransform$0();
 },
 shouldCollide$1: function(other) {
  return !(!$.eqB(this._type, 2) && !$.eqB(other.get$_type(), 2));
 },
 synchronizeTransform$0: function() {
  var c = $.cos(this.sweep.get$angle());
  var s = $.sin(this.sweep.get$angle());
  var t = this.originTransform;
  var r = t.get$rotation();
  var p = t.get$position();
  r.get$col1().set$x(c);
  var t0 = $.neg(s);
  r.get$col2().set$x(t0);
  r.get$col1().set$y(s);
  r.get$col2().set$y(c);
  p.set$x($.add($.mul($.add($.mul(r.get$col1().get$x(), this.sweep.get$localCenter().get$x()), $.mul(r.get$col2().get$x(), this.sweep.get$localCenter().get$y())), -1), this.sweep.get$center().get$x()));
  p.set$y($.add($.mul($.add($.mul(r.get$col1().get$y(), this.sweep.get$localCenter().get$x()), $.mul(r.get$col2().get$y(), this.sweep.get$localCenter().get$y())), -1), this.sweep.get$center().get$y()));
 },
 synchronizeFixtures$0: function() {
  var xf1 = this._pxf;
  xf1.get$rotation().setAngle$1(this.sweep.get$angleZero());
  $.mulMatrixAndVectorToOut(xf1.get$rotation(), this.sweep.get$localCenter(), xf1.get$position());
  xf1.get$position().mulLocal$1(-1);
  xf1.get$position().addLocal$1(this.sweep.get$centerZero());
  var broadPhase = this.world.get$_contactManager().get$broadPhase();
  for (var f = this.fixtureList; !$.eqNullB(f); f = f.get$next()) {
    f.synchronize$3(broadPhase, xf1, this.originTransform);
  }
 },
 get$fixedRotation: function() {
  return $.eq($.and(this.flags, 16), 16);
 },
 get$active: function() {
  return $.eq($.and(this.flags, 32), 32);
 },
 get$awake: function() {
  return $.eq($.and(this.flags, 2), 2);
 },
 set$awake: function(flag) {
  if (flag === true) {
    if ($.eqB($.and(this.flags, 2), 0)) {
      this.flags = $.or(this.flags, 2);
      this.sleepTime = 0.0;
    }
  } else {
    this.flags = $.and(this.flags, -3);
    this.sleepTime = 0.0;
    this._linearVelocity.setZero$0();
    this._angularVelocity = 0.0;
    this._force.setZero$0();
    this._torque = 0.0;
  }
 },
 get$bullet: function() {
  return $.eq($.and(this.flags, 8), 8);
 },
 set$type: function(otherType) {
  if ($.eqB(this._type, otherType)) {
    return;
  }
  this._type = otherType;
  this.resetMassData$0();
  if ($.eqB(this._type, 0)) {
    this._linearVelocity.setZero$0();
    this._angularVelocity = 0.0;
  }
  this.set$awake(true);
  this._force.setZero$0();
  this._torque = 0.0;
  for (var ce = this.contactList; !$.eqNullB(ce); ce = ce.get$next()) {
    ce.get$contact().flagForFiltering$0();
  }
 },
 get$type: function() {
  return this._type;
 },
 getWorldVectorToOut$2: function(localVector, out) {
  $.mulMatrixAndVectorToOut(this.originTransform.get$rotation(), localVector, out);
 },
 getWorldVector$1: function(localVector) {
  var out = $.Vector$2(0, 0);
  this.getWorldVectorToOut$2(localVector, out);
  return out;
 },
 getWorldPointToOut$2: function(localPoint, out) {
  $.mulToOut(this.originTransform, localPoint, out);
 },
 getWorldPoint$1: function(localPoint) {
  var v = $.Vector$2(0, 0);
  this.getWorldPointToOut$2(localPoint, v);
  return v;
 },
 resetMassData$0: function() {
  this.mass = 0.0;
  this.invMass = 0.0;
  this._inertia = 0.0;
  this.invInertia = 0.0;
  this.sweep.get$localCenter().setZero$0();
  if ($.eqB(this._type, 0) || $.eqB(this._type, 1)) {
    this.sweep.get$center().setFrom$1(this.originTransform.get$position());
    this.sweep.get$centerZero().setFrom$1(this.originTransform.get$position());
    return;
  }
  $.assert($.eq(this._type, 2));
  this.tempCenter.setZero$0();
  var massData = this._pmd;
  for (var f = this.fixtureList; !$.eqNullB(f); f = f.get$next()) {
    if ($.eqB(f.get$density(), 0.0)) {
      continue;
    }
    f.getMassData$1(massData);
    this.mass = $.add(this.mass, massData.get$mass());
    var temp = $.Vector$copy$1(massData.get$center());
    temp.mulLocal$1(massData.get$mass());
    this.tempCenter.addLocal$1(temp);
    this._inertia = $.add(this._inertia, massData.get$inertia());
  }
  if ($.gtB(this.mass, 0.0)) {
    this.invMass = $.div(1.0, this.mass);
    this.tempCenter.mulLocal$1(this.invMass);
  } else {
    this.mass = 1.0;
    this.invMass = 1.0;
  }
  if ($.gtB(this._inertia, 0.0) && $.eqB($.and(this.flags, 16), 0)) {
    this._inertia = $.sub(this._inertia, $.mul(this.mass, $.dot(this.tempCenter, this.tempCenter)));
    $.assert($.gt(this._inertia, 0.0));
    this.invInertia = $.div(1.0, this._inertia);
  } else {
    this._inertia = 0.0;
    this.invInertia = 0.0;
  }
  this.oldCenter.setFrom$1(this.sweep.get$center());
  this.sweep.get$localCenter().setFrom$1(this.tempCenter);
  $.mulToOut(this.originTransform, this.sweep.get$localCenter(), this.sweep.get$centerZero());
  this.sweep.get$center().setFrom$1(this.sweep.get$centerZero());
  var temp0 = $.Vector$copy$1(this.sweep.get$center());
  temp0.subLocal$1(this.oldCenter);
  $.crossNumAndVectorToOut(this._angularVelocity, temp0, temp0);
  this._linearVelocity.addLocal$1(temp0);
 },
 getMassData$1: function(data) {
  data.set$mass(this.mass);
  var lc = this.sweep.get$localCenter();
  data.set$inertia($.add(this._inertia, $.mul(this.mass, lc.get$lengthSquared())));
  var t0 = lc.get$x();
  data.get$center().set$x(t0);
  var t1 = lc.get$y();
  data.get$center().set$y(t1);
 },
 get$inertia: function() {
  return $.add(this._inertia, $.mul(this.mass, $.add($.mul(this.sweep.get$localCenter().get$x(), this.sweep.get$localCenter().get$x()), $.mul(this.sweep.get$localCenter().get$y(), this.sweep.get$localCenter().get$y()))));
 },
 set$angularVelocity: function(w) {
  if (!$.eqB(this._type, 0)) {
    if ($.gtB($.mul(w, w), 0)) {
      this.set$awake(true);
    }
    this._angularVelocity = w;
  }
 },
 get$angularVelocity: function() {
  return this._angularVelocity;
 },
 get$linearVelocity: function() {
  return this._linearVelocity;
 },
 get$localCenter: function() {
  return this.sweep.get$localCenter();
 },
 get$worldCenter: function() {
  return this.sweep.get$center();
 },
 get$angle: function() {
  return this.sweep.get$angle();
 },
 get$position: function() {
  return this.originTransform.get$position();
 },
 createFixture$1: function(def) {
  $.assert($.eq(this.world.get$locked(), false));
  var fixture = $.Fixture$0();
  fixture.create$2(this, def);
  if ($.eqB($.and(this.flags, 32), 32)) {
    fixture.createProxy$2(this.world.get$_contactManager().get$broadPhase(), this.originTransform);
  }
  fixture.next = this.fixtureList;
  this.fixtureList = fixture;
  this.fixtureCount = $.add(this.fixtureCount, 1);
  fixture.body = this;
  if ($.gtB(fixture.density, 0.0)) {
    this.resetMassData$0();
  }
  var t0 = this.world;
  t0.set$_flags($.or(t0.get$_flags(), 1));
  return fixture;
 },
 next$0: function() { return this.next.$call$0(); },
 Body$2: function(bd, world) {
  if (bd.get$bullet() === true) {
    this.flags = $.or(this.flags, 8);
  }
  if (bd.get$fixedRotation() === true) {
    this.flags = $.or(this.flags, 16);
  }
  if (bd.get$allowSleep() === true) {
    this.flags = $.or(this.flags, 4);
  }
  if (bd.get$awake() === true) {
    this.flags = $.or(this.flags, 2);
  }
  if (bd.get$active() === true) {
    this.flags = $.or(this.flags, 32);
  }
  this.originTransform.get$position().setFrom$1(bd.get$position());
  this.originTransform.get$rotation().setAngle$1(bd.get$angle());
  this.sweep.get$localCenter().setZero$0();
  $.mulToOut(this.originTransform, this.sweep.get$localCenter(), this.sweep.get$centerZero());
  this.sweep.get$center().setFrom$1(this.sweep.get$centerZero());
  var t0 = bd.get$angle();
  this.sweep.set$angle(t0);
  var t1 = bd.get$angle();
  this.sweep.set$angleZero(t1);
  if ($.eqB(this._type, 2)) {
    this.mass = 1;
    this.invMass = 1;
  } else {
    this.mass = 0;
    this.invMass = 0;
  }
 }
});

Isolate.$defineClass("BodyDef", "Object", ["active?", "awake=", "angularDamping?", "linearDamping?", "allowSleep?", "bullet?", "isSleeping", "fixedRotation?", "angularVelocity=", "linearVelocity?", "position?", "userData=", "angle=", "type="], {
});

Isolate.$defineClass("ContactManager", "Object", ["pool", "contactListener?", "contactFilter", "contactCount?", "contactList=", "broadPhase?"], {
 collide$0: function() {
  for (var c = this.contactList; !$.eqNullB(c); c = c0) {
    var c0 = c;
    var fixtureA = c.get$fixtureA();
    var fixtureB = c.get$fixtureB();
    var bodyA = fixtureA.get$body();
    var bodyB = fixtureB.get$body();
    if ($.eqB(bodyA.get$awake(), false) && $.eqB(bodyB.get$awake(), false)) {
      c0 = c.get$next();
      continue;
    }
    if ($.eqB($.and(c.get$flags(), 8), 8)) {
      if ($.eqB(bodyB.shouldCollide$1(bodyA), false)) {
        var c1 = c.get$next();
        this.destroy$1(c);
        c0 = c1;
        continue;
      }
      if (!$.eqNullB(this.contactFilter) && $.eqB(this.contactFilter.shouldCollide$2(fixtureA, fixtureB), false)) {
        var c2 = c.get$next();
        this.destroy$1(c);
        c0 = c2;
        continue;
      }
      c.set$flags($.and(c.get$flags(), -9));
    }
    var proxyIdA = fixtureA.get$proxy();
    var proxyIdB = fixtureB.get$proxy();
    if ($.eqB(this.broadPhase.testOverlap$2(proxyIdA, proxyIdB), false)) {
      var c3 = c.get$next();
      this.destroy$1(c);
      c0 = c3;
      continue;
    }
    c.update$1(this.contactListener);
    c0 = c.get$next();
  }
 },
 destroy$1: function(c) {
  var fixtureA = c.get$fixtureA();
  var fixtureB = c.get$fixtureB();
  var bodyA = fixtureA.get$body();
  var bodyB = fixtureB.get$body();
  if (!$.eqNullB(this.contactListener) && c.get$touching() === true) {
    this.contactListener.endContact$1(c);
  }
  if (!$.eqNullB(c.get$prev())) {
    var t0 = c.get$next();
    c.get$prev().set$next(t0);
  }
  if (!$.eqNullB(c.get$next())) {
    var t1 = c.get$prev();
    c.get$next().set$prev(t1);
  }
  if ($.eqB(c, this.contactList)) {
    this.contactList = c.get$next();
  }
  if (!$.eqNullB(c.get$edge1().get$prev())) {
    var t2 = c.get$edge1().get$next();
    c.get$edge1().get$prev().set$next(t2);
  }
  if (!$.eqNullB(c.get$edge1().get$next())) {
    var t3 = c.get$edge1().get$prev();
    c.get$edge1().get$next().set$prev(t3);
  }
  if ($.eqB(c.get$edge1(), bodyA.get$contactList())) {
    bodyA.set$contactList(c.get$edge1().get$next());
  }
  if (!$.eqNullB(c.get$edge2().get$prev())) {
    var t4 = c.get$edge2().get$next();
    c.get$edge2().get$prev().set$next(t4);
  }
  if (!$.eqNullB(c.get$edge2().get$next())) {
    var t5 = c.get$edge2().get$prev();
    c.get$edge2().get$next().set$prev(t5);
  }
  if ($.eqB(c.get$edge2(), bodyB.get$contactList())) {
    bodyB.set$contactList(c.get$edge2().get$next());
  }
  this.pool.pushContact$1(c);
  this.contactCount = $.sub(this.contactCount, 1);
 },
 findNewContacts$0: function() {
  this.broadPhase.updatePairs$1(this);
 },
 addPair$2: function(fixtureA, fixtureB) {
  var bodyA = fixtureA.get$body();
  var bodyB = fixtureB.get$body();
  if (bodyA === bodyB) {
    return;
  }
  for (var edge = bodyB.get$contactList(); !$.eqNullB(edge); edge = edge0) {
    var edge0 = edge;
    if ($.eqB(edge.get$other(), bodyA)) {
      var fA = edge.get$contact().get$fixtureA();
      var fB = edge.get$contact().get$fixtureB();
      if ($.eqB(fA, fixtureA) && $.eqB(fB, fixtureB)) {
        return;
      }
      if ($.eqB(fA, fixtureB) && $.eqB(fB, fixtureA)) {
        return;
      }
    }
    edge0 = edge.get$next();
  }
  if ($.eqB(bodyB.shouldCollide$1(bodyA), false)) {
    return;
  }
  if (!$.eqNullB(this.contactFilter) && $.eqB(this.contactFilter.shouldCollide$2(fixtureA, fixtureB), false)) {
    return;
  }
  var c = this.pool.popContact$2(fixtureA, fixtureB);
  var fixtureA0 = c.get$fixtureA();
  var fixtureB0 = c.get$fixtureB();
  var bodyA0 = fixtureA0.get$body();
  var bodyB0 = fixtureB0.get$body();
  c.set$prev((void 0));
  c.set$next(this.contactList);
  if (!$.eqNullB(this.contactList)) {
    this.contactList.set$prev(c);
  }
  this.contactList = c;
  c.get$edge1().set$contact(c);
  c.get$edge1().set$other(bodyB0);
  c.get$edge1().set$prev((void 0));
  var t0 = bodyA0.get$contactList();
  c.get$edge1().set$next(t0);
  if (!$.eqNullB(bodyA0.get$contactList())) {
    var t1 = c.get$edge1();
    bodyA0.get$contactList().set$prev(t1);
  }
  bodyA0.set$contactList(c.get$edge1());
  c.get$edge2().set$contact(c);
  c.get$edge2().set$other(bodyA0);
  c.get$edge2().set$prev((void 0));
  var t2 = bodyB0.get$contactList();
  c.get$edge2().set$next(t2);
  if (!$.eqNullB(bodyB0.get$contactList())) {
    var t3 = c.get$edge2();
    bodyB0.get$contactList().set$prev(t3);
  }
  bodyB0.set$contactList(c.get$edge2());
  this.contactCount = $.add(this.contactCount, 1);
 }
});

Isolate.$defineClass("Filter", "Object", ["groupIndex=", "maskBits=", "categoryBits="], {
 setFrom$1: function(other) {
  this.categoryBits = other.get$categoryBits();
  this.maskBits = other.get$maskBits();
  this.groupIndex = other.get$groupIndex();
 }
});

Isolate.$defineClass("Fixture", "Object", ["_poolTwo", "_poolOne", "userData=", "isSensor?", "filter?", "proxy?", "restitution=", "friction=", "shape?", "body?", "next=", "density?", "box?"], {
 get$type: function() {
  return this.shape.get$type();
 },
 getMassData$1: function(massData) {
  this.shape.computeMass$2(massData, this.density);
 },
 synchronize$3: function(broadPhase, transformOne, transformTwo) {
  if ($.eqNullB(this.proxy)) {
    return;
  }
  this.shape.computeAxisAlignedBox$2(this._poolOne, transformOne);
  this.shape.computeAxisAlignedBox$2(this._poolTwo, transformTwo);
  if ($.ltB(this._poolOne.get$lowerBound().get$x(), this._poolTwo.get$lowerBound().get$x())) {
    var t0 = this._poolOne.get$lowerBound().get$x();
  } else {
    t0 = this._poolTwo.get$lowerBound().get$x();
  }
  this.box.get$lowerBound().set$x(t0);
  if ($.ltB(this._poolOne.get$lowerBound().get$y(), this._poolTwo.get$lowerBound().get$y())) {
    var t1 = this._poolOne.get$lowerBound().get$y();
  } else {
    t1 = this._poolTwo.get$lowerBound().get$y();
  }
  this.box.get$lowerBound().set$y(t1);
  if ($.gtB(this._poolOne.get$upperBound().get$x(), this._poolTwo.get$upperBound().get$x())) {
    var t2 = this._poolOne.get$upperBound().get$x();
  } else {
    t2 = this._poolTwo.get$upperBound().get$x();
  }
  this.box.get$upperBound().set$x(t2);
  if ($.gtB(this._poolOne.get$upperBound().get$y(), this._poolTwo.get$upperBound().get$y())) {
    var t3 = this._poolOne.get$upperBound().get$y();
  } else {
    t3 = this._poolTwo.get$upperBound().get$y();
  }
  this.box.get$upperBound().set$y(t3);
  var disp = this._poolOne.get$lowerBound();
  disp.set$x($.sub(transformTwo.get$position().get$x(), transformOne.get$position().get$x()));
  disp.set$y($.sub(transformTwo.get$position().get$y(), transformOne.get$position().get$y()));
  broadPhase.moveProxy$3(this.proxy, this.box, disp);
 },
 createProxy$2: function(broadPhase, xf) {
  $.assert($.eqNull(this.proxy));
  this.shape.computeAxisAlignedBox$2(this.box, xf);
  this.proxy = broadPhase.createProxy$2(this.box, this);
 },
 create$2: function(b, def) {
  this.userData = def.get$userData();
  this.friction = def.get$friction();
  this.restitution = def.get$restitution();
  this.body = b;
  this.next = (void 0);
  this.filter.setFrom$1(def.get$filter());
  this.isSensor = def.get$isSensor();
  this.shape = def.get$shape().clone$0();
  this.density = def.get$density();
 },
 filter$1: function(arg0) { return this.filter.$call$1(arg0); },
 next$0: function() { return this.next.$call$0(); }
});

Isolate.$defineClass("FixtureDef", "Object", ["filter?", "isSensor?", "density?", "restitution=", "friction=", "userData=", "shape?"], {
 filter$1: function(arg0) { return this.filter.$call$1(arg0); },
 FixtureDef$0: function() {
  this.filter.set$categoryBits(1);
  this.filter.set$maskBits(65535);
  this.filter.set$groupIndex(0);
 }
});

Isolate.$defineClass("Island", "Object", ["impulse", "_translation", "_contactSolver", "positionIterationCount", "jointCapacity", "contactCapacity", "bodyCapacity", "contactCount?", "jointCount", "bodyCount?", "velocities", "positions", "joints", "contacts", "bodies?", "listener"], {
 report$1: function(constraints) {
  if (typeof constraints !== 'string' && (typeof constraints !== 'object'||constraints.constructor !== Array)) return this.report$1$bailout(constraints,  0);
  if ($.eqNullB(this.listener)) {
    return;
  }
  for (var i = 0; $.ltB(i, this.contactCount); i = i + 1) {
    var c = $.index(this.contacts, i);
    var t0 = constraints.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    var t1 = constraints[i];
    for (var j = 0; $.ltB(j, t1.get$pointCount()); j = j + 1) {
      $.indexSet(this.impulse.get$normalImpulses(), j, $.index(t1.get$points(), j).get$normalImpulse());
      $.indexSet(this.impulse.get$tangentImpulses(), j, $.index(t1.get$points(), j).get$tangentImpulse());
    }
    this.listener.postSolve$2(c, this.impulse);
  }
 },
 report$1$bailout: function(constraints, state, env0) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if ($.eqNullB(this.listener)) {
        return;
      }
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, this.contactCount)) break L0;
        var c = $.index(this.contacts, i);
        var cc = $.index(constraints, i);
        var j = 0;
        L1: while (true) {
          if (!$.ltB(j, cc.get$pointCount())) break L1;
          $.indexSet(this.impulse.get$normalImpulses(), j, $.index(cc.get$points(), j).get$normalImpulse());
          $.indexSet(this.impulse.get$tangentImpulses(), j, $.index(cc.get$points(), j).get$tangentImpulse());
          j = j + 1;
        }
        this.listener.postSolve$2(c, this.impulse);
        i = i + 1;
      }
  }
 },
 addJoint$1: function(joint) {
  $.assert($.lt(this.jointCount, this.jointCapacity));
  var t0 = this.joints;
  var t1 = this.jointCount;
  this.jointCount = $.add(t1, 1);
  $.indexSet(t0, t1, joint);
 },
 addContact$1: function(contact) {
  $.assert($.lt(this.contactCount, this.contactCapacity));
  var t0 = this.contacts;
  var t1 = this.contactCount;
  this.contactCount = $.add(t1, 1);
  $.indexSet(t0, t1, contact);
 },
 addBody$1: function(body) {
  $.assert($.lt(this.bodyCount, this.bodyCapacity));
  body.set$islandIndex(this.bodyCount);
  var t0 = this.bodies;
  var t1 = this.bodyCount;
  this.bodyCount = $.add(t1, 1);
  $.indexSet(t0, t1, body);
 },
 solve$3: function(step, gravity, allowSleep) {
  for (var i = 0; $.ltB(i, this.bodyCount); i = i + 1) {
    var b = $.index(this.bodies, i);
    if (!$.eqB(b.get$type(), 2)) {
      continue;
    }
    var velocityDelta = $.Vector$2($.mul($.add($.mul(b.get$_force().get$x(), b.get$invMass()), gravity.get$x()), step.get$dt()), $.mul($.add($.mul(b.get$_force().get$y(), b.get$invMass()), gravity.get$y()), step.get$dt()));
    b.get$linearVelocity().addLocal$1(velocityDelta);
    b.set$angularVelocity($.add(b.get$angularVelocity(), $.mul($.mul(step.get$dt(), b.get$invInertia()), b.get$_torque())));
    var a = $.sub(1.0, $.mul(step.get$dt(), b.get$linearDamping()));
    var t0 = a < 1.0;
    if (t0) {
      var t1 = a;
    } else {
      t1 = 1.0;
    }
    if (0.0 > t1) {
      var a1 = 0.0;
    } else {
      if (t0) {
        a1 = a;
      } else {
        a1 = 1.0;
      }
    }
    b.get$linearVelocity().mulLocal$1(a1);
    var a2 = $.sub(1.0, $.mul(step.get$dt(), b.get$angularDamping()));
    if (a2 < 1.0) {
      var b1 = a2;
    } else {
      b1 = 1.0;
    }
    var t2 = b.get$angularVelocity();
    if (0.0 > b1) {
      var t3 = 0.0;
    } else {
      t3 = b1;
    }
    b.set$angularVelocity($.mul(t2, t3));
  }
  for (var i1 = -1, i2 = 0; $.ltB(i2, this.contactCount); i1 = i10, i2 = i20) {
    var i10 = i1;
    var fixtureA = $.index(this.contacts, i2).get$fixtureA();
    var fixtureB = $.index(this.contacts, i2).get$fixtureB();
    var bodyA = fixtureA.get$body();
    var bodyB = fixtureB.get$body();
    i10 = i1;
    if (!$.eqB(bodyA.get$type(), 0) && !$.eqB(bodyB.get$type(), 0)) {
      var i11 = i1 + 1;
      var temp = $.index(this.contacts, i11);
      $.indexSet(this.contacts, i11, $.index(this.contacts, i2));
      $.indexSet(this.contacts, i2, temp);
      i10 = i11;
    }
    var i20 = i2 + 1;
  }
  this._contactSolver.init$3(this.contacts, this.contactCount, step.get$dtRatio());
  this._contactSolver.warmStart$0();
  for (var i0 = 0; $.ltB(i0, this.jointCount); i0 = i0 + 1) {
    $.index(this.joints, i0).initVelocityConstraints$1(step);
  }
  for (var i3 = 0; $.ltB(i3, step.get$velocityIterations()); i3 = i3 + 1) {
    for (var j = 0; $.ltB(j, this.jointCount); j = j + 1) {
      $.index(this.joints, j).solveVelocityConstraints$1(step);
    }
    this._contactSolver.solveVelocityConstraints$0();
  }
  this._contactSolver.storeImpulses$0();
  var temp0 = $.Vector$2(0, 0);
  for (var i4 = 0; $.ltB(i4, this.bodyCount); i4 = i4 + 1) {
    var b0 = $.index(this.bodies, i4);
    if ($.eqB(b0.get$type(), 0)) {
      continue;
    }
    this._translation.setFrom$1(b0.get$linearVelocity());
    this._translation.mulLocal$1(step.get$dt());
    if ($.gtB($.dot(this._translation, this._translation), 4.0)) {
      var ratio = $.div(2.0, $.get$length(this._translation));
      b0.get$linearVelocity().mulLocal$1(ratio);
    }
    var rotation = $.mul(step.get$dt(), b0.get$angularVelocity());
    if ($.gtB($.mul(rotation, rotation), 2.4674011002723395)) {
      var ratio0 = $.div(1.5707963267948966, $.abs(rotation));
      b0.set$angularVelocity($.mul(b0.get$angularVelocity(), ratio0));
    }
    b0.get$sweep().get$centerZero().setFrom$1(b0.get$sweep().get$center());
    var t4 = b0.get$sweep().get$angle();
    b0.get$sweep().set$angleZero(t4);
    temp0.setFrom$1(b0.get$linearVelocity());
    temp0.mulLocal$1(step.get$dt());
    b0.get$sweep().get$center().addLocal$1(temp0);
    var t5 = b0.get$sweep();
    t5.set$angle($.add(t5.get$angle(), $.mul(step.get$dt(), b0.get$angularVelocity())));
    b0.synchronizeTransform$0();
  }
  for (var i5 = 0; $.ltB(i5, step.get$positionIterations()); i5 = i5 + 1) {
    var contactsOkay = this._contactSolver.solvePositionConstraints$1(0.2);
    for (var jointsOkay = true, j0 = 0; $.ltB(j0, this.jointCount); jointsOkay = jointsOkay0, j0 = j0 + 1) {
      var jointsOkay0 = jointsOkay;
      var jointOkay = $.index(this.joints, j0).solvePositionConstraints$1(0.2);
      jointsOkay0 = jointsOkay && jointOkay === true;
    }
    var t6 = contactsOkay === true;
    var t7 = t6;
    if (t6) {
      t7 = jointsOkay;
    }
    if (t7) {
      break;
    }
  }
  this.report$1(this._contactSolver.get$constraints());
  if (allowSleep === true) {
    for (var minSleepTime = 99999999999999.0, i6 = 0; $.ltB(i6, this.bodyCount); i7 = i6 + 1, minSleepTime = minSleepTime0, i6 = i7) {
      var minSleepTime0 = minSleepTime;
      var b2 = $.index(this.bodies, i6);
      if ($.eqB(b2.get$type(), 0)) {
        minSleepTime0 = minSleepTime;
        continue;
      }
      var minSleepTime1 = minSleepTime;
      if ($.eqB($.and(b2.get$flags(), 4), 0)) {
        b2.set$sleepTime(0.0);
        minSleepTime1 = 0.0;
      }
      if ($.eqB($.and(b2.get$flags(), 4), 0) || $.gtB($.mul(b2.get$angularVelocity(), b2.get$angularVelocity()), 0.0012184696791468343) || $.gtB($.dot(b2.get$linearVelocity(), b2.get$linearVelocity()), 0.0001)) {
        b2.set$sleepTime(0.0);
        minSleepTime0 = 0.0;
      } else {
        b2.set$sleepTime($.add(b2.get$sleepTime(), step.get$dt()));
        minSleepTime0 = $.min(minSleepTime1, b2.get$sleepTime());
      }
    }
    if ($.geB(minSleepTime, 0.5)) {
      for (var i8 = 0; $.ltB(i8, this.bodyCount); i8 = i8 + 1) {
        $.index(this.bodies, i8).set$awake(false);
      }
    }
  }
  var i7;
 },
 clear$0: function() {
  this.bodyCount = 0;
  this.contactCount = 0;
  this.jointCount = 0;
 },
 init$4: function(argBodyCapacity, argContactCapacity, argJointCapacity, argListener) {
  this.bodyCapacity = argBodyCapacity;
  this.contactCapacity = argContactCapacity;
  this.jointCapacity = argJointCapacity;
  this.bodyCount = 0;
  this.contactCount = 0;
  this.listener = argListener;
  if ($.eqNullB(this.bodies) || $.gtB(this.bodyCapacity, $.get$length(this.bodies))) {
    var t0 = $.List(this.bodyCapacity);
    $.setRuntimeTypeInfo(t0, ({E: 'Body'}));
    this.bodies = t0;
  }
  if ($.eqNullB(this.contacts) || $.gtB(this.contactCapacity, $.get$length(this.contacts))) {
    var t1 = $.List(this.contactCapacity);
    $.setRuntimeTypeInfo(t1, ({E: 'Contact'}));
    this.contacts = t1;
  }
  if ($.eqNullB(this.joints) || $.gtB(this.jointCapacity, $.get$length(this.joints))) {
    var t2 = $.List(this.jointCapacity);
    $.setRuntimeTypeInfo(t2, ({E: 'Joint'}));
    this.joints = t2;
  }
  if ($.eqNullB(this.velocities) || $.gtB(this.bodyCapacity, $.get$length(this.velocities))) {
    if ($.eqNullB(this.velocities)) {
      var t3 = $.List(0);
      $.setRuntimeTypeInfo(t3, ({E: 'Velocity'}));
      var old = t3;
    } else {
      old = this.velocities;
    }
    var t4 = $.List(this.bodyCapacity);
    $.setRuntimeTypeInfo(t4, ({E: 'Velocity'}));
    this.velocities = t4;
    $.setRange$3(this.velocities, 0, $.get$length(old), old);
    var i = $.get$length(old);
    if (i !== (i | 0)) return this.init$4$bailout(argBodyCapacity, argContactCapacity, argJointCapacity, argListener, 1, i);
    var i0 = i;
    for (; $.ltB(i0, $.get$length(this.velocities)); i0 = i0 + 1) {
      $.indexSet(this.velocities, i0, $.Velocity$0());
    }
  }
  if ($.eqNullB(this.positions) || $.gtB(this.bodyCapacity, $.get$length(this.positions))) {
    if ($.eqNullB(this.positions)) {
      var t5 = $.List(0);
      $.setRuntimeTypeInfo(t5, ({E: 'Position'}));
      var old0 = t5;
    } else {
      old0 = this.positions;
    }
    var t6 = $.List(this.bodyCapacity);
    $.setRuntimeTypeInfo(t6, ({E: 'Position'}));
    this.positions = t6;
    $.setRange$3(this.positions, 0, $.get$length(old0), old0);
    var i1 = $.get$length(old0);
    if (i1 !== (i1 | 0)) return this.init$4$bailout(argBodyCapacity, argContactCapacity, argJointCapacity, argListener, 2, i1);
    var i2 = i1;
    for (; $.ltB(i2, $.get$length(this.positions)); i2 = i2 + 1) {
      $.indexSet(this.positions, i2, $.Position$0());
    }
  }
 },
 init$4$bailout: function(argBodyCapacity, argContactCapacity, argJointCapacity, argListener, state, env0) {
  switch (state) {
    case 1:
      i = env0;
      break;
    case 2:
      i1 = env0;
      break;
  }
  switch (state) {
    case 0:
      this.bodyCapacity = argBodyCapacity;
      this.contactCapacity = argContactCapacity;
      this.jointCapacity = argJointCapacity;
      this.bodyCount = 0;
      this.contactCount = 0;
      this.listener = argListener;
      if ($.eqNullB(this.bodies) || $.gtB(this.bodyCapacity, $.get$length(this.bodies))) {
        var t0 = $.List(this.bodyCapacity);
        $.setRuntimeTypeInfo(t0, ({E: 'Body'}));
        this.bodies = t0;
      }
      if ($.eqNullB(this.contacts) || $.gtB(this.contactCapacity, $.get$length(this.contacts))) {
        var t1 = $.List(this.contactCapacity);
        $.setRuntimeTypeInfo(t1, ({E: 'Contact'}));
        this.contacts = t1;
      }
      if ($.eqNullB(this.joints) || $.gtB(this.jointCapacity, $.get$length(this.joints))) {
        var t2 = $.List(this.jointCapacity);
        $.setRuntimeTypeInfo(t2, ({E: 'Joint'}));
        this.joints = t2;
      }
    case 1:
      if (state == 1 || (state == 0 && ($.eqNullB(this.velocities) || $.gtB(this.bodyCapacity, $.get$length(this.velocities))))) {
        switch (state) {
          case 0:
            if ($.eqNullB(this.velocities)) {
              var t3 = $.List(0);
              $.setRuntimeTypeInfo(t3, ({E: 'Velocity'}));
              var old = t3;
            } else {
              old = this.velocities;
            }
            var t4 = $.List(this.bodyCapacity);
            $.setRuntimeTypeInfo(t4, ({E: 'Velocity'}));
            this.velocities = t4;
            $.setRange$3(this.velocities, 0, $.get$length(old), old);
            var i = $.get$length(old);
          case 1:
            state = 0;
            var i0 = i;
            L0: while (true) {
              if (!$.ltB(i0, $.get$length(this.velocities))) break L0;
              $.indexSet(this.velocities, i0, $.Velocity$0());
              i0 = $.add(i0, 1);
            }
        }
      }
    case 2:
      if (state == 2 || (state == 0 && ($.eqNullB(this.positions) || $.gtB(this.bodyCapacity, $.get$length(this.positions))))) {
        switch (state) {
          case 0:
            if ($.eqNullB(this.positions)) {
              var t5 = $.List(0);
              $.setRuntimeTypeInfo(t5, ({E: 'Position'}));
              var old0 = t5;
            } else {
              old0 = this.positions;
            }
            var t6 = $.List(this.bodyCapacity);
            $.setRuntimeTypeInfo(t6, ({E: 'Position'}));
            this.positions = t6;
            $.setRange$3(this.positions, 0, $.get$length(old0), old0);
            var i1 = $.get$length(old0);
          case 2:
            state = 0;
            var i2 = i1;
            L1: while (true) {
              if (!$.ltB(i2, $.get$length(this.positions))) break L1;
              $.indexSet(this.positions, i2, $.Position$0());
              i2 = $.add(i2, 1);
            }
        }
      }
  }
 }
});

Isolate.$defineClass("Position", "Object", ["a=", "x="], {
 Position$0: function() {
  this.x = $.Vector$2(0, 0);
  this.a = 0;
 }
});

Isolate.$defineClass("Velocity", "Object", ["a=", "v?"], {
 Velocity$0: function() {
  this.v = $.Vector$2(0, 0);
  this.a = 0;
 }
});

Isolate.$defineClass("TimeStep", "Object", ["warmStarting!", "positionIterations=", "velocityIterations=", "dtRatio=", "inv_dt=", "dt="], {
});

Isolate.$defineClass("World", "Object", ["stack", "island", "contacts", "toiSolver", "backup", "toiOutput", "toiInput", "wqwrapper", "cB", "cA", "timestep", "axis", "center?", "_contactStacks", "_continuousPhysics", "_warmStarting", "_inverseTimestep", "_pool", "_jointDestructionListener", "_fixtureDestructionListener", "_debugDraw", "_allowSleep", "_gravity", "_jointCount", "_bodyCount", "_jointList", "_bodyList", "_contactManager?", "_flags="], {
 drawJoint$1: function(joint) {
  var bodyA = joint.get$bodyA();
  var bodyB = joint.get$bodyB();
  var xf1 = bodyA.get$originTransform();
  var xf2 = bodyB.get$originTransform();
  var x1 = xf1.get$position();
  var x2 = xf2.get$position();
  var p1 = $.Vector$2(0, 0);
  var p2 = $.Vector$2(0, 0);
  joint.getAnchorA$1(p1);
  joint.getAnchorB$1(p2);
  var color = $.Color3$fromRGB$3(0.5, 0.8, 0.8);
  $0:{
    var t0 = joint.get$type();
    if (3 === t0) {
      this.get$debugDraw().drawSegment$3(p1, p2, color);
      break $0;
    } else {
      if (4 === t0) {
        throw $.captureStackTrace($.NotImplementedException$0());
      } else {
        if (10 === t0 || 5 === t0) {
          break $0;
        } else {
          this.get$debugDraw().drawSegment$3(x1, p1, color);
          this.get$debugDraw().drawSegment$3(p1, p2, color);
          this.get$debugDraw().drawSegment$3(x2, p2, color);
        }
      }
    }
  }
 },
 drawShape$3: function(fixture, xf, color) {
  $0:{
    var t0 = fixture.get$type();
    if (0 === t0) {
      var circle = fixture.get$shape();
      $.mulToOut(xf, circle.get$position(), this.center);
      var radius = circle.get$radius();
      this.axis.setFrom$1(xf.get$rotation().get$col1());
      this._debugDraw.drawSolidCircle$4(this.center, radius, this.axis, color);
      break $0;
    } else {
      if (1 === t0) {
        var poly = fixture.get$shape();
        var vertexCount = poly.get$vertexCount();
        $.assert($.le(vertexCount, 8));
        var vertices = $.List(vertexCount);
        $.setRuntimeTypeInfo(vertices, ({E: 'Vector'}));
        for (var i = 0; $.ltB(i, vertexCount); i = i + 1) {
          var t1 = $.Vector$2(0, 0);
          var t2 = vertices.length;
          if (i < 0 || i >= t2) throw $.ioore(i);
          vertices[i] = t1;
        }
        for (var i0 = 0; $.ltB(i0, vertexCount); i0 = i0 + 1) {
          $.assert(!$.eqNullB($.index(poly.get$vertices(), i0)));
          var t3 = vertices.length;
          if (i0 < 0 || i0 >= t3) throw $.ioore(i0);
          $.assert(!$.eqNullB(vertices[i0]));
          var t4 = $.index(poly.get$vertices(), i0);
          var t5 = vertices.length;
          if (i0 < 0 || i0 >= t5) throw $.ioore(i0);
          $.mulToOut(xf, t4, vertices[i0]);
        }
        this._debugDraw.drawSolidPolygon$3(vertices, vertexCount, color);
      }
    }
  }
 },
 solveTimeOfImpactGivenBody$1: function(body) {
  var bullet = body.get$bullet();
  if (typeof bullet !== 'boolean') return this.solveTimeOfImpactGivenBody$1$bailout(body, 1, bullet);
  var count = (void 0);
  var found = (void 0);
  var iter = 0;
  var toiContact = (void 0);
  var toi = 1.0;
  var toiOther = (void 0);
  do {
    var iter0 = iter;
    var toiContact0 = toiContact;
    var toi0 = toi;
    var toiOther0 = toiOther;
    for (var ce = body.get$contactList(), found0 = false, toiContact1 = toiContact, toi1 = toi, toiOther1 = toiOther, ce0 = ce, count0 = 0; !$.eqNullB(ce0); ce1 = ce0.get$next(), found0 = found1, toiContact1 = toiContact2, toi1 = toi2, toiOther1 = toiOther2, ce0 = ce1, count0 = count1) {
      var toi2 = toi1;
      var toiOther2 = toiOther1;
      var count1 = count0;
      var found1 = found0;
      var toiContact2 = toiContact1;
      if ($.eqB(ce0.get$contact(), toiContact1)) {
        toi2 = toi1;
        toiOther2 = toiOther1;
        count1 = count0;
        found1 = found0;
        toiContact2 = toiContact1;
        continue;
      }
      var other = ce0.get$other();
      var type = other.get$type();
      if (bullet) {
        if ($.eqB($.and(other.get$flags(), 64), 0)) {
          toi2 = toi1;
          toiOther2 = toiOther1;
          count1 = count0;
          found1 = found0;
          toiContact2 = toiContact1;
          continue;
        }
        if (!$.eqB(type, 0) && !$.eqB($.and(ce0.get$contact().get$flags(), 16), 0)) {
          toi2 = toi1;
          toiOther2 = toiOther1;
          count1 = count0;
          found1 = found0;
          toiContact2 = toiContact1;
          continue;
        }
      } else {
        if ($.eqB(type, 2)) {
          toi2 = toi1;
          toiOther2 = toiOther1;
          count1 = count0;
          found1 = found0;
          toiContact2 = toiContact1;
          continue;
        }
      }
      var contact = ce0.get$contact();
      if ($.eqB(contact.get$enabled(), false)) {
        toi2 = toi1;
        toiOther2 = toiOther1;
        count1 = count0;
        found1 = found0;
        toiContact2 = toiContact1;
        continue;
      }
      if ($.gtB(contact.get$toiCount(), 10)) {
        toi2 = toi1;
        toiOther2 = toiOther1;
        count1 = count0;
        found1 = found0;
        toiContact2 = toiContact1;
        continue;
      }
      var fixtureA = contact.get$fixtureA();
      var fixtureB = contact.get$fixtureB();
      if (fixtureA.get$isSensor() === true || fixtureB.get$isSensor() === true) {
        toi2 = toi1;
        toiOther2 = toiOther1;
        count1 = count0;
        found1 = found0;
        toiContact2 = toiContact1;
        continue;
      }
      var bodyA = fixtureA.get$body();
      var bodyB = fixtureB.get$body();
      this.toiInput.get$proxyA().setFromShape$1(fixtureA.get$shape());
      this.toiInput.get$proxyB().setFromShape$1(fixtureB.get$shape());
      this.toiInput.get$sweepA().setFrom$1(bodyA.get$sweep());
      this.toiInput.get$sweepB().setFrom$1(bodyB.get$sweep());
      this.toiInput.set$tMax(toi1);
      this._pool.get$timeOfImpact().timeOfImpact$2(this.toiOutput, this.toiInput);
      toi2 = toi1;
      toiOther2 = toiOther1;
      found1 = found0;
      toiContact2 = toiContact1;
      if ($.eqB(this.toiOutput.get$state(), 3) && $.ltB(this.toiOutput.get$t(), toi1)) {
        toi2 = this.toiOutput.get$t();
        toiOther2 = other;
        found1 = true;
        toiContact2 = contact;
      }
      var count2 = count0 + 1;
      count1 = count2;
    }
    count = count0;
    found = found0;
    iter0 = iter + 1;
    toiContact0 = toiContact1;
    toi0 = toi1;
    toiOther0 = toiOther1;
  } while (iter = iter0, toiContact = toiContact0, toi = toi0, toiOther = toiOther0, found === true && $.gtB(count, 1) && iter0 < 50);
  if ($.eqNullB(toiContact0)) {
    body.advance$1(1.0);
    return;
  }
  this.backup.setFrom$1(body.get$sweep());
  body.advance$1(toi0);
  toiContact0.update$1(this._contactManager.get$contactListener());
  if ($.eqB(toiContact0.get$enabled(), false)) {
    body.get$sweep().setFrom$1(this.backup);
    this.solveTimeOfImpactGivenBody$1(body);
  }
  toiContact0.set$toiCount($.add(toiContact0.get$toiCount(), 1));
  if ($.eqNullB(this.contacts) || $.ltB($.get$length(this.contacts), 32)) {
    var t0 = $.List(32);
    $.setRuntimeTypeInfo(t0, ({E: 'Contact'}));
    this.contacts = t0;
  }
  for (var ce2 = body.get$contactList(), count3 = 0; !$.eqNullB(ce2) && count3 < 32; ce2 = ce2.get$next(), count3 = count4) {
    var count4 = count3;
    if ($.eqB(ce2.get$other().get$type(), 2)) {
      count4 = count3;
      continue;
    }
    var contact0 = ce2.get$contact();
    if ($.eqB(contact0.get$enabled(), false)) {
      count4 = count3;
      continue;
    }
    var fixtureA0 = contact0.get$fixtureA();
    var fixtureB0 = contact0.get$fixtureB();
    if (fixtureA0.get$isSensor() === true || fixtureB0.get$isSensor() === true) {
      count4 = count3;
      continue;
    }
    if (!$.eqB(contact0, toiContact0)) {
      contact0.update$1(this._contactManager.get$contactListener());
    }
    if ($.eqB(contact0.get$enabled(), false)) {
      count4 = count3;
      continue;
    }
    if ($.eqB(contact0.get$touching(), false)) {
      count4 = count3;
      continue;
    }
    $.indexSet(this.contacts, count3, contact0);
    count4 = count3 + 1;
  }
  this.toiSolver.initialize$3(this.contacts, count3, body);
  for (var i = 0; i < 20; i = i + 1) {
    if (this.toiSolver.solve$1(0.75) === true) {
      break;
    }
  }
  if (!$.eqB(toiOther0.get$type(), 0)) {
    toiContact0.set$flags($.or(toiContact0.get$flags(), 16));
  }
  var ce1;
 },
 solveTimeOfImpactGivenBody$1$bailout: function(body, state, env0) {
  switch (state) {
    case 1:
      bullet = env0;
      break;
  }
  switch (state) {
    case 0:
      var bullet = body.get$bullet();
    case 1:
      state = 0;
      var count = (void 0);
      var found = (void 0);
      var iter = 0;
      var toiContact = (void 0);
      var toi = 1.0;
      var toiOther = (void 0);
      L0: while (true) {
        var iter0 = iter;
        var toiContact0 = toiContact;
        var toi0 = toi;
        var toiOther0 = toiOther;
        var ce = body.get$contactList();
        var found0 = false;
        var toiContact1 = toiContact;
        var toi1 = toi;
        var toiOther1 = toiOther;
        var ce0 = ce;
        var count0 = 0;
        L1: while (true) {
          if (!!$.eqNullB(ce0)) break L1;
          c$1:{
            var toi2 = toi1;
            var toiOther2 = toiOther1;
            var count1 = count0;
            var found1 = found0;
            var toiContact2 = toiContact1;
            if ($.eqB(ce0.get$contact(), toiContact1)) {
              toi2 = toi1;
              toiOther2 = toiOther1;
              count1 = count0;
              found1 = found0;
              toiContact2 = toiContact1;
              break c$1;
            }
            var other = ce0.get$other();
            var type = other.get$type();
            if ($.eqB(bullet, true)) {
              if ($.eqB($.and(other.get$flags(), 64), 0)) {
                toi2 = toi1;
                toiOther2 = toiOther1;
                count1 = count0;
                found1 = found0;
                toiContact2 = toiContact1;
                break c$1;
              }
              if (!$.eqB(type, 0) && !$.eqB($.and(ce0.get$contact().get$flags(), 16), 0)) {
                toi2 = toi1;
                toiOther2 = toiOther1;
                count1 = count0;
                found1 = found0;
                toiContact2 = toiContact1;
                break c$1;
              }
            } else {
              if ($.eqB(type, 2)) {
                toi2 = toi1;
                toiOther2 = toiOther1;
                count1 = count0;
                found1 = found0;
                toiContact2 = toiContact1;
                break c$1;
              }
            }
            var contact = ce0.get$contact();
            if ($.eqB(contact.get$enabled(), false)) {
              toi2 = toi1;
              toiOther2 = toiOther1;
              count1 = count0;
              found1 = found0;
              toiContact2 = toiContact1;
              break c$1;
            }
            if ($.gtB(contact.get$toiCount(), 10)) {
              toi2 = toi1;
              toiOther2 = toiOther1;
              count1 = count0;
              found1 = found0;
              toiContact2 = toiContact1;
              break c$1;
            }
            var fixtureA = contact.get$fixtureA();
            var fixtureB = contact.get$fixtureB();
            if (fixtureA.get$isSensor() === true || fixtureB.get$isSensor() === true) {
              toi2 = toi1;
              toiOther2 = toiOther1;
              count1 = count0;
              found1 = found0;
              toiContact2 = toiContact1;
              break c$1;
            }
            var bodyA = fixtureA.get$body();
            var bodyB = fixtureB.get$body();
            this.toiInput.get$proxyA().setFromShape$1(fixtureA.get$shape());
            this.toiInput.get$proxyB().setFromShape$1(fixtureB.get$shape());
            this.toiInput.get$sweepA().setFrom$1(bodyA.get$sweep());
            this.toiInput.get$sweepB().setFrom$1(bodyB.get$sweep());
            this.toiInput.set$tMax(toi1);
            this._pool.get$timeOfImpact().timeOfImpact$2(this.toiOutput, this.toiInput);
            toi2 = toi1;
            toiOther2 = toiOther1;
            found1 = found0;
            toiContact2 = toiContact1;
            if ($.eqB(this.toiOutput.get$state(), 3) && $.ltB(this.toiOutput.get$t(), toi1)) {
              toi2 = this.toiOutput.get$t();
              toiOther2 = other;
              found1 = true;
              toiContact2 = contact;
            }
            var count2 = count0 + 1;
            count1 = count2;
          }
          var ce1 = ce0.get$next();
          found0 = found1;
          toiContact1 = toiContact2;
          toi1 = toi2;
          toiOther1 = toiOther2;
          ce0 = ce1;
          count0 = count1;
        }
        count = count0;
        found = found0;
        iter0 = iter + 1;
        toiContact0 = toiContact1;
        toi0 = toi1;
        toiOther0 = toiOther1;
        iter = iter0;
        toiContact = toiContact0;
        toi = toi0;
        toiOther = toiOther0;
        if (!(found === true && $.gtB(count, 1) && iter0 < 50)) break L0;
      }
      if ($.eqNullB(toiContact0)) {
        body.advance$1(1.0);
        return;
      }
      this.backup.setFrom$1(body.get$sweep());
      body.advance$1(toi0);
      toiContact0.update$1(this._contactManager.get$contactListener());
      if ($.eqB(toiContact0.get$enabled(), false)) {
        body.get$sweep().setFrom$1(this.backup);
        this.solveTimeOfImpactGivenBody$1(body);
      }
      toiContact0.set$toiCount($.add(toiContact0.get$toiCount(), 1));
      if ($.eqNullB(this.contacts) || $.ltB($.get$length(this.contacts), 32)) {
        var t0 = $.List(32);
        $.setRuntimeTypeInfo(t0, ({E: 'Contact'}));
        this.contacts = t0;
      }
      var ce2 = body.get$contactList();
      var count3 = 0;
      L2: while (true) {
        if (!(!$.eqNullB(ce2) && count3 < 32)) break L2;
        c$0:{
          var count4 = count3;
          if ($.eqB(ce2.get$other().get$type(), 2)) {
            count4 = count3;
            break c$0;
          }
          var contact0 = ce2.get$contact();
          if ($.eqB(contact0.get$enabled(), false)) {
            count4 = count3;
            break c$0;
          }
          var fixtureA0 = contact0.get$fixtureA();
          var fixtureB0 = contact0.get$fixtureB();
          if (fixtureA0.get$isSensor() === true || fixtureB0.get$isSensor() === true) {
            count4 = count3;
            break c$0;
          }
          if (!$.eqB(contact0, toiContact0)) {
            contact0.update$1(this._contactManager.get$contactListener());
          }
          if ($.eqB(contact0.get$enabled(), false)) {
            count4 = count3;
            break c$0;
          }
          if ($.eqB(contact0.get$touching(), false)) {
            count4 = count3;
            break c$0;
          }
          $.indexSet(this.contacts, count3, contact0);
          count4 = count3 + 1;
        }
        ce2 = ce2.get$next();
        count3 = count4;
      }
      this.toiSolver.initialize$3(this.contacts, count3, body);
      var i = 0;
      L3: while (true) {
        if (!(i < 20)) break L3;
        if (this.toiSolver.solve$1(0.75) === true) {
          break;
        }
        i = i + 1;
      }
      if (!$.eqB(toiOther0.get$type(), 0)) {
        toiContact0.set$flags($.or(toiContact0.get$flags(), 16));
      }
  }
 },
 solveTimeOfImpact$0: function() {
  for (var c = this._contactManager.get$contactList(); !$.eqNullB(c); c = c.get$next()) {
    c.set$flags($.or(c.get$flags(), 4));
    c.set$toiCount(0);
  }
  for (var body = this._bodyList; !$.eqNullB(body); body = body.get$next()) {
    if ($.eqB($.and(body.get$flags(), 1), 0) || $.eqB(body.get$type(), 1) || $.eqB(body.get$type(), 0)) {
      body.set$flags($.or(body.get$flags(), 64));
    } else {
      body.set$flags($.and(body.get$flags(), -65));
    }
  }
  for (var body0 = this._bodyList; !$.eqNullB(body0); body0 = body0.get$next()) {
    if ($.eqB($.and(body0.get$flags(), 64), 64)) {
      continue;
    }
    if ($.eqB(body0.get$bullet(), true)) {
      continue;
    }
    this.solveTimeOfImpactGivenBody$1(body0);
    body0.set$flags($.or(body0.get$flags(), 64));
  }
  for (var body1 = this._bodyList; !$.eqNullB(body1); body1 = body1.get$next()) {
    if ($.eqB($.and(body1.get$flags(), 64), 64)) {
      continue;
    }
    if ($.eqB(body1.get$bullet(), false)) {
      continue;
    }
    this.solveTimeOfImpactGivenBody$1(body1);
    body1.set$flags($.or(body1.get$flags(), 64));
  }
 },
 solve$1: function(timeStep) {
  this.island.init$4(this._bodyCount, this._contactManager.get$contactCount(), this._jointCount, this._contactManager.get$contactListener());
  for (var b = this._bodyList; !$.eqNullB(b); b = b.get$next()) {
    b.set$flags($.and(b.get$flags(), -2));
  }
  for (var c = this._contactManager.get$contactList(); !$.eqNullB(c); c = c.get$next()) {
    c.set$flags($.and(c.get$flags(), -2));
  }
  for (var j = this.get$jointList(); !$.eqNullB(j); j = j.get$_lib2_next()) {
    j.set$islandFlag(false);
  }
  var stackSize = this._bodyCount;
  if ($.ltB($.get$length(this.stack), stackSize)) {
    var t0 = $.List(stackSize);
    $.setRuntimeTypeInfo(t0, ({E: 'Body'}));
    this.stack = t0;
  }
  for (var seed = this._bodyList; !$.eqNullB(seed); seed = seed.get$next()) {
    if ($.eqB($.and(seed.get$flags(), 1), 1)) {
      continue;
    }
    if ($.eqB(seed.get$awake(), false) || $.eqB(seed.get$active(), false)) {
      continue;
    }
    if ($.eqB(seed.get$type(), 0)) {
      continue;
    }
    $.clear(this.island);
    $.indexSet(this.stack, 0, seed);
    seed.set$flags($.or(seed.get$flags(), 1));
    for (var stackCount = 1; stackCount > 0; stackCount = stackCount0) {
      var stackCount0 = stackCount;
      var t1 = this.stack;
      var stackCount1 = stackCount - 1;
      var b0 = $.index(t1, stackCount1);
      $.assert(b0.get$active());
      this.island.addBody$1(b0);
      b0.set$awake(true);
      if ($.eqB(b0.get$type(), 0)) {
        stackCount0 = stackCount1;
        continue;
      }
      for (var ce = b0.get$contactList(), ce0 = ce, stackCount2 = stackCount1; !$.eqNullB(ce0); ce1 = ce0.get$next(), ce0 = ce1, stackCount2 = stackCount3) {
        var stackCount3 = stackCount2;
        var contact = ce0.get$contact();
        if ($.eqB($.and(contact.get$flags(), 1), 1)) {
          stackCount3 = stackCount2;
          continue;
        }
        if ($.eqB(contact.get$enabled(), false) || $.eqB(contact.get$touching(), false)) {
          stackCount3 = stackCount2;
          continue;
        }
        var sensorA = contact.get$fixtureA().get$isSensor();
        var sensorB = contact.get$fixtureB().get$isSensor();
        if (sensorA === true || sensorB === true) {
          stackCount3 = stackCount2;
          continue;
        }
        this.island.addContact$1(contact);
        contact.set$flags($.or(contact.get$flags(), 1));
        var other = ce0.get$other();
        if ($.eqB($.and(other.get$flags(), 1), 1)) {
          stackCount3 = stackCount2;
          continue;
        }
        $.assert($.lt(stackCount2, stackSize));
        var t2 = this.stack;
        var stackCount4 = stackCount2 + 1;
        $.indexSet(t2, stackCount2, other);
        other.set$flags($.or(other.get$flags(), 1));
        stackCount3 = stackCount4;
      }
      for (var stackCount5 = stackCount2, je = b0.get$jointList(); !$.eqNullB(je); stackCount5 = stackCount6, je = je.get$next()) {
        var stackCount6 = stackCount5;
        if ($.eqB(je.get$joint().get$islandFlag(), true)) {
          stackCount6 = stackCount5;
          continue;
        }
        var other0 = je.get$other();
        if ($.eqB(other0.get$active(), false)) {
          stackCount6 = stackCount5;
          continue;
        }
        this.island.addJoint$1(je.get$joint());
        je.get$joint().set$islandFlag(true);
        if ($.eqB($.and(other0.get$flags(), 1), 1)) {
          stackCount6 = stackCount5;
          continue;
        }
        $.assert($.lt(stackCount5, stackSize));
        var t3 = this.stack;
        var stackCount7 = stackCount5 + 1;
        $.indexSet(t3, stackCount5, other0);
        other0.set$flags($.or(other0.get$flags(), 1));
        stackCount6 = stackCount7;
      }
      stackCount0 = stackCount5;
    }
    this.island.solve$3(timeStep, this._gravity, this._allowSleep);
    for (var i = 0; $.ltB(i, this.island.get$bodyCount()); i = i + 1) {
      var b1 = $.index(this.island.get$bodies(), i);
      if ($.eqB(b1.get$type(), 0)) {
        b1.set$flags($.and(b1.get$flags(), -2));
      }
    }
  }
  for (var b2 = this._bodyList; !$.eqNullB(b2); b2 = b2.get$next()) {
    if ($.eqB($.and(b2.get$flags(), 1), 0)) {
      continue;
    }
    if ($.eqB(b2.get$type(), 0)) {
      continue;
    }
    b2.synchronizeFixtures$0();
  }
  this._contactManager.findNewContacts$0();
  var ce1;
 },
 get$jointList: function() {
  return this._jointList;
 },
 get$locked: function() {
  return $.eq($.and(this._flags, 2), 2);
 },
 get$contactCount: function() {
  return this._contactManager.get$contactCount();
 },
 get$contactList: function() {
  return this._contactManager.get$contactList();
 },
 drawDebugData$0: function() {
  if ($.eqNullB(this._debugDraw)) {
    return;
  }
  var drawFlags = this._debugDraw.get$drawFlags();
  if ($.eqB($.and(drawFlags, 1), 1)) {
    var xf = $.Transform$0();
    var color = $.Color3$0();
    for (var b = this._bodyList; !$.eqNullB(b); b = b.get$next()) {
      xf.setFrom$1(b.get$originTransform());
      for (var f = b.get$fixtureList(); !$.eqNullB(f); f = f.get$next()) {
        if ($.eqB(b.get$active(), false)) {
          color.setFromRGB$3(0.5, 0.5, 0.3);
          this.drawShape$3(f, xf, color);
        } else {
          if ($.eqB(b.get$type(), 0)) {
            color.setFromRGB$3(0.5, 0.9, 0.3);
            this.drawShape$3(f, xf, color);
          } else {
            if ($.eqB(b.get$type(), 1)) {
              color.setFromRGB$3(0.5, 0.5, 0.9);
              this.drawShape$3(f, xf, color);
            } else {
              if ($.eqB(b.get$awake(), false)) {
                color.setFromRGB$3(0.9, 0.9, 0.9);
                this.drawShape$3(f, xf, color);
              } else {
                color.setFromRGB$3(0.9, 0.7, 0.7);
                this.drawShape$3(f, xf, color);
              }
            }
          }
        }
      }
    }
  }
  if ($.eqB($.and(drawFlags, 2), 2)) {
    for (var j = this._jointList; !$.eqNullB(j); j = j.get$_lib2_next()) {
      this.drawJoint$1(j);
    }
  }
  if ($.eqB($.and(drawFlags, 8), 8)) {
    var color0 = $.Color3$fromRGB$3(0.3, 0.9, 0.9);
    for (var c = this._contactManager.get$contactList(); !$.eqNullB(c); c = c.get$next()) {
      var fixtureA = c.get$fixtureA();
      var fixtureB = c.get$fixtureB();
      this.cA.setFrom$1(fixtureA.get$box().get$center());
      this.cB.setFrom$1(fixtureB.get$box().get$center());
      this._debugDraw.drawSegment$3(this.cA, this.cB, color0);
    }
  }
  if ($.eqB($.and(drawFlags, 4), 4)) {
    var color1 = $.Color3$fromRGB$3(0.9, 0.3, 0.9);
    for (var b0 = this._bodyList; !$.eqNullB(b0); b0 = b0.get$next()) {
      if ($.eqB(b0.get$active(), false)) {
        continue;
      }
      for (var f0 = b0.get$fixtureList(); !$.eqNullB(f0); f0 = f0.get$next()) {
        var aabb = f0.get$proxy().get$box();
        var vs = $.List(4);
        $.setRuntimeTypeInfo(vs, ({E: 'Vector'}));
        for (var i = 0; i < vs.length; i = i + 1) {
          var t0 = $.Vector$2(0, 0);
          var t1 = vs.length;
          if (i < 0 || i >= t1) throw $.ioore(i);
          vs[i] = t0;
        }
        var t2 = vs.length;
        if (0 >= t2) throw $.ioore(0);
        vs[0].setCoords$2(aabb.get$lowerBound().get$x(), aabb.get$lowerBound().get$y());
        var t3 = vs.length;
        if (1 >= t3) throw $.ioore(1);
        vs[1].setCoords$2(aabb.get$upperBound().get$x(), aabb.get$lowerBound().get$y());
        var t4 = vs.length;
        if (2 >= t4) throw $.ioore(2);
        vs[2].setCoords$2(aabb.get$upperBound().get$x(), aabb.get$upperBound().get$y());
        var t5 = vs.length;
        if (3 >= t5) throw $.ioore(3);
        vs[3].setCoords$2(aabb.get$lowerBound().get$x(), aabb.get$upperBound().get$y());
        this._debugDraw.drawPolygon$3(vs, 4, color1);
      }
    }
  }
  if ($.eqB($.and(drawFlags, 16), 16)) {
    var xf0 = $.Transform$0();
    for (var b1 = this._bodyList; !$.eqNullB(b1); b1 = b1.get$next()) {
      xf0.setFrom$1(b1.get$originTransform());
      xf0.position.setFrom$1(b1.get$worldCenter());
      this._debugDraw.drawTransform$1(xf0);
    }
  }
 },
 clearForces$0: function() {
  for (var body = this._bodyList; !$.eqNullB(body); body = body.get$next()) {
    body.get$_force().setZero$0();
    body.set$_torque(0.0);
  }
 },
 step$3: function(dt, velocityIterations, positionIterations) {
  if ($.eqB($.and(this._flags, 1), 1)) {
    this._contactManager.findNewContacts$0();
    this._flags = $.and(this._flags, -2);
  }
  this._flags = $.or(this._flags, 2);
  this.timestep.set$dt(dt);
  this.timestep.set$velocityIterations(velocityIterations);
  this.timestep.set$positionIterations(positionIterations);
  if ($.gtB(dt, 0.0)) {
    var t0 = $.div(1.0, dt);
    this.timestep.set$inv_dt(t0);
  } else {
    this.timestep.set$inv_dt(0.0);
  }
  var t1 = $.mul(this._inverseTimestep, dt);
  this.timestep.set$dtRatio(t1);
  var t2 = this._warmStarting;
  this.timestep.set$warmStarting(t2);
  this._contactManager.collide$0();
  if ($.gtB(this.timestep.get$dt(), 0.0)) {
    this.solve$1(this.timestep);
  }
  if (this._continuousPhysics === true && $.gtB(this.timestep.get$dt(), 0.0)) {
    this.solveTimeOfImpact$0();
  }
  if ($.gtB(this.timestep.get$dt(), 0.0)) {
    this._inverseTimestep = this.timestep.get$inv_dt();
  }
  if ($.eqB($.and(this._flags, 4), 4)) {
    this.clearForces$0();
  }
  this._flags = $.and(this._flags, -3);
 },
 createBody$1: function(def) {
  $.assert($.eq(this.get$locked(), false));
  if (this.get$locked() === true) {
    return;
  }
  var b = $.Body$2(def, this);
  b.prev = (void 0);
  b.next = this._bodyList;
  if (!$.eqNullB(this._bodyList)) {
    this._bodyList.set$prev(b);
  }
  this._bodyList = b;
  this._bodyCount = $.add(this._bodyCount, 1);
  return b;
 },
 set$debugDraw: function(debugDraw) {
  this._debugDraw = debugDraw;
 },
 get$contactListener: function() {
  return this._contactManager.get$contactListener();
 },
 pushContact$1: function(contact) {
  if ($.gtB(contact.get$manifold().get$pointCount(), 0)) {
    contact.get$fixtureA().get$body().set$awake(true);
    contact.get$fixtureB().get$body().set$awake(true);
  }
  var type1 = contact.get$fixtureA().get$type();
  var type2 = contact.get$fixtureB().get$type();
  $.index($.index(this._contactStacks, type1), type2).get$creator().addFirst$1(contact);
 },
 _getFreshContactStack$2: function(type1, type2) {
  if ($.eqB(type1, 0) && $.eqB(type2, 0)) {
    return this._pool.getCircleContactStack$0();
  } else {
    if ($.eqB(type1, 1) && $.eqB(type2, 1)) {
      return this._pool.getPolyContactStack$0();
    } else {
      return this._pool.getPolyCircleContactStack$0();
    }
  }
 },
 popContact$2: function(fixtureA, fixtureB) {
  var type1 = fixtureA.get$type();
  var type2 = fixtureB.get$type();
  var reg = $.index($.index(this._contactStacks, type1), type2);
  var creator = reg.get$creator();
  if (!$.eqNullB(creator)) {
    var creator0 = creator;
    if ($.isEmpty(creator) === true) {
      creator0 = this._getFreshContactStack$2(type1, type2);
    }
    if (reg.get$primary() === true) {
      var c = creator0.removeFirst$0();
      c.init$2(fixtureA, fixtureB);
      return c;
    } else {
      var c0 = creator0.removeFirst$0();
      c0.init$2(fixtureB, fixtureA);
      return c0;
    }
  } else {
    return;
  }
 },
 _initializeRegisters$0: function() {
  this._addType$3(this._pool.getCircleContactStack$0(), 0, 0);
  this._addType$3(this._pool.getPolyCircleContactStack$0(), 1, 0);
  this._addType$3(this._pool.getPolyContactStack$0(), 1, 1);
 },
 _addType$3: function(creatorStack, type1, type2) {
  var register = $.ContactRegister$0();
  register.creator = creatorStack;
  register.primary = true;
  $.indexSet($.index(this._contactStacks, type1), type2, register);
  if (!$.eqB(type1, type2)) {
    var register2 = $.ContactRegister$0();
    register2.creator = creatorStack;
    register2.primary = false;
    $.indexSet($.index(this._contactStacks, type2), type1, register2);
  }
 },
 World$3: function(gravity, doSleep, argPool) {
  this._contactManager = $.ContactManager$1(this);
  for (var i = 0; $.ltB(i, $.get$length(this._contactStacks)); i = i + 1) {
    var t0 = this._contactStacks;
    var t1 = $.List(2);
    $.setRuntimeTypeInfo(t1, ({E: 'ContactRegister'}));
    $.indexSet(t0, i, t1);
  }
  this._initializeRegisters$0();
 }
});

Isolate.$defineClass("WorldQueryWrapper", "Object", ["callback", "broadPhase?"], {
 treeCallback$1: function(node) {
  var fixture = node.get$userData();
  return this.callback.reportFixture$1(fixture);
 }
});

Isolate.$defineClass("Contact", "Object", ["toiCount=", "manifold=", "fixtureB?", "fixtureA?", "edge2?", "edge1?", "next=", "prev=", "flags="], {
 update$1: function(listener) {
  this._oldManifold.setFrom$1(this.manifold);
  this.flags = $.or(this.flags, 4);
  var wasTouching = $.eq($.and(this.flags, 2), 2);
  var sensorA = this.fixtureA.get$isSensor();
  var sensorB = this.fixtureB.get$isSensor();
  var sensor = sensorA === true || sensorB === true;
  var bodyA = this.fixtureA.get$body();
  var bodyB = this.fixtureB.get$body();
  var xfA = bodyA.get$originTransform();
  var xfB = bodyB.get$originTransform();
  if (sensor) {
    var shapeA = this.fixtureA.get$shape();
    var shapeB = this.fixtureB.get$shape();
    var touching = this.pool.get$collision().testOverlap$4(shapeA, shapeB, xfA, xfB);
    this.manifold.set$pointCount(0);
    var touching0 = touching;
  } else {
    this.evaluate$3(this.manifold, xfA, xfB);
    var touching1 = $.gt(this.manifold.get$pointCount(), 0);
    for (var i = 0; $.ltB(i, this.manifold.get$pointCount()); i = i + 1) {
      var mp2 = $.index(this.manifold.get$points(), i);
      mp2.set$normalImpulse(0.0);
      mp2.set$tangentImpulse(0.0);
      var id2 = mp2.get$id();
      for (var j = 0; $.ltB(j, this._oldManifold.get$pointCount()); j = j + 1) {
        var mp1 = $.index(this._oldManifold.get$points(), j);
        if (mp1.get$id().isEqual$1(id2) === true) {
          mp2.set$normalImpulse(mp1.get$normalImpulse());
          mp2.set$tangentImpulse(mp1.get$tangentImpulse());
          break;
        }
      }
    }
    if (!$.eqB(touching1, wasTouching)) {
      bodyA.set$awake(true);
      bodyB.set$awake(true);
    }
    touching0 = touching1;
  }
  var t0 = touching0 === true;
  if (t0) {
    this.flags = $.or(this.flags, 2);
  } else {
    this.flags = $.and(this.flags, -3);
  }
  if ($.eqNullB(listener)) {
    return;
  }
  if ($.eqB(wasTouching, false) && $.eqB(touching0, true)) {
    listener.beginContact$1(this);
  }
  if ($.eqB(wasTouching, true) && $.eqB(touching0, false)) {
    listener.endContact$1(this);
  }
  var t1 = !sensor;
  var t2 = t1;
  if (t1) {
    t2 = t0;
  }
  if (t2) {
    listener.preSolve$2(this, this._oldManifold);
  }
 },
 flagForFiltering$0: function() {
  this.flags = $.or(this.flags, 8);
 },
 get$enabled: function() {
  return $.eq($.and(this.flags, 4), 4);
 },
 get$touching: function() {
  return $.eq($.and(this.flags, 2), 2);
 },
 init$2: function(fixA, fixB) {
  this.flags = 0;
  this.fixtureA = fixA;
  this.fixtureB = fixB;
  this.manifold.set$pointCount(0);
  this.prev = (void 0);
  this.next = (void 0);
  this.edge1.set$contact((void 0));
  this.edge1.set$prev((void 0));
  this.edge1.set$next((void 0));
  this.edge1.set$other((void 0));
  this.edge2.set$contact((void 0));
  this.edge2.set$prev((void 0));
  this.edge2.set$next((void 0));
  this.edge2.set$other((void 0));
  this.toiCount = 0;
 },
 next$0: function() { return this.next.$call$0(); }
});

Isolate.$defineClass("ContactConstraint", "Object", ["manifold=", "pointCount=", "restitution=", "friction=", "radius=", "type=", "bodyB=", "bodyA=", "K?", "normalMass?", "normal?", "localPoint?", "localNormal?", "points?"], {
 toString$0: function() {
  return 'localNormal: "' + $.stringToString(this.localNormal) + '", localPoint: "' + $.stringToString(this.localPoint) + '" ' + ('normal: "' + $.stringToString(this.normal) + '", radius: "' + $.stringToString(this.radius) + '" friction: "' + $.stringToString(this.friction) + '" ') + ('restitution: "' + $.stringToString(this.restitution) + '", pointCount: "' + $.stringToString(this.pointCount) + '"');
 },
 setFrom$1: function(cp) {
  this.pointCount = cp.get$pointCount();
  this.localNormal.setFrom$1(cp.get$localNormal());
  this.localPoint.setFrom$1(cp.get$localPoint());
  this.normal.setFrom$1(cp.get$normal());
  this.normalMass.setFrom$1(cp.get$normalMass());
  this.K.setFrom$1(cp.get$K());
  this.bodyA = cp.get$bodyA();
  this.bodyB = cp.get$bodyB();
  this.type = cp.get$type();
  this.radius = cp.get$radius();
  this.friction = cp.get$friction();
  this.restitution = cp.get$restitution();
  this.manifold = cp.get$manifold();
  for (var i = 0; $.ltB(i, cp.get$pointCount()); i = i + 1) {
    $.index(this.points, i).setFrom$1($.index(cp.get$points(), i));
  }
 },
 ContactConstraint$0: function() {
  for (var i = 0; i < 2; i = i + 1) {
    $.indexSet(this.points, i, $.ContactConstraintPoint$0());
  }
 }
});

Isolate.$defineClass("ContactConstraintPoint", "Object", ["velocityBias=", "tangentMass=", "normalMass=", "tangentImpulse=", "normalImpulse=", "rB?", "rA?", "localPoint?"], {
 toString$0: function() {
  return $.add($.add($.add($.add($.add($.add($.add($.add('normal impulse: ', this.normalImpulse) + ', tangentImpulse: ', this.tangentImpulse) + ', normalMass: ', this.normalMass) + ', tangentMass: ', this.tangentMass) + ', velocityBias: ', this.velocityBias) + ', localPoint ', this.localPoint) + ', rA: ', this.rA) + ', rB: ', this.rB);
 },
 setFrom$1: function(cp) {
  this.localPoint.setFrom$1(cp.get$localPoint());
  this.rA.setFrom$1(cp.get$rA());
  this.rB.setFrom$1(cp.get$rB());
  this.normalImpulse = cp.get$normalImpulse();
  this.tangentImpulse = cp.get$tangentImpulse();
  this.normalMass = cp.get$normalMass();
  this.tangentMass = cp.get$tangentMass();
  this.velocityBias = cp.get$velocityBias();
 }
});

Isolate.$defineClass("ContactEdge", "Object", ["next=", "prev=", "contact=", "other="], {
 next$0: function() { return this.next.$call$0(); }
});

Isolate.$defineClass("CircleContact", "Contact", ["_oldManifold", "pool", "toiCount", "manifold", "fixtureB", "fixtureA", "edge2", "edge1", "next", "prev", "flags"], {
 evaluate$3: function(argManifold, xfA, xfB) {
  this.pool.get$collision().collideCircles$5(argManifold, this.fixtureA.get$shape(), xfA, this.fixtureB.get$shape(), xfB);
 },
 init$2: function(fA, fB) {
  $.equals(0, fA.get$type(), (void 0));
  $.equals(0, fB.get$type(), (void 0));
  $.Contact.prototype.init$2.call(this, fA, fB);
 }
});

Isolate.$defineClass("ContactRegister", "Object", ["primary?", "creator?"], {
});

Isolate.$defineClass("ContactSolver", "Object", ["rB?", "rA?", "psolver", "P2", "P1", "d", "x?", "dv2", "dv1", "dv", "P", "temp2", "temp1", "tangent", "worldManifold", "constraintCount", "constraints?"], {
 solvePositionConstraints$1: function(baumgarte) {
  if (typeof baumgarte !== 'number') return this.solvePositionConstraints$1$bailout(baumgarte,  0);
  for (var minSeparation = 0.0, i = 0; $.ltB(i, this.constraintCount); minSeparation = minSeparation0, i = i + 1) {
    var minSeparation0 = minSeparation;
    var c = $.index(this.constraints, i);
    var bodyA = c.get$bodyA();
    var bodyB = c.get$bodyB();
    var invMassA = $.mul(bodyA.get$mass(), bodyA.get$invMass());
    if (typeof invMassA !== 'number') return this.solvePositionConstraints$1$bailout(baumgarte, 2, baumgarte, c, bodyA, bodyB, i, minSeparation, invMassA);
    var invIA = $.mul(bodyA.get$mass(), bodyA.get$invInertia());
    if (typeof invIA !== 'number') return this.solvePositionConstraints$1$bailout(baumgarte, 3, baumgarte, invMassA, c, bodyA, bodyB, i, minSeparation, invIA);
    var invMassB = $.mul(bodyB.get$mass(), bodyB.get$invMass());
    if (typeof invMassB !== 'number') return this.solvePositionConstraints$1$bailout(baumgarte, 4, baumgarte, invMassA, invIA, bodyA, i, bodyB, minSeparation, c, invMassB);
    var invIB = $.mul(bodyB.get$mass(), bodyB.get$invInertia());
    if (typeof invIB !== 'number') return this.solvePositionConstraints$1$bailout(baumgarte, 5, baumgarte, invMassA, invIA, bodyA, i, bodyB, invMassB, c, minSeparation, invIB);
    var t0 = invMassA + invMassB;
    for (var j = 0, minSeparation1 = minSeparation; $.ltB(j, c.get$pointCount()); j = j + 1, minSeparation1 = minSeparation2) {
      var minSeparation2 = minSeparation1;
      var psm = this.psolver;
      psm.initialize$2(c, j);
      var normal = psm.get$normal();
      var point = psm.get$point();
      var separation = psm.get$separation();
      this.rA.setFrom$1(point).subLocal$1(bodyA.get$sweep().get$center());
      this.rB.setFrom$1(point).subLocal$1(bodyB.get$sweep().get$center());
      var minSeparation3 = $.min(minSeparation1, separation);
      var C = $.clamp($.mul(baumgarte, $.add(separation, 0.005)), -0.2, 0.0);
      var rnA = $.crossVectors(this.rA, normal);
      var rnB = $.crossVectors(this.rB, normal);
      var K = t0 + $.mul($.mul(invIA, rnA), rnA) + $.mul($.mul(invIB, rnB), rnB);
      if (K > 0.0) {
        var impulse = $.div($.neg(C), K);
      } else {
        impulse = 0.0;
      }
      this.P.setFrom$1(normal).mulLocal$1(impulse);
      this.temp1.setFrom$1(this.P).mulLocal$1(invMassA);
      bodyA.get$sweep().get$center().subLocal$1(this.temp1);
      var t1 = bodyA.get$sweep();
      t1.set$angle($.sub(t1.get$angle(), $.mul(invIA, $.crossVectors(this.rA, this.P))));
      bodyA.synchronizeTransform$0();
      this.temp1.setFrom$1(this.P).mulLocal$1(invMassB);
      bodyB.get$sweep().get$center().addLocal$1(this.temp1);
      var t2 = bodyB.get$sweep();
      t2.set$angle($.add(t2.get$angle(), $.mul(invIB, $.crossVectors(this.rB, this.P))));
      bodyB.synchronizeTransform$0();
      minSeparation2 = minSeparation3;
    }
    minSeparation0 = minSeparation1;
  }
  return $.ge(minSeparation, -0.0075);
 },
 solvePositionConstraints$1$bailout: function(baumgarte, state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      c = env1;
      bodyA = env2;
      bodyB = env3;
      i = env4;
      minSeparation = env5;
      invMassA = env6;
      break;
    case 3:
      t0 = env0;
      invMassA = env1;
      c = env2;
      bodyA = env3;
      bodyB = env4;
      i = env5;
      minSeparation = env6;
      invIA = env7;
      break;
    case 4:
      t0 = env0;
      invMassA = env1;
      invIA = env2;
      bodyA = env3;
      i = env4;
      bodyB = env5;
      minSeparation = env6;
      c = env7;
      invMassB = env8;
      break;
    case 5:
      t0 = env0;
      invMassA = env1;
      invIA = env2;
      bodyA = env3;
      i = env4;
      bodyB = env5;
      invMassB = env6;
      c = env7;
      minSeparation = env8;
      invIB = env9;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var minSeparation = 0.0;
      var i = 0;
    case 2:
    case 3:
    case 4:
    case 5:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, this.constraintCount)) break L0;
            var minSeparation0 = minSeparation;
            var c = $.index(this.constraints, i);
            var bodyA = c.get$bodyA();
            var bodyB = c.get$bodyB();
            var invMassA = $.mul(bodyA.get$mass(), bodyA.get$invMass());
          case 2:
            state = 0;
            var invIA = $.mul(bodyA.get$mass(), bodyA.get$invInertia());
          case 3:
            state = 0;
            var invMassB = $.mul(bodyB.get$mass(), bodyB.get$invMass());
          case 4:
            state = 0;
            var invIB = $.mul(bodyB.get$mass(), bodyB.get$invInertia());
          case 5:
            state = 0;
            var j = 0;
            var minSeparation1 = minSeparation;
            L1: while (true) {
              if (!$.ltB(j, c.get$pointCount())) break L1;
              var minSeparation2 = minSeparation1;
              var psm = this.psolver;
              psm.initialize$2(c, j);
              var normal = psm.get$normal();
              var point = psm.get$point();
              var separation = psm.get$separation();
              this.rA.setFrom$1(point).subLocal$1(bodyA.get$sweep().get$center());
              this.rB.setFrom$1(point).subLocal$1(bodyB.get$sweep().get$center());
              var minSeparation3 = $.min(minSeparation1, separation);
              var C = $.clamp($.mul(baumgarte, $.add(separation, 0.005)), -0.2, 0.0);
              var rnA = $.crossVectors(this.rA, normal);
              var rnB = $.crossVectors(this.rB, normal);
              var K = $.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rnA), rnA)), $.mul($.mul(invIB, rnB), rnB));
              if ($.gtB(K, 0.0)) {
                var impulse = $.div($.neg(C), K);
              } else {
                impulse = 0.0;
              }
              this.P.setFrom$1(normal).mulLocal$1(impulse);
              this.temp1.setFrom$1(this.P).mulLocal$1(invMassA);
              bodyA.get$sweep().get$center().subLocal$1(this.temp1);
              var t1 = bodyA.get$sweep();
              t1.set$angle($.sub(t1.get$angle(), $.mul(invIA, $.crossVectors(this.rA, this.P))));
              bodyA.synchronizeTransform$0();
              this.temp1.setFrom$1(this.P).mulLocal$1(invMassB);
              bodyB.get$sweep().get$center().addLocal$1(this.temp1);
              var t2 = bodyB.get$sweep();
              t2.set$angle($.add(t2.get$angle(), $.mul(invIB, $.crossVectors(this.rB, this.P))));
              bodyB.synchronizeTransform$0();
              minSeparation2 = minSeparation3;
              j = j + 1;
              minSeparation1 = minSeparation2;
            }
            minSeparation0 = minSeparation1;
            minSeparation = minSeparation0;
            i = i + 1;
        }
      }
      return $.ge(minSeparation, -0.0075);
  }
 },
 storeImpulses$0: function() {
  for (var i = 0; $.ltB(i, this.constraintCount); i = i + 1) {
    var c = $.index(this.constraints, i);
    var m = c.get$manifold();
    for (var j = 0; $.ltB(j, c.get$pointCount()); j = j + 1) {
      var t0 = $.index(c.get$points(), j).get$normalImpulse();
      $.index(m.get$points(), j).set$normalImpulse(t0);
      var t1 = $.index(c.get$points(), j).get$tangentImpulse();
      $.index(m.get$points(), j).set$tangentImpulse(t1);
    }
  }
 },
 solveVelocityConstraints$0: function() {
  for (var i = 0; $.ltB(i, this.constraintCount); i = i + 1) {
    var c = $.index(this.constraints, i);
    var bodyA = c.get$bodyA();
    var bodyB = c.get$bodyB();
    var wA = bodyA.get$angularVelocity();
    if (typeof wA !== 'number') return this.solveVelocityConstraints$0$bailout(1, c, bodyA, bodyB, i, wA);
    var wB = bodyB.get$angularVelocity();
    if (typeof wB !== 'number') return this.solveVelocityConstraints$0$bailout(2, c, bodyA, bodyB, i, wA, wB);
    var vA = bodyA.get$linearVelocity();
    var vB = bodyB.get$linearVelocity();
    var invMassA = bodyA.get$invMass();
    if (typeof invMassA !== 'number') return this.solveVelocityConstraints$0$bailout(3, c, bodyA, bodyB, i, wA, wB, vB, vA, invMassA);
    var invIA = bodyA.get$invInertia();
    if (typeof invIA !== 'number') return this.solveVelocityConstraints$0$bailout(4, c, bodyA, bodyB, i, wA, wB, vB, vA, invMassA, invIA);
    var invMassB = bodyB.get$invMass();
    if (typeof invMassB !== 'number') return this.solveVelocityConstraints$0$bailout(5, c, bodyA, bodyB, i, wA, wB, vB, vA, invIA, invMassA, invMassB);
    var invIB = bodyB.get$invInertia();
    if (typeof invIB !== 'number') return this.solveVelocityConstraints$0$bailout(6, i, c, bodyA, bodyB, wA, wB, vB, vA, invIA, invMassA, invMassB, invIB);
    var t0 = $.mul(1.0, c.get$normal().get$y());
    this.tangent.set$x(t0);
    var t1 = $.mul(-1.0, c.get$normal().get$x());
    this.tangent.set$y(t1);
    var friction = c.get$friction();
    if (typeof friction !== 'number') return this.solveVelocityConstraints$0$bailout(7, i, c, bodyA, bodyB, wA, wB, vB, vA, invIA, invMassA, invIB, invMassB, friction);
    $.assert($.eqB(c.get$pointCount(), 1) || $.eqB(c.get$pointCount(), 2));
    for (var wB0 = wB, j = 0, wA0 = wA; $.ltB(j, c.get$pointCount()); wB0 = wB1, j = j0, wA0 = wA1) {
      var wA1 = wA0;
      var wB1 = wB0;
      var ccp = $.index(c.get$points(), j);
      var a = ccp.get$rA();
      var t2 = $.sub($.add($.mul(-wB0, ccp.get$rB().get$y()), vB.get$x()), vA.get$x()) + $.mul(wA0, a.get$y());
      this.dv.set$x(t2);
      var t3 = $.sub($.add($.mul(wB0, ccp.get$rB().get$x()), vB.get$y()), vA.get$y()) - $.mul(wA0, a.get$x());
      this.dv.set$y(t3);
      var vt = $.add($.mul(this.dv.get$x(), this.tangent.get$x()), $.mul(this.dv.get$y(), this.tangent.get$y()));
      var lambda = $.mul(ccp.get$tangentMass(), $.neg(vt));
      var maxFriction = $.mul(friction, ccp.get$normalImpulse());
      var newImpulse = $.clamp($.add(ccp.get$tangentImpulse(), lambda), -maxFriction, maxFriction);
      var lambda0 = $.sub(newImpulse, ccp.get$tangentImpulse());
      var Px = $.mul(this.tangent.get$x(), lambda0);
      var Py = $.mul(this.tangent.get$y(), lambda0);
      vA.set$x($.sub(vA.get$x(), $.mul(Px, invMassA)));
      vA.set$y($.sub(vA.get$y(), $.mul(Py, invMassA)));
      var wA2 = wA0 - $.mul(invIA, $.sub($.mul(ccp.get$rA().get$x(), Py), $.mul(ccp.get$rA().get$y(), Px)));
      vB.set$x($.add(vB.get$x(), $.mul(Px, invMassB)));
      vB.set$y($.add(vB.get$y(), $.mul(Py, invMassB)));
      var wB2 = wB0 + $.mul(invIB, $.sub($.mul(ccp.get$rB().get$x(), Py), $.mul(ccp.get$rB().get$y(), Px)));
      ccp.set$tangentImpulse(newImpulse);
      wA1 = wA2;
      wB1 = wB2;
      var j0 = j + 1;
    }
    if ($.eqB(c.get$pointCount(), 1)) {
      var ccp0 = $.index(c.get$points(), 0);
      var a1 = ccp0.get$rA();
      var t4 = $.sub($.add($.mul(-wB0, ccp0.get$rB().get$y()), vB.get$x()), vA.get$x()) + $.mul(wA0, a1.get$y());
      this.dv.set$x(t4);
      var t5 = $.sub($.add($.mul(wB0, ccp0.get$rB().get$x()), vB.get$y()), vA.get$y()) - $.mul(wA0, a1.get$x());
      this.dv.set$y(t5);
      var b = c.get$normal();
      var vn = $.add($.mul(this.dv.get$x(), b.get$x()), $.mul(this.dv.get$y(), b.get$y()));
      var lambda1 = $.mul($.neg(ccp0.get$normalMass()), $.sub(vn, ccp0.get$velocityBias()));
      var a0 = $.add(ccp0.get$normalImpulse(), lambda1);
      if ($.gtB(a0, 0.0)) {
        var newImpulse0 = a0;
      } else {
        newImpulse0 = 0.0;
      }
      var lambda2 = $.sub(newImpulse0, ccp0.get$normalImpulse());
      var Px0 = $.mul(c.get$normal().get$x(), lambda2);
      var Py0 = $.mul(c.get$normal().get$y(), lambda2);
      vA.set$x($.sub(vA.get$x(), $.mul(Px0, invMassA)));
      vA.set$y($.sub(vA.get$y(), $.mul(Py0, invMassA)));
      var wA3 = wA0 - $.mul(invIA, $.sub($.mul(ccp0.get$rA().get$x(), Py0), $.mul(ccp0.get$rA().get$y(), Px0)));
      vB.set$x($.add(vB.get$x(), $.mul(Px0, invMassB)));
      vB.set$y($.add(vB.get$y(), $.mul(Py0, invMassB)));
      var wB3 = wB0 + $.mul(invIB, $.sub($.mul(ccp0.get$rB().get$x(), Py0), $.mul(ccp0.get$rB().get$y(), Px0)));
      ccp0.set$normalImpulse(newImpulse0);
      var wA4 = wA3;
      var wB4 = wB3;
    } else {
      var cp1 = $.index(c.get$points(), 0);
      var cp2 = $.index(c.get$points(), 1);
      var a2 = $.Vector$2(cp1.get$normalImpulse(), cp2.get$normalImpulse());
      $.assert($.geB(a2.x, 0.0) && $.geB(a2.y, 0.0));
      var t6 = -wB0;
      var t7 = $.sub($.add($.mul(t6, cp1.get$rB().get$y()), vB.get$x()), vA.get$x()) + $.mul(wA0, cp1.get$rA().get$y());
      this.dv1.set$x(t7);
      var t8 = $.sub($.add($.mul(wB0, cp1.get$rB().get$x()), vB.get$y()), vA.get$y()) - $.mul(wA0, cp1.get$rA().get$x());
      this.dv1.set$y(t8);
      var t9 = $.sub($.add($.mul(t6, cp2.get$rB().get$y()), vB.get$x()), vA.get$x()) + $.mul(wA0, cp2.get$rA().get$y());
      this.dv2.set$x(t9);
      var t10 = $.sub($.add($.mul(wB0, cp2.get$rB().get$x()), vB.get$y()), vA.get$y()) - $.mul(wA0, cp2.get$rA().get$x());
      this.dv2.set$y(t10);
      var vn1 = $.add($.mul(this.dv1.get$x(), c.get$normal().get$x()), $.mul(this.dv1.get$y(), c.get$normal().get$y()));
      var vn2 = $.add($.mul(this.dv2.get$x(), c.get$normal().get$x()), $.mul(this.dv2.get$y(), c.get$normal().get$y()));
      var b0 = $.Vector$2($.sub(vn1, cp1.get$velocityBias()), $.sub(vn2, cp2.get$velocityBias()));
      var t11 = $.add($.mul(c.get$K().get$col1().get$x(), a2.x), $.mul(c.get$K().get$col2().get$x(), a2.y));
      this.temp2.set$x(t11);
      var t12 = $.add($.mul(c.get$K().get$col1().get$y(), a2.x), $.mul(c.get$K().get$col2().get$y(), a2.y));
      this.temp2.set$y(t12);
      b0.x = $.sub(b0.x, this.temp2.get$x());
      b0.y = $.sub(b0.y, this.temp2.get$y());
      for (; wA4 = wA0, wB4 = wB0, true; ) {
        $.mulMatrixAndVectorToOut(c.get$normalMass(), b0, this.x);
        this.x.mulLocal$1(-1);
        if ($.geB(this.x.get$x(), 0.0) && $.geB(this.x.get$y(), 0.0)) {
          this.d.setFrom$1(this.x).subLocal$1(a2);
          this.P1.setFrom$1(c.get$normal()).mulLocal$1(this.d.get$x());
          this.P2.setFrom$1(c.get$normal()).mulLocal$1(this.d.get$y());
          this.temp1.setFrom$1(this.P1).addLocal$1(this.P2);
          this.temp2.setFrom$1(this.temp1).mulLocal$1(invMassA);
          vA.subLocal$1(this.temp2);
          this.temp2.setFrom$1(this.temp1).mulLocal$1(invMassB);
          vB.addLocal$1(this.temp2);
          var wA5 = wA0 - $.mul(invIA, $.add($.crossVectors(cp1.get$rA(), this.P1), $.crossVectors(cp2.get$rA(), this.P2)));
          var wB5 = wB0 + $.mul(invIB, $.add($.crossVectors(cp1.get$rB(), this.P1), $.crossVectors(cp2.get$rB(), this.P2)));
          cp1.set$normalImpulse(this.x.get$x());
          cp2.set$normalImpulse(this.x.get$y());
          wA4 = wA5;
          wB4 = wB5;
          break;
        }
        var t13 = $.mul($.neg(cp1.get$normalMass()), b0.x);
        this.x.set$x(t13);
        this.x.set$y(0.0);
        var vn20 = $.add($.mul(c.get$K().get$col1().get$y(), this.x.get$x()), b0.y);
        if ($.geB(this.x.get$x(), 0.0) && $.geB(vn20, 0.0)) {
          this.d.setFrom$1(this.x).subLocal$1(a2);
          this.P1.setFrom$1(c.get$normal()).mulLocal$1(this.d.get$x());
          this.P2.setFrom$1(c.get$normal()).mulLocal$1(this.d.get$y());
          this.temp1.setFrom$1(this.P1).addLocal$1(this.P2);
          this.temp2.setFrom$1(this.temp1).mulLocal$1(invMassA);
          vA.subLocal$1(this.temp2);
          this.temp2.setFrom$1(this.temp1).mulLocal$1(invMassB);
          vB.addLocal$1(this.temp2);
          var wA6 = wA0 - $.mul(invIA, $.add($.crossVectors(cp1.get$rA(), this.P1), $.crossVectors(cp2.get$rA(), this.P2)));
          var wB6 = wB0 + $.mul(invIB, $.add($.crossVectors(cp1.get$rB(), this.P1), $.crossVectors(cp2.get$rB(), this.P2)));
          cp1.set$normalImpulse(this.x.get$x());
          cp2.set$normalImpulse(this.x.get$y());
          wA4 = wA6;
          wB4 = wB6;
          break;
        }
        this.x.set$x(0.0);
        var t14 = $.mul($.neg(cp2.get$normalMass()), b0.y);
        this.x.set$y(t14);
        var vn10 = $.add($.mul(c.get$K().get$col2().get$x(), this.x.get$y()), b0.x);
        if ($.geB(this.x.get$y(), 0.0) && $.geB(vn10, 0.0)) {
          this.d.setFrom$1(this.x).subLocal$1(a2);
          this.P1.setFrom$1(c.get$normal()).mulLocal$1(this.d.get$x());
          this.P2.setFrom$1(c.get$normal()).mulLocal$1(this.d.get$y());
          this.temp1.setFrom$1(this.P1).addLocal$1(this.P2);
          this.temp2.setFrom$1(this.temp1).mulLocal$1(invMassA);
          vA.subLocal$1(this.temp2);
          this.temp2.setFrom$1(this.temp1).mulLocal$1(invMassB);
          vB.addLocal$1(this.temp2);
          var wA7 = wA0 - $.mul(invIA, $.add($.crossVectors(cp1.get$rA(), this.P1), $.crossVectors(cp2.get$rA(), this.P2)));
          var wB7 = wB0 + $.mul(invIB, $.add($.crossVectors(cp1.get$rB(), this.P1), $.crossVectors(cp2.get$rB(), this.P2)));
          cp1.set$normalImpulse(this.x.get$x());
          cp2.set$normalImpulse(this.x.get$y());
          wA4 = wA7;
          wB4 = wB7;
          break;
        }
        this.x.set$x(0.0);
        this.x.set$y(0.0);
        var vn11 = b0.x;
        var vn21 = b0.y;
        if ($.geB(vn11, 0.0) && $.geB(vn21, 0.0)) {
          this.d.setFrom$1(this.x).subLocal$1(a2);
          this.P1.setFrom$1(c.get$normal()).mulLocal$1(this.d.get$x());
          this.P2.setFrom$1(c.get$normal()).mulLocal$1(this.d.get$y());
          this.temp1.setFrom$1(this.P1).addLocal$1(this.P2);
          this.temp2.setFrom$1(this.temp1).mulLocal$1(invMassA);
          vA.subLocal$1(this.temp2);
          this.temp2.setFrom$1(this.temp1).mulLocal$1(invMassB);
          vB.addLocal$1(this.temp2);
          var wA8 = wA0 - $.mul(invIA, $.add($.crossVectors(cp1.get$rA(), this.P1), $.crossVectors(cp2.get$rA(), this.P2)));
          var wB8 = wB0 + $.mul(invIB, $.add($.crossVectors(cp1.get$rB(), this.P1), $.crossVectors(cp2.get$rB(), this.P2)));
          cp1.set$normalImpulse(this.x.get$x());
          cp2.set$normalImpulse(this.x.get$y());
          wA4 = wA8;
          wB4 = wB8;
          break;
        }
        wA4 = wA0;
        wB4 = wB0;
        break;
      }
    }
    bodyA.get$linearVelocity().setFrom$1(vA);
    bodyA.set$angularVelocity(wA4);
    bodyB.get$linearVelocity().setFrom$1(vB);
    bodyB.set$angularVelocity(wB4);
  }
 },
 solveVelocityConstraints$0$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12) {
  switch (state) {
    case 1:
      c = env0;
      bodyA = env1;
      bodyB = env2;
      i = env3;
      wA = env4;
      break;
    case 2:
      c = env0;
      bodyA = env1;
      bodyB = env2;
      i = env3;
      wA = env4;
      wB = env5;
      break;
    case 3:
      c = env0;
      bodyA = env1;
      bodyB = env2;
      i = env3;
      wA = env4;
      wB = env5;
      vB = env6;
      vA = env7;
      invMassA = env8;
      break;
    case 4:
      c = env0;
      bodyA = env1;
      bodyB = env2;
      i = env3;
      wA = env4;
      wB = env5;
      vB = env6;
      vA = env7;
      invMassA = env8;
      invIA = env9;
      break;
    case 5:
      c = env0;
      bodyA = env1;
      bodyB = env2;
      i = env3;
      wA = env4;
      wB = env5;
      vB = env6;
      vA = env7;
      invIA = env8;
      invMassA = env9;
      invMassB = env10;
      break;
    case 6:
      i = env0;
      c = env1;
      bodyA = env2;
      bodyB = env3;
      wA = env4;
      wB = env5;
      vB = env6;
      vA = env7;
      invIA = env8;
      invMassA = env9;
      invMassB = env10;
      invIB = env11;
      break;
    case 7:
      i = env0;
      c = env1;
      bodyA = env2;
      bodyB = env3;
      wA = env4;
      wB = env5;
      vB = env6;
      vA = env7;
      invIA = env8;
      invMassA = env9;
      invIB = env10;
      invMassB = env11;
      friction = env12;
      break;
  }
  switch (state) {
    case 0:
      var i = 0;
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, this.constraintCount)) break L0;
            var c = $.index(this.constraints, i);
            var bodyA = c.get$bodyA();
            var bodyB = c.get$bodyB();
            var wA = bodyA.get$angularVelocity();
          case 1:
            state = 0;
            var wB = bodyB.get$angularVelocity();
          case 2:
            state = 0;
            var vA = bodyA.get$linearVelocity();
            var vB = bodyB.get$linearVelocity();
            var invMassA = bodyA.get$invMass();
          case 3:
            state = 0;
            var invIA = bodyA.get$invInertia();
          case 4:
            state = 0;
            var invMassB = bodyB.get$invMass();
          case 5:
            state = 0;
            var invIB = bodyB.get$invInertia();
          case 6:
            state = 0;
            var t0 = $.mul(1.0, c.get$normal().get$y());
            this.tangent.set$x(t0);
            var t1 = $.mul(-1.0, c.get$normal().get$x());
            this.tangent.set$y(t1);
            var friction = c.get$friction();
          case 7:
            state = 0;
            $.assert($.eqB(c.get$pointCount(), 1) || $.eqB(c.get$pointCount(), 2));
            var wB0 = wB;
            var j = 0;
            var wA0 = wA;
            L1: while (true) {
              if (!$.ltB(j, c.get$pointCount())) break L1;
              var wA1 = wA0;
              var wB1 = wB0;
              var ccp = $.index(c.get$points(), j);
              var a = ccp.get$rA();
              var t2 = $.add($.sub($.add($.mul($.neg(wB0), ccp.get$rB().get$y()), vB.get$x()), vA.get$x()), $.mul(wA0, a.get$y()));
              this.dv.set$x(t2);
              var t3 = $.sub($.sub($.add($.mul(wB0, ccp.get$rB().get$x()), vB.get$y()), vA.get$y()), $.mul(wA0, a.get$x()));
              this.dv.set$y(t3);
              var vt = $.add($.mul(this.dv.get$x(), this.tangent.get$x()), $.mul(this.dv.get$y(), this.tangent.get$y()));
              var lambda = $.mul(ccp.get$tangentMass(), $.neg(vt));
              var maxFriction = $.mul(friction, ccp.get$normalImpulse());
              var newImpulse = $.clamp($.add(ccp.get$tangentImpulse(), lambda), $.neg(maxFriction), maxFriction);
              var lambda0 = $.sub(newImpulse, ccp.get$tangentImpulse());
              var Px = $.mul(this.tangent.get$x(), lambda0);
              var Py = $.mul(this.tangent.get$y(), lambda0);
              vA.set$x($.sub(vA.get$x(), $.mul(Px, invMassA)));
              vA.set$y($.sub(vA.get$y(), $.mul(Py, invMassA)));
              var wA2 = $.sub(wA0, $.mul(invIA, $.sub($.mul(ccp.get$rA().get$x(), Py), $.mul(ccp.get$rA().get$y(), Px))));
              vB.set$x($.add(vB.get$x(), $.mul(Px, invMassB)));
              vB.set$y($.add(vB.get$y(), $.mul(Py, invMassB)));
              var wB2 = $.add(wB0, $.mul(invIB, $.sub($.mul(ccp.get$rB().get$x(), Py), $.mul(ccp.get$rB().get$y(), Px))));
              ccp.set$tangentImpulse(newImpulse);
              wA1 = wA2;
              wB1 = wB2;
              var j0 = j + 1;
              wB0 = wB1;
              j = j0;
              wA0 = wA1;
            }
            if ($.eqB(c.get$pointCount(), 1)) {
              var ccp0 = $.index(c.get$points(), 0);
              var a1 = ccp0.get$rA();
              var t4 = $.add($.sub($.add($.mul($.neg(wB0), ccp0.get$rB().get$y()), vB.get$x()), vA.get$x()), $.mul(wA0, a1.get$y()));
              this.dv.set$x(t4);
              var t5 = $.sub($.sub($.add($.mul(wB0, ccp0.get$rB().get$x()), vB.get$y()), vA.get$y()), $.mul(wA0, a1.get$x()));
              this.dv.set$y(t5);
              var b = c.get$normal();
              var vn = $.add($.mul(this.dv.get$x(), b.get$x()), $.mul(this.dv.get$y(), b.get$y()));
              var lambda1 = $.mul($.neg(ccp0.get$normalMass()), $.sub(vn, ccp0.get$velocityBias()));
              var a0 = $.add(ccp0.get$normalImpulse(), lambda1);
              if ($.gtB(a0, 0.0)) {
                var newImpulse0 = a0;
              } else {
                newImpulse0 = 0.0;
              }
              var lambda2 = $.sub(newImpulse0, ccp0.get$normalImpulse());
              var Px0 = $.mul(c.get$normal().get$x(), lambda2);
              var Py0 = $.mul(c.get$normal().get$y(), lambda2);
              vA.set$x($.sub(vA.get$x(), $.mul(Px0, invMassA)));
              vA.set$y($.sub(vA.get$y(), $.mul(Py0, invMassA)));
              var wA3 = $.sub(wA0, $.mul(invIA, $.sub($.mul(ccp0.get$rA().get$x(), Py0), $.mul(ccp0.get$rA().get$y(), Px0))));
              vB.set$x($.add(vB.get$x(), $.mul(Px0, invMassB)));
              vB.set$y($.add(vB.get$y(), $.mul(Py0, invMassB)));
              var wB3 = $.add(wB0, $.mul(invIB, $.sub($.mul(ccp0.get$rB().get$x(), Py0), $.mul(ccp0.get$rB().get$y(), Px0))));
              ccp0.set$normalImpulse(newImpulse0);
              var wA4 = wA3;
              var wB4 = wB3;
            } else {
              var cp1 = $.index(c.get$points(), 0);
              var cp2 = $.index(c.get$points(), 1);
              var a2 = $.Vector$2(cp1.get$normalImpulse(), cp2.get$normalImpulse());
              $.assert($.geB(a2.x, 0.0) && $.geB(a2.y, 0.0));
              var t6 = $.add($.sub($.add($.mul($.neg(wB0), cp1.get$rB().get$y()), vB.get$x()), vA.get$x()), $.mul(wA0, cp1.get$rA().get$y()));
              this.dv1.set$x(t6);
              var t7 = $.sub($.sub($.add($.mul(wB0, cp1.get$rB().get$x()), vB.get$y()), vA.get$y()), $.mul(wA0, cp1.get$rA().get$x()));
              this.dv1.set$y(t7);
              var t8 = $.add($.sub($.add($.mul($.neg(wB0), cp2.get$rB().get$y()), vB.get$x()), vA.get$x()), $.mul(wA0, cp2.get$rA().get$y()));
              this.dv2.set$x(t8);
              var t9 = $.sub($.sub($.add($.mul(wB0, cp2.get$rB().get$x()), vB.get$y()), vA.get$y()), $.mul(wA0, cp2.get$rA().get$x()));
              this.dv2.set$y(t9);
              var vn1 = $.add($.mul(this.dv1.get$x(), c.get$normal().get$x()), $.mul(this.dv1.get$y(), c.get$normal().get$y()));
              var vn2 = $.add($.mul(this.dv2.get$x(), c.get$normal().get$x()), $.mul(this.dv2.get$y(), c.get$normal().get$y()));
              var b0 = $.Vector$2($.sub(vn1, cp1.get$velocityBias()), $.sub(vn2, cp2.get$velocityBias()));
              var t10 = $.add($.mul(c.get$K().get$col1().get$x(), a2.x), $.mul(c.get$K().get$col2().get$x(), a2.y));
              this.temp2.set$x(t10);
              var t11 = $.add($.mul(c.get$K().get$col1().get$y(), a2.x), $.mul(c.get$K().get$col2().get$y(), a2.y));
              this.temp2.set$y(t11);
              b0.x = $.sub(b0.x, this.temp2.get$x());
              b0.y = $.sub(b0.y, this.temp2.get$y());
              L2: while (true) {
                wA4 = wA0;
                wB4 = wB0;
                if (!true) break L2;
                $.mulMatrixAndVectorToOut(c.get$normalMass(), b0, this.x);
                this.x.mulLocal$1(-1);
                if ($.geB(this.x.get$x(), 0.0) && $.geB(this.x.get$y(), 0.0)) {
                  this.d.setFrom$1(this.x).subLocal$1(a2);
                  this.P1.setFrom$1(c.get$normal()).mulLocal$1(this.d.get$x());
                  this.P2.setFrom$1(c.get$normal()).mulLocal$1(this.d.get$y());
                  this.temp1.setFrom$1(this.P1).addLocal$1(this.P2);
                  this.temp2.setFrom$1(this.temp1).mulLocal$1(invMassA);
                  vA.subLocal$1(this.temp2);
                  this.temp2.setFrom$1(this.temp1).mulLocal$1(invMassB);
                  vB.addLocal$1(this.temp2);
                  var wA5 = $.sub(wA0, $.mul(invIA, $.add($.crossVectors(cp1.get$rA(), this.P1), $.crossVectors(cp2.get$rA(), this.P2))));
                  var wB5 = $.add(wB0, $.mul(invIB, $.add($.crossVectors(cp1.get$rB(), this.P1), $.crossVectors(cp2.get$rB(), this.P2))));
                  cp1.set$normalImpulse(this.x.get$x());
                  cp2.set$normalImpulse(this.x.get$y());
                  wA4 = wA5;
                  wB4 = wB5;
                  break;
                }
                var t12 = $.mul($.neg(cp1.get$normalMass()), b0.x);
                this.x.set$x(t12);
                this.x.set$y(0.0);
                var vn20 = $.add($.mul(c.get$K().get$col1().get$y(), this.x.get$x()), b0.y);
                if ($.geB(this.x.get$x(), 0.0) && $.geB(vn20, 0.0)) {
                  this.d.setFrom$1(this.x).subLocal$1(a2);
                  this.P1.setFrom$1(c.get$normal()).mulLocal$1(this.d.get$x());
                  this.P2.setFrom$1(c.get$normal()).mulLocal$1(this.d.get$y());
                  this.temp1.setFrom$1(this.P1).addLocal$1(this.P2);
                  this.temp2.setFrom$1(this.temp1).mulLocal$1(invMassA);
                  vA.subLocal$1(this.temp2);
                  this.temp2.setFrom$1(this.temp1).mulLocal$1(invMassB);
                  vB.addLocal$1(this.temp2);
                  var wA6 = $.sub(wA0, $.mul(invIA, $.add($.crossVectors(cp1.get$rA(), this.P1), $.crossVectors(cp2.get$rA(), this.P2))));
                  var wB6 = $.add(wB0, $.mul(invIB, $.add($.crossVectors(cp1.get$rB(), this.P1), $.crossVectors(cp2.get$rB(), this.P2))));
                  cp1.set$normalImpulse(this.x.get$x());
                  cp2.set$normalImpulse(this.x.get$y());
                  wA4 = wA6;
                  wB4 = wB6;
                  break;
                }
                this.x.set$x(0.0);
                var t13 = $.mul($.neg(cp2.get$normalMass()), b0.y);
                this.x.set$y(t13);
                var vn10 = $.add($.mul(c.get$K().get$col2().get$x(), this.x.get$y()), b0.x);
                if ($.geB(this.x.get$y(), 0.0) && $.geB(vn10, 0.0)) {
                  this.d.setFrom$1(this.x).subLocal$1(a2);
                  this.P1.setFrom$1(c.get$normal()).mulLocal$1(this.d.get$x());
                  this.P2.setFrom$1(c.get$normal()).mulLocal$1(this.d.get$y());
                  this.temp1.setFrom$1(this.P1).addLocal$1(this.P2);
                  this.temp2.setFrom$1(this.temp1).mulLocal$1(invMassA);
                  vA.subLocal$1(this.temp2);
                  this.temp2.setFrom$1(this.temp1).mulLocal$1(invMassB);
                  vB.addLocal$1(this.temp2);
                  var wA7 = $.sub(wA0, $.mul(invIA, $.add($.crossVectors(cp1.get$rA(), this.P1), $.crossVectors(cp2.get$rA(), this.P2))));
                  var wB7 = $.add(wB0, $.mul(invIB, $.add($.crossVectors(cp1.get$rB(), this.P1), $.crossVectors(cp2.get$rB(), this.P2))));
                  cp1.set$normalImpulse(this.x.get$x());
                  cp2.set$normalImpulse(this.x.get$y());
                  wA4 = wA7;
                  wB4 = wB7;
                  break;
                }
                this.x.set$x(0.0);
                this.x.set$y(0.0);
                var vn11 = b0.x;
                var vn21 = b0.y;
                if ($.geB(vn11, 0.0) && $.geB(vn21, 0.0)) {
                  this.d.setFrom$1(this.x).subLocal$1(a2);
                  this.P1.setFrom$1(c.get$normal()).mulLocal$1(this.d.get$x());
                  this.P2.setFrom$1(c.get$normal()).mulLocal$1(this.d.get$y());
                  this.temp1.setFrom$1(this.P1).addLocal$1(this.P2);
                  this.temp2.setFrom$1(this.temp1).mulLocal$1(invMassA);
                  vA.subLocal$1(this.temp2);
                  this.temp2.setFrom$1(this.temp1).mulLocal$1(invMassB);
                  vB.addLocal$1(this.temp2);
                  var wA8 = $.sub(wA0, $.mul(invIA, $.add($.crossVectors(cp1.get$rA(), this.P1), $.crossVectors(cp2.get$rA(), this.P2))));
                  var wB8 = $.add(wB0, $.mul(invIB, $.add($.crossVectors(cp1.get$rB(), this.P1), $.crossVectors(cp2.get$rB(), this.P2))));
                  cp1.set$normalImpulse(this.x.get$x());
                  cp2.set$normalImpulse(this.x.get$y());
                  wA4 = wA8;
                  wB4 = wB8;
                  break;
                }
                wA4 = wA0;
                wB4 = wB0;
                break;
              }
            }
            bodyA.get$linearVelocity().setFrom$1(vA);
            bodyA.set$angularVelocity(wA4);
            bodyB.get$linearVelocity().setFrom$1(vB);
            bodyB.set$angularVelocity(wB4);
            i = i + 1;
        }
      }
  }
 },
 warmStart$0: function() {
  for (var i = 0; $.ltB(i, this.constraintCount); i = i + 1) {
    var c = $.index(this.constraints, i);
    var bodyA = c.get$bodyA();
    var bodyB = c.get$bodyB();
    var invMassA = bodyA.get$invMass();
    if (typeof invMassA !== 'number') return this.warmStart$0$bailout(1, c, bodyA, bodyB, i, invMassA);
    var invIA = bodyA.get$invInertia();
    if (typeof invIA !== 'number') return this.warmStart$0$bailout(2, c, bodyA, bodyB, i, invMassA, invIA);
    var invMassB = bodyB.get$invMass();
    if (typeof invMassB !== 'number') return this.warmStart$0$bailout(3, c, bodyA, bodyB, i, invMassA, invIA, invMassB);
    var invIB = bodyB.get$invInertia();
    if (typeof invIB !== 'number') return this.warmStart$0$bailout(4, c, bodyA, bodyB, i, invMassA, invIA, invMassB, invIB);
    var normal = c.get$normal();
    $.crossVectorAndNumToOut(normal, 1, this.tangent);
    for (var j = 0; $.ltB(j, c.get$pointCount()); j = j + 1) {
      var ccp = $.index(c.get$points(), j);
      var Px = $.add($.mul(ccp.get$normalImpulse(), normal.get$x()), $.mul(ccp.get$tangentImpulse(), this.tangent.get$x()));
      var Py = $.add($.mul(ccp.get$normalImpulse(), normal.get$y()), $.mul(ccp.get$tangentImpulse(), this.tangent.get$y()));
      bodyA.set$angularVelocity($.sub(bodyA.get$angularVelocity(), $.mul(invIA, $.sub($.mul(ccp.get$rA().get$x(), Py), $.mul(ccp.get$rA().get$y(), Px)))));
      var t0 = bodyA.get$linearVelocity();
      t0.set$x($.sub(t0.get$x(), $.mul(Px, invMassA)));
      var t1 = bodyA.get$linearVelocity();
      t1.set$y($.sub(t1.get$y(), $.mul(Py, invMassA)));
      bodyB.set$angularVelocity($.add(bodyB.get$angularVelocity(), $.mul(invIB, $.sub($.mul(ccp.get$rB().get$x(), Py), $.mul(ccp.get$rB().get$y(), Px)))));
      var t2 = bodyB.get$linearVelocity();
      t2.set$x($.add(t2.get$x(), $.mul(Px, invMassB)));
      var t3 = bodyB.get$linearVelocity();
      t3.set$y($.add(t3.get$y(), $.mul(Py, invMassB)));
    }
  }
 },
 warmStart$0$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7) {
  switch (state) {
    case 1:
      c = env0;
      bodyA = env1;
      bodyB = env2;
      i = env3;
      invMassA = env4;
      break;
    case 2:
      c = env0;
      bodyA = env1;
      bodyB = env2;
      i = env3;
      invMassA = env4;
      invIA = env5;
      break;
    case 3:
      c = env0;
      bodyA = env1;
      bodyB = env2;
      i = env3;
      invMassA = env4;
      invIA = env5;
      invMassB = env6;
      break;
    case 4:
      c = env0;
      bodyA = env1;
      bodyB = env2;
      i = env3;
      invMassA = env4;
      invIA = env5;
      invMassB = env6;
      invIB = env7;
      break;
  }
  switch (state) {
    case 0:
      var i = 0;
    case 1:
    case 2:
    case 3:
    case 4:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, this.constraintCount)) break L0;
            var c = $.index(this.constraints, i);
            var bodyA = c.get$bodyA();
            var bodyB = c.get$bodyB();
            var invMassA = bodyA.get$invMass();
          case 1:
            state = 0;
            var invIA = bodyA.get$invInertia();
          case 2:
            state = 0;
            var invMassB = bodyB.get$invMass();
          case 3:
            state = 0;
            var invIB = bodyB.get$invInertia();
          case 4:
            state = 0;
            var normal = c.get$normal();
            $.crossVectorAndNumToOut(normal, 1, this.tangent);
            var j = 0;
            L1: while (true) {
              if (!$.ltB(j, c.get$pointCount())) break L1;
              var ccp = $.index(c.get$points(), j);
              var Px = $.add($.mul(ccp.get$normalImpulse(), normal.get$x()), $.mul(ccp.get$tangentImpulse(), this.tangent.get$x()));
              var Py = $.add($.mul(ccp.get$normalImpulse(), normal.get$y()), $.mul(ccp.get$tangentImpulse(), this.tangent.get$y()));
              bodyA.set$angularVelocity($.sub(bodyA.get$angularVelocity(), $.mul(invIA, $.sub($.mul(ccp.get$rA().get$x(), Py), $.mul(ccp.get$rA().get$y(), Px)))));
              var t0 = bodyA.get$linearVelocity();
              t0.set$x($.sub(t0.get$x(), $.mul(Px, invMassA)));
              var t1 = bodyA.get$linearVelocity();
              t1.set$y($.sub(t1.get$y(), $.mul(Py, invMassA)));
              bodyB.set$angularVelocity($.add(bodyB.get$angularVelocity(), $.mul(invIB, $.sub($.mul(ccp.get$rB().get$x(), Py), $.mul(ccp.get$rB().get$y(), Px)))));
              var t2 = bodyB.get$linearVelocity();
              t2.set$x($.add(t2.get$x(), $.mul(Px, invMassB)));
              var t3 = bodyB.get$linearVelocity();
              t3.set$y($.add(t3.get$y(), $.mul(Py, invMassB)));
              j = j + 1;
            }
            i = i + 1;
        }
      }
  }
 },
 init$3: function(contacts, contactCount, impulseRatio) {
  if (typeof contacts !== 'string' && (typeof contacts !== 'object'||contacts.constructor !== Array)) return this.init$3$bailout(contacts, contactCount, impulseRatio,  0);
  if (typeof impulseRatio !== 'number') return this.init$3$bailout(contacts, contactCount, impulseRatio,  0);
  this.constraintCount = contactCount;
  if ($.ltB($.get$length(this.constraints), contactCount)) {
    var old = this.constraints;
    var t0 = $.List($.max($.mul($.get$length(old), 2), this.constraintCount));
    $.setRuntimeTypeInfo(t0, ({E: 'ContactConstraint'}));
    this.constraints = t0;
    $.setRange$3(this.constraints, 0, $.get$length(old), old);
    for (var i = $.get$length(old); $.ltB(i, $.get$length(this.constraints)); i = $.add(i, 1)) {
      $.indexSet(this.constraints, i, $.ContactConstraint$0());
    }
  }
  for (var i0 = 0; $.ltB(i0, this.constraintCount); i0 = i0 + 1) {
    var t1 = contacts.length;
    if (i0 < 0 || i0 >= t1) throw $.ioore(i0);
    var t2 = contacts[i0];
    var fixtureA = t2.get$fixtureA();
    var fixtureB = t2.get$fixtureB();
    var shapeA = fixtureA.get$shape();
    var shapeB = fixtureB.get$shape();
    var radiusA = shapeA.get$radius();
    var radiusB = shapeB.get$radius();
    var bodyA = fixtureA.get$body();
    var bodyB = fixtureB.get$body();
    var manifold = t2.get$manifold();
    var friction = $.mixFriction(fixtureA.get$friction(), fixtureB.get$friction());
    var restitution = $.mixRestitution(fixtureA.get$restitution(), fixtureB.get$restitution());
    if (typeof restitution !== 'number') return this.init$3$bailout(contacts, contactCount, impulseRatio, 3, friction, contacts, impulseRatio, i0, radiusA, radiusB, bodyA, bodyB, manifold, restitution);
    var vA = bodyA.get$linearVelocity();
    var vB = bodyB.get$linearVelocity();
    var wA = bodyA.get$angularVelocity();
    if (typeof wA !== 'number') return this.init$3$bailout(contacts, contactCount, impulseRatio, 4, friction, contacts, impulseRatio, restitution, i0, vA, vB, radiusA, radiusB, bodyA, bodyB, manifold, wA);
    var wB = bodyB.get$angularVelocity();
    if (typeof wB !== 'number') return this.init$3$bailout(contacts, contactCount, impulseRatio, 5, friction, contacts, impulseRatio, restitution, i0, wA, vB, vA, radiusA, radiusB, bodyA, bodyB, manifold, wB);
    $.assert($.gt(manifold.get$pointCount(), 0));
    this.worldManifold.initialize$5(manifold, bodyA.get$originTransform(), radiusA, bodyB.get$originTransform(), radiusB);
    var cc = $.index(this.constraints, i0);
    cc.set$bodyA(bodyA);
    cc.set$bodyB(bodyB);
    cc.set$manifold(manifold);
    var t3 = this.worldManifold.get$normal().get$x();
    cc.get$normal().set$x(t3);
    var t4 = this.worldManifold.get$normal().get$y();
    cc.get$normal().set$y(t4);
    cc.set$pointCount(manifold.get$pointCount());
    cc.set$friction(friction);
    cc.set$restitution(restitution);
    var t5 = manifold.get$localNormal().get$x();
    cc.get$localNormal().set$x(t5);
    var t6 = manifold.get$localNormal().get$y();
    cc.get$localNormal().set$y(t6);
    var t7 = manifold.get$localPoint().get$x();
    cc.get$localPoint().set$x(t7);
    var t8 = manifold.get$localPoint().get$y();
    cc.get$localPoint().set$y(t8);
    cc.set$radius($.add(radiusA, radiusB));
    cc.set$type(manifold.get$type());
    var t9 = -wA;
    var t10 = -wB;
    var t11 = -restitution;
    for (var j = 0; $.ltB(j, cc.get$pointCount()); j = j + 1) {
      var cp = $.index(manifold.get$points(), j);
      var ccp = $.index(cc.get$points(), j);
      ccp.set$normalImpulse($.mul(impulseRatio, cp.get$normalImpulse()));
      ccp.set$tangentImpulse($.mul(impulseRatio, cp.get$tangentImpulse()));
      var t12 = cp.get$localPoint().get$x();
      ccp.get$localPoint().set$x(t12);
      var t13 = cp.get$localPoint().get$y();
      ccp.get$localPoint().set$y(t13);
      var t14 = $.sub($.index(this.worldManifold.get$points(), j).get$x(), bodyA.get$sweep().get$center().get$x());
      ccp.get$rA().set$x(t14);
      var t15 = $.sub($.index(this.worldManifold.get$points(), j).get$y(), bodyA.get$sweep().get$center().get$y());
      ccp.get$rA().set$y(t15);
      var t16 = $.sub($.index(this.worldManifold.get$points(), j).get$x(), bodyB.get$sweep().get$center().get$x());
      ccp.get$rB().set$x(t16);
      var t17 = $.sub($.index(this.worldManifold.get$points(), j).get$y(), bodyB.get$sweep().get$center().get$y());
      ccp.get$rB().set$y(t17);
      var rnA = $.sub($.mul(ccp.get$rA().get$x(), cc.get$normal().get$y()), $.mul(ccp.get$rA().get$y(), cc.get$normal().get$x()));
      var rnB = $.sub($.mul(ccp.get$rB().get$x(), cc.get$normal().get$y()), $.mul(ccp.get$rB().get$y(), cc.get$normal().get$x()));
      var rnA0 = $.mul(rnA, rnA);
      var rnB0 = $.mul(rnB, rnB);
      var kNormal = $.add($.add($.add(bodyA.get$invMass(), bodyB.get$invMass()), $.mul(bodyA.get$invInertia(), rnA0)), $.mul(bodyB.get$invInertia(), rnB0));
      $.assert($.gt(kNormal, 1.192e-7));
      ccp.set$normalMass($.div(1.0, kNormal));
      var t18 = $.mul(1.0, cc.get$normal().get$y());
      this.tangent.set$x(t18);
      var t19 = $.mul(-1.0, cc.get$normal().get$x());
      this.tangent.set$y(t19);
      var rtA = $.sub($.mul(ccp.get$rA().get$x(), this.tangent.get$y()), $.mul(ccp.get$rA().get$y(), this.tangent.get$x()));
      var rtB = $.sub($.mul(ccp.get$rB().get$x(), this.tangent.get$y()), $.mul(ccp.get$rB().get$y(), this.tangent.get$x()));
      var rtA0 = $.mul(rtA, rtA);
      var rtB0 = $.mul(rtB, rtB);
      var kTangent = $.add($.add($.add(bodyA.get$invMass(), bodyB.get$invMass()), $.mul(bodyA.get$invInertia(), rtA0)), $.mul(bodyB.get$invInertia(), rtB0));
      $.assert($.gt(kTangent, 1.192e-7));
      ccp.set$tangentMass($.div(1.0, kTangent));
      ccp.set$velocityBias(0.0);
      var t20 = $.mul(t9, ccp.get$rA().get$y());
      this.temp2.set$x(t20);
      var t21 = $.mul(wA, ccp.get$rA().get$x());
      this.temp2.set$y(t21);
      var t22 = $.sub($.sub($.add($.mul(t10, ccp.get$rB().get$y()), vB.get$x()), vA.get$x()), this.temp2.get$x());
      this.temp1.set$x(t22);
      var t23 = $.sub($.sub($.add($.mul(wB, ccp.get$rB().get$x()), vB.get$y()), vA.get$y()), this.temp2.get$y());
      this.temp1.set$y(t23);
      var a = cc.get$normal();
      var vRel = $.add($.mul(a.get$x(), this.temp1.get$x()), $.mul(a.get$y(), this.temp1.get$y()));
      if ($.ltB(vRel, -1)) {
        ccp.set$velocityBias($.mul(t11, vRel));
      }
    }
    if ($.eqB(cc.get$pointCount(), 2)) {
      var ccp1 = $.index(cc.get$points(), 0);
      var ccp2 = $.index(cc.get$points(), 1);
      var invMassA = bodyA.get$invMass();
      var invIA = bodyA.get$invInertia();
      var invMassB = bodyB.get$invMass();
      var invIB = bodyB.get$invInertia();
      var rn1A = $.crossVectors(ccp1.get$rA(), cc.get$normal());
      var rn1B = $.crossVectors(ccp1.get$rB(), cc.get$normal());
      var rn2A = $.crossVectors(ccp2.get$rA(), cc.get$normal());
      var rn2B = $.crossVectors(ccp2.get$rB(), cc.get$normal());
      var k11 = $.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rn1A), rn1A)), $.mul($.mul(invIB, rn1B), rn1B));
      var k22 = $.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rn2A), rn2A)), $.mul($.mul(invIB, rn2B), rn2B));
      var k12 = $.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rn1A), rn2A)), $.mul($.mul(invIB, rn1B), rn2B));
      if ($.ltB($.mul(k11, k11), $.mul(100.0, $.sub($.mul(k11, k22), $.mul(k12, k12))))) {
        cc.get$K().get$col1().set$x(k11);
        cc.get$K().get$col1().set$y(k12);
        cc.get$K().get$col2().set$x(k12);
        cc.get$K().get$col2().set$y(k22);
        var t24 = cc.get$K().get$col1().get$x();
        cc.get$normalMass().get$col1().set$x(t24);
        var t25 = cc.get$K().get$col1().get$y();
        cc.get$normalMass().get$col1().set$y(t25);
        var t26 = cc.get$K().get$col2().get$x();
        cc.get$normalMass().get$col2().set$x(t26);
        var t27 = cc.get$K().get$col2().get$y();
        cc.get$normalMass().get$col2().set$y(t27);
        cc.get$normalMass().invertLocal$0();
      } else {
        cc.set$pointCount(1);
      }
    }
  }
 },
 init$3$bailout: function(contacts, contactCount, impulseRatio, state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      t1 = env1;
      break;
    case 3:
      friction = env0;
      t0 = env1;
      t1 = env2;
      i0 = env3;
      radiusA = env4;
      radiusB = env5;
      bodyA = env6;
      bodyB = env7;
      manifold = env8;
      restitution = env9;
      break;
    case 4:
      friction = env0;
      t0 = env1;
      t1 = env2;
      restitution = env3;
      i0 = env4;
      vA = env5;
      vB = env6;
      radiusA = env7;
      radiusB = env8;
      bodyA = env9;
      bodyB = env10;
      manifold = env11;
      wA = env12;
      break;
    case 5:
      friction = env0;
      t0 = env1;
      t1 = env2;
      restitution = env3;
      i0 = env4;
      wA = env5;
      vB = env6;
      vA = env7;
      radiusA = env8;
      radiusB = env9;
      bodyA = env10;
      bodyB = env11;
      manifold = env12;
      wB = env13;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
      this.constraintCount = contactCount;
      if ($.ltB($.get$length(this.constraints), contactCount)) {
        var old = this.constraints;
        var t2 = $.List($.max($.mul($.get$length(old), 2), this.constraintCount));
        $.setRuntimeTypeInfo(t2, ({E: 'ContactConstraint'}));
        this.constraints = t2;
        $.setRange$3(this.constraints, 0, $.get$length(old), old);
        var i = $.get$length(old);
        L0: while (true) {
          if (!$.ltB(i, $.get$length(this.constraints))) break L0;
          $.indexSet(this.constraints, i, $.ContactConstraint$0());
          i = $.add(i, 1);
        }
      }
      var i0 = 0;
    case 3:
    case 4:
    case 5:
      L1: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i0, this.constraintCount)) break L1;
            var contact = $.index(contacts, i0);
            var fixtureA = contact.get$fixtureA();
            var fixtureB = contact.get$fixtureB();
            var shapeA = fixtureA.get$shape();
            var shapeB = fixtureB.get$shape();
            var radiusA = shapeA.get$radius();
            var radiusB = shapeB.get$radius();
            var bodyA = fixtureA.get$body();
            var bodyB = fixtureB.get$body();
            var manifold = contact.get$manifold();
            var friction = $.mixFriction(fixtureA.get$friction(), fixtureB.get$friction());
            var restitution = $.mixRestitution(fixtureA.get$restitution(), fixtureB.get$restitution());
          case 3:
            state = 0;
            var vA = bodyA.get$linearVelocity();
            var vB = bodyB.get$linearVelocity();
            var wA = bodyA.get$angularVelocity();
          case 4:
            state = 0;
            var wB = bodyB.get$angularVelocity();
          case 5:
            state = 0;
            $.assert($.gt(manifold.get$pointCount(), 0));
            this.worldManifold.initialize$5(manifold, bodyA.get$originTransform(), radiusA, bodyB.get$originTransform(), radiusB);
            var cc = $.index(this.constraints, i0);
            cc.set$bodyA(bodyA);
            cc.set$bodyB(bodyB);
            cc.set$manifold(manifold);
            var t3 = this.worldManifold.get$normal().get$x();
            cc.get$normal().set$x(t3);
            var t4 = this.worldManifold.get$normal().get$y();
            cc.get$normal().set$y(t4);
            cc.set$pointCount(manifold.get$pointCount());
            cc.set$friction(friction);
            cc.set$restitution(restitution);
            var t5 = manifold.get$localNormal().get$x();
            cc.get$localNormal().set$x(t5);
            var t6 = manifold.get$localNormal().get$y();
            cc.get$localNormal().set$y(t6);
            var t7 = manifold.get$localPoint().get$x();
            cc.get$localPoint().set$x(t7);
            var t8 = manifold.get$localPoint().get$y();
            cc.get$localPoint().set$y(t8);
            cc.set$radius($.add(radiusA, radiusB));
            cc.set$type(manifold.get$type());
            var j = 0;
            L2: while (true) {
              if (!$.ltB(j, cc.get$pointCount())) break L2;
              var cp = $.index(manifold.get$points(), j);
              var ccp = $.index(cc.get$points(), j);
              ccp.set$normalImpulse($.mul(impulseRatio, cp.get$normalImpulse()));
              ccp.set$tangentImpulse($.mul(impulseRatio, cp.get$tangentImpulse()));
              var t9 = cp.get$localPoint().get$x();
              ccp.get$localPoint().set$x(t9);
              var t10 = cp.get$localPoint().get$y();
              ccp.get$localPoint().set$y(t10);
              var t11 = $.sub($.index(this.worldManifold.get$points(), j).get$x(), bodyA.get$sweep().get$center().get$x());
              ccp.get$rA().set$x(t11);
              var t12 = $.sub($.index(this.worldManifold.get$points(), j).get$y(), bodyA.get$sweep().get$center().get$y());
              ccp.get$rA().set$y(t12);
              var t13 = $.sub($.index(this.worldManifold.get$points(), j).get$x(), bodyB.get$sweep().get$center().get$x());
              ccp.get$rB().set$x(t13);
              var t14 = $.sub($.index(this.worldManifold.get$points(), j).get$y(), bodyB.get$sweep().get$center().get$y());
              ccp.get$rB().set$y(t14);
              var rnA = $.sub($.mul(ccp.get$rA().get$x(), cc.get$normal().get$y()), $.mul(ccp.get$rA().get$y(), cc.get$normal().get$x()));
              var rnB = $.sub($.mul(ccp.get$rB().get$x(), cc.get$normal().get$y()), $.mul(ccp.get$rB().get$y(), cc.get$normal().get$x()));
              var rnA0 = $.mul(rnA, rnA);
              var rnB0 = $.mul(rnB, rnB);
              var kNormal = $.add($.add($.add(bodyA.get$invMass(), bodyB.get$invMass()), $.mul(bodyA.get$invInertia(), rnA0)), $.mul(bodyB.get$invInertia(), rnB0));
              $.assert($.gt(kNormal, 1.192e-7));
              ccp.set$normalMass($.div(1.0, kNormal));
              var t15 = $.mul(1.0, cc.get$normal().get$y());
              this.tangent.set$x(t15);
              var t16 = $.mul(-1.0, cc.get$normal().get$x());
              this.tangent.set$y(t16);
              var rtA = $.sub($.mul(ccp.get$rA().get$x(), this.tangent.get$y()), $.mul(ccp.get$rA().get$y(), this.tangent.get$x()));
              var rtB = $.sub($.mul(ccp.get$rB().get$x(), this.tangent.get$y()), $.mul(ccp.get$rB().get$y(), this.tangent.get$x()));
              var rtA0 = $.mul(rtA, rtA);
              var rtB0 = $.mul(rtB, rtB);
              var kTangent = $.add($.add($.add(bodyA.get$invMass(), bodyB.get$invMass()), $.mul(bodyA.get$invInertia(), rtA0)), $.mul(bodyB.get$invInertia(), rtB0));
              $.assert($.gt(kTangent, 1.192e-7));
              ccp.set$tangentMass($.div(1.0, kTangent));
              ccp.set$velocityBias(0.0);
              var t17 = $.mul($.neg(wA), ccp.get$rA().get$y());
              this.temp2.set$x(t17);
              var t18 = $.mul(wA, ccp.get$rA().get$x());
              this.temp2.set$y(t18);
              var t19 = $.sub($.sub($.add($.mul($.neg(wB), ccp.get$rB().get$y()), vB.get$x()), vA.get$x()), this.temp2.get$x());
              this.temp1.set$x(t19);
              var t20 = $.sub($.sub($.add($.mul(wB, ccp.get$rB().get$x()), vB.get$y()), vA.get$y()), this.temp2.get$y());
              this.temp1.set$y(t20);
              var a = cc.get$normal();
              var vRel = $.add($.mul(a.get$x(), this.temp1.get$x()), $.mul(a.get$y(), this.temp1.get$y()));
              if ($.ltB(vRel, -1)) {
                ccp.set$velocityBias($.mul($.neg(restitution), vRel));
              }
              j = j + 1;
            }
            if ($.eqB(cc.get$pointCount(), 2)) {
              var ccp1 = $.index(cc.get$points(), 0);
              var ccp2 = $.index(cc.get$points(), 1);
              var invMassA = bodyA.get$invMass();
              var invIA = bodyA.get$invInertia();
              var invMassB = bodyB.get$invMass();
              var invIB = bodyB.get$invInertia();
              var rn1A = $.crossVectors(ccp1.get$rA(), cc.get$normal());
              var rn1B = $.crossVectors(ccp1.get$rB(), cc.get$normal());
              var rn2A = $.crossVectors(ccp2.get$rA(), cc.get$normal());
              var rn2B = $.crossVectors(ccp2.get$rB(), cc.get$normal());
              var k11 = $.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rn1A), rn1A)), $.mul($.mul(invIB, rn1B), rn1B));
              var k22 = $.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rn2A), rn2A)), $.mul($.mul(invIB, rn2B), rn2B));
              var k12 = $.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rn1A), rn2A)), $.mul($.mul(invIB, rn1B), rn2B));
              if ($.ltB($.mul(k11, k11), $.mul(100.0, $.sub($.mul(k11, k22), $.mul(k12, k12))))) {
                cc.get$K().get$col1().set$x(k11);
                cc.get$K().get$col1().set$y(k12);
                cc.get$K().get$col2().set$x(k12);
                cc.get$K().get$col2().set$y(k22);
                var t21 = cc.get$K().get$col1().get$x();
                cc.get$normalMass().get$col1().set$x(t21);
                var t22 = cc.get$K().get$col1().get$y();
                cc.get$normalMass().get$col1().set$y(t22);
                var t23 = cc.get$K().get$col2().get$x();
                cc.get$normalMass().get$col2().set$x(t23);
                var t24 = cc.get$K().get$col2().get$y();
                cc.get$normalMass().get$col2().set$y(t24);
                cc.get$normalMass().invertLocal$0();
              } else {
                cc.set$pointCount(1);
              }
            }
            i0 = i0 + 1;
        }
      }
  }
 },
 ContactSolver$0: function() {
  for (var i = 0; $.ltB(i, $.get$length(this.constraints)); i = i + 1) {
    $.indexSet(this.constraints, i, $.ContactConstraint$0());
  }
 }
});

Isolate.$defineClass("PositionSolverManifold", "Object", ["clipPoint", "planePoint", "temp", "pointB?", "pointA?", "separation=", "point?", "normal?"], {
 initialize$2: function(cc, index) {
  $.assert($.gt(cc.get$pointCount(), 0));
  $0:{
    var t0 = cc.get$type();
    if (0 === t0) {
      cc.get$bodyA().getWorldPointToOut$2(cc.get$localPoint(), this.pointA);
      cc.get$bodyB().getWorldPointToOut$2($.index(cc.get$points(), 0).get$localPoint(), this.pointB);
      if ($.gtB($.distanceSquared(this.pointA, this.pointB), 1.4208639999999999e-14)) {
        this.normal.setFrom$1(this.pointB).subLocal$1(this.pointA);
        this.normal.normalize$0();
      } else {
        this.normal.setCoords$2(1.0, 0.0);
      }
      this.point.setFrom$1(this.pointA).addLocal$1(this.pointB).mulLocal$1(0.5);
      this.temp.setFrom$1(this.pointB).subLocal$1(this.pointA);
      this.separation = $.sub($.dot(this.temp, this.normal), cc.get$radius());
      break $0;
    } else {
      if (1 === t0) {
        cc.get$bodyA().getWorldVectorToOut$2(cc.get$localNormal(), this.normal);
        cc.get$bodyA().getWorldPointToOut$2(cc.get$localPoint(), this.planePoint);
        cc.get$bodyB().getWorldPointToOut$2($.index(cc.get$points(), index).get$localPoint(), this.clipPoint);
        this.temp.setFrom$1(this.clipPoint).subLocal$1(this.planePoint);
        this.separation = $.sub($.dot(this.temp, this.normal), cc.get$radius());
        this.point.setFrom$1(this.clipPoint);
        break $0;
      } else {
        if (2 === t0) {
          cc.get$bodyB().getWorldVectorToOut$2(cc.get$localNormal(), this.normal);
          cc.get$bodyB().getWorldPointToOut$2(cc.get$localPoint(), this.planePoint);
          cc.get$bodyA().getWorldPointToOut$2($.index(cc.get$points(), index).get$localPoint(), this.clipPoint);
          this.temp.setFrom$1(this.clipPoint).subLocal$1(this.planePoint);
          this.separation = $.sub($.dot(this.temp, this.normal), cc.get$radius());
          this.point.setFrom$1(this.clipPoint);
          this.normal.negateLocal$0();
        }
      }
    }
  }
 }
});

Isolate.$defineClass("PolygonAndCircleContact", "Contact", ["_oldManifold", "pool", "toiCount", "manifold", "fixtureB", "fixtureA", "edge2", "edge1", "next", "prev", "flags"], {
 evaluate$3: function(argManifold, xfA, xfB) {
  this.pool.get$collision().collidePolygonAndCircle$5(argManifold, this.fixtureA.get$shape(), xfA, this.fixtureB.get$shape(), xfB);
 },
 init$2: function(fA, fB) {
  $.equals(1, fA.get$type(), (void 0));
  $.equals(0, fB.get$type(), (void 0));
  $.Contact.prototype.init$2.call(this, fA, fB);
 }
});

Isolate.$defineClass("PolygonContact", "Contact", ["_oldManifold", "pool", "toiCount", "manifold", "fixtureB", "fixtureA", "edge2", "edge1", "next", "prev", "flags"], {
 evaluate$3: function(argManifold, xfA, xfB) {
  this.pool.get$collision().collidePolygons$5(argManifold, this.fixtureA.get$shape(), xfA, this.fixtureB.get$shape(), xfB);
 },
 init$2: function(fA, fB) {
  $.equals(1, fA.get$type(), (void 0));
  $.equals(1, fB.get$type(), (void 0));
  $.Contact.prototype.init$2.call(this, fA, fB);
 }
});

Isolate.$defineClass("TimeOfImpactSolver", "Object", ["temp", "P", "rB?", "rA?", "psm", "toiBody", "count=", "constraints?"], {
 solve$1: function(baumgarte) {
  if (typeof baumgarte !== 'number') return this.solve$1$bailout(baumgarte,  0);
  for (var minSeparation = 0, i = 0; $.ltB(i, this.count); minSeparation = minSeparation0, i = i + 1) {
    var minSeparation0 = minSeparation;
    var c = $.index(this.constraints, i);
    var bodyA = c.get$bodyA();
    var bodyB = c.get$bodyB();
    var massA = bodyA.get$mass();
    var massB = bodyB.get$mass();
    if ($.eqB(bodyA, this.toiBody)) {
      var massA0 = massA;
      var massB0 = 0.0;
    } else {
      massA0 = 0.0;
      massB0 = massB;
    }
    var invMassA = $.mul(massA0, bodyA.get$invMass());
    if (typeof invMassA !== 'number') return this.solve$1$bailout(baumgarte, 2, massA0, massB0, c, baumgarte, i, bodyA, bodyB, minSeparation, invMassA);
    var invIA = $.mul(massA0, bodyA.get$invInertia());
    if (typeof invIA !== 'number') return this.solve$1$bailout(baumgarte, 3, massB0, c, baumgarte, i, invMassA, bodyA, bodyB, minSeparation, invIA);
    var invMassB = $.mul(massB0, bodyB.get$invMass());
    if (typeof invMassB !== 'number') return this.solve$1$bailout(baumgarte, 4, massB0, c, baumgarte, i, invIA, bodyA, invMassA, minSeparation, bodyB, invMassB);
    var invIB = $.mul(massB0, bodyB.get$invInertia());
    if (typeof invIB !== 'number') return this.solve$1$bailout(baumgarte, 5, c, baumgarte, i, invIA, invMassB, invMassA, bodyA, bodyB, minSeparation, invIB);
    var t0 = invMassA + invMassB;
    for (var j = 0, minSeparation1 = minSeparation; $.ltB(j, c.get$pointCount()); j = j + 1, minSeparation1 = minSeparation2) {
      var minSeparation2 = minSeparation1;
      this.psm.initialize$2(c, j);
      var normal = this.psm.get$normal();
      var point = this.psm.get$point();
      var separation = this.psm.get$separation();
      this.rA.setFrom$1(point).subLocal$1(bodyA.get$sweep().get$center());
      this.rB.setFrom$1(point).subLocal$1(bodyB.get$sweep().get$center());
      var minSeparation3 = $.min(minSeparation1, separation);
      var C = $.clamp($.mul(baumgarte, $.add(separation, 0.005)), -0.2, 0.0);
      var rnA = $.crossVectors(this.rA, normal);
      var rnB = $.crossVectors(this.rB, normal);
      var K = t0 + $.mul($.mul(invIA, rnA), rnA) + $.mul($.mul(invIB, rnB), rnB);
      if (K > 0.0) {
        var impulse = $.div($.neg(C), K);
      } else {
        impulse = 0.0;
      }
      this.P.setFrom$1(normal).mulLocal$1(impulse);
      this.temp.setFrom$1(this.P).mulLocal$1(invMassA);
      bodyA.get$sweep().get$center().subLocal$1(this.temp);
      var t1 = bodyA.get$sweep();
      t1.set$angle($.sub(t1.get$angle(), $.mul(invIA, $.crossVectors(this.rA, this.P))));
      bodyA.synchronizeTransform$0();
      this.temp.setFrom$1(this.P).mulLocal$1(invMassB);
      bodyB.get$sweep().get$center().addLocal$1(this.temp);
      var t2 = bodyB.get$sweep();
      t2.set$angle($.add(t2.get$angle(), $.mul(invIB, $.crossVectors(this.rB, this.P))));
      bodyB.synchronizeTransform$0();
      minSeparation2 = minSeparation3;
    }
    minSeparation0 = minSeparation1;
  }
  return $.ge(minSeparation, -0.0075);
 },
 solve$1$bailout: function(baumgarte, state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      massA0 = env0;
      massB0 = env1;
      c = env2;
      t0 = env3;
      i = env4;
      bodyA = env5;
      bodyB = env6;
      minSeparation = env7;
      invMassA = env8;
      break;
    case 3:
      massB0 = env0;
      c = env1;
      t0 = env2;
      i = env3;
      invMassA = env4;
      bodyA = env5;
      bodyB = env6;
      minSeparation = env7;
      invIA = env8;
      break;
    case 4:
      massB0 = env0;
      c = env1;
      t0 = env2;
      i = env3;
      invIA = env4;
      bodyA = env5;
      invMassA = env6;
      minSeparation = env7;
      bodyB = env8;
      invMassB = env9;
      break;
    case 5:
      c = env0;
      t0 = env1;
      i = env2;
      invIA = env3;
      invMassB = env4;
      invMassA = env5;
      bodyA = env6;
      bodyB = env7;
      minSeparation = env8;
      invIB = env9;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var minSeparation = 0;
      var i = 0;
    case 2:
    case 3:
    case 4:
    case 5:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, this.count)) break L0;
            var minSeparation0 = minSeparation;
            var c = $.index(this.constraints, i);
            var bodyA = c.get$bodyA();
            var bodyB = c.get$bodyB();
            var massA = bodyA.get$mass();
            var massB = bodyB.get$mass();
            if ($.eqB(bodyA, this.toiBody)) {
              var massA0 = massA;
              var massB0 = 0.0;
            } else {
              massA0 = 0.0;
              massB0 = massB;
            }
            var invMassA = $.mul(massA0, bodyA.get$invMass());
          case 2:
            state = 0;
            var invIA = $.mul(massA0, bodyA.get$invInertia());
          case 3:
            state = 0;
            var invMassB = $.mul(massB0, bodyB.get$invMass());
          case 4:
            state = 0;
            var invIB = $.mul(massB0, bodyB.get$invInertia());
          case 5:
            state = 0;
            var j = 0;
            var minSeparation1 = minSeparation;
            L1: while (true) {
              if (!$.ltB(j, c.get$pointCount())) break L1;
              var minSeparation2 = minSeparation1;
              this.psm.initialize$2(c, j);
              var normal = this.psm.get$normal();
              var point = this.psm.get$point();
              var separation = this.psm.get$separation();
              this.rA.setFrom$1(point).subLocal$1(bodyA.get$sweep().get$center());
              this.rB.setFrom$1(point).subLocal$1(bodyB.get$sweep().get$center());
              var minSeparation3 = $.min(minSeparation1, separation);
              var C = $.clamp($.mul(baumgarte, $.add(separation, 0.005)), -0.2, 0.0);
              var rnA = $.crossVectors(this.rA, normal);
              var rnB = $.crossVectors(this.rB, normal);
              var K = $.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rnA), rnA)), $.mul($.mul(invIB, rnB), rnB));
              if ($.gtB(K, 0.0)) {
                var impulse = $.div($.neg(C), K);
              } else {
                impulse = 0.0;
              }
              this.P.setFrom$1(normal).mulLocal$1(impulse);
              this.temp.setFrom$1(this.P).mulLocal$1(invMassA);
              bodyA.get$sweep().get$center().subLocal$1(this.temp);
              var t1 = bodyA.get$sweep();
              t1.set$angle($.sub(t1.get$angle(), $.mul(invIA, $.crossVectors(this.rA, this.P))));
              bodyA.synchronizeTransform$0();
              this.temp.setFrom$1(this.P).mulLocal$1(invMassB);
              bodyB.get$sweep().get$center().addLocal$1(this.temp);
              var t2 = bodyB.get$sweep();
              t2.set$angle($.add(t2.get$angle(), $.mul(invIB, $.crossVectors(this.rB, this.P))));
              bodyB.synchronizeTransform$0();
              minSeparation2 = minSeparation3;
              j = j + 1;
              minSeparation1 = minSeparation2;
            }
            minSeparation0 = minSeparation1;
            minSeparation = minSeparation0;
            i = i + 1;
        }
      }
      return $.ge(minSeparation, -0.0075);
  }
 },
 initialize$3: function(contacts, argCount, argToiBody) {
  if (typeof contacts !== 'string' && (typeof contacts !== 'object'||contacts.constructor !== Array)) return this.initialize$3$bailout(contacts, argCount, argToiBody,  0);
  this.count = argCount;
  this.toiBody = argToiBody;
  if ($.geB(this.count, $.get$length(this.constraints))) {
    var old = this.constraints;
    var t0 = $.List($.max(this.count, $.mul($.get$length(old), 2)));
    $.setRuntimeTypeInfo(t0, ({E: 'TimeOfImpactConstraint'}));
    this.constraints = t0;
    $.setRange$3(this.constraints, 0, $.get$length(old), old);
    for (var i = $.get$length(old); $.ltB(i, $.get$length(this.constraints)); i = $.add(i, 1)) {
      $.indexSet(this.constraints, i, $.TimeOfImpactConstraint$0());
    }
  }
  for (var i0 = 0; $.ltB(i0, this.count); i0 = i0 + 1) {
    var t1 = contacts.length;
    if (i0 < 0 || i0 >= t1) throw $.ioore(i0);
    var t2 = contacts[i0];
    var fixtureA = t2.get$fixtureA();
    var fixtureB = t2.get$fixtureB();
    var shapeA = fixtureA.get$shape();
    var shapeB = fixtureB.get$shape();
    var radiusA = shapeA.get$radius();
    var radiusB = shapeB.get$radius();
    var bodyA = fixtureA.get$body();
    var bodyB = fixtureB.get$body();
    var manifold = t2.get$manifold();
    $.assert($.gt(manifold.get$pointCount(), 0));
    var constraint = $.index(this.constraints, i0);
    constraint.set$bodyA(bodyA);
    constraint.set$bodyB(bodyB);
    constraint.get$localNormal().setFrom$1(manifold.get$localNormal());
    constraint.get$localPoint().setFrom$1(manifold.get$localPoint());
    constraint.set$type(manifold.get$type());
    constraint.set$pointCount(manifold.get$pointCount());
    constraint.set$radius($.add(radiusA, radiusB));
    for (var j = 0; $.ltB(j, constraint.get$pointCount()); j = j + 1) {
      var cp = $.index(manifold.get$points(), j);
      $.indexSet(constraint.get$localPoints(), j, cp.get$localPoint());
    }
  }
 },
 initialize$3$bailout: function(contacts, argCount, argToiBody, state, env0) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      this.count = argCount;
      this.toiBody = argToiBody;
      if ($.geB(this.count, $.get$length(this.constraints))) {
        var old = this.constraints;
        var t1 = $.List($.max(this.count, $.mul($.get$length(old), 2)));
        $.setRuntimeTypeInfo(t1, ({E: 'TimeOfImpactConstraint'}));
        this.constraints = t1;
        $.setRange$3(this.constraints, 0, $.get$length(old), old);
        var i = $.get$length(old);
        L0: while (true) {
          if (!$.ltB(i, $.get$length(this.constraints))) break L0;
          $.indexSet(this.constraints, i, $.TimeOfImpactConstraint$0());
          i = $.add(i, 1);
        }
      }
      var i0 = 0;
      L1: while (true) {
        if (!$.ltB(i0, this.count)) break L1;
        var contact = $.index(contacts, i0);
        var fixtureA = contact.get$fixtureA();
        var fixtureB = contact.get$fixtureB();
        var shapeA = fixtureA.get$shape();
        var shapeB = fixtureB.get$shape();
        var radiusA = shapeA.get$radius();
        var radiusB = shapeB.get$radius();
        var bodyA = fixtureA.get$body();
        var bodyB = fixtureB.get$body();
        var manifold = contact.get$manifold();
        $.assert($.gt(manifold.get$pointCount(), 0));
        var constraint = $.index(this.constraints, i0);
        constraint.set$bodyA(bodyA);
        constraint.set$bodyB(bodyB);
        constraint.get$localNormal().setFrom$1(manifold.get$localNormal());
        constraint.get$localPoint().setFrom$1(manifold.get$localPoint());
        constraint.set$type(manifold.get$type());
        constraint.set$pointCount(manifold.get$pointCount());
        constraint.set$radius($.add(radiusA, radiusB));
        var j = 0;
        L2: while (true) {
          if (!$.ltB(j, constraint.get$pointCount())) break L2;
          var cp = $.index(manifold.get$points(), j);
          $.indexSet(constraint.get$localPoints(), j, cp.get$localPoint());
          j = j + 1;
        }
        i0 = i0 + 1;
      }
  }
 },
 TimeOfImpactSolver$0: function() {
  for (var i = 0; $.ltB(i, $.get$length(this.constraints)); i = i + 1) {
    $.indexSet(this.constraints, i, $.TimeOfImpactConstraint$0());
  }
 }
});

Isolate.$defineClass("TimeOfImpactSolverManifold", "Object", ["clipPoint", "planePoint", "temp", "pointB?", "pointA?", "separation=", "point?", "normal?"], {
 initialize$2: function(cc, index) {
  $.assert($.gt(cc.get$pointCount(), 0));
  $0:{
    var t0 = cc.get$type();
    if (0 === t0) {
      this.pointA.setFrom$1(cc.get$bodyA().getWorldPoint$1(cc.get$localPoint()));
      this.pointB.setFrom$1(cc.get$bodyB().getWorldPoint$1($.index(cc.get$localPoints(), 0)));
      if ($.gtB($.distanceSquared(this.pointA, this.pointB), 1.4208639999999999e-14)) {
        this.normal.setFrom$1(this.pointB).subLocal$1(this.pointA);
        this.normal.normalize$0();
      } else {
        this.normal.setCoords$2(1, 0);
      }
      this.point.setFrom$1(this.pointA).addLocal$1(this.pointB).mulLocal$1(0.5);
      this.temp.setFrom$1(this.pointB).subLocal$1(this.pointA);
      this.separation = $.sub($.dot(this.temp, this.normal), cc.get$radius());
      break $0;
    } else {
      if (1 === t0) {
        this.normal.setFrom$1(cc.get$bodyA().getWorldVector$1(cc.get$localNormal()));
        this.planePoint.setFrom$1(cc.get$bodyA().getWorldPoint$1(cc.get$localPoint()));
        this.clipPoint.setFrom$1(cc.get$bodyB().getWorldPoint$1($.index(cc.get$localPoints(), index)));
        this.temp.setFrom$1(this.clipPoint).subLocal$1(this.planePoint);
        this.separation = $.sub($.dot(this.temp, this.normal), cc.get$radius());
        this.point.setFrom$1(this.clipPoint);
        break $0;
      } else {
        if (2 === t0) {
          this.normal.setFrom$1(cc.get$bodyB().getWorldVector$1(cc.get$localNormal()));
          this.planePoint.setFrom$1(cc.get$bodyB().getWorldPoint$1(cc.get$localPoint()));
          this.clipPoint.setFrom$1(cc.get$bodyA().getWorldPoint$1($.index(cc.get$localPoints(), index)));
          this.temp.setFrom$1(this.clipPoint).subLocal$1(this.planePoint);
          this.separation = $.sub($.dot(this.temp, this.normal), cc.get$radius());
          this.point.setFrom$1(this.clipPoint);
          this.normal.negateLocal$0();
          break $0;
        }
      }
    }
  }
 }
});

Isolate.$defineClass("TimeOfImpactConstraint", "Object", ["bodyB=", "bodyA=", "pointCount=", "radius=", "type=", "localPoint?", "localNormal?", "localPoints?"], {
 setFrom$1: function(argOther) {
  for (var i = 0; $.ltB(i, $.get$length(this.localPoints)); i = i + 1) {
    $.index(this.localPoints, i).setFrom$1($.index(argOther.get$localPoints(), i));
  }
  this.localNormal.setFrom$1(argOther.get$localNormal());
  this.localPoint.setFrom$1(argOther.get$localPoint());
  this.type = argOther.get$type();
  this.radius = argOther.get$radius();
  this.pointCount = argOther.get$pointCount();
  this.bodyA = argOther.get$bodyA();
  this.bodyB = argOther.get$bodyB();
 },
 TimeOfImpactConstraint$0: function() {
  for (var i = 0; $.ltB(i, $.get$length(this.localPoints)); i = i + 1) {
    $.indexSet(this.localPoints, i, $.Vector$2(0, 0));
  }
 }
});

Isolate.$defineClass("DefaultWorldPool", "Object", ["distance=", "timeOfImpact?", "collision?"], {
 getPolyContactStack$0: function() {
  var queue = $.DoubleLinkedQueue$0();
  $.setRuntimeTypeInfo(queue, ({E: 'PolygonContact'}));
  for (var i = 0; i < 10; i = i + 1) {
    queue.addFirst$1($.PolygonContact$1(this));
  }
  return queue;
 },
 getPolyCircleContactStack$0: function() {
  var queue = $.DoubleLinkedQueue$0();
  $.setRuntimeTypeInfo(queue, ({E: 'PolygonAndCircleContact'}));
  for (var i = 0; i < 10; i = i + 1) {
    queue.addFirst$1($.PolygonAndCircleContact$1(this));
  }
  return queue;
 },
 getCircleContactStack$0: function() {
  var queue = $.DoubleLinkedQueue$0();
  $.setRuntimeTypeInfo(queue, ({E: 'CircleContact'}));
  for (var i = 0; i < 10; i = i + 1) {
    queue.addFirst$1($.CircleContact$1(this));
  }
  return queue;
 },
 distance$3: function(arg0, arg1, arg2) { return this.distance.$call$3(arg0, arg1, arg2); },
 timeOfImpact$2: function(arg0, arg1) { return this.timeOfImpact.$call$2(arg0, arg1); },
 DefaultWorldPool$0: function() {
  this.distance = $.Distance$_construct$0();
  this.collision = $.Collision$_construct$1(this);
  this.timeOfImpact = $.TimeOfImpact$_construct$1(this);
 }
});

Isolate.$defineClass("Color3", "Object", ["z?", "y=", "x="], {
 setFrom$1: function(argColor) {
  this.x = argColor.get$x();
  this.y = argColor.get$y();
  this.z = argColor.get$z();
 },
 setFromRGB$3: function(r, g, b) {
  this.x = r;
  this.y = g;
  this.z = b;
 }
});

Isolate.$defineClass("CanvasViewportTransform", "Object", ["scale=", "center?", "extents"], {
 getWorldToScreen$2: function(argWorld, argScreen) {
  var gridCorrectedX = $.add($.mul(argWorld.get$x(), this.scale), this.extents.get$x());
  var gridCorrectedY = $.sub(this.extents.get$y(), $.mul(argWorld.get$y(), this.scale));
  argScreen.setCoords$2($.add(gridCorrectedX, this.get$translation().get$x()), $.add(gridCorrectedY, $.neg(this.get$translation().get$y())));
 },
 get$translation: function() {
  var result = $.Vector$copy$1(this.extents);
  result.subLocal$1(this.center);
  return result;
 }
});

Isolate.$defineClass("Matrix22", "Object", ["col2?", "col1?"], {
 toString$0: function() {
  return $.add($.add($.toString(this.col1), ', '), $.toString(this.col2));
 },
 addLocal$1: function(other) {
  var t0 = this.col1;
  t0.set$x($.add(t0.get$x(), other.get$col1().get$x()));
  var t1 = this.col1;
  t1.set$y($.add(t1.get$y(), other.get$col1().get$y()));
  var t2 = this.col2;
  t2.set$x($.add(t2.get$x(), other.get$col2().get$x()));
  var t3 = this.col2;
  t3.set$y($.add(t3.get$y(), other.get$col2().get$y()));
  return this;
 },
 invertLocal$0: function() {
  var a = this.col1.get$x();
  var b = this.col2.get$x();
  var c = this.col1.get$y();
  var d = this.col2.get$y();
  var det = $.sub($.mul(a, d), $.mul(b, c));
  var det0 = det;
  if (!$.eqB(det, 0)) {
    det0 = $.div(1.0, det);
  }
  var t0 = $.mul(det0, d);
  this.col1.set$x(t0);
  var t1 = $.mul($.neg(det0), b);
  this.col2.set$x(t1);
  var t2 = $.mul($.neg(det0), c);
  this.col1.set$y(t2);
  var t3 = $.mul(det0, a);
  this.col2.set$y(t3);
  return this;
 },
 setFrom$1: function(matrix) {
  this.col1.setFrom$1(matrix.get$col1());
  this.col2.setFrom$1(matrix.get$col2());
 },
 setAngle$1: function(angle) {
  var cosin = $.cos(angle);
  var sin = $.sin(angle);
  this.col1.setCoords$2(cosin, sin);
  this.col2.setCoords$2($.neg(sin), cosin);
 },
 operator$eq$1: function(other) {
  if (!$.eqNullB(other) && (typeof other === 'object' && !!other.is$Matrix22)) {
    return $.eqB(this.col1, other.get$col1()) && $.eqB(this.col2, other.get$col2());
  } else {
    return false;
  }
 },
 Matrix22$2: function(c1, c2) {
  var c10 = c1;
  if ($.eqNullB(c1)) {
    c10 = $.Vector$2(0, 0);
  }
  var c20 = c2;
  if ($.eqNullB(c2)) {
    c20 = $.Vector$2(0, 0);
  }
  this.col1 = c10;
  this.col2 = c20;
 },
 is$Matrix22: true
});

Isolate.$defineClass("Sweep", "Object", ["angle=", "angleZero=", "center?", "centerZero?", "localCenter?"], {
 advance$1: function(time) {
  var t0 = $.add($.mul($.sub(1, time), this.centerZero.get$x()), $.mul(time, this.center.get$x()));
  this.centerZero.set$x(t0);
  var t1 = $.add($.mul($.sub(1, time), this.centerZero.get$y()), $.mul(time, this.center.get$y()));
  this.centerZero.set$y(t1);
  this.angleZero = $.add($.mul($.sub(1, time), this.angleZero), $.mul(time, this.angle));
 },
 getTransform$2: function(xf, alpha) {
  $.assert(!$.eqNullB(xf));
  var t0 = $.add($.mul($.sub(1.0, alpha), this.centerZero.get$x()), $.mul(alpha, this.center.get$x()));
  xf.get$position().set$x(t0);
  var t1 = $.add($.mul($.sub(1.0, alpha), this.centerZero.get$y()), $.mul(alpha, this.center.get$y()));
  xf.get$position().set$y(t1);
  xf.get$rotation().setAngle$1($.add($.mul($.sub(1.0, alpha), this.angleZero), $.mul(alpha, this.angle)));
  var t2 = xf.get$position();
  t2.set$x($.sub(t2.get$x(), $.add($.mul(xf.get$rotation().get$col1().get$x(), this.localCenter.get$x()), $.mul(xf.get$rotation().get$col2().get$x(), this.localCenter.get$y()))));
  var t3 = xf.get$position();
  t3.set$y($.sub(t3.get$y(), $.add($.mul(xf.get$rotation().get$col1().get$y(), this.localCenter.get$x()), $.mul(xf.get$rotation().get$col2().get$y(), this.localCenter.get$y()))));
 },
 normalize$0: function() {
  var d = $.mul(6.283185307179586, $.floor($.div(this.angleZero, 6.283185307179586)));
  this.angleZero = $.sub(this.angleZero, d);
  this.angle = $.sub(this.angle, d);
 },
 setFrom$1: function(other) {
  this.localCenter.setFrom$1(other.get$localCenter());
  this.centerZero.setFrom$1(other.get$centerZero());
  this.center.setFrom$1(other.get$center());
  this.angleZero = other.get$angleZero();
  this.angle = other.get$angle();
 },
 operator$eq$1: function(other) {
  return $.eqB(this.localCenter, other.get$localCenter()) && $.eqB(this.centerZero, other.get$centerZero()) && $.eqB(this.center, other.get$center()) && $.eqB(this.angleZero, other.get$angleZero()) && $.eqB(this.angle, other.get$angle());
 }
});

Isolate.$defineClass("Transform", "Object", ["rotation?", "position?"], {
 setFrom$1: function(other) {
  this.position.setFrom$1(other.get$position());
  this.rotation.setFrom$1(other.get$rotation());
 },
 operator$eq$1: function(other) {
  if ($.eqNullB(other)) {
    return false;
  } else {
    return $.eqB(this.position, other.get$position()) && $.eqB(this.rotation, other.get$rotation());
  }
 }
});

Isolate.$defineClass("Vector", "Object", ["y=", "x="], {
 toString$0: function() {
  return $.add($.add('(', this.x) + ', ', this.y) + ')';
 },
 negateLocal$0: function() {
  this.x = $.neg(this.x);
  this.y = $.neg(this.y);
  return this;
 },
 normalize$0: function() {
  var len = $.get$length(this);
  if ($.ltB(len, 1.192e-7)) {
    return 0;
  }
  var invLength = $.div(1.0, len);
  this.x = $.mul(this.x, invLength);
  this.y = $.mul(this.y, invLength);
  return len;
 },
 absLocal$0: function() {
  this.x = $.abs(this.x);
  this.y = $.abs(this.y);
 },
 get$lengthSquared: function() {
  return $.add($.mul(this.x, this.x), $.mul(this.y, this.y));
 },
 get$length: function() {
  return $.sqrt(this.get$lengthSquared());
 },
 setZero$0: function() {
  this.setCoords$2(0, 0);
  return this;
 },
 mulLocal$1: function(d) {
  this.x = $.mul(this.x, d);
  this.y = $.mul(this.y, d);
  return this;
 },
 setFrom$1: function(v) {
  this.setCoords$2(v.get$x(), v.get$y());
  return this;
 },
 setCoords$2: function(xCoord, yCoord) {
  this.x = xCoord;
  this.y = yCoord;
  return this;
 },
 subLocal$1: function(other) {
  this.x = $.sub(this.x, other.get$x());
  this.y = $.sub(this.y, other.get$y());
  return this;
 },
 addLocal$1: function(v) {
  this.x = $.add(this.x, v.get$x());
  this.y = $.add(this.y, v.get$y());
  return this;
 },
 operator$eq$1: function(other) {
  if ($.eqNullB(other)) {
    return false;
  } else {
    return $.eqB(this.x, other.get$x()) && $.eqB(this.y, other.get$y());
  }
 }
});

Isolate.$defineClass("Closure", "Closure13", ["this_0"], {
 $call$1: function(time) {
  this.this_0.step$1(time);
 }
});

Isolate.$defineClass("Closure2", "Closure13", ["box_0"], {
 $call$0: function() {
  return this.box_0.closure_1.$call$0();
 }
});

Isolate.$defineClass("Closure3", "Closure13", ["box_0"], {
 $call$0: function() {
  return this.box_0.closure_1.$call$1(this.box_0.arg1_2);
 }
});

Isolate.$defineClass("Closure4", "Closure13", ["box_0"], {
 $call$0: function() {
  return this.box_0.closure_1.$call$2(this.box_0.arg1_2, this.box_0.arg2_3);
 }
});

Isolate.$defineClass("Closure5", "Closure13", ["box_0"], {
 $call$2: function(k, v) {
  if (this.box_0.first_3 !== true) {
    $.add$1(this.box_0.result_1, ', ');
  }
  this.box_0.first_3 = false;
  $._emitObject(k, this.box_0.result_1, this.box_0.visiting_2);
  $.add$1(this.box_0.result_1, ': ');
  $._emitObject(v, this.box_0.result_1, this.box_0.visiting_2);
 }
});

Isolate.$defineClass("Closure6", "Closure13", ["this_0"], {
 $call$1: function(time) {
  this.this_0.step$1(time);
 }
});

Isolate.$defineClass("Closure7", "Closure13", ["this_0"], {
 $call$0: function() {
  var t0 = this.this_0.get$frameCount();
  this.this_0.set$fps(t0);
  this.this_0.set$frameCount(0);
 }
});

Isolate.$defineClass("Closure8", "Closure13", ["box_0"], {
 $call$1: function(element) {
  var counter = $.add(this.box_0.counter_1, 1);
  this.box_0.counter_1 = counter;
 }
});

Isolate.$defineClass("Closure9", "Closure13", [], {
 $call$2: function(a, b) {
  return $.compareTo(a, b);
 }
});

Isolate.$defineClass("Closure10", "Closure13", ["box_0"], {
 $call$2: function(key, value) {
  this.box_0.f_1.$call$1(key);
 }
});

Isolate.$defineClass("Closure11", "Closure13", ["box_0"], {
 $call$2: function(key, value) {
  if (this.box_0.f_1.$call$1(key) === true) {
    $.add$1(this.box_0.result_2, key);
  }
 }
});

Isolate.$defineClass('Closure12', 'Closure13', function BoundClosure(self) { this.self = self; }, {
 $call$1: function(arg0) { return this.self.filter$1(arg0); }
});
Isolate.$defineClass('Closure14', 'Closure13', function BoundClosure(self) { this.self = self; }, {
 $call$0: function() { return this.self.next$0(); }
});
Isolate.$defineClass('Closure15', 'Closure13', function BoundClosure(self) { this.self = self; }, {
 $call$1: function(arg0) { return this.self.filter$1(arg0); }
});
Isolate.$defineClass('Closure16', 'Closure13', function BoundClosure(self) { this.self = self; }, {
 $call$0: function() { return this.self.next$0(); }
});
Isolate.$defineClass('Closure17', 'Closure13', function BoundClosure(self) { this.self = self; }, {
 $call$0: function() { return this.self.next$0(); }
});
Isolate.$defineClass('Closure18', 'Closure13', function BoundClosure(self) { this.self = self; }, {
 $call$0: function() { return this.self.next$0(); }
});
Isolate.$defineClass('Closure19', 'Closure13', function BoundClosure(self) { this.self = self; }, {
 $call$3: function(arg0, arg1, arg2) { return this.self.scale$3(arg0, arg1, arg2); }
});
Isolate.$defineClass('Closure20', 'Closure13', function BoundClosure(self) { this.self = self; }, {
 $call$2: function(arg0, arg1) { return this.self.scale$2(arg0, arg1); }
});
Isolate.$defineClass('Closure21', 'Closure13', function BoundClosure(self) { this.self = self; }, {
 $call$0: function() { return this.self.count$0(); }
});
Isolate.$defineClass('Closure22', 'Closure13', function BoundClosure(self) { this.self = self; }, {
 $call$1: function(arg0) { return this.self.filter$1(arg0); }
});
Isolate.$defineClass('Closure23', 'Closure13', function BoundClosure(self) { this.self = self; }, {
 $call$1: function(arg0) { return this.self.filter$1(arg0); }
});
Isolate.$defineClass('Closure24', 'Closure13', function BoundClosure(self) { this.self = self; }, {
 $call$1: function(arg0) { return this.self.filter$1(arg0); }
});
Isolate.$defineClass('Closure25', 'Closure13', function BoundClosure(self) { this.self = self; }, {
 $call$1: function(arg0) { return this.self.filter$1(arg0); }
});
Isolate.$defineClass('Closure26', 'Closure13', function BoundClosure(self) { this.self = self; }, {
 $call$1: function(arg0) { return this.self.filter$1(arg0); }
});
Isolate.$defineClass('Closure27', 'Closure13', function BoundClosure(self) { this.self = self; }, {
 $call$1: function(arg0) { return this.self.count$1(arg0); },
 $call$0: function() {
  return this.$call$1((void 0))
}
});
Isolate.$defineClass('Closure28', 'Closure13', function BoundClosure(self) { this.self = self; }, {
 $call$1: function(arg0) { return this.self.count$1(arg0); },
 $call$0: function() {
  return this.$call$1((void 0))
}
});
Isolate.$defineClass('Closure29', 'Closure13', function BoundClosure(self) { this.self = self; }, {
 $call$1: function(arg0) { return this.self.filter$1(arg0); }
});
Isolate.$defineClass('Closure30', 'Closure13', function BoundClosure(self) { this.self = self; }, {
 $call$1: function(arg0) { return this.self.filter$1(arg0); }
});
Isolate.$defineClass('Closure31', 'Closure13', function BoundClosure(self) { this.self = self; }, {
 $call$1: function(arg0) { return this.self.filter$1(arg0); }
});
Isolate.$defineClass('Closure32', 'Closure13', function BoundClosure(self) { this.self = self; }, {
 $call$1: function(arg0) { return this.self.filter$1(arg0); }
});
Isolate.$defineClass('Closure33', 'Closure13', function BoundClosure(self) { this.self = self; }, {
 $call$1: function(arg0) { return this.self.filter$1(arg0); }
});
Isolate.$defineClass('Closure34', 'Closure13', function BoundClosure(self) { this.self = self; }, {
 $call$1: function(arg0) { return this.self.filter$1(arg0); }
});
Isolate.$defineClass('Closure35', 'Closure13', function BoundClosure(self) { this.self = self; }, {
 $call$1: function(arg0) { return this.self.filter$1(arg0); }
});
Isolate.$defineClass('Closure36', 'Closure13', function BoundClosure(self) { this.self = self; }, {
 $call$1: function(arg0) { return this.self.filter$1(arg0); }
});
Isolate.$defineClass('Closure37', 'Closure13', function BoundClosure(self) { this.self = self; }, {
 $call$1: function(arg0) { return this.self.filter$1(arg0); }
});
Isolate.$defineClass('Closure38', 'Closure13', function BoundClosure(self) { this.self = self; }, {
 $call$1: function(arg0) { return this.self.scale$1(arg0); }
});
Isolate.$defineClass('Closure39', 'Closure13', function BoundClosure(self) { this.self = self; }, {
 $call$1: function(arg0) { return this.self.filter$1(arg0); }
});
Isolate.$defineClass('Closure40', 'Closure13', function BoundClosure(self) { this.self = self; }, {
 $call$1: function(arg0) { return this.self.filter$1(arg0); }
});
Isolate.$defineClass('Closure41', 'Closure13', function BoundClosure(self) { this.self = self; }, {
 $call$1: function(arg0) { return this.self.filter$1(arg0); }
});
Isolate.$defineClass('Closure42', 'Closure13', function BoundClosure(self) { this.self = self; }, {
 $call$1: function(arg0) { return this.self.filter$1(arg0); }
});
Isolate.$defineClass('Closure43', 'Closure13', function BoundClosure(self) { this.self = self; }, {
 $call$1: function(arg0) { return this.self.filter$1(arg0); }
});
Isolate.$defineClass('Closure44', 'Closure13', function BoundClosure(self) { this.self = self; }, {
 $call$0: function() { return this.self.next$0(); }
});
Isolate.$defineClass('Closure45', 'Closure13', function BoundClosure(self) { this.self = self; }, {
 $call$3: function(arg0, arg1, arg2) { return this.self.distance$3(arg0, arg1, arg2); }
});
Isolate.$defineClass('Closure46', 'Closure13', function BoundClosure(self) { this.self = self; }, {
 $call$2: function(arg0, arg1) { return this.self.timeOfImpact$2(arg0, arg1); }
});
$.setRange$3 = function(receiver, start, length$, from) {
  if ($.isJsArray(receiver) === true) {
    return $.setRange$4(receiver, start, length$, from, 0);
  }
  return receiver.setRange$3(start, length$, from);
};

$._ChildNodeListLazy$1 = function(_this) {
  return new $._ChildNodeListLazy(_this);
};

$.floor = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.floor$0();
  }
  return Math.floor(receiver);
};

$.Color3$fromRGB$3 = function(r, g, b) {
  return new $.Color3(b, g, r);
};

$.eqB = function(a, b) {
  return $.eq(a, b) === true;
};

$.crossVectorAndNumToOut = function(a, s, out) {
  var tempy = $.mul($.neg(s), a.get$x());
  out.set$x($.mul(s, a.get$y()));
  out.set$y(tempy);
};

$._containsRef = function(c, ref) {
  for (var t0 = $.iterator(c); t0.hasNext$0() === true; ) {
    if (t0.next$0() === ref) {
      return true;
    }
  }
  return false;
};

$.distanceSquared = function(v1, v2) {
  var dx = $.sub(v1.get$x(), v2.get$x());
  var dy = $.sub(v1.get$y(), v2.get$y());
  return $.add($.mul(dx, dx), $.mul(dy, dy));
};

$.SeparationFunction$0 = function() {
  var t0 = $.DistanceProxy$0();
  var t1 = $.DistanceProxy$0();
  var t2 = $.Vector$2(0, 0);
  var t3 = $.Vector$2(0, 0);
  var t4 = $.Sweep$0();
  var t5 = $.Sweep$0();
  var t6 = $.Vector$2(0, 0);
  var t7 = $.Vector$2(0, 0);
  var t8 = $.Vector$2(0, 0);
  var t9 = $.Vector$2(0, 0);
  var t10 = $.Vector$2(0, 0);
  var t11 = $.Vector$2(0, 0);
  var t12 = $.Vector$2(0, 0);
  var t13 = $.Vector$2(0, 0);
  var t14 = $.Vector$2(0, 0);
  var t15 = $.Vector$2(0, 0);
  var t16 = $.Transform$0();
  var t17 = $.Transform$0();
  var t18 = $.Vector$2(0, 0);
  return new $.SeparationFunction(t17, t16, t15, $.Vector$2(0, 0), t18, t14, t13, t12, t11, t10, t9, t8, t7, t6, t5, t4, t3, t2, 0, t1, t0);
};

$._NodeListWrapper$1 = function(list) {
  return new $._NodeListWrapper(list);
};

$.crossVectors = function(v1, v2) {
  return $.sub($.mul(v1.get$x(), v2.get$y()), $.mul(v1.get$y(), v2.get$x()));
};

$.isJsArray = function(value) {
  return !(value === (void 0)) && (value.constructor === Array);
};

$._nextProbe = function(currentProbe, numberOfProbes, length$) {
  return $.and($.add(currentProbe, numberOfProbes), $.sub(length$, 1));
};

$.allMatches = function(receiver, str) {
  if (!(typeof receiver === 'string')) {
    return receiver.allMatches$1(str);
  }
  $.checkString(str);
  return $.allMatchesInStringUnchecked(receiver, str);
};

$.substringUnchecked = function(receiver, startIndex, endIndex) {
  return receiver.substring(startIndex, endIndex);
};

$.maxToOut = function(a, b, out) {
  if ($.gtB(a.get$x(), b.get$x())) {
    var t0 = a.get$x();
  } else {
    t0 = b.get$x();
  }
  out.set$x(t0);
  if ($.gtB(a.get$y(), b.get$y())) {
    var t1 = a.get$y();
  } else {
    t1 = b.get$y();
  }
  out.set$y(t1);
};

$.get$length = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) {
    return receiver.length;
  } else {
    return receiver.get$length();
  }
};

$.TimeOfImpact$_construct$1 = function(argPool) {
  var t0 = $.SimplexCache$0();
  var t1 = $.DistanceInput$0();
  var t2 = $.Transform$0();
  var t3 = $.Transform$0();
  var t4 = $.DistanceOutput$0();
  var t5 = $.SeparationFunction$0();
  var t6 = $.List(2);
  $.setRuntimeTypeInfo(t6, ({E: 'int'}));
  var t7 = $.Sweep$0();
  var t8 = new $.TimeOfImpact(argPool, $.Sweep$0(), t7, t6, t5, t4, t3, t2, t1, t0);
  t8.TimeOfImpact$_construct$1(argPool);
  return t8;
};

$.IllegalJSRegExpException$2 = function(_pattern, _errmsg) {
  return new $.IllegalJSRegExpException(_errmsg, _pattern);
};

$.EdgeResults$0 = function() {
  return new $.EdgeResults(0, 0);
};

$.Body$2 = function(bd, world) {
  var t0 = $.Transform$0();
  var t1 = $.Sweep$0();
  var t2 = $.Vector$copy$1(bd.get$linearVelocity());
  var t3 = bd.get$linearDamping();
  var t4 = bd.get$angularDamping();
  var t5 = $.Vector$2(0, 0);
  var t6 = bd.get$userData();
  var t7 = $.FixtureDef$0();
  var t8 = $.MassData$0();
  var t9 = $.Transform$0();
  var t10 = $.Vector$2(0, 0);
  var t11 = new $.Body($.Vector$2(0, 0), t10, t9, t8, t7, t1, t0, (void 0), bd.get$type(), t4, t3, 0, 0, 0, t5, (void 0), 0, (void 0), (void 0), (void 0), (void 0), (void 0), 0, t2, t6, 0, (void 0), 0, world);
  t11.Body$2(bd, world);
  return t11;
};

$.WorldManifold$0 = function() {
  var t0 = $.Vector$2(0, 0);
  var t1 = $.Vector$2(0, 0);
  var t2 = $.Vector$2(0, 0);
  var t3 = $.List(2);
  $.setRuntimeTypeInfo(t3, ({E: 'Vector'}));
  var t4 = new $.WorldManifold(t2, t1, t3, t0);
  t4.WorldManifold$0();
  return t4;
};

$.Vector$2 = function(x, y) {
  return new $.Vector(y, x);
};

$.typeNameInIE = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) {
    return 'DOMWindow';
  }
  if ($.eqB(name$, 'Document')) {
    if (!!obj.xmlVersion) {
      return 'Document';
    }
    return 'HTMLDocument';
  }
  if ($.eqB(name$, 'HTMLTableDataCellElement')) {
    return 'HTMLTableCellElement';
  }
  if ($.eqB(name$, 'HTMLTableHeaderCellElement')) {
    return 'HTMLTableCellElement';
  }
  if ($.eqB(name$, 'MSStyleCSSProperties')) {
    return 'CSSStyleDeclaration';
  }
  if ($.eqB(name$, 'CanvasPixelArray')) {
    return 'Uint8ClampedArray';
  }
  if ($.eqB(name$, 'HTMLPhraseElement')) {
    return 'HTMLElement';
  }
  return name$;
};

$.DoubleLinkedQueueEntry$1 = function(e) {
  var t0 = new $.DoubleLinkedQueueEntry((void 0), (void 0), (void 0));
  t0.DoubleLinkedQueueEntry$1(e);
  return t0;
};

$.constructorNameFallback = function(obj) {
  var constructor$ = (obj.constructor);
  if ((typeof(constructor$)) === 'function') {
    var name$ = (constructor$.name);
    if ((typeof(name$)) === 'string' && $.isEmpty(name$) !== true && !(name$ === 'Object')) {
      return name$;
    }
  }
  var string = (Object.prototype.toString.call(obj));
  return $.substring$2(string, 8, string.length - 1);
};

$.PolygonAndCircleContact$1 = function(argPool) {
  var t0 = $.Manifold$0();
  var t1 = $.ContactEdge$0();
  var t2 = $.ContactEdge$0();
  return new $.PolygonAndCircleContact($.Manifold$0(), argPool, (void 0), t0, (void 0), (void 0), t2, t1, (void 0), (void 0), (void 0));
};

$.regExpMatchStart = function(m) {
  return m.index;
};

$.NotImplementedException$0 = function() {
  return new $.NotImplementedException();
};

$.NullPointerException$2 = function(functionName, arguments$) {
  return new $.NullPointerException(arguments$, functionName);
};

$.clear = function(receiver) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.clear$0();
  }
  $.set$length(receiver, 0);
};

$.max = function(a, b) {
  if ($.ltB($.compareTo(a, b), 0)) {
    var t0 = b;
  } else {
    t0 = a;
  }
  return t0;
};

$.tdiv = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return $.truncate((a) / (b));
  }
  return a.operator$tdiv$1(b);
};

$.JSSyntaxRegExp$_globalVersionOf$1 = function(other) {
  var t0 = other.get$pattern();
  var t1 = other.get$multiLine();
  var t2 = new $.JSSyntaxRegExp(other.get$ignoreCase(), t1, t0);
  t2.JSSyntaxRegExp$_globalVersionOf$1(other);
  return t2;
};

$.testOverlap = function(a, b) {
  return !($.gtB(b.get$lowerBound().get$x(), a.get$upperBound().get$x()) || $.gtB(b.get$lowerBound().get$y(), a.get$upperBound().get$y()) || ($.gtB(a.get$lowerBound().get$x(), b.get$upperBound().get$x()) || $.gtB(a.get$lowerBound().get$y(), b.get$upperBound().get$y())));
};

$.typeNameInChrome = function(obj) {
  var name$ = (obj.constructor.name);
  if (name$ === 'Window') {
    return 'DOMWindow';
  }
  if (name$ === 'CanvasPixelArray') {
    return 'Uint8ClampedArray';
  }
  return name$;
};

$.sqrt = function(x) {
  return $.sqrt2(x);
};

$.sqrt2 = function(value) {
  return Math.sqrt($.checkNum(value));
};

$.shr = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    var a0 = (a);
    var b0 = (b);
    if (b0 < 0) {
      throw $.captureStackTrace($.IllegalArgumentException$1(b0));
    }
    var t0 = a0 > 0;
    var t1 = b0 > 31;
    if (t0) {
      if (t1) {
        return 0;
      }
      return a0 >>> b0;
    }
    var b1 = b0;
    if (t1) {
      b1 = 31;
    }
    return (a0 >> b1) >>> 0;
  }
  return a.operator$shr$1(b);
};

$.eqNull = function(a) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) {
      return a.operator$eq$1((void 0));
    } else {
      return false;
    }
  } else {
    return typeof a === "undefined";
  }
};

$._dualPivotQuicksort = function(a, left, right, compare) {
  if (typeof a !== 'object'||a.constructor !== Array||!!a.immutable$list) return $._dualPivotQuicksort$bailout(a, left, right, compare,  0);
  $.assert($.gt($.sub(right, left), 32));
  var sixth = $.tdiv($.add($.sub(right, left), 1), 6);
  var index1 = $.add(left, sixth);
  var index5 = $.sub(right, sixth);
  var index3 = $.tdiv($.add(left, right), 2);
  var index2 = $.sub(index3, sixth);
  var index4 = $.add(index3, sixth);
  if (index1 !== (index1 | 0)) throw $.iae(index1);
  var t0 = a.length;
  if (index1 < 0 || index1 >= t0) throw $.ioore(index1);
  var t1 = a[index1];
  if (index2 !== (index2 | 0)) throw $.iae(index2);
  var t2 = a.length;
  if (index2 < 0 || index2 >= t2) throw $.ioore(index2);
  var t3 = a[index2];
  if (index3 !== (index3 | 0)) throw $.iae(index3);
  var t4 = a.length;
  if (index3 < 0 || index3 >= t4) throw $.ioore(index3);
  var t5 = a[index3];
  if (index4 !== (index4 | 0)) throw $.iae(index4);
  var t6 = a.length;
  if (index4 < 0 || index4 >= t6) throw $.ioore(index4);
  var t7 = a[index4];
  if (index5 !== (index5 | 0)) throw $.iae(index5);
  var t8 = a.length;
  if (index5 < 0 || index5 >= t8) throw $.ioore(index5);
  var t9 = a[index5];
  var el2 = t3;
  var el1 = t1;
  if ($.gtB(compare.$call$2(t1, t3), 0)) {
    el2 = t1;
    el1 = t3;
  }
  var el4 = t7;
  var el5 = t9;
  if ($.gtB(compare.$call$2(t7, t9), 0)) {
    el4 = t9;
    el5 = t7;
  }
  var el10 = el1;
  var el3 = t5;
  if ($.gtB(compare.$call$2(el1, t5), 0)) {
    el10 = t5;
    el3 = el1;
  }
  var el20 = el2;
  var el30 = el3;
  if ($.gtB(compare.$call$2(el2, el3), 0)) {
    el20 = el3;
    el30 = el2;
  }
  var el11 = el10;
  var el40 = el4;
  if ($.gtB(compare.$call$2(el10, el4), 0)) {
    el11 = el4;
    el40 = el10;
  }
  var el41 = el40;
  var el31 = el30;
  if ($.gtB(compare.$call$2(el30, el40), 0)) {
    el41 = el30;
    el31 = el40;
  }
  var el21 = el20;
  var el50 = el5;
  if ($.gtB(compare.$call$2(el20, el5), 0)) {
    el21 = el5;
    el50 = el20;
  }
  var el22 = el21;
  var el32 = el31;
  if ($.gtB(compare.$call$2(el21, el31), 0)) {
    el22 = el31;
    el32 = el21;
  }
  var el42 = el41;
  var el51 = el50;
  if ($.gtB(compare.$call$2(el41, el50), 0)) {
    el42 = el50;
    el51 = el41;
  }
  var t10 = a.length;
  if (index1 < 0 || index1 >= t10) throw $.ioore(index1);
  a[index1] = el11;
  var t11 = a.length;
  if (index3 < 0 || index3 >= t11) throw $.ioore(index3);
  a[index3] = el32;
  var t12 = a.length;
  if (index5 < 0 || index5 >= t12) throw $.ioore(index5);
  a[index5] = el51;
  if (left !== (left | 0)) throw $.iae(left);
  var t13 = a.length;
  if (left < 0 || left >= t13) throw $.ioore(left);
  var t14 = a[left];
  var t15 = a.length;
  if (index2 < 0 || index2 >= t15) throw $.ioore(index2);
  a[index2] = t14;
  if (right !== (right | 0)) throw $.iae(right);
  var t16 = a.length;
  if (right < 0 || right >= t16) throw $.ioore(right);
  var t17 = a[right];
  var t18 = a.length;
  if (index4 < 0 || index4 >= t18) throw $.ioore(index4);
  a[index4] = t17;
  var less = $.add(left, 1);
  var great = $.sub(right, 1);
  var pivots_are_equal = $.eqB(compare.$call$2(el22, el42), 0);
  if (pivots_are_equal) {
    for (var great0 = great, less0 = less, k = less; $.leB(k, great0); k0 = $.add(k, 1), great0 = great1, less0 = less1, k = k0) {
      var great1 = great0;
      var less1 = less0;
      if (k !== (k | 0)) throw $.iae(k);
      var t19 = a.length;
      if (k < 0 || k >= t19) throw $.ioore(k);
      var t20 = a[k];
      var comp = compare.$call$2(t20, el22);
      if ($.eqB(comp, 0)) {
        great1 = great0;
        less1 = less0;
        continue;
      }
      if ($.ltB(comp, 0)) {
        if (!$.eqB(k, less0)) {
          if (less0 !== (less0 | 0)) throw $.iae(less0);
          var t21 = a.length;
          if (less0 < 0 || less0 >= t21) throw $.ioore(less0);
          var t22 = a[less0];
          var t23 = a.length;
          if (k < 0 || k >= t23) throw $.ioore(k);
          a[k] = t22;
          var t24 = a.length;
          if (less0 < 0 || less0 >= t24) throw $.ioore(less0);
          a[less0] = t20;
        }
        great1 = great0;
        less1 = $.add(less0, 1);
      } else {
        for (var comp0 = comp, great2 = great0; great1 = great2, less1 = less0, true; great2 = great3) {
          if (great2 !== (great2 | 0)) throw $.iae(great2);
          var t25 = a.length;
          if (great2 < 0 || great2 >= t25) throw $.ioore(great2);
          var comp1 = compare.$call$2(a[great2], el22);
          if ($.gtB(comp1, 0)) {
            var great3 = $.sub(great2, 1);
            comp0 = comp1;
            continue;
          } else {
            if ($.ltB(comp1, 0)) {
              if (less0 !== (less0 | 0)) throw $.iae(less0);
              var t26 = a.length;
              if (less0 < 0 || less0 >= t26) throw $.ioore(less0);
              var t27 = a[less0];
              var t28 = a.length;
              if (k < 0 || k >= t28) throw $.ioore(k);
              a[k] = t27;
              var less2 = $.add(less0, 1);
              var t29 = a.length;
              if (great2 < 0 || great2 >= t29) throw $.ioore(great2);
              var t30 = a[great2];
              var t31 = a.length;
              if (less0 < 0 || less0 >= t31) throw $.ioore(less0);
              a[less0] = t30;
              var great4 = $.sub(great2, 1);
              var t32 = a.length;
              if (great2 < 0 || great2 >= t32) throw $.ioore(great2);
              a[great2] = t20;
              great1 = great4;
              less1 = less2;
              break;
            } else {
              var t33 = a.length;
              if (great2 < 0 || great2 >= t33) throw $.ioore(great2);
              var t34 = a[great2];
              var t35 = a.length;
              if (k < 0 || k >= t35) throw $.ioore(k);
              a[k] = t34;
              var great5 = $.sub(great2, 1);
              var t36 = a.length;
              if (great2 < 0 || great2 >= t36) throw $.ioore(great2);
              a[great2] = t20;
              great1 = great5;
              less1 = less0;
              break;
            }
          }
          great3 = great2;
        }
      }
    }
    var great6 = great0;
    var less3 = less0;
  } else {
    for (var less4 = less, k1 = less, great7 = great; $.leB(k1, great7); k2 = $.add(k1, 1), less4 = less5, k1 = k2, great7 = great8) {
      var great8 = great7;
      var less5 = less4;
      if (k1 !== (k1 | 0)) throw $.iae(k1);
      var t37 = a.length;
      if (k1 < 0 || k1 >= t37) throw $.ioore(k1);
      var t38 = a[k1];
      if ($.ltB(compare.$call$2(t38, el22), 0)) {
        if (!$.eqB(k1, less4)) {
          if (less4 !== (less4 | 0)) throw $.iae(less4);
          var t39 = a.length;
          if (less4 < 0 || less4 >= t39) throw $.ioore(less4);
          var t40 = a[less4];
          var t41 = a.length;
          if (k1 < 0 || k1 >= t41) throw $.ioore(k1);
          a[k1] = t40;
          var t42 = a.length;
          if (less4 < 0 || less4 >= t42) throw $.ioore(less4);
          a[less4] = t38;
        }
        great8 = great7;
        less5 = $.add(less4, 1);
      } else {
        great8 = great7;
        less5 = less4;
        if ($.gtB(compare.$call$2(t38, el42), 0)) {
          for (var great9 = great7; great8 = great9, less5 = less4, true; great9 = great10) {
            if (great9 !== (great9 | 0)) throw $.iae(great9);
            var t43 = a.length;
            if (great9 < 0 || great9 >= t43) throw $.ioore(great9);
            if ($.gtB(compare.$call$2(a[great9], el42), 0)) {
              var great11 = $.sub(great9, 1);
              if ($.ltB(great11, k1)) {
                great8 = great11;
                less5 = less4;
                break;
              }
              var great10 = great11;
              continue;
            } else {
              var t44 = a.length;
              if (great9 < 0 || great9 >= t44) throw $.ioore(great9);
              if ($.ltB(compare.$call$2(a[great9], el22), 0)) {
                if (less4 !== (less4 | 0)) throw $.iae(less4);
                var t45 = a.length;
                if (less4 < 0 || less4 >= t45) throw $.ioore(less4);
                var t46 = a[less4];
                var t47 = a.length;
                if (k1 < 0 || k1 >= t47) throw $.ioore(k1);
                a[k1] = t46;
                var less6 = $.add(less4, 1);
                var t48 = a.length;
                if (great9 < 0 || great9 >= t48) throw $.ioore(great9);
                var t49 = a[great9];
                var t50 = a.length;
                if (less4 < 0 || less4 >= t50) throw $.ioore(less4);
                a[less4] = t49;
                var great12 = $.sub(great9, 1);
                var t51 = a.length;
                if (great9 < 0 || great9 >= t51) throw $.ioore(great9);
                a[great9] = t38;
                great8 = great12;
                less5 = less6;
              } else {
                var t52 = a.length;
                if (great9 < 0 || great9 >= t52) throw $.ioore(great9);
                var t53 = a[great9];
                var t54 = a.length;
                if (k1 < 0 || k1 >= t54) throw $.ioore(k1);
                a[k1] = t53;
                var great13 = $.sub(great9, 1);
                var t55 = a.length;
                if (great9 < 0 || great9 >= t55) throw $.ioore(great9);
                a[great9] = t38;
                great8 = great13;
                less5 = less4;
              }
              break;
            }
            great10 = great9;
          }
        }
      }
    }
    great6 = great7;
    less3 = less4;
  }
  var t56 = $.sub(less3, 1);
  if (t56 !== (t56 | 0)) throw $.iae(t56);
  var t57 = a.length;
  if (t56 < 0 || t56 >= t57) throw $.ioore(t56);
  var t58 = a[t56];
  var t59 = a.length;
  if (left < 0 || left >= t59) throw $.ioore(left);
  a[left] = t58;
  var t60 = $.sub(less3, 1);
  if (t60 !== (t60 | 0)) throw $.iae(t60);
  var t61 = a.length;
  if (t60 < 0 || t60 >= t61) throw $.ioore(t60);
  a[t60] = el22;
  var t62 = $.add(great6, 1);
  if (t62 !== (t62 | 0)) throw $.iae(t62);
  var t63 = a.length;
  if (t62 < 0 || t62 >= t63) throw $.ioore(t62);
  var t64 = a[t62];
  var t65 = a.length;
  if (right < 0 || right >= t65) throw $.ioore(right);
  a[right] = t64;
  var t66 = $.add(great6, 1);
  if (t66 !== (t66 | 0)) throw $.iae(t66);
  var t67 = a.length;
  if (t66 < 0 || t66 >= t67) throw $.ioore(t66);
  a[t66] = el42;
  $._doSort(a, left, $.sub(less3, 2), compare);
  $._doSort(a, $.add(great6, 2), right, compare);
  if (pivots_are_equal) {
    return;
  }
  if ($.ltB(less3, index1) && $.gtB(great6, index5)) {
    var less7 = less3;
    while (true) {
      if (less7 !== (less7 | 0)) throw $.iae(less7);
      var t68 = a.length;
      if (less7 < 0 || less7 >= t68) throw $.ioore(less7);
      if (!$.eqB(compare.$call$2(a[less7], el22), 0)) break;
      var less8 = less7;
      less8 = $.add(less7, 1);
      less7 = less8;
    }
    var great14 = great6;
    while (true) {
      if (great14 !== (great14 | 0)) throw $.iae(great14);
      var t69 = a.length;
      if (great14 < 0 || great14 >= t69) throw $.ioore(great14);
      if (!$.eqB(compare.$call$2(a[great14], el42), 0)) break;
      var great15 = great14;
      great15 = $.sub(great14, 1);
      great14 = great15;
    }
    for (var great16 = great14, less9 = less7, k3 = less7; $.leB(k3, great16); k4 = $.add(k3, 1), great16 = great17, less9 = less10, k3 = k4) {
      var great17 = great16;
      var less10 = less9;
      if (k3 !== (k3 | 0)) throw $.iae(k3);
      var t70 = a.length;
      if (k3 < 0 || k3 >= t70) throw $.ioore(k3);
      var t71 = a[k3];
      if ($.eqB(compare.$call$2(t71, el22), 0)) {
        if (!$.eqB(k3, less9)) {
          if (less9 !== (less9 | 0)) throw $.iae(less9);
          var t72 = a.length;
          if (less9 < 0 || less9 >= t72) throw $.ioore(less9);
          var t73 = a[less9];
          var t74 = a.length;
          if (k3 < 0 || k3 >= t74) throw $.ioore(k3);
          a[k3] = t73;
          var t75 = a.length;
          if (less9 < 0 || less9 >= t75) throw $.ioore(less9);
          a[less9] = t71;
        }
        great17 = great16;
        less10 = $.add(less9, 1);
      } else {
        great17 = great16;
        less10 = less9;
        if ($.eqB(compare.$call$2(t71, el42), 0)) {
          for (var great18 = great16; great17 = great18, less10 = less9, true; great18 = great19) {
            if (great18 !== (great18 | 0)) throw $.iae(great18);
            var t76 = a.length;
            if (great18 < 0 || great18 >= t76) throw $.ioore(great18);
            if ($.eqB(compare.$call$2(a[great18], el42), 0)) {
              var great20 = $.sub(great18, 1);
              if ($.ltB(great20, k3)) {
                great17 = great20;
                less10 = less9;
                break;
              }
              var great19 = great20;
              continue;
            } else {
              var t77 = a.length;
              if (great18 < 0 || great18 >= t77) throw $.ioore(great18);
              if ($.ltB(compare.$call$2(a[great18], el22), 0)) {
                if (less9 !== (less9 | 0)) throw $.iae(less9);
                var t78 = a.length;
                if (less9 < 0 || less9 >= t78) throw $.ioore(less9);
                var t79 = a[less9];
                var t80 = a.length;
                if (k3 < 0 || k3 >= t80) throw $.ioore(k3);
                a[k3] = t79;
                var less11 = $.add(less9, 1);
                var t81 = a.length;
                if (great18 < 0 || great18 >= t81) throw $.ioore(great18);
                var t82 = a[great18];
                var t83 = a.length;
                if (less9 < 0 || less9 >= t83) throw $.ioore(less9);
                a[less9] = t82;
                var great21 = $.sub(great18, 1);
                var t84 = a.length;
                if (great18 < 0 || great18 >= t84) throw $.ioore(great18);
                a[great18] = t71;
                great17 = great21;
                less10 = less11;
              } else {
                var t85 = a.length;
                if (great18 < 0 || great18 >= t85) throw $.ioore(great18);
                var t86 = a[great18];
                var t87 = a.length;
                if (k3 < 0 || k3 >= t87) throw $.ioore(k3);
                a[k3] = t86;
                var great22 = $.sub(great18, 1);
                var t88 = a.length;
                if (great18 < 0 || great18 >= t88) throw $.ioore(great18);
                a[great18] = t71;
                great17 = great22;
                less10 = less9;
              }
              break;
            }
            great19 = great18;
          }
        }
      }
    }
    $._doSort(a, less9, great16, compare);
  } else {
    $._doSort(a, less3, great6, compare);
  }
  var k4, k2, k0;
};

$.and = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return (a & b) >>> 0;
  }
  return a.operator$and$1(b);
};

$.substring$2 = function(receiver, startIndex, endIndex) {
  if (!(typeof receiver === 'string')) {
    return receiver.substring$2(startIndex, endIndex);
  }
  $.checkNum(startIndex);
  var length$ = receiver.length;
  var endIndex0 = endIndex;
  if (endIndex === (void 0)) {
    endIndex0 = length$;
  }
  $.checkNum(endIndex0);
  if ($.ltB(startIndex, 0)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(startIndex));
  }
  if ($.gtB(startIndex, endIndex0)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(startIndex));
  }
  if ($.gtB(endIndex0, length$)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(endIndex0));
  }
  return $.substringUnchecked(receiver, startIndex, endIndex0);
};

$.indexSet = function(a, index, value) {
  if ($.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(index));
    }
    if (index < 0 || $.geB(index, $.get$length(a))) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    }
    $.checkMutable(a, 'indexed set');
    a[index] = value;
    return;
  }
  a.operator$indexSet$2(index, value);
};

$.DistanceInput$0 = function() {
  var t0 = $.DistanceProxy$0();
  var t1 = $.DistanceProxy$0();
  var t2 = $.Transform$0();
  return new $.DistanceInput(false, $.Transform$0(), t2, t1, t0);
};

$.ExceptionImplementation$1 = function(msg) {
  return new $.ExceptionImplementation(msg);
};

$.StringMatch$3 = function(_start, str, pattern) {
  return new $.StringMatch(pattern, str, _start);
};

$.invokeClosure = function(closure, isolate, numberOfArguments, arg1, arg2) {
  var t0 = ({});
  t0.arg2_3 = arg2;
  t0.arg1_2 = arg1;
  t0.closure_1 = closure;
  if ($.eqB(numberOfArguments, 0)) {
    return new $.Closure2(t0).$call$0();
  } else {
    if ($.eqB(numberOfArguments, 1)) {
      return new $.Closure3(t0).$call$0();
    } else {
      if ($.eqB(numberOfArguments, 2)) {
        return new $.Closure4(t0).$call$0();
      } else {
        throw $.captureStackTrace($.ExceptionImplementation$1('Unsupported number of arguments for wrapped closure'));
      }
    }
  }
};

$.gt = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a > b;
  }
  return a.operator$gt$1(b);
};

$.minToOut = function(a, b, out) {
  if ($.ltB(a.get$x(), b.get$x())) {
    var t0 = a.get$x();
  } else {
    t0 = b.get$x();
  }
  out.set$x(t0);
  if ($.ltB(a.get$y(), b.get$y())) {
    var t1 = a.get$y();
  } else {
    t1 = b.get$y();
  }
  out.set$y(t1);
};

$.assert = function(condition) {
};

$.ContactSolver$0 = function() {
  var t0 = $.List(256);
  $.setRuntimeTypeInfo(t0, ({E: 'ContactConstraint'}));
  var t1 = $.WorldManifold$0();
  var t2 = $.Vector$2(0, 0);
  var t3 = $.Vector$2(0, 0);
  var t4 = $.Vector$2(0, 0);
  var t5 = $.Vector$2(0, 0);
  var t6 = $.Vector$2(0, 0);
  var t7 = $.Vector$2(0, 0);
  var t8 = $.Vector$2(0, 0);
  var t9 = $.Vector$2(0, 0);
  var t10 = $.Vector$2(0, 0);
  var t11 = $.Vector$2(0, 0);
  var t12 = $.Vector$2(0, 0);
  var t13 = $.PositionSolverManifold$0();
  var t14 = $.Vector$2(0, 0);
  var t15 = new $.ContactSolver($.Vector$2(0, 0), t14, t13, t12, t11, t10, t9, t8, t7, t6, t5, t4, t3, t2, t1, (void 0), t0);
  t15.ContactSolver$0();
  return t15;
};

$.filter = function(source, destination, f) {
  for (var t0 = $.iterator(source); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    if (f.$call$1(t1) === true) {
      $.add$1(destination, t1);
    }
  }
  return destination;
};

$.buildDynamicMetadata = function(inputTable) {
  if (typeof inputTable !== 'string' && (typeof inputTable !== 'object'||inputTable.constructor !== Array)) return $.buildDynamicMetadata$bailout(inputTable,  0);
  var result = [];
  for (var i = 0; i < inputTable.length; i = i + 1) {
    var t0 = inputTable.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    var tag = $.index(inputTable[i], 0);
    var t1 = inputTable.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var tags = $.index(inputTable[i], 1);
    var set = $.HashSetImplementation$0();
    $.setRuntimeTypeInfo(set, ({E: 'String'}));
    var tagNames = $.split(tags, '|');
    if (typeof tagNames !== 'string' && (typeof tagNames !== 'object'||tagNames.constructor !== Array)) return $.buildDynamicMetadata$bailout(inputTable, 2, inputTable, result, tag, i, tags, set, tagNames);
    for (var j = 0; j < tagNames.length; j = j + 1) {
      var t2 = tagNames.length;
      if (j < 0 || j >= t2) throw $.ioore(j);
      set.add$1(tagNames[j]);
    }
    $.add$1(result, $.MetaInfo$3(tag, tags, set));
  }
  return result;
};

$.BroadPhase$0 = function() {
  var t0 = new $.BroadPhase((void 0), 0, 16, (void 0), (void 0), 0, $.DynamicTree$0());
  t0.BroadPhase$0();
  return t0;
};

$._getMessage = function(reason) {
  if (reason === (void 0)) {
    var t0 = '';
  } else {
    t0 = ', \'' + $.stringToString(reason) + '\'';
  }
  return t0;
};

$.mul = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a * b;
  }
  return a.operator$mul$1(b);
};

$.mixFriction = function(friction1, friction2) {
  return $.sqrt($.mul(friction1, friction2));
};

$.contains$1 = function(receiver, other) {
  if (!(typeof receiver === 'string')) {
    return receiver.contains$1(other);
  }
  return $.contains$2(receiver, other, 0);
};

$._browserPrefix = function() {
  if ($._cachedBrowserPrefix === (void 0)) {
    if ($.isFirefox() === true) {
      $._cachedBrowserPrefix = '-moz-';
    } else {
      $._cachedBrowserPrefix = '-webkit-';
    }
  }
  return $._cachedBrowserPrefix;
};

$.ContactConstraint$0 = function() {
  var t0 = $.List(2);
  $.setRuntimeTypeInfo(t0, ({E: 'ContactConstraintPoint'}));
  var t1 = $.Vector$2(0, 0);
  var t2 = $.Vector$2(0, 0);
  var t3 = $.Vector$2(0, 0);
  var t4 = $.Matrix22$2((void 0), (void 0));
  var t5 = new $.ContactConstraint((void 0), 0, (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), $.Matrix22$2((void 0), (void 0)), t4, t3, t2, t1, t0);
  t5.ContactConstraint$0();
  return t5;
};

$.ContactImpulse$0 = function() {
  var t0 = $.List(2);
  $.setRuntimeTypeInfo(t0, ({E: 'num'}));
  var t1 = $.List(2);
  $.setRuntimeTypeInfo(t1, ({E: 'num'}));
  return new $.ContactImpulse(t1, t0);
};

$.neg = function(a) {
  if (typeof a === "number") {
    return -a;
  }
  return a.operator$negate$0();
};

$.mulMatrixAndVectorToOut = function(matrix, vector, out) {
  var tempy = $.add($.mul(matrix.get$col1().get$y(), vector.get$x()), $.mul(matrix.get$col2().get$y(), vector.get$y()));
  out.set$x($.add($.mul(matrix.get$col1().get$x(), vector.get$x()), $.mul(matrix.get$col2().get$x(), vector.get$y())));
  out.set$y(tempy);
};

$._emitCollection = function(c, result, visiting) {
  $.add$1(visiting, c);
  var isList = typeof c === 'object' && (c.constructor === Array || c.is$List2());
  if (isList) {
    var t0 = '[';
  } else {
    t0 = '{';
  }
  $.add$1(result, t0);
  for (var t1 = $.iterator(c), first = true; t1.hasNext$0() === true; first = first0) {
    var first0 = first;
    var t2 = t1.next$0();
    if (!first) {
      $.add$1(result, ', ');
    }
    $._emitObject(t2, result, visiting);
    first0 = false;
  }
  if (isList) {
    var t3 = ']';
  } else {
    t3 = '}';
  }
  $.add$1(result, t3);
  $.removeLast(visiting);
};

$.DynamicTreeNode$_construct$0 = function() {
  return new $.DynamicTreeNode((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), $.AxisAlignedBox$2((void 0), (void 0)));
};

$.checkMutable = function(list, reason) {
  if (!!(list.immutable$list)) {
    throw $.captureStackTrace($.UnsupportedOperationException$1(reason));
  }
};

$.filter2 = function(receiver, predicate) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.filter$1(predicate);
  } else {
    return $.filter3(receiver, [], predicate);
  }
};

$.ExpectException$1 = function(message) {
  return new $.ExpectException(message);
};

$.toStringWrapper = function() {
  return $.toString((this.dartException));
};

$.filter3 = function(source, destination, f) {
  for (var t0 = $.iterator(source); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    if (f.$call$1(t1) === true) {
      $.add$1(destination, t1);
    }
  }
  return destination;
};

$.or = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return (a | b) >>> 0;
  }
  return a.operator$or$1(b);
};

$.DefaultWorldPool$0 = function() {
  var t0 = new $.DefaultWorldPool((void 0), (void 0), (void 0));
  t0.DefaultWorldPool$0();
  return t0;
};

$.CircleContact$1 = function(argPool) {
  var t0 = $.Manifold$0();
  var t1 = $.ContactEdge$0();
  var t2 = $.ContactEdge$0();
  return new $.CircleContact($.Manifold$0(), argPool, (void 0), t0, (void 0), (void 0), t2, t1, (void 0), (void 0), (void 0));
};

$.regExpTest = function(regExp, str) {
  return $.regExpGetNative(regExp).test(str);
};

$.isEmpty = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) {
    return receiver.length === 0;
  }
  return receiver.isEmpty$0();
};

$.HashSetImplementation$0 = function() {
  var t0 = new $.HashSetImplementation((void 0));
  t0.HashSetImplementation$0();
  return t0;
};

$.stringSplitUnchecked = function(receiver, pattern) {
  if (typeof pattern === 'string') {
    return receiver.split(pattern);
  } else {
    if (typeof pattern === 'object' && !!pattern.is$JSSyntaxRegExp) {
      return receiver.split($.regExpGetNative(pattern));
    } else {
      throw $.captureStackTrace('StringImplementation.split(Pattern) UNIMPLEMENTED');
    }
  }
};

$.CanvasViewportTransform$2 = function(extents, center) {
  var t0 = $.Vector$copy$1(extents);
  return new $.CanvasViewportTransform(20, $.Vector$copy$1(center), t0);
};

$.TimeStep$0 = function() {
  return new $.TimeStep(true, 0, 0, 0, 0, 0);
};

$.checkGrowable = function(list, reason) {
  if (!!(list.fixed$length)) {
    throw $.captureStackTrace($.UnsupportedOperationException$1(reason));
  }
};

$.TimeOfImpactSolverManifold$0 = function() {
  var t0 = $.Vector$2(0, 0);
  var t1 = $.Vector$2(0, 0);
  var t2 = $.Vector$2(0, 0);
  var t3 = $.Vector$2(0, 0);
  var t4 = $.Vector$2(0, 0);
  var t5 = $.Vector$2(0, 0);
  return new $.TimeOfImpactSolverManifold($.Vector$2(0, 0), t5, t4, t3, t2, 0, t1, t0);
};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver) === true) {
    return $.ListIterator$1(receiver);
  }
  return receiver.iterator$0();
};

$.add$1 = function(receiver, value) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'add');
    receiver.push(value);
    return;
  }
  return receiver.add$1(value);
};

$.regExpExec = function(regExp, str) {
  var result = ($.regExpGetNative(regExp).exec(str));
  if (result === null) {
    return;
  }
  return result;
};

$.geB = function(a, b) {
  return $.ge(a, b) === true;
};

$.stringContainsUnchecked = function(receiver, other, startIndex) {
  if (typeof other === 'string') {
    return !($.indexOf$2(receiver, other, startIndex) === -1);
  } else {
    if (typeof other === 'object' && !!other.is$JSSyntaxRegExp) {
      return other.hasMatch$1($.substring$1(receiver, startIndex));
    } else {
      return $.iterator($.allMatches(other, $.substring$1(receiver, startIndex))).hasNext$0();
    }
  }
};

$.mixRestitution = function(restitution1, restitution2) {
  if ($.gtB(restitution1, restitution2)) {
    var t0 = restitution1;
  } else {
    t0 = restitution2;
  }
  return t0;
};

$.ObjectNotClosureException$0 = function() {
  return new $.ObjectNotClosureException();
};

$.window = function() {
  return window;;
};

$.abs = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.abs$0();
  }
  return Math.abs(receiver);
};

$.regExpAttachGlobalNative = function(regExp) {
  regExp._re = $.regExpMakeNative(regExp, true);
};

$.leB = function(a, b) {
  return $.le(a, b) === true;
};

$.isNegative = function(receiver) {
  if (typeof receiver === 'number') {
    if (receiver === 0) {
      var t0 = 1 / receiver < 0;
    } else {
      t0 = receiver < 0;
    }
    return t0;
  } else {
    return receiver.isNegative$0();
  }
};

$.regExpMakeNative = function(regExp, global) {
  var pattern = regExp.get$pattern();
  var multiLine = regExp.get$multiLine();
  var ignoreCase = regExp.get$ignoreCase();
  $.checkString(pattern);
  var sb = $.StringBufferImpl$1('');
  if (multiLine === true) {
    $.add$1(sb, 'm');
  }
  if (ignoreCase === true) {
    $.add$1(sb, 'i');
  }
  if (global === true) {
    $.add$1(sb, 'g');
  }
  try {
    return new RegExp(pattern, $.toString(sb));
  }catch (t0) {
    var t1 = $.unwrapException(t0);
    var e = t1;
    throw $.captureStackTrace($.IllegalJSRegExpException$2(pattern, (String(e))));
  }
};

$.Sweep$0 = function() {
  var t0 = $.Vector$2(0, 0);
  var t1 = $.Vector$2(0, 0);
  return new $.Sweep(0, 0, $.Vector$2(0, 0), t1, t0);
};

$.add = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a + b;
  } else {
    if (typeof a === 'string') {
      var b0 = $.toString(b);
      if (typeof b0 === 'string') {
        return a + b0;
      }
      $.checkNull(b0);
      throw $.captureStackTrace($.IllegalArgumentException$1(b0));
    }
  }
  return a.operator$add$1(b);
};

$.MassData$0 = function() {
  return new $.MassData(0, $.Vector$2(0, 0), 0);
};

$.mulTransMatrixAndVectorToOut = function(matrix, vector, out) {
  var outx = $.add($.mul(vector.get$x(), matrix.get$col1().get$x()), $.mul(vector.get$y(), matrix.get$col1().get$y()));
  out.set$y($.add($.mul(vector.get$x(), matrix.get$col2().get$x()), $.mul(vector.get$y(), matrix.get$col2().get$y())));
  out.set$x(outx);
};

$.CanvasDraw$2 = function(viewport, ctx) {
  return new $.CanvasDraw(ctx, viewport, 1);
};

$.mapToString = function(m) {
  var result = $.StringBufferImpl$1('');
  $._emitMap(m, result, $.List((void 0)));
  return result.toString$0();
};

$._emitObject = function(o, result, visiting) {
  if (typeof o === 'object' && (o.constructor === Array || o.is$Collection())) {
    if ($._containsRef(visiting, o) === true) {
      if (typeof o === 'object' && (o.constructor === Array || o.is$List2())) {
        var t0 = '[...]';
      } else {
        t0 = '{...}';
      }
      $.add$1(result, t0);
    } else {
      $._emitCollection(o, result, visiting);
    }
  } else {
    if (typeof o === 'object' && o.is$Map()) {
      if ($._containsRef(visiting, o) === true) {
        $.add$1(result, '{...}');
      } else {
        $._emitMap(o, result, visiting);
      }
    } else {
      if ($.eqNullB(o)) {
        var t1 = 'null';
      } else {
        t1 = o;
      }
      $.add$1(result, t1);
    }
  }
};

$._emitMap = function(m, result, visiting) {
  var t0 = ({});
  t0.visiting_2 = visiting;
  t0.result_1 = result;
  $.add$1(t0.visiting_2, m);
  $.add$1(t0.result_1, '{');
  t0.first_3 = true;
  $.forEach(m, new $.Closure5(t0));
  $.add$1(t0.result_1, '}');
  $.removeLast(t0.visiting_2);
};

$.clipSegmentToLine = function(vOut, vIn, norm, offset) {
  var distance0 = $.sub($.dot(norm, $.index(vIn, 0).get$v()), offset);
  var distance1 = $.sub($.dot(norm, $.index(vIn, 1).get$v()), offset);
  var numOut = 0;
  if ($.leB(distance0, 0.0)) {
    $.index(vOut, 0).setFrom$1($.index(vIn, 0));
    numOut = 1;
  }
  var numOut0 = numOut;
  if ($.leB(distance1, 0.0)) {
    var numOut1 = numOut + 1;
    $.index(vOut, numOut).setFrom$1($.index(vIn, 1));
    numOut0 = numOut1;
  }
  var numOut2 = numOut0;
  if ($.ltB($.mul(distance0, distance1), 0.0)) {
    var interp = $.div(distance0, $.sub(distance0, distance1));
    $.index(vOut, numOut0).get$v().setFrom$1($.index(vIn, 1).get$v()).subLocal$1($.index(vIn, 0).get$v()).mulLocal$1(interp).addLocal$1($.index(vIn, 0).get$v());
    if ($.gtB(distance0, 0.0)) {
      var vin = $.index(vIn, 0);
    } else {
      vin = $.index(vIn, 1);
    }
    $.index(vOut, numOut0).get$id().setFrom$1(vin.get$id());
    numOut2 = numOut0 + 1;
  }
  return numOut2;
};

$.isFirefox = function() {
  return $.contains$2($.userAgent(), 'Firefox', 0);
};

$.Transform$0 = function() {
  var t0 = $.Vector$2(0, 0);
  return new $.Transform($.Matrix22$2((void 0), (void 0)), t0);
};

$.setRange$4 = function(receiver, start, length$, from, startFrom) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.setRange$4(start, length$, from, startFrom);
  }
  $.checkMutable(receiver, 'indexed set');
  if (length$ === 0) {
    return;
  }
  $.checkNull(start);
  $.checkNull(length$);
  $.checkNull(from);
  $.checkNull(startFrom);
  if (!((typeof start === 'number') && (start === (start | 0)))) {
    throw $.captureStackTrace($.IllegalArgumentException$1(start));
  }
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0)))) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  }
  if (!((typeof startFrom === 'number') && (startFrom === (startFrom | 0)))) {
    throw $.captureStackTrace($.IllegalArgumentException$1(startFrom));
  }
  if (length$ < 0) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  }
  if (start < 0) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(start));
  }
  if ($.gtB(start + length$, $.get$length(receiver))) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1($.add(start, length$)));
  }
  $.copy(from, startFrom, receiver, start, length$);
};

$.compareTo = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    if ($.ltB(a, b)) {
      return -1;
    } else {
      if ($.gtB(a, b)) {
        return 1;
      } else {
        if ($.eqB(a, b)) {
          if ($.eqB(a, 0)) {
            var aIsNegative = $.isNegative(a);
            if ($.eqB(aIsNegative, $.isNegative(b))) {
              return 0;
            }
            if (aIsNegative === true) {
              return -1;
            }
            return 1;
          }
          return 0;
        } else {
          if ($.isNaN(a) === true) {
            if ($.isNaN(b) === true) {
              return 0;
            }
            return 1;
          } else {
            return -1;
          }
        }
      }
    }
  } else {
    if (typeof a === 'string') {
      if (!(typeof b === 'string')) {
        throw $.captureStackTrace($.IllegalArgumentException$1(b));
      }
      if (a == b) {
        var t0 = 0;
      } else {
        if (a < b) {
          t0 = -1;
        } else {
          t0 = 1;
        }
      }
      return t0;
    } else {
      return a.compareTo$1(b);
    }
  }
};

$.ge = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a >= b;
  }
  return a.operator$ge$1(b);
};

$.Manifold$0 = function() {
  var t0 = $.List(2);
  $.setRuntimeTypeInfo(t0, ({E: 'ManifoldPoint'}));
  var t1 = $.Vector$2(0, 0);
  var t2 = new $.Manifold(0, (void 0), $.Vector$2(0, 0), t1, t0);
  t2.Manifold$0();
  return t2;
};

$.MatchImplementation$5 = function(pattern, str, _start, _end, _groups) {
  return new $.MatchImplementation(_groups, _end, _start, str, pattern);
};

$.UnsupportedOperationException$1 = function(_message) {
  return new $.UnsupportedOperationException(_message);
};

$.Filter$0 = function() {
  return new $.Filter(0, 0, 0);
};

$.indexOf$2 = function(receiver, element, start) {
  if ($.isJsArray(receiver) === true) {
    if (!((typeof start === 'number') && (start === (start | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(start));
    }
    return $.indexOf(receiver, element, start, (receiver.length));
  } else {
    if (typeof receiver === 'string') {
      $.checkNull(element);
      if (!((typeof start === 'number') && (start === (start | 0)))) {
        throw $.captureStackTrace($.IllegalArgumentException$1(start));
      }
      if (!(typeof element === 'string')) {
        throw $.captureStackTrace($.IllegalArgumentException$1(element));
      }
      if (start < 0) {
        return -1;
      }
      return receiver.indexOf(element, start);
    }
  }
  return receiver.indexOf$2(element, start);
};

$.TimeOfImpactConstraint$0 = function() {
  var t0 = $.List(2);
  $.setRuntimeTypeInfo(t0, ({E: 'Vector'}));
  var t1 = $.Vector$2(0, 0);
  var t2 = new $.TimeOfImpactConstraint((void 0), (void 0), 0, 0, 0, $.Vector$2(0, 0), t1, t0);
  t2.TimeOfImpactConstraint$0();
  return t2;
};

$.NoMoreElementsException$0 = function() {
  return new $.NoMoreElementsException();
};

$.eqNullB = function(a) {
  return $.eqNull(a) === true;
};

$.Element$tag = function(tag) {
  return document.createElement(tag);
};

$.List$from = function(other) {
  var result = $.List((void 0));
  $.setRuntimeTypeInfo(result, ({E: 'E'}));
  var iterator = $.iterator(other);
  for (; iterator.hasNext$0() === true; ) {
    result.push(iterator.next$0());
  }
  return result;
};

$.newList = function(length$) {
  if (length$ === (void 0)) {
    return new Array();
  }
  var t0 = typeof length$ === 'number' && length$ === (length$ | 0);
  var t1 = !t0;
  if (t0) {
    t1 = length$ < 0;
  }
  if (t1) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  }
  var result = (new Array(length$));
  result.fixed$length = true;
  return result;
};

$.main = function() {
  var domino = $.DominoTest$0();
  domino.initialize$0();
  domino.initializeAnimation$0();
  domino.runAnimation$0();
};

$._computeLoadLimit = function(capacity) {
  return $.tdiv($.mul(capacity, 3), 4);
};

$.HashSetIterator$1 = function(set_) {
  var t0 = new $.HashSetIterator(-1, set_.get$_backingMap().get$_keys());
  t0.HashSetIterator$1(set_);
  return t0;
};

$.IllegalArgumentException$1 = function(arg) {
  return new $.IllegalArgumentException(arg);
};

$.ContactManager$1 = function(argPool) {
  return new $.ContactManager(argPool, (void 0), $.ContactFilter$0(), 0, (void 0), $.BroadPhase$0());
};

$._AllMatchesIterator$2 = function(re, _str) {
  return new $._AllMatchesIterator(false, (void 0), _str, $.JSSyntaxRegExp$_globalVersionOf$1(re));
};

$.iae = function(argument) {
  throw $.captureStackTrace($.IllegalArgumentException$1(argument));
};

$.equals = function(expected, actual, reason) {
  if ($.eqB(expected, actual)) {
    return;
  }
  var msg = $._getMessage(reason);
  $._fail('Expect.equals(expected: <' + $.stringToString(expected) + '>, actual: <' + $.stringToString(actual) + '>' + $.stringToString(msg) + ') fails.');
};

$.truncate = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.truncate$0();
  }
  if (receiver < 0) {
    var t0 = $.ceil(receiver);
  } else {
    t0 = $.floor(receiver);
  }
  return t0;
};

$.isNaN = function(receiver) {
  if (typeof receiver === 'number') {
    return isNaN(receiver);
  } else {
    return receiver.isNegative$0();
  }
};

$.ClipVertex$0 = function() {
  var t0 = $.Vector$2(0, 0);
  return new $.ClipVertex($.ContactID$0(), t0);
};

$.SimplexCache$0 = function() {
  var t0 = $.List(3);
  $.setRuntimeTypeInfo(t0, ({E: 'int'}));
  var t1 = $.List(3);
  $.setRuntimeTypeInfo(t1, ({E: 'int'}));
  var t2 = new $.SimplexCache(t1, t0, 0, 0);
  t2.SimplexCache$0();
  return t2;
};

$.allMatchesInStringUnchecked = function(needle, haystack) {
  var result = $.List((void 0));
  $.setRuntimeTypeInfo(result, ({E: 'Match'}));
  var length$ = $.get$length(haystack);
  var patternLength = $.get$length(needle);
  if (patternLength !== (patternLength | 0)) return $.allMatchesInStringUnchecked$bailout(needle, haystack, 1, length$, result, patternLength);
  for (var startIndex = 0; true; startIndex = startIndex0) {
    var startIndex0 = startIndex;
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1)) {
      break;
    }
    result.push($.StringMatch$3(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$)) {
      break;
    } else {
      if ($.eqB(position, endIndex)) {
        startIndex0 = $.add(startIndex, 1);
      } else {
        startIndex0 = endIndex;
      }
    }
  }
  return result;
};

$.toStringAsFixed = function(receiver, fractionDigits) {
  if (!(typeof receiver === 'number')) {
    return receiver.toStringAsFixed$1(fractionDigits);
  }
  $.checkNum(fractionDigits);
  var result = (receiver.toFixed(fractionDigits));
  if (receiver === 0 && $.isNegative(receiver) === true) {
    return '-' + $.stringToString(result);
  }
  return result;
};

$.Vector$copy$1 = function(other) {
  var t0 = other.get$x();
  return new $.Vector(other.get$y(), t0);
};

$._AllMatchesIterable$2 = function(_re, _str) {
  return new $._AllMatchesIterable(_str, _re);
};

$.copy = function(src, srcStart, dst, dstStart, count) {
  if (typeof src !== 'string' && (typeof src !== 'object'||src.constructor !== Array)) return $.copy$bailout(src, srcStart, dst, dstStart, count,  0);
  if (typeof dst !== 'object'||dst.constructor !== Array||!!dst.immutable$list) return $.copy$bailout(src, srcStart, dst, dstStart, count,  0);
  if (typeof count !== 'number') return $.copy$bailout(src, srcStart, dst, dstStart, count,  0);
  var srcStart0 = srcStart;
  if (srcStart === (void 0)) {
    srcStart0 = 0;
  }
  var dstStart0 = dstStart;
  if (dstStart === (void 0)) {
    dstStart0 = 0;
  }
  if ($.ltB(srcStart0, dstStart0)) {
    for (var i = $.sub($.add(srcStart0, count), 1), i0 = i, j = $.sub($.add(dstStart0, count), 1); $.geB(i0, srcStart0); i1 = $.sub(i0, 1), i0 = i1, j = $.sub(j, 1)) {
      if (i0 !== (i0 | 0)) throw $.iae(i0);
      var t0 = src.length;
      if (i0 < 0 || i0 >= t0) throw $.ioore(i0);
      var t1 = src[i0];
      if (j !== (j | 0)) throw $.iae(j);
      var t2 = dst.length;
      if (j < 0 || j >= t2) throw $.ioore(j);
      dst[j] = t1;
    }
  } else {
    for (var i2 = srcStart0, j0 = dstStart0; $.ltB(i2, $.add(srcStart0, count)); i3 = $.add(i2, 1), i2 = i3, j0 = $.add(j0, 1)) {
      if (i2 !== (i2 | 0)) throw $.iae(i2);
      var t3 = src.length;
      if (i2 < 0 || i2 >= t3) throw $.ioore(i2);
      var t4 = src[i2];
      if (j0 !== (j0 | 0)) throw $.iae(j0);
      var t5 = dst.length;
      if (j0 < 0 || j0 >= t5) throw $.ioore(j0);
      dst[j0] = t4;
    }
  }
  var i3, i1;
};

$.dynamicSetMetadata = function(inputTable) {
  var t0 = $.buildDynamicMetadata(inputTable);
  $._dynamicMetadata(t0);
};

$.Collision$_construct$1 = function(pool) {
  var t0 = $.DistanceInput$0();
  var t1 = $.SimplexCache$0();
  var t2 = $.DistanceOutput$0();
  var t3 = $.EdgeResults$0();
  var t4 = $.EdgeResults$0();
  var t5 = $.List(2);
  $.setRuntimeTypeInfo(t5, ({E: 'ClipVertex'}));
  var t6 = $.Vector$2(0, 0);
  var t7 = $.Vector$2(0, 0);
  var t8 = $.Vector$2(0, 0);
  var t9 = $.Vector$2(0, 0);
  var t10 = $.Vector$2(0, 0);
  var t11 = $.Vector$2(0, 0);
  var t12 = $.Vector$2(0, 0);
  var t13 = $.Vector$2(0, 0);
  var t14 = $.List(2);
  $.setRuntimeTypeInfo(t14, ({E: 'ClipVertex'}));
  var t15 = $.List(2);
  $.setRuntimeTypeInfo(t15, ({E: 'ClipVertex'}));
  var t16 = new $.Collision(t15, t14, t13, t12, t11, t10, t9, t8, t7, t6, t5, t4, t3, t2, t0, t1, pool);
  t16.Collision$_construct$1(pool);
  return t16;
};

$.ContactFilter$0 = function() {
  return new $.ContactFilter();
};

$.ListIterator$1 = function(list) {
  return new $.ListIterator(list, 0);
};

$.checkNum = function(value) {
  if (!(typeof value === 'number')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  }
  return value;
};

$.Velocity$0 = function() {
  var t0 = new $.Velocity((void 0), (void 0));
  t0.Velocity$0();
  return t0;
};

$.ltB = function(a, b) {
  return $.lt(a, b) === true;
};

$.convertDartClosureToJS = function(closure) {
  if (closure === (void 0)) {
    return;
  }
  var function$ = (closure.$identity);
  if (!!function$) {
    return function$;
  }
  var function0 = (function() {
    return $.invokeClosure.$call$5(closure, $, arguments.length, arguments[0], arguments[1]);
  });
  closure.$identity = function0;
  return function0;
};

$.TimeOfImpactSolver$0 = function() {
  var t0 = $.List(4);
  $.setRuntimeTypeInfo(t0, ({E: 'TimeOfImpactConstraint'}));
  var t1 = $.TimeOfImpactSolverManifold$0();
  var t2 = $.Vector$2(0, 0);
  var t3 = $.Vector$2(0, 0);
  var t4 = $.Vector$2(0, 0);
  var t5 = new $.TimeOfImpactSolver($.Vector$2(0, 0), t4, t3, t2, t1, (void 0), 0, t0);
  t5.TimeOfImpactSolver$0();
  return t5;
};

$._FixedSizeListIterator$1 = function(array) {
  return new $._FixedSizeListIterator($.get$length(array), 0, array);
};

$.Pair$0 = function() {
  return new $.Pair((void 0), (void 0));
};

$.split = function(receiver, pattern) {
  if (!(typeof receiver === 'string')) {
    return receiver.split$1(pattern);
  }
  $.checkNull(pattern);
  return $.stringSplitUnchecked(receiver, pattern);
};

$.concatAll = function(strings) {
  $.checkNull(strings);
  for (var t0 = $.iterator(strings), result = ''; t0.hasNext$0() === true; result = result0) {
    var result0 = result;
    var t1 = t0.next$0();
    $.checkNull(t1);
    if (!(typeof t1 === 'string')) {
      throw $.captureStackTrace($.IllegalArgumentException$1(t1));
    }
    result0 = result + t1;
  }
  return result;
};

$.userAgent = function() {
  return $.window().get$navigator().get$userAgent();
};

$.Distance$_construct$0 = function() {
  var t0 = $.Simplex$0();
  var t1 = $.List(3);
  $.setRuntimeTypeInfo(t1, ({E: 'int'}));
  var t2 = $.List(3);
  $.setRuntimeTypeInfo(t2, ({E: 'int'}));
  var t3 = $.Vector$2(0, 0);
  var t4 = $.Vector$2(0, 0);
  var t5 = $.Vector$2(0, 0);
  return new $.Distance($.Vector$2(0, 0), t5, t4, t3, t2, t1, t0, 20, 0, 0);
};

$.getRange = function(receiver, start, length$) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.getRange$2(start, length$);
  }
  if (0 === length$) {
    return [];
  }
  $.checkNull(start);
  $.checkNull(length$);
  if (!((typeof start === 'number') && (start === (start | 0)))) {
    throw $.captureStackTrace($.IllegalArgumentException$1(start));
  }
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0)))) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  }
  if (length$ < 0) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  }
  if (start < 0) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(start));
  }
  var end = start + length$;
  if ($.gtB(end, $.get$length(receiver))) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(length$));
  }
  if ($.ltB(length$, 0)) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  }
  return receiver.slice(start, end);
};

$.getRange2 = function(a, start, length$, accumulator) {
  if (typeof a !== 'string' && (typeof a !== 'object'||a.constructor !== Array)) return $.getRange2$bailout(a, start, length$, accumulator,  0);
  if ($.ltB(length$, 0)) {
    throw $.captureStackTrace($.IllegalArgumentException$1('length'));
  }
  if ($.ltB(start, 0)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(start));
  }
  var end = $.add(start, length$);
  if ($.gtB(end, a.length)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(end));
  }
  for (var i = start; $.ltB(i, end); i = $.add(i, 1)) {
    if (i !== (i | 0)) throw $.iae(i);
    var t0 = a.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    $.add$1(accumulator, a[i]);
  }
  return accumulator;
};

$._DoubleLinkedQueueIterator$1 = function(_sentinel) {
  var t0 = new $._DoubleLinkedQueueIterator((void 0), _sentinel);
  t0._DoubleLinkedQueueIterator$1(_sentinel);
  return t0;
};

$._dynamicMetadata = function(table) {
  $dynamicMetadata = table;
};

$._dynamicMetadata2 = function() {
  if ((typeof($dynamicMetadata)) === 'undefined') {
    var t0 = [];
    $._dynamicMetadata(t0);
  }
  return $dynamicMetadata;
};

$.regExpGetNative = function(regExp) {
  var r = (regExp._re);
  var r0 = r;
  if (r === (void 0)) {
    r0 = (regExp._re = $.regExpMakeNative(regExp, false));
  }
  return r0;
};

$.throwNoSuchMethod = function(obj, name$, arguments$) {
  throw $.captureStackTrace($.NoSuchMethodException$4(obj, name$, arguments$, (void 0)));
};

$.checkNull = function(object) {
  if (object === (void 0)) {
    throw $.captureStackTrace($.NullPointerException$2((void 0), $.CTC));
  }
  return object;
};

$.ManifoldPoint$0 = function() {
  var t0 = $.Vector$2(0, 0);
  return new $.ManifoldPoint($.ContactID$0(), 0, 0, t0);
};

$.TimeOfImpactInput$0 = function() {
  var t0 = $.DistanceProxy$0();
  var t1 = $.DistanceProxy$0();
  var t2 = $.Sweep$0();
  return new $.TimeOfImpactInput(0, $.Sweep$0(), t2, t1, t0);
};

$.DoubleLinkedQueue$0 = function() {
  var t0 = new $.DoubleLinkedQueue((void 0));
  t0.DoubleLinkedQueue$0();
  return t0;
};

$.insertionSort_ = function(a, left, right, compare) {
  if (typeof a !== 'object'||a.constructor !== Array||!!a.immutable$list) return $.insertionSort_$bailout(a, left, right, compare,  0);
  if (typeof left !== 'number') return $.insertionSort_$bailout(a, left, right, compare,  0);
  if (typeof right !== 'number') return $.insertionSort_$bailout(a, left, right, compare,  0);
  for (var i = left + 1; i <= right; i = i + 1) {
    if (i !== (i | 0)) throw $.iae(i);
    var t0 = a.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    var t1 = a[i];
    var j = i;
    while (true) {
      var t2 = j > left;
      var t3 = t2;
      if (t2) {
        var t4 = j - 1;
        if (t4 !== (t4 | 0)) throw $.iae(t4);
        var t5 = a.length;
        if (t4 < 0 || t4 >= t5) throw $.ioore(t4);
        t3 = $.gtB(compare.$call$2(a[t4], t1), 0);
      }
      if (!t3) break;
      var j0 = j;
      var t6 = j - 1;
      if (t6 !== (t6 | 0)) throw $.iae(t6);
      var t7 = a.length;
      if (t6 < 0 || t6 >= t7) throw $.ioore(t6);
      var t8 = a[t6];
      if (j !== (j | 0)) throw $.iae(j);
      var t9 = a.length;
      if (j < 0 || j >= t9) throw $.ioore(j);
      a[j] = t8;
      j0 = t6;
      j = j0;
    }
    if (j !== (j | 0)) throw $.iae(j);
    var t10 = a.length;
    if (j < 0 || j >= t10) throw $.ioore(j);
    a[j] = t1;
  }
};

$.PolygonContact$1 = function(argPool) {
  var t0 = $.Manifold$0();
  var t1 = $.ContactEdge$0();
  var t2 = $.ContactEdge$0();
  return new $.PolygonContact($.Manifold$0(), argPool, (void 0), t0, (void 0), (void 0), t2, t1, (void 0), (void 0), (void 0));
};

$.checkNumbers = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') {
      return true;
    } else {
      $.checkNull(b);
      throw $.captureStackTrace($.IllegalArgumentException$1(b));
    }
  }
  return false;
};

$._DoubleLinkedQueueEntrySentinel$0 = function() {
  var t0 = new $._DoubleLinkedQueueEntrySentinel((void 0), (void 0), (void 0));
  t0.DoubleLinkedQueueEntry$1((void 0));
  t0._DoubleLinkedQueueEntrySentinel$0();
  return t0;
};

$.stringToString = function(value) {
  var res = $.toString(value);
  if (!(typeof res === 'string')) {
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  }
  return res;
};

$.WorldQueryWrapper$0 = function() {
  return new $.WorldQueryWrapper((void 0), (void 0));
};

$.crossNumAndVectorToOut = function(s, a, out) {
  var tempY = $.mul(s, a.get$x());
  out.set$x($.mul($.neg(s), a.get$y()));
  out.set$y(tempY);
};

$.Features$0 = function() {
  return new $.Features(0, 0, 0, 0);
};

$.Color3$0 = function() {
  return new $.Color3(0, 0, 0);
};

$.ContactEdge$0 = function() {
  return new $.ContactEdge((void 0), (void 0), (void 0), (void 0));
};

$.AxisAlignedBox$2 = function(lowerBound, upperBound) {
  var t0 = new $.AxisAlignedBox(upperBound, lowerBound);
  t0.AxisAlignedBox$2(lowerBound, upperBound);
  return t0;
};

$.contains$2 = function(receiver, other, startIndex) {
  if (!(typeof receiver === 'string')) {
    return receiver.contains$2(other, startIndex);
  }
  $.checkNull(other);
  return $.stringContainsUnchecked(receiver, other, startIndex);
};

$.toString = function(value) {
  if (typeof value == "object") {
    if ($.isJsArray(value) === true) {
      return $.collectionToString(value);
    } else {
      return value.toString$0();
    }
  }
  if (value === 0 && (1 / value) < 0) {
    return '-0.0';
  }
  if (value === (void 0)) {
    return 'null';
  }
  if (typeof value == "function") {
    return 'Closure';
  }
  return String(value);
};

$.Island$0 = function() {
  var t0 = $.ContactSolver$0();
  var t1 = $.Vector$2(0, 0);
  return new $.Island($.ContactImpulse$0(), t1, t0, (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0));
};

$.DynamicTree$0 = function() {
  var t0 = $.List(4);
  $.setRuntimeTypeInfo(t0, ({E: 'Vector'}));
  var t1 = $.Vector$2(0, 0);
  var t2 = $.AxisAlignedBox$2((void 0), (void 0));
  var t3 = $.DoubleLinkedQueue$0();
  $.setRuntimeTypeInfo(t3, ({E: 'DynamicTreeNode'}));
  var t4 = $.Vector$2(0, 0);
  var t5 = $.Vector$2(0, 0);
  var t6 = new $.DynamicTree($.Vector$2(0, 0), t5, t4, t2, t1, 0, t0, t3, 0, 0, (void 0), 0, (void 0));
  t6.DynamicTree$0();
  return t6;
};

$.IndexOutOfRangeException$1 = function(_index) {
  return new $.IndexOutOfRangeException(_index);
};

$.mulTransToOut = function(T, v, out) {
  var v1x = $.sub(v.get$x(), T.get$position().get$x());
  var v1y = $.sub(v.get$y(), T.get$position().get$y());
  var b = T.get$rotation().get$col1();
  var b1 = T.get$rotation().get$col2();
  var tempy = $.add($.mul(v1x, b1.get$x()), $.mul(v1y, b1.get$y()));
  out.set$x($.add($.mul(v1x, b.get$x()), $.mul(v1y, b.get$y())));
  out.set$y(tempy);
};

$.charCodeAt = function(receiver, index) {
  if (typeof receiver === 'string') {
    if (!(typeof index === 'number')) {
      throw $.captureStackTrace($.IllegalArgumentException$1(index));
    }
    if (index < 0) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    }
    if (index >= receiver.length) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    }
    return receiver.charCodeAt(index);
  } else {
    return receiver.charCodeAt$1(index);
  }
};

$.collectionToString = function(c) {
  var result = $.StringBufferImpl$1('');
  $._emitCollection(c, result, $.List((void 0)));
  return result.toString$0();
};

$.MetaInfo$3 = function(tag, tags, set) {
  return new $.MetaInfo(set, tags, tag);
};

$.ContactConstraintPoint$0 = function() {
  var t0 = $.Vector$2(0, 0);
  var t1 = $.Vector$2(0, 0);
  return new $.ContactConstraintPoint(0, 0, 0, 0, 0, $.Vector$2(0, 0), t1, t0);
};

$.removeLast = function(receiver) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'removeLast');
    if ($.get$length(receiver) === 0) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(-1));
    }
    return receiver.pop();
  }
  return receiver.removeLast$0();
};

$.ContactRegister$0 = function() {
  return new $.ContactRegister(false, (void 0));
};

$.clamp = function(a, low, high) {
  return $.max(low, $.min(a, high));
};

$.defineProperty = function(obj, property, value) {
  Object.defineProperty(obj, property,
      {value: value, enumerable: false, writable: true, configurable: true});;
};

$.dynamicFunction = function(name$) {
  var f = (Object.prototype[name$]);
  if (!(f === (void 0)) && (!!f.methods)) {
    return f.methods;
  }
  var methods = ({});
  var dartMethod = (Object.getPrototypeOf($.CTC6)[name$]);
  if (!(dartMethod === (void 0))) {
    methods['Object'] = dartMethod;
  }
  var bind = (function() {return $.dynamicBind.$call$4(this, name$, methods, Array.prototype.slice.call(arguments));});
  bind.methods = methods;
  $.defineProperty((Object.prototype), name$, bind);
  return methods;
};

$.checkString = function(value) {
  if (!(typeof value === 'string')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  }
  return value;
};

$.div = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a / b;
  }
  return a.operator$div$1(b);
};

$.distance = function(v1, v2) {
  return $.sqrt($.distanceSquared(v1, v2));
};

$.Matrix22$2 = function(c1, c2) {
  var t0 = new $.Matrix22((void 0), (void 0));
  t0.Matrix22$2(c1, c2);
  return t0;
};

$.objectToString = function(object) {
  var name$ = (object.constructor.name);
  var name0 = name$;
  if ($.charCodeAt(name$, 0) === 36) {
    name0 = $.substring$1(name$, 1);
  }
  return 'Instance of \'' + $.stringToString(name0) + '\'';
};

$.indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object'||a.constructor !== Array)) return $.indexOf$bailout(a, element, startIndex, endIndex,  0);
  if (typeof endIndex !== 'number') return $.indexOf$bailout(a, element, startIndex, endIndex,  0);
  if ($.geB(startIndex, a.length)) {
    return -1;
  }
  var i = startIndex;
  if ($.ltB(startIndex, 0)) {
    i = 0;
  }
  for (; $.ltB(i, endIndex); i = $.add(i, 1)) {
    if (i !== (i | 0)) throw $.iae(i);
    var t0 = a.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    if ($.eqB(a[i], element)) {
      return i;
    }
  }
  return -1;
};

$._firstProbe = function(hashCode, length$) {
  return $.and(hashCode, $.sub(length$, 1));
};

$.set$length = function(receiver, newLength) {
  if ($.isJsArray(receiver) === true) {
    $.checkNull(newLength);
    if (!((typeof newLength === 'number') && (newLength === (newLength | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(newLength));
    }
    if (newLength < 0) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(newLength));
    }
    $.checkGrowable(receiver, 'set length');
    receiver.length = newLength;
  } else {
    receiver.set$length(newLength);
  }
  return newLength;
};

$.ioore = function(index) {
  throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
};

$.typeNameInFirefox = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) {
    return 'DOMWindow';
  }
  if ($.eqB(name$, 'Document')) {
    return 'HTMLDocument';
  }
  if ($.eqB(name$, 'XMLDocument')) {
    return 'Document';
  }
  if ($.eqB(name$, 'WorkerMessageEvent')) {
    return 'MessageEvent';
  }
  return name$;
};

$.indexOf2 = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object'||a.constructor !== Array)) return $.indexOf2$bailout(a, element, startIndex, endIndex,  0);
  if (typeof endIndex !== 'number') return $.indexOf2$bailout(a, element, startIndex, endIndex,  0);
  if ($.geB(startIndex, a.length)) {
    return -1;
  }
  var i = startIndex;
  if ($.ltB(startIndex, 0)) {
    i = 0;
  }
  for (; $.ltB(i, endIndex); i = $.add(i, 1)) {
    if (i !== (i | 0)) throw $.iae(i);
    var t0 = a.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    if ($.eqB(a[i], element)) {
      return i;
    }
  }
  return -1;
};

$.PositionSolverManifold$0 = function() {
  var t0 = $.Vector$2(0, 0);
  var t1 = $.Vector$2(0, 0);
  var t2 = $.Vector$2(0, 0);
  var t3 = $.Vector$2(0, 0);
  var t4 = $.Vector$2(0, 0);
  var t5 = $.Vector$2(0, 0);
  return new $.PositionSolverManifold($.Vector$2(0, 0), t5, t4, t3, t2, 0, t1, t0);
};

$.DistanceProxy$0 = function() {
  var t0 = $.List(8);
  $.setRuntimeTypeInfo(t0, ({E: 'Vector'}));
  var t1 = new $.DistanceProxy(0, 0, t0);
  t1.DistanceProxy$0();
  return t1;
};

$.hashCode = function(receiver) {
  if (typeof receiver === 'number') {
    return receiver & 0x1FFFFFFF;
  }
  if (!(typeof receiver === 'string')) {
    return receiver.hashCode$0();
  }
  var length$ = (receiver.length);
  for (var hash = 0, i = 0; i < length$; hash = hash0, i = i0) {
    var hash0 = hash;
    var hash1 = (536870911 & hash + (receiver.charCodeAt(i))) >>> 0;
    var hash2 = (536870911 & hash1 + ((524287 & hash1) >>> 0 << 10)) >>> 0;
    hash0 = (hash2 ^ $.shr(hash2, 6)) >>> 0;
    var i0 = i + 1;
  }
  var hash3 = (536870911 & hash + ((67108863 & hash) >>> 0 << 3)) >>> 0;
  var hash4 = (hash3 ^ $.shr(hash3, 11)) >>> 0;
  return (536870911 & hash4 + ((16383 & hash4) >>> 0 << 15)) >>> 0;
};

$.min = function(a, b) {
  var c = $.compareTo(a, b);
  if ($.eqB(c, 0)) {
    return a;
  }
  if ($.ltB(c, 0)) {
    if (typeof b === 'number' && $.isNaN(b) === true) {
      return b;
    }
    return a;
  }
  if (typeof a === 'number' && $.isNaN(a) === true) {
    return a;
  }
  return b;
};

$.forEach = function(receiver, f) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.forEach$1(f);
  } else {
    return $.forEach2(receiver, f);
  }
};

$.startsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) {
    return receiver.startsWith$1(other);
  }
  $.checkString(other);
  var length$ = $.get$length(other);
  if ($.gtB(length$, receiver.length)) {
    return false;
  }
  return other == receiver.substring(0, length$);
};

$.forEach2 = function(iterable, f) {
  for (var t0 = $.iterator(iterable); t0.hasNext$0() === true; ) {
    f.$call$1(t0.next$0());
  }
};

$.le = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a <= b;
  }
  return a.operator$le$1(b);
};

$.toStringForNativeObject = function(obj) {
  return 'Instance of ' + $.stringToString($.getTypeNameOf(obj));
};

$.Fixture$0 = function() {
  var t0 = $.AxisAlignedBox$2((void 0), (void 0));
  var t1 = $.Filter$0();
  var t2 = $.AxisAlignedBox$2((void 0), (void 0));
  return new $.Fixture($.AxisAlignedBox$2((void 0), (void 0)), t2, (void 0), (void 0), t1, (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), t0);
};

$.forEach3 = function(iterable, f) {
  for (var t0 = $.iterator(iterable); t0.hasNext$0() === true; ) {
    f.$call$1(t0.next$0());
  }
};

$.dynamicBind = function(obj, name$, methods, arguments$) {
  var tag = $.getTypeNameOf(obj);
  var method = (methods[tag]);
  var method0 = method;
  if (method === (void 0) && !($._dynamicMetadata2() === (void 0))) {
    for (var method1 = method, i = 0; method0 = method1, $.ltB(i, $.get$length($._dynamicMetadata2())); method1 = method2, i = i0) {
      var method2 = method1;
      var entry = $.index($._dynamicMetadata2(), i);
      method2 = method1;
      if ($.contains$1(entry.get$set(), tag) === true) {
        var method3 = (methods[entry.get$tag()]);
        if (!(method3 === (void 0))) {
          method0 = method3;
          break;
        }
        method2 = method3;
      }
      var i0 = i + 1;
    }
  }
  var method4 = method0;
  if (method0 === (void 0)) {
    method4 = (methods['Object']);
  }
  var proto = (Object.getPrototypeOf(obj));
  var method5 = method4;
  if (method4 === (void 0)) {
    method5 = (function () {if (Object.getPrototypeOf(this) === proto) {$.throwNoSuchMethod.$call$3(this, name$, Array.prototype.slice.call(arguments));} else {return Object.prototype[name$].apply(this, arguments);}});
  }
  var nullCheckMethod = (function() {var res = method5.apply(this, Array.prototype.slice.call(arguments));return res === null ? (void 0) : res;});
  if (!proto.hasOwnProperty(name$)) {
    $.defineProperty(proto, name$, nullCheckMethod);
  }
  return nullCheckMethod.apply(obj, arguments$);
};

$.getFunctionForTypeNameOf = function() {
  if (!((typeof(navigator)) === 'object')) {
    return $.typeNameInChrome;
  }
  var userAgent = (navigator.userAgent);
  if ($.contains$1(userAgent, $.CTC4) === true) {
    return $.typeNameInChrome;
  } else {
    if ($.contains$1(userAgent, 'Firefox') === true) {
      return $.typeNameInFirefox;
    } else {
      if ($.contains$1(userAgent, 'MSIE') === true) {
        return $.typeNameInIE;
      } else {
        return $.constructorNameFallback;
      }
    }
  }
};

$.ContactID$0 = function() {
  return new $.ContactID($.Features$0());
};

$.World$3 = function(gravity, doSleep, argPool) {
  var t0 = $.List(2);
  $.setRuntimeTypeInfo(t0, ({E: 'List<ContactRegister>'}));
  var t1 = $.Vector$2(0, 0);
  var t2 = $.Vector$2(0, 0);
  var t3 = $.TimeStep$0();
  var t4 = $.Vector$2(0, 0);
  var t5 = $.Vector$2(0, 0);
  var t6 = $.WorldQueryWrapper$0();
  var t7 = $.TimeOfImpactInput$0();
  var t8 = $.TimeOfImpactOutput$0();
  var t9 = $.Sweep$0();
  var t10 = $.TimeOfImpactSolver$0();
  var t11 = $.List(32);
  $.setRuntimeTypeInfo(t11, ({E: 'Contact'}));
  var t12 = $.Island$0();
  var t13 = $.List(10);
  $.setRuntimeTypeInfo(t13, ({E: 'Body'}));
  var t14 = new $.World(t13, t12, t11, t10, t9, t8, t7, t6, t5, t4, t3, t2, t1, t0, true, true, 0, argPool, (void 0), (void 0), (void 0), doSleep, gravity, 0, 0, (void 0), (void 0), (void 0), 4);
  t14.World$3(gravity, doSleep, argPool);
  return t14;
};

$.DistanceOutput$0 = function() {
  var t0 = $.Vector$2(0, 0);
  return new $.DistanceOutput((void 0), (void 0), $.Vector$2(0, 0), t0);
};

$.sin = function(x) {
  return $.sin2(x);
};

$._doSort = function(a, left, right, compare) {
  if ($.leB($.sub(right, left), 32)) {
    $.insertionSort_(a, left, right, compare);
  } else {
    $._dualPivotQuicksort(a, left, right, compare);
  }
};

$.sin2 = function(value) {
  return Math.sin($.checkNum(value));
};

$.List = function(length$) {
  return $.newList(length$);
};

$._isPowerOfTwo = function(x) {
  return $.eq($.and(x, $.sub(x, 1)), 0);
};

$.PolygonShape$0 = function() {
  var t0 = $.List(8);
  $.setRuntimeTypeInfo(t0, ({E: 'Vector'}));
  var t1 = $.List(8);
  $.setRuntimeTypeInfo(t1, ({E: 'Vector'}));
  var t2 = new $.PolygonShape(0, t1, t0, $.Vector$2(0, 0), 0.01, 1);
  t2.PolygonShape$0();
  return t2;
};

$.captureStackTrace = function(ex) {
  var jsError = (new Error());
  jsError.dartException = ex;
  jsError.toString = $.toStringWrapper.$call$0;
  return jsError;
};

$.PolygonShape$copy$1 = function(other) {
  var t0 = other.get$radius();
  var t1 = other.get$vertexCount();
  var t2 = $.List(8);
  $.setRuntimeTypeInfo(t2, ({E: 'Vector'}));
  var t3 = $.List(8);
  $.setRuntimeTypeInfo(t3, ({E: 'Vector'}));
  var t4 = new $.PolygonShape(t1, t3, t2, $.Vector$copy$1(other.get$centroid()), t0, 1);
  t4.PolygonShape$copy$1(other);
  return t4;
};

$.StackOverflowException$0 = function() {
  return new $.StackOverflowException();
};

$.eq = function(a, b) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) {
      return a.operator$eq$1(b);
    } else {
      return a === b;
    }
  }
  return a === b;
};

$.StringBufferImpl$1 = function(content$) {
  var t0 = new $.StringBufferImpl((void 0), (void 0));
  t0.StringBufferImpl$1(content$);
  return t0;
};

$.Position$0 = function() {
  var t0 = new $.Position((void 0), (void 0));
  t0.Position$0();
  return t0;
};

$.HashMapImplementation$0 = function() {
  var t0 = new $.HashMapImplementation((void 0), (void 0), (void 0), (void 0), (void 0));
  t0.HashMapImplementation$0();
  return t0;
};

$.substring$1 = function(receiver, startIndex) {
  if (!(typeof receiver === 'string')) {
    return receiver.substring$1(startIndex);
  }
  return $.substring$2(receiver, startIndex, (void 0));
};

$.DominoTest$0 = function() {
  var t0 = $.List((void 0));
  $.setRuntimeTypeInfo(t0, ({E: 'Body'}));
  var t1 = new $.DominoTest((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), t0);
  t1.Demo$0();
  return t1;
};

$.index = function(a, index) {
  if (typeof a === 'string' || $.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) {
      if (!(typeof index === 'number')) {
        throw $.captureStackTrace($.IllegalArgumentException$1(index));
      }
      if (!($.truncate(index) === index)) {
        throw $.captureStackTrace($.IllegalArgumentException$1(index));
      }
    }
    if ($.ltB(index, 0) || $.geB(index, $.get$length(a))) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    }
    return a[index];
  }
  return a.operator$index$1(index);
};

$.FixtureDef$0 = function() {
  var t0 = new $.FixtureDef($.Filter$0(), false, 0, 0, 0.2, (void 0), (void 0));
  t0.FixtureDef$0();
  return t0;
};

$.TimeOfImpactOutput$0 = function() {
  return new $.TimeOfImpactOutput(0, 0);
};

$.Simplex$0 = function() {
  var t0 = $.SimplexVertex$0();
  var t1 = $.SimplexVertex$0();
  var t2 = $.SimplexVertex$0();
  var t3 = $.List(3);
  $.setRuntimeTypeInfo(t3, ({E: 'SimplexVertex'}));
  var t4 = $.Vector$2(0, 0);
  var t5 = $.Vector$2(0, 0);
  var t6 = $.Vector$2(0, 0);
  var t7 = $.Vector$2(0, 0);
  var t8 = $.Vector$2(0, 0);
  var t9 = $.Vector$2(0, 0);
  var t10 = new $.Simplex($.Vector$2(0, 0), t9, t8, t7, t5, t6, t4, 0, t3, t2, t1, t0);
  t10.Simplex$0();
  return t10;
};

$.BodyDef$0 = function() {
  var t0 = $.Vector$2(0, 0);
  return new $.BodyDef(true, true, 0, 0, true, false, (void 0), false, 0, $.Vector$2(0, 0), t0, (void 0), 0, 0);
};

$.sort = function(receiver, compare) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.sort$1(compare);
  }
  $.checkMutable(receiver, 'sort');
  $.sort2(receiver, compare);
};

$.gtB = function(a, b) {
  return $.gt(a, b) === true;
};

$._fail = function(message) {
  throw $.captureStackTrace($.ExpectException$1(message));
};

$.setRuntimeTypeInfo = function(target, typeInfo) {
  if (!(target === (void 0))) {
    target.builtin$typeInfo = typeInfo;
  }
};

$.SimplexVertex$0 = function() {
  var t0 = $.Vector$2(0, 0);
  var t1 = $.Vector$2(0, 0);
  return new $.SimplexVertex(0, 0, 0, $.Vector$2(0, 0), t1, t0);
};

$.dot = function(one, two) {
  return $.add($.mul(one.get$x(), two.get$x()), $.mul(one.get$y(), two.get$y()));
};

$.sort2 = function(a, compare) {
  $._doSort(a, 0, $.sub($.get$length(a), 1), compare);
};

$.document = function() {
  return document;;
};

$.NoSuchMethodException$4 = function(_receiver, _functionName, _arguments, _existingArgumentNames) {
  return new $.NoSuchMethodException(_existingArgumentNames, _arguments, _functionName, _receiver);
};

$.lt = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a < b;
  }
  return a.operator$lt$1(b);
};

$.unwrapException = function(ex) {
  if ("dartException" in ex) {
    return ex.dartException;
  } else {
    if (ex instanceof TypeError) {
      var type = (ex.type);
      var name$ = $.index((ex.arguments), 0);
      if (type === 'property_not_function' || type === 'called_non_callable' || type === 'non_object_property_call' || type === 'non_object_property_load') {
        if (!(name$ === (void 0)) && $.startsWith(name$, '$call$') === true) {
          return $.ObjectNotClosureException$0();
        } else {
          return $.NullPointerException$2((void 0), $.CTC);
        }
      } else {
        if (type === 'undefined_method') {
          if (typeof name$ === 'string' && $.startsWith(name$, '$call$') === true) {
            return $.ObjectNotClosureException$0();
          } else {
            return $.NoSuchMethodException$4('', name$, [], (void 0));
          }
        }
      }
    } else {
      if (ex instanceof RangeError) {
        if ($.contains$1((ex.message), 'call stack') === true) {
          return $.StackOverflowException$0();
        }
      }
    }
  }
  return ex;
};

$.ceil = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.ceil$0();
  }
  return Math.ceil(receiver);
};

$.getTypeNameOf = function(obj) {
  if ($._getTypeNameOf === (void 0)) {
    $._getTypeNameOf = $.getFunctionForTypeNameOf();
  }
  return $._getTypeNameOf.$call$1(obj);
};

$.cos = function(x) {
  return $.cos2(x);
};

$.cos2 = function(value) {
  return Math.cos($.checkNum(value));
};

$.sub = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a - b;
  }
  return a.operator$sub$1(b);
};

$.mulToOut = function(transform, vector, out) {
  $.assert(!$.eqNullB(out));
  var tempY = $.add($.add(transform.get$position().get$y(), $.mul(transform.get$rotation().get$col1().get$y(), vector.get$x())), $.mul(transform.get$rotation().get$col2().get$y(), vector.get$y()));
  out.set$x($.add($.add(transform.get$position().get$x(), $.mul(transform.get$rotation().get$col1().get$x(), vector.get$x())), $.mul(transform.get$rotation().get$col2().get$x(), vector.get$y())));
  out.set$y(tempY);
};

$.copy$bailout = function(src, srcStart, dst, dstStart, count, state, env0, env1, env2) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      t1 = env1;
      break;
    case 3:
      t0 = env0;
      t1 = env1;
      t2 = env2;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
    case 3:
      state = 0;
      var srcStart0 = srcStart;
      if (srcStart === (void 0)) {
        srcStart0 = 0;
      }
      var dstStart0 = dstStart;
      if (dstStart === (void 0)) {
        dstStart0 = 0;
      }
      if ($.ltB(srcStart0, dstStart0)) {
        var i = $.sub($.add(srcStart0, count), 1);
        var i0 = i;
        var j = $.sub($.add(dstStart0, count), 1);
        L0: while (true) {
          if (!$.geB(i0, srcStart0)) break L0;
          $.indexSet(dst, j, $.index(src, i0));
          var i1 = $.sub(i0, 1);
          i0 = i1;
          j = $.sub(j, 1);
        }
      } else {
        var i2 = srcStart0;
        var j0 = dstStart0;
        L1: while (true) {
          if (!$.ltB(i2, $.add(srcStart0, count))) break L1;
          $.indexSet(dst, j0, $.index(src, i2));
          var i3 = $.add(i2, 1);
          i2 = i3;
          j0 = $.add(j0, 1);
        }
      }
  }
};

$.insertionSort_$bailout = function(a, left, right, compare, state, env0, env1, env2) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      t1 = env1;
      break;
    case 3:
      t0 = env0;
      t1 = env1;
      t2 = env2;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
    case 3:
      state = 0;
      var i = $.add(left, 1);
      L0: while (true) {
        if (!$.leB(i, right)) break L0;
        var el = $.index(a, i);
        var j = i;
        L1: while (true) {
          if (!($.gtB(j, left) && $.gtB(compare.$call$2($.index(a, $.sub(j, 1)), el), 0))) break L1;
          var j0 = j;
          $.indexSet(a, j, $.index(a, $.sub(j, 1)));
          j0 = $.sub(j, 1);
          j = j0;
        }
        $.indexSet(a, j, el);
        i = $.add(i, 1);
      }
  }
};

$.indexOf2$bailout = function(a, element, startIndex, endIndex, state, env0, env1) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) {
        return -1;
      }
      var i = startIndex;
      if ($.ltB(startIndex, 0)) {
        i = 0;
      }
      L0: while (true) {
        if (!$.ltB(i, endIndex)) break L0;
        if ($.eqB($.index(a, i), element)) {
          return i;
        }
        i = $.add(i, 1);
      }
      return -1;
  }
};

$.indexOf$bailout = function(a, element, startIndex, endIndex, state, env0, env1) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) {
        return -1;
      }
      var i = startIndex;
      if ($.ltB(startIndex, 0)) {
        i = 0;
      }
      L0: while (true) {
        if (!$.ltB(i, endIndex)) break L0;
        if ($.eqB($.index(a, i), element)) {
          return i;
        }
        i = $.add(i, 1);
      }
      return -1;
  }
};

$._dualPivotQuicksort$bailout = function(a, left, right, compare, state, env0) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      $.assert($.gt($.sub(right, left), 32));
      var sixth = $.tdiv($.add($.sub(right, left), 1), 6);
      var index1 = $.add(left, sixth);
      var index5 = $.sub(right, sixth);
      var index3 = $.tdiv($.add(left, right), 2);
      var index2 = $.sub(index3, sixth);
      var index4 = $.add(index3, sixth);
      var el1 = $.index(a, index1);
      var el2 = $.index(a, index2);
      var el3 = $.index(a, index3);
      var el4 = $.index(a, index4);
      var el5 = $.index(a, index5);
      var el20 = el2;
      var el10 = el1;
      if ($.gtB(compare.$call$2(el1, el2), 0)) {
        el20 = el1;
        el10 = el2;
      }
      var el40 = el4;
      var el50 = el5;
      if ($.gtB(compare.$call$2(el4, el5), 0)) {
        el40 = el5;
        el50 = el4;
      }
      var el11 = el10;
      var el30 = el3;
      if ($.gtB(compare.$call$2(el10, el3), 0)) {
        el11 = el3;
        el30 = el10;
      }
      var el21 = el20;
      var el31 = el30;
      if ($.gtB(compare.$call$2(el20, el30), 0)) {
        el21 = el30;
        el31 = el20;
      }
      var el12 = el11;
      var el41 = el40;
      if ($.gtB(compare.$call$2(el11, el40), 0)) {
        el12 = el40;
        el41 = el11;
      }
      var el42 = el41;
      var el32 = el31;
      if ($.gtB(compare.$call$2(el31, el41), 0)) {
        el42 = el31;
        el32 = el41;
      }
      var el22 = el21;
      var el51 = el50;
      if ($.gtB(compare.$call$2(el21, el50), 0)) {
        el22 = el50;
        el51 = el21;
      }
      var el23 = el22;
      var el33 = el32;
      if ($.gtB(compare.$call$2(el22, el32), 0)) {
        el23 = el32;
        el33 = el22;
      }
      var el43 = el42;
      var el52 = el51;
      if ($.gtB(compare.$call$2(el42, el51), 0)) {
        el43 = el51;
        el52 = el42;
      }
      $.indexSet(a, index1, el12);
      $.indexSet(a, index3, el33);
      $.indexSet(a, index5, el52);
      $.indexSet(a, index2, $.index(a, left));
      $.indexSet(a, index4, $.index(a, right));
      var less = $.add(left, 1);
      var great = $.sub(right, 1);
      var t1 = $.eq(compare.$call$2(el23, el43), 0) === true;
      if (t1) {
        var great0 = great;
        var less0 = less;
        var k = less;
        L0: while (true) {
          if (!$.leB(k, great0)) break L0;
          c$0:{
            var great1 = great0;
            var less1 = less0;
            var ak = $.index(a, k);
            var comp = compare.$call$2(ak, el23);
            if ($.eqB(comp, 0)) {
              great1 = great0;
              less1 = less0;
              break c$0;
            }
            if ($.ltB(comp, 0)) {
              if (!$.eqB(k, less0)) {
                $.indexSet(a, k, $.index(a, less0));
                $.indexSet(a, less0, ak);
              }
              great1 = great0;
              less1 = $.add(less0, 1);
            } else {
              var comp0 = comp;
              var great2 = great0;
              L1: while (true) {
                great1 = great2;
                less1 = less0;
                if (!true) break L1;
                c$1:{
                  var comp1 = compare.$call$2($.index(a, great2), el23);
                  if ($.gtB(comp1, 0)) {
                    var great3 = $.sub(great2, 1);
                    comp0 = comp1;
                    break c$1;
                  } else {
                    if ($.ltB(comp1, 0)) {
                      $.indexSet(a, k, $.index(a, less0));
                      var less2 = $.add(less0, 1);
                      $.indexSet(a, less0, $.index(a, great2));
                      var great4 = $.sub(great2, 1);
                      $.indexSet(a, great2, ak);
                      great1 = great4;
                      less1 = less2;
                      break;
                    } else {
                      $.indexSet(a, k, $.index(a, great2));
                      var great5 = $.sub(great2, 1);
                      $.indexSet(a, great2, ak);
                      great1 = great5;
                      less1 = less0;
                      break;
                    }
                  }
                  great3 = great2;
                }
                great2 = great3;
              }
            }
          }
          var k0 = $.add(k, 1);
          great0 = great1;
          less0 = less1;
          k = k0;
        }
        var great6 = great0;
        var less3 = less0;
      } else {
        var less4 = less;
        var k1 = less;
        var great7 = great;
        L2: while (true) {
          if (!$.leB(k1, great7)) break L2;
          var great8 = great7;
          var less5 = less4;
          var ak0 = $.index(a, k1);
          if ($.ltB(compare.$call$2(ak0, el23), 0)) {
            if (!$.eqB(k1, less4)) {
              $.indexSet(a, k1, $.index(a, less4));
              $.indexSet(a, less4, ak0);
            }
            great8 = great7;
            less5 = $.add(less4, 1);
          } else {
            great8 = great7;
            less5 = less4;
            if ($.gtB(compare.$call$2(ak0, el43), 0)) {
              var great9 = great7;
              L3: while (true) {
                great8 = great9;
                less5 = less4;
                if (!true) break L3;
                c$1:{
                  if ($.gtB(compare.$call$2($.index(a, great9), el43), 0)) {
                    var great10 = $.sub(great9, 1);
                    if ($.ltB(great10, k1)) {
                      great8 = great10;
                      less5 = less4;
                      break;
                    }
                    var great11 = great10;
                    break c$1;
                  } else {
                    if ($.ltB(compare.$call$2($.index(a, great9), el23), 0)) {
                      $.indexSet(a, k1, $.index(a, less4));
                      var less6 = $.add(less4, 1);
                      $.indexSet(a, less4, $.index(a, great9));
                      var great12 = $.sub(great9, 1);
                      $.indexSet(a, great9, ak0);
                      great8 = great12;
                      less5 = less6;
                    } else {
                      $.indexSet(a, k1, $.index(a, great9));
                      var great13 = $.sub(great9, 1);
                      $.indexSet(a, great9, ak0);
                      great8 = great13;
                      less5 = less4;
                    }
                    break;
                  }
                  great11 = great9;
                }
                great9 = great11;
              }
            }
          }
          var k2 = $.add(k1, 1);
          less4 = less5;
          k1 = k2;
          great7 = great8;
        }
        great6 = great7;
        less3 = less4;
      }
      $.indexSet(a, left, $.index(a, $.sub(less3, 1)));
      $.indexSet(a, $.sub(less3, 1), el23);
      $.indexSet(a, right, $.index(a, $.add(great6, 1)));
      $.indexSet(a, $.add(great6, 1), el43);
      $._doSort(a, left, $.sub(less3, 2), compare);
      $._doSort(a, $.add(great6, 2), right, compare);
      if (t1) {
        return;
      }
      if ($.ltB(less3, index1) && $.gtB(great6, index5)) {
        var less7 = less3;
        L4: while (true) {
          if (!$.eqB(compare.$call$2($.index(a, less7), el23), 0)) break L4;
          var less8 = less7;
          less8 = $.add(less7, 1);
          less7 = less8;
        }
        var great14 = great6;
        L5: while (true) {
          if (!$.eqB(compare.$call$2($.index(a, great14), el43), 0)) break L5;
          var great15 = great14;
          great15 = $.sub(great14, 1);
          great14 = great15;
        }
        var great16 = great14;
        var less9 = less7;
        var k3 = less7;
        L6: while (true) {
          if (!$.leB(k3, great16)) break L6;
          var great17 = great16;
          var less10 = less9;
          var ak1 = $.index(a, k3);
          if ($.eqB(compare.$call$2(ak1, el23), 0)) {
            if (!$.eqB(k3, less9)) {
              $.indexSet(a, k3, $.index(a, less9));
              $.indexSet(a, less9, ak1);
            }
            great17 = great16;
            less10 = $.add(less9, 1);
          } else {
            great17 = great16;
            less10 = less9;
            if ($.eqB(compare.$call$2(ak1, el43), 0)) {
              var great18 = great16;
              L7: while (true) {
                great17 = great18;
                less10 = less9;
                if (!true) break L7;
                c$1:{
                  if ($.eqB(compare.$call$2($.index(a, great18), el43), 0)) {
                    var great19 = $.sub(great18, 1);
                    if ($.ltB(great19, k3)) {
                      great17 = great19;
                      less10 = less9;
                      break;
                    }
                    var great20 = great19;
                    break c$1;
                  } else {
                    if ($.ltB(compare.$call$2($.index(a, great18), el23), 0)) {
                      $.indexSet(a, k3, $.index(a, less9));
                      var less11 = $.add(less9, 1);
                      $.indexSet(a, less9, $.index(a, great18));
                      var great21 = $.sub(great18, 1);
                      $.indexSet(a, great18, ak1);
                      great17 = great21;
                      less10 = less11;
                    } else {
                      $.indexSet(a, k3, $.index(a, great18));
                      var great22 = $.sub(great18, 1);
                      $.indexSet(a, great18, ak1);
                      great17 = great22;
                      less10 = less9;
                    }
                    break;
                  }
                  great20 = great18;
                }
                great18 = great20;
              }
            }
          }
          var k4 = $.add(k3, 1);
          great16 = great17;
          less9 = less10;
          k3 = k4;
        }
        $._doSort(a, less9, great16, compare);
      } else {
        $._doSort(a, less3, great6, compare);
      }
  }
};

$.allMatchesInStringUnchecked$bailout = function(needle, haystack, state, env0, env1, env2) {
  switch (state) {
    case 1:
      length$ = env0;
      result = env1;
      patternLength = env2;
      break;
  }
  switch (state) {
    case 0:
      var result = $.List((void 0));
      $.setRuntimeTypeInfo(result, ({E: 'Match'}));
      var length$ = $.get$length(haystack);
      var patternLength = $.get$length(needle);
    case 1:
      state = 0;
      var startIndex = 0;
      L0: while (true) {
        if (!true) break L0;
        var startIndex0 = startIndex;
        var position = $.indexOf$2(haystack, needle, startIndex);
        if ($.eqB(position, -1)) {
          break;
        }
        result.push($.StringMatch$3(position, haystack, needle));
        var endIndex = $.add(position, patternLength);
        if ($.eqB(endIndex, length$)) {
          break;
        } else {
          if ($.eqB(position, endIndex)) {
            startIndex0 = $.add(startIndex, 1);
          } else {
            startIndex0 = endIndex;
          }
        }
        startIndex = startIndex0;
      }
      return result;
  }
};

$.buildDynamicMetadata$bailout = function(inputTable, state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      result = env1;
      tag = env2;
      i = env3;
      tags = env4;
      set = env5;
      tagNames = env6;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var result = [];
      var i = 0;
    case 2:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, $.get$length(inputTable))) break L0;
            var tag = $.index($.index(inputTable, i), 0);
            var tags = $.index($.index(inputTable, i), 1);
            var set = $.HashSetImplementation$0();
            $.setRuntimeTypeInfo(set, ({E: 'String'}));
            var tagNames = $.split(tags, '|');
          case 2:
            state = 0;
            var j = 0;
            L1: while (true) {
              if (!$.ltB(j, $.get$length(tagNames))) break L1;
              set.add$1($.index(tagNames, j));
              j = j + 1;
            }
            $.add$1(result, $.MetaInfo$3(tag, tags, set));
            i = i + 1;
        }
      }
      return result;
  }
};

$.getRange2$bailout = function(a, start, length$, accumulator, state, env0) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if ($.ltB(length$, 0)) {
        throw $.captureStackTrace($.IllegalArgumentException$1('length'));
      }
      if ($.ltB(start, 0)) {
        throw $.captureStackTrace($.IndexOutOfRangeException$1(start));
      }
      var end = $.add(start, length$);
      if ($.gtB(end, $.get$length(a))) {
        throw $.captureStackTrace($.IndexOutOfRangeException$1(end));
      }
      var i = start;
      L0: while (true) {
        if (!$.ltB(i, end)) break L0;
        $.add$1(accumulator, $.index(a, i));
        i = $.add(i, 1);
      }
      return accumulator;
  }
};

$.dynamicBind.$call$4 = $.dynamicBind;
$.throwNoSuchMethod.$call$3 = $.throwNoSuchMethod;
$.typeNameInIE.$call$1 = $.typeNameInIE;
$.typeNameInChrome.$call$1 = $.typeNameInChrome;
$.toStringWrapper.$call$0 = $.toStringWrapper;
$.invokeClosure.$call$5 = $.invokeClosure;
$.typeNameInFirefox.$call$1 = $.typeNameInFirefox;
$.constructorNameFallback.$call$1 = $.constructorNameFallback;
Isolate.$finishClasses();
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC = Isolate.makeConstantList([]);
$.CTC5 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC4 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'Chrome|DumpRenderTree');
$.CTC6 = new Isolate.$isolateProperties.Object();
$.CTC2 = new Isolate.$isolateProperties.NoMoreElementsException();
$.CTC3 = new Isolate.$isolateProperties.EmptyQueueException();
$.toiRootIters = (void 0);
$._cachedBrowserPrefix = (void 0);
$.toiCalls = (void 0);
$.toiIters = (void 0);
$.toiMaxRootIters = (void 0);
$.toiMaxIters = (void 0);
$._getTypeNameOf = (void 0);
var $ = null;
Isolate.$finishClasses();
Isolate = Isolate.$finishIsolateConstructor(Isolate);
var $ = new Isolate();
$.$defineNativeClass = function(cls, fields, methods) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  for (var i = 0; i < fields.length; i++) {
    generateGetterSetter(fields[i], methods);
  }
  for (var method in methods) {
    $.dynamicFunction(method)[cls] = methods[method];
  }
};
$.defineProperty(Object.prototype, 'is$List2', function() { return false; });
$.defineProperty(Object.prototype, 'is$Map', function() { return false; });
$.defineProperty(Object.prototype, 'is$Collection', function() { return false; });
$.defineProperty(Object.prototype, 'toString$0', function() { return $.toStringForNativeObject(this); });
$.$defineNativeClass('HTMLAnchorElement', ["type=", "shape?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('WebKitAnimationList', ["length?"], {
});

$.$defineNativeClass('HTMLAppletElement', ["width!", "height!"], {
});

$.$defineNativeClass('HTMLAreaElement', ["shape?"], {
});

$.$defineNativeClass('AudioBuffer', ["length?"], {
});

$.$defineNativeClass('HTMLBRElement', [], {
 clear$0: function() { return this.clear.$call$0(); }
});

$.$defineNativeClass('BiquadFilterNode', ["type="], {
});

$.$defineNativeClass('Blob', ["type?"], {
});

$.$defineNativeClass('HTMLButtonElement', ["type?"], {
});

$.$defineNativeClass('WebKitCSSMatrix', ["a="], {
 toString$0: function() {
  return this.toString();
 },
 scale$3: function(scaleX, scaleY, scaleZ) {
  return this.scale(scaleX,scaleY,scaleZ);
 },
 get$scale: function() { return new $.Closure19(this); }
});

$.$defineNativeClass('CSSRule', ["type?"], {
});

$.$defineNativeClass('CSSRuleList', ["length?"], {
});

$.$defineNativeClass('CSSStyleDeclaration', ["length?"], {
 set$width: function(value) {
  this.setProperty$3('width', value, '');
 },
 get$position: function() {
  return this.getPropertyValue$1('position');
 },
 set$height: function(value) {
  this.setProperty$3('height', value, '');
 },
 set$font: function(value) {
  this.setProperty$3('font', value, '');
 },
 get$filter: function() {
  return this.getPropertyValue$1('' + $.stringToString($._browserPrefix()) + 'filter');
 },
 filter$1: function(arg0) { return this.get$filter().$call$1(arg0); },
 get$clear: function() {
  return this.getPropertyValue$1('clear');
 },
 clear$0: function() { return this.get$clear().$call$0(); },
 setProperty$3: function(propertyName, value, priority) {
  return this.setProperty(propertyName,value,priority);
 },
 getPropertyValue$1: function(propertyName) {
  return this.getPropertyValue(propertyName);
 }
});

$.$defineNativeClass('CSSValueList', ["length?"], {
});

$.$defineNativeClass('HTMLCanvasElement', ["width!", "height!"], {
 getContext$1: function(contextId) {
  return this.getContext(contextId);
 }
});

$.$defineNativeClass('CanvasRenderingContext2D', ["font!"], {
 stroke$0: function() {
  return this.stroke();
 },
 setStrokeColor$5: function(c_OR_color_OR_grayLevel_OR_r, alpha_OR_g_OR_m, b_OR_y, a_OR_k, a) {
  return this.setStrokeColor(c_OR_color_OR_grayLevel_OR_r,alpha_OR_g_OR_m,b_OR_y,a_OR_k,a);
 },
 setStrokeColor$4: function(c_OR_color_OR_grayLevel_OR_r,alpha_OR_g_OR_m,b_OR_y,a_OR_k) {
  return this.setStrokeColor(c_OR_color_OR_grayLevel_OR_r,alpha_OR_g_OR_m,b_OR_y,a_OR_k);
},
 setFillColor$5: function(c_OR_color_OR_grayLevel_OR_r, alpha_OR_g_OR_m, b_OR_y, a_OR_k, a) {
  return this.setFillColor(c_OR_color_OR_grayLevel_OR_r,alpha_OR_g_OR_m,b_OR_y,a_OR_k,a);
 },
 setFillColor$1: function(c_OR_color_OR_grayLevel_OR_r) {
  return this.setFillColor(c_OR_color_OR_grayLevel_OR_r);
},
 setFillColor$4: function(c_OR_color_OR_grayLevel_OR_r,alpha_OR_g_OR_m,b_OR_y,a_OR_k) {
  return this.setFillColor(c_OR_color_OR_grayLevel_OR_r,alpha_OR_g_OR_m,b_OR_y,a_OR_k);
},
 scale$2: function(sx, sy) {
  return this.scale(sx,sy);
 },
 get$scale: function() { return new $.Closure20(this); },
 moveTo$2: function(x, y) {
  return this.moveTo(x,y);
 },
 lineTo$2: function(x, y) {
  return this.lineTo(x,y);
 },
 fillText$4: function(text, x, y, maxWidth) {
  return this.fillText(text,x,y,maxWidth);
 },
 fillText$3: function(text,x,y) {
  return this.fillText(text,x,y);
},
 fill$0: function() {
  return this.fill();
 },
 closePath$0: function() {
  return this.closePath();
 },
 clearRect$4: function(x, y, width, height) {
  return this.clearRect(x,y,width,height);
 },
 beginPath$0: function() {
  return this.beginPath();
 },
 arc$6: function(x, y, radius, startAngle, endAngle, anticlockwise) {
  return this.arc(x,y,radius,startAngle,endAngle,anticlockwise);
 }
});

$.$defineNativeClass('CharacterData', ["length?"], {
});

$.$defineNativeClass('ClientRectList', ["length?"], {
});

_ConsoleImpl = (typeof console == 'undefined' ? {} : console);
_ConsoleImpl.count$0 = function() {
  return this.count();
 };
_ConsoleImpl.get$count = function() { return new $.Closure21(this); };
$.$defineNativeClass('ConvolverNode', [], {
 normalize$0: function() { return this.normalize.$call$0(); }
});

$.$defineNativeClass('DOMException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('DOMMimeType', ["type?"], {
});

$.$defineNativeClass('DOMMimeTypeArray', ["length?"], {
});

$.$defineNativeClass('DOMPlugin', ["length?"], {
});

$.$defineNativeClass('DOMPluginArray', ["length?"], {
});

$.$defineNativeClass('DOMSelection', ["type?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('DOMStringList', ["length?"], {
 contains$1: function(string) {
  return this.contains(string);
 },
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,(void 0))
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter(this, [], f);
 },
 get$filter: function() { return new $.Closure22(this); },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'String'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('DOMTokenList', ["length?"], {
 toString$0: function() {
  return this.toString();
 },
 contains$1: function(token) {
  return this.contains(token);
 },
 add$1: function(token) {
  return this.add(token);
 }
});

$.$defineNativeClass('DataTransferItem', ["type?"], {
});

$.$defineNativeClass('DataTransferItemList', ["length?"], {
 clear$0: function() {
  return this.clear();
 },
 add$2: function(data_OR_file, type) {
  return this.add(data_OR_file,type);
 },
 add$1: function(data_OR_file) {
  return this.add(data_OR_file);
}
});

$.$defineNativeClass('HTMLDocument', ["body?"], {
});

$.$defineNativeClass('DocumentFragment', [], {
 get$parent: function() {
  return;
 },
 get$id: function() {
  return '';
 }
});

$.$defineNativeClass('Element', ["id?"], {
});

$.$defineNativeClass('HTMLEmbedElement', ["width!", "type=", "height!"], {
});

$.$defineNativeClass('Entry', [], {
 moveTo$4: function(parent, name, successCallback, errorCallback) {
  return this.moveTo(parent,name,$.convertDartClosureToJS(successCallback),$.convertDartClosureToJS(errorCallback));
 },
 moveTo$2: function(parent$,name$) {
  successCallback = $.convertDartClosureToJS(successCallback);
  errorCallback = $.convertDartClosureToJS(errorCallback);
  return this.moveTo(parent$,name$);
}
});

$.$defineNativeClass('EntryArray', ["length?"], {
});

$.$defineNativeClass('EntryArraySync', ["length?"], {
});

$.$defineNativeClass('EntrySync', [], {
 remove$0: function() {
  return this.remove();
 },
 moveTo$2: function(parent, name) {
  return this.moveTo(parent,name);
 }
});

$.$defineNativeClass('Event', ["type?"], {
});

$.$defineNativeClass('EventException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('HTMLFieldSetElement', ["type?"], {
});

$.$defineNativeClass('FileException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('FileList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,(void 0))
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter(this, [], f);
 },
 get$filter: function() { return new $.Closure23(this); },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'File'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('FileWriter', ["position?", "length?"], {
});

$.$defineNativeClass('FileWriterSync', ["position?", "length?"], {
});

$.$defineNativeClass('Float32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,(void 0))
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter(this, [], f);
 },
 get$filter: function() { return new $.Closure24(this); },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'num'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Float64Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,(void 0))
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter(this, [], f);
 },
 get$filter: function() { return new $.Closure25(this); },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'num'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLFormElement', ["length?"], {
});

$.$defineNativeClass('HTMLHRElement', ["width!"], {
});

$.$defineNativeClass('HTMLAllCollection', ["length?"], {
});

$.$defineNativeClass('HTMLCollection', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,(void 0))
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter(this, [], f);
 },
 get$filter: function() { return new $.Closure26(this); },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'Node'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLOptionsCollection', [], {
 set$length: function(value) {
  this.length = value;;
 },
 get$length: function() {
  return this.length;;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('History', ["state?", "length?"], {
});

$.$defineNativeClass('IDBCursor', ["key?"], {
 update$1: function(value) {
  return this.update(value);
 },
 advance$1: function(count) {
  return this.advance(count);
 }
});

$.$defineNativeClass('IDBDatabaseException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('IDBIndex', [], {
 count$1: function(key_OR_range) {
  return this.count(key_OR_range);
 },
 get$count: function() { return new $.Closure27(this); }
});

$.$defineNativeClass('IDBObjectStore', [], {
 count$1: function(key_OR_range) {
  return this.count(key_OR_range);
 },
 get$count: function() { return new $.Closure28(this); },
 clear$0: function() {
  return this.clear();
 },
 add$2: function(value, key) {
  return this.add(value,key);
 },
 add$1: function(value) {
  return this.add(value);
}
});

$.$defineNativeClass('HTMLIFrameElement', ["width!", "height!"], {
});

$.$defineNativeClass('HTMLImageElement', ["y?", "x?", "width!", "height!"], {
});

$.$defineNativeClass('HTMLInputElement', ["width!", "type=", "pattern?", "height!"], {
 step$1: function(arg0) { return this.step.$call$1(arg0); },
 step$3: function(arg0, arg1, arg2) { return this.step.$call$3(arg0, arg1, arg2); }
});

$.$defineNativeClass('Int16Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,(void 0))
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter(this, [], f);
 },
 get$filter: function() { return new $.Closure29(this); },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,(void 0))
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter(this, [], f);
 },
 get$filter: function() { return new $.Closure30(this); },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int8Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,(void 0))
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter(this, [], f);
 },
 get$filter: function() { return new $.Closure31(this); },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('JavaScriptCallFrame', ["type?"], {
});

$.$defineNativeClass('HTMLKeygenElement', ["type?"], {
});

$.$defineNativeClass('HTMLLIElement', ["type="], {
});

$.$defineNativeClass('HTMLLinkElement', ["type="], {
});

$.$defineNativeClass('Location', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('HTMLMarqueeElement', ["width!", "height!"], {
});

$.$defineNativeClass('MediaList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,(void 0))
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter(this, [], f);
 },
 get$filter: function() { return new $.Closure32(this); },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'String'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('MediaStreamList', ["length?"], {
});

$.$defineNativeClass('MediaStreamTrack', ["enabled?"], {
});

$.$defineNativeClass('MediaStreamTrackList', ["length?"], {
});

$.$defineNativeClass('MouseEvent', ["y?", "x?"], {
});

$.$defineNativeClass('MutationRecord', ["type?"], {
});

$.$defineNativeClass('NamedNodeMap', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,(void 0))
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter(this, [], f);
 },
 get$filter: function() { return new $.Closure33(this); },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'Node'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Navigator', ["userAgent?"], {
});

$.$defineNativeClass('Node', [], {
 $dom_replaceChild$2: function(newChild, oldChild) {
  return this.replaceChild(newChild,oldChild);
 },
 $dom_removeChild$1: function(oldChild) {
  return this.removeChild(oldChild);
 },
 contains$1: function(other) {
  return this.contains(other);
 },
 $dom_appendChild$1: function(newChild) {
  return this.appendChild(newChild);
 },
 set$text: function(value) {
  this.textContent = value;;
 },
 get$parent: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$parent')) {
    return this.parentNode;;
  } else {
    return Object.prototype.get$parent.call(this);
  }
 },
 get$$$dom_childNodes: function() {
  return this.childNodes;;
 },
 remove$0: function() {
  if (!$.eqNullB(this.get$parent())) {
    this.get$parent().$dom_removeChild$1(this);
  }
  return this;
 },
 get$nodes: function() {
  return $._ChildNodeListLazy$1(this);
 }
});

$.$defineNativeClass('NodeIterator', ["filter?"], {
 filter$1: function(arg0) { return this.filter.$call$1(arg0); }
});

$.$defineNativeClass('NodeList', ["length?"], {
 operator$index$1: function(index) {
  return this[index];;
 },
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$1($.getRange2(this, start, rangeLength, []));
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,(void 0))
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._NodeListWrapper$1($.filter(this, [], f));
 },
 get$filter: function() { return new $.Closure37(this); },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 operator$indexSet$2: function(index, value) {
  this._parent.$dom_replaceChild$2(value, this.operator$index$1(index));
 },
 clear$0: function() {
  this._parent.set$text('');
 },
 removeLast$0: function() {
  var result = this.last$0();
  if (!$.eqNullB(result)) {
    this._parent.$dom_removeChild$1(result);
  }
  return result;
 },
 add$1: function(value) {
  this._parent.$dom_appendChild$1(value);
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'Node'}));
  return t0;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Notification', ["tag?"], {
});

$.$defineNativeClass('HTMLOListElement', ["type="], {
});

$.$defineNativeClass('HTMLObjectElement', ["width!", "type=", "height!"], {
});

$.$defineNativeClass('OperationNotAllowedException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('Oscillator', ["type="], {
});

$.$defineNativeClass('HTMLOutputElement', ["type?"], {
});

$.$defineNativeClass('HTMLParamElement', ["type="], {
});

$.$defineNativeClass('PerformanceNavigation', ["type?"], {
});

$.$defineNativeClass('WebKitPoint', ["y=", "x="], {
});

$.$defineNativeClass('PopStateEvent', ["state?"], {
});

$.$defineNativeClass('HTMLPreElement', ["width!"], {
});

$.$defineNativeClass('HTMLProgressElement', ["position?"], {
});

$.$defineNativeClass('RadioNodeList', [], {
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Range', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('RangeException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('SQLResultSetRowList', ["length?"], {
});

$.$defineNativeClass('SVGComponentTransferFunctionElement', ["type?"], {
});

$.$defineNativeClass('SVGCursorElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGElement', [], {
 get$id: function() {
  return this.id;;
 }
});

$.$defineNativeClass('SVGElementInstanceList', ["length?"], {
});

$.$defineNativeClass('SVGException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('SVGFEBlendElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFEColorMatrixElement', ["y?", "x?", "type?"], {
});

$.$defineNativeClass('SVGFEComponentTransferElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFECompositeElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFEConvolveMatrixElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFEDiffuseLightingElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFEDisplacementMapElement', ["y?", "x?", "scale?"], {
});

$.$defineNativeClass('SVGFEDropShadowElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFEFloodElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFEGaussianBlurElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFEImageElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFEMergeElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFEMorphologyElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFEOffsetElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFEPointLightElement', ["z?", "y?", "x?"], {
});

$.$defineNativeClass('SVGFESpecularLightingElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFESpotLightElement', ["z?", "y?", "x?"], {
});

$.$defineNativeClass('SVGFETileElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFETurbulenceElement', ["y?", "x?", "type?"], {
});

$.$defineNativeClass('SVGFilterElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGFilterPrimitiveStandardAttributes', ["y?", "x?"], {
});

$.$defineNativeClass('SVGForeignObjectElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGGlyphRefElement', ["y=", "x="], {
});

$.$defineNativeClass('SVGImageElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGLengthList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGMaskElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGMatrix', ["a="], {
 scale$1: function(scaleFactor) {
  return this.scale(scaleFactor);
 },
 get$scale: function() { return new $.Closure38(this); }
});

$.$defineNativeClass('SVGNumberList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPathSegArcAbs', ["y=", "x=", "angle="], {
});

$.$defineNativeClass('SVGPathSegArcRel', ["y=", "x=", "angle="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicSmoothAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicSmoothRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticSmoothAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticSmoothRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegLinetoAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegLinetoHorizontalAbs', ["x="], {
});

$.$defineNativeClass('SVGPathSegLinetoHorizontalRel', ["x="], {
});

$.$defineNativeClass('SVGPathSegLinetoRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegLinetoVerticalAbs', ["y="], {
});

$.$defineNativeClass('SVGPathSegLinetoVerticalRel', ["y="], {
});

$.$defineNativeClass('SVGPathSegList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPathSegMovetoAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegMovetoRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPatternElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGPoint', ["y=", "x="], {
});

$.$defineNativeClass('SVGPointList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPolygonElement', ["points?"], {
});

$.$defineNativeClass('SVGPolylineElement', ["points?"], {
});

$.$defineNativeClass('SVGRect', ["y=", "x=", "width!", "height!"], {
});

$.$defineNativeClass('SVGRectElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGSVGElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGScriptElement', ["type="], {
});

$.$defineNativeClass('SVGStringList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGStyleElement', ["type="], {
});

$.$defineNativeClass('SVGTextPositioningElement', ["y?", "x?"], {
});

$.$defineNativeClass('SVGTransform', ["type?", "angle?"], {
});

$.$defineNativeClass('SVGTransformList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGUseElement', ["y?", "x?"], {
});

$.$defineNativeClass('HTMLScriptElement', ["type="], {
});

$.$defineNativeClass('HTMLSelectElement', ["type?", "length="], {
});

$.$defineNativeClass('HTMLSourceElement', ["type="], {
});

$.$defineNativeClass('SpeechGrammarList', ["length?"], {
});

$.$defineNativeClass('SpeechInputResultList', ["length?"], {
});

$.$defineNativeClass('SpeechRecognitionResult', ["length?"], {
});

$.$defineNativeClass('SpeechRecognitionResultList', ["length?"], {
});

$.$defineNativeClass('Storage', [], {
 $dom_setItem$2: function(key, data) {
  return this.setItem(key,data);
 },
 $dom_key$1: function(index) {
  return this.key(index);
 },
 $dom_getItem$1: function(key) {
  return this.getItem(key);
 },
 $dom_clear$0: function() {
  return this.clear();
 },
 get$$$dom_length: function() {
  return this.length;;
 },
 isEmpty$0: function() {
  return $.eqNull(this.$dom_key$1(0));
 },
 get$length: function() {
  return this.get$$$dom_length();
 },
 forEach$1: function(f) {
  for (var i = 0; true; i = i + 1) {
    var key = this.$dom_key$1(i);
    if ($.eqNullB(key)) {
      return;
    }
    f.$call$2(key, this.operator$index$1(key));
  }
 },
 clear$0: function() {
  return this.$dom_clear$0();
 },
 operator$indexSet$2: function(key, value) {
  return this.$dom_setItem$2(key, value);
 },
 operator$index$1: function(key) {
  return this.$dom_getItem$1(key);
 },
 containsKey$1: function(key) {
  return !$.eqNullB(this.$dom_getItem$1(key));
 },
 is$Map: function() { return true; }
});

$.$defineNativeClass('StorageEvent', ["key?"], {
});

$.$defineNativeClass('HTMLStyleElement', ["type="], {
});

$.$defineNativeClass('StyleMedia', ["type?"], {
});

$.$defineNativeClass('StyleSheet', ["type?"], {
});

$.$defineNativeClass('StyleSheetList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,(void 0))
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter(this, [], f);
 },
 get$filter: function() { return new $.Closure39(this); },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'StyleSheet'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTableCellElement', ["width!", "height!"], {
});

$.$defineNativeClass('HTMLTableColElement', ["width!"], {
});

$.$defineNativeClass('HTMLTableElement', ["width!"], {
});

$.$defineNativeClass('HTMLTextAreaElement', ["type?"], {
});

$.$defineNativeClass('TextTrackCue', ["text!", "position?", "id?"], {
});

$.$defineNativeClass('TextTrackCueList', ["length?"], {
});

$.$defineNativeClass('TextTrackList', ["length?"], {
});

$.$defineNativeClass('TimeRanges', ["length?"], {
});

$.$defineNativeClass('TouchList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,(void 0))
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter(this, [], f);
 },
 get$filter: function() { return new $.Closure40(this); },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'Touch'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('TreeWalker', ["filter?"], {
 filter$1: function(arg0) { return this.filter.$call$1(arg0); }
});

$.$defineNativeClass('HTMLUListElement', ["type="], {
});

$.$defineNativeClass('Uint16Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,(void 0))
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter(this, [], f);
 },
 get$filter: function() { return new $.Closure41(this); },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,(void 0))
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter(this, [], f);
 },
 get$filter: function() { return new $.Closure42(this); },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,(void 0))
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter(this, [], f);
 },
 get$filter: function() { return new $.Closure43(this); },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8ClampedArray', [], {
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLVideoElement', ["width!", "height!"], {
});

$.$defineNativeClass('WebGLActiveInfo', ["type?"], {
});

$.$defineNativeClass('WheelEvent', ["y?", "x?"], {
});

$.$defineNativeClass('DOMWindow', ["parent?", "navigator?", "length?"], {
 setInterval$2: function(handler, timeout) {
  return this.setInterval($.convertDartClosureToJS(handler),timeout);
 },
 moveTo$2: function(x, y) {
  return this.moveTo(x,y);
 },
 requestAnimationFrame$1: function(callback) {
  callback = $.convertDartClosureToJS(callback);
      if (!window.requestAnimationFrame) {
      window.requestAnimationFrame =
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          function (callback) {
            window.setTimeout(callback, 16 /* 16ms ~= 60fps */);
          };
    }
    return window.requestAnimationFrame(callback);
;
 }
});

$.$defineNativeClass('WorkerContext', ["navigator?"], {
 setInterval$2: function(handler, timeout) {
  return this.setInterval($.convertDartClosureToJS(handler),timeout);
 }
});

$.$defineNativeClass('WorkerLocation', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('WorkerNavigator', ["userAgent?"], {
});

$.$defineNativeClass('XMLHttpRequestException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('XMLHttpRequestProgressEvent', ["position?"], {
});

$.$defineNativeClass('XPathException', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('XPathExpression', [], {
 evaluate$3: function(contextNode, type, inResult) {
  return this.evaluate(contextNode,type,inResult);
 }
});

// 201 dynamic classes.
// 349 classes
// 28 !leaf
(function(){
  var v0/*class(_SVGTextPositioningElementImpl)*/ = 'SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement';
  var v1/*class(_SVGComponentTransferFunctionElementImpl)*/ = 'SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement';
  var v2/*class(_SVGElementImpl)*/ = [v0/*class(_SVGTextPositioningElementImpl)*/,v1/*class(_SVGComponentTransferFunctionElementImpl)*/,'SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGTextContentElement|SVGTextPathElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement'].join('|');
  var v3/*class(_ElementImpl)*/ = [v2/*class(_SVGElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMediaElement|HTMLVideoElement|HTMLAudioElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v4/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot';
  var v5/*class(_DocumentImpl)*/ = 'HTMLDocument|SVGDocument';
  var v6/*class(_CharacterDataImpl)*/ = 'CharacterData|Text|CDATASection|Comment';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['SVGTextPositioningElement', v0/*class(_SVGTextPositioningElementImpl)*/],
    ['StyleSheet', 'StyleSheet|CSSStyleSheet'],
    ['Uint8Array', 'Uint8Array|Uint8ClampedArray'],
    ['Blob', 'Blob|File'],
    ['WorkerContext', 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext'],
    ['CSSRule', 'CSSRule|WebKitCSSRegionRule|CSSUnknownRule|CSSStyleRule|CSSPageRule|CSSMediaRule|WebKitCSSKeyframesRule|WebKitCSSKeyframeRule|CSSImportRule|CSSFontFaceRule|CSSCharsetRule'],
    ['CSSValueList', 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue'],
    ['CharacterData', v6/*class(_CharacterDataImpl)*/],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList'],
    ['HTMLDocument', v5/*class(_DocumentImpl)*/],
    ['DocumentFragment', v4/*class(_DocumentFragmentImpl)*/],
    ['SVGComponentTransferFunctionElement', v1/*class(_SVGComponentTransferFunctionElementImpl)*/],
    ['SVGElement', v2/*class(_SVGElementImpl)*/],
    ['Element', v3/*class(_ElementImpl)*/],
    ['Entry', 'Entry|FileEntry|DirectoryEntry'],
    ['EntrySync', 'EntrySync|FileEntrySync|DirectoryEntrySync'],
    ['Event', 'Event|WebGLContextEvent|UIEvent|WheelEvent|TouchEvent|TextEvent|SVGZoomEvent|MouseEvent|KeyboardEvent|CompositionEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechInputEvent|ProgressEvent|XMLHttpRequestProgressEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent'],
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection'],
    ['IDBCursor', 'IDBCursor|IDBCursorWithValue'],
    ['Node', [v3/*class(_ElementImpl)*/,v4/*class(_DocumentFragmentImpl)*/,v5/*class(_DocumentImpl)*/,v6/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr'].join('|')],
    ['NodeList', 'NodeList|RadioNodeList']];
$.dynamicSetMetadata(table);
})();

if (typeof window != 'undefined' && typeof document != 'undefined' &&
    window.addEventListener && document.readyState == 'loading') {
  window.addEventListener('DOMContentLoaded', function(e) {
    $.main();
  });
} else {
  $.main();
}
function init() {
  Isolate.$isolateProperties = {};
Isolate.$defineClass = function(cls, superclass, fields, prototype) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  var constructor;
  if (typeof fields == 'function') {
    constructor = fields;
  } else {
    var str = "function " + cls + "(";
    var body = "";
    for (var i = 0; i < fields.length; i++) {
      if (i != 0) str += ", ";
      var field = fields[i];
      field = generateGetterSetter(field, prototype);
      str += field;
      body += "this." + field + " = " + field + ";\n";
    }
    str += ") {" + body + "}\n";
    str += "return " + cls + ";";
    constructor = new Function(str)();
  }
  Isolate.$isolateProperties[cls] = constructor;
  constructor.prototype = prototype;
  if (superclass !== "") {
    Isolate.$pendingClasses[cls] = superclass;
  }
};
Isolate.$pendingClasses = {};
Isolate.$finishClasses = function() {
  var pendingClasses = Isolate.$pendingClasses;
  Isolate.$pendingClasses = {};
  var finishedClasses = {};
  function finishClass(cls) {
    if (finishedClasses[cls]) return;
    finishedClasses[cls] = true;
    var superclass = pendingClasses[cls];
    if (!superclass) return;
    finishClass(superclass);
    var constructor = Isolate.$isolateProperties[cls];
    var superConstructor = Isolate.$isolateProperties[superclass];
    var prototype = constructor.prototype;
    if (prototype.__proto__) {
      prototype.__proto__ = superConstructor.prototype;
      prototype.constructor = constructor;
    } else {
      function tmp() {};
      tmp.prototype = superConstructor.prototype;
      var newPrototype = new tmp();
      constructor.prototype = newPrototype;
      newPrototype.constructor = constructor;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      for (var member in prototype) {
        if (hasOwnProperty.call(prototype, member)) {
          newPrototype[member] = prototype[member];
        }
      }
    }
  }
  for (var cls in pendingClasses) finishClass(cls);
};
Isolate.$finishIsolateConstructor = function(oldIsolate) {
  var isolateProperties = oldIsolate.$isolateProperties;
  var isolatePrototype = oldIsolate.prototype;
  var str = "{\n";
  str += "var properties = Isolate.$isolateProperties;\n";
  for (var staticName in isolateProperties) {
    if (Object.prototype.hasOwnProperty.call(isolateProperties, staticName)) {
      str += "this." + staticName + "= properties." + staticName + ";\n";
    }
  }
  str += "}\n";
  var newIsolate = new Function(str);
  newIsolate.prototype = isolatePrototype;
  isolatePrototype.constructor = newIsolate;
  newIsolate.$isolateProperties = isolateProperties;
  return newIsolate;
};
}
