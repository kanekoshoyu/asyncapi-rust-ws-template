# asyncapi-rust-websocket-template
> AsyncAPI Generator for Rust WebSocket Client

## contents
| name                        | description |
| --------------------------- | ----------- |
| [index.js](./src/index.js)  | main code   |
| [CHANGELOG](./CHANGELOG.md) | change log  |

## command
test generate at output
```
ag https://raw.githubusercontent.com/kanekoshoyu/exchange-collection/main/asset/binance_ws_asyncapi.yaml https://github.com/kanekoshoyu/asyncapi-rust-websocket-template -o output
```

## TODO
- study the asyncapi paho project structure
- come up with the codegen style

## see also
- [guilder](https://github.com/kanekoshoyu/guilder) - Unopinionated Cross-Exchange Crypto Trading Library
- [exchange-collection](https://github.com/kanekoshoyu/exchange-collection) - Crypto Exchange OpenAPI(REST) / AsyncAPI(WS) and Clients
- [kucoin-arbitrage](https://github.com/kanekoshoyu/kucoin_arbitrage) - KuCoin Cyclic Arbitrage, in Tokio Rust (legacy)
