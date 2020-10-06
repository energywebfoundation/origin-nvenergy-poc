"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestClient = void 0;
const axios_1 = __importDefault(require("axios"));
class RequestClient {
    async get(url, config = {}) {
        return axios_1.default.get(url, { ...this.config, ...config });
    }
    async post(url, data, config = {}) {
        return axios_1.default.post(url, data, { ...this.config, ...config });
    }
    async put(url, data, config = {}) {
        return axios_1.default.put(url, data, { ...this.config, ...config });
    }
    async delete(url, config = {}) {
        return axios_1.default.delete(url, { ...this.config, ...config });
    }
    generateCancelToken() {
        return axios_1.default.CancelToken.source();
    }
    get config() {
        const config = {};
        if (this.authenticationToken) {
            config.headers = {
                Authorization: `Bearer ${this.authenticationToken}`
            };
        }
        return config;
    }
}
exports.RequestClient = RequestClient;
//# sourceMappingURL=RequestClient.js.map