FROM node:8-alpine

RUN mkdir -p /usr/src/npm
WORKDIR /usr/src/npm

COPY package*.json ./

RUN npm install
RUN npm rebuild node-sass

EXPOSE 3000
