### interface
```java
public interface ICode {
    Integer getCode();
    String getMsg();
    String getName();
}
```
* `第一个表示出参，后面的是函数名称`

#### 创建一个枚举类实现接口类
```java
public enum MyEnum implements ICode {
    FOO,
    BAR,
    BAZ;

    @Override
    public String getName() {
        return name();
    }
}
```
* `注意，可以只实现某个函数即可`

#### 也可以实现所有函数
```java
public enum ErrorCode implements ICode {

    // 定义枚举常量
    SUCCESS(200, "请求成功"),
    PARAMETER_ERROR(400, "参数错误"),
    AUTHORIZATION_ERROR(401, "授权失败"),
    NOT_FOUND(404, "请求的资源不存在"),
    SERVER_ERROR(500, "服务器内部错误");

    // 定义枚举属性
    private final Integer code;
    private final String msg;

    // 枚举类的构造函数
    ErrorCode(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    // 实现 ICode 接口的方法
    @Override
    public Integer getCode() {
        return code;
    }

    @Override
    public String getMsg() {
        return msg;
    }

    @Override
    public String getName() {
        return name();
    }
}
```

