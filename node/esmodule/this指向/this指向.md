#### this指向
CommonJs中`顶层`的`this指向这个模块本身`， 而ESModule中`顶层this`指向`undefined`


#### 但是浏览器环境下不一样，与使用什么模块化规范无关
* 在浏览器中运行的 JavaScript 环境下，`默认情况下，顶层的 this 会指向全局对象 Window`。
* 这是因为浏览器环境中的 JavaScript 默认情况下会将顶层的 this 绑定到全局对象 Window。



