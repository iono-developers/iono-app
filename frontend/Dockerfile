# Stage 1: Build the application
FROM node:14-alpine as build

WORKDIR /app/frontend

COPY main/package*.json ./

RUN npm install

COPY main/ .

# Add this line to copy only the necessary files for building
COPY main/public ./public
COPY main/src ./src
COPY main/package-lock.json ./package-lock.json
COPY main/package.json ./package.json

CMD ["npm", "start"]