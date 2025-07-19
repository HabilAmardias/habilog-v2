FROM node:22-alpine AS build-stage

WORKDIR /app

RUN corepack enable pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

FROM nginx:alpine AS production
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/.env /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]