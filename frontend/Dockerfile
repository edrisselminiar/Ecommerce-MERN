# frontend/Dockerfile
FROM node:18-alpine

WORKDIR /usr/src/main

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]


# , "--", "--host"