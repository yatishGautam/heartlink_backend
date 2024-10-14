#!/bin/bash

# Find all .js files and rename them to .ts
find . -name "*.js" -not -path "./node_modules/*" -exec bash -c 'mv "$0" "${0%.js}.ts"' {} \;

echo "All .js files have been renamed to .ts"
