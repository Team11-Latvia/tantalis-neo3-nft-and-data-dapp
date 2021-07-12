import { ApiProperty } from "@nestjs/swagger";

export class NewsSubscriptionDto {
    @ApiProperty()
    email: string;

    constructor(email: string) {
        this.email = email;
    }
}