# Stage 1: Build the application
FROM node:14-alpine as build

WORKDIR /app/frontend

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

CMD ["npm", "start"]