import { RenderFile } from './tool';
import { AsyncAPIDocumentInterface } from '@asyncapi/parser';
import { pascalcase, underscore } from '../format';

function content(doc: AsyncAPIDocumentInterface): string {
  let texts: string[] = [];

  for (let server of doc.servers()) {
    let serverName = pascalcase(server.id());
    let text = `
      mod client_${serverName}.rs;
    `;
    texts.concat(text)
  }

  return `
//
${texts}
    `;
}

// TODO store src/lib.rs
export function renderLibRs(doc: AsyncAPIDocumentInterface): RenderFile {
  return new RenderFile("src_lib.rs", content(doc));

}
