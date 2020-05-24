###### Build #####
FROM node:12-slim AS node
LABEL author="Harry Ho"
WORKDIR /
COPY . .
RUN npm install
RUN npm run build


###### Run #####
FROM nginx:alpine
LABEL author="Harry Ho"
WORKDIR /var/cache/nginx
COPY --from=node /build /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf


#########################################################
## docker build . -t  rc-prd:2.0
## docker run --publish 8080:80  --name rc2 vc-prd:2.0


