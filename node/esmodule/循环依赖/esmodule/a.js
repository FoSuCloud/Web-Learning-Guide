import { funcB } from './b.js';

console.log('Module A before import:', funcB);

export function funcA() {
    console.log('Function A');
}

funcB();

console.log('Module A after import:', funcB);
