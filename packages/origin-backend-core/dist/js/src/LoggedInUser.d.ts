import { Role } from '.';
import { IUser } from './User';
export interface ILoggedInUser {
    id: number;
    organizationId: number;
    email: string;
    blockchainAccountAddress: string;
    rights: number;
    hasRole(...role: Role[]): boolean;
    ownerId: string;
}
export declare class LoggedInUser implements ILoggedInUser {
    constructor(user: IUser);
    id: number;
    organizationId: number;
    email: string;
    blockchainAccountAddress: string;
    rights: number;
    hasRole(...role: Role[]): boolean;
    get ownerId(): string;
}
