# Stage 1: Build the application
FROM node:14-alpine as build

WORKDIR /app/frontend

COPY /main/package.json .
COPY /main/package-lock.json .

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Create a smaller image for runtime
FROM node:20-alpine

WORKDIR /app/frontend

COPY --from=build /app/frontend/build ./build

EXPOSE 3000

CMD ["npx", "serve", "-s", "build"]