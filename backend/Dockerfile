FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./

RUN npm run build \
    && rm -rf ./src \
    && rm -rf node ./node_modules

FROM node:16-alpine AS kpd-backend
WORKDIR /app
COPY package*.json ./
COPY ./ecosystem.config.js ./
RUN npm ci --omit=dev && npm i -g pm2
COPY --from=builder /app/dist ./dist

EXPOSE 3007

CMD ["pm2-runtime", "start", "ecosystem.config.js"]