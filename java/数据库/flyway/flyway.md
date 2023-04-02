## flyway
* `数据库版本管理工具`

#### 添加flyway
```xml
<dependency>
  <groupId>org.flywaydb</groupId>
  <artifactId>flyway-core</artifactId>
</dependency>
```
- 初始化表结构，需要操作数据库，因此`引入数据库驱动以及数据源依赖（这里用 spring-boot-starter-data-jdbc）`

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-jdbc</artifactId>
</dependency>

<dependency>
  <groupId>mysql</groupId>
  <artifactId>mysql-connector-java</artifactId>
  <scope>runtime</scope>
</dependency>
```

1. Flyway 默认会去读取 `classpath:db/migration`，可以通过 `spring.flyway.locations` 去指定自定义路径，
* 多个路径使用半角英文逗号分隔，内部资源使用 `classpath:`，外部资源使用 `file:`
2. 如果项目初期没有数据库文件，但是又引用了 Flyway，那么在项目启动的时候，Flyway 会去检查是否存在 SQL 文件，
* 此时你需要将这个检查关闭，`spring.flyway.check-location = false`
3. Flyway 会在项目初次启动的时候创建一张名为 `flyway_schema_history` 的表，`在这张表里记录数据库脚本执行的历史记录`，
* 当然，你可以通过 `spring.flyway.table` 去修改这个值
4. Flyway 执行的 SQL 脚本必须遵循一种命名规则，`V<VERSION>__<NAME>.sql` 首先是 `V` ，然后是版本号，
* 如果版本号有多个数字，使用`_`分隔，比如`1_0`、`1_1`，版本号的后面是 2 个下划线，最后是 SQL 脚本的名称。
**这里需要注意：V 开头的只会执行一次，下次项目启动不会执行，也不可以修改原始文件，否则项目启动会报错，
* 如果需要对 V 开头的脚本做修改，需要清空`flyway_schema_history`表，
* 如果有个 SQL 脚本需要在每次启动的时候都执行，那么将 V 改为 `R` 开头即可**
5. Flyway `默认情况下会去清空原始库，再重新执行 SQL 脚本`，这在生产环境下是不可取的，
* 因此需要将这个配置关闭，`spring.flyway.clean-disabled = true`

#### Flyway会按照以下顺序执行SQL脚本
V1__initial.sql
V2__add_column.sql
V3__add_table.sql
R__populate_table.sql
* 其中，`V表示版本控制脚本，R表示重复脚本。`
* Flyway会根据脚本名称的前缀来确定脚本的类型。例如，以V1__开头的脚本是版本控制脚本，以R__开头的脚本是重复脚本。Flyway会按照版本号的顺序执行版本控制脚本，并在每个版本之间执行重复脚本。如果Flyway检测到重复脚本，则不会再次执行它们。如果Flyway检测到版本控制脚本，则会执行它们，并将版本号记录在Flyway的元数据表中。










