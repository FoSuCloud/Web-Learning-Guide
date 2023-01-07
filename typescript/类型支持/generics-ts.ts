function PureTs<T>(val: T):T{
    return val;
}

const val = PureTs('3232323')
// 鼠标移动到 const val 可以看到val的类型显示 "3232323" 但是应该是string啊！
console.log('name:',val)

