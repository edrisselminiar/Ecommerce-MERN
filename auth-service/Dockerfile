FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && npm install -g nodemon  # Install nodemon globally


# RUN npm install -g nodemon

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
