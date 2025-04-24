# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only package.json and lock file first (for better layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Run Vite dev server with network access
CMD ["npm", "run", "dev", "--", "--host"]
