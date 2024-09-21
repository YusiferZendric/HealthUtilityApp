FROM node:16-alpine

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

RUN npm run build

# Serve the build using a simple server
RUN npm install -g serve

CMD ["serve", "-s", "build", "-l", "3000"]