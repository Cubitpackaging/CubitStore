FROM node:20-alpine

WORKDIR /app

# Install dependencies needed for build
RUN apk add --no-cache python3 make g++

# Copy package.json and install dependencies
COPY package.json ./
COPY yarn.lock ./

RUN yarn install

# Copy the rest of the application
COPY . .

# Build the application
RUN yarn build

# Expose port
EXPOSE 9000

# Set environment variables
ENV NODE_ENV=production

# Start the application
CMD ["yarn", "start"] 