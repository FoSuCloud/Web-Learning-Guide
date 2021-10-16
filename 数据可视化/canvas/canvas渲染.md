## 绘图技术介绍
1、文档对象模型(DOM)
* 使用非常便捷，提供了点击、拖拽等多种事件；但是DOM会带来较大的开销，影响渲染速度
2、可缩放矢量图形(SVG)
* SVG图形同样也是DOM的一部分，是专门为高保真的大型图形而设计的
* SVG在处理大图形的时候具有较大的优势，但是多图形（DOM元素多）处理同样会有渲染速度慢的问题
3、HTML5画布(Canvas)
* HTML5推出的canvas画布为开发者提供了对渲染的更细粒度的控制能力，代价是必须手动管理每一个细节
* Canvas和SVG恰好相反，Canvas擅长管理多图形
4、WebGL
* 可以通过canvas的3d上下文访问，也支持2d
* 是上述渲染技术中唯一针对3d渲染优化的技术
* 可以利用用户设备提供的硬件图形加速
* 但是浏览器兼容性差
---
* DOM和SVG是最抽象的（描述元素属性和事件处理程序），却是效率最低的
* 而canvas和webGL是抽象最少的，却是效率最高的
---
* 要了解为什么canvas和webGL比DOM的渲染性能高，我们需要先了解渲染流程。

## 渲染风格
* 为了解释画布的功能，我们先介绍计算机图形学中的两种渲染风格：立即模式和保留模式
* 立即模式的代表是canvas；保留模式的代表是DOM

### 立即模式
* 在立即模式下，客户端调用图形绘制函数，立即导致绘制一个图形对象
* 无论画布的哪些部分被更新，每次都必须重新绘制整个画布，除非客户端已经进行了优化。（为画布维护一个对象模型）

### 保留模式
* 在保留模式下，客户端调用不会立即显示图形对象，而是会更新内部的对象模型
* 然后再去渲染图形对象



绘制可以将布局树中的元素分解为多个层。将内容提升到GPU上的层（而不是CPU上的主线程）可以提高绘制和重新绘制性能。有一些特定的属性和元素可以实例化一个层，
包括`<video>和<canvas>`

## 浏览器渲染流程
* https://blog.csdn.net/rogeryi/article/details/78106130?spm=1001.2014.3001.5501



## canvas渲染路径
* canvas绘制指令 -> js引擎 -> 浏览器接口 -> 图形库
* "旧版本的chrome使用skia图形库处理屏幕绘制"
* `浏览器的性能损耗主要在js引擎中，因为需要浏览器解释执行`

* `硬件加速，就是使用 GPU 来进行合成，绘制仍然使用 CPU 来完成。`
```text
硬件合成的优势体现在三个方面： 
1、在涉及大量像素的绘图和合成操作中，在 GPU 上合成页面层可以获得比 CPU 高得多的效率（在速度和功耗方面）。
2、硬件专为这些类型的工作负载而设计。 对于已经在 GPU 上的内容（例如加速视频、Canvas2D 或 WebGL），不需要昂贵的回读。
3、CPU 和 GPU 之间的并行性，可以同时运行以创建高效的图形管道。
```

合成加速渲染架构

https://blog.csdn.net/lihui130135/article/details/21134931
https://blog.csdn.net/milado_nju/article/details/7293012


## canvas渲染
* https://blog.logrocket.com/when-to-use-html5s-canvas-ce992b100ee8/
* https://www.kirupa.com/html5/dom_vs_canvas.htm

本质上，Canvas 是一个位图渲染引擎，绘图是最终的，不能调整大小。此外，在 Canvas 上绘制的对象不是网页 DOM 的一部分。

https://developer.chrome.com/blog/renderingng/
https://developer.chrome.com/blog/renderingng-architecture/
https://developer.chrome.com/blog/renderingng-data-structures/

光栅和绘图通常发生在同一个线程上，因为它们都依赖 GPU 资源，并且很难可靠地多线程使用 GPU
https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction

https://www.chromium.org/developers/design-documents/displaying-a-web-page-in-chrome


* [一个像素的一生]("https://yrq110.me/post/front-end/chromium-rendering-pipeline-step-by-step/")

## “硬件加速”和“GPU 加速”
https://developer.chrome.com/blog/hardware-accelerated-animations/
* `硬件加速样式是利用 GPU（图形处理单元）而不是 CPU（中央处理单元）来呈现视觉样式的样式。这是因为 GPU 可以比 CPU 更快地在网页上呈现视觉变化。`



