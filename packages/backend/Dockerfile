FROM node:12-alpine

RUN apk --no-cache add bash

RUN mkdir /var/deployment
COPY ./ /var/deployment

WORKDIR /var/deployment/packages/backend

CMD ["/bin/bash","-c", "node_modules/.bin/typeorm migration:run --config node_modules/@energyweb/exchange/dist/js/ormconfig.js && \
   node_modules/.bin/typeorm migration:run --config node_modules/@energyweb/origin-backend/dist/js/ormconfig.js && \
   node_modules/.bin/origin-migrations -c /var/deployment/config/demo-config.json -s/var/deployment/config/seed.sql && \
   bin/nvenergy-backend"]