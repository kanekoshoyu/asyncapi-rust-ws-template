"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderRustWsClientFromAsyncApi = renderRustWsClientFromAsyncApi;
const _server_1 = require("./_render/_server");
const main_rs_1 = require("./_render/main.rs");
const README_md_1 = require("./_render/README.md");
const Cargo_toml_1 = require("./_render/Cargo.toml");
/// render rust websocket client from asyncapi
function renderRustWsClientFromAsyncApi(exchangeName, item) {
    let rendered = [(0, main_rs_1.renderMain)(), (0, README_md_1.renderReadme)(), (0, Cargo_toml_1.renderCargo)(exchangeName, item.info())];
    rendered = rendered.concat(renderInfo(item.info()));
    rendered = rendered.concat(renderServers(item.servers()));
    rendered = rendered.concat(renderChannels(item.channels()));
    rendered = rendered.concat(renderComponents(item.components()));
    return rendered;
}
function renderInfo(item) {
    let rendered = [];
    // let title = 'title';
    // rendered.push(title)
    // let version = 'version';
    // rendered.push(version)
    return rendered;
}
function renderServers(item) {
    let rendered = [];
    rendered = rendered.concat((0, _server_1.renderRustServers)(item));
    return rendered;
}
function renderServer(item) {
    let rendered = [];
    // let url = 'url';
    // rendered.push(url)
    // let protocol = 'protocol';
    // rendered.push(protocol)
    let variables = 'variables';
    rendered = rendered.concat(renderServerVariables(item.variables()));
    return rendered;
}
function renderServerVariables(item) {
    let rendered = [];
    for (const [_, variable] of Object.entries(item)) {
        rendered = rendered.concat(renderServerVariable(variable));
    }
    return rendered;
}
function renderServerVariable(item) {
    let rendered = [];
    // if (!item.defaultValue()) {
    //   rendered.push(`item rendered default value`);
    // }
    return rendered;
}
function renderChannels(channels) {
    let rendered = [];
    for (let channel of channels) {
        console.log(channel);
    }
    return rendered;
}
function renderMessages(item) {
    let rendered = [];
    // if (Object.keys(item).length == 0) {
    //   rendered.push('rendered messages');
    // }
    return rendered;
}
function renderComponents(item) {
    let rendered = [];
    // if (Object.keys(item.messages()).length == 0) {
    //   rendered.push('rendered messages');
    // }
    // if (Object.keys(item.schemas()).length == 0) {
    //   rendered.push('rendered schemas');
    // }
    return rendered;
}
