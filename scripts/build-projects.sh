# !/bin/bash

changed_projects="${{ steps.detect_changes.outputs.changed_projects }}"
for project in $changed_projects; do
  echo "Building: $project ..."
  cd $project
  npm install
  npm run build
  cd ..
  echo "$project build end."
done
