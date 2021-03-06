FROM docker.io/node:16 as devenv

ENV NODE_ENV=local

FROM docker.io/node:16 as base

ENV NODE_ENV=local
RUN mkdir /app && chown node:node /app

USER node

WORKDIR /app
COPY --chown=node:node package*.json .
RUN npm ci && npm cache clean --force
COPY --chown=node:node . .

CMD npx knex --cwd src migrate:latest \
    && npx ts-node src/deploy-commands.ts \
    && exec npx nodemon src/index.ts

FROM base as build

RUN npm run build-prod

FROM docker.io/node:16-slim as prod

ENV NODE_ENV=production
RUN mkdir /app && chown node:node /app

USER node

WORKDIR /app
COPY --chown=node:node package*.json .
RUN npm ci && npm cache clean --force
COPY --chown=node:node --from=build /app/dist/ .

CMD npx knex migrate:latest \
    && node deploy-commands.js \
    && exec node index.js
