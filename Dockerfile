FROM node:10-alpine

COPY web_app web_app

WORKDIR web_app

RUN npm install && chown -R node:node .

ENV NODE_ENV=production

USER node

EXPOSE 3000

CMD npm start


