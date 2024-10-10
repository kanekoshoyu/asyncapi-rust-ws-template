
import { AsyncAPIDocumentV2, ChannelInterface, ComponentsInterface, InfoInterface, SchemaInterface, ServerInterface } from '@asyncapi/parser';
import { render_main } from "./main.rs";
import { render_readme } from './README.md';
import { render_cargo } from './Cargo.toml';
import { validateFile } from './validate';

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
  let missing = validateFile(asyncapi);
  if (missing.length > 0) {
    console.log("missing: " + missing);
  }

  // return a set of files
  return [render_main(), render_readme(), render_cargo()];
}
