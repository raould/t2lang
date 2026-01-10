#!/usr/bin/env bash

function Done() {
    set +x
}
trap Done EXIT

set -x

# Generate ANTLR parser from grammar
npm run build

# Compile Stage2.s1 (written in Stage 1 syntax) using Stage 1 compiler
npx tsx ../stage1/index.ts Stage2.s1 > index.ts && \
echo "built index.ts" || \
echo "ERROR"

