"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.render_main = render_main;
function content() {
    return `
// main.rs
use tokio;

fn main() {
  println!("Hello world");
}
`;
}
function render_main() {
    return React.createElement(File, { name: "main.rs" },
        " ",
        content(),
        " ");
}
