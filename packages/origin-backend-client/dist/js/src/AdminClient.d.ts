import { IUser, IUserFilter, IAdminClient, IRequestClient } from '@energyweb/origin-backend-core';
export declare class AdminClient implements IAdminClient {
    private readonly dataApiUrl;
    private readonly requestClient;
    constructor(dataApiUrl: string, requestClient?: IRequestClient);
    update(formData: IUser): Promise<IUser>;
    getUsers(filter?: IUserFilter): Promise<IUser[]>;
    private get endpoint();
}
