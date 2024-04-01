## Concurrent模式
* [参考]("https://juejin.cn/post/6844903981999718407")
* 什么是Concurrent模式？
* Concurrent是一个特性集合，可以让react应用保持响应，可以根据用户的设备能力和网络情况优雅地调整这个特性集合，包含两个方面的优化：
1. `CPU密集型(cpu-bound)`
* CPU密集型是指Reconcilation阶段的优化。在Concurrent模式下面，Reconcilation可以被中断，让位给高优先级的任务，让应用保持响应。
* CPU密集型的优化对现有的代码保持兼容，几乎没有暴露新的API，主要的影响是废弃了一些生命周期方法
2. `IO密集型(io-bound)`
* 主要优化了react对异步的处理。主要的武器是Supense和useR=Transition
* `Suspense:新的异步数据处理方式`
* `useTransition:提供了一种预渲染的机制。react可以在另外一个分支中预渲染，等待数据到达，然后一次性渲染出来，减少中间的加载状态的显示和页面抖动/闪烁`

### 启用Concurrent模式
* `目前v18版本还不清楚是否直接支持Concurrent模式。我们参考v16的做法`
* Concurrent模式需要安装实验版本来支持一下
```shell
npm install react@experimental react-dom@experimental
# or
yarn add react@experimental react-dom@experimental
```
* 开始 Concurrent 模式:
```jsx
import ReactDOM from 'react-dom';

ReactDOM.createRoot(
  document.getElementById('root')
).render(<App />);
```

### Suspense
* Suspense是什么？首先可以搭配React.lazy实现代码分割
```jsx
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```
* `Suspense搭配React.lazy可以实现路由懒加载 https://blog.csdn.net/weixin_45416217/article/details/120656511`
---
* Suspense翻译成中文就是`等待、悬垂、悬停`,`Suspense是一个react提供的异步处理机制`
* `Suspense 来包裹这些包含异步操作的组件，并给它们提供回退(fallback)。在异步请求期间，会显示这个回退。`
```typescript jsx
function Posts() {
  const posts = useQuery(GET_MY_POSTS)

  return (<div className="posts">
    {posts.map(i => <Post key={i.id} value={i}/>)}
  </div>)
}

function App() {
  return (<div className="app">
    <Suspense fallback={<Loader>Posts Loading...</Loader>}>
      <Posts />
    </Suspense>
  </div>)
}
```

## Suspense的实现原理
* `suspense的实现原理类似于ErrorBoundary捕获下级组件异常的实现`
```typescript jsx
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```
* 以上面的作为一个例子
* `首先会判断是否获取过OtherComponent组件（加载过该js）`
* `如果已经加载过，那么就正常使用（suspense就已经发挥了作用了）`
* `如果还没加载过该js，那么会抛出一个异常，该异常会被react捕获=>react会中断渲染，然后获取fallback的加载组件=>显示加载组件给用户显示避免卡死体验`
* `等待js加载完成就会继续正常渲染！`

## Suspense编排
* 如果页面上有很多 Suspense, 那么多个圈在转，用户体验并不好。
* `SuspenseList, 用来对多个 Suspense 的加载状态进行编排。我们可以根据实际的场景选择加载状态的显示策略。`
```typescript jsx
function Page({ resource }) {
  return (
    <SuspenseList revealOrder="forwards">
      <Suspense fallback={<h2>Loading Foo...</h2>}>
        <Foo resource={resource} />
      </Suspense>
      <Suspense fallback={<h2>Loading Bar...</h2>}>
        <Bar resource={resource} />
      </Suspense>
    </SuspenseList>
  );
}
```
* `那么SuspenseList的revealOrder属性会控制Suspense中的组件加载顺序`
* `revealOrder 表示显示的顺序，它目前有三个可选值: forwards, backwards, together`
* forwards - 由前到后显示。也就说前面的没有加载完成，后面的也不会显示. 即使后面的 Suspense 提前完成异步操作，也需要等待前面的执行完成
  backwards - 和forwards相反, 由后到前依次显示.
  together - 等所有Suspense 加载完成后一起显示
* SuspenseList 还有另外一个属性 tail, 用来控制是否要折叠这些 Suspense，它有三个值 默认值, collapsed, hidden







