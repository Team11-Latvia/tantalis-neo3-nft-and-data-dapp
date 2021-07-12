import { ApiProperty } from "@nestjs/swagger";

export class OverallStatsDto {
    @ApiProperty()
    artworks: number;

    @ApiProperty()
    auctions: number;

    @ApiProperty()
    creators: number;
    
    constructor(
        artworks: number,
        auctions: number,
        creators: number
    ) {
        this.artworks = artworks;
        this.auctions = auctions;
        this.creators = creators;
    }
}
