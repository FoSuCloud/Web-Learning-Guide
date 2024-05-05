### unknown
* unknown `就是在你需要确定类型的时候再确认。类似于延迟确认`
```typescript
let a: unknown = 'aaa';
// a. 不会提示任何类型的方法
const b = a as string;
console.log(b); // aaa
// b. 会提示string类型的方法
```

