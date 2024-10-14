"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.render_cargo = render_cargo;
const tool_1 = require("./tool");
function content(exchangeName, info) {
    var _a;
    return `
[package]
name = "exchange-collection-ws-${exchangeName}"
version = "${info.version()}"
description = "${(_a = info.description()) === null || _a === void 0 ? void 0 : _a.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"

[dependencies.reqwest]
workspace = true

[dependencies.serde]
workspace = true

[dependencies.serde_json]
workspace = true

[dependencies.serde_yaml]
workspace = true

[dependencies.url]
workspace = true
`;
}
function render_cargo(exchangeName, info) {
    return (0, tool_1.render)("Cargo.toml", content(exchangeName, info));
}
