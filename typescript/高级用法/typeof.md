### typeof

#### 类型查询
* 使用 typeof 关键字，你可以`查询一个变量或属性的类型`。这在条件语句或类型守卫中特别有用。
* 类型判断
```typescript
let x: number | string = 1;   // 此时走number分支
  
if (typeof x === 'string') {  
    // 在这个分支中，x 被认为是 string 类型  
    //@ts-ignore
    console.log(x.toUpperCase());  
} else {  
    // 在这个分支中，x 被认为是 number 类型  
    console.log(x.toFixed(2));   // 1.00
}
```

#### 类型别名
* 复制类型为另外一个名称
```typescript
let obj = {
    name: "Tom",
    age: 25
}

type other = typeof obj;// 鼠标悬停在other上会显示 { name: string, age: number }
let obj2: other = {
    name: "Jerry",
    age: 30
}
console.log(obj2); 
```

