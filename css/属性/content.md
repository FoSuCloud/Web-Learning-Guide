## content属性是css3新增的
* `该属性对input、img标签不起作用！`
* `content一般用于配合css的伪类或者伪元素，有四种可能`
1. `none/'':表示不生成任何内容`
2. `attr(name):表示插入标签的属性name的值`
3. `url:使用绝对地址或者相对地址插入一个外部资源`
4. `string:插入字符串`
```
		<h1 id="content" who="我在元素前面~">我是元素！</h1>
		
		#content::before{
			content: attr(who);
			color: red;
		}
		#content::after{
			content: '我在元素后面！';
			color: yellow;
```
