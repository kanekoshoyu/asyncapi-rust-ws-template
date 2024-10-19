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
    // metadata
    if (subject.version == undefined) {
        missing.push('version');
    }
    if (subject.defaultContentType == undefined) {
        missing.push('defaultContentType');
    }
    if (subject.hasDefaultContentType == undefined) {
        missing.push('hasDefaultContentType');
    }
    if (subject.info == undefined) {
        missing.push('info');
    }
    // root
    if (subject.servers == undefined) {
        missing.push('servers');
    }
    if (subject.channels == undefined) {
        missing.push('channels');
    }
    if (subject.operations == undefined) {
        missing.push('operations');
    }
    if (subject.messages == undefined) {
        missing.push('messages');
    }
    if (subject.schemas == undefined) {
        missing.push('schemas');
    }
    if (subject.securitySchemes == undefined) {
        missing.push('securitySchemes');
    }
    if (subject.components == undefined) {
        missing.push('components');
    }
    // all
    if (subject.allServers == undefined) {
        missing.push('allServers');
    }
    if (subject.allChannels == undefined) {
        missing.push('allChannels');
    }
    if (subject.allOperations == undefined) {
        missing.push('allOperations');
    }
    if (subject.allMessages == undefined) {
        missing.push('allMessages');
    }
    if (subject.allSchemas == undefined) {
        missing.push('allSchemas');
    }
    return missing.map(i => 'root.' + i);
}
