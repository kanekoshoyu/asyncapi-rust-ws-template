"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const validate_essential_1 = require("./validate_essential");
const render_1 = require("./render");
async function default_1({ asyncapi, params }) {
    console.log(params);
    // validates a AsyncAPI file
    if (params.validate) {
        console.log('validating');
        let missing_items = (0, validate_essential_1.validateAsyncApi)(asyncapi);
        if (missing_items.length > 0) {
            console.log('missing below');
            for (let missing_item of missing_items) {
                console.log(missing_item);
            }
            return [];
        }
        else {
            console.log('all files verified');
        }
    }
    let exchangeName = 'binance';
    // renders websocket client
    if (params.render) {
        console.log('rendering');
        let files = await (0, render_1.renderRustWsClientFromAsyncApi)(exchangeName, asyncapi);
        console.log(`render files: ${files.length}`);
        let collection = [];
        for (let file of files) {
            collection.push(file.render());
        }
        console.log(`gathered collection: ${collection.length}`);
        return collection;
        // return rendered;
    }
    else {
        return [];
    }
}
