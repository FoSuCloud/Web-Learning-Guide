### ThreadLocal
* 在rt.jar中，有一个很重要的类叫做ThreadLocal，它是Java多线程编程中非常常用的一个类。
* `ThreadLocal是Java中的一个线程本地变量，它能够让每个线程都拥有自己独立的变量副本，而不会受到其他线程的影响。`
* `ThreadLocal通常被用来实现线程安全的单例模式，或者在多线程环境下保存一些线程私有的上下文信息。`

* `ThreadLocal的使用非常简单，只需要创建一个ThreadLocal对象，并重写它的initialValue()方法来返回初始值。`
* `然后，每个线程都可以通过ThreadLocal对象的get()方法获取自己的变量副本，并通过set()方法来更新变量的值。`

* `ThreadLocal的底层实现是通过一个ThreadLocalMap来实现的，每个ThreadLocal对象都对应一个ThreadLocalMap实例。`
* ThreadLocalMap内部使用一个Entry数组来存储线程本地变量的值，而每个Entry对象都包含了一个key和一个value。
* 当线程访问ThreadLocal对象的get()方法时，ThreadLocal会获取当前线程的ThreadLocalMap实例，
* 并根据ThreadLocal对象的hash值来获取对应的Entry对象，然后返回Entry对象的value作为线程本地变量的值。













