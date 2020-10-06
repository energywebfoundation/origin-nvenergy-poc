import { OriginFeature } from '@energyweb/utils-general';
import { IOffChainDataSource, ICertificationRequestClient, IAdminClient, ICertificateClient, IDeviceClient, IFilesClient, IOrganizationClient, IRequestClient, IUserClient, IConfigurationClient } from '@energyweb/origin-backend-core';
export declare class OffChainDataSource implements IOffChainDataSource {
    readonly backendUrl: string;
    readonly port: number;
    readonly enabledFeatures: OriginFeature[];
    readonly requestClient: IRequestClient;
    configurationClient: IConfigurationClient;
    userClient: IUserClient;
    deviceClient: IDeviceClient;
    organizationClient: IOrganizationClient;
    filesClient: IFilesClient;
    certificateClient: ICertificateClient;
    certificationRequestClient: ICertificationRequestClient;
    adminClient: IAdminClient;
    constructor(backendUrl: string, port?: number, enabledFeatures?: OriginFeature[], requestClient?: IRequestClient);
    get dataApiUrl(): string;
}
