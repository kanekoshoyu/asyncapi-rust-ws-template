"use strict";
// npm install react
// npm install @types/react --save-devnpm install typescript @types/node --save-dev
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const react_1 = __importDefault(require("react"));
const generator_react_sdk_1 = require("@asyncapi/generator-react-sdk");
function default_1({ asyncapi, params }) {
    const content = () => {
        // Your logic to generate file content
        return `// Generated content based on AsyncAPI document.`;
    };
    react_1.default.createElement(generator_react_sdk_1.File, { name: "main.rs" }, content());
}
