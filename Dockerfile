FROM docker.io/node:16 as base

RUN mkdir /app
RUN chown node:node /app

USER node

WORKDIR /app
COPY --chown=node:node package*.json .
RUN npm ci
COPY --chown=node:node . .

FROM base as build

RUN npm run build

FROM docker.io/node:16-slim as prod

RUN mkdir /app
RUN chown node:node /app

USER node

WORKDIR /app
COPY --chown=node:node package*.json .
RUN npm ci --production
COPY --chown=node:node --from=build /app/dist/ .

CMD ["npm", "run", "prod"]
