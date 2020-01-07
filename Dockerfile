FROM node:10  as build
ARG COMMIT_ID

WORKDIR /work
ADD / /work

RUN npm install && \
    /work/node_modules/.bin/bower --allow-root install && \
    /work/node_modules/.bin/gulp build && \
    echo "${COMMIT_ID}" > /work/dist/sha1

### ---

FROM nginx:alpine
LABEL maintainer "team@breizhcamp.org"

COPY nginx.conf /etc/nginx/conf.d/cfpio.conf
COPY --from=build /work/dist /www

# Clever cloud require the container to listen on port 8080
ENV NGINX_PORT=8080
EXPOSE 8080

RUN ln -s  /www /www/front-legacy

CMD ["nginx", "-g", "daemon off;"]
