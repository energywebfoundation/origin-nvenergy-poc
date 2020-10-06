import { IOriginConfiguration, IConfigurationClient, IRequestClient } from '@energyweb/origin-backend-core';
export declare class ConfigurationClient implements IConfigurationClient {
    private readonly dataApiUrl;
    private readonly requestClient;
    constructor(dataApiUrl: string, requestClient?: IRequestClient);
    get(): Promise<IOriginConfiguration>;
    update(configuration: Partial<IOriginConfiguration>): Promise<boolean>;
}
