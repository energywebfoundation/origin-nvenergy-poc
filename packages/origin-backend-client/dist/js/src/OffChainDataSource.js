"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffChainDataSource = void 0;
const utils_general_1 = require("@energyweb/utils-general");
const CertificateClient_1 = require("./CertificateClient");
const ConfigurationClient_1 = require("./ConfigurationClient");
const DeviceClient_1 = require("./DeviceClient");
const FilesClient_1 = require("./FilesClient");
const OrganizationClient_1 = require("./OrganizationClient");
const RequestClient_1 = require("./RequestClient");
const UserClient_1 = require("./UserClient");
const AdminClient_1 = require("./AdminClient");
const CertificationRequestClient_1 = require("./CertificationRequestClient");
class OffChainDataSource {
    constructor(backendUrl, port = 80, enabledFeatures = utils_general_1.allOriginFeatures, requestClient = new RequestClient_1.RequestClient()) {
        this.backendUrl = backendUrl;
        this.port = port;
        this.enabledFeatures = enabledFeatures;
        this.requestClient = requestClient;
        this.configurationClient = new ConfigurationClient_1.ConfigurationClient(this.dataApiUrl, this.requestClient);
        this.userClient = new UserClient_1.UserClient(this.dataApiUrl, this.requestClient);
        this.organizationClient = new OrganizationClient_1.OrganizationClient(this.dataApiUrl, this.requestClient);
        this.filesClient = new FilesClient_1.FilesClient(this.dataApiUrl, this.requestClient);
        this.adminClient = new AdminClient_1.AdminClient(this.dataApiUrl, this.requestClient);
        if (enabledFeatures.includes(utils_general_1.OriginFeature.Devices)) {
            this.deviceClient = new DeviceClient_1.DeviceClient(this.dataApiUrl, this.requestClient);
        }
        if (enabledFeatures.includes(utils_general_1.OriginFeature.Certificates)) {
            this.certificateClient = new CertificateClient_1.CertificateClient(this.dataApiUrl, this.requestClient);
        }
        if (enabledFeatures.includes(utils_general_1.OriginFeature.CertificationRequests)) {
            this.certificationRequestClient = new CertificationRequestClient_1.CertificationRequestClient(this.dataApiUrl, this.requestClient);
        }
    }
    get dataApiUrl() {
        return `${this.backendUrl}:${this.port}/api`;
    }
}
exports.OffChainDataSource = OffChainDataSource;
//# sourceMappingURL=OffChainDataSource.js.map