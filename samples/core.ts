type Source<T> = AsyncIterable<T>;
type Pipe<A, B> = (Source) => Source;
type Sink<T, R> = (Source) => Promise;
function pipe2(source, op1) {
return op1(source);
}
export { pipe2 };
function pipe3(source, op1, op2) {
return op2(op1(source));
}
export { pipe3 };
function pipe4(source, op1, op2, op3) {
return op3(op2(op1(source)));
}
export { pipe4 };
function pipe5(source, op1, op2, op3, op4) {
return op4(op3(op2(op1(source))));
}
export { pipe5 };
function pipe(source, rest) {
let result = source;
{
  for (let op of ops) {
    result = op(result);
  }
  return result;
}
}
export { pipe };
async function* fromArray(items): Source {
{
  for (let item of items) {
    yield(item);
  }
}
}
export { fromArray };
const const_tmp__1_7168736585 = fromArray;
const from = const_tmp__1_7168736585;
export { const_tmp__1_7168736585, from };
async function* fromResponse(res): Source {
{
  const reader = res.body.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      yield(value);
    }
  }
  finally {
    reader.releaseLock();
  }
}
}
export { fromResponse };
function fromLazyPromise(fn): Source {
return (async function*() {
yield(await fn());
})();
}
export { fromLazyPromise };
async function* fromIterator(iter): Source {
{
  for (let item of iter) {
    yield(item);
  }
}
}
export { fromIterator };
async function* fromAsyncIterator(iter): Source {
{
  for await (let item of iter) {
    yield(item);
  }
}
}
export { fromAsyncIterator };
async function* empty(): Source {
{
  return;
}
}
export { empty };
async function* never(): Source {
{
  await new Promise(() => {
{
}
});
}
}
export { never };
async function* range(start, end, step): Source {
{
  let i = start;
  while ((i < end)) {
    yield(i);
    i = (i + step);
  }
}
}
export { range };
async function* repeat(value, count): Source {
{
  let i = 0;
  while ((i < count)) {
    yield(value);
    i = (i + 1);
  }
}
}
export { repeat };
function map(fn): Pipe {
return async function*(source) {
for await (let item of source) {
  yield(fn(item));
}
};
}
export { map };
function filter(fn): Pipe {
return async function*(source) {
for await (let item of source) {
  if (fn(item)) {
    yield(item);
  }
}
};
}
export { filter };
function take(n): Pipe {
return async function*(source) {
let count = 0;
for await (let item of source) {
  if ((count >= n)) {
    break;
  }
  yield(item);
  count = (count + 1);
}
};
}
export { take };
function drop(n): Pipe {
return async function*(source) {
let count = 0;
for await (let item of source) {
  if ((count >= n)) {
    yield(item);
  }
  else {
    count = (count + 1);
  }
}
};
}
export { drop };
function takeWhile(fn): Pipe {
return async function*(source) {
for await (let item of source) {
  if (!fn(item)) {
    break;
  }
  yield(item);
}
};
}
export { takeWhile };
function dropWhile(fn): Pipe {
return async function*(source) {
let dropping = true;
for await (let item of source) {
  if ((dropping && fn(item))) {
    continue;
  }
  dropping = false;
  yield(item);
}
};
}
export { dropWhile };
function chunk(size): Pipe {
return async function*(source) {
let batch = [];
{
  for await (let item of source) {
    batch.push(item);
    if ((batch.length >= size)) {
      yield(batch);
      batch = [];
    }
  }
  if ((batch.length > 0)) {
    yield(batch);
  }
}
};
}
export { chunk };
function flatMap(fn, opts): Pipe {
const concurrency = (opts.concurrency || 1);
return async function*(source) {
if ((concurrency === 1)) {
  for await (let item of source) {
    yield(await fn(item));
  }
}
else {
  for await (let item of source) {
    yield(await fn(item));
  }
}
};
}
export { flatMap };
function tap(fn): Pipe {
return async function*(source) {
for await (let item of source) {
  fn(item);
  yield(item);
}
};
}
export { tap };
function scan(fn, init): Pipe {
return async function*(source) {
let acc = init;
for await (let item of source) {
  acc = fn(acc, item);
  yield(acc);
}
};
}
export { scan };
function distinct(): Pipe {
return async function*(source) {
const seen = new Set();
for await (let item of source) {
  if (!seen.has(item)) {
    seen.add(item);
    yield(item);
  }
}
};
}
export { distinct };
function collect(): Sink {
return async function(source) {
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
function first(): Sink {
return async function(source) {
{
  for await (let item of source) {
    return item;
  }
  return undefined;
}
};
}
export { first };
function last(): Sink {
return async function(source) {
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
function reduce(fn, init): Sink {
return async function(source) {
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
function forEach(fn): Sink {
return async function(source) {
for await (let item of source) {
  fn(item);
}
};
}
export { forEach };
function drain(): Sink {
return async function(source) {
for await (let _ of source) {
}
};
}
export { drain };
function count(): Sink {
return async function(source) {
let n = 0;
{
  for await (let _ of source) {
    n = (n + 1);
  }
  return n;
}
};
}
export { count };
function some(fn): Sink {
return async function(source) {
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
function every(fn): Sink {
return async function(source) {
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