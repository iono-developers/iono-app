# The first instruction is what image we want to base our container on
# We Use an alpine version of docker cause consists in a 
# minimal Linux version (with node js)
FROM node:20-alpine

# Set the working directory to /app/frontend
# NOTE: all the directives that follow in the Dockerfile will be executed in
# that directory (I tried to separate backend from frontend)
WORKDIR /app/frontend

# Copy the package.json to the working directory
# I need to install first the packages from npm
COPY /main/package.json .

# Install npm packages
RUN npm install

# Now I can copy the entire project in the workdir
COPY . .

# The server will run on 127.0.0.1:3000
EXPOSE 3000

# Create the build and run it with serve
CMD npm run build && serve -s build