#### explain sql分析

* 例如 `explain analyze select * from table where id = 1;`
* 也就是在select语句之前先添加explain语句，表示对这个sql语句的执行结果分析

* 在执行一个 SQL 查询之前使用 EXPLAIN 语句，`可以获得关于查询执行计划的详细信息`，`包括表的扫描顺序、连接方法、使用的索引等等`。
* 这对于优化查询性能和理解查询的执行方式非常有帮助。

#### explain sql分析网站
* https://explain.dalibo.com/

* 把explain sql分析结果文本全选复制到网站的第二栏json中即可，标题随便写

#### optimizer_trace
* optimizer_trace 可以帮助开发人员和数据库管理员了解查询优化器在执行查询时的决策过程，从而更好地理解和调优查询的性能。
*  https://dev.mysql.com/doc/refman/8.0/en/information-schema-optimizer-trace-table.html

