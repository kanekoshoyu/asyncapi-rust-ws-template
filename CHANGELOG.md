# [asyncapi-rust-websocket-template](./README.md) changelog
All notable changes to the template will be documented in this file.

## [0.3.1] - 2025-1-25
### Added
- client generator returns GeneratedCode which has both enum and fn code
- generates union enum code when there are multiple responses

## [0.3.1] - 2025-1-25
### Modified
- change terminology, only accept client facing document (send request, receive response)

## [0.3.0] - 2024-11-28
### Added
- ready to use `token-tungstenite` client :fire:
- configurable exchange name
### Modified
- client sub function unit test is de-hardcoded

## [0.2.4] - 2024-11-24
### Modified
- client function returns TypedWebSocketStream rather than as a function itself

## [0.2.3] - 2024-11-19
### Added
- complete mapping of sub and pub/sub cases in client function
- generate meta models like AdditionalProperties as a struct wrapper
- unittest scaffold
- ES lint
### Modified
- use tab
- template code in ES module

## [0.2.2] - 2024-11-11
### Added
- hook into into npm package, can generate code now with `asyncapi generate fromTemplate` command

## [0.2.1] - 2024-11-11
### Added
- case divider

## [0.2.0] - 2024-11-03
### Added
- standardized trait derive as "#[derive(Clone, Debug, Deserialize, Serialize, PartialEq)]"
- make models globally accessible from eachother
- cargo check pass
- linting pass
- vs code setting for rust analyzer to locate test projects
### Modified
- use ES2021 for replaceAll()

## [0.1.5] - 2024-10-28
### Added
- hooks (before and after)
- output module complete
### Modified
- output sub-directory generation
### Removed
- d.ts files that went into template file

## [0.1.4] - 2024-10-28
### Added
- support both JS & TS
- support both V2 & V3
- test environment
- generate models
- generate websocket server by their name as filename


## [0.1.3] - 2024-10-17
### Added
- `"apiVersion": "v3"` in `package.json` to support v3
- generate `lib.rs`
### Modified
- set up `validate` to `validate_v2` and `validate_v3`
- set up `generate` to `generate_v2` and `generate_v3`
### Removed
- generate `main.rs`

## [0.1.2] - 2024-10-14
### Added
- set up `validate` tag
- set up `generate` tag
### Modified
- change `generate` to `render`
- refactor to top down approach

## [0.1.1] - 2024-09-24
### Added
- react as renderer framework

## [0.1.0] - 2024-09-21
### Added
- hello world
- npm package
- MIT license
- tutorial on testing

