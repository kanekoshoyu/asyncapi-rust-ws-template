
import { AsyncAPIDocumentV2 } from '@asyncapi/parser';
import { render_main } from "./main.rs";
import { render_readme } from './README.md';
import { render_cargo } from './Cargo.toml';
interface TemplateProps {
  asyncapi: AsyncAPIDocumentV2;
  params: any;
}


export default function ({ asyncapi, params }: TemplateProps) {
  // return a set of files
  return [render_main(), render_readme(), render_cargo()];
}

