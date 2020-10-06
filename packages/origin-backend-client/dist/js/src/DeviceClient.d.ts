import { DeviceCreateData, DeviceSettingsUpdateData, DeviceUpdateData, IDeviceWithRelationsIds, IExternalDeviceId, ISmartMeterRead, ISmartMeterReadWithStatus, ISuccessResponse, IDeviceClient, IRequestClient, IDevice } from '@energyweb/origin-backend-core';
export declare class DeviceClient implements IDeviceClient {
    private readonly dataApiUrl;
    private readonly requestClient;
    constructor(dataApiUrl: string, requestClient?: IRequestClient);
    private get endpoint();
    getByExternalId(id: IExternalDeviceId): Promise<IDeviceWithRelationsIds>;
    getById(id: number, loadRelationIds?: boolean): Promise<IDeviceWithRelationsIds>;
    getAll(withMeterStats?: boolean, loadRelationIds?: boolean): Promise<IDevice[]>;
    add(device: DeviceCreateData): Promise<IDeviceWithRelationsIds>;
    update(id: number, updateData: DeviceUpdateData): Promise<IDeviceWithRelationsIds>;
    getAllSmartMeterReadings(id: number): Promise<ISmartMeterReadWithStatus[]>;
    addSmartMeterReads(id: number, smartMeterRead: ISmartMeterRead[]): Promise<void>;
    private cleanDeviceData;
    getSupplyBy(facilityName: string, status: number): Promise<IDeviceWithRelationsIds[]>;
    delete(id: number): Promise<ISuccessResponse>;
    updateDeviceSettings(id: number, device: DeviceSettingsUpdateData): Promise<ISuccessResponse>;
    getMyDevices(withMeterStats?: boolean): Promise<IDeviceWithRelationsIds[]>;
}
