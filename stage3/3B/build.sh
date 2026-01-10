#!/usr/bin/env bash

function Done() {
    set +x
}
trap Done EXIT

set -x

# Generate ANTLR parser from grammar
npm run build-grammar

# Compile Stage3B.s3a (written in Stage 3A syntax) using Stage 3A compiler
npx tsx ../3A/index.ts Stage3B.s3a > index.ts
echo "built index.ts"
