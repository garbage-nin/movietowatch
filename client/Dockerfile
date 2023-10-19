# Use the Node.js LTS (Long Term Support) version as the base image
FROM node:lts as builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html

COPY --from=builder /usr/src/app/dist/movietowatch/ .

RUN chown nginx:nginx /usr/share/nginx/html/*

ENTRYPOINT [ "nginx" , "-g", "daemon off;" ]
