## enum
* 在TypeScript中，枚举（enum）类型被设计为不仅仅是一个对象的集合，而且它还允许我们通过名字来访问这些值（比如 Color.Blue），
* 并且同时也能够通过值反向查找对应的名字（比如 Color[0]）。这种`双向映射`的特性是枚举的一个核心优势，
* 使得它在某些场景（如`调试、日志记录、或者需要将值映射回其可读名称时`）特别有用。

#### 双向映射例子
```typescript
enum Color{
    Blue,
    Red,
    Green
}
console.log(Color.Blue); // 0
console.log(Color[0]); // Blue
```
* 编译后的代码
```javascript
var Color;
(function (Color) {
    Color[Color["Blue"] = 0] = "Blue";
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
})(Color || (Color = {}));
console.log(Color.Blue); // 0
console.log(Color[0]); // Blue
```

#### enum值不是数字那么没有双向映射
```typescript
enum Color{
    Blue = 'a',
    Red = 'b',
    Green = 3
}
console.log(Color.Blue); // a

// 双向映射
console.log(Color[0]); // undefined
console.log(Color[3]); // Green

// 如果不是数字，那么没有双向映射
//@ts-ignore
console.log(Color.a); // undefined
```

* 注意看编译后的代码是这样的,只有enum值为number的才有双向映射
```javascript
var Color;
(function (Color) {
    Color["Blue"] = "a";
    Color["Red"] = "b";
    Color[Color["Green"] = 3] = "Green";
})(Color || (Color = {}));
console.log(Color.Blue); // a
// 双向映射
console.log(Color[0]); // undefined
console.log(Color[3]); // Green
//@ts-ignore
console.log(Color.a); // Blue
```

