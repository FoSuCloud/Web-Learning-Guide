### any

#### any的缺点
1. 导致与他相关的类型都变成any
```typescript
let a:any = 1;
let obj ={
    name: 'zhangsan',
    age: a
}
/***
鼠标悬停在obj上，可以看到obj的类型是：
let obj: {
    name: string;
    age: any;
}
 */
```
2. 类型校验无效
* 结果我们把 age 作为`number/string/boolean`都成功了 , `实际上应该报错提示的，因为a就是一个number.`
```typescript
let a:any = 1;
type Person1 = {
    name: string,
    age: number
}
let obj1: Person1 ={
    name: 'zhangsan',
    age: a
}
console.log(obj1) 

type Person2 = {
    name: string,
    age: string
}
let obj2: Person2 ={
    name: 'zhangsan',
    age: a
}
console.log(obj2) 

type Person3 = {
    name: string,
    age: boolean
}
let obj3: Person3 ={
    name: 'zhangsan',
    age: a
}
console.log(obj3) 
```

3. 作为函数返回值，可以不经过校验
```typescript
function testA():any{
    return 1
}
console.log(testA()) // 1
// console.log(testA().) // 可以看到.没有提示
// console.log(testA().toUpperCase()) // TypeError: testA(...).toUpperCase is not a function
```
