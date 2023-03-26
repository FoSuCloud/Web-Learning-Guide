## mapper

#### @MapperScan
* `如果Mapper一直找不到，那可能是因为版本比较旧，需要配置`
* `在@SpringBootApplication基础上 增加@MapperScan("com.example.springdemo.mapper"),例如这样指定扫描的文件夹！`


#### BaseMapper
* `BaseMapper是一个抽象类，提供了一些通用的CRUD操作，同时也是Mapper接口的基类，可以帮助开发者更快速地编写Mapper接口。`
* 会提供几个常用的方法
1. insert：插入一条记录到数据库中。
2. deleteById：根据主键删除一条记录。
3. updateById：根据主键更新一条记录。
4. selectById：根据主键查询一条记录。
5. selectList：查询所有记录。
6. selectPage：分页查询记录。

* 一个自定义的Mapper接口可以继承BaseMapper，并添加一些自定义的方法
```java
public interface ModuleMapper extends BaseMapper<Module> {
    // 自定义方法
    List<Module> selectByParentId(Long parentId);
}
```

### xml

#### open='(' separator=',' close=')' 
* open='('：指定了遍历集合时的前缀，这里是一个左括号 '('，表示遍历集合前需要添加的前缀。
* separator=','：指定了遍历集合时的分隔符，这里是一个逗号 ','，表示遍历集合时每个元素之间需要添加的分隔符。
* close=')'：指定了遍历集合时的后缀，这里是一个右括号 ')'，表示遍历集合后需要添加的后缀。
* `类似这样`
```sql
select id from tb_user where id in (1,2,3)
```






