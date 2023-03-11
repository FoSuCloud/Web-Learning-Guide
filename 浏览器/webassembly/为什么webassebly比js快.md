## webAssembly比javascript在浏览器执行快？
WebAssembly 是一种新的编程语言，可以在浏览器中直接运行。它的执行速度比 JavaScript 快，主要有以下几个原因：
* 高效的字节码格式：WebAssembly 采用二进制格式，相比于 JavaScript 代码文本格式更加紧凑和高效，因此可以更快地加载和解析。同时，WebAssembly 的指令集也经过了高度优化，可以更快地执行。
* 更接近底层硬件：WebAssembly 的指令集设计得更加接近底层硬件，因此可以更加高效地利用计算机的资源。
* 预编译：WebAssembly 的代码可以预先编译成二进制格式，而不需要在浏览器中进行解释执行。这样可以大大减少代码执行的时间。
* 没有类型转换和垃圾回收开销：JavaScript 需要进行类型转换和垃圾回收等操作，这些操作会带来一定的性能开销。而 WebAssembly 的类型是静态类型，不需要进行类型转换，也不需要进行垃圾回收。
* 综上所述，WebAssembly 比 JavaScript 在浏览器中执行更快，但是这并不意味着 JavaScript 不重要。WebAssembly 和 JavaScript 都有各自的优势和用途，可以根据具体情况选择使用。


### WebAssembly 执行引擎
* 独立的 WebAssembly 执行引擎是一种专门用于解释和执行 WebAssembly 模块的软件组件。WebAssembly 执行引擎通常由浏览器厂商或其他开发者提供，它们可以作为 WebAssembly 模块的运行时环境，负责加载、解释和执行 WebAssembly 模块中的指令。
* WebAssembly 执行引擎是独立于浏览器的 JavaScript 引擎的。这意味着它们可以独立于 JavaScript 引擎工作，并且可以提供更高效的执行性能。WebAssembly 执行引擎通常采用预编译技术，将 WebAssembly 模块编译成机器码，以便更快地执行。
* 常见的 WebAssembly 执行引擎包括：
1. V8 WebAssembly 执行引擎，由 Google 开发，用于 Chrome 浏览器。
2. SpiderMonkey WebAssembly 执行引擎，由 Mozilla 开发，用于 Firefox 浏览器。
3. ChakraCore WebAssembly 执行引擎，由 Microsoft 开发，用于 Edge 浏览器。

* WebAssembly 执行引擎的出现，使得 WebAssembly 可以在浏览器之外的环境中运行，例如服务器端、桌面应用程序等。同时，WebAssembly 执行引擎还可以与其他编程语言的运行时环境集成，例如 Node.js、Python 等，以便更好地支持跨语言开发和协作。

#### webAssembly和js用的不是同一个引擎
* 由于 WebAssembly 和 JavaScript 在浏览器中经常一起使用，它们之间也可以互相调用。在这种情况下，JavaScript 引擎 V8 会负责执行 JavaScript 代码，而 WebAssembly 执行引擎会负责执行 WebAssembly 模块。这样，WebAssembly 和 JavaScript 可以相互配合，实现更加高效的应用程序。

### WebAssembly 的指令集和javscripti指令集区别
* WebAssembly 的指令集确实设计得更加接近底层硬件，这是因为它被设计成一种“低级别”语言，与现代计算机的体系结构更加匹配。* WebAssembly 的指令集是基于堆栈架构的，它使用的指令集是固定的，指令的操作码非常简单，可以在编译时高度优化，因此可以更加高效地利用计算机的资源。
* 相比之下，JavaScript 是一种“高级别”语言，它使用的指令集相对更加抽象，它的语法和语义都被设计为与人类语言更加接近，这样使得 JavaScript 更加易于学习和使用，但在某些情况下也可能导致效率不高的问题。JavaScript 代码需要在运行时被解释执行，这个解释过程可能会消耗一定的时间和资源，并且在某些情况下会出现性能瓶颈。
