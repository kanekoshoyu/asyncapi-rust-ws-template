"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderReadme = renderReadme;
const tool_1 = require("./tool");
function content() {
    return `
# WebSocket Client
rendered by [async-rust-ws-template](https://github.com/kanekoshoyu/asyncapi-rust-ws-template)
  `;
}
function renderReadme() {
    return (0, tool_1.render)("src_client_README.md", content());
}
