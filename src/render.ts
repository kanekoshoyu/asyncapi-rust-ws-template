import { AsyncAPIDocumentInterface, } from '@asyncapi/parser';
import { renderClientDir } from './_render/_client';
import { renderReadme } from './_render/README.md';
import { renderCargo } from './_render/Cargo.toml';
import { renderLibRs } from './_render/lib.rs';

/// render rust websocket client from asyncapi
export function renderRustWsClientFromAsyncApi(exchangeName: string, doc: AsyncAPIDocumentInterface): React.ReactElement[] {
  let rendered: React.ReactElement[] = [renderLibRs(doc), renderReadme(), renderCargo(exchangeName, doc.info())];

  rendered = rendered.concat(renderClientDir(exchangeName, doc.servers()));
  return rendered;
}