### docker-compose

#### 启动项目
* `docker-compose -f  xxx.yml up -d`

#### redis
* 这里定义了一个自定义网络 run-service-network
* 自定义网络允许Docker容器通过自定义网络名称进行通信，这样可以更方便地控制容器之间的连接和通信。
* `自定义网络的好处是在同一个网络内的容器可以使用容器名称来进行通信，而无需直接使用IP地址。`
```yaml
version: '3.1'
services:
  test-redis:
    image: library/redis:5.0
    container_name: test-redis
    networks:
      - network
    restart: unless-stopped
    ports:
      - 44806:6379
    command: redis-server --appendonly yes
    environment:
      ALLOW_EMPTY_PASSWORD: 'yes'

networks:
  network:
    name: run-service-network
```

#### mq
```yaml
version: '3.1'
services:
  run-rabbitmq-3.8:
    image: rabbitmq:3.8-management
    container_name: test-rabbitmq
    restart: unless-stopped
    hostname: test-rabbitmq
    networks:
      - network
    ports:
      - 4672:15672
      - 35672:5672
    volumes:
      - ./testmq-data:/var/lib/rabbitmq
    environment:
      - RABBITMQ_DEFAULT_USER=admin
      - RABBITMQ_DEFAULT_PASS=123456

networks:
  network:
    name: run-service-network
```
