FROM oven/bun:latest AS build
WORKDIR /app

COPY package.json .
COPY buck.lock .

RUN bun install

COPY src .
COPY static .

RUN bun run build

FROM ove/bun:latest

WORKDIR /app

COPY --from=build /app/node_modules .
COPY --from=build /app/.svelte-kit .
COPY --from=build /app/.static .

CMD ["bun", "run", "preview"]