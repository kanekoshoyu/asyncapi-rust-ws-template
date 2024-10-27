import { RustGenerator, RUST_DEFAULT_PRESET, FormatHelpers } from '@asyncapi/modelina'
import { AsyncAPIDocumentInterface, SchemasInterface } from '@asyncapi/parser';
import { render } from '../../_render/tool';

// Initialize the Rust generator with desired options
const rustGenerator = new RustGenerator({
    presets: [RUST_DEFAULT_PRESET],
});


/**
 * Function description goes here.
 */
export async function renderModels(document: AsyncAPIDocumentInterface) {
    const models = await rustGenerator.generate(document);
    let files: React.ReactElement[] = [];
    for (let model of models) {
        const modelFileName = `${FormatHelpers.toPascalCase(model.modelName)}.rs`;
        files.push(render(modelFileName, model.result))
    }
    return files;
}