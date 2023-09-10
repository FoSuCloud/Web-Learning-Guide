## pgsql
* `psql是PostgreSQL的一个命令行交互式客户端工具`，它具有非常丰富的功能，类似于Oracle的命令行工具sqlplus。

#### 连接数据库
* `psql -U <用户名> -h <主机名> -d <数据库名>`

* 没有密码 ，不指定用户名和密码连接数据库 `pgsql`

#### 断开psql客户端
* '\q' 或者 ctrl + d组合键

#### 常用命令

* `\d` 列出当前数据库中的所有表和视图和序列
```shell
run=# \d
                               List of relations
 Schema |                        Name                        |   Type   | Owner 
--------+----------------------------------------------------+----------+-------
 public | flyway_schema_history                              | table    | root
 public | qrtz_blob_triggers                                 | table    | root
 public | qrtz_calendars                                     | table    | root
 public | qrtz_cron_triggers                                 | table    | root
 public | qrtz_fired_triggers                                | table    | root
 ...
```

* `\d <表名>` 列出指定表的详细信息
```shell
wf-run=# \d qrtz_locks
                      Table "public.qrtz_locks"
   Column   |          Type          | Collation | Nullable | Default 
------------+------------------------+-----------+----------+---------
 sched_name | character varying(120) |           | not null | 
 lock_name  | character varying(40)  |           | not null | 
Indexes:
    "qrtz_locks_pkey" PRIMARY KEY, btree (sched_name, lock_name)
```

* `\dn`查看当前数据库中的所有模式
```shell
wf-run=# \dn
List of schemas
  Name  | Owner 
--------+-------
 public | root
(1 row)
```


