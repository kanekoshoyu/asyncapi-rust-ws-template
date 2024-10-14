import { render } from './tool';
import { ServersInterface, ServerInterface } from '@asyncapi/parser';

export function generate_rust_server_code(servers: ServersInterface[]): string {
    return servers.map(server => `
use reqwest::Client;
use std::sync::Arc;

struct Server {
    url: String,
    port: u16,
    protocol: String,
    client: Arc<Client>,
}

impl Server {
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

#[tokio::main]
async fn main() {
    let server = Server::new("${server.url()}", ${server.port()}, "${server.protocol()}");
    match server.make_request("/some_endpoint").await {
        Ok(response) => println!("Response: {}", response),
        Err(e) => eprintln!("Error: {}", e),
    }
}
`).join('\n');
}

export function render_rust_servers(servers: ServersInterface[]) {

    for (const [serverName, server] of Object.entries(servers)) {
        missing = missing.concat(validateServer(server))
    }
    return servers.forEach((server: ServerInterface) => render(`server_${server.url().replace(/[:\/]/g, '_')}.rs`, generate_rust_server_code([server])));
}