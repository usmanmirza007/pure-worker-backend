FROM node:16.20.0-alpine


WORKDIR /usr/src/

COPY ./.npmrc ./
COPY ./package*.json ./

RUN apk add --update bash vim && rm -rf /var/cache/apk/*

RUN npm install -g yarn --force

RUN yarn

RUN yarn add pm2
COPY . .

EXPOSE 8000
#RUN yarn build
#

#CMD pm2-runtime start yarn --name Rememo-client -- start
CMD  PORT=3000 yarn start
