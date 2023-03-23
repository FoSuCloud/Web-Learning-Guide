### spring framework
* Spring Framework 是一个全面的应用程序开发框架，它提供了一个广泛的功能集，
* 包括依赖注入、AOP、数据访问、事务管理、Web 开发等等。
* Spring Framework 的目标是提供一种灵活、模块化、可扩展的框架，以便开发者可以选择自己需要的组件和功能。
* Spring Framework 还有一个非常活跃的社区，提供了许多扩展和插件，使得开发者可以更加便捷地使用 Spring 框架。



* Spring Boot 是一个基于 Spring Framework 的快速开发框架，它提供了一种简单的方式来创建独立的、生产级别的 Spring 应用程序。
* Spring Boot 的设计目标是尽量减少开发者的配置工作，通过自动配置和约定优于配置的原则来简化应用程序的搭建和开发。
* Spring Boot 提供了许多内置功能，例如嵌入式 Web 服务器、自动配置、监控、安全性等等，
* 使得开发者可以更加专注于业务逻辑而不是框架的配置。

* 因此，可以认为 `Spring Boot 是 Spring Framework 的一种扩展`，它是为了简化 Spring 应用程序的开发而产生的。
* 在使用 Spring Boot 时，开发者可以选择使用 Spring Framework 的各种组件和功能，以满足自己的需求。

#### validation
* org.springframework.validation.Validator接口中定义了validate方法，用于执行验证操作
* `当我们实现Validator接口并重写validate方法时，Spring框架会自动调用该方法来进行验证`。
* validate方法有两个参数：要验证的对象target和一个Errors对象，其中target表示需要验证的对象，Errors对象用于存储验证失败时的错误信息。
```java
public class UserValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return User.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "username", "username.required", "Username is required.");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "password", "password.required", "Password is required.");
        // 根据需要编写其他的校验逻辑
    }
}
```
```java
@Controller
public class UserController {

    @Autowired
    private UserValidator userValidator;

    @RequestMapping(value = "/user", method = RequestMethod.POST)
    public String saveUser(@ModelAttribute("user") User user, BindingResult result) {
        userValidator.validate(user, result);
        if (result.hasErrors()) {
            // 处理错误信息
            return "error";
        } else {
            // 保存用户信息
            return "success";
        }
    }
}
```
* 我们在Controller中注入了UserValidator校验器，并在saveUser方法中调用validate方法来验证User对象，如果有错误信息，则返回error视图，否则返回success视图。
* 在validate方法执行时，Spring框架会自动调用UserValidator中的validate方法进行校验。

#### @Transactional
* @Transactional 是 Spring 框架中用于实现事务管理的注解。使用该注解可以将方法或类标记为事务性的，
* `从而实现自动化的事务管理，无需手动处理事务的提交和回滚等操作。`

* 当一个方法被标记为 @Transactional 后，`Spring 会在该方法执行之前创建一个事务，并在方法执行结束后提交或回滚事务`。
* `如果在方法执行过程中抛出了异常，则会触发事务的回滚操作，从而保证数据的一致性`。

* @Transactional 注解提供了多个属性，可以用来指定事务的传播行为、隔离级别、超时时间、只读属性等。以下是 @Transactional 注解的一些常用属性：
  propagation：指定事务的传播行为，默认值为 REQUIRED。具体取值可以参考 Propagation 枚举类型。
  isolation：指定事务的隔离级别，默认值为 DEFAULT。具体取值可以参考 Isolation 枚举类型。
  timeout：指定事务的超时时间，单位为秒，默认值为 -1，表示不设置超时时间。
  readOnly：指定事务是否为只读事务，默认值为 false，表示事务可以进行读写操作。
  rollbackFor：指定哪些异常会触发事务回滚，默认值为 {}，表示不进行回滚。可以指定多个异常类型。

#### @Transactional(rollbackFor = Exception.class)
* @Transactional(rollbackFor = Exception.class) 表示将事务设置为在发生任何 Exception 异常时都进行回滚操作。
* 如果方法执行过程中抛出了 Exception 异常，则事务会被回滚，也就是说之前执行的 SQL 语句都会被撤销，从而保证数据的一致性。
* `需要注意的是，只有当异常被抛出到事务管理器时，事务才会被回滚。`
* `如果异常被捕获并在方法内部处理了，那么事务就不会被回滚。(内部throw)`
* 因此，在编写带有事务的代码时，需要仔细考虑异常处理的方式，以确保事务能够得到正确的管理和回滚。


