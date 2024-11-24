import { RenderFile } from './renderFile';
import { InfoInterface } from '@asyncapi/parser';

function content(exchangeName: string, info: InfoInterface): string {
	return `
[package]
name = "exchange-collection-ws-${exchangeName}"
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

export function renderCargo(exchangeName: string, info: InfoInterface): RenderFile {
	return new RenderFile("Cargo.toml", content(exchangeName, info));
}