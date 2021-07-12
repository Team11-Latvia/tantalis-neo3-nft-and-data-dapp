import { ApiProperty } from "@nestjs/swagger";

export enum BlockchainType {
    NEO = 'NEO',
    NXA = 'NXA'
}

export class BlockchainInfoDto {
    @ApiProperty()
    blockchain: BlockchainType;

    @ApiProperty()
    networkName: string;

    @ApiProperty()
    networkId: string;

    @ApiProperty()
    synchronized: boolean;

    @ApiProperty()
    lastBlock?: string;

    constructor(
        blockchain: BlockchainType,
        networkName: string,
        networkId: string,
        synchronized: boolean,
        lastBlock?: string
    ) {
        this.blockchain = blockchain;
        this.networkName = networkName;
        this.networkId = networkId;
        this.synchronized = synchronized;
        this.lastBlock = lastBlock;
    }
}