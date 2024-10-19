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
function validateAsyncApi(item) {
    let missing = [];
    if (item.info == undefined) {
        missing.push('info');
    }
    else {
        missing = missing.concat(validateInfo(item.info()));
    }
    if (item.servers == undefined) {
        missing.push('servers');
    }
    else {
        missing = missing.concat(validateServers(item.servers()));
    }
    if (item.channels == undefined) {
        missing.push('channels');
    }
    else {
        missing = missing.concat(validateChannels(item.channels()));
    }
    if (item.components == undefined) {
        missing.push('components');
    }
    else {
        missing = missing.concat(validateComponents(item.components()));
    }
    if (item.operations == undefined) {
        missing.push('operations');
    }
    if (item.operations == undefined) {
        missing.push('operations');
    }
    return missing.map(i => 'root.' + i);
}
function validateInfo(item) {
    let missing = [];
    let title = 'title';
    if (item.title == undefined) {
        missing.push(title);
    }
    let version = 'version';
    if (item.version == undefined) {
        missing.push(version);
    }
    return missing.map(i => 'info' + i);
    ;
}
function validateServers(items) {
    let missing = [];
    for (let item of items) {
        missing = missing.concat(validateServer(item));
    }
    return missing.map(i => 'servers.' + i);
}
function validateServer(item) {
    let missing = [];
    if (item.url == undefined) {
        missing.push('url');
    }
    if (item.protocol == undefined) {
        missing.push('protocol');
    }
    if (item.variables != undefined) {
        missing = missing.concat(validateServerVariables(item.variables()));
    }
    return missing.map(i => 'server.' + i);
}
function validateServerVariables(variables) {
    let missing = [];
    for (let variable of variables) {
        missing = missing.concat(validateServerVariable(variable));
    }
    return missing.map(i => 'variables.' + i);
}
function validateServerVariable(item) {
    let missing = [];
    if (item.defaultValue == undefined) {
        missing.push(`item missing default value`);
    }
    return missing.map(i => 'variable.' + i);
    ;
}
function validateChannels(channels) {
    let missing = [];
    for (let channel of channels) {
        missing = missing.concat(validateChannel(channel));
    }
    return missing.map(i => 'channels.' + i);
}
function validateChannel(item) {
    let missing = [];
    if (item.messages == undefined) {
        missing.push(`message`);
    }
    else {
        missing = missing.concat(validateMessages(item.messages()));
    }
    return missing.map(i => "channel." + i);
}
function validateMessages(items) {
    let missing = [];
    if (items.length == 0) {
        missing.push('missing messages');
    }
    return missing.map(i => 'messages.' + i);
}
function validateComponents(item) {
    let missing = [];
    if (Object.keys(item.messages()).length == 0) {
        missing.push('message');
    }
    if (Object.keys(item.schemas()).length == 0) {
        missing.push('schema');
    }
    return missing.map(i => 'components.' + i);
    ;
}
