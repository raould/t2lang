void (async () => {
  {
  type Source<T> = AsyncIterable<T>;
  type Pipe<A, B> = (Source) => Source;
  type Sink<T, R> = (Source) => Promise;
  export(function pipe2(source, op1) {
return op1(source);
});
  export(function pipe3(source, op1, op2) {
return op2(op1(source));
});
  export(function pipe4(source, op1, op2, op3) {
return op3(op2(op1(source)));
});
  export(function pipe5(source, op1, op2, op3, op4) {
return op4(op3(op2(op1(source))));
});
  export(function pipe(source, rest) {
let result = source;
block(for(of, op(ops), result = op(result)), return(result));
});
  export(async function* fromArray(items): Source {
block(for(of, item(items), yield(item)));
});
  export(const(from, fromArray));
  export(async function* fromResponse(res): Source {
block(const*(reader(res.body.getReader())(), try(while(true, const*({ done: value }(await reader.read())()(), if(done, break()), yield(value))), finally(reader.releaseLock()))));
});
  export(function fromLazyPromise(fn): Source {
return (async function*() {
yield(await fn());
})();
});
  export(async function* fromIterator(iter): Source {
block(for(of, item(iter), yield(item)));
});
  export(async function* fromAsyncIterator(iter): Source {
block(for(await, item(iter), yield(item)));
});
  export(async function* empty(): Source {
block(return());
});
  export(async function* never(): Source {
block(await new(t:ref(Promise), () => {
block();
}));
});
  export(async function* range(start, end, step): Source {
block(let*(i(start)(), while((i < end), yield(i), i = (i + step))));
});
  export(async function* repeat(value, count): Source {
block(let*(i(0)(), while((i < count), yield(value), i = (i + 1))));
});
  export(function map(fn): Pipe {
return async function*(source) {
for await (let item of source) {
  yield(fn(item));
}
};
});
  export(function filter(fn): Pipe {
return async function*(source) {
for await (let item of source) {
  if (fn(item)) {
    yield(item);
  }
}
};
});
  export(function take(n): Pipe {
return async function*(source) {
let count = 0;
for await (let item of source) {
  if ((count >= n)) {
    break();
  }
  yield(item);
  count = (count + 1);
}
};
});
  export(function drop(n): Pipe {
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
});
  export(function takeWhile(fn): Pipe {
return async function*(source) {
for await (let item of source) {
  if (!fn(item)) {
    break();
  }
  yield(item);
}
};
});
  export(function dropWhile(fn): Pipe {
return async function*(source) {
let dropping = true;
for await (let item of source) {
  if ((dropping && fn(item))) {
    continue();
  }
  dropping = false;
  yield(item);
}
};
});
  export(function chunk(size): Pipe {
return async function*(source) {
let batch = [];
block(for(await, item(source), batch.push(item), if((batch.length >= size), block(yield(batch), batch = []))), if((batch.length > 0), yield(batch)));
};
});
  export(function flatMap(fn, opts): Pipe {
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
});
  export(function tap(fn): Pipe {
return async function*(source) {
for await (let item of source) {
  fn(item);
  yield(item);
}
};
});
  export(function scan(fn, init): Pipe {
return async function*(source) {
let acc = init;
for await (let item of source) {
  acc = fn(acc, item);
  yield(acc);
}
};
});
  export(function distinct(): Pipe {
return async function*(source) {
const seen = new(t:ref(Set));
for await (let item of source) {
  if (!seen.has(item)) {
    block(seen.add(item), yield(item));
  }
}
};
});
  export(function collect(): Sink {
return async function(source) {
const items = [];
block(for(await, item(source), items.push(item)), return(items));
};
});
  export(function first(): Sink {
return async function(source) {
block(for(await, item(source), return(item)), return(undefined));
};
});
  export(function last(): Sink {
return async function(source) {
let lastItem = undefined;
block(for(await, item(source), lastItem = item), return(lastItem));
};
});
  export(function reduce(fn, init): Sink {
return async function(source) {
let acc = init;
block(for(await, item(source), acc = fn(acc, item)), return(acc));
};
});
  export(function forEach(fn): Sink {
return async function(source) {
for await (let item of source) {
  fn(item);
}
};
});
  export(function drain(): Sink {
return async function(source) {
for await (let _ of source) {
  block();
}
};
});
  export(function count(): Sink {
return async function(source) {
let n = 0;
block(for(await, _(source), n = (n + 1)), return(n));
};
});
  export(function some(fn): Sink {
return async function(source) {
block(for(await, item(source), if(fn(item), return(true))), return(false));
};
});
  export(function every(fn): Sink {
return async function(source) {
block(for(await, item(source), if(!fn(item), return(false))), return(true));
};
});
  }
})();