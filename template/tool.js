"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.render = render;
const jsx_runtime_1 = require("react/jsx-runtime");
const generator_react_sdk_1 = require("@asyncapi/generator-react-sdk");
function render(filename, content) {
    return (0, jsx_runtime_1.jsxs)(generator_react_sdk_1.File, { name: filename, children: [" ", content, " "] });
}
