import { Injectable } from '@nestjs/common';
import { FileUploadContents } from "./types/file.upload.contents";
import { FileUploadInterface } from "./types/file.upload.interface";
import { FileUploadServiceInterface } from "./types/file.upload.service.interface";

@Injectable()
export class FileUploadService implements FileUploadServiceInterface {
    isFileExists(file: FileUploadInterface): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    uploadFileWithContents(toFile: FileUploadInterface, contents: FileUploadContents): Promise<FileUploadInterface> {
        throw new Error("Method not implemented.");
    }

    uploadFileWithLocation(toFile: FileUploadInterface, fromFile: FileUploadInterface): Promise<FileUploadInterface> {
        throw new Error("Method not implemented.");
    }

    downloadFileAsFs(file: FileUploadInterface, localPath: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

    downloadFileAsBase64(file: FileUploadInterface): Promise<string> {
        throw new Error("Method not implemented.");
    }

    downloadFileAsBlob(file: FileUploadInterface): Promise<Blob> {
        throw new Error("Method not implemented.");
    }

    downloadFileAsBuffer(file: FileUploadInterface): Promise<Buffer> {
        throw new Error("Method not implemented.");
    }

    downloadPreviewAsFs(file: FileUploadInterface, localPath: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

    downloadPreviewAsBase64(file: FileUploadInterface): Promise<string> {
        throw new Error("Method not implemented.");
    }
    
    downloadPreviewAsBlob(file: FileUploadInterface): Promise<Blob> {
        throw new Error("Method not implemented.");
    }

    downloadPreviewAsBuffer(file: FileUploadInterface): Promise<Buffer> {
        throw new Error("Method not implemented.");
    }
}
