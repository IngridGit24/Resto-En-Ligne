# Dockerfile for NGINX Front
FROM nginx:latest
COPY default.conf /etc/nginx/conf.d/default.conf
COPY ./build /usr/share/nginx/html
EXPOSE 80