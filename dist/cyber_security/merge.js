"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsafeMerge = unsafeMerge;
function unsafeMerge(target, source) {
    for (const key in source) {
        target[key] = source[key];
    }
}
