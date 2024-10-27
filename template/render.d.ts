import { AsyncAPIDocumentInterface } from '@asyncapi/parser';
import { RenderFile } from './_render/tool';
export declare function renderRustWsClientFromAsyncApi(exchangeName: string, doc: AsyncAPIDocumentInterface): Promise<RenderFile[]>;
