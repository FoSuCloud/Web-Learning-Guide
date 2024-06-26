## String
* `和其他基本数据类型不同，String数据不是存储在栈上，而是存储在堆上的！`
* 因为String的长度是可变的，存储的内容是可以无限大的，`但是number,bool,NaN,null,endefied的空间是固定的（number固定存储为64位双精度格式）`
* [参考]("https://blog.csdn.net/xgangzai/article/details/120755491")

### v8处理
* 当我们声明一个字符串时
1. v8内部有一个名为stringTable的`hashmap缓存了所有字符串`，在V8阅读我们的代码，转换抽象语法树时，每遇到一个字符串，会根据其特征换算为一个hash值，插入到hashmap中。
在之后如果遇到了hash值一致的字符串，会优先从里面取出来进行比对，一致的话就不会生成新字符串类。
2. 缓存字符串时，根据字符串不同采取不同hash方式。
* 所以让我们梳理一下，在我们创建字符串的时候，V8会先从内存中（哈希表）查找是否有已经创建的完全一致的字符串，如果存在，直接复用。
* 如果不存在，则开辟一块新的内存空间存进这个字符串，然后把地址赋到变量中。这也是为什么我们不能直接用下标的方式修改字符串: V8中的字符串都是不可变的。

### 编辑字符串
```javascript
    let a= '111'
    a="2"
    console.log('a',a)
```
* `像上面这样编辑字符串，其实会创建一个新的字符串，而不是直接在原始字符串上进行修改。`
* 这是因为在 JavaScript 中，`字符串是不可变的，一旦创建就无法修改。`
* 因此，对字符串进行编辑时，JavaScript 引擎会创建一个新的字符串，将修改后的字符串复制到新的字符串中，然后返回这个新的字符串。
* 原始的字符串并没有被修改，也没有被销毁，它仍然存在于内存中，只是被垃圾回收器标记为可回收状态，等待被回收。

### 相同内容的字符串的地址是相同的
* `因为字符串是通过哈希表实现的，所以相同内容的字符串指向堆内存中的地址的确是相同的`
```javascript
let a="gaha"
let b="gaha"
b="a"
```
* `但是在上面的代码中，我们修改了b,虽然a的地址和b相同`
* `但是由于我们堆字符串进行编辑，会先创建一个新的字符串再去替换旧的字符串，所以修改字符串b仅仅是影响到字符串b自身`
* `并且字符串a还保留了对应的"gaha"的引用，所以这个字符串的引用还存在，没有被内存销毁`

#### String和new String是不同的
* 在JavaScript中，let a = "1"和let a = new String("1")之间有一些重要的区别：
1. 类型：let a = "1"中的a是一个字符串（String）类型的变量，而let a = new String("1")中的a是一个对象（Object）类型的变量。
2. 值比较：虽然let a = "1"和let a = new String("1")看起来很相似，但是它们的值比较是不同的。例如，"1" === new String("1")的结果为false，因为它们的类型不同。如果要比较它们的值，需要使用"1" == new String("1")，这将返回true。
3. 内存管理：使用字符串字面量（"1"）创建字符串变量将使用原始类型数据，它们在内存中是静态的，无法更改。然而，使用new String()创建字符串将创建一个对象，并且对象的值可以随时更改。这可能会导致一些内存管理问题，因为对象必须在不需要时显式地删除。

