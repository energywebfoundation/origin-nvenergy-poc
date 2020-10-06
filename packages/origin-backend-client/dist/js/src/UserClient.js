"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserClient = void 0;
const RequestClient_1 = require("./RequestClient");
class UserClient {
    constructor(dataApiUrl, requestClient = new RequestClient_1.RequestClient()) {
        this.dataApiUrl = dataApiUrl;
        this.requestClient = requestClient;
    }
    get authEndpoint() {
        return `${this.dataApiUrl}/auth`;
    }
    get userEndpoint() {
        return `${this.dataApiUrl}/user`;
    }
    async register(formData) {
        const url = `${this.userEndpoint}/register`;
        const { data } = await this.requestClient.post(url, formData);
        return data;
    }
    async login(email, password) {
        const url = `${this.authEndpoint}/login`;
        const { data } = await this.requestClient.post(url, {
            username: email,
            password
        });
        if (data === null || data === void 0 ? void 0 : data.accessToken) {
            this.requestClient.authenticationToken = data.accessToken;
        }
        return data;
    }
    async logout() {
        this.requestClient.authenticationToken = null;
    }
    async me() {
        const url = `${this.userEndpoint}/me`;
        const { data } = await this.requestClient.get(url);
        return data;
    }
    async attachSignedMessage(signedMessage) {
        return this.updateUser({ blockchainAccountSignedMessage: signedMessage });
    }
    async updateAdditionalProperties(properties) {
        return this.updateUser(properties);
    }
    async getUserById(id) {
        const url = `${this.userEndpoint}/${id}`;
        const { data } = await this.requestClient.get(url);
        return data;
    }
    async updateUser(updatedUserInfo) {
        const { data } = await this.requestClient.put(this.userEndpoint, updatedUserInfo);
        return data;
    }
    async updateProfile(formData) {
        const response = await this.requestClient.put(`${this.userEndpoint}/profile`, formData);
        return response.data;
    }
    async updatePassword(formData) {
        const response = await this.requestClient.put(`${this.userEndpoint}/password`, formData);
        return response.data;
    }
    async updateChainAddress(formData) {
        const response = await this.requestClient.put(`${this.userEndpoint}/chainAddress`, formData);
        return response.data;
    }
    async confirmEmail(token) {
        const response = await this.requestClient.put(`${this.userEndpoint}/confirm-email/${token}`);
        return response.data;
    }
    async requestConfirmationEmail() {
        const response = await this.requestClient.put(`${this.userEndpoint}/re-send-confirm-email`);
        return response.data;
    }
}
exports.UserClient = UserClient;
//# sourceMappingURL=UserClient.js.map