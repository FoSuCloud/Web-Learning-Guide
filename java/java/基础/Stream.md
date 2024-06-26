## Stream


### collect(Collectors.toMap(...))
* `collect(Collectors.toMap(...))是Java 8 Stream API中提供的一种收集器，用于将流中的元素转换为一个Map对象。`
* 它的使用方式是通过提供键和值的提取函数，将流中的元素转换为一个键值对，并将这些键值对收集到一个Map对象中。

* 具体来说，toMap方法可以接受两个参数：一个`键提取函数`和一个`值提取函数`。
* 这两个函数分别用于从流中的元素中提取键和值。
* 例如，在下面的代码中，toMap方法使用Person对象的getName()方法作为键提取函数
```text
List<Person> people = Arrays.asList(
                new Person("Alice", 20),
                new Person("Bob", 30),
                new Person("Charlie", 40)
        );
        Map<String, Integer> peopleByName = people.stream()
                .collect(Collectors.toMap(Person::getName, Person::getAge));
        // {Bob=30, Alice=20, Charlie=40}
        System.out.println(peopleByName);
```

#### Array转换为Stream
* 在Java 8中，将数组转换为流的操作非常方便，并且可以通过Stream API来对数组进行各种处理和操作。
* 因此，如果您需要对数组进行复杂的数据操作，或者需要利用Stream API提供的各种高级功能`（例如过滤、映射、排序等）`

* `把一些for循环的处理可以改为使用stream去做处理`





