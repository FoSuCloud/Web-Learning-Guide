## swc

* node-swc/src/binding.js
* `nativeBinding = require('./swc.darwin-x64.node')`
`const { bundle, minify, minifySync, parse, parseSync, parseFileSync, parseFile, print, printSync, transform, transformSync, transformFile, transformFileSync, getTargetTriple, initCustomTraceSubscriber, Compiler } = nativeBinding`
* `swc.darwin-x64.node是swc的rust代码的编译产物，是二进制的机器码`

