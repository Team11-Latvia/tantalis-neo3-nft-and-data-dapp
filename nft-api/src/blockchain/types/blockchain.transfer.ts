import { BlockchainTransaction } from "./blockchain.transaction";

//
// BlockchainTransfer
//
export class BlockchainTransfer {
    blockHash: string;
    blockIndex: string;

    txHash: string;

    from: string;
    to: string;
    amount: string;
    timestamp: number;

    transaction?: BlockchainTransaction;
}
