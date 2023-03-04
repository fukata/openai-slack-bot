FROM node:lts-slim

COPY . /app
WORKDIR /app
RUN npm install

ENTRYPOINT ["node", "index.js"]