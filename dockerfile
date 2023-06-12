# FROM node:16-alpine AS base

# WORKDIR /usr/src/app

# COPY package*.json ./
# COPY yarn.lock ./

# RUN yarn install

# FROM base

# COPY . .

# RUN yarn build

# CMD ["node", "dist/main.js"]

# # CMD ["yarn", "start:dev"]

FROM node:16.16-alpine as base

USER node
WORKDIR /home/node

COPY package*.json /home/node
COPY yarn.lock /home/node

RUN yarn

# ----

FROM base as production

ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY . /home/node/

RUN yarn build && npm prune --production

CMD ["yarn", "start:prod"]