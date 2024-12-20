import { AsyncAPIDocumentInterface } from '@asyncapi/parser';

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
	const missing: string[] = [];

	// metadata
	if (item.version == undefined) {
		missing.push('version');
	}
	if (item.defaultContentType == undefined) {
		missing.push('defaultContentType');
	}
	if (item.hasDefaultContentType == undefined) {
		missing.push('hasDefaultContentType');
	}
	if (item.info == undefined) {
		missing.push('info');
	}
	// root
	if (item.servers == undefined) {
		missing.push('servers');
	}
	if (item.channels == undefined) {
		missing.push('channels');
	}
	if (item.operations == undefined) {
		missing.push('operations');
	}
	if (item.messages == undefined) {
		missing.push('messages');
	}
	if (item.schemas == undefined) {
		missing.push('schemas');
	}
	if (item.securitySchemes == undefined) {
		missing.push('securitySchemes');
	}
	if (item.components == undefined) {
		missing.push('components');
	}
	// all
	if (item.allServers == undefined) {
		missing.push('allServers');
	}
	if (item.allChannels == undefined) {
		missing.push('allChannels');
	}
	if (item.allOperations == undefined) {
		missing.push('allOperations');
	}
	if (item.allMessages == undefined) {
		missing.push('allMessages');
	}
	if (item.allSchemas == undefined) {
		missing.push('allSchemas');
	}
	return missing.map(i => 'root.' + i);
}
