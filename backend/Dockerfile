# Description: Dockerfile for the Node.js app
# Author: Sebastián Gámez Ariza

FROM node:16.19.1

RUN mkdir /home/app

COPY . /home/app

RUN cd /home/app && npm install

WORKDIR /home/app

CMD ["npm", "start"]
