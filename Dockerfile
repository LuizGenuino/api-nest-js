FROM node:26.0.0

RUN apt update && apt install openssl procps -y 

USER node 

WORKDIR /home/node/app

CMD ["tail", "-f", "/dev/null"]