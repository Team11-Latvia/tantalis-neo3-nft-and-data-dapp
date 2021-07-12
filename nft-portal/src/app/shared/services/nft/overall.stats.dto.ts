export class OverallStatsDto {
    artworks: number;
    auctions: number;
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
