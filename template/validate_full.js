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
    const missing = [];
    const alias = 'root.';
    // List of method names to check
    const methodNames = [
        'version',
        'defaultContentType',
        'hasDefaultContentType',
        'info',
        'servers',
        'channels',
        'operations',
        'messages',
        'schemas',
        'securitySchemes',
        'components',
        'allServers',
        'allChannels',
        'allOperations',
        'allMessages',
        'allSchemas',
        'extensions',
    ];
    // Loop through the method names and check if they are undefined
    methodNames.forEach((methodName) => {
        if (typeof subject[methodName] === 'undefined') {
            missing.push(`${alias}${methodName}`);
        }
    });
    return missing;
}
