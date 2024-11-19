import { AsyncAPIDocumentInterface, ChannelInterface, ChannelsInterface, ComponentsInterface, InfoInterface, MessagesInterface, ServerInterface, ServersInterface, ServerVariableInterface, ServerVariablesInterface } from '@asyncapi/parser';
import { writeFile } from 'fs';

export function write_json(data: string, filename: string) {
	writeFile(filename, data, 'utf8', (err) => {
		if (err) {
			console.error('Error writing to the file:', err);
			return;
		}
		console.log('JSON file has been written successfully!');
	});
}


export function validateAsyncApi(item: AsyncAPIDocumentInterface): string[] {
	let missing: string[] = [];
	if (item.info == undefined) {
		missing.push('info');
	} else {
		missing = missing.concat(validateInfo(item.info()));
	}

	if (item.servers == undefined) {
		missing.push('servers')
	} else {
		missing = missing.concat(validateServers(item.servers()))
	}

	if (item.channels == undefined) {
		missing.push('channels')
	} else {
		missing = missing.concat(validateChannels(item.channels()))
	}

	if (item.components == undefined) {
		missing.push('components')
	} else {
		missing = missing.concat(validateComponents(item.components()))
	}

	if (item.operations == undefined) {
		missing.push('operations')
	}

	if (item.operations == undefined) {
		missing.push('operations')
	}

	return missing.map(i => 'root.' + i);
}

function validateInfo(item: & InfoInterface): string[] {
	const missing: string[] = [];

	const title = 'title';
	if (item.title == undefined) {
		missing.push(title)
	}

	const version = 'version';
	if (item.version == undefined) {
		missing.push(version)
	}

	return missing.map(i => 'info' + i);;
}


function validateServers(items: & ServersInterface): string[] {
	let missing: string[] = [];

	for (const item of items) {
		missing = missing.concat(validateServer(item))
	}

	return missing.map(i => 'servers.' + i);
}

function validateServer(item: & ServerInterface): string[] {
	let missing: string[] = [];

	if (item.url == undefined) {
		missing.push('url')
	}
	if (item.protocol == undefined) {
		missing.push('protocol')
	}
	if (item.variables != undefined) {
		missing = missing.concat(validateServerVariables(item.variables()))
	}

	return missing.map(i => 'server.' + i);
}

function validateServerVariables(variables: & ServerVariablesInterface): string[] {
	let missing: string[] = [];

	for (const variable of variables) {
		missing = missing.concat(validateServerVariable(variable))
	}

	return missing.map(i => 'variables.' + i);
}


function validateServerVariable(item: & ServerVariableInterface): string[] {
	const missing: string[] = [];

	if (item.defaultValue == undefined) {
		missing.push(`item missing default value`);
	}

	return missing.map(i => 'variable.' + i);;
}

function validateChannels(channels: & ChannelsInterface): string[] {
	let missing: string[] = [];

	for (const channel of channels) {
		missing = missing.concat(validateChannel(channel))
	}

	return missing.map(i => 'channels.' + i);
}

function validateChannel(item: & ChannelInterface): string[] {
	let missing: string[] = [];

	if (item.messages == undefined) {
		missing.push(`message`)
	} else {
		missing = missing.concat(validateMessages(item.messages()))
	}

	return missing.map(i => "channel." + i);
}

function validateMessages(items: & MessagesInterface): string[] {
	const missing: string[] = [];

	if (items.length == 0) {
		missing.push('missing messages');
	}
	return missing.map(i => 'messages.' + i);
}

function validateComponents(item: & ComponentsInterface): string[] {
	const missing: string[] = [];

	if (Object.keys(item.messages()).length == 0) {
		missing.push('message');
	}

	if (Object.keys(item.schemas()).length == 0) {
		missing.push('schema');
	}

	return missing.map(i => 'components.' + i);;
}
