/// <reference lib="es2015" />
/// <reference lib="es2018.asynciterable" />
/// <reference lib="dom" />
type Source<T> = AsyncIterable<T>;
type Pipe<A, B> = (arg0: Source<A>) => Source<B>;
type Sink<T, R> = (arg0: Source<T>) => Promise<R>;
function pipe2<A, B, R>(source: Source<A>, op1: Pipe<A, B> | Sink<A, R>) {
  return op1(source);
}
export { pipe2 };
function pipe3<A, B, C, R>(
  source: Source<A>,
  op1: Pipe<A, B>,
  op2: Pipe<B, C> | Sink<B, R>,
) {
  return op2(op1(source));
}
export { pipe3 };
function pipe4<A, B, C, D, R>(
  source: Source<A>,
  op1: Pipe<A, B>,
  op2: Pipe<B, C>,
  op3: Pipe<C, D> | Sink<C, R>,
) {
  return op3(op2(op1(source)));
}
export { pipe4 };
function pipe5<A, B, C, D, E, R>(
  source: Source<A>,
  op1: Pipe<A, B>,
  op2: Pipe<B, C>,
  op3: Pipe<C, D>,
  op4: Pipe<D, E> | Sink<D, R>,
) {
  return op4(op3(op2(op1(source))));
}
export { pipe5 };
function pipe<A>(source: Source<A>, ...ops: Array<Function>) {
  let result = source;
  {
    for (let op of ops) {
      result = op(result);
    }
    return result;
  }
}
export { pipe };
async function* fromArray<T>(items: Array<T>): Source<T> {
  {
    for (let item of items) {
      yield item;
    }
  }
}
export { fromArray };
const from = fromArray;
export { from };
async function* fromResponse(res: Response): Source<Uint8Array> {
  {
    const reader = res.body.getReader();
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
}
export { fromResponse };
function fromLazyPromise<T>(fn): Source<T> {
  return (async function* () {
    yield await fn();
  })();
}
export { fromLazyPromise };
async function* fromIterator<T>(iter: Iterable<T>): Source<T> {
  {
    for (let item of iter) {
      yield item;
    }
  }
}
export { fromIterator };
async function* fromAsyncIterator<T>(iter: AsyncIterable<T>): Source<T> {
  {
    for await (let item of iter) {
      yield item;
    }
  }
}
export { fromAsyncIterator };
async function* empty(): Source<any> {
  {
    return;
  }
}
export { empty };
async function* never(): Source<any> {
  {
    await new Promise(() => {
      {
      }
    });
  }
}
export { never };
async function* range(
  start: number,
  end: number,
  step: number = 1,
): Source<number> {
  {
    let i = start;
    while (i < end) {
      yield i;
      i = i + step;
    }
  }
}
export { range };
async function* repeat<T>(value: T, count: number): Source<T> {
  {
    let i = 0;
    while (i < count) {
      yield value;
      i = i + 1;
    }
  }
}
export { repeat };
function map<A, B>(fn): Pipe<A, B> {
  return async function* <A>(source: Source<A>) {
    for await (let item of source) {
      yield fn(item);
    }
  };
}
export { map };
function filter<T>(fn): Pipe<T, T> {
  return async function* <T>(source: Source<T>) {
    for await (let item of source) {
      if (fn(item)) {
        yield item;
      }
    }
  };
}
export { filter };
function take<T>(n: number): Pipe<T, T> {
  return async function* <T>(source: Source<T>) {
    let count = 0;
    for await (let item of source) {
      if (count >= n) {
        break;
      }
      yield item;
      count = count + 1;
    }
  };
}
export { take };
function drop<T>(n: number): Pipe<T, T> {
  return async function* <T>(source: Source<T>) {
    let count = 0;
    for await (let item of source) {
      if (count >= n) {
        yield item;
      } else {
        count = count + 1;
      }
    }
  };
}
export { drop };
function takeWhile<T>(fn): Pipe<T, T> {
  return async function* <T>(source: Source<T>) {
    for await (let item of source) {
      if (!fn(item)) {
        break;
      }
      yield item;
    }
  };
}
export { takeWhile };
function dropWhile<T>(fn): Pipe<T, T> {
  return async function* <T>(source: Source<T>) {
    let dropping = true;
    for await (let item of source) {
      if (dropping && fn(item)) {
        continue;
      }
      dropping = false;
      yield item;
    }
  };
}
export { dropWhile };
function chunk<T>(size: number): Pipe<T, Array<T>> {
  return async function* <T>(source: Source<T>) {
    let batch = [];
    {
      for await (let item of source) {
        batch.push(item);
        if (batch.length >= size) {
          yield batch;
          batch = [];
        }
      }
      if (batch.length > 0) {
        yield batch;
      }
    }
  };
}
export { chunk };
function flatMap<A, B>(
  fn,
  opts: { concurrency: number } = { concurrency: 1 }(),
): Pipe<A, B> {
  const concurrency = opts.concurrency || 1;
  return async function* <A>(source: Source<A>) {
    if (concurrency === 1) {
      for await (let item of source) {
        yield await fn(item);
      }
    } else {
      for await (let item of source) {
        yield await fn(item);
      }
    }
  };
}
export { flatMap };
function tap<T>(fn): Pipe<T, T> {
  return async function* <T>(source: Source<T>) {
    for await (let item of source) {
      fn(item);
      yield item;
    }
  };
}
export { tap };
function scan<R, T>(fn, init: R): Pipe<T, R> {
  return async function* <T>(source: Source<T>) {
    let acc = init;
    for await (let item of source) {
      acc = fn(acc, item);
      yield acc;
    }
  };
}
export { scan };
function distinct<T>(): Pipe<T, T> {
  return async function* <T>(source: Source<T>) {
    const seen = new Set();
    for await (let item of source) {
      if (!seen.has(item)) {
        seen.add(item);
        yield item;
      }
    }
  };
}
export { distinct };
function collect<T>(): Sink<T, Array<T>> {
  return async function <T>(source: Source<T>) {
    const items = [];
    {
      for await (let item of source) {
        items.push(item);
      }
      return items;
    }
  };
}
export { collect };
function first<T>(): Sink<T, T | undefined> {
  return async function <T>(source: Source<T>) {
    {
      for await (let item of source) {
        return item;
      }
      return undefined;
    }
  };
}
export { first };
function last<T>(): Sink<T, T | undefined> {
  return async function <T>(source: Source<T>) {
    let lastItem = undefined;
    {
      for await (let item of source) {
        lastItem = item;
      }
      return lastItem;
    }
  };
}
export { last };
function reduce<R, T>(fn, init: R): Sink<T, R> {
  return async function <T>(source: Source<T>) {
    let acc = init;
    {
      for await (let item of source) {
        acc = fn(acc, item);
      }
      return acc;
    }
  };
}
export { reduce };
function forEach<T>(fn): Sink<T, undefined> {
  return async function <T>(source: Source<T>) {
    for await (let item of source) {
      fn(item);
    }
  };
}
export { forEach };
function drain(): Sink<any, undefined> {
  return async function (source: Source<any>) {
    for await (let _ of source) {
    }
  };
}
export { drain };
function count(): Sink<any, number> {
  return async function (source: Source<any>) {
    let n = 0;
    {
      for await (let _ of source) {
        n = n + 1;
      }
      return n;
    }
  };
}
export { count };
function some<T>(fn): Sink<T, boolean> {
  return async function <T>(source: Source<T>) {
    {
      for await (let item of source) {
        if (fn(item)) {
          return true;
        }
      }
      return false;
    }
  };
}
export { some };
function every<T>(fn): Sink<T, boolean> {
  return async function <T>(source: Source<T>) {
    {
      for await (let item of source) {
        if (!fn(item)) {
          return false;
        }
      }
      return true;
    }
  };
}
export { every };
