export class CreateNftItemDto {
    type: string;
    media: string;
    name: string;
    symbol: string;
    description?: string;
    resourceUrl?: string;
    previewUrl?: string;
    createNew: boolean;
    contractId?: string;

    constructor(
        type: string,
        media: string,
        name: string,
        symbol: string,
        description: string,
        resourceUrl: string,
        previewUrl: string,
        createNew: boolean,
        contractId: string
    ) {
        this.type = type;
        this.media = media;
        this.name = name;
        this.symbol = symbol;
        this.description = description;
        this.resourceUrl = resourceUrl;
        this.previewUrl = previewUrl;
        this.createNew = createNew;
        this.contractId = contractId;
    }
}