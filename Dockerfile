FROM node:18-alpine3.18 as builder
# 工作位置
WORKDIR /build
# 複製全部東西進去
COPY . .
RUN npm install
RUN npm run release
RUN mv ./dist/fish-util.min.js ./public/fish-util.min.js

FROM nginx:1.25.3-alpine

COPY --from=builder /build/public /usr/share/nginx/html/public
