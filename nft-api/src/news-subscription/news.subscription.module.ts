import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsSubscriptionController } from './news.subscription.controller';
import { NewsSubscriptionRepository } from './news.subscription.repository';
import { NewsSubscriptionService } from './news.subscription.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([NewsSubscriptionRepository]),
    ],
    controllers: [
        NewsSubscriptionController
    ],
    providers: [
        NewsSubscriptionService,
    ],
    exports: [
    ]
})
export class NewsSubscriptionModule {
}
