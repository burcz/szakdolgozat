FROM node:10.15-alpine as base

WORKDIR /usr/app

COPY package.json .
COPY tsconfig.json .

RUN npm install


# === frontend ===
FROM base as frontend
COPY webpack.config.js .
ADD src/frontend /usr/app/src/frontend
ADD public /usr/app/public

RUN node_modules/.bin/tsc -p tsconfig.json
RUN node_modules/.bin/webpack

EXPOSE 8080
CMD [ "node", "dist/index.js" ]


# === backend ===
FROM base as api
ADD src/api /usr/app/src
RUN node_modules/.bin/tsc -p tsconfig.json

EXPOSE 3000
CMD ["node", "dist/server.js"]