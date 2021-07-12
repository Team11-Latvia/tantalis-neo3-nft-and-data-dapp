import { Injectable } from "@angular/core";
import { FileUploadServiceInterface } from "../types/file.upload.service.interface";

@Injectable()
export class FileUploadService implements FileUploadServiceInterface {

    uploadFile(file: File): Promise<string> {
        throw new Error("Method not implemented.");
    }
}
