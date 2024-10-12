
import { AsyncAPIDocumentV2, ChannelInterface, ComponentsInterface, InfoInterface, SchemaInterface, ServerInterface } from '@asyncapi/parser';
import { RustGenerator } from '@asyncapi/modelina';
import { render_main } from "./main.rs";
import { render_readme } from './README.md';
import { render_cargo } from './Cargo.toml';
import { validateFile } from './validate';
import { getAsyncApiYamlFiles } from './rmeote_file';

interface TemplateParams {
  // Generator standard parameters (if used)
  server?: string;
  schema?: string;
  forceWrite?: boolean;
  // custom input
  validate: boolean;
  generate: boolean;
  framework?: 'tokio-tungstenite' | 'async-tungstenite';
}


interface TemplateProps {
  asyncapi: AsyncAPIDocumentV2;
  params: TemplateParams;
}


export default async function ({ asyncapi, params }: TemplateProps) {
  // validates a AsyncAPI file
  if (params.validate) {
    let missing = validateFile(asyncapi);
    if (missing.length > 0) {
      console.log("missing: " + missing);
    } else {
      console.log("all files verified");
    }
  }

  // generates websocket client
  if (params.generate) {
    let result = [render_main(), render_readme(), render_cargo()];
    console.log("all files generated");
    return result;
  } else {
    return [];
  }
}


/**
* Experimental use of modellina
* TODO: complete this
*/
export async function render_model(asyncapi: AsyncAPIDocumentV2) {
  const generator = new RustGenerator();
  const models = await generator.generate(asyncapi);
}