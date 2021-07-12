export interface FileUploadServiceInterface {
    uploadFile(file: File): Promise<string>;
}
