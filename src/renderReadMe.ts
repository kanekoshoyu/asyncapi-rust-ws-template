import { FormatHelpers } from '@asyncapi/modelina';
import { RenderFile } from './renderFile';

function content(exchangeName: string): string {
	const exchange = FormatHelpers.toPascalCase(exchangeName);
	return `
# ${exchange} WebSocket Client
rendered by [async-rust-ws-template](https://github.com/kanekoshoyu/asyncapi-rust-ws-template)
`.trimStart();
}

export function renderReadme(exchangeName: string): RenderFile {
	return new RenderFile("README.md", content(exchangeName));
}
