### keyof
* keyof 是一个关键字，用于`获取对象类型中所有属性名的集合`，形成一个字符串字面量类型的联合（union）。这个联合类型包含了`该对象类型中所有属性的键名。`

#### 字面量联合类型使用keyof
* TypeScript 实际上会尝试将其解释为一个对象，并获取该对象的键。但是，由于 Demo1 不是一个对象类型，TypeScript 会将其视为一个具有数值字面量类型的值（在这种情况下是 1 | 2 | 3 | 4）。

* 当你尝试对一个非对象类型的值使用 keyof 时，TypeScript 会尝试将该值`隐式地转换为一个对象。`
* 对于原始值（如数字、字符串、布尔值等），这种隐式转换会导致它们被当作`包装对象`（wrapper objects）来处理。
* 对于数字类型，这会导致你得到一个类似于 `Number` 对象的属性集合，这些属性包括 toString、toFixed 等方法。
```typescript
type Demo1 = 1 | 2 | 3 | 4;
type Demo2 = keyof Demo1; // type Demo2 = "toString" | "toFixed" | "toExponential" | "toPrecision" | "valueOf" | "toLocaleString"
```

#### keyof获取对象的所有键
```typescript
type Person ={
    name: string,
    age: number
}
type Demo2 = keyof Person; // "name" | "age"
let name1: Demo2 = "name";
console.log(name1); // name
let age: Demo2 = "age";
console.log(age); // age

// let other: Demo2 = "other"; // 报错： 不能将类型“"other"”分配给类型“keyof Person”。
```

#### 使用 keyof 进行类型安全的属性访问
* `使用extends keyof Type 来设置属性限定`
```typescript
type Person = {  
  name: string;  
  age: number;  
  location: string;  
};  
// K 限定为Person的属性
function getProperty<T extends Person, K extends keyof Person>(obj:T, key: K): T[K] {  
  return obj[key];
}

const person: Person = {
  name: "Alice",
  age: 30,
  location: "New York",
};

const name1 = getProperty(person, "name");
const age1 = getProperty(person, "age");
const location1 = getProperty(person, "location");
// const num = getProperty(person, "num"); // 类型“"num"”的参数不能赋给类型“keyof Person”的参数
console.log(name1); // Alice
console.log(age1); // 30
console.log(location1); // New York
```

#### 使用 keyof 进行映射类型
* `Partial 就是使用keyof实现的`
```typescript
type Partial1<T> = {
  [P in keyof T]?: T[P]
}
type Person = {  
  name: string;  
  age: number;  
  location: string;  
};  
type p1 = Partial1<Person>;
const a: p1 = { name: 'Jack' };
console.log(a); // { name: 'Jack' }
const b: p1 = { age: 32 };
console.log(b); // { age: 32 }
```

