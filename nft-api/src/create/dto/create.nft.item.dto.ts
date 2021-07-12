import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateNftItemDto {
    @ApiProperty()
    type: string;

    @ApiProperty()
    media: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    symbol: string;

    @ApiPropertyOptional()
    description?: string;

    @ApiPropertyOptional()
    resourceUrl?: string;

    @ApiPropertyOptional()
    previewUrl?: string;

    @ApiProperty()
    createNew: boolean;

    @ApiPropertyOptional()
    contractId?: string;
}
