/// <reference lib="es2015" />
/// <reference lib="es2018.asynciterable" />
/// <reference lib="dom" />
import { describe, it, expect } from "vitest";
describe("Source Constructors", () => {
  {
    it("fromArray should emit all items", async function () {
      const result = run(fromArray([1, 2, 3]), collect());
      expect.result("toEqual", [1, 2, 3]);
    });
    it("fromLazyPromise should not execute until consumed", async function () {
      let executed = false;
      const source = fromLazyPromise(() => {
        {
          executed = true;
          return Promise.resolve(42);
        }
      });
      {
        expect.executed("toBe", false);
        const result = run(source, first());
        {
          expect.executed("toBe", true);
          expect.result("toBe", 42);
        }
      }
    });
    it("empty should emit no values", async function () {
      const result = run(empty(), collect());
      expect.result("toEqual", []);
    });
    it("range should generate numeric sequence", async function () {
      const result = run(range(0, 5), collect());
      expect.result("toEqual", [0, 1, 2, 3, 4]);
    });
    it("repeat should repeat value n times", async function () {
      const result = run(repeat("x", 3), collect());
      expect.result("toEqual", ["x", "x", "x"]);
    });
  }
});
describe("Pipe Operators", () => {
  {
    it("map should transform each value", async function () {
      const result = run(
        from([1, 2, 3]),
        map((x) => {
          x * 2;
        }),
        collect(),
      );
      expect.result("toEqual", [2, 4, 6]);
    });
    it("filter should keep matching values", async function () {
      const result = run(
        from([1, 2, 3, 4, 5]),
        filter((x) => {
          x % 2 === 0;
        }),
        collect(),
      );
      expect.result("toEqual", [2, 4]);
    });
    it("take should limit values", async function () {
      const result = run(range(0, 100), take(5), collect());
      expect.result("toEqual", [0, 1, 2, 3, 4]);
    });
    it("drop should skip values", async function () {
      const result = run(from([1, 2, 3, 4, 5]), drop(2), collect());
      expect.result("toEqual", [3, 4, 5]);
    });
    it("takeWhile should take until predicate fails", async function () {
      const result = run(
        from([1, 2, 3, 4, 5]),
        takeWhile((x) => {
          x < 4;
        }),
        collect(),
      );
      expect.result("toEqual", [1, 2, 3]);
    });
    it("dropWhile should drop until predicate fails", async function () {
      const result = run(
        from([1, 2, 3, 4, 5]),
        dropWhile((x) => {
          x < 3;
        }),
        collect(),
      );
      expect.result("toEqual", [3, 4, 5]);
    });
    it("chunk should group values", async function () {
      const result = run(from([1, 2, 3, 4, 5]), chunk(2), collect());
      expect.result("toEqual", [[1, 2], [3, 4], [5]]);
    });
    it("flatMap should flatten mapped results", async function () {
      const result = run(
        from([1, 2, 3]),
        flatMap((x) => {
          Promise.resolve(x * 2);
        }),
        collect(),
      );
      expect.result("toEqual", [2, 4, 6]);
    });
    it("tap should execute side effects without modifying stream", async function () {
      let sideEffects = [];
      const result = run(
        from([1, 2, 3]),
        tap((x) => {
          sideEffects.push(x * 10);
        }),
        collect(),
      );
      {
        expect.result("toEqual", [1, 2, 3]);
        expect.sideEffects("toEqual", [10, 20, 30]);
      }
    });
    it("scan should produce running accumulation", async function () {
      const result = run(
        from([1, 2, 3, 4]),
        scan((acc, x) => {
          acc + x;
        }, 0),
        collect(),
      );
      expect.result("toEqual", [1, 3, 6, 10]);
    });
    it("distinct should remove duplicates", async function () {
      const result = run(from([1, 2, 2, 3, 3, 3, 4]), distinct(), collect());
      expect.result("toEqual", [1, 2, 3, 4]);
    });
  }
});
describe("Sink Operators", () => {
  {
    it("collect should gather all values", async function () {
      const result = run(from([1, 2, 3]), collect());
      expect.result("toEqual", [1, 2, 3]);
    });
    it("first should return first value", async function () {
      const result = run(from([1, 2, 3]), first());
      expect.result("toBe", 1);
    });
    it("first should return undefined for empty source", async function () {
      const result = run(empty(), first());
      expect.result("toBe", undefined);
    });
    it("last should return last value", async function () {
      const result = run(from([1, 2, 3]), last());
      expect.result("toBe", 3);
    });
    it("reduce should fold stream", async function () {
      const result = run(
        from([1, 2, 3, 4]),
        reduce((acc, x) => {
          acc + x;
        }, 0),
      );
      expect.result("toBe", 10);
    });
    it("count should count values", async function () {
      const result = run(from([1, 2, 3, 4, 5]), count());
      expect.result("toBe", 5);
    });
    it("some should return true if any match", async function () {
      const result = run(
        from([1, 2, 3, 4]),
        some((x) => {
          x > 3;
        }),
      );
      expect.result("toBe", true);
    });
    it("every should return true if all match", async function () {
      const result = run(
        from([2, 4, 6]),
        every((x) => {
          x % 2 === 0;
        }),
      );
      expect.result("toBe", true);
    });
    it("forEach should execute for each value", async function () {
      let sum = 0;
      {
        run(
          from([1, 2, 3]),
          forEach((x) => {
            sum = sum + x;
          }),
        );
        expect.sum("toBe", 6);
      }
    });
    it("drain should consume all values", async function () {
      let count = 0;
      {
        run(
          from([1, 2, 3]),
          tap((_) => {
            count = count + 1;
          }),
          drain(),
        );
        expect.count("toBe", 3);
      }
    });
  }
});
describe("Combining Operators", () => {
  {
    it("concat should combine sources sequentially", async function () {
      const result = run(concat(from([1, 2]), from([3, 4])), collect());
      expect.result("toEqual", [1, 2, 3, 4]);
    });
    it("zip should combine pairwise", async function () {
      const result = run(
        zip(from([1, 2, 3]), from(["a", "b", "c"])),
        collect(),
      );
      expect.result("toEqual", [
        [1, "a"],
        [2, "b"],
        [3, "c"],
      ]);
    });
    it("zip should stop at shortest stream", async function () {
      const result = run(zip(from([1, 2]), from(["a", "b", "c"])), collect());
      expect.result("toEqual", [
        [1, "a"],
        [2, "b"],
      ]);
    });
  }
});
describe("Error Handling", () => {
  {
    it("catchError should handle errors", async function () {
      const source = (async function* () {
        {
          yield 1;
          throw new Error("test error");
        }
      })();
      const result = run(
        source,
        catchError((err) => {
          from([0 - 1]);
        }),
        collect(),
      );
      expect.result("toEqual", [1, 0 - 1]);
    });
    it("defaultIfEmpty should provide default for empty stream", async function () {
      const result = run(empty(), defaultIfEmpty(42), first());
      expect.result("toBe", 42);
    });
    it("defaultIfEmpty should not affect non-empty stream", async function () {
      const result = run(from([1, 2]), defaultIfEmpty(42), collect());
      expect.result("toEqual", [1, 2]);
    });
    it("retry should retry on error", async function () {
      let attempts = 0;
      const source = (async function* () {
        {
          attempts = attempts + 1;
          if (attempts < 3) {
            throw new Error("retry me");
          }
          yield 42;
        }
      })();
      const result = run(source, retry(3), first());
      {
        expect.result("toBe", 42);
        expect.attempts("toBe", 3);
      }
    });
  }
});
describe("Advanced Patterns", () => {
  {
    it("should handle complex pipeline", async function () {
      const result = run(
        range(0, 100),
        filter((x) => {
          x % 2 === 0;
        }),
        map((x) => {
          x * x;
        }),
        take(5),
        scan((acc, x) => {
          acc + x;
        }, 0),
        collect(),
      );
      expect["<unknown>"]("toBe", 5);
    });
    it("should handle nested sources", async function () {
      const result = run(
        from([
          [1, 2],
          [3, 4],
        ]),
        flatMap((arr) => {
          Promise.resolve(
            arr.reduce((a, b) => {
              a + b;
            }),
          );
        }),
        collect(),
      );
      expect.result("toEqual", [3, 7]);
    });
    it("should support pairwise operations", async function () {
      const result = run(
        from([1, 2, 3, 4]),
        pairwise(),
        map((pair) => {
          index(pair, 0) + index(pair, 1);
        }),
        collect(),
      );
      expect.result("toEqual", [3, 5, 7]);
    });
    it("distinctUntilChanged should only emit when value changes", async function () {
      const result = run(
        from([1, 1, 2, 2, 2, 3, 3, 1]),
        distinctUntilChanged(),
        collect(),
      );
      expect.result("toEqual", [1, 2, 3, 1]);
    });
  }
});
describe("Macros", () => {
  {
    it("run macro should work", async function () {
      const result = run(
        source(1, 2, 3),
        map((x) => {
          x * 2;
        }),
        collect(),
      );
      expect.result("toEqual", [2, 4, 6]);
    });
    it("-> threading macro should work", async function () {
      const result = run(
        from([1, 2, 3, 4, 5]),
        filter((x) => {
          x > 2;
        }),
        map((x) => {
          x * 2;
        }),
        collect(),
      );
      expect.result("toEqual", [6, 8, 10]);
    });
    it("map-collect macro should work", async function () {
      const result = run(
        from([1, 2, 3]),
        map((x) => {
          x + 1;
        }),
        collect(),
      );
      expect.result("toEqual", [2, 3, 4]);
    });
    it("filter-collect macro should work", async function () {
      const result = run(
        from([1, 2, 3, 4, 5]),
        filter((x) => {
          x % 2 === 0;
        }),
        collect(),
      );
      expect.result("toEqual", [2, 4]);
    });
  }
});
describe("Performance", () => {
  {
    it("should handle large streams efficiently", async function () {
      const start = Date.now();
      const count = run(
        range(0, 100000),
        filter((x) => {
          x % 2 === 0;
        }),
        map((x) => {
          x * 2;
        }),
        count(),
      );
      const elapsed = Date.now() - start;
      {
        expect.count("toBe", 50000);
        expect["<unknown>"]("toBe", true);
      }
    });
    it("should support lazy evaluation", async function () {
      let iterations = 0;
      const source = (async function* () {
        let i = 0;
        while (i < 1000000) {
          iterations = iterations + 1;
          yield i;
          i = i + 1;
        }
      })();
      const result = run(source, take(5), collect());
      {
        expect["<unknown>"]("toBe", 5);
        expect.iterations("toBe", 5);
      }
    });
    it("should not load entire stream into memory", async function () {
      let activeItems = 0;
      let maxActive = 0;
      const result = run(
        range(0, 10000),
        tap((_) => {
          activeItems = activeItems + 1;
          if (activeItems > maxActive) {
            maxActive = activeItems;
          }
        }),
        flatMap(async function (x) {
          await Promise.resolve();
          activeItems = activeItems - 1;
          return x;
        }),
        count(),
      );
      {
        expect.result("toBe", 10000);
        expect["<unknown>"]("toBe", true);
      }
    });
  }
});
describe("Interop", () => {
  {
    it("should convert Promise to Source", async function () {
      const promise = Promise.resolve(42);
      const result = run(fromPromise(promise), first());
      expect.result("toBe", 42);
    });
    it("should convert Source to Promise", async function () {
      const source = from([1, 2, 3]);
      const result = await toPromise(source);
      expect.result("toBe", 1);
    });
    it("should check if value is Source", async function () {
      const source = from([1, 2, 3]);
      {
        expect["<unknown>"]("toBe", true);
        expect["<unknown>"]("toBe", false);
        expect["<unknown>"]("toBe", false);
      }
    });
  }
});
console.log("All tests defined");
