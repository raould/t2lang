import { it } from 'vitest';

// These tests document the intended class system behaviour.
// They will be filled in after Step 5 (codegen) is implemented.

it.todo('class — basic constructor and field access');
// (class Foo (class-body (constructor ((x : number)) (set! (. this x) x))))
// (let (f) (new Foo 42))
// (asrt (. f x) 42)

it.todo('class — method with this access');
// (class Greeter (class-body
//   (constructor ((name : string)) (set! (. this name) name))
//   (method greet () (returns string) (return (+ "hello, " (. this name))))))
// (let (g) (new Greeter "world"))
// (asrt ((. g greet)) "hello, world")

it.todo('class — static method');
// (class MathUtils (class-body
//   (method :static square ((n : number)) (returns number) (return (* n n)))))
// (asrt ((. MathUtils square) 7) 49)

it.todo('class — getter and setter');
// (class Box (class-body
//   (constructor ((v : number)) (set! (. this _v) v))
//   (get value () (returns number) (return (. this _v)))
//   (set value ((n : number)) (set! (. this _v) n))))
// (let (b) (new Box 10))
// (asrt (. b value) 10)
// (set! (. b value) 20)
// (asrt (. b value) 20)

it.todo('class — extends with super constructor call');
// (class Animal (class-body
//   (constructor ((name : string)) (set! (. this name) name))
//   (method speak () (returns string) (return (. this name)))))
// (class Dog (extends Animal) (class-body
//   (constructor ((name : string)) (super name))
//   (method speak () (returns string) (return (+ (super-method speak) " barks")))))
// (let (d) (new Dog "Rex"))
// (asrt ((. d speak)) "Rex barks")

it.todo('class — super method call in overridden method');
// (class Base (class-body
//   (method describe () (returns string) (return "base"))))
// (class Child (extends Base) (class-body
//   (method :override describe () (returns string)
//     (return (+ (super-method describe) "+child")))))
// (let (c) (new Child))
// (asrt ((. c describe)) "base+child")

it.todo('class — abstract class (type-only; cannot be instantiated)');
// abstract-method emits TypeScript abstract; verified by type-checker in tsc pass

it.todo('class — implements interface');
// (interface Printable (Object (print (tfn () string))))
// (class Doc (implements Printable) (class-body
//   (method print () (returns string) (return "document"))))
// (let (d) (new Doc))
// (asrt ((. d print)) "document")

it.todo('class — generic type parameter');
// (class Wrapper (type-params T) (class-body
//   (constructor ((val : T)) (set! (. this val) val))
//   (method get () (returns T) (return (. this val)))))
// (let (w : (Wrapper number)) (new Wrapper 99))
// (asrt ((. w get)) 99)

it.todo('class — field with default initializer');
// (class Counter (class-body
//   (field count : number 0)
//   (method inc () (set! (. this count) (+ (. this count) 1)))
//   (method get () (returns number) (return (. this count)))))
// (let (c) (new Counter))
// (asrt ((. c get)) 0)
// ((. c inc))
// (asrt ((. c get)) 1)
