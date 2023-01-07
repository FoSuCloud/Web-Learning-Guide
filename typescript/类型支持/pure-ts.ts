function PureTs(val: any){
    return val;
}

const val = PureTs('23')
// 鼠标移动到 const val 可以看到val的类型也只是any,并没有对响应类型进行正确推导
console.log('name:',val)
