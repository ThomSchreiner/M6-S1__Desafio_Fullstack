#!/usr/bin/env bash
# exit on error
set -o errexit

cd back_end
yarn
yarn build
yarn typeorm migration:run -d dist/data-source.js