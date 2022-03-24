## nextTick
* nextTick实现原理
* [参考]("https://zhuanlan.zhihu.com/p/174396758")

## 每次数据变化都会立即重新渲染？
* 不会。会在本次事件循环结束后再执行渲染。因为要把当前的任务执行完毕了，再去执行渲染
* `代码执行使用的是js引擎，而渲染使用的是渲染引擎，两者是互斥的！`
* `微任务先执行，再执行DOM渲染，再执行宏任务`
```vue
<template>
  <div>{{msg}}</div>
</template>

<script>
 for(let i=0;i<10000;i++){
   msg=i;
 }
</script>
```
* `那么msg不会渲染1000次，只会再最后一次执行！`
