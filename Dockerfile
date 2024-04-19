FROM node:16-alpine

WORKDIR /app
COPY package.json .
RUN apk update && apk add --no-cache gcc g++ libstdc++ python3 python3-dev openjdk12
RUN npm install

COPY . .
EXPOSE 4000
CMD ["node", "server.js"]


