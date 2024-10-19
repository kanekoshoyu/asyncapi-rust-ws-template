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
  let missing: string[] = [];
  let alias = 'root.';
  if (subject.info == undefined) {
    missing.push(alias + 'info');
  } else {
    missing = missing.concat(validateInfo(subject.info()));
  }

  if (subject.servers == undefined) {
    missing.push(alias + 'servers')
  } else {
    missing = missing.concat(validateServers(subject.servers()))
  }

  if (subject.channels == undefined) {
    missing.push(alias + 'channels')
  } else {
    missing = missing.concat(validateChannels(subject.channels()))
  }

  if (subject.components == undefined) {
    missing.push(alias + 'components')
  } else {
    missing = missing.concat(validateComponents(subject.components()))
  }

  if (subject.operations == undefined) {
    missing.push(alias + 'operations')
  }

  if (subject.operations == undefined) {
    missing.push(alias + 'operations')
  }

  return missing;
}

function validateInfo(subject: & InfoInterface): string[] {
  let missing: string[] = [];

  let title = 'title';
  if (subject.title == undefined) {
    missing.push(title)
  }

  let version = 'version';
  if (subject.version == undefined) {
    missing.push(version)
  }

  return missing;
}


function validateServers(subject: & ServersInterface): string[] {
  let missing: string[] = [];

  for (const [serverName, server] of Object.entries(subject)) {
    missing = missing.concat(validateServer(server))
  }

  return missing;
}

function validateServer(subject: & ServerInterface): string[] {
  let missing: string[] = [];

  let url = 'url';
  if (subject.url == undefined) {
    missing.push(url)
  }

  let protocol = 'protocol';
  if (subject.protocol == undefined) {
    missing.push(protocol)
  }

  let variables = 'variables';
  if (subject.variables == undefined) {
    missing = missing.concat(validateServerVariables(subject.variables()))
  }

  return missing;
}

function validateServerVariables(subject: & ServerVariablesInterface): string[] {
  let missing: string[] = [];

  for (const [_, variable] of Object.entries(subject)) {
    missing = missing.concat(validateServerVariable(variable))
  }

  return missing;
}


function validateServerVariable(subject: & ServerVariableInterface): string[] {
  let missing: string[] = [];

  if (!subject.defaultValue()) {
    missing.push(`subject missing default value`);
  }

  return missing;
}

function validateChannels(subject: & ChannelsInterface): string[] {
  let missing: string[] = [];

  for (const [_, channel] of Object.entries(subject)) {
    missing = missing.concat(validateChannel(channel))
  }

  return missing;
}

function validateChannel(subject: & ChannelInterface): string[] {
  let alias = "channel.";
  let missing: string[] = [];

  if (subject.id == undefined) {
    console.log(`${alias}id is missing`)
  }

  if (subject.address == undefined) {
    console.log(`${alias}address is missing`)
  }

  if (subject.servers == undefined) {
    console.log(`${alias}servers is missing`)
  }

  if (subject.operations == undefined) {
    console.log(`${alias}operations is missing`)
  }

  if (subject.messages == undefined) {
    console.log(`${alias}messages is missing`)
  }

  if (subject.parameters === undefined) {
    console.log(`${alias}parameters is missing`)
  } else {
    let str = JSON.stringify(subject.parameters(), null, 2);
    write_json(str, "./test.json");

  }

  if (subject.bindings == undefined) {
    console.log(`${alias}bindings is missing`)
  }

  if (subject.meta == undefined) {
    console.log(`${alias}meta is missing`)
  }



  return missing;
}

function validateMessages(subject: & MessagesInterface): string[] {
  let missing: string[] = [];

  if (Object.keys(subject).length === 0) {
    missing.push('missing messages');
  }
  return missing;
}

function validateComponents(subject: & ComponentsInterface): string[] {
  let missing: string[] = [];

  if (Object.keys(subject.messages()).length === 0) {
    missing.push('missing messages');
  }

  if (Object.keys(subject.schemas()).length === 0) {
    missing.push('missing schemas');
  }

  return missing;
}
