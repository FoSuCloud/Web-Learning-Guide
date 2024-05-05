## infer
* infer 关键字是条件类型（conditional types）和映射类型（mapped types）中的一个高级特性，它允许你在`类型推断过程`中`捕获并命名一个类型变量`。这在你需要基于某个类型来推导另一个类型时非常有用。
* 在条件类型表达式中，可以在extends条件语句中使用infer关键字来声明一个待推断的类型
* `简单的理解就是占位符`
1. infer的作用是让ts自己推断
2. infer只能用于extends语句中


#### 基础用法
```typescript
// T是否具有 Y 属性，如果有则返回该属性的类型，否则返回 never
type ExtractPropType<T, Y extends string> = T extends { [K in Y]: infer P } ? P : never;  
  
type MyObject = {  
  a: string;  
  b: number;  
};  
  
type AType = ExtractPropType<MyObject, 'a'>; // string  
type BType = ExtractPropType<MyObject, 'b'>; // number  
type CType = ExtractPropType<MyObject, 'c'>; // never，因为MyObject中没有'c'属性
```

#### 在泛型中使用
```typescript
// T[number]表示取出每个数组元素，使用U捕获数组元素类型
type TupleToUnion<T extends any[]> = T[number] extends infer U ? U : never;  
  
type MyTuple = [string, number, boolean];  
type UnionType = TupleToUnion<MyTuple>; // string | number | boolean
type UnionType1 = TupleToUnion<boolean[]>; // boolean
type UnionType2 = TupleToUnion<Array<boolean | number>>; // number | boolean
```

#### 在条件类型中使用
* 使用U存储每个T[Key]，符合则返回U，否则返回T
```typescript
type ExtractValueType<T, Key extends keyof T> = T[Key] extends (infer U)[] ? U : T[Key];  
  
// 示例对象类型  
type MyObject = {  
  numbers: number[];  
  stringOrNumber: number | string;  
  name: string;  
};  
  
// 使用ExtractValueType来提取属性值的类型，如果属性是数组则提取数组元素的类型  
type NumbersValueType = ExtractValueType<MyObject, 'numbers'>; // number  
type StringOrNumberType = ExtractValueType<MyObject, 'stringOrNumber'>; // number | string  
type NameValueType = ExtractValueType<MyObject, 'name'>; // string  
```
