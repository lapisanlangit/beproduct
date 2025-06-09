FROM node:18-alpine AS builder
# Create app directory
WORKDIR /usr/src/app
COPY ./* ./
RUN npm install


EXPOSE 5000
CMD [ "npm","run","prod" ]
