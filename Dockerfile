FROM node:16 as base

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .

FROM base as prod

RUN npm run build

CMD ["npm", "run", "prod"]
