import { ChannelInterface } from '@asyncapi/parser';
import { FormatHelpers } from '@asyncapi/modelina';
import { prependLines } from './tool';


/** client function generated according to channel's operation patterns */
export function contentClientFunction(channel: ChannelInterface, exchangeName: string): string {
	const params = channel.parameters();
	for (const param of params) {
		console.log(`param: ${param}`)
	}

	// select function logic accordingly
	const rxOperations = channel.operations().filterByReceive();
	const txOperations = channel.operations().filterBySend();
	const rxCount = rxOperations.length;
	const txCount = txOperations.length;

	if (rxCount == 0 && txCount == 1) {
		return contentClientFunctionSub(channel, exchangeName);
	} else if (rxCount == 1 && txCount == 1) {
		return contentClientFunctionPubSub(channel);
	} else {
		return contentClientFunctionUnmapped(channel);
	}
}

/** client function for unmapped case */
export function contentClientFunctionUnmapped(channel: ChannelInterface): string {
	return `
/// ${channel.description()}
pub async fn ${FormatHelpers.toSnakeCase(channel.id())}(&self) {
	todo!("unmapped case, check the logic and implement this case");
} 
`.trim();
}

/** client function for 1 pub, 1 sub */
export function contentClientFunctionPubSub(channel: ChannelInterface): string {
	const channelId = FormatHelpers.toSnakeCase(channel.id());
	// pub
	const pubMessage = channel.operations().filterByReceive()[0].messages()[0];
	const pubPayload = pubMessage.payload();
	let pubPayloadId = "undefined";
	if (pubPayload) {
		pubPayloadId = FormatHelpers.toPascalCase(pubPayload.id());
	}
	// sub
	const subMessage = channel.operations().filterBySend()[0].messages()[0];
	const subPayload = subMessage.payload();
	let subPayloadId = "undefined";
	if (subPayload) {
		subPayloadId = FormatHelpers.toPascalCase(subPayload.id());
	}
	// result
	return `
/// ${channel.description()}  
/// publish: ${pubPayloadId}  
/// subscribe: ${subPayloadId}  
pub async fn ${channelId}(&mut self) -> Result<Stream<${pubPayloadId}, ${subPayloadId}>> {
	let endpooint_url = format!("{}{}", self.base_url, "${channel.address()}");

	let(ws_stream, _) = connect_async(endpooint_url).await.map_err(| err | {
		eprintln!("Failed to connect: {:?}", err);
		err
	}) ?;

	Ok(TypedWebSocketStream::new(ws_stream))
} 
`.trim();
}


/** client function for 0 pub, 1 sub */
export function contentClientFunctionSub(channel: ChannelInterface, exchangeName: string): string {
	const channelId = FormatHelpers.toSnakeCase(channel.id());
	// sub
	const subMessage = channel.operations().filterBySend()[0].messages()[0];
	const subPayload = subMessage.payload();
	let subPayloadId = "undefined";
	if (subPayload) {
		subPayloadId = FormatHelpers.toPascalCase(subPayload.id());
	}
	// result
	return `
/// ${channel.description()}  
/// subscribe: ${subPayloadId}  
/// \`\`\`
${prependLines(contentClientFunctionSubDocTest(channel, exchangeName), "/// ")}
/// \`\`\`
pub async fn ${channelId}(&mut self) -> Result<Stream<(), ${subPayloadId}>> {
	let endpooint_url = format!("{}{}", self.base_url, "${channel.address()}");

	let(ws_stream, _) = connect_async(endpooint_url).await.map_err(| err | {
		eprintln!("Failed to connect: {:?}", err);
		err
	}) ?;

	Ok(TypedWebSocketStream::new(ws_stream))
} 
`.trim();
}

/** doctest for simple sub */
export function contentClientFunctionSubDocTest(channel: ChannelInterface, exchangeName: string): string {
	const channelId = FormatHelpers.toSnakeCase(channel.id());
	const exchangeSnake = FormatHelpers.toSnakeCase(exchangeName);
	const exchangePascal = FormatHelpers.toPascalCase(exchangeName);
	return `
#[tokio::main]
async fn main() {
	use exchange_collection_ws_${exchangeSnake}::client::public_endpoints::${exchangePascal}PublicEndpointsClient;
	let mut client = ${exchangePascal}PublicEndpointsClient::new().await;
    let mut stream = client.${channelId}().await.expect("failed connecting websocket stream");
    let message = stream.receive().await.expect("failed receiving message");
    println!("{:?}", message);
}
`.trim().replaceAll("\t", "    ");
}
