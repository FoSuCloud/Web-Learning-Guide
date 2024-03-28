* 在 Vue 3 中，ref 和 shallowRef 是两个用于创建响应式数据的函数

### ref
* ref 函数用于创建一个包装对象，`将一个普通的 JavaScript 值转换为响应式数据`。
* 这意味着当你修改 ref 返回的对象的值时，`Vue 会追踪这个变化，并触发重新渲染`。例如：
```javascript
import { ref } from 'vue';

const count = ref(0);
console.log(count.value); // 0
count.value++; // 修改值,触发重新渲染
console.log(count.value); // 1
```


### shallowRef
* shallowRef 函数也用于创建响应式数据，但是它对于对象和数组的响应式处理有所不同。
* shallowRef `只会对对象或数组本身进行响应式处理，而不会对其内部的属性或元素进行深层次的响应式转换`。
* 这意味着当你`修改对象或数组的属性或元素时，Vue 不会触发重新渲染`。例如：
```javascript
import { shallowRef } from 'vue';

const obj = { name: 'John', age: 25 };
const shallowObj = shallowRef(obj);
console.log(shallowObj.value.name); // 'John'
shallowObj.value.name = 'Alice'; // 修改属性
console.log(shallowObj.value.name); // 'Alice'，不会触发重新渲染

const arr = [1, 2, 3];
const shallowArr = shallowRef(arr);
console.log(shallowArr.value[0]); // 1
shallowArr.value[0] = 4; // 修改元素
console.log(shallowArr.value[0]); // 4，不会触发重新渲染
```
* `而改为使用ref则可以`

