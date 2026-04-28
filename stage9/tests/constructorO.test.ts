import { describe, it, expect } from 'vitest';
import { fromSourceEndToEnd } from './helpers';
import { compileSource as compile } from '../index';

const T = 30_000;

function callCompiler(source: string) {
  try {
    return { stdout: compile({ source }), stderr: '', status: 0 };
  } catch (e: any) {
    return { stdout: '', stderr: e.message, status: 1 };
  }
}

describe('constructor-o', () => {
  it('emits destructured object parameter', () => {
    const result = callCompiler(`(program
  (class Point
    (class-body
      (constructor-o ((x : number) (y : number)))))
)`);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('constructor(');
    expect(result.stdout).toContain('x');
    expect(result.stdout).toContain('y');
  }, T);

  it('basic: fields set from named args', () => {
    fromSourceEndToEnd(`(program
  (import {asrt} "./helpers")
  (class Point
    (class-body
      (field (x : number))
      (field (y : number))
      (constructor-o ((x : number) (y : number))
        (set! (. this x) x)
        (set! (. this y) y))))
  (const p (new Point { x: 3, y: 4 }))
  (asrt (. p x) 3)
  (asrt (. p y) 4)
)`, T);
  }, T);

  it('optional param with default', () => {
    fromSourceEndToEnd(`(program
  (import {asrt} "./helpers")
  (class Greeter
    (class-body
      (field (name : string))
      (field (loud : boolean))
      (constructor-o ((name : string) (loud? : boolean (default false)))
        (set! (. this name) name)
        (set! (. this loud) loud))))
  (const g1 (new Greeter { name: "Alice" }))
  (asrt (. g1 name) "Alice")
  (asrt (. g1 loud) false)
  (const g2 (new Greeter { name: "Bob", loud: true }))
  (asrt (. g2 name) "Bob")
  (asrt (. g2 loud) true)
)`, T);
  }, T);

  it('method accesses fields set by constructor-o', () => {
    fromSourceEndToEnd(`(program
  (import {asrt} "./helpers")
  (class Rect
    (class-body
      (field (w : number))
      (field (h : number))
      (constructor-o ((w : number) (h : number))
        (set! (. this w) w)
        (set! (. this h) h))
      (method area () : number
        (return (* (. this w) (. this h))))))
  (const r (new Rect { w: 5, h: 6 }))
  (asrt ((. r area)) 30)
)`, T);
  }, T);

  it('constructor-o in subclass calling super', () => {
    fromSourceEndToEnd(`(program
  (import {asrt} "./helpers")
  (class Animal
    (class-body
      (field (name : string))
      (constructor ((name : string))
        (set! (. this name) name))))
  (class Dog
    (extends Animal)
    (class-body
      (field (breed : string))
      (constructor-o ((name : string) (breed : string))
        (super name)
        (set! (. this breed) breed))))
  (const d (new Dog { name: "Rex", breed: "Labrador" }))
  (asrt (. d name) "Rex")
  (asrt (. d breed) "Labrador")
)`, T);
  }, T);
});

describe('constructor-o access modifiers', () => {
  it('public modifier synthesizes field and this-assignment', () => {
    const result = callCompiler(`(program
  (class Point
    (class-body
      (constructor-o ((public x : number) (public y : number)))))
)`);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('public x: number');
    expect(result.stdout).toContain('public y: number');
    expect(result.stdout).toContain('this.x = x');
    expect(result.stdout).toContain('this.y = y');
  }, T);

  it('public modifier: end-to-end field access', () => {
    fromSourceEndToEnd(`(program
  (import {asrt} "./helpers")
  (class Point
    (class-body
      (constructor-o ((public x : number) (public y : number)))))
  (const p (new Point { x: 3, y: 4 }))
  (asrt (. p x) 3)
  (asrt (. p y) 4)
)`, T);
  }, T);

  it('mixed: modifier and plain params', () => {
    fromSourceEndToEnd(`(program
  (import {asrt} "./helpers")
  (class Greeter
    (class-body
      (field (greeting : string))
      (constructor-o ((public name : string) (greeting : string))
        (set! (. this greeting) greeting))))
  (const g (new Greeter { name: "World", greeting: "Hello" }))
  (asrt (. g name) "World")
  (asrt (. g greeting) "Hello")
)`, T);
  }, T);

  it('readonly modifier synthesizes readonly field', () => {
    const result = callCompiler(`(program
  (class Config
    (class-body
      (constructor-o ((readonly host : string) (readonly port : number)))))
)`);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('readonly host: string');
    expect(result.stdout).toContain('readonly port: number');
  }, T);

  it('modifier with optional+default param', () => {
    fromSourceEndToEnd(`(program
  (import {asrt} "./helpers")
  (class Server
    (class-body
      (constructor-o ((public host : string) (public port? : number (default 8080))))))
  (const s1 (new Server { host: "localhost" }))
  (asrt (. s1 host) "localhost")
  (asrt (. s1 port) 8080)
  (const s2 (new Server { host: "example.com", port: 443 }))
  (asrt (. s2 host) "example.com")
  (asrt (. s2 port) 443)
)`, T);
  }, T);

  it('modifier params run before explicit body statements', () => {
    fromSourceEndToEnd(`(program
  (import {asrt} "./helpers")
  (class Counter
    (class-body
      (field (doubled : number))
      (constructor-o ((public count : number))
        (set! (. this doubled) (* (. this count) 2)))))
  (const c (new Counter { count: 5 }))
  (asrt (. c count) 5)
  (asrt (. c doubled) 10)
)`, T);
  }, T);
});
