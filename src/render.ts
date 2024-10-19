import { AsyncAPIDocumentInterface, ChannelsInterface, ComponentsInterface, InfoInterface, MessagesInterface, } from '@asyncapi/parser';
import { renderClientDir } from './_render/_client';
import { renderMain } from './_render/main.rs';
import { renderReadme } from './_render/README.md';
import { renderCargo } from './_render/Cargo.toml';
import { channel } from 'diagnostics_channel';

/// render rust websocket client from asyncapi
export function renderRustWsClientFromAsyncApi(exchangeName: string, item: AsyncAPIDocumentInterface): React.ReactElement[] {
  let rendered: React.ReactElement[] = [renderMain(), renderReadme(), renderCargo(exchangeName, item.info())];

  rendered = rendered.concat(renderInfo(item.info()));
  rendered = rendered.concat(renderClientDir(item.servers()));
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

function renderChannels(channels: & ChannelsInterface): React.ReactElement[] {
  let rendered: React.ReactElement[] = [];

  // for (let channel of channels) {
  //   console.log(channel.id())
  // }

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
