import { Injectable } from "@nestjs/common";
import { BlockchainInfoDto, BlockchainType } from "./dto/blockchain.info.dto";

@Injectable()
export class SystemService {
    private static readonly info = new BlockchainInfoDto(BlockchainType.NEO, 'N3RC3', '844378958', true, null);

    async getBlockchainInfo(): Promise<BlockchainInfoDto> {
        return SystemService.info;
    }
}