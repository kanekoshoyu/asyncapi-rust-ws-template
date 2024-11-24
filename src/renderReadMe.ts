import { RenderFile } from './renderFile';

function content(): string {
	return `
# WebSocket Client
rendered by [async-rust-ws-template](https://github.com/kanekoshoyu/asyncapi-rust-ws-template)
`.trimStart();
}

export function renderReadme(): RenderFile {
	return new RenderFile("README.md", content());
}
