
FROM alpine:latest as base
RUN apk add --update --no-cache nodejs npm

WORKDIR /code

FROM base AS builder
RUN apk add --no-cache \
    curl \
    bash 

COPY package*.json ./

RUN echo "[npm] installing..."  && \
    npm install

COPY . .

RUN npm run build

ENTRYPOINT ["node", "./"]
