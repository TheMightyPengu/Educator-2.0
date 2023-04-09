FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./

# Install app dependencies for production
RUN npm ci --omit=dev

COPY . .

CMD [ "node", "server.js" ]