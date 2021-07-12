import { EntityRepository, Repository } from 'typeorm';
import { NftBidInfoEntity } from '../entity/nft.bid.info.entity';

@EntityRepository(NftBidInfoEntity)
export class NftBidInfoRepository extends Repository<NftBidInfoEntity> {
}