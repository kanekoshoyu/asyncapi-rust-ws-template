function content() {
    return `
[package]
name = "exchange-collection-ws-{{ asyncapi.info().title() }}"
version = "{{ asyncapi.info().version() }}"
edition = "2021"

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

export function render_cargo() {
    return <File name="Cargo.toml" > {content()} </File>;
}