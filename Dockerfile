FROM node:10.9.0
WORKDIR /app

COPY package*.json /app
# Installing npm for DOCKER
RUN npm install
 
# Copying rest of the application to app directory
COPY . /app

EXPOSE 8080 
# Starting the application using npm start
CMD ["npm","start"]
