#!/usr/bin/env bash

function Done() {
    set +x
}
trap Done EXIT

set -x
npx tsx ../stage0/index.ts Stage1.s0 > index.ts
echo "built index.ts"



