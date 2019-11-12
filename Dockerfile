FROM node:10.15-alpine as base

WORKDIR /usr/app

COPY package.json .
COPY tsconfig.json .
COPY src/config.json src/

RUN npm install


# === frontend ===
FROM base as frontend
COPY webpack.config.js .
ADD src/frontend /usr/app/src/frontend
ADD public /usr/app/public

RUN node_modules/.bin/tsc -p tsconfig.json --outDir dist/frontend
RUN node_modules/.bin/webpack

EXPOSE 8080
CMD [ "node", "dist/frontend/index.js" ]


# === backend ===
FROM base as api
ADD src/api /usr/app/src/api
RUN node_modules/.bin/tsc -p tsconfig.json --outDir dist/api

EXPOSE 3000
CMD ["node", "dist/api/server.js"]