import { ApiProperty } from "@nestjs/swagger";

export class BuyNftItemResultDto {
    @ApiProperty()
    identifier: string;
}