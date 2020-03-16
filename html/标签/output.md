## <output>标签通过 for 属性关联一个或多个表单的值。
```
<form oninput="x.value=parseInt(a.value)+parseInt(b.value)">
			    0<input type="range" id="a" value="50"> 100
			   + <input type="number" id="b" value="50">
			   =<output name="x" for="a b"></output>
			</form>
```
* `如果多个表单则用空格隔开`
* `在form中使用oninput监听两个input框的变化，然后设置输出框的值`