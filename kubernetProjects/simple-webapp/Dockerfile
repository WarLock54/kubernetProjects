FROM nginx:1.27-alpine
# why: immutable, tiny; pins major.minor for reproducibility
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY web/ /usr/share/nginx/html/
HEALTHCHECK CMD wget -qO- http://127.0.0.1:80/health || exit 1