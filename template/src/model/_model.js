"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderModels = renderModels;
const modelina_1 = require("@asyncapi/modelina");
const tool_1 = require("../../_render/tool");
// Initialize the Rust generator with desired options
const rustGenerator = new modelina_1.RustGenerator({
    presets: [modelina_1.RUST_DEFAULT_PRESET],
});
/**
 * Function description goes here.
 */
async function renderModels(document) {
    const models = await rustGenerator.generate(document);
    let files = [];
    for (let model of models) {
        const modelFileName = `${modelina_1.FormatHelpers.toSnakeCase(model.modelName)}.rs`;
        files.push(new tool_1.RenderFile(modelFileName, model.result));
    }
    return files;
}
