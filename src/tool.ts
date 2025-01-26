/** prepend to each line */
export function prependLines(input: string, prepend: string): string {
	return input
		.split("\n")  // Split the input string into lines
		.map(line => `${prepend}${line}`) // Prepend a tab to each line
		.join("\n");   // Join the lines back into a single string
}

/**
 * Function to print a vector of strings, prepending "\n" to each line
 */
export function appendLines(vec: string[]): string {
	console.log(vec[0]);
	const res = vec.map(line => `${line}`).join("\n").trimStart();
	console.log(res);
	return res;
}