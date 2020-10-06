import { IOrganization } from './Organization';
import { Role } from './User';
export declare enum OrganizationInvitationStatus {
    Pending = 0,
    Rejected = 1,
    Accepted = 2,
    Viewed = 3
}
export declare type OrganizationRole = Role.OrganizationUser | Role.OrganizationDeviceManager | Role.OrganizationAdmin;
export interface IOrganizationInvitationProperties {
    id: number;
    email: string;
    role: OrganizationRole;
    status: OrganizationInvitationStatus;
}
export interface IOrganizationInvitation extends IOrganizationInvitationProperties {
    organization: IOrganization;
    sender: string;
    createdAt: Date;
}
export declare type OrganizationInviteCreateData = {
    email: string;
    role: OrganizationRole;
};
export declare type OrganizationInviteUpdateData = Pick<IOrganizationInvitation, 'status'>;
