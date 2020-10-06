import { IOwnershipCommitmentProofWithTx } from './OwnershipCommitment';
export declare enum CommitmentStatus {
    CURRENT = 0,
    PENDING = 1,
    REJECTED = 2
}
export interface IOwnershipCommitmentStatus {
    proof: IOwnershipCommitmentProofWithTx;
    status: CommitmentStatus;
}
export interface ICertificateOwnership {
    id: number;
    originalRequestor: string;
    currentOwnershipCommitment: IOwnershipCommitmentProofWithTx;
    pendingOwnershipCommitment: IOwnershipCommitmentProofWithTx;
    ownershipHistory: IOwnershipCommitmentProofWithTx[];
}
