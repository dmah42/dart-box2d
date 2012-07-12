function Isolate() {}
init();

var $$ = {};
var $ = Isolate.$isolateProperties;
$$.ExceptionImplementation = {"":
 ["_msg"],
 super: "Object",
 toString$0: function() {
  var t1 = this._msg;
  return t1 == null ? 'Exception' : 'Exception: ' + $.S(t1);
 }
};

$$.HashMapImplementation = {"":
 ["_numberOfDeleted", "_numberOfEntries", "_loadLimit", "_values", "_keys?"],
 super: "Object",
 toString$0: function() {
  return $.Maps_mapToString(this);
 },
 containsKey$1: function(key) {
  return !$.eqB(this._probeForLookup$1(key), -1);
 },
 getValues$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'V'}));
  t1.i_1 = 0;
  this.forEach$1(new $.HashMapImplementation_getValues__(list, t1));
  return list;
 },
 getKeys$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'K'}));
  t1.i_10 = 0;
  this.forEach$1(new $.HashMapImplementation_getKeys__(list, t1));
  return list;
 },
 forEach$1: function(f) {
  var length$ = $.intTypeCheck($.get$length(this._keys));
  for (var i = 0; $.ltB(i, length$); i = $.intTypeCheck($.add(i, 1))) {
    var key = $.index(this._keys, i);
    !(key == null) && !(key === $.CTC6) && f.$call$2(key, $.index(this._values, i));
  }
 },
 get$length: function() {
  return this._numberOfEntries;
 },
 isEmpty$0: function() {
  return $.eq(this._numberOfEntries, 0);
 },
 operator$index$1: function(key) {
  var index = $.intTypeCheck(this._probeForLookup$1(key));
  if ($.ltB(index, 0)) return;
  return $.index(this._values, index);
 },
 operator$indexSet$2: function(key, value) {
  this._ensureCapacity$0();
  var index = $.intTypeCheck(this._probeForAdding$1(key));
  var t1 = $.index(this._keys, index);
  if (!(t1 == null)) {
    t1 = $.index(this._keys, index);
    t1 = t1 === $.CTC6;
  } else t1 = true;
  if (t1) {
    t1 = this._numberOfEntries;
    if (typeof t1 !== 'number') return this.operator$indexSet$2$bailout(1, index, value, key, t1);
    this._numberOfEntries = t1 + 1;
  }
  $.indexSet(this._keys, index, key);
  $.indexSet(this._values, index, value);
 },
 operator$indexSet$2$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      index = env0;
      var value = env1;
      var key = env2;
      t1 = env3;
      break;
  }
  switch (state) {
    case 0:
      this._ensureCapacity$0();
      var index = $.intTypeCheck(this._probeForAdding$1(key));
      var t1 = $.index(this._keys, index);
      if (!(t1 == null)) {
        t1 = $.index(this._keys, index);
        t1 = t1 === $.CTC6;
      } else t1 = true;
    case 1:
      if (state == 1 || (state == 0 && t1)) {
        switch (state) {
          case 0:
            t1 = this._numberOfEntries;
          case 1:
            state = 0;
            this._numberOfEntries = $.add(t1, 1);
        }
      }
      $.indexSet(this._keys, index, key);
      $.indexSet(this._values, index, value);
  }
 },
 clear$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  var length$ = $.intTypeCheck($.get$length(this._keys));
  for (var i = 0; $.ltB(i, length$); i = $.intTypeCheck($.add(i, 1))) {
    $.indexSet(this._keys, i, null);
    $.indexSet(this._values, i, null);
  }
 },
 _grow$1: function(newCapacity) {
  $.intTypeCheck(newCapacity);
  $.assert($.HashMapImplementation__isPowerOfTwo(newCapacity));
  var capacity = $.intTypeCheck($.get$length(this._keys));
  this._loadLimit = $.HashMapImplementation__computeLoadLimit(newCapacity);
  var oldKeys = $.listTypeCheck(this._keys);
  var oldValues = $.listTypeCheck(this._values);
  this._keys = $.ListFactory_List(newCapacity);
  var t1 = $.ListFactory_List(newCapacity);
  $.setRuntimeTypeInfo(t1, ({E: 'V'}));
  this._values = t1;
  for (var i = 0; $.ltB(i, capacity); i = $.intTypeCheck($.add(i, 1))) {
    var key = $.index(oldKeys, i);
    if (key == null || key === $.CTC6) continue;
    var value = $.index(oldValues, i);
    var newIndex = $.intTypeCheck(this._probeForAdding$1(key));
    $.indexSet(this._keys, newIndex, key);
    $.indexSet(this._values, newIndex, value);
  }
  this._numberOfDeleted = 0;
 },
 _ensureCapacity$0: function() {
  var newNumberOfEntries = $.intTypeCheck($.add(this._numberOfEntries, 1));
  if ($.geB(newNumberOfEntries, this._loadLimit)) {
    this._grow$1($.mul($.get$length(this._keys), 2));
    return;
  }
  var numberOfFree = $.intTypeCheck($.sub($.intTypeCheck($.sub($.intTypeCheck($.get$length(this._keys)), newNumberOfEntries)), this._numberOfDeleted));
  $.gtB(this._numberOfDeleted, numberOfFree) && this._grow$1($.get$length(this._keys));
 },
 _probeForLookup$1: function(key) {
  var hash = $.intTypeCheck($.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._keys)));
  for (var numberOfProbes = 1; true; ) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey == null) return -1;
    if ($.eqB(existingKey, key)) return hash;
    var numberOfProbes0 = $.intTypeCheck($.add(numberOfProbes, 1));
    hash = $.intTypeCheck($.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys)));
    numberOfProbes = numberOfProbes0;
  }
 },
 _probeForAdding$1: function(key) {
  var hash = $.intTypeCheck($.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._keys)));
  for (var numberOfProbes = 1, insertionIndex = -1; true; ) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey == null) {
      if ($.ltB(insertionIndex, 0)) return hash;
      return insertionIndex;
    }
    if ($.eqB(existingKey, key)) return hash;
    if ($.ltB(insertionIndex, 0) && $.CTC6 === existingKey) insertionIndex = hash;
    var numberOfProbes0 = $.intTypeCheck($.add(numberOfProbes, 1));
    if (numberOfProbes0 !== (numberOfProbes0 | 0)) return this._probeForAdding$1$bailout(1, key, insertionIndex, numberOfProbes, hash, numberOfProbes0);
    hash = $.intTypeCheck($.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys)));
    numberOfProbes = numberOfProbes0;
  }
 },
 _probeForAdding$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var key = env0;
      insertionIndex = env1;
      numberOfProbes = env2;
      hash = env3;
      numberOfProbes0 = env4;
      break;
  }
  switch (state) {
    case 0:
      var hash = $.intTypeCheck($.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._keys)));
      var numberOfProbes = 1;
      var insertionIndex = -1;
    case 1:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!true) break L0;
            var existingKey = $.index(this._keys, hash);
            if (existingKey == null) {
              if ($.ltB(insertionIndex, 0)) return hash;
              return insertionIndex;
            }
            if ($.eqB(existingKey, key)) return hash;
            if ($.ltB(insertionIndex, 0) && $.CTC6 === existingKey) insertionIndex = hash;
            var numberOfProbes0 = $.intTypeCheck($.add(numberOfProbes, 1));
          case 1:
            state = 0;
            hash = $.intTypeCheck($.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys)));
            numberOfProbes = numberOfProbes0;
        }
      }
  }
 },
 HashMapImplementation$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  this._loadLimit = $.HashMapImplementation__computeLoadLimit(8);
  this._keys = $.ListFactory_List(8);
  var t1 = $.ListFactory_List(8);
  $.setRuntimeTypeInfo(t1, ({E: 'V'}));
  this._values = t1;
 },
 is$Map: function() { return true; }
};

$$.HashSetImplementation = {"":
 ["_backingMap?"],
 super: "Object",
 toString$0: function() {
  return $.Collections_collectionToString(this);
 },
 iterator$0: function() {
  var t1 = $.HashSetIterator$(this);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  return t1;
 },
 get$length: function() {
  return $.get$length(this._backingMap);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._backingMap);
 },
 forEach$1: function(f) {
  $.forEach(this._backingMap, new $.HashSetImplementation_forEach__(f));
 },
 contains$1: function(value) {
  return this._backingMap.containsKey$1(value);
 },
 add$1: function(value) {
  var t1 = this._backingMap;
  if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this.add$1$bailout(1, value, t1);
  if (value !== (value | 0)) throw $.iae(value);
  var t2 = t1.length;
  if (value < 0 || value >= t2) throw $.ioore(value);
  t1[value] = value;
 },
 add$1$bailout: function(state, value, t1) {
  $.indexSet(t1, value, value);
 },
 clear$0: function() {
  $.clear(this._backingMap);
 },
 HashSetImplementation$0: function() {
  this._backingMap = $.HashMapImplementation$();
 },
 is$HashSetImplementation: true,
 is$Set: true,
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
};

$$.HashSetIterator = {"":
 ["_nextValidIndex", "_entries"],
 super: "Object",
 _advance$0: function() {
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this._advance$0$bailout(1, t1, 0);
  var length$ = t1.length;
  var entry = null;
  do {
    var t2 = this._nextValidIndex + 1;
    this._nextValidIndex = t2;
    if (t2 >= length$) break;
    t2 = this._nextValidIndex;
    if (t2 !== (t2 | 0)) throw $.iae(t2);
    var t3 = t1.length;
    if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
    entry = t1[t2];
  } while ((entry == null || entry === $.CTC6));
 },
 _advance$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      length$ = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._entries;
    case 1:
      state = 0;
      var length$ = $.intTypeCheck($.get$length(t1));
    case 2:
      state = 0;
      var entry = null;
      do {
        var t2 = this._nextValidIndex + 1;
        this._nextValidIndex = t2;
        if ($.geB(t2, length$)) break;
        entry = $.index(t1, this._nextValidIndex);
      } while ((entry == null || entry === $.CTC6));
  }
 },
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.next$0$bailout(1, t1);
  var t2 = this._nextValidIndex;
  if (t2 !== (t2 | 0)) throw $.iae(t2);
  var t3 = t1.length;
  if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
  t2 = t1[t2];
  this._advance$0();
  return t2;
 },
 next$0$bailout: function(state, t1) {
  var res = $.index(t1, this._nextValidIndex);
  this._advance$0();
  return res;
 },
 get$next: function() { return new $.BoundClosure(this, 'next$0'); },
 hasNext$0: function() {
  var t1 = this._nextValidIndex;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1, 0);
  var t2 = this._entries;
  if (typeof t2 !== 'string' && (typeof t2 !== 'object' || t2 === null || (t2.constructor !== Array && !t2.is$JavaScriptIndexingBehavior()))) return this.hasNext$0$bailout(2, t1, t2);
  var t3 = t2.length;
  if (t1 >= t3) return false;
  if (t1 !== (t1 | 0)) throw $.iae(t1);
  if (t1 < 0 || t1 >= t3) throw $.ioore(t1);
  t1 = t2[t1];
  t1 === $.CTC6 && this._advance$0();
  t1 = this._nextValidIndex;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(3, t1, t2);
  return t1 < t2.length;
 },
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      break;
    case 3:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._nextValidIndex;
    case 1:
      state = 0;
      var t2 = this._entries;
    case 2:
      state = 0;
      if ($.geB(t1, $.get$length(t2))) return false;
      t1 = $.index(t2, this._nextValidIndex);
      t1 === $.CTC6 && this._advance$0();
      t1 = this._nextValidIndex;
    case 3:
      state = 0;
      return $.lt(t1, $.get$length(t2));
  }
 },
 HashSetIterator$1: function(set_) {
  $.propertyTypeCheck(set_, 'is$HashSetImplementation');
  this._advance$0();
 },
 is$Iterator: true
};

$$._DeletedKeySentinel = {"":
 [],
 super: "Object"
};

$$.KeyValuePair = {"":
 ["value=", "key?"],
 super: "Object",
 is$KeyValuePair: true
};

$$.LinkedHashMapImplementation = {"":
 ["_map", "_lib1_list"],
 super: "Object",
 toString$0: function() {
  return $.Maps_mapToString(this);
 },
 clear$0: function() {
  $.clear(this._map);
  $.clear(this._lib1_list);
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 get$length: function() {
  return $.get$length(this._map);
 },
 containsKey$1: function(key) {
  return this._map.containsKey$1(key);
 },
 forEach$1: function(f) {
  $.forEach(this._lib1_list, new $.LinkedHashMapImplementation_forEach__(f));
 },
 getValues$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'V'}));
  t1.index_1 = 0;
  $.forEach(this._lib1_list, new $.LinkedHashMapImplementation_getValues__(list, t1));
  $.assert($.eq(t1.index_1, $.get$length(this)));
  return list;
 },
 getKeys$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'K'}));
  t1.index_10 = 0;
  $.forEach(this._lib1_list, new $.LinkedHashMapImplementation_getKeys__(list, t1));
  $.assert($.eq(t1.index_10, $.get$length(this)));
  return list;
 },
 operator$index$1: function(key) {
  var t1 = this._map;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.operator$index$1$bailout(1, key, t1);
  if (key !== (key | 0)) throw $.iae(key);
  var t2 = t1.length;
  if (key < 0 || key >= t2) throw $.ioore(key);
  var entry = $.propertyTypeCheck(t1[key], 'is$DoubleLinkedQueueEntry');
  if (entry == null) return;
  return entry.get$element().get$value();
 },
 operator$index$1$bailout: function(state, key, t1) {
  var entry = $.propertyTypeCheck($.index(t1, key), 'is$DoubleLinkedQueueEntry');
  if (entry == null) return;
  return entry.get$element().get$value();
 },
 operator$indexSet$2: function(key, value) {
  var t1 = this._map;
  if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this.operator$indexSet$2$bailout(1, key, value, t1);
  if (t1.containsKey$1(key) === true) {
    if (key !== (key | 0)) throw $.iae(key);
    var t2 = t1.length;
    if (key < 0 || key >= t2) throw $.ioore(key);
    t1[key].get$element().set$value(value);
  } else {
    t2 = this._lib1_list;
    $.addLast(t2, $.KeyValuePair$(key, value));
    t2 = t2.lastEntry$0();
    if (key !== (key | 0)) throw $.iae(key);
    var t3 = t1.length;
    if (key < 0 || key >= t3) throw $.ioore(key);
    t1[key] = t2;
  }
 },
 operator$indexSet$2$bailout: function(state, key, value, t1) {
  if (t1.containsKey$1(key) === true) $.index(t1, key).get$element().set$value(value);
  else {
    var t2 = this._lib1_list;
    $.addLast(t2, $.KeyValuePair$(key, value));
    $.indexSet(t1, key, t2.lastEntry$0());
  }
 },
 LinkedHashMapImplementation$0: function() {
  this._map = $.HashMapImplementation$();
  var t1 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t1, ({E: 'KeyValuePair<K, V>'}));
  this._lib1_list = t1;
 },
 is$Map: function() { return true; }
};

$$.DoubleLinkedQueueEntry = {"":
 ["_element?", "_next=", "_previous="],
 super: "Object",
 get$element: function() {
  return this._element;
 },
 previousEntry$0: function() {
  return this._previous._asNonSentinelEntry$0();
 },
 _asNonSentinelEntry$0: function() {
  return this;
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
 prepend$1: function(e) {
  var t1 = $.DoubleLinkedQueueEntry$(e);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  t1._link$2(this._previous, this);
 },
 append$1: function(e) {
  var t1 = $.DoubleLinkedQueueEntry$(e);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  t1._link$2(this, this._next);
 },
 _link$2: function(p, n) {
  $.propertyTypeCheck(p, 'is$DoubleLinkedQueueEntry');
  $.propertyTypeCheck(n, 'is$DoubleLinkedQueueEntry');
  this._next = n;
  this._previous = p;
  p.set$_next(this);
  n.set$_previous(this);
 },
 DoubleLinkedQueueEntry$1: function(e) {
  this._element = e;
 },
 is$DoubleLinkedQueueEntry: true
};

$$._DoubleLinkedQueueEntrySentinel = {"":
 ["_element", "_next", "_previous"],
 super: "DoubleLinkedQueueEntry",
 get$element: function() {
  throw $.captureStackTrace($.CTC2);
 },
 _asNonSentinelEntry$0: function() {
  return;
 },
 remove$0: function() {
  throw $.captureStackTrace($.CTC2);
 },
 _DoubleLinkedQueueEntrySentinel$0: function() {
  this._link$2(this, this);
 },
 is$_DoubleLinkedQueueEntrySentinel: true
};

$$.DoubleLinkedQueue = {"":
 ["_sentinel"],
 super: "Object",
 toString$0: function() {
  return $.Collections_collectionToString(this);
 },
 iterator$0: function() {
  var t1 = $._DoubleLinkedQueueIterator$(this._sentinel);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  return t1;
 },
 forEach$1: function(f) {
  var t1 = this._sentinel;
  var entry = $.propertyTypeCheck(t1.get$_next(), 'is$DoubleLinkedQueueEntry');
  for (; !(entry == null ? t1 == null : entry === t1); ) {
    var nextEntry = $.propertyTypeCheck(entry.get$_next(), 'is$DoubleLinkedQueueEntry');
    f.$call$1(entry.get$_element());
    $.propertyTypeCheck(nextEntry, 'is$DoubleLinkedQueueEntry');
    entry = nextEntry;
  }
 },
 clear$0: function() {
  var t1 = this._sentinel;
  t1.set$_next(t1);
  t1.set$_previous(t1);
 },
 isEmpty$0: function() {
  var t1 = this._sentinel;
  var t2 = t1.get$_next();
  return t2 == null ? t1 == null : t2 === t1;
 },
 get$length: function() {
  var t1 = ({});
  t1.counter_1 = 0;
  this.forEach$1(new $.DoubleLinkedQueue_length__(t1));
  return t1.counter_1;
 },
 lastEntry$0: function() {
  return this._sentinel.previousEntry$0();
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
  var t1 = $._DoubleLinkedQueueEntrySentinel$();
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  this._sentinel = t1;
 },
 is$Queue: true,
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
};

$$._DoubleLinkedQueueIterator = {"":
 ["_currentEntry", "_sentinel"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  this._currentEntry = this._currentEntry.get$_next();
  return this._currentEntry.get$element();
 },
 get$next: function() { return new $.BoundClosure(this, 'next$0'); },
 hasNext$0: function() {
  var t1 = this._currentEntry.get$_next();
  var t2 = this._sentinel;
  return !(t1 == null ? t2 == null : t1 === t2);
 },
 _DoubleLinkedQueueIterator$1: function(_sentinel) {
  $.propertyTypeCheck(_sentinel, 'is$_DoubleLinkedQueueEntrySentinel');
  this._currentEntry = this._sentinel;
 },
 is$Iterator: true
};

$$.StopwatchImplementation = {"":
 ["_stop", "_start"],
 super: "Object",
 frequency$0: function() {
  return $.Clock_frequency();
 },
 elapsedInMs$0: function() {
  var t1 = this.elapsed$0();
  if (typeof t1 !== 'number') return this.elapsedInMs$0$bailout(1, t1, 0);
  t1 *= 1000;
  var t2 = this.frequency$0();
  if (typeof t2 !== 'number') return this.elapsedInMs$0$bailout(2, t1, t2);
  return $.tdiv(t1, t2);
 },
 elapsedInMs$0$bailout: function(state, env0, env1) {
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
      var t1 = this.elapsed$0();
    case 1:
      state = 0;
      t1 = $.mul(t1, 1000);
      var t2 = this.frequency$0();
    case 2:
      state = 0;
      return $.tdiv(t1, t2);
  }
 },
 elapsed$0: function() {
  var t1 = this._start;
  if (t1 == null) return 0;
  var t2 = this._stop;
  return t2 == null ? $.sub($.Clock_now(), this._start) : $.sub(t2, t1);
 },
 reset$0: function() {
  var t1 = this._start;
  if (t1 == null) return;
  this._start = $.Clock_now();
  t1 = this._stop;
  if (!(t1 == null)) this._stop = this._start;
 },
 stop$0: function() {
  var t1 = this._start;
  if (!(t1 == null)) {
    t1 = this._stop;
    var t2 = !(t1 == null);
    t1 = t2;
  } else t1 = true;
  if (t1) return;
  this._stop = $.Clock_now();
 },
 start$0: function() {
  var t1 = this._start;
  if (t1 == null) this._start = $.Clock_now();
  else {
    t1 = this._stop;
    if (t1 == null) return;
    t1 = $.Clock_now();
    if (typeof t1 !== 'number') return this.start$0$bailout(1, t1, 0, 0);
    var t2 = this._stop;
    if (typeof t2 !== 'number') return this.start$0$bailout(2, t1, t2, 0);
    var t3 = this._start;
    if (typeof t3 !== 'number') return this.start$0$bailout(3, t1, t2, t3);
    this._start = t1 - (t2 - t3);
    this._stop = null;
  }
 },
 start$0$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      break;
    case 3:
      t1 = env0;
      t2 = env1;
      t3 = env2;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._start;
    case 1:
    case 2:
    case 3:
      if ((state == 0 && t1 == null)) {
        this._start = $.Clock_now();
      } else {
        switch (state) {
          case 0:
            t1 = this._stop;
            if (t1 == null) return;
            t1 = $.Clock_now();
          case 1:
            state = 0;
            var t2 = this._stop;
          case 2:
            state = 0;
            var t3 = this._start;
          case 3:
            state = 0;
            this._start = $.sub(t1, $.sub(t2, t3));
            this._stop = null;
        }
      }
  }
 }
};

$$.StringBufferImpl = {"":
 ["_length", "_buffer"],
 super: "Object",
 toString$0: function() {
  var t1 = $.get$length(this._buffer);
  if (t1 === 0) return '';
  t1 = $.get$length(this._buffer);
  if (t1 === 1) return $.index(this._buffer, 0);
  var result = $.stringTypeCheck($.StringBase_concatAll(this._buffer));
  $.clear(this._buffer);
  $.add$1(this._buffer, result);
  return result;
 },
 clear$0: function() {
  var t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, ({E: 'String'}));
  this._buffer = t1;
  this._length = 0;
  return this;
 },
 add$1: function(obj) {
  var str = $.stringTypeCheck($.toString(obj));
  if (str == null || $.isEmpty(str) === true) return this;
  $.add$1(this._buffer, str);
  var t1 = this._length;
  if (typeof t1 !== 'number') return this.add$1$bailout(1, str, t1);
  var t2 = $.get$length(str);
  if (typeof t2 !== 'number') return this.add$1$bailout(2, t1, t2);
  this._length = t1 + t2;
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
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      var str = $.stringTypeCheck($.toString(obj));
      if (str == null || $.isEmpty(str) === true) return this;
      $.add$1(this._buffer, str);
      var t1 = this._length;
    case 1:
      state = 0;
      var t2 = $.get$length(str);
    case 2:
      state = 0;
      this._length = $.add(t1, t2);
      return this;
  }
 },
 isEmpty$0: function() {
  var t1 = this._length;
  return t1 === 0;
 },
 get$length: function() {
  return this._length;
 },
 StringBufferImpl$1: function(content$) {
  this.clear$0();
  this.add$1(content$);
 },
 is$StringBuffer: true
};

$$.JSSyntaxRegExp = {"":
 ["ignoreCase?", "multiLine?", "pattern?"],
 super: "Object",
 allMatches$1: function(str) {
  $.stringTypeCheck(str);
  $.checkString(str);
  return $._AllMatchesIterable$(this, str);
 },
 hasMatch$1: function(str) {
  return $.regExpTest(this, $.checkString($.stringTypeCheck(str)));
 },
 firstMatch$1: function(str) {
  $.stringTypeCheck(str);
  var m = $.listTypeCheck($.regExpExec(this, $.checkString(str)));
  if (m == null) return;
  var matchStart = $.regExpMatchStart(m);
  var matchEnd = $.add(matchStart, $.get$length($.index(m, 0)));
  return $.MatchImplementation$(this.pattern, str, matchStart, matchEnd, m);
 },
 JSSyntaxRegExp$_globalVersionOf$1: function(other) {
  $.propertyTypeCheck(other, 'is$JSSyntaxRegExp');
  $.regExpAttachGlobalNative(this);
 },
 is$JSSyntaxRegExp: true
};

$$.MatchImplementation = {"":
 ["_groups", "_end", "_start", "str", "pattern"],
 super: "Object",
 operator$index$1: function(index) {
  return this.group$1($.intTypeCheck(index));
 },
 group$1: function(index) {
  $.intTypeCheck(index);
  return $.index(this._groups, index);
 }
};

$$._AllMatchesIterable = {"":
 ["_str", "_re"],
 super: "Object",
 iterator$0: function() {
  return $._AllMatchesIterator$(this._re, this._str);
 },
 is$Iterable: function() { return true; }
};

$$._AllMatchesIterator = {"":
 ["_done", "_next=", "_str", "_re"],
 super: "Object",
 hasNext$0: function() {
  if (this._done === true) return false;
  var t1 = this._next;
  if (!(t1 == null)) return true;
  this._next = this._re.firstMatch$1(this._str);
  t1 = this._next;
  if (t1 == null) {
    this._done = true;
    return false;
  }
  return true;
 },
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  var next = this._next;
  this._next = null;
  return next;
 },
 get$next: function() { return new $.BoundClosure(this, 'next$0'); },
 is$Iterator: true
};

$$.ListIterator = {"":
 ["list", "i"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.NoMoreElementsException$());
  var value = (this.list[this.i]);
  this.i = this.i + 1;
  return value;
 },
 get$next: function() { return new $.BoundClosure(this, 'next$0'); },
 hasNext$0: function() {
  var t1 = this.i;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1);
  return t1 < (this.list.length);
 },
 hasNext$0$bailout: function(state, t1) {
  return $.lt(t1, (this.list.length));
 },
 is$Iterator: true
};

$$.StackTrace = {"":
 ["stack"],
 super: "Object",
 toString$0: function() {
  var t1 = this.stack;
  return !(t1 == null) ? t1 : '';
 }
};

$$.Closure = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Closure';
 },
 is$Function: true
};

$$.MetaInfo = {"":
 ["set?", "tags", "tag?"],
 super: "Object",
 is$MetaInfo: true
};

$$.StringMatch = {"":
 ["pattern", "str", "_lib2_start"],
 super: "Object",
 group$1: function(group_) {
  $.intTypeCheck(group_);
  if (!$.eqB(group_, 0)) throw $.captureStackTrace($.IndexOutOfRangeException$(group_));
  return this.pattern;
 },
 operator$index$1: function(g) {
  return this.group$1($.intTypeCheck(g));
 }
};

$$.Object = {"":
 [],
 super: "",
 toString$0: function() {
  return $.Primitives_objectToString(this);
 }
};

$$.IndexOutOfRangeException = {"":
 ["_index"],
 super: "Object",
 toString$0: function() {
  return 'IndexOutOfRangeException: ' + $.S(this._index);
 }
};

$$.NoSuchMethodException = {"":
 ["_existingArgumentNames", "_arguments", "_functionName", "_receiver"],
 super: "Object",
 toString$0: function() {
  var sb = $.propertyTypeCheck($.StringBufferImpl$(''), 'is$StringBuffer');
  var t1 = this._arguments;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior())) return this.toString$0$bailout(1, sb, t1);
  var i = 0;
  for (; $.ltB(i, t1.length); i = $.intTypeCheck($.add(i, 1))) {
    $.gtB(i, 0) && sb.add$1(', ');
    if (i !== (i | 0)) throw $.iae(i);
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  t1 = this._existingArgumentNames;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior())) return this.toString$0$bailout(2, t1, sb);
  var actualParameters = $.stringTypeCheck(sb.toString$0());
  sb = $.propertyTypeCheck($.StringBufferImpl$(''), 'is$StringBuffer');
  for (i = 0; $.ltB(i, t1.length); i = $.intTypeCheck($.add(i, 1))) {
    $.gtB(i, 0) && sb.add$1(', ');
    if (i !== (i | 0)) throw $.iae(i);
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  var formalParameters = $.stringTypeCheck(sb.toString$0());
  t1 = this._functionName;
  return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
 },
 toString$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      sb = env0;
      t1 = env1;
      break;
    case 2:
      t1 = env0;
      sb = env1;
      break;
  }
  switch (state) {
    case 0:
      var sb = $.propertyTypeCheck($.StringBufferImpl$(''), 'is$StringBuffer');
      var t1 = this._arguments;
    case 1:
      state = 0;
      var i = 0;
      for (; $.ltB(i, $.get$length(t1)); i = $.intTypeCheck($.add(i, 1))) {
        $.gtB(i, 0) && sb.add$1(', ');
        sb.add$1($.index(t1, i));
      }
      t1 = this._existingArgumentNames;
    case 2:
      state = 0;
      if (t1 == null) return 'NoSuchMethodException : method not found: \'' + $.S(this._functionName) + '\'\n' + 'Receiver: ' + $.S(this._receiver) + '\n' + 'Arguments: [' + $.S(sb) + ']';
      var actualParameters = $.stringTypeCheck(sb.toString$0());
      sb = $.propertyTypeCheck($.StringBufferImpl$(''), 'is$StringBuffer');
      for (i = 0; $.ltB(i, $.get$length(t1)); i = $.intTypeCheck($.add(i, 1))) {
        $.gtB(i, 0) && sb.add$1(', ');
        sb.add$1($.index(t1, i));
      }
      var formalParameters = $.stringTypeCheck(sb.toString$0());
      t1 = this._functionName;
      return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
  }
 }
};

$$.ObjectNotClosureException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Object is not closure';
 }
};

$$.IllegalArgumentException = {"":
 ["_arg"],
 super: "Object",
 toString$0: function() {
  return 'Illegal argument(s): ' + $.S(this._arg);
 }
};

$$.StackOverflowException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Stack Overflow';
 }
};

$$.NullPointerException = {"":
 ["arguments", "functionName"],
 super: "Object",
 get$exceptionName: function() {
  return 'NullPointerException';
 },
 toString$0: function() {
  var t1 = this.functionName;
  if (t1 == null) return this.get$exceptionName();
  return $.S(this.get$exceptionName()) + ' : method: \'' + $.S(t1) + '\'\n' + 'Receiver: null\n' + 'Arguments: ' + $.S(this.arguments);
 }
};

$$.NoMoreElementsException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'NoMoreElementsException';
 }
};

$$.EmptyQueueException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'EmptyQueueException';
 }
};

$$.UnsupportedOperationException = {"":
 ["_message"],
 super: "Object",
 toString$0: function() {
  return 'UnsupportedOperationException: ' + $.S(this._message);
 }
};

$$.NotImplementedException = {"":
 ["_message"],
 super: "Object",
 toString$0: function() {
  var t1 = this._message;
  return !(t1 == null) ? 'NotImplementedException: ' + $.S(t1) : 'NotImplementedException';
 }
};

$$.IllegalJSRegExpException = {"":
 ["_errmsg", "_pattern"],
 super: "Object",
 toString$0: function() {
  return 'IllegalJSRegExpException: \'' + $.S(this._pattern) + '\' \'' + $.S(this._errmsg) + '\'';
 }
};

$$.ExpectException = {"":
 ["message"],
 super: "Object",
 toString$0: function() {
  return this.message;
 }
};

$$.AssertionError = {"":
 [],
 super: "Object"
};

$$.TypeError = {"":
 ["msg"],
 super: "AssertionError",
 toString$0: function() {
  return this.msg;
 }
};

$$.BenchmarkRunner = {"":
 ["resultsWriter", "benchmarks", "steps", "solveLoops"],
 super: "Object",
 addBenchmark$1: function(benchmark) {
  $.propertyTypeCheck(benchmark, 'is$Benchmark');
  this.benchmarks.push(benchmark);
 },
 runBenchmarks$0: function() {
  for (var t1 = $.iterator(this.benchmarks), t2 = this.resultsWriter; t1.hasNext$0() === true; ) {
    var t3 = t1.next$0();
    $.print('Running ' + $.S(t3.get$name()));
    $.clear(t2);
    t3.runBenchmark$1(t2);
    $.print(t2);
    $.print('');
    $.print('------------------------------------------------');
  }
 },
 setupBenchmarks$0: function() {
  var t1 = this.solveLoops;
  var t2 = this.steps;
  this.addBenchmark$1($.BallDropBench$(t1, t2));
  this.addBenchmark$1($.BallCageBench$(t1, t2));
  this.addBenchmark$1($.CircleStressBench$(t1, t2));
  this.addBenchmark$1($.DominoPlatformBench$(t1, t2));
  this.addBenchmark$1($.DominoTowerBench$(t1, t2));
 }
};

$$.Benchmark = {"":
 ["bodies?"],
 super: "Object",
 get$bodyCount: function() {
  return $.get$length(this.bodies);
 },
 get$checksum: function() {
  var positionSum = $.Vector$(0, 0);
  var velocitySum = $.Vector$(0, 0);
  for (var t1 = $.iterator(this.bodies); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    positionSum.addLocal$1(t2.get$position());
    velocitySum.addLocal$1(t2.get$linearVelocity());
  }
  return $.add($.add($.add(positionSum.x, positionSum.y), velocitySum.x), velocitySum.y);
 },
 runBenchmark$1: function(resultsWriter) {
  $.propertyTypeCheck(resultsWriter, 'is$StringBuffer');
  for (var t1 = $.iterator(this._steps), t2 = this.solveLoops; t1.hasNext$0() === true; ) {
    var t3 = t1.next$0();
    for (var t4 = $.iterator(t2); t4.hasNext$0() === true; ) {
      var t5 = t4.next$0();
      this.initialize$0();
      var watch = $.StopwatchImplementation$();
      watch.start$0();
      for (var i = 0; $.ltB(i, t3); ++i) {
        this.world.step$3(0.016666666666666666, t5, t5);
      }
      watch.stop$0();
      this._recordResults$4(watch.elapsedInMs$0(), resultsWriter, t5, t3);
    }
  }
 },
 runBenchmark$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      t3 = env0;
      watch = env1;
      var resultsWriter = env2;
      i = env3;
      t5 = env4;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(resultsWriter, 'is$StringBuffer');
      var t1 = $.iterator(this._steps);
      var t2 = this.solveLoops;
    case 1:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!(t1.hasNext$0() === true)) break L0;
            var t3 = t1.next$0();
            var t4 = $.iterator(t2);
          case 1:
            L1: while (true) {
              switch (state) {
                case 0:
                  if (!(t4.hasNext$0() === true)) break L1;
                  var t5 = t4.next$0();
                  this.initialize$0();
                  var watch = $.StopwatchImplementation$();
                  watch.start$0();
                  var i = 0;
                case 1:
                  L2: while (true) {
                    switch (state) {
                      case 0:
                        if (!$.ltB(i, t3)) break L2;
                        this.world.step$3(0.016666666666666666, t5, t5);
                        i = $.intTypeCheck($.add(i, 1));
                      case 1:
                        state = 0;
                    }
                  }
                  watch.stop$0();
                  this._recordResults$4(watch.elapsedInMs$0(), resultsWriter, t5, t3);
              }
            }
        }
      }
  }
 },
 _recordResults$4: function(time, resultsWriter, benchmarkIterations, steps) {
  if (typeof steps !== 'number') return this._recordResults$4$bailout(1, time, resultsWriter, benchmarkIterations, steps);
  $.intTypeCheck(time);
  if (time !== (time | 0)) return this._recordResults$4$bailout(2, resultsWriter, benchmarkIterations, steps, time);
  $.propertyTypeCheck(resultsWriter, 'is$StringBuffer');
  $.add$1(resultsWriter, this.get$name());
  $.add$1(resultsWriter, ' (' + $.S(steps) + ' steps, ' + $.S(benchmarkIterations) + ' solve loops)');
  $.add$1(resultsWriter, ' : ');
  $.add$1(resultsWriter, time);
  $.add$1(resultsWriter, 'ms');
  $.add$1(resultsWriter, '  (' + $.S(steps / (time / 1000)) + ' steps/second)');
  $.add$1(resultsWriter, '\n');
  $.add$1(resultsWriter, 'Checksum: ');
  $.add$1(resultsWriter, this.get$checksum());
  $.add$1(resultsWriter, '\n');
  $.add$1(resultsWriter, '\n');
 },
 _recordResults$4$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var time = env0;
      var resultsWriter = env1;
      var benchmarkIterations = env2;
      var steps = env3;
      break;
    case 2:
      resultsWriter = env0;
      benchmarkIterations = env1;
      steps = env2;
      time = env3;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      $.intTypeCheck(time);
    case 2:
      state = 0;
      $.propertyTypeCheck(resultsWriter, 'is$StringBuffer');
      $.add$1(resultsWriter, this.get$name());
      $.add$1(resultsWriter, ' (' + $.S(steps) + ' steps, ' + $.S(benchmarkIterations) + ' solve loops)');
      $.add$1(resultsWriter, ' : ');
      $.add$1(resultsWriter, time);
      $.add$1(resultsWriter, 'ms');
      $.add$1(resultsWriter, '  (' + $.S($.numTypeCheck($.div(steps, $.div(time, 1000)))) + ' steps/second)');
      $.add$1(resultsWriter, '\n');
      $.add$1(resultsWriter, 'Checksum: ');
      $.add$1(resultsWriter, this.get$checksum());
      $.add$1(resultsWriter, '\n');
      $.add$1(resultsWriter, '\n');
  }
 },
 resetWorld$0: function() {
  var t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, ({E: 'Body'}));
  this.bodies = t1;
  this.world = $.World$($.Vector$(0, -10), true, $.DefaultWorldPool$());
 },
 get$name: function() {
  return 'No Name Provided';
 },
 is$Benchmark: true
};

$$.BallCageBench = {"":
 ["_steps", "solveLoops", "world", "bodies"],
 super: "Benchmark",
 initialize$0: function() {
  this.resetWorld$0();
  var circleShape = $.CircleShape$();
  circleShape.radius = 2;
  var circleFixtureDef = $.FixtureDef$();
  circleFixtureDef.shape = circleShape;
  circleFixtureDef.friction = 0.9;
  circleFixtureDef.restitution = 1;
  var circleBodyDef = $.BodyDef$();
  var t1 = circleShape.radius;
  if (typeof t1 !== 'number') throw $.iae(t1);
  var borderLimitX = -20 + 20 * t1;
  for (var i = 0; $.ltB(i, 10); i = $.intTypeCheck($.add(i, 1))) {
    t1 = circleShape.radius * 2;
    if (typeof i !== 'number') throw $.iae(i);
    t1 *= i;
    if (typeof t1 !== 'number') throw $.iae(t1);
    var shiftX = -20 + t1;
    t1 = circleShape.radius * 2;
    if (typeof i !== 'number') throw $.iae(i);
    t1 *= i;
    if (typeof t1 !== 'number') throw $.iae(t1);
    var shiftY = -20 + t1;
    circleBodyDef.position = $.Vector$(shiftX, -20);
    var circleBody = $.propertyTypeCheck(this.world.createBody$1(circleBodyDef), 'is$Body');
    $.add$1(this.bodies, circleBody);
    circleBody.createFixture$1(circleFixtureDef);
    circleBodyDef.position = $.Vector$(shiftX, borderLimitX);
    circleBody = $.propertyTypeCheck(this.world.createBody$1(circleBodyDef), 'is$Body');
    $.add$1(this.bodies, circleBody);
    circleBody.createFixture$1(circleFixtureDef);
    circleBodyDef.position = $.Vector$(-20, shiftY);
    circleBody = $.propertyTypeCheck(this.world.createBody$1(circleBodyDef), 'is$Body');
    $.add$1(this.bodies, circleBody);
    circleBody.createFixture$1(circleFixtureDef);
    circleBodyDef.position = $.Vector$(borderLimitX, shiftY);
    circleBody = $.propertyTypeCheck(this.world.createBody$1(circleBodyDef), 'is$Body');
    $.add$1(this.bodies, circleBody);
    circleBody.createFixture$1(circleFixtureDef);
  }
  var bouncingCircle = $.CircleShape$();
  bouncingCircle.radius = 1;
  var activeFixtureDef = $.FixtureDef$();
  activeFixtureDef.restitution = 1;
  activeFixtureDef.density = 0.05;
  activeFixtureDef.shape = bouncingCircle;
  var activeBodyDef = $.BodyDef$();
  activeBodyDef.linearVelocity = $.Vector$(0, -20);
  activeBodyDef.position = $.Vector$(15, 15);
  activeBodyDef.type = 2;
  activeBodyDef.bullet = true;
  var activeBody = this.world.createBody$1(activeBodyDef);
  $.add$1(this.bodies, activeBody);
  activeBody.createFixture$1(activeFixtureDef);
 },
 get$name: function() {
  return 'Ball Cage';
 }
};

$$.BallDropBench = {"":
 ["_steps", "solveLoops", "world", "bodies"],
 super: "Benchmark",
 get$name: function() {
  return 'Ball Drop';
 },
 initialize$0: function() {
  this.resetWorld$0();
  var fd = $.FixtureDef$();
  var cd = $.CircleShape$();
  cd.radius = 1;
  fd.shape = cd;
  var bodyDef = $.BodyDef$();
  bodyDef.type = 2;
  bodyDef.position = $.Vector$(0, 0);
  var ballBody = this.world.createBody$1(bodyDef);
  ballBody.createFixture$1(fd);
  $.add$1(this.bodies, ballBody);
 }
};

$$.CircleStressBench = {"":
 ["_joint", "_steps", "solveLoops", "world", "bodies"],
 super: "Benchmark",
 initialize$0: function() {
  this.resetWorld$0();
  var bd = $.BodyDef$();
  var ground = this.world.createBody$1(bd);
  $.add$1(this.bodies, ground);
  var shape = $.PolygonShape$();
  shape.setAsEdge$2($.Vector$(-40.0, 0.0), $.Vector$(40.0, 0.0));
  ground.createFixtureFromShape$1(shape);
  var sd = $.PolygonShape$();
  sd.setAsBox$2(50.0, 10.0);
  bd = $.BodyDef$();
  bd.type = 0;
  bd.position = $.Vector$(0.0, -10.0);
  var b = this.world.createBody$1(bd);
  $.add$1(this.bodies, b);
  var fd = $.FixtureDef$();
  fd.shape = sd;
  fd.friction = 1.0;
  b.createFixture$1(fd);
  sd.setAsBox$2(3.0, 50.0);
  var wallDef = $.BodyDef$();
  wallDef.position = $.Vector$(45.0, 25.0);
  var rightWall = $.propertyTypeCheck(this.world.createBody$1(wallDef), 'is$Body');
  $.add$1(this.bodies, rightWall);
  rightWall.createFixtureFromShape$1(sd);
  wallDef.position = $.Vector$(-45.0, 25.0);
  var leftWall = $.propertyTypeCheck(this.world.createBody$1(wallDef), 'is$Body');
  $.add$1(this.bodies, leftWall);
  leftWall.createFixtureFromShape$1(sd);
  var cornerDef = $.BodyDef$();
  sd.setAsBox$2(20.0, 3.0);
  cornerDef.angle = -0.7853981633974483;
  cornerDef.position = $.Vector$(-35, 8.0);
  var myBod = $.propertyTypeCheck(this.world.createBody$1(cornerDef), 'is$Body');
  $.add$1(this.bodies, myBod);
  myBod.createFixtureFromShape$1(sd);
  cornerDef.angle = 0.7853981633974483;
  cornerDef.position = $.Vector$(35, 8.0);
  myBod = $.propertyTypeCheck(this.world.createBody$1(cornerDef), 'is$Body');
  $.add$1(this.bodies, myBod);
  myBod.createFixtureFromShape$1(sd);
  sd.setAsBox$2(50.0, 10.0);
  var topDef = $.BodyDef$();
  topDef.type = 0;
  topDef.angle = 0;
  topDef.position = $.Vector$(0.0, 75.0);
  var topBody = this.world.createBody$1(topDef);
  $.add$1(this.bodies, topBody);
  fd.shape = sd;
  fd.friction = 1.0;
  topBody.createFixture$1(fd);
  bd = $.BodyDef$();
  bd.type = 2;
  bd.position = $.Vector$(0.0, 10.0);
  var body = this.world.createBody$1(bd);
  $.add$1(this.bodies, body);
  for (var i = 0; $.ltB(i, 5); i = $.intTypeCheck($.add(i, 1))) {
    fd = $.FixtureDef$();
    var cd = $.CircleShape$();
    cd.radius = 1.2;
    fd.shape = cd;
    fd.density = 25;
    fd.friction = 0.1;
    fd.restitution = 0.9;
    var t1 = $.div(i, $.toDouble(5));
    if (typeof t1 !== 'number') throw $.iae(t1);
    var t2 = $.Math_cos(6.283185307179586 * t1);
    if (typeof t2 !== 'number') throw $.iae(t2);
    var xPos = 6 * t2;
    t2 = $.div(i, $.toDouble(5));
    if (typeof t2 !== 'number') throw $.iae(t2);
    var t3 = $.Math_sin(6.283185307179586 * t2);
    if (typeof t3 !== 'number') throw $.iae(t3);
    var yPos = 6 * t3;
    cd.position.setCoords$2(xPos, yPos);
    body.createFixture$1(fd);
  }
  body.set$bullet(false);
  var bodyDef = $.BodyDef$();
  var groundBody = this.world.createBody$1(bodyDef);
  var rjd = $.RevoluteJointDef$();
  rjd.initialize$3(body, groundBody, body.get$position());
  rjd.motorSpeed = 3.141592653589793;
  rjd.maxMotorTorque = 1000000.0;
  rjd.enableMotor = true;
  this._joint = this.world.createJoint$1(rjd);
  for (var j = 0; $.ltB(j, 8); j = $.intTypeCheck($.add(j, 1))) {
    for (i = 0; $.ltB(i, 20); i = $.intTypeCheck($.add(i, 1))) {
      var circ = $.CircleShape$();
      var bod = $.BodyDef$();
      bod.type = 2;
      circ.radius = 1.0 + ($.eqB($.mod(i, 2), 0) ? 1.0 : -1.0) * 0.5 * 0.75;
      var fd2 = $.FixtureDef$();
      fd2.shape = circ;
      fd2.density = circ.radius * 1.5;
      fd2.friction = 0.5;
      fd2.restitution = 0.7;
      if (typeof i !== 'number') throw $.iae(i);
      xPos = -39 + 2 * i;
      if (typeof j !== 'number') throw $.iae(j);
      bod.position = $.Vector$(xPos, 50 + j);
      var myBody = $.propertyTypeCheck(this.world.createBody$1(bod), 'is$Body');
      $.add$1(this.bodies, myBody);
      myBody.createFixture$1(fd2);
    }
  }
 },
 get$name: function() {
  return 'Circle Stress';
 }
};

$$.DominoPlatformBench = {"":
 ["_steps", "solveLoops", "world", "bodies"],
 super: "Benchmark",
 initialize$0: function() {
  this.resetWorld$0();
  var fd = $.FixtureDef$();
  var sd = $.PolygonShape$();
  sd.setAsBox$2(50.0, 10.0);
  fd.shape = sd;
  var bd = $.BodyDef$();
  bd.position = $.Vector$(0.0, -10.0);
  var body = this.world.createBody$1(bd);
  body.createFixture$1(fd);
  $.add$1(this.bodies, body);
  for (var i = 0; $.ltB(i, 4); i = $.intTypeCheck($.add(i, 1))) {
    fd = $.FixtureDef$();
    sd = $.PolygonShape$();
    sd.setAsBox$2(15.0, 0.125);
    fd.shape = sd;
    bd = $.BodyDef$();
    if (typeof i !== 'number') throw $.iae(i);
    bd.position = $.Vector$(0.0, 5 + 5 * i);
    body = this.world.createBody$1(bd);
    body.createFixture$1(fd);
    $.add$1(this.bodies, body);
  }
  fd = $.FixtureDef$();
  sd = $.PolygonShape$();
  sd.setAsBox$2(0.125, 2);
  fd.shape = sd;
  fd.density = 25.0;
  bd = $.BodyDef$();
  bd.type = 2;
  for (var t1 = 25 - 1, t2 = 29.5 / t1, i = 0; $.ltB(i, 4); i = $.intTypeCheck($.add(i, 1))) {
    for (var j = 0; $.ltB(j, 25); j = $.intTypeCheck($.add(j, 1))) {
      fd.friction = 0.5;
      var t3 = $.mul(j, t2);
      if (typeof t3 !== 'number') throw $.iae(t3);
      t3 += -14.75;
      if (typeof i !== 'number') throw $.iae(i);
      bd.position = $.Vector$(t3, 7.3 + 5 * i);
      if (i === 2 && $.eqB(j, 0)) {
        bd.angle = -0.1;
        t3 = bd.position;
        t3.set$x($.add(t3.get$x(), 0.1));
      } else {
        if (i === 3 && $.eqB(j, t1)) {
          bd.angle = 0.1;
          t3 = bd.position;
          t3.set$x($.sub(t3.get$x(), 0.1));
        } else bd.angle = 0;
      }
      var myBody = $.propertyTypeCheck(this.world.createBody$1(bd), 'is$Body');
      myBody.createFixture$1(fd);
      $.add$1(this.bodies, myBody);
    }
  }
 },
 get$name: function() {
  return 'Domino Platforms';
 }
};

$$.DominoTowerBench = {"":
 ["dominoDensity", "_steps", "solveLoops", "world", "bodies"],
 super: "Benchmark",
 initialize$0: function() {
  this.resetWorld$0();
  var sd = $.PolygonShape$();
  sd.setAsBox$2(50.0, 10.0);
  var bd = $.BodyDef$();
  bd.position = $.Vector$(0.0, -10.0);
  var body = this.world.createBody$1(bd);
  body.createFixtureFromShape$1(sd);
  $.add$1(this.bodies, body);
  this.dominoDensity = 10;
  sd = $.PolygonShape$();
  sd.setAsBox$2(0.7, 0.7);
  var fd = $.FixtureDef$();
  fd.density = 35;
  bd = $.BodyDef$();
  bd.type = 2;
  fd.shape = sd;
  fd.friction = 0;
  fd.restitution = 0.85;
  bd.bullet = true;
  bd.position = $.Vector$(30, 50);
  var b = $.propertyTypeCheck(this.world.createBody$1(bd), 'is$Body');
  $.add$1(this.bodies, b);
  b.createFixture$1(fd);
  b.set$linearVelocity($.Vector$(-25, -25));
  b.set$angularVelocity(6.7);
  fd.density = 25;
  bd.position = $.Vector$(-30, 25);
  b = $.propertyTypeCheck(this.world.createBody$1(bd), 'is$Body');
  $.add$1(this.bodies, b);
  b.createFixture$1(fd);
  b.set$linearVelocity($.Vector$(35, -10));
  b.set$angularVelocity(-8.3);
  for (var currX = null, i = 0; $.ltB(i, 25); i = $.intTypeCheck($.add(i, 1))) {
    currX = $.numTypeCheck($.sub($.mul($.mul(i, 1.5), 1), 18.75));
    this.makeDomino$4(currX, 0.5, false, this.world);
    this.makeDomino$4(currX, 1.1, true, this.world);
  }
  for (var j = 1, currX = 18.75; $.ltB(j, 25); j = $.intTypeCheck($.add(j, 1))) {
    if ($.gtB(j, 3)) this.dominoDensity = $.mul(this.dominoDensity, 0.8);
    if (typeof j !== 'number') throw $.iae(j);
    var currY = 0.5 + 1.386 * j;
    for (var t1 = 25 - j, t2 = 1.5 * t1 / 2, t3 = currY - 0.2, t4 = t1 - 1, t5 = currY + 0.6, t6 = currY - 0.6, i = 0; $.ltB(i, t1); i = $.intTypeCheck($.add(i, 1))) {
      currX = $.numTypeCheck($.sub($.mul($.mul(i, 1.5), 1), t2));
      this.dominoDensity = $.mul(this.dominoDensity, 2.5);
      $.eqB(i, 0) && this.makeDomino$4($.add($.sub(currX, 1.25), 0.1), t3, false, this.world);
      $.eqB(i, t4) && this.makeDomino$4($.sub($.add(currX, 1.25), 0.1), t3, false, this.world);
      this.dominoDensity = $.div(this.dominoDensity, 2.5);
      this.makeDomino$4(currX, currY, false, this.world);
      this.makeDomino$4(currX, t5, true, this.world);
      this.makeDomino$4(currX, t6, true, this.world);
    }
  }
 },
 makeDomino$4: function(x, y, horizontal, world_) {
  $.numTypeCheck(x);
  $.numTypeCheck(y);
  $.boolTypeCheck(horizontal);
  $.propertyTypeCheck(world_, 'is$World');
  var sd = $.PolygonShape$();
  sd.setAsBox$2(0.1, 0.5);
  var fd = $.FixtureDef$();
  fd.shape = sd;
  fd.density = this.dominoDensity;
  var bd = $.BodyDef$();
  bd.type = 2;
  fd.friction = 0.1;
  fd.restitution = 0.65;
  bd.position = $.Vector$(x, y);
  bd.angle = horizontal === true ? 1.5707963267948966 : 0;
  var myBody = $.propertyTypeCheck(world_.createBody$1(bd), 'is$Body');
  myBody.createFixture$1(fd);
  $.add$1(this.bodies, myBody);
 },
 get$name: function() {
  return 'Domino Tower';
 }
};

$$.AxisAlignedBox = {"":
 ["upperBound?", "lowerBound?"],
 super: "Object",
 toString$0: function() {
  return $.add($.add($.toString(this.lowerBound), ', '), $.toString(this.upperBound));
 },
 setFrom$1: function(other) {
  $.propertyTypeCheck(other, 'is$AxisAlignedBox');
  this.lowerBound.setFrom$1(other.get$lowerBound());
  this.upperBound.setFrom$1(other.get$upperBound());
 },
 contains$1: function(aabb) {
  $.propertyTypeCheck(aabb, 'is$AxisAlignedBox');
  var t1 = this.lowerBound;
  return $.gtB(t1.get$x(), aabb.get$lowerBound().get$x()) && $.gtB(t1.get$y(), aabb.get$lowerBound().get$y()) && $.ltB(this.upperBound.get$y(), aabb.get$upperBound().get$y()) && $.ltB(this.upperBound.get$x(), aabb.get$upperBound().get$x());
 },
 get$center: function() {
  var c = $.Vector$copy(this.lowerBound);
  c.addLocal$1(this.upperBound);
  c.mulLocal$1(0.5);
  return c;
 },
 setFromCombination$2: function(boxOne, boxTwo) {
  $.propertyTypeCheck(boxOne, 'is$AxisAlignedBox');
  $.propertyTypeCheck(boxTwo, 'is$AxisAlignedBox');
  var t1 = $.Math_min(boxOne.get$lowerBound().get$x(), boxTwo.get$lowerBound().get$x());
  var t2 = this.lowerBound;
  t2.set$x(t1);
  t2.set$y($.Math_min(boxOne.get$lowerBound().get$y(), boxTwo.get$lowerBound().get$y()));
  t2 = $.Math_max(boxOne.get$upperBound().get$x(), boxTwo.get$upperBound().get$x());
  t1 = this.upperBound;
  t1.set$x(t2);
  t1.set$y($.Math_max(boxOne.get$upperBound().get$y(), boxTwo.get$upperBound().get$y()));
 },
 AxisAlignedBox$2: function(lowerBound, upperBound) {
  var t1 = this.lowerBound;
  if (t1 == null) this.lowerBound = $.Vector$(0, 0);
  t1 = this.upperBound;
  if (t1 == null) this.upperBound = $.Vector$(0, 0);
 },
 is$AxisAlignedBox: true
};

$$.Collision = {"":
 ["clipPoints2", "clipPoints1", "v12", "v11", "normal1", "normal?", "tangent", "planePoint", "localNormal", "localTangent", "incidentEdge?", "results2", "results1", "output", "input", "cache", "_pool"],
 super: "Object",
 collidePolygons$5: function(manifold, polyA, xfA, polyB, xfB) {
  $.propertyTypeCheck(manifold, 'is$Manifold');
  $.propertyTypeCheck(polyA, 'is$PolygonShape');
  $.propertyTypeCheck(xfA, 'is$Transform');
  $.propertyTypeCheck(polyB, 'is$PolygonShape');
  $.propertyTypeCheck(xfB, 'is$Transform');
  manifold.set$pointCount(0);
  var totalRadius = $.numTypeCheck($.add(polyA.get$radius(), polyB.get$radius()));
  if (typeof totalRadius !== 'number') return this.collidePolygons$5$bailout(1, totalRadius, manifold, polyA, xfA, polyB, xfB, 0, 0, 0, 0, 0, 0);
  var t1 = this.results1;
  this.findMaxSeparation$5(t1, polyA, xfA, polyB, xfB);
  if (t1.separation > totalRadius) return;
  var t2 = this.results2;
  this.findMaxSeparation$5(t2, polyB, xfB, polyA, xfA);
  if (t2.separation > totalRadius) return;
  var t3 = t2.separation;
  var t4 = t1.separation;
  if (typeof t4 !== 'number') throw $.iae(t4);
  if (t3 > 0.98 * t4 + 0.001) {
    var edge1 = $.intTypeCheck(t2.edgeIndex);
    manifold.set$type(2);
    var poly2 = polyA;
    var xf2 = xfA;
    var xf1 = xfB;
    var poly1 = polyB;
    var flip = 1;
  } else {
    edge1 = $.intTypeCheck(t1.edgeIndex);
    manifold.set$type(1);
    poly2 = polyB;
    xf2 = xfB;
    xf1 = xfA;
    poly1 = polyA;
    flip = 0;
  }
  t1 = this.incidentEdge;
  this.findIncidentEdge$6(t1, poly1, xf1, edge1, poly2, xf2);
  var count1 = $.intTypeCheck(poly1.get$vertexCount());
  var vertices1 = $.listTypeCheck(poly1.get$vertices());
  t2 = this.v11;
  t2.setFrom$1($.index(vertices1, edge1));
  t3 = this.v12;
  t3.setFrom$1($.ltB($.add(edge1, 1), count1) ? $.index(vertices1, $.add(edge1, 1)) : $.index(vertices1, 0));
  t4 = this.localTangent;
  t4.setFrom$1(t3).subLocal$1(t2);
  t4.normalize$0();
  var t5 = this.localNormal;
  $.Vector_crossVectorAndNumToOut(t4, 1, t5);
  var t6 = this.planePoint;
  t6.setFrom$1(t2).addLocal$1(t3).mulLocal$1(0.5);
  var t7 = xf1.get$rotation();
  var t8 = this.tangent;
  $.Matrix22_mulMatrixAndVectorToOut(t7, t4, t8);
  t4 = this.normal;
  $.Vector_crossVectorAndNumToOut(t8, 1, t4);
  $.Transform_mulToOut(xf1, t2, t2);
  $.Transform_mulToOut(xf1, t3, t3);
  var frontOffset = $.numTypeCheck($.Vector_dot(t4, t2));
  if (typeof frontOffset !== 'number') return this.collidePolygons$5$bailout(2, manifold, flip, xf2, t1, t3, t2, frontOffset, totalRadius, t5, t6, t8, t4);
  var sideOffset1 = $.numTypeCheck($.add($.neg($.Vector_dot(t8, t2)), totalRadius));
  var sideOffset2 = $.numTypeCheck($.add($.Vector_dot(t8, t3), totalRadius));
  t8.negateLocal$0();
  t7 = this.clipPoints1;
  var np = $.intTypeCheck($.Collision_clipSegmentToLine(t7, t1, t8, sideOffset1));
  t8.negateLocal$0();
  if ($.ltB(np, 2)) return;
  t1 = this.clipPoints2;
  if ($.ltB($.intTypeCheck($.Collision_clipSegmentToLine(t1, t7, t8, sideOffset2)), 2)) return;
  manifold.get$localNormal().setFrom$1(t5);
  manifold.get$localPoint().setFrom$1(t6);
  for (var pointCount = 0, i = 0; $.ltB(i, 2); i = $.intTypeCheck($.add(i, 1))) {
    if (i !== (i | 0)) throw $.iae(i);
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    if ($.leB($.numTypeCheck($.sub($.Vector_dot(t4, t1[i].get$v()), frontOffset)), totalRadius)) {
      var cp = $.propertyTypeCheck($.index(manifold.get$points(), pointCount), 'is$ManifoldPoint');
      t2 = t1.length;
      if (i < 0 || i >= t2) throw $.ioore(i);
      $.Transform_mulTransToOut(xf2, t1[i].get$v(), cp.get$localPoint());
      t3 = cp.get$id();
      t5 = t1.length;
      if (i < 0 || i >= t5) throw $.ioore(i);
      t3.setFrom$1(t1[i].get$id());
      cp.get$id().get$features().set$flip(flip);
      pointCount = $.intTypeCheck($.add(pointCount, 1));
    }
  }
  manifold.set$pointCount(pointCount);
 },
 collidePolygons$5$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11) {
  switch (state) {
    case 1:
      totalRadius = env0;
      var manifold = env1;
      var polyA = env2;
      var xfA = env3;
      var polyB = env4;
      var xfB = env5;
      break;
    case 2:
      manifold = env0;
      flip = env1;
      xf2 = env2;
      t1 = env3;
      t3 = env4;
      t2 = env5;
      frontOffset = env6;
      totalRadius = env7;
      t5 = env8;
      t6 = env9;
      t8 = env10;
      t4 = env11;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(manifold, 'is$Manifold');
      $.propertyTypeCheck(polyA, 'is$PolygonShape');
      $.propertyTypeCheck(xfA, 'is$Transform');
      $.propertyTypeCheck(polyB, 'is$PolygonShape');
      $.propertyTypeCheck(xfB, 'is$Transform');
      manifold.set$pointCount(0);
      var totalRadius = $.numTypeCheck($.add(polyA.get$radius(), polyB.get$radius()));
    case 1:
      state = 0;
      var t1 = this.results1;
      this.findMaxSeparation$5(t1, polyA, xfA, polyB, xfB);
      if ($.gtB(t1.get$separation(), totalRadius)) return;
      var t2 = this.results2;
      this.findMaxSeparation$5(t2, polyB, xfB, polyA, xfA);
      if ($.gtB(t2.get$separation(), totalRadius)) return;
      var t3 = t2.get$separation();
      var t4 = t1.get$separation();
      if (typeof t4 !== 'number') throw $.iae(t4);
      if ($.gtB(t3, 0.98 * t4 + 0.001)) {
        var edge1 = $.intTypeCheck(t2.get$edgeIndex());
        manifold.set$type(2);
        var poly2 = polyA;
        var xf2 = xfA;
        var xf1 = xfB;
        var poly1 = polyB;
        var flip = 1;
      } else {
        edge1 = $.intTypeCheck(t1.get$edgeIndex());
        manifold.set$type(1);
        poly2 = polyB;
        xf2 = xfB;
        xf1 = xfA;
        poly1 = polyA;
        flip = 0;
      }
      t1 = this.incidentEdge;
      this.findIncidentEdge$6(t1, poly1, xf1, edge1, poly2, xf2);
      var count1 = $.intTypeCheck(poly1.get$vertexCount());
      var vertices1 = $.listTypeCheck(poly1.get$vertices());
      t2 = this.v11;
      t2.setFrom$1($.index(vertices1, edge1));
      t3 = this.v12;
      t3.setFrom$1($.ltB($.add(edge1, 1), count1) ? $.index(vertices1, $.add(edge1, 1)) : $.index(vertices1, 0));
      t4 = this.localTangent;
      t4.setFrom$1(t3).subLocal$1(t2);
      t4.normalize$0();
      var t5 = this.localNormal;
      $.Vector_crossVectorAndNumToOut(t4, 1, t5);
      var t6 = this.planePoint;
      t6.setFrom$1(t2).addLocal$1(t3).mulLocal$1(0.5);
      var t7 = xf1.get$rotation();
      var t8 = this.tangent;
      $.Matrix22_mulMatrixAndVectorToOut(t7, t4, t8);
      t4 = this.normal;
      $.Vector_crossVectorAndNumToOut(t8, 1, t4);
      $.Transform_mulToOut(xf1, t2, t2);
      $.Transform_mulToOut(xf1, t3, t3);
      var frontOffset = $.numTypeCheck($.Vector_dot(t4, t2));
    case 2:
      state = 0;
      var sideOffset1 = $.numTypeCheck($.add($.neg($.Vector_dot(t8, t2)), totalRadius));
      var sideOffset2 = $.numTypeCheck($.add($.Vector_dot(t8, t3), totalRadius));
      t8.negateLocal$0();
      t7 = this.clipPoints1;
      var np = $.intTypeCheck($.Collision_clipSegmentToLine(t7, t1, t8, sideOffset1));
      t8.negateLocal$0();
      if ($.ltB(np, 2)) return;
      t1 = this.clipPoints2;
      if ($.ltB($.intTypeCheck($.Collision_clipSegmentToLine(t1, t7, t8, sideOffset2)), 2)) return;
      manifold.get$localNormal().setFrom$1(t5);
      manifold.get$localPoint().setFrom$1(t6);
      for (var pointCount = 0, i = 0; $.ltB(i, 2); i = $.intTypeCheck($.add(i, 1))) {
        if (i !== (i | 0)) throw $.iae(i);
        t2 = t1.length;
        if (i < 0 || i >= t2) throw $.ioore(i);
        if ($.leB($.numTypeCheck($.sub($.Vector_dot(t4, t1[i].get$v()), frontOffset)), totalRadius)) {
          var cp = $.propertyTypeCheck($.index(manifold.get$points(), pointCount), 'is$ManifoldPoint');
          t2 = t1.length;
          if (i < 0 || i >= t2) throw $.ioore(i);
          $.Transform_mulTransToOut(xf2, t1[i].get$v(), cp.get$localPoint());
          t3 = cp.get$id();
          t5 = t1.length;
          if (i < 0 || i >= t5) throw $.ioore(i);
          t3.setFrom$1(t1[i].get$id());
          cp.get$id().get$features().set$flip(flip);
          pointCount = $.intTypeCheck($.add(pointCount, 1));
        }
      }
      manifold.set$pointCount(pointCount);
  }
 },
 findIncidentEdge$6: function(c, poly1, xf1, edge1, poly2, xf2) {
  $.listTypeCheck(c);
  $.propertyTypeCheck(poly1, 'is$PolygonShape');
  $.propertyTypeCheck(xf1, 'is$Transform');
  $.intTypeCheck(edge1);
  $.propertyTypeCheck(poly2, 'is$PolygonShape');
  $.propertyTypeCheck(xf2, 'is$Transform');
  var count1 = $.intTypeCheck(poly1.get$vertexCount());
  var normals1 = $.listTypeCheck(poly1.get$normals());
  var count2 = $.intTypeCheck(poly2.get$vertexCount());
  if (count2 !== (count2 | 0)) return this.findIncidentEdge$6$bailout(1, normals1, count2, c, xf1, edge1, poly2, xf2, count1);
  var vertices2 = $.listTypeCheck(poly2.get$vertices());
  var normals2 = $.listTypeCheck(poly2.get$normals());
  $.assert($.leB(0, edge1) && $.ltB(edge1, count1));
  var t1 = xf1.get$rotation();
  var t2 = $.index(normals1, edge1);
  var t3 = this.normal1;
  $.Matrix22_mulMatrixAndVectorToOut(t1, t2, t3);
  $.Matrix22_mulTransMatrixAndVectorToOut(xf2.get$rotation(), t3, t3);
  for (var minDot = 99999999999999.0, i = 0, index = 0; $.ltB(i, count2); i = $.intTypeCheck($.add(i, 1))) {
    var dot = $.numTypeCheck($.Vector_dot(t3, $.index(normals2, i)));
    if ($.ltB(dot, minDot)) {
      index = i;
      minDot = dot;
    }
  }
  var i2 = $.intTypeCheck($.ltB($.add(index, 1), count2) ? $.add(index, 1) : 0);
  $.Transform_mulToOut(xf2, $.index(vertices2, index), $.index(c, 0).get$v());
  $.index(c, 0).get$id().get$features().set$referenceEdge(edge1);
  $.index(c, 0).get$id().get$features().set$incidentEdge(index);
  $.index(c, 0).get$id().get$features().set$incidentVertex(0);
  $.Transform_mulToOut(xf2, $.index(vertices2, i2), $.index(c, 1).get$v());
  $.index(c, 1).get$id().get$features().set$referenceEdge(edge1);
  $.index(c, 1).get$id().get$features().set$incidentEdge(i2);
  $.index(c, 1).get$id().get$features().set$incidentVertex(1);
 },
 findIncidentEdge$6$bailout: function(state, normals1, count2, c, xf1, edge1, poly2, xf2, count1) {
  var vertices2 = $.listTypeCheck(poly2.get$vertices());
  var normals2 = $.listTypeCheck(poly2.get$normals());
  $.assert($.leB(0, edge1) && $.ltB(edge1, count1));
  var t1 = xf1.get$rotation();
  var t2 = $.index(normals1, edge1);
  var t3 = this.normal1;
  $.Matrix22_mulMatrixAndVectorToOut(t1, t2, t3);
  $.Matrix22_mulTransMatrixAndVectorToOut(xf2.get$rotation(), t3, t3);
  for (var minDot = 99999999999999.0, i = 0, index = 0; $.ltB(i, count2); i = $.intTypeCheck($.add(i, 1))) {
    var dot = $.numTypeCheck($.Vector_dot(t3, $.index(normals2, i)));
    if ($.ltB(dot, minDot)) {
      index = i;
      minDot = dot;
    }
  }
  var i2 = $.intTypeCheck($.ltB($.add(index, 1), count2) ? $.add(index, 1) : 0);
  $.Transform_mulToOut(xf2, $.index(vertices2, index), $.index(c, 0).get$v());
  $.index(c, 0).get$id().get$features().set$referenceEdge(edge1);
  $.index(c, 0).get$id().get$features().set$incidentEdge(index);
  $.index(c, 0).get$id().get$features().set$incidentVertex(0);
  $.Transform_mulToOut(xf2, $.index(vertices2, i2), $.index(c, 1).get$v());
  $.index(c, 1).get$id().get$features().set$referenceEdge(edge1);
  $.index(c, 1).get$id().get$features().set$incidentEdge(i2);
  $.index(c, 1).get$id().get$features().set$incidentVertex(1);
 },
 findMaxSeparation$5: function(results, poly1, xf1, poly2, xf2) {
  $.propertyTypeCheck(results, 'is$EdgeResults');
  $.propertyTypeCheck(poly1, 'is$PolygonShape');
  $.propertyTypeCheck(xf1, 'is$Transform');
  $.propertyTypeCheck(poly2, 'is$PolygonShape');
  $.propertyTypeCheck(xf2, 'is$Transform');
  var count1 = $.intTypeCheck(poly1.get$vertexCount());
  if (count1 !== (count1 | 0)) return this.findMaxSeparation$5$bailout(1, results, poly1, xf1, poly2, xf2, count1, 0, 0, 0, 0, 0);
  var normals1 = $.listTypeCheck(poly1.get$normals());
  var v = $.propertyTypeCheck(poly2.get$centroid(), 'is$Vector');
  var predy = $.numTypeCheck($.add($.add(xf2.get$position().get$y(), $.mul(xf2.get$rotation().get$col1().get$y(), v.get$x())), $.mul(xf2.get$rotation().get$col2().get$y(), v.get$y())));
  var predx = $.numTypeCheck($.add($.add(xf2.get$position().get$x(), $.mul(xf2.get$rotation().get$col1().get$x(), v.get$x())), $.mul(xf2.get$rotation().get$col2().get$x(), v.get$y())));
  var v1 = $.propertyTypeCheck(poly1.get$centroid(), 'is$Vector');
  var tempy = $.numTypeCheck($.add($.add(xf1.get$position().get$y(), $.mul(xf1.get$rotation().get$col1().get$y(), v1.get$x())), $.mul(xf1.get$rotation().get$col2().get$y(), v1.get$y())));
  var dx = $.numTypeCheck($.sub(predx, $.numTypeCheck($.add($.add(xf1.get$position().get$x(), $.mul(xf1.get$rotation().get$col1().get$x(), v1.get$x())), $.mul(xf1.get$rotation().get$col2().get$x(), v1.get$y())))));
  var dy = $.numTypeCheck($.sub(predy, tempy));
  var R = $.propertyTypeCheck(xf1.get$rotation(), 'is$Matrix22');
  var dLocal1x = $.numTypeCheck($.add($.mul(dx, R.get$col1().get$x()), $.mul(dy, R.get$col1().get$y())));
  if (typeof dLocal1x !== 'number') return this.findMaxSeparation$5$bailout(2, dx, dLocal1x, dy, results, poly1, xf1, R, poly2, xf2, count1, normals1);
  var dLocal1y = $.numTypeCheck($.add($.mul(dx, R.get$col2().get$x()), $.mul(dy, R.get$col2().get$y())));
  if (typeof dLocal1y !== 'number') return this.findMaxSeparation$5$bailout(3, dLocal1x, results, poly1, xf1, poly2, xf2, count1, dLocal1y, normals1, 0, 0);
  for (var edge = 0, i = 0, maxDot = 1e-12, dot = null; $.ltB(i, count1); i = $.intTypeCheck($.add(i, 1))) {
    var norm = $.propertyTypeCheck($.index(normals1, i), 'is$Vector');
    dot = $.numTypeCheck($.add($.mul(norm.get$x(), dLocal1x), $.mul(norm.get$y(), dLocal1y)));
    if ($.gtB(dot, maxDot)) {
      edge = i;
      maxDot = dot;
    }
  }
  var s = $.numTypeCheck(this.edgeSeparation$5(poly1, xf1, edge, poly2, xf2));
  var prevEdge = $.intTypeCheck($.geB($.sub(edge, 1), 0) ? $.sub(edge, 1) : count1 - 1);
  var sPrev = $.numTypeCheck(this.edgeSeparation$5(poly1, xf1, prevEdge, poly2, xf2));
  var nextEdge = $.intTypeCheck($.ltB($.add(edge, 1), count1) ? $.add(edge, 1) : 0);
  var sNext = $.numTypeCheck(this.edgeSeparation$5(poly1, xf1, nextEdge, poly2, xf2));
  if ($.gtB(sPrev, s) && $.gtB(sPrev, sNext)) {
    var bestSeparation = sPrev;
    var bestEdge = prevEdge;
    var increment = -1;
  } else {
    if (!$.gtB(sNext, s)) {
      results.set$edgeIndex(edge);
      results.set$separation(s);
      return;
    }
    bestSeparation = sNext;
    bestEdge = nextEdge;
    increment = 1;
  }
  if (bestEdge !== (bestEdge | 0)) return this.findMaxSeparation$5$bailout(4, edge, bestEdge, s, bestSeparation, results, poly1, xf1, poly2, xf2, count1, increment);
  for (var t1 = increment === -1, edge0 = count1 - 1; true; ) {
    if (t1) {
      edge = $.intTypeCheck($.geB($.sub(bestEdge, 1), 0) ? $.sub(bestEdge, 1) : edge0);
    } else {
      edge = $.intTypeCheck($.ltB($.add(bestEdge, 1), count1) ? $.add(bestEdge, 1) : 0);
    }
    s = $.numTypeCheck(this.edgeSeparation$5(poly1, xf1, edge, poly2, xf2));
    if (!$.gtB(s, bestSeparation)) break;
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
      dx = env0;
      dLocal1x = env1;
      dy = env2;
      results = env3;
      poly1 = env4;
      xf1 = env5;
      R = env6;
      poly2 = env7;
      xf2 = env8;
      count1 = env9;
      normals1 = env10;
      break;
    case 3:
      dLocal1x = env0;
      results = env1;
      poly1 = env2;
      xf1 = env3;
      poly2 = env4;
      xf2 = env5;
      count1 = env6;
      dLocal1y = env7;
      normals1 = env8;
      break;
    case 4:
      edge = env0;
      bestEdge = env1;
      s = env2;
      bestSeparation = env3;
      results = env4;
      poly1 = env5;
      xf1 = env6;
      poly2 = env7;
      xf2 = env8;
      count1 = env9;
      increment = env10;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(results, 'is$EdgeResults');
      $.propertyTypeCheck(poly1, 'is$PolygonShape');
      $.propertyTypeCheck(xf1, 'is$Transform');
      $.propertyTypeCheck(poly2, 'is$PolygonShape');
      $.propertyTypeCheck(xf2, 'is$Transform');
      var count1 = $.intTypeCheck(poly1.get$vertexCount());
    case 1:
      state = 0;
      var normals1 = $.listTypeCheck(poly1.get$normals());
      var v = $.propertyTypeCheck(poly2.get$centroid(), 'is$Vector');
      var predy = $.numTypeCheck($.add($.add(xf2.get$position().get$y(), $.mul(xf2.get$rotation().get$col1().get$y(), v.get$x())), $.mul(xf2.get$rotation().get$col2().get$y(), v.get$y())));
      var predx = $.numTypeCheck($.add($.add(xf2.get$position().get$x(), $.mul(xf2.get$rotation().get$col1().get$x(), v.get$x())), $.mul(xf2.get$rotation().get$col2().get$x(), v.get$y())));
      var v1 = $.propertyTypeCheck(poly1.get$centroid(), 'is$Vector');
      var tempy = $.numTypeCheck($.add($.add(xf1.get$position().get$y(), $.mul(xf1.get$rotation().get$col1().get$y(), v1.get$x())), $.mul(xf1.get$rotation().get$col2().get$y(), v1.get$y())));
      var dx = $.numTypeCheck($.sub(predx, $.numTypeCheck($.add($.add(xf1.get$position().get$x(), $.mul(xf1.get$rotation().get$col1().get$x(), v1.get$x())), $.mul(xf1.get$rotation().get$col2().get$x(), v1.get$y())))));
      var dy = $.numTypeCheck($.sub(predy, tempy));
      var R = $.propertyTypeCheck(xf1.get$rotation(), 'is$Matrix22');
      var dLocal1x = $.numTypeCheck($.add($.mul(dx, R.get$col1().get$x()), $.mul(dy, R.get$col1().get$y())));
    case 2:
      state = 0;
      var dLocal1y = $.numTypeCheck($.add($.mul(dx, R.get$col2().get$x()), $.mul(dy, R.get$col2().get$y())));
    case 3:
      state = 0;
      for (var edge = 0, i = 0, maxDot = 1e-12, dot = null; $.ltB(i, count1); i = $.intTypeCheck($.add(i, 1))) {
        var norm = $.propertyTypeCheck($.index(normals1, i), 'is$Vector');
        dot = $.numTypeCheck($.add($.mul(norm.get$x(), dLocal1x), $.mul(norm.get$y(), dLocal1y)));
        if ($.gtB(dot, maxDot)) {
          edge = i;
          maxDot = dot;
        }
      }
      var s = $.numTypeCheck(this.edgeSeparation$5(poly1, xf1, edge, poly2, xf2));
      var prevEdge = $.intTypeCheck($.geB($.sub(edge, 1), 0) ? $.sub(edge, 1) : $.sub(count1, 1));
      var sPrev = $.numTypeCheck(this.edgeSeparation$5(poly1, xf1, prevEdge, poly2, xf2));
      var nextEdge = $.intTypeCheck($.ltB($.add(edge, 1), count1) ? $.add(edge, 1) : 0);
      var sNext = $.numTypeCheck(this.edgeSeparation$5(poly1, xf1, nextEdge, poly2, xf2));
      if ($.gtB(sPrev, s) && $.gtB(sPrev, sNext)) {
        var bestSeparation = sPrev;
        var bestEdge = prevEdge;
        var increment = -1;
      } else {
        if (!$.gtB(sNext, s)) {
          results.set$edgeIndex(edge);
          results.set$separation(s);
          return;
        }
        bestSeparation = sNext;
        bestEdge = nextEdge;
        increment = 1;
      }
    case 4:
      state = 0;
      for (var t1 = increment === -1; true; ) {
        if (t1) {
          edge = $.intTypeCheck($.geB($.sub(bestEdge, 1), 0) ? $.sub(bestEdge, 1) : $.sub(count1, 1));
        } else {
          edge = $.intTypeCheck($.ltB($.add(bestEdge, 1), count1) ? $.add(bestEdge, 1) : 0);
        }
        s = $.numTypeCheck(this.edgeSeparation$5(poly1, xf1, edge, poly2, xf2));
        if (!$.gtB(s, bestSeparation)) break;
        bestSeparation = s;
        bestEdge = edge;
      }
      results.set$edgeIndex(bestEdge);
      results.set$separation(bestSeparation);
  }
 },
 edgeSeparation$5: function(poly1, xf1, edge1, poly2, xf2) {
  $.propertyTypeCheck(poly1, 'is$PolygonShape');
  $.propertyTypeCheck(xf1, 'is$Transform');
  $.intTypeCheck(edge1);
  if (edge1 !== (edge1 | 0)) return this.edgeSeparation$5$bailout(1, xf1, edge1, poly2, xf2, poly1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  $.propertyTypeCheck(poly2, 'is$PolygonShape');
  $.propertyTypeCheck(xf2, 'is$Transform');
  var count1 = $.intTypeCheck(poly1.get$vertexCount());
  if (count1 !== (count1 | 0)) return this.edgeSeparation$5$bailout(2, poly1, xf1, edge1, poly2, xf2, count1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var vertices1 = $.listTypeCheck(poly1.get$vertices());
  if (typeof vertices1 !== 'object' || vertices1 === null || (vertices1.constructor !== Array && !vertices1.is$JavaScriptIndexingBehavior())) return this.edgeSeparation$5$bailout(3, poly1, xf1, edge1, poly2, xf2, count1, vertices1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var normals1 = $.listTypeCheck(poly1.get$normals());
  if (typeof normals1 !== 'object' || normals1 === null || (normals1.constructor !== Array && !normals1.is$JavaScriptIndexingBehavior())) return this.edgeSeparation$5$bailout(4, normals1, xf1, edge1, poly2, xf2, count1, vertices1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var count2 = $.intTypeCheck(poly2.get$vertexCount());
  var vertices2 = $.listTypeCheck(poly2.get$vertices());
  $.assert(0 <= edge1 && edge1 < count1);
  var R = $.propertyTypeCheck(xf1.get$rotation(), 'is$Matrix22');
  var t1 = normals1.length;
  if (edge1 < 0 || edge1 >= t1) throw $.ioore(edge1);
  var v = $.propertyTypeCheck(normals1[edge1], 'is$Vector');
  var t2 = R.get$col1().get$y();
  if (typeof t2 !== 'number') return this.edgeSeparation$5$bailout(5, count2, vertices2, R, xf1, edge1, v, xf2, t2, vertices1, 0, 0, 0, 0, 0, 0, 0, 0);
  var t3 = v.get$x();
  if (typeof t3 !== 'number') return this.edgeSeparation$5$bailout(6, count2, vertices2, R, xf1, edge1, v, xf2, t2, t3, vertices1, 0, 0, 0, 0, 0, 0, 0);
  t3 *= t2;
  t2 = R.get$col2().get$y();
  if (typeof t2 !== 'number') return this.edgeSeparation$5$bailout(7, t3, t2, count2, vertices2, R, xf1, edge1, v, xf2, vertices1, 0, 0, 0, 0, 0, 0, 0);
  var t4 = v.get$y();
  if (typeof t4 !== 'number') return this.edgeSeparation$5$bailout(8, t3, t2, t4, count2, vertices2, R, xf1, edge1, v, xf2, vertices1, 0, 0, 0, 0, 0, 0);
  var normal1Worldy = t3 + t2 * t4;
  t3 = R.get$col1().get$x();
  if (typeof t3 !== 'number') return this.edgeSeparation$5$bailout(10, count2, vertices2, R, xf1, edge1, v, xf2, t3, normal1Worldy, vertices1, 0, 0, 0, 0, 0, 0, 0);
  var t5 = v.get$x();
  if (typeof t5 !== 'number') return this.edgeSeparation$5$bailout(11, t5, count2, vertices2, R, xf1, edge1, v, xf2, t3, normal1Worldy, vertices1, 0, 0, 0, 0, 0, 0);
  t5 *= t3;
  t3 = R.get$col2().get$x();
  if (typeof t3 !== 'number') return this.edgeSeparation$5$bailout(12, count2, vertices2, R, xf1, edge1, v, xf2, t5, normal1Worldy, t3, vertices1, 0, 0, 0, 0, 0, 0);
  var t6 = v.get$y();
  if (typeof t6 !== 'number') return this.edgeSeparation$5$bailout(13, t6, count2, vertices2, R, xf1, edge1, normal1Worldy, xf2, t5, t3, vertices1, 0, 0, 0, 0, 0, 0);
  var normal1Worldx = t5 + t3 * t6;
  var R1 = $.propertyTypeCheck(xf2.get$rotation(), 'is$Matrix22');
  t5 = R1.get$col1().get$x();
  if (typeof t5 !== 'number') return this.edgeSeparation$5$bailout(15, count2, normal1Worldx, vertices2, R1, R, xf1, edge1, normal1Worldy, xf2, t5, vertices1, 0, 0, 0, 0, 0, 0);
  t5 *= normal1Worldx;
  var t7 = R1.get$col1().get$y();
  if (typeof t7 !== 'number') return this.edgeSeparation$5$bailout(16, normal1Worldx, R1, R, xf1, edge1, t5, xf2, t7, vertices1, count2, vertices2, normal1Worldy, 0, 0, 0, 0, 0);
  var normal1x = t5 + normal1Worldy * t7;
  t5 = R1.get$col2().get$x();
  if (typeof t5 !== 'number') return this.edgeSeparation$5$bailout(18, normal1Worldx, R1, R, xf1, edge1, xf2, vertices1, normal1x, count2, t5, vertices2, normal1Worldy, 0, 0, 0, 0, 0);
  t5 *= normal1Worldx;
  var t8 = R1.get$col2().get$y();
  if (typeof t8 !== 'number') return this.edgeSeparation$5$bailout(19, normal1Worldx, R1, R, xf1, edge1, xf2, vertices1, normal1x, count2, vertices2, t5, normal1Worldy, t8, 0, 0, 0, 0);
  var normal1y = t5 + normal1Worldy * t8;
  for (var minDot = 99999999999999.0, i = 0, index = 0; $.ltB(i, count2); ++i) {
    var a = $.propertyTypeCheck($.index(vertices2, i), 'is$Vector');
    t1 = a.get$x();
    if (typeof t1 !== 'number') return this.edgeSeparation$5$bailout(21, t1, normal1Worldx, R1, R, minDot, xf1, edge1, i, xf2, vertices1, index, normal1x, count2, vertices2, normal1Worldy, normal1y, a);
    t1 *= normal1x;
    t2 = a.get$y();
    if (typeof t2 !== 'number') return this.edgeSeparation$5$bailout(22, t1, t2, normal1Worldx, R1, R, minDot, xf1, edge1, i, xf2, vertices1, index, normal1x, count2, vertices2, normal1Worldy, normal1y);
    var dot = t1 + t2 * normal1y;
    if ($.ltB(dot, minDot)) {
      index = i;
      minDot = dot;
    }
  }
  t1 = vertices1.length;
  if (edge1 < 0 || edge1 >= t1) throw $.ioore(edge1);
  var v3 = $.propertyTypeCheck(vertices1[edge1], 'is$Vector');
  t2 = xf1.get$position().get$y();
  if (typeof t2 !== 'number') return this.edgeSeparation$5$bailout(24, index, t2, normal1Worldx, vertices2, R1, R, xf1, normal1Worldy, xf2, v3, 0, 0, 0, 0, 0, 0, 0);
  t3 = R.get$col1().get$y();
  if (typeof t3 !== 'number') return this.edgeSeparation$5$bailout(25, index, t2, t3, normal1Worldx, vertices2, R1, R, xf1, normal1Worldy, xf2, v3, 0, 0, 0, 0, 0, 0);
  t4 = v3.get$x();
  if (typeof t4 !== 'number') return this.edgeSeparation$5$bailout(26, t2, t3, normal1Worldx, t4, R1, R, xf1, xf2, index, vertices2, normal1Worldy, v3, 0, 0, 0, 0, 0);
  t2 += t3 * t4;
  t5 = R.get$col2().get$y();
  if (typeof t5 !== 'number') return this.edgeSeparation$5$bailout(27, index, normal1Worldx, vertices2, R1, R, xf1, t2, t5, xf2, normal1Worldy, v3, 0, 0, 0, 0, 0, 0);
  t6 = v3.get$y();
  if (typeof t6 !== 'number') return this.edgeSeparation$5$bailout(28, normal1Worldx, R1, R, xf1, t2, t5, xf2, t6, index, vertices2, normal1Worldy, v3, 0, 0, 0, 0, 0);
  var v1y = t2 + t5 * t6;
  t2 = xf1.get$position().get$x();
  if (typeof t2 !== 'number') return this.edgeSeparation$5$bailout(30, v1y, index, t2, normal1Worldx, vertices2, R1, R, normal1Worldy, xf2, v3, 0, 0, 0, 0, 0, 0, 0);
  t7 = R.get$col1().get$x();
  if (typeof t7 !== 'number') return this.edgeSeparation$5$bailout(31, v1y, index, t2, normal1Worldx, t7, R1, R, vertices2, normal1Worldy, xf2, v3, 0, 0, 0, 0, 0, 0);
  t8 = v3.get$x();
  if (typeof t8 !== 'number') return this.edgeSeparation$5$bailout(32, normal1Worldx, R1, R, xf2, v1y, index, t2, t7, vertices2, t8, normal1Worldy, v3, 0, 0, 0, 0, 0);
  t2 += t7 * t8;
  var t9 = R.get$col2().get$x();
  if (typeof t9 !== 'number') return this.edgeSeparation$5$bailout(33, v1y, index, normal1Worldx, vertices2, R1, normal1Worldy, t2, xf2, t9, v3, 0, 0, 0, 0, 0, 0, 0);
  var t10 = v3.get$y();
  if (typeof t10 !== 'number') return this.edgeSeparation$5$bailout(34, v1y, index, normal1Worldx, vertices2, R1, normal1Worldy, t2, xf2, t9, t10, 0, 0, 0, 0, 0, 0, 0);
  var v1x = t2 + t9 * t10;
  var v4 = $.propertyTypeCheck($.index(vertices2, index), 'is$Vector');
  t2 = xf2.get$position().get$y();
  if (typeof t2 !== 'number') return this.edgeSeparation$5$bailout(36, v1y, v1x, normal1Worldx, v4, R1, normal1Worldy, t2, xf2, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var t11 = R1.get$col1().get$y();
  if (typeof t11 !== 'number') return this.edgeSeparation$5$bailout(37, v1y, v1x, normal1Worldx, v4, R1, normal1Worldy, t11, t2, xf2, 0, 0, 0, 0, 0, 0, 0, 0);
  var t12 = v4.get$x();
  if (typeof t12 !== 'number') return this.edgeSeparation$5$bailout(38, v1y, v1x, normal1Worldx, v4, R1, normal1Worldy, t11, t2, t12, xf2, 0, 0, 0, 0, 0, 0, 0);
  t2 += t11 * t12;
  var t13 = R1.get$col2().get$y();
  if (typeof t13 !== 'number') return this.edgeSeparation$5$bailout(39, v1y, v1x, normal1Worldx, v4, R1, normal1Worldy, xf2, t2, t13, 0, 0, 0, 0, 0, 0, 0, 0);
  var t14 = v4.get$y();
  if (typeof t14 !== 'number') return this.edgeSeparation$5$bailout(40, v1y, v1x, t14, normal1Worldx, v4, R1, normal1Worldy, xf2, t2, t13, 0, 0, 0, 0, 0, 0, 0);
  var v2y = t2 + t13 * t14 - v1y;
  var t15 = xf2.get$position().get$x();
  if (typeof t15 !== 'number') return this.edgeSeparation$5$bailout(42, v1x, normal1Worldx, v4, R1, normal1Worldy, v2y, t15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var t16 = R1.get$col1().get$x();
  if (typeof t16 !== 'number') return this.edgeSeparation$5$bailout(43, v1x, normal1Worldx, v4, R1, normal1Worldy, v2y, t15, t16, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var t17 = v4.get$x();
  if (typeof t17 !== 'number') return this.edgeSeparation$5$bailout(44, v1x, normal1Worldx, v4, R1, normal1Worldy, v2y, t15, t16, t17, 0, 0, 0, 0, 0, 0, 0, 0);
  t15 += t16 * t17;
  var t18 = R1.get$col2().get$x();
  if (typeof t18 !== 'number') return this.edgeSeparation$5$bailout(45, t15, v1x, t18, normal1Worldx, v4, normal1Worldy, v2y, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var t19 = v4.get$y();
  if (typeof t19 !== 'number') return this.edgeSeparation$5$bailout(46, t15, v1x, t18, t19, normal1Worldx, normal1Worldy, v2y, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  return (t15 + t18 * t19 - v1x) * normal1Worldx + v2y * normal1Worldy;
 },
 edgeSeparation$5$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13, env14, env15, env16) {
  switch (state) {
    case 1:
      var xf1 = env0;
      var edge1 = env1;
      var poly2 = env2;
      var xf2 = env3;
      var poly1 = env4;
      break;
    case 2:
      poly1 = env0;
      xf1 = env1;
      edge1 = env2;
      poly2 = env3;
      xf2 = env4;
      count1 = env5;
      break;
    case 3:
      poly1 = env0;
      xf1 = env1;
      edge1 = env2;
      poly2 = env3;
      xf2 = env4;
      count1 = env5;
      vertices1 = env6;
      break;
    case 4:
      normals1 = env0;
      xf1 = env1;
      edge1 = env2;
      poly2 = env3;
      xf2 = env4;
      count1 = env5;
      vertices1 = env6;
      break;
    case 5:
      count2 = env0;
      vertices2 = env1;
      R = env2;
      xf1 = env3;
      edge1 = env4;
      v = env5;
      xf2 = env6;
      t1 = env7;
      vertices1 = env8;
      break;
    case 6:
      count2 = env0;
      vertices2 = env1;
      R = env2;
      xf1 = env3;
      edge1 = env4;
      v = env5;
      xf2 = env6;
      t1 = env7;
      t2 = env8;
      vertices1 = env9;
      break;
    case 7:
      t2 = env0;
      t1 = env1;
      count2 = env2;
      vertices2 = env3;
      R = env4;
      xf1 = env5;
      edge1 = env6;
      v = env7;
      xf2 = env8;
      vertices1 = env9;
      break;
    case 8:
      t2 = env0;
      t1 = env1;
      t3 = env2;
      count2 = env3;
      vertices2 = env4;
      R = env5;
      xf1 = env6;
      edge1 = env7;
      v = env8;
      xf2 = env9;
      vertices1 = env10;
      break;
    case 9:
      count2 = env0;
      vertices2 = env1;
      R = env2;
      xf1 = env3;
      edge1 = env4;
      v = env5;
      xf2 = env6;
      normal1Worldy = env7;
      vertices1 = env8;
      break;
    case 10:
      count2 = env0;
      vertices2 = env1;
      R = env2;
      xf1 = env3;
      edge1 = env4;
      v = env5;
      xf2 = env6;
      t2 = env7;
      normal1Worldy = env8;
      vertices1 = env9;
      break;
    case 11:
      t4 = env0;
      count2 = env1;
      vertices2 = env2;
      R = env3;
      xf1 = env4;
      edge1 = env5;
      v = env6;
      xf2 = env7;
      t2 = env8;
      normal1Worldy = env9;
      vertices1 = env10;
      break;
    case 12:
      count2 = env0;
      vertices2 = env1;
      R = env2;
      xf1 = env3;
      edge1 = env4;
      v = env5;
      xf2 = env6;
      t4 = env7;
      normal1Worldy = env8;
      t2 = env9;
      vertices1 = env10;
      break;
    case 13:
      t5 = env0;
      count2 = env1;
      vertices2 = env2;
      R = env3;
      xf1 = env4;
      edge1 = env5;
      normal1Worldy = env6;
      xf2 = env7;
      t4 = env8;
      t2 = env9;
      vertices1 = env10;
      break;
    case 14:
      count2 = env0;
      normal1Worldx = env1;
      vertices2 = env2;
      R = env3;
      xf1 = env4;
      edge1 = env5;
      normal1Worldy = env6;
      xf2 = env7;
      vertices1 = env8;
      break;
    case 15:
      count2 = env0;
      normal1Worldx = env1;
      vertices2 = env2;
      R1 = env3;
      R = env4;
      xf1 = env5;
      edge1 = env6;
      normal1Worldy = env7;
      xf2 = env8;
      t4 = env9;
      vertices1 = env10;
      break;
    case 16:
      normal1Worldx = env0;
      R1 = env1;
      R = env2;
      xf1 = env3;
      edge1 = env4;
      t4 = env5;
      xf2 = env6;
      t6 = env7;
      vertices1 = env8;
      count2 = env9;
      vertices2 = env10;
      normal1Worldy = env11;
      break;
    case 17:
      normal1x = env0;
      count2 = env1;
      normal1Worldx = env2;
      vertices2 = env3;
      R1 = env4;
      R = env5;
      xf1 = env6;
      edge1 = env7;
      normal1Worldy = env8;
      xf2 = env9;
      vertices1 = env10;
      break;
    case 18:
      normal1Worldx = env0;
      R1 = env1;
      R = env2;
      xf1 = env3;
      edge1 = env4;
      xf2 = env5;
      vertices1 = env6;
      normal1x = env7;
      count2 = env8;
      t4 = env9;
      vertices2 = env10;
      normal1Worldy = env11;
      break;
    case 19:
      normal1Worldx = env0;
      R1 = env1;
      R = env2;
      xf1 = env3;
      edge1 = env4;
      xf2 = env5;
      vertices1 = env6;
      normal1x = env7;
      count2 = env8;
      vertices2 = env9;
      t4 = env10;
      normal1Worldy = env11;
      t7 = env12;
      break;
    case 20:
      normal1Worldx = env0;
      R1 = env1;
      R = env2;
      xf1 = env3;
      edge1 = env4;
      xf2 = env5;
      vertices1 = env6;
      normal1x = env7;
      count2 = env8;
      vertices2 = env9;
      normal1Worldy = env10;
      normal1y = env11;
      break;
    case 21:
      t1 = env0;
      normal1Worldx = env1;
      R1 = env2;
      R = env3;
      minDot = env4;
      xf1 = env5;
      edge1 = env6;
      i = env7;
      xf2 = env8;
      vertices1 = env9;
      index = env10;
      normal1x = env11;
      count2 = env12;
      vertices2 = env13;
      normal1Worldy = env14;
      normal1y = env15;
      a = env16;
      break;
    case 22:
      t1 = env0;
      t2 = env1;
      normal1Worldx = env2;
      R1 = env3;
      R = env4;
      minDot = env5;
      xf1 = env6;
      edge1 = env7;
      i = env8;
      xf2 = env9;
      vertices1 = env10;
      index = env11;
      normal1x = env12;
      count2 = env13;
      vertices2 = env14;
      normal1Worldy = env15;
      normal1y = env16;
      break;
    case 23:
      normal1Worldx = env0;
      R1 = env1;
      R = env2;
      xf1 = env3;
      edge1 = env4;
      xf2 = env5;
      vertices1 = env6;
      normal1x = env7;
      count2 = env8;
      minDot = env9;
      index = env10;
      normal1Worldy = env11;
      vertices2 = env12;
      i = env13;
      normal1y = env14;
      break;
    case 24:
      index = env0;
      t1 = env1;
      normal1Worldx = env2;
      vertices2 = env3;
      R1 = env4;
      R = env5;
      xf1 = env6;
      normal1Worldy = env7;
      xf2 = env8;
      v3 = env9;
      break;
    case 25:
      index = env0;
      t1 = env1;
      t2 = env2;
      normal1Worldx = env3;
      vertices2 = env4;
      R1 = env5;
      R = env6;
      xf1 = env7;
      normal1Worldy = env8;
      xf2 = env9;
      v3 = env10;
      break;
    case 26:
      t1 = env0;
      t2 = env1;
      normal1Worldx = env2;
      t3 = env3;
      R1 = env4;
      R = env5;
      xf1 = env6;
      xf2 = env7;
      index = env8;
      vertices2 = env9;
      normal1Worldy = env10;
      v3 = env11;
      break;
    case 27:
      index = env0;
      normal1Worldx = env1;
      vertices2 = env2;
      R1 = env3;
      R = env4;
      xf1 = env5;
      t1 = env6;
      t4 = env7;
      xf2 = env8;
      normal1Worldy = env9;
      v3 = env10;
      break;
    case 28:
      normal1Worldx = env0;
      R1 = env1;
      R = env2;
      xf1 = env3;
      t1 = env4;
      t4 = env5;
      xf2 = env6;
      t5 = env7;
      index = env8;
      vertices2 = env9;
      normal1Worldy = env10;
      v3 = env11;
      break;
    case 29:
      v1y = env0;
      index = env1;
      normal1Worldx = env2;
      vertices2 = env3;
      R1 = env4;
      R = env5;
      xf1 = env6;
      normal1Worldy = env7;
      xf2 = env8;
      v3 = env9;
      break;
    case 30:
      v1y = env0;
      index = env1;
      t1 = env2;
      normal1Worldx = env3;
      vertices2 = env4;
      R1 = env5;
      R = env6;
      normal1Worldy = env7;
      xf2 = env8;
      v3 = env9;
      break;
    case 31:
      v1y = env0;
      index = env1;
      t1 = env2;
      normal1Worldx = env3;
      t6 = env4;
      R1 = env5;
      R = env6;
      vertices2 = env7;
      normal1Worldy = env8;
      xf2 = env9;
      v3 = env10;
      break;
    case 32:
      normal1Worldx = env0;
      R1 = env1;
      R = env2;
      xf2 = env3;
      v1y = env4;
      index = env5;
      t1 = env6;
      t6 = env7;
      vertices2 = env8;
      t7 = env9;
      normal1Worldy = env10;
      v3 = env11;
      break;
    case 33:
      v1y = env0;
      index = env1;
      normal1Worldx = env2;
      vertices2 = env3;
      R1 = env4;
      normal1Worldy = env5;
      t1 = env6;
      xf2 = env7;
      t8 = env8;
      v3 = env9;
      break;
    case 34:
      v1y = env0;
      index = env1;
      normal1Worldx = env2;
      vertices2 = env3;
      R1 = env4;
      normal1Worldy = env5;
      t1 = env6;
      xf2 = env7;
      t8 = env8;
      t9 = env9;
      break;
    case 35:
      v1y = env0;
      v1x = env1;
      index = env2;
      normal1Worldx = env3;
      vertices2 = env4;
      R1 = env5;
      normal1Worldy = env6;
      xf2 = env7;
      break;
    case 36:
      v1y = env0;
      v1x = env1;
      normal1Worldx = env2;
      v4 = env3;
      R1 = env4;
      normal1Worldy = env5;
      t1 = env6;
      xf2 = env7;
      break;
    case 37:
      v1y = env0;
      v1x = env1;
      normal1Worldx = env2;
      v4 = env3;
      R1 = env4;
      normal1Worldy = env5;
      t10 = env6;
      t1 = env7;
      xf2 = env8;
      break;
    case 38:
      v1y = env0;
      v1x = env1;
      normal1Worldx = env2;
      v4 = env3;
      R1 = env4;
      normal1Worldy = env5;
      t10 = env6;
      t1 = env7;
      t11 = env8;
      xf2 = env9;
      break;
    case 39:
      v1y = env0;
      v1x = env1;
      normal1Worldx = env2;
      v4 = env3;
      R1 = env4;
      normal1Worldy = env5;
      xf2 = env6;
      t1 = env7;
      t12 = env8;
      break;
    case 40:
      v1y = env0;
      v1x = env1;
      t13 = env2;
      normal1Worldx = env3;
      v4 = env4;
      R1 = env5;
      normal1Worldy = env6;
      xf2 = env7;
      t1 = env8;
      t12 = env9;
      break;
    case 41:
      v1x = env0;
      normal1Worldx = env1;
      v4 = env2;
      R1 = env3;
      normal1Worldy = env4;
      v2y = env5;
      xf2 = env6;
      break;
    case 42:
      v1x = env0;
      normal1Worldx = env1;
      v4 = env2;
      R1 = env3;
      normal1Worldy = env4;
      v2y = env5;
      t14 = env6;
      break;
    case 43:
      v1x = env0;
      normal1Worldx = env1;
      v4 = env2;
      R1 = env3;
      normal1Worldy = env4;
      v2y = env5;
      t14 = env6;
      t15 = env7;
      break;
    case 44:
      v1x = env0;
      normal1Worldx = env1;
      v4 = env2;
      R1 = env3;
      normal1Worldy = env4;
      v2y = env5;
      t14 = env6;
      t15 = env7;
      t16 = env8;
      break;
    case 45:
      t14 = env0;
      v1x = env1;
      t17 = env2;
      normal1Worldx = env3;
      v4 = env4;
      normal1Worldy = env5;
      v2y = env6;
      break;
    case 46:
      t14 = env0;
      v1x = env1;
      t17 = env2;
      t18 = env3;
      normal1Worldx = env4;
      normal1Worldy = env5;
      v2y = env6;
      break;
    case 47:
      normal1Worldy = env0;
      v2x = env1;
      normal1Worldx = env2;
      v2y = env3;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(poly1, 'is$PolygonShape');
      $.propertyTypeCheck(xf1, 'is$Transform');
      $.intTypeCheck(edge1);
    case 1:
      state = 0;
      $.propertyTypeCheck(poly2, 'is$PolygonShape');
      $.propertyTypeCheck(xf2, 'is$Transform');
      var count1 = $.intTypeCheck(poly1.get$vertexCount());
    case 2:
      state = 0;
      var vertices1 = $.listTypeCheck(poly1.get$vertices());
    case 3:
      state = 0;
      var normals1 = $.listTypeCheck(poly1.get$normals());
    case 4:
      state = 0;
      var count2 = $.intTypeCheck(poly2.get$vertexCount());
      var vertices2 = $.listTypeCheck(poly2.get$vertices());
      $.assert($.leB(0, edge1) && $.ltB(edge1, count1));
      var R = $.propertyTypeCheck(xf1.get$rotation(), 'is$Matrix22');
      var v = $.propertyTypeCheck($.index(normals1, edge1), 'is$Vector');
      var t1 = R.get$col1().get$y();
    case 5:
      state = 0;
      var t2 = v.get$x();
    case 6:
      state = 0;
      t2 = $.mul(t1, t2);
      t1 = R.get$col2().get$y();
    case 7:
      state = 0;
      var t3 = v.get$y();
    case 8:
      state = 0;
      var normal1Worldy = $.numTypeCheck($.add(t2, $.mul(t1, t3)));
    case 9:
      state = 0;
      t2 = R.get$col1().get$x();
    case 10:
      state = 0;
      var t4 = v.get$x();
    case 11:
      state = 0;
      t4 = $.mul(t2, t4);
      t2 = R.get$col2().get$x();
    case 12:
      state = 0;
      var t5 = v.get$y();
    case 13:
      state = 0;
      var normal1Worldx = $.numTypeCheck($.add(t4, $.mul(t2, t5)));
    case 14:
      state = 0;
      var R1 = $.propertyTypeCheck(xf2.get$rotation(), 'is$Matrix22');
      t4 = R1.get$col1().get$x();
    case 15:
      state = 0;
      t4 = $.mul(normal1Worldx, t4);
      var t6 = R1.get$col1().get$y();
    case 16:
      state = 0;
      var normal1x = $.numTypeCheck($.add(t4, $.mul(normal1Worldy, t6)));
    case 17:
      state = 0;
      t4 = R1.get$col2().get$x();
    case 18:
      state = 0;
      t4 = $.mul(normal1Worldx, t4);
      var t7 = R1.get$col2().get$y();
    case 19:
      state = 0;
      var normal1y = $.numTypeCheck($.add(t4, $.mul(normal1Worldy, t7)));
    case 20:
      state = 0;
      var minDot = 99999999999999.0;
      var i = 0;
      var index = 0;
    case 21:
    case 22:
    case 23:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, count2)) break L0;
            var a = $.propertyTypeCheck($.index(vertices2, i), 'is$Vector');
            t1 = a.get$x();
          case 21:
            state = 0;
            t1 = $.mul(t1, normal1x);
            t2 = a.get$y();
          case 22:
            state = 0;
            var dot = $.numTypeCheck($.add(t1, $.mul(t2, normal1y)));
            if ($.ltB(dot, minDot)) {
              index = i;
              minDot = dot;
            }
            i = $.intTypeCheck($.add(i, 1));
          case 23:
            state = 0;
        }
      }
      var v3 = $.propertyTypeCheck($.index(vertices1, edge1), 'is$Vector');
      t1 = xf1.get$position().get$y();
    case 24:
      state = 0;
      t2 = R.get$col1().get$y();
    case 25:
      state = 0;
      t3 = v3.get$x();
    case 26:
      state = 0;
      t1 = $.add(t1, $.mul(t2, t3));
      t4 = R.get$col2().get$y();
    case 27:
      state = 0;
      t5 = v3.get$y();
    case 28:
      state = 0;
      var v1y = $.numTypeCheck($.add(t1, $.mul(t4, t5)));
    case 29:
      state = 0;
      t1 = xf1.get$position().get$x();
    case 30:
      state = 0;
      t6 = R.get$col1().get$x();
    case 31:
      state = 0;
      t7 = v3.get$x();
    case 32:
      state = 0;
      t1 = $.add(t1, $.mul(t6, t7));
      var t8 = R.get$col2().get$x();
    case 33:
      state = 0;
      var t9 = v3.get$y();
    case 34:
      state = 0;
      var v1x = $.numTypeCheck($.add(t1, $.mul(t8, t9)));
    case 35:
      state = 0;
      var v4 = $.propertyTypeCheck($.index(vertices2, index), 'is$Vector');
      t1 = xf2.get$position().get$y();
    case 36:
      state = 0;
      var t10 = R1.get$col1().get$y();
    case 37:
      state = 0;
      var t11 = v4.get$x();
    case 38:
      state = 0;
      t1 = $.add(t1, $.mul(t10, t11));
      var t12 = R1.get$col2().get$y();
    case 39:
      state = 0;
      var t13 = v4.get$y();
    case 40:
      state = 0;
      var v2y = $.numTypeCheck($.sub($.add(t1, $.mul(t12, t13)), v1y));
    case 41:
      state = 0;
      var t14 = xf2.get$position().get$x();
    case 42:
      state = 0;
      var t15 = R1.get$col1().get$x();
    case 43:
      state = 0;
      var t16 = v4.get$x();
    case 44:
      state = 0;
      t14 = $.add(t14, $.mul(t15, t16));
      var t17 = R1.get$col2().get$x();
    case 45:
      state = 0;
      var t18 = v4.get$y();
    case 46:
      state = 0;
      var v2x = $.numTypeCheck($.sub($.add(t14, $.mul(t17, t18)), v1x));
    case 47:
      state = 0;
      return $.add($.mul(v2x, normal1Worldx), $.mul(v2y, normal1Worldy));
  }
 },
 collidePolygonAndCircle$5: function(manifold, polygon, xfA, circle, xfB) {
  $.propertyTypeCheck(manifold, 'is$Manifold');
  $.propertyTypeCheck(polygon, 'is$PolygonShape');
  $.propertyTypeCheck(xfA, 'is$Transform');
  $.propertyTypeCheck(circle, 'is$CircleShape');
  $.propertyTypeCheck(xfB, 'is$Transform');
  manifold.set$pointCount(0);
  var v = $.propertyTypeCheck(circle.get$position(), 'is$Vector');
  var cy = $.numTypeCheck($.add($.add(xfB.get$position().get$y(), $.mul(xfB.get$rotation().get$col1().get$y(), v.get$x())), $.mul(xfB.get$rotation().get$col2().get$y(), v.get$y())));
  var v1x = $.numTypeCheck($.sub($.numTypeCheck($.add($.add(xfB.get$position().get$x(), $.mul(xfB.get$rotation().get$col1().get$x(), v.get$x())), $.mul(xfB.get$rotation().get$col2().get$x(), v.get$y()))), xfA.get$position().get$x()));
  var v1y = $.numTypeCheck($.sub(cy, xfA.get$position().get$y()));
  var b = $.propertyTypeCheck(xfA.get$rotation().get$col1(), 'is$Vector');
  var b1 = $.propertyTypeCheck(xfA.get$rotation().get$col2(), 'is$Vector');
  var cLocaly = $.numTypeCheck($.add($.mul(v1x, b1.get$x()), $.mul(v1y, b1.get$y())));
  if (typeof cLocaly !== 'number') return this.collidePolygonAndCircle$5$bailout(1, b, manifold, polygon, circle, v1x, cLocaly, v1y);
  var cLocalx = $.numTypeCheck($.add($.mul(v1x, b.get$x()), $.mul(v1y, b.get$y())));
  if (typeof cLocalx !== 'number') return this.collidePolygonAndCircle$5$bailout(2, manifold, polygon, circle, cLocaly, cLocalx, 0, 0);
  var radius = $.numTypeCheck($.add(polygon.get$radius(), circle.get$radius()));
  if (typeof radius !== 'number') return this.collidePolygonAndCircle$5$bailout(3, manifold, polygon, circle, cLocalx, cLocaly, radius, 0);
  var vertexCount = $.intTypeCheck(polygon.get$vertexCount());
  if (vertexCount !== (vertexCount | 0)) return this.collidePolygonAndCircle$5$bailout(4, vertexCount, manifold, polygon, circle, cLocalx, cLocaly, radius);
  var vertices = $.listTypeCheck(polygon.get$vertices());
  var normals = $.listTypeCheck(polygon.get$normals());
  for (var normalIndex = 0, i = 0, separation = 1e-12; $.ltB(i, vertexCount); i = $.intTypeCheck($.add(i, 1))) {
    var vertex = $.propertyTypeCheck($.index(vertices, i), 'is$Vector');
    var t1 = vertex.get$x();
    if (typeof t1 !== 'number') throw $.iae(t1);
    var tempx = cLocalx - t1;
    t1 = vertex.get$y();
    if (typeof t1 !== 'number') throw $.iae(t1);
    var tempy = cLocaly - t1;
    var norm = $.propertyTypeCheck($.index(normals, i), 'is$Vector');
    var s = $.numTypeCheck($.add($.mul(norm.get$x(), tempx), $.mul(norm.get$y(), tempy)));
    if ($.gtB(s, radius)) return;
    if ($.gtB(s, separation)) {
      separation = s;
      normalIndex = i;
    }
  }
  var vertIndex2 = $.intTypeCheck($.ltB($.add(normalIndex, 1), vertexCount) ? $.add(normalIndex, 1) : 0);
  var v1 = $.propertyTypeCheck($.index(vertices, normalIndex), 'is$Vector');
  var v2 = $.propertyTypeCheck($.index(vertices, vertIndex2), 'is$Vector');
  if ($.ltB(separation, 1.192e-7)) {
    manifold.set$pointCount(1);
    manifold.set$type(1);
    norm = $.propertyTypeCheck($.index(normals, normalIndex), 'is$Vector');
    t1 = norm.get$x();
    manifold.get$localNormal().set$x(t1);
    t1 = norm.get$y();
    manifold.get$localNormal().set$y(t1);
    t1 = $.mul($.add(v1.get$x(), v2.get$x()), 0.5);
    manifold.get$localPoint().set$x(t1);
    t1 = $.mul($.add(v1.get$y(), v2.get$y()), 0.5);
    manifold.get$localPoint().set$y(t1);
    var mpoint = $.propertyTypeCheck($.index(manifold.get$points(), 0), 'is$ManifoldPoint');
    t1 = circle.get$position().get$x();
    mpoint.get$localPoint().set$x(t1);
    t1 = circle.get$position().get$y();
    mpoint.get$localPoint().set$y(t1);
    mpoint.get$id().zero$0();
    return;
  }
  t1 = v1.get$x();
  if (typeof t1 !== 'number') throw $.iae(t1);
  var tempX = cLocalx - t1;
  t1 = v1.get$y();
  if (typeof t1 !== 'number') throw $.iae(t1);
  var tempY = cLocaly - t1;
  var temp2X = $.numTypeCheck($.sub(v2.get$x(), v1.get$x()));
  var temp2Y = $.numTypeCheck($.sub(v2.get$y(), v1.get$y()));
  if (typeof temp2X !== 'number') throw $.iae(temp2X);
  t1 = tempX * temp2X;
  if (typeof temp2Y !== 'number') throw $.iae(temp2Y);
  var u1 = t1 + tempY * temp2Y;
  t1 = v2.get$x();
  if (typeof t1 !== 'number') throw $.iae(t1);
  var temp3X = cLocalx - t1;
  t1 = v2.get$y();
  if (typeof t1 !== 'number') throw $.iae(t1);
  var temp3Y = cLocaly - t1;
  var temp4X = $.numTypeCheck($.sub(v1.get$x(), v2.get$x()));
  var temp4Y = $.numTypeCheck($.sub(v1.get$y(), v2.get$y()));
  if (typeof temp4X !== 'number') throw $.iae(temp4X);
  t1 = temp3X * temp4X;
  if (typeof temp4Y !== 'number') throw $.iae(temp4Y);
  var u2 = t1 + temp3Y * temp4Y;
  if (u1 <= 0) {
    t1 = v1.get$x();
    if (typeof t1 !== 'number') throw $.iae(t1);
    var dx = cLocalx - t1;
    t1 = v1.get$y();
    if (typeof t1 !== 'number') throw $.iae(t1);
    var dy = cLocaly - t1;
    if (dx * dx + dy * dy > radius * radius) return;
    manifold.set$pointCount(1);
    manifold.set$type(1);
    t1 = v1.get$x();
    if (typeof t1 !== 'number') throw $.iae(t1);
    t1 = cLocalx - t1;
    manifold.get$localNormal().set$x(t1);
    t1 = v1.get$y();
    if (typeof t1 !== 'number') throw $.iae(t1);
    t1 = cLocaly - t1;
    manifold.get$localNormal().set$y(t1);
    manifold.get$localNormal().normalize$0();
    manifold.get$localPoint().setFrom$1(v1);
    $.index(manifold.get$points(), 0).get$localPoint().setFrom$1(circle.get$position());
    $.index(manifold.get$points(), 0).get$id().zero$0();
  } else {
    if (u2 <= 0.0) {
      t1 = v2.get$x();
      if (typeof t1 !== 'number') throw $.iae(t1);
      dx = cLocalx - t1;
      t1 = v2.get$y();
      if (typeof t1 !== 'number') throw $.iae(t1);
      dy = cLocaly - t1;
      if (dx * dx + dy * dy > radius * radius) return;
      manifold.set$pointCount(1);
      manifold.set$type(1);
      t1 = v2.get$x();
      if (typeof t1 !== 'number') throw $.iae(t1);
      t1 = cLocalx - t1;
      manifold.get$localNormal().set$x(t1);
      t1 = v2.get$y();
      if (typeof t1 !== 'number') throw $.iae(t1);
      t1 = cLocaly - t1;
      manifold.get$localNormal().set$y(t1);
      manifold.get$localNormal().normalize$0();
      manifold.get$localPoint().setFrom$1(v2);
      $.index(manifold.get$points(), 0).get$localPoint().setFrom$1(circle.get$position());
      $.index(manifold.get$points(), 0).get$id().zero$0();
    } else {
      var fcx = $.numTypeCheck($.mul($.add(v1.get$x(), v2.get$x()), 0.5));
      var fcy = $.numTypeCheck($.mul($.add(v1.get$y(), v2.get$y()), 0.5));
      if (typeof fcx !== 'number') throw $.iae(fcx);
      var tx = cLocalx - fcx;
      if (typeof fcy !== 'number') throw $.iae(fcy);
      var ty = cLocaly - fcy;
      norm = $.propertyTypeCheck($.index(normals, normalIndex), 'is$Vector');
      t1 = norm.get$x();
      if (typeof t1 !== 'number') throw $.iae(t1);
      t1 *= tx;
      var t2 = norm.get$y();
      if (typeof t2 !== 'number') throw $.iae(t2);
      if (t1 + ty * t2 > radius) return;
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
 collidePolygonAndCircle$5$bailout: function(state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      b = env0;
      var manifold = env1;
      var polygon = env2;
      var circle = env3;
      v1x = env4;
      cLocaly = env5;
      v1y = env6;
      break;
    case 2:
      manifold = env0;
      polygon = env1;
      circle = env2;
      cLocaly = env3;
      cLocalx = env4;
      break;
    case 3:
      manifold = env0;
      polygon = env1;
      circle = env2;
      cLocalx = env3;
      cLocaly = env4;
      radius = env5;
      break;
    case 4:
      vertexCount = env0;
      manifold = env1;
      polygon = env2;
      circle = env3;
      cLocalx = env4;
      cLocaly = env5;
      radius = env6;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(manifold, 'is$Manifold');
      $.propertyTypeCheck(polygon, 'is$PolygonShape');
      $.propertyTypeCheck(xfA, 'is$Transform');
      $.propertyTypeCheck(circle, 'is$CircleShape');
      $.propertyTypeCheck(xfB, 'is$Transform');
      manifold.set$pointCount(0);
      var v = $.propertyTypeCheck(circle.get$position(), 'is$Vector');
      var cy = $.numTypeCheck($.add($.add(xfB.get$position().get$y(), $.mul(xfB.get$rotation().get$col1().get$y(), v.get$x())), $.mul(xfB.get$rotation().get$col2().get$y(), v.get$y())));
      var v1x = $.numTypeCheck($.sub($.numTypeCheck($.add($.add(xfB.get$position().get$x(), $.mul(xfB.get$rotation().get$col1().get$x(), v.get$x())), $.mul(xfB.get$rotation().get$col2().get$x(), v.get$y()))), xfA.get$position().get$x()));
      var v1y = $.numTypeCheck($.sub(cy, xfA.get$position().get$y()));
      var b = $.propertyTypeCheck(xfA.get$rotation().get$col1(), 'is$Vector');
      var b1 = $.propertyTypeCheck(xfA.get$rotation().get$col2(), 'is$Vector');
      var cLocaly = $.numTypeCheck($.add($.mul(v1x, b1.get$x()), $.mul(v1y, b1.get$y())));
    case 1:
      state = 0;
      var cLocalx = $.numTypeCheck($.add($.mul(v1x, b.get$x()), $.mul(v1y, b.get$y())));
    case 2:
      state = 0;
      var radius = $.numTypeCheck($.add(polygon.get$radius(), circle.get$radius()));
    case 3:
      state = 0;
      var vertexCount = $.intTypeCheck(polygon.get$vertexCount());
    case 4:
      state = 0;
      var vertices = $.listTypeCheck(polygon.get$vertices());
      var normals = $.listTypeCheck(polygon.get$normals());
      for (var normalIndex = 0, i = 0, separation = 1e-12; $.ltB(i, vertexCount); i = $.intTypeCheck($.add(i, 1))) {
        var vertex = $.propertyTypeCheck($.index(vertices, i), 'is$Vector');
        var tempx = $.numTypeCheck($.sub(cLocalx, vertex.get$x()));
        var tempy = $.numTypeCheck($.sub(cLocaly, vertex.get$y()));
        var norm = $.propertyTypeCheck($.index(normals, i), 'is$Vector');
        var s = $.numTypeCheck($.add($.mul(norm.get$x(), tempx), $.mul(norm.get$y(), tempy)));
        if ($.gtB(s, radius)) return;
        if ($.gtB(s, separation)) {
          separation = s;
          normalIndex = i;
        }
      }
      var vertIndex2 = $.intTypeCheck($.ltB($.add(normalIndex, 1), vertexCount) ? $.add(normalIndex, 1) : 0);
      var v1 = $.propertyTypeCheck($.index(vertices, normalIndex), 'is$Vector');
      var v2 = $.propertyTypeCheck($.index(vertices, vertIndex2), 'is$Vector');
      if ($.ltB(separation, 1.192e-7)) {
        manifold.set$pointCount(1);
        manifold.set$type(1);
        norm = $.propertyTypeCheck($.index(normals, normalIndex), 'is$Vector');
        var t1 = norm.get$x();
        manifold.get$localNormal().set$x(t1);
        t1 = norm.get$y();
        manifold.get$localNormal().set$y(t1);
        t1 = $.mul($.add(v1.get$x(), v2.get$x()), 0.5);
        manifold.get$localPoint().set$x(t1);
        t1 = $.mul($.add(v1.get$y(), v2.get$y()), 0.5);
        manifold.get$localPoint().set$y(t1);
        var mpoint = $.propertyTypeCheck($.index(manifold.get$points(), 0), 'is$ManifoldPoint');
        t1 = circle.get$position().get$x();
        mpoint.get$localPoint().set$x(t1);
        t1 = circle.get$position().get$y();
        mpoint.get$localPoint().set$y(t1);
        mpoint.get$id().zero$0();
        return;
      }
      var tempX = $.numTypeCheck($.sub(cLocalx, v1.get$x()));
      var tempY = $.numTypeCheck($.sub(cLocaly, v1.get$y()));
      var temp2X = $.numTypeCheck($.sub(v2.get$x(), v1.get$x()));
      var temp2Y = $.numTypeCheck($.sub(v2.get$y(), v1.get$y()));
      var u1 = $.numTypeCheck($.add($.mul(tempX, temp2X), $.mul(tempY, temp2Y)));
      var temp3X = $.numTypeCheck($.sub(cLocalx, v2.get$x()));
      var temp3Y = $.numTypeCheck($.sub(cLocaly, v2.get$y()));
      var temp4X = $.numTypeCheck($.sub(v1.get$x(), v2.get$x()));
      var temp4Y = $.numTypeCheck($.sub(v1.get$y(), v2.get$y()));
      var u2 = $.numTypeCheck($.add($.mul(temp3X, temp4X), $.mul(temp3Y, temp4Y)));
      if ($.leB(u1, 0)) {
        var dx = $.numTypeCheck($.sub(cLocalx, v1.get$x()));
        var dy = $.numTypeCheck($.sub(cLocaly, v1.get$y()));
        if ($.gtB($.add($.mul(dx, dx), $.mul(dy, dy)), $.mul(radius, radius))) return;
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
      } else {
        if ($.leB(u2, 0.0)) {
          dx = $.numTypeCheck($.sub(cLocalx, v2.get$x()));
          dy = $.numTypeCheck($.sub(cLocaly, v2.get$y()));
          if ($.gtB($.add($.mul(dx, dx), $.mul(dy, dy)), $.mul(radius, radius))) return;
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
          var fcx = $.numTypeCheck($.mul($.add(v1.get$x(), v2.get$x()), 0.5));
          var fcy = $.numTypeCheck($.mul($.add(v1.get$y(), v2.get$y()), 0.5));
          var tx = $.numTypeCheck($.sub(cLocalx, fcx));
          var ty = $.numTypeCheck($.sub(cLocaly, fcy));
          norm = $.propertyTypeCheck($.index(normals, normalIndex), 'is$Vector');
          if ($.gtB($.numTypeCheck($.add($.mul(tx, norm.get$x()), $.mul(ty, norm.get$y()))), radius)) return;
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
  $.propertyTypeCheck(manifold, 'is$Manifold');
  $.propertyTypeCheck(circle1, 'is$CircleShape');
  $.propertyTypeCheck(xfA, 'is$Transform');
  $.propertyTypeCheck(circle2, 'is$CircleShape');
  $.propertyTypeCheck(xfB, 'is$Transform');
  manifold.set$pointCount(0);
  var v = $.propertyTypeCheck(circle1.get$position(), 'is$Vector');
  var pAy = $.numTypeCheck($.add($.add(xfA.get$position().get$y(), $.mul(xfA.get$rotation().get$col1().get$y(), v.get$x())), $.mul(xfA.get$rotation().get$col2().get$y(), v.get$y())));
  var pAx = $.numTypeCheck($.add($.add(xfA.get$position().get$x(), $.mul(xfA.get$rotation().get$col1().get$x(), v.get$x())), $.mul(xfA.get$rotation().get$col2().get$x(), v.get$y())));
  var v1 = $.propertyTypeCheck(circle2.get$position(), 'is$Vector');
  var pBy = $.numTypeCheck($.add($.add(xfB.get$position().get$y(), $.mul(xfB.get$rotation().get$col1().get$y(), v1.get$x())), $.mul(xfB.get$rotation().get$col2().get$y(), v1.get$y())));
  var dx = $.numTypeCheck($.sub($.numTypeCheck($.add($.add(xfB.get$position().get$x(), $.mul(xfB.get$rotation().get$col1().get$x(), v1.get$x())), $.mul(xfB.get$rotation().get$col2().get$x(), v1.get$y()))), pAx));
  var dy = $.numTypeCheck($.sub(pBy, pAy));
  var distSqr = $.numTypeCheck($.add($.mul(dx, dx), $.mul(dy, dy)));
  var radius = $.numTypeCheck($.add(circle1.get$radius(), circle2.get$radius()));
  if ($.gtB(distSqr, $.mul(radius, radius))) return;
  manifold.set$type(0);
  manifold.get$localPoint().setFrom$1(circle1.get$position());
  manifold.get$localNormal().setZero$0();
  manifold.set$pointCount(1);
  $.index(manifold.get$points(), 0).get$localPoint().setFrom$1(circle2.get$position());
  $.index(manifold.get$points(), 0).get$id().zero$0();
 },
 testOverlap$4: function(shapeA, shapeB, transformA, transformB) {
  $.propertyTypeCheck(shapeA, 'is$Shape');
  $.propertyTypeCheck(shapeB, 'is$Shape');
  $.propertyTypeCheck(transformA, 'is$Transform');
  $.propertyTypeCheck(transformB, 'is$Transform');
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
 Collision$_construct$1: function(pool) {
  $.propertyTypeCheck(pool, 'is$DefaultWorldPool');
  var t1 = this.incidentEdge;
  $.indexSet(t1, 0, $.ClipVertex$());
  $.indexSet(t1, 1, $.ClipVertex$());
  t1 = this.clipPoints1;
  var t2 = $.ClipVertex$();
  var t3 = t1.length;
  if (0 < 0 || 0 >= t3) throw $.ioore(0);
  t1[0] = t2;
  t2 = $.ClipVertex$();
  var t4 = t1.length;
  if (1 < 0 || 1 >= t4) throw $.ioore(1);
  t1[1] = t2;
  t2 = this.clipPoints2;
  t1 = $.ClipVertex$();
  var t5 = t2.length;
  if (0 < 0 || 0 >= t5) throw $.ioore(0);
  t2[0] = t1;
  t1 = $.ClipVertex$();
  var t6 = t2.length;
  if (1 < 0 || 1 >= t6) throw $.ioore(1);
  t2[1] = t1;
 }
};

$$.ClipVertex = {"":
 ["id?", "v?"],
 super: "Object",
 setFrom$1: function(cv) {
  $.propertyTypeCheck(cv, 'is$ClipVertex');
  this.v.setFrom$1(cv.get$v());
  this.id.setFrom$1(cv.get$id());
 },
 is$ClipVertex: true
};

$$.EdgeResults = {"":
 ["edgeIndex=", "separation="],
 super: "Object",
 is$EdgeResults: true
};

$$.ContactID = {"":
 ["features?"],
 super: "Object",
 zero$0: function() {
  this.features.zero$0();
 },
 isEqual$1: function(other) {
  return $.eq($.propertyTypeCheck(other, 'is$ContactID').get$features(), this.features);
 },
 setFrom$1: function(other) {
  $.propertyTypeCheck(other, 'is$ContactID');
  this.features.setFrom$1(other.get$features());
 },
 operator$eq$1: function(other) {
  return $.eq(other.get$features(), this.features);
 },
 is$ContactID: true
};

$$.Distance = {"":
 ["normal?", "temp", "searchDirection", "closestPoint", "saveB", "saveA", "simplex", "maxIters", "iters", "calls"],
 super: "Object",
 distance$3: function(output, cache, input) {
  $.propertyTypeCheck(output, 'is$DistanceOutput');
  $.propertyTypeCheck(cache, 'is$SimplexCache');
  $.propertyTypeCheck(input, 'is$DistanceInput');
  this.calls = this.calls + 1;
  var proxyA = $.propertyTypeCheck(input.get$proxyA(), 'is$DistanceProxy');
  var proxyB = $.propertyTypeCheck(input.get$proxyB(), 'is$DistanceProxy');
  var transformA = $.propertyTypeCheck(input.get$transformA(), 'is$Transform');
  var transformB = $.propertyTypeCheck(input.get$transformB(), 'is$Transform');
  var t1 = this.simplex;
  t1.readCache$5(cache, proxyA, transformA, proxyB, transformB);
  var vertices = $.listTypeCheck(t1.get$vertices());
  var t2 = this.closestPoint;
  t1.getClosestPoint$1(t2);
  var distanceSqr1 = $.numTypeCheck(t2.get$lengthSquared());
  for (var t3 = this.saveA, t4 = this.saveB, t5 = this.searchDirection, t6 = this.temp, distanceSqr2 = distanceSqr1, iter = 0, saveCount = 0; $.ltB(iter, this.maxIters); ) {
    saveCount = $.intTypeCheck(t1.get$count());
    for (var i = 0; $.ltB(i, saveCount); i = $.intTypeCheck($.add(i, 1))) {
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
        $.assert(false);
    }
    if ($.eqB(t1.get$count(), 3)) break;
    t1.getClosestPoint$1(t2);
    distanceSqr2 = $.numTypeCheck(t2.get$lengthSquared());
    t1.getSearchDirection$1(t5);
    if ($.ltB(t5.get$lengthSquared(), 1.4208639999999999e-14)) break;
    var vertex = $.propertyTypeCheck($.index(vertices, t1.get$count()), 'is$SimplexVertex');
    $.Matrix22_mulTransMatrixAndVectorToOut(transformA.get$rotation(), t5.negateLocal$0(), t6);
    vertex.set$indexA(proxyA.getSupport$1(t6));
    $.Transform_mulToOut(transformA, $.index(proxyA.get$vertices(), vertex.get$indexA()), vertex.get$wA());
    $.Matrix22_mulTransMatrixAndVectorToOut(transformB.get$rotation(), t5.negateLocal$0(), t6);
    vertex.set$indexB(proxyB.getSupport$1(t6));
    $.Transform_mulToOut(transformB, $.index(proxyB.get$vertices(), vertex.get$indexB()), vertex.get$wB());
    vertex.get$w().setFrom$1(vertex.get$wB()).subLocal$1(vertex.get$wA());
    iter = $.intTypeCheck($.add(iter, 1));
    this.iters = this.iters + 1;
    for (i = 0; duplicate = false, $.ltB(i, saveCount); i = $.intTypeCheck($.add(i, 1))) {
      if ($.eqB(vertex.get$indexA(), $.index(t3, i)) && $.eqB(vertex.get$indexB(), $.index(t4, i))) {
        duplicate = true;
        break;
      }
    }
    if (duplicate) break;
    t1.set$count($.add(t1.get$count(), 1));
    distanceSqr1 = distanceSqr2;
  }
  this.maxIters = $.Math_max(this.maxIters, iter);
  t1.getWitnessPoints$2(output.get$pointA(), output.get$pointB());
  output.set$distance($.MathBox_distance(output.get$pointA(), output.get$pointB()));
  output.set$iterations(iter);
  t1.writeCache$1(cache);
  if (input.get$useRadii() === true) {
    var rA = $.numTypeCheck(proxyA.get$radius());
    var rB = $.numTypeCheck(proxyB.get$radius());
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
  var duplicate;
 },
 get$distance: function() { return new $.BoundClosure0(this, 'distance$3'); }
};

$$.DistanceInput = {"":
 ["useRadii=", "transformB=", "transformA=", "proxyB=", "proxyA="],
 super: "Object",
 is$DistanceInput: true
};

$$.DistanceOutput = {"":
 ["iterations!", "distance=", "pointB?", "pointA?"],
 super: "Object",
 distance$3: function(arg0, arg1, arg2) { return this.distance.$call$3(arg0, arg1, arg2); },
 is$DistanceOutput: true
};

$$.DistanceProxy = {"":
 ["radius?", "count=", "vertices?"],
 super: "Object",
 getSupport$1: function(direction) {
  $.propertyTypeCheck(direction, 'is$Vector');
  var t1 = this.vertices;
  var t2 = t1.length;
  if (0 >= t2) throw $.ioore(0);
  var bestValue = $.numTypeCheck($.Vector_dot(t1[0], direction));
  for (var bestIndex = 0, i = 1; i < this.count; ++i) {
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    var value = $.numTypeCheck($.Vector_dot(t1[i], direction));
    if ($.gtB(value, bestValue)) {
      bestIndex = i;
      bestValue = value;
    }
  }
  return bestIndex;
 },
 getSupport$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      t1 = env0;
      i = env1;
      var direction = env2;
      bestValue = env3;
      bestIndex = env4;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(direction, 'is$Vector');
      var t1 = this.vertices;
      var t2 = t1.length;
      if (0 < 0 || 0 >= t2) throw $.ioore(0);
      var bestValue = $.numTypeCheck($.Vector_dot(t1[0], direction));
      var bestIndex = 0;
      var i = 1;
    case 1:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, this.count)) break L0;
            if (i !== (i | 0)) throw $.iae(i);
            t2 = t1.length;
            if (i < 0 || i >= t2) throw $.ioore(i);
            var value = $.numTypeCheck($.Vector_dot(t1[i], direction));
            if ($.gtB(value, bestValue)) {
              bestIndex = i;
              bestValue = value;
            }
            i = $.intTypeCheck($.add(i, 1));
          case 1:
            state = 0;
        }
      }
      return bestIndex;
  }
 },
 setFromShape$1: function(shape) {
  var t1 = shape.get$type();
  if (typeof t1 !== 'number') return this.setFromShape$1$bailout(1, shape, t1, 0);
  if (t1 === 0) {
    t1 = this.vertices;
    var t2 = t1.length;
    if (0 >= t2) throw $.ioore(0);
    t1[0].setFrom$1(shape.get$position());
    this.count = 1;
    this.radius = shape.get$radius();
  } else {
    t1 = shape.get$type();
    if (typeof t1 !== 'number') return this.setFromShape$1$bailout(2, shape, t1, 0);
    if (t1 === 1) {
      this.count = shape.get$vertexCount();
      this.radius = shape.get$radius();
      for (t1 = this.vertices, i = 0; i < this.count; ++i) {
        t2 = t1.length;
        if (i < 0 || i >= t2) throw $.ioore(i);
        t1[i].setFrom$1($.index(shape.get$vertices(), i));
      }
    } else $.assert(false);
  }
  var i;
 },
 setFromShape$1$bailout: function(state, env0, env1, env2) {
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
      t1 = env1;
      i = env2;
      break;
  }
  switch (state) {
    case 0:
      var t1 = shape.get$type();
    case 1:
      state = 0;
    case 2:
    case 3:
      if ((state == 0 && $.eqB(t1, 0))) {
        t1 = this.vertices;
        var t2 = t1.length;
        if (0 < 0 || 0 >= t2) throw $.ioore(0);
        t1[0].setFrom$1(shape.get$position());
        this.count = 1;
        this.radius = shape.get$radius();
      } else {
        switch (state) {
          case 0:
            t1 = shape.get$type();
          case 2:
            state = 0;
          case 3:
            if (state == 3 || (state == 0 && $.eqB(t1, 1))) {
              switch (state) {
                case 0:
                  this.count = shape.get$vertexCount();
                  this.radius = shape.get$radius();
                  t1 = this.vertices;
                  var i = 0;
                case 3:
                  L0: while (true) {
                    switch (state) {
                      case 0:
                        if (!$.ltB(i, this.count)) break L0;
                        if (i !== (i | 0)) throw $.iae(i);
                        t2 = t1.length;
                        if (i < 0 || i >= t2) throw $.ioore(i);
                        t1[i].setFrom$1($.index(shape.get$vertices(), i));
                        i = $.intTypeCheck($.add(i, 1));
                      case 3:
                        state = 0;
                    }
                  }
              }
            } else {
              $.assert(false);
            }
        }
      }
  }
 },
 DistanceProxy$0: function() {
  for (var t1 = this.vertices, i = 0; $.ltB(i, t1.length); i = $.intTypeCheck($.add(i, 1))) {
    var t2 = $.Vector$(0, 0);
    if (i !== (i | 0)) throw $.iae(i);
    var t3 = t1.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    t1[i] = t2;
  }
 },
 is$DistanceProxy: true
};

$$.Features = {"":
 ["flip=", "incidentVertex=", "incidentEdge=", "referenceEdge="],
 super: "Object",
 zero$0: function() {
  this.referenceEdge = 0;
  this.incidentEdge = 0;
  this.incidentVertex = 0;
  this.flip = 0;
 },
 toString$0: function() {
  return $.add($.add($.add($.add($.add($.add($.add($.add('Features: (', this.flip), ' ,'), this.incidentEdge), ' ,'), this.incidentVertex), ' ,'), this.referenceEdge), ')');
 },
 operator$eq$1: function(other) {
  return $.eqB(this.referenceEdge, other.get$referenceEdge()) && $.eqB(this.incidentEdge, other.get$incidentEdge()) && $.eqB(this.incidentVertex, other.get$incidentVertex()) && $.eqB(this.flip, other.get$flip());
 },
 setFrom$1: function(f) {
  $.propertyTypeCheck(f, 'is$Features');
  this.referenceEdge = f.get$referenceEdge();
  this.incidentEdge = f.get$incidentEdge();
  this.incidentVertex = f.get$incidentVertex();
  this.flip = f.get$flip();
 },
 is$Features: true
};

$$.Manifold = {"":
 ["pointCount=", "type=", "localPoint?", "localNormal?", "points?"],
 super: "Object",
 setFrom$1: function(other) {
  $.propertyTypeCheck(other, 'is$Manifold');
  for (var t1 = this.points, i = 0; $.ltB(i, other.get$pointCount()); ++i) {
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    t1[i].setFrom$1($.index(other.get$points(), i));
  }
  this.type = other.get$type();
  this.localNormal.setFrom$1(other.get$localNormal());
  this.localPoint.setFrom$1(other.get$localPoint());
  this.pointCount = other.get$pointCount();
 },
 setFrom$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var other = env0;
      t1 = env1;
      i = env2;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(other, 'is$Manifold');
      var t1 = this.points;
      var i = 0;
    case 1:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, other.get$pointCount())) break L0;
            if (i !== (i | 0)) throw $.iae(i);
            var t2 = t1.length;
            if (i < 0 || i >= t2) throw $.ioore(i);
            t1[i].setFrom$1($.index(other.get$points(), i));
            i = $.intTypeCheck($.add(i, 1));
          case 1:
            state = 0;
        }
      }
      this.type = other.get$type();
      this.localNormal.setFrom$1(other.get$localNormal());
      this.localPoint.setFrom$1(other.get$localPoint());
      this.pointCount = other.get$pointCount();
  }
 },
 Manifold$0: function() {
  for (var t1 = this.points, i = 0; $.ltB(i, 2); i = $.intTypeCheck($.add(i, 1))) {
    var t2 = $.ManifoldPoint$();
    if (i !== (i | 0)) throw $.iae(i);
    var t3 = t1.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    t1[i] = t2;
  }
 },
 is$Manifold: true
};

$$.ManifoldPoint = {"":
 ["id?", "tangentImpulse=", "normalImpulse=", "localPoint?"],
 super: "Object",
 setFrom$1: function(other) {
  $.propertyTypeCheck(other, 'is$ManifoldPoint');
  this.localPoint.setFrom$1(other.get$localPoint());
  this.normalImpulse = other.get$normalImpulse();
  this.tangentImpulse = other.get$tangentImpulse();
  this.id.setFrom$1(other.get$id());
 },
 is$ManifoldPoint: true
};

$$.Simplex = {"":
 ["case33", "case3", "case22", "case2", "e12", "e23", "e13", "count=", "vertices?", "v3", "v2", "v1"],
 super: "Object",
 solve3$0: function() {
  var t1 = this.v1;
  var w1 = $.propertyTypeCheck(t1.w, 'is$Vector');
  var t2 = this.v2;
  var w2 = $.propertyTypeCheck(t2.w, 'is$Vector');
  var t3 = this.v3;
  var w3 = $.propertyTypeCheck(t3.w, 'is$Vector');
  var t4 = this.e12;
  t4.setFrom$1(w2).subLocal$1(w1);
  var w1e12 = $.numTypeCheck($.Vector_dot(w1, t4));
  if (typeof w1e12 !== 'number') return this.solve3$0$bailout(1, w1e12, w1, w2, w3, t1, t2, t3, t4, 0, 0, 0, 0, 0, 0);
  var w2e12 = $.numTypeCheck($.Vector_dot(w2, t4));
  if (typeof w2e12 !== 'number') return this.solve3$0$bailout(2, w1e12, w1, w2e12, w2, w3, t1, t2, t3, t4, 0, 0, 0, 0, 0);
  var d12_2 = -w1e12;
  var t5 = this.e13;
  t5.setFrom$1(w3).subLocal$1(w1);
  var w1e13 = $.numTypeCheck($.Vector_dot(w1, t5));
  if (typeof w1e13 !== 'number') return this.solve3$0$bailout(4, t4, t5, w1, w2e12, w2, d12_2, w3, t1, t2, t3, w1e13, 0, 0, 0);
  var w3e13 = $.numTypeCheck($.Vector_dot(w3, t5));
  if (typeof w3e13 !== 'number') return this.solve3$0$bailout(5, t4, t5, w3e13, w1, w2, w3, w2e12, d12_2, t1, t2, t3, w1e13, 0, 0);
  var d13_2 = -w1e13;
  var t6 = this.e23;
  t6.setFrom$1(w3).subLocal$1(w2);
  var w2e23 = $.numTypeCheck($.Vector_dot(w2, t6));
  if (typeof w2e23 !== 'number') return this.solve3$0$bailout(7, t5, w3e13, w1, t6, d13_2, w2, w3, w2e23, w2e12, d12_2, t1, t2, t3, t4);
  var w3e23 = $.numTypeCheck($.Vector_dot(w3, t6));
  if (typeof w3e23 !== 'number') return this.solve3$0$bailout(8, t5, w3e13, w1, d13_2, w2, w3, w2e23, w3e23, w2e12, d12_2, t1, t2, t3, t4);
  var d23_2 = -w2e23;
  var n123 = $.numTypeCheck($.Vector_crossVectors(t4, t5));
  if (typeof n123 !== 'number') return this.solve3$0$bailout(10, w3e13, w1, d13_2, w2, w3, w3e23, d23_2, w2e12, d12_2, n123, t1, t2, t3, 0);
  t5 = $.Vector_crossVectors(w2, w3);
  if (typeof t5 !== 'number') return this.solve3$0$bailout(11, w3e13, w1, d13_2, w2, w3, w3e23, d23_2, w2e12, d12_2, n123, t5, t1, t2, t3);
  var d123_1 = n123 * t5;
  t5 = $.Vector_crossVectors(w3, w1);
  if (typeof t5 !== 'number') return this.solve3$0$bailout(13, t5, w3e13, w1, d13_2, w2, w3e23, d23_2, w2e12, d12_2, n123, t1, t2, t3, d123_1);
  var d123_2 = n123 * t5;
  t5 = $.Vector_crossVectors(w1, w2);
  if (typeof t5 !== 'number') return this.solve3$0$bailout(15, w3e13, d123_2, t5, d13_2, w3e23, d23_2, w2e12, d12_2, n123, t1, t2, t3, d123_1, 0);
  var d123_3 = n123 * t5;
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
 solve3$0$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13) {
  switch (state) {
    case 1:
      w1e12 = env0;
      w1 = env1;
      w2 = env2;
      w3 = env3;
      t1 = env4;
      t2 = env5;
      t3 = env6;
      t4 = env7;
      break;
    case 2:
      w1e12 = env0;
      w1 = env1;
      w2e12 = env2;
      w2 = env3;
      w3 = env4;
      t1 = env5;
      t2 = env6;
      t3 = env7;
      t4 = env8;
      break;
    case 3:
      w1 = env0;
      w2e12 = env1;
      w2 = env2;
      d12_2 = env3;
      w3 = env4;
      t1 = env5;
      t2 = env6;
      t3 = env7;
      t4 = env8;
      break;
    case 4:
      t4 = env0;
      t5 = env1;
      w1 = env2;
      w2e12 = env3;
      w2 = env4;
      d12_2 = env5;
      w3 = env6;
      t1 = env7;
      t2 = env8;
      t3 = env9;
      w1e13 = env10;
      break;
    case 5:
      t4 = env0;
      t5 = env1;
      w3e13 = env2;
      w1 = env3;
      w2 = env4;
      w3 = env5;
      w2e12 = env6;
      d12_2 = env7;
      t1 = env8;
      t2 = env9;
      t3 = env10;
      w1e13 = env11;
      break;
    case 6:
      t5 = env0;
      w3e13 = env1;
      w1 = env2;
      d13_2 = env3;
      w2 = env4;
      w3 = env5;
      w2e12 = env6;
      d12_2 = env7;
      t1 = env8;
      t2 = env9;
      t3 = env10;
      t4 = env11;
      break;
    case 7:
      t5 = env0;
      w3e13 = env1;
      w1 = env2;
      t6 = env3;
      d13_2 = env4;
      w2 = env5;
      w3 = env6;
      w2e23 = env7;
      w2e12 = env8;
      d12_2 = env9;
      t1 = env10;
      t2 = env11;
      t3 = env12;
      t4 = env13;
      break;
    case 8:
      t5 = env0;
      w3e13 = env1;
      w1 = env2;
      d13_2 = env3;
      w2 = env4;
      w3 = env5;
      w2e23 = env6;
      w3e23 = env7;
      w2e12 = env8;
      d12_2 = env9;
      t1 = env10;
      t2 = env11;
      t3 = env12;
      t4 = env13;
      break;
    case 9:
      t5 = env0;
      w3e13 = env1;
      w1 = env2;
      d13_2 = env3;
      w2 = env4;
      w3 = env5;
      w3e23 = env6;
      d23_2 = env7;
      w2e12 = env8;
      d12_2 = env9;
      t1 = env10;
      t2 = env11;
      t3 = env12;
      t4 = env13;
      break;
    case 10:
      w3e13 = env0;
      w1 = env1;
      d13_2 = env2;
      w2 = env3;
      w3 = env4;
      w3e23 = env5;
      d23_2 = env6;
      w2e12 = env7;
      d12_2 = env8;
      n123 = env9;
      t1 = env10;
      t2 = env11;
      t3 = env12;
      break;
    case 11:
      w3e13 = env0;
      w1 = env1;
      d13_2 = env2;
      w2 = env3;
      w3 = env4;
      w3e23 = env5;
      d23_2 = env6;
      w2e12 = env7;
      d12_2 = env8;
      n123 = env9;
      t5 = env10;
      t1 = env11;
      t2 = env12;
      t3 = env13;
      break;
    case 12:
      w3e13 = env0;
      w1 = env1;
      d13_2 = env2;
      w2 = env3;
      w3 = env4;
      w3e23 = env5;
      d23_2 = env6;
      w2e12 = env7;
      d12_2 = env8;
      n123 = env9;
      t1 = env10;
      t2 = env11;
      t3 = env12;
      d123_1 = env13;
      break;
    case 13:
      t5 = env0;
      w3e13 = env1;
      w1 = env2;
      d13_2 = env3;
      w2 = env4;
      w3e23 = env5;
      d23_2 = env6;
      w2e12 = env7;
      d12_2 = env8;
      n123 = env9;
      t1 = env10;
      t2 = env11;
      t3 = env12;
      d123_1 = env13;
      break;
    case 14:
      w3e13 = env0;
      d123_2 = env1;
      w1 = env2;
      d13_2 = env3;
      w2 = env4;
      w3e23 = env5;
      d23_2 = env6;
      w2e12 = env7;
      d12_2 = env8;
      n123 = env9;
      t1 = env10;
      t2 = env11;
      t3 = env12;
      d123_1 = env13;
      break;
    case 15:
      w3e13 = env0;
      d123_2 = env1;
      t5 = env2;
      d13_2 = env3;
      w3e23 = env4;
      d23_2 = env5;
      w2e12 = env6;
      d12_2 = env7;
      n123 = env8;
      t1 = env9;
      t2 = env10;
      t3 = env11;
      d123_1 = env12;
      break;
    case 16:
      w3e13 = env0;
      d123_2 = env1;
      d13_2 = env2;
      d123_3 = env3;
      w3e23 = env4;
      d23_2 = env5;
      w2e12 = env6;
      d12_2 = env7;
      t1 = env8;
      t2 = env9;
      t3 = env10;
      d123_1 = env11;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.v1;
      var w1 = $.propertyTypeCheck(t1.get$w(), 'is$Vector');
      var t2 = this.v2;
      var w2 = $.propertyTypeCheck(t2.get$w(), 'is$Vector');
      var t3 = this.v3;
      var w3 = $.propertyTypeCheck(t3.get$w(), 'is$Vector');
      var t4 = this.e12;
      t4.setFrom$1(w2).subLocal$1(w1);
      var w1e12 = $.numTypeCheck($.Vector_dot(w1, t4));
    case 1:
      state = 0;
      var w2e12 = $.numTypeCheck($.Vector_dot(w2, t4));
    case 2:
      state = 0;
      var d12_2 = $.numTypeCheck($.neg(w1e12));
    case 3:
      state = 0;
      var t5 = this.e13;
      t5.setFrom$1(w3).subLocal$1(w1);
      var w1e13 = $.numTypeCheck($.Vector_dot(w1, t5));
    case 4:
      state = 0;
      var w3e13 = $.numTypeCheck($.Vector_dot(w3, t5));
    case 5:
      state = 0;
      var d13_2 = $.numTypeCheck($.neg(w1e13));
    case 6:
      state = 0;
      var t6 = this.e23;
      t6.setFrom$1(w3).subLocal$1(w2);
      var w2e23 = $.numTypeCheck($.Vector_dot(w2, t6));
    case 7:
      state = 0;
      var w3e23 = $.numTypeCheck($.Vector_dot(w3, t6));
    case 8:
      state = 0;
      var d23_2 = $.numTypeCheck($.neg(w2e23));
    case 9:
      state = 0;
      var n123 = $.numTypeCheck($.Vector_crossVectors(t4, t5));
    case 10:
      state = 0;
      t5 = $.Vector_crossVectors(w2, w3);
    case 11:
      state = 0;
      var d123_1 = $.numTypeCheck($.mul(n123, t5));
    case 12:
      state = 0;
      t5 = $.Vector_crossVectors(w3, w1);
    case 13:
      state = 0;
      var d123_2 = $.numTypeCheck($.mul(n123, t5));
    case 14:
      state = 0;
      t5 = $.Vector_crossVectors(w1, w2);
    case 15:
      state = 0;
      var d123_3 = $.numTypeCheck($.mul(n123, t5));
    case 16:
      state = 0;
      if ($.leB(d12_2, 0.0) && $.leB(d13_2, 0.0)) {
        t1.set$a(1.0);
        this.count = 1;
        return;
      }
      if ($.gtB(w2e12, 0.0) && $.gtB(d12_2, 0.0) && $.leB(d123_3, 0.0)) {
        t3 = $.add(w2e12, d12_2);
        if (typeof t3 !== 'number') throw $.iae(t3);
        var inv_d12 = 1.0 / t3;
        t1.set$a($.mul(w2e12, inv_d12));
        t2.set$a($.mul(d12_2, inv_d12));
        this.count = 2;
        return;
      }
      if ($.gtB(w3e13, 0.0) && $.gtB(d13_2, 0.0) && $.leB(d123_2, 0.0)) {
        t4 = $.add(w3e13, d13_2);
        if (typeof t4 !== 'number') throw $.iae(t4);
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
        if (typeof t4 !== 'number') throw $.iae(t4);
        var inv_d23 = 1.0 / t4;
        t2.set$a($.mul(w3e23, inv_d23));
        t3.set$a($.mul(d23_2, inv_d23));
        this.count = 2;
        t1.setFrom$1(t3);
        return;
      }
      t4 = $.add($.add(d123_1, d123_2), d123_3);
      if (typeof t4 !== 'number') throw $.iae(t4);
      var inv_d123 = 1.0 / t4;
      t1.set$a($.mul(d123_1, inv_d123));
      t2.set$a($.mul(d123_2, inv_d123));
      t3.set$a($.mul(d123_3, inv_d123));
      this.count = 3;
  }
 },
 solve2$0: function() {
  var t1 = this.v1;
  var w1 = $.propertyTypeCheck(t1.w, 'is$Vector');
  var t2 = this.v2;
  var w2 = $.propertyTypeCheck(t2.w, 'is$Vector');
  var t3 = this.e12;
  t3.setFrom$1(w2).subLocal$1(w1);
  var t4 = $.Vector_dot(w1, t3);
  if (typeof t4 !== 'number') return this.solve2$0$bailout(1, t4, t1, t2, t3, w2);
  var d12_2 = -t4;
  if (d12_2 <= 0.0) {
    t1.a = 1.0;
    this.count = 1;
    return;
  }
  var d12_1 = $.numTypeCheck($.Vector_dot(w2, t3));
  if (typeof d12_1 !== 'number') return this.solve2$0$bailout(3, d12_2, d12_1, t1, t2, 0);
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
 solve2$0$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      t4 = env0;
      t1 = env1;
      t2 = env2;
      t3 = env3;
      w2 = env4;
      break;
    case 2:
      d12_2 = env0;
      t1 = env1;
      t2 = env2;
      t3 = env3;
      w2 = env4;
      break;
    case 3:
      d12_2 = env0;
      d12_1 = env1;
      t1 = env2;
      t2 = env3;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.v1;
      var w1 = $.propertyTypeCheck(t1.get$w(), 'is$Vector');
      var t2 = this.v2;
      var w2 = $.propertyTypeCheck(t2.get$w(), 'is$Vector');
      var t3 = this.e12;
      t3.setFrom$1(w2).subLocal$1(w1);
      var t4 = $.Vector_dot(w1, t3);
    case 1:
      state = 0;
      var d12_2 = $.numTypeCheck($.neg(t4));
    case 2:
      state = 0;
      if ($.leB(d12_2, 0.0)) {
        t1.set$a(1.0);
        this.count = 1;
        return;
      }
      var d12_1 = $.numTypeCheck($.Vector_dot(w2, t3));
    case 3:
      state = 0;
      if ($.leB(d12_1, 0.0)) {
        t2.set$a(1.0);
        this.count = 1;
        t1.setFrom$1(t2);
        return;
      }
      t3 = $.add(d12_1, d12_2);
      if (typeof t3 !== 'number') throw $.iae(t3);
      var inv_d12 = 1.0 / t3;
      t1.set$a($.mul(d12_1, inv_d12));
      t2.set$a($.mul(d12_2, inv_d12));
      this.count = 2;
  }
 },
 getMetric$0: function() {
  switch (this.count) {
    case 0:
      $.assert(false);
      return 0.0;
    case 1:
      return 0.0;
    case 2:
      return $.MathBox_distance(this.v1.get$w(), this.v2.get$w());
    case 3:
      var t1 = this.case3;
      var t2 = t1.setFrom$1(this.v2.get$w());
      var t3 = this.v1;
      t2.subLocal$1(t3.get$w());
      t2 = this.case33;
      t2.setFrom$1(this.v3.get$w()).subLocal$1(t3.get$w());
      return $.Vector_crossVectors(t1, t2);
    default:
      $.assert(false);
      return 0.0;
  }
 },
 getWitnessPoints$2: function(pA, pB) {
  $.propertyTypeCheck(pA, 'is$Vector');
  $.propertyTypeCheck(pB, 'is$Vector');
  switch (this.count) {
    case 0:
      $.assert(false);
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
      $.assert(false);
      break;
  }
 },
 getClosestPoint$1: function(out) {
  $.propertyTypeCheck(out, 'is$Vector');
  switch (this.count) {
    case 0:
      $.assert(false);
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
      $.assert(false);
      out.setZero$0();
      return;
  }
 },
 getSearchDirection$1: function(out) {
  $.propertyTypeCheck(out, 'is$Vector');
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
      if ($.gtB($.numTypeCheck($.Vector_crossVectors(t1, out)), 0)) {
        $.Vector_crossNumAndVectorToOut(1, t1, out);
        return;
      }
      $.Vector_crossVectorAndNumToOut(t1, 1, out);
      return;
    default:
      $.assert(false);
      out.setZero$0();
      return;
  }
 },
 writeCache$1: function(cache) {
  $.propertyTypeCheck(cache, 'is$SimplexCache');
  cache.set$metric(this.getMetric$0());
  cache.set$count(this.count);
  for (var t1 = this.vertices, i = 0; $.ltB(i, this.count); i = $.intTypeCheck($.add(i, 1))) {
    var t2 = cache.get$indexA();
    if (i !== (i | 0)) throw $.iae(i);
    var t3 = t1.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    $.indexSet(t2, i, t1[i].get$indexA());
    t2 = cache.get$indexB();
    var t4 = t1.length;
    if (i < 0 || i >= t4) throw $.ioore(i);
    $.indexSet(t2, i, t1[i].get$indexB());
  }
 },
 readCache$5: function(cache, proxyA, transformA, proxyB, transformB) {
  $.propertyTypeCheck(cache, 'is$SimplexCache');
  $.propertyTypeCheck(proxyA, 'is$DistanceProxy');
  $.propertyTypeCheck(transformA, 'is$Transform');
  $.propertyTypeCheck(proxyB, 'is$DistanceProxy');
  $.propertyTypeCheck(transformB, 'is$Transform');
  var t1 = cache.get$count();
  if (typeof t1 !== 'number') return this.readCache$5$bailout(1, cache, proxyA, transformA, proxyB, transformB, t1, 0, 0, 0, 0);
  $.assert(t1 <= 3);
  this.count = cache.get$count();
  for (t1 = this.vertices, i = 0; i < this.count; ++i) {
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    var v = $.propertyTypeCheck(t1[i], 'is$SimplexVertex');
    v.set$indexA($.index(cache.get$indexA(), i));
    v.set$indexB($.index(cache.get$indexB(), i));
    var t3 = proxyA.get$vertices();
    if (typeof t3 !== 'string' && (typeof t3 !== 'object' || t3 === null || (t3.constructor !== Array && !t3.is$JavaScriptIndexingBehavior()))) return this.readCache$5$bailout(2, t1, t3, cache, proxyA, v, transformA, transformB, i, proxyB, 0);
    var t4 = v.get$indexA();
    if (t4 !== (t4 | 0)) throw $.iae(t4);
    var t5 = t3.length;
    if (t4 < 0 || t4 >= t5) throw $.ioore(t4);
    var wALocal = $.propertyTypeCheck(t3[t4], 'is$Vector');
    t4 = proxyB.get$vertices();
    if (typeof t4 !== 'string' && (typeof t4 !== 'object' || t4 === null || (t4.constructor !== Array && !t4.is$JavaScriptIndexingBehavior()))) return this.readCache$5$bailout(3, t1, wALocal, cache, t4, v, transformA, transformB, i, proxyB, proxyA);
    t3 = v.get$indexB();
    if (t3 !== (t3 | 0)) throw $.iae(t3);
    var t6 = t4.length;
    if (t3 < 0 || t3 >= t6) throw $.ioore(t3);
    var wBLocal = $.propertyTypeCheck(t4[t3], 'is$Vector');
    $.Transform_mulToOut(transformA, wALocal, v.get$wA());
    $.Transform_mulToOut(transformB, wBLocal, v.get$wB());
    v.get$w().setFrom$1(v.get$wB()).subLocal$1(v.get$wA());
    v.set$a(0.0);
  }
  t2 = this.count;
  if (typeof t2 !== 'number') return this.readCache$5$bailout(5, t1, t2, cache, proxyA, transformA, proxyB, transformB, 0, 0, 0);
  if (t2 > 1) {
    var metric1 = $.numTypeCheck(cache.get$metric());
    var metric2 = $.numTypeCheck(this.getMetric$0());
    if (typeof metric2 !== 'number') return this.readCache$5$bailout(6, t1, proxyA, transformA, proxyB, transformB, metric2, metric1, 0, 0, 0);
    if (typeof metric1 !== 'number') throw $.iae(metric1);
    if (metric2 < 0.5 * metric1 || 2.0 * metric1 < metric2 || metric2 < 1.192e-7) this.count = 0;
  }
  t2 = this.count;
  if (typeof t2 !== 'number') return this.readCache$5$bailout(7, t1, t2, proxyA, transformA, proxyB, transformB, 0, 0, 0, 0);
  if (t2 === 0) {
    t2 = t1.length;
    if (0 >= t2) throw $.ioore(0);
    v = $.propertyTypeCheck(t1[0], 'is$SimplexVertex');
    v.set$indexA(0);
    v.set$indexB(0);
    t1 = proxyA.get$vertices();
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.readCache$5$bailout(8, transformA, proxyB, v, transformB, t1, 0, 0, 0, 0, 0);
    t3 = t1.length;
    if (0 >= t3) throw $.ioore(0);
    wALocal = $.propertyTypeCheck(t1[0], 'is$Vector');
    t1 = proxyB.get$vertices();
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.readCache$5$bailout(9, wALocal, transformA, t1, v, transformB, 0, 0, 0, 0, 0);
    t4 = t1.length;
    if (0 >= t4) throw $.ioore(0);
    wBLocal = $.propertyTypeCheck(t1[0], 'is$Vector');
    $.Transform_mulToOut(transformA, wALocal, v.get$wA());
    $.Transform_mulToOut(transformB, wBLocal, v.get$wB());
    v.get$w().setFrom$1(v.get$wB()).subLocal$1(v.get$wA());
    this.count = 1;
  }
  var i;
 },
 readCache$5$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9) {
  switch (state) {
    case 1:
      var cache = env0;
      var proxyA = env1;
      var transformA = env2;
      var proxyB = env3;
      var transformB = env4;
      t1 = env5;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      cache = env2;
      proxyA = env3;
      v = env4;
      transformA = env5;
      transformB = env6;
      i = env7;
      proxyB = env8;
      break;
    case 3:
      t1 = env0;
      wALocal = env1;
      cache = env2;
      t3 = env3;
      v = env4;
      transformA = env5;
      transformB = env6;
      i = env7;
      proxyB = env8;
      proxyA = env9;
      break;
    case 4:
      t1 = env0;
      cache = env1;
      proxyA = env2;
      transformA = env3;
      proxyB = env4;
      transformB = env5;
      i = env6;
      break;
    case 5:
      t1 = env0;
      t2 = env1;
      cache = env2;
      proxyA = env3;
      transformA = env4;
      proxyB = env5;
      transformB = env6;
      break;
    case 6:
      t1 = env0;
      proxyA = env1;
      transformA = env2;
      proxyB = env3;
      transformB = env4;
      metric2 = env5;
      metric1 = env6;
      break;
    case 7:
      t1 = env0;
      t2 = env1;
      proxyA = env2;
      transformA = env3;
      proxyB = env4;
      transformB = env5;
      break;
    case 8:
      transformA = env0;
      proxyB = env1;
      v = env2;
      transformB = env3;
      t1 = env4;
      break;
    case 9:
      wALocal = env0;
      transformA = env1;
      t1 = env2;
      v = env3;
      transformB = env4;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(cache, 'is$SimplexCache');
      $.propertyTypeCheck(proxyA, 'is$DistanceProxy');
      $.propertyTypeCheck(transformA, 'is$Transform');
      $.propertyTypeCheck(proxyB, 'is$DistanceProxy');
      $.propertyTypeCheck(transformB, 'is$Transform');
      var t1 = cache.get$count();
    case 1:
      state = 0;
      $.assert($.le(t1, 3));
      this.count = cache.get$count();
      t1 = this.vertices;
      var i = 0;
    case 2:
    case 3:
    case 4:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, this.count)) break L0;
            if (i !== (i | 0)) throw $.iae(i);
            var t2 = t1.length;
            if (i < 0 || i >= t2) throw $.ioore(i);
            var v = $.propertyTypeCheck(t1[i], 'is$SimplexVertex');
            v.set$indexA($.index(cache.get$indexA(), i));
            v.set$indexB($.index(cache.get$indexB(), i));
            var t3 = proxyA.get$vertices();
          case 2:
            state = 0;
            var wALocal = $.propertyTypeCheck($.index(t3, v.get$indexA()), 'is$Vector');
            t3 = proxyB.get$vertices();
          case 3:
            state = 0;
            var wBLocal = $.propertyTypeCheck($.index(t3, v.get$indexB()), 'is$Vector');
            $.Transform_mulToOut(transformA, wALocal, v.get$wA());
            $.Transform_mulToOut(transformB, wBLocal, v.get$wB());
            v.get$w().setFrom$1(v.get$wB()).subLocal$1(v.get$wA());
            v.set$a(0.0);
            i = $.intTypeCheck($.add(i, 1));
          case 4:
            state = 0;
        }
      }
      t2 = this.count;
    case 5:
      state = 0;
    case 6:
      if (state == 6 || (state == 0 && $.gtB(t2, 1))) {
        switch (state) {
          case 0:
            var metric1 = $.numTypeCheck(cache.get$metric());
            var metric2 = $.numTypeCheck(this.getMetric$0());
          case 6:
            state = 0;
            if (typeof metric1 !== 'number') throw $.iae(metric1);
            if ($.ltB(metric2, 0.5 * metric1) || $.ltB(2.0 * metric1, metric2) || $.ltB(metric2, 1.192e-7)) this.count = 0;
        }
      }
      t2 = this.count;
    case 7:
      state = 0;
    case 8:
    case 9:
      if (state == 8 || state == 9 || (state == 0 && $.eqB(t2, 0))) {
        switch (state) {
          case 0:
            t2 = t1.length;
            if (0 < 0 || 0 >= t2) throw $.ioore(0);
            v = $.propertyTypeCheck(t1[0], 'is$SimplexVertex');
            v.set$indexA(0);
            v.set$indexB(0);
            t1 = proxyA.get$vertices();
          case 8:
            state = 0;
            wALocal = $.propertyTypeCheck($.index(t1, 0), 'is$Vector');
            t1 = proxyB.get$vertices();
          case 9:
            state = 0;
            wBLocal = $.propertyTypeCheck($.index(t1, 0), 'is$Vector');
            $.Transform_mulToOut(transformA, wALocal, v.get$wA());
            $.Transform_mulToOut(transformB, wBLocal, v.get$wB());
            v.get$w().setFrom$1(v.get$wB()).subLocal$1(v.get$wA());
            this.count = 1;
        }
      }
  }
 },
 Simplex$0: function() {
  var t1 = this.vertices;
  var t2 = this.v1;
  var t3 = t1.length;
  if (0 < 0 || 0 >= t3) throw $.ioore(0);
  t1[0] = t2;
  t2 = this.v2;
  var t4 = t1.length;
  if (1 < 0 || 1 >= t4) throw $.ioore(1);
  t1[1] = t2;
  t2 = this.v3;
  var t5 = t1.length;
  if (2 < 0 || 2 >= t5) throw $.ioore(2);
  t1[2] = t2;
 }
};

$$.SimplexCache = {"":
 ["indexB?", "indexA?", "count=", "metric="],
 super: "Object",
 setFrom$1: function(sc) {
  $.propertyTypeCheck(sc, 'is$SimplexCache');
  var t1 = this.indexA;
  $.setRange$3(t1, 0, t1.length, sc.get$indexA());
  t1 = this.indexB;
  $.setRange$3(t1, 0, t1.length, sc.get$indexB());
  this.metric = sc.get$metric();
  this.count = sc.get$count();
 },
 SimplexCache$0: function() {
  for (var t1 = this.indexA, t2 = this.indexB, i = 0; $.ltB(i, 3); i = $.intTypeCheck($.add(i, 1))) {
    if (i !== (i | 0)) throw $.iae(i);
    var t3 = t1.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    t1[i] = 2147483647;
    var t4 = t2.length;
    if (i < 0 || i >= t4) throw $.ioore(i);
    t2[i] = 2147483647;
  }
 },
 is$SimplexCache: true
};

$$.SimplexVertex = {"":
 ["indexB=", "indexA=", "a=", "w?", "wB?", "wA?"],
 super: "Object",
 toString$0: function() {
  return $.add($.add($.add($.add($.add('wA: ', $.toString(this.wA)), ' wB: '), $.toString(this.wB)), ' w: '), $.toString(this.w));
 },
 setFrom$1: function(sv) {
  $.propertyTypeCheck(sv, 'is$SimplexVertex');
  this.wA.setFrom$1(sv.get$wA());
  this.wB.setFrom$1(sv.get$wB());
  this.w.setFrom$1(sv.get$w());
  this.a = sv.get$a();
  this.indexA = sv.get$indexA();
  this.indexB = sv.get$indexB();
 },
 is$SimplexVertex: true
};

$$.TimeOfImpact = {"":
 ["pool", "sweepB?", "sweepA?", "indexes", "fcn", "distanceOutput", "xfB", "xfA", "distanceInput", "cache"],
 super: "Object",
 timeOfImpact$2: function(output, input) {
  $.propertyTypeCheck(output, 'is$TimeOfImpactOutput');
  $.propertyTypeCheck(input, 'is$TimeOfImpactInput');
  var t1 = $.TimeOfImpact_toiCalls;
  if (typeof t1 !== 'number') return this.timeOfImpact$2$bailout(1, output, input, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  $.TimeOfImpact_toiCalls = t1 + 1;
  output.set$state(0);
  output.set$t(input.get$tMax());
  var proxyA = $.propertyTypeCheck(input.get$proxyA(), 'is$DistanceProxy');
  var proxyB = $.propertyTypeCheck(input.get$proxyB(), 'is$DistanceProxy');
  var t2 = this.sweepA;
  t2.setFrom$1(input.get$sweepA());
  var t3 = this.sweepB;
  t3.setFrom$1(input.get$sweepB());
  t2.normalize$0();
  t3.normalize$0();
  var tMax = $.numTypeCheck(input.get$tMax());
  if (typeof tMax !== 'number') return this.timeOfImpact$2$bailout(2, proxyA, proxyB, output, input, t2, t3, tMax, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var t4 = proxyA.get$radius();
  if (typeof t4 !== 'number') return this.timeOfImpact$2$bailout(3, proxyA, proxyB, output, input, t2, t3, tMax, t4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var t5 = proxyB.get$radius();
  if (typeof t5 !== 'number') return this.timeOfImpact$2$bailout(4, proxyA, t5, proxyB, output, input, t2, t3, tMax, t4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var target = $.numTypeCheck($.Math_max(0.005, t4 + t5 - 0.015));
  if (typeof target !== 'number') return this.timeOfImpact$2$bailout(6, proxyA, proxyB, output, input, t2, t3, target, tMax, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  $.assert(target > 0.00125);
  var t6 = this.cache;
  t6.count = 0;
  var t7 = input.get$proxyA();
  var t8 = this.distanceInput;
  t8.proxyA = t7;
  t8.proxyB = input.get$proxyB();
  t8.useRadii = false;
  for (t1 = this.xfA, t4 = this.xfB, t5 = this.pool, t7 = this.distanceOutput, t9 = this.fcn, t10 = this.indexes, t11 = target + 0.00125, t12 = target - 0.00125, iter = 0, t13 = 0; true; ) {
    t2.getTransform$2(t1, t13);
    t3.getTransform$2(t4, t13);
    t8.transformA = t1;
    t8.transformB = t4;
    t5.get$distance().distance$3(t7, t6, t8);
    var t14 = t7.distance;
    if (typeof t14 !== 'number') return this.timeOfImpact$2$bailout(7, t10, iter, output, t2, t13, t3, t14, t6, target, t8, proxyA, t1, proxyB, t4, t5, t7, t9, tMax, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    if (t14 <= 0) {
      output.set$state(2);
      output.set$t(0);
      break;
    }
    if (typeof t14 !== 'number') return this.timeOfImpact$2$bailout(8, t10, iter, output, t2, t13, t3, t6, target, t8, proxyA, t1, proxyB, t14, t4, t5, t7, t9, tMax, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    if (t14 < t11) {
      output.set$state(3);
      output.set$t(t13);
      break;
    }
    t9.initialize$6(t6, proxyA, t2, proxyB, t3, t13);
    for (var t20 = tMax, pushBackIter = 0; done = false, true; ) {
      var s2 = $.numTypeCheck(t9.findMinSeparation$2(t10, t20));
      if (typeof s2 !== 'number') return this.timeOfImpact$2$bailout(9, t10, output, iter, t2, t13, t3, t6, target, t20, t8, proxyA, t1, pushBackIter, proxyB, t4, t5, t7, s2, t9, tMax, 0, 0, 0, 0, 0, 0, 0);
      if (s2 > t11) {
        output.set$state(4);
        output.set$t(tMax);
        done = true;
        break;
      }
      if (s2 > t12) {
        t13 = t20;
        done = false;
        break;
      }
      t14 = t10.length;
      if (0 >= t14) throw $.ioore(0);
      var t15 = t10[0];
      if (1 >= t14) throw $.ioore(1);
      var s1 = $.numTypeCheck(t9.evaluate$3(t15, t10[1], t13));
      if (typeof s1 !== 'number') return this.timeOfImpact$2$bailout(10, t10, output, iter, t2, t13, t3, t6, t20, target, t8, proxyA, t1, pushBackIter, proxyB, t4, t5, t7, s1, s2, t9, tMax, 0, 0, 0, 0, 0, 0);
      if (s1 < t12) {
        output.set$state(1);
        output.set$t(t13);
        done = true;
        break;
      }
      if (s1 <= t11) {
        output.set$state(3);
        output.set$t(t13);
        done = true;
        break;
      }
      for (var a1 = t13, a2 = t20, rootIterCount = 0; true; ) {
        if ($.eqB($.and(rootIterCount, 1), 1)) {
          if (typeof s1 !== 'number') throw $.iae(s1);
          t14 = target - s1;
          t15 = $.sub(a2, a1);
          if (typeof t15 !== 'number') throw $.iae(t15);
          t15 *= t14;
          t14 = $.sub(s2, s1);
          if (typeof t14 !== 'number') throw $.iae(t14);
          var t = $.numTypeCheck($.add(a1, t15 / t14));
          if (typeof t !== 'number') return this.timeOfImpact$2$bailout(11, t, output, iter, t2, t13, t3, t6, t20, t8, proxyA, t1, pushBackIter, proxyB, t4, t5, t7, rootIterCount, s2, a2, t9, tMax, a1, s1, t10, target, 0, 0);
        } else {
          t14 = $.add(a1, a2);
          if (typeof t14 !== 'number') throw $.iae(t14);
          t = 0.5 * t14;
        }
        t14 = t10.length;
        if (0 >= t14) throw $.ioore(0);
        t15 = t10[0];
        if (1 >= t14) throw $.ioore(1);
        var s = $.numTypeCheck(t9.evaluate$3(t15, t10[1], t));
        if (typeof s !== 'number') return this.timeOfImpact$2$bailout(12, output, iter, t2, t13, t3, t, t6, t20, t8, proxyA, t1, pushBackIter, s, proxyB, t5, t4, t7, rootIterCount, s2, a2, t9, tMax, a1, s1, t10, target, 0);
        t14 = $.abs(s - target);
        if (typeof t14 !== 'number') return this.timeOfImpact$2$bailout(13, output, iter, t2, t13, t3, t, t6, t20, t8, proxyA, t1, pushBackIter, s, proxyB, t5, t14, t7, rootIterCount, s2, a2, t9, tMax, a1, t4, s1, t10, target);
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
        rootIterCount = $.intTypeCheck($.add(rootIterCount, 1));
        if (rootIterCount !== (rootIterCount | 0)) return this.timeOfImpact$2$bailout(14, output, iter, t2, t13, t3, t6, t20, t8, proxyA, t1, pushBackIter, proxyB, t4, t5, t7, t9, tMax, t10, s2, a2, a1, s1, target, rootIterCount, 0, 0, 0);
        t14 = $.TimeOfImpact_toiRootIters;
        if (typeof t14 !== 'number') return this.timeOfImpact$2$bailout(15, output, iter, t2, t13, t3, t6, t20, t8, proxyA, t1, pushBackIter, proxyB, t4, t5, t7, t9, tMax, t10, s2, a2, a1, s1, target, rootIterCount, t14, 0, 0);
        $.TimeOfImpact_toiRootIters = t14 + 1;
        if (rootIterCount === 50) break;
      }
      $.TimeOfImpact_toiMaxRootIters = $.Math_max($.TimeOfImpact_toiMaxRootIters, rootIterCount);
      pushBackIter = $.intTypeCheck($.add(pushBackIter, 1));
      if (pushBackIter !== (pushBackIter | 0)) return this.timeOfImpact$2$bailout(16, t10, output, iter, t2, t13, t3, t6, target, t20, t8, proxyA, t1, proxyB, t4, t5, t7, t9, pushBackIter, tMax, 0, 0, 0, 0, 0, 0, 0, 0);
      if (pushBackIter === 8) {
        done = false;
        break;
      }
    }
    iter = $.intTypeCheck($.add(iter, 1));
    if (iter !== (iter | 0)) return this.timeOfImpact$2$bailout(17, t10, output, iter, t2, t3, t6, target, t8, proxyA, t1, proxyB, t4, t5, done, t7, t13, t9, tMax, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    t14 = $.TimeOfImpact_toiIters;
    if (typeof t14 !== 'number') return this.timeOfImpact$2$bailout(18, t10, output, iter, t14, t3, t2, t6, target, t8, proxyA, t1, proxyB, t4, t5, done, t7, t13, t9, tMax, 0, 0, 0, 0, 0, 0, 0, 0);
    $.TimeOfImpact_toiIters = t14 + 1;
    if (done) break;
    if (iter === 1000) {
      output.set$state(1);
      output.set$t(t13);
      break;
    }
  }
  $.TimeOfImpact_toiMaxIters = $.Math_max($.TimeOfImpact_toiMaxIters, iter);
  var iter, done, t13, t9, t12, t10, t11;
 },
 timeOfImpact$2$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13, env14, env15, env16, env17, env18, env19, env20, env21, env22, env23, env24, env25, env26) {
  switch (state) {
    case 1:
      var output = env0;
      var input = env1;
      t1 = env2;
      break;
    case 2:
      proxyA = env0;
      proxyB = env1;
      output = env2;
      input = env3;
      t2 = env4;
      t3 = env5;
      tMax = env6;
      break;
    case 3:
      proxyA = env0;
      proxyB = env1;
      output = env2;
      input = env3;
      t2 = env4;
      t3 = env5;
      tMax = env6;
      t4 = env7;
      break;
    case 4:
      proxyA = env0;
      t5 = env1;
      proxyB = env2;
      output = env3;
      input = env4;
      t2 = env5;
      t3 = env6;
      tMax = env7;
      t4 = env8;
      break;
    case 5:
      proxyA = env0;
      proxyB = env1;
      totalRadius = env2;
      output = env3;
      input = env4;
      t2 = env5;
      t3 = env6;
      tMax = env7;
      break;
    case 6:
      proxyA = env0;
      proxyB = env1;
      output = env2;
      input = env3;
      t2 = env4;
      t3 = env5;
      target = env6;
      tMax = env7;
      break;
    case 7:
      t10 = env0;
      iter = env1;
      output = env2;
      t2 = env3;
      t11 = env4;
      t3 = env5;
      t12 = env6;
      t5 = env7;
      target = env8;
      t6 = env9;
      proxyA = env10;
      t1 = env11;
      proxyB = env12;
      t4 = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      tMax = env17;
      break;
    case 8:
      t10 = env0;
      iter = env1;
      output = env2;
      t2 = env3;
      t11 = env4;
      t3 = env5;
      t5 = env6;
      target = env7;
      t6 = env8;
      proxyA = env9;
      t1 = env10;
      proxyB = env11;
      t12 = env12;
      t4 = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      tMax = env17;
      break;
    case 9:
      t10 = env0;
      output = env1;
      iter = env2;
      t2 = env3;
      t11 = env4;
      t3 = env5;
      t5 = env6;
      target = env7;
      t20 = env8;
      t6 = env9;
      proxyA = env10;
      t1 = env11;
      pushBackIter = env12;
      proxyB = env13;
      t4 = env14;
      t7 = env15;
      t8 = env16;
      s2 = env17;
      t9 = env18;
      tMax = env19;
      break;
    case 10:
      t10 = env0;
      output = env1;
      iter = env2;
      t2 = env3;
      t11 = env4;
      t3 = env5;
      t5 = env6;
      t20 = env7;
      target = env8;
      t6 = env9;
      proxyA = env10;
      t1 = env11;
      pushBackIter = env12;
      proxyB = env13;
      t4 = env14;
      t7 = env15;
      t8 = env16;
      s1 = env17;
      s2 = env18;
      t9 = env19;
      tMax = env20;
      break;
    case 11:
      t = env0;
      output = env1;
      iter = env2;
      t2 = env3;
      t11 = env4;
      t3 = env5;
      t5 = env6;
      t20 = env7;
      t6 = env8;
      proxyA = env9;
      t1 = env10;
      pushBackIter = env11;
      proxyB = env12;
      t4 = env13;
      t7 = env14;
      t8 = env15;
      rootIterCount = env16;
      s2 = env17;
      a2 = env18;
      t9 = env19;
      tMax = env20;
      a1 = env21;
      s1 = env22;
      t10 = env23;
      target = env24;
      break;
    case 12:
      output = env0;
      iter = env1;
      t2 = env2;
      t11 = env3;
      t3 = env4;
      t = env5;
      t5 = env6;
      t20 = env7;
      t6 = env8;
      proxyA = env9;
      t1 = env10;
      pushBackIter = env11;
      s = env12;
      proxyB = env13;
      t7 = env14;
      t4 = env15;
      t8 = env16;
      rootIterCount = env17;
      s2 = env18;
      a2 = env19;
      t9 = env20;
      tMax = env21;
      a1 = env22;
      s1 = env23;
      t10 = env24;
      target = env25;
      break;
    case 13:
      output = env0;
      iter = env1;
      t2 = env2;
      t11 = env3;
      t3 = env4;
      t = env5;
      t5 = env6;
      t20 = env7;
      t6 = env8;
      proxyA = env9;
      t1 = env10;
      pushBackIter = env11;
      s = env12;
      proxyB = env13;
      t7 = env14;
      t12 = env15;
      t8 = env16;
      rootIterCount = env17;
      s2 = env18;
      a2 = env19;
      t9 = env20;
      tMax = env21;
      a1 = env22;
      t4 = env23;
      s1 = env24;
      t10 = env25;
      target = env26;
      break;
    case 14:
      output = env0;
      iter = env1;
      t2 = env2;
      t11 = env3;
      t3 = env4;
      t5 = env5;
      t20 = env6;
      t6 = env7;
      proxyA = env8;
      t1 = env9;
      pushBackIter = env10;
      proxyB = env11;
      t4 = env12;
      t7 = env13;
      t8 = env14;
      t9 = env15;
      tMax = env16;
      t10 = env17;
      s2 = env18;
      a2 = env19;
      a1 = env20;
      s1 = env21;
      target = env22;
      rootIterCount = env23;
      break;
    case 15:
      output = env0;
      iter = env1;
      t2 = env2;
      t11 = env3;
      t3 = env4;
      t5 = env5;
      t20 = env6;
      t6 = env7;
      proxyA = env8;
      t1 = env9;
      pushBackIter = env10;
      proxyB = env11;
      t4 = env12;
      t7 = env13;
      t8 = env14;
      t9 = env15;
      tMax = env16;
      t10 = env17;
      s2 = env18;
      a2 = env19;
      a1 = env20;
      s1 = env21;
      target = env22;
      rootIterCount = env23;
      t12 = env24;
      break;
    case 16:
      t10 = env0;
      output = env1;
      iter = env2;
      t2 = env3;
      t11 = env4;
      t3 = env5;
      t5 = env6;
      target = env7;
      t20 = env8;
      t6 = env9;
      proxyA = env10;
      t1 = env11;
      proxyB = env12;
      t4 = env13;
      t7 = env14;
      t8 = env15;
      t9 = env16;
      pushBackIter = env17;
      tMax = env18;
      break;
    case 17:
      t10 = env0;
      output = env1;
      iter = env2;
      t2 = env3;
      t3 = env4;
      t5 = env5;
      target = env6;
      t6 = env7;
      proxyA = env8;
      t1 = env9;
      proxyB = env10;
      t4 = env11;
      t7 = env12;
      done = env13;
      t8 = env14;
      t11 = env15;
      t9 = env16;
      tMax = env17;
      break;
    case 18:
      t10 = env0;
      output = env1;
      iter = env2;
      t12 = env3;
      t3 = env4;
      t2 = env5;
      t5 = env6;
      target = env7;
      t6 = env8;
      proxyA = env9;
      t1 = env10;
      proxyB = env11;
      t4 = env12;
      t7 = env13;
      done = env14;
      t8 = env15;
      t11 = env16;
      t9 = env17;
      tMax = env18;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(output, 'is$TimeOfImpactOutput');
      $.propertyTypeCheck(input, 'is$TimeOfImpactInput');
      var t1 = $.TimeOfImpact_toiCalls;
    case 1:
      state = 0;
      $.TimeOfImpact_toiCalls = $.add(t1, 1);
      output.set$state(0);
      output.set$t(input.get$tMax());
      var proxyA = $.propertyTypeCheck(input.get$proxyA(), 'is$DistanceProxy');
      var proxyB = $.propertyTypeCheck(input.get$proxyB(), 'is$DistanceProxy');
      var t2 = this.sweepA;
      t2.setFrom$1(input.get$sweepA());
      var t3 = this.sweepB;
      t3.setFrom$1(input.get$sweepB());
      t2.normalize$0();
      t3.normalize$0();
      var tMax = $.numTypeCheck(input.get$tMax());
    case 2:
      state = 0;
      var t4 = proxyA.get$radius();
    case 3:
      state = 0;
      var t5 = proxyB.get$radius();
    case 4:
      state = 0;
      var totalRadius = $.numTypeCheck($.add(t4, t5));
    case 5:
      state = 0;
      var target = $.numTypeCheck($.Math_max(0.005, $.sub(totalRadius, 0.015)));
    case 6:
      state = 0;
      $.assert($.gt(target, 0.00125));
      t5 = this.cache;
      t5.set$count(0);
      t4 = input.get$proxyA();
      var t6 = this.distanceInput;
      t6.set$proxyA(t4);
      t6.set$proxyB(input.get$proxyB());
      t6.set$useRadii(false);
      t1 = this.xfA;
      t4 = this.xfB;
      var t7 = this.pool;
      var t8 = this.distanceOutput;
      var t9 = this.fcn;
      var t10 = this.indexes;
      var iter = 0;
      var t11 = 0;
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!true) break L0;
            t2.getTransform$2(t1, t11);
            t3.getTransform$2(t4, t11);
            t6.set$transformA(t1);
            t6.set$transformB(t4);
            t7.get$distance().distance$3(t8, t5, t6);
            var t12 = t8.get$distance();
          case 7:
            state = 0;
            if ($.leB(t12, 0)) {
              output.set$state(2);
              output.set$t(0);
              break L0;
            }
            t12 = t8.get$distance();
          case 8:
            state = 0;
            if ($.ltB(t12, $.add(target, 0.00125))) {
              output.set$state(3);
              output.set$t(t11);
              break L0;
            }
            t9.initialize$6(t5, proxyA, t2, proxyB, t3, t11);
            var t20 = tMax;
            var pushBackIter = 0;
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
          case 16:
            L1: while (true) {
              switch (state) {
                case 0:
                  var done = false;
                  if (!true) break L1;
                  var s2 = $.numTypeCheck(t9.findMinSeparation$2(t10, t20));
                case 9:
                  state = 0;
                  if ($.gtB(s2, $.add(target, 0.00125))) {
                    output.set$state(4);
                    output.set$t(tMax);
                    done = true;
                    break L1;
                  }
                  if ($.gtB(s2, $.sub(target, 0.00125))) {
                    t11 = t20;
                    done = false;
                    break L1;
                  }
                  t12 = t10.length;
                  if (0 < 0 || 0 >= t12) throw $.ioore(0);
                  var t13 = t10[0];
                  var t14 = t10.length;
                  if (1 < 0 || 1 >= t14) throw $.ioore(1);
                  var s1 = $.numTypeCheck(t9.evaluate$3(t13, t10[1], t11));
                case 10:
                  state = 0;
                  if ($.ltB(s1, $.sub(target, 0.00125))) {
                    output.set$state(1);
                    output.set$t(t11);
                    done = true;
                    break L1;
                  }
                  if ($.leB(s1, $.add(target, 0.00125))) {
                    output.set$state(3);
                    output.set$t(t11);
                    done = true;
                    break L1;
                  }
                  var a1 = t11;
                  var a2 = t20;
                  var rootIterCount = 0;
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                  L2: while (true) {
                    switch (state) {
                      case 0:
                        if (!true) break L2;
                      case 11:
                        if (state == 11 || (state == 0 && $.eqB($.and(rootIterCount, 1), 1))) {
                          switch (state) {
                            case 0:
                              var t = $.numTypeCheck($.add(a1, $.div($.mul($.sub(target, s1), $.sub(a2, a1)), $.sub(s2, s1))));
                            case 11:
                              state = 0;
                          }
                        } else {
                          t12 = $.add(a1, a2);
                          if (typeof t12 !== 'number') throw $.iae(t12);
                          t = 0.5 * t12;
                        }
                        t12 = t10.length;
                        if (0 < 0 || 0 >= t12) throw $.ioore(0);
                        t13 = t10[0];
                        t14 = t10.length;
                        if (1 < 0 || 1 >= t14) throw $.ioore(1);
                        var s = $.numTypeCheck(t9.evaluate$3(t13, t10[1], t));
                      case 12:
                        state = 0;
                        t12 = $.abs($.sub(s, target));
                      case 13:
                        state = 0;
                        if ($.ltB(t12, 0.00125)) {
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
                        rootIterCount = $.intTypeCheck($.add(rootIterCount, 1));
                      case 14:
                        state = 0;
                        t12 = $.TimeOfImpact_toiRootIters;
                      case 15:
                        state = 0;
                        $.TimeOfImpact_toiRootIters = $.add(t12, 1);
                        if ($.eqB(rootIterCount, 50)) break L2;
                    }
                  }
                  $.TimeOfImpact_toiMaxRootIters = $.Math_max($.TimeOfImpact_toiMaxRootIters, rootIterCount);
                  pushBackIter = $.intTypeCheck($.add(pushBackIter, 1));
                case 16:
                  state = 0;
                  if ($.eqB(pushBackIter, 8)) {
                    done = false;
                    break L1;
                  }
              }
            }
            iter = $.intTypeCheck($.add(iter, 1));
          case 17:
            state = 0;
            t12 = $.TimeOfImpact_toiIters;
          case 18:
            state = 0;
            $.TimeOfImpact_toiIters = $.add(t12, 1);
            if (done) break L0;
            if ($.eqB(iter, 1000)) {
              output.set$state(1);
              output.set$t(t11);
              break L0;
            }
        }
      }
      $.TimeOfImpact_toiMaxIters = $.Math_max($.TimeOfImpact_toiMaxIters, iter);
  }
 },
 get$timeOfImpact: function() { return new $.BoundClosure1(this, 'timeOfImpact$2'); },
 TimeOfImpact$_construct$1: function(argPool) {
  $.propertyTypeCheck(argPool, 'is$DefaultWorldPool');
  var t1 = this.indexes;
  var t2 = t1.length;
  if (0 < 0 || 0 >= t2) throw $.ioore(0);
  t1[0] = 0;
  var t3 = t1.length;
  if (1 < 0 || 1 >= t3) throw $.ioore(1);
  t1[1] = 0;
  $.TimeOfImpact_toiCalls = 0;
  $.TimeOfImpact_toiIters = 0;
  $.TimeOfImpact_toiMaxIters = 0;
  $.TimeOfImpact_toiRootIters = 0;
  $.TimeOfImpact_toiMaxRootIters = 0;
 }
};

$$.SeparationFunction = {"":
 ["xfb", "xfa", "temp", "axisB", "axisA", "localPointB2", "localPointB1", "normal?", "localPointA2", "localPointA1", "pointB", "pointA", "localPointB", "localPointA", "sweepB?", "sweepA?", "axis", "localPoint?", "type?", "proxyB=", "proxyA="],
 super: "Object",
 evaluate$3: function(indexA, indexB, t) {
  $.intTypeCheck(indexA);
  $.intTypeCheck(indexB);
  $.numTypeCheck(t);
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
      return $.numTypeCheck($.Vector_dot(t1.subLocal$1(t6), t4));
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
      return $.numTypeCheck($.Vector_dot(t2.subLocal$1(t1), t5));
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
      return $.numTypeCheck($.Vector_dot(t3.subLocal$1(t1), t5));
    default:
      $.assert(false);
      return 0;
  }
 },
 findMinSeparation$2: function(indexes, t) {
  $.listTypeCheck(indexes);
  $.numTypeCheck(t);
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
      return $.numTypeCheck($.Vector_dot(t6.subLocal$1(t8), t4));
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
      return $.numTypeCheck($.Vector_dot(t6.subLocal$1(t1), t5));
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
      return $.numTypeCheck($.Vector_dot(t4.subLocal$1(t1), t5));
    default:
      $.assert(false);
      $.indexSet(indexes, 0, -1);
      $.indexSet(indexes, 1, -1);
      return 0;
  }
 },
 initialize$6: function(cache, argProxyA, argSweepA, argProxyB, argSweepB, t1) {
  $.propertyTypeCheck(cache, 'is$SimplexCache');
  $.propertyTypeCheck(argProxyA, 'is$DistanceProxy');
  $.propertyTypeCheck(argSweepA, 'is$Sweep');
  $.propertyTypeCheck(argProxyB, 'is$DistanceProxy');
  $.propertyTypeCheck(argSweepB, 'is$Sweep');
  $.numTypeCheck(t1);
  this.proxyA = argProxyA;
  this.proxyB = argProxyB;
  var count = $.intTypeCheck(cache.get$count());
  $.assert($.ltB(0, count) && $.ltB(count, 3));
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
    return $.numTypeCheck(t2.normalize$0());
  }
  t1 = $.eqB($.index(cache.get$indexA(), 0), $.index(cache.get$indexA(), 1));
  t2 = this.localPoint;
  t5 = this.normal;
  var t6 = this.pointA;
  var t7 = this.pointB;
  var t8 = this.temp;
  var t9 = this.axis;
  if (t1) {
    this.type = 2;
    t1 = this.localPointB1;
    t1.setFrom$1($.index(this.proxyB.get$vertices(), $.index(cache.get$indexB(), 0)));
    var t10 = this.localPointB2;
    t10.setFrom$1($.index(this.proxyB.get$vertices(), $.index(cache.get$indexB(), 1)));
    t8.setFrom$1(t10).subLocal$1(t1);
    $.Vector_crossVectorAndNumToOut(t8, 1, t9);
    t9.normalize$0();
    $.Matrix22_mulMatrixAndVectorToOut(t4.get$rotation(), t9, t5);
    t2.setFrom$1(t1);
    t2.addLocal$1(t10);
    t2.mulLocal$1(0.5);
    $.Transform_mulToOut(t4, t2, t7);
    t2 = this.localPointA;
    t2.setFrom$1($.index(this.proxyA.get$vertices(), $.index(cache.get$indexA(), 0)));
    $.Transform_mulToOut(t3, t2, t6);
    t8.setFrom$1(t6);
    t8.subLocal$1(t7);
    var s = $.numTypeCheck($.Vector_dot(t8, t5));
    if ($.ltB(s, 0.0)) {
      t9.negateLocal$0();
      s = $.numTypeCheck($.neg(s));
    }
    return s;
  }
  this.type = 1;
  t1 = this.localPointA1;
  t1.setFrom$1($.index(this.proxyA.get$vertices(), $.index(cache.get$indexA(), 0)));
  t10 = this.localPointA2;
  t10.setFrom$1($.index(this.proxyA.get$vertices(), $.index(cache.get$indexA(), 1)));
  t8.setFrom$1(t10);
  t8.subLocal$1(t1);
  $.Vector_crossVectorAndNumToOut(t8, 1.0, t9);
  t9.normalize$0();
  $.Matrix22_mulMatrixAndVectorToOut(t3.get$rotation(), t9, t5);
  t2.setFrom$1(t1);
  t2.addLocal$1(t10);
  t2.mulLocal$1(0.5);
  $.Transform_mulToOut(t3, t2, t6);
  t2 = this.localPointB;
  t2.setFrom$1($.index(this.proxyB.get$vertices(), $.index(cache.get$indexB(), 0)));
  $.Transform_mulToOut(t4, t2, t7);
  t8.setFrom$1(t7);
  t8.subLocal$1(t6);
  s = $.numTypeCheck($.Vector_dot(t8, t5));
  if ($.ltB(s, 0.0)) {
    t9.negateLocal$0();
    s = $.numTypeCheck($.neg(s));
  }
  return s;
 }
};

$$.TimeOfImpactInput = {"":
 ["tMax=", "sweepB?", "sweepA?", "proxyB?", "proxyA?"],
 super: "Object",
 is$TimeOfImpactInput: true
};

$$.TimeOfImpactOutput = {"":
 ["t=", "state="],
 super: "Object",
 is$TimeOfImpactOutput: true
};

$$.WorldManifold = {"":
 ["pool4", "pool3", "points?", "normal?"],
 super: "Object",
 initialize$5: function(manifold, xfA, radiusA, xfB, radiusB) {
  $.propertyTypeCheck(manifold, 'is$Manifold');
  $.propertyTypeCheck(xfA, 'is$Transform');
  $.numTypeCheck(radiusA);
  $.propertyTypeCheck(xfB, 'is$Transform');
  $.numTypeCheck(radiusB);
  switch (manifold.get$type()) {
    case 0:
      var pointA = $.propertyTypeCheck(this.pool3, 'is$Vector');
      var pointB = $.propertyTypeCheck(this.pool4, 'is$Vector');
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
      var cAx = $.numTypeCheck($.add($.mul(t1.get$x(), radiusA), pointA.get$x()));
      var cAy = $.numTypeCheck($.add($.mul(t1.get$y(), radiusA), pointA.get$y()));
      var cBx = $.numTypeCheck($.add($.mul($.neg(t1.get$x()), radiusB), pointB.get$x()));
      var cBy = $.numTypeCheck($.add($.mul($.neg(t1.get$y()), radiusB), pointB.get$y()));
      var t2 = $.mul($.add(cAx, cBx), 0.5);
      var t3 = this.points;
      $.index(t3, 0).set$x(t2);
      t2 = $.mul($.add(cAy, cBy), 0.5);
      $.index(t3, 0).set$y(t2);
      return;
    case 1:
      var planePoint = $.propertyTypeCheck(this.pool3, 'is$Vector');
      t1 = $.add($.mul(xfA.get$rotation().get$col1().get$x(), manifold.get$localNormal().get$x()), $.mul(xfA.get$rotation().get$col2().get$x(), manifold.get$localNormal().get$y()));
      t2 = this.normal;
      t2.set$x(t1);
      t2.set$y($.add($.mul(xfA.get$rotation().get$col1().get$y(), manifold.get$localNormal().get$x()), $.mul(xfA.get$rotation().get$col2().get$y(), manifold.get$localNormal().get$y())));
      planePoint.set$x($.add($.add(xfA.get$position().get$x(), $.mul(xfA.get$rotation().get$col1().get$x(), manifold.get$localPoint().get$x())), $.mul(xfA.get$rotation().get$col2().get$x(), manifold.get$localPoint().get$y())));
      planePoint.set$y($.add($.add(xfA.get$position().get$y(), $.mul(xfA.get$rotation().get$col1().get$y(), manifold.get$localPoint().get$x())), $.mul(xfA.get$rotation().get$col2().get$y(), manifold.get$localPoint().get$y())));
      var clipPoint = $.propertyTypeCheck(this.pool4, 'is$Vector');
      for (t1 = this.points, i = 0; $.ltB(i, manifold.get$pointCount()); i = $.intTypeCheck($.add(i, 1))) {
        clipPoint.set$x($.add($.add(xfB.get$position().get$x(), $.mul(xfB.get$rotation().get$col1().get$x(), $.index(manifold.get$points(), i).get$localPoint().get$x())), $.mul(xfB.get$rotation().get$col2().get$x(), $.index(manifold.get$points(), i).get$localPoint().get$y())));
        clipPoint.set$y($.add($.add(xfB.get$position().get$y(), $.mul(xfB.get$rotation().get$col1().get$y(), $.index(manifold.get$points(), i).get$localPoint().get$x())), $.mul(xfB.get$rotation().get$col2().get$y(), $.index(manifold.get$points(), i).get$localPoint().get$y())));
        var scalar = $.numTypeCheck($.sub(radiusA, $.add($.mul($.sub(clipPoint.get$x(), planePoint.get$x()), t2.get$x()), $.mul($.sub(clipPoint.get$y(), planePoint.get$y()), t2.get$y()))));
        cAx = $.numTypeCheck($.add($.mul(t2.get$x(), scalar), clipPoint.get$x()));
        cAy = $.numTypeCheck($.add($.mul(t2.get$y(), scalar), clipPoint.get$y()));
        cBx = $.numTypeCheck($.add($.mul($.neg(t2.get$x()), radiusB), clipPoint.get$x()));
        cBy = $.numTypeCheck($.add($.mul($.neg(t2.get$y()), radiusB), clipPoint.get$y()));
        t3 = $.mul($.add(cAx, cBx), 0.5);
        $.index(t1, i).set$x(t3);
        t3 = $.mul($.add(cAy, cBy), 0.5);
        $.index(t1, i).set$y(t3);
      }
      return;
    case 2:
      planePoint = $.propertyTypeCheck(this.pool3, 'is$Vector');
      var R = $.propertyTypeCheck(xfB.get$rotation(), 'is$Matrix22');
      t1 = $.add($.mul(R.get$col1().get$x(), manifold.get$localNormal().get$x()), $.mul(R.get$col2().get$x(), manifold.get$localNormal().get$y()));
      t2 = this.normal;
      t2.set$x(t1);
      t2.set$y($.add($.mul(R.get$col1().get$y(), manifold.get$localNormal().get$x()), $.mul(R.get$col2().get$y(), manifold.get$localNormal().get$y())));
      var v = $.propertyTypeCheck(manifold.get$localPoint(), 'is$Vector');
      planePoint.set$x($.add($.add(xfB.get$position().get$x(), $.mul(xfB.get$rotation().get$col1().get$x(), v.get$x())), $.mul(xfB.get$rotation().get$col2().get$x(), v.get$y())));
      planePoint.set$y($.add($.add(xfB.get$position().get$y(), $.mul(xfB.get$rotation().get$col1().get$y(), v.get$x())), $.mul(xfB.get$rotation().get$col2().get$y(), v.get$y())));
      clipPoint = $.propertyTypeCheck(this.pool4, 'is$Vector');
      for (t1 = this.points, i = 0; $.ltB(i, manifold.get$pointCount()); i = $.intTypeCheck($.add(i, 1))) {
        clipPoint.set$x($.add($.add(xfA.get$position().get$x(), $.mul(xfA.get$rotation().get$col1().get$x(), $.index(manifold.get$points(), i).get$localPoint().get$x())), $.mul(xfA.get$rotation().get$col2().get$x(), $.index(manifold.get$points(), i).get$localPoint().get$y())));
        clipPoint.set$y($.add($.add(xfA.get$position().get$y(), $.mul(xfA.get$rotation().get$col1().get$y(), $.index(manifold.get$points(), i).get$localPoint().get$x())), $.mul(xfA.get$rotation().get$col2().get$y(), $.index(manifold.get$points(), i).get$localPoint().get$y())));
        scalar = $.numTypeCheck($.sub(radiusB, $.add($.mul($.sub(clipPoint.get$x(), planePoint.get$x()), t2.get$x()), $.mul($.sub(clipPoint.get$y(), planePoint.get$y()), t2.get$y()))));
        cBx = $.numTypeCheck($.add($.mul(t2.get$x(), scalar), clipPoint.get$x()));
        cBy = $.numTypeCheck($.add($.mul(t2.get$y(), scalar), clipPoint.get$y()));
        cAx = $.numTypeCheck($.add($.mul($.neg(t2.get$x()), radiusA), clipPoint.get$x()));
        cAy = $.numTypeCheck($.add($.mul($.neg(t2.get$y()), radiusA), clipPoint.get$y()));
        t3 = $.mul($.add(cAx, cBx), 0.5);
        $.index(t1, i).set$x(t3);
        t3 = $.mul($.add(cAy, cBy), 0.5);
        $.index(t1, i).set$y(t3);
      }
      t2.set$x($.neg(t2.get$x()));
      t2.set$y($.neg(t2.get$y()));
      break;
  }
  var i;
 },
 WorldManifold$0: function() {
  for (var t1 = this.points, i = 0; $.ltB(i, 2); i = $.intTypeCheck($.add(i, 1))) {
    var t2 = $.Vector$(0, 0);
    if (i !== (i | 0)) throw $.iae(i);
    var t3 = t1.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    t1[i] = t2;
  }
 }
};

$$.BroadPhase = {"":
 ["queryProxy", "_pairCount", "_pairCapacity", "_pairBuffer", "moveBuffer", "proxyCount", "_tree"],
 super: "Object",
 _bufferMove$1: function(node) {
  $.propertyTypeCheck(node, 'is$DynamicTreeNode');
  this.moveBuffer.push(node);
 },
 query$2: function(callback, box) {
  $.propertyTypeCheck(callback, 'is$TreeCallback');
  $.propertyTypeCheck(box, 'is$AxisAlignedBox');
  this._tree.query$2(callback, box);
 },
 treeCallback$1: function(proxy) {
  $.propertyTypeCheck(proxy, 'is$DynamicTreeNode');
  if ($.eqB(proxy, this.queryProxy)) return true;
  var t1 = this._pairCount;
  var t2 = this._pairCapacity;
  if (t1 === t2) {
    var oldBuffer = this._pairBuffer;
    this._pairCapacity = this._pairCapacity * 2;
    t1 = $.ListFactory_List(this._pairCapacity);
    $.setRuntimeTypeInfo(t1, ({E: 'Pair'}));
    this._pairBuffer = t1;
    for (var i = 0; $.ltB(i, oldBuffer.length); i = $.intTypeCheck($.add(i, 1))) {
      t1 = this._pairBuffer;
      if (i !== (i | 0)) throw $.iae(i);
      t2 = oldBuffer.length;
      if (i < 0 || i >= t2) throw $.ioore(i);
      var t3 = oldBuffer[i];
      var t4 = t1.length;
      if (i < 0 || i >= t4) throw $.ioore(i);
      t1[i] = t3;
    }
    for (i = oldBuffer.length; $.ltB(i, this._pairCapacity); i = $.intTypeCheck($.add(i, 1))) {
      t1 = this._pairBuffer;
      t2 = $.Pair$();
      if (i !== (i | 0)) throw $.iae(i);
      t3 = t1.length;
      if (i < 0 || i >= t3) throw $.ioore(i);
      t1[i] = t2;
    }
  }
  t1 = $.ltB(proxy.get$key(), this.queryProxy.get$key());
  t2 = this._pairBuffer;
  t3 = this._pairCount;
  if (t1) {
    if (t3 !== (t3 | 0)) throw $.iae(t3);
    t1 = t2.length;
    if (t3 < 0 || t3 >= t1) throw $.ioore(t3);
    t2[t3].set$proxyA(proxy);
    t4 = this.queryProxy;
    var t5 = this._pairBuffer;
    var t6 = this._pairCount;
    if (t6 !== (t6 | 0)) throw $.iae(t6);
    var t7 = t5.length;
    if (t6 < 0 || t6 >= t7) throw $.ioore(t6);
    t5[t6].set$proxyB(t4);
  } else {
    t1 = this.queryProxy;
    if (t3 !== (t3 | 0)) throw $.iae(t3);
    t4 = t2.length;
    if (t3 < 0 || t3 >= t4) throw $.ioore(t3);
    t2[t3].set$proxyA(t1);
    t1 = this._pairBuffer;
    t5 = this._pairCount;
    if (t5 !== (t5 | 0)) throw $.iae(t5);
    t6 = t1.length;
    if (t5 < 0 || t5 >= t6) throw $.ioore(t5);
    t1[t5].set$proxyB(proxy);
  }
  this._pairCount = this._pairCount + 1;
  return true;
 },
 treeCallback$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      var proxy = env0;
      oldBuffer = env1;
      break;
    case 2:
      i = env0;
      proxy = env1;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(proxy, 'is$DynamicTreeNode');
      if ($.eqB(proxy, this.queryProxy)) return true;
    case 1:
    case 2:
      if (state == 1 || state == 2 || (state == 0 && $.eqB(this._pairCount, this._pairCapacity))) {
        switch (state) {
          case 0:
            var oldBuffer = $.listTypeCheck(this._pairBuffer);
          case 1:
            state = 0;
            this._pairCapacity = this._pairCapacity * 2;
            var t1 = $.ListFactory_List(this._pairCapacity);
            $.setRuntimeTypeInfo(t1, ({E: 'Pair'}));
            this._pairBuffer = t1;
            for (var i = 0; $.ltB(i, $.get$length(oldBuffer)); i = $.intTypeCheck($.add(i, 1))) {
              t1 = this._pairBuffer;
              var t2 = $.index(oldBuffer, i);
              if (i !== (i | 0)) throw $.iae(i);
              var t3 = t1.length;
              if (i < 0 || i >= t3) throw $.ioore(i);
              t1[i] = t2;
            }
            i = $.intTypeCheck($.get$length(oldBuffer));
          case 2:
            state = 0;
            for (; $.ltB(i, this._pairCapacity); i = $.intTypeCheck($.add(i, 1))) {
              t1 = this._pairBuffer;
              t2 = $.Pair$();
              if (i !== (i | 0)) throw $.iae(i);
              t3 = t1.length;
              if (i < 0 || i >= t3) throw $.ioore(i);
              t1[i] = t2;
            }
        }
      }
      t1 = $.ltB(proxy.get$key(), this.queryProxy.get$key());
      t2 = this._pairBuffer;
      t3 = this._pairCount;
      if (t1) {
        if (t3 !== (t3 | 0)) throw $.iae(t3);
        t1 = t2.length;
        if (t3 < 0 || t3 >= t1) throw $.ioore(t3);
        t2[t3].set$proxyA(proxy);
        var t4 = this.queryProxy;
        var t5 = this._pairBuffer;
        var t6 = this._pairCount;
        if (t6 !== (t6 | 0)) throw $.iae(t6);
        var t7 = t5.length;
        if (t6 < 0 || t6 >= t7) throw $.ioore(t6);
        t5[t6].set$proxyB(t4);
      } else {
        t1 = this.queryProxy;
        if (t3 !== (t3 | 0)) throw $.iae(t3);
        t4 = t2.length;
        if (t3 < 0 || t3 >= t4) throw $.ioore(t3);
        t2[t3].set$proxyA(t1);
        t1 = this._pairBuffer;
        t5 = this._pairCount;
        if (t5 !== (t5 | 0)) throw $.iae(t5);
        t6 = t1.length;
        if (t5 < 0 || t5 >= t6) throw $.ioore(t5);
        t1[t5].set$proxyB(proxy);
      }
      this._pairCount = this._pairCount + 1;
      return true;
  }
 },
 updatePairs$1: function(callback) {
  $.propertyTypeCheck(callback, 'is$PairCallback');
  this._pairCount = 0;
  for (var t1 = this._tree, i = 0; $.ltB(i, this.moveBuffer.length); i = $.intTypeCheck($.add(i, 1))) {
    var t2 = this.moveBuffer;
    if (i !== (i | 0)) throw $.iae(i);
    var t3 = t2.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    this.queryProxy = t2[i];
    t2 = this.queryProxy;
    if (t2 == null) continue;
    t1.query$2(this, t2.get$box());
  }
  t2 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t2, ({E: 'DynamicTreeNode'}));
  this.moveBuffer = t2;
  var pairBuffer = $.ListFactory_List$from($.getRange(this._pairBuffer, 0, this._pairCount));
  $.sort(pairBuffer, new $.BroadPhase_updatePairs_anon());
  $.setRange$3(this._pairBuffer, 0, this._pairCount, pairBuffer);
  for (i = 0; $.ltB(i, this._pairCount); ) {
    t2 = this._pairBuffer;
    if (i !== (i | 0)) throw $.iae(i);
    t3 = t2.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    var primaryPair = $.propertyTypeCheck(t2[i], 'is$Pair');
    $.assert(!(primaryPair == null));
    t2 = primaryPair.get$proxyA();
    $.assert(!(t2 == null));
    var t4 = primaryPair.get$proxyB();
    $.assert(!(t4 == null));
    callback.addPair$2(primaryPair.get$proxyA().get$userData(), primaryPair.get$proxyB().get$userData());
    ++i;
    for (; $.ltB(i, this._pairCount); ) {
      t2 = this._pairBuffer;
      if (i !== (i | 0)) throw $.iae(i);
      t3 = t2.length;
      if (i < 0 || i >= t3) throw $.ioore(i);
      var pair = $.propertyTypeCheck(t2[i], 'is$Pair');
      t2 = pair.get$proxyA();
      t3 = primaryPair.get$proxyA();
      if (t2 == null ? t3 == null : t2 === t3) {
        t2 = pair.get$proxyB();
        t3 = primaryPair.get$proxyB();
        t4 = !(t2 == null ? t3 == null : t2 === t3);
        t2 = t4;
      } else t2 = true;
      if (t2) break;
      ++i;
    }
  }
  t1.rebalance$1(4);
 },
 updatePairs$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      i = env0;
      var callback = env1;
      t1 = env2;
      primaryPair = env3;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(callback, 'is$PairCallback');
      this._pairCount = 0;
      for (var t1 = this._tree, i = 0; $.ltB(i, this.moveBuffer.length); i = $.intTypeCheck($.add(i, 1))) {
        var t2 = this.moveBuffer;
        if (i !== (i | 0)) throw $.iae(i);
        var t3 = t2.length;
        if (i < 0 || i >= t3) throw $.ioore(i);
        this.queryProxy = t2[i];
        t2 = this.queryProxy;
        if (t2 == null) continue;
        t1.query$2(this, t2.get$box());
      }
      t2 = $.ListFactory_List(null);
      $.setRuntimeTypeInfo(t2, ({E: 'DynamicTreeNode'}));
      this.moveBuffer = t2;
      var pairBuffer = $.ListFactory_List$from($.getRange(this._pairBuffer, 0, this._pairCount));
      $.sort(pairBuffer, new $.BroadPhase_updatePairs_anon());
      $.setRange$3(this._pairBuffer, 0, this._pairCount, pairBuffer);
      i = 0;
    case 1:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, this._pairCount)) break L0;
            t2 = this._pairBuffer;
            if (i !== (i | 0)) throw $.iae(i);
            t3 = t2.length;
            if (i < 0 || i >= t3) throw $.ioore(i);
            var primaryPair = $.propertyTypeCheck(t2[i], 'is$Pair');
            $.assert(!(primaryPair == null));
            t2 = primaryPair.get$proxyA();
            $.assert(!(t2 == null));
            var t4 = primaryPair.get$proxyB();
            $.assert(!(t4 == null));
            callback.addPair$2(primaryPair.get$proxyA().get$userData(), primaryPair.get$proxyB().get$userData());
            i = $.intTypeCheck(i + 1);
          case 1:
            state = 0;
            for (; $.ltB(i, this._pairCount); ) {
              t2 = this._pairBuffer;
              if (i !== (i | 0)) throw $.iae(i);
              t3 = t2.length;
              if (i < 0 || i >= t3) throw $.ioore(i);
              var pair = $.propertyTypeCheck(t2[i], 'is$Pair');
              t2 = pair.get$proxyA();
              t3 = primaryPair.get$proxyA();
              if (t2 == null ? t3 == null : t2 === t3) {
                t2 = pair.get$proxyB();
                t3 = primaryPair.get$proxyB();
                t4 = !(t2 == null ? t3 == null : t2 === t3);
                t2 = t4;
              } else t2 = true;
              if (t2) break;
              i = $.intTypeCheck(i + 1);
            }
        }
      }
      t1.rebalance$1(4);
  }
 },
 testOverlap$2: function(proxyA, proxyB) {
  $.propertyTypeCheck(proxyA, 'is$DynamicTreeNode');
  $.propertyTypeCheck(proxyB, 'is$DynamicTreeNode');
  return $.AxisAlignedBox_testOverlap($.propertyTypeCheck(proxyA.get$box(), 'is$AxisAlignedBox'), $.propertyTypeCheck(proxyB.get$box(), 'is$AxisAlignedBox'));
 },
 moveProxy$3: function(proxy, box, displacement) {
  $.propertyTypeCheck(proxy, 'is$DynamicTreeNode');
  $.propertyTypeCheck(box, 'is$AxisAlignedBox');
  $.propertyTypeCheck(displacement, 'is$Vector');
  this._tree.moveProxy$3(proxy, box, displacement) === true && this._bufferMove$1(proxy);
 },
 createProxy$2: function(box, userData) {
  $.propertyTypeCheck(box, 'is$AxisAlignedBox');
  var node = $.propertyTypeCheck(this._tree.createProxy$2(box, userData), 'is$DynamicTreeNode');
  this.proxyCount = this.proxyCount + 1;
  this._bufferMove$1(node);
  return node;
 },
 BroadPhase$0: function() {
  var t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, ({E: 'DynamicTreeNode'}));
  this.moveBuffer = t1;
  t1 = $.ListFactory_List(this._pairCapacity);
  $.setRuntimeTypeInfo(t1, ({E: 'Pair'}));
  this._pairBuffer = t1;
  for (var i = 0; $.ltB(i, this._pairCapacity); i = $.intTypeCheck($.add(i, 1))) {
    t1 = this._pairBuffer;
    var t2 = $.Pair$();
    if (i !== (i | 0)) throw $.iae(i);
    var t3 = t1.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    t1[i] = t2;
  }
 },
 is$BroadPhase: true,
 is$TreeCallback: true
};

$$.DynamicTree = {"":
 ["deltaTwo", "deltaOne", "center?", "_tempBox", "_tempVector", "_nodeCounter", "_drawVectors", "_nodeStack", "_path", "_insertionCount", "_lastLeaf", "_nodeCount", "_root"],
 super: "Object",
 _freeNode$1: function(node) {
  $.propertyTypeCheck(node, 'is$DynamicTreeNode');
  $.assert(!(node == null));
  $.assert($.gt(this._nodeCount, 0));
  this._nodeStack.addFirst$1(node);
  this._nodeCount = this._nodeCount - 1;
 },
 rebalance$1: function(iterations) {
  $.intTypeCheck(iterations);
  var t1 = this._root;
  if (t1 == null) return;
  for (var current = null, i = 0; $.ltB(i, iterations); ++i) {
    current = $.propertyTypeCheck(this._root, 'is$DynamicTreeNode');
    for (var bit = 0; current.get$isLeaf() !== true; ) {
      t1 = this._path;
      if (t1 !== (t1 | 0)) return this.rebalance$1$bailout(1, t1, bit, i, iterations, current);
      if (typeof bit !== 'number') throw $.iae(bit);
      var goLeft = $.shr(t1, bit) & 1;
      current = $.propertyTypeCheck(goLeft === 0 ? current.get$childOne() : current.get$childTwo(), 'is$DynamicTreeNode');
      var bit0 = bit + 1 & 31;
      bit = bit0;
    }
    this._path = this._path + 1;
    this._removeLeaf$1(current);
    this._insertLeaf$1(current);
  }
 },
 rebalance$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      t1 = env0;
      bit = env1;
      i = env2;
      var iterations = env3;
      current = env4;
      break;
    case 2:
      goLeft = env0;
      bit = env1;
      i = env2;
      iterations = env3;
      current = env4;
      break;
    case 3:
      bit0 = env0;
      i = env1;
      current = env2;
      iterations = env3;
      break;
    case 4:
      current = env0;
      iterations = env1;
      i = env2;
      break;
  }
  switch (state) {
    case 0:
      $.intTypeCheck(iterations);
      var t1 = this._root;
      if (t1 == null) return;
      var current = null;
      var i = 0;
    case 1:
    case 2:
    case 3:
    case 4:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, iterations)) break L0;
            current = $.propertyTypeCheck(this._root, 'is$DynamicTreeNode');
            var bit = 0;
          case 1:
          case 2:
          case 3:
            L1: while (true) {
              switch (state) {
                case 0:
                  if (!(current.get$isLeaf() !== true)) break L1;
                  t1 = this._path;
                case 1:
                  state = 0;
                  var goLeft = $.intTypeCheck($.and($.shr(t1, bit), 1));
                case 2:
                  state = 0;
                  current = $.propertyTypeCheck($.eqB(goLeft, 0) ? current.get$childOne() : current.get$childTwo(), 'is$DynamicTreeNode');
                  var bit0 = $.intTypeCheck($.and($.add(bit, 1), 31));
                case 3:
                  state = 0;
                  bit = bit0;
              }
            }
            this._path = this._path + 1;
            this._removeLeaf$1(current);
            this._insertLeaf$1(current);
            i = $.intTypeCheck($.add(i, 1));
          case 4:
            state = 0;
        }
      }
  }
 },
 _computeHeight$1: function(node) {
  $.propertyTypeCheck(node, 'is$DynamicTreeNode');
  if (node == null) return 0;
  var t1 = $.Math_max($.intTypeCheck(this._computeHeight$1(node.get$childOne())), $.intTypeCheck(this._computeHeight$1(node.get$childTwo())));
  if (typeof t1 !== 'number') throw $.iae(t1);
  return 1 + t1;
 },
 computeHeightFromRoot$0: function() {
  return this._computeHeight$1(this._root);
 },
 _removeLeaf$1: function(argNode) {
  $.propertyTypeCheck(argNode, 'is$DynamicTreeNode');
  var t1 = this._root;
  if (argNode == null ? t1 == null : argNode === t1) {
    this._root = null;
    t1 = this._lastLeaf;
    if (t1 == null ? argNode == null : t1 === argNode) this._lastLeaf = null;
    return;
  }
  var node2 = $.propertyTypeCheck(argNode.get$parent(), 'is$DynamicTreeNode');
  var node1 = $.propertyTypeCheck(node2.get$parent(), 'is$DynamicTreeNode');
  t1 = node2.get$childOne();
  var sibling = $.propertyTypeCheck((t1 == null ? argNode == null : t1 === argNode) ? node2.get$childTwo() : node2.get$childOne(), 'is$DynamicTreeNode');
  if (!(node1 == null)) {
    t1 = node1.get$childOne();
    if (t1 == null ? node2 == null : t1 === node2) node1.set$childOne(sibling);
    else node1.set$childTwo(sibling);
    sibling.set$parent(node1);
    this._freeNode$1(node2);
    for (t1 = this._tempBox; !(node1 == null); ) {
      t1.setFrom$1(node1.get$box());
      node1.get$box().setFromCombination$2(node1.get$childOne().get$box(), node1.get$childTwo().get$box());
      if ($.contains$1(t1, node1.get$box()) === true) break;
      node1 = $.propertyTypeCheck(node1.get$parent(), 'is$DynamicTreeNode');
    }
  } else {
    this._root = sibling;
    sibling.set$parent(null);
    this._freeNode$1(node2);
  }
  t1 = this._lastLeaf;
  if (t1 == null ? argNode == null : t1 === argNode) this._lastLeaf = this._root;
 },
 _insertLeaf$1: function(node) {
  $.propertyTypeCheck(node, 'is$DynamicTreeNode');
  this._insertionCount = this._insertionCount + 1;
  var t1 = this._root;
  if (t1 == null) {
    this._root = node;
    node.set$parent(null);
    return;
  }
  t1 = this.center;
  t1.setFrom$1(node.get$box().get$center());
  var sibling = $.propertyTypeCheck(this._root, 'is$DynamicTreeNode');
  if (sibling.get$isLeaf() !== true) {
    var t2 = this.deltaOne;
    var t3 = this.deltaTwo;
    var childOne = null;
    var childTwo = null;
    do {
      childOne = $.propertyTypeCheck(sibling.get$childOne(), 'is$DynamicTreeNode');
      childTwo = $.propertyTypeCheck(sibling.get$childTwo(), 'is$DynamicTreeNode');
      t2.setFrom$1(childOne.get$box().get$center());
      t3.setFrom$1(childTwo.get$box().get$center());
      t2.subLocal$1(t1).absLocal$0();
      t3.subLocal$1(t1).absLocal$0();
      var t4 = t2.x;
      if (typeof t4 !== 'number') return this._insertLeaf$1$bailout(1, t2, t3, node, childOne, childTwo, t4, t1, 0, 0);
      var t5 = t2.y;
      if (typeof t5 !== 'number') return this._insertLeaf$1$bailout(2, t5, t3, node, t2, childOne, childTwo, t4, t1, 0);
      var normOne = t4 + t5;
      t5 = t3.x;
      if (typeof t5 !== 'number') return this._insertLeaf$1$bailout(3, t2, t3, node, normOne, t5, childOne, childTwo, t1, 0);
      t4 = t3.y;
      if (typeof t4 !== 'number') return this._insertLeaf$1$bailout(4, t2, t3, node, normOne, t5, t4, childOne, childTwo, t1);
      sibling = normOne < t5 + t4 ? childOne : childTwo;
      t4 = sibling.get$isLeaf();
      if (typeof t4 !== 'boolean') return this._insertLeaf$1$bailout(5, t2, t3, node, childOne, sibling, childTwo, t4, t1, 0);
    } while (!t4);
  }
  var node1 = $.propertyTypeCheck(sibling.get$parent(), 'is$DynamicTreeNode');
  var node2 = $.propertyTypeCheck(this._allocateNode$0(), 'is$DynamicTreeNode');
  node2.set$parent(node1);
  node2.set$userData(null);
  node2.get$box().setFromCombination$2(node.get$box(), sibling.get$box());
  if (!(node1 == null)) {
    t1 = sibling.get$parent().get$childOne();
    if (t1 == null ? sibling == null : t1 === sibling) node1.set$childOne(node2);
    else node1.set$childTwo(node2);
    node2.set$childOne(sibling);
    node2.set$childTwo(node);
    sibling.set$parent(node2);
    node.set$parent(node2);
    do {
      if ($.contains$1(node1.get$box(), node2.get$box()) === true) break;
      node1.get$box().setFromCombination$2(node1.get$childOne().get$box(), node1.get$childTwo().get$box());
      var node10 = $.propertyTypeCheck(node1.get$parent(), 'is$DynamicTreeNode');
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
      t2 = env0;
      t3 = env1;
      var node = env2;
      childOne = env3;
      childTwo = env4;
      t4 = env5;
      t1 = env6;
      break;
    case 2:
      t5 = env0;
      t3 = env1;
      node = env2;
      t2 = env3;
      childOne = env4;
      childTwo = env5;
      t4 = env6;
      t1 = env7;
      break;
    case 3:
      t2 = env0;
      t3 = env1;
      node = env2;
      normOne = env3;
      t5 = env4;
      childOne = env5;
      childTwo = env6;
      t1 = env7;
      break;
    case 4:
      t2 = env0;
      t3 = env1;
      node = env2;
      normOne = env3;
      t5 = env4;
      t4 = env5;
      childOne = env6;
      childTwo = env7;
      t1 = env8;
      break;
    case 5:
      t2 = env0;
      t3 = env1;
      node = env2;
      childOne = env3;
      sibling = env4;
      childTwo = env5;
      t4 = env6;
      t1 = env7;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(node, 'is$DynamicTreeNode');
      this._insertionCount = this._insertionCount + 1;
      var t1 = this._root;
      if (t1 == null) {
        this._root = node;
        node.set$parent(null);
        return;
      }
      t1 = this.center;
      t1.setFrom$1(node.get$box().get$center());
      var sibling = $.propertyTypeCheck(this._root, 'is$DynamicTreeNode');
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      if (state == 1 || state == 2 || state == 3 || state == 4 || state == 5 || (state == 0 && sibling.get$isLeaf() !== true)) {
        switch (state) {
          case 0:
            var t2 = this.deltaOne;
            var t3 = this.deltaTwo;
            var childOne = null;
            var childTwo = null;
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            L0: while (true) {
              switch (state) {
                case 0:
                  childOne = $.propertyTypeCheck(sibling.get$childOne(), 'is$DynamicTreeNode');
                  childTwo = $.propertyTypeCheck(sibling.get$childTwo(), 'is$DynamicTreeNode');
                  t2.setFrom$1(childOne.get$box().get$center());
                  t3.setFrom$1(childTwo.get$box().get$center());
                  t2.subLocal$1(t1).absLocal$0();
                  t3.subLocal$1(t1).absLocal$0();
                  var t4 = t2.get$x();
                case 1:
                  state = 0;
                  var t5 = t2.get$y();
                case 2:
                  state = 0;
                  var normOne = $.numTypeCheck($.add(t4, t5));
                  t5 = t3.get$x();
                case 3:
                  state = 0;
                  t4 = t3.get$y();
                case 4:
                  state = 0;
                  sibling = $.ltB(normOne, $.numTypeCheck($.add(t5, t4))) ? childOne : childTwo;
                  t4 = sibling.get$isLeaf();
                case 5:
                  state = 0;
                  if (!$.eqB(t4, false)) break L0;
              }
            }
        }
      }
      var node1 = $.propertyTypeCheck(sibling.get$parent(), 'is$DynamicTreeNode');
      var node2 = $.propertyTypeCheck(this._allocateNode$0(), 'is$DynamicTreeNode');
      node2.set$parent(node1);
      node2.set$userData(null);
      node2.get$box().setFromCombination$2(node.get$box(), sibling.get$box());
      if (!(node1 == null)) {
        t1 = sibling.get$parent().get$childOne();
        if (t1 == null ? sibling == null : t1 === sibling) node1.set$childOne(node2);
        else node1.set$childTwo(node2);
        node2.set$childOne(sibling);
        node2.set$childTwo(node);
        sibling.set$parent(node2);
        node.set$parent(node2);
        do {
          if ($.contains$1(node1.get$box(), node2.get$box()) === true) break;
          node1.get$box().setFromCombination$2(node1.get$childOne().get$box(), node1.get$childTwo().get$box());
          var node10 = $.propertyTypeCheck(node1.get$parent(), 'is$DynamicTreeNode');
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
 _query$4: function(callback, argBox, node, count) {
  $.propertyTypeCheck(callback, 'is$TreeCallback');
  $.propertyTypeCheck(argBox, 'is$AxisAlignedBox');
  $.propertyTypeCheck(node, 'is$DynamicTreeNode');
  $.intTypeCheck(count);
  if (count !== (count | 0)) return this._query$4$bailout(1, node, count, callback, argBox);
  if (node == null) return true;
  if ($.AxisAlignedBox_testOverlap(argBox, node.get$box()) === true) {
    if (node.get$isLeaf() === true) {
      if (callback.treeCallback$1(node) !== true) return false;
    } else {
      if (count < 64) {
        ++count;
        if (this._query$4(callback, argBox, node.get$childOne(), count) !== true) return false;
      }
      if (count < 64) {
        ++count;
        if (this._query$4(callback, argBox, node.get$childTwo(), count) !== true) return false;
      }
    }
  }
  return true;
 },
 _query$4$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var node = env0;
      var count = env1;
      var callback = env2;
      var argBox = env3;
      break;
    case 2:
      node = env0;
      argBox = env1;
      callback = env2;
      count = env3;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(callback, 'is$TreeCallback');
      $.propertyTypeCheck(argBox, 'is$AxisAlignedBox');
      $.propertyTypeCheck(node, 'is$DynamicTreeNode');
      $.intTypeCheck(count);
    case 1:
      state = 0;
      if (node == null) return true;
    case 2:
      if (state == 2 || (state == 0 && $.AxisAlignedBox_testOverlap(argBox, node.get$box()) === true)) {
        switch (state) {
          case 0:
          case 2:
            if ((state == 0 && node.get$isLeaf() === true)) {
              if (callback.treeCallback$1(node) !== true) return false;
            } else {
              switch (state) {
                case 0:
                case 2:
                  if (state == 2 || (state == 0 && $.ltB(count, 64))) {
                    switch (state) {
                      case 0:
                        count = $.intTypeCheck($.add(count, 1));
                      case 2:
                        state = 0;
                        if (this._query$4(callback, argBox, node.get$childOne(), count) !== true) return false;
                    }
                  }
                  if ($.ltB(count, 64)) {
                    count = $.intTypeCheck($.add(count, 1));
                    if (this._query$4(callback, argBox, node.get$childTwo(), count) !== true) return false;
                  }
              }
            }
        }
      }
      return true;
  }
 },
 query$2: function(callback, argBox) {
  this._query$4($.propertyTypeCheck(callback, 'is$TreeCallback'), $.propertyTypeCheck(argBox, 'is$AxisAlignedBox'), this._root, 1);
 },
 _allocateNode$0: function() {
  var t1 = this._nodeStack;
  if ($.isEmpty(t1) === true) {
    for (var i = 0; $.ltB(i, 6); i = $.intTypeCheck($.add(i, 1))) {
      t1.addFirst$1($.DynamicTreeNode$_construct());
    }
  }
  var node = $.propertyTypeCheck(t1.removeFirst$0(), 'is$DynamicTreeNode');
  node.set$parent(null);
  node.set$childOne(null);
  node.set$childTwo(null);
  node.set$userData(null);
  node.set$key(this._nodeCounter);
  this._nodeCounter = this._nodeCounter + 1;
  this._nodeCount = this._nodeCount + 1;
  return node;
 },
 moveProxy$3: function(argProxy, argBox, displacement) {
  $.propertyTypeCheck(argProxy, 'is$DynamicTreeNode');
  $.propertyTypeCheck(argBox, 'is$AxisAlignedBox');
  $.propertyTypeCheck(displacement, 'is$Vector');
  $.assert(!(argProxy == null));
  $.assert(argProxy.get$isLeaf());
  if ($.contains$1(argProxy.get$box(), argBox) === true) return false;
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
 createProxy$2: function(box, userData) {
  $.propertyTypeCheck(box, 'is$AxisAlignedBox');
  var proxy = $.propertyTypeCheck(this._allocateNode$0(), 'is$DynamicTreeNode');
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
  var iterationCount = $.intTypeCheck($.shr(this._nodeCount, 4));
  var height = $.intTypeCheck(this.computeHeightFromRoot$0());
  var tryCount = 0;
  while (true) {
    if (!($.gtB(height, 64) && $.ltB(tryCount, 10))) break;
    this.rebalance$1(iterationCount);
    height = $.intTypeCheck(this.computeHeightFromRoot$0());
    tryCount = $.intTypeCheck($.add(tryCount, 1));
  }
  return proxy;
 },
 DynamicTree$0: function() {
  for (var t1 = this._drawVectors, i = 0; $.ltB(i, t1.length); i = $.intTypeCheck($.add(i, 1))) {
    var t2 = $.Vector$(0, 0);
    if (i !== (i | 0)) throw $.iae(i);
    var t3 = t1.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    t1[i] = t2;
  }
 }
};

$$.DynamicTreeNode = {"":
 ["key=", "userData=", "childTwo=", "childOne=", "next=", "parent=", "box?"],
 super: "Object",
 toString$0: function() {
  return $.toString(this.box);
 },
 get$isLeaf: function() {
  var t1 = this.childOne;
  return t1 == null;
 },
 next$0: function() { return this.next.$call$0(); },
 is$DynamicTreeNode: true
};

$$.Pair = {"":
 ["proxyB=", "proxyA="],
 super: "Object",
 compareTo$1: function(pair2) {
  $.propertyTypeCheck(pair2, 'is$Pair');
  var t1 = this.proxyA;
  if (!(t1 == null)) {
    t1 = pair2.get$proxyA();
    var t2 = !(t1 == null);
    t1 = t2;
  } else t1 = false;
  $.assert(t1);
  if ($.ltB(this.proxyA.get$key(), pair2.get$proxyA().get$key())) return -1;
  if ($.eqB(this.proxyA.get$key(), pair2.get$proxyA().get$key())) {
    if ($.ltB(this.proxyB.get$key(), pair2.get$proxyB().get$key())) t1 = -1;
    else {
      t1 = $.eqB(this.proxyB.get$key(), pair2.get$proxyB().get$key()) ? 0 : 1;
    }
    return t1;
  }
  return 1;
 },
 is$Pair: true
};

$$.CircleShape = {"":
 ["position?", "radius", "type"],
 super: "Shape",
 computeMass$2: function(massData, density) {
  $.propertyTypeCheck(massData, 'is$MassData');
  massData.set$mass($.mul($.mul($.mul($.numTypeCheck(density), 3.141592653589793), this.radius), this.radius));
  var t1 = massData.get$center();
  var t2 = this.position;
  t1.setFrom$1(t2);
  t1 = massData.get$mass();
  var t3 = this.radius;
  if (typeof t3 !== 'number') throw $.iae(t3);
  t3 *= 0.5 * t3;
  t2 = $.Vector_dot(t2, t2);
  if (typeof t2 !== 'number') throw $.iae(t2);
  massData.set$inertia($.mul(t1, t3 + t2));
 },
 clone$0: function() {
  return $.CircleShape$copy(this);
 },
 computeAxisAlignedBox$2: function(argBox, argTransform) {
  $.propertyTypeCheck(argBox, 'is$AxisAlignedBox');
  $.propertyTypeCheck(argTransform, 'is$Transform');
  var p = $.Vector$(0, 0);
  $.Matrix22_mulMatrixAndVectorToOut(argTransform.get$rotation(), this.position, p);
  p.addLocal$1(argTransform.get$position());
  argBox.get$lowerBound().setCoords$2($.sub(p.x, this.radius), $.sub(p.y, this.radius));
  argBox.get$upperBound().setCoords$2($.add(p.x, this.radius), $.add(p.y, this.radius));
 },
 is$CircleShape: true
};

$$.MassData = {"":
 ["inertia=", "center?", "mass="],
 super: "Object",
 setFrom$1: function(md) {
  $.propertyTypeCheck(md, 'is$MassData');
  this.mass = md.get$mass();
  this.inertia = md.get$inertia();
  this.center.setFrom$1(md.get$center());
 },
 is$MassData: true
};

$$.PolygonShape = {"":
 ["vertexCount?", "normals?", "vertices?", "centroid?", "radius", "type"],
 super: "Shape",
 computeMass$2: function(massData, density) {
  $.propertyTypeCheck(massData, 'is$MassData');
  $.numTypeCheck(density);
  $.assert($.ge(this.vertexCount, 2));
  var t1 = this.vertexCount;
  if (t1 === 2) {
    t1 = massData.get$center();
    var t2 = this.vertices;
    var t3 = t2.length;
    if (0 < 0 || 0 >= t3) throw $.ioore(0);
    t1 = t1.setFrom$1(t2[0]);
    var t4 = t2.length;
    if (1 < 0 || 1 >= t4) throw $.ioore(1);
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
  for (t1 = this.vertices, area = 0.0, I = 0.0, i = 0; $.ltB(i, this.vertexCount); i = $.intTypeCheck($.add(i, 1))) {
    if (i !== (i | 0)) throw $.iae(i);
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    var p2 = $.propertyTypeCheck(t1[i], 'is$Vector');
    if ($.ltB(i + 1, this.vertexCount)) {
      t2 = i + 1;
      if (t2 !== (t2 | 0)) throw $.iae(t2);
      t3 = t1.length;
      if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
      var p3 = t1[t2];
    } else {
      t2 = t1.length;
      if (0 < 0 || 0 >= t2) throw $.ioore(0);
      p3 = t1[0];
    }
    $.propertyTypeCheck(p3, 'is$Vector');
    e1.setFrom$1(p2);
    e1.subLocal$1(pRef);
    e2.setFrom$1(p3);
    e2.subLocal$1(pRef);
    var D = $.numTypeCheck($.Vector_crossVectors(e1, e2));
    if (typeof D !== 'number') throw $.iae(D);
    var triangleArea = 0.5 * D;
    area = $.numTypeCheck($.add(area, triangleArea));
    t2 = center.x;
    t3 = triangleArea * 0.3333333333333333;
    t4 = $.add($.add(pRef.x, p2.get$x()), p3.get$x());
    if (typeof t4 !== 'number') throw $.iae(t4);
    center.x = $.add(t2, t3 * t4);
    var t5 = center.y;
    var t6 = $.add($.add(pRef.y, p2.get$y()), p3.get$y());
    if (typeof t6 !== 'number') throw $.iae(t6);
    center.y = $.add(t5, t3 * t6);
    var px = $.numTypeCheck(pRef.x);
    var py = $.numTypeCheck(pRef.y);
    var ex1 = $.numTypeCheck(e1.x);
    var ey1 = $.numTypeCheck(e1.y);
    var ex2 = $.numTypeCheck(e2.x);
    var ey2 = $.numTypeCheck(e2.y);
    var t7 = $.add($.add($.mul(ex1, ex1), $.mul(ex2, ex1)), $.mul(ex2, ex2));
    if (typeof t7 !== 'number') throw $.iae(t7);
    t7 *= 0.25;
    var t8 = $.add($.mul(px, ex1), $.mul(px, ex2));
    if (typeof t8 !== 'number') throw $.iae(t8);
    var t9 = 0.3333333333333333 * (t7 + t8);
    if (typeof px !== 'number') throw $.iae(px);
    var intx2 = t9 + 0.5 * px * px;
    t9 = $.add($.add($.mul(ey1, ey1), $.mul(ey2, ey1)), $.mul(ey2, ey2));
    if (typeof t9 !== 'number') throw $.iae(t9);
    t9 *= 0.25;
    var t10 = $.add($.mul(py, ey1), $.mul(py, ey2));
    if (typeof t10 !== 'number') throw $.iae(t10);
    var t11 = 0.3333333333333333 * (t9 + t10);
    if (typeof py !== 'number') throw $.iae(py);
    var t12 = intx2 + (t11 + 0.5 * py * py);
    if (typeof t12 !== 'number') throw $.iae(t12);
    I = $.numTypeCheck($.add(I, D * t12));
  }
  massData.set$mass($.mul(density, area));
  $.assert($.gt(area, 1.192e-7));
  if (typeof area !== 'number') throw $.iae(area);
  center.mulLocal$1(1.0 / area);
  massData.get$center().setFrom$1(center);
  massData.set$inertia($.mul(I, density));
  var area, I, i;
 },
 computeAxisAlignedBox$2: function(argAabb, argXf) {
  $.propertyTypeCheck(argAabb, 'is$AxisAlignedBox');
  $.propertyTypeCheck(argXf, 'is$Transform');
  var lower = $.Vector$(0, 0);
  var upper = $.Vector$(0, 0);
  var v = $.Vector$(0, 0);
  var t1 = this.vertices;
  var t2 = t1.length;
  if (0 < 0 || 0 >= t2) throw $.ioore(0);
  $.Transform_mulToOut(argXf, t1[0], lower);
  upper.setFrom$1(lower);
  for (var i = 1; $.ltB(i, this.vertexCount); i = $.intTypeCheck($.add(i, 1))) {
    if (i !== (i | 0)) throw $.iae(i);
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
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
 setAsEdge$2: function(v1, v2) {
  $.propertyTypeCheck(v1, 'is$Vector');
  $.propertyTypeCheck(v2, 'is$Vector');
  this.vertexCount = 2;
  var t1 = this.vertices;
  var t2 = t1.length;
  if (0 < 0 || 0 >= t2) throw $.ioore(0);
  t1[0].setFrom$1(v1);
  var t3 = t1.length;
  if (1 < 0 || 1 >= t3) throw $.ioore(1);
  t1[1].setFrom$1(v2);
  this.centroid.setFrom$1(v1).addLocal$1(v2).mulLocal$1(0.5);
  var t4 = this.normals;
  var t5 = t4.length;
  if (0 < 0 || 0 >= t5) throw $.ioore(0);
  t4[0].setFrom$1(v2).subLocal$1(v1);
  var t6 = t4.length;
  if (0 < 0 || 0 >= t6) throw $.ioore(0);
  var t7 = t4[0];
  var t8 = t4.length;
  if (0 < 0 || 0 >= t8) throw $.ioore(0);
  $.Vector_crossVectorAndNumToOut(t7, 1, t4[0]);
  t7 = t4.length;
  if (0 < 0 || 0 >= t7) throw $.ioore(0);
  t4[0].normalize$0();
  var t9 = t4.length;
  if (1 < 0 || 1 >= t9) throw $.ioore(1);
  var t10 = t4[1];
  var t11 = t4.length;
  if (0 < 0 || 0 >= t11) throw $.ioore(0);
  t10.setFrom$1(t4[0]).negateLocal$0();
 },
 setAsBox$2: function(hx, hy) {
  $.numTypeCheck(hx);
  if (typeof hx !== 'number') return this.setAsBox$2$bailout(1, hy, hx);
  $.numTypeCheck(hy);
  if (typeof hy !== 'number') return this.setAsBox$2$bailout(2, hx, hy);
  this.vertexCount = 4;
  var t1 = this.vertices;
  var t2 = t1.length;
  if (0 >= t2) throw $.ioore(0);
  var t3 = t1[0];
  var t4 = -hx;
  var t5 = -hy;
  t3.setCoords$2(t4, t5);
  t3 = t1.length;
  if (1 >= t3) throw $.ioore(1);
  t1[1].setCoords$2(hx, t5);
  t5 = t1.length;
  if (2 >= t5) throw $.ioore(2);
  t1[2].setCoords$2(hx, hy);
  var t6 = t1.length;
  if (3 >= t6) throw $.ioore(3);
  t1[3].setCoords$2(t4, hy);
  t4 = this.normals;
  var t7 = t4.length;
  if (0 >= t7) throw $.ioore(0);
  t4[0].setCoords$2(0.0, -1.0);
  var t8 = t4.length;
  if (1 >= t8) throw $.ioore(1);
  t4[1].setCoords$2(1.0, 0.0);
  var t9 = t4.length;
  if (2 >= t9) throw $.ioore(2);
  t4[2].setCoords$2(0.0, 1.0);
  var t10 = t4.length;
  if (3 >= t10) throw $.ioore(3);
  t4[3].setCoords$2(-1.0, 0.0);
  this.centroid.setZero$0();
 },
 setAsBox$2$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      var hy = env0;
      var hx = env1;
      break;
    case 2:
      hx = env0;
      hy = env1;
      break;
  }
  switch (state) {
    case 0:
      $.numTypeCheck(hx);
    case 1:
      state = 0;
      $.numTypeCheck(hy);
    case 2:
      state = 0;
      this.vertexCount = 4;
      var t1 = this.vertices;
      var t2 = t1.length;
      if (0 < 0 || 0 >= t2) throw $.ioore(0);
      t1[0].setCoords$2($.neg(hx), $.neg(hy));
      var t3 = t1.length;
      if (1 < 0 || 1 >= t3) throw $.ioore(1);
      t1[1].setCoords$2(hx, $.neg(hy));
      var t4 = t1.length;
      if (2 < 0 || 2 >= t4) throw $.ioore(2);
      t1[2].setCoords$2(hx, hy);
      var t5 = t1.length;
      if (3 < 0 || 3 >= t5) throw $.ioore(3);
      t1[3].setCoords$2($.neg(hx), hy);
      var t6 = this.normals;
      var t7 = t6.length;
      if (0 < 0 || 0 >= t7) throw $.ioore(0);
      t6[0].setCoords$2(0.0, -1.0);
      var t8 = t6.length;
      if (1 < 0 || 1 >= t8) throw $.ioore(1);
      t6[1].setCoords$2(1.0, 0.0);
      var t9 = t6.length;
      if (2 < 0 || 2 >= t9) throw $.ioore(2);
      t6[2].setCoords$2(0.0, 1.0);
      var t10 = t6.length;
      if (3 < 0 || 3 >= t10) throw $.ioore(3);
      t6[3].setCoords$2(-1.0, 0.0);
      this.centroid.setZero$0();
  }
 },
 clone$0: function() {
  return $.PolygonShape$copy(this);
 },
 getSupport$1: function(d) {
  $.propertyTypeCheck(d, 'is$Vector');
  var t1 = this.vertices;
  var t2 = t1.length;
  if (0 >= t2) throw $.ioore(0);
  var bestValue = $.numTypeCheck($.Vector_dot(t1[0], d));
  for (var i = 1, bestIndex = 0; i < this.vertexCount; ++i) {
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    var value = $.numTypeCheck($.Vector_dot(t1[i], d));
    if ($.gtB(value, bestValue)) {
      bestIndex = i;
      bestValue = value;
    }
  }
  return bestIndex;
 },
 getSupport$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      t1 = env0;
      i = env1;
      var d = env2;
      bestValue = env3;
      bestIndex = env4;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(d, 'is$Vector');
      var t1 = this.vertices;
      var t2 = t1.length;
      if (0 < 0 || 0 >= t2) throw $.ioore(0);
      var bestValue = $.numTypeCheck($.Vector_dot(t1[0], d));
      var i = 1;
      var bestIndex = 0;
    case 1:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, this.vertexCount)) break L0;
            if (i !== (i | 0)) throw $.iae(i);
            t2 = t1.length;
            if (i < 0 || i >= t2) throw $.ioore(i);
            var value = $.numTypeCheck($.Vector_dot(t1[i], d));
            if ($.gtB(value, bestValue)) {
              bestIndex = i;
              bestValue = value;
            }
            i = $.intTypeCheck($.add(i, 1));
          case 1:
            state = 0;
        }
      }
      return bestIndex;
  }
 },
 PolygonShape$copy$1: function(other) {
  $.propertyTypeCheck(other, 'is$PolygonShape');
  for (var t1 = this.vertices, i = 0; $.ltB(i, $.get$length(other.get$vertices())); i = $.intTypeCheck($.add(i, 1))) {
    var t2 = $.Vector$copy($.index(other.get$vertices(), i));
    if (i !== (i | 0)) throw $.iae(i);
    var t3 = t1.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    t1[i] = t2;
  }
  for (t1 = this.normals, i = 0; $.ltB(i, $.get$length(other.get$normals())); i = $.intTypeCheck($.add(i, 1))) {
    t2 = $.Vector$copy($.index(other.get$normals(), i));
    if (i !== (i | 0)) throw $.iae(i);
    t3 = t1.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    t1[i] = t2;
  }
 },
 PolygonShape$0: function() {
  for (var t1 = this.vertices, i = 0; $.ltB(i, t1.length); i = $.intTypeCheck($.add(i, 1))) {
    var t2 = $.Vector$(0, 0);
    if (i !== (i | 0)) throw $.iae(i);
    var t3 = t1.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    t1[i] = t2;
  }
  for (t1 = this.normals, i = 0; $.ltB(i, t1.length); i = $.intTypeCheck($.add(i, 1))) {
    t2 = $.Vector$(0, 0);
    if (i !== (i | 0)) throw $.iae(i);
    t3 = t1.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    t1[i] = t2;
  }
 },
 is$PolygonShape: true
};

$$.Shape = {"":
 ["radius?", "type?"],
 super: "Object",
 is$Shape: true
};

$$.ContactFilter = {"":
 [],
 super: "Object",
 shouldCollide$2: function(fixtureA, fixtureB) {
  $.propertyTypeCheck(fixtureA, 'is$Fixture');
  $.propertyTypeCheck(fixtureB, 'is$Fixture');
  var filterA = $.propertyTypeCheck(fixtureA.get$filter(), 'is$Filter');
  var filterB = $.propertyTypeCheck(fixtureB.get$filter(), 'is$Filter');
  var t1 = filterA.get$groupIndex();
  if (typeof t1 !== 'number') return this.shouldCollide$2$bailout(1, filterB, t1, filterA, 0);
  if (!(t1 === 0) && $.eqB(filterA.get$groupIndex(), filterB.get$groupIndex())) {
    t1 = filterA.get$groupIndex();
    if (typeof t1 !== 'number') return this.shouldCollide$2$bailout(2, t1, 0, 0, 0);
    return t1 > 0;
  }
  t1 = filterA.get$maskBits();
  if (t1 !== (t1 | 0)) return this.shouldCollide$2$bailout(3, filterB, t1, filterA, 0);
  var t2 = filterB.get$categoryBits();
  if (t2 !== (t2 | 0)) return this.shouldCollide$2$bailout(4, filterA, filterB, t1, t2);
  t2 = (t1 & t2) >>> 0;
  if (!(t2 === 0)) {
    t1 = filterA.get$categoryBits();
    if (t1 !== (t1 | 0)) return this.shouldCollide$2$bailout(5, t1, filterB, 0, 0);
    t2 = filterB.get$maskBits();
    if (t2 !== (t2 | 0)) return this.shouldCollide$2$bailout(6, t1, t2, 0, 0);
    t2 = (t1 & t2) >>> 0;
    t1 = !(t2 === 0);
  } else t1 = false;
  return t1;
 },
 shouldCollide$2$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      filterB = env0;
      t1 = env1;
      filterA = env2;
      break;
    case 2:
      t1 = env0;
      break;
    case 3:
      filterB = env0;
      t1 = env1;
      filterA = env2;
      break;
    case 4:
      filterA = env0;
      filterB = env1;
      t1 = env2;
      t2 = env3;
      break;
    case 5:
      t1 = env0;
      filterB = env1;
      break;
    case 6:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(fixtureA, 'is$Fixture');
      $.propertyTypeCheck(fixtureB, 'is$Fixture');
      var filterA = $.propertyTypeCheck(fixtureA.get$filter(), 'is$Filter');
      var filterB = $.propertyTypeCheck(fixtureB.get$filter(), 'is$Filter');
      var t1 = filterA.get$groupIndex();
    case 1:
      state = 0;
    case 2:
      if (state == 2 || (state == 0 && (!$.eqB(t1, 0) && $.eqB(filterA.get$groupIndex(), filterB.get$groupIndex())))) {
        switch (state) {
          case 0:
            t1 = filterA.get$groupIndex();
          case 2:
            state = 0;
            return $.gt(t1, 0);
        }
      }
      t1 = filterA.get$maskBits();
    case 3:
      state = 0;
      var t2 = filterB.get$categoryBits();
    case 4:
      state = 0;
    case 5:
    case 6:
      if (state == 5 || state == 6 || (state == 0 && !$.eqB($.and(t1, t2), 0))) {
        switch (state) {
          case 0:
            t1 = filterA.get$categoryBits();
          case 5:
            state = 0;
            t2 = filterB.get$maskBits();
          case 6:
            state = 0;
            var t3 = !$.eqB($.and(t1, t2), 0);
            t1 = t3;
        }
      } else {
        t1 = false;
      }
      return t1;
  }
 }
};

$$.ContactImpulse = {"":
 ["tangentImpulses?", "normalImpulses?"],
 super: "Object"
};

$$.Body = {"":
 ["tempCenter", "oldCenter", "_pxf", "_pmd", "_fixDef", "sweep?", "originTransform?", "islandIndex!", "_type?", "angularDamping?", "linearDamping?", "invInertia?", "_inertia", "_torque=", "_force?", "jointList=", "fixtureCount", "fixtureList", "prev=", "next=", "invMass?", "mass?", "_angularVelocity", "_linearVelocity", "userData?", "sleepTime=", "contactList=", "flags=", "world"],
 super: "Object",
 advance$1: function(t) {
  $.numTypeCheck(t);
  var t1 = this.sweep;
  t1.advance$1(t);
  t1.get$center().setFrom$1(t1.get$centerZero());
  t1.set$angle(t1.get$angleZero());
  this.synchronizeTransform$0();
 },
 shouldCollide$1: function(other) {
  $.propertyTypeCheck(other, 'is$Body');
  return !(!$.eqB(this._type, 2) && !$.eqB(other.get$_type(), 2));
 },
 synchronizeTransform$0: function() {
  var t1 = this.sweep;
  var c = $.numTypeCheck($.Math_cos(t1.angle));
  var s = $.numTypeCheck($.Math_sin(t1.angle));
  if (typeof s !== 'number') return this.synchronizeTransform$0$bailout(1, s, t1, c, 0, 0, 0);
  var t = this.originTransform;
  var r = $.propertyTypeCheck(t.rotation, 'is$Matrix22');
  var p = $.propertyTypeCheck(t.position, 'is$Vector');
  r.get$col1().set$x(c);
  var t2 = -s;
  r.get$col2().set$x(t2);
  r.get$col1().set$y(s);
  r.get$col2().set$y(c);
  t2 = r.get$col1().get$x();
  if (typeof t2 !== 'number') return this.synchronizeTransform$0$bailout(2, p, t1, t2, r, 0, 0);
  var t3 = t1.localCenter;
  var t4 = t3.get$x();
  if (typeof t4 !== 'number') return this.synchronizeTransform$0$bailout(3, t4, p, t1, t2, r, 0);
  t4 *= t2;
  t2 = r.get$col2().get$x();
  if (typeof t2 !== 'number') return this.synchronizeTransform$0$bailout(4, p, t4, t1, t2, r, 0);
  var t5 = t3.get$y();
  if (typeof t5 !== 'number') return this.synchronizeTransform$0$bailout(5, p, t4, t1, t2, t5, r);
  var t6 = (t4 + t2 * t5) * -1;
  var t7 = t1.center;
  var t8 = t7.get$x();
  if (typeof t8 !== 'number') return this.synchronizeTransform$0$bailout(6, p, t6, t1, t8, r, 0);
  p.set$x(t6 + t8);
  var t9 = r.get$col1().get$y();
  if (typeof t9 !== 'number') return this.synchronizeTransform$0$bailout(7, p, t9, t1, r, 0, 0);
  var t10 = t3.get$x();
  if (typeof t10 !== 'number') return this.synchronizeTransform$0$bailout(8, p, t9, t1, t10, r, 0);
  t10 *= t9;
  t9 = r.get$col2().get$y();
  if (typeof t9 !== 'number') return this.synchronizeTransform$0$bailout(9, t9, p, t1, t10, 0, 0);
  t3 = t3.get$y();
  if (typeof t3 !== 'number') return this.synchronizeTransform$0$bailout(10, t9, p, t3, t1, t10, 0);
  var t11 = (t10 + t9 * t3) * -1;
  t7 = t7.get$y();
  if (typeof t7 !== 'number') return this.synchronizeTransform$0$bailout(11, p, t11, t7, 0, 0, 0);
  p.set$y(t11 + t7);
 },
 synchronizeTransform$0$bailout: function(state, env0, env1, env2, env3, env4, env5) {
  switch (state) {
    case 1:
      s = env0;
      t1 = env1;
      c = env2;
      break;
    case 2:
      p = env0;
      t1 = env1;
      t2 = env2;
      r = env3;
      break;
    case 3:
      t3 = env0;
      p = env1;
      t1 = env2;
      t2 = env3;
      r = env4;
      break;
    case 4:
      p = env0;
      t3 = env1;
      t1 = env2;
      t2 = env3;
      r = env4;
      break;
    case 5:
      p = env0;
      t3 = env1;
      t1 = env2;
      t2 = env3;
      t4 = env4;
      r = env5;
      break;
    case 6:
      p = env0;
      t5 = env1;
      t1 = env2;
      t6 = env3;
      r = env4;
      break;
    case 7:
      p = env0;
      t7 = env1;
      t1 = env2;
      r = env3;
      break;
    case 8:
      p = env0;
      t7 = env1;
      t1 = env2;
      t8 = env3;
      r = env4;
      break;
    case 9:
      t7 = env0;
      p = env1;
      t1 = env2;
      t8 = env3;
      break;
    case 10:
      t7 = env0;
      p = env1;
      t9 = env2;
      t1 = env3;
      t8 = env4;
      break;
    case 11:
      p = env0;
      t10 = env1;
      t11 = env2;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.sweep;
      var c = $.numTypeCheck($.Math_cos(t1.get$angle()));
      var s = $.numTypeCheck($.Math_sin(t1.get$angle()));
    case 1:
      state = 0;
      var t = $.propertyTypeCheck(this.originTransform, 'is$Transform');
      var r = $.propertyTypeCheck(t.get$rotation(), 'is$Matrix22');
      var p = $.propertyTypeCheck(t.get$position(), 'is$Vector');
      r.get$col1().set$x(c);
      var t2 = $.neg(s);
      r.get$col2().set$x(t2);
      r.get$col1().set$y(s);
      r.get$col2().set$y(c);
      t2 = r.get$col1().get$x();
    case 2:
      state = 0;
      var t3 = t1.get$localCenter().get$x();
    case 3:
      state = 0;
      t3 = $.mul(t2, t3);
      t2 = r.get$col2().get$x();
    case 4:
      state = 0;
      var t4 = t1.get$localCenter().get$y();
    case 5:
      state = 0;
      var t5 = $.mul($.add(t3, $.mul(t2, t4)), -1);
      var t6 = t1.get$center().get$x();
    case 6:
      state = 0;
      p.set$x($.add(t5, t6));
      var t7 = r.get$col1().get$y();
    case 7:
      state = 0;
      var t8 = t1.get$localCenter().get$x();
    case 8:
      state = 0;
      t8 = $.mul(t7, t8);
      t7 = r.get$col2().get$y();
    case 9:
      state = 0;
      var t9 = t1.get$localCenter().get$y();
    case 10:
      state = 0;
      var t10 = $.mul($.add(t8, $.mul(t7, t9)), -1);
      var t11 = t1.get$center().get$y();
    case 11:
      state = 0;
      p.set$y($.add(t10, t11));
  }
 },
 synchronizeFixtures$0: function() {
  var xf1 = $.propertyTypeCheck(this._pxf, 'is$Transform');
  var t1 = xf1.get$rotation();
  var t2 = this.sweep;
  t1.setAngle$1(t2.get$angleZero());
  $.Matrix22_mulMatrixAndVectorToOut(xf1.get$rotation(), t2.get$localCenter(), xf1.get$position());
  xf1.get$position().mulLocal$1(-1);
  xf1.get$position().addLocal$1(t2.get$centerZero());
  var broadPhase = $.propertyTypeCheck(this.world.get$_contactManager().get$broadPhase(), 'is$BroadPhase');
  for (var f = $.propertyTypeCheck(this.fixtureList, 'is$Fixture'), t1 = this.originTransform; !(f == null); f = $.propertyTypeCheck(f.get$next(), 'is$Fixture')) {
    f.synchronize$3(broadPhase, xf1, t1);
  }
 },
 get$active: function() {
  var t1 = this.flags;
  if (t1 !== (t1 | 0)) return this.get$active$bailout(1, t1);
  t1 = t1 & 32;
  return t1 === 32;
 },
 get$active$bailout: function(state, t1) {
  return $.eq($.and(t1, 32), 32);
 },
 get$awake: function() {
  var t1 = this.flags;
  if (t1 !== (t1 | 0)) return this.get$awake$bailout(1, t1);
  t1 = t1 & 2;
  return t1 === 2;
 },
 get$awake$bailout: function(state, t1) {
  return $.eq($.and(t1, 2), 2);
 },
 set$awake: function(flag) {
  if ($.boolTypeCheck(flag) === true) {
    var t1 = this.flags;
    if (t1 !== (t1 | 0)) return this.set$awake$bailout(1, t1);
    var t2 = t1 & 2;
    if (t2 === 0) {
      this.flags = (t1 | 2) >>> 0;
      this.sleepTime = 0.0;
    }
  } else {
    t1 = this.flags;
    if (t1 !== (t1 | 0)) return this.set$awake$bailout(3, t1);
    this.flags = (t1 & -3) >>> 0;
    this.sleepTime = 0.0;
    this._linearVelocity.setZero$0();
    this._angularVelocity = 0.0;
    this._force.setZero$0();
    this._torque = 0.0;
  }
 },
 set$awake$bailout: function(state, env0) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      break;
    case 3:
      t1 = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
    case 2:
    case 3:
      if (state == 1 || state == 2 || (state == 0 && $.boolTypeCheck(flag) === true)) {
        switch (state) {
          case 0:
            var t1 = this.flags;
          case 1:
            state = 0;
          case 2:
            if (state == 2 || (state == 0 && $.eqB($.and(t1, 2), 0))) {
              switch (state) {
                case 0:
                  t1 = this.flags;
                case 2:
                  state = 0;
                  this.flags = $.or(t1, 2);
                  this.sleepTime = 0.0;
              }
            }
        }
      } else {
        switch (state) {
          case 0:
            t1 = this.flags;
          case 3:
            state = 0;
            this.flags = $.and(t1, -3);
            this.sleepTime = 0.0;
            this._linearVelocity.setZero$0();
            this._angularVelocity = 0.0;
            this._force.setZero$0();
            this._torque = 0.0;
        }
      }
  }
 },
 set$bullet: function(flag) {
  var t1 = $.boolTypeCheck(flag) === true;
  var t2 = this.flags;
  if (t2 !== (t2 | 0)) return this.set$bullet$bailout(1, t1, t2);
  if (t1) this.flags = (t2 | 8) >>> 0;
  else this.flags = (t2 & -9) >>> 0;
 },
 set$bullet$bailout: function(state, t1, t2) {
  if (t1) this.flags = $.or(t2, 8);
  else this.flags = $.and(t2, -9);
 },
 get$bullet: function() {
  var t1 = this.flags;
  if (t1 !== (t1 | 0)) return this.get$bullet$bailout(1, t1);
  t1 = t1 & 8;
  return t1 === 8;
 },
 get$bullet$bailout: function(state, t1) {
  return $.eq($.and(t1, 8), 8);
 },
 get$type: function() {
  return this._type;
 },
 getLocalPoint$1: function(worldPoint) {
  $.propertyTypeCheck(worldPoint, 'is$Vector');
  var out = $.Vector$(0, 0);
  this.getLocalPointToOut$2(worldPoint, out);
  return out;
 },
 getLocalPointToOut$2: function(worldPoint, out) {
  $.propertyTypeCheck(worldPoint, 'is$Vector');
  $.propertyTypeCheck(out, 'is$Vector');
  $.Transform_mulTransToOut(this.originTransform, worldPoint, out);
 },
 getWorldVectorToOut$2: function(localVector, out) {
  $.propertyTypeCheck(localVector, 'is$Vector');
  $.propertyTypeCheck(out, 'is$Vector');
  $.Matrix22_mulMatrixAndVectorToOut(this.originTransform.get$rotation(), localVector, out);
 },
 getWorldVector$1: function(localVector) {
  $.propertyTypeCheck(localVector, 'is$Vector');
  var out = $.Vector$(0, 0);
  this.getWorldVectorToOut$2(localVector, out);
  return out;
 },
 getWorldPointToOut$2: function(localPoint, out) {
  $.propertyTypeCheck(localPoint, 'is$Vector');
  $.propertyTypeCheck(out, 'is$Vector');
  $.Transform_mulToOut(this.originTransform, localPoint, out);
 },
 getWorldPoint$1: function(localPoint) {
  $.propertyTypeCheck(localPoint, 'is$Vector');
  var v = $.Vector$(0, 0);
  this.getWorldPointToOut$2(localPoint, v);
  return v;
 },
 resetMassData$0: function() {
  this.mass = 0.0;
  this.invMass = 0.0;
  this._inertia = 0.0;
  this.invInertia = 0.0;
  var t1 = this.sweep;
  var t2 = t1.localCenter;
  t2.setZero$0();
  var t3 = this._type;
  if (typeof t3 !== 'number') return this.resetMassData$0$bailout(1, t1, t3, 0, 0, 0, 0);
  if (t3 === 0 || t3 === 1) {
    t2 = t1.center;
    t3 = this.originTransform.position;
    t2.setFrom$1(t3);
    t1.centerZero.setFrom$1(t3);
    return;
  }
  $.assert(t3 === 2);
  var t4 = this.tempCenter;
  t4.setZero$0();
  var massData = this._pmd;
  for (var f = $.propertyTypeCheck(this.fixtureList, 'is$Fixture'), t3 = massData.center; !(f == null); f = $.propertyTypeCheck(f.get$next(), 'is$Fixture')) {
    var t5 = f.get$density();
    if (typeof t5 !== 'number') return this.resetMassData$0$bailout(2, t1, f, massData, t4, t5, 0);
    if (t5 === 0.0) continue;
    f.getMassData$1(massData);
    t5 = this.mass;
    if (typeof t5 !== 'number') return this.resetMassData$0$bailout(3, t5, f, massData, t4, t1, 0);
    var t6 = massData.mass;
    if (typeof t6 !== 'number') return this.resetMassData$0$bailout(4, t5, massData, t1, f, t4, t6);
    this.mass = t5 + t6;
    var temp = $.Vector$copy(t3);
    temp.mulLocal$1(massData.mass);
    t4.addLocal$1(temp);
    var t7 = this._inertia;
    if (typeof t7 !== 'number') return this.resetMassData$0$bailout(5, f, t7, massData, t4, t1, 0);
    var t8 = massData.inertia;
    if (typeof t8 !== 'number') return this.resetMassData$0$bailout(6, t7, massData, t1, f, t8, t4);
    this._inertia = t7 + t8;
  }
  t3 = this.mass;
  if (typeof t3 !== 'number') return this.resetMassData$0$bailout(7, t4, t3, t1, 0, 0, 0);
  if (t3 > 0.0) {
    if (typeof t3 !== 'number') throw $.iae(t3);
    this.invMass = 1.0 / t3;
    t4.mulLocal$1(this.invMass);
  } else {
    this.mass = 1.0;
    this.invMass = 1.0;
  }
  t3 = this._inertia;
  if (typeof t3 !== 'number') return this.resetMassData$0$bailout(8, t3, t1, t4, 0, 0, 0);
  if (t3 > 0.0) {
    t5 = this.flags;
    if (t5 !== (t5 | 0)) return this.resetMassData$0$bailout(9, t4, t5, t1, 0, 0, 0);
    t5 = t5 & 16;
    t5 = t5 === 0;
  } else t5 = false;
  if (t5) {
    t5 = this.mass;
    if (typeof t5 !== 'number') return this.resetMassData$0$bailout(11, t5, t3, t1, t4, 0, 0);
    t6 = $.Vector_dot(t4, t4);
    if (typeof t6 !== 'number') return this.resetMassData$0$bailout(12, t5, t3, t6, t1, t4, 0);
    this._inertia = t3 - t5 * t6;
    t7 = this._inertia;
    if (typeof t7 !== 'number') return this.resetMassData$0$bailout(13, t7, t1, t4, 0, 0, 0);
    $.assert(t7 > 0.0);
    t8 = this._inertia;
    if (typeof t8 !== 'number') throw $.iae(t8);
    this.invInertia = 1.0 / t8;
  } else {
    this._inertia = 0.0;
    this.invInertia = 0.0;
  }
  t3 = this.oldCenter;
  t5 = t1.center;
  t3.setFrom$1(t5);
  t2.setFrom$1(t4);
  t4 = this.originTransform;
  t1 = t1.centerZero;
  $.Transform_mulToOut(t4, t2, t1);
  t5.setFrom$1(t1);
  temp = $.Vector$copy(t5);
  temp.subLocal$1(t3);
  $.Vector_crossNumAndVectorToOut(this._angularVelocity, temp, temp);
  this._linearVelocity.addLocal$1(temp);
 },
 resetMassData$0$bailout: function(state, env0, env1, env2, env3, env4, env5) {
  switch (state) {
    case 1:
      t1 = env0;
      t2 = env1;
      break;
    case 2:
      t1 = env0;
      f = env1;
      massData = env2;
      t3 = env3;
      t2 = env4;
      break;
    case 3:
      t2 = env0;
      f = env1;
      massData = env2;
      t3 = env3;
      t1 = env4;
      break;
    case 4:
      t2 = env0;
      massData = env1;
      t1 = env2;
      f = env3;
      t3 = env4;
      t4 = env5;
      break;
    case 5:
      f = env0;
      t5 = env1;
      massData = env2;
      t3 = env3;
      t1 = env4;
      break;
    case 6:
      t5 = env0;
      massData = env1;
      t1 = env2;
      f = env3;
      t6 = env4;
      t3 = env5;
      break;
    case 7:
      t3 = env0;
      t2 = env1;
      t1 = env2;
      break;
    case 8:
      t2 = env0;
      t1 = env1;
      t3 = env2;
      break;
    case 9:
      t3 = env0;
      t2 = env1;
      t1 = env2;
      break;
    case 10:
      t2 = env0;
      t1 = env1;
      t3 = env2;
      break;
    case 11:
      t4 = env0;
      t2 = env1;
      t1 = env2;
      t3 = env3;
      break;
    case 12:
      t4 = env0;
      t2 = env1;
      t5 = env2;
      t1 = env3;
      t3 = env4;
      break;
    case 13:
      t6 = env0;
      t1 = env1;
      t3 = env2;
      break;
  }
  switch (state) {
    case 0:
      this.mass = 0.0;
      this.invMass = 0.0;
      this._inertia = 0.0;
      this.invInertia = 0.0;
      var t1 = this.sweep;
      t1.get$localCenter().setZero$0();
      var t2 = this._type;
    case 1:
      state = 0;
      if ($.eqB(t2, 0) || $.eqB(t2, 1)) {
        t2 = t1.get$center();
        var t3 = this.originTransform;
        t2.setFrom$1(t3.get$position());
        t1.get$centerZero().setFrom$1(t3.get$position());
        return;
      }
      $.assert($.eq(t2, 2));
      t3 = this.tempCenter;
      t3.setZero$0();
      var massData = $.propertyTypeCheck(this._pmd, 'is$MassData');
      var f = $.propertyTypeCheck(this.fixtureList, 'is$Fixture');
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!!(f == null)) break L0;
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
            c$0:{
              switch (state) {
                case 0:
                  t2 = f.get$density();
                case 2:
                  state = 0;
                  if ($.eqB(t2, 0.0)) break c$0;
                  f.getMassData$1(massData);
                  t2 = this.mass;
                case 3:
                  state = 0;
                  var t4 = massData.get$mass();
                case 4:
                  state = 0;
                  this.mass = $.add(t2, t4);
                  var temp = $.Vector$copy(massData.get$center());
                  temp.mulLocal$1(massData.get$mass());
                  t3.addLocal$1(temp);
                  var t5 = this._inertia;
                case 5:
                  state = 0;
                  var t6 = massData.get$inertia();
                case 6:
                  state = 0;
                  this._inertia = $.add(t5, t6);
              }
            }
            f = $.propertyTypeCheck(f.get$next(), 'is$Fixture');
        }
      }
      t2 = this.mass;
    case 7:
      state = 0;
      if ($.gtB(t2, 0.0)) {
        t2 = this.mass;
        if (typeof t2 !== 'number') throw $.iae(t2);
        this.invMass = 1.0 / t2;
        t3.mulLocal$1(this.invMass);
      } else {
        this.mass = 1.0;
        this.invMass = 1.0;
      }
      t2 = this._inertia;
    case 8:
      state = 0;
    case 9:
      if (state == 9 || (state == 0 && $.gtB(t2, 0.0))) {
        switch (state) {
          case 0:
            t2 = this.flags;
          case 9:
            state = 0;
            t4 = $.eqB($.and(t2, 16), 0);
            t2 = t4;
        }
      } else {
        t2 = false;
      }
    case 10:
    case 11:
    case 12:
    case 13:
      if (state == 10 || state == 11 || state == 12 || state == 13 || (state == 0 && t2)) {
        switch (state) {
          case 0:
            t2 = this._inertia;
          case 10:
            state = 0;
            t4 = this.mass;
          case 11:
            state = 0;
            t5 = $.Vector_dot(t3, t3);
          case 12:
            state = 0;
            this._inertia = $.sub(t2, $.mul(t4, t5));
            t6 = this._inertia;
          case 13:
            state = 0;
            $.assert($.gt(t6, 0.0));
            var t7 = this._inertia;
            if (typeof t7 !== 'number') throw $.iae(t7);
            this.invInertia = 1.0 / t7;
        }
      } else {
        this._inertia = 0.0;
        this.invInertia = 0.0;
      }
      t2 = this.oldCenter;
      t2.setFrom$1(t1.get$center());
      t1.get$localCenter().setFrom$1(t3);
      $.Transform_mulToOut(this.originTransform, t1.get$localCenter(), t1.get$centerZero());
      t1.get$center().setFrom$1(t1.get$centerZero());
      temp = $.Vector$copy(t1.get$center());
      temp.subLocal$1(t2);
      $.Vector_crossNumAndVectorToOut(this._angularVelocity, temp, temp);
      this._linearVelocity.addLocal$1(temp);
  }
 },
 set$angularVelocity: function(w) {
  $.numTypeCheck(w);
  if (!$.eqB(this._type, 0)) {
    $.gtB($.mul(w, w), 0) && this.set$awake(true);
    this._angularVelocity = w;
  }
 },
 get$angularVelocity: function() {
  return this._angularVelocity;
 },
 set$linearVelocity: function(v) {
  $.propertyTypeCheck(v, 'is$Vector');
  if ($.eqB(this._type, 0)) return;
  $.gtB($.Vector_dot(v, v), 0.0) && this.set$awake(true);
  this._linearVelocity.setFrom$1(v);
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
 createFixtureFromShape$2: function(shape, density) {
  $.propertyTypeCheck(shape, 'is$Shape');
  $.numTypeCheck(density);
  var t1 = this._fixDef;
  t1.set$shape(shape);
  t1.set$density(density);
  return this.createFixture$1(t1);
 },
 createFixtureFromShape$1: function(shape) {
  return this.createFixtureFromShape$2(shape,0)
},
 createFixture$1: function(def) {
  $.propertyTypeCheck(def, 'is$FixtureDef');
  var t1 = this.world;
  var t2 = t1.get$locked();
  if (typeof t2 !== 'boolean') return this.createFixture$1$bailout(1, def, t2, t1);
  $.assert(!t2);
  var fixture = $.Fixture$();
  fixture.create$2(this, def);
  t2 = this.flags;
  if (t2 !== (t2 | 0)) return this.createFixture$1$bailout(2, t2, fixture, t1);
  t2 = t2 & 32;
  t2 === 32 && fixture.createProxy$2($.propertyTypeCheck(t1.get$_contactManager().get$broadPhase(), 'is$BroadPhase'), this.originTransform);
  fixture.next = this.fixtureList;
  this.fixtureList = fixture;
  this.fixtureCount = this.fixtureCount + 1;
  fixture.body = this;
  t2 = fixture.density;
  if (typeof t2 !== 'number') return this.createFixture$1$bailout(3, fixture, t2, t1);
  t2 > 0.0 && this.resetMassData$0();
  t2 = t1.get$_flags();
  if (t2 !== (t2 | 0)) return this.createFixture$1$bailout(4, fixture, t2, t1);
  t1.set$_flags((t2 | 1) >>> 0);
  return fixture;
 },
 createFixture$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var def = env0;
      t2 = env1;
      t1 = env2;
      break;
    case 2:
      t2 = env0;
      fixture = env1;
      t1 = env2;
      break;
    case 3:
      fixture = env0;
      t2 = env1;
      t1 = env2;
      break;
    case 4:
      fixture = env0;
      t2 = env1;
      t1 = env2;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(def, 'is$FixtureDef');
      var t1 = this.world;
      var t2 = t1.get$locked();
    case 1:
      state = 0;
      $.assert($.eq(t2, false));
      var fixture = $.Fixture$();
      fixture.create$2(this, def);
      t2 = this.flags;
    case 2:
      state = 0;
      $.eqB($.and(t2, 32), 32) && fixture.createProxy$2($.propertyTypeCheck(t1.get$_contactManager().get$broadPhase(), 'is$BroadPhase'), this.originTransform);
      fixture.next = this.fixtureList;
      this.fixtureList = fixture;
      this.fixtureCount = this.fixtureCount + 1;
      fixture.body = this;
      t2 = fixture.density;
    case 3:
      state = 0;
      $.gtB(t2, 0.0) && this.resetMassData$0();
      t2 = t1.get$_flags();
    case 4:
      state = 0;
      t1.set$_flags($.or(t2, 1));
      return fixture;
  }
 },
 next$0: function() { return this.next.$call$0(); },
 Body$2: function(bd, world) {
  $.propertyTypeCheck(bd, 'is$BodyDef');
  $.propertyTypeCheck(world, 'is$World');
  if (bd.get$bullet() === true) {
    var t1 = this.flags;
    if (t1 !== (t1 | 0)) return this.Body$2$bailout(1, t1, bd);
    this.flags = (t1 | 8) >>> 0;
  }
  if (bd.get$fixedRotation() === true) {
    t1 = this.flags;
    if (t1 !== (t1 | 0)) return this.Body$2$bailout(2, bd, t1);
    this.flags = (t1 | 16) >>> 0;
  }
  if (bd.get$allowSleep() === true) {
    t1 = this.flags;
    if (t1 !== (t1 | 0)) return this.Body$2$bailout(3, bd, t1);
    this.flags = (t1 | 4) >>> 0;
  }
  if (bd.get$awake() === true) {
    t1 = this.flags;
    if (t1 !== (t1 | 0)) return this.Body$2$bailout(4, t1, bd);
    this.flags = (t1 | 2) >>> 0;
  }
  if (bd.get$active() === true) {
    t1 = this.flags;
    if (t1 !== (t1 | 0)) return this.Body$2$bailout(5, t1, bd);
    this.flags = (t1 | 32) >>> 0;
  }
  t1 = this.originTransform;
  t1.position.setFrom$1(bd.get$position());
  t1.rotation.setAngle$1(bd.get$angle());
  var t2 = this.sweep;
  var t3 = t2.localCenter;
  t3.setZero$0();
  var t4 = t2.centerZero;
  $.Transform_mulToOut(t1, t3, t4);
  t2.center.setFrom$1(t4);
  t2.angle = bd.get$angle();
  t2.angleZero = bd.get$angle();
  t1 = this._type;
  if (typeof t1 !== 'number') return this.Body$2$bailout(6, t1, 0);
  if (t1 === 2) {
    this.mass = 1;
    this.invMass = 1;
  } else {
    this.mass = 0;
    this.invMass = 0;
  }
 },
 Body$2$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      var bd = env1;
      break;
    case 2:
      bd = env0;
      t1 = env1;
      break;
    case 3:
      bd = env0;
      t1 = env1;
      break;
    case 4:
      t1 = env0;
      bd = env1;
      break;
    case 5:
      t1 = env0;
      bd = env1;
      break;
    case 6:
      t1 = env0;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(bd, 'is$BodyDef');
      $.propertyTypeCheck(world, 'is$World');
    case 1:
      if (state == 1 || (state == 0 && bd.get$bullet() === true)) {
        switch (state) {
          case 0:
            var t1 = this.flags;
          case 1:
            state = 0;
            this.flags = $.or(t1, 8);
        }
      }
    case 2:
      if (state == 2 || (state == 0 && bd.get$fixedRotation() === true)) {
        switch (state) {
          case 0:
            t1 = this.flags;
          case 2:
            state = 0;
            this.flags = $.or(t1, 16);
        }
      }
    case 3:
      if (state == 3 || (state == 0 && bd.get$allowSleep() === true)) {
        switch (state) {
          case 0:
            t1 = this.flags;
          case 3:
            state = 0;
            this.flags = $.or(t1, 4);
        }
      }
    case 4:
      if (state == 4 || (state == 0 && bd.get$awake() === true)) {
        switch (state) {
          case 0:
            t1 = this.flags;
          case 4:
            state = 0;
            this.flags = $.or(t1, 2);
        }
      }
    case 5:
      if (state == 5 || (state == 0 && bd.get$active() === true)) {
        switch (state) {
          case 0:
            t1 = this.flags;
          case 5:
            state = 0;
            this.flags = $.or(t1, 32);
        }
      }
      t1 = this.originTransform;
      t1.get$position().setFrom$1(bd.get$position());
      t1.get$rotation().setAngle$1(bd.get$angle());
      var t2 = this.sweep;
      t2.get$localCenter().setZero$0();
      $.Transform_mulToOut(t1, t2.get$localCenter(), t2.get$centerZero());
      t2.get$center().setFrom$1(t2.get$centerZero());
      t2.set$angle(bd.get$angle());
      t2.set$angleZero(bd.get$angle());
      t1 = this._type;
    case 6:
      state = 0;
      if ($.eqB(t1, 2)) {
        this.mass = 1;
        this.invMass = 1;
      } else {
        this.mass = 0;
        this.invMass = 0;
      }
  }
 },
 is$Body: true
};

$$.BodyDef = {"":
 ["active?", "awake=", "angularDamping?", "linearDamping?", "allowSleep?", "bullet=", "isSleeping", "fixedRotation?", "angularVelocity", "linearVelocity?", "position?", "userData?", "angle=", "type?"],
 super: "Object",
 is$BodyDef: true
};

$$.ContactManager = {"":
 ["pool", "contactListener?", "contactFilter", "contactCount?", "contactList?", "broadPhase?"],
 super: "Object",
 collide$0: function() {
  var c = $.propertyTypeCheck(this.contactList, 'is$Contact');
  for (var t1 = this.contactFilter, t2 = !(t1 === null), t3 = this.broadPhase, t4 = this.contactListener; !(c == null); ) {
    var fixtureA = $.propertyTypeCheck(c.get$fixtureA(), 'is$Fixture');
    var fixtureB = $.propertyTypeCheck(c.get$fixtureB(), 'is$Fixture');
    var bodyA = $.propertyTypeCheck(fixtureA.get$body(), 'is$Body');
    var bodyB = $.propertyTypeCheck(fixtureB.get$body(), 'is$Body');
    if ($.eqB(bodyA.get$awake(), false) && $.eqB(bodyB.get$awake(), false)) {
      c = $.propertyTypeCheck(c.get$next(), 'is$Contact');
      continue;
    }
    if ($.eqB($.and(c.get$flags(), 8), 8)) {
      if ($.eqB(bodyB.shouldCollide$1(bodyA), false)) {
        var c0 = $.propertyTypeCheck(c.get$next(), 'is$Contact');
        this.destroy$1(c);
        c = c0;
        continue;
      }
      if (t2 && $.eqB(t1.shouldCollide$2(fixtureA, fixtureB), false)) {
        c0 = $.propertyTypeCheck(c.get$next(), 'is$Contact');
        this.destroy$1(c);
        c = c0;
        continue;
      }
      c.set$flags($.and(c.get$flags(), -9));
    }
    if ($.eqB($.boolTypeCheck(t3.testOverlap$2($.propertyTypeCheck(fixtureA.get$proxy(), 'is$DynamicTreeNode'), $.propertyTypeCheck(fixtureB.get$proxy(), 'is$DynamicTreeNode'))), false)) {
      c0 = $.propertyTypeCheck(c.get$next(), 'is$Contact');
      this.destroy$1(c);
      c = c0;
      continue;
    }
    c.update$1(t4);
    c = $.propertyTypeCheck(c.get$next(), 'is$Contact');
  }
 },
 destroy$1: function(c) {
  $.propertyTypeCheck(c, 'is$Contact');
  var fixtureA = $.propertyTypeCheck(c.get$fixtureA(), 'is$Fixture');
  var fixtureB = $.propertyTypeCheck(c.get$fixtureB(), 'is$Fixture');
  var bodyA = $.propertyTypeCheck(fixtureA.get$body(), 'is$Body');
  var bodyB = $.propertyTypeCheck(fixtureB.get$body(), 'is$Body');
  var t1 = this.contactListener;
  !(t1 == null) && c.get$touching() === true && t1.endContact$1(c);
  t1 = c.get$prev();
  if (!(t1 == null)) {
    t1 = c.get$next();
    c.get$prev().set$next(t1);
  }
  t1 = c.get$next();
  if (!(t1 == null)) {
    t1 = c.get$prev();
    c.get$next().set$prev(t1);
  }
  if ($.eqB(c, this.contactList)) this.contactList = c.get$next();
  t1 = c.get$edge1().get$prev();
  if (!(t1 == null)) {
    t1 = c.get$edge1().get$next();
    c.get$edge1().get$prev().set$next(t1);
  }
  t1 = c.get$edge1().get$next();
  if (!(t1 == null)) {
    t1 = c.get$edge1().get$prev();
    c.get$edge1().get$next().set$prev(t1);
  }
  $.eqB(c.get$edge1(), bodyA.get$contactList()) && bodyA.set$contactList(c.get$edge1().get$next());
  t1 = c.get$edge2().get$prev();
  if (!(t1 == null)) {
    t1 = c.get$edge2().get$next();
    c.get$edge2().get$prev().set$next(t1);
  }
  t1 = c.get$edge2().get$next();
  if (!(t1 == null)) {
    t1 = c.get$edge2().get$prev();
    c.get$edge2().get$next().set$prev(t1);
  }
  $.eqB(c.get$edge2(), bodyB.get$contactList()) && bodyB.set$contactList(c.get$edge2().get$next());
  this.pool.pushContact$1(c);
  this.contactCount = this.contactCount - 1;
 },
 findNewContacts$0: function() {
  this.broadPhase.updatePairs$1(this);
 },
 addPair$2: function(fixtureA, fixtureB) {
  $.propertyTypeCheck(fixtureA, 'is$Fixture');
  $.propertyTypeCheck(fixtureB, 'is$Fixture');
  var bodyA = $.propertyTypeCheck(fixtureA.get$body(), 'is$Body');
  var bodyB = $.propertyTypeCheck(fixtureB.get$body(), 'is$Body');
  if (bodyA == null ? bodyB == null : bodyA === bodyB) return;
  var edge = $.propertyTypeCheck(bodyB.get$contactList(), 'is$ContactEdge');
  for (; !(edge == null); ) {
    if ($.eqB(edge.get$other(), bodyA)) {
      var fA = $.propertyTypeCheck(edge.get$contact().get$fixtureA(), 'is$Fixture');
      var fB = $.propertyTypeCheck(edge.get$contact().get$fixtureB(), 'is$Fixture');
      if ($.eqB(fA, fixtureA) && $.eqB(fB, fixtureB)) return;
      if ($.eqB(fA, fixtureB) && $.eqB(fB, fixtureA)) return;
    }
    edge = $.propertyTypeCheck(edge.get$next(), 'is$ContactEdge');
  }
  var t1 = bodyB.shouldCollide$1(bodyA);
  if (typeof t1 !== 'boolean') return this.addPair$2$bailout(1, fixtureA, fixtureB, t1);
  if (!t1) return;
  t1 = this.contactFilter;
  t1 = t1.shouldCollide$2(fixtureA, fixtureB);
  if (typeof t1 !== 'boolean') return this.addPair$2$bailout(2, t1, fixtureA, fixtureB);
  t1 = !t1;
  if (t1) return;
  var c = $.propertyTypeCheck(this.pool.popContact$2(fixtureA, fixtureB), 'is$Contact');
  fixtureA = $.propertyTypeCheck(c.get$fixtureA(), 'is$Fixture');
  fixtureB = $.propertyTypeCheck(c.get$fixtureB(), 'is$Fixture');
  bodyA = $.propertyTypeCheck(fixtureA.get$body(), 'is$Body');
  bodyB = $.propertyTypeCheck(fixtureB.get$body(), 'is$Body');
  c.set$prev(null);
  c.set$next(this.contactList);
  t1 = this.contactList;
  !(t1 == null) && t1.set$prev(c);
  this.contactList = c;
  c.get$edge1().set$contact(c);
  c.get$edge1().set$other(bodyB);
  c.get$edge1().set$prev(null);
  t1 = bodyA.get$contactList();
  c.get$edge1().set$next(t1);
  t1 = bodyA.get$contactList();
  if (!(t1 == null)) {
    t1 = c.get$edge1();
    bodyA.get$contactList().set$prev(t1);
  }
  bodyA.set$contactList(c.get$edge1());
  c.get$edge2().set$contact(c);
  c.get$edge2().set$other(bodyA);
  c.get$edge2().set$prev(null);
  t1 = bodyB.get$contactList();
  c.get$edge2().set$next(t1);
  t1 = bodyB.get$contactList();
  if (!(t1 == null)) {
    t1 = c.get$edge2();
    bodyB.get$contactList().set$prev(t1);
  }
  bodyB.set$contactList(c.get$edge2());
  this.contactCount = this.contactCount + 1;
 },
 addPair$2$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var fixtureA = env0;
      var fixtureB = env1;
      t1 = env2;
      break;
    case 2:
      t1 = env0;
      fixtureA = env1;
      fixtureB = env2;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(fixtureA, 'is$Fixture');
      $.propertyTypeCheck(fixtureB, 'is$Fixture');
      var bodyA = $.propertyTypeCheck(fixtureA.get$body(), 'is$Body');
      var bodyB = $.propertyTypeCheck(fixtureB.get$body(), 'is$Body');
      if (bodyA == null ? bodyB == null : bodyA === bodyB) return;
      var edge = $.propertyTypeCheck(bodyB.get$contactList(), 'is$ContactEdge');
      for (; !(edge == null); ) {
        if ($.eqB(edge.get$other(), bodyA)) {
          var fA = $.propertyTypeCheck(edge.get$contact().get$fixtureA(), 'is$Fixture');
          var fB = $.propertyTypeCheck(edge.get$contact().get$fixtureB(), 'is$Fixture');
          if ($.eqB(fA, fixtureA) && $.eqB(fB, fixtureB)) return;
          if ($.eqB(fA, fixtureB) && $.eqB(fB, fixtureA)) return;
        }
        edge = $.propertyTypeCheck(edge.get$next(), 'is$ContactEdge');
      }
      var t1 = bodyB.shouldCollide$1(bodyA);
    case 1:
      state = 0;
      if ($.eqB(t1, false)) return;
      t1 = this.contactFilter;
    case 2:
      if (state == 2 || (state == 0 && !(t1 === null))) {
        switch (state) {
          case 0:
            t1 = t1.shouldCollide$2(fixtureA, fixtureB);
          case 2:
            state = 0;
            t1 = $.eqB(t1, false);
        }
      } else {
        t1 = false;
      }
      if (t1) return;
      var c = $.propertyTypeCheck(this.pool.popContact$2(fixtureA, fixtureB), 'is$Contact');
      fixtureA = $.propertyTypeCheck(c.get$fixtureA(), 'is$Fixture');
      fixtureB = $.propertyTypeCheck(c.get$fixtureB(), 'is$Fixture');
      bodyA = $.propertyTypeCheck(fixtureA.get$body(), 'is$Body');
      bodyB = $.propertyTypeCheck(fixtureB.get$body(), 'is$Body');
      c.set$prev(null);
      c.set$next(this.contactList);
      t1 = this.contactList;
      !(t1 == null) && t1.set$prev(c);
      this.contactList = c;
      c.get$edge1().set$contact(c);
      c.get$edge1().set$other(bodyB);
      c.get$edge1().set$prev(null);
      t1 = bodyA.get$contactList();
      c.get$edge1().set$next(t1);
      t1 = bodyA.get$contactList();
      if (!(t1 == null)) {
        t1 = c.get$edge1();
        bodyA.get$contactList().set$prev(t1);
      }
      bodyA.set$contactList(c.get$edge1());
      c.get$edge2().set$contact(c);
      c.get$edge2().set$other(bodyA);
      c.get$edge2().set$prev(null);
      t1 = bodyB.get$contactList();
      c.get$edge2().set$next(t1);
      t1 = bodyB.get$contactList();
      if (!(t1 == null)) {
        t1 = c.get$edge2();
        bodyB.get$contactList().set$prev(t1);
      }
      bodyB.set$contactList(c.get$edge2());
      this.contactCount = this.contactCount + 1;
  }
 },
 is$PairCallback: true
};

$$.Filter = {"":
 ["groupIndex=", "maskBits=", "categoryBits="],
 super: "Object",
 setFrom$1: function(other) {
  $.propertyTypeCheck(other, 'is$Filter');
  this.categoryBits = other.get$categoryBits();
  this.maskBits = other.get$maskBits();
  this.groupIndex = other.get$groupIndex();
 },
 is$Filter: true
};

$$.Fixture = {"":
 ["_poolTwo", "_poolOne", "userData?", "isSensor?", "filter?", "proxy?", "restitution?", "friction?", "shape=", "body?", "next=", "density=", "box?"],
 super: "Object",
 get$type: function() {
  return this.shape.get$type();
 },
 getMassData$1: function(massData) {
  $.propertyTypeCheck(massData, 'is$MassData');
  this.shape.computeMass$2(massData, this.density);
 },
 synchronize$3: function(broadPhase, transformOne, transformTwo) {
  $.propertyTypeCheck(broadPhase, 'is$BroadPhase');
  $.propertyTypeCheck(transformOne, 'is$Transform');
  $.propertyTypeCheck(transformTwo, 'is$Transform');
  var t1 = this.proxy;
  if (t1 == null) return;
  t1 = this.shape;
  var t2 = this._poolOne;
  t1.computeAxisAlignedBox$2(t2, transformOne);
  t1 = this.shape;
  var t3 = this._poolTwo;
  t1.computeAxisAlignedBox$2(t3, transformTwo);
  t1 = t2.lowerBound;
  var t4 = t1.get$x();
  if (typeof t4 !== 'number') return this.synchronize$3$bailout(1, t2, t3, broadPhase, transformOne, transformTwo, t4, 0, 0);
  var t5 = t3.lowerBound;
  var t6 = t5.get$x();
  if (typeof t6 !== 'number') return this.synchronize$3$bailout(2, t2, t3, broadPhase, transformOne, transformTwo, t4, t6, 0);
  t4 = t4 < t6 ? t1.get$x() : t5.get$x();
  t6 = this.box;
  var t7 = t6.lowerBound;
  t7.set$x(t4);
  t4 = t1.get$y();
  if (typeof t4 !== 'number') return this.synchronize$3$bailout(3, t2, t4, t3, broadPhase, transformOne, transformTwo, t6, 0);
  var t8 = t5.get$y();
  if (typeof t8 !== 'number') return this.synchronize$3$bailout(4, t2, t4, t3, t8, broadPhase, transformOne, transformTwo, t6);
  t7.set$y(t4 < t8 ? t1.get$y() : t5.get$y());
  t4 = t2.upperBound;
  t5 = t4.get$x();
  if (typeof t5 !== 'number') return this.synchronize$3$bailout(5, t2, t3, broadPhase, transformOne, transformTwo, t6, t5, 0);
  t7 = t3.upperBound;
  t8 = t7.get$x();
  if (typeof t8 !== 'number') return this.synchronize$3$bailout(6, t2, t3, broadPhase, transformOne, transformTwo, t6, t5, t8);
  t5 = t5 > t8 ? t4.get$x() : t7.get$x();
  t8 = t6.upperBound;
  t8.set$x(t5);
  t5 = t4.get$y();
  if (typeof t5 !== 'number') return this.synchronize$3$bailout(7, t2, t3, broadPhase, transformOne, transformTwo, t6, t5, 0);
  var t9 = t7.get$y();
  if (typeof t9 !== 'number') return this.synchronize$3$bailout(8, t2, t9, t3, broadPhase, transformOne, transformTwo, t6, t5);
  t8.set$y(t5 > t9 ? t4.get$y() : t7.get$y());
  $.propertyTypeCheck(t1, 'is$Vector');
  t2 = transformTwo.get$position().get$x();
  if (typeof t2 !== 'number') return this.synchronize$3$bailout(9, broadPhase, t1, transformTwo, t6, transformOne, t2, 0, 0);
  t3 = transformOne.get$position().get$x();
  if (typeof t3 !== 'number') return this.synchronize$3$bailout(10, broadPhase, t1, transformOne, t6, t3, transformTwo, t2, 0);
  t1.set$x(t2 - t3);
  t4 = transformTwo.get$position().get$y();
  if (typeof t4 !== 'number') return this.synchronize$3$bailout(11, t6, t4, broadPhase, t1, transformOne, 0, 0, 0);
  t5 = transformOne.get$position().get$y();
  if (typeof t5 !== 'number') return this.synchronize$3$bailout(12, t5, t6, broadPhase, t1, t4, 0, 0, 0);
  t1.set$y(t4 - t5);
  broadPhase.moveProxy$3(this.proxy, t6, t1);
 },
 synchronize$3$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7) {
  switch (state) {
    case 1:
      t2 = env0;
      t3 = env1;
      var broadPhase = env2;
      var transformOne = env3;
      var transformTwo = env4;
      t1 = env5;
      break;
    case 2:
      t2 = env0;
      t3 = env1;
      broadPhase = env2;
      transformOne = env3;
      transformTwo = env4;
      t1 = env5;
      t4 = env6;
      break;
    case 3:
      t2 = env0;
      t1 = env1;
      t3 = env2;
      broadPhase = env3;
      transformOne = env4;
      transformTwo = env5;
      t4 = env6;
      break;
    case 4:
      t2 = env0;
      t1 = env1;
      t3 = env2;
      t5 = env3;
      broadPhase = env4;
      transformOne = env5;
      transformTwo = env6;
      t4 = env7;
      break;
    case 5:
      t2 = env0;
      t3 = env1;
      broadPhase = env2;
      transformOne = env3;
      transformTwo = env4;
      t4 = env5;
      t1 = env6;
      break;
    case 6:
      t2 = env0;
      t3 = env1;
      broadPhase = env2;
      transformOne = env3;
      transformTwo = env4;
      t4 = env5;
      t1 = env6;
      t5 = env7;
      break;
    case 7:
      t2 = env0;
      t3 = env1;
      broadPhase = env2;
      transformOne = env3;
      transformTwo = env4;
      t4 = env5;
      t1 = env6;
      break;
    case 8:
      t2 = env0;
      t5 = env1;
      t3 = env2;
      broadPhase = env3;
      transformOne = env4;
      transformTwo = env5;
      t4 = env6;
      t1 = env7;
      break;
    case 9:
      broadPhase = env0;
      disp = env1;
      transformTwo = env2;
      t4 = env3;
      transformOne = env4;
      t2 = env5;
      break;
    case 10:
      broadPhase = env0;
      disp = env1;
      transformOne = env2;
      t4 = env3;
      t1 = env4;
      transformTwo = env5;
      t2 = env6;
      break;
    case 11:
      t4 = env0;
      t3 = env1;
      broadPhase = env2;
      disp = env3;
      transformOne = env4;
      break;
    case 12:
      t5 = env0;
      t4 = env1;
      broadPhase = env2;
      disp = env3;
      t3 = env4;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(broadPhase, 'is$BroadPhase');
      $.propertyTypeCheck(transformOne, 'is$Transform');
      $.propertyTypeCheck(transformTwo, 'is$Transform');
      var t1 = this.proxy;
      if (t1 == null) return;
      t1 = this.shape;
      var t2 = this._poolOne;
      t1.computeAxisAlignedBox$2(t2, transformOne);
      t1 = this.shape;
      var t3 = this._poolTwo;
      t1.computeAxisAlignedBox$2(t3, transformTwo);
      t1 = t2.get$lowerBound().get$x();
    case 1:
      state = 0;
      var t4 = t3.get$lowerBound().get$x();
    case 2:
      state = 0;
      t1 = $.ltB(t1, t4) ? t2.get$lowerBound().get$x() : t3.get$lowerBound().get$x();
      t4 = this.box;
      t4.get$lowerBound().set$x(t1);
      t1 = t2.get$lowerBound().get$y();
    case 3:
      state = 0;
      var t5 = t3.get$lowerBound().get$y();
    case 4:
      state = 0;
      t1 = $.ltB(t1, t5) ? t2.get$lowerBound().get$y() : t3.get$lowerBound().get$y();
      t4.get$lowerBound().set$y(t1);
      t1 = t2.get$upperBound().get$x();
    case 5:
      state = 0;
      t5 = t3.get$upperBound().get$x();
    case 6:
      state = 0;
      t1 = $.gtB(t1, t5) ? t2.get$upperBound().get$x() : t3.get$upperBound().get$x();
      t4.get$upperBound().set$x(t1);
      t1 = t2.get$upperBound().get$y();
    case 7:
      state = 0;
      t5 = t3.get$upperBound().get$y();
    case 8:
      state = 0;
      t1 = $.gtB(t1, t5) ? t2.get$upperBound().get$y() : t3.get$upperBound().get$y();
      t4.get$upperBound().set$y(t1);
      var disp = $.propertyTypeCheck(t2.get$lowerBound(), 'is$Vector');
      t2 = transformTwo.get$position().get$x();
    case 9:
      state = 0;
      t1 = transformOne.get$position().get$x();
    case 10:
      state = 0;
      disp.set$x($.sub(t2, t1));
      t3 = transformTwo.get$position().get$y();
    case 11:
      state = 0;
      t5 = transformOne.get$position().get$y();
    case 12:
      state = 0;
      disp.set$y($.sub(t3, t5));
      broadPhase.moveProxy$3(this.proxy, t4, disp);
  }
 },
 createProxy$2: function(broadPhase, xf) {
  $.propertyTypeCheck(broadPhase, 'is$BroadPhase');
  $.propertyTypeCheck(xf, 'is$Transform');
  var t1 = this.proxy;
  $.assert(t1 == null);
  var t2 = this.shape;
  var t3 = this.box;
  t2.computeAxisAlignedBox$2(t3, xf);
  this.proxy = broadPhase.createProxy$2(t3, this);
 },
 create$2: function(b, def) {
  $.propertyTypeCheck(b, 'is$Body');
  $.propertyTypeCheck(def, 'is$FixtureDef');
  this.userData = def.get$userData();
  this.friction = def.get$friction();
  this.restitution = def.get$restitution();
  this.body = b;
  this.next = null;
  this.filter.setFrom$1(def.get$filter());
  this.isSensor = def.get$isSensor();
  this.shape = def.get$shape().clone$0();
  this.density = def.get$density();
 },
 next$0: function() { return this.next.$call$0(); },
 is$Fixture: true
};

$$.FixtureDef = {"":
 ["filter?", "isSensor?", "density=", "restitution?", "friction?", "userData?", "shape="],
 super: "Object",
 FixtureDef$0: function() {
  var t1 = this.filter;
  t1.set$categoryBits(1);
  t1.set$maskBits(65535);
  t1.set$groupIndex(0);
 },
 is$FixtureDef: true
};

$$.Island = {"":
 ["impulse", "_translation", "_contactSolver", "positionIterationCount", "jointCapacity", "contactCapacity", "bodyCapacity", "contactCount?", "jointCount", "bodyCount?", "velocities", "positions", "joints", "contacts", "bodies?", "listener"],
 super: "Object",
 report$1: function(constraints) {
  $.listTypeCheck(constraints);
  var t1 = this.listener;
  if (t1 == null) return;
  for (t1 = this.impulse, i = 0; $.ltB(i, this.contactCount); i = $.intTypeCheck($.add(i, 1))) {
    var c = $.propertyTypeCheck($.index(this.contacts, i), 'is$Contact');
    var cc = $.propertyTypeCheck($.index(constraints, i), 'is$ContactConstraint');
    for (var j = 0; $.ltB(j, cc.get$pointCount()); j = $.intTypeCheck($.add(j, 1))) {
      $.indexSet(t1.get$normalImpulses(), j, $.index(cc.get$points(), j).get$normalImpulse());
      $.indexSet(t1.get$tangentImpulses(), j, $.index(cc.get$points(), j).get$tangentImpulse());
    }
    this.listener.postSolve$2(c, t1);
  }
  var i;
 },
 addJoint$1: function(joint) {
  $.propertyTypeCheck(joint, 'is$Joint');
  var t1 = this.jointCount;
  if (typeof t1 !== 'number') return this.addJoint$1$bailout(1, joint, t1, 0);
  var t2 = this.jointCapacity;
  if (typeof t2 !== 'number') return this.addJoint$1$bailout(2, joint, t1, t2);
  $.assert(t1 < t2);
  var t3 = this.joints;
  var t4 = this.jointCount;
  if (typeof t4 !== 'number') return this.addJoint$1$bailout(3, joint, t3, t4);
  this.jointCount = t4 + 1;
  $.indexSet(t3, t4, joint);
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
      t2 = env2;
      break;
    case 3:
      joint = env0;
      t3 = env1;
      t4 = env2;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(joint, 'is$Joint');
      var t1 = this.jointCount;
    case 1:
      state = 0;
      var t2 = this.jointCapacity;
    case 2:
      state = 0;
      $.assert($.lt(t1, t2));
      var t3 = this.joints;
      var t4 = this.jointCount;
    case 3:
      state = 0;
      this.jointCount = $.add(t4, 1);
      $.indexSet(t3, t4, joint);
  }
 },
 addContact$1: function(contact) {
  $.propertyTypeCheck(contact, 'is$Contact');
  var t1 = this.contactCount;
  if (typeof t1 !== 'number') return this.addContact$1$bailout(1, contact, t1, 0);
  var t2 = this.contactCapacity;
  if (typeof t2 !== 'number') return this.addContact$1$bailout(2, contact, t1, t2);
  $.assert(t1 < t2);
  var t3 = this.contacts;
  var t4 = this.contactCount;
  if (typeof t4 !== 'number') return this.addContact$1$bailout(3, contact, t3, t4);
  this.contactCount = t4 + 1;
  $.indexSet(t3, t4, contact);
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
      t2 = env2;
      break;
    case 3:
      contact = env0;
      t3 = env1;
      t4 = env2;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(contact, 'is$Contact');
      var t1 = this.contactCount;
    case 1:
      state = 0;
      var t2 = this.contactCapacity;
    case 2:
      state = 0;
      $.assert($.lt(t1, t2));
      var t3 = this.contacts;
      var t4 = this.contactCount;
    case 3:
      state = 0;
      this.contactCount = $.add(t4, 1);
      $.indexSet(t3, t4, contact);
  }
 },
 addBody$1: function(body) {
  $.propertyTypeCheck(body, 'is$Body');
  var t1 = this.bodyCount;
  if (typeof t1 !== 'number') return this.addBody$1$bailout(1, body, t1, 0);
  var t2 = this.bodyCapacity;
  if (typeof t2 !== 'number') return this.addBody$1$bailout(2, body, t1, t2);
  $.assert(t1 < t2);
  body.set$islandIndex(this.bodyCount);
  var t3 = this.bodies;
  var t4 = this.bodyCount;
  if (typeof t4 !== 'number') return this.addBody$1$bailout(3, t3, t4, body);
  this.bodyCount = t4 + 1;
  $.indexSet(t3, t4, body);
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
      t2 = env2;
      break;
    case 3:
      t3 = env0;
      t4 = env1;
      body = env2;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(body, 'is$Body');
      var t1 = this.bodyCount;
    case 1:
      state = 0;
      var t2 = this.bodyCapacity;
    case 2:
      state = 0;
      $.assert($.lt(t1, t2));
      body.set$islandIndex(this.bodyCount);
      var t3 = this.bodies;
      var t4 = this.bodyCount;
    case 3:
      state = 0;
      this.bodyCount = $.add(t4, 1);
      $.indexSet(t3, t4, body);
  }
 },
 solve$3: function(step, gravity, allowSleep) {
  $.propertyTypeCheck(step, 'is$TimeStep');
  $.propertyTypeCheck(gravity, 'is$Vector');
  $.boolTypeCheck(allowSleep);
  for (var i = 0; $.ltB(i, this.bodyCount); ++i) {
    var b = $.propertyTypeCheck($.index(this.bodies, i), 'is$Body');
    var t1 = b.get$type();
    if (typeof t1 !== 'number') return this.solve$3$bailout(1, step, gravity, allowSleep, b, t1, i, 0, 0, 0, 0, 0);
    if (!(t1 === 2)) continue;
    t1 = b.get$_force().get$x();
    if (typeof t1 !== 'number') return this.solve$3$bailout(2, step, gravity, allowSleep, t1, b, i, 0, 0, 0, 0, 0);
    var t2 = b.get$invMass();
    if (typeof t2 !== 'number') return this.solve$3$bailout(3, step, gravity, allowSleep, t1, t2, b, i, 0, 0, 0, 0);
    t2 *= t1;
    t1 = gravity.get$x();
    if (typeof t1 !== 'number') return this.solve$3$bailout(4, step, gravity, allowSleep, b, t2, t1, i, 0, 0, 0, 0);
    t1 += t2;
    t2 = step.get$dt();
    if (typeof t2 !== 'number') return this.solve$3$bailout(5, t2, step, gravity, allowSleep, b, i, t1, 0, 0, 0, 0);
    t2 *= t1;
    t1 = b.get$_force().get$y();
    if (typeof t1 !== 'number') return this.solve$3$bailout(6, t2, t1, step, gravity, allowSleep, b, i, 0, 0, 0, 0);
    var t3 = b.get$invMass();
    if (typeof t3 !== 'number') return this.solve$3$bailout(7, t2, t1, t3, step, gravity, allowSleep, b, i, 0, 0, 0);
    t3 *= t1;
    t1 = gravity.get$y();
    if (typeof t1 !== 'number') return this.solve$3$bailout(8, t2, step, gravity, t3, t1, allowSleep, b, i, 0, 0, 0);
    t1 += t3;
    t3 = step.get$dt();
    if (typeof t3 !== 'number') return this.solve$3$bailout(9, t2, step, gravity, allowSleep, t1, b, t3, i, 0, 0, 0);
    var velocityDelta = $.Vector$(t2, t1 * t3);
    b.get$linearVelocity().addLocal$1(velocityDelta);
    t2 = b.get$angularVelocity();
    if (typeof t2 !== 'number') return this.solve$3$bailout(10, t2, step, gravity, allowSleep, b, i, 0, 0, 0, 0, 0);
    var t4 = step.get$dt();
    if (typeof t4 !== 'number') return this.solve$3$bailout(11, t2, t4, step, gravity, allowSleep, b, i, 0, 0, 0, 0);
    var t5 = b.get$invInertia();
    if (typeof t5 !== 'number') return this.solve$3$bailout(12, t2, t4, t5, step, gravity, allowSleep, b, i, 0, 0, 0);
    t5 *= t4;
    t4 = b.get$_torque();
    if (typeof t4 !== 'number') return this.solve$3$bailout(13, t2, step, t5, t4, allowSleep, gravity, b, i, 0, 0, 0);
    b.set$angularVelocity(t2 + t5 * t4);
    var t6 = step.get$dt();
    if (typeof t6 !== 'number') return this.solve$3$bailout(14, step, gravity, allowSleep, b, t6, i, 0, 0, 0, 0, 0);
    var t7 = b.get$linearDamping();
    if (typeof t7 !== 'number') return this.solve$3$bailout(15, i, step, gravity, allowSleep, b, t6, t7, 0, 0, 0, 0);
    var a = 1.0 - t6 * t7;
    t1 = a < 1.0;
    if (0.0 > (t1 ? a : 1.0)) var a1 = 0.0;
    else {
      a1 = t1 ? a : 1.0;
    }
    b.get$linearVelocity().mulLocal$1(a1);
    t1 = step.get$dt();
    if (typeof t1 !== 'number') return this.solve$3$bailout(16, t1, step, gravity, allowSleep, b, i, 0, 0, 0, 0, 0);
    t2 = b.get$angularDamping();
    if (typeof t2 !== 'number') return this.solve$3$bailout(17, t1, t2, step, gravity, allowSleep, b, i, 0, 0, 0, 0);
    var a2 = 1.0 - t1 * t2;
    var b1 = a2 < 1.0 ? a2 : 1.0;
    t1 = b.get$angularVelocity();
    if (typeof t1 !== 'number') return this.solve$3$bailout(18, t1, step, gravity, allowSleep, b, i, b1, 0, 0, 0, 0);
    b.set$angularVelocity(t1 * (0.0 > b1 ? 0.0 : b1));
  }
  for (var i1 = -1, i2 = 0; $.ltB(i2, this.contactCount); ++i2) {
    var fixtureA = $.propertyTypeCheck($.index(this.contacts, i2).get$fixtureA(), 'is$Fixture');
    var fixtureB = $.propertyTypeCheck($.index(this.contacts, i2).get$fixtureB(), 'is$Fixture');
    var bodyA = $.propertyTypeCheck(fixtureA.get$body(), 'is$Body');
    var bodyB = $.propertyTypeCheck(fixtureB.get$body(), 'is$Body');
    t1 = bodyA.get$type();
    if (typeof t1 !== 'number') return this.solve$3$bailout(20, i2, step, allowSleep, bodyB, t1, i1, 0, 0, 0, 0, 0);
    if (!(t1 === 0)) {
      t1 = bodyB.get$type();
      if (typeof t1 !== 'number') return this.solve$3$bailout(21, allowSleep, i2, t1, step, i1, 0, 0, 0, 0, 0, 0);
      var nonStatic = !(t1 === 0);
    } else nonStatic = false;
    if (nonStatic) {
      i1 = $.intTypeCheck($.add(i1, 1));
      if (i1 !== (i1 | 0)) return this.solve$3$bailout(22, i2, i1, step, allowSleep, 0, 0, 0, 0, 0, 0, 0);
      var temp = $.propertyTypeCheck($.index(this.contacts, i1), 'is$Contact');
      t1 = this.contacts;
      $.indexSet(t1, i1, $.index(t1, i2));
      $.indexSet(this.contacts, i2, temp);
    }
  }
  t1 = this._contactSolver;
  t1.init$3(this.contacts, this.contactCount, step.get$dtRatio());
  t1.warmStart$0();
  for (i = 0; $.ltB(i, this.jointCount); ++i) {
    $.index(this.joints, i).initVelocityConstraints$1(step);
  }
  for (i = 0; $.ltB(i, step.get$velocityIterations()); ++i) {
    for (var j = 0; $.ltB(j, this.jointCount); ++j) {
      $.index(this.joints, j).solveVelocityConstraints$1(step);
    }
    t1.solveVelocityConstraints$0();
  }
  t1.storeImpulses$0();
  temp = $.Vector$(0, 0);
  for (t2 = this._translation, i = 0; $.ltB(i, this.bodyCount); ++i) {
    b = $.propertyTypeCheck($.index(this.bodies, i), 'is$Body');
    t3 = b.get$type();
    if (typeof t3 !== 'number') return this.solve$3$bailout(27, i, temp, step, t2, allowSleep, t1, b, t3, 0, 0, 0);
    if (t3 === 0) continue;
    t2.setFrom$1(b.get$linearVelocity());
    t2.mulLocal$1(step.get$dt());
    t3 = $.Vector_dot(t2, t2);
    if (typeof t3 !== 'number') return this.solve$3$bailout(28, i, temp, step, t2, allowSleep, t1, b, t3, 0, 0, 0);
    if (t3 > 4.0) {
      t3 = $.get$length(t2);
      if (typeof t3 !== 'number') throw $.iae(t3);
      var ratio = 2.0 / t3;
      b.get$linearVelocity().mulLocal$1(ratio);
    }
    t3 = step.get$dt();
    if (typeof t3 !== 'number') return this.solve$3$bailout(29, i, t3, temp, step, t2, allowSleep, t1, b, 0, 0, 0);
    t4 = b.get$angularVelocity();
    if (typeof t4 !== 'number') return this.solve$3$bailout(30, i, t3, t4, temp, step, t2, allowSleep, t1, b, 0, 0);
    var rotation = t3 * t4;
    if (rotation * rotation > 2.4674011002723395) {
      t3 = $.abs(rotation);
      if (typeof t3 !== 'number') throw $.iae(t3);
      ratio = 1.5707963267948966 / t3;
      t3 = b.get$angularVelocity();
      if (typeof t3 !== 'number') return this.solve$3$bailout(32, i, ratio, temp, t3, step, t2, allowSleep, t1, b, 0, 0);
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
    if (typeof t4 !== 'number') return this.solve$3$bailout(33, i, temp, step, t2, allowSleep, t3, t4, b, t1, 0, 0);
    t5 = step.get$dt();
    if (typeof t5 !== 'number') return this.solve$3$bailout(34, i, temp, step, t2, allowSleep, t3, t4, t5, b, t1, 0);
    t6 = b.get$angularVelocity();
    if (typeof t6 !== 'number') return this.solve$3$bailout(35, i, temp, step, t2, allowSleep, t3, t4, t5, b, t6, t1);
    t3.set$angle(t4 + t5 * t6);
    b.synchronizeTransform$0();
  }
  for (i = 0; $.ltB(i, step.get$positionIterations()); ++i) {
    var contactsOkay = $.boolTypeCheck(t1.solvePositionConstraints$1(0.2));
    for (j = 0, jointsOkay = true; $.ltB(j, this.jointCount); ++j) {
      var jointOkay = $.boolTypeCheck($.index(this.joints, j).solvePositionConstraints$1(0.2));
      jointsOkay = jointsOkay === true && jointOkay === true;
    }
    if (contactsOkay === true && jointsOkay === true) break;
  }
  this.report$1(t1.constraints);
  if (allowSleep === true) {
    for (var minSleepTime = 99999999999999.0, i = 0; $.ltB(i, this.bodyCount); ++i) {
      b = $.propertyTypeCheck($.index(this.bodies, i), 'is$Body');
      t1 = b.get$type();
      if (typeof t1 !== 'number') return this.solve$3$bailout(39, minSleepTime, b, i, t1, step, 0, 0, 0, 0, 0, 0);
      if (t1 === 0) continue;
      t1 = b.get$flags();
      if (t1 !== (t1 | 0)) return this.solve$3$bailout(40, b, minSleepTime, i, step, t1, 0, 0, 0, 0, 0, 0);
      t1 = t1 & 4;
      if (t1 === 0) {
        b.set$sleepTime(0.0);
        minSleepTime = 0.0;
      }
      t1 = b.get$flags();
      if (t1 !== (t1 | 0)) return this.solve$3$bailout(41, b, i, step, minSleepTime, t1, 0, 0, 0, 0, 0, 0);
      t1 = t1 & 4;
      if (!(t1 === 0)) {
        t1 = b.get$angularVelocity();
        if (typeof t1 !== 'number') return this.solve$3$bailout(42, b, i, t1, step, minSleepTime, 0, 0, 0, 0, 0, 0);
        t2 = b.get$angularVelocity();
        if (typeof t2 !== 'number') return this.solve$3$bailout(43, b, i, t1, step, t2, minSleepTime, 0, 0, 0, 0, 0);
        t3 = t1 * t2 > 0.0012184696791468343;
        t1 = t3;
      } else t1 = true;
      if (!t1) {
        t1 = $.Vector_dot(b.get$linearVelocity(), b.get$linearVelocity());
        if (typeof t1 !== 'number') return this.solve$3$bailout(44, b, i, step, t1, minSleepTime, 0, 0, 0, 0, 0, 0);
        t1 = t1 > 0.0001;
      } else t1 = true;
      if (t1) {
        b.set$sleepTime(0.0);
        minSleepTime = 0.0;
      } else {
        t1 = b.get$sleepTime();
        if (typeof t1 !== 'number') return this.solve$3$bailout(45, t1, b, i, step, minSleepTime, 0, 0, 0, 0, 0, 0);
        t2 = step.get$dt();
        if (typeof t2 !== 'number') return this.solve$3$bailout(46, t1, b, t2, i, step, minSleepTime, 0, 0, 0, 0, 0);
        b.set$sleepTime(t1 + t2);
        minSleepTime = $.numTypeCheck($.Math_min(minSleepTime, b.get$sleepTime()));
      }
    }
    if ($.geB(minSleepTime, 0.5)) {
      for (i = 0; $.ltB(i, this.bodyCount); ++i) {
        $.propertyTypeCheck($.index(this.bodies, i), 'is$Body').set$awake(false);
      }
    }
  }
  var jointsOkay;
 },
 solve$3$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10) {
  switch (state) {
    case 1:
      var step = env0;
      var gravity = env1;
      var allowSleep = env2;
      b = env3;
      t1 = env4;
      i = env5;
      break;
    case 2:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      t1 = env3;
      b = env4;
      i = env5;
      break;
    case 3:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      t1 = env3;
      t2 = env4;
      b = env5;
      i = env6;
      break;
    case 4:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      b = env3;
      t2 = env4;
      t1 = env5;
      i = env6;
      break;
    case 5:
      t2 = env0;
      step = env1;
      gravity = env2;
      allowSleep = env3;
      b = env4;
      i = env5;
      t1 = env6;
      break;
    case 6:
      t2 = env0;
      t1 = env1;
      step = env2;
      gravity = env3;
      allowSleep = env4;
      b = env5;
      i = env6;
      break;
    case 7:
      t2 = env0;
      t1 = env1;
      t3 = env2;
      step = env3;
      gravity = env4;
      allowSleep = env5;
      b = env6;
      i = env7;
      break;
    case 8:
      t2 = env0;
      step = env1;
      gravity = env2;
      t3 = env3;
      t1 = env4;
      allowSleep = env5;
      b = env6;
      i = env7;
      break;
    case 9:
      t2 = env0;
      step = env1;
      gravity = env2;
      allowSleep = env3;
      t1 = env4;
      b = env5;
      t3 = env6;
      i = env7;
      break;
    case 10:
      t2 = env0;
      step = env1;
      gravity = env2;
      allowSleep = env3;
      b = env4;
      i = env5;
      break;
    case 11:
      t2 = env0;
      t4 = env1;
      step = env2;
      gravity = env3;
      allowSleep = env4;
      b = env5;
      i = env6;
      break;
    case 12:
      t2 = env0;
      t4 = env1;
      t5 = env2;
      step = env3;
      gravity = env4;
      allowSleep = env5;
      b = env6;
      i = env7;
      break;
    case 13:
      t2 = env0;
      step = env1;
      t5 = env2;
      t4 = env3;
      allowSleep = env4;
      gravity = env5;
      b = env6;
      i = env7;
      break;
    case 14:
      step = env0;
      gravity = env1;
      allowSleep = env2;
      b = env3;
      t2 = env4;
      i = env5;
      break;
    case 15:
      i = env0;
      step = env1;
      gravity = env2;
      allowSleep = env3;
      b = env4;
      t2 = env5;
      t6 = env6;
      break;
    case 16:
      t1 = env0;
      step = env1;
      gravity = env2;
      allowSleep = env3;
      b = env4;
      i = env5;
      break;
    case 17:
      t1 = env0;
      t2 = env1;
      step = env2;
      gravity = env3;
      allowSleep = env4;
      b = env5;
      i = env6;
      break;
    case 18:
      t1 = env0;
      step = env1;
      gravity = env2;
      allowSleep = env3;
      b = env4;
      i = env5;
      b1 = env6;
      break;
    case 19:
      allowSleep = env0;
      step = env1;
      gravity = env2;
      i = env3;
      break;
    case 20:
      i2 = env0;
      step = env1;
      allowSleep = env2;
      bodyB = env3;
      t1 = env4;
      i1 = env5;
      break;
    case 21:
      allowSleep = env0;
      i2 = env1;
      t1 = env2;
      step = env3;
      i1 = env4;
      break;
    case 22:
      i2 = env0;
      i1 = env1;
      step = env2;
      allowSleep = env3;
      break;
    case 23:
      i2 = env0;
      step = env1;
      i1 = env2;
      allowSleep = env3;
      break;
    case 24:
      t1 = env0;
      i = env1;
      step = env2;
      allowSleep = env3;
      break;
    case 25:
      t1 = env0;
      i = env1;
      j = env2;
      step = env3;
      allowSleep = env4;
      break;
    case 26:
      t1 = env0;
      step = env1;
      i = env2;
      allowSleep = env3;
      break;
    case 27:
      i = env0;
      temp = env1;
      step = env2;
      t2 = env3;
      allowSleep = env4;
      t1 = env5;
      b = env6;
      t3 = env7;
      break;
    case 28:
      i = env0;
      temp = env1;
      step = env2;
      t2 = env3;
      allowSleep = env4;
      t1 = env5;
      b = env6;
      t3 = env7;
      break;
    case 29:
      i = env0;
      t3 = env1;
      temp = env2;
      step = env3;
      t2 = env4;
      allowSleep = env5;
      t1 = env6;
      b = env7;
      break;
    case 30:
      i = env0;
      t3 = env1;
      t4 = env2;
      temp = env3;
      step = env4;
      t2 = env5;
      allowSleep = env6;
      t1 = env7;
      b = env8;
      break;
    case 31:
      i = env0;
      temp = env1;
      rotation = env2;
      step = env3;
      t2 = env4;
      allowSleep = env5;
      t1 = env6;
      b = env7;
      break;
    case 32:
      i = env0;
      ratio = env1;
      temp = env2;
      t3 = env3;
      step = env4;
      t2 = env5;
      allowSleep = env6;
      t1 = env7;
      b = env8;
      break;
    case 33:
      i = env0;
      temp = env1;
      step = env2;
      t2 = env3;
      allowSleep = env4;
      t3 = env5;
      t4 = env6;
      b = env7;
      t1 = env8;
      break;
    case 34:
      i = env0;
      temp = env1;
      step = env2;
      t2 = env3;
      allowSleep = env4;
      t3 = env5;
      t4 = env6;
      t5 = env7;
      b = env8;
      t1 = env9;
      break;
    case 35:
      i = env0;
      temp = env1;
      step = env2;
      t2 = env3;
      allowSleep = env4;
      t3 = env5;
      t4 = env6;
      t5 = env7;
      b = env8;
      t6 = env9;
      t1 = env10;
      break;
    case 36:
      i = env0;
      temp = env1;
      step = env2;
      t2 = env3;
      allowSleep = env4;
      t1 = env5;
      break;
    case 37:
      jointsOkay = env0;
      step = env1;
      allowSleep = env2;
      j = env3;
      t1 = env4;
      i = env5;
      contactsOkay = env6;
      break;
    case 38:
      i = env0;
      t1 = env1;
      step = env2;
      allowSleep = env3;
      break;
    case 39:
      minSleepTime = env0;
      b = env1;
      i = env2;
      t1 = env3;
      step = env4;
      break;
    case 40:
      b = env0;
      minSleepTime = env1;
      i = env2;
      step = env3;
      t1 = env4;
      break;
    case 41:
      b = env0;
      i = env1;
      step = env2;
      minSleepTime = env3;
      t1 = env4;
      break;
    case 42:
      b = env0;
      i = env1;
      t1 = env2;
      step = env3;
      minSleepTime = env4;
      break;
    case 43:
      b = env0;
      i = env1;
      t1 = env2;
      step = env3;
      t2 = env4;
      minSleepTime = env5;
      break;
    case 44:
      b = env0;
      i = env1;
      step = env2;
      t1 = env3;
      minSleepTime = env4;
      break;
    case 45:
      t1 = env0;
      b = env1;
      i = env2;
      step = env3;
      minSleepTime = env4;
      break;
    case 46:
      t1 = env0;
      b = env1;
      t2 = env2;
      i = env3;
      step = env4;
      minSleepTime = env5;
      break;
    case 47:
      i = env0;
      minSleepTime = env1;
      step = env2;
      break;
    case 48:
      i = env0;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(step, 'is$TimeStep');
      $.propertyTypeCheck(gravity, 'is$Vector');
      $.boolTypeCheck(allowSleep);
      var i = 0;
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
    case 19:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, this.bodyCount)) break L0;
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
          case 16:
          case 17:
          case 18:
            c$0:{
              switch (state) {
                case 0:
                  var b = $.propertyTypeCheck($.index(this.bodies, i), 'is$Body');
                  var t1 = b.get$type();
                case 1:
                  state = 0;
                  if (!$.eqB(t1, 2)) break c$0;
                  t1 = b.get$_force().get$x();
                case 2:
                  state = 0;
                  var t2 = b.get$invMass();
                case 3:
                  state = 0;
                  t2 = $.mul(t1, t2);
                  t1 = gravity.get$x();
                case 4:
                  state = 0;
                  t1 = $.add(t2, t1);
                  t2 = step.get$dt();
                case 5:
                  state = 0;
                  t2 = $.mul(t1, t2);
                  t1 = b.get$_force().get$y();
                case 6:
                  state = 0;
                  var t3 = b.get$invMass();
                case 7:
                  state = 0;
                  t3 = $.mul(t1, t3);
                  t1 = gravity.get$y();
                case 8:
                  state = 0;
                  t1 = $.add(t3, t1);
                  t3 = step.get$dt();
                case 9:
                  state = 0;
                  var velocityDelta = $.Vector$(t2, $.mul(t1, t3));
                  b.get$linearVelocity().addLocal$1(velocityDelta);
                  t2 = b.get$angularVelocity();
                case 10:
                  state = 0;
                  var t4 = step.get$dt();
                case 11:
                  state = 0;
                  var t5 = b.get$invInertia();
                case 12:
                  state = 0;
                  t5 = $.mul(t4, t5);
                  t4 = b.get$_torque();
                case 13:
                  state = 0;
                  b.set$angularVelocity($.numTypeCheck($.add(t2, $.mul(t5, t4))));
                  t2 = step.get$dt();
                case 14:
                  state = 0;
                  var t6 = b.get$linearDamping();
                case 15:
                  state = 0;
                  t6 = $.mul(t2, t6);
                  if (typeof t6 !== 'number') throw $.iae(t6);
                  var a = 1.0 - t6;
                  t1 = a < 1.0;
                  if (0.0 > (t1 ? a : 1.0)) var a1 = 0.0;
                  else {
                    a1 = t1 ? a : 1.0;
                  }
                  b.get$linearVelocity().mulLocal$1(a1);
                  t1 = step.get$dt();
                case 16:
                  state = 0;
                  t2 = b.get$angularDamping();
                case 17:
                  state = 0;
                  t2 = $.mul(t1, t2);
                  if (typeof t2 !== 'number') throw $.iae(t2);
                  var a2 = 1.0 - t2;
                  var b1 = a2 < 1.0 ? a2 : 1.0;
                  t1 = b.get$angularVelocity();
                case 18:
                  state = 0;
                  b.set$angularVelocity($.mul(t1, 0.0 > b1 ? 0.0 : b1));
              }
            }
            i = $.intTypeCheck($.add(i, 1));
          case 19:
            state = 0;
        }
      }
      var i1 = -1;
      var i2 = 0;
    case 20:
    case 21:
    case 22:
    case 23:
      L1: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i2, this.contactCount)) break L1;
            var fixtureA = $.propertyTypeCheck($.index(this.contacts, i2).get$fixtureA(), 'is$Fixture');
            var fixtureB = $.propertyTypeCheck($.index(this.contacts, i2).get$fixtureB(), 'is$Fixture');
            var bodyA = $.propertyTypeCheck(fixtureA.get$body(), 'is$Body');
            var bodyB = $.propertyTypeCheck(fixtureB.get$body(), 'is$Body');
            t1 = bodyA.get$type();
          case 20:
            state = 0;
          case 21:
            if (state == 21 || (state == 0 && !$.eqB(t1, 0))) {
              switch (state) {
                case 0:
                  t1 = bodyB.get$type();
                case 21:
                  state = 0;
                  var nonStatic = !$.eqB(t1, 0);
              }
            } else {
              nonStatic = false;
            }
          case 22:
            if (state == 22 || (state == 0 && nonStatic)) {
              switch (state) {
                case 0:
                  i1 = $.intTypeCheck($.add(i1, 1));
                case 22:
                  state = 0;
                  var temp = $.propertyTypeCheck($.index(this.contacts, i1), 'is$Contact');
                  t1 = this.contacts;
                  $.indexSet(t1, i1, $.index(t1, i2));
                  $.indexSet(this.contacts, i2, temp);
              }
            }
            i2 = $.intTypeCheck($.add(i2, 1));
          case 23:
            state = 0;
        }
      }
      t1 = this._contactSolver;
      t1.init$3(this.contacts, this.contactCount, step.get$dtRatio());
      t1.warmStart$0();
      i = 0;
    case 24:
      L2: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, this.jointCount)) break L2;
            $.index(this.joints, i).initVelocityConstraints$1(step);
            i = $.intTypeCheck($.add(i, 1));
          case 24:
            state = 0;
        }
      }
      i = 0;
    case 25:
    case 26:
      L3: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, step.get$velocityIterations())) break L3;
            var j = 0;
          case 25:
            L4: while (true) {
              switch (state) {
                case 0:
                  if (!$.ltB(j, this.jointCount)) break L4;
                  $.index(this.joints, j).solveVelocityConstraints$1(step);
                  j = $.intTypeCheck($.add(j, 1));
                case 25:
                  state = 0;
              }
            }
            t1.solveVelocityConstraints$0();
            i = $.intTypeCheck($.add(i, 1));
          case 26:
            state = 0;
        }
      }
      t1.storeImpulses$0();
      temp = $.Vector$(0, 0);
      t2 = this._translation;
      i = 0;
    case 27:
    case 28:
    case 29:
    case 30:
    case 31:
    case 32:
    case 33:
    case 34:
    case 35:
    case 36:
      L5: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, this.bodyCount)) break L5;
          case 27:
          case 28:
          case 29:
          case 30:
          case 31:
          case 32:
          case 33:
          case 34:
          case 35:
            c$0:{
              switch (state) {
                case 0:
                  b = $.propertyTypeCheck($.index(this.bodies, i), 'is$Body');
                  t3 = b.get$type();
                case 27:
                  state = 0;
                  if ($.eqB(t3, 0)) break c$0;
                  t2.setFrom$1(b.get$linearVelocity());
                  t2.mulLocal$1(step.get$dt());
                  t3 = $.Vector_dot(t2, t2);
                case 28:
                  state = 0;
                  if ($.gtB(t3, 4.0)) {
                    t3 = $.get$length(t2);
                    if (typeof t3 !== 'number') throw $.iae(t3);
                    var ratio = 2.0 / t3;
                    b.get$linearVelocity().mulLocal$1(ratio);
                  }
                  t3 = step.get$dt();
                case 29:
                  state = 0;
                  t4 = b.get$angularVelocity();
                case 30:
                  state = 0;
                  var rotation = $.numTypeCheck($.mul(t3, t4));
                case 31:
                  state = 0;
                case 32:
                  if (state == 32 || (state == 0 && $.gtB($.mul(rotation, rotation), 2.4674011002723395))) {
                    switch (state) {
                      case 0:
                        t3 = $.abs(rotation);
                        if (typeof t3 !== 'number') throw $.iae(t3);
                        ratio = 1.5707963267948966 / t3;
                        t3 = b.get$angularVelocity();
                      case 32:
                        state = 0;
                        b.set$angularVelocity($.mul(t3, ratio));
                    }
                  }
                  b.get$sweep().get$centerZero().setFrom$1(b.get$sweep().get$center());
                  t3 = b.get$sweep().get$angle();
                  b.get$sweep().set$angleZero(t3);
                  temp.setFrom$1(b.get$linearVelocity());
                  temp.mulLocal$1(step.get$dt());
                  b.get$sweep().get$center().addLocal$1(temp);
                  t3 = b.get$sweep();
                  t4 = t3.get$angle();
                case 33:
                  state = 0;
                  t5 = step.get$dt();
                case 34:
                  state = 0;
                  t6 = b.get$angularVelocity();
                case 35:
                  state = 0;
                  t3.set$angle($.add(t4, $.mul(t5, t6)));
                  b.synchronizeTransform$0();
              }
            }
            i = $.intTypeCheck($.add(i, 1));
          case 36:
            state = 0;
        }
      }
      i = 0;
    case 37:
    case 38:
      L6: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, step.get$positionIterations())) break L6;
            var contactsOkay = $.boolTypeCheck(t1.solvePositionConstraints$1(0.2));
            j = 0;
            var jointsOkay = true;
          case 37:
            L7: while (true) {
              switch (state) {
                case 0:
                  if (!$.ltB(j, this.jointCount)) break L7;
                  var jointOkay = $.boolTypeCheck($.index(this.joints, j).solvePositionConstraints$1(0.2));
                  jointsOkay = jointsOkay === true && jointOkay === true;
                  j = $.intTypeCheck($.add(j, 1));
                case 37:
                  state = 0;
              }
            }
            if (contactsOkay === true && jointsOkay === true) break L6;
            i = $.intTypeCheck($.add(i, 1));
          case 38:
            state = 0;
        }
      }
      this.report$1(t1.get$constraints());
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
      if (state == 39 || state == 40 || state == 41 || state == 42 || state == 43 || state == 44 || state == 45 || state == 46 || state == 47 || state == 48 || (state == 0 && allowSleep === true)) {
        switch (state) {
          case 0:
            var minSleepTime = 99999999999999.0;
            i = 0;
          case 39:
          case 40:
          case 41:
          case 42:
          case 43:
          case 44:
          case 45:
          case 46:
          case 47:
            L8: while (true) {
              switch (state) {
                case 0:
                  if (!$.ltB(i, this.bodyCount)) break L8;
                case 39:
                case 40:
                case 41:
                case 42:
                case 43:
                case 44:
                case 45:
                case 46:
                  c$0:{
                    switch (state) {
                      case 0:
                        b = $.propertyTypeCheck($.index(this.bodies, i), 'is$Body');
                        t1 = b.get$type();
                      case 39:
                        state = 0;
                        if ($.eqB(t1, 0)) break c$0;
                        t1 = b.get$flags();
                      case 40:
                        state = 0;
                        if ($.eqB($.and(t1, 4), 0)) {
                          b.set$sleepTime(0.0);
                          minSleepTime = 0.0;
                        }
                        t1 = b.get$flags();
                      case 41:
                        state = 0;
                      case 42:
                      case 43:
                        if (state == 42 || state == 43 || (state == 0 && !$.eqB($.and(t1, 4), 0))) {
                          switch (state) {
                            case 0:
                              t1 = b.get$angularVelocity();
                            case 42:
                              state = 0;
                              t2 = b.get$angularVelocity();
                            case 43:
                              state = 0;
                              t3 = $.gtB($.mul(t1, t2), 0.0012184696791468343);
                              t1 = t3;
                          }
                        } else {
                          t1 = true;
                        }
                      case 44:
                        if (state == 44 || (state == 0 && !t1)) {
                          switch (state) {
                            case 0:
                              t1 = $.Vector_dot(b.get$linearVelocity(), b.get$linearVelocity());
                            case 44:
                              state = 0;
                              t1 = $.gtB(t1, 0.0001);
                          }
                        } else {
                          t1 = true;
                        }
                      case 45:
                      case 46:
                        if ((state == 0 && t1)) {
                          b.set$sleepTime(0.0);
                          minSleepTime = 0.0;
                        } else {
                          switch (state) {
                            case 0:
                              t1 = b.get$sleepTime();
                            case 45:
                              state = 0;
                              t2 = step.get$dt();
                            case 46:
                              state = 0;
                              b.set$sleepTime($.add(t1, t2));
                              minSleepTime = $.numTypeCheck($.Math_min(minSleepTime, b.get$sleepTime()));
                          }
                        }
                    }
                  }
                  i = $.intTypeCheck($.add(i, 1));
                case 47:
                  state = 0;
              }
            }
          case 48:
            if (state == 48 || (state == 0 && $.geB(minSleepTime, 0.5))) {
              switch (state) {
                case 0:
                  i = 0;
                case 48:
                  L9: while (true) {
                    switch (state) {
                      case 0:
                        if (!$.ltB(i, this.bodyCount)) break L9;
                        $.propertyTypeCheck($.index(this.bodies, i), 'is$Body').set$awake(false);
                        i = $.intTypeCheck($.add(i, 1));
                      case 48:
                        state = 0;
                    }
                  }
              }
            }
        }
      }
  }
 },
 clear$0: function() {
  this.bodyCount = 0;
  this.contactCount = 0;
  this.jointCount = 0;
 },
 init$4: function(argBodyCapacity, argContactCapacity, argJointCapacity, argListener) {
  $.intTypeCheck(argBodyCapacity);
  $.intTypeCheck(argContactCapacity);
  $.intTypeCheck(argJointCapacity);
  $.propertyTypeCheck(argListener, 'is$ContactListener');
  this.bodyCapacity = argBodyCapacity;
  this.contactCapacity = argContactCapacity;
  this.jointCapacity = argJointCapacity;
  this.bodyCount = 0;
  this.contactCount = 0;
  this.listener = argListener;
  var t1 = this.bodies;
  if (t1 == null || $.gtB(this.bodyCapacity, $.get$length(t1))) {
    t1 = $.ListFactory_List(this.bodyCapacity);
    $.setRuntimeTypeInfo(t1, ({E: 'Body'}));
    this.bodies = t1;
  }
  t1 = this.contacts;
  if (t1 == null || $.gtB(this.contactCapacity, $.get$length(t1))) {
    t1 = $.ListFactory_List(this.contactCapacity);
    $.setRuntimeTypeInfo(t1, ({E: 'Contact'}));
    this.contacts = t1;
  }
  t1 = this.joints;
  if (t1 == null || $.gtB(this.jointCapacity, $.get$length(t1))) {
    t1 = $.ListFactory_List(this.jointCapacity);
    $.setRuntimeTypeInfo(t1, ({E: 'Joint'}));
    this.joints = t1;
  }
  t1 = this.velocities;
  if (t1 == null || $.gtB(this.bodyCapacity, $.get$length(t1))) {
    var old = this.velocities;
    if (old == null) {
      old = $.ListFactory_List(0);
      $.setRuntimeTypeInfo(old, ({E: 'Velocity'}));
    }
    $.listTypeCheck(old);
    t1 = $.ListFactory_List(this.bodyCapacity);
    $.setRuntimeTypeInfo(t1, ({E: 'Velocity'}));
    this.velocities = t1;
    $.setRange$3(this.velocities, 0, $.get$length(old), old);
    var i = $.intTypeCheck($.get$length(old));
    if (i !== (i | 0)) return this.init$4$bailout(1, i);
    for (; $.ltB(i, $.get$length(this.velocities)); i = $.intTypeCheck($.add(i, 1))) {
      $.indexSet(this.velocities, i, $.Velocity$());
    }
  }
  t1 = this.positions;
  if (t1 == null || $.gtB(this.bodyCapacity, $.get$length(t1))) {
    old = this.positions;
    if (old == null) {
      old = $.ListFactory_List(0);
      $.setRuntimeTypeInfo(old, ({E: 'Position'}));
    }
    $.listTypeCheck(old);
    t1 = $.ListFactory_List(this.bodyCapacity);
    $.setRuntimeTypeInfo(t1, ({E: 'Position'}));
    this.positions = t1;
    $.setRange$3(this.positions, 0, $.get$length(old), old);
    i = $.intTypeCheck($.get$length(old));
    if (i !== (i | 0)) return this.init$4$bailout(2, i);
    for (; $.ltB(i, $.get$length(this.positions)); i = $.intTypeCheck($.add(i, 1))) {
      $.indexSet(this.positions, i, $.Position$());
    }
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
      $.intTypeCheck(argBodyCapacity);
      $.intTypeCheck(argContactCapacity);
      $.intTypeCheck(argJointCapacity);
      $.propertyTypeCheck(argListener, 'is$ContactListener');
      this.bodyCapacity = argBodyCapacity;
      this.contactCapacity = argContactCapacity;
      this.jointCapacity = argJointCapacity;
      this.bodyCount = 0;
      this.contactCount = 0;
      this.listener = argListener;
      var t1 = this.bodies;
      if (t1 == null || $.gtB(this.bodyCapacity, $.get$length(t1))) {
        t1 = $.ListFactory_List(this.bodyCapacity);
        $.setRuntimeTypeInfo(t1, ({E: 'Body'}));
        this.bodies = t1;
      }
      t1 = this.contacts;
      if (t1 == null || $.gtB(this.contactCapacity, $.get$length(t1))) {
        t1 = $.ListFactory_List(this.contactCapacity);
        $.setRuntimeTypeInfo(t1, ({E: 'Contact'}));
        this.contacts = t1;
      }
      t1 = this.joints;
      if (t1 == null || $.gtB(this.jointCapacity, $.get$length(t1))) {
        t1 = $.ListFactory_List(this.jointCapacity);
        $.setRuntimeTypeInfo(t1, ({E: 'Joint'}));
        this.joints = t1;
      }
      t1 = this.velocities;
    case 1:
      if (state == 1 || (state == 0 && (t1 == null || $.gtB(this.bodyCapacity, $.get$length(t1))))) {
        switch (state) {
          case 0:
            var old = this.velocities;
            if (old == null) {
              old = $.ListFactory_List(0);
              $.setRuntimeTypeInfo(old, ({E: 'Velocity'}));
            }
            $.listTypeCheck(old);
            t1 = $.ListFactory_List(this.bodyCapacity);
            $.setRuntimeTypeInfo(t1, ({E: 'Velocity'}));
            this.velocities = t1;
            $.setRange$3(this.velocities, 0, $.get$length(old), old);
            var i = $.intTypeCheck($.get$length(old));
          case 1:
            state = 0;
            for (; $.ltB(i, $.get$length(this.velocities)); i = $.intTypeCheck($.add(i, 1))) {
              $.indexSet(this.velocities, i, $.Velocity$());
            }
        }
      }
      t1 = this.positions;
    case 2:
      if (state == 2 || (state == 0 && (t1 == null || $.gtB(this.bodyCapacity, $.get$length(t1))))) {
        switch (state) {
          case 0:
            old = this.positions;
            if (old == null) {
              old = $.ListFactory_List(0);
              $.setRuntimeTypeInfo(old, ({E: 'Position'}));
            }
            $.listTypeCheck(old);
            t1 = $.ListFactory_List(this.bodyCapacity);
            $.setRuntimeTypeInfo(t1, ({E: 'Position'}));
            this.positions = t1;
            $.setRange$3(this.positions, 0, $.get$length(old), old);
            i = $.intTypeCheck($.get$length(old));
          case 2:
            state = 0;
            for (; $.ltB(i, $.get$length(this.positions)); i = $.intTypeCheck($.add(i, 1))) {
              $.indexSet(this.positions, i, $.Position$());
            }
        }
      }
  }
 }
};

$$.Position = {"":
 ["a=", "x="],
 super: "Object",
 Position$0: function() {
  this.x = $.Vector$(0, 0);
  this.a = 0;
 }
};

$$.Velocity = {"":
 ["a=", "v?"],
 super: "Object",
 Velocity$0: function() {
  this.v = $.Vector$(0, 0);
  this.a = 0;
 }
};

$$.TimeStep = {"":
 ["warmStarting=", "positionIterations=", "velocityIterations=", "dtRatio=", "inv_dt=", "dt="],
 super: "Object",
 is$TimeStep: true
};

$$.World = {"":
 ["stack", "island", "contacts", "toiSolver", "backup", "toiOutput", "toiInput", "wqwrapper", "cB", "cA", "timestep", "axis", "center?", "_contactStacks", "_continuousPhysics", "_warmStarting", "_inverseTimestep", "_pool", "_jointDestructionListener", "_fixtureDestructionListener", "_debugDraw", "_allowSleep", "_gravity", "_jointCount", "_bodyCount", "_jointList", "_bodyList", "_contactManager?", "_flags="],
 super: "Object",
 solveTimeOfImpactGivenBody$1: function(body) {
  $.propertyTypeCheck(body, 'is$Body');
  var bullet = $.boolTypeCheck(body.get$bullet());
  if (typeof bullet !== 'boolean') return this.solveTimeOfImpactGivenBody$1$bailout(1, null, body, bullet, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var t1 = this.toiInput;
  var t2 = this._pool;
  var t3 = this.toiOutput;
  var t4 = t1.proxyA;
  var t5 = t1.proxyB;
  var t6 = t1.sweepA;
  var t7 = t1.sweepB;
  var iter = 0;
  var toiContact = null;
  var toi = 1.0;
  var toiOther = null;
  var count = null;
  var found = null;
  do {
    for (var ce = $.propertyTypeCheck(body.get$contactList(), 'is$ContactEdge'), count = 0, found = false; !(ce == null); ce = $.propertyTypeCheck(ce.get$next(), 'is$ContactEdge')) {
      if ($.eqB(ce.get$contact(), toiContact)) continue;
      var other = $.propertyTypeCheck(ce.get$other(), 'is$Body');
      var type = $.intTypeCheck(other.get$type());
      if (type !== (type | 0)) return this.solveTimeOfImpactGivenBody$1$bailout(2, toiContact, toi, ce, body, count, found, toiOther, t1, t2, t3, bullet, iter, other, type, 0);
      if (bullet) {
        var t8 = other.get$flags();
        if (t8 !== (t8 | 0)) return this.solveTimeOfImpactGivenBody$1$bailout(3, toiContact, toi, ce, t8, count, found, toiOther, t1, body, t2, t3, bullet, iter, other, type);
        t8 = t8 & 64;
        if (t8 === 0) continue;
        if (!(type === 0)) {
          t8 = ce.get$contact().get$flags();
          if (t8 !== (t8 | 0)) return this.solveTimeOfImpactGivenBody$1$bailout(4, toiContact, toi, ce, body, count, found, toiOther, t1, t2, t3, bullet, iter, t8, other, 0);
          t8 = t8 & 16;
          var t9 = !(t8 === 0);
          t8 = t9;
        } else t8 = false;
        if (t8) continue;
      } else {
        if (type === 2) continue;
      }
      var contact = $.propertyTypeCheck(ce.get$contact(), 'is$Contact');
      t8 = contact.get$enabled();
      if (typeof t8 !== 'boolean') return this.solveTimeOfImpactGivenBody$1$bailout(5, toiContact, toi, ce, body, count, found, toiOther, t1, t2, t3, bullet, iter, contact, t8, other);
      if (!t8) continue;
      t8 = contact.get$toiCount();
      if (typeof t8 !== 'number') return this.solveTimeOfImpactGivenBody$1$bailout(6, toiContact, toi, ce, body, count, found, toiOther, t1, t2, t3, bullet, iter, contact, other, t8);
      if (t8 > 10) continue;
      var fixtureA = $.propertyTypeCheck(contact.get$fixtureA(), 'is$Fixture');
      var fixtureB = $.propertyTypeCheck(contact.get$fixtureB(), 'is$Fixture');
      if (fixtureA.get$isSensor() === true || fixtureB.get$isSensor() === true) continue;
      var bodyA = $.propertyTypeCheck(fixtureA.get$body(), 'is$Body');
      var bodyB = $.propertyTypeCheck(fixtureB.get$body(), 'is$Body');
      t4.setFromShape$1(fixtureA.get$shape());
      t5.setFromShape$1(fixtureB.get$shape());
      t6.setFrom$1(bodyA.get$sweep());
      t7.setFrom$1(bodyB.get$sweep());
      t1.tMax = toi;
      t2.get$timeOfImpact().timeOfImpact$2(t3, t1);
      t8 = t3.state;
      if (typeof t8 !== 'number') return this.solveTimeOfImpactGivenBody$1$bailout(7, toiContact, toi, ce, body, count, found, toiOther, t1, t2, t3, bullet, iter, contact, t8, other);
      if (t8 === 3) {
        t8 = t3.t;
        if (typeof t8 !== 'number') return this.solveTimeOfImpactGivenBody$1$bailout(8, toiContact, toi, ce, body, count, found, toiOther, t1, t2, t3, bullet, iter, contact, other, t8);
        t8 = $.ltB(t8, toi);
      } else t8 = false;
      if (t8) {
        toi = $.numTypeCheck(t3.t);
        if (typeof toi !== 'number') return this.solveTimeOfImpactGivenBody$1$bailout(9, contact, ce, body, count, t1, toi, other, t2, t3, bullet, iter, 0, 0, 0, 0);
        toiContact = contact;
        toiOther = other;
        found = true;
      }
      count = $.intTypeCheck($.add(count, 1));
      if (count !== (count | 0)) return this.solveTimeOfImpactGivenBody$1$bailout(10, ce, body, t1, t2, bullet, t3, toiOther, toi, toiContact, found, count, iter, 0, 0, 0);
    }
    iter = $.intTypeCheck($.add(iter, 1));
    if (iter !== (iter | 0)) return this.solveTimeOfImpactGivenBody$1$bailout(11, toiContact, toi, body, count, found, toiOther, t1, iter, t2, t3, bullet, 0, 0, 0, 0);
  } while ((found === true && $.gtB(count, 1) && $.ltB(iter, 50)));
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
  if (typeof t4 !== 'boolean') return this.solveTimeOfImpactGivenBody$1$bailout(12, t1, t2, toiOther, body, t4, toiContact, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  if (!t4) {
    body.get$sweep().setFrom$1(t1);
    this.solveTimeOfImpactGivenBody$1(body);
  }
  t1 = toiContact.get$toiCount();
  if (typeof t1 !== 'number') return this.solveTimeOfImpactGivenBody$1$bailout(13, t2, toiOther, body, toiContact, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  toiContact.set$toiCount(t1 + 1);
  t1 = this.contacts;
  if (!(t1 === null)) {
    t1 = t1.length;
    if (typeof t1 !== 'number') return this.solveTimeOfImpactGivenBody$1$bailout(14, t2, toiOther, body, t1, toiContact, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    t1 = t1 < 32;
  } else t1 = true;
  if (t1) {
    t1 = $.ListFactory_List(32);
    $.setRuntimeTypeInfo(t1, ({E: 'Contact'}));
    this.contacts = t1;
  }
  ce = $.propertyTypeCheck(body.get$contactList(), 'is$ContactEdge');
  count = 0;
  while (true) {
    if (!(!(ce == null) && $.ltB(count, 32))) break;
    c$0:{
      type = $.intTypeCheck($.propertyTypeCheck(ce.get$other(), 'is$Body').get$type());
      if (type !== (type | 0)) return this.solveTimeOfImpactGivenBody$1$bailout(15, ce, t2, count, toiOther, body, type, toiContact, 0, 0, 0, 0, 0, 0, 0, 0);
      if (type === 2) break c$0;
      contact = $.propertyTypeCheck(ce.get$contact(), 'is$Contact');
      t1 = contact.get$enabled();
      if (typeof t1 !== 'boolean') return this.solveTimeOfImpactGivenBody$1$bailout(16, ce, t2, count, toiOther, contact, t1, body, toiContact, 0, 0, 0, 0, 0, 0, 0);
      if (!t1) break c$0;
      fixtureA = $.propertyTypeCheck(contact.get$fixtureA(), 'is$Fixture');
      fixtureB = $.propertyTypeCheck(contact.get$fixtureB(), 'is$Fixture');
      if (fixtureA.get$isSensor() === true || fixtureB.get$isSensor() === true) break c$0;
      !$.eqB(contact, toiContact) && contact.update$1(t3);
      t1 = contact.get$enabled();
      if (typeof t1 !== 'boolean') return this.solveTimeOfImpactGivenBody$1$bailout(17, ce, t2, count, toiOther, contact, body, t1, toiContact, 0, 0, 0, 0, 0, 0, 0);
      if (!t1) break c$0;
      t1 = contact.get$touching();
      if (typeof t1 !== 'boolean') return this.solveTimeOfImpactGivenBody$1$bailout(18, ce, t2, count, toiOther, contact, t1, body, toiContact, 0, 0, 0, 0, 0, 0, 0);
      if (!t1) break c$0;
      $.indexSet(this.contacts, count, contact);
      count = $.intTypeCheck($.add(count, 1));
      if (count !== (count | 0)) return this.solveTimeOfImpactGivenBody$1$bailout(19, ce, t2, count, toiOther, body, toiContact, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    ce = $.propertyTypeCheck(ce.get$next(), 'is$ContactEdge');
  }
  t1 = this.toiSolver;
  t1.initialize$3(this.contacts, count, body);
  for (var i = 0; i < 20; ++i) {
    if ($.boolTypeCheck(t1.solve$1(0.75)) === true) break;
  }
  t1 = toiOther.get$type();
  if (typeof t1 !== 'number') return this.solveTimeOfImpactGivenBody$1$bailout(21, t1, toiContact, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  if (!(t1 === 0)) {
    t1 = toiContact.get$flags();
    if (t1 !== (t1 | 0)) return this.solveTimeOfImpactGivenBody$1$bailout(22, toiContact, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    toiContact.set$flags((t1 | 16) >>> 0);
  }
 },
 solveTimeOfImpactGivenBody$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13, env14) {
  switch (state) {
    case 1:
      toiContact = env0;
      var body = env1;
      bullet = env2;
      break;
    case 2:
      toiContact = env0;
      toi = env1;
      ce = env2;
      body = env3;
      count = env4;
      found = env5;
      toiOther = env6;
      t1 = env7;
      t2 = env8;
      t3 = env9;
      bullet = env10;
      iter = env11;
      other = env12;
      type = env13;
      break;
    case 3:
      toiContact = env0;
      toi = env1;
      ce = env2;
      t4 = env3;
      count = env4;
      found = env5;
      toiOther = env6;
      t1 = env7;
      body = env8;
      t2 = env9;
      t3 = env10;
      bullet = env11;
      iter = env12;
      other = env13;
      type = env14;
      break;
    case 4:
      toiContact = env0;
      toi = env1;
      ce = env2;
      body = env3;
      count = env4;
      found = env5;
      toiOther = env6;
      t1 = env7;
      t2 = env8;
      t3 = env9;
      bullet = env10;
      iter = env11;
      t4 = env12;
      other = env13;
      break;
    case 5:
      toiContact = env0;
      toi = env1;
      ce = env2;
      body = env3;
      count = env4;
      found = env5;
      toiOther = env6;
      t1 = env7;
      t2 = env8;
      t3 = env9;
      bullet = env10;
      iter = env11;
      contact = env12;
      t4 = env13;
      other = env14;
      break;
    case 6:
      toiContact = env0;
      toi = env1;
      ce = env2;
      body = env3;
      count = env4;
      found = env5;
      toiOther = env6;
      t1 = env7;
      t2 = env8;
      t3 = env9;
      bullet = env10;
      iter = env11;
      contact = env12;
      other = env13;
      t4 = env14;
      break;
    case 7:
      toiContact = env0;
      toi = env1;
      ce = env2;
      body = env3;
      count = env4;
      found = env5;
      toiOther = env6;
      t1 = env7;
      t2 = env8;
      t3 = env9;
      bullet = env10;
      iter = env11;
      contact = env12;
      t4 = env13;
      other = env14;
      break;
    case 8:
      toiContact = env0;
      toi = env1;
      ce = env2;
      body = env3;
      count = env4;
      found = env5;
      toiOther = env6;
      t1 = env7;
      t2 = env8;
      t3 = env9;
      bullet = env10;
      iter = env11;
      contact = env12;
      other = env13;
      t4 = env14;
      break;
    case 9:
      contact = env0;
      ce = env1;
      body = env2;
      count = env3;
      t1 = env4;
      toi = env5;
      other = env6;
      t2 = env7;
      t3 = env8;
      bullet = env9;
      iter = env10;
      break;
    case 10:
      ce = env0;
      body = env1;
      t1 = env2;
      t2 = env3;
      bullet = env4;
      t3 = env5;
      toiOther = env6;
      toi = env7;
      toiContact = env8;
      found = env9;
      count = env10;
      iter = env11;
      break;
    case 11:
      toiContact = env0;
      toi = env1;
      body = env2;
      count = env3;
      found = env4;
      toiOther = env5;
      t1 = env6;
      iter = env7;
      t2 = env8;
      t3 = env9;
      bullet = env10;
      break;
    case 12:
      t1 = env0;
      t2 = env1;
      toiOther = env2;
      body = env3;
      t3 = env4;
      toiContact = env5;
      break;
    case 13:
      t2 = env0;
      toiOther = env1;
      body = env2;
      toiContact = env3;
      t1 = env4;
      break;
    case 14:
      t2 = env0;
      toiOther = env1;
      body = env2;
      t1 = env3;
      toiContact = env4;
      break;
    case 15:
      ce = env0;
      t2 = env1;
      count = env2;
      toiOther = env3;
      body = env4;
      type = env5;
      toiContact = env6;
      break;
    case 16:
      ce = env0;
      t2 = env1;
      count = env2;
      toiOther = env3;
      contact = env4;
      t1 = env5;
      body = env6;
      toiContact = env7;
      break;
    case 17:
      ce = env0;
      t2 = env1;
      count = env2;
      toiOther = env3;
      contact = env4;
      body = env5;
      t1 = env6;
      toiContact = env7;
      break;
    case 18:
      ce = env0;
      t2 = env1;
      count = env2;
      toiOther = env3;
      contact = env4;
      t1 = env5;
      body = env6;
      toiContact = env7;
      break;
    case 19:
      ce = env0;
      t2 = env1;
      count = env2;
      toiOther = env3;
      body = env4;
      toiContact = env5;
      break;
    case 20:
      t1 = env0;
      i = env1;
      toiOther = env2;
      toiContact = env3;
      break;
    case 21:
      t1 = env0;
      toiContact = env1;
      break;
    case 22:
      toiContact = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(body, 'is$Body');
      var toiContact = $.propertyTypeCheck(null, 'is$Body');
      var bullet = $.boolTypeCheck(body.get$bullet());
    case 1:
      state = 0;
      var t1 = this.toiInput;
      var t2 = this._pool;
      var t3 = this.toiOutput;
      var toiOther = toiContact;
      var iter = 0;
      toiContact = null;
      var toi = 1.0;
      var count = null;
      var found = null;
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
      L0: while (true) {
        switch (state) {
          case 0:
            var ce = $.propertyTypeCheck(body.get$contactList(), 'is$ContactEdge');
            count = 0;
            found = false;
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
            L1: while (true) {
              switch (state) {
                case 0:
                  if (!!(ce == null)) break L1;
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                  c$1:{
                    switch (state) {
                      case 0:
                        if ($.eqB(ce.get$contact(), toiContact)) break c$1;
                        var other = $.propertyTypeCheck(ce.get$other(), 'is$Body');
                        var type = $.intTypeCheck(other.get$type());
                      case 2:
                        state = 0;
                      case 3:
                      case 4:
                        if (state == 3 || state == 4 || (state == 0 && $.eqB(bullet, true))) {
                          switch (state) {
                            case 0:
                              var t4 = other.get$flags();
                            case 3:
                              state = 0;
                              if ($.eqB($.and(t4, 64), 0)) break c$1;
                            case 4:
                              if (state == 4 || (state == 0 && !$.eqB(type, 0))) {
                                switch (state) {
                                  case 0:
                                    t4 = ce.get$contact().get$flags();
                                  case 4:
                                    state = 0;
                                    var t5 = !$.eqB($.and(t4, 16), 0);
                                    t4 = t5;
                                }
                              } else {
                                t4 = false;
                              }
                              if (t4) break c$1;
                          }
                        } else {
                          if ($.eqB(type, 2)) break c$1;
                        }
                        var contact = $.propertyTypeCheck(ce.get$contact(), 'is$Contact');
                        t4 = contact.get$enabled();
                      case 5:
                        state = 0;
                        if ($.eqB(t4, false)) break c$1;
                        t4 = contact.get$toiCount();
                      case 6:
                        state = 0;
                        if ($.gtB(t4, 10)) break c$1;
                        var fixtureA = $.propertyTypeCheck(contact.get$fixtureA(), 'is$Fixture');
                        var fixtureB = $.propertyTypeCheck(contact.get$fixtureB(), 'is$Fixture');
                        if (fixtureA.get$isSensor() === true || fixtureB.get$isSensor() === true) break c$1;
                        var bodyA = $.propertyTypeCheck(fixtureA.get$body(), 'is$Body');
                        var bodyB = $.propertyTypeCheck(fixtureB.get$body(), 'is$Body');
                        t1.get$proxyA().setFromShape$1(fixtureA.get$shape());
                        t1.get$proxyB().setFromShape$1(fixtureB.get$shape());
                        t1.get$sweepA().setFrom$1(bodyA.get$sweep());
                        t1.get$sweepB().setFrom$1(bodyB.get$sweep());
                        t1.set$tMax(toi);
                        t2.get$timeOfImpact().timeOfImpact$2(t3, t1);
                        t4 = t3.get$state();
                      case 7:
                        state = 0;
                      case 8:
                        if (state == 8 || (state == 0 && $.eqB(t4, 3))) {
                          switch (state) {
                            case 0:
                              t4 = t3.get$t();
                            case 8:
                              state = 0;
                              t4 = $.ltB(t4, toi);
                          }
                        } else {
                          t4 = false;
                        }
                      case 9:
                        if (state == 9 || (state == 0 && t4)) {
                          switch (state) {
                            case 0:
                              toi = $.numTypeCheck(t3.get$t());
                            case 9:
                              state = 0;
                              toiContact = contact;
                              toiOther = other;
                              found = true;
                          }
                        }
                        count = $.intTypeCheck($.add(count, 1));
                      case 10:
                        state = 0;
                    }
                  }
                  ce = $.propertyTypeCheck(ce.get$next(), 'is$ContactEdge');
              }
            }
            iter = $.intTypeCheck($.add(iter, 1));
          case 11:
            state = 0;
            if (!(found === true && $.gtB(count, 1) && $.ltB(iter, 50))) break L0;
        }
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
    case 12:
      state = 0;
      if ($.eqB(t3, false)) {
        body.get$sweep().setFrom$1(t1);
        this.solveTimeOfImpactGivenBody$1(body);
      }
      t1 = toiContact.get$toiCount();
    case 13:
      state = 0;
      toiContact.set$toiCount($.add(t1, 1));
      t1 = this.contacts;
    case 14:
      if (state == 14 || (state == 0 && !(t1 == null))) {
        switch (state) {
          case 0:
            t1 = $.get$length(t1);
          case 14:
            state = 0;
            t1 = $.ltB(t1, 32);
        }
      } else {
        t1 = true;
      }
      if (t1) {
        t1 = $.ListFactory_List(32);
        $.setRuntimeTypeInfo(t1, ({E: 'Contact'}));
        this.contacts = t1;
      }
      ce = $.propertyTypeCheck(body.get$contactList(), 'is$ContactEdge');
      count = 0;
    case 15:
    case 16:
    case 17:
    case 18:
    case 19:
      L2: while (true) {
        switch (state) {
          case 0:
            if (!(!(ce == null) && $.ltB(count, 32))) break L2;
          case 15:
          case 16:
          case 17:
          case 18:
          case 19:
            c$0:{
              switch (state) {
                case 0:
                  type = $.intTypeCheck($.propertyTypeCheck(ce.get$other(), 'is$Body').get$type());
                case 15:
                  state = 0;
                  if ($.eqB(type, 2)) break c$0;
                  contact = $.propertyTypeCheck(ce.get$contact(), 'is$Contact');
                  t1 = contact.get$enabled();
                case 16:
                  state = 0;
                  if ($.eqB(t1, false)) break c$0;
                  fixtureA = $.propertyTypeCheck(contact.get$fixtureA(), 'is$Fixture');
                  fixtureB = $.propertyTypeCheck(contact.get$fixtureB(), 'is$Fixture');
                  if (fixtureA.get$isSensor() === true || fixtureB.get$isSensor() === true) break c$0;
                  !$.eqB(contact, toiContact) && contact.update$1(t2.get$contactListener());
                  t1 = contact.get$enabled();
                case 17:
                  state = 0;
                  if ($.eqB(t1, false)) break c$0;
                  t1 = contact.get$touching();
                case 18:
                  state = 0;
                  if ($.eqB(t1, false)) break c$0;
                  $.indexSet(this.contacts, count, contact);
                  count = $.intTypeCheck($.add(count, 1));
                case 19:
                  state = 0;
              }
            }
            ce = $.propertyTypeCheck(ce.get$next(), 'is$ContactEdge');
        }
      }
      t1 = this.toiSolver;
      t1.initialize$3(this.contacts, count, body);
      var i = 0;
    case 20:
      L3: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, 20)) break L3;
            if ($.boolTypeCheck(t1.solve$1(0.75)) === true) break L3;
            i = $.intTypeCheck($.add(i, 1));
          case 20:
            state = 0;
        }
      }
      t1 = toiOther.get$type();
    case 21:
      state = 0;
    case 22:
      if (state == 22 || (state == 0 && !$.eqB(t1, 0))) {
        switch (state) {
          case 0:
            t1 = toiContact.get$flags();
          case 22:
            state = 0;
            toiContact.set$flags($.or(t1, 16));
        }
      }
  }
 },
 solveTimeOfImpact$0: function() {
  for (var c = $.propertyTypeCheck(this._contactManager.get$contactList(), 'is$Contact'); !(c == null); c = $.propertyTypeCheck(c.get$next(), 'is$Contact')) {
    c.set$flags($.or(c.get$flags(), 4));
    c.set$toiCount(0);
  }
  for (var body = $.propertyTypeCheck(this._bodyList, 'is$Body'); !(body == null); body = $.propertyTypeCheck(body.get$next(), 'is$Body')) {
    if ($.eqB($.and(body.get$flags(), 1), 0) || $.eqB(body.get$type(), 1) || $.eqB(body.get$type(), 0)) body.set$flags($.or(body.get$flags(), 64));
    else body.set$flags($.and(body.get$flags(), -65));
  }
  for (body = $.propertyTypeCheck(this._bodyList, 'is$Body'); !(body == null); body = $.propertyTypeCheck(body.get$next(), 'is$Body')) {
    if ($.eqB($.and(body.get$flags(), 64), 64)) continue;
    if ($.eqB(body.get$bullet(), true)) continue;
    this.solveTimeOfImpactGivenBody$1(body);
    body.set$flags($.or(body.get$flags(), 64));
  }
  for (body = $.propertyTypeCheck(this._bodyList, 'is$Body'); !(body == null); body = $.propertyTypeCheck(body.get$next(), 'is$Body')) {
    if ($.eqB($.and(body.get$flags(), 64), 64)) continue;
    if ($.eqB(body.get$bullet(), false)) continue;
    this.solveTimeOfImpactGivenBody$1(body);
    body.set$flags($.or(body.get$flags(), 64));
  }
 },
 solve$1: function(timeStep) {
  $.propertyTypeCheck(timeStep, 'is$TimeStep');
  var t1 = this.island;
  var t2 = this._bodyCount;
  var t3 = this._contactManager;
  t1.init$4(t2, t3.contactCount, this._jointCount, t3.contactListener);
  for (var b = $.propertyTypeCheck(this._bodyList, 'is$Body'); !(b == null); b = $.propertyTypeCheck(b.get$next(), 'is$Body')) {
    b.set$flags($.and(b.get$flags(), -2));
  }
  for (var c = $.propertyTypeCheck(t3.contactList, 'is$Contact'); !(c == null); c = $.propertyTypeCheck(c.get$next(), 'is$Contact')) {
    c.set$flags($.and(c.get$flags(), -2));
  }
  for (var j = $.propertyTypeCheck(this.get$jointList(), 'is$Joint'); !(j == null); j = $.propertyTypeCheck(j.get$_lib0_next(), 'is$Joint')) {
    j.set$islandFlag(false);
  }
  var stackSize = $.intTypeCheck(this._bodyCount);
  if (stackSize !== (stackSize | 0)) return this.solve$1$bailout(1, t3, stackSize, timeStep, t1, 0, 0, 0, 0);
  if ($.ltB(this.stack.length, stackSize)) {
    t2 = $.ListFactory_List(stackSize);
    $.setRuntimeTypeInfo(t2, ({E: 'Body'}));
    this.stack = t2;
  }
  for (var seed = $.propertyTypeCheck(this._bodyList, 'is$Body'), t2 = this._gravity, t4 = this._allowSleep; !(seed == null); seed = $.propertyTypeCheck(seed.get$next(), 'is$Body')) {
    if ($.eqB($.and(seed.get$flags(), 1), 1)) continue;
    if ($.eqB(seed.get$awake(), false) || $.eqB(seed.get$active(), false)) continue;
    if ($.eqB(seed.get$type(), 0)) continue;
    t1.clear$0();
    this.stack[0] = seed;
    seed.set$flags($.or(seed.get$flags(), 1));
    for (var stackCount = 1; $.gtB(stackCount, 0); ) {
      var t5 = this.stack;
      stackCount = $.intTypeCheck($.sub(stackCount, 1));
      if (stackCount !== (stackCount | 0)) return this.solve$1$bailout(2, stackSize, t2, timeStep, t4, seed, t5, stackCount, t1);
      b = $.propertyTypeCheck(t5[stackCount], 'is$Body');
      $.assert(b.get$active());
      t1.addBody$1(b);
      b.set$awake(true);
      if ($.eqB(b.get$type(), 0)) continue;
      for (var ce = $.propertyTypeCheck(b.get$contactList(), 'is$ContactEdge'); !(ce == null); ce = $.propertyTypeCheck(ce.get$next(), 'is$ContactEdge')) {
        var contact = $.propertyTypeCheck(ce.get$contact(), 'is$Contact');
        if ($.eqB($.and(contact.get$flags(), 1), 1)) continue;
        if ($.eqB(contact.get$enabled(), false) || $.eqB(contact.get$touching(), false)) continue;
        var sensorA = $.boolTypeCheck(contact.get$fixtureA().get$isSensor());
        var sensorB = $.boolTypeCheck(contact.get$fixtureB().get$isSensor());
        if (sensorA === true || sensorB === true) continue;
        t1.addContact$1(contact);
        contact.set$flags($.or(contact.get$flags(), 1));
        var other = $.propertyTypeCheck(ce.get$other(), 'is$Body');
        if ($.eqB($.and(other.get$flags(), 1), 1)) continue;
        $.assert($.lt(stackCount, stackSize));
        t5 = this.stack;
        var stackCount0 = $.intTypeCheck($.add(stackCount, 1));
        $.indexSet(t5, stackCount, other);
        other.set$flags($.or(other.get$flags(), 1));
        stackCount = stackCount0;
      }
      for (var je = $.propertyTypeCheck(b.get$jointList(), 'is$JointEdge'); !(je == null); je = $.propertyTypeCheck(je.get$next(), 'is$JointEdge')) {
        if ($.eqB(je.get$joint().get$islandFlag(), true)) continue;
        other = $.propertyTypeCheck(je.get$other(), 'is$Body');
        if ($.eqB(other.get$active(), false)) continue;
        t1.addJoint$1(je.get$joint());
        je.get$joint().set$islandFlag(true);
        if ($.eqB($.and(other.get$flags(), 1), 1)) continue;
        $.assert($.lt(stackCount, stackSize));
        t5 = this.stack;
        stackCount0 = $.intTypeCheck($.add(stackCount, 1));
        $.indexSet(t5, stackCount, other);
        other.set$flags($.or(other.get$flags(), 1));
        stackCount = stackCount0;
      }
    }
    t1.solve$3(timeStep, t2, t4);
    for (var i = 0; $.ltB(i, t1.bodyCount); i = $.intTypeCheck($.add(i, 1))) {
      b = $.propertyTypeCheck($.index(t1.bodies, i), 'is$Body');
      $.eqB(b.get$type(), 0) && b.set$flags($.and(b.get$flags(), -2));
    }
  }
  for (b = $.propertyTypeCheck(this._bodyList, 'is$Body'); !(b == null); b = $.propertyTypeCheck(b.get$next(), 'is$Body')) {
    if ($.eqB($.and(b.get$flags(), 1), 0)) continue;
    if ($.eqB(b.get$type(), 0)) continue;
    b.synchronizeFixtures$0();
  }
  t3.findNewContacts$0();
 },
 solve$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7) {
  switch (state) {
    case 1:
      t3 = env0;
      stackSize = env1;
      var timeStep = env2;
      t1 = env3;
      break;
    case 2:
      stackSize = env0;
      t2 = env1;
      timeStep = env2;
      t4 = env3;
      seed = env4;
      t5 = env5;
      stackCount = env6;
      t1 = env7;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(timeStep, 'is$TimeStep');
      var t1 = this.island;
      var t2 = this._bodyCount;
      var t3 = this._contactManager;
      t1.init$4(t2, t3.get$contactCount(), this._jointCount, t3.get$contactListener());
      for (var b = $.propertyTypeCheck(this._bodyList, 'is$Body'); !(b == null); b = $.propertyTypeCheck(b.get$next(), 'is$Body')) {
        b.set$flags($.and(b.get$flags(), -2));
      }
      for (var c = $.propertyTypeCheck(t3.get$contactList(), 'is$Contact'); !(c == null); c = $.propertyTypeCheck(c.get$next(), 'is$Contact')) {
        c.set$flags($.and(c.get$flags(), -2));
      }
      for (var j = $.propertyTypeCheck(this.get$jointList(), 'is$Joint'); !(j == null); j = $.propertyTypeCheck(j.get$_lib0_next(), 'is$Joint')) {
        j.set$islandFlag(false);
      }
      var stackSize = $.intTypeCheck(this._bodyCount);
    case 1:
      state = 0;
      if ($.ltB($.get$length(this.stack), stackSize)) {
        t2 = $.ListFactory_List(stackSize);
        $.setRuntimeTypeInfo(t2, ({E: 'Body'}));
        this.stack = t2;
      }
      var seed = $.propertyTypeCheck(this._bodyList, 'is$Body');
      t2 = this._gravity;
      var t4 = this._allowSleep;
    case 2:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!!(seed == null)) break L0;
          case 2:
            c$0:{
              switch (state) {
                case 0:
                  if ($.eqB($.and(seed.get$flags(), 1), 1)) break c$0;
                  if ($.eqB(seed.get$awake(), false) || $.eqB(seed.get$active(), false)) break c$0;
                  if ($.eqB(seed.get$type(), 0)) break c$0;
                  $.clear(t1);
                  $.indexSet(this.stack, 0, seed);
                  seed.set$flags($.or(seed.get$flags(), 1));
                  var stackCount = 1;
                case 2:
                  L1: while (true) {
                    switch (state) {
                      case 0:
                        if (!$.gtB(stackCount, 0)) break L1;
                      case 2:
                        c$1:{
                          switch (state) {
                            case 0:
                              var t5 = this.stack;
                              stackCount = $.intTypeCheck($.sub(stackCount, 1));
                            case 2:
                              state = 0;
                              b = $.propertyTypeCheck($.index(t5, stackCount), 'is$Body');
                              $.assert(b.get$active());
                              t1.addBody$1(b);
                              b.set$awake(true);
                              if ($.eqB(b.get$type(), 0)) break c$1;
                              for (var ce = $.propertyTypeCheck(b.get$contactList(), 'is$ContactEdge'); !(ce == null); ce = $.propertyTypeCheck(ce.get$next(), 'is$ContactEdge')) {
                                var contact = $.propertyTypeCheck(ce.get$contact(), 'is$Contact');
                                if ($.eqB($.and(contact.get$flags(), 1), 1)) continue;
                                if ($.eqB(contact.get$enabled(), false) || $.eqB(contact.get$touching(), false)) continue;
                                var sensorA = $.boolTypeCheck(contact.get$fixtureA().get$isSensor());
                                var sensorB = $.boolTypeCheck(contact.get$fixtureB().get$isSensor());
                                if (sensorA === true || sensorB === true) continue;
                                t1.addContact$1(contact);
                                contact.set$flags($.or(contact.get$flags(), 1));
                                var other = $.propertyTypeCheck(ce.get$other(), 'is$Body');
                                if ($.eqB($.and(other.get$flags(), 1), 1)) continue;
                                $.assert($.lt(stackCount, stackSize));
                                t5 = this.stack;
                                var stackCount0 = $.intTypeCheck($.add(stackCount, 1));
                                $.indexSet(t5, stackCount, other);
                                other.set$flags($.or(other.get$flags(), 1));
                                stackCount = stackCount0;
                              }
                              for (var je = $.propertyTypeCheck(b.get$jointList(), 'is$JointEdge'); !(je == null); je = $.propertyTypeCheck(je.get$next(), 'is$JointEdge')) {
                                if ($.eqB(je.get$joint().get$islandFlag(), true)) continue;
                                other = $.propertyTypeCheck(je.get$other(), 'is$Body');
                                if ($.eqB(other.get$active(), false)) continue;
                                t1.addJoint$1(je.get$joint());
                                je.get$joint().set$islandFlag(true);
                                if ($.eqB($.and(other.get$flags(), 1), 1)) continue;
                                $.assert($.lt(stackCount, stackSize));
                                t5 = this.stack;
                                stackCount0 = $.intTypeCheck($.add(stackCount, 1));
                                $.indexSet(t5, stackCount, other);
                                other.set$flags($.or(other.get$flags(), 1));
                                stackCount = stackCount0;
                              }
                          }
                        }
                    }
                  }
                  t1.solve$3(timeStep, t2, t4);
                  for (var i = 0; $.ltB(i, t1.get$bodyCount()); i = $.intTypeCheck($.add(i, 1))) {
                    b = $.propertyTypeCheck($.index(t1.get$bodies(), i), 'is$Body');
                    $.eqB(b.get$type(), 0) && b.set$flags($.and(b.get$flags(), -2));
                  }
              }
            }
            seed = $.propertyTypeCheck(seed.get$next(), 'is$Body');
        }
      }
      for (b = $.propertyTypeCheck(this._bodyList, 'is$Body'); !(b == null); b = $.propertyTypeCheck(b.get$next(), 'is$Body')) {
        if ($.eqB($.and(b.get$flags(), 1), 0)) continue;
        if ($.eqB(b.get$type(), 0)) continue;
        b.synchronizeFixtures$0();
      }
      t3.findNewContacts$0();
  }
 },
 get$jointList: function() {
  return this._jointList;
 },
 get$locked: function() {
  var t1 = this._flags;
  if (t1 !== (t1 | 0)) return this.get$locked$bailout(1, t1);
  t1 = t1 & 2;
  return t1 === 2;
 },
 get$locked$bailout: function(state, t1) {
  return $.eq($.and(t1, 2), 2);
 },
 get$contactCount: function() {
  return this._contactManager.get$contactCount();
 },
 get$contactList: function() {
  return this._contactManager.get$contactList();
 },
 clearForces$0: function() {
  for (var body = $.propertyTypeCheck(this._bodyList, 'is$Body'); !(body == null); body = $.propertyTypeCheck(body.get$next(), 'is$Body')) {
    body.get$_force().setZero$0();
    body.set$_torque(0.0);
  }
 },
 step$3: function(dt, velocityIterations, positionIterations) {
  $.numTypeCheck(dt);
  if (typeof dt !== 'number') return this.step$3$bailout(1, velocityIterations, positionIterations, dt, 0);
  $.intTypeCheck(velocityIterations);
  $.intTypeCheck(positionIterations);
  var t1 = this._flags;
  if (t1 !== (t1 | 0)) return this.step$3$bailout(2, t1, dt, velocityIterations, positionIterations);
  t1 = t1 & 1;
  if (t1 === 1) {
    this._contactManager.findNewContacts$0();
    t1 = this._flags;
    if (t1 !== (t1 | 0)) return this.step$3$bailout(3, t1, dt, velocityIterations, positionIterations);
    this._flags = (t1 & -2) >>> 0;
  }
  t1 = this._flags;
  if (t1 !== (t1 | 0)) return this.step$3$bailout(4, t1, dt, velocityIterations, positionIterations);
  this._flags = (t1 | 2) >>> 0;
  var t2 = this.timestep;
  t2.dt = dt;
  t2.velocityIterations = velocityIterations;
  t2.positionIterations = positionIterations;
  if (dt > 0.0) t2.inv_dt = 1.0 / dt;
  else t2.inv_dt = 0.0;
  t1 = this._inverseTimestep;
  if (typeof t1 !== 'number') return this.step$3$bailout(5, t1, t2, dt, 0);
  t2.dtRatio = t1 * dt;
  t2.warmStarting = this._warmStarting;
  this._contactManager.collide$0();
  t1 = t2.dt;
  if (typeof t1 !== 'number') return this.step$3$bailout(6, t1, t2, 0, 0);
  t1 > 0.0 && this.solve$1(t2);
  if (this._continuousPhysics) {
    t1 = t2.dt;
    if (typeof t1 !== 'number') return this.step$3$bailout(7, t1, t2, 0, 0);
    t1 = t1 > 0.0;
  } else t1 = false;
  t1 && this.solveTimeOfImpact$0();
  t1 = t2.dt;
  if (typeof t1 !== 'number') return this.step$3$bailout(8, t1, t2, 0, 0);
  if (t1 > 0.0) this._inverseTimestep = t2.inv_dt;
  t1 = this._flags;
  if (t1 !== (t1 | 0)) return this.step$3$bailout(9, t1, 0, 0, 0);
  t1 = t1 & 4;
  t1 === 4 && this.clearForces$0();
  t1 = this._flags;
  if (t1 !== (t1 | 0)) return this.step$3$bailout(10, t1, 0, 0, 0);
  this._flags = (t1 & -3) >>> 0;
 },
 step$3$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var velocityIterations = env0;
      var positionIterations = env1;
      var dt = env2;
      break;
    case 2:
      t1 = env0;
      dt = env1;
      velocityIterations = env2;
      positionIterations = env3;
      break;
    case 3:
      t1 = env0;
      dt = env1;
      velocityIterations = env2;
      positionIterations = env3;
      break;
    case 4:
      t1 = env0;
      dt = env1;
      velocityIterations = env2;
      positionIterations = env3;
      break;
    case 5:
      t1 = env0;
      t2 = env1;
      dt = env2;
      break;
    case 6:
      t1 = env0;
      t2 = env1;
      break;
    case 7:
      t1 = env0;
      t2 = env1;
      break;
    case 8:
      t1 = env0;
      t2 = env1;
      break;
    case 9:
      t1 = env0;
      break;
    case 10:
      t1 = env0;
      break;
  }
  switch (state) {
    case 0:
      $.numTypeCheck(dt);
    case 1:
      state = 0;
      $.intTypeCheck(velocityIterations);
      $.intTypeCheck(positionIterations);
      var t1 = this._flags;
    case 2:
      state = 0;
    case 3:
      if (state == 3 || (state == 0 && $.eqB($.and(t1, 1), 1))) {
        switch (state) {
          case 0:
            this._contactManager.findNewContacts$0();
            t1 = this._flags;
          case 3:
            state = 0;
            this._flags = $.and(t1, -2);
        }
      }
      t1 = this._flags;
    case 4:
      state = 0;
      this._flags = $.or(t1, 2);
      var t2 = this.timestep;
      t2.set$dt(dt);
      t2.set$velocityIterations(velocityIterations);
      t2.set$positionIterations(positionIterations);
      if ($.gtB(dt, 0.0)) {
        if (typeof dt !== 'number') throw $.iae(dt);
        t2.set$inv_dt(1.0 / dt);
      } else t2.set$inv_dt(0.0);
      t1 = this._inverseTimestep;
    case 5:
      state = 0;
      t2.set$dtRatio($.mul(t1, dt));
      t2.set$warmStarting(this._warmStarting);
      this._contactManager.collide$0();
      t1 = t2.get$dt();
    case 6:
      state = 0;
      $.gtB(t1, 0.0) && this.solve$1(t2);
    case 7:
      if (state == 7 || (state == 0 && this._continuousPhysics === true)) {
        switch (state) {
          case 0:
            t1 = t2.get$dt();
          case 7:
            state = 0;
            t1 = $.gtB(t1, 0.0);
        }
      } else {
        t1 = false;
      }
      t1 && this.solveTimeOfImpact$0();
      t1 = t2.get$dt();
    case 8:
      state = 0;
      if ($.gtB(t1, 0.0)) this._inverseTimestep = t2.get$inv_dt();
      t1 = this._flags;
    case 9:
      state = 0;
      $.eqB($.and(t1, 4), 4) && this.clearForces$0();
      t1 = this._flags;
    case 10:
      state = 0;
      this._flags = $.and(t1, -3);
  }
 },
 createJoint$1: function(def) {
  $.propertyTypeCheck(def, 'is$JointDef');
  var t1 = this.get$locked();
  if (typeof t1 !== 'boolean') return this.createJoint$1$bailout(1, def, t1, 0, 0);
  $.assert(!t1);
  if (this.get$locked() === true) return;
  var j = $.propertyTypeCheck($.Joint_Joint$create(this, def), 'is$Joint');
  j.set$_prev(null);
  j.set$_lib0_next(this._jointList);
  t1 = this._jointList;
  !(t1 == null) && t1.set$_prev(j);
  this._jointList = j;
  this._jointCount = this._jointCount + 1;
  j.get$edgeA().set$joint(j);
  t1 = j.get$bodyB();
  j.get$edgeA().set$other(t1);
  j.get$edgeA().set$prev(null);
  t1 = j.get$bodyA().get$jointList();
  j.get$edgeA().set$next(t1);
  t1 = j.get$bodyA().get$jointList();
  if (!(t1 == null)) {
    t1 = j.get$edgeA();
    j.get$bodyA().get$jointList().set$prev(t1);
  }
  t1 = j.get$edgeA();
  j.get$bodyA().set$jointList(t1);
  j.get$edgeB().set$joint(j);
  t1 = j.get$bodyA();
  j.get$edgeB().set$other(t1);
  j.get$edgeB().set$prev(null);
  t1 = j.get$bodyB().get$jointList();
  j.get$edgeB().set$next(t1);
  t1 = j.get$bodyB().get$jointList();
  if (!(t1 == null)) {
    t1 = j.get$edgeB();
    j.get$bodyB().get$jointList().set$prev(t1);
  }
  t1 = j.get$edgeB();
  j.get$bodyB().set$jointList(t1);
  var bodyA = $.propertyTypeCheck(def.get$bodyA(), 'is$Body');
  var bodyB = $.propertyTypeCheck(def.get$bodyB(), 'is$Body');
  t1 = def.get$collideConnected();
  if (typeof t1 !== 'boolean') return this.createJoint$1$bailout(2, t1, j, bodyA, bodyB);
  if (!t1) {
    var edge = $.propertyTypeCheck(bodyB.get$contactList(), 'is$ContactEdge');
    for (; !(edge == null); ) {
      $.eqB(edge.get$other(), bodyA) && edge.get$contact().flagForFiltering$0();
      edge = $.propertyTypeCheck(edge.get$next(), 'is$ContactEdge');
    }
  }
  return j;
 },
 createJoint$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var def = env0;
      t1 = env1;
      break;
    case 2:
      t1 = env0;
      j = env1;
      bodyA = env2;
      bodyB = env3;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(def, 'is$JointDef');
      var t1 = this.get$locked();
    case 1:
      state = 0;
      $.assert($.eq(t1, false));
      if (this.get$locked() === true) return;
      var j = $.propertyTypeCheck($.Joint_Joint$create(this, def), 'is$Joint');
      j.set$_prev(null);
      j.set$_lib0_next(this._jointList);
      t1 = this._jointList;
      !(t1 == null) && t1.set$_prev(j);
      this._jointList = j;
      this._jointCount = this._jointCount + 1;
      j.get$edgeA().set$joint(j);
      t1 = j.get$bodyB();
      j.get$edgeA().set$other(t1);
      j.get$edgeA().set$prev(null);
      t1 = j.get$bodyA().get$jointList();
      j.get$edgeA().set$next(t1);
      t1 = j.get$bodyA().get$jointList();
      if (!(t1 == null)) {
        t1 = j.get$edgeA();
        j.get$bodyA().get$jointList().set$prev(t1);
      }
      t1 = j.get$edgeA();
      j.get$bodyA().set$jointList(t1);
      j.get$edgeB().set$joint(j);
      t1 = j.get$bodyA();
      j.get$edgeB().set$other(t1);
      j.get$edgeB().set$prev(null);
      t1 = j.get$bodyB().get$jointList();
      j.get$edgeB().set$next(t1);
      t1 = j.get$bodyB().get$jointList();
      if (!(t1 == null)) {
        t1 = j.get$edgeB();
        j.get$bodyB().get$jointList().set$prev(t1);
      }
      t1 = j.get$edgeB();
      j.get$bodyB().set$jointList(t1);
      var bodyA = $.propertyTypeCheck(def.get$bodyA(), 'is$Body');
      var bodyB = $.propertyTypeCheck(def.get$bodyB(), 'is$Body');
      t1 = def.get$collideConnected();
    case 2:
      state = 0;
      if ($.eqB(t1, false)) {
        var edge = $.propertyTypeCheck(bodyB.get$contactList(), 'is$ContactEdge');
        for (; !(edge == null); ) {
          $.eqB(edge.get$other(), bodyA) && edge.get$contact().flagForFiltering$0();
          edge = $.propertyTypeCheck(edge.get$next(), 'is$ContactEdge');
        }
      }
      return j;
  }
 },
 createBody$1: function(def) {
  $.propertyTypeCheck(def, 'is$BodyDef');
  var t1 = this.get$locked();
  if (typeof t1 !== 'boolean') return this.createBody$1$bailout(1, def, t1);
  $.assert(!t1);
  if (this.get$locked() === true) return;
  var b = $.Body$(def, this);
  b.prev = null;
  b.next = this._bodyList;
  t1 = this._bodyList;
  !(t1 == null) && t1.set$prev(b);
  this._bodyList = b;
  this._bodyCount = this._bodyCount + 1;
  return b;
 },
 createBody$1$bailout: function(state, def, t1) {
  $.assert($.eq(t1, false));
  if (this.get$locked() === true) return;
  var b = $.Body$(def, this);
  b.prev = null;
  b.next = this._bodyList;
  t1 = this._bodyList;
  !(t1 == null) && t1.set$prev(b);
  this._bodyList = b;
  this._bodyCount = this._bodyCount + 1;
  return b;
 },
 get$contactListener: function() {
  return this._contactManager.get$contactListener();
 },
 pushContact$1: function(contact) {
  $.propertyTypeCheck(contact, 'is$Contact');
  if ($.gtB(contact.get$manifold().get$pointCount(), 0)) {
    contact.get$fixtureA().get$body().set$awake(true);
    contact.get$fixtureB().get$body().set$awake(true);
  }
  var type1 = $.intTypeCheck(contact.get$fixtureA().get$type());
  var type2 = $.intTypeCheck(contact.get$fixtureB().get$type());
  var t1 = this._contactStacks;
  if (type1 !== (type1 | 0)) throw $.iae(type1);
  var t2 = t1.length;
  if (type1 < 0 || type1 >= t2) throw $.ioore(type1);
  $.propertyTypeCheck($.index(t1[type1], type2).get$creator(), 'is$Queue').addFirst$1(contact);
 },
 _getFreshContactStack$2: function(type1, type2) {
  $.intTypeCheck(type1);
  $.intTypeCheck(type2);
  if ($.eqB(type1, 0) && $.eqB(type2, 0)) return this._pool.getCircleContactStack$0();
  var t1 = $.eqB(type1, 1) && $.eqB(type2, 1);
  var t2 = this._pool;
  if (t1) return t2.getPolyContactStack$0();
  return t2.getPolyCircleContactStack$0();
 },
 popContact$2: function(fixtureA, fixtureB) {
  $.propertyTypeCheck(fixtureA, 'is$Fixture');
  $.propertyTypeCheck(fixtureB, 'is$Fixture');
  var type1 = $.intTypeCheck(fixtureA.get$type());
  var type2 = $.intTypeCheck(fixtureB.get$type());
  var t1 = this._contactStacks;
  if (type1 !== (type1 | 0)) throw $.iae(type1);
  var t2 = t1.length;
  if (type1 < 0 || type1 >= t2) throw $.ioore(type1);
  var reg = $.propertyTypeCheck($.index(t1[type1], type2), 'is$ContactRegister');
  var creator = $.propertyTypeCheck(reg.get$creator(), 'is$Queue');
  if (!(creator == null)) {
    if ($.isEmpty(creator) === true) creator = $.propertyTypeCheck(this._getFreshContactStack$2(type1, type2), 'is$Queue');
    if (reg.get$primary() === true) {
      var c = $.propertyTypeCheck(creator.removeFirst$0(), 'is$Contact');
      c.init$2(fixtureA, fixtureB);
      return c;
    }
    c = $.propertyTypeCheck(creator.removeFirst$0(), 'is$Contact');
    c.init$2(fixtureB, fixtureA);
    return c;
  }
  return;
 },
 _initializeRegisters$0: function() {
  var t1 = this._pool;
  this._addType$3(t1.getCircleContactStack$0(), 0, 0);
  this._addType$3(t1.getPolyCircleContactStack$0(), 1, 0);
  this._addType$3(t1.getPolyContactStack$0(), 1, 1);
 },
 _addType$3: function(creatorStack, type1, type2) {
  $.propertyTypeCheck(creatorStack, 'is$Queue');
  $.intTypeCheck(type1);
  $.intTypeCheck(type2);
  var register = $.ContactRegister$();
  register.creator = creatorStack;
  register.primary = true;
  var t1 = this._contactStacks;
  if (type1 !== (type1 | 0)) throw $.iae(type1);
  var t2 = t1.length;
  if (type1 < 0 || type1 >= t2) throw $.ioore(type1);
  $.indexSet(t1[type1], type2, register);
  if (!(type1 === type2)) {
    var register2 = $.ContactRegister$();
    register2.creator = creatorStack;
    register2.primary = false;
    if (type2 !== (type2 | 0)) throw $.iae(type2);
    t2 = t1.length;
    if (type2 < 0 || type2 >= t2) throw $.ioore(type2);
    $.indexSet(t1[type2], type1, register2);
  }
 },
 World$3: function(gravity, doSleep, argPool) {
  $.propertyTypeCheck(gravity, 'is$Vector');
  $.boolTypeCheck(doSleep);
  $.propertyTypeCheck(argPool, 'is$DefaultWorldPool');
  this._contactManager = $.ContactManager$(this);
  for (var t1 = this._contactStacks, i = 0; $.ltB(i, t1.length); i = $.intTypeCheck($.add(i, 1))) {
    var t2 = $.ListFactory_List(2);
    $.setRuntimeTypeInfo(t2, ({E: 'ContactRegister'}));
    if (i !== (i | 0)) throw $.iae(i);
    var t3 = t1.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    t1[i] = t2;
  }
  this._initializeRegisters$0();
 },
 is$World: true
};

$$.WorldQueryWrapper = {"":
 ["callback", "broadPhase?"],
 super: "Object",
 treeCallback$1: function(node) {
  var fixture = $.propertyTypeCheck($.propertyTypeCheck(node, 'is$DynamicTreeNode').get$userData(), 'is$Fixture');
  return this.callback.reportFixture$1(fixture);
 },
 is$TreeCallback: true
};

$$.Contact = {"":
 ["toiCount=", "manifold?", "fixtureB?", "fixtureA?", "edge2?", "edge1?", "next=", "prev=", "flags="],
 super: "Object",
 update$1: function(listener) {
  $.propertyTypeCheck(listener, 'is$ContactListener');
  var t1 = this._oldManifold;
  var t2 = this.manifold;
  t1.setFrom$1(t2);
  var t3 = this.flags;
  if (t3 !== (t3 | 0)) return this.update$1$bailout(1, t2, t3, listener, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  this.flags = (t3 | 4) >>> 0;
  var t4 = this.flags;
  if (t4 !== (t4 | 0)) return this.update$1$bailout(2, t2, listener, t4, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  t4 = t4 & 2;
  var wasTouching = t4 === 2;
  var sensorA = $.boolTypeCheck(this.fixtureA.get$isSensor());
  var sensorB = $.boolTypeCheck(this.fixtureB.get$isSensor());
  var sensor = sensorA === true || sensorB === true;
  var bodyA = $.propertyTypeCheck(this.fixtureA.get$body(), 'is$Body');
  var bodyB = $.propertyTypeCheck(this.fixtureB.get$body(), 'is$Body');
  var xfA = $.propertyTypeCheck(bodyA.get$originTransform(), 'is$Transform');
  var xfB = $.propertyTypeCheck(bodyB.get$originTransform(), 'is$Transform');
  if (sensor) {
    var shapeA = $.propertyTypeCheck(this.fixtureA.get$shape(), 'is$Shape');
    var shapeB = $.propertyTypeCheck(this.fixtureB.get$shape(), 'is$Shape');
    var touching = $.boolTypeCheck(this.pool.get$collision().testOverlap$4(shapeA, shapeB, xfA, xfB));
    if (typeof touching !== 'boolean') return this.update$1$bailout(4, listener, sensor, wasTouching, t1, t2, touching, 0, 0, 0, 0, 0, 0, 0);
    t2.pointCount = 0;
  } else {
    this.evaluate$3(t2, xfA, xfB);
    t3 = t2.pointCount;
    if (typeof t3 !== 'number') return this.update$1$bailout(5, t3, listener, sensor, wasTouching, t1, t2, bodyA, bodyB, 0, 0, 0, 0, 0);
    touching = t3 > 0;
    t3 = t2.points;
    t4 = t1.points;
    var i = 0;
    while (true) {
      var t5 = t2.pointCount;
      if (typeof t5 !== 'number') return this.update$1$bailout(7, listener, sensor, touching, wasTouching, t1, t2, bodyA, bodyB, i, t5, 0, 0, 0);
      if (!(i < t5)) break;
      if (typeof t3 !== 'string' && (typeof t3 !== 'object' || t3 === null || (t3.constructor !== Array && !t3.is$JavaScriptIndexingBehavior()))) return this.update$1$bailout(8, sensor, listener, touching, wasTouching, t1, t2, bodyA, bodyB, i, t3, 0, 0, 0);
      t5 = t3.length;
      if (i < 0 || i >= t5) throw $.ioore(i);
      var mp2 = $.propertyTypeCheck(t3[i], 'is$ManifoldPoint');
      mp2.set$normalImpulse(0.0);
      mp2.set$tangentImpulse(0.0);
      var id2 = $.propertyTypeCheck(mp2.get$id(), 'is$ContactID');
      var j = 0;
      while (true) {
        t5 = t1.pointCount;
        if (typeof t5 !== 'number') return this.update$1$bailout(9, mp2, listener, sensor, id2, touching, t1, t2, bodyA, bodyB, i, j, wasTouching, t5);
        if (!(j < t5)) break;
        if (typeof t4 !== 'string' && (typeof t4 !== 'object' || t4 === null || (t4.constructor !== Array && !t4.is$JavaScriptIndexingBehavior()))) return this.update$1$bailout(10, mp2, t4, listener, sensor, id2, touching, t1, t2, bodyA, bodyB, i, j, wasTouching);
        t5 = t4.length;
        if (j < 0 || j >= t5) throw $.ioore(j);
        var mp1 = $.propertyTypeCheck(t4[j], 'is$ManifoldPoint');
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
  if (t2 !== (t2 | 0)) return this.update$1$bailout(13, listener, sensor, wasTouching, t1, touching, t2, touching, 0, 0, 0, 0, 0, 0);
  if (touching) this.flags = (t2 | 2) >>> 0;
  else this.flags = (t2 & -3) >>> 0;
  if (listener == null) return;
  !wasTouching && touching && listener.beginContact$1(this);
  wasTouching && !touching && listener.endContact$1(this);
  !sensor && touching && listener.preSolve$2(this, t1);
 },
 update$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12) {
  switch (state) {
    case 1:
      t2 = env0;
      t3 = env1;
      var listener = env2;
      t1 = env3;
      break;
    case 2:
      t2 = env0;
      listener = env1;
      t4 = env2;
      t1 = env3;
      break;
    case 3:
      t2 = env0;
      listener = env1;
      wasTouching = env2;
      t1 = env3;
      break;
    case 4:
      listener = env0;
      sensor = env1;
      wasTouching = env2;
      t1 = env3;
      t2 = env4;
      touching = env5;
      break;
    case 5:
      t3 = env0;
      listener = env1;
      sensor = env2;
      wasTouching = env3;
      t1 = env4;
      t2 = env5;
      bodyA = env6;
      bodyB = env7;
      break;
    case 6:
      listener = env0;
      sensor = env1;
      touching = env2;
      wasTouching = env3;
      t1 = env4;
      t2 = env5;
      bodyA = env6;
      bodyB = env7;
      break;
    case 7:
      listener = env0;
      sensor = env1;
      touching = env2;
      wasTouching = env3;
      t1 = env4;
      t2 = env5;
      bodyA = env6;
      bodyB = env7;
      i = env8;
      t3 = env9;
      break;
    case 8:
      sensor = env0;
      listener = env1;
      touching = env2;
      wasTouching = env3;
      t1 = env4;
      t2 = env5;
      bodyA = env6;
      bodyB = env7;
      i = env8;
      t3 = env9;
      break;
    case 9:
      mp2 = env0;
      listener = env1;
      sensor = env2;
      id2 = env3;
      touching = env4;
      t1 = env5;
      t2 = env6;
      bodyA = env7;
      bodyB = env8;
      i = env9;
      j = env10;
      wasTouching = env11;
      t3 = env12;
      break;
    case 10:
      mp2 = env0;
      t3 = env1;
      listener = env2;
      sensor = env3;
      id2 = env4;
      touching = env5;
      t1 = env6;
      t2 = env7;
      bodyA = env8;
      bodyB = env9;
      i = env10;
      j = env11;
      wasTouching = env12;
      break;
    case 11:
      mp2 = env0;
      i = env1;
      j = env2;
      id2 = env3;
      t1 = env4;
      break;
    case 12:
      wasTouching = env0;
      listener = env1;
      i = env2;
      sensor = env3;
      t1 = env4;
      touching = env5;
      t2 = env6;
      bodyA = env7;
      bodyB = env8;
      break;
    case 13:
      listener = env0;
      sensor = env1;
      wasTouching = env2;
      t1 = env3;
      touching = env4;
      t3 = env5;
      t2 = env6;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(listener, 'is$ContactListener');
      var t1 = this._oldManifold;
      var t2 = this.manifold;
      t1.setFrom$1(t2);
      var t3 = this.flags;
    case 1:
      state = 0;
      this.flags = $.or(t3, 4);
      var t4 = this.flags;
    case 2:
      state = 0;
      var wasTouching = $.boolTypeCheck($.eq($.and(t4, 2), 2));
    case 3:
      state = 0;
      var sensorA = $.boolTypeCheck(this.fixtureA.get$isSensor());
      var sensorB = $.boolTypeCheck(this.fixtureB.get$isSensor());
      var sensor = sensorA === true || sensorB === true;
      var bodyA = $.propertyTypeCheck(this.fixtureA.get$body(), 'is$Body');
      var bodyB = $.propertyTypeCheck(this.fixtureB.get$body(), 'is$Body');
      var xfA = $.propertyTypeCheck(bodyA.get$originTransform(), 'is$Transform');
      var xfB = $.propertyTypeCheck(bodyB.get$originTransform(), 'is$Transform');
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
      if (state == 4 || (state == 0 && sensor)) {
        switch (state) {
          case 0:
            var shapeA = $.propertyTypeCheck(this.fixtureA.get$shape(), 'is$Shape');
            var shapeB = $.propertyTypeCheck(this.fixtureB.get$shape(), 'is$Shape');
            var touching = $.boolTypeCheck(this.pool.get$collision().testOverlap$4(shapeA, shapeB, xfA, xfB));
          case 4:
            state = 0;
            t2.set$pointCount(0);
        }
      } else {
        switch (state) {
          case 0:
            this.evaluate$3(t2, xfA, xfB);
            t3 = t2.get$pointCount();
          case 5:
            state = 0;
            touching = $.boolTypeCheck($.gt(t3, 0));
          case 6:
            state = 0;
            var i = 0;
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
          case 12:
            L0: while (true) {
              switch (state) {
                case 0:
                  t3 = t2.get$pointCount();
                case 7:
                  state = 0;
                  if (!$.ltB(i, t3)) break L0;
                  t3 = t2.get$points();
                case 8:
                  state = 0;
                  var mp2 = $.propertyTypeCheck($.index(t3, i), 'is$ManifoldPoint');
                  mp2.set$normalImpulse(0.0);
                  mp2.set$tangentImpulse(0.0);
                  var id2 = $.propertyTypeCheck(mp2.get$id(), 'is$ContactID');
                  var j = 0;
                case 9:
                case 10:
                case 11:
                  L1: while (true) {
                    switch (state) {
                      case 0:
                        t3 = t1.get$pointCount();
                      case 9:
                        state = 0;
                        if (!$.ltB(j, t3)) break L1;
                        t3 = t1.get$points();
                      case 10:
                        state = 0;
                        var mp1 = $.propertyTypeCheck($.index(t3, j), 'is$ManifoldPoint');
                        if (mp1.get$id().isEqual$1(id2) === true) {
                          mp2.set$normalImpulse(mp1.get$normalImpulse());
                          mp2.set$tangentImpulse(mp1.get$tangentImpulse());
                          break L1;
                        }
                        j = $.intTypeCheck($.add(j, 1));
                      case 11:
                        state = 0;
                    }
                  }
                  i = $.intTypeCheck($.add(i, 1));
                case 12:
                  state = 0;
              }
            }
            if (!$.eqB(touching, wasTouching)) {
              bodyA.set$awake(true);
              bodyB.set$awake(true);
            }
        }
      }
      t2 = touching === true;
      t3 = this.flags;
    case 13:
      state = 0;
      if (t2) this.flags = $.or(t3, 2);
      else this.flags = $.and(t3, -3);
      if (listener == null) return;
      $.eqB(wasTouching, false) && $.eqB(touching, true) && listener.beginContact$1(this);
      $.eqB(wasTouching, true) && $.eqB(touching, false) && listener.endContact$1(this);
      sensor === false && t2 && listener.preSolve$2(this, t1);
  }
 },
 flagForFiltering$0: function() {
  var t1 = this.flags;
  if (t1 !== (t1 | 0)) return this.flagForFiltering$0$bailout(1, t1);
  this.flags = (t1 | 8) >>> 0;
 },
 flagForFiltering$0$bailout: function(state, t1) {
  this.flags = $.or(t1, 8);
 },
 get$enabled: function() {
  var t1 = this.flags;
  if (t1 !== (t1 | 0)) return this.get$enabled$bailout(1, t1);
  t1 = t1 & 4;
  return t1 === 4;
 },
 get$enabled$bailout: function(state, t1) {
  return $.eq($.and(t1, 4), 4);
 },
 get$touching: function() {
  var t1 = this.flags;
  if (t1 !== (t1 | 0)) return this.get$touching$bailout(1, t1);
  t1 = t1 & 2;
  return t1 === 2;
 },
 get$touching$bailout: function(state, t1) {
  return $.eq($.and(t1, 2), 2);
 },
 init$2: function(fixA, fixB) {
  $.propertyTypeCheck(fixA, 'is$Fixture');
  $.propertyTypeCheck(fixB, 'is$Fixture');
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
 next$0: function() { return this.next.$call$0(); },
 is$Contact: true
};

$$.ContactConstraint = {"":
 ["manifold=", "pointCount=", "restitution=", "friction=", "radius=", "type=", "bodyB=", "bodyA=", "K?", "normalMass?", "normal?", "localPoint?", "localNormal?", "points?"],
 super: "Object",
 toString$0: function() {
  return $.stringTypeCheck($.add($.add('localNormal: "' + $.S(this.localNormal) + '", localPoint: "' + $.S(this.localPoint) + '" ', 'normal: "' + $.S(this.normal) + '", radius: "' + $.S(this.radius) + '" friction: "' + $.S(this.friction) + '" '), 'restitution: "' + $.S(this.restitution) + '", pointCount: "' + $.S(this.pointCount) + '"'));
 },
 setFrom$1: function(cp) {
  $.propertyTypeCheck(cp, 'is$ContactConstraint');
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
  for (var t1 = this.points, i = 0; $.ltB(i, cp.get$pointCount()); ++i) {
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    t1[i].setFrom$1($.index(cp.get$points(), i));
  }
 },
 setFrom$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      t1 = env0;
      var cp = env1;
      i = env2;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(cp, 'is$ContactConstraint');
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
    case 1:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, cp.get$pointCount())) break L0;
            if (i !== (i | 0)) throw $.iae(i);
            var t2 = t1.length;
            if (i < 0 || i >= t2) throw $.ioore(i);
            t1[i].setFrom$1($.index(cp.get$points(), i));
            i = $.intTypeCheck($.add(i, 1));
          case 1:
            state = 0;
        }
      }
  }
 },
 ContactConstraint$0: function() {
  for (var t1 = this.points, i = 0; $.ltB(i, 2); i = $.intTypeCheck($.add(i, 1))) {
    var t2 = $.ContactConstraintPoint$();
    if (i !== (i | 0)) throw $.iae(i);
    var t3 = t1.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    t1[i] = t2;
  }
 },
 is$ContactConstraint: true
};

$$.ContactConstraintPoint = {"":
 ["velocityBias=", "tangentMass=", "normalMass=", "tangentImpulse=", "normalImpulse=", "rB?", "rA?", "localPoint?"],
 super: "Object",
 toString$0: function() {
  return $.add($.add($.add($.add($.add($.add($.add($.add($.add($.add($.add($.add($.add($.add($.add('normal impulse: ', this.normalImpulse), ', tangentImpulse: '), this.tangentImpulse), ', normalMass: '), this.normalMass), ', tangentMass: '), this.tangentMass), ', velocityBias: '), this.velocityBias), ', localPoint '), this.localPoint), ', rA: '), this.rA), ', rB: '), this.rB);
 },
 setFrom$1: function(cp) {
  $.propertyTypeCheck(cp, 'is$ContactConstraintPoint');
  this.localPoint.setFrom$1(cp.get$localPoint());
  this.rA.setFrom$1(cp.get$rA());
  this.rB.setFrom$1(cp.get$rB());
  this.normalImpulse = cp.get$normalImpulse();
  this.tangentImpulse = cp.get$tangentImpulse();
  this.normalMass = cp.get$normalMass();
  this.tangentMass = cp.get$tangentMass();
  this.velocityBias = cp.get$velocityBias();
 },
 is$ContactConstraintPoint: true
};

$$.ContactEdge = {"":
 ["next=", "prev=", "contact=", "other="],
 super: "Object",
 next$0: function() { return this.next.$call$0(); },
 is$ContactEdge: true
};

$$.CircleContact = {"":
 ["_oldManifold", "pool", "toiCount", "manifold", "fixtureB", "fixtureA", "edge2", "edge1", "next", "prev", "flags"],
 super: "Contact",
 evaluate$3: function(argManifold, xfA, xfB) {
  $.propertyTypeCheck(argManifold, 'is$Manifold');
  $.propertyTypeCheck(xfA, 'is$Transform');
  $.propertyTypeCheck(xfB, 'is$Transform');
  this.pool.get$collision().collideCircles$5(argManifold, this.fixtureA.get$shape(), xfA, this.fixtureB.get$shape(), xfB);
 },
 init$2: function(fA, fB) {
  $.propertyTypeCheck(fA, 'is$Fixture');
  $.propertyTypeCheck(fB, 'is$Fixture');
  $.Expect_equals(0, fA.get$type(), null);
  $.Expect_equals(0, fB.get$type(), null);
  $.Contact.prototype.init$2.call(this, fA, fB);
 }
};

$$.ContactRegister = {"":
 ["primary?", "creator?"],
 super: "Object",
 is$ContactRegister: true
};

$$.ContactSolver = {"":
 ["rB", "rA", "psolver", "P2", "P1", "d", "x?", "dv2", "dv1", "dv", "P", "temp2", "temp1", "tangent", "worldManifold", "constraintCount", "constraints?"],
 super: "Object",
 solvePositionConstraints$1: function(baumgarte) {
  $.numTypeCheck(baumgarte);
  if (typeof baumgarte !== 'number') return this.solvePositionConstraints$1$bailout(1, baumgarte, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  for (var psm = this.psolver, t1 = this.rA, t2 = this.rB, t3 = this.P, t4 = this.temp1, normal = psm.normal, point = psm.point, i = 0, minSeparation = 0.0; $.ltB(i, this.constraintCount); ++i) {
    var c = $.propertyTypeCheck(this.constraints[i], 'is$ContactConstraint');
    var bodyA = $.propertyTypeCheck(c.get$bodyA(), 'is$Body');
    var bodyB = $.propertyTypeCheck(c.get$bodyB(), 'is$Body');
    var t5 = bodyA.get$mass();
    if (typeof t5 !== 'number') return this.solvePositionConstraints$1$bailout(2, t4, t3, baumgarte, i, minSeparation, c, bodyA, psm, t2, t5, t1, bodyB, 0, 0, 0, 0, 0, 0, 0, 0);
    var t6 = bodyA.get$invMass();
    if (typeof t6 !== 'number') return this.solvePositionConstraints$1$bailout(3, t4, t1, t3, baumgarte, i, minSeparation, c, bodyA, psm, t2, t5, t6, bodyB, 0, 0, 0, 0, 0, 0, 0);
    var invMassA = t5 * t6;
    t6 = bodyA.get$mass();
    if (typeof t6 !== 'number') return this.solvePositionConstraints$1$bailout(5, t4, invMassA, t6, baumgarte, i, minSeparation, c, psm, bodyA, t2, bodyB, t1, t3, 0, 0, 0, 0, 0, 0, 0);
    t5 = bodyA.get$invInertia();
    if (typeof t5 !== 'number') return this.solvePositionConstraints$1$bailout(6, t4, invMassA, t6, baumgarte, t5, i, minSeparation, c, psm, bodyA, t2, bodyB, t1, t3, 0, 0, 0, 0, 0, 0);
    var invIA = t6 * t5;
    t5 = bodyB.get$mass();
    if (typeof t5 !== 'number') return this.solvePositionConstraints$1$bailout(8, t4, invMassA, baumgarte, invIA, t5, i, minSeparation, c, psm, bodyA, t2, bodyB, t1, t3, 0, 0, 0, 0, 0, 0);
    t6 = bodyB.get$invMass();
    if (typeof t6 !== 'number') return this.solvePositionConstraints$1$bailout(9, t4, invMassA, baumgarte, invIA, t5, t6, i, minSeparation, c, psm, bodyA, t2, bodyB, t1, t3, 0, 0, 0, 0, 0);
    var invMassB = t5 * t6;
    t6 = bodyB.get$mass();
    if (typeof t6 !== 'number') return this.solvePositionConstraints$1$bailout(11, t4, invMassA, baumgarte, invIA, i, invMassB, minSeparation, t6, c, bodyA, psm, t2, bodyB, t1, t3, 0, 0, 0, 0, 0);
    t5 = bodyB.get$invInertia();
    if (typeof t5 !== 'number') return this.solvePositionConstraints$1$bailout(12, t4, invMassA, baumgarte, invIA, i, invMassB, minSeparation, t6, t5, c, psm, bodyA, t2, bodyB, t1, t3, 0, 0, 0, 0);
    var invIB = t6 * t5;
    for (t5 = invMassA + invMassB, j = 0; $.ltB(j, c.get$pointCount()); ++j) {
      psm.initialize$2(c, j);
      $.propertyTypeCheck(normal, 'is$Vector');
      $.propertyTypeCheck(point, 'is$Vector');
      var separation = $.numTypeCheck(psm.separation);
      if (typeof separation !== 'number') return this.solvePositionConstraints$1$bailout(14, t4, invMassA, baumgarte, psm, invIA, i, normal, invMassB, point, separation, invIB, j, minSeparation, c, bodyA, t1, bodyB, t2, t3, 0);
      t1.setFrom$1(point).subLocal$1(bodyA.get$sweep().get$center());
      t2.setFrom$1(point).subLocal$1(bodyB.get$sweep().get$center());
      minSeparation = $.numTypeCheck($.Math_min(minSeparation, separation));
      var C = $.numTypeCheck($.MathBox_clamp(baumgarte * (separation + 0.005), -0.2, 0.0));
      if (typeof C !== 'number') return this.solvePositionConstraints$1$bailout(15, t4, invMassA, baumgarte, psm, invIA, C, i, normal, invMassB, invIB, j, c, bodyA, t1, bodyB, t2, minSeparation, t3, 0, 0);
      var rnA = $.numTypeCheck($.Vector_crossVectors(t1, normal));
      if (typeof rnA !== 'number') return this.solvePositionConstraints$1$bailout(16, t4, invMassA, baumgarte, psm, invIA, C, i, normal, invMassB, rnA, invIB, j, c, bodyA, t1, bodyB, t2, minSeparation, t3, 0);
      var rnB = $.numTypeCheck($.Vector_crossVectors(t2, normal));
      if (typeof rnB !== 'number') return this.solvePositionConstraints$1$bailout(17, t4, invMassA, baumgarte, psm, invIA, C, i, normal, invMassB, rnA, rnB, invIB, j, c, bodyA, t1, bodyB, t2, minSeparation, t3);
      var K = t5 + invIA * rnA * rnA + invIB * rnB * rnB;
      var impulse = K > 0.0 ? -C / K : 0.0;
      t3.setFrom$1(normal).mulLocal$1(impulse);
      t4.setFrom$1(t3).mulLocal$1(invMassA);
      bodyA.get$sweep().get$center().subLocal$1(t4);
      t6 = bodyA.get$sweep();
      var t7 = t6.get$angle();
      if (typeof t7 !== 'number') return this.solvePositionConstraints$1$bailout(19, t4, invMassA, baumgarte, psm, invIA, i, invMassB, invIB, j, t6, t7, c, bodyA, minSeparation, bodyB, t2, t1, t3, 0, 0);
      var t8 = $.Vector_crossVectors(t1, t3);
      if (typeof t8 !== 'number') return this.solvePositionConstraints$1$bailout(20, t4, invMassA, t3, baumgarte, psm, invIA, i, invMassB, invIB, j, t6, t7, c, bodyA, minSeparation, t8, bodyB, t1, t2, 0);
      t6.set$angle(t7 - invIA * t8);
      bodyA.synchronizeTransform$0();
      t4.setFrom$1(t3).mulLocal$1(invMassB);
      bodyB.get$sweep().get$center().addLocal$1(t4);
      t6 = bodyB.get$sweep();
      var t9 = t6.get$angle();
      if (typeof t9 !== 'number') return this.solvePositionConstraints$1$bailout(21, t4, invMassA, baumgarte, bodyA, invIA, i, t6, t9, invMassB, invIB, j, c, psm, minSeparation, t2, bodyB, t1, t3, 0, 0);
      var t10 = $.Vector_crossVectors(t2, t3);
      if (typeof t10 !== 'number') return this.solvePositionConstraints$1$bailout(22, t4, invMassA, t3, baumgarte, invIA, i, t6, t9, invMassB, invIB, t10, j, c, psm, minSeparation, bodyB, bodyA, t1, t2, 0);
      t6.set$angle(t9 + invIB * t10);
      bodyB.synchronizeTransform$0();
    }
  }
  return $.ge(minSeparation, -0.0075);
  var j;
 },
 solvePositionConstraints$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13, env14, env15, env16, env17, env18, env19) {
  switch (state) {
    case 1:
      var baumgarte = env0;
      break;
    case 2:
      t4 = env0;
      t3 = env1;
      baumgarte = env2;
      i = env3;
      minSeparation = env4;
      c = env5;
      bodyA = env6;
      psm = env7;
      t2 = env8;
      t5 = env9;
      t1 = env10;
      bodyB = env11;
      break;
    case 3:
      t4 = env0;
      t1 = env1;
      t3 = env2;
      baumgarte = env3;
      i = env4;
      minSeparation = env5;
      c = env6;
      bodyA = env7;
      psm = env8;
      t2 = env9;
      t5 = env10;
      t6 = env11;
      bodyB = env12;
      break;
    case 4:
      t4 = env0;
      invMassA = env1;
      baumgarte = env2;
      i = env3;
      minSeparation = env4;
      c = env5;
      psm = env6;
      bodyA = env7;
      t2 = env8;
      bodyB = env9;
      t1 = env10;
      t3 = env11;
      break;
    case 5:
      t4 = env0;
      invMassA = env1;
      t6 = env2;
      baumgarte = env3;
      i = env4;
      minSeparation = env5;
      c = env6;
      psm = env7;
      bodyA = env8;
      t2 = env9;
      bodyB = env10;
      t1 = env11;
      t3 = env12;
      break;
    case 6:
      t4 = env0;
      invMassA = env1;
      t6 = env2;
      baumgarte = env3;
      t5 = env4;
      i = env5;
      minSeparation = env6;
      c = env7;
      psm = env8;
      bodyA = env9;
      t2 = env10;
      bodyB = env11;
      t1 = env12;
      t3 = env13;
      break;
    case 7:
      t4 = env0;
      invMassA = env1;
      baumgarte = env2;
      invIA = env3;
      i = env4;
      minSeparation = env5;
      c = env6;
      psm = env7;
      bodyA = env8;
      t2 = env9;
      bodyB = env10;
      t1 = env11;
      t3 = env12;
      break;
    case 8:
      t4 = env0;
      invMassA = env1;
      baumgarte = env2;
      invIA = env3;
      t5 = env4;
      i = env5;
      minSeparation = env6;
      c = env7;
      psm = env8;
      bodyA = env9;
      t2 = env10;
      bodyB = env11;
      t1 = env12;
      t3 = env13;
      break;
    case 9:
      t4 = env0;
      invMassA = env1;
      baumgarte = env2;
      invIA = env3;
      t5 = env4;
      t6 = env5;
      i = env6;
      minSeparation = env7;
      c = env8;
      psm = env9;
      bodyA = env10;
      t2 = env11;
      bodyB = env12;
      t1 = env13;
      t3 = env14;
      break;
    case 10:
      t4 = env0;
      invMassA = env1;
      baumgarte = env2;
      invIA = env3;
      i = env4;
      invMassB = env5;
      minSeparation = env6;
      c = env7;
      psm = env8;
      bodyA = env9;
      t2 = env10;
      bodyB = env11;
      t1 = env12;
      t3 = env13;
      break;
    case 11:
      t4 = env0;
      invMassA = env1;
      baumgarte = env2;
      invIA = env3;
      i = env4;
      invMassB = env5;
      minSeparation = env6;
      t6 = env7;
      c = env8;
      bodyA = env9;
      psm = env10;
      t2 = env11;
      bodyB = env12;
      t1 = env13;
      t3 = env14;
      break;
    case 12:
      t4 = env0;
      invMassA = env1;
      baumgarte = env2;
      invIA = env3;
      i = env4;
      invMassB = env5;
      minSeparation = env6;
      t6 = env7;
      t5 = env8;
      c = env9;
      psm = env10;
      bodyA = env11;
      t2 = env12;
      bodyB = env13;
      t1 = env14;
      t3 = env15;
      break;
    case 13:
      t4 = env0;
      invMassA = env1;
      baumgarte = env2;
      invIA = env3;
      i = env4;
      invMassB = env5;
      minSeparation = env6;
      invIB = env7;
      c = env8;
      bodyA = env9;
      psm = env10;
      t2 = env11;
      bodyB = env12;
      t1 = env13;
      t3 = env14;
      break;
    case 14:
      t4 = env0;
      invMassA = env1;
      baumgarte = env2;
      psm = env3;
      invIA = env4;
      i = env5;
      normal = env6;
      invMassB = env7;
      point = env8;
      separation = env9;
      invIB = env10;
      j = env11;
      minSeparation = env12;
      c = env13;
      bodyA = env14;
      t1 = env15;
      bodyB = env16;
      t2 = env17;
      t3 = env18;
      break;
    case 15:
      t4 = env0;
      invMassA = env1;
      baumgarte = env2;
      psm = env3;
      invIA = env4;
      C = env5;
      i = env6;
      normal = env7;
      invMassB = env8;
      invIB = env9;
      j = env10;
      c = env11;
      bodyA = env12;
      t1 = env13;
      bodyB = env14;
      t2 = env15;
      minSeparation = env16;
      t3 = env17;
      break;
    case 16:
      t4 = env0;
      invMassA = env1;
      baumgarte = env2;
      psm = env3;
      invIA = env4;
      C = env5;
      i = env6;
      normal = env7;
      invMassB = env8;
      rnA = env9;
      invIB = env10;
      j = env11;
      c = env12;
      bodyA = env13;
      t1 = env14;
      bodyB = env15;
      t2 = env16;
      minSeparation = env17;
      t3 = env18;
      break;
    case 17:
      t4 = env0;
      invMassA = env1;
      baumgarte = env2;
      psm = env3;
      invIA = env4;
      C = env5;
      i = env6;
      normal = env7;
      invMassB = env8;
      rnA = env9;
      rnB = env10;
      invIB = env11;
      j = env12;
      c = env13;
      bodyA = env14;
      t1 = env15;
      bodyB = env16;
      t2 = env17;
      minSeparation = env18;
      t3 = env19;
      break;
    case 18:
      t4 = env0;
      invMassA = env1;
      bodyB = env2;
      baumgarte = env3;
      psm = env4;
      invIA = env5;
      C = env6;
      i = env7;
      normal = env8;
      invMassB = env9;
      invIB = env10;
      j = env11;
      c = env12;
      bodyA = env13;
      t1 = env14;
      minSeparation = env15;
      t2 = env16;
      K = env17;
      t3 = env18;
      break;
    case 19:
      t4 = env0;
      invMassA = env1;
      baumgarte = env2;
      psm = env3;
      invIA = env4;
      i = env5;
      invMassB = env6;
      invIB = env7;
      j = env8;
      t5 = env9;
      t6 = env10;
      c = env11;
      bodyA = env12;
      minSeparation = env13;
      bodyB = env14;
      t2 = env15;
      t1 = env16;
      t3 = env17;
      break;
    case 20:
      t4 = env0;
      invMassA = env1;
      t3 = env2;
      baumgarte = env3;
      psm = env4;
      invIA = env5;
      i = env6;
      invMassB = env7;
      invIB = env8;
      j = env9;
      t5 = env10;
      t6 = env11;
      c = env12;
      bodyA = env13;
      minSeparation = env14;
      t7 = env15;
      bodyB = env16;
      t1 = env17;
      t2 = env18;
      break;
    case 21:
      t4 = env0;
      invMassA = env1;
      baumgarte = env2;
      bodyA = env3;
      invIA = env4;
      i = env5;
      t5 = env6;
      t8 = env7;
      invMassB = env8;
      invIB = env9;
      j = env10;
      c = env11;
      psm = env12;
      minSeparation = env13;
      t2 = env14;
      bodyB = env15;
      t1 = env16;
      t3 = env17;
      break;
    case 22:
      t4 = env0;
      invMassA = env1;
      t3 = env2;
      baumgarte = env3;
      invIA = env4;
      i = env5;
      t5 = env6;
      t8 = env7;
      invMassB = env8;
      invIB = env9;
      t9 = env10;
      j = env11;
      c = env12;
      psm = env13;
      minSeparation = env14;
      bodyB = env15;
      bodyA = env16;
      t1 = env17;
      t2 = env18;
      break;
    case 23:
      t4 = env0;
      invMassA = env1;
      baumgarte = env2;
      t1 = env3;
      invIA = env4;
      i = env5;
      invMassB = env6;
      invIB = env7;
      c = env8;
      minSeparation = env9;
      psm = env10;
      bodyA = env11;
      t2 = env12;
      bodyB = env13;
      j = env14;
      t3 = env15;
      break;
    case 24:
      t4 = env0;
      minSeparation = env1;
      baumgarte = env2;
      i = env3;
      psm = env4;
      t1 = env5;
      t2 = env6;
      t3 = env7;
      break;
  }
  switch (state) {
    case 0:
      $.numTypeCheck(baumgarte);
    case 1:
      state = 0;
      var psm = this.psolver;
      var t1 = this.rA;
      var t2 = this.rB;
      var t3 = this.P;
      var t4 = this.temp1;
      var i = 0;
      var minSeparation = 0.0;
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
    case 19:
    case 20:
    case 21:
    case 22:
    case 23:
    case 24:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, this.constraintCount)) break L0;
            var c = $.propertyTypeCheck($.index(this.constraints, i), 'is$ContactConstraint');
            var bodyA = $.propertyTypeCheck(c.get$bodyA(), 'is$Body');
            var bodyB = $.propertyTypeCheck(c.get$bodyB(), 'is$Body');
            var t5 = bodyA.get$mass();
          case 2:
            state = 0;
            var t6 = bodyA.get$invMass();
          case 3:
            state = 0;
            var invMassA = $.numTypeCheck($.mul(t5, t6));
          case 4:
            state = 0;
            t6 = bodyA.get$mass();
          case 5:
            state = 0;
            t5 = bodyA.get$invInertia();
          case 6:
            state = 0;
            var invIA = $.numTypeCheck($.mul(t6, t5));
          case 7:
            state = 0;
            t5 = bodyB.get$mass();
          case 8:
            state = 0;
            t6 = bodyB.get$invMass();
          case 9:
            state = 0;
            var invMassB = $.numTypeCheck($.mul(t5, t6));
          case 10:
            state = 0;
            t6 = bodyB.get$mass();
          case 11:
            state = 0;
            t5 = bodyB.get$invInertia();
          case 12:
            state = 0;
            var invIB = $.numTypeCheck($.mul(t6, t5));
          case 13:
            state = 0;
            var j = 0;
          case 14:
          case 15:
          case 16:
          case 17:
          case 18:
          case 19:
          case 20:
          case 21:
          case 22:
          case 23:
            L1: while (true) {
              switch (state) {
                case 0:
                  if (!$.ltB(j, c.get$pointCount())) break L1;
                  $.propertyTypeCheck(psm, 'is$PositionSolverManifold');
                  psm.initialize$2(c, j);
                  var normal = $.propertyTypeCheck(psm.get$normal(), 'is$Vector');
                  var point = $.propertyTypeCheck(psm.get$point(), 'is$Vector');
                  var separation = $.numTypeCheck(psm.get$separation());
                case 14:
                  state = 0;
                  t1.setFrom$1(point).subLocal$1(bodyA.get$sweep().get$center());
                  t2.setFrom$1(point).subLocal$1(bodyB.get$sweep().get$center());
                  minSeparation = $.numTypeCheck($.Math_min(minSeparation, separation));
                  var C = $.numTypeCheck($.MathBox_clamp($.mul(baumgarte, $.add(separation, 0.005)), -0.2, 0.0));
                case 15:
                  state = 0;
                  var rnA = $.numTypeCheck($.Vector_crossVectors(t1, normal));
                case 16:
                  state = 0;
                  var rnB = $.numTypeCheck($.Vector_crossVectors(t2, normal));
                case 17:
                  state = 0;
                  var K = $.numTypeCheck($.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rnA), rnA)), $.mul($.mul(invIB, rnB), rnB)));
                case 18:
                  state = 0;
                  var impulse = $.numTypeCheck($.gtB(K, 0.0) ? $.div($.neg(C), K) : 0.0);
                  t3.setFrom$1(normal).mulLocal$1(impulse);
                  t4.setFrom$1(t3).mulLocal$1(invMassA);
                  bodyA.get$sweep().get$center().subLocal$1(t4);
                  t5 = bodyA.get$sweep();
                  t6 = t5.get$angle();
                case 19:
                  state = 0;
                  var t7 = $.Vector_crossVectors(t1, t3);
                case 20:
                  state = 0;
                  t5.set$angle($.sub(t6, $.mul(invIA, t7)));
                  bodyA.synchronizeTransform$0();
                  t4.setFrom$1(t3).mulLocal$1(invMassB);
                  bodyB.get$sweep().get$center().addLocal$1(t4);
                  t5 = bodyB.get$sweep();
                  var t8 = t5.get$angle();
                case 21:
                  state = 0;
                  var t9 = $.Vector_crossVectors(t2, t3);
                case 22:
                  state = 0;
                  t5.set$angle($.add(t8, $.mul(invIB, t9)));
                  bodyB.synchronizeTransform$0();
                  j = $.intTypeCheck($.add(j, 1));
                case 23:
                  state = 0;
              }
            }
            i = $.intTypeCheck($.add(i, 1));
          case 24:
            state = 0;
        }
      }
      return $.ge(minSeparation, -0.0075);
  }
 },
 storeImpulses$0: function() {
  for (var i = 0; $.ltB(i, this.constraintCount); i = $.intTypeCheck($.add(i, 1))) {
    var c = $.propertyTypeCheck($.index(this.constraints, i), 'is$ContactConstraint');
    var m = $.propertyTypeCheck(c.get$manifold(), 'is$Manifold');
    for (var j = 0; $.ltB(j, c.get$pointCount()); j = $.intTypeCheck($.add(j, 1))) {
      var t1 = $.index(c.get$points(), j).get$normalImpulse();
      $.index(m.get$points(), j).set$normalImpulse(t1);
      t1 = $.index(c.get$points(), j).get$tangentImpulse();
      $.index(m.get$points(), j).set$tangentImpulse(t1);
    }
  }
 },
 solveVelocityConstraints$0: function() {
  for (var t1 = this.tangent, t2 = this.dv, t3 = this.dv1, t4 = this.dv2, t5 = this.temp2, t6 = this.x, t7 = this.d, t8 = this.P1, t9 = this.P2, t10 = this.temp1, i = 0; $.ltB(i, this.constraintCount); ++i) {
    var c = $.propertyTypeCheck(this.constraints[i], 'is$ContactConstraint');
    var bodyA = $.propertyTypeCheck(c.get$bodyA(), 'is$Body');
    var bodyB = $.propertyTypeCheck(c.get$bodyB(), 'is$Body');
    var wA = $.numTypeCheck(bodyA.get$angularVelocity());
    if (typeof wA !== 'number') return this.solveVelocityConstraints$0$bailout(1, t7, t8, t1, i, t9, t10, t2, t3, c, t4, bodyA, bodyB, wA, t5, t6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var wB = $.numTypeCheck(bodyB.get$angularVelocity());
    if (typeof wB !== 'number') return this.solveVelocityConstraints$0$bailout(2, t7, t8, t1, i, t9, t10, t2, t3, c, t4, bodyA, bodyB, wA, t5, wB, t6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var vA = $.propertyTypeCheck(bodyA.get$linearVelocity(), 'is$Vector');
    var vB = $.propertyTypeCheck(bodyB.get$linearVelocity(), 'is$Vector');
    var invMassA = $.numTypeCheck(bodyA.get$invMass());
    if (typeof invMassA !== 'number') return this.solveVelocityConstraints$0$bailout(3, invMassA, t7, t8, t1, i, t9, t10, t2, t3, c, t4, bodyA, bodyB, wA, t5, wB, vA, t6, vB, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var invIA = $.numTypeCheck(bodyA.get$invInertia());
    if (typeof invIA !== 'number') return this.solveVelocityConstraints$0$bailout(4, invMassA, t7, invIA, t8, t1, i, t9, t10, t2, t3, c, t4, bodyA, bodyB, wA, t5, wB, vA, t6, vB, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var invMassB = $.numTypeCheck(bodyB.get$invMass());
    if (typeof invMassB !== 'number') return this.solveVelocityConstraints$0$bailout(5, invMassA, t7, invIA, t8, t1, i, t9, t10, t2, invMassB, t3, c, t4, bodyA, bodyB, wA, t5, wB, vA, t6, vB, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var invIB = $.numTypeCheck(bodyB.get$invInertia());
    if (typeof invIB !== 'number') return this.solveVelocityConstraints$0$bailout(6, invMassA, t7, invIA, t8, t1, i, t9, t10, t2, invIB, invMassB, t3, c, t4, bodyA, bodyB, wA, t5, wB, vA, t6, vB, 0, 0, 0, 0, 0, 0, 0, 0);
    var t11 = c.get$normal().get$y();
    if (typeof t11 !== 'number') throw $.iae(t11);
    t1.x = 1.0 * t11;
    var t12 = c.get$normal().get$x();
    if (typeof t12 !== 'number') throw $.iae(t12);
    t1.y = -1.0 * t12;
    var friction = $.numTypeCheck(c.get$friction());
    if (typeof friction !== 'number') return this.solveVelocityConstraints$0$bailout(7, t7, t8, i, t9, t10, c, bodyA, bodyB, wA, wB, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, t3, t4, friction, t5, t6, 0, 0, 0, 0, 0, 0, 0);
    t11 = c.get$pointCount();
    if (typeof t11 !== 'number') return this.solveVelocityConstraints$0$bailout(8, t7, t8, i, t9, t10, c, bodyA, bodyB, wA, wB, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, t3, t4, friction, t5, t11, t6, 0, 0, 0, 0, 0, 0);
    if (!(t11 === 1)) {
      t11 = c.get$pointCount();
      if (typeof t11 !== 'number') return this.solveVelocityConstraints$0$bailout(9, t7, t8, t11, i, t9, t10, c, bodyA, bodyB, wA, wB, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, t3, t4, friction, t5, t6, 0, 0, 0, 0, 0, 0);
      t11 = t11 === 2;
    } else t11 = true;
    $.assert(t11);
    for (var j = 0; $.ltB(j, c.get$pointCount()); ++j) {
      var ccp = $.propertyTypeCheck($.index(c.get$points(), j), 'is$ContactConstraintPoint');
      var a = $.propertyTypeCheck(ccp.get$rA(), 'is$Vector');
      t11 = $.neg(wB);
      t12 = ccp.get$rB().get$y();
      if (typeof t12 !== 'number') return this.solveVelocityConstraints$0$bailout(10, t7, t8, i, t9, t10, wB, j, c, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, ccp, a, t11, t12, t3, t4, friction, t5, t6, 0, 0);
      t12 = $.mul(t11, t12);
      t11 = vB.get$x();
      if (typeof t11 !== 'number') return this.solveVelocityConstraints$0$bailout(11, t7, t8, i, t9, t10, wB, j, c, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, ccp, a, t12, t11, t3, t4, friction, t5, t6, 0, 0);
      t11 = $.add(t12, t11);
      t12 = vA.get$x();
      if (typeof t12 !== 'number') return this.solveVelocityConstraints$0$bailout(12, t7, t8, i, t9, t10, wB, j, c, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, ccp, a, t3, t11, t12, t4, friction, t5, t6, 0, 0);
      t12 = $.sub(t11, t12);
      t11 = a.get$y();
      if (typeof t11 !== 'number') return this.solveVelocityConstraints$0$bailout(13, t7, t8, i, t9, t10, wB, j, c, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, ccp, a, t3, t4, t12, t11, friction, t5, t6, 0, 0);
      t2.x = $.add(t12, $.mul(wA, t11));
      var t13 = ccp.get$rB().get$x();
      if (typeof t13 !== 'number') return this.solveVelocityConstraints$0$bailout(14, t7, t8, i, t9, t10, wB, j, c, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, ccp, a, t3, t4, friction, t5, t6, t13, 0, 0, 0);
      t13 = $.mul(wB, t13);
      var t14 = vB.get$y();
      if (typeof t14 !== 'number') return this.solveVelocityConstraints$0$bailout(15, t13, t14, t7, t8, i, t9, t10, wB, j, c, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, ccp, a, t3, t4, friction, t5, t6, 0, 0);
      t14 = $.add(t13, t14);
      t13 = vA.get$y();
      if (typeof t13 !== 'number') return this.solveVelocityConstraints$0$bailout(16, t7, t14, t8, i, t9, t13, t10, wB, j, c, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, ccp, a, t3, t4, friction, t5, t6, 0, 0);
      t13 = $.sub(t14, t13);
      t14 = a.get$x();
      if (typeof t14 !== 'number') return this.solveVelocityConstraints$0$bailout(17, t7, t8, i, t13, t14, t10, t9, wB, j, c, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, ccp, t3, t4, friction, t5, t6, 0, 0, 0);
      t2.y = $.sub(t13, $.mul(wA, t14));
      var t15 = t2.x;
      if (typeof t15 !== 'number') return this.solveVelocityConstraints$0$bailout(18, t7, t8, i, t9, t10, t15, j, wB, c, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, ccp, t3, t4, friction, t5, t6, 0, 0, 0, 0);
      var t16 = t1.x;
      if (typeof t16 !== 'number') return this.solveVelocityConstraints$0$bailout(19, t7, t8, i, t9, t10, t15, j, t16, wB, c, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, ccp, t3, t4, friction, t5, t6, 0, 0, 0);
      t16 *= t15;
      t15 = t2.y;
      if (typeof t15 !== 'number') return this.solveVelocityConstraints$0$bailout(20, t7, t8, i, t9, t10, wB, j, c, t16, bodyA, t15, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, ccp, t3, t4, friction, t5, t6, 0, 0, 0);
      var t17 = t1.y;
      if (typeof t17 !== 'number') return this.solveVelocityConstraints$0$bailout(21, t7, t8, i, t9, t10, wB, j, c, t16, bodyA, t15, bodyB, t17, wA, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, ccp, t3, t4, friction, t5, t6, 0, 0);
      var vt = t16 + t15 * t17;
      t16 = ccp.get$tangentMass();
      if (typeof t16 !== 'number') return this.solveVelocityConstraints$0$bailout(23, t7, t8, i, t9, t10, wB, j, c, bodyA, bodyB, wA, vA, t16, vB, vt, invMassA, invIA, t1, invMassB, t2, invIB, ccp, t3, t4, friction, t5, t6, 0, 0, 0);
      var lambda = t16 * -vt;
      t16 = ccp.get$normalImpulse();
      if (typeof t16 !== 'number') return this.solveVelocityConstraints$0$bailout(25, t7, t8, i, t9, t10, wB, j, c, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, lambda, invIB, ccp, t2, t16, t3, t4, friction, t5, t6, 0, 0, 0);
      var maxFriction = friction * t16;
      t16 = ccp.get$tangentImpulse();
      if (typeof t16 !== 'number') return this.solveVelocityConstraints$0$bailout(27, t7, t8, i, t9, t10, wB, j, c, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, lambda, invIB, ccp, t16, maxFriction, t2, t3, t4, friction, t5, t6, 0, 0);
      var newImpulse = $.numTypeCheck($.MathBox_clamp(t16 + lambda, -maxFriction, maxFriction));
      if (typeof newImpulse !== 'number') return this.solveVelocityConstraints$0$bailout(28, t7, t8, i, t9, t10, wB, j, c, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, ccp, newImpulse, t3, t4, friction, t5, t6, 0, 0, 0, 0);
      var t18 = ccp.get$tangentImpulse();
      if (typeof t18 !== 'number') return this.solveVelocityConstraints$0$bailout(29, t7, t8, i, t9, t10, wB, j, c, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, ccp, newImpulse, t18, t3, t4, friction, t5, t6, 0, 0, 0);
      var lambda0 = newImpulse - t18;
      t18 = t1.x;
      if (typeof t18 !== 'number') return this.solveVelocityConstraints$0$bailout(31, t7, t8, i, t9, t10, wB, j, c, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, ccp, newImpulse, t3, lambda0, t4, t18, friction, t5, t6, 0, 0);
      var Px = t18 * lambda0;
      t18 = t1.y;
      if (typeof t18 !== 'number') return this.solveVelocityConstraints$0$bailout(33, t7, t8, i, t9, t10, wB, j, c, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, ccp, newImpulse, t3, lambda0, t4, Px, friction, t18, t5, t6, 0);
      var Py = t18 * lambda0;
      t18 = vA.get$x();
      if (typeof t18 !== 'number') return this.solveVelocityConstraints$0$bailout(35, t7, t8, i, t9, t10, wB, j, c, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, ccp, newImpulse, t3, t4, Px, friction, t5, Py, t18, t6, 0);
      vA.set$x(t18 - Px * invMassA);
      var t19 = vA.get$y();
      if (typeof t19 !== 'number') return this.solveVelocityConstraints$0$bailout(36, t7, t19, t8, i, t9, t10, wB, j, c, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, ccp, newImpulse, t3, t4, Px, friction, t5, Py, t6, 0);
      vA.set$y(t19 - Py * invMassA);
      var t20 = ccp.get$rA().get$x();
      if (typeof t20 !== 'number') return this.solveVelocityConstraints$0$bailout(37, t7, t8, i, t9, t10, t20, wB, j, c, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, ccp, newImpulse, t3, t4, Px, friction, t5, Py, t6, 0);
      t20 *= Py;
      var t21 = ccp.get$rA().get$y();
      if (typeof t21 !== 'number') return this.solveVelocityConstraints$0$bailout(38, t7, t8, i, t9, t10, t20, t21, wB, j, c, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, ccp, newImpulse, t3, t4, Px, friction, t5, Py, t6);
      wA = $.numTypeCheck($.sub(wA, invIA * (t20 - t21 * Px)));
      if (typeof wA !== 'number') return this.solveVelocityConstraints$0$bailout(39, t7, t8, i, t9, t10, wB, j, c, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, ccp, newImpulse, t3, t4, Px, friction, t5, Py, t6, 0, 0);
      var t22 = vB.get$x();
      if (typeof t22 !== 'number') return this.solveVelocityConstraints$0$bailout(40, t7, t8, i, t9, t10, wB, j, c, bodyA, bodyB, wA, t22, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, ccp, newImpulse, t3, t4, Px, friction, t5, Py, t6, 0);
      vB.set$x(t22 + Px * invMassB);
      var t23 = vB.get$y();
      if (typeof t23 !== 'number') return this.solveVelocityConstraints$0$bailout(41, t7, t8, i, t9, t10, wB, j, c, bodyA, bodyB, wA, vA, vB, t23, invMassA, invIA, t1, invMassB, t2, invIB, ccp, newImpulse, t3, t4, Px, friction, t5, Py, t6, 0);
      vB.set$y(t23 + Py * invMassB);
      var t24 = ccp.get$rB().get$x();
      if (typeof t24 !== 'number') return this.solveVelocityConstraints$0$bailout(42, t7, t8, i, t9, t10, wB, j, c, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, t24, invIB, ccp, t2, newImpulse, t3, t4, Px, friction, t5, Py, t6, 0);
      t24 *= Py;
      var t25 = ccp.get$rB().get$y();
      if (typeof t25 !== 'number') return this.solveVelocityConstraints$0$bailout(43, t7, t8, i, t9, t10, wB, j, c, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, ccp, t24, t25, newImpulse, t3, t4, Px, friction, t5, t6, 0);
      wB = $.numTypeCheck($.add(wB, invIB * (t24 - t25 * Px)));
      if (typeof wB !== 'number') return this.solveVelocityConstraints$0$bailout(44, t7, t8, i, t9, t10, j, c, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, ccp, newImpulse, t3, wB, t4, friction, t5, t6, 0, 0, 0, 0);
      ccp.set$tangentImpulse(newImpulse);
    }
    t11 = c.get$pointCount();
    if (typeof t11 !== 'number') return this.solveVelocityConstraints$0$bailout(46, t7, t8, i, t9, t10, wB, c, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, t3, t4, t5, t6, t11, 0, 0, 0, 0, 0, 0, 0);
    if (t11 === 1) {
      t11 = c.get$points();
      if (typeof t11 !== 'string' && (typeof t11 !== 'object' || t11 === null || (t11.constructor !== Array && !t11.is$JavaScriptIndexingBehavior()))) return this.solveVelocityConstraints$0$bailout(47, invMassA, t7, invIA, t8, invMassB, i, invIB, t11, t2, t1, t10, t9, wB, t3, c, t4, bodyA, bodyB, wA, t5, vA, t6, vB, 0, 0, 0, 0, 0, 0, 0);
      t12 = t11.length;
      if (0 >= t12) throw $.ioore(0);
      ccp = $.propertyTypeCheck(t11[0], 'is$ContactConstraintPoint');
      var a1 = $.propertyTypeCheck(ccp.get$rA(), 'is$Vector');
      t11 = $.neg(wB);
      t13 = ccp.get$rB().get$y();
      if (typeof t13 !== 'number') return this.solveVelocityConstraints$0$bailout(48, t7, t8, i, ccp, t10, a1, t11, t9, t13, wB, c, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, t3, t4, t5, t6, 0, 0, 0, 0);
      t13 = $.mul(t11, t13);
      t11 = vB.get$x();
      if (typeof t11 !== 'number') return this.solveVelocityConstraints$0$bailout(49, t7, t8, i, ccp, t10, a1, t9, t13, t11, wB, c, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, t3, t4, t5, t6, 0, 0, 0, 0);
      t11 = $.add(t13, t11);
      t13 = vA.get$x();
      if (typeof t13 !== 'number') return this.solveVelocityConstraints$0$bailout(50, t7, t8, i, ccp, t10, a1, t9, wB, t11, c, t13, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, t3, t4, t5, t6, 0, 0, 0, 0);
      t13 = $.sub(t11, t13);
      t11 = a1.get$y();
      if (typeof t11 !== 'number') return this.solveVelocityConstraints$0$bailout(51, t7, t8, i, ccp, t10, a1, t9, wB, c, bodyA, t13, bodyB, wA, t11, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, t3, t4, t5, t6, 0, 0, 0, 0);
      t2.x = $.add(t13, $.mul(wA, t11));
      t14 = ccp.get$rB().get$x();
      if (typeof t14 !== 'number') return this.solveVelocityConstraints$0$bailout(52, t7, t8, i, ccp, t10, a1, t9, wB, c, bodyA, bodyB, wA, vA, t14, vB, invMassA, invIA, t1, invMassB, t2, invIB, t3, t4, t5, t6, 0, 0, 0, 0, 0);
      t14 = $.mul(wB, t14);
      t15 = vB.get$y();
      if (typeof t15 !== 'number') return this.solveVelocityConstraints$0$bailout(53, t7, t8, i, ccp, t10, a1, t9, wB, c, bodyA, bodyB, wA, vA, vB, t14, invMassA, t15, invIA, t1, invMassB, t2, invIB, t3, t4, t5, t6, 0, 0, 0, 0);
      t15 = $.add(t14, t15);
      t14 = vA.get$y();
      if (typeof t14 !== 'number') return this.solveVelocityConstraints$0$bailout(54, t7, t8, i, ccp, t10, a1, t9, wB, c, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t15, invMassB, t2, invIB, t14, t1, t3, t4, t5, t6, 0, 0, 0, 0);
      t14 = $.sub(t15, t14);
      t15 = a1.get$x();
      if (typeof t15 !== 'number') return this.solveVelocityConstraints$0$bailout(55, t7, t8, i, ccp, t10, t9, wB, c, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, t15, t14, t3, t4, t5, t6, 0, 0, 0, 0, 0);
      t2.y = $.sub(t14, $.mul(wA, t15));
      var b = $.propertyTypeCheck(c.get$normal(), 'is$Vector');
      t16 = t2.x;
      if (typeof t16 !== 'number') return this.solveVelocityConstraints$0$bailout(56, t7, t8, i, ccp, t10, t9, wB, c, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, b, t16, t3, t4, t5, t6, 0, 0, 0, 0, 0);
      t17 = b.get$x();
      if (typeof t17 !== 'number') return this.solveVelocityConstraints$0$bailout(57, t7, t8, i, ccp, t10, t9, wB, c, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, b, t16, t17, t3, t4, t5, t6, 0, 0, 0, 0);
      t17 *= t16;
      t16 = t2.y;
      if (typeof t16 !== 'number') return this.solveVelocityConstraints$0$bailout(58, t7, t8, i, ccp, t10, t9, wB, c, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, b, t3, t17, t4, t16, t5, t6, 0, 0, 0, 0);
      t18 = b.get$y();
      if (typeof t18 !== 'number') return this.solveVelocityConstraints$0$bailout(59, t7, t8, i, ccp, t10, t9, wB, c, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, t3, t17, t4, t16, t18, t5, t6, 0, 0, 0, 0);
      var vn = t17 + t16 * t18;
      t17 = ccp.get$normalMass();
      if (typeof t17 !== 'number') return this.solveVelocityConstraints$0$bailout(61, t7, t8, i, ccp, t10, t9, wB, c, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, t3, t4, t5, vn, t17, t6, 0, 0, 0, 0, 0);
      t17 = -t17;
      t19 = ccp.get$velocityBias();
      if (typeof t19 !== 'number') return this.solveVelocityConstraints$0$bailout(62, t7, t8, i, ccp, t10, t9, wB, c, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, t3, t4, t5, vn, t6, t17, t19, 0, 0, 0, 0);
      lambda = t17 * (vn - t19);
      t17 = ccp.get$normalImpulse();
      if (typeof t17 !== 'number') return this.solveVelocityConstraints$0$bailout(64, t7, t8, lambda, i, ccp, t10, t17, t9, wB, c, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, t3, t4, t5, t6, 0, 0, 0, 0, 0);
      a = t17 + lambda;
      newImpulse = a > 0.0 ? a : 0.0;
      t11 = ccp.get$normalImpulse();
      if (typeof t11 !== 'number') return this.solveVelocityConstraints$0$bailout(66, t7, t8, i, ccp, t10, t9, wB, newImpulse, c, t11, bodyA, bodyB, wA, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, t3, t4, t5, t6, 0, 0, 0, 0, 0);
      lambda = newImpulse - t11;
      t11 = c.get$normal().get$x();
      if (typeof t11 !== 'number') return this.solveVelocityConstraints$0$bailout(68, t7, t8, i, ccp, t10, t9, wB, newImpulse, c, bodyA, bodyB, lambda, wA, t11, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, t3, t4, t5, t6, 0, 0, 0, 0);
      Px = t11 * lambda;
      t11 = c.get$normal().get$y();
      if (typeof t11 !== 'number') return this.solveVelocityConstraints$0$bailout(70, t7, t8, i, ccp, t10, t9, wB, newImpulse, bodyA, bodyB, lambda, wA, Px, vA, t11, vB, invMassA, invIA, t1, invMassB, t2, invIB, t3, t4, t5, t6, 0, 0, 0, 0);
      Py = t11 * lambda;
      t11 = vA.get$x();
      if (typeof t11 !== 'number') return this.solveVelocityConstraints$0$bailout(72, t7, t8, i, ccp, t10, t9, wB, newImpulse, bodyA, bodyB, wA, Px, vA, vB, Py, invMassA, invIA, t1, invMassB, t2, invIB, t11, t3, t4, t5, t6, 0, 0, 0, 0);
      vA.set$x(t11 - Px * invMassA);
      t12 = vA.get$y();
      if (typeof t12 !== 'number') return this.solveVelocityConstraints$0$bailout(73, t7, t8, i, ccp, t10, t9, wB, newImpulse, bodyA, bodyB, wA, Px, vA, vB, Py, invMassA, invIA, t1, invMassB, t2, invIB, t12, t3, t4, t5, t6, 0, 0, 0, 0);
      vA.set$y(t12 - Py * invMassA);
      t13 = ccp.get$rA().get$x();
      if (typeof t13 !== 'number') return this.solveVelocityConstraints$0$bailout(74, t7, t8, i, ccp, t10, t9, wB, newImpulse, bodyA, bodyB, wA, Px, vA, vB, Py, invIA, t1, invMassB, t2, invIB, t13, t3, t4, t5, t6, 0, 0, 0, 0, 0);
      t13 *= Py;
      t14 = ccp.get$rA().get$y();
      if (typeof t14 !== 'number') return this.solveVelocityConstraints$0$bailout(75, t7, t8, i, ccp, t10, t9, wB, newImpulse, bodyA, bodyB, wA, Px, vA, vB, Py, invIA, t1, invMassB, t2, invIB, t13, t3, t14, t4, t5, t6, 0, 0, 0, 0);
      wA = $.numTypeCheck($.sub(wA, invIA * (t13 - t14 * Px)));
      t15 = vB.get$x();
      if (typeof t15 !== 'number') return this.solveVelocityConstraints$0$bailout(76, t7, t8, i, ccp, t10, t9, wB, newImpulse, bodyA, bodyB, Px, vA, vB, Py, t1, invMassB, t2, invIB, t3, t4, t5, wA, t15, t6, 0, 0, 0, 0, 0, 0);
      vB.set$x(t15 + Px * invMassB);
      t16 = vB.get$y();
      if (typeof t16 !== 'number') return this.solveVelocityConstraints$0$bailout(77, t7, t16, t8, i, ccp, t10, t9, wB, newImpulse, bodyA, bodyB, Px, vA, vB, Py, t1, invMassB, t2, invIB, t3, t4, t5, wA, t6, 0, 0, 0, 0, 0, 0);
      vB.set$y(t16 + Py * invMassB);
      t17 = ccp.get$rB().get$x();
      if (typeof t17 !== 'number') return this.solveVelocityConstraints$0$bailout(78, Py, t7, t8, t1, i, invIB, ccp, t9, t17, t10, t2, t6, wB, newImpulse, t3, t4, bodyA, bodyB, t5, Px, wA, vA, vB, 0, 0, 0, 0, 0, 0, 0);
      t17 *= Py;
      t18 = ccp.get$rB().get$y();
      if (typeof t18 !== 'number') return this.solveVelocityConstraints$0$bailout(79, t6, t7, t8, t1, i, invIB, ccp, t9, t10, t17, t18, wB, newImpulse, t3, t4, bodyA, bodyB, t5, t2, Px, wA, vA, vB, 0, 0, 0, 0, 0, 0, 0);
      wB = $.numTypeCheck($.add(wB, invIB * (t17 - t18 * Px)));
      ccp.set$normalImpulse(newImpulse);
    } else {
      t11 = c.get$points();
      if (typeof t11 !== 'string' && (typeof t11 !== 'object' || t11 === null || (t11.constructor !== Array && !t11.is$JavaScriptIndexingBehavior()))) return this.solveVelocityConstraints$0$bailout(80, t7, t8, i, t9, t10, wB, c, bodyA, bodyB, wA, t11, vA, vB, invMassA, invIA, t1, invMassB, t2, invIB, t3, t4, t5, t6, 0, 0, 0, 0, 0, 0, 0);
      t12 = t11.length;
      if (0 >= t12) throw $.ioore(0);
      var cp1 = $.propertyTypeCheck(t11[0], 'is$ContactConstraintPoint');
      t11 = c.get$points();
      if (typeof t11 !== 'string' && (typeof t11 !== 'object' || t11 === null || (t11.constructor !== Array && !t11.is$JavaScriptIndexingBehavior()))) return this.solveVelocityConstraints$0$bailout(81, t7, t8, i, t9, t10, wB, c, bodyA, bodyB, wA, cp1, vA, t11, vB, invMassA, invIA, t1, invMassB, t2, invIB, t3, t4, t5, t6, 0, 0, 0, 0, 0, 0);
      t13 = t11.length;
      if (1 >= t13) throw $.ioore(1);
      var cp2 = $.propertyTypeCheck(t11[1], 'is$ContactConstraintPoint');
      a = $.Vector$(cp1.get$normalImpulse(), cp2.get$normalImpulse());
      t11 = a.x;
      if (typeof t11 !== 'number') return this.solveVelocityConstraints$0$bailout(82, t7, t8, i, t9, t10, t11, wB, c, bodyA, bodyB, wA, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, t1, t3, t4, t5, t6, 0, 0, 0, 0);
      if (t11 >= 0.0) {
        t11 = a.y;
        if (typeof t11 !== 'number') return this.solveVelocityConstraints$0$bailout(83, t7, t8, i, t9, t10, t11, wB, c, bodyA, bodyB, wA, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, t1, t3, t4, t5, t6, 0, 0, 0, 0);
        t11 = t11 >= 0.0;
      } else t11 = false;
      $.assert(t11);
      t11 = $.neg(wB);
      t12 = cp1.get$rB().get$y();
      if (typeof t12 !== 'number') return this.solveVelocityConstraints$0$bailout(84, t7, t8, i, t9, t10, wB, c, bodyA, bodyB, wA, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, t1, t3, t4, t11, t5, t12, t6, 0, 0, 0);
      t12 = $.mul(t11, t12);
      t11 = vB.get$x();
      if (typeof t11 !== 'number') return this.solveVelocityConstraints$0$bailout(85, t7, t8, i, t9, t10, wB, c, bodyA, bodyB, wA, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, t1, t3, t4, t5, t12, t11, t6, 0, 0, 0);
      t11 = $.add(t12, t11);
      t12 = vA.get$x();
      if (typeof t12 !== 'number') return this.solveVelocityConstraints$0$bailout(86, t7, t8, i, t9, t10, wB, c, bodyA, bodyB, wA, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, t1, t3, t4, t5, t6, t11, t12, 0, 0, 0);
      t12 = $.sub(t11, t12);
      t11 = cp1.get$rA().get$y();
      if (typeof t11 !== 'number') return this.solveVelocityConstraints$0$bailout(87, t7, t12, t8, t11, i, t9, t10, wB, c, bodyA, bodyB, wA, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, t1, t3, t4, t5, t6, 0, 0, 0);
      t3.x = $.add(t12, $.mul(wA, t11));
      t13 = cp1.get$rB().get$x();
      if (typeof t13 !== 'number') return this.solveVelocityConstraints$0$bailout(88, t7, t8, i, t9, t10, t13, wB, c, bodyA, bodyB, wA, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, t1, t3, t4, t5, t6, 0, 0, 0, 0);
      t13 = $.mul(wB, t13);
      t14 = vB.get$y();
      if (typeof t14 !== 'number') return this.solveVelocityConstraints$0$bailout(89, t7, t8, i, t9, t10, t13, t14, wB, c, bodyA, bodyB, wA, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, t1, t3, t4, t5, t6, 0, 0, 0);
      t14 = $.add(t13, t14);
      t13 = vA.get$y();
      if (typeof t13 !== 'number') return this.solveVelocityConstraints$0$bailout(90, t7, t8, i, t9, t10, wB, t14, t13, c, bodyA, bodyB, wA, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, t1, t3, t4, t5, t6, 0, 0, 0);
      t13 = $.sub(t14, t13);
      t14 = cp1.get$rA().get$x();
      if (typeof t14 !== 'number') return this.solveVelocityConstraints$0$bailout(91, t7, t8, i, t9, t10, wB, c, t13, bodyA, t14, bodyB, wA, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, t1, t3, t4, t5, t6, 0, 0, 0);
      t3.y = $.sub(t13, $.mul(wA, t14));
      t15 = $.neg(wB);
      t16 = cp2.get$rB().get$y();
      if (typeof t16 !== 'number') return this.solveVelocityConstraints$0$bailout(92, t7, t8, i, t9, t10, wB, c, bodyA, bodyB, wA, cp1, vA, t15, vB, t16, invMassA, invIA, a, invMassB, cp2, invIB, t2, t1, t3, t4, t5, t6, 0, 0, 0);
      t16 = $.mul(t15, t16);
      t15 = vB.get$x();
      if (typeof t15 !== 'number') return this.solveVelocityConstraints$0$bailout(93, t7, t8, i, t9, t10, wB, c, bodyA, bodyB, wA, cp1, vA, vB, cp2, invMassA, t16, invIA, a, invMassB, t15, invIB, t2, t1, t3, t4, t5, t6, 0, 0, 0);
      t15 = $.add(t16, t15);
      t16 = vA.get$x();
      if (typeof t16 !== 'number') return this.solveVelocityConstraints$0$bailout(94, t7, t8, i, t9, t10, wB, c, bodyA, bodyB, wA, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t16, invIB, t15, t2, t1, t3, t4, t5, t6, 0, 0, 0);
      t16 = $.sub(t15, t16);
      t15 = cp2.get$rA().get$y();
      if (typeof t15 !== 'number') return this.solveVelocityConstraints$0$bailout(95, t7, t8, i, t9, t10, wB, c, bodyA, bodyB, wA, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, t16, t15, t1, t3, t4, t5, t6, 0, 0, 0);
      t4.x = $.add(t16, $.mul(wA, t15));
      t17 = cp2.get$rB().get$x();
      if (typeof t17 !== 'number') return this.solveVelocityConstraints$0$bailout(96, t7, t8, i, t9, t10, wB, c, bodyA, bodyB, wA, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, t1, t3, t17, t4, t5, t6, 0, 0, 0, 0);
      t17 = $.mul(wB, t17);
      t18 = vB.get$y();
      if (typeof t18 !== 'number') return this.solveVelocityConstraints$0$bailout(97, t7, t8, i, t9, t10, wB, c, bodyA, bodyB, wA, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, t1, t3, t4, t18, t17, t5, t6, 0, 0, 0);
      t18 = $.add(t17, t18);
      t17 = vA.get$y();
      if (typeof t17 !== 'number') return this.solveVelocityConstraints$0$bailout(98, t7, t8, i, t9, t10, wB, c, bodyA, bodyB, wA, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, t1, t3, t4, t18, t17, t5, t6, 0, 0, 0);
      t17 = $.sub(t18, t17);
      t18 = cp2.get$rA().get$x();
      if (typeof t18 !== 'number') return this.solveVelocityConstraints$0$bailout(99, t7, t8, i, t9, t10, wB, c, bodyA, bodyB, wA, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, t1, t3, t4, t5, t17, t18, t6, 0, 0, 0);
      t4.y = $.sub(t17, $.mul(wA, t18));
      t19 = t3.x;
      if (typeof t19 !== 'number') return this.solveVelocityConstraints$0$bailout(100, t7, t8, t19, i, t9, t10, wB, c, bodyA, bodyB, wA, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, t1, t3, t4, t5, t6, 0, 0, 0, 0);
      t20 = c.get$normal().get$x();
      if (typeof t20 !== 'number') return this.solveVelocityConstraints$0$bailout(101, t7, t8, t19, i, t9, t10, t20, wB, c, bodyA, bodyB, wA, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, t1, t3, t4, t5, t6, 0, 0, 0);
      t20 *= t19;
      t19 = t3.y;
      if (typeof t19 !== 'number') return this.solveVelocityConstraints$0$bailout(102, t7, t8, i, t9, t10, t20, t19, wB, c, bodyA, bodyB, wA, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, t1, t3, t4, t5, t6, 0, 0, 0);
      t21 = c.get$normal().get$y();
      if (typeof t21 !== 'number') return this.solveVelocityConstraints$0$bailout(103, t7, t8, i, t9, t10, t20, t19, t21, wB, c, bodyA, bodyB, wA, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, t1, t3, t4, t5, t6, 0, 0);
      var vn1 = t20 + t19 * t21;
      t20 = t4.x;
      if (typeof t20 !== 'number') return this.solveVelocityConstraints$0$bailout(105, t7, t8, i, t9, t10, wB, vn1, c, t20, bodyA, bodyB, wA, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, t1, t3, t4, t5, t6, 0, 0, 0);
      t22 = c.get$normal().get$x();
      if (typeof t22 !== 'number') return this.solveVelocityConstraints$0$bailout(106, t7, t8, i, t9, t10, wB, vn1, c, t20, bodyA, t22, bodyB, wA, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, t1, t3, t4, t5, t6, 0, 0);
      t22 *= t20;
      t20 = t4.y;
      if (typeof t20 !== 'number') return this.solveVelocityConstraints$0$bailout(107, t7, t8, i, t9, t10, wB, vn1, c, bodyA, bodyB, t22, wA, t20, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, t1, t3, t4, t5, t6, 0, 0);
      t23 = c.get$normal().get$y();
      if (typeof t23 !== 'number') return this.solveVelocityConstraints$0$bailout(108, t7, t8, i, t9, t10, wB, vn1, c, bodyA, bodyB, t22, wA, t20, t23, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, t1, t3, t4, t5, t6, 0);
      var vn2 = t22 + t20 * t23;
      t22 = cp1.get$velocityBias();
      if (typeof t22 !== 'number') return this.solveVelocityConstraints$0$bailout(110, t7, t8, i, t9, t10, wB, vn1, c, bodyA, bodyB, wA, cp1, vA, vB, vn2, invMassA, t22, invIA, a, invMassB, cp2, invIB, t2, t1, t3, t4, t5, t6, 0, 0);
      t22 = vn1 - t22;
      t24 = cp2.get$velocityBias();
      if (typeof t24 !== 'number') return this.solveVelocityConstraints$0$bailout(111, t7, t8, i, t9, t10, wB, c, bodyA, bodyB, wA, cp1, vA, vB, vn2, invMassA, invIA, a, invMassB, t24, invIB, t2, t22, t1, cp2, t3, t4, t5, t6, 0, 0);
      b = $.Vector$(t22, vn2 - t24);
      t22 = c.get$K().get$col1().get$x();
      if (typeof t22 !== 'number') return this.solveVelocityConstraints$0$bailout(112, t7, t8, i, t9, t10, wB, c, bodyA, bodyB, wA, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, b, t1, t22, t3, t4, t5, t6, 0, 0, 0);
      t25 = a.x;
      if (typeof t25 !== 'number') return this.solveVelocityConstraints$0$bailout(113, t7, t8, i, t9, t10, t25, wB, c, bodyA, bodyB, wA, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, b, t1, t22, t3, t4, t5, t6, 0, 0);
      t25 *= t22;
      t22 = c.get$K().get$col2().get$x();
      if (typeof t22 !== 'number') return this.solveVelocityConstraints$0$bailout(114, t7, t8, i, t9, t10, wB, c, bodyA, bodyB, wA, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, b, t1, t25, t22, t3, t4, t5, t6, 0, 0);
      var t26 = a.y;
      if (typeof t26 !== 'number') return this.solveVelocityConstraints$0$bailout(115, t7, t8, i, t9, t10, wB, t26, c, bodyA, bodyB, wA, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, b, t1, t25, t22, t3, t4, t5, t6, 0);
      t5.x = t25 + t22 * t26;
      var t27 = c.get$K().get$col1().get$y();
      if (typeof t27 !== 'number') return this.solveVelocityConstraints$0$bailout(116, t7, t8, i, t9, t10, wB, c, bodyA, bodyB, wA, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, b, t1, t3, t4, t5, t27, t6, 0, 0, 0);
      var t28 = a.x;
      if (typeof t28 !== 'number') return this.solveVelocityConstraints$0$bailout(117, t7, t8, i, t9, t10, wB, t28, c, bodyA, bodyB, wA, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, b, t1, t3, t4, t5, t27, t6, 0, 0);
      t28 *= t27;
      t27 = c.get$K().get$col2().get$y();
      if (typeof t27 !== 'number') return this.solveVelocityConstraints$0$bailout(118, t7, t27, t8, i, t9, t10, wB, c, bodyA, bodyB, wA, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, b, t1, t3, t4, t5, t6, t28, 0, 0);
      var t29 = a.y;
      if (typeof t29 !== 'number') return this.solveVelocityConstraints$0$bailout(119, t7, t27, t8, i, t9, t10, wB, c, t29, bodyA, bodyB, wA, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, b, t1, t3, t4, t5, t6, t28, 0);
      t5.y = t28 + t27 * t29;
      var t30 = b.x;
      if (typeof t30 !== 'number') return this.solveVelocityConstraints$0$bailout(120, t7, t8, i, t9, t10, wB, c, t30, bodyA, bodyB, wA, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, b, t1, t3, t4, t5, t6, 0, 0, 0);
      var t31 = t5.x;
      if (typeof t31 !== 'number') return this.solveVelocityConstraints$0$bailout(121, t7, t8, i, t9, t10, t31, wB, c, t30, bodyA, bodyB, wA, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, b, t1, t3, t4, t5, t6, 0, 0);
      b.x = t30 - t31;
      var t32 = b.y;
      if (typeof t32 !== 'number') return this.solveVelocityConstraints$0$bailout(122, t7, t8, i, t9, t10, wB, c, bodyA, t32, bodyB, wA, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, b, t1, t3, t4, t5, t6, 0, 0, 0);
      var t33 = t5.y;
      if (typeof t33 !== 'number') return this.solveVelocityConstraints$0$bailout(123, t7, t8, i, t9, t10, wB, t33, c, bodyA, t32, bodyB, wA, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, b, t1, t3, t4, t5, t6, 0, 0);
      b.y = t32 - t33;
      t11 = b.x;
      if (typeof t11 !== 'number') return this.solveVelocityConstraints$0$bailout(124, t7, t8, i, t9, t10, wB, c, bodyA, bodyB, t11, wA, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, b, t1, t3, t4, t5, t6, 0, 0, 0);
      t12 = b.y;
      if (typeof t12 !== 'number') return this.solveVelocityConstraints$0$bailout(125, t7, t8, i, t9, t10, wB, c, bodyA, bodyB, t11, wA, t12, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, b, t1, t3, t4, t5, t6, 0, 0);
      t13 = t7.x;
      t14 = t7.y;
      t15 = t11 >= 0.0;
      t16 = t12 >= 0.0;
      for (; true; ) {
        $.Matrix22_mulMatrixAndVectorToOut(c.get$normalMass(), b, t6);
        t6.mulLocal$1(-1);
        t17 = t6.get$x();
        if (typeof t17 !== 'number') return this.solveVelocityConstraints$0$bailout(126, t7, t8, i, t9, t10, wB, c, bodyA, bodyB, t11, wA, t12, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, t1, t3, t4, t5, t17, t6, 0, 0);
        if (t17 >= 0.0) {
          t17 = t6.get$y();
          if (typeof t17 !== 'number') return this.solveVelocityConstraints$0$bailout(127, t7, t8, t17, i, t9, t10, wB, c, bodyA, bodyB, t11, wA, t12, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, t1, t3, t4, t5, t6, 0, 0);
          t17 = t17 >= 0.0;
        } else t17 = false;
        if (t17) {
          t7.setFrom$1(t6).subLocal$1(a);
          t8.setFrom$1(c.get$normal()).mulLocal$1(t13);
          t9.setFrom$1(c.get$normal()).mulLocal$1(t14);
          t10.setFrom$1(t8).addLocal$1(t9);
          t5.setFrom$1(t10).mulLocal$1(invMassA);
          vA.subLocal$1(t5);
          t5.setFrom$1(t10).mulLocal$1(invMassB);
          vB.addLocal$1(t5);
          t11 = $.Vector_crossVectors(cp1.get$rA(), t8);
          if (typeof t11 !== 'number') return this.solveVelocityConstraints$0$bailout(128, t7, invIA, t8, t1, t9, i, invIB, t10, t2, wB, t11, t3, t4, bodyA, bodyB, wA, t5, cp1, vA, t6, vB, cp2, 0, 0, 0, 0, 0, 0, 0, 0);
          t12 = $.Vector_crossVectors(cp2.get$rA(), t9);
          if (typeof t12 !== 'number') return this.solveVelocityConstraints$0$bailout(129, t7, t8, t9, i, t10, wB, bodyA, bodyB, wA, cp1, vA, vB, cp2, invIA, t1, t2, invIB, t11, t3, t4, t12, t5, t6, 0, 0, 0, 0, 0, 0, 0);
          var wA0 = $.numTypeCheck($.sub(wA, invIA * (t11 + t12)));
          t15 = $.Vector_crossVectors(cp1.get$rB(), t8);
          if (typeof t15 !== 'number') return this.solveVelocityConstraints$0$bailout(130, t6, t7, cp2, t8, t1, t9, invIB, t10, i, t2, wB, t3, t4, bodyA, bodyB, t5, cp1, wA0, vA, vB, t15, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          t16 = $.Vector_crossVectors(cp2.get$rB(), t9);
          if (typeof t16 !== 'number') return this.solveVelocityConstraints$0$bailout(131, t6, t7, cp2, t16, t8, i, invIB, t10, t9, t1, t2, wB, t3, t4, bodyA, bodyB, t5, cp1, wA0, vA, vB, t15, 0, 0, 0, 0, 0, 0, 0, 0);
          var wB0 = $.numTypeCheck($.add(wB, invIB * (t15 + t16)));
          cp1.set$normalImpulse(t6.get$x());
          cp2.set$normalImpulse(t6.get$y());
          wA = wA0;
          wB = wB0;
          break;
        }
        t17 = cp1.get$normalMass();
        if (typeof t17 !== 'number') return this.solveVelocityConstraints$0$bailout(132, t7, t8, i, t9, t10, wB, c, t17, bodyA, bodyB, t11, wA, t12, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, t1, t3, t4, t5, t6, 0, 0);
        t6.set$x(-t17 * t11);
        t6.set$y(0.0);
        t18 = c.get$K().get$col1().get$y();
        if (typeof t18 !== 'number') return this.solveVelocityConstraints$0$bailout(133, t7, t8, i, t9, t10, wB, c, bodyA, bodyB, t11, wA, t12, cp1, vA, vB, cp2, invMassA, t18, invIA, a, invMassB, t2, invIB, t1, t3, t4, t5, t6, 0, 0);
        t19 = t6.get$x();
        if (typeof t19 !== 'number') return this.solveVelocityConstraints$0$bailout(134, t7, t8, i, t9, t10, wB, c, bodyA, bodyB, t11, wA, t12, cp1, vA, vB, cp2, invMassA, t18, invIA, a, invMassB, t19, invIB, t2, t1, t3, t4, t5, t6, 0);
        vn2 = t18 * t19 + t12;
        t17 = t6.get$x();
        if (typeof t17 !== 'number') return this.solveVelocityConstraints$0$bailout(135, t7, t8, i, t9, t10, wB, c, bodyA, bodyB, t11, wA, t12, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, vn2, t1, t17, t3, t4, t5, t6, 0);
        if (t17 >= 0.0 && vn2 >= 0.0) {
          t7.setFrom$1(t6).subLocal$1(a);
          t8.setFrom$1(c.get$normal()).mulLocal$1(t13);
          t9.setFrom$1(c.get$normal()).mulLocal$1(t14);
          t10.setFrom$1(t8).addLocal$1(t9);
          t5.setFrom$1(t10).mulLocal$1(invMassA);
          vA.subLocal$1(t5);
          t5.setFrom$1(t10).mulLocal$1(invMassB);
          vB.addLocal$1(t5);
          t11 = $.Vector_crossVectors(cp1.get$rA(), t8);
          if (typeof t11 !== 'number') return this.solveVelocityConstraints$0$bailout(136, cp2, t7, invIA, t8, t1, i, invIB, t10, t9, t2, wB, t3, t4, bodyA, bodyB, wA, t5, cp1, vA, t6, t11, vB, 0, 0, 0, 0, 0, 0, 0, 0);
          t12 = $.Vector_crossVectors(cp2.get$rA(), t9);
          if (typeof t12 !== 'number') return this.solveVelocityConstraints$0$bailout(137, t7, t8, i, t9, t10, wB, bodyA, bodyB, wA, cp1, vA, t11, cp2, vB, invIA, t1, t2, invIB, t12, t3, t4, t5, t6, 0, 0, 0, 0, 0, 0, 0);
          wA0 = $.numTypeCheck($.sub(wA, invIA * (t11 + t12)));
          t15 = $.Vector_crossVectors(cp1.get$rB(), t8);
          if (typeof t15 !== 'number') return this.solveVelocityConstraints$0$bailout(138, t7, t8, t1, t9, i, invIB, t10, wA0, t2, t15, wB, t3, t4, bodyA, bodyB, t5, cp1, vA, t6, vB, cp2, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          t16 = $.Vector_crossVectors(cp2.get$rB(), t9);
          if (typeof t16 !== 'number') return this.solveVelocityConstraints$0$bailout(139, t7, t8, t1, i, invIB, t10, t9, wA0, t2, t15, wB, t16, t3, t4, bodyA, bodyB, t5, cp1, vA, t6, vB, cp2, 0, 0, 0, 0, 0, 0, 0, 0);
          wB0 = $.numTypeCheck($.add(wB, invIB * (t15 + t16)));
          cp1.set$normalImpulse(t6.get$x());
          cp2.set$normalImpulse(t6.get$y());
          wA = wA0;
          wB = wB0;
          break;
        }
        t6.set$x(0.0);
        t17 = cp2.get$normalMass();
        if (typeof t17 !== 'number') return this.solveVelocityConstraints$0$bailout(140, t7, t8, t17, i, t9, t10, wB, c, bodyA, bodyB, t11, wA, t12, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, t1, t3, t4, t5, t6, 0, 0);
        t6.set$y(-t17 * t12);
        t18 = c.get$K().get$col2().get$x();
        if (typeof t18 !== 'number') return this.solveVelocityConstraints$0$bailout(141, t7, t8, i, t9, t10, t18, wB, c, bodyA, bodyB, t11, wA, t12, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, t1, t3, t4, t5, t6, 0, 0);
        t19 = t6.get$y();
        if (typeof t19 !== 'number') return this.solveVelocityConstraints$0$bailout(142, t7, t8, i, t9, t10, t18, t19, wB, c, bodyA, bodyB, t11, wA, t12, cp1, vA, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, t1, t3, t4, t5, t6, 0);
        vn1 = t18 * t19 + t11;
        t17 = t6.get$y();
        if (typeof t17 !== 'number') return this.solveVelocityConstraints$0$bailout(143, t7, t8, i, t9, t10, wB, c, bodyA, vn1, bodyB, t11, wA, t12, cp1, vA, t17, vB, cp2, invMassA, invIA, a, invMassB, t2, invIB, t1, t3, t4, t5, t6, 0);
        if (t17 >= 0.0 && vn1 >= 0.0) {
          t7.setFrom$1(t6).subLocal$1(a);
          t8.setFrom$1(c.get$normal()).mulLocal$1(t13);
          t9.setFrom$1(c.get$normal()).mulLocal$1(t14);
          t10.setFrom$1(t8).addLocal$1(t9);
          t5.setFrom$1(t10).mulLocal$1(invMassA);
          vA.subLocal$1(t5);
          t5.setFrom$1(t10).mulLocal$1(invMassB);
          vB.addLocal$1(t5);
          t11 = $.Vector_crossVectors(cp1.get$rA(), t8);
          if (typeof t11 !== 'number') return this.solveVelocityConstraints$0$bailout(144, t7, invIA, t8, t1, t9, i, invIB, t10, t2, t11, wB, t3, t4, bodyA, bodyB, wA, t5, cp1, vA, t6, vB, cp2, 0, 0, 0, 0, 0, 0, 0, 0);
          t12 = $.Vector_crossVectors(cp2.get$rA(), t9);
          if (typeof t12 !== 'number') return this.solveVelocityConstraints$0$bailout(145, t7, t8, t9, i, t10, t11, wB, t12, bodyA, bodyB, wA, cp1, vA, vB, cp2, invIA, t1, t2, invIB, t3, t4, t5, t6, 0, 0, 0, 0, 0, 0, 0);
          wA0 = $.numTypeCheck($.sub(wA, invIA * (t11 + t12)));
          t15 = $.Vector_crossVectors(cp1.get$rB(), t8);
          if (typeof t15 !== 'number') return this.solveVelocityConstraints$0$bailout(146, cp2, t7, t8, t1, t9, i, invIB, t10, t2, wB, t3, t4, bodyA, bodyB, wA0, t5, t15, cp1, vA, t6, vB, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          t16 = $.Vector_crossVectors(cp2.get$rB(), t9);
          if (typeof t16 !== 'number') return this.solveVelocityConstraints$0$bailout(147, cp2, vB, t7, t8, t1, i, invIB, t10, t9, t2, wB, t3, t4, bodyA, bodyB, wA0, t5, t15, cp1, vA, t6, t16, 0, 0, 0, 0, 0, 0, 0, 0);
          wB0 = $.numTypeCheck($.add(wB, invIB * (t15 + t16)));
          cp1.set$normalImpulse(t6.get$x());
          cp2.set$normalImpulse(t6.get$y());
          wA = wA0;
          wB = wB0;
          break;
        }
        t6.set$x(0.0);
        t6.set$y(0.0);
        if (t15 && t16) {
          t7.setFrom$1(t6).subLocal$1(a);
          t8.setFrom$1(c.get$normal()).mulLocal$1(t13);
          t9.setFrom$1(c.get$normal()).mulLocal$1(t14);
          t10.setFrom$1(t8).addLocal$1(t9);
          t5.setFrom$1(t10).mulLocal$1(invMassA);
          vA.subLocal$1(t5);
          t5.setFrom$1(t10).mulLocal$1(invMassB);
          vB.addLocal$1(t5);
          t11 = $.Vector_crossVectors(cp1.get$rA(), t8);
          if (typeof t11 !== 'number') return this.solveVelocityConstraints$0$bailout(148, t7, invIA, t8, t1, t9, i, invIB, t10, t11, t2, wB, t3, t4, bodyA, bodyB, wA, t5, cp1, vA, t6, vB, cp2, 0, 0, 0, 0, 0, 0, 0, 0);
          t12 = $.Vector_crossVectors(cp2.get$rA(), t9);
          if (typeof t12 !== 'number') return this.solveVelocityConstraints$0$bailout(149, t7, t8, t9, i, t10, wB, bodyA, bodyB, wA, cp1, vA, vB, cp2, invIA, t1, t2, invIB, t11, t12, t3, t4, t5, t6, 0, 0, 0, 0, 0, 0, 0);
          wA0 = $.numTypeCheck($.sub(wA, invIA * (t11 + t12)));
          t15 = $.Vector_crossVectors(cp1.get$rB(), t8);
          if (typeof t15 !== 'number') return this.solveVelocityConstraints$0$bailout(150, t7, t8, t1, t9, i, invIB, t10, t2, wB, t3, t4, bodyA, wA0, bodyB, t15, t5, cp1, vA, t6, vB, cp2, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          t16 = $.Vector_crossVectors(cp2.get$rB(), t9);
          if (typeof t16 !== 'number') return this.solveVelocityConstraints$0$bailout(151, cp2, t7, t8, t1, i, invIB, t10, t9, t2, wB, t3, t4, bodyA, wA0, bodyB, t15, t5, cp1, vA, t16, t6, vB, 0, 0, 0, 0, 0, 0, 0, 0);
          wB0 = $.numTypeCheck($.add(wB, invIB * (t15 + t16)));
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
  }
 },
 solveVelocityConstraints$0$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13, env14, env15, env16, env17, env18, env19, env20, env21, env22, env23, env24, env25, env26, env27, env28, env29) {
  switch (state) {
    case 1:
      t7 = env0;
      t8 = env1;
      t1 = env2;
      i = env3;
      t9 = env4;
      t10 = env5;
      t2 = env6;
      t3 = env7;
      c = env8;
      t4 = env9;
      bodyA = env10;
      bodyB = env11;
      wA = env12;
      t5 = env13;
      t6 = env14;
      break;
    case 2:
      t7 = env0;
      t8 = env1;
      t1 = env2;
      i = env3;
      t9 = env4;
      t10 = env5;
      t2 = env6;
      t3 = env7;
      c = env8;
      t4 = env9;
      bodyA = env10;
      bodyB = env11;
      wA = env12;
      t5 = env13;
      wB = env14;
      t6 = env15;
      break;
    case 3:
      invMassA = env0;
      t7 = env1;
      t8 = env2;
      t1 = env3;
      i = env4;
      t9 = env5;
      t10 = env6;
      t2 = env7;
      t3 = env8;
      c = env9;
      t4 = env10;
      bodyA = env11;
      bodyB = env12;
      wA = env13;
      t5 = env14;
      wB = env15;
      vA = env16;
      t6 = env17;
      vB = env18;
      break;
    case 4:
      invMassA = env0;
      t7 = env1;
      invIA = env2;
      t8 = env3;
      t1 = env4;
      i = env5;
      t9 = env6;
      t10 = env7;
      t2 = env8;
      t3 = env9;
      c = env10;
      t4 = env11;
      bodyA = env12;
      bodyB = env13;
      wA = env14;
      t5 = env15;
      wB = env16;
      vA = env17;
      t6 = env18;
      vB = env19;
      break;
    case 5:
      invMassA = env0;
      t7 = env1;
      invIA = env2;
      t8 = env3;
      t1 = env4;
      i = env5;
      t9 = env6;
      t10 = env7;
      t2 = env8;
      invMassB = env9;
      t3 = env10;
      c = env11;
      t4 = env12;
      bodyA = env13;
      bodyB = env14;
      wA = env15;
      t5 = env16;
      wB = env17;
      vA = env18;
      t6 = env19;
      vB = env20;
      break;
    case 6:
      invMassA = env0;
      t7 = env1;
      invIA = env2;
      t8 = env3;
      t1 = env4;
      i = env5;
      t9 = env6;
      t10 = env7;
      t2 = env8;
      invIB = env9;
      invMassB = env10;
      t3 = env11;
      c = env12;
      t4 = env13;
      bodyA = env14;
      bodyB = env15;
      wA = env16;
      t5 = env17;
      wB = env18;
      vA = env19;
      t6 = env20;
      vB = env21;
      break;
    case 7:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      wA = env8;
      wB = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      t1 = env14;
      invMassB = env15;
      t2 = env16;
      invIB = env17;
      t3 = env18;
      t4 = env19;
      friction = env20;
      t5 = env21;
      t6 = env22;
      break;
    case 8:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      wA = env8;
      wB = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      t1 = env14;
      invMassB = env15;
      t2 = env16;
      invIB = env17;
      t3 = env18;
      t4 = env19;
      friction = env20;
      t5 = env21;
      t11 = env22;
      t6 = env23;
      break;
    case 9:
      t7 = env0;
      t8 = env1;
      t11 = env2;
      i = env3;
      t9 = env4;
      t10 = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      wA = env9;
      wB = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      t1 = env15;
      invMassB = env16;
      t2 = env17;
      invIB = env18;
      t3 = env19;
      t4 = env20;
      friction = env21;
      t5 = env22;
      t6 = env23;
      break;
    case 10:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      j = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      t1 = env15;
      invMassB = env16;
      t2 = env17;
      invIB = env18;
      ccp = env19;
      a = env20;
      t11 = env21;
      t12 = env22;
      t3 = env23;
      t4 = env24;
      friction = env25;
      t5 = env26;
      t6 = env27;
      break;
    case 11:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      j = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      t1 = env15;
      invMassB = env16;
      t2 = env17;
      invIB = env18;
      ccp = env19;
      a = env20;
      t12 = env21;
      t11 = env22;
      t3 = env23;
      t4 = env24;
      friction = env25;
      t5 = env26;
      t6 = env27;
      break;
    case 12:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      j = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      t1 = env15;
      invMassB = env16;
      t2 = env17;
      invIB = env18;
      ccp = env19;
      a = env20;
      t3 = env21;
      t11 = env22;
      t12 = env23;
      t4 = env24;
      friction = env25;
      t5 = env26;
      t6 = env27;
      break;
    case 13:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      j = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      t1 = env15;
      invMassB = env16;
      t2 = env17;
      invIB = env18;
      ccp = env19;
      a = env20;
      t3 = env21;
      t4 = env22;
      t12 = env23;
      t11 = env24;
      friction = env25;
      t5 = env26;
      t6 = env27;
      break;
    case 14:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      j = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      t1 = env15;
      invMassB = env16;
      t2 = env17;
      invIB = env18;
      ccp = env19;
      a = env20;
      t3 = env21;
      t4 = env22;
      friction = env23;
      t5 = env24;
      t6 = env25;
      t13 = env26;
      break;
    case 15:
      t13 = env0;
      t14 = env1;
      t7 = env2;
      t8 = env3;
      i = env4;
      t9 = env5;
      t10 = env6;
      wB = env7;
      j = env8;
      c = env9;
      bodyA = env10;
      bodyB = env11;
      wA = env12;
      vA = env13;
      vB = env14;
      invMassA = env15;
      invIA = env16;
      t1 = env17;
      invMassB = env18;
      t2 = env19;
      invIB = env20;
      ccp = env21;
      a = env22;
      t3 = env23;
      t4 = env24;
      friction = env25;
      t5 = env26;
      t6 = env27;
      break;
    case 16:
      t7 = env0;
      t14 = env1;
      t8 = env2;
      i = env3;
      t9 = env4;
      t13 = env5;
      t10 = env6;
      wB = env7;
      j = env8;
      c = env9;
      bodyA = env10;
      bodyB = env11;
      wA = env12;
      vA = env13;
      vB = env14;
      invMassA = env15;
      invIA = env16;
      t1 = env17;
      invMassB = env18;
      t2 = env19;
      invIB = env20;
      ccp = env21;
      a = env22;
      t3 = env23;
      t4 = env24;
      friction = env25;
      t5 = env26;
      t6 = env27;
      break;
    case 17:
      t7 = env0;
      t8 = env1;
      i = env2;
      t13 = env3;
      t14 = env4;
      t10 = env5;
      t9 = env6;
      wB = env7;
      j = env8;
      c = env9;
      bodyA = env10;
      bodyB = env11;
      wA = env12;
      vA = env13;
      vB = env14;
      invMassA = env15;
      invIA = env16;
      t1 = env17;
      invMassB = env18;
      t2 = env19;
      invIB = env20;
      ccp = env21;
      t3 = env22;
      t4 = env23;
      friction = env24;
      t5 = env25;
      t6 = env26;
      break;
    case 18:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      t15 = env5;
      j = env6;
      wB = env7;
      c = env8;
      bodyA = env9;
      bodyB = env10;
      wA = env11;
      vA = env12;
      vB = env13;
      invMassA = env14;
      invIA = env15;
      t1 = env16;
      invMassB = env17;
      t2 = env18;
      invIB = env19;
      ccp = env20;
      t3 = env21;
      t4 = env22;
      friction = env23;
      t5 = env24;
      t6 = env25;
      break;
    case 19:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      t15 = env5;
      j = env6;
      t16 = env7;
      wB = env8;
      c = env9;
      bodyA = env10;
      bodyB = env11;
      wA = env12;
      vA = env13;
      vB = env14;
      invMassA = env15;
      invIA = env16;
      t1 = env17;
      invMassB = env18;
      t2 = env19;
      invIB = env20;
      ccp = env21;
      t3 = env22;
      t4 = env23;
      friction = env24;
      t5 = env25;
      t6 = env26;
      break;
    case 20:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      j = env6;
      c = env7;
      t16 = env8;
      bodyA = env9;
      t15 = env10;
      bodyB = env11;
      wA = env12;
      vA = env13;
      vB = env14;
      invMassA = env15;
      invIA = env16;
      t1 = env17;
      invMassB = env18;
      t2 = env19;
      invIB = env20;
      ccp = env21;
      t3 = env22;
      t4 = env23;
      friction = env24;
      t5 = env25;
      t6 = env26;
      break;
    case 21:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      j = env6;
      c = env7;
      t16 = env8;
      bodyA = env9;
      t15 = env10;
      bodyB = env11;
      t17 = env12;
      wA = env13;
      vA = env14;
      vB = env15;
      invMassA = env16;
      invIA = env17;
      t1 = env18;
      invMassB = env19;
      t2 = env20;
      invIB = env21;
      ccp = env22;
      t3 = env23;
      t4 = env24;
      friction = env25;
      t5 = env26;
      t6 = env27;
      break;
    case 22:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      j = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      vA = env11;
      vt = env12;
      vB = env13;
      invMassA = env14;
      invIA = env15;
      t1 = env16;
      invMassB = env17;
      t2 = env18;
      invIB = env19;
      ccp = env20;
      t3 = env21;
      t4 = env22;
      friction = env23;
      t5 = env24;
      t6 = env25;
      break;
    case 23:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      j = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      vA = env11;
      t16 = env12;
      vB = env13;
      vt = env14;
      invMassA = env15;
      invIA = env16;
      t1 = env17;
      invMassB = env18;
      t2 = env19;
      invIB = env20;
      ccp = env21;
      t3 = env22;
      t4 = env23;
      friction = env24;
      t5 = env25;
      t6 = env26;
      break;
    case 24:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      j = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      t1 = env15;
      invMassB = env16;
      lambda = env17;
      invIB = env18;
      ccp = env19;
      t2 = env20;
      t3 = env21;
      t4 = env22;
      friction = env23;
      t5 = env24;
      t6 = env25;
      break;
    case 25:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      j = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      t1 = env15;
      invMassB = env16;
      lambda = env17;
      invIB = env18;
      ccp = env19;
      t2 = env20;
      t16 = env21;
      t3 = env22;
      t4 = env23;
      friction = env24;
      t5 = env25;
      t6 = env26;
      break;
    case 26:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      j = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      t1 = env15;
      invMassB = env16;
      lambda = env17;
      invIB = env18;
      ccp = env19;
      t2 = env20;
      maxFriction = env21;
      t3 = env22;
      t4 = env23;
      friction = env24;
      t5 = env25;
      t6 = env26;
      break;
    case 27:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      j = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      t1 = env15;
      invMassB = env16;
      lambda = env17;
      invIB = env18;
      ccp = env19;
      t16 = env20;
      maxFriction = env21;
      t2 = env22;
      t3 = env23;
      t4 = env24;
      friction = env25;
      t5 = env26;
      t6 = env27;
      break;
    case 28:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      j = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      t1 = env15;
      invMassB = env16;
      t2 = env17;
      invIB = env18;
      ccp = env19;
      newImpulse = env20;
      t3 = env21;
      t4 = env22;
      friction = env23;
      t5 = env24;
      t6 = env25;
      break;
    case 29:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      j = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      t1 = env15;
      invMassB = env16;
      t2 = env17;
      invIB = env18;
      ccp = env19;
      newImpulse = env20;
      t18 = env21;
      t3 = env22;
      t4 = env23;
      friction = env24;
      t5 = env25;
      t6 = env26;
      break;
    case 30:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      j = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      t1 = env15;
      invMassB = env16;
      t2 = env17;
      invIB = env18;
      ccp = env19;
      newImpulse = env20;
      t3 = env21;
      lambda0 = env22;
      t4 = env23;
      friction = env24;
      t5 = env25;
      t6 = env26;
      break;
    case 31:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      j = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      t1 = env15;
      invMassB = env16;
      t2 = env17;
      invIB = env18;
      ccp = env19;
      newImpulse = env20;
      t3 = env21;
      lambda0 = env22;
      t4 = env23;
      t18 = env24;
      friction = env25;
      t5 = env26;
      t6 = env27;
      break;
    case 32:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      j = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      t1 = env15;
      invMassB = env16;
      t2 = env17;
      invIB = env18;
      ccp = env19;
      newImpulse = env20;
      t3 = env21;
      lambda0 = env22;
      t4 = env23;
      Px = env24;
      friction = env25;
      t5 = env26;
      t6 = env27;
      break;
    case 33:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      j = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      t1 = env15;
      invMassB = env16;
      t2 = env17;
      invIB = env18;
      ccp = env19;
      newImpulse = env20;
      t3 = env21;
      lambda0 = env22;
      t4 = env23;
      Px = env24;
      friction = env25;
      t18 = env26;
      t5 = env27;
      t6 = env28;
      break;
    case 34:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      j = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      t1 = env15;
      invMassB = env16;
      t2 = env17;
      invIB = env18;
      ccp = env19;
      newImpulse = env20;
      t3 = env21;
      t4 = env22;
      Px = env23;
      friction = env24;
      t5 = env25;
      Py = env26;
      t6 = env27;
      break;
    case 35:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      j = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      t1 = env15;
      invMassB = env16;
      t2 = env17;
      invIB = env18;
      ccp = env19;
      newImpulse = env20;
      t3 = env21;
      t4 = env22;
      Px = env23;
      friction = env24;
      t5 = env25;
      Py = env26;
      t18 = env27;
      t6 = env28;
      break;
    case 36:
      t7 = env0;
      t19 = env1;
      t8 = env2;
      i = env3;
      t9 = env4;
      t10 = env5;
      wB = env6;
      j = env7;
      c = env8;
      bodyA = env9;
      bodyB = env10;
      wA = env11;
      vA = env12;
      vB = env13;
      invMassA = env14;
      invIA = env15;
      t1 = env16;
      invMassB = env17;
      t2 = env18;
      invIB = env19;
      ccp = env20;
      newImpulse = env21;
      t3 = env22;
      t4 = env23;
      Px = env24;
      friction = env25;
      t5 = env26;
      Py = env27;
      t6 = env28;
      break;
    case 37:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      t20 = env5;
      wB = env6;
      j = env7;
      c = env8;
      bodyA = env9;
      bodyB = env10;
      wA = env11;
      vA = env12;
      vB = env13;
      invMassA = env14;
      invIA = env15;
      t1 = env16;
      invMassB = env17;
      t2 = env18;
      invIB = env19;
      ccp = env20;
      newImpulse = env21;
      t3 = env22;
      t4 = env23;
      Px = env24;
      friction = env25;
      t5 = env26;
      Py = env27;
      t6 = env28;
      break;
    case 38:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      t20 = env5;
      t21 = env6;
      wB = env7;
      j = env8;
      c = env9;
      bodyA = env10;
      bodyB = env11;
      wA = env12;
      vA = env13;
      vB = env14;
      invMassA = env15;
      invIA = env16;
      t1 = env17;
      invMassB = env18;
      t2 = env19;
      invIB = env20;
      ccp = env21;
      newImpulse = env22;
      t3 = env23;
      t4 = env24;
      Px = env25;
      friction = env26;
      t5 = env27;
      Py = env28;
      t6 = env29;
      break;
    case 39:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      j = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      t1 = env15;
      invMassB = env16;
      t2 = env17;
      invIB = env18;
      ccp = env19;
      newImpulse = env20;
      t3 = env21;
      t4 = env22;
      Px = env23;
      friction = env24;
      t5 = env25;
      Py = env26;
      t6 = env27;
      break;
    case 40:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      j = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      t22 = env11;
      vA = env12;
      vB = env13;
      invMassA = env14;
      invIA = env15;
      t1 = env16;
      invMassB = env17;
      t2 = env18;
      invIB = env19;
      ccp = env20;
      newImpulse = env21;
      t3 = env22;
      t4 = env23;
      Px = env24;
      friction = env25;
      t5 = env26;
      Py = env27;
      t6 = env28;
      break;
    case 41:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      j = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      vA = env11;
      vB = env12;
      t23 = env13;
      invMassA = env14;
      invIA = env15;
      t1 = env16;
      invMassB = env17;
      t2 = env18;
      invIB = env19;
      ccp = env20;
      newImpulse = env21;
      t3 = env22;
      t4 = env23;
      Px = env24;
      friction = env25;
      t5 = env26;
      Py = env27;
      t6 = env28;
      break;
    case 42:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      j = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      t1 = env15;
      invMassB = env16;
      t24 = env17;
      invIB = env18;
      ccp = env19;
      t2 = env20;
      newImpulse = env21;
      t3 = env22;
      t4 = env23;
      Px = env24;
      friction = env25;
      t5 = env26;
      Py = env27;
      t6 = env28;
      break;
    case 43:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      j = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      t1 = env15;
      invMassB = env16;
      t2 = env17;
      invIB = env18;
      ccp = env19;
      t24 = env20;
      t25 = env21;
      newImpulse = env22;
      t3 = env23;
      t4 = env24;
      Px = env25;
      friction = env26;
      t5 = env27;
      t6 = env28;
      break;
    case 44:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      j = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      wA = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      t1 = env14;
      invMassB = env15;
      t2 = env16;
      invIB = env17;
      ccp = env18;
      newImpulse = env19;
      t3 = env20;
      wB = env21;
      t4 = env22;
      friction = env23;
      t5 = env24;
      t6 = env25;
      break;
    case 45:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      c = env5;
      bodyA = env6;
      bodyB = env7;
      vA = env8;
      vB = env9;
      invMassA = env10;
      invIA = env11;
      t1 = env12;
      invMassB = env13;
      t2 = env14;
      invIB = env15;
      t3 = env16;
      t4 = env17;
      wA = env18;
      wB = env19;
      friction = env20;
      t5 = env21;
      j = env22;
      t6 = env23;
      break;
    case 46:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      wA = env9;
      vA = env10;
      vB = env11;
      invMassA = env12;
      invIA = env13;
      t1 = env14;
      invMassB = env15;
      t2 = env16;
      invIB = env17;
      t3 = env18;
      t4 = env19;
      t5 = env20;
      t6 = env21;
      t11 = env22;
      break;
    case 47:
      invMassA = env0;
      t7 = env1;
      invIA = env2;
      t8 = env3;
      invMassB = env4;
      i = env5;
      invIB = env6;
      t11 = env7;
      t2 = env8;
      t1 = env9;
      t10 = env10;
      t9 = env11;
      wB = env12;
      t3 = env13;
      c = env14;
      t4 = env15;
      bodyA = env16;
      bodyB = env17;
      wA = env18;
      t5 = env19;
      vA = env20;
      t6 = env21;
      vB = env22;
      break;
    case 48:
      t7 = env0;
      t8 = env1;
      i = env2;
      ccp = env3;
      t10 = env4;
      a1 = env5;
      t11 = env6;
      t9 = env7;
      t12 = env8;
      wB = env9;
      c = env10;
      bodyA = env11;
      bodyB = env12;
      wA = env13;
      vA = env14;
      vB = env15;
      invMassA = env16;
      invIA = env17;
      t1 = env18;
      invMassB = env19;
      t2 = env20;
      invIB = env21;
      t3 = env22;
      t4 = env23;
      t5 = env24;
      t6 = env25;
      break;
    case 49:
      t7 = env0;
      t8 = env1;
      i = env2;
      ccp = env3;
      t10 = env4;
      a1 = env5;
      t9 = env6;
      t12 = env7;
      t11 = env8;
      wB = env9;
      c = env10;
      bodyA = env11;
      bodyB = env12;
      wA = env13;
      vA = env14;
      vB = env15;
      invMassA = env16;
      invIA = env17;
      t1 = env18;
      invMassB = env19;
      t2 = env20;
      invIB = env21;
      t3 = env22;
      t4 = env23;
      t5 = env24;
      t6 = env25;
      break;
    case 50:
      t7 = env0;
      t8 = env1;
      i = env2;
      ccp = env3;
      t10 = env4;
      a1 = env5;
      t9 = env6;
      wB = env7;
      t11 = env8;
      c = env9;
      t12 = env10;
      bodyA = env11;
      bodyB = env12;
      wA = env13;
      vA = env14;
      vB = env15;
      invMassA = env16;
      invIA = env17;
      t1 = env18;
      invMassB = env19;
      t2 = env20;
      invIB = env21;
      t3 = env22;
      t4 = env23;
      t5 = env24;
      t6 = env25;
      break;
    case 51:
      t7 = env0;
      t8 = env1;
      i = env2;
      ccp = env3;
      t10 = env4;
      a1 = env5;
      t9 = env6;
      wB = env7;
      c = env8;
      bodyA = env9;
      t12 = env10;
      bodyB = env11;
      wA = env12;
      t11 = env13;
      vA = env14;
      vB = env15;
      invMassA = env16;
      invIA = env17;
      t1 = env18;
      invMassB = env19;
      t2 = env20;
      invIB = env21;
      t3 = env22;
      t4 = env23;
      t5 = env24;
      t6 = env25;
      break;
    case 52:
      t7 = env0;
      t8 = env1;
      i = env2;
      ccp = env3;
      t10 = env4;
      a1 = env5;
      t9 = env6;
      wB = env7;
      c = env8;
      bodyA = env9;
      bodyB = env10;
      wA = env11;
      vA = env12;
      t13 = env13;
      vB = env14;
      invMassA = env15;
      invIA = env16;
      t1 = env17;
      invMassB = env18;
      t2 = env19;
      invIB = env20;
      t3 = env21;
      t4 = env22;
      t5 = env23;
      t6 = env24;
      break;
    case 53:
      t7 = env0;
      t8 = env1;
      i = env2;
      ccp = env3;
      t10 = env4;
      a1 = env5;
      t9 = env6;
      wB = env7;
      c = env8;
      bodyA = env9;
      bodyB = env10;
      wA = env11;
      vA = env12;
      vB = env13;
      t13 = env14;
      invMassA = env15;
      t14 = env16;
      invIA = env17;
      t1 = env18;
      invMassB = env19;
      t2 = env20;
      invIB = env21;
      t3 = env22;
      t4 = env23;
      t5 = env24;
      t6 = env25;
      break;
    case 54:
      t7 = env0;
      t8 = env1;
      i = env2;
      ccp = env3;
      t10 = env4;
      a1 = env5;
      t9 = env6;
      wB = env7;
      c = env8;
      bodyA = env9;
      bodyB = env10;
      wA = env11;
      vA = env12;
      vB = env13;
      invMassA = env14;
      invIA = env15;
      t14 = env16;
      invMassB = env17;
      t2 = env18;
      invIB = env19;
      t13 = env20;
      t1 = env21;
      t3 = env22;
      t4 = env23;
      t5 = env24;
      t6 = env25;
      break;
    case 55:
      t7 = env0;
      t8 = env1;
      i = env2;
      ccp = env3;
      t10 = env4;
      t9 = env5;
      wB = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      t1 = env15;
      invMassB = env16;
      t2 = env17;
      invIB = env18;
      t14 = env19;
      t13 = env20;
      t3 = env21;
      t4 = env22;
      t5 = env23;
      t6 = env24;
      break;
    case 56:
      t7 = env0;
      t8 = env1;
      i = env2;
      ccp = env3;
      t10 = env4;
      t9 = env5;
      wB = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      t1 = env15;
      invMassB = env16;
      t2 = env17;
      invIB = env18;
      b = env19;
      t15 = env20;
      t3 = env21;
      t4 = env22;
      t5 = env23;
      t6 = env24;
      break;
    case 57:
      t7 = env0;
      t8 = env1;
      i = env2;
      ccp = env3;
      t10 = env4;
      t9 = env5;
      wB = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      t1 = env15;
      invMassB = env16;
      t2 = env17;
      invIB = env18;
      b = env19;
      t15 = env20;
      t16 = env21;
      t3 = env22;
      t4 = env23;
      t5 = env24;
      t6 = env25;
      break;
    case 58:
      t7 = env0;
      t8 = env1;
      i = env2;
      ccp = env3;
      t10 = env4;
      t9 = env5;
      wB = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      t1 = env15;
      invMassB = env16;
      t2 = env17;
      invIB = env18;
      b = env19;
      t3 = env20;
      t16 = env21;
      t4 = env22;
      t15 = env23;
      t5 = env24;
      t6 = env25;
      break;
    case 59:
      t7 = env0;
      t8 = env1;
      i = env2;
      ccp = env3;
      t10 = env4;
      t9 = env5;
      wB = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      t1 = env15;
      invMassB = env16;
      t2 = env17;
      invIB = env18;
      t3 = env19;
      t16 = env20;
      t4 = env21;
      t15 = env22;
      t17 = env23;
      t5 = env24;
      t6 = env25;
      break;
    case 60:
      t7 = env0;
      t8 = env1;
      i = env2;
      ccp = env3;
      t10 = env4;
      t9 = env5;
      wB = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      t1 = env15;
      invMassB = env16;
      t2 = env17;
      invIB = env18;
      t3 = env19;
      t4 = env20;
      t5 = env21;
      vn = env22;
      t6 = env23;
      break;
    case 61:
      t7 = env0;
      t8 = env1;
      i = env2;
      ccp = env3;
      t10 = env4;
      t9 = env5;
      wB = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      t1 = env15;
      invMassB = env16;
      t2 = env17;
      invIB = env18;
      t3 = env19;
      t4 = env20;
      t5 = env21;
      vn = env22;
      t16 = env23;
      t6 = env24;
      break;
    case 62:
      t7 = env0;
      t8 = env1;
      i = env2;
      ccp = env3;
      t10 = env4;
      t9 = env5;
      wB = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      t1 = env15;
      invMassB = env16;
      t2 = env17;
      invIB = env18;
      t3 = env19;
      t4 = env20;
      t5 = env21;
      vn = env22;
      t6 = env23;
      t16 = env24;
      t18 = env25;
      break;
    case 63:
      t7 = env0;
      t8 = env1;
      lambda = env2;
      i = env3;
      ccp = env4;
      t10 = env5;
      t9 = env6;
      wB = env7;
      c = env8;
      bodyA = env9;
      bodyB = env10;
      wA = env11;
      vA = env12;
      vB = env13;
      invMassA = env14;
      invIA = env15;
      t1 = env16;
      invMassB = env17;
      t2 = env18;
      invIB = env19;
      t3 = env20;
      t4 = env21;
      t5 = env22;
      t6 = env23;
      break;
    case 64:
      t7 = env0;
      t8 = env1;
      lambda = env2;
      i = env3;
      ccp = env4;
      t10 = env5;
      t16 = env6;
      t9 = env7;
      wB = env8;
      c = env9;
      bodyA = env10;
      bodyB = env11;
      wA = env12;
      vA = env13;
      vB = env14;
      invMassA = env15;
      invIA = env16;
      t1 = env17;
      invMassB = env18;
      t2 = env19;
      invIB = env20;
      t3 = env21;
      t4 = env22;
      t5 = env23;
      t6 = env24;
      break;
    case 65:
      t7 = env0;
      t8 = env1;
      i = env2;
      ccp = env3;
      t10 = env4;
      a = env5;
      t9 = env6;
      wB = env7;
      c = env8;
      bodyA = env9;
      bodyB = env10;
      wA = env11;
      vA = env12;
      vB = env13;
      invMassA = env14;
      invIA = env15;
      t1 = env16;
      invMassB = env17;
      t2 = env18;
      invIB = env19;
      t3 = env20;
      t4 = env21;
      t5 = env22;
      t6 = env23;
      break;
    case 66:
      t7 = env0;
      t8 = env1;
      i = env2;
      ccp = env3;
      t10 = env4;
      t9 = env5;
      wB = env6;
      newImpulse = env7;
      c = env8;
      t11 = env9;
      bodyA = env10;
      bodyB = env11;
      wA = env12;
      vA = env13;
      vB = env14;
      invMassA = env15;
      invIA = env16;
      t1 = env17;
      invMassB = env18;
      t2 = env19;
      invIB = env20;
      t3 = env21;
      t4 = env22;
      t5 = env23;
      t6 = env24;
      break;
    case 67:
      t7 = env0;
      t8 = env1;
      i = env2;
      ccp = env3;
      t10 = env4;
      t9 = env5;
      wB = env6;
      newImpulse = env7;
      c = env8;
      bodyA = env9;
      bodyB = env10;
      lambda = env11;
      wA = env12;
      vA = env13;
      vB = env14;
      invMassA = env15;
      invIA = env16;
      t1 = env17;
      invMassB = env18;
      t2 = env19;
      invIB = env20;
      t3 = env21;
      t4 = env22;
      t5 = env23;
      t6 = env24;
      break;
    case 68:
      t7 = env0;
      t8 = env1;
      i = env2;
      ccp = env3;
      t10 = env4;
      t9 = env5;
      wB = env6;
      newImpulse = env7;
      c = env8;
      bodyA = env9;
      bodyB = env10;
      lambda = env11;
      wA = env12;
      t11 = env13;
      vA = env14;
      vB = env15;
      invMassA = env16;
      invIA = env17;
      t1 = env18;
      invMassB = env19;
      t2 = env20;
      invIB = env21;
      t3 = env22;
      t4 = env23;
      t5 = env24;
      t6 = env25;
      break;
    case 69:
      t7 = env0;
      t8 = env1;
      i = env2;
      ccp = env3;
      t10 = env4;
      t9 = env5;
      wB = env6;
      newImpulse = env7;
      c = env8;
      bodyA = env9;
      bodyB = env10;
      lambda = env11;
      wA = env12;
      Px = env13;
      vA = env14;
      vB = env15;
      invMassA = env16;
      invIA = env17;
      t1 = env18;
      invMassB = env19;
      t2 = env20;
      invIB = env21;
      t3 = env22;
      t4 = env23;
      t5 = env24;
      t6 = env25;
      break;
    case 70:
      t7 = env0;
      t8 = env1;
      i = env2;
      ccp = env3;
      t10 = env4;
      t9 = env5;
      wB = env6;
      newImpulse = env7;
      bodyA = env8;
      bodyB = env9;
      lambda = env10;
      wA = env11;
      Px = env12;
      vA = env13;
      t11 = env14;
      vB = env15;
      invMassA = env16;
      invIA = env17;
      t1 = env18;
      invMassB = env19;
      t2 = env20;
      invIB = env21;
      t3 = env22;
      t4 = env23;
      t5 = env24;
      t6 = env25;
      break;
    case 71:
      t7 = env0;
      t8 = env1;
      i = env2;
      ccp = env3;
      t10 = env4;
      t9 = env5;
      wB = env6;
      newImpulse = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      Px = env11;
      vA = env12;
      vB = env13;
      Py = env14;
      invMassA = env15;
      invIA = env16;
      t1 = env17;
      invMassB = env18;
      t2 = env19;
      invIB = env20;
      t3 = env21;
      t4 = env22;
      t5 = env23;
      t6 = env24;
      break;
    case 72:
      t7 = env0;
      t8 = env1;
      i = env2;
      ccp = env3;
      t10 = env4;
      t9 = env5;
      wB = env6;
      newImpulse = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      Px = env11;
      vA = env12;
      vB = env13;
      Py = env14;
      invMassA = env15;
      invIA = env16;
      t1 = env17;
      invMassB = env18;
      t2 = env19;
      invIB = env20;
      t11 = env21;
      t3 = env22;
      t4 = env23;
      t5 = env24;
      t6 = env25;
      break;
    case 73:
      t7 = env0;
      t8 = env1;
      i = env2;
      ccp = env3;
      t10 = env4;
      t9 = env5;
      wB = env6;
      newImpulse = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      Px = env11;
      vA = env12;
      vB = env13;
      Py = env14;
      invMassA = env15;
      invIA = env16;
      t1 = env17;
      invMassB = env18;
      t2 = env19;
      invIB = env20;
      t12 = env21;
      t3 = env22;
      t4 = env23;
      t5 = env24;
      t6 = env25;
      break;
    case 74:
      t7 = env0;
      t8 = env1;
      i = env2;
      ccp = env3;
      t10 = env4;
      t9 = env5;
      wB = env6;
      newImpulse = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      Px = env11;
      vA = env12;
      vB = env13;
      Py = env14;
      invIA = env15;
      t1 = env16;
      invMassB = env17;
      t2 = env18;
      invIB = env19;
      t13 = env20;
      t3 = env21;
      t4 = env22;
      t5 = env23;
      t6 = env24;
      break;
    case 75:
      t7 = env0;
      t8 = env1;
      i = env2;
      ccp = env3;
      t10 = env4;
      t9 = env5;
      wB = env6;
      newImpulse = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      Px = env11;
      vA = env12;
      vB = env13;
      Py = env14;
      invIA = env15;
      t1 = env16;
      invMassB = env17;
      t2 = env18;
      invIB = env19;
      t13 = env20;
      t3 = env21;
      t14 = env22;
      t4 = env23;
      t5 = env24;
      t6 = env25;
      break;
    case 76:
      t7 = env0;
      t8 = env1;
      i = env2;
      ccp = env3;
      t10 = env4;
      t9 = env5;
      wB = env6;
      newImpulse = env7;
      bodyA = env8;
      bodyB = env9;
      Px = env10;
      vA = env11;
      vB = env12;
      Py = env13;
      t1 = env14;
      invMassB = env15;
      t2 = env16;
      invIB = env17;
      t3 = env18;
      t4 = env19;
      t5 = env20;
      wA = env21;
      t15 = env22;
      t6 = env23;
      break;
    case 77:
      t7 = env0;
      t16 = env1;
      t8 = env2;
      i = env3;
      ccp = env4;
      t10 = env5;
      t9 = env6;
      wB = env7;
      newImpulse = env8;
      bodyA = env9;
      bodyB = env10;
      Px = env11;
      vA = env12;
      vB = env13;
      Py = env14;
      t1 = env15;
      invMassB = env16;
      t2 = env17;
      invIB = env18;
      t3 = env19;
      t4 = env20;
      t5 = env21;
      wA = env22;
      t6 = env23;
      break;
    case 78:
      Py = env0;
      t7 = env1;
      t8 = env2;
      t1 = env3;
      i = env4;
      invIB = env5;
      ccp = env6;
      t9 = env7;
      t17 = env8;
      t10 = env9;
      t2 = env10;
      t6 = env11;
      wB = env12;
      newImpulse = env13;
      t3 = env14;
      t4 = env15;
      bodyA = env16;
      bodyB = env17;
      t5 = env18;
      Px = env19;
      wA = env20;
      vA = env21;
      vB = env22;
      break;
    case 79:
      t6 = env0;
      t7 = env1;
      t8 = env2;
      t1 = env3;
      i = env4;
      invIB = env5;
      ccp = env6;
      t9 = env7;
      t10 = env8;
      t17 = env9;
      t18 = env10;
      wB = env11;
      newImpulse = env12;
      t3 = env13;
      t4 = env14;
      bodyA = env15;
      bodyB = env16;
      t5 = env17;
      t2 = env18;
      Px = env19;
      wA = env20;
      vA = env21;
      vB = env22;
      break;
    case 80:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      wA = env9;
      t11 = env10;
      vA = env11;
      vB = env12;
      invMassA = env13;
      invIA = env14;
      t1 = env15;
      invMassB = env16;
      t2 = env17;
      invIB = env18;
      t3 = env19;
      t4 = env20;
      t5 = env21;
      t6 = env22;
      break;
    case 81:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      wA = env9;
      cp1 = env10;
      vA = env11;
      t11 = env12;
      vB = env13;
      invMassA = env14;
      invIA = env15;
      t1 = env16;
      invMassB = env17;
      t2 = env18;
      invIB = env19;
      t3 = env20;
      t4 = env21;
      t5 = env22;
      t6 = env23;
      break;
    case 82:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      t11 = env5;
      wB = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      cp1 = env11;
      vA = env12;
      vB = env13;
      cp2 = env14;
      invMassA = env15;
      invIA = env16;
      a = env17;
      invMassB = env18;
      t2 = env19;
      invIB = env20;
      t1 = env21;
      t3 = env22;
      t4 = env23;
      t5 = env24;
      t6 = env25;
      break;
    case 83:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      t11 = env5;
      wB = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      cp1 = env11;
      vA = env12;
      vB = env13;
      cp2 = env14;
      invMassA = env15;
      invIA = env16;
      a = env17;
      invMassB = env18;
      t2 = env19;
      invIB = env20;
      t1 = env21;
      t3 = env22;
      t4 = env23;
      t5 = env24;
      t6 = env25;
      break;
    case 84:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      wA = env9;
      cp1 = env10;
      vA = env11;
      vB = env12;
      cp2 = env13;
      invMassA = env14;
      invIA = env15;
      a = env16;
      invMassB = env17;
      t2 = env18;
      invIB = env19;
      t1 = env20;
      t3 = env21;
      t4 = env22;
      t11 = env23;
      t5 = env24;
      t12 = env25;
      t6 = env26;
      break;
    case 85:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      wA = env9;
      cp1 = env10;
      vA = env11;
      vB = env12;
      cp2 = env13;
      invMassA = env14;
      invIA = env15;
      a = env16;
      invMassB = env17;
      t2 = env18;
      invIB = env19;
      t1 = env20;
      t3 = env21;
      t4 = env22;
      t5 = env23;
      t12 = env24;
      t11 = env25;
      t6 = env26;
      break;
    case 86:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      wA = env9;
      cp1 = env10;
      vA = env11;
      vB = env12;
      cp2 = env13;
      invMassA = env14;
      invIA = env15;
      a = env16;
      invMassB = env17;
      t2 = env18;
      invIB = env19;
      t1 = env20;
      t3 = env21;
      t4 = env22;
      t5 = env23;
      t6 = env24;
      t11 = env25;
      t12 = env26;
      break;
    case 87:
      t7 = env0;
      t12 = env1;
      t8 = env2;
      t11 = env3;
      i = env4;
      t9 = env5;
      t10 = env6;
      wB = env7;
      c = env8;
      bodyA = env9;
      bodyB = env10;
      wA = env11;
      cp1 = env12;
      vA = env13;
      vB = env14;
      cp2 = env15;
      invMassA = env16;
      invIA = env17;
      a = env18;
      invMassB = env19;
      t2 = env20;
      invIB = env21;
      t1 = env22;
      t3 = env23;
      t4 = env24;
      t5 = env25;
      t6 = env26;
      break;
    case 88:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      t13 = env5;
      wB = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      cp1 = env11;
      vA = env12;
      vB = env13;
      cp2 = env14;
      invMassA = env15;
      invIA = env16;
      a = env17;
      invMassB = env18;
      t2 = env19;
      invIB = env20;
      t1 = env21;
      t3 = env22;
      t4 = env23;
      t5 = env24;
      t6 = env25;
      break;
    case 89:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      t13 = env5;
      t14 = env6;
      wB = env7;
      c = env8;
      bodyA = env9;
      bodyB = env10;
      wA = env11;
      cp1 = env12;
      vA = env13;
      vB = env14;
      cp2 = env15;
      invMassA = env16;
      invIA = env17;
      a = env18;
      invMassB = env19;
      t2 = env20;
      invIB = env21;
      t1 = env22;
      t3 = env23;
      t4 = env24;
      t5 = env25;
      t6 = env26;
      break;
    case 90:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      t14 = env6;
      t13 = env7;
      c = env8;
      bodyA = env9;
      bodyB = env10;
      wA = env11;
      cp1 = env12;
      vA = env13;
      vB = env14;
      cp2 = env15;
      invMassA = env16;
      invIA = env17;
      a = env18;
      invMassB = env19;
      t2 = env20;
      invIB = env21;
      t1 = env22;
      t3 = env23;
      t4 = env24;
      t5 = env25;
      t6 = env26;
      break;
    case 91:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      c = env6;
      t13 = env7;
      bodyA = env8;
      t14 = env9;
      bodyB = env10;
      wA = env11;
      cp1 = env12;
      vA = env13;
      vB = env14;
      cp2 = env15;
      invMassA = env16;
      invIA = env17;
      a = env18;
      invMassB = env19;
      t2 = env20;
      invIB = env21;
      t1 = env22;
      t3 = env23;
      t4 = env24;
      t5 = env25;
      t6 = env26;
      break;
    case 92:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      wA = env9;
      cp1 = env10;
      vA = env11;
      t15 = env12;
      vB = env13;
      t16 = env14;
      invMassA = env15;
      invIA = env16;
      a = env17;
      invMassB = env18;
      cp2 = env19;
      invIB = env20;
      t2 = env21;
      t1 = env22;
      t3 = env23;
      t4 = env24;
      t5 = env25;
      t6 = env26;
      break;
    case 93:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      wA = env9;
      cp1 = env10;
      vA = env11;
      vB = env12;
      cp2 = env13;
      invMassA = env14;
      t16 = env15;
      invIA = env16;
      a = env17;
      invMassB = env18;
      t15 = env19;
      invIB = env20;
      t2 = env21;
      t1 = env22;
      t3 = env23;
      t4 = env24;
      t5 = env25;
      t6 = env26;
      break;
    case 94:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      wA = env9;
      cp1 = env10;
      vA = env11;
      vB = env12;
      cp2 = env13;
      invMassA = env14;
      invIA = env15;
      a = env16;
      invMassB = env17;
      t16 = env18;
      invIB = env19;
      t15 = env20;
      t2 = env21;
      t1 = env22;
      t3 = env23;
      t4 = env24;
      t5 = env25;
      t6 = env26;
      break;
    case 95:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      wA = env9;
      cp1 = env10;
      vA = env11;
      vB = env12;
      cp2 = env13;
      invMassA = env14;
      invIA = env15;
      a = env16;
      invMassB = env17;
      t2 = env18;
      invIB = env19;
      t16 = env20;
      t15 = env21;
      t1 = env22;
      t3 = env23;
      t4 = env24;
      t5 = env25;
      t6 = env26;
      break;
    case 96:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      wA = env9;
      cp1 = env10;
      vA = env11;
      vB = env12;
      cp2 = env13;
      invMassA = env14;
      invIA = env15;
      a = env16;
      invMassB = env17;
      t2 = env18;
      invIB = env19;
      t1 = env20;
      t3 = env21;
      t17 = env22;
      t4 = env23;
      t5 = env24;
      t6 = env25;
      break;
    case 97:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      wA = env9;
      cp1 = env10;
      vA = env11;
      vB = env12;
      cp2 = env13;
      invMassA = env14;
      invIA = env15;
      a = env16;
      invMassB = env17;
      t2 = env18;
      invIB = env19;
      t1 = env20;
      t3 = env21;
      t4 = env22;
      t18 = env23;
      t17 = env24;
      t5 = env25;
      t6 = env26;
      break;
    case 98:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      wA = env9;
      cp1 = env10;
      vA = env11;
      vB = env12;
      cp2 = env13;
      invMassA = env14;
      invIA = env15;
      a = env16;
      invMassB = env17;
      t2 = env18;
      invIB = env19;
      t1 = env20;
      t3 = env21;
      t4 = env22;
      t18 = env23;
      t17 = env24;
      t5 = env25;
      t6 = env26;
      break;
    case 99:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      wA = env9;
      cp1 = env10;
      vA = env11;
      vB = env12;
      cp2 = env13;
      invMassA = env14;
      invIA = env15;
      a = env16;
      invMassB = env17;
      t2 = env18;
      invIB = env19;
      t1 = env20;
      t3 = env21;
      t4 = env22;
      t5 = env23;
      t17 = env24;
      t18 = env25;
      t6 = env26;
      break;
    case 100:
      t7 = env0;
      t8 = env1;
      t19 = env2;
      i = env3;
      t9 = env4;
      t10 = env5;
      wB = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      cp1 = env11;
      vA = env12;
      vB = env13;
      cp2 = env14;
      invMassA = env15;
      invIA = env16;
      a = env17;
      invMassB = env18;
      t2 = env19;
      invIB = env20;
      t1 = env21;
      t3 = env22;
      t4 = env23;
      t5 = env24;
      t6 = env25;
      break;
    case 101:
      t7 = env0;
      t8 = env1;
      t19 = env2;
      i = env3;
      t9 = env4;
      t10 = env5;
      t20 = env6;
      wB = env7;
      c = env8;
      bodyA = env9;
      bodyB = env10;
      wA = env11;
      cp1 = env12;
      vA = env13;
      vB = env14;
      cp2 = env15;
      invMassA = env16;
      invIA = env17;
      a = env18;
      invMassB = env19;
      t2 = env20;
      invIB = env21;
      t1 = env22;
      t3 = env23;
      t4 = env24;
      t5 = env25;
      t6 = env26;
      break;
    case 102:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      t20 = env5;
      t19 = env6;
      wB = env7;
      c = env8;
      bodyA = env9;
      bodyB = env10;
      wA = env11;
      cp1 = env12;
      vA = env13;
      vB = env14;
      cp2 = env15;
      invMassA = env16;
      invIA = env17;
      a = env18;
      invMassB = env19;
      t2 = env20;
      invIB = env21;
      t1 = env22;
      t3 = env23;
      t4 = env24;
      t5 = env25;
      t6 = env26;
      break;
    case 103:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      t20 = env5;
      t19 = env6;
      t21 = env7;
      wB = env8;
      c = env9;
      bodyA = env10;
      bodyB = env11;
      wA = env12;
      cp1 = env13;
      vA = env14;
      vB = env15;
      cp2 = env16;
      invMassA = env17;
      invIA = env18;
      a = env19;
      invMassB = env20;
      t2 = env21;
      invIB = env22;
      t1 = env23;
      t3 = env24;
      t4 = env25;
      t5 = env26;
      t6 = env27;
      break;
    case 104:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      vn1 = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      cp1 = env11;
      vA = env12;
      vB = env13;
      cp2 = env14;
      invMassA = env15;
      invIA = env16;
      a = env17;
      invMassB = env18;
      t2 = env19;
      invIB = env20;
      t1 = env21;
      t3 = env22;
      t4 = env23;
      t5 = env24;
      t6 = env25;
      break;
    case 105:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      vn1 = env6;
      c = env7;
      t20 = env8;
      bodyA = env9;
      bodyB = env10;
      wA = env11;
      cp1 = env12;
      vA = env13;
      vB = env14;
      cp2 = env15;
      invMassA = env16;
      invIA = env17;
      a = env18;
      invMassB = env19;
      t2 = env20;
      invIB = env21;
      t1 = env22;
      t3 = env23;
      t4 = env24;
      t5 = env25;
      t6 = env26;
      break;
    case 106:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      vn1 = env6;
      c = env7;
      t20 = env8;
      bodyA = env9;
      t22 = env10;
      bodyB = env11;
      wA = env12;
      cp1 = env13;
      vA = env14;
      vB = env15;
      cp2 = env16;
      invMassA = env17;
      invIA = env18;
      a = env19;
      invMassB = env20;
      t2 = env21;
      invIB = env22;
      t1 = env23;
      t3 = env24;
      t4 = env25;
      t5 = env26;
      t6 = env27;
      break;
    case 107:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      vn1 = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      t22 = env10;
      wA = env11;
      t20 = env12;
      cp1 = env13;
      vA = env14;
      vB = env15;
      cp2 = env16;
      invMassA = env17;
      invIA = env18;
      a = env19;
      invMassB = env20;
      t2 = env21;
      invIB = env22;
      t1 = env23;
      t3 = env24;
      t4 = env25;
      t5 = env26;
      t6 = env27;
      break;
    case 108:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      vn1 = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      t22 = env10;
      wA = env11;
      t20 = env12;
      t23 = env13;
      cp1 = env14;
      vA = env15;
      vB = env16;
      cp2 = env17;
      invMassA = env18;
      invIA = env19;
      a = env20;
      invMassB = env21;
      t2 = env22;
      invIB = env23;
      t1 = env24;
      t3 = env25;
      t4 = env26;
      t5 = env27;
      t6 = env28;
      break;
    case 109:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      vn1 = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      cp1 = env11;
      vA = env12;
      vB = env13;
      vn2 = env14;
      invMassA = env15;
      invIA = env16;
      a = env17;
      invMassB = env18;
      cp2 = env19;
      invIB = env20;
      t2 = env21;
      t1 = env22;
      t3 = env23;
      t4 = env24;
      t5 = env25;
      t6 = env26;
      break;
    case 110:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      vn1 = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      cp1 = env11;
      vA = env12;
      vB = env13;
      vn2 = env14;
      invMassA = env15;
      t22 = env16;
      invIA = env17;
      a = env18;
      invMassB = env19;
      cp2 = env20;
      invIB = env21;
      t2 = env22;
      t1 = env23;
      t3 = env24;
      t4 = env25;
      t5 = env26;
      t6 = env27;
      break;
    case 111:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      wA = env9;
      cp1 = env10;
      vA = env11;
      vB = env12;
      vn2 = env13;
      invMassA = env14;
      invIA = env15;
      a = env16;
      invMassB = env17;
      t24 = env18;
      invIB = env19;
      t2 = env20;
      t22 = env21;
      t1 = env22;
      cp2 = env23;
      t3 = env24;
      t4 = env25;
      t5 = env26;
      t6 = env27;
      break;
    case 112:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      wA = env9;
      cp1 = env10;
      vA = env11;
      vB = env12;
      cp2 = env13;
      invMassA = env14;
      invIA = env15;
      a = env16;
      invMassB = env17;
      t2 = env18;
      invIB = env19;
      b = env20;
      t1 = env21;
      t22 = env22;
      t3 = env23;
      t4 = env24;
      t5 = env25;
      t6 = env26;
      break;
    case 113:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      t25 = env5;
      wB = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      cp1 = env11;
      vA = env12;
      vB = env13;
      cp2 = env14;
      invMassA = env15;
      invIA = env16;
      a = env17;
      invMassB = env18;
      t2 = env19;
      invIB = env20;
      b = env21;
      t1 = env22;
      t22 = env23;
      t3 = env24;
      t4 = env25;
      t5 = env26;
      t6 = env27;
      break;
    case 114:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      wA = env9;
      cp1 = env10;
      vA = env11;
      vB = env12;
      cp2 = env13;
      invMassA = env14;
      invIA = env15;
      a = env16;
      invMassB = env17;
      t2 = env18;
      invIB = env19;
      b = env20;
      t1 = env21;
      t25 = env22;
      t22 = env23;
      t3 = env24;
      t4 = env25;
      t5 = env26;
      t6 = env27;
      break;
    case 115:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      t26 = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      cp1 = env11;
      vA = env12;
      vB = env13;
      cp2 = env14;
      invMassA = env15;
      invIA = env16;
      a = env17;
      invMassB = env18;
      t2 = env19;
      invIB = env20;
      b = env21;
      t1 = env22;
      t25 = env23;
      t22 = env24;
      t3 = env25;
      t4 = env26;
      t5 = env27;
      t6 = env28;
      break;
    case 116:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      wA = env9;
      cp1 = env10;
      vA = env11;
      vB = env12;
      cp2 = env13;
      invMassA = env14;
      invIA = env15;
      a = env16;
      invMassB = env17;
      t2 = env18;
      invIB = env19;
      b = env20;
      t1 = env21;
      t3 = env22;
      t4 = env23;
      t5 = env24;
      t27 = env25;
      t6 = env26;
      break;
    case 117:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      t28 = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      cp1 = env11;
      vA = env12;
      vB = env13;
      cp2 = env14;
      invMassA = env15;
      invIA = env16;
      a = env17;
      invMassB = env18;
      t2 = env19;
      invIB = env20;
      b = env21;
      t1 = env22;
      t3 = env23;
      t4 = env24;
      t5 = env25;
      t27 = env26;
      t6 = env27;
      break;
    case 118:
      t7 = env0;
      t27 = env1;
      t8 = env2;
      i = env3;
      t9 = env4;
      t10 = env5;
      wB = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      cp1 = env11;
      vA = env12;
      vB = env13;
      cp2 = env14;
      invMassA = env15;
      invIA = env16;
      a = env17;
      invMassB = env18;
      t2 = env19;
      invIB = env20;
      b = env21;
      t1 = env22;
      t3 = env23;
      t4 = env24;
      t5 = env25;
      t6 = env26;
      t28 = env27;
      break;
    case 119:
      t7 = env0;
      t27 = env1;
      t8 = env2;
      i = env3;
      t9 = env4;
      t10 = env5;
      wB = env6;
      c = env7;
      t29 = env8;
      bodyA = env9;
      bodyB = env10;
      wA = env11;
      cp1 = env12;
      vA = env13;
      vB = env14;
      cp2 = env15;
      invMassA = env16;
      invIA = env17;
      a = env18;
      invMassB = env19;
      t2 = env20;
      invIB = env21;
      b = env22;
      t1 = env23;
      t3 = env24;
      t4 = env25;
      t5 = env26;
      t6 = env27;
      t28 = env28;
      break;
    case 120:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      c = env6;
      t30 = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      cp1 = env11;
      vA = env12;
      vB = env13;
      cp2 = env14;
      invMassA = env15;
      invIA = env16;
      a = env17;
      invMassB = env18;
      t2 = env19;
      invIB = env20;
      b = env21;
      t1 = env22;
      t3 = env23;
      t4 = env24;
      t5 = env25;
      t6 = env26;
      break;
    case 121:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      t31 = env5;
      wB = env6;
      c = env7;
      t30 = env8;
      bodyA = env9;
      bodyB = env10;
      wA = env11;
      cp1 = env12;
      vA = env13;
      vB = env14;
      cp2 = env15;
      invMassA = env16;
      invIA = env17;
      a = env18;
      invMassB = env19;
      t2 = env20;
      invIB = env21;
      b = env22;
      t1 = env23;
      t3 = env24;
      t4 = env25;
      t5 = env26;
      t6 = env27;
      break;
    case 122:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      c = env6;
      bodyA = env7;
      t32 = env8;
      bodyB = env9;
      wA = env10;
      cp1 = env11;
      vA = env12;
      vB = env13;
      cp2 = env14;
      invMassA = env15;
      invIA = env16;
      a = env17;
      invMassB = env18;
      t2 = env19;
      invIB = env20;
      b = env21;
      t1 = env22;
      t3 = env23;
      t4 = env24;
      t5 = env25;
      t6 = env26;
      break;
    case 123:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      t33 = env6;
      c = env7;
      bodyA = env8;
      t32 = env9;
      bodyB = env10;
      wA = env11;
      cp1 = env12;
      vA = env13;
      vB = env14;
      cp2 = env15;
      invMassA = env16;
      invIA = env17;
      a = env18;
      invMassB = env19;
      t2 = env20;
      invIB = env21;
      b = env22;
      t1 = env23;
      t3 = env24;
      t4 = env25;
      t5 = env26;
      t6 = env27;
      break;
    case 124:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t11 = env9;
      wA = env10;
      cp1 = env11;
      vA = env12;
      vB = env13;
      cp2 = env14;
      invMassA = env15;
      invIA = env16;
      a = env17;
      invMassB = env18;
      t2 = env19;
      invIB = env20;
      b = env21;
      t1 = env22;
      t3 = env23;
      t4 = env24;
      t5 = env25;
      t6 = env26;
      break;
    case 125:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t11 = env9;
      wA = env10;
      t12 = env11;
      cp1 = env12;
      vA = env13;
      vB = env14;
      cp2 = env15;
      invMassA = env16;
      invIA = env17;
      a = env18;
      invMassB = env19;
      t2 = env20;
      invIB = env21;
      b = env22;
      t1 = env23;
      t3 = env24;
      t4 = env25;
      t5 = env26;
      t6 = env27;
      break;
    case 126:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t11 = env9;
      wA = env10;
      t12 = env11;
      cp1 = env12;
      vA = env13;
      vB = env14;
      cp2 = env15;
      invMassA = env16;
      invIA = env17;
      a = env18;
      invMassB = env19;
      t2 = env20;
      invIB = env21;
      t1 = env22;
      t3 = env23;
      t4 = env24;
      t5 = env25;
      t13 = env26;
      t6 = env27;
      break;
    case 127:
      t7 = env0;
      t8 = env1;
      t13 = env2;
      i = env3;
      t9 = env4;
      t10 = env5;
      wB = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      t11 = env10;
      wA = env11;
      t12 = env12;
      cp1 = env13;
      vA = env14;
      vB = env15;
      cp2 = env16;
      invMassA = env17;
      invIA = env18;
      a = env19;
      invMassB = env20;
      t2 = env21;
      invIB = env22;
      t1 = env23;
      t3 = env24;
      t4 = env25;
      t5 = env26;
      t6 = env27;
      break;
    case 128:
      t7 = env0;
      invIA = env1;
      t8 = env2;
      t1 = env3;
      t9 = env4;
      i = env5;
      invIB = env6;
      t10 = env7;
      t2 = env8;
      wB = env9;
      t11 = env10;
      t3 = env11;
      t4 = env12;
      bodyA = env13;
      bodyB = env14;
      wA = env15;
      t5 = env16;
      cp1 = env17;
      vA = env18;
      t6 = env19;
      vB = env20;
      cp2 = env21;
      break;
    case 129:
      t7 = env0;
      t8 = env1;
      t9 = env2;
      i = env3;
      t10 = env4;
      wB = env5;
      bodyA = env6;
      bodyB = env7;
      wA = env8;
      cp1 = env9;
      vA = env10;
      vB = env11;
      cp2 = env12;
      invIA = env13;
      t1 = env14;
      t2 = env15;
      invIB = env16;
      t11 = env17;
      t3 = env18;
      t4 = env19;
      t12 = env20;
      t5 = env21;
      t6 = env22;
      break;
    case 130:
      t6 = env0;
      t7 = env1;
      cp2 = env2;
      t8 = env3;
      t1 = env4;
      t9 = env5;
      invIB = env6;
      t10 = env7;
      i = env8;
      t2 = env9;
      wB = env10;
      t3 = env11;
      t4 = env12;
      bodyA = env13;
      bodyB = env14;
      t5 = env15;
      cp1 = env16;
      wA0 = env17;
      vA = env18;
      vB = env19;
      t13 = env20;
      break;
    case 131:
      t6 = env0;
      t7 = env1;
      cp2 = env2;
      t14 = env3;
      t8 = env4;
      i = env5;
      invIB = env6;
      t10 = env7;
      t9 = env8;
      t1 = env9;
      t2 = env10;
      wB = env11;
      t3 = env12;
      t4 = env13;
      bodyA = env14;
      bodyB = env15;
      t5 = env16;
      cp1 = env17;
      wA0 = env18;
      vA = env19;
      vB = env20;
      t13 = env21;
      break;
    case 132:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      c = env6;
      t13 = env7;
      bodyA = env8;
      bodyB = env9;
      t11 = env10;
      wA = env11;
      t12 = env12;
      cp1 = env13;
      vA = env14;
      vB = env15;
      cp2 = env16;
      invMassA = env17;
      invIA = env18;
      a = env19;
      invMassB = env20;
      t2 = env21;
      invIB = env22;
      t1 = env23;
      t3 = env24;
      t4 = env25;
      t5 = env26;
      t6 = env27;
      break;
    case 133:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t11 = env9;
      wA = env10;
      t12 = env11;
      cp1 = env12;
      vA = env13;
      vB = env14;
      cp2 = env15;
      invMassA = env16;
      t14 = env17;
      invIA = env18;
      a = env19;
      invMassB = env20;
      t2 = env21;
      invIB = env22;
      t1 = env23;
      t3 = env24;
      t4 = env25;
      t5 = env26;
      t6 = env27;
      break;
    case 134:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t11 = env9;
      wA = env10;
      t12 = env11;
      cp1 = env12;
      vA = env13;
      vB = env14;
      cp2 = env15;
      invMassA = env16;
      t14 = env17;
      invIA = env18;
      a = env19;
      invMassB = env20;
      t15 = env21;
      invIB = env22;
      t2 = env23;
      t1 = env24;
      t3 = env25;
      t4 = env26;
      t5 = env27;
      t6 = env28;
      break;
    case 135:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      c = env6;
      bodyA = env7;
      bodyB = env8;
      t11 = env9;
      wA = env10;
      t12 = env11;
      cp1 = env12;
      vA = env13;
      vB = env14;
      cp2 = env15;
      invMassA = env16;
      invIA = env17;
      a = env18;
      invMassB = env19;
      t2 = env20;
      invIB = env21;
      vn2 = env22;
      t1 = env23;
      t13 = env24;
      t3 = env25;
      t4 = env26;
      t5 = env27;
      t6 = env28;
      break;
    case 136:
      cp2 = env0;
      t7 = env1;
      invIA = env2;
      t8 = env3;
      t1 = env4;
      i = env5;
      invIB = env6;
      t10 = env7;
      t9 = env8;
      t2 = env9;
      wB = env10;
      t3 = env11;
      t4 = env12;
      bodyA = env13;
      bodyB = env14;
      wA = env15;
      t5 = env16;
      cp1 = env17;
      vA = env18;
      t6 = env19;
      t11 = env20;
      vB = env21;
      break;
    case 137:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      bodyA = env6;
      bodyB = env7;
      wA = env8;
      cp1 = env9;
      vA = env10;
      t11 = env11;
      cp2 = env12;
      vB = env13;
      invIA = env14;
      t1 = env15;
      t2 = env16;
      invIB = env17;
      t12 = env18;
      t3 = env19;
      t4 = env20;
      t5 = env21;
      t6 = env22;
      break;
    case 138:
      t7 = env0;
      t8 = env1;
      t1 = env2;
      t9 = env3;
      i = env4;
      invIB = env5;
      t10 = env6;
      wA0 = env7;
      t2 = env8;
      t13 = env9;
      wB = env10;
      t3 = env11;
      t4 = env12;
      bodyA = env13;
      bodyB = env14;
      t5 = env15;
      cp1 = env16;
      vA = env17;
      t6 = env18;
      vB = env19;
      cp2 = env20;
      break;
    case 139:
      t7 = env0;
      t8 = env1;
      t1 = env2;
      i = env3;
      invIB = env4;
      t10 = env5;
      t9 = env6;
      wA0 = env7;
      t2 = env8;
      t13 = env9;
      wB = env10;
      t14 = env11;
      t3 = env12;
      t4 = env13;
      bodyA = env14;
      bodyB = env15;
      t5 = env16;
      cp1 = env17;
      vA = env18;
      t6 = env19;
      vB = env20;
      cp2 = env21;
      break;
    case 140:
      t7 = env0;
      t8 = env1;
      t13 = env2;
      i = env3;
      t9 = env4;
      t10 = env5;
      wB = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      t11 = env10;
      wA = env11;
      t12 = env12;
      cp1 = env13;
      vA = env14;
      vB = env15;
      cp2 = env16;
      invMassA = env17;
      invIA = env18;
      a = env19;
      invMassB = env20;
      t2 = env21;
      invIB = env22;
      t1 = env23;
      t3 = env24;
      t4 = env25;
      t5 = env26;
      t6 = env27;
      break;
    case 141:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      t14 = env5;
      wB = env6;
      c = env7;
      bodyA = env8;
      bodyB = env9;
      t11 = env10;
      wA = env11;
      t12 = env12;
      cp1 = env13;
      vA = env14;
      vB = env15;
      cp2 = env16;
      invMassA = env17;
      invIA = env18;
      a = env19;
      invMassB = env20;
      t2 = env21;
      invIB = env22;
      t1 = env23;
      t3 = env24;
      t4 = env25;
      t5 = env26;
      t6 = env27;
      break;
    case 142:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      t14 = env5;
      t15 = env6;
      wB = env7;
      c = env8;
      bodyA = env9;
      bodyB = env10;
      t11 = env11;
      wA = env12;
      t12 = env13;
      cp1 = env14;
      vA = env15;
      vB = env16;
      cp2 = env17;
      invMassA = env18;
      invIA = env19;
      a = env20;
      invMassB = env21;
      t2 = env22;
      invIB = env23;
      t1 = env24;
      t3 = env25;
      t4 = env26;
      t5 = env27;
      t6 = env28;
      break;
    case 143:
      t7 = env0;
      t8 = env1;
      i = env2;
      t9 = env3;
      t10 = env4;
      wB = env5;
      c = env6;
      bodyA = env7;
      vn1 = env8;
      bodyB = env9;
      t11 = env10;
      wA = env11;
      t12 = env12;
      cp1 = env13;
      vA = env14;
      t13 = env15;
      vB = env16;
      cp2 = env17;
      invMassA = env18;
      invIA = env19;
      a = env20;
      invMassB = env21;
      t2 = env22;
      invIB = env23;
      t1 = env24;
      t3 = env25;
      t4 = env26;
      t5 = env27;
      t6 = env28;
      break;
    case 144:
      t7 = env0;
      invIA = env1;
      t8 = env2;
      t1 = env3;
      t9 = env4;
      i = env5;
      invIB = env6;
      t10 = env7;
      t2 = env8;
      t11 = env9;
      wB = env10;
      t3 = env11;
      t4 = env12;
      bodyA = env13;
      bodyB = env14;
      wA = env15;
      t5 = env16;
      cp1 = env17;
      vA = env18;
      t6 = env19;
      vB = env20;
      cp2 = env21;
      break;
    case 145:
      t7 = env0;
      t8 = env1;
      t9 = env2;
      i = env3;
      t10 = env4;
      t11 = env5;
      wB = env6;
      t12 = env7;
      bodyA = env8;
      bodyB = env9;
      wA = env10;
      cp1 = env11;
      vA = env12;
      vB = env13;
      cp2 = env14;
      invIA = env15;
      t1 = env16;
      t2 = env17;
      invIB = env18;
      t3 = env19;
      t4 = env20;
      t5 = env21;
      t6 = env22;
      break;
    case 146:
      cp2 = env0;
      t7 = env1;
      t8 = env2;
      t1 = env3;
      t9 = env4;
      i = env5;
      invIB = env6;
      t10 = env7;
      t2 = env8;
      wB = env9;
      t3 = env10;
      t4 = env11;
      bodyA = env12;
      bodyB = env13;
      wA0 = env14;
      t5 = env15;
      t13 = env16;
      cp1 = env17;
      vA = env18;
      t6 = env19;
      vB = env20;
      break;
    case 147:
      cp2 = env0;
      vB = env1;
      t7 = env2;
      t8 = env3;
      t1 = env4;
      i = env5;
      invIB = env6;
      t10 = env7;
      t9 = env8;
      t2 = env9;
      wB = env10;
      t3 = env11;
      t4 = env12;
      bodyA = env13;
      bodyB = env14;
      wA0 = env15;
      t5 = env16;
      t13 = env17;
      cp1 = env18;
      vA = env19;
      t6 = env20;
      t14 = env21;
      break;
    case 148:
      t7 = env0;
      invIA = env1;
      t8 = env2;
      t1 = env3;
      t9 = env4;
      i = env5;
      invIB = env6;
      t10 = env7;
      t11 = env8;
      t2 = env9;
      wB = env10;
      t3 = env11;
      t4 = env12;
      bodyA = env13;
      bodyB = env14;
      wA = env15;
      t5 = env16;
      cp1 = env17;
      vA = env18;
      t6 = env19;
      vB = env20;
      cp2 = env21;
      break;
    case 149:
      t7 = env0;
      t8 = env1;
      t9 = env2;
      i = env3;
      t10 = env4;
      wB = env5;
      bodyA = env6;
      bodyB = env7;
      wA = env8;
      cp1 = env9;
      vA = env10;
      vB = env11;
      cp2 = env12;
      invIA = env13;
      t1 = env14;
      t2 = env15;
      invIB = env16;
      t11 = env17;
      t12 = env18;
      t3 = env19;
      t4 = env20;
      t5 = env21;
      t6 = env22;
      break;
    case 150:
      t7 = env0;
      t8 = env1;
      t1 = env2;
      t9 = env3;
      i = env4;
      invIB = env5;
      t10 = env6;
      t2 = env7;
      wB = env8;
      t3 = env9;
      t4 = env10;
      bodyA = env11;
      wA0 = env12;
      bodyB = env13;
      t13 = env14;
      t5 = env15;
      cp1 = env16;
      vA = env17;
      t6 = env18;
      vB = env19;
      cp2 = env20;
      break;
    case 151:
      cp2 = env0;
      t7 = env1;
      t8 = env2;
      t1 = env3;
      i = env4;
      invIB = env5;
      t10 = env6;
      t9 = env7;
      t2 = env8;
      wB = env9;
      t3 = env10;
      t4 = env11;
      bodyA = env12;
      wA0 = env13;
      bodyB = env14;
      t13 = env15;
      t5 = env16;
      cp1 = env17;
      vA = env18;
      t14 = env19;
      t6 = env20;
      vB = env21;
      break;
    case 152:
      i = env0;
      t7 = env1;
      t8 = env2;
      t1 = env3;
      t9 = env4;
      t2 = env5;
      t10 = env6;
      t4 = env7;
      t5 = env8;
      t3 = env9;
      t6 = env10;
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
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
    case 19:
    case 20:
    case 21:
    case 22:
    case 23:
    case 24:
    case 25:
    case 26:
    case 27:
    case 28:
    case 29:
    case 30:
    case 31:
    case 32:
    case 33:
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
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, this.constraintCount)) break L0;
            var c = $.propertyTypeCheck($.index(this.constraints, i), 'is$ContactConstraint');
            var bodyA = $.propertyTypeCheck(c.get$bodyA(), 'is$Body');
            var bodyB = $.propertyTypeCheck(c.get$bodyB(), 'is$Body');
            var wA = $.numTypeCheck(bodyA.get$angularVelocity());
          case 1:
            state = 0;
            var wB = $.numTypeCheck(bodyB.get$angularVelocity());
          case 2:
            state = 0;
            var vA = $.propertyTypeCheck(bodyA.get$linearVelocity(), 'is$Vector');
            var vB = $.propertyTypeCheck(bodyB.get$linearVelocity(), 'is$Vector');
            var invMassA = $.numTypeCheck(bodyA.get$invMass());
          case 3:
            state = 0;
            var invIA = $.numTypeCheck(bodyA.get$invInertia());
          case 4:
            state = 0;
            var invMassB = $.numTypeCheck(bodyB.get$invMass());
          case 5:
            state = 0;
            var invIB = $.numTypeCheck(bodyB.get$invInertia());
          case 6:
            state = 0;
            var t11 = c.get$normal().get$y();
            if (typeof t11 !== 'number') throw $.iae(t11);
            t1.set$x(1.0 * t11);
            var t12 = c.get$normal().get$x();
            if (typeof t12 !== 'number') throw $.iae(t12);
            t1.set$y(-1.0 * t12);
            var friction = $.numTypeCheck(c.get$friction());
          case 7:
            state = 0;
            t11 = c.get$pointCount();
          case 8:
            state = 0;
          case 9:
            if (state == 9 || (state == 0 && !$.eqB(t11, 1))) {
              switch (state) {
                case 0:
                  t11 = c.get$pointCount();
                case 9:
                  state = 0;
                  t11 = $.eqB(t11, 2);
              }
            } else {
              t11 = true;
            }
            $.assert(t11);
            var j = 0;
          case 10:
          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
          case 16:
          case 17:
          case 18:
          case 19:
          case 20:
          case 21:
          case 22:
          case 23:
          case 24:
          case 25:
          case 26:
          case 27:
          case 28:
          case 29:
          case 30:
          case 31:
          case 32:
          case 33:
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
            L1: while (true) {
              switch (state) {
                case 0:
                  if (!$.ltB(j, c.get$pointCount())) break L1;
                  var ccp = $.propertyTypeCheck($.index(c.get$points(), j), 'is$ContactConstraintPoint');
                  var a = $.propertyTypeCheck(ccp.get$rA(), 'is$Vector');
                  t11 = $.neg(wB);
                  t12 = ccp.get$rB().get$y();
                case 10:
                  state = 0;
                  t12 = $.mul(t11, t12);
                  t11 = vB.get$x();
                case 11:
                  state = 0;
                  t11 = $.add(t12, t11);
                  t12 = vA.get$x();
                case 12:
                  state = 0;
                  t12 = $.sub(t11, t12);
                  t11 = a.get$y();
                case 13:
                  state = 0;
                  t2.set$x($.add(t12, $.mul(wA, t11)));
                  var t13 = ccp.get$rB().get$x();
                case 14:
                  state = 0;
                  t13 = $.mul(wB, t13);
                  var t14 = vB.get$y();
                case 15:
                  state = 0;
                  t14 = $.add(t13, t14);
                  t13 = vA.get$y();
                case 16:
                  state = 0;
                  t13 = $.sub(t14, t13);
                  t14 = a.get$x();
                case 17:
                  state = 0;
                  t2.set$y($.sub(t13, $.mul(wA, t14)));
                  var t15 = t2.get$x();
                case 18:
                  state = 0;
                  var t16 = t1.get$x();
                case 19:
                  state = 0;
                  t16 = $.mul(t15, t16);
                  t15 = t2.get$y();
                case 20:
                  state = 0;
                  var t17 = t1.get$y();
                case 21:
                  state = 0;
                  var vt = $.numTypeCheck($.add(t16, $.mul(t15, t17)));
                case 22:
                  state = 0;
                  t16 = ccp.get$tangentMass();
                case 23:
                  state = 0;
                  var lambda = $.numTypeCheck($.mul(t16, $.neg(vt)));
                case 24:
                  state = 0;
                  t16 = ccp.get$normalImpulse();
                case 25:
                  state = 0;
                  var maxFriction = $.numTypeCheck($.mul(friction, t16));
                case 26:
                  state = 0;
                  t16 = ccp.get$tangentImpulse();
                case 27:
                  state = 0;
                  var newImpulse = $.numTypeCheck($.MathBox_clamp($.add(t16, lambda), $.neg(maxFriction), maxFriction));
                case 28:
                  state = 0;
                  var t18 = ccp.get$tangentImpulse();
                case 29:
                  state = 0;
                  var lambda0 = $.numTypeCheck($.sub(newImpulse, t18));
                case 30:
                  state = 0;
                  t18 = t1.get$x();
                case 31:
                  state = 0;
                  var Px = $.numTypeCheck($.mul(t18, lambda0));
                case 32:
                  state = 0;
                  t18 = t1.get$y();
                case 33:
                  state = 0;
                  var Py = $.numTypeCheck($.mul(t18, lambda0));
                case 34:
                  state = 0;
                  t18 = vA.get$x();
                case 35:
                  state = 0;
                  vA.set$x($.sub(t18, $.mul(Px, invMassA)));
                  var t19 = vA.get$y();
                case 36:
                  state = 0;
                  vA.set$y($.sub(t19, $.mul(Py, invMassA)));
                  var t20 = ccp.get$rA().get$x();
                case 37:
                  state = 0;
                  t20 = $.mul(t20, Py);
                  var t21 = ccp.get$rA().get$y();
                case 38:
                  state = 0;
                  wA = $.numTypeCheck($.sub(wA, $.mul(invIA, $.sub(t20, $.mul(t21, Px)))));
                case 39:
                  state = 0;
                  var t22 = vB.get$x();
                case 40:
                  state = 0;
                  vB.set$x($.add(t22, $.mul(Px, invMassB)));
                  var t23 = vB.get$y();
                case 41:
                  state = 0;
                  vB.set$y($.add(t23, $.mul(Py, invMassB)));
                  var t24 = ccp.get$rB().get$x();
                case 42:
                  state = 0;
                  t24 = $.mul(t24, Py);
                  var t25 = ccp.get$rB().get$y();
                case 43:
                  state = 0;
                  wB = $.numTypeCheck($.add(wB, $.mul(invIB, $.sub(t24, $.mul(t25, Px)))));
                case 44:
                  state = 0;
                  ccp.set$tangentImpulse(newImpulse);
                  j = $.intTypeCheck($.add(j, 1));
                case 45:
                  state = 0;
              }
            }
            t11 = c.get$pointCount();
          case 46:
            state = 0;
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
            if (state == 47 || state == 48 || state == 49 || state == 50 || state == 51 || state == 52 || state == 53 || state == 54 || state == 55 || state == 56 || state == 57 || state == 58 || state == 59 || state == 60 || state == 61 || state == 62 || state == 63 || state == 64 || state == 65 || state == 66 || state == 67 || state == 68 || state == 69 || state == 70 || state == 71 || state == 72 || state == 73 || state == 74 || state == 75 || state == 76 || state == 77 || state == 78 || state == 79 || (state == 0 && $.eqB(t11, 1))) {
              switch (state) {
                case 0:
                  t11 = c.get$points();
                case 47:
                  state = 0;
                  ccp = $.propertyTypeCheck($.index(t11, 0), 'is$ContactConstraintPoint');
                  var a1 = $.propertyTypeCheck(ccp.get$rA(), 'is$Vector');
                  t11 = $.neg(wB);
                  t12 = ccp.get$rB().get$y();
                case 48:
                  state = 0;
                  t12 = $.mul(t11, t12);
                  t11 = vB.get$x();
                case 49:
                  state = 0;
                  t11 = $.add(t12, t11);
                  t12 = vA.get$x();
                case 50:
                  state = 0;
                  t12 = $.sub(t11, t12);
                  t11 = a1.get$y();
                case 51:
                  state = 0;
                  t2.set$x($.add(t12, $.mul(wA, t11)));
                  t13 = ccp.get$rB().get$x();
                case 52:
                  state = 0;
                  t13 = $.mul(wB, t13);
                  t14 = vB.get$y();
                case 53:
                  state = 0;
                  t14 = $.add(t13, t14);
                  t13 = vA.get$y();
                case 54:
                  state = 0;
                  t13 = $.sub(t14, t13);
                  t14 = a1.get$x();
                case 55:
                  state = 0;
                  t2.set$y($.sub(t13, $.mul(wA, t14)));
                  var b = $.propertyTypeCheck(c.get$normal(), 'is$Vector');
                  t15 = t2.get$x();
                case 56:
                  state = 0;
                  t16 = b.get$x();
                case 57:
                  state = 0;
                  t16 = $.mul(t15, t16);
                  t15 = t2.get$y();
                case 58:
                  state = 0;
                  t17 = b.get$y();
                case 59:
                  state = 0;
                  var vn = $.numTypeCheck($.add(t16, $.mul(t15, t17)));
                case 60:
                  state = 0;
                  t16 = ccp.get$normalMass();
                case 61:
                  state = 0;
                  t16 = $.neg(t16);
                  t18 = ccp.get$velocityBias();
                case 62:
                  state = 0;
                  lambda = $.numTypeCheck($.mul(t16, $.sub(vn, t18)));
                case 63:
                  state = 0;
                  t16 = ccp.get$normalImpulse();
                case 64:
                  state = 0;
                  a = $.numTypeCheck($.add(t16, lambda));
                case 65:
                  state = 0;
                  newImpulse = $.gtB(a, 0.0) ? a : 0.0;
                  t11 = ccp.get$normalImpulse();
                case 66:
                  state = 0;
                  lambda = $.numTypeCheck($.sub(newImpulse, t11));
                case 67:
                  state = 0;
                  t11 = c.get$normal().get$x();
                case 68:
                  state = 0;
                  Px = $.numTypeCheck($.mul(t11, lambda));
                case 69:
                  state = 0;
                  t11 = c.get$normal().get$y();
                case 70:
                  state = 0;
                  Py = $.numTypeCheck($.mul(t11, lambda));
                case 71:
                  state = 0;
                  t11 = vA.get$x();
                case 72:
                  state = 0;
                  vA.set$x($.sub(t11, $.mul(Px, invMassA)));
                  t12 = vA.get$y();
                case 73:
                  state = 0;
                  vA.set$y($.sub(t12, $.mul(Py, invMassA)));
                  t13 = ccp.get$rA().get$x();
                case 74:
                  state = 0;
                  t13 = $.mul(t13, Py);
                  t14 = ccp.get$rA().get$y();
                case 75:
                  state = 0;
                  wA = $.numTypeCheck($.sub(wA, $.mul(invIA, $.sub(t13, $.mul(t14, Px)))));
                  t15 = vB.get$x();
                case 76:
                  state = 0;
                  vB.set$x($.add(t15, $.mul(Px, invMassB)));
                  t16 = vB.get$y();
                case 77:
                  state = 0;
                  vB.set$y($.add(t16, $.mul(Py, invMassB)));
                  t17 = ccp.get$rB().get$x();
                case 78:
                  state = 0;
                  t17 = $.mul(t17, Py);
                  t18 = ccp.get$rB().get$y();
                case 79:
                  state = 0;
                  wB = $.numTypeCheck($.add(wB, $.mul(invIB, $.sub(t17, $.mul(t18, Px)))));
                  ccp.set$normalImpulse(newImpulse);
              }
            } else {
              switch (state) {
                case 0:
                  t11 = c.get$points();
                case 80:
                  state = 0;
                  var cp1 = $.propertyTypeCheck($.index(t11, 0), 'is$ContactConstraintPoint');
                  t11 = c.get$points();
                case 81:
                  state = 0;
                  var cp2 = $.propertyTypeCheck($.index(t11, 1), 'is$ContactConstraintPoint');
                  a = $.Vector$(cp1.get$normalImpulse(), cp2.get$normalImpulse());
                  t11 = a.x;
                case 82:
                  state = 0;
                case 83:
                  if (state == 83 || (state == 0 && $.geB(t11, 0.0))) {
                    switch (state) {
                      case 0:
                        t11 = a.y;
                      case 83:
                        state = 0;
                        t11 = $.geB(t11, 0.0);
                    }
                  } else {
                    t11 = false;
                  }
                  $.assert(t11);
                  t11 = $.neg(wB);
                  t12 = cp1.get$rB().get$y();
                case 84:
                  state = 0;
                  t12 = $.mul(t11, t12);
                  t11 = vB.get$x();
                case 85:
                  state = 0;
                  t11 = $.add(t12, t11);
                  t12 = vA.get$x();
                case 86:
                  state = 0;
                  t12 = $.sub(t11, t12);
                  t11 = cp1.get$rA().get$y();
                case 87:
                  state = 0;
                  t3.set$x($.add(t12, $.mul(wA, t11)));
                  t13 = cp1.get$rB().get$x();
                case 88:
                  state = 0;
                  t13 = $.mul(wB, t13);
                  t14 = vB.get$y();
                case 89:
                  state = 0;
                  t14 = $.add(t13, t14);
                  t13 = vA.get$y();
                case 90:
                  state = 0;
                  t13 = $.sub(t14, t13);
                  t14 = cp1.get$rA().get$x();
                case 91:
                  state = 0;
                  t3.set$y($.sub(t13, $.mul(wA, t14)));
                  t15 = $.neg(wB);
                  t16 = cp2.get$rB().get$y();
                case 92:
                  state = 0;
                  t16 = $.mul(t15, t16);
                  t15 = vB.get$x();
                case 93:
                  state = 0;
                  t15 = $.add(t16, t15);
                  t16 = vA.get$x();
                case 94:
                  state = 0;
                  t16 = $.sub(t15, t16);
                  t15 = cp2.get$rA().get$y();
                case 95:
                  state = 0;
                  t4.set$x($.add(t16, $.mul(wA, t15)));
                  t17 = cp2.get$rB().get$x();
                case 96:
                  state = 0;
                  t17 = $.mul(wB, t17);
                  t18 = vB.get$y();
                case 97:
                  state = 0;
                  t18 = $.add(t17, t18);
                  t17 = vA.get$y();
                case 98:
                  state = 0;
                  t17 = $.sub(t18, t17);
                  t18 = cp2.get$rA().get$x();
                case 99:
                  state = 0;
                  t4.set$y($.sub(t17, $.mul(wA, t18)));
                  t19 = t3.get$x();
                case 100:
                  state = 0;
                  t20 = c.get$normal().get$x();
                case 101:
                  state = 0;
                  t20 = $.mul(t19, t20);
                  t19 = t3.get$y();
                case 102:
                  state = 0;
                  t21 = c.get$normal().get$y();
                case 103:
                  state = 0;
                  var vn1 = $.numTypeCheck($.add(t20, $.mul(t19, t21)));
                case 104:
                  state = 0;
                  t20 = t4.get$x();
                case 105:
                  state = 0;
                  t22 = c.get$normal().get$x();
                case 106:
                  state = 0;
                  t22 = $.mul(t20, t22);
                  t20 = t4.get$y();
                case 107:
                  state = 0;
                  t23 = c.get$normal().get$y();
                case 108:
                  state = 0;
                  var vn2 = $.numTypeCheck($.add(t22, $.mul(t20, t23)));
                case 109:
                  state = 0;
                  t22 = cp1.get$velocityBias();
                case 110:
                  state = 0;
                  t22 = $.sub(vn1, t22);
                  t24 = cp2.get$velocityBias();
                case 111:
                  state = 0;
                  b = $.Vector$(t22, $.sub(vn2, t24));
                  t22 = c.get$K().get$col1().get$x();
                case 112:
                  state = 0;
                  t25 = a.x;
                case 113:
                  state = 0;
                  t25 = $.mul(t22, t25);
                  t22 = c.get$K().get$col2().get$x();
                case 114:
                  state = 0;
                  var t26 = a.y;
                case 115:
                  state = 0;
                  t5.set$x($.add(t25, $.mul(t22, t26)));
                  var t27 = c.get$K().get$col1().get$y();
                case 116:
                  state = 0;
                  var t28 = a.x;
                case 117:
                  state = 0;
                  t28 = $.mul(t27, t28);
                  t27 = c.get$K().get$col2().get$y();
                case 118:
                  state = 0;
                  var t29 = a.y;
                case 119:
                  state = 0;
                  t5.set$y($.add(t28, $.mul(t27, t29)));
                  var t30 = b.x;
                case 120:
                  state = 0;
                  var t31 = t5.get$x();
                case 121:
                  state = 0;
                  b.x = $.sub(t30, t31);
                  var t32 = b.y;
                case 122:
                  state = 0;
                  var t33 = t5.get$y();
                case 123:
                  state = 0;
                  b.y = $.sub(t32, t33);
                  t11 = b.x;
                case 124:
                  state = 0;
                  t12 = b.y;
                case 125:
                  state = 0;
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
                  L2: while (true) {
                    switch (state) {
                      case 0:
                        if (!true) break L2;
                        $.Matrix22_mulMatrixAndVectorToOut(c.get$normalMass(), b, t6);
                        t6.mulLocal$1(-1);
                        t13 = t6.get$x();
                      case 126:
                        state = 0;
                      case 127:
                        if (state == 127 || (state == 0 && $.geB(t13, 0.0))) {
                          switch (state) {
                            case 0:
                              t13 = t6.get$y();
                            case 127:
                              state = 0;
                              t13 = $.geB(t13, 0.0);
                          }
                        } else {
                          t13 = false;
                        }
                      case 128:
                      case 129:
                      case 130:
                      case 131:
                        if (state == 128 || state == 129 || state == 130 || state == 131 || (state == 0 && t13)) {
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
                              t11 = $.Vector_crossVectors(cp1.get$rA(), t8);
                            case 128:
                              state = 0;
                              t12 = $.Vector_crossVectors(cp2.get$rA(), t9);
                            case 129:
                              state = 0;
                              var wA0 = $.numTypeCheck($.sub(wA, $.mul(invIA, $.add(t11, t12))));
                              t13 = $.Vector_crossVectors(cp1.get$rB(), t8);
                            case 130:
                              state = 0;
                              t14 = $.Vector_crossVectors(cp2.get$rB(), t9);
                            case 131:
                              state = 0;
                              var wB0 = $.numTypeCheck($.add(wB, $.mul(invIB, $.add(t13, t14))));
                              cp1.set$normalImpulse(t6.get$x());
                              cp2.set$normalImpulse(t6.get$y());
                              wA = wA0;
                              wB = wB0;
                              break L2;
                          }
                        }
                        t13 = cp1.get$normalMass();
                      case 132:
                        state = 0;
                        t6.set$x($.mul($.neg(t13), t11));
                        t6.set$y(0.0);
                        t14 = c.get$K().get$col1().get$y();
                      case 133:
                        state = 0;
                        t15 = t6.get$x();
                      case 134:
                        state = 0;
                        vn2 = $.numTypeCheck($.add($.mul(t14, t15), t12));
                        t13 = t6.get$x();
                      case 135:
                        state = 0;
                      case 136:
                      case 137:
                      case 138:
                      case 139:
                        if (state == 136 || state == 137 || state == 138 || state == 139 || (state == 0 && ($.geB(t13, 0.0) && $.geB(vn2, 0.0)))) {
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
                              t11 = $.Vector_crossVectors(cp1.get$rA(), t8);
                            case 136:
                              state = 0;
                              t12 = $.Vector_crossVectors(cp2.get$rA(), t9);
                            case 137:
                              state = 0;
                              wA0 = $.numTypeCheck($.sub(wA, $.mul(invIA, $.add(t11, t12))));
                              t13 = $.Vector_crossVectors(cp1.get$rB(), t8);
                            case 138:
                              state = 0;
                              t14 = $.Vector_crossVectors(cp2.get$rB(), t9);
                            case 139:
                              state = 0;
                              wB0 = $.numTypeCheck($.add(wB, $.mul(invIB, $.add(t13, t14))));
                              cp1.set$normalImpulse(t6.get$x());
                              cp2.set$normalImpulse(t6.get$y());
                              wA = wA0;
                              wB = wB0;
                              break L2;
                          }
                        }
                        t6.set$x(0.0);
                        t13 = cp2.get$normalMass();
                      case 140:
                        state = 0;
                        t6.set$y($.mul($.neg(t13), t12));
                        t14 = c.get$K().get$col2().get$x();
                      case 141:
                        state = 0;
                        t15 = t6.get$y();
                      case 142:
                        state = 0;
                        vn1 = $.numTypeCheck($.add($.mul(t14, t15), t11));
                        t13 = t6.get$y();
                      case 143:
                        state = 0;
                      case 144:
                      case 145:
                      case 146:
                      case 147:
                        if (state == 144 || state == 145 || state == 146 || state == 147 || (state == 0 && ($.geB(t13, 0.0) && $.geB(vn1, 0.0)))) {
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
                              t11 = $.Vector_crossVectors(cp1.get$rA(), t8);
                            case 144:
                              state = 0;
                              t12 = $.Vector_crossVectors(cp2.get$rA(), t9);
                            case 145:
                              state = 0;
                              wA0 = $.numTypeCheck($.sub(wA, $.mul(invIA, $.add(t11, t12))));
                              t13 = $.Vector_crossVectors(cp1.get$rB(), t8);
                            case 146:
                              state = 0;
                              t14 = $.Vector_crossVectors(cp2.get$rB(), t9);
                            case 147:
                              state = 0;
                              wB0 = $.numTypeCheck($.add(wB, $.mul(invIB, $.add(t13, t14))));
                              cp1.set$normalImpulse(t6.get$x());
                              cp2.set$normalImpulse(t6.get$y());
                              wA = wA0;
                              wB = wB0;
                              break L2;
                          }
                        }
                        t6.set$x(0.0);
                        t6.set$y(0.0);
                        $.numTypeCheck(t11);
                        $.numTypeCheck(t12);
                      case 148:
                      case 149:
                      case 150:
                      case 151:
                        if (state == 148 || state == 149 || state == 150 || state == 151 || (state == 0 && ($.geB(t11, 0.0) && $.geB(t12, 0.0)))) {
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
                              t11 = $.Vector_crossVectors(cp1.get$rA(), t8);
                            case 148:
                              state = 0;
                              t12 = $.Vector_crossVectors(cp2.get$rA(), t9);
                            case 149:
                              state = 0;
                              wA0 = $.numTypeCheck($.sub(wA, $.mul(invIA, $.add(t11, t12))));
                              t13 = $.Vector_crossVectors(cp1.get$rB(), t8);
                            case 150:
                              state = 0;
                              t14 = $.Vector_crossVectors(cp2.get$rB(), t9);
                            case 151:
                              state = 0;
                              wB0 = $.numTypeCheck($.add(wB, $.mul(invIB, $.add(t13, t14))));
                              cp1.set$normalImpulse(t6.get$x());
                              cp2.set$normalImpulse(t6.get$y());
                              wA = wA0;
                              wB = wB0;
                              break L2;
                          }
                        }
                        break L2;
                    }
                  }
              }
            }
            bodyA.get$linearVelocity().setFrom$1(vA);
            bodyA.set$angularVelocity(wA);
            bodyB.get$linearVelocity().setFrom$1(vB);
            bodyB.set$angularVelocity(wB);
            i = $.intTypeCheck($.add(i, 1));
          case 152:
            state = 0;
        }
      }
  }
 },
 warmStart$0: function() {
  for (var t1 = this.tangent, i = 0; $.ltB(i, this.constraintCount); i = $.intTypeCheck($.add(i, 1))) {
    var c = $.propertyTypeCheck($.index(this.constraints, i), 'is$ContactConstraint');
    var bodyA = $.propertyTypeCheck(c.get$bodyA(), 'is$Body');
    var bodyB = $.propertyTypeCheck(c.get$bodyB(), 'is$Body');
    var invMassA = $.numTypeCheck(bodyA.get$invMass());
    if (typeof invMassA !== 'number') return this.warmStart$0$bailout(1, c, bodyA, i, t1, bodyB, invMassA, 0, 0, 0);
    var invIA = $.numTypeCheck(bodyA.get$invInertia());
    if (typeof invIA !== 'number') return this.warmStart$0$bailout(2, c, bodyA, i, t1, bodyB, invMassA, invIA, 0, 0);
    var invMassB = $.numTypeCheck(bodyB.get$invMass());
    if (typeof invMassB !== 'number') return this.warmStart$0$bailout(3, c, bodyA, i, t1, bodyB, invMassA, invIA, invMassB, 0);
    var invIB = $.numTypeCheck(bodyB.get$invInertia());
    if (typeof invIB !== 'number') return this.warmStart$0$bailout(4, c, bodyA, i, t1, bodyB, invMassA, invIA, invMassB, invIB);
    var normal = $.propertyTypeCheck(c.get$normal(), 'is$Vector');
    $.Vector_crossVectorAndNumToOut(normal, 1, t1);
    for (var j = 0; $.ltB(j, c.get$pointCount()); j = $.intTypeCheck($.add(j, 1))) {
      var ccp = $.propertyTypeCheck($.index(c.get$points(), j), 'is$ContactConstraintPoint');
      var Px = $.numTypeCheck($.add($.mul(ccp.get$normalImpulse(), normal.get$x()), $.mul(ccp.get$tangentImpulse(), t1.x)));
      var Py = $.numTypeCheck($.add($.mul(ccp.get$normalImpulse(), normal.get$y()), $.mul(ccp.get$tangentImpulse(), t1.y)));
      var t2 = bodyA.get$angularVelocity();
      var t3 = $.sub($.mul(ccp.get$rA().get$x(), Py), $.mul(ccp.get$rA().get$y(), Px));
      if (typeof t3 !== 'number') throw $.iae(t3);
      bodyA.set$angularVelocity($.sub(t2, invIA * t3));
      var t4 = bodyA.get$linearVelocity();
      t4.set$x($.sub(t4.get$x(), $.mul(Px, invMassA)));
      t4 = bodyA.get$linearVelocity();
      t4.set$y($.sub(t4.get$y(), $.mul(Py, invMassA)));
      t4 = bodyB.get$angularVelocity();
      var t5 = $.sub($.mul(ccp.get$rB().get$x(), Py), $.mul(ccp.get$rB().get$y(), Px));
      if (typeof t5 !== 'number') throw $.iae(t5);
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
      i = env2;
      t1 = env3;
      bodyB = env4;
      invMassA = env5;
      break;
    case 2:
      c = env0;
      bodyA = env1;
      i = env2;
      t1 = env3;
      bodyB = env4;
      invMassA = env5;
      invIA = env6;
      break;
    case 3:
      c = env0;
      bodyA = env1;
      i = env2;
      t1 = env3;
      bodyB = env4;
      invMassA = env5;
      invIA = env6;
      invMassB = env7;
      break;
    case 4:
      c = env0;
      bodyA = env1;
      i = env2;
      t1 = env3;
      bodyB = env4;
      invMassA = env5;
      invIA = env6;
      invMassB = env7;
      invIB = env8;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.tangent;
      var i = 0;
    case 1:
    case 2:
    case 3:
    case 4:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, this.constraintCount)) break L0;
            var c = $.propertyTypeCheck($.index(this.constraints, i), 'is$ContactConstraint');
            var bodyA = $.propertyTypeCheck(c.get$bodyA(), 'is$Body');
            var bodyB = $.propertyTypeCheck(c.get$bodyB(), 'is$Body');
            var invMassA = $.numTypeCheck(bodyA.get$invMass());
          case 1:
            state = 0;
            var invIA = $.numTypeCheck(bodyA.get$invInertia());
          case 2:
            state = 0;
            var invMassB = $.numTypeCheck(bodyB.get$invMass());
          case 3:
            state = 0;
            var invIB = $.numTypeCheck(bodyB.get$invInertia());
          case 4:
            state = 0;
            var normal = $.propertyTypeCheck(c.get$normal(), 'is$Vector');
            $.Vector_crossVectorAndNumToOut(normal, 1, t1);
            for (var j = 0; $.ltB(j, c.get$pointCount()); j = $.intTypeCheck($.add(j, 1))) {
              var ccp = $.propertyTypeCheck($.index(c.get$points(), j), 'is$ContactConstraintPoint');
              var Px = $.numTypeCheck($.add($.mul(ccp.get$normalImpulse(), normal.get$x()), $.mul(ccp.get$tangentImpulse(), t1.get$x())));
              var Py = $.numTypeCheck($.add($.mul(ccp.get$normalImpulse(), normal.get$y()), $.mul(ccp.get$tangentImpulse(), t1.get$y())));
              bodyA.set$angularVelocity($.sub(bodyA.get$angularVelocity(), $.mul(invIA, $.sub($.mul(ccp.get$rA().get$x(), Py), $.mul(ccp.get$rA().get$y(), Px)))));
              var t2 = bodyA.get$linearVelocity();
              t2.set$x($.sub(t2.get$x(), $.mul(Px, invMassA)));
              t2 = bodyA.get$linearVelocity();
              t2.set$y($.sub(t2.get$y(), $.mul(Py, invMassA)));
              bodyB.set$angularVelocity($.add(bodyB.get$angularVelocity(), $.mul(invIB, $.sub($.mul(ccp.get$rB().get$x(), Py), $.mul(ccp.get$rB().get$y(), Px)))));
              t2 = bodyB.get$linearVelocity();
              t2.set$x($.add(t2.get$x(), $.mul(Px, invMassB)));
              t2 = bodyB.get$linearVelocity();
              t2.set$y($.add(t2.get$y(), $.mul(Py, invMassB)));
            }
            i = $.intTypeCheck($.add(i, 1));
        }
      }
  }
 },
 init$3: function(contacts, contactCount, impulseRatio) {
  $.listTypeCheck(contacts);
  $.intTypeCheck(contactCount);
  $.numTypeCheck(impulseRatio);
  if (typeof impulseRatio !== 'number') return this.init$3$bailout(1, contacts, contactCount, impulseRatio, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  this.constraintCount = contactCount;
  if ($.ltB(this.constraints.length, contactCount)) {
    var old = $.listTypeCheck(this.constraints);
    var t1 = $.ListFactory_List($.intTypeCheck($.Math_max($.mul($.get$length(old), 2), this.constraintCount)));
    $.setRuntimeTypeInfo(t1, ({E: 'ContactConstraint'}));
    this.constraints = t1;
    $.setRange$3(this.constraints, 0, $.get$length(old), old);
    var i = $.intTypeCheck($.get$length(old));
    if (i !== (i | 0)) return this.init$3$bailout(2, i, contacts, impulseRatio, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    for (; $.ltB(i, this.constraints.length); i = $.intTypeCheck($.add(i, 1))) {
      $.indexSet(this.constraints, i, $.ContactConstraint$());
    }
  }
  for (t1 = this.worldManifold, t2 = this.tangent, t3 = this.temp2, t4 = this.temp1, t5 = t1.normal, t6 = t1.points, i = 0; $.ltB(i, this.constraintCount); i = $.intTypeCheck($.add(i, 1))) {
    var contact = $.propertyTypeCheck($.index(contacts, i), 'is$Contact');
    var fixtureA = $.propertyTypeCheck(contact.get$fixtureA(), 'is$Fixture');
    var fixtureB = $.propertyTypeCheck(contact.get$fixtureB(), 'is$Fixture');
    var shapeA = $.propertyTypeCheck(fixtureA.get$shape(), 'is$Shape');
    var shapeB = $.propertyTypeCheck(fixtureB.get$shape(), 'is$Shape');
    var radiusA = $.numTypeCheck(shapeA.get$radius());
    var radiusB = $.numTypeCheck(shapeB.get$radius());
    var bodyA = $.propertyTypeCheck(fixtureA.get$body(), 'is$Body');
    var bodyB = $.propertyTypeCheck(fixtureB.get$body(), 'is$Body');
    var manifold = $.propertyTypeCheck(contact.get$manifold(), 'is$Manifold');
    var friction = $.numTypeCheck($.Settings_mixFriction(fixtureA.get$friction(), fixtureB.get$friction()));
    var restitution = $.numTypeCheck($.Settings_mixRestitution(fixtureA.get$restitution(), fixtureB.get$restitution()));
    if (typeof restitution !== 'number') return this.init$3$bailout(3, t4, contacts, impulseRatio, radiusA, radiusB, bodyA, bodyB, t1, manifold, i, friction, t2, restitution, t3, 0, 0, 0, 0);
    var vA = $.propertyTypeCheck(bodyA.get$linearVelocity(), 'is$Vector');
    var vB = $.propertyTypeCheck(bodyB.get$linearVelocity(), 'is$Vector');
    var wA = $.numTypeCheck(bodyA.get$angularVelocity());
    if (typeof wA !== 'number') return this.init$3$bailout(4, vB, t4, wA, contacts, impulseRatio, radiusA, radiusB, bodyA, bodyB, t1, manifold, i, friction, t2, restitution, vA, t3, 0);
    var wB = $.numTypeCheck(bodyB.get$angularVelocity());
    if (typeof wB !== 'number') return this.init$3$bailout(5, vB, t4, wA, wB, contacts, impulseRatio, radiusA, radiusB, bodyA, bodyB, t1, manifold, i, friction, t2, restitution, vA, t3);
    $.assert($.gt(manifold.get$pointCount(), 0));
    t1.initialize$5(manifold, bodyA.get$originTransform(), radiusA, bodyB.get$originTransform(), radiusB);
    var cc = $.propertyTypeCheck($.index(this.constraints, i), 'is$ContactConstraint');
    cc.set$bodyA(bodyA);
    cc.set$bodyB(bodyB);
    cc.set$manifold(manifold);
    var t7 = t5.get$x();
    cc.get$normal().set$x(t7);
    t7 = t5.get$y();
    cc.get$normal().set$y(t7);
    cc.set$pointCount(manifold.get$pointCount());
    cc.set$friction(friction);
    cc.set$restitution(restitution);
    t7 = manifold.get$localNormal().get$x();
    cc.get$localNormal().set$x(t7);
    t7 = manifold.get$localNormal().get$y();
    cc.get$localNormal().set$y(t7);
    t7 = manifold.get$localPoint().get$x();
    cc.get$localPoint().set$x(t7);
    t7 = manifold.get$localPoint().get$y();
    cc.get$localPoint().set$y(t7);
    cc.set$radius($.add(radiusA, radiusB));
    cc.set$type(manifold.get$type());
    for (t7 = -wA, t8 = -wB, t9 = -restitution, j = 0; $.ltB(j, cc.get$pointCount()); j = $.intTypeCheck($.add(j, 1))) {
      var cp = $.propertyTypeCheck($.index(manifold.get$points(), j), 'is$ManifoldPoint');
      var ccp = $.propertyTypeCheck($.index(cc.get$points(), j), 'is$ContactConstraintPoint');
      var t10 = cp.get$normalImpulse();
      if (typeof t10 !== 'number') throw $.iae(t10);
      ccp.set$normalImpulse(impulseRatio * t10);
      var t11 = cp.get$tangentImpulse();
      if (typeof t11 !== 'number') throw $.iae(t11);
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
      var rnA = $.numTypeCheck($.sub($.mul(ccp.get$rA().get$x(), cc.get$normal().get$y()), $.mul(ccp.get$rA().get$y(), cc.get$normal().get$x())));
      var rnB = $.numTypeCheck($.sub($.mul(ccp.get$rB().get$x(), cc.get$normal().get$y()), $.mul(ccp.get$rB().get$y(), cc.get$normal().get$x())));
      rnA = $.numTypeCheck($.mul(rnA, rnA));
      rnB = $.numTypeCheck($.mul(rnB, rnB));
      var kNormal = $.numTypeCheck($.add($.add($.add(bodyA.get$invMass(), bodyB.get$invMass()), $.mul(bodyA.get$invInertia(), rnA)), $.mul(bodyB.get$invInertia(), rnB)));
      $.assert($.gt(kNormal, 1.192e-7));
      if (typeof kNormal !== 'number') throw $.iae(kNormal);
      ccp.set$normalMass(1.0 / kNormal);
      t12 = cc.get$normal().get$y();
      if (typeof t12 !== 'number') throw $.iae(t12);
      t2.x = 1.0 * t12;
      var t13 = cc.get$normal().get$x();
      if (typeof t13 !== 'number') throw $.iae(t13);
      t2.y = -1.0 * t13;
      var rtA = $.numTypeCheck($.sub($.mul(ccp.get$rA().get$x(), t2.y), $.mul(ccp.get$rA().get$y(), t2.x)));
      var rtB = $.numTypeCheck($.sub($.mul(ccp.get$rB().get$x(), t2.y), $.mul(ccp.get$rB().get$y(), t2.x)));
      rtA = $.numTypeCheck($.mul(rtA, rtA));
      rtB = $.numTypeCheck($.mul(rtB, rtB));
      var kTangent = $.numTypeCheck($.add($.add($.add(bodyA.get$invMass(), bodyB.get$invMass()), $.mul(bodyA.get$invInertia(), rtA)), $.mul(bodyB.get$invInertia(), rtB)));
      $.assert($.gt(kTangent, 1.192e-7));
      if (typeof kTangent !== 'number') throw $.iae(kTangent);
      ccp.set$tangentMass(1.0 / kTangent);
      ccp.set$velocityBias(0.0);
      var t14 = ccp.get$rA().get$y();
      if (typeof t14 !== 'number') throw $.iae(t14);
      t3.x = t7 * t14;
      var t15 = ccp.get$rA().get$x();
      if (typeof t15 !== 'number') throw $.iae(t15);
      t3.y = wA * t15;
      var t16 = ccp.get$rB().get$y();
      if (typeof t16 !== 'number') throw $.iae(t16);
      t16 *= t8;
      var t17 = vB.get$x();
      if (typeof t17 !== 'number') throw $.iae(t17);
      t17 += t16;
      t16 = vA.get$x();
      if (typeof t16 !== 'number') throw $.iae(t16);
      t16 = t17 - t16;
      t17 = t3.x;
      if (typeof t17 !== 'number') throw $.iae(t17);
      t4.x = t16 - t17;
      var t18 = ccp.get$rB().get$x();
      if (typeof t18 !== 'number') throw $.iae(t18);
      t18 *= wB;
      var t19 = vB.get$y();
      if (typeof t19 !== 'number') throw $.iae(t19);
      t19 += t18;
      t18 = vA.get$y();
      if (typeof t18 !== 'number') throw $.iae(t18);
      t18 = t19 - t18;
      t19 = t3.y;
      if (typeof t19 !== 'number') throw $.iae(t19);
      t4.y = t18 - t19;
      var a = $.propertyTypeCheck(cc.get$normal(), 'is$Vector');
      var vRel = $.numTypeCheck($.add($.mul(a.get$x(), t4.x), $.mul(a.get$y(), t4.y)));
      if ($.ltB(vRel, -1)) {
        if (typeof vRel !== 'number') throw $.iae(vRel);
        ccp.set$velocityBias(t9 * vRel);
      }
    }
    if ($.eqB(cc.get$pointCount(), 2)) {
      var ccp1 = $.propertyTypeCheck($.index(cc.get$points(), 0), 'is$ContactConstraintPoint');
      var ccp2 = $.propertyTypeCheck($.index(cc.get$points(), 1), 'is$ContactConstraintPoint');
      var invMassA = $.numTypeCheck(bodyA.get$invMass());
      var invIA = $.numTypeCheck(bodyA.get$invInertia());
      var invMassB = $.numTypeCheck(bodyB.get$invMass());
      var invIB = $.numTypeCheck(bodyB.get$invInertia());
      var rn1A = $.numTypeCheck($.Vector_crossVectors(ccp1.get$rA(), cc.get$normal()));
      var rn1B = $.numTypeCheck($.Vector_crossVectors(ccp1.get$rB(), cc.get$normal()));
      var rn2A = $.numTypeCheck($.Vector_crossVectors(ccp2.get$rA(), cc.get$normal()));
      var rn2B = $.numTypeCheck($.Vector_crossVectors(ccp2.get$rB(), cc.get$normal()));
      var k11 = $.numTypeCheck($.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rn1A), rn1A)), $.mul($.mul(invIB, rn1B), rn1B)));
      var k22 = $.numTypeCheck($.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rn2A), rn2A)), $.mul($.mul(invIB, rn2B), rn2B)));
      var k12 = $.numTypeCheck($.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rn1A), rn2A)), $.mul($.mul(invIB, rn1B), rn2B)));
      t7 = $.mul(k11, k11);
      t8 = $.sub($.mul(k11, k22), $.mul(k12, k12));
      if (typeof t8 !== 'number') throw $.iae(t8);
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
      } else cc.set$pointCount(1);
    }
  }
  var t3, t4, t8, t9, j, t2, t6, t5;
 },
 init$3$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13, env14, env15, env16, env17) {
  switch (state) {
    case 1:
      var contacts = env0;
      var contactCount = env1;
      var impulseRatio = env2;
      break;
    case 2:
      i = env0;
      contacts = env1;
      impulseRatio = env2;
      break;
    case 3:
      t4 = env0;
      contacts = env1;
      impulseRatio = env2;
      radiusA = env3;
      radiusB = env4;
      bodyA = env5;
      bodyB = env6;
      t1 = env7;
      manifold = env8;
      i = env9;
      friction = env10;
      t2 = env11;
      restitution = env12;
      t3 = env13;
      break;
    case 4:
      vB = env0;
      t4 = env1;
      wA = env2;
      contacts = env3;
      impulseRatio = env4;
      radiusA = env5;
      radiusB = env6;
      bodyA = env7;
      bodyB = env8;
      t1 = env9;
      manifold = env10;
      i = env11;
      friction = env12;
      t2 = env13;
      restitution = env14;
      vA = env15;
      t3 = env16;
      break;
    case 5:
      vB = env0;
      t4 = env1;
      wA = env2;
      wB = env3;
      contacts = env4;
      impulseRatio = env5;
      radiusA = env6;
      radiusB = env7;
      bodyA = env8;
      bodyB = env9;
      t1 = env10;
      manifold = env11;
      i = env12;
      friction = env13;
      t2 = env14;
      restitution = env15;
      vA = env16;
      t3 = env17;
      break;
  }
  switch (state) {
    case 0:
      $.listTypeCheck(contacts);
      $.intTypeCheck(contactCount);
      $.numTypeCheck(impulseRatio);
    case 1:
      state = 0;
      this.constraintCount = contactCount;
    case 2:
      if (state == 2 || (state == 0 && $.ltB($.get$length(this.constraints), contactCount))) {
        switch (state) {
          case 0:
            var old = $.listTypeCheck(this.constraints);
            var t1 = $.ListFactory_List($.intTypeCheck($.Math_max($.mul($.get$length(old), 2), this.constraintCount)));
            $.setRuntimeTypeInfo(t1, ({E: 'ContactConstraint'}));
            this.constraints = t1;
            $.setRange$3(this.constraints, 0, $.get$length(old), old);
            var i = $.intTypeCheck($.get$length(old));
          case 2:
            state = 0;
            for (; $.ltB(i, $.get$length(this.constraints)); i = $.intTypeCheck($.add(i, 1))) {
              $.indexSet(this.constraints, i, $.ContactConstraint$());
            }
        }
      }
      t1 = this.worldManifold;
      var t2 = this.tangent;
      var t3 = this.temp2;
      var t4 = this.temp1;
      i = 0;
    case 3:
    case 4:
    case 5:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, this.constraintCount)) break L0;
            var contact = $.propertyTypeCheck($.index(contacts, i), 'is$Contact');
            var fixtureA = $.propertyTypeCheck(contact.get$fixtureA(), 'is$Fixture');
            var fixtureB = $.propertyTypeCheck(contact.get$fixtureB(), 'is$Fixture');
            var shapeA = $.propertyTypeCheck(fixtureA.get$shape(), 'is$Shape');
            var shapeB = $.propertyTypeCheck(fixtureB.get$shape(), 'is$Shape');
            var radiusA = $.numTypeCheck(shapeA.get$radius());
            var radiusB = $.numTypeCheck(shapeB.get$radius());
            var bodyA = $.propertyTypeCheck(fixtureA.get$body(), 'is$Body');
            var bodyB = $.propertyTypeCheck(fixtureB.get$body(), 'is$Body');
            var manifold = $.propertyTypeCheck(contact.get$manifold(), 'is$Manifold');
            var friction = $.numTypeCheck($.Settings_mixFriction(fixtureA.get$friction(), fixtureB.get$friction()));
            var restitution = $.numTypeCheck($.Settings_mixRestitution(fixtureA.get$restitution(), fixtureB.get$restitution()));
          case 3:
            state = 0;
            var vA = $.propertyTypeCheck(bodyA.get$linearVelocity(), 'is$Vector');
            var vB = $.propertyTypeCheck(bodyB.get$linearVelocity(), 'is$Vector');
            var wA = $.numTypeCheck(bodyA.get$angularVelocity());
          case 4:
            state = 0;
            var wB = $.numTypeCheck(bodyB.get$angularVelocity());
          case 5:
            state = 0;
            $.assert($.gt(manifold.get$pointCount(), 0));
            t1.initialize$5(manifold, bodyA.get$originTransform(), radiusA, bodyB.get$originTransform(), radiusB);
            var cc = $.propertyTypeCheck($.index(this.constraints, i), 'is$ContactConstraint');
            cc.set$bodyA(bodyA);
            cc.set$bodyB(bodyB);
            cc.set$manifold(manifold);
            var t5 = t1.get$normal().get$x();
            cc.get$normal().set$x(t5);
            t5 = t1.get$normal().get$y();
            cc.get$normal().set$y(t5);
            cc.set$pointCount(manifold.get$pointCount());
            cc.set$friction(friction);
            cc.set$restitution(restitution);
            t5 = manifold.get$localNormal().get$x();
            cc.get$localNormal().set$x(t5);
            t5 = manifold.get$localNormal().get$y();
            cc.get$localNormal().set$y(t5);
            t5 = manifold.get$localPoint().get$x();
            cc.get$localPoint().set$x(t5);
            t5 = manifold.get$localPoint().get$y();
            cc.get$localPoint().set$y(t5);
            cc.set$radius($.add(radiusA, radiusB));
            cc.set$type(manifold.get$type());
            for (var j = 0; $.ltB(j, cc.get$pointCount()); j = $.intTypeCheck($.add(j, 1))) {
              var cp = $.propertyTypeCheck($.index(manifold.get$points(), j), 'is$ManifoldPoint');
              var ccp = $.propertyTypeCheck($.index(cc.get$points(), j), 'is$ContactConstraintPoint');
              ccp.set$normalImpulse($.mul(impulseRatio, cp.get$normalImpulse()));
              ccp.set$tangentImpulse($.mul(impulseRatio, cp.get$tangentImpulse()));
              t5 = cp.get$localPoint().get$x();
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
              var rnA = $.numTypeCheck($.sub($.mul(ccp.get$rA().get$x(), cc.get$normal().get$y()), $.mul(ccp.get$rA().get$y(), cc.get$normal().get$x())));
              var rnB = $.numTypeCheck($.sub($.mul(ccp.get$rB().get$x(), cc.get$normal().get$y()), $.mul(ccp.get$rB().get$y(), cc.get$normal().get$x())));
              rnA = $.numTypeCheck($.mul(rnA, rnA));
              rnB = $.numTypeCheck($.mul(rnB, rnB));
              var kNormal = $.numTypeCheck($.add($.add($.add(bodyA.get$invMass(), bodyB.get$invMass()), $.mul(bodyA.get$invInertia(), rnA)), $.mul(bodyB.get$invInertia(), rnB)));
              $.assert($.gt(kNormal, 1.192e-7));
              if (typeof kNormal !== 'number') throw $.iae(kNormal);
              ccp.set$normalMass(1.0 / kNormal);
              t5 = cc.get$normal().get$y();
              if (typeof t5 !== 'number') throw $.iae(t5);
              t2.set$x(1.0 * t5);
              var t6 = cc.get$normal().get$x();
              if (typeof t6 !== 'number') throw $.iae(t6);
              t2.set$y(-1.0 * t6);
              var rtA = $.numTypeCheck($.sub($.mul(ccp.get$rA().get$x(), t2.get$y()), $.mul(ccp.get$rA().get$y(), t2.get$x())));
              var rtB = $.numTypeCheck($.sub($.mul(ccp.get$rB().get$x(), t2.get$y()), $.mul(ccp.get$rB().get$y(), t2.get$x())));
              rtA = $.numTypeCheck($.mul(rtA, rtA));
              rtB = $.numTypeCheck($.mul(rtB, rtB));
              var kTangent = $.numTypeCheck($.add($.add($.add(bodyA.get$invMass(), bodyB.get$invMass()), $.mul(bodyA.get$invInertia(), rtA)), $.mul(bodyB.get$invInertia(), rtB)));
              $.assert($.gt(kTangent, 1.192e-7));
              if (typeof kTangent !== 'number') throw $.iae(kTangent);
              ccp.set$tangentMass(1.0 / kTangent);
              ccp.set$velocityBias(0.0);
              t3.set$x($.mul($.neg(wA), ccp.get$rA().get$y()));
              t3.set$y($.mul(wA, ccp.get$rA().get$x()));
              t4.set$x($.sub($.sub($.add($.mul($.neg(wB), ccp.get$rB().get$y()), vB.get$x()), vA.get$x()), t3.get$x()));
              t4.set$y($.sub($.sub($.add($.mul(wB, ccp.get$rB().get$x()), vB.get$y()), vA.get$y()), t3.get$y()));
              var a = $.propertyTypeCheck(cc.get$normal(), 'is$Vector');
              var vRel = $.numTypeCheck($.add($.mul(a.get$x(), t4.get$x()), $.mul(a.get$y(), t4.get$y())));
              $.ltB(vRel, -1) && ccp.set$velocityBias($.mul($.neg(restitution), vRel));
            }
            if ($.eqB(cc.get$pointCount(), 2)) {
              var ccp1 = $.propertyTypeCheck($.index(cc.get$points(), 0), 'is$ContactConstraintPoint');
              var ccp2 = $.propertyTypeCheck($.index(cc.get$points(), 1), 'is$ContactConstraintPoint');
              var invMassA = $.numTypeCheck(bodyA.get$invMass());
              var invIA = $.numTypeCheck(bodyA.get$invInertia());
              var invMassB = $.numTypeCheck(bodyB.get$invMass());
              var invIB = $.numTypeCheck(bodyB.get$invInertia());
              var rn1A = $.numTypeCheck($.Vector_crossVectors(ccp1.get$rA(), cc.get$normal()));
              var rn1B = $.numTypeCheck($.Vector_crossVectors(ccp1.get$rB(), cc.get$normal()));
              var rn2A = $.numTypeCheck($.Vector_crossVectors(ccp2.get$rA(), cc.get$normal()));
              var rn2B = $.numTypeCheck($.Vector_crossVectors(ccp2.get$rB(), cc.get$normal()));
              var k11 = $.numTypeCheck($.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rn1A), rn1A)), $.mul($.mul(invIB, rn1B), rn1B)));
              var k22 = $.numTypeCheck($.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rn2A), rn2A)), $.mul($.mul(invIB, rn2B), rn2B)));
              var k12 = $.numTypeCheck($.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rn1A), rn2A)), $.mul($.mul(invIB, rn1B), rn2B)));
              t5 = $.mul(k11, k11);
              t6 = $.sub($.mul(k11, k22), $.mul(k12, k12));
              if (typeof t6 !== 'number') throw $.iae(t6);
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
              } else cc.set$pointCount(1);
            }
            i = $.intTypeCheck($.add(i, 1));
        }
      }
  }
 },
 ContactSolver$0: function() {
  for (var i = 0; $.ltB(i, $.get$length(this.constraints)); i = $.intTypeCheck($.add(i, 1))) {
    $.indexSet(this.constraints, i, $.ContactConstraint$());
  }
 }
};

$$.PositionSolverManifold = {"":
 ["clipPoint", "planePoint", "temp", "pointB", "pointA", "separation?", "point?", "normal?"],
 super: "Object",
 initialize$2: function(cc, index) {
  $.propertyTypeCheck(cc, 'is$ContactConstraint');
  $.intTypeCheck(index);
  $.assert($.gt(cc.get$pointCount(), 0));
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
      } else t2.setCoords$2(1.0, 0.0);
      this.point.setFrom$1(t3).addLocal$1(t4).mulLocal$1(0.5);
      t1 = this.temp;
      t1.setFrom$1(t4).subLocal$1(t3);
      this.separation = $.sub($.Vector_dot(t1, this.normal), cc.get$radius());
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
      this.separation = $.sub($.Vector_dot(t2, t3), cc.get$radius());
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
      this.separation = $.sub($.Vector_dot(t2, t3), cc.get$radius());
      this.point.setFrom$1(t5);
      t3.negateLocal$0();
  }
 },
 is$PositionSolverManifold: true
};

$$.PolygonAndCircleContact = {"":
 ["_oldManifold", "pool", "toiCount", "manifold", "fixtureB", "fixtureA", "edge2", "edge1", "next", "prev", "flags"],
 super: "Contact",
 evaluate$3: function(argManifold, xfA, xfB) {
  $.propertyTypeCheck(argManifold, 'is$Manifold');
  $.propertyTypeCheck(xfA, 'is$Transform');
  $.propertyTypeCheck(xfB, 'is$Transform');
  this.pool.get$collision().collidePolygonAndCircle$5(argManifold, this.fixtureA.get$shape(), xfA, this.fixtureB.get$shape(), xfB);
 },
 init$2: function(fA, fB) {
  $.propertyTypeCheck(fA, 'is$Fixture');
  $.propertyTypeCheck(fB, 'is$Fixture');
  $.Expect_equals(1, fA.get$type(), null);
  $.Expect_equals(0, fB.get$type(), null);
  $.Contact.prototype.init$2.call(this, fA, fB);
 }
};

$$.PolygonContact = {"":
 ["_oldManifold", "pool", "toiCount", "manifold", "fixtureB", "fixtureA", "edge2", "edge1", "next", "prev", "flags"],
 super: "Contact",
 evaluate$3: function(argManifold, xfA, xfB) {
  $.propertyTypeCheck(argManifold, 'is$Manifold');
  $.propertyTypeCheck(xfA, 'is$Transform');
  $.propertyTypeCheck(xfB, 'is$Transform');
  this.pool.get$collision().collidePolygons$5(argManifold, this.fixtureA.get$shape(), xfA, this.fixtureB.get$shape(), xfB);
 },
 init$2: function(fA, fB) {
  $.propertyTypeCheck(fA, 'is$Fixture');
  $.propertyTypeCheck(fB, 'is$Fixture');
  $.Expect_equals(1, fA.get$type(), null);
  $.Expect_equals(1, fB.get$type(), null);
  $.Contact.prototype.init$2.call(this, fA, fB);
 }
};

$$.TimeOfImpactSolver = {"":
 ["temp", "P", "rB", "rA", "psm", "toiBody", "count=", "constraints?"],
 super: "Object",
 solve$1: function(baumgarte) {
  $.numTypeCheck(baumgarte);
  if (typeof baumgarte !== 'number') return this.solve$1$bailout(1, baumgarte, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  for (var t1 = this.psm, t2 = this.rA, t3 = this.rB, t4 = this.P, t5 = this.temp, normal = t1.normal, point = t1.point, i = 0, minSeparation = 0; $.ltB(i, this.count); i = $.intTypeCheck($.add(i, 1))) {
    var c = $.propertyTypeCheck($.index(this.constraints, i), 'is$TimeOfImpactConstraint');
    var bodyA = $.propertyTypeCheck(c.get$bodyA(), 'is$Body');
    var bodyB = $.propertyTypeCheck(c.get$bodyB(), 'is$Body');
    var massA = $.numTypeCheck(bodyA.get$mass());
    var massB = $.numTypeCheck(bodyB.get$mass());
    if ($.eqB(bodyA, this.toiBody)) massB = 0.0;
    else massA = 0.0;
    var invMassA = $.numTypeCheck($.mul(massA, bodyA.get$invMass()));
    if (typeof invMassA !== 'number') return this.solve$1$bailout(2, baumgarte, i, minSeparation, massA, t1, massB, t2, t3, invMassA, t4, t5, c, bodyA, bodyB, 0);
    var invIA = $.numTypeCheck($.mul(massA, bodyA.get$invInertia()));
    if (typeof invIA !== 'number') return this.solve$1$bailout(3, baumgarte, i, minSeparation, t1, massB, t2, t3, invMassA, t4, invIA, t5, c, bodyA, bodyB, 0);
    var invMassB = $.numTypeCheck($.mul(massB, bodyB.get$invMass()));
    if (typeof invMassB !== 'number') return this.solve$1$bailout(4, baumgarte, i, minSeparation, t1, massB, t2, t3, invMassA, t4, invIA, t5, c, invMassB, bodyA, bodyB);
    var invIB = $.numTypeCheck($.mul(massB, bodyB.get$invInertia()));
    if (typeof invIB !== 'number') return this.solve$1$bailout(5, baumgarte, i, minSeparation, t1, t2, t3, invMassA, t4, invIA, t5, c, invMassB, bodyA, bodyB, invIB);
    for (var t6 = invMassA + invMassB, j = 0; $.ltB(j, c.get$pointCount()); j = $.intTypeCheck($.add(j, 1))) {
      t1.initialize$2(c, j);
      $.propertyTypeCheck(normal, 'is$Vector');
      $.propertyTypeCheck(point, 'is$Vector');
      var separation = $.numTypeCheck(t1.separation);
      t2.setFrom$1(point).subLocal$1(bodyA.get$sweep().get$center());
      t3.setFrom$1(point).subLocal$1(bodyB.get$sweep().get$center());
      minSeparation = $.numTypeCheck($.Math_min(minSeparation, separation));
      var t7 = $.add(separation, 0.005);
      if (typeof t7 !== 'number') throw $.iae(t7);
      var C = $.numTypeCheck($.MathBox_clamp(baumgarte * t7, -0.2, 0.0));
      var rnA = $.numTypeCheck($.Vector_crossVectors(t2, normal));
      var rnB = $.numTypeCheck($.Vector_crossVectors(t3, normal));
      if (typeof rnA !== 'number') throw $.iae(rnA);
      var t8 = t6 + invIA * rnA * rnA;
      if (typeof rnB !== 'number') throw $.iae(rnB);
      var K = t8 + invIB * rnB * rnB;
      var impulse = $.numTypeCheck(K > 0.0 ? $.div($.neg(C), K) : 0.0);
      t4.setFrom$1(normal).mulLocal$1(impulse);
      t5.setFrom$1(t4).mulLocal$1(invMassA);
      bodyA.get$sweep().get$center().subLocal$1(t5);
      t7 = bodyA.get$sweep();
      t8 = t7.get$angle();
      var t9 = $.Vector_crossVectors(t2, t4);
      if (typeof t9 !== 'number') throw $.iae(t9);
      t7.set$angle($.sub(t8, invIA * t9));
      bodyA.synchronizeTransform$0();
      t5.setFrom$1(t4).mulLocal$1(invMassB);
      bodyB.get$sweep().get$center().addLocal$1(t5);
      t7 = bodyB.get$sweep();
      var t10 = t7.get$angle();
      var t11 = $.Vector_crossVectors(t3, t4);
      if (typeof t11 !== 'number') throw $.iae(t11);
      t7.set$angle($.add(t10, invIB * t11));
      bodyB.synchronizeTransform$0();
    }
  }
  return $.ge(minSeparation, -0.0075);
 },
 solve$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13, env14) {
  switch (state) {
    case 1:
      var baumgarte = env0;
      break;
    case 2:
      baumgarte = env0;
      i = env1;
      minSeparation = env2;
      massA = env3;
      t1 = env4;
      massB = env5;
      t2 = env6;
      t3 = env7;
      invMassA = env8;
      t4 = env9;
      t5 = env10;
      c = env11;
      bodyA = env12;
      bodyB = env13;
      break;
    case 3:
      baumgarte = env0;
      i = env1;
      minSeparation = env2;
      t1 = env3;
      massB = env4;
      t2 = env5;
      t3 = env6;
      invMassA = env7;
      t4 = env8;
      invIA = env9;
      t5 = env10;
      c = env11;
      bodyA = env12;
      bodyB = env13;
      break;
    case 4:
      baumgarte = env0;
      i = env1;
      minSeparation = env2;
      t1 = env3;
      massB = env4;
      t2 = env5;
      t3 = env6;
      invMassA = env7;
      t4 = env8;
      invIA = env9;
      t5 = env10;
      c = env11;
      invMassB = env12;
      bodyA = env13;
      bodyB = env14;
      break;
    case 5:
      baumgarte = env0;
      i = env1;
      minSeparation = env2;
      t1 = env3;
      t2 = env4;
      t3 = env5;
      invMassA = env6;
      t4 = env7;
      invIA = env8;
      t5 = env9;
      c = env10;
      invMassB = env11;
      bodyA = env12;
      bodyB = env13;
      invIB = env14;
      break;
  }
  switch (state) {
    case 0:
      $.numTypeCheck(baumgarte);
    case 1:
      state = 0;
      var t1 = this.psm;
      var t2 = this.rA;
      var t3 = this.rB;
      var t4 = this.P;
      var t5 = this.temp;
      var i = 0;
      var minSeparation = 0;
    case 2:
    case 3:
    case 4:
    case 5:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, this.count)) break L0;
            var c = $.propertyTypeCheck($.index(this.constraints, i), 'is$TimeOfImpactConstraint');
            var bodyA = $.propertyTypeCheck(c.get$bodyA(), 'is$Body');
            var bodyB = $.propertyTypeCheck(c.get$bodyB(), 'is$Body');
            var massA = $.numTypeCheck(bodyA.get$mass());
            var massB = $.numTypeCheck(bodyB.get$mass());
            if ($.eqB(bodyA, this.toiBody)) massB = 0.0;
            else massA = 0.0;
            var invMassA = $.numTypeCheck($.mul(massA, bodyA.get$invMass()));
          case 2:
            state = 0;
            var invIA = $.numTypeCheck($.mul(massA, bodyA.get$invInertia()));
          case 3:
            state = 0;
            var invMassB = $.numTypeCheck($.mul(massB, bodyB.get$invMass()));
          case 4:
            state = 0;
            var invIB = $.numTypeCheck($.mul(massB, bodyB.get$invInertia()));
          case 5:
            state = 0;
            for (var j = 0; $.ltB(j, c.get$pointCount()); j = $.intTypeCheck($.add(j, 1))) {
              t1.initialize$2(c, j);
              var normal = $.propertyTypeCheck(t1.get$normal(), 'is$Vector');
              var point = $.propertyTypeCheck(t1.get$point(), 'is$Vector');
              var separation = $.numTypeCheck(t1.get$separation());
              t2.setFrom$1(point).subLocal$1(bodyA.get$sweep().get$center());
              t3.setFrom$1(point).subLocal$1(bodyB.get$sweep().get$center());
              minSeparation = $.numTypeCheck($.Math_min(minSeparation, separation));
              var C = $.numTypeCheck($.MathBox_clamp($.mul(baumgarte, $.add(separation, 0.005)), -0.2, 0.0));
              var rnA = $.numTypeCheck($.Vector_crossVectors(t2, normal));
              var rnB = $.numTypeCheck($.Vector_crossVectors(t3, normal));
              var K = $.numTypeCheck($.add($.add($.add(invMassA, invMassB), $.mul($.mul(invIA, rnA), rnA)), $.mul($.mul(invIB, rnB), rnB)));
              var impulse = $.numTypeCheck($.gtB(K, 0.0) ? $.div($.neg(C), K) : 0.0);
              t4.setFrom$1(normal).mulLocal$1(impulse);
              t5.setFrom$1(t4).mulLocal$1(invMassA);
              bodyA.get$sweep().get$center().subLocal$1(t5);
              var t6 = bodyA.get$sweep();
              t6.set$angle($.sub(t6.get$angle(), $.mul(invIA, $.Vector_crossVectors(t2, t4))));
              bodyA.synchronizeTransform$0();
              t5.setFrom$1(t4).mulLocal$1(invMassB);
              bodyB.get$sweep().get$center().addLocal$1(t5);
              t6 = bodyB.get$sweep();
              t6.set$angle($.add(t6.get$angle(), $.mul(invIB, $.Vector_crossVectors(t3, t4))));
              bodyB.synchronizeTransform$0();
            }
            i = $.intTypeCheck($.add(i, 1));
        }
      }
      return $.ge(minSeparation, -0.0075);
  }
 },
 initialize$3: function(contacts, argCount, argToiBody) {
  $.listTypeCheck(contacts);
  $.intTypeCheck(argCount);
  $.propertyTypeCheck(argToiBody, 'is$Body');
  this.count = argCount;
  this.toiBody = argToiBody;
  if ($.geB(this.count, this.constraints.length)) {
    var old = $.listTypeCheck(this.constraints);
    var t1 = $.ListFactory_List($.intTypeCheck($.Math_max(this.count, $.mul($.get$length(old), 2))));
    $.setRuntimeTypeInfo(t1, ({E: 'TimeOfImpactConstraint'}));
    this.constraints = t1;
    $.setRange$3(this.constraints, 0, $.get$length(old), old);
    var i = $.intTypeCheck($.get$length(old));
    if (i !== (i | 0)) return this.initialize$3$bailout(1, contacts, i);
    for (; $.ltB(i, this.constraints.length); i = $.intTypeCheck($.add(i, 1))) {
      $.indexSet(this.constraints, i, $.TimeOfImpactConstraint$());
    }
  }
  for (i = 0; $.ltB(i, this.count); i = $.intTypeCheck($.add(i, 1))) {
    var contact = $.propertyTypeCheck($.index(contacts, i), 'is$Contact');
    var fixtureA = $.propertyTypeCheck(contact.get$fixtureA(), 'is$Fixture');
    var fixtureB = $.propertyTypeCheck(contact.get$fixtureB(), 'is$Fixture');
    var shapeA = $.propertyTypeCheck(fixtureA.get$shape(), 'is$Shape');
    var shapeB = $.propertyTypeCheck(fixtureB.get$shape(), 'is$Shape');
    var radiusA = $.numTypeCheck(shapeA.get$radius());
    var radiusB = $.numTypeCheck(shapeB.get$radius());
    var bodyA = $.propertyTypeCheck(fixtureA.get$body(), 'is$Body');
    var bodyB = $.propertyTypeCheck(fixtureB.get$body(), 'is$Body');
    var manifold = $.propertyTypeCheck(contact.get$manifold(), 'is$Manifold');
    $.assert($.gt(manifold.get$pointCount(), 0));
    var constraint = $.propertyTypeCheck($.index(this.constraints, i), 'is$TimeOfImpactConstraint');
    constraint.set$bodyA(bodyA);
    constraint.set$bodyB(bodyB);
    constraint.get$localNormal().setFrom$1(manifold.get$localNormal());
    constraint.get$localPoint().setFrom$1(manifold.get$localPoint());
    constraint.set$type(manifold.get$type());
    constraint.set$pointCount(manifold.get$pointCount());
    constraint.set$radius($.add(radiusA, radiusB));
    for (var j = 0; $.ltB(j, constraint.get$pointCount()); j = $.intTypeCheck($.add(j, 1))) {
      var cp = $.propertyTypeCheck($.index(manifold.get$points(), j), 'is$ManifoldPoint');
      $.indexSet(constraint.get$localPoints(), j, cp.get$localPoint());
    }
  }
 },
 initialize$3$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      var contacts = env0;
      i = env1;
      break;
  }
  switch (state) {
    case 0:
      $.listTypeCheck(contacts);
      $.intTypeCheck(argCount);
      $.propertyTypeCheck(argToiBody, 'is$Body');
      this.count = argCount;
      this.toiBody = argToiBody;
    case 1:
      if (state == 1 || (state == 0 && $.geB(this.count, $.get$length(this.constraints)))) {
        switch (state) {
          case 0:
            var old = $.listTypeCheck(this.constraints);
            var t1 = $.ListFactory_List($.intTypeCheck($.Math_max(this.count, $.mul($.get$length(old), 2))));
            $.setRuntimeTypeInfo(t1, ({E: 'TimeOfImpactConstraint'}));
            this.constraints = t1;
            $.setRange$3(this.constraints, 0, $.get$length(old), old);
            var i = $.intTypeCheck($.get$length(old));
          case 1:
            state = 0;
            for (; $.ltB(i, $.get$length(this.constraints)); i = $.intTypeCheck($.add(i, 1))) {
              $.indexSet(this.constraints, i, $.TimeOfImpactConstraint$());
            }
        }
      }
      for (i = 0; $.ltB(i, this.count); i = $.intTypeCheck($.add(i, 1))) {
        var contact = $.propertyTypeCheck($.index(contacts, i), 'is$Contact');
        var fixtureA = $.propertyTypeCheck(contact.get$fixtureA(), 'is$Fixture');
        var fixtureB = $.propertyTypeCheck(contact.get$fixtureB(), 'is$Fixture');
        var shapeA = $.propertyTypeCheck(fixtureA.get$shape(), 'is$Shape');
        var shapeB = $.propertyTypeCheck(fixtureB.get$shape(), 'is$Shape');
        var radiusA = $.numTypeCheck(shapeA.get$radius());
        var radiusB = $.numTypeCheck(shapeB.get$radius());
        var bodyA = $.propertyTypeCheck(fixtureA.get$body(), 'is$Body');
        var bodyB = $.propertyTypeCheck(fixtureB.get$body(), 'is$Body');
        var manifold = $.propertyTypeCheck(contact.get$manifold(), 'is$Manifold');
        $.assert($.gt(manifold.get$pointCount(), 0));
        var constraint = $.propertyTypeCheck($.index(this.constraints, i), 'is$TimeOfImpactConstraint');
        constraint.set$bodyA(bodyA);
        constraint.set$bodyB(bodyB);
        constraint.get$localNormal().setFrom$1(manifold.get$localNormal());
        constraint.get$localPoint().setFrom$1(manifold.get$localPoint());
        constraint.set$type(manifold.get$type());
        constraint.set$pointCount(manifold.get$pointCount());
        constraint.set$radius($.add(radiusA, radiusB));
        for (var j = 0; $.ltB(j, constraint.get$pointCount()); j = $.intTypeCheck($.add(j, 1))) {
          var cp = $.propertyTypeCheck($.index(manifold.get$points(), j), 'is$ManifoldPoint');
          $.indexSet(constraint.get$localPoints(), j, cp.get$localPoint());
        }
      }
  }
 },
 TimeOfImpactSolver$0: function() {
  for (var i = 0; $.ltB(i, $.get$length(this.constraints)); i = $.intTypeCheck($.add(i, 1))) {
    $.indexSet(this.constraints, i, $.TimeOfImpactConstraint$());
  }
 }
};

$$.TimeOfImpactSolverManifold = {"":
 ["clipPoint", "planePoint", "temp", "pointB", "pointA", "separation?", "point?", "normal?"],
 super: "Object",
 initialize$2: function(cc, index) {
  $.propertyTypeCheck(cc, 'is$TimeOfImpactConstraint');
  $.intTypeCheck(index);
  $.assert($.gt(cc.get$pointCount(), 0));
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
      } else t4.setCoords$2(1, 0);
      this.point.setFrom$1(t1).addLocal$1(t2).mulLocal$1(0.5);
      t3 = this.temp;
      t3.setFrom$1(t2).subLocal$1(t1);
      this.separation = $.sub($.Vector_dot(t3, this.normal), cc.get$radius());
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
      this.separation = $.sub($.Vector_dot(t4, t1), cc.get$radius());
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
      this.separation = $.sub($.Vector_dot(t4, t1), cc.get$radius());
      this.point.setFrom$1(t3);
      t1.negateLocal$0();
      break;
  }
 }
};

$$.TimeOfImpactConstraint = {"":
 ["bodyB=", "bodyA=", "pointCount=", "radius=", "type=", "localPoint?", "localNormal?", "localPoints?"],
 super: "Object",
 setFrom$1: function(argOther) {
  $.propertyTypeCheck(argOther, 'is$TimeOfImpactConstraint');
  for (var t1 = this.localPoints, i = 0; t2 = t1.length, i < t2; ++i) {
    if (i < 0 || i >= t2) throw $.ioore(i);
    t1[i].setFrom$1($.index(argOther.get$localPoints(), i));
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
 setFrom$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      i = env0;
      var argOther = env1;
      t1 = env2;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(argOther, 'is$TimeOfImpactConstraint');
      var t1 = this.localPoints;
      var i = 0;
    case 1:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, t1.length)) break L0;
            if (i !== (i | 0)) throw $.iae(i);
            var t2 = t1.length;
            if (i < 0 || i >= t2) throw $.ioore(i);
            t1[i].setFrom$1($.index(argOther.get$localPoints(), i));
            i = $.intTypeCheck($.add(i, 1));
          case 1:
            state = 0;
        }
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
  for (var t1 = this.localPoints, i = 0; $.ltB(i, t1.length); i = $.intTypeCheck($.add(i, 1))) {
    var t2 = $.Vector$(0, 0);
    if (i !== (i | 0)) throw $.iae(i);
    var t3 = t1.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    t1[i] = t2;
  }
 },
 is$TimeOfImpactConstraint: true
};

$$.Joint = {"":
 ["userData?", "islandFlag=", "bodyB?", "bodyA?", "edgeB?", "edgeA?", "_lib0_next=", "_prev!", "type?"],
 super: "Object",
 solvePositionConstraints$1: function(baumgarte) {
  $.numTypeCheck(baumgarte);
 },
 solveVelocityConstraints$1: function(step) {
  $.propertyTypeCheck(step, 'is$TimeStep');
 },
 initVelocityConstraints$1: function(step) {
  $.propertyTypeCheck(step, 'is$TimeStep');
 },
 is$Joint: true
};

$$.JointEdge = {"":
 ["next=", "prev=", "joint=", "other="],
 super: "Object",
 next$0: function() { return this.next.$call$0(); },
 is$JointEdge: true
};

$$.JointDef = {"":
 ["collideConnected?", "bodyB?", "bodyA?", "userData?", "type?"],
 super: "Object",
 is$JointDef: true
};

$$.ConstantVolumeJoint = {"":
 ["dampingRatio", "frequencyHz", "distanceJoints", "_world", "_impulse", "step", "normals", "targetVolume", "targetLengths", "bodies?", "invIB", "invMassB", "invIA", "invMassA", "localCenterB", "localCenterA", "userData", "collideConnected", "islandFlag", "bodyB", "bodyA", "edgeB", "edgeA", "_lib0_next", "_prev", "type"],
 super: "Joint",
 solveVelocityConstraints$1: function(argStep) {
  $.propertyTypeCheck(argStep, 'is$TimeStep');
  var t1 = this.bodies;
  var d = $.ListFactory_List(t1.length);
  $.setRuntimeTypeInfo(d, ({E: 'Vector'}));
  for (var i = 0; $.ltB(i, t1.length); i = $.intTypeCheck($.add(i, 1))) {
    var t2 = $.Vector$(0, 0);
    if (i !== (i | 0)) throw $.iae(i);
    var t3 = d.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    d[i] = t2;
  }
  for (var crossMassSum = 0.0, dotMassSum = 0.0, i = 0; $.ltB(i, t1.length); i = $.intTypeCheck($.add(i, 1))) {
    var prev = $.intTypeCheck($.eqB(i, 0) ? t1.length - 1 : $.sub(i, 1));
    var next = $.intTypeCheck($.eqB(i, t1.length - 1) ? 0 : $.add(i, 1));
    if (i !== (i | 0)) throw $.iae(i);
    t2 = d.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    t3 = d[i];
    if (next !== (next | 0)) throw $.iae(next);
    var t4 = t1.length;
    if (next < 0 || next >= t4) throw $.ioore(next);
    t3.setFrom$1(t1[next].get$worldCenter());
    t3 = d.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    var t5 = d[i];
    if (prev !== (prev | 0)) throw $.iae(prev);
    var t6 = t1.length;
    if (prev < 0 || prev >= t6) throw $.ioore(prev);
    t5.subLocal$1(t1[prev].get$worldCenter());
    t5 = d.length;
    if (i < 0 || i >= t5) throw $.ioore(i);
    var t7 = d[i].get$lengthSquared();
    var t8 = t1.length;
    if (i < 0 || i >= t8) throw $.ioore(i);
    dotMassSum = $.numTypeCheck($.add(dotMassSum, $.div(t7, t1[i].get$mass())));
    var t9 = t1.length;
    if (i < 0 || i >= t9) throw $.ioore(i);
    var t10 = t1[i].get$linearVelocity();
    var t11 = d.length;
    if (i < 0 || i >= t11) throw $.ioore(i);
    crossMassSum = $.numTypeCheck($.add(crossMassSum, $.Vector_crossVectors(t10, d[i])));
  }
  if (typeof crossMassSum !== 'number') throw $.iae(crossMassSum);
  t2 = -2.0 * crossMassSum;
  if (typeof dotMassSum !== 'number') throw $.iae(dotMassSum);
  var lambda = t2 / dotMassSum;
  this._impulse = $.add(this._impulse, lambda);
  for (i = 0; $.ltB(i, t1.length); i = $.intTypeCheck($.add(i, 1))) {
    if (i !== (i | 0)) throw $.iae(i);
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    t3 = t1[i].get$linearVelocity();
    t4 = t3.get$x();
    t5 = t1.length;
    if (i < 0 || i >= t5) throw $.ioore(i);
    t6 = t1[i].get$invMass();
    if (i !== (i | 0)) throw $.iae(i);
    t7 = d.length;
    if (i < 0 || i >= t7) throw $.ioore(i);
    t3.set$x($.add(t4, $.mul($.mul($.mul(t6, d[i].get$y()), 0.5), lambda)));
    t3 = t1.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    t8 = t1[i].get$linearVelocity();
    t9 = t8.get$y();
    t10 = t1.length;
    if (i < 0 || i >= t10) throw $.ioore(i);
    t11 = t1[i].get$invMass();
    var t12 = d.length;
    if (i < 0 || i >= t12) throw $.ioore(i);
    t8.set$y($.add(t9, $.mul($.mul($.mul(t11, $.neg(d[i].get$x())), 0.5), lambda)));
  }
 },
 solvePositionConstraints$1: function(baumgarte) {
  $.numTypeCheck(baumgarte);
  return this.constrainEdges$1(this.step);
 },
 initVelocityConstraints$1: function(argStep) {
  this.step = $.propertyTypeCheck(argStep, 'is$TimeStep');
  var t1 = this.bodies;
  var d = $.ListFactory_List(t1.length);
  $.setRuntimeTypeInfo(d, ({E: 'Vector'}));
  for (var i = 0; i < t1.length; ++i) {
    var t2 = $.Vector$(0, 0);
    var t3 = d.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    d[i] = t2;
  }
  for (i = 0; t2 = t1.length, i < t2; ++i) {
    var prev = i === 0 ? t2 - 1 : i - 1;
    t3 = t2 - 1;
    var next = i === t3 ? 0 : i + 1;
    t3 = d.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    var t4 = d[i];
    if (next < 0 || next >= t2) throw $.ioore(next);
    t4.setFrom$1(t1[next].get$worldCenter());
    t4 = d.length;
    if (i < 0 || i >= t4) throw $.ioore(i);
    var t5 = d[i];
    var t6 = t1.length;
    if (prev < 0 || prev >= t6) throw $.ioore(prev);
    t5.subLocal$1(t1[prev].get$worldCenter());
  }
  if (this.step.get$warmStarting() === true) {
    t2 = this._impulse;
    if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(3, t1, d, t2, 0, 0, 0, 0, 0);
    t3 = this.step.get$dtRatio();
    if (typeof t3 !== 'number') return this.initVelocityConstraints$1$bailout(4, t1, d, t2, t3, 0, 0, 0, 0);
    this._impulse = t2 * t3;
    for (i = 0; t2 = t1.length, i < t2; ++i) {
      if (i < 0 || i >= t2) throw $.ioore(i);
      t3 = t1[i].get$linearVelocity();
      t4 = t3.get$x();
      if (typeof t4 !== 'number') return this.initVelocityConstraints$1$bailout(5, t1, d, i, t3, t4, 0, 0, 0);
      t5 = t1.length;
      if (i < 0 || i >= t5) throw $.ioore(i);
      t6 = t1[i].get$invMass();
      if (typeof t6 !== 'number') return this.initVelocityConstraints$1$bailout(6, t6, t1, d, i, t3, t4, 0, 0);
      var t7 = d.length;
      if (i < 0 || i >= t7) throw $.ioore(i);
      var t8 = d[i].get$y();
      if (typeof t8 !== 'number') return this.initVelocityConstraints$1$bailout(7, t4, t6, t8, t1, d, i, t3, i);
      var t9 = t6 * t8 * 0.5;
      var t10 = this._impulse;
      if (typeof t10 !== 'number') return this.initVelocityConstraints$1$bailout(8, t3, t10, t1, d, t9, i, i, t4);
      t3.set$x(t4 + t9 * t10);
      t3 = t1.length;
      if (i < 0 || i >= t3) throw $.ioore(i);
      var t11 = t1[i].get$linearVelocity();
      var t12 = t11.get$y();
      if (typeof t12 !== 'number') return this.initVelocityConstraints$1$bailout(9, t11, t12, t1, d, i, i, 0, 0);
      var t13 = t1.length;
      if (i < 0 || i >= t13) throw $.ioore(i);
      var t14 = t1[i].get$invMass();
      if (typeof t14 !== 'number') return this.initVelocityConstraints$1$bailout(10, t11, t12, t1, d, t14, i, i, 0);
      var t15 = d.length;
      if (i < 0 || i >= t15) throw $.ioore(i);
      var t16 = d[i].get$x();
      if (typeof t16 !== 'number') return this.initVelocityConstraints$1$bailout(11, t11, t12, t1, d, t14, i, t16, 0);
      var t17 = t14 * -t16 * 0.5;
      var t18 = this._impulse;
      if (typeof t18 !== 'number') return this.initVelocityConstraints$1$bailout(12, t17, t11, t12, t1, t18, d, i, 0);
      t11.set$y(t12 + t17 * t18);
    }
  } else this._impulse = 0.0;
 },
 initVelocityConstraints$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7) {
  switch (state) {
    case 1:
      i = env0;
      t1 = env1;
      d = env2;
      break;
    case 2:
      t1 = env0;
      d = env1;
      i = env2;
      break;
    case 3:
      t1 = env0;
      d = env1;
      t2 = env2;
      break;
    case 4:
      t1 = env0;
      d = env1;
      t2 = env2;
      t3 = env3;
      break;
    case 5:
      t1 = env0;
      d = env1;
      i = env2;
      t3 = env3;
      t4 = env4;
      break;
    case 6:
      t6 = env0;
      t1 = env1;
      d = env2;
      i = env3;
      t3 = env4;
      t4 = env5;
      break;
    case 7:
      t4 = env0;
      t6 = env1;
      t8 = env2;
      t1 = env3;
      d = env4;
      i = env5;
      t3 = env6;
      i = env7;
      break;
    case 8:
      t3 = env0;
      t10 = env1;
      t1 = env2;
      d = env3;
      t9 = env4;
      i = env5;
      i = env6;
      t4 = env7;
      break;
    case 9:
      t11 = env0;
      t12 = env1;
      t1 = env2;
      d = env3;
      i = env4;
      i = env5;
      break;
    case 10:
      t11 = env0;
      t12 = env1;
      t1 = env2;
      d = env3;
      t14 = env4;
      i = env5;
      i = env6;
      break;
    case 11:
      t11 = env0;
      t12 = env1;
      t1 = env2;
      d = env3;
      t14 = env4;
      i = env5;
      t16 = env6;
      break;
    case 12:
      t17 = env0;
      t11 = env1;
      t12 = env2;
      t1 = env3;
      t18 = env4;
      d = env5;
      i = env6;
      break;
    case 13:
      t1 = env0;
      d = env1;
      i = env2;
      break;
  }
  switch (state) {
    case 0:
      this.step = $.propertyTypeCheck(argStep, 'is$TimeStep');
      var t1 = this.bodies;
      var d = $.ListFactory_List(t1.length);
      $.setRuntimeTypeInfo(d, ({E: 'Vector'}));
      var i = 0;
    case 1:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, t1.length)) break L0;
            var t2 = $.Vector$(0, 0);
            if (i !== (i | 0)) throw $.iae(i);
            var t3 = d.length;
            if (i < 0 || i >= t3) throw $.ioore(i);
            d[i] = t2;
            i = $.intTypeCheck($.add(i, 1));
          case 1:
            state = 0;
        }
      }
      i = 0;
    case 2:
      L1: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, t1.length)) break L1;
            var prev = $.intTypeCheck($.eqB(i, 0) ? t1.length - 1 : $.sub(i, 1));
            var next = $.intTypeCheck($.eqB(i, t1.length - 1) ? 0 : $.add(i, 1));
            if (i !== (i | 0)) throw $.iae(i);
            t2 = d.length;
            if (i < 0 || i >= t2) throw $.ioore(i);
            t3 = d[i];
            if (next !== (next | 0)) throw $.iae(next);
            var t4 = t1.length;
            if (next < 0 || next >= t4) throw $.ioore(next);
            t3.setFrom$1(t1[next].get$worldCenter());
            t3 = d.length;
            if (i < 0 || i >= t3) throw $.ioore(i);
            var t5 = d[i];
            if (prev !== (prev | 0)) throw $.iae(prev);
            var t6 = t1.length;
            if (prev < 0 || prev >= t6) throw $.ioore(prev);
            t5.subLocal$1(t1[prev].get$worldCenter());
            i = $.intTypeCheck($.add(i, 1));
          case 2:
            state = 0;
        }
      }
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
      if (state == 3 || state == 4 || state == 5 || state == 6 || state == 7 || state == 8 || state == 9 || state == 10 || state == 11 || state == 12 || state == 13 || (state == 0 && this.step.get$warmStarting() === true)) {
        switch (state) {
          case 0:
            t2 = this._impulse;
          case 3:
            state = 0;
            t3 = this.step.get$dtRatio();
          case 4:
            state = 0;
            this._impulse = $.mul(t2, t3);
            i = 0;
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
            L2: while (true) {
              switch (state) {
                case 0:
                  if (!$.ltB(i, t1.length)) break L2;
                  if (i !== (i | 0)) throw $.iae(i);
                  t2 = t1.length;
                  if (i < 0 || i >= t2) throw $.ioore(i);
                  t3 = t1[i].get$linearVelocity();
                  t4 = t3.get$x();
                case 5:
                  state = 0;
                  t5 = t1.length;
                  if (i < 0 || i >= t5) throw $.ioore(i);
                  t6 = t1[i].get$invMass();
                case 6:
                  state = 0;
                  if (i !== (i | 0)) throw $.iae(i);
                  var t7 = d.length;
                  if (i < 0 || i >= t7) throw $.ioore(i);
                  var t8 = d[i].get$y();
                case 7:
                  state = 0;
                  var t9 = $.mul($.mul(t6, t8), 0.5);
                  var t10 = this._impulse;
                case 8:
                  state = 0;
                  t3.set$x($.add(t4, $.mul(t9, t10)));
                  t3 = t1.length;
                  if (i < 0 || i >= t3) throw $.ioore(i);
                  var t11 = t1[i].get$linearVelocity();
                  var t12 = t11.get$y();
                case 9:
                  state = 0;
                  var t13 = t1.length;
                  if (i < 0 || i >= t13) throw $.ioore(i);
                  var t14 = t1[i].get$invMass();
                case 10:
                  state = 0;
                  var t15 = d.length;
                  if (i < 0 || i >= t15) throw $.ioore(i);
                  var t16 = d[i].get$x();
                case 11:
                  state = 0;
                  var t17 = $.mul($.mul(t14, $.neg(t16)), 0.5);
                  var t18 = this._impulse;
                case 12:
                  state = 0;
                  t11.set$y($.add(t12, $.mul(t17, t18)));
                  i = $.intTypeCheck($.add(i, 1));
                case 13:
                  state = 0;
              }
            }
        }
      } else {
        this._impulse = 0.0;
      }
  }
 },
 constrainEdges$1: function(argStep) {
  $.propertyTypeCheck(argStep, 'is$TimeStep');
  for (var t1 = this.bodies, t2 = this.normals, perimeter = 0.0, i = 0; $.ltB(i, t1.length); i = $.intTypeCheck($.add(i, 1))) {
    var next = $.intTypeCheck($.eqB(i, t1.length - 1) ? 0 : $.add(i, 1));
    if (next !== (next | 0)) throw $.iae(next);
    var t3 = t1.length;
    if (next < 0 || next >= t3) throw $.ioore(next);
    var t4 = t1[next].get$worldCenter().get$x();
    if (i !== (i | 0)) throw $.iae(i);
    var t5 = t1.length;
    if (i < 0 || i >= t5) throw $.ioore(i);
    var dx = $.numTypeCheck($.sub(t4, t1[i].get$worldCenter().get$x()));
    t4 = t1.length;
    if (next < 0 || next >= t4) throw $.ioore(next);
    var t6 = t1[next].get$worldCenter().get$y();
    var t7 = t1.length;
    if (i < 0 || i >= t7) throw $.ioore(i);
    var dy = $.numTypeCheck($.sub(t6, t1[i].get$worldCenter().get$y()));
    var dist = $.numTypeCheck($.Math_sqrt($.add($.mul(dx, dx), $.mul(dy, dy))));
    if ($.ltB(dist, 1.192e-7)) dist = 1.0;
    t3 = $.div(dy, dist);
    t4 = t2.length;
    if (i < 0 || i >= t4) throw $.ioore(i);
    t2[i].set$x(t3);
    t3 = $.div($.neg(dx), dist);
    t5 = t2.length;
    if (i < 0 || i >= t5) throw $.ioore(i);
    t2[i].set$y(t3);
    perimeter = $.numTypeCheck($.add(perimeter, dist));
  }
  var delta = $.Vector$(0, 0);
  var deltaArea = $.numTypeCheck($.sub(this.targetVolume, this.get$area()));
  if (typeof deltaArea !== 'number') throw $.iae(deltaArea);
  t3 = 0.5 * deltaArea;
  if (typeof perimeter !== 'number') throw $.iae(perimeter);
  var toExtrude = t3 / perimeter;
  for (var done = true, i = 0; $.ltB(i, t1.length); i = $.intTypeCheck($.add(i, 1))) {
    next = $.intTypeCheck($.eqB(i, t1.length - 1) ? 0 : $.add(i, 1));
    if (i !== (i | 0)) throw $.iae(i);
    t3 = t2.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    t4 = t2[i].get$x();
    if (next !== (next | 0)) throw $.iae(next);
    t5 = t2.length;
    if (next < 0 || next >= t5) throw $.ioore(next);
    t4 = $.add(t4, t2[next].get$x());
    if (typeof t4 !== 'number') throw $.iae(t4);
    t4 *= toExtrude;
    t6 = t2.length;
    if (i < 0 || i >= t6) throw $.ioore(i);
    t7 = t2[i].get$y();
    var t8 = t2.length;
    if (next < 0 || next >= t8) throw $.ioore(next);
    t7 = $.add(t7, t2[next].get$y());
    if (typeof t7 !== 'number') throw $.iae(t7);
    delta.setCoords$2(t4, toExtrude * t7);
    var norm = $.numTypeCheck($.get$length(delta));
    if ($.gtB(norm, 0.2)) {
      if (typeof norm !== 'number') throw $.iae(norm);
      delta.mulLocal$1(0.2 / norm);
    }
    if ($.gtB(norm, 0.005)) done = false;
    t3 = t1.length;
    if (next < 0 || next >= t3) throw $.ioore(next);
    t4 = t1[next].get$sweep().get$center();
    t4.set$x($.add(t4.get$x(), delta.x));
    t4 = t1.length;
    if (next < 0 || next >= t4) throw $.ioore(next);
    t5 = t1[next].get$sweep().get$center();
    t5.set$y($.add(t5.get$y(), delta.y));
    t5 = t1.length;
    if (next < 0 || next >= t5) throw $.ioore(next);
    t1[next].synchronizeTransform$0();
  }
  return done;
 },
 get$area: function() {
  var t1 = this.bodies;
  var t2 = t1.length - 1;
  var t3 = t1.length;
  if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
  var t4 = t1[t2].get$worldCenter().get$x();
  var t5 = t1.length;
  if (0 < 0 || 0 >= t5) throw $.ioore(0);
  t4 = $.mul(t4, t1[0].get$worldCenter().get$y());
  var t6 = t1.length;
  if (0 < 0 || 0 >= t6) throw $.ioore(0);
  var t7 = t1[0].get$worldCenter().get$x();
  var t8 = t1.length - 1;
  var t9 = t1.length;
  if (t8 < 0 || t8 >= t9) throw $.ioore(t8);
  t4 = $.sub(t4, $.mul(t7, t1[t8].get$worldCenter().get$y()));
  if (typeof t4 !== 'number') throw $.iae(t4);
  var result = 0.0 + t4;
  for (var i = 0; $.ltB(i, t1.length - 1); i = $.intTypeCheck($.add(i, 1))) {
    if (i !== (i | 0)) throw $.iae(i);
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    t3 = t1[i].get$worldCenter().get$x();
    t4 = i + 1;
    if (t4 !== (t4 | 0)) throw $.iae(t4);
    t5 = t1.length;
    if (t4 < 0 || t4 >= t5) throw $.ioore(t4);
    t3 = $.mul(t3, t1[t4].get$worldCenter().get$y());
    t6 = i + 1;
    if (t6 !== (t6 | 0)) throw $.iae(t6);
    t7 = t1.length;
    if (t6 < 0 || t6 >= t7) throw $.ioore(t6);
    t8 = t1[t6].get$worldCenter().get$x();
    t9 = t1.length;
    if (i < 0 || i >= t9) throw $.ioore(i);
    result = $.numTypeCheck($.add(result, $.sub(t3, $.mul(t8, t1[i].get$worldCenter().get$y()))));
  }
  return $.numTypeCheck($.mul(result, 0.5));
 },
 step$3: function(arg0, arg1, arg2) { return this.step.$call$3(arg0, arg1, arg2); },
 ConstantVolumeJoint$2: function(_world, def) {
  $.propertyTypeCheck(def, 'is$ConstantVolumeJointDef');
  if ($.leB($.get$length(def.get$bodies()), 2)) throw $.captureStackTrace($.IllegalArgumentException$($.add('You cannot create a constant volume joint with less than three ', 'bodies.')));
  this.bodies = $.ListFactory_List$from(def.get$bodies());
  var t1 = this.bodies;
  var t2 = $.ListFactory_List(t1.length);
  $.setRuntimeTypeInfo(t2, ({E: 'num'}));
  this.targetLengths = t2;
  for (t2 = this.targetLengths, i = 0; $.ltB(i, t2.length); i = $.intTypeCheck($.add(i, 1))) {
    var next = $.intTypeCheck($.eqB(i, t2.length - 1) ? 0 : $.add(i, 1));
    if (i !== (i | 0)) throw $.iae(i);
    var t3 = t1.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    var temp = $.Vector$copy(t1[i].get$worldCenter());
    if (next !== (next | 0)) throw $.iae(next);
    var t4 = t1.length;
    if (next < 0 || next >= t4) throw $.ioore(next);
    temp.subLocal$1(t1[next].get$worldCenter());
    var dist = $.numTypeCheck($.get$length(temp));
    var t5 = t2.length;
    if (i < 0 || i >= t5) throw $.ioore(i);
    t2[i] = dist;
  }
  this.targetVolume = this.get$area();
  t3 = def.get$joints();
  if (!(t3 == null) && !$.eqB($.get$length(def.get$joints()), $.get$length(def.get$bodies()))) throw $.captureStackTrace($.IllegalArgumentException$($.add('Incorrect joint definition.  Joints have to correspond to ', 'the bodies')));
  t3 = def.get$joints();
  if (t3 == null) {
    var djd = $.DistanceJointDef$();
    t3 = $.ListFactory_List(t1.length);
    $.setRuntimeTypeInfo(t3, ({E: 'DistanceJoint'}));
    this.distanceJoints = t3;
    for (t3 = this.distanceJoints, t4 = this._world, i = 0; $.ltB(i, t2.length); i = $.intTypeCheck($.add(i, 1))) {
      next = $.intTypeCheck($.eqB(i, t2.length - 1) ? 0 : $.add(i, 1));
      djd.frequencyHz = def.get$frequencyHz();
      djd.dampingRatio = def.get$dampingRatio();
      if (i !== (i | 0)) throw $.iae(i);
      t5 = t1.length;
      if (i < 0 || i >= t5) throw $.ioore(i);
      var t6 = t1[i];
      if (next !== (next | 0)) throw $.iae(next);
      var t7 = t1.length;
      if (next < 0 || next >= t7) throw $.ioore(next);
      var t8 = t1[next];
      var t9 = t1.length;
      if (i < 0 || i >= t9) throw $.ioore(i);
      var t10 = t1[i].get$worldCenter();
      var t11 = t1.length;
      if (next < 0 || next >= t11) throw $.ioore(next);
      djd.initialize$4(t6, t8, t10, t1[next].get$worldCenter());
      $.indexSet(t3, i, t4.createJoint$1(djd));
    }
  } else {
    t2 = $.ListFactory_List($.get$length(def.get$joints()));
    $.setRuntimeTypeInfo(t2, ({E: 'DistanceJoint'}));
    this.distanceJoints = t2;
    $.setRange$3(this.distanceJoints, 0, $.get$length(def.get$joints()), def.get$joints());
  }
  this.frequencyHz = def.get$frequencyHz();
  this.dampingRatio = def.get$dampingRatio();
  t2 = $.ListFactory_List(t1.length);
  $.setRuntimeTypeInfo(t2, ({E: 'Vector'}));
  this.normals = t2;
  for (t2 = this.normals, i = 0; $.ltB(i, t2.length); i = $.intTypeCheck($.add(i, 1))) {
    t3 = $.Vector$(0, 0);
    if (i !== (i | 0)) throw $.iae(i);
    t4 = t2.length;
    if (i < 0 || i >= t4) throw $.ioore(i);
    t2[i] = t3;
  }
  t2 = t1.length;
  if (0 < 0 || 0 >= t2) throw $.ioore(0);
  this.bodyA = t1[0];
  t3 = t1.length;
  if (1 < 0 || 1 >= t3) throw $.ioore(1);
  this.bodyB = t1[1];
  this.collideConnected = false;
  var i;
 }
};

$$.DistanceJoint = {"":
 ["bias", "gamma", "dampingRatio", "frequencyHz", "length=", "mass?", "impulse", "u", "localAnchor2", "localAnchor1", "invIB", "invMassB", "invIA", "invMassA", "localCenterB", "localCenterA", "userData", "collideConnected", "islandFlag", "bodyB", "bodyA", "edgeB", "edgeA", "_lib0_next", "_prev", "type"],
 super: "Joint",
 solvePositionConstraints$1: function(baumgarte) {
  $.numTypeCheck(baumgarte);
  var t1 = this.frequencyHz;
  if (typeof t1 !== 'number') return this.solvePositionConstraints$1$bailout(1, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  if (t1 > 0.0) return true;
  var b1 = this.bodyA;
  var b2 = this.bodyB;
  var r1 = $.Vector$(0, 0);
  var r2 = $.Vector$(0, 0);
  var d = $.Vector$(0, 0);
  r1.setFrom$1(this.localAnchor1).subLocal$1(b1.get$localCenter());
  r2.setFrom$1(this.localAnchor2).subLocal$1(b2.get$localCenter());
  $.Matrix22_mulMatrixAndVectorToOut(b1.get$originTransform().get$rotation(), r1, r1);
  $.Matrix22_mulMatrixAndVectorToOut(b2.get$originTransform().get$rotation(), r2, r2);
  t1 = b2.get$sweep().get$center().get$x();
  if (typeof t1 !== 'number') return this.solvePositionConstraints$1$bailout(2, r1, b1, b2, d, r2, t1, 0, 0, 0, 0, 0);
  var t2 = r2.x;
  if (typeof t2 !== 'number') return this.solvePositionConstraints$1$bailout(3, r1, b1, b2, d, r2, t2, t1, 0, 0, 0, 0);
  t2 += t1;
  t1 = b1.get$sweep().get$center().get$x();
  if (typeof t1 !== 'number') return this.solvePositionConstraints$1$bailout(4, r1, b1, b2, d, r2, t2, t1, 0, 0, 0, 0);
  t1 = t2 - t1;
  t2 = r1.x;
  if (typeof t2 !== 'number') return this.solvePositionConstraints$1$bailout(5, t1, r1, b1, b2, d, r2, t2, 0, 0, 0, 0);
  d.x = t1 - t2;
  var t3 = b2.get$sweep().get$center().get$y();
  if (typeof t3 !== 'number') return this.solvePositionConstraints$1$bailout(6, r1, b1, b2, d, r2, t3, 0, 0, 0, 0, 0);
  var t4 = r2.y;
  if (typeof t4 !== 'number') return this.solvePositionConstraints$1$bailout(7, r1, b1, b2, d, r2, t3, t4, 0, 0, 0, 0);
  t4 += t3;
  t3 = b1.get$sweep().get$center().get$y();
  if (typeof t3 !== 'number') return this.solvePositionConstraints$1$bailout(8, r1, b1, b2, d, r2, t4, t3, 0, 0, 0, 0);
  t3 = t4 - t3;
  t4 = r1.y;
  if (typeof t4 !== 'number') return this.solvePositionConstraints$1$bailout(9, t3, r1, b1, b2, d, r2, t4, 0, 0, 0, 0);
  d.y = t3 - t4;
  var len = $.numTypeCheck(d.normalize$0());
  if (typeof len !== 'number') return this.solvePositionConstraints$1$bailout(10, r1, b1, b2, len, d, r2, 0, 0, 0, 0, 0);
  var t5 = $.get$length(this);
  if (typeof t5 !== 'number') return this.solvePositionConstraints$1$bailout(11, r1, b1, b2, len, d, t5, r2, 0, 0, 0, 0);
  var C = $.numTypeCheck($.MathBox_clamp(len - t5, -0.2, 0.2));
  if (typeof C !== 'number') return this.solvePositionConstraints$1$bailout(12, C, r1, b1, b2, d, r2, 0, 0, 0, 0, 0);
  var t6 = this.mass;
  if (typeof t6 !== 'number') return this.solvePositionConstraints$1$bailout(13, C, r1, b1, b2, d, r2, t6, 0, 0, 0, 0);
  var imp = -t6 * C;
  var t7 = this.u;
  t7.setFrom$1(d);
  var t8 = t7.x;
  if (typeof t8 !== 'number') return this.solvePositionConstraints$1$bailout(15, C, r1, b1, b2, r2, imp, t8, t7, 0, 0, 0);
  var Px = imp * t8;
  t7 = t7.y;
  if (typeof t7 !== 'number') return this.solvePositionConstraints$1$bailout(17, t7, C, r1, b1, b2, r2, imp, Px, 0, 0, 0);
  var Py = imp * t7;
  t7 = b1.get$sweep().get$center();
  t8 = t7.get$x();
  if (typeof t8 !== 'number') return this.solvePositionConstraints$1$bailout(19, C, r1, Py, b1, t7, t8, b2, r2, Px, 0, 0);
  var t9 = b1.get$invMass();
  if (typeof t9 !== 'number') return this.solvePositionConstraints$1$bailout(20, C, r1, Py, b1, t7, t8, t9, r2, b2, Px, 0);
  t7.set$x(t8 - t9 * Px);
  t7 = b1.get$sweep().get$center();
  var t10 = t7.get$y();
  if (typeof t10 !== 'number') return this.solvePositionConstraints$1$bailout(21, t10, C, r1, Py, b1, b2, r2, Px, t7, 0, 0);
  var t11 = b1.get$invMass();
  if (typeof t11 !== 'number') return this.solvePositionConstraints$1$bailout(22, t10, t11, C, r1, Py, b1, b2, r2, Px, t7, 0);
  t7.set$y(t10 - t11 * Py);
  t7 = b1.get$sweep();
  var t12 = t7.get$angle();
  if (typeof t12 !== 'number') return this.solvePositionConstraints$1$bailout(23, C, r1, Py, b1, b2, r2, t7, t12, Px, 0, 0);
  var t13 = b1.get$invInertia();
  if (typeof t13 !== 'number') return this.solvePositionConstraints$1$bailout(24, C, r1, Py, b1, b2, r2, t7, t12, t13, Px, 0);
  var t14 = r1.x;
  if (typeof t14 !== 'number') return this.solvePositionConstraints$1$bailout(25, t14, C, Py, r1, b2, b1, t7, t12, r2, t13, Px);
  t14 *= Py;
  var t15 = r1.y;
  if (typeof t15 !== 'number') return this.solvePositionConstraints$1$bailout(26, C, t15, Py, b1, b2, r2, t7, t12, t13, t14, Px);
  t7.set$angle(t12 - t13 * (t14 - t15 * Px));
  t7 = b2.get$sweep().get$center();
  var t16 = t7.get$x();
  if (typeof t16 !== 'number') return this.solvePositionConstraints$1$bailout(27, C, Py, b1, b2, r2, t7, t16, Px, 0, 0, 0);
  var t17 = b2.get$invMass();
  if (typeof t17 !== 'number') return this.solvePositionConstraints$1$bailout(28, C, Py, b1, b2, r2, t7, t16, t17, Px, 0, 0);
  t7.set$x(t16 + t17 * Px);
  t7 = b2.get$sweep().get$center();
  var t18 = t7.get$y();
  if (typeof t18 !== 'number') return this.solvePositionConstraints$1$bailout(29, t7, C, t18, Py, b1, b2, r2, Px, 0, 0, 0);
  var t19 = b2.get$invMass();
  if (typeof t19 !== 'number') return this.solvePositionConstraints$1$bailout(30, t7, C, t18, Py, b1, b2, r2, t19, Px, 0, 0);
  t7.set$y(t18 + t19 * Py);
  t7 = b2.get$sweep();
  var t20 = t7.get$angle();
  if (typeof t20 !== 'number') return this.solvePositionConstraints$1$bailout(31, C, Py, b1, b2, r2, t7, t20, Px, 0, 0, 0);
  var t21 = b2.get$invInertia();
  if (typeof t21 !== 'number') return this.solvePositionConstraints$1$bailout(32, C, Py, b1, b2, r2, t7, t20, t21, Px, 0, 0);
  var t22 = r2.x;
  if (typeof t22 !== 'number') return this.solvePositionConstraints$1$bailout(33, C, Py, b1, b2, r2, t7, t20, t21, t22, Px, 0);
  t22 *= Py;
  var t23 = r2.y;
  if (typeof t23 !== 'number') return this.solvePositionConstraints$1$bailout(34, C, b1, b2, t23, t7, t20, t21, t22, Px, 0, 0);
  t7.set$angle(t20 + t21 * (t22 - t23 * Px));
  b1.synchronizeTransform$0();
  b2.synchronizeTransform$0();
  t7 = $.abs(C);
  if (typeof t7 !== 'number') return this.solvePositionConstraints$1$bailout(35, t7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  return t7 < 0.005;
 },
 solvePositionConstraints$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      r1 = env0;
      b1 = env1;
      b2 = env2;
      d = env3;
      r2 = env4;
      t1 = env5;
      break;
    case 3:
      r1 = env0;
      b1 = env1;
      b2 = env2;
      d = env3;
      r2 = env4;
      t2 = env5;
      t1 = env6;
      break;
    case 4:
      r1 = env0;
      b1 = env1;
      b2 = env2;
      d = env3;
      r2 = env4;
      t2 = env5;
      t1 = env6;
      break;
    case 5:
      t1 = env0;
      r1 = env1;
      b1 = env2;
      b2 = env3;
      d = env4;
      r2 = env5;
      t2 = env6;
      break;
    case 6:
      r1 = env0;
      b1 = env1;
      b2 = env2;
      d = env3;
      r2 = env4;
      t3 = env5;
      break;
    case 7:
      r1 = env0;
      b1 = env1;
      b2 = env2;
      d = env3;
      r2 = env4;
      t3 = env5;
      t4 = env6;
      break;
    case 8:
      r1 = env0;
      b1 = env1;
      b2 = env2;
      d = env3;
      r2 = env4;
      t4 = env5;
      t3 = env6;
      break;
    case 9:
      t3 = env0;
      r1 = env1;
      b1 = env2;
      b2 = env3;
      d = env4;
      r2 = env5;
      t4 = env6;
      break;
    case 10:
      r1 = env0;
      b1 = env1;
      b2 = env2;
      len = env3;
      d = env4;
      r2 = env5;
      break;
    case 11:
      r1 = env0;
      b1 = env1;
      b2 = env2;
      len = env3;
      d = env4;
      t5 = env5;
      r2 = env6;
      break;
    case 12:
      C = env0;
      r1 = env1;
      b1 = env2;
      b2 = env3;
      d = env4;
      r2 = env5;
      break;
    case 13:
      C = env0;
      r1 = env1;
      b1 = env2;
      b2 = env3;
      d = env4;
      r2 = env5;
      t5 = env6;
      break;
    case 14:
      C = env0;
      r1 = env1;
      b1 = env2;
      b2 = env3;
      d = env4;
      r2 = env5;
      imp = env6;
      break;
    case 15:
      C = env0;
      r1 = env1;
      b1 = env2;
      b2 = env3;
      r2 = env4;
      imp = env5;
      t7 = env6;
      t6 = env7;
      break;
    case 16:
      Px = env0;
      C = env1;
      r1 = env2;
      b1 = env3;
      b2 = env4;
      r2 = env5;
      imp = env6;
      t6 = env7;
      break;
    case 17:
      t6 = env0;
      C = env1;
      r1 = env2;
      b1 = env3;
      b2 = env4;
      r2 = env5;
      imp = env6;
      Px = env7;
      break;
    case 18:
      C = env0;
      r1 = env1;
      Py = env2;
      b1 = env3;
      b2 = env4;
      r2 = env5;
      Px = env6;
      break;
    case 19:
      C = env0;
      r1 = env1;
      Py = env2;
      b1 = env3;
      t6 = env4;
      t7 = env5;
      b2 = env6;
      r2 = env7;
      Px = env8;
      break;
    case 20:
      C = env0;
      r1 = env1;
      Py = env2;
      b1 = env3;
      t6 = env4;
      t7 = env5;
      t8 = env6;
      r2 = env7;
      b2 = env8;
      Px = env9;
      break;
    case 21:
      t9 = env0;
      C = env1;
      r1 = env2;
      Py = env3;
      b1 = env4;
      b2 = env5;
      r2 = env6;
      Px = env7;
      t6 = env8;
      break;
    case 22:
      t9 = env0;
      t10 = env1;
      C = env2;
      r1 = env3;
      Py = env4;
      b1 = env5;
      b2 = env6;
      r2 = env7;
      Px = env8;
      t6 = env9;
      break;
    case 23:
      C = env0;
      r1 = env1;
      Py = env2;
      b1 = env3;
      b2 = env4;
      r2 = env5;
      t6 = env6;
      t11 = env7;
      Px = env8;
      break;
    case 24:
      C = env0;
      r1 = env1;
      Py = env2;
      b1 = env3;
      b2 = env4;
      r2 = env5;
      t6 = env6;
      t11 = env7;
      t12 = env8;
      Px = env9;
      break;
    case 25:
      t13 = env0;
      C = env1;
      Py = env2;
      r1 = env3;
      b2 = env4;
      b1 = env5;
      t6 = env6;
      t11 = env7;
      r2 = env8;
      t12 = env9;
      Px = env10;
      break;
    case 26:
      C = env0;
      t14 = env1;
      Py = env2;
      b1 = env3;
      b2 = env4;
      r2 = env5;
      t6 = env6;
      t11 = env7;
      t12 = env8;
      t13 = env9;
      Px = env10;
      break;
    case 27:
      C = env0;
      Py = env1;
      b1 = env2;
      b2 = env3;
      r2 = env4;
      t6 = env5;
      t15 = env6;
      Px = env7;
      break;
    case 28:
      C = env0;
      Py = env1;
      b1 = env2;
      b2 = env3;
      r2 = env4;
      t6 = env5;
      t15 = env6;
      t16 = env7;
      Px = env8;
      break;
    case 29:
      t6 = env0;
      C = env1;
      t17 = env2;
      Py = env3;
      b1 = env4;
      b2 = env5;
      r2 = env6;
      Px = env7;
      break;
    case 30:
      t6 = env0;
      C = env1;
      t17 = env2;
      Py = env3;
      b1 = env4;
      b2 = env5;
      r2 = env6;
      t18 = env7;
      Px = env8;
      break;
    case 31:
      C = env0;
      Py = env1;
      b1 = env2;
      b2 = env3;
      r2 = env4;
      t6 = env5;
      t19 = env6;
      Px = env7;
      break;
    case 32:
      C = env0;
      Py = env1;
      b1 = env2;
      b2 = env3;
      r2 = env4;
      t6 = env5;
      t19 = env6;
      t20 = env7;
      Px = env8;
      break;
    case 33:
      C = env0;
      Py = env1;
      b1 = env2;
      b2 = env3;
      r2 = env4;
      t6 = env5;
      t19 = env6;
      t20 = env7;
      t21 = env8;
      Px = env9;
      break;
    case 34:
      C = env0;
      b1 = env1;
      b2 = env2;
      t22 = env3;
      t6 = env4;
      t19 = env5;
      t20 = env6;
      t21 = env7;
      Px = env8;
      break;
    case 35:
      t6 = env0;
      break;
  }
  switch (state) {
    case 0:
      $.numTypeCheck(baumgarte);
      var t1 = this.frequencyHz;
    case 1:
      state = 0;
      if ($.gtB(t1, 0.0)) return true;
      var b1 = this.bodyA;
      var b2 = this.bodyB;
      var r1 = $.Vector$(0, 0);
      var r2 = $.Vector$(0, 0);
      var d = $.Vector$(0, 0);
      r1.setFrom$1(this.localAnchor1).subLocal$1(b1.get$localCenter());
      r2.setFrom$1(this.localAnchor2).subLocal$1(b2.get$localCenter());
      $.Matrix22_mulMatrixAndVectorToOut(b1.get$originTransform().get$rotation(), r1, r1);
      $.Matrix22_mulMatrixAndVectorToOut(b2.get$originTransform().get$rotation(), r2, r2);
      t1 = b2.get$sweep().get$center().get$x();
    case 2:
      state = 0;
      var t2 = r2.x;
    case 3:
      state = 0;
      t2 = $.add(t1, t2);
      t1 = b1.get$sweep().get$center().get$x();
    case 4:
      state = 0;
      t1 = $.sub(t2, t1);
      t2 = r1.x;
    case 5:
      state = 0;
      d.x = $.sub(t1, t2);
      var t3 = b2.get$sweep().get$center().get$y();
    case 6:
      state = 0;
      var t4 = r2.y;
    case 7:
      state = 0;
      t4 = $.add(t3, t4);
      t3 = b1.get$sweep().get$center().get$y();
    case 8:
      state = 0;
      t3 = $.sub(t4, t3);
      t4 = r1.y;
    case 9:
      state = 0;
      d.y = $.sub(t3, t4);
      var len = $.numTypeCheck(d.normalize$0());
    case 10:
      state = 0;
      var t5 = $.get$length(this);
    case 11:
      state = 0;
      var C = $.numTypeCheck($.MathBox_clamp($.numTypeCheck($.sub(len, t5)), -0.2, 0.2));
    case 12:
      state = 0;
      t5 = this.mass;
    case 13:
      state = 0;
      var imp = $.numTypeCheck($.mul($.neg(t5), C));
    case 14:
      state = 0;
      var t6 = this.u;
      t6.setFrom$1(d);
      var t7 = t6.get$x();
    case 15:
      state = 0;
      var Px = $.numTypeCheck($.mul(imp, t7));
    case 16:
      state = 0;
      t6 = t6.get$y();
    case 17:
      state = 0;
      var Py = $.numTypeCheck($.mul(imp, t6));
    case 18:
      state = 0;
      t6 = b1.get$sweep().get$center();
      t7 = t6.get$x();
    case 19:
      state = 0;
      var t8 = b1.get$invMass();
    case 20:
      state = 0;
      t6.set$x($.sub(t7, $.mul(t8, Px)));
      t6 = b1.get$sweep().get$center();
      var t9 = t6.get$y();
    case 21:
      state = 0;
      var t10 = b1.get$invMass();
    case 22:
      state = 0;
      t6.set$y($.sub(t9, $.mul(t10, Py)));
      t6 = b1.get$sweep();
      var t11 = t6.get$angle();
    case 23:
      state = 0;
      var t12 = b1.get$invInertia();
    case 24:
      state = 0;
      var t13 = r1.x;
    case 25:
      state = 0;
      t13 = $.mul(t13, Py);
      var t14 = r1.y;
    case 26:
      state = 0;
      t6.set$angle($.sub(t11, $.mul(t12, $.sub(t13, $.mul(t14, Px)))));
      t6 = b2.get$sweep().get$center();
      var t15 = t6.get$x();
    case 27:
      state = 0;
      var t16 = b2.get$invMass();
    case 28:
      state = 0;
      t6.set$x($.add(t15, $.mul(t16, Px)));
      t6 = b2.get$sweep().get$center();
      var t17 = t6.get$y();
    case 29:
      state = 0;
      var t18 = b2.get$invMass();
    case 30:
      state = 0;
      t6.set$y($.add(t17, $.mul(t18, Py)));
      t6 = b2.get$sweep();
      var t19 = t6.get$angle();
    case 31:
      state = 0;
      var t20 = b2.get$invInertia();
    case 32:
      state = 0;
      var t21 = r2.x;
    case 33:
      state = 0;
      t21 = $.mul(t21, Py);
      var t22 = r2.y;
    case 34:
      state = 0;
      t6.set$angle($.add(t19, $.mul(t20, $.sub(t21, $.mul(t22, Px)))));
      b1.synchronizeTransform$0();
      b2.synchronizeTransform$0();
      t6 = $.abs(C);
    case 35:
      state = 0;
      return $.lt(t6, 0.005);
  }
 },
 solveVelocityConstraints$1: function(step) {
  $.propertyTypeCheck(step, 'is$TimeStep');
  var b1 = $.propertyTypeCheck(this.bodyA, 'is$Body');
  var b2 = $.propertyTypeCheck(this.bodyB, 'is$Body');
  var r1 = $.Vector$(0, 0);
  var r2 = $.Vector$(0, 0);
  r1.setFrom$1(this.localAnchor1).subLocal$1(b1.get$localCenter());
  r2.setFrom$1(this.localAnchor2).subLocal$1(b2.get$localCenter());
  $.Matrix22_mulMatrixAndVectorToOut(b1.get$originTransform().get$rotation(), r1, r1);
  $.Matrix22_mulMatrixAndVectorToOut(b2.get$originTransform().get$rotation(), r2, r2);
  var v1 = $.Vector$(0, 0);
  var v2 = $.Vector$(0, 0);
  $.Vector_crossNumAndVectorToOut(b1.get$angularVelocity(), r1, v1);
  $.Vector_crossNumAndVectorToOut(b2.get$angularVelocity(), r2, v2);
  v1.addLocal$1(b1.get$linearVelocity());
  v2.addLocal$1(b2.get$linearVelocity());
  var t1 = this.u;
  var Cdot = $.numTypeCheck($.Vector_dot(t1, v2.subLocal$1(v1)));
  var imp = $.numTypeCheck($.mul($.neg(this.mass), $.add($.add(Cdot, this.bias), $.mul(this.gamma, this.impulse))));
  this.impulse = $.add(this.impulse, imp);
  var Px = $.numTypeCheck($.mul(imp, t1.get$x()));
  var Py = $.numTypeCheck($.mul(imp, t1.get$y()));
  var t2 = b1.get$linearVelocity();
  t2.set$x($.sub(t2.get$x(), $.mul(b1.get$invMass(), Px)));
  t2 = b1.get$linearVelocity();
  t2.set$y($.sub(t2.get$y(), $.mul(b1.get$invMass(), Py)));
  b1.set$angularVelocity($.sub(b1.get$angularVelocity(), $.mul(b1.get$invInertia(), $.sub($.mul(r1.x, Py), $.mul(r1.y, Px)))));
  t2 = b2.get$linearVelocity();
  t2.set$x($.add(t2.get$x(), $.mul(b2.get$invMass(), Px)));
  t2 = b2.get$linearVelocity();
  t2.set$y($.add(t2.get$y(), $.mul(b2.get$invMass(), Py)));
  b2.set$angularVelocity($.add(b2.get$angularVelocity(), $.mul(b2.get$invInertia(), $.sub($.mul(r2.x, Py), $.mul(r2.y, Px)))));
 },
 initVelocityConstraints$1: function(step) {
  $.propertyTypeCheck(step, 'is$TimeStep');
  var b1 = $.propertyTypeCheck(this.bodyA, 'is$Body');
  var b2 = $.propertyTypeCheck(this.bodyB, 'is$Body');
  var r1 = $.Vector$(0, 0);
  var r2 = $.Vector$(0, 0);
  r1.setFrom$1(this.localAnchor1).subLocal$1(b1.get$localCenter());
  r2.setFrom$1(this.localAnchor2).subLocal$1(b2.get$localCenter());
  $.Matrix22_mulMatrixAndVectorToOut(b1.get$originTransform().get$rotation(), r1, r1);
  $.Matrix22_mulMatrixAndVectorToOut(b2.get$originTransform().get$rotation(), r2, r2);
  var t1 = b2.get$sweep().get$center().get$x();
  if (typeof t1 !== 'number') return this.initVelocityConstraints$1$bailout(1, t1, step, b1, b2, r1, r2, 0, 0, 0, 0, 0, 0);
  var t2 = r2.x;
  if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(2, t1, t2, step, b1, b2, r1, r2, 0, 0, 0, 0, 0);
  t2 += t1;
  t1 = b1.get$sweep().get$center().get$x();
  if (typeof t1 !== 'number') return this.initVelocityConstraints$1$bailout(3, step, t2, b1, t1, b2, r1, r2, 0, 0, 0, 0, 0);
  t1 = t2 - t1;
  t2 = r1.x;
  if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(4, t2, step, b1, b2, t1, r1, r2, 0, 0, 0, 0, 0);
  t2 = t1 - t2;
  t1 = this.u;
  t1.x = t2;
  t2 = b2.get$sweep().get$center().get$y();
  if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(5, t2, step, b1, b2, r1, t1, r2, 0, 0, 0, 0, 0);
  var t3 = r2.y;
  if (typeof t3 !== 'number') return this.initVelocityConstraints$1$bailout(6, t2, step, t3, b1, b2, r1, t1, r2, 0, 0, 0, 0);
  t3 += t2;
  t2 = b1.get$sweep().get$center().get$y();
  if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(7, step, t3, b1, t2, b2, r1, t1, r2, 0, 0, 0, 0);
  t2 = t3 - t2;
  t3 = r1.y;
  if (typeof t3 !== 'number') return this.initVelocityConstraints$1$bailout(8, step, t3, b1, b2, t2, r1, t1, r2, 0, 0, 0, 0);
  t1.y = t2 - t3;
  var len = $.numTypeCheck($.get$length(t1));
  if (typeof len !== 'number') return this.initVelocityConstraints$1$bailout(9, len, step, b1, b2, r1, t1, r2, 0, 0, 0, 0, 0);
  if (len > 0.005) {
    t2 = t1.x;
    if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(10, len, step, b1, b2, t2, r1, t1, r2, 0, 0, 0, 0);
    t3 = 1.0 / len;
    t1.x = t2 * t3;
    var t4 = t1.y;
    if (typeof t4 !== 'number') return this.initVelocityConstraints$1$bailout(11, t4, len, step, b1, b2, r1, t1, r2, t3, 0, 0, 0);
    t1.y = t4 * t3;
  } else t1.setCoords$2(0.0, 0.0);
  var cr1u = $.numTypeCheck($.Vector_crossVectors(r1, t1));
  if (typeof cr1u !== 'number') return this.initVelocityConstraints$1$bailout(12, cr1u, len, step, b1, b2, r1, t1, r2, 0, 0, 0, 0);
  var cr2u = $.numTypeCheck($.Vector_crossVectors(r2, t1));
  if (typeof cr2u !== 'number') return this.initVelocityConstraints$1$bailout(13, cr1u, len, step, cr2u, b1, b2, r1, t1, r2, 0, 0, 0);
  t2 = b1.get$invMass();
  if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(14, cr1u, len, step, cr2u, b1, t2, b2, r1, t1, r2, 0, 0);
  t3 = b1.get$invInertia();
  if (typeof t3 !== 'number') return this.initVelocityConstraints$1$bailout(15, cr1u, len, step, cr2u, b1, t2, b2, t3, r1, t1, r2, 0);
  t2 += t3 * cr1u * cr1u;
  t4 = b2.get$invMass();
  if (typeof t4 !== 'number') return this.initVelocityConstraints$1$bailout(16, len, step, cr2u, b1, b2, r1, t1, t2, r2, t4, 0, 0);
  t4 += t2;
  t2 = b2.get$invInertia();
  if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(17, t2, len, step, cr2u, b1, b2, r1, t1, r2, t4, 0, 0);
  var invMass = t4 + t2 * cr2u * cr2u;
  $.assert(invMass > 1.192e-7);
  this.mass = 1.0 / invMass;
  t2 = this.frequencyHz;
  if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(18, len, step, t2, b1, b2, r1, t1, r2, invMass, 0, 0, 0);
  if (t2 > 0.0) {
    t3 = $.get$length(this);
    if (typeof t3 !== 'number') return this.initVelocityConstraints$1$bailout(19, len, step, t2, b1, b2, t3, r1, t1, r2, invMass, 0, 0);
    var C = len - t3;
    var omega = 6.283185307179586 * t2;
    t2 = this.mass;
    if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(21, step, invMass, b1, t2, b2, C, r1, t1, r2, omega, 0, 0);
    t3 = 2.0 * t2;
    t4 = this.dampingRatio;
    if (typeof t4 !== 'number') throw $.iae(t4);
    var d = t3 * t4 * omega;
    var k = t2 * omega * omega;
    var t5 = step.get$dt();
    if (typeof t5 !== 'number') return this.initVelocityConstraints$1$bailout(23, t5, step, invMass, b1, b2, d, C, r1, t1, r2, k, 0);
    var t6 = step.get$dt();
    if (typeof t6 !== 'number') return this.initVelocityConstraints$1$bailout(24, t5, t6, step, b1, b2, C, r1, r2, invMass, d, t1, k);
    this.gamma = t5 * (d + t6 * k);
    t2 = this.gamma;
    if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(25, step, invMass, b1, b2, t2, C, t1, r1, r2, k, 0, 0);
    if (!(t2 === 0.0)) {
      if (typeof t2 !== 'number') throw $.iae(t2);
      t2 = 1.0 / t2;
    } else t2 = 0.0;
    this.gamma = t2;
    t2 = step.get$dt();
    if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(26, step, invMass, b1, b2, t2, C, r1, t1, r2, k, 0, 0);
    t3 = C * t2 * k;
    t4 = this.gamma;
    if (typeof t4 !== 'number') return this.initVelocityConstraints$1$bailout(27, step, invMass, b1, b2, r1, t1, t3, r2, t4, 0, 0, 0);
    this.bias = t3 * t4;
    t5 = this.gamma;
    if (typeof t5 !== 'number') throw $.iae(t5);
    this.mass = invMass + t5;
    t2 = this.mass;
    if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(28, t2, step, b1, b2, r1, t1, r2, 0, 0, 0, 0, 0);
    if (!(t2 === 0.0)) {
      if (typeof t2 !== 'number') throw $.iae(t2);
      t2 = 1.0 / t2;
    } else t2 = 0.0;
    this.mass = t2;
  }
  if (step.get$warmStarting() === true) {
    t2 = this.impulse;
    if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(29, step, t2, b1, b2, r1, t1, r2, 0, 0, 0, 0, 0);
    t3 = step.get$dtRatio();
    if (typeof t3 !== 'number') return this.initVelocityConstraints$1$bailout(30, t2, b1, b2, r1, t1, t3, r2, 0, 0, 0, 0, 0);
    this.impulse = t2 * t3;
    var P = $.Vector$(0, 0);
    P.setFrom$1(t1).mulLocal$1(this.impulse);
    t4 = b1.get$linearVelocity();
    t5 = t4.get$x();
    if (typeof t5 !== 'number') return this.initVelocityConstraints$1$bailout(31, P, b1, t4, t5, b2, r1, r2, 0, 0, 0, 0, 0);
    t6 = b1.get$invMass();
    if (typeof t6 !== 'number') return this.initVelocityConstraints$1$bailout(32, P, b1, t4, t5, b2, t6, r1, r2, 0, 0, 0, 0);
    var t7 = P.x;
    if (typeof t7 !== 'number') return this.initVelocityConstraints$1$bailout(33, P, b1, t4, t5, b2, t6, r1, t7, r2, 0, 0, 0);
    t4.set$x(t5 - t6 * t7);
    t4 = b1.get$linearVelocity();
    var t8 = t4.get$y();
    if (typeof t8 !== 'number') return this.initVelocityConstraints$1$bailout(34, P, t8, b1, b2, r1, r2, t4, 0, 0, 0, 0, 0);
    var t9 = b1.get$invMass();
    if (typeof t9 !== 'number') return this.initVelocityConstraints$1$bailout(35, P, t8, t9, b1, b2, r1, r2, t4, 0, 0, 0, 0);
    var t10 = P.y;
    if (typeof t10 !== 'number') return this.initVelocityConstraints$1$bailout(36, P, t8, t9, b1, b2, r1, t10, r2, t4, 0, 0, 0);
    t4.set$y(t8 - t9 * t10);
    t4 = b1.get$angularVelocity();
    if (typeof t4 !== 'number') return this.initVelocityConstraints$1$bailout(37, P, b1, b2, t4, r1, r2, 0, 0, 0, 0, 0, 0);
    var t11 = b1.get$invInertia();
    if (typeof t11 !== 'number') return this.initVelocityConstraints$1$bailout(38, P, b1, b2, t4, t11, r1, r2, 0, 0, 0, 0, 0);
    var t12 = $.Vector_crossVectors(r1, P);
    if (typeof t12 !== 'number') return this.initVelocityConstraints$1$bailout(39, P, b1, b2, t4, t11, t12, r2, 0, 0, 0, 0, 0);
    b1.set$angularVelocity(t4 - t11 * t12);
    var t13 = b2.get$linearVelocity();
    var t14 = t13.get$x();
    if (typeof t14 !== 'number') return this.initVelocityConstraints$1$bailout(40, P, t13, t14, r2, b2, 0, 0, 0, 0, 0, 0, 0);
    var t15 = b2.get$invMass();
    if (typeof t15 !== 'number') return this.initVelocityConstraints$1$bailout(41, P, t13, t14, t15, b2, r2, 0, 0, 0, 0, 0, 0);
    var t16 = P.x;
    if (typeof t16 !== 'number') return this.initVelocityConstraints$1$bailout(42, P, t13, t14, t15, b2, t16, r2, 0, 0, 0, 0, 0);
    t13.set$x(t14 + t15 * t16);
    t13 = b2.get$linearVelocity();
    var t17 = t13.get$y();
    if (typeof t17 !== 'number') return this.initVelocityConstraints$1$bailout(43, P, t13, t17, r2, b2, 0, 0, 0, 0, 0, 0, 0);
    var t18 = b2.get$invMass();
    if (typeof t18 !== 'number') return this.initVelocityConstraints$1$bailout(44, P, b2, t13, t17, t18, r2, 0, 0, 0, 0, 0, 0);
    var t19 = P.y;
    if (typeof t19 !== 'number') return this.initVelocityConstraints$1$bailout(45, P, b2, t13, t17, t18, r2, t19, 0, 0, 0, 0, 0);
    t13.set$y(t17 + t18 * t19);
    t13 = b2.get$angularVelocity();
    if (typeof t13 !== 'number') return this.initVelocityConstraints$1$bailout(46, P, t13, r2, b2, 0, 0, 0, 0, 0, 0, 0, 0);
    var t20 = b2.get$invInertia();
    if (typeof t20 !== 'number') return this.initVelocityConstraints$1$bailout(47, P, t13, t20, r2, b2, 0, 0, 0, 0, 0, 0, 0);
    var t21 = $.Vector_crossVectors(r2, P);
    if (typeof t21 !== 'number') return this.initVelocityConstraints$1$bailout(48, t13, t20, t21, b2, 0, 0, 0, 0, 0, 0, 0, 0);
    b2.set$angularVelocity(t13 + t20 * t21);
  } else this.impulse = 0.0;
 },
 initVelocityConstraints$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11) {
  switch (state) {
    case 1:
      t1 = env0;
      var step = env1;
      b1 = env2;
      b2 = env3;
      r1 = env4;
      r2 = env5;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      step = env2;
      b1 = env3;
      b2 = env4;
      r1 = env5;
      r2 = env6;
      break;
    case 3:
      step = env0;
      t2 = env1;
      b1 = env2;
      t1 = env3;
      b2 = env4;
      r1 = env5;
      r2 = env6;
      break;
    case 4:
      t2 = env0;
      step = env1;
      b1 = env2;
      b2 = env3;
      t1 = env4;
      r1 = env5;
      r2 = env6;
      break;
    case 5:
      t2 = env0;
      step = env1;
      b1 = env2;
      b2 = env3;
      r1 = env4;
      t1 = env5;
      r2 = env6;
      break;
    case 6:
      t2 = env0;
      step = env1;
      t3 = env2;
      b1 = env3;
      b2 = env4;
      r1 = env5;
      t1 = env6;
      r2 = env7;
      break;
    case 7:
      step = env0;
      t3 = env1;
      b1 = env2;
      t2 = env3;
      b2 = env4;
      r1 = env5;
      t1 = env6;
      r2 = env7;
      break;
    case 8:
      step = env0;
      t3 = env1;
      b1 = env2;
      b2 = env3;
      t2 = env4;
      r1 = env5;
      t1 = env6;
      r2 = env7;
      break;
    case 9:
      len = env0;
      step = env1;
      b1 = env2;
      b2 = env3;
      r1 = env4;
      t1 = env5;
      r2 = env6;
      break;
    case 10:
      len = env0;
      step = env1;
      b1 = env2;
      b2 = env3;
      t2 = env4;
      r1 = env5;
      t1 = env6;
      r2 = env7;
      break;
    case 11:
      t4 = env0;
      len = env1;
      step = env2;
      b1 = env3;
      b2 = env4;
      r1 = env5;
      t1 = env6;
      r2 = env7;
      t3 = env8;
      break;
    case 12:
      cr1u = env0;
      len = env1;
      step = env2;
      b1 = env3;
      b2 = env4;
      r1 = env5;
      t1 = env6;
      r2 = env7;
      break;
    case 13:
      cr1u = env0;
      len = env1;
      step = env2;
      cr2u = env3;
      b1 = env4;
      b2 = env5;
      r1 = env6;
      t1 = env7;
      r2 = env8;
      break;
    case 14:
      cr1u = env0;
      len = env1;
      step = env2;
      cr2u = env3;
      b1 = env4;
      t2 = env5;
      b2 = env6;
      r1 = env7;
      t1 = env8;
      r2 = env9;
      break;
    case 15:
      cr1u = env0;
      len = env1;
      step = env2;
      cr2u = env3;
      b1 = env4;
      t2 = env5;
      b2 = env6;
      t3 = env7;
      r1 = env8;
      t1 = env9;
      r2 = env10;
      break;
    case 16:
      len = env0;
      step = env1;
      cr2u = env2;
      b1 = env3;
      b2 = env4;
      r1 = env5;
      t1 = env6;
      t2 = env7;
      r2 = env8;
      t4 = env9;
      break;
    case 17:
      t2 = env0;
      len = env1;
      step = env2;
      cr2u = env3;
      b1 = env4;
      b2 = env5;
      r1 = env6;
      t1 = env7;
      r2 = env8;
      t4 = env9;
      break;
    case 18:
      len = env0;
      step = env1;
      t2 = env2;
      b1 = env3;
      b2 = env4;
      r1 = env5;
      t1 = env6;
      r2 = env7;
      invMass = env8;
      break;
    case 19:
      len = env0;
      step = env1;
      t2 = env2;
      b1 = env3;
      b2 = env4;
      t3 = env5;
      r1 = env6;
      t1 = env7;
      r2 = env8;
      invMass = env9;
      break;
    case 20:
      step = env0;
      t2 = env1;
      b1 = env2;
      b2 = env3;
      C = env4;
      r1 = env5;
      t1 = env6;
      r2 = env7;
      invMass = env8;
      break;
    case 21:
      step = env0;
      invMass = env1;
      b1 = env2;
      t2 = env3;
      b2 = env4;
      C = env5;
      r1 = env6;
      t1 = env7;
      r2 = env8;
      omega = env9;
      break;
    case 22:
      step = env0;
      invMass = env1;
      b1 = env2;
      b2 = env3;
      d = env4;
      r1 = env5;
      C = env6;
      t1 = env7;
      r2 = env8;
      k = env9;
      break;
    case 23:
      t5 = env0;
      step = env1;
      invMass = env2;
      b1 = env3;
      b2 = env4;
      d = env5;
      C = env6;
      r1 = env7;
      t1 = env8;
      r2 = env9;
      k = env10;
      break;
    case 24:
      t5 = env0;
      t6 = env1;
      step = env2;
      b1 = env3;
      b2 = env4;
      C = env5;
      r1 = env6;
      r2 = env7;
      invMass = env8;
      d = env9;
      t1 = env10;
      k = env11;
      break;
    case 25:
      step = env0;
      invMass = env1;
      b1 = env2;
      b2 = env3;
      t2 = env4;
      C = env5;
      t1 = env6;
      r1 = env7;
      r2 = env8;
      k = env9;
      break;
    case 26:
      step = env0;
      invMass = env1;
      b1 = env2;
      b2 = env3;
      t2 = env4;
      C = env5;
      r1 = env6;
      t1 = env7;
      r2 = env8;
      k = env9;
      break;
    case 27:
      step = env0;
      invMass = env1;
      b1 = env2;
      b2 = env3;
      r1 = env4;
      t1 = env5;
      t3 = env6;
      r2 = env7;
      t4 = env8;
      break;
    case 28:
      t2 = env0;
      step = env1;
      b1 = env2;
      b2 = env3;
      r1 = env4;
      t1 = env5;
      r2 = env6;
      break;
    case 29:
      step = env0;
      t2 = env1;
      b1 = env2;
      b2 = env3;
      r1 = env4;
      t1 = env5;
      r2 = env6;
      break;
    case 30:
      t2 = env0;
      b1 = env1;
      b2 = env2;
      r1 = env3;
      t1 = env4;
      t3 = env5;
      r2 = env6;
      break;
    case 31:
      P = env0;
      b1 = env1;
      t4 = env2;
      t5 = env3;
      b2 = env4;
      r1 = env5;
      r2 = env6;
      break;
    case 32:
      P = env0;
      b1 = env1;
      t4 = env2;
      t5 = env3;
      b2 = env4;
      t6 = env5;
      r1 = env6;
      r2 = env7;
      break;
    case 33:
      P = env0;
      b1 = env1;
      t4 = env2;
      t5 = env3;
      b2 = env4;
      t6 = env5;
      r1 = env6;
      t7 = env7;
      r2 = env8;
      break;
    case 34:
      P = env0;
      t8 = env1;
      b1 = env2;
      b2 = env3;
      r1 = env4;
      r2 = env5;
      t4 = env6;
      break;
    case 35:
      P = env0;
      t8 = env1;
      t9 = env2;
      b1 = env3;
      b2 = env4;
      r1 = env5;
      r2 = env6;
      t4 = env7;
      break;
    case 36:
      P = env0;
      t8 = env1;
      t9 = env2;
      b1 = env3;
      b2 = env4;
      r1 = env5;
      t10 = env6;
      r2 = env7;
      t4 = env8;
      break;
    case 37:
      P = env0;
      b1 = env1;
      b2 = env2;
      t4 = env3;
      r1 = env4;
      r2 = env5;
      break;
    case 38:
      P = env0;
      b1 = env1;
      b2 = env2;
      t4 = env3;
      t11 = env4;
      r1 = env5;
      r2 = env6;
      break;
    case 39:
      P = env0;
      b1 = env1;
      b2 = env2;
      t4 = env3;
      t11 = env4;
      t12 = env5;
      r2 = env6;
      break;
    case 40:
      P = env0;
      t13 = env1;
      t14 = env2;
      r2 = env3;
      b2 = env4;
      break;
    case 41:
      P = env0;
      t13 = env1;
      t14 = env2;
      t15 = env3;
      b2 = env4;
      r2 = env5;
      break;
    case 42:
      P = env0;
      t13 = env1;
      t14 = env2;
      t15 = env3;
      b2 = env4;
      t16 = env5;
      r2 = env6;
      break;
    case 43:
      P = env0;
      t13 = env1;
      t17 = env2;
      r2 = env3;
      b2 = env4;
      break;
    case 44:
      P = env0;
      b2 = env1;
      t13 = env2;
      t17 = env3;
      t18 = env4;
      r2 = env5;
      break;
    case 45:
      P = env0;
      b2 = env1;
      t13 = env2;
      t17 = env3;
      t18 = env4;
      r2 = env5;
      t19 = env6;
      break;
    case 46:
      P = env0;
      t13 = env1;
      r2 = env2;
      b2 = env3;
      break;
    case 47:
      P = env0;
      t13 = env1;
      t20 = env2;
      r2 = env3;
      b2 = env4;
      break;
    case 48:
      t13 = env0;
      t20 = env1;
      t21 = env2;
      b2 = env3;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(step, 'is$TimeStep');
      var b1 = $.propertyTypeCheck(this.bodyA, 'is$Body');
      var b2 = $.propertyTypeCheck(this.bodyB, 'is$Body');
      var r1 = $.Vector$(0, 0);
      var r2 = $.Vector$(0, 0);
      r1.setFrom$1(this.localAnchor1).subLocal$1(b1.get$localCenter());
      r2.setFrom$1(this.localAnchor2).subLocal$1(b2.get$localCenter());
      $.Matrix22_mulMatrixAndVectorToOut(b1.get$originTransform().get$rotation(), r1, r1);
      $.Matrix22_mulMatrixAndVectorToOut(b2.get$originTransform().get$rotation(), r2, r2);
      var t1 = b2.get$sweep().get$center().get$x();
    case 1:
      state = 0;
      var t2 = r2.x;
    case 2:
      state = 0;
      t2 = $.add(t1, t2);
      t1 = b1.get$sweep().get$center().get$x();
    case 3:
      state = 0;
      t1 = $.sub(t2, t1);
      t2 = r1.x;
    case 4:
      state = 0;
      t2 = $.sub(t1, t2);
      t1 = this.u;
      t1.set$x(t2);
      t2 = b2.get$sweep().get$center().get$y();
    case 5:
      state = 0;
      var t3 = r2.y;
    case 6:
      state = 0;
      t3 = $.add(t2, t3);
      t2 = b1.get$sweep().get$center().get$y();
    case 7:
      state = 0;
      t2 = $.sub(t3, t2);
      t3 = r1.y;
    case 8:
      state = 0;
      t1.set$y($.sub(t2, t3));
      var len = $.numTypeCheck($.get$length(t1));
    case 9:
      state = 0;
    case 10:
    case 11:
      if (state == 10 || state == 11 || (state == 0 && $.gtB(len, 0.005))) {
        switch (state) {
          case 0:
            t2 = t1.get$x();
          case 10:
            state = 0;
            if (typeof len !== 'number') throw $.iae(len);
            t3 = 1.0 / len;
            t1.set$x($.mul(t2, t3));
            var t4 = t1.get$y();
          case 11:
            state = 0;
            t1.set$y($.mul(t4, t3));
        }
      } else {
        t1.setCoords$2(0.0, 0.0);
      }
      var cr1u = $.numTypeCheck($.Vector_crossVectors(r1, t1));
    case 12:
      state = 0;
      var cr2u = $.numTypeCheck($.Vector_crossVectors(r2, t1));
    case 13:
      state = 0;
      t2 = b1.get$invMass();
    case 14:
      state = 0;
      t3 = b1.get$invInertia();
    case 15:
      state = 0;
      t2 = $.add(t2, $.mul($.mul(t3, cr1u), cr1u));
      t4 = b2.get$invMass();
    case 16:
      state = 0;
      t4 = $.add(t2, t4);
      t2 = b2.get$invInertia();
    case 17:
      state = 0;
      var invMass = $.numTypeCheck($.add(t4, $.mul($.mul(t2, cr2u), cr2u)));
      $.assert($.gt(invMass, 1.192e-7));
      if (typeof invMass !== 'number') throw $.iae(invMass);
      this.mass = 1.0 / invMass;
      t2 = this.frequencyHz;
    case 18:
      state = 0;
    case 19:
    case 20:
    case 21:
    case 22:
    case 23:
    case 24:
    case 25:
    case 26:
    case 27:
    case 28:
      if (state == 19 || state == 20 || state == 21 || state == 22 || state == 23 || state == 24 || state == 25 || state == 26 || state == 27 || state == 28 || (state == 0 && $.gtB(t2, 0.0))) {
        switch (state) {
          case 0:
            t3 = $.get$length(this);
          case 19:
            state = 0;
            var C = $.numTypeCheck($.sub(len, t3));
          case 20:
            state = 0;
            if (typeof t2 !== 'number') throw $.iae(t2);
            var omega = 6.283185307179586 * t2;
            t2 = this.mass;
          case 21:
            state = 0;
            if (typeof t2 !== 'number') throw $.iae(t2);
            t3 = 2.0 * t2;
            t4 = this.dampingRatio;
            if (typeof t4 !== 'number') throw $.iae(t4);
            var d = t3 * t4 * omega;
            var k = $.numTypeCheck($.mul($.mul(t2, omega), omega));
          case 22:
            state = 0;
            var t5 = step.get$dt();
          case 23:
            state = 0;
            var t6 = step.get$dt();
          case 24:
            state = 0;
            t6 = $.mul(t6, k);
            if (typeof t6 !== 'number') throw $.iae(t6);
            this.gamma = $.mul(t5, d + t6);
            t2 = this.gamma;
          case 25:
            state = 0;
            if (!$.eqB(t2, 0.0)) {
              t2 = this.gamma;
              if (typeof t2 !== 'number') throw $.iae(t2);
              t2 = 1.0 / t2;
            } else t2 = 0.0;
            this.gamma = t2;
            t2 = step.get$dt();
          case 26:
            state = 0;
            t3 = $.mul($.mul(C, t2), k);
            t4 = this.gamma;
          case 27:
            state = 0;
            this.bias = $.mul(t3, t4);
            t5 = this.gamma;
            if (typeof t5 !== 'number') throw $.iae(t5);
            this.mass = invMass + t5;
            t2 = this.mass;
          case 28:
            state = 0;
            if (!$.eqB(t2, 0.0)) {
              t2 = this.mass;
              if (typeof t2 !== 'number') throw $.iae(t2);
              t2 = 1.0 / t2;
            } else t2 = 0.0;
            this.mass = t2;
        }
      }
    case 29:
    case 30:
    case 31:
    case 32:
    case 33:
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
    case 47:
    case 48:
      if (state == 29 || state == 30 || state == 31 || state == 32 || state == 33 || state == 34 || state == 35 || state == 36 || state == 37 || state == 38 || state == 39 || state == 40 || state == 41 || state == 42 || state == 43 || state == 44 || state == 45 || state == 46 || state == 47 || state == 48 || (state == 0 && step.get$warmStarting() === true)) {
        switch (state) {
          case 0:
            t2 = this.impulse;
          case 29:
            state = 0;
            t3 = step.get$dtRatio();
          case 30:
            state = 0;
            this.impulse = $.mul(t2, t3);
            var P = $.Vector$(0, 0);
            P.setFrom$1(t1).mulLocal$1(this.impulse);
            t4 = b1.get$linearVelocity();
            t5 = t4.get$x();
          case 31:
            state = 0;
            t6 = b1.get$invMass();
          case 32:
            state = 0;
            var t7 = P.x;
          case 33:
            state = 0;
            t4.set$x($.sub(t5, $.mul(t6, t7)));
            t4 = b1.get$linearVelocity();
            var t8 = t4.get$y();
          case 34:
            state = 0;
            var t9 = b1.get$invMass();
          case 35:
            state = 0;
            var t10 = P.y;
          case 36:
            state = 0;
            t4.set$y($.sub(t8, $.mul(t9, t10)));
            t4 = b1.get$angularVelocity();
          case 37:
            state = 0;
            var t11 = b1.get$invInertia();
          case 38:
            state = 0;
            var t12 = $.Vector_crossVectors(r1, P);
          case 39:
            state = 0;
            b1.set$angularVelocity($.sub(t4, $.mul(t11, t12)));
            var t13 = b2.get$linearVelocity();
            var t14 = t13.get$x();
          case 40:
            state = 0;
            var t15 = b2.get$invMass();
          case 41:
            state = 0;
            var t16 = P.x;
          case 42:
            state = 0;
            t13.set$x($.add(t14, $.mul(t15, t16)));
            t13 = b2.get$linearVelocity();
            var t17 = t13.get$y();
          case 43:
            state = 0;
            var t18 = b2.get$invMass();
          case 44:
            state = 0;
            var t19 = P.y;
          case 45:
            state = 0;
            t13.set$y($.add(t17, $.mul(t18, t19)));
            t13 = b2.get$angularVelocity();
          case 46:
            state = 0;
            var t20 = b2.get$invInertia();
          case 47:
            state = 0;
            var t21 = $.Vector_crossVectors(r2, P);
          case 48:
            state = 0;
            b2.set$angularVelocity($.add(t13, $.mul(t20, t21)));
        }
      } else {
        this.impulse = 0.0;
      }
  }
 }
};

$$.DistanceJointDef = {"":
 ["dampingRatio?", "frequencyHz?", "length=", "localAnchorB?", "localAnchorA?", "collideConnected", "bodyB", "bodyA", "userData", "type"],
 super: "JointDef",
 initialize$4: function(b1, b2, anchor1, anchor2) {
  $.propertyTypeCheck(b1, 'is$Body');
  $.propertyTypeCheck(b2, 'is$Body');
  $.propertyTypeCheck(anchor1, 'is$Vector');
  $.propertyTypeCheck(anchor2, 'is$Vector');
  this.bodyA = b1;
  this.bodyB = b2;
  this.localAnchorA.setFrom$1(this.bodyA.getLocalPoint$1(anchor1));
  this.localAnchorB.setFrom$1(this.bodyB.getLocalPoint$1(anchor2));
  var d = $.Vector$copy(anchor2);
  d.subLocal$1(anchor1);
  $.set$length(this, $.get$length(d));
 },
 DistanceJointDef$0: function() {
  this.type = 3;
 },
 is$DistanceJointDef: true
};

$$.RevoluteJoint = {"":
 ["limitState", "upperAngle", "lowerAngle", "referenceAngle", "_enableLimit", "_motorSpeed", "_maxMotorTorque", "_enableMotor", "motorMass", "mass?", "_motorImpulse", "impulse", "localAnchor2", "localAnchor1", "invIB", "invMassB", "invIA", "invMassA", "localCenterB", "localCenterA", "userData", "collideConnected", "islandFlag", "bodyB", "bodyA", "edgeB", "edgeA", "_lib0_next", "_prev", "type"],
 super: "Joint",
 solvePositionConstraints$1: function(baumgarte) {
  $.numTypeCheck(baumgarte);
  var b1 = $.propertyTypeCheck(this.bodyA, 'is$Body');
  var b2 = $.propertyTypeCheck(this.bodyB, 'is$Body');
  if (this._enableLimit === true) {
    var t1 = this.limitState;
    if (t1 !== (t1 | 0)) return this.solvePositionConstraints$1$bailout(1, b2, b1, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var t2 = !(t1 === 0);
    t1 = t2;
  } else t1 = false;
  if (t1) {
    t1 = b2.get$sweep().get$angle();
    if (typeof t1 !== 'number') return this.solvePositionConstraints$1$bailout(2, b2, b1, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    t2 = b1.get$sweep().get$angle();
    if (typeof t2 !== 'number') return this.solvePositionConstraints$1$bailout(3, b2, t2, b1, t1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    t2 = t1 - t2;
    t1 = this.referenceAngle;
    if (typeof t1 !== 'number') throw $.iae(t1);
    var angle = t2 - t1;
    t1 = this.limitState;
    if (t1 !== (t1 | 0)) return this.solvePositionConstraints$1$bailout(5, angle, t1, b1, b2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    if (t1 === 3) {
      t1 = this.lowerAngle;
      if (typeof t1 !== 'number') throw $.iae(t1);
      var C = $.numTypeCheck($.MathBox_clamp(angle - t1, -0.13962634015954636, 0.13962634015954636));
      if (typeof C !== 'number') return this.solvePositionConstraints$1$bailout(6, C, b1, b2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      t2 = this.motorMass;
      if (typeof t2 !== 'number') return this.solvePositionConstraints$1$bailout(7, C, t2, b1, b2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      var limitImpulse = -t2 * C;
      var angularError = $.numTypeCheck($.abs(C));
    } else {
      if (t1 !== (t1 | 0)) return this.solvePositionConstraints$1$bailout(9, b2, t1, b1, angle, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      if (t1 === 1) {
        t1 = this.lowerAngle;
        if (typeof t1 !== 'number') throw $.iae(t1);
        C = angle - t1;
        angularError = -C;
        var C0 = $.numTypeCheck($.MathBox_clamp(C + 0.03490658503988659, -0.13962634015954636, 0.0));
        if (typeof C0 !== 'number') return this.solvePositionConstraints$1$bailout(11, angularError, C0, b1, b2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        t1 = this.motorMass;
        if (typeof t1 !== 'number') return this.solvePositionConstraints$1$bailout(12, angularError, C0, b1, t1, b2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        limitImpulse = -t1 * C0;
      } else {
        if (t1 !== (t1 | 0)) return this.solvePositionConstraints$1$bailout(14, t1, b2, b1, angle, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        if (t1 === 2) {
          t1 = this.upperAngle;
          if (typeof t1 !== 'number') throw $.iae(t1);
          C = angle - t1;
          C0 = $.numTypeCheck($.MathBox_clamp(C - 0.03490658503988659, 0.0, 0.13962634015954636));
          if (typeof C0 !== 'number') return this.solvePositionConstraints$1$bailout(16, C, b1, C0, b2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          t1 = this.motorMass;
          if (typeof t1 !== 'number') return this.solvePositionConstraints$1$bailout(17, C, t1, b1, C0, b2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
          limitImpulse = -t1 * C0;
          angularError = C;
        } else {
          limitImpulse = 0.0;
          angularError = 0.0;
        }
      }
    }
    t1 = b1.get$sweep();
    t2 = t1.get$angle();
    if (typeof t2 !== 'number') return this.solvePositionConstraints$1$bailout(19, angularError, t1, t2, b1, b2, limitImpulse, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var t3 = b1.get$invInertia();
    if (typeof t3 !== 'number') return this.solvePositionConstraints$1$bailout(20, angularError, t1, t2, t3, b1, b2, limitImpulse, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    t1.set$angle(t2 - t3 * limitImpulse);
    t1 = b2.get$sweep();
    var t4 = t1.get$angle();
    if (typeof t4 !== 'number') return this.solvePositionConstraints$1$bailout(21, angularError, b1, b2, t1, t4, limitImpulse, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var t5 = b2.get$invInertia();
    if (typeof t5 !== 'number') return this.solvePositionConstraints$1$bailout(22, angularError, b1, b2, t1, t4, t5, limitImpulse, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    t1.set$angle(t4 + t5 * limitImpulse);
    b1.synchronizeTransform$0();
    b2.synchronizeTransform$0();
  } else angularError = 0.0;
  var imp = $.Vector$(0, 0);
  var r1 = $.Vector$(0, 0);
  var r2 = $.Vector$(0, 0);
  C = $.Vector$(0, 0);
  r1.setFrom$1(this.localAnchor1).subLocal$1(b1.get$localCenter());
  r2.setFrom$1(this.localAnchor2).subLocal$1(b2.get$localCenter());
  $.Matrix22_mulMatrixAndVectorToOut(b1.get$originTransform().get$rotation(), r1, r1);
  $.Matrix22_mulMatrixAndVectorToOut(b2.get$originTransform().get$rotation(), r2, r2);
  C.setFrom$1(b2.get$sweep().get$center()).addLocal$1(r2);
  C.subLocal$1(b1.get$sweep().get$center()).subLocal$1(r1);
  var positionError = $.numTypeCheck($.get$length(C));
  var invMass1 = $.numTypeCheck(b1.get$invMass());
  if (typeof invMass1 !== 'number') return this.solvePositionConstraints$1$bailout(23, C, b1, angularError, imp, b2, r1, positionError, r2, invMass1, 0, 0, 0, 0, 0, 0, 0);
  var invMass2 = $.numTypeCheck(b2.get$invMass());
  if (typeof invMass2 !== 'number') return this.solvePositionConstraints$1$bailout(24, C, invMass2, b1, angularError, b2, imp, r1, positionError, r2, invMass1, 0, 0, 0, 0, 0, 0);
  var invI1 = $.numTypeCheck(b1.get$invInertia());
  if (typeof invI1 !== 'number') return this.solvePositionConstraints$1$bailout(25, C, invMass2, invI1, b1, angularError, b2, imp, r1, positionError, r2, invMass1, 0, 0, 0, 0, 0);
  var invI2 = $.numTypeCheck(b2.get$invInertia());
  if (typeof invI2 !== 'number') return this.solvePositionConstraints$1$bailout(26, C, invMass2, invI1, invI2, b1, b2, angularError, imp, r1, positionError, r2, invMass1, 0, 0, 0, 0);
  t1 = C.get$lengthSquared();
  if (typeof t1 !== 'number') return this.solvePositionConstraints$1$bailout(27, C, invMass2, invI1, invI2, b1, b2, t1, angularError, imp, r1, positionError, r2, invMass1, 0, 0, 0);
  if (t1 > 0.0025000000000000005) {
    var u = $.Vector$(0, 0);
    var m = invMass1 + invMass2;
    if (m > 0.0) m = 1.0 / m;
    imp.setFrom$1(C).negateLocal$0().mulLocal$1(m);
    u.setFrom$1(imp).mulLocal$1(0.5 * invMass1);
    b1.get$sweep().get$center().subLocal$1(u);
    u.setFrom$1(imp).mulLocal$1(0.5 * invMass2);
    b2.get$sweep().get$center().addLocal$1(u);
    C.setFrom$1(b2.get$sweep().get$center()).addLocal$1(r2);
    C.subLocal$1(b1.get$sweep().get$center()).subLocal$1(r1);
  }
  var K1 = $.Matrix22$(null, null);
  t1 = invMass1 + invMass2;
  t2 = K1.col1;
  t2.set$x(t1);
  t3 = K1.col2;
  t3.set$x(0.0);
  t2.set$y(0.0);
  t3.set$y(t1);
  var K2 = $.Matrix22$(null, null);
  t1 = r1.y;
  if (typeof t1 !== 'number') return this.solvePositionConstraints$1$bailout(28, C, invI1, K1, invI2, b1, b2, K2, angularError, imp, r1, positionError, r2, t1, 0, 0, 0);
  t3 = invI1 * t1;
  if (typeof t1 !== 'number') return this.solvePositionConstraints$1$bailout(29, C, t1, invI1, K1, invI2, b1, b2, K2, angularError, t3, imp, r1, positionError, r2, 0, 0);
  t1 *= t3;
  t3 = K2.col1;
  t3.set$x(t1);
  t1 = -invI1;
  t2 = r1.x;
  if (typeof t2 !== 'number') return this.solvePositionConstraints$1$bailout(30, C, t3, invI1, K1, invI2, b1, b2, t2, K2, angularError, imp, r1, positionError, r2, t1, 0);
  t2 *= t1;
  t4 = r1.y;
  if (typeof t4 !== 'number') return this.solvePositionConstraints$1$bailout(31, C, t3, invI1, K1, invI2, b1, t2, b2, t4, K2, angularError, imp, r1, positionError, r2, 0);
  t4 *= t2;
  t2 = K2.col2;
  t2.set$x(t4);
  t4 = r1.x;
  if (typeof t4 !== 'number') return this.solvePositionConstraints$1$bailout(32, C, t3, invI1, K1, invI2, b1, t4, b2, t1, t2, K2, angularError, imp, r1, positionError, r2);
  t4 *= t1;
  t1 = r1.y;
  if (typeof t1 !== 'number') return this.solvePositionConstraints$1$bailout(33, C, t3, invI1, K1, invI2, b1, t1, b2, t2, t4, K2, angularError, imp, r1, positionError, r2);
  t3.set$y(t4 * t1);
  t3 = r1.x;
  if (typeof t3 !== 'number') return this.solvePositionConstraints$1$bailout(34, C, invI1, K1, invI2, b1, b2, t3, t2, K2, angularError, imp, r1, positionError, r2, 0, 0);
  t5 = invI1 * t3;
  if (typeof t3 !== 'number') return this.solvePositionConstraints$1$bailout(35, C, K1, invI2, b1, b2, t3, t2, K2, t5, angularError, imp, r1, positionError, r2, 0, 0);
  t2.set$y(t5 * t3);
  var K3 = $.Matrix22$(null, null);
  t2 = r2.y;
  if (typeof t2 !== 'number') return this.solvePositionConstraints$1$bailout(36, C, K1, invI2, b1, b2, t2, K2, angularError, imp, K3, r1, positionError, r2, 0, 0, 0);
  var t6 = invI2 * t2;
  if (typeof t2 !== 'number') return this.solvePositionConstraints$1$bailout(37, C, K1, invI2, b1, b2, t2, K2, angularError, imp, K3, r1, positionError, r2, t6, 0, 0);
  t2 *= t6;
  t6 = K3.col1;
  t6.set$x(t2);
  t2 = -invI2;
  var t7 = r2.x;
  if (typeof t7 !== 'number') return this.solvePositionConstraints$1$bailout(38, C, K1, invI2, b1, b2, t2, t6, t7, K2, angularError, imp, K3, r1, positionError, r2, 0);
  t7 *= t2;
  var t8 = r2.y;
  if (typeof t8 !== 'number') return this.solvePositionConstraints$1$bailout(39, C, K1, invI2, b1, b2, t7, t6, t8, K2, angularError, imp, K3, r1, positionError, r2, 0);
  t8 *= t7;
  t7 = K3.col2;
  t7.set$x(t8);
  t8 = r2.x;
  if (typeof t8 !== 'number') return this.solvePositionConstraints$1$bailout(40, C, K1, invI2, b1, b2, t6, t2, t7, t8, K2, angularError, imp, K3, r1, positionError, r2);
  t8 *= t2;
  t2 = r2.y;
  if (typeof t2 !== 'number') return this.solvePositionConstraints$1$bailout(41, C, K1, invI2, b1, b2, t6, t7, t8, K2, t2, angularError, imp, K3, r1, positionError, r2);
  t6.set$y(t8 * t2);
  t6 = r2.x;
  if (typeof t6 !== 'number') return this.solvePositionConstraints$1$bailout(42, C, K1, invI2, b1, b2, t7, K2, t6, angularError, imp, K3, r1, positionError, r2, 0, 0);
  var t9 = invI2 * t6;
  if (typeof t6 !== 'number') return this.solvePositionConstraints$1$bailout(43, C, K1, b1, b2, t7, K2, angularError, t6, imp, K3, r1, positionError, r2, t9, 0, 0);
  t7.set$y(t9 * t6);
  K1.addLocal$1(K2).addLocal$1(K3);
  K1.solveToOut$2(C.negateLocal$0(), imp);
  C.setFrom$1(imp).mulLocal$1(b1.get$invMass());
  b1.get$sweep().get$center().subLocal$1(C);
  t7 = b1.get$sweep();
  var t10 = t7.get$angle();
  if (typeof t10 !== 'number') return this.solvePositionConstraints$1$bailout(44, C, b1, angularError, b2, imp, t7, t10, r1, positionError, r2, 0, 0, 0, 0, 0, 0);
  var t11 = b1.get$invInertia();
  if (typeof t11 !== 'number') return this.solvePositionConstraints$1$bailout(45, C, b1, angularError, b2, imp, t7, t10, t11, positionError, r1, r2, 0, 0, 0, 0, 0);
  var t12 = $.Vector_crossVectors(r1, imp);
  if (typeof t12 !== 'number') return this.solvePositionConstraints$1$bailout(46, C, b1, angularError, b2, imp, t7, t10, t11, positionError, t12, r2, 0, 0, 0, 0, 0);
  t7.set$angle(t10 - t11 * t12);
  C.setFrom$1(imp).mulLocal$1(b2.get$invMass());
  b2.get$sweep().get$center().addLocal$1(C);
  t7 = b2.get$sweep();
  var t13 = t7.get$angle();
  if (typeof t13 !== 'number') return this.solvePositionConstraints$1$bailout(47, angularError, b1, imp, b2, t7, t13, positionError, r2, 0, 0, 0, 0, 0, 0, 0, 0);
  var t14 = b2.get$invInertia();
  if (typeof t14 !== 'number') return this.solvePositionConstraints$1$bailout(48, angularError, b1, imp, b2, t7, t13, t14, positionError, r2, 0, 0, 0, 0, 0, 0, 0);
  var t15 = $.Vector_crossVectors(r2, imp);
  if (typeof t15 !== 'number') return this.solvePositionConstraints$1$bailout(49, angularError, b1, b2, t7, t13, t14, positionError, t15, 0, 0, 0, 0, 0, 0, 0, 0);
  t7.set$angle(t13 + t14 * t15);
  b1.synchronizeTransform$0();
  b2.synchronizeTransform$0();
  return $.leB(positionError, 0.005) && $.leB(angularError, 0.03490658503988659);
 },
 solvePositionConstraints$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13, env14, env15) {
  switch (state) {
    case 1:
      b2 = env0;
      b1 = env1;
      t1 = env2;
      break;
    case 2:
      b2 = env0;
      b1 = env1;
      t1 = env2;
      break;
    case 3:
      b2 = env0;
      t2 = env1;
      b1 = env2;
      t1 = env3;
      break;
    case 4:
      b2 = env0;
      b1 = env1;
      angle = env2;
      break;
    case 5:
      angle = env0;
      t1 = env1;
      b1 = env2;
      b2 = env3;
      break;
    case 6:
      C = env0;
      b1 = env1;
      b2 = env2;
      break;
    case 7:
      C = env0;
      t1 = env1;
      b1 = env2;
      b2 = env3;
      break;
    case 8:
      limitImpulse = env0;
      C = env1;
      b1 = env2;
      b2 = env3;
      break;
    case 9:
      b2 = env0;
      t1 = env1;
      b1 = env2;
      angle = env3;
      break;
    case 10:
      b1 = env0;
      C = env1;
      b2 = env2;
      break;
    case 11:
      angularError = env0;
      C0 = env1;
      b1 = env2;
      b2 = env3;
      break;
    case 12:
      angularError = env0;
      C0 = env1;
      b1 = env2;
      t1 = env3;
      b2 = env4;
      break;
    case 13:
      angularError = env0;
      b1 = env1;
      limitImpulse = env2;
      b2 = env3;
      break;
    case 14:
      t1 = env0;
      b2 = env1;
      b1 = env2;
      angle = env3;
      break;
    case 15:
      C = env0;
      b1 = env1;
      b2 = env2;
      break;
    case 16:
      C = env0;
      b1 = env1;
      C0 = env2;
      b2 = env3;
      break;
    case 17:
      C = env0;
      t1 = env1;
      b1 = env2;
      C0 = env3;
      b2 = env4;
      break;
    case 18:
      C = env0;
      limitImpulse = env1;
      b1 = env2;
      b2 = env3;
      break;
    case 19:
      angularError = env0;
      t1 = env1;
      t2 = env2;
      b1 = env3;
      b2 = env4;
      limitImpulse = env5;
      break;
    case 20:
      angularError = env0;
      t1 = env1;
      t2 = env2;
      t3 = env3;
      b1 = env4;
      b2 = env5;
      limitImpulse = env6;
      break;
    case 21:
      angularError = env0;
      b1 = env1;
      b2 = env2;
      t1 = env3;
      t4 = env4;
      limitImpulse = env5;
      break;
    case 22:
      angularError = env0;
      b1 = env1;
      b2 = env2;
      t1 = env3;
      t4 = env4;
      t5 = env5;
      limitImpulse = env6;
      break;
    case 23:
      C = env0;
      b1 = env1;
      angularError = env2;
      imp = env3;
      b2 = env4;
      r1 = env5;
      positionError = env6;
      r2 = env7;
      invMass1 = env8;
      break;
    case 24:
      C = env0;
      invMass2 = env1;
      b1 = env2;
      angularError = env3;
      b2 = env4;
      imp = env5;
      r1 = env6;
      positionError = env7;
      r2 = env8;
      invMass1 = env9;
      break;
    case 25:
      C = env0;
      invMass2 = env1;
      invI1 = env2;
      b1 = env3;
      angularError = env4;
      b2 = env5;
      imp = env6;
      r1 = env7;
      positionError = env8;
      r2 = env9;
      invMass1 = env10;
      break;
    case 26:
      C = env0;
      invMass2 = env1;
      invI1 = env2;
      invI2 = env3;
      b1 = env4;
      b2 = env5;
      angularError = env6;
      imp = env7;
      r1 = env8;
      positionError = env9;
      r2 = env10;
      invMass1 = env11;
      break;
    case 27:
      C = env0;
      invMass2 = env1;
      invI1 = env2;
      invI2 = env3;
      b1 = env4;
      b2 = env5;
      t1 = env6;
      angularError = env7;
      imp = env8;
      r1 = env9;
      positionError = env10;
      r2 = env11;
      invMass1 = env12;
      break;
    case 28:
      C = env0;
      invI1 = env1;
      K1 = env2;
      invI2 = env3;
      b1 = env4;
      b2 = env5;
      K2 = env6;
      angularError = env7;
      imp = env8;
      r1 = env9;
      positionError = env10;
      r2 = env11;
      t1 = env12;
      break;
    case 29:
      C = env0;
      t2 = env1;
      invI1 = env2;
      K1 = env3;
      invI2 = env4;
      b1 = env5;
      b2 = env6;
      K2 = env7;
      angularError = env8;
      t1 = env9;
      imp = env10;
      r1 = env11;
      positionError = env12;
      r2 = env13;
      break;
    case 30:
      C = env0;
      t1 = env1;
      invI1 = env2;
      K1 = env3;
      invI2 = env4;
      b1 = env5;
      b2 = env6;
      t3 = env7;
      K2 = env8;
      angularError = env9;
      imp = env10;
      r1 = env11;
      positionError = env12;
      r2 = env13;
      t2 = env14;
      break;
    case 31:
      C = env0;
      t1 = env1;
      invI1 = env2;
      K1 = env3;
      invI2 = env4;
      b1 = env5;
      t3 = env6;
      b2 = env7;
      t2 = env8;
      K2 = env9;
      angularError = env10;
      imp = env11;
      r1 = env12;
      positionError = env13;
      r2 = env14;
      break;
    case 32:
      C = env0;
      t1 = env1;
      invI1 = env2;
      K1 = env3;
      invI2 = env4;
      b1 = env5;
      t4 = env6;
      b2 = env7;
      t2 = env8;
      t3 = env9;
      K2 = env10;
      angularError = env11;
      imp = env12;
      r1 = env13;
      positionError = env14;
      r2 = env15;
      break;
    case 33:
      C = env0;
      t1 = env1;
      invI1 = env2;
      K1 = env3;
      invI2 = env4;
      b1 = env5;
      t2 = env6;
      b2 = env7;
      t3 = env8;
      t4 = env9;
      K2 = env10;
      angularError = env11;
      imp = env12;
      r1 = env13;
      positionError = env14;
      r2 = env15;
      break;
    case 34:
      C = env0;
      invI1 = env1;
      K1 = env2;
      invI2 = env3;
      b1 = env4;
      b2 = env5;
      t1 = env6;
      t3 = env7;
      K2 = env8;
      angularError = env9;
      imp = env10;
      r1 = env11;
      positionError = env12;
      r2 = env13;
      break;
    case 35:
      C = env0;
      K1 = env1;
      invI2 = env2;
      b1 = env3;
      b2 = env4;
      t5 = env5;
      t3 = env6;
      K2 = env7;
      t1 = env8;
      angularError = env9;
      imp = env10;
      r1 = env11;
      positionError = env12;
      r2 = env13;
      break;
    case 36:
      C = env0;
      K1 = env1;
      invI2 = env2;
      b1 = env3;
      b2 = env4;
      t3 = env5;
      K2 = env6;
      angularError = env7;
      imp = env8;
      K3 = env9;
      r1 = env10;
      positionError = env11;
      r2 = env12;
      break;
    case 37:
      C = env0;
      K1 = env1;
      invI2 = env2;
      b1 = env3;
      b2 = env4;
      t6 = env5;
      K2 = env6;
      angularError = env7;
      imp = env8;
      K3 = env9;
      r1 = env10;
      positionError = env11;
      r2 = env12;
      t3 = env13;
      break;
    case 38:
      C = env0;
      K1 = env1;
      invI2 = env2;
      b1 = env3;
      b2 = env4;
      t6 = env5;
      t3 = env6;
      t7 = env7;
      K2 = env8;
      angularError = env9;
      imp = env10;
      K3 = env11;
      r1 = env12;
      positionError = env13;
      r2 = env14;
      break;
    case 39:
      C = env0;
      K1 = env1;
      invI2 = env2;
      b1 = env3;
      b2 = env4;
      t7 = env5;
      t3 = env6;
      t6 = env7;
      K2 = env8;
      angularError = env9;
      imp = env10;
      K3 = env11;
      r1 = env12;
      positionError = env13;
      r2 = env14;
      break;
    case 40:
      C = env0;
      K1 = env1;
      invI2 = env2;
      b1 = env3;
      b2 = env4;
      t3 = env5;
      t6 = env6;
      t7 = env7;
      t8 = env8;
      K2 = env9;
      angularError = env10;
      imp = env11;
      K3 = env12;
      r1 = env13;
      positionError = env14;
      r2 = env15;
      break;
    case 41:
      C = env0;
      K1 = env1;
      invI2 = env2;
      b1 = env3;
      b2 = env4;
      t3 = env5;
      t7 = env6;
      t8 = env7;
      K2 = env8;
      t6 = env9;
      angularError = env10;
      imp = env11;
      K3 = env12;
      r1 = env13;
      positionError = env14;
      r2 = env15;
      break;
    case 42:
      C = env0;
      K1 = env1;
      invI2 = env2;
      b1 = env3;
      b2 = env4;
      t7 = env5;
      K2 = env6;
      t3 = env7;
      angularError = env8;
      imp = env9;
      K3 = env10;
      r1 = env11;
      positionError = env12;
      r2 = env13;
      break;
    case 43:
      C = env0;
      K1 = env1;
      b1 = env2;
      b2 = env3;
      t7 = env4;
      K2 = env5;
      angularError = env6;
      t9 = env7;
      imp = env8;
      K3 = env9;
      r1 = env10;
      positionError = env11;
      r2 = env12;
      t3 = env13;
      break;
    case 44:
      C = env0;
      b1 = env1;
      angularError = env2;
      b2 = env3;
      imp = env4;
      t7 = env5;
      t10 = env6;
      r1 = env7;
      positionError = env8;
      r2 = env9;
      break;
    case 45:
      C = env0;
      b1 = env1;
      angularError = env2;
      b2 = env3;
      imp = env4;
      t7 = env5;
      t10 = env6;
      t11 = env7;
      positionError = env8;
      r1 = env9;
      r2 = env10;
      break;
    case 46:
      C = env0;
      b1 = env1;
      angularError = env2;
      b2 = env3;
      imp = env4;
      t7 = env5;
      t10 = env6;
      t11 = env7;
      positionError = env8;
      t12 = env9;
      r2 = env10;
      break;
    case 47:
      angularError = env0;
      b1 = env1;
      imp = env2;
      b2 = env3;
      t7 = env4;
      t13 = env5;
      positionError = env6;
      r2 = env7;
      break;
    case 48:
      angularError = env0;
      b1 = env1;
      imp = env2;
      b2 = env3;
      t7 = env4;
      t13 = env5;
      t14 = env6;
      positionError = env7;
      r2 = env8;
      break;
    case 49:
      angularError = env0;
      b1 = env1;
      b2 = env2;
      t7 = env3;
      t13 = env4;
      t14 = env5;
      positionError = env6;
      t15 = env7;
      break;
  }
  switch (state) {
    case 0:
      $.numTypeCheck(baumgarte);
      var b1 = $.propertyTypeCheck(this.bodyA, 'is$Body');
      var b2 = $.propertyTypeCheck(this.bodyB, 'is$Body');
    case 1:
      if (state == 1 || (state == 0 && this._enableLimit === true)) {
        switch (state) {
          case 0:
            var t1 = this.limitState;
          case 1:
            state = 0;
            var t2 = !$.eqB(t1, 0);
            t1 = t2;
        }
      } else {
        t1 = false;
      }
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
    case 19:
    case 20:
    case 21:
    case 22:
      if (state == 2 || state == 3 || state == 4 || state == 5 || state == 6 || state == 7 || state == 8 || state == 9 || state == 10 || state == 11 || state == 12 || state == 13 || state == 14 || state == 15 || state == 16 || state == 17 || state == 18 || state == 19 || state == 20 || state == 21 || state == 22 || (state == 0 && t1)) {
        switch (state) {
          case 0:
            t1 = b2.get$sweep().get$angle();
          case 2:
            state = 0;
            t2 = b1.get$sweep().get$angle();
          case 3:
            state = 0;
            var angle = $.numTypeCheck($.sub($.sub(t1, t2), this.referenceAngle));
          case 4:
            state = 0;
            t1 = this.limitState;
          case 5:
            state = 0;
          case 6:
          case 7:
          case 8:
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
          case 16:
          case 17:
          case 18:
            if (state == 6 || state == 7 || state == 8 || (state == 0 && $.eqB(t1, 3))) {
              switch (state) {
                case 0:
                  var C = $.numTypeCheck($.MathBox_clamp($.sub(angle, this.lowerAngle), -0.13962634015954636, 0.13962634015954636));
                case 6:
                  state = 0;
                  t1 = this.motorMass;
                case 7:
                  state = 0;
                  var limitImpulse = $.numTypeCheck($.mul($.neg(t1), C));
                case 8:
                  state = 0;
                  var angularError = $.numTypeCheck($.abs(C));
              }
            } else {
              switch (state) {
                case 0:
                  t1 = this.limitState;
                case 9:
                  state = 0;
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                case 18:
                  if (state == 10 || state == 11 || state == 12 || state == 13 || (state == 0 && $.eqB(t1, 1))) {
                    switch (state) {
                      case 0:
                        C = $.numTypeCheck($.sub(angle, this.lowerAngle));
                      case 10:
                        state = 0;
                        angularError = $.numTypeCheck($.neg(C));
                        var C0 = $.numTypeCheck($.MathBox_clamp($.add(C, 0.03490658503988659), -0.13962634015954636, 0.0));
                      case 11:
                        state = 0;
                        t1 = this.motorMass;
                      case 12:
                        state = 0;
                        limitImpulse = $.numTypeCheck($.mul($.neg(t1), C0));
                      case 13:
                        state = 0;
                    }
                  } else {
                    switch (state) {
                      case 0:
                        t1 = this.limitState;
                      case 14:
                        state = 0;
                      case 15:
                      case 16:
                      case 17:
                      case 18:
                        if (state == 15 || state == 16 || state == 17 || state == 18 || (state == 0 && $.eqB(t1, 2))) {
                          switch (state) {
                            case 0:
                              C = $.numTypeCheck($.sub(angle, this.upperAngle));
                            case 15:
                              state = 0;
                              C0 = $.numTypeCheck($.MathBox_clamp($.sub(C, 0.03490658503988659), 0.0, 0.13962634015954636));
                            case 16:
                              state = 0;
                              t1 = this.motorMass;
                            case 17:
                              state = 0;
                              limitImpulse = $.numTypeCheck($.mul($.neg(t1), C0));
                            case 18:
                              state = 0;
                              angularError = C;
                          }
                        } else {
                          limitImpulse = 0.0;
                          angularError = 0.0;
                        }
                    }
                  }
              }
            }
            t1 = b1.get$sweep();
            t2 = t1.get$angle();
          case 19:
            state = 0;
            var t3 = b1.get$invInertia();
          case 20:
            state = 0;
            t1.set$angle($.sub(t2, $.mul(t3, limitImpulse)));
            t1 = b2.get$sweep();
            var t4 = t1.get$angle();
          case 21:
            state = 0;
            var t5 = b2.get$invInertia();
          case 22:
            state = 0;
            t1.set$angle($.add(t4, $.mul(t5, limitImpulse)));
            b1.synchronizeTransform$0();
            b2.synchronizeTransform$0();
        }
      } else {
        angularError = 0.0;
      }
      var imp = $.Vector$(0, 0);
      var r1 = $.Vector$(0, 0);
      var r2 = $.Vector$(0, 0);
      C = $.Vector$(0, 0);
      r1.setFrom$1(this.localAnchor1).subLocal$1(b1.get$localCenter());
      r2.setFrom$1(this.localAnchor2).subLocal$1(b2.get$localCenter());
      $.Matrix22_mulMatrixAndVectorToOut(b1.get$originTransform().get$rotation(), r1, r1);
      $.Matrix22_mulMatrixAndVectorToOut(b2.get$originTransform().get$rotation(), r2, r2);
      C.setFrom$1(b2.get$sweep().get$center()).addLocal$1(r2);
      C.subLocal$1(b1.get$sweep().get$center()).subLocal$1(r1);
      var positionError = $.numTypeCheck($.get$length(C));
      var invMass1 = $.numTypeCheck(b1.get$invMass());
    case 23:
      state = 0;
      var invMass2 = $.numTypeCheck(b2.get$invMass());
    case 24:
      state = 0;
      var invI1 = $.numTypeCheck(b1.get$invInertia());
    case 25:
      state = 0;
      var invI2 = $.numTypeCheck(b2.get$invInertia());
    case 26:
      state = 0;
      t1 = C.get$lengthSquared();
    case 27:
      state = 0;
      if ($.gtB(t1, 0.0025000000000000005)) {
        var u = $.Vector$(0, 0);
        var m = $.numTypeCheck($.add(invMass1, invMass2));
        if ($.gtB(m, 0.0)) {
          if (typeof m !== 'number') throw $.iae(m);
          m = 1.0 / m;
        }
        imp.setFrom$1(C).negateLocal$0().mulLocal$1(m);
        t1 = u.setFrom$1(imp);
        if (typeof invMass1 !== 'number') throw $.iae(invMass1);
        t1.mulLocal$1(0.5 * invMass1);
        b1.get$sweep().get$center().subLocal$1(u);
        t1 = u.setFrom$1(imp);
        if (typeof invMass2 !== 'number') throw $.iae(invMass2);
        t1.mulLocal$1(0.5 * invMass2);
        b2.get$sweep().get$center().addLocal$1(u);
        C.setFrom$1(b2.get$sweep().get$center()).addLocal$1(r2);
        C.subLocal$1(b1.get$sweep().get$center()).subLocal$1(r1);
      }
      var K1 = $.Matrix22$(null, null);
      t1 = $.add(invMass1, invMass2);
      t2 = K1.col1;
      t2.set$x(t1);
      t1 = K1.col2;
      t1.set$x(0.0);
      t2.set$y(0.0);
      t1.set$y($.add(invMass1, invMass2));
      var K2 = $.Matrix22$(null, null);
      t1 = r1.y;
    case 28:
      state = 0;
      t1 = $.mul(invI1, t1);
      t2 = r1.y;
    case 29:
      state = 0;
      t2 = $.mul(t1, t2);
      t1 = K2.col1;
      t1.set$x(t2);
      t2 = $.neg(invI1);
      t3 = r1.x;
    case 30:
      state = 0;
      t3 = $.mul(t2, t3);
      t2 = r1.y;
    case 31:
      state = 0;
      t2 = $.mul(t3, t2);
      t3 = K2.col2;
      t3.set$x(t2);
      t2 = $.neg(invI1);
      t4 = r1.x;
    case 32:
      state = 0;
      t4 = $.mul(t2, t4);
      t2 = r1.y;
    case 33:
      state = 0;
      t1.set$y($.mul(t4, t2));
      t1 = r1.x;
    case 34:
      state = 0;
      t1 = $.mul(invI1, t1);
      t5 = r1.x;
    case 35:
      state = 0;
      t3.set$y($.mul(t1, t5));
      var K3 = $.Matrix22$(null, null);
      t3 = r2.y;
    case 36:
      state = 0;
      t3 = $.mul(invI2, t3);
      var t6 = r2.y;
    case 37:
      state = 0;
      t6 = $.mul(t3, t6);
      t3 = K3.col1;
      t3.set$x(t6);
      t6 = $.neg(invI2);
      var t7 = r2.x;
    case 38:
      state = 0;
      t7 = $.mul(t6, t7);
      t6 = r2.y;
    case 39:
      state = 0;
      t6 = $.mul(t7, t6);
      t7 = K3.col2;
      t7.set$x(t6);
      t6 = $.neg(invI2);
      var t8 = r2.x;
    case 40:
      state = 0;
      t8 = $.mul(t6, t8);
      t6 = r2.y;
    case 41:
      state = 0;
      t3.set$y($.mul(t8, t6));
      t3 = r2.x;
    case 42:
      state = 0;
      t3 = $.mul(invI2, t3);
      var t9 = r2.x;
    case 43:
      state = 0;
      t7.set$y($.mul(t3, t9));
      K1.addLocal$1(K2).addLocal$1(K3);
      K1.solveToOut$2(C.negateLocal$0(), imp);
      C.setFrom$1(imp).mulLocal$1(b1.get$invMass());
      b1.get$sweep().get$center().subLocal$1(C);
      t7 = b1.get$sweep();
      var t10 = t7.get$angle();
    case 44:
      state = 0;
      var t11 = b1.get$invInertia();
    case 45:
      state = 0;
      var t12 = $.Vector_crossVectors(r1, imp);
    case 46:
      state = 0;
      t7.set$angle($.sub(t10, $.mul(t11, t12)));
      C.setFrom$1(imp).mulLocal$1(b2.get$invMass());
      b2.get$sweep().get$center().addLocal$1(C);
      t7 = b2.get$sweep();
      var t13 = t7.get$angle();
    case 47:
      state = 0;
      var t14 = b2.get$invInertia();
    case 48:
      state = 0;
      var t15 = $.Vector_crossVectors(r2, imp);
    case 49:
      state = 0;
      t7.set$angle($.add(t13, $.mul(t14, t15)));
      b1.synchronizeTransform$0();
      b2.synchronizeTransform$0();
      return $.leB(positionError, 0.005) && $.leB(angularError, 0.03490658503988659);
  }
 },
 solveVelocityConstraints$1: function(step) {
  $.propertyTypeCheck(step, 'is$TimeStep');
  var b1 = $.propertyTypeCheck(this.bodyA, 'is$Body');
  var b2 = $.propertyTypeCheck(this.bodyB, 'is$Body');
  var v1 = $.propertyTypeCheck(b1.get$linearVelocity(), 'is$Vector');
  var w1 = $.numTypeCheck(b1.get$angularVelocity());
  var v2 = $.propertyTypeCheck(b2.get$linearVelocity(), 'is$Vector');
  var w2 = $.numTypeCheck(b2.get$angularVelocity());
  var m1 = $.numTypeCheck(b1.get$invMass());
  var m2 = $.numTypeCheck(b2.get$invMass());
  var i1 = $.numTypeCheck(b1.get$invInertia());
  var i2 = $.numTypeCheck(b2.get$invInertia());
  if (this._enableMotor === true && !$.eqB(this.limitState, 3)) {
    var Cdot = $.numTypeCheck($.sub($.sub(w2, w1), this._motorSpeed));
    var imp = $.numTypeCheck($.mul(this.motorMass, $.neg(Cdot)));
    var oldImpulse = $.numTypeCheck(this._motorImpulse);
    var maxImpulse = $.numTypeCheck($.mul(step.get$dt(), this._maxMotorTorque));
    var t1 = this._motorImpulse;
    if (typeof imp !== 'number') throw $.iae(imp);
    this._motorImpulse = $.MathBox_clamp(t1 + imp, $.neg(maxImpulse), maxImpulse);
    var t2 = this._motorImpulse;
    if (typeof oldImpulse !== 'number') throw $.iae(oldImpulse);
    var imp0 = $.numTypeCheck(t2 - oldImpulse);
    w1 = $.numTypeCheck($.sub(w1, $.mul(i1, imp0)));
    w2 = $.numTypeCheck($.add(w2, $.mul(i2, imp0)));
  }
  var temp = $.Vector$(0, 0);
  var r1 = $.Vector$(0, 0);
  var r2 = $.Vector$(0, 0);
  t1 = this._enableLimit === true && !$.eqB(this.limitState, 0);
  t2 = this.localAnchor1;
  var t3 = this.localAnchor2;
  var t4 = this.mass;
  if (t1) {
    r1.setFrom$1(t2).subLocal$1(b1.get$localCenter());
    r2.setFrom$1(t3).subLocal$1(b2.get$localCenter());
    $.Matrix22_mulMatrixAndVectorToOut(b1.get$originTransform().get$rotation(), r1, r1);
    $.Matrix22_mulMatrixAndVectorToOut(b2.get$originTransform().get$rotation(), r2, r2);
    var Cdot1 = $.Vector$(0, 0);
    Cdot = $.Vector3$(0, 0, 0);
    $.Vector_crossNumAndVectorToOut(w1, r1, temp);
    $.Vector_crossNumAndVectorToOut(w2, r2, Cdot1);
    Cdot1.addLocal$1(v2).subLocal$1(v1).subLocal$1(temp);
    var Cdot2 = $.numTypeCheck($.sub(w2, w1));
    Cdot.setCoords$3(Cdot1.x, Cdot1.y, Cdot2);
    imp = $.Vector3$(0, 0, 0);
    t4.solve33ToOut$2(Cdot.negateLocal$0(), imp);
    if ($.eqB(this.limitState, 3)) this.impulse.addLocal$1(imp);
    else {
      if ($.eqB(this.limitState, 1)) {
        t1 = this.impulse;
        if ($.ltB($.numTypeCheck($.add(t1.get$z(), imp.z)), 0.0)) {
          t4.solve22ToOut$2(Cdot1.negateLocal$0(), temp);
          imp.x = temp.x;
          imp.y = temp.y;
          imp.z = $.neg(t1.get$z());
          t1.set$x($.add(t1.get$x(), temp.x));
          t1.set$y($.add(t1.get$y(), temp.y));
          t1.set$z(0.0);
        }
      } else {
        if ($.eqB(this.limitState, 2)) {
          t1 = this.impulse;
          if ($.gtB($.numTypeCheck($.add(t1.get$z(), imp.z)), 0.0)) {
            t4.solve22ToOut$2(Cdot1.negateLocal$0(), temp);
            imp.x = temp.x;
            imp.y = temp.y;
            imp.z = $.neg(t1.get$z());
            t1.set$x($.add(t1.get$x(), temp.x));
            t1.set$y($.add(t1.get$y(), temp.y));
            t1.set$z(0.0);
          }
        }
      }
    }
    var P = $.Vector$(0, 0);
    P.setCoords$2(imp.x, imp.y);
    temp.setFrom$1(P).mulLocal$1(m1);
    v1.subLocal$1(temp);
    w1 = $.numTypeCheck($.sub(w1, $.mul(i1, $.add($.Vector_crossVectors(r1, P), imp.z))));
    temp.setFrom$1(P).mulLocal$1(m2);
    v2.addLocal$1(temp);
    w2 = $.numTypeCheck($.add(w2, $.mul(i2, $.add($.Vector_crossVectors(r2, P), imp.z))));
  } else {
    r1.setFrom$1(t2).subLocal$1(b1.get$localCenter());
    r2.setFrom$1(t3).subLocal$1(b2.get$localCenter());
    $.Matrix22_mulMatrixAndVectorToOut(b1.get$originTransform().get$rotation(), r1, r1);
    $.Matrix22_mulMatrixAndVectorToOut(b2.get$originTransform().get$rotation(), r2, r2);
    Cdot = $.Vector$(0, 0);
    imp = $.Vector$(0, 0);
    $.Vector_crossNumAndVectorToOut(w1, r1, temp);
    $.Vector_crossNumAndVectorToOut(w2, r2, Cdot);
    Cdot.addLocal$1(v2).subLocal$1(v1).subLocal$1(temp);
    t4.solve22ToOut$2(Cdot.negateLocal$0(), imp);
    t1 = this.impulse;
    t1.set$x($.add(t1.get$x(), imp.x));
    t1.set$y($.add(t1.get$y(), imp.y));
    temp.setFrom$1(imp).mulLocal$1(m1);
    v1.subLocal$1(temp);
    w1 = $.numTypeCheck($.sub(w1, $.mul(i1, $.Vector_crossVectors(r1, imp))));
    temp.setFrom$1(imp).mulLocal$1(m2);
    v2.addLocal$1(temp);
    w2 = $.numTypeCheck($.add(w2, $.mul(i2, $.Vector_crossVectors(r2, imp))));
  }
  b1.set$angularVelocity(w1);
  b2.set$angularVelocity(w2);
 },
 initVelocityConstraints$1: function(step) {
  $.propertyTypeCheck(step, 'is$TimeStep');
  var b1 = $.propertyTypeCheck(this.bodyA, 'is$Body');
  var b2 = $.propertyTypeCheck(this.bodyB, 'is$Body');
  var t1 = this._enableMotor;
  if (t1 === true || this._enableLimit === true) {
    var t2 = b1.get$invInertia();
    if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(1, t2, step, t1, b1, b2, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    if (!(t2 > 0.0)) {
      t2 = b2.get$invInertia();
      if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(2, t2, step, t1, b1, b2, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      t2 = t2 > 0.0;
    } else t2 = true;
    $.assert(t2);
  }
  var r1 = $.Vector$(0, 0);
  var r2 = $.Vector$(0, 0);
  r1.setFrom$1(this.localAnchor1).subLocal$1(b1.get$localCenter());
  r2.setFrom$1(this.localAnchor2).subLocal$1(b2.get$localCenter());
  $.Matrix22_mulMatrixAndVectorToOut(b1.get$originTransform().get$rotation(), r1, r1);
  $.Matrix22_mulMatrixAndVectorToOut(b2.get$originTransform().get$rotation(), r2, r2);
  var m1 = $.numTypeCheck(b1.get$invMass());
  if (typeof m1 !== 'number') return this.initVelocityConstraints$1$bailout(3, r2, m1, t1, b1, step, b2, r1, 0, 0, 0, 0, 0, 0, 0);
  var m2 = $.numTypeCheck(b2.get$invMass());
  if (typeof m2 !== 'number') return this.initVelocityConstraints$1$bailout(4, r2, m1, step, m2, b1, b2, t1, r1, 0, 0, 0, 0, 0, 0);
  var i1 = $.numTypeCheck(b1.get$invInertia());
  if (typeof i1 !== 'number') return this.initVelocityConstraints$1$bailout(5, r2, m1, step, m2, b1, b2, i1, t1, r1, 0, 0, 0, 0, 0);
  var i2 = $.numTypeCheck(b2.get$invInertia());
  if (typeof i2 !== 'number') return this.initVelocityConstraints$1$bailout(6, r2, m1, step, m2, b1, b2, i1, i2, t1, r1, 0, 0, 0, 0);
  t2 = m1 + m2;
  var t3 = r1.y;
  if (typeof t3 !== 'number') return this.initVelocityConstraints$1$bailout(7, m1, step, m2, b1, b2, i1, i2, t1, t2, t3, r1, r2, 0, 0);
  var t4 = t2 + t3 * t3 * i1;
  var t5 = r2.y;
  if (typeof t5 !== 'number') return this.initVelocityConstraints$1$bailout(8, m1, step, m2, b1, b2, i1, i2, t1, t5, r1, r2, t4, 0, 0);
  t4 += t5 * t5 * i2;
  var t6 = this.mass;
  var t7 = t6.col1;
  t7.set$x(t4);
  t4 = r1.y;
  if (typeof t4 !== 'number') return this.initVelocityConstraints$1$bailout(9, m1, step, m2, b1, b2, i1, i2, t1, t6, r1, t4, r2, 0, 0);
  t4 = -t4;
  var t8 = r1.x;
  if (typeof t8 !== 'number') return this.initVelocityConstraints$1$bailout(10, t4, m1, step, m2, b1, b2, i1, i2, t1, t6, r1, t8, r2, 0);
  var t9 = t4 * t8 * i1;
  var t10 = r2.y;
  if (typeof t10 !== 'number') return this.initVelocityConstraints$1$bailout(11, m1, step, m2, b1, b2, i1, i2, t1, t6, t9, r1, t10, r2, 0);
  var t11 = r2.x;
  if (typeof t11 !== 'number') return this.initVelocityConstraints$1$bailout(12, m1, step, m2, b1, b2, i1, i2, t1, t6, t9, r1, t10, r2, t11);
  t9 -= t10 * t11 * i2;
  var t12 = t6.col2;
  t12.set$x(t9);
  t9 = r1.y;
  if (typeof t9 !== 'number') return this.initVelocityConstraints$1$bailout(13, m1, step, m2, b1, b2, i1, i2, t1, t6, r1, r2, t9, 0, 0);
  var t13 = -t9 * i1;
  var t14 = r2.y;
  if (typeof t14 !== 'number') return this.initVelocityConstraints$1$bailout(14, m1, step, m2, b1, b2, i1, i2, t1, t6, r1, r2, t14, t13, 0);
  t13 -= t14 * i2;
  var t15 = t6.col3;
  t15.set$x(t13);
  t7.set$y(t12.get$x());
  t13 = r1.x;
  if (typeof t13 !== 'number') return this.initVelocityConstraints$1$bailout(15, m1, step, m2, b1, b2, i1, i2, t1, t6, t2, r1, r2, t13, 0);
  t2 += t13 * t13 * i1;
  var t16 = r2.x;
  if (typeof t16 !== 'number') return this.initVelocityConstraints$1$bailout(16, m1, step, m2, b1, b2, i1, i2, t1, t6, r1, t2, r2, t16, 0);
  t12.set$y(t2 + t16 * t16 * i2);
  var t17 = r1.x;
  if (typeof t17 !== 'number') return this.initVelocityConstraints$1$bailout(17, m1, step, m2, b1, b2, i1, i2, t1, t6, r1, r2, t17, 0, 0);
  t17 *= i1;
  var t18 = r2.x;
  if (typeof t18 !== 'number') return this.initVelocityConstraints$1$bailout(18, m1, step, m2, b1, b2, i1, i2, t1, t6, r1, r2, t18, t17, 0);
  t15.set$y(t17 + t18 * i2);
  t7.set$z(t15.get$x());
  t12.set$z(t15.get$y());
  t12 = i1 + i2;
  t15.set$z(t12);
  this.motorMass = t12;
  t2 = this.motorMass;
  if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(19, r2, m1, step, m2, b1, b2, i1, i2, t1, t2, r1, 0, 0, 0);
  if (t2 > 0.0) {
    if (typeof t2 !== 'number') throw $.iae(t2);
    this.motorMass = 1.0 / t2;
  }
  if (this._enableLimit === true) {
    t1 = b2.get$sweep().get$angle();
    if (typeof t1 !== 'number') return this.initVelocityConstraints$1$bailout(20, r2, m1, step, m2, b1, b2, i1, i2, t1, r1, 0, 0, 0, 0);
    t2 = b1.get$sweep().get$angle();
    if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(21, r2, m1, step, m2, b1, b2, i1, i2, t2, t1, r1, 0, 0, 0);
    t2 = t1 - t2;
    t1 = this.referenceAngle;
    if (typeof t1 !== 'number') throw $.iae(t1);
    var jointAngle = t2 - t1;
    t1 = this.upperAngle;
    t2 = this.lowerAngle;
    t3 = $.abs($.sub(t1, t2));
    if (typeof t3 !== 'number') return this.initVelocityConstraints$1$bailout(22, m1, step, m2, b1, b2, i1, i2, t3, r1, r2, t1, jointAngle, t2, 0);
    if (t3 < 0.06981317007977318) this.limitState = 3;
    else {
      if ($.leB(jointAngle, t2)) {
        t1 = this.limitState;
        if (t1 !== (t1 | 0)) return this.initVelocityConstraints$1$bailout(23, r2, t1, m1, step, m2, b1, b2, i1, i2, r1, 0, 0, 0, 0);
        if (!(t1 === 1)) this.impulse.z = 0.0;
        this.limitState = 1;
      } else {
        if ($.geB(jointAngle, t1)) {
          t1 = this.limitState;
          if (t1 !== (t1 | 0)) return this.initVelocityConstraints$1$bailout(24, r2, m1, step, m2, b1, b2, i1, i2, t1, r1, 0, 0, 0, 0);
          if (!(t1 === 2)) this.impulse.z = 0.0;
          this.limitState = 2;
        } else {
          this.limitState = 0;
          this.impulse.z = 0.0;
        }
      }
    }
  } else this.limitState = 0;
  t1 = step.get$warmStarting() === true;
  t2 = this.impulse;
  if (t1) {
    t2.mulLocal$1(step.get$dtRatio());
    t1 = this._motorImpulse;
    t3 = step.get$dtRatio();
    if (typeof t3 !== 'number') return this.initVelocityConstraints$1$bailout(25, r2, m1, t2, m2, b1, i1, b2, i2, t1, t3, r1, 0, 0, 0);
    this._motorImpulse = t1 * t3;
    var temp = $.Vector$(0, 0);
    var P = $.Vector$(0, 0);
    P.setCoords$2(t2.x, t2.y);
    temp.setFrom$1(P).mulLocal$1(m1);
    b1.get$linearVelocity().subLocal$1(temp);
    t4 = b1.get$angularVelocity();
    if (typeof t4 !== 'number') return this.initVelocityConstraints$1$bailout(26, r2, temp, t2, P, m2, b1, i1, b2, i2, r1, t4, 0, 0, 0);
    t5 = $.Vector_crossVectors(r1, P);
    if (typeof t5 !== 'number') return this.initVelocityConstraints$1$bailout(27, t5, r2, temp, t2, m2, b1, i1, b2, i2, P, t4, 0, 0, 0);
    t5 += this._motorImpulse;
    t6 = t2.z;
    if (typeof t6 !== 'number') return this.initVelocityConstraints$1$bailout(28, t5, m2, b1, i1, b2, i2, t6, r2, temp, t2, P, t4, 0, 0);
    b1.set$angularVelocity(t4 - i1 * (t5 + t6));
    temp.setFrom$1(P).mulLocal$1(m2);
    b2.get$linearVelocity().addLocal$1(temp);
    t7 = b2.get$angularVelocity();
    if (typeof t7 !== 'number') return this.initVelocityConstraints$1$bailout(29, r2, t7, t2, P, b2, i2, 0, 0, 0, 0, 0, 0, 0, 0);
    t8 = $.Vector_crossVectors(r2, P);
    if (typeof t8 !== 'number') return this.initVelocityConstraints$1$bailout(30, t7, i2, t2, t8, b2, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    t8 += this._motorImpulse;
    t2 = t2.z;
    if (typeof t2 !== 'number') return this.initVelocityConstraints$1$bailout(31, t2, t7, i2, t8, b2, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    b2.set$angularVelocity(t7 + i2 * (t8 + t2));
  } else {
    t2.setZero$0();
    this._motorImpulse = 0.0;
  }
 },
 initVelocityConstraints$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13) {
  switch (state) {
    case 1:
      t2 = env0;
      var step = env1;
      t1 = env2;
      b1 = env3;
      b2 = env4;
      break;
    case 2:
      t2 = env0;
      step = env1;
      t1 = env2;
      b1 = env3;
      b2 = env4;
      break;
    case 3:
      r2 = env0;
      m1 = env1;
      t1 = env2;
      b1 = env3;
      step = env4;
      b2 = env5;
      r1 = env6;
      break;
    case 4:
      r2 = env0;
      m1 = env1;
      step = env2;
      m2 = env3;
      b1 = env4;
      b2 = env5;
      t1 = env6;
      r1 = env7;
      break;
    case 5:
      r2 = env0;
      m1 = env1;
      step = env2;
      m2 = env3;
      b1 = env4;
      b2 = env5;
      i1 = env6;
      t1 = env7;
      r1 = env8;
      break;
    case 6:
      r2 = env0;
      m1 = env1;
      step = env2;
      m2 = env3;
      b1 = env4;
      b2 = env5;
      i1 = env6;
      i2 = env7;
      t1 = env8;
      r1 = env9;
      break;
    case 7:
      m1 = env0;
      step = env1;
      m2 = env2;
      b1 = env3;
      b2 = env4;
      i1 = env5;
      i2 = env6;
      t1 = env7;
      t2 = env8;
      t3 = env9;
      r1 = env10;
      r2 = env11;
      break;
    case 8:
      m1 = env0;
      step = env1;
      m2 = env2;
      b1 = env3;
      b2 = env4;
      i1 = env5;
      i2 = env6;
      t1 = env7;
      t4 = env8;
      r1 = env9;
      r2 = env10;
      t2 = env11;
      break;
    case 9:
      m1 = env0;
      step = env1;
      m2 = env2;
      b1 = env3;
      b2 = env4;
      i1 = env5;
      i2 = env6;
      t1 = env7;
      t5 = env8;
      r1 = env9;
      t2 = env10;
      r2 = env11;
      break;
    case 10:
      t2 = env0;
      m1 = env1;
      step = env2;
      m2 = env3;
      b1 = env4;
      b2 = env5;
      i1 = env6;
      i2 = env7;
      t1 = env8;
      t5 = env9;
      r1 = env10;
      t6 = env11;
      r2 = env12;
      break;
    case 11:
      m1 = env0;
      step = env1;
      m2 = env2;
      b1 = env3;
      b2 = env4;
      i1 = env5;
      i2 = env6;
      t1 = env7;
      t5 = env8;
      t7 = env9;
      r1 = env10;
      t8 = env11;
      r2 = env12;
      break;
    case 12:
      m1 = env0;
      step = env1;
      m2 = env2;
      b1 = env3;
      b2 = env4;
      i1 = env5;
      i2 = env6;
      t1 = env7;
      t5 = env8;
      t7 = env9;
      r1 = env10;
      t8 = env11;
      r2 = env12;
      t9 = env13;
      break;
    case 13:
      m1 = env0;
      step = env1;
      m2 = env2;
      b1 = env3;
      b2 = env4;
      i1 = env5;
      i2 = env6;
      t1 = env7;
      t5 = env8;
      r1 = env9;
      r2 = env10;
      t7 = env11;
      break;
    case 14:
      m1 = env0;
      step = env1;
      m2 = env2;
      b1 = env3;
      b2 = env4;
      i1 = env5;
      i2 = env6;
      t1 = env7;
      t5 = env8;
      r1 = env9;
      r2 = env10;
      t11 = env11;
      t10 = env12;
      break;
    case 15:
      m1 = env0;
      step = env1;
      m2 = env2;
      b1 = env3;
      b2 = env4;
      i1 = env5;
      i2 = env6;
      t1 = env7;
      t5 = env8;
      t10 = env9;
      r1 = env10;
      r2 = env11;
      t12 = env12;
      break;
    case 16:
      m1 = env0;
      step = env1;
      m2 = env2;
      b1 = env3;
      b2 = env4;
      i1 = env5;
      i2 = env6;
      t1 = env7;
      t5 = env8;
      r1 = env9;
      t10 = env10;
      r2 = env11;
      t13 = env12;
      break;
    case 17:
      m1 = env0;
      step = env1;
      m2 = env2;
      b1 = env3;
      b2 = env4;
      i1 = env5;
      i2 = env6;
      t1 = env7;
      t5 = env8;
      r1 = env9;
      r2 = env10;
      t10 = env11;
      break;
    case 18:
      m1 = env0;
      step = env1;
      m2 = env2;
      b1 = env3;
      b2 = env4;
      i1 = env5;
      i2 = env6;
      t1 = env7;
      t5 = env8;
      r1 = env9;
      r2 = env10;
      t14 = env11;
      t10 = env12;
      break;
    case 19:
      r2 = env0;
      m1 = env1;
      step = env2;
      m2 = env3;
      b1 = env4;
      b2 = env5;
      i1 = env6;
      i2 = env7;
      t1 = env8;
      t2 = env9;
      r1 = env10;
      break;
    case 20:
      r2 = env0;
      m1 = env1;
      step = env2;
      m2 = env3;
      b1 = env4;
      b2 = env5;
      i1 = env6;
      i2 = env7;
      t1 = env8;
      r1 = env9;
      break;
    case 21:
      r2 = env0;
      m1 = env1;
      step = env2;
      m2 = env3;
      b1 = env4;
      b2 = env5;
      i1 = env6;
      i2 = env7;
      t2 = env8;
      t1 = env9;
      r1 = env10;
      break;
    case 22:
      m1 = env0;
      step = env1;
      m2 = env2;
      b1 = env3;
      b2 = env4;
      i1 = env5;
      i2 = env6;
      t3 = env7;
      r1 = env8;
      r2 = env9;
      t1 = env10;
      jointAngle = env11;
      t2 = env12;
      break;
    case 23:
      r2 = env0;
      t1 = env1;
      m1 = env2;
      step = env3;
      m2 = env4;
      b1 = env5;
      b2 = env6;
      i1 = env7;
      i2 = env8;
      r1 = env9;
      break;
    case 24:
      r2 = env0;
      m1 = env1;
      step = env2;
      m2 = env3;
      b1 = env4;
      b2 = env5;
      i1 = env6;
      i2 = env7;
      t1 = env8;
      r1 = env9;
      break;
    case 25:
      r2 = env0;
      m1 = env1;
      t2 = env2;
      m2 = env3;
      b1 = env4;
      i1 = env5;
      b2 = env6;
      i2 = env7;
      t1 = env8;
      t3 = env9;
      r1 = env10;
      break;
    case 26:
      r2 = env0;
      temp = env1;
      t2 = env2;
      P = env3;
      m2 = env4;
      b1 = env5;
      i1 = env6;
      b2 = env7;
      i2 = env8;
      r1 = env9;
      t4 = env10;
      break;
    case 27:
      t5 = env0;
      r2 = env1;
      temp = env2;
      t2 = env3;
      m2 = env4;
      b1 = env5;
      i1 = env6;
      b2 = env7;
      i2 = env8;
      P = env9;
      t4 = env10;
      break;
    case 28:
      t5 = env0;
      m2 = env1;
      b1 = env2;
      i1 = env3;
      b2 = env4;
      i2 = env5;
      t6 = env6;
      r2 = env7;
      temp = env8;
      t2 = env9;
      P = env10;
      t4 = env11;
      break;
    case 29:
      r2 = env0;
      t7 = env1;
      t2 = env2;
      P = env3;
      b2 = env4;
      i2 = env5;
      break;
    case 30:
      t7 = env0;
      i2 = env1;
      t2 = env2;
      t8 = env3;
      b2 = env4;
      break;
    case 31:
      t2 = env0;
      t7 = env1;
      i2 = env2;
      t8 = env3;
      b2 = env4;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(step, 'is$TimeStep');
      var b1 = $.propertyTypeCheck(this.bodyA, 'is$Body');
      var b2 = $.propertyTypeCheck(this.bodyB, 'is$Body');
      var t1 = this._enableMotor;
    case 1:
    case 2:
      if (state == 1 || state == 2 || (state == 0 && (t1 === true || this._enableLimit === true))) {
        switch (state) {
          case 0:
            var t2 = b1.get$invInertia();
          case 1:
            state = 0;
          case 2:
            if (state == 2 || (state == 0 && !$.gtB(t2, 0.0))) {
              switch (state) {
                case 0:
                  t2 = b2.get$invInertia();
                case 2:
                  state = 0;
                  t2 = $.gtB(t2, 0.0);
              }
            } else {
              t2 = true;
            }
            $.assert(t2);
        }
      }
      var r1 = $.Vector$(0, 0);
      var r2 = $.Vector$(0, 0);
      r1.setFrom$1(this.localAnchor1).subLocal$1(b1.get$localCenter());
      r2.setFrom$1(this.localAnchor2).subLocal$1(b2.get$localCenter());
      $.Matrix22_mulMatrixAndVectorToOut(b1.get$originTransform().get$rotation(), r1, r1);
      $.Matrix22_mulMatrixAndVectorToOut(b2.get$originTransform().get$rotation(), r2, r2);
      var m1 = $.numTypeCheck(b1.get$invMass());
    case 3:
      state = 0;
      var m2 = $.numTypeCheck(b2.get$invMass());
    case 4:
      state = 0;
      var i1 = $.numTypeCheck(b1.get$invInertia());
    case 5:
      state = 0;
      var i2 = $.numTypeCheck(b2.get$invInertia());
    case 6:
      state = 0;
      t2 = $.add(m1, m2);
      var t3 = r1.y;
    case 7:
      state = 0;
      t2 = $.add(t2, $.mul($.mul(t3, t3), i1));
      var t4 = r2.y;
    case 8:
      state = 0;
      t2 = $.add(t2, $.mul($.mul(t4, t4), i2));
      var t5 = this.mass;
      t5.get$col1().set$x(t2);
      t2 = r1.y;
    case 9:
      state = 0;
      t2 = $.neg(t2);
      var t6 = r1.x;
    case 10:
      state = 0;
      var t7 = $.mul($.mul(t2, t6), i1);
      var t8 = r2.y;
    case 11:
      state = 0;
      var t9 = r2.x;
    case 12:
      state = 0;
      t7 = $.sub(t7, $.mul($.mul(t8, t9), i2));
      t5.get$col2().set$x(t7);
      t7 = r1.y;
    case 13:
      state = 0;
      var t10 = $.mul($.neg(t7), i1);
      var t11 = r2.y;
    case 14:
      state = 0;
      t10 = $.sub(t10, $.mul(t11, i2));
      t5.get$col3().set$x(t10);
      t10 = t5.get$col2().get$x();
      t5.get$col1().set$y(t10);
      t10 = $.add(m1, m2);
      var t12 = r1.x;
    case 15:
      state = 0;
      t10 = $.add(t10, $.mul($.mul(t12, t12), i1));
      var t13 = r2.x;
    case 16:
      state = 0;
      t10 = $.add(t10, $.mul($.mul(t13, t13), i2));
      t5.get$col2().set$y(t10);
      t10 = r1.x;
    case 17:
      state = 0;
      t10 = $.mul(t10, i1);
      var t14 = r2.x;
    case 18:
      state = 0;
      t10 = $.add(t10, $.mul(t14, i2));
      t5.get$col3().set$y(t10);
      t10 = t5.get$col3().get$x();
      t5.get$col1().set$z(t10);
      t10 = t5.get$col3().get$y();
      t5.get$col2().set$z(t10);
      t10 = $.add(i1, i2);
      t5.get$col3().set$z(t10);
      this.motorMass = $.add(i1, i2);
      t2 = this.motorMass;
    case 19:
      state = 0;
      if ($.gtB(t2, 0.0)) {
        t2 = this.motorMass;
        if (typeof t2 !== 'number') throw $.iae(t2);
        this.motorMass = 1.0 / t2;
      }
      if (t1 === false) this._motorImpulse = 0.0;
    case 20:
    case 21:
    case 22:
    case 23:
    case 24:
      if (state == 20 || state == 21 || state == 22 || state == 23 || state == 24 || (state == 0 && this._enableLimit === true)) {
        switch (state) {
          case 0:
            t1 = b2.get$sweep().get$angle();
          case 20:
            state = 0;
            t2 = b1.get$sweep().get$angle();
          case 21:
            state = 0;
            var jointAngle = $.numTypeCheck($.sub($.sub(t1, t2), this.referenceAngle));
            t1 = this.upperAngle;
            t2 = this.lowerAngle;
            t3 = $.abs($.sub(t1, t2));
          case 22:
            state = 0;
          case 23:
          case 24:
            if ((state == 0 && $.ltB(t3, 0.06981317007977318))) {
              this.limitState = 3;
            } else {
              switch (state) {
                case 0:
                case 23:
                case 24:
                  if (state == 23 || (state == 0 && $.leB(jointAngle, t2))) {
                    switch (state) {
                      case 0:
                        t1 = this.limitState;
                      case 23:
                        state = 0;
                        !$.eqB(t1, 1) && this.impulse.set$z(0.0);
                        this.limitState = 1;
                    }
                  } else {
                    switch (state) {
                      case 0:
                      case 24:
                        if (state == 24 || (state == 0 && $.geB(jointAngle, t1))) {
                          switch (state) {
                            case 0:
                              t1 = this.limitState;
                            case 24:
                              state = 0;
                              !$.eqB(t1, 2) && this.impulse.set$z(0.0);
                              this.limitState = 2;
                          }
                        } else {
                          this.limitState = 0;
                          this.impulse.set$z(0.0);
                        }
                    }
                  }
              }
            }
        }
      } else {
        this.limitState = 0;
      }
      t1 = step.get$warmStarting() === true;
      t2 = this.impulse;
    case 25:
    case 26:
    case 27:
    case 28:
    case 29:
    case 30:
    case 31:
      if (state == 25 || state == 26 || state == 27 || state == 28 || state == 29 || state == 30 || state == 31 || (state == 0 && t1)) {
        switch (state) {
          case 0:
            t2.mulLocal$1(step.get$dtRatio());
            t1 = this._motorImpulse;
            t3 = step.get$dtRatio();
          case 25:
            state = 0;
            if (typeof t3 !== 'number') throw $.iae(t3);
            this._motorImpulse = t1 * t3;
            var temp = $.Vector$(0, 0);
            var P = $.Vector$(0, 0);
            P.setCoords$2(t2.get$x(), t2.get$y());
            temp.setFrom$1(P).mulLocal$1(m1);
            b1.get$linearVelocity().subLocal$1(temp);
            t4 = b1.get$angularVelocity();
          case 26:
            state = 0;
            t5 = $.Vector_crossVectors(r1, P);
          case 27:
            state = 0;
            t5 = $.add(t5, this._motorImpulse);
            t6 = t2.get$z();
          case 28:
            state = 0;
            b1.set$angularVelocity($.sub(t4, $.mul(i1, $.add(t5, t6))));
            temp.setFrom$1(P).mulLocal$1(m2);
            b2.get$linearVelocity().addLocal$1(temp);
            t7 = b2.get$angularVelocity();
          case 29:
            state = 0;
            t8 = $.Vector_crossVectors(r2, P);
          case 30:
            state = 0;
            t8 = $.add(t8, this._motorImpulse);
            t2 = t2.get$z();
          case 31:
            state = 0;
            b2.set$angularVelocity($.add(t7, $.mul(i2, $.add(t8, t2))));
        }
      } else {
        t2.setZero$0();
        this._motorImpulse = 0.0;
      }
  }
 },
 RevoluteJoint$1: function(def) {
  $.propertyTypeCheck(def, 'is$RevoluteJointDef');
  this.localAnchor1.setFrom$1(def.get$localAnchorA());
  this.localAnchor2.setFrom$1(def.get$localAnchorB());
  this.referenceAngle = def.get$referenceAngle();
  this._motorImpulse = 0;
  this.lowerAngle = def.get$lowerAngle();
  this.upperAngle = def.get$upperAngle();
  this._maxMotorTorque = def.get$maxMotorTorque();
  this._motorSpeed = def.get$motorSpeed();
  this._enableLimit = def.get$enableLimit();
  this._enableMotor = def.get$enableMotor();
 }
};

$$.RevoluteJointDef = {"":
 ["maxMotorTorque?", "motorSpeed?", "enableMotor?", "upperAngle?", "lowerAngle?", "enableLimit?", "referenceAngle?", "localAnchorB?", "localAnchorA?", "collideConnected", "bodyB", "bodyA", "userData", "type"],
 super: "JointDef",
 initialize$3: function(b1, b2, anchor) {
  $.propertyTypeCheck(b1, 'is$Body');
  $.propertyTypeCheck(b2, 'is$Body');
  $.propertyTypeCheck(anchor, 'is$Vector');
  this.bodyA = b1;
  this.bodyB = b2;
  this.bodyA.getLocalPointToOut$2(anchor, this.localAnchorA);
  this.bodyB.getLocalPointToOut$2(anchor, this.localAnchorB);
  this.referenceAngle = $.sub(this.bodyA.get$angle(), this.bodyB.get$angle());
 },
 RevoluteJointDef$0: function() {
  this.type = 1;
 },
 is$RevoluteJointDef: true
};

$$.DefaultWorldPool = {"":
 ["distance?", "timeOfImpact?", "collision?"],
 super: "Object",
 getPolyContactStack$0: function() {
  var queue = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(queue, ({E: 'PolygonContact'}));
  for (var i = 0; $.ltB(i, 10); i = $.intTypeCheck($.add(i, 1))) {
    queue.addFirst$1($.PolygonContact$(this));
  }
  return queue;
 },
 getPolyCircleContactStack$0: function() {
  var queue = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(queue, ({E: 'PolygonAndCircleContact'}));
  for (var i = 0; $.ltB(i, 10); i = $.intTypeCheck($.add(i, 1))) {
    queue.addFirst$1($.PolygonAndCircleContact$(this));
  }
  return queue;
 },
 getCircleContactStack$0: function() {
  var queue = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(queue, ({E: 'CircleContact'}));
  for (var i = 0; $.ltB(i, 10); i = $.intTypeCheck($.add(i, 1))) {
    queue.addFirst$1($.CircleContact$(this));
  }
  return queue;
 },
 distance$3: function(arg0, arg1, arg2) { return this.distance.$call$3(arg0, arg1, arg2); },
 timeOfImpact$2: function(arg0, arg1) { return this.timeOfImpact.$call$2(arg0, arg1); },
 DefaultWorldPool$0: function() {
  this.distance = $.Distance$_construct();
  this.collision = $.Collision$_construct(this);
  this.timeOfImpact = $.TimeOfImpact$_construct(this);
 },
 is$DefaultWorldPool: true
};

$$.Matrix22 = {"":
 ["col2?", "col1?"],
 super: "Object",
 toString$0: function() {
  return $.S($.toString(this.col1)) + ', ' + $.S($.toString(this.col2));
 },
 solveToOut$2: function(b, out) {
  $.propertyTypeCheck(b, 'is$Vector');
  $.propertyTypeCheck(out, 'is$Vector');
  var t1 = this.col1;
  var a11 = $.numTypeCheck(t1.get$x());
  var t2 = this.col2;
  var a12 = $.numTypeCheck(t2.get$x());
  var a21 = $.numTypeCheck(t1.get$y());
  var a22 = $.numTypeCheck(t2.get$y());
  var det = $.numTypeCheck($.sub($.mul(a11, a22), $.mul(a12, a21)));
  if (!$.eqB(det, 0.0)) {
    if (typeof det !== 'number') throw $.iae(det);
    det = 1.0 / det;
  }
  var tempy = $.numTypeCheck($.mul(det, $.sub($.mul(a11, b.get$y()), $.mul(a21, b.get$x()))));
  out.set$x($.mul(det, $.sub($.mul(a22, b.get$x()), $.mul(a12, b.get$y()))));
  out.set$y(tempy);
 },
 addLocal$1: function(other) {
  $.propertyTypeCheck(other, 'is$Matrix22');
  var t1 = this.col1;
  var t2 = t1.get$x();
  if (typeof t2 !== 'number') return this.addLocal$1$bailout(1, t1, other, t2, 0);
  var t3 = other.get$col1().get$x();
  if (typeof t3 !== 'number') return this.addLocal$1$bailout(2, t1, other, t2, t3);
  t1.set$x(t2 + t3);
  var t4 = t1.get$y();
  if (typeof t4 !== 'number') return this.addLocal$1$bailout(3, t1, other, t4, 0);
  var t5 = other.get$col1().get$y();
  if (typeof t5 !== 'number') return this.addLocal$1$bailout(4, t1, other, t4, t5);
  t1.set$y(t4 + t5);
  t1 = this.col2;
  var t6 = t1.get$x();
  if (typeof t6 !== 'number') return this.addLocal$1$bailout(5, other, t1, t6, 0);
  var t7 = other.get$col2().get$x();
  if (typeof t7 !== 'number') return this.addLocal$1$bailout(6, other, t1, t7, t6);
  t1.set$x(t6 + t7);
  var t8 = t1.get$y();
  if (typeof t8 !== 'number') return this.addLocal$1$bailout(7, t8, other, t1, 0);
  var t9 = other.get$col2().get$y();
  if (typeof t9 !== 'number') return this.addLocal$1$bailout(8, t8, t1, t9, 0);
  t1.set$y(t8 + t9);
  return this;
 },
 addLocal$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      t1 = env0;
      var other = env1;
      t2 = env2;
      break;
    case 2:
      t1 = env0;
      other = env1;
      t2 = env2;
      t3 = env3;
      break;
    case 3:
      t1 = env0;
      other = env1;
      t4 = env2;
      break;
    case 4:
      t1 = env0;
      other = env1;
      t4 = env2;
      t5 = env3;
      break;
    case 5:
      other = env0;
      t1 = env1;
      t6 = env2;
      break;
    case 6:
      other = env0;
      t1 = env1;
      t7 = env2;
      t6 = env3;
      break;
    case 7:
      t8 = env0;
      other = env1;
      t1 = env2;
      break;
    case 8:
      t8 = env0;
      t1 = env1;
      t9 = env2;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(other, 'is$Matrix22');
      var t1 = this.col1;
      var t2 = t1.get$x();
    case 1:
      state = 0;
      var t3 = other.get$col1().get$x();
    case 2:
      state = 0;
      t1.set$x($.add(t2, t3));
      var t4 = t1.get$y();
    case 3:
      state = 0;
      var t5 = other.get$col1().get$y();
    case 4:
      state = 0;
      t1.set$y($.add(t4, t5));
      t1 = this.col2;
      var t6 = t1.get$x();
    case 5:
      state = 0;
      var t7 = other.get$col2().get$x();
    case 6:
      state = 0;
      t1.set$x($.add(t6, t7));
      var t8 = t1.get$y();
    case 7:
      state = 0;
      var t9 = other.get$col2().get$y();
    case 8:
      state = 0;
      t1.set$y($.add(t8, t9));
      return this;
  }
 },
 invertLocal$0: function() {
  var t1 = this.col1;
  var a = $.numTypeCheck(t1.get$x());
  if (typeof a !== 'number') return this.invertLocal$0$bailout(1, a, t1, 0, 0, 0, 0, 0);
  var t2 = this.col2;
  var b = $.numTypeCheck(t2.get$x());
  if (typeof b !== 'number') return this.invertLocal$0$bailout(2, a, t1, t2, b, 0, 0, 0);
  var c = $.numTypeCheck(t1.get$y());
  if (typeof c !== 'number') return this.invertLocal$0$bailout(3, c, a, t1, t2, b, 0, 0);
  var d = $.numTypeCheck(t2.get$y());
  if (typeof d !== 'number') return this.invertLocal$0$bailout(4, a, b, c, t1, t2, d, 0);
  var det = a * d - b * c;
  if (!(det === 0)) det = 1.0 / det;
  t1.set$x(det * d);
  var t3 = -det;
  t2.set$x(t3 * b);
  t1.set$y(t3 * c);
  t2.set$y(det * a);
  return this;
 },
 invertLocal$0$bailout: function(state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      a = env0;
      t1 = env1;
      break;
    case 2:
      a = env0;
      t1 = env1;
      t2 = env2;
      b = env3;
      break;
    case 3:
      c = env0;
      a = env1;
      t1 = env2;
      t2 = env3;
      b = env4;
      break;
    case 4:
      a = env0;
      b = env1;
      c = env2;
      t1 = env3;
      t2 = env4;
      d = env5;
      break;
    case 5:
      a = env0;
      det = env1;
      b = env2;
      c = env3;
      t1 = env4;
      t2 = env5;
      d = env6;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.col1;
      var a = $.numTypeCheck(t1.get$x());
    case 1:
      state = 0;
      var t2 = this.col2;
      var b = $.numTypeCheck(t2.get$x());
    case 2:
      state = 0;
      var c = $.numTypeCheck(t1.get$y());
    case 3:
      state = 0;
      var d = $.numTypeCheck(t2.get$y());
    case 4:
      state = 0;
      var det = $.numTypeCheck($.sub($.mul(a, d), $.mul(b, c)));
    case 5:
      state = 0;
      if (!$.eqB(det, 0)) {
        if (typeof det !== 'number') throw $.iae(det);
        det = 1.0 / det;
      }
      t1.set$x($.mul(det, d));
      t2.set$x($.mul($.neg(det), b));
      t1.set$y($.mul($.neg(det), c));
      t2.set$y($.mul(det, a));
      return this;
  }
 },
 setFrom$1: function(matrix) {
  $.propertyTypeCheck(matrix, 'is$Matrix22');
  this.col1.setFrom$1(matrix.get$col1());
  this.col2.setFrom$1(matrix.get$col2());
 },
 setAngle$1: function(angle) {
  $.numTypeCheck(angle);
  var cosin = $.numTypeCheck($.Math_cos(angle));
  var sin = $.numTypeCheck($.Math_sin(angle));
  this.col1.setCoords$2(cosin, sin);
  this.col2.setCoords$2($.neg(sin), cosin);
 },
 operator$eq$1: function(other) {
  if (!(other == null) && ((typeof other === 'object' && other !== null) && !!other.is$Matrix22)) {
    var t1 = this.col1;
    var t2 = other.get$col1();
    if (t1 == null ? t2 == null : t1 === t2) {
      t1 = this.col2;
      t2 = other.get$col2();
      t2 = t1 == null ? t2 == null : t1 === t2;
      t1 = t2;
    } else t1 = false;
    return t1;
  }
  return false;
 },
 Matrix22$2: function(c1, c2) {
  $.propertyTypeCheck(c1, 'is$Vector');
  $.propertyTypeCheck(c2, 'is$Vector');
  if (c1 == null) c1 = $.Vector$(0, 0);
  if (c2 == null) c2 = $.Vector$(0, 0);
  this.col1 = c1;
  this.col2 = c2;
 },
 is$Matrix22: true
};

$$.Matrix33 = {"":
 ["col3?", "col2?", "col1?"],
 super: "Object",
 solve33ToOut$2: function(b, out) {
  $.propertyTypeCheck(b, 'is$Vector3');
  $.propertyTypeCheck(out, 'is$Vector3');
  var t1 = this.col2;
  var t2 = this.col3;
  $.Vector3_crossToOut(t1, t2, out);
  var t3 = this.col1;
  var det = $.numTypeCheck($.Vector3_dot(t3, out));
  if (!$.eqB(det, 0.0)) {
    if (typeof det !== 'number') throw $.iae(det);
    det = 1.0 / det;
  }
  $.Vector3_crossToOut(t1, t2, out);
  var x = $.numTypeCheck($.mul(det, $.Vector3_dot(b, out)));
  $.Vector3_crossToOut(b, t2, out);
  var y = $.numTypeCheck($.mul(det, $.Vector3_dot(t3, out)));
  $.Vector3_crossToOut(t1, b, out);
  var z = $.numTypeCheck($.mul(det, $.Vector3_dot(t3, out)));
  out.set$x(x);
  out.set$y(y);
  out.set$z(z);
 },
 solve22ToOut$2: function(b, out) {
  $.propertyTypeCheck(b, 'is$Vector');
  $.propertyTypeCheck(out, 'is$Vector');
  var t1 = this.col1;
  var a11 = $.numTypeCheck(t1.get$x());
  var t2 = this.col2;
  var a12 = $.numTypeCheck(t2.get$x());
  var a21 = $.numTypeCheck(t1.get$y());
  var a22 = $.numTypeCheck(t2.get$y());
  var det = $.numTypeCheck($.sub($.mul(a11, a22), $.mul(a12, a21)));
  if (!$.eqB(det, 0.0)) {
    if (typeof det !== 'number') throw $.iae(det);
    det = 1.0 / det;
  }
  out.set$x($.mul(det, $.sub($.mul(a22, b.get$x()), $.mul(a12, b.get$y()))));
  out.set$y($.mul(det, $.sub($.mul(a11, b.get$y()), $.mul(a21, b.get$x()))));
 },
 setZero$0: function() {
  this.col1.setZero$0();
  this.col2.setZero$0();
  this.col3.setZero$0();
 }
};

$$.Sweep = {"":
 ["angle=", "angleZero=", "center?", "centerZero?", "localCenter?"],
 super: "Object",
 advance$1: function(time) {
  $.numTypeCheck(time);
  if (typeof time !== 'number') throw $.iae(time);
  var t1 = 1 - time;
  var t2 = this.centerZero;
  var t3 = t2.get$x();
  if (typeof t3 !== 'number') throw $.iae(t3);
  t3 *= t1;
  var t4 = this.center;
  var t5 = t4.get$x();
  if (typeof t5 !== 'number') throw $.iae(t5);
  t2.set$x(t3 + time * t5);
  var t6 = t2.get$y();
  if (typeof t6 !== 'number') throw $.iae(t6);
  t6 *= t1;
  t4 = t4.get$y();
  if (typeof t4 !== 'number') throw $.iae(t4);
  t2.set$y(t6 + time * t4);
  t2 = this.angleZero;
  if (typeof t2 !== 'number') throw $.iae(t2);
  t2 *= t1;
  t1 = this.angle;
  if (typeof t1 !== 'number') throw $.iae(t1);
  this.angleZero = t2 + time * t1;
 },
 getTransform$2: function(xf, alpha) {
  $.propertyTypeCheck(xf, 'is$Transform');
  $.numTypeCheck(alpha);
  $.assert(!(xf == null));
  if (typeof alpha !== 'number') throw $.iae(alpha);
  var t1 = 1.0 - alpha;
  var t2 = this.centerZero;
  var t3 = t2.x;
  if (typeof t3 !== 'number') throw $.iae(t3);
  t3 *= t1;
  var t4 = this.center;
  var t5 = t4.x;
  if (typeof t5 !== 'number') throw $.iae(t5);
  t3 += alpha * t5;
  xf.get$position().set$x(t3);
  t2 = t2.y;
  if (typeof t2 !== 'number') throw $.iae(t2);
  t2 *= t1;
  t4 = t4.y;
  if (typeof t4 !== 'number') throw $.iae(t4);
  t2 += alpha * t4;
  xf.get$position().set$y(t2);
  t2 = xf.get$rotation();
  t3 = this.angleZero;
  if (typeof t3 !== 'number') throw $.iae(t3);
  t3 *= t1;
  t1 = this.angle;
  if (typeof t1 !== 'number') throw $.iae(t1);
  t2.setAngle$1(t3 + alpha * t1);
  t2 = xf.get$position();
  var t6 = t2.get$x();
  if (typeof t6 !== 'number') return this.getTransform$2$bailout(1, xf, t2, t6, 0, 0, 0, 0);
  var t7 = xf.get$rotation().get$col1().get$x();
  if (typeof t7 !== 'number') return this.getTransform$2$bailout(2, t7, xf, t2, t6, 0, 0, 0);
  var t8 = this.localCenter;
  var t9 = t8.x;
  if (typeof t9 !== 'number') return this.getTransform$2$bailout(3, xf, t8, t6, t2, t7, t9, 0);
  t9 *= t7;
  t7 = xf.get$rotation().get$col2().get$x();
  if (typeof t7 !== 'number') return this.getTransform$2$bailout(4, t7, xf, t8, t6, t2, t9, 0);
  var t10 = t8.y;
  if (typeof t10 !== 'number') return this.getTransform$2$bailout(5, t7, t10, xf, t8, t2, t6, t9);
  t2.set$x(t6 - (t9 + t7 * t10));
  t2 = xf.get$position();
  var t11 = t2.get$y();
  if (typeof t11 !== 'number') return this.getTransform$2$bailout(6, t2, xf, t11, t8, 0, 0, 0);
  var t12 = xf.get$rotation().get$col1().get$y();
  if (typeof t12 !== 'number') return this.getTransform$2$bailout(7, t2, xf, t11, t8, t12, 0, 0);
  var t13 = t8.x;
  if (typeof t13 !== 'number') return this.getTransform$2$bailout(8, t13, xf, t8, t2, t11, t12, 0);
  t13 *= t12;
  t12 = xf.get$rotation().get$col2().get$y();
  if (typeof t12 !== 'number') return this.getTransform$2$bailout(9, t13, t2, t11, t12, t8, 0, 0);
  t8 = t8.y;
  if (typeof t8 !== 'number') return this.getTransform$2$bailout(10, t8, t13, t2, t11, t12, 0, 0);
  t2.set$y(t11 - (t13 + t12 * t8));
 },
 getTransform$2$bailout: function(state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      var xf = env0;
      t2 = env1;
      t6 = env2;
      break;
    case 2:
      t7 = env0;
      xf = env1;
      t2 = env2;
      t6 = env3;
      break;
    case 3:
      xf = env0;
      t8 = env1;
      t6 = env2;
      t2 = env3;
      t7 = env4;
      t9 = env5;
      break;
    case 4:
      t7 = env0;
      xf = env1;
      t8 = env2;
      t6 = env3;
      t2 = env4;
      t9 = env5;
      break;
    case 5:
      t7 = env0;
      t10 = env1;
      xf = env2;
      t8 = env3;
      t2 = env4;
      t6 = env5;
      t9 = env6;
      break;
    case 6:
      t2 = env0;
      xf = env1;
      t11 = env2;
      t8 = env3;
      break;
    case 7:
      t2 = env0;
      xf = env1;
      t11 = env2;
      t8 = env3;
      t12 = env4;
      break;
    case 8:
      t13 = env0;
      xf = env1;
      t8 = env2;
      t2 = env3;
      t11 = env4;
      t12 = env5;
      break;
    case 9:
      t13 = env0;
      t2 = env1;
      t11 = env2;
      t12 = env3;
      t8 = env4;
      break;
    case 10:
      t8 = env0;
      t13 = env1;
      t2 = env2;
      t11 = env3;
      t12 = env4;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(xf, 'is$Transform');
      $.numTypeCheck(alpha);
      $.assert(!(xf == null));
      if (typeof alpha !== 'number') throw $.iae(alpha);
      var t1 = 1.0 - alpha;
      var t2 = this.centerZero;
      var t3 = t2.get$x();
      if (typeof t3 !== 'number') throw $.iae(t3);
      t3 *= t1;
      var t4 = this.center;
      var t5 = t4.get$x();
      if (typeof t5 !== 'number') throw $.iae(t5);
      t3 += alpha * t5;
      xf.get$position().set$x(t3);
      t2 = t2.get$y();
      if (typeof t2 !== 'number') throw $.iae(t2);
      t2 *= t1;
      t4 = t4.get$y();
      if (typeof t4 !== 'number') throw $.iae(t4);
      t2 += alpha * t4;
      xf.get$position().set$y(t2);
      t2 = xf.get$rotation();
      t3 = this.angleZero;
      if (typeof t3 !== 'number') throw $.iae(t3);
      t3 *= t1;
      t1 = this.angle;
      if (typeof t1 !== 'number') throw $.iae(t1);
      t2.setAngle$1(t3 + alpha * t1);
      t2 = xf.get$position();
      var t6 = t2.get$x();
    case 1:
      state = 0;
      var t7 = xf.get$rotation().get$col1().get$x();
    case 2:
      state = 0;
      var t8 = this.localCenter;
      var t9 = t8.get$x();
    case 3:
      state = 0;
      t9 = $.mul(t7, t9);
      t7 = xf.get$rotation().get$col2().get$x();
    case 4:
      state = 0;
      var t10 = t8.get$y();
    case 5:
      state = 0;
      t2.set$x($.sub(t6, $.add(t9, $.mul(t7, t10))));
      t2 = xf.get$position();
      var t11 = t2.get$y();
    case 6:
      state = 0;
      var t12 = xf.get$rotation().get$col1().get$y();
    case 7:
      state = 0;
      var t13 = t8.get$x();
    case 8:
      state = 0;
      t13 = $.mul(t12, t13);
      t12 = xf.get$rotation().get$col2().get$y();
    case 9:
      state = 0;
      t8 = t8.get$y();
    case 10:
      state = 0;
      t2.set$y($.sub(t11, $.add(t13, $.mul(t12, t8))));
  }
 },
 normalize$0: function() {
  var t1 = this.angleZero;
  if (typeof t1 !== 'number') return this.normalize$0$bailout(1, t1, 0);
  var t2 = $.floor(t1 / 6.283185307179586);
  if (typeof t2 !== 'number') throw $.iae(t2);
  var d = 6.283185307179586 * t2;
  t2 = this.angleZero;
  if (typeof t2 !== 'number') return this.normalize$0$bailout(2, d, t2);
  this.angleZero = t2 - d;
  var t3 = this.angle;
  if (typeof t3 !== 'number') return this.normalize$0$bailout(3, t3, d);
  this.angle = t3 - d;
 },
 normalize$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      d = env0;
      t2 = env1;
      break;
    case 3:
      t3 = env0;
      d = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.angleZero;
    case 1:
      state = 0;
      var t2 = $.floor($.div(t1, 6.283185307179586));
      if (typeof t2 !== 'number') throw $.iae(t2);
      var d = 6.283185307179586 * t2;
      t2 = this.angleZero;
    case 2:
      state = 0;
      this.angleZero = $.sub(t2, d);
      var t3 = this.angle;
    case 3:
      state = 0;
      this.angle = $.sub(t3, d);
  }
 },
 setFrom$1: function(other) {
  $.propertyTypeCheck(other, 'is$Sweep');
  this.localCenter.setFrom$1(other.get$localCenter());
  this.centerZero.setFrom$1(other.get$centerZero());
  this.center.setFrom$1(other.get$center());
  this.angleZero = other.get$angleZero();
  this.angle = other.get$angle();
 },
 operator$eq$1: function(other) {
  return $.eqB(this.localCenter, other.get$localCenter()) && $.eqB(this.centerZero, other.get$centerZero()) && $.eqB(this.center, other.get$center()) && $.eqB(this.angleZero, other.get$angleZero()) && $.eqB(this.angle, other.get$angle());
 },
 is$Sweep: true
};

$$.Transform = {"":
 ["rotation?", "position?"],
 super: "Object",
 setFrom$1: function(other) {
  $.propertyTypeCheck(other, 'is$Transform');
  this.position.setFrom$1(other.get$position());
  this.rotation.setFrom$1(other.get$rotation());
 },
 operator$eq$1: function(other) {
  if (other == null) return false;
  return $.eqB(this.position, other.get$position()) && $.eqB(this.rotation, other.get$rotation());
 },
 is$Transform: true
};

$$.Vector = {"":
 ["y=", "x="],
 super: "Object",
 toString$0: function() {
  return '(' + $.S(this.x) + ', ' + $.S(this.y) + ')';
 },
 negateLocal$0: function() {
  var t1 = this.x;
  if (typeof t1 !== 'number') return this.negateLocal$0$bailout(1, t1);
  this.x = -t1;
  var t2 = this.y;
  if (typeof t2 !== 'number') return this.negateLocal$0$bailout(2, t2);
  this.y = -t2;
  return this;
 },
 negateLocal$0$bailout: function(state, env0) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t2 = env0;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.x;
    case 1:
      state = 0;
      this.x = $.neg(t1);
      var t2 = this.y;
    case 2:
      state = 0;
      this.y = $.neg(t2);
      return this;
  }
 },
 normalize$0: function() {
  var len = $.numTypeCheck($.get$length(this));
  if ($.ltB(len, 1.192e-7)) return 0;
  if (typeof len !== 'number') throw $.iae(len);
  var invLength = 1.0 / len;
  this.x = $.mul(this.x, invLength);
  this.y = $.mul(this.y, invLength);
  return len;
 },
 absLocal$0: function() {
  this.x = $.abs(this.x);
  this.y = $.abs(this.y);
 },
 get$lengthSquared: function() {
  var t1 = this.x;
  t1 = $.mul(t1, t1);
  var t2 = this.y;
  return $.add(t1, $.mul(t2, t2));
 },
 get$length: function() {
  return $.Math_sqrt(this.get$lengthSquared());
 },
 setZero$0: function() {
  this.setCoords$2(0, 0);
  return this;
 },
 mulLocal$1: function(d) {
  $.numTypeCheck(d);
  if (typeof d !== 'number') return this.mulLocal$1$bailout(1, d, 0);
  var t1 = this.x;
  if (typeof t1 !== 'number') return this.mulLocal$1$bailout(2, d, t1);
  this.x = t1 * d;
  var t2 = this.y;
  if (typeof t2 !== 'number') return this.mulLocal$1$bailout(3, t2, d);
  this.y = t2 * d;
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
      t2 = env0;
      d = env1;
      break;
  }
  switch (state) {
    case 0:
      $.numTypeCheck(d);
    case 1:
      state = 0;
      var t1 = this.x;
    case 2:
      state = 0;
      this.x = $.mul(t1, d);
      var t2 = this.y;
    case 3:
      state = 0;
      this.y = $.mul(t2, d);
      return this;
  }
 },
 setFrom$1: function(v) {
  $.propertyTypeCheck(v, 'is$Vector');
  this.setCoords$2(v.get$x(), v.get$y());
  return this;
 },
 setCoords$2: function(xCoord, yCoord) {
  $.numTypeCheck(xCoord);
  $.numTypeCheck(yCoord);
  this.x = xCoord;
  this.y = yCoord;
  return this;
 },
 subLocal$1: function(other) {
  $.propertyTypeCheck(other, 'is$Vector');
  var t1 = this.x;
  if (typeof t1 !== 'number') return this.subLocal$1$bailout(1, t1, other, 0);
  var t2 = other.get$x();
  if (typeof t2 !== 'number') return this.subLocal$1$bailout(2, t1, other, t2);
  this.x = t1 - t2;
  var t3 = this.y;
  if (typeof t3 !== 'number') return this.subLocal$1$bailout(3, t3, other, 0);
  var t4 = other.get$y();
  if (typeof t4 !== 'number') return this.subLocal$1$bailout(4, t3, t4, 0);
  this.y = t3 - t4;
  return this;
 },
 subLocal$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      t1 = env0;
      var other = env1;
      break;
    case 2:
      t1 = env0;
      other = env1;
      t2 = env2;
      break;
    case 3:
      t3 = env0;
      other = env1;
      break;
    case 4:
      t3 = env0;
      t4 = env1;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(other, 'is$Vector');
      var t1 = this.x;
    case 1:
      state = 0;
      var t2 = other.get$x();
    case 2:
      state = 0;
      this.x = $.sub(t1, t2);
      var t3 = this.y;
    case 3:
      state = 0;
      var t4 = other.get$y();
    case 4:
      state = 0;
      this.y = $.sub(t3, t4);
      return this;
  }
 },
 addLocal$1: function(v) {
  $.propertyTypeCheck(v, 'is$Vector');
  var t1 = this.x;
  if (typeof t1 !== 'number') return this.addLocal$1$bailout(1, t1, v, 0);
  var t2 = v.get$x();
  if (typeof t2 !== 'number') return this.addLocal$1$bailout(2, t1, v, t2);
  this.x = t1 + t2;
  var t3 = this.y;
  if (typeof t3 !== 'number') return this.addLocal$1$bailout(3, t3, v, 0);
  var t4 = v.get$y();
  if (typeof t4 !== 'number') return this.addLocal$1$bailout(4, t3, t4, 0);
  this.y = t3 + t4;
  return this;
 },
 addLocal$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      t1 = env0;
      var v = env1;
      break;
    case 2:
      t1 = env0;
      v = env1;
      t2 = env2;
      break;
    case 3:
      t3 = env0;
      v = env1;
      break;
    case 4:
      t3 = env0;
      t4 = env1;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(v, 'is$Vector');
      var t1 = this.x;
    case 1:
      state = 0;
      var t2 = v.get$x();
    case 2:
      state = 0;
      this.x = $.add(t1, t2);
      var t3 = this.y;
    case 3:
      state = 0;
      var t4 = v.get$y();
    case 4:
      state = 0;
      this.y = $.add(t3, t4);
      return this;
  }
 },
 operator$eq$1: function(other) {
  if (other == null) return false;
  return $.eqB(this.x, other.get$x()) && $.eqB(this.y, other.get$y());
 },
 is$Vector: true
};

$$.Vector3 = {"":
 ["z=", "y=", "x="],
 super: "Object",
 toString$0: function() {
  return '(' + $.S(this.x) + ', ' + $.S(this.y) + ', ' + $.S(this.z) + ')';
 },
 setZero$0: function() {
  this.x = 0;
  this.y = 0;
  this.z = 0;
 },
 negateLocal$0: function() {
  var t1 = this.x;
  if (typeof t1 !== 'number') return this.negateLocal$0$bailout(1, t1);
  this.x = -t1;
  var t2 = this.y;
  if (typeof t2 !== 'number') return this.negateLocal$0$bailout(2, t2);
  this.y = -t2;
  var t3 = this.z;
  if (typeof t3 !== 'number') return this.negateLocal$0$bailout(3, t3);
  this.z = -t3;
  return this;
 },
 negateLocal$0$bailout: function(state, env0) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t2 = env0;
      break;
    case 3:
      t3 = env0;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.x;
    case 1:
      state = 0;
      this.x = $.neg(t1);
      var t2 = this.y;
    case 2:
      state = 0;
      this.y = $.neg(t2);
      var t3 = this.z;
    case 3:
      state = 0;
      this.z = $.neg(t3);
      return this;
  }
 },
 mulLocal$1: function(argScalar) {
  $.numTypeCheck(argScalar);
  if (typeof argScalar !== 'number') return this.mulLocal$1$bailout(1, argScalar, 0);
  var t1 = this.x;
  if (typeof t1 !== 'number') return this.mulLocal$1$bailout(2, t1, argScalar);
  this.x = t1 * argScalar;
  var t2 = this.y;
  if (typeof t2 !== 'number') return this.mulLocal$1$bailout(3, argScalar, t2);
  this.y = t2 * argScalar;
  var t3 = this.z;
  if (typeof t3 !== 'number') return this.mulLocal$1$bailout(4, argScalar, t3);
  this.z = t3 * argScalar;
  return this;
 },
 mulLocal$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      var argScalar = env0;
      break;
    case 2:
      t1 = env0;
      argScalar = env1;
      break;
    case 3:
      argScalar = env0;
      t2 = env1;
      break;
    case 4:
      argScalar = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      $.numTypeCheck(argScalar);
    case 1:
      state = 0;
      var t1 = this.x;
    case 2:
      state = 0;
      this.x = $.mul(t1, argScalar);
      var t2 = this.y;
    case 3:
      state = 0;
      this.y = $.mul(t2, argScalar);
      var t3 = this.z;
    case 4:
      state = 0;
      this.z = $.mul(t3, argScalar);
      return this;
  }
 },
 subLocal$1: function(argVec) {
  $.propertyTypeCheck(argVec, 'is$Vector3');
  var t1 = this.x;
  if (typeof t1 !== 'number') return this.subLocal$1$bailout(1, argVec, t1, 0);
  var t2 = argVec.get$x();
  if (typeof t2 !== 'number') return this.subLocal$1$bailout(2, argVec, t1, t2);
  this.x = t1 - t2;
  var t3 = this.y;
  if (typeof t3 !== 'number') return this.subLocal$1$bailout(3, argVec, t3, 0);
  var t4 = argVec.get$y();
  if (typeof t4 !== 'number') return this.subLocal$1$bailout(4, t4, argVec, t3);
  this.y = t3 - t4;
  var t5 = this.z;
  if (typeof t5 !== 'number') return this.subLocal$1$bailout(5, t5, argVec, 0);
  var t6 = argVec.get$z();
  if (typeof t6 !== 'number') return this.subLocal$1$bailout(6, t5, t6, 0);
  this.z = t5 - t6;
  return this;
 },
 subLocal$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var argVec = env0;
      t1 = env1;
      break;
    case 2:
      argVec = env0;
      t1 = env1;
      t2 = env2;
      break;
    case 3:
      argVec = env0;
      t3 = env1;
      break;
    case 4:
      t4 = env0;
      argVec = env1;
      t3 = env2;
      break;
    case 5:
      t5 = env0;
      argVec = env1;
      break;
    case 6:
      t5 = env0;
      t6 = env1;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(argVec, 'is$Vector3');
      var t1 = this.x;
    case 1:
      state = 0;
      var t2 = argVec.get$x();
    case 2:
      state = 0;
      this.x = $.sub(t1, t2);
      var t3 = this.y;
    case 3:
      state = 0;
      var t4 = argVec.get$y();
    case 4:
      state = 0;
      this.y = $.sub(t3, t4);
      var t5 = this.z;
    case 5:
      state = 0;
      var t6 = argVec.get$z();
    case 6:
      state = 0;
      this.z = $.sub(t5, t6);
      return this;
  }
 },
 add$1: function(argVec) {
  $.propertyTypeCheck(argVec, 'is$Vector3');
  var t1 = this.x;
  if (typeof t1 !== 'number') return this.add$1$bailout(1, argVec, t1, 0, 0);
  var t2 = argVec.get$x();
  if (typeof t2 !== 'number') return this.add$1$bailout(2, argVec, t1, t2, 0);
  t2 += t1;
  t1 = this.y;
  if (typeof t1 !== 'number') return this.add$1$bailout(3, t2, argVec, t1, 0);
  var t3 = argVec.get$y();
  if (typeof t3 !== 'number') return this.add$1$bailout(4, t2, t3, argVec, t1);
  t3 += t1;
  t1 = this.z;
  if (typeof t1 !== 'number') return this.add$1$bailout(5, t2, argVec, t3, t1);
  var t4 = argVec.get$z();
  if (typeof t4 !== 'number') return this.add$1$bailout(6, t2, t3, t1, t4);
  return $.Vector3$(t2, t3, t1 + t4);
 },
 add$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var argVec = env0;
      t1 = env1;
      break;
    case 2:
      argVec = env0;
      t1 = env1;
      t2 = env2;
      break;
    case 3:
      t2 = env0;
      argVec = env1;
      t1 = env2;
      break;
    case 4:
      t2 = env0;
      t3 = env1;
      argVec = env2;
      t1 = env3;
      break;
    case 5:
      t2 = env0;
      argVec = env1;
      t3 = env2;
      t1 = env3;
      break;
    case 6:
      t2 = env0;
      t3 = env1;
      t1 = env2;
      t4 = env3;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(argVec, 'is$Vector3');
      var t1 = this.x;
    case 1:
      state = 0;
      var t2 = argVec.get$x();
    case 2:
      state = 0;
      t2 = $.add(t1, t2);
      t1 = this.y;
    case 3:
      state = 0;
      var t3 = argVec.get$y();
    case 4:
      state = 0;
      t3 = $.add(t1, t3);
      t1 = this.z;
    case 5:
      state = 0;
      var t4 = argVec.get$z();
    case 6:
      state = 0;
      return $.Vector3$(t2, t3, $.add(t1, t4));
  }
 },
 addLocal$1: function(argVec) {
  $.propertyTypeCheck(argVec, 'is$Vector3');
  var t1 = this.x;
  if (typeof t1 !== 'number') return this.addLocal$1$bailout(1, argVec, t1, 0);
  var t2 = argVec.get$x();
  if (typeof t2 !== 'number') return this.addLocal$1$bailout(2, argVec, t1, t2);
  this.x = t1 + t2;
  var t3 = this.y;
  if (typeof t3 !== 'number') return this.addLocal$1$bailout(3, argVec, t3, 0);
  var t4 = argVec.get$y();
  if (typeof t4 !== 'number') return this.addLocal$1$bailout(4, t4, argVec, t3);
  this.y = t3 + t4;
  var t5 = this.z;
  if (typeof t5 !== 'number') return this.addLocal$1$bailout(5, t5, argVec, 0);
  var t6 = argVec.get$z();
  if (typeof t6 !== 'number') return this.addLocal$1$bailout(6, t5, t6, 0);
  this.z = t5 + t6;
  return this;
 },
 addLocal$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var argVec = env0;
      t1 = env1;
      break;
    case 2:
      argVec = env0;
      t1 = env1;
      t2 = env2;
      break;
    case 3:
      argVec = env0;
      t3 = env1;
      break;
    case 4:
      t4 = env0;
      argVec = env1;
      t3 = env2;
      break;
    case 5:
      t5 = env0;
      argVec = env1;
      break;
    case 6:
      t5 = env0;
      t6 = env1;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(argVec, 'is$Vector3');
      var t1 = this.x;
    case 1:
      state = 0;
      var t2 = argVec.get$x();
    case 2:
      state = 0;
      this.x = $.add(t1, t2);
      var t3 = this.y;
    case 3:
      state = 0;
      var t4 = argVec.get$y();
    case 4:
      state = 0;
      this.y = $.add(t3, t4);
      var t5 = this.z;
    case 5:
      state = 0;
      var t6 = argVec.get$z();
    case 6:
      state = 0;
      this.z = $.add(t5, t6);
      return this;
  }
 },
 setCoords$3: function(argX, argY, argZ) {
  $.numTypeCheck(argX);
  $.numTypeCheck(argY);
  $.numTypeCheck(argZ);
  this.x = argX;
  this.y = argY;
  this.z = argZ;
  return this;
 },
 setFrom$1: function(argVec) {
  $.propertyTypeCheck(argVec, 'is$Vector3');
  this.x = argVec.get$x();
  this.y = argVec.get$y();
  this.z = argVec.get$z();
  return this;
 },
 operator$eq$1: function(other) {
  if (!(other == null) && ((typeof other === 'object' && other !== null) && !!other.is$Vector3)) {
    return $.eqB(this.x, other.get$x()) && $.eqB(this.y, other.get$y()) && $.eqB(this.z, other.get$z());
  }
  return false;
 },
 is$Vector3: true
};

$$._ListWrapper = {"":
 [],
 super: "Object",
 setRange$4: function(start, rangeLength, from, startFrom) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  $.listTypeCheck(from);
  $.intTypeCheck(startFrom);
  return $.setRange$4(this._list, start, rangeLength, from, startFrom);
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,0)
},
 getRange$2: function(start, rangeLength) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  return $.getRange(this._list, start, rangeLength);
 },
 removeLast$0: function() {
  return $.removeLast(this._list);
 },
 clear$0: function() {
  return $.clear(this._list);
 },
 indexOf$2: function(element, start) {
  $.intTypeCheck(start);
  return $.indexOf$2(this._list, element, start);
 },
 sort$1: function(compare) {
  return $.sort(this._list, compare);
 },
 addLast$1: function(value) {
  return $.addLast(this._list, value);
 },
 add$1: function(value) {
  return $.add$1(this._list, value);
 },
 set$length: function(newLength) {
  $.intTypeCheck(newLength);
  $.set$length(this._list, newLength);
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.indexSet(this._list, index, value);
 },
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  return $.index(this._list, index);
 },
 get$length: function() {
  return $.get$length(this._list);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._list);
 },
 forEach$1: function(f) {
  return $.forEach(this._list, f);
 },
 iterator$0: function() {
  return $.iterator(this._list);
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
};

$$._NodeListWrapper = {"":
 ["_list"],
 super: "_ListWrapper",
 getRange$2: function(start, rangeLength) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  return $._NodeListWrapper$($.getRange(this._list, start, rangeLength));
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
};

$$._FixedSizeListIterator = {"":
 ["_lib_length", "_pos", "_array"],
 super: "_VariableSizeListIterator",
 hasNext$0: function() {
  var t1 = this._lib_length;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1, 0);
  var t2 = this._pos;
  if (typeof t2 !== 'number') return this.hasNext$0$bailout(2, t1, t2);
  return t1 > t2;
 },
 hasNext$0$bailout: function(state, env0, env1) {
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
      var t1 = this._lib_length;
    case 1:
      state = 0;
      var t2 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t2);
  }
 }
};

$$._VariableSizeListIterator = {"":
 [],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC1);
  var t1 = this._array;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior())) return this.next$0$bailout(1, t1);
  var t2 = this._pos;
  this._pos = t2 + 1;
  if (t2 !== (t2 | 0)) throw $.iae(t2);
  var t3 = t1.length;
  if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
  return t1[t2];
 },
 next$0$bailout: function(state, t1) {
  var t2 = this._pos;
  this._pos = t2 + 1;
  return $.index(t1, t2);
 },
 get$next: function() { return new $.BoundClosure(this, 'next$0'); },
 hasNext$0: function() {
  var t1 = $.get$length(this._array);
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1, 0);
  var t2 = this._pos;
  if (typeof t2 !== 'number') return this.hasNext$0$bailout(2, t2, t1);
  return t1 > t2;
 },
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t2 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = $.get$length(this._array);
    case 1:
      state = 0;
      var t2 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t2);
  }
 },
 is$Iterator: true
};

$$._MessageTraverserVisitedMap = {"":
 [],
 super: "Object",
 cleanup$0: function() {
 },
 reset$0: function() {
 },
 operator$indexSet$2: function(object, info) {
 },
 operator$index$1: function(object) {
  return;
 }
};

$$._MessageTraverser = {"":
 [],
 super: "Object",
 _dispatch$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x) === true) return this.visitPrimitive$1(x);
  if (typeof x === 'object' && x !== null && (x.constructor === Array || x.is$List())) return this.visitList$1(x);
  if (typeof x === 'object' && x !== null && x.is$Map()) return this.visitMap$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPort) return this.visitSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPortSync) return this.visitSendPortSync$1(x);
  throw $.captureStackTrace('Message serialization: Illegal value ' + $.S(x) + ' passed');
 },
 traverse$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x) === true) return this.visitPrimitive$1(x);
  var t1 = this._visited;
  t1.reset$0();
  var result = null;
  try {
    result = this._dispatch$1(x);
  } finally {
    t1.cleanup$0();
  }
  return result;
 }
};

$$._Copier = {"":
 [],
 super: "_MessageTraverser",
 visitMap$1: function(map) {
  var t1 = ({});
  $.callTypeCheck(map, 'is$Map');
  var t2 = this._visited;
  t1.copy_1 = $.callTypeCheck($.index(t2, map), 'is$Map');
  var t3 = t1.copy_1;
  if (!(t3 == null)) return t3;
  t1.copy_1 = $.callTypeCheck($.HashMapImplementation$(), 'is$Map');
  $.indexSet(t2, map, t1.copy_1);
  $.forEach(map, new $._Copier_visitMap_anon(this, t1));
  return t1.copy_1;
 },
 visitList$1: function(list) {
  $.listTypeCheck(list);
  var t1 = this._visited;
  var copy = $.listTypeCheck($.index(t1, list));
  if (!(copy == null)) return copy;
  var len = $.intTypeCheck($.get$length(list));
  copy = $.ListFactory_List(len);
  $.indexSet(t1, list, copy);
  for (var i = 0; $.ltB(i, len); i = $.intTypeCheck($.add(i, 1))) {
    t1 = this._dispatch$1($.index(list, i));
    if (i !== (i | 0)) throw $.iae(i);
    var t2 = copy.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    copy[i] = t1;
  }
  return copy;
 },
 visitPrimitive$1: function(x) {
  return x;
 }
};

$$._Serializer = {"":
 [],
 super: "_MessageTraverser",
 _serializeList$1: function(list) {
  $.listTypeCheck(list);
  var len = $.intTypeCheck($.get$length(list));
  var result = $.ListFactory_List(len);
  for (var i = 0; $.ltB(i, len); i = $.intTypeCheck($.add(i, 1))) {
    var t1 = this._dispatch$1($.index(list, i));
    if (i !== (i | 0)) throw $.iae(i);
    var t2 = result.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    result[i] = t1;
  }
  return result;
 },
 visitMap$1: function(map) {
  $.callTypeCheck(map, 'is$Map');
  var t1 = this._visited;
  var copyId = $.intTypeCheck($.index(t1, map));
  if (!(copyId == null)) return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = id + 1;
  $.intTypeCheck(id);
  $.indexSet(t1, map, id);
  return ['map', id, this._serializeList$1(map.getKeys$0()), this._serializeList$1(map.getValues$0())];
 },
 visitList$1: function(list) {
  $.listTypeCheck(list);
  var t1 = this._visited;
  var copyId = $.intTypeCheck($.index(t1, list));
  if (!(copyId == null)) return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = id + 1;
  $.intTypeCheck(id);
  $.indexSet(t1, list, id);
  return ['list', id, this._serializeList$1(list)];
 },
 visitPrimitive$1: function(x) {
  return x;
 }
};

$$._Manager = {"":
 ["managers", "mainManager?", "isolates?", "supportsWorkers", "isWorker?", "fromCommandLine?", "topEventLoop?", "rootContext=", "currentContext=", "nextManagerId", "currentManagerId?", "nextIsolateId="],
 super: "Object",
 maybeCloseWorker$0: function() {
  $.isEmpty(this.isolates) === true && this.mainManager.postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'close'])));
 },
 _nativeInitWorkerMessageHandler$0: function() {
      $globalThis.onmessage = function (e) {
      _IsolateNatives._processWorkerMessage(this.mainManager, e);
    }
  ;
 },
 _nativeDetectEnvironment$0: function() {
      this.isWorker = $isWorker;
    this.supportsWorkers = $supportsWorkers;
    this.fromCommandLine = typeof(window) == 'undefined';
  ;
 },
 get$needSerialization: function() {
  return this.get$useWorkers();
 },
 get$useWorkers: function() {
  return this.supportsWorkers;
 },
 _Manager$0: function() {
  this._nativeDetectEnvironment$0();
  this.topEventLoop = $._EventLoop$();
  this.isolates = $.HashMapImplementation$();
  this.managers = $.HashMapImplementation$();
  if (this.isWorker === true) {
    this.mainManager = $._MainManagerStub$();
    this._nativeInitWorkerMessageHandler$0();
  }
 },
 is$_Manager: true
};

$$._IsolateContext = {"":
 ["isolateStatics", "ports?", "id?"],
 super: "Object",
 _setGlobals$0: function() {
  $setGlobals(this);;
 },
 eval$1: function(code) {
  $.functionTypeCheck(code);
  var old = $._globalState0().get$currentContext();
  $._globalState0().set$currentContext(this);
  this._setGlobals$0();
  var result = null;
  try {
    result = code.$call$0();
  } finally {
    var t1 = old;
    $._globalState0().set$currentContext(t1);
    t1 = old;
    !(t1 == null) && t1._setGlobals$0();
  }
  return result;
 },
 initGlobals$0: function() {
  $initGlobals(this);;
 },
 _IsolateContext$0: function() {
  var t1 = $._globalState0();
  var t2 = t1.get$nextIsolateId();
  t1.set$nextIsolateId($.add(t2, 1));
  this.id = t2;
  this.ports = $.HashMapImplementation$();
  this.initGlobals$0();
 },
 is$_IsolateContext: true
};

$$._EventLoop = {"":
 ["events"],
 super: "Object",
 run$0: function() {
  if ($._globalState0().get$isWorker() !== true) this._runHelper$0();
  else {
    try {
      this._runHelper$0();
    } catch (exception) {
      var t1 = $.unwrapException(exception);
      var e = t1;
      var trace = $.getTraceFromException(exception);
      $._globalState0().get$mainManager().postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'error', 'msg', $.S(e) + '\n' + $.S(trace)])));
    }
  }
 },
 _runHelper$0: function() {
  var t1 = $._window();
  if (!(t1 == null)) new $._EventLoop__runHelper_next(this).$call$0();
  else {
    for (; this.runIteration$0() === true; ) {
    }
  }
 },
 runIteration$0: function() {
  var event$ = this.dequeue$0();
  if (event$ == null) {
    if ($._globalState0().get$isWorker() === true) $._globalState0().maybeCloseWorker$0();
    else {
      var t1 = $._globalState0().get$rootContext();
      if (!(t1 == null) && $._globalState0().get$isolates().containsKey$1($._globalState0().get$rootContext().get$id()) === true && $._globalState0().get$fromCommandLine() === true && $.isEmpty($._globalState0().get$rootContext().get$ports()) === true) throw $.captureStackTrace($.ExceptionImplementation$('Program exited with open ReceivePorts.'));
    }
    return false;
  }
  event$.process$0();
  return true;
 },
 dequeue$0: function() {
  var t1 = this.events;
  if ($.isEmpty(t1) === true) return;
  return t1.removeFirst$0();
 }
};

$$._MainManagerStub = {"":
 [],
 super: "Object",
 postMessage$1: function(msg) {
  $globalThis.postMessage(msg);;
 },
 get$id: function() {
  return 0;
 }
};

$$._BaseSendPort = {"":
 ["_isolateId?"],
 super: "Object",
 is$SendPort: true
};

$$._NativeJsSendPort = {"":
 ["_receivePort?", "_isolateId"],
 super: "_BaseSendPort",
 hashCode$0: function() {
  return this._receivePort.get$_id();
 },
 operator$eq$1: function(other) {
  return typeof other === 'object' && other !== null && !!other.is$_NativeJsSendPort && $.eqB(this._receivePort, other._receivePort);
 },
 is$_NativeJsSendPort: true,
 is$SendPort: true
};

$$._WorkerSendPort = {"":
 ["_receivePortId?", "_workerId?", "_isolateId"],
 super: "_BaseSendPort",
 hashCode$0: function() {
  var t1 = this._workerId << 16;
  var t2 = $.shl(this._isolateId, 8);
  if (typeof t2 !== 'number') throw $.iae(t2);
  t2 = t1 ^ t2;
  t1 = this._receivePortId;
  if (typeof t1 !== 'number') throw $.iae(t1);
  return (t2 ^ t1) >>> 0;
 },
 operator$eq$1: function(other) {
  return typeof other === 'object' && other !== null && !!other.is$_WorkerSendPort && $.eqB(this._workerId, other._workerId) && $.eqB(this._isolateId, other.get$_isolateId()) && $.eqB(this._receivePortId, other.get$_receivePortId());
 },
 is$_WorkerSendPort: true,
 is$SendPort: true
};

$$._JsSerializer = {"":
 ["_nextFreeRefId", "_visited"],
 super: "_Serializer",
 visitBufferingSendPort$1: function(port) {
  $.propertyTypeCheck(port, 'is$_BufferingSendPort');
  var t1 = port.get$_port();
  if (!(t1 == null)) return this.visitSendPort$1(port.get$_port());
  throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
 },
 visitWorkerSendPort$1: function(port) {
  $.propertyTypeCheck(port, 'is$_WorkerSendPort');
  return ['sendport', port.get$_workerId(), port.get$_isolateId(), port.get$_receivePortId()];
 },
 visitNativeJsSendPort$1: function(port) {
  $.propertyTypeCheck(port, 'is$_NativeJsSendPort');
  return ['sendport', $._globalState0().get$currentManagerId(), port.get$_isolateId(), port.get$_receivePort().get$_id()];
 },
 visitSendPort$1: function(x) {
  $.propertyTypeCheck(x, 'is$SendPort');
  if (typeof x === 'object' && x !== null && !!x.is$_NativeJsSendPort) return this.visitNativeJsSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_WorkerSendPort) return this.visitWorkerSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_BufferingSendPort) return this.visitBufferingSendPort$1(x);
  throw $.captureStackTrace('Illegal underlying port ' + $.S(x));
 },
 _JsSerializer$0: function() {
  this._visited = $._JsVisitedMap$();
 }
};

$$._JsCopier = {"":
 ["_visited"],
 super: "_Copier",
 visitBufferingSendPort$1: function(port) {
  $.propertyTypeCheck(port, 'is$_BufferingSendPort');
  var t1 = port.get$_port();
  if (!(t1 == null)) return this.visitSendPort$1(port.get$_port());
  throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
 },
 visitWorkerSendPort$1: function(port) {
  $.propertyTypeCheck(port, 'is$_WorkerSendPort');
  return $._WorkerSendPort$(port.get$_workerId(), port.get$_isolateId(), port.get$_receivePortId());
 },
 visitNativeJsSendPort$1: function(port) {
  $.propertyTypeCheck(port, 'is$_NativeJsSendPort');
  return $._NativeJsSendPort$(port.get$_receivePort(), port.get$_isolateId());
 },
 visitSendPort$1: function(x) {
  $.propertyTypeCheck(x, 'is$SendPort');
  if (typeof x === 'object' && x !== null && !!x.is$_NativeJsSendPort) return this.visitNativeJsSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_WorkerSendPort) return this.visitWorkerSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_BufferingSendPort) return this.visitBufferingSendPort$1(x);
  throw $.captureStackTrace('Illegal underlying port ' + $.S(this.get$p()));
 },
 _JsCopier$0: function() {
  this._visited = $._JsVisitedMap$();
 }
};

$$._JsVisitedMap = {"":
 ["tagged"],
 super: "Object",
 _getAttachedInfo$1: function(o) {
  return o['__MessageTraverser__attached_info__'];;
 },
 _setAttachedInfo$2: function(o, info) {
  o['__MessageTraverser__attached_info__'] = info;;
 },
 _clearAttachedInfo$1: function(o) {
  o['__MessageTraverser__attached_info__'] = (void 0);;
 },
 cleanup$0: function() {
  for (var length$ = $.intTypeCheck($.get$length(this.tagged)), i = 0; $.ltB(i, length$); i = $.intTypeCheck($.add(i, 1))) {
    this._clearAttachedInfo$1($.index(this.tagged, i));
  }
  this.tagged = null;
 },
 reset$0: function() {
  var t1 = this.tagged;
  $.assert(t1 == null);
  this.tagged = $.ListFactory_List(null);
 },
 operator$indexSet$2: function(object, info) {
  $.add$1(this.tagged, object);
  this._setAttachedInfo$2(object, info);
 },
 operator$index$1: function(object) {
  return this._getAttachedInfo$1(object);
 }
};

$$.Maps__emitMap_anon = {"":
 ["result_3", "box_0", "visiting_2"],
 super: "Closure",
 $call$2: function(k, v) {
  this.box_0.first_1 !== true && $.add$1(this.result_3, ', ');
  this.box_0.first_1 = false;
  $.Collections__emitObject(k, this.result_3, this.visiting_2);
  $.add$1(this.result_3, ': ');
  $.Collections__emitObject(v, this.result_3, this.visiting_2);
 }
};

$$.DoubleLinkedQueue_length__ = {"":
 ["box_0"],
 super: "Closure",
 $call$1: function(element) {
  var counter = $.intTypeCheck($.add(this.box_0.counter_1, 1));
  this.box_0.counter_1 = counter;
 }
};

$$.BroadPhase_updatePairs_anon = {"":
 [],
 super: "Closure",
 $call$2: function(a, b) {
  return $.compareTo(a, b);
 }
};

$$.HashSetImplementation_forEach__ = {"":
 ["f_0"],
 super: "Closure",
 $call$2: function(key, value) {
  this.f_0.$call$1(key);
 }
};

$$.LinkedHashMapImplementation_forEach__ = {"":
 ["f_0"],
 super: "Closure",
 $call$1: function(entry) {
  $.propertyTypeCheck(entry, 'is$KeyValuePair');
  this.f_0.$call$2(entry.get$key(), entry.get$value());
 }
};

$$._StorageImpl_getValues_anon = {"":
 ["values_0"],
 super: "Closure",
 $call$2: function(k, v) {
  return $.add$1(this.values_0, v);
 }
};

$$.HashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0.i_1;
  var i = $.intTypeCheck($.add(t2, 1));
  this.box_0.i_1 = i;
  $.indexSet(t1, t2, value);
 }
};

$$.LinkedHashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$1: function(entry) {
  $.propertyTypeCheck(entry, 'is$KeyValuePair');
  var t1 = this.list_2;
  var t2 = this.box_0.index_1;
  var index = $.intTypeCheck($.add(t2, 1));
  this.box_0.index_1 = index;
  $.indexSet(t1, t2, entry.get$value());
 }
};

$$._StorageImpl_getKeys_anon = {"":
 ["keys_0"],
 super: "Closure",
 $call$2: function(k, v) {
  return $.add$1(this.keys_0, k);
 }
};

$$.HashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0.i_10;
  var i = $.intTypeCheck($.add(t2, 1));
  this.box_0.i_10 = i;
  $.indexSet(t1, t2, key);
 }
};

$$.LinkedHashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$1: function(entry) {
  $.propertyTypeCheck(entry, 'is$KeyValuePair');
  var t1 = this.list_2;
  var t2 = this.box_0.index_10;
  var index = $.intTypeCheck($.add(t2, 1));
  this.box_0.index_10 = index;
  $.indexSet(t1, t2, entry.get$key());
 }
};

$$._Copier_visitMap_anon = {"":
 ["this_2", "box_0"],
 super: "Closure",
 $call$2: function(key, val) {
  $.indexSet(this.box_0.copy_1, this.this_2._dispatch$1(key), this.this_2._dispatch$1(val));
 }
};

$$._EventLoop__runHelper_next = {"":
 ["this_0"],
 super: "Closure",
 $call$0: function() {
  if (this.this_0.runIteration$0() !== true) return;
  $._window().setTimeout$2(this, 0);
 }
};

$$.invokeClosure_anon = {"":
 ["closure_0"],
 super: "Closure",
 $call$0: function() {
  return this.closure_0.$call$0();
 }
};

$$.invokeClosure_anon0 = {"":
 ["closure_2", "arg1_1"],
 super: "Closure",
 $call$0: function() {
  return this.closure_2.$call$1(this.arg1_1);
 }
};

$$.invokeClosure_anon1 = {"":
 ["closure_5", "arg1_4", "arg2_3"],
 super: "Closure",
 $call$0: function() {
  return this.closure_5.$call$2(this.arg1_4, this.arg2_3);
 }
};

$$.Closure = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Closure';
 },
 is$Function: true
};

Isolate.$defineClass('BoundClosure', 'Closure', ['self', 'target'], {
$call$0: function() { return this.self[this.target](); }
});
Isolate.$defineClass('BoundClosure0', 'Closure', ['self', 'target'], {
$call$3: function(p0, p1, p2) { return this.self[this.target](p0, p1, p2); }
});
Isolate.$defineClass('BoundClosure1', 'Closure', ['self', 'target'], {
$call$2: function(p0, p1) { return this.self[this.target](p0, p1); }
});
Isolate.$defineClass('BoundClosure2', 'Closure', ['self', 'target'], {
$call$1: function(p0) { return this.self[this.target](p0); },
 $call$0: function() {
  return this.$call$1(null)
}
});
Isolate.$defineClass('BoundClosure3', 'Closure', ['self', 'target'], {
$call$1: function(p0) { return this.self[this.target](p0); },
 $call$0: function() {
  return this.$call$1(null)
}
});
$.mul$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a * b;
  return a.operator$mul$1(b);
};

$.startRootIsolate = function(entry) {
  var t1 = $._Manager$();
  $._globalState(t1);
  if ($._globalState0().get$isWorker() === true) return;
  var rootContext = $._IsolateContext$();
  $._globalState0().set$rootContext(rootContext);
  $._fillStatics(rootContext);
  $._globalState0().set$currentContext(rootContext);
  rootContext.eval$1(entry);
  $._globalState0().get$topEventLoop().run$0();
};

$.setRange$3 = function(receiver, start, length$, from) {
  if ($.isJsArray(receiver) === true) return $.setRange$4(receiver, start, length$, from, 0);
  return receiver.setRange$3(start, length$, from);
};

$._window = function() {
  return typeof window != 'undefined' ? window : (void 0);;
};

$.intTypeCheck = function(value) {
  if (value == null) return value;
  if (typeof value === 'number' && value === (value | 0)) return value;
  throw $.captureStackTrace($.TypeError$($.S(value) + ' does not implement int'));
};

$.floor = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.floor$0();
  return Math.floor(receiver);
};

$.eqB = function(a, b) {
  if (a == null) return b == null;
  if (b == null) return false;
  if (typeof a === "object") {
    if (!!a.operator$eq$1) {
      var t1 = a.operator$eq$1(b);
      return t1 === true;
    }
  }
  return a === b;
};

$.Vector_crossVectorAndNumToOut = function(a, s, out) {
  $.propertyTypeCheck(a, 'is$Vector');
  $.numTypeCheck(s);
  $.propertyTypeCheck(out, 'is$Vector');
  var tempy = $.numTypeCheck($.mul($.neg(s), a.get$x()));
  out.set$x($.mul(s, a.get$y()));
  out.set$y(tempy);
};

$.Collections__containsRef = function(c, ref) {
  for (var t1 = $.iterator($.listSuperNativeTypeCheck(c, 'is$Collection')); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (t2 == null ? ref == null : t2 === ref) return true;
  }
  return false;
};

$.MathBox_distanceSquared = function(v1, v2) {
  $.propertyTypeCheck(v1, 'is$Vector');
  $.propertyTypeCheck(v2, 'is$Vector');
  var dx = $.numTypeCheck($.sub(v1.get$x(), v2.get$x()));
  var dy = $.numTypeCheck($.sub(v1.get$y(), v2.get$y()));
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
  var t19 = $.Vector$(0, 0);
  return new $.SeparationFunction(t18, t17, t16, $.Vector$(0, 0), t19, t15, t14, t13, t12, t11, t10, t9, t8, t7, t6, t5, t4, t3, 0, t2, t1);
};

$._NodeListWrapper$ = function(list) {
  return new $._NodeListWrapper($.listTypeCheck(list));
};

$.Vector_crossVectors = function(v1, v2) {
  $.propertyTypeCheck(v1, 'is$Vector');
  $.propertyTypeCheck(v2, 'is$Vector');
  return $.sub($.mul(v1.get$x(), v2.get$y()), $.mul(v1.get$y(), v2.get$x()));
};

$.RevoluteJointDef$ = function() {
  var t1 = $.Vector$(0.0, 0.0);
  t1 = new $.RevoluteJointDef(0.0, 0.0, false, 0.0, 0.0, false, 0.0, $.Vector$(0.0, 0.0), t1, false, null, null, null, 0);
  t1.RevoluteJointDef$0();
  return t1;
};

$.isJsArray = function(value) {
  return !(value == null) && (value.constructor === Array);
};

$.indexSet$slow = function(a, index, value) {
  if ($.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0 || $.geB(index, $.get$length(a))) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    $.checkMutable(a, 'indexed set');
    a[index] = value;
    return;
  }
  a.operator$indexSet$2(index, value);
};

$.HashMapImplementation__nextProbe = function(currentProbe, numberOfProbes, length$) {
  $.intTypeCheck(currentProbe);
  $.intTypeCheck(numberOfProbes);
  $.intTypeCheck(length$);
  return $.and($.add(currentProbe, numberOfProbes), $.sub(length$, 1));
};

$.allMatches = function(receiver, str) {
  if (!(typeof receiver === 'string')) return receiver.allMatches$1(str);
  $.checkString(str);
  return $.allMatchesInStringUnchecked(receiver, str);
};

$.CircleShape$copy = function(other) {
  $.propertyTypeCheck(other, 'is$CircleShape');
  var t1 = other.get$type();
  var t2 = other.get$radius();
  return new $.CircleShape($.Vector$copy(other.get$position()), t2, t1);
};

$.substringUnchecked = function(receiver, startIndex, endIndex) {
  return receiver.substring(startIndex, endIndex);
};

$.Vector_maxToOut = function(a, b, out) {
  $.propertyTypeCheck(a, 'is$Vector');
  $.propertyTypeCheck(b, 'is$Vector');
  $.propertyTypeCheck(out, 'is$Vector');
  out.set$x($.gtB(a.get$x(), b.get$x()) ? a.get$x() : b.get$x());
  out.set$y($.gtB(a.get$y(), b.get$y()) ? a.get$y() : b.get$y());
};

$.get$length = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) return receiver.length;
  return receiver.get$length();
};

$.ge$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a >= b;
  return a.operator$ge$1(b);
};

$.TimeOfImpact$_construct = function(argPool) {
  $.propertyTypeCheck(argPool, 'is$DefaultWorldPool');
  var t1 = $.SimplexCache$();
  var t2 = $.DistanceInput$();
  var t3 = $.Transform$();
  var t4 = $.Transform$();
  var t5 = $.DistanceOutput$();
  var t6 = $.SeparationFunction$();
  var t7 = $.ListFactory_List(2);
  $.setRuntimeTypeInfo(t7, ({E: 'int'}));
  var t8 = $.Sweep$();
  t1 = new $.TimeOfImpact(argPool, $.Sweep$(), t8, t7, t6, t5, t4, t3, t2, t1);
  t1.TimeOfImpact$_construct$1(argPool);
  return t1;
};

$.IllegalJSRegExpException$ = function(_pattern, _errmsg) {
  $.stringTypeCheck(_pattern);
  return new $.IllegalJSRegExpException($.stringTypeCheck(_errmsg), _pattern);
};

$.EdgeResults$ = function() {
  return new $.EdgeResults(0, 0);
};

$.Body$ = function(bd, world) {
  $.propertyTypeCheck(bd, 'is$BodyDef');
  $.propertyTypeCheck(world, 'is$World');
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
  t7 = new $.Body($.Vector$(0, 0), t11, t10, t9, t8, t2, t1, null, bd.get$type(), t5, t4, 0, 0, 0, t6, null, 0, null, null, null, null, null, 0, t3, t7, 0, null, 0, world);
  t7.Body$2(bd, world);
  return t7;
};

$.WorldManifold$ = function() {
  var t1 = $.Vector$(0, 0);
  var t2 = $.Vector$(0, 0);
  var t3 = $.Vector$(0, 0);
  var t4 = $.ListFactory_List(2);
  $.setRuntimeTypeInfo(t4, ({E: 'Vector'}));
  t1 = new $.WorldManifold(t3, t2, t4, t1);
  t1.WorldManifold$0();
  return t1;
};

$.Vector$ = function(x, y) {
  return new $.Vector(y, x);
};

$.constructorNameFallback = function(obj) {
  var constructor$ = (obj.constructor);
  var t1 = (typeof(constructor$));
  if (t1 === 'function') {
    var name$ = (constructor$.name);
    t1 = (typeof(name$));
    if (t1 === 'string' && $.isEmpty(name$) !== true && !(name$ === 'Object')) return name$;
  }
  var string = (Object.prototype.toString.call(obj));
  return $.substring$2(string, 8, string.length - 1);
};

$.PolygonAndCircleContact$ = function(argPool) {
  $.propertyTypeCheck(argPool, 'is$DefaultWorldPool');
  var t1 = $.Manifold$();
  var t2 = $.ContactEdge$();
  var t3 = $.ContactEdge$();
  return new $.PolygonAndCircleContact($.Manifold$(), argPool, null, t1, null, null, t3, t2, null, null, null);
};

$.NotImplementedException$ = function(message) {
  return new $.NotImplementedException($.stringTypeCheck(message));
};

$.clear = function(receiver) {
  if ($.isJsArray(receiver) !== true) return receiver.clear$0();
  $.set$length(receiver, 0);
};

$.NullPointerException$ = function(functionName, arguments$) {
  return new $.NullPointerException(arguments$, functionName);
};

$._serializeMessage = function(message) {
  if ($._globalState0().get$needSerialization() === true) return $._JsSerializer$().traverse$1(message);
  return $._JsCopier$().traverse$1(message);
};

$.typeNameInIE = function(obj) {
  var name$ = $.stringTypeCheck($.constructorNameFallback(obj));
  if ($.eqB(name$, 'Window')) return 'DOMWindow';
  if ($.eqB(name$, 'Document')) {
    if (!!obj.xmlVersion) return 'Document';
    return 'HTMLDocument';
  }
  if ($.eqB(name$, 'HTMLTableDataCellElement')) return 'HTMLTableCellElement';
  if ($.eqB(name$, 'HTMLTableHeaderCellElement')) return 'HTMLTableCellElement';
  if ($.eqB(name$, 'MSStyleCSSProperties')) return 'CSSStyleDeclaration';
  if ($.eqB(name$, 'CanvasPixelArray')) return 'Uint8ClampedArray';
  if ($.eqB(name$, 'HTMLPhraseElement')) return 'HTMLElement';
  if ($.eqB(name$, 'MouseWheelEvent')) return 'WheelEvent';
  return name$;
};

$.Math_max = function(a, b) {
  $.numTypeCheck(a);
  $.numTypeCheck(b);
  return $.ltB($.compareTo(a, b), 0) ? b : a;
};

$.tdiv = function(a, b) {
  if ($.checkNumbers(a, b) === true) return $.truncate((a) / (b));
  return a.operator$tdiv$1(b);
};

$.Primitives_printString = function(string) {
  $.stringTypeCheck(string);
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

$.JSSyntaxRegExp$_globalVersionOf = function(other) {
  $.propertyTypeCheck(other, 'is$JSSyntaxRegExp');
  var t1 = other.get$pattern();
  var t2 = other.get$multiLine();
  t1 = new $.JSSyntaxRegExp(other.get$ignoreCase(), t2, t1);
  t1.JSSyntaxRegExp$_globalVersionOf$1(other);
  return t1;
};

$.JointEdge$ = function() {
  return new $.JointEdge(null, null, null, null);
};

$.AxisAlignedBox_testOverlap = function(a, b) {
  $.propertyTypeCheck(a, 'is$AxisAlignedBox');
  $.propertyTypeCheck(b, 'is$AxisAlignedBox');
  var t1 = b.get$lowerBound().get$x();
  if (typeof t1 !== 'number') return $.AxisAlignedBox_testOverlap$bailout(1, t1, a, b, 0);
  var t2 = a.get$upperBound().get$x();
  if (typeof t2 !== 'number') return $.AxisAlignedBox_testOverlap$bailout(2, t1, t2, a, b);
  if (!(t1 > t2)) {
    t1 = b.get$lowerBound().get$y();
    if (typeof t1 !== 'number') return $.AxisAlignedBox_testOverlap$bailout(3, t1, a, b, 0);
    t2 = a.get$upperBound().get$y();
    if (typeof t2 !== 'number') return $.AxisAlignedBox_testOverlap$bailout(4, t1, a, b, t2);
    t2 = t1 > t2;
    t1 = t2;
  } else t1 = true;
  if (!t1) {
    t1 = a.get$lowerBound().get$x();
    if (typeof t1 !== 'number') return $.AxisAlignedBox_testOverlap$bailout(5, t1, a, b, 0);
    t2 = b.get$upperBound().get$x();
    if (typeof t2 !== 'number') return $.AxisAlignedBox_testOverlap$bailout(6, t1, a, b, t2);
    if (!(t1 > t2)) {
      t1 = a.get$lowerBound().get$y();
      if (typeof t1 !== 'number') return $.AxisAlignedBox_testOverlap$bailout(7, t1, b, 0, 0);
      t2 = b.get$upperBound().get$y();
      if (typeof t2 !== 'number') return $.AxisAlignedBox_testOverlap$bailout(8, t1, t2, 0, 0);
      t2 = t1 > t2;
      t1 = t2;
    } else t1 = true;
  } else t1 = true;
  return !t1;
};

$.typeNameInChrome = function(obj) {
  var name$ = (obj.constructor.name);
  if (name$ === 'Window') return 'DOMWindow';
  if (name$ === 'CanvasPixelArray') return 'Uint8ClampedArray';
  return name$;
};

$.regExpMatchStart = function(m) {
  return m.index;
};

$.Math_sqrt = function(x) {
  return $.MathNatives_sqrt($.numTypeCheck(x));
};

$.MathNatives_sqrt = function(value) {
  return Math.sqrt($.checkNum($.numTypeCheck(value)));
};

$.shr = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    a = (a);
    b = (b);
    if (b < 0) throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (a > 0) {
      if (b > 31) return 0;
      return a >>> b;
    }
    if (b > 31) b = 31;
    return (a >> b) >>> 0;
  }
  return a.operator$shr$1(b);
};

$.DualPivotQuicksort__dualPivotQuicksort = function(a, left, right, compare) {
  $.listTypeCheck(a);
  if (typeof a !== 'object' || a === null || ((a.constructor !== Array || !!a.immutable$list) && !a.is$JavaScriptIndexingBehavior())) return $.DualPivotQuicksort__dualPivotQuicksort$bailout(1, left, right, compare, a, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  $.intTypeCheck(left);
  $.intTypeCheck(right);
  $.assert($.gt($.sub(right, left), 32));
  var sixth = $.intTypeCheck($.tdiv($.add($.sub(right, left), 1), 6));
  var index1 = $.intTypeCheck($.add(left, sixth));
  var index5 = $.intTypeCheck($.sub(right, sixth));
  var index3 = $.intTypeCheck($.tdiv($.add(left, right), 2));
  var index2 = $.intTypeCheck($.sub(index3, sixth));
  var index4 = $.intTypeCheck($.add(index3, sixth));
  if (index1 !== (index1 | 0)) throw $.iae(index1);
  var t1 = a.length;
  if (index1 < 0 || index1 >= t1) throw $.ioore(index1);
  var el2 = a[index1];
  if (index2 !== (index2 | 0)) throw $.iae(index2);
  if (index2 < 0 || index2 >= t1) throw $.ioore(index2);
  var el20 = a[index2];
  if (index3 !== (index3 | 0)) throw $.iae(index3);
  if (index3 < 0 || index3 >= t1) throw $.ioore(index3);
  var el1 = a[index3];
  if (index4 !== (index4 | 0)) throw $.iae(index4);
  if (index4 < 0 || index4 >= t1) throw $.ioore(index4);
  var el4 = a[index4];
  if (index5 !== (index5 | 0)) throw $.iae(index5);
  if (index5 < 0 || index5 >= t1) throw $.ioore(index5);
  var el40 = a[index5];
  if ($.gtB(compare.$call$2(el2, el20), 0)) var el10 = el20;
  else {
    el10 = el2;
    el2 = el20;
  }
  if ($.gtB(compare.$call$2(el4, el40), 0)) {
    var el5 = el4;
    el4 = el40;
  } else el5 = el40;
  if ($.gtB(compare.$call$2(el10, el1), 0)) var el3 = el10;
  else {
    el3 = el1;
    el1 = el10;
  }
  if ($.gtB(compare.$call$2(el2, el3), 0)) {
    var t0 = el3;
    el3 = el2;
    el2 = t0;
  }
  if ($.gtB(compare.$call$2(el1, el4), 0)) {
    t0 = el1;
    el1 = el4;
    el4 = t0;
  }
  if ($.gtB(compare.$call$2(el3, el4), 0)) {
    t0 = el3;
    el3 = el4;
    el4 = t0;
  }
  if ($.gtB(compare.$call$2(el2, el5), 0)) {
    t0 = el2;
    el2 = el5;
    el5 = t0;
  }
  if ($.gtB(compare.$call$2(el2, el3), 0)) {
    t0 = el3;
    el3 = el2;
    el2 = t0;
  }
  if ($.gtB(compare.$call$2(el4, el5), 0)) {
    t0 = el5;
    el5 = el4;
    el4 = t0;
  }
  t1 = a.length;
  if (index1 < 0 || index1 >= t1) throw $.ioore(index1);
  a[index1] = el1;
  var t2 = a.length;
  if (index3 < 0 || index3 >= t2) throw $.ioore(index3);
  a[index3] = el3;
  var t3 = a.length;
  if (index5 < 0 || index5 >= t3) throw $.ioore(index5);
  a[index5] = el5;
  if (left !== (left | 0)) throw $.iae(left);
  var t4 = a.length;
  if (left < 0 || left >= t4) throw $.ioore(left);
  var t5 = a[left];
  if (index2 < 0 || index2 >= t4) throw $.ioore(index2);
  a[index2] = t5;
  if (right !== (right | 0)) throw $.iae(right);
  t5 = a.length;
  if (right < 0 || right >= t5) throw $.ioore(right);
  var t6 = a[right];
  if (index4 < 0 || index4 >= t5) throw $.ioore(index4);
  a[index4] = t6;
  var less = $.intTypeCheck(left + 1);
  if (less !== (less | 0)) return $.DualPivotQuicksort__dualPivotQuicksort$bailout(2, compare, el2, a, left, right, index1, el4, index5, less, 0, 0, 0, 0, 0);
  var great = $.intTypeCheck(right - 1);
  if (great !== (great | 0)) return $.DualPivotQuicksort__dualPivotQuicksort$bailout(3, great, compare, el2, a, left, right, index1, el4, index5, less, 0, 0, 0, 0);
  t1 = $.boolTypeCheck($.eq(compare.$call$2(el2, el4), 0)) === true;
  if (t1) {
    for (var k = less; $.leB(k, great); k = $.intTypeCheck($.add(k, 1))) {
      if (k !== (k | 0)) throw $.iae(k);
      t2 = a.length;
      if (k < 0 || k >= t2) throw $.ioore(k);
      t3 = a[k];
      var comp = $.intTypeCheck(compare.$call$2(t3, el2));
      if (comp !== (comp | 0)) return $.DualPivotQuicksort__dualPivotQuicksort$bailout(4, compare, el2, a, left, right, t1, t3, comp, el4, less, k, great, index1, index5);
      if (comp === 0) continue;
      if (comp < 0) {
        if (!(k === less)) {
          if (less !== (less | 0)) throw $.iae(less);
          t2 = a.length;
          if (less < 0 || less >= t2) throw $.ioore(less);
          t4 = a[less];
          if (k < 0 || k >= t2) throw $.ioore(k);
          a[k] = t4;
          t4 = a.length;
          if (less < 0 || less >= t4) throw $.ioore(less);
          a[less] = t3;
        }
        less = $.intTypeCheck($.add(less, 1));
      } else {
        for (; true; ) {
          if (great !== (great | 0)) throw $.iae(great);
          t2 = a.length;
          if (great < 0 || great >= t2) throw $.ioore(great);
          comp = $.intTypeCheck(compare.$call$2(a[great], el2));
          if ($.gtB(comp, 0)) {
            great = $.intTypeCheck(great - 1);
            continue;
          } else {
            t2 = $.ltB(comp, 0);
            t4 = a.length;
            var great0 = great - 1;
            if (t2) {
              if (less !== (less | 0)) throw $.iae(less);
              if (less < 0 || less >= t4) throw $.ioore(less);
              t2 = a[less];
              if (k < 0 || k >= t4) throw $.ioore(k);
              a[k] = t2;
              var less0 = $.intTypeCheck(less + 1);
              t2 = a.length;
              if (great < 0 || great >= t2) throw $.ioore(great);
              t5 = a[great];
              if (less < 0 || less >= t2) throw $.ioore(less);
              a[less] = t5;
              $.intTypeCheck(great0);
              t5 = a.length;
              if (great < 0 || great >= t5) throw $.ioore(great);
              a[great] = t3;
              great = great0;
              less = less0;
              break;
            } else {
              if (great < 0 || great >= t4) throw $.ioore(great);
              t2 = a[great];
              if (k < 0 || k >= t4) throw $.ioore(k);
              a[k] = t2;
              $.intTypeCheck(great0);
              t2 = a.length;
              if (great < 0 || great >= t2) throw $.ioore(great);
              a[great] = t3;
              great = great0;
              break;
            }
          }
        }
      }
    }
  } else {
    for (k = less; $.leB(k, great); k = $.intTypeCheck($.add(k, 1))) {
      if (k !== (k | 0)) throw $.iae(k);
      t2 = a.length;
      if (k < 0 || k >= t2) throw $.ioore(k);
      t3 = a[k];
      if ($.ltB($.intTypeCheck(compare.$call$2(t3, el2)), 0)) {
        if (!(k === less)) {
          if (less !== (less | 0)) throw $.iae(less);
          t2 = a.length;
          if (less < 0 || less >= t2) throw $.ioore(less);
          t4 = a[less];
          if (k < 0 || k >= t2) throw $.ioore(k);
          a[k] = t4;
          t4 = a.length;
          if (less < 0 || less >= t4) throw $.ioore(less);
          a[less] = t3;
        }
        less = $.intTypeCheck($.add(less, 1));
      } else {
        if ($.gtB($.intTypeCheck(compare.$call$2(t3, el4)), 0)) {
          for (; true; ) {
            if (great !== (great | 0)) throw $.iae(great);
            t2 = a.length;
            if (great < 0 || great >= t2) throw $.ioore(great);
            if ($.gtB($.intTypeCheck(compare.$call$2(a[great], el4)), 0)) {
              great = $.intTypeCheck(great - 1);
              if ($.ltB(great, k)) break;
              continue;
            } else {
              t2 = a.length;
              if (great < 0 || great >= t2) throw $.ioore(great);
              t2 = $.ltB($.intTypeCheck(compare.$call$2(a[great], el2)), 0);
              t4 = a.length;
              great0 = great - 1;
              if (t2) {
                if (less !== (less | 0)) throw $.iae(less);
                if (less < 0 || less >= t4) throw $.ioore(less);
                t2 = a[less];
                if (k < 0 || k >= t4) throw $.ioore(k);
                a[k] = t2;
                less0 = $.intTypeCheck(less + 1);
                t2 = a.length;
                if (great < 0 || great >= t2) throw $.ioore(great);
                t5 = a[great];
                if (less < 0 || less >= t2) throw $.ioore(less);
                a[less] = t5;
                $.intTypeCheck(great0);
                t5 = a.length;
                if (great < 0 || great >= t5) throw $.ioore(great);
                a[great] = t3;
                great = great0;
                less = less0;
              } else {
                if (great < 0 || great >= t4) throw $.ioore(great);
                t2 = a[great];
                if (k < 0 || k >= t4) throw $.ioore(k);
                a[k] = t2;
                $.intTypeCheck(great0);
                t2 = a.length;
                if (great < 0 || great >= t2) throw $.ioore(great);
                a[great] = t3;
                great = great0;
              }
              break;
            }
          }
        }
      }
    }
  }
  t2 = $.sub(less, 1);
  if (t2 !== (t2 | 0)) throw $.iae(t2);
  t3 = a.length;
  if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
  t2 = a[t2];
  if (left < 0 || left >= t3) throw $.ioore(left);
  a[left] = t2;
  t2 = $.sub(less, 1);
  if (t2 !== (t2 | 0)) throw $.iae(t2);
  t4 = a.length;
  if (t2 < 0 || t2 >= t4) throw $.ioore(t2);
  a[t2] = el2;
  t2 = $.add(great, 1);
  if (t2 !== (t2 | 0)) throw $.iae(t2);
  t5 = a.length;
  if (t2 < 0 || t2 >= t5) throw $.ioore(t2);
  t2 = a[t2];
  if (right < 0 || right >= t5) throw $.ioore(right);
  a[right] = t2;
  t2 = $.add(great, 1);
  if (t2 !== (t2 | 0)) throw $.iae(t2);
  t6 = a.length;
  if (t2 < 0 || t2 >= t6) throw $.ioore(t2);
  a[t2] = el4;
  $.DualPivotQuicksort__doSort(a, left, $.sub(less, 2), compare);
  $.DualPivotQuicksort__doSort(a, $.add(great, 2), right, compare);
  if (t1) return;
  if ($.ltB(less, index1) && $.gtB(great, index5)) {
    while (true) {
      if (less !== (less | 0)) throw $.iae(less);
      t1 = a.length;
      if (less < 0 || less >= t1) throw $.ioore(less);
      if (!$.eqB(compare.$call$2(a[less], el2), 0)) break;
      less = $.intTypeCheck(less + 1);
    }
    while (true) {
      if (great !== (great | 0)) throw $.iae(great);
      t1 = a.length;
      if (great < 0 || great >= t1) throw $.ioore(great);
      if (!$.eqB(compare.$call$2(a[great], el4), 0)) break;
      great = $.intTypeCheck(great - 1);
    }
    for (k = less; $.leB(k, great); k = $.intTypeCheck($.add(k, 1))) {
      if (k !== (k | 0)) throw $.iae(k);
      t1 = a.length;
      if (k < 0 || k >= t1) throw $.ioore(k);
      t2 = a[k];
      if ($.eqB($.intTypeCheck(compare.$call$2(t2, el2)), 0)) {
        if (!(k === less)) {
          if (less !== (less | 0)) throw $.iae(less);
          t1 = a.length;
          if (less < 0 || less >= t1) throw $.ioore(less);
          t3 = a[less];
          if (k < 0 || k >= t1) throw $.ioore(k);
          a[k] = t3;
          t3 = a.length;
          if (less < 0 || less >= t3) throw $.ioore(less);
          a[less] = t2;
        }
        less = $.intTypeCheck($.add(less, 1));
      } else {
        if ($.eqB($.intTypeCheck(compare.$call$2(t2, el4)), 0)) {
          for (; true; ) {
            if (great !== (great | 0)) throw $.iae(great);
            t1 = a.length;
            if (great < 0 || great >= t1) throw $.ioore(great);
            if ($.eqB($.intTypeCheck(compare.$call$2(a[great], el4)), 0)) {
              great = $.intTypeCheck(great - 1);
              if ($.ltB(great, k)) break;
              continue;
            } else {
              t1 = a.length;
              if (great < 0 || great >= t1) throw $.ioore(great);
              t1 = $.ltB($.intTypeCheck(compare.$call$2(a[great], el2)), 0);
              t3 = a.length;
              great0 = great - 1;
              if (t1) {
                if (less !== (less | 0)) throw $.iae(less);
                if (less < 0 || less >= t3) throw $.ioore(less);
                t1 = a[less];
                if (k < 0 || k >= t3) throw $.ioore(k);
                a[k] = t1;
                less0 = $.intTypeCheck(less + 1);
                t1 = a.length;
                if (great < 0 || great >= t1) throw $.ioore(great);
                t4 = a[great];
                if (less < 0 || less >= t1) throw $.ioore(less);
                a[less] = t4;
                $.intTypeCheck(great0);
                t4 = a.length;
                if (great < 0 || great >= t4) throw $.ioore(great);
                a[great] = t2;
                great = great0;
                less = less0;
              } else {
                if (great < 0 || great >= t3) throw $.ioore(great);
                t1 = a[great];
                if (k < 0 || k >= t3) throw $.ioore(k);
                a[k] = t1;
                $.intTypeCheck(great0);
                t1 = a.length;
                if (great < 0 || great >= t1) throw $.ioore(great);
                a[great] = t2;
                great = great0;
              }
              break;
            }
          }
        }
      }
    }
    $.DualPivotQuicksort__doSort(a, less, great, compare);
  } else $.DualPivotQuicksort__doSort(a, less, great, compare);
};

$.substring$2 = function(receiver, startIndex, endIndex) {
  if (!(typeof receiver === 'string')) return receiver.substring$2(startIndex, endIndex);
  $.checkNum(startIndex);
  var length$ = receiver.length;
  if (endIndex == null) endIndex = length$;
  $.checkNum(endIndex);
  if ($.ltB(startIndex, 0)) throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(startIndex, endIndex)) throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(endIndex, length$)) throw $.captureStackTrace($.IndexOutOfRangeException$(endIndex));
  return $.substringUnchecked(receiver, startIndex, endIndex);
};

$.DoubleLinkedQueueEntry$ = function(e) {
  var t1 = new $.DoubleLinkedQueueEntry(null, null, null);
  t1.DoubleLinkedQueueEntry$1(e);
  return t1;
};

$.indexSet = function(a, index, value) {
  if (a.constructor === Array && !a.immutable$list) {
    var key = (index >>> 0);
    if (key === index && key < (a.length)) {
      a[key] = value;
      return;
    }
  }
  $.indexSet$slow(a, index, value);
};

$.DistanceInput$ = function() {
  var t1 = $.DistanceProxy$();
  var t2 = $.DistanceProxy$();
  var t3 = $.Transform$();
  return new $.DistanceInput(false, $.Transform$(), t3, t2, t1);
};

$.and = function(a, b) {
  if ($.checkNumbers(a, b) === true) return (a & b) >>> 0;
  return a.operator$and$1(b);
};

$.StringMatch$ = function(_start, str, pattern) {
  $.intTypeCheck(_start);
  $.stringTypeCheck(str);
  return new $.StringMatch($.stringTypeCheck(pattern), str, _start);
};

$.ExceptionImplementation$ = function(msg) {
  return new $.ExceptionImplementation(msg);
};

$.invokeClosure = function(closure, isolate, numberOfArguments, arg1, arg2) {
  $.functionTypeCheck(closure);
  $.intTypeCheck(numberOfArguments);
  if ($.eqB(numberOfArguments, 0)) return $._callInIsolate(isolate, new $.invokeClosure_anon(closure));
  if ($.eqB(numberOfArguments, 1)) return $._callInIsolate(isolate, new $.invokeClosure_anon0(closure, arg1));
  if ($.eqB(numberOfArguments, 2)) return $._callInIsolate(isolate, new $.invokeClosure_anon1(closure, arg1, arg2));
  throw $.captureStackTrace($.ExceptionImplementation$('Unsupported number of arguments for wrapped closure'));
};

$.stringJoinUnchecked = function(array, separator) {
  return array.join(separator);
};

$.gt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a > b) : $.gt$slow(a, b);
};

$.Vector_minToOut = function(a, b, out) {
  $.propertyTypeCheck(a, 'is$Vector');
  $.propertyTypeCheck(b, 'is$Vector');
  $.propertyTypeCheck(out, 'is$Vector');
  out.set$x($.ltB(a.get$x(), b.get$x()) ? a.get$x() : b.get$x());
  out.set$y($.ltB(a.get$y(), b.get$y()) ? a.get$y() : b.get$y());
};

$.assert = function(condition) {
  if (typeof condition === 'function' || typeof condition === 'object' && condition !== null && !!condition.is$Function) condition = condition.$call$0();
  if (condition !== true) throw $.captureStackTrace($.AssertionError$());
};

$.ContactSolver$ = function() {
  var t1 = $.ListFactory_List(256);
  $.setRuntimeTypeInfo(t1, ({E: 'ContactConstraint'}));
  var t2 = $.WorldManifold$();
  var t3 = $.Vector$(0, 0);
  var t4 = $.Vector$(0, 0);
  var t5 = $.Vector$(0, 0);
  var t6 = $.Vector$(0, 0);
  var t7 = $.Vector$(0, 0);
  var t8 = $.Vector$(0, 0);
  var t9 = $.Vector$(0, 0);
  var t10 = $.Vector$(0, 0);
  var t11 = $.Vector$(0, 0);
  var t12 = $.Vector$(0, 0);
  var t13 = $.Vector$(0, 0);
  var t14 = $.PositionSolverManifold$();
  var t15 = $.Vector$(0, 0);
  t1 = new $.ContactSolver($.Vector$(0, 0), t15, t14, t13, t12, t11, t10, t9, t8, t7, t6, t5, t4, t3, t2, null, t1);
  t1.ContactSolver$0();
  return t1;
};

$.buildDynamicMetadata = function(inputTable) {
  $.listTypeCheck(inputTable);
  var result = [];
  for (var i = 0; $.ltB(i, $.get$length(inputTable)); i = $.intTypeCheck($.add(i, 1))) {
    var tag = $.stringTypeCheck($.index($.index(inputTable, i), 0));
    var tags = $.stringTypeCheck($.index($.index(inputTable, i), 1));
    var set = $.HashSetImplementation$();
    $.setRuntimeTypeInfo(set, ({E: 'String'}));
    $.propertyTypeCheck(set, 'is$Set');
    var tagNames = $.listTypeCheck($.split(tags, '|'));
    for (var j = 0; $.ltB(j, $.get$length(tagNames)); j = $.intTypeCheck($.add(j, 1))) {
      set.add$1($.index(tagNames, j));
    }
    $.add$1(result, $.MetaInfo$(tag, tags, set));
  }
  return result;
};

$.BroadPhase$ = function() {
  var t1 = new $.BroadPhase(null, 0, 16, null, null, 0, $.DynamicTree$());
  t1.BroadPhase$0();
  return t1;
};

$.Expect__getMessage = function(reason) {
  $.stringTypeCheck(reason);
  return reason == null ? '' : ', \'' + $.S(reason) + '\'';
};

$.contains$1 = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.contains$1(other);
  return $.contains$2(receiver, other, 0);
};

$.mul = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a * b) : $.mul$slow(a, b);
};

$.Settings_mixFriction = function(friction1, friction2) {
  return $.Math_sqrt($.mul($.numTypeCheck(friction1), $.numTypeCheck(friction2)));
};

$.ContactConstraint$ = function() {
  var t1 = $.ListFactory_List(2);
  $.setRuntimeTypeInfo(t1, ({E: 'ContactConstraintPoint'}));
  var t2 = $.Vector$(0, 0);
  var t3 = $.Vector$(0, 0);
  var t4 = $.Vector$(0, 0);
  var t5 = $.Matrix22$(null, null);
  t1 = new $.ContactConstraint(null, 0, null, null, null, null, null, null, $.Matrix22$(null, null), t5, t4, t3, t2, t1);
  t1.ContactConstraint$0();
  return t1;
};

$.ContactImpulse$ = function() {
  var t1 = $.ListFactory_List(2);
  $.setRuntimeTypeInfo(t1, ({E: 'num'}));
  var t2 = $.ListFactory_List(2);
  $.setRuntimeTypeInfo(t2, ({E: 'num'}));
  return new $.ContactImpulse(t2, t1);
};

$.neg = function(a) {
  if (typeof a === "number") return -a;
  return a.operator$negate$0();
};

$._MessageTraverser_isPrimitive = function(x) {
  return x == null || typeof x === 'string' || typeof x === 'number' || typeof x === 'boolean';
};

$.Matrix22_mulMatrixAndVectorToOut = function(matrix, vector, out) {
  $.propertyTypeCheck(matrix, 'is$Matrix22');
  $.propertyTypeCheck(vector, 'is$Vector');
  $.propertyTypeCheck(out, 'is$Vector');
  var tempy = $.numTypeCheck($.add($.mul(matrix.get$col1().get$y(), vector.get$x()), $.mul(matrix.get$col2().get$y(), vector.get$y())));
  out.set$x($.add($.mul(matrix.get$col1().get$x(), vector.get$x()), $.mul(matrix.get$col2().get$x(), vector.get$y())));
  out.set$y(tempy);
};

$.Collections__emitCollection = function(c, result, visiting) {
  $.listSuperNativeTypeCheck(c, 'is$Collection');
  $.propertyTypeCheck(result, 'is$StringBuffer');
  $.listTypeCheck(visiting);
  $.add$1(visiting, c);
  var isList = typeof c === 'object' && c !== null && (c.constructor === Array || c.is$List());
  $.add$1(result, isList ? '[' : '{');
  for (var t1 = $.iterator(c), first = true; t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    !first && $.add$1(result, ', ');
    $.Collections__emitObject(t2, result, visiting);
    first = false;
  }
  $.add$1(result, isList ? ']' : '}');
  $.removeLast(visiting);
};

$.DynamicTreeNode$_construct = function() {
  return new $.DynamicTreeNode(null, null, null, null, null, null, $.AxisAlignedBox$(null, null));
};

$.checkMutable = function(list, reason) {
  if (!!(list.immutable$list)) throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$.ExpectException$ = function(message) {
  return new $.ExpectException(message);
};

$.sub$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a - b;
  return a.operator$sub$1(b);
};

$.toStringWrapper = function() {
  return $.toString((this.dartException));
};

$.Vector3$ = function(x, y, z) {
  return new $.Vector3(z, y, x);
};

$.or = function(a, b) {
  if ($.checkNumbers(a, b) === true) return (a | b) >>> 0;
  return a.operator$or$1(b);
};

$.DefaultWorldPool$ = function() {
  var t1 = new $.DefaultWorldPool(null, null, null);
  t1.DefaultWorldPool$0();
  return t1;
};

$.CircleContact$ = function(argPool) {
  $.propertyTypeCheck(argPool, 'is$DefaultWorldPool');
  var t1 = $.Manifold$();
  var t2 = $.ContactEdge$();
  var t3 = $.ContactEdge$();
  return new $.CircleContact($.Manifold$(), argPool, null, t1, null, null, t3, t2, null, null, null);
};

$.regExpTest = function(regExp, str) {
  $.propertyTypeCheck(regExp, 'is$JSSyntaxRegExp');
  $.stringTypeCheck(str);
  return $.regExpGetNative(regExp).test(str);
};

$.propertyTypeError = function(value, property) {
  var name$ = $.stringTypeCheck($.substring$2(property, 3, $.get$length(property)));
  throw $.captureStackTrace($.TypeError$($.S(value) + ' does not implement ' + $.S(name$)));
};

$.BallDropBench$ = function(solveLoops, steps) {
  $.listTypeCheck(solveLoops);
  return new $.BallDropBench($.listTypeCheck(steps), solveLoops, null, null);
};

$.HashSetImplementation$ = function() {
  var t1 = new $.HashSetImplementation(null);
  t1.HashSetImplementation$0();
  return t1;
};

$.stringSplitUnchecked = function(receiver, pattern) {
  if (typeof pattern === 'string') return receiver.split(pattern);
  if (typeof pattern === 'object' && pattern !== null && !!pattern.is$JSSyntaxRegExp) return receiver.split($.regExpGetNative(pattern));
  throw $.captureStackTrace('StringImplementation.split(Pattern) UNIMPLEMENTED');
};

$.TimeStep$ = function() {
  return new $.TimeStep(true, 0, 0, 0, 0, 0);
};

$.checkGrowable = function(list, reason) {
  if (!!(list.fixed$length)) throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$.TimeOfImpactSolverManifold$ = function() {
  var t1 = $.Vector$(0, 0);
  var t2 = $.Vector$(0, 0);
  var t3 = $.Vector$(0, 0);
  var t4 = $.Vector$(0, 0);
  var t5 = $.Vector$(0, 0);
  var t6 = $.Vector$(0, 0);
  return new $.TimeOfImpactSolverManifold($.Vector$(0, 0), t6, t5, t4, t3, 0, t2, t1);
};

$.isEmpty = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) return receiver.length === 0;
  return receiver.isEmpty$0();
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
  $.propertyTypeCheck(regExp, 'is$JSSyntaxRegExp');
  $.stringTypeCheck(str);
  var result = ($.regExpGetNative(regExp).exec(str));
  if (result === null) return;
  return result;
};

$.add = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a + b) : $.add$slow(a, b);
};

$.geB = function(a, b) {
  if (typeof a === 'number' && typeof b === 'number') var t1 = (a >= b);
  else {
    t1 = $.ge$slow(a, b);
    t1 = t1 === true;
  }
  return t1;
};

$.stringContainsUnchecked = function(receiver, other, startIndex) {
  if (typeof other === 'string') {
    var t1 = $.indexOf$2(receiver, other, startIndex);
    return !(t1 === -1);
  }
  if (typeof other === 'object' && other !== null && !!other.is$JSSyntaxRegExp) return other.hasMatch$1($.substring$1(receiver, startIndex));
  return $.iterator($.allMatches(other, $.substring$1(receiver, startIndex))).hasNext$0();
};

$.Settings_mixRestitution = function(restitution1, restitution2) {
  $.numTypeCheck(restitution1);
  $.numTypeCheck(restitution2);
  return $.gtB(restitution1, restitution2) ? restitution1 : restitution2;
};

$.ObjectNotClosureException$ = function() {
  return new $.ObjectNotClosureException();
};

$.abs = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.abs$0();
  return Math.abs(receiver);
};

$.Primitives_objectTypeName = function(object) {
  var name$ = $.stringTypeCheck($.constructorNameFallback(object));
  if ($.eqB(name$, 'Object')) {
    var decompiled = (String(object.constructor).match(/^\s*function\s*(\S*)\s*\(/)[1]);
    if (typeof decompiled === 'string') name$ = $.stringTypeCheck(decompiled);
  }
  var t1 = $.charCodeAt(name$, 0);
  return t1 === 36 ? $.stringTypeCheck($.substring$1(name$, 1)) : name$;
};

$.DominoTowerBench$ = function(solveLoops, steps) {
  $.listTypeCheck(solveLoops);
  return new $.DominoTowerBench(null, $.listTypeCheck(steps), solveLoops, null, null);
};

$.regExpAttachGlobalNative = function(regExp) {
  $.propertyTypeCheck(regExp, 'is$JSSyntaxRegExp');
  regExp._re = $.regExpMakeNative(regExp, true);
};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver) === true) return $.ListIterator$(receiver);
  return receiver.iterator$0();
};

$.leB = function(a, b) {
  if (typeof a === 'number' && typeof b === 'number') var t1 = (a <= b);
  else {
    t1 = $.le$slow(a, b);
    t1 = t1 === true;
  }
  return t1;
};

$.isNegative = function(receiver) {
  if (typeof receiver === 'number') {
    return receiver === 0 ? 1 / receiver < 0 : receiver < 0;
  }
  return receiver.isNegative$0();
};

$.mod = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    var result = $.intTypeCheck(a % b);
    if (result === 0) return 0;
    if (result > 0) return result;
    b = (b);
    if (b < 0) return result - b;
    return result + b;
  }
  return a.operator$mod$1(b);
};

$.regExpMakeNative = function(regExp, global) {
  $.propertyTypeCheck(regExp, 'is$JSSyntaxRegExp');
  $.boolTypeCheck(global);
  var pattern = $.stringTypeCheck(regExp.get$pattern());
  var multiLine = $.boolTypeCheck(regExp.get$multiLine());
  var ignoreCase = $.boolTypeCheck(regExp.get$ignoreCase());
  $.checkString(pattern);
  var sb = $.propertyTypeCheck($.StringBufferImpl$(''), 'is$StringBuffer');
  multiLine === true && $.add$1(sb, 'm');
  ignoreCase === true && $.add$1(sb, 'i');
  global === true && $.add$1(sb, 'g');
  try {
    return new RegExp(pattern, $.toString(sb));
  } catch (exception) {
    var t1 = $.unwrapException(exception);
    var e = t1;
    throw $.captureStackTrace($.IllegalJSRegExpException$(pattern, (String(e))));
  }
};

$.Sweep$ = function() {
  var t1 = $.Vector$(0, 0);
  var t2 = $.Vector$(0, 0);
  return new $.Sweep(0, 0, $.Vector$(0, 0), t2, t1);
};

$.MassData$ = function() {
  return new $.MassData(0, $.Vector$(0, 0), 0);
};

$.Matrix22_mulTransMatrixAndVectorToOut = function(matrix, vector, out) {
  $.propertyTypeCheck(matrix, 'is$Matrix22');
  $.propertyTypeCheck(vector, 'is$Vector');
  $.propertyTypeCheck(out, 'is$Vector');
  var outx = $.numTypeCheck($.add($.mul(vector.get$x(), matrix.get$col1().get$x()), $.mul(vector.get$y(), matrix.get$col1().get$y())));
  out.set$y($.add($.mul(vector.get$x(), matrix.get$col2().get$x()), $.mul(vector.get$y(), matrix.get$col2().get$y())));
  out.set$x(outx);
};

$.Matrix33$ = function() {
  var t1 = $.Vector3$(0, 0, 0);
  var t2 = $.Vector3$(0, 0, 0);
  return new $.Matrix33($.Vector3$(0, 0, 0), t2, t1);
};

$.Maps_mapToString = function(m) {
  $.callTypeCheck(m, 'is$Map');
  var result = $.StringBufferImpl$('');
  $.Maps__emitMap(m, result, $.ListFactory_List(null));
  return result.toString$0();
};

$.Vector3_crossToOut = function(a, b, out) {
  $.propertyTypeCheck(a, 'is$Vector3');
  $.propertyTypeCheck(b, 'is$Vector3');
  $.propertyTypeCheck(out, 'is$Vector3');
  var tempy = $.numTypeCheck($.sub($.mul(a.get$z(), b.get$x()), $.mul(a.get$x(), b.get$z())));
  var tempz = $.numTypeCheck($.sub($.mul(a.get$x(), b.get$y()), $.mul(a.get$y(), b.get$x())));
  out.set$x($.sub($.mul(a.get$y(), b.get$z()), $.mul(a.get$z(), b.get$y())));
  out.set$y(tempy);
  out.set$z(tempz);
};

$.Collections__emitObject = function(o, result, visiting) {
  $.propertyTypeCheck(result, 'is$StringBuffer');
  $.listTypeCheck(visiting);
  if (typeof o === 'object' && o !== null && (o.constructor === Array || o.is$Collection())) {
    if ($.Collections__containsRef(visiting, o) === true) {
      $.add$1(result, typeof o === 'object' && o !== null && (o.constructor === Array || o.is$List()) ? '[...]' : '{...}');
    } else $.Collections__emitCollection(o, result, visiting);
  } else {
    if (typeof o === 'object' && o !== null && o.is$Map()) {
      if ($.Collections__containsRef(visiting, o) === true) $.add$1(result, '{...}');
      else $.Maps__emitMap(o, result, visiting);
    } else {
      $.add$1(result, o == null ? 'null' : o);
    }
  }
};

$.Maps__emitMap = function(m, result, visiting) {
  var t1 = ({});
  $.callTypeCheck(m, 'is$Map');
  $.propertyTypeCheck(result, 'is$StringBuffer');
  $.listTypeCheck(visiting);
  $.add$1(visiting, m);
  $.add$1(result, '{');
  t1.first_1 = true;
  $.forEach(m, new $.Maps__emitMap_anon(result, t1, visiting));
  $.add$1(result, '}');
  $.removeLast(visiting);
};

$.Collision_clipSegmentToLine = function(vOut, vIn, norm, offset) {
  $.listTypeCheck(vOut);
  $.listTypeCheck(vIn);
  $.propertyTypeCheck(norm, 'is$Vector');
  $.numTypeCheck(offset);
  var distance0 = $.numTypeCheck($.sub($.Vector_dot(norm, $.index(vIn, 0).get$v()), offset));
  var distance1 = $.numTypeCheck($.sub($.Vector_dot(norm, $.index(vIn, 1).get$v()), offset));
  if ($.leB(distance0, 0.0)) {
    $.index(vOut, 0).setFrom$1($.index(vIn, 0));
    var numOut = 1;
  } else numOut = 0;
  if ($.leB(distance1, 0.0)) {
    var numOut0 = numOut + 1;
    $.index(vOut, numOut).setFrom$1($.index(vIn, 1));
    numOut = numOut0;
  }
  if ($.ltB($.mul(distance0, distance1), 0.0)) {
    var interp = $.numTypeCheck($.div(distance0, $.sub(distance0, distance1)));
    $.index(vOut, numOut).get$v().setFrom$1($.index(vIn, 1).get$v()).subLocal$1($.index(vIn, 0).get$v()).mulLocal$1(interp).addLocal$1($.index(vIn, 0).get$v());
    var vin = $.propertyTypeCheck($.gtB(distance0, 0.0) ? $.index(vIn, 0) : $.index(vIn, 1), 'is$ClipVertex');
    $.index(vOut, numOut).get$id().setFrom$1(vin.get$id());
    numOut = $.intTypeCheck(numOut + 1);
  }
  return numOut;
};

$.Transform$ = function() {
  var t1 = $.Vector$(0, 0);
  return new $.Transform($.Matrix22$(null, null), t1);
};

$.setRange$4 = function(receiver, start, length$, from, startFrom) {
  if ($.isJsArray(receiver) !== true) return receiver.setRange$4(start, length$, from, startFrom);
  $.checkMutable(receiver, 'indexed set');
  if (length$ === 0) return;
  $.checkNull(start);
  $.checkNull(length$);
  $.checkNull(from);
  $.checkNull(startFrom);
  if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(start));
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (!((typeof startFrom === 'number') && (startFrom === (startFrom | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(startFrom));
  if (length$ < 0) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (start < 0) throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var t1 = start + length$;
  if ($.gtB(t1, $.get$length(receiver))) throw $.captureStackTrace($.IndexOutOfRangeException$(t1));
  $.Arrays_copy(from, startFrom, receiver, start, length$);
};

$.compareTo = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    if ($.ltB(a, b)) return -1;
    if ($.gtB(a, b)) return 1;
    if ($.eqB(a, b)) {
      if ($.eqB(a, 0)) {
        var aIsNegative = $.boolTypeCheck($.isNegative(a));
        if ($.eqB(aIsNegative, $.boolTypeCheck($.isNegative(b)))) return 0;
        if (aIsNegative === true) return -1;
        return 1;
      }
      return 0;
    }
    if ($.isNaN(a) === true) {
      if ($.isNaN(b) === true) return 0;
      return 1;
    }
    return -1;
  }
  if (typeof a === 'string') {
    if (!(typeof b === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (a == b) var t1 = 0;
    else {
      t1 = (a < b) ? -1 : 1;
    }
    return t1;
  }
  return a.compareTo$1(b);
};

$.ge = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a >= b) : $.ge$slow(a, b);
};

$.Manifold$ = function() {
  var t1 = $.ListFactory_List(2);
  $.setRuntimeTypeInfo(t1, ({E: 'ManifoldPoint'}));
  var t2 = $.Vector$(0, 0);
  t1 = new $.Manifold(0, null, $.Vector$(0, 0), t2, t1);
  t1.Manifold$0();
  return t1;
};

$.DistanceJoint$ = function(def) {
  $.propertyTypeCheck(def, 'is$DistanceJointDef');
  var t1 = def.get$type();
  var t2 = def.get$bodyA();
  var t3 = def.get$bodyB();
  var t4 = def.get$collideConnected();
  var t5 = def.get$userData();
  var t6 = $.Vector$(0, 0);
  var t7 = $.Vector$(0, 0);
  var t8 = $.JointEdge$();
  var t9 = $.JointEdge$();
  var t10 = $.Vector$copy(def.get$localAnchorA());
  var t11 = $.Vector$copy(def.get$localAnchorB());
  var t12 = $.get$length(def);
  var t13 = $.Vector$(0, 0);
  var t14 = def.get$frequencyHz();
  return new $.DistanceJoint(0.0, 0.0, def.get$dampingRatio(), t14, t12, null, 0.0, t13, t11, t10, null, null, null, null, t7, t6, t5, t4, false, t3, t2, t9, t8, null, null, t1);
};

$.MatchImplementation$ = function(pattern, str, _start, _end, _groups) {
  $.stringTypeCheck(pattern);
  $.stringTypeCheck(str);
  $.intTypeCheck(_start);
  $.intTypeCheck(_end);
  return new $.MatchImplementation($.listTypeCheck(_groups), _end, _start, str, pattern);
};

$.UnsupportedOperationException$ = function(_message) {
  return new $.UnsupportedOperationException($.stringTypeCheck(_message));
};

$.Filter$ = function() {
  return new $.Filter(0, 0, 0);
};

$.indexOf$2 = function(receiver, element, start) {
  if ($.isJsArray(receiver) === true) {
    if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(start));
    return $.Arrays_indexOf(receiver, element, start, (receiver.length));
  }
  if (typeof receiver === 'string') {
    $.checkNull(element);
    if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(start));
    if (!(typeof element === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(element));
    if (start < 0) return -1;
    return receiver.indexOf(element, start);
  }
  return receiver.indexOf$2(element, start);
};

$.addLast = function(receiver, value) {
  if ($.isJsArray(receiver) !== true) return receiver.addLast$1(value);
  $.checkGrowable(receiver, 'addLast');
  receiver.push(value);
};

$._JsCopier$ = function() {
  var t1 = new $._JsCopier($._MessageTraverserVisitedMap$());
  t1._JsCopier$0();
  return t1;
};

$.TimeOfImpactConstraint$ = function() {
  var t1 = $.ListFactory_List(2);
  $.setRuntimeTypeInfo(t1, ({E: 'Vector'}));
  var t2 = $.Vector$(0, 0);
  t1 = new $.TimeOfImpactConstraint(null, null, 0, 0, 0, $.Vector$(0, 0), t2, t1);
  t1.TimeOfImpactConstraint$0();
  return t1;
};

$.NoMoreElementsException$ = function() {
  return new $.NoMoreElementsException();
};

$.ConstantVolumeJoint$ = function(_world, def) {
  $.propertyTypeCheck(def, 'is$ConstantVolumeJointDef');
  var t1 = def.get$type();
  var t2 = def.get$bodyA();
  var t3 = def.get$bodyB();
  var t4 = def.get$collideConnected();
  var t5 = def.get$userData();
  var t6 = $.Vector$(0, 0);
  var t7 = $.Vector$(0, 0);
  var t8 = $.JointEdge$();
  t1 = new $.ConstantVolumeJoint(null, null, null, _world, 0, null, null, null, null, null, null, null, null, null, t7, t6, t5, t4, false, t3, t2, $.JointEdge$(), t8, null, null, t1);
  t1.ConstantVolumeJoint$2(_world, def);
  return t1;
};

$._Manager$ = function() {
  var t1 = new $._Manager(null, null, null, null, null, null, null, null, null, 1, 0, 0);
  t1._Manager$0();
  return t1;
};

$.add$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a + b;
  return a.operator$add$1(b);
};

$.ListFactory_List$from = function(other) {
  $.listSuperNativeTypeCheck(other, 'is$Iterable');
  var result = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(result, ({E: 'E'}));
  var iterator = $.propertyTypeCheck($.iterator(other), 'is$Iterator');
  for (; iterator.hasNext$0() === true; ) {
    result.push(iterator.next$0());
  }
  return result;
};

$.Primitives_newList = function(length$) {
  if (length$ == null) return new Array();
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0))) || length$ < 0) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var result = (new Array(length$));
  result.fixed$length = true;
  return result;
};

$.BenchmarkRunner_main = function() {
  var runner = $.BenchmarkRunner$();
  runner.setupBenchmarks$0();
  runner.runBenchmarks$0();
};

$.main = function() {
  $.BenchmarkRunner_main();
};

$.Primitives_dateNow = function() {
  return Date.now();
};

$.HashMapImplementation__computeLoadLimit = function(capacity) {
  return $.tdiv($.mul($.intTypeCheck(capacity), 3), 4);
};

$.HashSetIterator$ = function(set_) {
  $.propertyTypeCheck(set_, 'is$HashSetImplementation');
  var t1 = new $.HashSetIterator(-1, set_.get$_backingMap().get$_keys());
  t1.HashSetIterator$1(set_);
  return t1;
};

$._WorkerSendPort$ = function(_workerId, isolateId, _receivePortId) {
  return new $._WorkerSendPort(_receivePortId, _workerId, $.intTypeCheck(isolateId));
};

$.IllegalArgumentException$ = function(arg) {
  return new $.IllegalArgumentException(arg);
};

$.ContactManager$ = function(argPool) {
  return new $.ContactManager($.propertyTypeCheck(argPool, 'is$World'), null, $.ContactFilter$(), 0, null, $.BroadPhase$());
};

$._AllMatchesIterator$ = function(re, _str) {
  $.propertyTypeCheck(re, 'is$JSSyntaxRegExp');
  return new $._AllMatchesIterator(false, null, $.stringTypeCheck(_str), $.JSSyntaxRegExp$_globalVersionOf(re));
};

$.iae = function(argument) {
  throw $.captureStackTrace($.IllegalArgumentException$(argument));
};

$.Expect_equals = function(expected, actual, reason) {
  $.stringTypeCheck(reason);
  if ($.eqB(expected, actual)) return;
  var msg = $.stringTypeCheck($.Expect__getMessage(reason));
  $.Expect__fail('Expect.equals(expected: <' + $.S(expected) + '>, actual: <' + $.S(actual) + '>' + $.S(msg) + ') fails.');
};

$._IsolateContext$ = function() {
  var t1 = new $._IsolateContext(null, null, null);
  t1._IsolateContext$0();
  return t1;
};

$.truncate = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.truncate$0();
  return receiver < 0 ? $.ceil(receiver) : $.floor(receiver);
};

$.isNaN = function(receiver) {
  if (typeof receiver === 'number') return isNaN(receiver);
  return receiver.isNaN$0();
};

$.ClipVertex$ = function() {
  var t1 = $.Vector$(0, 0);
  return new $.ClipVertex($.ContactID$(), t1);
};

$.SimplexCache$ = function() {
  var t1 = $.ListFactory_List(3);
  $.setRuntimeTypeInfo(t1, ({E: 'int'}));
  var t2 = $.ListFactory_List(3);
  $.setRuntimeTypeInfo(t2, ({E: 'int'}));
  t1 = new $.SimplexCache(t2, t1, 0, 0);
  t1.SimplexCache$0();
  return t1;
};

$.allMatchesInStringUnchecked = function(needle, haystack) {
  $.stringTypeCheck(needle);
  $.stringTypeCheck(haystack);
  var result = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(result, ({E: 'Match'}));
  var length$ = $.intTypeCheck($.get$length(haystack));
  var patternLength = $.intTypeCheck($.get$length(needle));
  if (patternLength !== (patternLength | 0)) return $.allMatchesInStringUnchecked$bailout(1, patternLength, needle, haystack, length$, result);
  for (var startIndex = 0; true; ) {
    var position = $.intTypeCheck($.indexOf$2(haystack, needle, startIndex));
    if ($.eqB(position, -1)) break;
    result.push($.StringMatch$(position, haystack, needle));
    var endIndex = $.intTypeCheck($.add(position, patternLength));
    if ($.eqB(endIndex, length$)) break;
    else {
      startIndex = $.eqB(position, endIndex) ? $.intTypeCheck($.add(startIndex, 1)) : endIndex;
    }
  }
  return result;
};

$.Vector$copy = function(other) {
  $.propertyTypeCheck(other, 'is$Vector');
  var t1 = other.get$x();
  return new $.Vector(other.get$y(), t1);
};

$.le$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a <= b;
  return a.operator$le$1(b);
};

$._AllMatchesIterable$ = function(_re, _str) {
  return new $._AllMatchesIterable(_str, _re);
};

$.Arrays_copy = function(src, srcStart, dst, dstStart, count) {
  $.listTypeCheck(src);
  $.intTypeCheck(srcStart);
  $.listTypeCheck(dst);
  $.intTypeCheck(dstStart);
  $.intTypeCheck(count);
  if (count !== (count | 0)) return $.Arrays_copy$bailout(1, dst, dstStart, count, src, srcStart, 0);
  if (srcStart == null) srcStart = 0;
  if (srcStart !== (srcStart | 0)) return $.Arrays_copy$bailout(2, dst, dstStart, count, srcStart, src, 0);
  if (dstStart == null) dstStart = 0;
  if (dstStart !== (dstStart | 0)) return $.Arrays_copy$bailout(3, dst, count, srcStart, dstStart, src, 0);
  if (srcStart < dstStart) {
    for (var i = srcStart + count - 1, j = dstStart + count - 1; $.geB(i, srcStart); i = $.intTypeCheck($.sub(i, 1)), j = $.intTypeCheck($.sub(j, 1))) {
      $.indexSet(dst, j, $.index(src, i));
    }
  } else {
    for (var t1 = srcStart + count, i = srcStart, j = dstStart; $.ltB(i, t1); i = $.intTypeCheck($.add(i, 1)), j = $.intTypeCheck($.add(j, 1))) {
      $.indexSet(dst, j, $.index(src, i));
    }
  }
};

$.dynamicSetMetadata = function(inputTable) {
  var t1 = $.buildDynamicMetadata($.listTypeCheck(inputTable));
  $._dynamicMetadata(t1);
};

$.Collision$_construct = function(pool) {
  $.propertyTypeCheck(pool, 'is$DefaultWorldPool');
  var t1 = $.DistanceInput$();
  var t2 = $.SimplexCache$();
  var t3 = $.DistanceOutput$();
  var t4 = $.EdgeResults$();
  var t5 = $.EdgeResults$();
  var t6 = $.ListFactory_List(2);
  $.setRuntimeTypeInfo(t6, ({E: 'ClipVertex'}));
  var t7 = $.Vector$(0, 0);
  var t8 = $.Vector$(0, 0);
  var t9 = $.Vector$(0, 0);
  var t10 = $.Vector$(0, 0);
  var t11 = $.Vector$(0, 0);
  var t12 = $.Vector$(0, 0);
  var t13 = $.Vector$(0, 0);
  var t14 = $.Vector$(0, 0);
  var t15 = $.ListFactory_List(2);
  $.setRuntimeTypeInfo(t15, ({E: 'ClipVertex'}));
  var t16 = $.ListFactory_List(2);
  $.setRuntimeTypeInfo(t16, ({E: 'ClipVertex'}));
  t2 = new $.Collision(t16, t15, t14, t13, t12, t11, t10, t9, t8, t7, t6, t5, t4, t3, t1, t2, pool);
  t2.Collision$_construct$1(pool);
  return t2;
};

$.endsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.endsWith$1(other);
  $.checkString(other);
  var receiverLength = receiver.length;
  var otherLength = $.intTypeCheck($.get$length(other));
  if ($.gtB(otherLength, receiverLength)) return false;
  if (typeof otherLength !== 'number') throw $.iae(otherLength);
  return $.eq(other, $.substring$1(receiver, receiverLength - otherLength));
};

$.ContactFilter$ = function() {
  return new $.ContactFilter();
};

$.ListIterator$ = function(list) {
  return new $.ListIterator($.listTypeCheck(list), 0);
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

$.functionTypeCheck = function(value) {
  if (value == null) return value;
  if (typeof value === 'function' || typeof value === 'object' && value !== null && !!value.is$Function) return value;
  throw $.captureStackTrace($.TypeError$($.S(value) + ' does not implement Function'));
};

$.listTypeCheck = function(value) {
  if (value == null) return value;
  if (typeof value === 'object' && value !== null && (value.constructor === Array || value.is$List())) return value;
  throw $.captureStackTrace($.TypeError$($.S(value) + ' does not implement List'));
};

$.Velocity$ = function() {
  var t1 = new $.Velocity(null, null);
  t1.Velocity$0();
  return t1;
};

$.ltB = function(a, b) {
  if (typeof a === 'number' && typeof b === 'number') var t1 = (a < b);
  else {
    t1 = $.lt$slow(a, b);
    t1 = t1 === true;
  }
  return t1;
};

$._currentIsolate = function() {
  return $._globalState0().get$currentContext();
};

$.Clock_now = function() {
  return $.Primitives_dateNow();
};

$.convertDartClosureToJS = function(closure, arity) {
  $.intTypeCheck(arity);
  if (closure == null) return;
  var function$ = (closure.$identity);
  if (!!function$) return function$;
  function$ = (function() {
    return $.invokeClosure.$call$5(closure, $._currentIsolate(), arity, arguments[0], arguments[1]);
  });
  closure.$identity = function$;
  return function$;
};

$._JsSerializer$ = function() {
  var t1 = new $._JsSerializer(0, $._MessageTraverserVisitedMap$());
  t1._JsSerializer$0();
  return t1;
};

$.TimeOfImpactSolver$ = function() {
  var t1 = $.ListFactory_List(4);
  $.setRuntimeTypeInfo(t1, ({E: 'TimeOfImpactConstraint'}));
  var t2 = $.TimeOfImpactSolverManifold$();
  var t3 = $.Vector$(0, 0);
  var t4 = $.Vector$(0, 0);
  var t5 = $.Vector$(0, 0);
  t1 = new $.TimeOfImpactSolver($.Vector$(0, 0), t5, t4, t3, t2, null, 0, t1);
  t1.TimeOfImpactSolver$0();
  return t1;
};

$._FixedSizeListIterator$ = function(array) {
  $.listTypeCheck(array);
  return new $._FixedSizeListIterator($.get$length(array), 0, array);
};

$.Pair$ = function() {
  return new $.Pair(null, null);
};

$.split = function(receiver, pattern) {
  if (!(typeof receiver === 'string')) return receiver.split$1(pattern);
  $.checkNull(pattern);
  return $.stringSplitUnchecked(receiver, pattern);
};

$.StringBase_concatAll = function(strings) {
  return $.stringJoinUnchecked($.StringBase__toJsStringArray($.listTypeCheck(strings)), '');
};

$.Distance$_construct = function() {
  var t1 = $.Simplex$();
  var t2 = $.ListFactory_List(3);
  $.setRuntimeTypeInfo(t2, ({E: 'int'}));
  var t3 = $.ListFactory_List(3);
  $.setRuntimeTypeInfo(t3, ({E: 'int'}));
  var t4 = $.Vector$(0, 0);
  var t5 = $.Vector$(0, 0);
  var t6 = $.Vector$(0, 0);
  return new $.Distance($.Vector$(0, 0), t6, t5, t4, t3, t2, t1, 20, 0, 0);
};

$.getRange = function(receiver, start, length$) {
  if ($.isJsArray(receiver) !== true) return receiver.getRange$2(start, length$);
  if (0 === length$) return [];
  $.checkNull(start);
  $.checkNull(length$);
  if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(start));
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var t1 = length$ < 0;
  if (t1) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (start < 0) throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var end = start + length$;
  if ($.gtB(end, $.get$length(receiver))) throw $.captureStackTrace($.IndexOutOfRangeException$(length$));
  if (t1) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  return receiver.slice(start, end);
};

$.Joint_Joint$create = function(argWorld, def) {
  $.propertyTypeCheck(argWorld, 'is$World');
  $.propertyTypeCheck(def, 'is$JointDef');
  switch (def.get$type()) {
    case 5:
      throw $.captureStackTrace($.NotImplementedException$(null));
    case 3:
      return $.DistanceJoint$(def);
    case 2:
      throw $.captureStackTrace($.NotImplementedException$(null));
    case 1:
      return $.RevoluteJoint$(def);
    case 8:
      throw $.captureStackTrace($.NotImplementedException$(null));
    case 9:
      throw $.captureStackTrace($.NotImplementedException$(null));
    case 7:
      throw $.captureStackTrace($.NotImplementedException$(null));
    case 6:
      throw $.captureStackTrace($.NotImplementedException$(null));
    case 4:
      throw $.captureStackTrace($.NotImplementedException$(null));
    case 10:
      return $.ConstantVolumeJoint$(argWorld, def);
  }
  return;
};

$._DoubleLinkedQueueIterator$ = function(_sentinel) {
  $.propertyTypeCheck(_sentinel, 'is$_DoubleLinkedQueueEntrySentinel');
  var t1 = new $._DoubleLinkedQueueIterator(null, _sentinel);
  t1._DoubleLinkedQueueIterator$1(_sentinel);
  return t1;
};

$._Lists_getRange = function(a, start, length$, accumulator) {
  $.listTypeCheck(a);
  $.intTypeCheck(start);
  if (start !== (start | 0)) return $._Lists_getRange$bailout(1, length$, accumulator, a, start);
  $.intTypeCheck(length$);
  $.listTypeCheck(accumulator);
  if ($.ltB(length$, 0)) throw $.captureStackTrace($.IllegalArgumentException$('length'));
  if (start < 0) throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  if (typeof length$ !== 'number') throw $.iae(length$);
  var end = $.intTypeCheck(start + length$);
  if ($.gtB(end, $.get$length(a))) throw $.captureStackTrace($.IndexOutOfRangeException$(end));
  for (var i = start; $.ltB(i, end); i = $.intTypeCheck($.add(i, 1))) {
    $.add$1(accumulator, $.index(a, i));
  }
  return accumulator;
};

$.S = function(value) {
  var res = $.toString(value);
  if (!(typeof res === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(value));
  return res;
};

$._dynamicMetadata = function(table) {
  $dynamicMetadata = $.listTypeCheck(table);
};

$._dynamicMetadata0 = function() {
  var t1 = (typeof($dynamicMetadata));
  if (t1 === 'undefined') {
    t1 = [];
    $._dynamicMetadata(t1);
  }
  return $dynamicMetadata;
};

$.LinkedHashMapImplementation$ = function() {
  var t1 = new $.LinkedHashMapImplementation(null, null);
  t1.LinkedHashMapImplementation$0();
  return t1;
};

$.BenchmarkRunner$ = function() {
  var t1 = $.StringBufferImpl$('');
  var t2 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t2, ({E: 'Benchmark'}));
  return new $.BenchmarkRunner(t1, t2, $.CTC4, $.CTC3);
};

$.regExpGetNative = function(regExp) {
  $.propertyTypeCheck(regExp, 'is$JSSyntaxRegExp');
  var r = (regExp._re);
  return r == null ? (regExp._re = $.regExpMakeNative(regExp, false)) : r;
};

$.checkNull = function(object) {
  if (object == null) throw $.captureStackTrace($.NullPointerException$(null, $.CTC));
  return object;
};

$.throwNoSuchMethod = function(obj, name$, arguments$) {
  throw $.captureStackTrace($.NoSuchMethodException$(obj, name$, arguments$, null));
};

$.ManifoldPoint$ = function() {
  var t1 = $.Vector$(0, 0);
  return new $.ManifoldPoint($.ContactID$(), 0, 0, t1);
};

$.stringTypeCheck = function(value) {
  if (value == null) return value;
  if (typeof value === 'string') return value;
  throw $.captureStackTrace($.TypeError$($.S(value) + ' does not implement String'));
};

$.TimeOfImpactInput$ = function() {
  var t1 = $.DistanceProxy$();
  var t2 = $.DistanceProxy$();
  var t3 = $.Sweep$();
  return new $.TimeOfImpactInput(0, $.Sweep$(), t3, t2, t1);
};

$.StackTrace$ = function(stack) {
  return new $.StackTrace(stack);
};

$._fillStatics = function(context) {
    $globals = context.isolateStatics;
  $static_init();
;
};

$.DoubleLinkedQueue$ = function() {
  var t1 = new $.DoubleLinkedQueue(null);
  t1.DoubleLinkedQueue$0();
  return t1;
};

$.DualPivotQuicksort_insertionSort_ = function(a, left, right, compare) {
  $.listTypeCheck(a);
  if (typeof a !== 'object' || a === null || (a.constructor !== Array && !a.is$JavaScriptIndexingBehavior())) return $.DualPivotQuicksort_insertionSort_$bailout(1, left, right, compare, a, 0);
  $.intTypeCheck(left);
  if (left !== (left | 0)) return $.DualPivotQuicksort_insertionSort_$bailout(2, right, compare, a, left, 0);
  $.intTypeCheck(right);
  for (var i = left + 1; $.leB(i, right); i = $.intTypeCheck($.add(i, 1))) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = a[i];
    var j = i;
    while (true) {
      if ($.gtB(j, left)) {
        t1 = $.sub(j, 1);
        if (t1 !== (t1 | 0)) throw $.iae(t1);
        var t3 = a.length;
        if (t1 < 0 || t1 >= t3) throw $.ioore(t1);
        var t4 = $.gtB(compare.$call$2(a[t1], t2), 0);
        t1 = t4;
      } else t1 = false;
      if (!t1) break;
      t1 = $.sub(j, 1);
      if (t1 !== (t1 | 0)) throw $.iae(t1);
      t3 = a.length;
      if (t1 < 0 || t1 >= t3) throw $.ioore(t1);
      $.indexSet(a, j, a[t1]);
      j = $.intTypeCheck($.sub(j, 1));
    }
    $.indexSet(a, j, t2);
  }
};

$.RevoluteJoint$ = function(def) {
  $.propertyTypeCheck(def, 'is$RevoluteJointDef');
  var t1 = def.get$type();
  var t2 = def.get$bodyA();
  var t3 = def.get$bodyB();
  var t4 = def.get$collideConnected();
  var t5 = def.get$userData();
  var t6 = $.Vector$(0, 0);
  var t7 = $.Vector$(0, 0);
  var t8 = $.JointEdge$();
  var t9 = $.JointEdge$();
  var t10 = $.Vector$(0, 0);
  var t11 = $.Vector$(0, 0);
  var t12 = $.Vector3$(0, 0, 0);
  t1 = new $.RevoluteJoint(null, null, null, null, null, null, null, null, null, $.Matrix33$(), 0, t12, t11, t10, null, null, null, null, t7, t6, t5, t4, false, t3, t2, t9, t8, null, null, t1);
  t1.RevoluteJoint$1(def);
  return t1;
};

$.TypeError$ = function(msg) {
  return new $.TypeError($.stringTypeCheck(msg));
};

$.PolygonContact$ = function(argPool) {
  $.propertyTypeCheck(argPool, 'is$DefaultWorldPool');
  var t1 = $.Manifold$();
  var t2 = $.ContactEdge$();
  var t3 = $.ContactEdge$();
  return new $.PolygonContact($.Manifold$(), argPool, null, t1, null, null, t3, t2, null, null, null);
};

$.checkNumbers = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') return true;
    $.checkNull(b);
    throw $.captureStackTrace($.IllegalArgumentException$(b));
  }
  return false;
};

$._DoubleLinkedQueueEntrySentinel$ = function() {
  var t1 = new $._DoubleLinkedQueueEntrySentinel(null, null, null);
  t1.DoubleLinkedQueueEntry$1(null);
  t1._DoubleLinkedQueueEntrySentinel$0();
  return t1;
};

$.lt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a < b;
  return a.operator$lt$1(b);
};

$.WorldQueryWrapper$ = function() {
  return new $.WorldQueryWrapper(null, null);
};

$.Vector_crossNumAndVectorToOut = function(s, a, out) {
  $.numTypeCheck(s);
  $.propertyTypeCheck(a, 'is$Vector');
  $.propertyTypeCheck(out, 'is$Vector');
  var tempY = $.numTypeCheck($.mul(s, a.get$x()));
  out.set$x($.mul($.neg(s), a.get$y()));
  out.set$y(tempY);
};

$.index$slow = function(a, index) {
  if (typeof a === 'string' || $.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) {
      if (!(typeof index === 'number')) throw $.captureStackTrace($.IllegalArgumentException$(index));
      var t1 = $.truncate(index);
      if (!(t1 === index)) throw $.captureStackTrace($.IllegalArgumentException$(index));
    }
    if ($.ltB(index, 0) || $.geB(index, $.get$length(a))) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
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

$.CircleShape$ = function() {
  return new $.CircleShape($.Vector$(0, 0), 0, 0);
};

$.AxisAlignedBox$ = function(lowerBound, upperBound) {
  var t1 = new $.AxisAlignedBox(upperBound, lowerBound);
  t1.AxisAlignedBox$2(lowerBound, upperBound);
  return t1;
};

$.listSuperNativeTypeCheck = function(value, property) {
  if (value == null) return value;
  if (typeof value === 'object' && value !== null && (value.constructor === Array || value.is$List())) return value;
  if (value[property]()) return value;
  $.propertyTypeError(value, property);
};

$._globalState0 = function() {
  return $globalState;;
};

$._globalState = function(val) {
  $.propertyTypeCheck(val, 'is$_Manager');
  $globalState = val;;
};

$.contains$2 = function(receiver, other, startIndex) {
  if (!(typeof receiver === 'string')) return receiver.contains$2(other, startIndex);
  $.checkNull(other);
  return $.stringContainsUnchecked(receiver, other, startIndex);
};

$._MainManagerStub$ = function() {
  return new $._MainManagerStub();
};

$.toString = function(value) {
  if (typeof value == "object" && value !== null) {
    if ($.isJsArray(value) === true) return $.Collections_collectionToString(value);
    return value.toString$0();
  }
  if (value === 0 && (1 / value) < 0) return '-0.0';
  if (value == null) return 'null';
  if (typeof value == "function") return 'Closure';
  return String(value);
};

$.numTypeCheck = function(value) {
  if (value == null) return value;
  if (typeof value === 'number') return value;
  throw $.captureStackTrace($.TypeError$($.S(value) + ' does not implement num'));
};

$.callTypeCheck = function(value, property) {
  if (value == null) return value;
  var t1 = (typeof value);
  if (t1 === 'object' && (value[property]())) return value;
  $.propertyTypeError(value, property);
};

$.Island$ = function() {
  var t1 = $.ContactSolver$();
  var t2 = $.Vector$(0, 0);
  return new $.Island($.ContactImpulse$(), t2, t1, null, null, null, null, null, null, null, null, null, null, null, null, null);
};

$.StringBase__toJsStringArray = function(strings) {
  $.listTypeCheck(strings);
  $.checkNull(strings);
  var length$ = $.get$length(strings);
  if ($.isJsArray(strings) === true) {
    for (var i = 0; $.ltB(i, length$); i = $.intTypeCheck($.add(i, 1))) {
      var string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListFactory_List(length$);
    for (i = 0; $.ltB(i, length$); i = $.intTypeCheck($.add(i, 1))) {
      string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(string));
      if (i !== (i | 0)) throw $.iae(i);
      var t1 = array.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$.DynamicTree$ = function() {
  var t1 = $.ListFactory_List(4);
  $.setRuntimeTypeInfo(t1, ({E: 'Vector'}));
  var t2 = $.Vector$(0, 0);
  var t3 = $.AxisAlignedBox$(null, null);
  var t4 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t4, ({E: 'DynamicTreeNode'}));
  var t5 = $.Vector$(0, 0);
  var t6 = $.Vector$(0, 0);
  t4 = new $.DynamicTree($.Vector$(0, 0), t6, t5, t3, t2, 0, t1, t4, 0, 0, null, 0, null);
  t4.DynamicTree$0();
  return t4;
};

$.IndexOutOfRangeException$ = function(_index) {
  return new $.IndexOutOfRangeException($.intTypeCheck(_index));
};

$.Transform_mulTransToOut = function(T, v, out) {
  $.propertyTypeCheck(T, 'is$Transform');
  $.propertyTypeCheck(v, 'is$Vector');
  $.propertyTypeCheck(out, 'is$Vector');
  var v1x = $.numTypeCheck($.sub(v.get$x(), T.get$position().get$x()));
  var v1y = $.numTypeCheck($.sub(v.get$y(), T.get$position().get$y()));
  var b = $.propertyTypeCheck(T.get$rotation().get$col1(), 'is$Vector');
  var b1 = $.propertyTypeCheck(T.get$rotation().get$col2(), 'is$Vector');
  var tempy = $.numTypeCheck($.add($.mul(v1x, b1.get$x()), $.mul(v1y, b1.get$y())));
  out.set$x($.add($.mul(v1x, b.get$x()), $.mul(v1y, b.get$y())));
  out.set$y(tempy);
};

$._MessageTraverserVisitedMap$ = function() {
  return new $._MessageTraverserVisitedMap();
};

$.getTraceFromException = function(exception) {
  return $.StackTrace$((exception.stack));
};

$.charCodeAt = function(receiver, index) {
  $.intTypeCheck(index);
  if (typeof receiver === 'string') {
    if (!(typeof index === 'number')) throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    if (index >= receiver.length) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return receiver.charCodeAt(index);
  }
  return receiver.charCodeAt$1(index);
};

$.AssertionError$ = function() {
  return new $.AssertionError();
};

$._EventLoop$ = function() {
  var t1 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t1, ({E: '_IsolateEvent'}));
  return new $._EventLoop(t1);
};

$.Collections_collectionToString = function(c) {
  $.listSuperNativeTypeCheck(c, 'is$Collection');
  var result = $.StringBufferImpl$('');
  $.Collections__emitCollection(c, result, $.ListFactory_List(null));
  return result.toString$0();
};

$.CircleStressBench$ = function(solveLoops, steps) {
  $.listTypeCheck(solveLoops);
  return new $.CircleStressBench(null, $.listTypeCheck(steps), solveLoops, null, null);
};

$.ContactConstraintPoint$ = function() {
  var t1 = $.Vector$(0, 0);
  var t2 = $.Vector$(0, 0);
  return new $.ContactConstraintPoint(0, 0, 0, 0, 0, $.Vector$(0, 0), t2, t1);
};

$.MetaInfo$ = function(tag, tags, set) {
  return new $.MetaInfo(set, tags, tag);
};

$.KeyValuePair$ = function(key, value) {
  return new $.KeyValuePair(value, key);
};

$.ContactRegister$ = function() {
  return new $.ContactRegister(false, null);
};

$.MathBox_clamp = function(a, low, high) {
  $.numTypeCheck(a);
  return $.Math_max($.numTypeCheck(low), $.Math_min(a, $.numTypeCheck(high)));
};

$._NativeJsSendPort$ = function(_receivePort, isolateId) {
  return new $._NativeJsSendPort(_receivePort, $.intTypeCheck(isolateId));
};

$.defineProperty = function(obj, property, value) {
  Object.defineProperty(obj, $.stringTypeCheck(property),
      {value: value, enumerable: false, writable: true, configurable: true});
};

$.dynamicFunction = function(name$) {
  var f = (Object.prototype[name$]);
  if (!(f == null) && (!!f.methods)) return f.methods;
  var methods = ({});
  var dartMethod = (Object.getPrototypeOf($.CTC7)[name$]);
  !(dartMethod == null) && (methods['Object'] = dartMethod);
  var bind = (function() {return $.dynamicBind.$call$4(this, name$, methods, Array.prototype.slice.call(arguments));});
  bind.methods = methods;
  $.defineProperty((Object.prototype), name$, bind);
  return methods;
};

$.print = function(obj) {
  return $.Primitives_printString($.toString(obj));
};

$.checkString = function(value) {
  if (!(typeof value === 'string')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$.div = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a / b) : $.div$slow(a, b);
};

$.MathBox_distance = function(v1, v2) {
  return $.Math_sqrt($.MathBox_distanceSquared($.propertyTypeCheck(v1, 'is$Vector'), $.propertyTypeCheck(v2, 'is$Vector')));
};

$.DistanceJointDef$ = function() {
  var t1 = $.Vector$(0.0, 0.0);
  t1 = new $.DistanceJointDef(0.0, 0.0, 1.0, $.Vector$(0.0, 0.0), t1, false, null, null, null, 0);
  t1.DistanceJointDef$0();
  return t1;
};

$._callInIsolate = function(isolate, function$) {
  $.propertyTypeCheck(isolate, 'is$_IsolateContext').eval$1($.functionTypeCheck(function$));
  $._globalState0().get$topEventLoop().run$0();
};

$.removeLast = function(receiver) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'removeLast');
    var t1 = $.get$length(receiver);
    if (t1 === 0) throw $.captureStackTrace($.IndexOutOfRangeException$(-1));
    return receiver.pop();
  }
  return receiver.removeLast$0();
};

$.DominoPlatformBench$ = function(solveLoops, steps) {
  $.listTypeCheck(solveLoops);
  return new $.DominoPlatformBench($.listTypeCheck(steps), solveLoops, null, null);
};

$.Matrix22$ = function(c1, c2) {
  $.propertyTypeCheck(c1, 'is$Vector');
  $.propertyTypeCheck(c2, 'is$Vector');
  var t1 = new $.Matrix22(null, null);
  t1.Matrix22$2(c1, c2);
  return t1;
};

$.Primitives_objectToString = function(object) {
  return 'Instance of \'' + $.S($.stringTypeCheck($.Primitives_objectTypeName(object))) + '\'';
};

$.Arrays_indexOf = function(a, element, startIndex, endIndex) {
  $.listTypeCheck(a);
  $.intTypeCheck(startIndex);
  $.intTypeCheck(endIndex);
  if ($.geB(startIndex, $.get$length(a))) return -1;
  if ($.ltB(startIndex, 0)) startIndex = 0;
  if (startIndex !== (startIndex | 0)) return $.Arrays_indexOf$bailout(1, element, a, startIndex, endIndex);
  for (var i = startIndex; $.ltB(i, endIndex); i = $.intTypeCheck($.add(i, 1))) {
    if ($.eqB($.index(a, i), element)) return i;
  }
  return -1;
};

$._Lists_indexOf = function(a, element, startIndex, endIndex) {
  $.listTypeCheck(a);
  $.intTypeCheck(startIndex);
  $.intTypeCheck(endIndex);
  if ($.geB(startIndex, $.get$length(a))) return -1;
  if ($.ltB(startIndex, 0)) startIndex = 0;
  if (startIndex !== (startIndex | 0)) return $._Lists_indexOf$bailout(1, element, a, startIndex, endIndex);
  for (var i = startIndex; $.ltB(i, endIndex); i = $.intTypeCheck($.add(i, 1))) {
    if ($.eqB($.index(a, i), element)) return i;
  }
  return -1;
};

$.HashMapImplementation__firstProbe = function(hashCode, length$) {
  return $.and($.intTypeCheck(hashCode), $.sub($.intTypeCheck(length$), 1));
};

$.set$length = function(receiver, newLength) {
  if ($.isJsArray(receiver) === true) {
    $.checkNull(newLength);
    if (!((typeof newLength === 'number') && (newLength === (newLength | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(newLength));
    if (newLength < 0) throw $.captureStackTrace($.IndexOutOfRangeException$(newLength));
    $.checkGrowable(receiver, 'set length');
    receiver.length = newLength;
  } else receiver.set$length(newLength);
  return newLength;
};

$.ioore = function(index) {
  throw $.captureStackTrace($.IndexOutOfRangeException$(index));
};

$.typeNameInFirefox = function(obj) {
  var name$ = $.stringTypeCheck($.constructorNameFallback(obj));
  if ($.eqB(name$, 'Window')) return 'DOMWindow';
  if ($.eqB(name$, 'Document')) return 'HTMLDocument';
  if ($.eqB(name$, 'XMLDocument')) return 'Document';
  if ($.eqB(name$, 'WorkerMessageEvent')) return 'MessageEvent';
  return name$;
};

$.gt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a > b;
  return a.operator$gt$1(b);
};

$.PositionSolverManifold$ = function() {
  var t1 = $.Vector$(0, 0);
  var t2 = $.Vector$(0, 0);
  var t3 = $.Vector$(0, 0);
  var t4 = $.Vector$(0, 0);
  var t5 = $.Vector$(0, 0);
  var t6 = $.Vector$(0, 0);
  return new $.PositionSolverManifold($.Vector$(0, 0), t6, t5, t4, t3, 0, t2, t1);
};

$.DistanceProxy$ = function() {
  var t1 = $.ListFactory_List(8);
  $.setRuntimeTypeInfo(t1, ({E: 'Vector'}));
  t1 = new $.DistanceProxy(0, 0, t1);
  t1.DistanceProxy$0();
  return t1;
};

$.Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator($.listSuperNativeTypeCheck(iterable, 'is$Iterable')); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
};

$.Clock_frequency = function() {
  return 1000;
};

$.forEach = function(receiver, f) {
  if ($.isJsArray(receiver) !== true) return receiver.forEach$1(f);
  return $.Collections_forEach(receiver, f);
};

$.hashCode = function(receiver) {
  if (typeof receiver === 'number') return receiver & 0x1FFFFFFF;
  if (!(typeof receiver === 'string')) return receiver.hashCode$0();
  var length$ = (receiver.length);
  for (var hash = 0, i = 0; $.ltB(i, length$); i = $.intTypeCheck($.add(i, 1))) {
    var t1 = $.add(hash, (receiver.charCodeAt(i)));
    if (typeof t1 !== 'number') throw $.iae(t1);
    hash = 536870911 & t1;
    var hash0 = 536870911 & hash + (524287 & hash << 10);
    hash0 = $.intTypeCheck((hash0 ^ $.shr(hash0, 6)) >>> 0);
    hash = hash0;
  }
  if (typeof hash !== 'number') throw $.iae(hash);
  hash0 = 536870911 & hash + (67108863 & hash << 3);
  hash0 = $.intTypeCheck((hash0 ^ $.shr(hash0, 11)) >>> 0);
  if (typeof hash0 !== 'number') throw $.iae(hash0);
  return 536870911 & hash0 + (16383 & hash0 << 15);
};

$._JsVisitedMap$ = function() {
  return new $._JsVisitedMap(null);
};

$.BallCageBench$ = function(solveLoops, steps) {
  $.listTypeCheck(solveLoops);
  return new $.BallCageBench($.listTypeCheck(steps), solveLoops, null, null);
};

$.makeLiteralMap = function(keyValuePairs) {
  var iterator = $.propertyTypeCheck($.iterator($.listTypeCheck(keyValuePairs)), 'is$Iterator');
  var result = $.callTypeCheck($.LinkedHashMapImplementation$(), 'is$Map');
  for (; iterator.hasNext$0() === true; ) {
    result.operator$indexSet$2($.stringTypeCheck(iterator.next$0()), iterator.next$0());
  }
  return result;
};

$.Math_min = function(a, b) {
  $.numTypeCheck(a);
  $.numTypeCheck(b);
  var c = $.intTypeCheck($.compareTo(a, b));
  if ($.eqB(c, 0)) return a;
  if ($.ltB(c, 0)) {
    if (typeof b === 'number' && $.isNaN(b) === true) return b;
    return a;
  }
  if (typeof a === 'number' && $.isNaN(a) === true) return a;
  return b;
};

$.startsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.startsWith$1(other);
  $.checkString(other);
  var length$ = $.intTypeCheck($.get$length(other));
  if ($.gtB(length$, receiver.length)) return false;
  return other == receiver.substring(0, length$);
};

$.le = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a <= b) : $.le$slow(a, b);
};

$.toStringForNativeObject = function(obj) {
  return 'Instance of ' + $.S($.getTypeNameOf(obj));
};

$._Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator($.listSuperNativeTypeCheck(iterable, 'is$Iterable')); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
};

$.Fixture$ = function() {
  var t1 = $.AxisAlignedBox$(null, null);
  var t2 = $.Filter$();
  var t3 = $.AxisAlignedBox$(null, null);
  return new $.Fixture($.AxisAlignedBox$(null, null), t3, null, null, t2, null, null, null, null, null, null, null, t1);
};

$.dynamicBind = function(obj, name$, methods, arguments$) {
  $.stringTypeCheck(name$);
  $.listTypeCheck(arguments$);
  var tag = $.stringTypeCheck($.getTypeNameOf(obj));
  var method = (methods[tag]);
  if (method == null) {
    var t1 = $._dynamicMetadata0();
    var t2 = !(t1 == null);
    t1 = t2;
  } else t1 = false;
  if (t1) {
    for (var i = 0; $.ltB(i, $.get$length($._dynamicMetadata0())); i = $.intTypeCheck($.add(i, 1))) {
      var entry = $.propertyTypeCheck($.index($._dynamicMetadata0(), i), 'is$MetaInfo');
      if ($.contains$1(entry.get$set(), tag) === true) {
        method = (methods[entry.get$tag()]);
        if (!(method == null)) break;
      }
    }
  }
  if (method == null) method = (methods['Object']);
  var proto = (Object.getPrototypeOf(obj));
  if (method == null) method = (function () {if (Object.getPrototypeOf(this) === proto) {$.throwNoSuchMethod.$call$3(this, name$, Array.prototype.slice.call(arguments));} else {return Object.prototype[name$].apply(this, arguments);}});
  (!proto.hasOwnProperty(name$)) && $.defineProperty(proto, name$, method);
  return method.apply(obj, arguments$);
};

$.getFunctionForTypeNameOf = function() {
  var t1 = (typeof(navigator));
  if (!(t1 === 'object')) return $.typeNameInChrome;
  var userAgent = (navigator.userAgent);
  if ($.contains$1(userAgent, $.CTC5) === true) return $.typeNameInChrome;
  if ($.contains$1(userAgent, 'Firefox') === true) return $.typeNameInFirefox;
  if ($.contains$1(userAgent, 'MSIE') === true) return $.typeNameInIE;
  return $.constructorNameFallback;
};

$.ContactID$ = function() {
  return new $.ContactID($.Features$());
};

$.boolTypeCheck = function(value) {
  if (value == null) return value;
  if (typeof value === 'boolean') return value;
  throw $.captureStackTrace($.TypeError$($.S(value) + ' does not implement bool'));
};

$.World$ = function(gravity, doSleep, argPool) {
  $.propertyTypeCheck(gravity, 'is$Vector');
  $.boolTypeCheck(doSleep);
  $.propertyTypeCheck(argPool, 'is$DefaultWorldPool');
  var t1 = $.ListFactory_List(2);
  $.setRuntimeTypeInfo(t1, ({E: 'List<ContactRegister>'}));
  var t2 = $.Vector$(0, 0);
  var t3 = $.Vector$(0, 0);
  var t4 = $.TimeStep$();
  var t5 = $.Vector$(0, 0);
  var t6 = $.Vector$(0, 0);
  var t7 = $.WorldQueryWrapper$();
  var t8 = $.TimeOfImpactInput$();
  var t9 = $.TimeOfImpactOutput$();
  var t10 = $.Sweep$();
  var t11 = $.TimeOfImpactSolver$();
  var t12 = $.ListFactory_List(32);
  $.setRuntimeTypeInfo(t12, ({E: 'Contact'}));
  var t13 = $.Island$();
  var t14 = $.ListFactory_List(10);
  $.setRuntimeTypeInfo(t14, ({E: 'Body'}));
  t1 = new $.World(t14, t13, t12, t11, t10, t9, t8, t7, t6, t5, t4, t3, t2, t1, true, true, 0, argPool, null, null, null, doSleep, gravity, 0, 0, null, null, null, 4);
  t1.World$3(gravity, doSleep, argPool);
  return t1;
};

$.DistanceOutput$ = function() {
  var t1 = $.Vector$(0, 0);
  return new $.DistanceOutput(null, null, $.Vector$(0, 0), t1);
};

$.xor = function(a, b) {
  if ($.checkNumbers(a, b) === true) return (a ^ b) >>> 0;
  return a.operator$xor$1(b);
};

$.propertyTypeCheck = function(value, property) {
  if (value == null) return value;
  if (!!value[property]) return value;
  $.propertyTypeError(value, property);
};

$.Math_sin = function(x) {
  return $.MathNatives_sin($.numTypeCheck(x));
};

$.DualPivotQuicksort__doSort = function(a, left, right, compare) {
  $.listTypeCheck(a);
  $.intTypeCheck(left);
  $.intTypeCheck(right);
  if ($.leB($.sub(right, left), 32)) $.DualPivotQuicksort_insertionSort_(a, left, right, compare);
  else $.DualPivotQuicksort__dualPivotQuicksort(a, left, right, compare);
};

$.MathNatives_sin = function(value) {
  return Math.sin($.checkNum($.numTypeCheck(value)));
};

$.toDouble = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.toDouble$0();
  return receiver;
};

$.index = function(a, index) {
  if (typeof a == "string" || a.constructor === Array) {
    var key = (index >>> 0);
    if (key === index && key < (a.length)) return a[key];
  }
  return $.index$slow(a, index);
};

$.ListFactory_List = function(length$) {
  return $.Primitives_newList($.intTypeCheck(length$));
};

$.HashMapImplementation__isPowerOfTwo = function(x) {
  $.intTypeCheck(x);
  return $.eq($.and(x, $.sub(x, 1)), 0);
};

$.sort = function(receiver, compare) {
  if ($.isJsArray(receiver) !== true) return receiver.sort$1(compare);
  $.checkMutable(receiver, 'sort');
  $.DualPivotQuicksort_sort(receiver, compare);
};

$.captureStackTrace = function(ex) {
  if (ex == null) ex = $.CTC0;
  var jsError = (new Error());
  jsError.dartException = ex;
  jsError.toString = $.toStringWrapper.$call$0;
  return jsError;
};

$.PolygonShape$ = function() {
  var t1 = $.ListFactory_List(8);
  $.setRuntimeTypeInfo(t1, ({E: 'Vector'}));
  var t2 = $.ListFactory_List(8);
  $.setRuntimeTypeInfo(t2, ({E: 'Vector'}));
  t1 = new $.PolygonShape(0, t2, t1, $.Vector$(0, 0), 0.01, 1);
  t1.PolygonShape$0();
  return t1;
};

$.DualPivotQuicksort_sort = function(a, compare) {
  $.listTypeCheck(a);
  $.DualPivotQuicksort__doSort(a, 0, $.sub($.get$length(a), 1), compare);
};

$.PolygonShape$copy = function(other) {
  $.propertyTypeCheck(other, 'is$PolygonShape');
  var t1 = other.get$radius();
  var t2 = other.get$vertexCount();
  var t3 = $.ListFactory_List(8);
  $.setRuntimeTypeInfo(t3, ({E: 'Vector'}));
  var t4 = $.ListFactory_List(8);
  $.setRuntimeTypeInfo(t4, ({E: 'Vector'}));
  t1 = new $.PolygonShape(t2, t4, t3, $.Vector$copy(other.get$centroid()), t1, 1);
  t1.PolygonShape$copy$1(other);
  return t1;
};

$.StackOverflowException$ = function() {
  return new $.StackOverflowException();
};

$.eq = function(a, b) {
  if (a == null) return b == null;
  if (b == null) return false;
  if (typeof a === "object") {
    if (!!a.operator$eq$1) return a.operator$eq$1(b);
  }
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

$.HashMapImplementation$ = function() {
  var t1 = new $.HashMapImplementation(null, null, null, null, null);
  t1.HashMapImplementation$0();
  return t1;
};

$.substring$1 = function(receiver, startIndex) {
  if (!(typeof receiver === 'string')) return receiver.substring$1(startIndex);
  return $.substring$2(receiver, startIndex, null);
};

$.div$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a / b;
  return a.operator$div$1(b);
};

$.FixtureDef$ = function() {
  var t1 = new $.FixtureDef($.Filter$(), false, 0, 0, 0.2, null, null);
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
  var t4 = $.ListFactory_List(3);
  $.setRuntimeTypeInfo(t4, ({E: 'SimplexVertex'}));
  var t5 = $.Vector$(0, 0);
  var t6 = $.Vector$(0, 0);
  var t7 = $.Vector$(0, 0);
  var t8 = $.Vector$(0, 0);
  var t9 = $.Vector$(0, 0);
  var t10 = $.Vector$(0, 0);
  t1 = new $.Simplex($.Vector$(0, 0), t10, t9, t8, t6, t7, t5, 0, t4, t3, t2, t1);
  t1.Simplex$0();
  return t1;
};

$.BodyDef$ = function() {
  var t1 = $.Vector$(0, 0);
  return new $.BodyDef(true, true, 0, 0, true, false, null, false, 0, $.Vector$(0, 0), t1, null, 0, 0);
};

$.gtB = function(a, b) {
  if (typeof a === 'number' && typeof b === 'number') var t1 = (a > b);
  else {
    t1 = $.gt$slow(a, b);
    t1 = t1 === true;
  }
  return t1;
};

$.Expect__fail = function(message) {
  throw $.captureStackTrace($.ExpectException$($.stringTypeCheck(message)));
};

$.setRuntimeTypeInfo = function(target, typeInfo) {
  !(target == null) && (target.builtin$typeInfo = typeInfo);
};

$.SimplexVertex$ = function() {
  var t1 = $.Vector$(0, 0);
  var t2 = $.Vector$(0, 0);
  return new $.SimplexVertex(0, 0, 0, $.Vector$(0, 0), t2, t1);
};

$.Vector_dot = function(one, two) {
  $.propertyTypeCheck(one, 'is$Vector');
  $.propertyTypeCheck(two, 'is$Vector');
  return $.add($.mul(one.get$x(), two.get$x()), $.mul(one.get$y(), two.get$y()));
};

$.Vector3_dot = function(a, b) {
  $.propertyTypeCheck(a, 'is$Vector3');
  $.propertyTypeCheck(b, 'is$Vector3');
  return $.add($.add($.mul(a.get$x(), b.get$x()), $.mul(a.get$y(), b.get$y())), $.mul(a.get$z(), b.get$z()));
};

$.shl = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    a = (a);
    b = (b);
    if (b < 0) throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (b > 31) return 0;
    return (a << b) >>> 0;
  }
  return a.operator$shl$1(b);
};

$.NoSuchMethodException$ = function(_receiver, _functionName, _arguments, existingArgumentNames) {
  $.stringTypeCheck(_functionName);
  $.listTypeCheck(_arguments);
  return new $.NoSuchMethodException($.listTypeCheck(existingArgumentNames), _arguments, _functionName, _receiver);
};

$.lt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a < b) : $.lt$slow(a, b);
};

$.unwrapException = function(ex) {
  if ("dartException" in ex) return ex.dartException;
  var message = (ex.message);
  if (ex instanceof TypeError) {
    var type = (ex.type);
    var name$ = (ex.arguments ? ex.arguments[0] : "");
    if ($.eqB(type, 'property_not_function') || $.eqB(type, 'called_non_callable') || $.eqB(type, 'non_object_property_call') || $.eqB(type, 'non_object_property_load')) {
      if (typeof name$ === 'string' && $.startsWith(name$, '$call$') === true) return $.ObjectNotClosureException$();
      return $.NullPointerException$(null, $.CTC);
    }
    if ($.eqB(type, 'undefined_method')) {
      if (typeof name$ === 'string' && $.startsWith(name$, '$call$') === true) return $.ObjectNotClosureException$();
      return $.NoSuchMethodException$('', name$, [], null);
    }
    if (typeof message === 'string') {
      if ($.endsWith(message, 'is null') === true || $.endsWith(message, 'is undefined') === true || $.endsWith(message, 'is null or undefined') === true) return $.NullPointerException$(null, $.CTC);
      if ($.endsWith(message, 'is not a function') === true) return $.NoSuchMethodException$('', '<unknown>', [], null);
    }
    return $.ExceptionImplementation$(typeof message === 'string' ? message : '');
  }
  if (ex instanceof RangeError) {
    if (typeof message === 'string' && $.contains$1(message, 'call stack') === true) return $.StackOverflowException$();
    return $.IllegalArgumentException$('');
  }
  if (typeof InternalError == 'function' && ex instanceof InternalError) {
    if (typeof message === 'string' && message === 'too much recursion') return $.StackOverflowException$();
  }
  return ex;
};

$.ceil = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.ceil$0();
  return Math.ceil(receiver);
};

$.getTypeNameOf = function(obj) {
  var t1 = $._getTypeNameOf;
  if (t1 == null) $._getTypeNameOf = $.getFunctionForTypeNameOf();
  return $._getTypeNameOf.$call$1(obj);
};

$.Math_cos = function(x) {
  return $.MathNatives_cos($.numTypeCheck(x));
};

$.MathNatives_cos = function(value) {
  return Math.cos($.checkNum($.numTypeCheck(value)));
};

$.sub = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a - b) : $.sub$slow(a, b);
};

$.Transform_mulToOut = function(transform, vector, out) {
  $.propertyTypeCheck(transform, 'is$Transform');
  $.propertyTypeCheck(vector, 'is$Vector');
  $.propertyTypeCheck(out, 'is$Vector');
  $.assert(!(out == null));
  var tempY = $.numTypeCheck($.add($.add(transform.get$position().get$y(), $.mul(transform.get$rotation().get$col1().get$y(), vector.get$x())), $.mul(transform.get$rotation().get$col2().get$y(), vector.get$y())));
  out.set$x($.add($.add(transform.get$position().get$x(), $.mul(transform.get$rotation().get$col1().get$x(), vector.get$x())), $.mul(transform.get$rotation().get$col2().get$x(), vector.get$y())));
  out.set$y(tempY);
};

$.DualPivotQuicksort__dualPivotQuicksort$bailout = function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13) {
  switch (state) {
    case 1:
      var left = env0;
      var right = env1;
      var compare = env2;
      var a = env3;
      break;
    case 2:
      compare = env0;
      el2 = env1;
      a = env2;
      left = env3;
      right = env4;
      index1 = env5;
      el4 = env6;
      index5 = env7;
      less = env8;
      break;
    case 3:
      great = env0;
      compare = env1;
      el2 = env2;
      a = env3;
      left = env4;
      right = env5;
      index1 = env6;
      el4 = env7;
      index5 = env8;
      less = env9;
      break;
    case 4:
      compare = env0;
      el2 = env1;
      a = env2;
      left = env3;
      right = env4;
      t1 = env5;
      ak = env6;
      comp = env7;
      el4 = env8;
      less = env9;
      k = env10;
      great = env11;
      index1 = env12;
      index5 = env13;
      break;
  }
  switch (state) {
    case 0:
      $.listTypeCheck(a);
    case 1:
      state = 0;
      $.intTypeCheck(left);
      $.intTypeCheck(right);
      $.assert($.gt($.sub(right, left), 32));
      var sixth = $.intTypeCheck($.tdiv($.add($.sub(right, left), 1), 6));
      var index1 = $.intTypeCheck($.add(left, sixth));
      var index5 = $.intTypeCheck($.sub(right, sixth));
      var index3 = $.intTypeCheck($.tdiv($.add(left, right), 2));
      var index2 = $.intTypeCheck($.sub(index3, sixth));
      var index4 = $.intTypeCheck($.add(index3, sixth));
      var el1 = $.index(a, index1);
      var el2 = $.index(a, index2);
      var el3 = $.index(a, index3);
      var el4 = $.index(a, index4);
      var el5 = $.index(a, index5);
      if ($.gtB(compare.$call$2(el1, el2), 0)) {
        var t0 = el1;
        el1 = el2;
        el2 = t0;
      }
      if ($.gtB(compare.$call$2(el4, el5), 0)) {
        t0 = el5;
        el5 = el4;
        el4 = t0;
      }
      if ($.gtB(compare.$call$2(el1, el3), 0)) {
        t0 = el3;
        el3 = el1;
        el1 = t0;
      }
      if ($.gtB(compare.$call$2(el2, el3), 0)) {
        t0 = el3;
        el3 = el2;
        el2 = t0;
      }
      if ($.gtB(compare.$call$2(el1, el4), 0)) {
        t0 = el1;
        el1 = el4;
        el4 = t0;
      }
      if ($.gtB(compare.$call$2(el3, el4), 0)) {
        t0 = el3;
        el3 = el4;
        el4 = t0;
      }
      if ($.gtB(compare.$call$2(el2, el5), 0)) {
        t0 = el2;
        el2 = el5;
        el5 = t0;
      }
      if ($.gtB(compare.$call$2(el2, el3), 0)) {
        t0 = el3;
        el3 = el2;
        el2 = t0;
      }
      if ($.gtB(compare.$call$2(el4, el5), 0)) {
        t0 = el5;
        el5 = el4;
        el4 = t0;
      }
      $.indexSet(a, index1, el1);
      $.indexSet(a, index3, el3);
      $.indexSet(a, index5, el5);
      $.indexSet(a, index2, $.index(a, left));
      $.indexSet(a, index4, $.index(a, right));
      var less = $.intTypeCheck($.add(left, 1));
    case 2:
      state = 0;
      var great = $.intTypeCheck($.sub(right, 1));
    case 3:
      state = 0;
      var t1 = $.boolTypeCheck($.eq(compare.$call$2(el2, el4), 0)) === true;
    case 4:
      if (state == 4 || (state == 0 && t1)) {
        switch (state) {
          case 0:
            var k = less;
          case 4:
            L0: while (true) {
              switch (state) {
                case 0:
                  if (!$.leB(k, great)) break L0;
                case 4:
                  c$0:{
                    switch (state) {
                      case 0:
                        var ak = $.index(a, k);
                        var comp = $.intTypeCheck(compare.$call$2(ak, el2));
                      case 4:
                        state = 0;
                        if ($.eqB(comp, 0)) break c$0;
                        if ($.ltB(comp, 0)) {
                          if (!$.eqB(k, less)) {
                            $.indexSet(a, k, $.index(a, less));
                            $.indexSet(a, less, ak);
                          }
                          less = $.intTypeCheck($.add(less, 1));
                        } else {
                          for (; true; ) {
                            comp = $.intTypeCheck(compare.$call$2($.index(a, great), el2));
                            if ($.gtB(comp, 0)) {
                              great = $.intTypeCheck($.sub(great, 1));
                              continue;
                            } else {
                              if ($.ltB(comp, 0)) {
                                $.indexSet(a, k, $.index(a, less));
                                var less0 = $.intTypeCheck($.add(less, 1));
                                $.indexSet(a, less, $.index(a, great));
                                var great0 = $.intTypeCheck($.sub(great, 1));
                                $.indexSet(a, great, ak);
                                great = great0;
                                less = less0;
                                break;
                              } else {
                                $.indexSet(a, k, $.index(a, great));
                                great0 = $.intTypeCheck($.sub(great, 1));
                                $.indexSet(a, great, ak);
                                great = great0;
                                break;
                              }
                            }
                          }
                        }
                    }
                  }
                  k = $.intTypeCheck($.add(k, 1));
              }
            }
        }
      } else {
        for (k = less; $.leB(k, great); k = $.intTypeCheck($.add(k, 1))) {
          ak = $.index(a, k);
          if ($.ltB($.intTypeCheck(compare.$call$2(ak, el2)), 0)) {
            if (!$.eqB(k, less)) {
              $.indexSet(a, k, $.index(a, less));
              $.indexSet(a, less, ak);
            }
            less = $.intTypeCheck($.add(less, 1));
          } else {
            if ($.gtB($.intTypeCheck(compare.$call$2(ak, el4)), 0)) {
              for (; true; ) {
                if ($.gtB($.intTypeCheck(compare.$call$2($.index(a, great), el4)), 0)) {
                  great = $.intTypeCheck($.sub(great, 1));
                  if ($.ltB(great, k)) break;
                  continue;
                } else {
                  if ($.ltB($.intTypeCheck(compare.$call$2($.index(a, great), el2)), 0)) {
                    $.indexSet(a, k, $.index(a, less));
                    less0 = $.intTypeCheck($.add(less, 1));
                    $.indexSet(a, less, $.index(a, great));
                    great0 = $.intTypeCheck($.sub(great, 1));
                    $.indexSet(a, great, ak);
                    great = great0;
                    less = less0;
                  } else {
                    $.indexSet(a, k, $.index(a, great));
                    great0 = $.intTypeCheck($.sub(great, 1));
                    $.indexSet(a, great, ak);
                    great = great0;
                  }
                  break;
                }
              }
            }
          }
        }
      }
      $.indexSet(a, left, $.index(a, $.sub(less, 1)));
      $.indexSet(a, $.sub(less, 1), el2);
      $.indexSet(a, right, $.index(a, $.add(great, 1)));
      $.indexSet(a, $.add(great, 1), el4);
      $.DualPivotQuicksort__doSort(a, left, $.sub(less, 2), compare);
      $.DualPivotQuicksort__doSort(a, $.add(great, 2), right, compare);
      if (t1) return;
      if ($.ltB(less, index1) && $.gtB(great, index5)) {
        for (; $.eqB(compare.$call$2($.index(a, less), el2), 0); ) {
          less = $.intTypeCheck($.add(less, 1));
        }
        for (; $.eqB(compare.$call$2($.index(a, great), el4), 0); ) {
          great = $.intTypeCheck($.sub(great, 1));
        }
        for (k = less; $.leB(k, great); k = $.intTypeCheck($.add(k, 1))) {
          ak = $.index(a, k);
          if ($.eqB($.intTypeCheck(compare.$call$2(ak, el2)), 0)) {
            if (!$.eqB(k, less)) {
              $.indexSet(a, k, $.index(a, less));
              $.indexSet(a, less, ak);
            }
            less = $.intTypeCheck($.add(less, 1));
          } else {
            if ($.eqB($.intTypeCheck(compare.$call$2(ak, el4)), 0)) {
              for (; true; ) {
                if ($.eqB($.intTypeCheck(compare.$call$2($.index(a, great), el4)), 0)) {
                  great = $.intTypeCheck($.sub(great, 1));
                  if ($.ltB(great, k)) break;
                  continue;
                } else {
                  if ($.ltB($.intTypeCheck(compare.$call$2($.index(a, great), el2)), 0)) {
                    $.indexSet(a, k, $.index(a, less));
                    less0 = $.intTypeCheck($.add(less, 1));
                    $.indexSet(a, less, $.index(a, great));
                    great0 = $.intTypeCheck($.sub(great, 1));
                    $.indexSet(a, great, ak);
                    great = great0;
                    less = less0;
                  } else {
                    $.indexSet(a, k, $.index(a, great));
                    great0 = $.intTypeCheck($.sub(great, 1));
                    $.indexSet(a, great, ak);
                    great = great0;
                  }
                  break;
                }
              }
            }
          }
        }
        $.DualPivotQuicksort__doSort(a, less, great, compare);
      } else $.DualPivotQuicksort__doSort(a, less, great, compare);
  }
};

$.allMatchesInStringUnchecked$bailout = function(state, patternLength, needle, haystack, length$, result) {
  for (var startIndex = 0; true; ) {
    var position = $.intTypeCheck($.indexOf$2(haystack, needle, startIndex));
    if ($.eqB(position, -1)) break;
    result.push($.StringMatch$(position, haystack, needle));
    var endIndex = $.intTypeCheck($.add(position, patternLength));
    if ($.eqB(endIndex, length$)) break;
    else {
      startIndex = $.eqB(position, endIndex) ? $.intTypeCheck($.add(startIndex, 1)) : endIndex;
    }
  }
  return result;
};

$.Arrays_copy$bailout = function(state, env0, env1, env2, env3, env4, env5) {
  switch (state) {
    case 1:
      var dst = env0;
      var dstStart = env1;
      var count = env2;
      var src = env3;
      var srcStart = env4;
      break;
    case 2:
      dst = env0;
      dstStart = env1;
      count = env2;
      srcStart = env3;
      src = env4;
      break;
    case 3:
      dst = env0;
      count = env1;
      srcStart = env2;
      dstStart = env3;
      src = env4;
      break;
    case 4:
      srcStart = env0;
      src = env1;
      dst = env2;
      i = env3;
      count = env4;
      dstStart = env5;
      break;
    case 5:
      dst = env0;
      i = env1;
      srcStart = env2;
      j = env3;
      src = env4;
      break;
  }
  switch (state) {
    case 0:
      $.listTypeCheck(src);
      $.intTypeCheck(srcStart);
      $.listTypeCheck(dst);
      $.intTypeCheck(dstStart);
      $.intTypeCheck(count);
    case 1:
      state = 0;
      if (srcStart == null) srcStart = 0;
    case 2:
      state = 0;
      if (dstStart == null) dstStart = 0;
    case 3:
      state = 0;
    case 4:
    case 5:
      if (state == 4 || state == 5 || (state == 0 && $.ltB(srcStart, dstStart))) {
        switch (state) {
          case 0:
            var i = $.intTypeCheck($.sub($.add(srcStart, count), 1));
          case 4:
            state = 0;
            var j = $.intTypeCheck($.sub($.add(dstStart, count), 1));
          case 5:
            state = 0;
            for (; $.geB(i, srcStart); i = $.intTypeCheck($.sub(i, 1)), j = $.intTypeCheck($.sub(j, 1))) {
              $.indexSet(dst, j, $.index(src, i));
            }
        }
      } else {
        for (i = srcStart, j = dstStart; $.ltB(i, $.add(srcStart, count)); i = $.intTypeCheck($.add(i, 1)), j = $.intTypeCheck($.add(j, 1))) {
          $.indexSet(dst, j, $.index(src, i));
        }
      }
  }
};

$.DualPivotQuicksort_insertionSort_$bailout = function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var left = env0;
      var right = env1;
      var compare = env2;
      var a = env3;
      break;
    case 2:
      right = env0;
      compare = env1;
      a = env2;
      left = env3;
      break;
    case 3:
      compare = env0;
      i = env1;
      a = env2;
      left = env3;
      right = env4;
      break;
  }
  switch (state) {
    case 0:
      $.listTypeCheck(a);
    case 1:
      state = 0;
      $.intTypeCheck(left);
    case 2:
      state = 0;
      $.intTypeCheck(right);
      var i = $.intTypeCheck($.add(left, 1));
    case 3:
      state = 0;
      for (; $.leB(i, right); i = $.intTypeCheck($.add(i, 1))) {
        var el = $.index(a, i);
        var j = i;
        while (true) {
          if (!($.gtB(j, left) && $.gtB(compare.$call$2($.index(a, $.sub(j, 1)), el), 0))) break;
          $.indexSet(a, j, $.index(a, $.sub(j, 1)));
          j = $.intTypeCheck($.sub(j, 1));
        }
        $.indexSet(a, j, el);
      }
  }
};

$._Lists_indexOf$bailout = function(state, element, a, startIndex, endIndex) {
  for (var i = startIndex; $.ltB(i, endIndex); i = $.intTypeCheck($.add(i, 1))) {
    if ($.eqB($.index(a, i), element)) return i;
  }
  return -1;
};

$.Arrays_indexOf$bailout = function(state, element, a, startIndex, endIndex) {
  for (var i = startIndex; $.ltB(i, endIndex); i = $.intTypeCheck($.add(i, 1))) {
    if ($.eqB($.index(a, i), element)) return i;
  }
  return -1;
};

$.AxisAlignedBox_testOverlap$bailout = function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      t1 = env0;
      var a = env1;
      var b = env2;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      a = env2;
      b = env3;
      break;
    case 3:
      t1 = env0;
      a = env1;
      b = env2;
      break;
    case 4:
      t1 = env0;
      a = env1;
      b = env2;
      t2 = env3;
      break;
    case 5:
      t1 = env0;
      a = env1;
      b = env2;
      break;
    case 6:
      t1 = env0;
      a = env1;
      b = env2;
      t2 = env3;
      break;
    case 7:
      t1 = env0;
      b = env1;
      break;
    case 8:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      $.propertyTypeCheck(a, 'is$AxisAlignedBox');
      $.propertyTypeCheck(b, 'is$AxisAlignedBox');
      var t1 = b.get$lowerBound().get$x();
    case 1:
      state = 0;
      var t2 = a.get$upperBound().get$x();
    case 2:
      state = 0;
    case 3:
    case 4:
      if (state == 3 || state == 4 || (state == 0 && !$.gtB(t1, t2))) {
        switch (state) {
          case 0:
            t1 = b.get$lowerBound().get$y();
          case 3:
            state = 0;
            t2 = a.get$upperBound().get$y();
          case 4:
            state = 0;
            t2 = $.gtB(t1, t2);
            t1 = t2;
        }
      } else {
        t1 = true;
      }
    case 5:
    case 6:
    case 7:
    case 8:
      if (state == 5 || state == 6 || state == 7 || state == 8 || (state == 0 && !t1)) {
        switch (state) {
          case 0:
            t1 = a.get$lowerBound().get$x();
          case 5:
            state = 0;
            t2 = b.get$upperBound().get$x();
          case 6:
            state = 0;
          case 7:
          case 8:
            if (state == 7 || state == 8 || (state == 0 && !$.gtB(t1, t2))) {
              switch (state) {
                case 0:
                  t1 = a.get$lowerBound().get$y();
                case 7:
                  state = 0;
                  t2 = b.get$upperBound().get$y();
                case 8:
                  state = 0;
                  t2 = $.gtB(t1, t2);
                  t1 = t2;
              }
            } else {
              t1 = true;
            }
        }
      } else {
        t1 = true;
      }
      return !t1;
  }
};

$._Lists_getRange$bailout = function(state, length$, accumulator, a, start) {
  $.intTypeCheck(length$);
  $.listTypeCheck(accumulator);
  if ($.ltB(length$, 0)) throw $.captureStackTrace($.IllegalArgumentException$('length'));
  if ($.ltB(start, 0)) throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var end = $.intTypeCheck($.add(start, length$));
  if ($.gtB(end, $.get$length(a))) throw $.captureStackTrace($.IndexOutOfRangeException$(end));
  for (var i = start; $.ltB(i, end); i = $.intTypeCheck($.add(i, 1))) {
    $.add$1(accumulator, $.index(a, i));
  }
  return accumulator;
};

$.dynamicBind.$call$4 = $.dynamicBind;
$.dynamicBind.$name = "dynamicBind";
$.throwNoSuchMethod.$call$3 = $.throwNoSuchMethod;
$.throwNoSuchMethod.$name = "throwNoSuchMethod";
$.typeNameInIE.$call$1 = $.typeNameInIE;
$.typeNameInIE.$name = "typeNameInIE";
$.typeNameInChrome.$call$1 = $.typeNameInChrome;
$.typeNameInChrome.$name = "typeNameInChrome";
$.toStringWrapper.$call$0 = $.toStringWrapper;
$.toStringWrapper.$name = "toStringWrapper";
$.invokeClosure.$call$5 = $.invokeClosure;
$.invokeClosure.$name = "invokeClosure";
$.typeNameInFirefox.$call$1 = $.typeNameInFirefox;
$.typeNameInFirefox.$name = "typeNameInFirefox";
$.constructorNameFallback.$call$1 = $.constructorNameFallback;
$.constructorNameFallback.$name = "constructorNameFallback";
Isolate.$finishClasses($$);
$$ = {};
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC = Isolate.makeConstantList([]);
$.CTC7 = new Isolate.$isolateProperties.Object();
$.CTC3 = Isolate.makeConstantList([10, 30]);
$.CTC6 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC4 = Isolate.makeConstantList([10, 100, 500, 2000]);
$.CTC5 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'Chrome|DumpRenderTree');
$.CTC0 = new Isolate.$isolateProperties.NullPointerException(Isolate.$isolateProperties.CTC, null);
$.CTC1 = new Isolate.$isolateProperties.NoMoreElementsException();
$.CTC2 = new Isolate.$isolateProperties.EmptyQueueException();
$.TimeOfImpact_toiCalls = null;
$.TimeOfImpact_toiRootIters = null;
$.TimeOfImpact_toiMaxIters = null;
$._getTypeNameOf = null;
$.TimeOfImpact_toiMaxRootIters = null;
$.TimeOfImpact_toiIters = null;
var $ = null;
Isolate.$finishClasses($$);
$$ = {};
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
$.defineProperty(Object.prototype, 'is$_XPathResultImpl', function() { return false; });
$.defineProperty(Object.prototype, 'is$Touch', function() { return false; });
$.defineProperty(Object.prototype, 'is$Node', function() { return false; });
$.defineProperty(Object.prototype, 'is$JavaScriptIndexingBehavior', function() { return false; });
$.defineProperty(Object.prototype, 'is$Collection', function() { return false; });
$.defineProperty(Object.prototype, 'is$_StyleSheetImpl', function() { return false; });
$.defineProperty(Object.prototype, 'is$File', function() { return false; });
$.defineProperty(Object.prototype, 'is$_TouchImpl', function() { return false; });
$.defineProperty(Object.prototype, 'is$_NodeImpl', function() { return false; });
$.defineProperty(Object.prototype, 'is$Iterable', function() { return false; });
$.defineProperty(Object.prototype, 'is$List', function() { return false; });
$.defineProperty(Object.prototype, 'is$Map', function() { return false; });
$.defineProperty(Object.prototype, 'is$_FileImpl', function() { return false; });
$.defineProperty(Object.prototype, 'is$StyleSheet', function() { return false; });
$.defineProperty(Object.prototype, 'toString$0', function() { return $.toStringForNativeObject(this); });
$.$defineNativeClass('HTMLAnchorElement', ["type?", "shape=", "name?"], {
 toString$0: function() {
  return this.toString();
 },
 is$Node: function() { return true; }
});

$.$defineNativeClass('WebKitAnimation', ["name?"], {
});

$.$defineNativeClass('WebKitAnimationList', ["length?"], {
});

$.$defineNativeClass('HTMLAppletElement', ["name?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLAreaElement', ["shape="], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('Attr', ["value=", "name?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('AudioBuffer', ["length?"], {
});

$.$defineNativeClass('HTMLAudioElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('AudioParam', ["value=", "name?"], {
});

$.$defineNativeClass('HTMLBRElement', [], {
 clear$0: function() { return this.clear.$call$0(); },
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLBaseElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLBaseFontElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('BiquadFilterNode', ["type?"], {
});

$.$defineNativeClass('Blob', ["type?"], {
});

$.$defineNativeClass('HTMLBodyElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLButtonElement', ["value=", "type?", "name?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('CDATASection', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('WebKitCSSKeyframesRule', ["name?"], {
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
 get$position: function() {
  return this.getPropertyValue$1('position');
 },
 get$clear: function() {
  return this.getPropertyValue$1('clear');
 },
 clear$0: function() { return this.get$clear().$call$0(); },
 getPropertyValue$1: function(propertyName) {
  return this.getPropertyValue($.stringTypeCheck(propertyName));
 }
});

$.$defineNativeClass('CSSStyleSheet', [], {
 is$StyleSheet: function() { return true; }
});

$.$defineNativeClass('CSSValueList', ["length?"], {
});

$.$defineNativeClass('HTMLCanvasElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('CharacterData', ["length?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('ClientRectList', ["length?"], {
});

$.$defineNativeClass('Comment', [], {
 is$Node: function() { return true; }
});

_ConsoleImpl = (typeof console == 'undefined' ? {} : console);
_ConsoleImpl.count$0 = function() {
  return this.count();
 };
_ConsoleImpl.get$count = function() { return new $.BoundClosure(this, 'count$0'); };
$.$defineNativeClass('HTMLContentElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('ConvolverNode', [], {
 normalize$0: function() { return this.normalize.$call$0(); }
});

$.$defineNativeClass('HTMLDListElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('DOMError', ["name?"], {
});

$.$defineNativeClass('DOMException', ["name?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('DOMFileSystem', ["name?"], {
});

$.$defineNativeClass('DOMFileSystemSync', ["name?"], {
});

$.$defineNativeClass('DOMMimeType', ["type?"], {
});

$.$defineNativeClass('DOMMimeTypeArray', ["length?"], {
});

$.$defineNativeClass('DOMPlugin', ["name?", "length?"], {
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
 contains$1: function(string) {
  return this.contains($.stringTypeCheck(string));
 },
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, $.intTypeCheck(start), $.intTypeCheck(rangeLength), []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  $.listTypeCheck(from);
  $.intTypeCheck(startFrom);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, $.stringTypeCheck(element), $.intTypeCheck(start), $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  $.stringTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  $.stringTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'String'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.stringTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('DOMTokenList', ["length?"], {
 toString$0: function() {
  return this.toString();
 },
 contains$1: function(token) {
  return this.contains($.stringTypeCheck(token));
 },
 add$1: function(token) {
  return this.add($.stringTypeCheck(token));
 }
});

$.$defineNativeClass('DataTransferItem', ["type?"], {
});

$.$defineNativeClass('DataTransferItemList', ["length?"], {
 clear$0: function() {
  return this.clear();
 },
 add$2: function(data_OR_file, type) {
  return this.add(data_OR_file,$.stringTypeCheck(type));
 },
 add$1: function(data_OR_file) {
  return this.add(data_OR_file);
}
});

$.$defineNativeClass('DedicatedWorkerContext', [], {
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,$.listTypeCheck(messagePorts));
 },
 postMessage$1: function(message) {
  return this.postMessage(message);
}
});

$.$defineNativeClass('HTMLDetailsElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLDirectoryElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLDivElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLDocument', ["body?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('DocumentFragment', [], {
 get$parent: function() {
  return;
 },
 get$id: function() {
  return '';
 },
 is$Node: function() { return true; }
});

$.$defineNativeClass('DocumentType', ["name?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('Element', ["id?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLEmbedElement', ["type?", "name?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('Entity', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('EntityReference', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('Entry', ["name?"], {
});

$.$defineNativeClass('EntryArray', ["length?"], {
});

$.$defineNativeClass('EntryArraySync', ["length?"], {
});

$.$defineNativeClass('EntrySync', ["name?"], {
 remove$0: function() {
  return this.remove();
 }
});

$.$defineNativeClass('Event', ["type?"], {
});

$.$defineNativeClass('EventException', ["name?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('HTMLFieldSetElement', ["type?", "name?"], {
 get$elements: function() {
  return this.lib$_FieldSetElementImpl$elements;
 },
 set$elements: function(x) {
  this.lib$_FieldSetElementImpl$elements = x;
 },
 is$Node: function() { return true; }
});

$.$defineNativeClass('File', ["name?"], {
 is$_FileImpl: function() { return true; },
 is$File: function() { return true; }
});

$.$defineNativeClass('FileException', ["name?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('FileList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, $.intTypeCheck(start), $.intTypeCheck(rangeLength), []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  $.listTypeCheck(from);
  $.intTypeCheck(startFrom);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, $.callTypeCheck(element, 'is$File'), $.intTypeCheck(start), $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  $.callTypeCheck(value, 'is$File');
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  $.callTypeCheck(value, 'is$File');
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'File'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.callTypeCheck(value, 'is$_FileImpl');
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('FileWriter', ["position?", "length?"], {
});

$.$defineNativeClass('FileWriterSync', ["position?", "length?"], {
});

$.$defineNativeClass('Float32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, $.intTypeCheck(start), $.intTypeCheck(rangeLength), []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  $.listTypeCheck(from);
  $.intTypeCheck(startFrom);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, $.numTypeCheck(element), $.intTypeCheck(start), $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  $.numTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  $.numTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'num'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.numTypeCheck(value);
  this[index] = value;
 },
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('Float64Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, $.intTypeCheck(start), $.intTypeCheck(rangeLength), []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  $.listTypeCheck(from);
  $.intTypeCheck(startFrom);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, $.numTypeCheck(element), $.intTypeCheck(start), $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  $.numTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  $.numTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'num'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.numTypeCheck(value);
  this[index] = value;
 },
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('HTMLFontElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLFormElement', ["name?", "length?"], {
 reset$0: function() {
  return this.reset();
 },
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLFrameElement', ["name?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLFrameSetElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLHRElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLAllCollection', ["length?"], {
});

$.$defineNativeClass('HTMLCollection', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, $.intTypeCheck(start), $.intTypeCheck(rangeLength), []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  $.listTypeCheck(from);
  $.intTypeCheck(startFrom);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, $.callTypeCheck(element, 'is$Node'), $.intTypeCheck(start), $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  $.callTypeCheck(value, 'is$Node');
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  $.callTypeCheck(value, 'is$Node');
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.callTypeCheck(value, 'is$_NodeImpl');
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('HTMLOptionsCollection', [], {
 set$length: function(value) {
  $.intTypeCheck(value);
  this.length = value;;
 },
 get$length: function() {
  return this.length;;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('HTMLHeadElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLHeadingElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('History', ["state?", "length?"], {
});

$.$defineNativeClass('HTMLHtmlElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('IDBCursor', ["key?"], {
 advance$1: function(count) {
  return this.advance($.intTypeCheck(count));
 }
});

$.$defineNativeClass('IDBCursorWithValue', ["value?"], {
});

$.$defineNativeClass('IDBDatabase', ["name?"], {
});

$.$defineNativeClass('IDBDatabaseException', ["name?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('IDBIndex', ["name?"], {
 count$1: function(key_OR_range) {
  return this.count(key_OR_range);
 },
 get$count: function() { return new $.BoundClosure2(this, 'count$1'); }
});

$.$defineNativeClass('IDBObjectStore', ["name?"], {
 count$1: function(key_OR_range) {
  return this.count(key_OR_range);
 },
 get$count: function() { return new $.BoundClosure3(this, 'count$1'); },
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

$.$defineNativeClass('HTMLIFrameElement', ["name?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLImageElement', ["y?", "x?", "name?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLInputElement', ["value=", "type?", "name?"], {
 step$3: function(arg0, arg1, arg2) { return this.step.$call$3(arg0, arg1, arg2); },
 is$Node: function() { return true; }
});

$.$defineNativeClass('Int16Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, $.intTypeCheck(start), $.intTypeCheck(rangeLength), []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  $.listTypeCheck(from);
  $.intTypeCheck(startFrom);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, $.intTypeCheck(element), $.intTypeCheck(start), $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  $.intTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  $.intTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.intTypeCheck(value);
  this[index] = value;
 },
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('Int32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, $.intTypeCheck(start), $.intTypeCheck(rangeLength), []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  $.listTypeCheck(from);
  $.intTypeCheck(startFrom);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, $.intTypeCheck(element), $.intTypeCheck(start), $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  $.intTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  $.intTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.intTypeCheck(value);
  this[index] = value;
 },
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('Int8Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, $.intTypeCheck(start), $.intTypeCheck(rangeLength), []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  $.listTypeCheck(from);
  $.intTypeCheck(startFrom);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, $.intTypeCheck(element), $.intTypeCheck(start), $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  $.intTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  $.intTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.intTypeCheck(value);
  this[index] = value;
 },
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('JavaScriptCallFrame', ["type?"], {
});

$.$defineNativeClass('HTMLKeygenElement', ["type?", "name?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLLIElement', ["value=", "type?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLLabelElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLLegendElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLLinkElement', ["type?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('Location', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('HTMLMapElement', ["name?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLMarqueeElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLMediaElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('MediaList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, $.intTypeCheck(start), $.intTypeCheck(rangeLength), []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  $.listTypeCheck(from);
  $.intTypeCheck(startFrom);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, $.stringTypeCheck(element), $.intTypeCheck(start), $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  $.stringTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  $.stringTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'String'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.stringTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('MediaStreamList', ["length?"], {
});

$.$defineNativeClass('MediaStreamTrackList', ["length?"], {
});

$.$defineNativeClass('HTMLMenuElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('MessageEvent', ["ports?"], {
});

$.$defineNativeClass('MessagePort', [], {
 postMessage$2: function(message, messagePorts) {
  return this.postMessage($.stringTypeCheck(message),$.listTypeCheck(messagePorts));
 },
 postMessage$1: function(message) {
  return this.postMessage(message);
}
});

$.$defineNativeClass('HTMLMetaElement', ["name?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLMeterElement', ["value="], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLModElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('MouseEvent', ["y?", "x?"], {
});

$.$defineNativeClass('MutationRecord', ["type?"], {
});

$.$defineNativeClass('NamedNodeMap', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, $.intTypeCheck(start), $.intTypeCheck(rangeLength), []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  $.listTypeCheck(from);
  $.intTypeCheck(startFrom);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, $.callTypeCheck(element, 'is$Node'), $.intTypeCheck(start), $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  $.callTypeCheck(value, 'is$Node');
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  $.callTypeCheck(value, 'is$Node');
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.callTypeCheck(value, 'is$_NodeImpl');
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('Node', [], {
 $dom_replaceChild$2: function(newChild, oldChild) {
  return this.replaceChild($.callTypeCheck(newChild, 'is$_NodeImpl'),$.callTypeCheck(oldChild, 'is$_NodeImpl'));
 },
 $dom_removeChild$1: function(oldChild) {
  return this.removeChild($.callTypeCheck(oldChild, 'is$_NodeImpl'));
 },
 contains$1: function(other) {
  return this.contains($.callTypeCheck(other, 'is$_NodeImpl'));
 },
 $dom_appendChild$1: function(newChild) {
  return this.appendChild($.callTypeCheck(newChild, 'is$_NodeImpl'));
 },
 set$text: function(value) {
  $.stringTypeCheck(value);
  this.textContent = value;;
 },
 get$parent: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$parent')) {
    return this.parentNode;;
  } else {
    return Object.prototype.get$parent.call(this);
  }
 },
 remove$0: function() {
  var t1 = this.get$parent();
  !(t1 == null) && $.callTypeCheck(this.get$parent(), 'is$_NodeImpl').$dom_removeChild$1(this);
  return this;
 },
 is$_NodeImpl: function() { return true; },
 is$Node: function() { return true; }
});

$.$defineNativeClass('NodeList', ["length?"], {
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  return this[index];;
 },
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$($._Lists_getRange(this, $.intTypeCheck(start), $.intTypeCheck(rangeLength), []));
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  $.listTypeCheck(from);
  $.intTypeCheck(startFrom);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, $.callTypeCheck(element, 'is$Node'), $.intTypeCheck(start), $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.callTypeCheck(value, 'is$_NodeImpl');
  this._parent.$dom_replaceChild$2(value, this.operator$index$1(index));
 },
 clear$0: function() {
  this._parent.set$text('');
 },
 removeLast$0: function() {
  var result = this.last$0();
  !(result == null) && this._parent.$dom_removeChild$1(result);
  return result;
 },
 addLast$1: function(value) {
  $.callTypeCheck(value, 'is$_NodeImpl');
  this._parent.$dom_appendChild$1(value);
 },
 add$1: function(value) {
  $.callTypeCheck(value, 'is$_NodeImpl');
  this._parent.$dom_appendChild$1(value);
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('Notation', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLOListElement', ["type?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLObjectElement', ["type?", "name?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLOptGroupElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLOptionElement', ["value="], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('Oscillator', ["type?"], {
});

$.$defineNativeClass('HTMLOutputElement', ["value=", "type?", "name?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLParagraphElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLParamElement', ["value=", "type?", "name?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('PerformanceNavigation', ["type?"], {
});

$.$defineNativeClass('WebKitPoint', ["y=", "x="], {
});

$.$defineNativeClass('PopStateEvent', ["state?"], {
});

$.$defineNativeClass('HTMLPreElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('ProcessingInstruction', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLProgressElement', ["value=", "position?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLQuoteElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('RadioNodeList', ["value="], {
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('Range', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('RangeException', ["name?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('SQLResultSetRowList', ["length?"], {
});

$.$defineNativeClass('SVGAElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphDefElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphItemElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGAngle', ["value="], {
});

$.$defineNativeClass('SVGAnimateColorElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGAnimateElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGAnimateMotionElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGAnimateTransformElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGAnimationElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGCircleElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGClipPathElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGComponentTransferFunctionElement', ["type?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGCursorElement', ["y?", "x?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGDefsElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGDescElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGDocument', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGElement', [], {
 get$id: function() {
  return this.id;;
 },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGElementInstanceList', ["length?"], {
});

$.$defineNativeClass('SVGEllipseElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGException', ["name?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('SVGFEBlendElement', ["y?", "x?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEColorMatrixElement', ["y?", "x?", "type?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEComponentTransferElement', ["y?", "x?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFECompositeElement', ["y?", "x?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEConvolveMatrixElement', ["y?", "x?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEDiffuseLightingElement', ["y?", "x?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEDisplacementMapElement', ["y?", "x?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEDistantLightElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEDropShadowElement', ["y?", "x?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEFloodElement', ["y?", "x?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncAElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncBElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncGElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncRElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEGaussianBlurElement', ["y?", "x?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEImageElement', ["y?", "x?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEMergeElement', ["y?", "x?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEMergeNodeElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEMorphologyElement', ["y?", "x?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEOffsetElement', ["y?", "x?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFEPointLightElement', ["z?", "y?", "x?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFESpecularLightingElement', ["y?", "x?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFESpotLightElement', ["z?", "y?", "x?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFETileElement', ["y?", "x?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFETurbulenceElement', ["y?", "x?", "type?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFilterElement', ["y?", "x?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFontElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceFormatElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceNameElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceSrcElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceUriElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGForeignObjectElement', ["y?", "x?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGGElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGGlyphElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGGlyphRefElement', ["y=", "x="], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGGradientElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGHKernElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGImageElement', ["y?", "x?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGLength', ["value="], {
});

$.$defineNativeClass('SVGLengthList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGLineElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGLinearGradientElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGMPathElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGMarkerElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGMaskElement', ["y?", "x?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGMatrix', ["a="], {
});

$.$defineNativeClass('SVGMetadataElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGMissingGlyphElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGNumber', ["value="], {
});

$.$defineNativeClass('SVGNumberList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPathElement', [], {
 is$Node: function() { return true; }
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
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGPoint', ["y=", "x="], {
});

$.$defineNativeClass('SVGPointList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPolygonElement', ["points?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGPolylineElement', ["points?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGRadialGradientElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGRect', ["y=", "x="], {
});

$.$defineNativeClass('SVGRectElement', ["y?", "x?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGSVGElement', ["y?", "x?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGScriptElement', ["type?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGSetElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGStopElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGStringList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGStyleElement', ["type?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGSwitchElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGSymbolElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGTRefElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGTSpanElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGTextContentElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGTextElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGTextPathElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGTextPositioningElement', ["y?", "x?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGTitleElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGTransform', ["type?", "angle?"], {
});

$.$defineNativeClass('SVGTransformList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGUseElement', ["y?", "x?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGVKernElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('SVGViewElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLScriptElement', ["type?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLSelectElement', ["value=", "type?", "name?", "length="], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLShadowElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('ShadowRoot', [], {
 get$innerHTML: function() {
  return this.lib$_ShadowRootImpl$innerHTML;
 },
 set$innerHTML: function(x) {
  this.lib$_ShadowRootImpl$innerHTML = x;
 },
 is$Node: function() { return true; }
});

$.$defineNativeClass('SharedWorkerContext', ["name?"], {
});

$.$defineNativeClass('HTMLSourceElement', ["type?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLSpanElement', [], {
 is$Node: function() { return true; }
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
  return this.setItem($.stringTypeCheck(key),$.stringTypeCheck(data));
 },
 $dom_key$1: function(index) {
  return this.key($.intTypeCheck(index));
 },
 $dom_getItem$1: function(key) {
  return this.getItem($.stringTypeCheck(key));
 },
 $dom_clear$0: function() {
  return this.clear();
 },
 get$$$dom_length: function() {
  return this.length;;
 },
 isEmpty$0: function() {
  var t1 = this.$dom_key$1(0);
  return t1 == null;
 },
 get$length: function() {
  return this.get$$$dom_length();
 },
 getValues$0: function() {
  var values = [];
  this.forEach$1(new $._StorageImpl_getValues_anon(values));
  return values;
 },
 getKeys$0: function() {
  var keys = [];
  this.forEach$1(new $._StorageImpl_getKeys_anon(keys));
  return keys;
 },
 forEach$1: function(f) {
  for (var i = 0; true; ++i) {
    var key = this.$dom_key$1(i);
    if (key == null) return;
    f.$call$2(key, this.operator$index$1(key));
  }
 },
 clear$0: function() {
  return this.$dom_clear$0();
 },
 operator$indexSet$2: function(key, value) {
  return this.$dom_setItem$2($.stringTypeCheck(key), $.stringTypeCheck(value));
 },
 operator$index$1: function(key) {
  return this.$dom_getItem$1($.stringTypeCheck(key));
 },
 containsKey$1: function(key) {
  var t1 = this.$dom_getItem$1($.stringTypeCheck(key));
  return !(t1 == null);
 },
 is$Map: function() { return true; }
});

$.$defineNativeClass('StorageEvent', ["key?"], {
});

$.$defineNativeClass('HTMLStyleElement', ["type?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('StyleMedia', ["type?"], {
});

$.$defineNativeClass('StyleSheet', ["type?"], {
 is$_StyleSheetImpl: function() { return true; },
 is$StyleSheet: function() { return true; }
});

$.$defineNativeClass('StyleSheetList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, $.intTypeCheck(start), $.intTypeCheck(rangeLength), []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  $.listTypeCheck(from);
  $.intTypeCheck(startFrom);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, $.callTypeCheck(element, 'is$StyleSheet'), $.intTypeCheck(start), $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  $.callTypeCheck(value, 'is$StyleSheet');
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  $.callTypeCheck(value, 'is$StyleSheet');
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'StyleSheet'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.callTypeCheck(value, 'is$_StyleSheetImpl');
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('HTMLTableCaptionElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLTableCellElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLTableColElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLTableElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLTableRowElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLTableSectionElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('Text', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLTextAreaElement', ["value=", "type?", "name?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('TextTrackCue', ["text!", "position?", "id?"], {
});

$.$defineNativeClass('TextTrackCueList', ["length?"], {
});

$.$defineNativeClass('TextTrackList', ["length?"], {
});

$.$defineNativeClass('TimeRanges', ["length?"], {
});

$.$defineNativeClass('HTMLTitleElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('Touch', [], {
 is$_TouchImpl: function() { return true; },
 is$Touch: function() { return true; }
});

$.$defineNativeClass('TouchList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, $.intTypeCheck(start), $.intTypeCheck(rangeLength), []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  $.listTypeCheck(from);
  $.intTypeCheck(startFrom);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, $.callTypeCheck(element, 'is$Touch'), $.intTypeCheck(start), $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  $.callTypeCheck(value, 'is$Touch');
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  $.callTypeCheck(value, 'is$Touch');
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Touch'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.callTypeCheck(value, 'is$_TouchImpl');
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('HTMLTrackElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLUListElement', ["type?"], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('Uint16Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, $.intTypeCheck(start), $.intTypeCheck(rangeLength), []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  $.listTypeCheck(from);
  $.intTypeCheck(startFrom);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, $.intTypeCheck(element), $.intTypeCheck(start), $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  $.intTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  $.intTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.intTypeCheck(value);
  this[index] = value;
 },
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('Uint32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, $.intTypeCheck(start), $.intTypeCheck(rangeLength), []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  $.listTypeCheck(from);
  $.intTypeCheck(startFrom);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, $.intTypeCheck(element), $.intTypeCheck(start), $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  $.intTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  $.intTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.intTypeCheck(value);
  this[index] = value;
 },
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('Uint8Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, $.intTypeCheck(start), $.intTypeCheck(rangeLength), []);
 },
 setRange$4: function(start, rangeLength, from, startFrom) {
  $.intTypeCheck(start);
  $.intTypeCheck(rangeLength);
  $.listTypeCheck(from);
  $.intTypeCheck(startFrom);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot setRange on immutable List.'));
 },
 setRange$3: function(start,rangeLength,from) {
  return this.setRange$4(start,rangeLength,from,null)
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, $.intTypeCheck(element), $.intTypeCheck(start), $.get$length(this));
 },
 sort$1: function(compare) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot sort immutable List.'));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addLast$1: function(value) {
  $.intTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  $.intTypeCheck(value);
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  $.intTypeCheck(index);
  $.intTypeCheck(value);
  this[index] = value;
 },
 operator$index$1: function(index) {
  $.intTypeCheck(index);
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('Uint8ClampedArray', [], {
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$Iterable: function() { return true; }
});

$.$defineNativeClass('HTMLUnknownElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('HTMLVideoElement', [], {
 is$Node: function() { return true; }
});

$.$defineNativeClass('WebGLActiveInfo', ["type?", "name?"], {
});

$.$defineNativeClass('WebKitNamedFlow', ["name?"], {
});

$.$defineNativeClass('WheelEvent', ["y?", "x?"], {
});

$.$defineNativeClass('DOMWindow', ["name?", "length?"], {
 setTimeout$2: function(handler, timeout) {
  $.functionTypeCheck(handler);
  $.intTypeCheck(timeout);
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 }
});

$.$defineNativeClass('Worker', [], {
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,$.listTypeCheck(messagePorts));
 },
 postMessage$1: function(message) {
  return this.postMessage(message);
}
});

$.$defineNativeClass('WorkerContext', [], {
 setTimeout$2: function(handler, timeout) {
  $.functionTypeCheck(handler);
  $.intTypeCheck(timeout);
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 }
});

$.$defineNativeClass('WorkerLocation', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('XMLHttpRequestException', ["name?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('XMLHttpRequestProgressEvent', ["position?"], {
});

$.$defineNativeClass('XPathException', ["name?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('XPathExpression', [], {
 evaluate$3: function(contextNode, type, inResult) {
  return this.evaluate($.callTypeCheck(contextNode, 'is$_NodeImpl'),$.intTypeCheck(type),$.callTypeCheck(inResult, 'is$_XPathResultImpl'));
 }
});

$.$defineNativeClass('XPathResult', [], {
 is$_XPathResultImpl: function() { return true; }
});

$.$defineNativeClass('XSLTProcessor', [], {
 reset$0: function() {
  return this.reset();
 }
});

$.$defineNativeClass('DOMWindow', [], {
 setTimeout$2: function(handler, timeout) {
  $.functionTypeCheck(handler);
  $.intTypeCheck(timeout);
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 }
});

$.$defineNativeClass('Worker', [], {
 postMessage$1: function(msg) {
  return this.postMessage(msg);;
 },
 get$id: function() {
  return this.id;;
 }
});

// 313 dynamic classes.
// 358 classes
// 29 !leaf
(function(){
  var v0/*class(_SVGTextPositioningElementImpl)*/ = 'SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement';
  var v1/*class(_SVGTextContentElementImpl)*/ = [v0/*class(_SVGTextPositioningElementImpl)*/,v0/*class(_SVGTextPositioningElementImpl)*/,'SVGTextContentElement|SVGTextPathElement|SVGTextPathElement'].join('|');
  var v2/*class(_SVGGradientElementImpl)*/ = 'SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement';
  var v3/*class(_SVGComponentTransferFunctionElementImpl)*/ = 'SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement';
  var v4/*class(_SVGAnimationElementImpl)*/ = 'SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement';
  var v5/*class(_TextImpl)*/ = 'Text|CDATASection|CDATASection';
  var v6/*class(_SVGElementImpl)*/ = [v1/*class(_SVGTextContentElementImpl)*/,v2/*class(_SVGGradientElementImpl)*/,v3/*class(_SVGComponentTransferFunctionElementImpl)*/,v4/*class(_SVGAnimationElementImpl)*/,v1/*class(_SVGTextContentElementImpl)*/,v2/*class(_SVGGradientElementImpl)*/,v3/*class(_SVGComponentTransferFunctionElementImpl)*/,v4/*class(_SVGAnimationElementImpl)*/,'SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement'].join('|');
  var v7/*class(_MediaElementImpl)*/ = 'HTMLMediaElement|HTMLVideoElement|HTMLAudioElement|HTMLVideoElement|HTMLAudioElement';
  var v8/*class(_ElementImpl)*/ = [v6/*class(_SVGElementImpl)*/,v7/*class(_MediaElementImpl)*/,v6/*class(_SVGElementImpl)*/,v7/*class(_MediaElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v9/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot|ShadowRoot';
  var v10/*class(_DocumentImpl)*/ = 'HTMLDocument|SVGDocument|SVGDocument';
  var v11/*class(_CharacterDataImpl)*/ = [v5/*class(_TextImpl)*/,v5/*class(_TextImpl)*/,'CharacterData|Comment|Comment'].join('|');
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['SVGAnimationElement', v4/*class(_SVGAnimationElementImpl)*/],
    ['SVGComponentTransferFunctionElement', v3/*class(_SVGComponentTransferFunctionElementImpl)*/],
    ['SVGTextPositioningElement', v0/*class(_SVGTextPositioningElementImpl)*/],
    ['SVGTextContentElement', v1/*class(_SVGTextContentElementImpl)*/],
    ['SVGGradientElement', v2/*class(_SVGGradientElementImpl)*/],
    ['SVGElement', v6/*class(_SVGElementImpl)*/],
    ['StyleSheet', 'StyleSheet|CSSStyleSheet|CSSStyleSheet'],
    ['Text', v5/*class(_TextImpl)*/],
    ['Uint8Array', 'Uint8Array|Uint8ClampedArray|Uint8ClampedArray'],
    ['AudioParam', 'AudioParam|AudioGain|AudioGain'],
    ['WorkerContext', 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext|SharedWorkerContext|DedicatedWorkerContext'],
    ['Blob', 'Blob|File|File'],
    ['CSSRule', 'CSSRule|CSSUnknownRule|CSSStyleRule|CSSPageRule|CSSMediaRule|WebKitCSSKeyframesRule|WebKitCSSKeyframeRule|CSSImportRule|CSSFontFaceRule|CSSCharsetRule|CSSUnknownRule|CSSStyleRule|CSSPageRule|CSSMediaRule|WebKitCSSKeyframesRule|WebKitCSSKeyframeRule|CSSImportRule|CSSFontFaceRule|CSSCharsetRule'],
    ['CSSValueList', 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue|WebKitCSSFilterValue|WebKitCSSTransformValue'],
    ['CharacterData', v11/*class(_CharacterDataImpl)*/],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList|DOMSettableTokenList'],
    ['HTMLDocument', v10/*class(_DocumentImpl)*/],
    ['DocumentFragment', v9/*class(_DocumentFragmentImpl)*/],
    ['HTMLMediaElement', v7/*class(_MediaElementImpl)*/],
    ['Element', v8/*class(_ElementImpl)*/],
    ['Entry', 'Entry|FileEntry|DirectoryEntry|FileEntry|DirectoryEntry'],
    ['EntrySync', 'EntrySync|FileEntrySync|DirectoryEntrySync|FileEntrySync|DirectoryEntrySync'],
    ['Event', 'Event|WebGLContextEvent|UIEvent|WheelEvent|TouchEvent|TextEvent|SVGZoomEvent|MouseEvent|KeyboardEvent|CompositionEvent|WheelEvent|TouchEvent|TextEvent|SVGZoomEvent|MouseEvent|KeyboardEvent|CompositionEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechRecognitionError|SpeechInputEvent|ProgressEvent|XMLHttpRequestProgressEvent|XMLHttpRequestProgressEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent|WebGLContextEvent|UIEvent|WheelEvent|TouchEvent|TextEvent|SVGZoomEvent|MouseEvent|KeyboardEvent|CompositionEvent|WheelEvent|TouchEvent|TextEvent|SVGZoomEvent|MouseEvent|KeyboardEvent|CompositionEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechRecognitionError|SpeechInputEvent|ProgressEvent|XMLHttpRequestProgressEvent|XMLHttpRequestProgressEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent'],
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection|HTMLOptionsCollection'],
    ['IDBCursor', 'IDBCursor|IDBCursorWithValue|IDBCursorWithValue'],
    ['Node', [v8/*class(_ElementImpl)*/,v9/*class(_DocumentFragmentImpl)*/,v10/*class(_DocumentImpl)*/,v11/*class(_CharacterDataImpl)*/,v8/*class(_ElementImpl)*/,v9/*class(_DocumentFragmentImpl)*/,v10/*class(_DocumentImpl)*/,v11/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr'].join('|')],
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
$.main.$call$0 = $.main
if (typeof window != 'undefined' && typeof document != 'undefined' &&
    window.addEventListener && document.readyState == 'loading') {
  window.addEventListener('DOMContentLoaded', function(e) {
    $.startRootIsolate($.main);
  });
} else {
  $.startRootIsolate($.main);
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
Isolate.$finishClasses = function(collectedClasses) {
  for (var collected in collectedClasses) {
    if (Object.prototype.hasOwnProperty.call(collectedClasses, collected)) {
      var desc = collectedClasses[collected];
      Isolate.$defineClass(collected, desc.super, desc[''], desc);
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
