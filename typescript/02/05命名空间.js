"use strict";
/*
 命名空间:
    在大型项目中，为了避免各种变量命名冲突，将像是的函数,类,接口等放置到命名空间内
 
 命名空间和模块的区别:
    命名空间:也叫作内部模块，主要用于组织代码，避免命名冲突
    模	块:ts的外部模块的简称，侧重代码的复用，一个模块可能有多个命名空间
 */
exports.__esModule = true;
var name_1 = require("./model/name");
var dog = new name_1.B.Dog("柴犬");
dog.eat(); //柴犬正在吃东西
var dog_a = new name_1.A.Dog("嘻嘻");
dog_a.eat(); //命名空间A中的嘻嘻正在吃苹果
