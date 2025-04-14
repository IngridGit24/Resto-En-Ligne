# Build Stage
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./

# Install Dependencies
RUN npm install axios react-router-dom bootstrap react-bootstrap @fortawesome/fontawesome-free react-router-bootstrap
RUN npm install


COPY . .
RUN npm run build

# Production Stage with Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx/frontend.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
