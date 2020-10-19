FROM node:12-alpine

RUN apk --no-cache add bash

RUN mkdir /var/deployment
COPY ./ /var/deployment

WORKDIR /var/deployment

CMD ["/bin/bash","-c", "packages/backend/bin/nvenergy-backend"]