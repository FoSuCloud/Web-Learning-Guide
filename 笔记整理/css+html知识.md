## css命名规范有:BEM(block element modifier)

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

## 标签的target属性
```
	_blank在新窗口中打开。
	_self默认 在相同的框架中打开 (也就是覆盖本页面)
	_parent在父框架集中打开
	_top在整个窗口中打开
	framename 指定框架名称
```
1. `拥有target属性的标签有 a,form`
2. `注意iframe标签没有target属性！！！`

## form 元素的enctype属性
1. `enctype属性在get请求中会被忽略，在post请求中才有效`
2. `application/x-www-form-urlencoded表示会对特殊字符进行转义`
3. `text/plain 以文本的形式进行编码，不会对特殊字符进行编码`
4. `multipart/form-data向服务器发送二进制文件的时候有用，例如提交文件！！！`

## 阻止form标签的提交事件及阻止记录(取消form标签的自动完成功能)
```
			<form action="" onsubmit="return false;" autocomplete="on" >
				<label for="one">name</label><input type="text" id="one"/>
				<label for="two">age</label><input type="text" id="two"/>
				<input type="submit"  value="提交" />
			</form>
```
* `取消提交就给form添加 onsubmit="return false;"`
* `取消form记录之前输入过的内容就用oncomplete="off",开启就用on`

## color属性可以继承，background-color不可以继承(但是背景颜色默认是transparent也就是透明，所以可以看到父元素的背景色)
