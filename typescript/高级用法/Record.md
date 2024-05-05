### Record
* Record类型的使用场景包括但不限于以下几种情况：
1. 枚举类型的映射：在实际开发中，经常需要将枚举类型映射到具体的值。例如，有一个表示不同颜色的枚举类型，可以使用Record类型将每种颜色映射到特定的值或对象。
2. 动态键名或不确定数量属性的情况：Record类型允许你`定义一个对象`，其中属性的键可以是任何类型（通常是字符串或字符串的联合类型），而属性的值必须是相同的类型。这在处理`动态键名`或`不确定数量属性`的对象时非常有用。
3. 类型安全的优势：使用TypeScript的Record类型可以带来类型安全的优势。`通过指定键和值的类型，可以确保在代码中使用该类型时不会出现类型错误`，从而提高代码的健壮性和可维护性。

#### 实现
```ts
type Record1<T extends keyof any, K> = {
  [P in T]: K
}

let p: Record1<string, number>={
  name:1
}
```

```typescript
// 定义一个用户信息的类型  
type UserInfo = {  
    name: string;  
    age: number;  
    email: string;  
};  

// 使用 Record 定义一个 User 类型，其中键是字符串类型，值是 UserInfo 类型  
type User = Record<string, UserInfo>;  

// 创建一个符合 User 类型的对象  
const users: User = {  
"user1": { name: "Alice", age: 30, email: "alice@example.com" },  
"user2": { name: "Bob", age: 25, email: "bob@example.com" },  
// ... 可以添加更多用户  
};  

// 访问用户信息  
console.log(users["user1"].name); // 输出 "Alice"
```

```typescript
type UserInfo = {  
    name: string;  
    age: number;  
    email: string;  
};  
// 使用 Record 定义一个 PersonRecord 类型，其中键是 'Alice' | 'Bob'，值是 UserInfo 类型  
type PersonRecord = Record<'Alice' | 'Bob', UserInfo>;  
  
// 创建一个符合 PersonRecord 类型的对象  
const people: PersonRecord = {  
  Alice: { name: "Alice", age: 30, email: "alice@example.com" },  
  Bob: { name: "Bob", age: 25, email: "bob@example.com" },  
  // 注意：这里不能添加除了 'Alice' 和 'Bob' 以外的键，因为它们的类型已经被限制为 'Alice' | 'Bob'  
};  
  
// 访问用户信息  
console.log(people.Alice.name); // 输出 "Alice"
```