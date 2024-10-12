import { render } from './tool';
import { InfoInterface } from '@asyncapi/parser';

function content(exchangeName: string, info: InfoInterface) {
    info.contact()
    return `
[package]
name = "exchange-collection-ws-${exchangeName}"
version = "${info.version()}"
description = "${info.description()?.replace(/"/g, '\"')}"
[dependencies.reqwest]
workspace = true

[dependencies.serde]
workspace = true

[dependencies.serde_json]
workspace = true

[dependencies.serde_yaml]
workspace = true

[dependencies.url]
workspace = true
`;
}

export function render_cargo(exchangeName: string, info: InfoInterface) {
    return render("Cargo.toml", content(exchangeName, info));
}