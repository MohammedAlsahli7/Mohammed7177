# Bara' website + Ops server. Build: docker build -t bara .   Run: see docker-compose.yml
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run check && npm run build

FROM node:22-alpine
ENV NODE_ENV=production PORT=8080 BARA_DATA_DIR=/data
WORKDIR /app
# The server has no runtime dependencies: just its code, the data seeds and the built site.
COPY --from=build /app/server ./server
COPY --from=build /app/data ./data
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
RUN mkdir -p /data && chown node:node /data
USER node
VOLUME /data
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s CMD wget -qO- http://127.0.0.1:8080/api/health || exit 1
CMD ["node", "server/index.js"]
