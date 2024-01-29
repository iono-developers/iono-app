# Stage 1: Build the application
FROM node:14-alpine as build

RUN npm install -g create-react-app

WORKDIR /app/frontend

COPY main/package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]