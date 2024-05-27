# Step 1: Use a Node image as the base image
FROM node:19-bullseye AS build

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Build the application
RUN npm run build

# Step 7: Use a lightweight web server to serve the build files
FROM nginx:alpine

# Step 8: Copy the build files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Expose the port on which the application will run
EXPOSE 80

# Step 10: Start the nginx server
CMD ["nginx", "-g", "daemon off;"]