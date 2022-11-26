FROM nginx:1.16.1-alpine
#FROM scratch 表示使用空白镜像作为基础镜像
RUN nginx -t
CMD echo "Hello world"
ENTRYPOINT echo "ENTRYPOINT..."
# 执行docker build -f dockerbuild/Dockerfile -t test:1.0.0 .
# docker run -it test:1.0.0
# 然后可以看到生成镜像并启动后，打印的是 ENTRYPOINT...
