import { AsyncAPIDocumentV2, ChannelInterface, ChannelsInterface, ComponentsInterface, InfoInterface, MessageInterface, MessagesInterface, SchemaInterface, ServerInterface, ServersInterface, ServerVariableInterface, ServerVariablesInterface } from '@asyncapi/parser';
import { containSubFunction } from "./validate";
export function generateAsyncApi(subject: AsyncAPIDocumentV2): string[] {
  let generated: string[] = [];

  generated = generated.concat(generateInfo(subject.info()));
  generated = generated.concat(generateServers(subject.servers()))
  generated = generated.concat(generateChannels(subject.channels()))
  generated = generated.concat(generateComponents(subject.components()))

  return generated;
}

function generateInfo(subject: & InfoInterface): string[] {
  let generated: string[] = [];

  let title = 'title';
  generated.push(title)

  let version = 'version';
  generated.push(version)

  return generated;
}


function generateServers(subject: & ServersInterface): string[] {
  let generated: string[] = [];

  for (const [serverName, server] of Object.entries(subject)) {
    generated = generated.concat(generateServer(server))
  }

  return generated;
}

function generateServer(subject: & ServerInterface): string[] {
  let generated: string[] = [];

  let url = 'url';
  generated.push(url)


  let protocol = 'protocol';
  generated.push(protocol)


  let variables = 'variables';
  generated = generated.concat(generateServerVariables(subject.variables()))


  return generated;
}

function generateServerVariables(subject: & ServerVariablesInterface): string[] {
  let generated: string[] = [];

  for (const [_, variable] of Object.entries(subject)) {
    generated = generated.concat(generateServerVariable(variable))
  }

  return generated;
}


function generateServerVariable(subject: & ServerVariableInterface): string[] {
  let generated: string[] = [];

  if (!subject.defaultValue()) {
    generated.push(`subject generated default value`);
  }

  return generated;
}

function generateChannels(subject: & ChannelsInterface): string[] {
  let generated: string[] = [];

  for (const [_, channel] of Object.entries(subject)) {
    generated = generated.concat(generateChannel(channel))
  }

  return generated;
}

function generateChannel(subject: & ChannelInterface): string[] {
  let generated: string[] = [];

  let messages = 'messages';
  if (containSubFunction(subject, messages)) {
    generated = generated.concat(generateMessages(subject.messages()))
  }

  return generated;
}

function generateMessages(subject: & MessagesInterface): string[] {
  let generated: string[] = [];

  if (Object.keys(subject).length === 0) {
    generated.push('generated messages');
  }
  return generated;
}

function generateComponents(subject: & ComponentsInterface): string[] {
  let generated: string[] = [];

  if (Object.keys(subject.messages()).length === 0) {
    generated.push('generated messages');
  }

  if (Object.keys(subject.schemas()).length === 0) {
    generated.push('generated schemas');
  }

  return generated;
}
