## ast
* ast就是抽象语法树，`近些年的代码检查工具，javascript转译器，代码压缩，css预处理器，pretiier等工具都是基于ast实现的！`
* ast就是一种代码表示方法，根据编程语言的语法呈现源代码结构，每个ast节点对应源代码的一项
* [ast生成网站]("https://astexplorer.net/")
```js
function add(a,b){
	return a+b
}
add(1,2)
```
* `ast表示为`
```json
{
  "type": "Program",
  "start": 0,
  "end": 220,
  "body": [
    {
      "type": "FunctionDeclaration",
      "start": 179,
      "end": 211,
      "id": {
        "type": "Identifier",
        "start": 188,
        "end": 191,
        "name": "add"
      },
      "expression": false,
      "generator": false,
      "async": false,
      "params": [
        {
          "type": "Identifier",
          "start": 192,
          "end": 193,
          "name": "a"
        },
        {
          "type": "Identifier",
          "start": 194,
          "end": 195,
          "name": "b"
        }
      ],
      "body": {
        "type": "BlockStatement",
        "start": 196,
        "end": 211,
        "body": [
          {
            "type": "ReturnStatement",
            "start": 199,
            "end": 209,
            "argument": {
              "type": "BinaryExpression",
              "start": 206,
              "end": 209,
              "left": {
                "type": "Identifier",
                "start": 206,
                "end": 207,
                "name": "a"
              },
              "operator": "+",
              "right": {
                "type": "Identifier",
                "start": 208,
                "end": 209,
                "name": "b"
              }
            }
          }
        ]
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 212,
      "end": 220,
      "expression": {
        "type": "CallExpression",
        "start": 212,
        "end": 220,
        "callee": {
          "type": "Identifier",
          "start": 212,
          "end": 215,
          "name": "add"
        },
        "arguments": [
          {
            "type": "Literal",
            "start": 216,
            "end": 217,
            "value": 1,
            "raw": "1"
          },
          {
            "type": "Literal",
            "start": 218,
            "end": 219,
            "value": 2,
            "raw": "2"
          }
        ],
        "optional": false
      }
    }
  ],
  "sourceType": "module"
}
```
* [参考]("https://juejin.cn/post/6844903725228621832")

## ast生成流程
1. 词法分析，也就是扫描scanner,会读取我们的代码，然后按照既定的规则将代码合并成一个个标识的tokens
* `同时会移除空白符，注释等，最后将代码分割进一个tokens的数组中！`
* `scanner扫描过程会一个一个字母进行扫描，当遇到空白符或者注释的时候就会认为一个代码变量或者关键字扫描完成了`
2. 语法分析,解析器，`将词法分析出来的数组转换为树形的表达形式`
* `同时，验证语法！语法有错则抛出错误！`
* 并且语法分析的时候会`删除一些没有必要的tokens，例如不完整的括号`
* 因此ast语法分析之后的结果可能和词法分析的结果不是百分百匹配的！

## markdown转换为html的一个实现demo
* [自己的git]("https://github.com/FoSuCloud/markdownToHtml-demo")
* `需要注意的是最后的语法分析和ast的步骤不太一致，只做了字符串的合并`

## 编译器
* [参考]("https://github.com/jamiebuilds/the-super-tiny-compiler")

## 创建一门编程语言
* [参考]("https://github.com/ftomassetti/LangSandbox")
* [参考]("https://github.com/jamiebuilds/the-super-tiny-compiler")

