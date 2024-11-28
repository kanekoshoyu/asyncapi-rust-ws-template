[![AsyncAPI logo](./assets/logo_banner.png)](https://www.asyncapi.com)

# asyncapi-rust-ws-template
> npm project that converts AsyncAPI into rust websocket client crate 

![npm version](https://img.shields.io/npm/v/asyncapi-rust-ws-template.svg)
[![license](https://img.shields.io/github/license/kanekoshoyu/exchange-collection)](https://github.com/kanekoshoyu/exchange-collection/blob/master/LICENSE)
[![discord](https://img.shields.io/discord/1153997271294283827)](https://discord.gg/q3j5MYdwnm)
## design
- renderer: 
  - react rather than nunjucks, for its versatility. details [here](https://www.asyncapi.com/docs/tools/generator/file-templates)
  - TypeScript, ESM (except hooks)
- generated code are derived as below:
  - client (server)
  - client function (channel)
  - client function logic (operation)
  - client function struct (schema)
- client code functionality:
  - case 1: subscribe
  - case 2: publish, subscribe

## contents
| name                            | description                                                                                                   |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| [src/](/src/)                   | TypeScript ESM source code, transpiles into `template` directory                                              |
| [src/index.ts](/src/index.ts)   | transpiles to main template entry `template/index.js`, exposing the function for `asyncapi generator` command |
| [hooks/](/hooks/after.js)       | AsyncAPI hooks for pre-process and post-process that cannot be derived by AsyncAPI (in CommonJS)              |
| [template/](/template/)         | Javascript transcribed source code for template                                                               |
| [test/input](/test/)            | local test input, AsyncAPI document                                                                           |
| [test/output](/test/)           | local test output, rust client crate (git-ignore)                                                             |
| [package.json](/package.json)   | NPM package definition, defines template configs                                                              |
| [tsconfig.json](/tsconfig.json) | TypeScript transpile definition, defined transcribed datas                                                    |
| [CHANGELOG](/CHANGELOG.md)      | change log                                                                                                    |

## how to run terminal command
npm build, local YAML
```
$ asyncapi generate fromTemplate ASYNCAPI_DIR asyncapi-rust-ws-template -p exchange=EXCHANGE_NAME -o OUTOUT_DIR
```
local build, local YAML (at the root of this project)
```
$ ag ASYNCAPI_DIR ./ -o OUTPUT_DIR 
```

## template input (AsyncAPI)
| spec                                      | requirement                                                                         |
| ----------------------------------------- | ----------------------------------------------------------------------------------- |
| format                                    | AsyncAPI v2.0.0+ (supports v3 as well)                                              |
| minimum content requirement for WS client | `info`, `servers`, `channels`, `components` , can be tested with `-p validate=true` |


## template parameters
| parameter   | options                                            | description                                                                   |
| ----------- | -------------------------------------------------- | ----------------------------------------------------------------------------- |
| `validate`  | `true` `false (default)`                           | to validate if a AsyncAPI has minimum content for generating websocket client |
| `render`    | `true` `false (default)`                           | to render a rust websocket client                                             |
| `framework` | `tokio-tungstenite (default)`, `async-tungstenite` | rust websocket client framework to render                                     |

## dev setup installation
install react
```
npm install react
```
install typescript transpiler
```
npm install @types/react --save-devnpm install typescript @types/node --save-dev
```

## template output (rust client crate)
The `rust` code generated by this template has the following structure
- `Cargo.toml` // using info
- `README.md` // using info
- `src/`
  - `lib.rs` // overall library
  - `client/`
    - `mod.rs`
    - `${client}.rs` // using servers, channels, operations
  - `model/`
    - `mod.rs`
    - `${message}.rs` // using message schema with modelina

## TODO
changelog: please check [here](./CHANGELOG.md)
- [x] design codegen structure
  - [x] study nunjucks vs react (decided to use react)
- [x] code generation
  - [x] define code structure
  - [x] websocket client function from `operation`
  - [x] pubsub function from `channel`
  - [x] fix modelina referencing other model as `crate::*`;
- [x] code testing
  - [x] add unit test
  - [x] make server name configurable 
  - [x] loads server name into unit test
- [ ] support for `async-tungstenite` 

## recruitment
#### TypeScript AsyncAPI Template Developer
I am not a TS expert, so I would love to have an expert to accelarate development for websocket genrator in the following output languages:
- `typescript`, `go`, `python`  

## notes
- changelog [here](./CHANGELOG.md)
- v2 and v3 terminology are flipped. 
  - v2 calls operations ["publish", "subscribe"] from client's perspective
  - v3 calls operations ["receive", "send"] from server's perspective

## see also
- [guilder](https://github.com/kanekoshoyu/guilder) - Unopinionated Cross-Exchange Crypto Trading Library
- [exchange-collection](https://github.com/kanekoshoyu/exchange-collection) - Crypto Exchange OpenAPI(REST) / AsyncAPI(WS) and Clients
- [kucoin-arbitrage](https://github.com/kanekoshoyu/kucoin_arbitrage) - KuCoin Cyclic Arbitrage, in Tokio Rust (legacy)
- [typed-websocket](https://github.com/kanekoshoyu/typed-websocket) - Typed WebsSocket Stream
