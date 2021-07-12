import { FileUploadMimeType } from "./file.upload.mime.type";
import { FileUploadType } from "./file.upload.type";

export interface FileUploadInterface {
    type: FileUploadType;
    mime: FileUploadMimeType;
    
    name: string;
    path: string;
    hash: string;
    
    resourceUrl: string;
    
    size: number;

    dateCreated: Date;
    dateModified: Date;
    dateUploaded: Date;

    preview: FileUploadInterface;
}
