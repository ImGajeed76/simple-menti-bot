FROM node:19-alpine

# Update the system
RUN apk update && apk upgrade

# Install java
RUN apk add openjdk8

# Install chromium
RUN apk add chromium
RUN apk add chromium-chromedriver
ENV CHROMEDRIVER=/usr/bin/chromedriver

# Build the app
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ENV PORT=8080
EXPOSE 8080
CMD ["npm", "start"]
