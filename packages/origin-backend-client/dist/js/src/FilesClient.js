"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesClient = void 0;
const RequestClient_1 = require("./RequestClient");
class FilesClient {
    constructor(dataApiUrl, requestClient = new RequestClient_1.RequestClient()) {
        this.dataApiUrl = dataApiUrl;
        this.requestClient = requestClient;
    }
    async upload(files, onUploadProgress, cancelTokenSource) {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append(`files`, files[i]);
        }
        const response = await this.requestClient.post(this.endpoint, formData, {
            headers: { 'Content-type': 'multipart/form-data' },
            onUploadProgress,
            cancelToken: cancelTokenSource === null || cancelTokenSource === void 0 ? void 0 : cancelTokenSource.token
        });
        return response.data;
    }
    getLink(id) {
        return `${this.endpoint}/${id}`;
    }
    get endpoint() {
        return `${this.dataApiUrl}/file`;
    }
}
exports.FilesClient = FilesClient;
//# sourceMappingURL=FilesClient.js.map