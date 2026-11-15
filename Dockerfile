FROM oven/bun:1.3.6-alpine AS build
WORKDIR /app

COPY package.json .
COPY bun.lock .

RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

FROM oven/bun:1.3.6-alpine

WORKDIR /app

# svelte-adapter-bun bundles the server and the static assets (build/client) into ./build
COPY --from=build /app/build ./build

ENV PORT=3000
EXPOSE 3000

CMD ["bun", "./build/index.js"]
