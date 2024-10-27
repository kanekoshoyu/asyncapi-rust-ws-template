# [asyncapi-rust-websocket-template](./README.md) changelog
All notable changes to the template will be documented in this file.

## [0.1.5] - 2024-10-28
### Added
- hooks (before and after)
### Modified
- output sub-directory generation
### Removed
- d.ts files that went into template file
- 
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

