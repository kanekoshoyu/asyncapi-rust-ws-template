import { RustGenerator, RUST_DEFAULT_PRESET, FormatHelpers, OutputModel } from '@asyncapi/modelina'
import { AsyncAPIDocumentInterface } from '@asyncapi/parser';
import { RenderFile } from './renderFile';

// Initialize the Rust generator with desired options
const rustGenerator = new RustGenerator({
    presets: [RUST_DEFAULT_PRESET],
});

function content(modelResult: string): string {
    let content = `#[allow(unused)]
use super::*;
use serde::{Deserialize, Serialize};

${modelResult}
`;
    // brute force formatting, too lazy to get into the 
    const found = modelResult.search("crate::");
    if (found) {
        console.log("\n\nORIGINAL");
        console.log(modelResult);
    }
    const stdDerive = "#[derive(Clone, Debug, Deserialize, Serialize, PartialEq)]";
    let result = content
        .replaceAll("#[derive(Clone, Debug, Deserialize, Serialize)]", stdDerive)
        .replaceAll("#[derive(Clone, Copy, Debug, Deserialize, Eq, Hash, Ord, PartialEq, PartialOrd, Serialize)]", stdDerive)
        .replaceAll("#[derive(Clone, Debug, Deserialize, Eq, Hash, Ord, PartialEq, PartialOrd, Serialize)]", stdDerive)
        .replaceAll("crate::", "")
        .replaceAll("Serde_json", "serde_json")
        .replaceAll("Number_", "NUMBER_");

    if (found) {
        console.log("\n\nRESULT");
        console.log(result);
    }
    return result;
}

function contentPerModModel(model: OutputModel): string {
    let modelName = FormatHelpers.toSnakeCase(model.modelName);
    return `/// ${model.modelName}
pub mod ${modelName};
pub use ${modelName}::*;
`
}


/**
 * Function description goes here.
 */
export async function renderModels(document: AsyncAPIDocumentInterface): Promise<RenderFile[]> {
    const models = await rustGenerator.generate(document);
    let files: RenderFile[] = [];

    let modStr = '';
    let countUntitled = 0;

    // TODO sort models by their name
    for (let model of models) {
        if (model.modelName == "" && model.result == "") {
            console.log("found anonymous model, skipping");
            continue;
        }
        const modelFileName = `${FormatHelpers.toSnakeCase(model.modelName)}.rs`;
        files.push(new RenderFile(modelFileName, content(model.result)))
        modStr += contentPerModModel(model);
    }

    files.push(new RenderFile("mod.rs", modStr))
    return files;
}
