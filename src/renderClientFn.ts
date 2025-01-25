import { ChannelInterface } from '@asyncapi/parser';
import { FormatHelpers } from '@asyncapi/modelina';
import { prependLines } from './tool';


/** client function generated according to channel's operation patterns */
export function contentClientFunction(channel: ChannelInterface, exchangeName: string, serverName: string): string {
	const params = channel.parameters();
	for (const param of params) {
		console.log(`param: ${param}`)
	}

	// select function logic accordingly
	const txCount = channel.operations().filterBySend().length;
	const rxCount = channel.operations().filterByReceive().length;

	if (rxCount == 1 && txCount == 0) {
		return contentClientFunctionReceive(channel, exchangeName, serverName);
	} else if (rxCount == 1 && txCount == 1) {
		return contentClientFunctionSendReceive(channel);
	} else {
		return contentClientFunctionUnmapped(channel);
	}
}

/** client function for unmapped case */
export function contentClientFunctionUnmapped(channel: ChannelInterface): string {
	const txOperations = channel.operations().filterBySend();
	const rxOperations = channel.operations().filterByReceive();
	const txCount = txOperations.length;
	const rxCount = rxOperations.length;
	return `
/// ${channel.description()}
pub async fn ${FormatHelpers.toSnakeCase(channel.id())}(&self) {
	todo!("unmapped case, check the logic and implement this case, send=${txCount}, receive=${rxCount}");
} 
`.trim();
}

/** client function for 0 send, 1 receive */
export function contentClientFunctionReceive(channel: ChannelInterface, exchangeName: string, serverName: string): string {
	const channelId = FormatHelpers.toSnakeCase(channel.id());
	// receive
	const rxMessage = channel.operations().filterByReceive()[0].messages()[0];
	const rxPayload = rxMessage.payload();
	let rxPayloadId = "undefined";
	if (rxPayload) {
		rxPayloadId = FormatHelpers.toPascalCase(rxPayload.id());
	}
	// result
	return `
/// ${channel.description()}  
/// receive: ${rxPayloadId}  
/// \`\`\`
${prependLines(contentClientFunctionRxDocTest(channel, exchangeName, serverName), "/// ")}
/// \`\`\`
pub async fn ${channelId}(&mut self) -> Result<Stream<(), ${rxPayloadId}>> {
	let endpooint_url = format!("{}{}", self.base_url, "${channel.address()}");

	let(ws_stream, _) = connect_async(endpooint_url).await.map_err(| err | {
		eprintln!("Failed to connect: {:?}", err);
		err
	}) ?;

	Ok(TypedWebSocketStream::new(ws_stream))
} 
`.trim();
}

/** client function for 1 send, 1 receive */
export function contentClientFunctionSendReceive(channel: ChannelInterface): string {
	const channelId = FormatHelpers.toSnakeCase(channel.id());
	// send
	const txMessage = channel.operations().filterBySend()[0].messages()[0];
	const txPayload = txMessage.payload();
	let txPayloadId = "undefined";
	if (txPayload) {
		txPayloadId = FormatHelpers.toPascalCase(txPayload.id());
	}
	// receive
	const rxMessage = channel.operations().filterByReceive()[0].messages()[0];
	const rxPayload = rxMessage.payload();
	let rxPayloadId = "undefined";
	if (rxPayload) {
		rxPayloadId = FormatHelpers.toPascalCase(rxPayload.id());
	}
	// result
	return `
/// ${channel.description()}  
/// send: ${txPayloadId}  
/// receive: ${rxPayloadId}  
pub async fn ${channelId}(&mut self) -> Result<Stream<${txPayloadId}, ${rxPayloadId}>> {
	let endpooint_url = format!("{}{}", self.base_url, "${channel.address()}");

	let(ws_stream, _) = connect_async(endpooint_url).await.map_err(| err | {
		eprintln!("Failed to connect: {:?}", err);
		err
	}) ?;

	Ok(TypedWebSocketStream::new(ws_stream))
} 
`.trim();
}


/** doctest for simple receive */
export function contentClientFunctionRxDocTest(channel: ChannelInterface, exchangeName: string, serverName: string): string {
	const channelId = FormatHelpers.toSnakeCase(channel.id());
	const exchangeSnake = FormatHelpers.toSnakeCase(exchangeName);
	const exchangePascal = FormatHelpers.toPascalCase(exchangeName);
	const serverSnake = FormatHelpers.toSnakeCase(serverName);
	const serverPascal = FormatHelpers.toPascalCase(serverName);
	const clientName = `${exchangePascal}${serverPascal}Client`;
	return `
#[tokio::main]
async fn main() {
	use exchange_collection_ws_${exchangeSnake}::client::${serverSnake}::${clientName};
	let mut client = ${clientName}::new().await;
    let mut stream = client.${channelId}().await.expect("failed connecting websocket stream");
    let message = stream.receive().await.expect("failed receiving message");
    println!("{:?}", message);
}
`.trim().replaceAll("\t", "    ");
}
