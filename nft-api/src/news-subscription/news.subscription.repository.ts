import { NewsSubscriptionEntity } from '../entity/news.subscription.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(NewsSubscriptionEntity)
export class NewsSubscriptionRepository extends Repository<NewsSubscriptionEntity> {
}