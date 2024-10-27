import { AsyncAPIDocumentInterface } from '@asyncapi/parser';
interface TemplateParams {
    package: string;
    validate: boolean;
    render: boolean;
    exchange: string;
    framework?: 'tokio-tungstenite' | 'async-tungstenite';
}
interface TemplateProps {
    asyncapi: AsyncAPIDocumentInterface;
    params: TemplateParams;
}
export default function ({ asyncapi, params }: TemplateProps): Promise<import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>[]>;
export {};
