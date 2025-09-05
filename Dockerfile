FROM node:18
# Create app directory
WORKDIR /usr/src/app
COPY ./* ./
RUN npm install


EXPOSE 5000
CMD [ "npm","run","prod" ]
