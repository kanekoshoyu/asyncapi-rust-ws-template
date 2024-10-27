"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderCargo = renderCargo;
const tool_1 = require("./tool");
function content(exchangeName, info) {
    var _a;
    return `
[package]
name = "exchange-collection-ws-${exchangeName}"
version = "${info.version()}"
description = "${(_a = info.description()) === null || _a === void 0 ? void 0 : _a.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"

# use workspace when needed
[dependencies]
tokio = { version = "1", features = ["full"] }
tokio-tungstenite = "0.15"
futures = "0.3"
serde = { version = "1", features = ["derive"] }
serde_json = "1.0"

`;
}
function renderCargo(exchangeName, info) {
    return new tool_1.RenderFile("Cargo.toml", content(exchangeName, info));
}
