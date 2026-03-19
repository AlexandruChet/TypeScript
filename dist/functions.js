"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function add(a, b) {
    return a + b;
}
;
const greet = (name) => {
    console.log(`Hello ${name}`);
};
function multiply(a, b) {
    return a * (b || 1);
}
;
function sum(...nums) {
    return nums.reduce((acc, n) => acc + n, 0);
}
;
