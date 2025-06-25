FROM node:20-alpine

WORKDIR /app

# Install dependencies needed for build
RUN apk add --no-cache python3 make g++ postgresql-dev

# Enable Corepack and use the correct Yarn version
RUN corepack enable && corepack prepare yarn@4.4.0 --activate

# Copy all application files
COPY . .

# Install dependencies and build with explicit admin build
RUN yarn install --network-timeout 600000 && \
    yarn medusa build && \
    yarn build

# Expose port
EXPOSE 9000

# Set environment variables
ENV NODE_ENV=production

# Start the application
CMD ["yarn", "start"] 