# Practical TypeScript to T2 Examples

This document provides real-world code examples showing TypeScript and their T2 equivalents side-by-side.

## Example 1: Simple Calculator

### TypeScript
```typescript
function add(a: number, b: number): number {
  return a + b;
}

function subtract(a: number, b: number): number {
  return a - b;
}

function calculate(op: string, a: number, b: number): number {
  if (op === "add") {
    return add(a, b);
  } else if (op === "subtract") {
    return subtract(a, b);
  } else {
    return 0;
  }
}

const result = calculate("add", 5, 3);
console.log(result);
```

### T2
```t2
(program
  (fn add (a: number, b: number) : number
    (+ a b))

  (fn subtract (a: number, b: number) : number
    (- a b))

  (fn calculate (op: string, a: number, b: number) : number
    (?: (=== op "add") (add a b)
      (?: (=== op "subtract") (subtract a b) 0)))

  (console.log (calculate "add" 5 3)))
```

## Example 2: Array Processing
### TypeScript
```typescript
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(x => x * 2);
const evens = doubled.filter(x => x % 2 === 0);
const sum = evens.reduce((acc, x) => acc + x, 0);

console.log("Sum of doubled even numbers:", sum);
```
### T2
```t2
(program
  (let* ((numbers (array 1 2 3 4 5))
         (doubled (numbers.map (fn (x: number) : number (* x 2))))
         (evens (doubled.filter (fn (x: number) : boolean (=== (% x 2) 0))))
         (sum (evens.reduce (fn (acc: number, x: number) : number (+ acc x)) 0)))
    (console.log "Sum of doubled even numbers:" sum)))
```

### T2
```t2
(program
  (const numbers (array 1 2 3 4 5))

  (const doubled (numbers.map (fn (x) (* x 2))))

  (const evens (doubled.filter (fn (x) (=== (% x 2) 0))))

  (const sum (evens.reduce (fn (acc x) (+ acc x)) 0))

  (console.log "Sum of doubled even numbers:" sum))
```

## Example 3: Person Class

### TypeScript
```typescript
class Person {
  firstName: string = "";
  lastName: string = "";
  age: number = 0;
  
  constructor(firstName: string, lastName: string, age: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
  
  getFullName(): string {
    return this.firstName + " " + this.lastName;
  }
  
  haveBirthday(): void {
    this.age = this.age + 1;
  }
  
  isAdult(): boolean {
    return this.age >= 18;
  }
}

const person = new Person("John", "Doe", 25);
console.log(person.getFullName());
person.haveBirthday();
console.log("Age:", person.age);
```

### T2
```t2
(program
  (class Person
    (.firstName: string "")
    (.lastName: string "")
    (.age: number 0)
    
    (method "constructor" (firstName: string, lastName: string, age: number)
      (this.firstName := firstName)
      (this.lastName := lastName)
      (this.age := age))
    
    (method "getFullName" (): string
      (+ this.firstName " " this.lastName))
    
    (method "haveBirthday" (): void
      (this.age := (+ this.age 1)))

    (method "isAdult" (): boolean
      (>= (prop this "age") 18)))
  
  (const person (new Person "John" "Doe" 25)
    (console.log (person.getFullName()))
    (person.haveBirthday())
    (console.log "Age:" (person.age)))
)
```

## Example 4: Counter with Closure

### TypeScript
```typescript
function createCounter(initial: number) {
  let count = initial;
  
  return {
    increment: () => {
      count = count + 1;
      return count;
    },
    decrement: () => {
      count = count - 1;
      return count;
    },
    getCount: () => {
      return count;
    }
  };
}

const counter = createCounter(0);
counter.increment();
counter.increment();
console.log(counter.getCount()); // 2
```

### T2
```t2
(program
  (fn createCounter (initial)
    (let count initial
      (return (obj
        (field "increment" (fn ()
          (assign count (+ count 1))
          (return count)))
        (field "decrement" (fn ()
          (assign count (- count 1))
          (return count)))
        (field "getCount" (fn ()
          (return count)))))))
  
  (const counter (createCounter 0))
  (counter.increment)
  (counter.increment)
  (console.log (counter.getCount)))
```

## Example 5: Error Handling

