FROM node:22-alpine AS build-stage

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

FROM nginx:alpine AS production
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/.env /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]