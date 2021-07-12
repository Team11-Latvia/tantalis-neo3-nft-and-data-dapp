import { EntityRepository, Repository } from 'typeorm';
import { CreateNftItemEntity } from '../entity/create.nft.item.entity';

@EntityRepository(CreateNftItemEntity)
export class CreateNftItemRepository extends Repository<CreateNftItemEntity> {
}