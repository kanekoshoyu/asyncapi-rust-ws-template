import { AsyncAPIDocumentV2, ChannelInterface, ChannelsInterface, ComponentsInterface, InfoInterface, MessageInterface, MessagesInterface, SchemaInterface, ServerInterface, ServersInterface, ServerVariableInterface, ServerVariablesInterface } from '@asyncapi/parser';
import { containSubFunction } from "./validate";
import { renderRustServers } from './_render/_server';
import { renderMain } from './_render/main.rs';
import { renderReadme } from './_render/README.md';
import { renderCargo } from './_render/Cargo.toml';

/// render rust websocket client from asyncapi
export function renderRustWsClientFromAsyncApi(exchangeName: string, subject: AsyncAPIDocumentV2): React.ReactElement[] {
  let rendered: React.ReactElement[] = [renderMain(), renderReadme(), renderCargo(exchangeName, subject.info())];

  rendered = rendered.concat(renderInfo(subject.info()));
  rendered = rendered.concat(renderServers(subject.servers()))
  rendered = rendered.concat(renderChannels(subject.channels()))
  rendered = rendered.concat(renderComponents(subject.components()))

  return rendered;
}

function renderInfo(subject: & InfoInterface): React.ReactElement[] {
  let rendered: React.ReactElement[] = [];

  // let title = 'title';
  // rendered.push(title)

  // let version = 'version';
  // rendered.push(version)

  return rendered;
}


function renderServers(subject: & ServersInterface): React.ReactElement[] {
  let rendered: React.ReactElement[] = [];

  rendered = rendered.concat(renderRustServers(subject));

  return rendered;
}

function renderServer(subject: & ServerInterface): React.ReactElement[] {
  let rendered: React.ReactElement[] = [];

  // let url = 'url';
  // rendered.push(url)


  // let protocol = 'protocol';
  // rendered.push(protocol)


  let variables = 'variables';
  rendered = rendered.concat(renderServerVariables(subject.variables()))


  return rendered;
}

function renderServerVariables(subject: & ServerVariablesInterface): React.ReactElement[] {
  let rendered: React.ReactElement[] = [];

  for (const [_, variable] of Object.entries(subject)) {
    rendered = rendered.concat(renderServerVariable(variable))
  }

  return rendered;
}


function renderServerVariable(subject: & ServerVariableInterface): React.ReactElement[] {
  let rendered: React.ReactElement[] = [];

  // if (!subject.defaultValue()) {
  //   rendered.push(`subject rendered default value`);
  // }

  return rendered;
}

function renderChannels(subject: & ChannelsInterface): React.ReactElement[] {
  let rendered: React.ReactElement[] = [];

  for (const [_, channel] of Object.entries(subject)) {
    rendered = rendered.concat(renderChannel(channel))
  }

  return rendered;
}

function renderChannel(subject: & ChannelInterface): React.ReactElement[] {
  let rendered: React.ReactElement[] = [];

  let messages = 'messages';
  if (containSubFunction(subject, messages)) {
    rendered = rendered.concat(renderMessages(subject.messages()))
  }

  return rendered;
}

function renderMessages(subject: & MessagesInterface): React.ReactElement[] {
  let rendered: React.ReactElement[] = [];

  // if (Object.keys(subject).length === 0) {
  //   rendered.push('rendered messages');
  // }
  return rendered;
}

function renderComponents(subject: & ComponentsInterface): React.ReactElement[] {
  let rendered: React.ReactElement[] = [];

  // if (Object.keys(subject.messages()).length === 0) {
  //   rendered.push('rendered messages');
  // }

  // if (Object.keys(subject.schemas()).length === 0) {
  //   rendered.push('rendered schemas');
  // }

  return rendered;
}
