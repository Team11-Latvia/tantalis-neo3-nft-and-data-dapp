import { BlockchainSmartContract } from "./blockchain.smart.contract";
import { BlockchainTransaction } from "./blockchain.transaction";

//
// BlockchainTokenType
//
export enum BlockchainTokenType {
    NEP5 = 'NEP5',
    NEP17 = 'NEP17',
    NEP11 = 'NEP11'
}

//
// BlockchainToken
//
export class BlockchainToken {
    type: BlockchainTokenType;
    name: string;
    symbol: string;
    decimals: number;
    factor: number;
    
    address?: string;
    ownerAddress?: string;

    contract?: BlockchainSmartContract;
    transaction?: BlockchainTransaction;
}