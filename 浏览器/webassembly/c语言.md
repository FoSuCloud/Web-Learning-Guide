

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
* `如何让c/c++语言编译的时候，一起生成html文件呢？`
* `emcc hello.c -o hello.html;    -o指定编译输出html文件名称`
* [https://developer.mozilla.org/en-US/docs/WebAssembly/C_to_wasm]("使用html")
