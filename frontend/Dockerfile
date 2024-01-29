# Stage 1: Build the application
FROM node:14-alpine as build

WORKDIR /app/frontend

# Copy only the package files first to leverage Docker caching
COPY ./frontend/main/package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the frontend application
COPY ./frontend/main .

CMD ["npm", "start"]
