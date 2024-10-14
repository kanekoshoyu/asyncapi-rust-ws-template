"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
exports.render_model = render_model;
const modelina_1 = require("@asyncapi/modelina");
const validate_1 = require("./validate");
const render_1 = require("./render");
async function default_1({ asyncapi, params }) {
    // parameter
    console.log("params: " + params);
    // validates a AsyncAPI file
    if (params.validate) {
        let missing = (0, validate_1.validateAsyncApi)(asyncapi);
        if (missing.length > 0) {
            console.log("missing: " + missing);
            return [];
        }
        else {
            console.log("all files verified");
        }
    }
    let exchangeName = "binance";
    // renders websocket client
    if (params.render) {
        let rendered = (0, render_1.renderRustWsClientFromAsyncApi)(exchangeName, asyncapi);
        console.log("all files rendered");
        console.log(`render files: ${rendered.length}`);
        return rendered;
    }
    else {
        return [];
    }
}
/**
* Experimental use of modellina
* TODO: complete this
*/
async function render_model(asyncapi) {
    const generator = new modelina_1.RustGenerator();
    // const models = await generator.render(asyncapi);
}
