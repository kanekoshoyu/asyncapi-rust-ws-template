
import { AsyncAPIDocumentV2, ChannelInterface, ComponentsInterface, InfoInterface, SchemaInterface, ServerInterface } from '@asyncapi/parser';
import { RustGenerator } from '@asyncapi/modelina';
import { validateAsyncApi } from './validate_full';
import { renderRustWsClientFromAsyncApi } from './render';
// import { getAsyncApiYamlFiles } from './remote_file';

interface TemplateParams {
  // Generator standard parameters (if used)
  server?: string;
  schema?: string;
  forceWrite?: boolean;
  // custom input
  validate: boolean;
  render: boolean;
  // either provided, or derived from filename
  exchange: string;
  framework?: 'tokio-tungstenite' | 'async-tungstenite';
}

interface TemplateProps {
  asyncapi: AsyncAPIDocumentV2;
  params: TemplateParams;
}


export default async function ({ asyncapi, params }: TemplateProps) {
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

  // renders websocket client
  if (params.render) {
    let rendered = renderRustWsClientFromAsyncApi(exchangeName, asyncapi);
    console.log("all files rendered");
    console.log(`render files: ${rendered.length}`);
    return rendered;
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
  // const models = await generator.render(asyncapi);
}