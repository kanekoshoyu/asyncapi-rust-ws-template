function content() {
    return `
# WebSocket Client
generated by [async-rust-ws-template](https://github.com/kanekoshoyu/asyncapi-rust-ws-template)
  `;
}

export function render_readme() {
    return <File name="README.md" > {content()} </File>;
}
