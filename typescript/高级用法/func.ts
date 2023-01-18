// 1.Omit
// 可以看到从接口中排除了 test属性的才是Omit的效果
interface IOmit{
    name: string;
    age: number;
    test: string;
}
type Omit1 = Omit<IOmit, 'test'>
let obj1:Omit1 = {
    name:'1',
    age:1,
}
console.log('Omit1:',obj1)

// 2.Exclude
// 可以看到效果就是从联合类型中排除了'c'
type Exclude1 = Exclude<'a'|'b'|'c', 'c'>
let excludeObj:Exclude1='a'
excludeObj='b'
// TS2322: Type '"c"' is not assignable to type 'Exclude1'.
// excludeObj='c'
console.log('excludeObj:',excludeObj)
