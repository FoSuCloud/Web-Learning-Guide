## cookie的保存
* `当cookie中包含有等号、空格、分号等特殊字符时，可能会导致数据丢失、或者不能解析的错误，
  一个较好的解决办法就是：在将cookie值写入客户端浏览器之前，首先进行URLEncode编码，读取cookie时，进行URLDecode即可。`
* `注意！！！cookie的存储默认就是每个键值之间间隔一个空格！`
* `通过document.cookie.split(';')验证！`

## cookie的获取
```js

```
