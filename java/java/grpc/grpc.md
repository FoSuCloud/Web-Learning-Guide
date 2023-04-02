## grpc


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
