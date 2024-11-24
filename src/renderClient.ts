import { ServersInterface, ServerInterface } from '@asyncapi/parser';
import { FormatHelpers } from '@asyncapi/modelina';
import { RenderFile } from './renderFile';
import { contentClientFunction } from './renderClientFn';
import { prependLines } from './tool';


/** client code from server */
export function contentClient(exchangeName: string, server: ServerInterface): string {

	let contentClientFunctions = '';
	for (const channel of server.channels()) {
		const fn = contentClientFunction(channel);
		contentClientFunctions = contentClientFunctions.concat(`\n${fn}`);
	}
	return `
use crate::model::*;
use tokio::net::TcpStream;
use tokio_tungstenite::tungstenite::Result;
use tokio_tungstenite::{connect_async, MaybeTlsStream};
use typed_websocket::TypedWebSocketStream;

pub type Stream<INPUT, OUTPUT> = TypedWebSocketStream<MaybeTlsStream<TcpStream>, INPUT, OUTPUT>;

#[derive(Debug)]
pub struct ${FormatHelpers.toPascalCase(exchangeName)}${FormatHelpers.toPascalCase(server.id())}Client {
	base_url: String,
}

impl ${FormatHelpers.toPascalCase(exchangeName)}${FormatHelpers.toPascalCase(server.id())}Client {
	/// connect to the ${exchangeName} websocket server
	pub async fn new() -> Self {
		Self {
			base_url: "${server.url()}".to_string(),
 		}
	}
${prependLines(contentClientFunctions, '\t')}
}
`.trimStart()
}


function contentModClientItem(server: ServerInterface): string {
	return `
/// ${server.description()}
pub mod ${FormatHelpers.toSnakeCase(server.id())};
`.trim()
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
