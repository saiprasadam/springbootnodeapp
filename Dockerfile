FROM node:10.9.0
WORKDIR /usr/src/app

COPY package*.json ./

COPY index.js ./
COPY result.html ./

RUN npm install

EXPOSE 8080

CMD [ "node", "index.js" ]
