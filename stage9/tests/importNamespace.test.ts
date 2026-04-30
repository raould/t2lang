import { it } from 'vitest';
import { fromSourceEndToEnd } from './helpers';

it('namespace import (import * as name "mod")', () => {
  fromSourceEndToEnd(`(program
    (import * as path "node:path")
    (import {asrt} "./helpers")
    (const (result) (path.join "a" "b"))
    (asrt result "a/b")
  )`);
}, 30_000);
