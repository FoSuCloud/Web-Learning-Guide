## iframe标签
1. iframe默认会有白色边框，可以使用`frameborder,为0表示无边框，为1是默认状态，白色边框`
2. 也可以通过设置iframe的border属性设置边框样式
3. `scrolling属性设置滚动，yes表示显示滚动条，auto表示根据高度决定，no表示不显示滚动条，而且多出来的部分不可以滚动`
4. `iframe标签没有target属性！`

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