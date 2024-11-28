
import { AsyncAPIDocumentInterface } from '@asyncapi/parser';
import { validateAsyncApi } from './validateEssential';
import { renderRustWsClientFromAsyncApi } from './render';
// import { getAsyncApiYamlFiles } from './fetchRemoteConfig';

interface TemplateParams {
	// exchange name, required
	exchange: string;
	// to validate or not, default to true 
	validate: boolean;
	// to render or not, default to true
	render: boolean;
	// websocket library to generate, currently only supports tokio-tungstenite
	library?: 'tokio-tungstenite' | 'async-tungstenite';
}

interface TemplateProps {
	asyncapi: AsyncAPIDocumentInterface;
	params: TemplateParams;
}


export default async function ({ asyncapi, params }: TemplateProps) {

	// validates a AsyncAPI file
	if (params.validate) {
		const missing_items = validateAsyncApi(asyncapi);
		if (missing_items.length > 0) {
			console.log('missing below');
			for (const missing_item of missing_items) {
				console.log(missing_item);
			}
			return [];
		} else {
			console.log('all files verified');
		}
	}
	const exchangeName = params.exchange ? params.exchange : 'Exchange';

	// renders websocket client
	if (params.render) {
		const files = await renderRustWsClientFromAsyncApi(asyncapi, exchangeName);
		console.log(`render files: ${files.length}`);
		const collection: React.ReactElement[] = [];
		for (const file of files) {
			collection.push(file.render());
		}
		return collection;
		// return rendered;
	} else {
		return [];
	}
}

