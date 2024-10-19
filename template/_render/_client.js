"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.render_rust_ws_client_code = render_rust_ws_client_code;
exports.render_rust_ws_client_mod = render_rust_ws_client_mod;
exports.renderClientDir = renderClientDir;
const tool_1 = require("./tool");
// ThisForm
function pascalcase(s) {
    return s.replace('_', '').replace(' ', '');
}
// thisForm
function camelcase(s) {
    return s.replace('_', '').replace(' ', '');
}
// this_form
function underscore(s) {
    return s.replace(' ', '_').toLowerCase();
}
function render_rust_ws_client_code(server) {
    return `
use reqwest::Client;
use std::sync::Arc;

pub struct ${pascalcase(server.id())}Client {
    url: String,
    port: u16,
    protocol: String,
    client: Arc<Client>,
}

impl ${pascalcase(server.id())}Client {
    pub fn new(url: &str, port: u16, protocol: &str) -> Self {
        Self {
            url: url.to_string(),
            port,
            protocol: protocol.to_string(),
            client: Arc::new(Client::new()),
        }
    }

    pub async fn make_request(&self, endpoint: &str) -> Result<String, reqwest::Error> {
        let url = format!("{}://{}:{}{}", self.protocol, self.url, self.port, endpoint);
        let response = self.client.get(&url).send().await?.text().await?;
        Ok(response)
    }
}
`;
}
function render_rust_ws_client_mod(servers) {
    return `
mod 
`;
}
// TODO set up the render function where we can set up directories as well directly
function renderClientDir(servers) {
    let files = [];
    console.log(`server count: ${servers.length}`);
    for (let server of servers) {
        let serverName = underscore(server.id());
        let file = (0, tool_1.render)(`client_${serverName}.rs`, render_rust_ws_client_code(server));
        files = files.concat(file);
    }
    let file = (0, tool_1.render)(`client_mod.rs`, render_rust_ws_client_mod(servers));
    return files;
}
