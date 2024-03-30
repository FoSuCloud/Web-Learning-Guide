## render阶段
* 当前浏览器帧有没有剩余时间，react是通过计时来做的
```javascript
if (hasPerformanceNow) {
  const localPerformance = performance;
  getCurrentTime = () => localPerformance.now();
} else {
  const localDate = Date;
  const initialTime = localDate.now();
  getCurrentTime = () => localDate.now() - initialTime;
}
```
* 剩余时间对应的函数是
`export const shouldYield = Scheduler.unstable_shouldYield;`

* 如果当前浏览器帧没有剩余时间，shouldYield会中止循环，直到浏览器有空闲时间后再继续遍历。

 
