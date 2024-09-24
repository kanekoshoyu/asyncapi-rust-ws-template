// import { GetSubscriberFlags, GetPublisherFlags, hasPubOrSub, hasSub } from '../components/common';
// import { publishConfigsFrom } from '../components/Handlers';
import { render } from "main.rs"

// guidelines
// render_X() -> returns <file>
// conent_X() -> returns String

// return array of file objects for render 
export default function ({ asyncapi, params }) {
  console.log("Hello, World!");

  return [render()];

  // return render_main_rs() + render_schema(asyncapi);
}