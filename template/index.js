import { File } from '@asyncapi/generator-react-sdk';
// import { GetSubscriberFlags, GetPublisherFlags, hasPubOrSub, hasSub } from '../components/common';
// import { publishConfigsFrom } from '../components/Handlers';

function renderDependencies(moduleName, doc) {
  let imports = `
import (
  "context"
  "log"
  "os"
  "os/signal"
  "syscall"
  "${moduleName}/asyncapi"
)
  `;
  return imports;
}

function main_rs_content() {
  return `
// main.rs
${renderDependencies(params.moduleName, asyncapi)}

fn main() {
  println!("Hello world");
}
`;
}

// return array of file objects for render 
export default function ({ asyncapi, params }) {
  // accept inputs
  // parse the document into some sort of AsyncAPI DSL
  // generate the Rust Code
  console.log("Hello, World!");

  const informativeErrMsg = `
    Since there are no supported channels in the asyncapi document there is no code to output
    Currently supported channels are:
      AMQP Subscriber
      AMQP Publisher
  `;
  return [
    <File name="main.rs">{main_rs_content()}</File>
  ];
}