import { render } from './tool';
import { ServersInterface, ServerInterface } from '@asyncapi/parser';

// ThisForm
function pascalcase(s: string): string {
    return s.replace('_', '').replace(' ', '');
}
// thisForm
function camelcase(s: string): string {
    return s.replace('_', '').replace(' ', '');
}
// this_form
function underscore(s: string): string {
    return s.replace(' ', '_').toLowerCase();
}
export function render_rust_ws_client_code(server: ServerInterface): string {
    return `
use reqwest::Client;
use std::sync::Arc;

pub struct ${pascalcase(server.id())}Client {
    url: String,
    port: u16,
    protocol: String,
    client: Arc<Client>,
}

impl ${pascalcase(server.id())}Client {
    pub fn new(url: &str, port: u16, protocol: &str) -> Self {
        Self {
            url: url.to_string(),
            port,
            protocol: protocol.to_string(),
            client: Arc::new(Client::new()),
        }
    }

    pub async fn make_request(&self, endpoint: &str) -> Result<String, reqwest::Error> {
        let url = format!("{}://{}:{}{}", self.protocol, self.url, self.port, endpoint);
        let response = self.client.get(&url).send().await?.text().await?;
        Ok(response)
    }
}
`
}


export function render_rust_ws_client_mod(servers: ServersInterface): string {
    return `
mod 
`
}

// TODO set up the render function where we can set up directories as well directly
export function renderClientDir(servers: & ServersInterface) {
    let files: React.ReactElement[] = [];
    console.log(`server count: ${servers.length}`);

    for (let server of servers) {
        let serverName = underscore(server.id());
        let file = render(`client_${serverName}.rs`, render_rust_ws_client_code(server));
        files = files.concat(file);
    }
    let file = render(`client_mod.rs`, render_rust_ws_client_mod(servers));


    return files;
}