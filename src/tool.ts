/** prepend to each line */
export function prependLines(input: string, prepend: string): string {
	return input
		.split("\n")  // Split the input string into lines
		.map(line => `${prepend}${line}`) // Prepend a tab to each line
		.join("\n");   // Join the lines back into a single string
}

/** append a vector of strings, prepending "\n\n" to each line */
export function appendLines(vec: string[]): string {
	return vec.map(line => `${line}`).join("\n\n").trim();
}