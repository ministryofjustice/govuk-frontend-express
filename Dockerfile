# Use the official Node.js image as the base image
FROM node:22.13.1

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Create a non-root user
RUN addgroup --system --gid 1001 appuser && \
    adduser --system --uid 1001 --gid 1001 appuser

# Copy the rest of the application code to the working directory
# and set ownership to the non-root user
COPY --chown=1001:1001 . .

# Build the application
RUN npm run build

# Set ownership of all generated files to the non-root user
RUN chown -R 1001:1001 /app

# Switch to the non-root user by ID (not name)
USER 1001

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]