## grep

* 假设一个有效的电话号码必须满足以下两种格式： (xxx) xxx-xxxx 或 xxx-xxx-xxxx。（x 表示一个数字）
```text
grep -E '[0-9]{3}-[0-9]{3}-[0-9]{4}' file.txt
```
* `grep -E ,其中-E就是进行正则匹配(mac用-E,windows用-P)， 后面的file.txt表示匹配对应文件的内容`

## 跟在log文件后面筛选
* kubectl logs xxx -n namespace | grep '404'
