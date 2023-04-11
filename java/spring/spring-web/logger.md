#### logger
* Spring框架中的Web模块（spring-web）`默认使用Commons Logging作为日志记录机制`。
* 在具体实现上，Spring Web模块使用org.apache.commons.logging.Log接口来输出日志信息。
* `开发者可以通过在classpath中添加不同的日志框架依赖，来切换日志的具体实现机制。`
* 常用的日志框架依赖有Log4j、Logback、SLF4J等。


