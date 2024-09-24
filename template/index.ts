import React from 'react';
import { File } from '@asyncapi/generator-react-sdk';
// import { GetSubscriberFlags, GetPublisherFlags, hasPubOrSub, hasSub } from '../components/common';
// import { publishConfigsFrom } from '../components/Handlers';

// guidelines
// render_X() -> returns <file>
// conent_X() -> returns String

// function render_schema({ asyncapi: AsyncAPI }) {
//   const schemas = asyncapi.allSchemas();
//   const files = [];
//   // schemas is an instance of the Map
//   schemas.forEach((schema) => {

//     files.push(
//       // We return a react file component and each time we do it, the name of the generated file will be a schema name
//       // Content of the file will be a variable representing schema
//       <File name={`${schema.id()}.js`}>
//         const { schema.id()
// } = { JSON.stringify(schema._json, null, 2) }
// </File>
//     );
//   });
// return files;
// }

// 
function content_main_rs(): string {
  return `
// main.rs
use tokio;

fn main() {
  println!("Hello world");
}
`;
}

function render_main_rs(): File {
  return (<File name= "main.rs" > { content_main_rs() } </File>);
}

// return array of file objects for render 
export default function ({ asyncapi, params }): [File] {
  // accept inputsm asynca
  // parse the document into some sort of AsyncAPI DSL
  // generate the Rust Code
  console.log("Hello, World!");

  return [render_main_rs()];

  // return render_main_rs() + render_schema(asyncapi);
}