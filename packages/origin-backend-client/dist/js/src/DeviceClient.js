"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceClient = void 0;
const ethers_1 = require("ethers");
const RequestClient_1 = require("./RequestClient");
class DeviceClient {
    constructor(dataApiUrl, requestClient = new RequestClient_1.RequestClient()) {
        this.dataApiUrl = dataApiUrl;
        this.requestClient = requestClient;
    }
    get endpoint() {
        return `${this.dataApiUrl}/Device`;
    }
    async getByExternalId(id) {
        const url = `${this.endpoint}/get-by-external-id/${id.type}/${id.id}`;
        const { data } = await this.requestClient.get(url);
        return this.cleanDeviceData(data);
    }
    async getById(id, loadRelationIds = true) {
        const url = `${this.endpoint}/${id}?loadRelationIds=${loadRelationIds}`;
        const { data } = await this.requestClient.get(url);
        return this.cleanDeviceData(data);
    }
    async getAll(withMeterStats = false, loadRelationIds = true) {
        const { data } = await this.requestClient.get(`${this.endpoint}?withMeterStats=${withMeterStats}&loadRelationIds=${loadRelationIds}`);
        return data.map((device) => this.cleanDeviceData(device));
    }
    async add(device) {
        const { data } = await this.requestClient.post(this.endpoint, device);
        return this.cleanDeviceData(data);
    }
    async update(id, updateData) {
        const { data } = await this.requestClient.put(`${this.endpoint}/${id}`, updateData);
        return this.cleanDeviceData(data);
    }
    async getAllSmartMeterReadings(id) {
        const response = await this.requestClient.get(`${this.endpoint}/${id}/smartMeterReading`);
        const meterReadingsFormatted = response.data.map((read) => ({
            ...read,
            meterReading: ethers_1.BigNumber.from(read.meterReading)
        }));
        return meterReadingsFormatted;
    }
    async addSmartMeterReads(id, smartMeterRead) {
        const response = await this.requestClient.put(`${this.endpoint}/${id}/smartMeterReading`, smartMeterRead);
        return response.data;
    }
    /*
     *  GET requests return BigNumber in object format instead of BigNumber.
     *  This method cleans them back to BigNumber.
     */
    cleanDeviceData(device) {
        let cleanDevice = { ...device };
        if (device.meterStats) {
            cleanDevice = {
                ...cleanDevice,
                meterStats: {
                    certified: ethers_1.BigNumber.from(device.meterStats.certified),
                    uncertified: ethers_1.BigNumber.from(device.meterStats.uncertified)
                }
            };
        }
        if (device.smartMeterReads) {
            cleanDevice = {
                ...cleanDevice,
                smartMeterReads: device.smartMeterReads.map((smRead) => ({
                    ...smRead,
                    meterReading: ethers_1.BigNumber.from(smRead.meterReading)
                }))
            };
        }
        return cleanDevice;
    }
    async getSupplyBy(facilityName, status) {
        const { data } = await this.requestClient.get(`${this.endpoint}/supplyBy?facility=${facilityName !== null && facilityName !== void 0 ? facilityName : ''}&status=${status}`);
        return data.map((device) => this.cleanDeviceData(device));
    }
    async delete(id) {
        const { data } = await this.requestClient.delete(`${this.endpoint}/${id}`);
        return data;
    }
    async updateDeviceSettings(id, device) {
        const { data } = await this.requestClient.put(`${this.endpoint}/${id}/settings`, device);
        return data;
    }
    async getMyDevices(withMeterStats = false) {
        const { data } = await this.requestClient.get(`${this.endpoint}/my-devices?withMeterStats=${withMeterStats}`);
        return data.map((device) => this.cleanDeviceData(device));
    }
}
exports.DeviceClient = DeviceClient;
//# sourceMappingURL=DeviceClient.js.map