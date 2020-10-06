"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationClient = void 0;
const RequestClient_1 = require("./RequestClient");
class ConfigurationClient {
    constructor(dataApiUrl, requestClient = new RequestClient_1.RequestClient()) {
        this.dataApiUrl = dataApiUrl;
        this.requestClient = requestClient;
    }
    async get() {
        const url = `${this.dataApiUrl}/Configuration`;
        const { data } = await this.requestClient.get(url);
        return data;
    }
    async update(configuration) {
        const { status } = await this.requestClient.put(`${this.dataApiUrl}/Configuration`, configuration);
        return status >= 200 && status < 300;
    }
}
exports.ConfigurationClient = ConfigurationClient;
//# sourceMappingURL=ConfigurationClient.js.map