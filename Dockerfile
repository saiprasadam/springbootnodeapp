FROM node:10.9.0
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY package*.json ./

COPY index.js ./
COPY result.html ./

RUN npm install

USER node
COPY --chown=node:node /home/node/app

EXPOSE 8080

CMD [ "node", "index.js" ]
