import { ICertificationRequest, CertificationRequestUpdateData, CertificationRequestValidationData, ISuccessResponse, IRequestClient, ICertificationRequestClient } from '@energyweb/origin-backend-core';
export interface ICertificationRequestUpdateDTO {
    deviceId: string;
    fromTime: number;
    toTime: number;
    energy: string;
    files: string[];
}
export declare class CertificationRequestClient implements ICertificationRequestClient {
    private readonly dataApiUrl;
    private readonly requestClient;
    constructor(dataApiUrl: string, requestClient?: IRequestClient);
    private get certificateRequestEndpoint();
    queueCertificationRequestData(data: CertificationRequestUpdateData): Promise<boolean>;
    validateGenerationPeriod(data: CertificationRequestValidationData): Promise<ISuccessResponse>;
    getCertificationRequest(id: number): Promise<ICertificationRequest>;
    getAllCertificationRequests(): Promise<ICertificationRequest[]>;
}
