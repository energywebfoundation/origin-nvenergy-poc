import { CancelTokenSource } from 'axios';
import { IFilesClient, IRequestClient, onUploadProgressFunction } from '@energyweb/origin-backend-core';
export declare class FilesClient implements IFilesClient {
    private readonly dataApiUrl;
    private readonly requestClient;
    constructor(dataApiUrl: string, requestClient?: IRequestClient);
    upload(files: File[] | FileList, onUploadProgress?: onUploadProgressFunction, cancelTokenSource?: CancelTokenSource): Promise<string[]>;
    getLink(id: string): string;
    private get endpoint();
}
