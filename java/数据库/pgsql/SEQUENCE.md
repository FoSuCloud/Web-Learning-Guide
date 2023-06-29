## SEQUENCE
* PostgreSQL 中的 SEQUENCE 是一种特殊的数据库对象，用于生成唯一的序列值。它可以被用作表的主键、外键或其他需要唯一标识符的字段。

* SEQUENCE 是一种自增的计数器，它生成一个连续的序列。每次从 SEQUENCE 中获取一个值时，它会自动递增并返回一个新的唯一值。 
* SEQUENCE 的主要作用是生成唯一的、连续的数字标识符，用于确保数据的唯一性和一致性。

```pgsql
CREATE SEQUENCE sequence_name
    [ INCREMENT [ BY ] increment ]
    [ MINVALUE minvalue | NO MINVALUE ]
    [ MAXVALUE maxvalue | NO MAXVALUE ]
    [ START [ WITH ] start ]
    [ RESTART [ [ WITH ] restart ] ]
    [ CACHE cache ]
    [ [ NO ] CYCLE ]
    [ OWNED BY { table_name.column_name | NONE } ]

```
其中，关键参数的含义如下：
sequence_name：SEQUENCE 的名称。
INCREMENT [ BY ] increment：指定每次递增的值，默认为 1。
MINVALUE minvalue | NO MINVALUE：指定最小值或禁用最小值限制。
MAXVALUE maxvalue | NO MAXVALUE：指定最大值或禁用最大值限制。
START [ WITH ] start：指定 SEQUENCE 的起始值，默认为 1。
RESTART [ [ WITH ] restart ]：重新启动 SEQUENCE，并指定新的起始值。
CACHE cache：指定 SEQUENCE 预取的值的数量，以提高性能。
[ NO ] CYCLE：定义 SEQUENCE 是否循环，即在达到最大值后是否重新开始。
OWNED BY { table_name.column_name | NONE }：指定 SEQUENCE 所属的表和列。

#### 设置自增字段
```pgsql
DROP SEQUENCE IF EXISTS public.seq_hotel;
CREATE SEQUENCE public.seq_hotel
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    START 1
    CACHE 1
    NO CYCLE;
ALTER SEQUENCE "public"."seq_hotel" OWNER TO "a";

DROP TABLE IF EXISTS "public"."tb_hotel";
CREATE TABLE "public"."tb_hotel"
(
    "id"               int4 NOT NULL DEFAULT nextval('seq_hotel'::regclass),
```
* `给字段id配置SEQUENCE： seq_hotel，使得id可以自增`





