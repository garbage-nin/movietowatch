# Use the Node.js LTS (Long Term Support) version as the base image
FROM node:lts-alpine

# Set the working directory in the container
WORKDIR /usr/src/app
RUN apk update && apk add mongodb-tools

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the Angular application
CMD npm run start-prod
