import { render } from './tool';
import { InfoInterface } from '@asyncapi/parser';

function content(info: InfoInterface) {
    let name = "name = \"exchange-collection-ws-" + info.title() + "\"\n";
    let version = "version = \"" + info.version() + "\"\n";
    let description = "description = \"" + info.description()?.replace('"', '\"') + "\"\n";
    let meta = `[package]\n` + name + version + description;

    return meta + `
[dependencies.reqwest]`+ `
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

export function render_cargo(info: InfoInterface) {
    return render("Cargo.toml", content(info));
}