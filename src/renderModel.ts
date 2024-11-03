import { RustGenerator, RUST_DEFAULT_PRESET, FormatHelpers, OutputModel } from '@asyncapi/modelina'
import { AsyncAPIDocumentInterface } from '@asyncapi/parser';
import { RenderFile } from './renderFile';

// Initialize the Rust generator with desired options
const rustGenerator = new RustGenerator({
    presets: [RUST_DEFAULT_PRESET],
});

function content(modelResult: string): string {
    return `
use serde::{Deserialize, Serialize};

${modelResult}
`;
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
        modStr += modModel(model);
    }

    files.push(new RenderFile("mod.rs", modStr))
    return files;
}

function modModel(model: OutputModel): string {
    return `/// ${model.modelName}
mod ${FormatHelpers.toSnakeCase(model.modelName)};
`
}
