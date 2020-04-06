# docker build -t dailyrecord/dr_client .
# docker run -d -p 80:80 dailyrecord/dr_client  运行
# docker login && docker push dailyrecord/dr_client

# docker ps 查看正在运行docker 容器 查看正在运行的容器

# docker stop $(docker ps -a -q) 停止所有正在运行的容器
# docker rm $(docker ps -a -q)  删除所有已停止的容器

