## IService
* IService 接口是一种通用的服务接口,`它定义了一些通用的数据访问方法，如查询单个实体、查询多个实体、插入实体、更新实体、删除实体等操作`
* `IService 接口可以被具体的实体服务接口所继承，从而避免了在每个实体服务接口中都定义相同的通用方法。`

* IService 接口一般定义了如下方法：
  T selectById(Serializable id)：根据主键 ID 查询单个实体。
  List<T> selectBatchIds(Collection<? extends Serializable> idList)：根据主键 ID 集合批量查询多个实体。
  List<T> selectList(Wrapper<T> queryWrapper)：根据条件查询多个实体。
  IPage<T> selectPage(IPage<T> page, Wrapper<T> queryWrapper)：根据条件分页查询多个实体。
  int insert(T entity)：插入一条记录。
  int insertBatch(List<T> entityList)：批量插入多条记录。
  int updateById(T entity)：根据主键 ID 更新一条记录。
  int deleteById(Serializable id)：根据主键 ID 删除一条记录。
  int deleteBatchIds(Collection<? extends Serializable> idList)：根据主键 ID 集合批量删除多条记录。









