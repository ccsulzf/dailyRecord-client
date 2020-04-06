# FROM tiangolo/node-frontend:10 as build-stage
# WORKDIR /app
# COPY package*.json /app/
# RUN npm install
# RUN npm update
# COPY ./ /app/
# ARG configuration=production
# RUN npm run build -- --output-path=./dist/out --configuration $configuration
# # Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
# FROM nginx:1.15
# COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
# # Copy the default nginx.conf provided by tiangolo/node-frontend
# COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf

# docker build -t dailyrecord/dr:prod .
# docker run -p 80:80 dailyrecord/dr:prod

# FROM nginx:1.15
# WORKDIR /dr-client
# COPY dist /dr-client/
# COPY dist  /usr/share/nginx/html
# COPY  /nginx.conf /etc/nginx/conf.d/default.conf
# docker build -t dailyrecord/dr_client .
FROM nginx:1.15
# WORKDIR /dr-client
COPY dist /usr/share/nginx/html
COPY  /nginx.conf /etc/nginx/conf.d/default.conf
