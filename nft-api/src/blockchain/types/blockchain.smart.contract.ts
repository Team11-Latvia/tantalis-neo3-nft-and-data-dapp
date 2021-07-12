import { BlockchainTransaction } from "./blockchain.transaction";

//
// BlockchainSmartContract
// See neo/SmartContract/Contract.cs
//
export class BlockchainSmartContract {
    script: string;
    scriptHash?: string;
    address?: string;
    ownerAddress?: string;

    transaction?: BlockchainTransaction;
}
