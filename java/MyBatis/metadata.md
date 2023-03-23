## metadata


#### IPage
* IPage是Mybatis-Plus框架提供的分页查询的实现方式之一
* `IPage接口是Mybatis-Plus框架中用于分页查询的接口，该接口继承自Mybatis的RowBounds接口，提供了分页查询的基本功能。`

* `当我们在进行分页查询时，Mybatis-Plus框架会将查询结果封装到IPage对象中，IPage对象中除了记录列表之外，`
* `还包含了一些分页相关的元数据，比如当前页码、每页记录数、总记录数等。`


#### getRecords
* `getRecords()是IPage接口中的一个方法，用于获取当前分页查询的记录列表。`
* `而getRecords()方法则是用于获取当前页的记录列表，其返回值类型是List<T>，其中T为查询结果对应的Java实体类。`




















