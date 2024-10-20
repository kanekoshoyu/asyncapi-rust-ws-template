"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderRustWsClientFromAsyncApi = renderRustWsClientFromAsyncApi;
const _client_1 = require("./_render/_client");
const README_md_1 = require("./_render/README.md");
const Cargo_toml_1 = require("./_render/Cargo.toml");
const lib_rs_1 = require("./_render/lib.rs");
/// render rust websocket client from asyncapi
function renderRustWsClientFromAsyncApi(exchangeName, doc) {
    let rendered = [(0, lib_rs_1.renderLibRs)(doc), (0, README_md_1.renderReadme)(), (0, Cargo_toml_1.renderCargo)(exchangeName, doc.info())];
    rendered = rendered.concat((0, _client_1.renderClientDir)(exchangeName, doc.servers()));
    return rendered;
}
