### ApplicationContext
* 它负责管理Spring应用程序中的所有Bean。
* `在Spring中，Bean是应用程序中的核心组件，它们通常是应用程序中的Java对象，被配置、创建、管理和组装在一起，以满足应用程序的需求。`

#### getBean
* `getBean方法是一个非常重要的方法。它的作用是从ApplicationContext中获取一个已经存在的Bean对象。`
1. 获取Bean对象：`getBean方法通过Bean的名称或类型来获取已经存在的Bean对象。`
* 在ApplicationContext中，Bean对象可以通过名称或类型来唯一标识。

2. 创建Bean对象：`如果ApplicationContext中不存在指定名称或类型的Bean对象， getBean方法可以自动创建该对象并返回。`
* 在这种情况下，getBean方法会根据Bean的定义， 使用反射或其他方式创建一个新的Bean对象，并将其添加到ApplicationContext中。

3. 注入依赖：`在获取Bean对象时，getBean方法会自动注入该Bean对象所依赖的其他Bean对象。`
* 在Spring中，依赖注入是一种重要的实现方式，它可以将应用程序中的各个组件连接起来。













