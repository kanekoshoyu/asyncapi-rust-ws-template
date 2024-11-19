import { RustGenerator, RUST_DEFAULT_PRESET, FormatHelpers, OutputModel } from '@asyncapi/modelina'
import { AsyncAPIDocumentInterface } from '@asyncapi/parser';
import { RenderFile } from './renderFile';

/** modelina rust model generator */
const rustGenerator = new RustGenerator({
	presets: [RUST_DEFAULT_PRESET],
});

function content(modelResult: string): string {
	const content = `#[allow(unused)]
use super::*;
use serde::{Deserialize, Serialize};

${modelResult}
`;
	// brute force formatting, too lazy to get into the 
	const stdDerive = "#[derive(Clone, Debug, Deserialize, Serialize, PartialEq)]";
	const result = content
		.replaceAll("#[derive(Clone, Debug, Deserialize, Serialize)]", stdDerive)
		.replaceAll("#[derive(Clone, Copy, Debug, Deserialize, Eq, Hash, Ord, PartialEq, PartialOrd, Serialize)]", stdDerive)
		.replaceAll("#[derive(Clone, Debug, Deserialize, Eq, Hash, Ord, PartialEq, PartialOrd, Serialize)]", stdDerive)
		.replaceAll("crate::", "")
		.replaceAll("Serde_json", "serde_json")
		.replaceAll("Number_", "Number");
	return result;
}

function contentPerModModel(model: OutputModel): string {
	const modelName = FormatHelpers.toSnakeCase(model.modelName);
	return `/// ${model.modelName}
pub mod ${modelName};
pub use ${modelName}::*;
`
}


/** render models */
export async function renderModels(document: AsyncAPIDocumentInterface): Promise<RenderFile[]> {
	const models = await rustGenerator.generate(document);
	const files: RenderFile[] = [];

	let modStr = '';
	// TODO sort models by their name
	for (const model of models) {
		if (model.modelName == "" && model.result == "") {
			console.log("found empty anonymous model, skipping");
			continue;
		}
		const modelFileName = `${FormatHelpers.toSnakeCase(model.modelName)}.rs`;
		files.push(new RenderFile(modelFileName, content(model.result)))
		modStr += contentPerModModel(model);
	}

	files.push(new RenderFile("mod.rs", modStr))
	return files;
}
