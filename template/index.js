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

/*
 * Each template to be rendered must have as a root component a File component,
 * otherwise it will be skipped.
 *
 * If you don't want to render anything, you can return `null` or `undefined` and then Generator will skip the given template.
 *
 * Below you can see how reusable chunks (components) could be called.
 * Just write a new component (or import it) and place it inside the File or another component.
 *
 * Notice that you can pass parameters to components. In fact, underneath, each component is a pure Javascript function.
 */
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
    return (
        <File name="main.rs">
            {`
package main

${renderDependencies(params.moduleName, asyncapi)}

func main() {
  ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM, syscall.SIGINT)
  defer stop()
}
`}
        </File>
    );
}
