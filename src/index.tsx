// npm install react
// npm install @types/react --save-devnpm install typescript @types/node --save-dev


import React from 'react';
import { AsyncAPIDocumentV2 } from '@asyncapi/parser';
import { File as ReactFile } from '@asyncapi/generator-react-sdk';

interface TemplateProps {
  asyncapi: AsyncAPIDocumentV2;
  params: any;
}



export default function ({ asyncapi, params }: TemplateProps) {
  const content = () => {
    // Your logic to generate file content
    return `// Generated content based on AsyncAPI document.`;
  };

  <ReactFile name="main.rs">
    {content()}
  </ReactFile>
    ;
}