import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NftItemRepository } from '../catalog/repository/nft.item.repository';
import { NftBidInfoRepository } from './/nft.bid.info.repository';
import { BidController } from './bid.controller';
import { BidHistoryController } from './bid.history.controller';
import { BidService } from './bid.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([NftItemRepository]),
        TypeOrmModule.forFeature([NftBidInfoRepository]),
    ],
    controllers: [
        BidController,
        BidHistoryController
    ],
    providers: [
        BidService,
    ],
    exports: [
    ]
})
export class BidModule {
}
