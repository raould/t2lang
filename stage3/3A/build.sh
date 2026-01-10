#!/usr/bin/env bash

function Done() {
    set +x
}
trap Done EXIT

set -x

# Generate ANTLR parser from grammar
npm run build-grammar

# Compile Stage3A.s2 (written in Stage 2 syntax) using Stage 2 compiler
npx tsx ../../stage2/index.ts Stage3A.s2 > index.ts
echo "built index.ts"
