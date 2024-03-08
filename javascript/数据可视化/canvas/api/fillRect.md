#### fillRect
* CanvasRenderingContext2D.fillRect() 是` Canvas 2D API 绘制填充矩形的方法。`
* 当前渲染上下文中的fillStyle 属性决定了对这个矩形对的填充样式。

* `这个方法是直接在画布上绘制填充，并不修改当前路径`

* void ctx.fillRect(x, y, width, height);
* fillRect()方法绘制一个填充了内容的矩形，这个矩形的开始点（左上点）在(x, y) ，它的宽度和高度分别由width 和 height 确定，
* `填充样式由当前的fillStyle 决定。`
```html
<canvas id="canvas"></canvas>
```
```javascript
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'green';
ctx.fillRect(20, 10, 150, 100);
```
* 绘制的矩形左上顶点在 (20, 10)，宽高分别是 150 和 100 像素
