/// <reference lib="es2015" />
/// <reference lib="es2018.asynciterable" />
/// <reference lib="dom" />
function concat(...sources) {
  return (async function* () {
    for (let source of sources) {
      for await (let item of source) {
        yield item;
      }
    }
  })();
}
export { concat };
function merge(...sources) {
  return (async function* () {
    for (let source of sources) {
      for await (let item of source) {
        yield item;
      }
    }
  })();
}
export { merge };
function zip(source1, source2) {
  return (async function* () {
    const items1 = [];
    const items2 = [];
    const getAt = (arr, idx) => {
      arr.find((item, i) => {
        i === idx;
      });
    };
    {
      for await (let item of source1) {
        items1.push(item);
      }
      for await (let item of source2) {
        items2.push(item);
      }
      let i = 0;
      let len = Math.min(items1.length, items2.length);
      while (i < len) {
        yield [getAt(items1, i), getAt(items2, i)];
        i = i + 1;
      }
    }
  })();
}
export { zip };
function combineLatest(...sources) {
  return (async function* () {
    const latest = new Array(sources.length);
    const hasValue = new Array(sources.length);
    for (let source of sources) {
      for await (let item of source) {
        yield [item];
      }
    }
  })();
}
export { combineLatest };
function debounce(ms) {
  return async function* (source) {
    let lastValue = null;
    let hasValue = false;
    {
      for await (let item of source) {
        lastValue = item;
        hasValue = true;
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
    for await (let item of source) {
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
    for await (let item of source) {
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
    for await (let item of source) {
      yield item;
    }
  };
}
export { timeout };
function buffer(ms) {
  return async function* (source) {
    let batch = [];
    for await (let item of source) {
      batch.push(item);
    }
    if (batch.length > 0) {
      yield batch;
    }
  };
}
export { buffer };
function catchError(handler) {
  return async function* (source) {
    try {
      for await (let item of source) {
        yield item;
      }
    } catch (err) {
      const fallback = handler(err);
      for await (let item of fallback) {
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
        for await (let item of source) {
          yield item;
        }
        return;
      } catch (err) {
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
      for await (let item of source) {
        yield item;
      }
    } catch (_) {
      for await (let item of fallback) {
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
      for await (let item of source) {
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
    for await (let item of source) {
      if (!hasLast || !comparator(last, item)) {
        yield item;
        last = item;
        hasLast = true;
      }
    }
  };
}
export { distinctUntilChanged };
function skip(n) {
  return async function* (source) {
    let count = 0;
    for await (let item of source) {
      count = count + 1;
      if (count > n) {
        yield item;
      }
    }
  };
}
export { skip };
function skipWhile(predicate) {
  return async function* (source) {
    let skipping = true;
    for await (let item of source) {
      if (skipping) {
        if (predicate(item)) {
        } else {
          skipping = false;
          yield item;
        }
      } else {
        yield item;
      }
    }
  };
}
export { skipWhile };
function flatten() {
  return async function* (source) {
    for await (let inner of source) {
      for await (let item of inner) {
        yield item;
      }
    }
  };
}
export { flatten };
function flatMapLatest(fn) {
  return async function* (source) {
    for await (let item of source) {
      const inner = fn(item);
      for await (let value of inner) {
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
    for await (let item of source) {
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
          for await (let item of source) {
            if (predicate(item)) {
              yield item;
            }
          }
        })(),
        (async function* () {
          for await (let item of source) {
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
    for await (let item of source) {
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
      for await (let item of source) {
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
  return async function (source) {
    let total = 0;
    {
      for await (let item of source) {
        total = total + item;
      }
      return total;
    }
  };
}
export { sum };
function average() {
  return async function (source) {
    let sum = 0;
    let count = 0;
    {
      for await (let item of source) {
        sum = sum + item;
        count = count + 1;
      }
      return count === 0 ? 0 : sum / count;
    }
  };
}
export { average };
function min() {
  return async function (source) {
    let minVal = Infinity;
    let hasValue = false;
    {
      for await (let item of source) {
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
      for await (let item of source) {
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
