/// <reference lib="es2015" />
/// <reference lib="es2018.asynciterable" />
/// <reference lib="dom" />
const describe = (name, fn) => {
  fn();
};
const it = (name, fn) => {
  console.log(name);
  fn();
};
console.log(
  {
    toBe: (expected) => {
      if (expected !== 4) {
        console.log(`toBe fail: ${String(4)} = ${4}`);
        return false;
      } else {
        return true;
      }
    },
    toEqual: (expected) => {
      if (expected != 4) {
        console.log(`toBe fail: ${String(4)} = ${4}`);
        return false;
      } else {
        return true;
      }
    },
  }.toBe(4),
);
console.log(
  {
    toBe: (expected) => {
      if (expected !== "4") {
        console.log(`toBe fail: ${String("4")} = 4`);
        return false;
      } else {
        return true;
      }
    },
    toEqual: (expected) => {
      if (expected != "4") {
        console.log(`toBe fail: ${String("4")} = 4`);
        return false;
      } else {
        return true;
      }
    },
  }.toEqual(4),
);
import {
  from,
  fromArray,
  fromLazyPromise,
  empty,
  range,
  repeat,
  map,
  filter,
  take,
  drop,
  takeWhile,
  dropWhile,
  chunk,
  flatMap,
  tap,
  scan,
  collect,
  first,
  last,
  reduce,
  count,
  some,
  every,
  forEach,
  drain,
  distinct,
} from "./core";
import {
  concat,
  zip,
  catchError,
  retry,
  defaultIfEmpty,
  distinctUntilChanged,
  pairwise,
} from "./operators";
import { fromPromise, toPromise, isSource } from "./interop";
const run = async (source: any, ...ops: Array<Function>) => {
  let result = source;
  {
    for (let op of ops) {
      result = op(result);
    }
    return await result;
  }
};
const index = (items: Array<any>, i: number) => {
  return items.find((item, idx) => {
    idx === i;
  });
};
describe("Source Constructors", () => {
  {
    it("fromArray should emit all items", async function () {
      const result = run(fromArray([1, 2, 3]), collect());
      ({
        toBe: (expected) => {
          if (expected !== result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
        toEqual: (expected) => {
          if (expected != result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
      }).toEqual([1, 2, 3]);
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
        ({
          toBe: (expected) => {
            if (expected !== executed) {
              console.log(`toBe fail: ${String(executed)} = ${executed}`);
              return false;
            } else {
              return true;
            }
          },
          toEqual: (expected) => {
            if (expected != executed) {
              console.log(`toBe fail: ${String(executed)} = ${executed}`);
              return false;
            } else {
              return true;
            }
          },
        }).toBe(false);
        const result = run(source, first());
        {
          ({
            toBe: (expected) => {
              if (expected !== executed) {
                console.log(`toBe fail: ${String(executed)} = ${executed}`);
                return false;
              } else {
                return true;
              }
            },
            toEqual: (expected) => {
              if (expected != executed) {
                console.log(`toBe fail: ${String(executed)} = ${executed}`);
                return false;
              } else {
                return true;
              }
            },
          }).toBe(true);
          ({
            toBe: (expected) => {
              if (expected !== result) {
                console.log(`toBe fail: ${String(result)} = ${result}`);
                return false;
              } else {
                return true;
              }
            },
            toEqual: (expected) => {
              if (expected != result) {
                console.log(`toBe fail: ${String(result)} = ${result}`);
                return false;
              } else {
                return true;
              }
            },
          }).toBe(42);
        }
      }
    });
    it("empty should emit no values", async function () {
      const result = run(empty(), collect());
      ({
        toBe: (expected) => {
          if (expected !== result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
        toEqual: (expected) => {
          if (expected != result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
      }).toEqual([]);
    });
    it("range should generate numeric sequence", async function () {
      const result = run(range(0, 5, 1), collect());
      ({
        toBe: (expected) => {
          if (expected !== result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
        toEqual: (expected) => {
          if (expected != result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
      }).toEqual([0, 1, 2, 3, 4]);
    });
    it("repeat should repeat value n times", async function () {
      const result = run(repeat("x", 3), collect());
      ({
        toBe: (expected) => {
          if (expected !== result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
        toEqual: (expected) => {
          if (expected != result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
      }).toEqual(["x", "x", "x"]);
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
      ({
        toBe: (expected) => {
          if (expected !== result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
        toEqual: (expected) => {
          if (expected != result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
      }).toEqual([2, 4, 6]);
    });
    it("filter should keep matching values", async function () {
      const result = run(
        from([1, 2, 3, 4, 5]),
        filter((x) => {
          x % 2 === 0;
        }),
        collect(),
      );
      ({
        toBe: (expected) => {
          if (expected !== result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
        toEqual: (expected) => {
          if (expected != result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
      }).toEqual([2, 4]);
    });
    it("take should limit values", async function () {
      const result = run(range(0, 100, 1), take(5), collect());
      ({
        toBe: (expected) => {
          if (expected !== result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
        toEqual: (expected) => {
          if (expected != result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
      }).toEqual([0, 1, 2, 3, 4]);
    });
    it("drop should skip values", async function () {
      const result = run(from([1, 2, 3, 4, 5]), drop(2), collect());
      ({
        toBe: (expected) => {
          if (expected !== result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
        toEqual: (expected) => {
          if (expected != result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
      }).toEqual([3, 4, 5]);
    });
    it("takeWhile should take until predicate fails", async function () {
      const result = run(
        from([1, 2, 3, 4, 5]),
        takeWhile((x) => {
          x < 4;
        }),
        collect(),
      );
      ({
        toBe: (expected) => {
          if (expected !== result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
        toEqual: (expected) => {
          if (expected != result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
      }).toEqual([1, 2, 3]);
    });
    it("dropWhile should drop until predicate fails", async function () {
      const result = run(
        from([1, 2, 3, 4, 5]),
        dropWhile((x) => {
          x < 3;
        }),
        collect(),
      );
      ({
        toBe: (expected) => {
          if (expected !== result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
        toEqual: (expected) => {
          if (expected != result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
      }).toEqual([3, 4, 5]);
    });
    it("chunk should group values", async function () {
      const result = run(from([1, 2, 3, 4, 5]), chunk(2), collect());
      ({
        toBe: (expected) => {
          if (expected !== result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
        toEqual: (expected) => {
          if (expected != result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
      }).toEqual([[1, 2], [3, 4], [5]]);
    });
    it("flatMap should flatten mapped results", async function () {
      const result = run(
        from([1, 2, 3]),
        flatMap((x) => {
          Promise.resolve(x * 2);
        }, {}),
        collect(),
      );
      ({
        toBe: (expected) => {
          if (expected !== result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
        toEqual: (expected) => {
          if (expected != result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
      }).toEqual([2, 4, 6]);
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
        ({
          toBe: (expected) => {
            if (expected !== result) {
              console.log(`toBe fail: ${String(result)} = ${result}`);
              return false;
            } else {
              return true;
            }
          },
          toEqual: (expected) => {
            if (expected != result) {
              console.log(`toBe fail: ${String(result)} = ${result}`);
              return false;
            } else {
              return true;
            }
          },
        }).toEqual([1, 2, 3]);
        ({
          toBe: (expected) => {
            if (expected !== sideEffects) {
              console.log(`toBe fail: ${String(sideEffects)} = ${sideEffects}`);
              return false;
            } else {
              return true;
            }
          },
          toEqual: (expected) => {
            if (expected != sideEffects) {
              console.log(`toBe fail: ${String(sideEffects)} = ${sideEffects}`);
              return false;
            } else {
              return true;
            }
          },
        }).toEqual([10, 20, 30]);
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
      ({
        toBe: (expected) => {
          if (expected !== result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
        toEqual: (expected) => {
          if (expected != result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
      }).toEqual([1, 3, 6, 10]);
    });
    it("distinct should remove duplicates", async function () {
      const result = run(from([1, 2, 2, 3, 3, 3, 4]), distinct(), collect());
      ({
        toBe: (expected) => {
          if (expected !== result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
        toEqual: (expected) => {
          if (expected != result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
      }).toEqual([1, 2, 3, 4]);
    });
  }
});
describe("Sink Operators", () => {
  {
    it("collect should gather all values", async function () {
      const result = run(from([1, 2, 3]), collect());
      ({
        toBe: (expected) => {
          if (expected !== result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
        toEqual: (expected) => {
          if (expected != result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
      }).toEqual([1, 2, 3]);
    });
    it("first should return first value", async function () {
      const result = run(from([1, 2, 3]), first());
      ({
        toBe: (expected) => {
          if (expected !== result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
        toEqual: (expected) => {
          if (expected != result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
      }).toBe(1);
    });
    it("first should return undefined for empty source", async function () {
      const result = run(empty(), first());
      ({
        toBe: (expected) => {
          if (expected !== result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
        toEqual: (expected) => {
          if (expected != result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
      }).toBe(undefined);
    });
    it("last should return last value", async function () {
      const result = run(from([1, 2, 3]), last());
      ({
        toBe: (expected) => {
          if (expected !== result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
        toEqual: (expected) => {
          if (expected != result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
      }).toBe(3);
    });
    it("reduce should fold stream", async function () {
      const result = run(
        from([1, 2, 3, 4]),
        reduce((acc, x) => {
          acc + x;
        }, 0),
      );
      ({
        toBe: (expected) => {
          if (expected !== result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
        toEqual: (expected) => {
          if (expected != result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
      }).toBe(10);
    });
    it("count should count values", async function () {
      const result = run(from([1, 2, 3, 4, 5]), count());
      ({
        toBe: (expected) => {
          if (expected !== result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
        toEqual: (expected) => {
          if (expected != result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
      }).toBe(5);
    });
    it("some should return true if any match", async function () {
      const result = run(
        from([1, 2, 3, 4]),
        some((x) => {
          x > 3;
        }),
      );
      ({
        toBe: (expected) => {
          if (expected !== result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
        toEqual: (expected) => {
          if (expected != result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
      }).toBe(true);
    });
    it("every should return true if all match", async function () {
      const result = run(
        from([2, 4, 6]),
        every((x) => {
          x % 2 === 0;
        }),
      );
      ({
        toBe: (expected) => {
          if (expected !== result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
        toEqual: (expected) => {
          if (expected != result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
      }).toBe(true);
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
        ({
          toBe: (expected) => {
            if (expected !== sum) {
              console.log(`toBe fail: ${String(sum)} = ${sum}`);
              return false;
            } else {
              return true;
            }
          },
          toEqual: (expected) => {
            if (expected != sum) {
              console.log(`toBe fail: ${String(sum)} = ${sum}`);
              return false;
            } else {
              return true;
            }
          },
        }).toBe(6);
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
        ({
          toBe: (expected) => {
            if (expected !== count) {
              console.log(`toBe fail: ${String(count)} = ${count}`);
              return false;
            } else {
              return true;
            }
          },
          toEqual: (expected) => {
            if (expected != count) {
              console.log(`toBe fail: ${String(count)} = ${count}`);
              return false;
            } else {
              return true;
            }
          },
        }).toBe(3);
      }
    });
  }
});
describe("Combining Operators", () => {
  {
    it("concat should combine sources sequentially", async function () {
      const result = run(concat(from([1, 2]), from([3, 4])), collect());
      ({
        toBe: (expected) => {
          if (expected !== result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
        toEqual: (expected) => {
          if (expected != result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
      }).toEqual([1, 2, 3, 4]);
    });
    it("zip should combine pairwise", async function () {
      const result = run(
        zip(from([1, 2, 3]), from(["a", "b", "c"])),
        collect(),
      );
      ({
        toBe: (expected) => {
          if (expected !== result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
        toEqual: (expected) => {
          if (expected != result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
      }).toEqual([
        [1, "a"],
        [2, "b"],
        [3, "c"],
      ]);
    });
    it("zip should stop at shortest stream", async function () {
      const result = run(zip(from([1, 2]), from(["a", "b", "c"])), collect());
      ({
        toBe: (expected) => {
          if (expected !== result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
        toEqual: (expected) => {
          if (expected != result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
      }).toEqual([
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
          return from([0 - 1]);
        }),
        collect(),
      );
      ({
        toBe: (expected) => {
          if (expected !== result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
        toEqual: (expected) => {
          if (expected != result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
      }).toEqual([1, 0 - 1]);
    });
    it("defaultIfEmpty should provide default for empty stream", async function () {
      const result = run(empty(), defaultIfEmpty(42), first());
      ({
        toBe: (expected) => {
          if (expected !== result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
        toEqual: (expected) => {
          if (expected != result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
      }).toBe(42);
    });
    it("defaultIfEmpty should not affect non-empty stream", async function () {
      const result = run(from([1, 2]), defaultIfEmpty(42), collect());
      ({
        toBe: (expected) => {
          if (expected !== result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
        toEqual: (expected) => {
          if (expected != result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
      }).toEqual([1, 2]);
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
      const result = run(source, retry(3, {}), first());
      {
        ({
          toBe: (expected) => {
            if (expected !== result) {
              console.log(`toBe fail: ${String(result)} = ${result}`);
              return false;
            } else {
              return true;
            }
          },
          toEqual: (expected) => {
            if (expected != result) {
              console.log(`toBe fail: ${String(result)} = ${result}`);
              return false;
            } else {
              return true;
            }
          },
        }).toBe(42);
        ({
          toBe: (expected) => {
            if (expected !== attempts) {
              console.log(`toBe fail: ${String(attempts)} = ${attempts}`);
              return false;
            } else {
              return true;
            }
          },
          toEqual: (expected) => {
            if (expected != attempts) {
              console.log(`toBe fail: ${String(attempts)} = ${attempts}`);
              return false;
            } else {
              return true;
            }
          },
        }).toBe(3);
      }
    });
  }
});
describe("Advanced Patterns", () => {
  {
    it("should handle complex pipeline", async function () {
      const result = await run(
        range(0, 100, 1),
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
      ({
        toBe: (expected) => {
          if (expected !== result.length) {
            console.log(
              `toBe fail: ${String(result.length)} = ${result.length}`,
            );
            return false;
          } else {
            return true;
          }
        },
        toEqual: (expected) => {
          if (expected != result.length) {
            console.log(
              `toBe fail: ${String(result.length)} = ${result.length}`,
            );
            return false;
          } else {
            return true;
          }
        },
      }).toBe(5);
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
        }, {}),
        collect(),
      );
      ({
        toBe: (expected) => {
          if (expected !== result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
        toEqual: (expected) => {
          if (expected != result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
      }).toEqual([3, 7]);
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
      ({
        toBe: (expected) => {
          if (expected !== result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
        toEqual: (expected) => {
          if (expected != result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
      }).toEqual([3, 5, 7]);
    });
    it("distinctUntilChanged should only emit when value changes", async function () {
      const result = run(
        from([1, 1, 2, 2, 2, 3, 3, 1]),
        distinctUntilChanged((a, b) => {
          a === b;
        }),
        collect(),
      );
      ({
        toBe: (expected) => {
          if (expected !== result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
        toEqual: (expected) => {
          if (expected != result) {
            console.log(`toBe fail: ${String(result)} = ${result}`);
            return false;
          } else {
            return true;
          }
        },
      }).toEqual([1, 2, 3, 1]);
    });
  }
  describe("Macros", () => {
    {
      it("run macro should work", async function () {
        const result = run(
          fromArray([1, 2, 3]),
          map((x) => {
            x * 2;
          }),
          collect(),
        );
        ({
          toBe: (expected) => {
            if (expected !== result) {
              console.log(`toBe fail: ${String(result)} = ${result}`);
              return false;
            } else {
              return true;
            }
          },
          toEqual: (expected) => {
            if (expected != result) {
              console.log(`toBe fail: ${String(result)} = ${result}`);
              return false;
            } else {
              return true;
            }
          },
        }).toEqual([2, 4, 6]);
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
        ({
          toBe: (expected) => {
            if (expected !== result) {
              console.log(`toBe fail: ${String(result)} = ${result}`);
              return false;
            } else {
              return true;
            }
          },
          toEqual: (expected) => {
            if (expected != result) {
              console.log(`toBe fail: ${String(result)} = ${result}`);
              return false;
            } else {
              return true;
            }
          },
        }).toEqual([6, 8, 10]);
      });
      it("map-collect macro should work", async function () {
        const result = run(
          from([1, 2, 3]),
          map((x) => {
            x + 1;
          }),
          collect(),
        );
        ({
          toBe: (expected) => {
            if (expected !== result) {
              console.log(`toBe fail: ${String(result)} = ${result}`);
              return false;
            } else {
              return true;
            }
          },
          toEqual: (expected) => {
            if (expected != result) {
              console.log(`toBe fail: ${String(result)} = ${result}`);
              return false;
            } else {
              return true;
            }
          },
        }).toEqual([2, 3, 4]);
      });
      it("filter-collect macro should work", async function () {
        const result = run(
          from([1, 2, 3, 4, 5]),
          filter((x) => {
            x % 2 === 0;
          }),
          collect(),
        );
        ({
          toBe: (expected) => {
            if (expected !== result) {
              console.log(`toBe fail: ${String(result)} = ${result}`);
              return false;
            } else {
              return true;
            }
          },
          toEqual: (expected) => {
            if (expected != result) {
              console.log(`toBe fail: ${String(result)} = ${result}`);
              return false;
            } else {
              return true;
            }
          },
        }).toEqual([2, 4]);
      });
    }
  });
  describe("Performance", () => {
    {
      it("should handle large streams efficiently", async function () {
        const start = Date.now();
        const totalCount = run(
          range(0, 100000, 1),
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
          ({
            toBe: (expected) => {
              if (expected !== totalCount) {
                console.log(`toBe fail: ${String(totalCount)} = ${totalCount}`);
                return false;
              } else {
                return true;
              }
            },
            toEqual: (expected) => {
              if (expected != totalCount) {
                console.log(`toBe fail: ${String(totalCount)} = ${totalCount}`);
                return false;
              } else {
                return true;
              }
            },
          }).toBe(50000);
          ({
            toBe: (expected) => {
              if (expected !== elapsed < 1000) {
                console.log(
                  `toBe fail: ${String(elapsed < 1000)} = ${elapsed < 1000}`,
                );
                return false;
              } else {
                return true;
              }
            },
            toEqual: (expected) => {
              if (expected != elapsed < 1000) {
                console.log(
                  `toBe fail: ${String(elapsed < 1000)} = ${elapsed < 1000}`,
                );
                return false;
              } else {
                return true;
              }
            },
          }).toBe(true);
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
        const result = await run(source, take(5), collect());
        {
          ({
            toBe: (expected) => {
              if (expected !== result.length) {
                console.log(
                  `toBe fail: ${String(result.length)} = ${result.length}`,
                );
                return false;
              } else {
                return true;
              }
            },
            toEqual: (expected) => {
              if (expected != result.length) {
                console.log(
                  `toBe fail: ${String(result.length)} = ${result.length}`,
                );
                return false;
              } else {
                return true;
              }
            },
          }).toBe(5);
          ({
            toBe: (expected) => {
              if (expected !== iterations) {
                console.log(`toBe fail: ${String(iterations)} = ${iterations}`);
                return false;
              } else {
                return true;
              }
            },
            toEqual: (expected) => {
              if (expected != iterations) {
                console.log(`toBe fail: ${String(iterations)} = ${iterations}`);
                return false;
              } else {
                return true;
              }
            },
          }).toBe(5);
        }
      });
      it("should not load entire stream into memory", async function () {
        let activeItems = 0;
        let maxActive = 0;
        const result = run(
          range(0, 10000, 1),
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
          }, {}),
          count(),
        );
        {
          ({
            toBe: (expected) => {
              if (expected !== result) {
                console.log(`toBe fail: ${String(result)} = ${result}`);
                return false;
              } else {
                return true;
              }
            },
            toEqual: (expected) => {
              if (expected != result) {
                console.log(`toBe fail: ${String(result)} = ${result}`);
                return false;
              } else {
                return true;
              }
            },
          }).toBe(10000);
          ({
            toBe: (expected) => {
              if (expected !== maxActive < 100) {
                console.log(
                  `toBe fail: ${String(maxActive < 100)} = ${maxActive < 100}`,
                );
                return false;
              } else {
                return true;
              }
            },
            toEqual: (expected) => {
              if (expected != maxActive < 100) {
                console.log(
                  `toBe fail: ${String(maxActive < 100)} = ${maxActive < 100}`,
                );
                return false;
              } else {
                return true;
              }
            },
          }).toBe(true);
        }
      });
    }
  });
  describe("Interop", () => {
    {
      it("should convert Promise to Source", async function () {
        const promise = Promise.resolve(42);
        const result = run(fromPromise(promise), first());
        ({
          toBe: (expected) => {
            if (expected !== result) {
              console.log(`toBe fail: ${String(result)} = ${result}`);
              return false;
            } else {
              return true;
            }
          },
          toEqual: (expected) => {
            if (expected != result) {
              console.log(`toBe fail: ${String(result)} = ${result}`);
              return false;
            } else {
              return true;
            }
          },
        }).toBe(42);
      });
      it("should convert Source to Promise", async function () {
        const source = from([1, 2, 3]);
        const result = await toPromise(source);
        ({
          toBe: (expected) => {
            if (expected !== result) {
              console.log(`toBe fail: ${String(result)} = ${result}`);
              return false;
            } else {
              return true;
            }
          },
          toEqual: (expected) => {
            if (expected != result) {
              console.log(`toBe fail: ${String(result)} = ${result}`);
              return false;
            } else {
              return true;
            }
          },
        }).toBe(1);
      });
      it("should check if value is Source", async function () {
        const source = from([1, 2, 3]);
        {
          ({
            toBe: (expected) => {
              if (expected !== isSource(source)) {
                console.log(
                  `toBe fail: ${String(isSource(source))} = ${isSource(source)}`,
                );
                return false;
              } else {
                return true;
              }
            },
            toEqual: (expected) => {
              if (expected != isSource(source)) {
                console.log(
                  `toBe fail: ${String(isSource(source))} = ${isSource(source)}`,
                );
                return false;
              } else {
                return true;
              }
            },
          }).toBe(true);
          ({
            toBe: (expected) => {
              if (expected !== isSource([1, 2, 3])) {
                console.log(
                  `toBe fail: ${String(isSource([1, 2, 3]))} = ${isSource([1, 2, 3])}`,
                );
                return false;
              } else {
                return true;
              }
            },
            toEqual: (expected) => {
              if (expected != isSource([1, 2, 3])) {
                console.log(
                  `toBe fail: ${String(isSource([1, 2, 3]))} = ${isSource([1, 2, 3])}`,
                );
                return false;
              } else {
                return true;
              }
            },
          }).toBe(false);
          ({
            toBe: (expected) => {
              if (expected !== isSource(42)) {
                console.log(
                  `toBe fail: ${String(isSource(42))} = ${isSource(42)}`,
                );
                return false;
              } else {
                return true;
              }
            },
            toEqual: (expected) => {
              if (expected != isSource(42)) {
                console.log(
                  `toBe fail: ${String(isSource(42))} = ${isSource(42)}`,
                );
                return false;
              } else {
                return true;
              }
            },
          }).toBe(false);
        }
      });
    }
  });
  console.log("All tests defined");
});
