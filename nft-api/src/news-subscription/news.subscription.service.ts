import { Injectable, NotFoundException } from "@nestjs/common";
import { NewsSubscriptionDto } from "./dto/news.subscription.dto";
import { NewsSubscriptionResultDto } from "./dto/news.subscription.result.dto";
import { NewsSubscriptionRepository } from "./news.subscription.repository";

@Injectable()
export class NewsSubscriptionService {
    constructor(
        private readonly repository: NewsSubscriptionRepository
    ) {
    }

    async subscribe(dto: NewsSubscriptionDto): Promise<NewsSubscriptionResultDto> {
        const found = await this.repository.findOne({ email: dto.email });
        if (found) {
            return new NewsSubscriptionResultDto(found.email, true);
        }
        
        const newEntity = this.repository.create(dto);
        const saved = await this.repository.save(newEntity);
        return new NewsSubscriptionResultDto(saved.email, true);
    }

    async unsubscribe(dto: NewsSubscriptionDto): Promise<NewsSubscriptionResultDto> {
        const found = await this.repository.findOne({ email: dto.email });
        if (!found) {
            throw new NotFoundException('News Subscription not found by email provided');
        }
        
        const deleted = await this.repository.remove(found);
        return new NewsSubscriptionResultDto(deleted.email, false);
    }
}
