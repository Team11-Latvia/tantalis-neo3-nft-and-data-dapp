import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NftCategoryRepository } from '../catalog/repository/nft.category.repository';
import { NftContractRepository } from '../catalog/repository/nft.contract.repository';
import { NftItemRepository } from '../catalog/repository/nft.item.repository';
import { BlockchainModule } from '../blockchain/blockchain.module';
import { CreateNftController } from './create.nft.controller';
import { CreateNftItemRepository } from './create.nft.item.repository';
import { CreateNftService } from './create.nft.service';
import { NftCurrencyRepository } from '../catalog/repository/nft.currency.repository';
import { NftPriceRepository } from '../catalog/repository/nft.price.repository';

@Module({
    imports: [
        BlockchainModule,
        TypeOrmModule.forFeature([NftCategoryRepository]),
        TypeOrmModule.forFeature([NftContractRepository]),
        TypeOrmModule.forFeature([NftCurrencyRepository]),
        TypeOrmModule.forFeature([NftPriceRepository]),
        TypeOrmModule.forFeature([NftItemRepository]),
        TypeOrmModule.forFeature([CreateNftItemRepository]),
    ],
    controllers: [
        CreateNftController
    ],
    providers: [
        CreateNftService,
    ],
    exports: [
    ]
})
export class CreateNftModule {
}
