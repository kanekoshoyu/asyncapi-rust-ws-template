"use strict";
const fs = require('fs');
const path = require('path');

function createOutputSubDirectory(generator) {
	const targetDir = generator.targetDir;
	let subdirectories = ["src", "src/client", "src/model"];
	// fs.createOutputSubDirectory(asyncapiOutputLocation, asyncapi);

	subdirectories.forEach((subdir) => {
		const fullPath = path.join(targetDir, subdir);

		if (!fs.existsSync(fullPath)) {
			fs.mkdirSync(fullPath, { recursive: true });
		}
	});
}

module.exports = {
	'generate:before': createOutputSubDirectory
};
