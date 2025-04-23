# Stage 1: PHP + Composer
FROM php:8.2-fpm-alpine AS build

# Install dependencies
RUN apk add --no-cache \
    bash \
    git \
    unzip \
    curl \
    nginx \
    supervisor \
    icu-dev \
    libzip-dev \
    libpng-dev \
    oniguruma-dev \
    && docker-php-ext-install pdo pdo_mysql mbstring zip intl

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy app source
COPY . .

# Install Laravel dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Set permissions
RUN chown -R www-data:www-data /var/www && chmod -R 755 /var/www

# Stage 2: Runtime with PHP-FPM and Nginx
FROM php:8.2-fpm-alpine

# Install runtime dependencies
RUN apk add --no-cache nginx supervisor

COPY --from=build /var/www /var/www
WORKDIR /var/www

# Copy Nginx and Supervisor config
COPY ./nginx/default.conf /etc/nginx/http.d/default.conf

# Supervisor configuration
COPY ./supervisord.conf /etc/supervisord.conf

# Expose port
EXPOSE 80

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
