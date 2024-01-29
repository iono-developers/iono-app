# Stage 1: Build the application
FROM node:14-alpine as build

WORKDIR /app/frontend

COPY main/package*.json ./

RUN npm install
RUN npm install react-scripts -g 

COPY main/ .

CMD ["npm", "start"]