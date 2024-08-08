# Use the official lightweight Node.js 12 image.
# https://hub.docker.com/_/node
FROM node:18 as build
ARG BASE_URL

ENV BASE_URL=$BASE_URL

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json yarn.lock ./

# Install dependencies.
# If you add a package-lock.json speed your build by switching to 'npm ci'.
# RUN npm ci --only=production

RUN yarn install 

# Copy local code to the container image.
COPY . ./
RUN yarn generate


# Nginx Serve Static File
FROM nginx:alpine

# Copy Nginx Config
COPY ./nginx/ /etc/nginx/

# Copy from build
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

RUN touch /var/run/nginx.pid

RUN chown -R nginx:nginx /var/run/nginx.pid /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d

USER nginx

EXPOSE 8000

CMD ["nginx", "-g", "daemon off;"]