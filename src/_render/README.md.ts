import { render } from './tool';

function content() {
  return `
# WebSocket Client
rendered by [async-rust-ws-template](https://github.com/kanekoshoyu/asyncapi-rust-ws-template)
  `;
}

export function renderReadme() {
  return render("README.md", content());
}
