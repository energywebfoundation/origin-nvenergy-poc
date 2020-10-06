import { UserRegisterReturnData, UserRegistrationData, UserLoginReturnData, IUserProperties, IUser, UserPasswordUpdate, IEmailConfirmationToken, EmailConfirmationResponse, ISuccessResponse, IUserClient, IRequestClient } from '@energyweb/origin-backend-core';
export declare class UserClient implements IUserClient {
    private readonly dataApiUrl;
    private readonly requestClient;
    constructor(dataApiUrl: string, requestClient?: IRequestClient);
    private get authEndpoint();
    private get userEndpoint();
    register(formData: UserRegistrationData): Promise<UserRegisterReturnData>;
    login(email: string, password: string): Promise<UserLoginReturnData>;
    logout(): Promise<void>;
    me(): Promise<IUser>;
    attachSignedMessage(signedMessage: string): Promise<IUser>;
    updateAdditionalProperties(properties: Partial<Pick<IUserProperties, 'notifications'>>): Promise<IUser>;
    getUserById(id: string): Promise<IUser>;
    private updateUser;
    updateProfile(formData: IUser): Promise<IUser>;
    updatePassword(formData: UserPasswordUpdate): Promise<IUser>;
    updateChainAddress(formData: IUser): Promise<IUser>;
    confirmEmail(token: IEmailConfirmationToken['token']): Promise<EmailConfirmationResponse>;
    requestConfirmationEmail(): Promise<ISuccessResponse>;
}
