import { AsyncAPIDocumentInterface, } from '@asyncapi/parser';
import { renderClientDir } from './renderClient';
import { renderReadme } from './renderReadMe';
import { renderCargo } from './renderCargo';
import { renderModels } from './renderModel';
import { renderLibRs } from './renderLib';
import { RenderFile } from './renderFile';

/// render rust websocket client from asyncapi
export async function renderRustWsClientFromAsyncApi(doc: AsyncAPIDocumentInterface, exchangeName: string): Promise<RenderFile[]> {
	const root: RenderFile[] = [renderLibRs(), renderReadme(exchangeName), renderCargo(doc.info(), exchangeName)];
	let model: RenderFile[] = await renderModels(doc);
	model = appendFileNamePrefix(model, 'src/model/');

	const rendered: RenderFile[] = [];
	// root, model, client
	rendered.push(...root);
	rendered.push(...model);
	rendered.push(...renderClientDir(doc.servers(), exchangeName));

	// in the end we just have to return the dir
	return rendered;
}

/**
 * append prefix to the array of filename
 */
function appendFileNamePrefix(files: RenderFile[], prefix: string): RenderFile[] {
	const collection: RenderFile[] = [];
	for (const file of files) {
		file.filePath = prefix + file.filePath
		collection.push(file)
	}
	return collection;
}