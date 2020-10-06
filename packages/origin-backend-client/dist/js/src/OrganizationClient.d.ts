import { OrganizationPostData, OrganizationUpdateData, ISuccessResponse, IOrganizationInvitation, IOrganizationWithRelationsIds, OrganizationRole, Role, IRequestClient, IOrganizationClient, IUser } from '@energyweb/origin-backend-core';
export declare class OrganizationClient implements IOrganizationClient {
    private readonly dataApiUrl;
    private readonly requestClient;
    constructor(dataApiUrl: string, requestClient?: IRequestClient);
    private get endpoint();
    getById(id: number): Promise<IOrganizationWithRelationsIds>;
    getAll(): Promise<IOrganizationWithRelationsIds[]>;
    add(data: OrganizationPostData): Promise<IOrganizationWithRelationsIds>;
    update(id: number, data: OrganizationUpdateData): Promise<IOrganizationWithRelationsIds>;
    acceptInvitation(id: number): Promise<any>;
    rejectInvitation(id: number): Promise<any>;
    viewInvitation(id: number): Promise<any>;
    invite(email: string, role: OrganizationRole): Promise<ISuccessResponse>;
    getInvitations(): Promise<IOrganizationInvitation[]>;
    getInvitationsForEmail(email: string): Promise<IOrganizationInvitation[]>;
    getInvitationsToOrganization(organizationId: number): Promise<IOrganizationInvitation[]>;
    getMembers(id: number): Promise<IUser[]>;
    removeMember(organizationId: number, userId: number): Promise<ISuccessResponse>;
    private updateInvitation;
    memberChangeRole(organizationId: number, userId: number, newRole: Role): Promise<ISuccessResponse>;
}
