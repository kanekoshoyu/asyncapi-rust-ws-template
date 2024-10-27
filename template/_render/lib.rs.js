"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderLibRs = renderLibRs;
const tool_1 = require("./tool");
const format_1 = require("../format");
function content(doc) {
    let texts = [];
    for (let server of doc.servers()) {
        let serverName = (0, format_1.pascalcase)(server.id());
        let text = `
      mod client_${serverName}.rs;
    `;
        texts.concat(text);
    }
    return `
//
${texts}
    `;
}
// TODO store src/lib.rs
function renderLibRs(doc) {
    return new tool_1.RenderFile("src_lib.rs", content(doc));
}
