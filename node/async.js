"use strict";

var _this = void 0;

function _newArrowCheck(innerThis, boundThis) {
    if (innerThis !== boundThis) {
        throw new TypeError("Cannot instantiate an arrow function");
    }
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}

function _asyncToGenerator(fn) {
    return function () {
        var self = this,
            args = arguments;
        return new Promise(function (resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}

function fn() {
    return _fn.apply(this, arguments);
}

function _fn() {
    _fn = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
            var _this2 = this;

            return regeneratorRuntime.wrap(
                function _callee$(_context) {
                    while (1) {
                        switch ((_context.prev = _context.next)) {
                            case 0:
                                _context.next = 2;
                                return new Promise(
                                    function (res, rej) {
                                        _newArrowCheck(this, _this2);

                                        res(1);
                                    }.bind(this)
                                );

                            case 2:
                                return _context.abrupt("return", 1);

                            case 3:
                            case "end":
                                return _context.stop();
                        }
                    }
                },
                _callee,
                this
            );
        })
    );
    return _fn.apply(this, arguments);
}

fn().then(
    function (res) {
        _newArrowCheck(this, _this);

        console.log(res);
    }.bind(void 0)
);

/**
async function fn(){
	await new Promise((res,rej)=>{
    	res(1)
    })
    return 1
}
fn().then((res)=>{
	console.log(res)
})
 * */
