FROM node:16-alpine AS base

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

FROM base

COPY . .

# RUN yarn build

# CMD ["node", "dist/main.js"]

CMD ["yarn", "start:dev"]