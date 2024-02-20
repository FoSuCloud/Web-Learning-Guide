#### oneof
* oneof是一种特殊的字段定义，用于指定一个消息中的字段集合中只能有一个字段被设置。
* 换句话说，oneof字段表示`一组互斥的选项，只能有一个选项被选择`。
```grpc
syntax = "proto3";

message MyMessage {
  oneof content {
    string text = 1;
    int32 number = 2;
    bool flag = 3;
  }
}
```
* MyMessage消息包含了一个oneof字段content，它包含了三个候选项：text、number和flag。当你创建一个MyMessage消息时，只能设置其中的一个字段，其他的字段都会被忽略。

#### repeated
* 可以使用repeated关键字来表示列表（数组）类型。
* repeated关键字表示一个字段可以包含零个或多个元素，即它是`一个列表类型`。
```grpc
syntax = "proto3";

message MyMessage {
  repeated int32 numbers = 1;
}
```


