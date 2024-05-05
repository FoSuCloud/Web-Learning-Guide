## interface

#### 定义对象
```typescript
interface IObj {
    a: string;
    b: number
}
let obj:IObj = {
    a: '1',
    b:33
}
console.log(obj) // { a: '1', b: 33 }
```

#### 取出对象的属性值
```typescript
console.log(obj['a']) // 1
```

#### interface可以继承type
```typescript
interface IObj {
    a: string;
    b: number
}
let obj:IObj = {
    a: '1',
    b:33
}
console.log(obj['a']) // 1
type ObjParent = {
    c:boolean
}
interface IObj2 extends IObj,ObjParent {
    d: string
}
let obj2:IObj2 = {
    a: '1',
    b:33,
    c: true,
    d: '4'
}
console.log(obj2) // { a: '1', b: 33, c: true, d: '4' }
```

#### 设置可选和readonly
```typescript
interface IObj {
    a?: string;
    readonly b:  number
}
let obj: IObj = {
    b: 1
}
console.log(obj.b); // 1

obj.b = 2; // Cannot assign to 'b' because it is a read-only property.
```

#### 可拓展的key
* 类似于Record设置可选key
```typescript
interface IObj {
    a?: string;
    readonly b:  number,
    [key: string]: string | number | undefined; // 表示任意属性的key, value类型为string或number或undefined
}
let obj: IObj = {
    b: 1, // 这个有ts代码提示
    c: 'aaa',
    d: 111
}
console.log(obj.b); // 1
console.log(obj.c); // aaa
```

#### implements 实现
```typescript
interface Demo {
    render: ()=> any;
    componentDidMount: ()=> void;
}
class TypeDemo implements Demo {
    render() {
        return 'render';
    }
    componentDidMount() {
        console.log('componentDidMount');
    }
}
console.log(new TypeDemo().render()) // render
```