### TypeScript
```typescript
function parseJSON(jsonString: string): any {
  try {
    const result = JSON.parse(jsonString);
    console.log("Parsed successfully");
    return result;
  } catch (error) {
    console.error("Parse error:", error);
    return null;
  } finally {
    console.log("Parse attempt completed");
  }
}

const data = parseJSON('{"name": "John"}');
if (data !== null) {
  console.log("Name:", data.name);
}
```

### T2
```t2
(program
  (fn parseJSON (jsonString)
      (try
    (const result (JSON.parse jsonString))
      (console.log "Parsed successfully")
      (return result)
      (catch error
        (call (prop console "error") "Parse error:" error)
        (return null))
      (finally
        (call (prop console "log") "Parse attempt completed"))))
  
  (const data (call parseJSON "{\"name\": \"John\"}"))
  (if (!== data null)
    (console.log "Name:" (prop data "name"))))
```

## Example 6: For Loop Patterns

### TypeScript
```typescript
// Simple counting loop
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// Array iteration
const items = ["a", "b", "c"];
for (let i = 0; i < items.length; i++) {
  console.log(items[i]);
}

// Accumulation
let sum = 0;
for (let i = 1; i <= 10; i++) {
  sum = sum + i;
}
console.log("Sum:", sum);
```

### T2
```t2
(program
  ; Simple counting loop
  (for ((i 0))
    (< i 5)
    (assign i (+ i 1))
    (call (prop console "log") i))
  
  ; Array iteration
  (const items (array "a" "b" "c"))
  (for ((i 0))
  (< i (prop items "length"))
  (assign i (+ i 1))
  (console.log (index items i)))
  
  ; Accumulation
  (let sum 0
    (for ((i 1))
      (<= i 10)
      (assign i (+ i 1))
      (assign sum (+ sum i)))
    (console.log "Sum:" sum)))
```

## Example 7: Object Manipulation

### TypeScript
```typescript
const user = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  profile: {
    age: 28,
    city: "NYC"
  }
};

// Access nested properties
const userName = user.name;
const userAge = user.profile.age;

// Modify properties
user.email = "newemail@example.com";
user.profile.city = "LA";

// Add new property
user.active = true;

console.log(user);
```

### T2
```t2
(program
  (const user (obj
    (field "id" 1)
    (field "name" "Alice")
    (field "email" "alice@example.com")
    (field "profile" (obj
      (field "age" 28)
      (field "city" "NYC")))))))
  
  ; Access nested properties
  (const userName (prop user "name"))
  (const userAge (prop (prop user "profile") "age"))
  
  ; Modify properties
  (assign (prop user "email") "newemail@example.com")
  (assign (prop (prop user "profile") "city") "LA")
  
  ; Add new property
  (assign (prop user "active") true)
  
  (console.log user))
```

## Example 8: Conditional Logic

### TypeScript
```typescript
function gradeScore(score: number): string {
  if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else if (score >= 60) {
    return "D";
  } else {
    return "F";
  }
}

const grade1 = gradeScore(85);
const grade2 = gradeScore(55);
console.log("Grades:", grade1, grade2);
```

### T2
```t2
(program
  (fn gradeScore (score)
    (return (?: (>= score 90)
      "A"
      (?: (>= score 80)
        "B"
        (?: (>= score 70)
          "C"
          (?: (>= score 60)
            "D"
            "F"))))))
  
  (const grade1 (call gradeScore 85))
  (const grade2 (call gradeScore 55))
  (call (prop console "log") "Grades:" grade1 grade2))
```

## Example 9: Factorial (Recursion)

### TypeScript
```typescript
function factorial(n: number): number {
  if (n <= 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

const result = factorial(5);
console.log("5! =", result);
```

### T2
```t2
(program
  (fn factorial (n)
    (return (?: (<= n 1)
      1
      (* n (call factorial (- n 1))))))
  
  (const result (call factorial 5))
  (console.log "5! =" result))
```

## Example 10: Todo List Manager

