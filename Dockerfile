FROM node:6.8.0

MAINTAINER team@breizhcamp.org

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

RUN mkdir /www
RUN mv /work/dist /www/front-legacy

VOLUME /www/front-legacy
CMD /bin/true
