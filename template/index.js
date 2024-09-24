// import { GetSubscriberFlags, GetPublisherFlags, hasPubOrSub, hasSub } from '../components/common';
// import { publishConfigsFrom } from '../components/Handlers';
import { render_main } from "main.rs"
import { render_readme } from "README.md"
import { render_cargo } from "Cargo.toml"

// guidelines
// render_X() -> returns <file>
// conent_X() -> returns String

// return array of file objects for render 
export default function ({ asyncapi, params }) {
  console.log("Hello, World!");

  return [render_main() + render_readme() + render_cargo()];

  // return render_main_rs() + render_schema(asyncapi);
}