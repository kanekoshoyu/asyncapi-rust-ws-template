import { FormatHelpers } from '@asyncapi/modelina';
import { RenderFile } from './renderFile';
import { InfoInterface } from '@asyncapi/parser';

function content(info: InfoInterface, exchangeName: string): string {
	const exchange = FormatHelpers.toSnakeCase(exchangeName);
	return `
[package]
name = "exchange-collection-ws-${exchange}"
version = "${info.version()}"
description = "${info.description()?.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"
edition = "2018"

# use workspace when needed
[dependencies]
tokio = { version = "1.41.0", features = ["full"] }
tokio-tungstenite = { version = "0.24.0", features = ["native-tls"] }
futures = "0.3.31"
futures-util = "0.3.31"
serde = { version = "1.0.214", features = ["derive"] }
serde_json = "1.0.132"
typed-websocket = "0.1.0"
`.trimStart();
}

export function renderCargo(info: InfoInterface, exchangeName: string): RenderFile {
	return new RenderFile("Cargo.toml", content(info, exchangeName));
}