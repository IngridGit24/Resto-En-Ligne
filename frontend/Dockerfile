# Use official Node.js image
FROM node:16

# Set working directory
WORKDIR /app

# Copy React project files
COPY . .

# Install dependencies
RUN npm install

# Expose port 3000
EXPOSE 3000

# Start React development server
CMD ["npm", "start"]