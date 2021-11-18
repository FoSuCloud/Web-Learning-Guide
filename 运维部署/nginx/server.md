## rewrite
* rewrite最后一个参数的类型
1. last:相当于Apache里的（L）标记，表示完成rewrite,浏览器地址URL地址不变
2. break:本条规则匹配完成后，终止匹配，不再匹配后面的规则，浏览器地址栏URL地址不变
3. redirect:返回302临时重定向浏览器地址会显示跳转后的URL地址
4. permanent:返回301永久重定向，浏览器地址栏会显示跳转后的URL地址

## location
1. 使用`=`表示完全匹配
...

## root和alias的区别
* [参考]("https://www.cnblogs.com/gaogch/p/10748114.html")
1. alias指定的目录是准确的，也就是location访问的path目录下的文件是直接在alias目录下查找的
* 而root指定的目录是location匹配访问的path目录的上一级目录
* `如果是对非"/"路径使用root,那么需要注意location结尾要带上"/"！！！`
* `另外root不需要包含目录在内，例如"location /other/"指定的目录是"other"，但是root不要包含"other"`
* `目录结构是root=>other; root=>html; other目录和html目录是同级的`
```text
     location /other/ {
       root /usr/share/nginx;
     }

     location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
     }
```
* location最后一个字符一定要是"/"，另外root不能包含路径名称“other”这一块，因为实际查找文件是进行拼接的，
* 例如“/usr/share/nginx/html”+“/”找到“/usr/share/nginx/html/index.html”；而“/usr/share/nginx”+“/other/”找到“/usr/share/nginx/other/index.html”
2. `一般用法是根路径使用root,其他路径使用alias`
```text
     location /other/ {
       alias /usr/share/nginx/other/;
     }

     location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
     }
```
* `并且使用alias可以让location路径和文件目录不一致，保持api名称的可修改性`
* 例如这样
```text
```text
     location /other/ {
       alias /usr/share/nginx/xxx/;
     }

     location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
     }
```
```
