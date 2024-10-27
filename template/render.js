"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderRustWsClientFromAsyncApi = renderRustWsClientFromAsyncApi;
const _client_1 = require("./src/client/_client");
const README_md_1 = require("./_render/README.md");
const Cargo_toml_1 = require("./_render/Cargo.toml");
const _model_1 = require("./src/model/_model");
const lib_rs_1 = require("./_render/lib.rs");
/// render rust websocket client from asyncapi
async function renderRustWsClientFromAsyncApi(exchangeName, doc) {
    let root = [(0, lib_rs_1.renderLibRs)(doc), (0, README_md_1.renderReadme)(), (0, Cargo_toml_1.renderCargo)(exchangeName, doc.info())];
    let model = await (0, _model_1.renderModels)(doc);
    model = appendFileNamePrefix(model, 'src_model_');
    console.log(`models\n ${model}`);
    let rendered = [];
    // root, model, client
    rendered.push(...root);
    rendered.push(...model);
    rendered.push(...(0, _client_1.renderClientDir)(exchangeName, doc.servers()));
    // in the end we just have to return the dir
    return rendered;
}
/**
 * append prefix to the array of filename
 */
function appendFileNamePrefix(files, prefix) {
    let collection = [];
    for (let file of files) {
        file.filePath = prefix + file.filePath;
        collection.push(file);
    }
    return collection;
}
