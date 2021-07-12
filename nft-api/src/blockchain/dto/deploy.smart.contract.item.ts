import { ApiProperty } from "@nestjs/swagger";
import { BlockchainSmartContract } from "../types/blockchain.smart.contract";
import { BlockchainToken } from "../types/blockchain.token";

//
// DeploySmartContractItemDto
//
export class DeploySmartContractItemDto {
    @ApiProperty()
    contract: BlockchainSmartContract;

    @ApiProperty()
    token: BlockchainToken;
}