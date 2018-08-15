FROM node:alpine

# Create app directory
RUN mkdir -p /usr/local/next-app
WORKDIR /usr/local/next-app

# Bundle app source
COPY . /usr/local/next-app

EXPOSE 3000

CMD [ "npm", "start" ]