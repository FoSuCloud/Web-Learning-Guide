## object
* `object不是键值对对象的意思`
* `任何不是number,string,null,undefined,symbol,boolean等类型的 的类型才是object`
```typescript
let o1:object = {}
o1.a= 1; // Error: Property 'a' does not exist on type 'object'.
```

* `可以给object赋值为array,function,Promise等对象，但是不能调用对应方法，因为会类型校验失败`
```typescript
let o1:object = []
console.log(o1); // []
// o1.push(1); // 类型“object”上不存在属性“push”。

// @ts-ignore
o1.push(1);
console.log(o1); // [1]
```

### 键值对对象的替代品
* 使用高阶类型来代替

* 例如 Record,interface 等
```typescript
let o1:Record<string,number> = {
    name: 1,
    age:2
}
console.log(o1); // { name: 1, age: 2 }
```
```typescript
let o1:{
    name: number,
    age: number
} = {
    name: 1,
    age:2
}
console.log(o1); // { name: 1, age: 2 }
```
