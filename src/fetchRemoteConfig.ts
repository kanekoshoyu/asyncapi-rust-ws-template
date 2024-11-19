export async function getAsyncApiYamlFiles() {
	const owner = 'kanekoshoyu';
	const repo = 'exchange-collection';
	const path = 'asset';
	const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

	try {
		const response = await fetch(apiUrl);
		const files = await response.json();

		if (!Array.isArray(files)) {
			throw new Error('Failed to fetch directory contents.');
		}

		const asyncApiFiles = files
			.filter(file => file.name.endsWith('_ws_asyncapi.yaml'))
			.map(file => file.name);

		return asyncApiFiles;
	} catch (error) {
		console.error('Error fetching files:', error);
		return [];
	}
}