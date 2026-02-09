#!/usr/bin/env bash

function Done() {
    set +x
}
trap Done EXIT

set -x
\rm -f s1.ts0
cp index.ts s1.ts0
npx tsx ../stage0/index.ts Stage1.s0 > Stage1.s0.ts
sed '/.. INSERT_STAGE0_COMPILED/ {
  r Stage1.s0.ts
}' s1.ts0 > s1.ts
echo "built s1.ts"



