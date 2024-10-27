
import { AsyncAPIDocumentInterface } from '@asyncapi/parser';
import { validateAsyncApi } from './validate_essential';
import { renderRustWsClientFromAsyncApi } from './render';
// import { getAsyncApiYamlFiles } from './remote_file';

interface TemplateParams {
  package: string;
  validate: boolean;
  render: boolean;
  exchange: string;
  framework?: 'tokio-tungstenite' | 'async-tungstenite';
}

interface TemplateProps {
  asyncapi: AsyncAPIDocumentInterface;
  params: TemplateParams;
}


export default async function ({ asyncapi, params }: TemplateProps) {

  console.log(params);
  // validates a AsyncAPI file
  if (params.validate) {
    console.log('validating');
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

  // renders websocket client
  if (params.render) {
    console.log('rendering');
    let rendered = await renderRustWsClientFromAsyncApi(exchangeName, asyncapi);
    console.log('all files rendered');
    console.log(`render files: ${rendered.length}`);
    return rendered;
  } else {
    return [];
  }
}
