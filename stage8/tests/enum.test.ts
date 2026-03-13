import { describe, it, expect } from 'vitest';
import { spawnSync } from 'child_process';
import { fromSourceEndToEnd } from './helpers';

const T = 30_000;

function callCompiler(source: string) {
    return spawnSync('npx', ['tsx', 'index.ts', '-'], {
        encoding: 'utf-8',
        input: source,
        cwd: process.cwd(),
    });
}

describe('enum', () => {
    it('auto-numbered enum emits correct TypeScript', () => {
        const result = callCompiler(`(program
  (enum Direction (Up) (Down) (Left) (Right))
)`);
        expect(result.status).toBe(0);
        expect(result.stdout).toContain('enum Direction { Up, Down, Left, Right }');
    });

    it('enum with explicit numeric values', () => {
        const result = callCompiler(`(program
  (enum Flags (None 0) (Read 1) (Write 2))
)`);
        expect(result.status).toBe(0);
        expect(result.stdout).toContain('enum Flags { None = 0, Read = 1, Write = 2 }');
    });

    it('enum with explicit negative numeric value', () => {
        const result = callCompiler(`(program
  (enum Signal (Fail -1) (Off 0) (On 1))
)`);
        expect(result.status).toBe(0);
        expect(result.stdout).toContain('enum Signal { Fail = -1, Off = 0, On = 1 }');
    });

    it('string enum emits correct TypeScript', () => {
        const result = callCompiler(`(program
  (enum Color (Red "red") (Green "green") (Blue "blue"))
)`);
        expect(result.status).toBe(0);
        expect(result.stdout).toContain('enum Color { Red = "red", Green = "green", Blue = "blue" }');
    });

    it('exported enum', () => {
        const result = callCompiler(`(program
  (export (enum Status (Active "active") (Inactive "inactive")))
)`);
        expect(result.status).toBe(0);
        expect(result.stdout).toContain('export enum Status { Active = "active", Inactive = "inactive" }');
    });

    it('enum end-to-end: auto-numbered values are accessible at runtime', () => {
        fromSourceEndToEnd(`(program
      (import (object (named (array (object (name "asrt"))))) "./helpers")
      (enum Direction (Up) (Down) (Left) (Right))
      (asrt Direction.Up 0)
      (asrt Direction.Down 1)
      (asrt Direction.Left 2)
      (asrt Direction.Right 3)
    )`);
    }, T);

    it('enum end-to-end: string enum values are accessible at runtime', () => {
        fromSourceEndToEnd(`(program
      (import (object (named (array (object (name "asrt"))))) "./helpers")
      (enum Color (Red "red") (Green "green") (Blue "blue"))
      (asrt Color.Red "red")
      (asrt Color.Green "green")
      (asrt Color.Blue "blue")
    )`);
    }, T);
});
