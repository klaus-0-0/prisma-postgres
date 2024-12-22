FROM ubuntu
# FROM node
# if select node dont need all RUN part direct go with COPY

RUN apt-get update && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get upgrade -y && \
    apt-get install -y nodejs

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY index index
COPY prisma prisma
COPY .env .env
COPY .gitignore .gitignore

RUN npm install

ENTRYPOINT [ "node", "index/server.js" ]
