import { BlockchainTransaction } from "./blockchain.transaction";

//
// BlockchainBlock
// See neo/Network/P2P/Payloads/Block.cs
//
export class BlockchainBlock {
    version: string;
    index: string;
    hash: string;
    timestamp: number;
    
    transactions: BlockchainTransaction[];
}
