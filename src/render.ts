import { AsyncAPIDocumentInterface, ChannelInterface, ChannelsInterface, ComponentsInterface, InfoInterface, MessageInterface, MessagesInterface, SchemaInterface, ServerInterface, ServersInterface, ServerVariableInterface, ServerVariablesInterface } from '@asyncapi/parser';
import { renderRustServers } from './_render/_server';
import { renderMain } from './_render/main.rs';
import { renderReadme } from './_render/README.md';
import { renderCargo } from './_render/Cargo.toml';
import { channel } from 'diagnostics_channel';

/// render rust websocket client from asyncapi
export function renderRustWsClientFromAsyncApi(exchangeName: string, item: AsyncAPIDocumentInterface): React.ReactElement[] {
  let rendered: React.ReactElement[] = [renderMain(), renderReadme(), renderCargo(exchangeName, item.info())];

  rendered = rendered.concat(renderInfo(item.info()));
  rendered = rendered.concat(renderServers(item.servers()))
  rendered = rendered.concat(renderChannels(item.channels()))
  rendered = rendered.concat(renderComponents(item.components()))

  return rendered;
}

function renderInfo(item: & InfoInterface): React.ReactElement[] {
  let rendered: React.ReactElement[] = [];

  // let title = 'title';
  // rendered.push(title)

  // let version = 'version';
  // rendered.push(version)

  return rendered;
}


function renderServers(item: & ServersInterface): React.ReactElement[] {
  let rendered: React.ReactElement[] = [];

  rendered = rendered.concat(renderRustServers(item));

  return rendered;
}

function renderServer(item: & ServerInterface): React.ReactElement[] {
  let rendered: React.ReactElement[] = [];

  // let url = 'url';
  // rendered.push(url)


  // let protocol = 'protocol';
  // rendered.push(protocol)


  let variables = 'variables';
  rendered = rendered.concat(renderServerVariables(item.variables()))


  return rendered;
}

function renderServerVariables(item: & ServerVariablesInterface): React.ReactElement[] {
  let rendered: React.ReactElement[] = [];

  for (const [_, variable] of Object.entries(item)) {
    rendered = rendered.concat(renderServerVariable(variable))
  }

  return rendered;
}


function renderServerVariable(item: & ServerVariableInterface): React.ReactElement[] {
  let rendered: React.ReactElement[] = [];

  // if (!item.defaultValue()) {
  //   rendered.push(`item rendered default value`);
  // }

  return rendered;
}

function renderChannels(channels: & ChannelsInterface): React.ReactElement[] {
  let rendered: React.ReactElement[] = [];

  for (let channel of channels) {
    console.log(channel)
  }

  return rendered;
}

function renderMessages(item: & MessagesInterface): React.ReactElement[] {
  let rendered: React.ReactElement[] = [];

  // if (Object.keys(item).length == 0) {
  //   rendered.push('rendered messages');
  // }
  return rendered;
}

function renderComponents(item: & ComponentsInterface): React.ReactElement[] {
  let rendered: React.ReactElement[] = [];

  // if (Object.keys(item.messages()).length == 0) {
  //   rendered.push('rendered messages');
  // }

  // if (Object.keys(item.schemas()).length == 0) {
  //   rendered.push('rendered schemas');
  // }

  return rendered;
}
