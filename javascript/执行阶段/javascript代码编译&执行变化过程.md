## 过程
* 源代码 ---> tokens -> 抽象语法树 ---> 字节码 --->本地代码

1. 源代码
```javascript
function add(a, b) {
    return a + b;
}
```
2. tokens
```javascript
[
    { type: 'KEYWORD', value: 'function' },
    { type: 'IDENTIFIER', value: 'add' },
    { type: 'DELIMITER', value: '(' },
    { type: 'IDENTIFIER', value: 'a' },
    { type: 'DELIMITER', value: ',' },
    { type: 'IDENTIFIER', value: 'b' },
    { type: 'DELIMITER', value: ')' },
    { type: 'DELIMITER', value: '{' },
    { type: 'KEYWORD', value: 'return' },
    { type: 'IDENTIFIER', value: 'a' },
    { type: 'OPERATOR', value: '+' },
    { type: 'IDENTIFIER', value: 'b' },
    { type: 'DELIMITER', value: ';' },
    { type: 'DELIMITER', value: '}' }
]
```
3. 抽象语法树
```javascript
{
    "type": "FunctionDeclaration",
    "name": {
        "type": "Identifier",
        "name": "add"
    },
    "params": [
        {
            "type": "Identifier",
            "name": "a"
        },
        {
            "type": "Identifier",
            "name": "b"
        }
    ],
    "body": {
        "type": "BlockStatement",
        "body": [
            {
                "type": "ReturnStatement",
                "argument": {
                    "type": "BinaryExpression",
                    "operator": "+",
                    "left": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "b"
                    }
                }
            }
        ]
    }
}
```
4. 字节码
* 解释器会将抽象语法树转换为字节码，`字节码是一种中间表示形式`，介于`源代码和机器代码之间`。
```shell
LOAD a
LOAD b
ADD
RETURN
```
5. 机器码 `(本地代码/ Native Code)`
* `JIT 编译器将字节码编译成本地机器代码`
* `是计算机可以直接执行的二进制指令序列`
```shell
0x100a:   add a, b         ; 计算a和b的和
```

