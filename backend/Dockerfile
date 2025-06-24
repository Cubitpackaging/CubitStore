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

# Start the application
CMD ["yarn", "start"] 