import { Injectable } from "@nestjs/common";
import { AssetBalanceDto } from "./dto/asset.balance.dto";
import { DeploySmartContractDto } from "./dto/deploy.smart.contract.dto";
import { DeploySmartContractItemDto } from "./dto/deploy.smart.contract.item";
import { DeploySmartContractResultDto } from "./dto/deploy.smart.contract.result.dto";
import { NeoBlockchainProvider } from "./providers/neo/neo.blockchain.provider";
import { NxaBlockchainProvider } from "./providers/nxa/nxa.blockchain.provider";
import { BlockchainNetwork } from "./types/blockchain.network";
import { BlockchainProviderInterface } from "./types/blockchain.provider.interface";
import { BlockchainServiceInterface } from "./types/blockchain.service.interface";

@Injectable()
export class BlockchainService implements BlockchainServiceInterface {
    private readonly provider: BlockchainProviderInterface;

    constructor(
        private readonly neoBlockchainProvider: NeoBlockchainProvider,
        private readonly nxaBlockchainProvider: NxaBlockchainProvider
    ) {
        this.provider = neoBlockchainProvider;
    }

    connect(network: BlockchainNetwork): void {
        this.provider.connect(network);
    }
    
    disconnect(): void {
        this.provider.disconnect();
    }

    testConnection(): Promise<void> {
        return this.provider.testConnection();
    }

    async balanceOf(address: string): Promise<AssetBalanceDto[]> {
        return this.provider.balanceOf(address);
    }

    async balanceByAssetOf(asset: string, address: string): Promise<AssetBalanceDto> {
        return this.provider.balanceByAssetOf(asset, address);
    }

    async deploySmartContract(network: BlockchainNetwork, dto: DeploySmartContractDto): Promise<DeploySmartContractResultDto> {
        return this.provider.deploySmartContract(network, dto);
    }

    async deploySmartContractItem(network: BlockchainNetwork, dto: DeploySmartContractItemDto): Promise<DeploySmartContractResultDto> {
        return this.provider.deploySmartContractItem(network, dto);
    }
}
