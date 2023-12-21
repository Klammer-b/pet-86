FROM node:latest

WORKDIR /app

ENV NODE_ENV=test

COPY package*.json .

RUN npm install

COPY . .

ENTRYPOINT [ "npm", "run", "start" ]
