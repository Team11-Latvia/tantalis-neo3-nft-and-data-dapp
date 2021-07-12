import { Module } from '@nestjs/common';
import { SellService } from './sell.service';
import { SellController } from './sell.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NftPriceRepository } from '../catalog/repository/nft.price.repository';
import { NftItemRepository } from '../catalog/repository/nft.item.repository';


@Module({
    imports: [
        TypeOrmModule.forFeature([NftPriceRepository]),
        TypeOrmModule.forFeature([NftItemRepository]),
    ],
    controllers: [
        SellController,
    ],
    providers: [
        SellService,
    ],
    exports: [
    ]
})
export class SellModule {
}
