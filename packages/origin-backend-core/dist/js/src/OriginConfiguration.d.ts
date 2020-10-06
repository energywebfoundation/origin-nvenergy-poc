import { ExternalDeviceIdType } from './Device';
export declare type ISubRegion = string;
export interface IRegions {
    [region: string]: ISubRegion[];
}
export declare type IDeviceSubType = string;
export declare type IDeviceType = IDeviceSubType[];
export interface IContractsLookup {
    registry: string;
    issuer: string;
}
export interface IOriginConfiguration {
    contractsLookup: IContractsLookup;
    countryName?: string;
    currencies?: string[];
    regions?: IRegions;
    externalDeviceIdTypes?: ExternalDeviceIdType[];
    complianceStandard?: string;
    deviceTypes?: IDeviceType[];
    gridOperators?: string[];
}
