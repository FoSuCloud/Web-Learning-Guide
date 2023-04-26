## rt.jar
* rt.jar是`Java Runtime Environment（JRE）`的核心库之一，包含了Java SE平台核心类库的所有类、接口和资源。
* 它是Java虚拟机（JVM）启动时必须加载的一个文件，主要用于支持Java程序的运行和开发。

* `rt指的是runtime，也就是Java程序在运行时需要使用的库。`
* rt.jar中包含了众多的类和接口，包括基本数据类型、集合、线程、反射、网络、安全等方面的类和接口，是Java开发过程中最常用的库之一。

* rt.jar只包含Java SE平台核心类库的类和接口，而不包括Java EE平台的相关类和接口。
* 如果需要使用Java EE相关的类和接口，需要在编译和运行程序时额外添加相关的库文件。

#### @Target
* `@Target注解用于指定Java注解的作用目标，可以用于类、接口、字段、方法、构造函数、参数等。`
* 在rt.jar中，`@Target注解主要用于标记其他注解的作用目标，从而为Java编译器和解释器提供相关的元数据信息。`
* `注意是用于标记其他注解的作用目标`


* 对于rt.jar中的@Target注解，它主要用于标记其他注解的作用目标，从而为Java编译器和解释器提供相关的元数据信息。
* 例如，@Target(ElementType.TYPE)表示该注解仅能作用于类、接口或枚举类型，
* `而@Target(ElementType.METHOD)表示该注解仅能作用于方法。`


#### Retention
* `Retention注解是Java提供的元注解之一，用于指定被注解的注解要保留多长时间。`
* 例子
```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.ANNOTATION_TYPE)
public @interface Retention {
    RetentionPolicy value();
}
```
* Retention注解本身也被其他注解@Documented和@Target所注解。

* Retention注解有一个枚举类型的属性value，`它指定了被注解的注解要保留的时间`。Java提供了3种不同的保留时间：
1. RetentionPolicy.SOURCE：被注解的注解只在源代码中保留，编译后不会包含在class文件中。
2. RetentionPolicy.CLASS：被注解的注解在编译时会被保留，并包含在class文件中，但在运行时会被忽略。
3. RetentionPolicy.RUNTIME：`被注解的注解在编译时会被保留，并包含在class文件中，可以在运行时通过反射机制获取`。

#### @Inherited
* @Inherited是Java语言中的一个元注解，它可以被用来标注一个注解，表示这个注解是可继承的。
* 具体来说，如果一个类或者接口被标注了一个带有@Inherited注解的注解，那么这个注解将会被子类继承。
* `也就是说，当子类没有显式地声明这个注解时，它将自动继承父类中的注解。`

* `@Inherited只会继承类和接口上的注解，而不会继承方法上的注解。`
* 另外，`如果父类的注解的@Inherited元注解被删除，那么这个注解也将不再被继承。`

#### 看个例子
* 这个注解接口定义了两个属性值
```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
public @interface RequiredPrivilege {
	boolean checkPriv() default true;
	PrivilegeEnum privilege() default PrivilegeEnum.PRIV_NULL;

}
```
* `通过privilege =的形式可以只设置一个属性值`
```text
@PostMapping(UrlConstant.xxx)
    @RequiredPrivilege(privilege = PrivilegeEnum.PRIV_xx_MODULE)
    public ApiResponse<xx> list(@RequestBody @Validated xx condition) {
        return ApiResponse.success(service.list(condition));
    }
```
* `以用户权限校验为例子，可以在该方法上添加 @RequiredPrivilege 注解，并在方法中使用反射获取该注解的属性值，判断当前用户是否拥有对应的权限。`
```java
public class UserController {
    @RequiredPrivilege(privilege = PrivilegeEnum.USER_MANAGE)
    public void addUser(User user) {
        // 通过反射获取 @RequiredPrivilege 注解的属性值进行权限校验
        RequiredPrivilege annotation = this.getClass().getMethod("addUser", User.class)
            .getAnnotation(RequiredPrivilege.class);
        if (annotation.checkPriv() && !currentUserHasPrivilege(annotation.privilege())) {
            throw new UnauthorizedException("没有操作权限");
        }
        // 校验通过，执行具体的逻辑
        // ...
    }
}
```

#### Optional
* Optional类，提供了一种优雅的方式来处理可能为空（null）的值。Optional可以看作是一个包装器，用于表示某个值有可能为空或不可用。

* Optional可以通过以下方式创建：
1. 使用静态工厂方法Optional.of(value)：返回一个包含给定非空值的Optional对象。如果传入的值为null，则抛出NullPointerException异常。
2. 使用静态工厂方法Optional.empty()：返回一个空的Optional对象。
3. 使用静态工厂方法Optional.ofNullable(value)：返回一个包含给定值的Optional对象，如果传入的值为null，则返回一个空的Optional对象。


Optional类提供了许多有用的方法，例如：
* isPresent()：如果Optional包含一个非空值，则返回true，否则返回false。
* get()：如果Optional包含一个非空值，则返回该值，否则抛出NoSuchElementException异常。
* orElse(T other)：如果Optional包含一个非空值，则返回该值，否则返回指定的默认值other。
* map(Function<? super T, ? extends U> mapper)：如果Optional包含一个非空值，则应用给定的函数mapper并返回结果Optional对象。
* filter(Predicate<? super T> predicate)：如果Optional包含一个非空值并且满足给定的谓词predicate，则返回该Optional对象，否则返回一个空的Optional对象。

* `Optional类可以避免在代码中出现大量的null检查和条件分支，从而使代码更加简洁易读，并提高代码的健壮性和可维护性。`
* `然而，需要注意的是，在某些情况下，过度使用Optional可能会导致代码复杂化和性能问题。`


