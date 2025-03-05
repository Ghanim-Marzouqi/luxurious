# Use Node.js LTS as the base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json before running npm install (for caching)
COPY package*.json ./

# Install dependencies with --force to resolve conflicts
RUN npm install --force

# Copy the entire project
COPY . .

# Build the Next.js app
RUN npm run build

# Set the default command to start the Next.js server
CMD ["npm", "run", "start"]

# Expose port 3000
EXPOSE 3000
