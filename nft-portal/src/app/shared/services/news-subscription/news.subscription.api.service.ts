import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsSubscriptionDto } from './dto/news.subscription.dto';
import { NewsSubscriptionResultDto } from './dto/news.subscription.result.dto';

@Injectable({ providedIn: 'root' })
export class NewsSubscriptionApiService {
    constructor(
        private readonly httpClient: HttpClient
    ) {
    }

    async subscribe(email: string): Promise<NewsSubscriptionResultDto> {
        const dto = new NewsSubscriptionDto(email);
        const result = await this.httpClient.post<NewsSubscriptionResultDto>(`/news/subscription`, dto).toPromise();
        return result;
    }

    async unsubscribe(email: string): Promise<NewsSubscriptionResultDto> {
        const result = await this.httpClient.delete<NewsSubscriptionResultDto>(`/news/subscription/${email}`).toPromise();
        return result;
    }
}