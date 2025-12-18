### Frontend multi-stage build: build with Node, serve with nginx
FROM node:18-alpine AS build
WORKDIR /app

# install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --silent || npm install --silent

# copy sources and build
COPY . .
RUN npm run build

### Production image
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

# nginx config to proxy /api to backend (service name 'server' in docker-compose)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
