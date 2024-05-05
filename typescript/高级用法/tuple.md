### tuple
* 在TypeScript中，`元组类型是数组类型的子类型`。这意味着你可以将元组视为具有特定约束的数组，即元素类型和数量都是固定的。


#### 与数组的区别
1. 限制数量
* `元组的元素类型和数量都是固定的。一旦定义了元组的类型，就不能再添加或删除元素，也不能更改元素的类型。`
* 数组的元素类型通常是相同的，但数量可以动态变化。你可以向数组中添加或删除元素，只要它们符合数组的定义类型。
```typescript
type tuple = [number,string]
let tuple1:tuple = [1,'a'];
console.log(tuple1); // [ 1, 'a' ]

// tuple1 = [1,'a','1']; // 不能将类型“[number, string, string]”分配给类型“tuple”。源具有 3 个元素，但目标仅允许 2 个。
```

2. tuple支持多种类型数据
```typescript
type tuple = [number,string]
let tuple1:tuple = [1,'a'];
console.log(tuple1); // [ 1, 'a' ]
```

3. tuple可以和?参数结合
* 设置可选参数
```typescript
type tuple = [number,string,boolean?]
let tuple1:tuple = [1,'a'];
console.log(tuple1); // [ 1, 'a' ]

tuple1 = [1,'a',true];
console.log(tuple1); // [ 1, 'a',true ]
```