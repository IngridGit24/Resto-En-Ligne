# Use official PHP image as a base
FROM php:8.2-fpm

# Install dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    git \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql \
    && apt-get clean && rm -rf /var/lib/apt/lists/*  # Clean up to reduce image size

# Set working directory
WORKDIR /var/www

# Copy Laravel project files
COPY . .

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install Laravel dependencies
RUN composer install --prefer-dist --no-dev --no-scripts --no-progress --no-interaction

# Set correct permissions for Laravel storage
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Expose port 9000 (PHP-FPM default port)
EXPOSE 9000

# Start PHP-FPM server
CMD ["php-fpm"]
