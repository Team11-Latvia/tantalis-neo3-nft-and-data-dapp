import { ApiProperty } from "@nestjs/swagger";

export class NewsSubscriptionResultDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    subscribed: boolean;

    constructor(
        email: string,
        subscribed: boolean
    ) {
        this.email = email;
        this.subscribed = subscribed;
    }
}
