import { BigNumber } from 'ethers';
import { IDevice } from '.';
export declare const MAX_ENERGY_PER_CERTIFICATE: BigNumber;
export interface ICertificationRequestMinimal {
    id: number;
    owner: string;
    fromTime: number;
    toTime: number;
    files: string[];
    created: number;
    approved: boolean;
    revoked: boolean;
    approvedDate?: Date;
    revokedDate?: Date;
}
export interface ICertificationRequest extends ICertificationRequestMinimal {
    energy: BigNumber;
    deviceId: string;
}
export interface ICertificationRequestBackend extends ICertificationRequestMinimal {
    energy: string;
    device: IDevice;
}
export declare type CertificationRequestUpdateData = Pick<ICertificationRequest, 'fromTime' | 'toTime' | 'deviceId' | 'energy' | 'files'>;
export declare type CertificationRequestValidationData = Pick<ICertificationRequest, 'fromTime' | 'toTime' | 'deviceId'>;
export declare type CertificationRequestDataMocked = Pick<ICertificationRequest, 'owner' | 'fromTime' | 'toTime' | 'created' | 'approved' | 'revoked' | 'deviceId'>;
