FROM node:16-alpine

WORKDIR /usr/app

COPY . .

RUN rm -rf node_modules && \
    npm ci && \
    chown -R node:node /usr/app
ENV TZ=GMT-7
USER node

RUN npm run test

CMD node bin/server.js
