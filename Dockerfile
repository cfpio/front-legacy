FROM ubuntu

MAINTAINER team@breizhcamp.org

ENV NODE_VERSION 4.2.2

RUN apt-get install -y curl
RUN curl -SL "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz" | tar xz -C /usr/local --strip-components=1

WORKDIR /work

ADD package.json /work/
RUN npm install

CMD mkdir app/bower_components
ADD .bowerrc /work/
ADD bower.json /work/
RUN node_modules/.bin/bower --allow-root install

ADD / /work

RUN ls -al node_modules
RUN ls -al app/bower_components
RUN node_modules/.bin/gulp build

VOLUME /work/dist
