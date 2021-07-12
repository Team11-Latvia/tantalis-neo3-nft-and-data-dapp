import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { BlockchainBlock } from "../types/blockchain.block";
import { BlockchainSmartContract } from "../types/blockchain.smart.contract";
import { BlockchainToken } from "../types/blockchain.token";
import { BlockchainTransaction } from "../types/blockchain.transaction";

//
// DeploySmartContractResultDto
//
export class DeploySmartContractResultDto {
    @ApiPropertyOptional()
    block?: BlockchainBlock;

    @ApiPropertyOptional()
    transaction?: BlockchainTransaction;

    @ApiPropertyOptional()
    contract?: BlockchainSmartContract;

    @ApiProperty()
    token: BlockchainToken;

    constructor(
        block: BlockchainBlock | undefined,
        transaction: BlockchainTransaction | undefined,
        contract: BlockchainSmartContract | undefined,
        token: BlockchainToken | undefined
    ) {
        this.block = block;
        this.transaction = transaction;
        this.contract = contract;
        this.token = token;
    }
}
