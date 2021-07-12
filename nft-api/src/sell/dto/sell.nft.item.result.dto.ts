import { ApiProperty } from "@nestjs/swagger";

export class SellNftItemResultDto {
    @ApiProperty()
    identifier: string;

    constructor(identifier: string) {
        this.identifier = identifier;
    }
}