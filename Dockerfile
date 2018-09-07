FROM nginx
COPY dist/designsystem /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
