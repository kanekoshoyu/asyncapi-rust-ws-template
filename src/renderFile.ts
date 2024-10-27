import React from 'react';
import * as path from 'path';
import { File } from '@asyncapi/generator-react-sdk';

export class RenderFile {
  filePath: string;
  content: string;

  constructor(filePath: string, content: string) {
    this.filePath = filePath;
    this.content = content;
  }

  getDirName(): string {
    return path.dirname(this.filePath);
  }

  render(): React.ReactElement {
    return React.createElement(File, { name: this.filePath }, this.content);
  }
}

