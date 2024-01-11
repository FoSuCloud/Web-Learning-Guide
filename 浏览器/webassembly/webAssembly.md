## webAssembly
* 参考[https://www.ruanyifeng.com/blog/2017/09/asmjs_emscripten.html]("参考")
* webAssembly官网:[https://webassembly.org/getting-started/developers-guide/]("官网")
* 但是官网的教程都是指向mdn
* ["https://mp.weixin.qq.com/s/dEOIArtK6DIfewIva2zLKw"]("webAssembly架构")
* [比较好的教程]("https://mp.weixin.qq.com/s/NA3lXimLOzPe_C91KicysQ")

### rust/c/c++
* 在WebAssembly前端开发中，您可以使用多种语言来编写WebAssembly模块。一般来说，您可以使用C、C++或Rust等语言来编写WebAssembly模块。
* 如果您已经熟悉其中一种语言，那么使用这种语言可能更容易上手。
* 但是，如果您希望选择最适合WebAssembly的语言，我建议您选择Rust。
* Rust是一种系统级编程语言，具有严格的内存安全性和线程安全性，可以在编译时消除许多运行时错误。
* 此外，Rust的编译器非常快，可以生成高效的WebAssembly二进制代码。
* Rust还具有出色的Emscripten和WebAssembly工具链支持，可以轻松地将现有的C和C++代码移植到WebAssembly中。

## webAssembly 是什么
* webAssembly是一种新的编码方式。可以在现代浏览器中运行，是一种`低级的类汇编语言`，具有紧凑的`二进制格式`
* 可以以接近原生的性能运行，`可以为c/c++等语言提供一个编译目标`
* `webAssembly可以和js一起运行，共存，共同在浏览器工作`
* `webAssembly是一个虚拟机标准。webAssembly不仅可以作为cpu的隔离层，也可以作为脚本引擎被嵌入其他语言`

## webAssembly的作用
1. 可以把c,c++转为js语言，从而可以把这些语言的项目搬到前端web中
2. `由于js是弱类型语言，在执行指令前需要先判断变量类型，这削弱了js的执行效率，增加了运算的复杂度；而webassembly 包含了可以预判变量的类型的运算，有效避免了js由于弱类型带来的执行效率低的弱点`

## webAssembly的缺陷
1. webAssembly`不能直接访问DOM和web api`
2. 如果逻辑非常简单，那么建立编译工具链去编写另外一种语言的程序可能得不偿失。`webAssembly最擅长的就是计算！`

## 安装emsdk
* 首先需要有git,xcode,cmake
* `本机没有cmake，所以进行安装`
* `执行brew install cmake`
* 如果提示ruby版本太低，那么按照提示先删除ruby，然后重新安装！
---
* [https://emscripten.org/docs/getting_started/downloads.html]("emsdk安装教程")
* 执行git clone 之前，先创建emsdk文件夹，位置：`~/Library/emsdk`

## 项目参考
* ffmpeg [https://github.com/ffmpegwasm/ffmpeg.wasm]("多媒体")
* [https://github.com/bobbiec/react-wasm-demo]("react-demo")