### TypeScript
```typescript
class TodoList {
  todos: string[] = [];
  
  add(item: string): void {
    this.todos.push(item);
  }
  
  remove(index: number): void {
    this.todos.splice(index, 1);
  }
  
  getAll(): string[] {
    return this.todos;
  }
  
  getCount(): number {
    return this.todos.length;
  }
}

const list = new TodoList();
list.add("Buy milk");
list.add("Write code");
list.add("Exercise");
console.log("Total tasks:", list.getCount());
console.log("Tasks:", list.getAll());
```

### T2
```t2
(program
  (fn createTodoList ()
    (let* ((todos (array)))
      (return (obj
        (field "add" (fn (item)
          (todos.push item)))
        (field "remove" (fn (index)
          (todos.splice index 1)))
        (field "getAll" (fn ()
          (return todos)))
        (field "getCount" (fn ()
          (return (prop todos "length"))))))))
  
  (const list (call createTodoList))
  (list.add "Buy milk")
  (list.add "Write code")
  (list.add "Exercise")
  (console.log "Total tasks:" 
    (list.getCount))
  (console.log "Tasks:" 
    (list.getAll)))
```

## Example 11: Find Maximum in Array

### TypeScript
```typescript
function findMax(numbers: number[]): number {
  if (numbers.length === 0) {
    throw new Error("Array is empty");
  }
  
  let max = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > max) {
      max = numbers[i];
    }
  }
  return max;
}

try {
  const nums = [3, 7, 2, 9, 1, 5];
  const maximum = findMax(nums);
  console.log("Max:", maximum);
} catch (e) {
  console.error("Error:", e);
}
```

### T2
```t2
(program
  (fn findMax (numbers)
    (if (=== (prop numbers "length") 0)
      (throw (new Error "Array is empty")))
    (let* ((max (index numbers 0))
           (i 1))
      (while (< i (prop numbers "length"))
        (if (> (index numbers i) max)
          (assign max (index numbers i)))
        (assign i (+ i 1)))
      (return max)))
  
    (try
    (const nums (array 3 7 2 9 1 5))
    (const maximum (call findMax nums))
    (console.log "Max:" maximum)
    (catch e
      (console.error "Error:" e))))
```

## Example 12: Type Aliases and Assertions

### TypeScript
```typescript
type Point = { x: number; y: number };
type Circle = { center: Point; radius: number };

function distance(p1: Point, p2: Point): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

const point1 = { x: 0, y: 0 } as Point;
const point2 = { x: 3, y: 4 } as Point;
const dist = distance(point1, point2);
console.log("Distance:", dist);
```

### T2
```t2
(program
  (type-alias Point 
    (type-object 
      (x number) 
      (y number)))
  
  (type-alias Circle
    (type-object
      (center Point)
      (radius number)))
  
  (fn distance (p1 p2)
  (const dx (- (prop p2 "x") (prop p1 "x")))
  (const dy (- (prop p2 "y") (prop p1 "y")))
  (return (Math.sqrt (+ (* dx dx) (* dy dy)))))
  
  (const ((point1 (type-assert 
    (obj (field "x" 0) (field "y" 0))
    Point))))
  (const ((point2 (type-assert
    (obj (field "x" 3) (field "y" 4))
    Point))))
  (const ((dist (call distance point1 point2))))
  (console.log "Distance:" dist))
```

## Tips for Conversion

1. **Start simple**: Begin with basic expressions and build up
2. **Maintain structure**: Keep the logical flow the same
3. **Watch nesting**: Deeply nested code becomes deeply nested s-expressions
4. **Property access**: Use dot notation for property access: (. obj field)
5. **Method calls**: Use dot notation for method calls: (. obj method args...)
6. **Type annotations**: Add type annotations to function parameters and return types
7. **Expression-based**: Functions return the value of their last expression; no explicit return needed
8. **Operator precedence**: T2's prefix notation eliminates ambiguity
9. **Testing**: Compile and test incrementally as you convert

## Common Pitfalls

- Forgetting to wrap the entire program in `(program ...)`
- Using strings for property names in dot notation (use bare identifiers)
- Missing parentheses around operators
- Forgetting type annotations on function parameters and returns
- Not eliding explicit `(return)` statements since T2 is expression-based
- Using `(call)` for method invocations (use dot notation instead)
- Using `(prop)` for property access (use dot notation instead)
