FROM node:lts
# Create app directory
WORKDIR /home/node/app

RUN npm install -g serve
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .
RUN npm run build
CMD serve -s build 