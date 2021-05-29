## 访问对象属性
* 访问对象属性有两种方法，一种是点表示法，一种是括号表示法。
* 点表示法会尝试使用该`确切的名称`在对象上查找属性，找不到就返回undefined
```javascript
    // 1. 找到了，虽然作用域有同名的变量，但是查找的是名称！而不是变量对应的值
    let obj={
        color:1,
        2:'let color'
    }
    let color=2; // 没有用～
    console.log(obj.color) // 1

    // 2. 没找到，返回undefined
    let obj2={}
    console.log(obj2.color) // undefined

    // 3. 点表达法从左往右！
    const colorConfig = {
        red: true,
        blue: false,
        green: true,
        black: true,
        yellow: false,
    }
    
    const colors = ["pink", "red", "blue"]
    // 刚开始colorConfig.colors查找属性colors，得到undefined，然后还去执行了undefined[1]，所以就报错
    console.log(colorConfig.colors[1]) // TypeError: Cannot read property '1' of undefined
```
* 括号表示法，内容区域是字符串，对应对象的属性
```javascript
        const colorConfig = {
            red: true,
            blue: false,
            green: true,
            black: true,
            yellow: false,
        }

        const colors = ["pink", "red", "blue"]
        console.log(colorConfig[colors[1]]) // true
```
