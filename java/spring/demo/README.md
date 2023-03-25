## demo
* 创建一个spring boot项目
* 首先执行
* `spring init --dependencies=web --build maven spring-demo`
* 创建一个基于mvn的spring web项目

#### 添加依赖
* 在pom.xml中添加lombok，spring-boot-devtools,spring-boot-starter-web等依赖
* 写好后重新reload project就可以下载依赖了

#### Application入口文件
* `首先是配置SpringBootApplication， 设置扫描的基准路径，这样才能扫描到controller目录下的bean`
* `然后是SpringApplication.run(DemoApplication.class, args); 设置使用SpringApplication启动`
```java
@SpringBootApplication(scanBasePackages = {"com.example.springdemo"})
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}
```

#### 定义接口
* `注意要使用@RestController,表示它可以处理 HTTP 请求，并将响应数据以 JSON 或 XML 等格式返回给客户端`
* `这样被scan扫描到了之后才能生效，接口才能走对应的位置`
```java
@RestController
@RequiredArgsConstructor
public class HomeController {
    @PostMapping("/")
    public String index() {
        return "index";
    }
    @GetMapping("/get")
    public String getHome() {
        return "getHome";
    }
}
```

#### 测试
* 通过MockMvc 开始进行测试

#### spring版本配置
* java1.8+mybatis-plus-boot-starter3.4.2+mysql5.7+mysql-connector-java8.0.32+flyway-core5.2.1+spring-boot-starter-parent2.4.3