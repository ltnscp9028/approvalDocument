FROM node:14

WORKDIR /home/node/app

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./

RUN yarn

COPY . .

RUN yarn global add pm2

ENV NODE_ENV production

RUN npx prisma generate

RUN yarn run build

EXPOSE 4000

CMD ["/bin/sh", "-c", "pm2-runtime 'npm start'"]
