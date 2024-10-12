"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.render_main = render_main;
const tool_1 = require("./tool");
function content() {
    return `
// main.rs
use tokio;

fn main() {
  println!("Hello test");
}
`;
}
function render_main() {
    const filename = "main.rs";
    // return <File name={filename} > {content()} </File>;
    return (0, tool_1.render)("main.rs", content());
}
