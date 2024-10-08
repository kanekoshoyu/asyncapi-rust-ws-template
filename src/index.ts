
import { AsyncAPIDocumentV2, ChannelInterface, SchemaInterface, ServerInterface } from '@asyncapi/parser';
import { render_main } from "./main.rs";
import { render_readme } from './README.md';
import { render_cargo } from './Cargo.toml';
import { validate } from '@asyncapi/parser/esm/validate';

interface TemplateParams {
  // Generator standard parameters (if used)
  server?: string;
  schema?: string;
  forceWrite?: boolean;

  // custom input
  framework?: 'tokio-tungstenite' | 'async-tungstenite';
}


interface TemplateProps {
  asyncapi: AsyncAPIDocumentV2;
  params: TemplateParams;
}


export default function ({ asyncapi, params }: TemplateProps) {
  // TODO: there should be server and channel
  let missing_component = missingAsyncApiComponent(asyncapi);
  console.log("missing: " + missing_component)
  let data = validateFile(asyncapi);

  asyncapi.servers()

  // return a set of files
  return [render_main(), render_readme(), render_cargo()];
}

/// determines the sub function availability
function containSubFunction(object: any, funcName: string): boolean {
  return (typeof object[funcName] === 'function')
}

/// list out missing subfunctions
function missingSubFunctions(object: any, funcNames: string[]): string[] {
  let missing: string[] = [];
  funcNames.forEach((funcName) => {
    if (!containSubFunction(object, funcName)) {
      missing.push(funcName)
    }
  });
  return missing;
}


function missingAsyncApiComponent(asyncapi: any): string[] {
  // List of components to check
  const components = ['channels', 'servers', 'info', 'components', 'messages', 'schemas'];
  const nested_components = ['allChannels', 'allServers', 'allComponents', 'allMessages', 'allSchemas'];
  let found: string[] = [];
  let missing: string[] = [];
  // loop through each component and check if it exists on the asyncapi object
  components.forEach((component) => {
    if (typeof asyncapi[component] === 'function') {
      found.push(component)
    } else {
      missing.push(component)
    }
  });
  // nested
  nested_components.forEach((component) => {
    if (typeof asyncapi[component] === 'function') {
      found.push(component)
    } else {
      missing.push(component)
    }
  });
  return missing;
}



interface AsyncAPIDocument {
  servers: Record<string, any>;
  channels: Record<string, any>;
  components?: {
    messages?: Record<string, any>;
    schemas?: Record<string, any>;
  };
}

function validateFile(asyncapi: AsyncAPIDocumentV2) {
  const required = ['servers', 'channels', 'info', 'components'];
  return missingSubFunctions(asyncapi, required).length == 0;
}

function validateServer(server: ServerInterface) {
  const required = ['channels', 'id', 'protocol'];
  return missingSubFunctions(server, required).length == 0;
}

function validateChannel(channel: ChannelInterface) {
  const required = ['channels', 'id', 'protocol'];
  return missingSubFunctions(channel, required).length == 0;

}