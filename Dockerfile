FROM node:lts-slim

ENV PORT 3000

COPY . /app
WORKDIR /app
RUN npm install

EXPOSE $PORT
ENTRYPOINT ["node", "index.js"]
