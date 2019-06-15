FROM ubuntu:latest
USER root

WORKDIR /home/app
ENV PORT=9999
COPY ./package.json /home/app/package.json

RUN apt-get update && apt-get -y install curl gnupg build-essential python && \
    curl -sL https://deb.nodesource.com/setup_12.x  | bash -  && \
    apt-get -y install nodejs && \
    apt-get autoremove -y

RUN npm install && npm i -g nodemon
RUN node -v
RUN npm -v
RUN nodemon -v

ARG CACHE_DATE="$(date)"

# COPY ./src/ /home/app/src/
RUN pwd
RUN ls -la

CMD nodemon src/server/app.js
# CMD [ "npm", "start" ]


EXPOSE 9999
