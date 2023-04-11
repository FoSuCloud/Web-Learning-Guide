#### FilterRegistrationBean
* FilterRegistrationBean是Spring提供的一个用于配置Filter的类，
* 它允许开发者以编程方式注册Filter并添加初始化参数、URL模式、执行顺序等相关配置。
* 通过FilterRegistrationBean，`开发者可以更加方便地管理多个Filter，并灵活地控制它们的执行顺序和生命周期。`
* 同时，FilterRegistrationBean还支持条件化配置，根据应用程序上下文中的其他bean存在与否来动态地添加、删除Filter。

* `setOrder`
* setOrder函数是FilterRegistrationBean类中的一个方法，`用于设置Filter在整个Web应用程序中的执行顺序。`
* 执行顺序值越小的Filter，越先被调用；相反，`执行顺序值越大的Filter，则越后被调用。`
* 这个函数的作用就是让开发者可以通过设定不同的执行顺序值，控制多个Filter的执行顺序，从而达到预期的过滤器链效果。
* 需要注意的是，具体的执行顺序并不是绝对的，还受到Servlet容器的实现机制和运行环境的影响。



