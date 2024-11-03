import { ServersInterface, ServerInterface, ChannelsInterface, OperationInterface, ChannelInterface } from '@asyncapi/parser';
import { FormatHelpers } from '@asyncapi/modelina';
import { RenderFile } from './renderFile';

/** client function from operations */
export function contentClientFunction(channel: ChannelInterface): string {
    let params = channel.parameters();
    for (const param of params) {
        console.log(`param: ${param}`)
    }
    let contentLogic = 'todo!();';
    let returnValue = '';
    return `    /// ${channel.description()}
    async fn ${FormatHelpers.toSnakeCase(channel.id())}(&self) ${returnValue}{
        ${contentLogic}
    } 
`;
}

/** client code from server */
export function contentClient(exchangeName: string, server: ServerInterface): string {

    let contentClientFunctions = '';
    for (const channel of server.channels()) {
        let fn = contentClientFunction(channel);
        contentClientFunctions = contentClientFunctions.concat(fn);
    }
    return `
use futures_util::{SinkExt, StreamExt};
use tokio::net::TcpStream;
use tokio_tungstenite::tungstenite::client::IntoClientRequest;
use tokio_tungstenite::tungstenite::protocol::Message;
use tokio_tungstenite::tungstenite::Result;
use tokio_tungstenite::{connect_async, MaybeTlsStream, WebSocketStream};

const WS_URL: &str = "${server.url()}";

#[derive(Debug)]
pub struct ${FormatHelpers.toPascalCase(exchangeName)}${FormatHelpers.toPascalCase(server.id())}Client {
    ws_stream: WebSocketStream<MaybeTlsStream<TcpStream>>,
}

impl ${FormatHelpers.toPascalCase(exchangeName)}${FormatHelpers.toPascalCase(server.id())}Client {
    /// connect to the ${exchangeName} websocket server
    pub async fn new() -> Result<Self> {
        let client = WS_URL.into_client_request()?;

        let (ws_stream, _) = connect_async(client).await.map_err(|err| {
            eprintln!("Failed to connect: {:?}", err);
            err
        })?;

        println!("Connected to {}", WS_URL);
        Ok(Self { ws_stream })
    }

    /// Send a message through the WebSocket connection.
    pub async fn send_message(&mut self, msg: &str) -> Result<()> {
        self.ws_stream.send(Message::Text(msg.to_string())).await
    }

    /// Receive a message from the WebSocket connection.
    pub async fn receive_message(&mut self) -> Option<Result<Message>> {
        self.ws_stream.next().await
    }

    /// Close the WebSocket connection.
    pub async fn close(&mut self) -> Result<()> {
        self.ws_stream.close(None).await
    }

${contentClientFunctions}
}
`

}


function contentModClientItem(server: ServerInterface): string {
    return `/// ${server.description()}
mod ${FormatHelpers.toSnakeCase(server.id())};
`
}

export function contentModClient(servers: ServersInterface): string {
    let result = '';
    for (const server of servers) {
        result += contentModClientItem(server);
    }
    return result;
}

// TODO set up the render function where we can set up directories as well directly
export function renderClientDir(exchangeName: string, servers: & ServersInterface): RenderFile[] {
    let files: RenderFile[] = [];

    // every server
    for (const server of servers) {
        const serverName = FormatHelpers.toSnakeCase(server.id());

        // operations within conentClient
        files = files.concat(new RenderFile(`src/client/${serverName}.rs`, contentClient(exchangeName, server)));
    }

    files = files.concat(new RenderFile(`src/client/mod.rs`, contentModClient(servers)));

    return files;
}