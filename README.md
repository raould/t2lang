# T2 Programming Language: Sexprs for TypeScript

## quick start

```bash
cd OLD; npm i && npm run demo
```

## description

* Cannot-be-unseen collision of sexpr and TypeSript syntax.
* This has been generated using AI tools: Copilot GPT-5.1, GPT-5.2, Claude Opus 4.5, Grok Code Fast 1, Gemini 2, Gemini 3, Raptor.
* The original goals for the language were defined by a human.
* Refinements to the design were mainly prompted by the AI to the human.
* The human did make stylistic corrections / choices during the generation process.
* The human did intervene when the AI lost track of the goals.
* This is experimental and likely full of "issues". It might only be enough rope to get into trouble.

## notes

* This repo works best in a GNU/Linux environment.
* It might work on MacOS, or it might have some issues.
* It might work on Microsoft Windows, or it might have some issues.
* This project is a fragile pile of poo.

## lessons learned

* AIs can lie to themselves, and to you.
* AI tools are buggy software with bad UX.
* Error message are very hard to do well.
* Not having a proper AST API for TypeScript sucks.
* Syntax is hell.

## divergances

* You might see more {}'s and ()'s than in human-written TypeScript.
* Function/method 'return' is more lispy than typescripty.
  * can be explicit or implicit.
  * if not explicit, implicitly the last expression's value.
  * if the return type is :void then explicit return is an error.
  * if the return type is :void then no impliict return is generated. 

## todo

* everything not yet done.
* support for multi-file sources.
