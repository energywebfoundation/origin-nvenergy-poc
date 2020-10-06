import { IOrganization } from './Organization';
import { IEmailConfirmation } from './EmailConfirmation';
export declare enum Role {
    OrganizationAdmin = 1,
    OrganizationDeviceManager = 2,
    OrganizationUser = 4,
    Issuer = 8,
    Admin = 16,
    SupportAgent = 32
}
export declare enum UserStatus {
    Pending = 0,
    Active = 1,
    Suspended = 2,
    Deleted = 3
}
export declare enum KYCStatus {
    Pending = 0,
    Passed = 1,
    Rejected = 2
}
export declare function buildRights(roles: Role[]): number;
export declare function getRolesFromRights(rights: number): Role[];
export declare function isRole(user: {
    rights: number;
}, ...roles: Role[]): boolean;
export interface IUserProperties {
    id: number;
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    blockchainAccountAddress: string;
    blockchainAccountSignedMessage: string;
    notifications: boolean;
    rights: number;
    status: UserStatus;
    kycStatus: KYCStatus;
}
export interface IUser extends IUserProperties {
    organization: IOrganization;
    emailConfirmed?: IEmailConfirmation['confirmed'];
}
export declare type UserRegisterReturnData = IUser;
export declare type UserLoginData = {
    username: string;
    password: string;
};
export declare type UserLoginReturnData = {
    accessToken: string;
};
export declare type UserUpdateData = Partial<Pick<IUserProperties, 'blockchainAccountSignedMessage' | 'notifications'>>;
export declare type UserStatusUpdate = Partial<Pick<IUserProperties, 'status' | 'kycStatus'>>;
export declare type UserPasswordUpdate = {
    email: string;
    oldPassword: string;
    newPassword: string;
};
export interface IUserFilter {
    orgName?: string;
    status?: UserStatus;
    kycStatus?: KYCStatus;
}
export declare type UpdateUserResponseReturnType = IUser;
