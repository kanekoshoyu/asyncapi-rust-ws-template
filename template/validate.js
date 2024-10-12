"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.containSubFunction = containSubFunction;
exports.validateAsyncApi = validateAsyncApi;
/// determines the sub function availability
function containSubFunction(object, funcName) {
    return (typeof object[funcName] === 'function');
}
function validateAsyncApi(subject) {
    let missing = [];
    let info = 'info';
    if (!containSubFunction(subject, info)) {
        missing.push(info);
    }
    else {
        missing = missing.concat(validateInfo(subject.info()));
    }
    let servers = 'servers';
    if (!containSubFunction(subject, servers)) {
        missing.push(servers);
    }
    else {
        missing = missing.concat(validateServers(subject.servers()));
    }
    let channels = 'channels';
    if (!containSubFunction(subject, channels)) {
        missing.push(channels);
    }
    else {
        missing = missing.concat(validateChannels(subject.channels()));
    }
    let components = 'components';
    if (!containSubFunction(subject, components)) {
        missing.push(components);
    }
    else {
        missing = missing.concat(validateComponents(subject.components()));
    }
    return missing;
}
function validateInfo(subject) {
    let missing = [];
    let title = 'title';
    if (!containSubFunction(subject, title)) {
        missing.push(title);
    }
    let version = 'version';
    if (!containSubFunction(subject, version)) {
        missing.push(version);
    }
    return missing;
}
function validateServers(subject) {
    let missing = [];
    for (const [serverName, server] of Object.entries(subject)) {
        missing = missing.concat(validateServer(server));
    }
    return missing;
}
function validateServer(subject) {
    let missing = [];
    let url = 'url';
    if (!containSubFunction(subject, url)) {
        missing.push(url);
    }
    let protocol = 'protocol';
    if (!containSubFunction(subject, protocol)) {
        missing.push(protocol);
    }
    let variables = 'variables';
    if (containSubFunction(subject, variables)) {
        missing = missing.concat(validateServerVariables(subject.variables()));
    }
    return missing;
}
function validateServerVariables(subject) {
    let missing = [];
    for (const [_, variable] of Object.entries(subject)) {
        missing = missing.concat(validateServerVariable(variable));
    }
    return missing;
}
function validateServerVariable(subject) {
    let missing = [];
    if (!subject.defaultValue()) {
        missing.push(`subject missing default value`);
    }
    return missing;
}
function validateChannels(subject) {
    let missing = [];
    for (const [_, channel] of Object.entries(subject)) {
        missing = missing.concat(validateChannel(channel));
    }
    return missing;
}
function validateChannel(subject) {
    let missing = [];
    let messages = 'messages';
    if (containSubFunction(subject, messages)) {
        missing = missing.concat(validateMessages(subject.messages()));
    }
    return missing;
}
function validateMessages(subject) {
    let missing = [];
    if (Object.keys(subject).length === 0) {
        missing.push('missing messages');
    }
    return missing;
}
function validateComponents(subject) {
    let missing = [];
    if (Object.keys(subject.messages()).length === 0) {
        missing.push('missing messages');
    }
    if (Object.keys(subject.schemas()).length === 0) {
        missing.push('missing schemas');
    }
    return missing;
}
