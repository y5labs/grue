// Generated by CoffeeScript 1.9.2
module.exports = function(limit) {
  var cache, head, shift, size, tail;
  size = 0;
  cache = {};
  head = null;
  tail = null;
  shift = function() {
    var entry;
    entry = head;
    if (entry) {
      if (head.newer) {
        head = head.newer;
        head.older = void 0;
      } else {
        head = void 0;
      }
      entry.newer = entry.older = void 0;
      delete cache[entry.key];
    }
    return entry;
  };
  return {
    size: size,
    cache: cache,
    get: function(key) {
      var entry;
      entry = cache[key];
      if (entry == null) {
        return null;
      }
      if (entry === tail) {
        return entry.value;
      }
      if (entry.newer) {
        if (entry === head) {
          head = entry.newer;
        }
        entry.newer.older = entry.older;
      }
      if (entry.older) {
        entry.older.newer = entry.newer;
      }
      entry.newer = void 0;
      entry.older = tail;
      if (tail) {
        tail.newer = entry;
      }
      tail = entry;
      return entry.value;
    },
    set: function(key, value) {
      var entry;
      entry = {
        key: key,
        value: value
      };
      cache[key] = entry;
      if (tail) {
        tail.newer = entry;
        entry.older = tail;
      } else {
        head = entry;
      }
      tail = entry;
      if (size === limit) {
        return shift();
      } else {
        return size++;
      }
    }
  };
};