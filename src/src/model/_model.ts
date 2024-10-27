import { RustGenerator, RUST_DEFAULT_PRESET, FormatHelpers } from '@asyncapi/modelina'
import { AsyncAPIDocumentInterface, SchemasInterface } from '@asyncapi/parser';
import { RenderFile } from '../../_render/tool';

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
    for (let model of models) {
        const modelFileName = `${FormatHelpers.toSnakeCase(model.modelName)}.rs`;
        files.push(new RenderFile(modelFileName, model.result))
    }
    return files;
}