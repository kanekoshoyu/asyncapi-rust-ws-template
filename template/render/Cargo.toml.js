"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.render_cargo = render_cargo;
const tool_1 = require("./tool");
function content(info) {
    var _a;
    let name = "name = \"exchange-collection-ws-" + info.title() + "\"\n";
    let version = "version = \"" + info.version() + "\"\n";
    let description = "description = \"" + ((_a = info.description()) === null || _a === void 0 ? void 0 : _a.replace('"', '\"')) + "\"\n";
    let meta = `[package]\n` + name + version + description;
    return meta + `
[dependencies.reqwest]` + `
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
function render_cargo(info) {
    return (0, tool_1.render)("Cargo.toml", content(info));
}
