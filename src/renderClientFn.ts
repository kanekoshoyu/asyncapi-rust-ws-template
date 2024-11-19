import { ChannelInterface } from '@asyncapi/parser';
import { FormatHelpers } from '@asyncapi/modelina';
import { prependLines } from './tool';


/** client function generated according to channel's operation patterns */
export function contentClientFunction(channel: ChannelInterface): string {
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
		return contentClientFunctionSub(channel);
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
pub async fn ${FormatHelpers.toSnakeCase(channel.id())}(&mut self, input: &${pubPayloadId}) -> Result<${subPayloadId}> {
	let err_parse = Error::Protocol(ProtocolError::InvalidCloseSequence);
	// pub
	let json_str = serde_json::to_string(input).map_err(|_| err_parse)?;
	self.send_message(&json_str).await?;
	// sub
	match self.receive_message().await {
		Some(Ok(Message::Text(json_str))) => {
			let err_parse = Error::Protocol(ProtocolError::InvalidCloseSequence);
			serde_json::from_str(&json_str).map_err(|_| err_parse)
		}
		_ => todo!(),
	}
} 
`.trim();
}


/** client function for 0 pub, 1 sub */
export function contentClientFunctionSub(channel: ChannelInterface): string {
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
${prependLines(contentClientFunctionSubDocTest(channel), "/// ")}
/// \`\`\`
pub async fn ${channelId}(&mut self) -> Result<${subPayloadId}> {
	match self.receive_message().await {
		Some(Ok(Message::Text(json_str))) => {
			let err_parse = Error::Protocol(ProtocolError::InvalidCloseSequence);
			serde_json::from_str(&json_str).map_err(|_| err_parse)
		}
		_ => todo!(),
	}
} 
`.trim();
}

/** doctest for simple sub */
export function contentClientFunctionSubDocTest(channel: ChannelInterface): string {
	const channelId = FormatHelpers.toSnakeCase(channel.id());
	return `
#[tokio::main]
async fn main() {
	let mut client = Client::new().await.expect("failed to setup client");
	let result = client.${channelId}().await;
	let status = result.is_ok();
	client.close().await;
	assert!(status);
}
`.trim().replaceAll("\t", "    ");
}
