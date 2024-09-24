function content() {
  return `
// main.rs
use tokio;

fn main() {
  println!("Hello world");
}
`;
}

export function render_main() {
  return <File name="main.rs" > {content()} </File>;
}
