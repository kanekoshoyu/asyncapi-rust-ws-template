"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.render_rust_ws_client_code = render_rust_ws_client_code;
exports.render_rust_ws_client_mod = render_rust_ws_client_mod;
exports.renderClientDir = renderClientDir;
const tool_1 = require("../../_render/tool");
const modelina_1 = require("@asyncapi/modelina");
const format_1 = require("../../format");
function render_rust_ws_client_code(exchangeName, server) {
    return `
use futures_util::{StreamExt, SinkExt};
use tokio::net::TcpStream;
use tokio_tungstenite::{connect_async, tungstenite::protocol::Message, WebSocketStream};
use tokio_tungstenite::tungstenite::Error as WsError;
use serde::{Deserialize, Serialize};
use std::time::Duration;

const URL: &str = "${server.url()}";

#[derive(Debug)]
pub struct ${(0, format_1.pascalcase)(exchangeName)}${(0, format_1.pascalcase)(server.id())}Client {
    ws_stream: WebSocketStream<TcpStream>,
}

impl ${(0, format_1.pascalcase)(exchangeName)}${(0, format_1.pascalcase)(server.id())}Client {
    /// connect to the ${exchangeName} websocket server
    pub async fn new() -> Result<Self, WsError> {
        let url = url::Url::parse(URL).expect("Invalid URL");

        let (ws_stream, _) = connect_async(URL).await.map_err(|err| {
            eprintln!("Failed to connect: {:?}", err);
            err
        })?;

        println!("Connected to {}", URL);
        Ok(Self { ws_stream })
    }

    /// Send a message through the WebSocket connection.
    pub async fn send_message(&mut self, msg: &str) -> Result<(), WsError> {
        self.ws_stream.send(Message::Text(msg.to_string())).await
    }

    /// Receive a message from the WebSocket connection.
    pub async fn receive_message(&mut self) -> Option<Result<Message, WsError>> {
        self.ws_stream.next().await
    }

    /// Close the WebSocket connection.
    pub async fn close(&mut self) -> Result<(), WsError> {
        self.ws_stream.close(None).await
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
function renderClientDir(exchangeName, servers) {
    let files = [];
    for (let server of servers) {
        let serverName = modelina_1.FormatHelpers.toSnakeCase(server.id());
        files = files.concat(new tool_1.RenderFile(`src_client_${serverName}.rs`, render_rust_ws_client_code(exchangeName, server)));
    }
    files = files.concat(new tool_1.RenderFile(`src_client_mod.rs`, render_rust_ws_client_mod(servers)));
    return files;
}
