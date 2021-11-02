"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showReact = void 0;
require("module-alias/register");
const ejs_1 = __importDefault(require("ejs"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("src/utils");
const app = (0, express_1.default)();
const port = process.env.NODE_ENV === 'development' ? 8080 : 8888;
app.get('/assets(/*)', (req, res) => {
    const html = `${utils_1.publicDir}/${req.url}`;
    res.sendFile(html);
});
app.get('/robots.txt', (_, res) => {
    const html = `${utils_1.publicDir}/robots.txt`;
    res.sendFile(html);
});
app.get('/static(/*)', (req, res) => {
    if ((0, utils_1.isDev)()) {
        const html = `${utils_1.baseDirDev}${req.url}`;
        res.sendFile(html);
    }
    else {
        const html = `${utils_1.baseDirProd}${req.url}`;
        res.sendFile(html);
    }
});
const showReact = async (res) => {
    if (!(0, utils_1.isDev)()) {
        res.sendFile(path_1.default.resolve(utils_1.baseDirProd, 'index.html'));
        return;
    }
    const filePath = path_1.default.resolve(utils_1.publicDir, 'frontend.html');
    const html = await ejs_1.default
        .renderFile(filePath, {
        bundles: [...(0, utils_1.bundles)()],
    })
        .catch((e) => console.error(e));
    res.send(html);
};
exports.showReact = showReact;
app.use(function (_, res) {
    (0, exports.showReact)(res);
});
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
