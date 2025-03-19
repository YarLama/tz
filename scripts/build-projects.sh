# !/bin/bash

echo "Building: ${{ matrix.project }}"
cd ${{ matrix.project }}
npm install
npm run build
cd ..
echo "${{ matrix.project }} build end."
