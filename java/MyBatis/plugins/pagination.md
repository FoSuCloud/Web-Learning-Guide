## pagination


### new Page
* `new Page() 主要用于分页查询。`
* 分页查询是指将一个大数据集合分割成多个小的数据集合进行查询，以提高数据查询效率和用户体验。而 new Page() 则是用来封装分页查询的相关信息的。

* `new Page() 通常需要传入两个参数，一个是当前页码，另一个是每页显示的数据量。`
```text
Page<User> page = new Page<>(1, 10); // 如果总数小于等于10，那么就获取到所有了
```











