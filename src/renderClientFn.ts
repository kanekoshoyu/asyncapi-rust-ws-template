import { ChannelInterface } from '@asyncapi/parser';
import { FormatHelpers } from '@asyncapi/modelina';

/** client function for case 0, undefined */
export function contentClientFunctionTodo(channel: ChannelInterface): string {
    return `
/// ${channel.description()}
async fn ${FormatHelpers.toSnakeCase(channel.id())}(&self) {
    todo!("uncovered case, check the logic and implement this case");
} 
`;
}

/** client function logics for case 1, undefined */
export function contentClientFunctionTransactionReceive(channel: ChannelInterface): string {
    const rx = channel.operations().filterByReceive()[0];
    const messages = rx.messages();
    // input
    let input = rx.reply();
    // output 
    let output = 'None';
    // logic
    let contentLogic = 'todo!();';

    return `
/// ${channel.description()}
/// input: ${input}
/// output: ${output}
async fn ${FormatHelpers.toSnakeCase(channel.id())}(&self) ${output} {
    ${contentLogic}
} 
`;
}

/** client function logics that is generated from channel's operations */
export function contentClientFunction(channel: ChannelInterface): string {
    const params = channel.parameters();
    for (const param of params) {
        console.log(`param: ${param}`)
    }

    // select function logic accordingly
    const rxOperations = channel.operations().filterByReceive();
    const txOperations = channel.operations().filterBySend();
    if (rxOperations.length == 1 && txOperations.length == 0) {
        return contentClientFunctionTransactionReceive(channel);
    } else {
        return contentClientFunctionTodo(channel);
    }
}