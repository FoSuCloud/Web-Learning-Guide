#### putImageData
* CanvasRenderingContext2D.putImageData() 是 `Canvas 2D API 将数据从已有的 ImageData 对象绘制到位图的方法。`
* 如果提供了一个绘制过的矩形，则只绘制该矩形的像素。此方法不受画布转换矩阵的影响。


#### 语法
```javascript
void ctx.putImageData(imagedata, dx, dy);
void ctx.putImageData(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
```

* dx: 源图像数据在目标画布中的位置偏移量（x 轴方向的偏移量）。
* dy: 源图像数据在目标画布中的位置偏移量（y 轴方向的偏移量）。
* dirtyX: 可选。矩形区域左上角的位置。默认是整个图像数据的左上角（x 坐标）。
* dirtyY: 可选。矩形区域左上角的位置。默认是整个图像数据的左上角（y 坐标）。
* dirtyWidth: 可选。矩形区域的宽度。默认是整个图像数据的宽度。
* dirtyHeight: 可选。矩形区域的高度。默认是整个图像数据的高度。

```javascript
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function putImageData(ctx, imageData, dx, dy,
    dirtyX, dirtyY, dirtyWidth, dirtyHeight) {
  const data = imageData.data;
  const height = imageData.height;
  const width = imageData.width;
  dirtyX = dirtyX || 0;
  dirtyY = dirtyY || 0;
  dirtyWidth = dirtyWidth !== undefined? dirtyWidth: width;
  dirtyHeight = dirtyHeight !== undefined? dirtyHeight: height;
  const limitBottom = dirtyY + dirtyHeight;
  const limitRight = dirtyX + dirtyWidth;
  for (let y = dirtyY; y < limitBottom; y++) {
    for (let x = dirtyX; x < limitRight; x++) {
      const pos = y * width + x;
      // 4个一组，描述像素的rgba值
      ctx.fillStyle =
        `rgba(${data[pos*4+0]}, ${data[pos*4+1]}, ${data[pos*4+2]}, ${data[pos*4+3]/255})`;
      ctx.fillRect(x + dx, y + dy, 1, 1);
    }
  }
}

// Draw content onto the canvas
ctx.fillRect(0, 0, 100, 100);
// Create an ImageData object from it
const imagedata = ctx.getImageData(0, 0, 100, 100);
// use the putImageData function that illustrates how putImageData works
putImageData(ctx, imagedata, 150, 0, 50, 50, 25, 25);
```
