import { RenderFile } from './tool';

function content(): string {
  return `
# WebSocket Client
rendered by [async-rust-ws-template](https://github.com/kanekoshoyu/asyncapi-rust-ws-template)
  `;
}

export function renderReadme(): RenderFile {
  return new RenderFile("src_client_README.md", content());
}
