### java.util.concurrent
* 提供了一些并发编程相关的类和接口。

#### Callable
* `Callable接口，用于定义具有返回值的并发任务。`
```java
import java.util.concurrent.*;

public class CallableDemo {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newFixedThreadPool(1);

        // 定义一个Callable任务，计算1到100之间所有整数的和
        Callable<Integer> task = () -> {
            int sum = 0;
            for (int i = 1; i <= 100; i++) {
                sum += i;
            }
            return sum;
        };

        // 提交Callable任务到线程池，并获取Future对象
        Future<Integer> future = executor.submit(task);

        // 获取Callable任务执行结果，并打印输出
        int result = future.get();
        System.out.println("Result: " + result);

        // 关闭线程池
        executor.shutdown();
    }
}
```


