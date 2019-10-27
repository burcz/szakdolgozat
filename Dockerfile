FROM node:10.15-alpine
# Create Directory for the Container
WORKDIR /usr/app
# Only copy the package.json file to work directory
COPY package.json .
COPY tsconfig.json .
# Install all Packages
RUN npm install
# Copy all other source code to work directory
ADD ./src /usr/app/src
# TypeScript
RUN node_modules/.bin/tsc -p tsconfig.json
# Start
CMD [ "node", "dist/index.js" ]
EXPOSE 8080