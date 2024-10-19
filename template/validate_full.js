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
    if (subject.version == undefined) {
        missing.push(`${alias}version`);
    }
    if (subject.defaultContentType == undefined) {
        missing.push(`${alias}defaultContentType`);
    }
    if (subject.hasDefaultContentType == undefined) {
        missing.push(`${alias}hasDefaultContentType`);
    }
    if (subject.info == undefined) {
        missing.push(`${alias}info`);
    }
    // root
    if (subject.servers == undefined) {
        missing.push(`${alias}servers`);
    }
    if (subject.channels == undefined) {
        missing.push(`${alias}channels`);
    }
    if (subject.operations == undefined) {
        missing.push(`${alias}operations`);
    }
    if (subject.messages == undefined) {
        missing.push(`${alias}messages`);
    }
    if (subject.schemas == undefined) {
        missing.push(`${alias}schemas`);
    }
    if (subject.securitySchemes == undefined) {
        missing.push(`${alias}securitySchemes`);
    }
    if (subject.components == undefined) {
        missing.push(`${alias}components`);
    }
    // all
    if (subject.allServers == undefined) {
        missing.push(`${alias}allServers`);
    }
    if (subject.allChannels == undefined) {
        missing.push(`${alias}allChannels`);
    }
    if (subject.allOperations == undefined) {
        missing.push(`${alias}allOperations`);
    }
    if (subject.allMessages == undefined) {
        missing.push(`${alias}allMessages`);
    }
    if (subject.allSchemas == undefined) {
        missing.push(`${alias}allSchemas`);
    }
    return missing;
}
