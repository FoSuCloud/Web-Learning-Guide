
#### QueryWrapper
* QueryWrapper是MyBatis-Plus提供的一个查询构造器，它可以帮助我们更方便地构建复杂的查询条件。
* `QueryWrapper是一个用于构建SQL查询条件的类。它提供了一系列的方法，可以用于构建查询条件，例如eq、like、in等。`

* 假设我们有一个User实体类，它有id、username、age、email等属性，我们想要查询年龄在20到30之间，并且邮箱地址包含"example.com"的用户列表：
```text
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.between("age", 20, 30).like("email", "example.com");
List<User> userList = userMapper.selectList(queryWrapper);
```
* QueryWrapper的常用场景包括：
* 构建复杂的查询条件，例如多个属性的组合查询、模糊查询、范围查询等。
  `进行分页查询、排序查询等高级查询`。
  防止SQL注入攻击，因为QueryWrapper会自动处理SQL参数，避免了手动拼接SQL语句带来的安全问题。
* `没有查询条件，获取全部,使用new QueryWrapper<>()即可`
```text
privilegeMapper.selectList(new QueryWrapper<>());
```


#### QueryWrapper和LambdaQueryWrapper
* 区别：
* QueryWrapper是`基于字符串拼接的方式，需要手动书写列名和表名，容易出现拼接错误和类型错误`。
* LambdaQueryWrapper是基于Lambda表达式的方式，通过Java8的函数式编程风格，`避免了手写字符串的繁琐，减少出错的可能性`，
* `同时支持代码提示，提高了开发效率。`
```text
// Entity实体类，对应数据库中的表
public class User {
    private Long id;
    private String name;
    private Integer age;
    private String email;
}

// 使用QueryWrapper构造查询条件
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.eq("name", "Tom").gt("age", 20).select("id", "name");
List<User> userList = userMapper.selectList(queryWrapper);

// 使用LambdaQueryWrapper构造查询条件
LambdaQueryWrapper<User> lambdaQueryWrapper = new LambdaQueryWrapper<>();
lambdaQueryWrapper.eq(User::getName, "Tom").gt(User::getAge, 20).select(User::getId, User::getName);
List<User> userList = userMapper.selectList(lambdaQueryWrapper);
```

#### 查询值的数据结构转换
```text
List<Role> roles = roleMapper.selectRolesByUserIds(userIds);
return roles.stream().collect(Collectors.toMap(Role::getUserId, role -> role)); 
```
* `collect(Collectors.toMap(key，item))`
* `key表示元素的键，也就是响应的map的key`
* `item表示响应的值`
* `所以相当于生成了一个Map<Integer,Role>的Map键值对`

#### selectOne
* MyBatis是一种流行的持久层框架，它提供了多种方式来执行SQL查询。
* `其中之一是selectOne方法，它可以用于查询单个结果。`

* `selectOne方法的作用是执行SQL查询并返回单个结果。`
* `这个方法接收一个查询语句的ID和一个参数对象，然后返回查询结果。如果查询结果为空，则返回null。`

```text
@Override
public User findByLoginName(String loginName) {
    return baseMapper.selectOne(new QueryWrapper<>(User.builder().loginName(loginName).build()));
}
```

#### eq
* `eq方法用于查询某个字段等于指定值的记录。例如，查询name字段等于"Tom"的用户记录，可以使用如下代码`
```text
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("name", "Tom");
        List<User> userList = userMapper.selectList(queryWrapper);
```

#### ne
* `ne方法用于查询某个字段不等于指定值的记录。例如，查询age字段不等于18的用户记录，可以使用如下代码：`
```text
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.ne("age", 18);
List<User> userList = userMapper.selectList(queryWrapper);
```

#### in
* `in方法用于查询某个字段的值在指定范围内的记录。例如，查询id字段在1、2、3之间的用户记录，可以使用如下代码：`
```text
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.in("id", Arrays.asList(1, 2, 3));
List<User> userList = userMapper.selectList(queryWrapper);
```

#### notin
* `notIn方法用于查询某个字段的值不在指定范围内的记录。例如，查询id字段不在1、2、3之间的用户记录，可以使用如下代码：`
```text
QueryWrapper<User> queryWrapper = new QueryWrapper<>();
queryWrapper.notIn("id", Arrays.asList(1, 2, 3));
List<User> userList = userMapper.selectList(queryWrapper);
```

#### lt
* `左侧小于右侧，其参数分别为要比较的字段和比较的值`
```text
Wrappers.<SystemLoginSession>lambdaQuery()
                        .lt(SystemLoginSession::getLogoutTime, delTime)
```

#### resultType
* 如果 Java 对象只有一个 Long 类型的属性,resultType 设置为 java.lang.Long
* 那么即使使用了select * ，也会只返回对应的Long型的值



