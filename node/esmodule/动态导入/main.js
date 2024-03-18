setTimeout(() => {
    const result  = import('./b.js')
    result.then(res=>{
        console.log(res)
        // [Module: null prototype] {
        //     age: 11,
        //     default: [Function: sayhello],
        //     name: 'alien'
        // }

        console.log(res.age) // 11
        console.log(res.default()) // hello,world
    })
}, 0);
// import() 可以动态使用，加载模块。
// import() 返回一个 Promise ，成功回调 then 中可以获取模块对应的信息。
// name 对应 name 属性，
// age 对应 age 属性，
// default 代表 export default 。
// __esModule 为 es module 的标识。
