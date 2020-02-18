FROM nginx
COPY dist/apps/cookbook /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
