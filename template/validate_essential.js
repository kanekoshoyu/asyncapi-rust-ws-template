"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.write_json = write_json;
exports.validateAsyncApi = validateAsyncApi;
const fs_1 = require("fs");
function write_json(data, filename) {
    (0, fs_1.writeFile)(filename, data, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to the file:', err);
            return;
        }
        console.log('JSON file has been written successfully!');
    });
}
function validateAsyncApi(subject) {
    let missing = [];
    let alias = 'root.';
    if (subject.info == undefined) {
        missing.push(alias + 'info');
    }
    else {
        missing = missing.concat(validateInfo(subject.info()));
    }
    if (subject.servers == undefined) {
        missing.push(alias + 'servers');
    }
    else {
        missing = missing.concat(validateServers(subject.servers()));
    }
    if (subject.channels == undefined) {
        missing.push(alias + 'channels');
    }
    else {
        missing = missing.concat(validateChannels(subject.channels()));
    }
    if (subject.components == undefined) {
        missing.push(alias + 'components');
    }
    else {
        missing = missing.concat(validateComponents(subject.components()));
    }
    if (subject.operations == undefined) {
        missing.push(alias + 'operations');
    }
    if (subject.operations == undefined) {
        missing.push(alias + 'operations');
    }
    return missing;
}
function validateInfo(subject) {
    let missing = [];
    let title = 'title';
    if (subject.title == undefined) {
        missing.push(title);
    }
    let version = 'version';
    if (subject.version == undefined) {
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
    if (subject.url == undefined) {
        missing.push(url);
    }
    let protocol = 'protocol';
    if (subject.protocol == undefined) {
        missing.push(protocol);
    }
    let variables = 'variables';
    if (subject.variables == undefined) {
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
    if (subject.messages == undefined) {
        missing.push(`message`);
    }
    else {
        missing = missing.concat(validateMessages(subject.messages()));
    }
    return missing.map(i => "channel." + i);
}
function validateMessages(subject) {
    let missing = [];
    if (Object.keys(subject).length == 0) {
        missing.push('missing messages');
    }
    return missing;
}
function validateComponents(subject) {
    let missing = [];
    if (Object.keys(subject.messages()).length == 0) {
        missing.push('missing messages');
    }
    if (Object.keys(subject.schemas()).length == 0) {
        missing.push('missing schemas');
    }
    return missing;
}
