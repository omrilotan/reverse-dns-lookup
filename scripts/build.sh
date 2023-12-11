#!/usr/bin/env bash

esbuild src/index.ts --outfile=index.js --bundle --platform=node --format=cjs
esbuild src/index.ts --outfile=index.mjs --bundle --platform=node --format=esm
tsc src/index.ts --declaration --emitDeclarationOnly --resolveJsonModule --esModuleInterop --outDir .
