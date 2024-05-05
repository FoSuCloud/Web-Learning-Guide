### never
* never的主要作用就是充当typescript的类型系统的bottom type

#### 当函数永远不可能有返回的时候
```typescript
function testA():never{
    throw new Error('error')
}
console.log(testA())  // Error: error
```
```typescript
function error():never{
    throw new Error('error')
}
function failure():never{
    throw error()
}
console.log(failure())  // Error: error
```
```typescript
function failure():never{
    while(true){}
}
console.log(failure())  
```

