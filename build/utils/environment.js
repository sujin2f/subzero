"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bundles = exports.baseDirProd = exports.baseDirDev = exports.publicDir = exports.rootDir = exports.isDev = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const isDev = () => process.env.NODE_ENV === 'development';
exports.isDev = isDev;
exports.rootDir = path_1.default.resolve(__dirname, '../../');
exports.publicDir = path_1.default.resolve(exports.rootDir, 'public');
exports.baseDirDev = path_1.default.resolve(exports.rootDir, 'dist');
exports.baseDirProd = path_1.default.resolve(exports.rootDir, 'build', 'frontend');
const bundles = () => {
    const dir = (0, exports.isDev)()
        ? path_1.default.resolve(exports.baseDirDev, 'static', 'js')
        : path_1.default.resolve(exports.baseDirProd, 'static', 'js');
    return fs_1.default.readdirSync(dir).filter((file) => !file.endsWith('.map'));
};
exports.bundles = bundles;
