FROM node:18-alpine AS build
WORKDIR /app
COPY monitoring-ui/package*.json ./
RUN npm install --legacy-peer-deps
COPY monitoring-ui/ .
RUN npm run build --prod

FROM nginx:alpine

# Копируем кастомную конфигурацию nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Копируем собранное Angular приложение
COPY --from=build /app/dist/monitoring-ui /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
