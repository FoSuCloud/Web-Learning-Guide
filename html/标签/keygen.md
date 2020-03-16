```
			<form action="" method="post">
			   <label>Name: <input name="usr_name"></label>
			   <label>Key: <keygen name="security"/></label>
			   <input type="submit" value="提交">
			</form>
```
* keygen标签是html5新支持的，但是支持度不足
* `所以一般不会去使用`
* `keygen用于提供一种可靠的用户验证方法，相当于密钥生成对`
* `在提交表单时。会生成两个键，一个是私钥，一个是公钥`
* `私钥存储在客户端，公钥发送给服务器，公钥可用于校验用户的客户端整数`