FROM node:16-alpine

EXPOSE 3000

WORKDIR /usr/app

COPY package*.json .

RUN npm install

COPY . .

CMD ["node","src/server.ts"]