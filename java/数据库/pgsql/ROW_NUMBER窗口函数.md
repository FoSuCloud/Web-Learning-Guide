
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
* `ROW_NUMBER() OVER(PARTITION BY ... ORDER BY ...) AS "row_num":`
* ROW_NUMBER()是一个窗口函数，`用于为每一行分配一个唯一的序号`。
* OVER(PARTITION BY REL."merge_id" ORDER BY CLUE."title"): 这定义了窗口函数的范围和顺序。
* `它表示对于每个不同的merge_id，序号会重新开始计数`，`并且序号是基于CLUE."title"字段的值进行排序的。`
* 结果集中的每一行都会有一个名为row_num的列，其值为该行在每个merge_id分组内的序号。

