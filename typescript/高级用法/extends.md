## extends
* extends范围限定关键字，可以用于`限定`泛型的数据类型范围
* 也可以用于设置继承的数据类型(例如父子class)
```typescript
// 限制了T的类型必须是string或者number
type IDemo<T extends string | number> = T;
let demo1: IDemo<string> = '1';
let demo2: IDemo<number> = 1;
let demo3: IDemo<boolean> = true; // 'demo3' is assigned a value but never used 类型“boolean”不满足约束“string | number”。
```

#### extends还可以用于做判断
* 用于三元表达式中判断是否继承某个类型
```typescript
type Demo<T> = T extends string ? string : number;
let x: Demo<string> = "hello"; // let x: string
let y: Demo<boolean> = 1; // let y: number
```

```ts
type e1 = string|number extends string?'a':'b'; // "b"
type e2 = string extends string|number?'a':'b'; // "a"
```
