import { DeviceStatus } from './Device';
import { OrganizationStatus } from './Organization';
import { Role } from './User';
export declare type NewEvent = Omit<IEvent, 'timestamp'>;
export interface IEvent {
    type: SupportedEvents;
    data: SupportedEventData;
    timestamp: number;
}
export declare type UserStatusChangedEvent = {
    email: string;
};
export declare type DeviceStatusChangedEvent = {
    deviceId: string;
    status: DeviceStatus;
    deviceManagersEmails: string[];
};
export declare type CreatedNewDemand = {
    demandId: number;
};
export declare type DemandUpdated = {
    demandId: number;
};
export declare type DemandPartiallyFilledEvent = {
    demandId: number;
    certificateId: string;
    energy: number;
    blockNumber: number;
};
export declare type OrganizationStatusChangedEvent = {
    organizationId: number;
    organizationEmail: string;
    status: OrganizationStatus;
};
export declare type OrganizationInvitationEvent = {
    email: string;
    organizationName: string;
};
export declare type OrganizationRemovedMemberEvent = {
    organizationName: string;
    email: string;
};
export declare type OrganizationMemberChangedRoleEvent = {
    organizationName: string;
    newRole: Role;
    email: string;
};
export declare type ConfirmEmailEvent = {
    email: string;
    token: string;
};
export declare enum SupportedEvents {
    CONFIRM_EMAIL = "ConfirmEmail",
    DEVICE_STATUS_CHANGED = "DeviceStatusChanged",
    CREATE_NEW_DEMAND = "CreatedNewDemand",
    DEMAND_UPDATED = "DemandUpdated",
    DEMAND_PARTIALLY_FILLED = "DemandPartiallyFilled",
    ORGANIZATION_STATUS_CHANGED = "OrganizationStatusChanged",
    ORGANIZATION_INVITATION = "OrganizationInvitation",
    ORGANIZATION_REMOVED_MEMBER = "OrganizationRemovedMember",
    ORGANIZATION_MEMBER_CHANGED_ROLE = "OrganizationMemberChangedRole",
    USER_STATUS_CHANGED = "UserStatusChanged"
}
export declare type SupportedEventData = ConfirmEmailEvent | UserStatusChangedEvent | DeviceStatusChangedEvent | CreatedNewDemand | DemandUpdated | DemandPartiallyFilledEvent | OrganizationStatusChangedEvent | OrganizationInvitationEvent | OrganizationRemovedMemberEvent | OrganizationMemberChangedRoleEvent;
