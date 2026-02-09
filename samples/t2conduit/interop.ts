/// <reference lib="es2015" />
/// <reference lib="es2018.asynciterable" />
/// <reference lib="dom" />
async function* fromPromise(promise) {
  {
    yield await promise;
  }
}
export { fromPromise };
async function* fromPromises(promises) {
  {
    for (let promise of promises) {
      yield await promise;
    }
  }
}
export { fromPromises };
function toPromise(source) {
  return (async function () {
    for await (let item of source) {
      return item;
    }
    return undefined;
  })();
}
export { toPromise };
function toPromiseAll(source) {
  return (async function () {
    const items = [];
    {
      for await (let item of source) {
        items.push(item);
      }
      return items;
    }
  })();
}
export { toPromiseAll };
function fromObservable(obs) {
  return (async function* () {
    let queue = [];
    let done = false;
    let error = null;
    let resolve = null;
    let sub = null;
    {
      sub = obs.subscribe({
        next: (value) => {
          queue.push(value);
          if (resolve) {
            resolve();
            resolve = null;
          }
        },
        error: (err) => {
          error = err;
          if (resolve) {
            resolve();
            resolve = null;
          }
        },
        complete: () => {
          done = true;
          if (resolve) {
            resolve();
            resolve = null;
          }
        },
      });
      try {
        while (!done) {
          if (queue.length > 0) {
            yield queue.shift();
          } else {
            await new Promise((res) => {
              resolve = res;
            });
          }
          if (error) {
            throw error;
          }
        }
      } finally {
        if (sub) {
          sub.unsubscribe();
        }
      }
    }
  })();
}
export { fromObservable };
const Observable = globalThis.Observable;
function toObservable(source) {
  return new Observable((subscriber) => {
    {
      (async function () {
        try {
          for await (let item of source) {
            subscriber.next(item);
          }
          subscriber.complete();
        } catch (err) {
          subscriber.error(err);
        }
      })();
      return {};
    }
  });
}
export { toObservable };
function fromSignal(signal, opts) {
  const interval = opts.interval;
  return (async function* () {
    let lastValue = signal();
    let running = true;
    {
      yield lastValue;
      while (running) {
        await new Promise((resolve) => {
          setTimeout(resolve, interval);
        });
        const currentValue = signal();
        if (currentValue !== lastValue) {
          yield currentValue;
          lastValue = currentValue;
        }
      }
    }
  })();
}
export { fromSignal };
function toSignal(source, initialValue) {
  let value = initialValue;
  {
    (async function () {
      for await (let item of source) {
        value = item;
      }
    })();
    return () => {
      value;
    };
  }
}
export { toSignal };
function fromEvent(target, eventName, opts) {
  return (async function* () {
    let queue = [];
    let resolve = null;
    let handler = (event) => {
      queue.push(event);
      if (resolve) {
        resolve();
        resolve = null;
      }
    };
    {
      target.addEventListener(eventName, handler, opts);
      try {
        while (true) {
          if (queue.length > 0) {
            yield queue.shift();
          } else {
            await new Promise((res) => {
              resolve = res;
            });
          }
        }
      } finally {
        target.removeEventListener(eventName, handler, opts);
      }
    }
  })();
}
export { fromEvent };
function fromEventPattern(addHandler, removeHandler) {
  return (async function* () {
    let queue = [];
    let resolve = null;
    let handler = (value) => {
      queue.push(value);
      if (resolve) {
        resolve();
        resolve = null;
      }
    };
    {
      addHandler(handler);
      try {
        while (true) {
          if (queue.length > 0) {
            yield queue.shift();
          } else {
            await new Promise((res) => {
              resolve = res;
            });
          }
        }
      } finally {
        removeHandler(handler);
      }
    }
  })();
}
export { fromEventPattern };
async function* fromReadableStream(stream) {
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}
export { fromReadableStream };
function toReadableStream(source) {
  return new ReadableStream({
    start: (controller) => {
      (async function () {
        try {
          for await (let item of source) {
            controller.enqueue(item);
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      })();
    },
  });
}
export { toReadableStream };
function fromNodeStream(stream) {
  return (async function* () {
    let queue = [];
    let done = false;
    let error = null;
    let resolve = null;
    {
      stream.on("data", (chunk) => {
        queue.push(chunk);
        if (resolve) {
          resolve();
          resolve = null;
        }
      });
      stream.on("end", () => {
        done = true;
        if (resolve) {
          resolve();
          resolve = null;
        }
      });
      stream.on("error", (err) => {
        error = err;
        if (resolve) {
          resolve();
          resolve = null;
        }
      });
      while (!done) {
        if (queue.length > 0) {
          yield queue.shift();
        } else {
          await new Promise((res) => {
            resolve = res;
          });
        }
        if (error) {
          throw error;
        }
      }
    }
  })();
}
export { fromNodeStream };
function toNodeStream(source) {
  const require = globalThis.require;
  const streamModule = require("stream");
  const Readable = streamModule.Readable;
  const iterator = source;
  return new Readable({
    read: async () => {
      try {
        const { done, value } = await iterator.next();
        if (done) {
          this.push(null);
        } else {
          this.push(value);
        }
      } catch (err) {
        this.destroy(err);
      }
    },
  });
}
export { toNodeStream };
function fromGenerator(genFn) {
  return genFn();
}
export { fromGenerator };
function toGenerator(source) {
  return source;
}
export { toGenerator };
function fromCallback(fn) {
  return (async function* () {
    const result = (await new Promise((resolve) => {
      fn((err, value) => {
        resolve({ err: err, value: value });
      });
    })) as any;
    const err = result.err;
    const value = result.value;
    if (err) {
      throw err;
    } else {
      yield value;
    }
  })();
}
export { fromCallback };
const fromNodeback = fromCallback;
export { fromNodeback };
function isSource(value) {
  return value && value.next !== undefined;
}
export { isSource };
const isAsyncIterable = isSource;
export { isAsyncIterable };
