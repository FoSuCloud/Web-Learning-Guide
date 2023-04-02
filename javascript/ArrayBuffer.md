## ArrayBuffer
* `在讲ArrayBuffer之前，我们需要知道js中的数组是基于对象实现的，而对象是基于哈希表实现的`
* `并且js中的数组由于最底层是哈希表实现的，所以可以存储任何类型的数据，可以不限制数组长度，可以动态增加长度`

* `但是由于数组可以容纳任意类型数据，可以动态增长这两个特点，进而导致运行效率低下，以及占据更多的内存消耗`
* `为了更好的性能，js引入了ArrayBuffer，DataView,TypedArery这三个对象，来解决这个问题`

#### ArrayBuffer
```c
    // 无符号8bit的char类型被重定义为Byte类型，和TS中的type关键字作用类似
    typedef unsigned char Byte;
    class CArrayBuffer
    {
    public:
        // 构造函数
        CArrayBuffer(int byteLength = 8)
        {
          this->_byteLength = byteLength;
          // 分配byteLength个字节的内存
          this->pData = new Byte[byteLength];
        }
        // 析构函数，用于释放分配的pData字节数组内存
        ～CArrayBuffer()
        {
          if (this->pData ! = NULL)
          {
              delete[ ] this->pData;
              this->pData = NULL;
          }
        }
        // 使用public方法获取已分配内存的字节长度
        // 由于使用了private且没有提供set方法，因而byteLength是只读的
              // 这意味着你只能在构造函数中才能设置要分配的内存字节长度
       // 这也意味着一旦在new之后，再也没机会增加内存容量了
      int byteLength()
    {
          return this->_byteLength;
      }
    public:
      Byte ＊pData;          // ArrayBuffer对象指向已经分配的内存字节数组的首地址
    private:
      int _byteLength;     // 当前内存字节数组的字节数
    };
```
* `ArrayBuffer对象持有一个以字节byte为单位的固定长度的内存区域，这个内存区域可以通过ArrayBuffer对象的属性byteLength来获取`
* 还有两点
1. `无法动态地增减ArrayBuffer的内存区块大小（参看CArrayBuffer类中的byteLength方法注释）`
2. `无法直接操作ArrayBuffer的内存区块中的数据（参看CArrayBuffer类，没有提供直接操作pData的方法）。`

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

#### Float32Array
* 在某些情况下，可能只需要读写一种类型的数据，`例如在WebGL中，我们仅需要浮点数表示的顶点坐标信息，如果用DataView操作略显麻烦。`
* 此时`不如提供专用的二进制浮点数操作视图，这样更加方便。这就是JS/TS中Float32Array的用途所在。`



