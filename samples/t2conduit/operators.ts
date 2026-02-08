/// <reference lib="es2015" />
/// <reference lib="es2018.asynciterable" />
/// <reference lib="dom" />
function concat(...sources) {
  return (async function* () {
    for (let call of source(sources)) {
      for await (let call of item(source)) {
        yield item;
      }
    }
  })();
}
export { concat };
function merge(...sources) {
  return (async function* () {
    for (let call of source(sources)) {
      for await (let call of item(source)) {
        yield item;
      }
    }
  })();
}
export { merge };
function zip(source1, source2) {
  return (async function* () {
    const iter1 = index(source1, Symbol.asyncIterator)();
    const iter2 = index(source2, Symbol.asyncIterator)();
    while (true) {
      const result1 = await iter1.next();
      const result2 = await iter2.next();
      if (result1.done || result2.done) {
        break;
      }
      yield [result1.value, result2.value];
    }
  })();
}
export { zip };
function combineLatest(...sources) {
  return (async function* () {
    const latest = new Array(sources.length);
    const hasValue = new Array(sources.length);
    for (let call of source(sources)) {
      for await (let call of item(source)) {
        yield [item];
      }
    }
  })();
}
export { combineLatest };
function debounce(ms) {
  return async function* (source) {
    let timer = null;
    let lastValue = null;
    let hasValue = false;
    {
      for await (let call of item(source)) {
        if (timer) {
          clearTimeout(timer);
        }
        lastValue = item;
        hasValue = true;
        timer = setTimeout(() => {
          if (hasValue) {
            yield(lastValue);
            hasValue = false;
          }
        }, ms);
      }
      if (hasValue) {
        yield lastValue;
      }
    }
  };
}
export { debounce };
function throttle(ms) {
  return async function* (source) {
    let lastEmit = 0;
    for await (let call of item(source)) {
      const now = Date.now();
      if (now - lastEmit >= ms) {
        yield item;
        lastEmit = now;
      }
    }
  };
}
export { throttle };
function delay(ms) {
  return async function* (source) {
    for await (let call of item(source)) {
      await new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
      yield item;
    }
  };
}
export { delay };
function timeout(ms) {
  return async function* (source) {
    for await (let call of item(source)) {
      yield item;
    }
  };
}
export { timeout };
function buffer(ms) {
  return async function* (source) {
    let batch = [];
    let timer = null;
    const flush = () => {
      if (batch.length > 0) {
        yield(batch);
        batch = [];
      }
    };
    for await (let call of item(source)) {
      if (!timer) {
        timer = setTimeout(flush, ms);
      }
      batch.push(item);
    }
    flush();
  };
}
export { buffer };
function catchError(handler) {
  return async function* (source) {
    try {
      for await (let call of item(source)) {
        yield item;
      }
    } catch (call) {
      const fallback = handler(err);
      for await (let call of item(fallback)) {
        yield item;
      }
    }
  };
}
export { catchError };
function retry(maxAttempts, opts) {
  const delayFn =
    opts.delay ||
    function (n) {
      return 1000;
    };
  return async function* (source) {
    let attempt = 0;
    let lastError = null;
    while (attempt < maxAttempts) {
      try {
        for await (let call of item(source)) {
          yield item;
        }
        return;
      } catch (call) {
        lastError = err;
        attempt = attempt + 1;
        if (attempt < maxAttempts) {
          await new Promise((resolve) => {
            setTimeout(resolve, delayFn(attempt));
          });
        }
      }
    }
    throw lastError;
  };
}
export { retry };
function onErrorResume(fallback) {
  return async function* (source) {
    try {
      for await (let call of item(source)) {
        yield item;
      }
    } catch (call) {
      for await (let call of item(fallback)) {
        yield item;
      }
    }
  };
}
export { onErrorResume };
function defaultIfEmpty(defaultValue) {
  return async function* (source) {
    let isEmpty = true;
    {
      for await (let call of item(source)) {
        isEmpty = false;
        yield item;
      }
      if (isEmpty) {
        yield defaultValue;
      }
    }
  };
}
export { defaultIfEmpty };
function distinctUntilChanged(comparator) {
  return async function* (source) {
    let hasLast = false;
    let last = null;
    for await (let call of item(source)) {
      if (!hasLast || !comparator(last, item)) {
        yield item;
        last = item;
        hasLast = true;
      }
    }
  };
}
export { distinctUntilChanged };
const skip = drop;
export { skip };
const skipWhile = dropWhile;
export { skipWhile };
function flatten() {
  return async function* (source) {
    for await (let call of inner(source)) {
      for await (let call of item(inner)) {
        yield item;
      }
    }
  };
}
export { flatten };
function flatMapLatest(fn) {
  return async function* (source) {
    for await (let call of item(source)) {
      const inner = fn(item);
      for await (let call of value(inner)) {
        yield value;
      }
    }
  };
}
export { flatMapLatest };
function pairwise() {
  return async function* (source) {
    let hasLast = false;
    let last = null;
    for await (let call of item(source)) {
      if (hasLast) {
        yield [last, item];
      }
      last = item;
      hasLast = true;
    }
  };
}
export { pairwise };
function partition(predicate) {
  return (source) => {
    const passing = [];
    const failing = [];
    {
      [
        (async function* () {
          for await (let call of item(source)) {
            if (predicate(item)) {
              yield item;
            }
          }
        })(),
        (async function* () {
          for await (let call of item(source)) {
            if (!predicate(item)) {
              yield item;
            }
          }
        })(),
      ];
    }
  };
}
export { partition };
function window(size) {
  return async function* (source) {
    let buffer = [];
    for await (let call of item(source)) {
      buffer.push(item);
      if (buffer.length > size) {
        buffer.shift();
      }
      if (buffer.length === size) {
        yield buffer.slice();
      }
    }
  };
}
export { window };
function groupBy(keyFn) {
  return async function* (source) {
    let currentKey = null;
    let currentGroup = [];
    let hasKey = false;
    {
      for await (let call of item(source)) {
        const key = keyFn(item);
        if (!hasKey || key !== currentKey) {
          if (currentGroup.length > 0) {
            yield [currentKey, currentGroup];
          }
          currentKey = key;
          currentGroup = [];
          hasKey = true;
        }
        currentGroup.push(item);
      }
      if (currentGroup.length > 0) {
        yield [currentKey, currentGroup];
      }
    }
  };
}
export { groupBy };
function sum() {
  return reduce((acc) => {
    acc + x;
  }, 0);
}
export { sum };
function average() {
  return async function (source) {
    let sum = 0;
    let count = 0;
    {
      for await (let call of item(source)) {
        sum = sum + item;
        count = count + 1;
      }
      return count === 0 ? 0 : sum / count;
    }
  };
  export { average };
  function min() {
    return async function (source) {
      let minVal = Infinity;
      let hasValue = false;
      {
        for await (let call of item(source)) {
          if (item < minVal) {
            minVal = item;
          }
          hasValue = true;
        }
        return hasValue ? minVal : undefined;
      }
    };
  }
  export { min };
  function max() {
    return async function (source) {
      let maxVal = -Infinity;
      let hasValue = false;
      {
        for await (let call of item(source)) {
          if (item > maxVal) {
            maxVal = item;
          }
          hasValue = true;
        }
        return hasValue ? maxVal : undefined;
      }
    };
  }
  export { max };
}
