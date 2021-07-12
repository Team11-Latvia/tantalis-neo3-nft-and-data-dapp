import { SystemParamsEntity } from '../entity/system.params.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(SystemParamsEntity)
export class SystemParamsRepository extends Repository<SystemParamsEntity> {
}