import { ServersInterface, ServerInterface } from '@asyncapi/parser';
import { FormatHelpers } from '@asyncapi/modelina';
import { RenderFile } from './renderFile';
import { contentClientFn } from './renderClientFn';
import { appendLines } from './tool';


/** client code from server */
export function contentClient(server: ServerInterface, exchangeName: string): string {
	const serverName = FormatHelpers.toSnakeCase(server.id());
	let fnCode: string[] = [];
	let enumCode: string[] = [];
	// gather GeneratedCode
	for (const channel of server.channels()) {
		const result = contentClientFn(channel, exchangeName, serverName);
		fnCode = fnCode.concat(result.fnCode);
		enumCode = enumCode.concat(result.enumCode);
	}

	return `
use crate::model::*;
use serde::{Deserialize, Serialize};
use tokio::net::TcpStream;
use tokio_tungstenite::tungstenite::Result;
use tokio_tungstenite::{connect_async, MaybeTlsStream};
use typed_websocket::TypedWebSocketStream;
use typed_websocket::TypedWebSocketStream;

pub type Stream<INPUT, OUTPUT> = TypedWebSocketStream<MaybeTlsStream<TcpStream>, INPUT, OUTPUT>;
${appendLines(enumCode)}

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
${appendLines(fnCode)}
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
export function renderClientDir(servers: ServersInterface, exchangeName: string): RenderFile[] {
	let files: RenderFile[] = [];

	// every server
	for (const server of servers) {
		const serverName = FormatHelpers.toSnakeCase(server.id());

		// operations within conentClient
		files = files.concat(new RenderFile(`src/client/${serverName}.rs`, contentClient(server, exchangeName)));
	}

	files = files.concat(new RenderFile(`src/client/mod.rs`, contentModClient(servers)));

	return files;
}
