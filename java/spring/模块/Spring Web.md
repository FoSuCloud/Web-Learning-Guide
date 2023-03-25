### spring web
* Spring Web 是 Spring Framework 的一个模块，用于支持 Web 应用程序的开发。它提供了一系列的工具和框架，帮助开发者更容易地创建和管理 Web 应用程序。

* 其中最常用的是 `Spring MVC`，它是一个基于模型-视图-控制器（MVC）模式的 Web 框架，用于构建 Web 应用程序和 RESTful 服务。
* Spring MVC 提供了强大的灵活性和可扩展性，使得开发者可以使用不同的视图技术、验证框架、数据绑定和数据存储方式等等。
* 同时，Spring MVC 也提供了许多特性，例如拦截器、异常处理、数据转换器等等，用于简化 Web 应用程序的开发和维护。

* 另一个重要的组件是 Spring WebFlux，它是一个基于反应式编程模型的 Web 框架，用于构建高性能的 Web 应用程序和 RESTful 服务。
* Spring WebFlux 基于 Reactor 框架实现，提供了响应式编程的特性，例如异步和非阻塞 I/O、函数式编程等等。Spring WebFlux 支持多种协议和数据格式，例如 HTTP、WebSocket、JSON、XML 等等，使得开发者可以更加灵活地选择适合自己的技术栈和方案。
* 除了 Spring MVC 和 Spring WebFlux，Spring Web 还提供了许多其他的组件和工具，
* 例如 WebSocket 支持、RestTemplate、Spring Web Services 等等，用于简化 Web 应用程序的开发和集成。
* 总之，Spring Web 是一个非常强大和灵活的 Web 开发框架，可以帮助开发者更加高效地构建和管理 Web 应用程序。

#### @RestController 
* 作用是将 Spring MVC 中的 @Controller 和 @ResponseBody 注解结合在一起。
* 使用 @RestController 注解的类可以`将其所有的方法返回值自动转换为 JSON 或 XML 等格式的响应数据`，
* 而不需要在每个方法上使用 @ResponseBody 注解。

* @RestController 注解可以用于标注一个类，表示该类是一个 RESTful 风格的控制器，
* `它可以处理 HTTP 请求，并将响应数据以 JSON 或 XML 等格式返回给客户端(如果不添加这个，无法扫描识别为一个HTTP控制器，添加@Controller发现不行)`。

* 此外，@RestController 还可以与其他 Spring 组件和功能集成，例如 Spring Security、Spring Data 等等，
* 使得开发者可以更加便捷地构建复杂的 Web 应用程序。

#### PostMapping
* @PostMapping是一个注解，用于指示在接收到HTTP POST请求时调用一个方法。在Java Spring框架中，通过使用该注解可以方便地创建RESTful Web服务。
* 当使用@PostMapping注解标记一个方法时，`该方法将被映射到指定的URL路径，并在接收到POST请求时调用该方法。`
* @PostMapping注解与@RequestMapping注解类似，不同之处在于@PostMapping注解仅匹配HTTP POST请求，
* `而@RequestMapping注解可以匹配多种HTTP请求方法。`
```text
@PostMapping("/path/to/endpoint")
public SomeResponseObject handlePostRequest(@RequestBody SomeRequestObject request) {
    // 处理POST请求并返回响应对象
}
```
* handlePostRequest方法被注解为处理一个HTTP POST请求，并映射到指定的URL路径。
* 该方法将接收一个SomeRequestObject类型的请求体，并返回一个SomeResponseObject类型的响应对象。

#### RequestBody
* @RequestBody 是 Spring Web 框架中一个注解，用于将 HTTP 请求中的请求体（body）映射为 Java 对象。
* 当使用该注解时，Spring 框架会`自动将 HTTP 请求中的 JSON、XML 或其他格式的数据转换成 Java 对象`，
* 并将其作为方法的参数传入。

* 具体来说，@RequestBody 注解可以用于标注一个方法参数，`该参数表示需要从请求体中获取的数据。`
```text
@PostMapping("/users")
public void createUser(@RequestBody User user) {
    // 处理用户创建操作
}
```

#### @ModelAttribute
* `@ModelAttribute 是 Spring MVC 中的一个注解，用于绑定请求参数到方法参数或者 Model 属性上。`
* 当 @ModelAttribute 注解被用于方法参数上时，它会将请求参数绑定到对应的方法参数上。
```text
@GetMapping("/user")
public String getUser(@ModelAttribute("username") User user) {
    // ...
}
```
* `和RequestBody不同的是，ModelAttribute绑定的是请求参数而不是请求体！`

* `它适用于表单提交或者 URL 查询参数等简单的数据绑定场景。`


