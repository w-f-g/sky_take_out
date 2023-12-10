"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateFormat = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
function dateFormat(date) {
    return (0, dayjs_1.default)(date).format('YYYY-MM-DD HH:mm:ss');
}
exports.dateFormat = dateFormat;
