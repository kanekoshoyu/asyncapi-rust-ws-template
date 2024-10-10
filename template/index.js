"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const main_rs_1 = require("./main.rs");
const README_md_1 = require("./README.md");
const Cargo_toml_1 = require("./Cargo.toml");
const validate_1 = require("./validate");
function default_1({ asyncapi, params }) {
    // TODO: there should be server and channel
    let missing = (0, validate_1.validateFile)(asyncapi);
    if (missing.length > 0) {
        console.log("missing: " + missing);
    }
    // return a set of files
    return [(0, main_rs_1.render_main)(), (0, README_md_1.render_readme)(), (0, Cargo_toml_1.render_cargo)()];
}
