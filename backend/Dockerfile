FROM node:20-alpine

WORKDIR /app

# Install dependencies needed for build
RUN apk add --no-cache python3 make g++ postgresql-dev

# Enable Corepack and use the correct Yarn version
RUN corepack enable && corepack prepare yarn@4.4.0 --activate

# Copy package files first for better caching
COPY package.json yarn.lock ./

# First install only production dependencies
RUN yarn install --network-timeout 600000 --immutable

# Copy the rest of the application
COPY . .

# Install all dependencies (including dev dependencies) and build
RUN yarn install --network-timeout 600000 && yarn build

# Expose port
EXPOSE 9000

# Set environment variables
ENV NODE_ENV=production

# Start the application
CMD ["yarn", "start"] 