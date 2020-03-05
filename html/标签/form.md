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
