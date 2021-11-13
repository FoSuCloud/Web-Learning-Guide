## rewrite
* rewrite最后一个参数的类型
1. last:相当于Apache里的（L）标记，表示完成rewrite,浏览器地址URL地址不变
2. break:本条规则匹配完成后，终止匹配，不再匹配后面的规则，浏览器地址栏URL地址不变
3. redirect:返回302临时重定向浏览器地址会显示跳转后的URL地址
4. permanent:返回301永久重定向，浏览器地址栏会显示跳转后的URL地址

