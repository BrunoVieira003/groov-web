FROM oven/bun:latest AS build
WORKDIR /app

COPY package.json .
COPY bun.lock .

RUN bun install

COPY . .

RUN bun run build

FROM oven/bun:latest

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY --from=build /app/static ./static

CMD bun ./build/index.js