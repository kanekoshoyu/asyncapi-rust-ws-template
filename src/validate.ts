import { AsyncAPIDocumentV2, ChannelInterface, ChannelsInterface, ComponentsInterface, InfoInterface, MessageInterface, MessagesInterface, SchemaInterface, ServerInterface, ServersInterface, ServerVariableInterface, ServerVariablesInterface } from '@asyncapi/parser';

/// determines the sub function availability
function containSubFunction(object: any, funcName: string): boolean {
  return (typeof object[funcName] === 'function')
}

export function validateFile(subject: AsyncAPIDocumentV2): string[] {
  let missing: string[] = [];

  let info = 'info';
  if (!containSubFunction(subject, info)) {
    missing.push(info);
  } else {
    missing = missing.concat(validateInfo(subject.info()));
  }

  let servers = 'servers';
  if (!containSubFunction(subject, servers)) {
    missing.push(servers)
  } else {
    missing = missing.concat(validateServers(subject.servers()))
  }

  let channels = 'channels';
  if (!containSubFunction(subject, channels)) {
    missing.push(channels)
  } else {
    missing = missing.concat(validateChannels(subject.channels()))
  }


  let components = 'components';
  if (!containSubFunction(subject, components)) {
    missing.push(components)
  } else {
    missing.push(validateComponents(subject.components()))
  }
  return missing;
}

function validateInfo(subject: & InfoInterface): string[] {
  let missing: string[] = [];

  let title = 'title';
  if (!containSubFunction(subject, title)) {
    missing.push(title)
  }

  let version = 'version';
  if (!containSubFunction(subject, version)) {
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
  if (!containSubFunction(subject, url)) {
    missing.push(url)
  }

  let protocol = 'protocol';
  if (!containSubFunction(subject, protocol)) {
    missing.push(protocol)
  }

  let variables = 'variables';
  if (containSubFunction(subject, variables)) {
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
  let missing: string[] = [];

  let messages = 'messages';
  if (containSubFunction(subject, messages)) {
    missing = missing.concat(validateMessages(subject.messages()))
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
