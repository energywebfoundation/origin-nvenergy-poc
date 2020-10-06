"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificationRequestClient = void 0;
/* eslint-disable max-classes-per-file */
const ethers_1 = require("ethers");
const RequestClient_1 = require("./RequestClient");
class CertificationRequestClient {
    constructor(dataApiUrl, requestClient = new RequestClient_1.RequestClient()) {
        this.dataApiUrl = dataApiUrl;
        this.requestClient = requestClient;
    }
    get certificateRequestEndpoint() {
        return `${this.dataApiUrl}/CertificationRequest`;
    }
    async queueCertificationRequestData(data) {
        const dto = {
            ...data,
            energy: data.energy.toString()
        };
        const response = await this.requestClient.post(`${this.certificateRequestEndpoint}`, dto);
        const success = response.status >= 200 && response.status < 300;
        if (!success) {
            console.error(`Unable to queue certification request for device ${data.deviceId}:${data.fromTime}-${data.toTime}`);
            console.error(JSON.stringify(response));
        }
        return success;
    }
    async validateGenerationPeriod(data) {
        const response = await this.requestClient.get(`${this.certificateRequestEndpoint}/validate`, { params: data });
        return response.data;
    }
    async getCertificationRequest(id) {
        const { data } = await this.requestClient.get(`${this.certificateRequestEndpoint}/${id}`);
        return {
            id,
            ...data,
            energy: ethers_1.BigNumber.from(data.energy),
            deviceId: data.device.id.toString(),
            approvedDate: data.approvedDate ? new Date(data.approvedDate) : null,
            revokedDate: data.revokedDate ? new Date(data.revokedDate) : null
        };
    }
    async getAllCertificationRequests() {
        const { data } = await this.requestClient.get(this.certificateRequestEndpoint);
        return data.map((certReq) => {
            return {
                ...certReq,
                energy: ethers_1.BigNumber.from(certReq.energy),
                deviceId: certReq.device.id.toString(),
                approvedDate: certReq.approvedDate ? new Date(certReq.approvedDate) : null,
                revokedDate: certReq.revokedDate ? new Date(certReq.revokedDate) : null
            };
        });
    }
}
exports.CertificationRequestClient = CertificationRequestClient;
//# sourceMappingURL=CertificationRequestClient.js.map