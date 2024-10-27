import { AsyncAPIDocumentInterface, } from '@asyncapi/parser';
import { renderClientDir } from './src/client/_client';
import { renderReadme } from './_render/README.md';
import { renderCargo } from './_render/Cargo.toml';
import { renderModels } from './src/model/_model';
import { renderLibRs } from './_render/lib.rs';
import { RenderFile } from './_render/tool';

/// render rust websocket client from asyncapi
export async function renderRustWsClientFromAsyncApi(exchangeName: string, doc: AsyncAPIDocumentInterface): Promise<RenderFile[]> {
  let root: RenderFile[] = [renderLibRs(doc), renderReadme(), renderCargo(exchangeName, doc.info())];
  let model: RenderFile[] = await renderModels(doc);
  model = appendFileNamePrefix(model, 'src_model_');
  console.log(`models\n ${model}`);

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