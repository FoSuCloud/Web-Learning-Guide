"use strict";

function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }
var id = 0;
function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }
var _a = /*#__PURE__*/_classPrivateFieldLooseKey("a");
var cla = /*#__PURE__*/function () {
    function cla() {
        Object.defineProperty(this, _a, {
            writable: true,
            value: 1
        });
        this.b = 2;
    }
    var _proto = cla.prototype;
    _proto.c = function c() {
        console.log(_classPrivateFieldLooseBase(this, _a)[_a]);
    };
    return cla;
}();
let child = new cla()
child.c() //1
console.log('cla:',new cla().b) // 2

// 所以可以看出。es6进行处理之后，我们无法直接访问到private字段，需要通过public方法才可以获取到的！

console.log('a:',new cla()['__private_0_a']) // 1
// 但是如果我们知道了babel的打包规则，那么还是可以获取到private字段的！

