# !/bin/bash

project=$1

echo "Building: $project"
cd $project
npm install
npm run build
cd ..
echo "$project build end."
