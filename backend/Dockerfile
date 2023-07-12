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
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/ecosystem.config.js ./
RUN npm ci --omit=dev --audit=false && npm i -g pm2
COPY --from=builder /app/dist ./dist
EXPOSE 4000
CMD ["pm2-runtime", "start", "ecosystem.config.js"]