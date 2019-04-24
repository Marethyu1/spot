FROM node:alpine

# Install app dependencies
COPY package.json /www/package.json
COPY package-lock.json /www/package-lock.json
RUN cd /www; npm ci;

# Copy app source
COPY . /www

# Set work directory to /www
WORKDIR /www

# set your port
ENV PORT 8080

# expose the port to outside world
EXPOSE  8080

USER desk

# Set the entry-point to pstore to run the default CMD
ENTRYPOINT ["/usr/bin/pstore", "exec", "--verbose", "--"]
CMD ["npm", "start"]
