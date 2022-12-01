## with
* 不推荐使用with 
* https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/with
https://www.yuque.com/kuitos/gky7yw/mhfzh7
https://www.yuque.com/kuitos/gky7yw/gs4okg

### 介绍
* `with语句用于拓展一个语句的作用域链`
* 语法
```js
with (expression) {
    statement
}
```
* expression: 将给定的表达式添加到在评估语句时使用的作用域链上。表达式周围的括号是必需的。
* statement: 任何语句。要执行多个语句，请使用一个块语句 ({ ... }) 对这些语句进行分组。

#### 限制
* JavaScript 查找某个未使用命名空间的变量时，会通过作用域链来查找，作用域链是跟执行代码的 context 或者包含这个变量的函数有关。
* `'with'语句将某个对象添加到作用域链的顶部`，如果在 statement 中有某个未使用命名空间的变量，跟作用域链中的某个属性同名，则这个变量将指向这个属性值。
* 如果沒有同名的属性，则将拋出ReferenceError异常。
---
* ` 不推荐使用with，在 ECMAScript 5 严格模式中该标签已被禁止。推荐的替代方案是声明一个临时变量来承载你所需要的属性。`
---
* 例子
```html
<!DOCTYPE html>
<html lang="en-us">
<head>
  <meta charset="utf-8" />
</head>
<script>
  class ProxySandbox {
    active() {
      // 沙箱开启
      this.sandboxRunning = true;
    }
    inactive() {
      this.sandboxRunning = false;
    }
    constructor() {
      const rawWindow = window;
      const fakeWindow = {};
      // 代理 fakeWindow
      const proxy = new Proxy(fakeWindow, {
        set: (target, prop, value) => {
          // 只有沙箱开启的时候才操作 fakeWindow
          if (this.sandboxRunning) {
            // 对 window 的赋值，操作与 fakeWindow
            target[prop] = value;
            return true;
          }
        },
        get: (target, prop) => {
          // 先查找 fakeWindow，找不到再寻找 rawWindow
          console.log('target:',target); // 打印这里
          let value = prop in target ? target[prop] : rawWindow[prop];
          return value;
        },
      });
      this.proxy = proxy;
    }
  }
  const windowProxy = new ProxySandbox()
  windowProxy.active();
  with(windowProxy.proxy) {
    debugger;
    console.log(windowProxy);
    const undefined = windowProxy.proxy.undefined;
    const Array = windowProxy.proxy.Array; // 该语句内的Array指向windowProxy.proxy
    // 应用代码，通过 with 确保所有的全局变量的操作实际都是在操作 qiankun 提供的代理对象
    console.log(Array.isArray([1]))
  }
</script>
<body>
</body>
</html>
```


