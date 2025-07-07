# Use the official Node.js 20 image (LTS) with Alpine for a smaller size
FROM node:22.17.0-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker's layer caching.
# This step is only re-run when these files change.
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application source code into the container
COPY . .

# Expose port 3000 to the host machine for the Next.js dev server
EXPOSE 3000

# The command to start the Next.js development server
CMD ["npm", "run", "dev"]