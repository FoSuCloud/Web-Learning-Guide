
function _curry(fn, ...oldArgs) {
    // params是新参数
    return function(...params){
        // oldArgs 第一次不会传递，后面就作为旧参数
        const _args = [...oldArgs, ...params];
        // 绑定this， 如果调用没结束就继续返回 _curry对应的函数
        const func = _curry.call(this, fn, ..._args);
        // 调用-toString
        func.toString = function(){
            return fn.apply(this, _args);
        }
        return func;
    }
}

const add = _curry(function(a,b,c,d,e){
    return a+b+c+d+e
})

console.log(add(1,2)(3)(4,5).toString())

