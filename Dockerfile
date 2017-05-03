FROM node:6.8.0  as build

WORKDIR /work

ADD package.json /work/
RUN npm install

ADD .bowerrc /work/
ADD bower.json /work/
RUN /work/node_modules/.bin/bower --allow-root install

ADD / /work

RUN ls -al node_modules
RUN ls -al app/bower_components
RUN /work/node_modules/.bin/gulp build


### ---

FROM nginx:alpine
LABEL maintainer "team@breizhcamp.org"

COPY nginx.conf /etc/nginx/conf.d/cfpio.conf
COPY --from=build /work/dist /www

# Clever cloud require the container to listen on port 8080
ENV NGINX_PORT=8080
EXPOSE 8080
