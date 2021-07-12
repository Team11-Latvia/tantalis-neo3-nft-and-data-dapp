//
// BlockchainTransaction
// See neo/Network/P2P/Payloads/Transaction.cs
//
export class BlockchainTransaction {
    blockHash: string;
    blockIndex: string;

    index: string;
    hash: string;
    size: string;
    version: string;
    nonce: string;
    sender: string;
    sysfee: string;
    netfee: string;
    script: string;

    timestamp: number;
}
