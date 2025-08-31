# frontend/Dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json .
RUN npm install --production
COPY src ./src


FROM node:18-alpine
WORKDIR /app
COPY --from=build /app /app
ENV PORT=8080
EXPOSE ${PORT}
CMD ["node", "./node_modules/serve/bin/serve", "-s", "src", "-l", "${PORT}"]