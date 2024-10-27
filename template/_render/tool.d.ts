import React from 'react';
export declare class RenderFile {
    filePath: string;
    content: string;
    constructor(filePath: string, content: string);
    getDirName(): string;
    render(): React.ReactElement;
}
