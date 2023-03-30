### Feign
* Feign 使编写 Java http 客户端更容易


#### @FeignClient
* ` @FeignClient 是 Spring Cloud 中一个用于声明式 REST 客户端的注解。`
* 它简化了创建 REST 客户端的过程，使得开发者可以像调用本地服务一样调用远程 REST 服务。

* 使用 @FeignClient 注解的接口会被 Spring 容器扫描并生成一个动态代理对象，该代理对象可以根据接口定义动态生成实现类，并向远程服务发起 HTTP 请求。
* 通过 @RequestMapping 等注解可以指定 REST 接口的 URL 路径、HTTP 方法、请求头、请求参数、请求体等信息。

* 除此之外，@FeignClient 还提供了多种配置选项，可以对连接超时、请求重试、请求拦截器等进行配置，以满足不同场景下的需求。
* 总的来说，@FeignClient 的使用使得开发者可以更加方便地调用远程 REST 服务，提高了开发效率，同时也减少了手写 HTTP 请求代码的工作量。

#### feign和okHttp区别
* @FeignClient 和 OkHttp 都可以作为 REST 客户端，但它们在实现方式和用途上有一些区别。
* @FeignClient 是 Spring Cloud 中的一个注解，它是一个声明式的 REST 客户端，它可以通过简单的注解方式来定义和绑定需要调用的 REST 服务接口，并自动通过 Spring Cloud 的服务发现机制获取接口所需的服务地址，同时也提供了负载均衡和容错功能。使用 @FeignClient 可以让我们非常方便地调用其他服务的 REST 接口，而不用手动构建 HTTP 请求和解析 HTTP 响应。
* 而 OkHttp 则是一个强大的 HTTP 客户端库，它可以用于发送 HTTP 请求和接收 HTTP 响应，支持同步和异步请求，并且提供了许多高级功能，如连接池、缓存、重试、HTTPS 等。相比于 @FeignClient，OkHttp 更加灵活和通用，可以用于各种场景的 HTTP 请求和响应，而不仅仅是 REST 服务调用。
* 总的来说，@FeignClient 更加专注于 REST 服务调用的方便性和可维护性，而 OkHttp 更加通用和灵活，适用于各种 HTTP 请求和响应场景。

