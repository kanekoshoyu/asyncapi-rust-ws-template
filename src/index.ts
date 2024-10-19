
import { AsyncAPIDocumentInterface, ChannelInterface, ComponentsInterface, InfoInterface, SchemaInterface, ServerInterface } from '@asyncapi/parser';
import { RustGenerator } from '@asyncapi/modelina';
import { validateAsyncApi } from './validate_essential';
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
  asyncapi: AsyncAPIDocumentInterface;
  params: TemplateParams;
}


export default async function ({ asyncapi, params }: TemplateProps) {
  // validates a AsyncAPI file
  if (params.validate) {
    let missing_items = validateAsyncApi(asyncapi);
    if (missing_items.length > 0) {
      console.log('missing below');
      for (let missing_item of missing_items) {
        console.log(missing_item);
      }
      return [];
    } else {
      console.log('all files verified');
    }
  }
  let exchangeName = 'binance';

  // // renders websocket client
  // if (params.render) {
  //   let rendered = renderRustWsClientFromAsyncApi(exchangeName, asyncapi);
  //   console.log('all files rendered');
  //   console.log(`render files: ${rendered.length}`);
  //   return rendered;
  // } else {
  //   return [];
  // }
}


/**
* Experimental use of modellina
* TODO: complete this
*/
export async function render_model(asyncapi: AsyncAPIDocumentInterface) {
  const generator = new RustGenerator();
  // const models = await generator.render(asyncapi);
}