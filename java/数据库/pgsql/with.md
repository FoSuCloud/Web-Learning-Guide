```sql
SELECT   
    REL."merge_id",  
    CLUE."title"  
FROM (  
    SELECT   
        REL."merge_id",  
        CLUE."title",  
        ROW_NUMBER() OVER(PARTITION BY REL."merge_id" ORDER BY CLUE."title") AS "row_num"  
    FROM  
        rel_id REL  
        LEFT JOIN tb_c CLUE ON REL."clue_id" = CLUE."id"   
    WHERE  
        REL."merge_id" in (775,774)   
) subquery  
WHERE "row_num" <= 5;
```

```sql
WITH Ranked AS ( ... ):
```
* 这是一个公共表达式（Common Table Expression, CTE）。`它允许你在一个查询中创建一个临时的结果集`，并在后续的查询中引用它。
这个CTE名为Ranked。
