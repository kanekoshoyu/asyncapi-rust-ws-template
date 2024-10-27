import { RustGenerator, RUST_DEFAULT_PRESET, FormatHelpers, OutputModel } from '@asyncapi/modelina'
import { AsyncAPIDocumentInterface } from '@asyncapi/parser';
import { RenderFile } from './renderFile';

// Initialize the Rust generator with desired options
const rustGenerator = new RustGenerator({
    presets: [RUST_DEFAULT_PRESET],
});

/**
 * Function description goes here.
 */
export async function renderModels(document: AsyncAPIDocumentInterface): Promise<RenderFile[]> {
    const models = await rustGenerator.generate(document);
    let files: RenderFile[] = [];

    let modStr = '';
    for (let model of models) {
        const modelFileName = `${FormatHelpers.toSnakeCase(model.modelName)}.rs`;
        files.push(new RenderFile(modelFileName, model.result))
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
