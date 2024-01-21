"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateSubtractFormat = exports.dateAddFormat = exports.dateFormat = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
function dateFormat(date, format = 'YYYY-MM-DD HH:mm:ss') {
    return (0, dayjs_1.default)(date).format(format);
}
exports.dateFormat = dateFormat;
function dateAddFormat(date, day, format = 'YYYY-MM-DD') {
    return (0, dayjs_1.default)(date).add(day, 'day').format(format);
}
exports.dateAddFormat = dateAddFormat;
function dateSubtractFormat(date, day, format = 'YYYY-MM-DD') {
    return (0, dayjs_1.default)(date).subtract(day, 'day').format(format);
}
exports.dateSubtractFormat = dateSubtractFormat;
