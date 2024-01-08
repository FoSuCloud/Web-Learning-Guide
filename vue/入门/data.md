#### data更新
* 在 Vue.js 中，当你在事件处理函数或方法中修改数据时，由于 JavaScript 的异步特性，数据的变化和视图的更新之间会有一个延迟。
* 在这个延迟期间，如果数据发生变化，Vue 的响应式系统会跟踪这些变化，并在适当的时候（例如在下一个事件循环迭代或下一个更新周期）重新渲染相关的视图部分。

* `data的更新的确是同步的，但是视图的更新需要等待执行权交给渲染进程才能更新！`

* `下面例子的视图变化是 0 -> 2 -> 4, 中间的1，3没有渲染出来`
* `但是打印的确是1，2，3，4`
```javascript
<template>
  <div id="home">
    <div class="sidebar"></div>
    <div class="content">
      {{msg}}
      <input type="button" @click="change">
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data(){
    return {
      msg: 0
    }
  },
  methods: {
    change() {
      this.msg++;
      console.log(this.msg); // 1
      this.msg++;
      console.log(this.msg); // 2
      // this.msg++ 和 console.log(this.msg) 是在同一上下文中执行的，这意味着它们都在同一个宏任务（macrotask）中。
    // 当执行权回到渲染进程时，Vue 会检查数据的变化并重新渲染视图。
      setTimeout(() => {
        this.msg++;
        console.log(this.msg); //3
        for(let i=0;i<1000000000;i++) {
        }
        this.msg++;
        console.log(this.msg); //4
      }, 0);
    }
  }
};
</script>

```
