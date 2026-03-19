"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel["INFO"] = "INFO";
    LogLevel["WARN"] = "WARN";
    LogLevel["ERROR"] = "ERROR";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
class Logger {
    constructor(context) {
        this.context = context;
    }
    format(level, message) {
        const timestamp = new Date().toISOString();
        return `[${timestamp}] [${level}] [${this.context}] ${message}`;
    }
    info(message, data) {
        console.info(this.format(LogLevel.INFO, message), data ?? '');
    }
    warn(message, data) {
        console.warn(this.format(LogLevel.WARN, message), data ?? '');
    }
    error(message, data) {
        console.error(this.format(LogLevel.ERROR, message), data ?? '');
    }
}
exports.Logger = Logger;
