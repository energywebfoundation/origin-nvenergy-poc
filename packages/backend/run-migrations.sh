#!/bin/bash

env  $(grep -v '^#' ../../.env | xargs) node_modules/.bin/typeorm migration:run -f node_modules/@energyweb/exchange/dist/js/ormconfig.js
env  $(grep -v '^#' ../../.env | xargs) node_modules/.bin/typeorm migration:run -f node_modules/@energyweb/origin-backend/dist/js/ormconfig.js
node_modules/.bin/origin-migrations -c ../../config/migrations/demo-config.json -s ../../config/migrations/seed-dev.sql -e ../../.env