FROM oven/bun:1.3.6-alpine AS build
WORKDIR /app

COPY package.json .
COPY bun.lock .

RUN bun install

COPY . .
RUN bun run build

FROM oven/bun:1.3.6-alpine

WORKDIR /app

COPY --from=build /app/build ./build
COPY --from=build /app/static ./static

ENV BODY_SIZE_LIMIT=300M

CMD bun ./build/index.js