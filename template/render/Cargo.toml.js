"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.render_cargo = render_cargo;
const tool_1 = require("./tool");
function content() {
    return `
[package]
name = "exchange-collection-ws-{{ asyncapi.info().title() }}"
version = "{{ asyncapi.info().version() }}"
edition = "2021"

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
function render_cargo() {
    return (0, tool_1.render)("Cargo.toml", content());
}
