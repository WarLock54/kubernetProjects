# Use an official Node.js runtime as a parent image
FROM node:18-alpine  

# Set the working directory
WORKDIR /usr/src/app

# Copy the application files
COPY package*.json ./
COPY app.js ./

# Install dependencies
RUN npm install --only=production

EXPOSE 5001

# Start the application
CMD ["node", "app.js"]