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



