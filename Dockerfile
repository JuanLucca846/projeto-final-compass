FROM node:16-alpine as builder

ENV NODE_ENV build


WORKDIR /app

COPY . /app/

RUN npm install

RUN npm run build 

# ---

FROM node:16-alpine

ENV NODE_ENV production

WORKDIR /app

COPY --from=builder /app/ ./

CMD ["node", "dist/main.js"]