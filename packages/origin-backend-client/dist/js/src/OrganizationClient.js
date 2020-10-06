"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationClient = void 0;
const origin_backend_core_1 = require("@energyweb/origin-backend-core");
const RequestClient_1 = require("./RequestClient");
class OrganizationClient {
    constructor(dataApiUrl, requestClient = new RequestClient_1.RequestClient()) {
        this.dataApiUrl = dataApiUrl;
        this.requestClient = requestClient;
    }
    get endpoint() {
        return `${this.dataApiUrl}/Organization`;
    }
    async getById(id) {
        if (typeof id === 'undefined') {
            return null;
        }
        const url = `${this.endpoint}/${id}`;
        const { data } = await this.requestClient.get(url);
        return data;
    }
    async getAll() {
        const { data } = await this.requestClient.get(this.endpoint);
        return data;
    }
    async add(data) {
        const response = await this.requestClient.post(this.endpoint, data);
        return response.data;
    }
    async update(id, data) {
        const response = await this.requestClient.put(`${this.endpoint}/${id}`, data);
        return response.data;
    }
    async acceptInvitation(id) {
        return this.updateInvitation(id, {
            status: origin_backend_core_1.OrganizationInvitationStatus.Accepted
        });
    }
    async rejectInvitation(id) {
        return this.updateInvitation(id, {
            status: origin_backend_core_1.OrganizationInvitationStatus.Rejected
        });
    }
    async viewInvitation(id) {
        await this.updateInvitation(id, {
            status: origin_backend_core_1.OrganizationInvitationStatus.Viewed
        });
    }
    async invite(email, role) {
        const response = await this.requestClient.post(`${this.endpoint}/invite`, {
            email,
            role
        });
        return response.data;
    }
    async getInvitations() {
        const { data } = await this.requestClient.get(`${this.endpoint}/invitation`);
        return data;
    }
    async getInvitationsForEmail(email) {
        const { data } = await this.requestClient.get(`${this.endpoint}/invitation?email=${encodeURIComponent(email)}`);
        return data;
    }
    async getInvitationsToOrganization(organizationId) {
        const { data } = await this.requestClient.get(`${this.endpoint}/${organizationId}/invitations`);
        return data;
    }
    async getMembers(id) {
        const { data } = await this.requestClient.get(`${this.endpoint}/${id}/users`);
        return data;
    }
    async removeMember(organizationId, userId) {
        const response = await this.requestClient.post(`${this.endpoint}/${organizationId}/remove-member/${userId}`);
        return response.data;
    }
    async updateInvitation(id, data) {
        const response = await this.requestClient.put(`${this.endpoint}/invitation/${id}`, data);
        return response.data;
    }
    async memberChangeRole(organizationId, userId, newRole) {
        const response = await this.requestClient.put(`${this.endpoint}/${organizationId}/change-role/${userId}`, { role: newRole });
        return response.data;
    }
}
exports.OrganizationClient = OrganizationClient;
//# sourceMappingURL=OrganizationClient.js.map