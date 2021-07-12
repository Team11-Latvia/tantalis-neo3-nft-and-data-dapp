import { FileUploadContents } from "./file.upload.contents";
import { FileUploadInterface } from "./file.upload.interface";

export interface FileUploadServiceInterface {
    isFileExists(file: FileUploadInterface): Promise<boolean>;

    uploadFileWithContents(toFile: FileUploadInterface, contents: FileUploadContents): Promise<FileUploadInterface>;
    uploadFileWithLocation(toFile: FileUploadInterface, fromFile: FileUploadInterface): Promise<FileUploadInterface>;

    downloadFileAsFs(file: FileUploadInterface, localPath: string): Promise<string>;
    downloadFileAsBase64(file: FileUploadInterface): Promise<string>;
    downloadFileAsBlob(file: FileUploadInterface): Promise<Blob>;
    downloadFileAsBuffer(file: FileUploadInterface): Promise<Buffer>;

    downloadPreviewAsFs(file: FileUploadInterface, localPath: string): Promise<string>;
    downloadPreviewAsBase64(file: FileUploadInterface): Promise<string>;
    downloadPreviewAsBlob(file: FileUploadInterface): Promise<Blob>;
    downloadPreviewAsBuffer(file: FileUploadInterface): Promise<Buffer>;
}
