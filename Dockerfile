FROM node:16.13.1-alpine3.14
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . ./
EXPOSE ${PORT}
CMD ["npm", "start"]