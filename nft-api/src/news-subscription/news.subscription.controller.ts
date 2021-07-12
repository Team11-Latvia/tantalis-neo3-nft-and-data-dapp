import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Logger, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { NewsSubscriptionDto } from './dto/news.subscription.dto';
import { NewsSubscriptionResultDto } from './dto/news.subscription.result.dto';
import { NewsSubscriptionService } from './news.subscription.service';

@ApiTags('News Subscription')
@Controller('/news/subscription')
export class NewsSubscriptionController {
    private readonly logger = new Logger(NewsSubscriptionController.name);

    constructor(
        private readonly newsSubscriptionService: NewsSubscriptionService
    ) {
    }

    @Post('/')
    @ApiOperation({ summary: 'Create News Subscription' })
    @ApiResponse({ status: 201, description: 'Created News Subscription result', type: NewsSubscriptionResultDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async createNewsSubscription(
        @Req() req: Request,
        @Body() dto: NewsSubscriptionDto
    ): Promise<NewsSubscriptionResultDto> {
        this.logger.verbose(`${req.method} : ${req.url} : ${JSON.stringify(dto)}`);
        return this.newsSubscriptionService.subscribe(dto);
    }

    @Delete('/:email')
    @ApiOperation({ summary: 'Remove News Subscription' })
    @ApiResponse({ status: 201, description: 'Removed News Subscription result', type: NewsSubscriptionResultDto })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async removeNewsSubscription(
        @Req() req: Request,
        @Param('email') email: string
    ): Promise<NewsSubscriptionResultDto> {
        this.logger.verbose(`${req.method} : ${req.url} : ${email}`);
        return this.newsSubscriptionService.unsubscribe(new NewsSubscriptionDto(email));
    }
}
