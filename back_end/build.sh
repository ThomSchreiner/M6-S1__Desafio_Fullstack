cd back_end
yarn

#!/usr/bin/env bash
# exit on error
set -o errexit

yarn build
yarn typeorm migration:run -d dist/data-source.js