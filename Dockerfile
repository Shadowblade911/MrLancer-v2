FROM docker.io/node:16 as base

RUN mkdir /app
RUN chown node:node /app

USER node

WORKDIR /app
COPY --chown=node:node package*.json .
RUN npm install
COPY --chown=node:node . .

FROM base as prod

RUN npm run build

CMD ["npm", "run", "prod"]
