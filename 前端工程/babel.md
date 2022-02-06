## babel
* babel就是先使用ast把代码转换为抽象语法树
* 然后遍历树，生成tokens,最后从ast中生成新的代码
* `babel其实是一个代码编译器,编译器就是将一门语言翻译成另一种语言的程序！`

## babylon
* `babel的代码转换就是使用babylon做的！`

## 创建babel插件
* [参考]("https://github.com/jamiebuilds/babel-handbook")

## babel的工作流程
* [参考]("https://juejin.cn/post/6844903746804137991")
* 解析（parser）=》转换(transform)=》生成(generate)
1. 解析
* `每个js引擎都有自己的ast解析器，例如v8引擎；`
* `而babel是通过babylon实现的；介些过程分为 词法分析和语法分析两个阶段；`
* `词法分析会把字符串形式的代码转换为tokens令牌数组形式，在语法分析过程再转换为ast抽象语法树形式`
2. 转换
* `babel会通过babel-traverse进行深度优先遍历，对节点进行更新，添加，删除等操作！`
3. 生成
* `babel通过babel-generator把转换后的ast抽象语法树再转换回 字符串形式！`
---
* `再转换回字符串形式是因为到达浏览器解析的步骤，浏览器还是只能通过浏览器的js引擎的ast解析器去解析字符串！`

