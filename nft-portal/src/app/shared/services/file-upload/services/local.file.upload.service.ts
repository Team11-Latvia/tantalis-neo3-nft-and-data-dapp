import { environment } from './../../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { FileUploadServiceInterface } from "../types/file.upload.service.interface";

@Injectable()
export class LocalFileUploadService implements FileUploadServiceInterface {

    constructor(
        private readonly httpClient: HttpClient
    ) { }

    async uploadFile(file: File): Promise<string> {
        // Gets upload url
        const result = await this.httpClient.get<{ Key: string, uploadURL: string }>(environment.fileUploadAwsUrl, {
            params: new HttpParams()
                .set('name', file.name)
                .set('type', file.type)
        }).toPromise();

        // Uploads in aws
        this.uploadAws(result.uploadURL, file);

        return this.getFileAwsUrl(result.Key);
    }

    private async uploadAws(uploadURL: string, file: File) {
        await this.httpClient.put<any>(uploadURL, file, { headers: { 'Content-Type': file.type } }).toPromise();
    }

    private getFileAwsUrl(fileName: string): string {
        return `${environment.fileAwsBaseUrl}/${fileName}`;
    }
}
