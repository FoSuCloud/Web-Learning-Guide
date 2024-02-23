## grpc
* gRPC 是由 Google 开发的高性能、跨语言的`远程过程调用`（RPC）框架，
* 基于 `HTTP/2` 和 `Protocol Buffers（protobuf）`协议。
* [官方文档]("https://grpc.io/docs/languages/java/quickstart/")

#### grpc例子
```text
// 客户端
ManagedChannel channel = ManagedChannelBuilder.forAddress("localhost", 8080).usePlaintext().build();
HelloServiceGrpc.HelloServiceBlockingStub stub = HelloServiceGrpc.newBlockingStub(channel);
HelloResponse helloResponse = stub.hello(HelloRequest.newBuilder().setName("World").build());
System.out.println(helloResponse.getMessage());
channel.shutdown();

// 服务端
Server server = ServerBuilder.forPort(8080).addService(new HelloServiceImpl()).build();
server.start();
server.awaitTermination();
```
