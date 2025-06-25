FROM node:20-alpine

WORKDIR /app

# Install dependencies needed for build
RUN apk add --no-cache python3 make g++ postgresql-dev

# Enable Corepack and use the correct Yarn version
RUN corepack enable && corepack prepare yarn@4.4.0 --activate

# Copy all application files
COPY . .

# Copy the Docker-specific .env file
COPY .env.docker .env

# Install dependencies and build with admin UI
RUN yarn install --network-timeout 600000 && \
    yarn build:admin

# Expose port
EXPOSE 9000

# Set environment variables
ENV NODE_ENV=production

# Start the application
CMD ["yarn", "start"] 