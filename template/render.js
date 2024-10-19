"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderRustWsClientFromAsyncApi = renderRustWsClientFromAsyncApi;
const _server_1 = require("./_render/_server");
const main_rs_1 = require("./_render/main.rs");
const README_md_1 = require("./_render/README.md");
const Cargo_toml_1 = require("./_render/Cargo.toml");
/// render rust websocket client from asyncapi
function renderRustWsClientFromAsyncApi(exchangeName, subject) {
    let rendered = [(0, main_rs_1.renderMain)(), (0, README_md_1.renderReadme)(), (0, Cargo_toml_1.renderCargo)(exchangeName, subject.info())];
    rendered = rendered.concat(renderInfo(subject.info()));
    rendered = rendered.concat(renderServers(subject.servers()));
    rendered = rendered.concat(renderChannels(subject.channels()));
    rendered = rendered.concat(renderComponents(subject.components()));
    return rendered;
}
function renderInfo(subject) {
    let rendered = [];
    // let title = 'title';
    // rendered.push(title)
    // let version = 'version';
    // rendered.push(version)
    return rendered;
}
function renderServers(subject) {
    let rendered = [];
    rendered = rendered.concat((0, _server_1.renderRustServers)(subject));
    return rendered;
}
function renderServer(subject) {
    let rendered = [];
    // let url = 'url';
    // rendered.push(url)
    // let protocol = 'protocol';
    // rendered.push(protocol)
    let variables = 'variables';
    rendered = rendered.concat(renderServerVariables(subject.variables()));
    return rendered;
}
function renderServerVariables(subject) {
    let rendered = [];
    for (const [_, variable] of Object.entries(subject)) {
        rendered = rendered.concat(renderServerVariable(variable));
    }
    return rendered;
}
function renderServerVariable(subject) {
    let rendered = [];
    // if (!subject.defaultValue()) {
    //   rendered.push(`subject rendered default value`);
    // }
    return rendered;
}
function renderChannels(subject) {
    let rendered = [];
    for (const [_, channel] of Object.entries(subject)) {
        rendered = rendered.concat(renderChannel(channel));
    }
    return rendered;
}
// TODO set up hte channel converter
function renderChannel(subject) {
    let rendered = [];
    let messages = 'messages';
    if (subject.messages == undefined) {
        rendered = rendered.concat(renderMessages(subject.messages()));
    }
    return rendered;
}
function renderMessages(subject) {
    let rendered = [];
    // if (Object.keys(subject).length === 0) {
    //   rendered.push('rendered messages');
    // }
    return rendered;
}
function renderComponents(subject) {
    let rendered = [];
    // if (Object.keys(subject.messages()).length === 0) {
    //   rendered.push('rendered messages');
    // }
    // if (Object.keys(subject.schemas()).length === 0) {
    //   rendered.push('rendered schemas');
    // }
    return rendered;
}
