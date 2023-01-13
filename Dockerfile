FROM node:lts AS builder
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY ./ ./

FROM node:alpine
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY --from=builder /usr/src/app /usr/src/app
EXPOSE 8080
CMD npm start