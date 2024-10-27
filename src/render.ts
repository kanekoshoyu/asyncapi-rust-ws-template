import { AsyncAPIDocumentInterface, } from '@asyncapi/parser';
import { renderClientDir } from './renderClient';
import { renderReadme } from './renderReadMe';
import { renderCargo } from './renderCargo';
import { renderModels } from './renderModel';
import { renderLibRs } from './renderLib';
import { RenderFile } from './renderFile';

/// render rust websocket client from asyncapi
export async function renderRustWsClientFromAsyncApi(exchangeName: string, doc: AsyncAPIDocumentInterface): Promise<RenderFile[]> {
  let root: RenderFile[] = [renderLibRs(doc), renderReadme(), renderCargo(exchangeName, doc.info())];
  let model: RenderFile[] = await renderModels(doc);
  model = appendFileNamePrefix(model, 'src/model/');

  let rendered: RenderFile[] = [];
  // root, model, client
  rendered.push(...root);
  rendered.push(...model);
  rendered.push(...renderClientDir(exchangeName, doc.servers()));

  // in the end we just have to return the dir
  return rendered;
}

/**
 * append prefix to the array of filename
 */
function appendFileNamePrefix(files: RenderFile[], prefix: string): RenderFile[] {
  let collection: RenderFile[] = [];
  for (let file of files) {
    file.filePath = prefix + file.filePath
    collection.push(file)
  }
  return collection;
}