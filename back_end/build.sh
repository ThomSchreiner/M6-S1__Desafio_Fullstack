cd back_end
yarn
yarn build
yarn typeorm migration:run -d dist/data-source.js