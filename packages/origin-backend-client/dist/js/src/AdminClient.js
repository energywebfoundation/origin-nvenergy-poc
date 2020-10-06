"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminClient = void 0;
const RequestClient_1 = require("./RequestClient");
class AdminClient {
    constructor(dataApiUrl, requestClient = new RequestClient_1.RequestClient()) {
        this.dataApiUrl = dataApiUrl;
        this.requestClient = requestClient;
    }
    async update(formData) {
        const { data } = await this.requestClient.put(`${this.endpoint}/users/${formData.id}`, formData);
        return data;
    }
    async getUsers(filter) {
        const { data } = await this.requestClient.get(`${this.endpoint}/users`, {
            params: filter
        });
        return data;
    }
    get endpoint() {
        return `${this.dataApiUrl}/admin`;
    }
}
exports.AdminClient = AdminClient;
//# sourceMappingURL=AdminClient.js.map