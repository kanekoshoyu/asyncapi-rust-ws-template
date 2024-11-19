/** prepend to each line */
export function prependLines(input: string, prepend: string): string {
	return input
		.split("\n")  // Split the input string into lines
		.map(line => `${prepend}${line}`) // Prepend a tab to each line
		.join("\n");   // Join the lines back into a single string
}
