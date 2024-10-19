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
    // metadata
    if (item.version == undefined) {
        missing.push('version');
    }
    if (item.defaultContentType == undefined) {
        missing.push('defaultContentType');
    }
    if (item.hasDefaultContentType == undefined) {
        missing.push('hasDefaultContentType');
    }
    if (item.info == undefined) {
        missing.push('info');
    }
    // root
    if (item.servers == undefined) {
        missing.push('servers');
    }
    if (item.channels == undefined) {
        missing.push('channels');
    }
    if (item.operations == undefined) {
        missing.push('operations');
    }
    if (item.messages == undefined) {
        missing.push('messages');
    }
    if (item.schemas == undefined) {
        missing.push('schemas');
    }
    if (item.securitySchemes == undefined) {
        missing.push('securitySchemes');
    }
    if (item.components == undefined) {
        missing.push('components');
    }
    // all
    if (item.allServers == undefined) {
        missing.push('allServers');
    }
    if (item.allChannels == undefined) {
        missing.push('allChannels');
    }
    if (item.allOperations == undefined) {
        missing.push('allOperations');
    }
    if (item.allMessages == undefined) {
        missing.push('allMessages');
    }
    if (item.allSchemas == undefined) {
        missing.push('allSchemas');
    }
    return missing.map(i => 'root.' + i);
}
