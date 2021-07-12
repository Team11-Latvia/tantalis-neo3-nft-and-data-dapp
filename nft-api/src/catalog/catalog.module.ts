import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';
import { FavoriteService } from './favorite.service';
import { NftCategoryRepository } from './repository/nft.category.repository';
import { NftItemRepository } from './repository/nft.item.repository';
import { NftItemFavoriteRepository } from './repository/nft.item.favorite.repository';
import { NftContractRepository } from './repository/nft.contract.repository';
import { NftCurrencyRepository } from './repository/nft.currency.repository';
import { NftPriceRepository } from './repository/nft.price.repository';
import { NftTransactionEntity } from '../entity/nft.transaction.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([NftCurrencyRepository]),
        TypeOrmModule.forFeature([NftPriceRepository]),
        TypeOrmModule.forFeature([NftItemFavoriteRepository]),
        TypeOrmModule.forFeature([NftTransactionEntity]),
        TypeOrmModule.forFeature([NftCategoryRepository]),
        TypeOrmModule.forFeature([NftContractRepository]),
        TypeOrmModule.forFeature([NftItemRepository]),
    ],
    controllers: [
        CatalogController
    ],
    providers: [
        CatalogService,
        FavoriteService
    ],
    exports: [
        CatalogService,
        FavoriteService
    ]
})
export class CatalogModule {
}
