# Dockerfile for Backend
FROM php:8.2-fpm
WORKDIR /var/www/html
RUN docker-php-ext-install pdo_mysql
COPY . .
CMD ["php-fpm"]
EXPOSE 8000
