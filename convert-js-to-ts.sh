#!/bin/bash

# Check if the directory argument is provided
if [ -z "$1" ]; then
  echo "Please provide the root directory of your project."
  exit 1
fi

# Navigate to the project root directory
cd "$1"

# Find all .js files and rename them to .ts
echo "Converting all .js files to .ts..."
find . -name "*.js" -not -path "./node_modules/*" -exec bash -c 'mv "$0" "${0%.js}.ts"' {} \;

echo "Conversion complete!"
