##
## Copyright (c) 2020 - Team11. All rights reserved.
##

##
## Builder
##
FROM node:16-alpine AS builder

RUN apk add make

WORKDIR /app

ADD . .

RUN make build


##
## Production
##
FROM nginx:1.20-alpine as production

WORKDIR /

COPY --from=builder /app/docker/nginx/nginx.conf.docker /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/nxa-nft-portal /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
