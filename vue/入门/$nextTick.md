#### $nextTick
* 数据的变化到 DOM 的重新渲染是一个异步过程，发生在下一个 tick(`执行权从js线程转移到渲染GUI，也就是下一帧`)。
* 这就是我们平时在开发的过程中，比如从服务端接口去获取数据的时候，
* 数据做了修改，如果我们的某些方法去依赖了`数据修改后的 DOM 变化，我们就必须在 nextTick 后执行`。
```vue
getData(res).then(()=>{
  this.xxx = res.data
  this.$nextTick(() => {
    // 这里我们可以获取变化后的 DOM
  })
})
```


* 这里的for循环是把 赋值操作放在$nextTick回调函数中
* 也就是放在vue内部维护的 回调函数队列中，确保是在dom更新后执行，并且不会被批量更新合并成一次变更 (`但是因为变更都在同一帧内完成，看起来就是从1到99999直接完成`)
```vue
<template>
  <div id="home">
    <div class="sidebar"></div>
    <div class="content">
      {{msg}}
      <div class="header">Header2</div>
      <input type="button" @click="change">
      <a href="/abc">abc</a>
      <a href="/home">home</a>
      <router-link to="/abc">router-view abc</router-link>
      <router-link to="/home">router-view home</router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: "home",

  data(){
    return {
      msg: '1'
    }
  },
  methods: {
    change() {
      for(let i=0;i<10000000;i++){
        this.$nextTick(()=>{
          this.msg=i;
        });
      }
    }
  }
};
</script>


```
