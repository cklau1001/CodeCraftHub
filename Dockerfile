FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for npm install
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY src/ .

# Expose the port the app runs on
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]
