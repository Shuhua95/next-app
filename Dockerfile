FROM mhart/alpine-node

# Create app directory
RUN mkdir -p /usr/local/next-app
WORKDIR /usr/local/next-app

# Bundle app source
COPY . /usr/local/next-app

RUN yarn install
RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]