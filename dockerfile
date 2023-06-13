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

# FROM node:16.16-alpine as base

# USER node
# WORKDIR /home/node

# COPY package*.json /home/node
# COPY yarn.lock /home/node

# RUN yarn install

# # ----

# FROM base as production

# ENV NODE_ENV production

# USER node
# WORKDIR /home/node

# COPY . /home/node/

# RUN yarn build && npm prune --production

# CMD ["yarn", "start:prod"]


FROM node:16.16-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:16.16-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]