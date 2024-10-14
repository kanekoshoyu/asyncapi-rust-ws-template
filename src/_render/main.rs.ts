import { render } from './tool';

function content() {
  return `
// main.rs
use tokio;

fn main() {
  println!("Hello test");
}
`;
}

export function renderMain() {
  const filename: string = "main.rs";
  // return <File name={filename} > {content()} </File>;
  return render("main.rs", content());

}
