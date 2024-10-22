import React from 'react';
import * as path from 'path';
import { File } from '@asyncapi/generator-react-sdk';
import { permission } from 'process';


export function render(filePath: string, content: string): React.ReactElement {
  let dirname = path.dirname(filePath);
  console.log(dirname);
  return <File name={filePath}> {content} </File >;
}

