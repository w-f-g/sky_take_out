"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateAddFormat = exports.dateFormat = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
function dateFormat(date, format = 'YYYY-MM-DD HH:mm:ss') {
    return (0, dayjs_1.default)(date).format(format);
}
exports.dateFormat = dateFormat;
function dateAddFormat(date, day) {
    return (0, dayjs_1.default)(date).add(day, 'day').format('YYYY-MM-DD');
}
exports.dateAddFormat = dateAddFormat;
