import { AsyncAPIDocumentInterface, } from '@asyncapi/parser';
import { renderClientDir } from './src/client/_client';
import { renderReadme } from './_render/README.md';
import { renderCargo } from './_render/Cargo.toml';
import { renderModels } from './src/model/_model';
import { renderLibRs } from './_render/lib.rs';

/// render rust websocket client from asyncapi
export async function renderRustWsClientFromAsyncApi(exchangeName: string, doc: AsyncAPIDocumentInterface) {
  let rendered: React.ReactElement[] = [renderLibRs(doc), renderReadme(), renderCargo(exchangeName, doc.info()),];

  rendered = rendered.concat(await renderModels(doc));

  rendered = rendered.concat(renderClientDir(exchangeName, doc.servers()));

  // in the end we just have to return the dir
  // but we have to do nested file and use the directory accordingly
  // stody how people manage the output directory 
  return rendered;
}