## ArrayBuffer
* `在讲ArrayBuffer之前，我们需要知道js中的数组是基于对象实现的，而对象是基于哈希表实现的`
* `并且js中的数组由于最底层是哈希表实现的，所以可以存储任何类型的数据，可以不限制数组长度，可以动态增加长度`

* `但是由于数组可以容纳任意类型数据，可以动态增长这两个特点，进而导致运行效率低下，以及占据更多的内存消耗`
* `为了更好的性能，js引入了ArrayBuffer，DataView,TypedArery这三个对象，来解决这个问题`
* 但是DataView 也可以不限制数据类型

* ArrayBuffer 对象用来表示`通用的、固定长度的原始二进制数据缓冲区`。
* `ArrayBuffer 不能直接操作`，而是要通过 TypeArray 类型数组对象 或 DataView 数据视图对象 来操作，
* 它们会将缓冲区中的`数据表示为特定的格式，并通过这些格式来读写缓冲区的内容`。

* `读取`：
    通过 `FileReader` 将文件转化为 `ArrayBuffer` 数据
* `写入`：
  * 通过 TypeArray 对象进行操作
  * 通过 DataView 对象进行操作

#### Array的缺陷
* JavaScript 中的 Array 类型，因为有很多功能，而且是不限制类型的，`或者它还可能是稀疏的`。
* 而如果你从 XHR、FileAPI、Canvas 等各种地方，`读取了一大串字节流`，
* 如果用 JavaScript 里的 Array 去存储，不仅浪费空间且低效。

#### ArrayBuffer和Array的区别
1. `ArrayBuffer 初始化后固定大小`，数组可以自由增减
2. ArrayBuffer 没有 push 和 pop 等数组的方法
3. `ArrayBuffer 只能读`不能写，写要借助 TypeArray 或 DataView

* `ArrayBuffer 简单来说就是一片内存`，但是你不能（也不方便）直接访问它里面的字节。
* 而`要访问 ArrayBuffer，则需要通过 TypedArray/DataView 类型引用`。
* （可以将 ArrayBuffer 理解为 带类型的高速数组 或 类型化数组）

#### 使用场景：
1. 上传图片读取和显示
2. Canvas 转换图片下载
3. WebGL


#### DataView
* `ArrayBuffer不能直接被操作，而是要通过JS/TS中的DataView对象或类型数组对象（TypedArray）来操作，`
* `它们会将缓冲区中的数据（相当于CArrayBuffer中的pData指针指向的内存区块）表示为特定格式，并通过这些格式来读写缓冲区的内容。`


#### TypeArray
* ArrayBuffer `作为内存区域`，可以存放多种类型的数据。不同数据有不同的存储方式，这就叫做视图。
目前，JavaScript 提供以下类型的视图：
Int8Array：8 位有符号整数，长度 1 个字节。
Uint8Array：8 位无符号整数，长度 1 个字节。
Int16Array：16 位有符号整数，长度 2 个字节。
Uint16Array：16 位无符号整数，长度 2 个字节。
Int32Array：32 位有符号整数，长度 4 个字节。
Uint32Array：32 位无符号整数，长度 4 个字节。
Float32Array：32 位浮点数，长度 4 个字节。
Float64Array：64 位浮点数，长度 8 个字节。

* 每一种视图都有一个 BYTES_PER_ELEMENT 常数，表示这种数据类型占据的字节数。
```javascript
Int8Array.BYTES_PER_ELEMENT;
// 1
Uint8Array.BYTES_PER_ELEMENT;
// 1
```

* 在某些情况下，可能只需要读写一种类型的数据，`例如在WebGL中，我们仅需要浮点数表示的顶点坐标信息，如果用DataView操作略显麻烦。`
* 此时`不如提供专用的二进制浮点数操作视图，这样更加方便。这就是JS/TS中Float32Array的用途所在。`

#### Blob
1. Blob 是表示不可变、原始数据的二进制对象。
2. Blob 对象通常用于`存储文件或大块的二进制数据`，例如`图像、音频、视频`等。
3. 它`不提供直接访问二进制数据`的方法，而是提供了一些操作文件数据的方法，
* 比如`创建 Blob URL`、`将 Blob 对象转换为 ArrayBuffer` 等。
4. 主要用于处理`文件上传`、`下载`以及与 `File API` 结合使用，用于`操作用户文件系统中的文件`。

