import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('function decl — basic', () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (fn square ((x)) (return (* x x)))
        (asrt (square 5) 25)
        (asrt (square 0) 0)
    )`);
}, 30_000);

it('function decl — multiple params', () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (fn add ((a) (b)) (return (+ a b)))
        (asrt (add 1 2) 3)
        (asrt (add 10 20) 30)
    )`);
}, 30_000);

it('function decl — with typed params and return type', () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (fn repeat ((s : string) (n : number)) : string
            (return ((. s repeat) n)))
        (asrt (repeat "ab" 3) "ababab")
    )`);
}, 30_000);

it('function decl — multi-statement body', () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (fn clamp ((v) (lo) (hi))
            (if (< v lo) (then (return lo)))
            (if (> v hi) (then (return hi)))
            (return v))
        (asrt (clamp 5 0 10) 5)
        (asrt (clamp -1 0 10) 0)
        (asrt (clamp 99 0 10) 10)
    )`);
}, 30_000);

it('function decl — hoisted (callable before definition)', () => {
    // Unlike const, function declarations are hoisted.
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (asrt (double 4) 8)
        (fn double ((x)) (return (* x 2)))
    )`);
}, 30_000);

it('function expr — anonymous, assigned to const', () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (const square (fn ((x)) (return (* x x))))
        (asrt (square 6) 36)
    )`);
}, 30_000);

it('function expr — IIFE', () => {
    fromSourceEndToEnd(`(program
        (import {asrt} "./helpers")
        (let ((result ((fn ((x)) (return (* x x))) 7))))
        (asrt result 49)
    )`);
}, 30_000);
