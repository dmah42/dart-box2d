function Isolate() {}
init();

var $$ = {};
var $ = Isolate.$isolateProperties;
$$.ExceptionImplementation = {"":
 ["_msg"],
 "super": "Object",
 toString$0: function() {
  var t1 = this._msg;
  return t1 == null ? 'Exception' : 'Exception: ' + $.S(t1);
},
 is$Exception: true
};

$$.FutureImpl = {"":
 ["_isComplete", "_lib1_value?", "_exception", "_stackTrace", "_exceptionHandled", "_successListeners", "_exceptionHandlers", "_completionListeners"],
 "super": "Object",
 get$value: function() {
  if (this.get$isComplete() !== true)
    throw $.captureStackTrace($.FutureNotCompleteException$());
  var t1 = this._exception;
  if (!(t1 == null))
    throw $.captureStackTrace(t1);
  return this._lib1_value;
},
 get$stackTrace: function() {
  if (this.get$isComplete() !== true)
    throw $.captureStackTrace($.FutureNotCompleteException$());
  return this._stackTrace;
},
 get$isComplete: function() {
  return this._isComplete;
},
 get$hasValue: function() {
  return this.get$isComplete() === true && this._exception == null;
},
 then$1: function(onSuccess) {
  if (this.get$hasValue() === true)
    onSuccess.call$1(this.get$value());
  else if (this.get$isComplete() !== true)
    this._successListeners.push(onSuccess);
  else if (this._exceptionHandled !== true)
    throw $.captureStackTrace(this._exception);
},
 handleException$1: function(onException) {
  if (this._exceptionHandled === true)
    return;
  if (this._isComplete === true) {
    var t1 = this._exception;
    if (!(t1 == null))
      this._exceptionHandled = onException.call$1(t1);
  } else
    this._exceptionHandlers.push(onException);
},
 _complete$0: function() {
  this._isComplete = true;
  try {
    if (!(this._exception == null))
      for (var t1 = $.iterator(this._exceptionHandlers); t1.hasNext$0() === true;) {
        var handler = t1.next$0();
        if ($.eqB(handler.call$1(this._exception), true)) {
          this._exceptionHandled = true;
          break;
        }
      }
    if (this.get$hasValue() === true)
      for (t1 = $.iterator(this._successListeners); t1.hasNext$0() === true;) {
        var listener = t1.next$0();
        listener.call$1(this.get$value());
      }
    else if (this._exceptionHandled !== true && $.gtB($.get$length(this._successListeners), 0))
      throw $.captureStackTrace(this._exception);
  } finally {
    for (t1 = $.iterator(this._completionListeners); t1.hasNext$0() === true;) {
      var listener0 = t1.next$0();
      try {
        listener0.call$1(this);
      } catch (exception) {
        $.unwrapException(exception);
      }

    }
  }
},
 _setValue$1: function(value) {
  if (this._isComplete === true)
    throw $.captureStackTrace($.FutureAlreadyCompleteException$());
  this._lib1_value = value;
  this._complete$0();
},
 _setException$2: function(exception, stackTrace) {
  if (exception == null)
    throw $.captureStackTrace($.IllegalArgumentException$(null));
  if (this._isComplete === true)
    throw $.captureStackTrace($.FutureAlreadyCompleteException$());
  this._exception = exception;
  this._stackTrace = stackTrace;
  this._complete$0();
}
};

$$.CompleterImpl = {"":
 ["_futureImpl"],
 "super": "Object",
 get$future: function() {
  return this._futureImpl;
},
 complete$1: function(value) {
  this._futureImpl._setValue$1(value);
},
 completeException$2: function(exception, stackTrace) {
  this._futureImpl._setException$2(exception, stackTrace);
},
 completeException$1: function(exception) {
  return this.completeException$2(exception,null)
}
};

$$.HashMapImplementation = {"":
 ["_keys", "_values", "_loadLimit", "_numberOfEntries", "_numberOfDeleted"],
 "super": "Object",
 _probeForAdding$1: function(key) {
  var t1 = $.hashCode(key);
  if (t1 !== (t1 | 0))
    return this._probeForAdding$1$bailout(1, key, t1, 0, 0, 0);
  var t3 = $.get$length(this._keys);
  if (t3 !== (t3 | 0))
    return this._probeForAdding$1$bailout(2, key, t1, t3, 0, 0);
  var hash = (t1 & t3 - 1) >>> 0;
  for (var numberOfProbes = 1, insertionIndex = -1; true;) {
    t1 = this._keys;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
      return this._probeForAdding$1$bailout(3, key, hash, numberOfProbes, insertionIndex, t1);
    if (hash < 0 || hash >= t1.length)
      throw $.ioore(hash);
    var existingKey = t1[hash];
    if (existingKey == null) {
      if (insertionIndex < 0)
        return hash;
      return insertionIndex;
    } else if ($.eqB(existingKey, key))
      return hash;
    else if (insertionIndex < 0 && $.CTC19 === existingKey)
      insertionIndex = hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    if (hash !== (hash | 0))
      return this._probeForAdding$1$bailout(4, numberOfProbes0, key, insertionIndex, hash, 0);
    numberOfProbes = numberOfProbes0;
  }
},
 _probeForAdding$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var key = env0;
      t1 = env1;
      break;
    case 2:
      key = env0;
      t1 = env1;
      t3 = env2;
      break;
    case 3:
      key = env0;
      hash = env1;
      numberOfProbes = env2;
      insertionIndex = env3;
      t1 = env4;
      break;
    case 4:
      numberOfProbes0 = env0;
      key = env1;
      insertionIndex = env2;
      hash = env3;
      break;
  }
  switch (state) {
    case 0:
      var t1 = $.hashCode(key);
    case 1:
      state = 0;
      var t3 = $.get$length(this._keys);
    case 2:
      state = 0;
      var hash = $.and(t1, $.sub(t3, 1));
      var numberOfProbes = 1;
      var insertionIndex = -1;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!true)
                break L0;
              t1 = this._keys;
            case 3:
              state = 0;
              var existingKey = $.index(t1, hash);
              if (existingKey == null) {
                if ($.ltB(insertionIndex, 0))
                  return hash;
                return insertionIndex;
              } else if ($.eqB(existingKey, key))
                return hash;
              else if ($.ltB(insertionIndex, 0) && $.CTC19 === existingKey)
                insertionIndex = hash;
              var numberOfProbes0 = numberOfProbes + 1;
              hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
            case 4:
              state = 0;
              numberOfProbes = numberOfProbes0;
          }
  }
},
 _probeForLookup$1: function(key) {
  var hash = $.and($.hashCode(key), $.sub($.get$length(this._keys), 1));
  if (hash !== (hash | 0))
    return this._probeForLookup$1$bailout(1, key, hash);
  for (var numberOfProbes = 1; true;) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey == null)
      return -1;
    if ($.eqB(existingKey, key))
      return hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    numberOfProbes = numberOfProbes0;
  }
},
 _probeForLookup$1$bailout: function(state, key, hash) {
  for (var numberOfProbes = 1; true;) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey == null)
      return -1;
    if ($.eqB(existingKey, key))
      return hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    numberOfProbes = numberOfProbes0;
  }
},
 _ensureCapacity$0: function() {
  var newNumberOfEntries = $.add(this._numberOfEntries, 1);
  if ($.geB(newNumberOfEntries, this._loadLimit)) {
    this._grow$1($.mul($.get$length(this._keys), 2));
    return;
  }
  var numberOfFree = $.sub($.sub($.get$length(this._keys), newNumberOfEntries), this._numberOfDeleted);
  if ($.gtB(this._numberOfDeleted, numberOfFree))
    this._grow$1($.get$length(this._keys));
},
 _grow$1: function(newCapacity) {
  var capacity = $.get$length(this._keys);
  if (typeof capacity !== 'number')
    return this._grow$1$bailout(1, newCapacity, capacity, 0, 0);
  this._loadLimit = $.tdiv($.mul(newCapacity, 3), 4);
  var oldKeys = this._keys;
  if (typeof oldKeys !== 'string' && (typeof oldKeys !== 'object' || oldKeys === null || oldKeys.constructor !== Array && !oldKeys.is$JavaScriptIndexingBehavior()))
    return this._grow$1$bailout(2, newCapacity, oldKeys, capacity, 0);
  var oldValues = this._values;
  if (typeof oldValues !== 'string' && (typeof oldValues !== 'object' || oldValues === null || oldValues.constructor !== Array && !oldValues.is$JavaScriptIndexingBehavior()))
    return this._grow$1$bailout(3, newCapacity, oldKeys, oldValues, capacity);
  this._keys = $.ListImplementation_List(newCapacity);
  this._values = $.ListImplementation_List(newCapacity, $.getRuntimeTypeInfo(this).V);
  for (var i = 0; i < capacity; ++i) {
    if (i < 0 || i >= oldKeys.length)
      throw $.ioore(i);
    var key = oldKeys[i];
    if (key == null || key === $.CTC19)
      continue;
    if (i < 0 || i >= oldValues.length)
      throw $.ioore(i);
    var value = oldValues[i];
    var newIndex = this._probeForAdding$1(key);
    $.indexSet(this._keys, newIndex, key);
    $.indexSet(this._values, newIndex, value);
  }
  this._numberOfDeleted = 0;
},
 _grow$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var newCapacity = env0;
      capacity = env1;
      break;
    case 2:
      newCapacity = env0;
      oldKeys = env1;
      capacity = env2;
      break;
    case 3:
      newCapacity = env0;
      oldKeys = env1;
      oldValues = env2;
      capacity = env3;
      break;
  }
  switch (state) {
    case 0:
      var capacity = $.get$length(this._keys);
    case 1:
      state = 0;
      this._loadLimit = $.tdiv($.mul(newCapacity, 3), 4);
      var oldKeys = this._keys;
    case 2:
      state = 0;
      var oldValues = this._values;
    case 3:
      state = 0;
      this._keys = $.ListImplementation_List(newCapacity);
      this._values = $.ListImplementation_List(newCapacity, $.getRuntimeTypeInfo(this).V);
      for (var i = 0; $.ltB(i, capacity); ++i) {
        var key = $.index(oldKeys, i);
        if (key == null || key === $.CTC19)
          continue;
        var value = $.index(oldValues, i);
        var newIndex = this._probeForAdding$1(key);
        $.indexSet(this._keys, newIndex, key);
        $.indexSet(this._values, newIndex, value);
      }
      this._numberOfDeleted = 0;
  }
},
 clear$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number')
    return this.clear$0$bailout(1, length$);
  for (var i = 0; i < length$; ++i) {
    $.indexSet(this._keys, i, null);
    $.indexSet(this._values, i, null);
  }
},
 clear$0$bailout: function(state, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    $.indexSet(this._keys, i, null);
    $.indexSet(this._values, i, null);
  }
},
 operator$indexSet$2: function(key, value) {
  this._ensureCapacity$0();
  var index = this._probeForAdding$1(key);
  var t1 = this._keys;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.operator$indexSet$2$bailout(1, key, value, index, t1);
  if (index !== (index | 0))
    throw $.iae(index);
  if (index < 0 || index >= t1.length)
    throw $.ioore(index);
  if (!(t1[index] == null)) {
    if (index < 0 || index >= t1.length)
      throw $.ioore(index);
    var t2 = t1[index] === $.CTC19;
    t1 = t2;
  } else
    t1 = true;
  if (t1) {
    t1 = this._numberOfEntries;
    if (typeof t1 !== 'number')
      return this.operator$indexSet$2$bailout(3, key, value, t1, index);
    this._numberOfEntries = t1 + 1;
  }
  t1 = this._keys;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())
    return this.operator$indexSet$2$bailout(4, key, value, t1, index);
  if (index < 0 || index >= t1.length)
    throw $.ioore(index);
  t1[index] = key;
  t1 = this._values;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())
    return this.operator$indexSet$2$bailout(5, value, t1, index, 0);
  if (index < 0 || index >= t1.length)
    throw $.ioore(index);
  t1[index] = value;
},
 operator$indexSet$2$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var key = env0;
      var value = env1;
      index = env2;
      t1 = env3;
      break;
    case 2:
      key = env0;
      value = env1;
      index = env2;
      t1 = env3;
      break;
    case 3:
      key = env0;
      value = env1;
      t1 = env2;
      index = env3;
      break;
    case 4:
      key = env0;
      value = env1;
      t1 = env2;
      index = env3;
      break;
    case 5:
      value = env0;
      t1 = env1;
      index = env2;
      break;
  }
  switch (state) {
    case 0:
      this._ensureCapacity$0();
      var index = this._probeForAdding$1(key);
      var t1 = this._keys;
    case 1:
      state = 0;
    case 2:
      if (state === 2 || state === 0 && !($.index(t1, index) == null))
        switch (state) {
          case 0:
            t1 = this._keys;
          case 2:
            state = 0;
            var t3 = $.index(t1, index) === $.CTC19;
            t1 = t3;
        }
      else
        t1 = true;
    case 3:
      if (state === 3 || state === 0 && t1)
        switch (state) {
          case 0:
            t1 = this._numberOfEntries;
          case 3:
            state = 0;
            this._numberOfEntries = $.add(t1, 1);
        }
      t1 = this._keys;
    case 4:
      state = 0;
      $.indexSet(t1, index, key);
      t1 = this._values;
    case 5:
      state = 0;
      $.indexSet(t1, index, value);
  }
},
 operator$index$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.ltB(index, 0))
    return;
  return $.index(this._values, index);
},
 remove$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.geB(index, 0)) {
    this._numberOfEntries = $.sub(this._numberOfEntries, 1);
    var value = $.index(this._values, index);
    $.indexSet(this._values, index, null);
    $.indexSet(this._keys, index, $.CTC19);
    this._numberOfDeleted = $.add(this._numberOfDeleted, 1);
    return value;
  }
  return;
},
 isEmpty$0: function() {
  return $.eq(this._numberOfEntries, 0);
},
 get$length: function() {
  return this._numberOfEntries;
},
 forEach$1: function(f) {
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number')
    return this.forEach$1$bailout(1, f, length$);
  for (var i = 0; i < length$; ++i) {
    var key = $.index(this._keys, i);
    if (!(key == null) && !(key === $.CTC19))
      f.call$2(key, $.index(this._values, i));
  }
},
 forEach$1$bailout: function(state, f, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    var key = $.index(this._keys, i);
    if (!(key == null) && !(key === $.CTC19))
      f.call$2(key, $.index(this._values, i));
  }
},
 getKeys$0: function() {
  var t1 = {};
  var list = $.ListImplementation_List($.get$length(this), $.getRuntimeTypeInfo(this).K);
  t1.i_10 = 0;
  this.forEach$1(new $.HashMapImplementation_getKeys__(list, t1));
  return list;
},
 getValues$0: function() {
  var t1 = {};
  var list = $.ListImplementation_List($.get$length(this), $.getRuntimeTypeInfo(this).V);
  t1.i_1 = 0;
  this.forEach$1(new $.HashMapImplementation_getValues__(list, t1));
  return list;
},
 containsKey$1: function(key) {
  return !$.eqB(this._probeForLookup$1(key), -1);
},
 toString$0: function() {
  return $.Maps_mapToString(this);
},
 HashMapImplementation$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  this._loadLimit = 6;
  this._keys = $.ListImplementation_List(8);
  this._values = $.ListImplementation_List(8, $.getRuntimeTypeInfo(this).V);
},
 is$Map: function() { return true; }
};

$$._DeletedKeySentinel = {"":
 [],
 "super": "Object"
};

$$.KeyValuePair = {"":
 ["key?", "value="],
 "super": "Object"
};

$$.LinkedHashMapImplementation = {"":
 ["_lib1_list", "_map"],
 "super": "Object",
 operator$indexSet$2: function(key, value) {
  var t1 = this._map;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())
    return this.operator$indexSet$2$bailout(1, key, value, t1);
  if (t1.containsKey$1(key) === true) {
    if (key !== (key | 0))
      throw $.iae(key);
    if (key < 0 || key >= t1.length)
      throw $.ioore(key);
    t1[key].get$element().set$value(value);
  } else {
    var t2 = this._lib1_list;
    $.addLast(t2, $.KeyValuePair$(key, value, $.getRuntimeTypeInfo(this).K, $.getRuntimeTypeInfo(this).V));
    t2 = t2.lastEntry$0();
    if (key !== (key | 0))
      throw $.iae(key);
    if (key < 0 || key >= t1.length)
      throw $.ioore(key);
    t1[key] = t2;
  }
},
 operator$indexSet$2$bailout: function(state, key, value, t1) {
  if (t1.containsKey$1(key) === true)
    $.index(t1, key).get$element().set$value(value);
  else {
    var t2 = this._lib1_list;
    $.addLast(t2, $.KeyValuePair$(key, value, $.getRuntimeTypeInfo(this).K, $.getRuntimeTypeInfo(this).V));
    $.indexSet(t1, key, t2.lastEntry$0());
  }
},
 operator$index$1: function(key) {
  var entry = $.index(this._map, key);
  if (entry == null)
    return;
  return entry.get$element().get$value();
},
 remove$1: function(key) {
  var entry = this._map.remove$1(key);
  if (entry == null)
    return;
  entry.remove$0();
  return entry.get$element().get$value();
},
 getKeys$0: function() {
  var t1 = {};
  var list = $.ListImplementation_List($.get$length(this), $.getRuntimeTypeInfo(this).K);
  t1.index_10 = 0;
  $.forEach(this._lib1_list, new $.LinkedHashMapImplementation_getKeys__(list, t1));
  return list;
},
 getValues$0: function() {
  var t1 = {};
  var list = $.ListImplementation_List($.get$length(this), $.getRuntimeTypeInfo(this).V);
  t1.index_1 = 0;
  $.forEach(this._lib1_list, new $.LinkedHashMapImplementation_getValues__(list, t1));
  return list;
},
 forEach$1: function(f) {
  $.forEach(this._lib1_list, new $.LinkedHashMapImplementation_forEach__(f));
},
 containsKey$1: function(key) {
  return this._map.containsKey$1(key);
},
 get$length: function() {
  return $.get$length(this._map);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 clear$0: function() {
  $.clear(this._map);
  $.clear(this._lib1_list);
},
 toString$0: function() {
  return $.Maps_mapToString(this);
},
 LinkedHashMapImplementation$0: function() {
  this._map = $.HashMapImplementation$($.getRuntimeTypeInfo(this).K, 'DoubleLinkedQueueEntry<KeyValuePair<K, V>>');
  this._lib1_list = $.DoubleLinkedQueue$('KeyValuePair<K, V>');
},
 is$Map: function() { return true; }
};

$$.DoubleLinkedQueueEntry = {"":
 ["_previous=", "_next=", "_element?"],
 "super": "Object",
 _link$2: function(p, n) {
  this._next = n;
  this._previous = p;
  p.set$_next(this);
  n.set$_previous(this);
},
 append$1: function(e) {
  $.DoubleLinkedQueueEntry$(e, $.getRuntimeTypeInfo(this).E)._link$2(this, this._next);
},
 prepend$1: function(e) {
  $.DoubleLinkedQueueEntry$(e, $.getRuntimeTypeInfo(this).E)._link$2(this._previous, this);
},
 remove$0: function() {
  var t1 = this._next;
  this._previous.set$_next(t1);
  t1 = this._previous;
  this._next.set$_previous(t1);
  this._next = null;
  this._previous = null;
  return this._element;
},
 _asNonSentinelEntry$0: function() {
  return this;
},
 previousEntry$0: function() {
  return this._previous._asNonSentinelEntry$0();
},
 get$element: function() {
  return this._element;
},
 DoubleLinkedQueueEntry$1: function(e) {
  this._element = e;
}
};

$$._DoubleLinkedQueueEntrySentinel = {"":
 ["_previous", "_next", "_element"],
 "super": "DoubleLinkedQueueEntry",
 remove$0: function() {
  throw $.captureStackTrace($.CTC13);
},
 _asNonSentinelEntry$0: function() {
  return;
},
 get$element: function() {
  throw $.captureStackTrace($.CTC13);
},
 _DoubleLinkedQueueEntrySentinel$0: function() {
  this._link$2(this, this);
}
};

$$.DoubleLinkedQueue = {"":
 ["_sentinel"],
 "super": "Object",
 addLast$1: function(value) {
  this._sentinel.prepend$1(value);
},
 addFirst$1: function(value) {
  this._sentinel.append$1(value);
},
 add$1: function(value) {
  this.addLast$1(value);
},
 removeLast$0: function() {
  return this._sentinel.get$_previous().remove$0();
},
 removeFirst$0: function() {
  return this._sentinel.get$_next().remove$0();
},
 lastEntry$0: function() {
  return this._sentinel.previousEntry$0();
},
 get$length: function() {
  var t1 = {};
  t1.counter_1 = 0;
  this.forEach$1(new $.DoubleLinkedQueue_length__(t1));
  return t1.counter_1;
},
 isEmpty$0: function() {
  var t1 = this._sentinel;
  var t2 = t1.get$_next();
  return t2 == null ? t1 == null : t2 === t1;
},
 clear$0: function() {
  var t1 = this._sentinel;
  t1.set$_next(t1);
  t1.set$_previous(t1);
},
 forEach$1: function(f) {
  var t1 = this._sentinel;
  var entry = t1.get$_next();
  for (; !(entry == null ? t1 == null : entry === t1);) {
    var nextEntry = entry.get$_next();
    f.call$1(entry.get$_element());
    entry = nextEntry;
  }
},
 filter$1: function(f) {
  var other = $.DoubleLinkedQueue$($.getRuntimeTypeInfo(this).E);
  var t1 = this._sentinel;
  var entry = t1.get$_next();
  for (; !(entry == null ? t1 == null : entry === t1);) {
    var nextEntry = entry.get$_next();
    if (f.call$1(entry.get$_element()) === true)
      other.addLast$1(entry.get$_element());
    entry = nextEntry;
  }
  return other;
},
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 iterator$0: function() {
  return $._DoubleLinkedQueueIterator$(this._sentinel, $.getRuntimeTypeInfo(this).E);
},
 toString$0: function() {
  return $.Collections_collectionToString(this);
},
 DoubleLinkedQueue$0: function() {
  this._sentinel = $._DoubleLinkedQueueEntrySentinel$($.getRuntimeTypeInfo(this).E);
},
 is$Collection: function() { return true; }
};

$$._DoubleLinkedQueueIterator = {"":
 ["_sentinel", "_currentEntry"],
 "super": "Object",
 hasNext$0: function() {
  var t1 = this._currentEntry.get$_next();
  var t2 = this._sentinel;
  return !(t1 == null ? t2 == null : t1 === t2);
},
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC11);
  this._currentEntry = this._currentEntry.get$_next();
  return this._currentEntry.get$element();
},
 get$next: function() { return new $.BoundClosure0(this, 'next$0'); },
 _DoubleLinkedQueueIterator$1: function(_sentinel) {
  this._currentEntry = this._sentinel;
}
};

$$.StopwatchImplementation = {"":
 ["_start", "_stop"],
 "super": "Object",
 start$0: function() {
  if (this._start == null)
    this._start = $.Primitives_dateNow();
  else {
    if (this._stop == null)
      return;
    var t1 = $.Primitives_dateNow();
    var t2 = this._stop;
    if (typeof t2 !== 'number')
      return this.start$0$bailout(1, t2, t1, 0);
    var t4 = this._start;
    if (typeof t4 !== 'number')
      return this.start$0$bailout(2, t2, t1, t4);
    this._start = t1 - (t2 - t4);
    this._stop = null;
  }
},
 start$0$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      t2 = env0;
      t1 = env1;
      break;
    case 2:
      t2 = env0;
      t1 = env1;
      t4 = env2;
      break;
  }
  switch (state) {
    case 0:
    default:
      if (state === 0 && this._start == null)
        this._start = $.Primitives_dateNow();
      else
        switch (state) {
          case 0:
            if (this._stop == null)
              return;
            var t1 = $.Primitives_dateNow();
            var t2 = this._stop;
          case 1:
            state = 0;
            var t4 = this._start;
          case 2:
            state = 0;
            t4 = $.sub(t2, t4);
            if (typeof t4 !== 'number')
              throw $.iae(t4);
            this._start = t1 - t4;
            this._stop = null;
        }
  }
},
 stop$0: function() {
  if (this._start == null || !(this._stop == null))
    return;
  this._stop = $.Primitives_dateNow();
},
 reset$0: function() {
  if (this._start == null)
    return;
  this._start = $.Primitives_dateNow();
  if (!(this._stop == null))
    this._stop = this._start;
},
 elapsed$0: function() {
  var t1 = this._start;
  if (typeof t1 !== 'number')
    return this.elapsed$0$bailout(1, t1, 0);
  var t2 = this._stop;
  if (typeof t2 !== 'number')
    return this.elapsed$0$bailout(2, t1, t2);
  t1 = t2 - t1;
  return t1;
},
 elapsed$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._start;
    case 1:
      state = 0;
      if (t1 == null)
        return 0;
      var t2 = this._stop;
    case 2:
      state = 0;
      if (t2 == null) {
        t1 = $.Primitives_dateNow();
        t2 = this._start;
        if (typeof t2 !== 'number')
          throw $.iae(t2);
        t2 = t1 - t2;
        t1 = t2;
      } else
        t1 = $.sub(t2, t1);
      return t1;
  }
},
 frequency$0: function() {
  return 1000;
}
};

$$.StringBufferImpl = {"":
 ["_buffer", "_length"],
 "super": "Object",
 get$length: function() {
  return this._length;
},
 isEmpty$0: function() {
  return this._length === 0;
},
 add$1: function(obj) {
  var str = $.toString(obj);
  if (str == null || $.isEmpty(str) === true)
    return this;
  $.add$1(this._buffer, str);
  var t1 = this._length;
  if (typeof t1 !== 'number')
    return this.add$1$bailout(1, str, t1);
  var t3 = $.get$length(str);
  if (typeof t3 !== 'number')
    return this.add$1$bailout(2, t1, t3);
  this._length = t1 + t3;
  return this;
},
 add$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      str = env0;
      t1 = env1;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var str = $.toString(obj);
      if (str == null || $.isEmpty(str) === true)
        return this;
      $.add$1(this._buffer, str);
      var t1 = this._length;
    case 1:
      state = 0;
      var t3 = $.get$length(str);
    case 2:
      state = 0;
      this._length = $.add(t1, t3);
      return this;
  }
},
 clear$0: function() {
  this._buffer = $.ListImplementation_List(null, 'String');
  this._length = 0;
  return this;
},
 toString$0: function() {
  if ($.get$length(this._buffer) === 0)
    return '';
  if ($.get$length(this._buffer) === 1)
    return $.index(this._buffer, 0);
  var result = $.stringJoinUnchecked($.StringImplementation__toJsStringArray(this._buffer), '');
  $.clear(this._buffer);
  $.add$1(this._buffer, result);
  return result;
},
 StringBufferImpl$1: function(content$) {
  this.clear$0();
  this.add$1(content$);
}
};

$$.IndexOutOfRangeException = {"":
 ["_value?"],
 "super": "Object",
 toString$0: function() {
  return 'IndexOutOfRangeException: ' + $.S(this._value);
},
 is$Exception: true
};

$$.NoSuchMethodException = {"":
 ["_receiver", "_functionName", "_arguments", "_existingArgumentNames"],
 "super": "Object",
 toString$0: function() {
  var sb = $.StringBufferImpl$('');
  var t1 = this._arguments;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.toString$0$bailout(1, t1, sb);
  var i = 0;
  for (; i < t1.length; ++i) {
    if (i > 0)
      sb.add$1(', ');
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  t1 = this._existingArgumentNames;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.toString$0$bailout(2, sb, t1);
  var actualParameters = sb.toString$0();
  sb = $.StringBufferImpl$('');
  for (i = 0; i < t1.length; ++i) {
    if (i > 0)
      sb.add$1(', ');
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  var formalParameters = sb.toString$0();
  t1 = this._functionName;
  return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
},
 toString$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      sb = env1;
      break;
    case 2:
      sb = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var sb = $.StringBufferImpl$('');
      var t1 = this._arguments;
    case 1:
      state = 0;
      var i = 0;
      for (; $.ltB(i, $.get$length(t1)); ++i) {
        if (i > 0)
          sb.add$1(', ');
        sb.add$1($.index(t1, i));
      }
      t1 = this._existingArgumentNames;
    case 2:
      state = 0;
      if (t1 == null)
        return 'NoSuchMethodException : method not found: \'' + $.S(this._functionName) + '\'\n' + 'Receiver: ' + $.S(this._receiver) + '\n' + 'Arguments: [' + $.S(sb) + ']';
      else {
        var actualParameters = sb.toString$0();
        sb = $.StringBufferImpl$('');
        for (i = 0; $.ltB(i, $.get$length(t1)); ++i) {
          if (i > 0)
            sb.add$1(', ');
          sb.add$1($.index(t1, i));
        }
        var formalParameters = sb.toString$0();
        t1 = this._functionName;
        return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
      }
  }
},
 is$Exception: true
};

$$.ObjectNotClosureException = {"":
 [],
 "super": "Object",
 toString$0: function() {
  return 'Object is not closure';
},
 is$Exception: true
};

$$.IllegalArgumentException = {"":
 ["_arg"],
 "super": "Object",
 toString$0: function() {
  return 'Illegal argument(s): ' + $.S(this._arg);
},
 is$Exception: true
};

$$.StackOverflowException = {"":
 [],
 "super": "Object",
 toString$0: function() {
  return 'Stack Overflow';
},
 is$Exception: true
};

$$.NullPointerException = {"":
 ["functionName", "arguments"],
 "super": "Object",
 toString$0: function() {
  var t1 = this.functionName;
  if (t1 == null)
    return this.get$exceptionName();
  else
    return $.S(this.get$exceptionName()) + ' : method: \'' + $.S(t1) + '\'\n' + 'Receiver: null\n' + 'Arguments: ' + $.S(this.arguments);
},
 get$exceptionName: function() {
  return 'NullPointerException';
},
 is$Exception: true
};

$$.NoMoreElementsException = {"":
 [],
 "super": "Object",
 toString$0: function() {
  return 'NoMoreElementsException';
},
 is$Exception: true
};

$$.EmptyQueueException = {"":
 [],
 "super": "Object",
 toString$0: function() {
  return 'EmptyQueueException';
},
 is$Exception: true
};

$$.UnsupportedOperationException = {"":
 ["_message"],
 "super": "Object",
 toString$0: function() {
  return 'UnsupportedOperationException: ' + $.S(this._message);
},
 is$Exception: true
};

$$.NotImplementedException = {"":
 ["_message"],
 "super": "Object",
 toString$0: function() {
  var t1 = this._message;
  return !(t1 == null) ? 'NotImplementedException: ' + $.S(t1) : 'NotImplementedException';
},
 is$Exception: true
};

$$.ExpectException = {"":
 ["message"],
 "super": "Object",
 toString$0: function() {
  return this.message;
},
 is$Exception: true
};

$$.FutureNotCompleteException = {"":
 [],
 "super": "Object",
 toString$0: function() {
  return 'Exception: future has not been completed';
},
 is$Exception: true
};

$$.FutureAlreadyCompleteException = {"":
 [],
 "super": "Object",
 toString$0: function() {
  return 'Exception: future already completed';
},
 is$Exception: true
};

$$.Object = {"":
 [],
 "super": "",
 toString$0: function() {
  return $.ObjectImplementation_toStringImpl(this);
},
 operator$eq$1: function(other) {
  return this === other;
}
};

$$.ListIterator = {"":
 ["i", "list"],
 "super": "Object",
 hasNext$0: function() {
  var t1 = this.i;
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1);
  return t1 < this.list.length;
},
 hasNext$0$bailout: function(state, t1) {
  return $.lt(t1, this.list.length);
},
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.NoMoreElementsException$());
  var value = this.list[this.i];
  var t1 = this.i;
  if (typeof t1 !== 'number')
    return this.next$0$bailout(1, t1, value);
  this.i = t1 + 1;
  return value;
},
 next$0$bailout: function(state, t1, value) {
  this.i = $.add(t1, 1);
  return value;
},
 get$next: function() { return new $.BoundClosure0(this, 'next$0'); }
};

$$.StackTrace = {"":
 ["stack"],
 "super": "Object",
 toString$0: function() {
  var t1 = this.stack;
  return !(t1 == null) ? t1 : '';
}
};

$$.Closure = {"":
 [],
 "super": "Object",
 toString$0: function() {
  return 'Closure';
}
};

$$.MetaInfo = {"":
 ["_tag?", "_tags", "_set?"],
 "super": "Object"
};

$$.StringMatch = {"":
 ["_lib2_start", "str", "pattern"],
 "super": "Object",
 operator$index$1: function(g) {
  return this.group$1(g);
},
 group$1: function(group_) {
  if (!$.eqB(group_, 0))
    throw $.captureStackTrace($.IndexOutOfRangeException$(group_));
  return this.pattern;
}
};

$$.Bench2d = {"":
 ["canvas", "ctx", "viewport", "debugDraw", "world"],
 "super": "Object",
 initialize$0: function() {
  var bd = $.BodyDef$();
  var t1 = this.world;
  var ground = t1.createBody$1(bd);
  var shape = $.PolygonShape$();
  shape.setAsEdge$2($.Vector$(-40.0, 0), $.Vector$(40.0, 0));
  var fixDef = $.FixtureDef$();
  fixDef.shape = shape;
  fixDef.density = 0;
  ground.createFixture$1(fixDef);
  shape = $.PolygonShape$();
  shape.setAsBox$2(0.5, 0.5);
  fixDef = $.FixtureDef$();
  fixDef.shape = shape;
  fixDef.density = 5;
  var x = $.Vector$(-7.0, 0.75);
  var y = $.Vector$(0, 0);
  var deltaX = $.Vector$(0.5625, 1);
  var deltaY = $.Vector$(1.125, 0.0);
  for (var i = 0; i < 20; ++i) {
    y.setFrom$1(x);
    for (var j = i; j < 20; ++j) {
      bd = $.BodyDef$();
      bd.type = 2;
      bd.position.setFrom$1(y);
      t1.createBody$1(bd).createFixture$1(fixDef);
      y.addLocal$1(deltaY);
    }
    x.addLocal$1(deltaX);
  }
},
 step$0: function() {
  this.world.step$3(0.016666666666666666, 10, 10);
},
 warmup$0: function() {
  for (var i = 0; i < 256; ++i)
    this.step$0();
},
 bench$0: function() {
  var bench2d = $.Bench2d$();
  var times = $.ListImplementation_List(256, 'num');
  for (var i = 0; i < 256; ++i) {
    var watch = $.StopwatchImplementation$();
    watch.start$0();
    bench2d.step$0();
    watch.stop$0();
    var t1 = $.div(watch.elapsed$0(), watch.frequency$0());
    if (i < 0 || i >= times.length)
      throw $.ioore(i);
    times[i] = t1;
    if (i < 0 || i >= times.length)
      throw $.ioore(i);
    $.print(times[i]);
  }
  for (var t1 = times.length, total = 0, i = 0; i < 256; ++i) {
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var t2 = times[i];
    if (typeof t2 !== 'number')
      throw $.iae(t2);
    total += t2;
  }
  $.print(total);
},
 Bench2d$0: function() {
  this.world = $.World$($.Vector$(0, -10), true, $.DefaultWorldPool$());
}
};

$$._Default = {"":
 [],
 "super": "Object"
};

$$._ListWrapper = {"":
 [],
 "super": "Object",
 iterator$0: function() {
  return $.iterator(this._list);
},
 forEach$1: function(f) {
  return $.forEach(this._list, f);
},
 filter$1: function(f) {
  return $.filter(this._list, f);
},
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 isEmpty$0: function() {
  return $.isEmpty(this._list);
},
 get$length: function() {
  return $.get$length(this._list);
},
 operator$index$1: function(index) {
  return $.index(this._list, index);
},
 operator$indexSet$2: function(index, value) {
  $.indexSet(this._list, index, value);
},
 set$length: function(newLength) {
  $.set$length(this._list, newLength);
},
 add$1: function(value) {
  return $.add$1(this._list, value);
},
 addLast$1: function(value) {
  return $.addLast(this._list, value);
},
 sort$1: function(compare) {
  return $.sort(this._list, compare);
},
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._list, element, start);
},
 clear$0: function() {
  return $.clear(this._list);
},
 removeLast$0: function() {
  return $.removeLast(this._list);
},
 getRange$2: function(start, rangeLength) {
  return $.getRange(this._list, start, rangeLength);
},
 setRange$4: function(start, rangeLength, from, startFrom) {
  return $.setRange$4(this._list, start, rangeLength, from, startFrom);
},
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,0)
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._NodeListWrapper = {"":
 ["_list"],
 "super": "_ListWrapper",
 filter$1: function(f) {
  return $._NodeListWrapper$($.filter(this._list, f));
},
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$($.getRange(this._list, start, rangeLength));
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._FixedSizeListIterator = {"":
 ["_lib_length", "_array", "_pos"],
 "super": "_VariableSizeListIterator",
 hasNext$0: function() {
  var t1 = this._lib_length;
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number')
    return this.hasNext$0$bailout(2, t1, t3);
  return t1 > t3;
},
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._lib_length;
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t3);
  }
}
};

$$._VariableSizeListIterator = {"":
 [],
 "super": "Object",
 hasNext$0: function() {
  var t1 = $.get$length(this._array);
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number')
    return this.hasNext$0$bailout(2, t3, t1);
  return t1 > t3;
},
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t3 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = $.get$length(this._array);
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t3);
  }
},
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC11);
  var t1 = this._array;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.next$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number')
    return this.next$0$bailout(2, t1, t3);
  this._pos = t3 + 1;
  if (t3 !== (t3 | 0))
    throw $.iae(t3);
  if (t3 < 0 || t3 >= t1.length)
    throw $.ioore(t3);
  return t1[t3];
},
 next$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      if (this.hasNext$0() !== true)
        throw $.captureStackTrace($.CTC11);
      var t1 = this._array;
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      this._pos = $.add(t3, 1);
      return $.index(t1, t3);
  }
},
 get$next: function() { return new $.BoundClosure0(this, 'next$0'); }
};

$$._Manager = {"":
 ["nextIsolateId=", "currentManagerId?", "nextManagerId", "currentContext=", "rootContext=", "topEventLoop?", "fromCommandLine?", "isWorker?", "supportsWorkers", "isolates?", "mainManager?", "managers?"],
 "super": "Object",
 get$useWorkers: function() {
  return this.supportsWorkers;
},
 get$needSerialization: function() {
  return this.get$useWorkers();
},
 _nativeDetectEnvironment$0: function() {
    this.isWorker = $isWorker;
    this.supportsWorkers = $supportsWorkers;
    this.fromCommandLine = typeof(window) == 'undefined';
  
},
 _nativeInitWorkerMessageHandler$0: function() {
    $globalThis.onmessage = function (e) {
      _IsolateNatives._processWorkerMessage(this.mainManager, e);
    }
  
},
 maybeCloseWorker$0: function() {
  if ($.isEmpty(this.isolates) === true)
    this.mainManager.postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'close'])));
},
 _Manager$0: function() {
  this._nativeDetectEnvironment$0();
  this.topEventLoop = $._EventLoop$();
  this.isolates = $.HashMapImplementation$('int', '_IsolateContext');
  this.managers = $.HashMapImplementation$('int', '_ManagerStub');
  if (this.isWorker === true) {
    this.mainManager = $._MainManagerStub$();
    this._nativeInitWorkerMessageHandler$0();
  }
}
};

$$._IsolateContext = {"":
 ["id?", "ports?", "isolateStatics"],
 "super": "Object",
 initGlobals$0: function() {
$initGlobals(this);
},
 eval$1: function(code) {
  var old = $._globalState0().get$currentContext();
  $._globalState0().set$currentContext(this);
  this._setGlobals$0();
  var result = null;
  try {
    result = code.call$0();
  } finally {
    var t1 = old;
    $._globalState0().set$currentContext(t1);
    t1 = old;
    if (!(t1 == null))
      t1._setGlobals$0();
  }
  return result;
},
 _setGlobals$0: function() {
$setGlobals(this);
},
 lookup$1: function(portId) {
  return $.index(this.ports, portId);
},
 register$2: function(portId, port) {
  var t1 = this.ports;
  if (t1.containsKey$1(portId) === true)
    throw $.captureStackTrace($.ExceptionImplementation$('Registry: ports must be registered only once.'));
  $.indexSet(t1, portId, port);
  $.indexSet($._globalState0().get$isolates(), this.id, this);
},
 unregister$1: function(portId) {
  var t1 = this.ports;
  t1.remove$1(portId);
  if ($.isEmpty(t1) === true)
    $._globalState0().get$isolates().remove$1(this.id);
},
 _IsolateContext$0: function() {
  var t1 = $._globalState0();
  var t2 = t1.get$nextIsolateId();
  t1.set$nextIsolateId($.add(t2, 1));
  this.id = t2;
  this.ports = $.HashMapImplementation$('int', 'ReceivePort');
  this.initGlobals$0();
}
};

$$._EventLoop = {"":
 ["events"],
 "super": "Object",
 enqueue$3: function(isolate, fn, msg) {
  $.addLast(this.events, $._IsolateEvent$(isolate, fn, msg));
},
 dequeue$0: function() {
  var t1 = this.events;
  if ($.isEmpty(t1) === true)
    return;
  return t1.removeFirst$0();
},
 runIteration$0: function() {
  var event$ = this.dequeue$0();
  if (event$ == null) {
    if ($._globalState0().get$isWorker() === true)
      $._globalState0().maybeCloseWorker$0();
    else if (!($._globalState0().get$rootContext() == null) && $._globalState0().get$isolates().containsKey$1($._globalState0().get$rootContext().get$id()) === true && $._globalState0().get$fromCommandLine() === true && $.isEmpty($._globalState0().get$rootContext().get$ports()) === true)
      throw $.captureStackTrace($.ExceptionImplementation$('Program exited with open ReceivePorts.'));
    return false;
  }
  event$.process$0();
  return true;
},
 _runHelper$0: function() {
  if (!($._window() == null))
    new $._EventLoop__runHelper_next(this).call$0();
  else
    for (; this.runIteration$0() === true;)
      ;
},
 run$0: function() {
  if ($._globalState0().get$isWorker() !== true)
    this._runHelper$0();
  else
    try {
      this._runHelper$0();
    } catch (exception) {
      var t1 = $.unwrapException(exception);
      var e = t1;
      var trace = $.getTraceFromException(exception);
      $._globalState0().get$mainManager().postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'error', 'msg', $.S(e) + '\n' + $.S(trace)])));
    }

}
};

$$._IsolateEvent = {"":
 ["isolate", "fn", "message"],
 "super": "Object",
 process$0: function() {
  this.isolate.eval$1(this.fn);
}
};

$$._MainManagerStub = {"":
 [],
 "super": "Object",
 get$id: function() {
  return 0;
},
 postMessage$1: function(msg) {
$globalThis.postMessage(msg);
}
};

$$._BaseSendPort = {"":
 ["_isolateId?"],
 "super": "Object",
 _checkReplyTo$1: function(replyTo) {
  if (!(replyTo == null) && !(typeof replyTo === 'object' && replyTo !== null && !!replyTo.is$_NativeJsSendPort) && !(typeof replyTo === 'object' && replyTo !== null && !!replyTo.is$_WorkerSendPort) && !(typeof replyTo === 'object' && replyTo !== null && !!replyTo.is$_BufferingSendPort))
    throw $.captureStackTrace($.ExceptionImplementation$('SendPort.send: Illegal replyTo port type'));
},
 call$1: function(message) {
  var completer = $.CompleterImpl$();
  var port = $._ReceivePortImpl$();
  this.send$2(message, port.toSendPort$0());
  port.receive$1(new $._BaseSendPort_call_anon(port, completer));
  return completer.get$future();
},
 is$SendPort: true
};

$$._NativeJsSendPort = {"":
 ["_receivePort?", "_isolateId"],
 "super": "_BaseSendPort",
 send$2: function(message, replyTo) {
  $._waitForPendingPorts([message, replyTo], new $._NativeJsSendPort_send_anon(message, this, replyTo));
},
 operator$eq$1: function(other) {
  return typeof other === 'object' && other !== null && !!other.is$_NativeJsSendPort && $.eqB(this._receivePort, other._receivePort);
},
 hashCode$0: function() {
  return this._receivePort.get$_id();
},
 is$_NativeJsSendPort: true,
 is$SendPort: true
};

$$._WorkerSendPort = {"":
 ["_workerId?", "_receivePortId", "_isolateId"],
 "super": "_BaseSendPort",
 send$2: function(message, replyTo) {
  $._waitForPendingPorts([message, replyTo], new $._WorkerSendPort_send_anon(message, this, replyTo));
},
 operator$eq$1: function(other) {
  if (typeof other === 'object' && other !== null && !!other.is$_WorkerSendPort)
    var t1 = $.eqB(this._workerId, other._workerId) && $.eqB(this._isolateId, other._isolateId) && $.eqB(this._receivePortId, other._receivePortId);
  else
    t1 = false;
  return t1;
},
 hashCode$0: function() {
  return $.xor($.xor($.shl(this._workerId, 16), $.shl(this._isolateId, 8)), this._receivePortId);
},
 is$_WorkerSendPort: true,
 is$SendPort: true
};

$$._ReceivePortImpl = {"":
 ["_id?", "_callback?"],
 "super": "Object",
 _callback$2: function(arg0, arg1) { return this._callback.call$2(arg0, arg1); },
 receive$1: function(onMessage) {
  this._callback = onMessage;
},
 close$0: function() {
  this._callback = null;
  $._globalState0().get$currentContext().unregister$1(this._id);
},
 toSendPort$0: function() {
  return $._NativeJsSendPort$(this, $._globalState0().get$currentContext().get$id());
},
 _ReceivePortImpl$0: function() {
  $._globalState0().get$currentContext().register$2(this._id, this);
}
};

$$._PendingSendPortFinder = {"":
 ["ports?", "_visited"],
 "super": "_MessageTraverser",
 visitPrimitive$1: function(x) {
},
 visitList$1: function(list) {
  var t1 = this._visited;
  if (!($.index(t1, list) == null))
    return;
  $.indexSet(t1, list, true);
  $.forEach(list, new $._PendingSendPortFinder_visitList_anon(this));
},
 visitMap$1: function(map) {
  var t1 = this._visited;
  if (!($.index(t1, map) == null))
    return;
  $.indexSet(t1, map, true);
  $.forEach(map.getValues$0(), new $._PendingSendPortFinder_visitMap_anon(this));
},
 visitSendPort$1: function(port) {
  if (!!port.is$_BufferingSendPort && port._port == null)
    this.ports.push(port.get$_futurePort());
},
 _PendingSendPortFinder$0: function() {
  this._visited = $._JsVisitedMap$();
}
};

$$._JsSerializer = {"":
 ["_nextFreeRefId", "_visited"],
 "super": "_Serializer",
 visitSendPort$1: function(x) {
  if (typeof x === 'object' && x !== null && !!x.is$_NativeJsSendPort)
    return this.visitNativeJsSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_WorkerSendPort)
    return this.visitWorkerSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_BufferingSendPort)
    return this.visitBufferingSendPort$1(x);
  throw $.captureStackTrace('Illegal underlying port ' + $.S(x));
},
 visitNativeJsSendPort$1: function(port) {
  return ['sendport', $._globalState0().get$currentManagerId(), port._isolateId, port._receivePort.get$_id()];
},
 visitWorkerSendPort$1: function(port) {
  return ['sendport', port._workerId, port._isolateId, port._receivePortId];
},
 visitBufferingSendPort$1: function(port) {
  var t1 = port._port;
  if (!(t1 == null))
    return this.visitSendPort$1(t1);
  else
    throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
},
 _JsSerializer$0: function() {
  this._visited = $._JsVisitedMap$();
}
};

$$._JsCopier = {"":
 ["_visited"],
 "super": "_Copier",
 visitSendPort$1: function(x) {
  if (typeof x === 'object' && x !== null && !!x.is$_NativeJsSendPort)
    return this.visitNativeJsSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_WorkerSendPort)
    return this.visitWorkerSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_BufferingSendPort)
    return this.visitBufferingSendPort$1(x);
  throw $.captureStackTrace('Illegal underlying port ' + $.S(this.get$p()));
},
 visitNativeJsSendPort$1: function(port) {
  return $._NativeJsSendPort$(port._receivePort, port._isolateId);
},
 visitWorkerSendPort$1: function(port) {
  return $._WorkerSendPort$(port._workerId, port._isolateId, port._receivePortId);
},
 visitBufferingSendPort$1: function(port) {
  var t1 = port._port;
  if (!(t1 == null))
    return this.visitSendPort$1(t1);
  else
    throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
},
 _JsCopier$0: function() {
  this._visited = $._JsVisitedMap$();
}
};

$$._JsDeserializer = {"":
 ["_deserialized"],
 "super": "_Deserializer",
 deserializeSendPort$1: function(x) {
  var managerId = $.index(x, 1);
  var isolateId = $.index(x, 2);
  var receivePortId = $.index(x, 3);
  if ($.eqB(managerId, $._globalState0().get$currentManagerId())) {
    var isolate = $.index($._globalState0().get$isolates(), isolateId);
    if (isolate == null)
      return;
    return $._NativeJsSendPort$(isolate.lookup$1(receivePortId), isolateId);
  } else
    return $._WorkerSendPort$(managerId, isolateId, receivePortId);
}
};

$$._JsVisitedMap = {"":
 ["tagged"],
 "super": "Object",
 operator$index$1: function(object) {
  return this._getAttachedInfo$1(object);
},
 operator$indexSet$2: function(object, info) {
  $.add$1(this.tagged, object);
  this._setAttachedInfo$2(object, info);
},
 reset$0: function() {
  this.tagged = $.ListImplementation_List(null);
},
 cleanup$0: function() {
  var length$ = $.get$length(this.tagged);
  if (typeof length$ !== 'number')
    return this.cleanup$0$bailout(1, length$);
  var i = 0;
  for (; i < length$; ++i)
    this._clearAttachedInfo$1($.index(this.tagged, i));
  this.tagged = null;
},
 cleanup$0$bailout: function(state, length$) {
  var i = 0;
  for (; $.ltB(i, length$); ++i)
    this._clearAttachedInfo$1($.index(this.tagged, i));
  this.tagged = null;
},
 _clearAttachedInfo$1: function(o) {
o['__MessageTraverser__attached_info__'] = (void 0);
},
 _setAttachedInfo$2: function(o, info) {
o['__MessageTraverser__attached_info__'] = info;
},
 _getAttachedInfo$1: function(o) {
return o['__MessageTraverser__attached_info__'];
}
};

$$._MessageTraverserVisitedMap = {"":
 [],
 "super": "Object",
 operator$index$1: function(object) {
  return;
},
 operator$indexSet$2: function(object, info) {
},
 reset$0: function() {
},
 cleanup$0: function() {
}
};

$$._MessageTraverser = {"":
 [],
 "super": "Object",
 traverse$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x))
    return this.visitPrimitive$1(x);
  var t1 = this._visited;
  t1.reset$0();
  var result = null;
  try {
    result = this._dispatch$1(x);
  } finally {
    t1.cleanup$0();
  }
  return result;
},
 _dispatch$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x))
    return this.visitPrimitive$1(x);
  if (typeof x === 'object' && x !== null && (x.constructor === Array || x.is$List()))
    return this.visitList$1(x);
  if (typeof x === 'object' && x !== null && x.is$Map())
    return this.visitMap$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPort)
    return this.visitSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPortSync)
    return this.visitSendPortSync$1(x);
  return this.visitObject$1(x);
},
 visitObject$1: function(x) {
  throw $.captureStackTrace('Message serialization: Illegal value ' + $.S(x) + ' passed');
}
};

$$._Copier = {"":
 [],
 "super": "_MessageTraverser",
 visitPrimitive$1: function(x) {
  return x;
},
 visitList$1: function(list) {
  if (typeof list !== 'object' || list === null || list.constructor !== Array && !list.is$JavaScriptIndexingBehavior())
    return this.visitList$1$bailout(1, list);
  var t1 = this._visited;
  var copy = t1.operator$index$1(list);
  if (!(copy == null))
    return copy;
  var len = list.length;
  copy = $.ListImplementation_List(len);
  t1.operator$indexSet$2(list, copy);
  for (var i = 0; i < len; ++i) {
    if (i < 0 || i >= list.length)
      throw $.ioore(i);
    t1 = this._dispatch$1(list[i]);
    if (i < 0 || i >= copy.length)
      throw $.ioore(i);
    copy[i] = t1;
  }
  return copy;
},
 visitList$1$bailout: function(state, list) {
  var t1 = this._visited;
  var copy = $.index(t1, list);
  if (!(copy == null))
    return copy;
  var len = $.get$length(list);
  copy = $.ListImplementation_List(len);
  $.indexSet(t1, list, copy);
  for (var i = 0; $.ltB(i, len); ++i) {
    t1 = this._dispatch$1($.index(list, i));
    if (i < 0 || i >= copy.length)
      throw $.ioore(i);
    copy[i] = t1;
  }
  return copy;
},
 visitMap$1: function(map) {
  var t1 = {};
  var t2 = this._visited;
  t1.copy_10 = $.index(t2, map);
  var t3 = t1.copy_10;
  if (!(t3 == null))
    return t3;
  t1.copy_10 = $.HashMapImplementation$();
  $.indexSet(t2, map, t1.copy_10);
  map.forEach$1(new $._Copier_visitMap_anon(this, t1));
  return t1.copy_10;
}
};

$$._Serializer = {"":
 [],
 "super": "_MessageTraverser",
 visitPrimitive$1: function(x) {
  return x;
},
 visitList$1: function(list) {
  var t1 = this._visited;
  var copyId = $.index(t1, list);
  if (!(copyId == null))
    return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = id + 1;
  $.indexSet(t1, list, id);
  return ['list', id, this._serializeList$1(list)];
},
 visitMap$1: function(map) {
  var t1 = this._visited;
  var copyId = $.index(t1, map);
  if (!(copyId == null))
    return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = id + 1;
  $.indexSet(t1, map, id);
  return ['map', id, this._serializeList$1(map.getKeys$0()), this._serializeList$1(map.getValues$0())];
},
 _serializeList$1: function(list) {
  if (typeof list !== 'string' && (typeof list !== 'object' || list === null || list.constructor !== Array && !list.is$JavaScriptIndexingBehavior()))
    return this._serializeList$1$bailout(1, list);
  var len = list.length;
  var result = $.ListImplementation_List(len);
  for (var i = 0; i < len; ++i) {
    if (i < 0 || i >= list.length)
      throw $.ioore(i);
    var t1 = this._dispatch$1(list[i]);
    if (i < 0 || i >= result.length)
      throw $.ioore(i);
    result[i] = t1;
  }
  return result;
},
 _serializeList$1$bailout: function(state, list) {
  var len = $.get$length(list);
  var result = $.ListImplementation_List(len);
  for (var i = 0; $.ltB(i, len); ++i) {
    var t1 = this._dispatch$1($.index(list, i));
    if (i < 0 || i >= result.length)
      throw $.ioore(i);
    result[i] = t1;
  }
  return result;
}
};

$$._Deserializer = {"":
 [],
 "super": "Object",
 deserialize$1: function(x) {
  if ($._Deserializer_isPrimitive(x))
    return x;
  this._deserialized = $.HashMapImplementation$();
  return this._deserializeHelper$1(x);
},
 _deserializeHelper$1: function(x) {
  if ($._Deserializer_isPrimitive(x))
    return x;
  switch ($.index(x, 0)) {
    case 'ref':
      return this._deserializeRef$1(x);
    case 'list':
      return this._deserializeList$1(x);
    case 'map':
      return this._deserializeMap$1(x);
    case 'sendport':
      return this.deserializeSendPort$1(x);
    default:
      return this.deserializeObject$1(x);
  }
},
 _deserializeRef$1: function(x) {
  var id = $.index(x, 1);
  return $.index(this._deserialized, id);
},
 _deserializeList$1: function(x) {
  var id = $.index(x, 1);
  var dartList = $.index(x, 2);
  if (typeof dartList !== 'object' || dartList === null || (dartList.constructor !== Array || !!dartList.immutable$list) && !dartList.is$JavaScriptIndexingBehavior())
    return this._deserializeList$1$bailout(1, dartList, id);
  $.indexSet(this._deserialized, id, dartList);
  var len = dartList.length;
  for (var i = 0; i < len; ++i) {
    if (i < 0 || i >= dartList.length)
      throw $.ioore(i);
    var t1 = this._deserializeHelper$1(dartList[i]);
    if (i < 0 || i >= dartList.length)
      throw $.ioore(i);
    dartList[i] = t1;
  }
  return dartList;
},
 _deserializeList$1$bailout: function(state, dartList, id) {
  $.indexSet(this._deserialized, id, dartList);
  var len = $.get$length(dartList);
  for (var i = 0; $.ltB(i, len); ++i)
    $.indexSet(dartList, i, this._deserializeHelper$1($.index(dartList, i)));
  return dartList;
},
 _deserializeMap$1: function(x) {
  var result = $.HashMapImplementation$();
  var id = $.index(x, 1);
  $.indexSet(this._deserialized, id, result);
  var keys = $.index(x, 2);
  if (typeof keys !== 'string' && (typeof keys !== 'object' || keys === null || keys.constructor !== Array && !keys.is$JavaScriptIndexingBehavior()))
    return this._deserializeMap$1$bailout(1, x, result, keys);
  var values = $.index(x, 3);
  if (typeof values !== 'string' && (typeof values !== 'object' || values === null || values.constructor !== Array && !values.is$JavaScriptIndexingBehavior()))
    return this._deserializeMap$1$bailout(2, values, result, keys);
  var len = keys.length;
  for (var i = 0; i < len; ++i) {
    if (i < 0 || i >= keys.length)
      throw $.ioore(i);
    var key = this._deserializeHelper$1(keys[i]);
    if (i < 0 || i >= values.length)
      throw $.ioore(i);
    result.operator$indexSet$2(key, this._deserializeHelper$1(values[i]));
  }
  return result;
},
 _deserializeMap$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var x = env0;
      result = env1;
      keys = env2;
      break;
    case 2:
      values = env0;
      result = env1;
      keys = env2;
      break;
  }
  switch (state) {
    case 0:
      var result = $.HashMapImplementation$();
      var id = $.index(x, 1);
      $.indexSet(this._deserialized, id, result);
      var keys = $.index(x, 2);
    case 1:
      state = 0;
      var values = $.index(x, 3);
    case 2:
      state = 0;
      var len = $.get$length(keys);
      for (var i = 0; $.ltB(i, len); ++i)
        result.operator$indexSet$2(this._deserializeHelper$1($.index(keys, i)), this._deserializeHelper$1($.index(values, i)));
      return result;
  }
},
 deserializeObject$1: function(x) {
  throw $.captureStackTrace('Unexpected serialized object');
}
};

$$._Timer = {"":
 ["_once", "_handle"],
 "super": "Object",
 _Timer$repeating$2: function(milliSeconds, callback) {
  this._handle = $._window().setInterval$2(new $.anon0(this, callback), milliSeconds);
},
 _Timer$2: function(milliSeconds, callback) {
  this._handle = $._window().setTimeout$2(new $.anon(this, callback), milliSeconds);
}
};

$$.ContactFilter = {"":
 [],
 "super": "Object",
 shouldCollide$2: function(fixtureA, fixtureB) {
  var filterA = fixtureA.get$filter();
  var filterB = fixtureB.get$filter();
  var t1 = filterA.get$groupIndex();
  if (typeof t1 !== 'number')
    return this.shouldCollide$2$bailout(1, t1, filterA, filterB, 0);
  if (!(t1 === 0) && $.eqB(filterA.get$groupIndex(), filterB.get$groupIndex())) {
    t1 = filterA.get$groupIndex();
    if (typeof t1 !== 'number')
      return this.shouldCollide$2$bailout(2, t1, 0, 0, 0);
    return t1 > 0;
  }
  t1 = filterA.get$maskBits();
  if (t1 !== (t1 | 0))
    return this.shouldCollide$2$bailout(3, t1, filterA, filterB, 0);
  var t3 = filterB.get$categoryBits();
  if (t3 !== (t3 | 0))
    return this.shouldCollide$2$bailout(4, t1, t3, filterA, filterB);
  if (!((t1 & t3) >>> 0 === 0)) {
    t1 = filterA.get$categoryBits();
    if (t1 !== (t1 | 0))
      return this.shouldCollide$2$bailout(5, t1, filterB, 0, 0);
    t3 = filterB.get$maskBits();
    if (t3 !== (t3 | 0))
      return this.shouldCollide$2$bailout(6, t1, t3, 0, 0);
    var t5 = !((t1 & t3) >>> 0 === 0);
    t1 = t5;
  } else
    t1 = false;
  return t1;
},
 shouldCollide$2$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      t1 = env0;
      filterA = env1;
      filterB = env2;
      break;
    case 2:
      t1 = env0;
      break;
    case 3:
      t1 = env0;
      filterA = env1;
      filterB = env2;
      break;
    case 4:
      t1 = env0;
      t3 = env1;
      filterA = env2;
      filterB = env3;
      break;
    case 5:
      t1 = env0;
      filterB = env1;
      break;
    case 6:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var filterA = fixtureA.get$filter();
      var filterB = fixtureB.get$filter();
      var t1 = filterA.get$groupIndex();
    case 1:
      state = 0;
    case 2:
      if (state === 2 || state === 0 && !$.eqB(t1, 0) && $.eqB(filterA.get$groupIndex(), filterB.get$groupIndex()))
        switch (state) {
          case 0:
            t1 = filterA.get$groupIndex();
          case 2:
            state = 0;
            return $.gt(t1, 0);
        }
      t1 = filterA.get$maskBits();
    case 3:
      state = 0;
      var t3 = filterB.get$categoryBits();
    case 4:
      state = 0;
    default:
      if (state === 6 || state === 5 || state === 0 && !$.eqB($.and(t1, t3), 0))
        switch (state) {
          case 0:
            t1 = filterA.get$categoryBits();
          case 5:
            state = 0;
            t3 = filterB.get$maskBits();
          case 6:
            state = 0;
            var t5 = !$.eqB($.and(t1, t3), 0);
            t1 = t5;
        }
      else
        t1 = false;
      return t1;
  }
}
};

$$.ContactImpulse = {"":
 ["normalImpulses?", "tangentImpulses?"],
 "super": "Object"
};

$$.AxisAlignedBox = {"":
 ["lowerBound?", "upperBound?"],
 "super": "Object",
 setFromCombination$2: function(boxOne, boxTwo) {
  var t1 = $.min(boxOne.get$lowerBound().get$x(), boxTwo.get$lowerBound().get$x());
  var t2 = this.lowerBound;
  t2.set$x(t1);
  t2.set$y($.min(boxOne.get$lowerBound().get$y(), boxTwo.get$lowerBound().get$y()));
  t2 = $.max(boxOne.get$upperBound().get$x(), boxTwo.get$upperBound().get$x());
  t1 = this.upperBound;
  t1.set$x(t2);
  t1.set$y($.max(boxOne.get$upperBound().get$y(), boxTwo.get$upperBound().get$y()));
},
 get$center: function() {
  var c = $.Vector$copy(this.lowerBound);
  c.addLocal$1(this.upperBound);
  c.mulLocal$1(0.5);
  return c;
},
 contains$1: function(aabb) {
  var t1 = this.lowerBound;
  if ($.gtB(t1.get$x(), aabb.get$lowerBound().get$x()))
    if ($.gtB(t1.get$y(), aabb.get$lowerBound().get$y())) {
      t1 = this.upperBound;
      t1 = $.ltB(t1.get$y(), aabb.get$upperBound().get$y()) && $.ltB(t1.get$x(), aabb.get$upperBound().get$x());
    } else
      t1 = false;
  else
    t1 = false;
  return t1;
},
 setFrom$1: function(other) {
  this.lowerBound.setFrom$1(other.get$lowerBound());
  this.upperBound.setFrom$1(other.get$upperBound());
},
 toString$0: function() {
  return $.S(this.lowerBound) + ', ' + $.S(this.upperBound);
},
 AxisAlignedBox$2: function(lowerBound, upperBound) {
  if (this.lowerBound == null)
    this.lowerBound = $.Vector$(0, 0);
  if (this.upperBound == null)
    this.upperBound = $.Vector$(0, 0);
}
};

$$.Collision = {"":
 ["_pool", "cache", "input", "output", "results1", "results2", "incidentEdge?", "localTangent", "localNormal?", "planePoint", "tangent", "normal?", "normal1", "v11", "v12", "clipPoints1", "clipPoints2"],
 "super": "Object",
 testOverlap$4: function(shapeA, shapeB, transformA, transformB) {
  var t1 = this.input;
  t1.get$proxyA().setFromShape$1(shapeA);
  t1.get$proxyB().setFromShape$1(shapeB);
  t1.get$transformA().setFrom$1(transformA);
  t1.get$transformB().setFrom$1(transformB);
  t1.set$useRadii(true);
  var t2 = this.cache;
  t2.set$count(0);
  var t3 = this._pool.get$distance();
  var t4 = this.output;
  t3.distance$3(t4, t2, t1);
  return $.lt(t4.get$distance(), 0.000001192);
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
  if ($.gtB(distSqr, $.mul(radius, radius)))
    return;
  manifold.set$type(0);
  manifold.get$localPoint().setFrom$1(circle1.get$position());
  manifold.get$localNormal().setZero$0();
  manifold.set$pointCount(1);
  $.index(manifold.get$points(), 0).get$localPoint().setFrom$1(circle2.get$position());
  $.index(manifold.get$points(), 0).get$id().zero$0();
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
  if (typeof cLocaly !== 'number')
    return this.collidePolygonAndCircle$5$bailout(1, manifold, cLocaly, polygon, circle, v1x, v1y, b, 0);
  var cLocalx = $.add($.mul(v1x, b.get$x()), $.mul(v1y, b.get$y()));
  if (typeof cLocalx !== 'number')
    return this.collidePolygonAndCircle$5$bailout(2, manifold, cLocaly, polygon, circle, cLocalx, 0, 0, 0);
  var radius = $.add(polygon.get$radius(), circle.get$radius());
  if (typeof radius !== 'number')
    return this.collidePolygonAndCircle$5$bailout(3, manifold, cLocaly, polygon, circle, cLocalx, radius, 0, 0);
  var vertexCount = polygon.get$vertexCount();
  if (typeof vertexCount !== 'number')
    return this.collidePolygonAndCircle$5$bailout(4, manifold, cLocaly, polygon, circle, cLocalx, radius, vertexCount, 0);
  var vertices = polygon.get$vertices();
  if (typeof vertices !== 'string' && (typeof vertices !== 'object' || vertices === null || vertices.constructor !== Array && !vertices.is$JavaScriptIndexingBehavior()))
    return this.collidePolygonAndCircle$5$bailout(5, manifold, cLocaly, polygon, circle, vertices, cLocalx, radius, vertexCount);
  var normals = polygon.get$normals();
  if (typeof normals !== 'string' && (typeof normals !== 'object' || normals === null || normals.constructor !== Array && !normals.is$JavaScriptIndexingBehavior()))
    return this.collidePolygonAndCircle$5$bailout(6, manifold, cLocaly, normals, circle, vertices, cLocalx, radius, vertexCount);
  for (var normalIndex = 0, i = 0, separation = 1e-12; i < vertexCount; ++i) {
    if (i < 0 || i >= vertices.length)
      throw $.ioore(i);
    var vertex = vertices[i];
    var t1 = vertex.get$x();
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    var tempx = cLocalx - t1;
    t1 = vertex.get$y();
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    var tempy = cLocaly - t1;
    if (i < 0 || i >= normals.length)
      throw $.ioore(i);
    var norm = normals[i];
    var s = $.add($.mul(norm.get$x(), tempx), $.mul(norm.get$y(), tempy));
    if ($.gtB(s, radius))
      return;
    if ($.gtB(s, separation)) {
      separation = s;
      normalIndex = i;
    }
  }
  var vertIndex2 = normalIndex + 1;
  vertIndex2 = vertIndex2 < vertexCount ? vertIndex2 : 0;
  t1 = vertices.length;
  if (normalIndex < 0 || normalIndex >= t1)
    throw $.ioore(normalIndex);
  var v1 = vertices[normalIndex];
  if (vertIndex2 < 0 || vertIndex2 >= t1)
    throw $.ioore(vertIndex2);
  var v2 = vertices[vertIndex2];
  if ($.ltB(separation, 1.192e-7)) {
    manifold.set$pointCount(1);
    manifold.set$type(1);
    if (normalIndex < 0 || normalIndex >= normals.length)
      throw $.ioore(normalIndex);
    norm = normals[normalIndex];
    t1 = norm.get$x();
    manifold.get$localNormal().set$x(t1);
    t1 = norm.get$y();
    manifold.get$localNormal().set$y(t1);
    t1 = $.mul($.add(v1.get$x(), v2.get$x()), 0.5);
    manifold.get$localPoint().set$x(t1);
    t1 = $.mul($.add(v1.get$y(), v2.get$y()), 0.5);
    manifold.get$localPoint().set$y(t1);
    var mpoint = $.index(manifold.get$points(), 0);
    t1 = circle.get$position().get$x();
    mpoint.get$localPoint().set$x(t1);
    t1 = circle.get$position().get$y();
    mpoint.get$localPoint().set$y(t1);
    mpoint.get$id().zero$0();
    return;
  }
  t1 = v1.get$x();
  if (typeof t1 !== 'number')
    throw $.iae(t1);
  var tempX = cLocalx - t1;
  t1 = v1.get$y();
  if (typeof t1 !== 'number')
    throw $.iae(t1);
  var tempY = cLocaly - t1;
  var temp2X = $.sub(v2.get$x(), v1.get$x());
  var temp2Y = $.sub(v2.get$y(), v1.get$y());
  if (typeof temp2X !== 'number')
    throw $.iae(temp2X);
  t1 = tempX * temp2X;
  if (typeof temp2Y !== 'number')
    throw $.iae(temp2Y);
  var u1 = t1 + tempY * temp2Y;
  t1 = v2.get$x();
  if (typeof t1 !== 'number')
    throw $.iae(t1);
  var temp3X = cLocalx - t1;
  t1 = v2.get$y();
  if (typeof t1 !== 'number')
    throw $.iae(t1);
  var temp3Y = cLocaly - t1;
  var temp4X = $.sub(v1.get$x(), v2.get$x());
  var temp4Y = $.sub(v1.get$y(), v2.get$y());
  if (typeof temp4X !== 'number')
    throw $.iae(temp4X);
  t1 = temp3X * temp4X;
  if (typeof temp4Y !== 'number')
    throw $.iae(temp4Y);
  var u2 = t1 + temp3Y * temp4Y;
  if (u1 <= 0) {
    t1 = v1.get$x();
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    var dx = cLocalx - t1;
    t1 = v1.get$y();
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    var dy = cLocaly - t1;
    if (dx * dx + dy * dy > radius * radius)
      return;
    manifold.set$pointCount(1);
    manifold.set$type(1);
    t1 = v1.get$x();
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    t1 = cLocalx - t1;
    manifold.get$localNormal().set$x(t1);
    t1 = v1.get$y();
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    t1 = cLocaly - t1;
    manifold.get$localNormal().set$y(t1);
    manifold.get$localNormal().normalize$0();
    manifold.get$localPoint().setFrom$1(v1);
    $.index(manifold.get$points(), 0).get$localPoint().setFrom$1(circle.get$position());
    $.index(manifold.get$points(), 0).get$id().zero$0();
  } else if (u2 <= 0.0) {
    t1 = v2.get$x();
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    dx = cLocalx - t1;
    t1 = v2.get$y();
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    dy = cLocaly - t1;
    if (dx * dx + dy * dy > radius * radius)
      return;
    manifold.set$pointCount(1);
    manifold.set$type(1);
    t1 = v2.get$x();
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    t1 = cLocalx - t1;
    manifold.get$localNormal().set$x(t1);
    t1 = v2.get$y();
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    t1 = cLocaly - t1;
    manifold.get$localNormal().set$y(t1);
    manifold.get$localNormal().normalize$0();
    manifold.get$localPoint().setFrom$1(v2);
    $.index(manifold.get$points(), 0).get$localPoint().setFrom$1(circle.get$position());
    $.index(manifold.get$points(), 0).get$id().zero$0();
  } else {
    var fcx = $.mul($.add(v1.get$x(), v2.get$x()), 0.5);
    var fcy = $.mul($.add(v1.get$y(), v2.get$y()), 0.5);
    if (typeof fcx !== 'number')
      throw $.iae(fcx);
    var tx = cLocalx - fcx;
    if (typeof fcy !== 'number')
      throw $.iae(fcy);
    var ty = cLocaly - fcy;
    if (normalIndex < 0 || normalIndex >= normals.length)
      throw $.ioore(normalIndex);
    norm = normals[normalIndex];
    t1 = norm.get$x();
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    t1 = tx * t1;
    var t2 = norm.get$y();
    if (typeof t2 !== 'number')
      throw $.iae(t2);
    if (t1 + ty * t2 > radius)
      return;
    manifold.set$pointCount(1);
    manifold.set$type(1);
    t1 = manifold.get$localNormal();
    if (normalIndex < 0 || normalIndex >= normals.length)
      throw $.ioore(normalIndex);
    t1.setFrom$1(normals[normalIndex]);
    manifold.get$localPoint().set$x(fcx);
    manifold.get$localPoint().set$y(fcy);
    $.index(manifold.get$points(), 0).get$localPoint().setFrom$1(circle.get$position());
    $.index(manifold.get$points(), 0).get$id().zero$0();
  }
},
 collidePolygonAndCircle$5$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7) {
  switch (state) {
    case 1:
      var manifold = env0;
      cLocaly = env1;
      var polygon = env2;
      var circle = env3;
      v1x = env4;
      v1y = env5;
      b = env6;
      break;
    case 2:
      manifold = env0;
      cLocaly = env1;
      polygon = env2;
      circle = env3;
      cLocalx = env4;
      break;
    case 3:
      manifold = env0;
      cLocaly = env1;
      polygon = env2;
      circle = env3;
      cLocalx = env4;
      radius = env5;
      break;
    case 4:
      manifold = env0;
      cLocaly = env1;
      polygon = env2;
      circle = env3;
      cLocalx = env4;
      radius = env5;
      vertexCount = env6;
      break;
    case 5:
      manifold = env0;
      cLocaly = env1;
      polygon = env2;
      circle = env3;
      vertices = env4;
      cLocalx = env5;
      radius = env6;
      vertexCount = env7;
      break;
    case 6:
      manifold = env0;
      cLocaly = env1;
      normals = env2;
      circle = env3;
      vertices = env4;
      cLocalx = env5;
      radius = env6;
      vertexCount = env7;
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
    case 4:
      state = 0;
      var vertices = polygon.get$vertices();
    case 5:
      state = 0;
      var normals = polygon.get$normals();
    case 6:
      state = 0;
      for (var normalIndex = 0, i = 0, separation = 1e-12; $.ltB(i, vertexCount); ++i) {
        var vertex = $.index(vertices, i);
        var tempx = $.sub(cLocalx, vertex.get$x());
        var tempy = $.sub(cLocaly, vertex.get$y());
        var norm = $.index(normals, i);
        var s = $.add($.mul(norm.get$x(), tempx), $.mul(norm.get$y(), tempy));
        if ($.gtB(s, radius))
          return;
        if ($.gtB(s, separation)) {
          separation = s;
          normalIndex = i;
        }
      }
      var vertIndex2 = normalIndex + 1;
      vertIndex2 = $.ltB(vertIndex2, vertexCount) ? vertIndex2 : 0;
      var v1 = $.index(vertices, normalIndex);
      var v2 = $.index(vertices, vertIndex2);
      if ($.ltB(separation, 1.192e-7)) {
        manifold.set$pointCount(1);
        manifold.set$type(1);
        norm = $.index(normals, normalIndex);
        var t1 = norm.get$x();
        manifold.get$localNormal().set$x(t1);
        t1 = norm.get$y();
        manifold.get$localNormal().set$y(t1);
        t1 = $.mul($.add(v1.get$x(), v2.get$x()), 0.5);
        manifold.get$localPoint().set$x(t1);
        t1 = $.mul($.add(v1.get$y(), v2.get$y()), 0.5);
        manifold.get$localPoint().set$y(t1);
        var mpoint = $.index(manifold.get$points(), 0);
        t1 = circle.get$position().get$x();
        mpoint.get$localPoint().set$x(t1);
        t1 = circle.get$position().get$y();
        mpoint.get$localPoint().set$y(t1);
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
        if ($.gtB($.add($.mul(dx, dx), $.mul(dy, dy)), $.mul(radius, radius)))
          return;
        manifold.set$pointCount(1);
        manifold.set$type(1);
        t1 = $.sub(cLocalx, v1.get$x());
        manifold.get$localNormal().set$x(t1);
        t1 = $.sub(cLocaly, v1.get$y());
        manifold.get$localNormal().set$y(t1);
        manifold.get$localNormal().normalize$0();
        manifold.get$localPoint().setFrom$1(v1);
        $.index(manifold.get$points(), 0).get$localPoint().setFrom$1(circle.get$position());
        $.index(manifold.get$points(), 0).get$id().zero$0();
      } else if ($.leB(u2, 0.0)) {
        dx = $.sub(cLocalx, v2.get$x());
        dy = $.sub(cLocaly, v2.get$y());
        if ($.gtB($.add($.mul(dx, dx), $.mul(dy, dy)), $.mul(radius, radius)))
          return;
        manifold.set$pointCount(1);
        manifold.set$type(1);
        t1 = $.sub(cLocalx, v2.get$x());
        manifold.get$localNormal().set$x(t1);
        t1 = $.sub(cLocaly, v2.get$y());
        manifold.get$localNormal().set$y(t1);
        manifold.get$localNormal().normalize$0();
        manifold.get$localPoint().setFrom$1(v2);
        $.index(manifold.get$points(), 0).get$localPoint().setFrom$1(circle.get$position());
        $.index(manifold.get$points(), 0).get$id().zero$0();
      } else {
        var fcx = $.mul($.add(v1.get$x(), v2.get$x()), 0.5);
        var fcy = $.mul($.add(v1.get$y(), v2.get$y()), 0.5);
        var tx = $.sub(cLocalx, fcx);
        var ty = $.sub(cLocaly, fcy);
        norm = $.index(normals, normalIndex);
        if ($.gtB($.add($.mul(tx, norm.get$x()), $.mul(ty, norm.get$y())), radius))
          return;
        manifold.set$pointCount(1);
        manifold.set$type(1);
        manifold.get$localNormal().setFrom$1($.index(normals, normalIndex));
        manifold.get$localPoint().set$x(fcx);
        manifold.get$localPoint().set$y(fcy);
        $.index(manifold.get$points(), 0).get$localPoint().setFrom$1(circle.get$position());
        $.index(manifold.get$points(), 0).get$id().zero$0();
      }
  }
},
 edgeSeparation$5: function(poly1, xf1, edge1, poly2, xf2) {
  poly1.get$vertexCount();
  var vertices1 = poly1.get$vertices();
  if (typeof vertices1 !== 'string' && (typeof vertices1 !== 'object' || vertices1 === null || vertices1.constructor !== Array && !vertices1.is$JavaScriptIndexingBehavior()))
    return this.edgeSeparation$5$bailout(1, poly1, xf1, edge1, poly2, xf2, vertices1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var normals1 = poly1.get$normals();
  if (typeof normals1 !== 'string' && (typeof normals1 !== 'object' || normals1 === null || normals1.constructor !== Array && !normals1.is$JavaScriptIndexingBehavior()))
    return this.edgeSeparation$5$bailout(2, xf1, edge1, poly2, xf2, vertices1, normals1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var count2 = poly2.get$vertexCount();
  if (typeof count2 !== 'number')
    return this.edgeSeparation$5$bailout(3, xf1, edge1, poly2, xf2, vertices1, normals1, count2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var vertices2 = poly2.get$vertices();
  if (typeof vertices2 !== 'string' && (typeof vertices2 !== 'object' || vertices2 === null || vertices2.constructor !== Array && !vertices2.is$JavaScriptIndexingBehavior()))
    return this.edgeSeparation$5$bailout(4, xf1, edge1, xf2, vertices1, normals1, count2, vertices2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var R = xf1.get$rotation();
  if (edge1 !== (edge1 | 0))
    throw $.iae(edge1);
  if (edge1 < 0 || edge1 >= normals1.length)
    throw $.ioore(edge1);
  var v = normals1[edge1];
  var t5 = R.get$col1().get$y();
  if (typeof t5 !== 'number')
    return this.edgeSeparation$5$bailout(5, xf1, edge1, xf2, t5, vertices1, count2, vertices2, R, v, 0, 0, 0, 0, 0, 0, 0, 0);
  var t7 = v.get$x();
  if (typeof t7 !== 'number')
    return this.edgeSeparation$5$bailout(6, xf1, edge1, t7, xf2, t5, vertices1, count2, vertices2, R, v, 0, 0, 0, 0, 0, 0, 0);
  t7 = t5 * t7;
  t5 = R.get$col2().get$y();
  if (typeof t5 !== 'number')
    return this.edgeSeparation$5$bailout(7, xf1, edge1, xf2, t7, t5, vertices1, count2, vertices2, R, v, 0, 0, 0, 0, 0, 0, 0);
  var t10 = v.get$y();
  if (typeof t10 !== 'number')
    return this.edgeSeparation$5$bailout(8, xf1, edge1, xf2, t7, t5, t10, vertices1, count2, vertices2, R, v, 0, 0, 0, 0, 0, 0);
  var normal1Worldy = t7 + t5 * t10;
  t7 = R.get$col1().get$x();
  if (typeof t7 !== 'number')
    return this.edgeSeparation$5$bailout(9, xf1, edge1, xf2, vertices1, count2, vertices2, normal1Worldy, R, t7, v, 0, 0, 0, 0, 0, 0, 0);
  var t13 = v.get$x();
  if (typeof t13 !== 'number')
    return this.edgeSeparation$5$bailout(10, xf1, edge1, t13, xf2, vertices1, count2, vertices2, normal1Worldy, R, t7, v, 0, 0, 0, 0, 0, 0);
  t13 = t7 * t13;
  t7 = R.get$col2().get$x();
  if (typeof t7 !== 'number')
    return this.edgeSeparation$5$bailout(11, t13, xf1, edge1, t7, xf2, vertices1, count2, vertices2, normal1Worldy, R, v, 0, 0, 0, 0, 0, 0);
  var t16 = v.get$y();
  if (typeof t16 !== 'number')
    return this.edgeSeparation$5$bailout(12, t13, xf1, edge1, t7, xf2, t16, vertices1, count2, vertices2, normal1Worldy, R, 0, 0, 0, 0, 0, 0);
  var normal1Worldx = t13 + t7 * t16;
  var R1 = xf2.get$rotation();
  t13 = R1.get$col1().get$x();
  if (typeof t13 !== 'number')
    return this.edgeSeparation$5$bailout(13, t13, xf1, edge1, xf2, normal1Worldx, R1, vertices1, count2, vertices2, normal1Worldy, R, 0, 0, 0, 0, 0, 0);
  t13 = normal1Worldx * t13;
  var t19 = R1.get$col1().get$y();
  if (typeof t19 !== 'number')
    return this.edgeSeparation$5$bailout(14, xf1, edge1, xf2, normal1Worldx, R1, vertices1, count2, vertices2, t13, R, t19, normal1Worldy, 0, 0, 0, 0, 0);
  var normal1x = t13 + normal1Worldy * t19;
  t13 = R1.get$col2().get$x();
  if (typeof t13 !== 'number')
    return this.edgeSeparation$5$bailout(15, xf1, edge1, xf2, normal1Worldx, R1, vertices1, count2, vertices2, R, normal1x, t13, normal1Worldy, 0, 0, 0, 0, 0);
  t13 = normal1Worldx * t13;
  var t22 = R1.get$col2().get$y();
  if (typeof t22 !== 'number')
    return this.edgeSeparation$5$bailout(16, xf1, edge1, xf2, normal1Worldx, R1, vertices1, count2, vertices2, R, normal1x, t13, t22, normal1Worldy, 0, 0, 0, 0);
  var normal1y = t13 + normal1Worldy * t22;
  for (var minDot = 99999999999999.0, i = 0, index = 0; i < count2; ++i) {
    if (i < 0 || i >= vertices2.length)
      throw $.ioore(i);
    var a = vertices2[i];
    var t1 = a.get$x();
    if (typeof t1 !== 'number')
      return this.edgeSeparation$5$bailout(17, xf1, edge1, xf2, normal1Worldx, minDot, R1, count2, i, vertices2, R, vertices1, index, normal1x, normal1Worldy, normal1y, a, t1);
    t1 *= normal1x;
    var t3 = a.get$y();
    if (typeof t3 !== 'number')
      return this.edgeSeparation$5$bailout(18, t1, t3, edge1, xf1, xf2, normal1Worldx, minDot, R1, count2, i, vertices2, R, vertices1, index, normal1x, normal1Worldy, normal1y);
    var dot = t1 + t3 * normal1y;
    if (typeof dot !== 'number')
      return this.edgeSeparation$5$bailout(19, xf1, edge1, xf2, dot, normal1Worldx, minDot, R1, count2, i, vertices2, R, vertices1, index, normal1x, normal1Worldy, normal1y, 0);
    if (dot < minDot) {
      index = i;
      minDot = dot;
    }
  }
  if (edge1 < 0 || edge1 >= vertices1.length)
    throw $.ioore(edge1);
  var v3 = vertices1[edge1];
  t1 = xf1.get$position().get$y();
  if (typeof t1 !== 'number')
    return this.edgeSeparation$5$bailout(20, index, xf1, xf2, normal1Worldx, R1, v3, vertices2, normal1Worldy, R, t1, 0, 0, 0, 0, 0, 0, 0);
  t3 = R.get$col1().get$y();
  if (typeof t3 !== 'number')
    return this.edgeSeparation$5$bailout(21, index, xf1, xf2, normal1Worldx, R1, v3, vertices2, normal1Worldy, R, t3, t1, 0, 0, 0, 0, 0, 0);
  t5 = v3.get$x();
  if (typeof t5 !== 'number')
    return this.edgeSeparation$5$bailout(22, xf1, xf2, normal1Worldx, R1, vertices2, R, index, v3, normal1Worldy, t1, t3, t5, 0, 0, 0, 0, 0);
  t1 += t3 * t5;
  t7 = R.get$col2().get$y();
  if (typeof t7 !== 'number')
    return this.edgeSeparation$5$bailout(23, index, xf1, t1, xf2, t7, normal1Worldx, R1, v3, vertices2, normal1Worldy, R, 0, 0, 0, 0, 0, 0);
  var t9 = v3.get$y();
  if (typeof t9 !== 'number')
    return this.edgeSeparation$5$bailout(24, xf1, t1, xf2, t7, t9, normal1Worldx, R1, vertices2, R, index, v3, normal1Worldy, 0, 0, 0, 0, 0);
  var v1y = t1 + t7 * t9;
  t1 = xf1.get$position().get$x();
  if (typeof t1 !== 'number')
    return this.edgeSeparation$5$bailout(25, index, xf2, normal1Worldx, R1, v3, v1y, vertices2, t1, R, normal1Worldy, 0, 0, 0, 0, 0, 0, 0);
  var t12 = R.get$col1().get$x();
  if (typeof t12 !== 'number')
    return this.edgeSeparation$5$bailout(26, index, normal1Worldy, xf2, normal1Worldx, R1, v3, v1y, vertices2, t1, R, t12, 0, 0, 0, 0, 0, 0);
  var t14 = v3.get$x();
  if (typeof t14 !== 'number')
    return this.edgeSeparation$5$bailout(27, xf2, normal1Worldx, R1, v1y, vertices2, t1, R, t12, t14, index, v3, normal1Worldy, 0, 0, 0, 0, 0);
  t1 += t12 * t14;
  t16 = R.get$col2().get$x();
  if (typeof t16 !== 'number')
    return this.edgeSeparation$5$bailout(28, index, t1, xf2, t16, normal1Worldx, R1, v1y, normal1Worldy, vertices2, v3, 0, 0, 0, 0, 0, 0, 0);
  var t18 = v3.get$y();
  if (typeof t18 !== 'number')
    return this.edgeSeparation$5$bailout(29, index, t1, xf2, t16, t18, normal1Worldx, R1, v1y, normal1Worldy, vertices2, 0, 0, 0, 0, 0, 0, 0);
  var v1x = t1 + t16 * t18;
  if (index < 0 || index >= vertices2.length)
    throw $.ioore(index);
  var v4 = vertices2[index];
  t1 = xf2.get$position().get$y();
  if (typeof t1 !== 'number')
    return this.edgeSeparation$5$bailout(30, xf2, normal1Worldx, R1, v1y, v1x, normal1Worldy, v4, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var t21 = R1.get$col1().get$y();
  if (typeof t21 !== 'number')
    return this.edgeSeparation$5$bailout(31, t21, xf2, normal1Worldx, R1, v1y, v1x, normal1Worldy, v4, t1, 0, 0, 0, 0, 0, 0, 0, 0);
  var t23 = v4.get$x();
  if (typeof t23 !== 'number')
    return this.edgeSeparation$5$bailout(32, t21, t23, xf2, normal1Worldx, R1, v1y, v1x, normal1Worldy, v4, t1, 0, 0, 0, 0, 0, 0, 0);
  t1 += t21 * t23;
  var t25 = R1.get$col2().get$y();
  if (typeof t25 !== 'number')
    return this.edgeSeparation$5$bailout(33, xf2, t1, normal1Worldx, R1, t25, v1y, normal1Worldy, v1x, v4, 0, 0, 0, 0, 0, 0, 0, 0);
  var t27 = v4.get$y();
  if (typeof t27 !== 'number')
    return this.edgeSeparation$5$bailout(34, xf2, t1, normal1Worldx, R1, t27, t25, v1y, normal1Worldy, v1x, v4, 0, 0, 0, 0, 0, 0, 0);
  var v2y = t1 + t25 * t27 - v1y;
  var t29 = xf2.get$position().get$x();
  if (typeof t29 !== 'number')
    return this.edgeSeparation$5$bailout(35, t29, normal1Worldx, R1, v1x, normal1Worldy, v4, v2y, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var t31 = R1.get$col1().get$x();
  if (typeof t31 !== 'number')
    return this.edgeSeparation$5$bailout(36, t29, t31, normal1Worldx, R1, v1x, normal1Worldy, v4, v2y, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var t33 = v4.get$x();
  if (typeof t33 !== 'number')
    return this.edgeSeparation$5$bailout(37, t29, t31, t33, normal1Worldx, R1, v1x, normal1Worldy, v4, v2y, 0, 0, 0, 0, 0, 0, 0, 0);
  t29 += t31 * t33;
  var t35 = R1.get$col2().get$x();
  if (typeof t35 !== 'number')
    return this.edgeSeparation$5$bailout(38, normal1Worldx, t29, t35, v1x, normal1Worldy, v4, v2y, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var t37 = v4.get$y();
  if (typeof t37 !== 'number')
    return this.edgeSeparation$5$bailout(39, normal1Worldx, t29, t35, v1x, normal1Worldy, t37, v2y, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  return (t29 + t35 * t37 - v1x) * normal1Worldx + v2y * normal1Worldy;
},
 edgeSeparation$5$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13, env14, env15, env16) {
  switch (state) {
    case 1:
      var poly1 = env0;
      var xf1 = env1;
      var edge1 = env2;
      var poly2 = env3;
      var xf2 = env4;
      vertices1 = env5;
      break;
    case 2:
      xf1 = env0;
      edge1 = env1;
      poly2 = env2;
      xf2 = env3;
      vertices1 = env4;
      normals1 = env5;
      break;
    case 3:
      xf1 = env0;
      edge1 = env1;
      poly2 = env2;
      xf2 = env3;
      vertices1 = env4;
      normals1 = env5;
      count2 = env6;
      break;
    case 4:
      xf1 = env0;
      edge1 = env1;
      xf2 = env2;
      vertices1 = env3;
      normals1 = env4;
      count2 = env5;
      vertices2 = env6;
      break;
    case 5:
      xf1 = env0;
      edge1 = env1;
      xf2 = env2;
      t5 = env3;
      vertices1 = env4;
      count2 = env5;
      vertices2 = env6;
      R = env7;
      v = env8;
      break;
    case 6:
      xf1 = env0;
      edge1 = env1;
      t7 = env2;
      xf2 = env3;
      t5 = env4;
      vertices1 = env5;
      count2 = env6;
      vertices2 = env7;
      R = env8;
      v = env9;
      break;
    case 7:
      xf1 = env0;
      edge1 = env1;
      xf2 = env2;
      t7 = env3;
      t5 = env4;
      vertices1 = env5;
      count2 = env6;
      vertices2 = env7;
      R = env8;
      v = env9;
      break;
    case 8:
      xf1 = env0;
      edge1 = env1;
      xf2 = env2;
      t7 = env3;
      t5 = env4;
      t10 = env5;
      vertices1 = env6;
      count2 = env7;
      vertices2 = env8;
      R = env9;
      v = env10;
      break;
    case 9:
      xf1 = env0;
      edge1 = env1;
      xf2 = env2;
      vertices1 = env3;
      count2 = env4;
      vertices2 = env5;
      normal1Worldy = env6;
      R = env7;
      t7 = env8;
      v = env9;
      break;
    case 10:
      xf1 = env0;
      edge1 = env1;
      t13 = env2;
      xf2 = env3;
      vertices1 = env4;
      count2 = env5;
      vertices2 = env6;
      normal1Worldy = env7;
      R = env8;
      t7 = env9;
      v = env10;
      break;
    case 11:
      t13 = env0;
      xf1 = env1;
      edge1 = env2;
      t7 = env3;
      xf2 = env4;
      vertices1 = env5;
      count2 = env6;
      vertices2 = env7;
      normal1Worldy = env8;
      R = env9;
      v = env10;
      break;
    case 12:
      t13 = env0;
      xf1 = env1;
      edge1 = env2;
      t7 = env3;
      xf2 = env4;
      t16 = env5;
      vertices1 = env6;
      count2 = env7;
      vertices2 = env8;
      normal1Worldy = env9;
      R = env10;
      break;
    case 13:
      t13 = env0;
      xf1 = env1;
      edge1 = env2;
      xf2 = env3;
      normal1Worldx = env4;
      R1 = env5;
      vertices1 = env6;
      count2 = env7;
      vertices2 = env8;
      normal1Worldy = env9;
      R = env10;
      break;
    case 14:
      xf1 = env0;
      edge1 = env1;
      xf2 = env2;
      normal1Worldx = env3;
      R1 = env4;
      vertices1 = env5;
      count2 = env6;
      vertices2 = env7;
      t13 = env8;
      R = env9;
      t19 = env10;
      normal1Worldy = env11;
      break;
    case 15:
      xf1 = env0;
      edge1 = env1;
      xf2 = env2;
      normal1Worldx = env3;
      R1 = env4;
      vertices1 = env5;
      count2 = env6;
      vertices2 = env7;
      R = env8;
      normal1x = env9;
      t13 = env10;
      normal1Worldy = env11;
      break;
    case 16:
      xf1 = env0;
      edge1 = env1;
      xf2 = env2;
      normal1Worldx = env3;
      R1 = env4;
      vertices1 = env5;
      count2 = env6;
      vertices2 = env7;
      R = env8;
      normal1x = env9;
      t13 = env10;
      t22 = env11;
      normal1Worldy = env12;
      break;
    case 17:
      xf1 = env0;
      edge1 = env1;
      xf2 = env2;
      normal1Worldx = env3;
      minDot = env4;
      R1 = env5;
      count2 = env6;
      i = env7;
      vertices2 = env8;
      R = env9;
      vertices1 = env10;
      index = env11;
      normal1x = env12;
      normal1Worldy = env13;
      normal1y = env14;
      a = env15;
      t1 = env16;
      break;
    case 18:
      t1 = env0;
      t3 = env1;
      edge1 = env2;
      xf1 = env3;
      xf2 = env4;
      normal1Worldx = env5;
      minDot = env6;
      R1 = env7;
      count2 = env8;
      i = env9;
      vertices2 = env10;
      R = env11;
      vertices1 = env12;
      index = env13;
      normal1x = env14;
      normal1Worldy = env15;
      normal1y = env16;
      break;
    case 19:
      xf1 = env0;
      edge1 = env1;
      xf2 = env2;
      dot = env3;
      normal1Worldx = env4;
      minDot = env5;
      R1 = env6;
      count2 = env7;
      i = env8;
      vertices2 = env9;
      R = env10;
      vertices1 = env11;
      index = env12;
      normal1x = env13;
      normal1Worldy = env14;
      normal1y = env15;
      break;
    case 20:
      index = env0;
      xf1 = env1;
      xf2 = env2;
      normal1Worldx = env3;
      R1 = env4;
      v3 = env5;
      vertices2 = env6;
      normal1Worldy = env7;
      R = env8;
      t1 = env9;
      break;
    case 21:
      index = env0;
      xf1 = env1;
      xf2 = env2;
      normal1Worldx = env3;
      R1 = env4;
      v3 = env5;
      vertices2 = env6;
      normal1Worldy = env7;
      R = env8;
      t3 = env9;
      t1 = env10;
      break;
    case 22:
      xf1 = env0;
      xf2 = env1;
      normal1Worldx = env2;
      R1 = env3;
      vertices2 = env4;
      R = env5;
      index = env6;
      v3 = env7;
      normal1Worldy = env8;
      t1 = env9;
      t3 = env10;
      t5 = env11;
      break;
    case 23:
      index = env0;
      xf1 = env1;
      t1 = env2;
      xf2 = env3;
      t7 = env4;
      normal1Worldx = env5;
      R1 = env6;
      v3 = env7;
      vertices2 = env8;
      normal1Worldy = env9;
      R = env10;
      break;
    case 24:
      xf1 = env0;
      t1 = env1;
      xf2 = env2;
      t7 = env3;
      t9 = env4;
      normal1Worldx = env5;
      R1 = env6;
      vertices2 = env7;
      R = env8;
      index = env9;
      v3 = env10;
      normal1Worldy = env11;
      break;
    case 25:
      index = env0;
      xf2 = env1;
      normal1Worldx = env2;
      R1 = env3;
      v3 = env4;
      v1y = env5;
      vertices2 = env6;
      t1 = env7;
      R = env8;
      normal1Worldy = env9;
      break;
    case 26:
      index = env0;
      normal1Worldy = env1;
      xf2 = env2;
      normal1Worldx = env3;
      R1 = env4;
      v3 = env5;
      v1y = env6;
      vertices2 = env7;
      t1 = env8;
      R = env9;
      t12 = env10;
      break;
    case 27:
      xf2 = env0;
      normal1Worldx = env1;
      R1 = env2;
      v1y = env3;
      vertices2 = env4;
      t1 = env5;
      R = env6;
      t12 = env7;
      t14 = env8;
      index = env9;
      v3 = env10;
      normal1Worldy = env11;
      break;
    case 28:
      index = env0;
      t1 = env1;
      xf2 = env2;
      t16 = env3;
      normal1Worldx = env4;
      R1 = env5;
      v1y = env6;
      normal1Worldy = env7;
      vertices2 = env8;
      v3 = env9;
      break;
    case 29:
      index = env0;
      t1 = env1;
      xf2 = env2;
      t16 = env3;
      t18 = env4;
      normal1Worldx = env5;
      R1 = env6;
      v1y = env7;
      normal1Worldy = env8;
      vertices2 = env9;
      break;
    case 30:
      xf2 = env0;
      normal1Worldx = env1;
      R1 = env2;
      v1y = env3;
      v1x = env4;
      normal1Worldy = env5;
      v4 = env6;
      t1 = env7;
      break;
    case 31:
      t21 = env0;
      xf2 = env1;
      normal1Worldx = env2;
      R1 = env3;
      v1y = env4;
      v1x = env5;
      normal1Worldy = env6;
      v4 = env7;
      t1 = env8;
      break;
    case 32:
      t21 = env0;
      t23 = env1;
      xf2 = env2;
      normal1Worldx = env3;
      R1 = env4;
      v1y = env5;
      v1x = env6;
      normal1Worldy = env7;
      v4 = env8;
      t1 = env9;
      break;
    case 33:
      xf2 = env0;
      t1 = env1;
      normal1Worldx = env2;
      R1 = env3;
      t25 = env4;
      v1y = env5;
      normal1Worldy = env6;
      v1x = env7;
      v4 = env8;
      break;
    case 34:
      xf2 = env0;
      t1 = env1;
      normal1Worldx = env2;
      R1 = env3;
      t27 = env4;
      t25 = env5;
      v1y = env6;
      normal1Worldy = env7;
      v1x = env8;
      v4 = env9;
      break;
    case 35:
      t29 = env0;
      normal1Worldx = env1;
      R1 = env2;
      v1x = env3;
      normal1Worldy = env4;
      v4 = env5;
      v2y = env6;
      break;
    case 36:
      t29 = env0;
      t31 = env1;
      normal1Worldx = env2;
      R1 = env3;
      v1x = env4;
      normal1Worldy = env5;
      v4 = env6;
      v2y = env7;
      break;
    case 37:
      t29 = env0;
      t31 = env1;
      t33 = env2;
      normal1Worldx = env3;
      R1 = env4;
      v1x = env5;
      normal1Worldy = env6;
      v4 = env7;
      v2y = env8;
      break;
    case 38:
      normal1Worldx = env0;
      t29 = env1;
      t35 = env2;
      v1x = env3;
      normal1Worldy = env4;
      v4 = env5;
      v2y = env6;
      break;
    case 39:
      normal1Worldx = env0;
      t29 = env1;
      t35 = env2;
      v1x = env3;
      normal1Worldy = env4;
      t37 = env5;
      v2y = env6;
      break;
  }
  switch (state) {
    case 0:
      poly1.get$vertexCount();
      var vertices1 = poly1.get$vertices();
    case 1:
      state = 0;
      var normals1 = poly1.get$normals();
    case 2:
      state = 0;
      var count2 = poly2.get$vertexCount();
    case 3:
      state = 0;
      var vertices2 = poly2.get$vertices();
    case 4:
      state = 0;
      var R = xf1.get$rotation();
      var v = $.index(normals1, edge1);
      var t5 = R.get$col1().get$y();
    case 5:
      state = 0;
      var t7 = v.get$x();
    case 6:
      state = 0;
      t7 = $.mul(t5, t7);
      t5 = R.get$col2().get$y();
    case 7:
      state = 0;
      var t10 = v.get$y();
    case 8:
      state = 0;
      var normal1Worldy = $.add(t7, $.mul(t5, t10));
      t7 = R.get$col1().get$x();
    case 9:
      state = 0;
      var t13 = v.get$x();
    case 10:
      state = 0;
      t13 = $.mul(t7, t13);
      t7 = R.get$col2().get$x();
    case 11:
      state = 0;
      var t16 = v.get$y();
    case 12:
      state = 0;
      var normal1Worldx = $.add(t13, $.mul(t7, t16));
      var R1 = xf2.get$rotation();
      t13 = R1.get$col1().get$x();
    case 13:
      state = 0;
      t13 = $.mul(normal1Worldx, t13);
      var t19 = R1.get$col1().get$y();
    case 14:
      state = 0;
      var normal1x = $.add(t13, $.mul(normal1Worldy, t19));
      t13 = R1.get$col2().get$x();
    case 15:
      state = 0;
      t13 = $.mul(normal1Worldx, t13);
      var t22 = R1.get$col2().get$y();
    case 16:
      state = 0;
      var normal1y = $.add(t13, $.mul(normal1Worldy, t22));
      var minDot = 99999999999999.0;
      var i = 0;
      var index = 0;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!$.ltB(i, count2))
                break L0;
              var a = $.index(vertices2, i);
              var t1 = a.get$x();
            case 17:
              state = 0;
              t1 = $.mul(t1, normal1x);
              var t3 = a.get$y();
            case 18:
              state = 0;
              var dot = $.add(t1, $.mul(t3, normal1y));
            case 19:
              state = 0;
              if ($.ltB(dot, minDot)) {
                index = i;
                minDot = dot;
              }
              ++i;
          }
      var v3 = $.index(vertices1, edge1);
      t1 = xf1.get$position().get$y();
    case 20:
      state = 0;
      t3 = R.get$col1().get$y();
    case 21:
      state = 0;
      t5 = v3.get$x();
    case 22:
      state = 0;
      t1 = $.add(t1, $.mul(t3, t5));
      t7 = R.get$col2().get$y();
    case 23:
      state = 0;
      var t9 = v3.get$y();
    case 24:
      state = 0;
      var v1y = $.add(t1, $.mul(t7, t9));
      t1 = xf1.get$position().get$x();
    case 25:
      state = 0;
      var t12 = R.get$col1().get$x();
    case 26:
      state = 0;
      var t14 = v3.get$x();
    case 27:
      state = 0;
      t1 = $.add(t1, $.mul(t12, t14));
      t16 = R.get$col2().get$x();
    case 28:
      state = 0;
      var t18 = v3.get$y();
    case 29:
      state = 0;
      var v1x = $.add(t1, $.mul(t16, t18));
      var v4 = $.index(vertices2, index);
      t1 = xf2.get$position().get$y();
    case 30:
      state = 0;
      var t21 = R1.get$col1().get$y();
    case 31:
      state = 0;
      var t23 = v4.get$x();
    case 32:
      state = 0;
      t1 = $.add(t1, $.mul(t21, t23));
      var t25 = R1.get$col2().get$y();
    case 33:
      state = 0;
      var t27 = v4.get$y();
    case 34:
      state = 0;
      var v2y = $.sub($.add(t1, $.mul(t25, t27)), v1y);
      var t29 = xf2.get$position().get$x();
    case 35:
      state = 0;
      var t31 = R1.get$col1().get$x();
    case 36:
      state = 0;
      var t33 = v4.get$x();
    case 37:
      state = 0;
      t29 = $.add(t29, $.mul(t31, t33));
      var t35 = R1.get$col2().get$x();
    case 38:
      state = 0;
      var t37 = v4.get$y();
    case 39:
      state = 0;
      return $.add($.mul($.sub($.add(t29, $.mul(t35, t37)), v1x), normal1Worldx), $.mul(v2y, normal1Worldy));
  }
},
 findMaxSeparation$5: function(results, poly1, xf1, poly2, xf2) {
  var count1 = poly1.get$vertexCount();
  if (count1 !== (count1 | 0))
    return this.findMaxSeparation$5$bailout(1, results, poly1, xf1, poly2, xf2, count1, 0, 0, 0, 0, 0);
  var normals1 = poly1.get$normals();
  if (typeof normals1 !== 'string' && (typeof normals1 !== 'object' || normals1 === null || normals1.constructor !== Array && !normals1.is$JavaScriptIndexingBehavior()))
    return this.findMaxSeparation$5$bailout(2, results, poly1, xf1, poly2, xf2, count1, normals1, 0, 0, 0, 0);
  var v = poly2.get$centroid();
  var predy = $.add($.add(xf2.get$position().get$y(), $.mul(xf2.get$rotation().get$col1().get$y(), v.get$x())), $.mul(xf2.get$rotation().get$col2().get$y(), v.get$y()));
  var predx = $.add($.add(xf2.get$position().get$x(), $.mul(xf2.get$rotation().get$col1().get$x(), v.get$x())), $.mul(xf2.get$rotation().get$col2().get$x(), v.get$y()));
  var v1 = poly1.get$centroid();
  var tempy = $.add($.add(xf1.get$position().get$y(), $.mul(xf1.get$rotation().get$col1().get$y(), v1.get$x())), $.mul(xf1.get$rotation().get$col2().get$y(), v1.get$y()));
  var dx = $.sub(predx, $.add($.add(xf1.get$position().get$x(), $.mul(xf1.get$rotation().get$col1().get$x(), v1.get$x())), $.mul(xf1.get$rotation().get$col2().get$x(), v1.get$y())));
  var dy = $.sub(predy, tempy);
  var R = xf1.get$rotation();
  var dLocal1x = $.add($.mul(dx, R.get$col1().get$x()), $.mul(dy, R.get$col1().get$y()));
  if (typeof dLocal1x !== 'number')
    return this.findMaxSeparation$5$bailout(3, results, dLocal1x, poly1, xf1, poly2, xf2, dy, count1, normals1, dx, R);
  var dLocal1y = $.add($.mul(dx, R.get$col2().get$x()), $.mul(dy, R.get$col2().get$y()));
  if (typeof dLocal1y !== 'number')
    return this.findMaxSeparation$5$bailout(4, results, dLocal1x, poly1, xf1, poly2, xf2, count1, normals1, dLocal1y, 0, 0);
  for (var edge = 0, i = 0, maxDot = 1e-12, dot = null; i < count1; ++i) {
    if (i < 0 || i >= normals1.length)
      throw $.ioore(i);
    var norm = normals1[i];
    dot = $.add($.mul(norm.get$x(), dLocal1x), $.mul(norm.get$y(), dLocal1y));
    if ($.gtB(dot, maxDot)) {
      edge = i;
      maxDot = dot;
    }
  }
  var s = this.edgeSeparation$5(poly1, xf1, edge, poly2, xf2);
  if (typeof s !== 'number')
    return this.findMaxSeparation$5$bailout(5, results, poly1, xf1, poly2, xf2, count1, s, edge, 0, 0, 0);
  var prevEdge = edge - 1;
  prevEdge = prevEdge >= 0 ? prevEdge : count1 - 1;
  var sPrev = this.edgeSeparation$5(poly1, xf1, prevEdge, poly2, xf2);
  var nextEdge = edge + 1;
  nextEdge = nextEdge < count1 ? nextEdge : 0;
  var sNext = this.edgeSeparation$5(poly1, xf1, nextEdge, poly2, xf2);
  if ($.gtB(sPrev, s) && $.gtB(sPrev, sNext)) {
    var bestSeparation = sPrev;
    var bestEdge = prevEdge;
    var increment = -1;
  } else {
    if ($.gtB(sNext, s))
      ;
    else {
      results.set$edgeIndex(edge);
      results.set$separation(s);
      return;
    }
    bestSeparation = sNext;
    bestEdge = nextEdge;
    increment = 1;
  }
  if (typeof bestSeparation !== 'number')
    return this.findMaxSeparation$5$bailout(6, results, poly1, xf1, poly2, xf2, count1, bestEdge, bestSeparation, increment, s, edge);
  for (var t1 = increment === -1, edge0 = count1 - 1; true;) {
    if (t1) {
      edge = bestEdge - 1;
      edge = edge >= 0 ? edge : edge0;
    } else {
      edge = bestEdge + 1;
      edge = edge < count1 ? edge : 0;
    }
    s = this.edgeSeparation$5(poly1, xf1, edge, poly2, xf2);
    if ($.gtB(s, bestSeparation))
      ;
    else
      break;
    bestSeparation = s;
    bestEdge = edge;
  }
  results.set$edgeIndex(bestEdge);
  results.set$separation(bestSeparation);
},
 findMaxSeparation$5$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10) {
  switch (state) {
    case 1:
      var results = env0;
      var poly1 = env1;
      var xf1 = env2;
      var poly2 = env3;
      var xf2 = env4;
      count1 = env5;
      break;
    case 2:
      results = env0;
      poly1 = env1;
      xf1 = env2;
      poly2 = env3;
      xf2 = env4;
      count1 = env5;
      normals1 = env6;
      break;
    case 3:
      results = env0;
      dLocal1x = env1;
      poly1 = env2;
      xf1 = env3;
      poly2 = env4;
      xf2 = env5;
      dy = env6;
      count1 = env7;
      normals1 = env8;
      dx = env9;
      R = env10;
      break;
    case 4:
      results = env0;
      dLocal1x = env1;
      poly1 = env2;
      xf1 = env3;
      poly2 = env4;
      xf2 = env5;
      count1 = env6;
      normals1 = env7;
      dLocal1y = env8;
      break;
    case 5:
      results = env0;
      poly1 = env1;
      xf1 = env2;
      poly2 = env3;
      xf2 = env4;
      count1 = env5;
      s = env6;
      edge = env7;
      break;
    case 6:
      results = env0;
      poly1 = env1;
      xf1 = env2;
      poly2 = env3;
      xf2 = env4;
      count1 = env5;
      bestEdge = env6;
      bestSeparation = env7;
      increment = env8;
      s = env9;
      edge = env10;
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
      for (var edge = 0, i = 0, maxDot = 1e-12, dot = null; $.ltB(i, count1); ++i) {
        var norm = $.index(normals1, i);
        dot = $.add($.mul(norm.get$x(), dLocal1x), $.mul(norm.get$y(), dLocal1y));
        if ($.gtB(dot, maxDot)) {
          edge = i;
          maxDot = dot;
        }
      }
      var s = this.edgeSeparation$5(poly1, xf1, edge, poly2, xf2);
    case 5:
      state = 0;
      var prevEdge = edge - 1;
      prevEdge = prevEdge >= 0 ? prevEdge : $.sub(count1, 1);
      var sPrev = this.edgeSeparation$5(poly1, xf1, prevEdge, poly2, xf2);
      var nextEdge = edge + 1;
      nextEdge = $.ltB(nextEdge, count1) ? nextEdge : 0;
      var sNext = this.edgeSeparation$5(poly1, xf1, nextEdge, poly2, xf2);
      if ($.gtB(sPrev, s) && $.gtB(sPrev, sNext)) {
        var bestSeparation = sPrev;
        var bestEdge = prevEdge;
        var increment = -1;
      } else {
        if ($.gtB(sNext, s))
          ;
        else {
          results.set$edgeIndex(edge);
          results.set$separation(s);
          return;
        }
        bestSeparation = sNext;
        bestEdge = nextEdge;
        increment = 1;
      }
    case 6:
      state = 0;
      for (var t1 = increment === -1; true;) {
        if (t1)
          edge = $.geB($.sub(bestEdge, 1), 0) ? $.sub(bestEdge, 1) : $.sub(count1, 1);
        else
          edge = $.ltB($.add(bestEdge, 1), count1) ? $.add(bestEdge, 1) : 0;
        s = this.edgeSeparation$5(poly1, xf1, edge, poly2, xf2);
        if ($.gtB(s, bestSeparation))
          ;
        else
          break;
        bestSeparation = s;
        bestEdge = edge;
      }
      results.set$edgeIndex(bestEdge);
      results.set$separation(bestSeparation);
  }
},
 findIncidentEdge$6: function(c, poly1, xf1, edge1, poly2, xf2) {
  poly1.get$vertexCount();
  var normals1 = poly1.get$normals();
  var count2 = poly2.get$vertexCount();
  if (typeof count2 !== 'number')
    return this.findIncidentEdge$6$bailout(1, c, xf1, edge1, poly2, xf2, normals1, count2, 0);
  var vertices2 = poly2.get$vertices();
  var normals2 = poly2.get$normals();
  if (typeof normals2 !== 'string' && (typeof normals2 !== 'object' || normals2 === null || normals2.constructor !== Array && !normals2.is$JavaScriptIndexingBehavior()))
    return this.findIncidentEdge$6$bailout(2, c, xf1, edge1, xf2, normals1, count2, vertices2, normals2);
  var t3 = xf1.get$rotation();
  var t4 = $.index(normals1, edge1);
  var t5 = this.normal1;
  $.Matrix22_mulMatrixAndVectorToOut(t3, t4, t5);
  $.Matrix22_mulTransMatrixAndVectorToOut(xf2.get$rotation(), t5, t5);
  for (var minDot = 99999999999999.0, i = 0, index = 0; i < count2; ++i) {
    if (i < 0 || i >= normals2.length)
      throw $.ioore(i);
    var t1 = normals2[i];
    var dot = $.add($.mul(t5.x, t1.get$x()), $.mul(t5.y, t1.get$y()));
    if ($.ltB(dot, minDot)) {
      index = i;
      minDot = dot;
    }
  }
  var i2 = index + 1;
  i2 = i2 < count2 ? i2 : 0;
  $.Transform_mulToOut(xf2, $.index(vertices2, index), $.index(c, 0).get$v());
  $.index(c, 0).get$id().get$features().set$referenceEdge(edge1);
  $.index(c, 0).get$id().get$features().set$incidentEdge(index);
  $.index(c, 0).get$id().get$features().set$incidentVertex(0);
  $.Transform_mulToOut(xf2, $.index(vertices2, i2), $.index(c, 1).get$v());
  $.index(c, 1).get$id().get$features().set$referenceEdge(edge1);
  $.index(c, 1).get$id().get$features().set$incidentEdge(i2);
  $.index(c, 1).get$id().get$features().set$incidentVertex(1);
},
 findIncidentEdge$6$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7) {
  switch (state) {
    case 1:
      var c = env0;
      var xf1 = env1;
      var edge1 = env2;
      var poly2 = env3;
      var xf2 = env4;
      normals1 = env5;
      count2 = env6;
      break;
    case 2:
      c = env0;
      xf1 = env1;
      edge1 = env2;
      xf2 = env3;
      normals1 = env4;
      count2 = env5;
      vertices2 = env6;
      normals2 = env7;
      break;
  }
  switch (state) {
    case 0:
      poly1.get$vertexCount();
      var normals1 = poly1.get$normals();
      var count2 = poly2.get$vertexCount();
    case 1:
      state = 0;
      var vertices2 = poly2.get$vertices();
      var normals2 = poly2.get$normals();
    case 2:
      state = 0;
      var t3 = xf1.get$rotation();
      var t4 = $.index(normals1, edge1);
      var t5 = this.normal1;
      $.Matrix22_mulMatrixAndVectorToOut(t3, t4, t5);
      $.Matrix22_mulTransMatrixAndVectorToOut(xf2.get$rotation(), t5, t5);
      for (var minDot = 99999999999999.0, i = 0, index = 0; $.ltB(i, count2); ++i) {
        var t1 = $.index(normals2, i);
        var dot = $.add($.mul(t5.get$x(), t1.get$x()), $.mul(t5.get$y(), t1.get$y()));
        if ($.ltB(dot, minDot)) {
          index = i;
          minDot = dot;
        }
      }
      var i2 = index + 1;
      i2 = $.ltB(i2, count2) ? i2 : 0;
      $.Transform_mulToOut(xf2, $.index(vertices2, index), $.index(c, 0).get$v());
      $.index(c, 0).get$id().get$features().set$referenceEdge(edge1);
      $.index(c, 0).get$id().get$features().set$incidentEdge(index);
      $.index(c, 0).get$id().get$features().set$incidentVertex(0);
      $.Transform_mulToOut(xf2, $.index(vertices2, i2), $.index(c, 1).get$v());
      $.index(c, 1).get$id().get$features().set$referenceEdge(edge1);
      $.index(c, 1).get$id().get$features().set$incidentEdge(i2);
      $.index(c, 1).get$id().get$features().set$incidentVertex(1);
  }
},
 collidePolygons$5: function(manifold, polyA, xfA, polyB, xfB) {
  manifold.set$pointCount(0);
  var totalRadius = $.add(polyA.get$radius(), polyB.get$radius());
  if (typeof totalRadius !== 'number')
    return this.collidePolygons$5$bailout(1, manifold, polyA, xfA, polyB, xfB, totalRadius, 0, 0, 0, 0, 0, 0);
  var t2 = this.results1;
  this.findMaxSeparation$5(t2, polyA, xfA, polyB, xfB);
  if ($.gtB(t2.separation, totalRadius))
    return;
  var t1 = this.results2;
  this.findMaxSeparation$5(t1, polyB, xfB, polyA, xfA);
  if ($.gtB(t1.separation, totalRadius))
    return;
  var t3 = t1.separation;
  var t4 = t2.separation;
  if (typeof t4 !== 'number')
    throw $.iae(t4);
  if ($.gtB(t3, 0.98 * t4 + 0.001)) {
    var edge1 = t1.edgeIndex;
    manifold.set$type(2);
    var poly2 = polyA;
    var xf2 = xfA;
    var xf1 = xfB;
    var poly1 = polyB;
    var flip = 1;
  } else {
    edge1 = t2.edgeIndex;
    manifold.set$type(1);
    poly2 = polyB;
    xf2 = xfB;
    xf1 = xfA;
    poly1 = polyA;
    flip = 0;
  }
  t1 = this.incidentEdge;
  this.findIncidentEdge$6(t1, poly1, xf1, edge1, poly2, xf2);
  var count1 = poly1.get$vertexCount();
  var vertices1 = poly1.get$vertices();
  t2 = this.v11;
  t2.setFrom$1($.index(vertices1, edge1));
  var two = this.v12;
  two.setFrom$1($.ltB($.add(edge1, 1), count1) ? $.index(vertices1, $.add(edge1, 1)) : $.index(vertices1, 0));
  t3 = this.localTangent;
  t3.setFrom$1(two).subLocal$1(t2);
  t3.normalize$0();
  t4 = this.localNormal;
  $.Vector_crossVectorAndNumToOut(t3, 1, t4);
  var t5 = this.planePoint;
  t5.setFrom$1(t2).addLocal$1(two).mulLocal$1(0.5);
  var t6 = xf1.get$rotation();
  var one = this.tangent;
  $.Matrix22_mulMatrixAndVectorToOut(t6, t3, one);
  var one0 = this.normal;
  $.Vector_crossVectorAndNumToOut(one, 1, one0);
  $.Transform_mulToOut(xf1, t2, t2);
  $.Transform_mulToOut(xf1, two, two);
  var frontOffset = $.add($.mul(one0.x, t2.x), $.mul(one0.y, t2.y));
  if (typeof frontOffset !== 'number')
    return this.collidePolygons$5$bailout(2, xf2, manifold, t5, one, one0, frontOffset, totalRadius, t1, t2, two, flip, t4);
  var sideOffset1 = $.add($.neg($.add($.mul(one.x, t2.x), $.mul(one.y, t2.y))), totalRadius);
  var sideOffset2 = $.add($.add($.mul(one.x, two.x), $.mul(one.y, two.y)), totalRadius);
  one.negateLocal$0();
  t6 = this.clipPoints1;
  var np = $.Collision_clipSegmentToLine(t6, t1, one, sideOffset1);
  one.negateLocal$0();
  if (np < 2)
    return;
  t1 = this.clipPoints2;
  if ($.Collision_clipSegmentToLine(t1, t6, one, sideOffset2) < 2)
    return;
  manifold.get$localNormal().setFrom$1(t4);
  manifold.get$localPoint().setFrom$1(t5);
  for (var pointCount = 0, i = 0; i < 2; ++i) {
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    two = t1[i].get$v();
    if ($.leB($.sub($.add($.mul(one0.x, two.get$x()), $.mul(one0.y, two.get$y())), frontOffset), totalRadius)) {
      var cp = $.index(manifold.get$points(), pointCount);
      if (i < 0 || i >= t1.length)
        throw $.ioore(i);
      $.Transform_mulTransToOut(xf2, t1[i].get$v(), cp.get$localPoint());
      t2 = cp.get$id();
      if (i < 0 || i >= t1.length)
        throw $.ioore(i);
      t2.setFrom$1(t1[i].get$id());
      cp.get$id().get$features().set$flip(flip);
      ++pointCount;
    }
    one = one0;
  }
  manifold.set$pointCount(pointCount);
},
 collidePolygons$5$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11) {
  switch (state) {
    case 1:
      var manifold = env0;
      var polyA = env1;
      var xfA = env2;
      var polyB = env3;
      var xfB = env4;
      totalRadius = env5;
      break;
    case 2:
      xf2 = env0;
      manifold = env1;
      t5 = env2;
      one = env3;
      one0 = env4;
      frontOffset = env5;
      totalRadius = env6;
      t1 = env7;
      t2 = env8;
      two = env9;
      flip = env10;
      t4 = env11;
      break;
  }
  switch (state) {
    case 0:
      manifold.set$pointCount(0);
      var totalRadius = $.add(polyA.get$radius(), polyB.get$radius());
    case 1:
      state = 0;
      var t2 = this.results1;
      this.findMaxSeparation$5(t2, polyA, xfA, polyB, xfB);
      if ($.gtB(t2.get$separation(), totalRadius))
        return;
      var t1 = this.results2;
      this.findMaxSeparation$5(t1, polyB, xfB, polyA, xfA);
      if ($.gtB(t1.get$separation(), totalRadius))
        return;
      var t3 = t1.get$separation();
      var t4 = t2.get$separation();
      if (typeof t4 !== 'number')
        throw $.iae(t4);
      if ($.gtB(t3, 0.98 * t4 + 0.001)) {
        var edge1 = t1.get$edgeIndex();
        manifold.set$type(2);
        var poly2 = polyA;
        var xf2 = xfA;
        var xf1 = xfB;
        var poly1 = polyB;
        var flip = 1;
      } else {
        edge1 = t2.get$edgeIndex();
        manifold.set$type(1);
        poly2 = polyB;
        xf2 = xfB;
        xf1 = xfA;
        poly1 = polyA;
        flip = 0;
      }
      t1 = this.incidentEdge;
      this.findIncidentEdge$6(t1, poly1, xf1, edge1, poly2, xf2);
      var count1 = poly1.get$vertexCount();
      var vertices1 = poly1.get$vertices();
      t2 = this.v11;
      t2.setFrom$1($.index(vertices1, edge1));
      var two = this.v12;
      two.setFrom$1($.ltB($.add(edge1, 1), count1) ? $.index(vertices1, $.add(edge1, 1)) : $.index(vertices1, 0));
      t3 = this.localTangent;
      t3.setFrom$1(two).subLocal$1(t2);
      t3.normalize$0();
      t4 = this.localNormal;
      $.Vector_crossVectorAndNumToOut(t3, 1, t4);
      var t5 = this.planePoint;
      t5.setFrom$1(t2).addLocal$1(two).mulLocal$1(0.5);
      var t6 = xf1.get$rotation();
      var one = this.tangent;
      $.Matrix22_mulMatrixAndVectorToOut(t6, t3, one);
      var one0 = this.normal;
      $.Vector_crossVectorAndNumToOut(one, 1, one0);
      $.Transform_mulToOut(xf1, t2, t2);
      $.Transform_mulToOut(xf1, two, two);
      var frontOffset = $.add($.mul(one0.get$x(), t2.get$x()), $.mul(one0.get$y(), t2.get$y()));
    case 2:
      state = 0;
      var sideOffset1 = $.add($.neg($.add($.mul(one.get$x(), t2.get$x()), $.mul(one.get$y(), t2.get$y()))), totalRadius);
      var sideOffset2 = $.add($.add($.mul(one.get$x(), two.get$x()), $.mul(one.get$y(), two.get$y())), totalRadius);
      one.negateLocal$0();
      t6 = this.clipPoints1;
      var np = $.Collision_clipSegmentToLine(t6, t1, one, sideOffset1);
      one.negateLocal$0();
      if (np < 2)
        return;
      t1 = this.clipPoints2;
      if ($.Collision_clipSegmentToLine(t1, t6, one, sideOffset2) < 2)
        return;
      manifold.get$localNormal().setFrom$1(t4);
      manifold.get$localPoint().setFrom$1(t5);
      for (var pointCount = 0, i = 0; i < 2; ++i) {
        if (i < 0 || i >= t1.length)
          throw $.ioore(i);
        two = t1[i].get$v();
        if ($.leB($.sub($.add($.mul(one0.get$x(), two.get$x()), $.mul(one0.get$y(), two.get$y())), frontOffset), totalRadius)) {
          var cp = $.index(manifold.get$points(), pointCount);
          if (i < 0 || i >= t1.length)
            throw $.ioore(i);
          $.Transform_mulTransToOut(xf2, t1[i].get$v(), cp.get$localPoint());
          t2 = cp.get$id();
          if (i < 0 || i >= t1.length)
            throw $.ioore(i);
          t2.setFrom$1(t1[i].get$id());
          cp.get$id().get$features().set$flip(flip);
          ++pointCount;
        }
        one = one0;
      }
      manifold.set$pointCount(pointCount);
  }
},
 Collision$_construct$1: function(pool) {
  var t1 = this.incidentEdge;
  $.indexSet(t1, 0, $.ClipVertex$());
  $.indexSet(t1, 1, $.ClipVertex$());
  t1 = this.clipPoints1;
  var t2 = $.ClipVertex$();
  if (0 < 0 || 0 >= t1.length)
    throw $.ioore(0);
  t1[0] = t2;
  t2 = $.ClipVertex$();
  if (1 < 0 || 1 >= t1.length)
    throw $.ioore(1);
  t1[1] = t2;
  t2 = this.clipPoints2;
  t1 = $.ClipVertex$();
  if (0 < 0 || 0 >= t2.length)
    throw $.ioore(0);
  t2[0] = t1;
  t1 = $.ClipVertex$();
  if (1 < 0 || 1 >= t2.length)
    throw $.ioore(1);
  t2[1] = t1;
}
};

$$.ClipVertex = {"":
 ["v?", "id?"],
 "super": "Object",
 setFrom$1: function(cv) {
  this.v.setFrom$1(cv.get$v());
  this.id.setFrom$1(cv.get$id());
}
};

$$.EdgeResults = {"":
 ["separation=", "edgeIndex="],
 "super": "Object"
};

$$.ContactID = {"":
 ["features?"],
 "super": "Object",
 operator$eq$1: function(other) {
  return $.eq(other.get$features(), this.features);
},
 setFrom$1: function(other) {
  this.features.setFrom$1(other.get$features());
},
 isEqual$1: function(other) {
  return $.eq(other.get$features(), this.features);
},
 zero$0: function() {
  this.features.zero$0();
}
};

$$.Distance = {"":
 ["calls", "iters", "maxIters", "simplex", "saveA", "saveB", "closestPoint", "searchDirection", "temp", "normal?"],
 "super": "Object",
 distance$3: function(output, cache, input) {
  this.calls = $.add(this.calls, 1);
  var proxyA = input.get$proxyA();
  var proxyB = input.get$proxyB();
  var transformA = input.get$transformA();
  var transformB = input.get$transformB();
  var t1 = this.simplex;
  t1.readCache$5(cache, proxyA, transformA, proxyB, transformB);
  var vertices = t1.get$vertices();
  var t2 = this.closestPoint;
  t1.getClosestPoint$1(t2);
  var distanceSqr1 = t2.get$lengthSquared();
  for (var t3 = this.saveA, t4 = this.saveB, t5 = this.searchDirection, t6 = this.temp, distanceSqr2 = distanceSqr1, iter = 0, saveCount = 0; $.ltB(iter, this.maxIters);) {
    saveCount = t1.get$count();
    for (var i = 0; $.ltB(i, saveCount); ++i) {
      $.indexSet(t3, i, $.index(vertices, i).get$indexA());
      $.indexSet(t4, i, $.index(vertices, i).get$indexB());
    }
    switch (t1.get$count()) {
      case 1:
        break;
      case 2:
        t1.solve2$0();
        break;
      case 3:
        t1.solve3$0();
        break;
      default:
    }
    if ($.eqB(t1.get$count(), 3))
      break;
    t1.getClosestPoint$1(t2);
    distanceSqr2 = t2.get$lengthSquared();
    t1.getSearchDirection$1(t5);
    if ($.ltB(t5.get$lengthSquared(), 1.4208639999999999e-14))
      break;
    var vertex = $.index(vertices, t1.get$count());
    $.Matrix22_mulTransMatrixAndVectorToOut(transformA.get$rotation(), t5.negateLocal$0(), t6);
    vertex.set$indexA(proxyA.getSupport$1(t6));
    $.Transform_mulToOut(transformA, $.index(proxyA.get$vertices(), vertex.get$indexA()), vertex.get$wA());
    $.Matrix22_mulTransMatrixAndVectorToOut(transformB.get$rotation(), t5.negateLocal$0(), t6);
    vertex.set$indexB(proxyB.getSupport$1(t6));
    $.Transform_mulToOut(transformB, $.index(proxyB.get$vertices(), vertex.get$indexB()), vertex.get$wB());
    vertex.get$w().setFrom$1(vertex.get$wB()).subLocal$1(vertex.get$wA());
    ++iter;
    this.iters = $.add(this.iters, 1);
    for (i = 0; duplicate = false, $.ltB(i, saveCount); ++i)
      if ($.eqB(vertex.get$indexA(), $.index(t3, i)) && $.eqB(vertex.get$indexB(), $.index(t4, i))) {
        var duplicate = true;
        break;
      }
    if (duplicate)
      break;
    t1.set$count($.add(t1.get$count(), 1));
    distanceSqr1 = distanceSqr2;
  }
  this.maxIters = $.max(this.maxIters, iter);
  t1.getWitnessPoints$2(output.get$pointA(), output.get$pointB());
  output.set$distance($.sqrt($.MathBox_distanceSquared(output.get$pointA(), output.get$pointB())));
  output.set$iterations(iter);
  t1.writeCache$1(cache);
  if (input.get$useRadii() === true) {
    var rA = proxyA.get$radius();
    var rB = proxyB.get$radius();
    if ($.gtB(output.get$distance(), $.add(rA, rB)) && $.gtB(output.get$distance(), 1.192e-7)) {
      output.set$distance($.sub(output.get$distance(), $.add(rA, rB)));
      t1 = this.normal;
      t1.setFrom$1(output.get$pointB()).subLocal$1(output.get$pointA());
      t1.normalize$0();
      t6.setFrom$1(t1).mulLocal$1(rA);
      output.get$pointA().addLocal$1(t6);
      t6.setFrom$1(t1).mulLocal$1(rB);
      output.get$pointB().subLocal$1(t6);
    } else {
      output.get$pointA().addLocal$1(output.get$pointB()).mulLocal$1(0.5);
      output.get$pointB().setFrom$1(output.get$pointA());
      output.set$distance(0.0);
    }
  }
},
 get$distance: function() { return new $.BoundClosure3(this, 'distance$3'); }
};

$$.DistanceInput = {"":
 ["proxyA=", "proxyB=", "transformA=", "transformB=", "useRadii="],
 "super": "Object"
};

$$.DistanceOutput = {"":
 ["pointA?", "pointB?", "distance=", "iterations!"],
 "super": "Object",
 distance$3: function(arg0, arg1, arg2) { return this.distance.call$3(arg0, arg1, arg2); }
};

$$.DistanceProxy = {"":
 ["vertices?", "count=", "radius="],
 "super": "Object",
 setFromShape$1: function(shape) {
  var t1 = shape.get$type();
  if (typeof t1 !== 'number')
    return this.setFromShape$1$bailout(1, shape, t1, 0, 0, 0);
  if (t1 === 0) {
    t1 = this.vertices;
    if (0 >= t1.length)
      throw $.ioore(0);
    t1[0].setFrom$1(shape.get$position());
    this.count = 1;
    this.radius = shape.get$radius();
  } else {
    t1 = shape.get$type();
    if (typeof t1 !== 'number')
      return this.setFromShape$1$bailout(2, shape, t1, 0, 0, 0);
    if (t1 === 1) {
      this.count = shape.get$vertexCount();
      this.radius = shape.get$radius();
      t1 = this.vertices;
      var i = 0;
      while (true) {
        var t2 = this.count;
        if (typeof t2 !== 'number')
          return this.setFromShape$1$bailout(3, shape, i, t1, t2, 0);
        if (!(i < t2))
          break;
        if (i < 0 || i >= t1.length)
          throw $.ioore(i);
        t2 = t1[i];
        var t3 = shape.get$vertices();
        if (typeof t3 !== 'string' && (typeof t3 !== 'object' || t3 === null || t3.constructor !== Array && !t3.is$JavaScriptIndexingBehavior()))
          return this.setFromShape$1$bailout(4, shape, i, t1, t2, t3);
        if (i < 0 || i >= t3.length)
          throw $.ioore(i);
        t2.setFrom$1(t3[i]);
        ++i;
      }
    }
  }
},
 setFromShape$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var shape = env0;
      t1 = env1;
      break;
    case 2:
      shape = env0;
      t1 = env1;
      break;
    case 3:
      shape = env0;
      i = env1;
      t1 = env2;
      t2 = env3;
      break;
    case 4:
      shape = env0;
      i = env1;
      t1 = env2;
      t2 = env3;
      t3 = env4;
      break;
  }
  switch (state) {
    case 0:
      var t1 = shape.get$type();
    case 1:
      state = 0;
    default:
      if (state === 0 && $.eqB(t1, 0)) {
        t1 = this.vertices;
        if (0 < 0 || 0 >= t1.length)
          throw $.ioore(0);
        t1[0].setFrom$1(shape.get$position());
        this.count = 1;
        this.radius = shape.get$radius();
      } else
        switch (state) {
          case 0:
            t1 = shape.get$type();
          case 2:
            state = 0;
          default:
            if (state === 4 || state === 3 || state === 0 && $.eqB(t1, 1))
              switch (state) {
                case 0:
                  this.count = shape.get$vertexCount();
                  this.radius = shape.get$radius();
                  t1 = this.vertices;
                  var i = 0;
                default:
                  L0:
                    while (true)
                      switch (state) {
                        case 0:
                          var t2 = this.count;
                        case 3:
                          state = 0;
                          if (!$.ltB(i, t2))
                            break L0;
                          if (i < 0 || i >= t1.length)
                            throw $.ioore(i);
                          t2 = t1[i];
                          var t3 = shape.get$vertices();
                        case 4:
                          state = 0;
                          t2.setFrom$1($.index(t3, i));
                          ++i;
                      }
              }
        }
  }
},
 getSupport$1: function(direction) {
  var t1 = this.vertices;
  if (0 >= t1.length)
    throw $.ioore(0);
  var one = t1[0];
  var t2 = one.get$x();
  if (typeof t2 !== 'number')
    return this.getSupport$1$bailout(1, direction, t2, one, t1, 0, 0, 0, 0, 0);
  var t4 = direction.get$x();
  if (typeof t4 !== 'number')
    return this.getSupport$1$bailout(2, direction, t2, t4, one, t1, 0, 0, 0, 0);
  t4 = t2 * t4;
  t2 = one.get$y();
  if (typeof t2 !== 'number')
    return this.getSupport$1$bailout(3, direction, t4, t2, one, t1, 0, 0, 0, 0);
  var t7 = direction.get$y();
  if (typeof t7 !== 'number')
    return this.getSupport$1$bailout(4, direction, one, t1, t4, t2, t7, 0, 0, 0);
  var bestValue = t4 + t2 * t7;
  var two = direction;
  var i = 1;
  var bestIndex = 0;
  while (true) {
    t2 = this.count;
    if (typeof t2 !== 'number')
      return this.getSupport$1$bailout(5, direction, i, t1, bestIndex, bestValue, one, t2, two, 0);
    if (!(i < t2))
      break;
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    one = t1[i];
    t2 = one.get$x();
    if (typeof t2 !== 'number')
      return this.getSupport$1$bailout(6, direction, i, one, bestIndex, bestValue, t1, t2, 0, 0);
    t4 = direction.get$x();
    if (typeof t4 !== 'number')
      return this.getSupport$1$bailout(7, direction, i, one, bestIndex, bestValue, t4, t2, t1, 0);
    t4 = t2 * t4;
    t2 = one.get$y();
    if (typeof t2 !== 'number')
      return this.getSupport$1$bailout(8, direction, i, one, bestIndex, bestValue, t1, t4, t2, 0);
    t7 = direction.get$y();
    if (typeof t7 !== 'number')
      return this.getSupport$1$bailout(9, direction, i, one, bestIndex, bestValue, t1, t4, t2, t7);
    var value = t4 + t2 * t7;
    if (value > bestValue) {
      bestValue = value;
      bestIndex = i;
    }
    two = direction;
    ++i;
  }
  return bestIndex;
},
 getSupport$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8) {
  switch (state) {
    case 1:
      var direction = env0;
      t2 = env1;
      one = env2;
      t1 = env3;
      break;
    case 2:
      direction = env0;
      t2 = env1;
      t4 = env2;
      one = env3;
      t1 = env4;
      break;
    case 3:
      direction = env0;
      t4 = env1;
      t2 = env2;
      one = env3;
      t1 = env4;
      break;
    case 4:
      direction = env0;
      one = env1;
      t1 = env2;
      t4 = env3;
      t2 = env4;
      t7 = env5;
      break;
    case 5:
      direction = env0;
      i = env1;
      t1 = env2;
      bestIndex = env3;
      bestValue = env4;
      one = env5;
      t2 = env6;
      two = env7;
      break;
    case 6:
      direction = env0;
      i = env1;
      one = env2;
      bestIndex = env3;
      bestValue = env4;
      t1 = env5;
      t2 = env6;
      break;
    case 7:
      direction = env0;
      i = env1;
      one = env2;
      bestIndex = env3;
      bestValue = env4;
      t4 = env5;
      t2 = env6;
      t1 = env7;
      break;
    case 8:
      direction = env0;
      i = env1;
      one = env2;
      bestIndex = env3;
      bestValue = env4;
      t1 = env5;
      t4 = env6;
      t2 = env7;
      break;
    case 9:
      direction = env0;
      i = env1;
      one = env2;
      bestIndex = env3;
      bestValue = env4;
      t1 = env5;
      t4 = env6;
      t2 = env7;
      t7 = env8;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.vertices;
      if (0 < 0 || 0 >= t1.length)
        throw $.ioore(0);
      var one = t1[0];
      var t2 = one.get$x();
    case 1:
      state = 0;
      var t4 = direction.get$x();
    case 2:
      state = 0;
      t4 = $.mul(t2, t4);
      t2 = one.get$y();
    case 3:
      state = 0;
      var t7 = direction.get$y();
    case 4:
      state = 0;
      var bestValue = $.add(t4, $.mul(t2, t7));
      var two = direction;
      var i = 1;
      var bestIndex = 0;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              t2 = this.count;
            case 5:
              state = 0;
              if (!$.ltB(i, t2))
                break L0;
              if (i < 0 || i >= t1.length)
                throw $.ioore(i);
              one = t1[i];
              t2 = one.get$x();
            case 6:
              state = 0;
              t4 = direction.get$x();
            case 7:
              state = 0;
              t4 = $.mul(t2, t4);
              t2 = one.get$y();
            case 8:
              state = 0;
              t7 = direction.get$y();
            case 9:
              state = 0;
              var value = $.add(t4, $.mul(t2, t7));
              if ($.gtB(value, bestValue)) {
                bestValue = value;
                bestIndex = i;
              }
              two = direction;
              ++i;
          }
      return bestIndex;
  }
},
 DistanceProxy$0: function() {
  for (var t1 = this.vertices, i = 0; i < t1.length; ++i) {
    var t2 = $.Vector$(0, 0);
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i] = t2;
  }
}
};

$$.Features = {"":
 ["referenceEdge=", "incidentEdge=", "incidentVertex=", "flip="],
 "super": "Object",
 setFrom$1: function(f) {
  this.referenceEdge = f.get$referenceEdge();
  this.incidentEdge = f.get$incidentEdge();
  this.incidentVertex = f.get$incidentVertex();
  this.flip = f.get$flip();
},
 operator$eq$1: function(other) {
  return $.eqB(this.referenceEdge, other.get$referenceEdge()) && $.eqB(this.incidentEdge, other.get$incidentEdge()) && $.eqB(this.incidentVertex, other.get$incidentVertex()) && $.eqB(this.flip, other.get$flip());
},
 toString$0: function() {
  return 'Features: (' + $.S(this.flip) + ', ' + $.S(this.incidentEdge) + ', ' + $.S(this.incidentVertex) + ' ' + $.S(this.referenceEdge) + ')';
},
 zero$0: function() {
  this.referenceEdge = 0;
  this.incidentEdge = 0;
  this.incidentVertex = 0;
  this.flip = 0;
}
};

$$.Manifold = {"":
 ["points?", "localNormal?", "localPoint?", "type=", "pointCount="],
 "super": "Object",
 setFrom$1: function(other) {
  var t1 = this.points;
  var i = 0;
  while (true) {
    var t2 = other.get$pointCount();
    if (typeof t2 !== 'number')
      return this.setFrom$1$bailout(1, other, t2, t1, i, 0);
    if (!(i < t2))
      break;
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t2 = t1[i];
    var t3 = other.get$points();
    if (typeof t3 !== 'string' && (typeof t3 !== 'object' || t3 === null || t3.constructor !== Array && !t3.is$JavaScriptIndexingBehavior()))
      return this.setFrom$1$bailout(2, other, t2, t1, t3, i);
    if (i < 0 || i >= t3.length)
      throw $.ioore(i);
    t2.setFrom$1(t3[i]);
    ++i;
  }
  this.type = other.get$type();
  this.localNormal.setFrom$1(other.get$localNormal());
  this.localPoint.setFrom$1(other.get$localPoint());
  this.pointCount = other.get$pointCount();
},
 setFrom$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var other = env0;
      t2 = env1;
      t1 = env2;
      i = env3;
      break;
    case 2:
      other = env0;
      t2 = env1;
      t1 = env2;
      t3 = env3;
      i = env4;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.points;
      var i = 0;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              var t2 = other.get$pointCount();
            case 1:
              state = 0;
              if (!$.ltB(i, t2))
                break L0;
              if (i < 0 || i >= t1.length)
                throw $.ioore(i);
              t2 = t1[i];
              var t3 = other.get$points();
            case 2:
              state = 0;
              t2.setFrom$1($.index(t3, i));
              ++i;
          }
      this.type = other.get$type();
      this.localNormal.setFrom$1(other.get$localNormal());
      this.localPoint.setFrom$1(other.get$localPoint());
      this.pointCount = other.get$pointCount();
  }
},
 Manifold$0: function() {
  for (var t1 = this.points, i = 0; i < 2; ++i) {
    var t2 = $.ManifoldPoint$();
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i] = t2;
  }
}
};

$$.ManifoldPoint = {"":
 ["localPoint?", "normalImpulse=", "tangentImpulse=", "id?"],
 "super": "Object",
 setFrom$1: function(other) {
  this.localPoint.setFrom$1(other.get$localPoint());
  this.normalImpulse = other.get$normalImpulse();
  this.tangentImpulse = other.get$tangentImpulse();
  this.id.setFrom$1(other.get$id());
}
};

$$.Simplex = {"":
 ["v1", "v2", "v3", "vertices?", "count=", "e13", "e23", "e12", "case2", "case22", "case3", "case33"],
 "super": "Object",
 readCache$5: function(cache, proxyA, transformA, proxyB, transformB) {
  this.count = cache.get$count();
  for (var t1 = this.vertices, i = 0; $.ltB(i, this.count); ++i) {
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    var v = t1[i];
    v.set$indexA($.index(cache.get$indexA(), i));
    v.set$indexB($.index(cache.get$indexB(), i));
    var wALocal = $.index(proxyA.get$vertices(), v.get$indexA());
    var wBLocal = $.index(proxyB.get$vertices(), v.get$indexB());
    $.Transform_mulToOut(transformA, wALocal, v.get$wA());
    $.Transform_mulToOut(transformB, wBLocal, v.get$wB());
    v.get$w().setFrom$1(v.get$wB()).subLocal$1(v.get$wA());
    v.set$a(0.0);
  }
  if ($.gtB(this.count, 1)) {
    var metric1 = cache.get$metric();
    var metric2 = this.getMetric$0();
    if (typeof metric1 !== 'number')
      throw $.iae(metric1);
    if ($.ltB(metric2, 0.5 * metric1) || $.ltB(2.0 * metric1, metric2) || $.ltB(metric2, 1.192e-7))
      this.count = 0;
  }
  if ($.eqB(this.count, 0)) {
    if (0 < 0 || 0 >= t1.length)
      throw $.ioore(0);
    v = t1[0];
    v.set$indexA(0);
    v.set$indexB(0);
    wALocal = $.index(proxyA.get$vertices(), 0);
    wBLocal = $.index(proxyB.get$vertices(), 0);
    $.Transform_mulToOut(transformA, wALocal, v.get$wA());
    $.Transform_mulToOut(transformB, wBLocal, v.get$wB());
    v.get$w().setFrom$1(v.get$wB()).subLocal$1(v.get$wA());
    this.count = 1;
  }
},
 writeCache$1: function(cache) {
  cache.set$metric(this.getMetric$0());
  cache.set$count(this.count);
  for (var t1 = this.vertices, i = 0; $.ltB(i, this.count); ++i) {
    var t2 = cache.get$indexA();
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    $.indexSet(t2, i, t1[i].get$indexA());
    t2 = cache.get$indexB();
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    $.indexSet(t2, i, t1[i].get$indexB());
  }
},
 getSearchDirection$1: function(out) {
  switch (this.count) {
    case 1:
      out.setFrom$1(this.v1.get$w()).negateLocal$0();
      return;
    case 2:
      var t1 = this.e12;
      var t2 = t1.setFrom$1(this.v2.get$w());
      var t3 = this.v1;
      t2.subLocal$1(t3.get$w());
      out.setFrom$1(t3.get$w()).negateLocal$0();
      if ($.gtB($.sub($.mul(t1.get$x(), out.get$y()), $.mul(t1.get$y(), out.get$x())), 0)) {
        $.Vector_crossNumAndVectorToOut(1, t1, out);
        return;
      } else {
        $.Vector_crossVectorAndNumToOut(t1, 1, out);
        return;
      }
    default:
      out.setZero$0();
      return;
  }
},
 getClosestPoint$1: function(out) {
  switch (this.count) {
    case 0:
      out.setZero$0();
      return;
    case 1:
      out.setFrom$1(this.v1.get$w());
      return;
    case 2:
      var t1 = this.case22;
      var t2 = this.v2;
      t1.setFrom$1(t2.get$w()).mulLocal$1(t2.get$a());
      var t3 = this.case2;
      var t4 = this.v1;
      t3.setFrom$1(t4.get$w()).mulLocal$1(t4.get$a()).addLocal$1(t1);
      out.setFrom$1(t3);
      return;
    case 3:
      out.setZero$0();
      return;
    default:
      out.setZero$0();
      return;
  }
},
 getWitnessPoints$2: function(pA, pB) {
  switch (this.count) {
    case 0:
      break;
    case 1:
      var t1 = this.v1;
      pA.setFrom$1(t1.get$wA());
      pB.setFrom$1(t1.get$wB());
      break;
    case 2:
      t1 = this.case2;
      var t2 = this.v1;
      t1.setFrom$1(t2.get$wA()).mulLocal$1(t2.get$a());
      var t3 = this.v2;
      pA.setFrom$1(t3.get$wA()).mulLocal$1(t3.get$a()).addLocal$1(t1);
      t1.setFrom$1(t2.get$wB()).mulLocal$1(t2.get$a());
      pB.setFrom$1(t3.get$wB()).mulLocal$1(t3.get$a()).addLocal$1(t1);
      break;
    case 3:
      t1 = this.v1;
      pA.setFrom$1(t1.get$wA()).mulLocal$1(t1.get$a());
      t2 = this.case3;
      t3 = this.v2;
      t2.setFrom$1(t3.get$wA()).mulLocal$1(t3.get$a());
      var t4 = this.case33;
      var t5 = this.v3;
      t4.setFrom$1(t5.get$wA()).mulLocal$1(t5.get$a());
      pA.addLocal$1(t2).addLocal$1(t4);
      pB.setFrom$1(pA);
      break;
    default:
      break;
  }
},
 getMetric$0: function() {
  switch (this.count) {
    case 0:
      return 0.0;
    case 1:
      return 0.0;
    case 2:
      return $.sqrt($.MathBox_distanceSquared(this.v1.get$w(), this.v2.get$w()));
    case 3:
      var t1 = this.case3;
      var t2 = t1.setFrom$1(this.v2.get$w());
      var t3 = this.v1;
      t2.subLocal$1(t3.get$w());
      t2 = this.case33;
      t2.setFrom$1(this.v3.get$w()).subLocal$1(t3.get$w());
      return $.sub($.mul(t1.get$x(), t2.get$y()), $.mul(t1.get$y(), t2.get$x()));
    default:
      return 0.0;
  }
},
 solve2$0: function() {
  var t1 = this.v1;
  var w1 = t1.w;
  var t2 = this.v2;
  var w2 = t2.w;
  var t3 = this.e12;
  t3.setFrom$1(w2).subLocal$1(w1);
  var t4 = w1.get$x();
  if (typeof t4 !== 'number')
    return this.solve2$0$bailout(1, w1, w2, t4, t1, t2, t3, 0);
  var t6 = t3.x;
  if (typeof t6 !== 'number')
    return this.solve2$0$bailout(2, w1, w2, t4, t1, t2, t3, t6);
  t6 = t4 * t6;
  t4 = w1.get$y();
  if (typeof t4 !== 'number')
    return this.solve2$0$bailout(3, t3, w2, t1, t2, t6, t4, 0);
  var t9 = t3.y;
  if (typeof t9 !== 'number')
    return this.solve2$0$bailout(4, t9, t3, w2, t1, t2, t6, t4);
  var d12_2 = -(t6 + t4 * t9);
  if (d12_2 <= 0.0) {
    t1.a = 1.0;
    this.count = 1;
    return;
  }
  t4 = w2.get$x();
  if (typeof t4 !== 'number')
    return this.solve2$0$bailout(5, t4, w2, d12_2, t1, t2, t3, 0);
  t6 = t3.x;
  if (typeof t6 !== 'number')
    return this.solve2$0$bailout(6, t4, w2, d12_2, t6, t1, t2, t3);
  t6 = t4 * t6;
  t4 = w2.get$y();
  if (typeof t4 !== 'number')
    return this.solve2$0$bailout(7, d12_2, t6, t4, t1, t2, t3, 0);
  t3 = t3.y;
  if (typeof t3 !== 'number')
    return this.solve2$0$bailout(8, d12_2, t6, t4, t3, t1, t2, 0);
  var d12_1 = t6 + t4 * t3;
  if (d12_1 <= 0.0) {
    t2.a = 1.0;
    this.count = 1;
    t1.setFrom$1(t2);
    return;
  }
  var inv_d12 = 1.0 / (d12_1 + d12_2);
  t1.a = d12_1 * inv_d12;
  t2.a = d12_2 * inv_d12;
  this.count = 2;
},
 solve2$0$bailout: function(state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      w1 = env0;
      w2 = env1;
      t4 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      break;
    case 2:
      w1 = env0;
      w2 = env1;
      t4 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t6 = env6;
      break;
    case 3:
      t3 = env0;
      w2 = env1;
      t1 = env2;
      t2 = env3;
      t6 = env4;
      t4 = env5;
      break;
    case 4:
      t9 = env0;
      t3 = env1;
      w2 = env2;
      t1 = env3;
      t2 = env4;
      t6 = env5;
      t4 = env6;
      break;
    case 5:
      t4 = env0;
      w2 = env1;
      d12_2 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      break;
    case 6:
      t4 = env0;
      w2 = env1;
      d12_2 = env2;
      t6 = env3;
      t1 = env4;
      t2 = env5;
      t3 = env6;
      break;
    case 7:
      d12_2 = env0;
      t6 = env1;
      t4 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      break;
    case 8:
      d12_2 = env0;
      t6 = env1;
      t4 = env2;
      t3 = env3;
      t1 = env4;
      t2 = env5;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.v1;
      var w1 = t1.get$w();
      var t2 = this.v2;
      var w2 = t2.get$w();
      var t3 = this.e12;
      t3.setFrom$1(w2).subLocal$1(w1);
      var t4 = w1.get$x();
    case 1:
      state = 0;
      var t6 = t3.get$x();
    case 2:
      state = 0;
      t6 = $.mul(t4, t6);
      t4 = w1.get$y();
    case 3:
      state = 0;
      var t9 = t3.get$y();
    case 4:
      state = 0;
      var d12_2 = $.neg($.add(t6, $.mul(t4, t9)));
      if ($.leB(d12_2, 0.0)) {
        t1.set$a(1.0);
        this.count = 1;
        return;
      }
      t4 = w2.get$x();
    case 5:
      state = 0;
      t6 = t3.get$x();
    case 6:
      state = 0;
      t6 = $.mul(t4, t6);
      t4 = w2.get$y();
    case 7:
      state = 0;
      t3 = t3.get$y();
    case 8:
      state = 0;
      var d12_1 = $.add(t6, $.mul(t4, t3));
      if ($.leB(d12_1, 0.0)) {
        t2.set$a(1.0);
        this.count = 1;
        t1.setFrom$1(t2);
        return;
      }
      t3 = $.add(d12_1, d12_2);
      if (typeof t3 !== 'number')
        throw $.iae(t3);
      var inv_d12 = 1.0 / t3;
      t1.set$a($.mul(d12_1, inv_d12));
      t2.set$a($.mul(d12_2, inv_d12));
      this.count = 2;
  }
},
 solve3$0: function() {
  var t1 = this.v1;
  var w1 = t1.w;
  var t2 = this.v2;
  var w2 = t2.w;
  var t3 = this.v3;
  var w3 = t3.w;
  var t4 = this.e12;
  t4.setFrom$1(w2).subLocal$1(w1);
  var t5 = w1.get$x();
  if (typeof t5 !== 'number')
    return this.solve3$0$bailout(1, w1, t1, t2, t3, t4, w3, w2, t5, 0, 0, 0, 0, 0, 0, 0, 0);
  var t7 = t4.x;
  if (typeof t7 !== 'number')
    return this.solve3$0$bailout(2, w1, t1, t2, t3, t4, w3, w2, t5, t7, 0, 0, 0, 0, 0, 0, 0);
  t7 = t5 * t7;
  t5 = w1.get$y();
  if (typeof t5 !== 'number')
    return this.solve3$0$bailout(3, t7, t5, w1, t1, t2, t3, t4, w3, w2, 0, 0, 0, 0, 0, 0, 0);
  var t10 = t4.y;
  if (typeof t10 !== 'number')
    return this.solve3$0$bailout(4, t7, t5, t10, w1, t1, t2, t3, t4, w3, w2, 0, 0, 0, 0, 0, 0);
  var w1e12 = t7 + t5 * t10;
  t7 = w2.get$x();
  if (typeof t7 !== 'number')
    return this.solve3$0$bailout(5, w1, t1, t2, t3, t4, w1e12, w3, w2, t7, 0, 0, 0, 0, 0, 0, 0);
  var t13 = t4.x;
  if (typeof t13 !== 'number')
    return this.solve3$0$bailout(6, w1, t1, t2, t3, t4, w1e12, w3, w2, t13, t7, 0, 0, 0, 0, 0, 0);
  t13 = t7 * t13;
  t7 = w2.get$y();
  if (typeof t7 !== 'number')
    return this.solve3$0$bailout(7, w1, t1, t2, t3, t4, w1e12, w3, w2, t13, t7, 0, 0, 0, 0, 0, 0);
  var t16 = t4.y;
  if (typeof t16 !== 'number')
    return this.solve3$0$bailout(8, w1, t1, t2, t3, t4, w1e12, w3, w2, t13, t7, t16, 0, 0, 0, 0, 0);
  var w2e12 = t13 + t7 * t16;
  var d12_2 = -w1e12;
  t13 = this.e13;
  t13.setFrom$1(w3).subLocal$1(w1);
  var t18 = w1.get$x();
  if (typeof t18 !== 'number')
    return this.solve3$0$bailout(9, w2e12, d12_2, w1, t1, t2, t3, t4, t18, w3, w2, t13, 0, 0, 0, 0, 0);
  var t20 = t13.x;
  if (typeof t20 !== 'number')
    return this.solve3$0$bailout(10, w2e12, d12_2, w1, t1, t2, t3, t4, t18, w3, w2, t13, t20, 0, 0, 0, 0);
  t20 = t18 * t20;
  t18 = w1.get$y();
  if (typeof t18 !== 'number')
    return this.solve3$0$bailout(11, w2e12, d12_2, w1, t1, t2, t3, t4, w3, w2, t13, t18, t20, 0, 0, 0, 0);
  var t23 = t13.y;
  if (typeof t23 !== 'number')
    return this.solve3$0$bailout(12, w2e12, d12_2, w1, t1, t2, t3, t4, w3, w2, t13, t18, t20, t23, 0, 0, 0);
  var w1e13 = t20 + t18 * t23;
  t20 = w3.get$x();
  if (typeof t20 !== 'number')
    return this.solve3$0$bailout(13, w2e12, d12_2, w1, t1, t2, t3, t4, w3, w2, t13, w1e13, t20, 0, 0, 0, 0);
  var t26 = t13.x;
  if (typeof t26 !== 'number')
    return this.solve3$0$bailout(14, w2e12, d12_2, w1, t1, t2, t3, t4, w3, w2, t13, w1e13, t20, t26, 0, 0, 0);
  t26 = t20 * t26;
  t20 = w3.get$y();
  if (typeof t20 !== 'number')
    return this.solve3$0$bailout(15, w2e12, d12_2, w1, t1, t2, t3, t4, w3, w2, t13, w1e13, t26, t20, 0, 0, 0);
  var t29 = t13.y;
  if (typeof t29 !== 'number')
    return this.solve3$0$bailout(16, w2e12, d12_2, w1, t1, t2, t3, t4, w3, w2, t13, w1e13, t26, t20, t29, 0, 0);
  var w3e13 = t26 + t20 * t29;
  var d13_2 = -w1e13;
  t26 = this.e23;
  t26.setFrom$1(w3).subLocal$1(w2);
  var t31 = w2.get$x();
  if (typeof t31 !== 'number')
    return this.solve3$0$bailout(17, w2e12, d12_2, w1, t1, t2, t3, t4, t31, w3, w2, t13, t26, w3e13, d13_2, 0, 0);
  var t33 = t26.x;
  if (typeof t33 !== 'number')
    return this.solve3$0$bailout(18, w2e12, d12_2, w1, t1, t2, t3, t4, t31, w3, w2, t13, t26, t33, w3e13, d13_2, 0);
  t33 = t31 * t33;
  t31 = w2.get$y();
  if (typeof t31 !== 'number')
    return this.solve3$0$bailout(19, w2e12, d12_2, w1, t1, t2, t3, t4, t33, w3, w2, t13, t31, t26, w3e13, d13_2, 0);
  var t36 = t26.y;
  if (typeof t36 !== 'number')
    return this.solve3$0$bailout(20, w2e12, d12_2, w1, t1, t2, t3, t4, t33, w3, w2, t13, t31, t26, t36, w3e13, d13_2);
  var w2e23 = t33 + t31 * t36;
  t33 = w3.get$x();
  if (typeof t33 !== 'number')
    return this.solve3$0$bailout(21, w2e12, d12_2, w1, t1, t2, t3, t4, w3, w2, t13, w2e23, t26, t33, w3e13, d13_2, 0);
  var t39 = t26.x;
  if (typeof t39 !== 'number')
    return this.solve3$0$bailout(22, w2e12, d12_2, w1, t1, t2, t3, t4, w3, w2, t13, w2e23, t26, t33, t39, w3e13, d13_2);
  t39 = t33 * t39;
  t33 = w3.get$y();
  if (typeof t33 !== 'number')
    return this.solve3$0$bailout(23, w2e12, d12_2, w1, t1, t2, t3, t4, w3, w2, t13, w2e23, t26, t39, t33, w3e13, d13_2);
  t26 = t26.y;
  if (typeof t26 !== 'number')
    return this.solve3$0$bailout(24, w2e12, d12_2, w1, t1, t2, t3, t4, w3, w2, t13, w2e23, t39, t33, t26, w3e13, d13_2);
  var w3e23 = t39 + t33 * t26;
  var d23_2 = -w2e23;
  t39 = t4.x;
  if (typeof t39 !== 'number')
    return this.solve3$0$bailout(25, w2e12, d12_2, w1, t1, t2, t3, t4, w3, w2, t13, w3e23, d23_2, w3e13, t39, d13_2, 0);
  var t44 = t13.y;
  if (typeof t44 !== 'number')
    return this.solve3$0$bailout(26, w2e12, d12_2, w1, t1, t2, t3, t4, w3, w2, t13, w3e23, d23_2, w3e13, t44, d13_2, t39);
  t44 = t39 * t44;
  t4 = t4.y;
  if (typeof t4 !== 'number')
    return this.solve3$0$bailout(27, t4, w2e12, d12_2, w1, t1, t2, t3, w3, w2, t13, w3e23, d23_2, w3e13, d13_2, t44, 0);
  t13 = t13.x;
  if (typeof t13 !== 'number')
    return this.solve3$0$bailout(28, t4, w2e12, t13, d12_2, w1, t1, t2, t3, w3, w2, w3e23, d23_2, w3e13, d13_2, t44, 0);
  var n123 = t44 - t4 * t13;
  t44 = w2.get$x();
  if (typeof t44 !== 'number')
    return this.solve3$0$bailout(29, w2e12, d12_2, w1, t1, t2, t3, n123, t44, w3, w2, w3e23, d23_2, w3e13, d13_2, 0, 0);
  var t48 = w3.get$y();
  if (typeof t48 !== 'number')
    return this.solve3$0$bailout(30, w2e12, d12_2, w1, t1, t2, t3, n123, t44, w3, w2, t48, w3e23, d23_2, w3e13, d13_2, 0);
  t48 = t44 * t48;
  t44 = w2.get$y();
  if (typeof t44 !== 'number')
    return this.solve3$0$bailout(31, w2e12, d12_2, w1, t1, t2, t3, n123, t48, w3, w2, t44, w3e23, d23_2, w3e13, d13_2, 0);
  var t51 = w3.get$x();
  if (typeof t51 !== 'number')
    return this.solve3$0$bailout(32, w2e12, d12_2, w1, t1, t2, t3, n123, t48, w3, w2, t51, t44, w3e23, d23_2, w3e13, d13_2);
  var d123_1 = n123 * (t48 - t44 * t51);
  var t53 = w3.get$x();
  if (typeof t53 !== 'number')
    return this.solve3$0$bailout(33, w2e12, d12_2, w1, t1, t2, t3, n123, w3, w2, d123_1, t53, w3e23, d23_2, w3e13, d13_2, 0);
  var t55 = w1.get$y();
  if (typeof t55 !== 'number')
    return this.solve3$0$bailout(34, w2e12, d12_2, w1, t1, t2, t3, n123, w3, w2, d123_1, t53, t55, w3e23, d23_2, w3e13, d13_2);
  t55 = t53 * t55;
  t53 = w3.get$y();
  if (typeof t53 !== 'number')
    return this.solve3$0$bailout(35, w2e12, d12_2, w1, t1, t2, t3, n123, w2, d123_1, t55, t53, w3e23, d23_2, w3e13, d13_2, 0);
  var t58 = w1.get$x();
  if (typeof t58 !== 'number')
    return this.solve3$0$bailout(36, w2e12, d12_2, w1, t1, t2, t3, n123, w2, d123_1, t55, t53, w3e23, t58, d23_2, w3e13, d13_2);
  var d123_2 = n123 * (t55 - t53 * t58);
  var t60 = w1.get$x();
  if (typeof t60 !== 'number')
    return this.solve3$0$bailout(37, w2e12, d12_2, w1, t1, t2, t3, n123, w2, d123_1, w3e23, d23_2, w3e13, d123_2, t60, d13_2, 0);
  var t62 = w2.get$y();
  if (typeof t62 !== 'number')
    return this.solve3$0$bailout(38, t62, w2e12, d12_2, w1, t1, t2, t3, n123, w2, d123_1, w3e23, d23_2, w3e13, d123_2, t60, d13_2);
  t62 = t60 * t62;
  t60 = w1.get$y();
  if (typeof t60 !== 'number')
    return this.solve3$0$bailout(39, w2e12, t62, d12_2, t1, t2, t3, n123, w2, t60, d123_1, w3e23, d23_2, w3e13, d123_2, d13_2, 0);
  var t65 = w2.get$x();
  if (typeof t65 !== 'number')
    return this.solve3$0$bailout(40, w2e12, t62, d12_2, t65, t1, t2, t3, n123, t60, d123_1, w3e23, d23_2, w3e13, d123_2, d13_2, 0);
  var d123_3 = n123 * (t62 - t60 * t65);
  if (d12_2 <= 0.0 && d13_2 <= 0.0) {
    t1.a = 1.0;
    this.count = 1;
    return;
  }
  if (w2e12 > 0.0 && d12_2 > 0.0 && d123_3 <= 0.0) {
    var inv_d12 = 1.0 / (w2e12 + d12_2);
    t1.a = w2e12 * inv_d12;
    t2.a = d12_2 * inv_d12;
    this.count = 2;
    return;
  }
  if (w3e13 > 0.0 && d13_2 > 0.0 && d123_2 <= 0.0) {
    var inv_d13 = 1.0 / (w3e13 + d13_2);
    t1.a = w3e13 * inv_d13;
    t3.a = d13_2 * inv_d13;
    this.count = 2;
    t2.setFrom$1(t3);
    return;
  }
  if (w2e12 <= 0.0 && d23_2 <= 0.0) {
    t2.a = 1.0;
    this.count = 1;
    t1.setFrom$1(t2);
    return;
  }
  if (w3e13 <= 0.0 && w3e23 <= 0.0) {
    t3.a = 1.0;
    this.count = 1;
    t1.setFrom$1(t3);
    return;
  }
  if (w3e23 > 0.0 && d23_2 > 0.0 && d123_1 <= 0.0) {
    var inv_d23 = 1.0 / (w3e23 + d23_2);
    t2.a = w3e23 * inv_d23;
    t3.a = d23_2 * inv_d23;
    this.count = 2;
    t1.setFrom$1(t3);
    return;
  }
  var inv_d123 = 1.0 / (d123_1 + d123_2 + d123_3);
  t1.a = d123_1 * inv_d123;
  t2.a = d123_2 * inv_d123;
  t3.a = d123_3 * inv_d123;
  this.count = 3;
},
 solve3$0$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13, env14, env15) {
  switch (state) {
    case 1:
      w1 = env0;
      t1 = env1;
      t2 = env2;
      t3 = env3;
      t4 = env4;
      w3 = env5;
      w2 = env6;
      t5 = env7;
      break;
    case 2:
      w1 = env0;
      t1 = env1;
      t2 = env2;
      t3 = env3;
      t4 = env4;
      w3 = env5;
      w2 = env6;
      t5 = env7;
      t7 = env8;
      break;
    case 3:
      t7 = env0;
      t5 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      w3 = env7;
      w2 = env8;
      break;
    case 4:
      t7 = env0;
      t5 = env1;
      t10 = env2;
      w1 = env3;
      t1 = env4;
      t2 = env5;
      t3 = env6;
      t4 = env7;
      w3 = env8;
      w2 = env9;
      break;
    case 5:
      w1 = env0;
      t1 = env1;
      t2 = env2;
      t3 = env3;
      t4 = env4;
      w1e12 = env5;
      w3 = env6;
      w2 = env7;
      t7 = env8;
      break;
    case 6:
      w1 = env0;
      t1 = env1;
      t2 = env2;
      t3 = env3;
      t4 = env4;
      w1e12 = env5;
      w3 = env6;
      w2 = env7;
      t13 = env8;
      t7 = env9;
      break;
    case 7:
      w1 = env0;
      t1 = env1;
      t2 = env2;
      t3 = env3;
      t4 = env4;
      w1e12 = env5;
      w3 = env6;
      w2 = env7;
      t13 = env8;
      t7 = env9;
      break;
    case 8:
      w1 = env0;
      t1 = env1;
      t2 = env2;
      t3 = env3;
      t4 = env4;
      w1e12 = env5;
      w3 = env6;
      w2 = env7;
      t13 = env8;
      t7 = env9;
      t16 = env10;
      break;
    case 9:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      t18 = env7;
      w3 = env8;
      w2 = env9;
      t13 = env10;
      break;
    case 10:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      t18 = env7;
      w3 = env8;
      w2 = env9;
      t13 = env10;
      t20 = env11;
      break;
    case 11:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      w3 = env7;
      w2 = env8;
      t13 = env9;
      t18 = env10;
      t20 = env11;
      break;
    case 12:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      w3 = env7;
      w2 = env8;
      t13 = env9;
      t18 = env10;
      t20 = env11;
      t23 = env12;
      break;
    case 13:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      w3 = env7;
      w2 = env8;
      t13 = env9;
      w1e13 = env10;
      t20 = env11;
      break;
    case 14:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      w3 = env7;
      w2 = env8;
      t13 = env9;
      w1e13 = env10;
      t20 = env11;
      t26 = env12;
      break;
    case 15:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      w3 = env7;
      w2 = env8;
      t13 = env9;
      w1e13 = env10;
      t26 = env11;
      t20 = env12;
      break;
    case 16:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      w3 = env7;
      w2 = env8;
      t13 = env9;
      w1e13 = env10;
      t26 = env11;
      t20 = env12;
      t29 = env13;
      break;
    case 17:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      t31 = env7;
      w3 = env8;
      w2 = env9;
      t13 = env10;
      t26 = env11;
      w3e13 = env12;
      d13_2 = env13;
      break;
    case 18:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      t31 = env7;
      w3 = env8;
      w2 = env9;
      t13 = env10;
      t26 = env11;
      t33 = env12;
      w3e13 = env13;
      d13_2 = env14;
      break;
    case 19:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      t33 = env7;
      w3 = env8;
      w2 = env9;
      t13 = env10;
      t31 = env11;
      t26 = env12;
      w3e13 = env13;
      d13_2 = env14;
      break;
    case 20:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      t33 = env7;
      w3 = env8;
      w2 = env9;
      t13 = env10;
      t31 = env11;
      t26 = env12;
      t36 = env13;
      w3e13 = env14;
      d13_2 = env15;
      break;
    case 21:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      w3 = env7;
      w2 = env8;
      t13 = env9;
      w2e23 = env10;
      t26 = env11;
      t33 = env12;
      w3e13 = env13;
      d13_2 = env14;
      break;
    case 22:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      w3 = env7;
      w2 = env8;
      t13 = env9;
      w2e23 = env10;
      t26 = env11;
      t33 = env12;
      t39 = env13;
      w3e13 = env14;
      d13_2 = env15;
      break;
    case 23:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      w3 = env7;
      w2 = env8;
      t13 = env9;
      w2e23 = env10;
      t26 = env11;
      t39 = env12;
      t33 = env13;
      w3e13 = env14;
      d13_2 = env15;
      break;
    case 24:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      w3 = env7;
      w2 = env8;
      t13 = env9;
      w2e23 = env10;
      t39 = env11;
      t33 = env12;
      t26 = env13;
      w3e13 = env14;
      d13_2 = env15;
      break;
    case 25:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      w3 = env7;
      w2 = env8;
      t13 = env9;
      w3e23 = env10;
      d23_2 = env11;
      w3e13 = env12;
      t39 = env13;
      d13_2 = env14;
      break;
    case 26:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      t4 = env6;
      w3 = env7;
      w2 = env8;
      t13 = env9;
      w3e23 = env10;
      d23_2 = env11;
      w3e13 = env12;
      t44 = env13;
      d13_2 = env14;
      t39 = env15;
      break;
    case 27:
      t4 = env0;
      w2e12 = env1;
      d12_2 = env2;
      w1 = env3;
      t1 = env4;
      t2 = env5;
      t3 = env6;
      w3 = env7;
      w2 = env8;
      t13 = env9;
      w3e23 = env10;
      d23_2 = env11;
      w3e13 = env12;
      d13_2 = env13;
      t44 = env14;
      break;
    case 28:
      t4 = env0;
      w2e12 = env1;
      t13 = env2;
      d12_2 = env3;
      w1 = env4;
      t1 = env5;
      t2 = env6;
      t3 = env7;
      w3 = env8;
      w2 = env9;
      w3e23 = env10;
      d23_2 = env11;
      w3e13 = env12;
      d13_2 = env13;
      t44 = env14;
      break;
    case 29:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      n123 = env6;
      t44 = env7;
      w3 = env8;
      w2 = env9;
      w3e23 = env10;
      d23_2 = env11;
      w3e13 = env12;
      d13_2 = env13;
      break;
    case 30:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      n123 = env6;
      t44 = env7;
      w3 = env8;
      w2 = env9;
      t48 = env10;
      w3e23 = env11;
      d23_2 = env12;
      w3e13 = env13;
      d13_2 = env14;
      break;
    case 31:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      n123 = env6;
      t48 = env7;
      w3 = env8;
      w2 = env9;
      t44 = env10;
      w3e23 = env11;
      d23_2 = env12;
      w3e13 = env13;
      d13_2 = env14;
      break;
    case 32:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      n123 = env6;
      t48 = env7;
      w3 = env8;
      w2 = env9;
      t51 = env10;
      t44 = env11;
      w3e23 = env12;
      d23_2 = env13;
      w3e13 = env14;
      d13_2 = env15;
      break;
    case 33:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      n123 = env6;
      w3 = env7;
      w2 = env8;
      d123_1 = env9;
      t53 = env10;
      w3e23 = env11;
      d23_2 = env12;
      w3e13 = env13;
      d13_2 = env14;
      break;
    case 34:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      n123 = env6;
      w3 = env7;
      w2 = env8;
      d123_1 = env9;
      t53 = env10;
      t55 = env11;
      w3e23 = env12;
      d23_2 = env13;
      w3e13 = env14;
      d13_2 = env15;
      break;
    case 35:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      n123 = env6;
      w2 = env7;
      d123_1 = env8;
      t55 = env9;
      t53 = env10;
      w3e23 = env11;
      d23_2 = env12;
      w3e13 = env13;
      d13_2 = env14;
      break;
    case 36:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      n123 = env6;
      w2 = env7;
      d123_1 = env8;
      t55 = env9;
      t53 = env10;
      w3e23 = env11;
      t58 = env12;
      d23_2 = env13;
      w3e13 = env14;
      d13_2 = env15;
      break;
    case 37:
      w2e12 = env0;
      d12_2 = env1;
      w1 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      n123 = env6;
      w2 = env7;
      d123_1 = env8;
      w3e23 = env9;
      d23_2 = env10;
      w3e13 = env11;
      d123_2 = env12;
      t60 = env13;
      d13_2 = env14;
      break;
    case 38:
      t62 = env0;
      w2e12 = env1;
      d12_2 = env2;
      w1 = env3;
      t1 = env4;
      t2 = env5;
      t3 = env6;
      n123 = env7;
      w2 = env8;
      d123_1 = env9;
      w3e23 = env10;
      d23_2 = env11;
      w3e13 = env12;
      d123_2 = env13;
      t60 = env14;
      d13_2 = env15;
      break;
    case 39:
      w2e12 = env0;
      t62 = env1;
      d12_2 = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      n123 = env6;
      w2 = env7;
      t60 = env8;
      d123_1 = env9;
      w3e23 = env10;
      d23_2 = env11;
      w3e13 = env12;
      d123_2 = env13;
      d13_2 = env14;
      break;
    case 40:
      w2e12 = env0;
      t62 = env1;
      d12_2 = env2;
      t65 = env3;
      t1 = env4;
      t2 = env5;
      t3 = env6;
      n123 = env7;
      t60 = env8;
      d123_1 = env9;
      w3e23 = env10;
      d23_2 = env11;
      w3e13 = env12;
      d123_2 = env13;
      d13_2 = env14;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.v1;
      var w1 = t1.get$w();
      var t2 = this.v2;
      var w2 = t2.get$w();
      var t3 = this.v3;
      var w3 = t3.get$w();
      var t4 = this.e12;
      t4.setFrom$1(w2).subLocal$1(w1);
      var t5 = w1.get$x();
    case 1:
      state = 0;
      var t7 = t4.get$x();
    case 2:
      state = 0;
      t7 = $.mul(t5, t7);
      t5 = w1.get$y();
    case 3:
      state = 0;
      var t10 = t4.get$y();
    case 4:
      state = 0;
      var w1e12 = $.add(t7, $.mul(t5, t10));
      t7 = w2.get$x();
    case 5:
      state = 0;
      var t13 = t4.get$x();
    case 6:
      state = 0;
      t13 = $.mul(t7, t13);
      t7 = w2.get$y();
    case 7:
      state = 0;
      var t16 = t4.get$y();
    case 8:
      state = 0;
      var w2e12 = $.add(t13, $.mul(t7, t16));
      var d12_2 = $.neg(w1e12);
      t13 = this.e13;
      t13.setFrom$1(w3).subLocal$1(w1);
      var t18 = w1.get$x();
    case 9:
      state = 0;
      var t20 = t13.get$x();
    case 10:
      state = 0;
      t20 = $.mul(t18, t20);
      t18 = w1.get$y();
    case 11:
      state = 0;
      var t23 = t13.get$y();
    case 12:
      state = 0;
      var w1e13 = $.add(t20, $.mul(t18, t23));
      t20 = w3.get$x();
    case 13:
      state = 0;
      var t26 = t13.get$x();
    case 14:
      state = 0;
      t26 = $.mul(t20, t26);
      t20 = w3.get$y();
    case 15:
      state = 0;
      var t29 = t13.get$y();
    case 16:
      state = 0;
      var w3e13 = $.add(t26, $.mul(t20, t29));
      var d13_2 = $.neg(w1e13);
      t26 = this.e23;
      t26.setFrom$1(w3).subLocal$1(w2);
      var t31 = w2.get$x();
    case 17:
      state = 0;
      var t33 = t26.get$x();
    case 18:
      state = 0;
      t33 = $.mul(t31, t33);
      t31 = w2.get$y();
    case 19:
      state = 0;
      var t36 = t26.get$y();
    case 20:
      state = 0;
      var w2e23 = $.add(t33, $.mul(t31, t36));
      t33 = w3.get$x();
    case 21:
      state = 0;
      var t39 = t26.get$x();
    case 22:
      state = 0;
      t39 = $.mul(t33, t39);
      t33 = w3.get$y();
    case 23:
      state = 0;
      t26 = t26.get$y();
    case 24:
      state = 0;
      var w3e23 = $.add(t39, $.mul(t33, t26));
      var d23_2 = $.neg(w2e23);
      t39 = t4.get$x();
    case 25:
      state = 0;
      var t44 = t13.get$y();
    case 26:
      state = 0;
      t44 = $.mul(t39, t44);
      t4 = t4.get$y();
    case 27:
      state = 0;
      t13 = t13.get$x();
    case 28:
      state = 0;
      var n123 = $.sub(t44, $.mul(t4, t13));
      t44 = w2.get$x();
    case 29:
      state = 0;
      var t48 = w3.get$y();
    case 30:
      state = 0;
      t48 = $.mul(t44, t48);
      t44 = w2.get$y();
    case 31:
      state = 0;
      var t51 = w3.get$x();
    case 32:
      state = 0;
      var d123_1 = $.mul(n123, $.sub(t48, $.mul(t44, t51)));
      var t53 = w3.get$x();
    case 33:
      state = 0;
      var t55 = w1.get$y();
    case 34:
      state = 0;
      t55 = $.mul(t53, t55);
      t53 = w3.get$y();
    case 35:
      state = 0;
      var t58 = w1.get$x();
    case 36:
      state = 0;
      var d123_2 = $.mul(n123, $.sub(t55, $.mul(t53, t58)));
      var t60 = w1.get$x();
    case 37:
      state = 0;
      var t62 = w2.get$y();
    case 38:
      state = 0;
      t62 = $.mul(t60, t62);
      t60 = w1.get$y();
    case 39:
      state = 0;
      var t65 = w2.get$x();
    case 40:
      state = 0;
      var d123_3 = $.mul(n123, $.sub(t62, $.mul(t60, t65)));
      if ($.leB(d12_2, 0.0) && $.leB(d13_2, 0.0)) {
        t1.set$a(1.0);
        this.count = 1;
        return;
      }
      if ($.gtB(w2e12, 0.0) && $.gtB(d12_2, 0.0) && $.leB(d123_3, 0.0)) {
        t3 = $.add(w2e12, d12_2);
        if (typeof t3 !== 'number')
          throw $.iae(t3);
        var inv_d12 = 1.0 / t3;
        t1.set$a($.mul(w2e12, inv_d12));
        t2.set$a($.mul(d12_2, inv_d12));
        this.count = 2;
        return;
      }
      if ($.gtB(w3e13, 0.0) && $.gtB(d13_2, 0.0) && $.leB(d123_2, 0.0)) {
        t4 = $.add(w3e13, d13_2);
        if (typeof t4 !== 'number')
          throw $.iae(t4);
        var inv_d13 = 1.0 / t4;
        t1.set$a($.mul(w3e13, inv_d13));
        t3.set$a($.mul(d13_2, inv_d13));
        this.count = 2;
        t2.setFrom$1(t3);
        return;
      }
      if ($.leB(w2e12, 0.0) && $.leB(d23_2, 0.0)) {
        t2.set$a(1.0);
        this.count = 1;
        t1.setFrom$1(t2);
        return;
      }
      if ($.leB(w3e13, 0.0) && $.leB(w3e23, 0.0)) {
        t3.set$a(1.0);
        this.count = 1;
        t1.setFrom$1(t3);
        return;
      }
      if ($.gtB(w3e23, 0.0) && $.gtB(d23_2, 0.0) && $.leB(d123_1, 0.0)) {
        t4 = $.add(w3e23, d23_2);
        if (typeof t4 !== 'number')
          throw $.iae(t4);
        var inv_d23 = 1.0 / t4;
        t2.set$a($.mul(w3e23, inv_d23));
        t3.set$a($.mul(d23_2, inv_d23));
        this.count = 2;
        t1.setFrom$1(t3);
        return;
      }
      t4 = $.add($.add(d123_1, d123_2), d123_3);
      if (typeof t4 !== 'number')
        throw $.iae(t4);
      var inv_d123 = 1.0 / t4;
      t1.set$a($.mul(d123_1, inv_d123));
      t2.set$a($.mul(d123_2, inv_d123));
      t3.set$a($.mul(d123_3, inv_d123));
      this.count = 3;
  }
},
 Simplex$0: function() {
  var t1 = this.vertices;
  var t2 = this.v1;
  if (0 < 0 || 0 >= t1.length)
    throw $.ioore(0);
  t1[0] = t2;
  t2 = this.v2;
  if (1 < 0 || 1 >= t1.length)
    throw $.ioore(1);
  t1[1] = t2;
  t2 = this.v3;
  if (2 < 0 || 2 >= t1.length)
    throw $.ioore(2);
  t1[2] = t2;
}
};

$$.SimplexCache = {"":
 ["metric=", "count=", "indexA?", "indexB?"],
 "super": "Object",
 setFrom$1: function(sc) {
  var t1 = this.indexA;
  $.setRange$3(t1, 0, $.get$length(t1), sc.get$indexA());
  t1 = this.indexB;
  $.setRange$3(t1, 0, $.get$length(t1), sc.get$indexB());
  this.metric = sc.get$metric();
  this.count = sc.get$count();
},
 SimplexCache$0: function() {
  var t1 = this.indexA;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())
    return this.SimplexCache$0$bailout(1, t1, 0);
  var t3 = this.indexB;
  if (typeof t3 !== 'object' || t3 === null || (t3.constructor !== Array || !!t3.immutable$list) && !t3.is$JavaScriptIndexingBehavior())
    return this.SimplexCache$0$bailout(2, t1, t3);
  var i = 0;
  for (; i < 3; ++i) {
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i] = 2147483647;
    if (i < 0 || i >= t3.length)
      throw $.ioore(i);
    t3[i] = 2147483647;
  }
},
 SimplexCache$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.indexA;
    case 1:
      state = 0;
      var t3 = this.indexB;
    case 2:
      state = 0;
      var i = 0;
      for (; i < 3; ++i) {
        $.indexSet(t1, i, 2147483647);
        $.indexSet(t3, i, 2147483647);
      }
  }
}
};

$$.SimplexVertex = {"":
 ["wA?", "wB?", "w?", "a=", "indexA=", "indexB="],
 "super": "Object",
 setFrom$1: function(sv) {
  this.wA.setFrom$1(sv.get$wA());
  this.wB.setFrom$1(sv.get$wB());
  this.w.setFrom$1(sv.get$w());
  this.a = sv.get$a();
  this.indexA = sv.get$indexA();
  this.indexB = sv.get$indexB();
},
 toString$0: function() {
  return 'wA: ' + $.S(this.wA) + ', wB: ' + $.S(this.wB) + ', w: ' + $.S(this.w);
}
};

$$.TimeOfImpact = {"":
 ["cache", "distanceInput", "xfA", "xfB", "distanceOutput", "fcn", "indexes", "sweepA?", "sweepB?", "pool"],
 "super": "Object",
 timeOfImpact$2: function(output, input) {
  var t1 = $.TimeOfImpact_toiCalls;
  if (typeof t1 !== 'number')
    return this.timeOfImpact$2$bailout(1, output, input, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  $.TimeOfImpact_toiCalls = t1 + 1;
  output.set$state(0);
  output.set$t(input.get$tMax());
  var proxyA = input.get$proxyA();
  var proxyB = input.get$proxyB();
  var t3 = this.sweepA;
  t3.setFrom$1(input.get$sweepA());
  var t4 = this.sweepB;
  t4.setFrom$1(input.get$sweepB());
  t3.normalize$0();
  t4.normalize$0();
  var tMax = input.get$tMax();
  if (tMax !== (tMax | 0))
    return this.timeOfImpact$2$bailout(2, output, input, tMax, t3, t4, proxyA, proxyB, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var t6 = proxyA.get$radius();
  if (typeof t6 !== 'number')
    return this.timeOfImpact$2$bailout(3, output, input, tMax, t6, t3, t4, proxyA, proxyB, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var t8 = proxyB.get$radius();
  if (typeof t8 !== 'number')
    return this.timeOfImpact$2$bailout(4, output, input, tMax, t6, t8, t3, t4, proxyA, proxyB, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var target = $.max(0.005, t6 + t8 - 0.015);
  var t10 = this.cache;
  t10.count = 0;
  var t11 = input.get$proxyA();
  var t12 = this.distanceInput;
  t12.proxyA = t11;
  t12.proxyB = input.get$proxyB();
  t12.useRadii = false;
  for (var t1 = this.xfA, t2 = this.xfB, t5 = this.pool, t6 = this.distanceOutput, t7 = target + 0.00125, t8 = this.fcn, t9 = this.indexes, t11 = target - 0.00125, iter = 0, t13 = 0; true;) {
    t3.getTransform$2(t1, t13);
    t4.getTransform$2(t2, t13);
    t12.transformA = t1;
    t12.transformB = t2;
    t5.get$distance().distance$3(t6, t10, t12);
    var t14 = t6.distance;
    if (typeof t14 !== 'number')
      return this.timeOfImpact$2$bailout(5, output, t10, t4, t12, target, t1, t7, t2, proxyA, proxyB, t6, t5, t8, iter, tMax, t14, t9, t13, t11, t3, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    if (t14 <= 0) {
      output.set$state(2);
      output.set$t(0);
      break;
    }
    if (t14 < t7) {
      output.set$state(3);
      output.set$t(t13);
      break;
    }
    t8.initialize$6(t10, proxyA, t3, proxyB, t4, t13);
    for (var t20 = tMax, pushBackIter = 0; done = false, true;) {
      var s2 = t8.findMinSeparation$2(t9, t20);
      if (typeof s2 !== 'number')
        return this.timeOfImpact$2$bailout(7, output, t10, t12, target, pushBackIter, t1, t7, t2, t3, proxyA, s2, proxyB, t6, t5, t8, iter, tMax, t9, t13, t11, t4, t20, 0, 0, 0, 0, 0, 0, 0);
      if (s2 > t7) {
        output.set$state(4);
        output.set$t(tMax);
        var done = true;
        break;
      }
      if (s2 > t11) {
        t13 = t20;
        done = false;
        break;
      }
      t14 = t9.length;
      if (0 >= t14)
        throw $.ioore(0);
      var t15 = t9[0];
      if (1 >= t14)
        throw $.ioore(1);
      var s1 = t8.evaluate$3(t15, t9[1], t13);
      if (typeof s1 !== 'number')
        return this.timeOfImpact$2$bailout(8, output, t10, t12, target, pushBackIter, t1, t7, t2, s1, proxyA, s2, proxyB, t6, t5, t3, t8, iter, tMax, t9, t13, t11, t4, t20, 0, 0, 0, 0, 0, 0);
      if (s1 < t11) {
        output.set$state(1);
        output.set$t(t13);
        done = true;
        break;
      }
      if (s1 <= t7) {
        output.set$state(3);
        output.set$t(t13);
        done = true;
        break;
      }
      for (var a1 = t13, a2 = t20, rootIterCount = 0; true;) {
        var t = (rootIterCount & 1) === 1 ? a1 + (target - s1) * (a2 - a1) / (s2 - s1) : 0.5 * (a1 + a2);
        t14 = t9.length;
        if (0 >= t14)
          throw $.ioore(0);
        t15 = t9[0];
        if (1 >= t14)
          throw $.ioore(1);
        var s = t8.evaluate$3(t15, t9[1], t);
        if (typeof s !== 'number')
          return this.timeOfImpact$2$bailout(9, output, pushBackIter, rootIterCount, s2, a2, proxyA, a1, proxyB, s1, tMax, t3, t11, t4, t10, t12, target, t1, t7, t2, t5, t6, t, t8, iter, t9, t13, s, t20, 0);
        t14 = $.abs(s - target);
        if (typeof t14 !== 'number')
          return this.timeOfImpact$2$bailout(10, output, t14, pushBackIter, rootIterCount, s2, a2, proxyA, a1, proxyB, s1, tMax, t3, t11, t4, t10, t12, target, t1, t7, t2, t5, t6, t, t8, iter, t9, t13, s, t20);
        if (t14 < 0.00125) {
          t20 = t;
          break;
        }
        if (s > target) {
          s1 = s;
          a1 = t;
        } else {
          a2 = t;
          s2 = s;
        }
        if (a1 !== (a1 | 0))
          return this.timeOfImpact$2$bailout(11, output, pushBackIter, rootIterCount, proxyA, proxyB, s2, a2, a1, s1, tMax, t3, t11, t4, t10, t12, target, t1, t7, t2, t5, t6, t8, iter, t9, t13, t20, 0, 0, 0);
        ++rootIterCount;
        t15 = $.TimeOfImpact_toiRootIters;
        if (typeof t15 !== 'number')
          return this.timeOfImpact$2$bailout(12, output, pushBackIter, proxyA, proxyB, s2, a2, a1, s1, rootIterCount, t15, tMax, t3, t11, t4, t10, t12, target, t1, t7, t2, t5, t6, t8, iter, t9, t13, t20, 0, 0);
        $.TimeOfImpact_toiRootIters = t15 + 1;
        if (rootIterCount === 50)
          break;
      }
      if (t20 !== (t20 | 0))
        return this.timeOfImpact$2$bailout(13, output, t10, t12, pushBackIter, target, t1, t7, t2, proxyA, proxyB, rootIterCount, t6, t5, t20, t8, iter, tMax, t9, t13, t11, t4, t3, 0, 0, 0, 0, 0, 0, 0);
      $.TimeOfImpact_toiMaxRootIters = $.max($.TimeOfImpact_toiMaxRootIters, rootIterCount);
      ++pushBackIter;
      if (pushBackIter === 8) {
        done = false;
        break;
      }
    }
    ++iter;
    t14 = $.TimeOfImpact_toiIters;
    if (typeof t14 !== 'number')
      return this.timeOfImpact$2$bailout(14, output, t13, t10, t12, target, t1, t7, iter, t14, t2, proxyA, proxyB, t5, t6, t4, t8, tMax, t9, t3, done, t11, 0, 0, 0, 0, 0, 0, 0, 0);
    $.TimeOfImpact_toiIters = t14 + 1;
    if (done)
      break;
    if (iter === 1000) {
      output.set$state(1);
      output.set$t(t13);
      break;
    }
  }
  $.TimeOfImpact_toiMaxIters = $.max($.TimeOfImpact_toiMaxIters, iter);
},
 timeOfImpact$2$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13, env14, env15, env16, env17, env18, env19, env20, env21, env22, env23, env24, env25, env26, env27, env28) {
  switch (state) {
    case 1:
      var output = env0;
      var input = env1;
      t1 = env2;
      break;
    case 2:
      output = env0;
      input = env1;
      tMax = env2;
      t3 = env3;
      t4 = env4;
      proxyA = env5;
      proxyB = env6;
      break;
    case 3:
      output = env0;
      input = env1;
      tMax = env2;
      t6 = env3;
      t3 = env4;
      t4 = env5;
      proxyA = env6;
      proxyB = env7;
      break;
    case 4:
      output = env0;
      input = env1;
      tMax = env2;
      t6 = env3;
      t8 = env4;
      t3 = env5;
      t4 = env6;
      proxyA = env7;
      proxyB = env8;
      break;
    case 5:
      output = env0;
      t10 = env1;
      t4 = env2;
      t12 = env3;
      target = env4;
      t1 = env5;
      t7 = env6;
      t2 = env7;
      proxyA = env8;
      proxyB = env9;
      t6 = env10;
      t5 = env11;
      t8 = env12;
      iter = env13;
      tMax = env14;
      t14 = env15;
      t9 = env16;
      t13 = env17;
      t11 = env18;
      t3 = env19;
      break;
    case 6:
      output = env0;
      t10 = env1;
      t12 = env2;
      target = env3;
      t14 = env4;
      t1 = env5;
      t7 = env6;
      t2 = env7;
      proxyA = env8;
      proxyB = env9;
      t5 = env10;
      t6 = env11;
      t8 = env12;
      iter = env13;
      tMax = env14;
      t9 = env15;
      t13 = env16;
      t11 = env17;
      t4 = env18;
      t3 = env19;
      break;
    case 7:
      output = env0;
      t10 = env1;
      t12 = env2;
      target = env3;
      pushBackIter = env4;
      t1 = env5;
      t7 = env6;
      t2 = env7;
      t3 = env8;
      proxyA = env9;
      s2 = env10;
      proxyB = env11;
      t6 = env12;
      t5 = env13;
      t8 = env14;
      iter = env15;
      tMax = env16;
      t9 = env17;
      t13 = env18;
      t11 = env19;
      t4 = env20;
      t20 = env21;
      break;
    case 8:
      output = env0;
      t10 = env1;
      t12 = env2;
      target = env3;
      pushBackIter = env4;
      t1 = env5;
      t7 = env6;
      t2 = env7;
      s1 = env8;
      proxyA = env9;
      s2 = env10;
      proxyB = env11;
      t6 = env12;
      t5 = env13;
      t3 = env14;
      t8 = env15;
      iter = env16;
      tMax = env17;
      t9 = env18;
      t13 = env19;
      t11 = env20;
      t4 = env21;
      t20 = env22;
      break;
    case 9:
      output = env0;
      pushBackIter = env1;
      rootIterCount = env2;
      s2 = env3;
      a2 = env4;
      proxyA = env5;
      a1 = env6;
      proxyB = env7;
      s1 = env8;
      tMax = env9;
      t3 = env10;
      t11 = env11;
      t4 = env12;
      t10 = env13;
      t12 = env14;
      target = env15;
      t1 = env16;
      t7 = env17;
      t2 = env18;
      t5 = env19;
      t6 = env20;
      t = env21;
      t8 = env22;
      iter = env23;
      t9 = env24;
      t13 = env25;
      s = env26;
      t20 = env27;
      break;
    case 10:
      output = env0;
      t14 = env1;
      pushBackIter = env2;
      rootIterCount = env3;
      s2 = env4;
      a2 = env5;
      proxyA = env6;
      a1 = env7;
      proxyB = env8;
      s1 = env9;
      tMax = env10;
      t3 = env11;
      t11 = env12;
      t4 = env13;
      t10 = env14;
      t12 = env15;
      target = env16;
      t1 = env17;
      t7 = env18;
      t2 = env19;
      t5 = env20;
      t6 = env21;
      t = env22;
      t8 = env23;
      iter = env24;
      t9 = env25;
      t13 = env26;
      s = env27;
      t20 = env28;
      break;
    case 11:
      output = env0;
      pushBackIter = env1;
      rootIterCount = env2;
      proxyA = env3;
      proxyB = env4;
      s2 = env5;
      a2 = env6;
      a1 = env7;
      s1 = env8;
      tMax = env9;
      t3 = env10;
      t11 = env11;
      t4 = env12;
      t10 = env13;
      t12 = env14;
      target = env15;
      t1 = env16;
      t7 = env17;
      t2 = env18;
      t5 = env19;
      t6 = env20;
      t8 = env21;
      iter = env22;
      t9 = env23;
      t13 = env24;
      t20 = env25;
      break;
    case 12:
      output = env0;
      pushBackIter = env1;
      proxyA = env2;
      proxyB = env3;
      s2 = env4;
      a2 = env5;
      a1 = env6;
      s1 = env7;
      rootIterCount = env8;
      t15 = env9;
      tMax = env10;
      t3 = env11;
      t11 = env12;
      t4 = env13;
      t10 = env14;
      t12 = env15;
      target = env16;
      t1 = env17;
      t7 = env18;
      t2 = env19;
      t5 = env20;
      t6 = env21;
      t8 = env22;
      iter = env23;
      t9 = env24;
      t13 = env25;
      t20 = env26;
      break;
    case 13:
      output = env0;
      t10 = env1;
      t12 = env2;
      pushBackIter = env3;
      target = env4;
      t1 = env5;
      t7 = env6;
      t2 = env7;
      proxyA = env8;
      proxyB = env9;
      rootIterCount = env10;
      t6 = env11;
      t5 = env12;
      t20 = env13;
      t8 = env14;
      iter = env15;
      tMax = env16;
      t9 = env17;
      t13 = env18;
      t11 = env19;
      t4 = env20;
      t3 = env21;
      break;
    case 14:
      output = env0;
      t13 = env1;
      t10 = env2;
      t12 = env3;
      target = env4;
      t1 = env5;
      t7 = env6;
      iter = env7;
      t14 = env8;
      t2 = env9;
      proxyA = env10;
      proxyB = env11;
      t5 = env12;
      t6 = env13;
      t4 = env14;
      t8 = env15;
      tMax = env16;
      t9 = env17;
      t3 = env18;
      done = env19;
      t11 = env20;
      break;
  }
  switch (state) {
    case 0:
      var t1 = $.TimeOfImpact_toiCalls;
    case 1:
      state = 0;
      $.TimeOfImpact_toiCalls = $.add(t1, 1);
      output.set$state(0);
      output.set$t(input.get$tMax());
      var proxyA = input.get$proxyA();
      var proxyB = input.get$proxyB();
      var t3 = this.sweepA;
      t3.setFrom$1(input.get$sweepA());
      var t4 = this.sweepB;
      t4.setFrom$1(input.get$sweepB());
      t3.normalize$0();
      t4.normalize$0();
      var tMax = input.get$tMax();
    case 2:
      state = 0;
      var t6 = proxyA.get$radius();
    case 3:
      state = 0;
      var t8 = proxyB.get$radius();
    case 4:
      state = 0;
      var target = $.max(0.005, $.sub($.add(t6, t8), 0.015));
      var t10 = this.cache;
      t10.set$count(0);
      var t11 = input.get$proxyA();
      var t12 = this.distanceInput;
      t12.set$proxyA(t11);
      t12.set$proxyB(input.get$proxyB());
      t12.set$useRadii(false);
      t1 = this.xfA;
      var t2 = this.xfB;
      var t5 = this.pool;
      t6 = this.distanceOutput;
      var t7 = target + 0.00125;
      t8 = this.fcn;
      var t9 = this.indexes;
      t11 = target - 0.00125;
      var iter = 0;
      var t13 = 0;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!true)
                break L0;
              t3.getTransform$2(t1, t13);
              t4.getTransform$2(t2, t13);
              t12.set$transformA(t1);
              t12.set$transformB(t2);
              t5.get$distance().distance$3(t6, t10, t12);
              var t14 = t6.get$distance();
            case 5:
              state = 0;
              if ($.leB(t14, 0)) {
                output.set$state(2);
                output.set$t(0);
                break L0;
              }
              t14 = t6.get$distance();
            case 6:
              state = 0;
              if ($.ltB(t14, t7)) {
                output.set$state(3);
                output.set$t(t13);
                break L0;
              }
              t8.initialize$6(t10, proxyA, t3, proxyB, t4, t13);
              var t20 = tMax;
              var pushBackIter = 0;
            default:
              L1:
                while (true)
                  switch (state) {
                    case 0:
                      var done = false;
                      if (!true)
                        break L1;
                      var s2 = t8.findMinSeparation$2(t9, t20);
                    case 7:
                      state = 0;
                      if ($.gtB(s2, t7)) {
                        output.set$state(4);
                        output.set$t(tMax);
                        done = true;
                        break L1;
                      }
                      if ($.gtB(s2, t11)) {
                        t13 = t20;
                        done = false;
                        break L1;
                      }
                      if (0 < 0 || 0 >= t9.length)
                        throw $.ioore(0);
                      t14 = t9[0];
                      if (1 < 0 || 1 >= t9.length)
                        throw $.ioore(1);
                      var s1 = t8.evaluate$3(t14, t9[1], t13);
                    case 8:
                      state = 0;
                      if ($.ltB(s1, t11)) {
                        output.set$state(1);
                        output.set$t(t13);
                        done = true;
                        break L1;
                      }
                      if ($.leB(s1, t7)) {
                        output.set$state(3);
                        output.set$t(t13);
                        done = true;
                        break L1;
                      }
                      var a1 = t13;
                      var a2 = t20;
                      var rootIterCount = 0;
                    default:
                      L2:
                        while (true)
                          switch (state) {
                            case 0:
                              if (!true)
                                break L2;
                              if ((rootIterCount & 1) === 1) {
                                if (typeof s1 !== 'number')
                                  throw $.iae(s1);
                                t14 = target - s1;
                                var t15 = $.sub(a2, a1);
                                if (typeof t15 !== 'number')
                                  throw $.iae(t15);
                                t15 = t14 * t15;
                                t14 = $.sub(s2, s1);
                                if (typeof t14 !== 'number')
                                  throw $.iae(t14);
                                var t = $.add(a1, t15 / t14);
                              } else {
                                t14 = $.add(a1, a2);
                                if (typeof t14 !== 'number')
                                  throw $.iae(t14);
                                t = 0.5 * t14;
                              }
                              if (0 < 0 || 0 >= t9.length)
                                throw $.ioore(0);
                              t14 = t9[0];
                              if (1 < 0 || 1 >= t9.length)
                                throw $.ioore(1);
                              var s = t8.evaluate$3(t14, t9[1], t);
                            case 9:
                              state = 0;
                              t14 = $.abs($.sub(s, target));
                            case 10:
                              state = 0;
                              if ($.ltB(t14, 0.00125)) {
                                t20 = t;
                                break L2;
                              }
                              if ($.gtB(s, target)) {
                                s1 = s;
                                a1 = t;
                              } else {
                                a2 = t;
                                s2 = s;
                              }
                            case 11:
                              state = 0;
                              ++rootIterCount;
                              t15 = $.TimeOfImpact_toiRootIters;
                            case 12:
                              state = 0;
                              $.TimeOfImpact_toiRootIters = $.add(t15, 1);
                              if (rootIterCount === 50)
                                break L2;
                          }
                    case 13:
                      state = 0;
                      $.TimeOfImpact_toiMaxRootIters = $.max($.TimeOfImpact_toiMaxRootIters, rootIterCount);
                      ++pushBackIter;
                      if (pushBackIter === 8) {
                        done = false;
                        break L1;
                      }
                  }
              ++iter;
              t14 = $.TimeOfImpact_toiIters;
            case 14:
              state = 0;
              $.TimeOfImpact_toiIters = $.add(t14, 1);
              if (done)
                break L0;
              if (iter === 1000) {
                output.set$state(1);
                output.set$t(t13);
                break L0;
              }
          }
      $.TimeOfImpact_toiMaxIters = $.max($.TimeOfImpact_toiMaxIters, iter);
  }
},
 get$timeOfImpact: function() { return new $.BoundClosure4(this, 'timeOfImpact$2'); },
 TimeOfImpact$_construct$1: function(argPool) {
  var t1 = this.indexes;
  if (0 < 0 || 0 >= t1.length)
    throw $.ioore(0);
  t1[0] = 0;
  if (1 < 0 || 1 >= t1.length)
    throw $.ioore(1);
  t1[1] = 0;
  $.TimeOfImpact_toiCalls = 0;
  $.TimeOfImpact_toiIters = 0;
  $.TimeOfImpact_toiMaxIters = 0;
  $.TimeOfImpact_toiRootIters = 0;
  $.TimeOfImpact_toiMaxRootIters = 0;
}
};

$$.SeparationFunction = {"":
 ["proxyA=", "proxyB=", "type=", "localPoint?", "axis", "sweepA?", "sweepB?", "localPointA", "localPointB", "pointA?", "pointB?", "localPointA1", "localPointA2", "normal?", "localPointB1", "localPointB2", "axisA", "axisB", "temp", "xfa", "xfb"],
 "super": "Object",
 initialize$6: function(cache, argProxyA, argSweepA, argProxyB, argSweepB, t1) {
  this.proxyA = argProxyA;
  this.proxyB = argProxyB;
  var count = cache.get$count();
  this.sweepA = argSweepA;
  this.sweepB = argSweepB;
  var t2 = this.sweepA;
  var t3 = this.xfa;
  t2.getTransform$2(t3, t1);
  t2 = this.sweepB;
  var t4 = this.xfb;
  t2.getTransform$2(t4, t1);
  if ($.eqB(count, 1)) {
    this.type = 0;
    t1 = this.localPointA;
    t1.setFrom$1($.index(this.proxyA.get$vertices(), $.index(cache.get$indexA(), 0)));
    t2 = this.localPointB;
    t2.setFrom$1($.index(this.proxyB.get$vertices(), $.index(cache.get$indexB(), 0)));
    var t5 = this.pointA;
    $.Transform_mulToOut(t3, t1, t5);
    t1 = this.pointB;
    $.Transform_mulToOut(t4, t2, t1);
    t2 = this.axis;
    t2.setFrom$1(t1).subLocal$1(t5);
    return t2.normalize$0();
  } else {
    t1 = $.eqB($.index(cache.get$indexA(), 0), $.index(cache.get$indexA(), 1));
    t2 = this.pointA;
    t5 = this.localPoint;
    var t6 = this.normal;
    var t7 = this.axis;
    var t8 = this.pointB;
    var t9 = this.temp;
    if (t1) {
      this.type = 2;
      t1 = this.localPointB1;
      t1.setFrom$1($.index(this.proxyB.get$vertices(), $.index(cache.get$indexB(), 0)));
      var t10 = this.localPointB2;
      t10.setFrom$1($.index(this.proxyB.get$vertices(), $.index(cache.get$indexB(), 1)));
      t9.setFrom$1(t10).subLocal$1(t1);
      $.Vector_crossVectorAndNumToOut(t9, 1, t7);
      t7.normalize$0();
      $.Matrix22_mulMatrixAndVectorToOut(t4.get$rotation(), t7, t6);
      t5.setFrom$1(t1);
      t5.addLocal$1(t10);
      t5.mulLocal$1(0.5);
      $.Transform_mulToOut(t4, t5, t8);
      t5 = this.localPointA;
      t5.setFrom$1($.index(this.proxyA.get$vertices(), $.index(cache.get$indexA(), 0)));
      $.Transform_mulToOut(t3, t5, t2);
      t9.setFrom$1(t2);
      t9.subLocal$1(t8);
      var s = $.add($.mul(t9.get$x(), t6.get$x()), $.mul(t9.get$y(), t6.get$y()));
      if ($.ltB(s, 0.0)) {
        t7.negateLocal$0();
        s = $.neg(s);
      }
      return s;
    } else {
      this.type = 1;
      t1 = this.localPointA1;
      t1.setFrom$1($.index(this.proxyA.get$vertices(), $.index(cache.get$indexA(), 0)));
      t10 = this.localPointA2;
      t10.setFrom$1($.index(this.proxyA.get$vertices(), $.index(cache.get$indexA(), 1)));
      t9.setFrom$1(t10);
      t9.subLocal$1(t1);
      $.Vector_crossVectorAndNumToOut(t9, 1.0, t7);
      t7.normalize$0();
      $.Matrix22_mulMatrixAndVectorToOut(t3.get$rotation(), t7, t6);
      t5.setFrom$1(t1);
      t5.addLocal$1(t10);
      t5.mulLocal$1(0.5);
      $.Transform_mulToOut(t3, t5, t2);
      t5 = this.localPointB;
      t5.setFrom$1($.index(this.proxyB.get$vertices(), $.index(cache.get$indexB(), 0)));
      $.Transform_mulToOut(t4, t5, t8);
      t9.setFrom$1(t8);
      t9.subLocal$1(t2);
      s = $.add($.mul(t9.get$x(), t6.get$x()), $.mul(t9.get$y(), t6.get$y()));
      if ($.ltB(s, 0.0)) {
        t7.negateLocal$0();
        s = $.neg(s);
      }
      return s;
    }
  }
},
 findMinSeparation$2: function(indexes, t) {
  var t1 = this.sweepA;
  var t2 = this.xfa;
  t1.getTransform$2(t2, t);
  t1 = this.sweepB;
  var t3 = this.xfb;
  t1.getTransform$2(t3, t);
  switch (this.type) {
    case 0:
      t1 = t2.get$rotation();
      var t4 = this.axis;
      var t5 = this.axisA;
      $.Matrix22_mulTransMatrixAndVectorToOut(t1, t4, t5);
      t1 = t3.get$rotation();
      var t6 = t4.negateLocal$0();
      var t7 = this.axisB;
      $.Matrix22_mulTransMatrixAndVectorToOut(t1, t6, t7);
      t4.negateLocal$0();
      $.indexSet(indexes, 0, this.proxyA.getSupport$1(t5));
      $.indexSet(indexes, 1, this.proxyB.getSupport$1(t7));
      t6 = this.localPointA;
      t6.setFrom$1($.index(this.proxyA.get$vertices(), $.index(indexes, 0)));
      t1 = this.localPointB;
      t1.setFrom$1($.index(this.proxyB.get$vertices(), $.index(indexes, 1)));
      var t8 = this.pointA;
      $.Transform_mulToOut(t2, t6, t8);
      t6 = this.pointB;
      $.Transform_mulToOut(t3, t1, t6);
      t8 = t6.subLocal$1(t8);
      return $.add($.mul(t8.get$x(), t4.get$x()), $.mul(t8.get$y(), t4.get$y()));
    case 1:
      t1 = t2.get$rotation();
      t4 = this.axis;
      t5 = this.normal;
      $.Matrix22_mulMatrixAndVectorToOut(t1, t4, t5);
      t4 = this.localPoint;
      t1 = this.pointA;
      $.Transform_mulToOut(t2, t4, t1);
      t5.negateLocal$0();
      t4 = t3.get$rotation();
      t2 = this.axisB;
      $.Matrix22_mulTransMatrixAndVectorToOut(t4, t5, t2);
      t5.negateLocal$0();
      $.indexSet(indexes, 0, -1);
      $.indexSet(indexes, 1, this.proxyB.getSupport$1(t2));
      t4 = this.localPointB;
      t4.setFrom$1($.index(this.proxyB.get$vertices(), $.index(indexes, 1)));
      t6 = this.pointB;
      $.Transform_mulToOut(t3, t4, t6);
      t1 = t6.subLocal$1(t1);
      return $.add($.mul(t1.get$x(), t5.get$x()), $.mul(t1.get$y(), t5.get$y()));
    case 2:
      t1 = t3.get$rotation();
      t4 = this.axis;
      t5 = this.normal;
      $.Matrix22_mulMatrixAndVectorToOut(t1, t4, t5);
      t4 = this.localPoint;
      t1 = this.pointB;
      $.Transform_mulToOut(t3, t4, t1);
      t4 = t2.get$rotation();
      t3 = t5.negateLocal$0();
      t6 = this.axisA;
      $.Matrix22_mulTransMatrixAndVectorToOut(t4, t3, t6);
      t5.negateLocal$0();
      $.indexSet(indexes, 1, -1);
      $.indexSet(indexes, 0, this.proxyA.getSupport$1(t6));
      t3 = this.localPointA;
      t3.setFrom$1($.index(this.proxyA.get$vertices(), $.index(indexes, 0)));
      t4 = this.pointA;
      $.Transform_mulToOut(t2, t3, t4);
      t1 = t4.subLocal$1(t1);
      return $.add($.mul(t1.get$x(), t5.get$x()), $.mul(t1.get$y(), t5.get$y()));
    default:
      $.indexSet(indexes, 0, -1);
      $.indexSet(indexes, 1, -1);
      return 0;
  }
},
 evaluate$3: function(indexA, indexB, t) {
  var t1 = this.sweepA;
  var t2 = this.xfa;
  t1.getTransform$2(t2, t);
  t1 = this.sweepB;
  var t3 = this.xfb;
  t1.getTransform$2(t3, t);
  switch (this.type) {
    case 0:
      t1 = t2.get$rotation();
      var t4 = this.axis;
      $.Matrix22_mulTransMatrixAndVectorToOut(t1, t4, this.axisA);
      $.Matrix22_mulTransMatrixAndVectorToOut(t3.get$rotation(), t4.negateLocal$0(), this.axisB);
      t4.negateLocal$0();
      t1 = this.localPointA;
      t1.setFrom$1($.index(this.proxyA.get$vertices(), indexA));
      var t5 = this.localPointB;
      t5.setFrom$1($.index(this.proxyB.get$vertices(), indexB));
      var t6 = this.pointA;
      $.Transform_mulToOut(t2, t1, t6);
      t1 = this.pointB;
      $.Transform_mulToOut(t3, t5, t1);
      t6 = t1.subLocal$1(t6);
      return $.add($.mul(t6.get$x(), t4.get$x()), $.mul(t6.get$y(), t4.get$y()));
    case 1:
      t1 = t2.get$rotation();
      t4 = this.axis;
      t5 = this.normal;
      $.Matrix22_mulMatrixAndVectorToOut(t1, t4, t5);
      t4 = this.localPoint;
      t1 = this.pointA;
      $.Transform_mulToOut(t2, t4, t1);
      t5.negateLocal$0();
      $.Matrix22_mulTransMatrixAndVectorToOut(t3.get$rotation(), t5, this.axisB);
      t5.negateLocal$0();
      t4 = this.localPointB;
      t4.setFrom$1($.index(this.proxyB.get$vertices(), indexB));
      t2 = this.pointB;
      $.Transform_mulToOut(t3, t4, t2);
      t1 = t2.subLocal$1(t1);
      return $.add($.mul(t1.get$x(), t5.get$x()), $.mul(t1.get$y(), t5.get$y()));
    case 2:
      t1 = t3.get$rotation();
      t4 = this.axis;
      t5 = this.normal;
      $.Matrix22_mulMatrixAndVectorToOut(t1, t4, t5);
      t4 = this.localPoint;
      t1 = this.pointB;
      $.Transform_mulToOut(t3, t4, t1);
      $.Matrix22_mulTransMatrixAndVectorToOut(t2.get$rotation(), t5.negateLocal$0(), this.axisA);
      t5.negateLocal$0();
      t4 = this.localPointA;
      t4.setFrom$1($.index(this.proxyA.get$vertices(), indexA));
      t3 = this.pointA;
      $.Transform_mulToOut(t2, t4, t3);
      t1 = t3.subLocal$1(t1);
      return $.add($.mul(t1.get$x(), t5.get$x()), $.mul(t1.get$y(), t5.get$y()));
    default:
      return 0;
  }
}
};

$$.TimeOfImpactInput = {"":
 ["proxyA?", "proxyB?", "sweepA?", "sweepB?", "tMax="],
 "super": "Object"
};

$$.TimeOfImpactOutput = {"":
 ["state=", "t="],
 "super": "Object"
};

$$.WorldManifold = {"":
 ["normal?", "points?", "pool3", "pool4"],
 "super": "Object",
 initialize$5: function(manifold, xfA, radiusA, xfB, radiusB) {
  switch (manifold.get$type()) {
    case 0:
      var pointA = this.pool3;
      var pointB = this.pool4;
      var t1 = this.normal;
      t1.set$x(1);
      t1.set$y(0);
      pointA.set$x($.add($.add(xfA.get$position().get$x(), $.mul(xfA.get$rotation().get$col1().get$x(), manifold.get$localPoint().get$x())), $.mul(xfA.get$rotation().get$col2().get$x(), manifold.get$localPoint().get$y())));
      pointA.set$y($.add($.add(xfA.get$position().get$y(), $.mul(xfA.get$rotation().get$col1().get$y(), manifold.get$localPoint().get$x())), $.mul(xfA.get$rotation().get$col2().get$y(), manifold.get$localPoint().get$y())));
      pointB.set$x($.add($.add(xfB.get$position().get$x(), $.mul(xfB.get$rotation().get$col1().get$x(), $.index(manifold.get$points(), 0).get$localPoint().get$x())), $.mul(xfB.get$rotation().get$col2().get$x(), $.index(manifold.get$points(), 0).get$localPoint().get$y())));
      pointB.set$y($.add($.add(xfB.get$position().get$y(), $.mul(xfB.get$rotation().get$col1().get$y(), $.index(manifold.get$points(), 0).get$localPoint().get$x())), $.mul(xfB.get$rotation().get$col2().get$y(), $.index(manifold.get$points(), 0).get$localPoint().get$y())));
      if ($.gtB($.MathBox_distanceSquared(pointA, pointB), 1.4208639999999999e-14)) {
        t1.set$x($.sub(pointB.get$x(), pointA.get$x()));
        t1.set$y($.sub(pointB.get$y(), pointA.get$y()));
        t1.normalize$0();
      }
      var cAx = $.add($.mul(t1.get$x(), radiusA), pointA.get$x());
      var cAy = $.add($.mul(t1.get$y(), radiusA), pointA.get$y());
      var cBx = $.add($.mul($.neg(t1.get$x()), radiusB), pointB.get$x());
      var cBy = $.add($.mul($.neg(t1.get$y()), radiusB), pointB.get$y());
      var t2 = $.mul($.add(cAx, cBx), 0.5);
      var t3 = this.points;
      $.index(t3, 0).set$x(t2);
      t2 = $.mul($.add(cAy, cBy), 0.5);
      $.index(t3, 0).set$y(t2);
      return;
    case 1:
      var planePoint = this.pool3;
      t1 = $.add($.mul(xfA.get$rotation().get$col1().get$x(), manifold.get$localNormal().get$x()), $.mul(xfA.get$rotation().get$col2().get$x(), manifold.get$localNormal().get$y()));
      t2 = this.normal;
      t2.set$x(t1);
      t2.set$y($.add($.mul(xfA.get$rotation().get$col1().get$y(), manifold.get$localNormal().get$x()), $.mul(xfA.get$rotation().get$col2().get$y(), manifold.get$localNormal().get$y())));
      planePoint.set$x($.add($.add(xfA.get$position().get$x(), $.mul(xfA.get$rotation().get$col1().get$x(), manifold.get$localPoint().get$x())), $.mul(xfA.get$rotation().get$col2().get$x(), manifold.get$localPoint().get$y())));
      planePoint.set$y($.add($.add(xfA.get$position().get$y(), $.mul(xfA.get$rotation().get$col1().get$y(), manifold.get$localPoint().get$x())), $.mul(xfA.get$rotation().get$col2().get$y(), manifold.get$localPoint().get$y())));
      var clipPoint = this.pool4;
      for (var t1 = this.points, i = 0; $.ltB(i, manifold.get$pointCount()); ++i) {
        clipPoint.set$x($.add($.add(xfB.get$position().get$x(), $.mul(xfB.get$rotation().get$col1().get$x(), $.index(manifold.get$points(), i).get$localPoint().get$x())), $.mul(xfB.get$rotation().get$col2().get$x(), $.index(manifold.get$points(), i).get$localPoint().get$y())));
        clipPoint.set$y($.add($.add(xfB.get$position().get$y(), $.mul(xfB.get$rotation().get$col1().get$y(), $.index(manifold.get$points(), i).get$localPoint().get$x())), $.mul(xfB.get$rotation().get$col2().get$y(), $.index(manifold.get$points(), i).get$localPoint().get$y())));
        var scalar = $.sub(radiusA, $.add($.mul($.sub(clipPoint.get$x(), planePoint.get$x()), t2.get$x()), $.mul($.sub(clipPoint.get$y(), planePoint.get$y()), t2.get$y())));
        cAx = $.add($.mul(t2.get$x(), scalar), clipPoint.get$x());
        cAy = $.add($.mul(t2.get$y(), scalar), clipPoint.get$y());
        cBx = $.add($.mul($.neg(t2.get$x()), radiusB), clipPoint.get$x());
        cBy = $.add($.mul($.neg(t2.get$y()), radiusB), clipPoint.get$y());
        t3 = $.mul($.add(cAx, cBx), 0.5);
        $.index(t1, i).set$x(t3);
        t3 = $.mul($.add(cAy, cBy), 0.5);
        $.index(t1, i).set$y(t3);
      }
      return;
    case 2:
      planePoint = this.pool3;
      var R = xfB.get$rotation();
      t1 = $.add($.mul(R.get$col1().get$x(), manifold.get$localNormal().get$x()), $.mul(R.get$col2().get$x(), manifold.get$localNormal().get$y()));
      t2 = this.normal;
      t2.set$x(t1);
      t2.set$y($.add($.mul(R.get$col1().get$y(), manifold.get$localNormal().get$x()), $.mul(R.get$col2().get$y(), manifold.get$localNormal().get$y())));
      var v = manifold.get$localPoint();
      planePoint.set$x($.add($.add(xfB.get$position().get$x(), $.mul(xfB.get$rotation().get$col1().get$x(), v.get$x())), $.mul(xfB.get$rotation().get$col2().get$x(), v.get$y())));
      planePoint.set$y($.add($.add(xfB.get$position().get$y(), $.mul(xfB.get$rotation().get$col1().get$y(), v.get$x())), $.mul(xfB.get$rotation().get$col2().get$y(), v.get$y())));
      clipPoint = this.pool4;
      for (t1 = this.points, i = 0; $.ltB(i, manifold.get$pointCount()); ++i) {
        clipPoint.set$x($.add($.add(xfA.get$position().get$x(), $.mul(xfA.get$rotation().get$col1().get$x(), $.index(manifold.get$points(), i).get$localPoint().get$x())), $.mul(xfA.get$rotation().get$col2().get$x(), $.index(manifold.get$points(), i).get$localPoint().get$y())));
        clipPoint.set$y($.add($.add(xfA.get$position().get$y(), $.mul(xfA.get$rotation().get$col1().get$y(), $.index(manifold.get$points(), i).get$localPoint().get$x())), $.mul(xfA.get$rotation().get$col2().get$y(), $.index(manifold.get$points(), i).get$localPoint().get$y())));
        scalar = $.sub(radiusB, $.add($.mul($.sub(clipPoint.get$x(), planePoint.get$x()), t2.get$x()), $.mul($.sub(clipPoint.get$y(), planePoint.get$y()), t2.get$y())));
        cBx = $.add($.mul(t2.get$x(), scalar), clipPoint.get$x());
        cBy = $.add($.mul(t2.get$y(), scalar), clipPoint.get$y());
        cAx = $.add($.mul($.neg(t2.get$x()), radiusA), clipPoint.get$x());
        cAy = $.add($.mul($.neg(t2.get$y()), radiusA), clipPoint.get$y());
        t3 = $.mul($.add(cAx, cBx), 0.5);
        $.index(t1, i).set$x(t3);
        t3 = $.mul($.add(cAy, cBy), 0.5);
        $.index(t1, i).set$y(t3);
      }
      t2.set$x($.neg(t2.get$x()));
      t2.set$y($.neg(t2.get$y()));
      break;
  }
},
 WorldManifold$0: function() {
  for (var t1 = this.points, i = 0; i < 2; ++i) {
    var t2 = $.Vector$(0, 0);
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i] = t2;
  }
}
};

$$.BroadPhase = {"":
 ["_tree", "proxyCount", "moveBuffer", "_pairBuffer", "_pairCapacity", "_pairCount", "queryProxy"],
 "super": "Object",
 createProxy$2: function(box, userData) {
  var node = this._tree.createProxy$2(box, userData);
  this.proxyCount = this.proxyCount + 1;
  this._bufferMove$1(node);
  return node;
},
 moveProxy$3: function(proxy, box, displacement) {
  if (this._tree.moveProxy$3(proxy, box, displacement) === true)
    this._bufferMove$1(proxy);
},
 testOverlap$2: function(proxyA, proxyB) {
  return $.AxisAlignedBox_testOverlap(proxyA.get$box(), proxyB.get$box());
},
 updatePairs$1: function(callback) {
  this._pairCount = 0;
  for (var t1 = this._tree, i = 0; i < this.moveBuffer.length; ++i) {
    var t2 = this.moveBuffer;
    if (i < 0 || i >= t2.length)
      throw $.ioore(i);
    this.queryProxy = t2[i];
    t2 = this.queryProxy;
    if (t2 == null)
      continue;
    t1.query$2(this, t2.get$box());
  }
  this.moveBuffer = $.ListImplementation_List(null, 'DynamicTreeNode');
  var pairBuffer = $.ListImplementation_List$from($.getRange(this._pairBuffer, 0, this._pairCount));
  $.sort(pairBuffer, new $.BroadPhase_updatePairs_anon());
  $.setRange$3(this._pairBuffer, 0, this._pairCount, pairBuffer);
  for (i = 0; i < this._pairCount;) {
    t2 = this._pairBuffer;
    if (i < 0 || i >= t2.length)
      throw $.ioore(i);
    var primaryPair = t2[i];
    callback.addPair$2(primaryPair.get$proxyA().get$userData(), primaryPair.get$proxyB().get$userData());
    ++i;
    for (; i < this._pairCount;) {
      t2 = this._pairBuffer;
      if (i < 0 || i >= t2.length)
        throw $.ioore(i);
      var pair = t2[i];
      t2 = pair.get$proxyA();
      var t3 = primaryPair.get$proxyA();
      if (t2 == null ? t3 == null : t2 === t3) {
        t2 = pair.get$proxyB();
        t3 = primaryPair.get$proxyB();
        var t4 = !(t2 == null ? t3 == null : t2 === t3);
        t2 = t4;
      } else
        t2 = true;
      if (t2)
        break;
      ++i;
    }
  }
  t1.rebalance$1(4);
},
 treeCallback$1: function(proxy) {
  if ($.eqB(proxy, this.queryProxy))
    return true;
  if (this._pairCount === this._pairCapacity) {
    var oldBuffer = this._pairBuffer;
    this._pairCapacity = this._pairCapacity * 2;
    this._pairBuffer = $.ListImplementation_List(this._pairCapacity, 'Pair');
    for (var i = 0; i < oldBuffer.length; ++i) {
      var t1 = this._pairBuffer;
      if (i < 0 || i >= oldBuffer.length)
        throw $.ioore(i);
      var t2 = oldBuffer[i];
      if (i < 0 || i >= t1.length)
        throw $.ioore(i);
      t1[i] = t2;
    }
    for (i = oldBuffer.length; i < this._pairCapacity; ++i) {
      t1 = this._pairBuffer;
      t2 = $.Pair$();
      if (i < 0 || i >= t1.length)
        throw $.ioore(i);
      t1[i] = t2;
    }
  }
  t1 = $.ltB(proxy.get$key(), this.queryProxy.get$key());
  t2 = this._pairBuffer;
  var t3 = this._pairCount;
  if (t1) {
    if (t3 !== (t3 | 0))
      throw $.iae(t3);
    if (t3 < 0 || t3 >= t2.length)
      throw $.ioore(t3);
    t2[t3].set$proxyA(proxy);
    t1 = this.queryProxy;
    var t4 = this._pairBuffer;
    var t5 = this._pairCount;
    if (t5 !== (t5 | 0))
      throw $.iae(t5);
    if (t5 < 0 || t5 >= t4.length)
      throw $.ioore(t5);
    t4[t5].set$proxyB(t1);
  } else {
    t1 = this.queryProxy;
    if (t3 !== (t3 | 0))
      throw $.iae(t3);
    if (t3 < 0 || t3 >= t2.length)
      throw $.ioore(t3);
    t2[t3].set$proxyA(t1);
    t1 = this._pairBuffer;
    t4 = this._pairCount;
    if (t4 !== (t4 | 0))
      throw $.iae(t4);
    if (t4 < 0 || t4 >= t1.length)
      throw $.ioore(t4);
    t1[t4].set$proxyB(proxy);
  }
  this._pairCount = this._pairCount + 1;
  return true;
},
 query$2: function(callback, box) {
  this._tree.query$2(callback, box);
},
 _bufferMove$1: function(node) {
  this.moveBuffer.push(node);
},
 BroadPhase$0: function() {
  this.moveBuffer = $.ListImplementation_List(null, 'DynamicTreeNode');
  this._pairBuffer = $.ListImplementation_List(this._pairCapacity, 'Pair');
  for (var i = 0; i < this._pairCapacity; ++i) {
    var t1 = this._pairBuffer;
    var t2 = $.Pair$();
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i] = t2;
  }
}
};

$$.DynamicTree = {"":
 ["_root", "_nodeCount", "_lastLeaf", "_insertionCount", "_path", "_nodeStack", "_drawVectors", "_nodeCounter", "_tempVector", "_tempBox", "center?", "deltaOne", "deltaTwo"],
 "super": "Object",
 createProxy$2: function(box, userData) {
  var proxy = this._allocateNode$0();
  var t1 = $.sub(box.get$lowerBound().get$x(), 0.1);
  proxy.get$box().get$lowerBound().set$x(t1);
  t1 = $.sub(box.get$lowerBound().get$y(), 0.1);
  proxy.get$box().get$lowerBound().set$y(t1);
  t1 = $.add(box.get$upperBound().get$x(), 0.1);
  proxy.get$box().get$upperBound().set$x(t1);
  t1 = $.add(box.get$upperBound().get$y(), 0.1);
  proxy.get$box().get$upperBound().set$y(t1);
  proxy.set$userData(userData);
  this._insertLeaf$1(proxy);
  var iterationCount = $.shr(this._nodeCount, 4);
  var height = this.computeHeightFromRoot$0();
  if (typeof height !== 'number')
    return this.createProxy$2$bailout(1, height, proxy, iterationCount);
  var tryCount = 0;
  while (true) {
    if (!($.gtB(height, 64) && tryCount < 10))
      break;
    this.rebalance$1(iterationCount);
    height = this.computeHeightFromRoot$0();
    ++tryCount;
  }
  return proxy;
},
 createProxy$2$bailout: function(state, height, proxy, iterationCount) {
  var tryCount = 0;
  while (true) {
    if (!($.gtB(height, 64) && tryCount < 10))
      break;
    this.rebalance$1(iterationCount);
    height = this.computeHeightFromRoot$0();
    ++tryCount;
  }
  return proxy;
},
 moveProxy$3: function(argProxy, argBox, displacement) {
  if ($.contains$1(argProxy.get$box(), argBox) === true)
    return false;
  this._removeLeaf$1(argProxy);
  var t1 = argBox.get$lowerBound();
  t1.set$x($.sub(t1.get$x(), 0.1));
  t1 = argBox.get$lowerBound();
  t1.set$y($.sub(t1.get$y(), 0.1));
  t1 = argBox.get$upperBound();
  t1.set$x($.add(t1.get$x(), 0.1));
  t1 = argBox.get$upperBound();
  t1.set$y($.add(t1.get$y(), 0.1));
  t1 = this._tempVector;
  t1.setFrom$1(displacement);
  t1.mulLocal$1(2);
  if ($.ltB(t1.get$x(), 0)) {
    var t2 = argBox.get$lowerBound();
    t2.set$x($.add(t2.get$x(), t1.get$x()));
  } else {
    t2 = argBox.get$upperBound();
    t2.set$x($.add(t2.get$x(), t1.get$x()));
  }
  if ($.ltB(t1.get$y(), 0)) {
    t2 = argBox.get$lowerBound();
    t2.set$y($.add(t2.get$y(), t1.get$y()));
  } else {
    t2 = argBox.get$upperBound();
    t2.set$y($.add(t2.get$y(), t1.get$y()));
  }
  argProxy.get$box().setFrom$1(argBox);
  this._insertLeaf$1(argProxy);
  return true;
},
 _allocateNode$0: function() {
  var t1 = this._nodeStack;
  if ($.isEmpty(t1) === true)
    for (var i = 0; i < 6; ++i)
      t1.addFirst$1($.DynamicTreeNode$_construct());
  var node = t1.removeFirst$0();
  node.set$parent(null);
  node.set$childOne(null);
  node.set$childTwo(null);
  node.set$userData(null);
  node.set$key(this._nodeCounter);
  this._nodeCounter = this._nodeCounter + 1;
  this._nodeCount = this._nodeCount + 1;
  return node;
},
 query$2: function(callback, argBox) {
  this._query$4(callback, argBox, this._root, 1);
},
 _query$4: function(callback, argBox, node, count) {
  if (node == null)
    return true;
  if ($.AxisAlignedBox_testOverlap(argBox, node.get$box()))
    if (node.get$isLeaf() === true) {
      if (callback.treeCallback$1(node) !== true)
        return false;
    } else {
      if (count < 64) {
        ++count;
        if (this._query$4(callback, argBox, node.get$childOne(), count) !== true)
          return false;
      }
      if (count < 64) {
        ++count;
        if (this._query$4(callback, argBox, node.get$childTwo(), count) !== true)
          return false;
      }
    }
  return true;
},
 _insertLeaf$1: function(node) {
  var t1 = this._insertionCount;
  if (typeof t1 !== 'number')
    return this._insertLeaf$1$bailout(1, node, t1, 0, 0, 0, 0, 0, 0, 0);
  this._insertionCount = t1 + 1;
  if (this._root == null) {
    this._root = node;
    node.set$parent(null);
    return;
  }
  t1 = this.center;
  t1.setFrom$1(node.get$box().get$center());
  var sibling = this._root;
  if (sibling.get$isLeaf() !== true) {
    var t2 = this.deltaOne;
    var t3 = this.deltaTwo;
    var childOne = null;
    var childTwo = null;
    do {
      childOne = sibling.get$childOne();
      childTwo = sibling.get$childTwo();
      t2.setFrom$1(childOne.get$box().get$center());
      t3.setFrom$1(childTwo.get$box().get$center());
      t2.subLocal$1(t1).absLocal$0();
      t3.subLocal$1(t1).absLocal$0();
      var t4 = t2.x;
      if (typeof t4 !== 'number')
        return this._insertLeaf$1$bailout(2, node, t3, childOne, childTwo, t4, t1, t2, 0, 0);
      var t6 = t2.y;
      if (typeof t6 !== 'number')
        return this._insertLeaf$1$bailout(3, node, t3, childOne, childTwo, t4, t6, t1, t2, 0);
      var normOne = t4 + t6;
      t6 = t3.x;
      if (typeof t6 !== 'number')
        return this._insertLeaf$1$bailout(4, node, t6, t3, childOne, childTwo, t1, normOne, t2, 0);
      var t8 = t3.y;
      if (typeof t8 !== 'number')
        return this._insertLeaf$1$bailout(5, node, t6, t8, t3, childOne, childTwo, t1, normOne, t2);
      sibling = normOne < t6 + t8 ? childOne : childTwo;
      t4 = sibling.get$isLeaf();
      if (typeof t4 !== 'boolean')
        return this._insertLeaf$1$bailout(6, childTwo, sibling, t2, node, t4, t3, t1, childOne, 0);
    } while (!t4);
  }
  var node1 = sibling.get$parent();
  var node2 = this._allocateNode$0();
  node2.set$parent(node1);
  node2.set$userData(null);
  node2.get$box().setFromCombination$2(node.get$box(), sibling.get$box());
  if (!(node1 == null)) {
    t1 = sibling.get$parent().get$childOne();
    if (t1 == null ? sibling == null : t1 === sibling)
      node1.set$childOne(node2);
    else
      node1.set$childTwo(node2);
    node2.set$childOne(sibling);
    node2.set$childTwo(node);
    sibling.set$parent(node2);
    node.set$parent(node2);
    do {
      if ($.contains$1(node1.get$box(), node2.get$box()) === true)
        break;
      node1.get$box().setFromCombination$2(node1.get$childOne().get$box(), node1.get$childTwo().get$box());
      var node10 = node1.get$parent();
      node2 = node1;
      node1 = node10;
    } while (!(node1 == null));
  } else {
    node2.set$childOne(sibling);
    node2.set$childTwo(node);
    sibling.set$parent(node2);
    node.set$parent(node2);
    this._root = node2;
  }
},
 _insertLeaf$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8) {
  switch (state) {
    case 1:
      var node = env0;
      t1 = env1;
      break;
    case 2:
      node = env0;
      t3 = env1;
      childOne = env2;
      childTwo = env3;
      t4 = env4;
      t1 = env5;
      t2 = env6;
      break;
    case 3:
      node = env0;
      t3 = env1;
      childOne = env2;
      childTwo = env3;
      t4 = env4;
      t6 = env5;
      t1 = env6;
      t2 = env7;
      break;
    case 4:
      node = env0;
      t6 = env1;
      t3 = env2;
      childOne = env3;
      childTwo = env4;
      t1 = env5;
      normOne = env6;
      t2 = env7;
      break;
    case 5:
      node = env0;
      t6 = env1;
      t8 = env2;
      t3 = env3;
      childOne = env4;
      childTwo = env5;
      t1 = env6;
      normOne = env7;
      t2 = env8;
      break;
    case 6:
      childTwo = env0;
      sibling = env1;
      t2 = env2;
      node = env3;
      t4 = env4;
      t3 = env5;
      t1 = env6;
      childOne = env7;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._insertionCount;
    case 1:
      state = 0;
      this._insertionCount = $.add(t1, 1);
      if (this._root == null) {
        this._root = node;
        node.set$parent(null);
        return;
      }
      t1 = this.center;
      t1.setFrom$1(node.get$box().get$center());
      var sibling = this._root;
    default:
      if (state === 6 || state === 5 || state === 4 || state === 3 || state === 2 || state === 0 && sibling.get$isLeaf() !== true)
        switch (state) {
          case 0:
            var t2 = this.deltaOne;
            var t3 = this.deltaTwo;
            var childOne = null;
            var childTwo = null;
          default:
            L0:
              while (true)
                switch (state) {
                  case 0:
                    childOne = sibling.get$childOne();
                    childTwo = sibling.get$childTwo();
                    t2.setFrom$1(childOne.get$box().get$center());
                    t3.setFrom$1(childTwo.get$box().get$center());
                    t2.subLocal$1(t1).absLocal$0();
                    t3.subLocal$1(t1).absLocal$0();
                    var t4 = t2.get$x();
                  case 2:
                    state = 0;
                    var t6 = t2.get$y();
                  case 3:
                    state = 0;
                    var normOne = $.add(t4, t6);
                    t6 = t3.get$x();
                  case 4:
                    state = 0;
                    var t8 = t3.get$y();
                  case 5:
                    state = 0;
                    sibling = $.ltB(normOne, $.add(t6, t8)) ? childOne : childTwo;
                    t4 = sibling.get$isLeaf();
                  case 6:
                    state = 0;
                    if (!$.eqB(t4, false))
                      break L0;
                }
        }
      var node1 = sibling.get$parent();
      var node2 = this._allocateNode$0();
      node2.set$parent(node1);
      node2.set$userData(null);
      node2.get$box().setFromCombination$2(node.get$box(), sibling.get$box());
      if (!(node1 == null)) {
        t1 = sibling.get$parent().get$childOne();
        if (t1 == null ? sibling == null : t1 === sibling)
          node1.set$childOne(node2);
        else
          node1.set$childTwo(node2);
        node2.set$childOne(sibling);
        node2.set$childTwo(node);
        sibling.set$parent(node2);
        node.set$parent(node2);
        do {
          if ($.contains$1(node1.get$box(), node2.get$box()) === true)
            break;
          node1.get$box().setFromCombination$2(node1.get$childOne().get$box(), node1.get$childTwo().get$box());
          var node10 = node1.get$parent();
          node2 = node1;
          node1 = node10;
        } while (!(node1 == null));
      } else {
        node2.set$childOne(sibling);
        node2.set$childTwo(node);
        sibling.set$parent(node2);
        node.set$parent(node2);
        this._root = node2;
      }
  }
},
 _removeLeaf$1: function(argNode) {
  var t1 = this._root;
  if (argNode == null ? t1 == null : argNode === t1) {
    this._root = null;
    t1 = this._lastLeaf;
    if (t1 == null ? argNode == null : t1 === argNode)
      this._lastLeaf = null;
    return;
  }
  var node2 = argNode.get$parent();
  var node1 = node2.get$parent();
  t1 = node2.get$childOne();
  var sibling = (t1 == null ? argNode == null : t1 === argNode) ? node2.get$childTwo() : node2.get$childOne();
  if (!(node1 == null)) {
    t1 = node1.get$childOne();
    if (t1 == null ? node2 == null : t1 === node2)
      node1.set$childOne(sibling);
    else
      node1.set$childTwo(sibling);
    sibling.set$parent(node1);
    this._freeNode$1(node2);
    for (t1 = this._tempBox; !(node1 == null);) {
      t1.setFrom$1(node1.get$box());
      node1.get$box().setFromCombination$2(node1.get$childOne().get$box(), node1.get$childTwo().get$box());
      if ($.contains$1(t1, node1.get$box()) === true)
        break;
      node1 = node1.get$parent();
    }
  } else {
    this._root = sibling;
    sibling.set$parent(null);
    this._freeNode$1(node2);
  }
  t1 = this._lastLeaf;
  if (t1 == null ? argNode == null : t1 === argNode)
    this._lastLeaf = this._root;
},
 computeHeightFromRoot$0: function() {
  return this._computeHeight$1(this._root);
},
 _computeHeight$1: function(node) {
  if (node == null)
    return 0;
  return 1 + $.max(this._computeHeight$1(node.get$childOne()), this._computeHeight$1(node.get$childTwo()));
},
 rebalance$1: function(iterations) {
  if (typeof iterations !== 'number')
    return this.rebalance$1$bailout(1, iterations, 0, 0, 0, 0);
  if (this._root == null)
    return;
  for (var current = null, i = 0; i < iterations; ++i) {
    current = this._root;
    for (var bit = 0; current.get$isLeaf() !== true;) {
      var t1 = this._path;
      if (t1 !== (t1 | 0))
        return this.rebalance$1$bailout(2, iterations, i, t1, current, bit);
      current = ($.shr(t1, bit) & 1) === 0 ? current.get$childOne() : current.get$childTwo();
      var bit0 = bit + 1 & 31;
      bit = bit0;
    }
    t1 = this._path;
    if (typeof t1 !== 'number')
      return this.rebalance$1$bailout(3, iterations, i, t1, current, 0);
    this._path = t1 + 1;
    this._removeLeaf$1(current);
    this._insertLeaf$1(current);
  }
},
 rebalance$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var iterations = env0;
      break;
    case 2:
      iterations = env0;
      i = env1;
      t1 = env2;
      current = env3;
      bit = env4;
      break;
    case 3:
      iterations = env0;
      i = env1;
      t1 = env2;
      current = env3;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if (this._root == null)
        return;
      var current = null;
      var i = 0;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!$.ltB(i, iterations))
                break L0;
              current = this._root;
              var bit = 0;
            case 2:
              L1:
                while (true)
                  switch (state) {
                    case 0:
                      if (!(current.get$isLeaf() !== true))
                        break L1;
                      var t1 = this._path;
                    case 2:
                      state = 0;
                      current = $.eqB($.and($.shr(t1, bit), 1), 0) ? current.get$childOne() : current.get$childTwo();
                      var bit0 = bit + 1 & 31;
                      bit = bit0;
                  }
              t1 = this._path;
            case 3:
              state = 0;
              this._path = $.add(t1, 1);
              this._removeLeaf$1(current);
              this._insertLeaf$1(current);
              ++i;
          }
  }
},
 _freeNode$1: function(node) {
  this._nodeStack.addFirst$1(node);
  this._nodeCount = this._nodeCount - 1;
},
 DynamicTree$0: function() {
  for (var t1 = this._drawVectors, i = 0; i < t1.length; ++i) {
    var t2 = $.Vector$(0, 0);
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i] = t2;
  }
}
};

$$.DynamicTreeNode = {"":
 ["box?", "parent=", "next=", "childOne=", "childTwo=", "userData=", "key="],
 "super": "Object",
 next$0: function() { return this.next.call$0(); },
 get$isLeaf: function() {
  return this.childOne == null;
},
 toString$0: function() {
  return $.toString(this.box);
}
};

$$.Pair = {"":
 ["proxyA=", "proxyB="],
 "super": "Object",
 compareTo$1: function(pair2) {
  if ($.ltB(this.proxyA.get$key(), pair2.get$proxyA().get$key()))
    return -1;
  if ($.eqB(this.proxyA.get$key(), pair2.get$proxyA().get$key())) {
    if ($.ltB(this.proxyB.get$key(), pair2.get$proxyB().get$key()))
      var t1 = -1;
    else
      t1 = $.eqB(this.proxyB.get$key(), pair2.get$proxyB().get$key()) ? 0 : 1;
    return t1;
  }
  return 1;
}
};

$$.MassData = {"":
 ["mass=", "center?", "inertia="],
 "super": "Object",
 setFrom$1: function(md) {
  this.mass = md.get$mass();
  this.inertia = md.get$inertia();
  this.center.setFrom$1(md.get$center());
}
};

$$.PolygonShape = {"":
 ["centroid?", "vertices?", "normals?", "vertexCount?", "type", "radius"],
 "super": "Shape",
 getSupport$1: function(d) {
  var t1 = this.vertices;
  if (0 >= t1.length)
    throw $.ioore(0);
  var one = t1[0];
  var t2 = one.get$x();
  if (typeof t2 !== 'number')
    return this.getSupport$1$bailout(1, d, t2, one, t1, 0, 0, 0, 0, 0);
  var t4 = d.get$x();
  if (typeof t4 !== 'number')
    return this.getSupport$1$bailout(2, d, t2, t4, one, t1, 0, 0, 0, 0);
  t4 = t2 * t4;
  t2 = one.get$y();
  if (typeof t2 !== 'number')
    return this.getSupport$1$bailout(3, d, t4, t2, one, t1, 0, 0, 0, 0);
  var t7 = d.get$y();
  if (typeof t7 !== 'number')
    return this.getSupport$1$bailout(4, d, one, t1, t4, t2, t7, 0, 0, 0);
  var bestValue = t4 + t2 * t7;
  var two = d;
  var bestIndex = 0;
  var i = 1;
  while (true) {
    t2 = this.vertexCount;
    if (typeof t2 !== 'number')
      return this.getSupport$1$bailout(5, d, t1, bestIndex, bestValue, one, i, two, t2, 0);
    if (!(i < t2))
      break;
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    one = t1[i];
    t2 = one.get$x();
    if (typeof t2 !== 'number')
      return this.getSupport$1$bailout(6, d, one, bestIndex, bestValue, t1, i, t2, 0, 0);
    t4 = d.get$x();
    if (typeof t4 !== 'number')
      return this.getSupport$1$bailout(7, d, one, bestIndex, bestValue, t4, i, t1, t2, 0);
    t4 = t2 * t4;
    t2 = one.get$y();
    if (typeof t2 !== 'number')
      return this.getSupport$1$bailout(8, d, one, bestIndex, bestValue, t1, i, t4, t2, 0);
    t7 = d.get$y();
    if (typeof t7 !== 'number')
      return this.getSupport$1$bailout(9, d, one, bestIndex, bestValue, t1, i, t4, t2, t7);
    var value = t4 + t2 * t7;
    if (value > bestValue) {
      bestValue = value;
      bestIndex = i;
    }
    two = d;
    ++i;
  }
  return bestIndex;
},
 getSupport$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8) {
  switch (state) {
    case 1:
      var d = env0;
      t2 = env1;
      one = env2;
      t1 = env3;
      break;
    case 2:
      d = env0;
      t2 = env1;
      t4 = env2;
      one = env3;
      t1 = env4;
      break;
    case 3:
      d = env0;
      t4 = env1;
      t2 = env2;
      one = env3;
      t1 = env4;
      break;
    case 4:
      d = env0;
      one = env1;
      t1 = env2;
      t4 = env3;
      t2 = env4;
      t7 = env5;
      break;
    case 5:
      d = env0;
      t1 = env1;
      bestIndex = env2;
      bestValue = env3;
      one = env4;
      i = env5;
      two = env6;
      t2 = env7;
      break;
    case 6:
      d = env0;
      one = env1;
      bestIndex = env2;
      bestValue = env3;
      t1 = env4;
      i = env5;
      t2 = env6;
      break;
    case 7:
      d = env0;
      one = env1;
      bestIndex = env2;
      bestValue = env3;
      t4 = env4;
      i = env5;
      t1 = env6;
      t2 = env7;
      break;
    case 8:
      d = env0;
      one = env1;
      bestIndex = env2;
      bestValue = env3;
      t1 = env4;
      i = env5;
      t4 = env6;
      t2 = env7;
      break;
    case 9:
      d = env0;
      one = env1;
      bestIndex = env2;
      bestValue = env3;
      t1 = env4;
      i = env5;
      t4 = env6;
      t2 = env7;
      t7 = env8;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.vertices;
      if (0 < 0 || 0 >= t1.length)
        throw $.ioore(0);
      var one = t1[0];
      var t2 = one.get$x();
    case 1:
      state = 0;
      var t4 = d.get$x();
    case 2:
      state = 0;
      t4 = $.mul(t2, t4);
      t2 = one.get$y();
    case 3:
      state = 0;
      var t7 = d.get$y();
    case 4:
      state = 0;
      var bestValue = $.add(t4, $.mul(t2, t7));
      var two = d;
      var bestIndex = 0;
      var i = 1;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              t2 = this.vertexCount;
            case 5:
              state = 0;
              if (!$.ltB(i, t2))
                break L0;
              if (i < 0 || i >= t1.length)
                throw $.ioore(i);
              one = t1[i];
              t2 = one.get$x();
            case 6:
              state = 0;
              t4 = d.get$x();
            case 7:
              state = 0;
              t4 = $.mul(t2, t4);
              t2 = one.get$y();
            case 8:
              state = 0;
              t7 = d.get$y();
            case 9:
              state = 0;
              var value = $.add(t4, $.mul(t2, t7));
              if ($.gtB(value, bestValue)) {
                bestValue = value;
                bestIndex = i;
              }
              two = d;
              ++i;
          }
      return bestIndex;
  }
},
 clone$0: function() {
  return $.PolygonShape$copy(this);
},
 setAsBox$2: function(hx, hy) {
  this.vertexCount = 4;
  var t1 = this.vertices;
  if (0 < 0 || 0 >= t1.length)
    throw $.ioore(0);
  var t2 = t1[0];
  var t3 = -hx;
  var t4 = -hy;
  t2.setCoords$2(t3, t4);
  if (1 < 0 || 1 >= t1.length)
    throw $.ioore(1);
  t1[1].setCoords$2(hx, t4);
  if (2 < 0 || 2 >= t1.length)
    throw $.ioore(2);
  t1[2].setCoords$2(hx, hy);
  if (3 < 0 || 3 >= t1.length)
    throw $.ioore(3);
  t1[3].setCoords$2(t3, hy);
  t3 = this.normals;
  if (0 < 0 || 0 >= t3.length)
    throw $.ioore(0);
  t3[0].setCoords$2(0.0, -1.0);
  if (1 < 0 || 1 >= t3.length)
    throw $.ioore(1);
  t3[1].setCoords$2(1.0, 0.0);
  if (2 < 0 || 2 >= t3.length)
    throw $.ioore(2);
  t3[2].setCoords$2(0.0, 1.0);
  if (3 < 0 || 3 >= t3.length)
    throw $.ioore(3);
  t3[3].setCoords$2(-1.0, 0.0);
  this.centroid.setZero$0();
},
 setAsEdge$2: function(v1, v2) {
  this.vertexCount = 2;
  var t1 = this.vertices;
  if (0 < 0 || 0 >= t1.length)
    throw $.ioore(0);
  t1[0].setFrom$1(v1);
  if (1 < 0 || 1 >= t1.length)
    throw $.ioore(1);
  t1[1].setFrom$1(v2);
  this.centroid.setFrom$1(v1).addLocal$1(v2).mulLocal$1(0.5);
  var t2 = this.normals;
  if (0 < 0 || 0 >= t2.length)
    throw $.ioore(0);
  t2[0].setFrom$1(v2).subLocal$1(v1);
  if (0 < 0 || 0 >= t2.length)
    throw $.ioore(0);
  var t3 = t2[0];
  if (0 < 0 || 0 >= t2.length)
    throw $.ioore(0);
  $.Vector_crossVectorAndNumToOut(t3, 1, t2[0]);
  if (0 < 0 || 0 >= t2.length)
    throw $.ioore(0);
  t2[0].normalize$0();
  if (1 < 0 || 1 >= t2.length)
    throw $.ioore(1);
  t3 = t2[1];
  if (0 < 0 || 0 >= t2.length)
    throw $.ioore(0);
  t3.setFrom$1(t2[0]).negateLocal$0();
},
 computeAxisAlignedBox$2: function(argAabb, argXf) {
  var lower = $.Vector$(0, 0);
  var upper = $.Vector$(0, 0);
  var v = $.Vector$(0, 0);
  var t1 = this.vertices;
  if (0 < 0 || 0 >= t1.length)
    throw $.ioore(0);
  $.Transform_mulToOut(argXf, t1[0], lower);
  upper.setFrom$1(lower);
  for (var i = 1; $.ltB(i, this.vertexCount); ++i) {
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    $.Transform_mulToOut(argXf, t1[i], v);
    $.Vector_minToOut(lower, v, lower);
    $.Vector_maxToOut(upper, v, upper);
  }
  t1 = $.sub(lower.x, this.radius);
  argAabb.get$lowerBound().set$x(t1);
  t1 = $.sub(lower.y, this.radius);
  argAabb.get$lowerBound().set$y(t1);
  t1 = $.add(upper.x, this.radius);
  argAabb.get$upperBound().set$x(t1);
  t1 = $.add(upper.y, this.radius);
  argAabb.get$upperBound().set$y(t1);
},
 computeMass$2: function(massData, density) {
  if ($.eqB(this.vertexCount, 2)) {
    var t1 = massData.get$center();
    var t2 = this.vertices;
    if (0 < 0 || 0 >= t2.length)
      throw $.ioore(0);
    t1 = t1.setFrom$1(t2[0]);
    if (1 < 0 || 1 >= t2.length)
      throw $.ioore(1);
    t1.addLocal$1(t2[1]).mulLocal$1(0.5);
    massData.set$mass(0.0);
    massData.set$inertia(0.0);
    return;
  }
  var center = $.Vector$(0, 0);
  center.setZero$0();
  var pRef = $.Vector$(0, 0);
  pRef.setZero$0();
  var e1 = $.Vector$(0, 0);
  var e2 = $.Vector$(0, 0);
  for (var t1 = this.vertices, area = 0.0, I = 0.0, i = 0; $.ltB(i, this.vertexCount); ++i) {
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    var p2 = t1[i];
    t2 = i + 1;
    if ($.ltB(t2, this.vertexCount)) {
      if (t2 < 0 || t2 >= t1.length)
        throw $.ioore(t2);
      var p3 = t1[t2];
    } else {
      if (0 < 0 || 0 >= t1.length)
        throw $.ioore(0);
      p3 = t1[0];
    }
    e1.setFrom$1(p2);
    e1.subLocal$1(pRef);
    e2.setFrom$1(p3);
    e2.subLocal$1(pRef);
    var D = $.sub($.mul(e1.x, e2.y), $.mul(e1.y, e2.x));
    if (typeof D !== 'number')
      throw $.iae(D);
    var triangleArea = 0.5 * D;
    area += triangleArea;
    t2 = center.x;
    var t3 = triangleArea * 0.3333333333333333;
    var t4 = $.add($.add(pRef.x, p2.get$x()), p3.get$x());
    if (typeof t4 !== 'number')
      throw $.iae(t4);
    center.x = $.add(t2, t3 * t4);
    var t5 = center.y;
    var t6 = $.add($.add(pRef.y, p2.get$y()), p3.get$y());
    if (typeof t6 !== 'number')
      throw $.iae(t6);
    center.y = $.add(t5, t3 * t6);
    var px = pRef.x;
    var py = pRef.y;
    var ex1 = e1.x;
    var ey1 = e1.y;
    var ex2 = e2.x;
    var ey2 = e2.y;
    var t7 = $.add($.add($.mul(ex1, ex1), $.mul(ex2, ex1)), $.mul(ex2, ex2));
    if (typeof t7 !== 'number')
      throw $.iae(t7);
    t7 = 0.25 * t7;
    var t8 = $.add($.mul(px, ex1), $.mul(px, ex2));
    if (typeof t8 !== 'number')
      throw $.iae(t8);
    var t9 = 0.3333333333333333 * (t7 + t8);
    if (typeof px !== 'number')
      throw $.iae(px);
    var intx2 = t9 + 0.5 * px * px;
    t9 = $.add($.add($.mul(ey1, ey1), $.mul(ey2, ey1)), $.mul(ey2, ey2));
    if (typeof t9 !== 'number')
      throw $.iae(t9);
    t9 = 0.25 * t9;
    var t10 = $.add($.mul(py, ey1), $.mul(py, ey2));
    if (typeof t10 !== 'number')
      throw $.iae(t10);
    var t11 = 0.3333333333333333 * (t9 + t10);
    if (typeof py !== 'number')
      throw $.iae(py);
    I += D * (intx2 + (t11 + 0.5 * py * py));
  }
  massData.set$mass($.mul(density, area));
  center.mulLocal$1(1.0 / area);
  massData.get$center().setFrom$1(center);
  if (typeof density !== 'number')
    throw $.iae(density);
  massData.set$inertia(I * density);
},
 PolygonShape$copy$1: function(other) {
  for (var t1 = this.vertices, i = 0; $.ltB(i, $.get$length(other.get$vertices())); ++i) {
    var t2 = $.Vector$copy($.index(other.get$vertices(), i));
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i] = t2;
  }
  for (t1 = this.normals, i = 0; $.ltB(i, $.get$length(other.get$normals())); ++i) {
    t2 = $.Vector$copy($.index(other.get$normals(), i));
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i] = t2;
  }
},
 PolygonShape$0: function() {
  for (var t1 = this.vertices, i = 0; i < t1.length; ++i) {
    var t2 = $.Vector$(0, 0);
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i] = t2;
  }
  for (t1 = this.normals, i = 0; i < t1.length; ++i) {
    t2 = $.Vector$(0, 0);
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i] = t2;
  }
}
};

$$.Shape = {"":
 ["type=", "radius="],
 "super": "Object"
};

$$.Matrix22 = {"":
 ["col1?", "col2?"],
 "super": "Object",
 operator$eq$1: function(other) {
  if (typeof other === 'object' && other !== null && !!other.is$Matrix22)
    var t1 = $.eqB(this.col1, other.col1) && $.eqB(this.col2, other.col2);
  else
    t1 = false;
  return t1;
},
 setAngle$1: function(angle) {
  var cosin = $.cos(angle);
  var sin = $.sin(angle);
  this.col1.setCoords$2(cosin, sin);
  this.col2.setCoords$2(-sin, cosin);
},
 setFrom$1: function(matrix) {
  this.col1.setFrom$1(matrix.get$col1());
  this.col2.setFrom$1(matrix.get$col2());
},
 invertLocal$0: function() {
  var t1 = this.col1;
  var a = t1.get$x();
  if (typeof a !== 'number')
    return this.invertLocal$0$bailout(1, a, t1, 0, 0, 0, 0);
  var t3 = this.col2;
  var b = t3.get$x();
  if (typeof b !== 'number')
    return this.invertLocal$0$bailout(2, a, t1, t3, b, 0, 0);
  var c = t1.get$y();
  if (typeof c !== 'number')
    return this.invertLocal$0$bailout(3, a, t1, t3, b, c, 0);
  var d = t3.get$y();
  if (typeof d !== 'number')
    return this.invertLocal$0$bailout(4, a, t1, t3, b, c, d);
  var det = a * d - b * c;
  if (!(det === 0))
    det = 1.0 / det;
  t1.set$x(det * d);
  var t2 = -det;
  t3.set$x(t2 * b);
  t1.set$y(t2 * c);
  t3.set$y(det * a);
  return this;
},
 invertLocal$0$bailout: function(state, env0, env1, env2, env3, env4, env5) {
  switch (state) {
    case 1:
      a = env0;
      t1 = env1;
      break;
    case 2:
      a = env0;
      t1 = env1;
      t3 = env2;
      b = env3;
      break;
    case 3:
      a = env0;
      t1 = env1;
      t3 = env2;
      b = env3;
      c = env4;
      break;
    case 4:
      a = env0;
      t1 = env1;
      t3 = env2;
      b = env3;
      c = env4;
      d = env5;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.col1;
      var a = t1.get$x();
    case 1:
      state = 0;
      var t3 = this.col2;
      var b = t3.get$x();
    case 2:
      state = 0;
      var c = t1.get$y();
    case 3:
      state = 0;
      var d = t3.get$y();
    case 4:
      state = 0;
      var det = $.sub($.mul(a, d), $.mul(b, c));
      if (!$.eqB(det, 0)) {
        if (typeof det !== 'number')
          throw $.iae(det);
        det = 1.0 / det;
      }
      t1.set$x($.mul(det, d));
      t3.set$x($.mul($.neg(det), b));
      t1.set$y($.mul($.neg(det), c));
      t3.set$y($.mul(det, a));
      return this;
  }
},
 addLocal$1: function(other) {
  var t1 = this.col1;
  var t2 = t1.get$x();
  if (typeof t2 !== 'number')
    return this.addLocal$1$bailout(1, other, t1, t2, 0);
  var t4 = other.get$col1().get$x();
  if (typeof t4 !== 'number')
    return this.addLocal$1$bailout(2, other, t1, t2, t4);
  t1.set$x(t2 + t4);
  var t6 = t1.get$y();
  if (typeof t6 !== 'number')
    return this.addLocal$1$bailout(3, other, t1, t6, 0);
  var t8 = other.get$col1().get$y();
  if (typeof t8 !== 'number')
    return this.addLocal$1$bailout(4, other, t1, t6, t8);
  t1.set$y(t6 + t8);
  t1 = this.col2;
  var t10 = t1.get$x();
  if (typeof t10 !== 'number')
    return this.addLocal$1$bailout(5, other, t10, t1, 0);
  var t12 = other.get$col2().get$x();
  if (typeof t12 !== 'number')
    return this.addLocal$1$bailout(6, other, t10, t1, t12);
  t1.set$x(t10 + t12);
  var t14 = t1.get$y();
  if (typeof t14 !== 'number')
    return this.addLocal$1$bailout(7, other, t14, t1, 0);
  var t16 = other.get$col2().get$y();
  if (typeof t16 !== 'number')
    return this.addLocal$1$bailout(8, t14, t1, t16, 0);
  t1.set$y(t14 + t16);
  return this;
},
 addLocal$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var other = env0;
      t1 = env1;
      t2 = env2;
      break;
    case 2:
      other = env0;
      t1 = env1;
      t2 = env2;
      t4 = env3;
      break;
    case 3:
      other = env0;
      t1 = env1;
      t6 = env2;
      break;
    case 4:
      other = env0;
      t1 = env1;
      t6 = env2;
      t8 = env3;
      break;
    case 5:
      other = env0;
      t10 = env1;
      t1 = env2;
      break;
    case 6:
      other = env0;
      t10 = env1;
      t1 = env2;
      t12 = env3;
      break;
    case 7:
      other = env0;
      t14 = env1;
      t1 = env2;
      break;
    case 8:
      t14 = env0;
      t1 = env1;
      t16 = env2;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.col1;
      var t2 = t1.get$x();
    case 1:
      state = 0;
      var t4 = other.get$col1().get$x();
    case 2:
      state = 0;
      t1.set$x($.add(t2, t4));
      var t6 = t1.get$y();
    case 3:
      state = 0;
      var t8 = other.get$col1().get$y();
    case 4:
      state = 0;
      t1.set$y($.add(t6, t8));
      t1 = this.col2;
      var t10 = t1.get$x();
    case 5:
      state = 0;
      var t12 = other.get$col2().get$x();
    case 6:
      state = 0;
      t1.set$x($.add(t10, t12));
      var t14 = t1.get$y();
    case 7:
      state = 0;
      var t16 = other.get$col2().get$y();
    case 8:
      state = 0;
      t1.set$y($.add(t14, t16));
      return this;
  }
},
 toString$0: function() {
  return $.S(this.col1) + ', ' + $.S(this.col2);
},
 Matrix22$2: function(c1, c2) {
  if (c1 == null)
    c1 = $.Vector$(0, 0);
  if (c2 == null)
    c2 = $.Vector$(0, 0);
  this.col1 = c1;
  this.col2 = c2;
},
 is$Matrix22: true
};

$$.Sweep = {"":
 ["localCenter?", "centerZero?", "center?", "angleZero=", "angle="],
 "super": "Object",
 operator$eq$1: function(other) {
  return $.eqB(this.localCenter, other.get$localCenter()) && $.eqB(this.centerZero, other.get$centerZero()) && $.eqB(this.center, other.get$center()) && $.eqB(this.angleZero, other.get$angleZero()) && $.eqB(this.angle, other.get$angle());
},
 setFrom$1: function(other) {
  this.localCenter.setFrom$1(other.get$localCenter());
  this.centerZero.setFrom$1(other.get$centerZero());
  this.center.setFrom$1(other.get$center());
  this.angleZero = other.get$angleZero();
  this.angle = other.get$angle();
},
 normalize$0: function() {
  var t1 = $.floor($.div(this.angleZero, 6.283185307179586));
  if (typeof t1 !== 'number')
    throw $.iae(t1);
  var d = 6.283185307179586 * t1;
  this.angleZero = $.sub(this.angleZero, d);
  this.angle = $.sub(this.angle, d);
},
 getTransform$2: function(xf, alpha) {
  if (typeof alpha !== 'number')
    throw $.iae(alpha);
  var t1 = 1.0 - alpha;
  var t2 = this.centerZero;
  var t3 = t2.x;
  if (typeof t3 !== 'number')
    throw $.iae(t3);
  t3 = t1 * t3;
  var t4 = this.center;
  var t5 = t4.x;
  if (typeof t5 !== 'number')
    throw $.iae(t5);
  t3 += alpha * t5;
  xf.get$position().set$x(t3);
  t2 = t2.y;
  if (typeof t2 !== 'number')
    throw $.iae(t2);
  t2 = t1 * t2;
  t4 = t4.y;
  if (typeof t4 !== 'number')
    throw $.iae(t4);
  t2 += alpha * t4;
  xf.get$position().set$y(t2);
  t2 = xf.get$rotation();
  t3 = this.angleZero;
  if (typeof t3 !== 'number')
    throw $.iae(t3);
  t3 = t1 * t3;
  t1 = this.angle;
  if (typeof t1 !== 'number')
    throw $.iae(t1);
  t2.setAngle$1(t3 + alpha * t1);
  t2 = xf.get$position();
  var t6 = t2.get$x();
  if (typeof t6 !== 'number')
    return this.getTransform$2$bailout(1, xf, t2, t6, 0, 0, 0, 0);
  var t8 = xf.get$rotation().get$col1().get$x();
  if (typeof t8 !== 'number')
    return this.getTransform$2$bailout(2, xf, t8, t2, t6, 0, 0, 0);
  var t10 = this.localCenter;
  var t11 = t10.x;
  if (typeof t11 !== 'number')
    return this.getTransform$2$bailout(3, t10, xf, t8, t11, t2, t6, 0);
  t11 = t8 * t11;
  t8 = xf.get$rotation().get$col2().get$x();
  if (typeof t8 !== 'number')
    return this.getTransform$2$bailout(4, t10, xf, t11, t8, t2, t6, 0);
  var t14 = t10.y;
  if (typeof t14 !== 'number')
    return this.getTransform$2$bailout(5, t10, xf, t11, t8, t14, t2, t6);
  t2.set$x(t6 - (t11 + t8 * t14));
  t2 = xf.get$position();
  var t16 = t2.get$y();
  if (typeof t16 !== 'number')
    return this.getTransform$2$bailout(6, t10, xf, t2, t16, 0, 0, 0);
  var t18 = xf.get$rotation().get$col1().get$y();
  if (typeof t18 !== 'number')
    return this.getTransform$2$bailout(7, t10, xf, t2, t16, t18, 0, 0);
  var t20 = t10.x;
  if (typeof t20 !== 'number')
    return this.getTransform$2$bailout(8, t10, xf, t2, t16, t18, t20, 0);
  t20 = t18 * t20;
  t18 = xf.get$rotation().get$col2().get$y();
  if (typeof t18 !== 'number')
    return this.getTransform$2$bailout(9, t10, t2, t16, t20, t18, 0, 0);
  t10 = t10.y;
  if (typeof t10 !== 'number')
    return this.getTransform$2$bailout(10, t10, t2, t16, t20, t18, 0, 0);
  t2.set$y(t16 - (t20 + t18 * t10));
},
 getTransform$2$bailout: function(state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      var xf = env0;
      t2 = env1;
      t6 = env2;
      break;
    case 2:
      xf = env0;
      t8 = env1;
      t2 = env2;
      t6 = env3;
      break;
    case 3:
      t10 = env0;
      xf = env1;
      t8 = env2;
      t11 = env3;
      t2 = env4;
      t6 = env5;
      break;
    case 4:
      t10 = env0;
      xf = env1;
      t11 = env2;
      t8 = env3;
      t2 = env4;
      t6 = env5;
      break;
    case 5:
      t10 = env0;
      xf = env1;
      t11 = env2;
      t8 = env3;
      t14 = env4;
      t2 = env5;
      t6 = env6;
      break;
    case 6:
      t10 = env0;
      xf = env1;
      t2 = env2;
      t16 = env3;
      break;
    case 7:
      t10 = env0;
      xf = env1;
      t2 = env2;
      t16 = env3;
      t18 = env4;
      break;
    case 8:
      t10 = env0;
      xf = env1;
      t2 = env2;
      t16 = env3;
      t18 = env4;
      t20 = env5;
      break;
    case 9:
      t10 = env0;
      t2 = env1;
      t16 = env2;
      t20 = env3;
      t18 = env4;
      break;
    case 10:
      t10 = env0;
      t2 = env1;
      t16 = env2;
      t20 = env3;
      t18 = env4;
      break;
  }
  switch (state) {
    case 0:
      if (typeof alpha !== 'number')
        throw $.iae(alpha);
      var t1 = 1.0 - alpha;
      var t2 = this.centerZero;
      var t3 = t2.get$x();
      if (typeof t3 !== 'number')
        throw $.iae(t3);
      t3 = t1 * t3;
      var t4 = this.center;
      var t5 = t4.get$x();
      if (typeof t5 !== 'number')
        throw $.iae(t5);
      t3 += alpha * t5;
      xf.get$position().set$x(t3);
      t2 = t2.get$y();
      if (typeof t2 !== 'number')
        throw $.iae(t2);
      t2 = t1 * t2;
      t4 = t4.get$y();
      if (typeof t4 !== 'number')
        throw $.iae(t4);
      t2 += alpha * t4;
      xf.get$position().set$y(t2);
      t2 = xf.get$rotation();
      t3 = this.angleZero;
      if (typeof t3 !== 'number')
        throw $.iae(t3);
      t3 = t1 * t3;
      t1 = this.angle;
      if (typeof t1 !== 'number')
        throw $.iae(t1);
      t2.setAngle$1(t3 + alpha * t1);
      t2 = xf.get$position();
      var t6 = t2.get$x();
    case 1:
      state = 0;
      var t8 = xf.get$rotation().get$col1().get$x();
    case 2:
      state = 0;
      var t10 = this.localCenter;
      var t11 = t10.get$x();
    case 3:
      state = 0;
      t11 = $.mul(t8, t11);
      t8 = xf.get$rotation().get$col2().get$x();
    case 4:
      state = 0;
      var t14 = t10.get$y();
    case 5:
      state = 0;
      t2.set$x($.sub(t6, $.add(t11, $.mul(t8, t14))));
      t2 = xf.get$position();
      var t16 = t2.get$y();
    case 6:
      state = 0;
      var t18 = xf.get$rotation().get$col1().get$y();
    case 7:
      state = 0;
      var t20 = t10.get$x();
    case 8:
      state = 0;
      t20 = $.mul(t18, t20);
      t18 = xf.get$rotation().get$col2().get$y();
    case 9:
      state = 0;
      t10 = t10.get$y();
    case 10:
      state = 0;
      t2.set$y($.sub(t16, $.add(t20, $.mul(t18, t10))));
  }
},
 advance$1: function(time) {
  if (typeof time !== 'number')
    throw $.iae(time);
  var t1 = 1 - time;
  var t2 = this.centerZero;
  var t3 = t2.get$x();
  if (typeof t3 !== 'number')
    throw $.iae(t3);
  t3 = t1 * t3;
  var t4 = this.center;
  var t5 = t4.get$x();
  if (typeof t5 !== 'number')
    throw $.iae(t5);
  t2.set$x(t3 + time * t5);
  var t6 = t2.get$y();
  if (typeof t6 !== 'number')
    throw $.iae(t6);
  t6 = t1 * t6;
  t4 = t4.get$y();
  if (typeof t4 !== 'number')
    throw $.iae(t4);
  t2.set$y(t6 + time * t4);
  t2 = this.angleZero;
  if (typeof t2 !== 'number')
    throw $.iae(t2);
  t2 = t1 * t2;
  t1 = this.angle;
  if (typeof t1 !== 'number')
    throw $.iae(t1);
  this.angleZero = t2 + time * t1;
}
};

$$.Transform = {"":
 ["position?", "rotation?"],
 "super": "Object",
 operator$eq$1: function(other) {
  return $.eqB(this.position, other.get$position()) && $.eqB(this.rotation, other.get$rotation());
},
 setFrom$1: function(other) {
  this.position.setFrom$1(other.get$position());
  this.rotation.setFrom$1(other.get$rotation());
}
};

$$.Vector = {"":
 ["x=", "y="],
 "super": "Object",
 operator$eq$1: function(other) {
  return $.eqB(this.x, other.get$x()) && $.eqB(this.y, other.get$y());
},
 addLocal$1: function(v) {
  this.x = $.add(this.x, v.get$x());
  this.y = $.add(this.y, v.get$y());
  return this;
},
 subLocal$1: function(other) {
  var t1 = this.x;
  if (typeof t1 !== 'number')
    return this.subLocal$1$bailout(1, other, t1, 0);
  var t3 = other.get$x();
  if (typeof t3 !== 'number')
    return this.subLocal$1$bailout(2, other, t3, t1);
  this.x = t1 - t3;
  var t5 = this.y;
  if (typeof t5 !== 'number')
    return this.subLocal$1$bailout(3, other, t5, 0);
  var t7 = other.get$y();
  if (typeof t7 !== 'number')
    return this.subLocal$1$bailout(4, t5, t7, 0);
  this.y = t5 - t7;
  return this;
},
 subLocal$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var other = env0;
      t1 = env1;
      break;
    case 2:
      other = env0;
      t3 = env1;
      t1 = env2;
      break;
    case 3:
      other = env0;
      t5 = env1;
      break;
    case 4:
      t5 = env0;
      t7 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.x;
    case 1:
      state = 0;
      var t3 = other.get$x();
    case 2:
      state = 0;
      this.x = $.sub(t1, t3);
      var t5 = this.y;
    case 3:
      state = 0;
      var t7 = other.get$y();
    case 4:
      state = 0;
      this.y = $.sub(t5, t7);
      return this;
  }
},
 setCoords$2: function(xCoord, yCoord) {
  this.x = xCoord;
  this.y = yCoord;
  return this;
},
 setFrom$1: function(v) {
  this.setCoords$2(v.get$x(), v.get$y());
  return this;
},
 mulLocal$1: function(d) {
  if (typeof d !== 'number')
    return this.mulLocal$1$bailout(1, d, 0);
  var t1 = this.x;
  if (typeof t1 !== 'number')
    return this.mulLocal$1$bailout(2, d, t1);
  this.x = t1 * d;
  var t3 = this.y;
  if (typeof t3 !== 'number')
    return this.mulLocal$1$bailout(3, d, t3);
  this.y = t3 * d;
  return this;
},
 mulLocal$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      var d = env0;
      break;
    case 2:
      d = env0;
      t1 = env1;
      break;
    case 3:
      d = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var t1 = this.x;
    case 2:
      state = 0;
      this.x = $.mul(t1, d);
      var t3 = this.y;
    case 3:
      state = 0;
      this.y = $.mul(t3, d);
      return this;
  }
},
 setZero$0: function() {
  this.setCoords$2(0, 0);
  return this;
},
 get$length: function() {
  return $.sqrt(this.get$lengthSquared());
},
 get$lengthSquared: function() {
  var t1 = this.x;
  t1 = $.mul(t1, t1);
  var t2 = this.y;
  return $.add(t1, $.mul(t2, t2));
},
 absLocal$0: function() {
  this.x = $.abs(this.x);
  this.y = $.abs(this.y);
},
 normalize$0: function() {
  var len = $.get$length(this);
  if ($.ltB(len, 1.192e-7))
    return 0;
  if (typeof len !== 'number')
    throw $.iae(len);
  var invLength = 1.0 / len;
  this.x = $.mul(this.x, invLength);
  this.y = $.mul(this.y, invLength);
  return len;
},
 negateLocal$0: function() {
  this.x = $.neg(this.x);
  this.y = $.neg(this.y);
  return this;
},
 toString$0: function() {
  return '(' + $.S(this.x) + ', ' + $.S(this.y) + ')';
}
};

$$.Body = {"":
 ["world", "flags=", "contactList=", "sleepTime=", "userData=", "_linearVelocity", "_angularVelocity", "mass=", "invMass?", "next=", "prev=", "fixtureList", "fixtureCount", "jointList?", "_force?", "_torque=", "_inertia", "invInertia?", "linearDamping?", "angularDamping?", "_type?", "islandIndex!", "originTransform?", "sweep?", "_fixDef", "_pmd", "_pxf", "oldCenter", "tempCenter"],
 "super": "Object",
 next$0: function() { return this.next.call$0(); },
 createFixture$1: function(def) {
  var fixture = $.Fixture$();
  fixture.create$2(this, def);
  var t1 = this.flags;
  if (t1 !== (t1 | 0))
    return this.createFixture$1$bailout(1, t1, fixture, 0);
  if ((t1 & 32) === 32)
    fixture.createProxy$2(this.world.get$_contactManager().get$broadPhase(), this.originTransform);
  fixture.next = this.fixtureList;
  this.fixtureList = fixture;
  t1 = this.fixtureCount;
  if (typeof t1 !== 'number')
    return this.createFixture$1$bailout(2, t1, fixture, 0);
  this.fixtureCount = t1 + 1;
  fixture.body = this;
  t1 = fixture.density;
  if (typeof t1 !== 'number')
    return this.createFixture$1$bailout(3, t1, fixture, 0);
  if (t1 > 0.0)
    this.resetMassData$0();
  t1 = this.world;
  var t2 = t1.get$_flags();
  if (t2 !== (t2 | 0))
    return this.createFixture$1$bailout(4, t2, fixture, t1);
  t1.set$_flags((t2 | 1) >>> 0);
  return fixture;
},
 createFixture$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      t1 = env0;
      fixture = env1;
      break;
    case 2:
      t1 = env0;
      fixture = env1;
      break;
    case 3:
      t1 = env0;
      fixture = env1;
      break;
    case 4:
      t2 = env0;
      fixture = env1;
      t1 = env2;
      break;
  }
  switch (state) {
    case 0:
      var fixture = $.Fixture$();
      fixture.create$2(this, def);
      var t1 = this.flags;
    case 1:
      state = 0;
      if ($.eqB($.and(t1, 32), 32))
        fixture.createProxy$2(this.world.get$_contactManager().get$broadPhase(), this.originTransform);
      fixture.next = this.fixtureList;
      this.fixtureList = fixture;
      t1 = this.fixtureCount;
    case 2:
      state = 0;
      this.fixtureCount = $.add(t1, 1);
      fixture.body = this;
      t1 = fixture.density;
    case 3:
      state = 0;
      if ($.gtB(t1, 0.0))
        this.resetMassData$0();
      t1 = this.world;
      var t2 = t1.get$_flags();
    case 4:
      state = 0;
      t1.set$_flags($.or(t2, 1));
      return fixture;
  }
},
 get$position: function() {
  return this.originTransform.get$position();
},
 get$angle: function() {
  return this.sweep.get$angle();
},
 get$localCenter: function() {
  return this.sweep.get$localCenter();
},
 get$linearVelocity: function() {
  return this._linearVelocity;
},
 get$angularVelocity: function() {
  return this._angularVelocity;
},
 set$angularVelocity: function(w) {
  if (!$.eqB(this._type, 0)) {
    if ($.gtB($.mul(w, w), 0))
      this.set$awake(true);
    this._angularVelocity = w;
  }
},
 get$inertia: function() {
  var t1 = this._inertia;
  var t2 = this.mass;
  var t3 = this.sweep;
  return $.add(t1, $.mul(t2, $.add($.mul(t3.get$localCenter().get$x(), t3.get$localCenter().get$x()), $.mul(t3.get$localCenter().get$y(), t3.get$localCenter().get$y()))));
},
 getMassData$1: function(data) {
  data.set$mass(this.mass);
  var lc = this.sweep.localCenter;
  var t1 = this._inertia;
  if (typeof t1 !== 'number')
    return this.getMassData$1$bailout(1, data, t1, lc, 0, 0);
  var t3 = this.mass;
  if (typeof t3 !== 'number')
    return this.getMassData$1$bailout(2, data, t1, t3, lc, 0);
  var t5 = lc.get$lengthSquared();
  if (typeof t5 !== 'number')
    return this.getMassData$1$bailout(3, data, t1, t3, t5, lc);
  data.set$inertia(t1 + t3 * t5);
  var t7 = lc.get$x();
  data.get$center().set$x(t7);
  t7 = lc.get$y();
  data.get$center().set$y(t7);
},
 getMassData$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var data = env0;
      t1 = env1;
      lc = env2;
      break;
    case 2:
      data = env0;
      t1 = env1;
      t3 = env2;
      lc = env3;
      break;
    case 3:
      data = env0;
      t1 = env1;
      t3 = env2;
      t5 = env3;
      lc = env4;
      break;
  }
  switch (state) {
    case 0:
      data.set$mass(this.mass);
      var lc = this.sweep.get$localCenter();
      var t1 = this._inertia;
    case 1:
      state = 0;
      var t3 = this.mass;
    case 2:
      state = 0;
      var t5 = lc.get$lengthSquared();
    case 3:
      state = 0;
      data.set$inertia($.add(t1, $.mul(t3, t5)));
      var t7 = lc.get$x();
      data.get$center().set$x(t7);
      t7 = lc.get$y();
      data.get$center().set$y(t7);
  }
},
 resetMassData$0: function() {
  this.mass = 0.0;
  this.invMass = 0.0;
  this._inertia = 0.0;
  this.invInertia = 0.0;
  var t1 = this.sweep;
  t1.get$localCenter().setZero$0();
  if ($.eqB(this._type, 0) || $.eqB(this._type, 1)) {
    var t2 = t1.get$center();
    var t3 = this.originTransform;
    t2.setFrom$1(t3.get$position());
    t1.get$centerZero().setFrom$1(t3.get$position());
    return;
  }
  t2 = this.tempCenter;
  t2.setZero$0();
  var massData = this._pmd;
  for (var f = this.fixtureList; !(f == null); f = f.get$next()) {
    if ($.eqB(f.get$density(), 0.0))
      continue;
    f.getMassData$1(massData);
    this.mass = $.add(this.mass, massData.get$mass());
    var temp = $.Vector$copy(massData.get$center());
    temp.mulLocal$1(massData.get$mass());
    t2.addLocal$1(temp);
    this._inertia = $.add(this._inertia, massData.get$inertia());
  }
  if ($.gtB(this.mass, 0.0)) {
    t3 = this.mass;
    if (typeof t3 !== 'number')
      throw $.iae(t3);
    this.invMass = 1.0 / t3;
    t2.mulLocal$1(this.invMass);
  } else {
    this.mass = 1.0;
    this.invMass = 1.0;
  }
  if ($.gtB(this._inertia, 0.0) && $.eqB($.and(this.flags, 16), 0)) {
    this._inertia = $.sub(this._inertia, $.mul(this.mass, $.add($.mul(t2.get$x(), t2.get$x()), $.mul(t2.get$y(), t2.get$y()))));
    t3 = this._inertia;
    if (typeof t3 !== 'number')
      throw $.iae(t3);
    this.invInertia = 1.0 / t3;
  } else {
    this._inertia = 0.0;
    this.invInertia = 0.0;
  }
  t3 = this.oldCenter;
  t3.setFrom$1(t1.get$center());
  t1.get$localCenter().setFrom$1(t2);
  $.Transform_mulToOut(this.originTransform, t1.get$localCenter(), t1.get$centerZero());
  t1.get$center().setFrom$1(t1.get$centerZero());
  temp = $.Vector$copy(t1.get$center());
  temp.subLocal$1(t3);
  $.Vector_crossNumAndVectorToOut(this._angularVelocity, temp, temp);
  this._linearVelocity.addLocal$1(temp);
},
 getWorldPoint$1: function(localPoint) {
  var v = $.Vector$(0, 0);
  this.getWorldPointToOut$2(localPoint, v);
  return v;
},
 getWorldPointToOut$2: function(localPoint, out) {
  $.Transform_mulToOut(this.originTransform, localPoint, out);
},
 getWorldVector$1: function(localVector) {
  var out = $.Vector$(0, 0);
  this.getWorldVectorToOut$2(localVector, out);
  return out;
},
 getWorldVectorToOut$2: function(localVector, out) {
  $.Matrix22_mulMatrixAndVectorToOut(this.originTransform.get$rotation(), localVector, out);
},
 get$type: function() {
  return this._type;
},
 set$type: function(otherType) {
  if ($.eqB(this._type, otherType))
    return;
  this._type = otherType;
  this.resetMassData$0();
  if ($.eqB(this._type, 0)) {
    this._linearVelocity.setZero$0();
    this._angularVelocity = 0.0;
  }
  this.set$awake(true);
  this._force.setZero$0();
  this._torque = 0.0;
  for (var ce = this.contactList; !(ce == null); ce = ce.get$next())
    ce.get$contact().flagForFiltering$0();
},
 get$bullet: function() {
  return $.eq($.and(this.flags, 8), 8);
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
 get$awake: function() {
  return $.eq($.and(this.flags, 2), 2);
},
 get$active: function() {
  return $.eq($.and(this.flags, 32), 32);
},
 get$fixedRotation: function() {
  return $.eq($.and(this.flags, 16), 16);
},
 synchronizeFixtures$0: function() {
  var xf1 = this._pxf;
  var t1 = xf1.get$rotation();
  var t2 = this.sweep;
  t1.setAngle$1(t2.get$angleZero());
  $.Matrix22_mulMatrixAndVectorToOut(xf1.get$rotation(), t2.get$localCenter(), xf1.get$position());
  xf1.get$position().mulLocal$1(-1);
  xf1.get$position().addLocal$1(t2.get$centerZero());
  var broadPhase = this.world.get$_contactManager().get$broadPhase();
  for (var f = this.fixtureList, t1 = this.originTransform; !(f == null); f = f.get$next())
    f.synchronize$3(broadPhase, xf1, t1);
},
 synchronizeTransform$0: function() {
  var t1 = this.sweep;
  var c = $.cos(t1.angle);
  var s = $.sin(t1.angle);
  var t = this.originTransform;
  var r = t.rotation;
  var p = t.position;
  r.get$col1().set$x(c);
  var t2 = -s;
  r.get$col2().set$x(t2);
  r.get$col1().set$y(s);
  r.get$col2().set$y(c);
  t2 = r.get$col1().get$x();
  if (typeof t2 !== 'number')
    return this.synchronizeTransform$0$bailout(1, t2, r, p, t1, 0, 0);
  var t4 = t1.localCenter;
  var t5 = t4.get$x();
  if (typeof t5 !== 'number')
    return this.synchronizeTransform$0$bailout(2, t2, r, p, t5, t1, 0);
  t5 = t2 * t5;
  t2 = r.get$col2().get$x();
  if (typeof t2 !== 'number')
    return this.synchronizeTransform$0$bailout(3, t1, r, p, t5, t2, 0);
  var t8 = t4.get$y();
  if (typeof t8 !== 'number')
    return this.synchronizeTransform$0$bailout(4, t1, t8, r, p, t5, t2);
  var t10 = (t5 + t2 * t8) * -1;
  var t11 = t1.center;
  var t12 = t11.get$x();
  if (typeof t12 !== 'number')
    return this.synchronizeTransform$0$bailout(5, t1, r, p, t10, t12, 0);
  p.set$x(t10 + t12);
  var t14 = r.get$col1().get$y();
  if (typeof t14 !== 'number')
    return this.synchronizeTransform$0$bailout(6, r, t14, p, t1, 0, 0);
  var t16 = t4.get$x();
  if (typeof t16 !== 'number')
    return this.synchronizeTransform$0$bailout(7, t1, r, t14, p, t16, 0);
  t16 = t14 * t16;
  t14 = r.get$col2().get$y();
  if (typeof t14 !== 'number')
    return this.synchronizeTransform$0$bailout(8, t16, t14, p, t1, 0, 0);
  t4 = t4.get$y();
  if (typeof t4 !== 'number')
    return this.synchronizeTransform$0$bailout(9, t16, t14, p, t4, t1, 0);
  var t20 = (t16 + t14 * t4) * -1;
  t11 = t11.get$y();
  if (typeof t11 !== 'number')
    return this.synchronizeTransform$0$bailout(10, t11, p, t20, 0, 0, 0);
  p.set$y(t20 + t11);
},
 synchronizeTransform$0$bailout: function(state, env0, env1, env2, env3, env4, env5) {
  switch (state) {
    case 1:
      t2 = env0;
      r = env1;
      p = env2;
      t1 = env3;
      break;
    case 2:
      t2 = env0;
      r = env1;
      p = env2;
      t4 = env3;
      t1 = env4;
      break;
    case 3:
      t1 = env0;
      r = env1;
      p = env2;
      t4 = env3;
      t2 = env4;
      break;
    case 4:
      t1 = env0;
      t7 = env1;
      r = env2;
      p = env3;
      t4 = env4;
      t2 = env5;
      break;
    case 5:
      t1 = env0;
      r = env1;
      p = env2;
      t9 = env3;
      t10 = env4;
      break;
    case 6:
      r = env0;
      t12 = env1;
      p = env2;
      t1 = env3;
      break;
    case 7:
      t1 = env0;
      r = env1;
      t12 = env2;
      p = env3;
      t14 = env4;
      break;
    case 8:
      t14 = env0;
      t12 = env1;
      p = env2;
      t1 = env3;
      break;
    case 9:
      t14 = env0;
      t12 = env1;
      p = env2;
      t17 = env3;
      t1 = env4;
      break;
    case 10:
      t20 = env0;
      p = env1;
      t19 = env2;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.sweep;
      var c = $.cos(t1.get$angle());
      var s = $.sin(t1.get$angle());
      var t = this.originTransform;
      var r = t.get$rotation();
      var p = t.get$position();
      r.get$col1().set$x(c);
      var t2 = -s;
      r.get$col2().set$x(t2);
      r.get$col1().set$y(s);
      r.get$col2().set$y(c);
      t2 = r.get$col1().get$x();
    case 1:
      state = 0;
      var t4 = t1.get$localCenter().get$x();
    case 2:
      state = 0;
      t4 = $.mul(t2, t4);
      t2 = r.get$col2().get$x();
    case 3:
      state = 0;
      var t7 = t1.get$localCenter().get$y();
    case 4:
      state = 0;
      var t9 = $.mul($.add(t4, $.mul(t2, t7)), -1);
      var t10 = t1.get$center().get$x();
    case 5:
      state = 0;
      p.set$x($.add(t9, t10));
      var t12 = r.get$col1().get$y();
    case 6:
      state = 0;
      var t14 = t1.get$localCenter().get$x();
    case 7:
      state = 0;
      t14 = $.mul(t12, t14);
      t12 = r.get$col2().get$y();
    case 8:
      state = 0;
      var t17 = t1.get$localCenter().get$y();
    case 9:
      state = 0;
      var t19 = $.mul($.add(t14, $.mul(t12, t17)), -1);
      var t20 = t1.get$center().get$y();
    case 10:
      state = 0;
      p.set$y($.add(t19, t20));
  }
},
 shouldCollide$1: function(other) {
  return !(!$.eqB(this._type, 2) && !$.eqB(other.get$_type(), 2));
},
 advance$1: function(t) {
  var t1 = this.sweep;
  t1.advance$1(t);
  t1.get$center().setFrom$1(t1.get$centerZero());
  t1.set$angle(t1.get$angleZero());
  this.synchronizeTransform$0();
},
 Body$2: function(bd, world) {
  if (bd.get$bullet() === true)
    this.flags = $.or(this.flags, 8);
  if (bd.get$fixedRotation() === true)
    this.flags = $.or(this.flags, 16);
  if (bd.get$allowSleep() === true)
    this.flags = $.or(this.flags, 4);
  if (bd.get$awake() === true)
    this.flags = $.or(this.flags, 2);
  if (bd.get$active() === true)
    this.flags = $.or(this.flags, 32);
  var t1 = this.originTransform;
  t1.get$position().setFrom$1(bd.get$position());
  t1.get$rotation().setAngle$1(bd.get$angle());
  var t2 = this.sweep;
  t2.get$localCenter().setZero$0();
  $.Transform_mulToOut(t1, t2.get$localCenter(), t2.get$centerZero());
  t2.get$center().setFrom$1(t2.get$centerZero());
  t2.set$angle(bd.get$angle());
  t2.set$angleZero(bd.get$angle());
  if ($.eqB(this._type, 2)) {
    this.mass = 1;
    this.invMass = 1;
  } else {
    this.mass = 0;
    this.invMass = 0;
  }
}
};

$$.BodyDef = {"":
 ["type=", "angle=", "userData=", "position?", "linearVelocity?", "angularVelocity=", "fixedRotation?", "isSleeping", "bullet?", "allowSleep?", "linearDamping?", "angularDamping?", "awake=", "active?"],
 "super": "Object"
};

$$.ContactManager = {"":
 ["broadPhase?", "contactList=", "contactCount?", "contactFilter", "contactListener?", "pool"],
 "super": "Object",
 addPair$2: function(fixtureA, fixtureB) {
  var bodyA = fixtureA.get$body();
  var bodyB = fixtureB.get$body();
  if (bodyA == null ? bodyB == null : bodyA === bodyB)
    return;
  var edge = bodyB.get$contactList();
  for (; !(edge == null);) {
    if ($.eqB(edge.get$other(), bodyA)) {
      var fA = edge.get$contact().get$fixtureA();
      var fB = edge.get$contact().get$fixtureB();
      if ($.eqB(fA, fixtureA) && $.eqB(fB, fixtureB))
        return;
      if ($.eqB(fA, fixtureB) && $.eqB(fB, fixtureA))
        return;
    }
    edge = edge.get$next();
  }
  var t1 = bodyB.shouldCollide$1(bodyA);
  if (typeof t1 !== 'boolean')
    return this.addPair$2$bailout(1, fixtureA, fixtureB, t1);
  if (!t1)
    return;
  t1 = this.contactFilter;
  t1 = t1.shouldCollide$2(fixtureA, fixtureB);
  if (typeof t1 !== 'boolean')
    return this.addPair$2$bailout(2, fixtureA, fixtureB, t1);
  t1 = !t1;
  if (t1)
    return;
  var c = this.pool.popContact$2(fixtureA, fixtureB);
  fixtureA = c.get$fixtureA();
  fixtureB = c.get$fixtureB();
  bodyA = fixtureA.get$body();
  bodyB = fixtureB.get$body();
  c.set$prev(null);
  c.set$next(this.contactList);
  t1 = this.contactList;
  if (!(t1 == null))
    t1.set$prev(c);
  this.contactList = c;
  c.get$edge1().set$contact(c);
  c.get$edge1().set$other(bodyB);
  c.get$edge1().set$prev(null);
  t1 = bodyA.get$contactList();
  c.get$edge1().set$next(t1);
  if (!(bodyA.get$contactList() == null)) {
    t1 = c.get$edge1();
    bodyA.get$contactList().set$prev(t1);
  }
  bodyA.set$contactList(c.get$edge1());
  c.get$edge2().set$contact(c);
  c.get$edge2().set$other(bodyA);
  c.get$edge2().set$prev(null);
  t1 = bodyB.get$contactList();
  c.get$edge2().set$next(t1);
  if (!(bodyB.get$contactList() == null)) {
    t1 = c.get$edge2();
    bodyB.get$contactList().set$prev(t1);
  }
  bodyB.set$contactList(c.get$edge2());
  t1 = this.contactCount;
  if (typeof t1 !== 'number')
    return this.addPair$2$bailout(3, t1, 0, 0);
  this.contactCount = t1 + 1;
},
 addPair$2$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var fixtureA = env0;
      var fixtureB = env1;
      t1 = env2;
      break;
    case 2:
      fixtureA = env0;
      fixtureB = env1;
      t1 = env2;
      break;
    case 3:
      t1 = env0;
      break;
  }
  switch (state) {
    case 0:
      var bodyA = fixtureA.get$body();
      var bodyB = fixtureB.get$body();
      if (bodyA == null ? bodyB == null : bodyA === bodyB)
        return;
      var edge = bodyB.get$contactList();
      for (; !(edge == null);) {
        if ($.eqB(edge.get$other(), bodyA)) {
          var fA = edge.get$contact().get$fixtureA();
          var fB = edge.get$contact().get$fixtureB();
          if ($.eqB(fA, fixtureA) && $.eqB(fB, fixtureB))
            return;
          if ($.eqB(fA, fixtureB) && $.eqB(fB, fixtureA))
            return;
        }
        edge = edge.get$next();
      }
      var t1 = bodyB.shouldCollide$1(bodyA);
    case 1:
      state = 0;
      if ($.eqB(t1, false))
        return;
      t1 = this.contactFilter;
    case 2:
      if (state === 2 || state === 0 && !(t1 === null))
        switch (state) {
          case 0:
            t1 = t1.shouldCollide$2(fixtureA, fixtureB);
          case 2:
            state = 0;
            t1 = $.eqB(t1, false);
        }
      else
        t1 = false;
      if (t1)
        return;
      var c = this.pool.popContact$2(fixtureA, fixtureB);
      fixtureA = c.get$fixtureA();
      fixtureB = c.get$fixtureB();
      bodyA = fixtureA.get$body();
      bodyB = fixtureB.get$body();
      c.set$prev(null);
      c.set$next(this.contactList);
      t1 = this.contactList;
      if (!(t1 == null))
        t1.set$prev(c);
      this.contactList = c;
      c.get$edge1().set$contact(c);
      c.get$edge1().set$other(bodyB);
      c.get$edge1().set$prev(null);
      t1 = bodyA.get$contactList();
      c.get$edge1().set$next(t1);
      if (!(bodyA.get$contactList() == null)) {
        t1 = c.get$edge1();
        bodyA.get$contactList().set$prev(t1);
      }
      bodyA.set$contactList(c.get$edge1());
      c.get$edge2().set$contact(c);
      c.get$edge2().set$other(bodyA);
      c.get$edge2().set$prev(null);
      t1 = bodyB.get$contactList();
      c.get$edge2().set$next(t1);
      if (!(bodyB.get$contactList() == null)) {
        t1 = c.get$edge2();
        bodyB.get$contactList().set$prev(t1);
      }
      bodyB.set$contactList(c.get$edge2());
      t1 = this.contactCount;
    case 3:
      state = 0;
      this.contactCount = $.add(t1, 1);
  }
},
 findNewContacts$0: function() {
  this.broadPhase.updatePairs$1(this);
},
 destroy$1: function(c) {
  var fixtureA = c.get$fixtureA();
  var fixtureB = c.get$fixtureB();
  var bodyA = fixtureA.get$body();
  var bodyB = fixtureB.get$body();
  var t1 = this.contactListener;
  if (!(t1 == null) && c.get$touching() === true)
    t1.endContact$1(c);
  if (!(c.get$prev() == null)) {
    t1 = c.get$next();
    c.get$prev().set$next(t1);
  }
  if (!(c.get$next() == null)) {
    t1 = c.get$prev();
    c.get$next().set$prev(t1);
  }
  if ($.eqB(c, this.contactList))
    this.contactList = c.get$next();
  if (!(c.get$edge1().get$prev() == null)) {
    t1 = c.get$edge1().get$next();
    c.get$edge1().get$prev().set$next(t1);
  }
  if (!(c.get$edge1().get$next() == null)) {
    t1 = c.get$edge1().get$prev();
    c.get$edge1().get$next().set$prev(t1);
  }
  if ($.eqB(c.get$edge1(), bodyA.get$contactList()))
    bodyA.set$contactList(c.get$edge1().get$next());
  if (!(c.get$edge2().get$prev() == null)) {
    t1 = c.get$edge2().get$next();
    c.get$edge2().get$prev().set$next(t1);
  }
  if (!(c.get$edge2().get$next() == null)) {
    t1 = c.get$edge2().get$prev();
    c.get$edge2().get$next().set$prev(t1);
  }
  if ($.eqB(c.get$edge2(), bodyB.get$contactList()))
    bodyB.set$contactList(c.get$edge2().get$next());
  this.pool.pushContact$1(c);
  t1 = this.contactCount;
  if (typeof t1 !== 'number')
    return this.destroy$1$bailout(1, t1);
  this.contactCount = t1 - 1;
},
 destroy$1$bailout: function(state, t1) {
  this.contactCount = $.sub(t1, 1);
},
 collide$0: function() {
  var c = this.contactList;
  for (var t1 = this.contactFilter, t2 = !(t1 === null), t3 = this.broadPhase, t4 = this.contactListener; !(c == null);) {
    var fixtureA = c.get$fixtureA();
    var fixtureB = c.get$fixtureB();
    var bodyA = fixtureA.get$body();
    var bodyB = fixtureB.get$body();
    if ($.eqB(bodyA.get$awake(), false) && $.eqB(bodyB.get$awake(), false)) {
      c = c.get$next();
      continue;
    }
    if ($.eqB($.and(c.get$flags(), 8), 8)) {
      if ($.eqB(bodyB.shouldCollide$1(bodyA), false)) {
        var c0 = c.get$next();
        this.destroy$1(c);
        c = c0;
        continue;
      }
      if (t2 && $.eqB(t1.shouldCollide$2(fixtureA, fixtureB), false)) {
        c0 = c.get$next();
        this.destroy$1(c);
        c = c0;
        continue;
      }
      c.set$flags($.and(c.get$flags(), -9));
    }
    if ($.eqB(t3.testOverlap$2(fixtureA.get$proxy(), fixtureB.get$proxy()), false)) {
      c0 = c.get$next();
      this.destroy$1(c);
      c = c0;
      continue;
    }
    c.update$1(t4);
    c = c.get$next();
  }
}
};

$$.Filter = {"":
 ["categoryBits=", "maskBits=", "groupIndex="],
 "super": "Object",
 setFrom$1: function(other) {
  this.categoryBits = other.get$categoryBits();
  this.maskBits = other.get$maskBits();
  this.groupIndex = other.get$groupIndex();
}
};

$$.Fixture = {"":
 ["box?", "density?", "next=", "body?", "shape?", "friction=", "restitution=", "proxy?", "filter?", "isSensor?", "userData=", "_poolOne", "_poolTwo"],
 "super": "Object",
 next$0: function() { return this.next.call$0(); },
 filter$1: function(arg0) { return this.filter.call$1(arg0); },
 create$2: function(b, def) {
  this.userData = def.userData;
  this.friction = def.friction;
  this.restitution = def.restitution;
  this.body = b;
  this.next = null;
  this.filter.setFrom$1(def.filter);
  this.isSensor = def.isSensor;
  this.shape = def.shape.clone$0();
  this.density = def.density;
},
 createProxy$2: function(broadPhase, xf) {
  var t1 = this.shape;
  var t2 = this.box;
  t1.computeAxisAlignedBox$2(t2, xf);
  this.proxy = broadPhase.createProxy$2(t2, this);
},
 synchronize$3: function(broadPhase, transformOne, transformTwo) {
  if (this.proxy == null)
    return;
  var t1 = this.shape;
  var t2 = this._poolOne;
  t1.computeAxisAlignedBox$2(t2, transformOne);
  t1 = this.shape;
  var t3 = this._poolTwo;
  t1.computeAxisAlignedBox$2(t3, transformTwo);
  t1 = t2.lowerBound;
  var t4 = t1.get$x();
  if (typeof t4 !== 'number')
    return this.synchronize$3$bailout(1, broadPhase, transformOne, transformTwo, t4, t2, t3, 0, 0);
  var t6 = t3.lowerBound;
  var t7 = t6.get$x();
  if (typeof t7 !== 'number')
    return this.synchronize$3$bailout(2, broadPhase, transformOne, transformTwo, t4, t2, t7, t3, 0);
  t4 = t4 < t7 ? t1.get$x() : t6.get$x();
  var t5 = this.box;
  t7 = t5.lowerBound;
  t7.set$x(t4);
  t4 = t1.get$y();
  if (typeof t4 !== 'number')
    return this.synchronize$3$bailout(3, broadPhase, t5, transformTwo, transformOne, t2, t3, t4, 0);
  var t9 = t6.get$y();
  if (typeof t9 !== 'number')
    return this.synchronize$3$bailout(4, broadPhase, t5, transformTwo, transformOne, t9, t2, t3, t4);
  t7.set$y(t4 < t9 ? t1.get$y() : t6.get$y());
  t4 = t2.upperBound;
  t6 = t4.get$x();
  if (typeof t6 !== 'number')
    return this.synchronize$3$bailout(5, broadPhase, t5, transformTwo, transformOne, t6, t2, t3, 0);
  var t8 = t3.upperBound;
  t9 = t8.get$x();
  if (typeof t9 !== 'number')
    return this.synchronize$3$bailout(6, broadPhase, t5, transformTwo, transformOne, t6, t9, t2, t3);
  t6 = t6 > t9 ? t4.get$x() : t8.get$x();
  t7 = t5.upperBound;
  t7.set$x(t6);
  t6 = t4.get$y();
  if (typeof t6 !== 'number')
    return this.synchronize$3$bailout(7, broadPhase, t5, transformTwo, transformOne, t2, t3, t6, 0);
  var t10 = t8.get$y();
  if (typeof t10 !== 'number')
    return this.synchronize$3$bailout(8, broadPhase, t5, transformTwo, transformOne, t2, t3, t6, t10);
  t7.set$y(t6 > t10 ? t4.get$y() : t8.get$y());
  t2 = transformTwo.get$position().get$x();
  if (typeof t2 !== 'number')
    return this.synchronize$3$bailout(9, broadPhase, t5, t1, transformTwo, transformOne, t2, 0, 0);
  t4 = transformOne.get$position().get$x();
  if (typeof t4 !== 'number')
    return this.synchronize$3$bailout(10, broadPhase, t5, t1, transformTwo, transformOne, t4, t2, 0);
  t1.set$x(t2 - t4);
  t7 = transformTwo.get$position().get$y();
  if (typeof t7 !== 'number')
    return this.synchronize$3$bailout(11, broadPhase, t5, t1, t7, transformOne, 0, 0, 0);
  t9 = transformOne.get$position().get$y();
  if (typeof t9 !== 'number')
    return this.synchronize$3$bailout(12, broadPhase, t5, t1, t7, t9, 0, 0, 0);
  t1.set$y(t7 - t9);
  broadPhase.moveProxy$3(this.proxy, t5, t1);
},
 synchronize$3$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7) {
  switch (state) {
    case 1:
      var broadPhase = env0;
      var transformOne = env1;
      var transformTwo = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      break;
    case 2:
      broadPhase = env0;
      transformOne = env1;
      transformTwo = env2;
      t1 = env3;
      t2 = env4;
      t5 = env5;
      t3 = env6;
      break;
    case 3:
      broadPhase = env0;
      t4 = env1;
      transformTwo = env2;
      transformOne = env3;
      t2 = env4;
      t3 = env5;
      t1 = env6;
      break;
    case 4:
      broadPhase = env0;
      t4 = env1;
      transformTwo = env2;
      transformOne = env3;
      t6 = env4;
      t2 = env5;
      t3 = env6;
      t1 = env7;
      break;
    case 5:
      broadPhase = env0;
      t4 = env1;
      transformTwo = env2;
      transformOne = env3;
      t1 = env4;
      t2 = env5;
      t3 = env6;
      break;
    case 6:
      broadPhase = env0;
      t4 = env1;
      transformTwo = env2;
      transformOne = env3;
      t1 = env4;
      t6 = env5;
      t2 = env6;
      t3 = env7;
      break;
    case 7:
      broadPhase = env0;
      t4 = env1;
      transformTwo = env2;
      transformOne = env3;
      t2 = env4;
      t3 = env5;
      t1 = env6;
      break;
    case 8:
      broadPhase = env0;
      t4 = env1;
      transformTwo = env2;
      transformOne = env3;
      t2 = env4;
      t3 = env5;
      t1 = env6;
      t6 = env7;
      break;
    case 9:
      broadPhase = env0;
      t4 = env1;
      disp = env2;
      transformTwo = env3;
      transformOne = env4;
      t2 = env5;
      break;
    case 10:
      broadPhase = env0;
      t4 = env1;
      disp = env2;
      transformTwo = env3;
      transformOne = env4;
      t3 = env5;
      t2 = env6;
      break;
    case 11:
      broadPhase = env0;
      t4 = env1;
      disp = env2;
      t6 = env3;
      transformOne = env4;
      break;
    case 12:
      broadPhase = env0;
      t4 = env1;
      disp = env2;
      t6 = env3;
      t8 = env4;
      break;
  }
  switch (state) {
    case 0:
      if (this.proxy == null)
        return;
      var t1 = this.shape;
      var t2 = this._poolOne;
      t1.computeAxisAlignedBox$2(t2, transformOne);
      t1 = this.shape;
      var t3 = this._poolTwo;
      t1.computeAxisAlignedBox$2(t3, transformTwo);
      t1 = t2.get$lowerBound().get$x();
    case 1:
      state = 0;
      var t5 = t3.get$lowerBound().get$x();
    case 2:
      state = 0;
      t1 = $.ltB(t1, t5) ? t2.get$lowerBound().get$x() : t3.get$lowerBound().get$x();
      var t4 = this.box;
      t4.get$lowerBound().set$x(t1);
      t1 = t2.get$lowerBound().get$y();
    case 3:
      state = 0;
      var t6 = t3.get$lowerBound().get$y();
    case 4:
      state = 0;
      t1 = $.ltB(t1, t6) ? t2.get$lowerBound().get$y() : t3.get$lowerBound().get$y();
      t4.get$lowerBound().set$y(t1);
      t1 = t2.get$upperBound().get$x();
    case 5:
      state = 0;
      t6 = t3.get$upperBound().get$x();
    case 6:
      state = 0;
      t1 = $.gtB(t1, t6) ? t2.get$upperBound().get$x() : t3.get$upperBound().get$x();
      t4.get$upperBound().set$x(t1);
      t1 = t2.get$upperBound().get$y();
    case 7:
      state = 0;
      t6 = t3.get$upperBound().get$y();
    case 8:
      state = 0;
      t1 = $.gtB(t1, t6) ? t2.get$upperBound().get$y() : t3.get$upperBound().get$y();
      t4.get$upperBound().set$y(t1);
      var disp = t2.get$lowerBound();
      t2 = transformTwo.get$position().get$x();
    case 9:
      state = 0;
      t3 = transformOne.get$position().get$x();
    case 10:
      state = 0;
      disp.set$x($.sub(t2, t3));
      t6 = transformTwo.get$position().get$y();
    case 11:
      state = 0;
      var t8 = transformOne.get$position().get$y();
    case 12:
      state = 0;
      disp.set$y($.sub(t6, t8));
      broadPhase.moveProxy$3(this.proxy, t4, disp);
  }
},
 getMassData$1: function(massData) {
  this.shape.computeMass$2(massData, this.density);
},
 get$type: function() {
  return this.shape.get$type();
}
};

$$.FixtureDef = {"":
 ["shape?", "userData=", "friction=", "restitution=", "density?", "isSensor?", "filter?"],
 "super": "Object",
 filter$1: function(arg0) { return this.filter.call$1(arg0); },
 FixtureDef$0: function() {
  var t1 = this.filter;
  t1.set$categoryBits(1);
  t1.set$maskBits(65535);
  t1.set$groupIndex(0);
}
};

$$.Island = {"":
 ["listener", "bodies?", "contacts", "joints", "positions", "velocities", "bodyCount?", "jointCount", "contactCount?", "bodyCapacity", "contactCapacity", "jointCapacity", "positionIterationCount", "_contactSolver", "_translation", "impulse"],
 "super": "Object",
 init$4: function(argBodyCapacity, argContactCapacity, argJointCapacity, argListener) {
  this.bodyCapacity = argBodyCapacity;
  this.contactCapacity = argContactCapacity;
  this.jointCapacity = argJointCapacity;
  this.bodyCount = 0;
  this.contactCount = 0;
  this.listener = argListener;
  var t1 = this.bodies;
  if (t1 == null || $.gtB(this.bodyCapacity, $.get$length(t1)))
    this.bodies = $.ListImplementation_List(this.bodyCapacity, 'Body');
  t1 = this.contacts;
  if (t1 == null || $.gtB(this.contactCapacity, $.get$length(t1)))
    this.contacts = $.ListImplementation_List(this.contactCapacity, 'Contact');
  t1 = this.joints;
  if (t1 == null || $.gtB(this.jointCapacity, $.get$length(t1)))
    this.joints = $.ListImplementation_List(this.jointCapacity, 'Joint');
  t1 = this.velocities;
  if (t1 == null || $.gtB(this.bodyCapacity, $.get$length(t1))) {
    var old = this.velocities;
    if (old == null)
      old = $.ListImplementation_List(0, 'Velocity');
    this.velocities = $.ListImplementation_List(this.bodyCapacity, 'Velocity');
    $.setRange$3(this.velocities, 0, $.get$length(old), old);
    var i = $.get$length(old);
    if (i !== (i | 0))
      return this.init$4$bailout(1, i);
    for (; $.ltB(i, $.get$length(this.velocities)); ++i)
      $.indexSet(this.velocities, i, $.Velocity$());
  }
  t1 = this.positions;
  if (t1 == null || $.gtB(this.bodyCapacity, $.get$length(t1))) {
    old = this.positions;
    if (old == null)
      old = $.ListImplementation_List(0, 'Position');
    this.positions = $.ListImplementation_List(this.bodyCapacity, 'Position');
    $.setRange$3(this.positions, 0, $.get$length(old), old);
    i = $.get$length(old);
    if (i !== (i | 0))
      return this.init$4$bailout(2, i);
    for (; $.ltB(i, $.get$length(this.positions)); ++i)
      $.indexSet(this.positions, i, $.Position$());
  }
},
 init$4$bailout: function(state, env0) {
  switch (state) {
    case 1:
      i = env0;
      break;
    case 2:
      i = env0;
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
      var t1 = this.bodies;
      if (t1 == null || $.gtB(this.bodyCapacity, $.get$length(t1)))
        this.bodies = $.ListImplementation_List(this.bodyCapacity, 'Body');
      t1 = this.contacts;
      if (t1 == null || $.gtB(this.contactCapacity, $.get$length(t1)))
        this.contacts = $.ListImplementation_List(this.contactCapacity, 'Contact');
      t1 = this.joints;
      if (t1 == null || $.gtB(this.jointCapacity, $.get$length(t1)))
        this.joints = $.ListImplementation_List(this.jointCapacity, 'Joint');
      t1 = this.velocities;
    case 1:
      if (state === 1 || state === 0 && (t1 == null || $.gtB(this.bodyCapacity, $.get$length(t1))))
        switch (state) {
          case 0:
            var old = this.velocities;
            if (old == null)
              old = $.ListImplementation_List(0, 'Velocity');
            this.velocities = $.ListImplementation_List(this.bodyCapacity, 'Velocity');
            $.setRange$3(this.velocities, 0, $.get$length(old), old);
            var i = $.get$length(old);
          case 1:
            state = 0;
            for (; $.ltB(i, $.get$length(this.velocities)); i = $.add(i, 1))
              $.indexSet(this.velocities, i, $.Velocity$());
        }
      t1 = this.positions;
    case 2:
      if (state === 2 || state === 0 && (t1 == null || $.gtB(this.bodyCapacity, $.get$length(t1))))
        switch (state) {
          case 0:
            old = this.positions;
            if (old == null)
              old = $.ListImplementation_List(0, 'Position');
            this.positions = $.ListImplementation_List(this.bodyCapacity, 'Position');
            $.setRange$3(this.positions, 0, $.get$length(old), old);
            i = $.get$length(old);
          case 2:
            state = 0;
            for (; $.ltB(i, $.get$length(this.positions)); i = $.add(i, 1))
              $.indexSet(this.positions, i, $.Position$());
        }
  }
},
 clear$0: function() {
  this.bodyCount = 0;
  this.contactCount = 0;
  this.jointCount = 0;
},
 solve$3: function(step, gravity, allowSleep) {
  var i = 0;
  while (true) {
    var t1 = this.bodyCount;
    if (typeof t1 !== 'number')
      return this.solve$3$bailout(1, step, gravity, allowSleep, t1, i, 0, 0, 0, 0, 0, 0);
    if (!(i < t1))
      break;
    c$0: {
      t1 = this.bodies;
      if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
        return this.solve$3$bailout(2, step, gravity, allowSleep, i, t1, 0, 0, 0, 0, 0, 0);
      if (i < 0 || i >= t1.length)
        throw $.ioore(i);
      var b = t1[i];
      t1 = b.get$type();
      if (typeof t1 !== 'number')
        return this.solve$3$bailout(3, step, gravity, allowSleep, b, t1, i, 0, 0, 0, 0, 0);
      if (!(t1 === 2))
        break c$0;
      t1 = b.get$_force().get$x();
      if (typeof t1 !== 'number')
        return this.solve$3$bailout(4, step, gravity, allowSleep, t1, b, i, 0, 0, 0, 0, 0);
      var t3 = b.get$invMass();
      if (typeof t3 !== 'number')
        return this.solve$3$bailout(5, step, gravity, allowSleep, t1, t3, b, i, 0, 0, 0, 0);
      t3 = t1 * t3;
      t1 = gravity.get$x();
      if (typeof t1 !== 'number')
        return this.solve$3$bailout(6, step, gravity, allowSleep, b, t3, t1, i, 0, 0, 0, 0);
      t1 = t3 + t1;
      t3 = step.get$dt();
      if (typeof t3 !== 'number')
        return this.solve$3$bailout(7, step, gravity, allowSleep, b, i, t1, t3, 0, 0, 0, 0);
      t3 = t1 * t3;
      t1 = b.get$_force().get$y();
      if (typeof t1 !== 'number')
        return this.solve$3$bailout(8, step, gravity, allowSleep, t1, b, i, t3, 0, 0, 0, 0);
      var t8 = b.get$invMass();
      if (typeof t8 !== 'number')
        return this.solve$3$bailout(9, step, gravity, t8, t1, allowSleep, b, i, t3, 0, 0, 0);
      t8 = t1 * t8;
      t1 = gravity.get$y();
      if (typeof t1 !== 'number')
        return this.solve$3$bailout(10, step, gravity, allowSleep, t8, t1, b, i, t3, 0, 0, 0);
      t1 = t8 + t1;
      t8 = step.get$dt();
      if (typeof t8 !== 'number')
        return this.solve$3$bailout(11, step, gravity, allowSleep, t1, t8, b, i, t3, 0, 0, 0);
      var velocityDelta = $.Vector$(t3, t1 * t8);
      b.get$linearVelocity().addLocal$1(velocityDelta);
      t3 = b.get$angularVelocity();
      if (typeof t3 !== 'number')
        return this.solve$3$bailout(12, step, gravity, allowSleep, b, i, t3, 0, 0, 0, 0, 0);
      var t13 = step.get$dt();
      if (typeof t13 !== 'number')
        return this.solve$3$bailout(13, step, gravity, allowSleep, b, i, t3, t13, 0, 0, 0, 0);
      var t15 = b.get$invInertia();
      if (typeof t15 !== 'number')
        return this.solve$3$bailout(14, step, gravity, allowSleep, b, i, t3, t13, t15, 0, 0, 0);
      t15 = t13 * t15;
      t13 = b.get$_torque();
      if (typeof t13 !== 'number')
        return this.solve$3$bailout(15, step, t15, t13, allowSleep, gravity, b, i, t3, 0, 0, 0);
      b.set$angularVelocity(t3 + t15 * t13);
      var t18 = step.get$dt();
      if (typeof t18 !== 'number')
        return this.solve$3$bailout(16, step, gravity, allowSleep, b, t18, i, 0, 0, 0, 0, 0);
      var t20 = b.get$linearDamping();
      if (typeof t20 !== 'number')
        return this.solve$3$bailout(17, step, gravity, allowSleep, b, t18, t20, i, 0, 0, 0, 0);
      var a = 1.0 - t18 * t20;
      t1 = a < 1.0;
      if (0.0 > (t1 ? a : 1.0))
        var a1 = 0.0;
      else
        a1 = t1 ? a : 1.0;
      b.get$linearVelocity().mulLocal$1(a1);
      t1 = step.get$dt();
      if (typeof t1 !== 'number')
        return this.solve$3$bailout(18, step, gravity, allowSleep, b, t1, i, 0, 0, 0, 0, 0);
      t3 = b.get$angularDamping();
      if (typeof t3 !== 'number')
        return this.solve$3$bailout(19, step, gravity, allowSleep, b, t1, i, t3, 0, 0, 0, 0);
      var a2 = 1.0 - t1 * t3;
      var b1 = a2 < 1.0 ? a2 : 1.0;
      t1 = b.get$angularVelocity();
      if (typeof t1 !== 'number')
        return this.solve$3$bailout(20, step, gravity, allowSleep, b1, t1, b, i, 0, 0, 0, 0);
      b.set$angularVelocity(t1 * (0.0 > b1 ? 0.0 : b1));
    }
    ++i;
  }
  var i1 = -1;
  var i2 = 0;
  while (true) {
    t1 = this.contactCount;
    if (typeof t1 !== 'number')
      return this.solve$3$bailout(21, step, allowSleep, i1, i2, t1, 0, 0, 0, 0, 0, 0);
    if (!(i2 < t1))
      break;
    t1 = this.contacts;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
      return this.solve$3$bailout(22, step, t1, allowSleep, i1, i2, 0, 0, 0, 0, 0, 0);
    if (i2 < 0 || i2 >= t1.length)
      throw $.ioore(i2);
    var fixtureA = t1[i2].get$fixtureA();
    t3 = this.contacts;
    if (typeof t3 !== 'string' && (typeof t3 !== 'object' || t3 === null || t3.constructor !== Array && !t3.is$JavaScriptIndexingBehavior()))
      return this.solve$3$bailout(23, step, t3, allowSleep, i1, fixtureA, i2, 0, 0, 0, 0, 0);
    if (i2 < 0 || i2 >= t3.length)
      throw $.ioore(i2);
    var fixtureB = t3[i2].get$fixtureB();
    var bodyA = fixtureA.get$body();
    var bodyB = fixtureB.get$body();
    t1 = bodyA.get$type();
    if (typeof t1 !== 'number')
      return this.solve$3$bailout(24, step, allowSleep, i1, i2, bodyB, t1, 0, 0, 0, 0, 0);
    if (!(t1 === 0)) {
      t1 = bodyB.get$type();
      if (typeof t1 !== 'number')
        return this.solve$3$bailout(25, step, allowSleep, i1, t1, i2, 0, 0, 0, 0, 0, 0);
      var nonStatic = !(t1 === 0);
    } else
      nonStatic = false;
    if (nonStatic) {
      ++i1;
      t1 = this.contacts;
      if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
        return this.solve$3$bailout(26, step, allowSleep, i1, t1, i2, 0, 0, 0, 0, 0, 0);
      if (i1 < 0 || i1 >= t1.length)
        throw $.ioore(i1);
      var temp = t1[i1];
      if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())
        return this.solve$3$bailout(27, step, allowSleep, i1, temp, t1, i2, 0, 0, 0, 0, 0);
      var t4 = t1.length;
      if (i2 < 0 || i2 >= t4)
        throw $.ioore(i2);
      var t5 = t1[i2];
      if (i1 < 0 || i1 >= t4)
        throw $.ioore(i1);
      t1[i1] = t5;
      t5 = this.contacts;
      if (typeof t5 !== 'object' || t5 === null || (t5.constructor !== Array || !!t5.immutable$list) && !t5.is$JavaScriptIndexingBehavior())
        return this.solve$3$bailout(28, step, allowSleep, i1, temp, i2, t5, 0, 0, 0, 0, 0);
      if (i2 < 0 || i2 >= t5.length)
        throw $.ioore(i2);
      t5[i2] = temp;
    }
    ++i2;
  }
  var t2 = this._contactSolver;
  t2.init$3(this.contacts, t1, step.get$dtRatio());
  t2.warmStart$0();
  i = 0;
  while (true) {
    t1 = this.jointCount;
    if (typeof t1 !== 'number')
      return this.solve$3$bailout(29, step, allowSleep, i, t2, t1, 0, 0, 0, 0, 0, 0);
    if (!(i < t1))
      break;
    t1 = this.joints;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
      return this.solve$3$bailout(30, step, i, allowSleep, t2, t1, 0, 0, 0, 0, 0, 0);
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i].initVelocityConstraints$1(step);
    ++i;
  }
  i = 0;
  while (true) {
    t1 = step.get$velocityIterations();
    if (typeof t1 !== 'number')
      return this.solve$3$bailout(31, step, i, allowSleep, t1, t2, 0, 0, 0, 0, 0, 0);
    if (!(i < t1))
      break;
    var j = 0;
    while (true) {
      t1 = this.jointCount;
      if (typeof t1 !== 'number')
        return this.solve$3$bailout(32, step, i, t1, allowSleep, j, t2, 0, 0, 0, 0, 0);
      if (!(j < t1))
        break;
      t1 = this.joints;
      if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
        return this.solve$3$bailout(33, step, i, allowSleep, t1, j, t2, 0, 0, 0, 0, 0);
      if (j < 0 || j >= t1.length)
        throw $.ioore(j);
      t1[j].solveVelocityConstraints$1(step);
      ++j;
    }
    t2.solveVelocityConstraints$0();
    ++i;
  }
  t2.storeImpulses$0();
  temp = $.Vector$(0, 0);
  t1 = this._translation;
  i = 0;
  while (true) {
    t3 = this.bodyCount;
    if (typeof t3 !== 'number')
      return this.solve$3$bailout(34, step, allowSleep, t3, t2, i, t1, temp, 0, 0, 0, 0);
    if (!(i < t3))
      break;
    c$0: {
      t3 = this.bodies;
      if (typeof t3 !== 'string' && (typeof t3 !== 'object' || t3 === null || t3.constructor !== Array && !t3.is$JavaScriptIndexingBehavior()))
        return this.solve$3$bailout(35, step, allowSleep, t3, t2, i, t1, temp, 0, 0, 0, 0);
      if (i < 0 || i >= t3.length)
        throw $.ioore(i);
      b = t3[i];
      t3 = b.get$type();
      if (typeof t3 !== 'number')
        return this.solve$3$bailout(36, step, allowSleep, b, t3, t2, i, t1, temp, 0, 0, 0);
      if (t3 === 0)
        break c$0;
      t1.setFrom$1(b.get$linearVelocity());
      t1.mulLocal$1(step.get$dt());
      t3 = t1.x;
      if (typeof t3 !== 'number')
        return this.solve$3$bailout(37, step, allowSleep, b, t3, t2, i, t1, temp, 0, 0, 0);
      t3 *= t3;
      t5 = t1.y;
      if (typeof t5 !== 'number')
        return this.solve$3$bailout(39, step, allowSleep, b, t2, i, t1, t3, t5, temp, 0, 0);
      if (t3 + t5 * t5 > 4.0) {
        t3 = $.get$length(t1);
        if (typeof t3 !== 'number')
          throw $.iae(t3);
        var ratio = 2.0 / t3;
        b.get$linearVelocity().mulLocal$1(ratio);
      }
      t3 = step.get$dt();
      if (typeof t3 !== 'number')
        return this.solve$3$bailout(41, step, t3, allowSleep, b, t2, i, t1, temp, 0, 0, 0);
      t5 = b.get$angularVelocity();
      if (typeof t5 !== 'number')
        return this.solve$3$bailout(42, step, t3, t5, allowSleep, b, t2, i, t1, temp, 0, 0);
      var rotation = t3 * t5;
      if (rotation * rotation > 2.4674011002723395) {
        t3 = $.abs(rotation);
        if (typeof t3 !== 'number')
          throw $.iae(t3);
        ratio = 1.5707963267948966 / t3;
        t3 = b.get$angularVelocity();
        if (typeof t3 !== 'number')
          return this.solve$3$bailout(43, step, ratio, t3, allowSleep, b, t2, i, t1, temp, 0, 0);
        b.set$angularVelocity(t3 * ratio);
      }
      b.get$sweep().get$centerZero().setFrom$1(b.get$sweep().get$center());
      t3 = b.get$sweep().get$angle();
      b.get$sweep().set$angleZero(t3);
      temp.setFrom$1(b.get$linearVelocity());
      temp.mulLocal$1(step.get$dt());
      b.get$sweep().get$center().addLocal$1(temp);
      t3 = b.get$sweep();
      t4 = t3.get$angle();
      if (typeof t4 !== 'number')
        return this.solve$3$bailout(44, step, allowSleep, b, t3, t4, i, t1, t2, temp, 0, 0);
      var t6 = step.get$dt();
      if (typeof t6 !== 'number')
        return this.solve$3$bailout(45, step, allowSleep, b, t3, t4, i, t6, t2, t1, temp, 0);
      t8 = b.get$angularVelocity();
      if (typeof t8 !== 'number')
        return this.solve$3$bailout(46, step, allowSleep, b, t3, t4, i, t6, t8, t1, temp, t2);
      t3.set$angle(t4 + t6 * t8);
      b.synchronizeTransform$0();
    }
    ++i;
  }
  i = 0;
  while (true) {
    t1 = step.get$positionIterations();
    if (typeof t1 !== 'number')
      return this.solve$3$bailout(47, step, allowSleep, i, t2, t1, 0, 0, 0, 0, 0, 0);
    if (!(i < t1))
      break;
    var contactsOkay = t2.solvePositionConstraints$1(0.2);
    j = 0;
    var jointsOkay = true;
    while (true) {
      t1 = this.jointCount;
      if (typeof t1 !== 'number')
        return this.solve$3$bailout(48, step, allowSleep, t1, i, jointsOkay, t2, contactsOkay, j, 0, 0, 0);
      if (!(j < t1))
        break;
      t1 = this.joints;
      if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
        return this.solve$3$bailout(49, step, allowSleep, t1, i, jointsOkay, t2, contactsOkay, j, 0, 0, 0);
      if (j < 0 || j >= t1.length)
        throw $.ioore(j);
      var jointOkay = t1[j].solvePositionConstraints$1(0.2);
      jointsOkay = jointsOkay && jointOkay === true;
      ++j;
    }
    if (contactsOkay === true && jointsOkay)
      break;
    ++i;
  }
  this.report$1(t2.constraints);
  if (allowSleep === true) {
    var minSleepTime = 99999999999999.0;
    i = 0;
    while (true) {
      t1 = this.bodyCount;
      if (typeof t1 !== 'number')
        return this.solve$3$bailout(50, step, i, t1, minSleepTime, 0, 0, 0, 0, 0, 0, 0);
      if (!(i < t1))
        break;
      c$0: {
        t1 = this.bodies;
        if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
          return this.solve$3$bailout(51, step, i, t1, minSleepTime, 0, 0, 0, 0, 0, 0, 0);
        if (i < 0 || i >= t1.length)
          throw $.ioore(i);
        b = t1[i];
        t1 = b.get$type();
        if (typeof t1 !== 'number')
          return this.solve$3$bailout(52, step, b, minSleepTime, t1, i, 0, 0, 0, 0, 0, 0);
        if (t1 === 0)
          break c$0;
        t1 = b.get$flags();
        if (t1 !== (t1 | 0))
          return this.solve$3$bailout(53, step, t1, b, minSleepTime, i, 0, 0, 0, 0, 0, 0);
        if ((t1 & 4) === 0) {
          b.set$sleepTime(0.0);
          minSleepTime = 0.0;
        }
        t1 = b.get$flags();
        if (t1 !== (t1 | 0))
          return this.solve$3$bailout(54, step, b, i, minSleepTime, t1, 0, 0, 0, 0, 0, 0);
        if (!((t1 & 4) === 0)) {
          t1 = b.get$angularVelocity();
          if (typeof t1 !== 'number')
            return this.solve$3$bailout(55, step, b, t1, i, minSleepTime, 0, 0, 0, 0, 0, 0);
          t3 = b.get$angularVelocity();
          if (typeof t3 !== 'number')
            return this.solve$3$bailout(56, step, b, t1, i, t3, minSleepTime, 0, 0, 0, 0, 0);
          if (!(t1 * t3 > 0.0012184696791468343)) {
            t1 = b.get$linearVelocity();
            t2 = b.get$linearVelocity();
            t3 = t1.get$x();
            if (typeof t3 !== 'number')
              return this.solve$3$bailout(57, step, t1, t2, t3, b, i, minSleepTime, 0, 0, 0, 0);
            t5 = t2.get$x();
            if (typeof t5 !== 'number')
              return this.solve$3$bailout(58, step, t1, t2, t3, t5, b, i, minSleepTime, 0, 0, 0);
            t5 = t3 * t5;
            t1 = t1.get$y();
            if (typeof t1 !== 'number')
              return this.solve$3$bailout(59, step, t2, b, t5, t1, i, minSleepTime, 0, 0, 0, 0);
            t2 = t2.get$y();
            if (typeof t2 !== 'number')
              return this.solve$3$bailout(60, step, b, t5, t1, i, t2, minSleepTime, 0, 0, 0, 0);
            t8 = t5 + t1 * t2 > 0.0001;
            t1 = t8;
          } else
            t1 = true;
        } else
          t1 = true;
        if (t1) {
          b.set$sleepTime(0.0);
          minSleepTime = 0.0;
        } else {
          t1 = b.get$sleepTime();
          if (typeof t1 !== 'number')
            return this.solve$3$bailout(61, step, b, i, minSleepTime, t1, 0, 0, 0, 0, 0, 0);
          t3 = step.get$dt();
          if (typeof t3 !== 'number')
            return this.solve$3$bailout(62, step, b, i, minSleepTime, t1, t3, 0, 0, 0, 0, 0);
          b.set$sleepTime(t1 + t3);
          minSleepTime = $.min(minSleepTime, b.get$sleepTime());
        }
      }
      ++i;
    }
    if (minSleepTime >= 0.5) {
      i = 0;
      while (true) {
        t1 = this.bodyCount;
        if (typeof t1 !== 'number')
          return this.solve$3$bailout(63, t1, i, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        if (!(i < t1))
          break;
        t1 = this.bodies;
        if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
          return this.solve$3$bailout(64, i, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        if (i < 0 || i >= t1.length)
          throw $.ioore(i);
        t1[i].set$awake(false);
        ++i;
      }
    }
  }
},
 solve$3$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10) {
  switch (state) {
    case 1:
      var step = env0;
      var gravity = env1;
      var allowSleep = env2;
      t1 = env3;
      i = env4;
      break;
    case 2:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      i = env3;
      t1 = env4;
      break;
    case 3:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      b = env3;
      t1 = env4;
      i = env5;
      break;
    case 4:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      t1 = env3;
      b = env4;
      i = env5;
      break;
    case 5:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      t1 = env3;
      t3 = env4;
      b = env5;
      i = env6;
      break;
    case 6:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      b = env3;
      t3 = env4;
      t1 = env5;
      i = env6;
      break;
    case 7:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      b = env3;
      i = env4;
      t1 = env5;
      t3 = env6;
      break;
    case 8:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      t1 = env3;
      b = env4;
      i = env5;
      t3 = env6;
      break;
    case 9:
      step = env0;
      gravity = env1;
      t8 = env2;
      t1 = env3;
      allowSleep = env4;
      b = env5;
      i = env6;
      t3 = env7;
      break;
    case 10:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      t8 = env3;
      t1 = env4;
      b = env5;
      i = env6;
      t3 = env7;
      break;
    case 11:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      t1 = env3;
      t8 = env4;
      b = env5;
      i = env6;
      t3 = env7;
      break;
    case 12:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      b = env3;
      i = env4;
      t3 = env5;
      break;
    case 13:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      b = env3;
      i = env4;
      t3 = env5;
      t13 = env6;
      break;
    case 14:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      b = env3;
      i = env4;
      t3 = env5;
      t13 = env6;
      t15 = env7;
      break;
    case 15:
      step = env0;
      t15 = env1;
      t13 = env2;
      allowSleep = env3;
      gravity = env4;
      b = env5;
      i = env6;
      t3 = env7;
      break;
    case 16:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      b = env3;
      t18 = env4;
      i = env5;
      break;
    case 17:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      b = env3;
      t18 = env4;
      t20 = env5;
      i = env6;
      break;
    case 18:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      b = env3;
      t1 = env4;
      i = env5;
      break;
    case 19:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      b = env3;
      t1 = env4;
      i = env5;
      t3 = env6;
      break;
    case 20:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      b1 = env3;
      t1 = env4;
      b = env5;
      i = env6;
      break;
    case 21:
      step = env0;
      allowSleep = env1;
      i1 = env2;
      i2 = env3;
      t1 = env4;
      break;
    case 22:
      step = env0;
      t1 = env1;
      allowSleep = env2;
      i1 = env3;
      i2 = env4;
      break;
    case 23:
      step = env0;
      t3 = env1;
      allowSleep = env2;
      i1 = env3;
      fixtureA = env4;
      i2 = env5;
      break;
    case 24:
      step = env0;
      allowSleep = env1;
      i1 = env2;
      i2 = env3;
      bodyB = env4;
      t1 = env5;
      break;
    case 25:
      step = env0;
      allowSleep = env1;
      i1 = env2;
      t1 = env3;
      i2 = env4;
      break;
    case 26:
      step = env0;
      allowSleep = env1;
      i1 = env2;
      t1 = env3;
      i2 = env4;
      break;
    case 27:
      step = env0;
      allowSleep = env1;
      i1 = env2;
      temp = env3;
      t1 = env4;
      i2 = env5;
      break;
    case 28:
      step = env0;
      allowSleep = env1;
      i1 = env2;
      temp = env3;
      i2 = env4;
      t1 = env5;
      break;
    case 29:
      step = env0;
      allowSleep = env1;
      i = env2;
      t1 = env3;
      t2 = env4;
      break;
    case 30:
      step = env0;
      i = env1;
      allowSleep = env2;
      t1 = env3;
      t2 = env4;
      break;
    case 31:
      step = env0;
      i = env1;
      allowSleep = env2;
      t2 = env3;
      t1 = env4;
      break;
    case 32:
      step = env0;
      i = env1;
      t2 = env2;
      allowSleep = env3;
      j = env4;
      t1 = env5;
      break;
    case 33:
      step = env0;
      i = env1;
      allowSleep = env2;
      t2 = env3;
      j = env4;
      t1 = env5;
      break;
    case 34:
      step = env0;
      allowSleep = env1;
      t3 = env2;
      t1 = env3;
      i = env4;
      t2 = env5;
      temp = env6;
      break;
    case 35:
      step = env0;
      allowSleep = env1;
      t3 = env2;
      t1 = env3;
      i = env4;
      t2 = env5;
      temp = env6;
      break;
    case 36:
      step = env0;
      allowSleep = env1;
      b = env2;
      t3 = env3;
      t1 = env4;
      i = env5;
      t2 = env6;
      temp = env7;
      break;
    case 37:
      step = env0;
      allowSleep = env1;
      b = env2;
      t3 = env3;
      t1 = env4;
      i = env5;
      t2 = env6;
      temp = env7;
      break;
    case 38:
      step = env0;
      allowSleep = env1;
      b = env2;
      t3 = env3;
      t5 = env4;
      i = env5;
      t2 = env6;
      t1 = env7;
      temp = env8;
      break;
    case 39:
      step = env0;
      allowSleep = env1;
      b = env2;
      t1 = env3;
      i = env4;
      t2 = env5;
      t5 = env6;
      t3 = env7;
      temp = env8;
      break;
    case 40:
      step = env0;
      allowSleep = env1;
      b = env2;
      t1 = env3;
      i = env4;
      t2 = env5;
      t5 = env6;
      t8 = env7;
      temp = env8;
      t3 = env9;
      break;
    case 41:
      step = env0;
      t3 = env1;
      allowSleep = env2;
      b = env3;
      t1 = env4;
      i = env5;
      t2 = env6;
      temp = env7;
      break;
    case 42:
      step = env0;
      t3 = env1;
      t5 = env2;
      allowSleep = env3;
      b = env4;
      t1 = env5;
      i = env6;
      t2 = env7;
      temp = env8;
      break;
    case 43:
      step = env0;
      ratio = env1;
      t3 = env2;
      allowSleep = env3;
      b = env4;
      t1 = env5;
      i = env6;
      t2 = env7;
      temp = env8;
      break;
    case 44:
      step = env0;
      allowSleep = env1;
      b = env2;
      t3 = env3;
      t4 = env4;
      i = env5;
      t2 = env6;
      t1 = env7;
      temp = env8;
      break;
    case 45:
      step = env0;
      allowSleep = env1;
      b = env2;
      t3 = env3;
      t4 = env4;
      i = env5;
      t6 = env6;
      t1 = env7;
      t2 = env8;
      temp = env9;
      break;
    case 46:
      step = env0;
      allowSleep = env1;
      b = env2;
      t3 = env3;
      t4 = env4;
      i = env5;
      t6 = env6;
      t8 = env7;
      t2 = env8;
      temp = env9;
      t1 = env10;
      break;
    case 47:
      step = env0;
      allowSleep = env1;
      i = env2;
      t1 = env3;
      t2 = env4;
      break;
    case 48:
      step = env0;
      allowSleep = env1;
      t2 = env2;
      i = env3;
      jointsOkay = env4;
      t1 = env5;
      contactsOkay = env6;
      j = env7;
      break;
    case 49:
      step = env0;
      allowSleep = env1;
      t2 = env2;
      i = env3;
      jointsOkay = env4;
      t1 = env5;
      contactsOkay = env6;
      j = env7;
      break;
    case 50:
      step = env0;
      i = env1;
      t1 = env2;
      minSleepTime = env3;
      break;
    case 51:
      step = env0;
      i = env1;
      t1 = env2;
      minSleepTime = env3;
      break;
    case 52:
      step = env0;
      b = env1;
      minSleepTime = env2;
      t1 = env3;
      i = env4;
      break;
    case 53:
      step = env0;
      t1 = env1;
      b = env2;
      minSleepTime = env3;
      i = env4;
      break;
    case 54:
      step = env0;
      b = env1;
      i = env2;
      minSleepTime = env3;
      t1 = env4;
      break;
    case 55:
      step = env0;
      b = env1;
      t1 = env2;
      i = env3;
      minSleepTime = env4;
      break;
    case 56:
      step = env0;
      b = env1;
      t1 = env2;
      i = env3;
      t3 = env4;
      minSleepTime = env5;
      break;
    case 57:
      step = env0;
      t1 = env1;
      t2 = env2;
      t3 = env3;
      b = env4;
      i = env5;
      minSleepTime = env6;
      break;
    case 58:
      step = env0;
      t1 = env1;
      t2 = env2;
      t3 = env3;
      t5 = env4;
      b = env5;
      i = env6;
      minSleepTime = env7;
      break;
    case 59:
      step = env0;
      t2 = env1;
      b = env2;
      t5 = env3;
      t1 = env4;
      i = env5;
      minSleepTime = env6;
      break;
    case 60:
      step = env0;
      b = env1;
      t5 = env2;
      t1 = env3;
      i = env4;
      t2 = env5;
      minSleepTime = env6;
      break;
    case 61:
      step = env0;
      b = env1;
      i = env2;
      minSleepTime = env3;
      t1 = env4;
      break;
    case 62:
      step = env0;
      b = env1;
      i = env2;
      minSleepTime = env3;
      t1 = env4;
      t3 = env5;
      break;
    case 63:
      t1 = env0;
      i = env1;
      break;
    case 64:
      i = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var i = 0;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              var t1 = this.bodyCount;
            case 1:
              state = 0;
              if (!$.ltB(i, t1))
                break L0;
            default:
              c$0: {
                switch (state) {
                  case 0:
                    t1 = this.bodies;
                  case 2:
                    state = 0;
                    var b = $.index(t1, i);
                    t1 = b.get$type();
                  case 3:
                    state = 0;
                    if (!$.eqB(t1, 2))
                      break c$0;
                    t1 = b.get$_force().get$x();
                  case 4:
                    state = 0;
                    var t3 = b.get$invMass();
                  case 5:
                    state = 0;
                    t3 = $.mul(t1, t3);
                    t1 = gravity.get$x();
                  case 6:
                    state = 0;
                    t1 = $.add(t3, t1);
                    t3 = step.get$dt();
                  case 7:
                    state = 0;
                    t3 = $.mul(t1, t3);
                    t1 = b.get$_force().get$y();
                  case 8:
                    state = 0;
                    var t8 = b.get$invMass();
                  case 9:
                    state = 0;
                    t8 = $.mul(t1, t8);
                    t1 = gravity.get$y();
                  case 10:
                    state = 0;
                    t1 = $.add(t8, t1);
                    t8 = step.get$dt();
                  case 11:
                    state = 0;
                    var velocityDelta = $.Vector$(t3, $.mul(t1, t8));
                    b.get$linearVelocity().addLocal$1(velocityDelta);
                    t3 = b.get$angularVelocity();
                  case 12:
                    state = 0;
                    var t13 = step.get$dt();
                  case 13:
                    state = 0;
                    var t15 = b.get$invInertia();
                  case 14:
                    state = 0;
                    t15 = $.mul(t13, t15);
                    t13 = b.get$_torque();
                  case 15:
                    state = 0;
                    b.set$angularVelocity($.add(t3, $.mul(t15, t13)));
                    var t18 = step.get$dt();
                  case 16:
                    state = 0;
                    var t20 = b.get$linearDamping();
                  case 17:
                    state = 0;
                    t20 = $.mul(t18, t20);
                    if (typeof t20 !== 'number')
                      throw $.iae(t20);
                    var a = 1.0 - t20;
                    t1 = a < 1.0;
                    if (0.0 > (t1 ? a : 1.0))
                      var a1 = 0.0;
                    else
                      a1 = t1 ? a : 1.0;
                    b.get$linearVelocity().mulLocal$1(a1);
                    t1 = step.get$dt();
                  case 18:
                    state = 0;
                    t3 = b.get$angularDamping();
                  case 19:
                    state = 0;
                    t3 = $.mul(t1, t3);
                    if (typeof t3 !== 'number')
                      throw $.iae(t3);
                    var a2 = 1.0 - t3;
                    var b1 = a2 < 1.0 ? a2 : 1.0;
                    t1 = b.get$angularVelocity();
                  case 20:
                    state = 0;
                    b.set$angularVelocity($.mul(t1, 0.0 > b1 ? 0.0 : b1));
                }
              }
              ++i;
          }
      var i1 = -1;
      var i2 = 0;
    case 21:
    case 22:
    case 23:
    case 24:
    case 25:
    case 26:
    case 27:
    case 28:
      L1:
        while (true)
          switch (state) {
            case 0:
              t1 = this.contactCount;
            case 21:
              state = 0;
              if (!$.ltB(i2, t1))
                break L1;
              t1 = this.contacts;
            case 22:
              state = 0;
              var fixtureA = $.index(t1, i2).get$fixtureA();
              t3 = this.contacts;
            case 23:
              state = 0;
              var fixtureB = $.index(t3, i2).get$fixtureB();
              var bodyA = fixtureA.get$body();
              var bodyB = fixtureB.get$body();
              t1 = bodyA.get$type();
            case 24:
              state = 0;
            case 25:
              if (state === 25 || state === 0 && !$.eqB(t1, 0))
                switch (state) {
                  case 0:
                    t1 = bodyB.get$type();
                  case 25:
                    state = 0;
                    var nonStatic = !$.eqB(t1, 0);
                }
              else
                nonStatic = false;
            default:
              if (state === 28 || state === 27 || state === 26 || state === 0 && nonStatic)
                switch (state) {
                  case 0:
                    ++i1;
                    t1 = this.contacts;
                  case 26:
                    state = 0;
                    var temp = $.index(t1, i1);
                    t1 = this.contacts;
                  case 27:
                    state = 0;
                    $.indexSet(t1, i1, $.index(t1, i2));
                    t1 = this.contacts;
                  case 28:
                    state = 0;
                    $.indexSet(t1, i2, temp);
                }
              ++i2;
          }
      t1 = this._contactSolver;
      t1.init$3(this.contacts, this.contactCount, step.get$dtRatio());
      t1.warmStart$0();
      i = 0;
    case 29:
    case 30:
      L2:
        while (true)
          switch (state) {
            case 0:
              var t2 = this.jointCount;
            case 29:
              state = 0;
              if (!$.ltB(i, t2))
                break L2;
              t2 = this.joints;
            case 30:
              state = 0;
              $.index(t2, i).initVelocityConstraints$1(step);
              ++i;
          }
      i = 0;
    case 31:
    case 32:
    case 33:
      L3:
        while (true)
          switch (state) {
            case 0:
              t2 = step.get$velocityIterations();
            case 31:
              state = 0;
              if (!$.ltB(i, t2))
                break L3;
              var j = 0;
            default:
              L4:
                while (true)
                  switch (state) {
                    case 0:
                      t2 = this.jointCount;
                    case 32:
                      state = 0;
                      if (!$.ltB(j, t2))
                        break L4;
                      t2 = this.joints;
                    case 33:
                      state = 0;
                      $.index(t2, j).solveVelocityConstraints$1(step);
                      ++j;
                  }
              t1.solveVelocityConstraints$0();
              ++i;
          }
      t1.storeImpulses$0();
      temp = $.Vector$(0, 0);
      t2 = this._translation;
      i = 0;
    case 34:
    case 35:
    case 36:
    case 37:
    case 38:
    case 39:
    case 40:
    case 41:
    case 42:
    case 43:
    case 44:
    case 45:
    case 46:
      L5:
        while (true)
          switch (state) {
            case 0:
              t3 = this.bodyCount;
            case 34:
              state = 0;
              if (!$.ltB(i, t3))
                break L5;
            default:
              c$0: {
                switch (state) {
                  case 0:
                    t3 = this.bodies;
                  case 35:
                    state = 0;
                    b = $.index(t3, i);
                    t3 = b.get$type();
                  case 36:
                    state = 0;
                    if ($.eqB(t3, 0))
                      break c$0;
                    t2.setFrom$1(b.get$linearVelocity());
                    t2.mulLocal$1(step.get$dt());
                    t3 = t2.get$x();
                  case 37:
                    state = 0;
                    var t5 = t2.get$x();
                  case 38:
                    state = 0;
                    t5 = $.mul(t3, t5);
                    t3 = t2.get$y();
                  case 39:
                    state = 0;
                    t8 = t2.get$y();
                  case 40:
                    state = 0;
                    if ($.gtB($.add(t5, $.mul(t3, t8)), 4.0)) {
                      t3 = $.get$length(t2);
                      if (typeof t3 !== 'number')
                        throw $.iae(t3);
                      var ratio = 2.0 / t3;
                      b.get$linearVelocity().mulLocal$1(ratio);
                    }
                    t3 = step.get$dt();
                  case 41:
                    state = 0;
                    t5 = b.get$angularVelocity();
                  case 42:
                    state = 0;
                    var rotation = $.mul(t3, t5);
                  case 43:
                    if (state === 43 || state === 0 && $.gtB($.mul(rotation, rotation), 2.4674011002723395))
                      switch (state) {
                        case 0:
                          t3 = $.abs(rotation);
                          if (typeof t3 !== 'number')
                            throw $.iae(t3);
                          ratio = 1.5707963267948966 / t3;
                          t3 = b.get$angularVelocity();
                        case 43:
                          state = 0;
                          b.set$angularVelocity($.mul(t3, ratio));
                      }
                    b.get$sweep().get$centerZero().setFrom$1(b.get$sweep().get$center());
                    t3 = b.get$sweep().get$angle();
                    b.get$sweep().set$angleZero(t3);
                    temp.setFrom$1(b.get$linearVelocity());
                    temp.mulLocal$1(step.get$dt());
                    b.get$sweep().get$center().addLocal$1(temp);
                    t3 = b.get$sweep();
                    var t4 = t3.get$angle();
                  case 44:
                    state = 0;
                    var t6 = step.get$dt();
                  case 45:
                    state = 0;
                    t8 = b.get$angularVelocity();
                  case 46:
                    state = 0;
                    t3.set$angle($.add(t4, $.mul(t6, t8)));
                    b.synchronizeTransform$0();
                }
              }
              ++i;
          }
      i = 0;
    case 47:
    case 48:
    case 49:
      L6:
        while (true)
          switch (state) {
            case 0:
              t2 = step.get$positionIterations();
            case 47:
              state = 0;
              if (!$.ltB(i, t2))
                break L6;
              var contactsOkay = t1.solvePositionConstraints$1(0.2);
              j = 0;
              var jointsOkay = true;
            default:
              L7:
                while (true)
                  switch (state) {
                    case 0:
                      t2 = this.jointCount;
                    case 48:
                      state = 0;
                      if (!$.ltB(j, t2))
                        break L7;
                      t2 = this.joints;
                    case 49:
                      state = 0;
                      var jointOkay = $.index(t2, j).solvePositionConstraints$1(0.2);
                      jointsOkay = jointsOkay && jointOkay === true;
                      ++j;
                  }
              if (contactsOkay === true && jointsOkay)
                break L6;
              ++i;
          }
      this.report$1(t1.get$constraints());
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
    case 58:
    case 59:
    case 60:
    case 61:
    case 62:
    case 63:
    case 64:
      if (state === 64 || state === 63 || state === 62 || state === 61 || state === 60 || state === 59 || state === 58 || state === 57 || state === 56 || state === 55 || state === 54 || state === 53 || state === 52 || state === 51 || state === 50 || state === 0 && allowSleep === true)
        switch (state) {
          case 0:
            var minSleepTime = 99999999999999.0;
            i = 0;
          default:
            L8:
              while (true)
                switch (state) {
                  case 0:
                    t1 = this.bodyCount;
                  case 50:
                    state = 0;
                    if (!$.ltB(i, t1))
                      break L8;
                  default:
                    c$0: {
                      switch (state) {
                        case 0:
                          t1 = this.bodies;
                        case 51:
                          state = 0;
                          b = $.index(t1, i);
                          t1 = b.get$type();
                        case 52:
                          state = 0;
                          if ($.eqB(t1, 0))
                            break c$0;
                          t1 = b.get$flags();
                        case 53:
                          state = 0;
                          if ($.eqB($.and(t1, 4), 0)) {
                            b.set$sleepTime(0.0);
                            minSleepTime = 0.0;
                          }
                          t1 = b.get$flags();
                        case 54:
                          state = 0;
                        default:
                          if (state === 60 || state === 59 || state === 58 || state === 57 || state === 56 || state === 55 || state === 0 && !$.eqB($.and(t1, 4), 0))
                            switch (state) {
                              case 0:
                                t1 = b.get$angularVelocity();
                              case 55:
                                state = 0;
                                t3 = b.get$angularVelocity();
                              case 56:
                                state = 0;
                              default:
                                if (state === 60 || state === 59 || state === 58 || state === 57 || state === 0 && !$.gtB($.mul(t1, t3), 0.0012184696791468343))
                                  switch (state) {
                                    case 0:
                                      t1 = b.get$linearVelocity();
                                      t2 = b.get$linearVelocity();
                                      t3 = t1.get$x();
                                    case 57:
                                      state = 0;
                                      t5 = t2.get$x();
                                    case 58:
                                      state = 0;
                                      t5 = $.mul(t3, t5);
                                      t1 = t1.get$y();
                                    case 59:
                                      state = 0;
                                      t2 = t2.get$y();
                                    case 60:
                                      state = 0;
                                      t8 = $.gtB($.add(t5, $.mul(t1, t2)), 0.0001);
                                      t1 = t8;
                                  }
                                else
                                  t1 = true;
                            }
                          else
                            t1 = true;
                        case 61:
                        case 62:
                          if (state === 0 && t1) {
                            b.set$sleepTime(0.0);
                            minSleepTime = 0.0;
                          } else
                            switch (state) {
                              case 0:
                                t1 = b.get$sleepTime();
                              case 61:
                                state = 0;
                                t3 = step.get$dt();
                              case 62:
                                state = 0;
                                b.set$sleepTime($.add(t1, t3));
                                minSleepTime = $.min(minSleepTime, b.get$sleepTime());
                            }
                      }
                    }
                    ++i;
                }
          case 63:
          case 64:
            if (state === 64 || state === 63 || state === 0 && minSleepTime >= 0.5)
              switch (state) {
                case 0:
                  i = 0;
                default:
                  L9:
                    while (true)
                      switch (state) {
                        case 0:
                          t1 = this.bodyCount;
                        case 63:
                          state = 0;
                          if (!$.ltB(i, t1))
                            break L9;
                          t1 = this.bodies;
                        case 64:
                          state = 0;
                          $.index(t1, i).set$awake(false);
                          ++i;
                      }
              }
        }
  }
},
 addBody$1: function(body) {
  body.set$islandIndex(this.bodyCount);
  var t1 = this.bodies;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())
    return this.addBody$1$bailout(1, body, t1, 0);
  var t3 = this.bodyCount;
  if (typeof t3 !== 'number')
    return this.addBody$1$bailout(2, body, t1, t3);
  this.bodyCount = t3 + 1;
  if (t3 !== (t3 | 0))
    throw $.iae(t3);
  if (t3 < 0 || t3 >= t1.length)
    throw $.ioore(t3);
  t1[t3] = body;
},
 addBody$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var body = env0;
      t1 = env1;
      break;
    case 2:
      body = env0;
      t1 = env1;
      t3 = env2;
      break;
  }
  switch (state) {
    case 0:
      body.set$islandIndex(this.bodyCount);
      var t1 = this.bodies;
    case 1:
      state = 0;
      var t3 = this.bodyCount;
    case 2:
      state = 0;
      this.bodyCount = $.add(t3, 1);
      $.indexSet(t1, t3, body);
  }
},
 addContact$1: function(contact) {
  var t1 = this.contacts;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())
    return this.addContact$1$bailout(1, contact, t1, 0);
  var t3 = this.contactCount;
  if (typeof t3 !== 'number')
    return this.addContact$1$bailout(2, contact, t1, t3);
  this.contactCount = t3 + 1;
  if (t3 !== (t3 | 0))
    throw $.iae(t3);
  if (t3 < 0 || t3 >= t1.length)
    throw $.ioore(t3);
  t1[t3] = contact;
},
 addContact$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var contact = env0;
      t1 = env1;
      break;
    case 2:
      contact = env0;
      t1 = env1;
      t3 = env2;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.contacts;
    case 1:
      state = 0;
      var t3 = this.contactCount;
    case 2:
      state = 0;
      this.contactCount = $.add(t3, 1);
      $.indexSet(t1, t3, contact);
  }
},
 addJoint$1: function(joint) {
  var t1 = this.joints;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())
    return this.addJoint$1$bailout(1, joint, t1, 0);
  var t3 = this.jointCount;
  if (typeof t3 !== 'number')
    return this.addJoint$1$bailout(2, joint, t1, t3);
  this.jointCount = t3 + 1;
  if (t3 !== (t3 | 0))
    throw $.iae(t3);
  if (t3 < 0 || t3 >= t1.length)
    throw $.ioore(t3);
  t1[t3] = joint;
},
 addJoint$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var joint = env0;
      t1 = env1;
      break;
    case 2:
      joint = env0;
      t1 = env1;
      t3 = env2;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.joints;
    case 1:
      state = 0;
      var t3 = this.jointCount;
    case 2:
      state = 0;
      this.jointCount = $.add(t3, 1);
      $.indexSet(t1, t3, joint);
  }
},
 report$1: function(constraints) {
  if (typeof constraints !== 'string' && (typeof constraints !== 'object' || constraints === null || constraints.constructor !== Array && !constraints.is$JavaScriptIndexingBehavior()))
    return this.report$1$bailout(1, constraints);
  if (this.listener == null)
    return;
  for (var t1 = this.impulse, t2 = t1.normalImpulses, t3 = t1.tangentImpulses, i = 0; $.ltB(i, this.contactCount); ++i) {
    var c = $.index(this.contacts, i);
    if (i < 0 || i >= constraints.length)
      throw $.ioore(i);
    var cc = constraints[i];
    for (var j = 0; $.ltB(j, cc.get$pointCount()); ++j) {
      $.indexSet(t2, j, $.index(cc.get$points(), j).get$normalImpulse());
      $.indexSet(t3, j, $.index(cc.get$points(), j).get$tangentImpulse());
    }
    this.listener.postSolve$2(c, t1);
  }
},
 report$1$bailout: function(state, constraints) {
  if (this.listener == null)
    return;
  for (var t1 = this.impulse, i = 0; $.ltB(i, this.contactCount); ++i) {
    var c = $.index(this.contacts, i);
    var cc = $.index(constraints, i);
    for (var j = 0; $.ltB(j, cc.get$pointCount()); ++j) {
      $.indexSet(t1.get$normalImpulses(), j, $.index(cc.get$points(), j).get$normalImpulse());
      $.indexSet(t1.get$tangentImpulses(), j, $.index(cc.get$points(), j).get$tangentImpulse());
    }
    this.listener.postSolve$2(c, t1);
  }
}
};

$$.Position = {"":
 ["x=", "a="],
 "super": "Object",
 Position$0: function() {
  this.x = $.Vector$(0, 0);
  this.a = 0;
}
};

$$.Velocity = {"":
 ["v?", "a="],
 "super": "Object",
 Velocity$0: function() {
  this.v = $.Vector$(0, 0);
  this.a = 0;
}
};

$$.TimeStep = {"":
 ["dt=", "inv_dt=", "dtRatio=", "velocityIterations=", "positionIterations=", "warmStarting!"],
 "super": "Object"
};

$$.World = {"":
 ["_flags=", "_contactManager?", "_bodyList", "_jointList", "_bodyCount", "_jointCount", "_gravity", "_allowSleep", "_debugDraw", "_fixtureDestructionListener", "_jointDestructionListener", "_pool", "_inverseTimestep", "_warmStarting", "_continuousPhysics", "_contactStacks", "center?", "axis", "timestep", "cA", "cB", "wqwrapper", "toiInput", "toiOutput", "backup", "toiSolver", "contacts", "island", "stack"],
 "super": "Object",
 _addType$3: function(creatorStack, type1, type2) {
  var register = $.ContactRegister$();
  register.creator = creatorStack;
  register.primary = true;
  var t1 = this._contactStacks;
  if (type1 < 0 || type1 >= t1.length)
    throw $.ioore(type1);
  $.indexSet(t1[type1], type2, register);
  if (!(type1 === type2)) {
    var register2 = $.ContactRegister$();
    register2.creator = creatorStack;
    register2.primary = false;
    if (type2 < 0 || type2 >= t1.length)
      throw $.ioore(type2);
    $.indexSet(t1[type2], type1, register2);
  }
},
 _initializeRegisters$0: function() {
  var t1 = this._pool;
  this._addType$3(t1.getCircleContactStack$0(), 0, 0);
  this._addType$3(t1.getPolyCircleContactStack$0(), 1, 0);
  this._addType$3(t1.getPolyContactStack$0(), 1, 1);
},
 popContact$2: function(fixtureA, fixtureB) {
  var type1 = fixtureA.get$type();
  var type2 = fixtureB.get$type();
  var t1 = this._contactStacks;
  if (type1 !== (type1 | 0))
    throw $.iae(type1);
  if (type1 < 0 || type1 >= t1.length)
    throw $.ioore(type1);
  var reg = $.index(t1[type1], type2);
  var creator = reg.get$creator();
  if (!(creator == null)) {
    if ($.isEmpty(creator) === true)
      creator = this._getFreshContactStack$2(type1, type2);
    if (reg.get$primary() === true) {
      var c = creator.removeFirst$0();
      c.init$2(fixtureA, fixtureB);
      return c;
    } else {
      c = creator.removeFirst$0();
      c.init$2(fixtureB, fixtureA);
      return c;
    }
  } else
    return;
},
 _getFreshContactStack$2: function(type1, type2) {
  if ($.eqB(type1, 0) && $.eqB(type2, 0))
    return this._pool.getCircleContactStack$0();
  else {
    var t1 = $.eqB(type1, 1) && $.eqB(type2, 1);
    var t2 = this._pool;
    if (t1)
      return t2.getPolyContactStack$0();
    else
      return t2.getPolyCircleContactStack$0();
  }
},
 pushContact$1: function(contact) {
  if ($.gtB(contact.get$manifold().get$pointCount(), 0)) {
    contact.get$fixtureA().get$body().set$awake(true);
    contact.get$fixtureB().get$body().set$awake(true);
  }
  var type1 = contact.get$fixtureA().get$type();
  var type2 = contact.get$fixtureB().get$type();
  var t1 = this._contactStacks;
  if (type1 !== (type1 | 0))
    throw $.iae(type1);
  if (type1 < 0 || type1 >= t1.length)
    throw $.ioore(type1);
  $.index(t1[type1], type2).get$creator().addFirst$1(contact);
},
 get$contactListener: function() {
  return this._contactManager.get$contactListener();
},
 createBody$1: function(def) {
  if (this.get$locked() === true)
    return;
  var b = $.Body$(def, this);
  b.prev = null;
  b.next = this._bodyList;
  var t1 = this._bodyList;
  if (!(t1 == null))
    t1.set$prev(b);
  this._bodyList = b;
  t1 = this._bodyCount;
  if (typeof t1 !== 'number')
    return this.createBody$1$bailout(1, b, t1);
  this._bodyCount = t1 + 1;
  return b;
},
 createBody$1$bailout: function(state, b, t1) {
  this._bodyCount = $.add(t1, 1);
  return b;
},
 step$3: function(dt, velocityIterations, positionIterations) {
  if ($.eqB($.and(this._flags, 1), 1)) {
    this._contactManager.findNewContacts$0();
    this._flags = $.and(this._flags, -2);
  }
  this._flags = $.or(this._flags, 2);
  var t1 = this.timestep;
  t1.set$dt(dt);
  t1.set$velocityIterations(velocityIterations);
  t1.set$positionIterations(positionIterations);
  if (dt > 0.0)
    t1.set$inv_dt(1.0 / dt);
  else
    t1.set$inv_dt(0.0);
  t1.set$dtRatio($.mul(this._inverseTimestep, dt));
  t1.set$warmStarting(this._warmStarting);
  this._contactManager.collide$0();
  if ($.gtB(t1.get$dt(), 0.0))
    this.solve$1(t1);
  if (this._continuousPhysics === true && $.gtB(t1.get$dt(), 0.0))
    this.solveTimeOfImpact$0();
  if ($.gtB(t1.get$dt(), 0.0))
    this._inverseTimestep = t1.get$inv_dt();
  if ($.eqB($.and(this._flags, 4), 4))
    this.clearForces$0();
  this._flags = $.and(this._flags, -3);
},
 clearForces$0: function() {
  for (var body = this._bodyList; !(body == null); body = body.get$next()) {
    body.get$_force().setZero$0();
    body.set$_torque(0.0);
  }
},
 get$contactList: function() {
  return this._contactManager.get$contactList();
},
 get$contactCount: function() {
  return this._contactManager.get$contactCount();
},
 get$locked: function() {
  return $.eq($.and(this._flags, 2), 2);
},
 get$jointList: function() {
  return this._jointList;
},
 solve$1: function(timeStep) {
  var t1 = this.island;
  var t2 = this._bodyCount;
  var t3 = this._contactManager;
  t1.init$4(t2, t3.get$contactCount(), this._jointCount, t3.get$contactListener());
  for (var b = this._bodyList; !(b == null); b = b.get$next())
    b.set$flags($.and(b.get$flags(), -2));
  for (var c = t3.get$contactList(); !(c == null); c = c.get$next())
    c.set$flags($.and(c.get$flags(), -2));
  for (var j = this.get$jointList(); !(j == null); j = j.get$_lib0_next())
    j.set$islandFlag(false);
  var stackSize = this._bodyCount;
  if ($.ltB(this.stack.length, stackSize))
    this.stack = $.ListImplementation_List(stackSize, 'Body');
  for (var seed = this._bodyList, t2 = this._gravity, t4 = this._allowSleep; !(seed == null); seed = seed.get$next()) {
    if ($.eqB($.and(seed.get$flags(), 1), 1))
      continue;
    if ($.eqB(seed.get$awake(), false) || $.eqB(seed.get$active(), false))
      continue;
    if ($.eqB(seed.get$type(), 0))
      continue;
    $.clear(t1);
    var t5 = this.stack;
    if (0 < 0 || 0 >= t5.length)
      throw $.ioore(0);
    t5[0] = seed;
    seed.set$flags($.or(seed.get$flags(), 1));
    for (var stackCount = 1; stackCount > 0;) {
      t5 = this.stack;
      --stackCount;
      if (stackCount < 0 || stackCount >= t5.length)
        throw $.ioore(stackCount);
      b = t5[stackCount];
      t1.addBody$1(b);
      b.set$awake(true);
      if ($.eqB(b.get$type(), 0))
        continue;
      for (var ce = b.get$contactList(); !(ce == null); ce = ce.get$next()) {
        var contact = ce.get$contact();
        if ($.eqB($.and(contact.get$flags(), 1), 1))
          continue;
        if ($.eqB(contact.get$enabled(), false) || $.eqB(contact.get$touching(), false))
          continue;
        var sensorA = contact.get$fixtureA().get$isSensor();
        var sensorB = contact.get$fixtureB().get$isSensor();
        if (sensorA === true || sensorB === true)
          continue;
        t1.addContact$1(contact);
        contact.set$flags($.or(contact.get$flags(), 1));
        var other = ce.get$other();
        if ($.eqB($.and(other.get$flags(), 1), 1))
          continue;
        t5 = this.stack;
        var stackCount0 = stackCount + 1;
        if (stackCount < 0 || stackCount >= t5.length)
          throw $.ioore(stackCount);
        t5[stackCount] = other;
        other.set$flags($.or(other.get$flags(), 1));
        stackCount = stackCount0;
      }
      for (var je = b.get$jointList(); !(je == null); je = je.get$next()) {
        if ($.eqB(je.get$joint().get$islandFlag(), true))
          continue;
        other = je.get$other();
        if ($.eqB(other.get$active(), false))
          continue;
        t1.addJoint$1(je.get$joint());
        je.get$joint().set$islandFlag(true);
        if ($.eqB($.and(other.get$flags(), 1), 1))
          continue;
        t5 = this.stack;
        stackCount0 = stackCount + 1;
        if (stackCount < 0 || stackCount >= t5.length)
          throw $.ioore(stackCount);
        t5[stackCount] = other;
        other.set$flags($.or(other.get$flags(), 1));
        stackCount = stackCount0;
      }
    }
    t1.solve$3(timeStep, t2, t4);
    for (var i = 0; $.ltB(i, t1.get$bodyCount()); ++i) {
      b = $.index(t1.get$bodies(), i);
      if ($.eqB(b.get$type(), 0))
        b.set$flags($.and(b.get$flags(), -2));
    }
  }
  for (b = this._bodyList; !(b == null); b = b.get$next()) {
    if ($.eqB($.and(b.get$flags(), 1), 0))
      continue;
    if ($.eqB(b.get$type(), 0))
      continue;
    b.synchronizeFixtures$0();
  }
  t3.findNewContacts$0();
},
 solveTimeOfImpact$0: function() {
  for (var c = this._contactManager.get$contactList(); !(c == null); c = c.get$next()) {
    c.set$flags($.or(c.get$flags(), 4));
    c.set$toiCount(0);
  }
  for (var body = this._bodyList; !(body == null); body = body.get$next())
    if ($.eqB($.and(body.get$flags(), 1), 0) || $.eqB(body.get$type(), 1) || $.eqB(body.get$type(), 0))
      body.set$flags($.or(body.get$flags(), 64));
    else
      body.set$flags($.and(body.get$flags(), -65));
  for (body = this._bodyList; !(body == null); body = body.get$next()) {
    if ($.eqB($.and(body.get$flags(), 64), 64))
      continue;
    if ($.eqB(body.get$bullet(), true))
      continue;
    this.solveTimeOfImpactGivenBody$1(body);
    body.set$flags($.or(body.get$flags(), 64));
  }
  for (body = this._bodyList; !(body == null); body = body.get$next()) {
    if ($.eqB($.and(body.get$flags(), 64), 64))
      continue;
    if ($.eqB(body.get$bullet(), false))
      continue;
    this.solveTimeOfImpactGivenBody$1(body);
    body.set$flags($.or(body.get$flags(), 64));
  }
},
 solveTimeOfImpactGivenBody$1: function(body) {
  var bullet = body.get$bullet();
  if (typeof bullet !== 'boolean')
    return this.solveTimeOfImpactGivenBody$1$bailout(1, body, bullet, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var t2 = this.toiInput;
  var t3 = this._pool;
  var t4 = this.toiOutput;
  var t5 = t2.proxyA;
  var t6 = t2.proxyB;
  var t7 = t2.sweepA;
  var t8 = t2.sweepB;
  var iter = 0;
  var toiContact = null;
  var toi = 1.0;
  var toiOther = null;
  var count = null;
  var found = null;
  do {
    for (var ce = body.get$contactList(), count = 0, found = false; !(ce == null); ce = ce.get$next()) {
      if ($.eqB(ce.get$contact(), toiContact))
        continue;
      var other = ce.get$other();
      var type = other.get$type();
      if (typeof type !== 'number')
        return this.solveTimeOfImpactGivenBody$1$bailout(2, found, body, bullet, iter, other, t2, type, t3, t4, toiContact, toi, toiOther, ce, count, 0);
      if (bullet) {
        var t1 = other.get$flags();
        if (t1 !== (t1 | 0))
          return this.solveTimeOfImpactGivenBody$1$bailout(3, found, body, bullet, iter, other, t2, type, t3, t4, t1, toiContact, toi, toiOther, ce, count);
        if ((t1 & 64) === 0)
          continue;
        if (!(type === 0)) {
          t1 = ce.get$contact().get$flags();
          if (t1 !== (t1 | 0))
            return this.solveTimeOfImpactGivenBody$1$bailout(4, found, body, bullet, iter, t1, other, t2, t3, t4, toiContact, toi, toiOther, ce, count, 0);
          var t10 = !((t1 & 16) === 0);
          t1 = t10;
        } else
          t1 = false;
        if (t1)
          continue;
      } else if (type === 2)
        continue;
      var contact = ce.get$contact();
      t1 = contact.get$enabled();
      if (typeof t1 !== 'boolean')
        return this.solveTimeOfImpactGivenBody$1$bailout(5, found, body, bullet, contact, iter, t1, other, t2, t3, t4, toiContact, toi, toiOther, ce, count);
      if (!t1)
        continue;
      t1 = contact.get$toiCount();
      if (typeof t1 !== 'number')
        return this.solveTimeOfImpactGivenBody$1$bailout(6, found, body, bullet, contact, iter, other, t2, t1, t3, t4, toiContact, toi, toiOther, ce, count);
      if (t1 > 10)
        continue;
      var fixtureA = contact.get$fixtureA();
      var fixtureB = contact.get$fixtureB();
      if (fixtureA.get$isSensor() === true || fixtureB.get$isSensor() === true)
        continue;
      var bodyA = fixtureA.get$body();
      var bodyB = fixtureB.get$body();
      t5.setFromShape$1(fixtureA.get$shape());
      t6.setFromShape$1(fixtureB.get$shape());
      t7.setFrom$1(bodyA.get$sweep());
      t8.setFrom$1(bodyB.get$sweep());
      t2.tMax = toi;
      t3.get$timeOfImpact().timeOfImpact$2(t4, t2);
      t1 = t4.state;
      if (typeof t1 !== 'number')
        return this.solveTimeOfImpactGivenBody$1$bailout(7, found, body, bullet, contact, t1, iter, other, t2, t3, t4, toiContact, toi, toiOther, ce, count);
      if (t1 === 3) {
        t1 = t4.t;
        if (typeof t1 !== 'number')
          return this.solveTimeOfImpactGivenBody$1$bailout(8, found, body, bullet, contact, iter, t1, other, t2, t3, t4, toiContact, toi, toiOther, ce, count);
        t1 = t1 < toi;
      } else
        t1 = false;
      if (t1) {
        toi = t4.t;
        if (typeof toi !== 'number')
          return this.solveTimeOfImpactGivenBody$1$bailout(9, body, other, t2, bullet, contact, iter, toi, t3, t4, ce, count, 0, 0, 0, 0);
        toiContact = contact;
        toiOther = other;
        found = true;
      }
      ++count;
    }
    ++iter;
  } while (found === true && $.gtB(count, 1) && iter < 50);
  if (toiContact == null) {
    body.advance$1(1.0);
    return;
  }
  t1 = this.backup;
  t1.setFrom$1(body.get$sweep());
  body.advance$1(toi);
  t2 = this._contactManager;
  t3 = t2.contactListener;
  toiContact.update$1(t3);
  t4 = toiContact.get$enabled();
  if (typeof t4 !== 'boolean')
    return this.solveTimeOfImpactGivenBody$1$bailout(10, body, t1, t2, t4, toiContact, toiOther, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  if (!t4) {
    body.get$sweep().setFrom$1(t1);
    this.solveTimeOfImpactGivenBody$1(body);
  }
  t1 = toiContact.get$toiCount();
  if (typeof t1 !== 'number')
    return this.solveTimeOfImpactGivenBody$1$bailout(11, body, toiContact, t2, t1, toiOther, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  toiContact.set$toiCount(t1 + 1);
  t1 = this.contacts;
  if (t1.length < 32)
    this.contacts = $.ListImplementation_List(32, 'Contact');
  ce = body.get$contactList();
  count = 0;
  while (true) {
    if (!(!(ce == null) && count < 32))
      break;
    c$0: {
      type = ce.get$other().get$type();
      if (typeof type !== 'number')
        return this.solveTimeOfImpactGivenBody$1$bailout(12, body, t2, type, ce, toiContact, count, toiOther, 0, 0, 0, 0, 0, 0, 0, 0);
      if (type === 2)
        break c$0;
      contact = ce.get$contact();
      t1 = contact.get$enabled();
      if (typeof t1 !== 'boolean')
        return this.solveTimeOfImpactGivenBody$1$bailout(13, body, count, toiOther, t2, ce, toiContact, contact, t1, 0, 0, 0, 0, 0, 0, 0);
      if (!t1)
        break c$0;
      fixtureA = contact.get$fixtureA();
      fixtureB = contact.get$fixtureB();
      if (fixtureA.get$isSensor() === true || fixtureB.get$isSensor() === true)
        break c$0;
      if (!$.eqB(contact, toiContact))
        contact.update$1(t3);
      t1 = contact.get$enabled();
      if (typeof t1 !== 'boolean')
        return this.solveTimeOfImpactGivenBody$1$bailout(14, body, toiContact, t1, t2, ce, contact, count, toiOther, 0, 0, 0, 0, 0, 0, 0);
      if (!t1)
        break c$0;
      t1 = contact.get$touching();
      if (typeof t1 !== 'boolean')
        return this.solveTimeOfImpactGivenBody$1$bailout(15, body, toiOther, toiContact, t2, ce, t1, contact, count, 0, 0, 0, 0, 0, 0, 0);
      if (!t1)
        break c$0;
      t1 = this.contacts;
      if (count < 0 || count >= t1.length)
        throw $.ioore(count);
      t1[count] = contact;
      ++count;
    }
    ce = ce.get$next();
  }
  t1 = this.toiSolver;
  t1.initialize$3(this.contacts, count, body);
  for (var i = 0; i < 20; ++i)
    if (t1.solve$1(0.75) === true)
      break;
  t1 = toiOther.get$type();
  if (typeof t1 !== 'number')
    return this.solveTimeOfImpactGivenBody$1$bailout(16, t1, toiContact, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  if (!(t1 === 0)) {
    t1 = toiContact.get$flags();
    if (t1 !== (t1 | 0))
      return this.solveTimeOfImpactGivenBody$1$bailout(17, t1, toiContact, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    toiContact.set$flags((t1 | 16) >>> 0);
  }
},
 solveTimeOfImpactGivenBody$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13, env14) {
  switch (state) {
    case 1:
      var body = env0;
      bullet = env1;
      break;
    case 2:
      found = env0;
      body = env1;
      bullet = env2;
      iter = env3;
      other = env4;
      t2 = env5;
      type = env6;
      t3 = env7;
      t4 = env8;
      toiContact = env9;
      toi = env10;
      toiOther = env11;
      ce = env12;
      count = env13;
      break;
    case 3:
      found = env0;
      body = env1;
      bullet = env2;
      iter = env3;
      other = env4;
      t2 = env5;
      type = env6;
      t3 = env7;
      t4 = env8;
      t1 = env9;
      toiContact = env10;
      toi = env11;
      toiOther = env12;
      ce = env13;
      count = env14;
      break;
    case 4:
      found = env0;
      body = env1;
      bullet = env2;
      iter = env3;
      t1 = env4;
      other = env5;
      t2 = env6;
      t3 = env7;
      t4 = env8;
      toiContact = env9;
      toi = env10;
      toiOther = env11;
      ce = env12;
      count = env13;
      break;
    case 5:
      found = env0;
      body = env1;
      bullet = env2;
      contact = env3;
      iter = env4;
      t1 = env5;
      other = env6;
      t2 = env7;
      t3 = env8;
      t4 = env9;
      toiContact = env10;
      toi = env11;
      toiOther = env12;
      ce = env13;
      count = env14;
      break;
    case 6:
      found = env0;
      body = env1;
      bullet = env2;
      contact = env3;
      iter = env4;
      other = env5;
      t2 = env6;
      t1 = env7;
      t3 = env8;
      t4 = env9;
      toiContact = env10;
      toi = env11;
      toiOther = env12;
      ce = env13;
      count = env14;
      break;
    case 7:
      found = env0;
      body = env1;
      bullet = env2;
      contact = env3;
      t1 = env4;
      iter = env5;
      other = env6;
      t2 = env7;
      t3 = env8;
      t4 = env9;
      toiContact = env10;
      toi = env11;
      toiOther = env12;
      ce = env13;
      count = env14;
      break;
    case 8:
      found = env0;
      body = env1;
      bullet = env2;
      contact = env3;
      iter = env4;
      t1 = env5;
      other = env6;
      t2 = env7;
      t3 = env8;
      t4 = env9;
      toiContact = env10;
      toi = env11;
      toiOther = env12;
      ce = env13;
      count = env14;
      break;
    case 9:
      body = env0;
      other = env1;
      t2 = env2;
      bullet = env3;
      contact = env4;
      iter = env5;
      toi = env6;
      t3 = env7;
      t4 = env8;
      ce = env9;
      count = env10;
      break;
    case 10:
      body = env0;
      t1 = env1;
      t2 = env2;
      t3 = env3;
      toiContact = env4;
      toiOther = env5;
      break;
    case 11:
      body = env0;
      toiContact = env1;
      t2 = env2;
      t1 = env3;
      toiOther = env4;
      break;
    case 12:
      body = env0;
      t2 = env1;
      type = env2;
      ce = env3;
      toiContact = env4;
      count = env5;
      toiOther = env6;
      break;
    case 13:
      body = env0;
      count = env1;
      toiOther = env2;
      t2 = env3;
      ce = env4;
      toiContact = env5;
      contact = env6;
      t1 = env7;
      break;
    case 14:
      body = env0;
      toiContact = env1;
      t1 = env2;
      t2 = env3;
      ce = env4;
      contact = env5;
      count = env6;
      toiOther = env7;
      break;
    case 15:
      body = env0;
      toiOther = env1;
      toiContact = env2;
      t2 = env3;
      ce = env4;
      t1 = env5;
      contact = env6;
      count = env7;
      break;
    case 16:
      t1 = env0;
      toiContact = env1;
      break;
    case 17:
      t1 = env0;
      toiContact = env1;
      break;
  }
  switch (state) {
    case 0:
      var bullet = body.get$bullet();
    case 1:
      state = 0;
      var t2 = this.toiInput;
      var t3 = this._pool;
      var t4 = this.toiOutput;
      var iter = 0;
      var toiContact = null;
      var toi = 1.0;
      var toiOther = null;
      var count = null;
      var found = null;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              var ce = body.get$contactList();
              count = 0;
              found = false;
            default:
              L1:
                while (true)
                  switch (state) {
                    case 0:
                      if (!!(ce == null))
                        break L1;
                    default:
                      c$1: {
                        switch (state) {
                          case 0:
                            if ($.eqB(ce.get$contact(), toiContact))
                              break c$1;
                            var other = ce.get$other();
                            var type = other.get$type();
                          case 2:
                            state = 0;
                          default:
                            if (state === 4 || state === 3 || state === 0 && $.eqB(bullet, true))
                              switch (state) {
                                case 0:
                                  var t1 = other.get$flags();
                                case 3:
                                  state = 0;
                                  if ($.eqB($.and(t1, 64), 0))
                                    break c$1;
                                case 4:
                                  if (state === 4 || state === 0 && !$.eqB(type, 0))
                                    switch (state) {
                                      case 0:
                                        t1 = ce.get$contact().get$flags();
                                      case 4:
                                        state = 0;
                                        var t6 = !$.eqB($.and(t1, 16), 0);
                                        t1 = t6;
                                    }
                                  else
                                    t1 = false;
                                  if (t1)
                                    break c$1;
                              }
                            else if ($.eqB(type, 2))
                              break c$1;
                            var contact = ce.get$contact();
                            t1 = contact.get$enabled();
                          case 5:
                            state = 0;
                            if ($.eqB(t1, false))
                              break c$1;
                            t1 = contact.get$toiCount();
                          case 6:
                            state = 0;
                            if ($.gtB(t1, 10))
                              break c$1;
                            var fixtureA = contact.get$fixtureA();
                            var fixtureB = contact.get$fixtureB();
                            if (fixtureA.get$isSensor() === true || fixtureB.get$isSensor() === true)
                              break c$1;
                            var bodyA = fixtureA.get$body();
                            var bodyB = fixtureB.get$body();
                            t2.get$proxyA().setFromShape$1(fixtureA.get$shape());
                            t2.get$proxyB().setFromShape$1(fixtureB.get$shape());
                            t2.get$sweepA().setFrom$1(bodyA.get$sweep());
                            t2.get$sweepB().setFrom$1(bodyB.get$sweep());
                            t2.set$tMax(toi);
                            t3.get$timeOfImpact().timeOfImpact$2(t4, t2);
                            t1 = t4.get$state();
                          case 7:
                            state = 0;
                          case 8:
                            if (state === 8 || state === 0 && $.eqB(t1, 3))
                              switch (state) {
                                case 0:
                                  t1 = t4.get$t();
                                case 8:
                                  state = 0;
                                  t1 = $.ltB(t1, toi);
                              }
                            else
                              t1 = false;
                          case 9:
                            if (state === 9 || state === 0 && t1)
                              switch (state) {
                                case 0:
                                  toi = t4.get$t();
                                case 9:
                                  state = 0;
                                  toiContact = contact;
                                  toiOther = other;
                                  found = true;
                              }
                            ++count;
                        }
                      }
                      ce = ce.get$next();
                  }
              ++iter;
              if (!(found === true && $.gtB(count, 1) && iter < 50))
                break L0;
          }
      if (toiContact == null) {
        body.advance$1(1.0);
        return;
      }
      t1 = this.backup;
      t1.setFrom$1(body.get$sweep());
      body.advance$1(toi);
      t2 = this._contactManager;
      toiContact.update$1(t2.get$contactListener());
      t3 = toiContact.get$enabled();
    case 10:
      state = 0;
      if ($.eqB(t3, false)) {
        body.get$sweep().setFrom$1(t1);
        this.solveTimeOfImpactGivenBody$1(body);
      }
      t1 = toiContact.get$toiCount();
    case 11:
      state = 0;
      toiContact.set$toiCount($.add(t1, 1));
      t1 = this.contacts;
      if (t1 === null || t1.length < 32)
        this.contacts = $.ListImplementation_List(32, 'Contact');
      ce = body.get$contactList();
      count = 0;
    case 12:
    case 13:
    case 14:
    case 15:
      L2:
        while (true)
          switch (state) {
            case 0:
              if (!(!(ce == null) && count < 32))
                break L2;
            default:
              c$0: {
                switch (state) {
                  case 0:
                    type = ce.get$other().get$type();
                  case 12:
                    state = 0;
                    if ($.eqB(type, 2))
                      break c$0;
                    contact = ce.get$contact();
                    t1 = contact.get$enabled();
                  case 13:
                    state = 0;
                    if ($.eqB(t1, false))
                      break c$0;
                    fixtureA = contact.get$fixtureA();
                    fixtureB = contact.get$fixtureB();
                    if (fixtureA.get$isSensor() === true || fixtureB.get$isSensor() === true)
                      break c$0;
                    if (!$.eqB(contact, toiContact))
                      contact.update$1(t2.get$contactListener());
                    t1 = contact.get$enabled();
                  case 14:
                    state = 0;
                    if ($.eqB(t1, false))
                      break c$0;
                    t1 = contact.get$touching();
                  case 15:
                    state = 0;
                    if ($.eqB(t1, false))
                      break c$0;
                    t1 = this.contacts;
                    if (count < 0 || count >= t1.length)
                      throw $.ioore(count);
                    t1[count] = contact;
                    ++count;
                }
              }
              ce = ce.get$next();
          }
      t1 = this.toiSolver;
      t1.initialize$3(this.contacts, count, body);
      for (var i = 0; i < 20; ++i)
        if (t1.solve$1(0.75) === true)
          break;
      t1 = toiOther.get$type();
    case 16:
      state = 0;
    case 17:
      if (state === 17 || state === 0 && !$.eqB(t1, 0))
        switch (state) {
          case 0:
            t1 = toiContact.get$flags();
          case 17:
            state = 0;
            toiContact.set$flags($.or(t1, 16));
        }
  }
},
 World$3: function(gravity, doSleep, argPool) {
  this._contactManager = $.ContactManager$(this);
  for (var t1 = this._contactStacks, i = 0; i < t1.length; ++i) {
    var t2 = $.ListImplementation_List(2, 'ContactRegister');
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i] = t2;
  }
  this._initializeRegisters$0();
}
};

$$.WorldQueryWrapper = {"":
 ["broadPhase?", "callback"],
 "super": "Object"
};

$$.Contact = {"":
 ["flags=", "prev=", "next=", "edge1?", "edge2?", "fixtureA?", "fixtureB?", "manifold=", "toiCount="],
 "super": "Object",
 next$0: function() { return this.next.call$0(); },
 init$2: function(fixA, fixB) {
  this.flags = 0;
  this.fixtureA = fixA;
  this.fixtureB = fixB;
  this.manifold.set$pointCount(0);
  this.prev = null;
  this.next = null;
  var t1 = this.edge1;
  t1.set$contact(null);
  t1.set$prev(null);
  t1.set$next(null);
  t1.set$other(null);
  t1 = this.edge2;
  t1.set$contact(null);
  t1.set$prev(null);
  t1.set$next(null);
  t1.set$other(null);
  this.toiCount = 0;
},
 get$touching: function() {
  return $.eq($.and(this.flags, 2), 2);
},
 get$enabled: function() {
  return $.eq($.and(this.flags, 4), 4);
},
 flagForFiltering$0: function() {
  var t1 = this.flags;
  if (t1 !== (t1 | 0))
    return this.flagForFiltering$0$bailout(1, t1);
  this.flags = (t1 | 8) >>> 0;
},
 flagForFiltering$0$bailout: function(state, t1) {
  this.flags = $.or(t1, 8);
},
 update$1: function(listener) {
  var t1 = this._oldManifold;
  t1.setFrom$1(this.manifold);
  var t2 = this.flags;
  if (t2 !== (t2 | 0))
    return this.update$1$bailout(1, listener, t1, t2, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  this.flags = (t2 | 4) >>> 0;
  var t4 = this.flags;
  if (t4 !== (t4 | 0))
    return this.update$1$bailout(2, listener, t1, t4, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var wasTouching = (t4 & 2) === 2;
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
    if (typeof touching !== 'boolean')
      return this.update$1$bailout(3, listener, wasTouching, touching, t1, sensor, 0, 0, 0, 0, 0, 0, 0);
    this.manifold.set$pointCount(0);
  } else {
    this.evaluate$3(this.manifold, xfA, xfB);
    t2 = this.manifold.get$pointCount();
    if (typeof t2 !== 'number')
      return this.update$1$bailout(4, listener, wasTouching, bodyA, bodyB, t2, t1, sensor, 0, 0, 0, 0, 0);
    touching = t2 > 0;
    t2 = t1.points;
    var i = 0;
    while (true) {
      var t3 = this.manifold.get$pointCount();
      if (typeof t3 !== 'number')
        return this.update$1$bailout(5, i, listener, wasTouching, bodyB, bodyA, t3, touching, t1, sensor, 0, 0, 0);
      if (!(i < t3))
        break;
      t3 = this.manifold.get$points();
      if (typeof t3 !== 'string' && (typeof t3 !== 'object' || t3 === null || t3.constructor !== Array && !t3.is$JavaScriptIndexingBehavior()))
        return this.update$1$bailout(6, i, listener, t3, bodyB, wasTouching, bodyA, touching, t1, sensor, 0, 0, 0);
      if (i < 0 || i >= t3.length)
        throw $.ioore(i);
      var mp2 = t3[i];
      mp2.set$normalImpulse(0.0);
      mp2.set$tangentImpulse(0.0);
      var id2 = mp2.get$id();
      var j = 0;
      while (true) {
        t3 = t1.pointCount;
        if (typeof t3 !== 'number')
          return this.update$1$bailout(7, i, listener, bodyA, bodyB, t3, t1, wasTouching, mp2, id2, touching, j, sensor);
        if (!(j < t3))
          break;
        if (typeof t2 !== 'string' && (typeof t2 !== 'object' || t2 === null || t2.constructor !== Array && !t2.is$JavaScriptIndexingBehavior()))
          return this.update$1$bailout(8, i, listener, bodyA, bodyB, t1, wasTouching, mp2, t2, id2, touching, j, sensor);
        if (j < 0 || j >= t2.length)
          throw $.ioore(j);
        var mp1 = t2[j];
        if (mp1.get$id().isEqual$1(id2) === true) {
          mp2.set$normalImpulse(mp1.get$normalImpulse());
          mp2.set$tangentImpulse(mp1.get$tangentImpulse());
          break;
        }
        ++j;
      }
      ++i;
    }
    if (!(touching === wasTouching)) {
      bodyA.set$awake(true);
      bodyB.set$awake(true);
    }
  }
  t2 = this.flags;
  if (t2 !== (t2 | 0))
    return this.update$1$bailout(9, listener, wasTouching, t2, touching, t1, touching, sensor, 0, 0, 0, 0, 0);
  if (touching)
    this.flags = (t2 | 2) >>> 0;
  else
    this.flags = (t2 & -3) >>> 0;
  if (listener == null)
    return;
  if (!wasTouching && touching)
    listener.beginContact$1(this);
  if (wasTouching && !touching)
    listener.endContact$1(this);
  if (!sensor && touching)
    listener.preSolve$2(this, t1);
},
 update$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11) {
  switch (state) {
    case 1:
      var listener = env0;
      t1 = env1;
      t2 = env2;
      break;
    case 2:
      listener = env0;
      t1 = env1;
      t4 = env2;
      break;
    case 3:
      listener = env0;
      wasTouching = env1;
      touching = env2;
      t1 = env3;
      sensor = env4;
      break;
    case 4:
      listener = env0;
      wasTouching = env1;
      bodyA = env2;
      bodyB = env3;
      t2 = env4;
      t1 = env5;
      sensor = env6;
      break;
    case 5:
      i = env0;
      listener = env1;
      wasTouching = env2;
      bodyB = env3;
      bodyA = env4;
      t2 = env5;
      touching = env6;
      t1 = env7;
      sensor = env8;
      break;
    case 6:
      i = env0;
      listener = env1;
      t2 = env2;
      bodyB = env3;
      wasTouching = env4;
      bodyA = env5;
      touching = env6;
      t1 = env7;
      sensor = env8;
      break;
    case 7:
      i = env0;
      listener = env1;
      bodyA = env2;
      bodyB = env3;
      t2 = env4;
      t1 = env5;
      wasTouching = env6;
      mp2 = env7;
      id2 = env8;
      touching = env9;
      j = env10;
      sensor = env11;
      break;
    case 8:
      i = env0;
      listener = env1;
      bodyA = env2;
      bodyB = env3;
      t1 = env4;
      wasTouching = env5;
      mp2 = env6;
      t2 = env7;
      id2 = env8;
      touching = env9;
      j = env10;
      sensor = env11;
      break;
    case 9:
      listener = env0;
      wasTouching = env1;
      t3 = env2;
      touching = env3;
      t1 = env4;
      t2 = env5;
      sensor = env6;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._oldManifold;
      t1.setFrom$1(this.manifold);
      var t2 = this.flags;
    case 1:
      state = 0;
      this.flags = $.or(t2, 4);
      var t4 = this.flags;
    case 2:
      state = 0;
      var wasTouching = $.eq($.and(t4, 2), 2);
      var sensorA = this.fixtureA.get$isSensor();
      var sensorB = this.fixtureB.get$isSensor();
      var sensor = sensorA === true || sensorB === true;
      var bodyA = this.fixtureA.get$body();
      var bodyB = this.fixtureB.get$body();
      var xfA = bodyA.get$originTransform();
      var xfB = bodyB.get$originTransform();
    default:
      if (state === 3 || state === 0 && sensor)
        switch (state) {
          case 0:
            var shapeA = this.fixtureA.get$shape();
            var shapeB = this.fixtureB.get$shape();
            var touching = this.pool.get$collision().testOverlap$4(shapeA, shapeB, xfA, xfB);
          case 3:
            state = 0;
            this.manifold.set$pointCount(0);
        }
      else
        switch (state) {
          case 0:
            this.evaluate$3(this.manifold, xfA, xfB);
            t2 = this.manifold.get$pointCount();
          case 4:
            state = 0;
            touching = $.gt(t2, 0);
            var i = 0;
          default:
            L0:
              while (true)
                switch (state) {
                  case 0:
                    t2 = this.manifold.get$pointCount();
                  case 5:
                    state = 0;
                    if (!$.ltB(i, t2))
                      break L0;
                    t2 = this.manifold.get$points();
                  case 6:
                    state = 0;
                    var mp2 = $.index(t2, i);
                    mp2.set$normalImpulse(0.0);
                    mp2.set$tangentImpulse(0.0);
                    var id2 = mp2.get$id();
                    var j = 0;
                  default:
                    L1:
                      while (true)
                        switch (state) {
                          case 0:
                            t2 = t1.get$pointCount();
                          case 7:
                            state = 0;
                            if (!$.ltB(j, t2))
                              break L1;
                            t2 = t1.get$points();
                          case 8:
                            state = 0;
                            var mp1 = $.index(t2, j);
                            if (mp1.get$id().isEqual$1(id2) === true) {
                              mp2.set$normalImpulse(mp1.get$normalImpulse());
                              mp2.set$tangentImpulse(mp1.get$tangentImpulse());
                              break L1;
                            }
                            ++j;
                        }
                    ++i;
                }
            if (!$.eqB(touching, wasTouching)) {
              bodyA.set$awake(true);
              bodyB.set$awake(true);
            }
        }
      t2 = touching === true;
      var t3 = this.flags;
    case 9:
      state = 0;
      if (t2)
        this.flags = $.or(t3, 2);
      else
        this.flags = $.and(t3, -3);
      if (listener == null)
        return;
      if ($.eqB(wasTouching, false) && $.eqB(touching, true))
        listener.beginContact$1(this);
      if ($.eqB(wasTouching, true) && $.eqB(touching, false))
        listener.endContact$1(this);
      if (!sensor && t2)
        listener.preSolve$2(this, t1);
  }
}
};

$$.ContactConstraint = {"":
 ["points?", "localNormal?", "localPoint?", "normal?", "normalMass?", "K?", "bodyA=", "bodyB=", "type=", "radius=", "friction=", "restitution=", "pointCount=", "manifold="],
 "super": "Object",
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
  var t1 = this.points;
  var i = 0;
  while (true) {
    var t2 = cp.get$pointCount();
    if (typeof t2 !== 'number')
      return this.setFrom$1$bailout(1, cp, t1, i, t2, 0);
    if (!(i < t2))
      break;
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t2 = t1[i];
    var t3 = cp.get$points();
    if (typeof t3 !== 'string' && (typeof t3 !== 'object' || t3 === null || t3.constructor !== Array && !t3.is$JavaScriptIndexingBehavior()))
      return this.setFrom$1$bailout(2, cp, t2, t3, i, t1);
    if (i < 0 || i >= t3.length)
      throw $.ioore(i);
    t2.setFrom$1(t3[i]);
    ++i;
  }
},
 setFrom$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var cp = env0;
      t1 = env1;
      i = env2;
      t2 = env3;
      break;
    case 2:
      cp = env0;
      t2 = env1;
      t3 = env2;
      i = env3;
      t1 = env4;
      break;
  }
  switch (state) {
    case 0:
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
      var t1 = this.points;
      var i = 0;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              var t2 = cp.get$pointCount();
            case 1:
              state = 0;
              if (!$.ltB(i, t2))
                break L0;
              if (i < 0 || i >= t1.length)
                throw $.ioore(i);
              t2 = t1[i];
              var t3 = cp.get$points();
            case 2:
              state = 0;
              t2.setFrom$1($.index(t3, i));
              ++i;
          }
  }
},
 toString$0: function() {
  return 'localNormal: "' + $.S(this.localNormal) + '", localPoint: "' + $.S(this.localPoint) + '" ' + 'normal: "' + $.S(this.normal) + '", radius: "' + $.S(this.radius) + '" friction: "' + $.S(this.friction) + '" ' + 'restitution: "' + $.S(this.restitution) + '", pointCount: "' + $.S(this.pointCount) + '"';
},
 ContactConstraint$0: function() {
  for (var t1 = this.points, i = 0; i < 2; ++i) {
    var t2 = $.ContactConstraintPoint$();
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i] = t2;
  }
}
};

$$.ContactConstraintPoint = {"":
 ["localPoint?", "rA?", "rB?", "normalImpulse=", "tangentImpulse=", "normalMass=", "tangentMass=", "velocityBias="],
 "super": "Object",
 setFrom$1: function(cp) {
  this.localPoint.setFrom$1(cp.get$localPoint());
  this.rA.setFrom$1(cp.get$rA());
  this.rB.setFrom$1(cp.get$rB());
  this.normalImpulse = cp.get$normalImpulse();
  this.tangentImpulse = cp.get$tangentImpulse();
  this.normalMass = cp.get$normalMass();
  this.tangentMass = cp.get$tangentMass();
  this.velocityBias = cp.get$velocityBias();
},
 toString$0: function() {
  return 'normal impulse: ' + $.S(this.normalImpulse) + ', tangentImpulse: ' + $.S(this.tangentImpulse) + ', normalMass: ' + $.S(this.normalMass) + ', tangentMass: ' + $.S(this.tangentMass) + ', velocityBias: ' + $.S(this.velocityBias) + ', localPoint: ' + $.S(this.localPoint) + ', rA: ' + $.S(this.rA) + ', rB: ' + $.S(this.rB);
}
};

$$.ContactEdge = {"":
 ["other=", "contact=", "prev=", "next="],
 "super": "Object",
 next$0: function() { return this.next.call$0(); }
};

$$.CircleContact = {"":
 ["flags", "prev", "next", "edge1", "edge2", "fixtureA", "fixtureB", "manifold", "toiCount", "pool", "_oldManifold"],
 "super": "Contact",
 init$2: function(fA, fB) {
  $.Expect_equals(0, fA.get$type(), null);
  $.Expect_equals(0, fB.get$type(), null);
  $.Contact.prototype.init$2.call(this, fA, fB);
},
 evaluate$3: function(argManifold, xfA, xfB) {
  this.pool.get$collision().collideCircles$5(argManifold, this.fixtureA.get$shape(), xfA, this.fixtureB.get$shape(), xfB);
}
};

$$.ContactRegister = {"":
 ["creator?", "primary?"],
 "super": "Object"
};

$$.ContactSolver = {"":
 ["constraints?", "constraintCount", "worldManifold", "tangent", "temp1", "temp2", "P", "dv", "dv1", "dv2", "x?", "d", "P1", "P2", "psolver", "rA?", "rB?"],
 "super": "Object",
 init$3: function(contacts, contactCount, impulseRatio) {
  if (typeof contacts !== 'string' && (typeof contacts !== 'object' || contacts === null || contacts.constructor !== Array && !contacts.is$JavaScriptIndexingBehavior()))
    return this.init$3$bailout(1, contacts, contactCount, impulseRatio, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  if (typeof impulseRatio !== 'number')
    return this.init$3$bailout(1, contacts, contactCount, impulseRatio, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  this.constraintCount = contactCount;
  if ($.ltB(this.constraints.length, contactCount)) {
    var old = this.constraints;
    this.constraints = $.ListImplementation_List($.max(old.length * 2, this.constraintCount), 'ContactConstraint');
    $.setRange$3(this.constraints, 0, old.length, old);
    for (var i = old.length; t1 = this.constraints, i < t1.length; ++i) {
      var t2 = $.ContactConstraint$();
      if (i < 0 || i >= t1.length)
        throw $.ioore(i);
      t1[i] = t2;
    }
  }
  for (var t1 = this.worldManifold, t2 = this.tangent, t3 = this.temp2, t4 = this.temp1, t5 = t1.normal, t6 = t1.points, i = 0; $.ltB(i, this.constraintCount); ++i) {
    if (i < 0 || i >= contacts.length)
      throw $.ioore(i);
    var contact = contacts[i];
    var fixtureA = contact.get$fixtureA();
    var fixtureB = contact.get$fixtureB();
    var shapeA = fixtureA.get$shape();
    var shapeB = fixtureB.get$shape();
    var radiusA = shapeA.get$radius();
    var radiusB = shapeB.get$radius();
    var bodyA = fixtureA.get$body();
    var bodyB = fixtureB.get$body();
    var manifold = contact.get$manifold();
    var friction = $.Settings_mixFriction(fixtureA.get$friction(), fixtureB.get$friction());
    var restitution = $.Settings_mixRestitution(fixtureA.get$restitution(), fixtureB.get$restitution());
    if (typeof restitution !== 'number')
      return this.init$3$bailout(2, contacts, impulseRatio, t1, friction, restitution, i, t2, t3, t4, radiusA, radiusB, bodyA, bodyB, manifold, 0, 0, 0, 0);
    var vA = bodyA.get$linearVelocity();
    var vB = bodyB.get$linearVelocity();
    var wA = bodyA.get$angularVelocity();
    if (typeof wA !== 'number')
      return this.init$3$bailout(3, contacts, impulseRatio, t1, friction, restitution, vA, vB, wA, t2, i, t3, t4, radiusA, radiusB, bodyA, bodyB, manifold, 0);
    var wB = bodyB.get$angularVelocity();
    if (typeof wB !== 'number')
      return this.init$3$bailout(4, contacts, impulseRatio, t1, friction, restitution, vA, vB, wA, wB, t2, i, t3, t4, radiusA, radiusB, bodyA, bodyB, manifold);
    t1.initialize$5(manifold, bodyA.get$originTransform(), radiusA, bodyB.get$originTransform(), radiusB);
    var t10 = this.constraints;
    if (i < 0 || i >= t10.length)
      throw $.ioore(i);
    var cc = t10[i];
    cc.set$bodyA(bodyA);
    cc.set$bodyB(bodyB);
    cc.set$manifold(manifold);
    t10 = t5.get$x();
    cc.get$normal().set$x(t10);
    t10 = t5.get$y();
    cc.get$normal().set$y(t10);
    cc.set$pointCount(manifold.get$pointCount());
    cc.set$friction(friction);
    cc.set$restitution(restitution);
    t10 = manifold.get$localNormal().get$x();
    cc.get$localNormal().set$x(t10);
    t10 = manifold.get$localNormal().get$y();
    cc.get$localNormal().set$y(t10);
    t10 = manifold.get$localPoint().get$x();
    cc.get$localPoint().set$x(t10);
    t10 = manifold.get$localPoint().get$y();
    cc.get$localPoint().set$y(t10);
    cc.set$radius($.add(radiusA, radiusB));
    cc.set$type(manifold.get$type());
    for (var t7 = -wA, t8 = -wB, t9 = -restitution, j = 0; $.ltB(j, cc.get$pointCount()); ++j) {
      var cp = $.index(manifold.get$points(), j);
      var ccp = $.index(cc.get$points(), j);
      t10 = cp.get$normalImpulse();
      if (typeof t10 !== 'number')
        throw $.iae(t10);
      ccp.set$normalImpulse(impulseRatio * t10);
      var t11 = cp.get$tangentImpulse();
      if (typeof t11 !== 'number')
        throw $.iae(t11);
      ccp.set$tangentImpulse(impulseRatio * t11);
      var t12 = cp.get$localPoint().get$x();
      ccp.get$localPoint().set$x(t12);
      t12 = cp.get$localPoint().get$y();
      ccp.get$localPoint().set$y(t12);
      t12 = $.sub($.index(t6, j).get$x(), bodyA.get$sweep().get$center().get$x());
      ccp.get$rA().set$x(t12);
      t12 = $.sub($.index(t6, j).get$y(), bodyA.get$sweep().get$center().get$y());
      ccp.get$rA().set$y(t12);
      t12 = $.sub($.index(t6, j).get$x(), bodyB.get$sweep().get$center().get$x());
      ccp.get$rB().set$x(t12);
      t12 = $.sub($.index(t6, j).get$y(), bodyB.get$sweep().get$center().get$y());
      ccp.get$rB().set$y(t12);
      var rnA = $.sub($.mul(ccp.get$rA().get$x(), cc.get$normal().get$y()), $.mul(ccp.get$rA().get$y(), cc.get$normal().get$x()));
      var rnB = $.sub($.mul(ccp.get$rB().get$x(), cc.get$normal().get$y()), $.mul(ccp.get$rB().get$y(), cc.get$normal().get$x()));
      rnA = $.mul(rnA, rnA);
      rnB = $.mul(rnB, rnB);
      var kNormal = $.add($.add($.add(bodyA.get$invMass(), bodyB.get$invMass()), $.mul(bodyA.get$invInertia(), rnA)), $.mul(bodyB.get$invInertia(), rnB));
      if (typeof kNormal !== 'number')
        throw $.iae(kNormal);
      ccp.set$normalMass(1.0 / kNormal);
      t12 = cc.get$normal().get$y();
      if (typeof t12 !== 'number')
        throw $.iae(t12);
      t2.x = 1.0 * t12;
      var t13 = cc.get$normal().get$x();
      if (typeof t13 !== 'number')
        throw $.iae(t13);
      t2.y = -1.0 * t13;
      var rtA = $.sub($.mul(ccp.get$rA().get$x(), t2.y), $.mul(ccp.get$rA().get$y(), t2.x));
      var rtB = $.sub($.mul(ccp.get$rB().get$x(), t2.y), $.mul(ccp.get$rB().get$y(), t2.x));
      rtA = $.mul(rtA, rtA);
      rtB = $.mul(rtB, rtB);
      var kTangent = $.add($.add($.add(bodyA.get$invMass(), bodyB.get$invMass()), $.mul(bodyA.get$invInertia(), rtA)), $.mul(bodyB.get$invInertia(), rtB));
      if (typeof kTangent !== 'number')
        throw $.iae(kTangent);
      ccp.set$tangentMass(1.0 / kTangent);
      ccp.set$velocityBias(0.0);
      var t14 = ccp.get$rA().get$y();
      if (typeof t14 !== 'number')
        throw $.iae(t14);
      t3.x = t7 * t14;
      var t15 = ccp.get$rA().get$x();
      if (typeof t15 !== 'number')
        throw $.iae(t15);
      t3.y = wA * t15;
      var t16 = ccp.get$rB().get$y();
      if (typeof t16 !== 'number')
        throw $.iae(t16);
      t16 = t8 * t16;
      var t17 = vB.get$x();
      if (typeof t17 !== 'number')
        throw $.iae(t17);
      t17 = t16 + t17;
      t16 = vA.get$x();
      if (typeof t16 !== 'number')
        throw $.iae(t16);
      t16 = t17 - t16;
      t17 = t3.x;
      if (typeof t17 !== 'number')
        throw $.iae(t17);
      t4.x = t16 - t17;
      var t18 = ccp.get$rB().get$x();
      if (typeof t18 !== 'number')
        throw $.iae(t18);
      t18 = wB * t18;
      var t19 = vB.get$y();
      if (typeof t19 !== 'number')
        throw $.iae(t19);
      t19 = t18 + t19;
      t18 = vA.get$y();
      if (typeof t18 !== 'number')
        throw $.iae(t18);
      t18 = t19 - t18;
      t19 = t3.y;
      if (typeof t19 !== 'number')
        throw $.iae(t19);
      t4.y = t18 - t19;
      var a = cc.get$normal();
      var vRel = $.add($.mul(a.get$x(), t4.x), $.mul(a.get$y(), t4.y));
      if ($.ltB(vRel, -1)) {
        if (typeof vRel !== 'number')
          throw $.iae(vRel);
        ccp.set$velocityBias(t9 * vRel);
      }
    }
    if ($.eqB(cc.get$pointCount(), 2)) {
      var ccp1 = $.index(cc.get$points(), 0);
      var ccp2 = $.index(cc.get$points(), 1);
      var invMassA = bodyA.get$invMass();
      var invIA = bodyA.get$invInertia();
      var invMassB = bodyB.get$invMass();
      var invIB = bodyB.get$invInertia();
      t7 = ccp1.get$rA();
      t8 = cc.get$normal();
      var rn1A = $.sub($.mul(t7.get$x(), t8.get$y()), $.mul(t7.get$y(), t8.get$x()));
      t9 = ccp1.get$rB();
      t10 = cc.get$normal();
      var rn1B = $.sub($.mul(t9.get$x(), t10.get$y()), $.mul(t9.get$y(), t10.get$x()));
      t11 = ccp2.get$rA();
      t12 = cc.get$normal();
      var rn2A = $.sub($.mul(t11.get$x(), t12.get$y()), $.mul(t11.get$y(), t12.get$x()));
      t13 = ccp2.get$rB();
      t14 = cc.get$normal();
      var rn2B = $.sub($.mul(t13.get$x(), t14.get$y()), $.mul(t13.get$y(), t14.get$x()));
      var k11 = $.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rn1A), rn1A)), $.mul($.mul(invIB, rn1B), rn1B));
      var k22 = $.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rn2A), rn2A)), $.mul($.mul(invIB, rn2B), rn2B));
      var k12 = $.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rn1A), rn2A)), $.mul($.mul(invIB, rn1B), rn2B));
      t7 = $.mul(k11, k11);
      t8 = $.sub($.mul(k11, k22), $.mul(k12, k12));
      if (typeof t8 !== 'number')
        throw $.iae(t8);
      if ($.ltB(t7, 100.0 * t8)) {
        cc.get$K().get$col1().set$x(k11);
        cc.get$K().get$col1().set$y(k12);
        cc.get$K().get$col2().set$x(k12);
        cc.get$K().get$col2().set$y(k22);
        t7 = cc.get$K().get$col1().get$x();
        cc.get$normalMass().get$col1().set$x(t7);
        t7 = cc.get$K().get$col1().get$y();
        cc.get$normalMass().get$col1().set$y(t7);
        t7 = cc.get$K().get$col2().get$x();
        cc.get$normalMass().get$col2().set$x(t7);
        t7 = cc.get$K().get$col2().get$y();
        cc.get$normalMass().get$col2().set$y(t7);
        cc.get$normalMass().invertLocal$0();
      } else
        cc.set$pointCount(1);
    }
  }
},
 init$3$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13, env14, env15, env16, env17) {
  switch (state) {
    case 1:
      var contacts = env0;
      var contactCount = env1;
      var impulseRatio = env2;
      break;
    case 2:
      contacts = env0;
      impulseRatio = env1;
      t1 = env2;
      friction = env3;
      restitution = env4;
      i = env5;
      t2 = env6;
      t3 = env7;
      t4 = env8;
      radiusA = env9;
      radiusB = env10;
      bodyA = env11;
      bodyB = env12;
      manifold = env13;
      break;
    case 3:
      contacts = env0;
      impulseRatio = env1;
      t1 = env2;
      friction = env3;
      restitution = env4;
      vA = env5;
      vB = env6;
      wA = env7;
      t2 = env8;
      i = env9;
      t3 = env10;
      t4 = env11;
      radiusA = env12;
      radiusB = env13;
      bodyA = env14;
      bodyB = env15;
      manifold = env16;
      break;
    case 4:
      contacts = env0;
      impulseRatio = env1;
      t1 = env2;
      friction = env3;
      restitution = env4;
      vA = env5;
      vB = env6;
      wA = env7;
      wB = env8;
      t2 = env9;
      i = env10;
      t3 = env11;
      t4 = env12;
      radiusA = env13;
      radiusB = env14;
      bodyA = env15;
      bodyB = env16;
      manifold = env17;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      this.constraintCount = contactCount;
      if ($.ltB(this.constraints.length, contactCount)) {
        var old = this.constraints;
        this.constraints = $.ListImplementation_List($.max(old.length * 2, this.constraintCount), 'ContactConstraint');
        $.setRange$3(this.constraints, 0, old.length, old);
        for (var i = old.length; i < this.constraints.length; ++i) {
          var t1 = this.constraints;
          var t2 = $.ContactConstraint$();
          if (i < 0 || i >= t1.length)
            throw $.ioore(i);
          t1[i] = t2;
        }
      }
      t1 = this.worldManifold;
      t2 = this.tangent;
      var t3 = this.temp2;
      var t4 = this.temp1;
      i = 0;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!$.ltB(i, this.constraintCount))
                break L0;
              var contact = $.index(contacts, i);
              var fixtureA = contact.get$fixtureA();
              var fixtureB = contact.get$fixtureB();
              var shapeA = fixtureA.get$shape();
              var shapeB = fixtureB.get$shape();
              var radiusA = shapeA.get$radius();
              var radiusB = shapeB.get$radius();
              var bodyA = fixtureA.get$body();
              var bodyB = fixtureB.get$body();
              var manifold = contact.get$manifold();
              var friction = $.Settings_mixFriction(fixtureA.get$friction(), fixtureB.get$friction());
              var restitution = $.Settings_mixRestitution(fixtureA.get$restitution(), fixtureB.get$restitution());
            case 2:
              state = 0;
              var vA = bodyA.get$linearVelocity();
              var vB = bodyB.get$linearVelocity();
              var wA = bodyA.get$angularVelocity();
            case 3:
              state = 0;
              var wB = bodyB.get$angularVelocity();
            case 4:
              state = 0;
              t1.initialize$5(manifold, bodyA.get$originTransform(), radiusA, bodyB.get$originTransform(), radiusB);
              var t8 = this.constraints;
              if (i < 0 || i >= t8.length)
                throw $.ioore(i);
              var cc = t8[i];
              cc.set$bodyA(bodyA);
              cc.set$bodyB(bodyB);
              cc.set$manifold(manifold);
              t8 = t1.get$normal().get$x();
              cc.get$normal().set$x(t8);
              t8 = t1.get$normal().get$y();
              cc.get$normal().set$y(t8);
              cc.set$pointCount(manifold.get$pointCount());
              cc.set$friction(friction);
              cc.set$restitution(restitution);
              t8 = manifold.get$localNormal().get$x();
              cc.get$localNormal().set$x(t8);
              t8 = manifold.get$localNormal().get$y();
              cc.get$localNormal().set$y(t8);
              t8 = manifold.get$localPoint().get$x();
              cc.get$localPoint().set$x(t8);
              t8 = manifold.get$localPoint().get$y();
              cc.get$localPoint().set$y(t8);
              cc.set$radius($.add(radiusA, radiusB));
              cc.set$type(manifold.get$type());
              for (var j = 0; $.ltB(j, cc.get$pointCount()); ++j) {
                var cp = $.index(manifold.get$points(), j);
                var ccp = $.index(cc.get$points(), j);
                ccp.set$normalImpulse($.mul(impulseRatio, cp.get$normalImpulse()));
                ccp.set$tangentImpulse($.mul(impulseRatio, cp.get$tangentImpulse()));
                var t5 = cp.get$localPoint().get$x();
                ccp.get$localPoint().set$x(t5);
                t5 = cp.get$localPoint().get$y();
                ccp.get$localPoint().set$y(t5);
                t5 = $.sub($.index(t1.get$points(), j).get$x(), bodyA.get$sweep().get$center().get$x());
                ccp.get$rA().set$x(t5);
                t5 = $.sub($.index(t1.get$points(), j).get$y(), bodyA.get$sweep().get$center().get$y());
                ccp.get$rA().set$y(t5);
                t5 = $.sub($.index(t1.get$points(), j).get$x(), bodyB.get$sweep().get$center().get$x());
                ccp.get$rB().set$x(t5);
                t5 = $.sub($.index(t1.get$points(), j).get$y(), bodyB.get$sweep().get$center().get$y());
                ccp.get$rB().set$y(t5);
                var rnA = $.sub($.mul(ccp.get$rA().get$x(), cc.get$normal().get$y()), $.mul(ccp.get$rA().get$y(), cc.get$normal().get$x()));
                var rnB = $.sub($.mul(ccp.get$rB().get$x(), cc.get$normal().get$y()), $.mul(ccp.get$rB().get$y(), cc.get$normal().get$x()));
                rnA = $.mul(rnA, rnA);
                rnB = $.mul(rnB, rnB);
                var kNormal = $.add($.add($.add(bodyA.get$invMass(), bodyB.get$invMass()), $.mul(bodyA.get$invInertia(), rnA)), $.mul(bodyB.get$invInertia(), rnB));
                if (typeof kNormal !== 'number')
                  throw $.iae(kNormal);
                ccp.set$normalMass(1.0 / kNormal);
                t5 = cc.get$normal().get$y();
                if (typeof t5 !== 'number')
                  throw $.iae(t5);
                t2.set$x(1.0 * t5);
                var t6 = cc.get$normal().get$x();
                if (typeof t6 !== 'number')
                  throw $.iae(t6);
                t2.set$y(-1.0 * t6);
                var rtA = $.sub($.mul(ccp.get$rA().get$x(), t2.get$y()), $.mul(ccp.get$rA().get$y(), t2.get$x()));
                var rtB = $.sub($.mul(ccp.get$rB().get$x(), t2.get$y()), $.mul(ccp.get$rB().get$y(), t2.get$x()));
                rtA = $.mul(rtA, rtA);
                rtB = $.mul(rtB, rtB);
                var kTangent = $.add($.add($.add(bodyA.get$invMass(), bodyB.get$invMass()), $.mul(bodyA.get$invInertia(), rtA)), $.mul(bodyB.get$invInertia(), rtB));
                if (typeof kTangent !== 'number')
                  throw $.iae(kTangent);
                ccp.set$tangentMass(1.0 / kTangent);
                ccp.set$velocityBias(0.0);
                t3.set$x($.mul($.neg(wA), ccp.get$rA().get$y()));
                t3.set$y($.mul(wA, ccp.get$rA().get$x()));
                t4.set$x($.sub($.sub($.add($.mul($.neg(wB), ccp.get$rB().get$y()), vB.get$x()), vA.get$x()), t3.get$x()));
                t4.set$y($.sub($.sub($.add($.mul(wB, ccp.get$rB().get$x()), vB.get$y()), vA.get$y()), t3.get$y()));
                var a = cc.get$normal();
                var vRel = $.add($.mul(a.get$x(), t4.get$x()), $.mul(a.get$y(), t4.get$y()));
                if ($.ltB(vRel, -1))
                  ccp.set$velocityBias($.mul($.neg(restitution), vRel));
              }
              if ($.eqB(cc.get$pointCount(), 2)) {
                var ccp1 = $.index(cc.get$points(), 0);
                var ccp2 = $.index(cc.get$points(), 1);
                var invMassA = bodyA.get$invMass();
                var invIA = bodyA.get$invInertia();
                var invMassB = bodyB.get$invMass();
                var invIB = bodyB.get$invInertia();
                t5 = ccp1.get$rA();
                t6 = cc.get$normal();
                var rn1A = $.sub($.mul(t5.get$x(), t6.get$y()), $.mul(t5.get$y(), t6.get$x()));
                var t7 = ccp1.get$rB();
                t8 = cc.get$normal();
                var rn1B = $.sub($.mul(t7.get$x(), t8.get$y()), $.mul(t7.get$y(), t8.get$x()));
                var t9 = ccp2.get$rA();
                var t10 = cc.get$normal();
                var rn2A = $.sub($.mul(t9.get$x(), t10.get$y()), $.mul(t9.get$y(), t10.get$x()));
                var t11 = ccp2.get$rB();
                var t12 = cc.get$normal();
                var rn2B = $.sub($.mul(t11.get$x(), t12.get$y()), $.mul(t11.get$y(), t12.get$x()));
                var k11 = $.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rn1A), rn1A)), $.mul($.mul(invIB, rn1B), rn1B));
                var k22 = $.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rn2A), rn2A)), $.mul($.mul(invIB, rn2B), rn2B));
                var k12 = $.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rn1A), rn2A)), $.mul($.mul(invIB, rn1B), rn2B));
                t5 = $.mul(k11, k11);
                t6 = $.sub($.mul(k11, k22), $.mul(k12, k12));
                if (typeof t6 !== 'number')
                  throw $.iae(t6);
                if ($.ltB(t5, 100.0 * t6)) {
                  cc.get$K().get$col1().set$x(k11);
                  cc.get$K().get$col1().set$y(k12);
                  cc.get$K().get$col2().set$x(k12);
                  cc.get$K().get$col2().set$y(k22);
                  t5 = cc.get$K().get$col1().get$x();
                  cc.get$normalMass().get$col1().set$x(t5);
                  t5 = cc.get$K().get$col1().get$y();
                  cc.get$normalMass().get$col1().set$y(t5);
                  t5 = cc.get$K().get$col2().get$x();
                  cc.get$normalMass().get$col2().set$x(t5);
                  t5 = cc.get$K().get$col2().get$y();
                  cc.get$normalMass().get$col2().set$y(t5);
                  cc.get$normalMass().invertLocal$0();
                } else
                  cc.set$pointCount(1);
              }
              ++i;
          }
  }
},
 warmStart$0: function() {
  for (var t1 = this.tangent, i = 0; $.ltB(i, this.constraintCount); ++i) {
    var t2 = this.constraints;
    if (i < 0 || i >= t2.length)
      throw $.ioore(i);
    var c = t2[i];
    var bodyA = c.get$bodyA();
    var bodyB = c.get$bodyB();
    var invMassA = bodyA.get$invMass();
    if (typeof invMassA !== 'number')
      return this.warmStart$0$bailout(1, c, bodyA, bodyB, invMassA, i, t1, 0, 0, 0);
    var invIA = bodyA.get$invInertia();
    if (typeof invIA !== 'number')
      return this.warmStart$0$bailout(2, c, bodyA, bodyB, invMassA, i, invIA, t1, 0, 0);
    var invMassB = bodyB.get$invMass();
    if (typeof invMassB !== 'number')
      return this.warmStart$0$bailout(3, c, bodyA, bodyB, invMassA, i, invIA, invMassB, t1, 0);
    var invIB = bodyB.get$invInertia();
    if (typeof invIB !== 'number')
      return this.warmStart$0$bailout(4, c, bodyA, bodyB, invMassA, i, invIA, invMassB, invIB, t1);
    var normal = c.get$normal();
    $.Vector_crossVectorAndNumToOut(normal, 1, t1);
    for (var j = 0; $.ltB(j, c.get$pointCount()); ++j) {
      var ccp = $.index(c.get$points(), j);
      var Px = $.add($.mul(ccp.get$normalImpulse(), normal.get$x()), $.mul(ccp.get$tangentImpulse(), t1.x));
      var Py = $.add($.mul(ccp.get$normalImpulse(), normal.get$y()), $.mul(ccp.get$tangentImpulse(), t1.y));
      t2 = bodyA.get$angularVelocity();
      var t3 = $.sub($.mul(ccp.get$rA().get$x(), Py), $.mul(ccp.get$rA().get$y(), Px));
      if (typeof t3 !== 'number')
        throw $.iae(t3);
      bodyA.set$angularVelocity($.sub(t2, invIA * t3));
      var t4 = bodyA.get$linearVelocity();
      t4.set$x($.sub(t4.get$x(), $.mul(Px, invMassA)));
      t4 = bodyA.get$linearVelocity();
      t4.set$y($.sub(t4.get$y(), $.mul(Py, invMassA)));
      t4 = bodyB.get$angularVelocity();
      var t5 = $.sub($.mul(ccp.get$rB().get$x(), Py), $.mul(ccp.get$rB().get$y(), Px));
      if (typeof t5 !== 'number')
        throw $.iae(t5);
      bodyB.set$angularVelocity($.add(t4, invIB * t5));
      var t6 = bodyB.get$linearVelocity();
      t6.set$x($.add(t6.get$x(), $.mul(Px, invMassB)));
      t6 = bodyB.get$linearVelocity();
      t6.set$y($.add(t6.get$y(), $.mul(Py, invMassB)));
    }
  }
},
 warmStart$0$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8) {
  switch (state) {
    case 1:
      c = env0;
      bodyA = env1;
      bodyB = env2;
      invMassA = env3;
      i = env4;
      t1 = env5;
      break;
    case 2:
      c = env0;
      bodyA = env1;
      bodyB = env2;
      invMassA = env3;
      i = env4;
      invIA = env5;
      t1 = env6;
      break;
    case 3:
      c = env0;
      bodyA = env1;
      bodyB = env2;
      invMassA = env3;
      i = env4;
      invIA = env5;
      invMassB = env6;
      t1 = env7;
      break;
    case 4:
      c = env0;
      bodyA = env1;
      bodyB = env2;
      invMassA = env3;
      i = env4;
      invIA = env5;
      invMassB = env6;
      invIB = env7;
      t1 = env8;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.tangent;
      var i = 0;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!$.ltB(i, this.constraintCount))
                break L0;
              var t2 = this.constraints;
              if (i < 0 || i >= t2.length)
                throw $.ioore(i);
              var c = t2[i];
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
              $.Vector_crossVectorAndNumToOut(normal, 1, t1);
              for (var j = 0; $.ltB(j, c.get$pointCount()); ++j) {
                var ccp = $.index(c.get$points(), j);
                var Px = $.add($.mul(ccp.get$normalImpulse(), normal.get$x()), $.mul(ccp.get$tangentImpulse(), t1.get$x()));
                var Py = $.add($.mul(ccp.get$normalImpulse(), normal.get$y()), $.mul(ccp.get$tangentImpulse(), t1.get$y()));
                bodyA.set$angularVelocity($.sub(bodyA.get$angularVelocity(), $.mul(invIA, $.sub($.mul(ccp.get$rA().get$x(), Py), $.mul(ccp.get$rA().get$y(), Px)))));
                t2 = bodyA.get$linearVelocity();
                t2.set$x($.sub(t2.get$x(), $.mul(Px, invMassA)));
                t2 = bodyA.get$linearVelocity();
                t2.set$y($.sub(t2.get$y(), $.mul(Py, invMassA)));
                bodyB.set$angularVelocity($.add(bodyB.get$angularVelocity(), $.mul(invIB, $.sub($.mul(ccp.get$rB().get$x(), Py), $.mul(ccp.get$rB().get$y(), Px)))));
                t2 = bodyB.get$linearVelocity();
                t2.set$x($.add(t2.get$x(), $.mul(Px, invMassB)));
                t2 = bodyB.get$linearVelocity();
                t2.set$y($.add(t2.get$y(), $.mul(Py, invMassB)));
              }
              ++i;
          }
  }
},
 solveVelocityConstraints$0: function() {
  var t1 = this.tangent;
  var t2 = this.dv;
  var t3 = this.dv1;
  var t4 = this.dv2;
  var t5 = this.temp2;
  var t6 = this.x;
  var t7 = this.d;
  var t8 = this.P1;
  var t9 = this.P2;
  var t10 = this.temp1;
  var i = 0;
  while (true) {
    var t11 = this.constraintCount;
    if (typeof t11 !== 'number')
      return this.solveVelocityConstraints$0$bailout(1, t3, t10, t4, i, t5, t11, t1, t2, t6, t7, t8, t9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    if (!(i < t11))
      break;
    t11 = this.constraints;
    if (i < 0 || i >= t11.length)
      throw $.ioore(i);
    var c = t11[i];
    var bodyA = c.get$bodyA();
    var bodyB = c.get$bodyB();
    var wA = bodyA.get$angularVelocity();
    if (typeof wA !== 'number')
      return this.solveVelocityConstraints$0$bailout(2, t3, t10, t4, i, t5, t1, c, bodyA, bodyB, wA, t6, t2, t7, t8, t9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var wB = bodyB.get$angularVelocity();
    if (typeof wB !== 'number')
      return this.solveVelocityConstraints$0$bailout(3, t3, t10, t4, i, t5, t1, c, bodyA, bodyB, wA, wB, t6, t2, t7, t8, t9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var vA = bodyA.get$linearVelocity();
    var vB = bodyB.get$linearVelocity();
    var invMassA = bodyA.get$invMass();
    if (typeof invMassA !== 'number')
      return this.solveVelocityConstraints$0$bailout(4, t3, t10, t4, i, t2, t5, t1, c, bodyA, bodyB, wA, wB, vA, vB, t6, invMassA, t7, t8, t9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var invIA = bodyA.get$invInertia();
    if (typeof invIA !== 'number')
      return this.solveVelocityConstraints$0$bailout(5, t3, t10, t4, i, t2, t5, t1, c, bodyA, bodyB, wA, wB, vA, vB, t6, invMassA, invIA, t7, t8, t9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var invMassB = bodyB.get$invMass();
    if (typeof invMassB !== 'number')
      return this.solveVelocityConstraints$0$bailout(6, t3, t10, t4, i, t2, t5, t1, c, bodyA, bodyB, wA, wB, vA, vB, t6, invMassA, invIA, invMassB, t7, t8, t9, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var invIB = bodyB.get$invInertia();
    if (typeof invIB !== 'number')
      return this.solveVelocityConstraints$0$bailout(7, t3, t10, t4, i, t2, t5, t1, c, bodyA, bodyB, wA, wB, vA, vB, t6, invMassA, invIA, invMassB, invIB, t8, t7, t9, 0, 0, 0, 0, 0, 0, 0, 0);
    var t17 = c.get$normal().get$y();
    if (typeof t17 !== 'number')
      throw $.iae(t17);
    t1.x = 1.0 * t17;
    var t18 = c.get$normal().get$x();
    if (typeof t18 !== 'number')
      throw $.iae(t18);
    t1.y = -1.0 * t18;
    var friction = c.get$friction();
    if (typeof friction !== 'number')
      return this.solveVelocityConstraints$0$bailout(8, t3, t4, i, t5, c, bodyA, bodyB, wA, wB, vA, vB, t6, invMassA, invIA, invMassB, invIB, t8, t7, t9, t10, friction, t1, t2, 0, 0, 0, 0, 0, 0, 0);
    var j = 0;
    while (true) {
      t11 = c.get$pointCount();
      if (typeof t11 !== 'number')
        return this.solveVelocityConstraints$0$bailout(9, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, friction, t1, wB, j, t2, wA, t11, 0, 0, 0, 0, 0);
      if (!(j < t11))
        break;
      t11 = c.get$points();
      if (typeof t11 !== 'string' && (typeof t11 !== 'object' || t11 === null || t11.constructor !== Array && !t11.is$JavaScriptIndexingBehavior()))
        return this.solveVelocityConstraints$0$bailout(10, t3, t4, i, t11, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, friction, t1, wB, j, t2, wA, 0, 0, 0, 0, 0);
      if (j < 0 || j >= t11.length)
        throw $.ioore(j);
      var ccp = t11[j];
      var a = ccp.get$rA();
      t11 = -wB;
      var t13 = ccp.get$rB().get$y();
      if (typeof t13 !== 'number')
        return this.solveVelocityConstraints$0$bailout(11, t3, t4, i, ccp, a, t11, t5, t13, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, friction, t1, wB, j, t2, wA, 0, 0);
      t13 = t11 * t13;
      t11 = vB.get$x();
      if (typeof t11 !== 'number')
        return this.solveVelocityConstraints$0$bailout(12, t3, t4, i, ccp, a, t5, t13, t11, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, friction, t1, wB, j, t2, wA, 0, 0);
      t11 = t13 + t11;
      t13 = vA.get$x();
      if (typeof t13 !== 'number')
        return this.solveVelocityConstraints$0$bailout(13, t3, t4, i, ccp, a, t5, c, t11, bodyB, t13, bodyA, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t6, t9, t10, friction, t1, wB, j, t2, wA, 0, 0);
      t13 = t11 - t13;
      t11 = a.get$y();
      if (typeof t11 !== 'number')
        return this.solveVelocityConstraints$0$bailout(14, t3, t4, i, ccp, a, t5, c, bodyA, bodyB, t13, vA, vB, invMassA, invIA, invMassB, invIB, t11, t8, t7, t6, t9, t10, friction, t1, wB, j, t2, wA, 0, 0);
      t2.x = t13 + wA * t11;
      t18 = ccp.get$rB().get$x();
      if (typeof t18 !== 'number')
        return this.solveVelocityConstraints$0$bailout(15, t3, t4, i, ccp, a, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t18, t9, t10, friction, t1, wB, j, t2, wA, 0, 0, 0);
      t18 = wB * t18;
      var t20 = vB.get$y();
      if (typeof t20 !== 'number')
        return this.solveVelocityConstraints$0$bailout(16, t3, t4, i, ccp, a, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t18, t20, t10, friction, t1, wB, j, t2, wA, 0, 0);
      t20 = t18 + t20;
      t18 = vA.get$y();
      if (typeof t18 !== 'number')
        return this.solveVelocityConstraints$0$bailout(17, t3, t4, i, ccp, a, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, t20, t18, friction, t1, wB, j, t2, wA, 0, 0);
      t18 = t20 - t18;
      t20 = a.get$x();
      if (typeof t20 !== 'number')
        return this.solveVelocityConstraints$0$bailout(18, t3, t4, i, ccp, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, t18, t20, friction, t1, wB, j, t2, wA, 0, 0, 0);
      t2.y = t18 - wA * t20;
      var t24 = t2.x;
      if (typeof t24 !== 'number')
        return this.solveVelocityConstraints$0$bailout(19, t3, t4, i, ccp, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, friction, t24, t1, wB, j, t2, wA, 0, 0, 0, 0);
      var t26 = t1.x;
      if (typeof t26 !== 'number')
        return this.solveVelocityConstraints$0$bailout(20, t3, t4, i, ccp, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, friction, t24, t1, t26, wB, j, t2, wA, 0, 0, 0);
      t26 = t24 * t26;
      t24 = t2.y;
      if (typeof t24 !== 'number')
        return this.solveVelocityConstraints$0$bailout(21, t3, t4, i, ccp, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, friction, t1, wB, j, t26, t2, t24, wA, 0, 0, 0);
      var t29 = t1.y;
      if (typeof t29 !== 'number')
        return this.solveVelocityConstraints$0$bailout(22, t3, t4, i, ccp, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, friction, t1, wB, j, t26, t2, t24, t29, wA, 0, 0);
      var vt = t26 + t24 * t29;
      t26 = ccp.get$tangentMass();
      if (typeof t26 !== 'number')
        return this.solveVelocityConstraints$0$bailout(23, t3, t4, i, ccp, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, t7, invIB, t8, t9, t10, friction, t1, wB, j, t2, wA, vt, t26, 0, 0, 0);
      var lambda = t26 * -vt;
      t26 = ccp.get$normalImpulse();
      if (typeof t26 !== 'number')
        return this.solveVelocityConstraints$0$bailout(24, lambda, t26, t3, t4, i, ccp, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, friction, t1, wB, j, t2, wA, 0, 0, 0);
      var maxFriction = friction * t26;
      t26 = ccp.get$tangentImpulse();
      if (typeof t26 !== 'number')
        return this.solveVelocityConstraints$0$bailout(25, lambda, t3, maxFriction, t26, i, t4, ccp, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, friction, t1, wB, j, t2, wA, 0, 0);
      t26 += lambda;
      var newImpulse = $.max(-maxFriction, $.min(t26, maxFriction));
      var t34 = ccp.get$tangentImpulse();
      if (typeof t34 !== 'number')
        throw $.iae(t34);
      lambda = newImpulse - t34;
      t34 = t1.x;
      if (typeof t34 !== 'number')
        return this.solveVelocityConstraints$0$bailout(26, t3, t4, i, ccp, t5, newImpulse, lambda, c, bodyA, bodyB, t34, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, friction, t1, wB, j, t2, wA, 0, 0);
      var Px = t34 * lambda;
      t34 = t1.y;
      if (typeof t34 !== 'number')
        return this.solveVelocityConstraints$0$bailout(27, t3, t4, i, ccp, t5, newImpulse, lambda, c, bodyA, bodyB, Px, t34, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t6, t9, t10, friction, t1, wB, j, t2, wA, 0);
      var Py = t34 * lambda;
      t34 = vA.get$x();
      if (typeof t34 !== 'number')
        return this.solveVelocityConstraints$0$bailout(28, t3, t4, i, ccp, t5, newImpulse, c, bodyA, bodyB, Px, t6, vA, Py, invMassA, invIA, invMassB, invIB, t7, vB, t34, t9, t8, t10, friction, t1, wB, j, t2, wA, 0);
      vA.set$x(t34 - Px * invMassA);
      var t38 = vA.get$y();
      if (typeof t38 !== 'number')
        return this.solveVelocityConstraints$0$bailout(29, t3, t4, i, ccp, t5, newImpulse, c, bodyA, bodyB, Px, t6, vA, Py, invMassA, invIA, invMassB, invIB, t7, vB, t38, t9, t8, t10, friction, t1, wB, j, t2, wA, 0);
      vA.set$y(t38 - Py * invMassA);
      var t40 = ccp.get$rA().get$x();
      if (typeof t40 !== 'number')
        return this.solveVelocityConstraints$0$bailout(30, t3, t4, i, ccp, t5, newImpulse, c, bodyA, Px, bodyB, t6, vA, Py, vB, invIA, invMassB, t7, invIB, t8, invMassA, t9, t10, t40, friction, t1, wB, j, t2, wA, 0);
      t40 *= Py;
      var t42 = ccp.get$rA().get$y();
      if (typeof t42 !== 'number')
        return this.solveVelocityConstraints$0$bailout(31, t3, t4, i, ccp, t5, newImpulse, c, bodyA, Px, bodyB, t6, vA, Py, vB, invIA, invMassB, invIB, t7, t8, invMassA, t9, t10, t40, t42, friction, t1, wB, j, t2, wA);
      wA -= invIA * (t40 - t42 * Px);
      var t44 = vB.get$x();
      if (typeof t44 !== 'number')
        return this.solveVelocityConstraints$0$bailout(32, t3, t4, i, ccp, t5, newImpulse, c, bodyA, Px, bodyB, t6, vA, Py, vB, invIA, invMassB, t7, invIB, t8, invMassA, t9, t10, friction, t1, wA, j, t44, wB, t2, 0);
      vB.set$x(t44 + Px * invMassB);
      var t46 = vB.get$y();
      if (typeof t46 !== 'number')
        return this.solveVelocityConstraints$0$bailout(33, t3, t4, i, ccp, t5, newImpulse, c, bodyA, Px, bodyB, t6, vA, Py, vB, invIA, invMassB, t7, invIB, t8, invMassA, t9, t10, friction, t1, wA, j, t2, wB, t46, 0);
      vB.set$y(t46 + Py * invMassB);
      var t48 = ccp.get$rB().get$x();
      if (typeof t48 !== 'number')
        return this.solveVelocityConstraints$0$bailout(34, t3, t4, i, ccp, t5, newImpulse, c, bodyA, Px, bodyB, t6, vA, Py, vB, invIA, invMassB, t7, invIB, t8, invMassA, t9, t10, friction, t1, wA, j, t2, wB, t48, 0);
      t48 *= Py;
      var t50 = ccp.get$rB().get$y();
      if (typeof t50 !== 'number')
        return this.solveVelocityConstraints$0$bailout(35, t3, t48, t50, t4, i, ccp, t5, newImpulse, c, bodyA, Px, bodyB, t6, vA, vB, invMassA, invIA, invMassB, t7, invIB, t8, t9, t10, friction, t1, wA, j, t2, wB, 0);
      wB += invIB * (t48 - t50 * Px);
      ccp.set$tangentImpulse(newImpulse);
      ++j;
    }
    t11 = c.get$pointCount();
    if (typeof t11 !== 'number')
      return this.solveVelocityConstraints$0$bailout(36, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, t11, vB, invMassA, invMassB, invIB, invIA, t8, t7, t9, t10, t1, wB, t2, wA, 0, 0, 0, 0, 0, 0, 0);
    t11 = t11 === 1;
    t13 = -wB;
    if (t11) {
      t11 = c.get$points();
      if (typeof t11 !== 'string' && (typeof t11 !== 'object' || t11 === null || t11.constructor !== Array && !t11.is$JavaScriptIndexingBehavior()))
        return this.solveVelocityConstraints$0$bailout(37, t8, t3, t10, t4, i, t7, t5, t1, wB, bodyA, t2, bodyB, t6, vA, c, vB, invMassA, invIA, invMassB, invIB, wA, t11, t9, 0, 0, 0, 0, 0, 0, 0);
      if (0 >= t11.length)
        throw $.ioore(0);
      ccp = t11[0];
      var a1 = ccp.get$rA();
      t11 = ccp.get$rB().get$y();
      if (typeof t11 !== 'number')
        return this.solveVelocityConstraints$0$bailout(38, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, ccp, a1, t9, t13, t10, t11, t1, wB, t2, wA, 0, 0, 0, 0);
      t11 = t13 * t11;
      t13 = vB.get$x();
      if (typeof t13 !== 'number')
        return this.solveVelocityConstraints$0$bailout(39, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, ccp, a1, t9, t10, t11, t13, t1, wB, t2, wA, 0, 0, 0, 0);
      t13 = t11 + t13;
      t11 = vA.get$x();
      if (typeof t11 !== 'number')
        return this.solveVelocityConstraints$0$bailout(40, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, ccp, a1, t9, t10, t13, t11, t1, wB, t2, wA, 0, 0, 0, 0);
      t11 = t13 - t11;
      t13 = a1.get$y();
      if (typeof t13 !== 'number')
        return this.solveVelocityConstraints$0$bailout(41, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, ccp, a1, t9, t10, t11, t13, t1, wB, t2, wA, 0, 0, 0, 0);
      t2.x = t11 + wA * t13;
      t18 = ccp.get$rB().get$x();
      if (typeof t18 !== 'number')
        return this.solveVelocityConstraints$0$bailout(42, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, t7, invIB, t8, ccp, a1, t9, t10, t1, wB, t2, t18, wA, 0, 0, 0, 0, 0);
      t18 = wB * t18;
      t20 = vB.get$y();
      if (typeof t20 !== 'number')
        return this.solveVelocityConstraints$0$bailout(43, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, ccp, a1, t9, t10, t1, wB, t2, t18, t20, wA, 0, 0, 0, 0);
      t20 = t18 + t20;
      t18 = vA.get$y();
      if (typeof t18 !== 'number')
        return this.solveVelocityConstraints$0$bailout(44, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, ccp, a1, t9, t10, t1, wB, t2, t20, wA, t18, 0, 0, 0, 0);
      t18 = t20 - t18;
      t20 = a1.get$x();
      if (typeof t20 !== 'number')
        return this.solveVelocityConstraints$0$bailout(45, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, t7, invIB, t8, ccp, t9, t10, t1, wB, t2, wA, t18, t20, 0, 0, 0, 0, 0);
      t2.y = t18 - wA * t20;
      var b = c.get$normal();
      t24 = t2.x;
      if (typeof t24 !== 'number')
        return this.solveVelocityConstraints$0$bailout(46, t3, t4, b, i, t24, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, t7, invIB, t8, ccp, t9, t10, t1, wB, t2, wA, 0, 0, 0, 0, 0);
      t26 = b.get$x();
      if (typeof t26 !== 'number')
        return this.solveVelocityConstraints$0$bailout(47, t3, t4, b, i, t24, t26, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, ccp, t9, t10, t1, wB, t2, wA, 0, 0, 0, 0);
      t26 = t24 * t26;
      t24 = t2.y;
      if (typeof t24 !== 'number')
        return this.solveVelocityConstraints$0$bailout(48, t3, t4, b, i, t26, t24, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, ccp, t9, t10, t1, wB, t2, wA, 0, 0, 0, 0);
      t29 = b.get$y();
      if (typeof t29 !== 'number')
        return this.solveVelocityConstraints$0$bailout(49, t3, t4, i, t26, t24, t29, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, ccp, t9, t10, t1, wB, t2, wA, 0, 0, 0, 0);
      var vn = t26 + t24 * t29;
      t26 = ccp.get$normalMass();
      if (typeof t26 !== 'number')
        return this.solveVelocityConstraints$0$bailout(50, t3, t4, i, t5, vn, t26, bodyA, bodyB, c, t6, vA, vB, invMassA, invIA, invMassB, t7, invIB, t8, ccp, t9, t10, t1, wB, t2, wA, 0, 0, 0, 0, 0);
      t26 = -t26;
      var t32 = ccp.get$velocityBias();
      if (typeof t32 !== 'number')
        return this.solveVelocityConstraints$0$bailout(51, t3, t4, i, t5, vn, c, bodyA, t26, bodyB, t6, vA, t32, vB, invMassA, invIA, invMassB, invIB, t8, ccp, t9, t10, t7, t1, wB, t2, wA, 0, 0, 0, 0);
      lambda = t26 * (vn - t32);
      t26 = ccp.get$normalImpulse();
      if (typeof t26 !== 'number')
        return this.solveVelocityConstraints$0$bailout(52, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, lambda, invMassA, invIA, t7, invIB, invMassB, ccp, t26, t8, t10, t9, t1, wB, t2, wA, 0, 0, 0, 0, 0);
      a = t26 + lambda;
      newImpulse = a > 0.0 ? a : 0.0;
      t11 = ccp.get$normalImpulse();
      if (typeof t11 !== 'number')
        return this.solveVelocityConstraints$0$bailout(53, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, ccp, t9, t10, newImpulse, t11, t1, wB, t2, wA, 0, 0, 0, 0, 0);
      lambda = newImpulse - t11;
      t11 = c.get$normal().get$x();
      if (typeof t11 !== 'number')
        return this.solveVelocityConstraints$0$bailout(54, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, ccp, t9, t10, newImpulse, lambda, t11, t1, wB, t2, wA, 0, 0, 0, 0);
      Px = t11 * lambda;
      t11 = c.get$normal().get$y();
      if (typeof t11 !== 'number')
        return this.solveVelocityConstraints$0$bailout(55, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, ccp, t9, t10, newImpulse, lambda, Px, t11, t1, wB, t2, wA, 0, 0, 0, 0);
      Py = t11 * lambda;
      t11 = vA.get$x();
      if (typeof t11 !== 'number')
        return this.solveVelocityConstraints$0$bailout(56, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, ccp, t9, t10, newImpulse, Px, Py, t11, wB, t2, t1, wA, 0, 0, 0, 0);
      vA.set$x(t11 - Px * invMassA);
      var t16 = vA.get$y();
      if (typeof t16 !== 'number')
        return this.solveVelocityConstraints$0$bailout(57, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, ccp, t9, t10, newImpulse, Px, Py, t1, wB, t2, t16, wA, 0, 0, 0, 0);
      vA.set$y(t16 - Py * invMassA);
      t18 = ccp.get$rA().get$x();
      if (typeof t18 !== 'number')
        return this.solveVelocityConstraints$0$bailout(58, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invMassB, invIB, t7, t8, ccp, t9, t10, newImpulse, Px, Py, t1, wB, t2, wA, t18, 0, 0, 0, 0, 0);
      t18 *= Py;
      t20 = ccp.get$rA().get$y();
      if (typeof t20 !== 'number')
        return this.solveVelocityConstraints$0$bailout(59, t20, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invMassB, invIB, t7, t8, ccp, t9, t10, newImpulse, Px, Py, t1, wB, t2, wA, t18, 0, 0, 0, 0);
      wA -= invIA * (t18 - t20 * Px);
      var t22 = vB.get$x();
      if (typeof t22 !== 'number')
        return this.solveVelocityConstraints$0$bailout(60, t3, t4, i, wA, t22, t5, bodyA, bodyB, t6, vA, vB, invMassB, invIB, t7, t8, ccp, t9, t10, newImpulse, Px, Py, t1, wB, t2, 0, 0, 0, 0, 0, 0);
      vB.set$x(t22 + Px * invMassB);
      t24 = vB.get$y();
      if (typeof t24 !== 'number')
        return this.solveVelocityConstraints$0$bailout(61, t3, t4, i, wA, t5, t24, bodyA, bodyB, t6, vA, vB, invMassB, invIB, t7, t8, ccp, t9, t10, newImpulse, Px, Py, t1, wB, t2, 0, 0, 0, 0, 0, 0);
      vB.set$y(t24 + Py * invMassB);
      t26 = ccp.get$rB().get$x();
      if (typeof t26 !== 'number')
        return this.solveVelocityConstraints$0$bailout(62, t3, t10, t4, newImpulse, i, wA, Px, t5, Py, t1, wB, bodyA, bodyB, t2, t6, vA, vB, t26, invIB, t7, t8, ccp, t9, 0, 0, 0, 0, 0, 0, 0);
      t26 *= Py;
      var t28 = ccp.get$rB().get$y();
      if (typeof t28 !== 'number')
        return this.solveVelocityConstraints$0$bailout(63, t3, t10, t4, newImpulse, i, wA, t7, Px, t5, t1, wB, bodyA, bodyB, t2, t6, vA, vB, t26, invIB, t28, t8, ccp, t9, 0, 0, 0, 0, 0, 0, 0);
      wB += invIB * (t26 - t28 * Px);
      ccp.set$normalImpulse(newImpulse);
    } else {
      t11 = c.get$points();
      if (typeof t11 !== 'string' && (typeof t11 !== 'object' || t11 === null || t11.constructor !== Array && !t11.is$JavaScriptIndexingBehavior()))
        return this.solveVelocityConstraints$0$bailout(64, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, t11, t1, wB, t2, wA, 0, 0, 0, 0, 0, 0, 0);
      if (0 >= t11.length)
        throw $.ioore(0);
      var cp1 = t11[0];
      t11 = c.get$points();
      if (typeof t11 !== 'string' && (typeof t11 !== 'object' || t11 === null || t11.constructor !== Array && !t11.is$JavaScriptIndexingBehavior()))
        return this.solveVelocityConstraints$0$bailout(65, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, t11, t1, wB, t2, wA, 0, 0, 0, 0, 0, 0);
      if (1 >= t11.length)
        throw $.ioore(1);
      var cp2 = t11[1];
      a = $.Vector$(cp1.get$normalImpulse(), cp2.get$normalImpulse());
      t11 = cp1.get$rB().get$y();
      if (typeof t11 !== 'number')
        return this.solveVelocityConstraints$0$bailout(66, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, a, t1, t13, wB, t11, t2, wA, 0, 0, 0);
      t11 = t13 * t11;
      t16 = vB.get$x();
      if (typeof t16 !== 'number')
        return this.solveVelocityConstraints$0$bailout(67, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, a, t1, wB, t2, t11, t16, wA, 0, 0, 0);
      t16 = t11 + t16;
      t11 = vA.get$x();
      if (typeof t11 !== 'number')
        return this.solveVelocityConstraints$0$bailout(68, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, a, t1, wB, t2, t16, t11, wA, 0, 0, 0);
      t11 = t16 - t11;
      t16 = cp1.get$rA().get$y();
      if (typeof t16 !== 'number')
        return this.solveVelocityConstraints$0$bailout(69, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, a, t1, wB, t2, wA, t11, t16, 0, 0, 0);
      t3.x = t11 + wA * t16;
      t20 = cp1.get$rB().get$x();
      if (typeof t20 !== 'number')
        return this.solveVelocityConstraints$0$bailout(70, t3, t4, i, t20, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0, 0, 0);
      t20 = wB * t20;
      t22 = vB.get$y();
      if (typeof t22 !== 'number')
        return this.solveVelocityConstraints$0$bailout(71, t3, t4, i, t20, t22, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0, 0);
      t22 = t20 + t22;
      t20 = vA.get$y();
      if (typeof t20 !== 'number')
        return this.solveVelocityConstraints$0$bailout(72, t3, t4, i, t22, t5, t20, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0, 0);
      t20 = t22 - t20;
      t22 = cp1.get$rA().get$x();
      if (typeof t22 !== 'number')
        return this.solveVelocityConstraints$0$bailout(73, t3, t4, i, t5, t20, t22, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0, 0);
      t3.y = t20 - wA * t22;
      t26 = cp2.get$rB().get$y();
      if (typeof t26 !== 'number')
        return this.solveVelocityConstraints$0$bailout(74, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, t13, vB, t26, invIA, invMassA, invIB, invMassB, t7, t9, t8, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0, 0);
      t26 = t13 * t26;
      t13 = vB.get$x();
      if (typeof t13 !== 'number')
        return this.solveVelocityConstraints$0$bailout(75, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t13, t8, t7, t9, t10, t26, cp1, cp2, a, t1, wB, t2, wA, 0, 0, 0);
      t13 = t26 + t13;
      t26 = vA.get$x();
      if (typeof t26 !== 'number')
        return this.solveVelocityConstraints$0$bailout(76, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t13, t26, t9, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0, 0);
      t26 = t13 - t26;
      t13 = cp2.get$rA().get$y();
      if (typeof t13 !== 'number')
        return this.solveVelocityConstraints$0$bailout(77, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, t26, t13, cp1, cp2, a, t1, wB, t2, wA, 0, 0, 0);
      t4.x = t26 + wA * t13;
      var t31 = cp2.get$rB().get$x();
      if (typeof t31 !== 'number')
        return this.solveVelocityConstraints$0$bailout(78, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, t31, a, t1, wB, t2, wA, 0, 0, 0, 0);
      t31 = wB * t31;
      var t33 = vB.get$y();
      if (typeof t33 !== 'number')
        return this.solveVelocityConstraints$0$bailout(79, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, t31, t33, a, t1, wB, t2, wA, 0, 0, 0);
      t33 = t31 + t33;
      t31 = vA.get$y();
      if (typeof t31 !== 'number')
        return this.solveVelocityConstraints$0$bailout(80, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, a, t33, wB, t31, t1, t2, wA, 0, 0, 0);
      t31 = t33 - t31;
      t33 = cp2.get$rA().get$x();
      if (typeof t33 !== 'number')
        return this.solveVelocityConstraints$0$bailout(81, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, a, t1, wB, t31, t2, t33, wA, 0, 0, 0);
      t4.y = t31 - wA * t33;
      var t37 = t3.x;
      if (typeof t37 !== 'number')
        return this.solveVelocityConstraints$0$bailout(82, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, a, t1, wB, t2, wA, t37, 0, 0, 0, 0);
      var t39 = c.get$normal().get$x();
      if (typeof t39 !== 'number')
        return this.solveVelocityConstraints$0$bailout(83, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, a, t1, wB, t2, wA, t37, t39, 0, 0, 0);
      t39 = t37 * t39;
      t37 = t3.y;
      if (typeof t37 !== 'number')
        return this.solveVelocityConstraints$0$bailout(84, t39, t3, t4, t37, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0, 0);
      t42 = c.get$normal().get$y();
      if (typeof t42 !== 'number')
        return this.solveVelocityConstraints$0$bailout(85, t39, t3, t4, t37, i, t42, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0);
      var vn1 = t39 + t37 * t42;
      t39 = t4.x;
      if (typeof t39 !== 'number')
        return this.solveVelocityConstraints$0$bailout(86, t3, t4, i, vn1, t5, t39, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0, 0);
      var t45 = c.get$normal().get$x();
      if (typeof t45 !== 'number')
        return this.solveVelocityConstraints$0$bailout(87, t3, t4, i, vn1, t5, t39, t45, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0);
      t45 = t39 * t45;
      t39 = t4.y;
      if (typeof t39 !== 'number')
        return this.solveVelocityConstraints$0$bailout(88, t3, t4, i, vn1, t5, t45, c, bodyA, bodyB, t39, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0);
      t48 = c.get$normal().get$y();
      if (typeof t48 !== 'number')
        return this.solveVelocityConstraints$0$bailout(89, t3, t4, i, vn1, t5, t45, c, bodyA, t48, bodyB, t6, vA, t39, vB, invMassA, invIA, invMassB, invIB, t8, t7, t9, t10, cp1, cp2, a, t1, wB, t2, wA, 0);
      var vn2 = t45 + t39 * t48;
      t45 = cp1.get$velocityBias();
      if (typeof t45 !== 'number')
        return this.solveVelocityConstraints$0$bailout(90, t3, t4, i, vn1, t5, c, bodyA, bodyB, t6, vA, vn2, vB, t45, invIA, invMassA, invIB, invMassB, t7, t9, t8, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0);
      t45 = vn1 - t45;
      var t51 = cp2.get$velocityBias();
      if (typeof t51 !== 'number')
        return this.solveVelocityConstraints$0$bailout(91, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vn2, vB, invMassA, invIA, invMassB, t51, t8, invIB, t9, t10, t7, cp1, t45, cp2, a, t1, wB, t2, wA, 0, 0);
      b = $.Vector$(t45, vn2 - t51);
      t45 = c.get$K().get$col1().get$x();
      if (typeof t45 !== 'number')
        return this.solveVelocityConstraints$0$bailout(92, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, b, t9, t10, t45, cp1, cp2, a, t1, wB, t2, wA, 0, 0, 0);
      var t54 = a.x;
      if (typeof t54 !== 'number')
        return this.solveVelocityConstraints$0$bailout(93, t3, t4, i, t54, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, b, t9, t10, t45, cp1, cp2, a, t1, wB, t2, wA, 0, 0);
      t54 = t45 * t54;
      t45 = c.get$K().get$col2().get$x();
      if (typeof t45 !== 'number')
        return this.solveVelocityConstraints$0$bailout(94, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, b, t9, t10, t54, cp1, t45, cp2, a, t1, wB, t2, wA, 0, 0);
      var t57 = a.y;
      if (typeof t57 !== 'number')
        return this.solveVelocityConstraints$0$bailout(95, t3, t4, i, t57, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, b, t9, t10, t54, cp1, t45, cp2, a, t1, wB, t2, wA, 0);
      t5.x = t54 + t45 * t57;
      var t59 = c.get$K().get$col1().get$y();
      if (typeof t59 !== 'number')
        return this.solveVelocityConstraints$0$bailout(96, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, b, t9, t10, cp1, cp2, a, t1, wB, t59, t2, wA, 0, 0, 0);
      var t61 = a.x;
      if (typeof t61 !== 'number')
        return this.solveVelocityConstraints$0$bailout(97, t3, t4, i, t5, t61, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, b, t9, t10, cp1, cp2, a, t1, wB, t59, t2, wA, 0, 0);
      t61 = t59 * t61;
      t59 = c.get$K().get$col2().get$y();
      if (typeof t59 !== 'number')
        return this.solveVelocityConstraints$0$bailout(98, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, b, t9, t10, cp1, cp2, a, t1, wB, t2, t61, t59, wA, 0, 0);
      var t64 = a.y;
      if (typeof t64 !== 'number')
        return this.solveVelocityConstraints$0$bailout(99, t3, t4, i, t5, t64, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, b, t9, t10, cp1, cp2, a, t1, wB, t2, t61, t59, wA, 0);
      t5.y = t61 + t59 * t64;
      var t66 = b.x;
      if (typeof t66 !== 'number')
        return this.solveVelocityConstraints$0$bailout(100, t3, t4, i, t5, t66, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, b, t9, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0, 0);
      var t68 = t5.x;
      if (typeof t68 !== 'number')
        return this.solveVelocityConstraints$0$bailout(101, t3, t68, t4, i, t5, t66, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, b, t9, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0);
      b.x = t66 - t68;
      var t70 = b.y;
      if (typeof t70 !== 'number')
        return this.solveVelocityConstraints$0$bailout(102, t3, t4, i, t5, c, bodyA, t70, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, b, t9, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0, 0);
      var t72 = t5.y;
      if (typeof t72 !== 'number')
        return this.solveVelocityConstraints$0$bailout(103, t3, t4, i, t72, t5, c, t70, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, b, t9, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0);
      b.y = t70 - t72;
      for (; true;) {
        $.Matrix22_mulMatrixAndVectorToOut(c.get$normalMass(), b, t6);
        t6.mulLocal$1(-1);
        t11 = t6.get$x();
        if (typeof t11 !== 'number')
          return this.solveVelocityConstraints$0$bailout(104, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, b, t10, cp1, cp2, a, t1, wB, t11, t2, wA, 0, 0, 0);
        if (t11 >= 0.0) {
          t11 = t6.get$y();
          if (typeof t11 !== 'number')
            return this.solveVelocityConstraints$0$bailout(105, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, b, t9, t10, cp1, cp2, a, t1, wB, t2, t11, wA, 0, 0, 0);
          t11 = t11 >= 0.0;
        } else
          t11 = false;
        if (t11) {
          t7.setFrom$1(t6).subLocal$1(a);
          t8.setFrom$1(c.get$normal()).mulLocal$1(t7.x);
          t9.setFrom$1(c.get$normal()).mulLocal$1(t7.y);
          t10.setFrom$1(t8).addLocal$1(t9);
          t5.setFrom$1(t10).mulLocal$1(invMassA);
          vA.subLocal$1(t5);
          t5.setFrom$1(t10).mulLocal$1(invMassB);
          vB.addLocal$1(t5);
          t11 = cp1.get$rA();
          var t12 = t11.get$x();
          if (typeof t12 !== 'number')
            return this.solveVelocityConstraints$0$bailout(106, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, t11, t12, cp1, cp2, t1, wB, t2, wA, 0, 0, 0, 0, 0, 0, 0);
          var t14 = t8.y;
          if (typeof t14 !== 'number')
            return this.solveVelocityConstraints$0$bailout(107, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, t11, t12, cp1, t14, cp2, t1, wB, t2, wA, 0, 0, 0, 0, 0, 0);
          t14 = t12 * t14;
          t11 = t11.get$y();
          if (typeof t11 !== 'number')
            return this.solveVelocityConstraints$0$bailout(108, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, t14, cp2, t11, t1, wB, t2, wA, 0, 0, 0, 0, 0, 0, 0);
          t16 = t8.x;
          if (typeof t16 !== 'number')
            return this.solveVelocityConstraints$0$bailout(109, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, t14, cp2, t11, t16, t1, wB, t2, wA, 0, 0, 0, 0, 0, 0);
          t14 -= t11 * t16;
          t18 = cp2.get$rA();
          var t19 = t18.get$x();
          if (typeof t19 !== 'number')
            return this.solveVelocityConstraints$0$bailout(110, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, t14, wB, t2, t19, t18, wA, 0, 0, 0, 0, 0, 0);
          var t21 = t9.y;
          if (typeof t21 !== 'number')
            return this.solveVelocityConstraints$0$bailout(111, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, t14, wB, t19, t18, t21, t2, wA, 0, 0, 0, 0, 0);
          t21 = t19 * t21;
          t18 = t18.get$y();
          if (typeof t18 !== 'number')
            return this.solveVelocityConstraints$0$bailout(112, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t14, wB, t2, t1, t18, t21, wA, 0, 0, 0, 0, 0, 0);
          var t23 = t9.x;
          if (typeof t23 !== 'number')
            return this.solveVelocityConstraints$0$bailout(113, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t14, wB, t1, t2, t21, t18, t23, wA, 0, 0, 0, 0, 0);
          var wA0 = wA - invIA * (t14 + (t21 - t18 * t23));
          var t25 = cp1.get$rB();
          t26 = t25.get$x();
          if (typeof t26 !== 'number')
            return this.solveVelocityConstraints$0$bailout(114, t3, wA0, t25, t10, i, t26, cp1, t4, cp2, t5, t1, wB, bodyA, bodyB, t2, t6, vA, vB, invIB, t7, t8, t9, 0, 0, 0, 0, 0, 0, 0, 0);
          t28 = t8.y;
          if (typeof t28 !== 'number')
            return this.solveVelocityConstraints$0$bailout(115, t3, wA0, t25, t4, i, t26, t28, t5, bodyA, bodyB, t6, vA, vB, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0, 0);
          t28 = t26 * t28;
          t25 = t25.get$y();
          if (typeof t25 !== 'number')
            return this.solveVelocityConstraints$0$bailout(116, t3, wA0, t4, t10, i, cp1, t28, t25, cp2, t5, t1, wB, bodyA, bodyB, t2, t6, vA, vB, invIB, t7, t8, t9, 0, 0, 0, 0, 0, 0, 0, 0);
          var t30 = t8.x;
          if (typeof t30 !== 'number')
            return this.solveVelocityConstraints$0$bailout(117, t3, wA0, t4, i, t28, t25, t30, t5, bodyA, bodyB, t6, vA, vB, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0, 0);
          t28 -= t25 * t30;
          t32 = cp2.get$rB();
          t33 = t32.get$x();
          if (typeof t33 !== 'number')
            return this.solveVelocityConstraints$0$bailout(118, t3, wA0, t4, i, t5, t28, t32, t33, bodyA, bodyB, t6, vA, vB, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0, 0);
          var t35 = t9.y;
          if (typeof t35 !== 'number')
            return this.solveVelocityConstraints$0$bailout(119, t3, wA0, t4, i, t5, t28, t32, t33, bodyA, bodyB, t6, vA, vB, t35, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0);
          t35 = t33 * t35;
          t32 = t32.get$y();
          if (typeof t32 !== 'number')
            return this.solveVelocityConstraints$0$bailout(120, t3, wA0, t4, i, t5, t28, bodyA, bodyB, t35, t6, vA, vB, t32, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0, 0);
          t37 = t9.x;
          if (typeof t37 !== 'number')
            return this.solveVelocityConstraints$0$bailout(121, t3, wA0, t4, i, t5, t28, bodyA, bodyB, t35, t6, vA, vB, t32, t37, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0);
          var wB0 = wB + invIB * (t28 + (t35 - t32 * t37));
          cp1.set$normalImpulse(t6.get$x());
          cp2.set$normalImpulse(t6.get$y());
          wA = wA0;
          wB = wB0;
          break;
        }
        t11 = cp1.get$normalMass();
        if (typeof t11 !== 'number')
          return this.solveVelocityConstraints$0$bailout(122, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, b, t10, cp1, t11, cp2, a, t1, wB, t2, wA, 0, 0, 0);
        t11 = -t11;
        t13 = b.x;
        if (typeof t13 !== 'number')
          return this.solveVelocityConstraints$0$bailout(123, t3, t13, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, b, t10, cp1, cp2, t11, a, t1, wB, t2, wA, 0, 0);
        t6.set$x(t11 * t13);
        t6.set$y(0.0);
        var t15 = c.get$K().get$col1().get$y();
        if (typeof t15 !== 'number')
          return this.solveVelocityConstraints$0$bailout(124, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, b, t10, cp1, cp2, a, t1, wB, t2, t15, wA, 0, 0, 0);
        t17 = t6.get$x();
        if (typeof t17 !== 'number')
          return this.solveVelocityConstraints$0$bailout(125, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, b, t10, cp1, cp2, a, t1, wB, t2, t15, t17, wA, 0, 0);
        t17 = t15 * t17;
        t15 = b.y;
        if (typeof t15 !== 'number')
          return this.solveVelocityConstraints$0$bailout(126, t3, t15, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, b, t10, cp1, cp2, a, t1, wB, t2, t17, wA, 0, 0);
        vn2 = t17 + t15;
        t11 = t6.get$x();
        if (typeof t11 !== 'number')
          return this.solveVelocityConstraints$0$bailout(127, t11, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, t7, invIB, t8, t9, b, t10, cp1, cp2, a, t1, wB, t2, wA, vn2, 0, 0);
        if (t11 >= 0.0 && vn2 >= 0.0) {
          t7.setFrom$1(t6).subLocal$1(a);
          t8.setFrom$1(c.get$normal()).mulLocal$1(t7.x);
          t9.setFrom$1(c.get$normal()).mulLocal$1(t7.y);
          t10.setFrom$1(t8).addLocal$1(t9);
          t5.setFrom$1(t10).mulLocal$1(invMassA);
          vA.subLocal$1(t5);
          t5.setFrom$1(t10).mulLocal$1(invMassB);
          vB.addLocal$1(t5);
          t11 = cp1.get$rA();
          t12 = t11.get$x();
          if (typeof t12 !== 'number')
            return this.solveVelocityConstraints$0$bailout(128, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t11, t1, wB, t12, t2, wA, 0, 0, 0, 0, 0, 0, 0);
          t14 = t8.y;
          if (typeof t14 !== 'number')
            return this.solveVelocityConstraints$0$bailout(129, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t11, t1, wB, t12, t2, t14, wA, 0, 0, 0, 0, 0, 0);
          t14 = t12 * t14;
          t11 = t11.get$y();
          if (typeof t11 !== 'number')
            return this.solveVelocityConstraints$0$bailout(130, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, t14, t11, wA, 0, 0, 0, 0, 0, 0, 0);
          t16 = t8.x;
          if (typeof t16 !== 'number')
            return this.solveVelocityConstraints$0$bailout(131, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, t14, t11, t16, wA, 0, 0, 0, 0, 0, 0);
          t14 -= t11 * t16;
          t18 = cp2.get$rA();
          t19 = t18.get$x();
          if (typeof t19 !== 'number')
            return this.solveVelocityConstraints$0$bailout(132, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, t14, t18, wA, t19, 0, 0, 0, 0, 0, 0);
          t21 = t9.y;
          if (typeof t21 !== 'number')
            return this.solveVelocityConstraints$0$bailout(133, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, t14, t18, wA, t19, t21, 0, 0, 0, 0, 0);
          t21 = t19 * t21;
          t18 = t18.get$y();
          if (typeof t18 !== 'number')
            return this.solveVelocityConstraints$0$bailout(134, t21, t18, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, t14, wA, 0, 0, 0, 0, 0, 0);
          t23 = t9.x;
          if (typeof t23 !== 'number')
            return this.solveVelocityConstraints$0$bailout(135, t21, t18, t23, t4, t3, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, t14, wA, 0, 0, 0, 0, 0);
          wA0 = wA - invIA * (t14 + (t21 - t18 * t23));
          t25 = cp1.get$rB();
          t26 = t25.get$x();
          if (typeof t26 !== 'number')
            return this.solveVelocityConstraints$0$bailout(136, t3, t10, t4, i, cp1, cp2, wA0, t25, t5, t26, t1, wB, bodyA, bodyB, t2, t6, vA, vB, invIB, t7, t8, t9, 0, 0, 0, 0, 0, 0, 0, 0);
          t28 = t8.y;
          if (typeof t28 !== 'number')
            return this.solveVelocityConstraints$0$bailout(137, t3, t4, i, t5, wA0, t25, t26, t28, bodyA, bodyB, t6, vA, vB, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0, 0);
          t28 = t26 * t28;
          t25 = t25.get$y();
          if (typeof t25 !== 'number')
            return this.solveVelocityConstraints$0$bailout(138, t3, t10, t4, i, cp1, cp2, wA0, t5, t1, wB, bodyA, bodyB, t25, t6, vA, vB, t28, t2, invIB, t7, t8, t9, 0, 0, 0, 0, 0, 0, 0, 0);
          t30 = t8.x;
          if (typeof t30 !== 'number')
            return this.solveVelocityConstraints$0$bailout(139, t3, t4, i, t5, wA0, bodyA, bodyB, t25, t6, vA, vB, t28, t30, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0, 0);
          t28 -= t25 * t30;
          t32 = cp2.get$rB();
          t33 = t32.get$x();
          if (typeof t33 !== 'number')
            return this.solveVelocityConstraints$0$bailout(140, t3, t4, i, t5, wA0, bodyA, bodyB, t6, vA, vB, t28, t32, invIB, t33, t8, t7, t9, t10, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0, 0);
          t35 = t9.y;
          if (typeof t35 !== 'number')
            return this.solveVelocityConstraints$0$bailout(141, t3, t4, i, t5, wA0, bodyA, bodyB, t6, vA, vB, t28, t32, invIB, t33, t35, t7, t9, t8, t10, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0);
          t35 = t33 * t35;
          t32 = t32.get$y();
          if (typeof t32 !== 'number')
            return this.solveVelocityConstraints$0$bailout(142, t3, t4, i, t5, wA0, bodyA, bodyB, t6, vA, vB, t28, invIB, t7, t8, t35, t32, t9, t10, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0, 0);
          t37 = t9.x;
          if (typeof t37 !== 'number')
            return this.solveVelocityConstraints$0$bailout(143, t3, t4, i, t5, wA0, bodyA, bodyB, t6, vA, vB, t28, invIB, t7, t8, t35, t32, t37, t10, t9, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0);
          wB0 = wB + invIB * (t28 + (t35 - t32 * t37));
          cp1.set$normalImpulse(t6.get$x());
          cp2.set$normalImpulse(t6.get$y());
          wA = wA0;
          wB = wB0;
          break;
        }
        t6.set$x(0.0);
        t11 = cp2.get$normalMass();
        if (typeof t11 !== 'number')
          return this.solveVelocityConstraints$0$bailout(144, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, b, t10, cp1, cp2, a, t1, wB, t2, t11, wA, 0, 0, 0);
        t11 = -t11;
        t13 = b.y;
        if (typeof t13 !== 'number')
          return this.solveVelocityConstraints$0$bailout(145, t3, t4, t13, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, b, t10, cp1, cp2, a, t1, wB, t2, t11, wA, 0, 0);
        t6.set$y(t11 * t13);
        t15 = c.get$K().get$col2().get$x();
        if (typeof t15 !== 'number')
          return this.solveVelocityConstraints$0$bailout(146, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, b, t10, cp1, cp2, a, t1, wB, t2, wA, t15, 0, 0, 0);
        t17 = t6.get$y();
        if (typeof t17 !== 'number')
          return this.solveVelocityConstraints$0$bailout(147, t17, t3, t4, i, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, b, t10, cp1, cp2, a, t1, wB, t2, wA, t15, 0, 0);
        t17 = t15 * t17;
        t15 = b.x;
        if (typeof t15 !== 'number')
          return this.solveVelocityConstraints$0$bailout(148, t3, t17, t4, i, t15, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, b, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0);
        vn1 = t17 + t15;
        t11 = t6.get$y();
        if (typeof t11 !== 'number')
          return this.solveVelocityConstraints$0$bailout(149, t3, t4, i, vn1, t11, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, b, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0);
        if (t11 >= 0.0 && vn1 >= 0.0) {
          t7.setFrom$1(t6).subLocal$1(a);
          t8.setFrom$1(c.get$normal()).mulLocal$1(t7.x);
          t9.setFrom$1(c.get$normal()).mulLocal$1(t7.y);
          t10.setFrom$1(t8).addLocal$1(t9);
          t5.setFrom$1(t10).mulLocal$1(invMassA);
          vA.subLocal$1(t5);
          t5.setFrom$1(t10).mulLocal$1(invMassB);
          vB.addLocal$1(t5);
          t11 = cp1.get$rA();
          t12 = t11.get$x();
          if (typeof t12 !== 'number')
            return this.solveVelocityConstraints$0$bailout(150, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, t7, invIB, t8, t9, t10, cp1, cp2, t1, wB, t2, t11, wA, t12, 0, 0, 0, 0, 0, 0, 0);
          t14 = t8.y;
          if (typeof t14 !== 'number')
            return this.solveVelocityConstraints$0$bailout(151, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, t11, wA, t12, t14, 0, 0, 0, 0, 0, 0);
          t14 = t12 * t14;
          t11 = t11.get$y();
          if (typeof t11 !== 'number')
            return this.solveVelocityConstraints$0$bailout(152, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, wA, t14, t11, 0, 0, 0, 0, 0, 0, 0);
          t16 = t8.x;
          if (typeof t16 !== 'number')
            return this.solveVelocityConstraints$0$bailout(153, t16, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, wA, t14, t11, 0, 0, 0, 0, 0, 0);
          t14 -= t11 * t16;
          t18 = cp2.get$rA();
          t19 = t18.get$x();
          if (typeof t19 !== 'number')
            return this.solveVelocityConstraints$0$bailout(154, t3, t4, t14, i, t18, t19, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, wA, 0, 0, 0, 0, 0, 0);
          t21 = t9.y;
          if (typeof t21 !== 'number')
            return this.solveVelocityConstraints$0$bailout(155, t3, t4, t14, i, t18, t19, t21, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, wA, 0, 0, 0, 0, 0);
          t21 = t19 * t21;
          t18 = t18.get$y();
          if (typeof t18 !== 'number')
            return this.solveVelocityConstraints$0$bailout(156, t3, t4, t14, i, t21, t18, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, wA, 0, 0, 0, 0, 0, 0);
          t23 = t9.x;
          if (typeof t23 !== 'number')
            return this.solveVelocityConstraints$0$bailout(157, t3, t4, t14, i, t21, t18, t23, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, wA, 0, 0, 0, 0, 0);
          wA0 = wA - invIA * (t14 + (t21 - t18 * t23));
          t25 = cp1.get$rB();
          t26 = t25.get$x();
          if (typeof t26 !== 'number')
            return this.solveVelocityConstraints$0$bailout(158, t3, t10, t4, i, cp1, cp2, t5, t1, wB, bodyA, bodyB, t2, t6, vA, wA0, vB, t26, t25, invIB, t7, t8, t9, 0, 0, 0, 0, 0, 0, 0, 0);
          t28 = t8.y;
          if (typeof t28 !== 'number')
            return this.solveVelocityConstraints$0$bailout(159, t3, t4, i, t5, bodyA, bodyB, t6, vA, wA0, vB, t26, t25, invIB, t7, t28, t8, t9, t10, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0, 0);
          t28 = t26 * t28;
          t25 = t25.get$y();
          if (typeof t25 !== 'number')
            return this.solveVelocityConstraints$0$bailout(160, t3, t10, t4, i, cp1, t7, cp2, t5, t1, wB, bodyA, bodyB, t2, t6, vA, wA0, vB, invIB, t28, t25, t8, t9, 0, 0, 0, 0, 0, 0, 0, 0);
          t30 = t8.x;
          if (typeof t30 !== 'number')
            return this.solveVelocityConstraints$0$bailout(161, t3, t4, i, t5, bodyA, bodyB, t6, vA, wA0, vB, t7, invIB, t8, t25, t28, t9, t10, t30, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0, 0);
          t28 -= t25 * t30;
          t32 = cp2.get$rB();
          t33 = t32.get$x();
          if (typeof t33 !== 'number')
            return this.solveVelocityConstraints$0$bailout(162, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, wA0, invIB, t7, t8, t9, t10, t28, t32, t33, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0, 0);
          t35 = t9.y;
          if (typeof t35 !== 'number')
            return this.solveVelocityConstraints$0$bailout(163, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, wA0, invIB, t7, t8, t9, t10, t28, t32, t33, t35, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0);
          t35 = t33 * t35;
          t32 = t32.get$y();
          if (typeof t32 !== 'number')
            return this.solveVelocityConstraints$0$bailout(164, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, wA0, invIB, t7, t8, t9, t10, t28, cp1, t35, t32, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0, 0);
          t37 = t9.x;
          if (typeof t37 !== 'number')
            return this.solveVelocityConstraints$0$bailout(165, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, wA0, invIB, t7, t8, t9, t10, t28, cp1, t35, t32, cp2, t37, t1, wB, t2, 0, 0, 0, 0, 0, 0);
          wB0 = wB + invIB * (t28 + (t35 - t32 * t37));
          cp1.set$normalImpulse(t6.get$x());
          cp2.set$normalImpulse(t6.get$y());
          wA = wA0;
          wB = wB0;
          break;
        }
        t6.set$x(0.0);
        t6.set$y(0.0);
        vn1 = b.x;
        if (typeof vn1 !== 'number')
          return this.solveVelocityConstraints$0$bailout(166, t3, t4, i, vn1, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, b, t9, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0, 0);
        vn2 = b.y;
        if (typeof vn2 !== 'number')
          return this.solveVelocityConstraints$0$bailout(167, t3, t4, i, vn1, vn2, t5, c, bodyA, bodyB, t6, vA, vB, invMassA, invIA, invMassB, invIB, t7, t8, t9, t10, cp1, cp2, a, t1, wB, t2, wA, 0, 0, 0);
        if (vn1 >= 0.0 && vn2 >= 0.0) {
          t7.setFrom$1(t6).subLocal$1(a);
          t8.setFrom$1(c.get$normal()).mulLocal$1(t7.x);
          t9.setFrom$1(c.get$normal()).mulLocal$1(t7.y);
          t10.setFrom$1(t8).addLocal$1(t9);
          t5.setFrom$1(t10).mulLocal$1(invMassA);
          vA.subLocal$1(t5);
          t5.setFrom$1(t10).mulLocal$1(invMassB);
          vB.addLocal$1(t5);
          t11 = cp1.get$rA();
          t12 = t11.get$x();
          if (typeof t12 !== 'number')
            return this.solveVelocityConstraints$0$bailout(168, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, t11, t12, wA, 0, 0, 0, 0, 0, 0, 0);
          t14 = t8.y;
          if (typeof t14 !== 'number')
            return this.solveVelocityConstraints$0$bailout(169, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, t11, t12, t14, wA, 0, 0, 0, 0, 0, 0);
          t14 = t12 * t14;
          t11 = t11.get$y();
          if (typeof t11 !== 'number')
            return this.solveVelocityConstraints$0$bailout(170, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, t14, t11, wA, 0, 0, 0, 0, 0, 0, 0);
          t16 = t8.x;
          if (typeof t16 !== 'number')
            return this.solveVelocityConstraints$0$bailout(171, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, t14, t11, t16, wA, 0, 0, 0, 0, 0, 0);
          t14 -= t11 * t16;
          t18 = cp2.get$rA();
          t19 = t18.get$x();
          if (typeof t19 !== 'number')
            return this.solveVelocityConstraints$0$bailout(172, t19, t3, t4, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, wA, t14, t18, 0, 0, 0, 0, 0, 0);
          t21 = t9.y;
          if (typeof t21 !== 'number')
            return this.solveVelocityConstraints$0$bailout(173, t19, t21, t4, t3, i, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, wA, t14, t18, 0, 0, 0, 0, 0);
          t21 = t19 * t21;
          t18 = t18.get$y();
          if (typeof t18 !== 'number')
            return this.solveVelocityConstraints$0$bailout(174, t3, t4, t21, i, t18, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, wA, t14, 0, 0, 0, 0, 0, 0);
          t23 = t9.x;
          if (typeof t23 !== 'number')
            return this.solveVelocityConstraints$0$bailout(175, t3, t4, t21, i, t18, t23, t5, bodyA, bodyB, t6, vA, vB, invIA, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, wA, t14, 0, 0, 0, 0, 0);
          wA0 = wA - invIA * (t14 + (t21 - t18 * t23));
          t25 = cp1.get$rB();
          t26 = t25.get$x();
          if (typeof t26 !== 'number')
            return this.solveVelocityConstraints$0$bailout(176, t3, t10, t4, i, cp1, cp2, t5, t2, wA0, wB, bodyA, bodyB, t25, t6, vA, vB, t26, t1, invIB, t7, t8, t9, 0, 0, 0, 0, 0, 0, 0, 0);
          t28 = t8.y;
          if (typeof t28 !== 'number')
            return this.solveVelocityConstraints$0$bailout(177, t3, t4, i, t5, wA0, t25, bodyA, bodyB, t26, t6, vA, vB, t28, invIB, t7, t8, t9, t10, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0, 0);
          t28 = t26 * t28;
          t25 = t25.get$y();
          if (typeof t25 !== 'number')
            return this.solveVelocityConstraints$0$bailout(178, t3, t10, t4, i, cp1, cp2, t5, wA0, wB, bodyA, bodyB, t2, t6, vA, vB, t25, t28, t1, invIB, t7, t8, t9, 0, 0, 0, 0, 0, 0, 0, 0);
          t30 = t8.x;
          if (typeof t30 !== 'number')
            return this.solveVelocityConstraints$0$bailout(179, t3, t4, i, t5, wA0, bodyA, bodyB, t6, vA, vB, t25, t28, invIB, t7, t8, t30, t9, t10, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0, 0);
          t28 -= t25 * t30;
          t32 = cp2.get$rB();
          t33 = t32.get$x();
          if (typeof t33 !== 'number')
            return this.solveVelocityConstraints$0$bailout(180, t3, t4, i, t5, wA0, bodyA, bodyB, t6, vA, vB, invIB, t28, t8, t32, t33, t9, t10, t7, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0, 0);
          t35 = t9.y;
          if (typeof t35 !== 'number')
            return this.solveVelocityConstraints$0$bailout(181, t3, t4, i, t5, wA0, bodyA, bodyB, t6, vA, vB, invIB, t28, t32, t7, t33, t35, t10, t9, t8, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0);
          t35 = t33 * t35;
          t32 = t32.get$y();
          if (typeof t32 !== 'number')
            return this.solveVelocityConstraints$0$bailout(182, t3, t4, i, t5, wA0, bodyA, bodyB, t6, vA, vB, invIB, t28, t8, t7, t9, t10, t35, t32, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0, 0);
          t37 = t9.x;
          if (typeof t37 !== 'number')
            return this.solveVelocityConstraints$0$bailout(183, t3, t4, i, t5, wA0, bodyA, bodyB, t6, vA, vB, invIB, t28, t8, t7, t9, t10, t35, t32, t37, cp1, cp2, t1, wB, t2, 0, 0, 0, 0, 0, 0);
          wB0 = wB + invIB * (t28 + (t35 - t32 * t37));
          cp1.set$normalImpulse(t6.get$x());
          cp2.set$normalImpulse(t6.get$y());
          wA = wA0;
          wB = wB0;
          break;
        }
        break;
      }
    }
    bodyA.get$linearVelocity().setFrom$1(vA);
    bodyA.set$angularVelocity(wA);
    bodyB.get$linearVelocity().setFrom$1(vB);
    bodyB.set$angularVelocity(wB);
    ++i;
  }
},
 solveVelocityConstraints$0$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13, env14, env15, env16, env17, env18, env19, env20, env21, env22, env23, env24, env25, env26, env27, env28, env29) {
  switch (state) {
    case 1:
      t3 = env0;
      t10 = env1;
      t4 = env2;
      i = env3;
      t5 = env4;
      t11 = env5;
      t1 = env6;
      t2 = env7;
      t6 = env8;
      t7 = env9;
      t8 = env10;
      t9 = env11;
      break;
    case 2:
      t3 = env0;
      t10 = env1;
      t4 = env2;
      i = env3;
      t5 = env4;
      t1 = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      wA = env9;
      t6 = env10;
      t2 = env11;
      t7 = env12;
      t8 = env13;
      t9 = env14;
      break;
    case 3:
      t3 = env0;
      t10 = env1;
      t4 = env2;
      i = env3;
      t5 = env4;
      t1 = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      wA = env9;
      wB = env10;
      t6 = env11;
      t2 = env12;
      t7 = env13;
      t8 = env14;
      t9 = env15;
      break;
    case 4:
      t3 = env0;
      t10 = env1;
      t4 = env2;
      i = env3;
      t2 = env4;
      t5 = env5;
      t1 = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      wB = env11;
      vA = env12;
      vB = env13;
      t6 = env14;
      invMassA = env15;
      t7 = env16;
      t8 = env17;
      t9 = env18;
      break;
    case 5:
      t3 = env0;
      t10 = env1;
      t4 = env2;
      i = env3;
      t2 = env4;
      t5 = env5;
      t1 = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      wB = env11;
      vA = env12;
      vB = env13;
      t6 = env14;
      invMassA = env15;
      invIA = env16;
      t7 = env17;
      t8 = env18;
      t9 = env19;
      break;
    case 6:
      t3 = env0;
      t10 = env1;
      t4 = env2;
      i = env3;
      t2 = env4;
      t5 = env5;
      t1 = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      wB = env11;
      vA = env12;
      vB = env13;
      t6 = env14;
      invMassA = env15;
      invIA = env16;
      invMassB = env17;
      t7 = env18;
      t8 = env19;
      t9 = env20;
      break;
    case 7:
      t3 = env0;
      t10 = env1;
      t4 = env2;
      i = env3;
      t2 = env4;
      t5 = env5;
      t1 = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      wB = env11;
      vA = env12;
      vB = env13;
      t6 = env14;
      invMassA = env15;
      invIA = env16;
      invMassB = env17;
      invIB = env18;
      t8 = env19;
      t7 = env20;
      t9 = env21;
      break;
    case 8:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      wA = env7;
      wB = env8;
      vA = env9;
      vB = env10;
      t6 = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      invIB = env15;
      t8 = env16;
      t7 = env17;
      t9 = env18;
      t10 = env19;
      friction = env20;
      t1 = env21;
      t2 = env22;
      break;
    case 9:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      friction = env18;
      t1 = env19;
      wB = env20;
      j = env21;
      t2 = env22;
      wA = env23;
      t11 = env24;
      break;
    case 10:
      t3 = env0;
      t4 = env1;
      i = env2;
      t11 = env3;
      t5 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      t9 = env17;
      t10 = env18;
      friction = env19;
      t1 = env20;
      wB = env21;
      j = env22;
      t2 = env23;
      wA = env24;
      break;
    case 11:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      a = env4;
      t11 = env5;
      t5 = env6;
      t13 = env7;
      c = env8;
      bodyA = env9;
      bodyB = env10;
      t6 = env11;
      vA = env12;
      vB = env13;
      invMassA = env14;
      invIA = env15;
      invMassB = env16;
      invIB = env17;
      t7 = env18;
      t8 = env19;
      t9 = env20;
      t10 = env21;
      friction = env22;
      t1 = env23;
      wB = env24;
      j = env25;
      t2 = env26;
      wA = env27;
      break;
    case 12:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      a = env4;
      t5 = env5;
      t13 = env6;
      t11 = env7;
      c = env8;
      bodyA = env9;
      bodyB = env10;
      t6 = env11;
      vA = env12;
      vB = env13;
      invMassA = env14;
      invIA = env15;
      invMassB = env16;
      invIB = env17;
      t7 = env18;
      t8 = env19;
      t9 = env20;
      t10 = env21;
      friction = env22;
      t1 = env23;
      wB = env24;
      j = env25;
      t2 = env26;
      wA = env27;
      break;
    case 13:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      a = env4;
      t5 = env5;
      c = env6;
      t11 = env7;
      bodyB = env8;
      t13 = env9;
      bodyA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      invMassB = env15;
      invIB = env16;
      t7 = env17;
      t8 = env18;
      t6 = env19;
      t9 = env20;
      t10 = env21;
      friction = env22;
      t1 = env23;
      wB = env24;
      j = env25;
      t2 = env26;
      wA = env27;
      break;
    case 14:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      a = env4;
      t5 = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t13 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      invIB = env15;
      t11 = env16;
      t8 = env17;
      t7 = env18;
      t6 = env19;
      t9 = env20;
      t10 = env21;
      friction = env22;
      t1 = env23;
      wB = env24;
      j = env25;
      t2 = env26;
      wA = env27;
      break;
    case 15:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      a = env4;
      t5 = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      invIB = env15;
      t7 = env16;
      t8 = env17;
      t18 = env18;
      t9 = env19;
      t10 = env20;
      friction = env21;
      t1 = env22;
      wB = env23;
      j = env24;
      t2 = env25;
      wA = env26;
      break;
    case 16:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      a = env4;
      t5 = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      invIB = env15;
      t7 = env16;
      t8 = env17;
      t9 = env18;
      t18 = env19;
      t20 = env20;
      t10 = env21;
      friction = env22;
      t1 = env23;
      wB = env24;
      j = env25;
      t2 = env26;
      wA = env27;
      break;
    case 17:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      a = env4;
      t5 = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      invIB = env15;
      t7 = env16;
      t8 = env17;
      t9 = env18;
      t10 = env19;
      t20 = env20;
      t18 = env21;
      friction = env22;
      t1 = env23;
      wB = env24;
      j = env25;
      t2 = env26;
      wA = env27;
      break;
    case 18:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      t5 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      t9 = env17;
      t10 = env18;
      t18 = env19;
      t20 = env20;
      friction = env21;
      t1 = env22;
      wB = env23;
      j = env24;
      t2 = env25;
      wA = env26;
      break;
    case 19:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      t5 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      t9 = env17;
      t10 = env18;
      friction = env19;
      t24 = env20;
      t1 = env21;
      wB = env22;
      j = env23;
      t2 = env24;
      wA = env25;
      break;
    case 20:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      t5 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      t9 = env17;
      t10 = env18;
      friction = env19;
      t24 = env20;
      t1 = env21;
      t26 = env22;
      wB = env23;
      j = env24;
      t2 = env25;
      wA = env26;
      break;
    case 21:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      t5 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      t9 = env17;
      t10 = env18;
      friction = env19;
      t1 = env20;
      wB = env21;
      j = env22;
      t26 = env23;
      t2 = env24;
      t24 = env25;
      wA = env26;
      break;
    case 22:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      t5 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      t9 = env17;
      t10 = env18;
      friction = env19;
      t1 = env20;
      wB = env21;
      j = env22;
      t26 = env23;
      t2 = env24;
      t24 = env25;
      t29 = env26;
      wA = env27;
      break;
    case 23:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      t5 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      t7 = env14;
      invIB = env15;
      t8 = env16;
      t9 = env17;
      t10 = env18;
      friction = env19;
      t1 = env20;
      wB = env21;
      j = env22;
      t2 = env23;
      wA = env24;
      vt = env25;
      t26 = env26;
      break;
    case 24:
      lambda = env0;
      t26 = env1;
      t3 = env2;
      t4 = env3;
      i = env4;
      ccp = env5;
      t5 = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      invMassB = env15;
      invIB = env16;
      t7 = env17;
      t8 = env18;
      t9 = env19;
      t10 = env20;
      friction = env21;
      t1 = env22;
      wB = env23;
      j = env24;
      t2 = env25;
      wA = env26;
      break;
    case 25:
      lambda = env0;
      t3 = env1;
      maxFriction = env2;
      t26 = env3;
      i = env4;
      t4 = env5;
      ccp = env6;
      t5 = env7;
      c = env8;
      bodyA = env9;
      bodyB = env10;
      t6 = env11;
      vA = env12;
      vB = env13;
      invMassA = env14;
      invIA = env15;
      invMassB = env16;
      invIB = env17;
      t7 = env18;
      t8 = env19;
      t9 = env20;
      t10 = env21;
      friction = env22;
      t1 = env23;
      wB = env24;
      j = env25;
      t2 = env26;
      wA = env27;
      break;
    case 26:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      t5 = env4;
      newImpulse = env5;
      lambda = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      t34 = env10;
      t6 = env11;
      vA = env12;
      vB = env13;
      invMassA = env14;
      invIA = env15;
      invMassB = env16;
      invIB = env17;
      t7 = env18;
      t8 = env19;
      t9 = env20;
      t10 = env21;
      friction = env22;
      t1 = env23;
      wB = env24;
      j = env25;
      t2 = env26;
      wA = env27;
      break;
    case 27:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      t5 = env4;
      newImpulse = env5;
      lambda = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      Px = env10;
      t34 = env11;
      vA = env12;
      vB = env13;
      invMassA = env14;
      invIA = env15;
      invMassB = env16;
      invIB = env17;
      t7 = env18;
      t8 = env19;
      t6 = env20;
      t9 = env21;
      t10 = env22;
      friction = env23;
      t1 = env24;
      wB = env25;
      j = env26;
      t2 = env27;
      wA = env28;
      break;
    case 28:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      t5 = env4;
      newImpulse = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      Px = env9;
      t6 = env10;
      vA = env11;
      Py = env12;
      invMassA = env13;
      invIA = env14;
      invMassB = env15;
      invIB = env16;
      t7 = env17;
      vB = env18;
      t34 = env19;
      t9 = env20;
      t8 = env21;
      t10 = env22;
      friction = env23;
      t1 = env24;
      wB = env25;
      j = env26;
      t2 = env27;
      wA = env28;
      break;
    case 29:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      t5 = env4;
      newImpulse = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      Px = env9;
      t6 = env10;
      vA = env11;
      Py = env12;
      invMassA = env13;
      invIA = env14;
      invMassB = env15;
      invIB = env16;
      t7 = env17;
      vB = env18;
      t38 = env19;
      t9 = env20;
      t8 = env21;
      t10 = env22;
      friction = env23;
      t1 = env24;
      wB = env25;
      j = env26;
      t2 = env27;
      wA = env28;
      break;
    case 30:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      t5 = env4;
      newImpulse = env5;
      c = env6;
      bodyA = env7;
      Px = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      Py = env12;
      vB = env13;
      invIA = env14;
      invMassB = env15;
      t7 = env16;
      invIB = env17;
      t8 = env18;
      invMassA = env19;
      t9 = env20;
      t10 = env21;
      t40 = env22;
      friction = env23;
      t1 = env24;
      wB = env25;
      j = env26;
      t2 = env27;
      wA = env28;
      break;
    case 31:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      t5 = env4;
      newImpulse = env5;
      c = env6;
      bodyA = env7;
      Px = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      Py = env12;
      vB = env13;
      invIA = env14;
      invMassB = env15;
      invIB = env16;
      t7 = env17;
      t8 = env18;
      invMassA = env19;
      t9 = env20;
      t10 = env21;
      t40 = env22;
      t42 = env23;
      friction = env24;
      t1 = env25;
      wB = env26;
      j = env27;
      t2 = env28;
      wA = env29;
      break;
    case 32:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      t5 = env4;
      newImpulse = env5;
      c = env6;
      bodyA = env7;
      Px = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      Py = env12;
      vB = env13;
      invIA = env14;
      invMassB = env15;
      t7 = env16;
      invIB = env17;
      t8 = env18;
      invMassA = env19;
      t9 = env20;
      t10 = env21;
      friction = env22;
      t1 = env23;
      wA = env24;
      j = env25;
      t44 = env26;
      wB = env27;
      t2 = env28;
      break;
    case 33:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      t5 = env4;
      newImpulse = env5;
      c = env6;
      bodyA = env7;
      Px = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      Py = env12;
      vB = env13;
      invIA = env14;
      invMassB = env15;
      t7 = env16;
      invIB = env17;
      t8 = env18;
      invMassA = env19;
      t9 = env20;
      t10 = env21;
      friction = env22;
      t1 = env23;
      wA = env24;
      j = env25;
      t2 = env26;
      wB = env27;
      t46 = env28;
      break;
    case 34:
      t3 = env0;
      t4 = env1;
      i = env2;
      ccp = env3;
      t5 = env4;
      newImpulse = env5;
      c = env6;
      bodyA = env7;
      Px = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      Py = env12;
      vB = env13;
      invIA = env14;
      invMassB = env15;
      t7 = env16;
      invIB = env17;
      t8 = env18;
      invMassA = env19;
      t9 = env20;
      t10 = env21;
      friction = env22;
      t1 = env23;
      wA = env24;
      j = env25;
      t2 = env26;
      wB = env27;
      t48 = env28;
      break;
    case 35:
      t3 = env0;
      t48 = env1;
      t50 = env2;
      t4 = env3;
      i = env4;
      ccp = env5;
      t5 = env6;
      newImpulse = env7;
      c = env8;
      bodyA = env9;
      Px = env10;
      bodyB = env11;
      t6 = env12;
      vA = env13;
      vB = env14;
      invMassA = env15;
      invIA = env16;
      invMassB = env17;
      t7 = env18;
      invIB = env19;
      t8 = env20;
      t9 = env21;
      t10 = env22;
      friction = env23;
      t1 = env24;
      wA = env25;
      j = env26;
      t2 = env27;
      wB = env28;
      break;
    case 36:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      t11 = env9;
      vB = env10;
      invMassA = env11;
      invMassB = env12;
      invIB = env13;
      invIA = env14;
      t8 = env15;
      t7 = env16;
      t9 = env17;
      t10 = env18;
      t1 = env19;
      wB = env20;
      t2 = env21;
      wA = env22;
      break;
    case 37:
      t8 = env0;
      t3 = env1;
      t10 = env2;
      t4 = env3;
      i = env4;
      t7 = env5;
      t5 = env6;
      t1 = env7;
      wB = env8;
      bodyA = env9;
      t2 = env10;
      bodyB = env11;
      t6 = env12;
      vA = env13;
      c = env14;
      vB = env15;
      invMassA = env16;
      invIA = env17;
      invMassB = env18;
      invIB = env19;
      wA = env20;
      t11 = env21;
      t9 = env22;
      break;
    case 38:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      ccp = env16;
      a1 = env17;
      t9 = env18;
      t11 = env19;
      t10 = env20;
      t13 = env21;
      t1 = env22;
      wB = env23;
      t2 = env24;
      wA = env25;
      break;
    case 39:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      ccp = env16;
      a1 = env17;
      t9 = env18;
      t10 = env19;
      t13 = env20;
      t11 = env21;
      t1 = env22;
      wB = env23;
      t2 = env24;
      wA = env25;
      break;
    case 40:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      ccp = env16;
      a1 = env17;
      t9 = env18;
      t10 = env19;
      t11 = env20;
      t13 = env21;
      t1 = env22;
      wB = env23;
      t2 = env24;
      wA = env25;
      break;
    case 41:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      ccp = env16;
      a1 = env17;
      t9 = env18;
      t10 = env19;
      t13 = env20;
      t11 = env21;
      t1 = env22;
      wB = env23;
      t2 = env24;
      wA = env25;
      break;
    case 42:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      t7 = env13;
      invIB = env14;
      t8 = env15;
      ccp = env16;
      a1 = env17;
      t9 = env18;
      t10 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      t18 = env23;
      wA = env24;
      break;
    case 43:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      ccp = env16;
      a1 = env17;
      t9 = env18;
      t10 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      t18 = env23;
      t20 = env24;
      wA = env25;
      break;
    case 44:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      ccp = env16;
      a1 = env17;
      t9 = env18;
      t10 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      t20 = env23;
      wA = env24;
      t18 = env25;
      break;
    case 45:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      t7 = env13;
      invIB = env14;
      t8 = env15;
      ccp = env16;
      t9 = env17;
      t10 = env18;
      t1 = env19;
      wB = env20;
      t2 = env21;
      wA = env22;
      t18 = env23;
      t20 = env24;
      break;
    case 46:
      t3 = env0;
      t4 = env1;
      b = env2;
      i = env3;
      t24 = env4;
      t5 = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      t7 = env15;
      invIB = env16;
      t8 = env17;
      ccp = env18;
      t9 = env19;
      t10 = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      wA = env24;
      break;
    case 47:
      t3 = env0;
      t4 = env1;
      b = env2;
      i = env3;
      t24 = env4;
      t26 = env5;
      t5 = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      invMassB = env15;
      invIB = env16;
      t7 = env17;
      t8 = env18;
      ccp = env19;
      t9 = env20;
      t10 = env21;
      t1 = env22;
      wB = env23;
      t2 = env24;
      wA = env25;
      break;
    case 48:
      t3 = env0;
      t4 = env1;
      b = env2;
      i = env3;
      t26 = env4;
      t24 = env5;
      t5 = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      invMassB = env15;
      invIB = env16;
      t7 = env17;
      t8 = env18;
      ccp = env19;
      t9 = env20;
      t10 = env21;
      t1 = env22;
      wB = env23;
      t2 = env24;
      wA = env25;
      break;
    case 49:
      t3 = env0;
      t4 = env1;
      i = env2;
      t26 = env3;
      t24 = env4;
      t29 = env5;
      t5 = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      invMassB = env15;
      invIB = env16;
      t7 = env17;
      t8 = env18;
      ccp = env19;
      t9 = env20;
      t10 = env21;
      t1 = env22;
      wB = env23;
      t2 = env24;
      wA = env25;
      break;
    case 50:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      vn = env4;
      t26 = env5;
      bodyA = env6;
      bodyB = env7;
      c = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      t7 = env15;
      invIB = env16;
      t8 = env17;
      ccp = env18;
      t9 = env19;
      t10 = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      wA = env24;
      break;
    case 51:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      vn = env4;
      c = env5;
      bodyA = env6;
      t26 = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      t32 = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      invMassB = env15;
      invIB = env16;
      t8 = env17;
      ccp = env18;
      t9 = env19;
      t10 = env20;
      t7 = env21;
      t1 = env22;
      wB = env23;
      t2 = env24;
      wA = env25;
      break;
    case 52:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      lambda = env10;
      invMassA = env11;
      invIA = env12;
      t7 = env13;
      invIB = env14;
      invMassB = env15;
      ccp = env16;
      t26 = env17;
      t8 = env18;
      t10 = env19;
      t9 = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      wA = env24;
      break;
    case 53:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      ccp = env16;
      t9 = env17;
      t10 = env18;
      newImpulse = env19;
      t11 = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      wA = env24;
      break;
    case 54:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      ccp = env16;
      t9 = env17;
      t10 = env18;
      newImpulse = env19;
      lambda = env20;
      t11 = env21;
      t1 = env22;
      wB = env23;
      t2 = env24;
      wA = env25;
      break;
    case 55:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invMassA = env9;
      invIA = env10;
      invMassB = env11;
      invIB = env12;
      t7 = env13;
      t8 = env14;
      ccp = env15;
      t9 = env16;
      t10 = env17;
      newImpulse = env18;
      lambda = env19;
      Px = env20;
      t11 = env21;
      t1 = env22;
      wB = env23;
      t2 = env24;
      wA = env25;
      break;
    case 56:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invMassA = env9;
      invIA = env10;
      invMassB = env11;
      invIB = env12;
      t7 = env13;
      t8 = env14;
      ccp = env15;
      t9 = env16;
      t10 = env17;
      newImpulse = env18;
      Px = env19;
      Py = env20;
      t11 = env21;
      wB = env22;
      t2 = env23;
      t1 = env24;
      wA = env25;
      break;
    case 57:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invMassA = env9;
      invIA = env10;
      invMassB = env11;
      invIB = env12;
      t7 = env13;
      t8 = env14;
      ccp = env15;
      t9 = env16;
      t10 = env17;
      newImpulse = env18;
      Px = env19;
      Py = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      t16 = env24;
      wA = env25;
      break;
    case 58:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invMassB = env10;
      invIB = env11;
      t7 = env12;
      t8 = env13;
      ccp = env14;
      t9 = env15;
      t10 = env16;
      newImpulse = env17;
      Px = env18;
      Py = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      wA = env23;
      t18 = env24;
      break;
    case 59:
      t20 = env0;
      t3 = env1;
      t4 = env2;
      i = env3;
      t5 = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invIA = env10;
      invMassB = env11;
      invIB = env12;
      t7 = env13;
      t8 = env14;
      ccp = env15;
      t9 = env16;
      t10 = env17;
      newImpulse = env18;
      Px = env19;
      Py = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      wA = env24;
      t18 = env25;
      break;
    case 60:
      t3 = env0;
      t4 = env1;
      i = env2;
      wA = env3;
      t22 = env4;
      t5 = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassB = env11;
      invIB = env12;
      t7 = env13;
      t8 = env14;
      ccp = env15;
      t9 = env16;
      t10 = env17;
      newImpulse = env18;
      Px = env19;
      Py = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      break;
    case 61:
      t3 = env0;
      t4 = env1;
      i = env2;
      wA = env3;
      t5 = env4;
      t24 = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassB = env11;
      invIB = env12;
      t7 = env13;
      t8 = env14;
      ccp = env15;
      t9 = env16;
      t10 = env17;
      newImpulse = env18;
      Px = env19;
      Py = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      break;
    case 62:
      t3 = env0;
      t10 = env1;
      t4 = env2;
      newImpulse = env3;
      i = env4;
      wA = env5;
      Px = env6;
      t5 = env7;
      Py = env8;
      t1 = env9;
      wB = env10;
      bodyA = env11;
      bodyB = env12;
      t2 = env13;
      t6 = env14;
      vA = env15;
      vB = env16;
      t26 = env17;
      invIB = env18;
      t7 = env19;
      t8 = env20;
      ccp = env21;
      t9 = env22;
      break;
    case 63:
      t3 = env0;
      t10 = env1;
      t4 = env2;
      newImpulse = env3;
      i = env4;
      wA = env5;
      t7 = env6;
      Px = env7;
      t5 = env8;
      t1 = env9;
      wB = env10;
      bodyA = env11;
      bodyB = env12;
      t2 = env13;
      t6 = env14;
      vA = env15;
      vB = env16;
      t26 = env17;
      invIB = env18;
      t28 = env19;
      t8 = env20;
      ccp = env21;
      t9 = env22;
      break;
    case 64:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      t11 = env18;
      t1 = env19;
      wB = env20;
      t2 = env21;
      wA = env22;
      break;
    case 65:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      t11 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      wA = env23;
      break;
    case 66:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      a = env20;
      t1 = env21;
      t11 = env22;
      wB = env23;
      t14 = env24;
      t2 = env25;
      wA = env26;
      break;
    case 67:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      a = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      t14 = env24;
      t11 = env25;
      wA = env26;
      break;
    case 68:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      a = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      t11 = env24;
      t14 = env25;
      wA = env26;
      break;
    case 69:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      a = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      wA = env24;
      t14 = env25;
      t11 = env26;
      break;
    case 70:
      t3 = env0;
      t4 = env1;
      i = env2;
      t19 = env3;
      t5 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      t9 = env17;
      t10 = env18;
      cp1 = env19;
      cp2 = env20;
      a = env21;
      t1 = env22;
      wB = env23;
      t2 = env24;
      wA = env25;
      break;
    case 71:
      t3 = env0;
      t4 = env1;
      i = env2;
      t19 = env3;
      t21 = env4;
      t5 = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      invIB = env15;
      t7 = env16;
      t8 = env17;
      t9 = env18;
      t10 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      wA = env26;
      break;
    case 72:
      t3 = env0;
      t4 = env1;
      i = env2;
      t21 = env3;
      t5 = env4;
      t19 = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      invIB = env15;
      t7 = env16;
      t8 = env17;
      t9 = env18;
      t10 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      wA = env26;
      break;
    case 73:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      t19 = env4;
      t21 = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      invIB = env15;
      t7 = env16;
      t8 = env17;
      t9 = env18;
      t10 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      wA = env26;
      break;
    case 74:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      t25 = env9;
      vB = env10;
      t26 = env11;
      invIA = env12;
      invMassA = env13;
      invIB = env14;
      invMassB = env15;
      t7 = env16;
      t9 = env17;
      t8 = env18;
      t10 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      wA = env26;
      break;
    case 75:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t25 = env14;
      t8 = env15;
      t7 = env16;
      t9 = env17;
      t10 = env18;
      t26 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      wA = env26;
      break;
    case 76:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t25 = env16;
      t26 = env17;
      t9 = env18;
      t10 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      wA = env26;
      break;
    case 77:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      t26 = env18;
      t25 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      wA = env26;
      break;
    case 78:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      t31 = env20;
      a = env21;
      t1 = env22;
      wB = env23;
      t2 = env24;
      wA = env25;
      break;
    case 79:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      t31 = env20;
      t33 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      wA = env26;
      break;
    case 80:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      a = env20;
      t33 = env21;
      wB = env22;
      t31 = env23;
      t1 = env24;
      t2 = env25;
      wA = env26;
      break;
    case 81:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      a = env20;
      t1 = env21;
      wB = env22;
      t31 = env23;
      t2 = env24;
      t33 = env25;
      wA = env26;
      break;
    case 82:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      a = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      wA = env24;
      t37 = env25;
      break;
    case 83:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      a = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      wA = env24;
      t37 = env25;
      t39 = env26;
      break;
    case 84:
      t39 = env0;
      t3 = env1;
      t4 = env2;
      t37 = env3;
      i = env4;
      t5 = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      invIB = env15;
      t7 = env16;
      t8 = env17;
      t9 = env18;
      t10 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      wA = env26;
      break;
    case 85:
      t39 = env0;
      t3 = env1;
      t4 = env2;
      t37 = env3;
      i = env4;
      t42 = env5;
      t5 = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      invMassB = env15;
      invIB = env16;
      t7 = env17;
      t8 = env18;
      t9 = env19;
      t10 = env20;
      cp1 = env21;
      cp2 = env22;
      a = env23;
      t1 = env24;
      wB = env25;
      t2 = env26;
      wA = env27;
      break;
    case 86:
      t3 = env0;
      t4 = env1;
      i = env2;
      vn1 = env3;
      t5 = env4;
      t39 = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      invIB = env15;
      t7 = env16;
      t8 = env17;
      t9 = env18;
      t10 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      wA = env26;
      break;
    case 87:
      t3 = env0;
      t4 = env1;
      i = env2;
      vn1 = env3;
      t5 = env4;
      t39 = env5;
      t45 = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      invMassB = env15;
      invIB = env16;
      t7 = env17;
      t8 = env18;
      t9 = env19;
      t10 = env20;
      cp1 = env21;
      cp2 = env22;
      a = env23;
      t1 = env24;
      wB = env25;
      t2 = env26;
      wA = env27;
      break;
    case 88:
      t3 = env0;
      t4 = env1;
      i = env2;
      vn1 = env3;
      t5 = env4;
      t45 = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t39 = env9;
      t6 = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      invMassB = env15;
      invIB = env16;
      t7 = env17;
      t8 = env18;
      t9 = env19;
      t10 = env20;
      cp1 = env21;
      cp2 = env22;
      a = env23;
      t1 = env24;
      wB = env25;
      t2 = env26;
      wA = env27;
      break;
    case 89:
      t3 = env0;
      t4 = env1;
      i = env2;
      vn1 = env3;
      t5 = env4;
      t45 = env5;
      c = env6;
      bodyA = env7;
      t48 = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      t39 = env12;
      vB = env13;
      invMassA = env14;
      invIA = env15;
      invMassB = env16;
      invIB = env17;
      t8 = env18;
      t7 = env19;
      t9 = env20;
      t10 = env21;
      cp1 = env22;
      cp2 = env23;
      a = env24;
      t1 = env25;
      wB = env26;
      t2 = env27;
      wA = env28;
      break;
    case 90:
      t3 = env0;
      t4 = env1;
      i = env2;
      vn1 = env3;
      t5 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vn2 = env10;
      vB = env11;
      t45 = env12;
      invIA = env13;
      invMassA = env14;
      invIB = env15;
      invMassB = env16;
      t7 = env17;
      t9 = env18;
      t8 = env19;
      t10 = env20;
      cp1 = env21;
      cp2 = env22;
      a = env23;
      t1 = env24;
      wB = env25;
      t2 = env26;
      wA = env27;
      break;
    case 91:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vn2 = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      t51 = env14;
      t8 = env15;
      invIB = env16;
      t9 = env17;
      t10 = env18;
      t7 = env19;
      cp1 = env20;
      t45 = env21;
      cp2 = env22;
      a = env23;
      t1 = env24;
      wB = env25;
      t2 = env26;
      wA = env27;
      break;
    case 92:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      b = env16;
      t9 = env17;
      t10 = env18;
      t45 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      wA = env26;
      break;
    case 93:
      t3 = env0;
      t4 = env1;
      i = env2;
      t54 = env3;
      t5 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      b = env17;
      t9 = env18;
      t10 = env19;
      t45 = env20;
      cp1 = env21;
      cp2 = env22;
      a = env23;
      t1 = env24;
      wB = env25;
      t2 = env26;
      wA = env27;
      break;
    case 94:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      b = env16;
      t9 = env17;
      t10 = env18;
      t54 = env19;
      cp1 = env20;
      t45 = env21;
      cp2 = env22;
      a = env23;
      t1 = env24;
      wB = env25;
      t2 = env26;
      wA = env27;
      break;
    case 95:
      t3 = env0;
      t4 = env1;
      i = env2;
      t57 = env3;
      t5 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      b = env17;
      t9 = env18;
      t10 = env19;
      t54 = env20;
      cp1 = env21;
      t45 = env22;
      cp2 = env23;
      a = env24;
      t1 = env25;
      wB = env26;
      t2 = env27;
      wA = env28;
      break;
    case 96:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      b = env16;
      t9 = env17;
      t10 = env18;
      cp1 = env19;
      cp2 = env20;
      a = env21;
      t1 = env22;
      wB = env23;
      t59 = env24;
      t2 = env25;
      wA = env26;
      break;
    case 97:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      t61 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      b = env17;
      t9 = env18;
      t10 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t59 = env25;
      t2 = env26;
      wA = env27;
      break;
    case 98:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      b = env16;
      t9 = env17;
      t10 = env18;
      cp1 = env19;
      cp2 = env20;
      a = env21;
      t1 = env22;
      wB = env23;
      t2 = env24;
      t61 = env25;
      t59 = env26;
      wA = env27;
      break;
    case 99:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      t64 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      b = env17;
      t9 = env18;
      t10 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      t61 = env26;
      t59 = env27;
      wA = env28;
      break;
    case 100:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      t66 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      b = env17;
      t9 = env18;
      t10 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      wA = env26;
      break;
    case 101:
      t3 = env0;
      t68 = env1;
      t4 = env2;
      i = env3;
      t5 = env4;
      t66 = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      invIB = env15;
      t7 = env16;
      t8 = env17;
      b = env18;
      t9 = env19;
      t10 = env20;
      cp1 = env21;
      cp2 = env22;
      a = env23;
      t1 = env24;
      wB = env25;
      t2 = env26;
      wA = env27;
      break;
    case 102:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      t70 = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      b = env17;
      t9 = env18;
      t10 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      wA = env26;
      break;
    case 103:
      t3 = env0;
      t4 = env1;
      i = env2;
      t72 = env3;
      t5 = env4;
      c = env5;
      t70 = env6;
      bodyA = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      invIB = env15;
      t7 = env16;
      t8 = env17;
      b = env18;
      t9 = env19;
      t10 = env20;
      cp1 = env21;
      cp2 = env22;
      a = env23;
      t1 = env24;
      wB = env25;
      t2 = env26;
      wA = env27;
      break;
    case 104:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      b = env17;
      t10 = env18;
      cp1 = env19;
      cp2 = env20;
      a = env21;
      t1 = env22;
      wB = env23;
      t11 = env24;
      t2 = env25;
      wA = env26;
      break;
    case 105:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      b = env16;
      t9 = env17;
      t10 = env18;
      cp1 = env19;
      cp2 = env20;
      a = env21;
      t1 = env22;
      wB = env23;
      t2 = env24;
      t11 = env25;
      wA = env26;
      break;
    case 106:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      t11 = env15;
      t12 = env16;
      cp1 = env17;
      cp2 = env18;
      t1 = env19;
      wB = env20;
      t2 = env21;
      wA = env22;
      break;
    case 107:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      t11 = env15;
      t12 = env16;
      cp1 = env17;
      t14 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      wA = env23;
      break;
    case 108:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      t14 = env16;
      cp2 = env17;
      t11 = env18;
      t1 = env19;
      wB = env20;
      t2 = env21;
      wA = env22;
      break;
    case 109:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      t14 = env16;
      cp2 = env17;
      t11 = env18;
      t16 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      wA = env23;
      break;
    case 110:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      cp2 = env16;
      t1 = env17;
      t14 = env18;
      wB = env19;
      t2 = env20;
      t19 = env21;
      t18 = env22;
      wA = env23;
      break;
    case 111:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      cp2 = env16;
      t1 = env17;
      t14 = env18;
      wB = env19;
      t19 = env20;
      t18 = env21;
      t21 = env22;
      t2 = env23;
      wA = env24;
      break;
    case 112:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      cp2 = env16;
      t14 = env17;
      wB = env18;
      t2 = env19;
      t1 = env20;
      t18 = env21;
      t21 = env22;
      wA = env23;
      break;
    case 113:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      cp2 = env16;
      t14 = env17;
      wB = env18;
      t1 = env19;
      t2 = env20;
      t21 = env21;
      t18 = env22;
      t23 = env23;
      wA = env24;
      break;
    case 114:
      t3 = env0;
      wA0 = env1;
      t25 = env2;
      t10 = env3;
      i = env4;
      t26 = env5;
      cp1 = env6;
      t4 = env7;
      cp2 = env8;
      t5 = env9;
      t1 = env10;
      wB = env11;
      bodyA = env12;
      bodyB = env13;
      t2 = env14;
      t6 = env15;
      vA = env16;
      vB = env17;
      invIB = env18;
      t7 = env19;
      t8 = env20;
      t9 = env21;
      break;
    case 115:
      t3 = env0;
      wA0 = env1;
      t25 = env2;
      t4 = env3;
      i = env4;
      t26 = env5;
      t28 = env6;
      t5 = env7;
      bodyA = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      vB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      break;
    case 116:
      t3 = env0;
      wA0 = env1;
      t4 = env2;
      t10 = env3;
      i = env4;
      cp1 = env5;
      t28 = env6;
      t25 = env7;
      cp2 = env8;
      t5 = env9;
      t1 = env10;
      wB = env11;
      bodyA = env12;
      bodyB = env13;
      t2 = env14;
      t6 = env15;
      vA = env16;
      vB = env17;
      invIB = env18;
      t7 = env19;
      t8 = env20;
      t9 = env21;
      break;
    case 117:
      t3 = env0;
      wA0 = env1;
      t4 = env2;
      i = env3;
      t28 = env4;
      t25 = env5;
      t30 = env6;
      t5 = env7;
      bodyA = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      vB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      break;
    case 118:
      t3 = env0;
      wA0 = env1;
      t4 = env2;
      i = env3;
      t5 = env4;
      t28 = env5;
      t32 = env6;
      t33 = env7;
      bodyA = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      vB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      break;
    case 119:
      t3 = env0;
      wA0 = env1;
      t4 = env2;
      i = env3;
      t5 = env4;
      t28 = env5;
      t32 = env6;
      t33 = env7;
      bodyA = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      vB = env12;
      t35 = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      t9 = env17;
      t10 = env18;
      cp1 = env19;
      cp2 = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      break;
    case 120:
      t3 = env0;
      wA0 = env1;
      t4 = env2;
      i = env3;
      t5 = env4;
      t28 = env5;
      bodyA = env6;
      bodyB = env7;
      t35 = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      t32 = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      break;
    case 121:
      t3 = env0;
      wA0 = env1;
      t4 = env2;
      i = env3;
      t5 = env4;
      t28 = env5;
      bodyA = env6;
      bodyB = env7;
      t35 = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      t32 = env12;
      t37 = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      t9 = env17;
      t10 = env18;
      cp1 = env19;
      cp2 = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      break;
    case 122:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      b = env17;
      t10 = env18;
      cp1 = env19;
      t11 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      wA = env26;
      break;
    case 123:
      t3 = env0;
      t13 = env1;
      t4 = env2;
      i = env3;
      t5 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      t9 = env17;
      b = env18;
      t10 = env19;
      cp1 = env20;
      cp2 = env21;
      t11 = env22;
      a = env23;
      t1 = env24;
      wB = env25;
      t2 = env26;
      wA = env27;
      break;
    case 124:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      b = env17;
      t10 = env18;
      cp1 = env19;
      cp2 = env20;
      a = env21;
      t1 = env22;
      wB = env23;
      t2 = env24;
      t15 = env25;
      wA = env26;
      break;
    case 125:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      b = env17;
      t10 = env18;
      cp1 = env19;
      cp2 = env20;
      a = env21;
      t1 = env22;
      wB = env23;
      t2 = env24;
      t15 = env25;
      t17 = env26;
      wA = env27;
      break;
    case 126:
      t3 = env0;
      t15 = env1;
      t4 = env2;
      i = env3;
      t5 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      t9 = env17;
      b = env18;
      t10 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      t17 = env26;
      wA = env27;
      break;
    case 127:
      t11 = env0;
      t3 = env1;
      t4 = env2;
      i = env3;
      t5 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      t7 = env14;
      invIB = env15;
      t8 = env16;
      t9 = env17;
      b = env18;
      t10 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      wA = env26;
      vn2 = env27;
      break;
    case 128:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      cp2 = env16;
      t11 = env17;
      t1 = env18;
      wB = env19;
      t12 = env20;
      t2 = env21;
      wA = env22;
      break;
    case 129:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      cp2 = env16;
      t11 = env17;
      t1 = env18;
      wB = env19;
      t12 = env20;
      t2 = env21;
      t14 = env22;
      wA = env23;
      break;
    case 130:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      cp2 = env16;
      t1 = env17;
      wB = env18;
      t2 = env19;
      t14 = env20;
      t11 = env21;
      wA = env22;
      break;
    case 131:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      cp2 = env16;
      t1 = env17;
      wB = env18;
      t2 = env19;
      t14 = env20;
      t11 = env21;
      t16 = env22;
      wA = env23;
      break;
    case 132:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      cp2 = env16;
      t1 = env17;
      wB = env18;
      t2 = env19;
      t14 = env20;
      t18 = env21;
      wA = env22;
      t19 = env23;
      break;
    case 133:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      cp2 = env16;
      t1 = env17;
      wB = env18;
      t2 = env19;
      t14 = env20;
      t18 = env21;
      wA = env22;
      t19 = env23;
      t21 = env24;
      break;
    case 134:
      t21 = env0;
      t18 = env1;
      t3 = env2;
      t4 = env3;
      i = env4;
      t5 = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invIA = env11;
      invIB = env12;
      t7 = env13;
      t8 = env14;
      t9 = env15;
      t10 = env16;
      cp1 = env17;
      cp2 = env18;
      t1 = env19;
      wB = env20;
      t2 = env21;
      t14 = env22;
      wA = env23;
      break;
    case 135:
      t21 = env0;
      t18 = env1;
      t23 = env2;
      t4 = env3;
      t3 = env4;
      i = env5;
      t5 = env6;
      bodyA = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invIA = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      t14 = env23;
      wA = env24;
      break;
    case 136:
      t3 = env0;
      t10 = env1;
      t4 = env2;
      i = env3;
      cp1 = env4;
      cp2 = env5;
      wA0 = env6;
      t25 = env7;
      t5 = env8;
      t26 = env9;
      t1 = env10;
      wB = env11;
      bodyA = env12;
      bodyB = env13;
      t2 = env14;
      t6 = env15;
      vA = env16;
      vB = env17;
      invIB = env18;
      t7 = env19;
      t8 = env20;
      t9 = env21;
      break;
    case 137:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      wA0 = env4;
      t25 = env5;
      t26 = env6;
      t28 = env7;
      bodyA = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      vB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      break;
    case 138:
      t3 = env0;
      t10 = env1;
      t4 = env2;
      i = env3;
      cp1 = env4;
      cp2 = env5;
      wA0 = env6;
      t5 = env7;
      t1 = env8;
      wB = env9;
      bodyA = env10;
      bodyB = env11;
      t25 = env12;
      t6 = env13;
      vA = env14;
      vB = env15;
      t28 = env16;
      t2 = env17;
      invIB = env18;
      t7 = env19;
      t8 = env20;
      t9 = env21;
      break;
    case 139:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      wA0 = env4;
      bodyA = env5;
      bodyB = env6;
      t25 = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      t28 = env11;
      t30 = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      break;
    case 140:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      wA0 = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      t28 = env10;
      t32 = env11;
      invIB = env12;
      t33 = env13;
      t8 = env14;
      t7 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      break;
    case 141:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      wA0 = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      t28 = env10;
      t32 = env11;
      invIB = env12;
      t33 = env13;
      t35 = env14;
      t7 = env15;
      t9 = env16;
      t8 = env17;
      t10 = env18;
      cp1 = env19;
      cp2 = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      break;
    case 142:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      wA0 = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      t28 = env10;
      invIB = env11;
      t7 = env12;
      t8 = env13;
      t35 = env14;
      t32 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      break;
    case 143:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      wA0 = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      t28 = env10;
      invIB = env11;
      t7 = env12;
      t8 = env13;
      t35 = env14;
      t32 = env15;
      t37 = env16;
      t10 = env17;
      t9 = env18;
      cp1 = env19;
      cp2 = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      break;
    case 144:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      b = env17;
      t10 = env18;
      cp1 = env19;
      cp2 = env20;
      a = env21;
      t1 = env22;
      wB = env23;
      t2 = env24;
      t11 = env25;
      wA = env26;
      break;
    case 145:
      t3 = env0;
      t4 = env1;
      t13 = env2;
      i = env3;
      t5 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      t9 = env17;
      b = env18;
      t10 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      t11 = env26;
      wA = env27;
      break;
    case 146:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      c = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      invMassB = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      b = env17;
      t10 = env18;
      cp1 = env19;
      cp2 = env20;
      a = env21;
      t1 = env22;
      wB = env23;
      t2 = env24;
      wA = env25;
      t15 = env26;
      break;
    case 147:
      t17 = env0;
      t3 = env1;
      t4 = env2;
      i = env3;
      t5 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      t9 = env17;
      b = env18;
      t10 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      wA = env26;
      t15 = env27;
      break;
    case 148:
      t3 = env0;
      t17 = env1;
      t4 = env2;
      i = env3;
      t15 = env4;
      t5 = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      invIB = env15;
      t7 = env16;
      t8 = env17;
      t9 = env18;
      b = env19;
      t10 = env20;
      cp1 = env21;
      cp2 = env22;
      a = env23;
      t1 = env24;
      wB = env25;
      t2 = env26;
      wA = env27;
      break;
    case 149:
      t3 = env0;
      t4 = env1;
      i = env2;
      vn1 = env3;
      t11 = env4;
      t5 = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      invIB = env15;
      t7 = env16;
      t8 = env17;
      t9 = env18;
      b = env19;
      t10 = env20;
      cp1 = env21;
      cp2 = env22;
      a = env23;
      t1 = env24;
      wB = env25;
      t2 = env26;
      wA = env27;
      break;
    case 150:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      t7 = env10;
      invIB = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      cp2 = env16;
      t1 = env17;
      wB = env18;
      t2 = env19;
      t11 = env20;
      wA = env21;
      t12 = env22;
      break;
    case 151:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      cp2 = env16;
      t1 = env17;
      wB = env18;
      t2 = env19;
      t11 = env20;
      wA = env21;
      t12 = env22;
      t14 = env23;
      break;
    case 152:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      cp2 = env16;
      t1 = env17;
      wB = env18;
      t2 = env19;
      wA = env20;
      t14 = env21;
      t11 = env22;
      break;
    case 153:
      t16 = env0;
      t3 = env1;
      t4 = env2;
      i = env3;
      t5 = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invIA = env10;
      invIB = env11;
      t7 = env12;
      t8 = env13;
      t9 = env14;
      t10 = env15;
      cp1 = env16;
      cp2 = env17;
      t1 = env18;
      wB = env19;
      t2 = env20;
      wA = env21;
      t14 = env22;
      t11 = env23;
      break;
    case 154:
      t3 = env0;
      t4 = env1;
      t14 = env2;
      i = env3;
      t18 = env4;
      t19 = env5;
      t5 = env6;
      bodyA = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invIA = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      wA = env23;
      break;
    case 155:
      t3 = env0;
      t4 = env1;
      t14 = env2;
      i = env3;
      t18 = env4;
      t19 = env5;
      t21 = env6;
      t5 = env7;
      bodyA = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      vB = env12;
      invIA = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      t9 = env17;
      t10 = env18;
      cp1 = env19;
      cp2 = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      wA = env24;
      break;
    case 156:
      t3 = env0;
      t4 = env1;
      t14 = env2;
      i = env3;
      t21 = env4;
      t18 = env5;
      t5 = env6;
      bodyA = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invIA = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      wA = env23;
      break;
    case 157:
      t3 = env0;
      t4 = env1;
      t14 = env2;
      i = env3;
      t21 = env4;
      t18 = env5;
      t23 = env6;
      t5 = env7;
      bodyA = env8;
      bodyB = env9;
      t6 = env10;
      vA = env11;
      vB = env12;
      invIA = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      t9 = env17;
      t10 = env18;
      cp1 = env19;
      cp2 = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      wA = env24;
      break;
    case 158:
      t3 = env0;
      t10 = env1;
      t4 = env2;
      i = env3;
      cp1 = env4;
      cp2 = env5;
      t5 = env6;
      t1 = env7;
      wB = env8;
      bodyA = env9;
      bodyB = env10;
      t2 = env11;
      t6 = env12;
      vA = env13;
      wA0 = env14;
      vB = env15;
      t26 = env16;
      t25 = env17;
      invIB = env18;
      t7 = env19;
      t8 = env20;
      t9 = env21;
      break;
    case 159:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      wA0 = env8;
      vB = env9;
      t26 = env10;
      t25 = env11;
      invIB = env12;
      t7 = env13;
      t28 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      break;
    case 160:
      t3 = env0;
      t10 = env1;
      t4 = env2;
      i = env3;
      cp1 = env4;
      t7 = env5;
      cp2 = env6;
      t5 = env7;
      t1 = env8;
      wB = env9;
      bodyA = env10;
      bodyB = env11;
      t2 = env12;
      t6 = env13;
      vA = env14;
      wA0 = env15;
      vB = env16;
      invIB = env17;
      t28 = env18;
      t25 = env19;
      t8 = env20;
      t9 = env21;
      break;
    case 161:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      wA0 = env8;
      vB = env9;
      t7 = env10;
      invIB = env11;
      t8 = env12;
      t25 = env13;
      t28 = env14;
      t9 = env15;
      t10 = env16;
      t30 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      break;
    case 162:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      wA0 = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      t28 = env15;
      t32 = env16;
      t33 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      break;
    case 163:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      wA0 = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      t28 = env15;
      t32 = env16;
      t33 = env17;
      t35 = env18;
      cp1 = env19;
      cp2 = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      break;
    case 164:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      wA0 = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      t28 = env15;
      cp1 = env16;
      t35 = env17;
      t32 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      break;
    case 165:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      wA0 = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      t28 = env15;
      cp1 = env16;
      t35 = env17;
      t32 = env18;
      cp2 = env19;
      t37 = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      break;
    case 166:
      t3 = env0;
      t4 = env1;
      i = env2;
      vn1 = env3;
      t5 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invMassA = env11;
      invIA = env12;
      invMassB = env13;
      invIB = env14;
      t7 = env15;
      t8 = env16;
      b = env17;
      t9 = env18;
      t10 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      wA = env26;
      break;
    case 167:
      t3 = env0;
      t4 = env1;
      i = env2;
      vn1 = env3;
      vn2 = env4;
      t5 = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      invMassB = env14;
      invIB = env15;
      t7 = env16;
      t8 = env17;
      t9 = env18;
      t10 = env19;
      cp1 = env20;
      cp2 = env21;
      a = env22;
      t1 = env23;
      wB = env24;
      t2 = env25;
      wA = env26;
      break;
    case 168:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      cp2 = env16;
      t1 = env17;
      wB = env18;
      t2 = env19;
      t11 = env20;
      t12 = env21;
      wA = env22;
      break;
    case 169:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      cp2 = env16;
      t1 = env17;
      wB = env18;
      t2 = env19;
      t11 = env20;
      t12 = env21;
      t14 = env22;
      wA = env23;
      break;
    case 170:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      cp2 = env16;
      t1 = env17;
      wB = env18;
      t2 = env19;
      t14 = env20;
      t11 = env21;
      wA = env22;
      break;
    case 171:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      bodyA = env4;
      bodyB = env5;
      t6 = env6;
      vA = env7;
      vB = env8;
      invIA = env9;
      invIB = env10;
      t7 = env11;
      t8 = env12;
      t9 = env13;
      t10 = env14;
      cp1 = env15;
      cp2 = env16;
      t1 = env17;
      wB = env18;
      t2 = env19;
      t14 = env20;
      t11 = env21;
      t16 = env22;
      wA = env23;
      break;
    case 172:
      t19 = env0;
      t3 = env1;
      t4 = env2;
      i = env3;
      t5 = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invIA = env10;
      invIB = env11;
      t7 = env12;
      t8 = env13;
      t9 = env14;
      t10 = env15;
      cp1 = env16;
      cp2 = env17;
      t1 = env18;
      wB = env19;
      t2 = env20;
      wA = env21;
      t14 = env22;
      t18 = env23;
      break;
    case 173:
      t19 = env0;
      t21 = env1;
      t4 = env2;
      t3 = env3;
      i = env4;
      t5 = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invIA = env11;
      invIB = env12;
      t7 = env13;
      t8 = env14;
      t9 = env15;
      t10 = env16;
      cp1 = env17;
      cp2 = env18;
      t1 = env19;
      wB = env20;
      t2 = env21;
      wA = env22;
      t14 = env23;
      t18 = env24;
      break;
    case 174:
      t3 = env0;
      t4 = env1;
      t21 = env2;
      i = env3;
      t18 = env4;
      t5 = env5;
      bodyA = env6;
      bodyB = env7;
      t6 = env8;
      vA = env9;
      vB = env10;
      invIA = env11;
      invIB = env12;
      t7 = env13;
      t8 = env14;
      t9 = env15;
      t10 = env16;
      cp1 = env17;
      cp2 = env18;
      t1 = env19;
      wB = env20;
      t2 = env21;
      wA = env22;
      t14 = env23;
      break;
    case 175:
      t3 = env0;
      t4 = env1;
      t21 = env2;
      i = env3;
      t18 = env4;
      t23 = env5;
      t5 = env6;
      bodyA = env7;
      bodyB = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      invIA = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      wA = env23;
      t14 = env24;
      break;
    case 176:
      t3 = env0;
      t10 = env1;
      t4 = env2;
      i = env3;
      cp1 = env4;
      cp2 = env5;
      t5 = env6;
      t2 = env7;
      wA0 = env8;
      wB = env9;
      bodyA = env10;
      bodyB = env11;
      t25 = env12;
      t6 = env13;
      vA = env14;
      vB = env15;
      t26 = env16;
      t1 = env17;
      invIB = env18;
      t7 = env19;
      t8 = env20;
      t9 = env21;
      break;
    case 177:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      wA0 = env4;
      t25 = env5;
      bodyA = env6;
      bodyB = env7;
      t26 = env8;
      t6 = env9;
      vA = env10;
      vB = env11;
      t28 = env12;
      invIB = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      break;
    case 178:
      t3 = env0;
      t10 = env1;
      t4 = env2;
      i = env3;
      cp1 = env4;
      cp2 = env5;
      t5 = env6;
      wA0 = env7;
      wB = env8;
      bodyA = env9;
      bodyB = env10;
      t2 = env11;
      t6 = env12;
      vA = env13;
      vB = env14;
      t25 = env15;
      t28 = env16;
      t1 = env17;
      invIB = env18;
      t7 = env19;
      t8 = env20;
      t9 = env21;
      break;
    case 179:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      wA0 = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      t25 = env10;
      t28 = env11;
      invIB = env12;
      t7 = env13;
      t8 = env14;
      t30 = env15;
      t9 = env16;
      t10 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      break;
    case 180:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      wA0 = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invIB = env10;
      t28 = env11;
      t8 = env12;
      t32 = env13;
      t33 = env14;
      t9 = env15;
      t10 = env16;
      t7 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      break;
    case 181:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      wA0 = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invIB = env10;
      t28 = env11;
      t32 = env12;
      t7 = env13;
      t33 = env14;
      t35 = env15;
      t10 = env16;
      t9 = env17;
      t8 = env18;
      cp1 = env19;
      cp2 = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      break;
    case 182:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      wA0 = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invIB = env10;
      t28 = env11;
      t8 = env12;
      t7 = env13;
      t9 = env14;
      t10 = env15;
      t35 = env16;
      t32 = env17;
      cp1 = env18;
      cp2 = env19;
      t1 = env20;
      wB = env21;
      t2 = env22;
      break;
    case 183:
      t3 = env0;
      t4 = env1;
      i = env2;
      t5 = env3;
      wA0 = env4;
      bodyA = env5;
      bodyB = env6;
      t6 = env7;
      vA = env8;
      vB = env9;
      invIB = env10;
      t28 = env11;
      t8 = env12;
      t7 = env13;
      t9 = env14;
      t10 = env15;
      t35 = env16;
      t32 = env17;
      t37 = env18;
      cp1 = env19;
      cp2 = env20;
      t1 = env21;
      wB = env22;
      t2 = env23;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.tangent;
      var t2 = this.dv;
      var t3 = this.dv1;
      var t4 = this.dv2;
      var t5 = this.temp2;
      var t6 = this.x;
      var t7 = this.d;
      var t8 = this.P1;
      var t9 = this.P2;
      var t10 = this.temp1;
      var i = 0;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              var t11 = this.constraintCount;
            case 1:
              state = 0;
              if (!$.ltB(i, t11))
                break L0;
              t11 = this.constraints;
              if (i < 0 || i >= t11.length)
                throw $.ioore(i);
              var c = t11[i];
              var bodyA = c.get$bodyA();
              var bodyB = c.get$bodyB();
              var wA = bodyA.get$angularVelocity();
            case 2:
              state = 0;
              var wB = bodyB.get$angularVelocity();
            case 3:
              state = 0;
              var vA = bodyA.get$linearVelocity();
              var vB = bodyB.get$linearVelocity();
              var invMassA = bodyA.get$invMass();
            case 4:
              state = 0;
              var invIA = bodyA.get$invInertia();
            case 5:
              state = 0;
              var invMassB = bodyB.get$invMass();
            case 6:
              state = 0;
              var invIB = bodyB.get$invInertia();
            case 7:
              state = 0;
              var t17 = c.get$normal().get$y();
              if (typeof t17 !== 'number')
                throw $.iae(t17);
              t1.set$x(1.0 * t17);
              var t18 = c.get$normal().get$x();
              if (typeof t18 !== 'number')
                throw $.iae(t18);
              t1.set$y(-1.0 * t18);
              var friction = c.get$friction();
            case 8:
              state = 0;
              var j = 0;
            default:
              L1:
                while (true)
                  switch (state) {
                    case 0:
                      t11 = c.get$pointCount();
                    case 9:
                      state = 0;
                      if (!$.ltB(j, t11))
                        break L1;
                      t11 = c.get$points();
                    case 10:
                      state = 0;
                      var ccp = $.index(t11, j);
                      var a = ccp.get$rA();
                      t11 = $.neg(wB);
                      var t13 = ccp.get$rB().get$y();
                    case 11:
                      state = 0;
                      t13 = $.mul(t11, t13);
                      t11 = vB.get$x();
                    case 12:
                      state = 0;
                      t11 = $.add(t13, t11);
                      t13 = vA.get$x();
                    case 13:
                      state = 0;
                      t13 = $.sub(t11, t13);
                      t11 = a.get$y();
                    case 14:
                      state = 0;
                      t2.set$x($.add(t13, $.mul(wA, t11)));
                      t18 = ccp.get$rB().get$x();
                    case 15:
                      state = 0;
                      t18 = $.mul(wB, t18);
                      var t20 = vB.get$y();
                    case 16:
                      state = 0;
                      t20 = $.add(t18, t20);
                      t18 = vA.get$y();
                    case 17:
                      state = 0;
                      t18 = $.sub(t20, t18);
                      t20 = a.get$x();
                    case 18:
                      state = 0;
                      t2.set$y($.sub(t18, $.mul(wA, t20)));
                      var t24 = t2.get$x();
                    case 19:
                      state = 0;
                      var t26 = t1.get$x();
                    case 20:
                      state = 0;
                      t26 = $.mul(t24, t26);
                      t24 = t2.get$y();
                    case 21:
                      state = 0;
                      var t29 = t1.get$y();
                    case 22:
                      state = 0;
                      var vt = $.add(t26, $.mul(t24, t29));
                      t26 = ccp.get$tangentMass();
                    case 23:
                      state = 0;
                      var lambda = $.mul(t26, $.neg(vt));
                      t26 = ccp.get$normalImpulse();
                    case 24:
                      state = 0;
                      var maxFriction = $.mul(friction, t26);
                      t26 = ccp.get$tangentImpulse();
                    case 25:
                      state = 0;
                      t26 = $.add(t26, lambda);
                      var newImpulse = $.max($.neg(maxFriction), $.min(t26, maxFriction));
                      var t34 = ccp.get$tangentImpulse();
                      if (typeof t34 !== 'number')
                        throw $.iae(t34);
                      lambda = newImpulse - t34;
                      t34 = t1.get$x();
                    case 26:
                      state = 0;
                      var Px = $.mul(t34, lambda);
                      t34 = t1.get$y();
                    case 27:
                      state = 0;
                      var Py = $.mul(t34, lambda);
                      t34 = vA.get$x();
                    case 28:
                      state = 0;
                      vA.set$x($.sub(t34, $.mul(Px, invMassA)));
                      var t38 = vA.get$y();
                    case 29:
                      state = 0;
                      vA.set$y($.sub(t38, $.mul(Py, invMassA)));
                      var t40 = ccp.get$rA().get$x();
                    case 30:
                      state = 0;
                      t40 = $.mul(t40, Py);
                      var t42 = ccp.get$rA().get$y();
                    case 31:
                      state = 0;
                      wA = $.sub(wA, $.mul(invIA, $.sub(t40, $.mul(t42, Px))));
                      var t44 = vB.get$x();
                    case 32:
                      state = 0;
                      vB.set$x($.add(t44, $.mul(Px, invMassB)));
                      var t46 = vB.get$y();
                    case 33:
                      state = 0;
                      vB.set$y($.add(t46, $.mul(Py, invMassB)));
                      var t48 = ccp.get$rB().get$x();
                    case 34:
                      state = 0;
                      t48 = $.mul(t48, Py);
                      var t50 = ccp.get$rB().get$y();
                    case 35:
                      state = 0;
                      wB = $.add(wB, $.mul(invIB, $.sub(t48, $.mul(t50, Px))));
                      ccp.set$tangentImpulse(newImpulse);
                      ++j;
                  }
              t11 = c.get$pointCount();
            case 36:
              state = 0;
            case 37:
            case 38:
            case 39:
            case 40:
            case 41:
            case 42:
            case 43:
            case 44:
            case 45:
            case 46:
            case 47:
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
            case 58:
            case 59:
            case 60:
            case 61:
            case 62:
            case 63:
            case 64:
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
            case 91:
            case 92:
            case 93:
            case 94:
            case 95:
            case 96:
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
            case 123:
            case 124:
            case 125:
            case 126:
            case 127:
            case 128:
            case 129:
            case 130:
            case 131:
            case 132:
            case 133:
            case 134:
            case 135:
            case 136:
            case 137:
            case 138:
            case 139:
            case 140:
            case 141:
            case 142:
            case 143:
            case 144:
            case 145:
            case 146:
            case 147:
            case 148:
            case 149:
            case 150:
            case 151:
            case 152:
            case 153:
            case 154:
            case 155:
            case 156:
            case 157:
            case 158:
            case 159:
            case 160:
            case 161:
            case 162:
            case 163:
            case 164:
            case 165:
            case 166:
            case 167:
            case 168:
            case 169:
            case 170:
            case 171:
            case 172:
            case 173:
            case 174:
            case 175:
            case 176:
            case 177:
            case 178:
            case 179:
            case 180:
            case 181:
            case 182:
            case 183:
              if (state === 63 || state === 62 || state === 61 || state === 60 || state === 59 || state === 58 || state === 57 || state === 56 || state === 55 || state === 54 || state === 53 || state === 52 || state === 51 || state === 50 || state === 49 || state === 48 || state === 47 || state === 46 || state === 45 || state === 44 || state === 43 || state === 42 || state === 41 || state === 40 || state === 39 || state === 38 || state === 37 || state === 0 && $.eqB(t11, 1))
                switch (state) {
                  case 0:
                    t11 = c.get$points();
                  case 37:
                    state = 0;
                    ccp = $.index(t11, 0);
                    var a1 = ccp.get$rA();
                    t11 = $.neg(wB);
                    t13 = ccp.get$rB().get$y();
                  case 38:
                    state = 0;
                    t13 = $.mul(t11, t13);
                    t11 = vB.get$x();
                  case 39:
                    state = 0;
                    t11 = $.add(t13, t11);
                    t13 = vA.get$x();
                  case 40:
                    state = 0;
                    t13 = $.sub(t11, t13);
                    t11 = a1.get$y();
                  case 41:
                    state = 0;
                    t2.set$x($.add(t13, $.mul(wA, t11)));
                    t18 = ccp.get$rB().get$x();
                  case 42:
                    state = 0;
                    t18 = $.mul(wB, t18);
                    t20 = vB.get$y();
                  case 43:
                    state = 0;
                    t20 = $.add(t18, t20);
                    t18 = vA.get$y();
                  case 44:
                    state = 0;
                    t18 = $.sub(t20, t18);
                    t20 = a1.get$x();
                  case 45:
                    state = 0;
                    t2.set$y($.sub(t18, $.mul(wA, t20)));
                    var b = c.get$normal();
                    t24 = t2.get$x();
                  case 46:
                    state = 0;
                    t26 = b.get$x();
                  case 47:
                    state = 0;
                    t26 = $.mul(t24, t26);
                    t24 = t2.get$y();
                  case 48:
                    state = 0;
                    t29 = b.get$y();
                  case 49:
                    state = 0;
                    var vn = $.add(t26, $.mul(t24, t29));
                    t26 = ccp.get$normalMass();
                  case 50:
                    state = 0;
                    t26 = $.neg(t26);
                    var t32 = ccp.get$velocityBias();
                  case 51:
                    state = 0;
                    lambda = $.mul(t26, $.sub(vn, t32));
                    t26 = ccp.get$normalImpulse();
                  case 52:
                    state = 0;
                    a = $.add(t26, lambda);
                    newImpulse = $.gtB(a, 0.0) ? a : 0.0;
                    t11 = ccp.get$normalImpulse();
                  case 53:
                    state = 0;
                    lambda = $.sub(newImpulse, t11);
                    t11 = c.get$normal().get$x();
                  case 54:
                    state = 0;
                    Px = $.mul(t11, lambda);
                    t11 = c.get$normal().get$y();
                  case 55:
                    state = 0;
                    Py = $.mul(t11, lambda);
                    t11 = vA.get$x();
                  case 56:
                    state = 0;
                    vA.set$x($.sub(t11, $.mul(Px, invMassA)));
                    var t16 = vA.get$y();
                  case 57:
                    state = 0;
                    vA.set$y($.sub(t16, $.mul(Py, invMassA)));
                    t18 = ccp.get$rA().get$x();
                  case 58:
                    state = 0;
                    t18 = $.mul(t18, Py);
                    t20 = ccp.get$rA().get$y();
                  case 59:
                    state = 0;
                    wA = $.sub(wA, $.mul(invIA, $.sub(t18, $.mul(t20, Px))));
                    var t22 = vB.get$x();
                  case 60:
                    state = 0;
                    vB.set$x($.add(t22, $.mul(Px, invMassB)));
                    t24 = vB.get$y();
                  case 61:
                    state = 0;
                    vB.set$y($.add(t24, $.mul(Py, invMassB)));
                    t26 = ccp.get$rB().get$x();
                  case 62:
                    state = 0;
                    t26 = $.mul(t26, Py);
                    var t28 = ccp.get$rB().get$y();
                  case 63:
                    state = 0;
                    wB = $.add(wB, $.mul(invIB, $.sub(t26, $.mul(t28, Px))));
                    ccp.set$normalImpulse(newImpulse);
                }
              else
                switch (state) {
                  case 0:
                    t11 = c.get$points();
                  case 64:
                    state = 0;
                    var cp1 = $.index(t11, 0);
                    t11 = c.get$points();
                  case 65:
                    state = 0;
                    var cp2 = $.index(t11, 1);
                    a = $.Vector$(cp1.get$normalImpulse(), cp2.get$normalImpulse());
                    t11 = $.neg(wB);
                    var t14 = cp1.get$rB().get$y();
                  case 66:
                    state = 0;
                    t14 = $.mul(t11, t14);
                    t11 = vB.get$x();
                  case 67:
                    state = 0;
                    t11 = $.add(t14, t11);
                    t14 = vA.get$x();
                  case 68:
                    state = 0;
                    t14 = $.sub(t11, t14);
                    t11 = cp1.get$rA().get$y();
                  case 69:
                    state = 0;
                    t3.set$x($.add(t14, $.mul(wA, t11)));
                    var t19 = cp1.get$rB().get$x();
                  case 70:
                    state = 0;
                    t19 = $.mul(wB, t19);
                    var t21 = vB.get$y();
                  case 71:
                    state = 0;
                    t21 = $.add(t19, t21);
                    t19 = vA.get$y();
                  case 72:
                    state = 0;
                    t19 = $.sub(t21, t19);
                    t21 = cp1.get$rA().get$x();
                  case 73:
                    state = 0;
                    t3.set$y($.sub(t19, $.mul(wA, t21)));
                    var t25 = $.neg(wB);
                    t26 = cp2.get$rB().get$y();
                  case 74:
                    state = 0;
                    t26 = $.mul(t25, t26);
                    t25 = vB.get$x();
                  case 75:
                    state = 0;
                    t25 = $.add(t26, t25);
                    t26 = vA.get$x();
                  case 76:
                    state = 0;
                    t26 = $.sub(t25, t26);
                    t25 = cp2.get$rA().get$y();
                  case 77:
                    state = 0;
                    t4.set$x($.add(t26, $.mul(wA, t25)));
                    var t31 = cp2.get$rB().get$x();
                  case 78:
                    state = 0;
                    t31 = $.mul(wB, t31);
                    var t33 = vB.get$y();
                  case 79:
                    state = 0;
                    t33 = $.add(t31, t33);
                    t31 = vA.get$y();
                  case 80:
                    state = 0;
                    t31 = $.sub(t33, t31);
                    t33 = cp2.get$rA().get$x();
                  case 81:
                    state = 0;
                    t4.set$y($.sub(t31, $.mul(wA, t33)));
                    var t37 = t3.get$x();
                  case 82:
                    state = 0;
                    var t39 = c.get$normal().get$x();
                  case 83:
                    state = 0;
                    t39 = $.mul(t37, t39);
                    t37 = t3.get$y();
                  case 84:
                    state = 0;
                    t42 = c.get$normal().get$y();
                  case 85:
                    state = 0;
                    var vn1 = $.add(t39, $.mul(t37, t42));
                    t39 = t4.get$x();
                  case 86:
                    state = 0;
                    var t45 = c.get$normal().get$x();
                  case 87:
                    state = 0;
                    t45 = $.mul(t39, t45);
                    t39 = t4.get$y();
                  case 88:
                    state = 0;
                    t48 = c.get$normal().get$y();
                  case 89:
                    state = 0;
                    var vn2 = $.add(t45, $.mul(t39, t48));
                    t45 = cp1.get$velocityBias();
                  case 90:
                    state = 0;
                    t45 = $.sub(vn1, t45);
                    var t51 = cp2.get$velocityBias();
                  case 91:
                    state = 0;
                    b = $.Vector$(t45, $.sub(vn2, t51));
                    t45 = c.get$K().get$col1().get$x();
                  case 92:
                    state = 0;
                    var t54 = a.x;
                  case 93:
                    state = 0;
                    t54 = $.mul(t45, t54);
                    t45 = c.get$K().get$col2().get$x();
                  case 94:
                    state = 0;
                    var t57 = a.y;
                  case 95:
                    state = 0;
                    t5.set$x($.add(t54, $.mul(t45, t57)));
                    var t59 = c.get$K().get$col1().get$y();
                  case 96:
                    state = 0;
                    var t61 = a.x;
                  case 97:
                    state = 0;
                    t61 = $.mul(t59, t61);
                    t59 = c.get$K().get$col2().get$y();
                  case 98:
                    state = 0;
                    var t64 = a.y;
                  case 99:
                    state = 0;
                    t5.set$y($.add(t61, $.mul(t59, t64)));
                    var t66 = b.x;
                  case 100:
                    state = 0;
                    var t68 = t5.get$x();
                  case 101:
                    state = 0;
                    b.x = $.sub(t66, t68);
                    var t70 = b.y;
                  case 102:
                    state = 0;
                    var t72 = t5.get$y();
                  case 103:
                    state = 0;
                    b.y = $.sub(t70, t72);
                  default:
                    L2:
                      while (true)
                        switch (state) {
                          case 0:
                            if (!true)
                              break L2;
                            $.Matrix22_mulMatrixAndVectorToOut(c.get$normalMass(), b, t6);
                            t6.mulLocal$1(-1);
                            t11 = t6.get$x();
                          case 104:
                            state = 0;
                          case 105:
                            if (state === 105 || state === 0 && $.geB(t11, 0.0))
                              switch (state) {
                                case 0:
                                  t11 = t6.get$y();
                                case 105:
                                  state = 0;
                                  t11 = $.geB(t11, 0.0);
                              }
                            else
                              t11 = false;
                          default:
                            if (state === 121 || state === 120 || state === 119 || state === 118 || state === 117 || state === 116 || state === 115 || state === 114 || state === 113 || state === 112 || state === 111 || state === 110 || state === 109 || state === 108 || state === 107 || state === 106 || state === 0 && t11)
                              switch (state) {
                                case 0:
                                  t7.setFrom$1(t6).subLocal$1(a);
                                  t8.setFrom$1(c.get$normal()).mulLocal$1(t7.get$x());
                                  t9.setFrom$1(c.get$normal()).mulLocal$1(t7.get$y());
                                  t10.setFrom$1(t8).addLocal$1(t9);
                                  t5.setFrom$1(t10).mulLocal$1(invMassA);
                                  vA.subLocal$1(t5);
                                  t5.setFrom$1(t10).mulLocal$1(invMassB);
                                  vB.addLocal$1(t5);
                                  t11 = cp1.get$rA();
                                  var t12 = t11.get$x();
                                case 106:
                                  state = 0;
                                  t14 = t8.get$y();
                                case 107:
                                  state = 0;
                                  t14 = $.mul(t12, t14);
                                  t11 = t11.get$y();
                                case 108:
                                  state = 0;
                                  t16 = t8.get$x();
                                case 109:
                                  state = 0;
                                  t14 = $.sub(t14, $.mul(t11, t16));
                                  t18 = cp2.get$rA();
                                  t19 = t18.get$x();
                                case 110:
                                  state = 0;
                                  t21 = t9.get$y();
                                case 111:
                                  state = 0;
                                  t21 = $.mul(t19, t21);
                                  t18 = t18.get$y();
                                case 112:
                                  state = 0;
                                  var t23 = t9.get$x();
                                case 113:
                                  state = 0;
                                  var wA0 = $.sub(wA, $.mul(invIA, $.add(t14, $.sub(t21, $.mul(t18, t23)))));
                                  t25 = cp1.get$rB();
                                  t26 = t25.get$x();
                                case 114:
                                  state = 0;
                                  t28 = t8.get$y();
                                case 115:
                                  state = 0;
                                  t28 = $.mul(t26, t28);
                                  t25 = t25.get$y();
                                case 116:
                                  state = 0;
                                  var t30 = t8.get$x();
                                case 117:
                                  state = 0;
                                  t28 = $.sub(t28, $.mul(t25, t30));
                                  t32 = cp2.get$rB();
                                  t33 = t32.get$x();
                                case 118:
                                  state = 0;
                                  var t35 = t9.get$y();
                                case 119:
                                  state = 0;
                                  t35 = $.mul(t33, t35);
                                  t32 = t32.get$y();
                                case 120:
                                  state = 0;
                                  t37 = t9.get$x();
                                case 121:
                                  state = 0;
                                  var wB0 = $.add(wB, $.mul(invIB, $.add(t28, $.sub(t35, $.mul(t32, t37)))));
                                  cp1.set$normalImpulse(t6.get$x());
                                  cp2.set$normalImpulse(t6.get$y());
                                  wA = wA0;
                                  wB = wB0;
                                  break L2;
                              }
                            t11 = cp1.get$normalMass();
                          case 122:
                            state = 0;
                            t11 = $.neg(t11);
                            t13 = b.x;
                          case 123:
                            state = 0;
                            t6.set$x($.mul(t11, t13));
                            t6.set$y(0.0);
                            var t15 = c.get$K().get$col1().get$y();
                          case 124:
                            state = 0;
                            t17 = t6.get$x();
                          case 125:
                            state = 0;
                            t17 = $.mul(t15, t17);
                            t15 = b.y;
                          case 126:
                            state = 0;
                            vn2 = $.add(t17, t15);
                            t11 = t6.get$x();
                          case 127:
                            state = 0;
                          case 128:
                          case 129:
                          case 130:
                          case 131:
                          case 132:
                          case 133:
                          case 134:
                          case 135:
                          case 136:
                          case 137:
                          case 138:
                          case 139:
                          case 140:
                          case 141:
                          case 142:
                          case 143:
                            if (state === 143 || state === 142 || state === 141 || state === 140 || state === 139 || state === 138 || state === 137 || state === 136 || state === 135 || state === 134 || state === 133 || state === 132 || state === 131 || state === 130 || state === 129 || state === 128 || state === 0 && $.geB(t11, 0.0) && $.geB(vn2, 0.0))
                              switch (state) {
                                case 0:
                                  t7.setFrom$1(t6).subLocal$1(a);
                                  t8.setFrom$1(c.get$normal()).mulLocal$1(t7.get$x());
                                  t9.setFrom$1(c.get$normal()).mulLocal$1(t7.get$y());
                                  t10.setFrom$1(t8).addLocal$1(t9);
                                  t5.setFrom$1(t10).mulLocal$1(invMassA);
                                  vA.subLocal$1(t5);
                                  t5.setFrom$1(t10).mulLocal$1(invMassB);
                                  vB.addLocal$1(t5);
                                  t11 = cp1.get$rA();
                                  t12 = t11.get$x();
                                case 128:
                                  state = 0;
                                  t14 = t8.get$y();
                                case 129:
                                  state = 0;
                                  t14 = $.mul(t12, t14);
                                  t11 = t11.get$y();
                                case 130:
                                  state = 0;
                                  t16 = t8.get$x();
                                case 131:
                                  state = 0;
                                  t14 = $.sub(t14, $.mul(t11, t16));
                                  t18 = cp2.get$rA();
                                  t19 = t18.get$x();
                                case 132:
                                  state = 0;
                                  t21 = t9.get$y();
                                case 133:
                                  state = 0;
                                  t21 = $.mul(t19, t21);
                                  t18 = t18.get$y();
                                case 134:
                                  state = 0;
                                  t23 = t9.get$x();
                                case 135:
                                  state = 0;
                                  wA0 = $.sub(wA, $.mul(invIA, $.add(t14, $.sub(t21, $.mul(t18, t23)))));
                                  t25 = cp1.get$rB();
                                  t26 = t25.get$x();
                                case 136:
                                  state = 0;
                                  t28 = t8.get$y();
                                case 137:
                                  state = 0;
                                  t28 = $.mul(t26, t28);
                                  t25 = t25.get$y();
                                case 138:
                                  state = 0;
                                  t30 = t8.get$x();
                                case 139:
                                  state = 0;
                                  t28 = $.sub(t28, $.mul(t25, t30));
                                  t32 = cp2.get$rB();
                                  t33 = t32.get$x();
                                case 140:
                                  state = 0;
                                  t35 = t9.get$y();
                                case 141:
                                  state = 0;
                                  t35 = $.mul(t33, t35);
                                  t32 = t32.get$y();
                                case 142:
                                  state = 0;
                                  t37 = t9.get$x();
                                case 143:
                                  state = 0;
                                  wB0 = $.add(wB, $.mul(invIB, $.add(t28, $.sub(t35, $.mul(t32, t37)))));
                                  cp1.set$normalImpulse(t6.get$x());
                                  cp2.set$normalImpulse(t6.get$y());
                                  wA = wA0;
                                  wB = wB0;
                                  break L2;
                              }
                            t6.set$x(0.0);
                            t11 = cp2.get$normalMass();
                          case 144:
                            state = 0;
                            t11 = $.neg(t11);
                            t13 = b.y;
                          case 145:
                            state = 0;
                            t6.set$y($.mul(t11, t13));
                            t15 = c.get$K().get$col2().get$x();
                          case 146:
                            state = 0;
                            t17 = t6.get$y();
                          case 147:
                            state = 0;
                            t17 = $.mul(t15, t17);
                            t15 = b.x;
                          case 148:
                            state = 0;
                            vn1 = $.add(t17, t15);
                            t11 = t6.get$y();
                          case 149:
                            state = 0;
                          case 150:
                          case 151:
                          case 152:
                          case 153:
                          case 154:
                          case 155:
                          case 156:
                          case 157:
                          case 158:
                          case 159:
                          case 160:
                          case 161:
                          case 162:
                          case 163:
                          case 164:
                          case 165:
                            if (state === 165 || state === 164 || state === 163 || state === 162 || state === 161 || state === 160 || state === 159 || state === 158 || state === 157 || state === 156 || state === 155 || state === 154 || state === 153 || state === 152 || state === 151 || state === 150 || state === 0 && $.geB(t11, 0.0) && $.geB(vn1, 0.0))
                              switch (state) {
                                case 0:
                                  t7.setFrom$1(t6).subLocal$1(a);
                                  t8.setFrom$1(c.get$normal()).mulLocal$1(t7.get$x());
                                  t9.setFrom$1(c.get$normal()).mulLocal$1(t7.get$y());
                                  t10.setFrom$1(t8).addLocal$1(t9);
                                  t5.setFrom$1(t10).mulLocal$1(invMassA);
                                  vA.subLocal$1(t5);
                                  t5.setFrom$1(t10).mulLocal$1(invMassB);
                                  vB.addLocal$1(t5);
                                  t11 = cp1.get$rA();
                                  t12 = t11.get$x();
                                case 150:
                                  state = 0;
                                  t14 = t8.get$y();
                                case 151:
                                  state = 0;
                                  t14 = $.mul(t12, t14);
                                  t11 = t11.get$y();
                                case 152:
                                  state = 0;
                                  t16 = t8.get$x();
                                case 153:
                                  state = 0;
                                  t14 = $.sub(t14, $.mul(t11, t16));
                                  t18 = cp2.get$rA();
                                  t19 = t18.get$x();
                                case 154:
                                  state = 0;
                                  t21 = t9.get$y();
                                case 155:
                                  state = 0;
                                  t21 = $.mul(t19, t21);
                                  t18 = t18.get$y();
                                case 156:
                                  state = 0;
                                  t23 = t9.get$x();
                                case 157:
                                  state = 0;
                                  wA0 = $.sub(wA, $.mul(invIA, $.add(t14, $.sub(t21, $.mul(t18, t23)))));
                                  t25 = cp1.get$rB();
                                  t26 = t25.get$x();
                                case 158:
                                  state = 0;
                                  t28 = t8.get$y();
                                case 159:
                                  state = 0;
                                  t28 = $.mul(t26, t28);
                                  t25 = t25.get$y();
                                case 160:
                                  state = 0;
                                  t30 = t8.get$x();
                                case 161:
                                  state = 0;
                                  t28 = $.sub(t28, $.mul(t25, t30));
                                  t32 = cp2.get$rB();
                                  t33 = t32.get$x();
                                case 162:
                                  state = 0;
                                  t35 = t9.get$y();
                                case 163:
                                  state = 0;
                                  t35 = $.mul(t33, t35);
                                  t32 = t32.get$y();
                                case 164:
                                  state = 0;
                                  t37 = t9.get$x();
                                case 165:
                                  state = 0;
                                  wB0 = $.add(wB, $.mul(invIB, $.add(t28, $.sub(t35, $.mul(t32, t37)))));
                                  cp1.set$normalImpulse(t6.get$x());
                                  cp2.set$normalImpulse(t6.get$y());
                                  wA = wA0;
                                  wB = wB0;
                                  break L2;
                              }
                            t6.set$x(0.0);
                            t6.set$y(0.0);
                            vn1 = b.x;
                          case 166:
                            state = 0;
                            vn2 = b.y;
                          case 167:
                            state = 0;
                          case 168:
                          case 169:
                          case 170:
                          case 171:
                          case 172:
                          case 173:
                          case 174:
                          case 175:
                          case 176:
                          case 177:
                          case 178:
                          case 179:
                          case 180:
                          case 181:
                          case 182:
                          case 183:
                            if (state === 183 || state === 182 || state === 181 || state === 180 || state === 179 || state === 178 || state === 177 || state === 176 || state === 175 || state === 174 || state === 173 || state === 172 || state === 171 || state === 170 || state === 169 || state === 168 || state === 0 && $.geB(vn1, 0.0) && $.geB(vn2, 0.0))
                              switch (state) {
                                case 0:
                                  t7.setFrom$1(t6).subLocal$1(a);
                                  t8.setFrom$1(c.get$normal()).mulLocal$1(t7.get$x());
                                  t9.setFrom$1(c.get$normal()).mulLocal$1(t7.get$y());
                                  t10.setFrom$1(t8).addLocal$1(t9);
                                  t5.setFrom$1(t10).mulLocal$1(invMassA);
                                  vA.subLocal$1(t5);
                                  t5.setFrom$1(t10).mulLocal$1(invMassB);
                                  vB.addLocal$1(t5);
                                  t11 = cp1.get$rA();
                                  t12 = t11.get$x();
                                case 168:
                                  state = 0;
                                  t14 = t8.get$y();
                                case 169:
                                  state = 0;
                                  t14 = $.mul(t12, t14);
                                  t11 = t11.get$y();
                                case 170:
                                  state = 0;
                                  t16 = t8.get$x();
                                case 171:
                                  state = 0;
                                  t14 = $.sub(t14, $.mul(t11, t16));
                                  t18 = cp2.get$rA();
                                  t19 = t18.get$x();
                                case 172:
                                  state = 0;
                                  t21 = t9.get$y();
                                case 173:
                                  state = 0;
                                  t21 = $.mul(t19, t21);
                                  t18 = t18.get$y();
                                case 174:
                                  state = 0;
                                  t23 = t9.get$x();
                                case 175:
                                  state = 0;
                                  wA0 = $.sub(wA, $.mul(invIA, $.add(t14, $.sub(t21, $.mul(t18, t23)))));
                                  t25 = cp1.get$rB();
                                  t26 = t25.get$x();
                                case 176:
                                  state = 0;
                                  t28 = t8.get$y();
                                case 177:
                                  state = 0;
                                  t28 = $.mul(t26, t28);
                                  t25 = t25.get$y();
                                case 178:
                                  state = 0;
                                  t30 = t8.get$x();
                                case 179:
                                  state = 0;
                                  t28 = $.sub(t28, $.mul(t25, t30));
                                  t32 = cp2.get$rB();
                                  t33 = t32.get$x();
                                case 180:
                                  state = 0;
                                  t35 = t9.get$y();
                                case 181:
                                  state = 0;
                                  t35 = $.mul(t33, t35);
                                  t32 = t32.get$y();
                                case 182:
                                  state = 0;
                                  t37 = t9.get$x();
                                case 183:
                                  state = 0;
                                  wB0 = $.add(wB, $.mul(invIB, $.add(t28, $.sub(t35, $.mul(t32, t37)))));
                                  cp1.set$normalImpulse(t6.get$x());
                                  cp2.set$normalImpulse(t6.get$y());
                                  wA = wA0;
                                  wB = wB0;
                                  break L2;
                              }
                            break L2;
                        }
                }
              bodyA.get$linearVelocity().setFrom$1(vA);
              bodyA.set$angularVelocity(wA);
              bodyB.get$linearVelocity().setFrom$1(vB);
              bodyB.set$angularVelocity(wB);
              ++i;
          }
  }
},
 storeImpulses$0: function() {
  for (var i = 0; $.ltB(i, this.constraintCount); ++i) {
    var t1 = this.constraints;
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    var c = t1[i];
    var m = c.get$manifold();
    for (var j = 0; $.ltB(j, c.get$pointCount()); ++j) {
      t1 = $.index(c.get$points(), j).get$normalImpulse();
      $.index(m.get$points(), j).set$normalImpulse(t1);
      t1 = $.index(c.get$points(), j).get$tangentImpulse();
      $.index(m.get$points(), j).set$tangentImpulse(t1);
    }
  }
},
 solvePositionConstraints$1: function(baumgarte) {
  var psm = this.psolver;
  var t1 = this.rA;
  var t2 = this.rB;
  var t3 = this.P;
  var t4 = this.temp1;
  var normal = psm.normal;
  var point = psm.point;
  var i = 0;
  var minSeparation = 0.0;
  while (true) {
    var t5 = this.constraintCount;
    if (typeof t5 !== 'number')
      return this.solvePositionConstraints$1$bailout(1, baumgarte, t5, psm, i, t2, minSeparation, t1, t3, t4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    if (!(i < t5))
      break;
    t5 = this.constraints;
    if (i < 0 || i >= t5.length)
      throw $.ioore(i);
    var c = t5[i];
    var bodyA = c.get$bodyA();
    var bodyB = c.get$bodyB();
    t5 = bodyA.get$mass();
    if (typeof t5 !== 'number')
      return this.solvePositionConstraints$1$bailout(2, baumgarte, psm, i, t2, minSeparation, t1, t3, t4, c, bodyA, bodyB, t5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var t7 = bodyA.get$invMass();
    if (typeof t7 !== 'number')
      return this.solvePositionConstraints$1$bailout(3, baumgarte, psm, i, t2, minSeparation, t1, t3, t4, c, bodyA, bodyB, t5, t7, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var invMassA = t5 * t7;
    t7 = bodyA.get$mass();
    if (typeof t7 !== 'number')
      return this.solvePositionConstraints$1$bailout(4, baumgarte, psm, i, t2, minSeparation, t1, t3, t4, c, bodyA, bodyB, invMassA, t7, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var t9 = bodyA.get$invInertia();
    if (typeof t9 !== 'number')
      return this.solvePositionConstraints$1$bailout(5, baumgarte, psm, i, t2, minSeparation, t1, t3, t4, c, bodyA, bodyB, invMassA, t7, t9, 0, 0, 0, 0, 0, 0, 0, 0);
    var invIA = t7 * t9;
    t9 = bodyB.get$mass();
    if (typeof t9 !== 'number')
      return this.solvePositionConstraints$1$bailout(6, baumgarte, t9, psm, i, t2, minSeparation, t1, t3, t4, c, bodyA, bodyB, invMassA, invIA, 0, 0, 0, 0, 0, 0, 0, 0);
    var t11 = bodyB.get$invMass();
    if (typeof t11 !== 'number')
      return this.solvePositionConstraints$1$bailout(7, baumgarte, t9, t11, psm, i, t2, minSeparation, t1, t3, t4, c, bodyA, bodyB, invMassA, invIA, 0, 0, 0, 0, 0, 0, 0);
    var invMassB = t9 * t11;
    t11 = bodyB.get$mass();
    if (typeof t11 !== 'number')
      return this.solvePositionConstraints$1$bailout(8, baumgarte, invMassB, t11, psm, i, t2, minSeparation, t1, t3, t4, c, bodyA, bodyB, invMassA, invIA, 0, 0, 0, 0, 0, 0, 0);
    var t13 = bodyB.get$invInertia();
    if (typeof t13 !== 'number')
      return this.solvePositionConstraints$1$bailout(9, baumgarte, invMassB, t11, t13, psm, i, t2, minSeparation, t1, t3, t4, c, bodyA, bodyB, invMassA, invIA, 0, 0, 0, 0, 0, 0);
    var invIB = t11 * t13;
    t5 = invMassA + invMassB;
    var j = 0;
    while (true) {
      var t6 = c.get$pointCount();
      if (typeof t6 !== 'number')
        return this.solvePositionConstraints$1$bailout(10, baumgarte, invMassB, psm, i, invIB, t2, t1, j, t3, t4, minSeparation, c, bodyA, bodyB, t6, invMassA, invIA, 0, 0, 0, 0, 0);
      if (!(j < t6))
        break;
      psm.initialize$2(c, j);
      var separation = psm.separation;
      if (typeof separation !== 'number')
        return this.solvePositionConstraints$1$bailout(11, baumgarte, separation, invIA, invMassB, point, invIB, t2, psm, t1, j, t3, t4, minSeparation, i, c, bodyA, bodyB, invMassA, normal, 0, 0, 0);
      t1.setFrom$1(point).subLocal$1(bodyA.get$sweep().get$center());
      t2.setFrom$1(point).subLocal$1(bodyB.get$sweep().get$center());
      minSeparation = $.min(minSeparation, separation);
      var C = $.max(-0.2, $.min(baumgarte * (separation + 0.005), 0.0));
      t7 = t1.x;
      if (typeof t7 !== 'number')
        return this.solvePositionConstraints$1$bailout(12, normal, baumgarte, invMassB, psm, invIB, t2, t1, j, t3, minSeparation, t4, i, c, bodyA, bodyB, invMassA, C, t7, invIA, 0, 0, 0);
      t9 = normal.get$y();
      if (typeof t9 !== 'number')
        return this.solvePositionConstraints$1$bailout(13, normal, baumgarte, invMassB, psm, invIB, t2, t1, j, t3, minSeparation, t4, i, c, bodyA, bodyB, invMassA, C, t7, t9, invIA, 0, 0);
      t9 = t7 * t9;
      t7 = t1.y;
      if (typeof t7 !== 'number')
        return this.solvePositionConstraints$1$bailout(14, t9, t7, invIA, invMassB, baumgarte, invIB, t2, psm, t1, j, t3, minSeparation, t4, i, c, bodyA, bodyB, invMassA, C, normal, 0, 0);
      var t12 = normal.get$x();
      if (typeof t12 !== 'number')
        return this.solvePositionConstraints$1$bailout(15, t9, t7, t12, invMassB, invIA, baumgarte, invIB, t2, psm, t1, j, t3, minSeparation, t4, i, c, bodyA, bodyB, invMassA, C, normal, 0);
      var rnA = t9 - t7 * t12;
      t9 = t2.x;
      if (typeof t9 !== 'number')
        return this.solvePositionConstraints$1$bailout(16, invIA, baumgarte, invMassB, rnA, invIB, t2, t9, t1, j, t3, minSeparation, t4, psm, i, c, bodyA, bodyB, invMassA, C, normal, 0, 0);
      var t15 = normal.get$y();
      if (typeof t15 !== 'number')
        return this.solvePositionConstraints$1$bailout(17, normal, baumgarte, invMassB, rnA, invIB, t2, t9, t1, j, t3, minSeparation, t4, t15, psm, i, c, bodyA, bodyB, invMassA, C, invIA, 0);
      t15 = t9 * t15;
      t9 = t2.y;
      if (typeof t9 !== 'number')
        return this.solvePositionConstraints$1$bailout(18, normal, baumgarte, invMassB, rnA, invIB, t2, psm, t1, j, t9, t3, minSeparation, t4, t15, i, c, bodyA, bodyB, invMassA, C, invIA, 0);
      var t18 = normal.get$x();
      if (typeof t18 !== 'number')
        return this.solvePositionConstraints$1$bailout(19, normal, baumgarte, invMassB, rnA, invIB, t2, psm, t1, j, t9, t3, minSeparation, t4, t15, t18, i, c, bodyA, bodyB, invMassA, C, invIA);
      var rnB = t15 - t9 * t18;
      var K = t5 + invIA * rnA * rnA + invIB * rnB * rnB;
      var impulse = K > 0.0 ? -C / K : 0.0;
      t3.setFrom$1(normal).mulLocal$1(impulse);
      t4.setFrom$1(t3).mulLocal$1(invMassA);
      bodyA.get$sweep().get$center().subLocal$1(t4);
      t6 = bodyA.get$sweep();
      t7 = t6.get$angle();
      if (typeof t7 !== 'number')
        return this.solvePositionConstraints$1$bailout(20, baumgarte, invMassB, psm, t1, t2, invIB, j, t3, minSeparation, t4, i, c, bodyA, bodyB, t7, t6, invMassA, invIA, 0, 0, 0, 0);
      t9 = t1.x;
      if (typeof t9 !== 'number')
        return this.solvePositionConstraints$1$bailout(21, baumgarte, invMassB, psm, t1, t2, invIB, j, t3, minSeparation, t4, i, c, bodyA, bodyB, t7, t6, t9, invMassA, invIA, 0, 0, 0);
      t11 = t3.y;
      if (typeof t11 !== 'number')
        return this.solvePositionConstraints$1$bailout(22, baumgarte, invMassB, psm, t1, t2, invIB, j, t3, minSeparation, t4, i, c, bodyA, bodyB, t7, t6, t9, t11, invMassA, invIA, 0, 0);
      t11 = t9 * t11;
      t9 = t1.y;
      if (typeof t9 !== 'number')
        return this.solvePositionConstraints$1$bailout(23, invIA, baumgarte, invMassB, psm, invIB, t2, t1, j, t3, minSeparation, t4, i, c, bodyA, bodyB, t7, t6, invMassA, t11, t9, 0, 0);
      var t14 = t3.x;
      if (typeof t14 !== 'number')
        return this.solvePositionConstraints$1$bailout(24, t14, baumgarte, invIA, invMassB, psm, invIB, t2, t1, j, t3, minSeparation, t4, i, c, bodyA, bodyB, t7, t6, invMassA, t11, t9, 0);
      t6.set$angle(t7 - invIA * (t11 - t9 * t14));
      bodyA.synchronizeTransform$0();
      t4.setFrom$1(t3).mulLocal$1(invMassB);
      bodyB.get$sweep().get$center().addLocal$1(t4);
      t6 = bodyB.get$sweep();
      var t16 = t6.get$angle();
      if (typeof t16 !== 'number')
        return this.solvePositionConstraints$1$bailout(25, baumgarte, invMassB, psm, invIB, t2, t1, j, t3, minSeparation, t4, i, t6, t16, c, bodyA, bodyB, invMassA, invIA, 0, 0, 0, 0);
      t18 = t2.x;
      if (typeof t18 !== 'number')
        return this.solvePositionConstraints$1$bailout(26, baumgarte, invMassB, psm, invIB, t2, t1, j, t3, minSeparation, t4, i, t6, t16, c, bodyA, bodyB, t18, invMassA, invIA, 0, 0, 0);
      var t20 = t3.y;
      if (typeof t20 !== 'number')
        return this.solvePositionConstraints$1$bailout(27, baumgarte, invMassB, psm, invIB, t2, t1, j, t3, minSeparation, t4, i, t6, t16, c, bodyA, bodyB, t20, t18, invMassA, invIA, 0, 0);
      t20 = t18 * t20;
      t18 = t2.y;
      if (typeof t18 !== 'number')
        return this.solvePositionConstraints$1$bailout(28, baumgarte, invMassB, psm, invIB, t2, t1, j, t3, minSeparation, t4, i, t6, t16, c, bodyA, bodyB, t20, t18, invMassA, invIA, 0, 0);
      var t23 = t3.x;
      if (typeof t23 !== 'number')
        return this.solvePositionConstraints$1$bailout(29, baumgarte, invMassB, psm, invIB, t2, t1, j, t3, minSeparation, t4, i, t6, t16, c, bodyA, bodyB, t20, t18, t23, invMassA, invIA, 0);
      t6.set$angle(t16 + invIB * (t20 - t18 * t23));
      bodyB.synchronizeTransform$0();
      ++j;
    }
    ++i;
  }
  return minSeparation >= -0.0075;
},
 solvePositionConstraints$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13, env14, env15, env16, env17, env18, env19, env20, env21) {
  switch (state) {
    case 1:
      var baumgarte = env0;
      t5 = env1;
      psm = env2;
      i = env3;
      t2 = env4;
      minSeparation = env5;
      t1 = env6;
      t3 = env7;
      t4 = env8;
      break;
    case 2:
      baumgarte = env0;
      psm = env1;
      i = env2;
      t2 = env3;
      minSeparation = env4;
      t1 = env5;
      t3 = env6;
      t4 = env7;
      c = env8;
      bodyA = env9;
      bodyB = env10;
      t5 = env11;
      break;
    case 3:
      baumgarte = env0;
      psm = env1;
      i = env2;
      t2 = env3;
      minSeparation = env4;
      t1 = env5;
      t3 = env6;
      t4 = env7;
      c = env8;
      bodyA = env9;
      bodyB = env10;
      t5 = env11;
      t7 = env12;
      break;
    case 4:
      baumgarte = env0;
      psm = env1;
      i = env2;
      t2 = env3;
      minSeparation = env4;
      t1 = env5;
      t3 = env6;
      t4 = env7;
      c = env8;
      bodyA = env9;
      bodyB = env10;
      invMassA = env11;
      t7 = env12;
      break;
    case 5:
      baumgarte = env0;
      psm = env1;
      i = env2;
      t2 = env3;
      minSeparation = env4;
      t1 = env5;
      t3 = env6;
      t4 = env7;
      c = env8;
      bodyA = env9;
      bodyB = env10;
      invMassA = env11;
      t7 = env12;
      t9 = env13;
      break;
    case 6:
      baumgarte = env0;
      t9 = env1;
      psm = env2;
      i = env3;
      t2 = env4;
      minSeparation = env5;
      t1 = env6;
      t3 = env7;
      t4 = env8;
      c = env9;
      bodyA = env10;
      bodyB = env11;
      invMassA = env12;
      invIA = env13;
      break;
    case 7:
      baumgarte = env0;
      t9 = env1;
      t11 = env2;
      psm = env3;
      i = env4;
      t2 = env5;
      minSeparation = env6;
      t1 = env7;
      t3 = env8;
      t4 = env9;
      c = env10;
      bodyA = env11;
      bodyB = env12;
      invMassA = env13;
      invIA = env14;
      break;
    case 8:
      baumgarte = env0;
      invMassB = env1;
      t11 = env2;
      psm = env3;
      i = env4;
      t2 = env5;
      minSeparation = env6;
      t1 = env7;
      t3 = env8;
      t4 = env9;
      c = env10;
      bodyA = env11;
      bodyB = env12;
      invMassA = env13;
      invIA = env14;
      break;
    case 9:
      baumgarte = env0;
      invMassB = env1;
      t11 = env2;
      t13 = env3;
      psm = env4;
      i = env5;
      t2 = env6;
      minSeparation = env7;
      t1 = env8;
      t3 = env9;
      t4 = env10;
      c = env11;
      bodyA = env12;
      bodyB = env13;
      invMassA = env14;
      invIA = env15;
      break;
    case 10:
      baumgarte = env0;
      invMassB = env1;
      psm = env2;
      i = env3;
      invIB = env4;
      t2 = env5;
      t1 = env6;
      j = env7;
      t3 = env8;
      t4 = env9;
      minSeparation = env10;
      c = env11;
      bodyA = env12;
      bodyB = env13;
      t5 = env14;
      invMassA = env15;
      invIA = env16;
      break;
    case 11:
      baumgarte = env0;
      separation = env1;
      invIA = env2;
      invMassB = env3;
      point = env4;
      invIB = env5;
      t2 = env6;
      psm = env7;
      t1 = env8;
      j = env9;
      t3 = env10;
      t4 = env11;
      minSeparation = env12;
      i = env13;
      c = env14;
      bodyA = env15;
      bodyB = env16;
      invMassA = env17;
      normal = env18;
      break;
    case 12:
      normal = env0;
      baumgarte = env1;
      invMassB = env2;
      psm = env3;
      invIB = env4;
      t2 = env5;
      t1 = env6;
      j = env7;
      t3 = env8;
      minSeparation = env9;
      t4 = env10;
      i = env11;
      c = env12;
      bodyA = env13;
      bodyB = env14;
      invMassA = env15;
      C = env16;
      t7 = env17;
      invIA = env18;
      break;
    case 13:
      normal = env0;
      baumgarte = env1;
      invMassB = env2;
      psm = env3;
      invIB = env4;
      t2 = env5;
      t1 = env6;
      j = env7;
      t3 = env8;
      minSeparation = env9;
      t4 = env10;
      i = env11;
      c = env12;
      bodyA = env13;
      bodyB = env14;
      invMassA = env15;
      C = env16;
      t7 = env17;
      t9 = env18;
      invIA = env19;
      break;
    case 14:
      t9 = env0;
      t7 = env1;
      invIA = env2;
      invMassB = env3;
      baumgarte = env4;
      invIB = env5;
      t2 = env6;
      psm = env7;
      t1 = env8;
      j = env9;
      t3 = env10;
      minSeparation = env11;
      t4 = env12;
      i = env13;
      c = env14;
      bodyA = env15;
      bodyB = env16;
      invMassA = env17;
      C = env18;
      normal = env19;
      break;
    case 15:
      t9 = env0;
      t7 = env1;
      t12 = env2;
      invMassB = env3;
      invIA = env4;
      baumgarte = env5;
      invIB = env6;
      t2 = env7;
      psm = env8;
      t1 = env9;
      j = env10;
      t3 = env11;
      minSeparation = env12;
      t4 = env13;
      i = env14;
      c = env15;
      bodyA = env16;
      bodyB = env17;
      invMassA = env18;
      C = env19;
      normal = env20;
      break;
    case 16:
      invIA = env0;
      baumgarte = env1;
      invMassB = env2;
      rnA = env3;
      invIB = env4;
      t2 = env5;
      t9 = env6;
      t1 = env7;
      j = env8;
      t3 = env9;
      minSeparation = env10;
      t4 = env11;
      psm = env12;
      i = env13;
      c = env14;
      bodyA = env15;
      bodyB = env16;
      invMassA = env17;
      C = env18;
      normal = env19;
      break;
    case 17:
      normal = env0;
      baumgarte = env1;
      invMassB = env2;
      rnA = env3;
      invIB = env4;
      t2 = env5;
      t9 = env6;
      t1 = env7;
      j = env8;
      t3 = env9;
      minSeparation = env10;
      t4 = env11;
      t15 = env12;
      psm = env13;
      i = env14;
      c = env15;
      bodyA = env16;
      bodyB = env17;
      invMassA = env18;
      C = env19;
      invIA = env20;
      break;
    case 18:
      normal = env0;
      baumgarte = env1;
      invMassB = env2;
      rnA = env3;
      invIB = env4;
      t2 = env5;
      psm = env6;
      t1 = env7;
      j = env8;
      t9 = env9;
      t3 = env10;
      minSeparation = env11;
      t4 = env12;
      t15 = env13;
      i = env14;
      c = env15;
      bodyA = env16;
      bodyB = env17;
      invMassA = env18;
      C = env19;
      invIA = env20;
      break;
    case 19:
      normal = env0;
      baumgarte = env1;
      invMassB = env2;
      rnA = env3;
      invIB = env4;
      t2 = env5;
      psm = env6;
      t1 = env7;
      j = env8;
      t9 = env9;
      t3 = env10;
      minSeparation = env11;
      t4 = env12;
      t15 = env13;
      t18 = env14;
      i = env15;
      c = env16;
      bodyA = env17;
      bodyB = env18;
      invMassA = env19;
      C = env20;
      invIA = env21;
      break;
    case 20:
      baumgarte = env0;
      invMassB = env1;
      psm = env2;
      t1 = env3;
      t2 = env4;
      invIB = env5;
      j = env6;
      t3 = env7;
      minSeparation = env8;
      t4 = env9;
      i = env10;
      c = env11;
      bodyA = env12;
      bodyB = env13;
      t6 = env14;
      t5 = env15;
      invMassA = env16;
      invIA = env17;
      break;
    case 21:
      baumgarte = env0;
      invMassB = env1;
      psm = env2;
      t1 = env3;
      t2 = env4;
      invIB = env5;
      j = env6;
      t3 = env7;
      minSeparation = env8;
      t4 = env9;
      i = env10;
      c = env11;
      bodyA = env12;
      bodyB = env13;
      t6 = env14;
      t5 = env15;
      t8 = env16;
      invMassA = env17;
      invIA = env18;
      break;
    case 22:
      baumgarte = env0;
      invMassB = env1;
      psm = env2;
      t1 = env3;
      t2 = env4;
      invIB = env5;
      j = env6;
      t3 = env7;
      minSeparation = env8;
      t4 = env9;
      i = env10;
      c = env11;
      bodyA = env12;
      bodyB = env13;
      t6 = env14;
      t5 = env15;
      t8 = env16;
      t10 = env17;
      invMassA = env18;
      invIA = env19;
      break;
    case 23:
      invIA = env0;
      baumgarte = env1;
      invMassB = env2;
      psm = env3;
      invIB = env4;
      t2 = env5;
      t1 = env6;
      j = env7;
      t3 = env8;
      minSeparation = env9;
      t4 = env10;
      i = env11;
      c = env12;
      bodyA = env13;
      bodyB = env14;
      t6 = env15;
      t5 = env16;
      invMassA = env17;
      t10 = env18;
      t8 = env19;
      break;
    case 24:
      t13 = env0;
      baumgarte = env1;
      invIA = env2;
      invMassB = env3;
      psm = env4;
      invIB = env5;
      t2 = env6;
      t1 = env7;
      j = env8;
      t3 = env9;
      minSeparation = env10;
      t4 = env11;
      i = env12;
      c = env13;
      bodyA = env14;
      bodyB = env15;
      t6 = env16;
      t5 = env17;
      invMassA = env18;
      t10 = env19;
      t8 = env20;
      break;
    case 25:
      baumgarte = env0;
      invMassB = env1;
      psm = env2;
      invIB = env3;
      t2 = env4;
      t1 = env5;
      j = env6;
      t3 = env7;
      minSeparation = env8;
      t4 = env9;
      i = env10;
      t5 = env11;
      t15 = env12;
      c = env13;
      bodyA = env14;
      bodyB = env15;
      invMassA = env16;
      invIA = env17;
      break;
    case 26:
      baumgarte = env0;
      invMassB = env1;
      psm = env2;
      invIB = env3;
      t2 = env4;
      t1 = env5;
      j = env6;
      t3 = env7;
      minSeparation = env8;
      t4 = env9;
      i = env10;
      t5 = env11;
      t15 = env12;
      c = env13;
      bodyA = env14;
      bodyB = env15;
      t17 = env16;
      invMassA = env17;
      invIA = env18;
      break;
    case 27:
      baumgarte = env0;
      invMassB = env1;
      psm = env2;
      invIB = env3;
      t2 = env4;
      t1 = env5;
      j = env6;
      t3 = env7;
      minSeparation = env8;
      t4 = env9;
      i = env10;
      t5 = env11;
      t15 = env12;
      c = env13;
      bodyA = env14;
      bodyB = env15;
      t19 = env16;
      t17 = env17;
      invMassA = env18;
      invIA = env19;
      break;
    case 28:
      baumgarte = env0;
      invMassB = env1;
      psm = env2;
      invIB = env3;
      t2 = env4;
      t1 = env5;
      j = env6;
      t3 = env7;
      minSeparation = env8;
      t4 = env9;
      i = env10;
      t5 = env11;
      t15 = env12;
      c = env13;
      bodyA = env14;
      bodyB = env15;
      t19 = env16;
      t17 = env17;
      invMassA = env18;
      invIA = env19;
      break;
    case 29:
      baumgarte = env0;
      invMassB = env1;
      psm = env2;
      invIB = env3;
      t2 = env4;
      t1 = env5;
      j = env6;
      t3 = env7;
      minSeparation = env8;
      t4 = env9;
      i = env10;
      t5 = env11;
      t15 = env12;
      c = env13;
      bodyA = env14;
      bodyB = env15;
      t19 = env16;
      t17 = env17;
      t22 = env18;
      invMassA = env19;
      invIA = env20;
      break;
  }
  switch (state) {
    case 0:
      var psm = this.psolver;
      var t1 = this.rA;
      var t2 = this.rB;
      var t3 = this.P;
      var t4 = this.temp1;
      var i = 0;
      var minSeparation = 0.0;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              var t5 = this.constraintCount;
            case 1:
              state = 0;
              if (!$.ltB(i, t5))
                break L0;
              t5 = this.constraints;
              if (i < 0 || i >= t5.length)
                throw $.ioore(i);
              var c = t5[i];
              var bodyA = c.get$bodyA();
              var bodyB = c.get$bodyB();
              t5 = bodyA.get$mass();
            case 2:
              state = 0;
              var t7 = bodyA.get$invMass();
            case 3:
              state = 0;
              var invMassA = $.mul(t5, t7);
              t7 = bodyA.get$mass();
            case 4:
              state = 0;
              var t9 = bodyA.get$invInertia();
            case 5:
              state = 0;
              var invIA = $.mul(t7, t9);
              t9 = bodyB.get$mass();
            case 6:
              state = 0;
              var t11 = bodyB.get$invMass();
            case 7:
              state = 0;
              var invMassB = $.mul(t9, t11);
              t11 = bodyB.get$mass();
            case 8:
              state = 0;
              var t13 = bodyB.get$invInertia();
            case 9:
              state = 0;
              var invIB = $.mul(t11, t13);
              var j = 0;
            default:
              L1:
                while (true)
                  switch (state) {
                    case 0:
                      t5 = c.get$pointCount();
                    case 10:
                      state = 0;
                      if (!$.ltB(j, t5))
                        break L1;
                      psm.initialize$2(c, j);
                      var normal = psm.get$normal();
                      var point = psm.get$point();
                      var separation = psm.get$separation();
                    case 11:
                      state = 0;
                      t1.setFrom$1(point).subLocal$1(bodyA.get$sweep().get$center());
                      t2.setFrom$1(point).subLocal$1(bodyB.get$sweep().get$center());
                      minSeparation = $.min(minSeparation, separation);
                      var t6 = $.add(separation, 0.005);
                      if (typeof t6 !== 'number')
                        throw $.iae(t6);
                      var C = $.max(-0.2, $.min(baumgarte * t6, 0.0));
                      t7 = t1.get$x();
                    case 12:
                      state = 0;
                      t9 = normal.get$y();
                    case 13:
                      state = 0;
                      t9 = $.mul(t7, t9);
                      t7 = t1.get$y();
                    case 14:
                      state = 0;
                      var t12 = normal.get$x();
                    case 15:
                      state = 0;
                      var rnA = $.sub(t9, $.mul(t7, t12));
                      t9 = t2.get$x();
                    case 16:
                      state = 0;
                      var t15 = normal.get$y();
                    case 17:
                      state = 0;
                      t15 = $.mul(t9, t15);
                      t9 = t2.get$y();
                    case 18:
                      state = 0;
                      var t18 = normal.get$x();
                    case 19:
                      state = 0;
                      var rnB = $.sub(t15, $.mul(t9, t18));
                      var K = $.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rnA), rnA)), $.mul($.mul(invIB, rnB), rnB));
                      if ($.gtB(K, 0.0)) {
                        t5 = -C;
                        if (typeof K !== 'number')
                          throw $.iae(K);
                        var impulse = t5 / K;
                      } else
                        impulse = 0.0;
                      t3.setFrom$1(normal).mulLocal$1(impulse);
                      t4.setFrom$1(t3).mulLocal$1(invMassA);
                      bodyA.get$sweep().get$center().subLocal$1(t4);
                      t5 = bodyA.get$sweep();
                      t6 = t5.get$angle();
                    case 20:
                      state = 0;
                      var t8 = t1.get$x();
                    case 21:
                      state = 0;
                      var t10 = t3.get$y();
                    case 22:
                      state = 0;
                      t10 = $.mul(t8, t10);
                      t8 = t1.get$y();
                    case 23:
                      state = 0;
                      t13 = t3.get$x();
                    case 24:
                      state = 0;
                      t5.set$angle($.sub(t6, $.mul(invIA, $.sub(t10, $.mul(t8, t13)))));
                      bodyA.synchronizeTransform$0();
                      t4.setFrom$1(t3).mulLocal$1(invMassB);
                      bodyB.get$sweep().get$center().addLocal$1(t4);
                      t5 = bodyB.get$sweep();
                      t15 = t5.get$angle();
                    case 25:
                      state = 0;
                      var t17 = t2.get$x();
                    case 26:
                      state = 0;
                      var t19 = t3.get$y();
                    case 27:
                      state = 0;
                      t19 = $.mul(t17, t19);
                      t17 = t2.get$y();
                    case 28:
                      state = 0;
                      var t22 = t3.get$x();
                    case 29:
                      state = 0;
                      t5.set$angle($.add(t15, $.mul(invIB, $.sub(t19, $.mul(t17, t22)))));
                      bodyB.synchronizeTransform$0();
                      ++j;
                  }
              ++i;
          }
      return minSeparation >= -0.0075;
  }
},
 ContactSolver$0: function() {
  for (var i = 0; i < this.constraints.length; ++i) {
    var t1 = this.constraints;
    var t2 = $.ContactConstraint$();
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i] = t2;
  }
}
};

$$.PositionSolverManifold = {"":
 ["normal?", "point?", "separation=", "pointA?", "pointB?", "temp", "planePoint", "clipPoint"],
 "super": "Object",
 initialize$2: function(cc, index) {
  switch (cc.get$type()) {
    case 0:
      var t1 = cc.get$bodyA();
      var t2 = cc.get$localPoint();
      var t3 = this.pointA;
      t1.getWorldPointToOut$2(t2, t3);
      t2 = cc.get$bodyB();
      t1 = $.index(cc.get$points(), 0).get$localPoint();
      var t4 = this.pointB;
      t2.getWorldPointToOut$2(t1, t4);
      t1 = $.gtB($.MathBox_distanceSquared(t3, t4), 1.4208639999999999e-14);
      t2 = this.normal;
      if (t1) {
        t2.setFrom$1(t4).subLocal$1(t3);
        t2.normalize$0();
      } else
        t2.setCoords$2(1.0, 0.0);
      this.point.setFrom$1(t3).addLocal$1(t4).mulLocal$1(0.5);
      t1 = this.temp;
      t1.setFrom$1(t4).subLocal$1(t3);
      t3 = this.normal;
      this.separation = $.sub($.add($.mul(t1.get$x(), t3.get$x()), $.mul(t1.get$y(), t3.get$y())), cc.get$radius());
      break;
    case 1:
      t1 = cc.get$bodyA();
      t2 = cc.get$localNormal();
      t3 = this.normal;
      t1.getWorldVectorToOut$2(t2, t3);
      t2 = cc.get$bodyA();
      t1 = cc.get$localPoint();
      t4 = this.planePoint;
      t2.getWorldPointToOut$2(t1, t4);
      t1 = cc.get$bodyB();
      t2 = $.index(cc.get$points(), index).get$localPoint();
      var t5 = this.clipPoint;
      t1.getWorldPointToOut$2(t2, t5);
      t2 = this.temp;
      t2.setFrom$1(t5).subLocal$1(t4);
      this.separation = $.sub($.add($.mul(t2.get$x(), t3.get$x()), $.mul(t2.get$y(), t3.get$y())), cc.get$radius());
      this.point.setFrom$1(t5);
      break;
    case 2:
      t1 = cc.get$bodyB();
      t2 = cc.get$localNormal();
      t3 = this.normal;
      t1.getWorldVectorToOut$2(t2, t3);
      t2 = cc.get$bodyB();
      t1 = cc.get$localPoint();
      t4 = this.planePoint;
      t2.getWorldPointToOut$2(t1, t4);
      t1 = cc.get$bodyA();
      t2 = $.index(cc.get$points(), index).get$localPoint();
      t5 = this.clipPoint;
      t1.getWorldPointToOut$2(t2, t5);
      t2 = this.temp;
      t2.setFrom$1(t5).subLocal$1(t4);
      this.separation = $.sub($.add($.mul(t2.get$x(), t3.get$x()), $.mul(t2.get$y(), t3.get$y())), cc.get$radius());
      this.point.setFrom$1(t5);
      t3.negateLocal$0();
  }
}
};

$$.PolygonAndCircleContact = {"":
 ["flags", "prev", "next", "edge1", "edge2", "fixtureA", "fixtureB", "manifold", "toiCount", "pool", "_oldManifold"],
 "super": "Contact",
 init$2: function(fA, fB) {
  $.Expect_equals(1, fA.get$type(), null);
  $.Expect_equals(0, fB.get$type(), null);
  $.Contact.prototype.init$2.call(this, fA, fB);
},
 evaluate$3: function(argManifold, xfA, xfB) {
  this.pool.get$collision().collidePolygonAndCircle$5(argManifold, this.fixtureA.get$shape(), xfA, this.fixtureB.get$shape(), xfB);
}
};

$$.PolygonContact = {"":
 ["flags", "prev", "next", "edge1", "edge2", "fixtureA", "fixtureB", "manifold", "toiCount", "pool", "_oldManifold"],
 "super": "Contact",
 init$2: function(fA, fB) {
  $.Expect_equals(1, fA.get$type(), null);
  $.Expect_equals(1, fB.get$type(), null);
  $.Contact.prototype.init$2.call(this, fA, fB);
},
 evaluate$3: function(argManifold, xfA, xfB) {
  this.pool.get$collision().collidePolygons$5(argManifold, this.fixtureA.get$shape(), xfA, this.fixtureB.get$shape(), xfB);
}
};

$$.TimeOfImpactSolver = {"":
 ["constraints?", "count=", "toiBody", "psm", "rA?", "rB?", "P", "temp"],
 "super": "Object",
 initialize$3: function(contacts, argCount, argToiBody) {
  if (typeof contacts !== 'string' && (typeof contacts !== 'object' || contacts === null || contacts.constructor !== Array && !contacts.is$JavaScriptIndexingBehavior()))
    return this.initialize$3$bailout(1, contacts, argCount, argToiBody);
  this.count = argCount;
  this.toiBody = argToiBody;
  if ($.geB(this.count, this.constraints.length)) {
    var old = this.constraints;
    this.constraints = $.ListImplementation_List($.max(this.count, old.length * 2), 'TimeOfImpactConstraint');
    $.setRange$3(this.constraints, 0, old.length, old);
    for (var i = old.length; t1 = this.constraints, i < t1.length; ++i) {
      var t2 = $.TimeOfImpactConstraint$();
      if (i < 0 || i >= t1.length)
        throw $.ioore(i);
      t1[i] = t2;
    }
  }
  for (i = 0; $.ltB(i, this.count); ++i) {
    if (i < 0 || i >= contacts.length)
      throw $.ioore(i);
    var contact = contacts[i];
    var fixtureA = contact.get$fixtureA();
    var fixtureB = contact.get$fixtureB();
    var shapeA = fixtureA.get$shape();
    var shapeB = fixtureB.get$shape();
    var radiusA = shapeA.get$radius();
    var radiusB = shapeB.get$radius();
    var bodyA = fixtureA.get$body();
    var bodyB = fixtureB.get$body();
    var manifold = contact.get$manifold();
    var t1 = this.constraints;
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    var constraint = t1[i];
    constraint.set$bodyA(bodyA);
    constraint.set$bodyB(bodyB);
    constraint.get$localNormal().setFrom$1(manifold.get$localNormal());
    constraint.get$localPoint().setFrom$1(manifold.get$localPoint());
    constraint.set$type(manifold.get$type());
    constraint.set$pointCount(manifold.get$pointCount());
    constraint.set$radius($.add(radiusA, radiusB));
    for (var j = 0; $.ltB(j, constraint.get$pointCount()); ++j) {
      var cp = $.index(manifold.get$points(), j);
      $.indexSet(constraint.get$localPoints(), j, cp.get$localPoint());
    }
  }
},
 initialize$3$bailout: function(state, contacts, argCount, argToiBody) {
  this.count = argCount;
  this.toiBody = argToiBody;
  if ($.geB(this.count, this.constraints.length)) {
    var old = this.constraints;
    this.constraints = $.ListImplementation_List($.max(this.count, old.length * 2), 'TimeOfImpactConstraint');
    $.setRange$3(this.constraints, 0, old.length, old);
    for (var i = old.length; i < this.constraints.length; ++i) {
      var t1 = this.constraints;
      var t2 = $.TimeOfImpactConstraint$();
      if (i < 0 || i >= t1.length)
        throw $.ioore(i);
      t1[i] = t2;
    }
  }
  for (i = 0; $.ltB(i, this.count); ++i) {
    var contact = $.index(contacts, i);
    var fixtureA = contact.get$fixtureA();
    var fixtureB = contact.get$fixtureB();
    var shapeA = fixtureA.get$shape();
    var shapeB = fixtureB.get$shape();
    var radiusA = shapeA.get$radius();
    var radiusB = shapeB.get$radius();
    var bodyA = fixtureA.get$body();
    var bodyB = fixtureB.get$body();
    var manifold = contact.get$manifold();
    t1 = this.constraints;
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    var constraint = t1[i];
    constraint.set$bodyA(bodyA);
    constraint.set$bodyB(bodyB);
    constraint.get$localNormal().setFrom$1(manifold.get$localNormal());
    constraint.get$localPoint().setFrom$1(manifold.get$localPoint());
    constraint.set$type(manifold.get$type());
    constraint.set$pointCount(manifold.get$pointCount());
    constraint.set$radius($.add(radiusA, radiusB));
    for (var j = 0; $.ltB(j, constraint.get$pointCount()); ++j) {
      var cp = $.index(manifold.get$points(), j);
      $.indexSet(constraint.get$localPoints(), j, cp.get$localPoint());
    }
  }
},
 solve$1: function(baumgarte) {
  for (var t1 = this.psm, t2 = this.rA, t3 = this.rB, t4 = this.P, t5 = this.temp, normal = t1.normal, point = t1.point, i = 0, minSeparation = 0; $.ltB(i, this.count); ++i) {
    var t6 = this.constraints;
    if (i < 0 || i >= t6.length)
      throw $.ioore(i);
    var c = t6[i];
    var bodyA = c.get$bodyA();
    var bodyB = c.get$bodyB();
    var massA = bodyA.get$mass();
    var massB = bodyB.get$mass();
    if ($.eqB(bodyA, this.toiBody))
      massB = 0.0;
    else
      massA = 0.0;
    var invMassA = $.mul(massA, bodyA.get$invMass());
    if (typeof invMassA !== 'number')
      return this.solve$1$bailout(1, baumgarte, massA, massB, invMassA, i, minSeparation, c, bodyA, bodyB, t1, t2, t3, t4, t5, 0);
    var invIA = $.mul(massA, bodyA.get$invInertia());
    if (typeof invIA !== 'number')
      return this.solve$1$bailout(2, baumgarte, massB, invMassA, i, minSeparation, invIA, c, bodyA, t1, bodyB, t2, t3, t4, t5, 0);
    var invMassB = $.mul(massB, bodyB.get$invMass());
    if (typeof invMassB !== 'number')
      return this.solve$1$bailout(3, baumgarte, massB, invMassA, i, minSeparation, invIA, invMassB, c, bodyA, bodyB, t1, t2, t3, t4, t5);
    var invIB = $.mul(massB, bodyB.get$invInertia());
    if (typeof invIB !== 'number')
      return this.solve$1$bailout(4, baumgarte, invMassA, i, minSeparation, invIA, invMassB, invIB, c, bodyA, t1, bodyB, t2, t3, t4, t5);
    for (var t6 = invMassA + invMassB, j = 0; $.ltB(j, c.get$pointCount()); ++j) {
      t1.initialize$2(c, j);
      var separation = t1.separation;
      t2.setFrom$1(point).subLocal$1(bodyA.get$sweep().get$center());
      t3.setFrom$1(point).subLocal$1(bodyB.get$sweep().get$center());
      minSeparation = $.min(minSeparation, separation);
      var t7 = $.add(separation, 0.005);
      if (typeof t7 !== 'number')
        throw $.iae(t7);
      var C = $.max(-0.2, $.min(baumgarte * t7, 0.0));
      var rnA = $.sub($.mul(t2.x, normal.get$y()), $.mul(t2.y, normal.get$x()));
      var rnB = $.sub($.mul(t3.x, normal.get$y()), $.mul(t3.y, normal.get$x()));
      if (typeof rnA !== 'number')
        throw $.iae(rnA);
      var t8 = t6 + invIA * rnA * rnA;
      if (typeof rnB !== 'number')
        throw $.iae(rnB);
      var K = t8 + invIB * rnB * rnB;
      var impulse = K > 0.0 ? -C / K : 0.0;
      t4.setFrom$1(normal).mulLocal$1(impulse);
      t5.setFrom$1(t4).mulLocal$1(invMassA);
      bodyA.get$sweep().get$center().subLocal$1(t5);
      t7 = bodyA.get$sweep();
      t8 = t7.get$angle();
      var t9 = $.sub($.mul(t2.x, t4.y), $.mul(t2.y, t4.x));
      if (typeof t9 !== 'number')
        throw $.iae(t9);
      t7.set$angle($.sub(t8, invIA * t9));
      bodyA.synchronizeTransform$0();
      t5.setFrom$1(t4).mulLocal$1(invMassB);
      bodyB.get$sweep().get$center().addLocal$1(t5);
      t7 = bodyB.get$sweep();
      var t10 = t7.get$angle();
      var t11 = $.sub($.mul(t3.x, t4.y), $.mul(t3.y, t4.x));
      if (typeof t11 !== 'number')
        throw $.iae(t11);
      t7.set$angle($.add(t10, invIB * t11));
      bodyB.synchronizeTransform$0();
    }
  }
  return minSeparation >= -0.0075;
},
 solve$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13, env14) {
  switch (state) {
    case 1:
      var baumgarte = env0;
      massA = env1;
      massB = env2;
      invMassA = env3;
      i = env4;
      minSeparation = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t1 = env9;
      t2 = env10;
      t3 = env11;
      t4 = env12;
      t5 = env13;
      break;
    case 2:
      baumgarte = env0;
      massB = env1;
      invMassA = env2;
      i = env3;
      minSeparation = env4;
      invIA = env5;
      c = env6;
      bodyA = env7;
      t1 = env8;
      bodyB = env9;
      t2 = env10;
      t3 = env11;
      t4 = env12;
      t5 = env13;
      break;
    case 3:
      baumgarte = env0;
      massB = env1;
      invMassA = env2;
      i = env3;
      minSeparation = env4;
      invIA = env5;
      invMassB = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      t1 = env10;
      t2 = env11;
      t3 = env12;
      t4 = env13;
      t5 = env14;
      break;
    case 4:
      baumgarte = env0;
      invMassA = env1;
      i = env2;
      minSeparation = env3;
      invIA = env4;
      invMassB = env5;
      invIB = env6;
      c = env7;
      bodyA = env8;
      t1 = env9;
      bodyB = env10;
      t2 = env11;
      t3 = env12;
      t4 = env13;
      t5 = env14;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.psm;
      var t2 = this.rA;
      var t3 = this.rB;
      var t4 = this.P;
      var t5 = this.temp;
      var i = 0;
      var minSeparation = 0;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!$.ltB(i, this.count))
                break L0;
              var t6 = this.constraints;
              if (i < 0 || i >= t6.length)
                throw $.ioore(i);
              var c = t6[i];
              var bodyA = c.get$bodyA();
              var bodyB = c.get$bodyB();
              var massA = bodyA.get$mass();
              var massB = bodyB.get$mass();
              if ($.eqB(bodyA, this.toiBody))
                massB = 0.0;
              else
                massA = 0.0;
              var invMassA = $.mul(massA, bodyA.get$invMass());
            case 1:
              state = 0;
              var invIA = $.mul(massA, bodyA.get$invInertia());
            case 2:
              state = 0;
              var invMassB = $.mul(massB, bodyB.get$invMass());
            case 3:
              state = 0;
              var invIB = $.mul(massB, bodyB.get$invInertia());
            case 4:
              state = 0;
              for (var j = 0; $.ltB(j, c.get$pointCount()); ++j) {
                t1.initialize$2(c, j);
                var normal = t1.get$normal();
                var point = t1.get$point();
                var separation = t1.get$separation();
                t2.setFrom$1(point).subLocal$1(bodyA.get$sweep().get$center());
                t3.setFrom$1(point).subLocal$1(bodyB.get$sweep().get$center());
                minSeparation = $.min(minSeparation, separation);
                t6 = $.add(separation, 0.005);
                if (typeof t6 !== 'number')
                  throw $.iae(t6);
                var C = $.max(-0.2, $.min(baumgarte * t6, 0.0));
                var rnA = $.sub($.mul(t2.get$x(), normal.get$y()), $.mul(t2.get$y(), normal.get$x()));
                var rnB = $.sub($.mul(t3.get$x(), normal.get$y()), $.mul(t3.get$y(), normal.get$x()));
                var K = $.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rnA), rnA)), $.mul($.mul(invIB, rnB), rnB));
                if ($.gtB(K, 0.0)) {
                  t6 = -C;
                  if (typeof K !== 'number')
                    throw $.iae(K);
                  var impulse = t6 / K;
                } else
                  impulse = 0.0;
                t4.setFrom$1(normal).mulLocal$1(impulse);
                t5.setFrom$1(t4).mulLocal$1(invMassA);
                bodyA.get$sweep().get$center().subLocal$1(t5);
                t6 = bodyA.get$sweep();
                t6.set$angle($.sub(t6.get$angle(), $.mul(invIA, $.sub($.mul(t2.get$x(), t4.get$y()), $.mul(t2.get$y(), t4.get$x())))));
                bodyA.synchronizeTransform$0();
                t5.setFrom$1(t4).mulLocal$1(invMassB);
                bodyB.get$sweep().get$center().addLocal$1(t5);
                t6 = bodyB.get$sweep();
                t6.set$angle($.add(t6.get$angle(), $.mul(invIB, $.sub($.mul(t3.get$x(), t4.get$y()), $.mul(t3.get$y(), t4.get$x())))));
                bodyB.synchronizeTransform$0();
              }
              ++i;
          }
      return minSeparation >= -0.0075;
  }
},
 TimeOfImpactSolver$0: function() {
  for (var i = 0; i < this.constraints.length; ++i) {
    var t1 = this.constraints;
    var t2 = $.TimeOfImpactConstraint$();
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i] = t2;
  }
}
};

$$.TimeOfImpactSolverManifold = {"":
 ["normal?", "point?", "separation=", "pointA?", "pointB?", "temp", "planePoint", "clipPoint"],
 "super": "Object",
 initialize$2: function(cc, index) {
  switch (cc.get$type()) {
    case 0:
      var t1 = this.pointA;
      t1.setFrom$1(cc.get$bodyA().getWorldPoint$1(cc.get$localPoint()));
      var t2 = this.pointB;
      t2.setFrom$1(cc.get$bodyB().getWorldPoint$1($.index(cc.get$localPoints(), 0)));
      var t3 = $.gtB($.MathBox_distanceSquared(t1, t2), 1.4208639999999999e-14);
      var t4 = this.normal;
      if (t3) {
        t4.setFrom$1(t2).subLocal$1(t1);
        t4.normalize$0();
      } else
        t4.setCoords$2(1, 0);
      this.point.setFrom$1(t1).addLocal$1(t2).mulLocal$1(0.5);
      t3 = this.temp;
      t3.setFrom$1(t2).subLocal$1(t1);
      t1 = this.normal;
      this.separation = $.sub($.add($.mul(t3.get$x(), t1.get$x()), $.mul(t3.get$y(), t1.get$y())), cc.get$radius());
      break;
    case 1:
      t1 = this.normal;
      t1.setFrom$1(cc.get$bodyA().getWorldVector$1(cc.get$localNormal()));
      t2 = this.planePoint;
      t2.setFrom$1(cc.get$bodyA().getWorldPoint$1(cc.get$localPoint()));
      t3 = this.clipPoint;
      t3.setFrom$1(cc.get$bodyB().getWorldPoint$1($.index(cc.get$localPoints(), index)));
      t4 = this.temp;
      t4.setFrom$1(t3).subLocal$1(t2);
      this.separation = $.sub($.add($.mul(t4.get$x(), t1.get$x()), $.mul(t4.get$y(), t1.get$y())), cc.get$radius());
      this.point.setFrom$1(t3);
      break;
    case 2:
      t1 = this.normal;
      t1.setFrom$1(cc.get$bodyB().getWorldVector$1(cc.get$localNormal()));
      t2 = this.planePoint;
      t2.setFrom$1(cc.get$bodyB().getWorldPoint$1(cc.get$localPoint()));
      t3 = this.clipPoint;
      t3.setFrom$1(cc.get$bodyA().getWorldPoint$1($.index(cc.get$localPoints(), index)));
      t4 = this.temp;
      t4.setFrom$1(t3).subLocal$1(t2);
      this.separation = $.sub($.add($.mul(t4.get$x(), t1.get$x()), $.mul(t4.get$y(), t1.get$y())), cc.get$radius());
      this.point.setFrom$1(t3);
      t1.negateLocal$0();
      break;
  }
}
};

$$.TimeOfImpactConstraint = {"":
 ["localPoints?", "localNormal?", "localPoint?", "type=", "radius=", "pointCount=", "bodyA=", "bodyB="],
 "super": "Object",
 setFrom$1: function(argOther) {
  for (var t1 = this.localPoints, i = 0; t2 = t1.length, i < t2; ++i) {
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    var t3 = t1[i];
    var t4 = argOther.get$localPoints();
    if (typeof t4 !== 'string' && (typeof t4 !== 'object' || t4 === null || t4.constructor !== Array && !t4.is$JavaScriptIndexingBehavior()))
      return this.setFrom$1$bailout(1, i, argOther, t1, t3, t4);
    if (i < 0 || i >= t4.length)
      throw $.ioore(i);
    t3.setFrom$1(t4[i]);
  }
  this.localNormal.setFrom$1(argOther.get$localNormal());
  this.localPoint.setFrom$1(argOther.get$localPoint());
  this.type = argOther.get$type();
  this.radius = argOther.get$radius();
  this.pointCount = argOther.get$pointCount();
  this.bodyA = argOther.get$bodyA();
  this.bodyB = argOther.get$bodyB();
  var t2;
},
 setFrom$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      i = env0;
      var argOther = env1;
      t1 = env2;
      t2 = env3;
      t3 = env4;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.localPoints;
      var i = 0;
    case 1:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!(i < t1.length))
                break L0;
              if (i < 0 || i >= t1.length)
                throw $.ioore(i);
              var t2 = t1[i];
              var t3 = argOther.get$localPoints();
            case 1:
              state = 0;
              t2.setFrom$1($.index(t3, i));
              ++i;
          }
      this.localNormal.setFrom$1(argOther.get$localNormal());
      this.localPoint.setFrom$1(argOther.get$localPoint());
      this.type = argOther.get$type();
      this.radius = argOther.get$radius();
      this.pointCount = argOther.get$pointCount();
      this.bodyA = argOther.get$bodyA();
      this.bodyB = argOther.get$bodyB();
  }
},
 TimeOfImpactConstraint$0: function() {
  for (var t1 = this.localPoints, i = 0; i < t1.length; ++i) {
    var t2 = $.Vector$(0, 0);
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i] = t2;
  }
}
};

$$.DefaultWorldPool = {"":
 ["collision?", "timeOfImpact?", "distance="],
 "super": "Object",
 timeOfImpact$2: function(arg0, arg1) { return this.timeOfImpact.call$2(arg0, arg1); },
 distance$3: function(arg0, arg1, arg2) { return this.distance.call$3(arg0, arg1, arg2); },
 getCircleContactStack$0: function() {
  var queue = $.DoubleLinkedQueue$('CircleContact');
  for (var i = 0; i < 10; ++i)
    queue.addFirst$1($.CircleContact$(this));
  return queue;
},
 getPolyCircleContactStack$0: function() {
  var queue = $.DoubleLinkedQueue$('PolygonAndCircleContact');
  for (var i = 0; i < 10; ++i)
    queue.addFirst$1($.PolygonAndCircleContact$(this));
  return queue;
},
 getPolyContactStack$0: function() {
  var queue = $.DoubleLinkedQueue$('PolygonContact');
  for (var i = 0; i < 10; ++i)
    queue.addFirst$1($.PolygonContact$(this));
  return queue;
},
 DefaultWorldPool$0: function() {
  this.distance = $.Distance$_construct();
  this.collision = $.Collision$_construct(this);
  this.timeOfImpact = $.TimeOfImpact$_construct(this);
}
};

$$._convertDartToNative_PrepareForStructuredClone_findSlot = {"":
 ["copies_3", "values_2"],
 "super": "Closure",
 call$1: function(value) {
  var length$ = $.get$length(this.values_2);
  if (typeof length$ !== 'number')
    return this.call$1$bailout(1, value, length$);
  for (var i = 0; i < length$; ++i) {
    var t1 = $.index(this.values_2, i);
    if (t1 == null ? value == null : t1 === value)
      return i;
  }
  $.add$1(this.values_2, value);
  $.add$1(this.copies_3, null);
  return length$;
},
 call$1$bailout: function(state, value, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    var t1 = $.index(this.values_2, i);
    if (t1 == null ? value == null : t1 === value)
      return i;
  }
  $.add$1(this.values_2, value);
  $.add$1(this.copies_3, null);
  return length$;
}
};

$$._convertDartToNative_PrepareForStructuredClone_readSlot = {"":
 ["copies_4"],
 "super": "Closure",
 call$1: function(i) {
  return $.index(this.copies_4, i);
}
};

$$._convertDartToNative_PrepareForStructuredClone_writeSlot = {"":
 ["copies_5"],
 "super": "Closure",
 call$2: function(i, x) {
  $.indexSet(this.copies_5, i, x);
}
};

$$._convertDartToNative_PrepareForStructuredClone_cleanupSlots = {"":
 [],
 "super": "Closure",
 call$0: function() {
}
};

$$._convertDartToNative_PrepareForStructuredClone_walk = {"":
 ["findSlot_8", "readSlot_7", "writeSlot_6"],
 "super": "Closure",
 call$1: function(e) {
  var t1 = {};
  if (e == null)
    return e;
  if (typeof e === 'boolean')
    return e;
  if (typeof e === 'number')
    return e;
  if (typeof e === 'string')
    return e;
  if (typeof e === 'object' && e !== null && !!e.is$Date)
    throw $.captureStackTrace($.CTC3);
  if (typeof e === 'object' && e !== null && !!e.is$RegExp)
    throw $.captureStackTrace($.CTC4);
  if (typeof e === 'object' && e !== null && e.is$_FileImpl())
    return e;
  if (typeof e === 'object' && e !== null && e.is$File())
    throw $.captureStackTrace($.CTC5);
  if (typeof e === 'object' && e !== null && e.is$_BlobImpl())
    return e;
  if (typeof e === 'object' && e !== null && e.is$Blob())
    throw $.captureStackTrace($.CTC6);
  if (typeof e === 'object' && e !== null && e.is$_FileListImpl())
    return e;
  if (typeof e === 'object' && e !== null && e.is$FileList())
    throw $.captureStackTrace($.CTC7);
  if (typeof e === 'object' && e !== null && e.is$_ImageDataImpl())
    return e;
  if (typeof e === 'object' && e !== null && e.is$ImageData())
    throw $.captureStackTrace($.CTC7);
  if (typeof e === 'object' && e !== null && e.is$_ArrayBufferImpl())
    return e;
  if (typeof e === 'object' && e !== null && e.is$ArrayBuffer())
    throw $.captureStackTrace($.CTC8);
  if (typeof e === 'object' && e !== null && e.is$_ArrayBufferViewImpl())
    return e;
  if (typeof e === 'object' && e !== null && e.is$ArrayBufferView())
    throw $.captureStackTrace($.CTC9);
  if (typeof e === 'object' && e !== null && e.is$Map()) {
    var slot = this.findSlot_8.call$1(e);
    t1.copy_1 = this.readSlot_7.call$1(slot);
    var t2 = t1.copy_1;
    if (!(t2 == null))
      return t2;
    t1.copy_1 = {};
    this.writeSlot_6.call$2(slot, t1.copy_1);
    e.forEach$1(new $._convertDartToNative_PrepareForStructuredClone_walk_anon(this, t1));
    return t1.copy_1;
  }
  if (typeof e === 'object' && e !== null && (e.constructor === Array || e.is$List())) {
    if (typeof e !== 'object' || e === null || (e.constructor !== Array || !!e.immutable$list) && !e.is$JavaScriptIndexingBehavior())
      return this.call$1$bailout(1, e, 0, 0, 0, 0, 0);
    var length$ = e.length;
    slot = this.findSlot_8.call$1(e);
    var copy = this.readSlot_7.call$1(slot);
    if (!(copy == null)) {
      if (true === copy) {
        copy = new Array(length$);
        this.writeSlot_6.call$2(slot, copy);
      }
      return copy;
    }
    if (e instanceof Array && !!!(e.immutable$list)) {
      this.writeSlot_6.call$2(slot, true);
      for (var i = 0; i < length$; ++i) {
        if (i < 0 || i >= e.length)
          throw $.ioore(i);
        var element = e[i];
        var elementCopy = this.call$1(element);
        if (!(elementCopy == null ? element == null : elementCopy === element)) {
          copy = this.readSlot_7.call$1(slot);
          if (true === copy) {
            copy = new Array(length$);
            this.writeSlot_6.call$2(slot, copy);
          }
          if (typeof copy !== 'object' || copy === null || (copy.constructor !== Array || !!copy.immutable$list) && !copy.is$JavaScriptIndexingBehavior())
            return this.call$1$bailout(2, copy, elementCopy, e, length$, i, slot);
          for (var j = 0; j < i; ++j) {
            if (j < 0 || j >= e.length)
              throw $.ioore(j);
            t1 = e[j];
            if (j < 0 || j >= copy.length)
              throw $.ioore(j);
            copy[j] = t1;
          }
          if (i < 0 || i >= copy.length)
            throw $.ioore(i);
          copy[i] = elementCopy;
          ++i;
          break;
        }
      }
      if (copy == null) {
        this.writeSlot_6.call$2(slot, e);
        copy = e;
      }
    } else {
      copy = new Array(length$);
      this.writeSlot_6.call$2(slot, copy);
      i = 0;
    }
    if (typeof copy !== 'object' || copy === null || (copy.constructor !== Array || !!copy.immutable$list) && !copy.is$JavaScriptIndexingBehavior())
      return this.call$1$bailout(3, i, copy, e, length$, 0, 0);
    for (; i < length$; ++i) {
      if (i < 0 || i >= e.length)
        throw $.ioore(i);
      t1 = this.call$1(e[i]);
      if (i < 0 || i >= copy.length)
        throw $.ioore(i);
      copy[i] = t1;
    }
    return copy;
  }
  throw $.captureStackTrace($.CTC10);
},
 call$1$bailout: function(state, env0, env1, env2, env3, env4, env5) {
  switch (state) {
    case 1:
      var e = env0;
      break;
    case 2:
      copy = env0;
      elementCopy = env1;
      e = env2;
      length$ = env3;
      i = env4;
      slot = env5;
      break;
    case 3:
      i = env0;
      copy = env1;
      e = env2;
      length$ = env3;
      break;
  }
  switch (state) {
    case 0:
      var t1 = {};
      if (e == null)
        return e;
      if (typeof e === 'boolean')
        return e;
      if (typeof e === 'number')
        return e;
      if (typeof e === 'string')
        return e;
      if (typeof e === 'object' && e !== null && !!e.is$Date)
        throw $.captureStackTrace($.CTC3);
      if (typeof e === 'object' && e !== null && !!e.is$RegExp)
        throw $.captureStackTrace($.CTC4);
      if (typeof e === 'object' && e !== null && e.is$_FileImpl())
        return e;
      if (typeof e === 'object' && e !== null && e.is$File())
        throw $.captureStackTrace($.CTC5);
      if (typeof e === 'object' && e !== null && e.is$_BlobImpl())
        return e;
      if (typeof e === 'object' && e !== null && e.is$Blob())
        throw $.captureStackTrace($.CTC6);
      if (typeof e === 'object' && e !== null && e.is$_FileListImpl())
        return e;
      if (typeof e === 'object' && e !== null && e.is$FileList())
        throw $.captureStackTrace($.CTC7);
      if (typeof e === 'object' && e !== null && e.is$_ImageDataImpl())
        return e;
      if (typeof e === 'object' && e !== null && e.is$ImageData())
        throw $.captureStackTrace($.CTC7);
      if (typeof e === 'object' && e !== null && e.is$_ArrayBufferImpl())
        return e;
      if (typeof e === 'object' && e !== null && e.is$ArrayBuffer())
        throw $.captureStackTrace($.CTC8);
      if (typeof e === 'object' && e !== null && e.is$_ArrayBufferViewImpl())
        return e;
      if (typeof e === 'object' && e !== null && e.is$ArrayBufferView())
        throw $.captureStackTrace($.CTC9);
      if (typeof e === 'object' && e !== null && e.is$Map()) {
        var slot = this.findSlot_8.call$1(e);
        t1.copy_1 = this.readSlot_7.call$1(slot);
        var t2 = t1.copy_1;
        if (!(t2 == null))
          return t2;
        t1.copy_1 = {};
        this.writeSlot_6.call$2(slot, t1.copy_1);
        e.forEach$1(new $._convertDartToNative_PrepareForStructuredClone_walk_anon(this, t1));
        return t1.copy_1;
      }
    default:
      if (state === 3 || state === 2 || state === 1 || state === 0 && typeof e === 'object' && e !== null && (e.constructor === Array || e.is$List()))
        switch (state) {
          case 0:
          case 1:
            state = 0;
            var length$ = $.get$length(e);
            slot = this.findSlot_8.call$1(e);
            var copy = this.readSlot_7.call$1(slot);
            if (!(copy == null)) {
              if (true === copy) {
                copy = new Array(length$);
                this.writeSlot_6.call$2(slot, copy);
              }
              return copy;
            }
          case 2:
            if (state === 2 || state === 0 && e instanceof Array && !!!(e.immutable$list))
              switch (state) {
                case 0:
                  this.writeSlot_6.call$2(slot, true);
                  var i = 0;
                case 2:
                  L0:
                    while (true)
                      switch (state) {
                        case 0:
                          if (!$.ltB(i, length$))
                            break L0;
                          var element = $.index(e, i);
                          var elementCopy = this.call$1(element);
                        case 2:
                          if (state === 2 || state === 0 && !(elementCopy == null ? element == null : elementCopy === element))
                            switch (state) {
                              case 0:
                                copy = this.readSlot_7.call$1(slot);
                                if (true === copy) {
                                  copy = new Array(length$);
                                  this.writeSlot_6.call$2(slot, copy);
                                }
                              case 2:
                                state = 0;
                                for (var j = 0; j < i; ++j)
                                  $.indexSet(copy, j, $.index(e, j));
                                $.indexSet(copy, i, elementCopy);
                                ++i;
                                break L0;
                            }
                          ++i;
                      }
                  if (copy == null) {
                    this.writeSlot_6.call$2(slot, e);
                    copy = e;
                  }
              }
            else {
              copy = new Array(length$);
              this.writeSlot_6.call$2(slot, copy);
              i = 0;
            }
          case 3:
            state = 0;
            for (; $.ltB(i, length$); ++i)
              $.indexSet(copy, i, this.call$1($.index(e, i)));
            return copy;
        }
      throw $.captureStackTrace($.CTC10);
  }
}
};

$$._convertDartToNative_PrepareForStructuredClone_walk_anon = {"":
 ["walk_9", "box_0"],
 "super": "Closure",
 call$2: function(key, value) {
  this.box_0.copy_1[key] = this.walk_9.call$1(value);
}
};

$$.Maps__emitMap_anon = {"":
 ["result_3", "box_0", "visiting_2"],
 "super": "Closure",
 call$2: function(k, v) {
  if (this.box_0.first_1 !== true)
    $.add$1(this.result_3, ', ');
  this.box_0.first_1 = false;
  $.Collections__emitObject(k, this.result_3, this.visiting_2);
  $.add$1(this.result_3, ': ');
  $.Collections__emitObject(v, this.result_3, this.visiting_2);
}
};

$$.DoubleLinkedQueue_length__ = {"":
 ["box_0"],
 "super": "Closure",
 call$1: function(element) {
  var counter = $.add(this.box_0.counter_1, 1);
  this.box_0.counter_1 = counter;
}
};

$$.BroadPhase_updatePairs_anon = {"":
 [],
 "super": "Closure",
 call$2: function(a, b) {
  return $.compareTo(a, b);
}
};

$$._convertNativeToDart_IDBKey_containsDate = {"":
 [],
 "super": "Closure",
 call$1: function(object) {
  if (object instanceof Date)
    return true;
  if (typeof object === 'object' && object !== null && (object.constructor === Array || object.is$List())) {
    if (typeof object !== 'object' || object === null || object.constructor !== Array && !object.is$JavaScriptIndexingBehavior())
      return this.call$1$bailout(1, object);
    for (var i = 0; t1 = object.length, i < t1; ++i) {
      if (i < 0 || i >= t1)
        throw $.ioore(i);
      if (this.call$1(object[i]) === true)
        return true;
    }
  }
  return false;
  var t1;
},
 call$1$bailout: function(state, env0) {
  switch (state) {
    case 1:
      var object = env0;
      break;
  }
  switch (state) {
    case 0:
      if (object instanceof Date)
        return true;
    case 1:
      if (state === 1 || state === 0 && typeof object === 'object' && object !== null && (object.constructor === Array || object.is$List()))
        switch (state) {
          case 0:
          case 1:
            state = 0;
            for (var i = 0; $.ltB(i, $.get$length(object)); ++i)
              if (this.call$1($.index(object, i)) === true)
                return true;
        }
      return false;
  }
}
};

$$.startRootIsolate_anon = {"":
 [],
 "super": "Closure",
 call$0: function() {
  $._TimerFactory__factory = $._timerFactory;
  return;
}
};

$$._convertNativeToDart_AcceptStructuredClone_findSlot = {"":
 ["copies_1", "values_0"],
 "super": "Closure",
 call$1: function(value) {
  var length$ = $.get$length(this.values_0);
  if (typeof length$ !== 'number')
    return this.call$1$bailout(1, value, length$);
  for (var i = 0; i < length$; ++i) {
    var t1 = $.index(this.values_0, i);
    if (t1 == null ? value == null : t1 === value)
      return i;
  }
  $.add$1(this.values_0, value);
  $.add$1(this.copies_1, null);
  return length$;
},
 call$1$bailout: function(state, value, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    var t1 = $.index(this.values_0, i);
    if (t1 == null ? value == null : t1 === value)
      return i;
  }
  $.add$1(this.values_0, value);
  $.add$1(this.copies_1, null);
  return length$;
}
};

$$._convertNativeToDart_AcceptStructuredClone_readSlot = {"":
 ["copies_2"],
 "super": "Closure",
 call$1: function(i) {
  return $.index(this.copies_2, i);
}
};

$$._convertNativeToDart_AcceptStructuredClone_writeSlot = {"":
 ["copies_3"],
 "super": "Closure",
 call$2: function(i, x) {
  $.indexSet(this.copies_3, i, x);
}
};

$$._convertNativeToDart_AcceptStructuredClone_walk = {"":
 ["findSlot_6", "readSlot_5", "writeSlot_4"],
 "super": "Closure",
 call$1: function(e) {
  if (typeof e !== 'object' || e === null || (e.constructor !== Array || !!e.immutable$list) && !e.is$JavaScriptIndexingBehavior())
    return this.call$1$bailout(1, e, 0, 0);
  if (e instanceof Date)
    throw $.captureStackTrace($.CTC3);
  if (e instanceof RegExp)
    throw $.captureStackTrace($.CTC4);
  if ($._isJavaScriptSimpleObject(e)) {
    var slot = this.findSlot_6.call$1(e);
    var copy = this.readSlot_5.call$1(slot);
    if (!(copy == null))
      return copy;
    copy = $.makeLiteralMap([]);
    if (typeof copy !== 'object' || copy === null || (copy.constructor !== Array || !!copy.immutable$list) && !copy.is$JavaScriptIndexingBehavior())
      return this.call$1$bailout(2, e, slot, copy);
    this.writeSlot_4.call$2(slot, copy);
    for (var t1 = $.iterator(Object.keys(e)); t1.hasNext$0() === true;) {
      var t2 = t1.next$0();
      var t3 = this.call$1(e[t2]);
      if (t2 !== (t2 | 0))
        throw $.iae(t2);
      if (t2 < 0 || t2 >= copy.length)
        throw $.ioore(t2);
      copy[t2] = t3;
    }
    return copy;
  }
  if (e instanceof Array) {
    slot = this.findSlot_6.call$1(e);
    copy = this.readSlot_5.call$1(slot);
    if (!(copy == null))
      return copy;
    this.writeSlot_4.call$2(slot, e);
    var length$ = e.length;
    for (var i = 0; i < length$; ++i) {
      if (i < 0 || i >= e.length)
        throw $.ioore(i);
      t1 = this.call$1(e[i]);
      if (i < 0 || i >= e.length)
        throw $.ioore(i);
      e[i] = t1;
    }
    return e;
  }
  return e;
},
 call$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var e = env0;
      break;
    case 2:
      e = env0;
      slot = env1;
      copy = env2;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if (e == null)
        return e;
      if (typeof e === 'boolean')
        return e;
      if (typeof e === 'number')
        return e;
      if (typeof e === 'string')
        return e;
      if (e instanceof Date)
        throw $.captureStackTrace($.CTC3);
      if (e instanceof RegExp)
        throw $.captureStackTrace($.CTC4);
    case 2:
      if (state === 2 || state === 0 && $._isJavaScriptSimpleObject(e))
        switch (state) {
          case 0:
            var slot = this.findSlot_6.call$1(e);
            var copy = this.readSlot_5.call$1(slot);
            if (!(copy == null))
              return copy;
            copy = $.makeLiteralMap([]);
          case 2:
            state = 0;
            this.writeSlot_4.call$2(slot, copy);
            for (var t1 = $.iterator(Object.keys(e)); t1.hasNext$0() === true;) {
              var t2 = t1.next$0();
              $.indexSet(copy, t2, this.call$1(e[t2]));
            }
            return copy;
        }
      if (e instanceof Array) {
        slot = this.findSlot_6.call$1(e);
        copy = this.readSlot_5.call$1(slot);
        if (!(copy == null))
          return copy;
        this.writeSlot_4.call$2(slot, e);
        var length$ = $.get$length(e);
        for (var i = 0; $.ltB(i, length$); ++i)
          $.indexSet(e, i, this.call$1($.index(e, i)));
        return e;
      }
      return e;
  }
}
};

$$.LinkedHashMapImplementation_forEach__ = {"":
 ["f_0"],
 "super": "Closure",
 call$1: function(entry) {
  this.f_0.call$2(entry.get$key(), entry.get$value());
}
};

$$._BaseSendPort_call_anon = {"":
 ["port_1", "completer_0"],
 "super": "Closure",
 call$2: function(value, ignoreReplyTo) {
  this.port_1.close$0();
  var t1 = typeof value === 'object' && value !== null && !!value.is$Exception;
  var t2 = this.completer_0;
  if (t1)
    t2.completeException$1(value);
  else
    t2.complete$1(value);
}
};

$$._WorkerSendPort_send_anon = {"":
 ["message_2", "this_1", "replyTo_0"],
 "super": "Closure",
 call$0: function() {
  this.this_1._checkReplyTo$1(this.replyTo_0);
  var workerMessage = $._serializeMessage($.makeLiteralMap(['command', 'message', 'port', this.this_1, 'msg', this.message_2, 'replyTo', this.replyTo_0]));
  if ($._globalState0().get$isWorker() === true)
    $._globalState0().get$mainManager().postMessage$1(workerMessage);
  else
    $.index($._globalState0().get$managers(), this.this_1.get$_workerId()).postMessage$1(workerMessage);
}
};

$$._waitForPendingPorts_anon = {"":
 ["callback_0"],
 "super": "Closure",
 call$1: function(_) {
  return this.callback_0.call$0();
}
};

$$.Futures_wait_anon = {"":
 ["result_5", "pos_4", "completer_3", "box_0", "values_2"],
 "super": "Closure",
 call$1: function(value) {
  $.indexSet(this.values_2, this.pos_4, value);
  var remaining = $.sub(this.box_0.remaining_1, 1);
  this.box_0.remaining_1 = remaining;
  if ($.eqB(remaining, 0) && this.result_5.get$isComplete() !== true)
    this.completer_3.complete$1(this.values_2);
}
};

$$.Futures_wait_anon0 = {"":
 ["result_8", "completer_7", "future_6"],
 "super": "Closure",
 call$1: function(exception) {
  if (this.result_8.get$isComplete() !== true)
    this.completer_7.completeException$2(exception, this.future_6.get$stackTrace());
  return true;
}
};

$$._PendingSendPortFinder_visitList_anon = {"":
 ["this_0"],
 "super": "Closure",
 call$1: function(e) {
  return this.this_0._dispatch$1(e);
}
};

$$._PendingSendPortFinder_visitMap_anon = {"":
 ["this_0"],
 "super": "Closure",
 call$1: function(e) {
  return this.this_0._dispatch$1(e);
}
};

$$._StorageImpl_getValues_anon = {"":
 ["values_0"],
 "super": "Closure",
 call$2: function(k, v) {
  return $.add$1(this.values_0, v);
}
};

$$.HashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 "super": "Closure",
 call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0.i_1;
  var i = $.add(t2, 1);
  this.box_0.i_1 = i;
  $.indexSet(t1, t2, value);
}
};

$$.LinkedHashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 "super": "Closure",
 call$1: function(entry) {
  var t1 = this.list_2;
  var t2 = this.box_0.index_1;
  var index = $.add(t2, 1);
  this.box_0.index_1 = index;
  $.indexSet(t1, t2, entry.get$value());
}
};

$$._NativeJsSendPort_send_anon = {"":
 ["message_5", "this_4", "replyTo_3"],
 "super": "Closure",
 call$0: function() {
  var t1 = {};
  this.this_4._checkReplyTo$1(this.replyTo_3);
  var isolate = $.index($._globalState0().get$isolates(), this.this_4.get$_isolateId());
  if (isolate == null)
    return;
  if (this.this_4.get$_receivePort().get$_callback() == null)
    return;
  var shouldSerialize = !($._globalState0().get$currentContext() == null) && !$.eqB($._globalState0().get$currentContext().get$id(), this.this_4.get$_isolateId());
  t1.msg_1 = this.message_5;
  t1.reply_2 = this.replyTo_3;
  if (shouldSerialize) {
    t1.msg_1 = $._serializeMessage(t1.msg_1);
    t1.reply_2 = $._serializeMessage(t1.reply_2);
  }
  $._globalState0().get$topEventLoop().enqueue$3(isolate, new $._NativeJsSendPort_send_anon0(this.this_4, t1, shouldSerialize), 'receive ' + $.S(this.message_5));
}
};

$$._NativeJsSendPort_send_anon0 = {"":
 ["this_7", "box_0", "shouldSerialize_6"],
 "super": "Closure",
 call$0: function() {
  if (!(this.this_7.get$_receivePort().get$_callback() == null)) {
    if (this.shouldSerialize_6 === true) {
      var msg = $._deserializeMessage(this.box_0.msg_1);
      this.box_0.msg_1 = msg;
      var reply = $._deserializeMessage(this.box_0.reply_2);
      this.box_0.reply_2 = reply;
    }
    var t1 = this.this_7.get$_receivePort();
    var t2 = this.box_0;
    t1._callback$2(t2.msg_1, t2.reply_2);
  }
}
};

$$.invokeClosure_anon = {"":
 ["closure_0"],
 "super": "Closure",
 call$0: function() {
  return this.closure_0.call$0();
}
};

$$.invokeClosure_anon0 = {"":
 ["closure_2", "arg1_1"],
 "super": "Closure",
 call$0: function() {
  return this.closure_2.call$1(this.arg1_1);
}
};

$$.invokeClosure_anon1 = {"":
 ["closure_5", "arg1_4", "arg2_3"],
 "super": "Closure",
 call$0: function() {
  return this.closure_5.call$2(this.arg1_4, this.arg2_3);
}
};

$$._StorageImpl_getKeys_anon = {"":
 ["keys_0"],
 "super": "Closure",
 call$2: function(k, v) {
  return $.add$1(this.keys_0, k);
}
};

$$.HashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 "super": "Closure",
 call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0.i_10;
  var i = $.add(t2, 1);
  this.box_0.i_10 = i;
  $.indexSet(t1, t2, key);
}
};

$$.LinkedHashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 "super": "Closure",
 call$1: function(entry) {
  var t1 = this.list_2;
  var t2 = this.box_0.index_10;
  var index = $.add(t2, 1);
  this.box_0.index_10 = index;
  $.indexSet(t1, t2, entry.get$key());
}
};

$$._Copier_visitMap_anon = {"":
 ["this_2", "box_0"],
 "super": "Closure",
 call$2: function(key, val) {
  $.indexSet(this.box_0.copy_10, this.this_2._dispatch$1(key), this.this_2._dispatch$1(val));
}
};

$$._EventLoop__runHelper_next = {"":
 ["this_0"],
 "super": "Closure",
 call$0: function() {
  if (this.this_0.runIteration$0() !== true)
    return;
  $._window().setTimeout$2(this, 0);
}
};

$$.anon = {"":
 ["this_1", "callback_0"],
 "super": "Closure",
 call$0: function() {
  return this.callback_0.call$1(this.this_1);
}
};

$$.anon0 = {"":
 ["this_1", "callback_0"],
 "super": "Closure",
 call$0: function() {
  return this.callback_0.call$1(this.this_1);
}
};

$$.BoundClosure = {'':
 ['self', 'target'],
 'super': 'Closure',
call$1: function(p0) { return this.self[this.target](p0); }
};
$$.BoundClosure0 = {'':
 ['self', 'target'],
 'super': 'Closure',
call$0: function() { return this.self[this.target](); }
};
$$.BoundClosure1 = {'':
 ['self', 'target'],
 'super': 'Closure',
call$1: function(p0) { return this.self[this.target](p0); },
 call$0: function() {
  return this.call$1(Isolate.$isolateProperties.CTC2)
}
};
$$.BoundClosure2 = {'':
 ['self', 'target'],
 'super': 'Closure',
call$1: function(p0) { return this.self[this.target](p0); },
 call$0: function() {
  return this.call$1(Isolate.$isolateProperties.CTC2)
}
};
$$.BoundClosure3 = {'':
 ['self', 'target'],
 'super': 'Closure',
call$3: function(p0, p1, p2) { return this.self[this.target](p0, p1, p2); }
};
$$.BoundClosure4 = {'':
 ['self', 'target'],
 'super': 'Closure',
call$2: function(p0, p1) { return this.self[this.target](p0, p1); }
};
$.mul$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a * b;
  return a.operator$mul$1(b);
};

$.startRootIsolate = function(entry) {
  var t1 = $._Manager$();
  $._globalState(t1);
  if ($._globalState0().get$isWorker() === true)
    return;
  var rootContext = $._IsolateContext$();
  $._globalState0().set$rootContext(rootContext);
  $._fillStatics(rootContext);
  $._globalState0().set$currentContext(rootContext);
  if (!($._window() == null))
    rootContext.eval$1(new $.startRootIsolate_anon());
  rootContext.eval$1(entry);
  $._globalState0().get$topEventLoop().run$0();
};

$.setRange$3 = function(receiver, start, length$, from) {
  if ($.isJsArray(receiver))
    return $.setRange$4(receiver, start, length$, from, 0);
  return receiver.setRange$3(start, length$, from);
};

$._window = function() {
  return typeof window != "undefined" ? window : null;
};

$.floor = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.floor$0();
  return Math.floor(receiver);
};

$.eqB = function(a, b) {
  if (a == null)
    return b == null;
  if (b == null)
    return false;
  if (typeof a === "object")
    if (!!a.operator$eq$1)
      return a.operator$eq$1(b) === true;
  return a === b;
};

$._convertNativeToDart_AcceptStructuredClone = function(object) {
  var values = [];
  var copies = [];
  return new $._convertNativeToDart_AcceptStructuredClone_walk(new $._convertNativeToDart_AcceptStructuredClone_findSlot(copies, values), new $._convertNativeToDart_AcceptStructuredClone_readSlot(copies), new $._convertNativeToDart_AcceptStructuredClone_writeSlot(copies)).call$1(object);
};

$.Vector_crossVectorAndNumToOut = function(a, s, out) {
  var t1 = -s;
  var t2 = a.get$x();
  if (typeof t2 !== 'number')
    throw $.iae(t2);
  var tempy = t1 * t2;
  t2 = a.get$y();
  if (typeof t2 !== 'number')
    throw $.iae(t2);
  out.set$x(s * t2);
  out.set$y(tempy);
};

$.Collections__containsRef = function(c, ref) {
  for (var t1 = $.iterator(c); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (t2 == null ? ref == null : t2 === ref)
      return true;
  }
  return false;
};

$.MathBox_distanceSquared = function(v1, v2) {
  var dx = $.sub(v1.get$x(), v2.get$x());
  var dy = $.sub(v1.get$y(), v2.get$y());
  return $.add($.mul(dx, dx), $.mul(dy, dy));
};

$.SeparationFunction$ = function() {
  var t1 = $.DistanceProxy$();
  var t2 = $.DistanceProxy$();
  var t3 = $.Vector$(0, 0);
  var t4 = $.Vector$(0, 0);
  var t5 = $.Sweep$();
  var t6 = $.Sweep$();
  var t7 = $.Vector$(0, 0);
  var t8 = $.Vector$(0, 0);
  var t9 = $.Vector$(0, 0);
  var t10 = $.Vector$(0, 0);
  var t11 = $.Vector$(0, 0);
  var t12 = $.Vector$(0, 0);
  var t13 = $.Vector$(0, 0);
  var t14 = $.Vector$(0, 0);
  var t15 = $.Vector$(0, 0);
  var t16 = $.Vector$(0, 0);
  var t17 = $.Transform$();
  var t18 = $.Transform$();
  return new $.SeparationFunction(t1, t2, 0, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12, t13, t14, t15, $.Vector$(0, 0), $.Vector$(0, 0), t16, t17, t18);
};

$._NodeListWrapper$ = function(list) {
  return new $._NodeListWrapper(list);
};

$._isJavaScriptSimpleObject = function(value) {
  return Object.getPrototypeOf(value) === Object.prototype;
};

$.isJsArray = function(value) {
  return !(value == null) && value.constructor === Array;
};

$.indexSet$slow = function(a, index, value) {
  if ($.isJsArray(a)) {
    if (!(typeof index === 'number' && index === (index | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0 || $.geB(index, $.get$length(a)))
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    $.checkMutable(a, 'indexed set');
    a[index] = value;
    return;
  }
  a.operator$indexSet$2(index, value);
};

$.HashMapImplementation__nextProbe = function(currentProbe, numberOfProbes, length$) {
  return $.and($.add(currentProbe, numberOfProbes), $.sub(length$, 1));
};

$.allMatches = function(receiver, str) {
  if (!(typeof receiver === 'string'))
    return receiver.allMatches$1(str);
  $.checkString(str);
  return $.allMatchesInStringUnchecked(receiver, str);
};

$.substringUnchecked = function(receiver, startIndex, endIndex) {
  return receiver.substring(startIndex, endIndex);
};

$.Vector_maxToOut = function(a, b, out) {
  out.x = $.gtB(a.x, b.x) ? a.x : b.x;
  out.y = $.gtB(a.y, b.y) ? a.y : b.y;
};

$.get$length = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver))
    return receiver.length;
  else
    return receiver.get$length();
};

$.ge$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a >= b;
  return a.operator$ge$1(b);
};

$.TimeOfImpact$_construct = function(argPool) {
  var t1 = new $.TimeOfImpact($.SimplexCache$(), $.DistanceInput$(), $.Transform$(), $.Transform$(), $.DistanceOutput$(), $.SeparationFunction$(), $.ListImplementation_List(2, 'int'), $.Sweep$(), $.Sweep$(), argPool);
  t1.TimeOfImpact$_construct$1(argPool);
  return t1;
};

$.EdgeResults$ = function() {
  return new $.EdgeResults(0, 0);
};

$.FutureImpl_FutureImpl$immediate = function(value, T) {
  var res = $.FutureImpl$();
  res._setValue$1(value);
  return res;
};

$.Body$ = function(bd, world) {
  var t1 = $.Transform$();
  var t2 = $.Sweep$();
  var t3 = $.Vector$copy(bd.get$linearVelocity());
  var t4 = bd.get$linearDamping();
  var t5 = bd.get$angularDamping();
  var t6 = $.Vector$(0, 0);
  var t7 = bd.get$userData();
  var t8 = $.FixtureDef$();
  var t9 = $.MassData$();
  var t10 = $.Transform$();
  var t11 = $.Vector$(0, 0);
  var t12 = $.Vector$(0, 0);
  t12 = new $.Body(world, 0, null, 0, t7, t3, 0, null, null, null, null, null, 0, null, t6, 0, 0, 0, t4, t5, bd.get$type(), null, t1, t2, t8, t9, t10, t11, t12);
  t12.Body$2(bd, world);
  return t12;
};

$.WorldManifold$ = function() {
  var t1 = $.Vector$(0, 0);
  var t2 = $.Vector$(0, 0);
  var t3 = $.Vector$(0, 0);
  t3 = new $.WorldManifold(t1, $.ListImplementation_List(2, 'Vector'), t2, t3);
  t3.WorldManifold$0();
  return t3;
};

$.Vector$ = function(x, y) {
  return new $.Vector(x, y);
};

$.typeNameInIE = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if (name$ === 'Window')
    return 'DOMWindow';
  if (name$ === 'Document') {
    if (!!obj.xmlVersion)
      return 'Document';
    return 'HTMLDocument';
  }
  if (name$ === 'CanvasPixelArray')
    return 'Uint8ClampedArray';
  if (name$ === 'DataTransfer')
    return 'Clipboard';
  if (name$ === 'DragEvent')
    return 'MouseEvent';
  if (name$ === 'HTMLDDElement')
    return 'HTMLElement';
  if (name$ === 'HTMLDTElement')
    return 'HTMLElement';
  if (name$ === 'HTMLTableDataCellElement')
    return 'HTMLTableCellElement';
  if (name$ === 'HTMLTableHeaderCellElement')
    return 'HTMLTableCellElement';
  if (name$ === 'HTMLPhraseElement')
    return 'HTMLElement';
  if (name$ === 'MSStyleCSSProperties')
    return 'CSSStyleDeclaration';
  if (name$ === 'MouseWheelEvent')
    return 'WheelEvent';
  if (name$ === 'FormData')
    return 'DOMFormData';
  return name$;
};

$.DoubleLinkedQueueEntry$ = function(e, E) {
  var t1 = new $.DoubleLinkedQueueEntry(null, null, null);
  $.setRuntimeTypeInfo(t1, { 'E': E });
  t1.DoubleLinkedQueueEntry$1(e);
  return t1;
};

$.constructorNameFallback = function(obj) {
  var constructor$ = obj.constructor;
  if (typeof(constructor$) === 'function') {
    var name$ = constructor$.name;
    if (typeof name$ === 'string')
      var t1 = !(name$ === '') && !(name$ === 'Object') && !(name$ === 'Function.prototype');
    else
      t1 = false;
    if (t1)
      return name$;
  }
  var string = Object.prototype.toString.call(obj);
  return string.substring(8, string.length - 1);
};

$.PolygonAndCircleContact$ = function(argPool) {
  var t1 = $.Manifold$();
  return new $.PolygonAndCircleContact(null, null, null, $.ContactEdge$(), $.ContactEdge$(), null, null, t1, null, argPool, $.Manifold$());
};

$.NullPointerException$ = function(functionName, arguments$) {
  return new $.NullPointerException(functionName, arguments$);
};

$._serializeMessage = function(message) {
  if ($._globalState0().get$needSerialization() === true)
    return $._JsSerializer$().traverse$1(message);
  else
    return $._JsCopier$().traverse$1(message);
};

$.max = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') {
      if (a > b)
        return a;
      if (a < b)
        return b;
      if (typeof b === 'number') {
        if (typeof a === 'number')
          if (a === 0.0)
            return a + b;
        if ($.isNaN(b) === true)
          return b;
        return a;
      }
      if (b === 0 && $.isNegative(a) === true)
        return b;
      return a;
    }
    throw $.captureStackTrace($.IllegalArgumentException$(b));
  }
  throw $.captureStackTrace($.IllegalArgumentException$(a));
};

$.tdiv = function(a, b) {
  if ($.checkNumbers(a, b))
    return $.truncate(a / b);
  return a.operator$tdiv$1(b);
};

$.Primitives_printString = function(string) {
  if (typeof dartPrint == "function") {
    dartPrint(string);
    return;
  }
  if (typeof console == "object") {
    console.log(string);
    return;
  }
  if (typeof write == "function") {
    write(string);
    write("\n");
  }
};

$.clear = function(receiver) {
  if (!$.isJsArray(receiver))
    return receiver.clear$0();
  $.set$length(receiver, 0);
};

$.AxisAlignedBox_testOverlap = function(a, b) {
  var t1 = b.get$lowerBound().get$x();
  if (typeof t1 !== 'number')
    return $.AxisAlignedBox_testOverlap$bailout(1, a, b, t1, 0);
  var t3 = a.get$upperBound().get$x();
  if (typeof t3 !== 'number')
    return $.AxisAlignedBox_testOverlap$bailout(2, a, b, t3, t1);
  if (!(t1 > t3)) {
    t1 = b.get$lowerBound().get$y();
    if (typeof t1 !== 'number')
      return $.AxisAlignedBox_testOverlap$bailout(3, a, b, t1, 0);
    t3 = a.get$upperBound().get$y();
    if (typeof t3 !== 'number')
      return $.AxisAlignedBox_testOverlap$bailout(4, a, b, t3, t1);
    t3 = t1 > t3;
    t1 = t3;
  } else
    t1 = true;
  if (!t1) {
    t1 = a.get$lowerBound().get$x();
    if (typeof t1 !== 'number')
      return $.AxisAlignedBox_testOverlap$bailout(5, a, b, t1, 0);
    t3 = b.get$upperBound().get$x();
    if (typeof t3 !== 'number')
      return $.AxisAlignedBox_testOverlap$bailout(6, a, b, t3, t1);
    if (!(t1 > t3)) {
      t1 = a.get$lowerBound().get$y();
      if (typeof t1 !== 'number')
        return $.AxisAlignedBox_testOverlap$bailout(7, b, t1, 0, 0);
      t3 = b.get$upperBound().get$y();
      if (typeof t3 !== 'number')
        return $.AxisAlignedBox_testOverlap$bailout(8, t1, t3, 0, 0);
      t3 = t1 > t3;
      t1 = t3;
    } else
      t1 = true;
  } else
    t1 = true;
  return !t1;
};

$.typeNameInChrome = function(obj) {
  var name$ = obj.constructor.name;
  if (name$ === 'Window')
    return 'DOMWindow';
  if (name$ === 'CanvasPixelArray')
    return 'Uint8ClampedArray';
  if (name$ === 'WebKitMutationObserver')
    return 'MutationObserver';
  if (name$ === 'FormData')
    return 'DOMFormData';
  return name$;
};

$._deserializeMessage = function(message) {
  if ($._globalState0().get$needSerialization() === true)
    return $._JsDeserializer$().deserialize$1(message);
  else
    return message;
};

$.sqrt = function(value) {
  return Math.sqrt($.checkNum(value));
};

$.shr = function(a, b) {
  if ($.checkNumbers(a, b)) {
    if (b < 0)
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (a > 0) {
      if (b > 31)
        return 0;
      return a >>> b;
    }
    if (b > 31)
      b = 31;
    return (a >> b) >>> 0;
  }
  return a.operator$shr$1(b);
};

$.ObjectImplementation_toStringImpl = function(object) {
  return $.Primitives_objectToString(object);
};

$.DualPivotQuicksort__dualPivotQuicksort = function(a, left, right, compare) {
  if (typeof a !== 'object' || a === null || (a.constructor !== Array || !!a.immutable$list) && !a.is$JavaScriptIndexingBehavior())
    return $.DualPivotQuicksort__dualPivotQuicksort$bailout(1, a, left, right, compare, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var sixth = $.tdiv($.add($.sub(right, left), 1), 6);
  if (typeof sixth !== 'number')
    throw $.iae(sixth);
  var index1 = left + sixth;
  var index5 = $.sub(right, sixth);
  if (typeof right !== 'number')
    throw $.iae(right);
  var index3 = $.tdiv(left + right, 2);
  var index2 = index3 - sixth;
  var index4 = index3 + sixth;
  if (index1 !== (index1 | 0))
    throw $.iae(index1);
  var t1 = a.length;
  if (index1 < 0 || index1 >= t1)
    throw $.ioore(index1);
  var el1 = a[index1];
  if (index2 !== (index2 | 0))
    throw $.iae(index2);
  if (index2 < 0 || index2 >= t1)
    throw $.ioore(index2);
  var el2 = a[index2];
  if (index3 !== (index3 | 0))
    throw $.iae(index3);
  if (index3 < 0 || index3 >= t1)
    throw $.ioore(index3);
  var el3 = a[index3];
  if (index4 !== (index4 | 0))
    throw $.iae(index4);
  if (index4 < 0 || index4 >= t1)
    throw $.ioore(index4);
  var el4 = a[index4];
  if (index5 !== (index5 | 0))
    throw $.iae(index5);
  if (index5 < 0 || index5 >= t1)
    throw $.ioore(index5);
  var el5 = a[index5];
  if ($.gtB(compare.call$2(el1, el2), 0)) {
    var t0 = el1;
    el1 = el2;
    el2 = t0;
  }
  if ($.gtB(compare.call$2(el4, el5), 0)) {
    t0 = el5;
    el5 = el4;
    el4 = t0;
  }
  if ($.gtB(compare.call$2(el1, el3), 0)) {
    t0 = el3;
    el3 = el1;
    el1 = t0;
  }
  if ($.gtB(compare.call$2(el2, el3), 0)) {
    t0 = el3;
    el3 = el2;
    el2 = t0;
  }
  if ($.gtB(compare.call$2(el1, el4), 0)) {
    t0 = el1;
    el1 = el4;
    el4 = t0;
  }
  if ($.gtB(compare.call$2(el3, el4), 0)) {
    t0 = el3;
    el3 = el4;
    el4 = t0;
  }
  if ($.gtB(compare.call$2(el2, el5), 0)) {
    t0 = el2;
    el2 = el5;
    el5 = t0;
  }
  if ($.gtB(compare.call$2(el2, el3), 0)) {
    t0 = el3;
    el3 = el2;
    el2 = t0;
  }
  if ($.gtB(compare.call$2(el4, el5), 0)) {
    t0 = el5;
    el5 = el4;
    el4 = t0;
  }
  if (index1 < 0 || index1 >= a.length)
    throw $.ioore(index1);
  a[index1] = el1;
  if (index3 < 0 || index3 >= a.length)
    throw $.ioore(index3);
  a[index3] = el3;
  if (index5 < 0 || index5 >= a.length)
    throw $.ioore(index5);
  a[index5] = el5;
  if (left !== (left | 0))
    throw $.iae(left);
  t1 = a.length;
  if (left < 0 || left >= t1)
    throw $.ioore(left);
  var t2 = a[left];
  if (index2 < 0 || index2 >= t1)
    throw $.ioore(index2);
  a[index2] = t2;
  if (right !== (right | 0))
    throw $.iae(right);
  t2 = a.length;
  if (right < 0 || right >= t2)
    throw $.ioore(right);
  var t3 = a[right];
  if (index4 < 0 || index4 >= t2)
    throw $.ioore(index4);
  a[index4] = t3;
  var less = left + 1;
  var great = right - 1;
  var pivots_are_equal = $.eqB(compare.call$2(el2, el4), 0);
  if (pivots_are_equal)
    for (var k = less; k <= great; ++k) {
      if (k !== (k | 0))
        throw $.iae(k);
      if (k < 0 || k >= a.length)
        throw $.ioore(k);
      var ak = a[k];
      var comp = compare.call$2(ak, el2);
      if (typeof comp !== 'number')
        return $.DualPivotQuicksort__dualPivotQuicksort$bailout(2, a, less, k, compare, left, great, index1, index5, el2, pivots_are_equal, right, ak, comp, el4);
      if (comp === 0)
        continue;
      if (comp < 0) {
        if (!(k === less)) {
          if (less !== (less | 0))
            throw $.iae(less);
          t1 = a.length;
          if (less < 0 || less >= t1)
            throw $.ioore(less);
          t2 = a[less];
          if (k < 0 || k >= t1)
            throw $.ioore(k);
          a[k] = t2;
          if (less < 0 || less >= a.length)
            throw $.ioore(less);
          a[less] = ak;
        }
        ++less;
      } else
        for (var less0 = less + 1; true;) {
          if (great !== (great | 0))
            throw $.iae(great);
          if (great < 0 || great >= a.length)
            throw $.ioore(great);
          comp = compare.call$2(a[great], el2);
          if ($.gtB(comp, 0)) {
            --great;
            continue;
          } else {
            t1 = $.ltB(comp, 0);
            var great0 = great - 1;
            t2 = a.length;
            if (t1) {
              if (less !== (less | 0))
                throw $.iae(less);
              if (less < 0 || less >= t2)
                throw $.ioore(less);
              t1 = a[less];
              if (k < 0 || k >= t2)
                throw $.ioore(k);
              a[k] = t1;
              t1 = a.length;
              if (great < 0 || great >= t1)
                throw $.ioore(great);
              t3 = a[great];
              if (less < 0 || less >= t1)
                throw $.ioore(less);
              a[less] = t3;
              if (great < 0 || great >= a.length)
                throw $.ioore(great);
              a[great] = ak;
              great = great0;
              less = less0;
              break;
            } else {
              if (great < 0 || great >= t2)
                throw $.ioore(great);
              t1 = a[great];
              if (k < 0 || k >= t2)
                throw $.ioore(k);
              a[k] = t1;
              if (great < 0 || great >= a.length)
                throw $.ioore(great);
              a[great] = ak;
              great = great0;
              break;
            }
          }
        }
    }
  else
    for (k = less; k <= great; ++k) {
      if (k !== (k | 0))
        throw $.iae(k);
      if (k < 0 || k >= a.length)
        throw $.ioore(k);
      ak = a[k];
      if ($.ltB(compare.call$2(ak, el2), 0)) {
        if (!(k === less)) {
          if (less !== (less | 0))
            throw $.iae(less);
          t1 = a.length;
          if (less < 0 || less >= t1)
            throw $.ioore(less);
          t2 = a[less];
          if (k < 0 || k >= t1)
            throw $.ioore(k);
          a[k] = t2;
          if (less < 0 || less >= a.length)
            throw $.ioore(less);
          a[less] = ak;
        }
        ++less;
      } else if ($.gtB(compare.call$2(ak, el4), 0))
        for (less0 = less + 1; true;) {
          if (great !== (great | 0))
            throw $.iae(great);
          if (great < 0 || great >= a.length)
            throw $.ioore(great);
          if ($.gtB(compare.call$2(a[great], el4), 0)) {
            --great;
            if (great < k)
              break;
            continue;
          } else {
            if (great < 0 || great >= a.length)
              throw $.ioore(great);
            t1 = $.ltB(compare.call$2(a[great], el2), 0);
            great0 = great - 1;
            t2 = a.length;
            if (t1) {
              if (less !== (less | 0))
                throw $.iae(less);
              if (less < 0 || less >= t2)
                throw $.ioore(less);
              t1 = a[less];
              if (k < 0 || k >= t2)
                throw $.ioore(k);
              a[k] = t1;
              t1 = a.length;
              if (great < 0 || great >= t1)
                throw $.ioore(great);
              t3 = a[great];
              if (less < 0 || less >= t1)
                throw $.ioore(less);
              a[less] = t3;
              if (great < 0 || great >= a.length)
                throw $.ioore(great);
              a[great] = ak;
              great = great0;
              less = less0;
            } else {
              if (great < 0 || great >= t2)
                throw $.ioore(great);
              t1 = a[great];
              if (k < 0 || k >= t2)
                throw $.ioore(k);
              a[k] = t1;
              if (great < 0 || great >= a.length)
                throw $.ioore(great);
              a[great] = ak;
              great = great0;
            }
            break;
          }
        }
    }
  t1 = less - 1;
  if (t1 !== (t1 | 0))
    throw $.iae(t1);
  t2 = a.length;
  if (t1 < 0 || t1 >= t2)
    throw $.ioore(t1);
  t3 = a[t1];
  if (left < 0 || left >= t2)
    throw $.ioore(left);
  a[left] = t3;
  if (t1 < 0 || t1 >= a.length)
    throw $.ioore(t1);
  a[t1] = el2;
  t1 = great + 1;
  if (t1 !== (t1 | 0))
    throw $.iae(t1);
  t3 = a.length;
  if (t1 < 0 || t1 >= t3)
    throw $.ioore(t1);
  var t4 = a[t1];
  if (right < 0 || right >= t3)
    throw $.ioore(right);
  a[right] = t4;
  if (t1 < 0 || t1 >= a.length)
    throw $.ioore(t1);
  a[t1] = el4;
  $.DualPivotQuicksort__doSort(a, left, less - 2, compare);
  $.DualPivotQuicksort__doSort(a, great + 2, right, compare);
  if (pivots_are_equal)
    return;
  if (less < index1 && great > index5) {
    while (true) {
      if (less !== (less | 0))
        throw $.iae(less);
      if (less < 0 || less >= a.length)
        throw $.ioore(less);
      if (!$.eqB(compare.call$2(a[less], el2), 0))
        break;
      ++less;
    }
    while (true) {
      if (great !== (great | 0))
        throw $.iae(great);
      if (great < 0 || great >= a.length)
        throw $.ioore(great);
      if (!$.eqB(compare.call$2(a[great], el4), 0))
        break;
      --great;
    }
    for (k = less; k <= great; ++k) {
      if (k !== (k | 0))
        throw $.iae(k);
      if (k < 0 || k >= a.length)
        throw $.ioore(k);
      ak = a[k];
      if ($.eqB(compare.call$2(ak, el2), 0)) {
        if (!(k === less)) {
          if (less !== (less | 0))
            throw $.iae(less);
          t1 = a.length;
          if (less < 0 || less >= t1)
            throw $.ioore(less);
          t2 = a[less];
          if (k < 0 || k >= t1)
            throw $.ioore(k);
          a[k] = t2;
          if (less < 0 || less >= a.length)
            throw $.ioore(less);
          a[less] = ak;
        }
        ++less;
      } else if ($.eqB(compare.call$2(ak, el4), 0))
        for (less0 = less + 1; true;) {
          if (great !== (great | 0))
            throw $.iae(great);
          if (great < 0 || great >= a.length)
            throw $.ioore(great);
          if ($.eqB(compare.call$2(a[great], el4), 0)) {
            --great;
            if (great < k)
              break;
            continue;
          } else {
            if (great < 0 || great >= a.length)
              throw $.ioore(great);
            t1 = $.ltB(compare.call$2(a[great], el2), 0);
            great0 = great - 1;
            t2 = a.length;
            if (t1) {
              if (less !== (less | 0))
                throw $.iae(less);
              if (less < 0 || less >= t2)
                throw $.ioore(less);
              t1 = a[less];
              if (k < 0 || k >= t2)
                throw $.ioore(k);
              a[k] = t1;
              t1 = a.length;
              if (great < 0 || great >= t1)
                throw $.ioore(great);
              t3 = a[great];
              if (less < 0 || less >= t1)
                throw $.ioore(less);
              a[less] = t3;
              if (great < 0 || great >= a.length)
                throw $.ioore(great);
              a[great] = ak;
              great = great0;
              less = less0;
            } else {
              if (great < 0 || great >= t2)
                throw $.ioore(great);
              t1 = a[great];
              if (k < 0 || k >= t2)
                throw $.ioore(k);
              a[k] = t1;
              if (great < 0 || great >= a.length)
                throw $.ioore(great);
              a[great] = ak;
              great = great0;
            }
            break;
          }
        }
    }
    $.DualPivotQuicksort__doSort(a, less, great, compare);
  } else
    $.DualPivotQuicksort__doSort(a, less, great, compare);
};

$.and = function(a, b) {
  if ($.checkNumbers(a, b))
    return (a & b) >>> 0;
  return a.operator$and$1(b);
};

$.substring$2 = function(receiver, startIndex, endIndex) {
  $.checkNum(startIndex);
  var length$ = receiver.length;
  if (endIndex == null)
    endIndex = length$;
  $.checkNum(endIndex);
  if (startIndex < 0)
    throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(startIndex, endIndex))
    throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(endIndex, length$))
    throw $.captureStackTrace($.IndexOutOfRangeException$(endIndex));
  return $.substringUnchecked(receiver, startIndex, endIndex);
};

$.indexSet = function(a, index, value) {
  if (a.constructor === Array && !a.immutable$list) {
    var key = index >>> 0;
    if (key === index && key < a.length) {
      a[key] = value;
      return;
    }
  }
  $.indexSet$slow(a, index, value);
};

$.DistanceInput$ = function() {
  return new $.DistanceInput($.DistanceProxy$(), $.DistanceProxy$(), $.Transform$(), $.Transform$(), false);
};

$.StringMatch$ = function(_start, str, pattern) {
  return new $.StringMatch(_start, str, pattern);
};

$.ExceptionImplementation$ = function(msg) {
  return new $.ExceptionImplementation(msg);
};

$.invokeClosure = function(closure, isolate, numberOfArguments, arg1, arg2) {
  if ($.eqB(numberOfArguments, 0))
    return $._callInIsolate(isolate, new $.invokeClosure_anon(closure));
  else if ($.eqB(numberOfArguments, 1))
    return $._callInIsolate(isolate, new $.invokeClosure_anon0(closure, arg1));
  else if ($.eqB(numberOfArguments, 2))
    return $._callInIsolate(isolate, new $.invokeClosure_anon1(closure, arg1, arg2));
  else
    throw $.captureStackTrace($.ExceptionImplementation$('Unsupported number of arguments for wrapped closure'));
};

$.stringJoinUnchecked = function(array, separator) {
  return array.join(separator);
};

$.gt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a > b : $.gt$slow(a, b);
};

$.Vector_minToOut = function(a, b, out) {
  out.x = $.ltB(a.x, b.x) ? a.x : b.x;
  out.y = $.ltB(a.y, b.y) ? a.y : b.y;
};

$.ContactSolver$ = function() {
  var t1 = new $.ContactSolver($.ListImplementation_List(256, 'ContactConstraint'), null, $.WorldManifold$(), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.PositionSolverManifold$(), $.Vector$(0, 0), $.Vector$(0, 0));
  t1.ContactSolver$0();
  return t1;
};

$._Collections_filter = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (f.call$1(t2) === true)
      destination.push(t2);
  }
  return destination;
};

$.buildDynamicMetadata = function(inputTable) {
  var result = [];
  for (var i = 0; i < inputTable.length; ++i) {
    var tag = inputTable[i][0];
    var array = inputTable[i];
    var tags = array[1];
    var set = {};
    var tagNames = tags.split('|');
    for (var j = 0, index = 1; j < tagNames.length; ++j) {
      $.propertySet(set, tagNames[j], true);
      index = j;
      array = tagNames;
    }
    result.push($.MetaInfo$(tag, tags, set));
  }
  return result;
};

$.propertySet = function(object, property, value) {
  object[property] = value;
};

$.BroadPhase$ = function() {
  var t1 = new $.BroadPhase($.DynamicTree$(), 0, null, null, 16, 0, null);
  t1.BroadPhase$0();
  return t1;
};

$.mul = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a * b : $.mul$slow(a, b);
};

$.contains$1 = function(receiver, other) {
  if (!(typeof receiver === 'string'))
    return receiver.contains$1(other);
  return $.contains$2(receiver, other, 0);
};

$.Settings_mixFriction = function(friction1, friction2) {
  return $.sqrt($.mul(friction1, friction2));
};

$._browserPrefix = function() {
  if ($._cachedBrowserPrefix == null)
    if ($._Device_isFirefox() === true)
      $._cachedBrowserPrefix = '-moz-';
    else
      $._cachedBrowserPrefix = '-webkit-';
  return $._cachedBrowserPrefix;
};

$.ContactConstraint$ = function() {
  var t1 = new $.ContactConstraint($.ListImplementation_List(2, 'ContactConstraintPoint'), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Matrix22$(null, null), $.Matrix22$(null, null), null, null, null, null, null, null, 0, null);
  t1.ContactConstraint$0();
  return t1;
};

$.ContactImpulse$ = function() {
  return new $.ContactImpulse($.ListImplementation_List(2, 'num'), $.ListImplementation_List(2, 'num'));
};

$.neg = function(a) {
  if (typeof a === "number")
    return -a;
  return a.negate$0();
};

$.Matrix22_mulMatrixAndVectorToOut = function(matrix, vector, out) {
  var tempy = $.add($.mul(matrix.get$col1().get$y(), vector.get$x()), $.mul(matrix.get$col2().get$y(), vector.get$y()));
  out.set$x($.add($.mul(matrix.get$col1().get$x(), vector.get$x()), $.mul(matrix.get$col2().get$x(), vector.get$y())));
  out.set$y(tempy);
};

$._Deserializer_isPrimitive = function(x) {
  return x == null || typeof x === 'string' || typeof x === 'number' || typeof x === 'boolean';
};

$.Collections__emitCollection = function(c, result, visiting) {
  $.add$1(visiting, c);
  var isList = typeof c === 'object' && c !== null && (c.constructor === Array || c.is$List());
  $.add$1(result, isList ? '[' : '{');
  for (var t1 = $.iterator(c), first = true; t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (!first)
      $.add$1(result, ', ');
    $.Collections__emitObject(t2, result, visiting);
    first = false;
  }
  $.add$1(result, isList ? ']' : '}');
  $.removeLast(visiting);
};

$._convertNativeToDart_IDBKey = function(nativeKey) {
  if (new $._convertNativeToDart_IDBKey_containsDate().call$1(nativeKey) === true)
    throw $.captureStackTrace($.CTC17);
  return nativeKey;
};

$.DynamicTreeNode$_construct = function() {
  return new $.DynamicTreeNode($.AxisAlignedBox$(null, null), null, null, null, null, null, null);
};

$._MessageTraverser_isPrimitive = function(x) {
  return x == null || typeof x === 'string' || typeof x === 'number' || typeof x === 'boolean';
};

$.checkMutable = function(list, reason) {
  if (!!(list.immutable$list))
    throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$.filter = function(receiver, predicate) {
  if (!$.isJsArray(receiver))
    return receiver.filter$1(predicate);
  else
    return $.Collections_filter(receiver, [], predicate);
};

$.ExpectException$ = function(message) {
  return new $.ExpectException(message);
};

$.sub$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a - b;
  return a.operator$sub$1(b);
};

$.toStringWrapper = function() {
  return $.toString(this.dartException);
};

$.Collections_filter = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (f.call$1(t2) === true)
      destination.push(t2);
  }
  return destination;
};

$.or = function(a, b) {
  if ($.checkNumbers(a, b))
    return (a | b) >>> 0;
  return a.operator$or$1(b);
};

$.DefaultWorldPool$ = function() {
  var t1 = new $.DefaultWorldPool(null, null, null);
  t1.DefaultWorldPool$0();
  return t1;
};

$.CircleContact$ = function(argPool) {
  var t1 = $.Manifold$();
  return new $.CircleContact(null, null, null, $.ContactEdge$(), $.ContactEdge$(), null, null, t1, null, argPool, $.Manifold$());
};

$.typeNameInOpera = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if (name$ === 'Window')
    return 'DOMWindow';
  if (name$ === 'FormData')
    return 'DOMFormData';
  return name$;
};

$.TimeStep$ = function() {
  return new $.TimeStep(0, 0, 0, 0, 0, true);
};

$.checkGrowable = function(list, reason) {
  if (!!(list.fixed$length))
    throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$._timerFactory = function(millis, callback, repeating) {
  return repeating === true ? $._Timer$repeating(millis, callback) : $._Timer$(millis, callback);
};

$.Futures_wait = function(futures) {
  var t1 = {};
  if (typeof futures !== 'string' && (typeof futures !== 'object' || futures === null || futures.constructor !== Array && !futures.is$JavaScriptIndexingBehavior()))
    return $.Futures_wait$bailout(1, futures, t1);
  if ($.isEmpty(futures) === true)
    return $.FutureImpl_FutureImpl$immediate($.CTC, 'List');
  var completer = $.CompleterImpl$('List');
  var result = completer.get$future();
  t1.remaining_1 = futures.length;
  var values = $.ListImplementation_List(futures.length);
  for (var i = 0; t2 = futures.length, i < t2; ++i) {
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    var future = futures[i];
    future.then$1(new $.Futures_wait_anon(result, i, completer, t1, values));
    future.handleException$1(new $.Futures_wait_anon0(result, completer, future));
  }
  return result;
  var t2;
};

$.TimeOfImpactSolverManifold$ = function() {
  return new $.TimeOfImpactSolverManifold($.Vector$(0, 0), $.Vector$(0, 0), 0, $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0));
};

$.add$1 = function(receiver, value) {
  if ($.isJsArray(receiver)) {
    $.checkGrowable(receiver, 'add');
    receiver.push(value);
    return;
  }
  return receiver.add$1(value);
};

$.add = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a + b : $.add$slow(a, b);
};

$.geB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a >= b : $.ge$slow(a, b) === true;
};

$.contains = function(userAgent, name$) {
  return !(userAgent.indexOf(name$) === -1);
};

$.stringContainsUnchecked = function(receiver, other, startIndex) {
  if (typeof other === 'string')
    return !($.indexOf$2(receiver, other, startIndex) === -1);
  else if (typeof other === 'object' && other !== null && !!other.is$JSSyntaxRegExp)
    return other.hasMatch$1($.substring$1(receiver, startIndex));
  else
    return $.iterator($.allMatches(other, $.substring$1(receiver, startIndex))).hasNext$0();
};

$.Settings_mixRestitution = function(restitution1, restitution2) {
  return $.gtB(restitution1, restitution2) ? restitution1 : restitution2;
};

$._Timer$repeating = function(milliSeconds, callback) {
  var t1 = new $._Timer(false, null);
  t1._Timer$repeating$2(milliSeconds, callback);
  return t1;
};

$.ObjectNotClosureException$ = function() {
  return new $.ObjectNotClosureException();
};

$.window = function() {
return window;
};

$.abs = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.abs$0();
  return Math.abs(receiver);
};

$.typeNameInSafari = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if (name$ === 'Window')
    return 'DOMWindow';
  if (name$ === 'CanvasPixelArray')
    return 'Uint8ClampedArray';
  if (name$ === 'WebKitMutationObserver')
    return 'MutationObserver';
  if (name$ === 'FormData')
    return 'DOMFormData';
  return name$;
};

$.Primitives_objectTypeName = function(object) {
  var name$ = $.constructorNameFallback(object);
  if ($.eqB(name$, 'Object')) {
    var decompiled = String(object.constructor).match(/^\s*function\s*(\S*)\s*\(/)[1];
    if (typeof decompiled === 'string')
      name$ = decompiled;
  }
  return $.charCodeAt(name$, 0) === 36 ? $.substring$1(name$, 1) : name$;
};

$.leB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a <= b : $.le$slow(a, b) === true;
};

$.isNegative = function(receiver) {
  if (typeof receiver === 'number')
    return receiver === 0 ? 1 / receiver < 0 : receiver < 0;
  else
    return receiver.isNegative$0();
};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver))
    return $.ListIterator$(receiver);
  return receiver.iterator$0();
};

$.Sweep$ = function() {
  return new $.Sweep($.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), 0, 0);
};

$.MassData$ = function() {
  return new $.MassData(0, $.Vector$(0, 0), 0);
};

$.Matrix22_mulTransMatrixAndVectorToOut = function(matrix, vector, out) {
  var outx = $.add($.mul(vector.get$x(), matrix.get$col1().get$x()), $.mul(vector.get$y(), matrix.get$col1().get$y()));
  out.set$y($.add($.mul(vector.get$x(), matrix.get$col2().get$x()), $.mul(vector.get$y(), matrix.get$col2().get$y())));
  out.set$x(outx);
};

$._JsDeserializer$ = function() {
  return new $._JsDeserializer(null);
};

$.Maps_mapToString = function(m) {
  var result = $.StringBufferImpl$('');
  $.Maps__emitMap(m, result, $.ListImplementation_List(null));
  return result.toString$0();
};

$.Collections__emitObject = function(o, result, visiting) {
  if (typeof o === 'object' && o !== null && (o.constructor === Array || o.is$Collection()))
    if ($.Collections__containsRef(visiting, o))
      $.add$1(result, typeof o === 'object' && o !== null && (o.constructor === Array || o.is$List()) ? '[...]' : '{...}');
    else
      $.Collections__emitCollection(o, result, visiting);
  else if (typeof o === 'object' && o !== null && o.is$Map())
    if ($.Collections__containsRef(visiting, o))
      $.add$1(result, '{...}');
    else
      $.Maps__emitMap(o, result, visiting);
  else
    $.add$1(result, o == null ? 'null' : o);
};

$.Maps__emitMap = function(m, result, visiting) {
  var t1 = {};
  $.add$1(visiting, m);
  $.add$1(result, '{');
  t1.first_1 = true;
  $.forEach(m, new $.Maps__emitMap_anon(result, t1, visiting));
  $.add$1(result, '}');
  $.removeLast(visiting);
};

$._IsolateEvent$ = function(isolate, fn, message) {
  return new $._IsolateEvent(isolate, fn, message);
};

$.Collision_clipSegmentToLine = function(vOut, vIn, norm, offset) {
  var t1 = $.index(vIn, 0).get$v();
  var distance0 = $.sub($.add($.mul(norm.get$x(), t1.get$x()), $.mul(norm.get$y(), t1.get$y())), offset);
  var t2 = $.index(vIn, 1).get$v();
  var distance1 = $.sub($.add($.mul(norm.get$x(), t2.get$x()), $.mul(norm.get$y(), t2.get$y())), offset);
  if ($.leB(distance0, 0.0)) {
    $.index(vOut, 0).setFrom$1($.index(vIn, 0));
    var numOut = 1;
  } else
    numOut = 0;
  if ($.leB(distance1, 0.0)) {
    var numOut0 = numOut + 1;
    $.index(vOut, numOut).setFrom$1($.index(vIn, 1));
    numOut = numOut0;
  }
  if ($.ltB($.mul(distance0, distance1), 0.0)) {
    var interp = $.div(distance0, $.sub(distance0, distance1));
    $.index(vOut, numOut).get$v().setFrom$1($.index(vIn, 1).get$v()).subLocal$1($.index(vIn, 0).get$v()).mulLocal$1(interp).addLocal$1($.index(vIn, 0).get$v());
    var vin = $.gtB(distance0, 0.0) ? $.index(vIn, 0) : $.index(vIn, 1);
    $.index(vOut, numOut).get$id().setFrom$1(vin.get$id());
    ++numOut;
  }
  return numOut;
};

$._Device_isFirefox = function() {
  return $.contains$2($._Device_userAgent(), 'Firefox', 0);
};

$.Transform$ = function() {
  return new $.Transform($.Vector$(0, 0), $.Matrix22$(null, null));
};

$.setRange$4 = function(receiver, start, length$, from, startFrom) {
  if (!$.isJsArray(receiver))
    return receiver.setRange$4(start, length$, from, startFrom);
  $.checkMutable(receiver, 'indexed set');
  if (length$ === 0)
    return;
  $.checkNull(start);
  $.checkNull(length$);
  $.checkNull(from);
  $.checkNull(startFrom);
  if (!(typeof start === 'number' && start === (start | 0)))
    throw $.captureStackTrace($.IllegalArgumentException$(start));
  if (!(typeof length$ === 'number' && length$ === (length$ | 0)))
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (!(typeof startFrom === 'number' && startFrom === (startFrom | 0)))
    throw $.captureStackTrace($.IllegalArgumentException$(startFrom));
  if (length$ < 0)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (start < 0)
    throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var t1 = start + length$;
  if ($.gtB(t1, $.get$length(receiver)))
    throw $.captureStackTrace($.IndexOutOfRangeException$(t1));
  $.Arrays_copy(from, startFrom, receiver, start, length$);
};

$.compareTo = function(a, b) {
  if ($.checkNumbers(a, b))
    if ($.ltB(a, b))
      return -1;
    else if ($.gtB(a, b))
      return 1;
    else if ($.eqB(a, b)) {
      if ($.eqB(a, 0)) {
        var aIsNegative = $.isNegative(a);
        if ($.eqB(aIsNegative, $.isNegative(b)))
          return 0;
        if (aIsNegative === true)
          return -1;
        return 1;
      }
      return 0;
    } else if ($.isNaN(a) === true) {
      if ($.isNaN(b) === true)
        return 0;
      return 1;
    } else
      return -1;
  else if (typeof a === 'string') {
    if (!(typeof b === 'string'))
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (a == b)
      var t1 = 0;
    else
      t1 = a < b ? -1 : 1;
    return t1;
  } else
    return a.compareTo$1(b);
};

$.ge = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a >= b : $.ge$slow(a, b);
};

$.Manifold$ = function() {
  var t1 = new $.Manifold($.ListImplementation_List(2, 'ManifoldPoint'), $.Vector$(0, 0), $.Vector$(0, 0), null, 0);
  t1.Manifold$0();
  return t1;
};

$.isEmpty = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver))
    return receiver.length === 0;
  return receiver.isEmpty$0();
};

$.UnsupportedOperationException$ = function(_message) {
  return new $.UnsupportedOperationException(_message);
};

$.Filter$ = function() {
  return new $.Filter(0, 0, 0);
};

$.indexOf$2 = function(receiver, element, start) {
  if ($.isJsArray(receiver)) {
    if (!(typeof start === 'number' && start === (start | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(start));
    return $.Arrays_indexOf(receiver, element, start, receiver.length);
  } else if (typeof receiver === 'string') {
    $.checkNull(element);
    if (!(typeof start === 'number' && start === (start | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(start));
    if (start < 0)
      return -1;
    return receiver.indexOf(element, start);
  }
  return receiver.indexOf$2(element, start);
};

$.addLast = function(receiver, value) {
  if (!$.isJsArray(receiver))
    return receiver.addLast$1(value);
  $.checkGrowable(receiver, 'addLast');
  receiver.push(value);
};

$._Timer$ = function(milliSeconds, callback) {
  var t1 = new $._Timer(true, null);
  t1._Timer$2(milliSeconds, callback);
  return t1;
};

$._JsCopier$ = function() {
  var t1 = new $._JsCopier($._MessageTraverserVisitedMap$());
  t1._JsCopier$0();
  return t1;
};

$.TimeOfImpactConstraint$ = function() {
  var t1 = new $.TimeOfImpactConstraint($.ListImplementation_List(2, 'Vector'), $.Vector$(0, 0), $.Vector$(0, 0), 0, 0, 0, null, null);
  t1.TimeOfImpactConstraint$0();
  return t1;
};

$.NoMoreElementsException$ = function() {
  return new $.NoMoreElementsException();
};

$.Bench2d$ = function() {
  var t1 = new $.Bench2d(null, null, null, null, null);
  t1.Bench2d$0();
  return t1;
};

$._Manager$ = function() {
  var t1 = new $._Manager(0, 0, 1, null, null, null, null, null, null, null, null, null);
  t1._Manager$0();
  return t1;
};

$.add$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a + b;
  return a.operator$add$1(b);
};

$.getRuntimeTypeInfo = function(target) {
  if (target == null)
    return;
  var res = target.builtin$typeInfo;
  return res == null ? {} : res;
};

$.ListImplementation_List$from = function(other, E) {
  var result = $.ListImplementation_List(null);
  for (var t1 = $.iterator(other); t1.hasNext$0() === true;)
    result.push(t1.next$0());
  return result;
};

$.Primitives_newList = function(length$) {
  if (length$ == null)
    return new Array();
  if (!(typeof length$ === 'number' && length$ === (length$ | 0)) || length$ < 0)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var result = new Array(length$);
  result.fixed$length = true;
  return result;
};

$.main = function() {
  var bench2d = $.Bench2d$();
  bench2d.initialize$0();
  bench2d.warmup$0();
  bench2d.bench$0();
};

$.Primitives_dateNow = function() {
  return Date.now();
};

$._WorkerSendPort$ = function(_workerId, isolateId, _receivePortId) {
  return new $._WorkerSendPort(_workerId, _receivePortId, isolateId);
};

$._convertDartToNative_SerializedScriptValue = function(value) {
  return $._convertDartToNative_PrepareForStructuredClone(value);
};

$.IllegalArgumentException$ = function(arg) {
  return new $.IllegalArgumentException(arg);
};

$.ContactManager$ = function(argPool) {
  var t1 = $.ContactFilter$();
  return new $.ContactManager($.BroadPhase$(), null, 0, t1, null, argPool);
};

$.FutureImpl$ = function(T) {
  var t1 = new $.FutureImpl(false, null, null, null, false, [], [], []);
  $.setRuntimeTypeInfo(t1, { 'T': T });
  return t1;
};

$.iae = function(argument) {
  throw $.captureStackTrace($.IllegalArgumentException$(argument));
};

$.Expect_equals = function(expected, actual, reason) {
  if (expected === actual)
    return;
  var msg = reason == null ? '' : ', \'' + $.S(reason) + '\'';
  $.Expect__fail('Expect.equals(expected: <' + $.S(expected) + '>, actual: <' + $.S(actual) + '>' + msg + ') fails.');
};

$._IsolateContext$ = function() {
  var t1 = new $._IsolateContext(null, null, null);
  t1._IsolateContext$0();
  return t1;
};

$.truncate = function(receiver) {
  return receiver < 0 ? $.ceil(receiver) : $.floor(receiver);
};

$.isNaN = function(receiver) {
  if (typeof receiver === 'number')
    return isNaN(receiver);
  else
    return receiver.isNaN$0();
};

$.ClipVertex$ = function() {
  return new $.ClipVertex($.Vector$(0, 0), $.ContactID$());
};

$.SimplexCache$ = function() {
  var t1 = new $.SimplexCache(0, 0, $.ListImplementation_List(3, 'int'), $.ListImplementation_List(3, 'int'));
  t1.SimplexCache$0();
  return t1;
};

$.allMatchesInStringUnchecked = function(needle, haystack) {
  var result = $.ListImplementation_List(null, 'Match');
  var length$ = $.get$length(haystack);
  var patternLength = needle.length;
  for (var startIndex = 0; true;) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1))
      break;
    result.push($.StringMatch$(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$))
      break;
    else
      startIndex = $.eqB(position, endIndex) ? $.add(startIndex, 1) : endIndex;
  }
  return result;
};

$.Vector$copy = function(other) {
  return new $.Vector(other.get$x(), other.get$y());
};

$.le$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a <= b;
  return a.operator$le$1(b);
};

$.Arrays_copy = function(src, srcStart, dst, dstStart, count) {
  if (typeof src !== 'string' && (typeof src !== 'object' || src === null || src.constructor !== Array && !src.is$JavaScriptIndexingBehavior()))
    return $.Arrays_copy$bailout(1, src, srcStart, dst, dstStart, count);
  if (typeof dst !== 'object' || dst === null || (dst.constructor !== Array || !!dst.immutable$list) && !dst.is$JavaScriptIndexingBehavior())
    return $.Arrays_copy$bailout(1, src, srcStart, dst, dstStart, count);
  if (srcStart < dstStart)
    for (var i = srcStart + count - 1, j = dstStart + count - 1; i >= srcStart; --i, --j) {
      if (i < 0 || i >= src.length)
        throw $.ioore(i);
      var t1 = src[i];
      if (j < 0 || j >= dst.length)
        throw $.ioore(j);
      dst[j] = t1;
    }
  else
    for (t1 = srcStart + count, i = srcStart, j = dstStart; i < t1; ++i, ++j) {
      if (i < 0 || i >= src.length)
        throw $.ioore(i);
      var t2 = src[i];
      if (j < 0 || j >= dst.length)
        throw $.ioore(j);
      dst[j] = t2;
    }
};

$.dynamicSetMetadata = function(inputTable) {
  var t1 = $.buildDynamicMetadata(inputTable);
  $._dynamicMetadata(t1);
};

$._convertDartToNative_PrepareForStructuredClone = function(value) {
  var values = [];
  var copies = [];
  var t1 = new $._convertDartToNative_PrepareForStructuredClone_findSlot(copies, values);
  var t2 = new $._convertDartToNative_PrepareForStructuredClone_readSlot(copies);
  var t3 = new $._convertDartToNative_PrepareForStructuredClone_writeSlot(copies);
  var t4 = new $._convertDartToNative_PrepareForStructuredClone_cleanupSlots();
  var copy = new $._convertDartToNative_PrepareForStructuredClone_walk(t1, t2, t3).call$1(value);
  t4.call$0();
  return copy;
};

$.Collision$_construct = function(pool) {
  var t1 = $.DistanceInput$();
  t1 = new $.Collision(pool, $.SimplexCache$(), t1, $.DistanceOutput$(), $.EdgeResults$(), $.EdgeResults$(), $.ListImplementation_List(2, 'ClipVertex'), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.ListImplementation_List(2, 'ClipVertex'), $.ListImplementation_List(2, 'ClipVertex'));
  t1.Collision$_construct$1(pool);
  return t1;
};

$.endsWith = function(receiver, other) {
  $.checkString(other);
  var receiverLength = receiver.length;
  var otherLength = other.length;
  if (otherLength > receiverLength)
    return false;
  return other === $.substring$1(receiver, receiverLength - otherLength);
};

$.ContactFilter$ = function() {
  return new $.ContactFilter();
};

$.ListIterator$ = function(list, T) {
  var t1 = new $.ListIterator(0, list);
  $.setRuntimeTypeInfo(t1, { 'T': T });
  return t1;
};

$.checkNum = function(value) {
  if (!(typeof value === 'number')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$.StopwatchImplementation$ = function() {
  return new $.StopwatchImplementation(null, null);
};

$.Velocity$ = function() {
  var t1 = new $.Velocity(null, null);
  t1.Velocity$0();
  return t1;
};

$.FutureAlreadyCompleteException$ = function() {
  return new $.FutureAlreadyCompleteException();
};

$.ltB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a < b : $.lt$slow(a, b) === true;
};

$._currentIsolate = function() {
  return $._globalState0().get$currentContext();
};

$.convertDartClosureToJS = function(closure, arity) {
  if (closure == null)
    return;
  var function$ = closure.$identity;
  if (!!function$)
    return function$;
  function$ = function() {
    return $.invokeClosure.call$5(closure, $._currentIsolate(), arity, arguments[0], arguments[1]);
  };
  closure.$identity = function$;
  return function$;
};

$._JsSerializer$ = function() {
  var t1 = new $._JsSerializer(0, $._MessageTraverserVisitedMap$());
  t1._JsSerializer$0();
  return t1;
};

$.TimeOfImpactSolver$ = function() {
  var t1 = new $.TimeOfImpactSolver($.ListImplementation_List(4, 'TimeOfImpactConstraint'), 0, null, $.TimeOfImpactSolverManifold$(), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0));
  t1.TimeOfImpactSolver$0();
  return t1;
};

$._FixedSizeListIterator$ = function(array, T) {
  var t1 = new $._FixedSizeListIterator($.get$length(array), array, 0);
  $.setRuntimeTypeInfo(t1, { 'T': T });
  return t1;
};

$.Pair$ = function() {
  return new $.Pair(null, null);
};

$._Device_userAgent = function() {
  return $.window().get$navigator().get$userAgent();
};

$.Distance$_construct = function() {
  return new $.Distance(0, 0, 20, $.Simplex$(), $.ListImplementation_List(3, 'int'), $.ListImplementation_List(3, 'int'), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0));
};

$.getRange = function(receiver, start, length$) {
  if (!$.isJsArray(receiver))
    return receiver.getRange$2(start, length$);
  if (0 === length$)
    return [];
  $.checkNull(start);
  $.checkNull(length$);
  if (!(typeof length$ === 'number' && length$ === (length$ | 0)))
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var t1 = length$ < 0;
  if (t1)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (start < 0)
    throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var end = start + length$;
  if ($.gtB(end, $.get$length(receiver)))
    throw $.captureStackTrace($.IndexOutOfRangeException$(length$));
  if (t1)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  return receiver.slice(start, end);
};

$._DoubleLinkedQueueIterator$ = function(_sentinel, E) {
  var t1 = new $._DoubleLinkedQueueIterator(_sentinel, null);
  $.setRuntimeTypeInfo(t1, { 'E': E });
  t1._DoubleLinkedQueueIterator$1(_sentinel);
  return t1;
};

$.S = function(value) {
  var res = $.toString(value);
  if (!(typeof res === 'string'))
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  return res;
};

$._dynamicMetadata = function(table) {
  $dynamicMetadata = table;
};

$._Lists_getRange = function(a, start, length$, accumulator) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))
    return $._Lists_getRange$bailout(1, a, start, length$, accumulator);
  if ($.ltB(length$, 0))
    throw $.captureStackTrace($.IllegalArgumentException$('length'));
  if (start < 0)
    throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  if (typeof length$ !== 'number')
    throw $.iae(length$);
  var end = start + length$;
  if (end > a.length)
    throw $.captureStackTrace($.IndexOutOfRangeException$(end));
  for (var i = start; i < end; ++i) {
    if (i < 0 || i >= a.length)
      throw $.ioore(i);
    accumulator.push(a[i]);
  }
  return accumulator;
};

$.LinkedHashMapImplementation$ = function(K, V) {
  var t1 = new $.LinkedHashMapImplementation(null, null);
  $.setRuntimeTypeInfo(t1, { 'K': K, 'V': V });
  t1.LinkedHashMapImplementation$0();
  return t1;
};

$._dynamicMetadata0 = function() {
  if (typeof($dynamicMetadata) === 'undefined') {
    var t1 = [];
    $._dynamicMetadata(t1);
  }
  return $dynamicMetadata;
};

$._PendingSendPortFinder$ = function() {
  var t1 = $._MessageTraverserVisitedMap$();
  t1 = new $._PendingSendPortFinder([], t1);
  t1._PendingSendPortFinder$0();
  return t1;
};

$.checkNull = function(object) {
  if (object == null)
    throw $.captureStackTrace($.NullPointerException$(null, $.CTC));
  return object;
};

$.ManifoldPoint$ = function() {
  return new $.ManifoldPoint($.Vector$(0, 0), 0, 0, $.ContactID$());
};

$.CompleterImpl$ = function(T) {
  var t1 = new $.CompleterImpl($.FutureImpl$());
  $.setRuntimeTypeInfo(t1, { 'T': T });
  return t1;
};

$.TimeOfImpactInput$ = function() {
  return new $.TimeOfImpactInput($.DistanceProxy$(), $.DistanceProxy$(), $.Sweep$(), $.Sweep$(), 0);
};

$.StackTrace$ = function(stack) {
  return new $.StackTrace(stack);
};

$._fillStatics = function(context) {
  $globals = context.isolateStatics;
  $static_init();

};

$.DoubleLinkedQueue$ = function(E) {
  var t1 = new $.DoubleLinkedQueue(null);
  $.setRuntimeTypeInfo(t1, { 'E': E });
  t1.DoubleLinkedQueue$0();
  return t1;
};

$.DualPivotQuicksort_insertionSort_ = function(a, left, right, compare) {
  if (typeof a !== 'object' || a === null || (a.constructor !== Array || !!a.immutable$list) && !a.is$JavaScriptIndexingBehavior())
    return $.DualPivotQuicksort_insertionSort_$bailout(1, a, left, right, compare);
  if (typeof right !== 'number')
    return $.DualPivotQuicksort_insertionSort_$bailout(1, a, left, right, compare);
  for (var i = left + 1; i <= right; ++i) {
    if (i !== (i | 0))
      throw $.iae(i);
    if (i < 0 || i >= a.length)
      throw $.ioore(i);
    var el = a[i];
    var j = i;
    while (true) {
      if (j > left) {
        var t1 = j - 1;
        if (t1 !== (t1 | 0))
          throw $.iae(t1);
        if (t1 < 0 || t1 >= a.length)
          throw $.ioore(t1);
        var t2 = $.gtB(compare.call$2(a[t1], el), 0);
        t1 = t2;
      } else
        t1 = false;
      if (!t1)
        break;
      var j0 = j - 1;
      if (j0 !== (j0 | 0))
        throw $.iae(j0);
      t1 = a.length;
      if (j0 < 0 || j0 >= t1)
        throw $.ioore(j0);
      t2 = a[j0];
      if (j !== (j | 0))
        throw $.iae(j);
      if (j < 0 || j >= t1)
        throw $.ioore(j);
      a[j] = t2;
      j = j0;
    }
    if (j !== (j | 0))
      throw $.iae(j);
    if (j < 0 || j >= a.length)
      throw $.ioore(j);
    a[j] = el;
  }
};

$.PolygonContact$ = function(argPool) {
  var t1 = $.Manifold$();
  return new $.PolygonContact(null, null, null, $.ContactEdge$(), $.ContactEdge$(), null, null, t1, null, argPool, $.Manifold$());
};

$.checkNumbers = function(a, b) {
  if (typeof a === 'number')
    if (typeof b === 'number')
      return true;
    else {
      $.checkNull(b);
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    }
  return false;
};

$._DoubleLinkedQueueEntrySentinel$ = function(E) {
  var t1 = new $._DoubleLinkedQueueEntrySentinel(null, null, null);
  $.setRuntimeTypeInfo(t1, { 'E': E });
  t1.DoubleLinkedQueueEntry$1(null);
  t1._DoubleLinkedQueueEntrySentinel$0();
  return t1;
};

$.lt$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a < b;
  return a.operator$lt$1(b);
};

$.WorldQueryWrapper$ = function() {
  return new $.WorldQueryWrapper(null, null);
};

$.Vector_crossNumAndVectorToOut = function(s, a, out) {
  var tempY = $.mul(s, a.get$x());
  out.set$x($.mul($.neg(s), a.get$y()));
  out.set$y(tempY);
};

$.index$slow = function(a, index) {
  if (typeof a === 'string' || $.isJsArray(a)) {
    if (!(typeof index === 'number' && index === (index | 0))) {
      if (!(typeof index === 'number'))
        throw $.captureStackTrace($.IllegalArgumentException$(index));
      if (!($.truncate(index) === index))
        throw $.captureStackTrace($.IllegalArgumentException$(index));
    }
    if ($.ltB(index, 0) || $.geB(index, $.get$length(a)))
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return a[index];
  }
  return a.operator$index$1(index);
};

$.Features$ = function() {
  return new $.Features(0, 0, 0, 0);
};

$.ContactEdge$ = function() {
  return new $.ContactEdge(null, null, null, null);
};

$.AxisAlignedBox$ = function(lowerBound, upperBound) {
  var t1 = new $.AxisAlignedBox(lowerBound, upperBound);
  t1.AxisAlignedBox$2(lowerBound, upperBound);
  return t1;
};

$._globalState0 = function() {
return $globalState;
};

$._globalState = function(val) {
$globalState = val;
};

$._ReceivePortImpl$ = function() {
  var t1 = $._ReceivePortImpl__nextFreeId;
  $._ReceivePortImpl__nextFreeId = $.add(t1, 1);
  t1 = new $._ReceivePortImpl(t1, null);
  t1._ReceivePortImpl$0();
  return t1;
};

$.contains$2 = function(receiver, other, startIndex) {
  if (!(typeof receiver === 'string'))
    return receiver.contains$2(other, startIndex);
  $.checkNull(other);
  return $.stringContainsUnchecked(receiver, other, startIndex);
};

$._MainManagerStub$ = function() {
  return new $._MainManagerStub();
};

$.toString = function(value) {
  if (typeof value == "object" && value !== null)
    if ($.isJsArray(value))
      return $.Collections_collectionToString(value);
    else
      return value.toString$0();
  if (value === 0 && (1 / value) < 0)
    return '-0.0';
  if (value == null)
    return 'null';
  if (typeof value == "function")
    return 'Closure';
  return String(value);
};

$.DynamicTree$ = function() {
  var t1 = $.ListImplementation_List(4, 'Vector');
  var t2 = $.Vector$(0, 0);
  var t3 = $.AxisAlignedBox$(null, null);
  t3 = new $.DynamicTree(null, 0, null, 0, 0, $.DoubleLinkedQueue$('DynamicTreeNode'), t1, 0, t2, t3, $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0));
  t3.DynamicTree$0();
  return t3;
};

$.StringImplementation__toJsStringArray = function(strings) {
  if (typeof strings !== 'object' || strings === null || (strings.constructor !== Array || !!strings.immutable$list) && !strings.is$JavaScriptIndexingBehavior())
    return $.StringImplementation__toJsStringArray$bailout(1, strings);
  $.checkNull(strings);
  var length$ = strings.length;
  if ($.isJsArray(strings)) {
    for (var i = 0; i < length$; ++i) {
      if (i < 0 || i >= strings.length)
        throw $.ioore(i);
      var string = strings[i];
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListImplementation_List(length$);
    for (i = 0; i < length$; ++i) {
      if (i < 0 || i >= strings.length)
        throw $.ioore(i);
      string = strings[i];
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
      if (i < 0 || i >= array.length)
        throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$.Island$ = function() {
  return new $.Island(null, null, null, null, null, null, null, null, null, null, null, null, null, $.ContactSolver$(), $.Vector$(0, 0), $.ContactImpulse$());
};

$.IndexOutOfRangeException$ = function(_value) {
  return new $.IndexOutOfRangeException(_value);
};

$.Transform_mulTransToOut = function(T, v, out) {
  var v1x = $.sub(v.get$x(), T.get$position().get$x());
  var v1y = $.sub(v.get$y(), T.get$position().get$y());
  var b = T.get$rotation().get$col1();
  var b1 = T.get$rotation().get$col2();
  var tempy = $.add($.mul(v1x, b1.get$x()), $.mul(v1y, b1.get$y()));
  out.set$x($.add($.mul(v1x, b.get$x()), $.mul(v1y, b.get$y())));
  out.set$y(tempy);
};

$._MessageTraverserVisitedMap$ = function() {
  return new $._MessageTraverserVisitedMap();
};

$.getTraceFromException = function(exception) {
  return $.StackTrace$(exception.stack);
};

$.charCodeAt = function(receiver, index) {
  if (typeof receiver === 'string') {
    if (index < 0)
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    if (index >= receiver.length)
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return receiver.charCodeAt(index);
  } else
    return receiver.charCodeAt$1(index);
};

$.removeLast = function(receiver) {
  if ($.isJsArray(receiver)) {
    $.checkGrowable(receiver, 'removeLast');
    if ($.get$length(receiver) === 0)
      throw $.captureStackTrace($.IndexOutOfRangeException$(-1));
    return receiver.pop();
  }
  return receiver.removeLast$0();
};

$._EventLoop$ = function() {
  return new $._EventLoop($.DoubleLinkedQueue$('_IsolateEvent'));
};

$.Collections_collectionToString = function(c) {
  var result = $.StringBufferImpl$('');
  $.Collections__emitCollection(c, result, $.ListImplementation_List(null));
  return result.toString$0();
};

$.ContactConstraintPoint$ = function() {
  return new $.ContactConstraintPoint($.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), 0, 0, 0, 0, 0);
};

$.MetaInfo$ = function(_tag, _tags, _set) {
  return new $.MetaInfo(_tag, _tags, _set);
};

$.KeyValuePair$ = function(key, value, K, V) {
  var t1 = new $.KeyValuePair(key, value);
  $.setRuntimeTypeInfo(t1, { 'K': K, 'V': V });
  return t1;
};

$.ContactRegister$ = function() {
  return new $.ContactRegister(null, false);
};

$._NativeJsSendPort$ = function(_receivePort, isolateId) {
  return new $._NativeJsSendPort(_receivePort, isolateId);
};

$.defineProperty = function(obj, property, value) {
  Object.defineProperty(obj, property,
      {value: value, enumerable: false, writable: true, configurable: true});
};

$.dynamicFunction = function(name$) {
  var f = Object.prototype[name$];
  if (!(f == null) && !!f.methods)
    return f.methods;
  var methods = {};
  var dartMethod = Object.getPrototypeOf($.CTC18)[name$];
  if (!(dartMethod == null))
    $.propertySet(methods, 'Object', dartMethod);
  var bind = function() {return $.dynamicBind.call$4(this, name$, methods, Array.prototype.slice.call(arguments));};
  bind.methods = methods;
  $.defineProperty(Object.prototype, name$, bind);
  return methods;
};

$.print = function(object) {
  $.PrintImplementation_print(object);
};

$.checkString = function(value) {
  if (!(typeof value === 'string')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$.div = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a / b : $.div$slow(a, b);
};

$.PrintImplementation_print = function(obj) {
  if (typeof obj === 'string')
    $.Primitives_printString(obj);
  else
    $.Primitives_printString($.toString(obj));
};

$._callInIsolate = function(isolate, function$) {
  isolate.eval$1(function$);
  $._globalState0().get$topEventLoop().run$0();
};

$.Matrix22$ = function(c1, c2) {
  var t1 = new $.Matrix22(null, null);
  t1.Matrix22$2(c1, c2);
  return t1;
};

$.Primitives_objectToString = function(object) {
  return 'Instance of \'' + $.S($.Primitives_objectTypeName(object)) + '\'';
};

$.Arrays_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))
    return $.Arrays_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (startIndex >= a.length)
    return -1;
  if (startIndex < 0)
    startIndex = 0;
  for (var i = startIndex; i < endIndex; ++i) {
    if (i < 0 || i >= a.length)
      throw $.ioore(i);
    if ($.eqB(a[i], element))
      return i;
  }
  return -1;
};

$._Lists_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))
    return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof startIndex !== 'number')
    return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof endIndex !== 'number')
    return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (startIndex >= a.length)
    return -1;
  if (startIndex < 0)
    startIndex = 0;
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0))
      throw $.iae(i);
    if (i < 0 || i >= a.length)
      throw $.ioore(i);
    if ($.eqB(a[i], element))
      return i;
  }
  return -1;
};

$.set$length = function(receiver, newLength) {
  if ($.isJsArray(receiver)) {
    $.checkNull(newLength);
    if (!(typeof newLength === 'number' && newLength === (newLength | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(newLength));
    if (newLength < 0)
      throw $.captureStackTrace($.IndexOutOfRangeException$(newLength));
    $.checkGrowable(receiver, 'set length');
    receiver.length = newLength;
  } else
    receiver.set$length(newLength);
  return newLength;
};

$.ioore = function(index) {
  throw $.captureStackTrace($.IndexOutOfRangeException$(index));
};

$.typeNameInFirefox = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if (name$ === 'Window')
    return 'DOMWindow';
  if (name$ === 'Document')
    return 'HTMLDocument';
  if (name$ === 'XMLDocument')
    return 'Document';
  if (name$ === 'WorkerMessageEvent')
    return 'MessageEvent';
  if (name$ === 'DragEvent')
    return 'MouseEvent';
  if (name$ === 'DataTransfer')
    return 'Clipboard';
  if (name$ === 'FormData')
    return 'DOMFormData';
  return name$;
};

$.forEach = function(receiver, f) {
  if (!$.isJsArray(receiver))
    return receiver.forEach$1(f);
  else
    return $.Collections_forEach(receiver, f);
};

$.gt$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a > b;
  return a.operator$gt$1(b);
};

$.PositionSolverManifold$ = function() {
  return new $.PositionSolverManifold($.Vector$(0, 0), $.Vector$(0, 0), 0, $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0));
};

$.Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true;)
    f.call$1(t1.next$0());
};

$.DistanceProxy$ = function() {
  var t1 = new $.DistanceProxy($.ListImplementation_List(8, 'Vector'), 0, 0);
  t1.DistanceProxy$0();
  return t1;
};

$.hashCode = function(receiver) {
  if (typeof receiver === 'number')
    return receiver & 0x1FFFFFFF;
  if (!(typeof receiver === 'string'))
    return receiver.hashCode$0();
  var length$ = receiver.length;
  for (var hash = 0, i = 0; i < length$; ++i) {
    var hash0 = 536870911 & hash + receiver.charCodeAt(i);
    var hash1 = 536870911 & hash0 + 524287 & hash0 << 10;
    hash1 = (hash1 ^ $.shr(hash1, 6)) >>> 0;
    hash = hash1;
  }
  hash0 = 536870911 & hash + 67108863 & hash << 3;
  hash0 = (hash0 ^ $.shr(hash0, 11)) >>> 0;
  return 536870911 & hash0 + 16383 & hash0 << 15;
};

$._JsVisitedMap$ = function() {
  return new $._JsVisitedMap(null);
};

$.makeLiteralMap = function(keyValuePairs) {
  var iterator = $.iterator(keyValuePairs);
  var result = $.LinkedHashMapImplementation$();
  for (; iterator.hasNext$0() === true;)
    result.operator$indexSet$2(iterator.next$0(), iterator.next$0());
  return result;
};

$.min = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') {
      if (a > b)
        return b;
      if (a < b)
        return a;
      if (typeof b === 'number') {
        if (typeof a === 'number')
          if (a === 0.0)
            return (a + b) * a * b;
        if (a === 0 && $.isNegative(b) === true || $.isNaN(b) === true)
          return b;
        return a;
      }
      return a;
    }
    throw $.captureStackTrace($.IllegalArgumentException$(b));
  }
  throw $.captureStackTrace($.IllegalArgumentException$(a));
};

$._Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true;)
    f.call$1(t1.next$0());
};

$.startsWith = function(receiver, other) {
  $.checkString(other);
  var length$ = other.length;
  if (length$ > receiver.length)
    return false;
  return other == receiver.substring(0, length$);
};

$.toStringForNativeObject = function(obj) {
  return 'Instance of ' + $.getTypeNameOf(obj);
};

$.Fixture$ = function() {
  return new $.Fixture($.AxisAlignedBox$(null, null), null, null, null, null, null, null, null, $.Filter$(), null, null, $.AxisAlignedBox$(null, null), $.AxisAlignedBox$(null, null));
};

$.dynamicBind = function(obj, name$, methods, arguments$) {
  var tag = $.getTypeNameOf(obj);
  var method = methods[tag];
  if (method == null && !($._dynamicMetadata0() == null))
    for (var i = 0; i < $._dynamicMetadata0().length; ++i) {
      var entry = $._dynamicMetadata0()[i];
      if (entry.get$_set()[tag]) {
        method = methods[entry.get$_tag()];
        if (!(method == null))
          break;
      }
    }
  if (method == null)
    method = methods['Object'];
  var proto = Object.getPrototypeOf(obj);
  if (method == null)
    method = function () {if (Object.getPrototypeOf(this) === proto) {throw new TypeError(name$ + " is not a function");} else {return Object.prototype[name$].apply(this, arguments);}};
  if (!proto.hasOwnProperty(name$))
    $.defineProperty(proto, name$, method);
  return method.apply(obj, arguments$);
};

$.getFunctionForTypeNameOf = function() {
  if (!(typeof(navigator) === 'object'))
    return $.typeNameInChrome;
  var userAgent = navigator.userAgent;
  if ($.contains(userAgent, 'Chrome') || $.contains(userAgent, 'DumpRenderTree'))
    return $.typeNameInChrome;
  else if ($.contains(userAgent, 'Firefox'))
    return $.typeNameInFirefox;
  else if ($.contains(userAgent, 'MSIE'))
    return $.typeNameInIE;
  else if ($.contains(userAgent, 'Opera'))
    return $.typeNameInOpera;
  else if ($.contains(userAgent, 'Safari'))
    return $.typeNameInSafari;
  else
    return $.constructorNameFallback;
};

$._waitForPendingPorts = function(message, callback) {
  var finder = $._PendingSendPortFinder$();
  finder.traverse$1(message);
  $.Futures_wait(finder.ports).then$1(new $._waitForPendingPorts_anon(callback));
};

$.ContactID$ = function() {
  return new $.ContactID($.Features$());
};

$.World$ = function(gravity, doSleep, argPool) {
  var t1 = new $.World(4, null, null, null, 0, 0, gravity, doSleep, null, null, null, argPool, 0, true, true, $.ListImplementation_List(2, 'List<ContactRegister>'), $.Vector$(0, 0), $.Vector$(0, 0), $.TimeStep$(), $.Vector$(0, 0), $.Vector$(0, 0), $.WorldQueryWrapper$(), $.TimeOfImpactInput$(), $.TimeOfImpactOutput$(), $.Sweep$(), $.TimeOfImpactSolver$(), $.ListImplementation_List(32, 'Contact'), $.Island$(), $.ListImplementation_List(10, 'Body'));
  t1.World$3(gravity, doSleep, argPool);
  return t1;
};

$.DistanceOutput$ = function() {
  return new $.DistanceOutput($.Vector$(0, 0), $.Vector$(0, 0), null, null);
};

$.xor = function(a, b) {
  if ($.checkNumbers(a, b))
    return (a ^ b) >>> 0;
  return a.operator$xor$1(b);
};

$.sin = function(value) {
  return Math.sin($.checkNum(value));
};

$.DualPivotQuicksort__doSort = function(a, left, right, compare) {
  if ($.leB($.sub(right, left), 32))
    $.DualPivotQuicksort_insertionSort_(a, left, right, compare);
  else
    $.DualPivotQuicksort__dualPivotQuicksort(a, left, right, compare);
};

$.ListImplementation_List = function(length$, E) {
  return $.Primitives_newList(length$);
};

$.index = function(a, index) {
  if (typeof a == "string" || a.constructor === Array) {
    var key = index >>> 0;
    if (key === index && key < a.length)
      return a[key];
  }
  return $.index$slow(a, index);
};

$.sort = function(receiver, compare) {
  if (!$.isJsArray(receiver))
    return receiver.sort$1(compare);
  $.checkMutable(receiver, 'sort');
  $.DualPivotQuicksort_sort(receiver, compare);
};

$.captureStackTrace = function(ex) {
  if (ex == null)
    ex = $.CTC0;
  var jsError = new Error();
  jsError.name = ex;
  jsError.description = ex;
  jsError.dartException = ex;
  jsError.toString = $.toStringWrapper.call$0;
  return jsError;
};

$.PolygonShape$ = function() {
  var t1 = $.ListImplementation_List(8, 'Vector');
  var t2 = $.ListImplementation_List(8, 'Vector');
  t2 = new $.PolygonShape($.Vector$(0, 0), t1, t2, 0, 1, 0.01);
  t2.PolygonShape$0();
  return t2;
};

$.PolygonShape$copy = function(other) {
  var t1 = other.get$radius();
  var t2 = other.get$vertexCount();
  var t3 = $.ListImplementation_List(8, 'Vector');
  var t4 = $.ListImplementation_List(8, 'Vector');
  t1 = new $.PolygonShape($.Vector$copy(other.get$centroid()), t3, t4, t2, 1, t1);
  t1.PolygonShape$copy$1(other);
  return t1;
};

$.DualPivotQuicksort_sort = function(a, compare) {
  $.DualPivotQuicksort__doSort(a, 0, $.sub($.get$length(a), 1), compare);
};

$.StackOverflowException$ = function() {
  return new $.StackOverflowException();
};

$.eq = function(a, b) {
  if (a == null)
    return b == null;
  if (b == null)
    return false;
  if (typeof a === "object")
    if (!!a.operator$eq$1)
      return a.operator$eq$1(b);
  return a === b;
};

$.StringBufferImpl$ = function(content$) {
  var t1 = new $.StringBufferImpl(null, null);
  t1.StringBufferImpl$1(content$);
  return t1;
};

$.Position$ = function() {
  var t1 = new $.Position(null, null);
  t1.Position$0();
  return t1;
};

$.HashMapImplementation$ = function(K, V) {
  var t1 = new $.HashMapImplementation(null, null, null, null, null);
  $.setRuntimeTypeInfo(t1, { 'K': K, 'V': V });
  t1.HashMapImplementation$0();
  return t1;
};

$.substring$1 = function(receiver, startIndex) {
  if (!(typeof receiver === 'string'))
    return receiver.substring$1(startIndex);
  return $.substring$2(receiver, startIndex, null);
};

$.div$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a / b;
  return a.operator$div$1(b);
};

$.FixtureDef$ = function() {
  var t1 = new $.FixtureDef(null, null, 0.2, 0, 0, false, $.Filter$());
  t1.FixtureDef$0();
  return t1;
};

$.TimeOfImpactOutput$ = function() {
  return new $.TimeOfImpactOutput(0, 0);
};

$.Simplex$ = function() {
  var t1 = $.SimplexVertex$();
  var t2 = $.SimplexVertex$();
  var t3 = $.SimplexVertex$();
  var t4 = $.ListImplementation_List(3, 'SimplexVertex');
  var t5 = $.Vector$(0, 0);
  var t6 = $.Vector$(0, 0);
  t6 = new $.Simplex(t1, t2, t3, t4, 0, t5, $.Vector$(0, 0), t6, $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0));
  t6.Simplex$0();
  return t6;
};

$.BodyDef$ = function() {
  return new $.BodyDef(0, 0, null, $.Vector$(0, 0), $.Vector$(0, 0), 0, false, null, false, true, 0, 0, true, true);
};

$.gtB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a > b : $.gt$slow(a, b) === true;
};

$.Expect__fail = function(message) {
  throw $.captureStackTrace($.ExpectException$(message));
};

$.setRuntimeTypeInfo = function(target, typeInfo) {
  if (!(target == null))
    target.builtin$typeInfo = typeInfo;
};

$.SimplexVertex$ = function() {
  return new $.SimplexVertex($.Vector$(0, 0), $.Vector$(0, 0), $.Vector$(0, 0), 0, 0, 0);
};

$.shl = function(a, b) {
  if ($.checkNumbers(a, b)) {
    if (b < 0)
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (b > 31)
      return 0;
    return (a << b) >>> 0;
  }
  return a.operator$shl$1(b);
};

$.FutureNotCompleteException$ = function() {
  return new $.FutureNotCompleteException();
};

$.NoSuchMethodException$ = function(_receiver, _functionName, _arguments, existingArgumentNames) {
  return new $.NoSuchMethodException(_receiver, _functionName, _arguments, existingArgumentNames);
};

$.lt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a < b : $.lt$slow(a, b);
};

$.unwrapException = function(ex) {
  if ("dartException" in ex)
    return ex.dartException;
  var message = ex.message;
  if (ex instanceof TypeError) {
    var type = ex.type;
    var name$ = ex.arguments ? ex.arguments[0] : "";
    if ($.eqB(type, 'property_not_function') || $.eqB(type, 'called_non_callable') || $.eqB(type, 'non_object_property_call') || $.eqB(type, 'non_object_property_load'))
      if (typeof name$ === 'string' && $.startsWith(name$, 'call$') === true)
        return $.ObjectNotClosureException$();
      else
        return $.NullPointerException$(null, $.CTC);
    else if ($.eqB(type, 'undefined_method'))
      if (typeof name$ === 'string' && $.startsWith(name$, 'call$') === true)
        return $.ObjectNotClosureException$();
      else
        return $.NoSuchMethodException$('', name$, [], null);
    var ieErrorCode = ex.number & 0xffff;
    var ieFacilityNumber = ex.number>>16 & 0x1FFF;
    if (typeof message === 'string')
      if ($.endsWith(message, 'is null') === true || $.endsWith(message, 'is undefined') === true || $.endsWith(message, 'is null or undefined') === true)
        return $.NullPointerException$(null, $.CTC);
      else {
        if ($.contains$1(message, ' is not a function') !== true)
          var t1 = ieErrorCode === 438 && ieFacilityNumber === 10;
        else
          t1 = true;
        if (t1)
          return $.NoSuchMethodException$('', '<unknown>', [], null);
      }
    return $.ExceptionImplementation$(typeof message === 'string' ? message : '');
  }
  if (ex instanceof RangeError) {
    if (typeof message === 'string' && $.contains$1(message, 'call stack') === true)
      return $.StackOverflowException$();
    return $.IllegalArgumentException$('');
  }
  if (typeof InternalError == 'function' && ex instanceof InternalError)
    if (typeof message === 'string' && message === 'too much recursion')
      return $.StackOverflowException$();
  return ex;
};

$.ceil = function(receiver) {
  return Math.ceil(receiver);
};

$.getTypeNameOf = function(obj) {
  if ($._getTypeNameOf == null)
    $._getTypeNameOf = $.getFunctionForTypeNameOf();
  return $._getTypeNameOf.call$1(obj);
};

$.cos = function(value) {
  return Math.cos($.checkNum(value));
};

$.sub = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a - b : $.sub$slow(a, b);
};

$.Transform_mulToOut = function(transform, vector, out) {
  var tempY = $.add($.add(transform.get$position().get$y(), $.mul(transform.get$rotation().get$col1().get$y(), vector.get$x())), $.mul(transform.get$rotation().get$col2().get$y(), vector.get$y()));
  out.set$x($.add($.add(transform.get$position().get$x(), $.mul(transform.get$rotation().get$col1().get$x(), vector.get$x())), $.mul(transform.get$rotation().get$col2().get$x(), vector.get$y())));
  out.set$y(tempY);
};

$.DualPivotQuicksort__dualPivotQuicksort$bailout = function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13) {
  switch (state) {
    case 1:
      var a = env0;
      var left = env1;
      var right = env2;
      var compare = env3;
      break;
    case 2:
      a = env0;
      less = env1;
      k = env2;
      compare = env3;
      left = env4;
      great = env5;
      index1 = env6;
      index5 = env7;
      el2 = env8;
      pivots_are_equal = env9;
      right = env10;
      ak = env11;
      comp = env12;
      el4 = env13;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var sixth = $.tdiv($.add($.sub(right, left), 1), 6);
      if (typeof sixth !== 'number')
        throw $.iae(sixth);
      var index1 = left + sixth;
      var index5 = $.sub(right, sixth);
      if (typeof right !== 'number')
        throw $.iae(right);
      var index3 = $.tdiv(left + right, 2);
      var index2 = index3 - sixth;
      var index4 = index3 + sixth;
      var el1 = $.index(a, index1);
      var el2 = $.index(a, index2);
      var el3 = $.index(a, index3);
      var el4 = $.index(a, index4);
      var el5 = $.index(a, index5);
      if ($.gtB(compare.call$2(el1, el2), 0)) {
        var t0 = el1;
        el1 = el2;
        el2 = t0;
      }
      if ($.gtB(compare.call$2(el4, el5), 0)) {
        t0 = el5;
        el5 = el4;
        el4 = t0;
      }
      if ($.gtB(compare.call$2(el1, el3), 0)) {
        t0 = el3;
        el3 = el1;
        el1 = t0;
      }
      if ($.gtB(compare.call$2(el2, el3), 0)) {
        t0 = el3;
        el3 = el2;
        el2 = t0;
      }
      if ($.gtB(compare.call$2(el1, el4), 0)) {
        t0 = el1;
        el1 = el4;
        el4 = t0;
      }
      if ($.gtB(compare.call$2(el3, el4), 0)) {
        t0 = el3;
        el3 = el4;
        el4 = t0;
      }
      if ($.gtB(compare.call$2(el2, el5), 0)) {
        t0 = el2;
        el2 = el5;
        el5 = t0;
      }
      if ($.gtB(compare.call$2(el2, el3), 0)) {
        t0 = el3;
        el3 = el2;
        el2 = t0;
      }
      if ($.gtB(compare.call$2(el4, el5), 0)) {
        t0 = el5;
        el5 = el4;
        el4 = t0;
      }
      $.indexSet(a, index1, el1);
      $.indexSet(a, index3, el3);
      $.indexSet(a, index5, el5);
      $.indexSet(a, index2, $.index(a, left));
      $.indexSet(a, index4, $.index(a, right));
      var less = left + 1;
      var great = right - 1;
      var pivots_are_equal = $.eqB(compare.call$2(el2, el4), 0);
    case 2:
      if (state === 2 || state === 0 && pivots_are_equal)
        switch (state) {
          case 0:
            var k = less;
          case 2:
            L0:
              while (true)
                switch (state) {
                  case 0:
                    if (!(k <= great))
                      break L0;
                  case 2:
                    c$0: {
                      switch (state) {
                        case 0:
                          var ak = $.index(a, k);
                          var comp = compare.call$2(ak, el2);
                        case 2:
                          state = 0;
                          if ($.eqB(comp, 0))
                            break c$0;
                          if ($.ltB(comp, 0)) {
                            if (!(k === less)) {
                              $.indexSet(a, k, $.index(a, less));
                              $.indexSet(a, less, ak);
                            }
                            ++less;
                          } else
                            for (var less0 = less + 1; true;) {
                              comp = compare.call$2($.index(a, great), el2);
                              if ($.gtB(comp, 0)) {
                                --great;
                                continue;
                              } else if ($.ltB(comp, 0)) {
                                $.indexSet(a, k, $.index(a, less));
                                $.indexSet(a, less, $.index(a, great));
                                var great0 = great - 1;
                                $.indexSet(a, great, ak);
                                great = great0;
                                less = less0;
                                break;
                              } else {
                                $.indexSet(a, k, $.index(a, great));
                                great0 = great - 1;
                                $.indexSet(a, great, ak);
                                great = great0;
                                break;
                              }
                            }
                      }
                    }
                    ++k;
                }
        }
      else
        for (k = less; k <= great; ++k) {
          ak = $.index(a, k);
          if ($.ltB(compare.call$2(ak, el2), 0)) {
            if (!(k === less)) {
              $.indexSet(a, k, $.index(a, less));
              $.indexSet(a, less, ak);
            }
            ++less;
          } else if ($.gtB(compare.call$2(ak, el4), 0))
            for (less0 = less + 1; true;)
              if ($.gtB(compare.call$2($.index(a, great), el4), 0)) {
                --great;
                if (great < k)
                  break;
                continue;
              } else {
                if ($.ltB(compare.call$2($.index(a, great), el2), 0)) {
                  $.indexSet(a, k, $.index(a, less));
                  $.indexSet(a, less, $.index(a, great));
                  great0 = great - 1;
                  $.indexSet(a, great, ak);
                  great = great0;
                  less = less0;
                } else {
                  $.indexSet(a, k, $.index(a, great));
                  great0 = great - 1;
                  $.indexSet(a, great, ak);
                  great = great0;
                }
                break;
              }
        }
      var t1 = less - 1;
      $.indexSet(a, left, $.index(a, t1));
      $.indexSet(a, t1, el2);
      $.indexSet(a, right, $.index(a, great + 1));
      $.indexSet(a, great + 1, el4);
      $.DualPivotQuicksort__doSort(a, left, less - 2, compare);
      $.DualPivotQuicksort__doSort(a, great + 2, right, compare);
      if (pivots_are_equal)
        return;
      if (less < index1 && $.gtB(great, index5)) {
        for (; $.eqB(compare.call$2($.index(a, less), el2), 0);)
          ++less;
        for (; $.eqB(compare.call$2($.index(a, great), el4), 0);)
          --great;
        for (k = less; k <= great; ++k) {
          ak = $.index(a, k);
          if ($.eqB(compare.call$2(ak, el2), 0)) {
            if (!(k === less)) {
              $.indexSet(a, k, $.index(a, less));
              $.indexSet(a, less, ak);
            }
            ++less;
          } else if ($.eqB(compare.call$2(ak, el4), 0))
            for (less0 = less + 1; true;)
              if ($.eqB(compare.call$2($.index(a, great), el4), 0)) {
                --great;
                if (great < k)
                  break;
                continue;
              } else {
                if ($.ltB(compare.call$2($.index(a, great), el2), 0)) {
                  $.indexSet(a, k, $.index(a, less));
                  $.indexSet(a, less, $.index(a, great));
                  great0 = great - 1;
                  $.indexSet(a, great, ak);
                  great = great0;
                  less = less0;
                } else {
                  $.indexSet(a, k, $.index(a, great));
                  great0 = great - 1;
                  $.indexSet(a, great, ak);
                  great = great0;
                }
                break;
              }
        }
        $.DualPivotQuicksort__doSort(a, less, great, compare);
      } else
        $.DualPivotQuicksort__doSort(a, less, great, compare);
  }
};

$.Futures_wait$bailout = function(state, futures, t1) {
  if ($.isEmpty(futures) === true)
    return $.FutureImpl_FutureImpl$immediate($.CTC, 'List');
  var completer = $.CompleterImpl$('List');
  var result = completer.get$future();
  t1.remaining_1 = $.get$length(futures);
  var values = $.ListImplementation_List($.get$length(futures));
  for (var i = 0; $.ltB(i, $.get$length(futures)); ++i) {
    var future = $.index(futures, i);
    future.then$1(new $.Futures_wait_anon(result, i, completer, t1, values));
    future.handleException$1(new $.Futures_wait_anon0(result, completer, future));
  }
  return result;
};

$.Arrays_copy$bailout = function(state, src, srcStart, dst, dstStart, count) {
  if (srcStart < dstStart)
    for (var i = srcStart + count - 1, j = dstStart + count - 1; i >= srcStart; --i, --j)
      $.indexSet(dst, j, $.index(src, i));
  else
    for (var t1 = srcStart + count, i = srcStart, j = dstStart; i < t1; ++i, ++j)
      $.indexSet(dst, j, $.index(src, i));
};

$.DualPivotQuicksort_insertionSort_$bailout = function(state, a, left, right, compare) {
  for (var i = left + 1; $.leB(i, right); ++i) {
    var el = $.index(a, i);
    var j = i;
    while (true) {
      if (!(j > left && $.gtB(compare.call$2($.index(a, j - 1), el), 0)))
        break;
      var j0 = j - 1;
      $.indexSet(a, j, $.index(a, j0));
      j = j0;
    }
    $.indexSet(a, j, el);
  }
};

$.Arrays_indexOf$bailout = function(state, a, element, startIndex, endIndex) {
  if ($.geB(startIndex, $.get$length(a)))
    return -1;
  if (startIndex < 0)
    startIndex = 0;
  for (var i = startIndex; i < endIndex; ++i)
    if ($.eqB($.index(a, i), element))
      return i;
  return -1;
};

$._Lists_indexOf$bailout = function(state, a, element, startIndex, endIndex) {
  if ($.geB(startIndex, $.get$length(a)))
    return -1;
  if ($.ltB(startIndex, 0))
    startIndex = 0;
  for (var i = startIndex; $.ltB(i, endIndex); i = $.add(i, 1))
    if ($.eqB($.index(a, i), element))
      return i;
  return -1;
};

$.AxisAlignedBox_testOverlap$bailout = function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var a = env0;
      var b = env1;
      t1 = env2;
      break;
    case 2:
      a = env0;
      b = env1;
      t3 = env2;
      t1 = env3;
      break;
    case 3:
      a = env0;
      b = env1;
      t1 = env2;
      break;
    case 4:
      a = env0;
      b = env1;
      t3 = env2;
      t1 = env3;
      break;
    case 5:
      a = env0;
      b = env1;
      t1 = env2;
      break;
    case 6:
      a = env0;
      b = env1;
      t3 = env2;
      t1 = env3;
      break;
    case 7:
      b = env0;
      t1 = env1;
      break;
    case 8:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = b.get$lowerBound().get$x();
    case 1:
      state = 0;
      var t3 = a.get$upperBound().get$x();
    case 2:
      state = 0;
    default:
      if (state === 4 || state === 3 || state === 0 && !$.gtB(t1, t3))
        switch (state) {
          case 0:
            t1 = b.get$lowerBound().get$y();
          case 3:
            state = 0;
            t3 = a.get$upperBound().get$y();
          case 4:
            state = 0;
            t3 = $.gtB(t1, t3);
            t1 = t3;
        }
      else
        t1 = true;
    case 5:
    case 6:
    case 7:
    case 8:
      if (state === 8 || state === 7 || state === 6 || state === 5 || state === 0 && !t1)
        switch (state) {
          case 0:
            t1 = a.get$lowerBound().get$x();
          case 5:
            state = 0;
            t3 = b.get$upperBound().get$x();
          case 6:
            state = 0;
          default:
            if (state === 8 || state === 7 || state === 0 && !$.gtB(t1, t3))
              switch (state) {
                case 0:
                  t1 = a.get$lowerBound().get$y();
                case 7:
                  state = 0;
                  t3 = b.get$upperBound().get$y();
                case 8:
                  state = 0;
                  t3 = $.gtB(t1, t3);
                  t1 = t3;
              }
            else
              t1 = true;
        }
      else
        t1 = true;
      return !t1;
  }
};

$._Lists_getRange$bailout = function(state, a, start, length$, accumulator) {
  if ($.ltB(length$, 0))
    throw $.captureStackTrace($.IllegalArgumentException$('length'));
  if (start < 0)
    throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  if (typeof length$ !== 'number')
    throw $.iae(length$);
  var end = start + length$;
  if ($.gtB(end, $.get$length(a)))
    throw $.captureStackTrace($.IndexOutOfRangeException$(end));
  for (var i = start; i < end; ++i)
    accumulator.push($.index(a, i));
  return accumulator;
};

$.StringImplementation__toJsStringArray$bailout = function(state, strings) {
  $.checkNull(strings);
  var length$ = $.get$length(strings);
  if ($.isJsArray(strings)) {
    for (var i = 0; $.ltB(i, length$); ++i) {
      var string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListImplementation_List(length$);
    for (i = 0; $.ltB(i, length$); ++i) {
      string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
      if (i < 0 || i >= array.length)
        throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$.dynamicBind.call$4 = $.dynamicBind;
$.dynamicBind.$name = "dynamicBind";
$.typeNameInOpera.call$1 = $.typeNameInOpera;
$.typeNameInOpera.$name = "typeNameInOpera";
$._timerFactory.call$3 = $._timerFactory;
$._timerFactory.$name = "_timerFactory";
$.typeNameInIE.call$1 = $.typeNameInIE;
$.typeNameInIE.$name = "typeNameInIE";
$.typeNameInChrome.call$1 = $.typeNameInChrome;
$.typeNameInChrome.$name = "typeNameInChrome";
$.toStringWrapper.call$0 = $.toStringWrapper;
$.toStringWrapper.$name = "toStringWrapper";
$.typeNameInSafari.call$1 = $.typeNameInSafari;
$.typeNameInSafari.$name = "typeNameInSafari";
$.invokeClosure.call$5 = $.invokeClosure;
$.invokeClosure.$name = "invokeClosure";
$.typeNameInFirefox.call$1 = $.typeNameInFirefox;
$.typeNameInFirefox.$name = "typeNameInFirefox";
$.constructorNameFallback.call$1 = $.constructorNameFallback;
$.constructorNameFallback.$name = "constructorNameFallback";
Isolate.$finishClasses($$);
$$ = {};
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC = Isolate.makeConstantList([]);
$.CTC11 = new Isolate.$isolateProperties.NoMoreElementsException();
$.CTC1 = new Isolate.$isolateProperties.UnsupportedOperationException('Cannot add to immutable List.');
$.CTC15 = new Isolate.$isolateProperties.ExceptionImplementation('Incorrect number or type of arguments');
$.CTC13 = new Isolate.$isolateProperties.EmptyQueueException();
$.CTC14 = new Isolate.$isolateProperties.UnsupportedOperationException('Cannot setRange on immutable List.');
$.CTC6 = new Isolate.$isolateProperties.NotImplementedException('structured clone of Blob');
$.CTC17 = new Isolate.$isolateProperties.NotImplementedException('IDBKey containing Date');
$.CTC19 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC16 = new Isolate.$isolateProperties.UnsupportedOperationException('Cannot sort immutable List.');
$.CTC7 = new Isolate.$isolateProperties.NotImplementedException('structured clone of FileList');
$.CTC10 = new Isolate.$isolateProperties.NotImplementedException('structured clone of other type');
$.CTC8 = new Isolate.$isolateProperties.NotImplementedException('structured clone of ArrayBuffer');
$.CTC9 = new Isolate.$isolateProperties.NotImplementedException('structured clone of ArrayBufferView');
$.CTC3 = new Isolate.$isolateProperties.NotImplementedException('structured clone of Date');
$.CTC18 = new Isolate.$isolateProperties.Object();
$.CTC12 = new Isolate.$isolateProperties.UnsupportedOperationException('Cannot removeLast on immutable List.');
$.CTC2 = new Isolate.$isolateProperties._Default();
$.CTC5 = new Isolate.$isolateProperties.NotImplementedException('structured clone of File');
$.CTC0 = new Isolate.$isolateProperties.NullPointerException(null, Isolate.$isolateProperties.CTC);
$.CTC4 = new Isolate.$isolateProperties.NotImplementedException('structured clone of RegExp');
$.TimeOfImpact_toiCalls = null;
$.PI = 3.141592653589793;
$.TimeOfImpact_toiRootIters = null;
$.Primitives_DOLLAR_CHAR_VALUE = 36;
$.TimeOfImpact_toiMaxIters = null;
$._getTypeNameOf = null;
$._cachedBrowserPrefix = null;
$._TimerFactory__factory = null;
$.TimeOfImpact_toiMaxRootIters = null;
$._ReceivePortImpl__nextFreeId = 1;
$.TimeOfImpact_toiIters = null;
var $ = null;
Isolate.$finishClasses($$);
$$ = {};
Isolate = Isolate.$finishIsolateConstructor(Isolate);
var $ = new Isolate();
$.$defineNativeClass = function(cls, fields, methods) {
  var generateGetterSetter =   function(field, prototype) {
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

(function(table) {
  for (var key in table) {
    $.defineProperty(Object.prototype, key, table[key]);
  }
})({
 is$FileList: function() { return false; },
 is$_FileImpl: function() { return false; },
 is$_ImageDataImpl: function() { return false; },
 is$_FileListImpl: function() { return false; },
 is$ArrayBuffer: function() { return false; },
 is$_ArrayBufferViewImpl: function() { return false; },
 is$_BlobImpl: function() { return false; },
 is$Collection: function() { return false; },
 toString$0: function() { return $.toStringForNativeObject(this); },
 is$IDBKeyRange: function() { return false; },
 is$ImageData: function() { return false; },
 is$ArrayBufferView: function() { return false; },
 is$JavaScriptIndexingBehavior: function() { return false; },
 is$List: function() { return false; },
 is$_ArrayBufferImpl: function() { return false; },
 is$Map: function() { return false; },
 is$File: function() { return false; },
 is$Blob: function() { return false; }
});

$.$defineNativeClass('HTMLAnchorElement', ["shape?", "type="], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('WebKitAnimationList', ["length?"], {
});

$.$defineNativeClass('HTMLAreaElement', ["shape?"], {
});

$.$defineNativeClass('ArrayBuffer', [], {
 is$_ArrayBufferImpl: function() { return true; },
 is$ArrayBuffer: function() { return true; }
});

$.$defineNativeClass('ArrayBufferView', [], {
 is$_ArrayBufferViewImpl: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Attr', ["value="], {
});

$.$defineNativeClass('AudioBuffer', ["length?"], {
});

$.$defineNativeClass('AudioParam', ["value="], {
});

$.$defineNativeClass('HTMLBRElement', [], {
 clear$0: function() { return this.clear.call$0(); }
});

$.$defineNativeClass('BiquadFilterNode', ["type="], {
});

$.$defineNativeClass('Blob', ["type?"], {
 is$_BlobImpl: function() { return true; },
 is$Blob: function() { return true; }
});

$.$defineNativeClass('HTMLButtonElement', ["type=", "value="], {
});

$.$defineNativeClass('WebKitCSSMatrix', ["a="], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('CSSRule', ["type?"], {
});

$.$defineNativeClass('CSSRuleList', ["length?"], {
});

$.$defineNativeClass('CSSStyleDeclaration', ["length?"], {
 getPropertyValue$1: function(propertyName) {
  return this.getPropertyValue(propertyName);
},
 get$clear: function() {
  return this.getPropertyValue$1('clear');
},
 clear$0: function() { return this.get$clear().call$0(); },
 get$filter: function() {
  return this.getPropertyValue$1($.S($._browserPrefix()) + 'filter');
},
 filter$1: function(arg0) { return this.get$filter().call$1(arg0); },
 get$position: function() {
  return this.getPropertyValue$1('position');
}
});

$.$defineNativeClass('CSSValueList', ["length?"], {
});

$.$defineNativeClass('CharacterData', ["length?"], {
});

$.$defineNativeClass('ClientRectList', ["length?"], {
});

_ConsoleImpl = (typeof console == 'undefined' ? {} : console);
_ConsoleImpl.count$1 = function(arg) {
  return this.count(arg);
};
_ConsoleImpl.get$count = function() { return new $.BoundClosure(this, 'count$1'); };
$.$defineNativeClass('ConvolverNode', [], {
 normalize$0: function() { return this.normalize.call$0(); }
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

$.$defineNativeClass('DOMSettableTokenList', ["value="], {
});

$.$defineNativeClass('DOMStringList', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'String');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC16);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.CTC14);
},
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 contains$1: function(string) {
  return this.contains(string);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('DOMTokenList', ["length?"], {
 add$1: function(token) {
  return this.add(token);
},
 contains$1: function(token) {
  return this.contains(token);
},
 remove$1: function(token) {
  return this.remove(token);
},
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('DataTransferItem', ["type?"], {
});

$.$defineNativeClass('DataTransferItemList', ["length?"], {
 add$2: function(data_OR_file, type) {
  return this.add(data_OR_file,type);
},
 add$1: function(data_OR_file) {
  return this.add(data_OR_file);
},
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('DataView', [], {
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('DedicatedWorkerContext', [], {
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
},
 postMessage$1: function(message) {
  return this.postMessage(message);
}
});

$.$defineNativeClass('HTMLDocument', ["body?"], {
});

$.$defineNativeClass('DocumentFragment', [], {
 get$id: function() {
  return '';
},
 get$parent: function() {
  return;
}
});

$.$defineNativeClass('Element', ["id?"], {
});

$.$defineNativeClass('HTMLEmbedElement', ["type="], {
});

$.$defineNativeClass('Entry', [], {
 remove$2: function(successCallback, errorCallback) {
  return this.remove($.convertDartClosureToJS(successCallback, 0),$.convertDartClosureToJS(errorCallback, 1));
},
 remove$1: function(successCallback) {
  successCallback = $.convertDartClosureToJS(successCallback, 0);
  return this.remove(successCallback);
}
});

$.$defineNativeClass('EntryArray', ["length?"], {
});

$.$defineNativeClass('EntryArraySync', ["length?"], {
});

$.$defineNativeClass('EntrySync', [], {
 remove$0: function() {
  return this.remove();
}
});

$.$defineNativeClass('Event', ["type?"], {
});

$.$defineNativeClass('EventException', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('EventSource', [], {
 close$0: function() {
  return this.close();
}
});

$.$defineNativeClass('HTMLFieldSetElement', ["type?"], {
});

$.$defineNativeClass('File', [], {
 is$_FileImpl: function() { return true; },
 is$File: function() { return true; },
 is$Blob: function() { return true; }
});

$.$defineNativeClass('FileException', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('FileList', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'File');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC16);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.CTC14);
},
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$_FileListImpl: function() { return true; },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$FileList: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('FileWriter', ["length?", "position?"], {
});

$.$defineNativeClass('FileWriterSync', ["length?", "position?"], {
});

$.$defineNativeClass('Float32Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'num');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC16);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.CTC14);
},
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Float64Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'num');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC16);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.CTC14);
},
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('HTMLFormElement', ["length?"], {
 reset$0: function() {
  return this.reset();
}
});

$.$defineNativeClass('Gamepad', ["id?"], {
});

$.$defineNativeClass('GamepadList', ["length?"], {
});

$.$defineNativeClass('HTMLAllCollection', ["length?"], {
});

$.$defineNativeClass('HTMLCollection', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'Node');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC16);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.CTC14);
},
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLOptionsCollection', [], {
 get$length: function() {
return this.length;
},
 set$length: function(value) {
this.length = value;
},
 remove$1: function(index) {
  return this.remove(index);
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('History', ["length?", "state?"], {
});

$.$defineNativeClass('XMLHttpRequestException', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('XMLHttpRequestProgressEvent', ["position?"], {
});

$.$defineNativeClass('IDBCursor', [], {
 get$key: function() {
  return $._convertNativeToDart_IDBKey(this.get$_key());
},
 get$_key: function() {
return this.key;
},
 advance$1: function(count) {
  return this.advance(count);
},
 update$1: function(value) {
  return this._update_1$1($._convertDartToNative_SerializedScriptValue(value));
},
 _update_1$1: function(value) {
  return this.update(value);
}
});

$.$defineNativeClass('IDBCursorWithValue', [], {
 get$value: function() {
  return $._convertNativeToDart_AcceptStructuredClone(this.get$_lib_value());
},
 get$_lib_value: function() {
return this.value;
}
});

$.$defineNativeClass('IDBDatabase', [], {
 close$0: function() {
  return this.close();
}
});

$.$defineNativeClass('IDBDatabaseException', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('IDBIndex', [], {
 count$1: function(key_OR_range) {
  if ($.eqB($.CTC2, key_OR_range))
    return this._count_1$0();
  if (typeof key_OR_range === 'object' && key_OR_range !== null && key_OR_range.is$IDBKeyRange() || key_OR_range == null)
    return this._count_2$1(key_OR_range);
  if (!$.eqB($.CTC2, key_OR_range))
    return this._count_3$1(key_OR_range);
  throw $.captureStackTrace($.CTC15);
},
 get$count: function() { return new $.BoundClosure1(this, 'count$1'); },
 _count_1$0: function() {
  return this.count();
},
 _count_2$1: function(range) {
  return this.count(range);
},
 _count_3$1: function(key) {
  return this.count(key);
}
});

$.$defineNativeClass('IDBKeyRange', [], {
 is$IDBKeyRange: function() { return true; }
});

$.$defineNativeClass('IDBObjectStore', [], {
 add$2: function(value, key) {
  if (!$.eqB($.CTC2, key))
    return this._add_1$2($._convertDartToNative_SerializedScriptValue(value), key);
  return this._add_2$1($._convertDartToNative_SerializedScriptValue(value));
},
 add$1: function(value) {
  return this.add$2(value,Isolate.$isolateProperties.CTC2)
},
 _add_1$2: function(value, key) {
  return this.add(value,key);
},
 _add_2$1: function(value) {
  return this.add(value);
},
 clear$0: function() {
  return this.clear();
},
 count$1: function(key_OR_range) {
  if ($.eqB($.CTC2, key_OR_range))
    return this._count_1$0();
  if (typeof key_OR_range === 'object' && key_OR_range !== null && key_OR_range.is$IDBKeyRange() || key_OR_range == null)
    return this._count_2$1(key_OR_range);
  if (!$.eqB($.CTC2, key_OR_range))
    return this._count_3$1(key_OR_range);
  throw $.captureStackTrace($.CTC15);
},
 get$count: function() { return new $.BoundClosure2(this, 'count$1'); },
 _count_1$0: function() {
  return this.count();
},
 _count_2$1: function(range) {
  return this.count(range);
},
 _count_3$1: function(key) {
  return this.count(key);
}
});

$.$defineNativeClass('ImageData', [], {
 is$_ImageDataImpl: function() { return true; },
 is$ImageData: function() { return true; }
});

$.$defineNativeClass('HTMLImageElement', ["x?", "y?"], {
 complete$1: function(arg0) { return this.complete.call$1(arg0); }
});

$.$defineNativeClass('HTMLInputElement', ["type=", "value="], {
 step$3: function(arg0, arg1, arg2) { return this.step.call$3(arg0, arg1, arg2); }
});

$.$defineNativeClass('Int16Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'int');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC16);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.CTC14);
},
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Int32Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'int');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC16);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.CTC14);
},
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Int8Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'int');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC16);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.CTC14);
},
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('JavaScriptCallFrame', ["type?"], {
});

$.$defineNativeClass('HTMLKeygenElement', ["type?"], {
});

$.$defineNativeClass('HTMLLIElement', ["type=", "value="], {
});

$.$defineNativeClass('HTMLLinkElement', ["type="], {
});

$.$defineNativeClass('Location', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('MediaList', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'String');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC16);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.CTC14);
},
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('MediaStreamList', ["length?"], {
});

$.$defineNativeClass('MediaStreamTrack', ["enabled?"], {
});

$.$defineNativeClass('MediaStreamTrackList', ["length?"], {
 add$1: function(track) {
  return this.add(track);
},
 remove$1: function(track) {
  return this.remove(track);
}
});

$.$defineNativeClass('MessageEvent', ["ports?"], {
});

$.$defineNativeClass('MessagePort', [], {
 close$0: function() {
  return this.close();
},
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
},
 postMessage$1: function(message) {
  return this.postMessage(message);
}
});

$.$defineNativeClass('HTMLMeterElement', ["value="], {
});

$.$defineNativeClass('MouseEvent', ["x?", "y?"], {
});

$.$defineNativeClass('MutationRecord', ["type?"], {
});

$.$defineNativeClass('NamedNodeMap', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'Node');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC16);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.CTC14);
},
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Navigator', ["userAgent?"], {
});

$.$defineNativeClass('Node', [], {
 remove$0: function() {
  if (!(this.get$parent() == null))
    this.get$parent().$dom_removeChild$1(this);
  return this;
},
 get$parent: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$parent')) {
  {
return this.parentNode;
}
  } else {
    return Object.prototype.get$parent.call(this);
  }

},
 set$text: function(value) {
this.textContent = value;
},
 $dom_appendChild$1: function(newChild) {
  return this.appendChild(newChild);
},
 contains$1: function(other) {
  return this.contains(other);
},
 $dom_removeChild$1: function(oldChild) {
  return this.removeChild(oldChild);
},
 $dom_replaceChild$2: function(newChild, oldChild) {
  return this.replaceChild(newChild,oldChild);
}
});

$.$defineNativeClass('NodeIterator', ["filter?"], {
 filter$1: function(arg0) { return this.filter.call$1(arg0); }
});

$.$defineNativeClass('NodeList', ["length?"], {
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'Node');
},
 add$1: function(value) {
  this._parent.$dom_appendChild$1(value);
},
 addLast$1: function(value) {
  this._parent.$dom_appendChild$1(value);
},
 removeLast$0: function() {
  var result = this.last$0();
  if (!(result == null))
    this._parent.$dom_removeChild$1(result);
  return result;
},
 clear$0: function() {
  this._parent.set$text('');
},
 operator$indexSet$2: function(index, value) {
  this._parent.$dom_replaceChild$2(value, this.operator$index$1(index));
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._NodeListWrapper$($._Collections_filter(this, [], f));
},
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
},
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$($._Lists_getRange(this, start, rangeLength, []));
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Notification', [], {
 close$0: function() {
  return this.close();
}
});

$.$defineNativeClass('HTMLOListElement', ["type="], {
});

$.$defineNativeClass('HTMLObjectElement', ["type="], {
});

$.$defineNativeClass('HTMLOptionElement', ["value="], {
});

$.$defineNativeClass('Oscillator', ["type="], {
});

$.$defineNativeClass('HTMLOutputElement', ["type?", "value="], {
});

$.$defineNativeClass('HTMLParamElement', ["type=", "value="], {
});

$.$defineNativeClass('PeerConnection00', [], {
 close$0: function() {
  return this.close();
}
});

$.$defineNativeClass('PerformanceNavigation', ["type?"], {
});

$.$defineNativeClass('WebKitPoint', ["x=", "y="], {
});

$.$defineNativeClass('PopStateEvent', ["state?"], {
});

$.$defineNativeClass('HTMLProgressElement', ["position?", "value="], {
});

$.$defineNativeClass('RadioNodeList', ["value="], {
 is$List: function() { return true; },
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

$.$defineNativeClass('SVGAngle', ["value="], {
});

$.$defineNativeClass('SVGComponentTransferFunctionElement', ["type?"], {
});

$.$defineNativeClass('SVGCursorElement', ["x?", "y?"], {
});

$.$defineNativeClass('SVGElement', [], {
 get$id: function() {
return this.id;
}
});

$.$defineNativeClass('SVGElementInstanceList', ["length?"], {
});

$.$defineNativeClass('SVGException', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('SVGFEBlendElement', ["x?", "y?"], {
});

$.$defineNativeClass('SVGFEColorMatrixElement', ["type?", "x?", "y?"], {
});

$.$defineNativeClass('SVGFEComponentTransferElement', ["x?", "y?"], {
});

$.$defineNativeClass('SVGFECompositeElement', ["x?", "y?"], {
});

$.$defineNativeClass('SVGFEConvolveMatrixElement', ["x?", "y?"], {
});

$.$defineNativeClass('SVGFEDiffuseLightingElement', ["x?", "y?"], {
});

$.$defineNativeClass('SVGFEDisplacementMapElement', ["x?", "y?"], {
});

$.$defineNativeClass('SVGFEDropShadowElement', ["x?", "y?"], {
});

$.$defineNativeClass('SVGFEFloodElement', ["x?", "y?"], {
});

$.$defineNativeClass('SVGFEGaussianBlurElement', ["x?", "y?"], {
});

$.$defineNativeClass('SVGFEImageElement', ["x?", "y?"], {
});

$.$defineNativeClass('SVGFEMergeElement', ["x?", "y?"], {
});

$.$defineNativeClass('SVGFEMorphologyElement', ["x?", "y?"], {
});

$.$defineNativeClass('SVGFEOffsetElement', ["x?", "y?"], {
});

$.$defineNativeClass('SVGFEPointLightElement', ["x?", "y?"], {
});

$.$defineNativeClass('SVGFESpecularLightingElement', ["x?", "y?"], {
});

$.$defineNativeClass('SVGFESpotLightElement', ["x?", "y?"], {
});

$.$defineNativeClass('SVGFETileElement', ["x?", "y?"], {
});

$.$defineNativeClass('SVGFETurbulenceElement', ["type?", "x?", "y?"], {
});

$.$defineNativeClass('SVGFilterElement', ["x?", "y?"], {
});

$.$defineNativeClass('SVGForeignObjectElement', ["x?", "y?"], {
});

$.$defineNativeClass('SVGGlyphRefElement', ["x=", "y="], {
});

$.$defineNativeClass('SVGImageElement', ["x?", "y?"], {
});

$.$defineNativeClass('SVGLength', ["value="], {
});

$.$defineNativeClass('SVGLengthList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGMaskElement', ["x?", "y?"], {
});

$.$defineNativeClass('SVGMatrix', ["a="], {
});

$.$defineNativeClass('SVGNumber', ["value="], {
});

$.$defineNativeClass('SVGNumberList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGPathSegArcAbs', ["angle=", "x=", "y="], {
});

$.$defineNativeClass('SVGPathSegArcRel', ["angle=", "x=", "y="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicAbs', ["x=", "y="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicRel', ["x=", "y="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicSmoothAbs', ["x=", "y="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicSmoothRel', ["x=", "y="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticAbs', ["x=", "y="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticRel', ["x=", "y="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticSmoothAbs', ["x=", "y="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticSmoothRel', ["x=", "y="], {
});

$.$defineNativeClass('SVGPathSegLinetoAbs', ["x=", "y="], {
});

$.$defineNativeClass('SVGPathSegLinetoHorizontalAbs', ["x="], {
});

$.$defineNativeClass('SVGPathSegLinetoHorizontalRel', ["x="], {
});

$.$defineNativeClass('SVGPathSegLinetoRel', ["x=", "y="], {
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

$.$defineNativeClass('SVGPathSegMovetoAbs', ["x=", "y="], {
});

$.$defineNativeClass('SVGPathSegMovetoRel', ["x=", "y="], {
});

$.$defineNativeClass('SVGPatternElement', ["x?", "y?"], {
});

$.$defineNativeClass('SVGPoint', ["x=", "y="], {
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

$.$defineNativeClass('SVGRect', ["x=", "y="], {
});

$.$defineNativeClass('SVGRectElement', ["x?", "y?"], {
});

$.$defineNativeClass('SVGSVGElement', ["x?", "y?"], {
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

$.$defineNativeClass('SVGTextPositioningElement', ["x?", "y?"], {
});

$.$defineNativeClass('SVGTransform', ["angle?", "type?"], {
});

$.$defineNativeClass('SVGTransformList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGUseElement', ["x?", "y?"], {
});

$.$defineNativeClass('HTMLScriptElement', ["type="], {
});

$.$defineNativeClass('HTMLSelectElement', ["length=", "type?", "value="], {
});

$.$defineNativeClass('SourceBuffer', [], {
 append$1: function(data) {
  return this.append(data);
}
});

$.$defineNativeClass('SourceBufferList', ["length?"], {
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
 containsKey$1: function(key) {
  return !(this.$dom_getItem$1(key) == null);
},
 operator$index$1: function(key) {
  return this.$dom_getItem$1(key);
},
 operator$indexSet$2: function(key, value) {
  return this.$dom_setItem$2(key, value);
},
 remove$1: function(key) {
  var value = this.operator$index$1(key);
  this.$dom_removeItem$1(key);
  return value;
},
 clear$0: function() {
  return this.$dom_clear$0();
},
 forEach$1: function(f) {
  for (var i = 0; true; ++i) {
    var key = this.$dom_key$1(i);
    if (key == null)
      return;
    f.call$2(key, this.operator$index$1(key));
  }
},
 getKeys$0: function() {
  var keys = [];
  this.forEach$1(new $._StorageImpl_getKeys_anon(keys));
  return keys;
},
 getValues$0: function() {
  var values = [];
  this.forEach$1(new $._StorageImpl_getValues_anon(values));
  return values;
},
 get$length: function() {
  return this.get$$$dom_length();
},
 isEmpty$0: function() {
  return this.$dom_key$1(0) == null;
},
 get$$$dom_length: function() {
return this.length;
},
 $dom_clear$0: function() {
  return this.clear();
},
 $dom_getItem$1: function(key) {
  return this.getItem(key);
},
 $dom_key$1: function(index) {
  return this.key(index);
},
 $dom_removeItem$1: function(key) {
  return this.removeItem(key);
},
 $dom_setItem$2: function(key, data) {
  return this.setItem(key,data);
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
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'StyleSheet');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC16);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.CTC14);
},
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTextAreaElement', ["type?", "value="], {
});

$.$defineNativeClass('TextTrackCue', ["id?", "position?", "text!"], {
});

$.$defineNativeClass('TextTrackCueList', ["length?"], {
});

$.$defineNativeClass('TextTrackList', ["length?"], {
});

$.$defineNativeClass('TimeRanges', ["length?"], {
});

$.$defineNativeClass('TouchList', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'Touch');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC16);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.CTC14);
},
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('TreeWalker', ["filter?"], {
 filter$1: function(arg0) { return this.filter.call$1(arg0); }
});

$.$defineNativeClass('HTMLUListElement', ["type="], {
});

$.$defineNativeClass('Uint16Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'int');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC16);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.CTC14);
},
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Uint32Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'int');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC16);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.CTC14);
},
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Uint8Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  return $._FixedSizeListIterator$(this, 'int');
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 get$filter: function() { return new $.BoundClosure(this, 'filter$1'); },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 sort$1: function(compare) {
  throw $.captureStackTrace($.CTC16);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC12);
},
 setRange$4: function(start, rangeLength, from, startFrom) {
  throw $.captureStackTrace($.CTC14);
},
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Uint8ClampedArray', [], {
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('WebGLActiveInfo', ["type?"], {
});

$.$defineNativeClass('WebSocket', [], {
 close$2: function(code, reason) {
  return this.close(code,reason);
},
 close$0: function() {
  return this.close();
}
});

$.$defineNativeClass('DOMWindow', ["length?", "navigator?", "parent?"], {
 close$0: function() {
  return this.close();
},
 setInterval$2: function(handler, timeout) {
  return this.setInterval($.convertDartClosureToJS(handler, 0),timeout);
},
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
}
});

$.$defineNativeClass('Worker', [], {
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
},
 postMessage$1: function(message) {
  return this.postMessage(message);
}
});

$.$defineNativeClass('WorkerContext', ["navigator?"], {
 close$0: function() {
  return this.close();
},
 setInterval$2: function(handler, timeout) {
  return this.setInterval($.convertDartClosureToJS(handler, 0),timeout);
},
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
}
});

$.$defineNativeClass('WorkerLocation', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('WorkerNavigator', ["userAgent?"], {
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

$.$defineNativeClass('XSLTProcessor', [], {
 reset$0: function() {
  return this.reset();
}
});

$.$defineNativeClass('Worker', [], {
 get$id: function() {
return this.id;
},
 postMessage$1: function(msg) {
return this.postMessage(msg);
}
});

$.$defineNativeClass('DOMWindow', [], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
},
 setInterval$2: function(handler, timeout) {
  return this.setInterval($.convertDartClosureToJS(handler, 0),timeout);
}
});

// 217 dynamic classes.
// 372 classes
// 31 !leaf
(function(){
  var v0/*class(_Uint8ArrayImpl)*/ = 'Uint8Array|Uint8ClampedArray|Uint8ClampedArray';
  var v1/*class(_SVGTextPositioningElementImpl)*/ = 'SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement';
  var v2/*class(_SVGComponentTransferFunctionElementImpl)*/ = 'SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement';
  var v3/*class(_SVGElementImpl)*/ = [v1/*class(_SVGTextPositioningElementImpl)*/,v1/*class(_SVGTextPositioningElementImpl)*/,v2/*class(_SVGComponentTransferFunctionElementImpl)*/,v1/*class(_SVGTextPositioningElementImpl)*/,v1/*class(_SVGTextPositioningElementImpl)*/,v2/*class(_SVGComponentTransferFunctionElementImpl)*/,'SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGTextContentElement|SVGTextPathElement|SVGTextPathElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGTextContentElement|SVGTextPathElement|SVGTextPathElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement'].join('|');
  var v4/*class(_MouseEventImpl)*/ = 'MouseEvent|WheelEvent|WheelEvent';
  var v5/*class(_ElementImpl)*/ = [v3/*class(_SVGElementImpl)*/,v3/*class(_SVGElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMediaElement|HTMLVideoElement|HTMLAudioElement|HTMLVideoElement|HTMLAudioElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDataListElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMediaElement|HTMLVideoElement|HTMLAudioElement|HTMLVideoElement|HTMLAudioElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDataListElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v6/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot|ShadowRoot';
  var v7/*class(_DocumentImpl)*/ = 'HTMLDocument|SVGDocument|SVGDocument';
  var v8/*class(_CharacterDataImpl)*/ = 'CharacterData|Text|CDATASection|CDATASection|Comment|Text|CDATASection|CDATASection|Comment';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['SVGTextPositioningElement', v1/*class(_SVGTextPositioningElementImpl)*/],
    ['StyleSheet', 'StyleSheet|CSSStyleSheet|CSSStyleSheet'],
    ['Uint8Array', v0/*class(_Uint8ArrayImpl)*/],
    ['ArrayBufferView', [v0/*class(_Uint8ArrayImpl)*/,v0/*class(_Uint8ArrayImpl)*/,'ArrayBufferView|Uint32Array|Uint16Array|Int8Array|Int32Array|Int16Array|Float64Array|Float32Array|DataView|Uint32Array|Uint16Array|Int8Array|Int32Array|Int16Array|Float64Array|Float32Array|DataView'].join('|')],
    ['AudioParam', 'AudioParam|AudioGain|AudioGain'],
    ['Blob', 'Blob|File|File'],
    ['CSSRule', 'CSSRule|CSSUnknownRule|CSSStyleRule|CSSPageRule|CSSMediaRule|WebKitCSSKeyframesRule|WebKitCSSKeyframeRule|CSSImportRule|CSSFontFaceRule|CSSCharsetRule|CSSUnknownRule|CSSStyleRule|CSSPageRule|CSSMediaRule|WebKitCSSKeyframesRule|WebKitCSSKeyframeRule|CSSImportRule|CSSFontFaceRule|CSSCharsetRule'],
    ['WorkerContext', 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext|SharedWorkerContext|DedicatedWorkerContext'],
    ['CSSValueList', 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue|WebKitCSSFilterValue|WebKitCSSTransformValue'],
    ['CharacterData', v8/*class(_CharacterDataImpl)*/],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList|DOMSettableTokenList'],
    ['HTMLDocument', v7/*class(_DocumentImpl)*/],
    ['DocumentFragment', v6/*class(_DocumentFragmentImpl)*/],
    ['SVGComponentTransferFunctionElement', v2/*class(_SVGComponentTransferFunctionElementImpl)*/],
    ['SVGElement', v3/*class(_SVGElementImpl)*/],
    ['Element', v5/*class(_ElementImpl)*/],
    ['Entry', 'Entry|FileEntry|DirectoryEntry|FileEntry|DirectoryEntry'],
    ['EntrySync', 'EntrySync|FileEntrySync|DirectoryEntrySync|FileEntrySync|DirectoryEntrySync'],
    ['MouseEvent', v4/*class(_MouseEventImpl)*/],
    ['Event', [v4/*class(_MouseEventImpl)*/,v4/*class(_MouseEventImpl)*/,v4/*class(_MouseEventImpl)*/,v4/*class(_MouseEventImpl)*/,'Event|WebGLContextEvent|UIEvent|TouchEvent|TextEvent|SVGZoomEvent|KeyboardEvent|CompositionEvent|TouchEvent|TextEvent|SVGZoomEvent|KeyboardEvent|CompositionEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechRecognitionError|SpeechInputEvent|ProgressEvent|XMLHttpRequestProgressEvent|XMLHttpRequestProgressEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamTrackEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|IDBUpgradeNeededEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent|WebGLContextEvent|UIEvent|TouchEvent|TextEvent|SVGZoomEvent|KeyboardEvent|CompositionEvent|TouchEvent|TextEvent|SVGZoomEvent|KeyboardEvent|CompositionEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechRecognitionError|SpeechInputEvent|ProgressEvent|XMLHttpRequestProgressEvent|XMLHttpRequestProgressEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamTrackEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|IDBUpgradeNeededEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent'].join('|')],
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection|HTMLOptionsCollection'],
    ['IDBCursor', 'IDBCursor|IDBCursorWithValue|IDBCursorWithValue'],
    ['Node', [v5/*class(_ElementImpl)*/,v6/*class(_DocumentFragmentImpl)*/,v7/*class(_DocumentImpl)*/,v8/*class(_CharacterDataImpl)*/,v5/*class(_ElementImpl)*/,v6/*class(_DocumentFragmentImpl)*/,v7/*class(_DocumentImpl)*/,v8/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr'].join('|')],
    ['NodeList', 'NodeList|RadioNodeList|RadioNodeList']];
$.dynamicSetMetadata(table);
})();

var $globalThis = $;
var $globalState;
var $globals;
var $isWorker;
var $supportsWorkers;
var $thisScriptUrl;
function $static_init(){};

function $initGlobals(context) {
  context.isolateStatics = new Isolate();
}
function $setGlobals(context) {
  $ = context.isolateStatics;
  $globalThis = $;
}
$.main.call$0 = $.main
if (typeof document != 'undefined' && document.readyState != 'complete') {
  document.addEventListener('readystatechange', function () {
    if (document.readyState == 'complete') {
      $.startRootIsolate($.main);
    }
  }, false);
} else {
  $.startRootIsolate($.main);
}
function init() {
Isolate.$isolateProperties = {};
Isolate.$defineClass = function(cls, fields, prototype) {
  var generateGetterSetter =   function(field, prototype) {
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
  constructor.prototype = prototype;
  return constructor;
};
var supportsProto = false;
var tmp = Isolate.$defineClass('c', ['f?'], {}).prototype;
if (tmp.__proto__) {
  tmp.__proto__ = {};
  if (typeof tmp.get$f !== "undefined") supportsProto = true;
}
Isolate.$pendingClasses = {};
Isolate.$finishClasses = function(collectedClasses) {
  for (var cls in collectedClasses) {
    if (Object.prototype.hasOwnProperty.call(collectedClasses, cls)) {
      var desc = collectedClasses[cls];
      Isolate.$isolateProperties[cls] = Isolate.$defineClass(cls, desc[''], desc);
      if (desc['super'] !== "") Isolate.$pendingClasses[cls] = desc['super'];
    }
  }
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
    if (supportsProto) {
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
        if (member == '' || member == 'super') continue;
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
