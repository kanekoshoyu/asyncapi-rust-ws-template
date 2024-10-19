import { render } from './tool';
import { InfoInterface } from '@asyncapi/parser';

function content(exchangeName: string, info: InfoInterface) {
    return `
[package]
name = "exchange-collection-ws-${exchangeName}"
version = "${info.version()}"
description = "${info.description()?.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"

# use workspace when needed
[dependencies]
tokio = { version = "1", features = ["full"] }
tokio-tungstenite = "0.15"
futures = "0.3"
serde = { version = "1", features = ["derive"] }
serde_json = "1.0"

`;
}

export function renderCargo(exchangeName: string, info: InfoInterface) {
    return render("Cargo.toml", content(exchangeName, info));
}