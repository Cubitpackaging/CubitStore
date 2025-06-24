# Use the official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json, yarn.lock, and .yarnrc.yml
COPY package*.json yarn.lock .yarnrc.yml ./

# Enable corepack and prepare yarn
RUN corepack enable && corepack prepare yarn@4.4.0 --activate

# Install dependencies
# Note: .yarnrc.yml already has nodeLinker: node-modules
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Expose the port the app runs on
EXPOSE 9000

# Set environment variables - these will be overridden by actual environment variables
ENV NODE_ENV=production
ENV DATABASE_URL=postgres://postgres:postgres@postgres:5432/medusa
ENV REDIS_URL=redis://redis:6379
ENV STORE_CORS=http://localhost:8000
ENV ADMIN_CORS=http://localhost:7000
ENV AUTH_CORS=http://localhost:7000
ENV JWT_SECRET=supersecret
ENV COOKIE_SECRET=supersecret

# Start the application
CMD ["yarn", "start"] 