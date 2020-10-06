import { CommitmentStatus, IOwnershipCommitmentProofWithTx, IRequestClient, ICertificateClient } from '@energyweb/origin-backend-core';
export declare class CertificateClient implements ICertificateClient {
    private readonly dataApiUrl;
    private readonly requestClient;
    constructor(dataApiUrl: string, requestClient?: IRequestClient);
    private get certificateEndpoint();
    getOwnershipCommitment(certificateId: number): Promise<IOwnershipCommitmentProofWithTx>;
    addOwnershipCommitment(certificateId: number, proof: IOwnershipCommitmentProofWithTx): Promise<CommitmentStatus>;
}
