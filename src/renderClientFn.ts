import { ChannelInterface, MessageInterface } from '@asyncapi/parser';
import { FormatHelpers } from '@asyncapi/modelina';
import { prependLines } from './tool';

interface GeneratedCode {
	enumCode: string[];
	fnCode: string[];
}

/** client function generated according to channel's operation patterns, 
 * return array of generated EnumCode and FnCode */
export function contentClientFn(channel: ChannelInterface, exchangeName: string, serverName: string): GeneratedCode {
	const params = channel.parameters();
	for (const param of params) {
		console.log(`param: ${param}`)
	}

	// select function logic accordingly
	const txCount = channel.operations().filterBySend().length;
	const rxCount = channel.operations().filterByReceive().length;

	if (txCount == 0 && rxCount == 1) {
		return contentClientFnS0R1(channel, exchangeName, serverName);
	} else if (txCount == 1 && rxCount == 1) {
		return contentClientFunctionS1R1(channel);
	} else if (txCount == 1) {
		return contentClientFunctionS1RN(channel);
	} else {
		// S0R0, S0RN, S1R0, SN
		return contentClientFunctionUnmapped(channel);

	}
}

/** client function for send 0, receive 1 */
export function contentClientFnS0R1(channel: ChannelInterface, exchangeName: string, serverName: string): GeneratedCode {
	const channelId = FormatHelpers.toSnakeCase(channel.id());
	// receive
	const rxMessage = channel.operations().filterByReceive()[0].messages()[0];
	const rxPayload = rxMessage.payload();
	let rxPayloadId = "undefined";
	if (rxPayload) {
		rxPayloadId = FormatHelpers.toPascalCase(rxPayload.id());
	}
	// result
	const fnCode = `
/// ${channel.description()}  
/// receive: ${rxPayloadId}  
/// \`\`\`
${prependLines(contentClientFnRxDocTest(channel, exchangeName, serverName), "/// ")}
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
	return {
		enumCode: [],
		fnCode: [fnCode]
	};
}

/** client function for send 1, receive 1 */
export function contentClientFunctionS1R1(channel: ChannelInterface): GeneratedCode {
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
	const fnCode = `
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
	return {
		enumCode: [],
		fnCode: [fnCode]
	};
}



/** client function for 1 send, N receive */
export function contentClientFunctionS1RN(channel: ChannelInterface): GeneratedCode {
	const channelId = FormatHelpers.toSnakeCase(channel.id());
	// send
	const txMessage = channel.operations().filterBySend()[0].messages()[0];
	const txPayload = txMessage.payload();
	let txPayloadId = "undefined";
	if (txPayload) {
		txPayloadId = FormatHelpers.toPascalCase(txPayload.id());
	}

	// Receive as a union response
	const rxOperations = channel.operations().filterByReceive();
	const rxMessages: MessageInterface[] = [];
	for (const rxOperation of rxOperations) {
		const rxMessage = rxOperation.messages()[0];
		rxMessages.push(rxMessage);
	}

	// enum for union response
	const rxChannelName = FormatHelpers.toPascalCase(channelId);
	const rxEnumName = `${rxChannelName}EnumResponse`;
	let rxEnumCode = `
/// union response for channel: ${rxChannelName}
#[derive(Clone, Debug, Serialize, Deserialize)]
pub enum ${rxEnumName} {
	`;
	for (const rxMessage of rxMessages) {
		const messageId = FormatHelpers.toPascalCase(rxMessage.id());
		const payloadId = FormatHelpers.toPascalCase(rxMessage.payload()?.id() ?? "undefined");
		rxEnumCode += `\t/// message: ${messageId}, payload: ${payloadId}\n\t${messageId}(${payloadId}),
`;
	}
	rxEnumCode += `}
`;

	// fn
	const fnCode = `
/// ${channel.description()}  
/// send: ${txPayloadId}  
/// receive: ${rxEnumName}
pub async fn ${channelId}(& mut self) -> Result<Stream<${txPayloadId}, ${rxEnumName}>> {
		let endpooint_url = format!("{}{}", self.base_url, "${channel.address()}");

		let(ws_stream, _) = connect_async(endpooint_url).await.map_err(| err | {
			eprintln!("Failed to connect: {:?}", err);
		err
		}) ?;

		Ok(TypedWebSocketStream::new(ws_stream))
}
`;

	return {
		enumCode: [rxEnumCode.trim()],
		fnCode: [fnCode.trim()]
	};
}

/** client function for unmapped case */
export function contentClientFunctionUnmapped(channel: ChannelInterface): GeneratedCode {
	const txOperations = channel.operations().filterBySend();
	const rxOperations = channel.operations().filterByReceive();
	const txCount = txOperations.length;
	const rxCount = rxOperations.length;
	const fnCode = `
/// ${channel.description()}
pub async fn ${FormatHelpers.toSnakeCase(channel.id())}(&self) {
	todo!("unmapped case, check the logic and implement this case, send=${txCount}, receive=${rxCount}");
} 
`.trim();
	return {
		enumCode: [],
		fnCode: [fnCode]
	};
}

/** doctest for simple receive */
export function contentClientFnRxDocTest(channel: ChannelInterface, exchangeName: string, serverName: string): string {
	const channelId = FormatHelpers.toSnakeCase(channel.id());
	const exchangeSnake = FormatHelpers.toSnakeCase(exchangeName);
	const exchangePascal = FormatHelpers.toPascalCase(exchangeName);
	const serverSnake = FormatHelpers.toSnakeCase(serverName);
	const serverPascal = FormatHelpers.toPascalCase(serverName);
	const clientName = `${exchangePascal}${serverPascal} Client`;
	return `
#[tokio::main]
async fn main() {
	use exchange_collection_ws_${exchangeSnake}:: client::${serverSnake}::${clientName};
	let mut client = ${clientName}::new ().await;
	let mut stream = client.${channelId}().await.expect("failed connecting websocket stream");
	let message = stream.receive().await.expect("failed receiving message");
	println!("{:?}", message);
}
`.trim().replaceAll("\t", "    ");
}
