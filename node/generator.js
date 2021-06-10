"use strict";

var _marked = /*#__PURE__*/ regeneratorRuntime.mark(gen);

function gen() {
    return regeneratorRuntime.wrap(function gen$(_context) {
        while (1) {
            switch ((_context.prev = _context.next)) {
                case 0:
                    _context.next = 2;
                    return 1;

                case 2:
                    _context.next = 4;
                    return 3;

                case 4:
                case "end":
                    return _context.stop();
            }
        }
    }, _marked);
}

function gen(){
    return function (){

    }
}

var g = gen();
console.log(g.next().value);
console.log(g.next().value);
console.log(g.next().value);

/**
function * gen(){
	yield 1;
    yield 3;
}
let g=gen()
console.log(g.next().value)
console.log(g.next().value)
console.log(g.next().value)
**/
