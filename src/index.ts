
import { AsyncAPIDocumentV2, ChannelInterface, ComponentsInterface, InfoInterface, SchemaInterface, ServerInterface } from '@asyncapi/parser';
import { RustGenerator } from '@asyncapi/modelina';
import { render_main } from "./render/main.rs";
import { render_readme } from './render/README.md';
import { render_cargo } from './render/Cargo.toml';
import { validateAsyncApi } from './validate';
import { generateAsyncApi } from './generate';
// import { getAsyncApiYamlFiles } from './remote_file';

interface TemplateParams {
  // Generator standard parameters (if used)
  server?: string;
  schema?: string;
  forceWrite?: boolean;
  // custom input
  validate: boolean;
  generate: boolean;
  // either provided, or derived from filename
  exchange: string;
  framework?: 'tokio-tungstenite' | 'async-tungstenite';
}

interface TemplateProps {
  asyncapi: AsyncAPIDocumentV2;
  params: TemplateParams;
}


export default async function ({ asyncapi, params }: TemplateProps) {
  // parameter
  // validates a AsyncAPI file
  if (params.validate) {
    let missing = validateAsyncApi(asyncapi);
    if (missing.length > 0) {
      console.log("missing: " + missing);
      return [];
    } else {
      console.log("all files verified");
    }
  }
  let exchangeName = "binance";

  // generates websocket client
  if (params.generate) {
    let result = [render_main(), render_readme(), render_cargo(exchangeName, asyncapi.info())];
    let top_down = generateAsyncApi(asyncapi);
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