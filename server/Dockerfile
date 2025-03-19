# Use Node.js LTS as base
FROM node:20-alpine

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Set working directory for the application
WORKDIR /app

# Copy package files to install dependencies
COPY package*.json ./

# Install project dependencies
RUN npm install --force

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Command to run the application
CMD ["npm", "run", "start"]

# Expose port 4000 for the application
EXPOSE 4000
