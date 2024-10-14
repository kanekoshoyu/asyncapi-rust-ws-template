import { render } from './tool';
import { ServersInterface, ServerInterface } from '@asyncapi/parser';

export function render_rust_server_code(server: ServerInterface): string {
    return `
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
    let server = Server::new("${server.url()}", 3000, "${server.protocol()}");
    match server.make_request("/some_endpoint").await {
        Ok(response) => println!("Response: {}", response),
        Err(e) => eprintln!("Error: {}", e),
    }
`
}

export function renderRustServers(servers: & ServersInterface) {
    let render_file: React.ReactElement[] = [];

    let length = Object.entries(servers).length;
    console.log(`server count: ${length}`);
    for (const [serverName, server] of Object.entries(servers)) {
        let render_content = render(`server_${serverName}.rs`, render_rust_server_code(server));
        render_file = render_file.concat(render_content);

    }
    return render_file;
}