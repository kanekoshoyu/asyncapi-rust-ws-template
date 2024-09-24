function content_main_rs() {
    return `
  // main.rs
  use tokio;
  
  fn main() {
    println!("Hello world");
  }
  `;
}

export function render() {
    return <File name="main.rs" > {content_main_rs()} </File>;
}
