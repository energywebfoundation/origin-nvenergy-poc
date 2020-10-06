"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateClient = void 0;
const RequestClient_1 = require("./RequestClient");
class CertificateClient {
    constructor(dataApiUrl, requestClient = new RequestClient_1.RequestClient()) {
        this.dataApiUrl = dataApiUrl;
        this.requestClient = requestClient;
    }
    get certificateEndpoint() {
        return `${this.dataApiUrl}/Certificate`;
    }
    async getOwnershipCommitment(certificateId) {
        const url = `${this.certificateEndpoint}/${certificateId}/OwnershipCommitment`;
        const { data } = await this.requestClient.get(url);
        return data;
    }
    async addOwnershipCommitment(certificateId, proof) {
        const request = await this.requestClient.put(`${this.certificateEndpoint}/${certificateId}/OwnershipCommitment`, proof);
        return request.data;
    }
}
exports.CertificateClient = CertificateClient;
//# sourceMappingURL=CertificateClient.js.map