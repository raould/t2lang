#!/usr/bin/env bash

function Done() {
    set +x
}
trap Done EXIT

set -x

# Generate ANTLR parser from grammar
npm run build-grammar

# Compile Stage3C.s3b (written in Stage 3B syntax) using Stage 3B compiler
npx tsx ../3B/index.ts Stage3C.s3b > index.ts
echo "built index.ts"
