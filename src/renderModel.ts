import { RustGenerator, RUST_DEFAULT_PRESET, FormatHelpers, OutputModel, MetaModel, ConstrainedMetaModel } from '@asyncapi/modelina'
import { AsyncAPIDocumentInterface } from '@asyncapi/parser';
import { RenderFile } from './renderFile';

/** modelina rust model generator */
const rustGenerator = new RustGenerator({
	presets: [RUST_DEFAULT_PRESET],
});

function contentModel(modelResult: string): string {
	const stdDerive = "#[derive(Clone, Debug, Deserialize, Serialize, PartialEq)]";

	return `
#[allow(unused)]
use super::*;
use serde::{Deserialize, Serialize};

${modelResult}
`
		.trimStart()
		.replaceAll("#[derive(Clone, Debug, Deserialize, Serialize)]", stdDerive)
		.replaceAll("#[derive(Clone, Copy, Debug, Deserialize, Eq, Hash, Ord, PartialEq, PartialOrd, Serialize)]", stdDerive)
		.replaceAll("#[derive(Clone, Debug, Deserialize, Eq, Hash, Ord, PartialEq, PartialOrd, Serialize)]", stdDerive)
		.replaceAll("crate::", "")
		.replaceAll("Serde_json", "serde_json")
		.replaceAll("Number_", "Number")
		.replaceAll("//", "///");
}

function contentMeta(meta: ConstrainedMetaModel): string {
	return `
#[allow(unused)]
use super::*;
use serde::{Deserialize, Serialize};

/// ${meta.name}
#[derive(Clone, Debug, Deserialize, Serialize, PartialEq)]
pub struct ${meta.name}(${meta.type});
`
		.trimStart()
		.replaceAll("crate::", "")
		.replaceAll("Std", "std");
}

function contentPerModModel(model: OutputModel): string {
	const modelName = FormatHelpers.toSnakeCase(model.modelName);
	return `
/// ${modelName}
pub mod ${modelName};
pub use ${modelName}::*;
`.trimStart()
}

function contentPerModMeta(model: MetaModel): string {
	const modelName = FormatHelpers.toSnakeCase(model.name);
	return `
/// ${modelName}
pub mod ${modelName};
pub use ${modelName}::*;
`.trimStart()
}


/** render models */
export async function renderModels(document: AsyncAPIDocumentInterface): Promise<RenderFile[]> {
	const models = await rustGenerator.generate(document);
	const files: RenderFile[] = [];

	let modStr = '';
	// TODO sort models by their name
	for (const model of models) {

		if (model.modelName == "" && model.result == "") {
			// meta model
			const metamodel = model.model;
			const modelFileName = `${FormatHelpers.toSnakeCase(metamodel.name)}.rs`;
			files.push(new RenderFile(modelFileName, contentMeta(metamodel)))
			modStr += contentPerModMeta(metamodel);
		} else {
			// model
			const modelFileName = `${FormatHelpers.toSnakeCase(model.modelName)}.rs`;
			files.push(new RenderFile(modelFileName, contentModel(model.result)))
			modStr += contentPerModModel(model);
		}
	}

	files.push(new RenderFile("mod.rs", modStr))
	return files;
}
