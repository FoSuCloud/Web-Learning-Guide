## style

### setProperty
* 为一个style对象设置一个属性值
* `style.setProperty(propertyName, value, priority);`
* `priority表示的是表示一个DOM String,可以用来设置important`
```javascript
document.body.style.setProperty("color","red");// 在style中表现为color:red
document.body.style.setProperty("color","red","important");// 最后在style中表现为color:red !important
```
* `通过这个方法可以在style对象(内联style对象)上设置多个属性值`
