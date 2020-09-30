FROM node:12-alpine

RUN apk --no-cache add make gcc g++ python bash
RUN npm i -g yarn --force

RUN yarn global add typeorm@0.2.24 && yarn global add pg@8.0.3

RUN mkdir /var/migration-config
COPY config/* /var/migration-config/

COPY ${PACKAGE} /tmp

RUN yarn global add file:/tmp/${PACKAGE}

WORKDIR /usr/local/share/.config/yarn/global/node_modules/\@energyweb/

CMD ["/bin/bash","-c", "typeorm migration:run --config exchange/dist/js/ormconfig.js && typeorm migration:run --config origin-backend/dist/js/ormconfig.js && migrations/bin/migrations -c /var/migration-config/demo-config.json -s /var/migration-config/seed.sql && ptt-backend"]