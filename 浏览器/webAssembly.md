## webAssembly
* 参考[https://www.ruanyifeng.com/blog/2017/09/asmjs_emscripten.html]("参考")
* webAssembly官网:[https://webassembly.org/getting-started/developers-guide/]("官网")
* 但是官网的教程都是指向mdn
* ["https://mp.weixin.qq.com/s/dEOIArtK6DIfewIva2zLKw"]("webAssembly架构")

## webAssembly是什么
* webAssembly是一种新的编码方式。可以在现代浏览器中运行，是一种`低级的类汇编语言`，具有紧凑的`二进制格式`
* 可以以接近原生的性能运行，`可以为c/c++等语言提供一个编译目标`
* `webAssembly可以和js一起运行，共存，共同在浏览器工作`

## webAssembly的作用
1. 可以把c,c++转为js语言，从而可以把这些语言的项目搬到前端web中


## 安装emsdk
* 首先需要有git,xcode,cmake
* `本机没有cmake，所以进行安装`
* `执行brew install cmake`
* 如果提示ruby版本太低，那么按照提示先删除ruby，然后重新安装！
---
* [https://emscripten.org/docs/getting_started/downloads.html]("emsdk安装教程")
* 执行git clone 之前，先创建emsdk文件夹，位置：`~/Library/emsdk`


## c语言
* 首先创建一个文件夹，然后`touch hello.cc`生成c文件
* 对应的c代码：   
```markdown
#include <iostream>

int main() {
  std::cout << "Hello World!" << std::endl;
}
```
* 执行以下命令
```javascript
emcc hello.cc //emcc命令用于编译源码，默认生成a.out.wasm 和 a.out.js
node a.out.js // 执行out.js
```
* `最后打印hello world`

## c语言->html
* [https://developer.mozilla.org/en-US/docs/WebAssembly/C_to_wasm]("使用html")

## 项目参考
* ffmpeg [https://github.com/ffmpegwasm/ffmpeg.wasm]("多媒体")
* [https://github.com/bobbiec/react-wasm-demo]("react-demo")
