// global.d.ts

declare module '@asyncapi/generator-react-sdk' {
	import * as React from 'react';

	interface FileProps {
		name?: string;
		path?: string;
		permissions?: string;
		// Include the children prop
		children?: React.ReactNode;
		// Include any other props if necessary
	}

	// Declare File as a React Functional Component
	export const File: React.FC<FileProps>;

	// Re-export any other exports from the original module
	export * from '@asyncapi/generator-react-sdk';
}