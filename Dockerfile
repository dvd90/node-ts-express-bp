FROM node:14.15.4-alpine
# Add metadata to an image

ENV NPM_CONFIG_LOGLEVEL warn
ARG NPM_TOKEN
WORKDIR /app
RUN apk --no-cache add bash make git
COPY ._npmrc .npmrc
COPY package*.json ./
RUN npm install --unsafe-perm && npm cache clean --force
RUN rm -f .npmrc
COPY . .

ARG NODE_ENV=staging
ENV NODE_ENV=${NODE_ENV}

# Build all the TypeScript
RUN npm run run

# Remove all the needless source
RUN rm -rf ./src
EXPOSE 5001
CMD ["npm", "run" ,"run"]
