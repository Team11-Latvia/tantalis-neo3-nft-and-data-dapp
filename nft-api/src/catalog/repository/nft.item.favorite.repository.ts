import { EntityRepository, Repository } from 'typeorm';
import { NftItemFavoriteEntity } from '../../entity/nft.item.favorite.entity';

@EntityRepository(NftItemFavoriteEntity)
export class NftItemFavoriteRepository extends Repository<NftItemFavoriteEntity> {
}