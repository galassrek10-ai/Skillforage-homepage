FROM node:18-alpine
WORKDIR /usr/src/app

COPY package.json package-lock.json* ./
RUN npm ci --production --silent || npm install --production --silent

COPY . .

EXPOSE 4000
CMD ["node", "index.js"]
