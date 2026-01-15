# Use a lightweight Node.js base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies first to leverage Docker layer caching
COPY package*.json ./
RUN npm install

# Copy the rest of the application source code
COPY . .

# Expose the port Vite runs on
EXPOSE 5173

# Start the development server and listen on all addresses (0.0.0.0)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
