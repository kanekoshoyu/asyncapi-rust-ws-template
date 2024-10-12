"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
exports.render_model = render_model;
const modelina_1 = require("@asyncapi/modelina");
const main_rs_1 = require("./main.rs");
const README_md_1 = require("./README.md");
const Cargo_toml_1 = require("./Cargo.toml");
const validate_1 = require("./validate");
async function default_1({ asyncapi, params }) {
    // validates a AsyncAPI file
    if (params.validate) {
        let missing = (0, validate_1.validateFile)(asyncapi);
        if (missing.length > 0) {
            console.log("missing: " + missing);
        }
        else {
            console.log("all files verified");
        }
    }
    // generates websocket client
    if (params.generate) {
        let result = [(0, main_rs_1.render_main)(), (0, README_md_1.render_readme)(), (0, Cargo_toml_1.render_cargo)()];
        console.log("all files generated");
        return result;
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
    const models = await generator.generate(asyncapi);
}
