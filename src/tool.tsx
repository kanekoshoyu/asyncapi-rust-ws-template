import React from 'react';
import { File } from '@asyncapi/generator-react-sdk';

export function render(filename: string, content: string): React.ReactElement {
  return <File name={filename}> {content} </File>;
}

