## 21.display与visibility
* 使用display:none是把元素从视觉角度消失掉，而且元素出现时候占据的位置不会依旧占据，而visibility:none虽然也是会隐藏，但是依旧占据之前的位置
* visibility依旧在文档流中占据位置，可以视为透明度为0，浏览器也会解析这个元素;而使用display:none的话，浏览器不会解析这个元素；
* 而我们使用display:none有一个坏处就是会消耗资源，因为切换display:none会导致浏览器重排，重新绘制及重新排布位置；而visibility:none仅仅是触发重绘，因为位置及元素大小没有改变
