import { render } from '../../_render/tool';
import { ServersInterface, ServerInterface } from '@asyncapi/parser';
import { pascalcase, underscore } from '../../format';

export function render_rust_ws_client_code(exchangeName: string, server: ServerInterface): string {
    return `
use futures_util::{StreamExt, SinkExt};
use tokio::net::TcpStream;
use tokio_tungstenite::{connect_async, tungstenite::protocol::Message, WebSocketStream};
use tokio_tungstenite::tungstenite::Error as WsError;
use serde::{Deserialize, Serialize};
use std::time::Duration;

const URL: &str = "${server.url()}";

#[derive(Debug)]
pub struct ${pascalcase(exchangeName)}${pascalcase(server.id())}Client {
    ws_stream: WebSocketStream<TcpStream>,
}

impl ${pascalcase(exchangeName)}${pascalcase(server.id())}Client {
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
`

}


export function render_rust_ws_client_mod(servers: ServersInterface): string {
    return `
mod 
`
}

// TODO set up the render function where we can set up directories as well directly
export function renderClientDir(exchangeName: string, servers: & ServersInterface): React.ReactElement[] {
    let files: React.ReactElement[] = [];

    for (let server of servers) {
        let serverName = underscore(server.id());
        let file = render(`src_client_${serverName}.rs`, render_rust_ws_client_code(exchangeName, server));
        files = files.concat(file);
    }

    let file = render(`src_client_mod.rs`, render_rust_ws_client_mod(servers));
    files = files.concat(file);

    return files;
}