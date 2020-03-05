## iframe标签
1. iframe默认会有白色边框，可以使用`frameborder,为0表示无边框，为1是默认状态，白色边框`
2. 也可以通过设置iframe的border属性设置边框样式
3. `scrolling属性设置滚动，yes表示显示滚动条，auto表示根据高度决定，no表示不显示滚动条，而且多出来的部分不可以滚动`
4. `iframe标签没有target属性！`
5. iframe的优点:
```
1. iframe能够把镶嵌进去的网页完全张实出来
2. 如果有多个网页引入该iframe,那么只需要修改iframe的内容就可以，不需要修改每一个页面
3. 如果有加载缓慢的第三方内容如广告等可以用iframe来展现
```
6. iframe的缺点
```
1. 会产生很多页面，不容易管理
2. iframe的内容无法被搜索引擎找到，SEO不好
3. 移动设备无法完全显示iframe,兼容性差
4. iframe会增加服务器的http请求。
```
7. `所以现在很多都是用ajax请求来代替iframe`
