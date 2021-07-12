##
## Copyright (c) 2021 - Team11. All rights reserved.
##

##
## Builder
##
FROM node:16-alpine AS builder

RUN apk add make

WORKDIR /app

COPY package*.json ./

RUN npm install --silent

COPY . .

RUN make build

##
## Development
##
FROM node:16-alpine as development

RUN apk add make

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY --from=builder /app/Makefile ./
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/*.js ./
COPY --from=builder /app/*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

CMD make start-dev

##
## Production
##
FROM node:16-alpine as production

RUN apk add make

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY --from=builder /app/Makefile ./
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/*.js ./
COPY --from=builder /app/*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

CMD make start-prod
