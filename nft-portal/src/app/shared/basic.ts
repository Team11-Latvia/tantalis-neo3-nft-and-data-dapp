import { NftContractDto } from './services/nft/dto/nft.contract.dto';
import { NftItemDto } from './services/nft/dto/nft.item.dto';
import { environment } from './../../environments/environment';

export function formatException(e: any): string {
    if (!e) {
        return 'unknown error';
    }

    if (e.message) {
        return e.message;
    }

    if (e.type && e.description) {
        return e.description;
    }

    if (e.toString) {
        return e.toString();
    }

    return e;
}

export function getItemPreviewUrl(item: NftItemDto | NftContractDto): string {
    if (!item.previewUrl) {
        return `${environment.portalBaseUrl}/assets/imgs/image-not-found.jpeg`;
    }

    if (item.previewUrl.startsWith('http://') || item.previewUrl.startsWith('https://')) {
        return item.previewUrl;
    }

    return `${environment.portalBaseUrl}/${item.previewUrl}`;
}