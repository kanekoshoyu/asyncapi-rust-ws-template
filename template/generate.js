"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAsyncApi = generateAsyncApi;
const validate_1 = require("./validate");
function generateAsyncApi(subject) {
    let generated = [];
    generated = generated.concat(generateInfo(subject.info()));
    generated = generated.concat(generateServers(subject.servers()));
    generated = generated.concat(generateChannels(subject.channels()));
    generated = generated.concat(generateComponents(subject.components()));
    return generated;
}
function generateInfo(subject) {
    let generated = [];
    let title = 'title';
    generated.push(title);
    let version = 'version';
    generated.push(version);
    return generated;
}
function generateServers(subject) {
    let generated = [];
    for (const [serverName, server] of Object.entries(subject)) {
        generated = generated.concat(generateServer(server));
    }
    return generated;
}
function generateServer(subject) {
    let generated = [];
    let url = 'url';
    generated.push(url);
    let protocol = 'protocol';
    generated.push(protocol);
    let variables = 'variables';
    generated = generated.concat(generateServerVariables(subject.variables()));
    return generated;
}
function generateServerVariables(subject) {
    let generated = [];
    for (const [_, variable] of Object.entries(subject)) {
        generated = generated.concat(generateServerVariable(variable));
    }
    return generated;
}
function generateServerVariable(subject) {
    let generated = [];
    if (!subject.defaultValue()) {
        generated.push(`subject generated default value`);
    }
    return generated;
}
function generateChannels(subject) {
    let generated = [];
    for (const [_, channel] of Object.entries(subject)) {
        generated = generated.concat(generateChannel(channel));
    }
    return generated;
}
function generateChannel(subject) {
    let generated = [];
    let messages = 'messages';
    if ((0, validate_1.containSubFunction)(subject, messages)) {
        generated = generated.concat(generateMessages(subject.messages()));
    }
    return generated;
}
function generateMessages(subject) {
    let generated = [];
    if (Object.keys(subject).length === 0) {
        generated.push('generated messages');
    }
    return generated;
}
function generateComponents(subject) {
    let generated = [];
    if (Object.keys(subject.messages()).length === 0) {
        generated.push('generated messages');
    }
    if (Object.keys(subject.schemas()).length === 0) {
        generated.push('generated schemas');
    }
    return generated;
}
