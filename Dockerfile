FROM node:16-alpine

EXPOSE 3000

WORKDIR /app

COPY . .

RUN npm install

CMD ["ts-node","src/server.ts"]