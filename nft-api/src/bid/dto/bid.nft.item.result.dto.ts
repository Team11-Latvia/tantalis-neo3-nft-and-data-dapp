import { ApiProperty } from "@nestjs/swagger";

export class BidNftItemResultDto {
    @ApiProperty()
    identifier: string;
}