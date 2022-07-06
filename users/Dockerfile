# install Parent layer image
FROM node:17-alpine

# Create working directory
WORKDIR /usr/app

# copy Source code layer image
COPY . .

# install dependencies
RUN rm -rf ./node_modules/ && npm ci

# expose necessary port
EXPOSE 8882

# this will execute script in container
CMD ["node", "bin/server.js"]