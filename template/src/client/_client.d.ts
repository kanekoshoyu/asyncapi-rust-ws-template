import { RenderFile } from '../../_render/tool';
import { ServersInterface, ServerInterface } from '@asyncapi/parser';
export declare function render_rust_ws_client_code(exchangeName: string, server: ServerInterface): string;
export declare function render_rust_ws_client_mod(servers: ServersInterface): string;
export declare function renderClientDir(exchangeName: string, servers: ServersInterface): RenderFile[];
