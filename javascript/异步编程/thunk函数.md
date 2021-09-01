## js是传值调用
```js
    function thunk(a,b){
      x=11;
      console.log(a,b) // 4 1
    //  因为修改x，但是对应的参数值没有改变，说明js是传值调用
    }
    let x=3;
    thunk(x+1,1)
    console.log(x) // 11, 说明函数里面的确修改了对应的变量x
```

* 使用thunk函数去包装generator函数就可以解决多个异步任务按顺序执行的问题，而不需要使用promise.then.then这种解决办法！
