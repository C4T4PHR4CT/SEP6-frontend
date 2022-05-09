# get the base node image
FROM node:14-alpine as builder

# set the working dir for container
WORKDIR /frontend

# copy the json file first
COPY ./package.json /frontend
COPY ./package-lock.json /frontend

# install npm dependencies
RUN npm install

# copy other project files
COPY . .

# build the folder
RUN npm run build

# Handle Nginx
FROM nginx

ENV API_HOST 127.0.0.1
ENV API_PORT 3001
ENV PORT 3000

COPY --from=builder /frontend/dist/sep6-frontend /usr/share/nginx/html
COPY ./docker/nginx/default.conf.template /etc/nginx/templates/default.conf.template