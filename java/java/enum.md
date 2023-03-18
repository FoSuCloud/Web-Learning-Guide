
#### 创建一个只有一个常量值的枚举类
```java
@Getter
public enum SimulationStatus {
    WAITING(1), 
    FAIL(2), 
    ;
    private final int code;
//    相当于@AllArgsConstructor
    SimulationStatus(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}
```
* 可以改写为
```java
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum SimulationStatus {
    WAITING(1), 
    FAIL(2), 
    ;
    private final int code;
}
```
