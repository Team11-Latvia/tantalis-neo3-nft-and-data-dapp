import { Module } from '@nestjs/common';
import { BlockchainController } from './blockchain.controller';
import { BlockchainService } from './blockchain.service';
import { NeoBlockchainProvider } from './providers/neo/neo.blockchain.provider';
import { NxaBlockchainProvider } from './providers/nxa/nxa.blockchain.provider';

@Module({
    imports: [
    ],
    controllers: [
        BlockchainController
    ],
    providers: [
        NeoBlockchainProvider,
        NxaBlockchainProvider,
        BlockchainService,
    ],
    exports: [
        BlockchainService,
    ]
})
export class BlockchainModule {
}
