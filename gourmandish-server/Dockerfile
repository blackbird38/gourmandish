FROM debian

RUN apt update && apt install -y nodejs npm

RUN npm -v && node -v

RUN mkdir /var/www

WORKDIR /var/www

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

ENV MONGO_HOST=127.0.0.1
ENV MONGO_USER=root
ENV MONGO_PORT=27017
ENV MONGO_PW=root

CMD node index.js


#docker build -t gourmandish .


#----

#docker network create express-mongo
#docker run --rm -d --network=express-mongo --name=gourmandishdb -e MONGO_INITDB_ROOT_USERNAME=root mongo
#docker run --rm -d --network=express-mongo gourmandish


#[docker pull mongo
#docker run -d --name mymongo \
#      -e MONGO_INITDB_ROOT_USERNAME=root \
#      -e MONGO_INITDB_ROOT_PASSWORD=root \
#      mongo]
#docker run --rm -p 3000:3000 gourmandish .

#http://localhost:3000/