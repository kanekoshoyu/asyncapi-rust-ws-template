import { AsyncAPIDocumentV2, ChannelInterface, ChannelsInterface, ComponentsInterface, InfoInterface, MessageInterface, MessagesInterface, SchemaInterface, ServerInterface, ServersInterface, ServerVariableInterface, ServerVariablesInterface } from '@asyncapi/parser';

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
export function validateAsyncApi(subject: AsyncAPIDocumentV2): string[] {
  const missing: string[] = [];
  const alias = 'root.';

  // List of method names to check
  const methodNames = [
    'version',
    'defaultContentType',
    'hasDefaultContentType',
    'info',
    'servers',
    'channels',
    'operations',
    'messages',
    'schemas',
    'securitySchemes',
    'components',
    'allServers',
    'allChannels',
    'allOperations',
    'allMessages',
    'allSchemas',
    'extensions',
  ];

  // Loop through the method names and check if they are undefined
  methodNames.forEach((methodName) => {
    if (typeof subject[methodName] === 'undefined') {
      missing.push(`${alias}${methodName}`);
    }
  });

  return missing;
}