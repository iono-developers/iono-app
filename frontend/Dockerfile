# Stage 1: Build the application
FROM node:14-alpine as build

WORKDIR /app/frontend

COPY main/package*.json ./

RUN npm install

COPY main/ .

RUN npm run build

# Stage 2: Deploy the application
FROM nginx:alpine

# Copy build artifacts from the build stage
COPY --from=build /app/frontend/build /usr/share/nginx/html

# Expose the port
EXPOSE 80

# Default command to run the nginx server
CMD ["nginx", "-g", "daemon off;"]
