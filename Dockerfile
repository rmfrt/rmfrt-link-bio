FROM node:22-alpine AS build

WORKDIR /app

ARG PUBLIC_SITE_URL=https://rmfrt.xyz
ARG PUBLIC_CONTACT_EMAIL

ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL
ENV PUBLIC_CONTACT_EMAIL=$PUBLIC_CONTACT_EMAIL

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.29-alpine

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/ /usr/share/nginx/html/

EXPOSE 3000
