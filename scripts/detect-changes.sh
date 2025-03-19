#!/bin/bash

changed_files=$(git diff --name-only HEAD^ HEAD)
projects=$(find . -maxdepth 1 -type d -name 'project*' | sed 's|./||')
changed_projects=""

for project in $projects; do
  if echo "$changed_files" | grep -q "^$project/"; then
    changed_projects="$changed_projects $project"
  fi
done

if [ -z "$changed_projects" ]; then
  echo "No projects change. Skipping."
  echo "skip_test=true" >> $GITHUB_OUTPUT
  exit 0
fi

changed_projects="[${changed_projects:1}]"
echo "changed_projects=$changed_projects" >> $GITHUB_OUTPUT

