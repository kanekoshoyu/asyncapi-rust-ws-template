"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const main_rs_1 = require("./main.rs");
const README_md_1 = require("./README.md");
const Cargo_toml_1 = require("./Cargo.toml");
function default_1({ asyncapi, params }) {
    // TODO: there should be server and channel
    let missing_component = missingAsyncApiComponent(asyncapi);
    console.log("missing: " + missing_component);
    let data = validateFile(asyncapi);
    asyncapi.servers();
    // return a set of files
    return [(0, main_rs_1.render_main)(), (0, README_md_1.render_readme)(), (0, Cargo_toml_1.render_cargo)()];
}
/// determines the sub function availability
function containSubFunction(object, funcName) {
    return (typeof object[funcName] === 'function');
}
/// list out missing subfunctions
function missingSubFunctions(object, funcNames) {
    let missing = [];
    funcNames.forEach((funcName) => {
        if (!containSubFunction(object, funcName)) {
            missing.push(funcName);
        }
    });
    return missing;
}
function missingAsyncApiComponent(asyncapi) {
    // List of components to check
    const components = ['channels', 'servers', 'info', 'components', 'messages', 'schemas'];
    const nested_components = ['allChannels', 'allServers', 'allComponents', 'allMessages', 'allSchemas'];
    let found = [];
    let missing = [];
    // loop through each component and check if it exists on the asyncapi object
    components.forEach((component) => {
        if (typeof asyncapi[component] === 'function') {
            found.push(component);
        }
        else {
            missing.push(component);
        }
    });
    // nested
    nested_components.forEach((component) => {
        if (typeof asyncapi[component] === 'function') {
            found.push(component);
        }
        else {
            missing.push(component);
        }
    });
    return missing;
}
function validateFile(asyncapi) {
    const required = ['servers', 'channels', 'info', 'components'];
    return missingSubFunctions(asyncapi, required).length == 0;
}
function validateServer(server) {
    const required = ['channels', 'id', 'protocol'];
    return missingSubFunctions(server, required).length == 0;
}
function validateChannel(channel) {
    const required = ['channels', 'id', 'protocol'];
    return missingSubFunctions(channel, required).length == 0;
}
