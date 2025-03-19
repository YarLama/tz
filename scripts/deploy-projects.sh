#!/bin/bash

changed_files=$(git diff --name-only HEAD^ HEAD)
projects=$(find . -maxdepth 1 -type d -name 'project*' | sed 's|./||')
changed_projects=""

echo $changed_files
for project in $projects; do
  if echo "$changed_files" | grep -q "^$project/"; then
    changed_projects="$changed_projects $project"
  fi
done

echo $changed_projects

if [ -z "$changed_projects" ]; then
  echo "No projects change. Skipping."
  exit 0
fi

for project in $changed_projects; do
  echo "Building and deploy: $project"
done


