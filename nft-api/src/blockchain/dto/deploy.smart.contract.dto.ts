import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { BlockchainSmartContract } from "../types/blockchain.smart.contract";
import { BlockchainToken } from "../types/blockchain.token";

//
// DeploySmartContractDto
//
export class DeploySmartContractDto {
    @ApiProperty()
    contract: BlockchainSmartContract;

    @ApiPropertyOptional()
    token?: BlockchainToken;
}
