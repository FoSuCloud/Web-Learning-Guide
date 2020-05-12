## 页面消息提醒
```
			let i=1
			let timer=setInterval(()=>{
				if(i==5) clearInterval(timer)
				if(i>0) document.title=`消息提醒(${i})页面`
				i++;
			},2000)
```
* `可以直接修改title标签内容`
