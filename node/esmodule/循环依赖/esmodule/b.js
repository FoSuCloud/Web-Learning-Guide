import { funcA } from './a.js';

console.log('Module B before import:', funcA);

export function funcB() {
    console.log('Function B');
}

funcA();

console.log('Module B after import:', funcA);
