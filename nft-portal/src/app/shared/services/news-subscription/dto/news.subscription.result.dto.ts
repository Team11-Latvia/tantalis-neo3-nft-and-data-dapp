export class NewsSubscriptionResultDto {
    email: string;
    subscribed: boolean;

    constructor(
        email: string,
        subscribed: boolean
    ) {
        this.email = email;
        this.subscribed = subscribed;
    }
}
