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
```c
    // 为演示使用，这里仅仅定义uint16和float32两种数据类型
    typedef unsigned short uint16;      // 无符号short类型
    typedef float float32;                // float浮点数类型
    class CDataView {
    public:
        CArrayBuffer＊ buffer;             // 当前视图要操作的数据源
        // 当前视图要操作数据源buffer中的哪个子区块，使用经典的字节偏移与字节长度表示子
          区块的范围
        int byteOffset;
        int byteLength;
        // 为了简单起见，没做pBuffer非NULL检查及byteOffset / byteLength越界检查
          等测试
        CDataView(CArrayBuffer＊ pBuffer , int byteOffset , int byteLength ) {
          this->buffer = pBuffer;
          this->byteOffset = byteOffset;
          this->byteLength = byteLength;
        }
   // 注意算法，是从CDataView的起始offset位置，然后再加上以Byte为单位的offset
    void setFloat32(int offset, float32 value) {
            memcpy(this->buffer->pData + (this->byteOffset + offset), &value,
    sizeof(float32));
        }
        // 注意算法，是从CDataView的起始offset位置，然后再加上以Byte为单位的offset
        float32 getFloat32(int offset) {
            return ＊((float32＊)(this->buffer->pData + (this->byteOffset + offset)));
        }
        // 注意算法，是从CDataView的起始offset位置，然后再加上以Byte为单位的offset
        void setUint16(int offset, uint16 value) {
            memcpy(this->buffer->pData + (this->byteOffset + offset), &value,
    sizeof(uint16));
        }
        // 注意算法，是从CDataView的起始offset位置，然后再加上以Byte为单位的offset
        uint16 getUint16(int offset) {
            return  ＊((uint16＊)(this->buffer->pData + (this->byteOffset + offset)));
        }
    };
```
* 使用DataView来操作ArrayBuffer对象
```c 
    let buffer: ArrayBuffer = new ArrayBuffer( 16 );
                                    // 创建一个分配16字节的buffer对象

    let view0: DataView = new DataView( buffer );  // 创建第一个DataView对象
    view0.setFloat32( 8, 99.99 );   // 相对0位置偏移8个字节处，写入一个32位浮点数
    view0.setUint16( 8 + 4, 2048 );// 由于32位浮点数占4个字节，因而8+4=12字节
                                        这个为写入一个2字节的非负整数

    // 分别输出在相对0位置偏移8个字节处的32位（4字节）浮点数的值
    // 以及相对0位置偏移12个字节处的16位（2字节）非负整数
    console.log( view0.getFloat32( 8 ) ); // 99.99
    console.log( view0.getUint16( 8 + 4 ) ); // 2048

    // 创建第二个DataView对象，指向buffer偏移8个字节处，字节长度为8
    let view1: DataView = new DataView( buffer, 8, 8 );

    // 下面代码输出的内容应该是和view0输出的内容一样
    console.log( view1.getFloat32( 0 ) );// 99.99
    console.log( view1.getUint16( 4 ) );// 2048
```

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



